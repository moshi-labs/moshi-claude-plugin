---
name: scale-or-kill
description: Decide which of a merchant's live Meta ads to scale, keep testing or cut, using two charts read together — spend vs CPA with 90%-confidence kill and scale curves around a target CPA, and CPMr (cost to reach 1,000 people) vs CPA split at the account's medians into efficient growth, reach play, precision and kill candidate. Delivered as a one-page artifact with an action for every ad. Read-only.
when_to_use: Use when a Moshi merchant asks which ads to scale or kill, which ads to cut or raise budget on, whether an ad has had enough spend to judge, how their ads stack up against a target CPA, or for a scale/kill or CPMr chart. Read-only; it changes no budget and pauses nothing. Requires the Moshi MCP server.
---

Sort every ad the merchant is running into **scale**, **test** or **kill**, and tell them what
to do with each one. The reader is a merchant or media buyer who wants a decision per ad, not a
dashboard.

This skill **changes nothing**. Moshi has no tool to change budgets or pause ads, and this skill
must not call `create_ad` or any write tool. Every action on the page is for the merchant to take
in Ads Manager.

## Steps

1. **Get the target CPA.** If the merchant gave one, use it (`target.source: "merchant"`). If
   not, ask once: "What CPA are you aiming for?" If they don't know, or this is an unattended
   run, use the account's blended CPA for the window, which is total spend ÷ total purchases
   over the ads in scope (`target.source: "blended"`). Say plainly that a blended target puts
   about half the account above the line by construction, so a real target is better.

2. **Pull the ads.** Call `get_ad_account_tree` for the last 30 days (default range, or the
   window the merchant named) with `maxAds: 500`, `owner: "all"`. Read `flags` and `counts`
   first.
   - Keep ads in campaigns whose `objective` is a sales objective (`OUTCOME_SALES`, or legacy
     `CONVERSIONS`). CPA means nothing for lead, traffic or engagement campaigns. Count what you
     left out and say so in `notes`.
   - Leave out retargeting campaigns by default (a name with RTG, Retargeting, Remarketing,
     Retention or BOF). Warm audiences buy cheaper and reach fewer new people, so mixing them
     with prospecting makes them look like efficient-growth winners against a prospecting
     target. If the merchant asks for retargeting, run it on its own with its own target.
   - Also keep each ad set's setup, exactly as the tree returns it: the campaign's `objective`
     and `dailyBudget`, and the ad set's `optimizationGoal`, `attributionSpec`, `bidStrategy`,
     `dailyBudget`, `learningPhase` and `effectiveStatus`. The page shows them per ad and in a
     "How each ad set is set up" table with Moshi ad sets first, so a Moshi ad set can be read
     against the merchant's own. Meta returns delivery settings only for Moshi ad sets and for
     merchant ad sets it reports active. A missing value means "not read", never "none".
   - A big account won't fit in one call. Call with `maxAds: 0` first to list the ad sets,
     then page through them with `adsetIds` in batches the tool accepts.
   - Keep ads with `metrics.spend > 0`. From each ad take `adId`, `adName`, the campaign's
     `campaignName`, `owner`, `effectiveStatus`, `metrics.spend`, `metrics.reach` and
     `metrics.purchases`.
   - If `counts.adsOverMaxAds` is above 0, narrow by `campaignIds` and call again rather than
     judging a partial account. If you still can't cover it all, say how many ads are missing.
   - Money is in `account.currency`. Never assume USD.

3. **Classify each ad (chart 1, the scale and kill zones).** The test is a Bayesian one on the
   purchase count. Use exactly this rule; the page uses the same table, so your words and the
   page agree.
   - `k` = purchases (whole number), `E` = spend ÷ target CPA.
   - **Kill** when `E ≥ KILL[k]`: 90% sure the ad's true CPA is above target.
   - **Scale** when `k ≥ 3` and `E ≤ SCALE[k]`: 90% sure it's below target. The 3-purchase
     floor stops one lucky sale on $10 of spend from reading as a winner.
   - Otherwise **test**.

   | k | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 15 | 20 | 25 | 30 | 40 |
   |---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
   | SCALE[k] | — | 0.29 | 0.81 | 1.42 | 2.08 | 2.79 | 3.52 | 5.04 | 6.62 | 10.72 | 14.95 | 19.28 | 23.67 | 32.59 |
   | KILL[k] | 1.35 | 3.13 | 4.62 | 6.01 | 7.34 | 8.64 | 9.91 | 12.39 | 14.81 | 20.71 | 26.47 | 32.15 | 37.76 | 48.84 |

   For a `k` between the columns, or above 40, use `k + 0.7 ∓ 1.28·√(k + 0.5)` (minus for SCALE,
   plus for KILL). The full table for every `k` from 0 to 40 is in
   `assets/scale-or-kill.html`; it is the 10th and 90th percentile of a Gamma(k + ½) posterior.

   Worked check: target $50, CPA $80. At $200 spent (2 purchases), E = 4 < 4.62, so **test**.
   At $2,000 spent (25 purchases), E = 40 ≥ 32.15, so **kill**. That is the point of the
   curves: the same CPA goes from "too early" to "cut" as evidence builds. An ad with no purchase
   is a kill once it has spent 1.35× the target.

