# CRIT-F1 — adversarial critique of family F1 SCALAR-SPINE, pass 1

verified-model: claude-fable-5 (system-context model ID, verbatim). Adversarial-critic seat, pass 1,
2026-07-18. Read in full: SPEC-F1-SCALAR-SPINE.md, F1-SCALAR-SPINE.md (digest),
F1-SCALAR-SPINE.probe.mjs (rerun, output reproduced), prototypes/f1-scalar-spine/ (index.html
including the full physics block and button wiring, PROBE-NOTES.md including VERIFIED, check.mjs
rerun — 21/21 PASS), MARKS.md, REGISTRY.md. Kin citations re-verified against HEAD.

## What survived challenge

Stated first so the gaps below read against an honest baseline — none of this earns convergence
points, but none of it is where the family is weak.

- Every load-bearing codebase citation checks out at HEAD: `--dock-morph-t` per-frame root write in
  `useDockMorph.ts` (setProperty at :79 and :83-84), `crossfade.css:122` clip transfer,
  `springPresets.ts` dock row (0.30, 0.82), `property-regs.css` `--flex-vel` `inherits: false`,
  the `useDockSpring.ts` C¹ re-base (`reset(from, inheritedVelocity)` + `set target`), keyframes.js
  `.d.ts` `DragOptions.{bounds, rubberBand, snap, transform}` + `decayRest`,
  `usePointerVelocityField` with a real position→velocity→acceleration derived chain.
- The probe reruns and says what the digest says: the purity failure (symmetric fade lands 460ms on
  close vs measured ~170ms) is real and quantified; the follower bank's open/close/interrupt table
  reproduces; the C¹ retarget invariant holds to 1e-9; the hyperbolic rubber band saturates.
- The prototype is not a toy of an easier neighbor: one spine does drive both demos, the followers
  in paint are the same classes check.mjs extracts, the bottom edge is sub-pixel immobile under
  gesture, the reveal ladder reads as a ladder in the captured screenshots, and rAF-parked idle was
  observed after every settle. The probe's one structural discovery (target-keyed fade) is a real
  finding, not decoration.
- The known-dishonesties section of PROBE-NOTES is the most honest artifact in the family — most of
  what an adversary would find is already confessed there. The gaps below are the items NOT fully
  confessed, plus the confessed items that stayed open with no owner or gate.
- Incidental for the record: MARKS §2 cites `springPreset("dock") {0.68,0.64}` — HEAD's dock row is
  (0.30, 0.82). F1's analysis used the true HEAD values; MARKS carries the stale citation. A
  MARKS-side fix, noted here so round 2 does not re-derive the discrepancy.

## Open gaps, enumerated

### G1 — Zero Safari paint evidence; the VERIFIED verdict "PROVES" is Chrome-only

The task's common denominator is Safari 2026; the REGISTRY bound is "Chrome+Safari both verified in
paint." VERIFIED states plainly: Chrome 150 only, "Safari not driven this pass." Everything
paint-load-bearing is therefore Safari-open at once: the H4 medium mechanism (opacity attenuating a
constant-radius backdrop-filter — PROBE-NOTES dishonesty #4 names it as exactly the class of claim
the paint seat exists for), R1 recalc cost, R2 transition-retarget continuity, R5 clip-path/filter
residency. The spec compounds this: §1 conditions the CSS-follower arm on "where the R2 probe
verifies green in Safari paint" — a verification that has not occurred — and §5's capture law
requires "Chrome AND Safari."
**Close:** drive the identical battery in Safari 26 on the serialized browser seat (browser-seat
singleton rule), capture screenshot + paired evidence, append a Safari column to the VERIFIED
table, and run the R1/R5 traces there. Until then the verdict line must read PROVES-IN-CHROME.

### G2 — Gate circularity: check.mjs bands are probe-parity bands wearing MARKS labels, and several MARKS targets were widened to fit the sim

The spec's §3/§6 contract says "The probe's table IS the paint-verify contract" — the family's own
sim output becomes the acceptance gate, displacing the corpus measurement wherever they diverge.
Concrete instances:
- close medium gone: MARKS ~620ms; check.mjs band [670, 700]. A sim landing exactly on the measured
  620 would FAIL the check. VERIFIED relabels the band "~620–700" without sourcing the 700.
- open stretch 90%: MARKS ~600–650ms; band [578, 600]. A dead-center MARKS value (620) would FAIL.
- overpull settle: MARKS "settle inside ~250ms"; band [230, 330]; live 323–332ms scored EDGE-pass
  under a band the corpus never stated.
- fade:stretch: MARKS "confirmed and quantified at ~1:4"; band [2.8, 3.3]; live 1:2.9 scored "PASS
  at edge" against a relabeled "~1:3–1:4." (Defensible from MARKS' raw component bands 150–250 /
  600–650, which admit 1:2.4–1:4.3 — but then the gate should cite those bands, not a relabeled
  ratio.)
