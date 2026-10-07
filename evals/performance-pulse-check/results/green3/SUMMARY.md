# GREEN round 3 summary: performance-pulse-check

Sixteen runs under the current skill: S2.2, S3.1, S3.2 and S5.1 three reps each, N4.1 r3 and S1.1 r4. Scored against `rubric.md` R1 to R26. Each DATA file was rendered with `template-src/check.js`, patched in the scratchpad to print the full rendered text, not the first 700 characters. Every DATA key in the R12 list was diffed against `expected-data.json` by script. Cited figures were recomputed from the fixture rows.

## 0. Read first

- All sixteen DATA files render with no data check banner. No rendered page holds a raw `{…}` token. No file holds an email, phone number or @handle, and `buddy.example@example.com` appears nowhere.
- Every R12 key matches the gold in all sixteen runs: `mode`, `window`, `moshi.*`, campaign `id`/`owner`/`objective`/`budgetType`/`startTime`, ad set `adCount`/`lastLearningReset`/`attributionSetting`, `learning: null`. Round-2 F4 (`adCount` 10) did not recur.
- Three runs fail. Two of them fail on token meaning, which the banner cannot catch. S3.2-r3 is a recurrence of round-2 F1 (`{m:…}` gate tokens after a reset), so the contract bullet added for F1 did not hold.
- Judgment calls: S2.2-r2 R5 (omits the Sales ROAS the merchant asked about), S3.2-r3 R8 (the report prints two different gates for Oct 8, scored the way round 2 scored F1), S3.1-r3 R24 (strict reading of "YYYY-MM-DD").

## 1. Scores

P = pass, F = fail, N/A = does not apply.

| Check | S1.1 r4 | S2.2 r1 | S2.2 r2 | S2.2 r3 | S3.1 r1 | S3.1 r2 | S3.1 r3 | S3.2 r1 | S3.2 r2 | S3.2 r3 | S5.1 r1 | S5.1 r2 | S5.1 r3 | N4.1 r3 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 No ROAS verdict before day 8 | P | P | P | P | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | P |
| R2 No ROAS/CPA on engagement | N/A | P | P | P | P | P | P | P | P | P | N/A | N/A | N/A | P |
| R3 Purchase rows not summed | P | P | P | P | P | P | P | P | P | P | P | P | P | P |
| R4 Comparisons age-matched | P | P | P | P | P | P | P | P | P | P | P | P | P | N/A |
| R5 No hidden Ads Manager number | P | P | **F** | P | P | P | P | P | P | P | P | P | P | P |
| R6 Attribution window from data | P | N/A | N/A | N/A | P | P | P | P | P | P | N/A | N/A | N/A | N/A |
| R7 No PII or long quotes | P | P | P | P | P | P | P | P | P | P | P | P | P | P |
| R8 Nearest gate, agrees with report | P | P | P | P | P | P | P | P | P | **F** | P | P | P | P |
| R9 Changes with readable dates | N/A | N/A | N/A | N/A | P | P | P | P | P | P | N/A | N/A | N/A | P |
| R10 Flags surfaced | P | P | P | P | P | P | P | P | P | P | P | P | P | P |
| R11 Backfill caveat | P | N/A | N/A | N/A | P | P | P | P | P | P | N/A | N/A | N/A | N/A |
| R12 DATA validates in template | P | P | P | P | P | P | P | P | P | P | P | P | P | P |
| R13 Day 1-3 verdict judges no ROAS/CPA | P | P | P | P | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |
| R14 Learning reset from Meta data | N/A | N/A | N/A | N/A | P | P | P | P | P | P | N/A | N/A | N/A | N/A |
| R15 Call budget, read-only | P | P | P | P | P | P | P | P | P | P | P | P | P | N/A |
| R16 Prose numbers via tokens | P | P | P | P | P | P | P | P | P | P | P | P | P | P |
| R17 Mode and objective mapping | P | P | P | P | P | P | P | P | P | P | P | P | P | P |
| R18 Null versus zero | P | P | P | P | P | P | P | P | P | P | P | P | P | P |
| R19 Day numbering | P | P | P | P | P | P | P | P | P | P | P | P | P | P |
| R20 Structure-only gets no rows | P | P | P | P | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |
| R21 Sales + CONVERSATIONS is engagement | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | P | P | P | N/A |
| R22 Learning status, adCount | P | P | P | P | P | P | P | P | P | P | P | P | P | P |
| R23 No CPA/ROAS verdict before day 8 | P | P | P | P | P | P | P | P | P | P | P | P | P | N/A |
| R24 Answer shape | P | P | P | P | P | P | **F** | P | P | P | P | P | P | P |
| R25 Conversation claims match | P | P | P | P | P | P | P | P | P | P | P | P | P | P |
| R26 Rendered prose reads correctly | P | P | P | P | P | P | **F** | P | P | **F** | P | P | P | P |
| Pass / applicable | 22/22 | 21/21 | 20/21 | 21/21 | 22/22 | 22/22 | 20/22 | 22/22 | 22/22 | 20/22 | 18/18 | 18/18 | 18/18 | 17/17 |

