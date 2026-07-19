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

**PASS 1 (2026-07-18) — ADVANCE, convergence 62%.** The core proved in Chrome 150 paint (browser
seat: PROVES): one spine + asymmetric-clock follower bank reproduces the CC choreography and the
Maps bound physics, scrubbed and caught mid-flight, rAF parked after every settle; the
target-keyed fade is a real structural discovery. Heavy gaps (CRIT-F1): zero Safari evidence;
gate bands re-fit to the sim, not the corpus; the mid-detent catch unfalsifiable and off-policy;
the H1 mechanism fork (clip-path shipped vs translateY+scaleY specced, R5 open); two follower
parameterizations under a one-parameterization banner. Pass-2 charter sharpened: Safari battery
first; MARKS-derived gate bands; projected-path catch with a landing band; one blessed
parameterization + the scrub-intent law written jointly with F3; H3 demoted to clocks-and-seam
or probed on a slot axis; H6 ownership ceded to F4; the PRM scenario() seed fixed before any
re-run.

**PASS 2 (2026-07-18) — ADVANCE, MERGED into SPINE-CONDUCTOR (key F1×F3), convergence 78%.**
PROVES-IN-WEBKIT (full battery, geometry parity to the hundredth, H4 blur-rides-opacity
answered on the video path) + re-verify 7/7 under the re-fit physics: CC 12/12 and Maps
all-PASS both engines, zero-seed overshoot 1.3%/0.8% (the 32–33% class DEAD per MARKS C2),
intent latch live (0 flips under dither, early commit on the flick), R5 clip-path residency
GREEN — no revert, PRM G7 cured. All twelve pass-1 gaps closed or legitimately argued down
(CRIT-F1 pass 2). Remaining, owned in the pass-3 charter: the −21% height-compression corpus
re-grade (OG1), band/constant hygiene (OG2/OG3/OG5/OG8), spec currency (OG9), the
merge-transferred integration set (OG6 — the heavy one), the defer fence (OG7). OG4's
registry side is closed by the PASS-2 amendment note below.

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

**PASS 1 (2026-07-18) — BANK, convergence 50%.** No prototype exists (`prototypes/
f2-native-scroll/` is empty — a charter violation; nothing seen in paint), and the family's own
losses ledger cedes the mid-detent catch, Safari springback tuning, Chrome rubber-band, and —
structurally — the post-release close durations (UA-fling-bound; CRIT-F2 G5). The research layer
is strong and version-cited; the two-regime insight and the zero-JS scroll-driven reveal ladder
survive as mechanisms. Banked with the two decisive probes reassigned to the pass-2 shared probe
seat: U2 (unclamped scrollTop under a held iOS-touch pin, with the event stream recorded) and
U-R1 (SDA threading with backdrop-filter on the animated surface). Re-trigger: both probes green
AND the merged spine-conductor architecture naming a scroll-shaped consumer (the drawer is the
candidate) whose inner-list handoff wants a native arm. Probes red → the bank converts to RETIRE
with the native-fling loss documented.

**PASS 2 (2026-07-18) — BANK HOLDS, convergence 50% (unchanged).** Both reassigned probes ran
on the desktop proxy (safari-arm): U-R1 resample correctness PROVES on WebKit 26.5 (SDA binds,
exact fraction→tx mapping, frosts live) with threading TOOL-DEFER; U2-scrollTop DEVICE-DEFER
(synthetic wheel carries no momentum phase; desktop WebKit never rubber-banded under
automation). RULED at the pass-2 agglomeration: the re-trigger clause is un-evaluable — a
DEFER is not a red, and the merged spec that would name the scroll-shaped consumer does not
exist until pass 3. Neither reopen nor retire fires. Re-evaluation points: the campaign
device-lane decision (a red device U2 → RETIRE with the native-fling loss documented) and the
pass-3 merged consumer census (drawer inner-list native arm + green device U2 → reopen).

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

