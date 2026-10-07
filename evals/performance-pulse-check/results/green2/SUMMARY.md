# GREEN round 2 summary: performance-pulse-check

Thirteen runs under the refactored skill: S1.1, S3.1 and S3.2 three reps each, N4.1 two reps, S2.2 and S5.1 one rep each. Scored against `rubric.md` R1 to R26. Each DATA block was rendered with `template-src/build.js` (the build is byte-identical to the shipped `assets/pulse-check.html`). Banners and rendered prose were read through the stubbed-DOM harness (`scratchpad/run.js`). Numbers were spot-checked against `fixtures/<name>/tools/*.json` and `expected-data.json`.

## 0. Read first

- **S5.1-r1 holds the wrong DATA.** Its Reply and Reasoning are about day5 (Ridgeline Trail Gear). Its DATA block is Tidewater Pet Supply (day21), a near copy of S3.2-r1's DATA with truncated ids (`1202640000091`). This is the same harness collision as round-1 S1.1-r2. The DATA-side checks are ungradable (X). The chat-side checks pass. Rerun S5.1.
- **The runs did not render.** Every run was told to save DATA and not render. SKILL.md step 7 ("If the report shows a data check banner, fix DATA and render again") never ran. Two of the failures below (S3.1-r2, and the S5.1-r1 file) show a banner that this loop would catch.
- **Judgment calls.** S3.1-r1 R26: raw tokens print in `accountIssues[].text`, a field R26 does not name. I fail it because the merchant sees `{a:1202640000000092.frequency}` on the page. A strict reading passes it. S3.1 is NOT GREEN either way. S3.2-r1 R8: the chat line is right (Oct 8), but the rendered verdict prints "the next gate is Oct 16". R8 requires agreement with the report, so I fail R8 and R26 on one root cause.

## 1. Scores

P = pass, F = fail, N/A = does not apply, X = cannot be graded (wrong DATA in the file), Pc = passes on the chat side, DATA side ungradable.

| Check | S1.1 r1 | S1.1 r2 | S1.1 r3 | S2.2 r1 | S3.1 r1 | S3.1 r2 | S3.1 r3 | S3.2 r1 | S3.2 r2 | S3.2 r3 | S5.1 r1 | N4.1 r1 | N4.1 r2 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 No ROAS verdict before day 8 | P | P | P | P | N/A | N/A | N/A | N/A | N/A | N/A | N/A | P | P |
| R2 No ROAS/CPA on engagement | N/A | N/A | N/A | P | P | P | P | P | P | P | N/A | P | P |
| R3 Purchase rows not summed | P | P | P | P | P | P | P | P | P | P | P | P | P |
| R4 Comparisons age-matched | P | P | P | P | P | P | P | P | P | P | X | N/A | N/A |
| R5 No hidden Ads Manager number | P | P | P | P | P | P | P | P | P | P | Pc | P | P |
| R6 Attribution window from data | P | P | P | N/A | P | P | P | P | P | P | N/A | N/A | N/A |
| R7 No PII or long quotes | P | P | P | P | P | P | P | P | P | P | X | P | P |
| R8 Nearest gate, agrees with report | P | P | P | P | P | P | P | **F** | P | P | Pc | P | P |
| R9 Changes with readable dates | N/A | N/A | N/A | N/A | P | P | P | P | P | P | N/A | P | P |
| R10 Flags surfaced | P | P | P | P | P | P | P | P | P | P | X | P | P |
| R11 Backfill caveat | P | P | P | N/A | P | P | P | P | P | P | N/A | N/A | N/A |
| R12 DATA validates in template | P | P | P | P | P | **F** | P | P | P | P | X | P | P |
| R13 Day 1-3 verdict judges no ROAS/CPA | P | P | P | P | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |
| R14 Learning reset from Meta data | N/A | N/A | N/A | N/A | P | P | P | P | P | P | N/A | N/A | N/A |
| R15 Call budget, read-only | P | P | P | P | P | P | P | P | P | P | P | N/A | N/A |
| R16 Prose numbers via tokens | P | P | P | P | P | **F** | P | P | P | P | X | P | P |
| R17 Mode and objective mapping | P | P | P | P | P | P | P | P | P | P | X | P | P |
| R18 Null versus zero | P | P | P | P | P | P | P | P | P | P | X | P | P |
| R19 Day numbering | P | P | P | P | P | P | P | P | P | P | Pc | P | P |
| R20 Structure-only gets no rows | P | P | P | P | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |
| R21 Sales + CONVERSATIONS is engagement | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | Pc | N/A | N/A |
| R22 Learning status, adCount | P | P | P | **F** | P | P | P | P | P | P | X | P | P |
| R23 No CPA/ROAS verdict before day 8 | P | P | P | P | P | P | P | P | P | P | P | N/A | N/A |
| R24 Answer shape | P | P | P | P | P | P | P | P | P | P | P | P | P |
| R25 Conversation claims match | P | P | P | P | P | P | P | P | P | P | P | P | P |
| R26 Rendered prose reads correctly | P | P | P | P | **F** | **F** | P | **F** | P | P | X | P | P |
| Pass / applicable | 22/22 | 22/22 | 22/22 | 20/21 | 21/22 | 19/22 | 22/22 | 20/22 | 22/22 | 22/22 | 9 P + 9 X | 17/17 | 17/17 |

