# GREEN summary: performance-pulse-check

Twelve runs with the skill: six scenarios, two reps each. Scored against `rubric.md` R1 to R25. Numbers were spot-checked against `fixtures/<name>/tools/*.json` and `expected-data.json`. Each DATA block was rendered through `template-src/build.js` and loaded in Chrome.

## 0. Read first

- **S1.1-r2 holds the wrong DATA.** Its DATA block is byte-identical to S5.1-r1's (merchant "Ridgeline Trail Gear", the day5 fixture). Its Reply and Reasoning are about day1. This is a harness collision, likely a shared output path. The DATA checks for S1.1-r2 cannot be graded. Rerun it.
- **Two reps, not three.** The rubric needs 3 of 3 reps per scenario for GREEN. No scenario can be called GREEN from this batch.
- **How R8 was graded.** The template computes the next gate and prints it in the "Where each campaign stands" panel, so the rubric's "or the footer" clause passes every run. R8 was graded on the chat reply's "Next gate:" line, because that is the line the merchant reads. Section 6 asks to change the rubric this way.

## 1. Scores

P = pass, F = fail, N/A = the check does not apply, X = cannot be graded (wrong DATA in the file).

| Check | S1.1 r1 | S1.1 r2 | S2.2 r1 | S2.2 r2 | S3.1 r1 | S3.1 r2 | S3.2 r1 | S3.2 r2 | S5.1 r1 | S5.1 r2 | N4.1 r1 | N4.1 r2 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 No ROAS verdict before day 8 | P | P | P | P | N/A | N/A | N/A | N/A | N/A | N/A | P | P |
| R2 No ROAS/CPA on engagement | N/A | N/A | P | P | P | P | P | P | N/A | N/A | P | P |
| R3 Purchase rows not summed | P | P | P | P | P | P | P | P | P | P | P | P |
| R4 Comparisons age-matched | P | X | P | P | P | P | P | P | P | P | N/A | N/A |
| R5 No hidden Ads Manager number | P | P | P | P | P | P | P | P | P | P | P | P |
| R6 Attribution window from data | P | P | N/A | N/A | P | P | P | P | N/A | N/A | N/A | N/A |
| R7 No PII or long quotes | P | P | P | P | P | P | P | P | P | P | P | P |
| R8 Next gate with a date | **F** | P | P | P | P | **F** | P | **F** | P | P | P | P |
| R9 Changes with readable dates | N/A | N/A | N/A | N/A | P | P | P | P | N/A | N/A | P | P |
| R10 Flags surfaced | P | X | P | P | P | P | P | P | P | P | P | P |
| R11 Backfill caveat | P | P | N/A | N/A | P | P | P | P | N/A | N/A | N/A | N/A |
| R12 DATA validates in template | P | X | P | P | P | P | P | P | P | P | P | P |
| R13 Day 1-3 verdict judges no ROAS/CPA | P | P | P | P | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |
| R14 Learning reset from Meta data | N/A | N/A | N/A | N/A | P | P | P | P | N/A | N/A | N/A | N/A |
| R15 Call budget, read-only | P | P | P | P | P | P | P | P | P | P | N/A | N/A |
| R16 Prose numbers via tokens | P | X | P | P | P | P | P | P | P | P | P | P |
| R17 Mode and objective mapping | P | X | P | P | P | P | P | P | P | P | P | P |
| R18 Null versus zero | P | X | P | P | P | P | P | P | P | P | P | P |
| R19 Day numbering | P | P | P | P | P | **F** | P | **F** | P | P | P | P |
| R20 Structure-only gets no rows | P | X | P | P | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |
| R21 Sales + CONVERSATIONS is engagement | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | P | P | N/A | N/A |
| R22 Learning status not inferred | P | X | P | P | P | P | P | P | P | P | P | P |
| R23 No CPA/ROAS verdict before day 8 | P | P | P | P | P | P | P | P | P | P | N/A | N/A |
| R24 Answer shape | P | P | P | P | P | P | P | P | P | P | P | P |
| R25 Conversation claims match | P | P | P | P | P | P | P | P | P | P | P | P |
| Pass / applicable | 20/21 | 14/14 + 7 X | 20/20 | 20/20 | 21/21 | 19/21 | 21/21 | 19/21 | 17/17 | 17/17 | 15/15 | 15/15 |

