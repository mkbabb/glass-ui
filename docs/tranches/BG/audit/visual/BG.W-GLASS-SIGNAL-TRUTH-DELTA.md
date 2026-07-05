# BG.W-GLASS-SIGNAL-TRUTH — dual-engine PAINT judge DELTA

**Verdict: FAIL — fix owed (paint-pending → PENDING).**
**Re-judged:** 2026-07-04 (2nd re-judge) · non-authoring paint judge (did not build; verifies painted truth against criteria).
**Tree:** `tranche/BG` @ HEAD `22af965b` (the M8-runtime part-2 loop-arm fix INTEGRATED at `d785cba2`: `wantsLiveLoop()` arms the loop on live INTENT + DockStage hands `preserveDrawingBuffer: true` + `data-glass-field-canvas` on the sampled field; `proof:glass` GREEN device-free, `vue-tsc --noEmit` clean).
**Outcome:** the loop-arm part-2 fix did **NOT** change the painted outcome. The born-RED FAIL this wave was built to close **STILL reproduces in paint**: **0 of 12** docks on `/dock/overview` fire the ST3 writer-fired witness — both modes, both engines — measured at `data-capture-ready`, at +6s (24 loop ticks), and after a viewport-resize (the ResizeObserver arm). Unchanged from the 07-04 re-judge.
**Pipeline (proven C18):** demo dist BUILT (`npm run demo:dist:build` → fresh bytes) served on `:5200` (`vite preview`). Chrome leg via `playwright.connectOverCDP('http://localhost:9477')` against real `Chrome.app` 149.0.7827.201 → `?capture=<route>&mode=<m>` (`waitUntil:load` → poll `data-capture-ready`) → GL_RENDERER off a throwaway WebGL2 ctx → `page.screenshot`. Safari leg via the compiled `/tmp/wkshot-live` off-screen WKWebView (system WebKit.framework/Metal) polling `data-capture-ready` before `takeSnapshot`. `verify-siblings-intact --quiet` exit 0 before + after.

## Provenance (engine badges decoded off the in-pixel top-left overlay)

| Route | Chrome badge | Safari badge |
|---|---|---|
| `/dock/overview` | `ENGINE CHROME · GPU ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version) · VIEW 1440×900 @2x (2880×1800px) · MODE LIGHT` | `ENGINE WEBKIT · GPU Apple GPU · VIEW 1440×900 @2x (2880×1800px) · MODE DARK` |

Real ANGLE-Metal M5 Max (Chrome, GL_RENDERER read programmatically) + real WebKit Apple GPU (system framework by construction), both decoded from the rendered PNGs. No SwiftShader, no masked fallback — NO-MASKING-FALLBACK edict honored on the capture side.

## Captures (4 PNGs, all resolve on disk, all 2880×1800)

`docs/tranches/BG/audit/visual/BG.W-GLASS-SIGNAL-TRUTH-paint2/`

| file | dims | bytes |
|---|---|---|
| BG.W-GLASS-SIGNAL-TRUTH-chrome-dock-overview-light.png | 2880×1800 | 1,929,042 |
| BG.W-GLASS-SIGNAL-TRUTH-chrome-dock-overview-dark.png | 2880×1800 | 1,907,073 |
| BG.W-GLASS-SIGNAL-TRUTH-safari-dock-overview-light.png | 2880×1800 | 1,680,466 |
| BG.W-GLASS-SIGNAL-TRUTH-safari-dock-overview-dark.png | 2880×1800 | 1,707,040 |

Deep-probe evidence script (checked in beside this DELTA): `BG.W-GLASS-SIGNAL-TRUTH-deepprobe.mjs` (emits the per-dock witness tally at `data-capture-ready` + at +6s). The prior 07-04 re-judge captures remain under `BG.W-GLASS-SIGNAL-TRUTH-paint/`.

## Criteria scorecard (computed DOM checks + pixel reads)

| # | Criterion | Result | Evidence |
|---|---|---|---|
| ST1 | `.glass-clear` unwired plate paints the STATIC floor scrim `calc(12% + luma·28%)`, never `calc(0·40%)=0%` | **N/A (source-green, not pixel-exercised)** | NO `.glass-clear`/`[data-surface="clear"]` element renders on the wave route (`clearScrim:null` every mode/engine). Source correct + `proof:glass` ST1 GREEN, but no route paints a clear plate → not pixel-verified. Not a blocker. |
| ST2 | ONE backdrop-hue channel: real-writer `--glass-ambient-hue`/`--glass-ambient-strength`; dead `--glass-backdrop-hue` GONE | **PASS** | `--glass-backdrop-hue` resolves EMPTY/ABSENT at `:root` on `/dock/overview`, both modes, both engines. The only hue channels present are `--glass-ambient-hue` / `--glass-ambient-strength`. One name, one writer. |
| ST3 | **The dock observer's `data-backdrop-sampled` witness FIRES over the DockStage field; the ambient-hue catch-light reads WHERE it fires** | **FAIL** | 0 of 12 docks fire on `/dock/overview` (both modes, both engines). See "The defect" below. |
| ST4 | declarative `@container` bucket drives the band; continuous luma clamp is the dock-scoped refinement | **PARTIAL** | The declarative-bucket FLOOR is present + correct — every dock resolves `--glass-backdrop: light` and reads as translucent glass over the warm DockStage aurora (pixel-confirmed both engines, both modes). But the "refinement where a writer fires" never engages because no dock writer fires (ST3). The floor paints; the observer refinement is dead. |