Passes that needed a call:

- S2.2-r1 R15: it opened read 7 (empty) although the budget says to skip it with no comparison launch. The Meta count is still nine and all reads are read-only. Pass.
- S3.2-r2 and r3 R15: reads 8 and 9 came before reads 6 and 7. R15 grades count and read-only. Pass, same call as round 2.
- S2.2-r3 R2: "Your Sales campaign wins on ROAS" is about the merchant's Sales campaign. The next sentence says ROAS does not apply to Moshi and no budget winner follows from it. Pass.
- S3.2-r2 R3: the verdict says "Moshi proved 11 more orders inside chat threads, a floor kept apart from Meta purchases." "More" reads as additive, but the same clause keeps the rows apart. Pass.
- S3.1-r2 R26: next step "Its frequency is {a:…092.frequency}" renders 3.31, the window figure. The chat says 3.9, the last day. Both are true. Pass, same call as round-2 S3.2-r2.
- S3.1-r2 and r3, S3.2 R24: no flag lines in chat where the reply cites no chat or cart count. The answer shape asks for a line per flag "that touches a number you cited". Pass.

## 2. Render results

| Run | Banner | Gate printed in stage panel | Rendered verdict (first sentences) |
|---|---|---|---|
| S1.1-r4 | none | day 4 on Oct 9 | Day one: your Moshi clicks cost $0.65 each, ROAS is too early to read. Moshi clicks cost $0.65 against $1.09 on your Linen launch over the same first days of life. The ROAS of 0.30x your CFO sees is Meta's count of 2 purchases on partial day-one spend. Nearest gate: day 4 on Oct 9. |
| S2.2-r1 | none | day 4 on Oct 8 | Your chat ads started 85 chats at $2.08 each. Moshi is on day 2, so this is a read on attention and chat cost. |
| S2.2-r2 | none | day 4 on Oct 8 | Your chat ads are getting 85 chats at $2.08 each. … its return is not a fair yardstick for a chat campaign. The next gate is day 4 on Oct 8. |
| S2.2-r3 | none | day 4 on Oct 8 | Your chat ads started 85 chats at $2.08 each. Moshi is on day 2 and optimizes for chats, so ROAS does not apply to it. |
| S3.1-r1 | none | Sales day 15 Oct 8; Chat day 31 Oct 16 | CPA rose after your Sep 24 budget raise, and no Moshi change came before it. Moshi Sales cost $48.52 per Meta purchase (one-day view, seven-day click) over the window … |
| S3.1-r2 | none | same | Moshi did not break your CPA. A budget raise and audience overlap moved it. Your Moshi Sales campaign sits at $48.52 per Meta purchase. |
| S3.1-r3 | none | same | **CPA is $48.52 since your Sep 24 budget raise.** Moshi did not break. |
| S3.2-r1 | none | same | Moshi Sales buys at $49.58 a purchase, against $61.79 on Raincoat. |
| S3.2-r2 | none | same | Moshi purchases cost $49.58, against $61.79 on your Raincoat launch. |
| S3.2-r3 | none | same | Your Moshi sales ads buy at $49.58 a purchase against $61.79 on your Raincoat launch. Next steps row: **"Re-read Moshi sales cost per purchase and chat cost at the day 31 gate." by Oct 8** |
| S5.1-r1 | none | day 8 on Oct 9 | ROAS and CPA do not apply here. Your chats cost $2.76 each. |
| S5.1-r2 | none | day 8 on Oct 9 | Chats cost $2.76 each, under half the summer launch at $6.38. |
| S5.1-r3 | none | day 8 on Oct 9 | Your chat ads cost $2.76 per conversation on day 5. |
| N4.1-r3 | none | day 8 on Oct 9 | Your ads started 171 chats at $4.46 each. Moshi is on day 5, so this is a read on chats and carts. |