Rubric result, two reps: S2.2, S5.1 and N4.1 pass 2/2. S1.1 is 1/2 plus one ungradable run. S3.1 and S3.2 are 1/2 each. Scenario misses outside the rubric are in section 3.

### Fail details

- **S1.1-r1 R8.** "Next gate: first ROAS and CPA read on 2026-10-13." The next gate is day 4, 2026-10-09. The run skipped it because the merchant asked about ROAS. The verdict also misuses a token: "ROAS is not a fair read before day 8, and the first one is due {m:nextGateDate}". It renders as "the first one is due Oct 9", which contradicts the chat reply.
- **S3.1-r2 and S3.2-r2 R8 and R19.** Both count Sep 25 as day 1 after the Sep 24 reset. That gives "day 12" and "Next gate: ... on 2026-10-09". The gold is day 13 and 2026-10-08. Both runs set `comparisons[].day` to 12; the gold is 14. The rendered report says "Day 13 ... Next gate: day 15 on Oct 8", so the chat contradicts the report.

## 2. Render results

All twelve DATA blocks and all five gold blocks built and loaded with no data-check banner, no console errors and no unresolved tokens. A negative control proved that the banner works: `{c:<engagement id>.roas}` in the S2.2-r2 verdict gave "Check 1: {c:1202630000000071.roas} would show ROAS for an engagement campaign".

| Run | Banner | Console errors |
|---|---|---|
| S1.1-r1 | none | none |
| S1.1-r2 (day5 DATA) | none | none |
| S2.2-r1 | none | none |
| S2.2-r2 | none | none |
| S3.1-r1 | none | none |
| S3.1-r2 | none | none |
| S3.2-r1 | none | none |
| S3.2-r2 | none | none |
| S5.1-r1 | none | none |
| S5.1-r2 | none | none |
| N4.1-r1 | none | none |
| N4.1-r2 | none | none |

Visual check (S3.1-r1, day21): the header, verdict, stage panel ("Day 13, clock restarted Sep 24 after a learning reset. Next gate: day 15 on Oct 8"), KPI tiles and the two-row purchases block ("two sources, never added") all render correctly.

Problems found in the rendered prose. The template does not flag these:

- **The rendered form of `{m:age}` and `{m:stage}` breaks sentences.** `{m:age}` renders "day 5", and `{m:stage}` renders a label such as "Learning". Rendered text:
  - S5.1-r1: "On day day 5 ... your summer launch's first day 5 days"
  - S5.1-r2: "Day day 5 is a read on cost per chat"
  - N4.1-r2: "On day day 5"
  - S2.2-r1: "This is Learning of Moshi"
  - N4.1-r1: "This is Early read"
- **Token meaning misread.** S1.1-r1 uses `{m:nextGateDate}` (day 4) as the "first ROAS read" date (day 8).
- **The "Cost per chat" tile on day21 shows $21.03.** That figure is all Moshi spend, Sales included, divided by all chats, so `moshi.spend ÷ moshi.chats`. Meta's cost per chat for the chat campaign is $1.73. The gold DATA renders the same tile, so the cause is the contract and template, not the runs.

## 3. Number spot-check

Every DATA daily row that the runs share with the gold matches it exactly: no row has a wrong value. The differences are rows that runs left out on purpose:

- S2.2-r2 dropped the Sales campaign's top-ad rows (see section 4).
- S5.1 r1 and r2 dropped read 6 summer rows because those are day 31+.
- S3.1-r2 clipped Evergreen rows to the window.
- S1.1-r1, S3.1-r1 and S3.2-r2 left out rows for launches that are not in `comparisons`.

All `adCount`, `lastLearningReset`, `startTime` (Evergreen 1969 gives null), `objective`, `budgetType`, `moshi.*` and `firstLaunch` values match the gold. Every `flags[]` holds every gold flag code. Every quote is 15 words or fewer, has no PII, and has the right source. No run shows the `conv_d21_02` email anywhere.

These cited figures were verified against the daily rows:

