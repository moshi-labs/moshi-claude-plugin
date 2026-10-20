const DATA = {
  schemaVersion: 1,
  merchant: { name: "Copperline Coffee Roasters", currency: "USD", timezone: "America/Chicago" },
  asOf: "2026-10-06T18:40:00Z",
  window: { start: "2026-10-02", end: "2026-10-06", partial: true },
  metaSyncedAt: null,
  mode: "moshi_only",
  mood: "reading",
  verdict: {
    headline: "Your Moshi ads start chats at {m:costPerChat} each, and {m:carts} chats reached a cart.",
    body: "Moshi is on {m:age}, so this is a read on cost per chat and carts, not ROAS. Moshi traced {m:provenOrders} orders worth {m:provenRevenue} to a chat, a floor, and Closer recovered {m:closerRecoveries} order worth {m:closerRevenue}. Meta's own purchases and ROAS need your Meta ad account synced in Moshi, and they stay a separate count."
  },
  campaigns: [],
  moshi: {
    firstLaunch: "2026-10-02",
    spend: 763.1,
    chats: 187,
    chatsFromAds: 171,
    contactsCaptured: 41,
    productViews: 74,
    carts: 12,
    checkouts: 6,
    provenOrders: 5,
    provenRevenue: 214.0,
    delayedOrders: 2,
    closerRecoveries: 1,
    closerRevenue: 36.0
  },
  comparisons: [],
  changes: [
    { date: "2026-10-03", what: "Roast guide: added a bitterness scale", kind: "agent_knowledge", source: "moshi", entityId: null }
  ],
  accountIssues: [],
  shopperThemes: [
    { theme: "Bitterness", text: "Shoppers ask which roast is least bitter. Your agent points them to the light roast as the smoothest." },
    { theme: "Grind for their brewer", text: "Shoppers ask whether you grind beans for a French press. Your agent says yes, and to pick coarse at checkout." }
  ],
  quotes: [
    { text: "Which roast is least bitter?", source: "ad" },
    { text: "Do you grind beans for a French press?", source: "ad" }
  ],
  nextSteps: [
    { step: "Connect Meta", what: "Check that your Meta ad account is connected in Moshi, so the next read can show Meta's side: CTR, CPC, purchases and, where it applies, ROAS.", owner: "merchant", by: "2026-10-08" },
    { step: "First fair cost read", what: "Read cost per chat, carts and delayed orders at {m:nextGate}.", owner: "moshi", by: "2026-10-09" },
    { step: "Roast guide", what: "Skim a few chats about bitterness to see whether your agent uses the new bitterness scale.", owner: "merchant", by: "2026-10-08" }
  ],
  flags: [
    { source: "moshi", code: "cart_value_unknown", text: "Open cart value is unknown: carts carry no price." },
    { source: "moshi", code: "population_mismatch", text: "Chats include profile-button chats. Chats from ads count ad-sourced chats only, and cost per chat uses those." },
    { source: "meta", code: "no_synced_ads", text: "No Meta ads are synced for this organization: either no Meta ad account is connected or nothing has synced yet. This is no data, not zero performance." }
  ],
  notMeasurableYet: [
    "CTR, CPC and CPM: no Meta ad account is synced in Moshi",
    "Comparison with your launches: no Meta ad account is synced in Moshi",
    "Meta purchases and ROAS: no Meta ad account is synced in Moshi, and ROAS is never built from Moshi-proven orders",
    "A single purchase total: Meta's purchases are not available here, and Moshi-proven orders are a separate floor that is never added to them",
    "Moshi launch date: no tool returned it, so Moshi's age counts from the first day of the report window",
    "Open cart value: carts carry no price"
  ]
};
