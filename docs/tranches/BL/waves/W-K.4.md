# W-K.4 · One ring register with its forced-colours arm · 11.0.0

| field | value |
|---|---|
| seat | band-K wave-spec seat, formation |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `9866d229` (`src` = `f3ad78d0` = published 10.1.0); the band-K fixture (W-K.1 appendix B); forced colours are Playwright's Chromium emulation (`forcedColors: 'active'`), prefers-contrast is CDP `Emulation.setEmulatedMedia` |
| ships in | 11.0.0 |
| families | F-39 (all members), with its inbound rows |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| L08-15 (MED) | forced colours: sortable reorder handles show no focus |
| L10-13 (MED) | the dock outline trio beside the house box-shadow ring |
| R2-08-03 (HIGH) | forced colours: no scrubber Slider shows focus |
| R2-08-04 (LOW) | the state edge is a 2 px border, so a selected control grows |
| R2-08-13 (folded, round-2 correction) | the dock separator's forced-colours loss |
| R3-02-03 (HIGH) | four ring registers, three under 3:1 |
| R3-02-05 (HIGH) | the state edge lands on the control-bit's 44 px seat; `Mark` for invalid under forced colours |
| R3-02-10 (MED) | forced colours: disabled and enabled triad faces are identical |
| R5-02-07 (HIGH) | forced colours: focus on the selected SegmentedTab is invisible |
| R5-02-08 (HIGH; its Command-row leg is F-24's, W-H.1) | the dark forced palette reproduces the Slider and disabled losses |
| R5-02-09 (LOW) | the forced-colours invalid boundary fails in the light palette only |
| #83 W-CONTROL-BIT (BK register, the FC rows) | census-register-b.md:68: disabled paints like enabled under FC; the state edge on the seat |
| inbound | UIA-V-85, UIA-V-263, UIA-V-512 (a UA ring on the dock landing pad and the DockLayer panel), UIA-KF-146 (the FadingScroll port's UA outline), UIA-V-354 (SegmentedTabs' platform ring), UIA-F-129 (Input ring a detached offset stadium), UIA-KF-241 (the dock ring the loudest mark), UIA-V-613's slider-focus half |
| value.js O-73 (the dock ring colour seam, routed by W-B.2) | RETIRE CURED at HEAD: `--dock-ring-color` is declared at `dock/styles/index.css:229`, the outline reads it at `:286` and at `layer-group.css:321`, and `glass-chip.css` is imported at `styles/glass.css:123` (fix-2, `183e021a`). Re-trigger: a dock control whose focus outline does not read `--dock-ring-color` |

## 2 · The defect at HEAD

Registers, read at HEAD:

| register | site |
|---|---|
| the house outline `.focus-ring` | `styles/utilities/base.css` (the outline recipe) |
| `--focus-ring-shadow` (30 % mix) | declared `tokens/scale-paper.css:62`; read as `box-shadow` at `utilities/base.css:89`, `utilities/components.css:41`, `slider/styles.css:179,237,292`, `sortable-list/styles.css:193`, `dark-mode-toggle.css:31`, `_shared/disclosure/disclosure.css:47`, `timeline/Timeline.vue:575`, `data-table/styles.css:115`; bridged as `--shadow-focus-ring` (`theme/bridges.css:343`) and `--dock-ring` (`tokens/sizing.css:256`) |
| the dock trio | `dock/styles/index.css:229` (`--dock-ring-color: color-mix(… 48%, transparent)`) |
| none | SegmentedTabs: `rg -c focus-visible src/components/tabs` is 0, so the platform ring paints |
| UA rings | programmatic landing pads with `tabindex="-1"` and no house ring: `dock/DockCrossfade.vue:150-161`, `dock/DockLayer.vue:87`, `fading-scroll/FadingScroll.vue:67` |

The state edge: `styles/accessibility.css:9-52` writes `border-width: 2px !important` on `[aria-pressed=true]`, `[aria-checked=true]`, `[data-state=checked]` and siblings under `prefers-contrast: more` (`currentColor`) and forced colours (`Highlight`), and `Mark` for invalid. Forced colours drop every `box-shadow`, so every `--focus-ring-shadow` reader shows nothing there. The triad's forced-colours block (`glass/control-bit.css:376-402`) has no disabled rung; disabled is ink alpha only (`:226-238`).

Measured with appendix A (`node k4.mjs`), Chromium, 29 rows, **28 FAIL**:

| gate | D | DK | FCL | FCD |
|---|---|---|---|---|
| K4-G1 Slider (need 80 px at ≥ 3:1) | 0 | 0 | 0 changed px | 0 changed px |
| K4-G1 selected SegmentedTab (need 497 / 529) | 208 | 270 | 0 | 0 |
| K4-G1 DockControl (need 320) | 0 | 0 | 234 | 240 |
| K4-G1 AccordionTrigger (need 2,057) | 0 | 0 | 1,962 | 1,969 |
| K4-G6 SortableList handle (need 256) | 0 | 0 | 0 changed px | 0 changed px |
| K4-G2 disabled vs enabled face, Checkbox / Switch | — | — | 0 / 0 px differ | 0 / 0 |
| K4-G3 invalid boundary vs Canvas | — | — | 1.07:1 (`rgb(255,255,0)` on white) | 19.56:1 PASS |
| K4-G4 selected tab height, PCM and FCL | — | — | 33 → 37 px (PCM), 33 → 37 (FCL) | |
| K4-G5 PCM checked seat border (Checkbox, Switch) | `2px`, `2px` on the 44×44 seat | | | |

Playwright WebKit (`nodock=1`, forced colours not emulated there): 6 of 6 D and DK ring cells FAIL at 0 px at ≥ 3:1 (Slider, SegmentedTab, Accordion). The FC cells are Chromium-only here and recorded so; real Safari UNMEASURED.

## 3 · The cure

1. **One ring.** Every focusable reads the house outline: `outline: var(--focus-ring-width) solid var(--focus-ring-color); outline-offset: var(--focus-ring-offset)` on `:focus-visible`, through `.focus-ring` or the component's own `:focus-visible` rule that names the same three tokens. The dock trio, the ten `--focus-ring-shadow` readers, SegmentedTabs, the Slider (the ring sits on `.slider-track` when the thumb is `:focus-visible`), the sortable handle and the three landing pads (`DockCrossfade`, `DockLayer`, `FadingScroll`) all read it. A programmatic landing pad that must not paint a ring states `outline: none` next to a comment naming why (it receives focus only to move it on). `--focus-ring-shadow`, `--shadow-focus-ring`, `--dock-ring` and `--dock-ring-color` are deleted.
2. **The state edge adds no box.** Under `prefers-contrast: more` the selected, pressed, checked and current edge is `box-shadow: inset 0 0 0 2px currentColor` on the control's face (`.control-bit__face` for the triad, the element itself otherwise), and the invalid edge is the same in `--destructive`. The `border-width: 2px !important` rules in `accessibility.css` are deleted.
3. **Forced colours.** The selected, pressed and checked state paints `background: Highlight; color: HighlightText` on the face. The focus ring is the outline in `CanvasText` at `outline-offset: 2px`, outside the face, so it never sits on a `Highlight` line. The invalid field boundary is `border-color: CanvasText; border-style: dashed` at the field's resting border width. Disabled faces and the disabled Slider paint `GrayText` (the triad block gains the disabled rung).
4. **Ink.** The ring colour on painted composites is W-H.1's derived rung; this wave does not choose ink. The D and DK cells pass when W-H.1's rung lands and every control reads this one register.

## 4 · Files it touches

`src/styles/accessibility.css`, `src/styles/utilities/{base,components,a11y-overrides}.css`, `src/styles/tokens/{scale-paper,sizing}.css`, `src/styles/theme/bridges.css`, `src/styles/glass/control-bit.css`, `src/components/slider/styles.css`, `src/components/sortable-list/styles.css`, `src/components/dark-mode-toggle/dark-mode-toggle.css`, `src/components/_shared/disclosure/disclosure.css`, `src/components/timeline/Timeline.vue`, `src/components/data-table/styles.css`, `src/components/dock/styles/index.css`, `src/components/dock/{DockCrossfade,DockLayer}.vue`, `src/components/fading-scroll/FadingScroll.vue`, `src/components/tabs/styles/segmented.css`. New `tests-visual/wired/ring-register.spec.ts` (appendix A).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| K4-G1 | appendix A G1, 4 targets × D, DK, FCL, FCD (Chromium); D, DK (Playwright WebKit, no dock) | changed px at ≥ 3:1 against the resting pixel ≥ 2 × the focused element's perimeter | **16 of 16 FAIL** (Chromium), **6 of 6 FAIL** (WebKit) |
| K4-G6 | appendix A G6, the sortable handle, 4 cells | same criterion | **4 of 4 FAIL** (FCL, FCD 0 changed px) |
| K4-G2 | appendix A G2, FCL and FCD | disabled and enabled faces differ in ≥ 2 × (w + h) px | **4 of 4 FAIL** (0 px) |
| K4-G3 | appendix A G3 | invalid boundary ≥ 3:1 against `Canvas` in both palettes | **FCL FAIL** 1.07:1; FCD PASS 19.56 (the control that shows it can pass) |
| K4-G4 | appendix A G4, PCM and FCL | selected tab height equals the no-preference height (± 0.5 px) | **2 of 2 FAIL** (33 → 37) |
| K4-G5 | appendix A G5 | checked Checkbox and Switch seats compute `border-top-width: 0px` under PCM | **FAIL** (`2px`, `2px`) |
| K4-S | `! rg -q 'focus-ring-shadow\|--dock-ring' src && rg -q 'focus-visible' src/components/tabs` | exit 0 | **exit 1** (45 lines name the shadow tokens; 0 `focus-visible` under `tabs/`) |

A 2 px outline at `outline-offset` ≥ 1 px covers more than 2 × the element's perimeter (the outline's own perimeter is longer by 8 × offset), so the G1 criterion is met by a true ring and fails on no ring or a 30 % shadow.

