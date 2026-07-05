# BG.W-GLASS-SIGNAL-TRUTH — dual-engine PAINT judge DELTA

**Verdict: FAIL — fix owed (paint-pending → PENDING).**
**Re-judged:** 2026-07-04 · non-authoring paint judge (did not build; verifies painted truth against criteria).
**Tree:** `tranche/BG` @ HEAD `43f203cc` (integrated; the M8/ST5 runtime fix landed — reactive `backgroundCanvas` getter + `isLive()` considers a resolvable field canvas + `normalizeToRgb` static floor; `proof:glass` GREEN device-free, `vue-tsc --noEmit` clean).
**Outcome:** the M8/ST5 source fix did **NOT** change the painted outcome. The born-RED FAIL this wave was built to close **STILL reproduces in paint**: ZERO of 12 docks on `/dock/overview` fire the writer-fired witness, both modes, both engines.
**Pipeline (proven C18):** demo dist BUILT (`npm run demo:dist:build` → fresh bytes, ~2s) served on `:5200` (`vite preview`). Chrome leg via `playwright.connectOverCDP('http://localhost:9477')` against a real `Chrome.app` (149.0.7827.201) → `?capture=<route>&mode=<m>` (`waitUntil:load` → poll `data-capture-ready`) → GL_RENDERER off a throwaway WebGL2 ctx → `page.screenshot`. Safari leg via the compiled `/tmp/wkshot-live` WebKit harness (polls `data-capture-ready` before `takeSnapshot`). `verify-siblings-intact --quiet` exit 0 before + after.

## Provenance (engine badges decoded off the in-pixel top-left overlay)

| Route | Chrome badge | Safari badge |
|---|---|---|
| both | `ENGINE CHROME · GPU ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version) · VIEW 1440×900 @2x (2880×1800px)` | `ENGINE WEBKIT · GPU Apple GPU · VIEW 1440×900 @2x (2880×1800px)` |

Real ANGLE-Metal M5 Max + real WebKit Apple GPU in BOTH modes — no SwiftShader, no masked fallback. NO-MASKING-FALLBACK edict honored on the capture side (badges decoded from the rendered PNGs, not asserted).

## Captures (8 PNGs, all resolve on disk, all 2880×1800)

`docs/tranches/BG/audit/visual/BG.W-GLASS-SIGNAL-TRUTH-paint/`

| file | dims | bytes |
|---|---|---|
| BG.W-GLASS-SIGNAL-TRUTH-chrome-dock-overview-light.png | 2880×1800 | 1,866,163 |
| BG.W-GLASS-SIGNAL-TRUTH-chrome-dock-overview-dark.png | 2880×1800 | 1,893,972 |
| BG.W-GLASS-SIGNAL-TRUTH-chrome-glass-material-light.png | 2880×1800 | 3,240,667 |
| BG.W-GLASS-SIGNAL-TRUTH-chrome-glass-material-dark.png | 2880×1800 | 3,069,390 |
| BG.W-GLASS-SIGNAL-TRUTH-safari-dock-overview-light.png | 2880×1800 | 1,680,531 |
| BG.W-GLASS-SIGNAL-TRUTH-safari-dock-overview-dark.png | 2880×1800 | 1,706,984 |
| BG.W-GLASS-SIGNAL-TRUTH-safari-glass-material-light.png | 2880×1800 | 4,712,813 |
| BG.W-GLASS-SIGNAL-TRUTH-safari-glass-material-dark.png | 2880×1800 | 4,686,639 |

## Criteria scorecard (computed DOM checks + pixel reads)

| # | Criterion | Result | Evidence |
|---|---|---|---|
| ST1 | `.glass-clear` unwired plate paints the STATIC floor scrim `calc(12% + luma·28%)`, never `calc(0·40%)=0%` | **N/A (source-green, not pixel-exercised)** | NO `.glass-clear`/`[data-surface="clear"]` element renders on either wave route (`clearScrim:null` every route/mode/engine). Source at `material.css` is correct + `proof:glass` ST1 GREEN, but no route paints a clear plate, so it is not pixel-verified. Not a blocker. |
| ST2 | ONE backdrop-hue channel: real-writer `--glass-ambient-hue`/`--glass-ambient-strength`; dead `--glass-backdrop-hue` GONE | **PASS** | `--glass-backdrop-hue` resolves EMPTY/ABSENT at `:root` on both routes, both modes, both engines. The only hue channels present are `--glass-ambient-hue` / `--glass-ambient-strength`. One name, one writer. |
| ST3 | **The dock observer's `data-backdrop-sampled` witness FIRES over the DockStage field; the ambient-hue catch-light reads WHERE it fires** | **FAIL** | 0 of 12 docks fire on `/dock/overview` (both modes, both engines). See "The defect" below. |
| ST4 | declarative `@container` bucket drives the band; continuous luma clamp is the dock-scoped refinement | **PARTIAL** | The declarative-bucket FLOOR is present + correct — every dock resolves `--glass-backdrop: light` and reads as translucent glass over the warm DockStage aurora (pixel-confirmed both engines, both modes). But the "refinement where a writer fires" never engages because no dock writer fires (ST3). The floor paints; the observer refinement is dead. |