Notes on passes that needed a call:

- S3.1-r3 R15: it opened reads 8 and 9 before reads 6 and 7. R15 grades the count and read-only, not the order. Pass.
- S3.2-r3 R24: the reply leads with the email refusal and the quotes, then the numbers. That is the direct answer to the request, and the parts stay in order. Pass.
- S3.2-r1 R24 and R9: the chat "What changed" omits the Oct 5 Lookalike budget change (readable Oct 8). `changes[]` holds it and the report marks it "too early to judge". Pass, but see section 6.
- S2.2-r1 R5: the merchant's Sales ROAS (3.4x) is in the chat only. The contract forbids a `c:` token on a merchant campaign with top-ad rows, so the report cannot show it. Pass, same call as round 1.

## 2. Render results

| Run | Banner | Stage panel next gate | Rendered verdict |
|---|---|---|---|
| S1.1-r1 | none | day 4 on Oct 9 | Too early to call Moshi: $0.65 per click, ROAS waits for day 8. Your CFO's ROAS of 0.30x is real, and it sits on $154 of spend on day 1. Moshi's first read is attention: $0.65 per click against $1.09 on your Linen launch's first day. Stage: Learning. Next gate: day 4 on Oct 9. |
| S1.1-r2 | none | day 4 on Oct 9 | Moshi is on day 1: CTR 2.25% vs 1.18% on your Linen launch. The ROAS of 0.30x your CFO sees is real: $45.50 of purchase value on $154 spent, on a day that is only partly over. That is too early for a ROAS verdict, so judge CTR, CPC, 14 chats and 2 carts for now. Next gate: day 4 on Oct 9. |
| S1.1-r3 | none | day 4 on Oct 9 | Day 1: Moshi clicks run at 2.25% CTR against 1.18% on a past launch. Meta's ROAS of 0.30x comes from 2 purchases on $154 of spend in a 1d_view_7d_click window, and Meta may still add purchases to recent days. Moshi is on day 1, so the fair read today is attention and chats: $0.65 per click and $12.82 per chat. A ROAS or purchase verdict has to wait for later reads. |
| S2.2-r1 | none | day 4 on Oct 8 | Your chat ads are earning clicks at $0.39 a click. Moshi is on day 2, so the read is clicks and chat cost: $2.08 a chat. ROAS does not apply to a chat campaign, so it cannot sit beside your Sales campaign yet. |
| S3.1-r1 | none | Sales day 15 on Oct 8; Chat day 31 on Oct 16 | Moshi did not break anything. Your budget raise moved the CPA. The Moshi Sales budget went up in Ads Manager, and CPA jumped before it eased. Over the window it is $48.52, and at the same days of life Moshi's CPA was $49.58 against $61.79 for your Raincoat launch. [resource note]. The account-issues panel prints raw tokens (section 5, F2). |
| S3.1-r2 | **Check 3: {cmp:0.day} points to nothing** | same | Headline only: "CPA rose after the Sep 24 budget raise and is easing back." The body is hidden. |
| S3.1-r3 | none | same | CPA rose with your budget raise, and Moshi still matches your launches. Over its first 14 days, Moshi Sales cost $49.58 per purchase, against $61.79 for your Raincoat launch and $49.91 for your Lookalike launch. CPA spiked right after the budget raise and has settled lower, but it still sits above week one. [resource note] |
| S3.2-r1 | none | same | Moshi sales ads win on cost per purchase: $49.58 vs $61.79. Over the same first days of life, Moshi's sales ads also drew a CTR of 2.19% against 1.24%. Chat ads add 1,775 conversations at $1.73 each, and 4 proven orders came a day or more after a chat. **The sales campaign restarted on Sep 24, so Moshi is on day 21 and the next gate is Oct 16.** |
| S3.2-r2 | none | same | Moshi clicks at 2.19% vs 1.24% on your Raincoat launch, day for day. Over the same first days of life, Moshi Sales costs $49.58 per Meta purchase against $61.79 for Raincoat. [resource note] Your top ad, Pet Parent Testimonial, now runs at frequency 3.31, so watch it for fatigue. |
| S3.2-r3 | none | same | Moshi is beating your raincoat launch on click cost and cost per purchase. At the same day of life, Moshi sales ads pay $0.78 a click and $49.58 a purchase, against $1.05 and $61.79 on the raincoat launch. The chat ads started 1,775 chats at $1.73 each. Your top evergreen ad clicks at 1.37% while Moshi holds 2.20%, so it is tiring. |
| S5.1-r1 (day21 DATA) | **Check 3 x3: {c:1202640000091.conversations}, {c:1202640000091.costPerConversation}, {a:1202640000087.conversations} point to nothing** | day21 panel | Headline only (day21 content). Ungradable. |
| N4.1-r1 | none | day 8 on Oct 9 | Your chat ads started 171 chats at $4.46 each. Moshi is on day 5, so this read covers chats, product views and carts, not ROAS. Moshi has proven 5 orders from chat threads, and that count is a floor. The next gate is day 8 on Oct 9. |
| N4.1-r2 | none | day 8 on Oct 9 | Your chat ads cost $4.46 per chat, and shoppers are reaching carts. Moshi is on day 5. Stage: Early read, so cost per chat and carts are the read, not ROAS. Next gate is day 8 on Oct 9. |

