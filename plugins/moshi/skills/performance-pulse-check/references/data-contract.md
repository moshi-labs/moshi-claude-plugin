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
| `merchant.name` | string | T1 `organization.name`, else the org name a Moshi tool returns |
| `merchant.currency` | ISO code or null | T1 `account.currency`, null when it is null; in `moshi_only`, the Moshi org currency if a tool returns it, else null |
| `merchant.timezone` | IANA name or null | T1 `account.timezone`, null when it is null; in `moshi_only`, the Moshi org timezone if returned, else null (the template then uses UTC and says so) |
| `asOf` | timestamp | when you read the data |
| `window.start`, `window.end` | date | the report window, both days included: the window `get_ad_performance` returns (the Moshi tools' window), never T1's 30 days |
| `window.partial` | boolean | `true` when `window.end` is today |
| `metaSyncedAt` | timestamp or null | when you ran T1 (Moshi's copy can be up to about 6 hours older); null in `moshi_only` |
| `metaWindow` | `{ start, end }` or null | T1's `window.dateFrom` and `window.dateTo`, the dates every `metaSpend` covers; null in `moshi_only` |
| `mode` | `"full"` or `"moshi_only"` | `moshi_only` when T1 flags `no_synced_ads` or fails (see `meta-reads.md`) |
| `mood` | `"delight"` or `"reading"` | `"delight"` when the primary campaign leads on the metric its stage allows; `"reading"` when it is too early to judge. Sets the avatar. Missing values render as `"reading"` |
| `primaryCampaignId` | string or null | the Moshi campaign with the largest spend in the window (its daily `spend` rows inside `window`); the verdict is about it. Null in `moshi_only` or when no Moshi campaign spent in the window |
| `verdict.headline` | string, ≤ 90 chars | you write it, with tokens, about the primary campaign |
| `verdict.body` | string, 2–3 sentences | you write it, with tokens |
| `iceBreakers` | object or null | `get_ad_performance` → `iceBreakers`, as the tool returns it. The template reads `total`, `items[].text`, `items[].conversations` and `typedOwn.conversations`, and works out shares that add up to 100%. Null when the tool does not return it |

The template picks the primary campaign the same way and checks your
`primaryCampaignId` against it (check 13). Another Moshi campaign shows
beside the primary only when it has at least 25% of Moshi's spend in the
window and delivered in the last 7 days: below a quarter of the money it
cannot change the read, and a campaign idle for a week is history, not a
live decision. Every other Moshi campaign gets one footnote line under the
verdict ("Also ran: X, $Y, stopped on Sep 25"), and its gates do not count
for `{m:nextGate}`.

## `campaigns[]`

One entry per campaign that delivered in T1's dates, plus each merchant
campaign you name in `comparisons` or that T6 returned. In `moshi_only`
mode, leave it empty.

Only some campaigns get ad-level `daily[]` rows: Moshi campaigns (T2),
every launch T5 read, the campaigns that hold the merchant's top ads (T3),
and the ads T6 read. A launch T5 read keeps all its rows and
`adsPulled: "all"`, whether or not you compare it. Every other campaign
keeps `ads: []`. The account map shows Moshi's campaigns and the merchant
ad sets their ads were cloned from or share a creative with; every other
merchant campaign collapses into one line from its `metaSpend`. The reads
are in `meta-reads.md`.

`adsPulled` tells the template which ads you pulled. T2 pulls every Moshi
ad, and T5 every ad of a launch. T3 pulls only the merchant's top ads and
T6 only the ads it names. On a campaign, `adsPulled` is `"all"` only when
every ad set's ads came from T2 or T5, `"none"` when no ad set has ads,
and `"top"` otherwise. Set it on an ad set too when it differs from its
campaign: a launch ad set T5 read inside an older campaign is `"all"`.
The template trusts `adsPulled`. It never infers it from names,
comparisons or ad counts. When it is missing, a campaign is `"all"` if
Moshi's, `"top"` with ads and `"none"` without; an ad set takes its
campaign's `"all"` or `"none"`, and under a `"top"` campaign it is `"top"`
with ads and `"none"` without.

| Field | Type | Source |
|---|---|---|
| `id`, `name` | string | campaign `campaignId`, `campaignName` |
| `owner` | `"moshi"` or `"merchant"` | `"moshi"` when T1's `owner` is `moshi` or `mixed`, else `"merchant"`. T2 pulls only the Moshi ads of a `mixed` campaign |
| `objective` | `"engagement"`, `"sales"` or `"other"` | see Objective mapping |
| `metaObjective` | string | campaign `objective`, verbatim |
| `budgetType` | `"CBO"` or `"ABO"` | `"CBO"` when the campaign has `dailyBudget` or `lifetimeBudget` |
| `dailyBudget` | number or null | campaign `dailyBudget` ÷ 100 (CBO only; `meta-reads.md` covers currencies without cents) |
| `status` | string | campaign `status`, verbatim |
| `startTime` | date or null | the day of campaign `startTime`; null when it is missing or 1969-12-31 |
| `adsPulled` | `"all"`, `"top"` or `"none"` | `"all"` when every ad set's ads came from T2 or T5; `"none"` when `ads` is empty in every ad set; else `"top"` |
| `retargeting` | boolean | `true` when the name or audience shows retargeting; else `false` |
| `metaSpend` | number or null | merchant campaigns: T1 campaign `metrics.spend`, its spend over `metaWindow`. The account map adds up the campaigns it does not show |
| `adsets` | array | below |

### `campaigns[].adsets[]`

| Field | Type | Source |
|---|---|---|
| `id`, `name` | string | ad set `adsetId`, `adsetName` |
| `status` | string or null | ad set `adsetStatus` (Meta's effective status), verbatim; `effectiveStatus` on an older API; null when neither is there. The map marks a Moshi ad set that is not `ACTIVE` |
| `startTime` | date or null | the day of ad set `startTime`; null when it is missing or 1969-12-31 |
| `optimizationGoal` | string or null | `optimizationGoal`, verbatim; null when it is missing. Moshi's own ad sets carry it even when paused; a merchant ad set only when ACTIVE |
| `dailyBudget` | number or null | ad set `dailyBudget` ÷ 100 (ABO only); null when it is missing |
| `adsPulled` | `"all"`, `"top"` or `"none"` | only when it differs from what the campaign implies (see above), such as a launch ad set T5 read inside an older campaign |
| `retargeting` | boolean | only on a retargeting ad set inside a campaign that is not |
| `totals` | object | T6's ad set `metrics` for the report window: `{ spend, impressions, conversations, purchases, purchaseValue }` (`conversations` is `messagingConversationsStarted`). Only on the merchant ad sets T6 returned |
| `learning` | `"learning"`, `"limited"`, `"success"` or null | `learningPhase.status`: `LEARNING` → `"learning"`, `FAIL` → `"limited"`, `SUCCESS` → `"success"`. Null when `learningPhase` is missing. Never infer it. |
| `adCount` | integer or null | T1's `adsOverMaxAds` for this ad set: its ads that delivered in the 30 days. T1 lists no ads, so it counts them all. Not the tree's `adCount`, which also counts paused and old ads. For a launch only T4 lists, use T4's. The account map and the resource note show it |
| `lastLearningReset` | date or null | `lastSignificantEditAt` as a day in the account timezone; null when it is missing. Copy it even when it falls on launch day; the template treats that as the launch, not a reset |
| `attributionSetting` | string or null | `attributionSpec` in words, in its order: `{CLICK_THROUGH, 7}, {VIEW_THROUGH, 1}` is `"7-day click, 1-day view"` (`ENGAGED_VIDEO_VIEW` is "engaged view"); null when it is missing, which the report prints as "Meta's default for this ad set (not reported)". Every ad set gets the field: an ad set without it hides its Meta purchases (check 12) |
| `ads` | array | below |

### `campaigns[].adsets[].ads[]`

| Field | Type | Source |
|---|---|---|
| `id`, `name` | string | ad `adId`, `adName` |
| `angle` | string or null | a 2–4 word creative label you write, for example "Dermatologist reaction". The overlap callout and the map name ads by it |
| `clonedFrom` | object or null | Moshi ads: the tree's `clonedFrom`, verbatim (`adId`, `adName`, `adsetId`, `campaignId`) |
| `creativeOverlap` | array | Moshi ads: the tree's `creativeOverlap`, verbatim; `[]` when it is empty. Leave both fields out on an older API that does not return them |
| `daily` | array | one row per day with delivery, from a `granularity: "daily"` read |

`daily[]` row:

| Field | Type | Tree field |
|---|---|---|
| `date` | date | `date` |
| `spend` | number | `spend` |
| `impressions` | integer | `impressions` |
| `reach` | integer or null | `reach`, that day's own. The template computes frequency as impressions ÷ reach |
| `linkClicks` | integer or null | `linkClicks`; null when it is missing |
| `conversations` | integer or null | `messagingConversationsStarted` |
| `purchases` | integer or null | `purchases` |
| `purchaseValue` | number or null | `purchaseValue` |

The overlap callout is the template's. For each Moshi ad in the primary
campaign (and any shown beside it) with `creativeOverlap`, it takes the
days in the window when that ad and at least one of the listed ads of
yours delivered, and shows Moshi's share of the impressions on those days.
It needs the listed ads' `daily` rows, which T6 reads. Quote its numbers
in the chat reply; never work out a share of your own.

Each ad has one row per date. Merge T2, T3, T5 and T6: when two reads
return a date for one ad, keep one row. The values are the same. Keep
every other row, and never trim rows to the report window. Comparisons
read days 1–N, which can fall before the window.

Do not copy the tree's `roas`, `cpm`, `costPerMessagingConversationStarted`,
funnel `ctr` or window `reach`. The template computes every rate from the
raw fields.

## Objective mapping

| Meta signal | `objective` |
|---|---|
| `OUTCOME_ENGAGEMENT`, or any ad set with `optimizationGoal` `CONVERSATIONS` | `"engagement"` |
| `OUTCOME_SALES` with a purchase optimization goal (`OFFSITE_CONVERSIONS`, `VALUE`) | `"sales"` |
| anything else | `"other"` |

A Sales campaign whose ad sets optimize for `CONVERSATIONS` is
`"engagement"`. The ad set's goal decides what Meta optimizes for. A
paused Moshi ad set still shows its goal, so a paused Moshi Sales campaign
is judged as sales. An `OUTCOME_SALES` campaign where no ad set shows an
`optimizationGoal` (a paused merchant campaign, or Moshi's on an older
API) has an unknown goal, so it is `"other"`.

## `moshi`

Moshi's own funnel for the report window. Every field can be null.

| Field | Type | Source |
|---|---|---|
| `firstLaunch` | date | the first Moshi ad's launch date; the template computes age and stage from it in `moshi_only` mode. When no tool returns a launch date, use `window.start` and say so in `notMeasurableYet` |
| `spend` | number | `get_ad_performance` → Moshi-managed spend |
| `chats` | integer | conversations started |
| `chatsFromAds` | integer | conversations that came from an ad, not a profile button |
| `contactsCaptured` | integer | `get_ad_performance` → `contactsCaptured.total` (emails plus phones) |
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
| `day` | integer ≥ 1 | compare each side's first `day` days |
| `moshiCampaignId` | string | a `campaigns[].id` with `owner: "moshi"` |
| `merchantAdsetId` | string | the merchant launch ad set, an `adsets[].id`; use it for a launch ad set inside an older campaign |
| `merchantCampaignId` | string | instead of `merchantAdsetId`, when the whole campaign is the launch |

Both sides must have the same `objective` (an ad set takes its campaign's),
and both need a `daily[]` row with impressions on each of days 1 to `day`,
with no gap. `cpa` and `roas` need `day` 8 or more. The merchant side must
not be retargeting, and must not hold an ad in a Moshi ad's
`creativeOverlap` (check 11). When no valid pair exists, leave
`comparisons` empty and put the reason in `notMeasurableYet`.

## `changes[]`

Every change since the first Moshi launch that can move results.

Moshi's synced data has no Meta change log. A Meta change shows only when
it restarted learning: for each ad set whose `lastLearningReset` falls
after its own day 1 and on or after the first Moshi launch, add
`kind: "significant_edit"`, `source: "meta"`, the ad set's id, and a
`what` such as "Meta restarted learning after a significant edit". Meta
does not say what the edit was, so never call it a budget, audience or
creative change. Moshi changes come from Moshi tools, for example
`get_recent_brand_doc_change` → `agent_knowledge`.

| Field | Type | Source |
|---|---|---|
| `date` | date | the day of `lastSignificantEditAt`, or the Moshi change date |
| `what` | string, ≤ 80 chars | "Meta restarted learning after a significant edit" |
| `kind` | `"significant_edit"`, `"budget_major"`, `"budget_minor"`, `"new_ad"`, `"targeting"`, `"optimization"`, `"status"`, `"agent_knowledge"` or `"offer"` | your classification |
| `source` | `"meta"` or `"moshi"` | |
| `entityId` | string or null | the campaign, ad set or ad id |

The template computes each change's readable date from `kind` and
`date`. A budget change is `budget_major` when it moves the budget by more
than 20%.

## Other arrays

| Field | Shape | Notes |
|---|---|---|
| `accountIssues[]` | `{ kind, severity: "info"\|"warn", text }` | issues on Moshi's own campaigns from your structure reads, for example a Moshi ad set whose `status` is not `ACTIVE`, or `learning_limited` for one whose `learning` is `"limited"`. They print under the overlap callout at the top of the report. The template writes the creative-overlap callout itself, and there is no anomaly scan, so add no overlap or pixel issue of your own. `kind` is `"audience_overlap"`, `"pixel"`, `"budget_cut"`, `"learning_limited"` or `"other"` |
| `shopperThemes[]` | `{ theme, text }` | 2–4 themes from the chats |
| `quotes[]` | `{ text, source: "ad"\|"profile" }` | 2–3 quotes, anonymized, ≤ 15 words each |
| `nextSteps[]` | `{ step, what, owner: "moshi"\|"merchant", by }` | `by` is a date |
| `flags[]` | `{ source: "moshi"\|"meta", code, text }` | every flag from every tool, as `meta-reads.md` says (`get_ad_account_tree` flags use `"meta"`), plus `meta_read_failed` when a read fails |
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
| `{m:<moshiField>}` | a `moshi` field (`firstLaunch` renders as a date, "Sep 22"), or `costPerChat` (the report's cost per ad chat over the window, on Meta's count: the spend of the Moshi campaigns that started chats ÷ Meta's chats started on them, `conversations`; a campaign that sends shoppers to the site stays out. When Meta reports no chats on any Moshi campaign, and in `moshi_only` mode, Moshi's count: `moshi.spend ÷ chatsFromAds`. The report names the count), `age` and `stage` (from `firstLaunch`), `nextGate` and `nextGateDate` (the earliest gate among the primary campaign and any campaign shown beside it) |
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
  the primary campaign and any campaign shown beside it, each on its own
  reset clock.
- `c:`, `s:`, `a:` and `all:` metrics cover the whole report window,
  including days before a reset. Never write "since <date>" next to one.
- `purchases`, `purchaseValue`, `roas` and `cpa` are Meta's purchase
  figures. The first one in each text renders with its ad sets'
  attribution window: "Meta credits it with {c:123.purchases} purchases"
  renders "Meta credits it with 28 purchases (7-day click, 1-day view)".
  Never type the window yourself.
- `{m:costPerChat}` is the report's cost per ad chat, on Meta's count of
  chats started unless Meta reports none. `costPerConversation` is the
  same division for one campaign, ad set or ad. Name the count when you
  cite either.
- A token with no value (a null field, or a rate with a zero or null
  divisor) fails the data check and hides its element. Cite only numbers
  that exist. `{m:firstLaunch}` renders a date such as "Sep 22". It fails
  check 9 when `firstLaunch` is null, and check 8 when it is not a valid
  date.

A `c:` or `s:` token on a campaign or ad set with `adsPulled: "top"` fails
the data check. So does an `{all:merchant.…}` token when any merchant
campaign has `adsPulled` other than `"all"` (`"top"` or `"none"`). Cite
merchant campaigns through `cmp:` tokens. When the merchant asks about a
number on such a campaign, state it in the chat reply from T1's campaign
`metrics`, with T1's date range and the attribution window.

In the verdict, the headline cites only the primary campaign among Moshi's
(check 13), and no token in the verdict cites your ad, ad set or campaign
that runs Moshi's creative (check 11). The overlap callout and the account
map show those side by side.

## Data checks

The template shows a "data check" banner and hides the affected part when
a check fails:

0. The DATA block is missing, or the report could not render.
1. ROAS or CPA would show for an engagement campaign.
2. A comparison breaks `comparison-method.md`: unknown ids or owners,
   different objectives, a retargeting merchant side, a merchant
   side whose `adsPulled` is not `"all"`, a merchant
   `startTime` that is null or more than 90 days before `asOf`, a `day`
   outside 1–14, a side without a row with impressions on each of days
   1–N, or `cpa`/`roas` on a non-Sales campaign, with `day` under 8, or
   before day 8 on Moshi's reset clock.
3. A token points to nothing, uses an unknown metric, or is malformed, or
   an `{all:moshi.…}` token has no Moshi campaign.
4. A quote holds an email, a phone number, an @handle, or more than 15
   words.
5. `schemaVersion` is not 1.
6. A `c:` or `s:` token cites a campaign or ad set with `adsPulled: "top"`,
   or an `{all:…}` token covers a campaign with `adsPulled` other than
   `"all"`.
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
11. A comparison's merchant side, or a verdict token, is your ad, ad set or
   campaign named in a Moshi ad's `creativeOverlap`. It shares auctions with
   Moshi's ad, so it is no fair test: the report shows it side by side.
12. An ad set behind a Meta purchase figure (a purchase token, a `cpa` or
   `roas` comparison, the purchases card, a map row) has no
   `attributionSetting` field. Null is fine; a missing field is not.
13. `primaryCampaignId` is not the Moshi campaign with the largest spend in
   the window (the verdict is hidden), or the headline cites another Moshi
   campaign (the headline is hidden).

## Minimal example

```js
const DATA = {
  schemaVersion: 1,
  merchant: { name: "Fernleaf Tonics", currency: "USD", timezone: "America/Los_Angeles" },
  asOf: "2026-10-06T18:40:00Z",
  window: { start: "2026-10-05", end: "2026-10-06", partial: true },
  metaSyncedAt: null,
  mode: "moshi_only",
  primaryCampaignId: null,
  verdict: {
    headline: "Your chat ads are starting chats at {m:costPerChat} each.",
    body: "Moshi is on {m:age}, a read on attention. Purchases are too early to call."
  },
  campaigns: [],
  moshi: { firstLaunch: "2026-10-05", spend: 412.3, chats: 14, chatsFromAds: 12, contactsCaptured: 3, productViews: 4,
           carts: 1, checkouts: 1, provenOrders: 0, provenRevenue: 0, delayedOrders: 0,
           closerRecoveries: 0, closerRevenue: 0 },
  iceBreakers: { total: 12, items: [{ text: "Is it good for sleep?", conversations: 7, share: 0.58 }],
                 typedOwn: { conversations: 5, share: 0.42 } },
  comparisons: [], changes: [], accountIssues: [], shopperThemes: [], quotes: [],
  nextSteps: [], flags: [], notMeasurableYet: ["Purchases: too early on day 2"]
};
```