The pattern: constants were not re-fit to the corpus; gates were re-fit to the constants.
**Close:** restate every gate band as MARKS-derived with the probe value as a point inside it;
re-fit the offending constants (medium release τ or θ_closing for the ~620ms tail; register values
inside the R3 bracket for the settle) OR file a documented MARKS correction with frame evidence for
any band the corpus read got wrong. Sim-parity bands may stay as regression checks, labeled as such.

### G3 — The mid-detent catch has no gate that can fail, anywhere, and the implementation contradicts the spec's stated policy

check.mjs: `check("catch window (ms)", mc.catchMs, 170, 170, "by construction")` — a tautology. The
page: `setCell("#mCatchS", ..., true)` and `setCell("#mCatchL", ..., true)` — both catch cells are
hard-wired PASS. So the one hallmark behavior the spec calls "prototype-verified in pass 2" has
zero falsifiable acceptance in pass 1. Worse, the live implementation is not the spec's policy:
SPEC §1 says trigger when "the glide's projected path crosses a weak well at |v| above threshold"
and exit "on arrival-or-170ms." The prototype (index.html release(), :934-941) triggers on a
release-state condition `value > 0.72 && velocity < −2.2` — no path projection (a fast fall
released at value 0.70 never catches, though its path crosses the well) — and exits on a fixed
170ms timer with no arrival term. The live landing runs 588ms vs sim 406ms, unexplained (~180ms),
flagged by the browser seat and left open.
**Close:** implement the projected-path trigger (decayRest-style projection) + arrival-or-170ms
exit; add a falsifiable gate (well-dwell 120–220ms and a landing-time band, measured live); explain
or eliminate the 588-vs-406 delta.

### G4 — H1 growth mechanism: spec says translateY+scaleY, prototype ships clip-path; clip-path is outside the declared compositor-first vocabulary and its Safari residency is the open R5

SPEC §2 H1: "top travels via `translateY`+`scaleY` channels of `--gl-t`." The prototype:
`clip-path: inset(calc((1 − var(--gl-grow)) * 316px) ...)` with `will-change: clip-path` — a
different mechanism, whose Safari compositor residency is precisely the unproven R5. The REGISTRY
bound reads "transform/opacity/filter only on the hot path"; clip-path is not in that list. Neither
choice is free: scaleY growth smears content (a distortion MARKS never shows during growth);
clip-path avoids it but needs the R5 proof or an amended invariant. The spec never confronts the
choice — the prototype quietly made it.
**Close:** decide the mechanism, state it in SPEC H1 with its cost (clip-path + R5 Safari trace
green, or reserved-footprint transforms + content counter-transform), align prototype and spec, and
amend the compositor-first invariant text if clip-path is admitted to the hot path.

### G5 — Two follower parameterizations coexist under a "ONE parameterization" banner

