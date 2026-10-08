// Negative test for check 2: base.data.js plus the lines under "// change".
// The helpers sit inside a function so their names do not clash with the template's globals.
const DATA = (() => {
const R = (s, n, f) => Array.from({ length: n }, (_, i) => ({ date: new Date(Date.parse(s) + i * 864e5).toISOString().slice(0, 10),
  spend: 50, impressions: 5000, linkClicks: 60, conversations: null, purchases: 2, purchaseValue: 120, reach: 4167, ...f }));
const camp = (id, owner, objective, startTime, ads, x = {}) => ({ id, name: id, owner, objective, metaObjective: "OUTCOME_SALES", budgetType: "CBO",
  dailyBudget: 100, status: "ACTIVE", startTime, adsPulled: "all", retargeting: false,
  adsets: [{ id: id + "_s", name: id + " set", startTime, optimizationGoal: "OFFSITE_CONVERSIONS", dailyBudget: null, learning: null, adCount: ads.length,
    lastLearningReset: null, attributionSetting: "7-day click", ads: ads.map((daily, i) => ({ id: id + "_a" + i, name: id + " ad " + i, angle: null, daily })) }], ...x });
const D = {
  schemaVersion: 1,
  merchant: { name: "Base Shop", currency: "USD", timezone: "UTC" },
  asOf: "2026-10-06T12:00:00Z", window: { start: "2026-09-22", end: "2026-10-06", partial: true }, metaSyncedAt: "2026-10-06T12:00:00Z",
  mode: "full", mood: "reading", primaryCampaignId: "cm1",
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
  D.campaigns.push(camp("ynull", "merchant", "sales", null, [R("2026-08-01", 14)]), camp("yold", "merchant", "sales", "2026-06-01", [R("2026-06-01", 14)]),
    camp("cmr", "moshi", "sales", "2026-09-22", [R("2026-09-22", 15)]), camp("cmo", "moshi", "other", "2026-09-22", [R("2026-09-22", 15)]),
    camp("yo", "merchant", "other", "2026-08-01", [R("2026-08-01", 14)]), camp("cmt", "moshi", "sales", "2026-09-01", [R("2026-09-07", 30)]),
    camp("cmg", "moshi", "sales", "2026-09-22", [R("2026-09-22", 3).concat(R("2026-09-26", 11))]),
    camp("ytc", "merchant", "sales", "2026-08-01", [R("2026-08-01", 14)], { adsPulled: "top" })); // cmt: rows start at the 30-day read's start (Sep 7), so day 1 stays its Sep 1 startTime; cmg: Sep 25 has no row
  D.campaigns.find(c => c.id == "cmr").adsets[0].lastLearningReset = "2026-10-01"; // reset clock: day 6 on Oct 6
  D.comparisons = [
    { metric: "ctr", day: 15, moshiCampaignId: "cm1", merchantCampaignId: "ym1" },
    { metric: "ctr", day: 7, moshiCampaignId: "cm1", merchantCampaignId: "ynull" },
    { metric: "ctr", day: 7, moshiCampaignId: "cm1", merchantCampaignId: "yold" },
    { metric: "cpa", day: 7, moshiCampaignId: "cmr", merchantCampaignId: "ym1" },
    { metric: "roas", day: 7, moshiCampaignId: "cmo", merchantCampaignId: "yo" },
    { metric: "ctr", day: 7, moshiCampaignId: "cmt", merchantCampaignId: "ym1" },
    { metric: "ctr", day: 7, moshiCampaignId: "cmg", merchantCampaignId: "ym1" },
    { metric: "cpa", day: 7, moshiCampaignId: "cm1", merchantCampaignId: "ym1" },
    { metric: "ctr", day: 7, moshiCampaignId: "cm1", merchantCampaignId: "ytc" }];
  return D;
})();
