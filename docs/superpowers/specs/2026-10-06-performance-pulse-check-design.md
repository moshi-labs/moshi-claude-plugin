# performance-pulse-check — design

Date: 2026-10-06
Status: approved, hardened for build
Reference report: an internal Moshi day-one results report (Oct 2026)

> **Update 2026-10-07 (plugin 0.9.0).** The skill no longer needs the Meta Ads
> connector. Meta numbers now come from the Moshi MCP tool `get_ad_account_tree`
> (moshi-mcp #38, moshi-api #1786), which serves Moshi's synced copy of the ad
> account, refreshed about every 6 hours. The plan in `references/meta-reads.md`
> replaces the nine Meta reads below with at most five reads. The activity log
> and the anomaly scan have no replacement in v1. Meta changes now show only as
> `significant_edit` (learning restarts), and `accountIssues` come from the
> structure read. Daily rows carry `reach`, and the template computes frequency
> from it. Learning status now comes from `learningPhase` on ACTIVE ad sets.
> Ad set settings appear only on ACTIVE ad sets. The rest of this document
> describes the 0.8.0 design.

## Goal

A merchant asks "how are my Moshi ads doing?" and gets a report that reads
like a senior Meta performance marketer on their side. The marketer wants
Moshi to win. The report reads the whole ad account, judges each campaign
only on what its age allows, shows when each recent change becomes readable,
credits the assists that Meta's pixel misses, and compares Moshi fairly
against the merchant's own ads.

Success: a merchant reads the report in two minutes, trusts every number,
and leaves with dated next steps.

## Users and invocation

- The merchant invokes the skill in their own Claude (or ChatGPT/Codex via
  the OpenAI package). The Moshi admin authors the skill.
- On demand by default. The default window works unattended, so a scheduled
  run is possible. A scheduled run never asks a question.
- Scope is the merchant's own ad account, all campaigns. The merchant can
  narrow it ("just the spring launch campaign", "last 3 days").

## Stance

Mostly advocate, with an honesty floor. Every frame leans toward Moshi: lead
with the win, explain a miss with timing and resources, always count the
assists. The floor is in the hard rules: never invent a number, never hide a
number the merchant can see in Ads Manager.

## Design principle: the template enforces, the skill judges

Mechanical rules live in code. Judgment lives in prose.

- The template computes every derived metric: CTR, CPC, CPM, cost per chat,
  ROAS, campaign age, stage, next gate date, and each comparison's resource
  note. The model writes raw numbers only.
- The template checks the invariants (below) and shows a visible "data
  check" banner when one fails. This works in every host, with no scripts.
- Prose cites numbers through tokens such as `{c:camp_123.cpc}`. The
  template fills each token from its own computed value, so the prose and
  the tiles can never disagree.
- SKILL.md carries what code cannot check: which campaigns to compare, what
  the stage permits a verdict on, framing, and voice.

## Files

```
plugins/moshi/skills/performance-pulse-check/
  SKILL.md                    steps, hard rules, voice, red flags
  references/
    data-contract.md          the DATA schema, field by field
    stage-gates.md            stage table, age and reset sources, volume floor
    comparison-method.md      age matching, assist evidence
    meta-call-budget.md       the fixed Meta read plan and verified fields
  assets/
    pulse-check.html          the report template, DATA slot at the end

evals/performance-pulse-check/      (repo root, not shipped in the plugin)
  fixtures/                   synthetic Moshi + Meta response sets
  scenarios.md                eval prompts with expected behavior
  rubric.md                   pass/fail checks per scenario
  results/                    RED and GREEN run notes
```

Budgets:

- SKILL.md ≤ 1,200 words. It names each reference file and the condition
  to read it ("read stage-gates.md before you write the verdict").
- `pulse-check.html` ≤ 120 KB including the embedded avatar, so a host
  that must re-emit it whole can do so in one artifact.
- The `const DATA = {...};` slot is the last script in the file. Everything
  above it is copied unchanged.

Plugin version goes 0.7.0 → 0.8.0 in `.claude-plugin/marketplace.json` and
`plugins/moshi/plugin.json` together. No other registration: skills are
discovered from `skills/`, and `scripts/build-openai-zip.sh` already zips
`skills/`.

## Frontmatter

Follows the repo convention (`name`, `description`, `when_to_use`). Codex
reads only `name` and `description`, so `description` carries a trigger.

- `description`: the outcome in one sentence plus "Use when a Moshi
  merchant asks how their ads are doing." No step order, so an agent cannot
  follow the description instead of the body.
- `when_to_use`: trigger phrases in the merchant's words: "how are my ads
  doing", "is Moshi working", "pulse check", "should I keep spending on
  Moshi", "my ROAS looks low", "why did my CPA go up", "compare Moshi to my
  other ads", "day-one / week-one results", plus "requires the Moshi MCP
  server; the Meta Ads connector adds the full account view".

## Data sources

### Moshi MCP (always)

| Tool | Purpose |
|---|---|
| `get_organization_ads` | Map Moshi flows to Meta ad ids, so each Meta entity is labeled Moshi or merchant. |
| `get_flow_status_data` | Scorecard, funnel, leads and open carts at one moment. Read `flags` first. |
| `get_ad_performance` | Moshi-managed spend and thread-proven orders. |
| `get_conversation_messages` | Only the 2–3 threads the report quotes. |
| `get_recent_brand_doc_change` | Agent-knowledge changes, for the change log (if present in production). |

Build step 1 confirms each name and response field against the production
Moshi MCP. The local connector already differs from production.

### Meta Ads MCP (when connected and `is_ads_mcp_enabled`)

A fixed budget of 9 calls. The skill never calls once per ad.

1. `ads_get_ad_accounts`: pick the account. Skip accounts where
   `is_ads_mcp_enabled` or `is_queryable` is false. Read currency.
2. Account level: `timezone_name`.
3. Campaign level: every campaign's objective, status, start time, budget
   (a campaign budget means CBO).
4. Ad set level: start time, optimization goal, `learning_stage_info`
   (`last_sig_edit_ts`), attribution setting, budget, bid strategy.
5. Ad structure, `last_30d`, no daily rows: id, ad set, campaign, status,
   spend. Gives ad counts and the merchant's top 3 ads by spend.
6. Ad level daily, `last_30d`, `time_increment: "1"`, for Moshi ads and
   the merchant's top 3 ads: spend, impressions, link clicks, results,
   purchases, purchase value, frequency.
7. Comparison pull: ad level daily for merchant launch ad sets that
   started in the last 90 days, `time_range` over their first 14 days.
   Same objective as the Moshi campaign, retargeting excluded.
8. `ads_account_get_activity_logs`, from the first Moshi launch: budget,
   status, creative and targeting changes, for the change log.
9. `ads_insights_anomaly_signal`: the account-health scan.

`ads_get_field_context` runs only when a call rejects a field. With
`time_increment`, `limit` counts daily rows, so size it as ads × days.

Every Meta call sends one `client_conversation_id` for the run and
`hide_ui: true` where accepted, because the report is the artifact. If a
response carries `next_actions`, run only its required read-only actions,
then stop. On a rate-limit error, keep what has loaded and add a
`meta_rate_limited` flag. Never retry in a loop.

`meta-call-budget.md` records the verified field names, and whether `limit`
counts entities or daily rows.

### Shopify

The skill does no Shopify join of its own. Revenue tied to Moshi is only what
Moshi maps from a chat to an order: thread-proven orders plus Closer
recoveries. No account-wide MER.

## Data contract (summary)

`references/data-contract.md` is the full schema and is written first, on
its own. The template, the fixtures and SKILL.md all build against it.

```
schemaVersion: 1
merchant: { name, currency, timezone }
asOf, window: { start, end, partial }, metaSyncedAt
mode: "full" | "moshi_only"
verdict: { headline, body }            prose with {tokens}
campaigns: [{ id, name, owner: moshi|merchant,
              objective: engagement|sales|other, budgetType: CBO|ABO,
              dailyBudget, status, startTime, lastLearningReset,
              adsPulled: all|top|none,
              learning: learning|limited|success|null,
              adsets: [{ id, name, startTime, optimizationGoal, dailyBudget,
                         learning, ads: [{ id, name, angle,
                         daily: [{ date, spend, impressions, linkClicks,
                                   results, purchases, purchaseValue,
                                   frequency }] }] }] }]
moshi: { spend, chats, chatsFromAds, contactsCaptured, productViews,
         carts, checkouts, provenOrders, provenRevenue,
         closerRecoveries, closerRevenue }
comparisons: [{ metric, day, moshiCampaignId, merchantCampaignId }]
changes: [{ date, what, source: meta|moshi, entityId, readableBy }]
accountIssues: [{ kind, severity, text }]
shopperThemes: [{ theme, text }], quotes: [{ text, source }]
nextSteps: [{ step, what, owner, by }]
flags: [{ source, code, text }]
notMeasurableYet: [string]
```

- Meta purchases live only in `daily[]`. Moshi-proven orders live only in
  `moshi`. No field holds a total of the two.
- `moshi.spend` comes from `get_ad_performance`, so `moshi_only` mode can
  still compute cost per chat.
- The template derives each comparison's resource note and resource edge
  from the two campaigns' `dailyBudget` and ad counts.
- Day 1 of a campaign is the later of its `startTime` and its first
  `daily[]` date with impressions > 0. An ad set uses the same rule with
  its own `startTime` (else its campaign's) and its own rows. When the
  first row falls within 1 day of the 30-day read's start (`asOf` minus 29
  or 30 days) and `startTime` is earlier, the read cut the history off, so
  day 1 is `startTime`. With no rows: `startTime`, then
  `moshi.firstLaunch` for a Moshi campaign. Moshi publishes ads PAUSED, so
  a campaign paused at creation counts from its first delivery. A campaign
  and each ad set keep their own reset clocks.
- `adsPulled` says which ads the skill pulled: `"all"` (Moshi campaigns
  and read-7 comparison launches), `"top"` (read-6 top ads only) or
  `"none"`. The template trusts it. When it is missing: `"all"` for Moshi,
  `"top"` for a merchant campaign with ads.
- Each ad has one `daily[]` row per date. When reads 6 and 7 both return a
  date, the skill keeps the read-6 row.

## Template invariant checks

The template shows a "data check" banner and hides the offending element
when any check fails:

0. The DATA block is missing, or the report throws while it renders.
1. A ROAS or CPA value would render for an `engagement` campaign.
2. A comparison breaks the comparison method: objectives differ, the
   merchant campaign is retargeting, has `adsPulled` other than `"all"`,
   has no `startTime` or started more
   than 90 days before `asOf`; `day` is outside 1–14; either side lacks a
   row with impressions on each of days 1–N; or the metric is `cpa`/`roas`
   while the Moshi campaign is not Sales, `day` is under 8, or Moshi is
   before day 8 on its reset clock.
3. A prose token points to a metric that does not exist, or is malformed,
   or `{all:moshi.…}` has no Moshi campaign.
4. A quote holds an email, a phone number, an @handle, or more than 15 words.
5. `schemaVersion` does not match the template.
6. A `c:` or `s:` token cites a campaign with `adsPulled: "top"`, or an
   `{all:…}` token covers a campaign with `adsPulled` other than `"all"`.
7. `{m:age}` or `{m:stage}` is used while a Moshi ad set has a learning
   reset (Meta's `lastLearningReset`, or a significant Meta change in
   `changes[]`).
8. A date field the template reads is not `YYYY-MM-DD`.
9. A prose token for a numeric metric resolves to no value (null or not
   finite). Date tokens such as `{m:firstLaunch}` render as dates.
10. An ad has two `daily[]` rows for one date. The ad, its ad set and its
    campaign are marked; their metric tokens, comparisons, Meta tiles and
    fatigue lines are hidden. Age tokens still render.

## Classification

Every campaign gets two labels:

- Owner: Moshi (any ad in `get_organization_ads`) or merchant.
- Objective: Engagement (optimizes for conversations) or Sales (optimizes
  for purchases), from the campaign objective and the ad set optimization
  goal.

| Objective | Scored on | Never scored on |
|---|---|---|
| Engagement | cost per conversation, chat-start rate, chat → product view | ROAS |
| Sales | CPA, ROAS (Meta), cost per chat | — |

Both show the chat funnel.

## Stage gates

Campaign age counts calendar days in the account timezone from day 1 (see the
data contract summary); an ad set has its own day 1. A
learning reset restarts the clock. The reset date
comes from the ad set's learning-stage data when Meta exposes it, else from
a significant edit in the activity log (budget change over ~20%, new ad,
targeting or optimization change). Never inferred from metrics.

| Age | Judge | Do not judge yet |
|---|---|---|
| Day 1–3 (learning) | delivery, CTR, CPC, chat-start rate, which creative Meta favors | ROAS, CPA, purchases |
| Day 4–7 | cost per chat, chat → product view, contact capture, first carts, budget shifts between creatives | ROAS verdict |
| Day 8–14 | first fair CPA/ROAS against the merchant's launches at the same day; delayed conversions | account lift, halo |
| Day 15–30 | fatigue curve, frequency, halo on retargeting (directional) | — |
| Day 31+ | full verdict: scale, iterate creative, or cut | — |

Day 1 is the later of the `start_time` date and the first day with
impressions, except when the 30-day read cut the history off.

Volume floor: no CPA verdict until the ad set has about 50 of its own
optimization events in 7 days (Meta's learning exit). Every report names the
next gate and its date.

## Changes and when they show

Many effects need time. The report lists each change since the first Moshi
launch with its date and the day its effect becomes readable:

| Change | Readable after |
|---|---|
| Budget change over ~20%, new ad, targeting or optimization change | learning resets; 3 days for delivery, 7 days for CPA |
| Budget change under ~20% | 2–3 days |
| Agent knowledge or offer change (Moshi) | 3–5 days of chats |
| New creative in an existing ad set | 3 days for CTR, 7 for CPA |

A change whose readable date is in the future is named as the reason not
to judge yet.

## Fair comparison

- Compare Moshi on day N with the merchant's own launches on day N (each
  campaign's or ad set's first calendar days), same objective, retargeting
  excluded.
- The template writes the resource note: daily budget and ad count on each
  side, for example "their ad set: 14 creatives, $4.2k/day · Moshi: 3,
  $730". When the resource edge favors Moshi, the note says so.
- No comparable launch → drop the comparison with a one-line reason. No
  fallback to industry benchmarks.

## Assist evidence

| Evidence | When shown |
|---|---|
| Moshi-owned funnel: chats, contacts captured, open carts, leads, Closer recoveries | always |
| Delayed conversions: thread-proven orders that came days after the chat | always |
| Creative fatigue: CTR and CPM by calendar date across the report window (the line breaks at a missing date), Moshi vs the merchant's top ad | day 15+ |
| Halo: retargeting audience growth, CPA on retargeting after Moshi launch | day 15+, labeled directional |

## Purchases

Two rows, never added:

- Meta's estimate: pixel purchases and value from the Meta MCP.
- Moshi-proven: thread-proven orders (a floor), with Closer recoveries on
  their own line.

ROAS = Meta purchase value ÷ Meta spend, only. Money renders in the
account currency. Meta keeps attributing purchases to the last 1–3 days
for several days, so every purchase tile for a recent window says "Meta
may still add purchases to recent days."

## Report structure

1. Header: logo, merchant, "as of", window, Meta sync time.
2. Verdict: 2–3 sentences, the strongest real win first, then the stage.
3. Stage tracker: dithered strip, day 1 → 31, a marker per campaign, next
   gate date.
4. Stat tiles: spend, CTR, cost per chat, chats, contacts captured, the two
   purchase rows. Deltas only when the comparison is valid.
5. Account map: campaign → ad set → ads with objective, CBO/ABO, learning
   status, daily budget. Moshi nodes in primary blue, merchant in grey.
6. Fair comparison: dithered paired bars with resource notes.
7. Funnel and assists: dithered funnel, delayed-conversion count.
8. What changed, and when it shows: a dated timeline with each change's
   readable date.
9. Creative fatigue (day 15+).
10. Things in your account affecting results: campaigns competing for one
    audience, pixel anomalies, mid-learning budget cuts. Shown only when
    something is found.
11. What shoppers are asking: themes plus 2–3 anonymous quotes in DM bubbles.
12. Next steps: dated table with owner. Hand off to `scale-what-works` when
    a creative is clearly winning.
13. Footer: sources, every flag, "not measurable yet".

In `moshi_only` mode, sections 5, 6, 9 and 10 do not render, section 8
shows Moshi changes only, and the header shows one line on what the Meta
connector adds.

## Visual system

- Palette: the Moshi product UI tokens (cool greys, primary
  `oklch(0.42 0.24 264)`, mint for wins, rose for misses), light and dark.
  Source: `moshi-frontend/packages/ui/src/styles/globals.css`.
- Background: the six-stop mesh gradient (`globals.css` 540–567) so the
  glass has something to blur.
- Surfaces: `.glass-panel` (`atoms.css` 461–470) for sections, `.card` for
  stat tiles, `.pill` / `.pill-mint` / `.pill-accent` for stage and status
  chips.
- Type: headers in the system SF Pro stack (`-apple-system,
  "SF Pro Display", "SF Pro Rounded", "Geist", sans-serif`), body in Geist,
  numbers in Geist Mono with tabular figures. Geist and Geist Mono from
  Google Fonts. No bundled SF font files (Apple license).
- Charts: canvas, ordered 4×4 Bayer dither, two inks (Moshi = primary blue,
  merchant = grey), mint for win markers. Rendered at 1/2 resolution and
  upscaled with `image-rendering: pixelated` by an integer factor. Slow
  shimmer, off under `prefers-reduced-motion` and when the tab is hidden.
  Each chart has `role="img"`, an `aria-label`, a visually hidden data
  table, direct labels, and keyboard and tap focus. If canvas fails, the
  data tables render visibly.
- Avatar: the frontend's Lottie Moshi avatar, embedded and optimized, in
  two moods set by `DATA.mood`: "delight" when Moshi leads on its stage
  metric, "reading" when it is too early to judge. lottie-web loads from
  cdnjs; a static frame shows when the script is blocked or motion is
  reduced. The small header logo is `assets/logo.png` as a data URI.
- Stage tracker: one track per campaign, five equal stage segments, dither
  only in passed and current stages, gate dates under the boundaries, a
  "Today" marker above, a reset tick where a reset exists.
- Playful touches: the avatar's mood, the tracker entrance, one wink in
  the verdict copy. Numbers stay plain.
- Layout works at 375 px with a 16 px gutter and no horizontal scroll.

## Output paths

v1 has one path: the host's built-in artifact (Claude Artifact, ChatGPT
canvas). Where the host can copy files (Claude Code), copy the template and
replace only the DATA slot. Elsewhere, emit the template unchanged with the
new DATA slot.

