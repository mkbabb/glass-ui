# kf-vjs-facilities — the keyframes.js + value.js facility map (BC bands 4 + 7)

> Research agent, BC iteration 1. Assignment: MACHINE inventory of the keyframes.js + value.js facility map for the ONE-source / ONE-clock motion model. Every finding grounded in a file:line, a `.d.ts` signature, or a measured fact.

## 0 — Versions + lineage (the load-bearing fact)

| repo | installed (glass-ui node_modules) | local sibling repo | local git HEAD |
|---|---|---|---|
| `@mkbabb/keyframes.js` | **4.3.0** (`node_modules/@mkbabb/keyframes.js/package.json:version`) | `/Users/mkbabb/Programming/keyframes.js` (EXISTS) | `b271fa1` — `feat(N impl WIP): the Stage switcher baked into the demo` |
| `@mkbabb/value.js` | **0.13.0** (`node_modules/@mkbabb/value.js/package.json:version`) | `/Users/mkbabb/Programming/value.js` (EXISTS) | `9fce504` — `feat(N): 0.13.0 — the kf-K-dispatched grammar fold` |

**The lineage split (the binding constraint on what BC can leverage NOW vs after a republish):**

- **value.js**: the installed dist == the local repo HEAD == 0.13.0. The local CHANGELOG `## [0.13.0] — 2026-06-16 (N · the kf-K-dispatched grammar fold)` is the published surface. So **everything value.js 0.13.0 offers is consumable today** — and glass-ui's peer spine already admits it (`package.json`: `"@mkbabb/value.js": "^0.13.0 || ^1.0.0"`).
- **keyframes.js**: the installed dist is **4.3.0 (tranche K)**. The local repo `package.json` still reads `4.3.0` but the git log is **ahead to tranches L / M / N** (`git log --oneline`: `feat(tranche-L W5): Draggable bounds/snap/rubber-band + drag2D, Sequence segment/label events`, `feat(tranche-L W9): the constellation cross-repo dispatch — Band B armed, the Oscillator shipped`, then M/N WIP). **The L/M/N additions are NOT in the published 4.3.0 dist glass-ui consumes** — VERIFIED below. So Oscillator + drag-snap/bounds/rubberBand + Sequence on-events are LOCAL-ONLY and require a kf re-publish to leverage.

### Verified-absent from the published 4.3.0 dist (the BLOCKED set)
```
grep -c 'Oscillator' node_modules/@mkbabb/keyframes.js/dist/keyframes.d.ts   → 0 (ABSENT)
grep -c 'rubberBand|drag2D|DragBounds' …/keyframes.d.ts                       → 0 (ABSENT)
DragOptions interface in published dist → carries axis/transform/spring/springOptions/velocityWindow ONLY
                                          (NO bounds, NO snap, NO rubberBand)
```
This confirms CLAUDE.md's standing note verbatim: *"the kf SOURCE Draggable carries a `snap` option, but the PUBLISHED dist `DragOptions` at HEAD does not yet expose it."*

---

## 1 — keyframes.js facility map (the published 4.3.0 surface)

The entry barrel exports (`dist/keyframes.js`, the named re-export line):
```
AnimationOptionError, Draggable, ElementMorph, ManualTimeline, NumericAnimation,
RAFPlayback, ScrollTimeline, Sequence, SmoothProgress, SpringProgress, Timeline,
UnknownEasingError, createNativeTimeline, decay, decayRest, drag, flip, flipShared,
loadAnimationEngine, probeVelocity, reducedMotionScale, reseatToSpring, resolveEasing,
springLinearStops, springTimingFunction, stagger, toEasing
```
(The HEAVY tier — `animate`, `CSSKeyframesAnimation`, `AnimationGroup`, `Sequence`-compile, `compileToCSS`, the `presets` taxonomy — is behind `loadAnimationEngine()`, the dynamic boundary.)

