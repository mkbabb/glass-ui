# W-G.6 · W-MOUNT-PATH: no synchronous cost on the mount path that scales with anything but the work · 11.0.0

| field | value |
|---|---|
| seat | band-G wave-spec seat, formation (relaunch 2026-09-25) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `b37a37c3` (`src`, `demo`, `tests` identical to `f3ad78d0`); scratch worktree built with `npm run build`; the band-G component harness (appendix D) served from that build on :5988; the demo on :5987; Chromium on Metal |
| ships in | 11.0.0 |
| families | F-51, synchronous costs on the mount path (`audit/REGISTRY.md:1221-1235`): L07-08, L07-10, L07-11, L07-12, R2-02-15, R2-04-06, R7-02-03. Inbound: O-60 KFA-164 (partly) |
| depends on | W-G.1 (the WebGL2 compile path and the raster ground are deleted there; the engine's pipelines are the ones this wave makes async) |
| dependants | W-H.4 (the perf register builds its count gates on this wave's mount path) |

## 0 · What is already closed elsewhere

- **L07-10, the raster ground** (`auroraFallbackGround.ts:335-360`, `toDataURL` 3 on `/`, 18 on `/substrates/aurora`) is closed by W-G.1: the ground becomes `auroraGround`, a CSS gradient with no canvas (W-G.1 G1-G8). This wave re-reads it as a guard (G6-G6).
- **L07-12's GLSL half** (`composables/glass/webgl/compile.ts:22-23,42`) is deleted with the WebGL2 arm in W-G.1. The WebGPU half is here.
- **KFA-23 / KFA-74** (the blocking `getImageData`) moved to F-50 in round 2 and are W-G.3's.
- **#60, one context per route**, is W-G.1's (G1-G4).

## 1 · What it closes

| id | cost | where |
|---|---|---|
| L07-08, R2-04-06 | a forced style recalc per spring construction | `src/composables/motion/core/motionTempo.ts:38` `getComputedStyle(source).getPropertyValue("--motion-tempo")`, called from `useSpring.ts`, `useDockSpring.ts`, `sheet/detents/use.ts`, `sortable-list/motion.ts`, `useElementMorph.ts` (9 call lines in 6 files) |
| L07-11, R2-04-06 | `cn()` has no memo; every call re-splits and re-buckets | `src/components/_shared/class-names.ts:299-338` (`bucketFor` runs every regex rule per token; `dedupClasses` builds a `Map` per call) |
| L07-12 (WebGPU half), R2-04-06 | 5 synchronous pipeline creations, 0 `*Async` | `aurora/composables/wgpuSetup.ts:162,323`, `blob/composables/wgpuSetup.ts:100`, `fourier-field/renderer/wgpu.ts:121,155` |
| R7-02-03 | a per-item linear scan for the item's own label or index | `SortableItem.vue:17` → `useSortable.ts:63-66` (`items.value.find(…)` per item); `ToggleGroup.vue:68-78` (`ordered` re-sorts by `compareDocumentPosition` on every `triggerRef`), `:125-132` (`indexOf` for `tabindex` and `select`, `indexOf` + `splice` + `triggerRef` on unregister) |
| R2-02-15, KFA-164 | the overlay open frame | measured below; not reliably reproduced |

## 2 · The defect at HEAD

| probe | reading |
|---|---|
| appendix A, SortableList (harness `c=sortable`), best of 2 per size | mount **110 / 367 / 1,358 ms** at 1k / 2k / 4k; 4k/2k = **3.70** (R7-02-03: 72/228/934, ratio 4.1) |
| appendix A, ToggleGroup (harness `c=toggle`) | mount **63 / 178 / 940 ms**; 4k/2k = **5.28** (R7-02-03: 41/126/520) |
| appendix A, 20 Buttons (harness `c=buttons&n=20`), `getPropertyValue("--motion-tempo")` counted | **20** reads for 20 Buttons (one per spring) |
| appendix B, `cn()` on a repeated 25-token class string, `dist/class-names-FlXcvRRT.js`, 2,000 calls after one warm call | **111.58**, **49.45**, **23.67** µs per call over three runs (load average 48-60; L07-11 read 48-55) |
| `git grep -nE '\.create(Render\|Compute)Pipeline\(' -- src` | **5** lines (listed in §1); `create(Render\|Compute)PipelineAsync` **0** |
| appendix C, `/containers/dialog`, 4 opens, longest animation frame per open | run 1 **[55, 0, 0, 0]** ms; run 2 **[0, 0, 0, 0]** ms. R2-02-15's 59-100 ms and the ~200 ms enter stall were not reproduced in 8 opens |

The machine ran at load average 48-60 through every reading; the absolute times move with load, which is why G6-G1 gates the growth ratio, not a time.

## 3 · The cure

1. **One cached tempo.** `motionTempo()` with no element returns a module value read once from `:root` and invalidated by one `MutationObserver` on `<html>` (`style`, `class`, `data-*`) plus one `matchMedia` listener for the queries `scheme-motion.css` keys the tempo on. `motionTempo(el)` for an element reads that element only when the caller passes one (a re-pinned scope); no spring passes one at construction. The docstring's "read once at spring construction" becomes "read once per document state".
2. **`cn()` memoised.** A bounded `Map<string, string>` (512 entries, least-recently-used eviction) on the joined input, so a repeated class string costs one lookup. `bucketFor` gets a per-core cache so a new string pays one regex walk per distinct token.
3. **Async pipelines.** Every pipeline in `src` is created with `createRenderPipelineAsync` or `createComputePipelineAsync`; the engine's init awaits them (it is already async) and a component paints its CSS ground until the pipeline resolves, which is the same ground it shows before the adapter resolves (no second path).
4. **A membership index.**
   - SortableList: `useSortable` keeps a `Map<SortableId, Item>` computed once per `items` change; `getItemLabel(id)` is a `Map.get`.
   - ToggleGroup: the registry keeps entries in DOM order at insert (one `compareDocumentPosition` walk against neighbours, a binary search on insert) and a `Map<ToggleItemEntry, number>` rebuilt once per membership change; `tabindex` and `select` read the map; unregister deletes from the map and marks the order dirty once, flushed in one `triggerRef` per tick.
5. **The overlay frame** keeps G6-G4 as a regression gate (§5). Its cause is not measured at this seat (one 55 ms frame in 8 opens), so the wave builds nothing for it; the readings go to W-H.4's register with the count gates.

## 4 · Files it touches

`src/composables/motion/core/motionTempo.ts`; `src/components/_shared/class-names.ts`; `src/components/aurora/composables/wgpuSetup.ts`, `src/components/blob/composables/wgpuSetup.ts`, `src/components/fourier-field/renderer/wgpu.ts`, and any pipeline W-G.1's engine adds (its luma compute pass); `src/components/sortable-list/useSortable.ts`, `SortableItem.vue`; `src/components/toggle-group/ToggleGroup.vue`. Tests: `tests/composables/motion/motionTempo.test.ts` (the cache and its invalidation), `tests/components/shared/class-names.test.ts` (memo returns identical output for the existing fixture set), `tests-visual/wired/mount-path.spec.ts` (appendices A and C against the harness page, which moves into `tests-visual/fixtures/`).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| G6-G1 · no per-item scan | appendix A: mount(4k)/mount(2k) ≤ 2.5 for SortableList and for ToggleGroup, best of 2 | both | **FAIL**: 3.70 and 5.28 |
| G6-G2 · one tempo read | appendix A: mounting 20 Buttons reads `--motion-tempo` ≤ 1 time | ≤ 1 | **FAIL**: 20 |
| G6-G3 · `cn()` memoised | appendix B: ≤ 5 µs per repeated call | ≤ 5 | **FAIL**: 23.67-111.58 |
| G6-G4 · the overlay open frame (regression) | appendix C, 5 cold launches: every open's longest animation frame ≤ 50 ms | 20 of 20 | not stably RED: 55 ms on 1 of 8 opens |
| G6-G5 · no synchronous pipeline | `! git grep -nE '\.create(Render\|Compute)Pipeline\(' -- src` | exit 0 | **exit 1**: 5 lines |
| G6-G6 · no raster ground (guard on W-G.1) | `! git grep -n '\.toDataURL(' -- src` | exit 0 | **exit 1** (`auroraFallbackGround.ts:360`); closes with W-G.1 G1-G8 |
| G6-G7 · no per-item label scan | `! git grep -nE 'items\.value\.find\(' -- src/components/sortable-list` and `! git grep -nE 'ordered\.value\.indexOf\(' -- src/components/toggle-group` | both exit 0 | **exit 1** each (`useSortable.ts:64`; `ToggleGroup.vue:132,133`) |

G6-G1 and G6-G7 bite together: an index that is rebuilt per item passes G6-G7 and fails G6-G1.

## 6 · π and DELTA obligations

This wave changes no paint. Its DELTA is the numbers: appendices A-C before and after on the same machine in one session, with the load average recorded at each end (the probe library records it). A 4k SortableList screenshot before and after shows the same list (a guard that the index kept order and labels). Engines: Chromium on Metal measured; Playwright WebKit and real Safari not measured (OW-3); the mount ratios are engine-independent in kind but the WebKit cell is owed at W-A.6.

## 7 · MIGRATION rows

| removed or changed | replacement |
|---|---|
| `--motion-tempo` read at each spring's construction | read once per document state; a consumer that changes the tempo by writing a custom property on `<html>` or through the scheme is picked up; a tempo set on an inner element applies to springs only when the element is passed to `motionTempo(el)` |

No API is removed. `cn()`'s output is unchanged for every input.

## 8 · Dependencies

W-G.1.

## 9 · Ledger rows it closes

F-51: L07-08, L07-11, L07-12 (WebGPU half), R2-04-06, R7-02-03 (BUILD). L07-10 and L07-12's GLSL half close with W-G.1 and are guarded here. R2-02-15 and KFA-164: MEASURED, not reproduced beyond one 55 ms frame; G6-G4 held as a regression gate and the readings routed to W-H.4.

## 10 · Gestalt passes (P-1)

- **Tranche fit:** every component mounts in time proportional to what it renders.
- **Wave:** G6-G1 to G6-G7 green in one run.
- **Feature:** a 10k SortableList (R7-02-03's 7.5-8.4 s) mounts within 2.5× of the 4k time per doubling, read once after landing.

## Appendix A · `g6-mount.mjs`

```js
// Mount scaling of SortableList and ToggleGroup; --motion-tempo reads per Button mount. Harness: appendix D on :5988.
import { chromium } from '/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs';
import { reporter } from './lib.mjs';
const H = process.env.HARNESS || 'http://localhost:5988/pages/h.html';
const R = reporter('g6-mount');
const browser = await chromium.launch();
const mount = async (c, n, init) => { const page = await browser.newPage(); if (init) await page.addInitScript(init); await page.goto(`${H}?manual=1&c=${c}&n=${n}`); await page.waitForFunction(() => typeof window.__mount === 'function'); const m = await page.evaluate(() => window.__mount()); const extra = await page.evaluate(() => window.__tempo ?? null); await page.close(); return { ms: Math.round(m.mountMs), tempoReads: extra }; };
for (const c of ['sortable', 'toggle']) {
  const t = {}; for (const n of [1000, 2000, 4000]) { const runs = []; for (let k = 0; k < 2; k++) runs.push((await mount(c, n)).ms); t[n] = Math.min(...runs); }
  const ratio = +(t[4000] / t[2000]).toFixed(2);
  R.row(`G6-G1 ${c}: mount(4k) / mount(2k) <= 2.5`, ratio <= 2.5, { mountMs: t, ratio });
}
const tempoInit = `(() => { window.__tempo = 0; const g = CSSStyleDeclaration.prototype.getPropertyValue; CSSStyleDeclaration.prototype.getPropertyValue = function (p) { if (p === '--motion-tempo') window.__tempo++; return g.call(this, p); }; })();`;
const b20 = await mount('buttons', 20, tempoInit);
R.row('G6-G2 mounting 20 Buttons reads --motion-tempo at most once', b20.tempoReads !== null && b20.tempoReads <= 1, b20);
await browser.close();
R.done();
```

HEAD output (`cap/g6-mount.json`, load 52.38 → 52.87): `FAIL G6-G1 sortable {"mountMs":{"1000":110,"2000":367,"4000":1358},"ratio":3.7}`; `FAIL G6-G1 toggle {"mountMs":{"1000":63,"2000":178,"4000":940},"ratio":5.28}`; `FAIL G6-G2 {"ms":13,"tempoReads":20}`.

## Appendix B · `g6-cn.mjs`

```js
// cn() on a repeated 25-token class string, per call after the first. node g6-cn.mjs (reads the worktree dist).
import fs from 'node:fs';
const WT = process.env.WT;
const f = fs.readdirSync(WT + '/dist').find((x) => /^class-names-.*\.js$/.test(x));
const m = await import(WT + '/dist/' + f);
const cn = Object.values(m).find((fn) => typeof fn === 'function' && (() => { try { return fn('px-2', 'px-4').trim() === 'px-4'; } catch { return false; } })());
const S = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 px-3 text-xs h-8 rounded-md shadow-sm';
cn(S); const N = 2000; const t0 = performance.now(); for (let i = 0; i < N; i++) cn(S); const us = ((performance.now() - t0) / N) * 1000;
console.log((us <= 5 ? 'PASS' : 'FAIL') + ' G6-G3 cn() repeated call <= 5 us ' + JSON.stringify({ file: f, tokens: S.split(' ').length, usPerCall: +us.toFixed(2) }));
process.exitCode = us <= 5 ? 0 : 1;
```

HEAD output: `FAIL … {"file":"class-names-FlXcvRRT.js","tokens":25,"usPerCall":111.58}`, then `49.45`, then `23.67`. (At this seat the worktree path was a literal; `WT` is the parameter.)

## Appendix C · `g6-overlay.mjs`

```js
// The Dialog open's longest animation frame, 4 opens. Demo route; screenshots are not taken.
import { open, reporter, sleep } from './lib.mjs';
const R = reporter('g6-overlay');
const init = `(() => { window.__loaf = []; try { new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__loaf.push({ st: Math.round(e.startTime), d: Math.round(e.duration), s: (e.scripts || []).map((x) => x.invoker).slice(0, 2).join(' | ') }); }).observe({ type: 'long-animation-frame' }); } catch {} })();`;
const { browser, page } = await open('/containers/dialog', { init, settle: 3000 });
const worst = [];
for (let k = 0; k < 4; k++) {
  const trig = await page.evaluateHandle(() => [...document.querySelectorAll('main button')].find((b) => b.getAttribute('aria-haspopup') === 'dialog' || /open/i.test(b.textContent)));
  await page.evaluate(() => { window.__loaf = []; });
  await trig.click(); await sleep(900);
  const l = await page.evaluate(() => window.__loaf);
  worst.push(Math.max(0, ...l.map((e) => e.d)));
  await page.keyboard.press('Escape'); await sleep(900);
}
R.row('G6-G4 Dialog open: the longest animation frame across 4 opens <= 50 ms', Math.max(...worst) <= 50, { worstLoafMsPerOpen: worst });
await browser.close();
R.done();
```

HEAD outputs: run 1 `FAIL … {"worstLoafMsPerOpen":[55,0,0,0]}` (`cap/g6-overlay.json`, load 53.99); run 2 `PASS … [0,0,0,0]` (load 48.63); no frame over 30 ms in run 2. The wired gate runs this 5 times from cold.

## Appendix D · the band-G component harness

A Vite app outside the demo that consumes the built package through its public subpaths (`@mkbabb/glass-ui/<entry>` aliased to `dist/<entry>.js`, `@mkbabb/glass-ui/styles` to `dist/styles/index.css`). `?c=` picks the fixture, `?n=` the item count, `?manual=1` defers the mount to `window.__mount()`, which returns the synchronous mount time.

`vite.config.js`:

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
const WT = resolve(import.meta.dirname, "..");
const pages = ["h", "b"];
export default defineConfig({
  root: import.meta.dirname,
  plugins: [vue(), tailwindcss()],
  resolve: { alias: [
    { find: /^@mkbabb\/glass-ui\/styles$/, replacement: `${WT}/dist/styles/index.css` },
    { find: /^@mkbabb\/glass-ui\/(.+)$/, replacement: `${WT}/dist/$1.js` },
  ] },
  build: { outDir: "dist", emptyOutDir: true, minify: false, rollupOptions: { input: Object.fromEntries(pages.map((p) => [p, resolve(import.meta.dirname, `pages/${p}.html`)])) } },
});
```

`pages/h.html`: `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>band G harness</title></head><body><div id="app"></div><script type="module" src="/src/h.js"></script></body></html>`

`src/h.js`:

```js
import "./app.css";
import { createApp } from "vue";
import H from "./H.vue";
let app = null;
window.__mount = () => { const t0 = performance.now(); app = createApp(H); app.mount("#app"); const t1 = performance.now(); return new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r({ mountMs: t1 - t0, paintMs: performance.now() - t0 })))); };
window.__unmount = () => { const t0 = performance.now(); app.unmount(); app = null; return performance.now() - t0; };
if (!new URLSearchParams(location.search).get("manual")) window.__mount();
```

`src/app.css`: `@import "tailwindcss"; @import "tw-animate-css"; @import "@mkbabb/glass-ui/styles"; @source "<worktree>/dist"; @source "./"; @variant dark (&:where(.dark, .dark *));`

`src/H.vue`:

```vue
<script setup>
import { ref } from "vue";
import { SortableList, SortableItem, SortableHandle } from "@mkbabb/glass-ui/sortable-list";
import { ToggleGroup, ToggleGroupItem } from "@mkbabb/glass-ui/toggle-group";
import { GlassDock, DockControl } from "@mkbabb/glass-ui/dock";
import { Button } from "@mkbabb/glass-ui/button";
const q = new URLSearchParams(location.search);
const C = q.get("c");
const N = Number(q.get("n") ?? 8);
const items = Array.from({ length: N }, (_, i) => ({ v: `i${i}`, l: `Item ${String(i).padStart(5, "0")}` }));
const list = ref(items);
const model = ref(items[0]?.v);
</script>
<template>
  <main style="padding:24px">
    <SortableList v-if="C === 'sortable'" :items="list" :get-id="(t) => t.v" :get-label="(t) => t.l" label="Items" class="w-80" @update:items="(v) => (list = v)">
      <SortableItem v-for="t in list" :key="t.v" :id="t.v"><SortableHandle>≡</SortableHandle><span>{{ t.l }}</span></SortableItem>
    </SortableList>
    <ToggleGroup v-else-if="C === 'toggle'" v-model="model" type="single" aria-label="Items">
      <ToggleGroupItem v-for="it in items" :key="it.v" :value="it.v">{{ it.l }}</ToggleGroupItem>
    </ToggleGroup>
    <GlassDock v-else-if="C === 'dock'" aria-label="Dock"><DockControl aria-label="One">1</DockControl><DockControl aria-label="Two">2</DockControl></GlassDock>
    <div v-else-if="C === 'buttons'"><Button v-for="it in items" :key="it.v">{{ it.l }}</Button></div>
  </main>
</template>
```

The `b` page (one Button, `@import "tailwindcss"; @import "tw-animate-css"; @import "@mkbabb/glass-ui/styles";` and nothing else) is W-G.7's consumer fixture. W-G.3's dock fixture (`c=dock`) and W-G.5's `c=blob` use the same app.