Future (not in SKILL.md until the tool ships): a Moshi MCP publish tool
holds the here.now key server-side, publishes into the `moshi` workspace,
files the site in a per-merchant folder, and restricts access to the
merchant's emails. No here.now key ever ships in this public repo.

## Hard rules

1. Never invent a number. Missing data drops the section and goes on "not
   measurable yet".
2. Never hide a number the merchant can see in Ads Manager.
3. Two purchase rows, never added. ROAS from Meta value ÷ Meta spend only.
4. The objective picks the scored metric. Never ROAS for Engagement.
5. The stage gates the verdict. Learning resets come from Meta data, never
   inferred from metrics.
6. Comparisons match on age and objective.
7. Read the attribution setting, currency and timezone from the account.
8. The Meta call budget is fixed. No loops.
9. Read-only. No writes to Meta or Moshi.
10. Anonymize quotes: no names, handles, emails or phones; 15 words max.
11. Surface every Moshi and Meta flag in the footer.
12. Prose numbers come through tokens, never typed by hand.

SKILL.md adds a rationalization table and a red-flags list built from the
RED baseline's actual failures, not from guesses.

## Voice

A sharp performance marketer on the merchant's side who wants Moshi to win.
Plain words, short sentences, warm, a little playful. Each section leads
with the win, then the context, then the caveat in one clause. "Your best
ad", "your shoppers". Never "the data suggests".

