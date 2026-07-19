# CRIT-F1 — fresh adversarial critique of family F1 SCALAR-SPINE, pass 2

verified-model: claude-fable-5 (system-context model ID, verbatim). Fresh adversarial critic,
pass 2 — authored nothing in this campaign; entered assuming the cured state is still wrong.

Provenance: the prior p2-crit:F1 seat was killed at wall #11 after writing an un-journaled
draft (snapshot `../salvage-wall11/CRIT-F1.md`, byte-identical to the tree copy at resume).
Per the salvage README the resumed critic rewrites and only journaled critiques are read.
This document re-derives every verdict from the artifacts, not from the draft: I re-ran the
battery and audited each claim on disk myself. Where my findings coincide with the draft's
seven gaps I keep its OG numbering so the cure ledgers cross-reference cleanly; OG8–OG9 are
new findings the draft missed.

Read whole: SPEC-F1 (cured in place, §7 cure log), cures-F1.md, the F1 prototype (index.html
physics block + wiring, check.mjs, PROBE-NOTES incl. VERIFIED / PASS-2 SAFARI ARM / PASS-2
CURES / PASS-2 RE-VERIFY), reverify.md + reverify-queue.md §F1, safari-arm.md,
ARBITRATION.md, CRIT-F1 pass 1, AGGLOMERATION.md, MARKS incl. PASS-2 CORRECTIONS C1–C7 + the
independent re-derivation, SUFFUSION-MATRIX (§3.3 F1 row binding), both salvage records.

Re-derived myself this seat: `node check.mjs` = 38 rows, 0 FAIL, ALL CHECKS PASS; every
band's source tag read against MARKS by hand (the full output audited, not the summary
line); on disk — domain [−0.10, 1.19] with commit boundary 0.08 (index.html:89), clocks
20/120 + 65/55ms with θ 0.02/0.10 (:559–569), registers (0.35, 0.80) + pin-release
(0.22, 0.75) DESIGN (:505–506), INTENT {proj 0.15, hyst 0.10, velTau 120ms, idleAfter 80ms,
idleTau 100ms} (:575), WELL 0.55 / V_CATCH 2.2 / DECAY_K 3.0 (:583), `scenario(target, fn)`
(:1131), the live catch cell gating `dwellOk && nearOk && landOk` (:1055–1062), the probe
supersession header, springPresets.ts dock row (0.30, 0.82) at HEAD, REGISTRY.md's
compositor-first sentence, and the side-breathe transfer (:99–101).

## The pass-1 ledger, audited gap by gap

Gate-circularity is the named disease; every verdict below rests on my own band audit and
source reads, never on a cure ledger's word.

- **G1 (Safari) — CLOSED for the desktop proxy.** PROVES-IN-WEBKIT (WebKit 26.5, material
  verdicts on the video path per the safari-arm harness laws) plus the re-verify
  re-measurement under the re-fit constants on BOTH engines (Chrome 150 @120Hz, WebKit 26.5
  @60Hz; CC 12/12, Maps all-PASS). The pass-1 and safari-arm live columns are correctly
  demoted to history everywhere they appear. Remainders stamped, never upgraded: WebKit
  recalc/residency attribution TOOL-DEFER, real-device iOS DEVICE-DEFER.
- **G2 (probe-parity bands) — CLOSED; label residues remain (OG2, and see OG3's missing
  gate).** The two protected constants were genuinely re-fit to the corpus, not the bands to
  the constants: medium attack 25→20ms puts open-medium-95% at 92ms inside the ≤100ms §5
  cliff; release 140→120ms puts close-medium-gone at 623ms inside [600, 650] (my own
  derivation from §5: 18.10−17.48 ≈ 620ms; C6 ≈ 630ms — the band is corpus-true).
  fade:stretch now cites the raw component bands (600–650/150–250 ⇒ 2.4–4.33; sim 3.036
  inside). Sim-parity survives only as labeled [REG-LOCK] rows. The re-verify's
  stale-physics tripwire (the promised ~20/~60ms drift must appear live or the row FAILS)
  is a gate that can fail and did not — and the measured drift (96/622 Chrome, 91/630
  WebKit vs the banked 112/686 class) is exactly the promised one.
