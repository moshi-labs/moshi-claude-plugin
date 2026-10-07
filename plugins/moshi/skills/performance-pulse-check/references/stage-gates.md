# Stage gates

Read this before you write the verdict or answer a "should I kill / scale"
question.

## Age

- Day 1 of a campaign is the later of its `startTime` (the day of the
  tree's `startTime`, in the account timezone) and its first `daily[]` row with
  `impressions > 0`. Day 1 of an ad set uses the same rule with its own
  `startTime` (else its campaign's) and its own rows.
- One exception: when that first row falls within 1 day of the start of
  the 30-day read (`asOf` minus 29 or 30 days) and `startTime` is earlier,
  the read cut the history off. Day 1 is then `startTime`.
- With no rows, day 1 is `startTime`, then `moshi.firstLaunch` for a Moshi
  campaign.
- Moshi publishes ads PAUSED, so `startTime` can come days before the
  first delivery. A campaign paused at creation counts from its first
  delivery, not from its creation.
- A learning reset restarts the count. The reset date is the ad set's
  `lastSignificantEditAt` (`lastLearningReset` in DATA). Meta logs a
  significant edit for a budget change over 20%, a new ad, or a targeting
  or optimization change, and Moshi's data does not say which one it was.
  The reset date is day 1 again: a reset on Sep 24 makes Sep 24 day 1 and
  Oct 6 day 13. A reset on or before day 1 is the launch, not a reset.
- Each entity has its own clock. A campaign's reset is the latest reset
  among its ad sets, or a significant change on the campaign itself. A new
  ad set in an old campaign does not change the campaign's age.
  `{s:<id>.…}` tokens use the ad set's own clock; `{c:<id>.…}` tokens use
  the campaign's.
- The reset clock decides the stage and the next gate. The launch clock
  (days since day 1) decides comparisons and fatigue. A reset
  never delays those.
- Never infer learning status or a reset from the metrics. Learning status
  is `learningPhase.status`, and Meta reports it only for ACTIVE ad sets.
  If Meta does not show it, say nothing about learning.

## What each stage can judge

| Stage | Judge | Never judge yet |
|---|---|---|
| Day 1–3 | delivery, CTR, CPC, chat-start rate, which creative Meta favors | ROAS, CPA, purchases, order value |
| Day 4–7 | cost per chat, chat → product view, contacts captured, first carts, budget shifts between creatives | a ROAS verdict |
| Day 8–14 | a first CPA and ROAS read (Sales only) against the merchant's launches at the same day; delayed conversions | account lift, halo |
| Day 15–30 | fatigue, frequency, halo on retargeting (labeled directional) | — |
| Day 31+ | a full verdict: scale, change creative, or cut | — |

An engagement campaign never gets a CPA or ROAS gate. Its day 8 gate is a
read on cost per chat, carts and delayed orders.

Next gates: day 4, day 8, day 15, day 31. With several Moshi campaigns,
the next gate is the earliest next-gate date among them. The next gate date is the
calendar date of the next of these, counted from day 1 or from the last
reset. Every answer names it: "Next gate: first CPA read on 2026-10-14."

Volume floor: no CPA verdict until the ad set has about 50 of its own
optimization events in 7 days, even past day 8. Below the floor, say how
many events it has.

## Changes and when they show

A change that has not reached its readable date is a reason not to judge.

| `kind` | Readable after |
|---|---|
| `significant_edit`, `budget_major`, `new_ad`, `targeting`, `optimization` | learning restarts: 3 days for delivery, 7 days for CPA |
| `budget_minor` | 3 days |
| `status` | 3 days |
| `agent_knowledge`, `offer` | 5 days of chats |

List every change after the first Moshi launch. The launch itself is not
a change. Do not filter changes by whether they seem relevant to the
question.

## Attribution backfill

Meta keeps adding purchases to the last few days as conversions arrive.
When the window ends in the last 7 days and any Meta purchase number is
shown, add: "Meta may still add purchases to recent days."
