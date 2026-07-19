# CRIT-F4 — fresh adversarial critique of ENERGY-FIELD (IOS27-MICRO pass 2)

verified-model: claude-fable-5 (system-context model ID, verbatim). Fresh adversarial-critic
seat, 2026-07-18. Authored nothing in this campaign; assumed the cured state still wrong and
went looking.

Read in full: SPEC-F4 (cured in place, §1–§8), prototypes/f4-energy-field/ (index.html,
check.mjs, PROBE-NOTES.md incl. pass-1 VERIFIED, PASS-2 SAFARI ARM, PASS-2 CURE, PASS-2
RE-VERIFY), cures-F4.md, reverify-queue.md §F4 + reverify.md, ARBITRATION.md, safari-arm.md,
pass-1 CRIT-F4, SUFFUSION-MATRIX (§3 binding), MARKS incl. PASS-2 CORRECTIONS C1–C7 + the
independent re-derivation, AGGLOMERATION. Independently re-verified on disk: the
useDragVelocity replica in check.mjs against `src/composables/dom/useDragVelocity.ts`
(tanh 0.06 / ceil 0.7 / EMA 0.65–0.35 / `frameDelta *= 0.6` / `toFixed(4)` — all match; the
tanh(v/400) steady-state arithmetic re-derived and confirmed), `useScrollTrigger.velocity`
at the cited line, the gauge/seed/live-jump code paths in index.html, and every gate band in
check.mjs against MARKS.

## What survives the assault

The cure pass was real work, and most of it holds under hostile reading: G2 (debounce-primary
scroll close) is cured in the artifact, gated by a check that catches the pre-cure shape, and
CLOSED in paint on both engines; G8's true delay line killed the ½-second tail AND the
horizontal-fling strand, verified at 104ms lag with the old follower's residual printed for
the record; G7's single-writer registry throws on real elements at load; G9's check.mjs is
committed, re-runnable, and honestly labeled — the LOCK/GATE discipline is genuine, and two of
its GATEs plus the live-jump row FAILED in the re-verify, which is the strongest possible
evidence the gates are alive; G10's versions are measured or struck; G12's viewport regrade is
live in computed style. The "byte-identical" retraction is exemplary: the cure seat's own
honest regression found the shipped law is tanh(v/400), said so, and re-founded the parity
contract on it — I re-derived the arithmetic and it is correct. The H6 seat (§7) is argued
with four §3.2 cells live in paint and the boundary confession intact. The re-verify seat
reported its own failures with mechanisms attached. This family is run honestly. It is not
yet converged.

## Pass-1 gap audit (each row checked against evidence, not against the ledger's word)

| pass-1 gap | verdict | basis |
|---|---|---|
| G1 Safari absent | CLOSED (desktop proxy), residues stamped | safari-arm rows in PROBE-NOTES; re-raster TOOL-DEFER + iOS DEVICE-DEFER correctly fenced out of gates |
| G2 scroll defect | CLOSED in paint | cure in channel + U-SCROLL + reverify row 1 both engines; the 50µs sub-clause miss is P4 below, a different defect |
| G3 live continuity | NOT CLOSED — transformed | the gauge fixed the 14× jump; the paint run then broke the law itself (P1); cures-F4's "CURED + QUEUED-PAINT" is superseded by the queue's own result |
| G4 tautological gates | CLOSED, one residue | U-REG can fail and tests an independent pipeline; demotions honest; replica-drift residue in P9c |
| G5 threshold contradiction | HALF-CLOSED — reopened post-release | floor holds under the finger (verified); the springback re-light violates the claim cross-engine (P2) |
| G6 schema + delivery | CLOSED at schema, OPEN at source-of-truth | one six-field schema, stamped delivery live; the single-source amplitude claim is underivable as written (P5) |
| G7 contention | CLOSED | U-OWN, real elements, membership unchanged on throw |
| G8 periphery | CLOSED in paint | reverify row 3; tail and strand both dead |
| G9 durability + coverage | CLOSED | check.mjs committed; all queued captures banked (6a/6b/6c, U7 pair) |
| G10 versions + kin | CLOSED | scrollend measured, fractional-coords struck, kin verified on disk this seat |
| G11 discrimination | MOSTLY CLOSED | re-scope honest; the "blind" call is procedurally void (P6); the velocity pair's corpus citation is stale (inside P3) |
| G12 depth sawtooth | CLOSED | graded k 1.00→1.20 in computed style; staleness-within-gesture liberty unlisted (P9b) |
| G13 carried rows | CARRIED correctly | §6 re-ruled; U7 still open by its own table |

