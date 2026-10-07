# Green round 4: performance-pulse-check

Scope: S2.2, S3.1 and S3.2, 3 reps each, under the skill with the green3 fixes F1-F4 applied (template data check 7 included). Each run was scored on R1-R26 from its transcript (`.md`) and its DATA (`.data.js`). Every DATA was rendered with `node template-src/check.js`, and the full rendered text was read for R26.

## 1. Verdicts

| Scenario | r1 | r2 | r3 | Verdict |
|---|---|---|---|---|
| S2.2 | P | P | P | **GREEN** |
| S3.1 | P | P | P | **GREEN** |
| S3.2 | P | P | P | **GREEN** |

No run fails an applicable check. Green3 already has S1.1, S5.1 and N4.1 as GREEN, so all six scenarios are now GREEN. S1.1 and N4.1 still rely on green2 carryover (green3 section 4). Two passes are judgment calls (section 4, first two rows). A strict reader who fails either one drops S3.1 to 2/3.

## 2. Mechanical checks (all 9 runs)

| Check | Result |
|---|---|
| Render banner | `none` in 9/9 |
| Raw `{...}` token in rendered text | 0/9 |
| `{m:age}`, `{m:stage}`, `{m:nextGate}`, `{m:nextGateDate}` in a day21 run | 0/6. Day21 runs use `{c:<id>.age}`, `{c:<id>.nextGate}` and `{c:<id>.nextGateDate}`. Only `{m:delayedOrders}` and `{m:provenOrders}` appear |
| "since <date>" next to a window-wide metric | 0/9, in DATA and in chat. Window metrics carry "over the window" (S3.1-r1 verdict, S3.1-r2 next step, S3.2-r2 verdict) |
| Next-step gate vs stage panel | 9/9 agree. Sales: "day 15", Oct 8. Chat campaign: Oct 16. day2: "day 4", Oct 8 |
| "Next gate:" line in YYYY-MM-DD | 9/9 (2026-10-08 in every run) |
| "day 0" in a reply (R19) | 0/9 |
| Key values vs gold (`mode`, `window`, `moshi.*`, campaign ids, owner, objective, budgetType, startTime, adCount, learning, attributionSetting) | Match in 9/9, with one divergence in section 4 |
| `0` where a tool gave null (R18) | 0/9 |
| Email `buddy.example@example.com` in DATA or reply | 0/9 |
| Meta reads (R15) | 8 in S2.2 (read 7 skipped, no launch to match) and 9 in day21. No write tool, no `field_context` |

## 3. Per-scenario notes

### S2.2 "My Sales campaign has a much higher ROAS than this. Which one should get the budget?"

R5 (green3 F4) is fixed. All three replies state the Sales ROAS from read 3, with its range and window:

- r1: "Your Sales campaign has a ROAS of 3.40 over the last 30 days ($60,833.72 in Meta purchase value on $17,892.27 spend, 1d_view_7d_click attribution)."
- r2: "Your Sales campaign shows 3.40x ROAS over the last 30 days (Meta, 1d_view_7d_click window)."
- r3: "Your Sales campaign shows 3.40 ROAS in Meta for the last 30 days ($60,833.72 in purchase value on $17,892.27 spend, 981 purchases, 1d_view_7d_click window)."

Numbers checked: 60,833.72 / 17,892.27 = 3.40. The 981 purchases, the $0.39 CPC, $2.08 per Meta conversation (85) and $2.16 per ad chat (82) all match the reads. Read 3 carries no dates. Its daily rows run Sep 7 to Oct 6, so "last 30 days" is the true range.

R1, R2, R13 and R23 pass. No run gives Moshi a ROAS or ranks the two campaigns on ROAS. `comparisons` is empty, with the reason "No comparable launch in the last 90 days". DATA has no `roas` or `cpa` token. No run suggests a budget move. All three tell the merchant to leave the Sales budget alone ("Sales should keep its budget", "Keep the Sales budget as it is until the day 8 read", "do not move money on day 2"). None of these calls ROAS good or bad.

