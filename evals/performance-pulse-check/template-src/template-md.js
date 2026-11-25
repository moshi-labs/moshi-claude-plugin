// The shipped pulse-check template is a Markdown file holding the page in one ````html fence.
const fs = require('fs');
const HEADER = '# the pulse-check report template\n\n' +
  'The page for the pulse-check report. To render it, copy everything inside the fenced block below, exactly as it is, into a new HTML artifact. ' +
  'Then replace only the `const DATA = {...};` block, as SKILL.md describes. Leave the rest of the page as it is.\n\n';
const wrap = html => HEADER + '````html\n' + html.replace(/\n+$/, '') + '\n````\n';
const unwrap = md => { const m = md.match(/````html\n([\s\S]*?)\n````/); if (!m) throw new Error('no ````html fence'); return m[1]; };
const read = file => unwrap(fs.readFileSync(file, 'utf8'));
module.exports = { wrap, unwrap, read };
