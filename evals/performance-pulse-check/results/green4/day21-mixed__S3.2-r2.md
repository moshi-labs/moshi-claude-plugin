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

Your Moshi Sales ads cost $49.58 per Meta purchase over their first 14 days, against $61.79 on your Raincoat launch (attribution window 1d_view_7d_click, 14 days of life each). Your launch had 2.4x Moshi's daily budget and 8 ads against 3. Meta may still add purchases to recent days.

Moshi-proven orders: 11, worth $689.20. This is a floor. Closer recoveries: 3, worth $164.80. Meta purchases and these orders are separate rows and I did not add them.

Your top ad, "Pet Parent Testimonial", shows frequency 3.90 on its day 30, and its CTR fell from 1.95% to 1.00%. Moshi's CTR holds: its best ad is at 2.46% on day 21.

I cannot give you emails. The report and quotes stay anonymous. Find contact details in the Moshi dashboard. Three shopper quotes:
- "Will the salmon jerky upset a sensitive stomach?" (from an ad)
- "Is the puppy mix soft enough for a ten week old?" (from your profile; this shopper sent the last message and waits for an answer)
- "my dog loves them so I want to reorder the large bag" (from an ad)

Stage: Day 13 of the Moshi Sales campaign. Its clock restarted on Sep 24 after the budget raise, so this is the first fair read of CPA and ROAS. The chat campaign is on day 21 and is judged on cost per conversation ($1.73 per Meta conversation), with no ROAS or CPA.

Next gate: fatigue and frequency read on 2026-10-08.
Later gate: full verdict for the chat campaign on 2026-10-16.

What changed and when it shows:
- Your Lookalike budget rose 10% on Oct 5, so results are readable from Oct 8.
- The Moshi return window changed on Oct 4, so chats are readable from Oct 9.
- The Sales budget rose 45% on Sep 24, and CPA has been readable since Oct 1.

Meta also reports audience overlap between "Moshi | Sales | Broad US" and "Lookalike 1% Pet Parents". It says CPM is up about 18% on both over 7 days.

The full report is in the data file day21-mixed__S3.2-r2.data.js, rendered by check.js.

## Check

banner: none

## Notes

- Merchant asked for emails: refused per hard rule 12 and pointed to the Moshi dashboard. Quotes are anonymous and 15 words or fewer. The third quote is a trimmed excerpt (12 words) of a longer message.
- Classified the Moshi Sales campaign as sales (OFFSITE_CONVERSIONS) and the chat campaign as engagement (CONVERSATIONS). Gave the chat campaign no ROAS or CPA.
- Used the reset clock for the Sales campaign (reset Sep 24, day 13). Used c: tokens, not m: tokens, because m: clock tokens fail with a reset.
- Comparison: one merchant launch, Raincoat (ABO, 2 x $700/day, closest budget to Moshi's $580), two metrics (cpa, roas) at 14 days. The Lookalike launch (closer on ROAS, 1.15x vs Moshi 1.09x at 14 days) was not picked because the recipe picks the closest budget. No comparison for the chat campaign: no engagement launch.
- Evergreen is a mature campaign. It appears only as the fatigue source and in the account map, with top 3 ads pulled (adCount 9).
- Listed the Lookalike Oct 5 budget change and the brand doc change even though the merchant did not ask. The launch itself (Sep 16 status) is not a change.
- No tool flag touches a number cited in the chat reply, so the reply has no flag lines. Both flags are in flags[].
- Unclear in the skill: the nearest-gate rule with campaigns on different clocks (I took the earliest, Sales day 15, and named the chat day 31 as the later gate). The "Cost per ad chat" tile ($23.57) divides all-Moshi spend by ad chats; I did not cite it because of the population_mismatch flag.
- Unclear: the skill says the artifact is the report, but the render step here writes a data file only, so the reply points to it.
- Unclear: tokens such as {c:...conversations} cover the whole window, so I worded the shopper theme to say "in the window".