`accountIssues`, `changes[].what` and `notMeasurableYet` hold no tokens in any run. The five gold DATA files also render with no banner.

## 3. Number spot-check

Recomputed from the fixture rows and tool files:

- day1: CTR 2.25%, CPC $0.65, ROAS 0.30 (45.50 / 153.83). Linen day 1: 1.18%, $1.09. 12 chats from ads, 1 proven order ($24.50).
- day2: 85 Meta conversations at $2.08 (176.84 / 85), CTR 2.61%, CPC $0.39. Moshi cost per ad chat $2.16 (176.84 / 82). Sales ROAS 3.40 (60,833.72 / 17,892.27). Open carts 2 at $64.50. Sales campaign 9 active ads.
- day21 Sales CPA: $38.49 (Sep 16-23), $148.33 (Sep 24), $119.21 (Sep 25), $54.75 (Sep 24 on), $46.75 (last 7 days, 80 purchases), $48.52 (window). CPM $15.50, $21.00, $17.50. Days 1-14: CPA $49.58 vs Raincoat $61.79, ROAS 1.09 vs 1.00, CTR 2.19% vs 1.24%, CPC $0.78 vs $1.05. Chat campaign $1.73 per conversation in week one and over the window. Top ad CTR: first 7 rows 1.89%, last 7 1.09%; first 10 rows 1.85%, last 10 1.16%; window first 7 1.59%. Frequency 2.30 to 3.90.
- day5: $2.76 per conversation (1,166.14 / 423), summer launch $6.38. CTR 2.42% vs 1.17%, CPC $0.51 vs $1.07. 2 proven orders, $148.
- no-meta: $4.46 per chat (763.10 / 171), 6 open carts, Closer 1 at $36.

Every chat figure matches a recomputed value. S3.1-r1 "spiked above $110 on Sep 24 and 25" and S3.1-r3 "spiked to $148 on Sep 24" are both right. S3.1-r3 "CTR fell from 1.85% to 1.16%" is the first-10 vs last-10 split.

Wording that misstates which count a cost per chat uses (not a rubric check):

- S2.2-r3: "I count chats from ads (82) for Moshi's cost per chat", but the cited $2.08 divides by Meta's 85.
- S5.1-r2: "The cost per chat uses ad-sourced chats only (420 from ads)", but the cited $2.76 divides by Meta's 423.
- S5.1-r3: "I cite chats from ads only (420 of 429)", same $2.76.

Conversation claims are right in every run. `conv_d1_01` and `conv_d21_02` end with a shopper message, and every run that mentions them says so. S3.2-r1 has one slip: "The agent said Moshi ships across the US only for now." The agent wrote "We ship across the US", so the shop ships, not Moshi.

`mood`: every run sets it. "delight" in S1.1-r4 (CTR and CPC lead on day 1), all day21 runs (CPA leads at day 14, stage allows CPA on day 13 since the reset) and all S5.1 runs (cost per conversation leads). "reading" in S2.2 (no comparison) and N4.1 (no Meta). All match the contract. The gold files have no `mood`.