### 1.1 — SpringProgress (the physics core — THE one-clock primitive)
`dist/keyframes.d.ts:3302`. The closed-form damped-harmonic-oscillator solver, SwiftUI-`(response, dampingFraction)`-shaped (`x'' + 2ζω₀x' + ω₀²x = ω₀²target`, ω₀=2π/response). Surface:
- **`tickDt(dt: number): number`** — THE canonical step, advance by `dt` MILLISECONDS. This is the push-API the shared `RAFPlayback.drive` loop steps. **The one-loop discipline lives here**: a consumer that already owns a rAF (a canvas renderer) calls `tickDt(dt)` per frame; it owns NO own loop.
- **`set target(value)`** — re-seats the closed-form solution from the current `(value, velocity)`, so a mid-flight target change is **trajectory-continuous** (no jump). This is the iOS interruptible re-press contract.
- **`play(onFrame?)` / `stop()`** — the managed rAF loop (idempotent; auto-stops on settle; auto-resumes on `target` set while a callback is bound).
- **`respectReducedMotion: ReducedMotionPolicy`** (`SpringProgressOptions`) — `false`(default)/`true`(binary snap)/`number∈[0,1]`(amplitude-INTENSITY scale: keeps curve+settle SHAPE, scales displacement-from-rest; the analytic form makes this exact + free). The WCAG-2.3.3-aligned gate.
- **`SpringProgress.fromDuration({visualDuration|duration, bounce})`** — the modern Motion-docs time-surface; `response=visualDuration`, `dampingFraction=1−bounce`. Trajectory-identical to the `(response,ζ)` path.
- Options (`SpringProgressOptions`): `response`(0.5), `dampingFraction`(0.86 = iOS smooth), `initial`, `initialVelocity`, `settleThreshold`(1e-3), `velocitySettleThreshold`(1e-3), `respectReducedMotion`.

**glass-ui consumers TODAY** (all on SpringProgress): `useSpring.ts`, `dockMorphContext.ts`, `useLayerTransition.ts`, `useDockOrientationMorph.ts`, `useDrawerSnap.ts`, `useBlobPointer.ts`, `useDragMorph.ts` (via Draggable). This is the one-clock spine already in place.

### 1.2 — Draggable / drag (pointer-capture fling over a spring)
`dist/keyframes.d.ts:1459`/`1437`. One-axis pointer-capture follow + release-velocity fling over a `SpringProgress`. `attach(el)`→binds pointerdown; up re-seats the spring from `(value, releaseVelocity)`. `.spring` is reachable for `.play()`/`.subscribe()`. **Published `DragOptions`**: `axis`, `transform`, `spring`, `springOptions`, `velocityWindow`(100ms). **No bounds/snap/rubberBand** (those are LOCAL-only, §3).
- `DragSubscriber = (value, velocity) => void`.
- LIGHT (value.js-free).

### 1.3 — ElementMorph (FLIP rect-to-rect morph)
`dist/keyframes.d.ts:1646`. `new ElementMorph(from, to, {timingFunction, duration, transformOrigin})`; `.at(p)`/`.toCSSTransform(p)`/`.apply(el,p)`/`.play(el,dur)`. Composes `NumericAnimation` (value.js-free). `timingFunction` accepts a typed `Easing` — feed it `springTimingFunction(preset)` for the canonical iOS spring overshoot FLIP. **glass-ui consumers**: `useLiquidReveal.ts` (the bloom-from-source), `useDockCtaReceive.ts` (the CTA→dock receive) — both via `suite.ts`.

### 1.4 — springTimingFunction (spring → typed Easing — the SOURCE/twin bridge)
`dist/keyframes.d.ts:3514`. `springTimingFunction({response, dampingFraction, [samples=64]}): Easing` → `{ fn: (t)=>number, css: linear()-string }`. Samples a `SpringProgress(target=1,initial=0)` solver. `.fn` is the callable curve `ElementMorph`/`NumericAnimation`/`Animation.addFrame` accept directly; `.css` is the WAAPI-compositor `linear()` string — ONE curve, two forms. The bouncy `response 0.5/ζ 0.45` preset peaks at ≈1.205 mid-curve (the overshoot). **glass-ui consumes it as the JS twin of every `--spring-*` token** (`curves.ts:80` `MOTION_CURVES` spring rows; the speedtest reads `MOTION_CURVES["--spring-snappy"].js`).

