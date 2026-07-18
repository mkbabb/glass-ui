# F3 CHANNEL-CONDUCTOR — pass-1 research digest (IOS27-MICRO)

verified-model: claude-fable-5 (system-context model ID, verbatim). Seat F3. 2026-07-17.

Scope honored: REGISTRY.md read only at §Family F3 + §Cross-family invariants. MARKS.md read in
full. Kin sources read in full. Probe run offline (node)—no browser owned.

## Summary

The family's riskiest unknown—whether a rack of per-channel coupling laws driven by ONE gesture
scalar reproduces the MARKS §5/§6 measured choreography emergently—is RESOLVED by a numerical
probe (`conductor-probe.mjs`, scratchpad; results below). Four laws (cliff, first-order follower,
second-order spring, dead-time delay), one integrator, zero authored timelines: every MARKS band
lands, the close-order inversion and the empty-medium beat emerge from per-channel release laws,
interrupts compose per-channel with the medium persisting across cycles, one park predicate covers
the heterogeneous rack, and the desync ratios survive `--motion-tempo` scaling. The no-second-engine
fence is resolvable by construction: the conductor is `useLeadTrail` generalized from N=2 to a named
rack—same hand-rolled semi-implicit-Euler + exponential-follower math, same park/PRM contract—and a
consumer of the `springPresets` vocabulary, not a rival of `SpringProgress`. The main remaining
unknown is the adoption boundary: the conductor earns its keep only on gesture-coupled surfaces
(roughly 6–10), not across ~100 components—the CSS-only degenerate manifest (per-property
durations/delays + `linear()` spring tokens) already expresses one-shot desync without JS.

## 1. Prior art—web, 2026 state of the art

