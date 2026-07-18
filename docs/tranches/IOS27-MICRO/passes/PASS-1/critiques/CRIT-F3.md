# CRIT-F3 — adversarial critique of family F3 CHANNEL-CONDUCTOR (IOS27-MICRO pass 1)

verified-model: claude-fable-5 (system-context model ID, verbatim). Adversarial-critic seat,
2026-07-18. I authored none of the family's artifacts.

Inputs read in full: SPEC-F3-CHANNEL-CONDUCTOR.md, F3-CHANNEL-CONDUCTOR.md (research digest),
prototypes/f3-channel-conductor/{index.html, check.mjs, PROBE-NOTES.md incl. VERIFIED},
analysis/MARKS.md, registry/REGISTRY.md (§F3 + cross-family invariants). Cross-checked against the
live tree: useLeadTrail.ts, useRAFLoop.ts, springPresets.ts, useDockSpring.ts, motionTempo.ts,
writeVelocityWeight.ts, property-regs.css, X2-codebase-motion.md §4, SPEC-F1-SCALAR-SPINE.md.

## What survived the attack

Stated so the gaps below read against an honest baseline, not as a verdict discount:

- The family center — the MARKS §5/§6 choreography emerging from per-channel coupling constants,
  zero authored timelines — is proven three independent ways: offline probe, node check on the
  extracted shipped code (16/16), and a Chrome 150 live-paint battery (12/12) with screenshots,
  getBoundingClientRect depth-travel reads (ratio 1.20 vs MARKS ~1.20), a paint-observed PRM seat
  with a frozen tick counter, and a parked-idle boot state. This is not vacuous convergence; the
  constants were fit to MARKS, but one constant set hitting all bands simultaneously plus interrupt
  continuity plus tempo invariance is falsifiable and was tested.
- The kin citations are real. useLeadTrail's park predicate and PRM seat are where claimed;
  useRAFLoop demonstrably pauses (not seats) under PRM — the chassis disqualification is correct;
  X2 §4 says what the spec says it says; F1's two-local-registers finding and the ζ contradiction
  bracket exist as cited. Safari feature support is version-cited (@property 16.4, linear() 17.2,
  scroll-driven 26.0) with links.
- check.mjs extracts the conductor block from index.html — the zero-drift claim between checked
  code and shipped code holds.
- PROBE-NOTES' "known dishonesties" section is genuinely adversarial toward its own artifact.
  Several gaps below exist because that section named them and the spec was never amended.

## Open gaps

Each gap states the defect and what would close it.

**G1 — the spec's flagship manifest fails the spec's own acceptance table.** SPEC §1 writes
`geometry: { law: "spring", preset: "dock" }`. The shipped dock row is (response 0.3, ζ 0.82)
(springPresets.ts:95–99). The accepted probe/prototype rack that produced every §2 H5 number is
(0.6, 1.0); at (0.3, 0.82) geometry t99 lands far below the 560–700ms band and rings ~1%
(PROBE-NOTES dishonesty 2 concedes this). The one concrete manifest the family shows a consumer is
wrong. Second-order defect: the correct pair (0.6, 1.0) lives in NO register — the spec claims the
conductor is "a consumer of the springPresets vocabulary, never a second register," yet its only
real surface needs an off-register pair with no stated home. Close: correct the §1 manifest to the
probe rack; pin where per-surface pairs live (the presets-in-consumers per-primitive-default seam
already documented in springPresets.ts:117–122, or a new named row) and say so in the spec.

**G2 — the inherits contradiction and the falsified cost statement.** SPEC §1: registered vars
`inherits: false`, written on the surface root only, cost = "a one-element style recalc." The
prototype registers all four channel vars `inherits: true` (index.html:9–12) because the
depth-graded rows are descendants and must read them — so the per-frame write invalidates the
stage subtree, not one element. The spec's "honest cost statement" is falsified by its own
prototype, and the shipped precedent it cites (`--flex-vel` inherits:false, single-element
invalidation) does not cover the actual publication pattern. U10 remains open in its real form:
the Chrome stress measured conductor JS ms/frame (0.06 avg) — JS was never the suspect; the
style-recalc ms/frame under inherits:true with N conductors is unmeasured. Close: pick the
mechanism (inherits:true accepted with a measured recalc budget, or per-row JS writes keeping
inherits:false), amend the spec, and capture the devtools recalc trace on the stress page in both
engines.

