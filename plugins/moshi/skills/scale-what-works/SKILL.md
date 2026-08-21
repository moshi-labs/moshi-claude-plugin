---
name: scale-what-works
description: Find the Meta ads already working for a Moshi merchant and turn the best of them into new Moshi flows — a brief orientation, a ranked shortlist of their proven ads rendered as cards, then on the merchant's go-ahead, publish the top picks as PAUSED ads sharing one ad set.
when_to_use: Use when a Moshi merchant asks what to run next, which ads are worth scaling, how to get more out of their best-performing Meta ads, or asks to launch or relaunch ads. Requires the Moshi MCP server.
---

Find the Meta ads already working for the organization this session is authenticated as, and offer to turn the best of them into new Moshi flows — ending with those flows created in the ad account, **paused**, ready for the merchant to review.

## Walk the merchant through it, in order

1. Call `get_flow_status_data` with `period` set to the window the merchant named, or `since_launch` if they did not name one. Use it for two or three lines of orientation ONLY — spend, DM conversations opened, and whichever outcome this merchant runs on — thread-proven orders for a store, captured and qualified leads for a survey flow. This is orientation, not the report — `/flow_status_report` already produces the full one-pager over this same data, and this skill must not duplicate it. Do not build a funnel, a lead table, or a "what people said" section here.
2. Decide N first — see "How many ads to launch" below — then call `get_ad_shortlist` with `render: true` and `suggestLimit: N`. The tool decides the proposed set itself: it keeps only ads where `cloneable !== false` AND `alreadyMirrored !== true` (see Hard Rules below for exactly what the `null` case means and why it is kept, not dropped), ranks what remains by `cpa` ascending with `cpa: null` (no purchases yet) sorted last, and takes the top N. It draws cards for ONLY that set and returns the identical set as `suggested` in the tool result — the tool is the single source of truth for "which ads are we proposing", so the cards and your narration can never disagree. Read `suggested` off the result; do not re-derive the filter yourself.
3. Look up the `suggested` adIds in `ads` to get each proposed ad's name, spend, cpa and roas.
4. Draft the flow for each proposed ad, because `sourceMetaAdId` only supplies the
   creative — the headline, CTA, ice breakers and products are all NEW and the merchant has
   never seen them. Call `get_products` first. For each ad draft: a `name`, a `headline`, a
   `ctaText`, the `shopifyProductIds` to feature, and 1-3 `iceBreakers`. Base them on the
   ad's own `adName`/`campaignName` and the products it is clearly selling. `ctaText` MUST
   be one of Meta's accepted values (Shop Now, Order Now, Learn More, Get Offer, Sign Up,
   Subscribe, Get Quote, Send Message) or the publish is rejected.

   `create_ad` also supports these, and they are worth offering rather than leaving at
   defaults — a cloned ad inherits the creative, not the conversation behind it:
   - **`incentives`** — a discount attached to the flow. If the source ad's own copy
     promises an offer (a "30" or "%" in the ad name is a strong hint), the clone needs a
     matching incentive or the DM will not honour what the creative advertises.
   - **`appliesOnSellingPlans`** on an incentive — whether the discount applies to
     subscription purchases. Ask if the merchant sells subscriptions.
   - **`welcomeMessage`** — the first message when the chat opens.
   - **`greetingInstruction`** — a verbatim opening line the agent reproduces word for word.
   - **`productRecommendation`** — a short survey that recommends a product from the
     answers, instead of leading with a carousel.
   - **`includeBestSellers`** — defaults to true; adds best sellers alongside the chosen
     products.

   Do not interrogate the merchant about all of these. Draft sensible defaults, show what
   you chose, and name the one or two most likely to matter for this ad.
