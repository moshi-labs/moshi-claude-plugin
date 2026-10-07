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

(get_recent_brand_doc_change has no fixture file, so I skipped it. I also read the four references/ files and SKILL.md.)

## Reply
There is no ROAS or CPA for this campaign. It is labeled Sales, but its ad set optimizes for chats, and Meta reports no purchases for it. What it does show: $2.76 per chat over its first 5 days, against $6.38 for your Summer Pack Sale over the same first 5 days, with a 2.42% CTR against 1.17%. Your summer launch had 3.6x the budget and 8 ads to Moshi's 2, so Moshi is winning on less.

Moshi also has 2 thread-proven orders worth $148, 1 of them placed a day or more after the chat. That is a floor, not a ROAS.

Day 5 of the Moshi campaign: judging cost per chat and carts, not ROAS yet.

Next gate: day 8 read on cost per chat, carts and delayed orders, on 2026-10-09. This campaign has no ROAS or CPA gate, because chat campaigns are scored on cost per chat.

Nothing has changed on the account since launch.

Flag: Moshi's chat count includes profile-button chats. The cost per chat above uses Meta's chat count from ads, over Oct 2 to Oct 6.

Your full report is in the rendered pulse check.

## Check
banner: none

## Notes
- Both campaigns map to engagement: the ad sets optimize for CONVERSATIONS, even though the campaign objective is OUTCOME_SALES. So no ROAS, CPA or Moshi-built ROAS. The summer launch is engagement too, so the pair is valid.
- Picked the Summer Pack Sale (started 2026-08-07, 60 days old, not retargeting, all 8 ads from read 7) at day 5. Two comparisons: costPerConversation first, then ctr. Skipped the cpc comparison to stay inside the two-comparison limit.
- last_sig_edit_ts equals the launch moment for both ad sets, so I set lastLearningReset to null (a reset on day 1 is the launch). learning is null: Meta returned no status.
- The one activity log entry is the campaign going Active at launch, so changes[] is empty.
- Merged reads 6 and 7 per ad per date. The read 6 and read 7 rows for the top 3 summer ads did not overlap by date, so all were kept.
- Meta shows its own cost per chat at $2.76 (423 chats); Moshi's costPerChat is $2.78 (420 chats from ads). I cited the Meta one and named the chats-from-ads flag.
- Skipped the backfill line in chat: I cited no Meta purchases. The template still prints it.
- Unclear in the skill: whether a status change at launch counts as a "change" (I treated it as the launch). Also unclear how to answer a ROAS/CPA question on a Sales-labeled engagement campaign for the next-gate line. I said no ROAS gate exists and named the day 8 gate. get_recent_brand_doc_change has no fixture, so I could not tell if it "exists".
- The rendered body ends with the template's resource note, which starts "Your campaign:". It reads a little oddly but is correct.
