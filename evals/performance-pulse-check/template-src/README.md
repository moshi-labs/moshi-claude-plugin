# pulse-check template source

`tpl.html` is the readable template. `build.js` inlines the logo, the avatar, drops
the quotes around plain attribute values in the markup the code writes
(`class=sub`), minifies the CSS (esbuild) and JS (terser), and writes the shipped
file:

```
node build.js ../../../plugins/moshi/skills/performance-pulse-check/assets/pulse-check.html
```

The shipped file carries no data: its last script is `const DATA = null;`, which
the skill replaces with its own DATA block (SKILL.md step 9). Opened as is, it
shows a data-check banner that says the skill fills it.

- `node build.js <out> --sample` writes a preview with the sample DATA.
- `node build.js <out> 1` writes the unminified template (add `--sample` for the
  preview).
- `node build.js <out> "" <data.js>` renders a fixture's DATA block instead.
  For a gold, wrap it first:
  `{ printf 'const DATA = '; cat ../fixtures/day17-new-adset/expected-data.json; printf ';'; } > "$TMPDIR/day17.data.js"`.
- The sample DATA lives in `sample.js`; its daily rows are in `rows.txt`
  (`gen.js` generated them). `node sample.js` writes it as pretty JSON to
  `references/sample-data.json`, the skill's worked example: run it after you
  change the sample (`negative/run.js` fails while the file is stale).
- `node check.js <data.js>` prints the data-check banner, the rendered text and
  the rendered HTML for one DATA file, a `const DATA = ...;` script or a JSON
  object such as `references/sample-data.json`. With no file it runs the
  shipped template's own placeholder.
- `node negative/run.js` renders every `negative/*.data.js`, every fixture's
  gold (`../fixtures/*/expected-data.json`) and the sample through the shipped
  template. It fails when an expected banner line, rendered string or HTML string
  is missing, when a gold or the sample shows a banner, when the shipped file's
  last script is not the placeholder or the placeholder does not show its banner,
  when `sample-data.json` is stale, or when the shipped file is over the size
  line. day17-new-adset's gold also has to show the sections 0.12.0 and 0.13.0
  added (all but Same ads, which needs a Moshi ad cloned from yours).

The shipped file must stay at or under 122,880 bytes (`wc -c`; `negative/run.js`
enforces it): the design spec's 120 KB, so a host that must re-emit the template
whole can do it in one artifact. 0.11.0 moved the line from 120,000 to 120 KiB for
the overlap callout, the clone-source map and the ice-breaker shares. 0.12.0 made
room for What messaging ads tell you, Same ads, the merged funnel and the Closer
link by dropping the footer, the change timeline, the shopper themes, next steps,
the account map and Creative fatigue; the avatar and the sample DATA are already
lean, so a new section has to pay for itself. 0.13.0 paid for the running-campaigns
comparison, the baseline window and check 16 by packing the avatar with zopfli
(1,652 bytes, the same JSON) and dropping the quotes around plain attribute
values (about 170). 0.13.1 moved the sample DATA out of the template into
`references/sample-data.json` (~7 KB: 122,714 to 115,627 bytes). The skill
always replaces the DATA block, so it never used the sample.

## Avatar

`avatar/av.js` holds the Moshi Lottie avatar for `DATA.mood` (`delight` or
`reading`): both animations as one gzip+base64 JSON blob, plus their images
as shared WebP data URIs. `avatar/make.py` builds it from the frontend's
`.lottie` files (needs Pillow and zopfli, which packs the JSON 1.6 KB smaller
than gzip -9 in the same gzip format):

```
python3 -I avatar/make.py <moshi-frontend>/apps/admin-app/public/animations
```

The page loads lottie-web (`lottie_svg`, for the glow blur) from cdnjs at run
time. `still-*.webp.b64` are the fallback frames, shown when the script fails
or reduced motion is on. Re-shoot them with `avatar/still.html` (serve the
folder, open `still.html?m=delight&fr=195` or `?m=reading&fr=300` in headless
Chrome with a transparent background, encode 192 px wide WebP, keep each
under 6 KB).
