# BG.W-GLASS-SIGNAL-TRUTH — dual-engine PAINT judge DELTA

**Verdict: PASS — dual-engine, both modes. The born-RED FAIL is CLEARED.**
**Re-judged:** 2026-07-05 (3rd re-judge, after the `autoLuminance` default-TRUE fix) · non-authoring paint judge (did not build; verifies painted truth against criteria).
**Tree:** `tranche/BG` @ HEAD (the `9db65db7` fix INTEGRATED: `GlassDock` `autoLuminance` defaults TRUE via `withDefaults(defineProps<DockProps>(), { autoLuminance: true })` + the `FIELD_ALPHA_FLOOR` field-alpha rejection + the `--glass-ambient-strength` engaged write). `proof:glass` signal-truth arm GREEN device-free; `demo:dist:build` exit 0; the fix present in the built bytes.
**Outcome:** the prior born-RED FAIL (`0 of 12` docks fire the ST3 writer-witness — the dead-observer≡calm-backdrop mask) is **CLOSED**. **12 of 12** docks on `/dock/overview` now fire `data-backdrop-sampled` in BOTH modes, at `data-capture-ready`, at +6s (24 loop ticks), AND after a viewport resize. The on-screen docks over the DockStage aurora write NON-DEGENERATE real luma + a warm ambient hue + the engaged 8% ambient-strength whisper. The root cause the prior DELTA bracketed but could not localize (the observer instantiated + write-path-works-globally + sample-returns-non-null, yet `write()` never ran for a dock) was the Vue boolean-prop cast: an ABSENT `boolean` prop casts to `false`, so the old `props.autoLuminance !== false` guard read `false !== false` → the observer was NEVER wired on ANY dock. `withDefaults` making the unpassed default `true` closes it.

**Pipeline (proven C18):** demo dist BUILT (`npm run demo:dist:build` → exit 0, fresh bytes) served on `:5200` (`vite preview`). Chrome leg via `playwright.connectOverCDP('http://localhost:9477')` against real `Chrome.app` 149.0.7827.201 → `?capture=<route>&mode=<m>` (`waitUntil:load` → poll `data-capture-ready`) → GL_RENDERER off a throwaway WebGL2 ctx (real ANGLE-Metal M5 Max, NOT SwiftShader — NO-MASKING-FALLBACK honored on the capture side) → `page.screenshot` @1440×900 dsf 2. Safari leg via the compiled `docs/tranches/BG/audit/.wkshot-bin` off-screen WKWebView (system WebKit.framework/Metal) polling `data-capture-ready` before snapshot. `verify-siblings-intact --quiet` exit 0 before + after.

## Provenance (engine badges decoded off the in-pixel top-left overlay)

| Route | Chrome badge | Safari badge |
|---|---|---|
| `/dock/overview` | `ENGINE CHROME · GPU ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version) · VIEW 1440×900 @2x (2880×1800px) · MODE LIGHT/DARK` | `ENGINE WEBKIT · GPU Apple GPU · VIEW 1440×900 @2x (2880×1800px) · MODE LIGHT/DARK` |
| `/substrates/glass-material` | same ANGLE-Metal M5 Max badge (control route) | same WebKit Apple GPU badge (control route) |

