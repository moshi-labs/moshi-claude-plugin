# DATA contract (schemaVersion 1)

The report template reads one object, `const DATA = {...};`, in the last
script of `assets/pulse-check.html`. You fill it with raw numbers. The
template computes every rate, cost, ratio, age, stage and resource note.
Never put a computed value in DATA.

Rules for every field:

- Money is a plain number in the account currency (`12.5`, not `"$12.50"`).
- Dates are `YYYY-MM-DD` in the account timezone. Timestamps are ISO 8601.
- A value you do not have is `null`. Never `0` for unknown. `0` means Meta
  or Moshi reported zero.
- Ids are strings.
- Day numbering: day 1 is the later of the `startTime` and the first
  `daily[]` row with impressions. A campaign paused at creation counts from
  its first delivery. "The first N days" means days 1 to N.
  `stage-gates.md` has the full rule, the read-start exception and the
  fallbacks.

## Top level

| Field | Type | Source |
|---|---|---|
| `schemaVersion` | `1` | constant |
| `merchant.name` | string | Meta ad account name, or the Moshi org name |
| `merchant.currency` | ISO code or null | `ads_get_ad_accounts` → `currency`; in `moshi_only`, the Moshi org currency if a tool returns it, else null |
| `merchant.timezone` | IANA name or null | `ad_account` level → `timezone_name`; in `moshi_only`, the Moshi org timezone if returned, else null (the template then uses UTC and says so) |
| `asOf` | timestamp | when you read the data |
| `window.start`, `window.end` | date | the report window, both days included |
| `window.partial` | boolean | `true` when `window.end` is today |
| `metaSyncedAt` | timestamp or null | when the Meta reads ran; null in `moshi_only` |
| `mode` | `"full"` or `"moshi_only"` | `moshi_only` when Meta is missing, not enabled, or not queryable |
| `mood` | `"delight"` or `"reading"` | `"delight"` when a Moshi campaign leads on the metric its stage allows; `"reading"` when it is too early to judge. Sets the avatar. Missing values render as `"reading"` |
| `verdict.headline` | string, ≤ 90 chars | you write it, with tokens |
| `verdict.body` | string, 2–3 sentences | you write it, with tokens |

## `campaigns[]`

One entry per campaign that delivered in the window, plus each merchant
campaign you name in `comparisons`. In `moshi_only` mode, leave it empty.

Only some campaigns get ad-level `daily[]` rows: Moshi campaigns, every
campaign read 7 returned, and the campaigns that hold the merchant's top
ads. A campaign that read 7 returned keeps all its rows and
`adsPulled: "all"`, whether or not you compare it. Every other campaign
keeps `ads: []` and appears in the account map with its structure only.
The template shows no metrics for it.

`adsPulled` tells the template which ads you pulled. Read 7 pulls every
ad of a comparison launch, and read 6 pulls every Moshi ad. Read 6 pulls
only the merchant's top ads. `adsPulled` is `"all"` only when every ad
set's ads came from read 7 (or the campaign is Moshi's). If any ad set has
only read-6 top ads, use `"top"`. The template trusts `adsPulled`. It never
infers it from names, comparisons or ad counts. When `adsPulled` is
missing, the template uses `"all"` for a Moshi campaign, `"top"` for a
merchant campaign with ads, and `"none"` for a merchant campaign without
ads.

| Field | Type | Source |
|---|---|---|
| `id`, `name` | string | campaign `id`, `name` |
| `owner` | `"moshi"` or `"merchant"` | `"moshi"` when any of its ads is in `get_organization_ads` |
| `objective` | `"engagement"`, `"sales"` or `"other"` | see Objective mapping |
| `metaObjective` | string | campaign `objective`, verbatim |
| `budgetType` | `"CBO"` or `"ABO"` | `"CBO"` when the campaign has `daily_budget` or `lifetime_budget` |
| `dailyBudget` | number or null | campaign `daily_budget` (CBO only) |
| `status` | string | campaign `effective_status` |
| `startTime` | date or null | campaign `start_time`; null when Meta returns 1969-12-31 |
| `adsPulled` | `"all"`, `"top"` or `"none"` | `"all"` for a Moshi campaign and for a campaign where every ad set's ads came from read 7; `"top"` when any ad set has only read-6 top ads; `"none"` when `ads` is empty in every ad set |
| `retargeting` | boolean | `true` when the name or audience shows retargeting; else `false` |
| `adsets` | array | below |

