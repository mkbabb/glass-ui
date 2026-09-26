# W-G.2 · One device-loss subscription per device, fanned out to the live canvases; every loss re-arms · 11.0.0

| field | value |
|---|---|
| seat | band-G wave-spec seat, formation (relaunch 2026-09-25) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `b37a37c3` (`src`, `demo`, `tests` identical to `f3ad78d0`), scratch worktree, demo built and served on :5987, Chromium on Metal with WebGPU (adapter `apple/metal-3`); probe library in W-G.1 appendix A |
| ships in | 11.0.0 |
| families | F-49 whole (`audit/REGISTRY.md:1185-1199`): L07-01, R2-01-06, R2-04-15, R5-01-07; inbound O-54 R-1 (`audit/INBOUND.md:11`, `INBOUND-MAP.md:532`) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| L07-01, R2-04-15 | each WebGPU canvas chains its own `lost.then` closure onto the process-shared device; the never-settling promise retains every unmounted tree |
| R2-01-06 | the same leak by an engine-portable WeakRef census (20 of 28 route trees alive-detached with WebGPU, 0 without) |
| R5-01-07 | at session scale: about 135 DOM nodes and 0.22 MB of heap per route step, for 30 minutes |
| O-54 R-1 | a page can only force `GPUDevice.destroy()`, which the substrate treats as terminal; value.js asks whether a test seam is intended |

## 2 · The defect at HEAD

- `src/composables/glass/webgpu/useWebGPUCanvas.ts:99` holds the process-shared `sharedDevicePromise`; `:169` subscribes once to invalidate the cache. Then every canvas arm calls `wireDeviceLoss(acquired.device)` (`:376`), which is `void dev.lost.then((info) => { if (disposed) return; … })` (`:386-407`). A promise reaction cannot be removed, so each closure (and the component scope it captures) lives as long as the device.
- `:393-399`: `reason === "destroyed"` fires `onInitError` and stops. The library never destroys the shared device itself (`:497-503`: dispose drops its reference and does not call `destroy()`; `git grep -nE 'device\??\.destroy\('` in `src` finds only that comment). So a `"destroyed"` loss is always a foreign act, and HEAD treats it as fatal.

Probe `g2-route-cycle.mjs` (appendix A): SPA route cycle `/substrates/blob` → `/dock/overview` → `/foundations/typography`, 4 cycles, 2.2 s per route, two `HeapProfiler.collectGarbage` before each `Memory.getDOMCounters`:

| reading | HEAD |
|---|---|
| DOM nodes after GC, start and cycles 1-4 | 1,055 → **3,214 → 5,323 → 7,432 → 9,541** (+2,109 per cycle, linear) |
| JS listeners | 449 → 1,221 → 1,977 → 2,733 → **3,489** |
| reads of `GPUDevice.prototype.lost` | 2 → 6 → 10 → 14 → **18**, for **1** device |

Probe `g2-loss.mjs` (appendix B), `/substrates/blob`: the page calls `destroy()` on the shared device (captured from `requestDevice`):

| reading | HEAD |
|---|---|
| GPU submits/s before, after | **242 → 0** |
| devices requested | **1** (no re-acquire) |
| console | `[demo] shell aurora init failed Error: [useWebGPUCanvas] device destroyed (Device was destroyed.)` |

## 3 · The cure

