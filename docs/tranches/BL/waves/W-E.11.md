# W-E.11 · the brand face: one path, preloaded, `swap` with an advance-width calibrated fallback · 11.0.0

| field | value |
|---|---|
| seat | band-E wave-spec seat, formation (relaunch 2026-09-25) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `4d2e3123` (`src`/`demo` identical to `f3ad78d0`), scratch worktree, `dist/` and `dist-demo/` built there |
| ships in | 11.0.0 |
| families | F-35 |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| F-35 display | `font-display: optional` (`src/styles/fonts.css:84,100`) with no preload: a cold first load paints the fallback and keeps it for the page's life |
| F-35 two paths | the published package ships every face twice: 4 base64 `data:` faces inlined into `dist/styles/fonts.css` (132,840 bytes) and the same 4 woff2 files under `dist/fonts/` behind the `./fonts/*` export (`package.json:468`) |
| F-35 calibration | the fallback faces are calibrated on ascent, descent and a `size-adjust` that does not match the brand face's advance widths; four `@font-face` rules share the family name `"Plus Jakarta Sans Fallback"` with identical descriptors, so only the last (Arial) is live |
| F-35 claims | `fonts.css:79` ("no-shift on geometry") and `typography/scale.css:21` ("metrically neutral (no CLS)") state claims the paint does not meet |

## 2 · The defect at HEAD

Measured with appendix A (`node e11.mjs`), Chromium, CDP `CSS.getPlatformFontsForNode`: **7 rows, 7 FAIL**, load 67.1 → 62.0.

| gate | HEAD reading | source |
|---|---|---|
| G1 first load paints the brand face, 3 cold loads each of `/foundations/typography` and `/` | the page `h1` renders in **Arial** on 6 of 6 loads | `fonts.css:84,100` `font-display: optional`; `dist-demo/index.html` has 0 `rel="preload"` links |
| G2 fallback advance widths against the brand face | h1 700/48: 831.8 against 761.7 px (+9.2 %). Body 400/16, a 101-character line: 739.2 against 640.7 (+15.4 %). `1ch`: 9.3 against 8.0 (+16.8 %) | `typography/scale.css:22-50`: four `@font-face` rules named `"Plus Jakarta Sans Fallback"` (SF, Segoe UI, Roboto, Arial), each with ascent, descent and `size-adjust` overrides. With identical descriptors the last rule wins, so the SF, Segoe and Roboto calibrations never apply. The platform font G1 reads is Arial on macOS, not SF |

Static RED (scratch worktree, after `npm run build` and `npm run demo:dist:build`):

```
$ grep -o 'data:font/woff2;base64' dist/styles/fonts.css | wc -l
4
$ find dist/fonts -name '*.woff2' | wc -l
4
$ grep -c 'rel="preload"' dist-demo/index.html
0
$ grep -c 'font-display: optional' src/styles/fonts.css
4
```

The build's own header (`vite.style-fold.ts:20-56`) records why base64 was chosen: a linked sibling's Vite denied `url()`s that resolve into another package's `src/fonts` (`server.fs.allow`). That is a dev-link constraint, not a published-package one.

## 3 · The cure

1. **One path: files.** The woff2 files under `dist/fonts/` are the only delivery. `dist/styles/fonts.css` references them by relative `url("../fonts/<family>/<face>.woff2")`, with the `unicode-range` split kept (latin, latin-ext). The base64 inlining step in `vite.style-fold.ts` is deleted, which removes about 124 KB of font data from the CSS entry.
2. **Preloaded.** The demo's `index.html` preloads the latin Plus Jakarta Sans face: `<link rel="preload" as="font" type="font/woff2" crossorigin href=…>`. The README's install section gives a consumer the same line, pointing at `@mkbabb/glass-ui/fonts/plus-jakarta-sans/plus-jakarta-sans-latin.woff2`.
3. **The display ruling: `swap`.** Every brand `@font-face` sets `font-display: swap`. The first load paints the brand face as soon as it arrives. The fallback holds the layout until then.
4. **Calibrated on advance widths.** Each platform fallback gets its own family name: `"Plus Jakarta Sans Fallback SF"`, `"… Segoe"`, `"… Roboto"` and `"… Arial"`. They are listed in that order in the `--font-sans` stack (`tokens/scheme-motion.css:49`), so each platform picks the first local face it has. Each face's `size-adjust` is solved so that the average advance width of a fixed Latin sample (the pangram line G2 measures, weight 400) matches the brand face. `ascent-override` and `descent-override` are then solved against the adjusted size. The solver is a script (`scripts/fonts/calibrate-fallback.mjs`) that reads the brand woff2 and each local face's metrics, so the numbers are reproducible and not hand-set.
5. **The claims become true.** `fonts.css:79` and `scale.css:21` are rewritten to state the measured tolerance (≤ 1 % advance width, G2). They are not deleted.

