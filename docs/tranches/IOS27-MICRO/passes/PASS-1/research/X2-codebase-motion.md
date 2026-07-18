# X2 — the extant glass-ui motion system, inventoried

Verified-model: claude-fable-5. Seat X2, IOS27-MICRO pass 1, 2026-07-18.
Scope: every motion/spring/gesture/liquid source under `src/`, read in full; contract,
consumers, physics already implemented vs the MARKS targets, extension seams vs rewrite
indications. Targets referenced by hallmark number from
`docs/tranches/IOS27-MICRO/analysis/MARKS.md` (H1 dock-to-card growth, H2 magnetic
overpull, H3 liquid tab lens, H4 two-tier material, H5 CC desync, H6 velocity/detents).

## 0. The layer map

The motion tree is four layers, each with a single-authority discipline:

1. **Engine (peer)** — `@mkbabb/keyframes.js`: `SpringProgress` (analytic 2nd-order ODE,
   velocity-continuous retarget, `respectReducedMotion` endpoint-snap, own rAF via
   `.play()`), `Draggable` (pointer-capture follow + velocity-window + snap-aware fling,
   kf 5.1.0 `DragOptions.snap`), `NumericAnimation`, `SmoothProgress`,
   `springTimingFunction`/`springLinearStops`, `ElementMorph`. glass-ui mints no second
   integrator except two sanctioned hand-rolled ones (`useLeadTrail`,
   `usePointerVelocityField` attractor) kept keyframes-free for the `/motion-core` entry.
2. **Register (data + tokens)** — `springPresets.ts` (the 7-row named-spring table) ↔
   generated `scheme-spring.css` `linear()` curves + numeric 2%-settle clocks;
   `--motion-tempo` (time) ⟂ `--motion-weight` (magnitude) ⟂ `--ui-scale` (geometry),
   all registered `@property` inheriting scalars; `--flex-vel` the non-inheriting live
   velocity channel; `--ease-cartoon-punch` the anticipation+exaggeration raw linear().
3. **Primitives (composables)** — spring wrappers, the squish projection
   (`useLiquidFlex`), the FLIP runner (`useElementMorph`), the two-edge worm
   (`useLeadTrail`), the velocity bridges, the scroll spine.
4. **Surfaces (CSS recipes + component wiring)** — dock morph scalar chain, drawer snap
   scalar chain, tabs indicator, pager worm, `.glass-reveal`/`.liquid-enter`,
   `.scroll-chrome`, transitions.css Vue sets.

Cross-cutting invariants already enforced everywhere: compositor-only (transform/
translate/scale longhands, never animated width/height — motion-canon P5), PRM
triple-gated (engine `respectReducedMotion` snap + `--motion-weight: 0` carve + CSS
`no-preference` outer gates), CSS↔JS one-clock parity (`--motion-tempo` scales the CSS
settle clocks AND every JS `response` at construction), spatial-on-spring vs
effects-on-bezier split, and the anti-taffy squish fence (caps ≤1.2).

## 1. Spring core

### springPresets.ts — the register table
`SPRING_PRESETS`: smooth (0.58, 0.80) · snappy (0.48, 0.74) · bouncy (0.60, 0.60) ·
gentle (0.82, 1.0) · **dock (0.30, 0.82)** · press (0.20, 0.80) · transient (0.62,
0.90). `springPreset(name)` is the lookup; the CSS generator and every JS consumer read
this one table. Invariant fences documented in-file: every overshoot ∈ [0%, 10%];
non-gentle settles never get faster than the calm baseline.

