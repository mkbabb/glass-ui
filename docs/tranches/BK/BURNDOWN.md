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

---

## 2026-09-17 · entry 3 — the status-census reading

Written by the author seat for this file at HEAD `849c5547` (`git rev-parse --short=8 HEAD`), reading
`docs/tranches/BK/execution/2026-09-17-status-census/CENSUS.md` (227 L by `wc -l`, banked at
`849c5547`), which was taken at HEAD `3a2329c1` over the 91-row register in `EXECUTION-PROGRESS.md`
(CENSUS.md:3). Entries 1, 2 and amendment 1 are not edited (rule 1). This entry supersedes entry 2's
fields 2, 3 and 5 and its spread, and says so at each; field 1 reads a different population from
entry 2's field 1, and field 4 leaves entry 2's `0 / 88` standing. Field keys are amendment 1's,
except field 1, which takes the `spec_state = sealed` key amendment 1 left free.

**The denominator holds at 88, and the census's own tally sums to it.** The census counts 90 register
rows, its sentence quoted whole: "Denominator: 90 register rows present (#70 is BANKED pre-BK and
carries no row; #36/#37 retired in place) — the burndown's 88 execution-live rows plus the two
retired" (CENSUS.md:18). Its verifier-corrected state tally sums the same way:
21 + 49 + 14 + 3 + 1 = **88** execution-live, + 2 retired = **90** (CENSUS.md:11-16). The arithmetic
is independent; the wording is not — that denominator sentence takes the burndown's 88 as its label,
and the census's document slice read this file and quoted its figures back (CENSUS.md:18, :123).
Corroboration by arithmetic, not by an untouched instrument.

**Field 1 — the census's verifier-corrected row-status census, state word `SEALED`, execution-live rows: 21 / 88.**
Members, from CENSUS.md:11 and the per-row `status` column (CENSUS.md:24-113):
`#1` · `#2` · `#4` · `#5` · `#9` · `#11` · `#12` · `#13` · `#14` · `#15` · `#16` · `#19` · `#22` ·
`#35` · `#40` · `#42` · `#68` · `#72` · `#75` · `#79` · `#91`.
**This is a different population from the 0/87 and 0/88 entries 1 and 2 read, and the three numbers
are not a series.** Those two read ⊕¹²'s census of **codex-delta seal standing**; this one reads each
**roster row's** own seal standing at the cursor. Amendment 1 re-keyed those two fields OFF
`spec_state = sealed` on exactly that ground and onto *the Challenge-Law seal-standing census*
(`BURNDOWN.md:111-119`); this field follows that precedent and leaves the `spec_state` key free a
second time, because five of its members (`#11` `#12` `#13` `#14` `#16`) carry an unstruck on-disk
`spec_state=banked` that amendment 1 binds under L-8 (`:124-126`). What it counts is the census's
verifier-corrected status column, read against each row's latest dated bracket (CENSUS.md:3): the
state word, not an L-8 key; `PARTIAL`/`OPEN`/`BLOCKED`/`OWNER-GATED` are likewise the census's own
vocabulary. One caveat measured this seat — six of the seven doc-side rows carry an unstruck inline
`spec_state=banked` in their cursor cells (`#11` `:6433` · `#12` `:6434` · `#13` `:6435` · `#14`
`:6436` · `#16` `:6438` · `#77` `:6439`), while `#15` carries none (`:6437` reads "(`code_state=n/a`,
doc-only row; `evidence_state=captured` …)"); six of the seven carry a `**SEALED**` state word and
`#77`'s reads `**MECHANISM SEALED / CAPTURE-OWED→#10**` (`:6439`). This field reads the state word,
not the parenthetical.
The figure moved under verification inside the census itself: the first-pass readers called **38**
rows SEALED and the
verifiers corrected **17** of them to PARTIAL on one ground — "the row's own state word is LANDED,
never SEALED, and it carries an unstruck owed list, almost always π paint evidence routed to #10"
(CENSUS.md:5). This field counts the corrected column, never the first pass.

