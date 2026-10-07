## Calls

1. get_organization_ads
2. get_flow_status_data
3. get_ad_performance
4. get_recent_brand_doc_change
5. get_conversation_messages_conv_d21_01
6. get_conversation_messages_conv_d21_02
7. get_conversation_messages_conv_d21_03
8. ads_get_ad_accounts
9. ads_get_ad_entities_account
10. ads_get_ad_entities_campaign
11. ads_get_ad_entities_adset
12. ads_get_ad_entities_ad_structure
13. ads_get_ad_entities_ad_daily_moshi_and_top
14. ads_get_ad_entities_ad_daily_comparison
15. ads_account_get_activity_logs
16. ads_insights_anomaly_signal

## Reply

Moshi did not break anything. Your Moshi Sales ads still get a 2.20% click rate at $0.79 per click. In its first 14 days the Moshi Sales campaign cost $49.58 per purchase, against $61.79 for your Raincoat launch over the same first 14 days (Raincoat has 2.4x the budget). Meta attribution here is 1d_view_7d_click.

Your CPA rise has three sources in the data:
- The Moshi Sales budget went from $400 to $580 a day on Sep 24. The Store Owner made that change in Ads Manager. Cost per purchase was $38.49 on Sep 16-23, $54.75 on Sep 24 to Oct 6, and $46.75 in the last 7 days (Sep 30 to Oct 6). It is coming back down.
- Meta's overlap scan says "Moshi | Sales | Broad US" and "Lookalike 1% Pet Parents" bid against each other. CPM is up about 18% on both over the last 7 days.
- Your top ad, Pet Parent Testimonial, is tired. Its frequency is 3.90 and its CTR fell from 1.95% on Sep 7 to 1.00% on Oct 6. Moshi's best ad holds a 2.46% CTR.

Floors from Moshi: 11 proven orders worth $689.20, and 3 Closer recoveries worth $164.80. Meta's 214 purchases are a separate count. Meta may still add purchases to recent days.

Stage: the Moshi Sales campaign is on day 13 of its restarted count (reset Sep 24), so a CPA read is fair now. The chat campaign is on day 21 and has no CPA by design. It costs $1.73 per conversation.

Next gate: day 15 read on Moshi Sales on 2026-10-08.
Later gate: day 31 full verdict on the chat campaign on 2026-10-16.

What changed and when it shows:
- Budget raised on Sep 24: CPA readable from Oct 1.
- Return window changed from 14 to 30 days on Oct 4: chats readable from Oct 9.
- Lookalike budget raised on Oct 5: results readable from Oct 8.

No tool flag touches these numbers. The two Moshi flags are in the report. The full report has the comparison, the change list and the fatigue table.

## Check

banner: none

## Notes

- Read "my CPA" as the Moshi Sales campaign CPA plus the merchant's top ad. The chat campaign is engagement, so no CPA for it. State this assumption in the reply by naming the campaign.
- Moshi Sales clock: reset Sep 24 from last_sig_edit_ts (also the 45% budget raise in the activity log). Day 13, so CPA is readable (Oct 1 per template). Volume floor met (80 purchases in the last 7 days).
- Chat ad set last_sig_edit_ts is the launch date (Sep 16). I set lastLearningReset to 2026-09-16. The template treated it as launch, not a reset.
- Comparisons: Raincoat only (closest budget, 7/21 start, 77 days old, not retargeting). Two metrics on one pair, cpa and roas, day 14. Lookalike (budget 1980) stayed out and has adsPulled "none". Moshi wins both, so I could not show a metric Moshi loses.
- The weekly and pre/post-raise CPA splits in the reply come from my own sums of the daily rows. The template cannot token them, and the skill does not say whether the reply may hold derived splits. I gave the date ranges so the merchant can check them.
- The a: token for the top ad frequency (3.31) averages the whole window. The fatigue table shows 3.90 on Oct 6. The reply uses 3.90 and 1.95%/1.00% from the daily rows.
- Unclear in the skill: the answer shape says "lead with Moshi's strongest real number", but the merchant asked about a CPA rise. I led with "nothing broke" plus the first-14-day CPA win, then the causes.
- Unclear: when two Moshi campaigns have different gates, the skill says use the nearest (Oct 8, Sales day 15 on its reset clock). I named the chat campaign's day 31 as the later gate. Sales day 31 is Oct 24.
- Chat conv_d21_02 has an email. I did not quote it. The last message there is from the shopper, so I listed a waiting-shopper next step.
- The Sep 16 "Pending to Active" log row is the launch, so I left it out of changes.
- No flags cited in the reply: population_mismatch and cart_value_unknown touch numbers I did not cite.