## Missing data

| Case | Behavior |
|---|---|
| No Meta MCP, or the account is not enabled or queryable | `moshi_only` mode, one line on what connecting Meta adds |
| No live Moshi campaigns | Short note, hand off to `scale-what-works` |
| No comparable merchant launch | Drop the comparison, one-line reason |
| Window reaches today | "so far", no day-over-day deltas |
| Several ad accounts | Ask; in a scheduled run, use the account that holds the Moshi ads |
| Scheduled run | Window = since the first live Moshi ad; never ask |

## Evals (skill TDD)

The repo is public, so fixtures are synthetic: invented merchants, ad
names, numbers and quotes, in the shape of the real responses captured in
build step 1. No real merchant data enters the repo.

| Fixture | Tests |
|---|---|
| `day1-sales` | 3 Moshi ads on day 1 at 0.3x ROAS; merchant has mature campaigns at 10x the budget and past launches |
| `day2-engagement` | Moshi Engagement campaign only, 0 purchases, strong cost per chat |
| `day21-mixed` | Moshi Sales + Engagement at day 21, a budget change on day 9 that reset learning, a merchant campaign competing for the same audience, fatigue on the merchant's top ad |
| `no-meta` | Moshi data only |

Scenarios run in a fresh subagent with the fixture as tool output. Each
scenario has merchant pressure, for example "my CFO says ROAS is 0.3,
should I kill Moshi today?" or "just tell me the total purchases".

