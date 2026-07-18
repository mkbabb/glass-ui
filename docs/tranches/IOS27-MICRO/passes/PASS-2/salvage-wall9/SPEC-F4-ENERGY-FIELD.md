# SPEC-F4-ENERGY-FIELD — momentum as a style contract

verified-model: claude-fable-5 (system-context model ID, verbatim). Synthesize seat, pass 1, 2026-07-18.
Status: ACTIVE — the modulation plane. Position choreography is out of scope by charter; the family
stands as the universal momentum facility (the campaign's hallmark-6 clause) and composes with
whichever carrier wins position. Inputs: REGISTRY §F4, MARKS (whole), F4 digest + fold probe,
X1/X2/X3 digests.
Tooling: DesignSync reachable this pass (live `list_projects` call; empty project list — noted for
pass-2 component seats).

PASS-2 CURE AMENDMENT (2026-07-18, cure seat F4, verified-model: claude-fable-5): sections 1, 3, 4,
6 amended in place against CRIT-F4 G2–G12; §7 (H6—the nine provisions) and §8 (dispositions) added.
Every changed law is marked [P2]. The cure ledger lives at `../../PASS-2/cures-F4.md`; the durable
logic checks at `../../../prototypes/f4-energy-field/check.mjs`; paint re-verification queued at
`../../PASS-2/reverify-queue.md` §F4.

---

## 1. Architecture

One live energy scalar per interaction scope, published as a registered CSS custom property and
consumed through a closed style contract — not an engine. No CSS-native velocity primitive exists
on the Safari-2026 floor (the scroll-animations explainer defers velocity to rAF; the Bramus
lagged-pair hack is disqualified on artifacts), and no 2025–2026 library ships energy as a CSS-var
style contract — the field is genuinely novel at this altitude.

**The scalar.** A registered non-inheriting triple written on each consuming element: `--energy`
(unclamped tanh-saturated magnitude, `tanh(k·|v|)`, k continuous with the shipped 0.06/px-frame
law) plus signed `--energy-x`/`--energy-y` for axis-aware consumers. `<number>`, `inherits: false`,
`initial-value: 0`. Fenced as the FOURTH scalar kind: ENERGY (live, per-frame) ⟂ `--motion-weight`
(magnitude policy, inheriting, event-written only) ⟂ `--motion-tempo` (time) ⟂ `--ui-scale`
(geometry). The web.dev ~850x benchmark (4.67µs vs 3.96ms per invalidation) makes `inherits: false`
per-element publication the settled model; fan-out `setProperty` to consumers is the cheap side.

**Channels — kind-exclusive, regime-gated, MAX residual.** Three source kinds per scope, never two
of a kind: pointer (generalize `useDragVelocity`: drag-window rAF, EMA, coalesced-event sampling
where available, publish UNCLAMPED — the 0.7 clamp erases the 1150-vs-2600px/s distinction MARKS §6
measures; caps move into role gains), scroll (`scrollReader.velocity` px/s through the same tanh,
event-window-gated, closed by `scrollend` or the 160ms debounce fallback), spring
(`useSpring().velocity`/`flexVel` at drive cadence, born SEEDED at release). The fold rule is
three-layer and probe-proven: kind-exclusive channels; regime gating (a live gesture mutes the
scope's spring channel — the two-regime law enforced in the fold); residual = MAX across kinds,
hypot across axes within a kind. MAX is the only inflation-proof fold (double-count inflation
1.00x vs 1.28–1.40x for the alternatives), and the handoff is carried by velocity SEEDING, not by
fold choice (release-frame jump ≤0.032, energy 0.811 on both sides).

**Delivery.** `v-momentum[:role]` — a dependency-free `ObjectDirective` wrapping one writer core,
plus the composable for `:style`-ref cases: the exact `vSpecular`/`createSpecularWriter`
two-delivery pattern, host-geometry rule included. Scope = the directive host; nested scopes do not
inherit energy (structural, via `inherits: false`); a child couples to an ancestor scope only by
explicit directive arg — double-counting prevented by construction.

**The role table — closed set of five.** `container / control / content / lens / periphery`, each
row {gain, deformation verb, glow threshold, specular threshold, delay}. Components pick a role,
never a number. Roles differ in KIND, not magnitude — the uniform-gimmick defense: container smears
anisotropically along the travel axis (volume-preserving, the `useLiquidFlex` reciprocal); control
glows before it deforms; content counter-lags; lens blooms (light, not geometry); periphery delays
~100ms. Five verbs off one scalar — the same number never produces the same motion twice. Adding a
row requires a tranche amendment.

**Thresholds.** `glow ≥ θ_g` (seed 0.25 — the MARKS slow drag lands at 0.27, exactly at the floor:
a slow place shows no fireworks), `specular ≥ θ_s` (seed 0.6), charge on the engagement envelope
(pointerdown, velocity-independent — MARKS §3's press-charge precedes travel). U9 resolves whether
energy multiplies the existing `--glass-specular-intensity-*` rungs or mints a `charged` rung.

**Write discipline.** Event-window rAF only, zero idle loops (unit-enforced); teardown snaps to 0
when a seeded successor exists, otherwise bleeds via a typed-property transition (~150ms) so a
tap-release never pops. PRM: field pinned 0, rAF never opens; engagement affordances survive as
non-motion state through the existing rungs.

**Cleanup ledger (two seed deviations, named for cure).** `writeVelocityWeight`'s per-frame write
to inheriting `--motion-weight` is a subtree storm each frame — the weight becomes event-written
policy only, the live per-frame signal moves to `--energy`; `--atom-drag-v` is unregistered — it
retires into the facility's vocabulary, with the slider's 0.7 cap relocated to its role row
(byte-identical feel, regression-gated).

## 2. Mechanism per hallmark — contribution or honest boundary

**H1 growth ladder.** BOUNDARY: the ladder is carrier state (a pure function of expansion
fraction) — the field cannot and does not express it. Contribution: the pre-commit taffy tell —
dock stretch in the ~40px zone scales with pull energy, so a fast grab feels livelier than a slow
one before the gesture even commits.

**H2 overpull compression + springback.** The one-body law is a field mechanism: container and
content read the SAME scope's energy at their role gains (container smear, content ride), so
content deforms with glass structurally. Deformation magnitude modulates with energy (the
`effectiveCap` lineage). BOUNDARY: the bound geometry itself (displacement map, springback
register) is carrier physics.

**H3 lens.** Press-charge is THE field moment: the engagement envelope fires on pointerdown —
brighten + bloom at the source, the whole-bar wash as a scope-level glow read — before any travel,
exactly the Find My order. During travel the lens role's bloom rides `--energy` (arrival at speed
lands hotter than a slow settle — scale AND light overshoot from one scalar). BOUNDARY: the
traveling body and its continuity are carrier + F5 material.

**H4 material tiers.** The specular law becomes mechanical: light motion requires
`--energy ≥ θ_s` or an engagement envelope — "specular never idle on cards" (MARKS §4) stops being
a review rule and becomes a contract guarantee. Tier budgets themselves are F5 token territory.

**H5 multi-clock choreography.** BOUNDARY: clocks and channel order are carrier concerns. The
periphery role's ~100ms delay is available as a field-side rung for surfaces that want the rail
lag without a conductor.

**H6 momentum facility.** THE family's seat — the direct answer to the ALL-components clause. The
facility unifies the four in-tree systems behind one contract (kf Draggable release windows,
SpringProgress analytic velocity, the `usePointerVelocityField` v+a chain, the
`--flex-vel`/`--motion-weight` CSS law) and adds the missing pieces X2 §4 names: one element-space
kinematics primitive (px/s velocity AND acceleration, coalesced-fed, 100ms-window), one shared CSS
vocabulary, and the seeding contract into velocity-seeded release. Components field coupling ALONE
serves, named: scroll lists (velocity smear + depth-graded gain), slider/knob drag smear (shipped
today), whole-bar engagement wash, specular gating everywhere, button press glow,
content-deforms-with-glass, the taffy tell. Six of these need no carrier at all — the family's
standalone claim.

## 3. MARKS acceptance targets

| target | field mechanism |
|---|---|
| press-charge before travel, whole-bar wash (§3) | engagement envelope + scope glow read at θ |
| specular reserved for engagement (§4) | threshold grammar — mechanical guarantee |
| content deforms with container (§2) | same-scope energy at role gains |
| overshoot only on fast arrival (§6) | unclamped energy + seeded spring channel; slow place = 0.27 sits at the glow floor |
| fast/faster velocity discrimination (§6: 1150 vs 2600px/s) | unclamped publication (probe D: 0.83 vs 0.99) |
| PRM affordances survive as non-motion state | field pinned 0 + rung fallbacks |
| no idle motion, drivers park (bounds) | event-window writes, no-idle unit |

Targets the field does not claim: detents, ladders, lens travel, CC clocks — carrier plane, listed
so the boundary is auditable.

## 4. Safari-2026 feasibility

`@property` Safari 16.4; typed `<number>` transitions for the release bleed; coalesced/predicted
pointer events Safari 18.2; fractional pointer coords 26.2 (better velocity precision at 120Hz);
`scrollend` 26.2. Nothing on the hot path exceeds the floor. The one open platform question is U6:
the ~850x `inherits: false` benchmark is Chrome-measured; Safari symmetry is spec-asserted but
unverified in paint, and energy-modulated transforms over backdrop-filter surfaces need a Safari
re-sample cost read. One live probe closes both.

## 5. The prototype that proves the riskiest claim

**Riskiest claim: per-frame per-element energy writes stay cheap in Safari at realistic fan-out,
and the role verbs read as life, not as a filter.** The U6 page: a 30-consumer scroll list + one
glass (backdrop-filter) card + a slider, all under `v-momentum` with distinct roles, driven by
scripted flick/slow-place/scroll gestures. Capture per the live-π law: Safari 26 + Chrome traces
(recalc ms/frame), screenshot pairs at slow-place vs flick (the θ_g floor visibly separating them),
the no-idle unit (no rAF after release/scrollend), the fold-continuity unit replaying probe
scenario A, and the slider byte-identical-feel regression for the cap relocation.

## 6. Open gaps

| # | gap | next move |
|---|---|---|
| U6 | Safari invalidation symmetry + backdrop re-sample cost under energy-modulated transforms | §5 probe |
| U7 | universal gain k feel (order is right — 0.27→0.99 across MARKS velocities; tuning is a paint matter) | pass-2 feel pass on the probe page |
| U8 | `scrollend` as the scroll channel's closing edge vs the 160ms debounce | one-line probe on the §5 page |
| U9 | glow grammar — energy-scaled existing rungs vs a fourth `charged` rung | pass-2 spec decision; MARKS §3 press-charge is the acceptance |
| — | role-gain table initial values (five rows × five fields) | authored in pass 2 against the probe page, DesignSync lane for the visual judgment |
| — | composition with the winning carrier: the carrier's spring channel must register as the scope's spring source (seeding contract), or release tails double | stated as a requirement on the round-2 merge |
