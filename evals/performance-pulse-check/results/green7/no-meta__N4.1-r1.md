# no-meta · N4.1 · r1

## Calls

1. `get_flow_status_data` `{}`
2. `get_ad_performance` `{}`: the tool's own window, which came back as 2026-10-02 to 2026-10-06 and became the report window.
3. `get_recent_brand_doc_change` `{}`: the tool exists and returned one change.
4. `get_conversation_messages` `{ conversationId: "conv_nm_01" }`
5. `get_conversation_messages` `{ conversationId: "conv_nm_02" }`
6. `get_ad_account_tree` `{ dateFrom: "2026-09-07", dateTo: "2026-10-06", maxAds: 0 }`, T1 account. `dateFrom` is the earlier of `window.start` (2026-10-02) and 29 days before today (2026-09-07), which is inside the 91-day cap. No organization argument. It returned the `no_synced_ads` flag, so the run switched to `mode: "moshi_only"`.

Not called:
- T2 (Moshi ads), T3 (top ads), T4 (launches), T5 (launch) and T6 (overlap). meta-reads.md says to stop after T1 when it flags `no_synced_ads`.
- A third transcript. `transcriptsToRead` listed only two.
- Other Moshi tools such as `get_revenue_summary`, `get_meta_platform_metrics`, `get_open_carts` and `list_conversations`. They are outside the read plan (hard rule 14). No write tools were called.

## Reply

Your Moshi ads are starting chats at $4.46 each (Moshi's count of 171 chats from ads, on $763 of spend), and those chats have already left you 41 emails and phone numbers, 74 product views and 12 carts. On ROAS, I can't give you one: no Meta ad account is synced in Moshi, so I can't see Meta's purchases or purchase value, and I won't build a ROAS out of Moshi's own order count.

- Moshi-proven orders: 5, worth $214, each matched to a chat thread (2 came a day or more after the chat). A floor, not your total.
- Closer recoveries: 1 order, worth $36. Also a floor, on its own line, never added to the 5.
- Meta's purchase count lives in Ads Manager, under each ad set's attribution window. It's a separate number from both lines above, so I won't add them into one total.

Day 5 of your Moshi ads: judging cost per chat, contacts and first carts, not ROAS. (I'm counting from Oct 2, the first day of the report window, because no Moshi tool gave me your launch date.)

Next gate: day 8, the first fair cost read, on 2026-10-09.
ROAS: not before that same day-8 gate, and only once your Meta ad account syncs into Moshi and only if the campaign optimizes for purchases. If it optimizes for chats, ROAS doesn't apply and cost per chat is the number that counts.

What changed: your roast guide got a bitterness scale on Oct 3, so its effect on chats is readable from Oct 8. Nice timing, since "Which roast is least bitter?" is your shoppers' top opener.

Flags:
- No Meta ad account is synced in Moshi, or nothing has synced yet. That's missing data, not zero sales.
- Your 187 chats include ones started from your profile button. Cost per chat uses only the 171 that came from ads.
- Carts carry no price, so I can count your 12 carts but not what's in them.

The full pulse check is in the report.

## Check

banner: none

## Notes

- **moshi_only setup.** T1 still returned `organization.name`, so I used it for `merchant.name`. Its `account.currency` and `account.timezone` were null, so currency and timezone come from the Moshi tools (USD, America/Chicago), as the moshi_only rule says. `campaigns` is empty, `primaryCampaignId`, `metaSyncedAt` and `metaWindow` are null, and the two required moshi_only strings are in `notMeasurableYet`.
- **Launch date.** No tool returned one, so `firstLaunch` is `window.start` (2026-10-02), and `notMeasurableYet` says so. "Day 5" and the 2026-10-09 gate both depend on that fallback. If Moshi actually launched before the window, both are wrong.
- **Objective unknown.** With no Meta data, the objective is unknown, so the template labels day 8 a "first fair cost read". I didn't promise a ROAS gate. I named the conditions instead (Meta synced, and a purchase optimization goal).
- **"Total purchases".** I gave proven orders and Closer recoveries as separate lines, pointed to Ads Manager for Meta's count, and summed nothing. `get_flow_status_data` labels the 5 thread-proven orders `scorecard.purchases`. A run could misreport that as total or Meta purchases. I also can't tell whether the Closer recovery is already one of the 5.
- **mood.** I set `mood: "reading"` because with no primary campaign and no comparison, nothing can "lead".
- **Skill ambiguity.** The answer shape assumes a primary campaign and a later gate, and moshi_only has neither. I answered about Moshi's ads overall and used the ROAS-conditions line in place of a later gate.
- **Quote 1.** It is word for word the top ice breaker, so it was probably a tap rather than the shopper's own words. I used it anyway because only two threads were listed. `contactsCaptured` counts emails plus phones, so I wrote "41 emails and phone numbers", not "41 shoppers".
- **Fixture oddities.** `productViews` (74) equals the top ice breaker's conversation count (74). Both threads have identical timestamps (10:00Z and 10:07Z on Oct 6). The Moshi fixtures are marked `_shape: modelled-from-description`.
- **Next-step dates.** Step 1, connecting Meta, is due 2026-10-08, so the roughly 6-hourly sync can land before the day-8 gate. Step 3 is due on the brand-doc change's readable date (2026-10-03T15:05Z is Oct 3 in Chicago, `agent_knowledge`, readable Oct 8 per the template).
