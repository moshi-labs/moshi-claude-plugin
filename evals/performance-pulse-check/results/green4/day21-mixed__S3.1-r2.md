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

(ads_get_field_context not opened: no read rejected a field.)

## Reply

Moshi did not break anything. Your Moshi sales CPA is $48.52 for Sep 16 to Oct 6 (Meta purchases, attribution 1d_view_7d_click). It was $38.49 on Sep 16 to 23 and $54.75 on Sep 24 to Oct 6. The last 7 days (Sep 30 to Oct 6) are at $46.75, so it is coming back down. The rise starts on Sep 24, when the budget went from $400 to $580/day. That reset the ad set clock, and the first three days after it cost $98 to $148 per purchase. Your click-through rate held at about 2.2% the whole time, so shoppers still like the ads. Meta also flags an audience overlap with your Lookalike 1% ad set that is lifting CPM by about 18% over the last 7 days.

On the same first 14 days of life, Moshi CPA is $49.58 against $61.79 on your Raincoat launch. Raincoat had 2.4x Moshi's budget and 8 ads against 3. Moshi CPC is $0.78 against $1.05.

Your top ad, Pet Parent Testimonial, is wearing out. Its frequency is 3.90 and its CTR fell from 1.95% to 1.00%, while Moshi's CTR holds.

Floors, not totals:
- Moshi proven 11 orders ($689.20 revenue), 4 of them placed a day or more after the chat.
- Closer recovered 3 orders ($164.80 revenue).

Stage: day 13 of the Moshi sales campaign (clock restarted Sep 24). This is the first fair CPA and ROAS read. It has 80 Meta purchases in the last 7 days, above the 50 needed. The chat campaign is on day 21 and is judged on cost per conversation ($1.73 by Meta), not CPA or ROAS.

Next gate: 2026-10-08, the day 15 fatigue read on the sales campaign.
Later gate: 2026-10-16, the day 31 full verdict on the chat campaign.

What changed and when it shows:
- Budget raised Sep 24: CPA is readable from Oct 1, so it is readable now.
- Return window changed to 30 days on Oct 4: chats are readable from Oct 9.
- Lookalike budget raised from $1800 to $1980/day on Oct 5: results are readable from Oct 8.

Meta may still add purchases to recent days.

One puppy-mix question in a profile chat is waiting for your reply.

Full report: rendered from /Users/wesley/code/moshi-claude-plugin/evals/performance-pulse-check/results/green4/day21-mixed__S3.1-r2.data.js

## Check

banner: none

## Notes

- Sales ad set reset (last_sig_edit_ts = Sep 24) makes day 1 = Sep 24, day 13 today. I used {c:...} clock tokens, no {m:...} clock tokens. The chat ad set edit date equals launch (Sep 16), so no reset there.
- Chat campaign is engagement (CONVERSATIONS goal): no ROAS or CPA. Cited Meta cost per conversation in chat only. The template shows Moshi cost per chat ($23.57) on its own.
- One comparison pair: Raincoat launch (closest budget, 8 ads at $1,400/day total, ABO), metrics cpa then cpc, day 14 (cap). Lookalike (CBO $1,980) kept in the account map with ads: []. Moshi wins both, so no losing metric to show. No engagement launch exists, so the chat campaign has no comparison.
- Verdict avoids the {a:...frequency} token for the top ad: the window average (3.31) hid the current 3.90. I wrote "rising frequency" in DATA and gave 3.90 and CTR 1.95% to 1.00% in chat from the daily rows.
- Pre/post split CPA ($38.49, $54.75, $46.75) was computed by me from daily rows, not a template value. No tool flag touches a cited number, so no flag lines in chat. Both flags are still in flags[].
- Did not quote the email in the profile chat. Marked the puppy question as waiting because the last message in that chat is the shopper's.
- Unclear in skill text: the window start (I used the Moshi window Sep 16 to Oct 6, though the top-ad rows start Sep 7); which budget to use for an ABO comparison campaign with two ad sets; whether the chat reply may state numbers I computed from daily rows; whether an ad set reset equal to launch should be written as lastLearningReset or null (I wrote the date and the template treated it as launch); whether to say "learning reset" given rule 6.
- No artifact published: the render step replaced it with check.js.