- **day1:** 2.25% CTR, $0.65 CPC and 0.30 ROAS. Linen day 1 is 1.18% and $1.09.
- **day2:** 85 conversations at $2.08. Sales ROAS 3.40 from the campaign read (60,833.72 / 17,892.27).
- **day5:** $2.76 per chat (1,166.14 / 423). Summer days 1-5 are $6.38, $1.07 CPC and 1.17% CTR.
- **day21 CPA by period:** $38.49 (Sep 16-23), $63.58 (Sep 24-30), $46.45 (Oct 1-6). Sep 24 alone is $148.33. The last 7 days are $46.75 on 80 purchases.
- **day21 days 1-14:** $49.58 against Raincoat $61.79. Days 1-12: $50.79 against $62.70, and CTR 2.19% against 1.22%.
- **day21 window:** 214 purchases, $48.52 CPA, 1.10 ROAS.
- **day21 chat campaign:** $1.73 before and after Sep 24.

Conversation claims are right in every run. In day1, `conv_d1_01` ends with a shopper message and `_02` ends with an agent message. In day21, `conv_d21_02` ends with the puppy-mix question. The other chats end with an agent message.

Scenario misses outside the rubric:

- **S3.2, both reps: no fatigue curve.** Neither rep shows the fatigue curve. Both push it to "day 15" of the reset count. S3.2-r2 notMeasurableYet: "Fatigue and frequency read for the Moshi Sales campaign: opens on day 15 after the Sep 24 reset, 2026-10-09." S3.2-r1 next step: "The Sales campaign reaches day 15. Compare its best ad against your Pet Parent Testimonial ad on CTR and frequency." The gold verdict leads with fatigue: Moshi CTR holds at 2.17-2.22% while the merchant's top ad tires.
- **S3.2-r1 leaves Closer recoveries out of the reply.** The report tile shows them.
- **N4.1, both reps: CTR and CPC are missing from `notMeasurableYet`.** Both list only ROAS, purchases and the comparison. The scenario asks for CTR, CPC and the comparison. Neither reply cites the 41 contacts captured, but the report tile shows them.
- **N4.1 may have the N4.2 prompt mixed in.** r1's reply has a "Total purchases:" paragraph, and both reasonings answer "total purchases". This is the same issue the RED summary raised.

## 4. RED to GREEN

### Fixed

| RED pattern | RED | GREEN |
|---|---|---|
| No gate date (R8) | 6/6 fail | 9/12 give the right dated gate; the 3 fails are new causes (below) |
| ROAS/CPA on engagement or from the Moshi floor (R2, R21) | 4/6 fail | 0/12. S5.1 both: "ROAS and CPA do not apply to this campaign" |
| Comparisons in the wrong shape (R4) | 5/6 | 0/11 gradable. All same objective, launches only, days 1-N, resource gap stated |
| Flags dropped (R10) | 3/6 | 0/11 gradable |
| Changes missing or judged early (R9) | 3/3 | 0/6. N4.1 now lists the brand-doc change |
| Attribution window (R6) | 3/3 | 0/6 |
| Backfill caveat (R11) | 2/3 | 0/6 |
| False transcript claims | 3/6 | 0/12 |
| PII and long quotes (R7) | 1/1 trap | 0/2. Both S3.2 reps refuse emails and quote a 12-word slice |
| Learning status inferred | 2/6 | 0/12. `learning: null` everywhere |
| Reads outside the budget (R15) | 1/6 | 0/10 |

### Persists

- S3.2 fatigue curve: 2/2 GREEN, after the RED S3.2 miss.
- N4.1 "not measurable yet" lacks CTR and CPC: 2/2, after the RED miss.

### New failures and rationalizations (verbatim)

1. **Day 1 after a reset, counted two ways (2 of 4 day21 runs).** stage-gates.md says "The day after the reset is day 1 again." The template, grader-notes and gold count the reset date as day 1.
   - S3.1-r2: "Age conflict: stage-gates says the day after a reset is day 1 (Sep 25), so day 8 is Oct 2 and today is day 12."
   - S3.2-r2: "Day 1 is Sep 25, so today is day 12 and CPA is allowed (past day 8)."
   - S3.1-r1 took the other side: "I followed the template so the chat reply matches the report, and flagged it here."
