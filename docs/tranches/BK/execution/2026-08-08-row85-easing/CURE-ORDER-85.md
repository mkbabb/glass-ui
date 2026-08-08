# CURE-ORDER #85 W-EASING — driver-ratified residue (2026-08-08)

Adjudicator (Fable, quartet run wf_df216373-7f1) ruled CURE-REQUIRED. The driver
ratifies all seven cures plus the two minors. What STANDS: the selection (canonical
next per TR order, every skipped row gated with its gate named, the X19 rider
discharged via #26's 6-row SPRING_PRESETS); the core engineering — constant frame
`VIEW_BOX "-0.1 -0.1 1.2 1.2"`, analytic excursion (all three cells reproduced
exact), staircase construction, configurator deleted, C-4 executed, props 7→4,
gates 11→≤7 with ZERO seats minted; the verify gate reproduced at the adjudicator's
own hand (receipt byte-identical, battery all-foreign); the fence byte-clean outside
remit against the step-0 baseline `/tmp/bk-row-baseline-1786199627.diff` (zero
baseline hits on easing paths). Challenger A substantively correct on all five
leads; Challenger B's LANDED verdict OVERTURNED as an undercount (B never tested the
pinned seam, the staircase gate hole, or the ADD list).

## Cures

- **CURE-85-1 (functional):** `usePicker.ts:213` `pinToFrame` reconstructs unclamped
  handles non-float-identically, so `data-pinned` (`EasingPicker.vue:423-426`) fires
  falsely on strictly-inside handles for ~9/30 presets (repro: ease-out-quad delta
  5.55e-17). Cure: short-circuit `if (travel === 1) return handle;` before
  reconstruction; add ONE `it` under the existing G-E1 FRAME drag describe asserting
  `data-pinned` absent across all 30 catalogue presets' in-frame handles and present
  for a genuinely-out control (`[0.2, 1.6, 0.8, -0.6]`). No new seat.
- **CURE-85-2 (gate — the headline unbound):** the staircase mechanism is bound by NO
  runnable gate (zero `stepPathD` clauses in node; tests-visual unwired; the
  241-command polyline mutation survives 29/29 green). Cure: bind in node under an
  existing describe — `stepPathD` is M/H/V-only, command count ≤ 2n+1 (25 at n=12),
  risers at exactly i/n; MUST kill the polyline mutation (prove on a scratch copy).
  Correct RECORD §4's false "P2 … in easing.contract.test.ts (node)" with a dated
  strike-in-place (RECORD is pre-commit but figure corrections keep the bracket
  idiom).
- **CURE-85-3 (completeness — PRIMARY: IMPLEMENT):** CWT-3 §3.5/§4's ADD items
  `draw-on` (stroke-dashoffset sweep on preset/mode change) and `tap-squish` (with
  the one-frame PRM arm) are ABSENT from disk with no refusal filed, while P11 is
  filed as owed π for a nonexistent mechanism. The driver RATIFIES the IMPLEMENT
  branch: the spec is cited whole, and the liquid-weight edict (all motion carries
  inertia/weight/bounce) + breath-of-life edict both point the same way — this is
  the lane's own engagement affordance, not optional chrome. Implement both, PRM arm
  included, and P11 becomes a true owed-π cell. Refuse-with-grounds ONLY if
  implementation measurably conflicts with a landed law (#80/#81/#83's
  refuse-on-measurement precedent) — a taste objection is not grounds. State the
  branch taken.
- **CURE-85-4 (docs, the chartered false-claim class):** `README.md:9`'s only
  `EasingCurve` example carries a `css:` field the type deliberately lacks — align
  with the type (`{ d, tone }`). `README.md:122`'s present-tense "fourier-analysis
  adopts" is false on disk — rewrite to routed-addendum framing (adoption owed to
  the fourier tranche's own marked addendum).
- **CURE-85-5 (gate quality + typecheck):** `easing.contract.test.ts:637`'s
  `.get().exists()` is vacuous AND a TS2339 offender in the release-gating typecheck
  project (`typecheck` gates `prepublishOnly`, package.json:472/476). Cure:
  `wrapper.find(...)` so `.exists()` binds and the TS2339 clears from
  tsconfig.test.json.
- **CURE-85-6 (record/gate truth):** the port story at `easing-primitive.spec.ts:21-24`
  and RECORD §2.8 is FALSE — 5199 is this lane's own playwright webServer default
  (playwright.config.ts:25); the old spec navigated relative to baseURL and never
  hardcoded a port; 5400 is demo:serve only. Correct both; delete or correct the
  `not.toContain("5199")` clause at `easing.contract.test.ts:625` (a gate forbidding
  the correct string).
- **CURE-85-7 (protocol — the whole-file-stat class, dated bracket):** RECORD §9's
  fence stat contradicts the baseline — `src/components/configurator/styles.css` IS
  in the baseline (diff line 1872); the row's share is the `:124` comment hunk only
  (2+/2−); true fence totals +939/−931. Correct RECORD §9 with a dated bracket
  (PASTE-BLOCKS already has it right — verify, do not touch if exact).

## Minors (fold)

`RECORD.md:434` cites a nonexistent "detector in this record's directory" for the
236/1244 figure — name the real detector or strike the citation.
`easing.contract.test.ts:502`'s `css: "x"` on an EasingStroke contradicts the
deleted-field design — align with the type.

## Driver notes (NOT this row's defects; do not touch)

The pager-dots morph flake (13-vs-12) is the pager lane's instability, noted.
tsconfig.test.json's other 10 err-files belong to their lanes. tests-visual unwired
to any npm script is the 7.0.0 RED-BY-ROT house class — routed at back-annotation,
not this cure's. Challenger A's pin-visibility observations (data-reparse-ok dead
seam, --ink-* rung divergence, absent public-surface pins for
EasingCurve/EasingPicker) are routable observations — the back-annotation seat
routes them with owners; the cure seat leaves them alone.

## Driver duties at commit (not the cure seat's)

Scoped add per the fence (zero baseline hits on easing paths → the lane's diff is
the fence, EXCEPT configurator/styles.css which needs the 2+/2− hunk split per
CURE-85-7); rider sweep for self-signed foreign hunks before staging (the d93e59f4
class); demo:dist:build + FINAL receipt after all seats return (B-D6); leak-check;
⊕-index derived at commit time from the cursor tail (expect ⊕⁶²).
