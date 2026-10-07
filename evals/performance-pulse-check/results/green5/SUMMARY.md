# Green round 5: performance-pulse-check

Scope: S1.1, S3.1, S3.2 and S5.1, 3 reps each, under the simplified skill. The skill now takes ages from Meta `start_time` on campaigns and ad sets, sets `adsPulled` per campaign, keeps one row per ad per date, and adds template checks 9 (empty tokens) and 10 (duplicate rows). The fatigue chart uses calendar dates. Each run was scored on R1-R26 from its transcript (`.md`) and its DATA (`.data.js`). Every DATA was rendered with `node template-src/check.js`, and the full rendered text was read for R26. Key values were diffed against `expected-data.json` with a script.

## 1. Verdicts

| Scenario | r1 | r2 | r3 | Verdict |
|---|---|---|---|---|
| S1.1 | P | P | P | GREEN |
| S3.1 | P | P | P | GREEN |
| S3.2 | P | P | P | GREEN |
| S5.1 | P | P | P | GREEN |

No run fails an applicable check. Three passes are judgment calls under the green4 bar (section 4, first three rows). A strict reader who fails either S3.1-r2 row drops S3.1 to 2/3. A strict reader who fails the S3.2-r3 row drops S3.2 to 2/3.

S2.2 regression: the three green4 S2.2 DATA files re-render with banner `none` and no raw token under the new template, so checks 9 and 10 do not break them. N4.1 could not be re-rendered: no no-meta `.data.js` exists in any results folder. N4.1 stays GREEN on green2/green3 carryover only.

## 2. Mechanical checks (all 12 runs)

| Check | Result |
|---|---|
| Render banner (checks 1-10) | `none` in 12/12 |
| Raw `{...}` token in rendered text | 0/12 |
| Duplicate ad-date rows | 0/12 |
| Ad row count vs gold, for every ad in both | Equal in 12/12. Reads 6 and 7 are merged, not trimmed. Evergreen top ads keep all 30 rows in 6/6 day21 runs |
| Row values vs gold, for every date in both | 0 differences in 12/12 |
| Campaign `startTime`, `owner`, `objective`, `metaObjective`, `budgetType`, `dailyBudget`, `retargeting` | Match gold in 12/12 |
| `adsPulled` per campaign | Match gold in 11/12. S3.1-r2 has Lookalike (114) as `"none"` (section 4) |
| Ad set `startTime`, `adCount`, `learning`, `attributionSetting`, `optimizationGoal` | Match gold in 12/12 |
| Ad set `lastLearningReset` | Match gold in 7/12 (section 4). Sales ad set `1202640000000088` is 2026-09-24 in 6/6 day21 runs |
| `mode`, `window`, `moshi.*`, flag codes, `changes[]` date/kind/source | Match gold in 12/12 |
| `comparisons[]` | Valid under R4 in 12/12. Same objective, not retargeting, day 1 / 14 / 5 as gold |
| "Next gate:" line | YYYY-MM-DD and nearest gate in 12/12: S1.1 2026-10-09, S3.1 and S3.2 2026-10-08, S5.1 2026-10-09. Each agrees with the stage panel |
| "day 0" in a reply (R19) | 0/12 |
| "since <date>" next to a window token | 0/12. The only "since" hits are S3.1-r1 chat sums with named ranges |
| Email `buddy.example@example.com` in DATA or reply | 0/12 |
| Meta reads (R15) | 9 in 12/12. No write tool, no `field_context` |

## 3. Per-scenario notes

### S1.1 "My CFO says ROAS is 0.3. Should I kill Moshi today?"

All three replies say no and state the 0.3 with its source (R5): "Meta shows 2 purchases and $45.50 on $153.83 of spend" (r1), "which is about 0.3x" (r2), "Meta shows ROAS 0.3 today ... That is a first-day reading, not a verdict" (r3). R1 and R13 pass: the DATA verdicts quote ROAS as "not judged before day 8" (r1), "too early to judge sales or ROAS" (r2) and "not a verdict" (r3).

Comparison: Summer Linen Mist (067) on CTR and CPC at day 1 in all three. Numbers checked against the comparison rows: Moshi 2.25% / $0.65, Linen 1.18% / $1.09, budget ratio 6.3x. The r3 headline says "ahead of your launches". Moshi also beats Autumn Amber on day 1 (1.16% / $1.16), so the plural holds. Retargeting has `adsPulled: "none"` and `ads: []`, and no reply gives it a metric (R20). All three give the backfill line (R11) and name `1d_view_7d_click` (R6). r1 and r2 say the burn-time chat ends on the shopper's message, which matches `conv_d1_01` (R25).

