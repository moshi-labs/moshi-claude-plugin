# day5-sales-conversations, S5.1, run 1

## Calls

1. `get_flow_status_data` with `{}` (no arguments; the signed-in org's Moshi data)
2. `get_ad_performance` with `{}`
3. `get_conversation_messages` with `{ "conversationId": "conv_d5_01" }`
4. `get_conversation_messages` with `{ "conversationId": "conv_d5_02" }`
5. `get_ad_account_tree` (T1 account) with `{ "dateFrom": "2026-09-07", "dateTo": "2026-10-06", "maxAds": 0 }`
6. `get_ad_account_tree` (T2 Moshi ads) with `{ "dateFrom": "2026-09-07", "dateTo": "2026-10-06", "granularity": "daily", "owner": "moshi", "maxAds": 500 }`
7. `get_ad_account_tree` (T3 top ads) with `{ "dateFrom": "2026-09-07", "dateTo": "2026-10-06", "granularity": "daily", "owner": "merchant", "maxAds": 3 }`
8. `get_ad_account_tree` (T4 launches) with `{ "dateFrom": "2026-07-09", "dateTo": "2026-10-06", "owner": "merchant", "maxAds": 0 }`
9. `get_ad_account_tree` (T5 launch "Launch | Summer Pack Sale", 1202660000000139) with `{ "adsetIds": ["1202660000000138"], "granularity": "daily", "dateFrom": "2026-08-07", "dateTo": "2026-08-20" }`

I did not call `get_recent_brand_doc_change`, because it is not on this server's tool list (step 1 says "if it exists").

## Reply

Good news first: Moshi is starting conversations at $2.76 each, against $6.38 for your Summer Pack Sale launch over its own first 5 days (Aug 7–11). That's the number to judge it by, because this campaign has no ROAS or CPA at any stage: it's a Sales campaign on the label, but its ad set optimizes for conversations, so Meta is out finding chatters, not buyers.

- Moshi-proven orders: 2, worth $148, matched to chat threads. That's a floor, kept separate from Meta's count, and 1 of them came a day or more after the chat.
- Meta's purchases: 0, with $0 in value, under the ad set's 7-day click, 1-day view window. Meta may still add purchases to recent days.

Day 5 of the Moshi campaign: judging cost per chat and carts. So far, 8 chats have reached a cart.

Next gate: day 8 read on cost per chat, carts and delayed orders on 2026-10-09.
No ROAS or CPA gate comes after it: those apply only to an ad set that optimizes for purchases.

Heads-up: Moshi's 429 chats include chats that started from your profile button, not only from your ads. The report's $2.78 cost per ad chat counts only the 420 chats from ads.

Your full pulse check is in the report: where the campaign stands, the same-age comparison with your Summer Pack launch, the chat funnel, and what your shoppers are asking.

## Check

banner: none

## Notes

Judgment calls:

- **Objective.** Both campaigns are `OUTCOME_SALES`, and both ad sets optimize for `CONVERSATIONS`, so both are `engagement` (data-contract mapping). The reply says ROAS and CPA are "not applicable", not "not yet", and gives cost per conversation instead. No `roas` or `cpa` token or comparison appears anywhere.
- **Meta purchases shown.** The merchant asked about ROAS and CPA, and Ads Manager shows the campaign's purchases. Hard rule 2 (never hide a number) and hard rule 4 (no ROAS or CPA) pull against each other here. I showed Meta's purchase count and value (0, $0) with the attribution window (rule 8) and the backfill line (rule 9). I gave no verdict on them (rule 5) and computed no ratio from them.
- **Report window** is 2026-10-02 to 2026-10-06. That matches the Moshi tools' window and the first Moshi launch, and `partial: true` because it ends today. `asOf` and `metaSyncedAt` both use the run time, 2026-10-06T18:40:00Z, because T1 returns no sync timestamp.
- **Age and reset.** The Moshi campaign starts 2026-10-02 and first delivers that day, so today is day 5 ("Early read"). The next gate is day 8, 2026-10-09. The Moshi ad set's `lastSignificantEditAt` (2026-10-02T15:00Z, which is Oct 2 in America/Denver) falls on launch day, so it is the launch, not a reset. `changes[]` is empty. The merchant ad set's edit is also on its own day 1 (Aug 7).
- **Launch choice.** "Launch | Summer Pack Sale" started 2026-08-07, 60 days before today. It is not retargeting (ad set "Pack Sale Broad") and has the same objective, so it meets recipe parts 1–3, even though it is still the merchant's main always-on campaign. I compared days 1–5 (Aug 7–11) against Moshi's days 1–5 (Oct 2–6). Moshi's side includes today's partial day, which affects rates only.
- **Comparison metrics.** Moshi won all three metrics allowed at day 5: cost per conversation $2.76 vs $6.38, CTR 2.42% vs 1.17%, CPC $0.51 vs $1.07. I picked cost per conversation, which is closest to the question, and CTR. The "show the other one, even when Moshi loses" case did not arise. The resource note correctly says the launch has 3.6x Moshi's budget and 8 ads against Moshi's 2. `mood` is `"delight"` because Moshi leads on a metric its stage allows.
- **Merchant campaign `adsPulled: "all"`.** T5 read this campaign, so I set `adsPulled: "all"` and merged T5's Aug 7–20 rows (8 ads) with T3's Sep 7–Oct 6 rows (top 3 ads). No dates overlapped. Its rows inside the report window cover only those top 3 ads, so I never cite it with `c:` tokens, only `cmp:` tokens.
- **Flags.** The `ads_over_max_ads` flags on T1, T3 and T4 are expected from my own `maxAds`, so I left them out, as meta-reads.md says. T2, T5 and `get_ad_performance` had no flags. `population_mismatch` (Moshi) is in `flags[]` and gets one plain-words line in the reply, because I cite chats and carts.
- **Account issue.** I added one `info` item (`kind: "other"`): both campaigns use the Sales objective but optimize for conversations. It comes straight from T1's structure and speaks to the merchant's question. It is not an anomaly-scan finding.
- **`notMeasurableYet`.** It has two items. Fatigue does not open until day 15. Moshi-side changes (`agent_knowledge`) cannot be listed because `get_recent_brand_doc_change` is not on this server, so I did not claim "no changes".
- **Next steps.**
  - The day-8 read.
  - A "hold big edits" step, so a learning restart doesn't push the read back. It is worded generically and never names an edit type.
  - Naming the best ad, Pack Fit Question ($2.41 per conversation against $3.23 for Boot Break-in Q), with the `scale-what-works` skill.

Unclear parts of the skill:

- The answer shape's stage example ends "not ROAS yet", which contradicts "not applicable, not not yet" for an engagement campaign. I dropped "yet" and said ROAS and CPA never apply to this campaign.
- "Name the later gate on its own line after it" assumes the merchant asked about a gate that exists. An engagement campaign has no ROAS or CPA gate, so that line says so instead of naming one.
- "Before day 31, name the skill and the ad without the word 'scale'" collides with the skill's own name, `scale-what-works`. I used the name verbatim and no other form of "scale".
- The cost-per-conversation and cost-per-chat definitions differ: Meta counts 423 conversations, Moshi counts 420 chats from ads, giving $2.76 vs $2.78. The comparison and headline use Meta's figure, and the reply names which one each number is.