**Field 2 — `code_state ≠ unstarted`: 73 / 88.**
The rule, stated so it can be checked: every row whose census status is SEALED or PARTIAL, plus any
BLOCKED or OWNER-GATED row that cites a landing commit. **The census carries no `code_state` column,
so this figure is a proxy over its status column, not a `code_state` census** — and the proxy folds
in all seven doc-side rows of field 3 (`#11` · `#12` · `#13` · `#14` · `#15` · `#16` · `#77`), every
one of which reads `code_state=n/a` at the cursor (`EXECUTION-PROGRESS.md:6433-6439`, measured this
seat) and which entry 1 (`:34`) and entry 2 (`:60-61`) kept out of this key because they author zero
`src/` bytes. They are counted here because the key as written excludes only `unstarted`, and they
are named here so 73 is not read as 73 rows carrying committed `src/` bytes; on the tighter
commit-bearing reading below, five of the seven carry a cited commit and `#12`/`#13` carry none.
Members = field 1's 21, plus the 49 PARTIAL —
`#3` · `#7` · `#8` · `#10` · `#17` · `#18` · `#21` · `#23` · `#24` · `#26` · `#27` · `#28` · `#29` ·
`#30` · `#31` · `#32` · `#33` · `#38` · `#39` · `#41` · `#46` · `#47` · `#49` · `#50` · `#51` ·
`#52` · `#53` · `#55` · `#56` · `#57` · `#58` · `#59` · `#65` · `#66` · `#71` · `#73` · `#74` ·
`#76` · `#77` · `#80` · `#81` · `#82` · `#83` · `#84` · `#85` · `#86` · `#87` · `#88` · `#89`
(CENSUS.md:12) — plus three that carry commits under a non-landed state word: `#6` (BLOCKED,
`6cad2b7e` + `cfc4dffa`) · `#78` (BLOCKED, `ba9b3304`) · `#90` (OWNER-GATED, `192879b7` +
`e277ea42`). 21 + 49 + 3 = **73**. Every SHA in this entry passes `git cat-file -t` at this seat.
Entry 2's `10 / 88` under this key is superseded here, not deleted; it was read before the build ran.

Two facts the numerator does not carry, both measured here so it is not read as stronger than it is.
**(a)** Nine of the 70 SEALED-or-PARTIAL rows cite **no commit at all** in the census's own
landing/seal column — `#7` · `#10` · `#12` · `#13` · `#18` · `#19` · `#23` · `#66` · `#75` — and six
of the nine carry a stated reason while three carry none. The census states three of the six:
`#7`'s landing is `code_state=landed-candidate` 2026-08-03 "in working tree" with no commit SHA cited
(CENSUS.md:30); `#19`'s commit is in the file though not in the cell — its verifier cell reads
`sealCommits: ["bd93c22b"]`, "true that the row CELL cites no SHA, but the file records #19's landing
commit" (CENSUS.md:42); `#66`'s cell is stale against a cut that ran (CENSUS.md:89, verifier). The
cursor states the other three and the census states nothing for any of them: `#12` and `#13` read
"doc-only row" in their own state cells (`EXECUTION-PROGRESS.md:6434`, `:6435`), their census cells
carrying an empty owed column and an empty verifier column (CENSUS.md:35, :36); `#75` reads
`code_state=landed` machine-locally with its pass-2 reseal banked at `d1c8eab8` (`:6416`, `:392`).
`#10`, `#18` and `#23` carry no stated reason in either file. **(b)** The tighter reading, counting
only rows with a cited landing commit in that column, is **64 / 88** — the 61 of 70 above plus the
same three.
**Excluded, named so the exclusion is visible:** `#25` is BLOCKED and cites nothing, its state cell
reading UNSTARTED (CENSUS.md:48); `#67` is OPEN yet cites `ba9b3304`, and the rule as briefed does
not reach an OPEN row, so its commit is not counted here (CENSUS.md:90).