**PASS 1 (2026-07-18) — ADVANCE, convergence 60%.** The center proved three independent ways —
offline probe, node check on the extracted shipped code (16/16), full 12/12 battery in Chrome
paint with depth grading measured at exactly 1.20× vs MARKS ~1.20 (browser seat: PROVES); the
conductor parks mid-scrub and seats in one poll under PRM with a frozen tick counter. Gaps
(CRIT-F3): the flagship §1 manifest cites a preset pair that fails the family's own acceptance
and the correct pair (0.6, 1.0) lives in no register; the inherits:true/false contradiction with
the U10 recalc trace unmeasured; Safari absent; the sat input map load-bearing but unspecced;
the delay law wrong as written; per-frame direction inference breaks the H2 bound register.
Pass-2: Safari battery; manifest + depth-formula + direction-latch text cures before anything
else (all three are transcribable defects); the latch is F1's committed-target discovery — the
one intent/direction law is written jointly with F1; the inherits decision with a captured
recalc trace in both engines; per-hallmark evidence or explicit demotion for H1/H2/H3; gate
bands re-derived from MARKS with the GATE band printed beside the display band.

**PASS 2 (2026-07-18) — ADVANCE, MERGED into SPINE-CONDUCTOR (key F1×F3), convergence 80%.**
PROVES-IN-WEBKIT, then 12/12 in PAINT-SIDE mode on both engines with |paint−internal| ≤1ms
Chrome (G9 closed); depth grading 1.20 exact again; recalc 0.312ms/frame at +960 injected
consumers (19× inside the bound); the drive-time latch falsification independently reproduced
(pre-cure code fails at dev 1.9e-1). All thirteen pass-1 gaps closed, ruled, or honestly
deferred (CRIT-F3 pass 2). Remaining, owned in the pass-3 charter: the intent-law unification
as ONE text (OG1 — two dialects still wear one name), two band-label retags (OG2), the
sat×source park fence (OG3), consume-SpringProgress defined per register (OG4), the
merge-transferred integration set (OG5 — the heavy one), the defer fence (OG6).

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

**PASS 1 (2026-07-18) — ADVANCE, convergence 62%.** Browser seat: PARTIAL, with the one defect
root-caused — Chrome fires scrollend after every discrete scrollTop step (10/10 measured), so
the scroll channel closes per step and reopens at v=0; the debounce-primary cure is named and
re-grades the Chrome arm PROVES once landed. The modulation-plane core (scalar triple, MAX fold,
kind-exclusive channels, regime gating, no-idle discipline, PRM pinning, unclamped publication)
is designed off real kin and Chrome-paint-verified at 22 writes/frame @2–7µs, 98fps. Gaps
(CRIT-F4): Safari absent; the cure unapplied and the spec unamended; the live release seed
violates the family's own continuity bound ~14× (0.436 vs ≤0.032); four tautological gates; the
threshold grammar contradicts its own arithmetic; the verb-delivery surface unspecified. Pass-2:
land the debounce cure and measure the 32-consumer fan-out in paint; Safari trace; decouple the
field seed from the carrier seed and gate the live release-frame jump; the honest
useDragVelocity regression (identical synthetic streams through the shipped pipeline); role
schema reconciled + the verb-delivery mechanism designed; F4 becomes the named H6 owner — an
acceleration consumer named or the word struck from the facility claim.

**PASS 2 (2026-07-18) — ADVANCE, convergence 78%.** Cross-engine PARTIAL, honestly earned:
G2 (debounce-primary scroll close), G8 (true delay line — the tail and the horizontal-fling
strand both dead), the θ_g floor under the finger, N4 strain exact, keyboard law, and PRM pin
all closed in paint on both engines; carry 28.0px inside the MARKS band on WebKit; the H6
seat argued with four §3.2 cells live (R5 at ARBITRATION: F4 stands, the vacancy is closed).
The gates then caught the physics wrong — the strongest evidence they are alive: P1 the C¹
seeding law fails outside the tanh-flat region (2–5×, frame-rate-dependent, both engines) and
P2 the constant 2.857 gauge re-lights the field after a slow place; one root, the
frozen-Jacobian gauge. Pass-3 burden: ARBITRATION §3.2-F4 (i)–(v) + P3 (carry-band provenance
demoted to [STAND-IN LOCK], re-derived at the merged carrier), P4 (the 50µs bound decision),
P5 (verb-sheet single-source + drift gate), P6 (independent blind judge), P7 (θ_g headroom
law), P8 (--impulse binding paragraph), P9 (hygiene).

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

