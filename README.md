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
- **Three guided workflows**, as MCP prompts: `flow_status_report`, `scale_what_works` and
  `weekly_newsletter`

**2. Two skills** — longer playbooks that travel with the plugin, so Claude Code, Claude
Desktop and Claude.ai all get them:

- `scale-what-works` — the "which ads should I run next" conversation.
- `weekly-newsletter` — a weekly newsletter for the merchant, which a Cowork `/schedule`
  run can write unattended.

Clients that take the MCP server on its own get the matching prompts, `scale_what_works` and
`weekly_newsletter`, which cover the same ground.

| Client | Gets | Install section |
|---|---|---|
| Claude Code | Tools + prompts + skill | [Claude Code](#claude-code) |
| Claude Desktop, Claude.ai, Cowork | Tools + prompts + skill | [Claude Desktop and Claude.ai](#claude-desktop-and-claudeai) |
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

### The MCP server on its own

If you only want the tools and prompts, skip the plugin:

```bash
claude mcp add --transport http moshi https://mcp.moshi.ai/mcp
```

Use `--scope user` to make it available in every project rather than just the current one.

## Claude Desktop and Claude.ai

Install the plugin — it brings the MCP server and the skill in together. Same flow on the
desktop app, the web app and Cowork; available on all paid plans (Pro, Max, Team,
Enterprise).

1. Open **Customize** in the left sidebar, then the **Plugins** tab.
   In Cowork, open **Customize** from the **Cowork** tab first.
2. Under **Personal plugins**, click **+ → Add marketplace**
3. Choose **Add from a repository** and give it
   `https://github.com/moshi-labs/moshi-claude-plugin`
4. Install **moshi**, then sign in to Moshi when it prompts you to connect

The two guided workflows are MCP *prompts*, and prompts live somewhere other than the tools
list: click the **+** button in the composer, then **Connectors → moshi**. A prompt that is
working perfectly will never show up under tools, so look there before assuming something is
broken.

The desktop app only starts connectors at launch — quit it fully and reopen if Moshi does not
show up.

### Just the MCP server

Plugins need a paid plan. On Free, or if you want the tools without the rest, add the server
as a custom connector instead: **Customize → Connectors → + → Add custom connector**, URL
`https://mcp.moshi.ai/mcp`, then **Connect** and sign in.

On Team and Enterprise an Owner adds it once for the whole workspace under **Organization
settings → Connectors → Add**, hovering **Custom** and picking **Web**. Members then click
**Connect** under **Customize → Connectors** to sign in as themselves.

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

**A new Moshi tool isn't showing up** — reconnect the connector (ChatGPT: **Refresh** on the
app; Claude Desktop: quit and reopen). The tool list is cached per connection.

## Repo layout

```
.claude-plugin/marketplace.json   the marketplace Claude Code reads
plugins/moshi/
├── .claude-plugin/plugin.json    plugin manifest
├── .mcp.json                     points at the hosted MCP server
├── skills/scale-what-works/      the ads-scaling playbook
└── skills/weekly-newsletter/     the weekly merchant newsletter
```

Maintainers: bump the version in **both** `marketplace.json` and `plugin.json` — they have to
agree. `claude plugin validate .` checks the manifests, and `claude plugin tag plugins/moshi`
cuts the release tag once they do. To try a change before pushing it, add your working copy as
a marketplace by path: `claude plugin marketplace add ./moshi-claude-plugin`.
