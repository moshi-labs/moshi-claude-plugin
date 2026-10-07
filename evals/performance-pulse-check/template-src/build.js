const fs=require('fs'),S=__dirname;
const rows=fs.readFileSync(S+'/rows.txt','utf8').split(/^\/\/(\w+)\n/m);const R={};for(let i=1;i<rows.length;i+=2)R[rows[i]]=rows[i+1].trim().replace(/\n\s+/g,'\n').replace(/\n\/\/moshi.*$/s,'');
const data=`const DATA = {
schemaVersion: 1,
merchant: { name: "Brindle Chili Works", currency: "USD", timezone: "America/Los_Angeles" },
asOf: "2026-10-06T18:40:00Z",
window: { start: "2026-09-22", end: "2026-10-06", partial: true },
metaSyncedAt: "2026-10-06T18:09:00Z",
mode: "full",
mood: "delight",
verdict: {
  headline: "Chats cost {m:costPerChat} each, and {m:provenOrders} orders came straight from those threads.",
  body: "Chat to Cart clicked at {cmp:0.moshi} in week one, against {cmp:0.merchant} for Fall Launch. Its first fair CPA read lands {c:cm_101.nextGateDate}. The pairing quiz does what quizzes do best: starts hot sauce arguments."
},
campaigns: [
{ id: "cm_101", name: "Moshi · Chat to Cart", owner: "moshi", objective: "sales", metaObjective: "OUTCOME_SALES", budgetType: "CBO", dailyBudget: 300, status: "ACTIVE", startTime: "2026-09-22", adsPulled: "all", retargeting: false,
  adsets: [{ id: "as_201", name: "Broad US 25–54", startTime: "2026-09-22", optimizationGoal: "OFFSITE_CONVERSIONS", dailyBudget: null, learning: "learning", adCount: 2, lastLearningReset: "2026-09-30", attributionSetting: "7-day click, 1-day view",
    ads: [{ id: "ad_301", name: "Heat ladder reel", angle: "Taste test", daily: [
${R.a301}] }] }] },
{ id: "cm_102", name: "Moshi · Ask the Chili Nerd", owner: "moshi", objective: "engagement", metaObjective: "OUTCOME_ENGAGEMENT", budgetType: "ABO", dailyBudget: null, status: "ACTIVE", startTime: "2026-10-06", adsPulled: "all", retargeting: false,
  adsets: [{ id: "as_202", name: "Messenger + IG DM", startTime: "2026-10-06", optimizationGoal: "CONVERSATIONS", dailyBudget: 80, learning: null, adCount: 1, lastLearningReset: null, attributionSetting: "1-day click",
    ads: [{ id: "ad_303", name: "Which sauce for tacos?", angle: "Pairing quiz", daily: [
${R.a303}] }] }] },
{ id: "cm_401", name: "Fall Launch", owner: "merchant", objective: "sales", metaObjective: "OUTCOME_SALES", budgetType: "CBO", dailyBudget: 1400, status: "ACTIVE", startTime: "2026-09-29", adsPulled: "all", retargeting: false,
  adsets: [{ id: "as_501", name: "Advantage+ audience", startTime: "2026-09-29", optimizationGoal: "OFFSITE_CONVERSIONS", dailyBudget: null, learning: "success", adCount: 1, lastLearningReset: null, attributionSetting: "7-day click, 1-day view",
    ads: [{ id: "ad_601", name: "Smoked habanero UGC", angle: "Heat reaction", daily: [
${R.a601}] }] }] }
],
moshi: { firstLaunch: "2026-09-22", spend: 2192.6, chats: 318, chatsFromAds: 284, contactsCaptured: 71, productViews: 149, carts: 46, checkouts: 27, provenOrders: 14, provenRevenue: 768.5, delayedOrders: 5, closerRecoveries: 3, closerRevenue: 141 },
comparisons: [{ metric: "ctr", day: 7, moshiCampaignId: "cm_101", merchantCampaignId: "cm_401" }],
changes: [
  { date: "2026-09-30", what: "Meta restarted learning after a significant edit", kind: "significant_edit", source: "meta", entityId: "as_201" },
  { date: "2026-10-03", what: "Agent learned the 3-pack bundle", kind: "agent_knowledge", source: "moshi", entityId: null }
],
accountIssues: [],
shopperThemes: [
  { theme: "How hot is it?", text: "The quiz answers heat questions at {c:cm_102.costPerConversation} a conversation." },
  { theme: "Bundles", text: "The 3-pack is in {m:carts} carts." }
],
quotes: [{ text: "is the smoked one hotter than sriracha?", source: "ad" }, { text: "ok ordering the 3-pack, my dad will lose it", source: "ad" }],
nextSteps: [
  { step: "1", what: "Hold Chat to Cart's budget until the CPA read on {c:cm_101.nextGateDate}.", owner: "merchant", by: "2026-10-07" },
  { step: "2", what: "Add a heat-level answer card for habanero questions.", owner: "moshi", by: "2026-10-08" }
],
flags: [{ source: "moshi", code: "order_match_pending", text: "Oct 6 orders still matching." }],
notMeasurableYet: ["Retargeting halo: needs day 15"]
};`;
const t=fs.readFileSync(S+'/tpl.html','utf8').replace('%%LOGO%%',()=>fs.readFileSync(S+'/logo/logo64q.png.b64','utf8').trim()).replace('%%AV%%',()=>fs.readFileSync(S+'/avatar/av.js','utf8').trim().replace(/;$/,'')+';AV.s={delight:"'+fs.readFileSync(S+'/avatar/still-delight.webp.b64','utf8').trim()+'",reading:"'+fs.readFileSync(S+'/avatar/still-reading.webp.b64','utf8').trim()+'"};');
// Function replacers keep $&, $' and $` in inserted text literal.
const cp=require('child_process'),NM=process.env.NM_BIN||'npx --yes ';
let o=t.replace(/<style>([\s\S]*?)<\/style>/,(m,c)=>'<style>'+cp.execSync(NM+'esbuild --loader=css --minify --target=chrome123,safari17.5,firefox120 --log-level=warning',{input:c}).toString().trim()+'</style>');
o=o.replace(/<script>\n(const LOGO[\s\S]*?)<\/script>/,(m,c)=>{fs.writeFileSync(S+'/code.js',c);return'<script>'+cp.execSync(NM+'terser '+S+'/code.js --toplevel -m -c passes=2 --ecma 2020').toString().trim()+'</script>'});
const out=process.argv[2];fs.writeFileSync(out,(process.argv[3]?t:o).replace('%%DATA%%',()=>process.argv[4]?fs.readFileSync(process.argv[4],'utf8'):data));
