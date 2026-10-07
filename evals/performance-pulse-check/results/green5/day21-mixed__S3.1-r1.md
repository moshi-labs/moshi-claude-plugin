## Calls

Opened in this order (context.json and the SKILL.md references were read first):

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
13. ads_account_get_activity_logs
14. ads_insights_anomaly_signal
15. ads_get_ad_entities_ad_daily_moshi_and_top
16. ads_get_ad_entities_ad_daily_comparison

Not opened: ads_get_field_context.

## Reply

Your Moshi Sales campaign costs $48.52 per purchase over the window (Sep 16 to Oct 6, Meta's 1d_view_7d_click window). Over its first 14 days it cost $49.58, against $61.79 for your Raincoat launch. Moshi's CTR also held at 2.19% there, against 1.24%. The Raincoat launch had 2.4x the budget and 8 ads against Moshi's 3.

Your CPA did go up, and the data points to the Sep 24 budget raise, not a Moshi fault. You raised the Moshi Sales budget 45%, from $400 to $580 a day. That restarted learning for the ad set. CPA ran about $38 a purchase before the raise, about $118 on Sep 24 to 26, and about $47 since Sep 27. It has settled, but about 20% above where it started. Meta also flags audience overlap between "Moshi | Sales | Broad US" and "Lookalike 1% Pet Parents". It says the overlap raised CPM on both, up about 18% over the last 7 days.

One more thing on the account: your top ad, Pet Parent Testimonial, is at frequency 3.90. Its CTR fell from 1.95% to 1.00% since Sep 7. Moshi's CTR held near 2.4% on its top ad.

Floors that Meta's pixel does not credit: 11 thread-proven orders worth $689.20 (4 came a day or more after the chat), shown apart from Meta's 214 purchases. Closer recovered 3 more orders worth $164.80.

Stage: the Moshi Sales ad set is on day 13 since the Sep 24 reset, so CPA and ROAS are fair to read now. The Moshi chat campaign is on day 21 and Meta optimizes it for conversations, so I judge cost per chat and carts there, never CPA or ROAS.

Next gate: day 15 read on 2026-10-08 for the Moshi Sales campaign (fatigue and frequency).
Later gate: day 31 full verdict on 2026-10-16 for the chat campaign, and on 2026-10-24 for Moshi Sales.

What changed and when it shows:
- Budget raised 45% on Sep 24: delivery was readable Sep 27 and CPA from Oct 1.
- Return window changed from 14 to 30 days on Oct 4 (Moshi doc): chats are readable from Oct 9.
- Your Lookalike budget rose 10% on Oct 5: results are readable from Oct 8.

Meta may still add purchases to recent days.

The full report is in the artifact. Hold the Moshi Sales budget until Oct 8.

## Check

banner: none

## Notes

- Date rendered Oct 6. context.json says 2026-10-06 although the system date differs. I used context.json.
- Sales campaign clock: ad set `last_sig_edit_ts` is 2026-09-24 (matches the activity log budget raise), so day 13, next gate day 15 on 2026-10-08. The chat ad set `last_sig_edit_ts` equals the launch day, so I put it in `lastLearningReset` as given and the check passed.
- Classified "Moshi | Chat Starter" as engagement (OUTCOME_ENGAGEMENT, CONVERSATIONS goal). No CPA or ROAS used for it. No comparison exists for engagement: no merchant engagement launch.
- Two comparisons, both Moshi Sales vs Raincoat (closest budget at 1400 vs 580; Lookalike is 1980): CPA and CTR, day 14. I included the Lookalike campaign in `campaigns` for the account map, with its pulled rows. I did not compare it: Moshi's CPA is nearly equal there (about 49.58 vs 49.91), so it adds little. I did not hide it.
- Evergreen campaign is `adsPulled: "top"`, so I cited it only in chat (frequency and CTR of its top ad, from the fatigue read of read 6). Its start time is null (1969).
- No Moshi `costPerChat` token used: the $23.57 tile mixes sales spend with chat counts and the `population_mismatch` flag applies. I did not cite chat counts in the reply, so I gave no flag line in the reply. Both Moshi flags are in `flags[]` and show in the report.
- No learning status stated: Meta returns none.
- Pre-raise ($38), Sep 24-26 ($118) and since-Sep-27 ($47) CPA figures are my sums of the daily rows, in chat only (the contract has no token for a date-limited slice). Merchant can check them in Ads Manager.
- Conv_02 last message came from the shopper, so I said that chat waits. I used no email in any text.
- Unclear in the skill: (1) the answer shape asks for one line in part 1 but also floors and the fatigue line, so the reply runs over 1-2 sentences; (2) the read order says read 6 before 8 and 9, but I opened the daily files last because they were large; (3) it does not say whether the `lastLearningReset` of a launch-day edit should be null or the date; (4) it does not say how to treat a verdict phrase like "settled" when the post-reset CPA is still above the pre-reset CPA.
