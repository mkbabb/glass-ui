# W-E.3 · the Sheet: the dock's reach, a resolved detent ladder at rest and in motion, and a bleed from the anchored edge · 11.0.0

| field | value |
|---|---|
| seat | band-E wave-spec seat, formation (relaunch 2026-09-25) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `4d2e3123` (`src`/`demo` identical to `f3ad78d0`), scratch worktree; probes drive the band-E fixture app (W-E.1 appendix B) on the packed build |
| ships in | 11.0.0 |
| families | F-32 (#39 W-DIALOG-DETENT), F-74, F-65 split (W-DETENT-FLOOR: the detent ladder is the one source for the rung quantities; W-C.5 PLAN row names it W-E.3's) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| #39 RT-39F | the dock covers a non-modal Sheet's action at 390×844 |
| #39 fixed halo stops | `sheet/styles.css:362-377` grades the edge halo at fixed 40 px and 120 px, whatever the rung |
| F-32 | the detent ladder is resolved nowhere: at 844×390 the 0.12 and 0.36 rungs land on the same plate height, and a drag from the lowest rung runs dead for most of its travel |
| F-74 | the drag span reads `innerHeight` once per gesture (`detents/use.ts:85`), so a viewport change mid-drag breaks the 1:1 follow; the body cannot pull the Sheet under touch |
| F-65 split | the detent floor (`sheet/styles.css:530-543`) is a second authority over rung height next to the ladder; W-DETENT-FLOOR makes the resolved ladder the one source |
| UIA-F-124 | takeover: a Sheet at its top detent meets the viewport's block-start edge with rounded corners and a gap |
| the sliding arm | the plain (undetented) Sheet opens and closes with a 12-16 px gap at its anchored edge during the overshoot |
| UIA-KF-216, A2-KE-L2-7 (handed from W-K.6 §1) | the detent grip has no tap opener: a tap on it leaves the Sheet on its rung |
| UIA-KF-005, A2-KE-L2-3 (the F-32 mechanism rows) | the transport dock covers the detented Sheet's content at 390, and the ladder at 844×390 is degenerate: E3-G1, E3-G2 and E3-G3 measure them |

## 2 · The defect at HEAD

Measured with appendix A (`node e3.mjs`), Chromium, every cell with `inj=fixed`: **20 rows, 19 FAIL**, load 27.6 → 57.6 (other seats). Rows G4 and G5 are timing-sensitive; the readings match R10-01's records at lower load.

| gate | HEAD reading | source |
|---|---|---|
| G1 action clear of a bottom dock, 390×844, d = 0.12, 0.36, 1 | "Done" (270.3..377) overlaps the dock (109..281) by 10.7 px; 1 of 3 probe points (at `l + 4`) hits `dock` at each rung | the Sheet sits at `z-dock − 1` (`sheet/styles.css:90-91`) and reserves nothing for the dock |
| G2 grip under a top dock at d = 1 | the grip's centre hit-tests to `dc2\|BUTTON`; a touch drag from it moves the Sheet 0 px (390×844 and 844×390) | the top rung is `100dvh`, under the dock |
| G3 ladder at rest | 844×390: plate tops 185.5, 185.5, 0 (gaps 0 and 185.5). 390×844 passes (132.8 and 540.2) | the floor's `min-block-size` (`:530-543`) exceeds both low rungs at 390 px tall |
| G4 slow drag up from the lowest rung, 40 steps of 4 px | 844×390: 39 of 40 steps move nothing (156 px of finger). 390×844: 17 of 40 (68 px) | the rung scalar moves under the floor before the plate does |
| G5 open to the lowest rung | 0 size changes over 110 frames at 844×390 | the open animates the scalar from 0 to 0.12, all under the floor |
| G6 body pull under touch at d = 0.36 | 150 px pull moves the plate 0 px | `touch-action: none` on the grip and header only (`:96-101`); the body's native pan wins |
| G7 viewport 844 → 644 mid-drag | plate follows the finger at 0.763 : 1 | `dragSpan()` reads `innerHeight` at gesture start (`detents/use.ts:83-87`) |
| G8 anchored-edge gap through open and close | 390×844: max 12.2-12.3 px on all four sides (14-29 frames over 1 px). 844×390: 13.6-16.2 px | the slide's `p < 0` overshoot (`SheetContent.vue:148-158`, panel spring `:123`) translates the plate off its edge |

## 3 · The cure

1. **The dock publishes its reach.** When GlassDock is fixed to a block edge, it writes `--dock-reach-block-start` or `--dock-reach-block-end` on `:root`: the distance from that viewport edge to the dock's far side, from a ResizeObserver on the dock. When it is not edge-fixed, it writes `0px`. The publisher is one composable in the dock's directory (`useDockReach`). W-I.1 keeps it as the dock's seam; D2's loop reads it and changes nothing in its contract.
2. **The Sheet reserves the reach.** On the edge the dock occupies, the Sheet's content padding is `max(W-E.1's pad, var(--dock-reach-<edge>) + var(--space-family))`. The top rung's plate edge sits at `var(--dock-reach-block-start)` from the top, so the grip is never under a top dock. The Sheet stays at `z-dock − 1`: the dock stays reachable over the Sheet, and the Sheet's controls are kept out from under it.
3. **The ladder is resolved, in pixels, once per layout.** `detents/use.ts` resolves the offered fractions against the live span. The span is `visualViewport.height` (or width) read on every `visualViewport` `resize` and on every pointer move of a drag, never cached per gesture. Each rung is floored at the floor height (the expression at `styles.css:530-543`, now computed once in TS from the same tokens and published as `--sheet-floor`). Rungs that land within 44 px of their neighbour after flooring are merged into one. The ladder the drag controller, the open animation and `v-model:detent` see is the resolved one. The CSS `min-block-size` floor is deleted: the ladder is the one authority (W-DETENT-FLOOR).
4. **The drag moves the plate from the first pixel.** Because the lowest resolved rung is at or above the floor, the scalar never runs under it. G4 and G5 follow from §3.3.
5. **The body pulls under touch.** While the Sheet is below its highest resolved rung, the body carries `touch-action: none` and the drag controller owns vertical moves from it. At the highest rung the body carries `touch-action: pan-y`, and the controller takes a downward pull only when the body's `scrollTop` is 0.
6. **Halo stops are rung-relative.** The fixed `40px` and `120px` stops at `styles.css:362-377` become lengths the ladder publishes per resolved rung, `--sheet-halo-near` and `--sheet-halo-far`, each a fixed fraction of the rung's plate extent (the HEAD stops read at a 390×844 half-height rung give the fractions: 40 / 422 and 120 / 422).
7. **The plate bleeds from its anchored edge.** The plate extends past its anchored edge by `--sheet-bleed`, the panel spring's peak overshoot in px (computed from the `panel` spring preset, `springPreset("panel")`). The anchored-edge padding adds the same amount, so content does not move. The overshoot then slides bleed into view instead of opening a gap. A detented Sheet at its top rung (UIA-F-124, takeover) reaches the block-start edge less the dock's reach. That edge becomes a second anchored edge, with square corners and the same bleed.
8. **The grip steps on tap.** A tap (or click) on `[data-slot="sheet-detent-grip"]` moves the Sheet to the next resolved rung up, and from the highest to the lowest; the grip's accessible name states the action.

## 4 · Files it touches

`src/components/sheet/detents/use.ts`, `src/components/sheet/detents/projection.ts`, `src/components/sheet/SheetContent.vue`, `src/components/sheet/motion.ts`, `src/components/sheet/styles.css`; `src/components/dock/` (the `useDockReach` composable and its call in GlassDock); `src/styles/tokens/offsets.css` (the two reach tokens' `0px` declarations). New: `tests-visual/wired/sheet-reach-ladder.spec.ts` (appendix A).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| E3-G1 · dock reach, block end | appendix A G1: 3 probe points on "Done" hit the action and overlap is 0, at d = 0.12, 0.36, 1 | 3 of 3 | **3 of 3 FAIL** (overlap 10.7 px; 1 of 3 points hits the dock) |
| E3-G2 · dock reach, block start | appendix A G2: at d = 1 under a top dock the grip hit-tests to the grip and a touch drag moves the plate ≥ 50 px | 2 of 2 | **2 of 2 FAIL** (hit `dc2`, moved 0) |
| E3-G3 · resolved ladder at rest | appendix A G3: adjacent offered stops ≥ 44 px apart, 844×390 and 390×844 | 2 of 2 | **1 of 2 FAIL** (844×390 gaps 0 and 185.5) |
| E3-G4 · ladder in motion | appendix A G4: 0 dead steps of 40 | 0 | **39** (844×390), **17** (390×844) |
| E3-G5 · open to the lowest rung animates | appendix A G5 | ≥ 6 size changes | **0 of 110 frames** |
| E3-G6 · body pull | appendix A G6 | ≥ 100 px of a 150 px pull | **0** |
| E3-G7 · live span | appendix A G7 | ratio 0.95-1.05 | **0.763** |
| E3-G8 · anchored-edge bleed | appendix A G8: gap from the anchored edge ≤ 1 px on every frame of open and close, 4 sides × 2 cells | 8 of 8 | **8 of 8 FAIL** (12.2-16.2 px) |
| E3-G9 · one floor authority | `! rg -niU --pcre2 '(?<![\w-])min-(?:block-size\|height)\s*:(?!\s*(?:0\|var\(--touch-target\))\s*(?:!important\s*)?[;}])\|(?<![\w-])min-h-(?!0(?![\w.-]))\|\bmin(?:Height\|BlockSize)\b' src/components/sheet && ! grep -qE 'inner(Height\|Width)\|documentElement\.clientHeight\|screen\.(avail)?(height\|Height)\|useWindowSize' src/components/sheet/detents/use.ts` | exit 0: no rule or script in `src/components/sheet` floors the content a second time. The span fails any `min-block-size` or `min-height` whose value is not `0` or `var(--touch-target)` (so `var(--sheet-floor)`, `calc(…)`, `max(…)` and a literal all fail), any `min-h-*` utility but `min-h-0`, any `minHeight` or `minBlockSize` write, and any viewport read in `use.ts` but `visualViewport` (§3 item 3's span) (fix-14, pass 13 FM-03) | **exit 1** (fix-14, `f9cf010e`, the span as widened: first `styles.css:531`, and `use.ts:85`; on the cured base, `min-block-size: var(--sheet-floor)`, `min-height: calc(50vh - 1rem)`, `min-block-size: max(12rem, 30dvh)`, a `min-h-[50vh]` class and an `el.style.minHeight` write each exit 1, and §3 item 3's `--sheet-floor` publish from `use.ts` with a `visualViewport.height` span exits 0; the spellings are its `formation-audit/sweeps/hold-line-claim.py` CLAIMS entry). Before fix-14: **exit 1/1** (fix-13, `3ce80b06`, the span as re-written: 1 line in 1 file, first `styles.css:531`; 1 line in 1 file, first `use.ts:85`; the spellings it is held to are its `formation-audit/sweeps/hold-line-claim.py` CLAIMS entry). Before fix-13: **exit 1** (`styles.css:531`, `use.ts:85`) |
| E3-G10 · the grip opens on tap (UIA-KF-216) | fix-2's probe scene `mgrip`: a bottom `SheetContent` with detents `[0.12, 0.36, 1]` at 390×844 with touch; tap the grip's centre, wait 1.2 s | the detent reads 0.36 and the plate grows | **FAIL**, both engines: 0.12 → 0.12, height 171 → 171 |

Can each fail and pass? Nineteen of the 20 browser rows fail at HEAD; G3 at 390×844 is the passing control that shows the gate can pass. G9 is static and fails at HEAD. G10 fails in both engines. The `PI_PLANT` bite is `[data-slot=sheet-content]{min-block-size:60dvh !important}`, which reintroduces a floor over the ladder and turns G3-G5 red on a cured tree.

## 6 · π and DELTA obligations

- **Surface:** the fixture scene `sheet` with `det=0.12,0.36,1`, `modal=0` and `dock=bottom|top`, at 390×844 and 844×390. Also demo `/containers/sheet` at 390×844.
- **Themes:** light and dark (G1, G2, G8 in both). The rest are geometric and run light.
- **Engines:** Chromium measured (CDP touch). `e3.mjs` was not run on Playwright WebKit: the band's WebKit runs crash the page on every fixture scene that mounts GlassDock (W-E.4's G6 and G10), and CDP touch is Chromium-only; the wired spec runs a mouse-only WebKit subset (G3, G4 mouse, G5, G7, G8) and labels it. Real Safari is UNMEASURED (OW-3), and the claim that `visualViewport` resizes live under the iOS URL bar is a real-Safari cell.
- **Paired capture:** `node e3.mjs --shots` at `<E3-base>` and at the wave: `done-bottomdock-0.36.png` (the action under the dock, then clear) and `grip-topdock-390.png`. A frame strip of G8's open at 390×844 bottom shows the gap, then the bleed. The before set is taken at `<E3-base>` with `WAVE=W-E.3`, into `.cache/evidence/W-E.3/e3/`; formation's HEAD shots sat in a session scratchpad and are not evidence.

## 7 · MIGRATION rows

| before | after | note |
|---|---|---|
| detent fractions applied raw; rungs below the floor collapse | the resolved ladder: floored, merged within 44 px | `v-model:detent` emits the resolved rung's fraction; two offered fractions that merge emit the higher |
| none | `--dock-reach-block-start`, `--dock-reach-block-end` | new public tokens written by GlassDock; a consumer's own fixed chrome can read them |
| the body of a detented Sheet scrolls natively under touch below the top rung | the body drags the Sheet below the top rung | at the top rung the body scrolls, and pulls the Sheet down from `scrollTop` 0 |

## 8 · Ledger rows

Closes #39 (RT-39F and the fixed halo stops; P7 is F-53's and the Safari pair F-07's, per the census row) and F-74. Closes the W-DETENT-FLOOR split of F-65 and UIA-F-124. Closes UIA-KF-216 and A2-KE-L2-7 (E3-G10), UIA-KF-005 (E3-G1, E3-G2) and A2-KE-L2-3 (E3-G1 to E3-G3).

## 9 · Gestalt passes (P-1)

- **Tranche fit:** the Sheet reads three edge quantities, all from root tokens: safe area (W-E.1), dock reach (this wave) and the bleed. It reads one ladder.
- **Wave:** E3-G1..G9 green in one run.
- **Feature:** at 844×390 a non-modal Sheet over a bottom dock opens to its lowest rung with visible motion. A slow drag moves it from the first step and it follows through a viewport change. "Done" stays tappable at every rung, captured as one frame strip.

## Appendix A · `e3.mjs` (lands as `tests-visual/wired/sheet-reach-ladder.spec.ts`)

```js
// W-E.3 born-RED probe: the Sheet reserves the dock's reach, resolves its detent ladder (rest and motion), bleeds from its edge.
// Every cell injects `position: fixed` on the sheet (W-E.2's cure), so each reading measures W-E.3's defect, not F-21's.
// node e3.mjs [--shots]   (Chromium; touch rows use CDP Input.dispatchTouchEvent)
import { open, rectOf, sleep, load, CAP, hit } from './lib.mjs';
import fs from 'node:fs';
const shots = process.argv.includes('--shots'); fs.mkdirSync(`${CAP}/e3`, { recursive: true });
const out = { load: load(), rows: [] };
const row = (id, pass, reading) => { out.rows.push({ id, pass, reading }); console.log(`${pass ? 'PASS' : 'FAIL'} ${id} ${JSON.stringify(reading)}`); };
const REC = `(() => { window.__fr = []; window.__recOn = false; const tick = () => { if (window.__recOn) { const e = document.querySelector('[data-slot=sheet-content]'); if (e) { const r = e.getBoundingClientRect(); __fr.push({ t: r.top, b: r.bottom, l: r.left, r: r.right, vw: innerWidth, vh: innerHeight }); } } requestAnimationFrame(tick); }; requestAnimationFrame(tick); })();`;
const drv = (kind, page, cdp) => kind === 'touch' ? {
  down: (x, y) => cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y, id: 1 }] }),
  move: (x, y) => cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y, id: 1 }] }),
  up: () => cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }),
} : { down: async (x, y) => { await page.mouse.move(x, y); await page.mouse.down(); }, move: (x, y) => page.mouse.move(x, y), up: () => page.mouse.up() };
const S = (qs) => `s=sheet&inj=fixed&${qs}`;

