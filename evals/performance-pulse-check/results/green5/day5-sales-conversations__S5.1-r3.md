## Calls
1. get_organization_ads
2. get_flow_status_data
3. get_ad_performance
4. get_conversation_messages_conv_d5_01
5. get_conversation_messages_conv_d5_02
6. ads_get_ad_accounts
7. ads_get_ad_entities_account
8. ads_get_ad_entities_campaign
9. ads_get_ad_entities_adset
10. ads_get_ad_entities_ad_structure
11. ads_get_ad_entities_ad_daily_moshi_and_top
12. ads_get_ad_entities_ad_daily_comparison
13. ads_account_get_activity_logs
14. ads_insights_anomaly_signal

(get_recent_brand_doc_change has no fixture file; not called. ads_get_field_context not called.)

## Reply
There is no ROAS or CPA for this campaign. It is labeled Sales, but its ad set optimizes for conversations, so Meta is not chasing purchases. The number that fits is cost per conversation: $2.76 on Meta. Over the same first 5 days, your summer launch paid $6.38 per conversation (2.3x more), and Moshi's click cost was $0.51 against $1.07. Your summer launch had 8 ads and $900/day, against Moshi's 2 ads and $250/day.

Moshi-proven orders so far: 2 orders, $148 in revenue, 1 placed a day or more after the chat. This is a floor, not a ROAS. Meta shows no purchases for this campaign yet. Closer recoveries: 0. Chats from ads: 420, with 8 carts.

Day 5 of the Moshi campaign: judging cost per chat and carts, not purchases yet.

Next gate: day 8 read on cost per chat, carts and delayed orders on 2026-10-09.
Later gate: day 15 fatigue watch on 2026-10-16. This campaign has no CPA or ROAS gate, because it is an engagement campaign.

Flag: Moshi's chat count includes profile-button chats (429 total, 420 from ads), so I cite ad chats only.

No changes since launch.

Report: rendered with the data check banner "none" (see the data file).

## Check
banner: none

## Notes
- Classified Moshi campaign and Summer Pack Sale as engagement: both ad sets have optimization_goal CONVERSATIONS, though both campaigns are OUTCOME_SALES. This blocked ROAS and CPA. I used costPerConversation and cpc.
- Summer launch (started 2026-08-07, 60 days old, non-retargeting) qualified as the comparison. Compared days 1-5 of each (Moshi 10-02 to 10-06, launch 08-07 to 08-11). Read 7 pulled all 8 ads, so adsPulled is "all".
- Merged read 6 and read 7 rows; no date overlap, no duplicates.
- last_sig_edit_ts on both ad sets equals the ad set launch time, so I treated it as launch, not a reset. lastLearningReset is null; learning is null.
- Activity log has only the launch status change (Pending to Active), so changes is empty. Skipped the "backfill" line in the reply because no Meta purchases are cited; the report shows it anyway.
- Meta cost per conversation ($2.76) and the template's Moshi cost per ad chat ($2.78, Moshi spend over chatsFromAds) differ slightly; I cited Meta's and named it.
- Skill unclear: the flag-line rule says "touches a number you cited"; I cited chats from ads, so I included it. Also unclear whether a launch-day last_sig_edit_ts should be stored in lastLearningReset. The "Moshi is on day 5 ." render has a stray space before the period.
- Merchant's question names a Sales campaign; the skill does not say whether to include a ROAS gate line. I stated none exists.