## The defect (ST3 — the dock observer is STILL dead on the whole band)

The wave's own ST3 comment (`useGlassBackdropLuminance.ts:413-420`) states the witness exists precisely because "A dead/silently-failed observer is otherwise INDISTINGUISHABLE from a calm backdrop." The witness caught exactly that, again: **the observer's write path never executes for ANY dock on the flagship route.**

Per-dock computed-DOM tally on `/dock/overview` (Chrome CDP probe, `data-capture-ready` → poll; measured at ready, at +6s, AND after a viewport resize — all identical):

| Trigger measured | `.glass-dock` count | `[data-backdrop-sampled]` fires | verdict |
|---|---|---|---|
| at `data-capture-ready` | 12 | **0** | DEAD |
| +6s (24 loop ticks @ ≤4 Hz) | 12 | **0** | DEAD |
| after viewport resize (ResizeObserver arm) | 12 | **0** | DEAD |

Every dock (both modes), all three trigger paths:
- `data-glass-sample` = `null`.
- inline `--glass-backdrop-luma` = **`(none)`**; computed = `0` (the `@property` initial, NOT a real write).
- inline `--glass-backdrop-sampled` = **`(none)`**; `--glass-ambient-hue` = `rgba(0,0,0,0)`; `--glass-ambient-strength` = `0%`.
- `data-backdrop-sampled` attr = **absent**.
- On-screen docks (0–3, tops 16/475/683/890) all fail; PRM false; ZERO console errors; not a timing artifact.

## Root-cause isolation (four in-page probes — for the build-fix agent, STEP 0.4)

The evidence brackets the failure precisely. **The observer is instantiated, the write path works globally, and BOTH sample functions return non-null for docks — yet `write()` never runs for a single dock.**

1. **The observer code IS shipped + wired.** `wantsLiveLoop` / `data-backdrop-sampled` / `glass-backdrop-luma` all present in the built `dist-demo/assets/index-*.js`. `GlassDock.vue:86` guards the observer on `props.autoLuminance !== false` (default `undefined` → guard passes → observer wired). `ref="dockEl"` (GlassDock.vue:353) IS on the `.glass-dock` element the observer writes to (so the witness would land exactly where the probe queries). Docks render fine → the `useGlassBackdropLuminance(dockEl, …)` call did not throw.

2. **The write path works GLOBALLY (the control proves it).** On `/substrates/glass-material`, the demo glass-card wired with explicit `live:true` + a handed `backgroundCanvas` **DOES** stamp the witness (`data-backdrop-sampled` present, `inlineLuma:0.000`) in this exact build. So `write()` + `setProperty`/`setAttribute` are functional; the failure is **dock-specific**.

3. **BOTH sample functions return NON-NULL when replicated in-page on a dock.** A faithful in-page replication of `sampleStatic` on dock[0..3] returns `luma 0.981` (an opaque near-white `rgb(251,250,248)` found up the `elementsFromPoint` stack) — NON-NULL. A faithful `sampleAnimated` replication returns `luma 1.0`. So **if `sampleNow()` ran for a dock, it WOULD write** (even the static mount write should land luma 0.981 + stamp the witness). It never does.

4. **Therefore: the dock observer's `sampleNow()` is never invoked across mount + rAF loop + ResizeObserver** (or its write is suppressed for the dock target — but the control disproves a broken `write()`). The common bail is `sampleNow()`'s `if (!el) return` — the evidence is consistent with **`target.value` (dockEl) reading null at every trigger** for the dock instances even though the element is in the DOM, OR the mount `watch(() => target.value, …, {immediate:true, flush:"post"})` (`:488-496`) / the `useRAFLoop` tick / the `useResizeObserver` arm never firing their callback for the dock scope. The `wantsLiveLoop()` loop-arm fix (`:280-289`, `:476-480`) changed the ARMING predicate but did NOT make a single dock write — so the gap is upstream of the loop (the sample/write never executes at all), not in whether the loop is "live".

