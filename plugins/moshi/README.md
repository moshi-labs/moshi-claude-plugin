# Moshi

Moshi runs AI sales conversations for brands over Instagram DM, Facebook Messenger and iMessage. This plugin connects Claude to your Moshi account and adds guided playbooks for the work merchants do most: checking how their Moshi ads are performing, turning their best Meta ads into new Moshi flows, planning the next ad set, following up with shoppers who almost bought, and writing a weekly recap.

## What's included

**The Moshi MCP server** at `https://mcp.moshi.ai/mcp`. It's hosted by Moshi Labs, so there's nothing to install or run. It gives Claude tools for:

- **Reporting:** flow performance, revenue, Meta platform metrics, heatscores, open carts
- **Conversations and leads:** list conversations, read messages and events, export results
- **Catalog and brand:** products, product lore, brand docs, knowledge health
- **Ads:** shortlist proven Meta ads, create Moshi ads (always created paused), upload creatives
- **Closer:** see shoppers who almost bought, then draft and send them a nudge
- **Simulator:** start a sandbox conversation and message it as a customer

**Five skills:**

- `performance-pulse-check`: a report on how your Moshi ads are doing, judged by campaign age, objective and fair comparisons. Read-only.
- `scale-what-works`: ranks the Meta ads already working for you and, once you approve, publishes the top picks as paused Moshi ads.
- `plan-next-flows`: a one-pager planning the next Moshi ad set inside one of your campaigns. Read-only.
- `close-the-carts`: works your Closer queue. Bulk-drafts a nudge for each lead you pick, then sends only the ones you approve.
- `weekly-newsletter`: a weekly recap of your Moshi results. Read-only.

## Setup

In Cowork or the Claude app, install Moshi from **Customize → Plugins**. In Claude Code:

```
/plugin install moshi --marketplace moshi-labs/moshi-claude-plugin
```

You need a Moshi account at [app.moshi.ai](https://app.moshi.ai). After installing, Claude asks you to connect Moshi. Sign in through your browser over OAuth and pick your organization. There's no API key to paste.

## Data and privacy

The plugin talks only to Moshi's own server. It reads and writes data in the Moshi organization you sign in to. Every request is scoped to that organization. Actions that change something (publishing ads, sending nudges, updating brand docs or products) run only when you ask for them. The skills don't run scripts on your machine and don't contact any other service.

- Privacy policy: https://www.moshi.ai/legal/privacy
- Terms: https://www.moshi.ai/legal/terms
- Docs: https://docs.moshi.ai
- Support: support@moshi.ai

## License

MIT. See [LICENSE](LICENSE).