1. **One subscription per device.** The shared-device record (`webgpu/webgpuDevice.ts` after W-G.1's move) owns `listeners: Set<(info: GPUDeviceLostInfo) => void>` and subscribes to `device.lost` exactly once, when the device resolves. On loss it clears the shared cache, then calls each listener from a snapshot of the set and clears the set.
2. **Canvases hold a removable handle.** `onDeviceLoss(listener): () => void` adds to the set and returns the remover. A canvas registers on arm and calls the remover on dispose, so an unmounted canvas holds no reference from the device and the device holds none to it.
3. **Every loss re-arms.** The listener parks the surface, re-acquires through the shared acquire (one re-request per loss, whatever the canvas count) and rebuilds. `reason` no longer selects a terminal path: the library never calls `destroy()` on the shared device, so any loss (a driver reset, eviction, a page's `destroy()`) is recovered the same way. A failed re-acquire goes to `onInitError` with its typed reason (W-G.1 §3.2). A static gate keeps the premise true (G2-G4).
4. **O-54's answer.** No test seam is published (a test-only export is surface without a consumer). The contract: a page that calls `destroy()` on the device the substrate uses sees it re-acquired and the surface rebuilt within 2 s. value.js witnesses its j3 real-GPU arm that way, capturing the device as appendix B does (a `GPUAdapter.prototype.requestDevice` wrapper). The reply letter (W-B.2) carries this text.

## 4 · Files it touches

`src/composables/glass/webgpu/{webgpuDevice,useWebGPUCanvas}.ts` (paths after W-G.1; if this wave lands first, `useWebGPUCanvas.ts` holds both). New: `tests-visual/wired/webgpu-route-cycle.spec.ts` (appendix A), `tests-visual/wired/webgpu-device-loss.spec.ts` (appendix B), `tests/composables/glass/webgpu/device-loss.test.ts` (a fake device: 50 canvases arm and dispose, the listener set is empty and `lost` was read once; a resolved loss with 3 live canvases triggers 1 re-acquire and 3 rebuilds).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| G2-G1 · the route cycle holds flat | appendix A, 4 cycles: nodes after GC at cycle 4 ≤ cycle 1 × 1.05 | ≤ 5 % | **9,541 vs 3,214** (+2,109 per cycle) |
| G2-G2 · one subscription per device | appendix A: reads of `GPUDevice.prototype.lost` equal the devices requested | equal | **18 reads, 1 device** |
| G2-G3 · a page-forced destroy re-arms | appendix B: after `destroy()`, a second device is requested and submits/s > 0 within 3 s | both | **FAIL**: 1 device, 0 submits/s |
| G2-G4 · the library never destroys the shared device | `test -z "$(git grep -nE '(device\|dev\|shared\w*)\.destroy\(' -- src/composables/glass/webgpu \| grep -vE '^[^:]+:[0-9]+:\s*(//\|\*)')"` (code lines only) | exit 0 | exit 0 at HEAD: the one hit is the comment at `useWebGPUCanvas.ts:500`. A guard on step 3's premise, not a born-RED; its bite is a planted `device.destroy()` in `dispose` |
| G2-G5 · the unit fan-out | `npx vitest run tests/composables/glass/webgpu/device-loss.test.ts` | exit 0 | **exit 1** (the file does not exist; `onDeviceLoss` has 0 hits in `src`) |

Planted bite: restore a per-arm `dev.lost.then` in `useWebGPUCanvas.ts` → G2-G1 and G2-G2 fail. Restore the `"destroyed"` early return → G2-G3 fails.

R2-01-06's WeakRef census (`audit/captures/R2-01/`) is the engine-portable twin of G2-G1; it joins the Safari battery at W-A.6, which is where the Safari 26 cell of this leak (L07-01 "should be re-banked on Safari 26") is read. Real Safari: UNMEASURED (OW-3). Playwright WebKit has no WebGPU in this build and cannot show the leak; its cell is recorded as not applicable.

## 6 · π and DELTA obligations

No visual claim beyond recovery. G2-G3's pair: a screenshot of `/substrates/blob` before `destroy()` and 3 s after, with appendix B's JSON; the after frame shows the blob painted again (HEAD: the field stops). The route-cycle counters (appendix A's JSON before and after) are the DELTA for G2-G1.

## 7 · MIGRATION rows

| changed | now |
|---|---|
| a `"destroyed"` device loss is terminal (`onInitError`, no re-acquire) | every loss re-acquires and rebuilds; `onInitError` fires only if the re-acquire fails |

No export changes.

## 8 · Dependencies

PLAN §5, the one record of edges. Unordered against W-G.1 there (§4 names the paths either way).

## 9 · Ledger rows it closes

F-49: L07-01, R2-01-06, R2-04-15, R5-01-07. O-54 R-1 (ANSWERED: no seam; `destroy()` re-arms). R2-01's route-leak Safari cell stays with W-A.6.

## 10 · Gestalt passes (P-1)

- **Tranche fit:** a long-lived consumer (value.js, keyframes, fourier all mount WebGPU substrates) stops paying linear memory per navigation.
- **Wave:** G2-G1 to G2-G5 green in one run on the GPU leg.
- **Feature:** a 30-minute route cycle holds heap and nodes flat (R5-01-07's protocol re-run once at close: HEAD 8.9 → 134.6 MB).

## Appendix A · `g2-route-cycle.mjs`

```js
// W-G.2 born-RED probe (F-49): the route-cycle DOM count and the per-device `lost` subscription count, WebGPU on Metal.
import { open, reporter, sleep } from './lib.mjs';
const R = reporter('g2-route-cycle');
const N = Number(process.argv[2] || 4);
const init = `(() => { window.__lostReads = 0; window.__devices = 0;
  const d = Object.getOwnPropertyDescriptor(GPUDevice.prototype, 'lost');
  Object.defineProperty(GPUDevice.prototype, 'lost', { configurable: true, get() { window.__lostReads++; return d.get.call(this); } });
  const rq = GPUAdapter.prototype.requestDevice; GPUAdapter.prototype.requestDevice = function (...a) { window.__devices++; return rq.apply(this, a); }; })();`;
const { browser, ctx, page } = await open('/foundations/typography', { init, settle: 2500 });
const cdp = await ctx.newCDPSession(page);
const push = (p) => page.evaluate((p) => document.querySelector('#app').__vue_app__.config.globalProperties.$router.push(p), p);
const counters = async () => { await cdp.send('HeapProfiler.collectGarbage'); await sleep(300); await cdp.send('HeapProfiler.collectGarbage'); const c = await cdp.send('Memory.getDOMCounters'); const h = await page.evaluate(() => ({ lostReads: window.__lostReads, devices: window.__devices })); return { nodes: c.nodes, listeners: c.jsEventListeners, ...h }; };
const series = [await counters()];
for (let i = 0; i < N; i++) { for (const r of ['/substrates/blob', '/dock/overview', '/foundations/typography']) { await push(r); await sleep(2200); } series.push(await counters()); }
const adapter = await page.evaluate(async () => { const a = await navigator.gpu?.requestAdapter(); return a ? `${a.info?.vendor}/${a.info?.architecture}` : null; });
R.row(`G2-G1 route cycle: nodes after GC at cycle ${N} <= cycle 1 + 5%`, series.at(-1).nodes <= series[1].nodes * 1.05, { adapter, series: series.map((s) => s.nodes), listeners: series.map((s) => s.listeners), nodesPerCycle: Math.round((series.at(-1).nodes - series[1].nodes) / (N - 1)) });
R.row('G2-G2 one lost subscription per device (lost reads == devices)', series.at(-1).lostReads === series.at(-1).devices, { lostReads: series.map((s) => s.lostReads), devices: series.at(-1).devices });
await browser.close();
R.done();
```

Output at HEAD: `FAIL G2-G1 … {"adapter":"apple/metal-3","series":[1055,3214,5323,7432,9541],"listeners":[449,1221,1977,2733,3489],"nodesPerCycle":2109}`; `FAIL G2-G2 … {"lostReads":[2,6,10,14,18],"devices":1}`.

## Appendix B · `g2-loss.mjs`

```js
// W-G.2 born-RED probe (O-54): a page-forced GPUDevice.destroy() on the shared device; the substrate re-arms on a fresh device.
import { open, reporter, sleep } from './lib.mjs';
const R = reporter('g2-loss');
const init = `(() => { window.__devs = []; window.__submits = 0;
  const rq = GPUAdapter.prototype.requestDevice; GPUAdapter.prototype.requestDevice = async function (...a) { const d = await rq.apply(this, a); window.__devs.push(d); return d; };
  const sb = GPUQueue.prototype.submit; GPUQueue.prototype.submit = function (...a) { window.__submits++; return sb.apply(this, a); }; })();`;
const { browser, page, logs } = await open('/substrates/blob', { init, settle: 4000 });
const rate = async (ms) => { const a = await page.evaluate(() => window.__submits); await sleep(ms); const b = await page.evaluate(() => window.__submits); return +((b - a) / (ms / 1000)).toFixed(1); };
const before = await rate(2000);
await page.evaluate(() => window.__devs[0].destroy());
await sleep(3000);
const after = await rate(2000);
const devices = await page.evaluate(() => window.__devs.length);
R.row('G2-G3 a page-forced destroy re-arms: a second device is requested and submits resume', devices >= 2 && after > 0, { submitsPerSecBefore: before, submitsPerSecAfter: after, devicesRequested: devices, errors: logs.filter((l) => /destroy|lost|error/i.test(l)).slice(0, 3) });
await browser.close();
R.done();
```

Output at HEAD: `FAIL G2-G3 … {"submitsPerSecBefore":242,"submitsPerSecAfter":0,"devicesRequested":1,"errors":["error: [demo] shell aurora init failed Error: [useWebGPUCanvas] device destroyed (Device was destroyed.)\n    at http://localhost:5987/assets/Aurora-BOppQyYQ.js:1:16970"]}`.
