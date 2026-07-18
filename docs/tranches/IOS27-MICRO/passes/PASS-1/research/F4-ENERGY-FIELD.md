# F4 ENERGY-FIELD — pass-1 research digest (IOS27-MICRO)

Verified model: `claude-fable-5` (system context: "The exact model ID is claude-fable-5"). Seat F4, pass 1, 2026-07-17.

Charter: momentum as a shared medium every component taps — one gesture-energy scalar per interaction scope, published as a registered CSS custom property, consumed through a style contract (`v-momentum` + per-role gain), position choreography deliberately out of scope. Physics targets: `../../../analysis/MARKS.md`. Family charter: `../../../registry/REGISTRY.md` §F4.

Tooling note: DesignSync IS reachable from this seat (`ToolSearch select:DesignSync` loaded the full schema) — the round-zero registry note ("DesignSync was unreachable") is stale for pass 1. Not used here; this is a research seat.

---

## 1. What exists — the kin audit

Five kin read in full. The velocity plumbing is further along than the charter implies: three source kinds already exist, two publication targets are registered, and the two-delivery directive pattern the family needs is already shipped for specular. What does NOT exist: the unified scalar, the fold rule, the scroll→CSS bridge, the directive, and the role table.

| kin | what it is | law / publication | field-relevant gap |
|---|---|---|---|
| `src/composables/dom/useDragVelocity.ts` | pointer channel, drag-window-gated rAF, no-idle contract, PRM pins 0 | `tanh(0.06·px/frame)`, EMA 0.35/0.65, **clamped 0.7**, writes `--atom-drag-v` | `--atom-drag-v` is UNREGISTERED — untyped, inherits by default; the 0.7 clamp lives in the source (see §4 U3) |
| `src/composables/motion/core/writeVelocityWeight.ts` | the exact seed — folds `flexVel` into `--motion-weight = 0.618 + 0.382·v`, self-extinguishing; `effectiveCap` site-local getter | writes `--flex-vel` (registered, `inherits:false`) AND `--motion-weight` (registered, **`inherits:true`**) per frame | the per-frame `--motion-weight` write invalidates the driver's whole subtree every frame — the exact subtree-storm the charter fences (§4 U2) |
| `src/composables/motion/spring/useLiquidFlex.ts` | spring/travel channel — element-less projection; `flexVel = tanh(|Δt|·k)`, k=1.6; drive-call-scoped (no clock) | `velStyle` → `--flex-vel` | element-less by design; the consumer wiring is manual per site — no directive |
| `src/composables/motion/pointer/usePointerVelocityField.ts` | renderer-side push model: position→velocity→acceleration→burst + engagement envelope + mass-spring attractor; no own rAF, `tick(0)` PRM freeze | JS refs only, NO CSS var (per-second, frame-rate-independent) | the richest physics in the repo but viz-only; its engagement envelope (half-life ease of `active`) is the charge-state primitive the glow grammar needs |
| `src/composables/motion/scroll/useScrollTrigger.ts` + `scrollReader.ts` | scroll channel — `velocity` ref in px/s (`Δpos/Δt`, frame-rate-independent), direction with flip-debounce | JS ref only, NO CSS var | the missing third source kind; publication + event-window gating unbuilt |
| `src/composables/glass/vSpecular.ts` + `createSpecularWriter` | NOT velocity — but the DELIVERY PRECEDENT: dependency-free `ObjectDirective` wrapping one writer core, composable for the `:style`-ref case, PRM-aware, host-geometry rule | writes `--mouse-x/y`; intensity rungs `--glass-specular-intensity-{rest,hover,active}` | the exact two-delivery shape `v-momentum` should copy; the rung grammar is the seam for energy thresholds |
| `src/composables/motion/core/motionTempo.ts` | the three-scalar fence: `--motion-tempo` (TIME) ⟂ `--motion-weight` (MAGNITUDE) ⟂ `--ui-scale` (GEOMETRY), never folded | inheriting scalars, read at construction | the field's scalar is a FOURTH kind — live ENERGY — and must be fenced from all three, not folded into weight (§4 U2) |
| `src/composables/motion/spring/springPresets.ts` | the single named-spring authority | pure data | F4's relation: CONSUMER only — the field reads spring velocity (`useSpring().velocity`, `flexVel`), mints no springs, no second authority |