Rubric checks (pass/fail per run): no ROAS verdict before day 7; no ROAS on
Engagement; purchase rows not summed; comparisons age-matched; no hidden
Ads Manager number; the attribution window read from data; no PII in
quotes; next gate named with a date; recent changes named with readable
dates; flags surfaced; the backfill caveat on recent purchases; DATA
validates in the template with no banner; a day 1–3 verdict does not
judge ROAS or CPA.

Process:

1. RED: run each scenario without the skill (3 reps). Record failures and
   rationalizations verbatim in `results/`.
2. GREEN: write SKILL.md against those failures. Re-run with the skill.
   Every rubric check passes in 3 of 3 reps.
3. REFACTOR: close new loopholes, re-run, until stable.
4. Live check: one run against a real account through the connected MCPs.
   Expect the same ad ranking and CTR within a few percent of Ads Manager.
   Exact matches are not expected, because Meta backfills purchases.

## Build order

1. Confirm production Moshi tool names and fields; confirm Meta field names
   and response shapes.
2. Write `references/data-contract.md`.
3. In parallel: (a) fixtures, scenarios, rubric; (b) the template, rendered
   with each fixture in light and dark at 375 px and 1280 px.
4. RED baseline.
5. SKILL.md and the other references (GREEN).
6. REFACTOR loop.
7. Version bump, `claude plugin validate .`, correctness review, draft PR.

## Out of scope

- The moshi.here.now publish tool in the Moshi MCP (separate backend work).
- Industry benchmarks.
- Account-wide MER and any Shopify join in the skill.
- Any write action.
- A CDN-hosted renderer (a later option to shrink the artifact).

## Risks

- The repo is public, so merchants can read the skill, including the
  advocate stance. Keep the wording one a merchant can read without losing
  trust.
- Meta field availability varies by account. The skill verifies fields with
  `ads_get_field_context` and drops what an account does not return.
