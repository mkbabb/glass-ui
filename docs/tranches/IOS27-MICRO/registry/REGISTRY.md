# REGISTRY — the approach-family registry (IOS27-MICRO, round zero)

Seat: the round-zero Fable portfolio seat. Verified model: `claude-fable-5` (system context:
"The exact model ID is claude-fable-5"). Minted 2026-07-17.

Tooling note: DesignSync was unreachable from this seat (`ToolSearch select:DesignSync` returned
no match; keyword search surfaced no design MCP tool). The design thinking ran through the
frontend-design skill (`frontend-design:frontend-design`, loaded) per the charter's fallback
clause. Pass-1 seats should re-probe for DesignSync availability.

The problem, whole: dock-to-card growth + magnetic overpull + the liquid tab lens + the two-tier
material + desynchronized multi-clock choreography + velocity/momentum tracking for ALL
components — recreated in idiomatic glass-ui and CSS, Safari 2026 the common denominator,
compositor-first. Measured physics in `../analysis/MARKS.md`; every family below is a complete
formulation of that whole problem with a different architectural center. No family is favored at
round zero; researchers in pass 1 receive the task statement plus ONE family charter.

---

## Family F1 — SCALAR-SPINE

**Center.** Everything is a projection of one normalized scalar. Each liquid surface owns a
single progress scalar `t` on an extended domain (roughly `[−μ, 1+μ]` — the overpull margins are
part of the domain, not an exception). Exactly two drive regimes, per MARKS §6: under the
gesture, `t` is finger-mapped (a scrub — position is a pure function of the gesture); on
release, `t` is a spring seeded with release velocity (the keyframes.js `SpringProgress` +
`Draggable` kernel the library already wires). Every visual channel — card-top travel, side
breathing, volume squish, the per-element reveal ladder, blur ramp, glow — is a pure per-element
transfer function of `t`, published as CSS custom properties and consumed by compositor-only CSS.
Desync is spatial, not temporal: the fade channel's transfer completes by `t≈0.25` while the
stretch channel spans the full domain (the 1:4 ratio as curve shape); the blur cliff is a steep
sigmoid near `t=0`; the reveal ladder is the MARKS §6 band table (handle 0–5%, title ghost
10–30%, row N at 40%+10%·N). Detents are wells in the spring's target landscape; the mid-detent
catch is a weak well crossed at speed.

**Charter (what a pass-1 researcher receives).** Design the one-scalar architecture end to end:
the domain and its overpull margins, the two drive regimes and their handoff (C¹ at release),
the transfer-function authoring surface (how a consumer declares "this element's opacity is this
curve of `t`" without keyframe soup), the detent-well model including the transient catch, and
the CSS var publication contract (registered properties, invalidation scope). Answer the
family's hard question: the CC close inverts channel order versus open (content leaves first,
medium relaxes after — MARKS §5) and the medium persists across interrupted cycles; a pure
`f(t)` is direction-symmetric and memoryless. Show how the spine expresses hysteresis and lag —
directional transfers, lagged follower taps off the spine, or an honest boundary where the
family hands off.

