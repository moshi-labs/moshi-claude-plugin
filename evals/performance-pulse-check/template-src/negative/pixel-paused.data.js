// Positive test: a campaign whose ad sets report no goal or window still shows its pixel CPA and ROAS: base.data.js plus the lines under "// change".
// The helpers sit inside a function so their names do not clash with the template's globals.
const DATA = (() => {
const R = (s, n, f) => Array.from({ length: n }, (_, i) => ({ date: new Date(Date.parse(s) + i * 864e5).toISOString().slice(0, 10),
  spend: 50, impressions: 5000, linkClicks: 60, conversations: null, purchases: 2, purchaseValue: 120, frequency: 1.2, ...f }));
const camp = (id, owner, objective, startTime, ads, x = {}) => ({ id, name: id, owner, objective, metaObjective: "OUTCOME_SALES", budgetType: "CBO",
  dailyBudget: 100, status: "ACTIVE", startTime, adsPulled: "all", retargeting: false,
  adsets: [{ id: id + "_s", name: id + " set", startTime, optimizationGoal: "OFFSITE_CONVERSIONS", dailyBudget: null, learning: null, adCount: ads.length,
    lastLearningReset: null, attributionSetting: "7-day click", ads: ads.map((daily, i) => ({ id: id + "_a" + i, name: id + " ad " + i, angle: null, daily })) }], ...x });
const D = {
  schemaVersion: 1,
  merchant: { name: "Base Shop", currency: "USD", timezone: "UTC" },
  asOf: "2026-10-06T12:00:00Z", window: { start: "2026-09-22", end: "2026-10-06", partial: true }, metaSyncedAt: "2026-10-06T12:00:00Z",
  mode: "full", mood: "reading",
  verdict: { headline: "Moshi CTR is {c:cm1.ctr}; yours is {cmp:0.merchant}.", body: "CPA {c:cm1.cpa}. Next gate {m:nextGateDate}, {m:nextGate}." },
  campaigns: [camp("cm1", "moshi", "sales", "2026-09-22", [R("2026-09-22", 15)]), camp("ym1", "merchant", "sales", "2026-08-01", [R("2026-08-01", 14)])],
  moshi: { firstLaunch: "2026-09-22", spend: 750, chats: 40, chatsFromAds: 30, contactsCaptured: 5, productViews: 10, carts: 3, checkouts: 2,
    provenOrders: 1, provenRevenue: 60, delayedOrders: 0, closerRecoveries: 0, closerRevenue: 0 },
  comparisons: [{ metric: "ctr", day: 7, moshiCampaignId: "cm1", merchantCampaignId: "ym1" }, { metric: "cpa", day: 14, moshiCampaignId: "cm1", merchantCampaignId: "ym1" }],
  changes: [{ date: "2026-10-01", what: "Budget up 10%", kind: "budget_minor", source: "meta", entityId: "cm1" }],
  accountIssues: [], shopperThemes: [], quotes: [{ text: "does it ship fast?", source: "ad" }],
  nextSteps: [{ step: "1", what: "Hold budget.", owner: "merchant", by: "2026-10-08" }], flags: [], notMeasurableYet: []
};
  // change
  // This older response omits goal, window and learning status. The campaign maps to "other".
  // Meta still counts 28 purchases worth $1,256.64 on $1,572.65 spend: $56.17 CPA, 0.80x ROAS.
  const day = (date, spend, purchases, purchaseValue) => ({ date, spend, impressions: 20000, linkClicks: 240, conversations: null, purchases, purchaseValue, frequency: 1.3 });
  const cj = camp("cj", "moshi", "other", "2026-09-22", [[day("2026-09-28", 400, 7, 314.16), day("2026-09-29", 400, 7, 314.16)]]);
  cj.metaObjective = "OUTCOME_SALES";
  cj.adsets.push({ ...cj.adsets[0], id: "cj_s2", name: "cj set 2", ads: [{ id: "cj_a9", name: "cj ad 9", angle: null, daily: [day("2026-09-30", 400, 7, 314.16), day("2026-10-01", 372.65, 7, 314.16)] }] });
  cj.adsets.forEach(s => Object.assign(s, { optimizationGoal: null, attributionSetting: null, learning: null, status: "PAUSED" }));
  const cn = camp("cn", "moshi", "other", "2026-09-22", [[day("2026-09-28", 100, 2, 90)]]);
  Object.assign(cn.adsets[0], { optimizationGoal: null, attributionSetting: null }); // Legacy response also omits the status.
  D.campaigns.push(cj, cn);
  D.verdict.body = "Meta's pixel shows {c:cj.cpa} a purchase and {c:cj.roas} ROAS on the campaign whose optimization goal is unreported.";
  D.primaryCampaignId = "cj";
  D.verdict.headline = "Window CTR is {c:cj.ctr}.";
  return D;
})();
