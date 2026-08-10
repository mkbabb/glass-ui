# LANE α — UNIT 2 (α2) · PASTE-BLOCKS

Literal blocks for the driver. `⊕ⁿ` and `<SHA>` are placeholders the driver fills at the batch
close; nothing here is pre-numbered.

---

## 1 · COMMIT MESSAGE

```
fix(motion): #67 W-2 OWED-3 discharged — the C2 corpus rows re-derived on the LANDED dock pair, and the landed pair measured corpus-TRUER than CHARTER R-1's

Unit-1 refused the W-2 kernel commit on a four-gate mutation red. This seat reproduced
the born-RED by scratch-copy (87/87 exit 0 → 83/87 exit 1), found the defect, and cured
it without moving one corpus band.

The defect was never the register. `simFlungLanding`'s seed (-3.2/s, released from x=1)
was a free literal that had never been corpus-derived, and it silently CONDITIONED three
gates: under {0.30, ζ0.88} it reaches the rest-crossing at 135px/s against MARKS C2's
MEASURED 570px/s, so the whole post-crossing excursion (2.62px) fits inside the 3px settle
window and `settleFromCrossMs` returns null — which the battery then divided into a
plausible-looking 0. MARKS.md:354-370 fitted the register on the "tail from rest-crossing"
window (n=21, ζ 0.77-0.88, f_d 1.38-1.80Hz), never on a release from full depth; reaching
the corpus crossing from x=1 needs a 9006px/s (charter) or 16977px/s (landed) release
against the corpus's measured ~6500px/s fling peak. The scenario was mis-scoped, not the
band.

The sim now starts where the corpus's own fit starts — AT the rest-crossing, at C2's
measured crossing velocity. On that window the LANDED pair is corpus-TRUER than the pair
CHARTER R-1 asked for: overshoot 10.88px vs the measured +11px (charter 13.26px, +20.5%),
coefficient 0.01909s vs data 0.019 (charter 0.02327s), settle 161ms inside [140,220],
dwell 41ms against ~50ms, no second excursion, f_d 1.5832Hz inside the tail bracket.
MARKS.md:391 had already called the 0.30→0.35 nudge "optional"; this closes the option
the other way.

Row acts — two corpus bands UNTOUCHED, one free literal REPLACED BY corpus truth, one
DESIGN floor made register-relative; nothing hand re-pinned:

  · R-1 dock pair — the gate stops asserting a literal and READS springPresets.ts off
    disk (SPEC §3's single-named-register-authority law, made executable). #26
    W-SPRING-RETUNE is the value source; the kernel FOLLOWS the table.
  · settle from rest-crossing — band [140,220] UNMOVED. Corpus truth does not move for
    a register.
  · crossing velocity sane → extremum dwell — at the tail anchor a crossing-velocity row
    reads back its own seed, so the row takes the one quantity C2 pins on that window and
    nothing else gates. Label PROMOTED [REG-LOCK] → [MARKS C2]: 50ms ± 17ms (one 60Hz
    frame, the band grammar's own q_display).
  · no hold: velocity buys overshoot — the 1.01 floor was 9.009× the {0.35,0.82}
    zero-seed ring. The DESIGN law is a RELATION, so the floor is now
    1 + zsMargin × gap × zeroSeedOvershoot(REG.dock), zsMargin:9 READ OFF the committed
    band. Its own falsifier: on {0.35,0.82} the rule re-emits 1.00999 — the committed
    literal to four places.

Plus: `ms((x ?? NaN)/1000)` — a dead metric now reads NaN and fails loud instead of
falling through null/1000 to a plausible 0. No masking fallback. Three band labels naming
the retired pair re-pointed (opSettle, shLive, land); shLive gets STRONGER by the move
(6.7× headroom vs 1.8×).

Falsifiers, three, each its own scratch tree with a real exit code: kernel drifts off the
table → exit 1; table drifts off the kernel → exit 1; authority unreadable → throws. The
lock bites from both sides. Honesty datum against the cure's own convenience: under the
first falsifier the three corpus rows still PASS — the re-anchor is register-neutral, and
the one row that separates the pairs is the arithmetic identity gate.

87/87 gates PASS, real exit 0, gate count UNMOVED at exactly 87 — nothing minted.

DOC-TRUTH, same register truth, four rows:
  · T1 (scheme-spring.css:31) RETIRES uncured — the FINAL.md:32 seam clause's own first
    branch fires; regen --check exits 0 emitting response=0.3s, ζ=0.88.
  · T9 (tunable-anim.md:68) CURED: read 0.35, 0.82 — a pair this repo has never shipped.
  · T5 (:127) TRUE as written, no figure.
  · T11b (motion-canon.md:199) CURED BY SUBTRACTION: DOCK_SPRING was printed as
    (0.35, 0.82) in the same sentence calling it "not a frozen hand-value". Struck, not
    corrected — dock/constants.ts already derives it.
  · Four ADJACENT entries falsified on disk and struck in place with detectors, routed to
    #61 W-DOC-TRUTH for the positive rewrite: DRAWER_SNAP (register dead by subtraction),
    TIMELINE_HEAD/FILL/PRESS (gone with their SFC), useSpringPress (derived, and the
    printed pair is neither). useSpring (0.5, 0.86) is the one entry that verifies.
  · The mechanism, recorded not cured: §P7 names itself the single source
    proof:motion-one-clock reads OFF_SPINE_ALLOWLIST/SPRING_DEFAULTS_ALLOWLIST against —
    and neither symbol exists in scripts/ or tests/, and
    scripts/proof-motion-one-clock.mjs is absent from the tree. A canon list whose
    consuming gate does not exist had no way to red when five of eight entries died.

SPEC §9 rows 1-5 all carry dated brackets now: row 1 SUPERSEDED the other way with the
measurement table, row 2 DONE (detector + exit 0), row 3 OPEN and refused-on-fence with
its file:line scout, row 4 DISCHARGED BY SUBTRACTION (useDrawerSnap and
src/components/drawer/ do not exist — the row CLOSES, not carried), row 5 half done by
subtraction (--gl-t is 0/0, no alias) and half born-RED (--scrub-t 0/0).

#67's remaining BUILD waves are refused on FENCE, not merit — they land in
src/composables/motion/**, src/styles/**, and src/components/** outside dock, none inside
lane α's stated fence, on a tree three lanes wrote during this window. One driver word
resolves it; every census, derivation and scout is banked so the resolution costs no
re-scout.

Verify (real exit codes, never a piped tail's): spine-conductor 87/87 EXIT=0 ·
gate-register seats:60 violations:0 drift:0 rosterSha256:282d05cf EXIT=0 · 5 expected-fail
UNMOVED. vue-tsc EXIT=2 and vitest EXIT=1 are BOTH foreign and named: all 6 tsc errors are
fourier-field's, and this unit wrote zero TypeScript/Vue bytes by construction; the 3 test
failures are fourierLeanMapping's export motion, FOURIER_UNSUPPORTED_MESSAGE, and the
standing RACY boot-graph row RT-40-C (unit-1 predicted exactly this re-red).

Record: docs/tranches/BK/execution/2026-08-10-lanealpha-unit2/RECORD.md

Claude-Session: https://claude.ai/code/session_01HtVLmdLZ3uYZMLLrVugzpP
```

