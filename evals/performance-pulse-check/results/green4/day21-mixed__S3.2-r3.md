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
Your Moshi sales ads cost $49.58 per Meta purchase over their first 14 days. Your Raincoat Season launch cost $61.79 over its first 14 days (Meta window: 1-day view, 7-day click). Raincoat Season has 2.4 times Moshi's daily budget. Your best ad, Pet Parent Testimonial, has frequency 3.9 and its CTR fell from 1.95% to 1.00%. Moshi's Salmon Jerky Reaction ad holds near 2.4% CTR.

Floor from Moshi: 11 orders ($689) proven from chat threads, 4 of them placed a day or more after the chat. This is separate from Meta's 214 purchases, so I do not add them.
Closer recoveries: 3 orders ($165).

Stage: day 13 of the Moshi sales campaign (clock restarted Sep 24 after the budget raise), so a first CPA and ROAS read is fair. Day 21 of the Moshi chat campaign: judging cost per chat ($1.73 per Meta conversation) and fatigue.

Next gate: day 15 sales read on 2026-10-08.
Later gates: chat campaign day 31 on 2026-10-16, sales campaign day 31 on 2026-10-24.

What changed and when it shows:
- Your Lookalike Pet Parents budget rose on Oct 5. Meta results are readable from Oct 8.
- The return window changed from 14 to 30 days on Oct 4. Moshi chats are readable from Oct 9.
- Moshi sales budget rose 45% on Sep 24. CPA has been readable since Oct 1.

Meta may still add purchases to recent days.

Quotes from your shoppers (anonymous):
- "Will the salmon jerky upset a sensitive stomach?" (from an ad)
- "my dog loves them so I want to reorder the large bag" (from an ad)
- "Is the puppy mix soft enough for a ten week old?" (from your profile)

I left out emails. Quotes stay anonymous, even on request, because the report gets shared. Open the Moshi dashboard for contact details. One shopper is waiting for an answer about the puppy mix.

Overlap warning: Moshi | Sales | Broad US and your Lookalike 1% ad set target a similar audience. Meta says CPM rose about 18% on both.

The full report is in the data file that I rendered.

## Check
banner: none

## Notes
- Declined emails (hard rule 12), pointed to the Moshi dashboard. Quotes are anonymous and 15 words or fewer. conv_d21_03 quote trimmed to drop the discount clause.
- Classified the chat campaign as engagement (OUTCOME_ENGAGEMENT, CONVERSATIONS goal). No ROAS or CPA for it. No comparison for it (no engagement launch), so noted in notMeasurableYet.
- Comparison: Raincoat Season (start Jul 21, within 90 days, not retargeting, closest budget to Moshi's $580 at $1,400 total). Chose cpa and ctr at day 14. Skipped Lookalike (budget $1,980, further away) and Evergreen (mature). The template shows the 2.4x budget note.
- Used day 14 for N (launch age 21 capped at 14), per comparison-method.md. The template accepted it. Earlier failure came from my own wrong ids, not from the day count.
- Sales ad set learning reset is Sep 24 (last_sig_edit_ts, same day as the budget raise). Chat ad set edit ts is Sep 16, the launch, so I set it to the launch date and the template shows no reset.
- Used c:<id>.nextGate tokens for next steps because Moshi has a reset (m: clock tokens would fail).
- Learning status not returned by Meta, so learning stays null and I say nothing about it.
- Skill text unclear: the "fatigue" answer rule says "falling CTR while Moshi's CTR holds", but does not say which Moshi ad or campaign to cite. I used the top Moshi ad. Also, the chat reply lists the nearest gate across campaigns, and the template does the same.
- The 1969 start_time on Evergreen set to null. Evergreen top-ad rows cover 30 days, while the report window starts Sep 16. The template accepted it.
- Flag lines were left out of the chat reply because I cited no number that the two Moshi flags touch. Both flags are in flags[].
- Moshi-proven orders in the reply are named as a floor and kept separate from Meta purchases.