## 6 · π and DELTA obligations

- **Surfaces:** fixture `k.html?s=ring` (Slider, triad, SegmentedTabs, ToggleGroup, DockControl, AccordionTrigger, invalid Input) and `?s=text` (sortable handle); demo `/forms/checks`, `/forms/slider`, `/navigation/tabs`, `/dock/overview`, and for the three components §4 also edits, `/display/atoms` (its DarkModeToggle member), `/data/data-table` (a DataTable row and header) and `/data/sortable-list` (the SortableList handle), at 1440×900 and 390×844 (fix-15, the π sweep `formation-audit/sweeps/pi-surface.py`).
- **Themes and modes:** D, DK, PCM, FCL, FCD.
- **Engines:** Chromium all five; Playwright WebKit D and DK (no forced-colours emulation there, recorded as not emulated); real Safari UNMEASURED (OW-3).
- **Paired capture:** `node k4.mjs --shots` writes `k4-<target>-<cell>-chromium-{rest,focus}.png`; the 32 before pairs are taken at the wave's base with `WAVE=W-K.4`, into `.cache/evidence/W-K.4/` (formation's HEAD set sat in a session scratchpad and is not evidence; there `k4-segtab-FCD-chromium-focus.png` showed the focused selected tab with only the `Highlight` edge). Each pair's π reading is its G1 row (`any`, `c3`, `need`). The wave records the same pairs after the cure.

