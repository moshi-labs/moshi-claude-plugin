// Positive test: Moshi's CTR over the window against your running campaigns (running: true), each campaign's link CTR weighted by its
// spend: ya (1.0%, $3,000), the RTG-named yr (3.0%, $1,000: neither its name nor its retargeting flag leaves it out) and yo's clean ad
// set (2.0%, $1,000) give 1.60%, where pooling every click would give 1.45%. Left out: yo's ad set that runs cm1's creative, the
// other-objective yv, yn's ad set with no link clicks read and ym1 with no window totals. No campaign is named. The cmp tokens resolve:
// base.data.js plus the lines under "// change".
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
  accountIssues: [], flags: [], notMeasurableYet: []
};
  // change
  const T = (spend, impressions, linkClicks) => ({ spend, impressions, linkClicks, conversations: 0, purchases: 0, purchaseValue: 0 });
  const run = (id, objective, sets, x) => ({ ...camp(id, "merchant", objective, "2026-03-02", [], x), adsPulled: "none",
    adsets: sets.map(([sid, totals]) => ({ ...camp(id, "merchant", objective, "2026-03-02", []).adsets[0], id: sid, name: sid, totals })) });
  D.campaigns.push(run("ya", "sales", [["ya_s", T(3000, 200000, 2000)]]),
    run("yr", "sales", [["yr_s", T(1000, 40000, 1200)]], { name: "RTG | Site + IG", retargeting: true }),
    run("yv", "other", [["yv_s", T(500, 100000, 100)]]),
    run("yo", "sales", [["yo_s", T(4000, 100000, 5000)], ["yo_t", T(1000, 50000, 1000)]]),
    run("yn", "sales", [["yn_s", { ...T(800, 80000, 0), linkClicks: null }]]));
  D.campaigns[0].adsets[0].ads[0].creativeOverlap = [{ adId: "yo_a0", adName: "yo ad 0", adsetId: "yo_s", campaignId: "yo" }];
  D.comparisons.push({ metric: "ctr", running: true, moshiCampaignId: "cm1" });
  D.verdict.body = "Your running campaigns: {cmp:2.merchant}. {cmp:2.note}";
  return D;
})();
