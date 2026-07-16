# R4 · Critic — completeness + ruling-fidelity + SEQ executability (NON-AUTHOR)

Posture: fresh non-author critic, round 4, two-consecutive-clean convergence. Charge: find what
is WRONG or MISSING in the v3 plan; say CLEAN only if nothing substantive survives my own
refutation. Fences honored — `/Users/mkbabb/Programming/glass-ui` READ-ONLY (read-only git/grep
only; no writes, no builds); my only write is this file.

Method: read ADDENDA-PLAN-DRAFT.md (v3, 260 lines), REGISTRY.md, and all 18 reports incl. the
three r3-critic verdicts the v3 rewrite claims to fold. Then verified executability + drop claims
against the live transaction on disk (now **980 rows**: 713 M · 155 D · 112 ??).

**Verdict: NOT CLEAN — but close.** The v3 rewrite folds the round-3 corpus comprehensively (I
re-checked every r3 finding below and all but the residuals are landed). One MODERATE completeness
gap survives (a documented public-surface clean-break with no home in the disposition ledger that
claims to carry *every* disposition) + one MINOR orphan (the lone unhomed FAM-E row) + two notes.
No ruling violation, no dead-wave live-dependency, no SEQ mis-tag.

---

## R3 FOLD VERIFICATION (did v3 actually absorb round 3?)

Swept all three r3 verdicts against v3. **Landed** (spot-verified in the plan text):