## 7 · MIGRATION rows

| before | after | note |
|---|---|---|
| `--focus-ring-shadow`, `--shadow-focus-ring` (`shadow-focus-ring` utility) | removed | use `.focus-ring` or an outline from `--focus-ring-width`, `--focus-ring-color`, `--focus-ring-offset` |
| `--dock-ring`, `--dock-ring-color` | removed | the dock reads the house ring |
| state edge under PCM and FC: a 2 px `border` on any selected, pressed, checked or current element | PCM: an inset 2 px box-shadow on the face; FC: a `Highlight` fill with `HighlightText` | a consumer that styled `[aria-pressed=true]` borders under these media sees no border added |
| FC invalid boundary `Mark` | `CanvasText`, dashed | |

## 8 · Ledger rows

Closes F-39 (all ten members and R2-08-13), #83's FC rows, and the inbound rows UIA-V-85, -263, -512, UIA-KF-146, UIA-V-354, UIA-F-129, UIA-KF-241 and UIA-V-613's slider-focus half. Records value.js O-73 as RETIRE CURED (§1). A2-KE-L1-22 stays CONSUMER-SIDE as the inbound map holds it (no ask until keyframes measures a gap).

## 9 · Gestalt passes (P-1)

- **Tranche fit:** one ring for every focusable in every mode; W-H.1 owns its ink, this wave owns its shape and its forced-colours arm.
- **Wave:** K4-G1..G6 and K4-S green in one run.
- **Feature:** Tab through `/forms/checks` and `/navigation/tabs` under forced colours, light and dark palettes: every stop shows one `CanvasText` ring, the selected tab reads as `Highlight`, disabled bits read `GrayText`. One frame strip per palette.