## The defect (ST3 — the dock observer is STILL dead on the whole band)

The wave's own ST3 comment (`useGlassBackdropLuminance.ts`) states the witness exists precisely because "A dead/silently-failed observer is otherwise INDISTINGUISHABLE from a calm backdrop." The witness caught exactly that, again: **the observer is dead on the entire dock band on the flagship route.**

Per-dock computed-DOM tally on `/dock/overview` (Chrome CDP probe, `data-capture-ready` → poll; measured at `data-capture-ready` AND +3s, identical):

| Route | `.glass-dock` count | `[data-backdrop-sampled]` fires | verdict |
|---|---|---|---|
| `/dock/overview` (flagship) | 12 | **0** | DEAD |

Every dock (both modes):
- `data-glass-sample` = `null` → `isLive()` returns `false`.
- inline `--glass-backdrop-luma` = **`(none)`**; computed `--glass-backdrop-luma` = `0` (the `@property` initial, NOT a real write).
- inline `--glass-backdrop-sampled` = **`(none)`**; `--glass-ambient-hue` = `rgba(0,0,0,0)`; `--glass-ambient-strength` = `0%`.
- `data-backdrop-sampled` attr = **absent**.
- On-screen docks 0–3 (`top` 16/475/683/890, real dims) all fail; PRM false; ZERO console errors; not a timing artifact (polled at ready + 3s).

**The control proves the composable works.** On `/substrates/glass-material`, the demo glass-card wired with explicit `live:true` + a handed `backgroundCanvas` (`glass-material.vue`) DOES stamp the witness (`--glass-backdrop-sampled:1`, `data-backdrop-sampled` present) in both modes, both engines. So the `useGlassBackdropLuminance` write path is intact — the failure is dock-specific.

## Root-cause localization (for the build-fix agent — STEP 0.4)

The M8/ST5 fix wired GlassDock's observer with a **reactive getter** (`GlassDock.vue:94-104`) so `props.backgroundCanvas` re-resolves per-sample, and made `isLive()` treat a resolvable field canvas as live (`useGlassBackdropLuminance.ts:258-262`). The DockStage DOES hand each staged dock `:background-canvas="backgroundCanvas"` (`overview.vue:126,145,178,…`), where DockStage's `backgroundCanvas` = `computed(() => auroraRef.value?.canvasRef ?? null)` (`DockStage.vue:53-55`). **But the paint still shows 0 writes.** Two independent gaps localize it:

