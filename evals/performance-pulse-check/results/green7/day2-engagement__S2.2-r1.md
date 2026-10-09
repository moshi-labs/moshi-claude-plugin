# day2-engagement · S2.2 · r1

## Calls

1. `get_flow_status_data` `{}`
2. `get_ad_performance` `{}` (its `window` 2026-10-05 → 2026-10-06 is the report window)
3. `get_conversation_messages` `{conversationId: "conv_d2_01"}`
4. `get_conversation_messages` `{conversationId: "conv_d2_02"}` (only two ids in `transcriptsToRead`)
5. `get_ad_account_tree` (T1 account) `{dateFrom: "2026-09-07", dateTo: "2026-10-06", maxAds: 0}`
6. `get_ad_account_tree` (T2 Moshi ads) `{dateFrom: "2026-09-07", dateTo: "2026-10-06", granularity: "daily", owner: "moshi", maxAds: 500}`
7. `get_ad_account_tree` (T3 top ads) `{dateFrom: "2026-09-07", dateTo: "2026-10-06", granularity: "daily", owner: "merchant", maxAds: 3}`
8. `get_ad_account_tree` (T4 launches) `{dateFrom: "2026-07-09", dateTo: "2026-10-06", owner: "merchant", maxAds: 0}`

Not called:
- `get_recent_brand_doc_change`: not on this server (no fixture).
- T5: T4's only merchant campaign and ad set started 2026-02-10, so no launch in the last 90 days.
- T6: neither Moshi ad in T2 has a `clonedFrom` or `creativeOverlap` entry.
- No write tools.

## Reply

Moshi's chat ads started 85 chats in two days at $2.08 each on Meta's count, from a 2.61% click rate, and chats, not ROAS, are what Meta is optimizing them for. Keep both budgets where they are: your Sales | Always-On | Spice Sets campaign's 3.4 ROAS (Sep 7 to Oct 6, 7-day click, 1-day view) comes from a purchase campaign running since Feb 10 at $1,200 a day, no fair yardstick for a two-day-old chat campaign at $120 a day.

Day 2 of the Moshi campaign: judging delivery, click rate and chat starts, never ROAS. Ads Manager shows 0 purchases on it so far (7-day click, 1-day view), which is no verdict this early, and Meta may still add purchases to recent days. Meta still has Moshi's ad set in learning, and a big budget change on either campaign would restart learning there.

Next gate: early read on cost per chat and first carts on 2026-10-08.
Then: first fair read on cost per chat, carts and delayed orders on 2026-10-12, and the full verdict, your real budget call, on 2026-11-04.

Moshi counts 91 chats because its count includes chats started from your profile's message button. 82 came from ads, and the $2.08 uses Meta's count of 85.

Your full pulse check is in the report.

## Check

banner: none

## Notes

- **Two rules pulled against each other.** Rule 2 (never hide a number the merchant can see in Ads Manager) versus rules 4 and 5 (no ROAS for an engagement campaign, no purchase verdict before day 8). I showed Moshi's 0 Meta purchases with the attribution window and the backfill line, and gave no Moshi ROAS.
- **Where the Sales ROAS appears.** The Sales campaign's 3.4 ROAS is in the chat reply only, from T1's campaign `metrics`, with T1's dates and attribution window, as data-contract.md says. It cannot be a token because the campaign is `adsPulled: "top"`.
- **Not resets.** Both `lastSignificantEditAt` values fall on their ad set's own day 1: Moshi's is Oct 5, 09:00 EDT, and the merchant's is Feb 10, 09:00 EST. So they count as launches, and `changes[]` is empty. I still copied `lastLearningReset` into DATA, as the contract says.
- **Flags left out.** The `ads_over_max_ads` flags on T1, T3 and T4 are the expected ones and are not in `flags[]`. The only flag in DATA is `population_mismatch`.
- **Mood is "reading".** It is day 2 and there is no fair comparison, so nothing to "lead" on.
- **Unclear: cost per chat on day 2.** stage-gates.md lists cost per chat under days 4–7, but rule 15 and the day-2 example in the contract lead with it. I led with chats and cost per chat, plus CTR, which is a day 1–3 metric.
- **Unclear: one later gate or two.** The answer shape says "name the later gate" (singular). A budget question on an engagement campaign has no ROAS gate, so I named both day 8 and day 31 (the full verdict) on one line.
- **First render was already clean.** I still changed three things. I dropped "ROAS: not applicable" from `notMeasurableYet`, because the template's purchases card already says "No ROAS: chat campaigns are scored on cost per chat", and listing it as "not yet" frames it wrongly. I took "delayed orders" out of the day-8 item, since the report always shows them. I reworded `nextSteps`, because the first version implied a budget move on day 4, inside Meta's learning window, which runs to 2026-10-12. Re-rendered: banner none.
- **Fixture oddity: ROAS split.** The Sales campaign shows a 3.4 ROAS over 30 days, but its top 3 ads by spend ($12,892 of $17,892) run at about 1.29. That leaves the other 6 ads at about 8.9 ROAS on about $5,000, with 713 of the 981 purchases. Possibly an inconsistent fixture. I did not raise it with the merchant.
- **Fixture oddity: similar ad names.** Moshi's "Pantry Reveal" and the merchant's "Pantry Haul" have similar names, but the tree returns `creativeOverlap: []`, so I assumed no overlap.
- **Data I didn't use.** `get_flow_status_data` returns `openCarts` (2, $64.50), which has no DATA field. The Moshi tool fixtures are marked `_shape: "modelled-from-description"`.