### 1.5 — Sequence (the GSAP-class TEMPORAL orchestrator — the band-4 choreography substrate)
`dist/keyframes.d.ts:2822`. A master-playhead timeline beside `AnimationGroup`'s spatial blend. Surface (all GSAP idioms):
- `add(animation, at?)` — `at` is absolute ms / a label / `"+="`/`"-="` relative / omitted (auto-append at the cursor).
- `label(name, at?)` — named positions on the master clock.
- `seek(masterClock)` / `progress` getter+setter — synchronous scrub. **`_applyAt` is the ONE map both `seek` AND the rAF `_frame` drive — so PLAY is pixel-identical to SEEK by construction, forward AND reverse.**
- `rate` (timeScale; negative = reverse), `_repeatCount` (1 / Infinity / n), `_yoyoOn` (ping-pong). `pause()` retains the playhead. `playback: RAFPlayback` is the rAF owner.
- **This is start/transition/end/restart choreography** — band 4's `BC.W-VIZ-CHOREOGRAPHY` exact need. A viz intro→loop→outro is a `Sequence` with labels; a restart is `seek(0)` + `play()`.

### 1.6 — RAFPlayback (THE shared rAF driver — the one-loop enforcement)
`dist/keyframes.d.ts:2398`. Owns the ONLY rAF handle in the engine. Generation-guarded (`_gen`) so a stop+restart mid-async-frame cannot double-arm. Three thin entry shapes over one core:
- **`drive(tickable: Tickable, onFrame?)`** — steps a `Tickable`'s dt-stepper once per frame until `settled`, idempotent (consumers re-arm freely per re-seat). **This is THE one-loop primitive**: any `SpringProgress`/`SmoothProgress`/`Oscillator` (all `Tickable`) is driven through ONE driver.
- `play(duration, onTick, {respectReducedMotion})` — the shared PRM gate for the light managed-playback surface (NumericAnimation + ElementMorph route through here).
- `loop(cb)` — self-rescheduling async frame loop.

### 1.7 — SmoothProgress (exponential-smoothing tracker)
`dist/keyframes.d.ts:3110`. Sibling of SpringProgress for no-overshoot smoothing. `setTarget`, `tickDt(dt)`, `play(onFrame)`, `snap`/`reset`, `respectReducedMotion`. **glass-ui consumes it in `useAnimatedNumber.ts`** (the editorial number tween).

### 1.8 — decay / decayRest / reseatToSpring / probeVelocity / reducedMotionScale (LIGHT physics)
- `decay({…}): (t)=>DecaySample` + `decayRest({…}): number` — closed-form frictional glide `x(t)=x0+(v0/k)(1−e^(−kt))` + its projected resting point (`dist:1324`/`1366`). **`useDragMorph.ts:54` consumes `decayRest`** to project the fling's rest for snap-target selection.
- `reseatToSpring(probe, newTarget, opts): SpringProgress` (`dist:2550`) — velocity-continuous interruption: seeds a fresh spring at `(probe.curr.value, measured velocity)`.
- `probeVelocity(probe): number` (`dist:2351`) — forward-difference units/SECOND velocity from a two-sample probe.
- `reducedMotionScale(respect): number` (`dist:2516`) — the WCAG-2.3.3 intensity scalar.