## 4 · Files it touches

`src/styles/fonts.css`, `src/styles/typography/scale.css`, `src/styles/tokens/scheme-motion.css`, `vite.style-fold.ts`, `index.html` (the demo's HTML entry at its HEAD path; W-D.2 moves it to `demo/index.html` through the move ledger, PLAN §1, fix-8), `README.md`. New: `scripts/fonts/calibrate-fallback.mjs`, `tests-visual/wired/brand-face.spec.ts` (appendix A), which imports the band-E `lib.mjs` W-E.1 lands (PLAN §5 notes).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| E11-G1 · first load paints the brand face | appendix A G1: 3 cold loads × 2 routes | 6 of 6 `Plus Jakarta Sans` | **0 of 6** (Arial) |
| E11-G2 · advance-width calibration | appendix A G2 | each row within 1 % | **+9.2 %, +15.4 %, +16.8 %** |
| E11-G3 · one path | after `npm run build`: `test "$(grep -o 'data:font/woff2;base64' dist/styles/fonts.css \| wc -l)" -eq 0` | exit 0 | **exit 1** (4) |
| E11-G4 · preloaded | after `npm run demo:dist:build`: `grep -q 'rel="preload" as="font"' dist-demo/index.html` | exit 0 | **exit 1** (0 preload links) |
| E11-G5 · the display ruling | `! grep -q 'font-display: optional' src/styles/fonts.css` | exit 0 | **exit 1** (4) |
| E11-G6 · one face per fallback name | `test -z "$(grep -rhoiE "font-family: *[\"'][^\"']*Fallback[^\"']*[\"']" src --include='*.css' --include='*.vue' \| tr -d " \"'" \| tr 'A-Z' 'a-z' \| sort \| uniq -d)"` | exit 0: no fallback family name is declared twice anywhere in `src` (every stylesheet and SFC `<style>` block), compared without quotes, spaces or case: the last face of a name wins whichever file declares it, and §4 writes `fonts.css` beside `scale.css` (fix-18, pass 17 FQ-04 class sweep: `sibsheet`). §3 item 4's four platform faces, each its own name, pass; fix-13's count of every `Plus Jakarta Sans Fallback…` line failed them (fix-14) | **exit 1** (fix-18, `3fbaa0e7`, the span as widened: the four HEAD faces in `scale.css` share one name; no other file declares a fallback face). On the base with one face left, a second `"Plus Jakarta Sans Fallback"` face in `typography/semantic.css` and in `fonts.css` each exit 1. Before fix-18: **exit 1** (fix-14, `f9cf010e`, the span as re-written: the four HEAD faces share one name. On a base with one face left, §3 item 4's four named faces exit 0, and a second face of an existing name, in either quote or case, exits 1; the spellings are its `formation-audit/sweeps/hold-line-claim.py` CLAIMS entry). Before fix-14: **exit 1** (fix-13, `3ce80b06`, the span as re-written: 4 lines in 1 file, first `scale.css:23`; the spellings it is held to are its `formation-audit/sweeps/hold-line-claim.py` CLAIMS entry). Before fix-13: **exit 1** (4 rules share the name) |

Can each fail and pass? All six fail at HEAD. G1 on its own passes under `swap` whether or not the fallback is calibrated, which is why G2 is a separate gate. The `PI_PLANT` bite for G2 is a style tag re-declaring the Arial fallback face with `size-adjust: 100%`.

## 6 · π and DELTA obligations

- **Surfaces:** demo `/` and `/foundations/typography` at 1440×900 and 390×844, cold loads.
- **Themes:** light and dark (the face is theme-independent; the capture shows both).
- **Engines:** Chromium measured (CDP platform fonts). Playwright WebKit has no CDP, so the wired spec's WebKit arm reads `document.fonts.check('16px "Plus Jakarta Sans"')` after `load` and advance widths by the same span measure. Real Safari is UNMEASURED (OW-3). The SF calibration is a real-macOS-Safari cell: Chromium on macOS resolves the fallback to Arial at HEAD.
- **Paired capture:** at `<E11-base>` and at the wave, a filmstrip of the cold load of `/foundations/typography` at 1440, one frame every 100 ms for 1.5 s, with a layout-shift trace (`PerformanceObserver` `layout-shift` sum) beside it. HEAD shows Arial throughout. The wave shows the fallback, then the brand face, with the layout-shift sum reported.

## 7 · MIGRATION rows

| before | after | note |
|---|---|---|
| faces inlined as base64 in `@mkbabb/glass-ui/styles/fonts` | faces loaded from `@mkbabb/glass-ui/fonts/*` by relative URL | a consumer that links the package with `file:` in dev adds the linked package's `dist` to its Vite `server.fs.allow`; a registry install needs nothing |
| `font-display: optional` | `swap` | the brand face now shows on first load; add the README's preload line to avoid the swap |
| one fallback family `"Plus Jakarta Sans Fallback"` | four per-platform fallback families | a consumer stack that named the old family names the new ones or reads `--font-sans` |

## 8 · Ledger rows

Closes F-35.

## 9 · Gestalt passes (P-1)

- **Tranche fit:** one delivery path for every face the package ships (Fira Code rides the same change), one display ruling, and a solver in place of hand-set numbers.
- **Wave:** E11-G1..G6 green in one run.
- **Feature:** the cold-load filmstrip of `/foundations/typography` shows the h1 in the brand face within the first frames after the font arrives, and the line breaks of the body text are unchanged between the fallback and brand frames.

## Appendix A · `e11.mjs` (lands as `tests-visual/wired/brand-face.spec.ts`)

```js
// W-E.11 born-RED probe: the brand face paints on the first load, and the fallback is calibrated on advance widths.
// node e11.mjs
import { sleep, load, CAP, DEMO, ENG } from './lib.mjs';
import fs from 'node:fs';
const out = { load: load(), rows: [] };
const row = (id, pass, reading) => { out.rows.push({ id, pass, reading }); console.log(`${pass ? 'PASS' : 'FAIL'} ${id} ${JSON.stringify(reading)}`); };
const b = await ENG.chromium.launch();
// G1 · the first load paints Plus Jakarta Sans on the page's h1 and body text (CDP platform fonts), three cold loads
for (const route of ['/foundations/typography', '/']) for (let run = 1; run <= 3; run++) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const page = await ctx.newPage(); const cdp = await ctx.newCDPSession(page);
  await page.goto(DEMO + route, { waitUntil: 'load' }); await sleep(1200);
  await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
  const { root } = await cdp.send('DOM.getDocument', { depth: -1 });
  const fam = {};
  for (const sel of ['main h1', 'main p']) { const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: sel }); if (!nodeId) continue; const { fonts } = await cdp.send('CSS.getPlatformFontsForNode', { nodeId }); fam[sel] = fonts.map((f) => f.familyName).join('+'); }
  row(`E11-G1 first load paints the brand face ${route} #${run}`, Object.values(fam).length > 0 && Object.values(fam).every((f) => /Plus Jakarta Sans/.test(f)), fam);
  await ctx.close();
}
// G2 · calibration: the fallback face's advance widths match the brand face within 1 % (h1 display weight, a 65ch measure)
{ const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const page = await ctx.newPage();
  await page.goto(DEMO + '/foundations/typography', { waitUntil: 'networkidle' }); await sleep(800);
  const m = await page.evaluate(async () => { await document.fonts.load('700 48px "Plus Jakarta Sans"'); await document.fonts.load('400 16px "Plus Jakarta Sans"');
    const w = (fam, weight, size, text) => { const s = document.createElement('span'); s.style.cssText = `position:absolute;visibility:hidden;white-space:nowrap;font-family:${fam};font-weight:${weight};font-size:${size}`; s.textContent = text; document.body.append(s); const r = s.getBoundingClientRect().width; s.remove(); return r; };
    const h1 = 'Typography carries the whole system', para = 'The quick brown fox jumps over the lazy dog while the glass settles over the field and the ink reads.';
    const rows = []; for (const [label, weight, size, text] of [['h1 700/48', 700, '48px', h1], ['body 400/16', 400, '16px', para], ['1ch 400/16', 400, '16px', '0']]) { const brand = w('"Plus Jakarta Sans"', weight, size, text), fb = w('"Plus Jakarta Sans Fallback"', weight, size, text); rows.push({ label, brand: +brand.toFixed(1), fallback: +fb.toFixed(1), off: +((fb - brand) / brand * 100).toFixed(1) }); } return rows; });
  row('E11-G2 fallback advance widths within 1 %', m.every((r) => Math.abs(r.off) <= 1), m);
  await ctx.close(); }
await b.close();
out.load2 = load(); fs.writeFileSync(`${CAP}/e11.json`, JSON.stringify(out, null, 1));
```

After the wave, G2 measures each per-platform fallback family whose `local()` face the runner has, and records the ones it lacks as absent rather than passing. Which faces a CI runner has is read on the runner, not assumed.
