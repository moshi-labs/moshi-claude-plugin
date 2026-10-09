# day5-sales-conversations · S5.1 · r1

## Calls

1. `get_flow_status_data` `{}`. Returned window 2026-10-02 to 2026-10-06, flag `population_mismatch`, `transcriptsToRead` = conv_d5_01, conv_d5_02.
2. `get_ad_performance` `{}`. Report window 2026-10-02 to 2026-10-06, no flags.
3. `get_conversation_messages` `{conversationId: "conv_d5_01"}`
4. `get_conversation_messages` `{conversationId: "conv_d5_02"}`
5. `get_ad_account_tree` T1 account: `{dateFrom: "2026-09-07", dateTo: "2026-10-06", maxAds: 0}`
6. `get_ad_account_tree` T2 Moshi ads: `{dateFrom: "2026-09-07", dateTo: "2026-10-06", granularity: "daily", owner: "moshi", maxAds: 500}`
7. `get_ad_account_tree` T3 top ads: `{dateFrom: "2026-09-07", dateTo: "2026-10-06", granularity: "daily", owner: "merchant", maxAds: 3}`
8. `get_ad_account_tree` T4 launches: `{dateFrom: "2026-07-09", dateTo: "2026-10-06", owner: "merchant", maxAds: 0}`
9. `get_ad_account_tree` T5 one launch (campaign 1202660000000139, whole campaign is the launch): `{adsetIds: ["1202660000000138"], granularity: "daily", dateFrom: "2026-08-07", dateTo: "2026-08-20"}`

Not called:
- `get_recent_brand_doc_change`: this server does not have the tool.
- T6 overlap: both Moshi ads have `clonedFrom: null` and `creativeOverlap: []`.
- Any second T5: T4 lists only one launch.
- No `organization` argument on any tree read. No retries. No write tools.

## Reply

Moshi's campaign is starting chats at $2.76 each on Meta's count (423 chats started on $1,166), against $6.38 for your Summer Pack launch over the same first 5 days. It runs under a Sales objective, but its ad set optimizes for conversations, so Meta is chasing chats, not purchases: ROAS and CPA don't apply to it, now or later.

Moshi has also proven 2 orders ($148) straight from its chat threads, one placed a day or more after the chat: a floor, never added to Meta's count.

Meta's own count shows 0 purchases on the campaign so far (7-day click, 1-day view). Meta may still add purchases to recent days.

Day 5 of the Moshi campaign: judging cost per chat, contacts (64 so far) and first carts (8).

Next gate: first fair cost-per-chat read on 2026-10-09 (day 8), with carts and delayed orders.
No ROAS or CPA gate follows for this campaign. The full verdict comes on 2026-11-01 (day 31).

Moshi counts 429 chats because it includes chats started from your profile button. 420 came from ads, and the $2.76 uses Meta's count instead.

Your full pulse-check report is attached.

## Check

banner: none

## Notes

- **Classification.** The Moshi campaign is OUTCOME_SALES, but its only ad set optimizes for CONVERSATIONS, so it is engagement: no ROAS or CPA anywhere. I answered "not applicable, now or later" (not "not yet") and gave cost per chat instead. The merchant's launch is built the same way (Sales objective, CONVERSATIONS goal), so the comparison is engagement against engagement.
- **Clock.** Day 1 is Oct 2 (the start time and the first delivery), so today is day 5. The Moshi ad set's `lastSignificantEditAt` (2026-10-02T15:00Z = 09:00 MDT on Oct 2) falls on launch day, so it is not a reset and `changes` is empty. Next gate is day 8 = 2026-10-09.
- **Comparisons.** Cost per conversation and CTR at `day: 5`, which is Moshi's age. That includes today's partial day, which I kept per the recipe because these are rates. Day 4 gives almost the same result ($2.76 vs $6.40). Moshi also leads on CPC ($0.51 vs $1.07), but the recipe allows at most two comparisons.
- **Meta purchases.** I showed Meta's 0 in the reply under hard rule 2, because the report's purchases card shows it too. I named the attribution window and added the backfill line. Proven orders are stated as a floor and never combined with Meta's count.
- **Flags.** The `ads_over_max_ads` flags on T1, T3 and T4 are left out because they are expected. The only flag is Moshi's `population_mismatch`.
- **Judgment call.** Because `get_recent_brand_doc_change` is missing, I added "agent knowledge changes not reported" to `notMeasurableYet`. I also added "Fatigue: needs day 15".
- **Possible contract gap.** The launch campaign gets `adsPulled: "all"` per the contract, because T5 pulled all 8 ads. But its rows for Sep 7–Oct 6 exist only for the 3 T3 top ads. Any `c:` or `all:merchant` window token on it would undercount, so I cited it only through `cmp:` tokens.
- **Odd in the fixture:**
  - Moshi's ad set shows `learningPhase` SUCCESS on day 5 while `learningWindowEndsAt` is Oct 9. I took it as-is and said nothing about learning.
  - The merchant's campaign shows 0 Meta purchases on $64,004 over 90 days. That looks like purchases aren't tracked on message ads, but the contract forbids adding a pixel issue, so I left it out.
  - The Moshi scorecard's `purchases: 2` means thread-proven orders, not Meta purchases.
  - Both transcripts end on an agent message, so no shopper is waiting.
- **Skill ambiguities:**
  - The answer-shape stage example ends "not ROAS yet", which is wrong for an engagement campaign.
  - "Name the later gate on its own line" doesn't fit when the gate the merchant asked about (ROAS) never exists. I named the day-31 full verdict and said no ROAS or CPA gate follows.
  - The red flag "Saying ROAS or CPA near an engagement campaign" sits against the rationalization row "Say so". The verdict names ROAS and CPA only to say they don't apply, and the check passed.
