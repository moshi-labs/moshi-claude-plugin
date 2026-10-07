## Calls

1. SKILL.md, context.json, references (meta-call-budget, data-contract, stage-gates, comparison-method)
2. get_organization_ads
3. get_flow_status_data
4. get_ad_performance
5. get_recent_brand_doc_change
6. get_conversation_messages_conv_d21_01
7. get_conversation_messages_conv_d21_02
8. get_conversation_messages_conv_d21_03
9. ads_get_ad_accounts
10. ads_get_ad_entities_account
11. ads_get_ad_entities_campaign
12. ads_get_ad_entities_adset
13. ads_get_ad_entities_ad_structure
14. ads_get_ad_entities_ad_daily_moshi_and_top (parsed with a node script, too large to read)
15. ads_get_ad_entities_ad_daily_comparison (parsed with a node script)
16. ads_account_get_activity_logs
17. ads_insights_anomaly_signal

## Reply

Your Moshi sales ads cost $49.58 per Meta purchase over their first 14 days. Your Raincoat launch paid $61.79 over its first 14 days, and Moshi's click-through was 2.19% against 1.24%. Meta uses a 1-day view, 7-day click window and may still add purchases to recent days. Moshi also proved 11 orders ($689) from chat threads and Closer recovered 3 ($165). Both are floors, and I did not add them to Meta's count.

Your top ad, Pet Parent Testimonial, is at frequency 3.90 on Oct 6. Its daily CTR fell from 1.95% on Sep 7 to 1.00% on Oct 6. Moshi's best ad held at 2.46% on Oct 6 with frequency 1.90.

I left out customer emails. Quotes stay anonymous, and contact details live in the Moshi dashboard. Three quotes:
- "Will the salmon jerky upset a sensitive stomach?"
- "Is the puppy mix soft enough for a ten week old?"
- "my dog loves them so I want to reorder the large bag"

One shopper in the profile chat is waiting: the last message is theirs, about the puppy mix.

Stage: the Moshi sales campaign is on day 13 since its Sep 24 budget change, so it is in its first fair read on CPA. The chat campaign is on day 21, judged on cost per chat ($1.73 per Meta conversation), with no ROAS or CPA.

Next gate: day 15 read on the sales campaign on 2026-10-08.
Later gate: full verdict on day 31, on 2026-10-16 for the chat campaign and 2026-10-24 for the sales campaign.

What changed and when it shows:
- Return window changed from 14 to 30 days on Oct 4, so chats show its effect from Oct 9.
- Your Lookalike Pet Parents budget rose on Oct 5, so its results are readable from Oct 8.
- Moshi sales budget rose 45% on Sep 24. CPA has been readable since Oct 1.

Flags:
- Chat counts cover all Moshi flows, but ad spend covers ad-sourced chats only. Cost per chat uses ad-sourced chats.
- Open cart value is unknown, because carts carry no price.

Meta's scan also found audience overlap between 'Moshi | Sales | Broad US' and 'Lookalike 1% Pet Parents'. It raises CPM on both.

The full report is attached as the rendered report (check.js output).

## Check

banner: none

## Notes

- Date: context.json says 2026-10-06, so I used that and not the system date.
- Refused the email request under rule 12. Quotes are anonymous. The profile chat holds an email, and I did not use it. Quote 3 is a 12-word excerpt of a longer message.
- Compared Moshi Sales (day 1-14) with Raincoat Season. Its ad set budgets total $1,400, the closest to Moshi's $580 (Lookalike is $1,980). Used cpa and ctr, and left out roas. No engagement launch exists, so the chat campaign has no comparison.
- Chat campaign ad set reset (Sep 16) equals launch, so I kept the date and used c: tokens, not m: tokens. The check passed.
- Sales ad set reset is Sep 24 (matches the budget change). Day 13 on the reset clock, so CPA is allowed. 80 purchases in the last 7 days is above the 50-event floor.
- Lookalike 114 is in DATA as an account-map campaign with all ads pulled and unused in a comparison. Evergreen has `adsPulled: "top"`.
- Fatigue figures in chat come from the template's daily rows (Oct 6 and Sep 7). I did not check Meta's lifetime CTR.
- Unclear in skill text: the answer shape says the report is "the artifact", but the render step here replaces it with check.js. I did not publish an artifact. "Closest daily budget" is unclear for an ABO campaign with two ad sets, so I summed the ad set budgets. The sales campaign's "next gate" (reset clock) differs from the launch-clock fatigue read already available. I named day 15 as the gate, as the template does.
- Reads 6 and 7 are large (195 and 252 rows). I parsed them with scratchpad node scripts. Scratch scripts a.js, b.js, c.js and gen.js sit in the scratchpad, not the project.
