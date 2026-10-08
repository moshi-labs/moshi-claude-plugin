# day2-engagement · S2.1 · r1

## Calls

1. `get_flow_status_data` `{}` (no arguments; returned window 2026-10-05 to 2026-10-06)
2. `get_ad_performance` `{}` (no arguments; its `window` 2026-10-05 to 2026-10-06 is the report window)
3. `get_recent_brand_doc_change`: not called. There is no fixture, so this server does not have the tool.
4. `get_conversation_messages` `{ conversationId: "conv_d2_01" }`
5. `get_conversation_messages` `{ conversationId: "conv_d2_02" }` (`transcriptsToRead` listed only these two)
6. `get_ad_account_tree` (T1 account) `{ dateFrom: "2026-09-07", dateTo: "2026-10-06", maxAds: 0 }`
7. `get_ad_account_tree` (T2 Moshi ads) `{ dateFrom: "2026-09-07", dateTo: "2026-10-06", granularity: "daily", owner: "moshi", maxAds: 500 }`
8. `get_ad_account_tree` (T3 top ads) `{ dateFrom: "2026-09-07", dateTo: "2026-10-06", granularity: "daily", owner: "merchant", maxAds: 3 }`
9. `get_ad_account_tree` (T4 launches) `{ dateFrom: "2026-07-09", dateTo: "2026-10-06", owner: "merchant", maxAds: 0 }`

Not called:
- T5 (one launch): no launch qualifies. T4's only merchant campaign and ad set started on 2026-02-10, so nothing started in the last 90 days. It is also Sales, while Moshi's campaign is engagement.
- T6 (overlap): both Moshi ads have `clonedFrom: null` and `creativeOverlap: []`.
- No write tools.

## Reply

Shoppers are talking: your chat campaign has started 85 chats at $2.08 each on Meta's count. Those chats have already captured 13 shopper contacts, and 2 shoppers reached a cart, 1 of them checkout. It's too soon to call profit, and ROAS isn't the right test for this one: Meta optimizes it to start chats, not purchases.

Neither count shows a sale yet. Meta credits the campaign with 0 purchases (7-day click, 1-day view), and Moshi hasn't matched an order to a chat. Meta may still add purchases to recent days.

Day 2 of the Moshi campaign, still in Meta's learning phase: judging clicks and chat starts, not profit.

Next gate: first cost-per-chat and carts read on 2026-10-08.
Then 2026-10-12 (day 8): the first read on carts and delayed orders from the chats.

Moshi's own count is 91 chats, 82 of them from the ads. The rest started from your profile button, and the contact, cart and checkout counts include them.

The full report is attached. It shows each ad's cost per chat (the Pantry Reveal video is cheapest so far) and what shoppers are asking.

## Check

banner: none

## Notes

- **Mode and reads:** mode is `full`, since T1 has no `no_synced_ads`. `ads_over_max_ads` on T1, T3 and T4 is expected with our own `maxAds`, so it stays out of `flags[]`. The only flag is `population_mismatch` from `get_flow_status_data`.
- **Learning reset:** the Moshi ad set's `lastSignificantEditAt` is 2026-10-05T13:00Z, which is 09:00 EDT on launch day, 15 minutes before its 09:15 `startTime`. I copied it as `lastLearningReset` (per the contract) and treated it as the launch, not a reset. The template agrees: `{m:age}` renders with no check 7. The next gate is day 4, on 2026-10-08. `changes[]` is empty: no reset after day 1, and no brand-doc tool.
- **Profit question on an engagement campaign:** I said "ROAS measures a goal it isn't chasing", following the rationalization row. The red flag says "Saying ROAS or CPA near an engagement campaign", which reads as "don't present one". The skill could say outright that naming ROAS to explain why it doesn't apply is fine.
- **ROAS kept out of `notMeasurableYet`:** the template labels that list "Not measurable yet", but for an engagement campaign the answer is "not applicable", not "not yet". The template's own purchases card already prints "No ROAS: chat campaigns are scored on cost per chat".
- **Zero purchases cited:** I named Meta's 0 purchases in the reply (hard rule 2: the merchant asked about profit and can see it in Ads Manager), with the attribution window and the backfill line. I avoided "no sales", because proven orders are a floor and Meta's count is attribution-bound.
- **Later gate:** I named day 8 (2026-10-12) as the profit-adjacent gate, since engagement has no CPA or ROAS gate. I did not name the day-31 full verdict (2026-11-04), because the shape asks for one later gate.
- **`mood` is "reading":** it is day 2 and there is no comparison.
- **`metaSpend`:** set only on the merchant campaign. The contract names merchant campaigns, and the template example omits it on Moshi's.
- **Headline length:** my first headline was 91 raw characters, and I cut it to 90. The template does not check the length, and the contract does not say whether the limit is raw or rendered.
- **Fixture observations:**
  - Meta counts 85 chats started, while Moshi has 82 chats from ads (91 including the profile button). Cost per ad chat uses Meta's 85 (rule 15).
  - The tree's `funnel.ctr` (3.25% and 3.79%) counts all clicks. The template's link-click CTR is 2.61%.
  - Spend is about even (52/48) and leans toward the costlier Blend Quiz Hook.
  - The Moshi tool fixtures carry `"_shape": "modelled-from-description"`.
- **Shared scratchpad collision:** another eval run (day21-mixed) wrote its own `scratchpad/build-data.js` to the same shared scratchpad path and replaced my build script mid-run. I left theirs alone, moved mine to `scratchpad/day2-engagement__S2.1-r1/build-data.js` and confirmed my result file was intact. Parallel runs should use separate scratch paths.
