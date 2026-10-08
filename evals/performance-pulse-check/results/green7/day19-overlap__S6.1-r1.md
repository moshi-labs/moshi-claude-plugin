# day19-overlap · S6.1 · r1

## Calls

1. `get_flow_status_data` `{}` (default `period: "since_launch"`)
2. `get_ad_performance` `{}` (default `period: "since_launch"`). Its `window`, 2026-09-17 to 2026-10-06, is the report window.
3. `get_recent_brand_doc_change` `{}`
4. `get_conversation_messages` `{"conversationId": "conv_ov_01"}`
5. `get_conversation_messages` `{"conversationId": "conv_ov_02"}`
6. `get_conversation_messages` `{"conversationId": "conv_ov_03"}`
7. `get_ad_account_tree`, T1 account: `{"dateFrom": "2026-09-07", "dateTo": "2026-10-06", "maxAds": 0}`
8. `get_ad_account_tree`, T2 Moshi ads: `{"dateFrom": "2026-09-07", "dateTo": "2026-10-06", "granularity": "daily", "owner": "moshi", "maxAds": 500}`
9. `get_ad_account_tree`, T3 top ads: `{"dateFrom": "2026-09-07", "dateTo": "2026-10-06", "granularity": "daily", "owner": "merchant", "maxAds": 3}`
10. `get_ad_account_tree`, T4 launches: `{"dateFrom": "2026-07-09", "dateTo": "2026-10-06", "owner": "merchant", "maxAds": 0}`
11. `get_ad_account_tree`, T5 one launch (Fall Mug Videos): `{"adsetIds": ["1202680000000131"], "granularity": "daily", "dateFrom": "2026-09-21", "dateTo": "2026-10-04"}`
12. `get_ad_account_tree`, T6 overlap: `{"adIds": ["1202680000000112", "1202680000000113", "1202680000000122", "1202680000000123", "1202680000000162", "1202680000000212"], "granularity": "daily", "dateFrom": "2026-09-17", "dateTo": "2026-10-06", "maxAds": 200}`