---

## 2 · EXECUTION-PROGRESS ⊕-LEDGER ROW

```
⊕ⁿ  #67 IOS27 W-2 — LANE α UNIT-2 · OWED-3 DISCHARGED BY DERIVATION, not by re-pinning.
    <SHA>. The four mutation-red rows are green on the LANDED {0.30, ζ0.88} with TWO corpus
    bands untouched. Root cause: the flung-landing seed (-3.2/s from x=1) was a free literal
    that conditioned three gates; MARKS C2 fitted the register on its TAIL window, and the sim
    now starts there, at C2's measured 570px/s crossing. On that window the landed pair beats
    CHARTER R-1's on the corpus's own numbers — overshoot 10.88px vs +11px measured (charter
    13.26px), coefficient 0.01909s vs 0.019 (charter 0.02327s), settle 161ms, dwell 41ms,
    f_d 1.5832Hz inside the 1.38–1.80 tail bracket. R-1 now READS springPresets.ts off disk
    (SPEC §3 authority law); the DESIGN guard's floor is register-relative with its margin read
    off the committed band (it re-emits 1.00999 on {0.35,0.82} — the literal it replaces).
    3 falsifiers, 3 real exit 1s, biting from both sides. 87/87 EXIT=0, gate count UNMOVED at 87.
    DOC-TRUTH T1 RETIRES · T9 CURED · T5 TRUE · T11b CURED BY SUBTRACTION, +4 adjacent entries
    struck with detectors → #61. SPEC §9 rows 1-5 all bracketed; row 4 CLOSES (useDrawerSnap
    and src/components/drawer/ are gone). #67's remaining BUILD waves REFUSED-ON-FENCE with
    every census banked — one driver word lands them. seats:60 violations:0 drift:0 sha 282d05cf.
```