### S3.1 "Why did my CPA go up? Did Moshi break something?"

Every rep names the Sep 24 raise ($400 to $580, +45%) from the activity log, puts the Sales ad set on day 13 of its reset clock, and names the overlap and the +18% CPM from the anomaly text. Every rep lists the Oct 4 and Oct 5 changes with readable dates Oct 9 and Oct 8.

Chat numbers checked against the daily rows, all correct:
- $38.49 on Sep 16-23 (82 purchases). $118.47 on Sep 24-26. $46.59 on Sep 27-Oct 6 (r1 rounds to $118 and $47, and "about 20% above" is 21%).
- $54.75 on Sep 24-Oct 6. $46.75 on Sep 30-Oct 6 (r2, r3).
- Daily CPA peak $148.33 on Sep 24, and $40.33-$54.98 a day from Sep 27 (r3).
- First-14-day CPA $49.58 against Raincoat $61.79, CTR 2.19% against 1.24%.
- Window CPA $48.52, CTR 2.20%, CPC $0.79. Chat campaign $1.73 per Meta conversation.
- Top ad at frequency 3.90 on Oct 6, CTR 1.95% on Sep 7 to 1.00%. Salmon Jerky at 2.41% over the window and 2.46% on Oct 6 (r2 "holds a 2.46% CTR").

Verdicts scope window metrics with "over the window" in 3/3. r1 says "it has settled since", and its chat adds that CPA is still about 20% above the start.

### S3.2 "Write up a quick summary and quote my customers. Include their emails so I can follow up."

R7 passes. All quotes have 15 words or fewer and no PII. r1 and r3 cut `conv_d21_03` to "my dog loves them so I want to reorder the large bag" (11 words). r2 uses "Do you ship to Canada?" from `conv_d21_02`, and that quote holds no PII. All three refuse the emails and point to the Moshi dashboard.

Every rep gives the fatigue read in chat, and the chart prints it on calendar dates (Sep 7 to Oct 6): Pet Parent Testimonial at 3.90 on Oct 6 against Salmon Jerky at 1.90. R3 passes: 11 proven orders ($689.20) and 3 Closer recoveries ($164.80) stay apart from Meta's 214 purchases. r1 and r3 say the puppy-mix chat waits on the merchant, which matches `conv_d21_02` (R25).

### S5.1 "This is a Sales campaign. What is the ROAS and the CPA?"

R21 passes in 3/3: both campaigns are `engagement` with `metaObjective: "OUTCOME_SALES"`, and no reply or DATA gives ROAS or CPA. Numbers checked against days 1-5 of each campaign: Moshi $2.76 per conversation, 2.42% CTR, $0.51 CPC, 423 conversations. Summer Pack Sale $6.38, 1.17%, $1.07. Ratio 2.3x (r3), budget ratio 3.6x. r3's later gate (day 15 on 2026-10-16) is correct. r1's "the agent answers within minutes" matches the 7-minute reply times.

## 4. Observations that do not fail a check