**DRIFT FOUND**: the `scheme-spring.css` header comment still documents dock as
`(0.68s, ζ=0.64)` while the table (and the generated settle, 0.19s) is `(0.30, 0.82)`;
`useLeadTrail`'s "pager-owned" defaults are also 0.68/0.64. MARKS §2 fit the measured
overpull springback to ζ≈0.5–0.65, ~2–2.5 Hz "kin to springPreset('dock') {0.68,0.64}"
— i.e. the MARKS kinship claim matches the STALE pair, not the shipped one. For the
record: (0.30, 0.82) gives damped f≈1.9 Hz (inside the MARKS 2–2.5 Hz band) but a
monotone no-overshoot curve; (0.68, 0.64) gives f≈1.1 Hz with visible overshoot. Neither
row alone lands "one visible overshoot ~30–50% of overpull distance, settle ≤250ms" —
see §8 register collisions.

### springProjection.ts
Numeric 2%-band settle solver + the 48-sample `linear()` projection shared by token
generation and the Springs lab. This is the machinery that keeps CSS_t90 == JS_t90 (the
curve and the clock share one horizon). Any new preset row inherits it for free.

### useSpring.ts / useSpringPress.ts / useLiquidPress.ts
- `useSpring(target, opts)` — Vue reactive wrapper over `SpringProgress`; exposes
  `value` + **`velocity`** + `isSettled`, target re-seat is velocity-continuous;
  co-scales response by `motionTempo()`. Consumer: ScrubberTimeline (3 local per-leg
  presets — the presets-in-consumers seam).
- `useSpringPress` — target pinned 0/1 on pointer events, `press` preset defaults.
- `useLiquidPress` — THE press: composes useSpringPress + useLiquidFlex (linear law,
  cap 1.04, weight-coupled via `effectiveCap`) into one `pressStyle` (reciprocal
  `scale` + a consumer-named 0..1 drive var, e.g. `--glass-btn-press-t`,
  `--dock-press-t`). Two registers via `squish: false` (bare uniform shrink).
  Consumers: Button, DarkModeToggle, DockControl, ScrubberTimeline, useSpecularPointer
  (press coupling into the specular intensity).

vs MARKS: the press substrate is exactly H3's "press-charge" *mechanical* half — the
interruptible 0..1 charge scalar with a surface-CSS light leg already plumbed
(`--glass-btn-press-t` → gleam). What's missing for Find-My-grade charge is the LIGHT
half: a bloom that escapes the capsule bounds and washes the whole component (§7).

