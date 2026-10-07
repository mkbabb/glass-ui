# W-E.13 · W-PRINT: the deck's page geometry on a named page, and one library print arm · 11.0.0

| field | value |
|---|---|
| seat | band-E wave-spec seat, formation (relaunch 2026-09-25) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `4d2e3123` (`src`/`demo` identical to `f3ad78d0`), scratch worktree, library and demo built there; probes drive the built demo and the band-E fixture app (W-E.1 appendix B) |
| ships in | 11.0.0 |
| families | F-80 |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| F-80 deck geometry leaks | the deck's print rules (`src/components/deck/styles/capture.css:114-130`) are imported into the main stylesheet (`src/styles/index.css:272`) and apply to every page: `@page { size: 1280px 720px }`, `print-color-adjust: exact` on `html`/`body`, and block-size resets on `html`, `body` and `#app` |
| F-80 no print arm | a dark-theme page prints its dark-scheme ink on white paper; open overlays, substrate canvases and backdrop-filtered glass reach the paper |
| F-80 scattered arms | print handling sits in three places (`capture.css:114`, `paper.css:137`, `paper.css:175`) with no one owner |

## 2 · The defect at HEAD

Measured with appendix A (`node e13.mjs`), Chromium, `page.pdf({ preferCSSPageSize: true, format: "Letter" })` and `emulateMedia({ media: "print" })`: **9 rows, 8 FAIL**, load 42.7 → 41.1.

| gate | HEAD reading | source |
|---|---|---|
| G1 a non-deck route prints on the reader's paper with economy colour | `/forms/slider`, `/containers/dialog`, `/foundations/typography`: first page 960 × 540 pt, not Letter's 612 × 792; `print-color-adjust: exact` | `capture.css:115-130` in the global stylesheet |
| G2 dark-theme print ink on white paper | worst text contrast 1.24 : 1 on all three routes (`main h1`, `h2`, `p`); `main a` 2.56 | no print arm; the dark scheme's light ink prints on white |
| G3 an open Dialog in print | scrim, focus veil and plate all computed as shown | no print rule for overlays |
| G4 `/substrates/aurora` in print | 1 visible canvas wider than 100 px; 102 elements with a live `backdrop-filter` | no print rule for substrates or glass |
| G5 the deck prints one 960 × 540 pt sheet per slide (hold line) | **PASS**: 1 page, 960 × 540 | `capture.css:115-118` |

## 3 · The cure

1. **The deck's page is named.** `capture.css` declares `@page deck { size: 1280px 720px; margin: 0 }` and sets `page: deck` on the deck stage (`[data-slot="deck-stage"]`). The `html`, `body` and `#app` resets and `print-color-adjust: exact` are gated on a deck being present: `:root:has([data-slot="deck-stage"])`. A page without a deck prints on the reader's paper.
2. **One library print arm.** `src/styles/print.css` (new, imported once by `src/styles/index.css`) is the only `@media print` block in `src/styles`. The two blocks in `paper.css` move into it. The deck's named page stays with the deck, because it is the deck's geometry, not the library's print policy. The arm does five things:
   - **Light scheme and ink.** `:root { color-scheme: light }` under print. With W-C.5's one root scheme authority, every `light-dark()` token resolves its light arm, whatever the page's theme class. `print-color-adjust: economy`.
   - **Substrates hidden.** Every substrate canvas and its host (`[data-substrate]`, the canvases the viz substrates mount) is `display: none`.
   - **Glass flattened.** `backdrop-filter: none` on every glass rung. The rung's plate resolves to the paper token (opaque), and the specular and grain layers are hidden.
   - **Overlays hidden, modals included (decided).** Every open layer in W-E.4's stack is `display: none` under print, along with the scrim and focus veil. The layer stack's `data-layer` attribute on each layer's content is the hook. A printed page shows the document, never the transient UI over it. A consumer that wants a modal printed alone prints its content through its own route, as the deck does.
   - **Paper grain hidden.** This is the existing `paper.css` rule, moved here.
3. **The deck stays whole.** The deck's own print path (one sheet per slide at 1280 × 720 px) is unchanged. G5 holds it.

## 4 · Files it touches

