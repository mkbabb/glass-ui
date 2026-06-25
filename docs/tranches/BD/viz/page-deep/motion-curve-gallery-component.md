# Pass-E COMPONENT deep audit — motion/curve-gallery

**Page:** `demo/stories/motion/curve-gallery.vue` · **Import label:** `@mkbabb/glass-ui/easing`
**Component(s) under audit (the REAL src, not the demo):**
- `src/components/custom/easing/EasingPicker.vue` (the published curve-authoring SFC)
- `src/components/custom/easing/composables/useEasingPicker.ts` (the shared editor state + the value.js math composition)
- `src/components/custom/easing/EasingConfigurator.vue` (the chassis-seated register — a thin `<ConfiguratorLayer>/<ConfiguratorRow>` seating of the picker)
- `src/components/custom/easing/constants.ts` (the SVG-geometry + rAF-clock magic-numbers)

There is NO procedural-viz substrate here (no aurora/blob/fourier/GPU). The "viz" is an authored-curve SVG canvas + a single rAF travel dot; PROCEDURAL-SUITE / GPU-only / WebGPU bars do NOT apply. The audit is squarely COMPONENT + ANIMATION + idiomatic-architecture.

---

## What the component IS (verified by reading)

`<EasingPicker>` is the ONE published curve editor (BB.W-EASING-PRIMITIVE / C-3 fold): it authors a draggable cubic-bezier OR a `steppedEase` staircase over the REAL value.js twin (`CSSCubicBezier` / `steppedEase` / `bezierPresets` / `jumpTerms` / `parseSteps`), reads back a re-parseable CSS literal, and exposes a `v-model` of the full authored-curve shape (`{ mode, css, fn, points, steps, term }`). The boundary law is clean and well-honored: **curve MATH = value.js · playback = a one-shot rAF · the editor COMPONENT = glass-ui** — the SFC + composable re-implement ZERO curve math (every callable is a value.js import through the composable). The composable is the single state source; `<EasingConfigurator>` seats the SAME `<EasingPicker>` (no second composable instance). Drag is a self-contained pointer-capture with a proper `getScreenCTM().inverse()` client→SVG mapping and touch-forgiving hit radii. The readout round-trips through value.js `parseSteps` (`data-reparse-ok`) — the painted staircase IS a re-parseable literal, gate-witnessed. This is genuinely idiomatic, no-fork, and architecturally sound at its core.

---

## (1) ANIMATION — affordance, four-state, spring physics, entrance/exit

**FINDING A1 — the playback rAF has NO `prefers-reduced-motion` guard (motion-canon P6 violation in the SHIPPED primitive).** `useEasingPicker.playTravel()` (`useEasingPicker.ts:239-249`) unconditionally runs `requestAnimationFrame`. There is NO PRM branch — contrast the demo page's own `play()` (`curve-gallery.vue:125-138`) which DOES gate on `prefersReducedMotion()` and snaps the dot to `row.fn(1)`. So the demo-local dots respect reduce, but the COMPONENT's travelling dot (`mode === "steps"` editor, the bezier "Trace the curve" button) animates under reduce regardless. motion-canon P6 ("PRM keeps the fade, drops the transform; a gesture still functions") is breached by the primitive itself — the library ships the un-guarded behavior to every consumer. The fix is to read the cached `matchMedia("(prefers-reduced-motion: reduce)")` and snap `progress.value = 1` (the deterministic-seat policy the AV.W7 substrate + `SpringProgress.respectReducedMotion` already model) instead of scheduling the rAF. → **MODIFY** the primitive under **BD.W-KF-OSCILLATOR-CONSUME** (it is the only BD wave that authorizes a `playTravel`/`progress` seam edit; the PRM-snap rider lands cleanly when the loop seam is wired — and SHOULD land even before the Oscillator trigger fires, since it is a pure a11y correction, not a kf consume). If kept separate, it is a thin standalone a11y wave (no new gate, extend `proof:easing-primitive`).

**FINDING A2 — the playback is a one-shot bezier-of-position, NOT a coupled four-state spring (dead-on-arrival affordance).** The dot travels `progress` linearly in time (`(now-start)/TRAVEL_DURATION_MS`) and samples `easingFn(progress)` for its Y — correct for VISUALIZING the curve. But the picker has NO entrance animation (the canvas + handles just appear), NO press/hover spring on the draggable handles (they are static `fill-foreground` circles with only `cursor: move`), and the "loop" register is explicitly unbuilt (`progress` resets to a one-shot). motion-canon's HIGH-animation-affordance bar (the four-state contract + entrance/exit per the canon) is only partially met: the drag works, but the handles have no press-squish, no spring-snap-back, no liquid-flex. The component reads functional but not ALIVE. → **AUGMENT** under **BD.W-KF-OSCILLATOR-CONSUME** (the looping idle-breath dot is the named-successor that makes the playback continuous + alive) + a handle-press affordance booked to the press register (`useSpringPress`/`useLiquidPress`, the W-PRESS-UNIFY family — the handles are the obvious 3rd-consumer candidate).

