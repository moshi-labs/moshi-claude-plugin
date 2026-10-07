## Calls

1. get_organization_ads.json
2. get_flow_status_data.json
3. get_ad_performance.json
4. get_recent_brand_doc_change.json
5. get_conversation_messages_conv_d21_01.json
6. get_conversation_messages_conv_d21_02.json
7. get_conversation_messages_conv_d21_03.json
8. ads_get_ad_accounts.json (read 1)
9. ads_get_ad_entities_account.json (read 2)
10. ads_get_ad_entities_campaign.json (read 3)
11. ads_get_ad_entities_adset.json (read 4)
12. ads_get_ad_entities_ad_structure.json (read 5)
13. ads_get_ad_entities_ad_daily_moshi_and_top.json (read 6; too large to read whole, parsed with node)
14. ads_get_ad_entities_ad_daily_comparison.json (read 7; same)
15. ads_account_get_activity_logs.json (read 8)
16. ads_insights_anomaly_signal.json (read 9)

## Reply

Your Moshi Sales campaign beats your Raincoat launch on CPA over the same first 14 days of life: $49.58 against $61.79 (Meta purchases, 1d_view_7d_click). Your CPA rose because you raised the Moshi Sales budget 45% on Sep 24 ($400 to $580/day). Daily CPA peaked near $148 that day and was back in the $40 to $55 range from Sep 27. Over Sep 30 to Oct 6 it is $46.75, against $38.49 on Sep 16 to 23. Meta also says the Moshi Sales and Lookalike 1% ad sets overlap, and the overlap raises CPM on both by about 18%.

Moshi did not break. Moshi CTR held near 2.2% the whole time, and the campaign kept 11 to 14 Meta purchases a day after Sep 27. Moshi-proven orders: 11, a floor. Closer recoveries: 3, worth $164.80. These do not add to Meta's purchases. Meta may still add purchases to recent days.

Your top ad, Pet Parent Testimonial, has frequency 3.9 and falling CTR at day 21 of the Moshi launch. Moshi CTR holds.

Stage: the Moshi Sales campaign is on day 13 of its clock since the Sep 24 reset, so a first CPA read is fair. The Moshi chat campaign is engagement, on day 21: I judge cost per chat and carts there, never ROAS or CPA.

Next gate: day 15 read on 2026-10-08.
Later gate: day 31 full verdict on 2026-10-16.

What changed and when it shows:
- Sep 24: budget raised 45%. CPA readable from Oct 1, so it is readable now.
- Oct 4: return window changed from 14 to 30 days. Chats readable from Oct 9.
- Oct 5: Lookalike budget raised 10%. Results readable from Oct 8.

The full report is rendered from results/green5/day21-mixed__S3.1-r3.data.js.

## Check

banner: none

## Notes

- Used the context.json date (2026-10-06), not the system date.
- Sales campaign clock: reset Sep 24 (last_sig_edit_ts and the budget log agree), so day 13, next gate day 15 = Oct 8. Chat campaign reset equals launch, so day 21, next gate Oct 16. Nearest gate is Oct 8.
- Used c: tokens (not m:age) because a Moshi ad set has a reset.
- Two comparisons, both CPA at day 14: Raincoat (closest budget, ABO 700 per ad set) then Lookalike. Moshi wins the first and is level on the second. Evergreen was left out (mature, adsPulled top).
- The Meta CPA split (pre vs post Sep 24, last 7 days, daily peak) is computed by me from read-6 daily rows and is in the chat reply only, not in DATA.
- Volume floor met: 80 Meta purchases on the Sales ad set in the last 7 days.
- Left learning status null everywhere and said nothing about learning in prose.
- Skill text unclear: whether to list tool flags in the chat reply when none touches a cited number. I left them out of the reply and kept both in flags[].
- Skill text unclear: whether a reset equal to launch date (chat ad set, 2026-09-16) goes in lastLearningReset. I filled it; the template treated it as launch.
- Read 6 and 7 files are about 55k and 73k tokens. The skill gives no guidance on reading them. I parsed them with node.
- Verdict cannot cite pre/post-raise CPA through tokens, since tokens cover the whole window only.