// G1 · block-end dock reach: a non-modal detented Sheet's "Done" is hit-testable over a bottom dock at every rung (390×844)
for (const d of [0.12, 0.36, 1]) {
  const { browser, page } = await open({ w: 390, h: 844, touch: true, mobile: true, qs: S(`side=bottom&det=0.12,0.36,1&d=${d}&modal=0&dock=bottom&auto=sheet`) });
  await sleep(1000);
  const a = await rectOf(page, '[data-probe=action]'); const dk = await rectOf(page, '[data-probe=dock]');
  const hs = []; for (const x of [a.l + 4, a.x, a.r - 4]) hs.push(await hit(page, x, a.y));
  const overlap = +Math.max(0, Math.min(a.r, dk.r) - Math.max(a.l, dk.l)).toFixed(1) * (Math.min(a.b, dk.b) > Math.max(a.t, dk.t) ? 1 : 0);
  row(`E3-G1 done clear of a bottom dock, d=${d}`, hs.every((h) => /^action\|/.test(h)) && overlap === 0, { action: [a.l, a.t, a.r, a.b], dock: [dk.l, dk.t, dk.r, dk.b], overlapPx: overlap, hits: hs });
  if (shots && d === 0.36) await page.screenshot({ path: `${CAP}/e3/done-bottomdock-${d}.png` });
  await browser.close();
}
// G2 · block-start dock reach: at d=1 under a top dock the grip is hit-testable, and a touch drag from it moves the sheet
for (const [w, h] of [[390, 844], [844, 390]]) {
  const { browser, page, cdp } = await open({ w, h, touch: true, mobile: true, qs: S(`side=bottom&det=0.12,0.36,1&d=1&modal=0&dock=top&auto=sheet`) });
  await sleep(1000);
  const g = await rectOf(page, '[data-slot=sheet-detent-handle]'); const hh = await hit(page, g.x, g.y);
  const t0 = (await rectOf(page, '[data-slot=sheet-content]')).t;
  const D = drv('touch', page, cdp); await D.down(g.x, g.y); for (let i = 1; i <= 15; i++) { await D.move(g.x, g.y + i * 10); await sleep(20); }
  const tMid = (await rectOf(page, '[data-slot=sheet-content]'))?.t; await D.up(); await sleep(800);
  row(`E3-G2 grip under top dock ${w}x${h}`, /sheet-detent-handle|^\|/.test(hh) && !/^dock/.test(hh) && tMid - t0 >= 50, { grip: [g.x, +g.y.toFixed(1)], hit: hh, moved: +(tMid - t0).toFixed(1) });
  if (shots && w === 390) await page.screenshot({ path: `${CAP}/e3/grip-topdock-${w}.png` });
  await browser.close();
}
// G3 · the resolved ladder at rest: adjacent offered stops differ by at least 44 px of plate (844×390 and 390×844)
for (const [w, h] of [[844, 390], [390, 844]]) {
  const tops = [];
  for (const d of [0.12, 0.36, 1]) { const { browser, page } = await open({ w, h, qs: S(`side=bottom&det=0.12,0.36,1&d=${d}&auto=sheet`) }); await sleep(1000); tops.push((await rectOf(page, '[data-slot=sheet-content]')).t); await browser.close(); }
  const gaps = [+(tops[0] - tops[1]).toFixed(1), +(tops[1] - tops[2]).toFixed(1)];
  row(`E3-G3 ladder at rest ${w}x${h}`, gaps.every((g) => g >= 44), { tops, gaps });
}
// G4 · the ladder in motion: a slow drag up from the lowest rung moves the plate on every finger step (mouse)
for (const [w, h] of [[844, 390], [390, 844]]) {
  const { browser, page } = await open({ w, h, init: REC, qs: S(`side=bottom&det=0.12,0.36,1&d=0.12&auto=sheet`) });
  await sleep(1000);
  const g = await rectOf(page, '[data-slot=sheet-detent-handle]'); const D = drv('mouse', page);
  await D.down(g.x, g.y); let dead = 0, deadPx = 0, prev = (await rectOf(page, '[data-slot=sheet-content]')).t;
  for (let i = 1; i <= 40; i++) { await D.move(g.x, g.y - i * 4); await sleep(24); const t = (await rectOf(page, '[data-slot=sheet-content]')).t; if (Math.abs(t - prev) < 2) { dead++; deadPx += 4; } prev = t; }
  await D.up(); await sleep(600);
  row(`E3-G4 drag from lowest rung ${w}x${h}`, dead === 0, { steps: 40, stepPx: 4, deadSteps: dead, deadFingerPx: deadPx });
  await browser.close();
}
// G5 · opening to the lowest offered rung paints at least 6 frames of size change (844×390)
{ const { browser, page } = await open({ w: 844, h: 390, init: REC, qs: S(`side=bottom&det=0.12,0.36,1&d=0.12`) });
  await page.evaluate(() => { window.__recOn = true; }); await page.evaluate(() => window.__set('sheet', true)); await sleep(1200);
  const fr = await page.evaluate(() => { window.__recOn = false; return window.__fr; });
  let changes = 0; for (let i = 1; i < fr.length; i++) if (Math.abs(fr[i].t - fr[i - 1].t) > 0.5) changes++;
  row('E3-G5 open to the lowest rung animates', changes >= 6, { frames: fr.length, sizeChanges: changes, finalTop: fr.at(-1)?.t });
  await browser.close(); }
