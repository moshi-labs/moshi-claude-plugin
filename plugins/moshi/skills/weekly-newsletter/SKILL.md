---
name: weekly-newsletter
description: Write a Moshi merchant's weekly newsletter as an artifact from one consistent read — the week at a glance with changes from the prior period, top conversations, Closer wins and missed leads, the next ad to launch, and what's new from Moshi. Read-only.
when_to_use: Use when a Moshi merchant, or a scheduled Cowork run, asks for a weekly newsletter, a weekly recap or digest, or how the week went. With no dates it covers the last completed Monday-to-Sunday week in UTC, so it runs unattended. Requires the Moshi MCP server.
---

Write the weekly Moshi newsletter for the organization this session is authenticated as. Cover the window the merchant named. If they named none, which is always the case on a scheduled run, cover the last completed Monday-to-Sunday week in UTC: `periodEnd` is the latest Sunday before today (yesterday when today is Monday, 7 days back when today is Sunday), and `periodStart` is the Monday 6 days before it. Both days are included. The reader is the merchant: a busy owner who wants to know how the week went, which shoppers are worth a message today, and what to do next.

## Pull the data first

1. Call `get_weekly_newsletter_data`. For a window the merchant named, pass `periodStart` and `periodEnd` as YYYY-MM-DD. For the default week, pass neither: the tool applies the rule above, and `window` in its result names the dates. That one call returns the scorecard and its comparison with the prior period, the funnel, proven closes, missed Closer opportunities, the next ads worth launching, Moshi's new releases, and the flags, all read at one moment. Work only from what it returns. If it returns an error, stop and report that error. Never write a partial newsletter.
2. Then call `get_conversation_messages` on 2 or 3 of `transcriptsToRead.candidates[].conversationId`, in the order listed. Each candidate's `reason` (`purchase`, `closer_queue` or `furthest_stage`) says what happened in that thread — use it when you write section 2. Transcripts are not bundled because they carry real customer PII, so read only the threads you will quote.
3. Do not call `get_meta_platform_metrics`, `create_ad`, or any Closer send. This newsletter reports; it never acts.

## Hard rules — these are correctness, not style

1. **Never invent a number.** If a section needs data the tool does not return, leave it out and list it under "not measurable yet". Do not estimate, interpolate, or carry a figure over from an example or an earlier edition.
2. **`threadProvenOrders` is a floor, not a total.** It counts orders Moshi can tie to a named conversation and an order id. The ad platform reports its own, larger modelled purchase count, and **it is not in this data**. Never add the two together, and never present thread-proven orders as the full conversion count.
3. **Render the window as `window.periodStart` → `window.periodEnd`.** Both days count. Never render an exclusive bound such as `until`, which is the day after the window ends. The tool withholds it on purpose; do not reintroduce it from anywhere else.
4. **Heat decays on a 7-day half-life** and is derived at read time. Report the current warm-or-hotter count; never describe a change between two reads as engagement moving.
5. **Surface every entry in `flags`** where the reader can see it. Each one means a number on the page may be wrong.
6. **Anonymize all verbatims.** Transcripts contain real customer PII: strip names, handles, emails and phone numbers. Quote 15 words or fewer.
7. **When a `truncated` field is true**, say so and give how many rows you saw of `total`.
8. **Take changes only from `scorecard.deltas`, and only where `comparable` is true.** Never compute a delta yourself. `pct` is a percentage (25 means up 25%) and is null when the prior value was 0; then give `abs` alone.
9. **Label `nextAds` figures with the shortlist's own window**, `nextAds.window.dateStart` → `nextAds.window.dateStop`. Never present that spend, CPA or ROAS as this period's numbers.
10. **Stay read-only.** Never launch an ad, send a nudge or call a write tool. Every call to action sends the merchant to act.
11. **Name the merchant only from `organization.name`.** Never guess a name or take one from a transcript.
12. **Link any dashboard destination with `organization.dashboardUrl`** (the Closer CTA keeps `organization.closerUrl`). Never write `app.moshi.ai` or any other hardcoded Moshi dashboard host.
13. **Badge "Closed with Closer" only where a row's `closedWithCloser` is true.** Never add `closes.closedWithCloserCount` to `missed.nudgedThenPurchased`: the first counts this period's orders that followed a Closer nudge, and the second counts conversations nudged this period that later placed an order. They answer different questions.
14. **Money has a currency.** Take it from `closes.rows[].currency` for purchase values and `nextAds.accountCurrency` for ad figures, where present. Never assume USD, and never print a `$` sign unless the currency is USD.

## Voice