### 1.9 — AnimationGroup + presetTaxonomy (HEAVY tier, behind loadAnimationEngine)
- `AnimationGroup.transitionLayer(name, target, …)` / `crossfade` — spring-driven layer blend weights (`dist:933`). The spatial blender (vs Sequence's temporal). Relevant to band-2 dock layer crossfade if a richer blend is wanted.
- `presetTaxonomy` (`dist:2301`): `enter` (fadeIn/slideIn/springScaleIn/…), `exit` (fadeOut/warpLeft/…), `attention` (pulse/shake/bounce/springPop/springWobble), `loop` (heartbeat/glow/spinner/gradientBackground/typingCursor/…). Ready-made CSS-keyframe entrances/loops if a wave wants them instead of hand-authored `@keyframes`.

---

## 2 — value.js facility map (the published 0.13.0 surface)

### 2.1 — sampleColorRamp (NEW in 0.13.0 — the brand-ramp baker; the band-4 headline)
`dist/units/color/mix.d.ts:54`:
```ts
sampleColorRamp(from: Color, to: Color, n: number, opts?: SampleRampOptions): Color[]
SampleRampOptions = {
  space?: ColorSpace,            // default "oklab"; "oklch" for cylindrical hue
  hueMethod?: HueInterpolationMethod, // default "shorter" — the thing 2-stop @keyframes can't encode
  endpoints?: "inclusive"|"exclusive", // default inclusive
  gamutMap?: boolean             // default true — gamutMapOKLab per stop, no silent clip
}
```
INVERSE of `mixColorsN` (N→1): expands 2 colors → N evenly-spaced perceptual stops. ZERO new color science — composes `mixColors` (premultiplied alpha + NaN-propagation + hue path inherited) + `gamutMapOKLab`. The `space` conversion is hoisted (pays 2×, not 2n×). `n≥2` throws otherwise. **This is the named helper the CLAUDE.md `// CONSUME(value.js 0.13.0 oklchSpectrum)` marker in `useBorderSpectrum.ts` was booked against.** It now exists and glass-ui's peer spine already admits 0.13.0.

### 2.2 — interpolateHue + the OKLCH color kernels (the spectrum math)
`dist/units/color/dispatch.d.ts`:
- `interpolateHue(h1, h2, t, method?): number`, `HueInterpolationMethod = "shorter"|"longer"|"increasing"|"decreasing"` (`:22`/`:43`).
- `mixColors(col1, col2, p1, p2, space?, hueMethod?): Color` (`:49`).
- The full kernels (re-exported `dist/index.d.ts`): `srgbToOKLab`, `oklabToLinearSRGB`, `oklabToRgb255`, `rawOklabToOklch`/`rawOklchToOklab`, `gamutMap`/`gamutMapOKLab`/`gamutMapSRGB`, `findCusp`, `findGamutIntersection`, `computeMaxSaturation`, `isInSRGBGamut`, `deltaEOK`, `parseCSSColor`, `mixColorsN`, `dominantColor`, `safeAccentColor`/`computeSafeAccent`/`needsContrastAdjustment`.
- **glass-ui's `/color` leaf already imports** `interpolateHue, isInSRGBGamut, oklabToLinearSRGB, oklabToRgb255, parseCSSColor, rawOklabToOklch, rawOklchToOklab, srgbToOKLab` (`src/composables/color/index.ts:20-30`). `useBorderSpectrum.ts:18` imports `interpolateHue` and hand-rolls `spectrumAt`/`spectrumStops` — the exact re-roll `sampleColorRamp` collapses.

### 2.3 — The easing / bezier catalogue (the curve-editor + motion-canon math)
`dist/easing.d.ts`:
- `CSSCubicBezier(x1,y1,x2,y2): (x)=>number` (`:39`) + `solveCubicBezierX` (`:38`) — the Newton-solver bezier evaluator (the EasingPicker's `mode="bezier"` math).
- `steppedEase(steps, jumpTerm?): (t)=>number` (`:56`) + `jumpTerms = ["jump-start","jump-end","jump-none","jump-both","start","end","both"]` (`:55`) — the staircase (`mode="steps"`).
- `bezierPresets` (`:73`) — **23 named CSS-canonical bezier 4-tuples** (linear, ease, ease-in/out, the sine/quad/cubic/expo/circ/back families incl. `ease-out-back: [0.175, 0.885, 0.32, 1.275]` and `ease-out-expo: [0.19, 1, 0.22, 1]`). The bold-decelerating arrival curves band 7 needs are HERE (no re-mint).
- `timingFunctions` (`:105`) — the name→callable catalogue (both camelCase + kebab); `timingFunctionDescriptions` — tooltip copy.
- `cssLinear`, `interpBezier`, `cubicBezier`, `cubicBezierToSVG`/`cubicBezierToString`, `deCasteljau`, `lerp`/`lerpArray`/`logerp`/`clamp`/`scale`.
- **glass-ui's `useEasingPicker.ts:23` already imports the value.js easing primitives** (`CSSCubicBezier`, `steppedEase`, `bezierPresets`, `jumpTerms`) per the W-EASING-PRIMITIVE boundary law (curve MATH = value.js, playback = keyframes.js, editor = glass-ui).

### 2.4 — The scroll-timeline VALUE grammar (NEW in 0.13.0, relevant to band 7 scroll-choreography)
`dist/parsing/scroll-timeline.d.ts`: `parseAnimationTimeline`/`parseAnimationRange`/`parseTimelineScope` + `serialize*` (round-trip `serialize(parse(s))===s`) + the typed `CSSTimelineOptions`/`AnimationTimelineValue`/`AnimationRangeValue` families. value.js owns the VALUES, kf's `ScrollScene` owns TIME. Relevant if BC's scroll-choreography register (the `.scroll-build`/`.scroll-cascade` recipes) ever needs a JS scroll-timeline parser/driver fallback on a gap engine.

---

## 3 — The LOCAL-only keyframes.js facilities (the BLOCKED-on-republish leverage)

These exist in `/Users/mkbabb/Programming/keyframes.js/src/` (tranche L/M/N) but are ABSENT from the published 4.3.0 dist:

### 3.1 — Oscillator (`src/animation/oscillator.ts`) — THE looping-phase clock (band-4 critical)
A LIGHT (value.js-free) periodic phase clock: a frequency-driven phase ramp ∈[0,1) + a pure waveform shaper. `OscillatorConfig = {frequency, waveform?: "sine"|"triangle"|"square"|"sawtooth"}`.
- **`tick(dt): number`** — advances phase by `frequency × dt`, wraps to [0,1). NO rAF ownership — the caller drives the loop (mirrors SpringProgress/SmoothProgress). `dt` in the caller's units (seconds for rAF, normalized delta for scroll).
- `get value()` — waveform of the current phase ∈[−1,1]. `sample(t)` — stateless `t→waveform(t×frequency)`. `reset(phase=0)`.
- `waveformValue(phase, waveform)` — exported value.js-free leaf (apply to your own phase).
- **The doc names its consume-signal**: *"glass-ui BB's W-EASING-PRIMITIVE wave — its speedtest idle-breath and the demo's KF-OSCILLATOR scene read the phase to drive a looping motion. glass-ui co-schedules; kf owns the phase math."* This is the band-4 idle-breath / viz-loop / EasingPicker `loop` playback clock. CLAUDE.md's W-EASING-PRIMITIVE already books it: *"the keyframes.js LIGHT Oscillator slots into the `loop` playback seam when it ships (a named-successor consume, NOT a blocking dep)."*

### 3.2 — Draggable bounds/snap/rubberBand (`src/animation/drag.ts`) — iOS overscroll + native snap
The LOCAL `DragOptions` adds three fields the published dist lacks:
- `bounds?: {min, max}` — hard value-domain clamp (BEFORE rubber-band).
- `rubberBand?: number` (default 0.4 = the Motion/iOS overscroll feel; `0`=hard clamp, `1`=pass-through) — `boundary + (excess × rubberBand)`.
- `snap?: number[]` — on release, `decayRest`-projected rest selects the nearest target; the spring re-seats toward it. Bounds apply AFTER snap.
- `drag2D(el, {x, y})` (`src/animation/drag-2d.ts`) — two 1-axis Draggables behind `(x,y,vx,vy)`; bounds/rubberBand/snap pass through PER AXIS.

**The leverage**: `useDragMorph.ts` currently RE-IMPLEMENTS exactly this (`decayRest` projection + nearest-snap resolution + `spring.target` re-target) because the published dist lacks `snap` (file comment lines 21-28: *"glass-ui does NOT re-fork the engine — it wires the published surface ... When the kf `snap` option ships on dist, this collapses onto it"*). A kf republish unlocks a consume-and-delete of ~40 lines of glass-ui-local snap math + adds rubberBand overscroll feel to the liquid-tab drag for free.

### 3.3 — Sequence segment/label events (`src/animation/sequence.ts` + `sequence-events.ts`, L.W5)
`seq.on("segment"|"label", cb)` — a crossing detector (segment-lifecycle + label straddle) via `SequenceEventBus`. Lets a viz choreography fire callbacks at named beats (e.g. "viz-armed", "intro-complete") without a manual playhead poll. ABSENT from published dist.

---

## 4 — The current glass-ui consume baseline (the leverage delta)

| glass-ui module | imports from kf/vjs | what it does | BC leverage |
|---|---|---|---|
| `useDragMorph.ts:54` | `Draggable, SpringProgress, decayRest` | drag-to-morph-squish; RE-IMPLEMENTS snap via decayRest+spring.target | republish → consume kf `snap`/`rubberBand`, delete the re-roll |
| `useBorderSpectrum.ts:18` | `interpolateHue` (+ leaf `cssToOklch`/`oklchStopToHex`) | hand-rolled `spectrumAt`/`spectrumStops` N-stop ramp | re-point onto `sampleColorRamp` NOW (peer spine admits 0.13.0) |
| `curves.ts:27,80` | `springTimingFunction` (+ vjs easing) | `MOTION_CURVES` — every `--spring-*` token's JS twin from SPRING_PRESETS | the canonical bridge; band-7 reads this for the JS-side curve |
| `useEasingPicker.ts:23` | `CSSCubicBezier, steppedEase, bezierPresets, jumpTerms` | the curve editor's bezier/steps math | boundary-law correct; Oscillator slots the `loop` seam on republish |
| `useSpring.ts`, dock `dockMorphContext/useLayerTransition/useDockOrientationMorph`, `useDrawerSnap`, `useBlobPointer` | `SpringProgress` | every spring morph/press/drawer/pointer | the one-clock spine ALREADY in place |
| `useLiquidReveal.ts`, `useDockCtaReceive.ts` (via `suite.ts`) | `ElementMorph, springTimingFunction` | FLIP bloom-from-source + CTA→dock receive | band-7 reveal choreography |
| `useAnimatedNumber.ts` | `SmoothProgress` | editorial number tween | — |
| `usePointerVelocityField.ts` | **NONE (vue-only, hand-rolled lerp)** | viz pointer position→velocity→acceleration push-API | band-4 D-VIZ-INTERACTION; intentionally kf-free (root-barrel SCC discipline) — KEEP as-is |

### The spring registry (the source-of-truth both halves derive from)
`src/composables/motion/springPresets.ts` — `SPRING_PRESETS` is the single authority feeding BOTH `regen-spring-tokens.mjs` (→ CSS `linear()` via `springLinearStops`) AND `MOTION_CURVES` (→ JS `Easing` via `springTimingFunction`):
```
smooth: response 0.5, ζ 0.86  (SETTLE — no overshoot)
snappy: response 0.35, ζ 0.65 (CONTROL — tab/progress/marker, +6.8% overshoot)
bouncy: response 0.5, ζ 0.45  (PLAYFUL — dialog/success, +20.5% overshoot)
gentle: response 0.7, ζ 1.0   (GENTLE — critically-damped settle)
dock:   response 0.32, ζ 0.7  (DOCK — expand/collapse morph, +4.6% overshoot)
```
The matching per-spring settle clocks (`--spring-<name>-duration`, generated from `t_s = −ln(0.02)/(ζ·ωₙ)`): smooth 0.36s / snappy 0.34s / bouncy 0.69s / gentle 0.44s / dock 0.28s.

---

## 5 — The band-4 (viz choreography) one-source/one-clock recommendation

**The current band-4 state**: the 5 viz (aurora/blob/constellation/dot-flow/concentric) each own a rAF via `createCanvasLifecycle` (`src/composables/glass/webgl/createCanvasLifecycle.ts:87` — the ONE lifecycle leaf all three backends compose) and drive their loop animation off a shader `uTime` uniform sampled from `performance.now()`. NO viz feeds a kf phase clock today (the `phase` matches in goo-blob are shader-local SDF phases, not the kf Oscillator).

**The leverage** (`BC.W-VIZ-CHOREOGRAPHY`): the viz already own the frame loop (the one-loop discipline is correct — do NOT add a kf rAF). The ONE-source/ONE-clock move is to feed the viz `uTime`/intro/outro from kf primitives stepped via the renderer's existing `tick`:
- **Idle/loop motion** → the **Oscillator** (`tick(dtSeconds)` per renderer frame; read `.phase`/`.value` to drive shader uniforms). A breathing aurora, a pulsing blob, a sweeping dot-wave all read ONE phase clock — replacing the raw `performance.now()` modulo each viz hand-rolls. **BLOCKED on kf republish.**
- **Start/transition/end/restart choreography** → a **Sequence** with labels (`intro` → `loop` → `outro`); `seek(0)` restarts; the renderer steps it via its frame `tick`. **BLOCKED on Sequence on-events; the base Sequence is published in 4.3.0.**
- **Pointer interaction** (`BC.W-VIZ-INTERACTION`) → `usePointerVelocityField` (already the push-API `tick(delta)` shape, position→velocity→acceleration) is the correct substrate; it intentionally stays kf-free for the root-barrel SCC trap. KEEP. The viz feed it from their frame loop.
- **Brand-spectrum colors** (the dot-wave / concentric / border-progress palettes) → `sampleColorRamp` (NOW — peer spine admits 0.13.0). The N-stop perceptual ramp with `hueMethod:"shorter"` is the no-trough warm→cool walk every viz palette + BorderProgress + the section-color ramp wants.

---

## 6 — The band-7 (motion canon) one-clock recommendation

**The current band-7 state**: the canon is codified (`docs/precepts/motion-canon.md` P1-P6; the §6 easing table; `MOTION_CURVES`). The spring spine is in place (SPRING_PRESETS → CSS tokens + JS twin, drift-proof). `useSpringPress`/`useLiquidPress`/`useLiquidFlex` are the press/squish primitives.

**The leverage** (`BC.W-MOTION-ONE-CLOCK`, `BC.W-SPRING-EASE`):
- **The ONE clock is already keyframes.js** — every `--spring-*` is a `SpringProgress` curve; every JS twin is `springTimingFunction`. The work is COMPLETENESS: ensure NO surface drives a spring against a generic `--duration-*` wall clock (the W-GLASS-CAL per-spring-duration fence) and NO surface hand-rolls a spring/rAF outside the kf spine.
- **The abrupt curves eased** — the bold-decelerating arrival is `bezierPresets["ease-out-expo"] = [0.19, 1, 0.22, 1]` (value.js, already aliased to glass-ui's `--ease-out-expo`); the canon NAMES it, never re-mints (a duplicate alias reds `proof:animation-coherence`). For squishy/quick/coupled-fade: the snappy preset (response 0.35/ζ 0.65) is the CONTROL register; its perceptual arrival reads quick (~100-120ms to ~1.0) even though the 2%-band settle runs 340ms — do NOT truncate the clock (re-introduces the tail-jank; the spring fence is binding).
- **The coupled fade** (W-MOTION-CANON P3) — `useLiquidPress`'s `--*-press-t` 0..1 drive scalar is ONE spring drive feeding BOTH the transform AND the brightness/specular leg on the spring's own settle clock. The pattern generalizes: any reveal couples opacity to the transform via a single spring-driven scalar.
- **The interruptible re-press** — `SpringProgress.set target` velocity-continuous re-seat (or `reseatToSpring`) is the iOS contract; `useSpringPress` already binds it. Every interactive surface re-press should inherit the live `(position, velocity)`, never a CSS-transition restart.
- **PRM** — `respectReducedMotion` (binary or intensity-scaled) is the ONE gate; the CSS `:active` carve is the no-JS floor. Both already wired.
- **EasingPicker `loop` seam** — the Oscillator slots in on republish (the booked named-successor consume).

---

## 7 — The cross-repo coordination (the republish gate)

The band-4/7 BLOCKED leverage (Oscillator, drag snap/bounds/rubberBand, Sequence on-events) all require a **keyframes.js republish past 4.3.0** carrying the tranche-L/M/N additions. This is a by-name cross-repo ask per the foreign-tree fence (glass-ui edits ZERO sibling tree; CLAUDE.md's W-CROSSREPO-ASKS relay is the channel). Until then:
- value.js `sampleColorRamp` is consumable NOW (no republish, no peer-spine widen — `^0.13.0` is already admitted).
- the kf primitives glass-ui consumes today (SpringProgress, Draggable, ElementMorph, springTimingFunction, Sequence-base, RAFPlayback, SmoothProgress, decay/decayRest, NumericAnimation) are all in the published 4.3.0 dist — the one-clock spine is fully operable.
- glass-ui's `useDragMorph` snap re-roll is the documented interim that consume-and-deletes on the kf `snap` republish.

The kf demo (the "animation-suffusal demo" the user referenced) is the multi-scene SPA at `/Users/mkbabb/Programming/keyframes.js/demo/app` (sequence/easing/motion-path/cube/amiga scenes + the tranche-N Stage scene-switcher: DK64-barrel carousel + liquid-glass downlight + grid-paper), each scene dogfooding a motion primitive — the reference for what the viz choreography + the storybook meta-design (band 9) should feel like.