**FINDING A3 — the readout copy-button transition is a `transition-colors` surface leg (idiomatic, correct).** `EasingPicker.vue:328` rides `transition-colors` on the copy button hover — surface props on a bezier, per the §6 doctrine. No issue. The Check↔Copy swap is a `v-if` instant swap (acceptable for a 1.4s feedback dwell). Minor: a coupled fade on the icon swap would read smoother, but this is sub-perceptual — not load-bearing.

---

## (2) PROCEDURAL VIZ — N/A

No aurora/blob/fourier/GPU substrate. The SVG curve canvas is a static-geometry computed-path render (`bezierPathD` / `stepPathD` from `useEasingPicker`), re-derived reactively on edit — correct, cheap, no rAF except the explicit playback. PROCEDURAL-SUITE / WebGPU-first / Safari-GPU bars do not apply. (Recorded so the roster cannot mis-flag this page as a missing-viz gap.)

---

## (3) PERFORMANCE — compositor-only, offscreen-pause, layout-thrash

**Compositor-only:** PASS. The demo dots animate `transform: translateX` (`curve-gallery.vue:143`, `will-change: transform`); the component's travel dot moves SVG `cx`/`cy` via reactive `progress` — an SVG attribute re-render, not a layout-property animation, cheap at this element count. No `width`/`height`/`top`/`left` animation. `proof:no-layout-animation` is not threatened.

**FINDING P1 — `stepPathD` re-samples 240 points on EVERY steps edit (constants `STEP_PLOT_SAMPLES = 240`), and `viewBox` walks `VIEWBOX_FIT_SAMPLES + 1` (17) easingFn calls per bezier edit.** This is a reactive `computed` that recomputes on every handle drag-move (`onMove` → `setHandle` → `points` write). 240 `steppedEase` evaluations per frame during a steps-slider drag, 17 `CSSCubicBezier` solves per frame during a bezier drag. Not a CLS/thrash risk (no layout), but it is a per-frame recompute the drag fires at pointer-rate. Acceptable at current density, but worth a note: the staircase is a step function — it could be drawn as N explicit riser/tread segments (`steps` count, ≤12) instead of 240 sampled points, eliminating the dense sample loop. → **MODIFY** (minor, opportunistic) — fold into any future easing touch; not urgent. No BD wave owns it today; book as an opportunistic rider on the A1 PRM fix.

**Offscreen-pause:** N/A by construction — the playback rAF is one-shot + self-terminating (`rafId = 0` at `t >= 1`), and `onUnmounted(stopTravel)` cleans up. There is no free-running loop to park. No offscreen-pause seam needed (correct — the substrate-park discipline applies to continuous loops, not one-shots). NOTE: if A2's looping Oscillator register lands, it MUST acquire offscreen-pause (it becomes a continuous loop) — flag for BD.W-KF-OSCILLATOR-CONSUME.

---

## (4) SAFARI compatibility — PASS, with one note

- `getScreenCTM()` / `.inverse()` / matrix transform: fully Safari-supported, the correct client→SVG mapping (not a hand-rolled bbox guess). PASS.
- `navigator.clipboard.writeText` is try/wrapped with an explicit befitting swallow (`EasingPicker.vue:177-189`) — graceful on insecure-context/permission-denied (Safari is stricter here). PASS.
- `aspect-ratio` + `clamp()` + `cqi` units on the SVG (`block-size: clamp(200px, 38cqi, 320px)`): `cqi` (container query units) require the ancestor to establish containment. The `.glass-card` wrapper does not declare `container-type` — so `38cqi` resolves against the nearest query container (or the viewport fallback). Safari 16+ supports `cqi`; the clamp floor/ceiling keep it bounded if no container is found. Low risk, but verify the canvas sizes correctly inside the demo's bigger-card request. → minor note for the demo-card resize (the user's "main card area BIGGER" ask).
- `backdrop-filter: var(--glass-blur-floating)` on `.curve-chip--active` (demo-local, `curve-gallery.vue:468`) needs the `-webkit-` companion — but that is DEMO CSS, not the component. Out of component scope; flag to the page-redesign wave.

---

## (5) IDIOMATIC / no-legacy — workarounds, dead-code, dual-path

**Largely CLEAN.** The boundary-law no-fork discipline is exemplary; colocation (composable/constants/README) is correct; the `--easing-curve-accent: var(--motion-accent, var(--viz-legendre))` fold is the right self-sufficient-standalone + ppmycota-fence pattern (no demo hue in a library token, gate-witnessed by `proof:easing-primitive` W2). Two small items:

**FINDING I1 — duplicate `import { ref }` (dead-ish style nit).** `EasingPicker.vue` imports `ref` on line 47 in a SECOND import statement after the line-23 `vue` import block that already pulls `computed, onUnmounted, useTemplateRef, watch`. `ref` should join the line-23 block — the trailing `import { ref } from "vue"` is a leftover from the editor re-home. Cosmetic, but it is the kind of split-import the no-legacy/idiomatic bar flags. → **MODIFY** (trivial) — fold into the A1 touch.

**FINDING I2 — the SIX-LAYER glass composite is NOT present on the curve canvas (DESIGN.md north-star gap).** The canvas wrapper is `glass-card` (`EasingPicker.vue:218`) — which gives backdrop-blur + surface tint + rim + shadow, but the canvas SVG paints OPAQUE strokes ON it with no inner catch-light, no specular, no grain, and the plot frame reads as a flat technical grid, not a liquid-glass instrument face. Per the user's binding ask ("glass demos over COLORFUL aurora backgrounds" + the DESIGN.md six-layer composite), the curve canvas is the demo's hero surface and currently reads as a plain card, not as liquid glass over a live field. This is partly a DEMO concern (the page should stage the picker over an aurora, per the user's ask) but partly a COMPONENT one: the `glass-card` tier is the calm content default (no deep-glass, no lens, no specular auto-arm). → **AUGMENT** — the component could opt into `<ShowcaseFrame tier="field">`-style transparency at the demo, and the demo should stage it over `<DockStage>`/aurora; the component itself could expose a `surface`/`tier` prop (it currently hardcodes `glass-card`). Book to the page-redesign / W-TOKEN-TOUR-GLASS-adjacent demo wave (the demo "glassy card per sub-section + bigger main card + aurora backdrop" asks are DEMO-side, NOT component-side — but the component hardcoding `glass-card` with no `surface` prop is the structural blocker that should be lifted).

**FINDING I3 — `EasingConfigurator` hardcodes a single `ConfiguratorRow` (thin, but inflexible).** It seats exactly one "Curve" row; a consumer wanting the picker beside other configurator rows must compose `<ConfiguratorLayer>` themselves and drop a bare `<EasingPicker>`. This is fine for the documented GradientPane shape but is not the general chassis-seated register the README implies. Low priority — not a defect, a scope choice. No action unless the value.js GradientPane consume surfaces a richer need.

---

## (6) Glass six-layer composite — PARTIAL (see I2)

`glass-card` supplies backdrop-blur + tint + rim + drop-shadow (4 of 6); the inner catch-light + grain are absent on the canvas, and there is no specular pointer-follow (the tier-root auto-arm is a `vSpecular` opt-in the picker does not bind). The picker reads as a calm content card, NOT as the iOS-27 liquid-glass instrument the north-star wants. The biggest gestalt lift is DEMO-side (stage over aurora) + the component lifting the hardcoded `glass-card` to a `surface`/`tier`-prop so the demo can request `field`/`deep`.

---

## FOLD/MODIFY/AUGMENT/PRUNE → BD wave map

| # | Finding | Disposition | BD wave |
|---|---------|-------------|---------|
| A1 | playTravel has no PRM guard (P6 breach in shipped primitive) | **MODIFY** | **BD.W-KF-OSCILLATOR-CONSUME** (the only authorized `playTravel`/`progress` seam edit) — land the PRM-snap rider even pre-trigger as a pure a11y fix; extend `proof:easing-primitive` |
| A2 | one-shot, no looping/idle-breath, no handle-press spring (low animation affordance) | **AUGMENT** | **BD.W-KF-OSCILLATOR-CONSUME** (the Oscillator loop register is the named successor) + book handle-press to the W-PRESS-UNIFY family (3rd consumer) |
| P1 | 240-sample stepPathD + 17-sample viewBox recompute per drag frame | **MODIFY** (opportunistic) | rider on A1; or book as a thin easing-perf touch (draw the staircase as ≤12 explicit segments) |
| P1b | looping register (A2) MUST acquire offscreen-pause when it lands | **AUGMENT** (constraint) | **BD.W-KF-OSCILLATOR-CONSUME** §fence |
| I1 | duplicate split `import { ref }` | **MODIFY** (trivial) | fold into A1 touch |
| I2/§6 | six-layer composite partial; `glass-card` hardcoded, no `surface`/`tier` prop, not over aurora | **AUGMENT** | demo page-redesign wave (aurora-staging is DEMO-side) + lift the component's hardcoded `glass-card` to a `surface`/`tier` prop (the structural blocker) — adjacent to BD.W-TOKEN-TOUR-GLASS |
| I3 | EasingConfigurator one-row inflexibility | **no action** (scope choice, not a defect) | — |

**No PRUNE.** No dead-path, no dual-path, no legacy alias, no workaround in the component — the boundary-law architecture is clean. The findings are an a11y gap (A1, the one real defect), an animation-affordance shortfall (A2, named-successor-gated), and a north-star glass-composite shortfall (I2, mostly demo-side).
