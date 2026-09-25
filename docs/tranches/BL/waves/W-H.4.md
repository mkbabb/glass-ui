# W-H.4 · W-PERF: count gates, the boot shell, the low-power glass register · 11.0.0

| field | value |
|---|---|
| seat | band-H wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `80ebfd72` in a scratch worktree; `dist-demo/` built there (`npx vite build --config demo/vite.demo-dist.config.ts`, 5.4 s) and served by a static server inside each probe; `src` is the published 10.1.0 |
| kind | a disease row decided and built (F-53: W-PERF and W-BOOT-SHELL rode BI, BJ and BK OPEN, `ledger/census-register-b.md:50,58`; `CHARTER.md:23`). Not a loop wave |
| ships in | 11.0.0 |
| families | F-53 whole (`audit/REGISTRY.md:1250-1262`); #39's RT-39C (routed to F-53, `census-register-a.md:48`) |
| depends on | W-H.2 (the low-power register is built on its rung variables, and its stand-downs change the counts the budget records); W-A.4 (the GPU-backed CI leg the count gates run on) |
| dependants | W-L.8 (the close reads the budget datum) |
| ruler | this seat for the low-power decide (R2-09-06 is an audit finding, not an owner ask); OW-9 is not needed |
| engines | Chromium 149.0.7827.55 headless with WebGPU on Metal (`--enable-unsafe-webgpu --ignore-gpu-blocklist --use-angle=metal`). Real Safari UNMEASURED (OW-3); a Safari count leg needs W-A.6 |

## 1 · What it closes

| id | what | source |
|---|---|---|
| L01b-60 | W-BOOT-SHELL: the blank-first-paint premise still holds (`index.html:41` empty `#app`) | `audit/round-1/L01b.md:87,286` |
| L01b-69 | W-PERF never started: no perf or blur-budget executable | `L01b.md:97,358` |
| L05b-20 | the Lighthouse ask lost its gate in the collapse; one banked live run, or retire | `audit/round-1/L05b.md:37,285` |
| R2-09-05 | backdrop-filter GPU cost measured; W-PERF gates on a count, with R2-09's table as the baseline | `audit/round-2/R2-09.md:26` |
| R2-09-06 | under software compositing one full-bleed plate halves the frame rate and five give 20 fps; no capability-keyed low-power register | `R2-09.md:27`, measurement D |
| R2-09-09 | the dev-server leg of L01b-60 is refuted; it retires | `R2-09.md:30`; `REGISTRY.md:1257` |
| ledger | #60 (the boot shell; its quiescence arm is F-50's W-G.3, its one-context arm F-51's W-G.6), #69 (the blur budget, the resting-rung cost, the many-surface ceiling), #39's RT-39C (the sheet halo's cost, owed unbiased) | `census-register-b.md:50,58`; `census-register-a.md:48` |

## 2 · The defect at HEAD

- No executable measures render cost: `npm run perf:count` → `npm error Missing script: "perf:count"` (run here); `grep -rli lighthouse` finds only a comment (`L05b.md:285`).
- The demo's mount is empty: `<div id="app"></div>` (`index.html:41`, re-read here), so nothing paints until the JS graph loads.
- The blur is unconditional. The only arms are `@supports` and `prefers-reduced-transparency` (`styles/glass/a11y-fallback.css`); neither fires under software compositing.

Measured here (appendix A, `perf.mjs`; appendix B, `sheet-passes.mjs`; 1440×900 at DPR 1 unless stated; render passes counted from the Chrome trace as `SkiaRenderer::BeginDrawingRenderPass` events, frames as `DirectRenderer::DrawFrame`, over 3 s at rest):

