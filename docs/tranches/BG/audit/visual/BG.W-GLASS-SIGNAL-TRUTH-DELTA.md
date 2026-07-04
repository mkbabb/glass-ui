# BG.W-GLASS-SIGNAL-TRUTH — dual-engine PAINT judge DELTA

**Verdict: FAIL — fix owed (paint-pending → PENDING).**
**Judged:** 2026-07-03 · non-authoring paint judge (did not build; verifies painted truth against criteria).
**Tree:** `tranche/BG` @ HEAD `9eb5dee9` (integrated; `proof:glass` GREEN device-free, `vue-tsc` clean).
**Pipeline (proven C18):** demo dist BUILT (`npm run demo:dist:build`) served on `:5200` (`vite preview`). Chrome leg via `playwright.connectOverCDP('http://localhost:9477')` against a real `Chrome.app` (149.0.7827.201) → `?capture=<route>&mode=<m>` (`waitUntil:load` → poll `data-capture-ready`) → GL_RENDERER off a throwaway WebGL2 ctx → `page.screenshot`. Safari leg via the compiled `/tmp/wkshot-live` WebKit harness (polls `data-capture-ready` before `takeSnapshot`).

## Provenance (engine badges decoded off the top-left overlay)

| Route | Chrome badge | Safari badge |
|---|---|---|
| all 3 | `CHROME · ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)` | `WEBKIT · Apple GPU` |

Real ANGLE-Metal M5 Max + real WebKit Apple GPU in BOTH modes — no SwiftShader, no masked fallback. NO-MASKING-FALLBACK edict honored on the capture side.

## Captures (12 PNGs, all resolve on disk, all `isRealPng` 2880×1800)

`docs/tranches/BG/audit/visual/BG.W-GLASS-SIGNAL-TRUTH-paint/`

| file | dims | bytes |
|---|---|---|
| BG.W-GLASS-SIGNAL-TRUTH-chrome-dock-overview-light.png | 2880×1800 | 1,869,210 |
| BG.W-GLASS-SIGNAL-TRUTH-chrome-dock-overview-dark.png | 2880×1800 | 1,897,379 |
| BG.W-GLASS-SIGNAL-TRUTH-chrome-glass-material-light.png | 2880×1800 | 3,236,413 |
| BG.W-GLASS-SIGNAL-TRUTH-chrome-glass-material-dark.png | 2880×1800 | 3,074,501 |
| BG.W-GLASS-SIGNAL-TRUTH-chrome-display-buttons-light.png | 2880×1800 | 2,706,074 |
| BG.W-GLASS-SIGNAL-TRUTH-chrome-display-buttons-dark.png | 2880×1800 | 3,900,374 |
| BG.W-GLASS-SIGNAL-TRUTH-safari-dock-overview-light.png | 2880×1800 | 1,680,224 |
| BG.W-GLASS-SIGNAL-TRUTH-safari-dock-overview-dark.png | 2880×1800 | 1,706,590 |
| BG.W-GLASS-SIGNAL-TRUTH-safari-glass-material-light.png | 2880×1800 | 4,712,813 |
| BG.W-GLASS-SIGNAL-TRUTH-safari-glass-material-dark.png | 2880×1800 | 4,686,639 |
| BG.W-GLASS-SIGNAL-TRUTH-safari-display-buttons-light.png | 2880×1800 | 2,485,902 |
| BG.W-GLASS-SIGNAL-TRUTH-safari-display-buttons-dark.png | 2880×1800 | 2,914,167 |

## Criteria scorecard (computed DOM checks + pixel reads)