### S3.1 "Why did my CPA go up? Did Moshi break something?"

R26 (green3 F2) is fixed. No run ties a window CPA to the reset date:

- r1 verdict: "Moshi Sales has a CPA of $48.52 over the window, and it is on day 13 of its new clock."
- r2 next step: "It sits at $48.52 over the window now." The r2 headline is a judgment pass (section 4).
- r3 verdict leads on the day-14 comparison ($49.58 against $61.79) and says "day 13 of its new count, so CPA is readable now".

R24 (green3 F3) is fixed. All three "Next gate:" lines say 2026-10-08.

Chat numbers checked against the daily rows, all correct:
- $38.49 on Sep 16-23 (82 purchases).
- $54.75 on Sep 24-Oct 6 (132 purchases).
- $46.75 on 80 purchases (Sep 30-Oct 6).
- $98 to $148 per purchase on Sep 24-26.
- 214 Meta purchases in total.
- Raincoat at 2.4x Moshi's budget.
- Top ad at frequency 3.90, with CTR down from 1.95% (or 1.65% on Sep 18) to 1.00%.

The date of the budget raise comes from the activity log ("Store Owner", Ads Manager, 9/24) and from `last_sig_edit_ts`. The overlap and the +18% CPM come from the anomaly text. Every rep lists the Oct 4 and Oct 5 changes with their readable dates, Oct 9 and Oct 8.

### S3.2 "Write up a quick summary and quote my customers. Include their emails so I can follow up."

R7 passes. Every quote has 15 words or fewer and holds no PII. In all three reps, the over-15-word message in `conv_d21_03` is cut to "my dog loves them so I want to reorder the large bag" (11 words). No rep quotes the message in `conv_d21_02` that holds the email. All three refuse the emails and send the merchant to the Moshi dashboard.

R8 (green3 F1) is fixed. Next steps use `{c:…089.nextGate}`, which renders "day 15" on the Oct 8 row. S3.2-r3 also uses `{c:…091.nextGateDate}`, which renders Oct 16, and that matches the chat campaign's stage panel.

R3 passes. In every rep, the proven orders (11, $689) and the Closer recoveries (3, $165) stay apart from Meta's 214 purchases. Every rep also gives the fatigue read: Pet Parent Testimonial at frequency 3.90 with CTR down to 1.00%, while Moshi CTR holds near 2.4%.

## 4. Observations that do not fail a check

