// Runs every negative DATA file through check.js and fails when an expected banner line is missing, and fails when the shipped
// template is over 122,880 bytes.
// Usage: node template-src/negative/run.js (from evals/performance-pulse-check), or from any directory.
const { execFileSync } = require('child_process'), path = require('path'), fs = require('fs');
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
  'check4.data.js': ['Check 4: chatters.people[0] holds an email; the row is hidden', 'Check 4: chatters.people[1] holds a phone number; the row is hidden'],
  'check5.data.js': ['Check 5: schemaVersion is 2'],
  'check6.data.js': ['Check 6: {all:merchant.cpc} includes ytop', 'Check 6: {c:yzero.ctr} cites a campaign with only its top ads pulled'],
  'check6-none.data.js': ['Check 6: {all:merchant.spend} includes ynone, which has adsPulled "none"'],
  'check7.data.js': ['Check 7: {m:age} ignores the learning reset'],
  'check8.data.js': ['Check 8: campaigns[0].startTime is not a YYYY-MM-DD date', 'Check 8: campaigns[0].adsets[0].startTime is not a YYYY-MM-DD date',
    'Check 8: campaigns[0].adsets[0].ads[0].daily[3].date is not a YYYY-MM-DD date',
    'Check 8: changes[0].date is not a YYYY-MM-DD date',
    'Check 8: moshi.firstLaunch is not a YYYY-MM-DD date', 'Check 8: {m:firstLaunch} needs a valid moshi.firstLaunch'],
  'check9.data.js': ['Check 9: {m:costPerChat} has no value'],
  'check10.data.js': ['Check 10: ad cm1_a0 has two rows for 2026-09-22'],
  'cmp-dup.data.js': ['Check 10: ad ym1_a1 has two rows for 2026-08-01'],
  'adset-day1.data.js': [],
  'first-launch.data.js': [],
  'paused-launch.data.js': [],
  'truncated-read.data.js': [],
  'window-rows.data.js': [],
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
  'costperchat.data.js': [],
  'costperchat-moshi.data.js': [],
  'check11-all.data.js': ['Check 11: {all:merchant.ctr} covers your campaigns that run Moshi’s creative'],
  'dup-overlap.data.js': ['Check 10: ad yo_a0 has two rows for 2026-09-22', 'Check 10: ad cm1_a1 has two rows for 2026-09-24'],
  'dup-primary.data.js': ['Check 10: ad cm1_a0 has two rows for 2026-09-22'],
  'check13-missing.data.js': ['Check 13: primaryCampaignId is missing; the primary campaign is cm1'],
  'attribution-mixed.data.js': [],
  'overlap-share.data.js': [],
  'messaging.data.js': [],
  'messaging-links.data.js': [],
  'check14.data.js': ['Check 14: chatters.people[0].profilePic is not an https link', 'Check 14: chatters.people[0].threadUrl is not an https link',
    'Check 14: ad cm1_a0 thumbnailUrl is not an https link', 'Check 14: dashboardUrl is not an https link'],
  'check15.data.js': ['Check 15: chatters.total is 1, but 2 people are listed'],
  'funnel.data.js': [],
  'funnel-early.data.js': [],
  'sameads.data.js': [],
  'share-tiny.data.js': []
};
// The banner escapes DATA text: check 3's <b> must reach the page as text, not markup.
// An ad set added Oct 2 to a campaign that started Aug 1 counts from its own startTime; the campaign keeps its Aug 1 clock.
// {m:firstLaunch} renders as a date. A check 10 failure hides the verdict that cites the ad; age tokens (here in the title) still render.
// A campaign published paused (startTime Sep 24, first row Oct 1) is on day 6 and passes a day-5 comparison.
// An old campaign whose rows start at the read's start (asOf - 29 or - 30 days) keeps its Mar 20 startTime: day 201.
// Frequency is impressions / reach (5000 / 4167 rounds to 1.20); a row that still carries frequency keeps its own.
// A metric token counts only the rows inside the window. A significant_edit restarts the clock like budget_major.
// overlap: the callout (sorted by Moshi's share, on the days both ran), Same ads with each clone source over the window, and an ad set
// comparison inside an old campaign. primary: cm1 leads, cm3 (25%+, this week) shows beside it, cm2 gets the footnote and its earlier
// gate does not count. attribution: a purchase token carries its window once per text; null reads as Meta's default. costperchat:
// Meta's count, and a campaign with one stray chat stays out. dup-overlap and dup-primary: a check 10 row never feeds the callout,
// Same ads or the primary pick. attribution-mixed: an ad set with no purchases adds no window. overlap-share: a share under 100% never
// reads 100%. messaging: the title over the headline; tiles counted from the rows (a count typed as a string still adds up); every
// buyer by followers, 1k+ highlighted; the 1k+ accounts that did not buy with how far they got; a Messenger row by first name and
// initial; no paper-plane without thread links; the Closer page. funnel: the conversation rate is Meta's chats over link clicks on the
// campaigns that start chats; order size and Moshi's ROAS wait for day 8 on the reset clock (funnel-early). sameads: the card where
// Moshi's CTR is higher leads, then by Moshi's CTR; two copies of one original add up; an original with no rows did not run.
const RENDERED = { 'check3.data.js': ['&lt;b&gt;x&lt;/b&gt;'],
  'adset-day1.data.js': ['New set is on day 5', 'old set is on day 67', 'the campaign is on day 67'],
  'first-launch.data.js': ['Moshi launched Sep 22'],
  'check10.data.js': ['Wait until Oct 22'],
  'paused-launch.data.js': ['Paused launch is on day 6', 'CTR, first 5 days'],
  'truncated-read.data.js': ['Old campaign is on day 201', 'its twin is on day 201'],
  'cmp-dup.data.js': ['None of your launches match'],
  'window-rows.data.js': ['Yours spent $350 .'],
  'legacy-frequency.data.js': ['Your ad ran at frequency 1.20 .'],
  'significant-edit.data.js': ['Clock restarted Oct 1 after a learning reset'],
  'overlap.data.js': ['Moshi’s ads reuse creatives from your live ads', 'Tan 15 75,000 675,000 10% Blue 2 10,000 1,000 91%',
    'This is not a fair Moshi-vs-merchant test', 'Recropped or edited copies may not be detected',
    'Tan Moshi’s copy $750 1.20% CTR Your original $750 0.13% CTR Blue Moshi’s copy $650 1.20% CTR Your original $200 12.00% CTR',
    'CTR, first 7 days cm1 1.20% yo new set 1.20% Your ad set: 1 ads'],
  'check13-headline.data.js': ['CPA $25.00 (7-day click)'],
  'primary.data.js': ['Also ran: cm2, $40.00, stopped on Sep 25.', 'Next gate Oct 22 , day 31', 'cm3 Sales Today'],
  'attribution.data.js': ['Meta credits Moshi with 30 purchases (7-day click) at $25.00 .', 'Yours: $25.00 (Meta’s default for this ad set, not reported)',
    'Counted on: Moshi 7-day click · yours Meta’s default for this ad set (not reported)'],
  'costperchat.data.js': ['Chats cost $10.00 .', 'Cost per ad chat $10.00 Meta’s count: 75 chats started, on the campaigns that start chats'],
  'costperchat-moshi.data.js': ['Chats cost $25.00 .', 'Cost per ad chat $25.00 Moshi’s count of chats from ads'],
  'dup-primary.data.js': ['Also ran: cm2, $150, still delivering.', 'Wait until Oct 22'],
  'attribution-mixed.data.js': ['Meta credits Moshi with 30 purchases (7-day click) .'], 'overlap-share.data.js': ['Blue 2 10,000 40 >99%'],
  'check4.data.js': ['F @fern.and.fig 2.4k cart'],
  'messaging.data.js': ['Chats are the story Moshi CTR is', '20 people messaged (7 on Instagram) 5 have 1,000+ followers, 2.5M combined 71% didn’t follow Base Shop yet 1 verified account 5 emails and phones shared (3 emails, 2 phones) Counts cover 8 of the 20 people who messaged.',
    'Who bought 4 Highlighted: 2 with 1k+ followers , $126 of orders. Followers Order A @ann.k ✓ 15k $80 B @bo.c 1.2k $45.50 C @cy 900 $120 D Dee R. (Messenger) — $60',
    'Big accounts that haven’t bought yet 3 with 1k+ followers messaged and didn’t buy, 2.5M followers combined. Followers Got as far as E @eve.big 2.5M cart F @fay 3.4k product view G @gus 1.1k clicked a link',
    'so the thread is already in your inbox. A personal note', 'Follower counts are from Instagram; Messenger doesn’t share them.', 'Respond to your Closers', 'Review your Closers →'],
  'messaging-links.data.js': ['so the thread is already in your inbox: tap the paper-plane on a row to open it in Meta Business Suite.'],
  'check14.data.js': ['B @bo.c 1.2k $30'], 'check15.data.js': ['2 people messaged'],
  'funnel.data.js': ['10% Conversation rate Link clicks on Moshi’s chat ads that started a conversation: 90 of 900, Meta’s count',
    'Had a conversation 40 100% Viewed a product 10 25% Reached cart 3 8% Reached checkout 2 5% Moshi-proven orders 1 $60.00 Meta-credited purchases 30 $1,800',
    'Meta’s count is its pixel estimate for Moshi’s campaigns (7-day click), 2.40x ROAS on the Sales campaigns. Meta may still add purchases to recent days.',
    'Chat orders are 20% bigger Moshi chat orders · 1 order $60.00 Your other ads · 50 orders $50.00',
    'Moshi is 25% of your ad spend Moshi · 2.40x ROAS $750 Your other campaigns · 1.11x ROAS $2,250 Sep 7 – Oct 6'],
  'funnel-early.data.js': ['2.40x ROAS on the Sales campaigns, too early to judge, first read Oct 9.', 'Moshi is 25% of your ad spend Moshi $750 Your other campaigns · 1.11x ROAS $2,250'],
  'share-tiny.data.js': ['Moshi is &lt;0.1% of your ad spend'],
  'sameads.data.js': ['Blue Moshi’s copy $1,500 0.80% CTR Your original $750 0.60% CTR Red Moshi’s copy $750 2.00% CTR Your original $750 3.00% CTR Tan Moshi’s copy $750 1.20% CTR Your original didn’t run these days'] };
