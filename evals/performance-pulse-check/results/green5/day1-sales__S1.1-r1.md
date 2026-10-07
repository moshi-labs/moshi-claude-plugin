## Calls
1. get_organization_ads
2. get_flow_status_data
3. get_ad_performance
(get_recent_brand_doc_change: no fixture file, not called)
4. get_conversation_messages_conv_d1_01
5. get_conversation_messages_conv_d1_02
6. ads_get_ad_accounts
7. ads_get_ad_entities_account
8. ads_get_ad_entities_campaign
9. ads_get_ad_entities_adset
10. ads_get_ad_entities_ad_structure
11. ads_get_ad_entities_ad_daily_moshi_and_top
12. ads_get_ad_entities_ad_daily_comparison
13. ads_account_get_activity_logs
14. ads_insights_anomaly_signal

## Reply
Don't kill it today. Moshi is on day 1, and it is already getting clicks at 2.25% CTR and $0.65 a click, against 1.18% and $1.09 on your Summer Linen Mist launch in its first day. Your CFO's 0.3 is real: Meta shows 2 purchases and $45.50 on $153.83 of spend (1d_view_7d_click attribution). It is one partial day, so I don't judge ROAS yet.

Moshi also proved 1 order for $24.50 from the chat threads. That is a floor, and it is separate from Meta's 2 purchases. I never add the two.

Stage: day 1 of the Moshi campaign. I am judging clicks, chats and carts, not ROAS. Moshi has 14 chats (12 from ads), 6 product views and 2 carts.

Next gate: first read on cost per chat and carts on 2026-10-09.
Later gate: first ROAS and CPA read on 2026-10-13.

What changed: nothing since launch. The only log entry is the campaign going Active today.

Flags:
- Today's Moshi spend is partial, so $153.83 will grow.
- Open cart value is unknown, so the 2 carts have no dollar value.
- Meta may still add purchases to recent days.

Fair context: your Linen launch has 6.3x Moshi's daily budget and 9 ads against Moshi's 3. The full report is in results/green5/day1-sales__S1.1-r1.data.js, rendered through check.js.

## Check
banner: none

## Notes
- Used context.json date 2026-10-06, not the system prompt date.
- Moshi campaign is Sales with OFFSITE_CONVERSIONS, so objective is sales. ROAS is allowed to show, but no verdict before day 8 (rule 5). Showed the 0.30 number because the merchant asked (rule 2).
- Moshi ad set last_sig_edit_ts is 2026-10-06 (launch day), so I treated it as the launch, not a reset. I still wrote it into lastLearningReset. The template shows no reset issue.
- Compared against Summer Linen Mist (budget $1,900, closest to Moshi's $300) on ctr and cpc at day 1. Amber was the other qualifying launch. Moshi wins both. Skipped costPerConversation (sales objective, conversations null).
- Retargeting campaign has no start time (1969) and no ads pulled: adsPulled "none". Evergreen campaigns: "top".
- Left changes empty: the only log entry is the launch activation.
- Brand doc change tool has no fixture, so I skipped it and listed it under notMeasurableYet.
- Next gate dates computed by me from day 1 = Oct 6: day 4 = Oct 9, day 8 = Oct 13. The template agreed.
- Unclear in skill: whether to include the launch activation log line as a change. Whether lastLearningReset should hold the launch date or null when the edit equals launch. Whether a ROAS token in the verdict before day 8 is allowed when the merchant asked (I said yes under rule 2). The reply says "report is the artifact", but the render step here replaces the artifact.
- Quote and shopper theme: one shopper's last message ("Which one burns longest?") has no agent reply, so I flagged it as a merchant next step.
