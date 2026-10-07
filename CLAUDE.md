# moshi-claude-plugin

## What this repo is

One plugin, two packages, shared skills:

- **Claude**: `.claude-plugin/` (marketplace) + `plugins/moshi/.claude-plugin/` + `plugins/moshi/.mcp.json`
- **OpenAI (ChatGPT/Codex)**: `plugins/moshi/plugin.json` + `mcp.json`. An optional `.app.json` registers a ChatGPT app for web/mobile; `mcp.json`-only plugins are labelled "Desktop only" in ChatGPT.
- **Shared**: `plugins/moshi/skills/`

## Releasing

- Bump the version in all four places:
  - `.claude-plugin/marketplace.json` (twice)
  - `plugins/moshi/.claude-plugin/plugin.json`
  - `plugins/moshi/plugin.json`
- Build the OpenAI ZIP with `scripts/build-openai-zip.sh` (`plugin.json` at the archive root).
- The plugin name must stay `moshi`. ChatGPT rejects a second upload with the same name ("A plugin named `moshi` already exists"); update via "Upload new version" at chatgpt.com/plugins.
- An update never deletes files removed from the package.

## Skill rules (both clients)

- Frontmatter: `name` + `description` (+ optional `when_to_use`, Claude only). Front-load trigger phrases in `description` (<= 1024 chars).
- Every skill has `agents/openai.yaml` declaring the `moshi` MCP dependency.
- Every tool a skill names must exist on moshi-labs/moshi-mcp `origin/main` with the args used. Check with `git grep` before merging; never ship a skill ahead of its tool.
- No product-specific features without a fallback (artifacts, Cowork, /schedule, MCP prompt slash commands). Refer to skills by name; ChatGPT invokes skills with `@`, Codex with `$`.
- Never print large templates inline: copy from `assets/` and return a file.
- Any write tool (`create_ad`, `draft_closer_nudge`, `send_closer_nudge`, `update_*`) needs an explicit merchant-confirm step in the skill; the client may confirm on top.
- Read-only skills only call tools annotated `readOnlyHint: true`.

## Tool annotations

Tools are annotated in moshi-mcp (see its CLAUDE.md). If a skill's read/write assumptions change, check the annotations there.