### `campaigns[].adsets[]`

| Field | Type | Source |
|---|---|---|
| `id`, `name` | string | ad set `id`, `name` |
| `startTime` | date or null | ad set `start_time` (read 4); null when Meta returns 1969-12-31 |
| `optimizationGoal` | string | `optimization_goal`, verbatim |
| `dailyBudget` | number or null | ad set `daily_budget` (ABO only) |
| `learning` | `"learning"`, `"limited"`, `"success"` or null | a learning status only when Meta returns one; else null. Never infer it. |
| `adCount` | integer or null | the number of read-5 rows with this `adset_id` and `effective_status` `ACTIVE`; the account map and the resource note show it |
| `lastLearningReset` | date or null | `learning_stage_info.last_sig_edit_ts` (epoch seconds) in the account timezone. Copy it even when it falls on launch day; the template treats that as the launch, not a reset |
| `attributionSetting` | string or null | `attribution_setting`, verbatim |
| `ads` | array | below |

### `campaigns[].adsets[].ads[]`

| Field | Type | Source |
|---|---|---|
| `id`, `name` | string | ad `id`, `name` |
| `angle` | string or null | a 2–4 word creative label you write, for example "Dermatologist reaction" |
| `daily` | array | one row per day with delivery, from the `time_increment: "1"` read |

`daily[]` row:

| Field | Type | Meta field |
|---|---|---|
| `date` | date | `date_start` |
| `spend` | number | `amount_spent.value` |
| `impressions` | integer | `impressions` |
| `linkClicks` | integer or null | `link_click` |
| `conversations` | integer or null | `results` value when `results.indicator` is `actions:onsite_conversion.messaging_conversation_started_7d`; else null |
| `purchases` | integer or null | `omni_purchase` |
| `purchaseValue` | number or null | `omni_purchase_values.value` |
| `frequency` | number or null | `frequency` |

Each ad has one row per date. Merge reads 6 and 7: when both return a
date for one ad, keep one row. The values are the same, so keep the read-6
row. Keep every other row, and never trim rows to the report window.
Comparisons read days 1–N, which can fall before the window.

Do not copy Meta's `ctr`, `cpc`, `cpm`, `cost_per_result` or
`purchase_roas`. The template computes them from the raw fields.

## Objective mapping

| Meta signal | `objective` |
|---|---|
| `OUTCOME_ENGAGEMENT`, or any ad set with `optimization_goal` `CONVERSATIONS` | `"engagement"` |
| `OUTCOME_SALES` with a purchase optimization goal | `"sales"` |
| anything else | `"other"` |

A Sales campaign whose ad sets optimize for `CONVERSATIONS` is
`"engagement"`. The ad set's goal decides what Meta optimizes for.

## `moshi`

Moshi's own funnel for the report window. Every field can be null.

| Field | Type | Source |
|---|---|---|
| `firstLaunch` | date | the first Moshi ad's launch date; the template computes age and stage from it in `moshi_only` mode. When no tool returns a launch date, use `window.start` and say so in `notMeasurableYet` |
| `spend` | number | `get_ad_performance` → Moshi-managed spend |
| `chats` | integer | conversations started |
| `chatsFromAds` | integer | conversations that came from an ad, not a profile button |
| `contactsCaptured` | integer | emails plus phones captured |
| `productViews` | integer | conversations that clicked to a product page |
| `carts` | integer | conversations that reached a cart |
| `checkouts` | integer | conversations that reached checkout |
| `provenOrders` | integer | thread-proven orders. A floor. |
| `provenRevenue` | number | revenue of `provenOrders` |
| `delayedOrders` | integer | proven orders placed 1+ days after the chat |
| `closerRecoveries` | integer | orders recovered by Closer |
| `closerRevenue` | number | revenue of `closerRecoveries` |

Never add `provenOrders` to Meta `purchases`. The template shows them in
two separate rows.

## `comparisons[]`

You pick the pairs. The template draws the bars and writes the resource
note.

| Field | Type | Meaning |
|---|---|---|
| `metric` | `"ctr"`, `"cpc"`, `"costPerConversation"`, `"cpa"` or `"roas"` | the metric to compare |
| `day` | integer ≥ 1 | compare each campaign's first `day` days |
| `moshiCampaignId` | string | a `campaigns[].id` with `owner: "moshi"` |
| `merchantCampaignId` | string | a `campaigns[].id` with `owner: "merchant"` |