- **G3 (unfailable catch) — CLOSED.** The shipped trigger is the spec's projected-momentum
  policy (decayRest-style path, v′=−k·v, k=3.0, V_CATCH 2.2 — read in source); the 10-row
  truth table refuses three distinct ways (slow ease, −3.2 flick-close at |v| 1.85 < 2.2,
  motion away) and catches the pass-1 counterexample (0.70 fast fall, |v| at well 3.05);
  the page cells gate for real. The 588-vs-406ms delta is explained (landing-metric
  mismatch), unified on the park epsilon both sides, and the live gate bit at ±40ms and
  held (581/597 vs sim 571). The [DESIGN] grade is carried honestly everywhere C3 voided
  the corpus instance, including the check.mjs section header.
- **G4 (H1 mechanism) — CLOSED as ruled; residues OG4 (registry) and OG9 (spec currency).**
  Clip-path ruled with the scaleY-smear argument stated, cost priced on both engines,
  Chrome residency GREEN (0 card-region Paints across six growth windows, 0 in-flight
  frames >24ms) under a falsifiable RED/revert clause; WebKit residency TOOL-DEFER, stamped.
- **G5 (two parameterizations) — CLOSED.** One θ rule (0.02 open-intent / 0.10 close-intent)
  in physics, page, spec, and check; the pass-1 probe carries the supersession header on
  disk; pass-1 runs kept verbatim as history.
- **G6 (unblessed intent heuristic) — CLOSED.** The law is specced (projection 0.15s, v̄
  through τ=120ms, hysteresis 0.5±0.10, idle decay τ=100ms after 80ms still), shipped at
  those exact constants, gated six ways in check.mjs, and live-verified on both engines
  (0 flips under ±13.6px @6Hz from both latch states; exactly one flip on the slow cross at
  value 0.581/0.577; early commit at 0.353/0.294 < 0.5; releases glide to the LATCH's
  target). The re-verify's substitute observables (the IIFE-scope queue-precondition
  correction) are adequate and disclosed — badge and fade-direction concurred on every row.
- **G7 (PRM) — CLOSED.** `scenario(target, fn)` shipped and verified: one-poll seats on both
  engines, engine rAF parked throughout, the pre-cure no-op did not reproduce.
- **G8 (H3 assertion + slot axis) — CLOSED by demotion; the argued-down solo probe is
  legitimate.** Clocks+seam stated in §2/§3; the domain note (N strong wells, i → i/(N−1),
  configuration not type) closes the formal gap; the probe obligation transferred NAMED to
  the merge seat and ARBITRATION R2 fixed its acceptance set. Declining the F1-solo rig was
  the checklist applied (consumer-less substrate), not evaded. But note: demotion is not
  evidence — the clock contract remains unexercised anywhere (OG6-b).
- **G9 (H6 owner) — CLOSED by cession.** F4 owns the facility and passed its existential
  test (ARBITRATION R4/R5, nine of nine provisions covered); F1's exact contribution is
  stated; ACCELERATION struck per the suffusion ruling.
- **G10 (CSS-arm rate infidelity) — ARGUED-DOWN, acceptably.** The restriction to
  non-choreography channels loses nothing the corpus demands; the JS arm carries every
  choreography channel and is the proven shape on both engines; the beat/min parity probe
  is the named entry ticket. Open only as an optional pass-3 ticket (OG6-e).
- **G11 (margin text defect) — CLOSED as written; a derivation residue surfaced (OG8).**
  §1 separates margin depth (deeper UP) from compression gain (harder DOWN) in one place;
  H2 and PROBE-NOTES #8 read against it. The μ constants themselves carry a stale
  normalization — see OG8.
- **G12 (R3 unarbitrated) — CLOSED.** MARKS C1/C2 dissolved the double inconsistency (both
  prior brackets fitted finger motion); the C2 register (0.35, ζ0.80) is adopted; the
  32–33% overshoot class is measured DEAD live (1.3%/0.8%); the arbitration was
  independently re-derived (MARKS VERIFICATION, point-identical series). SUFFUSION §6-q2
  dissolves with it — no fence exemption needed.

## Failure-mode checklist sweep

- Vacuous convergence: no — both-engine paint evidence under corpus-true bands, re-run
  under the re-fit constants, with a tripwire that could have failed.
- Spec-cites-itself circularity: cured at the band layer; residues named (OG2, OG3's
  gate absence).
