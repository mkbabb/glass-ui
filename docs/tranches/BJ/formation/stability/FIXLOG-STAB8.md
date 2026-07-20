# FIXLOG — STAB round 8 (fixer pass, 2026-07-20)

Mechanical application of the round-8 cure set. Zero judgment: each cure applied byte-exactly at
its named anchor, or SKIPPED and escalated. No ASK.md row was renumbered, reworded, merged or
re-scoped — **ASK.md was not edited at all this pass** (its working-tree diff is STAB7's; `grep
STAB8 ASK.md` = 0 hits, verified).

**Tally: 15 cure legs APPLIED · 2 ESCALATED** (across 11 cure blocks: 10 blocks landed at least one
leg; block 8 escalated whole).

---

## APPLIED

| # | anchor | leg | note |
|---|--------|-----|------|
| 1a | `waves/BAND-REDUCTION.md` (W3 A12 row) | `springProjection` struck from the "AS A PAIR" heading + body; row retitled "the scroll demo-local … `springProjection` FENCED OUT" | applied |
| 1b | `waves/BAND-REDUCTION.md` (after the `useScrollScene` conditional) | inserted the "**`springProjection` does NOT move**" fence block (regen-spring-tokens + GATES W1 keep-list basis) | applied |
| 1c | `ASK-REDUCTION.md` (§ per-symbol table, DEMO-LOCAL row) | pairing removed + dated STAB8 truth-up bracket added | applied — **row ID, question and recommendation untouched** |
| 2a | `waves/BAND-DOC-TRUTH.md` (after `Class A — spring/motion constant mirrors:`) | inserted the SEAM clause sequencing this band AFTER `IOS27-MICRO` W-1 (dock 0.30→0.35) | applied |
| 2b | `waves/BAND-DOC-TRUTH.md` §Dependencies | `outbound.` → `outbound · **IOS27-MICRO W-1 (T1/T9/T5 …)**` | applied |
| 3 | `formation/refable/LEAD-AMENDMENT-LEDGER.md` row I1 | `G-CLOSE doubly gated (failed-verification ruling + deferral)` → the single-ground re-grounding on the deferral | applied. **Consumes the anchor cure 6a also targets** — see ESCALATED |
| 4 | `LEAD-AMENDMENT-LEDGER.md` row H3 | `WAITING` → `DISCHARGED 2026-07-20 — …` (PASS-2/3/4 + FINAL cut) | applied. **Consumes the anchor cure 8 also targets** — see ESCALATED |
| 5 | `LEAD-AMENDMENT-LEDGER.md` row C7 | `PENDING` → `PROPOSED-ROUTED → the A02/A17 dossier annotation batch …` | applied (matched on the unique `\| RU14-CRIT8-B (C6 residue) \| PENDING \|` cell — bare `PENDING` is non-unique in the file, occurring twice in row J3's prose) |
| 6b | `EXECUTION-PROGRESS.md:44` | `the G-CLOSE veto STANDS (the relayed lift failed verification)` → single-ground/deferral text | applied |
| 7 | `waves/BAND-STORY.md` (J9/D-A14 paper-backdrop row) | REFABLE RF-6 residue paragraph → **RESIDUE CLOSED 2026-07-20 (STAB8)** | applied |
| 9 | `LEAD-AMENDMENT-LEDGER.md` §Terminal order | appended the "Where the un-landed rows land" clause (PROPOSED-ROUTED ×8 firing event + the `### §Method notes` mint for J5/K1 · C7 at the capstone seat · G1 at the outbound batch) | applied |
| 10a | `waves/BAND-REDUCTION.md` (W3 useTextHighlight row) | `(RU-12 A13; ASK row)` paragraph → A13 ownership truth-up, W3 EXECUTES the DELETE default | applied |
| 10b | `waves/BAND-REDUCTION.md` §Still OPEN / ASK-gated | `useTextHighlight (A13),` struck from the open list | applied |
| 10c | `waves/BAND-REDUCTION.md` (A1-A16 adoption list) | `A13 (useTextHighlight ASK)` → `A13 (useTextHighlight — W3 DELETE by default; no ASK row was ever minted, STAB8)` | applied |
| 11 | `PLAN.md` W5 `BJ.W-REDUCE-TIMELINE` bullet | five-variants/~1500 LOC → **ALL SIX SFCs ≈ 1936 SFC / 2254 family LOC** with the six files named | applied |

**Line-number drift note (not an anchor failure).** Cures 10b/10c were named at `:748`/`:764`;
they were applied at `:765`/`:781` because cures 1a/1b/10a inserted 17 lines above them earlier in
the same file. The cure strings matched byte-exactly and uniquely, so the targets are the same
rows, not moved anchors.

---

## ESCALATED

Both escalations are **the same class: a second cure targeting a byte string an earlier cure in
this same set already consumed.** Neither was improvised, reconciled, or merged — per the fixer
contract the first-listed cure was applied verbatim and the later duplicate was skipped whole.

### E-1 — cure 6a (`LEAD-AMENDMENT-LEDGER.md:87`, row I1)

Cure 6a instructs replacing `G-CLOSE doubly gated (failed-verification ruling + deferral)` with a
text beginning `G-CLOSE gated on THIS deferral ALONE (single ground) [re-grounded 2026-07-20…]`.
**Cure 3 targets the identical string** with a different replacement (`G-CLOSE veto-gated on the
owner's execution deferral (SINGLE ground, re-grounded 2026-07-20 …)`). Cure 3 was applied first
(listed first); the anchor no longer exists, so 6a cannot be applied byte-exactly and was skipped.

- **Substance is NOT lost.** Both cures make the same correction — re-ground the G-CLOSE gate on
  the owner's deferral as the SINGLE ground and retract the failed-verification leg per
  `coordination/ATLAS-Q-G-BATCH-DISPOSITION.md:72`. The applied text carries that ruling.
- **Two details unique to 6a's wording did not land** and are owed to the lead if wanted:
  (i) the pin to `atlas/docs/tranches/Q/RATIFICATION.md:40-41` / `109f5573`; (ii) the instruction
  that *the G1 relay-back states the deferral and the corrected checkout map, never a verification
  failure*. Detail (ii) is a G1-seat instruction, not a status-cell fact — it may want its own
  sentence at the G1 row rather than inside I1.
- Cure 6**b** (`EXECUTION-PROGRESS.md:44`) is independent and WAS applied.
- The veto itself and the MARKED-HELD status are unchanged by either text, as both cures state.

### E-2 — cure 8 (`LEAD-AMENDMENT-LEDGER.md:80`, row H3)

Cure 8 instructs replacing the H3 status cell `WAITING` with a text beginning `APPLIED 2026-07-20 —
RULED at ../IOS27-MICRO/passes/PASS-3/CHARTER.md:94-115 §R-4 …`. **Cure 4 targets the identical
cell** with a different replacement (`DISCHARGED 2026-07-20 — the dependency landed: …`). Cure 4
was applied first; the anchor is consumed, so cure 8 was skipped whole.

- **Substance is NOT lost at the terminal-order level** — both cures clear H3 off `WAITING`, which
  is the blocking condition the close gates on. The applied text records PASS-2 agglomeration,
  the pass-3 charter, pass-4 terminal, and the FINAL cut.
- **What cure 8 carried that the applied text does not**, and which is materially richer:
  the actual §R-4 ruling content — **§8.1 (anti-taffy ≤1.2 vs overpull −21%) DISSOLVED-PENDING**
  (no bound-compression register until the F1 OG1 re-grade lands; travel-squish fence stands
  meanwhile) and **§8.2 (overshoot ≤10% vs springback 30-50%) DISSOLVED OUTRIGHT** (MARKS C1 voided
  the springback bracket, C2 killed the 32-33% overshoot class; the `[0,10%]` header fence stands
  whole, out-of-fence overshoot lives in the velocity-seeded displacement domain), plus the pin
  that the one executable remainder (the refuted `scheme-spring.css:31` dock header) is owned by
  **FINAL W-1** under the one-owner-per-file seam. The applied cure-4 text instead says the register
  rulings are "distributed across W-1 / W-5 / W-6".
- **Recommendation to the lead (not applied):** if the §R-4 detail is wanted on the row, it is an
  additive dated bracket appended to the now-`DISCHARGED` cell — not a re-replacement. Flagged, not
  improvised.

---

## Freeze compliance

- `ASK.md` — **not edited.** No row ID, question or recommendation was renumbered, reworded, merged
  or re-scoped anywhere in this pass. Cure 1c's bracket landed in `ASK-REDUCTION.md`, as specified.
- Rows pending a USER ruling were left pending; none was treated as a finding.
- The atlas Q mailbox stays **MARKED-HELD** and the **G-CLOSE veto STANDS** — cures 3 and 6b narrow
  the veto's *ground* to the owner's deferral and retract the failed-verification leg; neither
  lifts the veto nor unholds the mailbox, and both applied texts say so explicitly.
- Cure-interaction note (recorded, no judgment exercised): cure 5 moved C7 from `PENDING` to
  `PROPOSED-ROUTED`, while cure 9's inserted clause files C7 under a `**PENDING (C7)**` heading and
  routes it to the RU-01 capstone seat, whereas cure 5's text routes it to the A02/A17 dossier
  annotation batch. Both were applied verbatim at their distinct anchors as instructed. The lead
  may want one reconciling stroke; the fixer did not take it.
