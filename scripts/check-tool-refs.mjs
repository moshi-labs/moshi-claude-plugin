#!/usr/bin/env node
// Fails when a shipped skill names a Moshi MCP tool that a merchant's session
// does not have: one moshi-mcp never registers, or one it registers only for
// Moshi super-admins.
//
// The tool catalog is read from a moshi-mcp checkout at a git ref (default
// origin/main), not from its working tree, so a local feature branch cannot
// hide a tool that main dropped. It covers the generated tools
// (src/tools/generated/index.ts, from the x-moshi-mcp extensions in the
// vendored OpenAPI spec) and every hand-written registerAppTool / registerTool.
//
// Usage:
//   node scripts/check-tool-refs.mjs [--mcp ../moshi-mcp] [--ref origin/main] [--no-fetch]
//   MOSHI_MCP_DIR=/path/to/moshi-mcp node scripts/check-tool-refs.mjs

import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function arg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const mcpDir = resolve(arg("--mcp", process.env.MOSHI_MCP_DIR ?? join(repoRoot, "..", "moshi-mcp")));
const ref = arg("--ref", "origin/main");

if (!existsSync(join(mcpDir, ".git"))) {
  console.error(`No moshi-mcp git checkout at ${mcpDir}. Pass --mcp <path> or set MOSHI_MCP_DIR.`);
  process.exit(2);
}

// Exit 2 is a setup error (bad checkout, ref or format); exit 1 means bad references.
function setupError(message) {
  console.error(message);
  process.exit(2);
}

const git = (...a) => {
  try {
    return execFileSync("git", ["-C", mcpDir, ...a], { encoding: "utf8", maxBuffer: 64 << 20, stdio: ["ignore", "pipe", "pipe"] });
  } catch (e) {
    setupError(`git ${a.join(" ")} failed in ${mcpDir}: ${String(e.stderr ?? e.message).trim()}`);
  }
};

// A stale local origin/main would let a tool main has since dropped pass, so a
// failed fetch stops the check. --no-fetch opts in to the local copy.
if (!process.argv.includes("--no-fetch") && ref.startsWith("origin/")) {
  git("fetch", "--quiet", "origin", ref.slice("origin/".length));
}

const show = (path) => git("show", `${ref}:${path}`);
const srcFiles = git("ls-tree", "-r", "--name-only", ref, "src").split("\n").filter((f) => f.endsWith(".ts"));

// --- the catalog ------------------------------------------------------------

/** name -> { file, admin } */
const tools = new Map();

const generated = show("src/tools/generated/index.ts");
for (const m of generated.matchAll(/^\s*name: "([a-z0-9_]+)",[\s\S]*?^\s*admin: (true|false),/gm)) {
  tools.set(m[1], { file: "src/tools/generated/index.ts", admin: m[2] === "true" });
}
if (tools.size === 0) {
  setupError(`Read no generated tools from ${ref}:src/tools/generated/index.ts; its format changed, so fix this script.`);
}

// Hand-written tool groups registered only inside `if (isSuperAdmin) { ... }` in server.ts.
const server = show("src/server.ts");
const adminGroups = new Set();
for (const m of server.matchAll(/if \(\s*[\w.]*isSuperAdmin\s*\)\s*\{/g)) {
  let depth = 0;
  let i = m.index + m[0].length - 1;
  const start = i;
  for (; i < server.length; i++) {
    if (server[i] === "{") depth++;
    else if (server[i] === "}" && --depth === 0) break;
  }
  for (const c of server.slice(start, i).matchAll(/\b(register[A-Za-z]+Tools)\(/g)) adminGroups.add(c[1]);
}

// Fail closed: with no admin groups found, every staff tool would pass as a merchant tool.
if (adminGroups.size === 0) {
  setupError(`Found no tool group registered under isSuperAdmin in ${ref}:src/server.ts; the gate changed, so fix this script.`);
}

for (const file of srcFiles) {
  if (file === "src/tools/generated/index.ts") continue;
  const text = show(file);
  // A tool belongs to the nearest `export function registerXTools(` above it,
  // so a file holding several groups gets each one's admin status right.
  const groups = [...text.matchAll(/export function (register[A-Za-z]+Tools)\(/g)].map((g) => ({ name: g[1], at: g.index }));
  for (const m of text.matchAll(/register(?:App)?Tool\(\s*(?:server,\s*)?"([a-z0-9_]+)"/g)) {
    const group = groups.filter((g) => g.at < m.index).at(-1)?.name;
    tools.set(m[1], { file, admin: group !== undefined && adminGroups.has(group) });
  }
}

// --- the references ---------------------------------------------------------

// A Moshi tool name is snake_case and starts with a verb. Flags, enum values and
// field names in the skills (partial_period, last_7d, moshi_only) do not, so
// they are not mistaken for tools. The verbs are every first word in the
// catalog, plus common ones a removed or misspelled tool might use.
const VERBS = new Set([...[...tools.keys()].map((n) => n.split("_")[0]),
  "get", "list", "create", "update", "delete", "send", "draft", "launch", "poll",
  "upload", "export", "run", "set", "start", "stop", "reset", "regenerate",
  "render", "submit", "approve", "refresh", "interpret", "define", "configure",
  "register", "unregister", "rerun", "add", "remove", "test", "fetch", "search",
  "find", "check", "sync", "pause", "activate",
]);
const TOOL_RE = new RegExp(`(?<![A-Za-z0-9_])(?:${[...VERBS].join("|")})_[a-z0-9]+(?:_[a-z0-9]+)*(?![A-Za-z0-9_])`, "g");

// Names that look like Moshi tools but are not, each with its reason.
const NOT_MOSHI_TOOLS = {};

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const skillFiles = walk(join(repoRoot, "plugins"))
  .filter((p) => /\/skills\//.test(p) && /\.(md|html)$/.test(p));

const problems = [];
const seen = new Set();
for (const file of skillFiles) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    for (const m of line.matchAll(TOOL_RE)) {
      const name = m[0];
      if (name in NOT_MOSHI_TOOLS) continue;
      const where = `${relative(repoRoot, file)}:${i + 1}`;
      const tool = tools.get(name);
      if (tool && !tool.admin) seen.add(name);
      if (!tool) problems.push(`${where}  ${name}: not a moshi-mcp tool at ${ref}`);
      else if (tool.admin) problems.push(`${where}  ${name}: Moshi super-admin only (${tool.file}); merchants never see it`);
    }
  });
}

console.log(`moshi-mcp ${ref}: ${tools.size} tools. Skills reference ${seen.size} merchant tools in ${skillFiles.length} files.`);
if (problems.length > 0) {
  console.error(`\n${problems.length} reference(s) to a tool a merchant's session does not have:\n${problems.join("\n")}`);
  process.exit(1);
}
console.log("Every tool a skill names is in the merchant catalog.");