// Strings that must not render. check10: no Meta tile, comparison or funnel value from the duplicate Moshi ad (CTR 1.20%, value $1,800).
// cmp-dup: the failed comparison reports check 10, not check 2. window-rows: $700 would count the Sep 15-21 rows before window.start.
const RENDERED_NOT = { 'check10.data.js': ['1.20%', '$1,800'],
  'cmp-dup.data.js': ['Check 2'], 'check8.data.js': ['Check 9'], 'window-rows.data.js': ['$700'],
  'check11.data.js': ['Your Tan ad clicked at', 'yo set 1.20%'], 'check12.data.js': ['Meta-credited purchases', 'CPA $25.00', 'CPA, first 14 days'],
  'check13.data.js': ['Moshi CTR is', 'CPA $25.00'], 'check13-headline.data.js': ['Chats cost'], 'primary.data.js': ['cm2 Engagement Today'],
  'attribution.data.js': ['at $25.00 (7-day click)'], 'check11-all.data.js': ['Yours is'], 'dup-overlap.data.js': ['Moshi’s share', 'Tan 15', 'Same ads'],
  'dup-primary.data.js': ['Check 13'], 'check13-missing.data.js': ['Moshi CTR is'], 'attribution-mixed.data.js': ['1-day click)'],
  'check4.data.js': ['pat@example.com', '555-0100'], 'messaging.data.js': ['paper-plane', 'Lopez'], 'messaging-links.data.js': ['Respond to your Closers'],
  'check14.data.js': ['Respond to your Closers', 'paper-plane'], 'funnel-early.data.js': ['Chat orders are', 'Moshi · 2.40x ROAS'] };