- Gates that cannot fail: the pass-1 instances are dead (catch cells gate in source; truth
  table refuses three ways). One class of seat-measured evidence still has NO gate at all
  (OG3) — an absent gate is the same disease as an unfailable one.
- Elegant-reduction trap: the merged medium law's release arm is an open decision, but
  named, owned, and scenario-specified (ARBITRATION §1.2/§1.5-1) — tracked, not hidden.
- Legacy aliases: none; `--gl-t` dies into `--scrub-t` as a sworn clean break (pass-3).
- Masked fallbacks: none — H4's pre-blurred fallback was measured unnecessary in WebKit
  paint and NOT shipped; the CSS-arm restriction is a fence with an entry ticket.
- Unverified gestalt: two instances (OG1, OG6-b).
- Consumer-less substrate: none live; the solo slot-axis rig was declined on exactly this
  ground; the ladder's one consumer being a mock card is named at OG6-d.
- Honesty law on bands: audited row by row — CC, overpull, flung, and pin bands trace to
  MARKS §5/C2/C3 numbers I re-derived; [DESIGN]/[REG-LOCK] labels are present and correct
  except the one hybrid named at OG2.

## Open gaps, enumerated

### OG1 — the −21% height-compression constant is corpus-unfixed and its live evidence is self-referential

C1 states plainly: "Height −21% and the bottom-edge claims: unverified this pass (no
reliable slab-bottom track)." The spec ships −21% stamped "pass-1 read, unverified by the
re-burst" — honest — but the §3 evidence column ("live −6.2%/−17.4% at 0.83 depth,
linear") proves only that the prototype reproduces its own constant, never that the corpus
contains it. A pass-1 4fps read the 24fps arbitration could not confirm is exactly the
class C1 voided elsewhere. The bottom-edge-pinned-under-downpull corpus claim shares C1's
unverified stamp (the PROTOTYPE's bottom edge is proven immobile on both engines; the
iOS behavior it imitates is not re-verified).
**Close:** a slab-bottom tracker read from burst24-overpull (or a fresh 60fps window)
fixing the down-pull height gain — or re-grade −21% to [DESIGN] and strip the "measured"
adjacency in §2-H2/§3, with the bottom-edge clause stamped the same way.

### OG2 — one band-label residue: interrupt medium-min [0.40, 0.85] wears a [MARKS §5] tag on corpus-silent numbers

Verified in my own battery run: `band [0.4, 0.85] [MARKS §5 qualitative floor]`. MARKS §5
gives a qualitative read (blur "HELD featureless", "never resolved"); 0.40 and 0.85 are
quantifications the corpus never states. The tag self-discloses ("qualitative floor") but
the band law's own taxonomy says corpus-silent numbers are [DESIGN]. This matters beyond
labeling: the merged medium law's release arm is adjudicated by the union interrupt battery
(F1's mid-close dip vs F3's g≥sat hold — ARBITRATION §1.2, with stated preference for F1's
emergent form), and an F1-side [MARKS] tag pre-claims corpus authority for one dialect in
exactly the place the battery is supposed to decide. The fade-min row's [0, 0.1]
quantification of "~0" is the same class at lower stakes.
**Close:** retag both rows [DESIGN, MARKS §5 qualitative anchor] (one line each, check.mjs
+ spec H5); the union battery owns the final band.

### OG3 — spec text, shipped constant, and acceptance row disagree on the side breathe, and no gate exists to catch it

SPEC §2-H1: "sides breathe as a scaleX band peaking +4.5%"; §3 row 1 targets "+4–5% (§1)".
The shipped transfer (index.html:101) is `scaleX(0.964 + 0.036·grow)` = +3.73% rest-relative
— while the adjacent comment (:99) still says "+~4.5%" — and both engines measured +3.74%,
outside the spec's own stated band. MARKS admits either reading (width at top+50:
1101→1142 = +3.7%; detent width 1150±10 vs 1101 = +4.5% — two different width definitions),
but the family must pick one, say which MARKS read it derives from, and gate it. This
slipped precisely because breathe, pin squeeze, compression linearity, and bottom-edge
immobility are seat-measured evidence with no encoded gate anywhere — an absent gate is as
unfailable as a hard-wired one.
**Close:** pick the constant with its MARKS derivation named, align §2-H1/§3/the code
comment, and add a [MARKS §1] breathe band to check.mjs plus a live geometry cell (breathe,
pin squeeze, bottom-edge delta).