// G6 · body drag at scroll 0 under touch: a 150 px pull on the body moves the plate at least 100 px (390×844)
{ const { browser, page, cdp } = await open({ w: 390, h: 844, touch: true, mobile: true, qs: S(`side=bottom&det=0.12,0.36,1&d=0.36&auto=sheet`) });
  await sleep(1000);
  const b = await page.evaluate(() => { const r = document.querySelector('[data-probe=body] > div').getBoundingClientRect(); return { x: r.left + 20, y: r.top + r.height / 2 }; });
  const t0 = (await rectOf(page, '[data-slot=sheet-content]')).t; const D = drv('touch', page, cdp);
  await D.down(b.x, b.y); for (let i = 1; i <= 25; i++) { await D.move(b.x, b.y - i * 6); await sleep(20); }
  const t1 = (await rectOf(page, '[data-slot=sheet-content]')).t; await D.up(); await sleep(600);
  row('E3-G6 body pull under touch', t0 - t1 >= 100, { moved: +(t0 - t1).toFixed(1), pull: 150 });
  await browser.close(); }
// G7 · the span reads the live viewport: after a mid-drag viewport shrink the plate still follows the finger 1:1 (390×844 → 390×644)
{ const { browser, page } = await open({ w: 390, h: 844, qs: S(`side=bottom&det=0.12,0.36,1&d=0.36&auto=sheet`) });
  await sleep(1000);
  const g = await rectOf(page, '[data-slot=sheet-detent-handle]'); const D = drv('mouse', page);
  await D.down(g.x, g.y); for (let i = 1; i <= 5; i++) { await D.move(g.x, g.y - i * 4); await sleep(24); }
  await page.setViewportSize({ width: 390, height: 644 }); await sleep(300);
  const a = (await rectOf(page, '[data-slot=sheet-content]')).t; const y0 = g.y - 20;
  for (let i = 1; i <= 10; i++) { await D.move(g.x, y0 - i * 6); await sleep(24); }
  const b = (await rectOf(page, '[data-slot=sheet-content]')).t; await D.up(); await sleep(500);
  const ratio = +((a - b) / 60).toFixed(3);
  row('E3-G7 live span after a viewport shrink', ratio >= 0.95 && ratio <= 1.05, { plateMove: +(a - b).toFixed(1), fingerMove: 60, ratio });
  await browser.close(); }