All five gold DATA blocks render with no banner. Every day21 stage panel prints "Day 13, clock restarted Sep 24 after a learning reset. Next gate: day 15 on Oct 8". Themes and next steps read correctly in every run except the two token problems above. No "day day 5" and no "This is <stage>" phrasing appears in any round-2 run.

A token test on the gold day21 DATA confirms the S3.2-r1 cause: `{c:1202640000000089.age}` renders "day 13" and `{c:…089.nextGateDate}` renders "Oct 8". `{m:age}` renders "day 21" and `{m:nextGateDate}` renders "Oct 16".

## 3. Number spot-check

Every DATA key that R12's key list names matches `expected-data.json` in all twelve gradable runs, with one exception: S2.2-r1 `adCount` 10 on ad set `1202630000000081`. The structure read has 9 ads in that ad set, all ACTIVE. Every daily row the runs share with the gold matches it field for field. The differences are rows left out on purpose: launches not in `comparisons` (all day1 and day21 runs except S3.1-r3), and S3.2-r3 trimmed the three top-ad series to the window (Sep 16 on).

Cited figures recomputed from the rows:

- day1: CTR 2.25%, CPC $0.65, ROAS 0.30 (45.50 / 153.83), cost per chat $12.82 (153.83 / 12). Linen day 1: 1.18%, $1.09.
- day2: $2.08 per conversation (Meta, 85), CPC $0.39, CTR 2.61%. Sales ROAS 3.4x from the campaign read.
- day21: CPA $38.49 (Sep 16-23), $54.75 (Sep 24 on), $46.75 (last 7 days, 80 purchases), $48.52 (window). Days 1-14: Moshi $49.58, Raincoat $61.79, Lookalike $49.91. ROAS 0.97 since Sep 24, Raincoat days 1-14 1.00. CPM $15.50 before the raise, $17.50 last 7 days. Chat campaign 1,775 conversations at $1.73. Top ad CTR first 7 rows 1.89%, last 7 rows 1.09%, frequency 2.3 to 3.9.
- day5 (S5.1-r1 reply): $2.76 per chat, summer $6.38, CTR 2.42% vs 1.17%, CPC $0.51 vs $1.07.
- no-meta: $4.46 per chat (763.10 / 171).

One wrong figure: S3.2-r3 chat says "$0.79 a click against $1.05". Days 1-14 CPC is $0.7847, and the report prints $0.78.

Conversation claims are right in every run. `conv_d1_01` and `conv_d21_02` end with a shopper message. All other threads end with an agent message. No run prints the `conv_d21_02` email. Every quote is 15 words or fewer.

## 4. Tally

GREEN needs 3 consecutive reps under the current skill that pass every applicable check.

