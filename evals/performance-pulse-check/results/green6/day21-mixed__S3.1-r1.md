# day21-mixed · S3.1 · run 1

Merchant message: "Why did my CPA go up? Did Moshi break something?"

## Calls

1. `get_flow_status_data` — no arguments
2. `get_ad_performance` — no arguments
3. `get_recent_brand_doc_change` — no arguments
4. `get_conversation_messages` — `{ "conversationId": "conv_d21_01" }`
5. `get_conversation_messages` — `{ "conversationId": "conv_d21_02" }`
6. `get_conversation_messages` — `{ "conversationId": "conv_d21_03" }`
7. `get_ad_account_tree` (T1 account) — `{ "dateFrom": "2026-09-07", "dateTo": "2026-10-06", "maxAds": 0 }`
8. `get_ad_account_tree` (T2 Moshi ads) — `{ "dateFrom": "2026-09-07", "dateTo": "2026-10-06", "granularity": "daily", "owner": "moshi", "maxAds": 500 }`
9. `get_ad_account_tree` (T3 top ads) — `{ "dateFrom": "2026-09-07", "dateTo": "2026-10-06", "granularity": "daily", "owner": "merchant", "maxAds": 3 }`
10. `get_ad_account_tree` (T4 launches) — `{ "dateFrom": "2026-07-09", "dateTo": "2026-10-06", "owner": "merchant", "maxAds": 0 }`
11. `get_ad_account_tree` (T5 launch 1202640000000125, Launch | Raincoat Season) — `{ "adsetIds": ["1202640000000124", "1202640000000119"], "granularity": "daily", "dateFrom": "2026-07-21", "dateTo": "2026-08-03" }`

## Reply

Nothing points to Moshi breaking anything: over the same first 14 days, your Moshi Sales campaign got purchases at a $49.58 CPA, against $61.79 for your Raincoat Season launch (Meta purchases, 7-day click, 1-day view). The clearest CPA pressure is your top ad, Pet Parent Testimonial, which is tiring: frequency 3.90 on Oct 6 and CTR down from 1.71% on Sep 16 to 1.00%, while Moshi's top ad, Salmon Jerky Reaction, went from 2.31% to 2.46% over the same days.

- Moshi-proven orders: 11 orders worth $689.20, 4 of them placed a day or more after the chat. That's a floor, kept separate from Meta's purchases.
- Closer recoveries: 3 orders worth $164.80, also a floor.

**Stage:** Day 21 since Moshi launched on Sep 16. Meta restarted learning on the Sales campaign's ad set on Sep 24, so its clock reads day 13: a first fair CPA and ROAS read against your launches at the same age. The chat campaign is on day 21, in fatigue watch, and is judged on cost per conversation.

**Next gate:** fatigue and frequency read on the Sales campaign on 2026-10-08.
After that: full verdict on the chat campaign on 2026-10-16, and on the Sales campaign on 2026-10-24.

**What changed and when it shows:**
- Sep 24: Meta restarted learning on the Moshi Sales ad set after a significant edit. Meta doesn't say what the edit was. CPA jumped on Sep 24–26 and has been readable again since Oct 1: $46.45 for Oct 1–6, against $38.49 in the campaign's first eight days. Across Sep 16–Oct 6 it's $48.52. So Moshi's Sales CPA did rise after the restart, and the same-age comparison above already includes those rough days.
- Oct 4: your Moshi agent's Shipping and returns doc moved the return window from 14 to 30 days. That shows in chats from Oct 9.

Meta may still add purchases to recent days, so the latest CPA can still come down.

**Data note:** Moshi's chat counts include chats from every Moshi flow, your profile included, while Moshi's ad spend only pays for chats from ads.

Your full pulse check is in the report: the same-age comparison, the fatigue chart, your account map and next steps. One shopper on your profile is still waiting on a puppy-mix answer, so check that thread in the Moshi dashboard today.

## Check

banner: none

## Notes