// Strings that must render in this order. overlap: "Things in your account affecting results" leads, before the verdict. messaging:
// the sections run hero, messaging, your launches, stages, tiles, funnel, Closers.
const ORDER = { 'overlap.data.js': [['Things in your account affecting results', 'Moshi CTR is'], ['Moshi CTR is', 'Where each campaign stands']],
  'messaging.data.js': [['Moshi CTR is', 'What messaging ads tell you'], ['What messaging ads tell you', 'Moshi against your own launches'],
    ['Moshi against your own launches', 'Where each campaign stands'], ['Where each campaign stands', 'Contacts captured'],
    ['Contacts captured', 'From conversation to purchase'], ['From conversation to purchase', 'Respond to your Closers']] };
// Strings that must (HTML) or must not (HTML_NOT) be in the rendered markup: links, images and the title's h1.
const HTML = { 'messaging.data.js': ['<h1>Chats are the story</h1>', '<p class=dek>Moshi CTR is', 'href="https://base-shop.moshi.ai/closer"'],
  'messaging-links.data.js': ['class=msgb href="https://business.facebook.com/latest/inbox/instagram_direct?asset_id=1&amp;selected_item_id=2"', '<img src="https://cdn.example.com/ann.jpg"'],
  'check14.data.js': ['<img src="data:image/png;base64,iVBORw0KGgo="'], 'sameads.data.js': ['<img src="https://cdn.example.com/blue.jpg"'],
  'base.data.js': ['<h1>Moshi CTR is'] };
