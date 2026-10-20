# day19-overlap · S6.2 · r1

## Calls

1. `get_flow_status_data` `{}`
2. `get_ad_performance` `{}`, whose window (2026-09-17 to 2026-10-06) is the report window
3. `get_recent_brand_doc_change` `{}`: the tool exists, and it returned 1 change
4. `get_conversation_messages` `{ "conversationId": "conv_ov_01" }`
5. `get_conversation_messages` `{ "conversationId": "conv_ov_02" }`
6. `get_conversation_messages` `{ "conversationId": "conv_ov_03" }`
7. `get_ad_account_tree` (T1 account) `{ "dateFrom": "2026-09-07", "dateTo": "2026-10-06", "maxAds": 0 }`
8. `get_ad_account_tree` (T2 Moshi ads) `{ "dateFrom": "2026-09-07", "dateTo": "2026-10-06", "granularity": "daily", "owner": "moshi", "maxAds": 500 }`
9. `get_ad_account_tree` (T3 top ads) `{ "dateFrom": "2026-09-07", "dateTo": "2026-10-06", "granularity": "daily", "owner": "merchant", "maxAds": 3 }`
10. `get_ad_account_tree` (T4 launches) `{ "dateFrom": "2026-07-09", "dateTo": "2026-10-06", "owner": "merchant", "maxAds": 0 }`
11. `get_ad_account_tree` (T5 one launch, Fall Mug Videos) `{ "adsetIds": ["1202680000000131"], "granularity": "daily", "dateFrom": "2026-09-21", "dateTo": "2026-10-04" }`
12. `get_ad_account_tree` (T6 overlap) `{ "adIds": ["1202680000000112", "1202680000000113", "1202680000000122", "1202680000000123", "1202680000000162", "1202680000000212"], "granularity": "daily", "dateFrom": "2026-09-17", "dateTo": "2026-10-06", "maxAds": 200 }`

Not called:
- A second T5. Only one launch qualified: Fall Mug 1, Fall Mug 2 and Fall Mug v2 hold ads named in a Moshi ad's `creativeOverlap`, Remarketing is retargeting, Batch 14 Iteration (started Oct 4) has no days 1–14, and Protein 7, Batch 12 and Advantage+ are more than 90 days old.
- Size-guard splits. Nothing was refused.
- Retries.
- No other Moshi tool, such as `get_open_carts`, `list_conversations` or `get_organization_ads` (the tree's `owner` replaces the last one).
- No write tool.

## Reply

Moshi's Sales campaign got clicks for $0.57 each over its first 14 days, against $1.36 for your Fall Mug Videos launch at the same age. For your team: ad chats cost $1.83 each across both Moshi campaigns (on Meta's count of 1,003 chats started), the agent captured 212 contacts (158 emails, 54 phones), and the top opener was "How free is the mug?" (41%), then "How much caffeine is in it?" (17%) and "How strong is the concentrate?" (9%), with 33% typing their own question.

- Floor: 2 orders proven straight from Moshi chats, $80.84, and 1 of them was placed a day or more after the chat.
- Floor: 1 order recovered by Closer, $38.50.
- Not a fair test yet: Moshi's Sales ads reuse your live Fall Mug creatives, so they and your ads shared auctions (Meta's overlap rule). On the days both ran, Moshi got 3% of the Ombre Hand Hold impressions and 18% of Tan Forecast's. Fix: run Moshi against your Fall Mug ads as a Meta A/B test (Experiments in Ads Manager), or pause your overlapping ad while Moshi's runs.
- Heads-up: Meta shows Moshi's Sales ad set as PAUSED, with no delivery today. Worth checking that was on purpose.

Day 19 of the Moshi Sales campaign: judging fatigue and frequency, and CPA only as a directional read. No fatigue on either side: your top ad's frequency was 1.08 on Oct 6, and Moshi's top ad's was 1.09 on Oct 5. By Meta's count (7-day click, 1-day view on both sides), Moshi's purchases cost $59.67 each over its first 14 days, against $38.48 for Fall Mug Videos. That rests on 14 of the ~50 purchases in 7 days a firm CPA call needs. Meta may still add purchases to recent days.

Next gate: full verdict on 2026-10-18.

- Most purchase events in Moshi carry no order id, so they don't count as proven orders. The 2 proven orders above are a floor.
- One of your Ombre Hand Hold copies (the archived v2) didn't deliver in the window, so it adds nothing to the overlap split.

The full pulse-check report is attached for your team.

## Check

banner: none

## Notes

**How the report was framed**
- **Primary campaign:** the Moshi Sales campaign (`1202680000000011`), with $1,572.65 of Moshi's $1,836.17. The chat campaign (`1202680000000001`) spent $263.52 (14%), last delivered Sep 24, and is footnoted.
- **`firstLaunch` = 2026-09-17:** the chat campaign's `startTime` is Sep 3, but its first delivery is Sep 17. That date is outside the read-start exception, and it matches `get_ad_performance`'s window start.
- **Comparisons:** CPC (Moshi leads) and CPA (Moshi trails), both day 14 against Fall Mug Videos. I picked cost metrics to match the merchant's cost framing. `costPerConversation` was unusable because the launch has zero chats.
- **`mood: "reading"`:** Moshi leads on CPC but trails on directional CPA, and the overlap makes the test unfair.

**Judgment calls**
- **Cost per chat:** "Cost per ad chat is one number" conflicts with "item 1 about the primary campaign". I cited only `{m:costPerChat}` ($1.83, both Moshi campaigns), labelled it that way, and never cited the primary's own $2.88 per conversation.
- **`chatsFromAds`:** set to null. No tool splits ad chats from profile chats. `iceBreakers.total` (1,003) equals Meta's 1,003 chats, but I did not infer from that.
- **Brand-doc change:** classified as `agent_knowledge` (the contract's example mapping), even though the doc is an offer. Both kinds use the same 5-day rule, so it was readable Oct 5 and the reply has no "what changed" line.
- **Overlap fix:** my first draft step said to "give Moshi a creative none of your ad sets run". The template's callout says a different creative alone isn't enough, so I changed it to the A/B-test fix.
- **Headline length:** the ≤90-char limit is ambiguous (raw text with tokens, or rendered). I kept the raw text at 90; it renders at 71.
- **Paused heads-up:** I put this line in the reply even though the answer shape has no slot for account issues.

**Fixture oddities**
- **Paused Moshi ad sets:** both Moshi ad sets and all 8 Moshi ads read PAUSED while their campaigns read ACTIVE. The Sales ad set delivered through Oct 5 and has no Oct 6 row, while the merchant's ads do have Oct 6 rows. I surfaced this as an account issue.
- **Budget vs spend:** the Sales ad set has a $100/day budget. It spent about $27–40/day through Sep 23, then $100–132/day from Sep 25 on. It has no `lastSignificantEditAt` (it is paused), so I claimed no reset and made no learning claim.
- **Fall Mug 2 reset:** its reset (Sep 12) falls after its day 1 but before the first Moshi launch, so it is not listed as a change.