No pass-1 gap was argued down without evidence. Two were closed on paper and reopened by the
family's own honest gates — the correct outcome of gates that work.

## Open gaps, enumerated

### P1 — the C¹ seeding law fails outside the tanh-flat region (G3's successor; MATERIAL)

Reverify, both engines: scripted fling passes Chrome (0.0102) and FAILS WebKit (0.0346 —
60Hz doubles the one-frame deceleration bite); moderate manual releases (vy 130–580px/s)
breach the ≤0.032 bound 2–5× (0.045–0.172) everywhere. jump ≈ E′(v)·a·dt/0.35. The root is
deeper than a first-frame bite: `gauge = vFinger/v₀ = 1/0.35`, a constant — the rubber map's
Jacobian frozen at the release frame. The finger-space fiction is exact for one frame and
decays every frame after; the whole post-release energy envelope (arrival heat, cool) is
gauge-distorted, and nothing gates the post-release E decay against any band.
**Close:** pass-3 spec states the law's completion — first-frame damping or a deceleration
budget, or the position-dependent gauge (rubber-inverse Jacobian at x(t), which dissolves the
constant-2.857 artifact at its root) — AND states the 0.032 bound's provenance honestly
([DESIGN]: MARKS cannot measure energy continuity; the bound is the pass-1 probe's own number
plus headroom). Re-gate exactly where it failed: moderate manual releases, both engines, both
refresh rates.

### P2 — the slow-place springback re-lights the field (G5 reopened; MATERIAL)

For ANY vy≠0 the gauge is 2.857; a zero-seed-class release's displacement-bought spring
velocity is amplified into E 0.378/0.383 → glow 0.111/0.119 after a slow place, cross-engine.
"A slow place shows no fireworks" — the spec's own mechanical-truth claim (§1) — is violated
post-release; the page's own two cells disagree (gesture 0.273 vs pDock 0.378), printed, not
hidden. Same root as P1.
**Close:** the zero-seed gauge clause (gauge→1 below a release-velocity threshold) — with the
threshold's own discontinuity handled (a hard snap at the threshold creates a NEW C¹ break for
releases straddling it; ramp it or use the Jacobian-true gauge from P1). Acceptance: the θ_g
row re-run sampling the FULL gesture including springback; the two page cells agree.

### P3 — the carry band is probe parity dressed as MARKS, on voided and contaminated corpus numbers (NEW; the named disease, live instance)

