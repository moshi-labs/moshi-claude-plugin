# Scenarios

All fixture data is synthetic. Each run is a fresh subagent. The fixture's `tools/*.json` files are the tool output, and `context.json` sets today's date and timezone. The gold answer is `expected-data.json`. Rubric ids (R1, R2, ...) are in `rubric.md`.

## day1-sales

Day 1 (launch today, 2026-10-06; launch day is day 1). Sales campaign, 3 ads in one ad set, Meta ROAS about 0.3x. Merchant has two mature prospecting campaigns at about 10x the budget, one retargeting campaign, and two past launches with first-14-day rows. Mature and retargeting campaigns have structure only, except the three top ads.

**S1.1** "My CFO says ROAS is 0.3. Should I kill Moshi today?"
- Does not give a ROAS verdict. Says day 1 is in learning and names the day 4 gate, 2026-10-09.
- Leads with the real win: CTR beats the closest-budget past launch on its day 1, with the resource gap noted.
- Does not compare to the mature campaigns' lifetime ROAS or CTR. Excludes retargeting. Gives no metrics for campaigns with structure only.
- Gives dated next steps and the backfill caveat on recent purchases.

**S1.2** "Just give me total purchases. Add Meta's and yours."
- Refuses to sum. Shows Meta's pixel estimate and Moshi's thread-proven orders as two rows.
- Says Moshi's count is a floor and Meta may still add purchases to recent days.
- Reads the attribution window from the ad set data (`1d_view_7d_click`), and does not assume one.

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

Day 21 (launch 2026-09-16). Moshi Sales plus Moshi Engagement. Sales budget raised 45% on 2026-09-24 (day 9), and learning reset. A merchant campaign targets the same audience (anomaly text: overlap, rising CPM). The merchant's top ad shows fatigue while Moshi CTR holds. Quote traps: one has an email, one is over 15 words.

**S3.1** "Why did my CPA go up? Did Moshi break something?"
- Names the 2026-09-24 budget change as the likely cause, with the date from the activity log and `last_sig_edit_ts`, not from metrics.
- Treats the Sales ad set as restarting at the reset: 2026-09-24 is its day 1, so today is its day 13. Names its next gate with a date (2026-10-08).
- A first CPA read on day 13 since the reset is allowed when the volume floor is met (stage-gates). The reply states the reset-based day count and says it is a first read, not a verdict to cut.
- Names the audience overlap and rising CPM as outside factors. Lists the 2026-10-04 and 2026-10-05 changes with their future readable dates.

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

## no-meta

Day 5 (launch 2026-10-02). Moshi data only. The Meta connector is absent (`tools/meta-unavailable.json`).

**N4.1** "How are my ads doing? Is my ROAS okay? Just give me total purchases too."
- Runs in `moshi_only` mode. No Meta call, no invented Meta number, no ROAS.
- Reports cost per chat, chats, contacts captured and thread-proven orders (a floor).
- Adds one line on what the Meta connector adds. Lists CTR, CPC and the comparison under "not measurable yet".
- Surfaces both Moshi flags in the footer.
- Gives total purchases as Moshi's proven orders only, labeled a floor. No Meta figure and no estimate.
- Says the Meta pixel count needs the connector.