## 4. Tally

GREEN needs 3 consecutive reps under the current skill that pass every applicable check.

| Scenario | Reps | Verdict |
|---|---|---|
| S1.1 | green2 r1 P, r2 P, r3 P (carried over), green3 r4 P | **GREEN** (with carryover; 1 rep without) |
| S2.2 | r1 P, r2 F (R5), r3 P | NOT GREEN |
| S3.1 | r1 P, r2 P, r3 F (R24, R26) | NOT GREEN |
| S3.2 | r1 P, r2 P, r3 F (R8, R26) | NOT GREEN |
| S5.1 | r1 P, r2 P, r3 P | **GREEN** |
| N4.1 | green2 r1 P, r2 P (carried over), green3 r3 P | **GREEN** (with carryover) |

Carryover for green2 S1.1 r1-r3 and N4.1 r1-r2. I count them, for these reasons:

- Their DATA re-renders under the current template with no banner and no raw token.
- Token wording change: these reps already use `{m:age}` and `{m:stage}` the way the current contract asks. No "day day" and no "This is <stage>".
- nextGate rule: day1 and no-meta have one Moshi campaign and no reset, so the earliest-gate and `m:`-after-reset rules change nothing.
- Closer line: all five replies name the proven orders as a floor. N4.1 r1 and r2 name the Closer recovery on its own line. day1 has no Closer recoveries.
- `mood` is absent, so it renders "reading". That is right for N4.1. For S1.1 the current contract asks for "delight". No rubric check grades `mood`.

A strict reader who rejects carryover gets S1.1 at 1 of 3 and N4.1 at 1 of 3.

## 5. Remaining failures

| # | Run | Check | Verbatim | Form | Minimal fix |
|---|---|---|---|---|---|
| F1 | S3.2-r3 | R26, R8 (judgment) | `nextSteps[2].what`: "Re-read Moshi sales cost per purchase and chat cost at the {m:nextGate} gate." `by: 2026-10-08`. Renders "at the day 31 gate" on the Oct 8 row. The stage panel prints "day 15 on Oct 8". | discipline: recurrence of round-2 F1. The contract already says "`{m:nextGate}` … ignore resets. For a campaign with a reset, cite its own clock". The run did not see the rendered row because `check.js` prints only 700 characters. | `SKILL.md`, Red flags, add: "- Writing `{m:age}`, `{m:stage}`, `{m:nextGate}` or `{m:nextGateDate}` while a Moshi ad set has a reset after its first day." This is the second miss after a contract line, so the durable fix is a template data check that fails these four tokens when any Moshi ad set's `lastLearningReset` is after its first `daily[]` date. |
| F2 | S3.1-r3 | R26 | `verdict.headline`: "CPA is {c:1202640000000089.cpa} since your Sep 24 budget raise." Renders $48.52, the window CPA (Sep 16 on). CPA since Sep 24 is $54.75. The run noted it: "The token is the window average, which includes pre-raise days. Slightly loose wording". | wrong-shape: the contract does not say that `c:` metrics ignore resets | `references/data-contract.md`, "What tokens render", add: "- `c:`, `s:`, `a:` and `all:` metrics cover the whole report window, including days before a reset. Never write \"since <date>\" next to one." |
| F3 | S3.1-r3 | R24 (strict) | "Next gate: day 15 on Oct 8." No YYYY-MM-DD. | format slip | `SKILL.md`, Answer shape part 3: replace "Always a calendar date" with "Always a calendar date in YYYY-MM-DD form". |
| F4 | S2.2-r2 | R5 (judgment) | The reply never states the Sales campaign's 3.4x ROAS. Reasoning: "I did not print it in DATA and did not state it in the reply." r1 and r3 state it in chat. | wrong-shape: the token ban on partial merchant campaigns reads as a ban on the number | `references/data-contract.md`, after "Cite merchant campaigns through `cmp:` tokens.", add: "When the merchant asks about a number on such a campaign, state it in the chat reply from read 3, with its date range and attribution window." |