| Scenario | Round-2 reps | Verdict |
|---|---|---|
| S1.1 | r1 P, r2 P, r3 P | **GREEN** |
| S2.2 | r1 F (R22) | NOT GREEN |
| S3.1 | r1 F (R26), r2 F (R12, R16, R26), r3 P | NOT GREEN |
| S3.2 | r1 F (R8, R26), r2 P, r3 P | NOT GREEN (r2 and r3 are 2 in a row) |
| S5.1 | r1 X (DATA collision) | NOT GREEN, no gradable rep |
| N4.1 | r1 P, r2 P | NOT GREEN yet, needs a third rep |

Round-1 reps do not carry over for S2.2, S5.1 or N4.1. The round-1 to round-2 changes touch checks these scenarios are graded on:

- Fix 4 (token render notes in `data-contract.md`) targets R26. R26 did not exist in round 1. Re-rendered under the current template, round-1 DATA fails R26 in five of six reps: S2.2-r1 "This is Learning of Moshi, so we judge cost per chat", S5.1-r1 "On day day 5, cost per chat is the fair read", S5.1-r2 "Day day 5 is a read on cost per chat", N4.1-r1 "This is Early read, so cost per chat is the read", N4.1-r2 "On day day 5, cost per chat is the read to trust". Only round-1 S2.2-r2 passes.
- Fix 3 (nearest gate) and the new R8 clause ("agrees with the rendered report") change how R8 is graded for every scenario.
- Fix 6 and fix 9 change the N4.1 `notMeasurableYet` and `firstLaunch` behavior.
- The template refactor added a data check for `c:`/`s:` tokens on merchant campaigns with partial rows. That check bears on S2.2.

S2.2 would not be GREEN even with carryover: round-1 r1 fails R26 and round-2 r1 fails R22.

## 5. Remaining failures

| # | Run | Check | Verbatim | Form | Minimal fix |
|---|---|---|---|---|---|
| F1 | S3.2-r1 | R8, R26 | DATA: "The sales campaign restarted on Sep 24, so Moshi is on {m:age} and the next gate is {m:nextGateDate}." Renders "day 21 … Oct 16". The run saw it coming: "The {m:nextGateDate} token uses firstLaunch only, so it may render Oct 16 instead of Oct 8." | wrong-shape: the contract says `m:` counts "from `firstLaunch`" but not what to cite after a reset | `references/data-contract.md`, "What tokens render", add a bullet: "`{m:age}`, `{m:stage}`, `{m:nextGate}` and `{m:nextGateDate}` count from `firstLaunch` and ignore resets. For a campaign with a reset, cite its own clock: `{c:<id>.age}`, `{c:<id>.nextGate}`, `{c:<id>.nextGateDate}`." S3.2-r2 and r3 did this and render correctly. |
| F2 | S3.1-r1 | R26 (judgment) | `accountIssues[1].text`: "Your top ad, Pet Parent Testimonial, shows high frequency and a falling CTR: {a:1202640000000092.frequency} frequency and {a:1202640000000092.ctr} CTR over the window." The page prints the braces. | wrong-shape: the contract names the token fields but never says other fields print raw | `references/data-contract.md`, Tokens, first paragraph: replace "Prose in `verdict`, `shopperThemes[].text` and `nextSteps[].what` cites numbers only through tokens." with "Tokens resolve only in `verdict`, `shopperThemes[].text` and `nextSteps[].what`. Every other string prints as typed, so it holds no tokens." |
| F3 | S3.1-r2 | R12, R16, R26 | DATA: "In the first {cmp:0.day} days, Moshi's Sales CPA was {cmp:0.moshi} against {cmp:0.merchant}". Banner "Check 3: {cmp:0.day} points to nothing" hides the verdict body. Reasoning: "the verdict token cmp:0.day is not in the token table. I used it anyway." | discipline: the run knew the token was not listed | `references/data-contract.md`, after the token table, add: "Only the tokens in this table resolve. Any other `{…}` fails the data check and hides the verdict. `cmp:` has three fields: `moshi`, `merchant` and `note`. Write the day count in words: \"over the same first days\"." |
| F4 | S2.2-r1 | R22 | DATA `adCount: 10` on ad set `1202630000000081`; the report prints "10 ads". The structure read has 9 ACTIVE ads there. No reasoning line explains it. | execution slip, with a loose source cell | `references/data-contract.md`, `adsets[]` table, `adCount` Source cell: replace "active ads in this ad set, counted from the ad structure read" with "the number of read-5 rows with this `adset_id` and `effective_status` `ACTIVE`". |
| F5 | S5.1-r1 | X | DATA is a day21 draft (truncated ids, "Tidewater Pet Supply") under a day5 reply. | harness collision | Not a skill fix. Give each run its own output path and rerun S5.1. |

