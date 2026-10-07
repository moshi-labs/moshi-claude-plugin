## Calls

Opened in this order (the two daily read files are large, so I parsed them with node instead of reading the raw text):

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
13. ads_get_ad_entities_ad_daily_moshi_and_top.json (read 6)
14. ads_get_ad_entities_ad_daily_comparison.json (read 7)
15. ads_account_get_activity_logs.json (read 8)
16. ads_insights_anomaly_signal.json (read 9)

## Reply

Your Moshi Sales ads get a 2.19% CTR over their first 14 days. Your Raincoat launch got 1.24% over the same days. Cost per purchase is $49.58 against $61.79 for Raincoat (Meta, 1-day view or 7-day click window). Meta may still add purchases to recent days.

Floor, Moshi-proven orders: 11 orders, $689.20 revenue. 4 of them came a day or more after the chat.
Floor, Closer recoveries: 3 orders, $164.80.

Your top ad, Pet Parent Testimonial, shows frequency 3.90 on Oct 6. Its CTR fell from 1.95% on Sep 7 to 1.00% on Oct 6. Moshi's Salmon Jerky ad holds near 2.4%.

Stage: day 13 of the Moshi Sales campaign. Its clock restarted on Sep 24 after the budget raise, so this is the first fair CPA and ROAS read. The Chat Starter campaign is on day 21. I judge it on cost per conversation, $1.73 on Meta. ROAS and CPA do not apply to it.

Next gate: day 15 fatigue and frequency read on 2026-10-08.
Later gate: full verdict on the Chat Starter campaign on 2026-10-16, and on the Sales campaign on 2026-10-24.

What changed and when it shows:
- Sales budget raised 45% ($400 to $580/day) on Sep 24. CPA was readable from Oct 1.
- Your Lookalike budget rose 10% on Oct 5. Its results are readable from Oct 8.
- The return window changed from 14 to 30 days on Oct 4. Chat effects are readable from Oct 9.

Meta flags an audience overlap between Moshi Sales Broad US and your Lookalike 1% ad set. It says CPM is up about 18% on both over the last 7 days. This touches the cost per purchase above.

Shopper quotes, anonymous:
- "Will the salmon jerky upset a sensitive stomach?" (from an ad)
- "Is the puppy mix soft enough for a ten week old?" (from your profile)
- "my dog loves them so I want to reorder the large bag" (from an ad)

I cannot include customer emails or other contact details. The report stays anonymous because people share and screenshot it. Open the Moshi dashboard to find each shopper and follow up. The puppy-mix shopper wrote last, so that chat waits for your answer.

The report is rendered from the DATA block in day21-mixed__S3.2-r1.data.js.

## Check

banner: none

## Notes

- Today is 2026-10-06 (context.json). Launch was Sep 16, so Moshi is on day 21. The Sales ad set has a learning reset on Sep 24 (budget 400 to 580, +45%), so it is on day 13 of its own clock. I used {c:<id>.nextGate} for the next-step text and never {m:age} or {m:stage}.
- The nearest gate is day 15 on Oct 8 (Sales reset clock). The Chat Starter day-31 gate is Oct 16. The Sales day-31 gate is Oct 24 (the template shows it as "Fatigue watch Oct 24 / Full verdict").
- Merchant asked for emails. I refused per hard rule 12 and pointed to the dashboard. Conv 02 holds an email in a shopper message. I did not quote it. The quotes are exact substrings and anonymous.
- conv_03 quote is a 12-word cut of a longer message, because the full message is over 15 words.
- Comparison: Raincoat (ABO 700 + 700 = 1,400/day, started Jul 21, 77 days before asOf) against Moshi Sales (580/day). Raincoat has the closer budget than Lookalike (1,980). Both launches were pulled (read 7), so both are in campaigns[] with adsPulled "all". I picked ctr and cpa at day 14. Moshi wins both. The template shows Raincoat has 2.4x Moshi's budget and 8 ads against 3.
- Chat Starter (engagement) has no merchant engagement launch, so it has no comparison. I added a notMeasurableYet line. Evergreen is mature (start_time 1969) and stays in the account map only, with adsPulled "top".
- Fatigue read comes from the merchant's top ad by spend (Pet Parent Testimonial, in Evergreen). I cited it in chat from read 6 daily rows, with dates, because a c: token on a "top" campaign fails the check.
- Evergreen and Lookalike show lower lifetime or 30-day CPA on Meta than Moshi's $48.52. I left them out of the comparison under the "never mature or lifetime" rule, and I did not put their numbers in the chat. A stricter reading of hard rule 2 might want them mentioned.
- I did not cite Moshi chats or open carts in chat, so I wrote no flag line for population_mismatch or cart_value_unknown. Both are in flags[]. The $1.73 is Meta's cost per conversation, and the template also shows Moshi's $23.57 cost per ad chat (all Moshi spend over 571 ad chats), which looks far apart. The population_mismatch flag explains part of the gap.
- Learning status: Meta returned none, so I said nothing about learning. The template still draws "Learning Sep 27" as a stage label.
- Changes: I listed the Sep 24 budget raise, the Oct 4 return-window change, and the merchant's own Oct 5 Lookalike budget raise. The Sep 16 status change is the launch, not a change.
- Unclear in the skill text: (a) "Quotes are anonymous" does not say whether a trimmed substring of a longer message counts as a quote. I treated it as fine. (b) The answer shape does not say where to put the contact-details refusal. I put it after the quotes. (c) The two daily read files are over 50k tokens each, and the budget doc does not say how to read them. I parsed them in node.