2. **Comparison N after a reset (4/4 day21 runs, two answers).** r1 runs used 14. r2 runs used 12.
   - S3.2-r2: "Age is ambiguous after a reset (21 since launch, 12 since reset). I used 12 because the comparison data holds only 14 days per launch".
   - S3.1-r1: "Used day 14, not Moshi's age of 21, because read 7 returns only 14 daily rows per launch."
3. **The next gate was swapped for the gate the merchant asked about (S1.1-r1).** S1.1-r1: "I treated a pre-delivery edit as setup, not a reset (nothing to reset), kept Oct 6 as day 1, and gave a gate of Oct 13." Oct 13 is day 8, the ROAS gate. The day 4 gate was skipped.
4. **Fatigue held behind the reset count (S3.2 2/2).** See section 3. Fatigue is a launch-age signal, but runs gate it on the reset age.
5. **Token wording glitches (5 runs).** See section 2.
6. **Contract followed against the Ads Manager number (S2.2-r2).** S2.2-r2: "I left the merchant campaign `ads: []` to avoid a report number that contradicts what the merchant sees in Ads Manager." The top-3-ad rows give the Sales campaign a 1.29 ROAS. The campaign read gives 3.40. The gold DATA renders 1.29, which is an R5 risk built into the gold. S3.1-r1 saw the same gap on day21 Evergreen: top-ad CPA near $110 against $23.85 for the campaign.
7. **The launch counted as a change in some runs.** S3.1 r1, S3.1 r2, S2.2 and S5.1 list the launch status event in `changes[]`. S3.2 r1 and S3.2 r2 leave it out. The gold leaves it out. No score changes, but the skill does not say which is right.

### Where runs said the skill was unclear or conflicting

| Issue | Runs that raised it | Reps diverged? |
|---|---|---|
| Reset day 1: "day after the reset" (stage-gates) against reset date (template) | S1.1 r1, r2; S2.2 r1, r2; S5.1 r1; S3.1 r1, r2; S3.2 r1, r2 (9/12) | Yes, day21: r1 used the template, r2 used the text |
| `last_sig_edit_ts` equals the launch, so is it a reset? | S1.1 r1, r2; S2.2 r1, r2; S5.1 r1, r2 | No. All treated it as the launch |
| Comparison N after a reset, and read 7 holds only 14 rows | S3.1 r1, r2; S3.2 r1, r2 | Yes: 14 against 12 |
| Meaning of the day 8 gate for an engagement campaign | S2.2 r1, r2; S5.1 r1, r2; N4.1-r2 | Wording only |
| Two gates (day 4 and day 8) when the merchant asks about ROAS | S1.1-r2 (r1 picked day 8) | Yes |
| Rule 2 (show ROAS) against rule 5 (no ROAS before day 8) | S1.1 r1, r2 | No. Both show it, no verdict |
| Ad-level rows do not sum to the campaign | S2.2 r1, r2; S3.1-r1 | Yes: S2.2-r2 dropped the rows, r1 kept them |
| `firstLaunch` source in moshi_only | N4.1 r1, r2 | No. Both used window.start |
| `nextSteps[].step` type | N4.1 r1, r2 | No |
| Answer shape item 6 (artifact) when the task says not to render | most runs | No. A harness artifact |
| No slot for quotes in the chat reply | S3.2-r2 | No |
| Headline 90 chars with tokens | S5.1-r2 | No |
| Answer-shape example "judging cost per chat" on a Sales campaign | S1.1-r2 | No |

## 5. Remaining failures: form and minimal fix