| # | Criterion | Result | Evidence |
|---|---|---|---|
| ST1 | `.glass-clear` unwired plate paints the STATIC floor scrim `calc(12% + luma·28%)`, never `calc(0·40%)=0%` | **N/A on these routes (source GREEN, not pixel-exercised)** | NO `.glass-clear`/`[data-surface="clear"]` element renders on any of the 3 routes (`clearCount:0` every route/mode/engine). The source at `material.css:473-478` is correct (floor 12% + luma·28%, dead `,0.5` gone); `proof:glass` ST1 GREEN. NOT a blocker, but NOT paint-verified either. |
| ST2 | ONE backdrop-hue channel: real-writer `--glass-ambient-hue`/`--glass-ambient-strength`; dead `--glass-backdrop-hue` GONE | **PASS** | `--glass-backdrop-hue` resolves EMPTY/ABSENT at `:root` on all 3 routes, both modes, both engines. The only hue channels present are `--glass-ambient-hue`/`--glass-ambient-strength`. One name, one writer. |
| ST3 | **The observer's `data-backdrop-sampled` witness FIRES; the ambient-hue catch-light reads WHERE the dock observer fires** | **FAIL** | See "The defect" below. The dock observer NEVER fires on any `GlassDock`. |
| ST4 | declarative `@container` bucket drives the band; continuous luma clamp is the dock-scoped refinement | **PARTIAL** | The declarative bucket floor is present — every dock resolves `--glass-backdrop: light` (light) and reads as glass over the field (pixel-confirmed both engines). But the "refinement where a writer fires" never engages because no dock writer fires (ST3). The floor paints; the refinement is dead. |

## The defect (ST3 — the dead dock observer)

The wave's own ST3 source comment (`useGlassBackdropLuminance.ts:345-354`) states the witness exists precisely because "A dead/silently-failed observer is otherwise INDISTINGUISHABLE from a calm backdrop." The witness caught exactly that: **the observer is dead on the entire dock band.**

Witness tally (`[data-backdrop-sampled]` count, light mode, both engines identical):

| Route | `.glass-dock` count | `[data-backdrop-sampled]` fires | verdict |
|---|---|---|---|
| `/dock/overview` (flagship) | 12 | **0** | DEAD |
| `/substrates/glass-material` | 2 docks + 3 glass-cards | 1 (the demo glass-card w/ `live:true`) — **0 of 2 docks** | DEAD on docks |
| `/display/buttons` | 2 | **0** | DEAD |

