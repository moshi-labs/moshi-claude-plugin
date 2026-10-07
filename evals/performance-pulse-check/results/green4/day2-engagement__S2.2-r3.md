## Calls

1. get_organization_ads.json
2. get_flow_status_data.json
3. get_ad_performance.json
4. get_conversation_messages_conv_d2_01.json
5. get_conversation_messages_conv_d2_02.json
6. ads_get_ad_accounts.json (read 1)
7. ads_get_ad_entities_account.json (read 2)
8. ads_get_ad_entities_campaign.json (read 3)
9. ads_get_ad_entities_adset.json (read 4)
10. ads_get_ad_entities_ad_structure.json (read 5)
11. ads_get_ad_entities_ad_daily_moshi_and_top.json (read 6)
12. ads_account_get_activity_logs.json (read 8)
13. ads_insights_anomaly_signal.json (read 9)

Read 7 skipped (no comparison launch). get_recent_brand_doc_change has no fixture, so not called.

## Reply

Your Sales campaign shows 3.40 ROAS in Meta for the last 30 days ($60,833.72 in purchase value on $17,892.27 spend, 981 purchases, 1d_view_7d_click window). Moshi has no ROAS to set beside it. Its campaign optimizes for chats, so it is scored on cost per chat: $2.08 across 85 chats so far. Keep your budget on Sales for now and do not move money on day 2.

Stage: day 2 of the Moshi campaign, judging clicks ($0.39 per click), cost per chat and carts, not ROAS.

Next gate: first read on cost per chat and carts on 2026-10-08 (day 4).
Later gate: day 8 on 2026-10-12, a read on cost per chat, carts and delayed orders. A chat campaign has no CPA or ROAS gate.

What changed: nothing since launch. Moshi switched the campaign on Oct 5.

Flags: the 91 chats include profile-button chats. Cost per chat from ads uses the 82 ad chats ($2.16). Meta may still add purchases to recent days on your Sales numbers.

Report: the rendered pulse check (data file day2-engagement__S2.2-r3.data.js).

## Check

banner: none

## Notes

- Quoted the merchant Sales ROAS in chat from read 3 (value / spend, last_30d, 1d_view_7d_click) because merchant `c:` tokens fail the data check. The campaign appears in `campaigns[]` only for its top ads.
- Did not compute any ROAS for Moshi. Told the merchant ROAS does not apply (engagement). Did not recommend a budget move; day 2 is below every gate.
- Comparisons left empty: the only merchant campaign is Sales and started 2026-02-10 (mature, different objective).
- `changes[]` empty: the only log entry is Moshi's launch activation on 10/5, which is the launch.
- Moshi ad set `last_sig_edit_ts` is Oct 5 13:00Z, before first delivery, so treated as launch. Set `lastLearningReset` to 2026-10-05 and `{m:}` tokens passed.
- `learning` left null. The template still shows a "Learning" stage label for days 1-3; that is a stage name, not a Meta status.
- Unclear in skill: no rule on whether `lastLearningReset` should be null or the launch date when the edit equals launch. Also unclear how to give a budget answer to "which gets budget" at day 2 (hard rules cover verdicts, not budget advice). Also the 30-day merchant daily rows sit outside the 2-day window; the template accepted them.
- Meta conversations (85) and Moshi chats from ads (82) differ. Named each source in the reply.