const HTML_NOT = { 'messaging.data.js': ['class=msgb', '<img src="https://cdn'], 'check14.data.js': ['javascript:', 'http://cdn', 'data:text', 'ftp:'],
  'base.data.js': ['class=dek'] };
let failed = 0;
for (const [file, want] of Object.entries(EXPECT)) {
  const out = execFileSync('node', [check, path.join(__dirname, file)], { encoding: 'utf8' });
  const banner = out.match(/^banner: (.*)$/m)[1], rendered = out.match(/^rendered: (.*)$/m)[1], html = out.match(/^html: (.*)$/m)[1];
  const miss = want.filter(w => !banner.includes(w)).concat((RENDERED[file] || []).filter(w => !rendered.includes(w)).map(w => 'rendered ' + w))
    .concat((RENDERED_NOT[file] || []).filter(w => rendered.includes(w)).map(w => 'unwanted ' + w))
    .concat((ORDER[file] || []).filter(([a, b]) => !(rendered.includes(a) && rendered.indexOf(a) < rendered.indexOf(b))).map(([a, b]) => `order ${a} before ${b}`))
    .concat((HTML[file] || []).filter(w => !html.includes(w)).map(w => 'html ' + w))
    .concat((HTML_NOT[file] || []).filter(w => html.includes(w)).map(w => 'unwanted html ' + w));
  const bad = miss.length > 0 || (!want.length && banner != 'none');
  if (bad) failed++;
  console.log(`${bad ? 'FAIL' : 'ok  '} ${file}: ${bad ? (miss.length ? 'missing ' + miss.join(' | ') : 'unexpected ' + banner) : banner}`);
}
// The design spec's size line: a host that must re-emit the template whole can do it in one artifact.
const size = fs.statSync(path.join(__dirname, '../../../../plugins/moshi/skills/performance-pulse-check/assets/pulse-check.html')).size;
if (size > 122880) failed++;
console.log(`${size > 122880 ? 'FAIL' : 'ok  '} pulse-check.html: ${size.toLocaleString('en-US')} of 122,880 bytes`);
console.log(failed ? `${failed} negative test(s) failed` : 'all negative tests passed');
process.exit(failed ? 1 : 0);