- **Apple, Designing Fluid Interfaces (WWDC18)**: interfaces are interruptible, redirectable;
  motion starts from the current on-screen value and inherits gesture velocity. The conductor's
  scrub/release two-regime contract is this doctrine restated. Sources:
  [WWDC18 sample survey](https://github.com/FradSer/FluidInterfacesSwiftUI),
  [Gitter, Building Fluid Interfaces](https://medium.com/@nathangitter/building-fluid-interfaces-ios-swift-9732bb934bf5).
- **Apple, Animate with springs (WWDC23)**: retargeting preserves velocity—the spring re-seats its
  closed form from live `(x, v)`. `SpringProgress` already implements exactly this.
  [developer.apple.com/videos/play/wwdc2023/10158](https://developer.apple.com/videos/play/wwdc2023/10158/).
- **Motion for React (v12, 2026)**: the closest web prior art to the channel rack—motion values
  compose as follower graphs (`useSpring` can follow another motion value; `useTransform` derives;
  `useVelocity` differentiates). It proves the follower-graph model at library scale, but the graph
  is assembled ad hoc per component—no per-surface manifest, no cross-channel park predicate, no
  per-direction release laws. [motion.dev/docs/react-motion-value](https://motion.dev/docs/react-motion-value),
  [motion.dev/docs/react-use-spring](https://motion.dev/docs/react-use-spring).
- **Control theory names the vocabulary**: the four coupling laws are the classical first-order lag
  (τ), second-order system (ωₙ, ζ), and transport delay (dead time)—standard process-dynamics
  primitives, not invented curves. [apmonitor.com/pdc SecondOrderSystems](https://apmonitor.com/pdc/index.php/Main/SecondOrderSystems).
- **GSAP-style authored timelines are the rejected pole**: fixed timeline offsets cannot scrub,
  inherit velocity, or carry state through an interrupt—the REGISTRY family center ("desync by
  coupling constants, not by authored curves") is the differentiator.
- **Safari 2026 support truth (version-cited)**:
  - `@property` (registered custom properties—the var publication seam): Safari 16.4, Chrome 85,
    Firefox 128 ([caniuse](https://caniuse.com/mdn-css_at-rules_property)). Safe unconditionally.
  - `linear()` easing (sampled-spring CSS tokens): Safari 17.2, Chrome 113, Firefox 112
    ([caniuse](https://caniuse.com/mdn-css_types_easing-function_linear-function)). Safe—already
    shipped as `--spring-*` tokens (scheme-spring.css:99).
  - Scroll-driven animations (`animation-timeline: scroll()/view()`): Safari 26.0 (Sept 2025),
    threaded off-main in Safari 26.4, progress-accuracy fixes 26.5; Firefox stable still flagged
    (Interop 2026 item) ([WebKit: Safari 26.0 features](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/),
    [WebKit scroll-driven guide](https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/),
    [caniuse](https://caniuse.com/mdn-css_properties_animation-timeline_scroll)). In-budget for
    Safari-2026-common-denominator, probe-gated per `supportsCssTimeline.ts`.
  - No native CSS `spring()`; sampled `linear()` remains the CSS-side spring idiom
    ([Comeau](https://www.joshwcomeau.com/animation/linear-timing-function/)).

## 2. Codebase kin—what exists vs what the family needs

| kin | what it is | conductor relation |
|---|---|---|
| `motion/morph/useLeadTrail.ts` | hand-rolled spring lead + exponential trail, ONE rAF, parks on a joint predicate (lines 164–207), PRM seats instantly (222–229, 242–248) | the N=2 conductor, literally—rack `{lead: spring(0.68,0.64), trail: follow(τ0.27, source: lead)}`. Already contains source-routing (trail follows lead, not the target) and the park/wake contract. The conductor generalizes THIS file, not `SpringProgress` |
| `@mkbabb/keyframes.js SpringProgress` (dist d.ts ~3545) | analytic 2nd-order solver, velocity-continuous retarget, PRM amplitude scaling, managed `play()`; SoA vector lanes `setTargets`/`tickVector` | lanes share ONE `(ω, ζ, ω_d)` per instance (d.ts: tickVector runs "under this spring's (omega, zeta, omegaD)")—a heterogeneous rack CANNOT ride one instance. Per-channel SpringProgress instances would mint N rAFs (each `play()` owns one). So the conductor hand-rolls, per the useLeadTrail/usePointerVelocityField engine-free precedent |
| `dock/composables/useDockSpring.ts` | the ONE SpringProgress owner for the dock band; velocity-inheriting re-base (lines 87–117); tempo co-scaling (line 100) | stays as-is for single-scalar dock morphs; the conductor must reuse its re-base idiom (release seeds spring channels with live velocity) |
| `motion/core/motionTempo.ts` | the one TIME scalar; read at construction, `response *= tempo` | every conductor time constant (τ, response, hold, delay) scales by tempo at construction—probe test F shows the desync RATIOS are tempo-invariant |
| `motion/reveal/useStagger.ts` / `useStaggerReveal.ts` | fixed-delay setTimeout cascade / IO-gated reveal; native `view()` path defers to CSS | the degenerate dead-time case. Do NOT absorb—a setTimeout cascade is cheaper than a rAF integrator for one-shot reveals; the no-second-engine argument runs both ways |
| `spring/springPresets.ts` | the single named `(response, ζ)` authority | sprung channels declare `preset: "dock"` etc.—the conductor is a CONSUMER of this table, never a second register |
| `motion/core/useRAFLoop.ts` | scope-aware rAF chassis—but under PRM it PAUSES (lines 98–113, 124–133) | WRONG chassis for the conductor: PRM must SEAT at target (zero in-between frames), not freeze mid-state. Hand-roll the loop as useLeadTrail does |
| `motion/pointer/usePointerVelocityField.ts` | push-API gesture dynamics—position→velocity→acceleration derived chain, no own rAF | the momentum-tracking facility lives HERE (gesture layer); the conductor consumes `(g, ġ_release)`, never raw pointers—clean seam, no duplication |
| `motion/core/writeVelocityWeight.ts` + `tokens/property-regs.css` (`--flex-vel` inherits:false line 128; `--motion-weight` 346; `--motion-tempo` 378) | the per-frame registered-var write precedent—one element, non-inheriting, single-element invalidation | the CSS publication seam pattern: channels write registered vars on the surface root; CSS derives transform/opacity/filter |
| `scroll/supportsCssTimeline.ts` | positive+negative `CSS.supports` probe (rejects lying shims) | the gate pattern for any hybrid CSS-timeline scrub path |

## 3. The probe—MARKS §5/§6 reproduced from coupling constants

`/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/e79fce3f-d24e-4654-8b27-d029653fedbe/scratchpad/conductor-probe.mjs`
(node, dt=1/120s, spring sub-stepped ×8 per the useLeadTrail scheme). Rack:
`medium: cliff(τ_rise 0.03, release: hold 0.25 + τ 0.17)` · `content: follow(τ 0.07, τ_close 0.055)` ·
`geometry: spring(response 0.6, ζ 1.0)` · `periphery: delay(0.10) + follow(τ 0.07), source: content`.

| test | measured | MARKS target | result |
|---|---|---|---|
| A open: medium t90 | 67ms | ≤100ms cliff (§5) | PASS |
| A open: fade t90 | 158ms | 150–250ms (§5) | PASS |
| A open: geometry t99 | 633ms | ~600–650ms decelerating (§5) | PASS |
| A open: fade/stretch ratio | 0.250 | ~1:4 "fade faster than stretch" (§5) | PASS—emergent, τ_fade vs response, nothing authored |
| A open: periphery lag | 142ms | 80–160ms rail delay (§5) | PASS |
| B close: content out | 158ms | ~170ms (§5) | PASS |
| B close: empty-medium beat | 117ms | 100–200ms design band (§5 note 2) | PASS—emergent from the gap between release laws |
| B close: medium out | 642ms | ~620ms total (§5) | PASS |
| C interrupt (close caught at 120ms, re-opened) | max per-frame step 0.12 (law-bounded, no state reset); medium min 1.000 over the whole episode; all channels re-settle; park predicate true | §5: dismissal caught mid-flight, blur medium never resolved between cycles | PASS—per-channel state carry is free when every law integrates from live state |
| D slow scrub (2.5s ramp) | geometry overshoot 0.00% | §6: a slow place lands dead | PASS |
| D flick v0=4 / v0=15 | 0.00% / 1.17% overshoot | §6: overshoot only when arriving fast | PASS—analytic: a critically damped channel seeded with release velocity overshoots iff v₀ > ωₙ·Δ; the two-regime rule needs NO mode switch |
| D dock preset (0.3, ζ0.82), v0=6 | 1.0% overshoot peak 242ms, inside 0.5% by 317ms | §2 one-overshoot settle | PASS (the §2 deep-overpull 30–50% springback wants the underdamped ζ≈0.5–0.65 register at the bound—a per-regime law override, vocabulary already covers it) |
| E park | rack settled (all four laws within ε) at 883ms; integrator parks | no idle rAF (bounds) | PASS |
| F tempo ×1.3 | fade/stretch ratio 0.253 | desync survives `--motion-tempo` | PASS—ratios are tempo-invariant by construction |

Probe-driven vocabulary finding: the laws MUST be direction-asymmetric. The measured open/close pairs
(stretch 600ms open vs content-led ~170ms close; medium cliff-in vs hold-then-relax out) are not one
constant per channel—they are one constant PER DIRECTION per channel, plus a release `hold`
(dead-time) on the medium. The manifest needs `open:`/`close:` overrides as first-class.

## 4. The no-second-engine fence—exact relation statement

- **To `useLeadTrail`**: the conductor is its generalization—N named channels instead of the fixed
  {lead, trail} pair, the same integration schemes (semi-implicit Euler spring, exponential
  follower), the same one-rAF/park/seat contract. useLeadTrail should eventually be expressible AS a
  two-channel manifest, and stays shipped as the specialized N=2 primitive.
- **To `SpringProgress`**: consumer of its vocabulary, not a rival. Sprung channels speak
  `(response, ζ)` resolved through `springPreset(name)`—no second register. The conductor does not
  wrap SpringProgress: vector lanes are homogeneous in `(ω, ζ)` and per-instance `play()` loops
  would fork N rAFs. Single-scalar sprung morphs (the dock box) KEEP `useDockSpring`/`SpringProgress`;
  the conductor exists only where ≥2 channels with DIFFERENT laws follow one gesture scalar.
- **To `useStagger`/`useStaggerReveal`**: not absorbed. Fixed-delay one-shot cascades stay
  setTimeout/CSS-owned; the conductor's dead-time law is for gesture-coupled periphery only.
- **Engine-free**: `vue`-only imports, `/motion-core`-eligible, hand-rolled math—the
  useLeadTrail/usePointerVelocityField precedent, no keyframes edge.

## 5. Unknowns table

| # | unknown (REGISTRY) | status | evidence |
|---|---|---|---|
| U1 | coupling constants reproduce MARKS §5 emergently (τ_fade ≈ response/4 etc.) | RESOLVED | probe tests A/B/F—all bands hit, ratio 0.250, beat 117ms, tempo-invariant |
| U2 | cross-channel invariants under interruption (A mid-flight, B settled) | RESOLVED | probe test C—every law integrates from live state, so a retarget at any instant is continuous per channel; medium persisted at 1.000 across the interrupted cycle (the CC acceptance case) |
| U3 | park/wake across heterogeneous laws | RESOLVED | probe test E—joint predicate (spring pos+vel ε, follower ε, delay queue drained) fires at 883ms; wake = scrub/release, the useLeadTrail contract |
| U4 | no-second-engine fence—relation to SpringProgress/useLeadTrail | RESOLVED (design) | §4 above; keyframes d.ts vector lanes are (ω,ζ)-homogeneous; useLeadTrail is the N=2 proof in-tree |
| U5 | PRM contract | RESOLVED | per-channel seat-at-target on `drive` under PRM (useLeadTrail:222–229 pattern); `useRAFLoop` is disqualified as chassis—it pauses (freezes) under PRM rather than seating |
| U6 | two-regime (scrub vs velocity-seeded release) | RESOLVED | probe test D—overshoot iff v₀ > ωₙ·Δ for ζ=1; no synthetic bounce possible by construction |
| U7 | direction-asymmetric laws needed in the vocabulary | RESOLVED (new) | probe B; MARKS open-vs-close constants differ per channel |
| U8 | CSS publication seam | RESOLVED (pattern) | registered non-inheriting vars per channel (property-regs.css precedent), JS writes on the surface root only, CSS derives transform/opacity/filter; @property Safari 16.4, linear() 17.2, scroll-driven 26.0 (cited §1) |
| U9 | manifest tractability / adoption boundary (~100 components) | REMAINING (bounded) | de-scope resolves most of it: CSS-only per-property durations/delays + `--spring-*` linear() tokens ARE the degenerate manifest for one-shot open/close—no JS. The conductor mounts ONLY on gesture-coupled surfaces (dock, sheet/card, scrim, lens, pill carousel: ~6–10). Needs a pass-2 surface census |
| U10 | per-frame var-write cost with N conductors live | REMAINING | one non-inheriting element-scoped write is the shipped writeVelocityWeight cost; N-surface stress needs a browser measurement (this seat owns no browser) |
| U11 | light channel ownership (bloom/specular fed by \|v\|) | REMAINING (cross-family) | MARKS §3/§4 reserve light for engagement; whether light is a conductor channel or another family's domain is a round-two boundary call |
| U12 | hybrid CSS-timeline scrub (Safari 26.4 threaded) for the scrub regime | REMAINING | attractive—scrub on a threaded CSS timeline, JS rack only after release; gate via the supportsCssTimeline positive+negative probe; needs a paint-verified prototype |
| U13 | overpull rubber-band ratio | REMAINING (upstream) | MARKS §2 "felt not measured"—needs the denser burst; affects the g(finger) mapping, not the rack |

## 6. The shape a spec for this family should take

**Primitive**: `useConductor(manifest)`—engine-free, `/motion-core`-eligible, one hand-rolled rAF,
parks on the joint predicate, PRM seats every channel.

```ts
const c = useConductor({
  el: surfaceRoot,                       // optional: registered-var publication root
  channels: {
    medium:    { law: "cliff",  tau: 0.03, close: { hold: 0.25, tau: 0.17 } },
    geometry:  { law: "spring", preset: "dock" },              // or { response, zeta }
    content:   { law: "follow", tau: 0.07, close: { tau: 0.055 } },
    periphery: { law: "follow", tau: 0.07, delay: 0.10, source: "content" },
  },
  onFrame(values, velocities) { /* one DOM write site, or omit and use vars */ },
});
c.scrub(g);                 // gesture-live: every channel follows g this frame
c.release(target, v);       // seeds sprung channels with release velocity (useDockSpring re-base idiom)
c.seat(g);                  // instant (mount / resize / PRM)
```

- **Law vocabulary (four, closed)**: `cliff` (fast follower + release hold), `follow` (first-order
  lag), `spring` (`springPreset` name or `(response, ζ)`), `delay` (transport delay + source
  routing). Every law takes optional `open:`/`close:` overrides. No fifth law without a MARKS-grade
  measurement demanding it—this is the vacuous-generality fence.
- **Channel roles are conventions, not a fixed enum**: the rack is name-keyed; `medium/geometry/
  content/periphery/light` are documented role names with default laws so a typical manifest is ≤5
  lines. Depth grading is NOT a channel: publish `geometry × (1 + 0.2·depthIndex)` per row—one
  integrator, N gains (MARKS §5 note 3).
- **Two regimes, one API**: `scrub` while the gesture is down (state = f(position)—the MARKS §6
  height-mapped ladder), `release` with velocity after. Interrupt = calling `scrub` mid-release;
  every law continues from live state (probe C).
- **Tempo**: all time constants ×`motionTempo(el)` at construction—ratios invariant (probe F).
- **CSS seam**: per-channel registered vars (`@property`, `inherits: false`, property-regs.css
  precedent), written only on the surface root; CSS maps vars → transform/opacity/filter. Honest
  cost statement in the spec: a per-frame var write is a one-element style recalc, not a
  compositor-offloaded animation—the animated properties stay compositor-cheap, the write does not.
  The degenerate no-JS manifest (per-property `transition-duration`/`-delay` + `--spring-*`
  `linear()` tokens) is the documented default for one-shot surfaces.
- **Acceptance**: reproduce probe tests A–F in-browser with captured paint evidence (the live-π
  law); the CC interrupt-catch (medium persistence) is the acceptance case named by the charter.

## Sources

- https://developer.apple.com/videos/play/wwdc2023/10158/
- https://github.com/FradSer/FluidInterfacesSwiftUI
- https://medium.com/@nathangitter/building-fluid-interfaces-ios-swift-9732bb934bf5
- https://motion.dev/docs/react-motion-value
- https://motion.dev/docs/react-use-spring
- https://apmonitor.com/pdc/index.php/Main/SecondOrderSystems
- https://webkit.org/blog/17333/webkit-features-in-safari-26-0/
- https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/
- https://caniuse.com/mdn-css_at-rules_property
- https://caniuse.com/mdn-css_types_easing-function_linear-function
- https://caniuse.com/mdn-css_properties_animation-timeline_scroll
- https://www.joshwcomeau.com/animation/linear-timing-function/
