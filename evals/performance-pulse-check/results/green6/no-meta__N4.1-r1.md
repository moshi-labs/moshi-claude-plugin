## Calls

1. `get_flow_status_data` with `{ "period": "last_30d" }`. Returned a window of 2026-10-02 to 2026-10-06, flag `cart_value_unknown`, and `transcriptsToRead`: `conv_nm_01`, `conv_nm_02`.
2. `get_ad_performance` with `{ "period": "last_30d" }`. Returned a window of 2026-10-02 to 2026-10-06 and flag `population_mismatch`.
3. `get_recent_brand_doc_change` with `{}`. Returned a Roast guide change at 2026-10-03T15:05:00Z.
4. `get_conversation_messages` with `{ "conversationId": "conv_nm_01" }`.
5. `get_conversation_messages` with `{ "conversationId": "conv_nm_02" }`.
6. `get_ad_account_tree`, read T1 account, with `{ "dateFrom": "2026-09-07", "dateTo": "2026-10-06", "maxAds": 0 }`. Flags: `no_synced_ads`, so `mode: "moshi_only"`. T2, T3, T4 and T5 were not run, as `meta-reads.md` says.

## Reply

Five days in, your Moshi ads are starting chats at $4.46 each (171 chats from ads on $763 of spend), and 12 chats have already reached a cart. I can't give you a ROAS or one purchase total. No Meta ad account is synced in Moshi, so Meta's purchases and ROAS are out of my view. Moshi's own orders below are a separate floor and never get added to Meta's.

- Moshi-proven orders: 5, worth $214, each matched to a chat thread. 2 of them were placed a day or more after the chat. That's a floor, not the full count.
- Closer recoveries: 1, worth $36.

Day 5 of the Moshi campaign (counted from Oct 2, the first day in Moshi's numbers): judging cost per chat and carts, not ROAS yet.

Next gate: first fair cost read on 2026-10-09 (day 8), covering cost per chat, carts and delayed orders.
ROAS: no read until your Meta ad account syncs into Moshi. After that, a Moshi campaign that optimizes for purchases gets its first fair ROAS read at day 8 at the earliest. One that optimizes for chats is scored on cost per chat, never ROAS.

Your roast guide got a new bitterness scale on Oct 3, so its effect on chats is readable from Oct 8.

- Chats: the 187 total includes chats started from your profile button. Cost per chat uses only the 171 that came from ads.
- Carts: open carts carry no price, so I can count carts but can't put a dollar value on them.
- Meta: no Meta ad account is synced in Moshi. Either none is connected or nothing has synced yet. So Meta's CTR, CPC, purchases and ROAS are missing here, not zero. Ads Manager still shows Meta's own purchase count. Keep it apart from the Moshi-proven orders, since one order can show up in both. Connect the account in Moshi by Oct 8 and the next read can include Meta's side.

Your full pulse-check report is attached.

## Check

banner: none

## Notes

- **Moshi tool arguments.** The skill names `get_flow_status_data` and `get_ad_performance` but not their arguments. Both take `period`. I chose `last_30d` to match the skill's 30-day report window, since the mode is unknown at step 1. Both tools returned 2026-10-02 to 2026-10-06 anyway.
- **Report window in `moshi_only`.** The contract calls `window` "the report window" but does not say which one in `moshi_only`. I used the Moshi tools' window, 2026-10-02 to 2026-10-06, because every number in the report covers those days. Using T1's empty 30-day window, which starts 2026-09-07, would have made the `firstLaunch` fallback Sep 7, or day 30, against Moshi data that starts Oct 2. The contract's `moshi_only` example also sets `window.start` equal to `firstLaunch`.
- **`firstLaunch`.** No tool returned a launch date. I used `window.start` (2026-10-02) and added the "Moshi launch date" line to `notMeasurableYet`. The reply's stage line also says what the count is from, because day 5 depends on that guess.
- **Conflict left visible, not resolved.** `get_ad_performance` reports $763.10 of Moshi spend on two Meta ad ids, yet T1 says `no_synced_ads`. I followed the skill (`moshi_only`) and kept spend labeled as Moshi-managed. I did not guess whether the account is unconnected or just not synced yet; the flag line names both.
- **"Total purchases."** I gave no single total. Meta's purchases are not available here. Moshi-proven orders and Closer recoveries each get their own line, as a floor, and are never added. I pointed the merchant to Ads Manager for Meta's own count, so nothing they asked about is hidden.
- **ROAS.** I gave no ROAS: rule 4 bars it in `moshi_only` and rule 5 bars it before day 8. The "later gate" line was a judgment call. A ROAS read would at best fall on the same day-8 gate, and only for a purchase-optimized campaign once Meta syncs. With no Meta data, the campaign's objective is unknown, so I gave both cases instead of guessing that it is a chat campaign.
- **Mood.** I set `mood` to `"reading"`. With no comparison possible, no Moshi campaign "leads" on any metric.
- **Flags.** All three tool flags are in `flags[]`. `no_synced_ads` goes there with source `meta`, because only `ads_over_max_ads` is excluded. The reply has one line per flag. `cart_value_unknown` is about cart value, not the cart count I cited; I included its line anyway because it explains why the report counts carts without dollars.
- **Answer shape.** Part 1 says "1–2 sentences" but also "name each [floor] in one line". I read that as 1–2 sentences followed by separate floor lines.
- **Tokens.** Only `{m:…}` tokens resolve in `moshi_only`. `{all:moshi.…}` needs a Moshi campaign, and `campaigns[]` is empty.
- **Brand-doc change.** The tool returned no "who", so neither the reply nor the report says who made the edit. It is `agent_knowledge`, readable Oct 8 by the template's 5-days-of-chats rule.
- **Threads.** `transcriptsToRead` listed only two ids, and I read both. Each thread ends with an agent message, so neither describes a shopper as waiting. Neither agent reply cites the new bitterness scale. I made no claim about it, and turned it into a merchant next step for after its readable date.
- **Render step.** Here the render step is `check.js`, not a published artifact. The reply's last line stands in for the artifact.
