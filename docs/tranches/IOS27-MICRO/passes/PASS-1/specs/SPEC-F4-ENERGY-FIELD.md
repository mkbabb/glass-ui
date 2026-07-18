# SPEC-F4-ENERGY-FIELD — momentum as a style contract

verified-model: claude-fable-5 (system-context model ID, verbatim). Synthesize seat, pass 1, 2026-07-18.
Status: ACTIVE — the modulation plane. Position choreography is out of scope by charter; the family
stands as the universal momentum facility (the campaign's hallmark-6 clause) and composes with
whichever carrier wins position. Inputs: REGISTRY §F4, MARKS (whole), F4 digest + fold probe,
X1/X2/X3 digests.
Tooling: DesignSync reachable this pass (live `list_projects` call; empty project list — noted for
pass-2 component seats).

PASS-2 CURE AMENDMENT (2026-07-18, cure seat F4, verified-model: claude-fable-5; resumed after
WALL #9 — the pre-resume snapshot lives at `../../PASS-2/salvage-wall9/`): sections 1–6 amended in
place against CRIT-F4 G2–G12 + the safari-arm evidence; §7 (H6 — the nine provisions) and §8
(dispositions) added. Every changed law is marked [P2]. The cure ledger lives at
`../../PASS-2/cures-F4.md`; the durable logic checks at
`../../../prototypes/f4-energy-field/check.mjs` (13/13 green, GATE/LOCK labeled per the honesty
law); paint re-verification queued at `../../PASS-2/reverify-queue.md` §F4.

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
per-element publication the settled model; fan-out `setProperty` to consumers is the cheap side —
[P2] now measured on the second engine too: WebKit 26.5 prices the asymmetry at 27× (35µs
non-inheriting write+read vs 960µs for an inheriting var over a 500-child subtree; safari-arm).
[P2] **The calibration space:** E is defined over FINGER px/s — the space every MARKS number was
measured in. Any producer whose native velocity is not finger-space declares a GAUGE back to it
(the seeding law, below). [P2] **Roster position (SUFFUSION §3.1-3):** the energy triple IS the
roster's live-velocity scalar — at library adoption `--flex-vel` and `--atom-drag-v` retire into it
(clean break, no aliases; consumers update via marked addenda in their own tranches). The full
six-kind mapping is §7 provision 3.

**Channels — kind-exclusive, regime-gated, MAX residual.** Three source kinds per scope, never two
of a kind: pointer (generalize `useDragVelocity`: drag-window rAF, EMA, coalesced-event sampling
where available, publish UNCLAMPED — the 0.7 clamp erases the 1150-vs-2600px/s distinction MARKS §6
measures; caps move into role rows — [P2] the pointer channel keeps the shipped single-axis
projection where the component owns one travel axis (`axis:"x"` on a slider), hypot only on free
2-D gestures: the G4 off-axis break is thereby not a break), scroll ([P2] `useScrollTrigger`'s
velocity ref is the kin — px/s through the same tanh, event-window-gated, **closed by the 160ms
debounce as PRIMARY; `scrollend` is honored only quiet-confirmed** (≥2 frames/40ms since the last
scroll event). This is cross-engine law, measured: Chrome 150 fires scrollend after every discrete
`scrollTop` step 10/10, WebKit 26.5 fires 89/89 — each closed the pass-1 channel and pinned E at 0.
Gate: `check.mjs` U-SCROLL, cured peak >0.85 closing by debounce while the pre-cure shape dies at
<0.5), spring (`useSpring().velocity` at drive cadence, born SEEDED at release). The fold rule is
three-layer and probe-proven: kind-exclusive channels; regime gating (a live gesture mutes the
scope's spring channel — the two-regime law enforced in the fold); residual = MAX across kinds,
axis handling per the projection law above. MAX is the only inflation-proof fold (double-count
inflation 1.00x vs 1.28–1.40x for the alternatives), and the handoff is carried by velocity
SEEDING, not by fold choice.

[P2] **The seeding law — the gauge.** E lives in finger px/s; a carrier legitimately seeds its
spring in displacement space (the live dock seeds at `vy·0.35` — the rubber map compresses
displacement under the finger). Pre-cure the field read that seed raw: release-frame jump 0.436,
~14× the family's own ≤0.032 bound (CRIT G3, arithmetic confirmed). The cure decouples the field
read from the carrier seed WITHOUT double bookkeeping: the carrier passes `vFinger` at seed; the
field reads `v_spring · gauge` where `gauge = vFinger/v₀` — the spring's velocity re-expressed in
finger space. C¹ continuity at the release frame is then exact by construction, and it is GATED
twice: offline (U-CONT lock, jump 0.0288) and on the SHIPPED live path (U-CONT-LIVE gate in
check.mjs + the on-page live-jump row measured on every seeded release, bound ≤0.032; the gate
catches the ungauged defect at 0.33–0.40). The same gauge is the round-2 carrier seam contract:
any winning carrier must pass its finger-space velocity or E discontinuity is a build failure,
not a tuning matter.

**Delivery.** `v-momentum[:role]` — a dependency-free `ObjectDirective` wrapping one writer core,
plus the composable for `:style`-ref cases: the exact `vSpecular`/`createSpecularWriter`
two-delivery pattern, host-geometry rule included. Scope = the directive host; nested scopes do not
inherit energy (structural, via `inherits: false`); a child couples to an ancestor scope only by
explicit directive arg — double-counting prevented by construction.

[P2] **The verb-delivery surface (the G6 hard half, now specified).** The directive stamps
`data-momentum-role="<role>"` on mount; the verb CSS attaches by that attribute, never by
hand-authored per-element rules. In the Tailwind-first library form the five verb blocks are
authored ONCE as per-role `@utility` definitions (`momentum-container`, `momentum-control`, …)
whose selectors target the stamped attribute; the role table is the single source — the verb
sheet's amplitudes derive from it at build, so the two homes cannot drift. A component therefore
picks a role, never a number, and receives geometry + light + thresholds in one stamp. Writer-only
members (light-overlay primitives, scrolling shells whose masks read the vars) opt out of the
stamp (`verb:false`) — they consume the scalars without hosting a verb. Prototype status: the
attribute contract + stamped delivery are live; the slider's fill/cast/ring anatomy composes its
verb by hand (control anatomy, bounded and noted in PROBE-NOTES) — the library `@utility` form is
build-time work, named for the wave set.

[P2] **The role table — closed set of five, one schema.** `container / control / content / lens /
periphery`, each row **{gain, cap, θ_g, θ_s, verb-kind}** (+ `τ` on periphery alone). Cap is IN
the row — pass-1's "caps move into role gains" under-specified it and the prototype's
{gain, cap} pair was schema drift (CRIT G6); one answer now: gains scale, caps bound, both
writer-side; θ live CSS-side in the verb sheet. Authored initial values (the prototype's live
table, the DesignSync feel lane still owns final tuning): container {1.00, 1.0, 0.30, 0.6},
control {2.50, 0.7, 0.0, 0.6}, content {0.55, 1.0, —, —}, lens {2.20, 1.0, 0.30, —}, periphery
{0.80, 1.0, 0.30, —, τ 100ms}. Roles differ in KIND, not magnitude — the uniform-gimmick defense:
container smears anisotropically along the travel axis (volume-preserving, the `useLiquidFlex`
reciprocal); control glows before it deforms (θ_g 0 is that row's verb, not a threshold hole);
content counter-lags in BODY-MOTION space ([P2] axis energies publish as the body's motion, so one
content verb serves dragged docks and scrolled lists identically); lens blooms (light, not
geometry); periphery is a TRUE ~100ms delayed echo (below). Five verbs off one scalar — the same
number never produces the same motion twice. Adding a row requires a tranche amendment.
[P2] Depth grading is position-in-viewport at channel-open (one rect pass per gesture, never per
frame) — the `i % 8` index sawtooth is dead (CRIT G12; F3's proven normalized form adopted).

[P2] **Thresholds — the two-leg light law.** Every light overlay is exactly two legs: an ENERGY
leg, `clamp((E − θ_row)/(1 − θ_row))`-shaped and gated at its OWN row's θ, plus an ENGAGEMENT leg
riding `--engage-t` — θ-exempt BY DEFINITION, because the envelope is the user's own touch
(MARKS §3: press-charge is velocity-independent). θ_g = **0.30**: the MARKS slow place lands at
E 0.273, BELOW the floor — "a slow place shows no fireworks" is mechanical truth, not the
sub-perceptual hand-wave CRIT G5 caught at θ 0.25 (0.273 > 0.25 fired ~3.1% glow while three
artifacts claimed zero). The wash overlay is not a grammar bypass: its energy term is θ-gated like
every other and its engagement term is the charge envelope — ruled, in the law, not implicit.
`specular ≥ θ_s` (0.6) or the engagement envelope — specular never idle (MARKS §4). [P2] U9
RESOLVED by the same law: energy MULTIPLIES the existing `--glass-specular-intensity-*` rungs
(the energy leg) and the engagement envelope lights them (the charge leg); no fourth `charged`
rung is minted — charge is an envelope, not a material state.

**Write discipline.** Event-window rAF only, zero idle loops (unit-enforced); teardown snaps to 0
when a seeded successor exists, otherwise bleeds via a typed-property transition (~150ms) so a
tap-release never pops ([P2] typed-property transitions on `--energy` verified animating in WebKit
26.5 — safari-arm). PRM: field pinned 0, rAF never opens; engagement affordances survive as
non-motion state through the existing rungs. [P2] **Single-writer registry (G7 ruled):** one
element, one scope — cross-scope coupling is a membership CHOICE (the periphery rail joins the
dock's scope), never an addition; a second scope claiming an owned element THROWS at registration
with membership unchanged (gate: U-OWN). Dual membership is prohibited outright — MAX-in-JS
across scopes was rejected because it makes the element's motion a function of a scope it never
declared. [P2] **Periphery teardown:** the delay line receives an explicit quiet ZERO SAMPLE and
drains through τ + one hop — the pass-1 `_quiet()` skip that stranded a horizontal-fling rail
frozen glowing is structurally impossible (gate: U-DELAY, zero by τ+2 frames after quiet).

**Cleanup ledger (two seed deviations, named for cure).** `writeVelocityWeight`'s per-frame write
to inheriting `--motion-weight` is a subtree storm each frame — the weight becomes event-written
policy only, the live per-frame signal moves to `--energy`; `--atom-drag-v` is unregistered — it
retires into the facility's vocabulary, with the slider's 0.7 cap relocated to its role row.
[P2] **"Byte-identical feel" is RETRACTED** (CRIT G4 sustained, and the honest regression found
more): the shipped `useDragVelocity` decays `frameDelta` by only 0.6 per frame, so 60% of every
frame's displacement is re-counted — the shipped steady-state law is effectively `tanh(v/400)`,
2.5× hotter than its own nominal `tanh(v/1000)`. The facility cures the re-count (one honest
pole) and preserves the shipped SLOPE via the control row's gain 2.5 (`2.5·tanh(v/1000)` ≈
`tanh(v/400)` at small v; both cap at 0.7). The claim is now a bounded-parity contract, gated
against the verbatim shipped pipeline replayed over a synthetic gesture corpus (U-REG: settled
slope drift @280px/s ≤0.08, cap parity @900 ≤0.01, rise never slower, both decay on hold-still;
the transient/jitter drift from curing the double pole is the documented deliberate break —
telemetry ~0.46 transient, ~0.17 under 3Hz jitter — plus a live on-page replica running the
shipped law beside the facility during real slider drags).

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
lag without a conductor. [P2] Re-derived toward MARKS §5 (CRIT G8 sustained): the pass-1
retargeted 100ms transition was an exponential low-pass, not a delay — paint showed a ~½-second
tail (rail 0.370 at t=725ms after the dock fell to 0.175), nothing like the measured 80–160ms
echo-then-caught-up. The cure is a TRUE delay line: periphery consumers read the scope's energy
history at t−τ (τ = 100ms, inside the MARKS band), the quiet zero-sample rides the same line, and
the scope steps only until the line drains. Gate: U-DELAY — echo lag τ±1 frame, EXACTLY 0 by τ+2
frames after quiet, with the old follower's 0.15 residual printed at that point for the record.

**H6 momentum facility.** THE family's seat — the direct answer to the ALL-components clause. The
facility unifies the four in-tree systems behind one contract (kf Draggable release windows,
SpringProgress analytic velocity, the `usePointerVelocityField` v+a chain, the
`--flex-vel`/`--motion-weight` CSS law) and adds the missing pieces X2 §4 names: one element-space
kinematics primitive ([P2] px/s VELOCITY, coalesced-fed, 100ms-window — "and acceleration" is
STRUCK: the SUFFUSION provision-4 ruling stands, no continuous acceleration variable exists or
ever will; the honest acceleration story is §7 provision 4), one shared CSS vocabulary, and the
seeding contract into velocity-seeded release. Components field coupling ALONE serves, named:
scroll lists (velocity smear + depth-graded gain), slider/knob drag smear (shipped today),
whole-bar engagement wash, specular gating everywhere, button press glow,
content-deforms-with-glass, the taffy tell. Six of these need no carrier at all — the family's
standalone claim. [P2] The provision-by-provision mapping and the existential-cell evidence are
§7 — the family's H6 seat is argued there, not asserted here.

## 3. MARKS acceptance targets

| target | field mechanism |
|---|---|
| press-charge before travel, whole-bar wash (§3) | engagement envelope + scope glow read at θ |
| specular reserved for engagement (§4) | threshold grammar — mechanical guarantee (two-leg law [P2]) |
| content deforms with container (§2) | same-scope energy at role gains |
| overshoot only on fast arrival (§6) | unclamped energy + seeded spring channel; [P2] slow place E 0.273 sits BELOW the θ_g 0.30 floor — no glow, mechanically; [P2] the register is MARKS C2 (ζ 0.80, f_d 1.7Hz, settle ≈180ms, overshoot velocity-bought ~1–2% of travel — the pass-1 "30–50% springback" citation is VOID per C1/C2) |
| fast/faster velocity discrimination (§6: 1150 vs 2600px/s) | [P2] re-scoped per CRIT G11: the field preserves the discrimination FOR SEEDING AND THRESHOLDS (probe D 0.83 vs 0.99; specular leg 0.49 vs 0.87, glow leg 0.74 vs 0.98 — the channel deltas a judge should see); whether the deltas READ as flick-vs-fling from field channels alone is a queued paint pair (U7, reverify §F4). The 27px ceiling carry MARKS measures is carrier-plane seeding, credited there |
| PRM affordances survive as non-motion state | field pinned 0 + rung fallbacks |
| no idle motion, drivers park (bounds) | event-window writes, no-idle unit |

Targets the field does not claim: detents, ladders, lens travel, CC clocks — carrier plane, listed
so the boundary is auditable.

## 4. Safari-2026 feasibility

`@property` Safari 16.4; typed `<number>` transitions for the release bleed ([P2] measured
animating in WebKit 26.5 — the bleed mechanism is live, safari-arm); coalesced/predicted pointer
events Safari 18.2. [P2] The two uncited version claims CRIT G10 caught are cured by measurement
or struck: `scrollend` EXISTS in WebKit 26.5 (`'onscrollend' in window` = true, measured — and it
is no longer load-bearing anyway: the close edge is the debounce, §1); the "fractional pointer
coords 26.2" claim is STRUCK — the research digest never verified it and nothing in the contract
depends on it. [P2] Kin name fixed: the scroll velocity ref lives on `useScrollTrigger`, not
`scrollReader` (verified on disk, `src/composables/motion/scroll/useScrollTrigger.ts:97`).
Nothing on the hot path exceeds the floor. [P2] U6 status: WebKit invalidation asymmetry MEASURED
(27× — §1); `abs()`/`max()` transform calc COMPUTES in WebKit 26.5 (live matrices land exactly on
the formula — the no-masking-fallback risk did not fire, U6a CLOSED); energy-modulated transforms
over backdrop-filter genuinely frost in the video path (U6b evidence). The remaining U6 residue is
the per-frame re-raster cost TRACE — TOOL-DEFER to desktop Safari Instruments/Web Inspector
(Playwright exposes no WebKit timeline).

## 5. The prototype that proves the riskiest claim

**Riskiest claim: per-frame per-element energy writes stay cheap in Safari at realistic fan-out,
and the role verbs read as life, not as a filter.** The U6 page: a 30-consumer scroll list + one
glass (backdrop-filter) card + a slider, all under `v-momentum` with distinct roles, driven by
scripted flick/slow-place/scroll gestures. Capture per the live-π law: Safari 26 + Chrome traces
(recalc ms/frame), screenshot pairs at slow-place vs flick (the θ_g floor visibly separating them),
the no-idle unit (no rAF after release/scrollend), the fold-continuity unit replaying probe
scenario A, and the honest shipped-pipeline regression for the cap relocation ([P2] wording — the
byte-identical framing is retracted, §1).

[P2] Status: both halves now hold CROSS-ENGINE — Chrome 150 (pass 1) and WebKit 26.5 (safari-arm):
22 writes/frame at 2–7µs (Chrome; WebKit's 1ms clock defers the µs meter to frame gaps — 67fps
held, one long frame per session), verbs live in paint on both, fling carry +30.7/+28.0px inside
the MARKS 27–32 band on both. What the cures changed now needs ONE paint re-run (the scroll
acceptance row, the live-jump row, the true periphery echo, the θ_g 0.30 floor, the strain/edge
verbs) — queued with acceptance numbers at `../../PASS-2/reverify-queue.md` §F4. The re-raster
trace stays TOOL-DEFER (§4).

## 6. Open gaps [P2 — the pass-1 table re-ruled row by row]

| # | gap | status |
|---|---|---|
| U6 | Safari invalidation symmetry + backdrop re-sample cost | NARROWED: asymmetry measured (27×), abs()/max() computes (U6a CLOSED), material frosts under modulation (U6b video evidence); residue = the re-raster TRACE, TOOL-DEFER (desktop Safari Instruments) |
| U7 | universal gain k feel + [P2] the G11 perceptual discrimination pair (flick vs fling readable from field channels alone) | OPEN — queued paint pair (reverify §F4) + the DesignSync feel lane |
| U8 | scroll close edge | CLOSED — debounce-primary is cross-engine law (Chrome 10/10, WebKit 89/89), cure landed in the prototype, gated (U-SCROLL); paint re-run queued |
| U9 | glow grammar | RESOLVED — energy multiplies the existing rungs, engagement lights them, no fourth rung (§1 two-leg law) |
| — | role-table initial values | AUTHORED (§1, five rows); the DesignSync lane owns final visual tuning |
| — | composition with the winning carrier | OPEN, sharpened: the carrier registers as the scope's spring source AND passes finger-space velocity (the gauge seam, §1) — both are round-2 merge requirements |

## 7. H6 — the SUFFUSION provisions, mapped (the existential test) [P2]

SUFFUSION §3.1 makes nine provisions the price of the H6 seat; §3.2 names the cells that must
live on field coupling alone. Each provision maps to a contract element that exists in an
artifact — spec law, prototype code, or gate — never to an intention.

| # | provision | contract element | evidence |
|---|---|---|---|
| 1 | the state pair — (value, velocity), C¹ at every handoff | seeding + the gauge (§1); scrub-catch (a grab kills the spring and resumes from live displacement); interrupt re-seat | U-CONT lock 0.0288; U-CONT-LIVE gate ≤0.032 with the ungauged defect caught at 0.33–0.40; on-page live-jump row on every seeded release |
| 2 | three sources, one shape | pointer/scroll/spring channels all emit the identical `{e, ex, ey}` read shape; consumers cannot tell which kind drives | prototype channels §6; the scroll + spring surfacing X2 §4 called missing is live in the prototype |
| 3 | the scalar roster — six, no more | the roster maps ONTO this contract without a seventh kind: `--energy(-x/-y)` IS the live-velocity scalar (subsumes `--flex-vel` + `--atom-drag-v`, clean break at adoption); `--motion-weight` event-written policy (§1 cleanup); `--engage-t` the engagement envelope (registered + written in the prototype; hover/focus arms = SUFFUSION §3.4 q4); `--overpull` signed bound-anchored strain (registered + written; consumed by N4); `--impulse` reserved, provision 4; `--scrub-t` is F1's inheriting spine — NOT F4's, fenced out here | prototype `@property` block + writers; §1 roster paragraph |
| 4 | acceleration, ruled once | NO continuous acceleration variable, here or anywhere (the pass-1 "velocity AND acceleration" primitive wording is struck, §2 H6). `--impulse` = the ONE event channel: a decaying release-burst born at seeded release — and the prototype's arrival heat IS that quantity (the gauged spring-tail energy, decaying on the spring clock); `--impulse` binds to it as the roster name at adoption. The honest acceleration consumers: the catch/arrest vocabulary (expression) and the weight-boost attack rate (reading); the in-tree derived-accel chain stays PRIVATE to `usePointerVelocityField`'s substrate physics (K×Q7), never a contract var | lens bloom riding the seeded spring tail (`f4-wk-tab-arrival.png`); SUFFUSION §3.1-4 honored verbatim |
| 5 | the per-role gain table | the five-row schema with authored values (§1); the dose ledger's zeros are entries (content/periphery θ nulls = light withheld by law) | ROLE_TABLE, single-sourced into the verb sheet |
| 6 | the write discipline | event-window rAF, self-parking conductor, dirty-checked `inherits:false` per-element writes; the `--scrub-t` subtree exception belongs to F1 | idle = 0 writes + violation counter; 22 writes/frame at 2–7µs Chrome / 67fps WebKit |
| 7 | the keyboard law | keyboard activation re-seats the lens deterministically with ZERO field energy — no goo on keys, focus is truth | prototype `activateTab(viaKeyboard)`; paint check queued |
| 8 | overshoot is earned | springs seeded v=0 land dead; live velocity buys the excursion; MARKS C2 quantifies it (~0.02px per px/s crossing) | U-SPRING lock: fast 17px, slow-place 1.9px; fling carry 28–31px vs slow-place 0 on both engines |
| 9 | PRM pins the field to 0 | `pinZero()` — every consumer + the delay line zeroed NOW; engagement collapses to a step (state relayed, physics removed); rAF never opens | PRM row PROVES on both engines (identity transform throughout, E pinned 0) |

**The §3.2 cells, on field coupling alone** (no position substrate, no conductor, in the
prototype unless noted): A×Q2/Q3 — press-charge (`--engage-t` envelope) + energy-modulated squish
depth (the container scaleY's `0.35 + 0.65·E` term); G×Q3-engage — the whole-bar wash as a
scope-level read (energy leg θ-gated + charge leg, `tabWash` at depthGain 0.45); N4 — strain as
rim luminance: `abs(--overpull) × --engage-t`, alive only under the held finger, dies at release;
L×Q7 — the scroll shell's edge-fade mask deepens with `--energy` (writer-only member; in-tree
adopter: fading-scroll); I×Q7 — the value-velocity light read: the spring KIND is the value-churn
source and the lens bloom is its light consumer — the progress fill-tip glint is the same wiring
on a progress consumer (named adopter; the mechanism is demonstrated, the component is wave-set
work); K×Q7 — substrate perturbation already consumes pointer velocity in-tree
(`usePointerVelocityField`); the facility's contribution is the shared var shape + the release
burst, an adoption row, not new physics. Four cells live in the prototype's paint surface, two by
mechanism-isomorphism with named in-tree adopters — the family stands on provisions 1–5 wholesale
and confesses its boundary unchanged: detents, ladders, the lens body, and the medium are
F1/F3/F5 territory, composed, never absorbed.

## 8. CRIT-F4 dispositions [P2]

| gap | disposition |
|---|---|
| G1 Safari absent | CURED by the safari-arm pack (WebKit 26.5, video-path material law honored): same-shape PARTIAL→cures landed; residues named — re-raster trace TOOL-DEFER, real-device iOS DEFER |
| G2 scroll defect uncured | CURED: debounce-primary in the channel (§1), spec amended, U-SCROLL gate green; paint re-run queued |
| G3 live continuity 14× | CURED: the gauge (§1 seeding law); U-CONT-LIVE gate + on-page live-jump row ≤0.032 |
| G4 tautological gates | CURED: U-REG replays the verbatim shipped pipeline (GATE, can fail — and its honest finding RETRACTED "byte-identical": the shipped law is tanh(v/400) at steady state); U-LAW/U-FOLD/U-CONT demoted to LOCK labels; the press→travel readout demoted to demonstration with the real paint gate stated (charge>0 strictly before travel) |
| G5 threshold contradiction | CURED: θ_g 0.30 (slow place 0.273 below floor); the two-leg light law; wash ruled inside the grammar; U9 resolved by the same law |
| G6 role schema + verb delivery | CURED: one six-field schema, cap IN (§1); delivery = stamped `data-momentum-role` + per-role `@utility` generated from the one table; the slider-anatomy hand-composition noted as the bounded remainder |
| G7 write contention | RULED: single-writer registry, second scope throws, dual membership prohibited (U-OWN) |
| G8 periphery not a delay + strand | CURED: true delay line τ100ms + quiet zero-sample drain (U-DELAY); H5 text re-derived against MARKS §5 |
| G9 evidence durability + verb coverage | CURED for durability: `check.mjs` committed beside the prototype (subsumes the three scratchpad probes incl. the fold arithmetic); verb coverage narrowed by safari-arm (tab arrival + periphery rows captured); the remaining verb captures queued (reverify §F4) |
| G10 uncited versions + kin name | CURED: scrollend measured at WebKit 26.5, fractional-coords claim struck, kin fixed to `useScrollTrigger` (§4) |
| G11 discrimination perceptually thin | CURED by re-scope + queued test: §3 row re-scoped to seeding/thresholds; the perceptual pair is a queued paint gate with numeric channel deltas that CAN fail (reverify §F4) |
| G12 depth sawtooth | CURED: position-in-viewport regrade at channel-open, one rect pass per gesture (§1) |
| G13 acknowledged-open rows | carried into §6's re-ruled table (U6 narrowed, U7 open, U9 resolved, initials authored, carrier seam sharpened) |

No gap is argued down: every row above lands a cure, a ruling, or a queued falsifiable check.