4. **Group each ad (chart 2, CPMr vs CPA).** CPMr = spend ÷ reach × 1,000. Take the ads with at
   least one purchase and reach above 0, find the median CPMr and median CPA across them, and
   split (at or below the median counts as low):
   - **Efficient growth**: low CPMr, low CPA
   - **Reach play**: low CPMr, high CPA
   - **Precision**: high CPMr, low CPA
   - **Kill candidate**: high CPMr, high CPA

5. **Combine them into one action per live ad** (`effectiveStatus` ACTIVE; anything else is
   "already off"):
   - Scale + efficient growth → scale faster than usual, +15–25%.
   - Scale + precision → the normal +5–15%, and watch that CPA holds as spend climbs.
   - Scale + anything else → +5–15%.
   - Test → keep spending and watch. Raise budgets in steps of 5–15%, never in one jump.
   - Kill + reach play → don't cut yet. Re-run the kill test at target +15% (`bumpPct`). If it's
     out of the kill zone there, give it about two more weeks of real spend, since cheap reach
     often buys journeys that close later. If it's a kill even at +15%, cut it.
   - Kill + kill candidate → cut now.
   - Kill with no group (no purchases), or kill + efficient growth or precision → cut.
   - **Moshi ads** (`owner: "moshi"`) in the kill zone → "check DM orders before cutting".
     Meta's purchase count misses sales closed in a Moshi chat. Point the merchant to
     `get_ad_performance` for thread-proven orders. Never add those to Meta's purchases.

6. **Render.** Copy `assets/scale-or-kill.html` and replace only the `const DATA = {...};`
   block. The page draws both charts with Apache ECharts 5.5.0, loaded from cdnjs, with linked hover,
   click-to-select, zoom on the spend axis and box-select. It computes the zones, groups, curves, tiles and action table from the raw ad
   rows. Don't pre-compute them into DATA. Publish the whole template, with your DATA block, as
   an artifact.

   ```js
   const DATA = {
     merchant: organization.name,
     date: "YYYY-MM-DD",                       // today
     window: { from: window.dateFrom, to: window.dateTo },
     currency: account.currency,
     target: { cpa: 50, source: "merchant" },  // or "blended"
     bumpPct: 15,
     summary: "2–3 sentences: how many to scale, how many to cut, and the one move that matters most.",
     notes: ["every flag, exclusion and caveat, one per entry"],
     ads: [{ id, name, campaign, adset, adsetId, owner, status, spend, reach, purchases }],
     adsets: [{ adsetId, adsetName, campaignName, objective, owner, effectiveStatus,
                optimizationGoal, attributionSpec, bidStrategy, dailyBudget,
                campaignDailyBudget, learningPhase }]   // copied as returned; null when absent
   };
   ```

7. **Then write a short reply in chat**: the ads to cut now, the ads to scale (with the % step),
   the reach plays you're giving room, and any Moshi ads to check against DM orders. Name ads by
   name and give spend, purchases and CPA for each. Keep it under 10 lines; the page has the
   rest.

## Hard rules

1. **This is not new-customer CPA.** The post this skill comes from uses new-customer CPA. Moshi
   only has Meta's attributed purchases from all customers, so every CPA here is blended. Always
   put that in `notes` and never call it new-customer CPA.
2. **Never invent a number.** Every spend, reach and purchase figure comes from
   `get_ad_account_tree` for the stated window. If a field is null, leave the ad out and count
   it in `notes`.
3. **Purchases are Meta's attributed count.** Never add Moshi's thread-proven orders to them,
   and never put thread-proven orders in `purchases`.
4. **Surface every entry in `flags`** in `notes`, along with the sync lag: the tree is Moshi's
   synced copy, refreshed about every 6 hours.
5. **Reach is per window.** Reach over 30 days is not lifetime reach. Label CPMr with the window.
6. **Don't over-read small accounts.** If fewer than 4 ads have a purchase, chart 2 can't be
   split. Say so and lean on chart 1.
7. **Stay read-only.** No `create_ad`, no Closer sends, nothing that changes the account.

## Edge cases

- **No sales campaigns** in the window: stop and say so. Don't fall back to lead or traffic
  campaigns.
- **An ad's status disagrees with its ad set's** (the ad reads ACTIVE, its ad set reads PAUSED,
  ADSET_PAUSED or CAMPAIGN_PAUSED): one of the two is stale in the synced copy. Don't pick one
  quietly. The page flags it on the ad, and `notes` names the ad and says to check Ads Manager.
- **Almost everything in test**: that's normal, and the page says so. Don't force calls.
- **The kill zone holds a lot of spend**: point it out in `summary`. Per the post, the kill zone
  should ideally be empty, since that means bad ads were cut before they wasted money.
- **The merchant asks for a different confidence level**: this skill uses 90% only. The table
  would need recomputing for any other level, so say that instead of improvising thresholds.