Write to the merchant the way a sharp colleague would: plain words, short sentences, warm and direct. Lead each section with what happened, then why it matters. State each caveat once, in a clause, and keep going. Say "your shoppers" and "your best ad", not "the data suggests".

## Structure

**Header**: `organization.name` × Moshi, the window, and a summary of 2 or 3 sentences.

**1. At a glance**: four tiles, each with its change from `scorecard.deltas` where `comparable` is true.
- Spend. When `scorecard.current.hasMetaAdData` is false, this tile says "No Moshi ads ran", and no cost ratio built on this period's Moshi spend (such as cost per conversation or per order) appears anywhere in sections 1 to 3. Section 4's CPA and ROAS are exempt: they come from `nextAds`, on the shortlist's own window (rule 9), not this period's spend. The DM conversations tile and the Lead closers section still render. If `flags` has `orphan_spend_rows`, say instead that spend could not be matched to an ad, and never say no ads ran.
- DM conversations: `scorecard.current.conversations`.
- Warm-or-hotter: `scorecard.current.warmOrHotter`, the current value only (rule 4).
- Thread-proven orders with their revenue: `scorecard.current.threadProvenOrders` and `scorecard.current.threadProvenRevenue`, labelled as a floor. `scorecard.prior` carries the same two keys, for the delta.

When `scorecard.prior` is null, show no changes and label the tiles "first period with data".

**2. Top conversations**: the 2 or 3 threads you read. For each, an anonymized quote of 15 words or fewer and how it ended: bought (with the order value from `closes.rows`), in the Closer queue, or reached checkout.

**3. Lead closers**
- Proven closes, from `closes.rows`: order value, channel, and the flow or ad (`flowName`, or `adName` when present), with the "Closed with Closer" badge where `closedWithCloser` is true.
- Missed opportunities: `missed.stillReachable.count` leads worth `missed.stillReachable.cartValue` can still get a reply. Next to that, put a call to action that links to `organization.closerUrl` and names `missed.liveQueue.total`, the number of leads waiting in Closer right now.
- Then `missed.windowClosed.count` leads worth `missed.windowClosed.cartValue` whose reply window has closed.
- A cart value is a floor ("at least") when its `cartValueUnknownCount` is above 0.

**4. Next ad to launch**: 1 to 3 ads from `nextAds.ads`, each with CPA and ROAS labelled with the shortlist's own window, `nextAds.window.dateStart` → `nextAds.window.dateStop` (rule 9), and the call to action "run Scale what works" (`/scale_what_works`, or the `scale-what-works` skill). If `nextAds` is null or `nextAds.ads` is empty, leave the section out and say why in one line.

**5. New from Moshi**: only from `releases`. For each entry, its title, its summary in one line, and its link. Leave the section out when `releases` is null or empty.

**6. What's next**: 2 or 3 moves, each naming the figure behind it.

**Footer**: every entry in `flags`, then a "not measurable yet" list: platform-attributed purchases and ROAS · lifetime reach · per-ad spend and efficiency · heat trend across weeks · carts that never became Closer-eligible (the funnel shows them; the Closer counts do not).

## Quiet weeks

When `edition` is `"quiet_week"`, nothing measurable happened in the window. Render only the header, a one-line glance, New from Moshi when `releases` has entries, and the footer. Do not pad it.

## Edge cases

- `nextAds` is null (the `ad_shortlist_unavailable` flag): leave out section 4 and keep the flag in the footer.
- `no_connected_ad_account` flag with an empty `nextAds.ads`: leave out section 4 and give that reason (`nextAds.notes.note`).
- `releases` is null (the `releases_unavailable` flag): leave out section 5 and keep the flag in the footer. An empty `releases` list: leave out section 5 without comment.
- `partial_period` flag: the window reaches today, so say "so far", and every `scorecard.deltas` entry is `comparable: false` — show no week-over-week changes; comparisons come once the week is complete.
- `closer_history_incomplete` flag: the missed counts are a floor.
- `purchases_missing_amount` flag: revenue is a floor.
- `duplicate_order_ids` flag: show the rows as they are; do not dedupe them.
- `purchase_count_mismatch` flag: a purchase landed between reads. Show both numbers and do not reconcile them.
- `live_queue_truncated` flag: `missed.liveQueue.total` is exact, straight from `/recover`'s own count, and so is `missed.liveQueue.returned`, the number of rows the tool actually read. Only `missed.liveQueue.cartValue` is a floor — it covers those returned rows only.
- `closer_queue_truncated` flag: `missed.stillReachable.count` and `missed.stillReachable.cartValue` are floors — say so.

Design it cleanly: stat tiles, restrained color, readable in light and dark, and short enough to read in two minutes. Produce it as an artifact.
