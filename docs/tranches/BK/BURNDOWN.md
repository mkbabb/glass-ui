# BK — THE BURNDOWN (the one file, appended)

**The only place in BK where a percentage may be quoted, and only as a spread.** Minted by roster row #11 (W-PROCESS-CURE, law L-6) against `ARCHAEOLOGY.md:111` (E22): a number *was* banked once — a 25% baseline plus a six-field law — in a burndown file the successor process never read back. Numbers banked where nobody looked.

**The rules, binding:**

1. **Append-only.** Entries are added and dated. No entry is rewritten, deleted, or re-minted. A superseded entry is superseded *by the next entry*, which says so.
2. **A spread, never a scalar.** Progress is stated as two or more independent fields — never one number — because the three row states are independent (row #11 L-8; cursor header): a seal figure and a code figure are different facts and neither implies the other.
3. **Members enumerated, source cited.** Every figure names the file it was read from and lists the row ids it counts. A figure without its members is not admissible here.
4. **No second copy.** This file holds no roster, no DAG, no cursor state. It is a dated series of readings *of* those files.
5. **Quotation elsewhere is from here.** Any percentage in any BK artifact, prompt, receipt, or report cites this file and this file's entry date. The 100%-convergence numeral is struck at the source (row #11 L-5, `ARCHAEOLOGY.md:60` §R-8) and is not a burndown figure; the stop condition is the finite invariant checklist plus two-consecutive-clean.

---

## 2026-08-03 · entry 1 — the founding reading

Read at BK cursor `docs/tranches/BK/EXECUTION-PROGRESS.md` (⊕¹²/⊕¹⁸) and its derived navigation aid `docs/tranches/BK/EXECUTION-DAG-2026-08-03.md`. Denominator throughout: **87 execution-live rows** — the cursor's own accounting (⊕⁵ header: 90 roster ids, of which #36 and #37 RETIRED-in-place and #70 BANKED).

**Field 1 — `spec_state = sealed`, execution-live rows: 0 / 87.**
Members: none. Source: cursor ⊕¹² — *"Census restated (repo-fleet pass 1, `wf_dbafe83b-6c8`): 0/87 codex-delta seals stand — all VOID."* The five delta seals (#1/#2/#4/#5/#8) remain void on QUALITY grounds after ⊕¹⁴'s withdrawal of the authority finding. The first seal any of them can hold is the pass-2 re-adjudication (`execution/2026-08-03-codex-audit/APOTHEOSIS.md:81`, cure order item 10).

**Field 2 — `code_state ≠ unstarted`, execution-live rows: 10 / 87.**
Members, enumerated from `EXECUTION-DAG-2026-08-03.md` lines 12–102 by state cell: `#1` landed-candidate · `#2` landed-candidate · `#3` in-flight · `#4` landed-candidate · `#5` landed-candidate · `#6` landed-candidate+captured · `#8` landed · `#75` landed (machine-local evidence only) · `#90` LANDED · `#91` landed-candidate. Every other execution-live row reads `unstarted`. (`#70` is BANKED and outside the denominator; `#36`/`#37` are retired.)

**Field 3 — `evidence_state = adjudicated` under a standing seal: 0 / 87.**
Every adjudication banked in the codex delta travels with a void seal (field 1). `#6` carries captured paint cells (`144aa196`) with its seal owed; `#3` is `evidence_state = owed` by its own row.

**Field 4 — the tranche's terminal deliverable: 0 / 1.** The 8.0.0 cut (#66) is unstarted; publication is AUTHORIZED (⊕¹⁷) and unexercised.

**The spread, stated once:** BK stands between **0%** (nothing sealed, nothing published) and **≈11.5%** (10 of 87 rows carrying committed bytes as candidates). The honest sentence is the one the roster already carries: sealed is not landed is not captured. Neither bound is a schedule.

**One discrepancy, stated not resolved (VALIDATION §4 rule 7 — corrections are batched and dated):** the cursor's Φ0/Φ1 phase tables still read `SEALED` in the state cell for `#1`/`#2`/`#4`/`#5`/`#8`/`#75`, which ⊕¹² voids. Field 1 reads the ruling, not the stale cell. The cells are the pass-2 re-adjudication's to correct (cure order item 10) — they are not row #11's to edit, and this entry does not count them.

**Not counted, and why:** doc-side accounting rows landing this date (#11 and its Φ3 batch siblings) move `spec_state`, not `code_state` — they are recorded in the next entry when their batch closes, not folded into field 2 to inflate it.

---

## 2026-08-03 · entry 2 — the Φ3 accounting batch closes

Written by roster row **#16** (`W-ORPHAN-ROWS`, the batch's sequenced closer) at HEAD `aee47957`
(`git rev-parse --short=8 HEAD`). Entry 1 is not edited (rule 1); this entry supersedes two of its
figures and says so. Full reconciliation: `docs/tranches/BK/execution/2026-08-03-row16-orphan-rows/ORPHAN-ROWS-CLOSE.md`.

**Correction to entry 1's denominator — 87 → 88.** Entry 1 derived "87 execution-live rows" from a
90-id roster. The roster has held **91** ids since ⊕¹⁰ minted `#91 W-MUSIC-STAFF`
(`EXECUTION-PROGRESS.md:71`). Excluding `#36`/`#37` (RETIRED-in-place) and `#70` (BANKED,
`EXECUTION-DAG-2026-08-03.md:81`) gives **88**. Entry 1's own field-2 member list already counted
`#91` in its numerator while excluding it from the denominator; the arithmetic, not the reading,
was wrong. All fields below use **88**.

**Field 1 — `spec_state = sealed`, execution-live rows: 0 / 88.**
Members: none. Unchanged in substance from entry 1: ⊕¹² restates the census at 0/87 codex-delta
seals, all VOID, and ⊕¹⁴ leaves them void on QUALITY grounds after withdrawing the authority
finding. Note the two populations are different denominators — the `0/87` of ⊕¹² counts **delta
seals**, this field counts **roster rows**; they coincide at zero and at nothing else.

**Field 2 — `code_state ≠ unstarted`, execution-live rows: 10 / 88.**
Members, unchanged from entry 1 and re-read this seat from `EXECUTION-DAG-2026-08-03.md` lines
12–102: `#1` · `#2` · `#3` · `#4` · `#5` · `#6` · `#8` · `#75` · `#90` · `#91`. The Φ3 batch that
closed this date authored **zero `src/` bytes** by charter, so this field does not move — which is
the point entry 1 made in advance.

**Field 3 — `spec_state ∈ {banked, landed-doc-side}`, execution-live rows: 6 / 88.**
A new field, because the batch produced a fact the existing three could not express. Members, each
with its banked artifact under `docs/tranches/BK/execution/`:
`#11` `2026-08-03-row11-process-cure/PROCESS-CURE.md` (160 L) ·
`#12` `2026-08-03-row12-bg-close-reconcile/BG-CLOSE-RECONCILE.md` (456 L) ·
`#13` `2026-08-03-row13-uf-ledger/UF-DISPOSITION-LEDGER.md` (268 L) ·
`#14` `2026-08-03-row14-phantom-repair/PHANTOM-REPAIR.md` (246 L) ·
`#15` `2026-08-03-row15-provenance/PROVENANCE-REGISTER.md` (228 L) ·
`#77` `2026-08-03-momentum-census/MOMENTUM-CENSUS.md` (210 L).
Line counts by `wc -l` this seat. `#16`'s own record is the seventh file and is not self-counted.
**Every one of the six owes the pass-2 Challenge-Law adjudication; none is sealed** (field 1).

**Field 4 — `evidence_state = captured` under a standing seal: 0 / 88.** Unchanged. `#6` carries
paint cells (`144aa196`) with its seal owed; `#3` is `owed-first-motion-π`; `#77` is
mechanism-COMPLETE / **capture-OWED** — its capture half is undeliverable doc-side and routes to
`#10`, itself behind `#9`'s ⊕¹³ᵃ detector recovery.

**Field 5 — the tranche's terminal deliverable: 0 / 1.** Unchanged. The 8.0.0 cut (`#66`) is
unstarted; publication is AUTHORIZED (⊕¹⁷) and unexercised.

**The spread, stated once:** BK stands between **0%** (nothing sealed, nothing published) and
**≈18.2%** — 16 of 88 rows carrying either committed candidate bytes (10) or a banked doc-side
deliverable (6), counted as a union with no row double-counted. Entry 1's upper bound of ≈11.5%
is superseded by this entry, not deleted: it counted code only, and this batch was doc-only.
Neither bound is a schedule, and the honest sentence still reads *sealed is not landed is not
captured*.

**The standing discrepancy, restated and still uncounted (rule: corrections are batched and
dated):** the cursor's Φ0/Φ1 phase tables continue to read `SEALED` for `#1`/`#2`/`#4`/`#5`/`#8`/`#75`
against ⊕¹²'s void. Confirmed still true at this seat. It is the pass-2 re-adjudication's cell to
correct (APOTHEOSIS cure order item 10); neither entry counts it.

**One figure retired at its source, so it is never quoted from here:** the "60 unmapped BG names"
did not reproduce under any detector in the corpus and is superseded by row #12's 120-unit walk.
Likewise "23 HELD AX books" → **21** unresolved booked triggers (enumerated at
`ORPHAN-ROWS-CLOSE.md` §4.2) and "50 BJ `OPEN-*` ids" → **55** (detector stated at §4.4). Retired
figures are named here once and then not carried.

---

## 2026-08-03 · amendment 1 — two field re-keys and one citation swap

Rule 1 holds: entries 1 and 2 are **not** rewritten, and nothing above this line is edited. This is
the batched, dated correction rule 7 sends here (VALIDATION §4 rule 7), authored by the Φ3 doc-cure
lane against rows #11 (the vocabulary) and #16 (the citation). **No figure in either entry moves** —
every numerator, denominator, member list, and the spread all stand exactly as read. What changes is
what two of the fields are *called*, and where one parenthetical points.

**Re-key 1 — entry 1 field 1 and entry 2 field 1 are not a `spec_state` census.** Both are headed
"`spec_state = sealed`, execution-live rows: 0 / N". Under **L-8** (`PROCESS-CURE.md:85`, the row-11
record's own three-field law) `spec_state ∈ {draft, banked, sealed}` is a per-row field of the
roster; what those two fields actually read is ⊕¹²'s census of **codex-delta seal standing**, a
different population — as entry 2's own note already concedes (*"the two populations are different
denominators"*). Labelling a seal-standing reading with a row-state key contradicts the very
vocabulary row #11 minted. **Both fields are re-keyed to *the Challenge-Law seal-standing census*** —
entry 1: 0 / 87; entry 2: 0 / 88. Numerators, members (none), and source (⊕¹²/⊕¹⁴) unchanged; only
the key is.

**Re-key 2 — `landed-doc-side` is struck as a `spec_state` value.** Entry 2 field 3 is headed
"`spec_state ∈ {banked, landed-doc-side}`". L-8 admits exactly three values and `landed-doc-side` is
not one of them: it is a *cursor cell* phrase (`EXECUTION-PROGRESS.md` rows #11–#15 read "LANDED
doc-side"), which reports where the deliverable sits, not what the spec's state is. **Field 3 is
re-keyed to *the banked doc-side deliverable census*, 6 / 88 — all six members are `spec_state =
banked` under L-8.** The six members, their artifacts, their line counts, and the closing sentence
(none is sealed) are unchanged. `landed-doc-side` is not a spec_state anywhere in BK and is not
quoted as one from here.

**Citation swap — entry 2's #91-mint cite.** Entry 2's denominator correction reads *"The roster has
held 91 ids since ⊕¹⁰ minted `#91 W-MUSIC-STAFF` (`EXECUTION-PROGRESS.md:71`)"*. That line number is
wrong and the collision that produced it is worth naming: **two different ⊕¹⁰ marks exist.** The BK
cursor's own ⊕¹⁰ is the **row-8 seal** (`EXECUTION-PROGRESS.md:66`), and `:71` falls inside it — it
reads *"the failed predecessor remains frozen as AMEND chronology (SHA256 …)"* and says nothing about
#91. The mint is **TERMINAL-ROSTER's ⊕¹⁰** (`docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:16`,
*"ROW #91 MINTED BY OWNER WORD (2026-08-03)"*), **recorded at BK cursor ⊕¹³**
(`EXECUTION-PROGRESS.md:117` — *"row #91 W-MUSIC-STAFF minted at TR ⊕¹⁰"*), with the roster row
itself at `:288` carrying `TR ⊕¹⁰` in its source cell. **Read entry 2's parenthetical as: TR ⊕¹⁰
(`TERMINAL-ROSTER.md:16`), recorded at BK cursor ⊕¹³ (`EXECUTION-PROGRESS.md:117`).** The 91-id
roster, the 88 denominator, and every field beneath are unaffected — only the anchor was wrong.

**Nothing else is amended, and this amendment mints no figure.** It quotes no percentage; the spread
of record remains entry 2's **0% – ≈18.2%**, and the standing Φ0/Φ1 `SEALED`-cell discrepancy remains
the pass-2 re-adjudication's to correct, uncounted here as in both entries.