The lineage, traced end to end: MARKS §6 measures ONE carry number — 27px into the ceiling —
at release velocity **1150–1300px/s** (expansion #1). C3's correction reframes that very
event's arrest as **finger-owned deceleration** (the pin was finger-held 250ms), so even the
27px is not a clean free-momentum read. C2 voids "~2600px/s" outright (a 4fps mean; the true
collapse-#2 peak is ~6,500px/s). From that: the pass-1 sim spread minted "27–32px", check.mjs
widened it to 25–34 (LOCK-labeled, fine), and then spec §5 [P2], §7 provision 8, and cures-F4
G1 all bank "fling carry +30.7/+28.0px **inside the MARKS 27–32 band**" as cross-engine
acceptance evidence — attributing the 27px band to the 2600 fling. Meanwhile the prototype's
flick at the MATCHED velocity (1150) carries 9.1px — a 3× shortfall against the corpus number
at its own velocity — confronted nowhere. And the spec contradicts itself: §3's [P2] row
correctly credits the 27px carry to carrier-plane seeding, while §5/§7 still count it as F4
evidence. The band chain is MARKS → probe spread → wider check band, every widening
probe-derived. Cures-F4's "C3: no new claim leans on the mid-detent catch or the collapse-#1
anatomy" is literally true and missed this: the carry leans on the expansion-#1 PIN anatomy,
which C3 also touched.
**Close:** demote every carry row to [STAND-IN LOCK] (the carrier is {0.68, 0.64}, admitted
corpus-false vs C2 — the band validates the stand-in's tuning, nothing else); strike "inside
the MARKS 27–32 band" from §5/§7/cures or restate as stand-in parity; amend §1/§3's
"1150-vs-2600 distinction MARKS §6 measures" to corpus-current velocities (1150 vs ~6,500, or
label the pair [DESIGN]); re-derive any carry acceptance only at the round-2 merged carrier
under the C2 register, with the C3 finger-contamination caveat stamped on the 27px source.

### P4 — the Chrome fan-out bound is missed by its own gate (known; decision)

55.6µs median EMA (sampler-free polls 12.7–78.5µs) vs the ≤50µs bound at 66–150 writes/frame
@120Hz, while fps (120) and long-frame (0>24ms) budgets hold with margin. The bound's
provenance is nowhere stated — it predates the 33-consumer burst reality.
**Close:** pass-3 spec seat re-swears the bound with stated provenance (a per-frame JS budget
argument, not a remembered number) or cures the writer (batch the setProperty fan-out,
skip-unchanged already exists — measure again). Either outcome documented; WebKit stays
frame-gap-gated by the 1ms-clock law.

### P5 — the verb sheet's single-source claim is underivable from the six-field schema (NEW; spec-level)

Spec §1: "the role table is the single source — the verb sheet's amplitudes derive from it at
build, so the two homes cannot drift." The schema is {gain, cap, θ_g, θ_s, verb(+τ)} — it
contains NO amplitude fields, and the prototype's verb CSS carries the amplitudes as hand
numbers (0.075/0.045 smear, 0.21/0.16 compress, 0.35+0.65·E squish-depth, bloom 0.16…) plus
the θs duplicated as CSS literals (0.3, 0.6 in the clamp() legs) hand-synced with ROLE_TABLE.
A generator consuming the sworn table cannot emit those numbers — they live nowhere in it.
Either the schema grows per-verb amplitude entries (a tranche amendment by the spec's own
adding-a-row rule) or the claim restates honestly: TWO homes — the table (gains/caps/θs) and
the verb-kind definitions (amplitudes) — with a build-time drift gate between generated CSS
and table. The elegant-reduction trap, recurring one level down from pass-1's G6.
**Close:** ARBITRATION §3.2-F4(v)'s generated `@utility` artifact must actually consume the
table (θs and gains emitted, never hand-synced), name where amplitudes live, and ship a drift
gate (generated output diffed against the source table in CI). The spec sentence is amended to
match whichever answer is chosen.

### P6 — U7's "blind" judge was the capturing seat (procedural)

Reverify row 5: the pair passed numerically and "the judge called the pair blind" — but the
judge captured, named, and filed the crops (`f4-p2-u7-flick/fling.png`). A seat that labeled
the exhibits cannot call them blind; the gate's one perceptual clause was not honestly
executable by a single seat. ARBITRATION §3.2-F4(iv) still lists the pair as a pass-3
obligation, which implicitly concedes this.
**Close:** one independent seat (not the capturer) judges unlabeled, order-randomized crops;
verdict recorded with the seat named. A failure re-tunes k/θ — the gate doing its job.

### P7 — the θ_g floor's headroom is one derived mean with no variance law (NEW; design)

θ_g 0.30 sits 0.027 above E(280) = 0.273, and 280px/s is itself a derived mean (≈700px/2.5s
from MARKS §6's slow expansion). A real slow human drag jitters; instantaneous velocity
moments above ~310px/s cross the floor and flash low-opacity glow mid-"slow place". The
scripted profile (constant 280) cannot exercise this; the floor's slack is an accident of one
number, not a stated law. Adjacent to P2 (both are θ_g robustness) but distinct: this one
fires DURING the gesture.
**Close:** state the headroom law (slow-place envelope quantile vs θ_g, from a jittered
profile) or give the glow leg an attack constant that ignores sub-perceptual transients; add
one jittered slow-drag row (±60px/s at 2–3Hz around 280) to the battery with acceptance
"glow 0 every frame".

### P8 — the --impulse binding is asserted, not designed (small; roster hygiene)

§7 provision 4: the prototype's arrival heat IS `--impulse` and "binds to it as the roster
name at adoption." But the arrival heat is the spring channel's gauged E — exactly what
`--energy` publishes in the post-release regime (the spring is the MAX winner there). At
adoption, `--impulse` either duplicates `--energy`'s spring arm under a second name (the
"six, no more" roster bruised in spirit — two names, one quantity) or carries its own decay
clock that no artifact designs. The provision-4 RULING (no continuous acceleration variable)
is honored; the binding mechanics are not.
**Close:** one paragraph in the pass-3 spec: either `--impulse` := a release-burst with its
OWN clock and a named consumer distinct from the spring's E (designed, gated), or the roster
row re-words to "reserved — currently satisfied by the spring arm of `--energy`" and the
adoption binding is dropped. Either answer is fine; the ambiguity is not.

### P9 — hygiene remainders, named

(a) **pinZero re-arm:** rAF parks ~160ms after a PRM pin — `_quiet`'s τ+60ms zero-drain
re-arms after `pinZero()` cleared the line. Only zeros publish (cosmetic), the one-line
suppression is named in the reverify NOTE, unapplied. Close: apply it; PRM row re-run asserts
park ≤1 frame after pin.
(b) **Depth-grade staleness within a gesture:** the rect pass runs at channel-open only; rows
migrating across the viewport during a long burst keep their open-time gain. MARKS §5 grades
by current viewport position. A defensible performance liberty — but it belongs in the
bounded-dishonesties ledger, where it currently is not. Close: one ledger line, or a re-grade
on a cheap cadence (every N frames) if the merged battery ever gates a long-scroll row.
(c) **U-REG replays a hand-copied replica:** faithful today (verified against disk this
seat), but nothing catches drift when `useDragVelocity.ts` changes. Close: at library
adoption the gate imports the shipped module or checksums the source region it mirrors.
(d) Carried, correctly stamped, listed for completeness — not gaps: WebKit re-raster trace
TOOL-DEFER; iOS device rows DEVICE-DEFER; the `@utility` build-work (inside P5); the carrier
retune at the round-2 merge (inside P3's demotion).

## Failure-mode checklist, disposition

- **gate circularity (the named disease)** — HIT at P3: the carry band's every widening is
  probe-derived while its label says MARKS, and two spec sections bank it after a third
  credited it away. Partial at P1: the 0.032 bound is the pass-1 probe's own number used as
  law with provenance unstated. The check.mjs bands themselves are honestly LOCK-labeled;
  the disease lives in the SPEC's citations, not the check file.
- gates that cannot fail — CURED as a class: U-CONT-LIVE, U-REG, U-SCROLL, U-DELAY, U-OWN are
  genuinely falsifiable, and two failed in paint. The demotions (U-LAW/U-FOLD/U-CONT →
  LOCK) are correct.
- vacuous convergence — clean: the re-verify recorded FAILs and the family verdict is PARTIAL.
- elegant-reduction trap — HIT at P5, the pass-1 G6 trap recurring one level down.
- masked fallbacks — clean: the re-light prints on the page's own cells; the jump row goes
  red; nothing hides.
- spec-cites-itself — HIT at P3 (§5/§7 vs §3 internal contradiction).
- Safari claims without cited evidence — clean: measured, struck, or stamped DEFER.
- prototype dishonesty — the ledger is honest; P9b is the one unlisted liberty found.
- consumer-less substrate — clean: §3.2 cells live, in-tree adopters named.

## Convergence

Since pass 1 (62%): seven pass-1 gaps closed with cross-engine paint evidence, three more
substantially closed, the H6 vacancy filled with live cells, the evidence apparatus made
durable and honest enough that it caught its own physics being wrong — which is the campaign
working as designed. Against that: the two quantified physics defects (P1/P2) sit exactly on
the family's most-sold seam — C¹ continuity, the breath-of-life clause — and share one
unfixed root (the frozen-Jacobian gauge); the carry evidence needs a provenance demotion
(P3); one budget decision (P4), one spec-level source-of-truth repair (P5), and four
lesser items (P6–P9) remain. By the ARBITRATION arithmetic no seat may claim convergence
before pass 4 regardless; this family's pass-3 burden is §3.2-F4(i–v) plus P3, P5, and P7
from this critique.

**Convergence: 78%.** The architecture is real and cross-engine; the seam law is not yet a
law, and the corpus numbers under the carry band are not the corpus.