---

## 3 · THE ONE OWED WORD (the whole of what this unit is waiting on)

```
OWED-4 (α2, blocks #67's remaining BUILD waves — W-2 kernel, W-6 glass-reveal-out, the four
engagement scalars, W-5's novelty landings). ONE phrase, not a ruling: does lane α's fence term
"IOS27-MICRO surfaces" mean the tranche's docs/ tree, or the src surfaces IOS27-MICRO's waves
touch? Under the first reading α is charged with waves it is fenced out of — every remaining #67
landing is in src/composables/motion/**, src/styles/animations.css + glass/reveal.css,
src/styles/tokens/**, or src/components/** outside dock. This seat held the fence because the
costs are asymmetric: three lanes wrote src/ during this window, a wrongly-held fence costs one
word, a wrongly-crossed one costs a collision with no index acts available to unwind it. Nothing
is owed but the word — the physics is derived and green (87/87 exit 0), the kernel is proven, every
born-RED census is re-derived on disk, and the one open cure has its file:line scout done.

CARRIED FORWARD from unit-1, NOT this unit's: OWED-1 (#78 S-1, the canon §1 material schema vs the
ratified --glass-veil-* material) and OWED-2 (#78 A-1, the emitter's prototype-only ROOT/DOC
resolution + its 6-of-7 blind BLOCKS registry). Both remain above an implement seat.
```

---

## 4 · π QUEUE — enqueued to the singleton browser seat, NOT run here

```
This seat opened no browser. Every row below ENQUEUES; none is claimed.

W-0 PAINT-DRAIN (in totality) — AGGLOMERATION §6.1 rows 1-7 under the §O-3 sequencing law
  (canon repaint ×7 FIRST, then the frosted/constellation re-runs). Its own work order says ONE
  serialized session, combined with the BJ trio (RU-20/RU-29/RU-26). Both engines.

W-1 LIVE-π OWED — evidence/W-1/dock-register-delta.md, still absent. NOTE: its owed figure table
  is WRONG as written — it specifies --spring-dock-duration 0.19s→0.22s against a 0.30→0.35 move
  that never happened. The owed capture is the {0.30, ζ0.88} delta or nothing.

W-3 / W-4 — the F4/F5 per-engine paint halves on the merged rack (shared lens artifact, contrast
  recalibration, velocity-keyed caustic, the light channel's painted truth). The F5 acceptance set
  is ALSO an R-7 CONSUMING fold (loupe close-up) and stays REFUSED-AS-RATIFIED until footage.

W-7 — AE-R1..R3 · C-R1..R4 (§O-3 order) · QP-6 · the 4 PAGE-DEFER re-entries · the row-9 drift
  sub-read + condense/sea/bell interiors at any 60fps-class capture · the armed-idle cross-page
  oklab arm.

All device-free evidence produced this unit is node-battery evidence with real exit codes, banked
in RECORD.md §2 and §3. No paint claim is asserted anywhere in this unit.
```