Both campaigns must have the same `objective`, and both need a `daily[]`
row with impressions on each of days 1 to `day`, with no gap. `cpa` and
`roas` need `day` 8 or more. The merchant
campaign must have `retargeting: false`. When no valid pair exists, leave
`comparisons` empty and put the reason in `notMeasurableYet`.

## `changes[]`

Every change since the first Moshi launch that can move results.

| Field | Type | Source |
|---|---|---|
| `date` | date | activity log `datetime` (month/day/year) or the Moshi change date |
| `what` | string, ≤ 80 chars | "Budget raised from $500 to $730/day" |
| `kind` | `"budget_major"`, `"budget_minor"`, `"new_ad"`, `"targeting"`, `"optimization"`, `"status"`, `"agent_knowledge"` or `"offer"` | your classification |
| `source` | `"meta"` or `"moshi"` | |
| `entityId` | string or null | the campaign, ad set or ad id |

The template computes each change's readable date from `kind` and
`date`. A budget change is `budget_major` when it moves the budget by more
than 20%.

## Other arrays

| Field | Shape | Notes |
|---|---|---|
| `accountIssues[]` | `{ kind, severity: "info"\|"warn", text }` | from the anomaly scan and your structure read; `kind` is `"audience_overlap"`, `"pixel"`, `"budget_cut"`, `"learning_limited"` or `"other"` |
| `shopperThemes[]` | `{ theme, text }` | 2–4 themes from the chats |
| `quotes[]` | `{ text, source: "ad"\|"profile" }` | 2–3 quotes, anonymized, ≤ 15 words each |
| `nextSteps[]` | `{ step, what, owner: "moshi"\|"merchant", by }` | `by` is a date |
| `flags[]` | `{ source: "moshi"\|"meta", code, text }` | every flag from every tool, plus `meta_rate_limited` when it happens |
| `notMeasurableYet[]` | string | each item you could not measure, and why |

## Tokens

Tokens resolve only in `verdict`, `shopperThemes[].text` and
`nextSteps[].what`. Prose there cites numbers only through tokens. Every
other string prints exactly as typed, so it holds no tokens and no
numbers you computed.

| Token | Value |
|---|---|
| `{c:<campaignId>.<metric>}` | one campaign over the window |
| `{s:<adsetId>.<metric>}` | one ad set over the window |
| `{a:<adId>.<metric>}` | one ad over the window |
| `{all:moshi.<metric>}` | all Moshi campaigns over the window; needs at least one Moshi campaign |
| `{all:merchant.<metric>}` | all merchant campaigns over the window |
| `{m:<moshiField>}` | a `moshi` field (`firstLaunch` renders as a date, "Sep 22"), or `costPerChat` (= `spend ÷ chatsFromAds`; no value when `chatsFromAds` is null), `age` and `stage` (from `firstLaunch`), `nextGate` and `nextGateDate` (the earliest gate among Moshi campaigns) |
| `{cmp:<index>.moshi}`, `{cmp:<index>.merchant}` | comparison `index` (0-based): each side's value over the first `day` days |
| `{cmp:<index>.note}` | comparison `index`: the resource note the template wrote |

Only the tokens in this table resolve. Any other `{…}`, such as
`{cmp:0.day}`, fails the data check and hides the verdict. Write a day
count in words: "over the same first days of life".

Metrics for `c`, `s`, `a` and `all`: `spend`, `impressions`, `linkClicks`,
`ctr` (link clicks ÷ impressions), `cpc`, `cpm`, `conversations`,
`costPerConversation`, `purchases`, `purchaseValue`, `roas`, `cpa`,
`frequency`, `ads` (count). Campaigns and ad sets also take `age`,
`stage`, `nextGate` and `nextGateDate`.

`roas` and `cpa` on an `engagement` campaign fail the data check. Write
the numbers you mean, not the arithmetic: `{c:123.cpc}`, never "$412 ÷
160".

What tokens render, so the sentence around them reads right:

- `age` renders "day 5". Write "Moshi is on {m:age}", never "day {m:age}".
- `stage` renders a label such as "Learning" or "Early read". Write "Stage:
  {m:stage}", never "This is {m:stage} of Moshi".
- `nextGate` renders "day 8". `nextGateDate` renders "Oct 9". Both mean
  the nearest gate of any kind, not the first ROAS or CPA read.