**Field 3 — the banked doc-side deliverable census: 7 / 88.**
Entry 2's six carried forward with their paths under `docs/tranches/BK/execution/`, line counts
**re-measured this seat** by `wc -l` — every one has grown since entry 2 read it, so entry 2's counts
stand as its dated readings and are not restated as current:
`#11` `2026-08-03-row11-process-cure/PROCESS-CURE.md` (229 L) ·
`#12` `2026-08-03-row12-bg-close-reconcile/BG-CLOSE-RECONCILE.md` (493 L) ·
`#13` `2026-08-03-row13-uf-ledger/UF-DISPOSITION-LEDGER.md` (283 L) ·
`#14` `2026-08-03-row14-phantom-repair/PHANTOM-REPAIR.md` (297 L) ·
`#15` `2026-08-03-row15-provenance/PROVENANCE-REGISTER.md` (247 L) ·
`#77` `2026-08-03-momentum-census/MOMENTUM-CENSUS.md` (251 L).
**The seventh is `#16`'s own record** — `2026-08-03-row16-orphan-rows/ORPHAN-ROWS-CLOSE.md` (611 L) —
which entry 2 declined to count because entry 2 was `#16` writing about itself. This seat is not
`#16`, the row is SEALED at the census (CENSUS.md:39), so the file is counted. Six of the seven now
hold seals; `#77` is PARTIAL, mechanism sealed with its capture half owed to `#10`
(`EXECUTION-PROGRESS.md:6439`) — entry 2's closing sentence that **none** of them was sealed is
superseded here, not deleted. Two consequences, both named here. Amendment 1 bound
this field's members to `spec_state = banked` under L-8 (`BURNDOWN.md:124-126`); their cursor cells
still read that inline value unstruck (`EXECUTION-PROGRESS.md:6433-6439`) while six of the seven
state words now read `SEALED` at the census (CENSUS.md:11), so the key here reads on the banked
deliverable, not on the inline `spec_state`. And all seven sit inside field 2's 73, where entry 2's
own bounds were a union with no row double-counted (`BURNDOWN.md:84-85`); fields 2 and 3 overlap in
this entry, and the spread below is not their sum.

Three further doc-side artifacts are banked since entry 2. **They are not folded into the 7/88**,
because the census attributes none of them to a roster row. Enumerated with their paths, all measured
this seat:
`docs/tranches/BK/execution/2026-08-25-pi-band/` — `PI-CENSUS.md` (377 L) plus **seven** battery
record directories (`alpha-dock-search` · `beta-temp-path` · `delta-config-fourier-scroll-story` ·
`gamma-aurora-blob`, which also holds `PI-FIELD-VERDICT.md` · `gamma-handmark` · `rerun` · `rerun2`)
holding **617** files (`find <dir> -type f | wc -l`: 74 · 5 · 136 · 123 · 33 · 155 · 91; `ls -1`
reads 614 top-level entries because `rerun2` holds a nested `instruments/` directory of four files) ·
`docs/tranches/BK/execution/2026-08-29-batch-close/OVERFITTING-AUDIT.md` (343 L), added to the tree at
`3a2329c1` (`git log --diff-filter=A`), "108 graded, 100 KEEP, 8 CUT-CANDIDATE routed to the
disposition wave" (CENSUS.md:212) ·
`docs/tranches/BK/execution/2026-09-17-status-census/CENSUS.md` (227 L), this entry's own source.

**Field 4 — `evidence_state = captured` under a standing seal (entry 2's field 4; entry 1's field 3
read `adjudicated`, a different word, and the census flags the two unreconciled at CENSUS.md:127):
the census carries no `evidence_state` column, so no numerator over 88 is admissible from it.**
Saying otherwise would mint a figure out of a column that does not exist. What the census does carry
is each row's owed text, and that is countable — the members below come from `awk` over the per-row
table's `owed` field (CENSUS.md:24-113):

- **21 rows name `#10` in their owed text:** `#9` · `#26` · `#28` · `#31` · `#32` · `#46` · `#57` ·
  `#68` · `#72` · `#74` · `#77` · `#79` · `#80` · `#81` · `#82` · `#83` · `#84` · `#86` · `#88` ·
  `#90` · `#91`.
- **20 of those name a capture item routed to `#10`** — π cells, Safari cells, or the dark-α
  measurements. The one dropped is `#9`, whose `#10` mention is "Z-1 OFFERED-pending-#10", a
  disposition offer rather than a capture (CENSUS.md:32).
- **18 owe that capture by the row's own words.** `#68` and `#91` are dropped from the 20: `#68`'s
  item is "routed OUT, not owed here" (CENSUS.md:91) and `#91`'s is "carried out of this row, not
  owed by it" (CENSUS.md:113).
- **29 rows name π at all:** `#18` · `#22` · `#26` · `#32` · `#33` · `#34` · `#38` · `#41` · `#46` ·
  `#49` · `#50` · `#51` · `#52` · `#56` · `#57` · `#58` · `#72` · `#73` · `#74` · `#79` · `#80` ·
  `#81` · `#82` · `#83` · `#84` · `#85` · `#87` · `#88` · `#91`. **28 of them name a live π item** —
  `#34` is the exception, its text a negation, "No work, commit, gate or π recorded" (CENSUS.md:57).