### OG4 — the clip-path invariant amendment lives only in SPEC-F1; the registry still swears the old vocabulary

REGISTRY.md (cross-family bounds, "Compositor-first: transform/opacity/filter only on the
hot path; never an animated width") — read on disk this seat. SPEC-F1 §2-H1 amended this
unilaterally (+clip-path on the growth channel under cadence bounds + the R5 revert
clause, now half-decided GREEN on Chrome). Two documents disagree on a sworn cross-family
invariant; F3/F4/F5 seats reading the registry would still hold the old text against F1.
**Close:** a registry-side amendment note pointing at SPEC-F1 §2-H1's clause — or the
pass-3 merged spec re-swears the invariant once and the registry points there.

### OG5 — two constants for one register: overpull/arrival (0.35, ζ0.80) vs springPreset("dock") (0.30, 0.82)

Both sit inside the C2 bracket (verified: the dock row reads (0.3, 0.82) at HEAD); the spec
says the library arm uses the dock row as-is with the 0.30→0.35 nudge optional. That is two
values for one physical register surviving pass 2 under a no-second-authority law.
ARBITRATION worklist 8 owns the reconciliation.
**Close:** pass-3 constant reconciliation — one set survives on the corpus bands, the other
becomes probe-header history; MARKS C2's own feed line ("resolve the drift TOWARD the
table") is the default.

### OG6 — the merge-transferred integration set: F1-shaped claims whose evidence does not exist yet

Open by design, owned in ARBITRATION §1.5/§3.2, listed here because it is the family's real
distance to convergence:
(a) the merged medium law green under the UNION interrupt battery (F1's 0.577 medium-min is
proven only in F1's own scenario; F3's dialect never leaves saturation);
(b) the slot-axis lens artifact — H3's clock contract still has zero exercised evidence
anywhere (F5's lens evidence rides F5's own clocks, not the spine's); the demotion is
honest, but demotion is not evidence;
(c) R4 three-spine composition against the f-0097–0117 Find My swap;
(d) the H1 ladder + calc-band authoring surface on a REAL growth surface (the mock card is
the only ladder consumer on disk);
(e) optional: the CSS-arm beat/min parity probe, if that arm ever wants choreography.
**Close:** the pass-3 merged SPINE-CONDUCTOR artifacts per ARBITRATION §3.2 (i)–(iv), each
with both-engine paint evidence under source-labeled bands. Note the arithmetic: the F4
seam defects prove integration surfaces new defects — this set is where F1's number can
still move down as well as up.

### OG7 — the deferred fence: rows that cap convergence until priced or permanently chartered

WebKit recalc attribution + clip-path residency (TOOL-DEFER, desktop Safari Web Inspector);
every row on real-device iOS Safari (DEVICE-DEFER); the rubber-band ratio c≈0.55
(BLOCKED-BY-CORPUS — no touch overlay exists in this corpus, per C1). All correctly fenced
out of gates; none may silently upgrade.
**Close:** a desktop-Safari Web Inspector session for the two TOOL-DEFER halves; a
device-lane decision (run it, or charter the desktop proxy as the tranche's floor with the
device rows moved to the wave set's π obligations); a MARKS note making c≈0.55 permanently
[DESIGN] absent a new corpus.

### OG8 — μ_up 0.19 is normalized against the VOIDED rest geometry (new this seat)

SPEC §1 grounds the margin depths in "the video pins ~130px past the top detent vs a
~60–95px down cap" and ships μ_down 0.10 < μ_up 0.19. The 0.19 is 130px over the PASS-1
travel (rest top≈2243 → detent≈1573, ≈670–700px) — and C1 voided that rest outright ("no
slab edge exists at 2243 in any rest frame"; measured rest 2336–2337). At the corrected
rest the same arithmetic gives ≈0.17, and the mixed edge anatomies (pin/detent are card-top
reads, the corrected rest is a slab-top read — C2's own warning) are unaddressed. The
"~60–95px down cap" phrase silently blends the pass-1 60–70px read with C1's 74–94px.
The G11 SEPARATION law survives untouched (μ_up > μ_down holds under any of these
denominators; μ_down 0.10 sits inside C1's 74–94px at either travel) — this is a
constants-hygiene defect, not a structural one, but it is the same disease C1 cured:
a constant whose stated corpus grounding cites voided geometry.
**Close:** re-derive μ_up under the C1 rest with one edge anatomy stated (≈0.17-class), or
re-grade the μ pair [DESIGN] with the pin-depth ratio quoted as motivation only; one
sentence in §1 either way.

### OG9 — the spec's evidence pointers lag the executed re-verify (new this seat)

SPEC-F1 still says, in five places, that the re-fit live evidence is pending: §1 ("the live
column under the re-fit clocks is queued, reverify §F1"), §4 ("the Chrome-side trace queued
to the re-verify seat"), §5 ("re-run … is queued"), §6-R1 and §6-R5 ("queued"). All of it
RAN and is banked (reverify.md: F1 7/7 — CC 12/12 live both engines, Maps all-PASS, R1
Chrome attribution 0.289ms/frame, R5 residency GREEN with the no-revert ruling, capture set
`f1-p2-*` stamped with paired-π). The direction is safe (the spec understates its
evidence), but the family's canonical artifact misstates its own evidentiary status
entering the pass-3 merge, and the R5 no-revert decision — the H1 ruling's decider — is
recorded only outside the spec that carries the revert clause.
**Close:** one currency amendment to SPEC-F1 §1/§4/§5/§6 folding the reverify verdicts (or
the pass-3 merged spec absorbs them with citations); the WebKit halves stay TOOL-DEFER as
written.

## Notes, not gaps

- The WebKit flung overshoot-per-velocity landed at 0.030s — the exact upper edge of the
  [0.015, 0.030] [MARKS C2] band (data point 0.019, model 0.020–0.024; Chrome 0.022
  mid-band). At 60Hz the crossing-velocity estimate is quantization-limited, so the
  edge-sit is plausibly measurement, not physics — but it is thin evidence on the corpus's
  headline register and worth one re-sample in the pass-3 merged battery.
- The reverify queue's acceptance bands are mildly wider than the check bands (e.g. beat
  95–210 vs [100, 200]); all sit inside the ±1-display-frame law the page encodes, and
  every live value passed the NARROW band too. No action.
- MARKS' fade:stretch band derivation was re-checked: §5 components 600–650/150–250 admit
  2.4–4.33; sim 3.036 and live 2.9–3.0 sit mid-band. Corpus-true.

## What the suffusion forPass2 demand got, judged

The binding row demanded: own the ladder authoring surface, scrub-coherent at every
intermediate; answer hysteresis; or name the F5 handoff honestly. All three are met — the
calc-band surface is owned with the coherence argument (a pure function of the spine var;
the Find My held-height proof follows with no animation object to pause), hysteresis is
decomposed into (attack, release) clock pairs + follower state + the one intent latch with
the close inversion emergent, and the F5 layer handoff is named twice (§2-H1/H4) and
ratified at ARBITRATION R1. The demand's parenthetical idiom (paused-animation
negative-delay) was REJECTED with grounds — the family's own keyframes/WAAPI ban on the
scrub path — while the demanded PROPERTY was delivered; that is compliance, not evasion,
and the idiom survives as the glide-side compile target. No gap.

## Convergence

The two pass-1 heavies (G1 evidence contract, G2 gate integrity) are closed with real,
re-runnable evidence, and the re-fit was proven live by a tripwire that could have failed;
all twelve pass-1 gaps are closed or legitimately argued down; the honesty discipline
(source-labeled bands, stamped defers, gates verified failing-capable in source) is now the
family's strongest property. What remains: one corpus re-grade (OG1), three mechanical
one-liners (OG2, OG3, OG4), two constants-hygiene items (OG5, OG8), one document-currency
amendment (OG9), the integration set whose evidence lives in pass 3 by design (OG6), and
the defer fence (OG7). OG6 is the heavy one — four artifacts, each capable of surfacing new
defects, as F4's seam defects proved integration does. The arbitration arithmetic also
binds: pass 2 was not clean campaign-wide, so pass 3 merely begins the clean chain
regardless of any family number, and the earliest possible convergence is pass 4.

**Convergence: 78%.** Weighting: OG6 ~12 points, OG1/OG5/OG7 ~2 each, OG2/OG3/OG4 ~2
combined, OG8/OG9 ~2 combined. Two points under the walled draft's 80 — the draft's seven
gaps all re-derived and confirmed, plus two residues it missed (OG8's voided-geometry
normalization, OG9's stale evidence pointers).
