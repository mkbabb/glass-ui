# W-G.3 · W-LUMA-EVENTED and W-AURORA-CLOCK: the dock reads the field's published luma, no loop runs without a source, and a drifting field presents at 30 Hz or less at rest · 11.0.0

| field | value |
|---|---|
| seat | band-G wave-spec seat, formation (relaunch 2026-09-25) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `b37a37c3` (`src`, `demo`, `tests` identical to `f3ad78d0`), scratch worktree; the demo on :5987 and the band-G component harness (W-G.6 appendix C) on :5988; Chromium on Metal with WebGPU (adapter `apple/metal-3`); probe library in W-G.1 appendix A. Load average 30 to 137 during the runs; the gates are counts |
| ships in | 11.0.0 |
| families | F-50 remainder (`audit/REGISTRY.md:1201-1219`): L07-02, L07-13, R2-04-16, R2-09-01, R2-09-02 (the subscriber half), R2-09-03, R2-09-04, R5-01-08. The blob's settle seam (R2-03-06, the quiescence ask) is W-G.5's |
| depends on | W-G.1 (the substrates publish their field luma; the lifecycle this wave gives a clock lives in `webgpu/`) |
| dependants | W-H.1 (PLAN §5: a D3 route that reads a published field luma needs this wave; a route that deletes the live channel deletes this wave's consumer, not its idle-loop cure) |

## 1 · What it closes

| id | what |
|---|---|
| L07-02, R2-04-16 | a default `GlassDock` on a page with no canvas runs a full-rate rAF as a 4 Hz timer, forever |
| R2-09-03, R5-01-08 | every demo route idles 2-5 sampler loops that never sample; on `/` the dock's getter hides the shell field from auto-discovery |
| R2-09-01 (KFA-23 = KFA-74) | the sampler's synchronous `getImageData` after a `drawImage` of the live WebGPU canvas, inside `useRAFLoop`'s callback |
| R2-09-02 (subscriber half) | the WebGPU field reads back alpha 0, so the dock's live luma is `sample-unavailable` on the shipped engine |
| L07-13, R2-09-04 | the shell aurora presents 120 frames/s at rest with no frame governor (about 300 ms/s of GPU on an M5 Max) |
| W-A.2 roster G-31 QUIESCENT | owed to this wave (`W-A.2.md:165`) |

## 2 · The defect at HEAD

Source:

- `GlassDock.vue:118-133` passes `backgroundCanvas: () => …` (a getter) whenever `backdropMode === "live"` (the default, `:84`). `useGlassBackdropLuminance.ts:214` counts any non-null option as live intent (`wantsLiveLoop`), and `backdropLuminanceSample.ts:72-77` auto-discovers `[data-glass-field-canvas]` only when no source is given. The getter resolves `null`, the loop runs.
- `useGlassBackdropLuminance.ts:330-338`: `useRAFLoop` at display rate with `if (now - lastSampleAt < sampleIntervalMs) return; // ≤ 4 Hz throttle`.
- `backdropLuminanceSample.ts:154` `drawImage(source …)` into a `willReadFrequently` 2D context created at `useGlassBackdropLuminance.ts:198`; `:165` `getImageData`; `:194` alpha under `FIELD_ALPHA_FLOOR` (`:52`, 0.02) returns `null`, which becomes `sample-unavailable`.
- The canvas lifecycle (`webgl/createCanvasLifecycle.ts:232,238,409`) requests the next frame whenever `shouldContinue()` holds; the aurora's `shouldContinue` is `isAuroraDriftLive` (`aurora/composables/frameLoop.ts:179`), true for every drifting config. Nothing sets an interval: `aurora/constants/budget.ts` caps DPR only (`:11-19`).

Paint (appendices A and B; readings from `cap/g3-*.json`):

| probe | HEAD |
|---|---|
| `/dock/overview` from load through 5 s at rest | **37** `getImageData` calls (3.8/s), total 40.4 ms, max 1.5 ms; rAF **480**/s against GPU submits **120**/s |
| sampler states on `/dock/overview` | `unavailable/canvas/source-unavailable`, `unavailable/canvas/sample-unavailable`, `unavailable/canvas/source-unavailable` |
| `/substrates/aurora` at rest | rAF **240**/s, submits **0**/s (the stage is parked; both loops are samplers), states `unavailable/canvas/source-unavailable` ×2 |
| `/` at rest | rAF **360**/s, submits **120**/s, 1 canvas |
| harness `?c=dock` (a default GlassDock, 0 canvases) | rAF **120**/s over 5 s; state `unavailable/source-unavailable` |
| cold `/dock/overview` at DPR 2, three fresh launches | max `getImageData` 1.5, 1.8, 1.5 ms (26 calls each); no `FrameRequestCallback` long animation frame |

R2-09-01's 324-433 ms cold stall did not reproduce at this seat (0 of 3 cold launches at DPR 2, 0 of 1 at DPR 1). The readback it measured is live (37 calls); the gate below removes the call, which removes the stall whatever its trigger. It is recorded as not reproduced here, not as cured.

## 3 · The cure

1. **The dock subscribes; it does not sample.** `useGlassBackdropLuminance`'s live mode subscribes to W-G.1's field registry (`webgpu/fieldLuma.ts`). The field is found from the registry: the topmost registered field canvas whose rect intersects the target. On each publish (at most 4 Hz, W-G.1 §3.6) the observer takes the grid tiles under its rect, composites their (L, alpha) over the underlay the static path already resolves (through W-C.5's colour leaf), and writes the bucket. The rects are re-read on a `ResizeObserver` callback or a publish, never inside a rAF. There is no `drawImage`, no `getImageData`, no 2D canvas and no `FIELD_ALPHA_FLOOR` (a published grid always has a value).
2. **No source, no loop.** With no registered field under the target, live mode records `unavailable/source-unavailable` once, at mount and on registry changes, and schedules nothing. `useRAFLoop` leaves the sampler entirely. `GlassDock`'s `backgroundCanvas` prop is deleted: the registry replaces both the explicit canvas and the selector.
3. **One frame clock in the lifecycle.** The GPU canvas lifecycle gains `frameInterval(): number` (milliseconds; 0 means display rate). After presenting a frame it schedules the next one as `setTimeout(frameInterval() - elapsed)` followed by one `requestAnimationFrame`, so every rAF callback presents a frame and none serves as a timer. The aurora returns 1000 / 30 while it only drifts, and 0 while it is steered (a cursor within its `cursorRadius`, a nucleus drag, or a config transition in flight); reduced motion keeps today's one-frame park. The blob and the fourier field keep 0 until their own waves rule otherwise; the constellation takes the aurora's rule.
4. **The sampler's other readback.** `backdropLuminanceSample.ts:113` (the 1×1 colour resolve) is W-C.5's colour leaf, which lands before this wave; G3-G7 checks the file is canvas-free after both.

## 4 · Files it touches

`src/composables/glass/{useGlassBackdropLuminance,backdropLuminanceSample}.ts`, `src/composables/glass/webgpu/{createCanvasLifecycle,fieldLuma}.ts`, `src/components/aurora/composables/{frameLoop,useCursorInteraction,runtime}.ts`, `src/components/dock/{GlassDock.vue,composables/useDockShellProps.ts,README.md}`, `demo/stories/dock/*` (the `background-canvas` bindings), `tests/composables/glass/backdropLuminanceSample.test.ts`. New: `tests-visual/wired/luma-evented.spec.ts` (appendix A), `tests-visual/wired/dock-idle-loop.spec.ts` (appendix B, on the harness page).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| G3-G1 · no readback | appendix A: `/dock/overview`, `getImageData` calls from load through 5 s at rest | 0 | **37** |
| G3-G2 · the dock reads the field | appendix A: every `[data-backdrop-sample-state]` on `/dock/overview` reads `sampled` | all | **0 of 3** (`source-unavailable` ×2, `sample-unavailable` ×1) |
| G3-G3 · no loop without a source | appendix B: the harness's default GlassDock with no canvas, rAF callbacks over 5 s | 0 | **600** (120/s) |
| G3-G4 · every rAF presents a frame | appendix A on `/substrates/aurora` and `/`: rAF/s − GPU submits/s ≤ 5 | both routes | **240 − 0** and **360 − 120** |
| G3-G5 · the drift clock | appendix A on `/` at rest, and `g3-steer.mjs` (appendix C) with `/substrates/aurora`'s stage scrolled into view at rest: GPU submits/s ≤ 30 per live canvas | ≤ 30 on both | **120** on `/` (1 canvas); **120** on the stage in view |
| G3-G6 · steered is full rate | appendix C: a 3 s pointer sweep across `/substrates/aurora`'s stage (scrolled into view): submits/s ≥ 90 | ≥ 90 | passes at HEAD (**121**/s, 114 moves): a regression clause that keeps the clock from capping the steered path, not a born-RED |
| G3-G7 · the sampler is canvas-free | `! git grep -nE 'getContext\(\s*"2d"\|getImageData\|drawImage\|useRAFLoop\(' -- src/composables/glass/useGlassBackdropLuminance.ts src/composables/glass/backdropLuminanceSample.ts` | exit 0 | **exit 1**: `useGlassBackdropLuminance.ts:198,330`; `backdropLuminanceSample.ts:113,154,165` |
| G3-G8 · the prop is gone | `! git grep -n backgroundCanvas -- src` | exit 0 | **exit 1**: `useDockShellProps.ts:93`, `GlassDock.vue:120-133`, the composable |

G3-G1 and G3-G4 together are W-A.2's G-31 QUIESCENT. Planted bites: put the `useRAFLoop` back in the sampler (G3-G3, G3-G4); make `frameInterval()` return 0 at rest (G3-G5); publish the grid with alpha 0 (G3-G2 reads `unavailable`).

## 6 · π and DELTA obligations

- **π-DOCK-LUMA.** `/dock/overview`, light and dark, 1440×900: the dock over the aurora before (the dock's material on `unavailable`, the state attributes shown in a capture overlay) and after (`sampled`, with the bucket), plus the same route with the aurora's palette switched to a dark preset, showing the bucket follow. The dock's paint change is D3's to judge (M-5, the live veil); this wave's claim is that the value arrives.
- **π-CLOCK.** `/` at rest, a 2 s screen recording or 8 screenshots at 250 ms before and after: the drift reads the same at 30 Hz (the field moves a few pixels per second, GF-AURORA §6). The paired reading is appendix A's submits/s. R2-09-04's GPU busy time (300 ms/s at HEAD, from a Chrome GPU trace) is re-read after the wave with the same trace method.
- Engines: Chromium on Metal, measured. Playwright WebKit: not run at this seat. Real Safari: UNMEASURED (OW-3).

## 7 · MIGRATION rows

| removed or changed | replacement |
|---|---|
| `GlassDock` prop `backgroundCanvas` (element, getter or selector) | none; the dock reads the published luma of the glass field under it (Aurora, Blob, FourierField, Constellation register themselves). A consumer's own non-glass canvas under a dock is not read; the dock reads `unavailable/source-unavailable` there |
| the live sampler's canvas readback | none; `data-backdrop-sample-source` still reads `canvas` for a field source |

keyframes.js binds `:background-canvas="auroraCanvas"` (`demo/app/dock/ChromeDock.vue:392`); it deletes the binding in its own tranche (the consumer-updates ruling).

## 8 · Dependencies

W-G.1 (the publish registry and the lifecycle's home), W-C.5 (the colour leaf that replaces the 1×1 readback).

## 9 · Ledger rows it closes

F-50: L07-02, L07-13, R2-04-16, R2-09-01, R2-09-03, R2-09-04, R5-01-08; R2-09-02's subscriber half; KFA-23 and KFA-74 (one defect; the call removed, the stall not reproduced at this seat); #60's quiescence arm (the idle loops); W-A.2's G-31. KFA-164's second half (the dialog's intermittent `FrameRequestCallback` LoAF in the index chunk, R2-02-15) is attributed to the same `useRAFLoop` chunk as R2-09-01 and is re-measured under G6-G5 after this wave.

## 10 · Gestalt passes (P-1)

- **Tranche fit:** idle pages cost nothing, and the live veil's input (D3's M-5) exists on the shipped engine for the first time.
- **Wave:** G3-G1 to G3-G8 green in one run.
- **Feature:** a consumer page with only a dock idles at 0 rAF/s; the shell aurora drifts at 30 Hz and runs at display rate under the pointer.

## Appendix A · `g3-luma-clock.mjs`

```js
// W-G.3 born-RED probe (F-50). Real GPU (Metal, WebGPU).
import { open, reporter, sleep } from './lib.mjs';
const R = reporter('g3-luma-clock');
const init = `(() => { window.__gid = { n: 0, ms: 0, max: 0 }; window.__raf = 0; window.__submits = 0; window.__loaf = [];
  const gi = CanvasRenderingContext2D.prototype.getImageData; CanvasRenderingContext2D.prototype.getImageData = function (...a) { const t = performance.now(); try { return gi.apply(this, a); } finally { const d = performance.now() - t; __gid.n++; __gid.ms += d; __gid.max = Math.max(__gid.max, d); } };
  const raf = window.requestAnimationFrame; window.requestAnimationFrame = function (cb) { return raf.call(window, (t) => { window.__raf++; cb(t); }); };
  const sb = GPUQueue.prototype.submit; GPUQueue.prototype.submit = function (...a) { window.__submits++; return sb.apply(this, a); };
  try { new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__loaf.push({ d: Math.round(e.duration), inv: (e.scripts || []).map((s) => s.invokerType).join(',') }); }).observe({ type: 'long-animation-frame', buffered: true }); } catch {} })();`;
const window5 = async (page, ms = 5000) => { const a = await page.evaluate(() => ({ r: __raf, s: __submits, g: __gid.n })); await sleep(ms); const b = await page.evaluate(() => ({ r: __raf, s: __submits, g: __gid.n })); const s = ms / 1000; return { rafPerSec: +((b.r - a.r) / s).toFixed(1), submitsPerSec: +((b.s - a.s) / s).toFixed(1), getImageDataPerSec: +((b.g - a.g) / s).toFixed(1) }; };
const states = (page) => page.evaluate(() => [...document.querySelectorAll('[data-backdrop-sample-state]')].map((e) => `${e.getAttribute('data-backdrop-sample-state')}/${e.getAttribute('data-backdrop-sample-source')}/${e.getAttribute('data-backdrop-sample-reason') || '-'}`));
{ const { browser, page } = await open('/dock/overview', { init, settle: 4000 });
  await page.mouse.move(2, 2);
  const w = await window5(page);
  const gid = await page.evaluate(() => ({ n: __gid.n, totalMs: +__gid.ms.toFixed(1), maxMs: +__gid.max.toFixed(1) }));
  const st = await states(page);
  R.row('G3-G1 /dock/overview: 0 getImageData calls from load through 5 s at rest', gid.n === 0, { ...gid, ...w });
  R.row('G3-G2 /dock/overview: the dock live luma reads sampled from the WebGPU field', st.length > 0 && st.every((s) => s.startsWith('sampled/')), { states: st });
  await browser.close(); }
for (const route of ['/substrates/aurora', '/']) {
  const { browser, page } = await open(route, { init, settle: 4000 });
  await page.mouse.move(2, 2); await sleep(500);
  const w = await window5(page);
  const canv = await page.evaluate(() => document.querySelectorAll('canvas').length);
  R.row(`G3-G4 ${route}: every rAF callback presents a frame (rAF/s - submits/s <= 5)`, w.rafPerSec - w.submitsPerSec <= 5, { ...w, canvases: canv, states: await states(page) });
  if (route === '/') R.row(`G3-G5 ${route}: GPU submits/s at rest <= 30 per live canvas`, w.submitsPerSec <= 30 * canv, { ...w, canvases: canv });
  await browser.close();
}
R.done();
```

HEAD output: `FAIL G3-G1 … {"n":37,"totalMs":40.4,"maxMs":1.5,"rafPerSec":480,"submitsPerSec":120,"getImageDataPerSec":3.8}`; `FAIL G3-G2 … {"states":["unavailable/canvas/source-unavailable","unavailable/canvas/sample-unavailable","unavailable/canvas/source-unavailable"]}`; `FAIL G3-G4 /substrates/aurora … {"rafPerSec":240,"submitsPerSec":0,…}`; `FAIL G3-G4 / … {"rafPerSec":360,"submitsPerSec":120,…}`; `FAIL G3-G5 / … {"submitsPerSec":120,"canvases":1}`. (The run at this seat also evaluated G3-G5 on `/substrates/aurora`, which passes vacuously there because the stage is parked; the gate reads `/` only.)

## Appendix B · `g3-dock-fixture.mjs` (harness page, W-G.6 appendix C)

```js
import { chromium } from '/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs';
import { reporter, sleep } from './lib.mjs';
const H = process.env.HARNESS || 'http://localhost:5988/pages/h.html';
const R = reporter('g3-dock-fixture');
const browser = await chromium.launch();
const page = await browser.newPage();
await page.addInitScript(`(() => { window.__raf = 0; const raf = window.requestAnimationFrame; window.requestAnimationFrame = function (cb) { return raf.call(window, (t) => { window.__raf++; cb(t); }); }; })();`);
await page.goto(`${H}?c=dock`); await sleep(2500);
const a = await page.evaluate(() => window.__raf); await sleep(5000); const b = await page.evaluate(() => window.__raf);
const st = await page.evaluate(() => ({ canvases: document.querySelectorAll('canvas').length, docks: document.querySelectorAll('[data-backdrop-mode]').length, state: [...document.querySelectorAll('[data-backdrop-sample-state]')].map((e) => `${e.getAttribute('data-backdrop-sample-state')}/${e.getAttribute('data-backdrop-sample-reason') || '-'}`) }));
R.row('G3-G3 a default GlassDock with no canvas: 0 rAF callbacks over 5 s at rest', b - a === 0, { rafPerSec: (b - a) / 5, ...st });
await browser.close();
R.done();
```

HEAD output: `FAIL G3-G3 … {"rafPerSec":120,"canvases":0,"docks":1,"state":["unavailable/source-unavailable"]}`.

## Appendix C · `g3-steer.mjs`

```js
import { open, reporter, sleep } from './lib.mjs';
const R = reporter('g3-steer');
const init = `(() => { window.__submits = 0; const sb = GPUQueue.prototype.submit; GPUQueue.prototype.submit = function (...a) { window.__submits++; return sb.apply(this, a); }; })();`;
const { browser, page } = await open('/substrates/aurora', { init, settle: 3000 });
const box = await page.evaluate(() => { const c = document.querySelector('canvas.aurora-canvas'); c.scrollIntoView({ block: 'center' }); const r = c.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
await sleep(2500);
const rest0 = await page.evaluate(() => __submits); await sleep(2000); const rest1 = await page.evaluate(() => __submits);
const a = await page.evaluate(() => __submits);
const t0 = Date.now(); let k = 0; while (Date.now() - t0 < 3000) { const u = (k % 60) / 60; await page.mouse.move(box.x + box.w * (0.2 + 0.6 * u), box.y + box.h * (0.3 + 0.4 * Math.sin(u * 6.28))); k++; await sleep(16); }
const b = await page.evaluate(() => __submits);
const r = { restSubmitsPerSec: (rest1 - rest0) / 2, steeredSubmitsPerSec: +((b - a) / 3).toFixed(1), moves: k };
R.row('G3-G5 stage at rest: submits/s <= 30', r.restSubmitsPerSec <= 30, r);
R.row('G3-G6 steered: submits/s >= 90 during a 3 s pointer sweep', r.steeredSubmitsPerSec >= 90, r);
await browser.close();
R.done();
```

HEAD output: `{"restSubmitsPerSec":120,"steeredSubmitsPerSec":121,"moves":114}` (G3-G5 FAIL, G3-G6 PASS).