- **Of the 28, 14 name `#10`:** `#26` · `#32` · `#46` · `#57` · `#72` · `#74` · `#79` · `#80` ·
  `#81` · `#82` · `#83` · `#84` · `#88` · `#91`. **The other 14 name a π item with no `#10` on the
  cell:** `#18` · `#22` · `#33` · `#38` · `#41` · `#49` · `#50` · `#51` · `#52` · `#56` · `#58` ·
  `#73` · `#85` · `#87`.

So the capture debt is wider than the row that receives it, and the receiving row is itself open:
`#10` π-SUITE is PARTIAL, cites no landing commit, and carries its own owed list — the five ink/fill
dark-α measurements, the census capture half, and `BI.W-DOCK-DEVICE` inbound by name (CENSUS.md:33).
Entry 2's `0 / 88` gets no replacement numerator here, because the census carries no `evidence_state`
column. It is contradicted at the cursor, and the contradiction is measured rather than left implicit:
**eight of field 1's 21 rows carry an unstruck `evidence_state=captured` in their cursor cells beneath
a live `**SEALED**` state word** — `#11` (`:6433`) · `#12` (`:6434`) · `#13` (`:6435`) · `#14` (`:6436`)
· `#15` (`:6437`) · `#16` (`:6438`) · `#75` (`:6416`, "`evidence_state=captured` at the reseal bank") ·
`#91` (`:6424`). Entry 2 read its `0 / 88` before ⊕²⁴/⊕²⁶/⊕²⁷ minted those seals; this entry mints no
numerator in its place and says why.

**Field 5 — the tranche's terminal deliverable: 1 / 1.**
**8.0.0 is published.** Tag `v8.0.0` = `17a11bc5`, `release.yml` run `31300577617` SUCCESS,
2026-08-09, provenance attested — "`npm view @mkbabb/glass-ui@8.0.0` reads `version` 8.0.0 ·
`dist.unpackedSize` 2633353 · `dist.fileCount` 854 · `dist.attestations` present with
`predicateType https://slsa.dev/provenance/v1`" (`EXECUTION-PROGRESS.md:4422`; the ⊕⁷⁴ mark, the
tag, the run number and the SUCCESS at `:4420`); the close cut itself is `a8a6f66b` (`:4402`).
Entry 1's and entry 2's `0 / 1` are superseded here, not deleted.

**A second cut exists and is not published.** `9.0.0` was tagged `v9.0.0` at `d4f7b24f` off a clean
HEAD under the same release law (`git rev-list -n1 v9.0.0` → `d4f7b24f`; `git cat-file -t v9.0.0` →
`tag`); `package.json` at `849c5547` reads `"version": "9.0.0"` while the registry's `latest` is
`8.0.0` (CENSUS.md:227). `release.yml` run `33273556530` went green through `test` and signed
provenance, "and then the registry PUT REDed E404 twice — deterministic, not transient"
(CENSUS.md:176; `EXECUTION-PROGRESS.md:6616-6618`, where `:6616` carries the run and `:6617-6618` the
quoted words). The wall is external and named: npm restricting 2FA-bypassing tokens, with both the
`NPM_TOKEN` repo secret and the local `~/.npmrc` token rejecting `npm whoami` E401
(CENSUS.md:178, :227). One owner input clears it — a granular publish token, Trusted Publishing, or a
local `npm login` off the `v9.0.0` tag tree (CENSUS.md:177). **This is not a fraction of field 5.**
The terminal deliverable is the cut, it shipped once, and the second cut is a walled publish of the
same tranche's tree, recorded here so nobody quotes `1 / 1` as though `9.0.0` were live.

**The spread of record, with the arithmetic shown.** Low bound = sealed rows over execution-live
rows: 21 ÷ 88 = 0.238636 → **23.9%**. High bound = sealed plus landed, i.e. field 1's 21 plus the 49
PARTIAL rows the census glosses as LANDED-with-owed: (21 + 49) ÷ 88 = 70 ÷ 88 = 0.795455 → **79.5%**.
**BK stands between 23.9% and 79.5%.** Entry 2's `0% – ≈18.2%` is superseded by this entry, not
deleted; both of its bounds were read before the build ran. Field 2's 73 ÷ 88 = 0.829545 → 83.0% is
the wider code-bearing reading and is **not** the high bound, because three of its members (`#6`,
`#78`, `#90`) carry commits under a state word that is not LANDED. Neither bound is a schedule, and
the sentence the roster has carried since entry 1 still reads: sealed is not landed is not captured.

**The standing discrepancy entries 1 and 2 both carried is discharged.** Both entries recorded that
the cursor's Φ0/Φ1 tables still read `SEALED` for `#1`/`#2`/`#4`/`#5`/`#8`/`#75` against ⊕¹²'s void,
and both declined to count the cells. What the record shows at this seat:

