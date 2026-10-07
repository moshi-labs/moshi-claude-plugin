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
Moshi did not break anything. Your Moshi Sales CPA is $48.52 for Sep 16 to Oct 6 (Meta purchases, 1d_view_7d_click). The rise follows your Sep 24 budget raise from $400 to $580/day. Daily CPA ran $98 to $148 on Sep 24 to 26, then settled near $47 over Sep 30 to Oct 6, against $38.49 on Sep 16 to 23. Meta also flags audience overlap with your Lookalike 1% ad set, which pushes CPM up on both.

Over the same first 14 days of life, Moshi's CPA was $49.58 against $61.79 on your Raincoat launch, and Moshi ran 3 ads at $580/day against 8 ads at $1,400/day. Moshi's CTR held steady, between 2.15% and 2.29% a day. Your top ad, Pet Parent Testimonial, is at frequency 3.90 and its CTR fell from 1.95% to 1.00% over 30 days, so it is tired.

Floors that Meta's pixel misses: 11 Moshi-proven orders ($689) and 3 Closer recoveries ($165). I do not add them to Meta's 214 purchases. Meta may still add purchases to recent days.

Stage: day 13 of the Moshi Sales campaign, with its clock restarted on Sep 24, so CPA is readable now. Chat Starter is on day 21 and is judged on cost per chat, never CPA or ROAS.

Next gate: day 15 fatigue and frequency read on 2026-10-08.
Later gate: day 31 full verdict on 2026-10-16 for Chat Starter and 2026-10-24 for Sales.

What changed and when it shows: your Lookalike budget rose from $1800 to $1980/day on Oct 5, so its results are readable from Oct 8. The return window changed from 14 to 30 days on Oct 4, so chats are readable from Oct 9.

One shopper in a profile chat is waiting on an answer about puppy mix softness.

The full report is rendered from day21-mixed__S3.1-r3.data.js.

## Check
banner: none

## Notes
- Mapped Moshi | Chat Starter to engagement (OUTCOME_ENGAGEMENT, CONVERSATIONS goal). No CPA or ROAS for it.
- Used the Sales ad set reset (2026-09-24, from last_sig_edit_ts and the budget raise) for stage and gates. Chat ad set reset equals launch, so no reset.
- Compared Moshi Sales to Raincoat (closest budget among launches under 90 days). Both metrics are cpa and cpc, day 14. Lookalike was a near tie on CPA and not used.
- The period CPAs in the reply (Sep 16-23, Sep 24-26, Sep 30-Oct 6) come from my own sums of Meta daily rows. Tokens cannot cite sub-windows, so they are not in DATA.
- Chat reply names no chat counts or carts, so no Moshi flag lines appear in it. Both flags are in flags[].
- Unclear in the skill: whether the headline 90-char limit counts raw token text (final raw is under 90). Unclear whether "the artifact" is required when the render step replaces it, so I pointed to the data file.
- Unclear: how to word a 14-day launch comparison next to a window-level CPA without confusing the merchant. I stated both and named the basis.
- Fatigue read used the template's 30-day ad rows for the top ad, as pulled by read 6.