**PASS 1 (2026-07-18) — ADVANCE, convergence 55%.** The layer contract verified computed in
Chrome; no-blink proven via an independent per-rAF joint-presence sampler (opacity × visibility
× rect-area) across 1-slot, multi-slot, and mid-travel retarget; U1/U3 honest on Chrome (browser
seat: PROVES — Chrome only). Gaps (CRIT-F5): Safari — the risk engine for every family-specific
unknown — never driven; zero paint evidence of any transient lens state on any engine, with two
captures mislabeled (the ferry confound); the U2 perceptual pair uncaptured; the moving-backdrop
cost priced only for H3 while H1/H2 re-pay it (~600ms of animated backdrop-sampling body per
gesture — a shared unknown; one Safari probe prices it for every family); PRM violated in the
observed artifact (charge ramps 0.23→1.0, seat deferred ~250ms). Pass-2: Safari first across the
full judging list; freeze/clock-scale + ferry-off harness toggles, then capture the transient
states and pixel-sample sibling legibility at bloom peak; the PRM one-flip seat; chip D in the
shipped data-URI form; one spec revision carrying isolation, the z/DOM contract, the lint
artifact, and the medium writer contract; the layers-vs-clocks boundary with F1/F3 sealed at the
pass-2 merge (F5 owns layers and material; the spine-conductor owns clocks).

**PASS 2 (2026-07-18) — ADVANCE, convergence 76%.** The Safari arm landed whole — the lens
core PROVES-IN-WEBKIT (blink test paint-true at 25fps, 132 frames, min presence 0.824;
choreography in band), U3 GREEN, transients captured on both engines with in-frame
self-labels, sibling legibility paint-read for the first time. U1 answered RED — the shipped
`glass-refract.css` @supports gate lies on WebKit 26.5 (supports=true, whole-value paint
drop, `.glass-lens` loses ALL blur against glass-ui 7.0.0); the repair routed as a BJ inbox
row, src untouched per ruling. The SVG goo arm RETIRED by measurement (separation on both
engines; Chrome worst frame 133.4ms vs fence 9.1ms); U8/N8 opacity-0 parking CERTIFIED both
engines; PRM one-flip closed; the contract artifacts (two-half lint, claimMediumWriter, z/DOM
table) real and falsifiable. Remaining, owned in the pass-3 charter: the lens-on-rack
integration artifact (OG1, the crown — the merged role exists only as ARBITRATION R1's
ruling), echo cells presented as gates (OG2), the sibling-gate floor-engine margin vs its
unstated error + per-engine model recalibration (OG3), the 4-slot falloff rider (OG4), spec
staleness vs adjudicated verdicts (OG5), the rapid re-tap charge-floor ruling (OG6), the
two-tier DAG lint's owner beyond the prototype (OG7), the fenced defers + the
observation-tension law to stamp (OG8).

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

---

## PASS-1 dispositions (2026-07-18)