- `{m:age}` and `{m:stage}` count from `firstLaunch` and ignore resets.
  For a campaign with a reset, cite its own clock: `{c:<id>.age}`,
  `{c:<id>.stage}`. The data check fails `{m:age}` and `{m:stage}` when a
  Moshi ad set has a reset.
- `{m:nextGate}` and `{m:nextGateDate}` are the earliest next gate among
  the Moshi campaigns, each on its own reset clock.
- `c:`, `s:`, `a:` and `all:` metrics cover the whole report window,
  including days before a reset. Never write "since <date>" next to one.
- `costPerConversation` divides by Meta's conversations. `{m:costPerChat}`
  divides by Moshi's `chatsFromAds`. Name the one you cite.
- A token with no value (a null field, or a rate with a zero or null
  divisor) fails the data check and hides its element. Cite only numbers
  that exist. `{m:firstLaunch}` renders a date such as "Sep 22". It fails
  check 9 when `firstLaunch` is null, and check 8 when it is not a valid
  date.

A `c:` or `s:` token on a campaign with `adsPulled: "top"` fails the data
check. So does an `{all:merchant.…}` token when any merchant campaign has
`adsPulled` other than `"all"` (`"top"` or `"none"`). Cite merchant campaigns through `cmp:` tokens. When the
merchant asks about a number on such a campaign, state it in the chat
reply from read 3, with its date range and attribution window.

## Data checks

The template shows a "data check" banner and hides the affected part when
a check fails:

0. The DATA block is missing, or the report could not render.
1. ROAS or CPA would show for an engagement campaign.
2. A comparison breaks `comparison-method.md`: unknown ids or owners,
   different objectives, a retargeting merchant campaign, a merchant
   campaign whose `adsPulled` is not `"all"`, a merchant
   `startTime` that is null or more than 90 days before `asOf`, a `day`
   outside 1–14, a side without a row with impressions on each of days
   1–N, or `cpa`/`roas` on a non-Sales campaign, with `day` under 8, or
   before day 8 on Moshi's reset clock.
3. A token points to nothing, uses an unknown metric, or is malformed, or
   an `{all:moshi.…}` token has no Moshi campaign.
4. A quote holds an email, a phone number, an @handle, or more than 15
   words.
5. `schemaVersion` is not 1.
6. A `c:` or `s:` token cites a campaign with `adsPulled: "top"`, or an
   `{all:…}` token covers a campaign with `adsPulled` other than `"all"`.
7. `{m:age}` or `{m:stage}` is used while a Moshi ad set has a learning
   reset.
8. A date field (`window.*`, `moshi.firstLaunch`, `campaigns[].startTime`,
   `adsets[].startTime`, `adsets[].lastLearningReset`, `changes[].date`,
   `nextSteps[].by`, `daily[].date`) is not a `YYYY-MM-DD` date, or a
   `{m:…}` age or `firstLaunch` token needs the invalid `firstLaunch`.
9. A token has no value: a numeric metric that is null or not finite, or
   a null `{m:firstLaunch}`. Dates and text never fail this check.
10. An ad has two `daily[]` rows for one date. The template drops that
   ad's rows and marks the ad, its ad set and its campaign. It hides every
   metric token on them, every comparison with that campaign on either
   side, and the Meta tiles when the campaign is Moshi's. The fatigue chart
   skips the campaign. Age, stage and gate tokens still render.

## Minimal example

```js
const DATA = {
  schemaVersion: 1,
  merchant: { name: "Fernleaf Tonics", currency: "USD", timezone: "America/Los_Angeles" },
  asOf: "2026-10-06T18:40:00Z",
  window: { start: "2026-10-05", end: "2026-10-06", partial: true },
  metaSyncedAt: null,
  mode: "moshi_only",
  verdict: {
    headline: "Your chat ads are starting chats at {m:costPerChat} each.",
    body: "Moshi is on {m:age}, a read on attention. Purchases are too early to call."
  },
  campaigns: [],
  moshi: { firstLaunch: "2026-10-05", spend: 412.3, chats: 14, chatsFromAds: 12, contactsCaptured: 3, productViews: 4,
           carts: 1, checkouts: 1, provenOrders: 0, provenRevenue: 0, delayedOrders: 0,
           closerRecoveries: 0, closerRevenue: 0 },
  comparisons: [], changes: [], accountIssues: [], shopperThemes: [], quotes: [],
  nextSteps: [], flags: [], notMeasurableYet: ["Purchases: too early on day 2"]
};
```