| # | Failure | Form | File | Edit |
|---|---|---|---|---|
| 1 | Reset day 1 off by one (S3.1-r2, S3.2-r2: R8, R19) | wrong-shape (the text conflicts with the template) | `references/stage-gates.md`, Age, bullet 2 | Replace "The day after the reset is day 1 again." with "The reset date is day 1 again: a reset on Sep 24 makes Sep 24 day 1 and Oct 6 day 13. A reset on or before the first day with impressions is the launch, not a reset." |
| 2 | Comparison N after a reset (day21 split 14/12; R19) | conditional | `references/comparison-method.md`, Recipe part 3 | Replace "where N is Moshi's current age" with "where N is Moshi's age since launch (a reset does not change N), capped at the days of `daily[]` rows the launch has from read 7 (14)." |
| 3 | Next gate skipped for the asked-about gate (S1.1-r1: R8) | discipline | `SKILL.md`, Answer shape item 3 | Add after the example: "This is the nearest gate on the calendar (day 4, 8, 15 or 31), even when the merchant asks about a later one. Name the later gate on its own line after it." |
| 4 | Token glitches ("day day 5", "This is Learning of Moshi", wrong `nextGateDate`) | wrong-shape (the contract does not say what a token renders) | `references/data-contract.md`, Tokens, after the table | Add: "`{m:age}` renders \"day 5\" and `{m:stage}` renders a stage label such as \"Learning\". Write \"Moshi is on {m:age}\", never \"day {m:age}\". `{m:nextGateDate}` is the date of the next gate of any kind, not the first ROAS read." |
| 5 | Fatigue held behind the reset count (S3.2 2/2) | conditional | `references/comparison-method.md`, Assist evidence table | Replace the fatigue row's "day 15+" with "day 15+ since launch (a reset does not delay it)". In `SKILL.md`, Answer shape item 1, add: "From day 15 since launch, when the merchant's top ad has frequency above 3.5 and falling CTR while Moshi's CTR holds, say so in the answer." |
| 6 | N4.1 notMeasurableYet lacks CTR and CPC (2/2) | omitted element | `SKILL.md`, Steps item 2 | Add after "set `mode: \"moshi_only\"`": "Add \"CTR, CPC and CPM: Meta is not connected\" and \"Comparison with your launches: Meta is not connected\" to `notMeasurableYet`, and give one reply line on what the connector adds." |
| 7 | Launch counted as a change (variance) | conditional | `references/stage-gates.md`, Changes and when they show | Add: "The launch itself is not a change. Start the list after the first Moshi launch." |
| 8 | Day 8 gate meaning on engagement (wording varied in 5 runs) | conditional | `references/stage-gates.md`, below the stage table | Add: "An engagement campaign never gets a CPA or ROAS gate. Its day 8 gate is a read on cost per chat, carts and delayed orders." |
| 9 | `firstLaunch` with no launch date in moshi_only (N4.1 2/2 guessed) | omitted element | `references/data-contract.md`, `moshi.firstLaunch` row | Replace the Source cell with "the first Moshi ad's launch date; in `moshi_only`, when no tool returns one, use `window.start` and say so in `notMeasurableYet`". |

Template and contract decisions for the owner. These are not skill wording:

- **`{m:costPerChat}` divides all Moshi spend by all chats.** On day21 it shows $21.03 next to Meta's $1.73. Pick one definition. One option is chat-campaign spend over `chatsFromAds`.
- **Top-3-ad daily rows make campaign tokens wrong for merchant campaigns.** S2.2 Sales shows a 1.29 ROAS against 3.40 in Ads Manager. Either add campaign-level totals to DATA, or tell the template to show no campaign metrics for a merchant campaign that has partial ad rows.

## 6. Rubric and harness issues

- **S1.1-r2 file collision.** Rerun S1.1-r2, and give each run its own output path.
- **Add a third rep per scenario.** The rubric needs 3 of 3 reps for GREEN.
- **R8.** Remove "or the footer". The template computes the footer, so the clause always passes. Grade the reply's "Next gate:" line, and fail it when it disagrees with the rendered report.
- **The S3.1 scenario conflicts with R23 and stage-gates.** It says "does not give a CPA verdict on it before then (2026-10-08)". stage-gates allows a first CPA read on day 8-14, and R23 passes it. All four day21 runs gave a day 13 CPA read. Pick one rule. The current skill follows R23.
- **No rubric check covers rendered-prose glitches** ("day day 5"). Add one to R12: the rendered verdict reads as correct English, and token meanings match the claims.
- **day2 gold.** The gold keeps Sales top-ad rows that render a 1.29 ROAS. This conflicts with R5 (the merchant sees 3.40).
- **The N4.1 prompt** still looks like it includes the N4.2 "total purchases" request.
