# Meta reads

Meta numbers come from one Moshi tool, `get_ad_account_tree`. It returns
Moshi's synced copy of the org's whole Meta ad account as campaign → ad
set → ad, holding Moshi's ads and the merchant's own. Moshi refreshes the
copy about every 6 hours, so today's numbers are partial and the latest
hours can be missing. The report footer says so.

The tool reads the org this Moshi session is signed in to. It takes no
organization argument, so never pass one.

## The plan

Make at most five reads, plus any splits the size guard needs. Never call
once per ad. Dates are `YYYY-MM-DD`, include both ends, and are the ad
account's own days.

| Read | Arguments | Gives |
|---|---|---|
| T1 account | `dateFrom`: 29 days before today, `dateTo`: today, `maxAds: 0` | `account`, `organization`, `flags`, and every campaign and ad set that delivered in those 30 days, with no ad rows |
| T2 Moshi ads | T1's `window.dateFrom` and `window.dateTo`, `granularity: "daily"`, `owner: "moshi"`, `maxAds: 500` | daily rows for every Moshi ad |
| T3 top ads | T1's dates, `granularity: "daily"`, `owner: "merchant"`, `maxAds: 3` | daily rows for the merchant's 3 top ads by spend |
| T4 launches | `dateFrom`: 89 days before today, `dateTo`: today, `owner: "merchant"`, `maxAds: 0` | the merchant's campaigns that delivered in the last 90 days, with `startTime`. These are the launch candidates |
| T5 one launch | `adsetIds`: every ad set T4 lists for the launch, `granularity: "daily"`, `dateFrom`: its `startTime` day, `dateTo`: 13 days later | daily rows for every ad of the launch, days 1–14 |

- Read T1 first. If its `flags` include `no_synced_ads`, Moshi has no Meta
  ad account connected or nothing has synced yet. Stop there and use
  `mode: "moshi_only"`. Do the same if T1 returns an error.
- Skip T2, T4 and T5 when T1 lists no campaign with `owner` `moshi` or
  `mixed`. Skip T3 when T1 lists none with `owner` `merchant` or `mixed`.
- Run T5 once for each launch you will compare, at most two. Pick them from
  T4 with `comparison-method.md`. Skip T5 when no launch qualifies, and
  never put two launches in one call.
- No daily read spans more than 30 days, so the tool's 92-day daily cap
  never applies.

## Reading the responses

- Read `flags` first, then `counts`.
- Every campaign, ad set and ad has an `owner`: `moshi`, `merchant`, or
  `mixed` (a campaign or ad set holding both). Moshi created the ads whose
  `moshiFlowId` is set.
- Money is a plain number in `account.currency`. Budgets (`dailyBudget`,
  `lifetimeBudget`) are strings in minor units, so divide by 100. A
  currency without cents, such as JPY or KRW, is already in whole units.
  When `account.currency` is null, leave every budget null.
- When `account.currency` or `account.timezone` is null, Meta did not say.
  Never assume USD or UTC.
- `startTime` looks like `2026-09-16T09:15:00-0500` and is written in the
  account's own offset, so its first 10 characters are the day.
  `1969-12-31` means unknown.
- `lastSignificantEditAt` is a UTC timestamp. Convert it to
  `account.timezone` before you take the day: `2026-09-24T03:00:00Z` is
  Sep 23 in America/Chicago.
- Ad sets carry these settings only when Meta reports them as ACTIVE:
  `optimizationGoal`, `attributionSpec`, `bidStrategy`, `dailyBudget`,
  `lifetimeBudget`, `learningPhase` and `lastSignificantEditAt`. Moshi
  reads them live. A missing setting means it was not read, never "none".
  Write null and never infer one.
- `daily[]` holds one row for each day with delivery. A day with no row had
  no delivery. Each row's `reach` is that day's own reach.
- Daily `linkClicks` is missing on an older Moshi API. Write null, never 0.
- Do not copy `roas`, `cpm`, `costPerMessagingConversationStarted`,
  `funnel.ctr` or window `reach`. The template computes every rate from
  the raw daily fields.
- Purchases are Meta's attributed count under each ad set's attribution
  setting. Never treat them as Moshi's thread-proven orders.

## Flags and errors

Every tool flag goes in `flags[]` with `source: "meta"`, with one
exception. On T1, T3 and T4 you set `maxAds` yourself, so an
`ads_over_max_ads` flag there is expected. Leave that one out.

| Code or result | Meaning | What you do |
|---|---|---|
| `no_synced_ads` (T1) | No Meta ad account in Moshi, or nothing has synced. This is no data, not zero | Use `moshi_only` |
| `no_delivery_in_range` or `nothing_matched` (T1) | The account is synced, but nothing delivered in the 30 days | Keep `full`, with `campaigns: []` |
| `reach_pending` | Window reach was still loading, so every window `reach` is null | Use only the daily rows' `reach`. Window reach is unknown. Never sum or max the daily rows to stand in for it |
| `partial_result` | Part of the account may be missing | Never present a total as the whole account's |
| `ads_over_max_ads` (T2) | Moshi has more than 500 ads | Read the rest one campaign at a time, as the size guard does |
| `requested_ids_unmatched` | `unmatchedIds` gives a reason for each missing id | If the reason is "nothing delivered in this range", that ad set has no rows there. For any other reason, leave the id out and name it in `notMeasurableYet`. Never report it as zero |
| An error that is not a size refusal | The read failed | If T1 failed, use `moshi_only`. If a later read failed, keep what loaded, add the flag `meta_read_failed`, and drop the parts that need the missing read. Never retry in a loop |

## Size guard

The tool refuses any result over 60,000 characters. The refusal starts with
`TOO LARGE` and lists the campaign and ad set ids to narrow by. Narrow one
campaign at a time and keep every other argument. Never shorten the dates.

- T1: make one call per campaign in the refusal's list. Take Moshi
  campaigns first, then the merchant's by spend, at most 5 calls. Add
  "Account map: only your largest campaigns are shown" to
  `notMeasurableYet`.
- T2: make one call per Moshi campaign (`campaignIds: [id]`). If a
  campaign is still refused, make one call per ad set (`adsetIds: [id]`).
- T5: make one call per ad set of the launch.
- T3 or T4: if refused, skip it and add the missing part to
  `notMeasurableYet` (your top ads, or your launches).
- If a single ad set is still refused, leave it out and name it in
  `notMeasurableYet`.

## What replaced the Meta Ads reads

| Before 0.9.0 (Meta Ads MCP) | Now |
|---|---|
| 1 `ads_get_ad_accounts`: currency, `is_ads_mcp_enabled`, `is_queryable` | T1 `account.currency`. `no_synced_ads` sets `moshi_only` |
| 2 account level: `timezone_name` | T1 `account.timezone` |
| 3 campaign level | T1 campaign rows |
| 4 ad set level | T1 ad set rows, with settings on ACTIVE ad sets only |
| 5 ad structure: ad counts, top ads | T1 `adsOverMaxAds`. T3 picks the top ads |
| 6 daily rows, Moshi ads and the top 3 | T2 and T3 |
| 7 comparison launches | T4 finds them and T5 reads each one |
| 8 activity log | None in v1. Meta changes show only as significant edits |
| 9 anomaly signal | None in v1 |
| `get_organization_ads` | The tree's `owner` labels |

## Limits

- Read-only. Never call a tool that creates, updates, pauses or activates
  anything.
- Handle each failed read once, as the flag table says. Never retry in a
  loop.
