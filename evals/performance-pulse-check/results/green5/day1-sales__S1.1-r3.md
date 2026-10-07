## Calls

1. get_organization_ads
2. get_flow_status_data
3. get_ad_performance
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

(No tool file exists for get_recent_brand_doc_change, so I did not call it. ads_get_field_context not opened.)

## Reply

Your CFO is right: Meta shows ROAS 0.3 today, from 2 purchases worth $45.50 on $153.83 spend (attribution 1d_view_7d_click). That is a first-day reading, not a verdict. Your best real number today is attention: Moshi's CTR is 2.25% against 1.18% for your Summer Linen Mist launch on its day 1, and CPC is $0.65 against $1.09. Moshi also has 12 chats from ads at $12.82 each, and 1 order proven in a chat thread for $24.50. That order is a floor, and I do not add it to Meta's purchases.

Do not kill Moshi today. The rules block any ROAS verdict before day 8.

Stage: day 1 of the Moshi campaign. I judge delivery, CTR and CPC, not ROAS.

Next gate: day 4 read on 2026-10-09 (cost per chat, product views, first carts).
Later gate: first ROAS and CPA read on 2026-10-13.

What changed: nothing since launch. The only log entry is Moshi turning the campaign on.

Flags:
- Today's Moshi spend is partial, so the $153.83 and the cost per chat will move by tonight.
- Meta may still add purchases to recent days.

The full report is rendered from the data file (banner: none). Your launch has 6.3x Moshi's budget, so read that comparison with that in mind.

## Check

banner: none

## Notes

- Mapped the Moshi campaign to sales (OUTCOME_SALES, OFFSITE_CONVERSIONS), so ROAS is allowed as a shown number. I labeled it not a verdict (rule 2 shows it, rule 5 blocks the verdict).
- Picked Summer Linen Mist (budget 1900/day) over Autumn Amber (2400/day) as the closest daily budget. Used ctr and cpc at day 1, no cpa or roas.
- Amber and Linen both set adsPulled "all" (read 7 pulled all their ads). Evergreen and Interests set "top". Retargeting and others "none".
- changes[] empty: the single activity-log row is the launch activation by Moshi, not a change.
- lastLearningReset set to 2026-10-06 from last_sig_edit_ts (09:00 PDT, the launch day). The template treated it as launch, not a reset.
- learning left null: Meta returned no learning status.
- cart_value_unknown flag not repeated in the chat reply because I cited no cart number. Both flags are in flags[].
- No transcript quote or theme uses names or contact details. Conversation 1 ends on a shopper message, so I did not say the shopper is answered. I wrote no "waiting" claim.
- Unclear in the skill: whether a lastLearningReset on launch day should be filled or left null. Also unclear whether to show ROAS in the verdict before day 8 when the merchant asks. Rule 2 and rule 5 pull against each other. Also: step 1 says to read get_recent_brand_doc_change "if it exists", but no way to check existence in the fixture. Step 7 "{m:age}" token rendered "day 1" with a stray space before the period in the stub text.
