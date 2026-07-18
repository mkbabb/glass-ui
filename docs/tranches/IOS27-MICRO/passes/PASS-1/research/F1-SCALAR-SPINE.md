# F1 SCALAR-SPINE — pass-1 research digest

Seat: F1. Verified model: `claude-fable-5` (system context: "The exact model ID is claude-fable-5").
Date: 2026-07-17. Inputs: `analysis/MARKS.md`, REGISTRY F1 section + cross-family invariants only,
the five named kin sources, keyframes.js published `.d.ts`, web sources cited inline.
Probe artifact: `F1-SCALAR-SPINE.probe.mjs` (this directory — analytic spring + follower
simulation, `node F1-SCALAR-SPINE.probe.mjs` reruns it; output quoted in §3).

Tooling note (registry follow-up): DesignSync IS reachable from this seat — `ToolSearch
select:DesignSync` loads the full schema. The round-zero unavailability did not reproduce.

---

## 1. What the kin already gives the family

The scalar-spine shape half-exists in the tree; the family formalizes and extends it rather than
inventing it.

- **The spine publication precedent is live today.** `useDockMorph.ts:79-86` writes
  `--dock-morph-t` per frame onto the dock root; descendants consume it through pure calc
  transfers — `crossfade.css:122` (`clip-path: inset(0 calc((1 − var(--dock-morph-t)) * 100%) 0 0)`),
  `layers.css:159` (`opacity: calc(1 − var(--dock-morph-t))`), `morph.css:59/63` (the
  direction-alias `--dock-expand-t`). One inheriting per-frame scalar, per-element transfer
  functions in CSS — the F1 architecture in miniature, single-surface.
- **The two drive regimes are engine-native.** `SpringProgress` (keyframes.js `.d.ts`): closed-form
  analytic step, `reset(value, velocity)` seeding, `set target` re-seats from current
  `(value, velocity)` — C¹ by construction — plus `subscribe`, managed `play`, PRM amplitude-scale
  policy, and vector lanes (`setTargets`/`tickVector`/`values`/`velocities` — K channels stepped in
  one call under one `(ω, ζ)`). `Draggable` (`DragOptions`): pointer-capture follow, 100ms
  velocity-windowed release sampling, `transform` (client coord → value domain), `bounds {min,max}`,
  `rubberBand` (boundary + excess × factor, default 0.4), `snap[]` (nearest-target re-seat via
  projected `decayRest`). `useDockSpring` re-bases a live episode carrying prior velocity;
  `useDragMorph` wires the whole gesture and proves the PRM contract (gesture functions, physics
  off, instant snap).
- **The velocity facility exists and is already universal-by-intent.** `useLiquidFlex` computes the
  saturating term `tanh(|ṫ|·k)`; `writeVelocityWeight` folds it into `--motion-weight` on the
  driving element; `--flex-vel` is registered `inherits: false` precisely so the per-frame write
  invalidates one element (property-regs.css §18 comment: "the subtree-storm bite").
- **The two invalidation disciplines coexist in the codebase already.** Hot per-element channels
  are `inherits: false` (`--flex-vel`); semantic cascading scalars are `inherits: true`
  (`--motion-weight`, `--cartoon-press-t` — the latter explicitly "inherits so the inert child
  reads its host's press scalar"). `--dock-morph-t` is unregistered (inherits by default) and
  written per frame. The charter's worry that the spine must be `inherits: false` misreads the
  house rule: the rule fences per-element velocity channels, not bounded-subtree spines.

Gap inventory against the family's needs: no extended domain (the dock spine runs [0,1] with no
overpull margin), no follower/channel-clock construct (all desync today is curve-shape), no detent
vocabulary beyond release-snap, no transient-catch policy, and the squish/velocity facility is
per-consumer wiring rather than a spine-published channel.

## 2. Prior art + the 2026 platform floor

Named prior art for the architecture itself:

- **UIKit `UIViewPropertyAnimator.fractionComplete`** — the native scrub: an interruptible
  animator whose position is a settable fraction; catch mid-flight, scrub, reverse
  ([Apple forums thread](https://developer.apple.com/forums/thread/107431), [Gitter, Building
  Better iOS App Animations](https://medium.com/swiftkickmobile/building-better-ios-app-animations-swift-uiviewpropertyanimator-ca05728b1fa4)).
  The corpus behavior (everything is a scrub) is this API's design language.
- **Motion (motion.dev) `MotionValue` + `useTransform`** — one scalar updated outside the render
  cycle; per-element values are pure transforms (range maps or functions) subscribed to it
  ([Motion values](https://motion.dev/docs/react-motion-value),
  [useTransform](https://motion.dev/docs/react-use-transform)). The closest web embodiment of the
  spine + transfer-function contract; validates the authoring surface as range-pairs, not keyframes.
- **The iOS rubber-band law** — `f(x, d, c) = (x·d·c)/(d + c·x)`, `c = 0.55` in UIScrollView
  ([Lobanov, How UIScrollView works](https://medium.com/@esskeetit/how-uiscrollview-works-e418adc47060)).
  Saturating — displacement approaches an asymptote as the finger travels arbitrarily far. MARKS §2
  measures exactly this (finger travels far, dock caps at ~60-70px). Note: kf's `rubberBand` is
  LINEAR (`boundary + excess × 0.4`) — unbounded in the deep-pull limit. The hyperbolic law is
  expressible today through `DragOptions.transform` (map the raw coordinate before bounds apply),
  zero engine edits.
- Rejected off-main-thread scrub route: Animation Worklet never reached cross-engine viability;
  scroll-timelines superseded it (F2's turf). Negative-`animation-delay` keyframe scrubbing is
  keyframe soup by construction — fails the charter's authoring bar regardless of support.

The Safari-2026 platform floor for CSS-side transfers, version-cited:

| capability | Safari | Chromium | note |
|---|---|---|---|
| `@property` registration (typed, `inherits`, transitions) | 16.4 | long-standing | [MDN, Registering properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Properties_and_values_API/Registering_properties) |
| `exp()`, `pow()`, `log()`, `sqrt()`, `abs()`, `sign()` in calc | 15.4 | all modern by early 2024 | [caniuse exp functions](https://caniuse.com/wf-exp-functions), [Wilson, The New CSS Math](https://danielcwilson.com/posts/mathematicss-powers/), [caniuse tracking issue #6207](https://github.com/Fyrd/caniuse/issues/6207) |
| `progress(value, start, end)` | 26 | yes (Firefox: no — `clamp()` fallback) | [CSS-Tricks, Touring New CSS Features in Safari 26](https://css-tricks.com/touring-new-css-features-in-safari-26/), [Merchant, The progress() function](https://www.amitmerchant.com/the-progress-function-css/) |
| `linear()` easing | 17.2 | 113+ | [WebKit Features in Safari 17.2](https://webkit.org/blog/14787/webkit-features-in-safari-17-2/), [caniuse linear()](https://caniuse.com/mdn-css_types_easing-function_linear-function) |
| scroll-driven `animation-timeline` | 26 | yes | same Safari-26 tour; F2's mechanism, listed for boundary clarity |

Consequences: a transfer band is one declaration on the floor engines —
`clamp(0, (var(--gl-t) − B0) / (B1 − B0), 1)` everywhere, `progress(var(--gl-t), B0, B1)` where
Safari 26/Chromium-only is acceptable; a smooth sigmoid is expressible via `exp()`; a directional
gate via `sign()`. No keyframes, no WAAPI objects, no worklets.

Invalidation cost, sourced: Chromium ≥84 does dependency-aware custom-property invalidation — only
nodes whose computed style references the changed property recalc
([Fernández, Improving CSS Custom Properties performance](https://blogs.igalia.com/jfernandez/2020/08/13/improving-css-custom-properties-performance/));
the web.dev `@property` benchmark finds `inherits: false` meaningfully cheaper and WebKit's results
"more similar to Chromium" (Firefox faster than both)
([web.dev, Benchmarking @property performance](https://web.dev/blog/at-property-performance)).
Neither source gives a Safari-specific per-frame number for a card-sized consuming subtree — that
stays a remaining unknown (R1) for the browser seat.

## 3. The probe — the family's hard question, moved

`f1-probe.mjs` implements the same closed-form underdamped/critical spring as `SpringProgress`
(iOS parametrization ω = 2π/response) plus first-order followers with asymmetric attack/release
clocks, and checks the family's claims against the MARKS measured tables. Full output below;
numbers are ms.

**A. The purity claim fails on close — proven, quantified.** A close spine (flick-seeded, 1→0)
with the open-authored symmetric fade transfer (complete by t=0.25) puts the fade START at 172ms
and END at 460ms — dead last. Measured close: fade DONE by ~170ms, blur relaxing until ~620ms.
The charter's suspicion is confirmed numerically: a memoryless direction-symmetric `f(t)` cannot
produce the CC close order. No curve reshaping fixes it — the order itself inverts.

**B. The follower bank reproduces both directions with ONE parameterization.** Channels are
first-order followers chasing targets derived from the spine's published state `(value, velocity,
target)`; hysteresis lives in follower state and clock asymmetry, never in the spine:

- medium: position-keyed occupancy target (`t > 0.02`), attack τ 25ms / release τ 140ms
- content fade: TARGET-keyed (the spine's committed intent), attack τ 65ms / release τ 55ms
- stretch: the spine itself (open response ≈ 0.95s critical; close flick-seeded)

| scenario | probe | measured (MARKS §5) |
|---|---|---|
| open: medium 95% | 106ms | ≤ ~100ms cliff |
| open: fade 95% | 193ms | 150-250ms |
| open: stretch 90% | 589ms | ~600-650ms |
| open: fade:stretch | 1:3.1 | ~1:4 |
| close: fade out (5%) | 163ms | ~170ms |
| close: empty-medium beat | 172ms | 100-200ms |
| close: medium gone | 681ms | ~620ms |
| interrupt: medium minimum | 0.46 — never resolves | blur held featureless, never cleared |
| interrupt: fade minimum | 0.23 — content leaves, re-enters | content out 13.63, re-enters 14.22 |

The one structural discovery: the content-fade channel must key on the spine's TARGET (commit
intent), not its position — position-keyed fade closes at 506ms (wrong); target-keyed closes at
163ms (right). The spine's published state therefore includes `T` (current target), which the
engine already exposes (`SpringProgress.target` getter).

**C. Register fits, and a MARKS-internal contradiction surfaced.** Down-overpull springback
(return ~150px, overshoot 40-70px past rest): under linear second-order dynamics with v0 = 0, the
measured overshoot fits ζ ≈ 0.28-0.38 (probe: ζ 0.3 → 56px @ 236ms), NOT the ζ ≈ 0.5-0.65 MARKS §2
itself states (ζ 0.5 → 24px; ζ 0.65 → 10px). Velocity seeding does not rescue the higher ζ — even
2000px/s at ζ 0.6 reaches only 28px. The two MARKS claims are mutually inconsistent; the denser
24fps burst (MARKS wishlist #1) is the arbiter. Separately: the DOCK preset (0.3, ζ 0.82) yields a
2px overshoot on this gesture — it cannot be the overpull register; and the top-pin snapback
(130px in ≤83ms, ~170ms tail, no visible overshoot) fits a fast near-critical clock — response
0.20-0.22 covers 108-113px of 130 in 83ms with settle at 102-122ms, i.e. the press-register end,
NOT dock. The bound registers are asymmetric in clock as well as compression, consistent with
MARKS §2's "asymmetric in feel."

Register consequence: two NEW registers — `pin-release` ≈ (0.22, 0.75±0.05) and
`overpull-springback` ≈ (0.40±0.05, 0.30-0.38 provisional) — housed as per-primitive LOCAL
registers (the ScrubberTimeline seam documented in `springPresets.ts`), because the
overpull register's ~35-45% overshoot violates the global table's overshoot ∈ [0%,10%] fence and
the fence should stand for one-shot UI settles.

## 4. Unknowns table

Resolved this pass:

| # | unknown (charter language) | resolution | evidence |
|---|---|---|---|
| U1 | close inverts channel order; pure `f(t)` is direction-symmetric | CONFIRMED failure of pure transfers (fade lands last, 460ms vs measured 170ms); resolved by the follower bank — per-channel first-order followers with asymmetric (attack, release) clocks chasing targets derived from spine `(value, velocity, target)` | probe A + B tables above |
| U2 | medium persists across interrupted cycles; `f(t)` is memoryless | memory lives in follower STATE, spine stays memoryless; interrupt probe: medium min 0.46 across a caught dismissal, matching the held featureless blur | probe C |
| U3 | C¹ handoff at release | engine-native: `Draggable` re-seats the spring from `(value, releaseVelocity)` over a 100ms velocity window; `set target` re-seats C¹; `useDockSpring` carries velocity across episodes | keyframes.js `.d.ts` DragOptions/SpringProgress; `useDockSpring.ts:87-117` |
| U4 | the extended domain `[−μ, 1+μ]` and its margins | `bounds` + `rubberBand` exist in `DragOptions`; kf's linear law is wrong for deep pulls (unbounded) — the saturating iOS hyperbolic law `x·d·c/(d+c·x)` goes in `DragOptions.transform`, zero engine edits; μ is then a domain constant per side, and the in-margin compression transfer (width −7.5%/height −21% down, ~−1% up) is an ordinary transfer of t < 0 / t > 1 | `.d.ts` DragOptions; Lobanov source; MARKS §2 |
| U5 | transfer authoring without keyframe soup | one-declaration calc bands on the Safari floor: `clamp()` ramp (universal), `progress()` (Safari 26/Chromium), `exp()`/`sign()` sigmoids and gates (Safari 15.4+), `linear()` for measured curve shapes (Safari 17.2+); per-element cost is one static band-constant property + one calc | §2 table with citations |
| U6 | which spring register serves the bounds | dock preset is NOT the bound register (2px overshoot); pin-release ≈ press-clock near-critical; overpull-springback ζ ≈ 0.30-0.38 provisional; both live as per-primitive local registers to preserve the global ≤10% overshoot fence | probe D/E |
| U7 | CSS var publication contract precedent | the inheriting per-frame subtree spine already ships (`--dock-morph-t`, unregistered, root-written, descendant-calc-consumed); the `inherits: false` house rule fences per-element velocity channels, not spines — both disciplines coexist in property-regs.css | kin reads §1 |
| U8 | DesignSync availability (registry follow-up) | reachable from this seat; schema loads via ToolSearch | this session |

Remaining — with the owning follow-up:

| # | unknown | why it stays open | next move |
|---|---|---|---|
| R1 | Safari per-frame style-recalc cost of a 60fps inheriting spine var over a card-sized subtree (~40 consuming elements) | offline sources establish dependency-aware invalidation (Chromium ≥84) and WebKit ≈ Chromium on the @property benchmark, but no Safari number for this exact shape | browser-seat trace in pass 2: recalc ms/frame, Safari 26 vs Chrome, card demo at 60fps |
| R2 | CSS-transition followers (registered custom props with per-state `transition-duration` — the free attack/release asymmetry) under rapid scrub reversal in Safari | spec-correct (retarget interpolates from current computed value) but unverified in Safari paint; JS followers are the proven fallback and the probe's shape | 2-element scratch page on the browser seat; if red, followers stay JS-side (no architecture change) |
| R3 | exact overpull (ζ, f) | MARKS §2 self-contradicts (stated ζ 0.5-0.65 vs measured 40-70px overshoot ⇒ ζ 0.28-0.38); the 24fps burst (MARKS wishlist #1) arbitrates | re-burst + refit; spec carries the provisional register with both brackets noted |
| R4 | two concurrent gestures (card jockey + tab swap on one surface) | composition rule designed, not exercised: one spine per SURFACE, an element consumes exactly one spine, cross-surface coupling only through followers (the Find My card swap is three concurrent spines per MARKS §6, not one composite) | prototype in the spec build; acceptance = the f-0097-0117 three-channel swap |
| R5 | compositor residency of `clip-path`/`filter` channels riding `calc(var(--t))` in Safari during per-frame spine writes | paint-vs-composite attribution is engine-specific and unmeasurable offline | browser-seat trace alongside R1 |

## 5. The shape a spec for this family should take

One kernel, one follower construct, one authoring surface, one detent policy, stated bounds.

1. **The spine kernel — `useSurfaceSpine` (name illustrative).** Owns exactly one scalar per
   liquid surface on the extended domain `[−μ_down, 1 + μ_up]` (μ asymmetric — the down margin is
   deep, the up margin shallow, per MARKS §2). State published to JS subscribers and to CSS:
   `--gl-t` (unregistered or `@property inherits: true`, written per frame on the surface root —
   the `--dock-morph-t` contract, generalized), plus the spine's `(velocity, target, regime)` on
   the JS surface only. Regimes: `scrub` (finger-mapped through `Draggable` with the hyperbolic
   rubber-band in `transform`, `bounds` at the domain edges), `glide` (release: the engine's
   velocity-seeded spring, `snap` at the terminal detents), `parked` (settled — zero rAF, the
   self-dispose discipline `useDockSpring` already has). PRM: the spine seats instantly
   (`respectReducedMotion`), and every follower must ALSO seat (CSS-transition followers get
   `transition: none` under the PRM media query; JS followers snap). The pre-commit taffy zone is
   a scrub-regime dead-band: the first ~40px of pull map into `t < t_commit` with the compression
   transfer live and the growth transfer at 0.
2. **The follower bank — the desync and hysteresis construct.** A channel = one follower scalar
   chasing `g_c(spine state)` under an (attack, release) clock pair. Exactly three follower kinds
   cover the corpus: position-keyed (medium/blur: occupancy threshold, fast attack, slow release),
   target-keyed (content fade: commit intent, fast both ways), and identity (stretch: the spine
   itself). Probe-fitted starting constants: medium (25ms, 140ms), fade (65ms, 55ms). Depth
   grading (rows travel ~20% farther per MARKS §5) and periphery lag (~100ms) are per-element
   transfer parameters, not new followers. Implementation is dual: CSS-transition followers
   (registered `<number>` channel props, per-state durations — declarative, zero per-frame JS)
   where R2 verifies green; JS followers (a trivial integrator in the spine's `onFrame`, or the
   engine's vector lanes where one clock serves several channels) otherwise. The spine remains the
   only gesture-coupled object; the bank is where memory legitimately lives.
3. **The transfer authoring surface.** Per element: `--gl-band` constants (static, set once in the
   template) + one calc declaration per channel property. The reveal ladder is a utility class
   with a per-rung index custom property; rung N's band is `calc(0.4 + 0.1 * var(--gl-rung))` per
   MARKS §6. Curve vocabulary: `clamp()` ramp (floor), `progress()` (preferred where available),
   `exp()`-sigmoid for the blur cliff, `sign()` gates for direction-scoped effects. Squish
   channels compose the existing `--stretch`/`--flex-vel`/`--motion-weight` vocabulary — the spine
   feeds `writeVelocityWeight` with `tanh(|ṫ|·k)` so the momentum facility generalizes to every
   component (the task's ALL-components clause) through the register that already exists.
4. **The detent policy.** Terminal detents are `DragOptions.snap` (engine-side). The transient
   mid-detent catch is a spine-owner scheduler: on release, if the glide's projected path crosses
   a weak well at |v| above a threshold, retarget the well; on arrival-or-170ms, retarget onward —
   every retarget is C¹ via `set target`. No engine fork, no potential-field integrator.
5. **Registers.** In-domain morphs stay on DOCK. Two per-primitive local registers: `pin-release`
   (≈ 0.22, ≈ 0.75) and `overpull-springback` (≈ 0.40, ζ 0.30-0.38 provisional pending R3), housed
   in the consuming primitive with the springPresets.ts local-register seam, keeping the global
   overshoot fence intact.
6. **Acceptance targets.** The probe's table IS the paint-verify contract: open 106/193/589,
   close 163 + 172 beat, interrupt medium-min ≥ 0.4 — measured off captured paint per the live-π
   law, tolerances ±1 frame at 60fps.

Honest boundary: the spine does not own cross-SURFACE choreography (the Find My tab-triggered card
swap runs three concurrent spines — outgoing card, incoming card, map reframe); whatever conducts
multiple surfaces is another family's center, and F1 composes under it by publishing each spine's
state.

## Sources

- [MARKS.md](../../../analysis/MARKS.md) — the measured corpus, all §-references
- [CSS-Tricks, Touring New CSS Features in Safari 26](https://css-tricks.com/touring-new-css-features-in-safari-26/)
- [Amit Merchant, The new progress() function in CSS](https://www.amitmerchant.com/the-progress-function-css/)
- [caniuse, Exponential functions (CSS)](https://caniuse.com/wf-exp-functions) · [caniuse tracking issue #6207](https://github.com/Fyrd/caniuse/issues/6207)
- [Daniel C. Wilson, The New CSS Math: pow(), sqrt(), and exponential friends](https://danielcwilson.com/posts/mathematicss-powers/)
- [WebKit, WebKit Features in Safari 17.2](https://webkit.org/blog/14787/webkit-features-in-safari-17-2/) · [caniuse, linear() easing](https://caniuse.com/mdn-css_types_easing-function_linear-function)
- [web.dev, Benchmarking the performance of CSS @property](https://web.dev/blog/at-property-performance)
- [Javier Fernández (Igalia), Improving CSS Custom Properties performance](https://blogs.igalia.com/jfernandez/2020/08/13/improving-css-custom-properties-performance/)
- [MDN, Registering custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Properties_and_values_API/Registering_properties)
- [Motion, Motion values](https://motion.dev/docs/react-motion-value) · [Motion, useTransform](https://motion.dev/docs/react-use-transform)
- [Apple Developer Forums, UIViewPropertyAnimator fractionComplete](https://developer.apple.com/forums/thread/107431) · [Nathan Gitter, Building Better iOS App Animations](https://medium.com/swiftkickmobile/building-better-ios-app-animations-swift-uiviewpropertyanimator-ca05728b1fa4)
- [Ilya Lobanov, How UIScrollView works](https://medium.com/@esskeetit/how-uiscrollview-works-e418adc47060)
- keyframes.js published types: `node_modules/@mkbabb/keyframes.js/dist/keyframes.d.ts` (SpringProgress, Draggable, DragOptions)
- kin sources read in full: `useDockSpring.ts`, `useDragMorph.ts`, `useLiquidFlex.ts`, `springPresets.ts`, `writeVelocityWeight.ts`, `useDockMorph.ts:77-86`, `property-regs.css` (§ --flex-vel, --motion-weight), `supportsCssTimeline.ts`