| route | backdrop elements (in viewport) | frames / 3 s | render passes per frame |
|---|---|---|---|
| `/` | 19 (13) | 361 | **5.00** (R2-09's `/`: 5) |
| `/dock/overview` | 13 (5) | 361 | **1.01** |
| `/foundations/typography` | 3 (2) | 360 | **2.00** |
| `/containers/sheet`, closed | 13 (lenses counted without pseudo-elements) | 360 | **5.00** |
| `/containers/sheet`, detented sheet open (RT-39C) | 16 | 360 | **6.00**: the detented sheet adds one pass per frame |

| boot (390×844, 150 ms RTT, 1.6 Mbps down, 4× CPU; production `dist-demo`) | run 0 | run 1 |
|---|---|---|
| first-contentful-paint | **6,508 ms** | **6,432 ms** |
| responseEnd / DOMContentLoaded / load | 202 / 4,690 / 5,046 ms | 198 / 4,667 / 5,016 ms |
| bytes inside `#app` in the first HTML | **0** | 0 |

| capability arm (`/`) | WebGPU adapter | WebGL context | `.dock-plate` `backdrop-filter` |
|---|---|---|---|
| GPU (Metal) | yes | yes | `blur(16px) saturate(1.2)` |
| software (`--disable-gpu --disable-gpu-compositing --disable-software-rasterizer`) | **no** | **no** | **`blur(16px) saturate(1.2)`**, unchanged |

R2-09-09's unthrottled production FCP (264-692 ms) did not test the premise; under a mobile network the blank window is 6.4-6.5 s, so the boot shell is a BUILD, not a retire.

## 3 · The cure

1. **Count gates** (R2-09-05's wave shape). `scripts/perf/count.mjs` (`npm run perf:count`) serves the production demo, and per route records backdrop elements (with pseudo-elements, and in viewport), frames and render passes per frame at rest from the trace, then compares them with `scripts/perf/budget.json`. It exits 1 when a route exceeds its budget. It runs on W-A.4's GPU leg in CI; counts, not times, so machine load does not move it. The route set: `/`, `/dock/overview`, `/foundations/typography`, `/containers/sheet` closed and detented, and one route per substrate. The budget datum is taken on the tree after W-H.2 lands (its stand-downs remove dead lenses), recorded in `budget.json` with the commit, and only ever lowered. #69's "resting-rung cost" and "many-surface ceiling" become rows of that file: the passes per frame of the synthetic d1, d3, d5 and nested-5 stacks (R2-09 measurement A's configurations), which fix what one more plate costs.
2. **The boot shell** (#60, L01b-60). `index.html`'s `#app` carries a static shell: the page ground and the shell's frame (header bar, navigation rail, a content skeleton), styled by one inline `<style>` of token values, so first paint needs no script. Vue's mount replaces it. The shell field (aurora) mounts after first paint and is not on the critical path. The library is unchanged; this is the demo's document.
3. **The low-power register: BUILD.** A capability signal, "no WebGPU adapter and no WebGL context", is the one a page can read for software compositing (both absent in the software arm above; R2-09-06's condition). The library exports a head script beside `darkModeSyncScript` (`src/composables/dark/darkModeSyncScript.ts:8,90`) that writes `data-glass-power="low"` on `<html>` before first paint from the synchronous WebGL probe, and a mount-time check that adds the WebGPU half. Under `:root[data-glass-power="low"]` the blur rung variables resolve `none` (W-H.2's rung variables, the same mechanism as its stand-downs) and plates take the opaque escape (`--glass-level: 0`), so text stays on a solid ground. This is a capability register, not a masking fallback: the primary is not dead on that machine, it is unaffordable, and the register is stated and gated (E-2). Known risk, recorded: a browser that software-composites while exposing a software WebGL context (SwiftShader) reads as capable; the wave records that cell as UNMEASURED rather than widening the signal.
4. **Lighthouse (L05b-20): one banked live run.** The wave record carries one Lighthouse mobile run of the production `/` (JSON under `.cache/evidence/W-H.4/`), before and after the boot shell. It is a record, not a gate; the gate is G3's FCP.
5. **The dev-server leg retires** (R2-09-09): Vite 8.1.5 optimises at startup with one load and no re-optimisation reload; the ledger row carries that rationale.

## 4 · Files it touches

- New: `scripts/perf/count.mjs`, `scripts/perf/budget.json`, the npm script `perf:count`, its CI step on W-A.4's GPU leg.
- `index.html` (the boot shell).
- `src/styles/glass/a11y-fallback.css` or the rung file W-H.2 lands (the `[data-glass-power="low"]` arm); the head script beside `src/composables/dark/darkModeSyncScript.ts` and its export; `MIGRATION.md` (additive: a new export).
- `docs/tranches/BL/LEDGER.md` (the decide rows: the low-power BUILD, L05b-20's banked run, the dev leg's RETIRE).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading (run here) |
|---|---|---|---|
| G1 · the count instrument exists and can fail | `npm run perf:count`; then the same with one full-bleed `.glass-floating` planted on `/` | exit 0 on the landed tree; exit 1 with the plant, naming `/` and its passes per frame | **exit 1**: `npm error Missing script: "perf:count"` |
| G2 · the budget holds | `npm run perf:count` against `budget.json` | every route at or under its datum | hold line once G1 lands. HEAD's counts (§2) are the ceiling the datum may not exceed: `/` 5.00, `/dock/overview` 1.01, `/foundations/typography` 2.00, sheet closed 5.00, detented 6.00 passes per frame |
| G3 · the boot shell paints first | `perf.mjs`'s boot row on the landed `dist-demo` (appendix A: 390×844, 150 ms RTT, 1.6 Mbps, 4× CPU) | first-contentful-paint ≤ 1,000 ms on 2 of 2 runs, and the first HTML's `#app` is non-empty | **FAIL**: 6,508 and 6,432 ms; 0 bytes |
| G4 · the low-power register | `perf.mjs`'s low-power rows | software arm: `<html data-glass-power="low">` and `.dock-plate` computes `backdrop-filter: none`; GPU arm: no attribute and the blur kept | **FAIL**: software arm `blur(16px) saturate(1.2)`, no attribute |
| G5 · the decisions are terminal | `node scripts/tranche/verify-ledger.mjs docs/tranches/BL --rows L01b-60,L01b-69,L05b-20,R2-09-05,R2-09-06,R2-09-09,#60,#69,RT-39C` | exit 0 | **exit 1**: `Cannot find module …/verify-ledger.mjs` (W-B.1 builds it) |

G2 is not born RED: a budget is a ratchet, and HEAD is its ceiling. The born-RED rows are G1, G3, G4 and G5. G1's plant is its selftest; G3's shell and G4's register each fail on HEAD's tree and pass only when built.

## 6 · π and DELTA obligations

Captures under `.cache/evidence/W-H.4/`, each with its sha256, command and paired reading in the wave record.

| surface | cells | paired capture | reading |
|---|---|---|---|
| the boot sequence of `/` at 390×844 | the G3 throttle, Chromium | a filmstrip (screenshots at 250 ms steps to load) before and after | G3's FCP |
| `/` under software compositing | light, dark; Chromium software arm | before and after screenshots: HEAD's blurred plates against the low-power register's solid ones | G4's computed rows and W-H.1's M-2 rows on the solid plates (text on a solid ground) |
| the counts | GPU arm | none (a count is not a visual claim) | G2's table |
| real Safari | — | UNMEASURED (OW-3) | — |

## 7 · MIGRATION rows

- Additive: the low-power head script export and the `data-glass-power` attribute; a consumer adds the script to its document head as it does `darkModeSyncScript`. No removal.
- A consumer page on a machine with no GPU now paints solid plates instead of blurred ones. That is the register's purpose; the CHANGELOG states it.

## 8 · Dependencies and ledger rows

Depends on W-H.2 and W-A.4. Closes F-53 (L01b-60, L01b-69, L05b-20 by one banked run, R2-09-05, R2-09-06 by BUILD, R2-09-09 by RETIRE), #60's boot-shell arm, #69, #39's RT-39C (G2's detented-sheet row with its datum). #60's quiescence and one-context arms close in W-G.3 and W-G.6, named rows of those waves.

## Appendix A · `perf.mjs` (scratch, as run)

The static server is W-0.1 appendix A's, pointed at `dist-demo/`. `ROUTES` defaults to `/,/dock/overview,/foundations/typography`.

```js
const GPU = ["--enable-unsafe-webgpu", "--ignore-gpu-blocklist", "--use-angle=metal", "--force-color-profile=srgb"];
// (1) backdrop surfaces and render passes per frame, GPU arm
{ const b = await chromium.launch({ args: GPU });
  for (const route of ROUTES) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage(); await page.goto(base + route, { waitUntil: "networkidle" }); await page.waitForTimeout(2500);
    const surf = await page.evaluate(() => { let n = 0, vis = 0; for (const el of document.querySelectorAll("*")) { for (const ps of [null, "::before", "::after"]) { const cs = getComputedStyle(el, ps); const bf = cs.backdropFilter || cs.webkitBackdropFilter; if (bf && bf !== "none") { n++; const r = el.getBoundingClientRect(); if (r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight && cs.visibility !== "hidden" && cs.display !== "none") vis++; } } } return { backdropElements: n, inViewport: vis }; });
    const cdp = await ctx.newCDPSession(page); const chunks = [];
    cdp.on("Tracing.dataCollected", (e) => chunks.push(...e.value));
    await cdp.send("Tracing.start", { traceConfig: { includedCategories: ["viz", "cc", "gpu", "disabled-by-default-viz.quads", "benchmark"] }, transferMode: "ReportEvents" });
    await page.waitForTimeout(3000);
    const done = new Promise((r) => cdp.once("Tracing.tracingComplete", r)); await cdp.send("Tracing.end"); await done;
    const names = {}; for (const e of chunks) names[e.name] = (names[e.name] ?? 0) + 1;
    const draw = names["Display::DrawAndSwap"] ?? names["DirectRenderer::DrawFrame"] ?? 0;
    const passes = (names["SkiaRenderer::BeginDrawingRenderPass"] ?? names["DirectRenderer::DrawRenderPass"] ?? names["DirectRenderer::DrawRenderPassAndExecuteCopyRequests"] ?? 0);
    row({ probe: "surfaces+passes", route, ...surf, frames3s: draw, renderPasses3s: passes, passesPerFrame: draw ? +(passes / draw).toFixed(2) : null });
    await ctx.close(); }
  await b.close(); }
// (2) throttled first paint: 150 ms RTT, 1.6 Mbps down, 4x CPU
{ const b = await chromium.launch({ args: GPU });
  for (let run = 0; run < 2; run++) {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 }); const page = await ctx.newPage();
    const cdp = await ctx.newCDPSession(page); await cdp.send("Network.enable"); await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 }); await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    const html = await (await fetch(base + "/")).text(); const appInner = (html.match(/<div id="app">([\s\S]*?)<\/div>/) ?? [, ""])[1].trim();
    await page.goto(base + "/", { waitUntil: "load" }); await page.waitForTimeout(1500);
    const fcp = await page.evaluate(() => { const e = performance.getEntriesByName("first-contentful-paint")[0]; return e ? Math.round(e.startTime) : null; });
    const nav = await page.evaluate(() => { const n = performance.getEntriesByType("navigation")[0]; return { responseEnd: Math.round(n.responseEnd), domContentLoaded: Math.round(n.domContentLoadedEventEnd), load: Math.round(n.loadEventEnd) }; });
    row({ probe: "boot", run, fcpMs: fcp, ...nav, firstHtmlAppChildren: appInner.length });
    await ctx.close(); }
  await b.close(); }
// (3) the capability signal and the blur under software compositing
for (const [arm, args] of [["gpu", GPU], ["software", ["--disable-gpu", "--disable-gpu-compositing", "--disable-software-rasterizer"]]]) {
  const b = await chromium.launch({ args }); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const page = await ctx.newPage();
  await page.goto(base + "/", { waitUntil: "networkidle" }); await page.waitForTimeout(1500);
  const sig = await page.evaluate(async () => { const a = navigator.gpu ? await navigator.gpu.requestAdapter().catch(() => null) : null; const c = document.createElement("canvas"); const gl = c.getContext("webgl2") || c.getContext("webgl"); const plate = document.querySelector(".glass-floating, .glass-resting, .dock-plate"); return { gpuAdapter: !!a, webgl: !!gl, sampleSurface: plate?.className?.toString().slice(0, 40) ?? null, sampleBackdrop: plate ? getComputedStyle(plate).backdropFilter : null }; });
  row({ probe: "low-power", arm, ...sig }); await b.close(); }
```

On `/`, `SkiaRenderer::BeginDrawingRenderPass` and `DirectRenderer::DrawRenderPass` both counted 1,805 in the window, against 361 `DirectRenderer::DrawFrame`. The landed `count.mjs` reads `DirectRenderer::DrawRenderPass` over `DirectRenderer::DrawFrame` by name, with no fallback chain.

## Appendix B · `sheet-passes.mjs` (RT-39C, scratch, as run)

```js
const b = await chromium.launch({ args: ["--enable-unsafe-webgpu", "--ignore-gpu-blocklist", "--use-angle=metal", "--force-color-profile=srgb"] });
async function passes(page, ctx) { const cdp = await ctx.newCDPSession(page); const n = {}; cdp.on("Tracing.dataCollected", (e) => { for (const x of e.value) n[x.name] = (n[x.name] ?? 0) + 1; });
  await cdp.send("Tracing.start", { traceConfig: { includedCategories: ["viz", "benchmark"] }, transferMode: "ReportEvents" }); await page.waitForTimeout(3000);
  const d = new Promise((r) => cdp.once("Tracing.tracingComplete", r)); await cdp.send("Tracing.end"); await d; const f = n["DirectRenderer::DrawFrame"] ?? 0; const p = n["DirectRenderer::DrawRenderPass"] ?? 0; return { frames3s: f, passes3s: p, perFrame: f ? +(p / f).toFixed(2) : null }; }
for (const which of ["closed", "detented"]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const page = await ctx.newPage(); await page.goto(base + "/containers/sheet", { waitUntil: "networkidle" }); await page.waitForTimeout(1500);
  if (which === "detented") { await page.getByRole("button", { name: "Open detented sheet" }).click(); await page.waitForTimeout(1500); }
  const lenses = await page.evaluate(() => [...document.querySelectorAll("*")].filter((e) => getComputedStyle(e).backdropFilter !== "none").length);
  console.log(JSON.stringify({ route: "/containers/sheet", which, lenses, ...(await passes(page, ctx)) })); await ctx.close(); }
```

Output here: closed `{"lenses":13,"frames3s":360,"passes3s":1800,"perFrame":5}`; detented `{"lenses":16,"frames3s":360,"passes3s":2160,"perFrame":6}`.
