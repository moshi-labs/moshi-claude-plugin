// Runs every negative DATA file through check.js and fails when an expected banner line is missing.
// Usage: node template-src/negative/run.js (from evals/performance-pulse-check), or from any directory.
const { execFileSync } = require('child_process'), path = require('path');
const check = path.join(__dirname, '..', 'check.js');
const EXPECT = {
  'base.data.js': [],
  'check0.data.js': ['Check 0: the report could not render'],
  'check1.data.js': ['Check 1: {c:ce1.roas} would show ROAS for an engagement campaign'],
  'check2.data.js': ['Check 2: comparison ctr day 15: day must be a whole number from 1 to 14',
    'Check 2: comparison ctr day 7: your campaign has no start date',
    'Check 2: comparison ctr day 7: your campaign started more than 90 days ago',
    'Check 2: comparison cpa day 7: Moshi is on day 6 since its last reset; CPA needs day 8',
    'Check 2: comparison roas day 7: ROAS needs a Sales campaign',
    'Check 2: comparison ctr day 7: cmt has rows for only 1 of the first 7 days',
    'Check 2: comparison ctr day 7: cmg has rows for only 6 of the first 7 days',
    'Check 2: comparison cpa day 7: CPA needs at least 8 days; day is 7',
    'Check 2: comparison ctr day 7: your campaign has adsPulled "top"; a comparison needs "all"'],
  'check3.data.js': ['Check 3: {c:<b>x</b>.ctr} points to nothing'],
  'check3-moshi.data.js': ['Check 3: {all:moshi.cpc} has no Moshi campaign'],
  'check4.data.js': ['Check 4: a quote holds an email'],
  'check5.data.js': ['Check 5: schemaVersion is 2'],
  'check6.data.js': ['Check 6: {all:merchant.cpc} includes ytop', 'Check 6: {c:yzero.ctr} cites a campaign with only its top ads pulled'],
  'check6-none.data.js': ['Check 6: {all:merchant.spend} includes ynone, which has adsPulled "none"'],
  'check7.data.js': ['Check 7: {m:age} ignores the learning reset'],
  'check8.data.js': ['Check 8: campaigns[0].startTime is not a YYYY-MM-DD date', 'Check 8: campaigns[0].adsets[0].startTime is not a YYYY-MM-DD date',
    'Check 8: campaigns[0].adsets[0].ads[0].daily[3].date is not a YYYY-MM-DD date',
    'Check 8: changes[0].date is not a YYYY-MM-DD date', 'Check 8: nextSteps[0].by is not a YYYY-MM-DD date',
    'Check 8: moshi.firstLaunch is not a YYYY-MM-DD date', 'Check 8: {m:firstLaunch} needs a valid moshi.firstLaunch'],
  'check9.data.js': ['Check 9: {m:costPerChat} has no value'],
  'check10.data.js': ['Check 10: ad cm1_a0 has two rows for 2026-09-22'],
  'check10-fatigue.data.js': ['Check 10: ad cm1_a0 has two rows for 2026-09-22'],
  'cmp-dup.data.js': ['Check 10: ad ym1_a1 has two rows for 2026-08-01'],
  'adset-day1.data.js': [],
  'first-launch.data.js': [],
  'paused-launch.data.js': [],
  'truncated-read.data.js': [],
  'fatigue-window.data.js': [],
  'legacy-frequency.data.js': [],
  'significant-edit.data.js': ['Check 2: comparison cpa day 14: Moshi is on day 6 since its last reset; CPA needs day 8'],
  'check2-adset.data.js': ['Check 2: comparison ctr day 7: your ad set started more than 90 days ago',
    'Check 2: comparison ctr day 7: your ad set has adsPulled "top"; a comparison needs "all"', 'Check 2: comparison ctr day 7: your ad set is retargeting',
    'Check 6: {s:yz_s.ctr} cites an ad set with only its top ads pulled'],
  'check11.data.js': ['Check 11: comparison ctr day 7: your ad set yo set runs Moshi’s creative, so they share auctions',
    'Check 11: comparison ctr day 7: your campaign yo runs Moshi’s creative, so they share auctions',
    'Check 11: {a:yo_a0.ctr} cites your ad, ad set or campaign that runs Moshi’s creative'],
  'check12.data.js': ['Check 12: ad set cm1_s has no attributionSetting, so its purchases would show with no window'],
  'check13.data.js': ['Check 13: primaryCampaignId cm2 is not the largest-spend Moshi campaign, cm1'],
  'check13-headline.data.js': ['Check 13: the headline cites cm2 ({c:cm2.costPerConversation}), not the primary campaign cm1'],
  'overlap.data.js': [],
  'primary.data.js': [],
  'attribution.data.js': [],
  'icebreakers.data.js': [],
  'costperchat.data.js': []
};
// The banner escapes DATA text: check 3's <b> must reach the page as text, not markup.
// An ad set added Oct 2 to a campaign that started Aug 1 counts from its own startTime; the campaign keeps its Aug 1 clock.
// {m:firstLaunch} renders as a date. A check 10 failure hides the verdict that cites the ad; age tokens still render.
// A campaign published paused (startTime Sep 24, first row Oct 1) is on day 6 and passes a day-5 comparison.
// An old campaign whose rows start at the read's start (asOf - 29 or - 30 days) keeps its Mar 20 startTime: day 201.
// Frequency is impressions / reach (5000 / 4167 rounds to 1.20); a row that still carries frequency keeps its own.
// A significant_edit restarts the clock like budget_major and reads delivery at 3 days, CPA at 7.
// overlap: the callout (sorted by Moshi's share, on the days both ran), the account map's clone sources side by side with their windows,
// the engaged-view basis note, the not-shown line, and an ad set comparison inside an old campaign. primary: cm1 leads, cm3 (25%+, this
// week) shows beside it, cm2 gets the footnote and its earlier gate does not count. attribution: a purchase token carries its window once
// per text; null reads as Meta's default. icebreakers: whole percentages that add to 100, with an Other line. costperchat: Meta's count.
const RENDERED = { 'check3.data.js': ['&lt;b&gt;x&lt;/b&gt;'],
  'adset-day1.data.js': ['New set is on day 5', 'old set is on day 67', 'the campaign is on day 67'],
  'first-launch.data.js': ['Moshi launched Sep 22'], 'check10-fatigue.data.js': ['Moshi launched Sep 22'],
  'check10.data.js': ['Wait until Oct 22'],
  'paused-launch.data.js': ['Paused launch is on day 6', 'CTR, first 5 days'],
  'truncated-read.data.js': ['Old campaign is on day 201', 'its twin is on day 201'],
  'cmp-dup.data.js': ['None of your launches match'],
  'fatigue-window.data.js': ['Creative fatigue', 'Yours: ym1 ad 0, frequency 1.20 on Sep 22 → 1.20 on Sep 28'],
  'legacy-frequency.data.js': ['Yours: ym1 ad 0, frequency 1.20 on Sep 22 → 1.20 on Sep 28'],
  'significant-edit.data.js': ['Clock restarted Oct 1 after a learning reset', 'Meta restarted learning after a significant edit', 'delivery readable Oct 4, CPA readable Oct 8'],
  'overlap.data.js': ['Moshi’s ads reuse creatives from your live ads', 'Tan 15 75,000 675,000 10% Blue 2 10,000 1,000 91%',
    'This is not a fair Moshi-vs-merchant test', 'Recropped or edited copies may not be detected', 'Tan ← cloned from your ad “Tan mug” in yo set',
    'yo set cloned from same days $3,000 100 $30.00 7-day click, 1-day view, 1-day engaged view not the same basis',
    'Not shown: 1 of your campaigns, with $1,200 spent Sep 7 – Oct 6', 'CTR, first 7 days cm1 1.20% yo new set 1.20% Your ad set: 1 ads'],
  'check13-headline.data.js': ['CPA $25.00 (7-day click)'],
  'primary.data.js': ['Also ran: cm2, $40.00, stopped on Sep 25.', 'Next gate Oct 22 , day 31', 'cm3 Sales Today'],
  'attribution.data.js': ['Meta credits Moshi with 30 purchases (7-day click) at $25.00 .', 'Yours: $25.00 (Meta’s default for this ad set, not reported)',
    'Counted on: Moshi 7-day click · yours Meta’s default for this ad set (not reported)'],
  'icebreakers.data.js': ['How 210 ad chats started Is it spicy? 41% 87 Do you ship to Canada? 24% 51 Typed their own 30% 62 Other 5% 10'],
  'costperchat.data.js': ['Chats cost $10.00 .', 'Cost per ad chat $10.00 Meta’s count: 75 chats started, on the campaigns that start chats'] };