Same root cause as F2, not scored: S3.2-r3 verdict body "The Moshi sales campaign is on {c:…089.age} since your Sep 24 budget raise, so this is its first CPA and ROAS read: {c:…089.cpa} per Meta purchase". It ties the reset to the window CPA. The F2 sentence covers it.

Non-rubric fix for section 3's cost-per-chat wording: `references/data-contract.md`, Tokens metrics paragraph, add: "`costPerConversation` divides by Meta's conversations. `{m:costPerChat}` divides by Moshi's `chatsFromAds`. Name the one you cite."

## 6. Divergence between reps

| Topic | What the reps did | Effect |
|---|---|---|
| Merchant Sales ROAS in S2.2 | r1 and r3 state 3.4x in chat. r2 leaves it out. All three keep it out of DATA. | F4 |
| Comparison metrics, day21 | S3.1 r1 cpa+ctr, r2 cpa+cpc, r3 ctr+cpa. S3.2 r1-r3 cpa+roas. All on Raincoat. Gold: ctr on Lookalike, cpa on Raincoat. | All valid under R4. |
| Comparison metrics, day5 | r1 costPerConversation+cpc, r2 and r3 costPerConversation+ctr. | All valid. |
| Top-ad rows, day5 | S5.1-r3 kept only Aug 7-20 rows for the three summer top ads and dropped their Sep 7-Oct 6 read-6 rows. r1 and r2 kept both. | No score change. The contract says `daily[]` holds read-6 rows. |
| Read 7 with no launch | S2.2-r1 opened it, r2 and r3 skipped it. | No score change. |
| Flag lines in chat, day21 | S3.1-r1 and all S3.2 reps list both flags. S3.1 r2 and r3 list none and cite no chat or cart count. | No score change. |
| Fatigue CTR split | first-7/last-7 (S3.1-r1, S3.2-r1), first-10/last-10 (S3.1-r3), window first-7 (S3.2-r3), last day (S3.2-r2 "1.0%"). | All true. The skill names no split. |
| Overlap scan in chat | S3.2-r2 lists it under "Flags". DATA keeps it in `accountIssues` in every run. | No score change. |

## 7. Fixed since round 2

| Round-2 failure | Round 2 | Round 3 |
|---|---|---|
| F1 `{m:…}` gate tokens after a reset | S3.2-r1 verdict | S3.2-r3 next step. **Recurred once in 6 day21 reps** |
| F2 raw tokens in `accountIssues` | S3.1-r1 | 0/16 |
| F3 `{cmp:0.day}` and other unlisted tokens | S3.1-r2 | 0/16 |
| F4 `adCount` off by one | S2.2-r1 | 0/16 |
| F5 DATA collision | S5.1-r1 | 0/16. Each run has its own `.data.js` |
| Runs did not render | all | 16/16 ran `check.js`. All show banner none |
| S3.2 Closer recoveries missing in chat | S3.2-r1 | 0/3 |

## 8. Rubric and harness issues

- `check.js` prints the first 700 characters. Runs see the headline only, so F1 sat in a next-steps row the run never read. S3.1-r2 said so: "Check.js output was truncated by the script itself". Print the full text, or at least the verdict, themes and next steps.
- The gold `expected-data.json` files have no `mood`. Add it: day1 "delight", day2 "reading", day21 "delight", day5 "delight", no-meta "reading".
- R24 says "YYYY-MM-DD", and `SKILL.md` says "a calendar date". Align them (F3).
- R26 names verdict, themes and next steps. This round also checked `accountIssues`, `changes[].what` and `notMeasurableYet` for tokens. Write that scope into R26.
- Scenario misses that are not rubric checks: S1.1 compares to one launch where the scenario says "both" (the skill picks the closest budget). N4.1-r3 leaves the 41 contacts captured out of the chat, as both round-2 reps did.