Not rubric failures, but scenario misses:

- S3.2-r1: the chat reply leaves out the Closer recoveries (3, $164.80), the same miss as round-1 S3.2-r1. The fatigue line sits after "What changed", not in part 1 as SKILL.md asks. S3.2-r2 and r3 put fatigue in part 1 and name the Closer recoveries.
- S1.1, all three reps: one comparison launch (Linen) on two metrics. The scenario says "CTR beats both past launches", and the gold compares CTR to both. `comparison-method.md` says "pick the one with the closest daily budget", so the runs follow the skill. The scenario and the skill disagree.
- N4.1, both reps: neither chat reply cites the 41 contacts captured. The report tile shows them.

## 6. Divergence between reps

| Topic | What the reps did | Effect |
|---|---|---|
| Comparison pairs on day21 | S3.1-r1 cpa+ctr; S3.1-r2 cpa+cpc; S3.1-r3 cpa on Raincoat and cpa on Lookalike; S3.2-r1 cpa+ctr; S3.2-r2 ctr+cpa; S3.2-r3 cpc+cpa. Gold: ctr on Lookalike, cpa on Raincoat. | All valid under R4. The recipe does not say whether "two comparisons" means two metrics or two launches. |
| Anomaly scan as a flag | S3.1-r1 and r2 add `meta auction_overlap` to `flags[]`; the other four leave it in `accountIssues` only. | No score change. The skill does not say whether the anomaly scan counts as a "tool flag". |
| Rows outside the window | S3.2-r3 trimmed top-ad rows to Sep 16 on; the other day21 runs kept Sep 7 on. Five runs raised the question. | No score change. The contract is silent. |
| Nearest gate with two clocks | S3.1-r1, S3.1-r2, S3.2-r1 and S3.2-r3 asked which campaign sets "the" next gate. All six day21 reps picked Oct 8. | Consistent result, unclear text. Optional fix in `references/stage-gates.md`, Next gates: "With several campaigns, the next gate is the earliest next-gate date across the Moshi campaigns." |
| Changes in the chat | S3.2-r1 lists two of the three changes. The other five list all three. | Pass under R24 as written. Tighten R24 to "every change with a readable date after today". |
| `lastLearningReset` equal to launch | 7 runs asked whether to fill it or null it. All filled it, which matches the gold. | No score change. |

## 7. Fixed since round 1

| Round-1 failure | Round 1 | Round 2 |
|---|---|---|
| Reset day 1 off by one (R8, R19) | 2/4 day21 reps said day 12 | 0/6. All six say day 13 and Oct 8 |
| Comparison N after a reset | split 14/12 | 6/6 use 14 |
| Next gate swapped for the asked-about gate | S1.1-r1 gave Oct 13 | 0/13. Every reply gives the nearest gate, then the later gate on its own line |
| "day day 5" and "This is <stage>" | 5 runs | 0/13 |
| Fatigue held behind the reset | S3.2 2/2 | 0/6. All day21 replies show frequency 3.9 and falling CTR |
| N4.1 `notMeasurableYet` lacks CTR and CPC | 2/2 | 0/2 |
| Launch counted as a change | 4 runs | 0/13 |
| `firstLaunch` guessed in moshi_only | 2/2 silent | 2/2 use `window.start` and say so |

## 8. Rubric and harness issues

- Give each run its own output path. Two collisions in two rounds (round-1 S1.1-r2, round-2 S5.1-r1).
- Let runs render. The instruction "save DATA, do not render" disables SKILL.md step 7, so the banner self-check never fires. A run could call `node template-src/build.js` and the harness, or the harness could return the banner text to the run.
- R26 names only the verdict, themes and next steps. Add `accountIssues`, `changes[].what` and `notMeasurableYet` to its scope, or state that they are out of scope.
- R24: say whether every future-dated change must appear in the chat.
- S1.1 scenario says "both past launches"; `comparison-method.md` picks one. Align one of them.
- S3.2 scenario asks for Closer recoveries on their own line. No rubric check covers it, and S3.2-r1 missed it in both rounds. Add it to R24 for S3.2, or drop it from the scenario.
