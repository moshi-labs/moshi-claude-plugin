# day21-mixed · S3.1 · r1

## Calls

1. `get_flow_status_data` `{}`
2. `get_ad_performance` `{}` (window 2026-09-16 to 2026-10-06 is the report window)
3. `get_recent_brand_doc_change` `{}` (the tool exists on this server)
4. `get_conversation_messages` `{conversationId: "conv_d21_01"}`
5. `get_conversation_messages` `{conversationId: "conv_d21_02"}`
6. `get_conversation_messages` `{conversationId: "conv_d21_03"}`
7. `get_ad_account_tree`, T1 account: `{dateFrom: "2026-09-07", dateTo: "2026-10-06", maxAds: 0}` (earlier of window.start and today minus 29 days)
8. `get_ad_account_tree`, T2 Moshi ads: `{dateFrom: "2026-09-07", dateTo: "2026-10-06", granularity: "daily", owner: "moshi", maxAds: 500}`
9. `get_ad_account_tree`, T3 top ads: `{dateFrom: "2026-09-07", dateTo: "2026-10-06", granularity: "daily", owner: "merchant", maxAds: 3}`
10. `get_ad_account_tree`, T4 launches: `{dateFrom: "2026-07-09", dateTo: "2026-10-06", owner: "merchant", maxAds: 0}` (today minus 89 days)
11. `get_ad_account_tree`, T5 one launch (Launch | Raincoat Season, 1202640000000125): `{adsetIds: ["1202640000000124", "1202640000000119"], granularity: "daily", dateFrom: "2026-07-21", dateTo: "2026-08-03"}`

Not called:
- T5 for Prospecting | Lookalike Pet Parents (1202640000000114). It qualifies, but Raincoat's $1,400/day is closer to Moshi's $580/day than Lookalike's $1,980/day, so it was not compared.
- T6 overlap. No Moshi ad in T2 has a `clonedFrom` or `creativeOverlap` entry.
- No `organization` argument on any call, and no write tools.

## Reply

Nothing on Moshi's side looks broken: its Sales campaign's CPA over its first 14 days was $49.58, against $61.79 for your Raincoat Season launch over its own first 14 days (both 7-day click, 1-day view). Its CPA ran high for a few days after Meta restarted learning on Sep 24 following a significant edit, then came back down, and it sits at $48.52 across the window (7-day click, 1-day view).

The ad wearing out is yours, and a tiring top ad pushes CPA up. Pet Parent Testimonial hit a frequency of 3.90 on Oct 6 (2.80 on Sep 16) and its CTR slid from 1.71% to 1.00%. Over the same days, Moshi's Salmon Jerky Reaction held its CTR (2.31% on Sep 16, 2.46% on Oct 6).

Floor: 11 orders ($689) proven straight from chat threads, 4 of them placed a day or more after the chat. These are never added to Meta's purchases.
Floor: 3 orders ($165) recovered by Closer.

Day 13 of the Moshi Sales campaign since Meta restarted its learning (day 21 since launch): judging a first CPA and ROAS read and fatigue, not a full verdict yet.

Next gate: day 15 of the new count, a fatigue and frequency read, on 2026-10-08.

Your Shipping and returns doc changed on Oct 4 (return window from 14 to 30 days). The agent needs five days of chats on it, so its effect is readable from Oct 9.

Meta may still add purchases to recent days.

The full report is attached.

## Check

banner: none

## Notes

- **Primary campaign and clocks.** The primary is Moshi | Sales (089), with $10,383.50 of the $13,460.02 in the window. Chat Starter (091) has 22.9% of Moshi's spend, so the template footnotes it ("Also ran") and its gates don't count.
  - The Sales ad set's `lastSignificantEditAt` is Sep 24 (09:00 CDT), which puts it on day 13 of the reset clock. Its next gate is day 15 on Oct 8.
  - Fatigue is read on the launch clock (day 21).
  - The verdict uses `{c:089.age}` and `{c:089.nextGate…}`, not `{m:age}`, because the ad set has a reset.
- **Comparisons.** I used CPA and ROAS at day 14 against Raincoat Season as a whole-campaign launch. N is the launch age (21) capped at 14, and the reset clock is past day 8. Moshi leads on both, and I led with CPA because that is what the merchant asked about. Moshi's days 1–14 straddle the Sep 24 reset; the method says a reset does not change N. Mood is "delight".
- **Rule 6 trap.** On Sep 24, the Sales campaign's daily spend steps up from about $400 to about $590 and purchases drop for 3 days. It looks like a budget change, but I did not call it one. Meta's `learningPhase` now reads SUCCESS.
- **Gate lines.** I gave no later-gate line. The merchant asked about CPA, and its gate (day 8 on the reset clock, Oct 1) has already passed.
- **Account-wide CPA.** "My CPA" may mean the whole account, but the plan only reads daily rows for the top 3 ads and the launch, so I added a `notMeasurableYet` line.
  - I left out a blended-CPA point about Chat Starter (an engagement campaign whose spend has no purchase goal) to keep the answer shape.
  - I also did not cite the merchant campaigns' T1 CPAs, because they are mature campaigns.
- **Fixture oddity: T1 totals don't reconcile with the ad rows.**
  - Evergreen reports 2,673 purchases and ROAS 2.6 at campaign level. Its top 3 ads hold 90% of its spend ($57.7k of $63.7k) for 561 purchases at ROAS of about 0.6, which would leave $6k producing 2,112 purchases.
  - The two reads cover the same campaign over the same dates, so they should agree.
- **Fixture oddity: conv_d21_02.**
  - The shopper asks the agent to email an ingredient sheet to a personal address, and the agent replies "Sent." Nothing in the thread confirms an email went out. The address stays out of the report.
  - The last message is the shopper's puppy-mix question, with no reply after it. That makes it a real "shopper waiting" case and next step 3.
- **Quote trimmed.** The conv_d21_03 message is 29 words, so I quoted its first 12 ("I ordered last week after the chat and my dog loves them").
- **Brand doc change.** I classed it as `agent_knowledge` rather than `offer`. Both have the same 5-day readable delay, so the readable date is Oct 9 either way.
- **Headline length.** The raw headline is 84 characters. It renders longer because the template appends the attribution window to the first CPA token.