Seat: the pass-1 agglomeration seat. Verified model: `claude-fable-5` (system context: "The
exact model ID is claude-fable-5"). Full narrative, cross-pollination table, and the pass-2
attack order: `../passes/PASS-1/AGGLOMERATION.md`.

| family | action | convergence | one line |
|---|---|---|---|
| F1 SCALAR-SPINE | ADVANCE | 62% | core proven in Chrome paint; Safari + gate integrity + the catch policy are the pass-2 burden |
| F2 NATIVE-SCROLL | BANK | 50% | no prototype, structural losses on 4 hallmark behaviors; two probes reassigned to the shared seat; named re-trigger |
| F3 CHANNEL-CONDUCTOR | ADVANCE | 60% | 12/12 battery in Chrome paint, depth grading exact; three transcribable spec defects cure first |
| F4 ENERGY-FIELD | ADVANCE | 62% | modulation plane proven partial, defect root-caused with the cure named; the H6 owner-designate |
| F5 OPTICAL-MEDIUM | ADVANCE | 55% | layer contract + no-blink proven on Chrome; zero transient paint evidence anywhere; Safari is the risk engine |

Systemic findings, binding on every pass-2 seat: (1) no verdict re-grades until the Safari arm
runs — every pass-1 PROVES is Chrome-only against a Safari-2026-floor task; (2) gate bands
derive from MARKS, never from the family's own sim — sim-parity bands are regression locks,
labeled as such; (3) MARKS itself carries defects (the stale springPreset citation, the R3
ζ/settle internal contradiction, margin-depth vs compression-gain conflation, the depth-grade
wording) — the MARKS correction pass + the three 24fps re-bursts precede any constant re-fit;
(4) DesignSync is reachable from pass-1+ seats (re-probed at agglomeration) — round-zero's
unavailability note no longer holds; frontend design work routes through it per the standing
mandate.

---

## PASS-2 dispositions (2026-07-18)

Seat: the pass-2 agglomeration seat. Verified model: `claude-fable-5` (system context: "The
exact model ID is claude-fable-5"). Full narrative, the F2 re-trigger ruling, the defect
ledger, and the pass-3 charter: `../passes/PASS-2/AGGLOMERATION.md`. The merge ruling and
boundary rulings: `../passes/PASS-2/ARBITRATION.md`.

**The merge: F1 SCALAR-SPINE × F3 CHANNEL-CONDUCTOR fuse into ONE family — SPINE-CONDUCTOR
(registry key F1×F3; primitive sketch `useLiquidSpine`, spelling illustrative).** Two
independent constant sets hit the same MARKS band family in paint on both engines — one
kernel wearing two parameter dialects. SCALAR-SPINE survives as the name of the spine
register (domain, regimes, rubber map, detents + `[DESIGN]` weak wells, intent latch,
calc-band ladder surface); CHANNEL-CONDUCTOR as the name of the rack register (three laws +
three modifiers, the ≤5-line manifest, joint park, PRM seat-all). The kernel mounts only
where ≥2 channels with DIFFERENT laws follow one gesture scalar; springPresets stays the
single named-register authority. The pass-3 merged spec seat carries the ten-item worklist
(ARBITRATION §1.5).

**Registry amendment — the compositor-first invariant (closes CRIT-F1 OG4's registry side).**
The cross-family invariant "transform/opacity/filter only on the hot path" is AMENDED: the
hot-path vocabulary admits `clip-path` on the GROWTH channel only, under measured cadence
bounds (Chrome R5 residency GREEN — 0 card-region Paints across six growth windows, 0 frames
>24ms; WebKit flick-open max 19ms, 0 >24ms at 67Hz; WebKit attribution TOOL-DEFER). Ruled at
SPEC-F1 §2-H1 with a stated revert clause armed both ways. The pass-3 merged spec re-swears
the full invariant once in its own §1.

| family | action | convergence | one line |
|---|---|---|---|
| F1 SCALAR-SPINE | ADVANCE (merged: SPINE-CONDUCTOR) | 78% | all 12 pass-1 gaps closed; PROVES-IN-WEBKIT + 7/7 re-verify under re-fit physics; the integration set (OG6) is the heavy remainder |
| F2 NATIVE-SCROLL | BANK HOLDS | 50% | re-trigger RULED un-evaluable on desktop (U-R1 half-green/TOOL-DEFER, U2 DEVICE-DEFER); re-evaluates at the device lane + the merged census only |
| F3 CHANNEL-CONDUCTOR | ADVANCE (merged: SPINE-CONDUCTOR) | 80% | all 13 pass-1 gaps closed; 12/12 paint-side both engines; intent-law unification as one text (OG1) + the integration set (OG5) remain |
| F4 ENERGY-FIELD | ADVANCE | 78% | cross-engine PARTIAL; gates caught the C¹ seam physics wrong (P1/P2, one root: the frozen-Jacobian gauge) — the honest headline defect for pass 3 |
| F5 OPTICAL-MEDIUM | ADVANCE | 76% | Safari arm whole; U1 RED routed to BJ; SVG arm retired by measurement; the lens-on-rack artifact (OG1) is the crown remainder |

Systemic findings, binding on every pass-3 seat: (1) the merged architecture has ZERO paint
evidence — the integration set (union interrupt battery, slot-axis lens, three-spine swap,
H1 ladder on a real surface, constant reconciliation) is the campaign's crown burden and no
family number prices it away; (2) pass 2 was NOT clean (re-verify FAILs, echo cells, a
shipped-product RED) — pass 3 is the first pass eligible to begin the two-consecutive-clean
chain, and the earliest possible convergence is pass 4; (3) three harness laws now govern
capture (WebKit screenshots are backdrop-blind — material truth rides the video path; a
clipped screenshot during a held pointer steals pointer capture; WebKit's 1ms clock makes
frame gaps the cost readout); (4) campaign-level decisions pass 3 must take, not drift past:
the Web Inspector TOOL-DEFER session or an explicit park, the device-lane charter or
documented non-goal, the MARKS note making rubber-band c≈0.55 permanently `[DESIGN]`, and
the observation-tension law stamped (no gate may demand video-path material truth and a
cadence bound in one run).

Pass-level convergence: **~72%** (active-lane mean 78, capped by the evidence-less merged
architecture and the not-clean pass). Honest arithmetic: convergence is not contemplated
before pass 4.