1. **[primary] `isLive()` is evaluated ONLY at mount; nothing re-arms when the canvas resolves post-mount.** The observer's mount `watch(() => target.value, …, {immediate:true, flush:"post"})` (`useGlassBackdropLuminance.ts:459-467`) fires `sampleNow()` + `applyMotionState()` ONCE when `dockEl` resolves. At that instant DockStage's `auroraRef.value?.canvasRef` is still `null` (the `<Aurora>` child mounts AFTER the dock's setup), so `isLive()` is `false`, the live rAF loop is never `start()`ed, and the static branch runs. When `canvasRef` flips `null → canvas` a beat later, `props.backgroundCanvas` updates on the dock (reactive) — but the observer has **NO watcher on the getter's resolution**, so `isLive()` is never re-checked and `loop.start()` never fires. The reactive getter re-resolves the canvas per-sample, but no sample is ever scheduled. `sampleAnimated` (the real warm-field luma + ambient-hue writer) is therefore UNREACHABLE for the docks — the exact "the animated path is unreachable" state the ST3 comment describes, still live.
2. **[secondary] Even the STATIC mount write never lands the witness on any dock.** With `isLive()===false` at mount, `sampleNow()` → `sampleStatic(dockEl)` (`:337-361`), which for a dock resolves `elementsFromPoint` (all layers under it transparent → skipped) → falls to `bodyBg = rgba(0,0,0,0)` → `normalizeToRgb` returns `[0,0,0,0]` (NOT null) → `staticResult` → luma 0 → `write()` → SHOULD stamp `data-backdrop-sampled`. In the BUILT demo this write **never lands on any of the 12 docks** (inline luma `(none)`, witness absent) — the same behavior the prior (07-03) DELTA flagged. So the static floor mount write is ALSO not firing on the dock target.
3. **[contributing] The auto-discovery rescue can't fire either.** `SHELL_FIELD_CANVAS_SELECTOR` (`[data-glass-field-canvas] canvas, canvas[data-glass-field-canvas]`) resolves NOTHING on `/dock/overview` in capture mode (`fields:[]`): AppShell's shell field (`AppShell.vue:320` carries the marker) is not present on this route in capture mode, and NEITHER DockStage aurora `<canvas>` (1928×4809 armed + a 300×150 dead one) carries the `data-glass-field-canvas` marker. So even the `!src` auto-discover branch would return null.

Additionally, on the working control (glass-material card), the witness fires but writes **luma 0 / hue transparent** — the `sampleAnimated` `drawImage(WebGL canvas)` readback yields black (a WebGL canvas without `preserveDrawingBuffer` reads empty after compositing). So even when the dock observer IS made to fire, the animated readback must be verified to yield a real nonzero warm luma + ambient hue, else "the ambient-hue catch-light where the observer fires" is degenerate.

## Pixel gestalt (both engines, both modes)

- `/dock/overview` (Chrome + Safari, light + dark): docks read as translucent glass pills over the warm DockStage aurora — the declarative-bucket FLOOR is correct, glass reads as glass (not a gray slab). Aurora recessive (no conic banding, no oversaturation), grain calm, docks fit their tiles. But the observer-driven adaptive darken + ambient catch-light are ABSENT (mechanism dead — ST3).
- `/substrates/glass-material` (both): the working reference — the "Glass Material" display hero fits its envelope, the warm aurora reads recessive behind, and the demo glass-card's observer fires. Clean gestalt.

## mustFix[]

1. **[ST3, blocking] The `GlassDock` sampled-luminance observer must FIRE** — on `/dock/overview` (the flagship route), every mounted, on-screen `GlassDock` must stamp `data-backdrop-sampled` + write a real `--glass-backdrop-luma` and `--glass-ambient-hue` (both modes). Today 0 of 12 fire. The M8/ST5 reactive-getter fix did NOT change the paint. Localize per `GlassDock.vue:86-104` + `useGlassBackdropLuminance.ts:258-262 / 337-361 / 459-467`. Candidate fixes (build-fix agent's call): (a) re-evaluate `isLive()` + re-arm the live loop when the handed `backgroundCanvas` resolves post-mount — a `watch` on the getter's resolution that calls `applyMotionState()`/`sampleNow()`, OR start the loop unconditionally and let `sampleAnimated ?? sampleStatic` decide per-tick; AND/OR (b) guarantee the static mount `sampleStatic` write LANDS on the dock target (stamp the witness even with luma 0) so the floor witness fires with no field canvas.
2. **[ST3, secondary] The animated readback must yield a real field luma+hue** — even the working control card writes luma 0 / hue transparent (`drawImage` of the WebGL aurora canvas reads black). Ensure the dock's animated sample reads real warm field pixels (nonzero luma + a warm ambient hue), else the catch-light is degenerate. May require `preserveDrawingBuffer` on the sampled Aurora canvas or a different readback path.
3. **[ST1, non-blocking gap] No `.glass-clear` plate is exercised on either wave route** — the clear-scrim floor is source-correct + gate-green but never pixel-verified. If the wave intends the clear-scrim to be a route-visible truth, render a `.glass-clear` specimen on a captured route; otherwise record ST1 as source-only (out of the paint judge's pixel reach).

## Notes for re-judge (after fix)

Re-run `/dock/overview` + `/substrates/glass-material` × 2 modes × 2 engines. PASS requires: (a) `/dock/overview` docks stamp `data-backdrop-sampled` with real luma+ambient-hue writes in both modes (not the `@property` 0 / transparent null); (b) ST2 stays PASS (dead `--glass-backdrop-hue` absent); (c) all PNGs resolve at 2880×1800; (d) the calm/glass gestalt holds (aurora recessive, no conic/oversaturation). The canonical capture script is checked in beside this DELTA (`BG.W-GLASS-SIGNAL-TRUTH-chrome-capture.mjs`; it emits the per-dock witness tally in its DOM probe).
