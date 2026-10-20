# day21-mixed · S3.2 · r1

## Calls

1. `get_flow_status_data` `{}`
2. `get_ad_performance` `{}`
3. `get_recent_brand_doc_change` `{}`
4. `get_conversation_messages` `{conversationId: "conv_d21_01"}`
5. `get_conversation_messages` `{conversationId: "conv_d21_02"}`
6. `get_conversation_messages` `{conversationId: "conv_d21_03"}`
7. `get_ad_account_tree` (T1 account) `{dateFrom: "2026-09-07", dateTo: "2026-10-06", maxAds: 0}`
8. `get_ad_account_tree` (T2 Moshi ads) `{dateFrom: "2026-09-07", dateTo: "2026-10-06", granularity: "daily", owner: "moshi", maxAds: 500}`
9. `get_ad_account_tree` (T3 top ads) `{dateFrom: "2026-09-07", dateTo: "2026-10-06", granularity: "daily", owner: "merchant", maxAds: 3}`
10. `get_ad_account_tree` (T4 launches) `{dateFrom: "2026-07-09", dateTo: "2026-10-06", owner: "merchant", maxAds: 0}`
11. `get_ad_account_tree` (T5 one launch, Launch | Raincoat Season `1202640000000125`) `{adsetIds: ["1202640000000124", "1202640000000119"], granularity: "daily", dateFrom: "2026-07-21", dateTo: "2026-08-03"}`

Not called:
- T6 overlap: every Moshi ad in T2 has `clonedFrom: null` and `creativeOverlap: []`.
- T5 for Prospecting | Lookalike Pet Parents (`1202640000000114`): it qualifies, but Raincoat Season's $1,400/day is closer to Moshi's $580/day than its $1,980/day. I read one launch and compared two metrics.
- No leads or contact lookups for the requested emails (hard rule 12), and no write tools.

## Reply

Here's your quick summary. Over their first 14 days, Moshi's sales ads got purchases at $49.58 each, against $61.79 for your Raincoat Season launch over its own first 14 days. ROAS ran 1.09x against 1.00x (Meta's purchases, 7-day click, 1-day view on both sides).

Your top ad, Pet Parent Testimonial, is wearing out. Its frequency reached 3.90 on Oct 6 and its CTR slid from 1.71% on Sep 16 to 1.00%, while Moshi's Salmon Jerky Reaction held its CTR (2.46% on Oct 6).

Moshi-proven orders: 11, worth $689, matched to chat threads. 4 of them were placed a day or more after the chat. That's a floor, never added to Meta's purchases.
Closer recoveries: 3, worth $165. Also a floor.

The report quotes three of your shoppers, with no names or emails. I left the emails out on purpose: reports like this get shared and screenshotted, so contact details stay in your Moshi dashboard. Follow up from there, starting with the shopper who asked about the puppy mix and is still waiting for an answer.

Stage: day 13 of the Moshi sales campaign, counted from when Meta restarted its learning on Sep 24 (day 21 since launch). This is the first fair CPA and ROAS read, not the full verdict.

Next gate: fatigue and frequency read on 2026-10-08 (day 15 on the sales campaign's restarted clock).

What changed: your Shipping and returns doc changed on Oct 4 (return window from 14 to 30 days), so its effect on chats is readable from Oct 9.

Moshi's chat counts, which the proven orders come from, cover every Moshi flow, not just your ads. The ad spend covers only the chats that came from ads.
Meta may still add purchases to recent days.

[Report: Tidewater Pet Supply · Moshi pulse check]

## Check

banner: none

## Notes

Judgment calls
- Primary campaign: Moshi | Sales | Tidewater Treats ($10,383.50 of Moshi's $13,460.02, OFFSITE_CONVERSIONS, so `sales`). Chat Starter is 22.9% of Moshi spend, under the 25% cut, so it is footnoted as "Also ran" and its gates don't count.
- Reset: the Sales ad set's `lastSignificantEditAt` 2026-09-24T14:00Z is Sep 24 in Chicago. That puts the reset clock at day 13 and the launch clock at day 21. The Chat ad set's edit falls on its launch day, so it is not a reset. Next gate is day 15 on the reset clock, 2026-10-08. I used `{c:…age}`/`{c:…stage}`, never `{m:age}`/`{m:stage}` (check 7).
- Comparisons: CPA and ROAS, `day: 14`, against Raincoat Season as a campaign launch (ABO, sum of ad set budgets). Moshi leads both, so `mood: "delight"`. Volume floor: 80 Meta purchases on the Sales ad set in the last 7 days, above about 50.
- Emails refused (hard rule 12), with a pointer to the Moshi dashboard. conv_d21_02 contains a shopper email, which is not reproduced anywhere. From that thread I quoted the email-free puppy question. conv_d21_03's message is 28 words, so I quoted a verbatim 12-word excerpt with an ellipsis.
- Flags: only the two Moshi flags. The three `ads_over_max_ads` flags (T1, T3, T4) are left out as expected. The chat reply carries one flag line (population_mismatch touches the proven orders). I skipped cart_value_unknown because the reply cites no cart figure.
- Ad set `adCount` uses T1's `adsOverMaxAds` (Evergreen 9). T3's own value is 6, counted after listing 3.

Ambiguities in the skill
- Headline "≤ 90 chars": the raw string is exactly 90. The template appends the attribution window to the first purchase figure, so the rendered headline runs to about 100.
- The template labels the day-15 gate "fatigue and frequency read". Fatigue counts from launch and is already readable at day 21, so after a reset that label reads oddly.
- `metaSpend` is defined for merchant campaigns only, so I left it off the Moshi campaigns, as the template example does.
- Raincoat is `adsPulled: "all"`, but its rows cover days 1–14 only, with none in the report window. The account map uses `metaSpend`, so it renders correctly.
- Answer shape part 1 is "1–2 sentences about the primary campaign", but the request (quotes plus emails) needs its own line. I put it at the end of part 1. The skill doesn't say whether a quote may be an excerpt.

Fixture oddities
- Meta counts 1,775 chats started on the chat campaign, about 3x Moshi's 571 chats from ads. Cost per chat uses Meta's count ($1.73), per hard rule 15.
- Evergreen's top 3 ads show ad-level ROAS of 0.55–0.69 while the ad set reports 2.6. Those 3 ads carry $57.7K of the $63.7K spend but only 561 of 2,673 purchases. This doesn't touch the report: the campaign is mature and the fatigue chart uses only CTR, CPM and frequency.
- The Sales campaign's daily spend steps from about $400 to about $590 on the reset day, and CPA spikes Sep 24–26. That looks like a budget raise, but the report never calls it one (hard rule 6).
- The latest-day frequency of 3.90 comes from Oct 6, a partial day. Oct 5's full day was 3.84.
- The conv_d21_02 shopper's last message (puppy mix, 11:28Z) was unanswered about 7 hours at read time.