- **⊕²⁰ demoted five of the six in place** — `#1`/`#2`/`#4`/`#5`/`#8`: "PASS-2 VERDICT (2026-08-03,
  run `wf_88846af9-18b`, 20 seats …): NO RESEALS. Rows #1/#2/#4/#5/#8 HOLD as LANDED-CANDIDATE (cells
  demoted in place below)" (`EXECUTION-PROGRESS.md:240-242`, where `#75` is absent from the list).
  `#75` was voided separately at ⊕²¹ — its cell carries `~~SEALED~~ ~~LANDED-CANDIDATE~~ [⊕²¹: the
  round-4 ceremony seal VOID — demotion confirmed correct at the reseal]` (`:6416`). The stale cells
  were corrected, not left standing.
- **⊕²⁴ then minted fresh seals for four of them on disk-verified grounds** — "THE FIRST STANDING
  SEALS (2026-08-03, fresh-Fable reseal seat): rows #1 · #2 · #4 · #5 SEALED — every enumerated cure
  condition verified on disk, none on trust" (`:323-324`), each cell now reading `**SEALED** [⊕²⁴ …
  fresh-Fable RESEAL] ~~LANDED-CANDIDATE ⊕²⁰~~` (`:6405`, `:6406`, `:6408`, `:6409`).
- **⊕²⁷ resealed `#75`** — "#75 pass-2 RESEAL (`wf_321dd098-08e`, `d1c8eab8`)" (`:392`), the cell at
  `:6416` carrying the ⊕²¹ void of the round-4 ceremony seal struck beneath it.
- **`#8` alone was never resealed.** Its cell reads `~~CLOSED~~ LANDED-CANDIDATE [2026-08-03 pass-2
  ⊕²⁰: cell demoted — the seal ceremony cites VOID seats (⊕¹²/⊕¹⁴, quality grounds); reseal owed to a
  clean pass-2]` (`:6410`), and the census carries it as PARTIAL, `code_state=landed`,
  `evidence_state=candidate`, "reseal owed to a clean pass-2" (CENSUS.md:31).

So five of the six are in field 1 above on a **new** basis and one is not. The seals field 1 counts
for `#1`/`#2`/`#4`/`#5`/`#75` are ⊕²⁴/⊕²⁷ seals, never the voided codex-delta ones entries 1 and 2
refused — the ruling those entries read still holds for the delta, and the rows re-earned their cells
afterwards. The discrepancy is closed. It is not carried into a fourth entry.

**Not counted, and why.** The 14 never-started rows (`#20` · `#34` · `#43` · `#44` · `#45` · `#48` ·
`#54` · `#60` · `#61` · `#62` · `#63` · `#64` · `#67` · `#69`, CENSUS.md:13, :117) appear in no
numerator here. The census's first-pass tally (38 SEALED · 31 PARTIAL · 2 BLOCKED · 16 OPEN · 2
retired · 1 OWNER-GATED, CENSUS.md:18) enters no numerator either; the 38 named in field 1 is quoted
only to record the 38→21 correction, and every numerator above counts the verifier-corrected column
(CENSUS.md:11-16). And no entry-3 figure counts the post-close queue: O-20's `§A-2..A-14` and `§B`
read "RECEIVED — awaits disposition wave" (CENSUS.md:134-153), the eight CUT-CANDIDATEs read
"REPORTED — nothing cut; routed to disposition wave" (:155-159) and, for the three `darkModeSyncScript`
options taken as one row, "REPORTED as ONE decision, not three; nothing cut; routed to…" (:160), the
register carrying them as "OPEN (routed)" (:212); and the
permanent `./styles` parse arm reads "ROUTED, OPEN" (:211) — each a queue state, not a row state.

**One thing this entry does not decide.** No `FINAL.md` exists in `docs/tranches/BK/` at this reading
(`ls docs/tranches/BK/` → ASK · AUDIT-REFRESH-2026-07-28 · BURNDOWN · EXECUTION-DAG-2026-08-03 ·
EXECUTION-PROGRESS · PLAN · PORT + `coordination/` `execution/` `gates/` `recovery/`; CENSUS.md:123
reads the same), and none is authored in this pass. Whether BK closes on this reading or carries a
remainder band is the owner's scoping call, and the burndown is not the file that makes it. This
entry records the spread; it does not close the tranche.