**Kin.** `src/components/dock/composables/useDockSpring.ts` (the one `SpringProgress` owner),
`src/composables/motion/morph/useDragMorph.ts` (the `Draggable` wiring — velocity-windowed
sampling, fling re-seat, native snap), `src/composables/motion/spring/useLiquidFlex.ts` (the
element-less `drive(t)` squish projection — this family's shape in miniature),
`src/composables/motion/spring/springPresets.ts`, `src/composables/motion/core/writeVelocityWeight.ts`.
The Find My height-mapped reveal (MARKS §6: reveal state a pure function of held height) is the
family's existence proof in the corpus.

**Risks / open questions.** Hysteresis and channel-order inversion erode the purity claim; a
transfer-function authoring surface can bloat into per-element curve soup; per-frame CSS var
fan-out must respect the `inherits: false` single-element invalidation discipline; surfaces with
two concurrent gestures (jockey + tab swap) may need two spines and a composition rule.

**Status.** ACTIVE.

---

## Family F2 — NATIVE-SCROLL SUBSTRATE

**Center.** The platform's scroller IS the physics engine. The expandable surface is literally
an overflow container (or a driven scroll proxy): detents are `scroll-snap` stops (the
mid-detent a proximity stop), the scrub regime is scroll-driven animation
(`animation-timeline: scroll()/view()`) with the reveal ladder authored as `animation-range`
bands on a shared timeline, release momentum is the native fling — velocity inheritance for
free, no JS integrator on the main path. Overpull is Safari's own overscroll rubber-band at the
container bounds. JS appears only where the platform is silent: a scroll-velocity read drives
the compression channel (the −7.5%/−21% volume squish is not native), and a probe gates the
whole substrate (`supportsCssTimeline.ts` already ships hardened detection). Zero idle rAF by
construction — the scroll engine sleeps when the finger lifts and the fling ends.

**Charter.** Design the scroller-as-physics architecture: the container anatomy (what scrolls,
what is pinned chrome — the tab bar never travels, content slides under it, MARKS §6 note 5),
the snap-stop layout including a weak mid-detent, the `animation-range` authoring of the full
reveal ladder, the overscroll story (how the native rubber-band is read or mirrored so the
compression body can deform with it), and the velocity bridge for the squish channel. Answer
the family's hard questions: overscroll position is not exposed to `scroll()` timelines — find
the honest observation channel; native snap decelerates into a stop and cannot pin PAST a
detent under a held finger (MARKS §1: the 250ms pin at 1442 then a 130px snapback) — determine
what the platform can express and what needs a driven proxy; and characterize trackpad/wheel
versus touch feel divergence on macOS Safari.

**Kin.** `src/composables/motion/scroll/supportsCssTimeline.ts` (the hardened probe),
`scrollReader.ts`, `useScrollProgress.ts`, `useScrollPin.ts`, `useScrollScene.ts`,
`src/styles/tokens/scroll-tokens.css`, `src/composables/dom/useDragVelocity.ts` (the
drag-window-gated velocity bridge pattern this family's squish channel would mirror).

**Risks / open questions.** Safari 2026 scroll-driven-animation coverage and its compositing
with `backdrop-filter` must be probed, not assumed; overscroll observability is the family's
load-bearing unknown; the held-pin-past-detent and the ~170ms transient catch may be
inexpressible natively (a driven scroll proxy re-admits JS physics and must be priced); snap
timing is UA-controlled — the measured springback (ζ≈0.5–0.65, one overshoot, ≤250ms) may not be
tunable.

**Status.** ACTIVE.

---

## Family F3 — CHANNEL CONDUCTOR

**Center.** N coupled clocks — desync by coupling constants, not by authored curves. A conductor
primitive owns a rack of named channels per surface — medium, geometry, content, periphery,
light — each a follower of the gesture scalar with its own coupling law: a near-instant cliff
(medium, ≤100ms), an exponential follower with time constant τ (fade, τ≈120–150ms), a spring
with (response, ζ) (geometry, ~600ms decelerating), a delayed follower (periphery, +100ms). The
MARKS §5 choreography falls out of the constants: fade completes at ~¼ of stretch because
τ_fade ≈ response_geometry/4, never because someone authored two timelines. Close-order
inversion is per-channel release law (content releases immediately, medium holds then relaxes);
the empty-blur beat is emergent from the gap between those laws. Depth-graded travel (+20% for
deeper rows) is a per-row gain on the geometry channel. One rAF integrates the rack and parks
when settled — `useLeadTrail` is literally this family at N=2 (lead spring, trail follower,
emergent release-at-arrival).

**Charter.** Design the conductor: the channel taxonomy (is five the right rack? per-surface
manifests?), the coupling-law vocabulary and its declaration surface (how a component states
its manifest tersely), interrupt semantics (every channel carries its own state across a
mid-flight catch — the CC blur held featureless between cycles is the acceptance case, MARKS
§5), the park/wake contract (no idle rAF), and the CSS publication seam (channels write
registered vars; CSS stays compositor-only). Answer the family's hard questions: prove this is
the generalization of the shipped kernel and not a second animation authority (state its exact
relation to `SpringProgress` and `useLeadTrail`); and show the manifest stays tractable for a
library consumer — a conductor so general it reads "animations, again" has dissolved.

**Kin.** `src/composables/motion/morph/useLeadTrail.ts` (the N=2 proof — one rAF, parks when
settled, emergent release), `src/composables/motion/core/motionTempo.ts` (the one TIME scalar
both worlds read), `useStagger.ts`/`useStaggerReveal.ts` (the degenerate fixed-delay case),
`useDockSpring.ts`, `springPresets.ts` (the (response, ζ) vocabulary the sprung channels must
speak).

**Risks / open questions.** The no-second-engine fence — this family lives or dies on being the
kernel's generalization, not its rival; manifest authoring complexity versus per-component
adoption across ~100 components; cross-channel invariants under interruption are subtle
(channel A caught mid-flight while channel B has settled); vacuous-generality is the named
failure mode.

**Status.** ACTIVE.

---

## Family F4 — ENERGY FIELD

**Center.** Momentum as a shared medium every component taps — the minimal universal facility.
One gesture-energy scalar per interaction scope: pointer velocity, scroll velocity, and spring
velocity all fold through a saturating `tanh` into an energy in [0,1], published as one
registered CSS custom property (the `--motion-weight` lineage). Components couple to the field
through a style contract, not an engine: deformation is a field read (scale smear along the
travel axis, volume-preserving), the engagement glow is a field threshold (the Find My whole-bar
wash on press — MARKS §3), specular events are field-gated (light motion reserved for
engagement, never idle — MARKS §4). Delivery to every component is a directive plus a token
contract (`v-momentum` + per-role gain), not N engines. Position choreography is deliberately
out of scope — the field composes with any position substrate; the family's claim is that the
breath of life (hallmarks 2, 5, 6's momentum-for-all) is field coupling, and that this is the
cheapest thing that gives ALL ~100 components momentum.

**Charter.** Design the field: the energy definition and its folding rule (multiple concurrent
sources, nested scopes, double-counting), the write discipline (event-scoped rAF only — the
drag-window-gated pattern; zero idle cost; `inherits: false` single-element invalidation), the
consumption contract (the directive's surface, the per-role gain table so a button, a card, and
a dock do not smear identically), the threshold grammar for glow/specular gating, and PRM
behavior (field pinned to 0, affordances survive as non-motion state). Answer the family's hard
questions: prove it stands alone as the universal momentum answer rather than dissolving into a
helper library for other families — name the components for which field coupling ALONE
delivers the hallmark feel; and defend against the uniform-gimmick failure (everything smearing
the same way reads as a filter, not as life).

**Kin.** `src/composables/motion/core/writeVelocityWeight.ts` (the exact seed —
`--motion-weight = 0.618 + 0.382·flexVel`, self-extinguishing),
`src/composables/dom/useDragVelocity.ts` (`--atom-drag-v`, drag-window-gated rAF, the no-idle
contract, the bounded tanh smear), `src/composables/motion/pointer/usePointerVelocityField.ts`
(the renderer-side push model), `useLiquidFlex.ts` (`--flex-vel`), the `--motion-weight` /
`--motion-tempo` / `--ui-scale` three-scalar fence (`motionTempo.ts`).

**Risks / open questions.** Scope composition (nested fields, concurrent sources) is unsolved;
the family cannot express detents, reveal ladders, or the lens — its pass-1 output must draw
that boundary honestly or it is a library, not a family; per-role gain tables are a design
surface that could sprawl; a shared inheriting var would be a subtree-storm — the publication
model must stay per-element.

**Status.** ACTIVE.

---

## Family F5 — OPTICAL MEDIUM

**Center.** Medium, body, light — the material is the architecture. Every liquid region
decomposes into three strictly-separated layers, each with its own substrate and its own clock:
the MEDIUM — the persistent blur/dim field (a `backdrop-filter` surface) that changes
near-instantly (≤100ms) and NEVER resets across interrupted cycles (the CC empty-blur beat and
the held featureless scrim are first-class states, MARKS §5); the BODY — the two-tier glass
geometry (container glass; control glass riding it, never sharing its surface) deforming as one
transform tree, content deforming with container (the overpulled dock scales its text with the
pill — MARKS §2/§4); the LIGHT — a separate luminous layer owning the lens capsule, bloom,
specular line, and engagement wash, in which the traveling tab lens is ONE continuous body —
light leads, geometry follows (MARKS §3: the goo blob spans 2.5 slots as glow before the
capsule re-forms; the oversized arrival is scale AND light). Choreography IS the layer
contract: medium cliffs, light leads, body follows sprung, content rides body; on close the
order inverts and the medium is last to relax.

**Charter.** Design the three-layer material system: the layer anatomy and z/DOM contract
against arbitrary consumer content, the two-tier token budgets (container vs control blur/
opacity/rim — the 1px top rim light is load-bearing, MARKS §4), the medium's persistence
state machine across interrupts, and the light layer's traveling-lens mechanism (goo filter,
layered pseudo-elements, or a driven highlight body — `usePagerWorm`'s Arm A filter merge with
the Arm B clip-path degrade floor is the shipped precedent) including press-charge, the
oversized ~110–120% arrival held ~200ms, the cool-down, and the best-iOS requirement that
sibling labels stay legible under the traveling bloom (MARKS §3 note 5). Answer the family's
hard question: defend the decomposition as load-bearing architecture, not implementation
detail — the CC interrupt evidence (the medium persisting independently while content cycles)
is the existence proof to build on.

**Kin.** `src/styles/glass/liquid-fill.css` (the one-register two-tier precedent),
`glass-atom.css`, `glass-capsule.css`, `src/styles/tokens.css`,
`src/components/pager-dots/composables/usePagerWorm.ts` (Arm A/B goo + degrade floor),
`useSelectionIndicator.ts`/`useLeadTrail.ts` (lens travel drivers), the IOS27-CODEX material
laws 1–4 (`docs/tranches/BJ/formation/ios27/IOS27-CODEX.md` — progressive backdrop, adaptive
tint, specular caustic, radius grammar).

**Risks / open questions.** A traveling `backdrop-filter` capsule re-samples its backdrop every
frame — Safari cost must be measured, and the light layer may need to be luminance-composited
rather than blurred; three layers per region multiplies DOM against ~100 components — the
contract must compose, not clone; adaptive tint (codex law 2) remains an unshipped dependency;
the family must not quietly absorb the physics question — it states which family's clock drives
the body layer or supplies its own minimal one.

**Status.** ACTIVE.

---

## Rejected at round zero (named so pass 1 does not respend it)

**View-transition snapshot morphing.** Safari's same-document view transitions morph between
snapshots; the outgoing snapshot is precisely the "one prerendered bitmap" defect MARKS names as
the anti-goal (§1 note 1), the Safari lens blink writ large (§3) — and snapshot pairs cannot be
caught and reversed mid-flight in the interrupt-catch sense (§5). Not an ACTIVE family. May
re-enter only for the app-zoom transitions, which are outside the seven hallmarks and the one
place the corpus itself is fire-and-forget.

---

## Cross-family invariants (every family honors these; they are acceptance targets, not style)

**The MARKS-measured physics.**
- Growth asymmetry: the bottom edge stays pinned at its inset; the top travels; sides breathe
  +4–5%; icons emerge clipped from under the bottom margin (MARKS §1).
- The reveal ladder is per-element fade+rise (~30–60px), handle → title ghost → icons → labels →
  next section; the surface never presents as one prerendered bitmap (MARKS §1).
- Overpull = translate + volume compression, bottom-anchored, content deforming with the
  container (down: width −7.5%, height −21%; past-detent up: ~−1% — magnitude scales with how
  forbidden the region is); springback overshoots once (~30–50% of overpull) and settles inside
  ~250ms, ζ≈0.5–0.65, ~2–2.5Hz (MARKS §2).
- The pre-commit taffy zone: ~40px of stretch before the expansion gesture engages (MARKS §2).
- The lens is ONE continuous body across the morph — press-charge at the source, glow wash
  across the bar, oversized ~110–120% arrival held ~200ms, cool-down to rest; sibling labels
  stay legible beneath the traveling bloom — the one place we best iOS outright (MARKS §3).
- Three channels, three clocks: medium ≤100ms, fade ≈¼ of stretch, stretch ~600ms decelerating;
  close inverts the order and keeps the 100–200ms empty-medium beat; periphery lags ~100ms;
  deeper rows travel ~20% farther (MARKS §5).
- Two regimes on every expandable component: scrub under gesture (state a function of position),
  spring seeded with release velocity after; overshoot only on fast arrival — never synthetic
  bounce on a slow place; detents magnetic both directions, the transient catch ~170ms as a weak
  well crossed at speed (MARKS §6).
- Everything is a scrub: every phase catchable and reversible mid-flight with state carried
  over; nothing in hallmark scope is fire-and-forget (MARKS, Beyond the hallmarks).

**The bounds.**
- Safari 2026 is the common denominator; Chrome+Safari both verified in paint. Feature use is
  probe-gated (`supportsCssTimeline.ts` is the pattern), and the degrade floor is honest — no
  masking fallback; a primary works in paint or fails loud.
- Compositor-first: transform/opacity/filter only on the hot path; never an animated width; no
  idle rAF (drivers park when settled, velocity bridges are event-window-gated — the R3b
  budget).
- The two-tier material rule: container glass and control glass have distinct blur/opacity
  budgets; a control never shares its container's surface. Text rides at full contrast on any
  tint; specular and light motion are reserved for engagement, never idle (MARKS §4, codex laws
  1–4).
- PRM: under `prefers-reduced-motion: reduce`, drivers seat instantly at target — zero
  in-between frames; engagement affordances survive as non-motion state.
- One spring vocabulary: `springPresets.ts` is the single named-register authority; any family
  kernel states its exact relation to `SpringProgress` (generalization, consumer, or bridge) —
  never a silent second authority.
- Evidence discipline: prototype claims carry captured paint evidence (screenshot + paired
  before/after), per the live-π law; a green-headless/broken-paint gap is not a pass.