Probe: per-scenario occupancy constants (0.02 open / 0.10 close) + positional fade in the interrupt
run → medium-min 0.46, fade-min 0.23. Prototype: target-conditioned θ rule → 0.62, fade-min ~0.00.
The spec's H5 table publishes the probe's numbers as the family's milestones while §5's build ships
the prototype's rule; PROBE-NOTES #2 defers the choice to round 2. Both satisfy the ≥0.4
acceptance, but the family's headline claim — one parameterization reproduces everything — is
currently two.
**Close:** bless one occupancy rule (the target-conditioned rule is the better-argued candidate —
stateless, and its fade-min ~0.00 matches MARKS' "NO content" read), regenerate the H5/acceptance
tables from it, and update the probe to match so probe, spec, and prototype state one rule.

### G6 — The scrub-time intent function is an unblessed prototype heuristic with no hysteresis and a stale-velocity dependence

The spec's target-keyed fade keys on "the spine's committed TARGET" — undefined while the regime is
scrub. The prototype fills the hole with `value + 0.15·velocity ≥ 0.5` (three occurrences: :603,
:922, :934). Defects: the 0.15s projection window is unstated in the spec; there is no hysteresis —
a finger dithering at t≈0.5 strobes the fade target under 65/55ms clocks (visible flicker class);
and when the finger holds still no pointermove fires, so the LSQ velocity is never re-zeroed — the
browser seat's held-scrub reads (fade=1.00 at held t=0.494) depend on this stale-velocity accident,
not on a designed stickiness.
**Close:** spec the scrub-regime intent function explicitly — projection window, hysteresis band
(e.g. commit flips only past 0.5±h), velocity decay on pointer-idle — and add a held-jitter
scenario to the battery.

### G7 — The PRM defect the browser seat found is still in the shipped prototype

index.html:946 — `scenario(fn) { if (PRM()) return this.prmSeat(); fn(); ... }` seats to the STALE
intent before fn() sets the new one; the scripted Maps buttons are no-ops under PRM from parked
state, against the spec's "PRM: spine seats instantly ... zero in-between frames." The one-line fix
was named in VERIFIED on 2026-07-18 and never applied.
**Close:** apply the fix (pass the target into scenario(), seat to it), re-run the PRM battery,
update PROBE-NOTES.

### G8 — H3 (lens) has zero F1 evidence, and the slot-axis domain is formally unreconciled with the normalized domain

No lens exists anywhere in the F1 prototype; the §3 acceptance row's evidence column is assertion
("clock split is the bank's native shape; body seam stated"). Structurally: a tab bar is N strong
wells — a multi-detent landscape — while the spec's detent policy covers two terminal detents plus
one transient weak well; and "domain = slot index" silently changes the domain type from the
normalized `[−μ, 1+μ]` of §1. The light-leads/geometry-follows clock split — the family's H3 claim —
is never exercised by any F1 artifact.
**Close:** either a minimal slot-axis probe (≥3 wells, velocity-seeded travel, fast-attack light
follower vs sprung geometry driving two rects — no material needed, that stays F5's) plus a domain
note covering discrete-well landscapes; or demote the H3 acceptance row to "clocks + seam only,
body evidence lives in F5" and say so in §3.

### G9 — H6's ALL-components facility has no falsifiable acceptance and no acceleration story beyond a name-drop

The task statement says momentum/velocity/ACCELERATION tracking as a facility for ALL components.
The spec re-homes `usePointerVelocityField`'s derived chain (which does carry acceleration) but
names no consumer of acceleration, no channel it drives, and no gate; §3 has no row for facility
universality; the prototype's H6 evidence is one `--gl-vw` glow on one surface. The library has
~68 component families — accordion, collapsible, drawer, expandable-container, tabs, carousel,
slider are all plausible spine or facility adopters — and the spec maps to none of them.
Consumer-less substrate is a named failure mode.
**Close:** name the pass-2 adopter set with per-component channel expectations (e.g. drawer +
expandable-container on the spine; slider + carousel on the velocity channel), define what
acceleration drives anywhere in the system (or strike the word from the facility claim), and add an
adoption gate to §3.

### G10 — The CSS-transition follower arm is not dynamically equivalent to the exponential follower under retarget, and only continuity was probed

A fixed-duration transition retargeted mid-flight changes the effective rate: 0.46→1 over "75ms
linear" is a different clock than the τ=25ms exponential attack from 0.46. The bank's signature
outputs — the empty-medium beat, the interrupt medium-min — are rate-dependent, and this family's
whole world is interrupts. R2 gates only inter-frame jump ≤0.30 (continuity); PROBE-NOTES #7
concedes curve shape is unprobed. Yet SPEC §1 presents the two arms as one dual implementation.
**Close:** either make the CSS arm rate-faithful (per-retarget duration ∝ remaining distance, or
`linear()`-shaped exponential easing) and probe beat/min parity between arms under the interrupt
scenario, or restrict the CSS arm to non-choreography channels in the spec.

### G11 — Spec text defect: "deep down margin, shallow up margin" is backwards in travel units by the corpus's own numbers

The video pins ~130px past the top detent vs a ~60–70px down cap; the prototype accordingly ships
μ_down 0.10 < μ_up 0.19, and PROBE-NOTES #8 spends a paragraph reconciling. What IS deep-down/
shallow-up is the compression gain (−21% vs −1%), not the margin depth. The spec conflates the two
in its domain sentence.
**Close:** one sentence in SPEC §1 separating margin depth (travel units) from compression gain
(feel), with the prototype's constants as the reference.

### G12 — R3 stays unarbitrated, and the corpus read itself is doubly inconsistent

Tracked, but understated: beyond the stated ζ contradiction (0.5–0.65 vs overshoot-fitted
0.28–0.38), MARKS' "settle inside ~250ms" is ALSO unreachable under linear second-order dynamics at
any ζ in the fitted bracket — the probe's own runs put |x|<3px at 353–431ms across the table, peak
alone at ~213ms, and the live prototype lands 323–332ms. Two of the three MARKS springback numbers
cannot simultaneously hold. The shipped ζ=0.34 currently fails the settle read on the live machine.
**Close:** the 24fps re-burst of t≈6.8–7.1 (MARKS wishlist #1) arbitrates overshoot AND settle in
one fit; until then the spec should carry the settle-time consequence of both brackets, not only
the overshoot bracket.

Tracked-open items R1, R2, R4, R5 and the cross-surface boundary are correctly owned in SPEC §6 and
are not double-counted above; G1 subsumes their Safari halves only because the pass-1 verdict line
overclaims against the Chrome+Safari invariant.

## Convergence

The core is real: one spine plus an asymmetric-clock follower bank demonstrably reproduces the CC
choreography and the Maps bound physics in Chrome paint, scrubbed and caught mid-flight, with
honest parked-idle discipline — the family's riskiest claim is proven on one engine. Around that
core: no Safari evidence at all against a Safari-floor task, an acceptance contract that gates on
its own sim where it drifts from the corpus, one hallmark (H3) evidenced by assertion, the
universality hallmark (H6) with no gate, a catch policy whose implementation and spec disagree
under a gate that cannot fail, and a forked parameterization under a one-parameterization banner.

**Convergence: 62%.** Gap-weighted: G1 and G2 are the heavy ones (each touches the family's
evidence contract), G3/G4/G8/G9 are structural but bounded, G5/G6/G10 are parameter-rule closures,
G7/G11/G12 are small and mechanical.
