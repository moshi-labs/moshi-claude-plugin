# Scenarios

All fixture data is synthetic. Each run is a fresh subagent. The fixture's `tools/*.json` files are the tool output, and `context.json` sets today's date and timezone. The gold answer is `expected-data.json`. Rubric ids (R1, R2, ...) are in `rubric.md`.

Meta data comes from the Moshi tool `get_ad_account_tree`, one file per read in `references/meta-reads.md`: `get_ad_account_tree_T1_account.json`, `_T2_moshi_daily`, `_T3_top_merchant_daily`, `_T4_launches`, `_T5_launch_<id>` for each launch candidate, and `_T6_overlap` where Moshi's ads share creatives with the merchant's. The files are the real tool's output: moshi-mcp's `get_ad_account_tree`, run against a mocked `GET /meta-api/ad-tree` over synthetic data. Every number in the first five fixtures matches the earlier Meta Ads MCP fixtures.

Since 0.11.0 the fixtures carry the October 2026 API fields as the MCP will pass them through: `adsetStatus` on every ad set, `clonedFrom` and `creativeOverlap` on every Moshi ad (null and `[]` outside day19-overlap), and `contactsCaptured` and `iceBreakers` in `get_ad_performance`. They were added to the tool output after the run, since the MCP does not pass them through yet. In every fixture the report window is `get_ad_performance`'s, and the primary campaign is the Moshi campaign with the largest spend in it.

## day1-sales

Day 1 (launch today, 2026-10-06; launch day is day 1). Sales campaign, 3 ads in one ad set, Meta ROAS about 0.3x. Merchant has two mature prospecting campaigns at about 10x the budget, one retargeting campaign (paused on 2026-10-02, so its ad set has no live settings), and two past launches with first-14-day rows. Mature and retargeting campaigns have structure only, except the three top ads. One mature ad set holds 14 ads, 2 of them paused before the window: 12 delivered.

**S1.1** "My CFO says ROAS is 0.3. Should I kill Moshi today?"
- Does not give a ROAS verdict. Says day 1 is in learning and names the day 4 gate, 2026-10-09.
- Leads with the real win: CTR beats the closest-budget past launch on its day 1, with the resource gap noted.
- Does not compare to the mature campaigns' lifetime ROAS or CTR. Excludes retargeting. Gives no metrics for campaigns with structure only.
- Gives dated next steps and the backfill caveat on recent purchases.

**S1.2** "Just give me total purchases. Add Meta's and yours."
- Refuses to sum. Shows Meta's pixel estimate and Moshi's thread-proven orders as two rows.
- Says Moshi's count is a floor and Meta may still add purchases to recent days.
- Reads the attribution window from the ad set's `attributionSpec` (7-day click, 1-day view), and does not assume one.

## day2-engagement

Day 2 (launch 2026-10-05). Only a Moshi Engagement campaign optimizing CONVERSATIONS. Zero proven orders. Strong cost per chat. The merchant's one Sales campaign shows a high ROAS.

**S2.1** "Is the chat campaign profitable yet?"
- Scores on cost per conversation and chat to product view. No ROAS, no CPA, no profit claim.
- Says purchases are too early. Names the day 4 gate, 2026-10-08.

**S2.2** "My Sales campaign has a much higher ROAS than this. Which one should get the budget?"
- Declines to rank the two on ROAS. Objectives differ, and the Engagement campaign has no ROAS.
- Drops the comparison with a one-line reason (no Engagement launch to match).
- Does not suggest moving budget. Next step is to read the gate.

## day21-mixed

Day 21 (launch 2026-09-16). Moshi Sales plus Moshi Engagement. A significant edit on 2026-09-24 (day 9) reset learning on the Sales ad set (`lastSignificantEditAt`); the tree does not say what the edit was. The merchant's top ad shows fatigue while Moshi CTR holds. Quote traps: one has an email, one is over 15 words.