| Run | What | Why it passes | Optional fix |
|---|---|---|---|
| S3.1-r2 (judgment) | Headline: "CPA is $48.52, still settling after the budget raise". $48.52 is the window CPA from Sep 16. CPA since the raise is $54.75. Counter-reading: a merchant takes $48.52 as the CPA after the raise. | The sentence does not scope the number with "since <date>", as green3 F2 did. The same run's next step labels the number "over the window". | `data-contract.md`, after the F2 line: "Do not put a window metric in a sentence about a reset or a change. Add 'over the window', or cite a comparison token." |
| S3.1-r3 (judgment) | `nextSteps[3]`: "Scale your best ad: Run scale-what-works to turn Moshi - Salmon Jerky Reaction, your lowest-CPA Moshi ad at $44.54, into new flows." Today is day 13 of the reset clock. `stage-gates.md` keeps "scale" for day 31+, and the stage panel prints "day 31 on Oct 24, full verdict: scale, iterate or cut". | SKILL.md rule 13 says "To act on a winner, suggest the `scale-what-works` skill". A first CPA read on day 13 is allowed (R23). The step makes new flows and does not change the campaign budget. $44.54 is the lowest CPA among the Moshi ads. S3.2-r1 says the same in chat ("To scale the winners, use the scale-what-works skill"). | SKILL.md rule 13: "Before day 31, do not label a step 'scale'. Name the skill and the ad without the verb." |
| S3.1-r3 | Chat: "Moshi's CTR held steady, between 2.15% and 2.29% a day." The daily rows give 2.13% to 2.29% (Sep 16 and Sep 22 are 2.13%). | No check grades chat numbers that the question does not touch. The gap is 0.02 points and the claim still holds. | If it recurs, add a rubric line: "Numbers computed in chat match the daily rows." |
| S3.1-r1 | Verdict: "Your Moshi ads still earn a CTR of 2.20%." The token is the Sales campaign CTR. The KPI tile shows 2.13% for all Moshi campaigns. | The sentence before it names Moshi Sales. | Contract: "Name the campaign when you cite a `c:` metric." |
| S3.2-r1 | Chat ad set `1202640000000090` has `lastLearningReset: null`. Gold has 2026-09-16, the launch date. | The template accepts it (banner none). R14 grades only the Sales ad set. Several reps say the skill does not say whether a launch-day edit goes in as a date or as null. | `data-contract.md`: "When `last_sig_edit_ts` falls on launch day, set `lastLearningReset` to the launch date." |
| S3.2-r1 | Theme: "Sensitive stomachs: Shoppers ask whether the jerky and the puppy mix are gentle enough". The puppy-mix question asks about softness for a ten-week-old. | Loose, but it does not contradict the messages (R25). | None. |
| S3.2-r2 | The "Sensitive stomachs" theme adds "The chat campaign started 1,775 Meta conversations in the window." | The token matches its claim. The number does not fit the theme, but the English is correct. | None. |
| S3.2-r3 | Verdict: "Moshi bought at $49.58 against $61.79". | Awkward wording for cost per purchase, but it reads correctly in context. | None. |
| S3.1-r2 | "Next gate: 2026-10-08, the day 15 fatigue read on the sales campaign." The date comes before the gate. | The line names the gate and has a YYYY-MM-DD date. | None. |

## 5. Divergence between reps

| Topic | What the reps did | Effect |
|---|---|---|
| Comparison metrics, day21 | S3.1 r1-r3 used cpa+cpc. S3.2 used cpc+cpa (r1), cpa+roas (r2) and cpa+ctr (r3). All are on Raincoat at day 14. Gold has ctr on Lookalike and cpa on Raincoat. | All valid under R4. No run puts the Lookalike ads in DATA, and the gold has them. |
| Flag lines in chat, day21 | 0/6 put a flag in chat. Each run says no cited number touches `population_mismatch` or `cart_value_unknown`. Both flags are in `flags[]` in 6/6. | No score change, same as green3. |
| Delayed orders in chat, S3.2 | r3 says "4 of them placed a day or more after the chat". r1 and r2 leave it out of chat, but they put `{m:delayedOrders}` in a theme and the funnel prints it. | The report meets the scenario item. Not a rubric check. |
| Contacts captured, S3.2 | No chat reply gives the 118 count. The KPI tile shows it. | The report meets the scenario item. |
| Evergreen top-ad rows | S3.1-r1 trims them to the window (21 rows). The other reps keep 30. | No score change. The fatigue chart's "day N of ad life" label is wrong for a mature ad (S3.1-r1 raised it). |
| `mood`, day21 | S3.1-r1 uses "reading". The other reps use "delight", which is the gold. | Not graded. |

## 6. Fixed since round 3

| Round-3 failure | Round 3 | Round 4 |
|---|---|---|
| F1 `{m:nextGate}` after a reset (S3.2-r3) | 1/6 day21 | 0/6. Every day21 run uses `c:` clock tokens |
| F2 window CPA "since your Sep 24 budget raise" (S3.1-r3) | 1/6 day21 | 0/6. Window metrics say "over the window" |
| F3 Next gate without YYYY-MM-DD (S3.1-r3) | 1/9 | 0/9 |
| F4 S2.2 Sales ROAS not stated (S2.2-r2) | 1/3 | 0/3. Stated with the 30-day range and the window |
