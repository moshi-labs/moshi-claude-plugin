---
name: plan-next-flows
description: Plan the next Moshi flows to run inside one of a merchant's existing Meta campaigns, and deliver it as a one-pager. Sizes a new Moshi ad set to the campaign's typical ad set, then picks the merchant's proven ads that look most like what has already worked for Moshi in DM, with the evidence, the flow each maps to, the setup constraints and the decisions to settle first. Read-only.
when_to_use: Use when someone asks which Moshi flows to run next inside a specific campaign (often the merchant's top-of-funnel or prospecting campaign), wants a one-pager or plan for the next Moshi ad set, or wants to pick ads based on how earlier Moshi ads and DM vs website tests performed. Read-only; it creates nothing. Requires the Moshi MCP server.
---

Plan a new Moshi ad set inside one of the merchant's own Meta campaigns, and hand back a
one-pager that a merchant or their agency can read and decide on. Every ad in the plan is a
clone of one of the merchant's proven ads (`sourceMetaAdId`), sent into a Moshi DM flow
instead of the website.

This skill **creates nothing**. It never calls `create_ad`. Building happens afterwards, on
an explicit go-ahead, through `scale-what-works` (see "After the plan").

## Steps

1. **Pick the target campaign.** If the user named one (name or id), use it. If not, call
   `get_ad_account_tree` with `owner: "merchant"` over the last 30 days. Take the
   highest-spend campaign that is ACTIVE and reads as prospecting: a sales objective, and a
   name with Prospecting, Broad, Cold, TOF, ACQ or ASC. Never pick a campaign whose name
   says Retargeting, RTG, BOF, Retention or Remarketing. Say in one line which campaign you
   picked and why, then carry on. Don't wait for confirmation unless two campaigns are
   close.

2. **Decide how many ads (N).** Call `get_ad_account_tree` with `campaignIds: [target]`,
   `includeUndelivered: true` and a `maxAds` large enough for the whole campaign. Count the
   ads with `effectiveStatus` ACTIVE in each ad set that is itself ACTIVE, and drop ad sets
   with zero active ads.
   - Work out the mean and the median.
   - If one ad set holds more than 3× the median (usually a fresh dump of new creatives),
     leave it out of the mean and say so.
   - N is the rounded (trimmed) mean, between 2 and 6. Six is `scale-what-works`' hard cap
     for one shared ad set.
   - If the tree capped the rows, say the counts may be partial.

3. **Read what has worked for Moshi.**
   - **Per Moshi ad:** `get_ad_account_tree` with `owner: "moshi"` since the first Moshi
     spend (up to 90 days). Keep spend, impressions, CPM, link CTR, Meta purchases, ROAS and
     CPA.
   - **Per flow:** `get_ad_performance` (`since_launch`) for thread-proven orders. For each
     flow that spent, use `get_campaign_conversations` for the number of chats.
   - **Split tests:** a Moshi campaign with a DM ad set beside a website ad set running the
     same creatives (match by `clonedFrom` / `creativeOverlap`) is a DM vs website test.
     Lay it out pair by pair.
   - Label each Moshi ad with a format (video, static, UGC, review static) and a 2–4 word
     angle you write from its name and copy (for example "Reactive skin testimonial").

4. **Separate what holds up from what is noise.** Spend on Moshi ads is usually small, so
   be strict.
   - **Holds up:** a difference that points the same way on every ad. A rate difference
     (CPM, link CTR, chats per 1,000 impressions) also counts when it is at least 1.5× with
     several thousand impressions on each side.
   - **Too early:** any purchase, ROAS or CPA comparison with fewer than 20 purchases on
     either side, and any order-rate claim from a single flow.
   - Write each finding as one plain sentence. These become the page's "Holds up" and "Too
     early" lists.

5. **Build the candidate pool.** Call `get_ad_shortlist` with `render: false`,
   `limit: 100`, and a `spendFloorUsd` low enough to reach recent ads (around $300). It
   gives 90-day spend, CPA, ROAS, `thumbnailUrl`, `cloneable`, `alreadyMirrored` and
   licensing flags. Then call `get_ad_account_tree` with the top candidates' `adIds`, once
   for the last 30 days and once for the last 7, to get recent purchases.
   - **Drop:** ads with `cloneable === false` or `alreadyMirrored === true`, ads that
     already run in a live Moshi ad set or test, and ads whose campaign is retargeting
     (their numbers come from warm audiences).
   - **Flag but keep:** whitelisted, partnership or creator-licensed ads (a clone may lose
     the creator identity), `cloneable === null` (never checked), and ads whose ad set also
     targets warm audiences, if the tree shows it.

6. **Pick N ads.** Rank the pool on three things, in order:
   - proven: at least 10 purchases in 30 days, and CPA no worse than the target campaign's
     CPA plus 10%;
   - looks like a Moshi winner: the format and angle of the Moshi ads that held up in step
     4;
   - recent: a large share of its purchases in the last 7 days.

   For each pick, write:
   - **why**: one or two sentences that tie it to a number from step 3 or 5;
   - **flow**: the existing flow it should use (from `list_flows` / `get_flow`, matched by
     angle and product), or "new flow" with the products to feature;
   - **watch**: anything the flow or setup must handle. For example, a creative that
     promises an offer the flow has to honour, a small sample, or warm-audience numbers.
     Leave it empty if there is nothing.

   Keep the next two as a bench. List what you left out and why, one line each.

7. **Write the setup notes**, from the target campaign in the tree and from
   `get_adset_learning_status`.
   - **Budget:** whether the campaign holds the budget (CBO). If it does, the new ad set has
     no budget of its own and competes with the rest, so suggest a minimum daily spend if
     other ad sets use one.
   - **Optimization:** the ad sets' optimization goal and event. The Moshi ad set has to
     match them, and Meta locks the event once an ad set is published.
   - **Audience:** whether the campaign's ad sets exclude past purchasers.
   - **Captions:** what has to be checked after cloning, for example multi-variant copy that
     the DM ad will carry only one version of.
   - **Unconfirmed:** anything you could not confirm, such as whether a DM ad set is
     accepted inside a campaign whose other ad sets send people to the website.

8. **List the decisions to settle before building.** Usually:
   - sign-off from whoever runs the campaign, since the new ad set shares its budget;
   - a minimum daily spend;
   - purchaser exclusions;
   - the offer, including any promise a picked creative makes;
   - overlap with Moshi tests already running on the same audience.

9. **Render.** Copy `assets/next-flows.html` and replace only the `const DATA = {...};`
   block, following "DATA" below. If you can copy files, copy and edit. If not, emit the
   whole template with your DATA block, as an artifact.

10. **Reply in chat** with four short parts:
    - the campaign and N, and why N;
    - the picks, one line each;
    - the decisions to settle;
    - a pointer to the page.

    Don't repeat the tables.

## DATA

All display values are **strings you format** (currency in `accountCurrency`, never
assumed dollars). Every number shown must state its window somewhere nearby (in `sub`,
`note` or the label).

```js
const DATA = {
  merchant: "Example Co",
  date: "2026-10-21",
  pills: [{ text: "3 ads", tone: "acc" }, { text: "Not built yet", tone: "rose" }], // tone: acc | mint | rose | ""
  title: "Next Moshi flows in your Prospecting campaign",
  dek: "One sentence: the new ad set, the N ads, and that tapping goes to chat.",
  intro: "Two or three sentences: which campaign, why it, and how the ads were chosen.",
  glance: [{ value: "3 ads", label: "Why N", muted: false }], // 3–4 tiles; muted: true for the campaign baseline
  picksSub: "Window and source of the pick numbers.",
  picks: [{
    title: "1 · Ad name", thumbnailUrl: "https://… or null",
    chips: [{ text: "52 purchases", tone: "mint" }, { text: "$80 CPA", tone: "" }],
    why: "…", flow: "…", watch: "… or empty string"
  }],
  tables: [{  // one per earlier Moshi run or split test
    title: "What the DM vs website test showed", sub: "Campaign, window, attribution.",
    columns: ["Ad", "Arm", "Spend"],
    rows: [{ cells: ["Ad A", "DM", "$2,035"], arm: "dm", bold: false }], // arm: dm | web | null, shown as a pill in column 2
    note: "Optional line under the table."
  }],
  holds: ["…"], early: ["…"],
  setup: [["Budget", "…"], ["Optimized for", "…"]],
  decisions: ["…"],
  bench: [{ title: "Ad name", thumbnailUrl: null, chips: [{ text: "…", tone: "mint" }], note: "…" }],
  leftOut: ["Ad names — reason."],
  nextStep: "What happens after the decisions are settled.",
  footer: "Ids and the date the data was pulled; say nothing was changed."
};
```

## After the plan

If the user says to build it, use `scale-what-works` steps 4–8 with `campaignId` set to the
target campaign and the picks as the proposed set. First settle the optimization event in
step 7: if the campaign's ad sets optimize for purchases, confirm that the ad set
`create_ad` makes will too before publishing anything. A mismatched event can't be fixed
after publish.

## Hard rules

1. **Read-only.** Never call `create_ad`, `update_flow_products` or anything else that
   writes.
2. **Meta purchases and Moshi orders are different counts.** Show both, side by side, and
   never add them up. Meta usually credits more purchases than Moshi records.
3. **Every number has a window.** No figure appears without its date range nearby.
4. **No warm-audience winners.** Ads from retargeting campaigns are never picks, however
   good their numbers.
5. **No duplicates of a live Moshi test.** Unless the user asks for it, don't re-propose a
   creative already running in a Moshi DM ad set.
6. **State each caveat once,** in a clause, then move on. Lead with the finding.
