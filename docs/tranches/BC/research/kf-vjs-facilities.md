# kf-vjs-facilities — the keyframes.js + value.js facility map (BC bands 4 + 7)

> BC iteration 1 research (DEEPENED + machine-re-verified). Assignment: the keyframes.js + value.js facility inventory for the ONE-source / ONE-clock motion model. Every finding grounded in a `.d.ts` signature, a `node -e` callability probe, a file:line, or a measured git fact. This corpus supersedes/confirms the prior `research/kf-vjs-facilities.md`; the lineage + facility facts are re-verified, the band-4/7 leverage is the operative section the planning iterations consume.

---

## 0 — Versions + lineage (THE load-bearing constraint)

| repo | installed in glass-ui node_modules | local sibling | sibling git HEAD |
|---|---|---|---|
| `@mkbabb/keyframes.js` | **4.3.0** | `/Users/mkbabb/Programming/keyframes.js` (EXISTS) | `b271fa1` — `feat(N impl WIP): the Stage switcher baked into the demo` |
| `@mkbabb/value.js` | **0.13.0** | `/Users/mkbabb/Programming/value.js` (EXISTS) | 0.13.0 (== installed) |

**The lineage split (binding — determines what BC can leverage NOW vs after a republish):**

- **value.js**: installed dist == local repo == **0.13.0** — *everything value.js offers is consumable TODAY.* glass-ui's peer spine already admits it (`package.json` peerDeps: `"@mkbabb/value.js": "^0.13.0 || ^1.0.0"`). No republish, no widen.
- **keyframes.js**: installed/published dist is **4.3.0 (the local repo's "tranche K")**. The local sibling `package.json` still reads `4.3.0` but its **git HEAD is 30 commits AHEAD of `v4.3.0`** (`git rev-list --count v4.3.0..HEAD` = **30**), through the local tranches L → M → N. The **L/M/N additions are NOT in the published 4.3.0 dist** glass-ui consumes — machine-VERIFIED below.

### Verified-absent from the published 4.3.0 dist (the BLOCKED-on-republish set)
```
# Oscillator: published vs local
grep -c 'Oscillator' node_modules/@mkbabb/keyframes.js/dist/keyframes.d.ts   → 0   (ABSENT in published)
grep -c 'Oscillator' /Users/mkbabb/Programming/keyframes.js/dist/keyframes.d.ts → 17 (present in local)
grep -c 'waveformValue' node_modules/.../dist/keyframes.js                    → 0   (ABSENT in published .js bundle)
grep -c 'waveformValue' local/.../dist/keyframes.js                           → 1   (present in local .js bundle)

# git: Oscillator was added at the L.W9 commit, 30 commits past v4.3.0
git log --diff-filter=A -- src/animation/oscillator.ts → 791b3bd "feat(tranche-L W9): … the Oscillator shipped"
git log v4.3.0..HEAD -- src/animation/oscillator.ts     → 791b3bd (NOT an ancestor of v4.3.0)

# DragOptions in published dist carries axis/transform/spring/springOptions/velocityWindow ONLY
#   (NO bounds, NO snap, NO rubberBand — confirmed in dist/keyframes.d.ts DragOptions interface)
```
This confirms CLAUDE.md's standing note verbatim: *"the kf SOURCE `Draggable` carries a `snap` option, but the PUBLISHED dist `DragOptions` at HEAD does not yet expose it"* and the W-EASING-PRIMITIVE book *"the keyframes.js LIGHT `Oscillator` slots into the `loop` playback seam WHEN IT SHIPS."* **It has not shipped to npm.**

**The republish gate is CHEAP:** glass-ui's kf peer spine is `^4.0.0` (`package.json` peerDependencies) — a kf republish to e.g. 4.4.0 carrying the Oscillator + drag-snap/bounds/rubberBand + Sequence on-events needs **NO peer-spine widen** in glass-ui. It is a by-name cross-repo ask only (the foreign-tree fence; glass-ui edits ZERO sibling tree).

---

## 1 — keyframes.js facility map (the published 4.3.0 surface)

The LIGHT named exports (value.js-free import cost) — machine-verified callable via `require(dist/keyframes.js)`:
```
typeof: function  → SpringProgress · Draggable · ElementMorph · NumericAnimation · Sequence ·
                    stagger · springTimingFunction · springLinearStops · decay · decayRest ·
                    reseatToSpring · probeVelocity · reducedMotionScale · RAFPlayback ·
                    SmoothProgress · ManualTimeline · ScrollTimeline · Timeline · flip · flipShared ·
                    drag · createNativeTimeline · resolveEasing · toEasing · loadAnimationEngine
typeof: undefined → animate · AnimationGroup · compileToCSS   (HEAVY — behind loadAnimationEngine())
```
The HEAVY tier (`animate`, `CSSKeyframesAnimation`, `AnimationGroup`, `compileToCSS`, the `presets` taxonomy, the ingest/scroll-CSS round-trip) is value.js-BEARING and resolves only through `loadAnimationEngine()` (`dist/keyframes.d.ts:554` "The value.js-bearing engine surface, resolved through `loadAnimationEngine()`").

### 1.1 — SpringProgress (the physics core — THE one-clock primitive)
`dist/keyframes.d.ts` — closed-form damped-harmonic-oscillator solver (`x(t)` underdamped/critical/overdamped, analytic).
- **`constructor({response, dampingFraction, initial, initialVelocity, settleThreshold, velocitySettleThreshold, respectReducedMotion})`** — `response` = angular period (s), default 0.5; `dampingFraction` = ζ, default 0.86 (iOS "smooth"); ζ<1 rings, =1 critical, >1 sluggish.
- **`static fromDuration({visualDuration|duration, bounce})`** — the Motion-docs idiom: `response = visualDuration`, `dampingFraction = 1 − bounce`. Trajectory-identical to the (response, ζ) path.
- **`set target(v)`** — re-seats the closed form from the CURRENT `(value, velocity)` so the trajectory is **velocity-continuous** (the iOS interruptible-re-press contract). Idempotent if unchanged.
- **`tickDt(dt_ms)`** / **`tickToTime(t_s)`** — the canonical step (the `Tickable` shape); the renderer drives the clock, the spring owns no rAF.
- `get target/value/velocity/settled`, `snap()`, `reset(v?, vel?)`, `subscribe(fn)`, `play(onFrame?)`/`stop()` (the convenience self-driven rAF), `dispose()`.
- **`respectReducedMotion`** — `ReducedMotionPolicy = boolean | number | undefined`: `false`=full; `true`=binary snap; **a number ∈[0,1] = the AMPLITUDE-INTENSITY** scale (keeps trajectory SHAPE — curve + settle time — and scales only displacement-from-rest; the envelope is preserved by the analytic form, exact + free). Re-resolved per re-seat (a live OS toggle is honored at the next target change; the hot-path `evaluateAt` is a field read — zero matchMedia cost per frame).

### 1.2 — Draggable / `drag()` (pointer-capture fling over a spring)
`class Draggable` — `readonly spring: SpringProgress` is the physics core; the release fling re-seats THAT spring from `(currentValue, releaseVelocity)`.
- **`DragOptions`** (published): `axis?: "x"|"y"`, `transform?: (clientCoord)=>number`, `spring?: SpringProgress`, `springOptions?`, `velocityWindow?: number` (release velocity = avg over last N ms of moves, default 100ms). **NO `bounds`/`snap`/`rubberBand` in published dist** (those are LOCAL-only — §3.2).
- `attach(el)→detach`, `detach()`, `subscribe((value, velocity)=>…)`, `get dragging/value/velocity/settled`, `dispose()`.

### 1.3 — ElementMorph (FLIP rect-to-rect morph — the bloom/CTA-receive substrate)
`constructor(from: HTMLElement|MorphRect, to: HTMLElement|MorphRect, {timingFunction, duration, transformOrigin})`. `MorphRect = {x,y,width,height}`.
- `measure(from,to)→this`, `at(p)→MorphValues`, `toCSSTransform(p)→string`, `apply(el,p)`, `play(el, duration?)→Promise`, `stop()`.
- `timingFunction` is a callable `TimingFunction` or typed `Easing` (value.js-free — composes `NumericAnimation`); a string name resolves via `await resolveEasing(name)`.
- This is the engine under `useLiquidReveal` (FLIP bloom-from-source 1→0) + `useDockCtaReceive` (forward 0→1) — both already wired (`suite.ts`).

### 1.4 — springTimingFunction (spring → typed Easing — THE source/twin bridge)
`springTimingFunction({response, dampingFraction, sampleCount=64, settleThreshold=1e-3, maxDuration=4×response}) → Easing` (`{fn, css}` — ONE curve, two forms). Solved from the SAME (response, ζ) pair the CSS `linear()` tokens generate from (via `springLinearStops`, default sampleCount 24) — drift-proof single-source. This is the bridge `MOTION_CURVES` (glass-ui `curves.ts`) uses to give every `--spring-*` token a JS twin.

### 1.5 — Sequence (the GSAP-Timeline-class TEMPORAL orchestrator — the band-4 choreography substrate)
`class Sequence<V>` — a master-playhead temporal orchestrator (vs `AnimationGroup`'s spatial blending). Published as a LIGHT named export.
- `label(name, at?)`, **`add(animation, at?)`** (`at` = number | `+=N` | `-=N` | label-relative), `seek(masterClock)`, `setTargets(...els)`.
- `get duration/time/progress/rate/finished`, `set progress(p)`, **`play()→Promise`**, `stop()/pause()/resume()`, **`timeScale(n)`**, **`reverse()`**, **`repeat(count)`**, **`yoyo(on?)`**.
- **SCC FENCE (the import-cost trap the choreography wave MUST respect):** `Sequence<V>` is generic over `Animation_2<V>` you `.add()`. A Sequence orchestrating CUSTOM tick-driven anims (a `SpringProgress`/`ElementMorph`/`NumericAnimation` wrapped as `Tickable`) stays LIGHT. A Sequence of `CSSKeyframesAnimation`/`AnimationGroup` objects (`typeof = undefined` — behind `loadAnimationEngine()`) pulls the HEAVY value.js-bearing engine. So the band-4 viz-choreography Sequence rides the LIGHT path (it sequences `SpringProgress`-driven shader-uniform writers, not CSS keyframes) → keeps the viz chunk off the heavy engine.
- Choreography idiom (the kf demo reference, `keyframes.js/demo/sequence/useSequenceDemo.ts`): `new Sequence()` + `stagger(N,{...})` distribution + `.add(childAnim, delay)` + `springTimingFunction(...)` timing + `.play()/.reverse()/.timeScale(n)/.seek(0)` — exactly the **start → transition → end → restart** model the user wants for the viz.

### 1.6 — RAFPlayback (THE shared rAF driver — the one-loop enforcement)
`play(duration, onTick, {respectReducedMotion})→Promise` · `drive(tickable, onFrame?)` · `loop(cb)` · `stop()` · `get running`. The doc: *"no other module owns a rAF handle."* `respectReducedMotion` snaps to `onTick(1)` in one paint — THE shared PRM gate that `NumericAnimation`/`ElementMorph` route through. **For the viz, the rule is INVERSE: the viz already own their frame loop via `createCanvasLifecycle` — do NOT add a kf rAF; FEED the kf primitives `tick(dt)` from the existing canvas loop** (the one-loop / `proof:offscreen-pause` discipline).

### 1.7 — SmoothProgress (exponential-smoothing tracker)
`{damping, snapThreshold, targetEpsilon, initial, clamp, respectReducedMotion}`; `setTarget`, `tickDt`, `snap`, `reset`, `play/stop`. `targetEpsilon` filters sub-pixel scroll jitter. The scrub-smoother the scroll-choreography needs (it's what `useAnimatedNumber` consumes today). `createScrollScene`'s `scrub` forces the JS backend because native `animation-range` lacks a smoother.

### 1.8 — The LIGHT physics leaves (decay / reseat / probe / reducedMotionScale)
- **`decay({velocity, friction=5, initial=0}) → (t)=>{value, velocity}`** + **`decayRest(opts)→number`** — closed-form frictional glide `x(t)=x0+(v0/k)(1−e^(−kt))` + its projected resting point. `useDragMorph` uses `decayRest` to project the fling's rest for nearest-snap.
- **`reseatToSpring(probe: VelocityProbe, newTarget, options?) → SpringProgress`** + **`probeVelocity(probe)→number`** — `VelocityProbe = {prev:{value,time}, curr:{value,time}}` two-sample forward difference. Velocity-continuous interruption of any parsed/running animation.
- **`reducedMotionScale(policy)→number`** — the WCAG-2.3.3 intensity-scaled PRM scalar.

### 1.9 — Oscillator — ABSENT from published (see §3.1); the band-4 critical blocked facility.

---

## 2 — value.js facility map (the published 0.13.0 surface — all consumable NOW)

### 2.1 — sampleColorRamp (NEW in 0.13.0 — the brand-spectrum baker; the band-4 + "colorful POPS" headline)
`dist/units/color/mix.d.ts`:
```
sampleColorRamp(from: Color, to: Color, n: number, opts?: SampleRampOptions): Color[]
SampleRampOptions = { space?: ColorSpace="oklab", hueMethod?: HueInterpolationMethod="shorter",
                      endpoints?: "inclusive"(def)|"exclusive", gamutMap?: boolean=true }
```
N-stop perceptual ramp; `hueMethod:"shorter"|"longer"|"increasing"|"decreasing"` traces the hue arc bare two-stop `@keyframes` cannot encode; each stop gamut-mapped via `gamutMapOKLab` (no silent clip). Machine-VERIFIED callable from the installed 0.13.0 (`typeof v.sampleColorRamp === "function"`). The doc names the use: *"the parameter bare two-stop `@keyframes` cannot encode — the thing the ramp exists to bake."*
- **THE consume-and-delete is already booked in glass-ui:** `src/components/custom/border-progress/composables/useBorderSpectrum.ts:5` carries `// CONSUME(value.js 0.13.0 oklchSpectrum): … re-points onto it … a thin swap, not a re-author.` glass-ui currently HAND-ROLLS `spectrumAt`/`spectrumStops` over `interpolateHue("shorter")` + the `/color` leaf — re-pointing onto `sampleColorRamp` is a NOW move (peer spine admits 0.13.0).
- **The wider band-4 leverage:** every viz palette (dot-flow, concentric, the aurora nuclei LUT) + the 13-stop `--section-color` ramp + the BorderProgress conic want the SAME no-trough warm→cool walk — `sampleColorRamp` is the ONE source for all.
- **`mixColorsN(colors, weights?, space?, hueMethod?)`** — the N-color weighted perceptual mix (the ramp's interior).

### 2.2 — interpolateHue + the OKLCH/OKLab color kernels (the spectrum math)
`dist/units/color/dispatch.d.ts:43` — `interpolateHue(h1, h2, t, method?: HueInterpolationMethod)`; `HueInterpolationMethod = "shorter"|"longer"|"increasing"|"decreasing"`. `mixColors(c1,c2,p1,p2,space?,hueMethod?)`, `color2(color, to)`, `gamutMap(color, targetSpace?)`, `cssColorInterpKeyword(space, hueMethod?)`. The full color class set: `OKLCHColor`/`OKLABColor`/`RGBColor`/`HSLColor`/… + the gamut kernels (`gamutMapOKLab`, `findCusp`, `findGamutIntersection`, `deltaEOK`, `oklabToLinearSRGB`, `srgbToOKLab`). `computeSafeAccent`/`safeAccentColor`/`needsContrastAdjustment`/`getOklchLightness` (the contrast leaves). This is `proof:single-color-core`'s sole math source — glass-ui re-implements ZERO.

### 2.3 — The easing / bezier catalogue (the curve-editor + motion-canon math)
`dist/easing.d.ts`:
- **`CSSCubicBezier(x1,y1,x2,y2)→(x)=>number`** (Newton-Raphson + bisection via `solveCubicBezierX`) — the curve-editor + `MOTION_CURVES` bezier evaluator.
- **`steppedEase(steps, jumpTerm?)→(t)=>number`** + `jumpTerms = ["jump-start","jump-end","jump-none","jump-both","start","end","both"]` + `stepStart()`/`stepEnd()` — the staircase the EasingPicker `steps` mode uses.
- The full callable roster: `linear`, `easeIn/Out/InOut{Quad,Cubic,Sine,Circ,Expo}`, `smoothStep3`, the bounce family, **`easeOutExpo`** (the house bold-decel arrival — the canon NAMES it, never re-mints).
- **`bezierPresets`** (the canonical control-point tables), **`cssLinear(stops: LinearStop[])`** (CSS Easing L2 `linear()` evaluator), **`timingFunctions`** (the name→string Map keyframes.js re-imports — `dist/keyframes.d.ts:13 import { timingFunctions } from '@mkbabb/value.js'`), `timingFunctionDescriptions`. `TimingFunction = (t)=>number` is the shared canonical type (kf parallel-declares for parity).
- `cubicBezier`, `deCasteljau`, `interpBezier`, `cubicBezierToSVG`/`cubicBezierToString`, `lerp`/`lerpArray`/`logerp`/`scale`/`clamp` (`dist/math.d.ts`).

### 2.4 — The scroll-timeline VALUE grammar (NEW in 0.13.0; relevant to band-7 scroll-choreography)
`dist/parsing/scroll-timeline.d.ts` — `parseAnimationTimeline`/`parseAnimationRange`/`parseTimelineScope` + serializers + `CSSTimelineOptions`/`AnimationTimelineValue`/`AnimationRangeValue`/`RangeBoundary`/`RangePhase`. The grammar kf 4.3.0's `parseScrollCSS`/`createScrollScene` dispatch on. glass-ui's `scroll-choreography.css` ships the NATIVE recipes; this is the value-grammar a JS scroll fallback (booked-only) would parse against.

---

## 3 — The LOCAL-only keyframes.js facilities (the BLOCKED-on-republish leverage)

These are in the local sibling repo (`/Users/mkbabb/Programming/keyframes.js/src/`) at git HEAD (30 commits past v4.3.0), **NOT in the published dist**. Each requires a kf republish to leverage (a by-name cross-repo ask; peer spine `^4.0.0` admits it with no widen).

### 3.1 — Oscillator (`src/animation/oscillator.ts`, added L.W9) — THE looping-phase clock (band-4 critical)
A LIGHT (value.js-free) periodic phase clock — `OscillatorConfig = {frequency: number, waveform?: "sine"|"triangle"|"square"|"sawtooth"}` (named `…Config` not `…Options` to dodge the `globalThis.OscillatorOptions` lib.dom collision).
- **`tick(dt): number`** — advances `phase += frequency × dt`, wraps to [0,1). **NO rAF ownership** — the caller drives the loop (mirrors `SpringProgress`/`SmoothProgress`). `dt` in caller units (seconds for rAF, normalized delta for scroll); negative `dt` runs phase backward, wraps correctly.
- `get value` — `waveformValue(phase, waveform)` ∈[−1,1]. `sample(t)` — stateless `t→waveform(t×frequency)` (does not touch the running phase — sample an absolute clock without disturbing a concurrently-`tick`ed phase). `reset(phase=0)`.
- **`waveformValue(phase, waveform)`** — exported value.js-free leaf (apply to your own phase: sine=`sin(2π·p)`, triangle, square, sawtooth — exact formulas in source lines 67-94).
- **The band-4 use:** the viz idle/breath/loop clock. A breathing aurora, a pulsing blob, a sweeping dot-wave each read ONE phase clock (`osc.tick(dtSec)` per renderer frame → `.phase`/`.value` → a shader uniform) — replacing the raw `performance.now()` modulo each viz hand-rolls today. Also the EasingPicker `loop` playback seam (CLAUDE.md W-EASING-PRIMITIVE book) + the speedtest idle-breath (the kf doc names this consumer).

### 3.2 — Draggable bounds/snap/rubberBand (`src/animation/drag.ts`, L.W5) — iOS overscroll + native snap
The LOCAL `DragOptions` adds 3 fields the published dist lacks:
- `bounds?: {min, max}` — hard value-domain clamp.
- `rubberBand?: number` (default 0.4 = the Motion/iOS overscroll feel; 0=hard, 1=pass-through) — `boundary + (excess × rubberBand)`.
- `snap?: number[]` — on release, `decayRest`-projected rest selects the nearest target; the spring re-seats toward it.
- `drag2D(el, {x, y})` (`src/animation/drag-2d.ts`) — two 1-axis Draggables behind `(x,y,vx,vy)`; bounds/rubberBand/snap pass through per axis.
- **The leverage:** `src/composables/motion/useDragMorph.ts` (glass-ui) RE-IMPLEMENTS exactly this — `decayRest` projection + nearest-snap resolution + `spring.target` re-target — because the published dist lacks `snap` (its own file comment: *"glass-ui does NOT re-fork the engine — it wires the published surface … When the kf `snap` ships, this collapses onto it"*). A kf republish unlocks a **consume-and-delete of ~40 lines** of glass-ui snap math + adds **rubberBand overscroll feel** to the liquid-tab drag (the user's "pull → morph → squish to location") FOR FREE.

### 3.3 — Sequence segment/label events (`src/animation/sequence-events.ts`, L.W5)
`seq.on("segment"|"label", cb)` — a crossing detector (segment-lifecycle + label straddle) via `SequenceEventBus`. Lets a viz choreography fire callbacks at named beats ("viz-armed", "intro-complete", "outro-start") without a manual playhead poll. ABSENT from published dist. The base `Sequence` (with `.label`/`.add`/`.seek`/`.timeScale`/`.reverse`/`.repeat`/`.yoyo`) IS published — so the choreography can ship on 4.3.0; only the on-events convenience is blocked.

---

## 4 — The current glass-ui consume baseline (the leverage delta)

| glass-ui module | imports | what it does | BC leverage |
|---|---|---|---|
| `useDragMorph.ts` | `Draggable, SpringProgress, decayRest` | drag-to-morph-squish; RE-IMPLEMENTS snap via decayRest+spring.target | republish → consume kf `snap`/`rubberBand`, delete the re-roll (≥2 consumers: tabs + DockLayerGroup) |
| `useBorderSpectrum.ts` | `interpolateHue` + `/color` leaf | hand-rolled N-stop OKLCH ramp `spectrumAt`/`spectrumStops` | **re-point onto `sampleColorRamp` NOW** (peer spine admits 0.13.0; CONSUME marker already in place) |
| `curves.ts` | `springTimingFunction` + vjs easing | `MOTION_CURVES` — every `--spring-*`/`--ease-*` token's JS twin from `SPRING_PRESETS` | the canonical bridge; band-7 reads this for the JS-side curve |
| `useEasingPicker.ts` | `CSSCubicBezier, steppedEase, bezierPresets, jumpTerms` | the curve editor's bezier/steps math | boundary-law correct; Oscillator slots the `loop` seam on republish |
| `useSpring.ts` + dock `dockMorphContext`/`useLayerTransition`/`useDockOrientationMorph` + `useDrawerSnap` + `useBlobPointer` | `SpringProgress` | every spring morph/press/drawer/pointer | the one-clock spine ALREADY in place |
| `useLiquidReveal.ts` + `useDockCtaReceive.ts` (via `suite.ts`) | `ElementMorph, springTimingFunction` | FLIP bloom-from-source + CTA→dock receive | band-7 reveal choreography |
| `useAnimatedNumber.ts`, `useCountup.ts`, `useNumericTransition.ts` | `SmoothProgress`, `NumericAnimation` | editorial number tweens | — |
| `usePointerVelocityField.ts` | **NONE (vue-only hand-rolled lerp)** | viz pointer position→velocity→acceleration push-API (`tick(dt)`) | band-4 W-VIZ-INTERACTION; **intentionally kf-free** (root-barrel SCC discipline) — KEEP as-is |
| the 5 viz (aurora/blob/constellation/dot-flow/concentric) | `createCanvasLifecycle` rAF; shader `uTime` from `performance.now()` | own the frame loop; drive uniforms off raw clock | **NO viz feeds a kf phase clock today** — the band-4 gap |

### The spring registry (the single source both halves derive from)
`src/composables/motion/springPresets.ts` — `SPRING_PRESETS` feeds BOTH `regen-spring-tokens.mjs` (→ CSS `linear()` via `springLinearStops`) AND `MOTION_CURVES` (→ JS `Easing` via `springTimingFunction`) — drift-proof:
```
smooth: response 0.5,  ζ 0.86  (SETTLE — no overshoot)
snappy: response 0.35, ζ 0.65  (CONTROL — tab/progress/marker, +6.8% overshoot)
bouncy: response 0.5,  ζ 0.45  (PLAYFUL — dialog/success, +20.5% overshoot)
gentle: response 0.7,  ζ 1.0   (critically-damped settle)
dock:   response 0.32, ζ 0.7   (DOCK morph, +4.6% overshoot)
```
Per-spring settle clocks (`--spring-<name>-duration`, from `t_s = −ln(0.02)/(ζ·ωₙ)`, ωₙ=2π/response): smooth 0.36s / snappy 0.34s / bouncy 0.69s / gentle 0.44s / dock 0.28s.

---

## 5 — Band-4 (VIZ CHOREOGRAPHY) one-source/one-clock recommendation

**Current state:** the 5 viz each own a rAF via `createCanvasLifecycle` and drive `uTime` off `performance.now()`. NO viz feeds a kf phase clock. The choreography (start/transition/end/restart, coupled fade) the user wants is ABSENT — the viz just free-run.

**The recommendation (`BC.W-VIZ-CHOREOGRAPHY`, the user's "start/transition/end/restart … via keyframes.js (ONE source + clock)"):**
1. **Keep the one-loop discipline** — the viz own the frame loop; do NOT add a kf rAF (the `proof:offscreen-pause` fence). FEED the kf primitives `tick(dt)` from the existing canvas frame callback.
2. **Idle/loop motion → Oscillator** (`osc.tick(dtSec)` per frame; read `.phase`/`.value` to drive shader uniforms — breath/pulse/sweep all read ONE phase clock). **BLOCKED on kf republish; interim: a glass-ui-local `useOscillator` mirror (the documented interim-then-consume pattern `useDragMorph` set) OR a `SmoothProgress`-driven sine if a republish is out of scope.**
3. **Start/transition/end/restart → a LIGHT `Sequence`** with labels (`intro` → `loop` → `outro`); `seek(0)` restarts; the renderer steps it via its frame `tick`. The base `Sequence` is published in 4.3.0 — **shippable NOW** (orchestrate `SpringProgress`-driven uniform writers, NOT `CSSKeyframesAnimation` — the §1.5 SCC fence keeps it off the heavy engine). The `.on("label")` convenience is blocked on republish (a manual playhead poll is the interim).
4. **Coupled fade (the user's "coupled fade in/out")** — the intro/outro opacity is the SAME spring-driven scalar (a `--*-reveal-t` 0..1, the W-MOTION-CANON P3 / `useLiquidPress` pattern) driving both the canvas opacity AND the uniform ramp — ONE drive, both legs, on the spring's own settle clock.
5. **Pointer interaction (`BC.W-VIZ-INTERACTION`)** → `usePointerVelocityField` is the correct substrate (already `tick(delta)` push-API, position→velocity→acceleration; intentionally kf-free for the root-barrel SCC trap). KEEP. The viz feed it from their frame loop.
6. **Brand-spectrum palettes** → `sampleColorRamp(from, to, n, {space:"oklch", hueMethod:"shorter"})` (NOW) — the dot-flow/concentric/aurora-LUT palettes + the BorderProgress conic all read ONE no-trough warm→cool source, killing the per-viz hand-rolled hue walks AND folding the teal-on-navy purge (BC.W-TEAL-NAVY-PURGE) onto the warm-cream identity defaults.

## 6 — Band-7 (MOTION CANON) one-clock recommendation

**Current state:** the canon is codified (`docs/precepts/motion-canon.md` P1-P6; the §6 easing table; `MOTION_CURVES`). The spring spine is in place (SPRING_PRESETS → CSS tokens + JS twin, drift-proof). `useSpringPress`/`useLiquidPress`/`useLiquidFlex` are the press/squish primitives.

**The recommendation (`BC.W-MOTION-ONE-CLOCK`, `BC.W-SPRING-EASE`):**
- **The ONE clock IS already keyframes.js** — every `--spring-*` is a `SpringProgress` curve; every JS twin is `springTimingFunction`. The work is COMPLETENESS: a gate that asserts NO surface drives a spring against a generic `--duration-*` wall clock (the W-GLASS-CAL per-spring-duration fence) and NO surface hand-rolls a spring/rAF outside the kf spine (the `useDragMorph`/`usePointerVelocityField` intentional exceptions are the only allowed off-spine, both for SCC reasons).
- **The abrupt curves eased (the user's "the abrupt curves eased")** — the bold-decelerating arrival is `easeOutExpo` (value.js, aliased to glass-ui's `--ease-out-expo`); the canon NAMES it, never re-mints (a duplicate alias reds `proof:animation-coherence`). For squishy/quick/coupled-fade the `snappy` preset (response 0.35/ζ 0.65) is the CONTROL register; its perceptual arrival reads quick (~100-120ms to ~1.0) even though the 2%-band settle runs 340ms — **do NOT truncate the clock** (re-introduces the W-GLASS-CAL tail-jank; the spring fence is binding).
- **The coupled fade (P3)** — `useLiquidPress`'s `--*-press-t` 0..1 drive is ONE spring scalar feeding BOTH transform AND the brightness/specular leg on the spring's own settle clock. The pattern generalizes to every reveal (opacity coupled to transform via a single spring-driven scalar).
- **The interruptible re-press** — `SpringProgress.set target` velocity-continuous re-seat (or `reseatToSpring(probe, newTarget)`) is the iOS contract; `useSpringPress` already binds it. Every re-press inherits the live `(position, velocity)`, never a CSS-transition restart (the `SpringScene` demo proves the idiom: a live `liveSpring.target = …` chases the tap target).
- **PRM** — `respectReducedMotion` (binary OR the intensity-scaled number) is the ONE gate; the CSS `:active`/`a11y-overrides.css` carve is the no-JS floor. Both already wired.
- **The EasingPicker `loop` seam** — the Oscillator slots in on republish (the booked named-successor consume).

## 7 — The republish gate + the cross-repo coordination

The band-4/7 BLOCKED leverage (Oscillator, drag snap/bounds/rubberBand, Sequence on-events) all need a **keyframes.js republish past 4.3.0** carrying the local tranche-L/M/N additions. The channel is the by-name cross-repo ask (the foreign-tree fence; glass-ui edits ZERO sibling tree — CLAUDE.md's W-CROSSREPO-ASKS relay). The economics:
- **value.js `sampleColorRamp` + the full curve catalogue: consumable NOW** (`^0.13.0` already admitted; the `useBorderSpectrum` re-point is a thin swap).
- **The published 4.3.0 spine (SpringProgress, Draggable, ElementMorph, springTimingFunction, Sequence-base, RAFPlayback, SmoothProgress, decay/decayRest/reseatToSpring, NumericAnimation, stagger): FULLY operable** — the one-clock spine is in place; the viz-choreography Sequence ships on it TODAY.
- **The kf republish (4.4.0-class) unlocks: Oscillator (viz loop clock) + drag snap/rubberBand (the liquid-tab fling consume-and-delete) + Sequence on-events** — a CHEAP ask (no peer-spine widen). Until then the interim is the documented mirror-then-consume pattern.

**The "animation-suffusal demo" the user referenced** is the multi-scene kf demo SPA (`/Users/mkbabb/Programming/keyframes.js/demo/app/scenes/`: `SpringScene`, `EasingScene`, `SequenceScene`, `MotionPathScene`, `CubeScene`, `AmigaScene`, `SquareScene` + the tranche-N Stage scene-switcher: DK64-barrel carousel + liquid-glass downlight + grid-paper), each scene dogfooding a motion primitive — the reference for what the viz choreography (band 4) + the storybook meta-design (band 9) should FEEL like.