// G8 · the sliding arm bleeds from its anchored edge: gap between the anchored edge and the viewport edge ≤ 1 px through open and close
for (const [w, h] of [[390, 844], [844, 390]]) for (const side of ['bottom', 'top', 'left', 'right']) {
  const { browser, page } = await open({ w, h, init: REC, qs: S(`side=${side}&det=none`) });
  await page.evaluate(() => { window.__recOn = true; }); await page.evaluate(() => window.__set('sheet', true)); await sleep(1100); await page.evaluate(() => window.__set('sheet', false)); await sleep(1100);
  const fr = await page.evaluate(() => { window.__recOn = false; return window.__fr; });
  const gap = (f) => side === 'bottom' ? f.vh - f.b : side === 'top' ? f.t : side === 'left' ? f.l : f.vw - f.r;
  const g = fr.map(gap); const maxGap = +Math.max(0, ...g).toFixed(2);
  row(`E3-G8 anchored-edge gap ${w}x${h} ${side}`, maxGap <= 1, { frames: fr.length, maxGap, over1: g.filter((x) => x > 1).length });
  await browser.close();
}
out.load2 = load(); fs.writeFileSync(`${CAP}/e3.json`, JSON.stringify(out, null, 1));
const fails = out.rows.filter((r) => !r.pass).length; console.log(`e3: ${out.rows.length} rows, ${fails} FAIL · load ${out.load} → ${out.load2}`);
process.exitCode = fails ? 1 : 0;
```