5. Ask where it should live, once: a **new campaign** (the default — say so and move on)
   or an **existing** one. If they name an existing campaign, pass `campaignId`. If they
   want a new one with a specific name, pass `campaignName`. Never pass both.

   **Always use a new ad set for the batch** unless the merchant explicitly asks otherwise:
   ad #1 creates it and #2..N join it. Only pass an `adsetId` they gave you — and if they do
   ask to join a live ad set, that is when the learning-phase reset applies (see Hard Rules)
   and you cannot set a budget, because it belongs to that ad set already.

6. Show the merchant what you are about to create, then **STOP**. For each ad: its name,
   spend/cpa/roas and why it made the cut, and underneath it the flow you drafted — headline,
   CTA, the products **by name** (never raw IDs), and the ice breakers written out. Say what
   the ice breakers are: the tappable buttons a customer sees first in the DM. Also tell them
   what `counts` shows was left out (see Hard Rules). Then wait for **"Go"** (or an
   unambiguous equivalent).

   Invite changes, do not just ask for approval — "swap the product", "punchier ice
   breakers", "use Learn More instead" are all normal and cheap to do before anything is
   published. Apply any edits and show the change; you do not need to re-show everything.

   **Publish exactly what they saw.** Do not regenerate the headline, CTA, products or ice
   breakers at publish time — if the published flow differs from the draft they approved,
   the review was theatre.
7. On "Go", publish all N with `create_ad`: `sourceMetaAdId` set to that ad's `adId`, `publishToMeta: true`. Pass the `name`, `headline`, `ctaText`, `shopifyProductIds` and `iceBreakers` the merchant approved when you showed them the draft, unchanged — do not regenerate any of it. **Ad #1 creates the ad set** — call it first, with no `adsetId`. Poll `poll_ad_status` on its `flowId` until `status` is `active` or `failed`; once active, read `metaAdsetId` off that response, then pass that same value as `adsetId` on ads #2 through N so the whole batch shares one ad set. Do not fire the remaining ads in parallel or before `metaAdsetId` arrives — each `create_ad`/`poll_ad_status` call returns its own `nextStep`; follow it literally rather than deciding sequencing yourself.
8. Report back, per flow: its name, `flowId`, and confirmed status once `poll_ad_status` says `active` (or its `statusError` if one failed — report that, do not retry, retrying a failed publish risks duplicate campaign objects). `poll_ad_status`'s own response already carries what the merchant needs next, with no extra call: for an active flow, surface `previews.storyPreviewUrl` (fall back to `previews.fallbackPreviewUrl` if that one is absent) so they can see the ad itself, and `adManagerUrl` so they can go turn it on — the literal next thing they have to do, since everything lands PAUSED. Both fields are optional and a failed flow has neither; only print a link you actually have, never an empty one.

## Budget and how many ads

**Recommend a daily budget of 30% of what these ads already run on.** Each ad carries
`effectiveDailyBudget` — the daily budget the merchant themselves set on the campaign (or
the ad set, when the campaign has none). Average that across the ads you are proposing and
recommend **30% of the average**, in the account's own currency (`accountCurrency` — do not
assume dollars).

Say it as a starting point they can move, not a rule: "these are running on about
$300/day, so I'd start this at $90/day and watch it for a week."

