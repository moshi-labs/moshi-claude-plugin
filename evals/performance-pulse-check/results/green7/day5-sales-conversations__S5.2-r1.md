# day5-sales-conversations · S5.2 · r1

## Calls

1. `get_flow_status_data` `{}`
2. `get_ad_performance` `{}` (returned window 2026-10-02 to 2026-10-06, the report window)
3. `get_conversation_messages` `{ "conversationId": "conv_d5_01" }`
4. `get_conversation_messages` `{ "conversationId": "conv_d5_02" }`
5. `get_ad_account_tree`, T1 account: `{ "dateFrom": "2026-09-07", "dateTo": "2026-10-06", "maxAds": 0 }`
6. `get_ad_account_tree`, T2 Moshi ads: `{ "dateFrom": "2026-09-07", "dateTo": "2026-10-06", "granularity": "daily", "owner": "moshi", "maxAds": 500 }`
7. `get_ad_account_tree`, T3 top ads: `{ "dateFrom": "2026-09-07", "dateTo": "2026-10-06", "granularity": "daily", "owner": "merchant", "maxAds": 3 }`
8. `get_ad_account_tree`, T4 launches: `{ "dateFrom": "2026-07-09", "dateTo": "2026-10-06", "owner": "merchant", "maxAds": 0 }`
9. `get_ad_account_tree`, T5 launch "Launch | Summer Pack Sale" (campaign 1202660000000139, its only ad set): `{ "adsetIds": ["1202660000000138"], "granularity": "daily", "dateFrom": "2026-08-07", "dateTo": "2026-08-20" }`

Not called:
- `get_recent_brand_doc_change`: this server doesn't have it.
- T6 overlap: skipped. Both Moshi ads came back with `clonedFrom: null` and `creativeOverlap: []`.
- No organization argument on any tree read. No retries, and no other tools.

## Reply

Day for day, Moshi is starting chats for less: $2.76 each over its first 5 days (today's still filling in), against $6.38 over your summer launch's first 5 (Aug 7–11). Both are on Meta's count of chats started, and Moshi's click-through rate is 2.42% against 1.17%. Your launch had 8 ads and $900/day to Moshi's 2 ads and $250/day, and bigger budgets usually pay more per chat, so read the gap as directional.

Moshi's chats have also led to 2 proven orders ($148) so far, matched to chat threads. That's a floor, kept separate from Meta's purchase count.

Day 5 of the Moshi campaign: judging cost per chat and carts. ROAS doesn't apply at any stage here. It's a Sales campaign, but its ad set optimizes for conversations, same as your summer launch.

Next gate: first fair cost-per-chat read, with carts and delayed orders, on 2026-10-09.

One flag: Moshi's own chat counts include chats started from your profile button, not just from ads. The cost per chat above uses Meta's count, so the flag doesn't change it.

The full report is attached. It has the side-by-side bars, what your shoppers are asking, and next steps.

## Check

banner: none

## Notes

- **Comparison.** The summer launch qualifies as a whole-campaign launch. It started 2026-08-07, 60 days before asOf, so it is inside the 90 days. Its objective matches Moshi's: both are OUTCOME_SALES with CONVERSATIONS ad sets, which makes both engagement. It isn't retargeting and shares no creative with Moshi. I compared days 1–5, N being Moshi's age: Moshi's Oct 2–6 against the launch's Aug 7–11. I never used its 30-day or current numbers.
- **Metric choice.** Moshi leads on all three metrics the stage allows: cost per conversation $2.76 vs $6.38, CTR 2.42% vs 1.17%, and CPC $0.51 vs $1.07. So "show the other one even when Moshi loses" never applied. I picked costPerConversation, the stage's metric, plus CTR. I dropped CPC because CPMs are nearly equal ($12.35 vs $12.50), so CPC mostly repeats CTR. I set mood to `delight`.
- **Partial day.** Moshi's day 5 is today and partial. The recipe says N equals age, so I kept N=5 and compared rates only.
- **Skill ambiguity.** The merchant campaign is `adsPulled: "all"` because T5 pulled all 8 ads. But inside the report window only T3's 3 top ads have rows, so any `{c:1202660000000139.*}` window token would silently undercount. Check 6 doesn't catch this. "all" describes the launch read, not coverage of the window. I avoided those tokens.
- T5's planned arguments have no `maxAds`. The response listed all 8 ads anyway.
- **Flags.** I left out `ads_over_max_ads` on T1, T3 and T4, as the skill expects. The only flag in `flags[]` is `population_mismatch`.
- **Changes.** There are none. Both ad sets' `lastSignificantEditAt` falls on their own launch day in MDT. Since `get_recent_brand_doc_change` is missing, I added a `notMeasurableYet` line about agent-knowledge changes.
- **Possible creative overlap.** Moshi's "Pack Fit Question" and the merchant's "Summer Pack 02 - Fit Check" share an angle, but the tool reports no creative overlap. I trusted the tool.
- **Odd fixture details.**
  - Moshi's ad set reports learning SUCCESS on day 5 (window ends Oct 9). I copied it and didn't mention it.
  - Meta counts 423 chats started, while Moshi counts 420 chats from ads. Cost per chat uses Meta's count, per the contract.
  - `openCarts.count` is 8, equal to carts, even though 3 reached checkout and 2 ordered. I didn't cite it.
  - Both transcripts share identical timestamps.
- The headline is exactly 90 characters raw and 69 rendered.
- **Environment.** Another agent was using the same file path, `scratchpad/build_data.py`, in this session's shared scratchpad, and we overwrote each other's copies. I rebuilt from a private subfolder and diffed the output: the final DATA is mine.
