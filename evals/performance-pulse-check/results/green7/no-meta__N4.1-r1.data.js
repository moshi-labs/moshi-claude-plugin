const DATA = {
schemaVersion: 1,
merchant: { name: "Copperline Coffee Roasters", currency: "USD", timezone: "America/Chicago" },
asOf: "2026-10-06T18:40:00Z",
window: { start: "2026-10-02", end: "2026-10-06", partial: true },
metaSyncedAt: null,
metaWindow: null,
mode: "moshi_only",
mood: "reading",
primaryCampaignId: null,
verdict: {
  headline: "Your Moshi ads are starting chats at {m:costPerChat} each, on Moshi's count of ad chats.",
  body: "Your shoppers left {m:contactsCaptured} emails and phone numbers, {m:productViews} chats reached a product page, {m:carts} reached a cart, and {m:provenOrders} orders trace straight back to a chat, a floor. Moshi is on {m:age}, an early read on chats, contacts and first carts, not ROAS. No Meta ad account is synced in Moshi, so Meta's purchases and ROAS can't be read here."
},
campaigns: [],
moshi: { firstLaunch: "2026-10-02", spend: 763.1, chats: 187, chatsFromAds: 171, contactsCaptured: 41, productViews: 74, carts: 12, checkouts: 6, provenOrders: 5, provenRevenue: 214, delayedOrders: 2, closerRecoveries: 1, closerRevenue: 36 },
iceBreakers: { total: 171, items: [{ text: "Which roast is least bitter?", conversations: 74, share: 0.4327 }, { text: "Can you grind it for my brewer?", conversations: 40, share: 0.2339 }], typedOwn: { conversations: 57, share: 0.3333 } },
comparisons: [],
changes: [
  { date: "2026-10-03", what: "Roast guide: added a bitterness scale", kind: "agent_knowledge", source: "moshi", entityId: null }
],
accountIssues: [],
shopperThemes: [
  { theme: "Least bitter roast", text: "Your shoppers' top opener asks which roast is least bitter. In the thread I read, the agent named your light roast as the smoothest." },
  { theme: "Grind for my brewer", text: "Grinding is the next most-tapped opener. When a shopper asked about a French press, the agent said to pick coarse at checkout." }
],
quotes: [{ text: "Which roast is least bitter?", source: "ad" }, { text: "Do you grind beans for a French press?", source: "ad" }],
nextSteps: [
  { step: "1", what: "Check that your Meta ad account is connected in Moshi, so the next read can show CTR, cost per click and Meta's purchases.", owner: "merchant", by: "2026-10-08" },
  { step: "2", what: "Read cost per chat, carts and delayed orders at the {m:nextGate} gate on {m:nextGateDate}.", owner: "moshi", by: "2026-10-09" },
  { step: "3", what: "See whether the roast guide's new bitterness scale moves least-bitter chats toward carts, once it has five days of chats.", owner: "moshi", by: "2026-10-08" }
],
flags: [
  { source: "moshi", code: "cart_value_unknown", text: "Open cart value is unknown: carts carry no price." },
  { source: "moshi", code: "population_mismatch", text: "Chats include profile-button chats. Chats from ads count ad-sourced chats only." },
  { source: "meta", code: "no_synced_ads", text: "No Meta ads are synced for this organization: either no Meta ad account is connected or nothing has synced yet. This is no data, not zero performance." }
],
notMeasurableYet: [
  "CTR, CPC and CPM: no Meta ad account is synced in Moshi",
  "Comparison with your launches: no Meta ad account is synced in Moshi",
  "Meta purchases, ROAS and CPA: no Meta ad account is synced in Moshi, and Moshi-proven orders never stand in for them",
  "Launch date: no Moshi tool returned one, so ages count from the first day of the report window"
]
};
