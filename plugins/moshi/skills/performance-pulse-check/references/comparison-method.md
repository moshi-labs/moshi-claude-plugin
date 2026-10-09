# Comparison method

Read this before you fill `comparisons` or answer "how does it compare to
my other ads".

## Recipe

A fair comparison has all six parts:

1. **Same objective.** Both sides map to the same `objective` (see
   `data-contract.md`; an ad set takes its campaign's). Engagement
   compares to engagement, sales to sales.
2. **A launch, not a mature campaign.** The launch is an ad set that
   started in the last 90 days, even inside an older campaign
   (`merchantAdsetId`), or a whole campaign that did (`merchantCampaignId`).
   It is not retargeting. T4 in `meta-reads.md` lists the candidates. T5
   pulled all its ads, so its `adsPulled` is `"all"`. A side with only its
   top ads pulled fails the data check. Mature campaigns never go into a
   comparison.
3. **No shared creative.** Never compare against an ad set or campaign
   that holds an ad in a Moshi ad's `creativeOverlap`. Meta won't show one
   person two ads from the same advertiser in one auction: when ad sets
   aim at similar people it enters the one with the best history, so the
   two were not tested apart. The template shows them side by side in the
   account map instead (check 11). Say "ran at the same time, competing in
   the same auctions", never who won.
4. **The same days of life.** Moshi's days 1–N against the merchant
   launch's days 1–N. N is Moshi's age since launch (a reset does not
   change N), capped at 14, the days that T5 pulls for each launch.
   Calendar overlap does not matter. A launch from August still compares
   on its own days 1–N. If the launch first delivered after its
   `startTime`, T5 holds fewer than 14 of its days, so compare only the
   days that have rows.
5. **A metric the stage allows.** Day 1–7: `ctr`, `cpc`,
   `costPerConversation`. Day 8+: add `cpa` and `roas`, for Sales only.
6. **A resource note.** The template writes it from each side's daily
   budget and ad count. When Moshi has the bigger budget or more ads, the
   note says so, and you do not hide it.

Never use lifetime numbers for a comparison. Never compare across
objectives. If no launch meets parts 1–4, leave `comparisons` empty and add
"No comparable launch in the last 90 days" to `notMeasurableYet`.

## Picking the pair

When several launches qualify, pick the one with the closest daily budget.
Use at most two comparisons, for the primary campaign first. Lead with the
metric where Moshi wins, then show the other one, even when Moshi loses
it.

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