`src/components/deck/styles/capture.css`, `src/styles/index.css`, `src/styles/paper.css`, `src/styles/print.css` (new), `src/components/_shared/overlay/layer.ts` (the `data-layer` attribute, if W-E.4 has not already written it). New: `tests-visual/wired/print.spec.ts` (appendix A).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| E13-G1 · reader's paper | appendix A G1, 3 routes | first page 612 × 792 pt (Letter requested) and `print-color-adjust: economy` | **3 of 3 FAIL** (960 × 540, `exact`) |
| E13-G2 · light print ink | appendix A G2, dark theme, 3 routes | worst text ≥ 4.5 : 1 on white | **1.24** on all three |
| E13-G3 · overlays hidden | appendix A G3, open Dialog | scrim, veil, plate each hidden or absent | **all shown** |
| E13-G4 · substrates hidden, glass flat | appendix A G4 | 0 canvases, 0 backdrop-filtered elements | **1, 102** |
| E13-G5 · the deck (hold line) | appendix A G5 | every page 960 × 540 pt | **PASS**; bite: delete `page: deck` from the stage |
| E13-G6 · one print arm | `test "$(rg -l --pcre2 '@media[^{]*\bprint\b' src/styles \| grep -v '^src/styles/print.css$' \| wc -l)" -eq 0` | exit 0 | **exit 1** (fix-13, `3ce80b06`, the span as re-written: 2 lines in 1 file, first `paper.css:137`; the spellings it is held to are its `formation-audit/sweeps/hold-line-claim.py` CLAIMS entry). Before fix-13: **exit 1** (`src/styles/paper.css`) |

Can each fail and pass? G1-G4 fail at HEAD. G5 passes at HEAD and is a hold line with its bite. G6 is static. `capture.css` is under `src/components`, so G6 does not count it: the deck's named page is not a print arm.

## 6 · π and DELTA obligations

- **Surfaces:** demo `/forms/slider`, `/containers/dialog`, `/foundations/typography`, `/substrates/aurora`, `/motion/deck`; the fixture scene `dialog` with the Dialog open.
- **Themes:** light and dark. The dark arm is the point of G2.
- **Engines:** Chromium measured (`page.pdf` is Chromium-only in Playwright). The wired spec's Playwright WebKit arm reads the computed-style rows (G2-G4) under `emulateMedia({ media: "print" })`. Real Safari's print dialog is UNMEASURED (OW-3).
- **Paired capture:** at `<E13-base>` and at the wave, the PDFs of `/foundations/typography` in dark and of `/substrates/aurora`, each first page rasterised to PNG. HEAD is a slide-sized sheet with light ink on white and a live canvas; the wave is Letter with dark ink and no canvas. The deck PDF is paired too, and it is unchanged.

## 7 · MIGRATION rows

| before | after | note |
|---|---|---|
| every page printed at 1280 × 720 px with `print-color-adjust: exact` | only a page with a deck stage; others print on the reader's paper with `economy` | a consumer that relied on the slide-sized sheet for a non-deck page sets its own `@page` |
| a dark-theme page printed its dark scheme | print always resolves the light scheme | |
| open overlays printed | hidden in print | print a modal's content from its own route |

## 8 · Ledger rows

Closes F-80.

## 9 · Gestalt passes (P-1)

- **Tranche fit:** one print arm in `src/styles`, which reads the one scheme authority (W-C.5) and the one layer stack (W-E.4). The deck owns only its page.
- **Wave:** E13-G1..G6 green in one run.
- **Feature:** a dark-theme `/containers/dialog` with the Dialog open prints to Letter as the page's document in dark ink, with no scrim, plate or glass. `/motion/deck` still prints its slides one per sheet. The two PDFs sit side by side.

## Appendix A · `e13.mjs` (lands as `tests-visual/wired/print.spec.ts`)

