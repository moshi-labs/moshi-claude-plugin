# Comparison method

Read this before you fill `comparisons` or answer "how does it compare to
my other ads".

## Recipe

A fair comparison has all five parts:

1. **Same objective.** Both campaigns map to the same `objective` (see
   `data-contract.md`). Engagement compares to engagement, sales to sales.
2. **A launch, not a mature campaign.** The merchant campaign started in
   the last 90 days and is not retargeting. Read 7 pulled all its ads, so
   its `adsPulled` is `"all"`. A campaign with only its top ads pulled
   fails the data check. Mature campaigns are context
   for the account map only. They never go into a comparison.
3. **The same days of life.** Moshi's days 1–N against the merchant
   launch's days 1–N. N is Moshi's age since launch (a reset does not
   change N), capped at 14, the days that read 7 pulls for each launch.
   Calendar overlap does not matter. A launch from August still compares
   on its own days 1–N.
4. **A metric the stage allows.** Day 1–7: `ctr`, `cpc`,
   `costPerConversation`. Day 8+: add `cpa` and `roas`, for Sales only.
5. **A resource note.** The template writes it from each side's daily
   budget and ad count. When Moshi has the bigger budget or more ads, the
   note says so, and you do not hide it.

Never use lifetime numbers for a comparison. Never compare across
objectives. If no launch meets parts 1–3, leave `comparisons` empty and add
"No comparable launch in the last 90 days" to `notMeasurableYet`.

## Picking the pair

When several launches qualify, pick the one with the closest daily budget.
Use at most two comparisons. Lead with the metric where Moshi wins, then
show the other one, even when Moshi loses it.

## Assist evidence

Moshi's value includes touchpoints that Meta's pixel does not credit.
Show:

| Evidence | Shown |
|---|---|
| Chats, contacts captured, product views, carts, Closer recoveries | always |
| Delayed orders: proven orders placed 1+ days after the chat | always |
| Fatigue: the merchant's top ad's CTR and frequency against Moshi's, by calendar date | day 15+ since launch (a reset does not delay it) |
| Halo on retargeting | day 15+, labeled directional |

Moshi-proven orders are a floor. Closer recoveries are their own line.
Never add either to Meta's purchases, and never build ROAS or CPA from
them.