**The delta that separates the working control from the dead dock:** the control passes `{ live: true, backgroundCanvas: <canvas> }`; the dock passes `{ backgroundCanvas: <getter> }` with NO `live`. The build-fix agent should instrument `sampleNow()`/the mount watch/`write()` at runtime gated on a dock target (a temporary `console.log`) to confirm which of {mount-watch-never-fires-with-el, loop-never-ticks-sampleNow, write-suppressed} is live, then close it — the empirical bracket above rules out {code-absent, guard-off, write-broken-globally, sample-returns-null}.

## Secondary defect (mustFix #2 — the animated readback is DEGENERATE even where it fires)

Even the working control card writes **luma 0 / hue transparent**. The DockStage field WebGL `<canvas>` (armed, 1928×4809, carries `data-glass-field-canvas`) reads **`{r:0,g:0,b:0,a:0}` — fully transparent/empty** on `drawImage` DESPITE the M8 `preserveDrawingBuffer: true` handoff. So the animated sample composites-over-white to a degenerate luma≈1.0 and a `transparent` ambient hue, NOT the real warm-field luma+hue. Even once the dock observer is MADE to fire (mustFix #1), "the ambient-hue catch-light WHERE the observer fires" would be degenerate. The build-fix agent must ensure the sampled Aurora canvas yields real warm field pixels on readback (verify `preserveDrawingBuffer` actually reaches the WebGL context init, or use a readback path that survives compositing — the readback yields black in the BUILT preview even with the option handed).

## Pixel gestalt (both engines, both modes)

- `/dock/overview` (Chrome + Safari, light + dark): docks read as translucent glass pills over the warm DockStage aurora — the declarative-bucket FLOOR is correct, glass reads as glass (not a gray slab). Aurora recessive (no conic banding, no oversaturation), grain calm, docks fit their tiles, hero "Overview" title fits its envelope. But the observer-driven adaptive darken + ambient catch-light are ABSENT (mechanism dead — ST3).

## mustFix[]

1. **[ST3, blocking] The `GlassDock` sampled-luminance observer must FIRE** — on `/dock/overview`, every mounted, on-screen `GlassDock` must stamp `data-backdrop-sampled` + write a real `--glass-backdrop-luma` and `--glass-ambient-hue` (both modes). Today 0 of 12 fire; the `wantsLiveLoop` loop-arm fix did NOT change the paint. The failure is upstream of the loop (the sample/write never executes for docks at all — mount watch + loop + resize all inert), NOT the arming predicate. Localize per `GlassDock.vue:86-104` + `useGlassBackdropLuminance.ts:434-443 (sampleNow) / 488-496 (mount watch) / 400-429 (write)`. The empirical bracket rules out {code-absent, guard-off, write-broken-globally, sample-returns-null} — instrument the dock's `sampleNow()`/mount-watch at runtime to find why the callback never lands a write, then close it. Candidate: ensure the mount watch resolves a non-null dock `target.value` and `sampleNow()` is actually invoked for the dock scope (the control's `live:true` path works; the dock's no-`live` path does not fire a single sample).
2. **[ST3, secondary] The animated readback must yield a real field luma+hue** — the field canvas reads `{0,0,0,0}` on `drawImage` even with `preserveDrawingBuffer: true` handed via DockStage runtime-options; the control's write is degenerate (luma 0 / hue transparent). Ensure the sampled Aurora canvas yields real warm field pixels (nonzero luma + a warm ambient hue), else the catch-light is degenerate once the observer fires. Verify `preserveDrawingBuffer` reaches the WebGL context init in the BUILT preview, or adopt a readback path that survives compositing.
3. **[ST1, non-blocking gap] No `.glass-clear` plate is exercised on the wave route** — the clear-scrim floor is source-correct + gate-green but never pixel-verified. If the wave intends it as a route-visible truth, render a `.glass-clear` specimen on a captured route; otherwise record ST1 as source-only (out of the paint judge's pixel reach).

## Notes for re-judge (after fix)

Re-run `/dock/overview` (+ `/substrates/glass-material` as the control) × 2 modes × 2 engines. PASS requires: (a) `/dock/overview` docks stamp `data-backdrop-sampled` with real luma+ambient-hue writes in both modes (not the `@property` 0 / transparent null) — 12/12 on-screen+mounted; (b) the animated readback is non-degenerate (real warm field luma+hue, not luma 0 / transparent); (c) ST2 stays PASS (dead `--glass-backdrop-hue` absent); (d) all PNGs resolve at 2880×1800; (e) the calm/glass gestalt holds (aurora recessive, no conic/oversaturation). The canonical deep-probe script (`BG.W-GLASS-SIGNAL-TRUTH-deepprobe.mjs`) emits the per-dock witness tally at ready + +6s.