Registrations found (`src/styles/tokens/property-regs.css` §18): `--flex-vel` `<number>` `inherits:false` initial 0 (comment names `inherits:false` as load-bearing against the subtree storm); `--motion-weight` `<number>` `inherits:true` initial 0.618 (driver/observer scope-pin semantics — inheriting is the mechanism); `--ui-scale`, `--motion-tempo` inheriting identity scalars.

## 2. Prior art + platform truth (2026)

**No CSS-native velocity primitive exists.** Scroll-driven animations expose progress only; the spec explainer explicitly defers velocity-dependent effects to rAF ([scroll-animations-1 EXPLAINER](https://github.com/w3c/csswg-drafts/blob/main/scroll-animations-1/EXPLAINER.md): effects "that depend on scroll velocity" continue via rAF). Safari ships scroll-driven animations in 26.0 ([WebKit: features in Safari 26.0](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/)) with four reliability fixes in 26.5 ([WebKit: Safari 26.5](https://webkit.org/blog/17938/webkit-features-for-safari-26-5/)) — so the timeline substrate is on the 2026 baseline, but velocity is not in it. A JS event-window write remains the only honest source.

**The pure-CSS velocity hack is real but disqualified.** Bramus derives scroll velocity in CSS from two identically scroll-driven `@property` numbers, one lagged via `transition-delay` on a child; the difference is a signed velocity ([bram.us: CSS scroll detection](https://www.bram.us/2023/10/23/css-scroll-detection/)). Known artifacts: stale values on direction flips, input-device-dependent update rates, constant main-thread invalidation, and a required parent/child stagger pair. It was Chromium-115-only when written; the ingredients now exist in Safari 26+, but the artifacts are disqualifying for a universal facility — named here so pass 2 does not respend it.

**`inherits:false` invalidation is measured, and the number is decisive.** web.dev benchmarked registered-property style invalidation: ~4.67µs/run with `inherits:false` vs ~3.96ms/run with `inherits:true` on a large subtree — roughly 850x — because a non-inheriting change invalidates exactly one element ([web.dev: @property performance](https://web.dev/blog/at-property-performance)). Same article: custom properties, registered or not, animate/update on the main thread — the field's writes are cheap style pokes, never compositor animations; the properties they FEED (`transform`, `opacity`, `filter`) are the compositor story. Caveat carried as U6: the benchmark is Chrome; Safari symmetry is asserted by spec behavior but unverified in paint from this browserless seat.

**`@property` baseline.** Safari 16.4+, Chrome 85+ ([MDN @property](https://developer.mozilla.org/en-US/docs/Web/CSS/@property)) — comfortably inside the Safari-2026 floor; registration of every hot var is free to mandate. Typed `<number>` custom properties are transitionable, which enables a no-rAF release-bleed (§6, decay clause).

**High-fidelity pointer sampling is on the floor.** `getCoalescedEvents()`/`getPredictedEvents()` shipped in Safari 18.2 ([WebKit: features in Safari 18.2](https://webkit.org/blog/16301/webkit-features-in-safari-18-2/)) — the pointer channel may fold coalesced samples for velocity estimation on 120Hz displays instead of one sample per rAF.

**Velocity-as-value is settled prior art in JS motion libraries.** Framer Motion/Motion exposes `useVelocity` over any MotionValue — the canonical scroll-velocity→skew mapping is a two-line compose ([motion.dev scroll animations](https://motion.dev/docs/react-scroll-animations); [tutorial](https://dev.to/leduc1901/create-velocity-scroll-animation-in-react-with-framer-motion-ko7)). GSAP's InertiaPlugin tracks per-property velocity (`InertiaPlugin.track()`/`getVelocity`) and seeds momentum throws from it ([gsap.com InertiaPlugin](https://gsap.com/docs/v3/Plugins/InertiaPlugin/)). Both are engine-shaped — a MotionValue graph or a tween registry. Neither publishes to a style contract; F4's differentiation is exactly the engine-free CSS-var publication + role-gain consumption. Nothing found in 2025–2026 art that ships "energy as a CSS custom property contract" as a library facility — the field would be genuinely novel at this altitude.

## 3. The fold probe — the riskiest unknown, moved

Offline numeric probe (`scratchpad/f4-fold-probe.mjs`, node, 120fps sim): a MARKS-§6-shaped gesture — drag ramping to 1150px/s, release into the dock spring (response 0.68, ζ 0.64) seeded with release velocity toward a 130px target (the §1 snapback) — energies via the existing `tanh(0.06·px/frame)` law, four folds compared: `MAX(e_i)`, `min(1,Σe_i)`, probabilistic OR `1−Π(1−e_i)`, and raw-sum-then-saturate.

| scenario | result |
|---|---|
| A. handoff continuity | every fold continuous — max frame jump 0.032, and E(release)=0.811 on both sides of the handoff. Continuity is a property of VELOCITY SEEDING (the spring channel is born at the energy the pointer channel dies at), not of fold choice |
| B. double-count (two channels carry the SAME 900px/s motion) | MAX inflation 1.00x; PROB_OR 1.28x; RAW_SAT 1.32x; SUM_CLMP 1.40x — MAX is the only double-count-immune fold |
| C. independent mid sources (scroll 400 + drag 400 px/s) | MAX 0.380 (no additivity); PROB_OR 0.616; SUM 0.760 |
| D. MARKS dynamic range through the existing law | slow drag 280px/s→0.27, peak rise 1200→0.83, free-fall 1570→0.92, fling 2600→0.99 — but the 0.7 clamp flattens everything ≥1150px/s to one value, destroying the §6 fast/faster distinction |
| E. release tail | the pointer channel's EMA drain (0.818→0.532→0.346…) is subsumed by the seeded spring channel (0.811 at +0ms, 0.729 at +50ms) under MAX — instant-zero teardown is safe exactly when a seeded successor exists |

**The ruling the probe licenses.** Scenario B's double-count case is not hypothetical — it is the scrub regime, where a position-follower's velocity ≈ the pointer's velocity by construction. But MARKS §6's two regimes are TEMPORALLY EXCLUSIVE: under gesture the pointer owns the motion; after release the spring owns it. So the fold rule is three-layer, and mostly structural rather than arithmetic:

1. **Kind-exclusive channels per scope** — one pointer, one scroll, one spring channel; a scope never registers two of a kind.
2. **Regime gating** — while a gesture is live in a scope, that scope's spring channel is muted (the two-regime law, enforced in the fold); the handoff frame is continuous because the spring is seeded (scenario A/E).
3. **Residual fold = MAX across kinds; hypot across axes within a kind** — MAX because it is the only inflation-proof fold (B) and because scenario C's non-additivity is CORRECT for a body: a card being dragged inside a scrolling page is one body with one dominant motion, and 0.38+0.38 reading as 0.76 would be the uniform-gimmick failure arriving through arithmetic. Vector hypot within a kind keeps diagonal drags honest.

## 4. Unknowns table

| # | unknown (charter) | status | evidence |
|---|---|---|---|
| U1 | fold rule — concurrent sources, double-counting, handoff | **RESOLVED** | probe §3: kind-exclusive + regime-gated + MAX residual; seeding, not folding, carries the handoff (jump ≤0.032) |
| U2 | publication model — per-element vs subtree storm | **RESOLVED** (design) | web.dev: 4.67µs vs 3.96ms per invalidation (~850x). Hot scalar registered `inherits:false`, written per consuming element by the directive (fan-out `setProperty` is cheap; invalidation = exactly the consumers). Split from the weight: `--motion-weight` stays the inheriting POLICY scalar written only at state changes; the field scalar is the non-inheriting LIVE scalar written per frame. Two seed deviations to cure: `writeVelocityWeight` writes inheriting `--motion-weight` per frame (subtree invalidation each frame); `--atom-drag-v` is unregistered (inherits by default, untyped) |
| U3 | publish clamped or raw | **RESOLVED** | probe D: the 0.7 clamp erases the 1150-vs-2600px/s distinction MARKS §6 measures. The field publishes unclamped tanh-saturated [0,1]; caps move into role gains (the slider keeps 0.7 in ITS role row — feel byte-identical) |
| U4 | CSS-native source (no-JS option) | **RESOLVED — none** | scroll-animations-1 explainer defers velocity to rAF; the Bram.us stagger hack disqualified on artifacts (§2). JS event-window writes stay the mechanism |
| U5 | family-vs-library boundary | **RESOLVED** (drawn in §5) | field = modulation plane; position = carrier plane; the components field coupling ALONE serves are named |
| U6 | Safari-side invalidation symmetry for `inherits:false` per-frame writes; energy-modulated transform over `backdrop-filter` surfaces (Safari backdrop re-sample cost) | **REMAINING** | web.dev benchmark is Chrome; this seat owns no browser. Needs one live paint probe: a 30-consumer scroll list + one glass (backdrop-filter) card under per-frame energy writes, Safari 26, trace captured |
| U7 | universal gain k feel | **REMAINING** (bounded) | k=0.06/px-frame gives the right ORDER (probe D spread 0.27→0.99 across MARKS velocities) but feel-tuning is a paint matter; the constant is already shipped in the slider so the default is de-risked |
| U8 | scroll channel closing edge — `scrollend` on the Safari-2026 floor | **REMAINING** (small) | the no-idle contract needs a teardown edge; `scrollend` support in Safari unverified this pass. Fallback named: 160ms scroll-quiet debounce, identical contract |
| U9 | glow threshold grammar — fourth `charged` rung vs energy-scaled existing rungs | **REMAINING** (design, low risk) | the `--glass-specular-intensity-{rest,hover,active}` rungs are the seam; whether energy multiplies `active` or mints `charged` is a pass-2 spec decision with MARKS §3's press-charge (glow BEFORE travel) as the acceptance |

## 5. The boundary, drawn honestly

**Field coupling ALONE delivers the hallmark feel for:** scroll containers and lists (velocity smear/skew + the §5 depth-graded gain — deeper rows get higher gain, one row-index scalar); Slider/knob/handle drag smear (shipped today as `--atom-drag-v`); the whole-bar engagement wash on press (MARKS §3 press-charge — an engagement-envelope threshold read, no travel needed); specular gating everywhere (light motion only above an energy floor — MARKS §4's "never idle on cards" becomes a mechanical guarantee); button/control press glow; content-deforms-with-glass (descendant elements reading the same scope's energy at content-role gain — MARKS §2's one-body law); the pre-commit taffy tell (dock stretch scaling with pull velocity in the ~40px zone).

**Field coupling CANNOT express:** detents and magnetic wells, the reveal ladder, the lens's continuous body and its travel, the CC three-clock choreography, any position spring. These are carrier-plane concerns. The family's standalone claim is the MODULATION plane: every carrier (whatever family wins position) and every static component reads one scalar for how ALIVE its surface is right now. It is a family, not a library, because the contract is closed (one scalar + one directive + one role table) and because six of the named consumers above need NO carrier at all.

**Uniform-gimmick defense.** Roles differ in KIND, not magnitude alone: container smears anisotropically along the travel axis (volume-preserving, the `useLiquidFlex` reciprocal); control glows before it deforms; content counter-lags (the cast/lag read); lens blooms (light, not geometry); periphery delays ~100ms (MARKS §5's rail stagger as a field-side delay). Five roles, five different verbs off one scalar — the same number never produces the same motion twice.

## 6. The exact spec shape for pass 2

1. **The scalar.** One registered non-inheriting triple per scope, written on each consuming element: `--energy` (unclamped saturated magnitude, `tanh(k·|v|)`, k continuous with the shipped 0.06/px-frame law) plus signed components `--energy-x`, `--energy-y` (e·direction) for axis-aware consumers. `<number>`, `inherits:false`, `initial-value:0`. Fenced as the fourth scalar kind: ENERGY (live) ⟂ `--motion-weight` (MAGNITUDE policy, inheriting, event-written only — the per-frame weight write in `writeVelocityWeight` is cured here) ⟂ `--motion-tempo` (TIME) ⟂ `--ui-scale` (GEOMETRY).
2. **Channels.** Pointer (generalize `useDragVelocity`: drag-window rAF, EMA, coalesced-event sampling where available, publish unclamped); scroll (bridge `scrollReader.velocity` px/s through the same tanh, scroll-event-window-gated, closed by `scrollend` or the U8 debounce); spring (`useSpring().velocity` / `flexVel` at drive-call cadence, born SEEDED at release). Kind-exclusive per scope; regime-gated (gesture mutes spring); fold MAX across kinds, hypot across axes.
3. **Delivery.** `v-momentum[:role]` — a dependency-free `ObjectDirective` wrapping one writer core, plus the composable for `:style`-ref cases: the exact `vSpecular`/`createSpecularWriter` two-delivery pattern, host-geometry rule included (the write lands on the deforming box). Scope = the directive host; nested scopes DO NOT inherit energy (non-inheriting var makes this structural); a child couples to an ancestor scope only by explicit directive arg — double-counting prevented by construction.
4. **The role table.** Closed set of five: `container / control / content / lens / periphery` — each row {gain, deformation verb, glow threshold, specular threshold, delay}. Components pick a role, never a number. Sprawl fence: adding a row requires a tranche amendment, same as the affordance-map's closed five.
5. **Threshold grammar.** `glow ≥ θ_g` (seed 0.25 — probe D puts the MARKS slow drag at 0.27, exactly at the floor: a slow place shows no fireworks, per §6 note 3), `specular ≥ θ_s` (seed 0.6), charge on engagement-envelope (pointerdown, independent of velocity — MARKS §3 press-charge precedes travel). Resolve U9 against the existing intensity rungs.
6. **Write discipline + decay.** Event-window rAF only, no idle loops (unit: no rAF survives release/scrollend); teardown snaps to 0 when a seeded successor channel exists (probe E), otherwise bleeds via a typed-property CSS transition (~150ms) so a tap-release never pops — the transition is main-thread like any custom-property change, but it is UA-driven and window-bounded.
7. **PRM.** Field pinned 0, rAF never opens (the shipped `useDragVelocity` pattern); glow affordances survive as non-motion state through the existing rung fallbacks.
8. **Proof.** The U6 Safari paint probe (30-consumer list + glass card, trace + screenshot delta, Chrome AND Safari per the live-π law); the no-idle unit; a fold-continuity unit replaying probe scenario A; byte-identical-feel regression on the slider (U3 cap relocation).
9. **Cleanup ledger.** Register `--atom-drag-v` or absorb it into `--energy`; cure the per-frame inheriting `--motion-weight` write; `useLiquidFlex.velStyle` consumers migrate to the directive where an element exists.

## Sources

- [MARKS.md](../../../analysis/MARKS.md) — measured physics, §§1–6
- [web.dev: Benchmarking the performance of CSS @property](https://web.dev/blog/at-property-performance)
- [bram.us: Style an element based on scroll direction and speed](https://www.bram.us/2023/10/23/css-scroll-detection/)
- [w3c csswg scroll-animations-1 EXPLAINER](https://github.com/w3c/csswg-drafts/blob/main/scroll-animations-1/EXPLAINER.md)
- [WebKit: features in Safari 26.0](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/) · [Safari 26.5](https://webkit.org/blog/17938/webkit-features-for-safari-26-5/) · [Safari 18.2](https://webkit.org/blog/16301/webkit-features-in-safari-18-2/)
- [MDN: @property](https://developer.mozilla.org/en-US/docs/Web/CSS/@property)
- [motion.dev: scroll animations / useVelocity](https://motion.dev/docs/react-scroll-animations) · [velocity-scroll tutorial](https://dev.to/leduc1901/create-velocity-scroll-animation-in-react-with-framer-motion-ko7)
- [GSAP InertiaPlugin](https://gsap.com/docs/v3/Plugins/InertiaPlugin/)
- Probe: `f4-fold-probe.mjs` (session scratchpad; results reproduced in §3)
- Kin: paths in §1, all read in full this pass