**G3 — the Safari arm does not exist.** Charter: Safari 2026 is the common denominator. REGISTRY
invariant: "Chrome+Safari both verified in paint." The VERIFIED section is Chrome 150 only and
says so; its verdict line "PROVES" overstates — it proves the Chrome arm. Specifically open on
Safari: the whole battery in paint; the blur-rides-element-opacity claim (dishonesty 8 — asserted
for "both engines in practice" with no version-cited evidence anywhere in the family corpus; this
is the one Safari claim without evidence); the nested-backdrop-filter cost cliff (dishonesty 9).
Close: the serialized browser seat runs the same battery + held-scrub screenshots + the mid-relax
computed sample in Safari 26, and the VERIFIED verdict is re-stamped per engine.

**G4 — a load-bearing input map exists only in the prototype.** The medium channel's
`sat: 0.12` saturating input map is absent from SPEC §1's manifest and from the law vocabulary,
yet the family's flagship acceptance case depends on it: at the battery's catch point (g≈0.64)
the medium target is min(1, g/0.12)=1 — remove sat and "interrupt: medium min 1.000" fails.
PROBE-NOTES flags it (dishonesty 3); the spec was not amended. Downstream unexamined behavior: a
manual scrub below g=0.12 maps the medium proportionally (a hesitant 6% pull holds blur at half —
is that the intended anti-cliff, or off-MARKS?), and a scrub-to-closed never takes the release
hold, so a fully-held manual dismissal has no empty-medium beat and relaxes the medium at the
open tau (0.03 — a ~30ms blur pop). MARKS only measured released dismissals, so this is
unadjudicated, not wrong — but the spec must own the scrub-regime medium law explicitly. Close:
promote input shaping into the law vocabulary with stated semantics per regime; adjudicate
scrub-close medium behavior against MARKS (or a new burst) and write it down.

**G5 — the delay law as specced is wrong.** SPEC §1: "delay (transport delay + source routing)."
The implementation that passes the bands is a dead-time gate on the channel's own response armed
only on wake-from-parked, then a chase of the LIVE source (index.html:331, 410–413); the true
transport-delay reading measures periphery lag ~211ms — off-band (dishonesty 4). Also unpinned:
the gate does not re-arm on mid-flight retargets (close-while-awake has no periphery delay — is
that intended?), and the "four laws, closed" framing does not match the implementation's shape
(three laws plus a `delay`+`source` modifier on follow). Close: rewrite the law's definition to
the gate semantics, specify gate re-arm rules for every drive transition, and reconcile the
vocabulary count with the real shape.

**G6 — per-frame direction inference breaks the H2 mechanism the spec commits to.** stepChannel
derives direction each frame as `target < x ? close : open` (index.html:333). For an underdamped
direction-asymmetric spring — exactly what H2 orders for the overpull bound register (ζ bracket
0.30–0.65, close-law override) — every overshoot crossing flips the active (response, ζ) pair
mid-oscillation. The prototype never trips this because its geometry channel is ζ=1 with no close
override; no artifact flags it. Close: latch direction at drive time (scrub/release), not per
frame; add a probe row with an underdamped direction-asymmetric spring channel proving continuity
through overshoot.

**G7 — the spec's depth-grading formula contradicts MARKS and the prototype.** SPEC §1:
"×(1 + 0.2·depthIndex)" — at depthIndex 3 that is +60% travel for the deepest row. MARKS §5
measured deepest/shallowest ≈ 1.22; the prototype silently normalized to ×(1 + 0.2·depth/3) and
the Chrome measurement (1.20) validates the normalized form. PROBE-NOTES missed this divergence.
Close: correct the spec formula to a normalized gain (or define depthIndex ∈ [0,1]) so a pass-2
implementer cannot transcribe +60%.

**G8 — gate integrity: the battery displays MARKS bands but passes on wider ones.** Every row's
displayed band is the MARKS figure while the pass logic uses systematically wider bands (fade
150–250 shown, 130–270 gated; beat 100–200 shown, 80–220 gated; content-out ~170 shown, 110–210
gated — a 115ms content-out, outside any reading of MARKS, would print PASS beside "~170 ms").
The node check's 99ms beat already PASSes beside a 100–200 label. Only the beat widening is
disclosed (dishonesty 7). Additionally the interrupt max-step bound is derived from the fastest
follower active in the scripted episode (τ 0.055) and holds only in that parameter region — a
catch below the sat threshold would step the medium at τ 0.03 past the printed bound. Close:
derive each gate band as MARKS ± the declared frame quantization and print the GATE band in the
table; derive the step bound from the fastest law reachable in the episode, or assert the
episode's parameter region.

