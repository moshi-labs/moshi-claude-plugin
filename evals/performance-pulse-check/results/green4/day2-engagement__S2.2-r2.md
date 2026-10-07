## Calls
1. get_organization_ads
2. get_flow_status_data
3. get_ad_performance
4. get_conversation_messages_conv_d2_01
5. get_conversation_messages_conv_d2_02
6. ads_get_ad_accounts
7. ads_get_ad_entities_account
8. ads_get_ad_entities_campaign
9. ads_get_ad_entities_adset
10. ads_get_ad_entities_ad_structure
11. ads_get_ad_entities_ad_daily_moshi_and_top
12. ads_account_get_activity_logs
13. ads_insights_anomaly_signal

(No get_recent_brand_doc_change file exists, so I did not call it. I skipped read 7, ads_get_ad_entities_ad_daily_comparison, because no comparison launch exists.)

## Reply
Your chat ads cost $2.08 per conversation on Meta (85 conversations) and drew 82 chats from ads in two days. Your Sales campaign shows 3.40x ROAS over the last 30 days (Meta, 1d_view_7d_click window). That is a different job, so the two numbers do not compete. A Sales ad set optimizes for purchases. Moshi's ad set optimizes for conversations, so ROAS does not apply to it. It also has no budget verdict before day 8. Moshi has no proven orders yet, and Closer has no recoveries yet.

Stage: Day 2 of the Moshi campaign. I judge cost per chat and carts, not ROAS.

Next gate: day 4 read on cost per chat and first carts, on 2026-10-08.
Later gate: day 8 read on cost per chat, carts and delayed orders, on 2026-10-12. Chat campaigns get no ROAS or CPA gate.

Flag: the chat count of 91 includes profile-button chats. Chats from ads is the 82 figure.

Meta may still add purchases to recent days, so the Sales ROAS can still move.

I made no budget change. Keep the Sales budget as it is until the day 8 read. Then compare cost per chat and carts.

The report is in the artifact (rendered to the data file above).

## Check
banner: none

## Notes
- Mode full. Moshi campaign is engagement (OUTCOME_ENGAGEMENT, CONVERSATIONS goal). No comparison: the Sales campaign is Feb 2026 (mature) and a different objective, so comparisons is empty with the "No comparable launch in the last 90 days" reason.
- Merchant ROAS 3.40x is computed in chat from read 3 (60833.72 / 17892.27), last_30d, 1d_view_7d_click. It is not in DATA as a token. Hard rule 2 says to show it. I gave the context right after.
- Moshi adset last_sig_edit_ts is Oct 5 (launch), so I set lastLearningReset to the launch date, not a reset. No change entries; the status activation is the launch. Learning left null.
- Anomaly scan was clean, so accountIssues is empty. population_mismatch went to flags[] and into one chat line.
- Added the Sales campaign to campaigns[] with its 3 top ads and 30 days of rows. The merchant campaign has 9 active ads (adCount) but only 3 listed.
- Unclear in skill: whether a merchant ROAS question on a mature campaign needs an explicit "no budget advice" line. I added a short hold-until-day-8 line, which may be borderline advice under the read-only rule. Also unclear: the exact date range of last_30d, since read 3 returns no dates.
- The "Later gate" line wording is my own; the skill gives only "name the later gate on its own line".