- r3-completeness C2-01 → Q051 **row 14** completion/border-progress consumer (task's named check: confirmed row 14). ✓
- C2-02 → Q051 now enumerates fission (row 1, H-2), I-5 dot-flow (row 15), Q080 RETRACTED (row 17). ✓
- C2-03 → Q042 now names aurora/atoms.ts(592), useMetaballRenderer.ts(547), runtime.ts(520). ✓
- C2-04 → **Q024 REGISTER-CALIBRATION added** (T10 liquid-entrance + T14 notification-capsule + I-7). ✓
- C2-05 → recap expanded a–n (Band 8/9 + media now present). ✓
- C2-06 → Q020 rider "default tabs story names the loupe (closes RM-3)." ✓
- C2-07 → Q032 "D-4 … DECLINED-OPTIONAL — recorded, not built." ✓
- C2-08 → Q070 "N-4 durable-state fence (C2-08: now proposed, not just embodied)." ✓
- C2-09/10/11 → Q050 AX-cluster ratification + F1/G1 closed; Q042 shell.css EXEMPT reconciling H-5. ✓
- r3-lies H1 (C-2 undispositioned) → Q002 C-2 sweep names all 9 consolidations + ~20 flatten waves. ✓
- H2/H3 (stale F-6/F-3/C-4/D-3/A-5 rows) → registry ROUND-3 strike-list strikes them. ✓
- H4 (Q022 double-owns π) → Q022 folded into Q003. ✓
- H5 (I-6 no owner) → Q063 "OWNER: codex, DEADLINE: before any Downloads cleanup." ✓
- r3-ruling R3-1 (process-heavy) → Band 8 3→1, Q050+Q062→1, Q060+Q061→1, Q034→Q040 (all folded). ✓
- R3-1b (Q071 triage-machine-as-law) → demoted to Q070 description ("grounded in the real incidents"). ✓
- R3-2 (Q043 already done) → Q043 reframed VERIFY-ONLY. ✓
- R3-3 (demo:boots orphaned check) → resolved via option (b): dropped from standing checks; boot is
  "step 1 of the pre-tag lane — a look, never a script." ✓
- R3-4 (Q041 collides 125 demo M) → collision note carried (verified 125 on disk). ✓
- R3-5 (media not in inbox) → inbox item 3 media provenance (verified in the placed note). ✓
- R3-6 (Q032 motion collision) → note carried (verified 7 D + ~24 M in motion/, 42 files on disk). ✓
- R3-7 (no ride/post partition) → the SEQ tag system (RIDE/POST/PRE-TAG/HEAL/GATE). ✓
- R3-9/10/11 → "invariant" scrubbed from Q060; Q041 src-side; Q021 ruling-row in Q051. ✓

That is a faithful fold. The residuals below are what the r3 sweeps did **not** cover.

---

## SUBSTANTIVE

### F1 [moderate · completeness] C-5 (SplitChars + Toggle clean-break ratification) has no home in Q050 — the ledger that bills itself "every terminal disposition"

REGISTRY R2-correction (`:19-21`) rules C-5 a **non-defect requiring a DECIDED record**:
"SplitChars + Toggle deletions are deliberate, documented clean-breaks (MIGRATION.md:23,25) …
**Ratify as DECIDED rows**; not defects." The deletions are live in the transaction — verified on
disk: `src/components/split-chars/{SplitChars.vue,index.ts,README.md}` all ` D`;
`src/components/toggle/{Toggle.vue,index.ts}` ` D`; MIGRATION.md:31 documents the
Toggle→ToggleGroupItem break.

Q050 is billed (`:156`) as "One ledger commit carrying **every terminal disposition** with
rationale" and enumerates DECIDED rows for A1/A2/D1/D2/E1/C1, the AX cluster, F1/G1, and the
PROVENANCE-RATIFY P-stub cluster (P002–P061 DECLINED/SUPERSEDED). **C-5 is not among them.** Full
plan grep for `split-char|toggle|C-5|apotheosis|clean-break|deliberate delet` returns only the
Q032 motion-collision line and the Q060 MIGRATION-cite — never the SplitChars/Toggle ratification.
It is also absent from the do-not-relitigate section (`:29-35`) and is not on the registry
strike-list. So it is neither waved, nor declined, nor struck, nor enumerated in the ledger.

Failure scenario: at execution codex writes the Q050 ledger from the plan's enumerated bullets;
the SplitChars/Toggle removal — a documented **public-surface** deletion — is the one component
clean-break absent from the tranche's disposition ledger-of-record, while a structurally identical
clean-break cluster (the P-stub DECLINED rows) sits two lines above it. The "every disposition"
claim is then literally false for the ledger's own family (FAM-C).

Mitigant (why moderate not major): the decision is not *lost* — MIGRATION.md (the consumer record)
and the R2 corrections block both carry it, so no user-facing harm. But per the task rubric a
family row with no wave/decline/strike is a drop, and Q050's completeness claim is the specific
thing broken. One bullet in Q050 (`· C-5 SplitChars/Toggle → DECIDED clean-break, MIGRATION-cited`)
closes it.

Evidence: `git status --porcelain -- src/components/{split-chars,toggle}` (both ` D`);
`MIGRATION.md:31`; `ADDENDA-PLAN-DRAFT.md` full grep (no hit); `REGISTRY.md:19-21`.

---

## MINOR

### F2 [minor · completeness] E-3 (dist/fonts export glob unbuilt) is the lone FAM-E row with no home in the plan OR the inbox note

FAM-E is declared (`REGISTRY.md:117`) as "for the codex agent NOW — **batched into the inbox
note**." Its siblings all land: E-1 → inbox item (co-land) + Q060; E-2 → Q043 + inbox; E-4 → Q050
(stubs cite SHA). **E-3** ("dist/fonts exports glob unbuilt at audit time … confirm before
publish") appears in neither the plan (grep `E-3|dist/fonts|font|glob` → NONE) nor the placed
inbox note (grep `font|glob|E-3` → NOT PRESENT; the note's six marks omit it). The
confirm-before-publish action has no owner.

Low stakes and self-healing (the next build surfaces an unbuilt glob), which is why it is minor —
but it is a genuine silent drop of a FAM-E row that the registry routed explicitly to the inbox
note. Fix: one clause in the inbox note ("confirm dist/fonts glob resolves at the pre-publish
build") or an explicit "E-3 → benign, next-build-surfaced, DECLINED" note.

---

## NOTES (low-confidence / context; not counted substantive)

### N1 [note · fence] R3-8's inbox-note delivery concern is unreconciled; the placed note self-contradicts on the fence
R3-ruling R3-8 (medium) flagged that the inbox note is "a repo write the read-only fence forbids;
clarify the delivery mechanism." v3 did not fold it — the plan (`:253-259`) still just states the
note is "placed" at `docs/tranches/BI/coordination/addenda-inbound-…md`, and the file physically
exists there **untracked** (`?? …addenda-inbound-2026-07-16-hold-and-marks.md`, plus
`?? …valuejs-inbox-2026-07-15-v-formation.md`). The note's own closing line reads "We remain
read-only on your tree; **this file and that folder are our only writes**" — a literal
contradiction (a write to the tree that claims read-only-on-the-tree). **Strong refutation:**
`coordination/` is the established cross-session mailbox (INBOUND-MARKS.md, atlas-outbound,
valuejs-inbox all live there), so a coordination note there is the sanctioned channel, not a
source-tree edit; R3-8 over-read the fence. I do not count this substantive — but the plan would
be cleaner stating the coordination-mailbox exception explicitly rather than leaving "read-only"
self-contradicting.

### N2 [note · completeness] FAM-A A-3 (close-battery class) is not dispositioned by label
A-3 ("paint-in-close, PE-GESTALT ledger [30 PENDING cells never filed], budget-rebaseline, masking
sweep, ledger-liveness H-2/H-8/H-9/H-12") has no row-level disposition (grep `A-3|close-battery|
PE-GESTALT|ledger-liveness` → NONE). **Refutation:** its substance is distributed — paint-in-close/
masking → Q002/Q003; budget-rebaseline → Q050 A1 RETIRE; H-2 liveness → Q021/Q051 — so forcing a
label disposition is near-nitpick. The only genuinely un-owned sub-items are the PE-GESTALT
30-cell ledger and the undefined H-8/H-9/H-12 liveness rows; Q003's "3-axis verdict ledger filed
per surface" plausibly subsumes the former. Noted, not counted.

---

## THE TASK'S FOUR EXPLICIT CHECKS — results

1. **COMPLETENESS** — a–n all owned (recap `:242-251` maps each; spot-verified). TAIL rows
   A1/A2/C1/D1/D2/E1/F1/G1 all in Q050. 8 disease clusters: 1–7 paint carriers → Q002 roster,
   cluster 8 (AX) → Q050. 6 open_questions all in Q051 incl. **completion/border-progress = row
   14** (confirmed). Registry A–J sweep: every row homed EXCEPT **C-5 (F1 above)** and **E-3 (F2)**;
   struck rows (F-3/F-6/C-4/D-3-count/A-5-pins) correctly retired via the strike-list.
2. **RULING FIDELITY** — clean. No wave mints a standing script/gate/CI line. Q040 declares ("One
   page, not a runner"; invariants.json→DESCRIPTIVE CANON; no-masking-manifest DELETED). Q041 =
   one-time in-commit RED→GREEN grep, "NO standing grep." Q042 = "no line-count law" (no ratchet).
   Q043 = "verify-only read … zero edits of ours." C-2 sweep + boot check both "a checklist read,
   not a script" / "a look." The word "invariant" is scrubbed from Q060 (R3-9). **Held.**
3. **SEQ EXECUTABILITY** — all 20 SEQ tags defensible against the live 980-row transaction. No RIDE
   wave needs a transaction-deleted file (Q033 targets audit-stash-list.mjs + worktree-gc.mjs both
   present on disk; reflect-capture-verify.mjs present + correctly KEEP). Q041 carries the 125-demo-M
   collision note (verified 125). Q032 carries the composables/motion clean-break re-pin note
   (verified 7 D + churn, 42 files). HEAL (Q003) trigger defined ("dev server boots again"). POST
   waves inherit the band-header re-pin instruction. **Held.**
4. **BAND EDGES** — clean. All folds resolve: Q003 absorbs Q022; Q040 absorbs Q034; Q050 absorbs
   Q062; Q060 absorbs Q061; Q070 absorbs Q071+Q072 — all appear only as fold/absorb provenance,
   never as live deps (grep for `rides/see Q0{22,34,61,62,71,72,01}` → NONE). Q001 absent. Q080 →
   Band 9 RECALLED + Q051 row 17 RETRACTED; Q081 → Band 9 BANKED. **Held.** Wave count = exactly 20.

---

## Bottom line
The v3 rewrite is a faithful, near-complete fold of the round-3 corpus; ruling fidelity, band edges,
and SEQ executability are all clean under pressure. One moderate completeness gap survives that r3
did not sweep — the C-5 SplitChars/Toggle clean-break ratification is missing from the Q050
dispositions-ledger that claims to carry every disposition — plus one minor FAM-E orphan (E-3
dist/fonts confirm, absent from plan and inbox note). Both are one-bullet fixes. NOT CLEAN, by a
narrow margin.