## Appendix A · `k4.mjs` (lands as `tests-visual/wired/ring-register.spec.ts`)

```js
// W-K.4 born-RED probe: one ring register with its forced-colours arm (F-39). node k4.mjs [--eng webkit] [--shots]
import { open, sleep, rectOf, runner, argEng, CAP, ringPx, contrast } from './lib.mjs';
const eng = argEng(); const shots = process.argv.includes('--shots'); const { row, safe, done } = runner('k4');
const cells = [['D', { theme: 'light' }], ['DK', { theme: 'dark' }], ['FCL', { theme: 'light', fc: true }], ['FCD', { theme: 'dark', fc: true }]];
const targets = [['slider', 'slwrap', '[data-probe=slwrap] [role=slider]'], ['segtab', 'segwrap', '[data-probe=segwrap] [aria-checked="true"], [data-probe=segwrap] [aria-selected="true"], [data-probe=segwrap] [aria-pressed="true"], [data-probe=segwrap] [data-state="on"], [data-probe=segwrap] [data-state="active"]'], ['dock', 'dockwrap', '[data-probe=dc1]'], ['accordion', 'accwrap', '[data-probe=acct]']];
async function focusShot(page, wrap, sel, tag) {
  const clip = await rectOf(page, `[data-probe=${wrap}]`);
  const box = { x: clip.l, y: clip.t, width: clip.w, height: clip.h };
  await page.evaluate(() => document.activeElement?.blur()); await sleep(250);
  const a = await page.screenshot({ clip: box });
  await page.keyboard.press('Shift');
  const t = await page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; e.focus(); const r = e.getBoundingClientRect(); return { w: r.width, h: r.height, fv: e.matches(':focus-visible'), tag: e.tagName + '[' + (e.getAttribute('role') || '') + ']' }; }, sel);
  await sleep(350);
  const b = await page.screenshot({ clip: box });
  if (shots) { const fs = await import('node:fs'); fs.writeFileSync(`${CAP}/k4-${tag}-rest.png`, a); fs.writeFileSync(`${CAP}/k4-${tag}-focus.png`, b); }
  return { t, px: await ringPx(page, a, b) };
}
// G1 · every focusable in the battery shows ≥ 2 × perimeter px at ≥ 3:1 when focused, in D, DK, FCL and FCD
for (const [cell, o] of cells) await safe(`K4-G1 ${cell}`, async () => {
  if (eng !== 'chromium' && o.fc) { row(`K4-G1 ring ${cell}`, false, { skipped: 'forced colours are emulated in Chromium only here' }); return; }
  const { browser, page } = await open({ eng, qs: eng === 'chromium' ? 's=ring' : 's=ring&nodock=1', ...o, settle: 700 });
  for (const [name, wrap, sel] of targets.filter(([n]) => eng === 'chromium' || n !== 'dock')) {
    const { t, px } = await focusShot(page, wrap, sel, `${name}-${cell}-${eng}`);
    if (!t) { row(`K4-G1 ring ${name} ${cell}`, false, { missing: sel }); continue; }
    const need = Math.round(2 * 2 * (t.w + t.h));
    row(`K4-G1 ring ${name} ${cell}`, px.c3 >= need, { ...px, need, focusVisible: t.fv, el: t.tag });
  }
  await browser.close();
});
if (eng === 'chromium') {
  // G2 · forced colours: a disabled Checkbox and Switch paint differently from enabled ones
  for (const [cell, o] of cells.filter(([c]) => c.startsWith('FC'))) await safe(`K4-G2 ${cell}`, async () => {
    const { browser, page } = await open({ eng, qs: 's=ring', ...o, settle: 600 });
    for (const [en, dis] of [['cbe', 'cbd'], ['swe', 'swd']]) {
      const [ra, rb] = [await rectOf(page, `[data-probe=${en}]`), await rectOf(page, `[data-probe=${dis}]`)];
      const w = Math.min(ra.w, rb.w), h = Math.min(ra.h, rb.h);
      const a = await page.screenshot({ clip: { x: ra.l, y: ra.t, width: w, height: h } }); const b = await page.screenshot({ clip: { x: rb.l, y: rb.t, width: w, height: h } });
      const px = await ringPx(page, a, b);
      row(`K4-G2 FC disabled differs from enabled ${en.slice(0, 2)} ${cell}`, px.any >= 2 * (w + h), { ...px, need: 2 * (w + h) });
    }
    await browser.close();
  });
  // G3 · forced colours: the invalid field boundary is ≥ 3:1 against Canvas
  for (const [cell, o] of cells.filter(([c]) => c.startsWith('FC'))) await safe(`K4-G3 ${cell}`, async () => {
    const { browser, page } = await open({ eng, qs: 's=ring', ...o, settle: 600 });
    const c = await page.evaluate(() => { const e = document.querySelector('[data-probe=inv]'); const s = getComputedStyle(e); const probe = document.createElement('div'); probe.style.background = 'Canvas'; document.body.appendChild(probe); const canvas = getComputedStyle(probe).backgroundColor; probe.remove(); return { border: s.borderTopColor, width: s.borderTopWidth, canvas }; });
    const ratio = contrast(c.border, c.canvas);
    row(`K4-G3 FC invalid boundary ≥ 3:1 vs Canvas ${cell}`, ratio >= 3, { ...c, ratio });
    await browser.close();
  });
  // G4 · prefers-contrast: more and forced colours: the selected SegmentedTab keeps the strip's geometry
  const base = await (async () => { const { browser, page } = await open({ eng, qs: 's=ring', settle: 500 }); const h = (await rectOf(page, '[data-probe=segwrap] button')).h; await browser.close(); return h; })();
  for (const [cell, o] of [['PCM', { media: [{ name: 'prefers-contrast', value: 'more' }] }], ['FCL', { fc: true }]]) await safe(`K4-G4 ${cell}`, async () => {
    const { browser, page } = await open({ eng, qs: 's=ring', ...o, settle: 500 });
    const h = (await rectOf(page, '[data-probe=segwrap] button')).h;
    row(`K4-G4 selected tab geometry unchanged ${cell}`, Math.abs(h - base) < 0.5, { base, h });
    await browser.close();
  });
  // G5 · prefers-contrast: more: a checked Checkbox and Switch carry the state edge on the face, not a border on the 44 px seat
  await safe('K4-G5 PCM seat border', async () => {
    const { browser, page } = await open({ eng, qs: 's=ring', media: [{ name: 'prefers-contrast', value: 'more' }], settle: 500 });
    const m = await page.evaluate(async () => { const out = {}; for (const p of ['cbe', 'swe']) { const el = document.querySelector(`[data-probe=${p}] [role]`); el.click(); await new Promise((r) => setTimeout(r, 400)); const r = el.getBoundingClientRect(); out[p] = { seat: [r.width, r.height], border: getComputedStyle(el).borderTopWidth }; } return out; });
    row('K4-G5 PCM checked seat carries no border', m.cbe.border === '0px' && m.swe.border === '0px', m);
    await browser.close();
  });
}
// G6 · a SortableList reorder handle shows focus (L08-15: 14 handles, 0 px under forced colours)
for (const [cell, o] of cells) await safe(`K4-G6 handle ${cell}`, async () => {
  if (eng !== 'chromium' && o.fc) return;
  const { browser, page } = await open({ eng, qs: 's=text', ...o, settle: 900 });
  const { t, px } = await focusShot(page, 'sort', '[data-probe=sort] [data-sortable-handle]', `handle-${cell}-${eng}`);
  if (!t) { row(`K4-G6 handle ring ${cell}`, false, { missing: 'handle' }); await browser.close(); return; }
  const need = Math.round(2 * 2 * (t.w + t.h));
  row(`K4-G6 handle ring ${cell}`, px.c3 >= need, { ...px, need, focusVisible: t.fv });
  await browser.close();
});
done(eng);
```
