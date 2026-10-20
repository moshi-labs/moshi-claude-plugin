# day1-sales · S1.1 · r1

## Calls

1. `get_flow_status_data` `{"period": "since_launch"}`
2. `get_ad_performance` `{"period": "since_launch"}`
3. `get_conversation_messages` `{"conversationId": "conv_d1_01"}`
4. `get_conversation_messages` `{"conversationId": "conv_d1_02"}`
5. `get_ad_account_tree` (T1 account) `{"dateFrom": "2026-09-07", "dateTo": "2026-10-06", "maxAds": 0}`
6. `get_ad_account_tree` (T2 Moshi ads) `{"dateFrom": "2026-09-07", "dateTo": "2026-10-06", "granularity": "daily", "owner": "moshi", "maxAds": 500}`
7. `get_ad_account_tree` (T3 top ads) `{"dateFrom": "2026-09-07", "dateTo": "2026-10-06", "granularity": "daily", "owner": "merchant", "maxAds": 3}`
8. `get_ad_account_tree` (T4 launches) `{"dateFrom": "2026-07-09", "dateTo": "2026-10-06", "owner": "merchant", "maxAds": 0}`
9. `get_ad_account_tree` (T5 launch 1202620000000067, Summer Linen Mist) `{"adsetIds": ["1202620000000066"], "granularity": "daily", "dateFrom": "2026-08-11", "dateTo": "2026-08-24"}`

Not called: `get_recent_brand_doc_change`. This server does not have it.

## Reply

Not today. On its first day, Moshi's ads have a 2.25% CTR against 1.18% on your Summer Linen Mist launch's first day, and clicks cost $0.65 against $1.09. Your CFO's 0.30 ROAS is a real number, just an early one: Meta counts 2 purchases worth $45.50 on $153.83 of spend (7-day click, 1-day view), over part of one day while Meta is still learning, so it can't be judged yet.

Floor: Moshi can prove 1 order from a chat ($24.50). It is counted separately from Meta's purchases, never added to them.

Day 1 of the Moshi campaign: judging delivery, CTR, CPC and chat starts, not ROAS yet.

Next gate: cost per chat and first carts on 2026-10-09.

First fair ROAS and CPA read: 2026-10-13. Meta counts 2 purchases toward learning so far, and a firm CPA call needs about 50 in 7 days.

- Today's Moshi spend is still partial, and Moshi's copy of Meta can trail by a few hours, so day one isn't finished.
- Meta may still add purchases to recent days.

The full pulse-check report is attached. It has your account map, the day-one comparison with Summer Linen Mist, what shoppers are asking, and next steps. One shopper asked which candle burns longest and is still waiting for a reply.

## Check

banner: none

## Notes

- **Brand-doc tool.** `get_recent_brand_doc_change` has no fixture, so it does not exist on this server. I did not call it. I added "Moshi agent changes … not listed" to `notMeasurableYet` so the gap is visible. `changes[]` is empty: the only significant edit (Moshi ad set, Oct 6 in LA time) falls on launch day, so it counts as the launch. `lastLearningReset` is still copied.
- **Moshi period.** The skill gives no period for the Moshi reads. I used `since_launch` (the default). Moshi launched today, so it covers exactly what the 30-day window would.
- **Report window.** I used T1's 30 days (2026-09-07 to 2026-10-06), not Moshi's one-day window. Reasons:
  - `campaigns[]` is "campaigns that delivered in the window", and only T1 can answer that.
  - The contract says `c:` metrics can span days before a reset.
  - The template counts age from `window.end`, so the day count is the same either way.
- **T5 pick.** Two launches qualified, Summer Linen Mist (Aug 11) and Autumn Amber (Sep 8). I read only Summer Linen Mist because its budget ($1,900/day) is closer to Moshi's $300/day than Autumn Amber's $2,400/day. The method says "pick the one with the closest daily budget". I read "at most two comparisons" as two metrics (CTR and CPC) against that one launch. The read plan's "at most two" launches makes this ambiguous. Autumn Amber stays in the account map with `adsPulled: "none"`.
- **Comparison and mood.** Day 1 allows CTR and CPC. `costPerConversation` is not possible because Meta counts 0 messaging conversations on these SHOP_NOW Sales ads, so it went to `notMeasurableYet`. Moshi leads on both metrics, so `mood: "delight"`. I led with CTR as the bigger gap.
- **ROAS in the verdict.** I cite `{c:…roas}` because the merchant asked about it (hard rule 2). It is framed as "not a read yet", with no judgment (hard rule 5). The template also shows it, labelled "too early to judge, first read Oct 13".
- **Attribution window in the verdict.** I wrote it in words ("seven-day-click, one-day-view") to keep digits out of token prose. The report and the reply both give the 7-day click, 1-day view setting.
- **Unclear: headline length.** The contract doesn't say whether the 90-character limit counts the raw string with tokens or the rendered text. I kept the raw string at 89 characters.
- **Retargeting campaign.** I set `objective: "other"` because its ad set isn't ACTIVE, so it shows no optimization goal. `startTime` is null (Meta returned 1969-12-31) and `retargeting` is true. I left it out of `accountIssues`: a paused campaign is not a problem I read, and the account map already labels it paused.
- **Flags.** I left out the `ads_over_max_ads` flags on T1, T3 and T4, as the skill says. T2 and T5 had no flags. The reply has a line for `spend_window_partial` because I cite spend. `cart_value_unknown` gets no reply line because the reply cites no cart number; it is in the report footer.
- **Waiting shopper.** In conv_d1_01 the shopper sent the last message ("Which one burns longest?"), so I call that shopper waiting. It is next step 1, owned by Moshi. In conv_d1_02 the agent sent the last message.
- **Answer shape part 4** ("what changed") is left out because no change has a readable date after today.
- **Artifact.** In this eval the report was rendered by check.js, not published. In a live session the reply's last paragraph would carry the artifact link.
