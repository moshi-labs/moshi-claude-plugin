// Runs the shipped template's code against a DATA file in a stub DOM and
// prints the data-check banner (or "none") and the rendered verdict.
// Usage: node check.js <file with `const DATA = {...};` or a JSON object>
const fs = require('fs'), vm = require('vm'), path = require('path');
const html = fs.readFileSync(path.join(__dirname,
  '../../../plugins/moshi/skills/performance-pulse-check/assets/pulse-check.html'), 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const code = scripts.filter(s => !/^\s*const DATA\s*=/.test(s)).join('\n;\n');

let src = fs.readFileSync(process.argv[2], 'utf8');
if (/^\s*\{/.test(src)) src = 'const DATA = ' + src + ';';

const app = { innerHTML: '' }, noop = () => {};
const el = () => ({ style: {}, setAttribute: noop, appendChild: noop, addEventListener: noop,
  classList: { add: noop, remove: noop, toggle: noop }, querySelectorAll: () => [], getContext: () => null });
let ready;
const ctx = {
  document: { getElementById: () => app, querySelector: () => null, querySelectorAll: () => [],
    createElement: el, head: el(), body: el(), documentElement: el(), addEventListener: noop, hidden: false },
  addEventListener: (e, f) => { if (e === 'DOMContentLoaded' || e === 'load') ready = f; },
  matchMedia: () => ({ matches: true, addEventListener: noop }),
  ResizeObserver: class { observe() {} }, MutationObserver: class { observe() {} },
  IntersectionObserver: class { observe() {} }, requestAnimationFrame: noop, setTimeout: noop,
  console, Intl, Date, Math, JSON
};
ctx.window = ctx; vm.createContext(ctx);
vm.runInContext(code + '\n' + src, ctx);
if (ready) ready();
const text = app.innerHTML.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const errs = ctx.ERRORS || [];
console.log('banner:', errs.length ? errs.join(' | ') : 'none');
console.log('rendered:', text);
