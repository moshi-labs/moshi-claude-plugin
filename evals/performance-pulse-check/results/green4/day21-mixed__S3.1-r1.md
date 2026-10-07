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
Moshi did not break anything. The Meta activity log shows no Moshi action since launch. Your Moshi Sales CPA rose after two events that did happen.

Moshi Sales CPA is $48.52 for Sep 16 to Oct 6 (Meta, 1d_view_7d_click attribution). It was $38.49 on Sep 16 to 23 and $54.75 on Sep 24 to Oct 6. The last 7 days run at $46.75 on 80 purchases, so volume is enough to read. Meta may still add purchases to recent days.

Two events match the timing:
- On Sep 24 your store owner raised the Moshi Sales budget from $400 to $580 a day in Ads Manager. That restarted learning. The first three days cost $98 to $148 per purchase.
- Meta flags audience overlap between Moshi | Sales | Broad US and Lookalike 1% Pet Parents. Meta says CPM is up about 18% on both ad sets over the last 7 days.

Over the same first 14 days of life, Moshi Sales has a CPA of $49.58 and your Raincoat launch has $61.79. Raincoat has 2.4x the budget.

Your top ad shows fatigue. Pet Parent Testimonial has frequency 3.9, and its CTR fell from 1.65% on Sep 18 to 1.00% on Oct 6. Moshi Sales CTR holds at 2.20% for the window.

Moshi-proven orders (a floor): 11 orders, $689.20, and 4 of them came a day or more after the chat. Closer recoveries: 3 orders, $165. Meta's 214 purchases are a separate count. I do not add them.

Stage: day 13 of the Moshi Sales clock (reset Sep 24), so this is a first CPA and ROAS read. The chat campaign is on day 21 and has no CPA. It costs $1.73 per Meta conversation.

Next gate: day 15 fatigue and frequency read on 2026-10-08.
Later gate: full verdict on 2026-10-24 for Moshi Sales, and on 2026-10-16 for the chat campaign.

What changed and when it shows:
- Budget raised Sep 24: CPA is readable now, since Oct 1.
- Return window changed from 14 to 30 days on Oct 4: chat effects are readable from Oct 9.
- Lookalike budget raised from $1800 to $1980 on Oct 5: Meta results are readable from Oct 8.

One shopper on a profile chat asked about the puppy mix and still waits for an answer. Reply from the Moshi dashboard.

The full report is rendered from DATA in day21-mixed__S3.1-r1.data.js.

## Check
banner: none

## Notes
- Mood is "reading": the merchant asked about a CPA rise, and Moshi leads Raincoat on CPA but the CPA did rise.
- Comparison pair: Raincoat (closest budget to Moshi's $580; ABO, two ad sets of $700). Lookalike (CBO $1980, 10 ads) is a worse resource match and not in comparisons. Two comparisons, cpa then cpc, both on Raincoat, day 14 (launch clock, capped at 14).
- Moshi Sales ad set reset Sep 24 from last_sig_edit_ts, matching the activity log. Chat ad set reset equals launch date (Sep 16), kept in DATA and the template treated it as launch.
- Next gate is the nearest across Moshi campaigns by each one's own clock: Sales day 15 on Oct 8. The skill's "first CPA read" wording does not fit here because the CPA gate (day 8, Oct 1) already passed. I used "fatigue and frequency read", matching the template.
- Verdict and body use only {c:} tokens, since {m:} clock tokens fail with a reset. No typed numbers in tokenized prose.
- Pre/post CPA splits ($38.49, $54.75, $46.75) come from my sums of the daily rows, not from a tool field. Meta's own whole-window CPA is $48.52.
- No flag lines in the reply: no cited number touches population_mismatch or cart_value_unknown. Both are still in flags[].
- Evergreen CPA not cited: mature campaign, and ad-level rows (top 3 ads, about $100 CPA) conflict with the campaign row ($23.85), so I left it out.
- Evergreen top-ad rows are trimmed to the window (Sep 16 onward) so the fatigue chart aligns with Moshi's day 21. The template labels it "day 21 of ad life", which is wrong for a mature ad. The skill does not say how to handle a mature top ad in the fatigue chart.
- The template shows "Cost per ad chat $23.57" using all Moshi spend (sales ads included) over ad chats. It sits under the population_mismatch flag. I did not cite it.
- Unclear in the skill: whether comparisons should prefer the closest campaign budget when one candidate is ABO and one is CBO. I used total campaign budget.
- Quoted the "ten week old" shopper question without any contact detail. The profile chat with the email address was not quoted from.
