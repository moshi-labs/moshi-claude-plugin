// The sample DATA, a made-up merchant: `node build.js <out> --sample` previews the template with it, and `node sample.js`
// writes it as pretty JSON to the skill's references/sample-data.json, its worked example (negative/run.js fails when that
// file is stale). The daily rows are in rows.txt (gen.js generated them).
const fs=require('fs'),S=__dirname;
const rows=fs.readFileSync(S+'/rows.txt','utf8').split(/^\/\/(\w+)\n/m);const R={};for(let i=1;i<rows.length;i+=2)R[rows[i]]=rows[i+1].trim().replace(/\n\s+/g,'\n').replace(/\n\/\/moshi.*$/s,'');
const data=`const DATA = {
schemaVersion: 1,
merchant: { name: "Brindle Chili Works", currency: "USD", timezone: "America/Los_Angeles" },
asOf: "2026-10-06T18:40:00Z",
window: { start: "2026-09-29", end: "2026-10-05", partial: false, before: "as_202" },
metaSyncedAt: "2026-10-06T18:09:00Z",
metaWindow: { start: "2026-09-07", end: "2026-10-06" },
moshiWindow: { start: "2026-09-22", end: "2026-10-06" },
mode: "full",
mood: "delight",
primaryCampaignId: "cm_101",
verdict: {
  title: "Hot start, and Meta is still learning",
  headline: "Chat to Cart clicked at {cmp:0.moshi} in week one, against {cmp:0.merchant} for Fall Launch.",
  body: "Chats cost {m:costPerChat} each, and {m:provenOrders} orders came straight from those threads. Its first fair CPA read lands {c:cm_101.nextGateDate}."
},
campaigns: [
{ id: "cm_101", name: "Moshi · Chat to Cart", owner: "moshi", objective: "sales", metaObjective: "OUTCOME_SALES", budgetType: "CBO", dailyBudget: 300, status: "ACTIVE", startTime: "2026-09-22", adsPulled: "all", retargeting: false, metaSpend: 2077, metaPurchases: 21, metaPurchaseValue: 924.4,
  adsets: [{ id: "as_201", name: "Broad US 25–54", startTime: "2026-09-22", optimizationGoal: "OFFSITE_CONVERSIONS", dailyBudget: null, learning: "learning", adCount: 2, lastLearningReset: "2026-09-30", attributionSetting: "7-day click, 1-day view",
    ads: [{ id: "ad_301", name: "Heat ladder reel", angle: "Taste test", daily: [
${R.a301}] }] }] },
{ id: "cm_102", name: "Moshi · Ask the Chili Nerd", owner: "moshi", objective: "engagement", metaObjective: "OUTCOME_ENGAGEMENT", budgetType: "ABO", dailyBudget: null, status: "ACTIVE", startTime: "2026-10-06", adsPulled: "all", retargeting: false, metaSpend: 61.4, metaPurchases: 0, metaPurchaseValue: 0,
  adsets: [{ id: "as_202", name: "Messenger + IG DM", startTime: "2026-10-06", optimizationGoal: "CONVERSATIONS", dailyBudget: 80, learning: null, adCount: 1, lastLearningReset: null, attributionSetting: "1-day click",
    ads: [{ id: "ad_303", name: "Which sauce for tacos?", angle: "Pairing quiz", daily: [
${R.a303}] }] }] },
{ id: "cm_401", name: "Fall Launch", owner: "merchant", objective: "sales", metaObjective: "OUTCOME_SALES", budgetType: "CBO", dailyBudget: 1400, status: "ACTIVE", startTime: "2026-09-29", adsPulled: "all", retargeting: false, metaSpend: 4289.5, metaPurchases: 103, metaPurchaseValue: 4661.6,
  adsets: [{ id: "as_501", name: "Advantage+ audience", startTime: "2026-09-29", optimizationGoal: "OFFSITE_CONVERSIONS", dailyBudget: null, learning: "success", adCount: 1, lastLearningReset: null, attributionSetting: "7-day click, 1-day view",
    totals: { spend: 4289.5, impressions: 226256, linkClicks: 2806, conversations: 0, purchases: 103, purchaseValue: 4661.6 },
    ads: [{ id: "ad_601", name: "Smoked habanero UGC", angle: "Heat reaction", daily: [
${R.a601}] }] }] }
],
moshi: { firstLaunch: "2026-09-22", spend: 2138.4, chats: 318, chatsFromAds: 284, contactsCaptured: 71, contactsEmail: 52, contactsPhone: 19, productViews: 149, carts: 46, checkouts: 27, provenOrders: 14, provenRevenue: 768.5, delayedOrders: 5, closerRecoveries: 3, closerRevenue: 141 },
comparisons: [{ metric: "ctr", day: 7, moshiCampaignId: "cm_101", merchantCampaignId: "cm_401" }, { metric: "ctr", running: true, moshiCampaignId: "cm_101" }],
changes: [{ date: "2026-09-30", what: "Meta restarted learning after a significant edit", kind: "significant_edit", source: "meta", entityId: "as_201" },
  { date: "2026-10-06", what: "Moshi launched Messenger + IG DM", kind: "new_ad", source: "moshi", entityId: "as_202" }],
accountIssues: [],
chatters: { total: 318, people: [
  { username: "salsa.sam", followers: 48200, verified: true, followsYou: false, orderValue: 58 },
  { username: "heatseekr", followers: 2300, followsYou: true, orderValue: 44.5 },
  { username: "taco.jo", followers: 640, followsYou: false, orderValue: 89 },
  { name: "Dana Ruiz", channel: "messenger", orderValue: 41 },
  { username: "bbq.dad", followers: 21500, followsYou: false, stage: "cart" },
  { username: "chili.lab", followers: 9100, verified: true, followsYou: false, stage: "product_view" },
  { username: "mild.mo", followers: 310, followsYou: true }
] },
dashboardUrl: "https://brindle.moshi.ai",
flags: [{ source: "moshi", code: "order_match_pending", text: "Oct 6 orders still matching." }]
};`;
const json=JSON.stringify(new Function(data+'\nreturn DATA')(),null,2)+'\n',file=S+'/../../../plugins/moshi/skills/performance-pulse-check/references/sample-data.json';
module.exports={data,json,file};
if(require.main===module)fs.writeFileSync(file,json);
