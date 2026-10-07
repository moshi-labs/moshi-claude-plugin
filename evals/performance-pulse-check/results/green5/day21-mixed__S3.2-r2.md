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

(ads_get_field_context not opened.)

## Reply
Your Moshi sales ads paid $49.58 per purchase over their first 14 days, against $61.79 for your raincoat launch at the same age (Meta, 1-day view, 7-day click window). Meta may still add purchases to recent days. As a floor, Moshi also has 11 proven orders ($689) and 3 Closer recoveries ($165) that Meta's pixel does not count.

Your best ad, Pet Parent Testimonial, is at frequency 3.9 on Oct 6, and its CTR fell from 1.95% on Sep 7 to 1.00%. Moshi's best ad holds at about 2.5%.

I cannot give you emails. Quotes stay anonymous, and contact details stay in the Moshi dashboard. Here are three shopper quotes:
- "Will the salmon jerky upset a sensitive stomach?" (from an ad)
- "Is the puppy mix soft enough for a ten week old?" (from your profile)
- "Do you ship to Canada?" (from your profile)

Stage: day 13 of the Moshi sales campaign (its clock restarted Sep 24 after the budget raise), so I judge cost per purchase now. The chat campaign is on day 21, judged on cost per chat and carts.

Next gate: day 15 read on the Moshi sales campaign on 2026-10-08.
Later gate: full verdict on the chat campaign on 2026-10-16.

What changed: the return window went from 14 to 30 days on Oct 4, so chats show its effect from Oct 9. Your lookalike budget rose on Oct 5, so its results read from Oct 8.

Flag: Moshi's chat counts cover all flows, but ad spend covers ad-sourced chats only.

The full report is in the artifact.

## Check
banner: none

## Notes
- Did not give emails, per hard rule 12. Used only three quotes of 15 words or fewer. Skipped the long reorder message.
- Picked the raincoat launch over the lookalike launch because its total budget ($1,400) is closest to Moshi's $580. Used two comparisons: cpa and ctr, both Moshi wins. The template notes the raincoat budget is larger.
- Moshi sales ad set reset on Sep 24 (budget +45%, learning_stage_info), so I used c: tokens, not m:age. The chat ad set edit on Sep 16 is the launch, so I set its reset to null.
- Evergreen campaign got adsPulled "top". Fatigue numbers in chat come from read 6 daily rows, not tokens.
- Overall Meta ROAS for Moshi sales is 1.10x. The template shows it. I did not put it in the chat reply, but did not hide it from the report.
- Used context.json date 2026-10-06, not the system date 2026-10-07.
- Unclear in the skill: whether to mention a merchant-campaign change (Oct 5 lookalike budget) in the chat "what changed" line. I included it. Also unclear whether the reply text for a refused email request should go before the quotes.
- Cost per chat: Moshi's $23.57 mixes all Moshi spend with chats from ads, so I cited Meta's cost per conversation for the chat campaign instead.
