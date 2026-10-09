// Negative test for check 11: a head-to-head against your ad set, campaign or ad that runs Moshi’s creative: base.data.js plus the lines under "// change".
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
  const ov = (id, s, a, n) => ({ adId: id, adName: n, adsetId: s, adsetName: s + " name", campaignId: "yo", campaignName: "yo", matchedBy: a });
  const m = D.campaigns[0].adsets[0];
  m.ads = [{ ...m.ads[0], angle: "Tan", clonedFrom: { adId: "yo_a0", adName: "Tan mug", adsetId: "yo_s", campaignId: "yo" }, creativeOverlap: [ov("yo_a0", "yo_s", "lineage", "Tan mug")] },
    { id: "cm1_a1", name: "cm1 ad 1", angle: "Blue", daily: R("2026-09-24", 13), clonedFrom: { adId: "yo_b0", adName: "Blue mug", adsetId: "yo_s2", campaignId: "yo" }, creativeOverlap: [ov("yo_b0", "yo_s2", "image_hash", "Blue mug")] }];
  m.adCount = 2;
  const yo = camp("yo", "merchant", "sales", "2026-03-01", [R("2026-09-22", 15, { impressions: 45000, reach: 37500 })], { adsPulled: "top" });
  yo.adsets[0].attributionSetting = "7-day click, 1-day view, 1-day engaged view";
  yo.adsets[0].totals = { spend: 3000, impressions: 675000, conversations: 0, purchases: 100, purchaseValue: 5000 };
  yo.adsets.push({ ...yo.adsets[0], id: "yo_s2", name: "yo set 2", attributionSetting: "7-day click, 1-day view", totals: { spend: 20, impressions: 1000, conversations: 0, purchases: 1, purchaseValue: 40 },
    ads: [{ id: "yo_b0", name: "Blue mug", angle: null, daily: R("2026-09-22", 4, { impressions: 500, reach: 450 }) }] },
    { ...yo.adsets[0], id: "yo_new", name: "yo new set", startTime: "2026-09-25", adsPulled: "all", attributionSetting: "7-day click", totals: undefined,
    ads: [{ id: "yo_new_a0", name: "yo new ad", angle: null, daily: R("2026-09-25", 12) }] });
  yo.adsets[0].ads[0].name = "Tan mug"; yo.adsets[0].ads[0].id = "yo_a0";
  D.campaigns.push(yo);
  D.campaigns[1].metaSpend = 1200; yo.metaSpend = 9000; D.metaWindow = { start: "2026-09-07", end: "2026-10-06" };
  D.comparisons.push({ metric: "ctr", day: 7, moshiCampaignId: "cm1", merchantAdsetId: "yo_s" }, { metric: "ctr", day: 7, moshiCampaignId: "cm1", merchantCampaignId: "yo" });
  D.verdict.body = "Your Tan ad clicked at {a:yo_a0.ctr}.";
  return D;
})();
