# W-E.7 · W-DENSITY-DECIDE and the sweep: pads from corners, gaps by width, label slots, one coarse type model, coarse hit areas · 11.0.0

| field | value |
|---|---|
| seat | band-E wave-spec seat, formation (relaunch 2026-09-25) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `4d2e3123` (`src`/`demo` identical to `f3ad78d0`), scratch worktree, library and demo built there; probes drive the band-E fixture app (W-E.1 appendix B) and the built demo |
| ships in | 11.0.0 |
| families | F-29 remainder (O-74 erratum E-2, the one coarse type model; O-74's F-29 rows; A2-KE-L2-6; UIA-V-225; G-23 COARSE-TARGET-COMPUTED from the W-A.2 roster; the W-B.4 fold "the slider's 44 px coarse hit area by slop"; the W-B.2 folds UIA-F-147, UIA-V-549 and the 25.9 px label) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| W-DENSITY-DECIDE | the density ruling: **gaps only** (decided, §3.1) |
| F-29 pairing | the pairing law `pad = r − 4` (`tokens/sizing.css:108-112`) holds in some cells and not others, because the one width query (`sizing.css:333-342`) steps `--space-family`, which plates read as their pad |
| F-29 row budget | at the coarse phone cell, two demo routes pan horizontally |
| F-29 label slots | a long label in a collection control widens the page (W-0.3 cured the first case) |
| F-29 count axis | 20 pager dots in a 384 px seat are 964 px wide |
| O-74 E-2 | coarse type: `--ui-scale: 1.5` multiplies control text past the subheading; display-1 equals heading at phone widths; fields are 14 px |
| UIA-F-147, UIA-V-549, the 25.9 px label | the segmented label on `--type-caption` (12.2 px) beside a 21 px button; the 25.9 px control label is display-1 read at the heading floor |
| A2-KE-L2-6, G-23 | compact dock seats and the slider thumb have no 44 px coarse hit area |
| UIA-V-225 | the menu row is floored at 44 px on a fine pointer |
| A2-KE-L2-14, A2-FO-L2-18, O-74 E-5 | the micro floor: `--type-micro` is a fixed 11 px (`typography/scale.css:86`) on every pointer, and keyframes.js, fourier and value.js set readable text in it (`text-micro`). The ask's cure is a 12 px floor under a coarse pointer (`valuejs-outbound-2026-09-24-audit-2.md:141-142`, erratum E-5) |
| A2-FO-L2-6 | the SegmentedTabs strip's buttons have no coarse hit area: only the mobile trigger carries `data-control-target` (`tabs/SegmentedTabs.vue:219`) |

## 2 · The defect at HEAD

Measured with appendix A (`node e7.mjs --routes`), Chromium: **16 rows, 12 FAIL**, load 24.7 → 29.1. The first run carried two Card rows that are dropped: Card's root carries no pad by design (its pad is on CardContent), so `pad = 0` is not a reading of the law.

| gate | HEAD reading | source |
|---|---|---|
| G1 pairing, coarse 390 and 1440 | Dialog 390: pad 12, r 16 PASS; **Dialog 1440: pad 20, r 16**. **Sheet 390: pad 12, r 24**; Sheet 1440 PASS. Popover PASS at both. **Toast: pad 24, r 16** at both | plate pads read `--space-family`, which the width query steps 20 → 12 (`sizing.css:337`); the toast pads `p-6`. The Dialog's r 16 is G-27's lost corner (W-E.2 restores 24) |
| G2 row budget, 80 routes at coarse 390 | 2 routes pan: `/data/virtual-section` +185 px, `/motion/deck` +54 px | `demo/stories/data/virtual-section.vue:70` `flex items-center gap-3`, 549 px in a 350 px seat; `/motion/deck`: a button row reaching 444 px, and the slide track at 675 px counted in `<main>`'s scroll width |
| G3 label slots, 200-character labels in a 384 px seat | document `scrollWidth` 1898; overflow 769 (SegmentedTabs), 1508 (ToggleGroup), 746 (Button), 1495 (Select trigger) | the label slots have no `min-inline-size: 0` or clamp |
| G4 count axis | document 980; 20 dots 964 px; 8-tab strip 592 px | PagerDots lays out every dot unless `windowFit` is passed (`pager-dots/PagerDots.vue:42-46,136-143`); the strip does not fold (the strip is W-E.9's, §3.4) |
| G5 coarse type | display-1 25.888 = heading 25.888; subheading 20.352; button 21; sm button 18.27; input 14 | `--ui-scale: var(--ui-coarse-scale, 1.5)` at `tokens/light-dark.css:19`; `--control-text: calc(var(--type-small) * var(--ui-scale))` at `sizing.css:35`; `--type-display-1: clamp(1.618rem, …)` at `typography/scale.css:122` floors at the heading rung; the field reads `--type-small` at `_shared/field/control.css:121` |
| G6 segmented label | 12.179 px against the button's 21 | `tabs/styles/segmented.css:284,311` read `--type-caption`/`--type-small`, not `--control-text` |
| G7 coarse hit, 21 px from centre on four sides | compact dock seat: box 20.9 × 32.8, 0 of 4 hits. Slider thumb: box 0 × 20, 2 of 4 | `dock/styles/controls/touch-floor.css:25` excludes `--compact`; `--slider-touch-target: 1.5rem` at `sizing.css:290` |
| G8 fine-pointer menu row | 44 px | `_shared/menu/menu.css:12` `min-block-size: max(2rem, var(--touch-target, 2.75rem))` on every pointer |

Local width queries that key density on the viewport, not the seat: `labeled-field/LabeledField.vue:127` (36rem), `progress/Progress.vue:149`, `sheet/styles.css:483` (40rem), `tabs/styles/segmented.css:115,308`.

## 3 · The cure

1. **The ruling: gaps only.** The ruler is the pairing law at `tokens/sizing.css:108-112`: `pad(role) = r(role) − 4`. A plate's pad derives from its corner and does not change with width. Each plate role gets a pad token, `--pad-<role>: calc(var(--radius-<role>) - 4px)` with the 4 px floor, and plates read it instead of `--space-family`. The width query at `sizing.css:333-342` keeps stepping the `--space-*` gap rungs and nothing else. The three other options in PLAN (corners transposing with pads, or pads deriving from corners with a width step) are not taken: the first changes a corner by width, which the role invariant (W-E.8) forbids; the second re-opens the Sheet/Dialog disagreement this wave closes.
2. **The sweep.** Dialog (`r` 24 after W-E.2) pads 20; the Sheet pads 20 at every width; Popover and menu pad 12 (r 16); the toast pads 12 (r 16), dropping `p-6`. The local width queries above that step a pad or a gap on the viewport are deleted, or re-keyed to a container query by W-E.9 (LabeledField, SegmentedTabs).
3. **The label-slot rule, for every collection control.** W-0.3's zero-basis form, generalised. The label slot of a SegmentedTabs tab, ToggleGroup item, Button, and Select trigger value is `min-inline-size: 0` with one-line `text-overflow: ellipsis`. The control is `max-inline-size: 100%` of its seat. The full label stays the accessible name (`aria-label` or the text node). The demo's control rows (`virtual-section.vue:70` and the deck story's button row) wrap with `flex-wrap: wrap`. The deck stage clips its slide track at its own viewport, so off-stage slides do not count in `<main>`'s scroll width.
4. **The count axis.** PagerDots' `windowFit` behaviour (`PagerDots.vue:42-46,136-143`, opt-in at HEAD) becomes the only behaviour and the prop is deleted: the rail lays out at most `floor(seat / pitch)` dots, windowed around the current page. The two edge dots render at the half size, like the iOS page control. The count stays in the accessible name ("Page 3 of 20"). The 8-tab strip's fold is W-E.9's (SegmentedTabs folds on its own inline size); its reading (592 px) is handed to W-E.9's fold gate.
5. **One coarse type model (O-74 E-2).** A coarse pointer changes targets, not the type scale.
   - `--ui-scale` stops multiplying type: `--control-text` and `--control-text-sm` read fixed rungs, `--type-small` and `--type-caption` on a fine pointer. Under `(pointer: coarse)` they read `1rem` and `--type-small`.
   - Fields read `--control-text`, so a coarse field is 16 px and iOS does not zoom it.
   - `--type-display-1`'s floor moves from `1.618rem` to the title rung (`2.058rem`), so display-1 exceeds heading at every width. This also closes the 25.9 px label.
   - SegmentedTabs labels read `--control-text` (UIA-F-147, UIA-V-549).
   - `--ui-scale` keeps its geometry role for control heights. It is out of the type path.
   - The micro floor: under `(pointer: coarse)` `--type-micro` reads `0.75rem` (12 px), the ask's own cure (A2-KE-L2-14, A2-FO-L2-18, O-74 E-5). On a fine pointer it stays 11 px.
6. **Coarse hit areas (G-23, A2-KE-L2-6).** W-E.2 §3.6's coarse `::after` hit area of `max(100%, var(--touch-target))` applies to the slider thumb (`--slider-touch-target` is deleted), to compact dock seats, and to the SegmentedTabs strip's buttons (A2-FO-L2-6). The `:not(.dock-icon-button--compact)` exclusion at `touch-floor.css:25` goes. The dock seat's box does not change, so D2's run geometry is untouched.
7. **The coarse floor is coarse-only (UIA-V-225).** `menu.css:12` becomes `min-block-size: 2rem`. The coarse row gets the hit area from §3.6, not a taller box.

## 4 · Files it touches

`src/styles/tokens/sizing.css`, `src/styles/tokens/light-dark.css`, `src/styles/typography/scale.css`, `src/components/_shared/field/control.css`, `src/components/_shared/menu/menu.css`, `src/components/tabs/styles/segmented.css`, `src/components/toggle-group/styles.css`, `src/components/button/styles.css`, `src/components/select/SelectTrigger.vue`, `src/components/pager-dots/PagerDots.vue`, `src/components/slider/styles.css`, `src/components/dock/styles/controls/touch-floor.css`, `src/components/toast/Toast.vue`, `src/components/sheet/styles.css`, `src/components/dialog/styles.css`, `src/styles/glass/overlay-plate.css`, `src/components/progress/Progress.vue`, `src/components/deck/styles/stage.css`; `demo/stories/data/virtual-section.vue`, `demo/stories/motion/deck.vue`. New: `tests-visual/wired/density.spec.ts` (appendix A); G-23 bound in the roster to its G7 rows.

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| E7-G1 · pairing law in every cell | appendix A G1: `pad = r − 4` for Dialog, Sheet, Popover, toast at coarse 390 and 1440 | 8 of 8 | **4 of 8 FAIL** (Dialog 1440 20/16; Sheet 390 12/24; toast 24/16 ×2) |
| E7-G2 · row budget | appendix A G2 `--routes`, 80 routes at coarse 390 | 0 pan | **2** (+185, +54) |
| E7-G3 · label slots | appendix A G3 | document `scrollWidth` ≤ 390, 0 slots out | **1898**; 4 of 4 out |
| E7-G4 · count axis (dots) | appendix A G4, dots clause | dots ≤ 384 | **964** |
| E7-G5 · coarse type model | appendix A G5 | button < subheading, display-1 > heading, input ≥ 16 | **21 ≥ 20.35; 25.888 = 25.888; 14** |
| E7-G6 · segmented on the control rung | appendix A G6 | within 0.5 px of the button | **12.18 vs 21** |
| E7-G7 · G-23 coarse hit | appendix A G7: compact dock seat and slider thumb, 4 of 4 hits at 21 px | 2 of 2 | **0 of 4; 2 of 4** |
| E7-G8 · fine menu row | appendix A G8 | < 44 px | **44** |
| E7-G9 · one width query | `test "$(rg -c '@media \(max-width\|@media \(min-width' src/components/labeled-field/LabeledField.vue src/components/progress/Progress.vue src/components/sheet/styles.css src/components/tabs/styles/segmented.css \| awk -F: '{s+=$2} END{print s+0}')" -eq 0` | exit 0 | **exit 1** (the five local queries in §2) |
| E7-G10 · the DockTrigger rung (UIA-V-236, UIA-V-76's trigger leg) | fix-2's probe scene `dtrig`: DockTrigger height against DockControl height, Chromium (GlassDock crashes Playwright WebKit) | equal within 0.5 px | **FAIL**: 35.3 vs 40 |
| E7-G11 · the chevron rung (UIA-KF-243) | the same scene: the trigger's chevron box against the control's glyph box | equal | **FAIL**: 12 vs 20 |
| E7-G12 · the Dialog grid holds its content (UIA-F-107) | scene `e7dialog`: a `nowrap` 70-digit line inside `DialogContent`; its right edge against the content's | overrun ≤ 0 | **FAIL**, both engines: 316.7 at coarse 390, 269.3 at 1440 (grid track `653.656px` in a 350 px content) |
| E7-G13 · the ✕ on the title line (UIA-F-229) | the same scene: close-button centre y against the title line's centre y | within 1 px | **FAIL**, both engines: 398.7 vs 392 (390), 416.3 vs 412.1 (1440) |
| E7-G14 · the separator meets the plate (UIA-V-523) | scene `e7menu`: separator ends against the plate's inner edges | gap 0 each side | **FAIL**, both engines, both cells: 8 px each side |
| E7-G15 · the lg glyph on the label's rung (UIA-F-221) | scene `e7rung`: Button `size=lg` glyph box against its label font size | glyph ≤ 1.25 × label | **FAIL** at coarse 390, both engines: 24 vs 16 (1.5); 1440 passes (16 vs 18.608) |
| E7-G17 · the micro floor (A2-KE-L2-14, A2-FO-L2-18, O-74 E-5) | fix-3's probe (`formation-audit/fix-3.md` appendix Q1): computed `font-size` of a `.text-micro` span, coarse 390 (`hasTouch`, `isMobile`) and fine 1440 | ≥ 12 px at coarse 390; 11 px at fine 1440 | **FAIL** at coarse 390, both engines: 11 (fix-3, `be1969ea`). A planted `@media (pointer: coarse) { :root { --type-micro: 0.75rem } }` reads 12, fine 1440 stays 11 |
| E7-G18 · the strip's coarse hit (A2-FO-L2-6) | the same probe: the second SegmentedTabs strip button, `elementFromPoint` 21 px from its centre on four sides, coarse 390 | 4 of 4 | **FAIL**, both engines: 2 of 4, box 65.5 × 26.3 (fix-3). A planted coarse `::after` of `max(100%, 2.75rem)` on `.segmented-tab` reads 4 of 4 |
| E7-G16 · one sm rung (UIA-F-222) | the same scene: Button `sm` height against NumberField `sm` height | equal | **FAIL** at coarse 390, both engines: 44 vs 54; 1440 passes (36, 36) |

**The mechanism rows.** Every F-29 row the LEDGER marks `[M]` is closed by one gate here or is ruled:

| row | gate or terminal |
|---|---|
| UIA-F-91, UIA-V-112, UIA-V-224, UIA-V-253, UIA-V-259, UIA-V-262 (the coarse lift; the voice mix is the consumer's), UIA-V-314, UIA-V-365, UIA-V-389, UIA-V-445, UIA-KF-254, UIA-KF-192 (input ≥ 16) | E7-G5 (the coarse type model: one `--control-text`, no `--ui-scale` on text) |
| UIA-V-139, UIA-V-299, UIA-V-347, UIA-V-381, UIA-V-306 (the 54-60 px coarse controls and rows) | E7-G16 (one sm rung) with E7-G5: the same `--ui-scale` factor sets their height |
| UIA-V-44, UIA-V-292, UIA-V-612 | E7-G2 (row budget) |
| UIA-F-38, UIA-V-511 | E7-G3 (label slots) |
| UIA-V-76 | E7-G7 (the compact dock seat) and E7-G10 (the trigger) |
| UIA-F-217, UIA-V-261 | E7-G8 (fine menu row) |
| UIA-V-548 | E7-G9 for the width-query law; the Dialog header flip itself is RETIRE CURED at HEAD (`dialog/styles.css:36-41` `text-align: start` at every width; `DialogHeader.vue:9-11`) |
| UIA-V-444, UIA-V-636, UIA-V-328's footer leg | RETIRE CURED at HEAD for the stacking: the footer is a row at every width (`dialog/styles.css:90-95`); their 60 px height is E7-G5's and E7-G16's |
| UIA-V-236, UIA-KF-243, UIA-F-107, UIA-F-229, UIA-V-523, UIA-F-221, UIA-F-222 | E7-G10 to E7-G16 |
| A2-KE-L3-1 (segmented on another type axis) | E7-G6 |
| A2-KE-L2-9 (the field reads 14 px) | E7-G5 (input ≥ 16) |
| A2-VA-L3-6, A2-KE-L3-2, A2-FO-L3-14, A2-VA-L3-1 (E-2's one coarse type model: control text past the headings, headings off `--ui-scale`, labels out-ranking the h1, the display-1 floor) | E7-G5 |
| A2-KE-L2-14, A2-FO-L2-18, O-74 E-5 (the micro floor) | E7-G17 |
| A2-FO-L2-6 (the strip's coarse hit) | E7-G18 |
| A2-FO-L2-14 (SegmentedTabs has no overflow mode) | W-E.9, E9-G5, with UIA-F-41 |
| UIA-KF-147 | RETIRE NOT-REPRODUCED for its shortcut clause (its micro-rung clause is A2-KE-L2-14's, E7-G17): the library's shortcut is 18.27 px under a 21 px label at coarse 390 and 14.38 under 16.4 at 1440 (scene `e7menu`, both engines); the 11 px caps are the consumer's own. Re-trigger: a `DropdownMenuShortcut` under 0.8 × its row's label |
| UIA-KF-304 | RETIRE ANSWERED (consumer-side): the library ships no copyable-literal part; the wrap policy is the consumer's element |
| UIA-F-41 | W-E.9 (E9-G5, SegmentedTabs overflow) |
| UIA-F-105, UIA-KF-215 | W-I.1 (the Metric inline policy with O-84a, G28 and G30) |

Can each fail and pass? Four G1 cells pass at HEAD (the controls). Every other row fails. G9 is static. The `PI_PLANT` bite for G1 is `:root{--space-family:0.75rem}` applied at 1440, which moves a pad that should now be corner-derived only if a plate still reads the gap token.

## 6 · π and DELTA obligations

- **Surfaces:** the fixture scenes `dialog`, `sheet`, `pop`, `toast`, `lbl`, `count`, `type`, `dockc`, `slider`, `menu`; all 80 manifest routes at coarse 390 for G2; demo `/containers/dialog`, `/containers/sheet`, `/navigation/tabs`, `/forms/slider` at 390 and 1440.
- **Themes:** light and dark for the paired captures. The rows are geometric and run light.
- **Engines:** Chromium measured (coarse through `hasTouch`/`isMobile`). The wired spec's Playwright WebKit arm runs G1, G3-G6 and G8 on the fixture app. Its G2 and demo routes crash at HEAD, recorded as crashes. Real Safari is UNMEASURED (OW-3), and the 16 px no-zoom claim is a real-iOS cell.
- **Paired capture:** at `<E7-base>` and at the wave, the Dialog and Sheet at 390 and 1440 side by side (pad against corner annotated), the `lbl` and `count` scenes at 390, and the `type` scene at coarse 390. The DELTA is each pair plus appendix A's JSON.

## 7 · MIGRATION rows

| before | after | note |
|---|---|---|
| plates pad `--space-family` (20 → 12 below 768 px) | plates pad `--pad-<role>` = corner − 4, constant | a Sheet at 390 pads 20, not 12; a toast pads 12, not 24 |
| `--ui-scale` multiplies control text on a coarse pointer | `--control-text` is `1rem` on coarse, `--type-small` on fine | coarse control labels are 16 px, not 21 |
| `--type-display-1` floor `1.618rem` | `2.058rem` | display-1 is larger than heading at phone widths |
| `--slider-touch-target` | removed | the coarse hit area is the shared `::after` slop |
| menu rows 44 px on every pointer | 32 px box on fine, 44 px hit area on coarse | |
| PagerDots draws every dot unless `windowFit` is passed | always windowed to the seat; `windowFit` removed | the accessible name carries the count |

## 8 · Ledger rows

Closes O-74 E-2 and O-74's F-29 rows, A2-KE-L2-6, UIA-V-225, UIA-F-147, UIA-V-549, the 25.9 px label, and G-23 (bound). Closes the F-29 mechanism rows on the gates §5's table names, and records UIA-KF-147 (NOT-REPRODUCED), UIA-KF-304 (ANSWERED), UIA-V-548, UIA-V-444 and UIA-V-636 (CURED) as RETIRE. The W-B.4 slider fold closes here.

## 9 · Gestalt passes (P-1)

- **Tranche fit:** one ruler (corner → pad), one width axis (gaps), one coarse axis (targets). D2 reads the coarse model for the dock (O-81 (3)) and changes no type.
- **Wave:** E7-G1..G9 green in one run.
- **Feature:** at coarse 390, a Dialog holding a segmented control, a slider and a 20-page pager fits its seat. The control labels are 16 px under a larger subheading, and every target takes a thumb 21 px off centre. Captured beside the same Dialog at 1440, where only the gaps differ.

## Appendix A · `e7.mjs` (lands as `tests-visual/wired/density.spec.ts`)

The Card rows of the first run are removed here. G1 lists Dialog, Sheet, Popover and toast.

```js
// W-E.7 born-RED probe: density (the pairing law in every cell), the row budget, label slots, the one coarse type model, coarse hit floors.
// node e7.mjs [--routes]   (--routes runs the row budget over every manifest route at coarse 390)
import { open, rectOf, cs, sleep, load, CAP, DEMO, ENG } from './lib.mjs';
import fs from 'node:fs';
const out = { load: load(), rows: [] };
const row = (id, pass, reading) => { out.rows.push({ id, pass, reading }); console.log(`${pass ? 'PASS' : 'FAIL'} ${id} ${JSON.stringify(reading)}`); };
const safe = async (label, fn) => { try { await fn(); } catch (e) { row(label, false, { error: String(e.message).split('\n')[0] }); } };
const C = { w: 390, h: 844, touch: true, mobile: true };
const F = { w: 1440, h: 900 };

// G1 · the pairing law in every cell: a plate's inline pad = its corner − 4 px (Dialog, Sheet, Popover, toast)
for (const [cell, V] of [['390c', C], ['1440', F]]) for (const [name, qs, sel] of [
  ['dialog', 's=dialog&auto=dlg', '[data-probe=dialog]'], ['sheet', 's=sheet&side=bottom&det=none&auto=sheet&inj=fixed', '[data-slot=sheet-content]'],
  ['popover', 's=pop&edge=mid&auto=pop', '[data-probe=popc]'], ['toast', 's=toast&n=1&inf=1', '[data-slot=toast]'], ]) await safe(`E7-G1 ${name} ${cell}`, async () => {
  const { browser, page } = await open({ ...V, qs });
  await sleep(700);
  const c = await cs(page, sel, ['padding-inline-start', 'border-top-left-radius', 'border-top-right-radius']);
  const r = Math.max(parseFloat(c['border-top-left-radius']), parseFloat(c['border-top-right-radius'])); const p = parseFloat(c['padding-inline-start']);
  row(`E7-G1 pairing ${name} ${cell}`, Math.abs(p - (r - 4)) <= 0.5, { pad: p, radius: r, want: r - 4 });
  await browser.close();
});
// G2 · the row budget at the coarse phone cell: <main> never pans (two named routes; --routes for all)
const routesFor = async () => { if (!process.argv.includes('--routes')) return ['/motion/deck', '/data/virtual-section']; const { browser, page } = await open({ ...F, url: `${DEMO}/forms/chip`, settle: 800 }); const r = await page.evaluate(() => document.querySelector('#app').__vue_app__.config.globalProperties.$router.getRoutes().map((x) => x.path).filter((p) => !p.includes(':') && p.split('/').length === 3)); await browser.close(); return r; };
{ const routes = await routesFor(); const bad = []; let n = 0;
  const browser = await ENG.chromium.launch(); const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true }); const page = await ctx.newPage();
  for (const r of routes) { try { await page.goto(DEMO + r, { waitUntil: 'networkidle', timeout: 20000 }); await sleep(600); const m = await page.evaluate(() => { const els = [document.documentElement, document.querySelector('main')].filter(Boolean); return els.map((e) => e.scrollWidth - e.clientWidth); }); n++; const over = Math.max(...m); if (over > 0) bad.push([r, over]); } catch (e) { bad.push([r, 'error']); } }
  await browser.close();
  row(`E7-G2 row budget coarse 390 (${n} routes)`, bad.length === 0, { overflowing: bad.length, worst: bad.sort((a, b) => (b[1] | 0) - (a[1] | 0)).slice(0, 8) }); }
// G3 · label slots: 200-character labels in a 384 px seat pan nothing and stay inside their plates
await safe('E7-G3 label slots', async () => {
  const { browser, page } = await open({ ...C, qs: 's=lbl' });
  const m = await page.evaluate(() => { const bad = []; for (const sel of ['[data-probe=l-seg]', '[data-probe=l-tg]', '[data-probe=l-btn]', '[data-probe=l-sel]']) { const p = document.querySelector(sel); if (!p) { bad.push([sel, 'missing']); continue; } const pr = p.getBoundingClientRect(); const rg = document.createRange(); rg.selectNodeContents(p); const tr = rg.getBoundingClientRect(); if (tr.right > pr.right + 1 || pr.right > 390 + 1) bad.push([sel, +(Math.max(tr.right, pr.right) - Math.min(pr.right, 390)).toFixed(0)]); } return { docSW: document.documentElement.scrollWidth, bad }; });
  row('E7-G3 label slots in a 384 seat', m.docSW <= 390 && m.bad.length === 0, m); await browser.close();
});
// G4 · the count axis: 20 pager dots in a 384 px seat stay inside it (the 8-tab strip reading is W-E.9's fold gate)
await safe('E7-G4 count axis', async () => {
  const { browser, page } = await open({ ...C, qs: 's=count' });
  const m = await page.evaluate(() => { const w = (s) => { const e = document.querySelector(s); return e ? Math.round(e.getBoundingClientRect().width) : null; }; return { docSW: document.documentElement.scrollWidth, dots: w('[data-probe=c-dots]'), seg: document.querySelector('[data-probe=c-seg]')?.scrollWidth }; });
  row('E7-G4 20 dots in a 384 seat', m.dots <= 384, m); await browser.close();
});
// G5 · one coarse type model: control label < subheading, display-1 > heading, field ≥ 16 px (390 coarse)
await safe('E7-G5 coarse type model', async () => {
  const { browser, page } = await open({ ...C, qs: 's=type' });
  const f = await page.evaluate(() => { const g = (s) => parseFloat(getComputedStyle(document.querySelector(s)).fontSize); return { display1: g('[data-probe=t-display1]'), heading: g('[data-probe=t-heading]'), subheading: g('[data-probe=t-subheading]'), button: g('[data-probe=t-button]'), buttonSm: g('[data-probe=t-button-sm]'), input: g('[data-probe=t-input]'), segTab: parseFloat(getComputedStyle(document.querySelector('[data-probe=t-seg] button, [data-probe=t-seg] [role=tab]')).fontSize) }; });
  row('E7-G5 coarse type model', f.button < f.subheading && f.display1 > f.heading && f.input >= 16, f);
  row('E7-G6 segmented label on the control rung', Math.abs(f.segTab - f.button) <= 0.5, { segTab: f.segTab, button: f.button });
  await browser.close();
});
// G7 · coarse hit floors: a compact dock seat and the slider thumb take hits 21 px from their centre on four sides
for (const [name, qs, sel, inside] of [['compact dock seat', 's=dockc', '[data-probe=c1]', '[data-probe=c1]'], ['slider thumb', 's=slider', '[data-probe=slider] [role=slider]', '[data-probe=slider]']]) await safe(`E7-G7 ${name}`, async () => {
  const { browser, page } = await open({ ...C, qs });
  const c = await rectOf(page, sel); let hits = 0;
  for (const [dx, dy] of [[21, 0], [-21, 0], [0, 21], [0, -21]]) hits += await page.evaluate(([x, y, s]) => !!document.elementFromPoint(x, y)?.closest(s), [c.x + dx, c.y + dy, inside]) ? 1 : 0;
  row(`E7-G7 coarse hit ≥ 44, ${name}`, hits === 4, { box: [c.w, c.h], hitsAt21px: hits }); await browser.close();
});
// G8 · the coarse floor is coarse-only: a menu row on a fine pointer is not floored at 44 px (UIA-V-225)
await safe('E7-G8 fine menu row', async () => {
  const { browser, page } = await open({ w: 1024, h: 768, qs: 's=menu&edge=mid&auto=menu' });
  await sleep(500); const r = await rectOf(page, '[data-probe=mi1]');
  row('E7-G8 fine-pointer menu row below the coarse floor', r.h < 44, { rowHeight: r.h }); await browser.close();
});
out.load2 = load(); fs.writeFileSync(`${CAP}/e7.json`, JSON.stringify(out, null, 1));
const fails = out.rows.filter((r) => !r.pass).length; console.log(`e7: ${out.rows.length} rows, ${fails} FAIL · load ${out.load} → ${out.load2}`);
process.exitCode = fails ? 1 : 0;
```

The row-budget run reads the route list from the running router (`#app.__vue_app__`, which the production demo build keeps); the wired spec reads `demo/stories/manifest.ts` instead, so the route set is the manifest's and not whatever the router registered.
