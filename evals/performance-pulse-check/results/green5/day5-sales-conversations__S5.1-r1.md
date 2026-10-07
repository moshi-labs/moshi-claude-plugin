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

(get_recent_brand_doc_change not called: no fixture exists for it.)

## Reply
Your Moshi campaign has no ROAS or CPA to give. It is a Sales campaign, but its ad set optimizes for conversations, so Meta chases chats and not purchases. The number that fits is cost per chat: $2.76 per conversation over 5 days, against $6.38 for the first 5 days of your summer launch. Click-through rate is 2.42% against 1.17%. Your summer launch had 3.6x the budget ($900/day against $250/day) and 8 ads against 2.

Moshi also has 2 proven orders ($148), 1 of them placed a day or more after the chat. That is a floor, not a ROAS. Meta shows no purchases for this campaign.

Day 5 of the Moshi campaign: judging cost per chat and carts, not ROAS yet.

Next gate: first fair cost-per-chat read on 2026-10-09. This campaign has no ROAS or CPA gate.

Flag: the chat totals include profile-button chats, so I use chats from ads (420 of 429) for cost per chat.

The full report is in the render.

## Check
banner: none

## Notes
- Classified both campaigns as engagement: OUTCOME_SALES objective, but every ad set optimizes for CONVERSATIONS. So no ROAS or CPA anywhere, and the merchant's ROAS/CPA question gets "not applicable".
- Summer launch (start 2026-08-07, 60 days before asOf, not retargeting, same objective) qualifies. It has 8 ads, all pulled by read 7, so adsPulled is "all". Two comparisons at day 5: costPerConversation, then ctr. Moshi wins both, so the order follows "lead with the win".
- lastLearningReset is null for both ad sets: last_sig_edit_ts equals the launch time, and the skill says a reset on day 1 is the launch. learning is null (Meta gives no status).
- changes[] is empty: the only activity log entry is the launch activation on Oct 2.
- Anomaly scan found nothing, so accountIssues is empty. Only flag is Moshi's population_mismatch.
- get_recent_brand_doc_change had no fixture, so I skipped it ("if it exists").
- Verdict avoids c: tokens for the summer campaign and uses cmp: tokens, because c: tokens cover the whole window.
- Unclear in the skill: whether to cite the Meta cost per conversation ($2.76) or {m:costPerChat} ($2.78, ads only). I cited Meta's figure in the chat reply and matched the comparison. The report shows both. The skill gives no wording for an engagement campaign whose gate is labeled "first CPA read" in the answer-shape example, so I wrote "cost-per-chat read".
- The skill says the attribution window must be named when citing Meta purchases. I cited none, so I did not name it in chat.
- The render adds "Meta may still add purchases to recent days" next to an empty purchases row. This reads slightly odd but comes from the template.
