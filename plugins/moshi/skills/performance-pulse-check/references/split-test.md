# Split tests

Read this when Moshi is running a split test: two ad sets with the same
creatives and budget, where one opens a chat and the other sends shoppers
to the website (DM vs Web). The template has no section for it, so this
is the one addition you make outside DATA. Everything else stays as the
template renders it.

## What the section shows

It goes after From conversation to purchase, before Respond to your
Closers, in the layout the hand-built report of 2026-10-13 set. In order:

1. The title, "This week's test: two new ad sets" or similar, and one sub
   line with the launch day ("Launched Mon Oct 5, after the first ad set
   was paused").
2. Two or three sentences on what is tested and why: same creatives, same
   budget, one opens a chat, one goes to the website, so it shows what the
   chat step adds at the same spend.
3. "The three ads, running in both": the creatives as centered pictures,
   140 px wide, each with its name under it. The pictures are the ads'
   `thumbnailUrl`.
4. A table with two columns and no column for the ad set the test
   replaced. The headers are **Moshi**, with the round Moshi logo, and
   **Click to Website**, with the pixel vintage Mac below. The rows: How it
   runs, Daily budget, Button (the call to action, when you know it),
   Purchases counted on, Optimizing for, the first days' results (spend,
   chats started, Meta purchases) and Next reads.
5. One line on reading it: both ad sets run in one campaign, so Meta may
   enter only one of them in a given auction. Read them side by side; a
   Meta A/B test splits the audience cleanly.

## Numbers

No token resolves here, so every number is one you copy from the tree:
each ad set's `dailyBudget` (÷ 100), `attributionSpec` in words, and its
`daily[]` spend, `messagingConversationsStarted` and `purchases` added up
over the days so far. Never type a rate, a cost per chat, a CPA or a
ROAS. Next reads are each ad set's gate dates from `stage-gates.md`
(day 4 for cost per chat, day 8 for the first CPA). Before day 8, name no
winner: "One day is too early to call either."

A test that launched in the last 7 days makes the report window the 7
days before it (`data-contract.md` → Report window), so the rest of the
report is the baseline the test is measured against. This section is
then the only place the test shows: its numbers cover the test's own
days so far, and the sub line's launch day says so.

## The snippet

Put this `<script>` after the script that holds `const DATA` (the last
one). Fill `T`; leave the rest as it is. It runs after the report renders
and adds the section before Respond to your Closers, or at the end.

```html
<script>
addEventListener('DOMContentLoaded', () => {
  const T = {
    title: 'This week’s test: two new ad sets',
    sub: 'Launched Mon Oct 5, after the first ad set was paused.',
    intro: 'Instead of one Moshi ad set on its own, we split the budget into two equal ad sets with the same three creatives: one sends shoppers into a Moshi chat, the other to the website. That shows what the chat step adds at the same spend.',
    adsTitle: 'The three ads, running in both',
    ads: [{ name: 'Heat ladder reel', img: 'https://…' }],
    rows: [['How it runs', 'The ad opens a chat', 'The same ads send shoppers to the website'],
      ['Daily budget', '$150', '$150'], ['Purchases counted on', '7-day click, 1-day view', '7-day click, 1-day view'],
      ['Next reads', 'Oct 8 cost per chat, Oct 12 first CPA', 'Oct 8 cost per chat, Oct 12 first CPA']],
    note: 'Both ad sets run the same creatives in one campaign, so Meta may enter only one of them in a given auction. Read them side by side; a Meta A/B test would split the audience cleanly.'
  };
  const e = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const app = document.getElementById('app'), logo = document.querySelector('.hd img'), web = (x, s) => /^https:\/\//.test(x || '') ? s : '';
  const mac = `<svg viewBox="0 0 24 30" width="48" height="60" shape-rendering="crispEdges" aria-hidden="true"><rect x="2" y="1" width="20" height="24" rx="2" fill="#e9e2cf" stroke="#9c9480"/><rect x="4.5" y="3.5" width="15" height="12" rx="1" fill="#f6f7fb" stroke="#7d7765" stroke-width=".8"/><rect x="5.3" y="4.3" width="13.4" height="2" fill="#cfd6ea"/><rect x="6" y="5" width=".8" height=".8" fill="#7d7765"/><rect x="7.4" y="5" width=".8" height=".8" fill="#7d7765"/><rect x="6.5" y="8" width="7" height="1" fill="#cfd6ea"/><rect x="6.5" y="10" width="5" height="1" fill="#cfd6ea"/><path d="M12.5 8.5L12.5 14.6L14 13.2L15.1 15.4L16 15L14.9 12.8L16.8 12.8Z" fill="#fff" stroke="#333" stroke-width=".5" stroke-linejoin="round" shape-rendering="geometricPrecision"/><rect x="11" y="18.5" width="8" height="1.4" fill="#7d7765"/><rect x="4.5" y="18.5" width="2" height="1.4" fill="#c6bea8"/><rect x="4" y="25" width="16" height="3.5" fill="#d9d1bc" stroke="#9c9480" stroke-width=".8"/></svg>`;
  const head = (icon, t) => `<span style="display:flex;align-items:center;gap:8px;font-size:14px;font-weight:600;color:var(--text)">${icon}${t}</span>`;
  const sec = document.createElement('section');
  sec.className = 'glass';
  sec.innerHTML = `<div><h2>${e(T.title)}</h2><p class="sub">${e(T.sub)}</p></div><p>${e(T.intro)}</p>
<div style="display:grid;gap:8px;justify-items:center"><b>${e(T.adsTitle)}</b><div style="display:flex;flex-wrap:wrap;gap:16px;justify-content:center">${T.ads.map(a => `<figure style="margin:0;width:140px;text-align:center">${web(a.img, `<img src="${e(a.img)}" alt="" style="display:block;width:140px;aspect-ratio:4/5;object-fit:cover;border-radius:8px;border:1px solid var(--border)">`)}<figcaption class="sub" style="margin-top:4px">${e(a.name)}</figcaption></figure>`).join('')}</div></div>
<div class="tw"><table><thead><tr><th></th><th>${head(logo ? `<img src="${logo.src}" alt="" width="44" height="44" style="border-radius:50%">` : '', 'Moshi')}</th><th>${head(mac, 'Click to Website')}</th></tr></thead><tbody>${T.rows.map(r => `<tr>${r.map(c => `<td>${e(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
<p class="sub">${e(T.note)}</p>`;
  const closers = [...app.children].find(x => (x.querySelector('h2') || {}).textContent == 'Respond to your Closers');
  app.insertBefore(sec, closers || null);
});
</script>
```