Not called:
- No second T5. Fall Mug 1, Fall Mug 2 and Fall Mug v2 (archived) hold ads in Moshi's `creativeOverlap`. Remarketing | Labor Day is retargeting. Batch 14 Iteration started 2026-10-04: three days, no CPA read possible, and its per-ad-set budget is unknown (CBO).
- No size-guard splits (nothing returned `TOO LARGE`) and no retries.
- No `organization` argument on any tree read.
- No write tools and no `get_leads`, `get_open_carts` or `get_organization_ads` (covered by `get_flow_status_data` and the tree's `owner`).

## Reply

Moshi's sales campaign buys clicks for $0.57 vs $1.36 on your Fall Mug Videos launch over the same first 14 days. But no, it isn't beating you on CPA yet: $59.67 vs $38.48 per Meta purchase (both 7-day click, 1-day view). That gap is early and directional. Moshi's sales ad set has 14 of the ~50 purchases in 7 days (7-day click, 1-day view) a CPA verdict needs, and your launch ran on 1.5x its budget.

Floor, not a total: 2 orders proven in Moshi's chats ($80.84, one placed a day or more after the chat) plus 1 Closer recovery ($38.50), on top of 212 contacts captured and 36 carts.

Your Fall Mug 1 and Fall Mug 2 ad sets (and Advantage+ Prospecting) run the creatives Moshi's ads were cloned from, so they shared auctions with Moshi's (Meta's overlapping-audiences rule) and aren't a fair test; to make one, run it as a Meta A/B test, pause or exclude your overlapping ads while Moshi's run, or aim Moshi at a different audience.

On the days both ran, Moshi got just 3% of the impressions on the Ombre mug-in-hand creative and 18% on the Tan forecast mug; your copies took the rest. (Studio pour and Blue forecast overlapped only 4 and 3 days, at 79% and 86%.)

Side by side for Sep 17 – Oct 6, not as a contest: Moshi's sales ad set paid $56.17 per Meta purchase and Fall Mug 2 $44.91 (both 7-day click, 1-day view). Fall Mug 1 at $40.29 and Advantage+ Prospecting at $43.49 also count engaged views (7-day click, 1-day view, 1-day engaged view), so they're not on the same basis.

Day 19 of the Moshi sales campaign: Fatigue watch, judging fatigue and frequency, with CPA and ROAS readable but still directional. No fatigue on either side: your top ad sits at 1.08 frequency, Moshi's at 1.09.

Next gate: full verdict on 2026-10-18. Heads up: Moshi's sales ad set shows paused in Meta today, so that read only gets new days if it runs again.

Most purchase events in Moshi carry no order id, so they aren't counted as proven orders. That's why the 2 is a floor.
Your archived Ombre Hand Hold v2 copy delivered nothing this window, so it isn't in the overlap numbers.
Meta may still add purchases to recent days.

Full report attached.

## Check

banner: none

## Notes

**Dates and campaigns**
- `firstLaunch` is 2026-09-17, the chat campaign's first delivery. It was created 2026-09-03 but delivered nothing from Sep 7 to 16, so the read-start exception doesn't apply.
- The primary is the sales campaign: day 1 is Sep 18, so today is day 19, and its next gate is day 31 on 2026-10-18.
- The chat campaign is footnoted: 14% of Moshi's spend, idle since Sep 24. The verdict cites `{c:…age/stage}` rather than `{m:…}`, because `{m:age}` would read day 20.

**Classification**
- The sales campaign is "sales" from its paused ad set's `OFFSITE_CONVERSIONS` goal.
- Neither Moshi ad set has `learningPhase` or `lastSignificantEditAt` (both paused), so `learning` and `lastLearningReset` are null and nothing is said about learning.
- No Meta change qualifies. Every reset on or after Sep 17 falls on its ad set's launch day: Fall Mug Videos on Sep 21, Batch 14 on Oct 4.
- Fall Mug 2's Sep 12 reset predates the first Moshi launch.

**Comparisons**
- Both comparisons are against `merchantAdsetId` 1202680000000131, day 14: CPC first (Moshi wins), then CPA (Moshi loses).
- Using the campaign id 1202680000000101 would fail check 11, because that campaign is named in `creativeOverlap`.

**Volume floor**
- 14 Meta purchases from Sep 30 to Oct 6, which matches the template's "14 of ~50". So CPA is described as directional and `mood` is "reading".
- Fall Mug Videos is also under ~50 a week (53 purchases in 14 days). The skill doesn't say to mention the merchant side's floor.

**Judgment calls**
- Brand doc change (Welcome offer, Sep 30): classed as `agent_knowledge`. `offer` has the same 5-day delay. It was readable Oct 5, before today, so the reply has no "what changed" line.
- `chatsFromAds` is null. `iceBreakers.total` (1,003) equals Meta's chats started (546 + 457), but no tool states an ad/profile split, so I didn't infer one. Cost per ad chat uses Meta's count ($1.83).
- The merchant asked about "Fall Mug ads". In chat I quoted the report map's T6 ad-set window totals (Sep 17 – Oct 6), not T1's campaign metrics (Sep 7 – Oct 6). The contract's T1 rule targets a campaign, and these are ad sets the report already shows. Arguable.
- The template renders the CPA as $59.67. My hand calculation is 1,074.15 ÷ 18 = 59.675, right on the rounding edge. I quoted it as rendered.

**Skill ambiguities**
- "name each in one line as a floor" could mean one line for both or one line each. I used one line.
- The answer shape has no slot for account issues. I put the paused-ad-set heads-up as a clause in the next-gate line.
- `nextSteps` and `accountIssues` can't type numbers, so "day 31" uses `{m:nextGate}`.
- I didn't say "scale" in chat even though the template's gate label says "scale, iterate or cut" (hard rule 13, before day 31).

**Fixture oddities**
- Both Moshi ad sets and all 8 Moshi ads are PAUSED while their campaigns are ACTIVE.
- The sales ad set delivered through Oct 5 and has no Oct 6 row. Merchant ads have full-size Oct 6 rows at 12:40 MDT, e.g. ad 112 with 18,379 impressions, despite "today is partial". The pause is flagged as an `accountIssue` (warn on sales, info on chat) and as a next step.
- T5 covers only days 1–14 of Fall Mug Videos, so its Oct 5–6 delivery isn't in DATA. No token cites that ad set over the window.

**Environment**
- Another agent overwrote a shared-scratchpad `build_data.py` during this run. My DATA builder lives in `scratchpad/day19-overlap-S6.1-r1/` instead. The result files weren't touched by it.
