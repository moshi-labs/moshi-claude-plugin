---
name: weekly-newsletter
description: Write a Moshi merchant's weekly newsletter as an artifact from one batch of reads — the week at a glance with changes from the prior period, top conversations, Closer wins and missed leads, and the next ad to launch. Read-only.
when_to_use: Use when a Moshi merchant, or a scheduled Cowork run, asks for a weekly newsletter, a weekly recap or digest, or how the week went. With no dates it covers the last completed Monday-to-Sunday week in UTC, so it runs unattended. Requires the Moshi MCP server.
---

Write the weekly Moshi newsletter for the organization this session is authenticated as. Cover the window the merchant named. If they named none, which is always the case on a scheduled run, cover the last completed Monday-to-Sunday week in UTC: `periodEnd` is the latest Sunday before today (yesterday when today is Monday, 7 days back when today is Sunday), and `periodStart` is the Monday 6 days before it. Both days are included. The **prior period** is the same number of days ending the day before `periodStart` (for a week, the Monday-to-Sunday before it). The reader is the merchant: a busy owner who wants to know how the week went, which shoppers are worth a message today, and what to do next.

## Pull the data first

1. Make these five reads together, in one turn, so they describe one moment. Heat is derived at read time and decays, so reads made minutes apart do not belong on the same page.
   - `get_ad_performance` with `periodStart` and `periodEnd` for the window: the **current** read.
   - `get_ad_performance` with `periodStart` and `periodEnd` for the prior period: the **prior** read.
   - `get_closer_activity` with the window's `periodStart` and `periodEnd`: nudges sent, nudged-then-purchased, missed carts, and `organization`.
   - `get_closer_queue` with `limit: 10`: `total` is the number of leads waiting in Closer right now.
   - `get_ad_shortlist` with `suggestLimit: 3`: the next ads worth launching.

   If either `get_ad_performance` read or `get_closer_activity` returns an error, stop and report that error. Never write a partial newsletter. If `get_closer_queue` fails, leave out the live-queue count and add a footer line saying it could not be read. If `get_ad_shortlist` fails, leave out section 4 and say so in the footer.
2. Pick 2 or 3 threads to quote, in this order, skipping duplicates: conversations that bought in the window, then `get_closer_activity`'s `stillReachable.topLeads`, then conversations that reached checkout or cart. To find buyers and checkouts, call `get_leads` with the smallest `period` that covers the window (`last_7d` when `periodStart` is at most 7 days ago, else `last_30d`, else `last_90d`, else `since_launch`) and take rows whose `furthestStageName` is `purchase`, then `checkout`, then `cart`. `get_leads` cannot be cut to the exact window, so for each pick call `get_conversation_events` and keep it only when its purchase, checkout or cart event falls inside the window.
3. Call `get_conversation_messages` on the 2 or 3 threads you kept. Transcripts carry real customer PII, so read only the threads you will quote.
4. Do not call `get_meta_platform_metrics`, `create_ad`, `draft_closer_nudge`, `send_closer_nudge` or any other write tool. This newsletter reports; it never acts.

## Hard rules — these are correctness, not style

1. **Never invent a number.** If a section needs data these reads do not return, leave it out and list it under "not measurable yet". Do not estimate, interpolate, or carry a figure over from an example or an earlier edition.
2. **`threadProvenPurchases` is a floor, not a total.** It counts orders Moshi can tie to a named conversation and an order id, and `threadProvenRevenue` sums those same orders. The ad platform reports its own, larger modelled purchase count, and **it is not in this data**. Never add the two together, and never present thread-proven orders as the full conversion count.
3. **Render the window as `window.since` → `window.displayUntil`** from the current read. Both days count. Never render `window.until`: it is the exclusive bound, the day after the window ends.
4. **Heat decays on a 7-day half-life** and is derived at read time. Warm-or-hotter is `heat.warm + heat.hot + heat.burning` from the current read. Report the current value only; never compare it with the prior read, and never describe a change between two reads as engagement moving.
5. **Surface every entry in every read's `flags`** where the reader can see it, once each. Each one means a number on the page may be wrong.
6. **Anonymize all verbatims.** Transcripts contain real customer PII: strip names, handles, emails and phone numbers. Quote 15 words or fewer. Never print a `displayName` or `username` from `get_closer_queue` or `get_leads`.
7. **When a `truncated` field is true**, say so and give how many rows you saw of `total`.
8. **Changes come only from the current and prior `get_ad_performance` reads, and follow these rules exactly.**
   - Compare only these figures: spend, DM conversations (`conversations.leadPopulation`), thread-proven orders and thread-proven revenue. Never heat.
   - `abs` is current minus prior. `pct` is `abs / prior × 100`, rounded to a whole number; when the prior value is 0, give `abs` alone.
   - Compare spend only when both reads have `hasMetaAdData` true.
   - Show no change at all when the current read has the `partial_period` flag; say comparisons come once the period is complete.
   - The prior period has no data when its read has zero spend, an empty `funnel`, all four heat buckets at 0, zero `threadProvenPurchases` and zero `purchaseEventsWithoutOrderId`. Then show no changes and label the tiles "first period with data".