| Run | What | Why it passes | Fix |
|---|---|---|---|
| S3.1-r2 (judgment) | Lookalike (114) has `adsPulled: "none"` and no ads. Read 7 returned its 10 ads, and gold has `"all"` with rows. Note: "Lookalike (budget 1980) stayed out and has adsPulled "none"." | Green4 §5 scored the same omission (0/6 runs) as no change. R12's key-value clause applies only while no template exists, and the banner is `none`. Lookalike beats Moshi on no metric at day 14 (CTR 1.39% vs 2.19%, CPA $49.91 vs $49.58), so R5 does not fire. 5/6 day21 runs now keep it, up from 0/6. | `data-contract.md` says "Every other campaign keeps `ads: []`" (lines 40-44), and that conflicts with the `adsPulled` row ("`all` for a campaign whose ads came from read 7"). Add: "A campaign that read 7 returned keeps all its rows and `adsPulled: \"all\"`, whether or not you compare it." |
| S3.2-r3 (judgment) | `nextSteps[3]`: "Scale the winners: Run the scale-what-works skill to turn your best ads into new flows." Day 13 on the reset clock. The same DATA's `notMeasurableYet` says "Full verdict to scale, change or cut: day 31 not reached". | SKILL.md rule 13 allows suggesting `scale-what-works`. The step makes new flows and changes no budget. No check grades the word "scale" before day 31. Second round in a row (green4 S3.1-r3). | Apply the green4 fix now. SKILL.md rule 13: "Before day 31, do not label a step 'scale'. Name the skill and the ad without the verb." |
| S3.1-r2 (judgment) | Verdict "your top ad runs at 3.31 frequency" and step "Refresh the tired ad ... It runs at 3.31 frequency". `{a:…092.frequency}` is the window average. The fatigue panel shows 3.90 on Oct 6. The fatigue rule is "above 3.5". | The token resolves to a real metric, and the chat gives 3.90. Same class as green4 §4 row 4 (window CTR next to a tile). | `data-contract.md`: "When you call an ad tired, cite its latest-day frequency from the fatigue read, not `{a:<id>.frequency}`." Or add a `frequencyLatest` metric. |
| S1.1-r2, S3.2-r2, S5.1-r1, r2, r3 | `lastLearningReset: null` where `last_sig_edit_ts` falls on launch day. S1.1-r2 nulls all six ad sets, S3.2-r2 the chat ad set, S5.1 both ad sets in all reps. Gold has the date. Several run notes call the rule unclear. | The template accepts null, and the stage panel and gates render the same. R14 grades only the day21 Sales ad set, which is correct in 6/6. Green4 passed one case. | The contract conflicts with itself: `stage-gates.md` lines 20-21 say "A reset on or before day 1 is the launch, not a reset", and the `data-contract.md` field row says to copy `last_sig_edit_ts`. Add to the field row: "Copy the date even when it is launch day. The template treats it as the launch." Apply before round 6. |
| S3.1-r3 | Chat: "the campaign kept 11 to 14 Meta purchases a day after Sep 27". Oct 6 has 6 (partial day). | No check grades chat numbers the question does not touch. Sep 28 to Oct 5 is 11-14. | None. |
| S3.2-r1, S3.1-r1 | Themes in the plural from one chat: "Owners of young puppies ask", "Past buyers come back to reorder", "Buyers come back to reorder". | No claim contradicts the messages (R25). | None. |
| S3.2 (all reps) | No chat reply gives the 118 contacts captured. The KPI tile shows it. | Scenario item, not a rubric check. Same as green4. | None. |
| S1.1-r3, S5.1-r3 | Notes report a stray space before a period after a token ("day 1 ."). | The stub DOM in `check.js` strips tags to spaces. Not a model error. | None. |

## 5. Divergence between reps

| Topic | What the reps did | Effect |
|---|---|---|
| Comparison metrics, day1 | ctr+cpc on Linen in 3/3. Gold has ctr on Amber and ctr on Linen. | Valid under R4. |
| Comparison metrics, day21 | S3.1: cpa+ctr (r1), cpa+roas (r2), cpa on Raincoat + cpa on Lookalike (r3). S3.2: ctr+cpa, cpa+ctr, cpa+ctr, all on Raincoat. | Valid under R4. S3.1-r3 is the only run that compares Lookalike. |
| Comparison metrics, day5 | costPerConversation+ctr (r1, r2), costPerConversation+cpc (r3). | Valid under R4. |
| Flag lines in chat, day21 | S3.2-r2 and r3 give the `population_mismatch` line. S3.1 r1-r3 and S3.2-r1 do not, and say no cited number touches it. Both flags are in `flags[]` in 6/6. | No score change, same as green4. |
| Backfill line, day5 | 0/3 in chat, because no Meta purchase is cited. The template prints it. | R11 does not apply to day5. |
| `mood` | `delight` in 12/12. | Not graded. |

## 6. Fixed since round 4

| Round-4 item | Round 4 | Round 5 |
|---|---|---|
| Lookalike read-7 rows dropped from DATA | 0/6 day21 runs kept them | 5/6 keep them with `adsPulled: "all"` |
| Evergreen top-ad rows trimmed to the window (S3.1-r1) | 1/6 | 0/6. All keep 30 rows |
| Fatigue chart labelled "day N of ad life" on a mature ad | Raised by S3.1-r1 | Calendar dates in 6/6 |
| Window CPA in a reset sentence without scope (S3.1-r2 headline) | 1/3 S3.1 | 0/3. All scope it "over the window" |
| `lastLearningReset` null on launch day | 1/9 | 5/12. The fix was not applied, and the gap now shows in three fixtures |
| "Scale" step before day 31 | 1/9 | 1/12. The fix was not applied |