**G9 — the battery is self-referential; paint binding is spot-checked, not measured.** The 12
rows sample the conductor's internal channel values from its own onFrame — a disconnected CSS var
(a typo'd name) would still print 12/12 PASS. The VERIFIED seat did bind spot checks to paint
(rect reads for depth travel and PRM, three held-state screenshots, one mid-relax computed
sample), which covers the park/PRM/depth/medium-persistence claims — but no timing band (fade
t90, geometry t99, the beat) was ever measured from paint-side observation, and the phrase "full
battery in live paint" conflates state sampling in a live page with paint measurement. Close: one
paint-side corroboration of the timing rows (computed-style or pixel sampling of opacity/transform
for at least fade t90 and geometry t99, both engines), or an explicit spec note that battery rows
certify integrator math and the paint-binding evidence is the screenshot/rect set.

**G10 — H1/H2/H3 have zero F3-owned evidence and lean on unbuilt neighbors.** REGISTRY: every
family is a complete formulation of the whole problem. F3's prototype proves H5 (+ depth grading
+ velocity-seeded overshoot analytics). The H1 reveal ladder bands, sides-breathe, clipped tray;
the H2 bound-compression channel, taffy dead-band, weak-well mid-detent retarget (a named F3
mechanism — "retarget onward at arrival-or-170ms" — probed nowhere in F3); the H3 lens rack
(light-leads-emergent, oversized arrival from arrival velocity) — all asserted, none prototyped,
several delegated to F1/F5 constructions that are competing families, not shipped substrates.
Legitimate as a round-2 merge posture; not closable as-is. Close: per hallmark, either an F3
prototype/probe (a lens-rack micro-page proving τ_light ≪ response_geometry yields
light-leads in paint; a weak-well retarget probe hitting ~170ms catch) or an explicit spec
demotion of the hallmark to "consumed from family X, contingent on its selection."

**G11 — H6 is a pointer, not a design.** The task statement names momentum/velocity/acceleration
tracking as a facility for ALL components. SPEC §2 H6 relocates it to "the gesture layer" and
cites X2 §4's unification problem — accurately — but ships no API sketch, no probe, no owner. The
conductor's (g, ġ_release) seam is clean, but the facility itself is the elegant-reduction trap's
"and then the hard part" as long as no family artifact designs it. Close: a pass-2 kinematics
primitive sketch (element-space v+a, event-window-gated, the X2 §4 missing pieces a–c) with its
CSS projection vocabulary, or an explicit charter ruling on which seat owns it.

**G12 — U9, the consumer census.** The adoption boundary ("~6–10 gesture-coupled surfaces") is a
guess; no census of the real library exists, and the migration line versus the degenerate CSS
manifest (itself "documented" but not yet written anywhere a consumer can find) is unpinned. The
consumer-less-substrate question stays open until named components with file paths appear. Close:
the pass-2 census — the exact surfaces, each with its manifest, plus the degenerate-manifest doc.

**G13 — acknowledged-open remainder.** U12 (hybrid scroll-timeline scrub, Safari 26.4 threaded)
unprototyped — optional path, honestly gated; U13 (rubber-band ratio) blocked on the 24fps burst
upstream of the rack; prototype hygiene: dead `delayedOK` state (index.html:307), the PRM-stale
readout badge, the tempo rebuild dropping in-flight velocity. Close: U12 prototype or explicit
deferral to a named wave; the burst; a cleanup pass.

## Convergence

The family's center is proven in paint on one engine with honest instrumentation — that is real
and most of the family's burden. Against it: two internal spec contradictions a pass-2 implementer
would transcribe (G1, G7), a mandated-but-missing second engine (G3), an undocumented load-bearing
mechanism (G4), a specced law that is wrong as written (G5), a latent mechanism break on the
spec's own H2 path (G6), gate-integrity slack (G8, G9), and three hallmarks plus the facility
resting on assertion or neighbors (G10, G11), with U9/U12/U13 open by the spec's own table.

Convergence: 60%.