Then actually set it: pass `dailyBudgetCents` on the ad that CREATES the ad set (ad #1).
It is in **cents** — $90/day is `9000`. Budget lives on the ad set, so do not pass it on
ads #2..N that join with `adsetId`; they inherit it.

Do NOT derive a daily rate from `spend`. `spend` is the 90-day total and real ads run far
less than that — for one merchant the ads clearing the floor averaged 26 days, so dividing
by 90 understates the true daily rate by more than 3x. `effectiveDailyBudget` is the only
daily figure in the response.

Where `effectiveDailyBudget` is `null` (a lifetime-budget campaign has no daily figure —
`counts.adsMissingDailyBudget` says how many), say you could not read their current budget
and name Moshi's $20/day default as what it will otherwise start on. Do not invent a rate.

**How many: default to 3, hard cap 6.**

Every ad in a shared ad set draws from the SAME budget and Meta fragments delivery across
whatever is in the set. An ad needs roughly $20-25/day to exit the learning phase, so the
budget you recommend sets the ceiling: at $90/day, three ads get $30 each and all three can
learn; ten would get $9 each and none would.

If the merchant asks for more than 6, do not silently comply and do not refuse. Show them
the division in their own numbers — "at $90/day, ten ads is $9 each and none of them will
get enough spend to learn" — recommend fewer, and offer to run the rest as a second batch.

## Tone — you are talking to a merchant about their own business

Be direct and confident about what Moshi can do. Lead with the finding, not the caveat.

The unknowns in this data are real and you must not hide them — but state each one **once**,
in a clause, and keep going. Do not stack hedges, do not apologise for the limits of the
data, and do not narrate your own uncertainty at length.

Bad — three hedges for one fact, and it reads like the product does not work:

> All three came back cloneable: true, so the creative check passed. One thing I can't
> confirm: this org has a flow published before Moshi started recording source lineage, so
> "already mirrored" is unknown for every ad here — I can't promise these three are fresh,
> only that nothing on record contradicts it.

Good — same facts, one caveat, merchant-legible:

> These three are your strongest performers and all are ready to clone. One older flow
> predates our source tracking, so if you've already run one of these I wouldn't see it.

Say "your ads", "your best performers", "I'd start this at $90/day". Not "the data
suggests", "I cannot verify", "it appears that". You are reporting on their business, not
defending a measurement.

## Hard rules — these are correctness, not style

1. **`cloneable` and `alreadyMirrored` are three-state, not boolean.** `cloneable === false` is a real, checked blocker — never mirror that ad, it fails at publish. `cloneable === null` means it was never checked (creative never returned, or the creative-lookup cap was hit) — that is UNKNOWN, never treat it as false, and never hide the ad for it; keep it, but say once that its creative could not be checked. State it and move on — do not repeat the caveat or apologise for it. Same shape for `alreadyMirrored`: `=== true` means a flow already clones it (drop it, re-launching is redundant); `=== null` means lineage can't be traced (the org has flows with no recorded source) — keep the ad, but mention once that an older flow predates source tracking, so a previous clone would not show up. Once, plainly, then move on.
2. **Everything this creates is created PAUSED.** Nothing spends until the merchant activates it themselves in Meta. Say this plainly and early — it is the single most reassuring fact about this whole flow and merchants will not assume it on their own.
3. **Why one ad set:** budget consolidation (one budget instead of N) and skipping ad set setup. **Do NOT raise the learning phase when this batch creates its own ad set** — ad #1 makes a brand-new set, so there is no accumulated learning to reset and saying otherwise invents a cost the merchant is not paying. ONLY if the merchant asks to add these ads to an ad set that was ALREADY RUNNING: tell them plainly that this RESETS that ad set's learning phase, and that the reset hits the ad already in there too. Never say or imply that joining an existing ad set keeps their existing optimization — it does not.
4. **Report what `get_ad_shortlist` left out.** Its `counts` field names ads dropped by the spend floor, the creative-lookup cap, and the result limit — surface that so the merchant knows they are not seeing every ad in the account, only the ones that cleared the bar to be ranked at all. Separately, `ads` itself can carry more ads than `suggested` proposes — say so too, so the merchant does not wonder whether the N you presented was everything that qualified.
5. **Wait for an explicit "Go" before creating anything.** Presenting the top N is not permission to publish them — do not call `create_ad` before the merchant says so. And show them the flow you drafted, not just the ads: the headline, CTA, products and ice breakers are all new content they have never seen, and they are what the customer actually reads.
6. **Never launch the batch in parallel.** Ad #1 must finish (or fail) and hand you `metaAdsetId` before ads #2 through N are published — parallel publishes with no `adsetId` create N separate ad sets, the opposite of what this batch is for.