- **Report window.** I used 2026-09-16 → 2026-10-06, the window `get_flow_status_data` and `get_ad_performance` both returned, so the `moshi` funnel block covers exactly the report window. T1's window is 2026-09-07 → 2026-10-06. Moshi's Meta numbers are identical under either window because Moshi first delivered on Sep 16. The contract doesn't say which window to use. The merchant top ads' Sep 7–15 rows stay in DATA untrimmed, as the contract says, but fall outside the window metrics and the fatigue chart.
- **One T5 read.** Both T4 launches (Lookalike Pet Parents, started Aug 4, and Raincoat Season, started Jul 21) qualify: Sales, not retargeting, inside 90 days. Evergreen's start is unknown (`1969-12-31`), so it isn't a launch. "Pick the one with the closest daily budget" points to Raincoat: $1,400/day from two $700 ABO ad sets, against Moshi Sales at $580/day. Lookalike is $1,980/day. I read "at most two" T5 reads as a cap, not a target. Lookalike stays in the account map with `adsPulled: "none"`.
- **Comparisons.** Days 1–14 for both sides (Moshi is on day 21 since launch; the reset doesn't change N). CPA is allowed: the Sales ad set is on day 13 of its reset clock, and its last 7 days have 80 purchases, above the ~50 floor. Moshi wins CPA, CTR, CPC and narrowly ROAS. I led with CPA because that's what was asked, then CTR. The Chat Starter campaign optimizes for CONVERSATIONS, so it's engagement. The merchant has no engagement launch, so it isn't compared.
- **"My CPA" is ambiguous** (whole account, or the Moshi campaign). I addressed both. I showed Moshi's own Sales CPA honestly: window $48.52, first 8 days $38.49, Oct 1–6 $46.45, with the spike Sep 24–26. I attributed the clearest pressure to the merchant's top ad fatiguing. I did not quote T1 campaign-level CPAs for the merchant's mature campaigns: they aren't a fair comparison, and the merchant didn't name a campaign. A whole-account daily CPA trend isn't measurable from this read plan, so it's in `notMeasurableYet`.
- **Fixture inconsistency.** T1 says Evergreen had 2,673 purchases on $63.7k of spend. Its top three ads (T3) hold $57.7k of that spend but only 561 purchases. I didn't use either Evergreen total and relied on daily rows for trends. Evergreen has `adsPulled: "top"`, so no `c:` token cites it.
- **Not calling the edit a budget change.** The Sales campaign's daily spend runs higher from Sep 24 (about $400/day before, about $580/day after). I left that out of the reply because it would imply the significant edit was a budget change, which the skill forbids.
- **Next gate.** The nearest gate is the Sales campaign's day 15 on its reset clock (2026-10-08). The template labels it "fatigue and frequency read". Unclear spot: the skill says fatigue counts from launch, so fatigue was already readable from launch-day 15 (Sep 30). A "fatigue gate" on the reset clock is a little odd, but I followed the skill and the template.
- **Later gate line.** The CPA read is already open (since Oct 1). I named the day-31 full verdicts (Oct 16 chat, Oct 24 Sales) as the later gate on their own line.
- **Who made the edit is unknown.** There's no change log, so I can't say whether Moshi made the Sep 24 edit. That's why I wrote "Nothing points to Moshi breaking anything" rather than a flat "no".
- **Flags.** `ads_over_max_ads` on T1, T3 and T4 is expected and left out. T2 and T5 had no flags. Both Moshi flags are in `flags[]`. In chat, only `population_mismatch` gets a line, since it touches the chat counts and the proven orders' source population. `cart_value_unknown` touches no number I cited (no cart value anywhere), so it appears only in the report footer.
- **Fatigue.** The top ad's frequency crossed 3.5 on Sep 29. I cited the latest day's frequency (3.90 on Oct 6), as the skill requires, though Oct 6 is a partial day.
- **Prose rules.** I kept "CPA" out of sentences about the engagement campaign (red flag). In the verdict I wrote the attribution setting in words ("seven-day click, one-day view") so no digits appear in token prose.
- **Quotes.** The conv_d21_03 quote is a 12-word excerpt of a longer message. The conv_d21_02 message holding an email is not quoted. conv_d21_02's last message is from the shopper, so the "waiting shopper" next step is grounded in the messages.
- **Changes.** The brand-doc change is at 2026-10-04T16:20Z, which is Oct 4 in America/Chicago, so it's readable Oct 9, after today. The Sales significant edit at 2026-09-24T14:00Z is Sep 24 local. The Chat ad set's edit falls on its launch day, so it's not a change.
- **`scale-what-works` next step.** It's dated to the Sales full verdict (Oct 24). Its name contains "scale", which can't be avoided. Otherwise the word isn't used.
- **The report as an artifact.** In a live session the rendered `pulse-check.html` with this DATA would be attached as the artifact. Here the render is what check.js produced.
