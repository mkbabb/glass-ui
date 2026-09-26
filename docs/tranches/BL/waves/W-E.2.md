# W-E.2 · W-SURFACE-GEOMETRY and the containment row: a shared rule never overrides a component's own geometry, and a clip holds only while its purpose does · 11.0.0

| field | value |
|---|---|
| seat | band-E wave-spec seat, formation (relaunch 2026-09-25) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `4d2e3123` (`src`/`demo` identical to `f3ad78d0`), scratch worktree, library and demo built there; probes drive the band-E fixture app (W-E.1 appendix B) on the packed build and the built demo |
| ships in | 11.0.0 |
| families | F-21 (G-27 CASCADE-GEOMETRY from the W-A.2 roster; N-11a / O-61 R-1; #84; #86's F-21 item). C-8 and the dock-run class are W-I.7's (PLAN §3) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| G-27 CASCADE-GEOMETRY | a material rung's `position: relative` beats the Sheet's `position: fixed`; the rung's `border-radius` beats the Dialog's own corner |
| N-11a, O-61 R-1, O-66 §1 (the pane's clipped left-edge shadow) | shadows on the left clip: `contain: paint` on four content rungs cuts every child halo at the host edge |
| the F-21 mechanism rows | A2-KE-L2-2 and UIA-V-325 (the Sheet's cascade position and phone geometry) close on E2-G1; KFA-163 (R2-02-11, the Select never slides) on E2-G2 and E2-G12; UIA-KF-222 (closed triggers show up-chevrons inside an open drawer) on E2-G11 |
| #84 (P4, R3-02-08) | ToggleGroup's on-state fill is a `background-color` painted under the `.control-surface` image layers; in dark and under reduced transparency it does not show |
| #86, F-21 item | the surface material's layering row |
| value.js O-71 (UIA-V-537), handed from W-B.2 §3.6 | (1) `Dialog placement="right"` reads translucent: there is no Dialog `placement` prop at HEAD (`dialog/DialogContent.vue:34-40`); the right drawer is `SheetContent side="right"`, whose geometry is E2-G1's right cells and whose frost is W-H.2's. (2) the centred Dialog's gutter is cured at HEAD (`dialog/styles.css:25`, `inline-size: min(100% - 2 * var(--space-section), 32rem)`), measured by fix-2 at `183e021a` |
| F-21 members | the Select slide pinned by side utilities; the top-layer open state resting on `scale: 1; filter: blur(0)`; the universal PRM `!important` carve; the coarse floor replacing the sm rung; a SelectTrigger chevron keyed on an ancestor's state; `.disclosure-content` and `.command__group` clips outliving their animation; a Sheet header that yields part of a line; UIA-F-48, UIA-V-388, UIA-F-226 |

## 2 · The defect at HEAD

Measured with appendix A (`node e2.mjs`), Chromium: **21 rows, 20 FAIL**. Playwright WebKit (`--eng webkit`): G1 FAIL (same values), G2 PASS (travel 3.11), G3 light PASS and dark FAIL (ΔE 0.0057), G4 FAIL (reference reach 15), G5 FAIL; the run then crashed at G6 on the demo route ("Page crashed", the known Playwright WebKit crash on demo routes). Load 34.5 → 36.1.

| gate | HEAD reading | source |
|---|---|---|
| G1 Sheet geometry, 4 cells | `position: relative`; top 992 at 390×844 (bottom 1328.5), top 1109.2 at 1440×900; the anchored-edge corners 24 px, not 0 | `sheet/styles.css:29-32` `:where([data-slot="sheet-content"]){position:fixed}` loses to `glass/material.css:39-47` (`.glass-floating … {position:relative}`) and `glass/ladder.css:132`. The Dialog's `dialog/styles.css:21-22` `:where(...){border-radius:var(--radius-3xl)}` (24 px) loses to `ladder.css:134` `.glass-floating{border-radius:var(--radius-ctx)}`: the Dialog paints 16 px at 390 and 1440 |
| G2 Select slide | travel 0 px, `translate` pinned at `0px 4px` for 14 frames | `SelectContent.vue:85` `data-[side=*]:translate-*` against the `translate` keyframes in `reveal.css`. Chromium only; Playwright WebKit travels 3.11 |
| G3 ToggleGroup on vs off | light ΔE 0.056 (PASS); dark ΔE 0.0013; prefers-reduced-transparency ΔE 0 | `toggle-group/styles.css:117,123` write `background-color`, painted under the `.control-surface` `background-image` plate |
| G4 halos (D3 M-7) | a capsule 2 px inside `glass-wash`, `glass-quiet`, `glass-resting`, `glass-card`: shadow reach 2 px on all four against a reference of 16 (WebKit 15) | `contain: paint` at `glass/material.css:104-109` |
| G5 disclosure at rest | under WCAG 1.4.12 spacing, `scrollWidth` 127 against `clientWidth` 85, `overflow: hidden` | `_shared/disclosure/disclosure.css:90-91` |
| G6 inline Command | 3 of 3 groups clipped (72/175, 117/290, 106/263 at 390; 74/170, 110/258, 110/258 at 1440); the list does not scroll | `command/styles.css:94-95` `.command__group{overflow:hidden}` on a flex item with no declared minimum |
| G7 top-layer rest | `dialog.glass-top-layer[open]` computes `scale: 1`, `filter: blur(0px)` | `animations.css:255-266`; a non-`none` filter at rest leaves a containing block for fixed descendants |
| G8 Sheet title at the floor rung | visible 9 of 30.5 px (390×844); 13 of 32.4 (844×390) | the header yields a partial line when the detent floor cuts it |
| G9 PRM | under reduce, the toast carries no animations at all; `--duration-fast` is `.2s` | `utilities/a11y-overrides.css:45-54`: `*{animation-duration:0.01ms !important; transition-duration:0s !important}` |
| G10 coarse sm rung | at the coarse cell the labeled sm Button is 44 px and the `icon-only` sm Button 54 px | `utilities/responsive.css:4-8` sets `min-block-size`/`min-inline-size: var(--touch-target)` on the box, against the sizes in `button/styles.css` |
| G11 chevron | a closed SelectTrigger inside an open Dialog rotates its chevron `180deg` (`data-state="closed"`) | `SelectTrigger.vue:72` `in-data-[state=open]:rotate-180` keys on any open ancestor |

Static rows (grep at HEAD):

- UIA-F-48: `.disclosure{inline-size:100%}` at `disclosure.css:26-28` forces the host full-width in a row.
- UIA-V-388: `[&>span]:line-clamp-1` at `SelectTrigger.vue:59`.
- UIA-F-226: `dock/styles/shell.css:198`, `white-space: nowrap` on the shell label.

The dock-run instances of the same class:

- R2-02-04: the seat `transition: inline-size` at `dock/styles/run.css:357,366` replaces the control's own transition list from `icon-button.css:60-71`.
- R3-02-09: the end-seat ring reserve at `run.css:250-252`.
- C-8: `box-sizing: content-box` at `run.css:250`, the only `content-box` in `src` CSS.

## 3 · The cure

1. **The surface rung declares no position or radius.** `position: relative` is removed from the material list at `glass/material.css:39-47` and from `ladder.css:132`, and `border-radius: var(--radius-ctx)` from `ladder.css:134`. Every component that hosts a rung declares its own position and corner in its own styles: the Sheet `fixed` (already declared), the Dialog `fixed` and `--radius-3xl` (already declared), Popover, menu and Select through the popper wrapper, Card, Tile, the dock's buttons and the specular track `relative` in their own files. The rung's pseudo-layers keep `inset: 0` and anchor to the host's own containing block. `:where()` on the Sheet and Dialog rules stays; it no longer needs to win.
2. **Containment.** A clip applies only while its purpose holds.
   - `contain: paint` on `.glass-wash`, `.glass-quiet`, `.glass-resting` and `.glass-card` (`material.css:104-109`) is deleted. The frost it guarded is D3's (W-H.2). `overflow-clip-margin` is not used: it is Chromium-only, and D3 PORTFOLIO:233 prefers the drop.
   - `.disclosure-content` rests at `overflow: visible`. The clip moves into the `disclosure-open` and `disclosure-close` keyframes (`disclosure.css:107-112`), which declare `overflow: clip` in every keyframe: a discrete property held for the animation's duration and dropped when it ends, with no attribute or script.
   - `.command__group` loses `overflow: hidden`; the list is the scroll port (`overflow-y: auto`, `min-block-size: 0` on its flex parent). A clipping flex or grid item declares its minimum; the rule is stated in `src/styles/README` next to the layer contract.
3. **The top layer rests at `scale: none; filter: none`.** The open state at `animations.css:255-266` writes `none` for both. `@starting-style` keeps the entry values. If W-C.4's per-class verdict deletes `.glass-top-layer`, the open-state block goes with it and G7's fixture reads the Dialog instead.
4. **A state fill writes the plate token.** ToggleGroup's on and hover states set the `.control-surface` plate token (`--control-surface-bg`, the token `glass/control-surfaces.css:45` paints) instead of `background-color`. The same sweep covers every `[data-state=on|checked|active]` rule that writes `background-color` under a `.control-surface` host: the wave lists them from `rg -l 'control-surface' src` crossed with `background-color` under a state selector.
5. **One PRM table.** The universal `*` carve at `a11y-overrides.css:45-54` is deleted. Under `prefers-reduced-motion: reduce`, `:root` redeclares the motion tokens once, in the motion token file: spatial durations (`--spring-*-duration`, travel and scale transitions) read `0s`; opacity fades read `--duration-fast`. Each component's motion already reads those tokens; one that does not is re-pointed in this wave.
6. **The coarse floor is a hit area, not a box.** `utilities/responsive.css:4-8` stops setting `min-block-size`/`min-inline-size` on `[data-control-target]`. Under `(pointer: coarse)` the target gets a centred `::after` hit area of `max(100%, var(--touch-target))` in each axis. The box keeps its rung, so the labeled and icon sm Buttons share one block size. W-E.7 applies the same slop to the slider thumb and compact dock seats (G-23).
7. **A component keys on its own state.** `SelectTrigger.vue:72` rotates on its own `data-[state=open]`, not `in-data-[state=open]`. The sweep covers every `in-data-[state=open]` in `src` (`rg -n 'in-data-\[state=open\]' src`).
8. **A yielding header yields a whole line.** The Sheet header's collapse at a low detent steps by whole lines: the header's block size is `round(down, available, var(--sheet-header-line))`, and the title is hidden (`visibility: hidden`) when less than one line fits. The disclosure host drops `inline-size: 100%` (UIA-F-48); SelectTrigger's value clamps with `text-overflow: ellipsis` on the value span it owns, not `[&>span]` (UIA-V-388); the dock shell label wraps at its container (UIA-F-226).
9. **The dock run is D2's.** R2-02-04, R3-02-09 and C-8 are the same defect class inside `dock/styles/run.css`, which D2's route owns. C-8 rode three closes, so it is decided by a wave of its own, W-I.7 (loop D2), which carries the three gates this spec first wrote (E2-G14..G16, now I7-G1..G3) and the cure.

## 4 · Files it touches

`src/styles/glass/material.css`, `src/styles/glass/ladder.css`, `src/styles/animations.css`, `src/styles/utilities/a11y-overrides.css`, `src/styles/utilities/responsive.css`, the motion token file under `src/styles/tokens/`, `src/components/toggle-group/styles.css` (and the other state-fill sites §3.4 lists), `src/components/_shared/disclosure/disclosure.css`, `src/components/command/styles.css`, `src/components/select/SelectContent.vue`, `src/components/select/SelectTrigger.vue`, `src/components/sheet/styles.css`, `src/components/dock/styles/shell.css`, the component style files that now declare their own `position` (§3.1), `src/styles/README`. New: `tests-visual/wired/surface-geometry.spec.ts` (appendix A), roster entries for G-27 and E2-G14..G16.

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| E2-G1 · G-27 cascade geometry | appendix A G1: Sheet `position: fixed`, on screen, anchored corners `0px`, 390×844 and 1440×900, bottom and right | 4 of 4 | **4 of 4 FAIL** (`relative`, top 992 / 1109.2, corners 24) |
| E2-G2 · Select slide | appendix A G2: content travels ≥ 2 px over the open | travel ≥ 2 | **0** (Chromium); WebKit 3.11 |
| E2-G3 · state fill paints | appendix A G3: ΔE(on, off) ≥ 0.02 in light, dark, PRT | 3 of 3 | **2 of 3 FAIL** (dark 0.0013, PRT 0) |
| E2-G4 · halos whole | appendix A G4 (D3 M-7's measure): reach ≥ reference − 2 | 4 of 4 | **4 of 4 FAIL** (2 against 16) |
| E2-G5 · disclosure at rest | appendix A G5 | `scrollWidth ≤ clientWidth` | **127 > 85** |
| E2-G6 · inline Command | appendix A G6, 390 and 1440 | 0 groups clipped | **3 of 3 clipped** at both |
| E2-G7 · top-layer rest | appendix A G7 | `scale: none`, `filter: none` | **`1`, `blur(0px)`** |
| E2-G8 · whole header line | appendix A G8, 390×844 and 844×390 | visible = line or 0 | **9 of 30.5; 13 of 32.4** |
| E2-G9 · one PRM table | appendix A G9 and `! grep -q 'animation-duration: 0.01ms !important' src/styles/utilities/a11y-overrides.css` | a toast animation ≥ 100 ms under reduce; grep exit 0 | **no animations**; grep **exit 1** |
| E2-G10 · coarse rung | appendix A G10 | labeled and icon sm within 0.5 px | **44 vs 54** |
| E2-G11 · own state | appendix A G11 and `! rg -q 'in-data-\[state=open\]' src` | chevron `none`; rg exit 0 | **`180deg`**; rg **exit 1** |
| E2-G12 · Select side utilities gone | `! grep -q 'data-\[side=bottom\]:translate-y-1' src/components/select/SelectContent.vue` | exit 0 | **exit 1** |
| E2-G13 · no rung position or radius (hold on the pseudo anchor) | `node -e` over `src/styles/glass/{material,ladder}.css`: no `position:` or `border-radius:` inside a rule whose selector list names `.glass-wash`, `.glass-quiet`, `.glass-resting`, `.glass-floating`, `.glass-overlay` or `.glass-card`; and, over every manifest route, every element carrying a rung whose `::before`/`::after` is `position: absolute` computes a non-`static` position | 0 and 0 | **2 rules** (`material.css:39-47`, `ladder.css:132-134`); the anchor half is 0 at HEAD, a hold line with a bite (plant: `.glass-card{position:static !important}`) |

Can each fail and pass? G1-G11 fail at HEAD (20 of 21 rows; G3 light is the passing control). G2's RED is Chromium-only and says so. G13's anchor half is a hold line; its plant makes it red. The dock-run gates are W-I.7's (I7-G1..G3).

## 6 · π and DELTA obligations

- **Surfaces:** the band-E fixture scenes `sheet`, `selslide`, `toggle`, `halo`, `disc`, `topdlg`, `toast`, `rung`, `esc&ov=dsel`; demo `/containers/command`, `/forms/toggle`, `/display/surface`, `/containers/dialog`.
- **Themes:** light and dark for every row. G3 adds prefers-reduced-transparency; G9 adds prefers-reduced-motion.
- **Engines:** Chromium measured. Playwright WebKit measured through G5 and labelled as the engine build; the demo-route rows (G6 onward) crash its page at HEAD, recorded as crashes, not findings. Real Safari is UNMEASURED (OW-3).
- **Paired capture:** `node e2.mjs --shots` at `<E2-base>` and at the wave: `sheet-*-390-bottom.png`, `toggle-*-{light,dark,prt}.png`, `halo-*-on.png`, `sheet-floor-*-390.png`. Also a demo pair of `/containers/dialog` at 390 and 1440 showing the Dialog corner move from 16 to 24 px. The halo pair is also D3's M-7 witness input. The before set is taken at `<E2-base>` with `WAVE=W-E.2`, into `.cache/evidence/W-E.2/e2/`; formation's HEAD shots sat in a session scratchpad and are not evidence.

## 7 · MIGRATION rows

| before | after | note |
|---|---|---|
| `.glass-wash`/`-quiet`/`-resting`/`-floating`/`-overlay`/`-card` set `position: relative` and (`-floating`) `border-radius` | the rung sets neither | a consumer that puts a rung class on a static element and relies on it for positioning adds `position: relative` itself |
| `contain: paint` on the four content rungs | removed | children's shadows paint past the host's edge |
| state fills in `background-color` under `.control-surface` | `--control-surface-bg` on the state selector | a consumer override of the on-state `background-color` no longer shows; set the token |
| universal PRM `!important` carve | reduced-motion token table | a consumer animation that read no motion token is no longer zeroed by the library; it follows its own `@media (prefers-reduced-motion)` |
| `[data-control-target]` coarse `min-block-size`/`min-inline-size` | a coarse `::after` hit area | coarse boxes keep their rung size; hit areas stay ≥ 44 px |
| `in-data-[state=open]` state keys | the component's own `data-[state=open]` | |

## 8 · Ledger rows

Closes #84, #86's F-21 item, N-11a and O-61 R-1, and F-21's members in §1. C-8 is W-I.7's (PLAN §7 band I). Closes O-66 §1's clipped left-edge shadow (E2-G4) and the F-21 mechanism rows A2-KE-L2-2, UIA-V-325 (E2-G1), KFA-163 (E2-G2, E2-G12) and UIA-KF-222 (E2-G11). value.js O-71's two legs close here: the drawer on E2-G1's right cells (its frost on W-H.2), the gutter as CURED at HEAD. Its other two legs are not this wave's: leg 3 (WatercolorDot) is ANSWERED as value.js's own component (it left glass at BK #55, `src/components/blob/README.md:7`; UIA-V-6 is CONSUMER-SIDE at `INBOUND-MAP.md:145`), and leg 4 (the menu link row) is W-K.6's (K6-G24).

## 9 · Gestalt passes (P-1)

- **Tranche fit:** one layer contract. A shared rule declares paint, never geometry; a clip names its purpose. The dock's copy of the class is D2's, with its gates written here.
- **Wave:** E2-G1..G13 green in one run.
- **Feature:** the 390×844 capture shows a bottom Sheet flush to the edge with square anchored corners, a Popover's shadow painting past a card's left edge, and a toggle whose on state reads in dark.

## Appendix A · `e2.mjs` (lands as `tests-visual/wired/surface-geometry.spec.ts`)

```js
// W-E.2 born-RED probe: a shared rule never overrides a component's own declaration; a clip holds only while its purpose does.
// node e2.mjs [--shots] [--eng webkit]
import { open, rectOf, cs, sleep, load, CAP, DEMO } from './lib.mjs';
import fs from 'node:fs';
const eng = process.argv.includes('--eng') ? process.argv[process.argv.indexOf('--eng') + 1] : 'chromium';
const shots = process.argv.includes('--shots'); fs.mkdirSync(`${CAP}/e2`, { recursive: true });
const out = { eng, load: load(), rows: [] };
const row = (id, pass, reading) => { out.rows.push({ id, pass, reading }); console.log(`${pass ? 'PASS' : 'FAIL'} ${id} ${JSON.stringify(reading)}`); };
const cr = eng === 'chromium';

// G1 · G-27 CASCADE-GEOMETRY: the Sheet computes position:fixed, sits on screen, flush corners 0
for (const [w, h] of [[390, 844], [1440, 900]]) for (const side of ['bottom', 'right']) {
  const { browser, page } = await open({ eng, w, h, touch: w < 600, mobile: w < 600 && cr, qs: `s=sheet&side=${side}&det=none&auto=sheet` });
  await sleep(900);
  const c = await cs(page, '[data-slot=sheet-content]', ['position', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius']);
  const r = await rectOf(page, '[data-slot=sheet-content]');
  const flush = side === 'bottom' ? [c['border-bottom-left-radius'], c['border-bottom-right-radius']] : [c['border-top-right-radius'], c['border-bottom-right-radius']];
  const ok = c.position === 'fixed' && r.t < h && r.b <= h + 0.5 && flush.every((v) => v === '0px');
  row(`E2-G1 sheet ${w}x${h} ${side}`, ok, { position: c.position, top: r.t, bottom: r.b, vh: h, flushRadii: flush });
  if (shots && w === 390 && side === 'bottom') await page.screenshot({ path: `${CAP}/e2/sheet-${eng}-390-bottom.png` });
  await browser.close();
}

// G2 · the Select content slides (reveal.css owns translate; the side utilities do not pin it)
{ const { browser, page } = await open({ eng, w: 1024, h: 768, qs: 's=selslide' });
  await page.evaluate(() => window.__set('sel', true));
  const ys = []; for (let i = 0; i < 14; i++) { ys.push(await page.evaluate(() => { const e = document.querySelector('[data-probe=selc]'); if (!e) return null; return { tr: getComputedStyle(e).translate, y: +e.getBoundingClientRect().top.toFixed(2) }; })); await sleep(16); }
  const tops = ys.filter(Boolean).map((v) => v.y); const travel = +(Math.max(...tops) - Math.min(...tops)).toFixed(2);
  row('E2-G2 select slides', travel >= 2, { travel, first: ys.find(Boolean), last: ys[ys.length - 1] });
  await browser.close(); }

// G3 · a state fill on a .control-surface composer reaches the paint (ToggleGroup on vs off), light, dark, PRT
for (const [arm, o] of [['light', {}], ['dark', { theme: 'dark' }], ['prt', { media: [{ name: 'prefers-reduced-transparency', value: 'reduce' }] }]]) {
  if (!cr && arm === 'prt') continue;
  const { browser, page } = await open({ eng, w: 800, h: 600, qs: 's=toggle', ...o });
  const on = await rectOf(page, '[data-probe=on]'), off = await rectOf(page, '[data-probe=off]');
  const buf = await page.screenshot({ clip: { x: Math.floor(on.l), y: Math.floor(on.t), width: Math.ceil(off.r - on.l), height: Math.ceil(on.h) } });
  const px = await page.evaluate(async ([b64, on, off]) => {
    const im = new Image(); im.src = 'data:image/png;base64,' + b64; await im.decode(); const c = document.createElement('canvas'); c.width = im.width; c.height = im.height; const x = c.getContext('2d'); x.drawImage(im, 0, 0);
    // sample a 4x4 patch at 5 px from each item's start, mid-height (plate, not glyph)
    const at = (dx) => { const d = x.getImageData(Math.round(dx), Math.round(on.h / 2) - 2, 4, 4).data; let r = 0, g = 0, b = 0; for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i + 1]; b += d[i + 2]; } return [r / 16, g / 16, b / 16]; };
    const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
    const ok = ([R, G, B]) => { const r = lin(R), g = lin(G), b = lin(B); const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b); return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s]; };
    const Y = ([R, G, B]) => 0.2126 * lin(R) + 0.7152 * lin(G) + 0.0722 * lin(B);
    const a = at(5), b = at(off.l - on.l + 5); const A = ok(a), B2 = ok(b);
    const dE = Math.hypot(A[0] - B2[0], A[1] - B2[1], A[2] - B2[2]); const ya = Y(a), yb = Y(b);
    return { on: a.map(Math.round), off: b.map(Math.round), dE: +dE.toFixed(4), ratio: +((Math.max(ya, yb) + 0.05) / (Math.min(ya, yb) + 0.05)).toFixed(3) };
  }, [buf.toString('base64'), on, off]);
  const bg = await cs(page, '[data-probe=on]', ['background-color', 'background-image']);
  row(`E2-G3 toggle on≠off ${arm}`, px.dE >= 0.02, { ...px, onBg: bg['background-color'], onImg: bg['background-image'].slice(0, 60) });
  if (shots) await page.screenshot({ path: `${CAP}/e2/toggle-${eng}-${arm}.png`, clip: { x: on.l - 20, y: on.t - 20, width: off.r - on.l + 40, height: on.h + 40 } });
  await browser.close();
}

// G4 · halos whole (D3 M-7): a capsule 2 px inside wash, quiet, resting and card paints the reference shadow reach
for (const theme of ['light']) {
  const { browser, page } = await open({ eng, w: 700, h: 840, qs: 's=halo', theme });
  const onB = await page.screenshot();
  await page.addStyleTag({ content: '[data-halo-capsule]{visibility:hidden !important}' }); await sleep(200);
  const offB = await page.screenshot();
  const caps = await page.evaluate(() => [...document.querySelectorAll('[data-halo-capsule]')].map((b) => { const r = b.getBoundingClientRect(); const host = b.parentElement; return { id: host.dataset.haloHost || 'ref', x: r.left, y: r.top, h: r.height, contain: getComputedStyle(host).contain }; }));
  const reach = await page.evaluate(async ([on64, off64, caps]) => {
    const img = async (b) => { const im = new Image(); im.src = 'data:image/png;base64,' + b; await im.decode(); const c = document.createElement('canvas'); c.width = im.width; c.height = im.height; const x = c.getContext('2d'); x.drawImage(im, 0, 0); return x.getImageData(0, 0, c.width, c.height); };
    const on = await img(on64), off = await img(off64);
    return caps.map((c) => { const x0 = Math.round(c.x), y0 = Math.round(c.y + c.h / 2); let far = 0; for (let d = 1; d <= 64; d++) { const x = x0 - d; if (x < 0) break; for (let y = y0 - 4; y <= y0 + 4; y++) { const i = (on.width * y + x) * 4; if (Math.max(Math.abs(on.data[i] - off.data[i]), Math.abs(on.data[i + 1] - off.data[i + 1]), Math.abs(on.data[i + 2] - off.data[i + 2])) >= 2) { far = d; break; } } } return { id: c.id, reach: far, contain: c.contain }; });
  }, [onB.toString('base64'), offB.toString('base64'), caps]);
  const ref = reach.find((r) => r.id === 'ref').reach;
  for (const r of reach.filter((r) => r.id !== 'ref')) row(`E2-G4 halo ${r.id}`, ref > 0 && r.reach >= ref - 2, { reach: r.reach, ref, contain: r.contain });
  if (shots) fs.writeFileSync(`${CAP}/e2/halo-${eng}-on.png`, onB);
  await browser.close();
}

// G5 · a clip declared for an animation does not outlive it: the open disclosure at rest under 1.4.12 spacing
{ const { browser, page } = await open({ eng, w: 800, h: 600, qs: 's=disc' });
  await sleep(600);
  const m = await page.evaluate(() => { const e = document.querySelector('[data-probe=collc]'); return e ? { sw: e.scrollWidth, cw: e.clientWidth, ov: getComputedStyle(e).overflow } : null; });
  row('E2-G5 disclosure at rest', m && m.sw <= m.cw, m);
  await browser.close(); }

// G6 · a clipping flex item declares its minimum: the inline Command's groups keep their rows (demo /containers/command)
for (const [w, h] of [[390, 844], [1440, 900]]) {
  const { browser, page } = await open({ eng, w, h, touch: w < 600, mobile: w < 600 && cr, url: `${DEMO}/containers/command`, settle: 1500 });
  const m = await page.evaluate(() => { const gs = [...document.querySelectorAll('.command__group')].filter((g) => !g.closest('[role=dialog]')); const list = gs[0]?.closest('[role=listbox], .command__list, [data-slot=command-list]') || gs[0]?.parentElement; return { groups: gs.length, clipped: gs.filter((g) => g.scrollHeight > g.clientHeight + 0.5).length, heights: gs.map((g) => [g.clientHeight, g.scrollHeight]), listScrolls: list ? list.scrollHeight > list.clientHeight : null }; });
  row(`E2-G6 command groups ${w}`, m.groups > 0 && m.clipped === 0, m);
  await browser.close(); }

// G7 · the top-layer open state rests at scale:none; filter:none (no containing block left by the entry)
{ const { browser, page } = await open({ eng, w: 800, h: 600, qs: 's=topdlg&ov=none' });
  await sleep(600);
  const c = await cs(page, 'dialog[data-probe=native]', ['scale', 'filter', 'opacity']);
  row('E2-G7 top-layer rest', c && c.scale === 'none' && c.filter === 'none', c);
  await browser.close(); }

// G8 · a yielding header yields a whole line: the detented Sheet title at the floor rung is whole or 0 (sheet injected fixed)
for (const [w, h] of [[390, 844], [844, 390]]) {
  const { browser, page } = await open({ eng, w, h, touch: true, mobile: cr, qs: 's=sheet&side=bottom&det=0.12,0.36,1&d=0.12&auto=sheet&inj=fixed' });
  await sleep(1000);
  const m = await page.evaluate(() => { const t = document.querySelector('[data-probe=title]'); if (!t) return null; const r = t.getBoundingClientRect(); let vis = { t: r.top, b: r.bottom }; for (let a = t.parentElement; a && a !== document.body; a = a.parentElement) { const o = getComputedStyle(a); if (/(hidden|clip|auto|scroll)/.test(o.overflowY)) { const ar = a.getBoundingClientRect(); vis = { t: Math.max(vis.t, ar.top), b: Math.min(vis.b, ar.bottom) }; } } return { line: +r.height.toFixed(1), visible: +Math.max(0, vis.b - vis.t).toFixed(1) }; });
  row(`E2-G8 sheet title ${w}x${h}`, m && (m.visible >= m.line - 0.5 || m.visible === 0), m);
  if (shots && w === 390) await page.screenshot({ path: `${CAP}/e2/sheet-floor-${eng}-${w}.png` });
  await browser.close(); }

// G9 · one PRM table: under reduce, a toast's enter still runs the reduced fade (--duration-fast)
if (cr) { const { browser, page } = await open({ eng, w: 1024, h: 768, qs: 's=toast&pos=bottom-right', reduce: true, settle: 0 });
  const m = await page.evaluate(async () => { const fast = getComputedStyle(document.documentElement).getPropertyValue('--duration-fast').trim(); await new Promise((r) => setTimeout(r, 30)); const t = document.querySelector('[data-slot=toast]'); const an = t ? t.getAnimations({ subtree: false }).map((a) => ({ name: a.animationName || a.transitionProperty, dur: a.effect?.getTiming().duration })) : null; return { fast, anims: an, opacityNow: t && getComputedStyle(t).opacity }; });
  const durs = (m.anims || []).map((a) => Number(a.dur) || 0);
  row('E2-G9 PRM toast fade', durs.some((d) => d >= 100), m);
  await browser.close(); }

// G10 · the coarse floor does not replace the rung: a labeled sm Button and an icon sm Button share one block size at the coarse cell
{ const { browser, page } = await open({ eng, w: 390, h: 844, touch: true, mobile: cr, qs: 's=rung' });
  const a = await rectOf(page, '[data-probe=lbl]'), b = await rectOf(page, '[data-probe=icon]');
  const f = await cs(page, '[data-probe=lbl]', ['min-block-size', 'block-size']);
  row('E2-G10 sm rung coarse', Math.abs(a.h - b.h) <= 0.5, { labeled: a.h, icon: b.h, ...f });
  await browser.close(); }

// G11 · a component's own state keys on its own state: a closed SelectTrigger inside an open ancestor keeps its chevron at rest
{ const { browser, page } = await open({ eng, w: 800, h: 600, qs: 's=esc&ov=dsel&auto=dlg' });
  const r = await page.evaluate(() => { const svg = document.querySelector('[data-probe=seltrig] svg'); return svg ? { rotate: getComputedStyle(svg).rotate, transform: getComputedStyle(svg).transform, trigState: document.querySelector('[data-probe=seltrig]').dataset.state } : null; });
  row('E2-G11 closed trigger chevron in an open host', r && (r.rotate === 'none' || r.rotate === '0deg'), r);
  await browser.close(); }

out.load2 = load(); fs.writeFileSync(`${CAP}/e2-${eng}.json`, JSON.stringify(out, null, 1));
const fails = out.rows.filter((r) => !r.pass).length; console.log(`e2 ${eng}: ${out.rows.length} rows, ${fails} FAIL · load ${out.load} → ${out.load2}`);
process.exitCode = fails ? 1 : 0;
```