Badge fiducial (magenta #ff00ff) decodes on every PNG (Chrome 10,424 px / Safari 6,432 px) + high-contrast ink present. Real ANGLE-Metal M5 Max + real WebKit Apple GPU, both decoded from the rendered pixels.

## Captures (8 PNGs — all resolve on disk, all real, all 2880×1800)

`docs/tranches/BG/audit/visual/signal-truth-repaint/`

| file | dims | real |
|---|---|---|
| BG.W-GLASS-SIGNAL-TRUTH-chrome-dock-overview-light.png | 2880×1800 | ✓ |
| BG.W-GLASS-SIGNAL-TRUTH-chrome-dock-overview-dark.png | 2880×1800 | ✓ |
| BG.W-GLASS-SIGNAL-TRUTH-safari-dock-overview-light.png | 2880×1800 | ✓ |
| BG.W-GLASS-SIGNAL-TRUTH-safari-dock-overview-dark.png | 2880×1800 | ✓ |
| BG.W-GLASS-SIGNAL-TRUTH-chrome-glass-material-light.png (control) | 2880×1800 | ✓ |
| BG.W-GLASS-SIGNAL-TRUTH-chrome-glass-material-dark.png (control) | 2880×1800 | ✓ |
| BG.W-GLASS-SIGNAL-TRUTH-safari-glass-material-light.png (control) | 2880×1800 | ✓ |
| BG.W-GLASS-SIGNAL-TRUTH-safari-glass-material-dark.png (control) | 2880×1800 | ✓ |

Probe scripts checked in beside the PNGs: `chrome-cap.mjs` (capture + witness tally), `BG.W-GLASS-SIGNAL-TRUTH-repaint-probe.mjs` (per-dock witness tally both modes at ready/+6s/resize), `validate.mjs` (isRealPng + dims + badge fiducial/ink decode + body variance), `st2-st1-probe.mjs` (ST2 dead-channel + ST1 clear-scrim floor).

## Criteria scorecard (computed DOM checks + pixel reads)

| # | Criterion | Result | Evidence |
|---|---|---|---|
| ST1 | `.glass-clear` unwired plate paints the STATIC floor scrim `calc(12% + luma·28%)`, never `calc(0·40%)=0%` | **PASS (source-green); NON-BLOCKING (not pixel-exercised)** | `material.css:473-489` — `--glass-clear-scrim-strength: calc(12% + luma·28%)`, the floor an unwired plate paints; the sampled luma only LIFTS it. No `.glass-clear`/`[data-surface="clear"]` element renders on either wave route (0 present, both modes/engines), so it is source-correct but out of the paint judge's pixel reach — same non-blocking status as prior. |
| ST2 | ONE backdrop-hue channel: real-writer `--glass-ambient-hue`/`--glass-ambient-strength`; dead `--glass-backdrop-hue` GONE | **PASS** | `--glass-backdrop-hue` resolves ABSENT at `:root` and on the dock on `/dock/overview`. The only src hit is a COMMENT (`material.css:215`) noting the prior false claim. One name, one writer. |
| ST3 | **The dock observer's `data-backdrop-sampled` witness FIRES over the DockStage field; the ambient-hue catch-light reads WHERE it fires; the write is NON-DEGENERATE** | **PASS (was FAIL)** | **12 of 12** docks fire `data-backdrop-sampled` on `/dock/overview` in BOTH modes at ready/+6s/resize (was 0/12). On-screen docks write real values (see below). |
| ST4 | declarative `@container` bucket drives the band; continuous luma clamp is the dock-scoped refinement | **PASS (was PARTIAL)** | The declarative-bucket floor is present + correct (glass reads as glass over the warm aurora, both engines/modes) AND the observer refinement now ENGAGES (was dead): the on-screen docks resolve the sampled bucket + write real luma + engage the 8% ambient whisper. |

## ST3 witness tally — `/dock/overview` (both modes, three trigger paths)

| Trigger measured | `.glass-dock` count | `[data-backdrop-sampled]` fires | on-screen fired |
|---|---|---|---|
| at `data-capture-ready` (light) | 12 | **12** | 5/5 |
| +6s / 24 loop ticks (light) | 12 | **12** | 5/5 |
| after viewport resize (light) | 12 | **12** | 4/4 |
| at `data-capture-ready` (dark) | 12 | **12** | 5/5 |
| +6s / 24 loop ticks (dark) | 12 | **12** | 5/5 |
| after viewport resize (dark) | 12 | **12** | 4/4 |

### Non-degenerate writes (the on-screen docks over the DockStage aurora)

- **Light mode** (docks 0/1/2/11, tops 16/475/683/829): `--glass-backdrop-luma = 0.957`, `--glass-ambient-hue = oklch(0.72 0.06 84.6)` (warm amber), `--glass-ambient-strength = 8%`, `--glass-backdrop = light`. Real warm field luma + a real modal hue engaging the bounded 8% whisper — NOT the prior `luma≈1.0 / hue transparent` field-black degeneracy. The `FIELD_ALPHA_FLOOR` rejection of the empty field readback → fall to the static stack-walk → the real warm backdrop is read (mustFix #2 resolved for the visible docks).
- **Dark mode** (same docks): `--glass-backdrop-luma = 0.003`, `--glass-ambient-hue = oklch(0.72 0.06 67.3)` (warm), `--glass-ambient-strength = 8%`, `--glass-backdrop = dark`. luma 0.003 is the honest near-black dark backdrop (NOT the ≈1.0 field-black degeneracy — the hue is a real warm oklch, strength engaged 8%). Correct dark register.

The glass-material control route (2 observed glass surfaces) also fires 2/2 with the write path healthy — the write path works globally AND is now dock-specific-live.

## Pixel gestalt (both engines, both modes)

- `/dock/overview` (Chrome + Safari, light + dark): docks read as **translucent LIQUID glass** over the warm DockStage aurora — the collapsed pill, the media-transport dock, and the bottom nav dock all transmit the warm field through their plates (NOT gray slabs on charcoal — FD-DOCK-1 satisfied). Aurora recessive (no conic banding, no oversaturation — a soft warm painterly wash), grain calm, docks fit their tiles, the "Overview" hero title fits its envelope. In dark mode the docks tint the field a touch darker (the W-DARK-MATERIAL luminous-dark transmissive register). The observer refinement engages (the 8% ambient whisper + the sampled bucket) where the observer fires.
- `/substrates/glass-material` (control, both engines/modes): warm recessive painterly Aurora field, "Glass Material" hero fits, nav dock glass — the control observer path healthy.

## Note (non-blocking observation, recorded for completeness)

Off-screen / below-the-fold-center docks (docks 3–10, whose geometric CENTER sits beyond the 900px viewport fold) fall to a transparent-body static sample at mount (`--glass-backdrop-luma = 0`, `--glass-ambient-hue = transparent`, `--glass-ambient-strength = 0%`). This is a center-point edge in `sampleStatic`: `document.elementsFromPoint(cx, cy)` at a below-fold center returns an empty stack, so the sample falls to the transparent `document.body` background. It is **not a visible defect** (no on-screen pixel is wrong — these docks are below the fold), it **still fires the witness** (the mechanism is alive on every dock, the dead-observer mask is gone), and it **self-corrects on scroll-in** (the IntersectionObserver `resume()` re-samples over the real field once the dock enters). It is NOT the prior `luma≈1.0 / hue transparent` field-black degeneracy — it is the honest "nothing painted at the off-screen center" null. Recorded as an observation, not a blocker; a future refinement could sample at the clamped-in-viewport center or defer the mount sample until first intersection.

## Verdict roll-up

PASS: (a) 12/12 docks stamp `data-backdrop-sampled` with real luma + ambient-hue + engaged 8% strength on the on-screen docks, both modes, all three trigger paths (was 0/12 — the born-RED FAIL cleared); (b) the animated readback is non-degenerate where the observer fires (field-alpha floor → static stack-walk → real warm field luma+hue, NOT luma≈1.0/transparent); (c) ST2 PASS (dead `--glass-backdrop-hue` absent); (d) all 8 PNGs resolve at 2880×1800, real, badges decode with correct provenance; (e) the calm/glass gestalt holds (aurora recessive, no conic/oversaturation, grain calm, glass reads as glass, hero fits) — both engines, both modes. ST1 source-green (non-blocking, not route-rendered).
