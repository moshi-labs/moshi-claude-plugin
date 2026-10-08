# Green round 7: performance-pulse-check 0.11.0

Scope: one rep of every scenario (S1.1, S1.2, S2.1, S2.2, S3.1, S3.2, S5.1, S5.2, S6.1, S6.2, N4.1) under the 0.11.0 skill: the primary-campaign rule, the overlap callout and T6 read, attribution windows next to every Meta purchase figure, cost per ad chat on Meta's count, contacts and ice breakers from `get_ad_performance`, ad-set-level launches, and data checks 11-13. day19-overlap is new.

Method: each run was a fresh general-purpose subagent given the same harness prompt (skill files, fixture files as tool outputs, `context.json` for today, no access to gold or rubric). Each wrote its DATA and run record here and rendered with `template-src/check.js`. Scoring: every DATA was diffed against `expected-data.json` with a script (window, metaWindow, primaryCampaignId, moshi.*, iceBreakers, every campaign, ad set and Moshi-ad field the gold carries, every daily row, comparisons, flag codes, and no not-measurable line for cost per chat or contacts), and every reply was read against R1-R32.

## 1. Verdicts

| Scenario | r1 | Notes |
|---|---|---|
| S1.1 day1 | P | Not today; CTR and CPC against Summer Linen Mist's day 1; the 0.30x shown with its window; next gate 2026-10-09 |
| S1.2 day1 | P | Two purchase numbers, never summed, Meta's with "7-day click, 1-day view"; notes a likely double count |
| S2.1 day2 | P | Cost per ad chat $2.08 on Meta's count; no ROAS; next gate 2026-10-08 |
| S2.2 day2 | P | Declines to rank on ROAS; keeps both budgets; the Sales campaign's 3.4 ROAS given from T1 with its dates and window |
| S3.1 day21 | P | Names the Sep 24 significant edit, no budget claim; reset clock day 13; next gate 2026-10-08; Chat Starter (22.9%) only in the report's footnote |
| S3.2 day21 | P | Clean quotes, no email anywhere; declines emails; fatigue named |
| S5.1 day5 | P | Sales objective with a CONVERSATIONS goal is engagement; no ROAS or CPA "now or later"; $2.76 on Meta's count |
| S5.2 day5 | P | Days 1-5 day for day, cost per chat and CTR, resource gap stated |
| S6.1 day19 | P | Primary Sales campaign leads; no ranking against Fall Mug 1, Fall Mug 2 or Advantage+; "they shared auctions ... aren't a fair test" with the fixes; 3% and 18% shares quoted as the report computes them; CPAs side by side with windows and the engaged-view basis named |
| S6.2 day19 | P | Cost per ad chat $1.83 on Meta's count of 1,003; 212 contacts; ice-breaker shares 41/17/9/33 as rendered; overlap line with the fix |
| N4.1 no-meta | P | moshi_only after T1; cost per chat on Moshi's count, named; no ROAS, no Meta number, nothing summed |

## 2. Mechanical checks (11 runs)

| Check | Result |
|---|---|
| Render banner | `none` in 11/11 |
| Daily rows vs gold, every ad and date in both | 0 differences in 11/11 |
| `window` (get_ad_performance's), `metaWindow`, `primaryCampaignId`, `mode`, `moshi.*`, `iceBreakers`, flag codes | Match gold in 11/11 |
| Every campaign, ad set and Moshi-ad field the gold carries (status, attributionSetting, totals, adsPulled, clonedFrom, creativeOverlap, metaSpend, ...) | Match gold in 11/11, except the comparison launches below |
| Comparisons | Valid in 11/11 (no data-check failure). day19: both runs compare against Fall Mug Videos by `merchantAdsetId`, never an overlapping ad set. day1 and day21 runs read one launch (the closest budget, as comparison-method.md says) where the gold reads two: the known skill-versus-gold gap from green2, not new |
| T6 | One call, six ids, daily, over the report window in both day19 runs; skipped in the other nine (no clonedFrom or creativeOverlap) |
| Cost per chat or contacts listed as not measurable | 0/11 |

## 3. Skill feedback from the runs (not fixed in this round)

- A T5 launch is `adsPulled: "all"` for its days 1-14, but inside the report window only its T3 top ads have rows, so a `c:` token on it over the window would undercount and no check catches it (S5.1, S5.2). It predates 0.11.0.
- The answer shape assumes a primary campaign (moshi_only has none, N4.1) and a later gate (an engagement campaign has no ROAS gate, S2.2, S5.1), and has no slot for account issues such as a paused Moshi ad set (S6.1, S6.2).
- Volume floor: both day19 runs added a CPA comparison against Fall Mug Videos and called it directional (14 of ~50 purchases in 7 days). The template has no floor check.

## 4. Harness issues

- The runs shared one session scratchpad, and several wrote helper scripts at its root under the same names (`build_data.py`), overwriting each other's and an older `build_data.py` there. Each run's result files were unaffected (several rebuilt from private folders and compared). Next round: give each run its own scratch folder in the prompt.
- That scratchpad also holds older gold renders (`gold-*.out`); two runs noticed them and did not open them.
- Fixture nits the runs raised: day19's merchant rows for today look full-size while today is partial; in no-meta, `productViews` (74) equals the top ice breaker's count.
