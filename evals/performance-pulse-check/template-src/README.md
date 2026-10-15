# pulse-check template source

`tpl.html` is the readable template. `build.js` inlines the logo, the avatar, drops
the quotes around plain attribute values in the markup the code writes
(`class=sub`), minifies the CSS (esbuild) and JS (terser), and writes the shipped
file:

```
node build.js ../../../plugins/moshi/skills/performance-pulse-check/assets/pulse-check.html
```

- `node build.js <out> 1` writes the unminified template.
- `node build.js <out> "" <data.js>` renders a fixture's DATA block instead
  of the built-in sample.
- The sample DATA lives in `build.js`; its daily rows are in `rows.txt`
  (`gen.js` generated them).
- `node check.js <data.js>` prints the data-check banner, the rendered text and
  the rendered HTML for one DATA file.
- `node negative/run.js` renders every `negative/*.data.js` through the shipped
  template and fails when an expected banner line, rendered string or HTML string
  is missing, or when the shipped file is over the size line.

The shipped file must stay at or under 122,880 bytes (`wc -c`; `negative/run.js`
enforces it): the design spec's 120 KB, so a host that must re-emit the template
whole can do it in one artifact. 0.11.0 moved the line from 120,000 to 120 KiB for
the overlap callout, the clone-source map and the ice-breaker shares. 0.12.0 made
room for What messaging ads tell you, Same ads, the merged funnel and the Closer
link by dropping the footer, the change timeline, the shopper themes, next steps,
the account map and Creative fatigue; the avatar and the sample DATA are already
lean, so a new section has to pay for itself.

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
