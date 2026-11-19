// Positive test: the window is the 7 days before Moshi's newest ad set launched (window.before): Gift guide was created Oct 4 and
// first delivered Oct 5, so the window is Sep 28 – Oct 4 and the header says why. Moshi's own counts carry moshiWindow's dates (tiles,
// funnel, who messaged) while Meta's numbers keep the window's. The stage and the next gate count to today, day 17: day 31 on Oct 22,
// not day 15, which passed on Oct 6. Its launch is a moshi change, so it restarts no clock. cm2 ran past the window's end but
// stopped before today, so its footnote says it stopped: base.data.js plus the lines under "// change".
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
  D.asOf = "2026-10-08T12:00:00Z";
  D.campaigns[0].adsets[0].ads[0].daily = R("2026-09-22", 17); // through Oct 8
  D.campaigns[0].adsets.push({ ...D.campaigns[0].adsets[0], id: "cm1_n", name: "Gift guide", startTime: "2026-10-04", // created Oct 4
    ads: [{ id: "cm1_n_a0", name: "gift ad", angle: null, daily: R("2026-10-05", 4) }] }); // first delivered Oct 5
  D.window = { start: "2026-09-28", end: "2026-10-04", partial: false, before: "cm1_n" };
  D.moshiWindow = { start: "2026-09-22", end: "2026-10-08" };
  D.comparisons[1].day = 13; // base's CPA comparison stops at the window's last day, cm1's day 13
  D.campaigns.push(camp("cm2", "moshi", "engagement", "2026-09-28", [R("2026-09-28", 8, { spend: 10 })])); // Sep 28 – Oct 5
  D.moshi.contactsEmail = 3; D.moshi.contactsPhone = 2;
  D.chatters = { total: null, people: [{ username: "ann.k", followers: 15200, verified: true, followsYou: false, orderValue: 80 },
    { username: "bo.c", followers: 1200, followsYou: true, stage: "cart" }] };
  D.changes.push({ date: "2026-10-05", what: "Moshi launched Gift guide", kind: "new_ad", source: "moshi", entityId: "cm1_n" });
  return D;
})();