```js
// W-E.13 born-RED probe: the print medium has one library arm; the deck's page geometry is its own.
// node e13.mjs   (Chromium: page.pdf with preferCSSPageSize, emulateMedia print)
import { sleep, load, CAP, DEMO, ENG, APP } from './lib.mjs';
import fs from 'node:fs';
const out = { load: load(), rows: [] };
const row = (id, pass, reading) => { out.rows.push({ id, pass, reading }); console.log(`${pass ? 'PASS' : 'FAIL'} ${id} ${JSON.stringify(reading)}`); };
fs.mkdirSync(`${CAP}/e13`, { recursive: true });
const b = await ENG.chromium.launch();
const mediaBoxes = (buf) => [...buf.toString('latin1').matchAll(/\/MediaBox\s*\[\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\]/g)].map((m) => [+m[3], +m[4]]);
const lum = (s) => { const m = s.match(/[\d.]+/g).map(Number); const [r, g, bb] = m.slice(0, 3).map((c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * bb; };
// G1 · a non-deck route prints on the reader's paper (no @page size claimed) with economy colour
for (const route of ['/forms/slider', '/containers/dialog', '/foundations/typography']) {
  const page = await (await b.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  await page.goto(DEMO + route, { waitUntil: 'networkidle' }); await sleep(800);
  const pdf = await page.pdf({ preferCSSPageSize: true, format: 'Letter' });
  await page.emulateMedia({ media: 'print' });
  const pca = await page.evaluate(() => getComputedStyle(document.body).printColorAdjust || getComputedStyle(document.body).webkitPrintColorAdjust);
  const boxes = mediaBoxes(pdf); const first = boxes[0];
  row(`E13-G1 reader's paper ${route}`, first && Math.abs(first[0] - 612) < 1 && Math.abs(first[1] - 792) < 1 && pca === 'economy', { firstPagePt: first, pages: boxes.length, printColorAdjust: pca });
  await page.close();
}
// G2 · a dark-theme print keeps every text run ≥ 4.5:1 on white paper (the print arm is the light scheme)
for (const route of ['/forms/slider', '/foundations/typography', '/containers/dialog']) {
  const page = await (await b.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: 'dark' })).newPage();
  await page.goto(DEMO + route, { waitUntil: 'networkidle' }); await sleep(600);
  await page.evaluate(() => document.documentElement.classList.add('dark'));
  await page.emulateMedia({ media: 'print', colorScheme: 'dark' }); await sleep(300);
  const inks = await page.evaluate(() => { const o = []; for (const sel of ['main h1', 'main h2', 'main p', 'main label', 'main a']) { const e = document.querySelector(sel); if (e) o.push([sel, getComputedStyle(e).color]); } return o; });
  const worst = inks.map(([s, c]) => [s, +((1.05) / (lum(c) + 0.05)).toFixed(2)]).sort((a, c) => a[1] - c[1]);
  row(`E13-G2 dark print ink ${route}`, worst.length > 0 && worst[0][1] >= 4.5, { worst: worst.slice(0, 3) });
  await page.close();
}
// G3 · an open overlay does not reach paper: the scrim, the focus veil and the plate compute display:none under print (Dialog open)
{ const page = await (await b.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  await page.goto(APP + '?s=dialog&auto=dlg'); await page.waitForFunction(() => window.__ready); await sleep(700);
  await page.emulateMedia({ media: 'print' });
  const m = await page.evaluate(() => { const shown = (e) => e && getComputedStyle(e).display !== 'none' && getComputedStyle(e).visibility !== 'hidden'; const layers = { scrim: document.querySelector('[data-slot=dialog-overlay], .bg-overlay-scrim'), veil: document.querySelector('.glass-focus-veil'), plate: document.querySelector('[data-probe=dialog]') }; return Object.fromEntries(Object.entries(layers).map(([k, e]) => [k, e ? shown(e) : 'absent'])); });
  row('E13-G3 open overlay hidden in print', Object.values(m).every((v) => v === false || v === 'absent') && Object.values(m).some((v) => v === false), m);
  await page.close(); }
// G4 · substrate canvases hidden and glass flattened in print (/substrates/aurora)
{ const page = await (await b.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  await page.goto(DEMO + '/substrates/aurora', { waitUntil: 'networkidle' }); await sleep(1200);
  await page.emulateMedia({ media: 'print' });
  const m = await page.evaluate(() => ({ canvases: [...document.querySelectorAll('canvas')].filter((c) => getComputedStyle(c).display !== 'none' && c.getBoundingClientRect().width > 100).length, lenses: [...document.querySelectorAll('[class*=glass-]')].filter((e) => { const f = getComputedStyle(e).backdropFilter; return f && f !== 'none'; }).length }));
  row('E13-G4 substrates hidden, glass flat in print', m.canvases === 0 && m.lenses === 0, m);
  await page.close(); }
// G5 · the deck still prints one 1280×720 px (960×540 pt) sheet per slide (hold line)
{ const page = await (await b.newContext({ viewport: { width: 1280, height: 720 } })).newPage();
  await page.goto(DEMO + '/motion/deck', { waitUntil: 'networkidle' }); await sleep(1200);
  const pdf = await page.pdf({ preferCSSPageSize: true }); const boxes = mediaBoxes(pdf);
  row('E13-G5 deck sheet 960×540 pt (hold line)', boxes.length > 0 && boxes.every(([w, h]) => Math.abs(w - 960) < 1 && Math.abs(h - 540) < 1), { pages: boxes.length, first: boxes[0] });
  await page.close(); }
await b.close();
out.load2 = load(); fs.writeFileSync(`${CAP}/e13.json`, JSON.stringify(out, null, 1));
```
