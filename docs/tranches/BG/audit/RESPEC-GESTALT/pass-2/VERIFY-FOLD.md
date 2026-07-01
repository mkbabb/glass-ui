# VERIFY-FOLD — folded live docs vs AMENDED-GESTALT-PLAN.md

**Verdict: FAIL** (3 MAJOR residue in EXECUTION-PROGRESS §1). Fold HEAD `178b5935`.

## Changed-file list (git read-only; item 9)
Modified (all under `docs/tranches/`): `BG/DIRECTIVE-LEDGER.md`, `BG/FINAL.md`,
`BG/execution/{EXECUTION-PLAN,EXECUTION-PROGRESS,bg-build-map,bh-interleave-map,publish-and-cut,real-paint-protocol}.md`,
`BH/PLAN.md`. Untracked: the two audit docs (`AMENDED-GESTALT-PLAN.md`, `VERIFY-PLAN.md`).
**Fence OK** — zero `src/demo/scripts` edits; `release.sh` + `asks-and-consumes.md` correctly UNTOUCHED (build-time / already-clean).
`DIRECTIVE-LEDGER` (§7b RESPEC process-edicts restamp) + `real-paint-protocol` (W-REFLECT3 abolition scrub) are legitimate fold edits, not stray.

## MUST-FIX (blocking)
1. **[MAJOR] EXECUTION-PROGRESS §1 is MISSING the F1 active wave `12.5 BG.W-GATE-FIELD-AURORA`.** The active
   master table has ZERO F1 rows (`awk` over §1 → none). Plan §0 count = F1 1; plan §1 F1 lists 12.5 as the sole
   active F1 wave (owns the peer-conformance gate-LITERAL pin `proof-peer-conformance.mjs:41/46 1.2.0→1.1.1` +
   the light-arm eyebrow lift). bh-interleave:40 + publish-and-cut:56 both DEPEND on this wave existing
   ("BG.W-GATE-FIELD-AURORA owns the clause, MR-4"). Absent from the cursor → the engine never builds it, the
   peer born-RED window never closes. **Add the 12.5 row to §1 F1.**
2. **[MAJOR] `12.3 W-DEAD-GATE-SWEEP` kept as a standalone §1 row.** Plan folds it INTO `F8.1/12.13` ("absorbs
   12.3, runs FIRST" — §0 "Two collapses applied"). Progress carries BOTH 12.3 (KEEP+EXPAND, "runs FIRST") AND
   F8.1 (also "runs FIRST") — duplicate + inflates BG-F8 to 17 vs plan's 15. **Fold 12.3 into F8.1.**
3. **[MAJOR] `17.3 W-DESIGN-LANGUAGE-UNIFY` kept as a standalone §1 row.** Plan folds it INTO 17.6 ("+17.3
   design-language-unify folded"). Progress capstone = 5 rows (17.1/17.3/17.4/17.5/17.6), violating the ≤4
   ceiling (R16 / CRIT-1 §5). **Fold 17.3's busy-aurora criterion into 17.6.**

## MINOR
4. **EXECUTION-PROGRESS §0 + Frontier count text** says "active ≈77 (BG ≈65 · BH ≈12)"; authoritative is
   64 BG / 14 BH / 78 (FINAL §13 + EXECUTION-PLAN both state 64/14). The ≈65/≈12 drift is the mechanical
   consequence of defects 1–3 (+12.3 +17.3 −12.5) plus the collapsed BH super-rows. Reconcile to 64/14 once
   1–3 land.
5. **BH PLAN:104 ratchet split wrong.** States "13 carve-able + 3 shader-exempt"; bg-build-map's authoritative
   drain chain + its prescribed §71-correction (:214) + R16 say **12 carve-able + 4 ratchet-EXEMPT (3 shaders +
   property-regs.css css-registration-manifest)**. `property-regs.css` is dropped from the exempt set,
   contradicting binding R16. "16 REMAIN" + "=={} is BG.W-CUT's state" are correct; only the 12/4-vs-13/3 split
   is off. (bg-build-map is authoritative + correct.)
6. **FINAL.md:337** (superseded §1–§12 WS5-booked list) still calls `goo-blob→blob` "RETIRED", contradicting
   R14 (pinned to BH B2.1-swap). Governed by §13's blanket "plan wins over §1–§12" + fold-map did not scope
   :337, so non-blocking — but a reader trap; a one-line strike is cleaner.

## PASSED
- **W-REFLECT3 scrub:** EXECUTION-PROGRESS grep = 0 ✓. bg-build-map(10)/FINAL(3)/EXECUTION-PLAN(1) retain only
  ABOLITION-context mentions; the `:72-74` re-legitimizing carve-out is DELETED (bg-build-map:222), the 6 tails
  re-homed to each wave's own close. (The task's literal "grep=0" for bg-build-map is over-strict — every hit is
  an abolition/re-home statement, compliant.)
- **FINAL.md:** §13 reconciliation appended; :344–347 re-legitimization replaced with abolition text; +W-REFLECT3
  tails at :549/:550 re-homed; states 64/14.
- **EXECUTION-PLAN:** §C + §E present, §G cross-cutting rules (Stage-0 §G-6, audit:build ratio ceiling §G-4),
  BD cut fact (`v4.2.0` tag object + `998136bb` fork point), BH-slot 14 in amendment header.
- **BH PLAN:** 14-row band table (+4g grammar insert); §71/ratchet correction present; B4e PROMOTED to
  CUT-AUTHORING (row 11); grammar waves (4g + :98–100); `goo-blob→blob` rename PINNED to B2.1-swap regen row (R14).
- **bh-interleave:** 14-row structure, `^1.1.1` NEVER `^1.2.0` (:28/:40), 4 by-name asks (:83) — reciprocal
  with BH PLAN.
- **publish-and-cut:** canonical-home header (:7), `^1.1.1` NEVER `^1.2.0` (:56), 4 asks (:89/:101/:108/:148),
  bbnf witness re-based onto MIGRATION row + `crossrepo-asks:bh >=4` (NOT the killed `retired-token-consumers`);
  no `asks-and-consumes.md` cites the killed gate.
- **bg-build-map:** amendment section + SUPERSESSION INDEX present; ratchet table with R1 (row 8 → 10.5 sole)
  + R4 (row 5 → 4.5 sole) owners; 4 EXEMPT incl property-regs; superseded blocks marked "History; the plan wins".
- **EXECUTION-PROGRESS ledger:** §2 intact — 0.1 R11-corrected, 2.7 DEFERRED; header table parses with
  `wave`+`status` cells.
