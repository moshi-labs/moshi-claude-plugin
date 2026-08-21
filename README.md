# Moshi for AI clients

Moshi runs conversational commerce and lead gen over Instagram DM, Facebook Messenger and
iMessage. This repo packages Moshi so you can drive it from the AI client you already use —
ask for a report on a flow, read what customers actually said, or turn your best-performing
Meta ads into new Moshi ads without leaving the chat.

## What you get

**1. The Moshi MCP server** — hosted at `https://mcp.moshi.ai/mcp`. There is nothing to run,
build or install; you point your client at the URL and sign in with your Moshi account. It
provides:

- **Reporting** — flow performance, revenue, Meta platform metrics, heatscores, open carts
- **Conversations & leads** — list conversations, read messages and events, export results
- **Catalog & brand** — products, product lore, brand docs, knowledge health
- **Ads** — shortlist your proven Meta ads, create and publish Moshi ads, upload creatives
- **Simulator** — launch a sandbox conversation and message it as a customer
- **Two guided workflows**, as MCP prompts: `flow_status_report` and `scale_what_works`

**2. The `scale-what-works` skill** — a longer playbook for the "which ads should I run next"
conversation. Claude Code only; every other client gets the MCP server's own
`scale_what_works` prompt, which covers the same ground.

| Client | Gets | Install section |
|---|---|---|
| Claude Code | Tools + prompts + skill | [Claude Code](#claude-code) |
| Claude Desktop | Tools + prompts | [Claude Desktop](#claude-desktop) |
| Claude.ai (web, mobile) | Tools + prompts | [Claude.ai](#claudeai-web-and-mobile) |
| ChatGPT | Tools | [ChatGPT](#chatgpt) |
| Cursor, VS Code, other MCP clients | Tools + prompts | [Other MCP clients](#other-mcp-clients) |

## Before you start

You need a Moshi account at [app.moshi.ai](https://app.moshi.ai). Sign-in happens in your
browser over OAuth — there is no API key to copy and no secret to paste into a config file.
The connection is scoped to the organization your account belongs to, so everything you ask
for is that org's data.

## Claude Code

### The full plugin — recommended

```bash
/plugin marketplace add moshi-labs/moshi-claude-plugin
/plugin install moshi@moshi
```

Or from your shell, without starting a session:

```bash
claude plugin marketplace add moshi-labs/moshi-claude-plugin
claude plugin install moshi@moshi
```

Restart Claude Code, then run `/mcp`, pick **moshi**, and authenticate — a browser window
opens for you to sign in to Moshi. After that, ask for what you want in plain language, or
run the skill directly:

```
/moshi:scale-what-works
```

> The repo is currently **private**, so `marketplace add` clones it with your GitHub
> credentials — you need read access on `moshi-labs/moshi-claude-plugin`. To hand this to
> someone outside the org, either make the repo public or have them clone it and add the
> local path instead: `claude plugin marketplace add ./moshi-claude-plugin`.

### The MCP server on its own

If you only want the tools and prompts, skip the plugin:

```bash
claude mcp add --transport http moshi https://mcp.moshi.ai/mcp
```

Use `--scope user` to make it available in every project rather than just the current one.

## Claude Desktop

1. **Settings → Connectors → Add custom connector**
2. URL: `https://mcp.moshi.ai/mcp`
3. **Add**, then **Connect** — sign in to Moshi in the browser window that opens

The two guided workflows are MCP *prompts*, and Desktop keeps prompts somewhere other than
the tools list: click the **+** button in the composer, then **Connectors → moshi**. A prompt
that is working perfectly will never show up under tools, so check there before assuming
something is broken.

Desktop only starts connectors at launch — quit fully and reopen if the connector does not
appear.

## Claude.ai (web and mobile)

**Free, Pro and Max:**

1. **Customize → Connectors**
2. **+ → Add custom connector**
3. URL: `https://mcp.moshi.ai/mcp` → **Add** → **Connect** and sign in

**Team and Enterprise:** an Owner adds it once for the workspace under **Organization
settings → Connectors → Add**, hovers **Custom**, picks **Web**, and enters the same URL.
Members then go to **Customize → Connectors** and click **Connect** to sign in as themselves.

## ChatGPT

Available on Plus, Pro, Business, Enterprise and Education accounts, on the web.

1. **Settings → Security and login → Developer mode** — turn it on.
   (On a workspace, an admin enables it under **Workspace Settings → Permissions & Roles →
   Connected Data**.)
2. Go to **Plugins**, click **+**, and create a developer-mode app pointing at
   `https://mcp.moshi.ai/mcp`. The `/mcp` path matters.
3. Choose **OAuth** for authentication and sign in to Moshi.

The new app lands under **Drafts**, where you can toggle individual tools on and off. When
the Moshi server ships new tools, hit **Refresh** on the app to pull them in.

ChatGPT surfaces MCP tools but not MCP prompts, so ask for a report in your own words rather
than looking for a `/flow_status_report` command.

## Other MCP clients

Any client that speaks streamable HTTP MCP with OAuth will work. The config is the same
three lines everywhere:

```json
{
  "mcpServers": {
    "moshi": {
      "type": "http",
      "url": "https://mcp.moshi.ai/mcp"
    }
  }
}
```

- **Cursor** — `~/.cursor/mcp.json` for every project, or `.cursor/mcp.json` for one
- **VS Code** — `.vscode/mcp.json`, but note VS Code names the top-level key `servers`
  rather than `mcpServers`
- Anything else — drop the block into whatever the client calls its MCP config, then trigger
  the sign-in flow from its connector or MCP panel

## How sign-in works

The server is an OAuth 2.1 protected resource. It advertises its authorization server at
`https://mcp.moshi.ai/.well-known/oauth-protected-resource/mcp`, which points at
`https://api.moshi.ai` and supports PKCE and dynamic client registration. In practice that
means a client only ever needs the URL — it registers itself and opens a browser for you.

To disconnect, remove the connector in your client (or run `/mcp` in Claude Code and
disconnect there). Nothing is stored on your machine except the client's own token.

## Troubleshooting

**`Authorization required` or a 401** — the connection is not signed in. Reconnect from your
client's connector settings; in Claude Code, `/mcp` → moshi → authenticate.

**The prompts are missing in Claude Desktop** — they are under **+ → Connectors → moshi**,
not in the tools list.

**Claude Code doesn't see the plugin** — plugins load at session start. Restart, then
`claude plugin list` to confirm it installed and is enabled.

**`marketplace add` fails** — you need read access to the private repo. See the note in the
Claude Code section.

**A new Moshi tool isn't showing up** — reconnect the connector (ChatGPT: **Refresh** on the
app; Claude Desktop: quit and reopen). The tool list is cached per connection.

## Repo layout

```
.claude-plugin/marketplace.json   the marketplace Claude Code reads
plugins/moshi/
├── .claude-plugin/plugin.json    plugin manifest
├── .mcp.json                     points at the hosted MCP server
└── skills/scale-what-works/      the ads-scaling playbook
```

Maintainers: bump the version in **both** `marketplace.json` and `plugin.json` — they have to
agree. `claude plugin validate .` checks the manifests, and `claude plugin tag plugins/moshi`
cuts the release tag once they do.