9. **Label `get_ad_shortlist` figures with its own window**, `window.dateStart` → `window.dateStop`. Never present that spend, CPA or ROAS as this period's numbers.
10. **Stay read-only.** Never launch an ad, send a nudge or call a write tool. Every call to action sends the merchant to act.
11. **Name the merchant only from `get_closer_activity`'s `organization.name`.** Never guess a name or take one from a transcript.
12. **Link the dashboard with `organization.dashboardUrl`, and Closer with `organization.dashboardUrl` + `/closer`** (drop any trailing slash first). Never write `app.moshi.ai` or any other hardcoded Moshi dashboard host.
13. **Keep the two Closer counts apart.** `threadProvenPurchases` counts this period's orders. `nudgedThenPurchased` counts conversations nudged this period that later placed an order, up to now. They answer different questions: never add them, and never call one a share of the other.
14. **Money has a currency.** `get_ad_shortlist`'s `accountCurrency` is the currency of its spend, CPA and ROAS. The reporting reads carry no currency for spend, revenue or cart values: print those as plain numbers with no currency sign, unless a read names the currency. Never assume USD.

## Voice

Write to the merchant the way a sharp colleague would: plain words, short sentences, warm and direct. Lead each section with what happened, then why it matters. State each caveat once, in a clause, and keep going. Say "your shoppers" and "your best ad", not "the data suggests".

## Structure

**Header**: `organization.name` × Moshi, the window, and a summary of 2 or 3 sentences.

**1. At a glance**: four tiles, each with its change where rule 8 allows one.
- Spend. When the current read's `hasMetaAdData` is false, this tile says "No Moshi ads ran" (its `note` says why), and no cost ratio built on this period's Moshi spend (such as cost per conversation or per order) appears anywhere in sections 1 to 3. Section 4's CPA and ROAS are exempt: they come from `get_ad_shortlist`, on its own window (rule 9). The DM conversations tile and the Lead closers section still render. If a flag says spend could not be matched to an ad, say that instead, and never say no ads ran.
- DM conversations: `conversations.leadPopulation`.
- Warm-or-hotter: the current value only (rule 4).
- Thread-proven orders with their revenue: `threadProvenPurchases` and `threadProvenRevenue`, labelled as a floor. When `purchaseEventsWithoutOrderId` is above 0, add that many more purchases showed up without an order id, so they are not counted.

**2. Top conversations**: the 2 or 3 threads you read. For each, an anonymized quote of 15 words or fewer and how it ended: bought (with the order value when its purchase event shows one), in the Closer queue, or reached checkout or cart.

**3. Lead closers**
- Closer this period: `nudgesSent` nudges sent, and `nudgedThenPurchased` of those conversations have since ordered (rule 13).
- Missed opportunities: `stillReachable.count` leads worth `stillReachable.cartValue` can still get a reply. Next to that, put a call to action that links to the Closer page (rule 12) and names `get_closer_queue`'s `total`, the number of leads waiting in Closer right now.
- Then `windowClosed.count` leads worth `windowClosed.cartValue` whose reply window has closed, and `noLongerEligible.count` that no longer qualify for a nudge.
- A cart value is a floor ("at least") when its `cartValueUnknownCount` is above 0.

**4. Next ad to launch**: 1 to 3 ads from `get_ad_shortlist`, the ones whose ids are in `suggested`, in that order, each with CPA and ROAS labelled with the shortlist's own window (rule 9), and the call to action "run Scale what works" (`/scale_what_works`, or the `scale-what-works` skill). If `suggested` is empty, leave the section out and say why in one line (`note` when present).

**5. What's next**: 2 or 3 moves, each naming the figure behind it.

**Footer**: every flag (rule 5), then a "not measurable yet" list: platform-attributed purchases and ROAS · lifetime reach · per-ad spend and efficiency · heat trend across weeks · each order's value and channel · carts that never became Closer-eligible (the funnel shows them; the Closer counts do not).

## Quiet weeks

The week is quiet when the current read has zero spend, `conversations.leadPopulation` 0, `threadProvenPurchases` 0, `purchaseEventsWithoutOrderId` 0 and no `funnel` events, and `get_closer_activity` has zero `nudgesSent`, `stillReachable.count`, `windowClosed.count` and `noLongerEligible.count`, and the live queue `total` is 0. Then render only the header, a one-line glance and the footer. Do not pad it.

## Edge cases

- `get_ad_shortlist` failed, or says there is no connected ad account: leave out section 4 and give the reason in one line.
- `partial_period` flag: the window reaches today, so say "so far" and show no changes (rule 8).
- A Closer flag that says history is incomplete: the missed counts are floors.
- A flag that says some purchases have no amount: revenue is a floor.
- `get_closer_queue`'s `total` is exact even though you read only 10 rows.
- `stillReachable.topLeads` holds only the top few leads; `stillReachable.count` is the full count.

Design it cleanly: stat tiles, restrained color, readable in light and dark, and short enough to read in two minutes. Produce it as an artifact.