Per-dock diagnostic on `/dock/overview` dock #1 (fully on-screen, top≈475px, both modes):
- `data-glass-sample` = `(unset)` → `isLive()` returns `false`.
- inline `--glass-backdrop-luma` = **`(none)`** — the observer NEVER wrote to the dock.
- inline `--glass-backdrop-sampled` = **`(none)`** — witness never stamped.
- `data-backdrop-sampled` attr = **absent**.
- The `elementsFromPoint` stack under the dock centre has ample paintable layers (the dock's own `color(srgb … / 0.52)` fill, a `dock-separator`, etc.) — so `sampleStatic()` WOULD return non-null and `write()` WOULD stamp, *if the mount sample ran*. It does not.
- Polled 8× over 4s on `/dock/overview`: `sampled` stays 0, `anyLuma` stays false, `prefers-reduced-motion` false, ZERO console errors. Not a timing artifact.

Docks 0,1,2,3,11 are all `onScreen:true` with real dims; the DockStage aurora `<canvas>` is 1928×4809 (live, nonzero). None fire.

### Root-cause localization (for the build-fix agent — STEP 0.4)

The mechanism WORKS where `live:true` is passed explicitly: `demo/stories/substrates/glass-material.vue:63-65` calls `useGlassBackdropLuminance(cardRef, { live: true, backgroundCanvas: … })` and that card DOES stamp the witness + writes luma/hue (confirmed: `--glass-backdrop-sampled:1`, `data-backdrop-sampled` present).

The `GlassDock` internal call does NOT reproduce this:
- `src/components/custom/dock/GlassDock.vue:86-89` — `useGlassBackdropLuminance(dockEl, { backgroundCanvas: props.backgroundCanvas ?? null })` — passes NO `live` flag and the dock root carries NO `data-glass-sample="live"` attribute, so `isLive()` (`useGlassBackdropLuminance.ts:218-221`) returns `false`.
- With `isLive()===false`, the mount `watch(target, …, {immediate:true, flush:"post"})` (`:418-426`) calls `sampleNow()` → `sampleStatic(el)` (`:369-372`) which resolves the `elementsFromPoint` backdrop / body-bg fallback and SHOULD return non-null → `write()` → stamp. **In the BUILT demo this write never lands on any `GlassDock` target** (inline luma `(none)` on all 12). The observer call runs (code is in `dist-demo/assets/index-*.js`, 12 docks mount) but produces zero writes — so either the mount sample is not reaching `write()` for the dock target, or a subsequent frame is clobbering the inline write, or the `dockEl` ref timing on the built shell docks differs from the demo card path.

The build-fix agent must make the **dock** observer produce a real write (stamp the witness + write luma/ambient-hue) on `/dock/overview` — the route the wave names for "the ambient-hue catch-light where the dock observer fires." The likely surgical fixes to evaluate (build-fix agent's call, NOT prescribed here):
1. Wire the dock's observer to actually sample the DockStage field it is handed (`props.backgroundCanvas`) — i.e. run the LIVE path (`isLive()` true) when a `backgroundCanvas` is present, so `sampleAnimated` reads the aurora + writes the ambient hue; today the dock passes the canvas but never sets `live`/`data-glass-sample`, so the animated path is unreachable and the static mount write is not landing either.
2. Guarantee the mount `sampleStatic` write lands on the dock target (the floor path) so the witness fires even with no field canvas.

## Pixel gestalt (both engines, both modes)

- `/dock/overview` (Chrome + Safari, light + dark): docks read as translucent glass pills over the warm DockStage aurora — the declarative-bucket FLOOR is correct and glass reads as glass, not a gray slab. But the observer-driven adaptive darken + ambient catch-light are absent (mechanism dead). Aurora recessive, grain calm, docks fit their tiles. No conic/oversaturation.
- `/substrates/glass-material` (both): the working reference — display hero fits its envelope, aurora reads through, the demo glass-card's observer fires. Clean.
- `/display/buttons` (both): the consumer band renders correctly (glass CTA over the blue field, glass-register chips) — does not exercise the signal-truth channels (no clear plate, no dock observer firing).

## mustFix[]

1. **[ST3, blocking] The `GlassDock` sampled-luminance observer must FIRE** — on `/dock/overview` (the flagship route), every mounted, on-screen `GlassDock` must stamp `data-backdrop-sampled` + write a real `--glass-backdrop-luma` and `--glass-ambient-hue` (both modes). Today ZERO of 12 docks fire; the witness the wave built to expose the dead-observer mask is reporting the observer dead on the entire dock band. Localize per `GlassDock.vue:86-89` + `useGlassBackdropLuminance.ts:218-221 / 369-372 / 418-426`.
2. **[ST1, non-blocking gap] No `.glass-clear` plate is exercised on any wave route** — the clear-scrim floor is source-correct + gate-green but never pixel-verified. If the wave intends the clear-scrim to be a route-visible truth, a `.glass-clear` specimen should render on a captured route; otherwise record ST1 as source-only (out of the paint judge's pixel reach).

## Notes for re-judge (after fix)

Re-run the same 3 routes × 2 modes × 2 engines. PASS requires: (a) `/dock/overview` docks stamp `data-backdrop-sampled` with real luma+ambient-hue writes in both modes; (b) ST2 stays PASS (dead `--glass-backdrop-hue` absent); (c) all 12 PNGs resolve at 2880×1800; (d) the calm/glass gestalt holds. The re-judge scripts are checked in beside this DELTA (`*-chrome-capture.mjs`, `*-probe.mjs`, `*-diag.mjs`, `*-firstdock.mjs`, `*-console.mjs`).
