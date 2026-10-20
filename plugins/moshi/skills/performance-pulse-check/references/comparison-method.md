# Comparison method

Read this before you fill `comparisons` or answer "how does it compare to
my other ads".

There are two kinds. A launch comparison puts Moshi's first days against
a launch of yours on its first days: the only test matched on age, both
sides learning. Your running campaigns put Moshi's CTR against the
campaigns you run on the same dates: matched on the calendar (the same
auctions, season and promos), not on age or budget. They answer different
questions, so show both when both qualify.

## Recipe

A fair launch comparison has all six parts:

1. **Same objective.** Both sides map to the same `objective` (see
   `data-contract.md`; an ad set takes its campaign's). Engagement
   compares to engagement, sales to sales.
2. **A launch, not a mature campaign.** The launch is an ad set that
   started in the last 90 days, even inside an older campaign
   (`merchantAdsetId`), or a whole campaign that did (`merchantCampaignId`).
   It is not retargeting. T4 in `meta-reads.md` lists the candidates. T5
   pulled all its ads, so its `adsPulled` is `"all"`. A side with only its
   top ads pulled fails the data check. Mature campaigns never go into a
   launch comparison.
3. **No shared creative.** Never compare against an ad set or campaign
   that holds an ad in a Moshi ad's `creativeOverlap`. Meta won't show one
   person two ads from the same advertiser in one auction: when ad sets
   aim at similar people it enters the one with the best history, so the
   two were not tested apart. The template shows them side by side, in
   the overlap callout and Same ads, instead (check 11). Say "ran at the
   same time, competing in the same auctions", never who won.
4. **The same days of life.** Moshi's days 1–N against the merchant
   launch's days 1–N. N is Moshi's age since launch on the window's last
   day (a reset does not change N), capped at 14, the days that T5 pulls
   for each launch. In a baseline window that stops N before Moshi's new
   ad set.
   Calendar overlap does not matter. A launch from August still compares
   on its own days 1–N. If the launch first delivered after its
   `startTime`, T5 holds fewer than 14 of its days, so compare only the
   days that have rows.
5. **A metric the stage allows.** Day 1–7: `ctr`, `cpc`,
   `costPerConversation`. Day 8+: add `cpa` and `roas`, for Sales only.
6. **A resource note.** The template writes it from each side's daily
   budget and ad count. When Moshi has the bigger budget or more ads, the
   note says so, and you do not hide it.

Never use lifetime numbers for a comparison. Never compare across
objectives. If no launch meets parts 1–4, add "No comparable launch in
the last 90 days" to `notMeasurableYet`.

## Picking the pair

When several launches qualify, pick the one with the closest daily budget.
Use at most two launch comparisons, for the primary campaign first, plus
the running one below. Lead with the comparison where Moshi wins, then
show the others, even when Moshi loses them.

## Your running campaigns

For "how does Moshi compare with the campaigns I'm running": one entry,
`{ metric: "ctr", running: true, moshiCampaignId }`, for the primary
campaign. It is the one place a mature campaign appears, and only on CTR:
months of learning and a bigger budget move CPA and ROAS far more than
the click rate.

- **Moshi's side:** the campaign's link clicks ÷ impressions over the
  report window, from its daily rows.
- **Your side:** every campaign of yours with the same objective that
  delivered in the window. A campaign that also holds Moshi's ads is
  Moshi's in DATA, so none of its ad sets count here. Each one's CTR is its link clicks ÷
  impressions over the window, from its ad sets' `totals` (T7), and each
  counts by its spend there: Σ(spend × CTR) ÷ Σ spend. Where your money
  goes counts most, and a small campaign with an odd CTR cannot swing it.
  A paused merchant ad set shows no optimization goal, so a campaign you
  paused since maps to `"other"` and stays out: in practice these are the
  campaigns still running.
- **Left out:** your ad sets that run a Moshi ad's creative (part 3:
  they share auctions with it, and the overlap callout shows them), and an
  ad set whose link clicks T7 could not read. Nothing is left out by its
  name: a campaign called "RTG" can be mostly broad, and the tree carries
  no audience. The report names none of your campaigns here, and your
  reply never calls one retargeting from its name.
- **Any day:** CTR is a day 1–3 read. Before day 8, say that your
  campaigns have had longer to learn.
- **Resource note:** the template gives each side's spend over the
  window.

Add it whenever T7 gives a campaign of yours with the primary campaign's
objective. Otherwise add "Your running campaigns: none with Moshi's
objective ran on these dates" to `notMeasurableYet`. Never a CPA or ROAS
against your running campaigns.

## Assist evidence

Moshi's value includes touchpoints that Meta's pixel does not credit.
Show:

| Evidence | Shown |
|---|---|
| Chats, contacts captured, product views, carts, Closer recoveries | always |
| Delayed orders: proven orders placed 1+ days after the chat | always |
| Fatigue: the merchant's top ad's CTR and frequency against Moshi's, latest day against first | day 15+ since launch (a reset does not delay it), in your reply: the report has no fatigue chart |
| Halo on retargeting | day 15+, labeled directional |

Moshi-proven orders are a floor. Closer recoveries are their own line.
Never add either to Meta's purchases, and never build ROAS or CPA from
them.