// Strings that must not render. check10: no Meta tile, comparison or fatigue value from the duplicate Moshi ad (CTR 1.20%, value $1,800).
// cmp-dup: the failed comparison reports check 10, not check 2. fatigue-window: Sep 15-21 rows sit before window.start.
const RENDERED_NOT = { 'check10.data.js': ['1.20%', '$1,800', 'Creative fatigue'], 'check10-fatigue.data.js': ['Creative fatigue'],
  'cmp-dup.data.js': ['Check 2'], 'check8.data.js': ['Check 9'], 'fatigue-window.data.js': ['Sep 15', 'Sep 21'],
  'check11.data.js': ['Your Tan ad clicked at', 'yo set 1.20%'], 'check12.data.js': ['Meta’s estimate', 'CPA $25.00', 'CPA, first 14 days'],
  'check13.data.js': ['Moshi CTR is', 'CPA $25.00'], 'check13-headline.data.js': ['Chats cost'], 'primary.data.js': ['cm2 Engagement Today'],
  'attribution.data.js': ['at $25.00 (7-day click)'] };
// Strings that must render in this order. overlap: "Things in your account affecting results" leads, before the verdict.
const ORDER = { 'overlap.data.js': [['Things in your account affecting results', 'Moshi CTR is'], ['Moshi CTR is', 'Where each campaign stands']] };
let failed = 0;
for (const [file, want] of Object.entries(EXPECT)) {
  const out = execFileSync('node', [check, path.join(__dirname, file)], { encoding: 'utf8' });
  const banner = out.match(/^banner: (.*)$/m)[1], rendered = out.match(/^rendered: (.*)$/m)[1];
  const miss = want.filter(w => !banner.includes(w)).concat((RENDERED[file] || []).filter(w => !rendered.includes(w)).map(w => 'rendered ' + w))
    .concat((RENDERED_NOT[file] || []).filter(w => rendered.includes(w)).map(w => 'unwanted ' + w))
    .concat((ORDER[file] || []).filter(([a, b]) => !(rendered.includes(a) && rendered.indexOf(a) < rendered.indexOf(b))).map(([a, b]) => `order ${a} before ${b}`));
  const bad = miss.length > 0 || (!want.length && banner != 'none');
  if (bad) failed++;
  console.log(`${bad ? 'FAIL' : 'ok  '} ${file}: ${bad ? (miss.length ? 'missing ' + miss.join(' | ') : 'unexpected ' + banner) : banner}`);
}
console.log(failed ? `${failed} negative test(s) failed` : 'all negative tests passed');
process.exit(failed ? 1 : 0);