### useDockSpring.ts + useDockMorph.ts + constants.ts
`useDockSpring` — the dock band's sole `new SpringProgress` factory: `playTo(from, to,
{onFrame(value, velocity), inheritVelocityScale, onSettle})` with velocity-carrying
re-base on interruption; self-disposes on settle (an at-rest dock parks zero springs).
`useDockMorphOrchestrator` projects the outer collapsed/expanded swap onto ONE
`--dock-morph-t` inline scalar on the `.glass-dock` root + `[data-morphing]`;
reversal complements both position (`1 - t`) and velocity (scale −1). `DOCK_SPRING`
reads `springPreset("dock")`. `MORPH_SETTLE_MS` 840 backstops click integrity.

vs MARKS H1: the single-scalar chain (spring writes one registered scalar; CSS derives
everything — chrome interp, size scale, radius lerp, child stagger) is the right
architecture for the reveal ladder. What the dock morph is NOT today: it is
**click/hover-triggered and fire-and-forget** (retargetable mid-flight, but no gesture
scrub — `useDockState` is a hover/pin FSM with zero pointer physics), and the box morph
is a **center-origin pure size scale**, not bottom-anchored asymmetric growth.

### useLeadTrail.ts — the two-edge integrator
Hand-rolled semi-implicit-Euler spring LEAD (default 0.68/0.64, sub-stepped ×8) + a
critically-damped exponential TRAIL follower (τ≈270ms) in ONE parked-when-settled rAF.
The lead/trail gap IS the live elongation; the trail catching the lead is the emergent
release (no timer). `drive()` retargets with velocity carry; `seat()` snaps; PRM seats
instantly. Consumer: usePagerWorm only.

vs MARKS H3: this is the closest existing thing to the Find My goo — "light leads,
geometry follows" is literally a lead edge and a trail edge. It is under-consumed (one
consumer) and is the prime extension substrate for a continuous tab lens (§7).

### usePointerVelocityField.ts — the full kinematic chain
Position → velocity → **acceleration** (all eased, per-second, frame-rate independent)
+ flick `burst` + `engagement` half-life envelope + a mass-spring-damper `attractor`
(ω = 2π/(response·√mass), burst-lead toward the heading). Push-API: the renderer's
frame loop calls `tick(delta)` — no own rAF. PRM = tick(0) freeze. Consumers: the viz
family (blob/aurora mappings via `useRoutePointer` + `pointerFieldMappings`).

vs the X2 headline ("momentum/velocity/acceleration as a facility for ALL components"):
this is the ONLY acceleration source in the tree, and it is normalized-host-space,
renderer-fed, viz-shaped. The DOM-component world instead has five partial velocity
sources (§4). The facility exists in fragments; no single vocabulary.

## 2. The squish/deformation family

### useLiquidFlex.ts — the ONE squish law
Pure projection (no spring, no rAF, no element) of a driven scalar onto: size span,
volume-preserving `stretch = 1 + tanh(|ṫ|·k)·(cap−1)` (or linear travel-fraction law),
`--stretch`/`--flex-vel` style objects. Squish is a pure derivative of the drive calls
(deterministic, no wall clock). Caps kept LOW by design (1.04 press · 1.08 drag ·
1.11 indicator · 1.14 dock token · 1.2 pager) — the ≤1.2 anti-taffy fence.
Consumers: useLiquidPress, useDragMorph, useSelectionIndicator, usePagerWorm,
ScrubberTimeline, the metaball shader (same curve in-shader).

vs MARKS H2: the overpull compression targets (−7.5% width, **−21% height**,
bottom-anchored, content deforming with the container) are far outside the anti-taffy
band and outside this law's shape (velocity-driven swell, not displacement-driven
bound-compression). Extension seam: the primitive is deliberately law-selected
(`squishLaw`) — a third law ("overpull": displacement-ratio-driven, anchored, reciprocal
volume compression) slots in without touching the two shipped laws. The fence needs a
REGISTER SPLIT ruling, not a lift: travel-squish stays ≤1.2; bound-compression is a
different register with its own budget (MARKS measured up to 1.27 reciprocal on height).
Content-deforms-with-glass comes free when the compression is a container-level `scale`
(the press already proves this).

### writeVelocityWeight.ts — the universal velocity→weight law
`--motion-weight = 0.618 + 0.382·flexVel` written on the driving element +
`--flex-vel` mirrored (registered `inherits: false` — one-element invalidation).
`effectiveCap(el, capToken)` derives every squish cap site-locally:
`1 + (cap−1)·(weight + (1−weight)·flexVel)/0.618` — rest-identical, 1.0 at weight 0
(the PRM/observer fence), transiently deepened by live velocity. Consumers:
useSelectionIndicator, useTabDragMorph, useLiquidPress (via cap getter).

This IS the "elements morph more the faster they move" single-scalar law — the seed of
the all-components momentum facility. It currently covers magnitude only; there is no
time-domain velocity coupling (nothing shortens/lengthens a clock by approach speed) and
no acceleration term.

### The dock deformation zoo — RETIRED (load-bearing negative)
`shape.css`/`layers.css` state the current doctrine: the dock box morph is a pure size
morph — reserved expanded footprint + `scale: var(--dock-size-scale)` from
`transform-origin: center`, radius lerp, opt-in clip-path lerp; the `--stretch` squish ×
`--dock-punch-stretch` zoo is **definition-absent** (cured a live flicker class).
`--dock-morph-max-stretch: 1.14` (density.css) and `DOCK_MORPH_MAX_STRETCH`
(constants.ts) survive as **dead knobs** — nothing composes them into the scale.
`core/index.ts` still references the deleted `useDockOrientationMorph` in comments.

vs MARKS H1: bottom edge pinned + top travels + sides breathe +4–5% is an ANISOTROPIC,
bottom-anchored growth — reintroducing deformation to the dock must not resurrect the
zoo's mistakes (two clocks, per-child counter-scale storms). The reserved-footprint +
one-scalar architecture accommodates it: origin `bottom center`, a width channel and a
height channel derived from the same `--dock-morph-t` with different shaping functions
(CSS calc lenses), which is also how H5's per-channel curves want to work (§6).

## 3. Gesture engines

### useDragMorph.ts — grab/follow/squish/fling-snap
Wires kf `Draggable` over an internally-owned `SpringProgress` (snappy preset), native
engine-side snap to declared centers, squish via useLiquidFlex tanh law capped by the
live `--tab-indicator-max-stretch` getter, single-commit `onSnap(value)` at settle,
follow painted as `useElementMorph.offset()` (translate over settled footprint). Lazy
spring mint; PRM = follow works, squish off, instant snap. Consumers: useTabDragMorph
(SegmentedTabs `:draggable`), DockLayerGroup (rail drag).

vs MARKS H6: release velocity inheritance and nearest-snap are engine-native here.
Missing: overpull past the end targets (unknown whether kf `Draggable` applies
resistance beyond the snap span — engine source not read this pass), the transient
mid-detent catch at speed, and the pin-past-bound hold.

### useDrawerSnap.ts — the detent engine (the closest kin to the Maps card)
ONE `SpringProgress` (DRAWER_SNAP 0.32/0.80) writes `--glass-drawer-t` AND `--stage-t`
**atomically** (sheet + scrim + page-wrapper — the single-writer no-desync doctrine).
Detent ladder `[0.12, 0.5, 1]` (peek/half/full — structurally the same three stops MARKS
measured: rest / mid-detent 1976–2017 / full). Drag = pointer-capture scrub writing the
scalar directly (span measured once at pointerdown); release re-seats the spring from
the LIVE painted scalar + measured velocity; fling ≥450 px/s advances exactly one detent
in the drag direction, slow release snaps nearest; grab interrupts any in-flight snap
from the on-screen value. PRM deterministic.

vs MARKS H1/H6 — the gap list for this engine is the campaign's core:
- **No overpull**: the drag clamps hard to `[min(ladder), max(ladder)]` — no
  resistively-damped travel past the ends, no compression, no springback-with-overshoot.
- **No transient catch**: a fast collapse can only stop at a detent or skip via the
  one-step fling rule; MARKS wants detents as weak spring wells crossed at speed
  (~170ms catch), i.e. momentum projection across the WHOLE ladder (kf `Draggable`'s
  `decayRest` projection is the right shape; the drawer hand-rolls stepped logic
  instead).
- **No reveal ladder**: nothing keys per-element content reveal off `--glass-drawer-t`.
  The scalar is on the sheet and inheritable — the dock already proves the pattern
  (child stagger keyed off `--dock-expand-t`); a height-mapped reveal ladder is a pure
  CSS extension (per-element `opacity/translate` as clamped functions of the scalar,
  onset per MARKS: handle 0–5%, title ghost 10–30%, row N at 40%+10%·N).
- The `--stage-t` atomic twin-write is exactly where H5's medium channel lands (§6).

### useDragVelocity.ts — the CSS-var velocity bridge
Drag-window-gated rAF (zero idle cost, unit-enforced), one-pole EMA, tanh-saturated,
clamped 0.7, writes `--atom-drag-v` on the host; PRM pins 0. Consumers: Slider
(fill smear + cartoon-cast lag), via useMotionAxis gating.

vs the facility target: this is the honest DOM-side velocity→CSS bridge, but it is
slider-flavored (`--atom-drag-v` name, x/y axis scalar). A universal facility wants
this generalized (name, axis-vector, and an acceleration term) or superseded by one
vocabulary shared with `--flex-vel`.

### useDockState.ts / useCarousel.ts / dialog sheet-motion.ts
- `useDockState` — collapsed/hover/pinned FSM: hover-intent dwell 60ms, collapse delay
  3600ms, keepOpen ref-counting, click-away. NO pointer physics — confirms the dock has
  no drag surface today.
- `useCarousel` — embla with `duration: 30` (the weighty glide default); momentum is
  embla's, outside the house spring vocabulary (accepted exception).
- `sheet-motion.ts` — pure fns: placement→`translate` longhand (unclamped p so spring
  overshoot IS the settle) + scrim opacity clamped off the same scalar (a two-channel
  read of one scalar — a micro-precedent for channel lenses).

### useScrollTrigger / useScrollChrome / useScrollPin / useScrollScene / scrollReader
`createScrollReader` — the ONE rAF-coalesced scroll listener core. `useScrollTrigger`
adds px/s velocity + committed direction + crossings (dual-path: native timeline owns
the continuous ramp when `supportsScrollTimeline()`). `useScrollChrome` — the
persistent-by-default chrome collapse machine (ramp + velocity-gate flick + snap on
scroll-stop 140ms) writing `--chrome-collapse-t`; `.scroll-chrome` paints it
compositor-only with a bounded fade floor. `useScrollPin`/`useScrollScene` — the
spring-damped scroll spine (`SmoothProgress` scrub inertia + `SpringProgress` snap)
writing `--pin-t`/progress on EVERY engine. `supportsCssTimeline.ts` — the hardened
double-probe (rejects lying shims).

vs MARKS: scroll is already the most complete "momentum facility" consumer — velocity,
direction, flick gates, snap-on-stop, liquid-weight scrub. Its patterns (velocity
threshold + snap + persistent default) are the house style the new gestures should
speak.

## 4. The velocity census (the facility fragments)

| source | domain | units | channels | CSS output |
|---|---|---|---|---|
| SpringProgress | any scalar | units/s | v (analytic) | via consumer |
| kf Draggable | pointer px | px/s | v window on release | — |
| useDragVelocity | pointer px | saturated 0..1 | v only | `--atom-drag-v` |
| useLiquidFlex | driven t | |Δt| per drive | flexVel 0..1 | `--flex-vel` (+`--stretch`) |
| writeVelocityWeight | element | 0..1 | weight boost | `--motion-weight` |
| usePointerVelocityField | pointer norm | units/s | **v + a + burst + engagement + attractor** | — (push API) |
| useScrollTrigger | scroll px | px/s | v + direction | — |
| useDrawerSnap | gesture px | px/s (hand) | v at release | — |

Resolved: the universal-facility ask is a UNIFICATION problem, not a greenfield build.
The CSS half of the law already exists (`--flex-vel` non-inheriting live channel +
`--motion-weight` inheriting governor + site-local `effectiveCap`); the missing pieces
are (a) one DOM-element kinematics primitive with velocity AND acceleration in px/s
(the pointer field's chain, re-homed to element space, event-driven + drag-window-gated
like useDragVelocity), (b) a shared name vocabulary for its CSS projection, (c) a
time-domain coupling (velocity-seeded clocks are engine-native already — every
SpringProgress re-seat carries velocity — but nothing exposes "approach speed" to CSS).

## 5. Morph/FLIP + entrance family

`useElementMorph` — the one compositor FLIP runner: explicit source/destination
endpoints, center-origin translate+scale, coupled opacity/blur channels, NumericAnimation
playback on `springTimingFunction(snappy|bouncy)`, mid-flight retarget from the live
painted frame on resize/endpoint-swap, `seat(p)` for scrubbing, `offset()` for gestures,
PRM snap. Wrappers: `useLiquidReveal` (trigger→self bloom + 4px decongest),
`useBloomUp` (source→dest + the 4th COLOR channel: destination-field
`--glass-ambient-hue/-strength` warmed on the spring curve — precedent for coupling
LIGHT to a motion clock), `useDockCtaReceive` (external CTA flies onto a dock control).
`dockMorphMeasure` — settled-endpoint measurement discipline (never mid-morph).

CSS entrances: `.glass-reveal` + `motion-registers.css` (the named register table —
overlay/menu/tooltip/transient, each `{spring, clock, scale, blur, slide}`; exits
150/100ms no-overshoot), `.liquid-enter` (mount keyframes: rise + reciprocal
born-squish + fade + decongest, 1/φ stagger, all governed by `--motion-weight`),
`transitions.css` (fade/tab-fade/pane-swap/metric-swap + PRM carve).

vs MARKS H1 reveal ladder: `.liquid-enter`'s stagger is TIME-keyed; the Maps/Find My
ladder is HEIGHT-keyed (state = pure function of expansion fraction). Both belong: the
dock/drawer scalar chain gives the height-keyed form; `.liquid-enter` covers the
time-keyed live-drag form. MARKS note "icons emerge from under the bottom margin
(clipped), not opacity alone" — no current recipe does a clip-reveal from a container
edge; small additive recipe.

vs MARKS H5: `motion-registers.css` is the natural home for a choreography register —
but note EVERY current register couples its channels on ONE clock (deliberately: P3
"fade coupled to transform"). The measured CC open is three clocks (blur ≤100ms cliff,
fade ~150–250ms, stretch ~600ms decel, fade:stretch ≈ 1:4) and the close INVERTS the
order (content leads, medium relaxes 400–450ms, with a 100–200ms empty-blur beat). The
desync register is therefore a NEW law, not a retune — see §8 collisions.

## 6. Where H5 (multi-clock desync) lands — the resolved seam

The drawer already writes TWO scalars atomically (`--glass-drawer-t` + `--stage-t` on
sheet/scrim/wrapper) with the atomicity documented as the anti-desync invariant. The
CC choreography does NOT need a second writer or a second clock owner — it needs
**per-channel curve lenses over the one scalar**: medium = f_med(t) (near-step,
saturating early), content-fade = f_fade(t) (completes by t≈0.25), stretch = t itself
(the spring already shapes it), rail-stagger = delayed ramp of t, depth-grade = travel ×
(1 + 0.2·row/rows). All are pure CSS `calc()`/`clamp()` reads of the registered scalar —
the single-writer invariant survives, the desync is in the reading functions, scrubbing
and interruption come free (the scalar is already scrub-driven and
interrupt-continuous), and the close-order inversion is a different lens set selected by
direction (the `--dock-expand-t` directional-derivation precedent: `t` vs `1−t` chosen
by class + `[data-morphing]`). The empty-blur beat falls out of f_med ≠ f_fade at the
tail. The blur medium itself is `backdrop-filter` territory (owned by the glass tiers) —
the lens should drive a registered medium scalar the glass recipe reads, not a raw
per-frame blur radius write (WebKit re-blur cost; the `.scroll-chrome` "blur stays
crisp" fence documents the hazard).

## 7. Where H3 (the liquid tab lens) lands

Extant: `useSelectionIndicator` (the ONE traveling-indicator writer: RO + both-axis
measure, CSS-transition glide on `--tab-indicator-duration`, travel-squish + `--tab-blob`
area-overshoot released at 82% of the clock by a timer) + `useTabDragMorph` (grab the
pill) + segmented.css reciprocal `scale: calc(blob·stretch) calc(blob/stretch)`.
The pager worm (`useLeadTrail` + `usePagerWorm`) separately owns the continuous-body
goo: two bodies + welling neck, instance-local filter merge (Arm A) with a clip-path
degrade floor (Arm B), emergent release.

Gap vs the Find My marks, in rewrite-vs-extend terms:
- **One continuous body across the morph** — the indicator is a slide-and-squish, not a
  body; the worm IS a body but lives in pager-dots. Rewrite indication: re-platform the
  tab lens onto the lead/trail substrate (a lens variant of the worm: capsule bodies,
  bar-height, label-aware) rather than patching more channels onto the box-measure
  writer. useLeadTrail was built as the shared driver ("the ONE shared two-edge
  driver") with exactly one consumer today — this is its second.
- **Press-charge before travel** — extend `useLiquidPress`'s drive var with a light leg
  that blooms past the capsule (the `useBloomUp` field-warming precedent: a motion clock
  driving `--glass-ambient-*` on the BAR, i.e. whole-component engagement).
- **Oversized arrival + cool-down** — `--tab-blob` exists but is fenced at √1.14≈1.07
  area; the measured arrival is taller-than-bar with a ~200ms hot hold and a
  1.2–1.4s press→settle total. No preset row covers that clock (longest settle 0.76s).
  Register decision needed (§8).
- **Lens magnification of content (5–8%)** — nothing magnifies the label under the
  capsule; needs a content-layer counter-transform or a real lens treatment; sibling
  legibility under the traveling bloom is the stated best-iOS target.
- Keep from Safari: idle specular sweep (the specular system already reserves light for
  engagement — `--glass-specular-intensity-rest` is 0; an idle sweep on the ACTIVE lens
  only is a deliberate, scoped exception) and pill self-centering
  (`useSelectionGroup` already owns a scrollIntoView recenter seam).

## 8. Register/law collisions the campaign must rule on (found, not resolved)

1. **Anti-taffy ≤1.2 vs overpull −21%**: H2's bound-compression exceeds every shipped
   cap and the fence's intent. Ruling needed: mint a separate bound-compression register
   (displacement-driven, anchored) with its own budget; keep the travel-squish fence.
2. **Overshoot ≤10% vs springback ~30–50%**: the springs table fences all overshoot to
   [0,10]%; H2's release overshoot and H3's oversized arrival both exceed it. Same
   shape of ruling: these are gesture-release/arrival registers, not entrance springs —
   either new rows outside the fence with their own documented invariant, or
   displacement-domain handling (the overshoot lives in the scalar's trajectory via
   velocity seed, not in a timing-function).
3. **Dock preset drift**: springPresets dock (0.30, 0.82) vs the stale (0.68, 0.64)
   comments and useLeadTrail defaults; MARKS queued a denser burst (24fps overpull
   release) to fit ζ/f exactly before retuning.
4. **One-clock coupling (P3) vs three-clock desync (H5)**: resolvable without breaking
   P3 by the §6 lens construction (one clock, per-channel shaping), but the precept text
   should say so explicitly or the first reviewer will flag the register as a P3 breach.
5. **Everything-is-a-scrub vs fire-and-forget surfaces**: dock morph and `.glass-reveal`
   entrances are trigger-fired. Drawer/drag surfaces already comply. The dock needs a
   gesture face (H1 drag-up growth, H2 overpull, pre-commit ~40px taffy zone) — that is
   a new gesture engine on the existing `--dock-morph-t` chain (Draggable/DrawerSnap
   shape), not a rewrite of the morph chain itself.
6. **Dead knobs**: `--dock-morph-max-stretch` + `DOCK_MORPH_MAX_STRETCH` (zoo leftovers,
   nothing reads them), stale `useDockOrientationMorph` comment references. Clean-break
   candidates when the dock deformation returns in its new form.

## 9. Extension seams vs rewrite indications — the verdict table

| target | verdict | vehicle |
|---|---|---|
| H1 growth scrub + velocity release | EXTEND | drawer-snap-shaped gesture over `--dock-morph-t`; kf Draggable ladder-snap for detents |
| H1 bottom-anchored asymmetric growth | EXTEND | reserved-footprint scale, origin bottom-center, per-axis shaping lenses of one scalar |
| H1 height-keyed reveal ladder | EXTEND | CSS per-element clamp() reads of the container scalar (dock child-stagger precedent) |
| H1 edge-emergence (clip reveal) | ADD | small recipe beside `.liquid-enter` |
| H2 overpull compression + rubber-band | EXTEND + RULING | third `useLiquidFlex` law + bound-compression register; container-level scale deforms content free |
| H2 springback overshoot | EXTEND | SpringProgress velocity seed (native); preset ruling for ζ/f after the 24fps burst |
| H3 continuous lens body | REWRITE (re-platform) | tab lens onto `useLeadTrail` (2nd consumer by design); box-measure writer stays for calm tabs |
| H3 press-charge + bar glow wash | EXTEND | useLiquidPress drive var + useBloomUp field-warming pattern on the bar |
| H3 oversized arrival + 1.2–1.4s clock | EXTEND + RULING | blob channel unfenced for the lens register only; possible new preset row |
| H5 three-channel desync | ADD (new register) | per-channel curve lenses over the ONE scalar (§6); motion-registers.css home |
| H5 depth-graded travel | ADD | `--row-i` scalar in the travel calc |
| H5 medium persistence across interrupts | EXTEND | `--stage-t` chain already persists; lens split makes it visible |
| H6 momentum detent projection + catch | EXTEND | hand the drawer ladder to kf Draggable snap (decayRest projection) or port the projection; weak-well catch as a mid-flight retarget window |
| velocity/accel facility for ALL components | UNIFY | one element-space kinematics primitive (pointer-field chain + drag-window gating), projecting onto the EXISTING `--flex-vel`/`--motion-weight` law; retire `--atom-drag-v` naming into it |
| PRM / Safari 2026 / compositor | ALREADY HELD | triple-gated PRM, compositor-only fences, no-SVG-goo dock fence, supportsCssTimeline harden, instance-local-filter worm with degrade floor |

## 10. File index (all under src/)

Spring: `composables/motion/spring/{springPresets,springProjection,useSpring,
useSpringPress,useLiquidPress,useLiquidFlex,useSpringMount}.ts`
Morph: `composables/motion/morph/{useElementMorph,useDragMorph,useLeadTrail,
useSelectionIndicator,useSelectionGroup,useDockCtaReceive}.ts`
Reveal: `composables/motion/reveal/{useLiquidReveal,useBloomUp,useStaggerReveal,vReveal}.ts`
Pointer: `composables/motion/pointer/{usePointerVelocityField,useRoutePointer,
pointerFieldMappings}.ts`
Scroll: `composables/motion/scroll/{scrollReader,useScrollTrigger,useScrollChrome,
useScrollPin,useScrollScene,useScrollProgress,supportsCssTimeline}.ts`
Core: `composables/motion/core/{writeVelocityWeight,motionTempo,useReducedMotion,
useRAFLoop,useViewTransition,asElement}.ts`
DOM: `composables/dom/useDragVelocity.ts` · Shared: `components/_shared/useMotionAxis.ts`
Dock: `components/dock/composables/{useDockSpring,useDockMorph,useDockState,
dockMorphMeasure}.ts` + `styles/{morph,density,shape,layers}.css` + `constants.ts`
Drawer: `components/drawer/{composables/useDrawerSnap.ts,constants.ts}`
Tabs: `components/tabs/composables/useTabDragMorph.ts` + `styles/segmented.css`
Pager: `components/pager-dots/composables/usePagerWorm.ts`
Dialog: `components/dialog/sheet-motion.ts` · Carousel: `components/carousel/useCarousel.ts`
Tokens/recipes: `styles/tokens/{scheme-spring,scheme-motion,motion-registers,
property-regs}.css`, `styles/{transitions,scroll-driven,scroll-chrome,
scroll-choreography}.css`, `styles/glass/{liquid-enter,liquid-fill,reveal}.css`
Specular (engagement light): `composables/glass/{useSpecularPointer,useSpecularTracking,
vSpecular}.ts` + `styles/glass-specular-track.css`