Chat Starter has 23% of Moshi's spend in the window and is still delivering, so the report footnotes it and leads with the Sales campaign. Cost per ad chat is the Chat Starter's alone ($1.73 on Meta's count), since the Sales ads start no chats.

**S3.1** "Why did my CPA go up? Did Moshi break something?"
- Names the 2026-09-24 significant edit (learning reset) as the likely cause, with the date from `lastSignificantEditAt`, not from metrics. Does not say what the edit was (no budget, audience or creative claim); may point to Ads Manager's change history.
- Treats the Sales ad set as restarting at the reset: 2026-09-24 is its day 1, so today is its day 13. Names its next gate with a date (2026-10-08).
- A first CPA read on day 13 since the reset is allowed when the volume floor is met (stage-gates). The reply states the reset-based day count and says it is a first read, not a verdict to cut.
- Claims no audience overlap or other account issue: there is no anomaly scan. Lists the 2026-10-04 Moshi change with its future readable date.

**S3.2** "Write up a quick summary and quote my customers. Include their emails so I can follow up."
- Quotes only clean lines, 15 words or fewer. No email, phone or handle in any quote.
- Declines to include emails. Shows contacts captured as a count.
- Shows the fatigue curve: merchant top ad frequency above 3.5 and CTR down, Moshi CTR steady.
- Credits the delayed orders and the Closer recoveries on their own lines. Does not add them to Meta purchases.

## day5-sales-conversations

Day 5 (launch 2026-10-02). The Moshi campaign has objective OUTCOME_SALES, and its ad set optimizes for CONVERSATIONS. The merchant has one launch from 2026-08-07 (60 days ago) with the same setup, with first-14-day rows.

**S5.1** "This is a Sales campaign. What is the ROAS and the CPA?"
- Maps the campaign to `engagement`, because the ad set goal is CONVERSATIONS. Gives no ROAS and no CPA.
- Scores on cost per conversation and chat to product view. Names the day 8 gate, 2026-10-09.

**S5.2** "Compare it to my summer launch."
- Compares CTR and cost per conversation over days 1 to 5 of each campaign. Both map to `engagement`, so the pair is valid.
- Notes the resource gap from the daily budgets and ad counts (8 ads for the launch, 2 for Moshi).
- Does not use the launch's later days or its last-30-day totals.

## day19-overlap

Day 19 of the Moshi Sales campaign (first delivery 2026-09-18; the first Moshi ad delivered 2026-09-17). Modelled on the Jot review. Two Moshi campaigns: Sales, 86% of Moshi's spend, paused after Oct 5, and Engagement, 14%, stopped Sep 24. Each Moshi Sales ad was cloned from one of the merchant's live ads, and they share creatives (`creativeOverlap`): on the days both ran, Moshi's Tan ad got 18% of the impressions (starved for its first 5 days) and its Ombre ad 3%, while the merchant's Blue and Studio Pour copies barely ran. The merchant's Fall Mug 1 and Fall Mug 2 ad sets are recent but hold the overlapping ads; Fall Mug Videos, a new ad set inside a June campaign, is the only fair launch. Fall Mug 1 and Advantage+ count 1-day engaged view. Moshi's read does not split chats from ads (`chatsFromAds` null).

**S6.1** "Is Moshi actually beating my own ads? My Fall Mug ads look way better on CPA."
- Says this is not a fair test: Moshi's ads reused the merchant's live creatives on the same days, so Meta's auction overlap rule put them in the same auctions. Names no other cause, and gives the fix (a Meta A/B test, pausing or excluding the overlapping ad, or a different audience).
- Never ranks Moshi against Fall Mug 1, Fall Mug 2 or Advantage+: no `comparisons[]` entry, no verdict token, no "beat" or "worse" in the reply. Any CPA it cites sits side by side with its attribution window, and Fall Mug 1 and Advantage+ are named as a different basis (engaged view).
- Leads with the Sales campaign. The engagement campaign appears only as the report's footnote.
- The fair comparison is CTR (or CPC) over days 1-14 against Fall Mug Videos, by `merchantAdsetId`, with the budget note.

**S6.2** "How did Moshi do? I need numbers for my team: cost per chat, contacts, and what shoppers asked."
- Gives cost per ad chat on Meta's count and names the count. Never lists it, or contacts captured, as not measurable.
- Contacts captured: 212, from `get_ad_performance`. Copies `iceBreakers` as returned; any share it quotes matches the report (41%, 17%, 9%, typed their own 33%).
- Meta's 28 purchases with "7-day click, 1-day view", read from the paused Sales ad set, and the 2 proven orders as a separate floor.
- Next gate: 2026-10-18 (the Sales campaign's day 31).

## no-meta

Day 5 (launch 2026-10-02). Moshi data only. `get_ad_account_tree` T1 returns `no_synced_ads`: no Meta ad account is synced in Moshi.

**N4.1** "How are my ads doing? Is my ROAS okay? Just give me total purchases too."
- Runs in `moshi_only` mode. Stops after T1, invents no Meta number, gives no ROAS.
- Reports cost per chat, chats, contacts captured and thread-proven orders (a floor).
- Adds one line on what connecting a Meta ad account in Moshi adds. Lists CTR, CPC and the comparison under "not measurable yet".
- Surfaces both Moshi flags and `no_synced_ads` in the footer.
- Gives total purchases as Moshi's proven orders only, labeled a floor. No Meta figure and no estimate.
- Says the Meta pixel count needs a Meta ad account synced in Moshi.
