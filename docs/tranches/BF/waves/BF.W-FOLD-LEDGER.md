# BF.W-FOLD-LEDGER — the no-silent-drop disposition machine for the BE→BF fold

**Band: 0 · Tier T0 · depends: — (the FIRST wave; every deferral decided before any later wave can claim closure)**

## The defect / the ask

The audit's headline accountability failure: **`BE.W-FOLD-LEDGER` was specced but never built** (DEFERRED-CENSUS **D11**, `chronic ✓`), so the BE work's deferrals "rode un-decided" — `useDockContextSilhouette` (551L, the headline engine) went to zero consumers with no recorded disposition, the spike (`useLiquidMorph.ts`) sat undeleted with no RETIRE row, the V↔H facsimile carried no BUILD trigger, the 5-way rAF re-fork was never named a chronic. The BE close was an honest-flush ceremony with **no mechanical floor** — exactly the BB.W-DISPOSITION-RESTAMP / BC.W-FOLD-LEDGER class the no-silent-drop discipline exists to kill (SEED §3: "The no-silent-drop machine itself is wave-1"). This also closes the **D32 bookkeeping half** (the 5 BE source gates carrying `release` without a binding π are RECORDED as BUILD rows pointing at `W-PI-AUTHOR`; the gate-downgrade itself is W-PI-AUTHOR's, the LEDGER ROW is this wave's).

The census `docs/tranches/BF/audit/DEFERRED-CENSUS.md` (32 rows: 23 BUILD · 5 DEFER-with-trigger · 1 DEFER · 1 RETIRE · 2 BUILD-reconcile/gate) is the human face. This wave mints its machine witness + the gate that REDs the close on any row that loses its disposition or names a phantom destination wave.

## The mechanism

Mint the two artifacts + the gate, transposing the **`scripts/proof-bc-fold-ledger.mjs`** precedent (the direct ancestor — `proof:be-fold-ledger` is `proof:bc-fold-ledger` re-pointed at the BF tree, NOT a re-implemented detector; the BC gate's `runChecks({ledger, docIds, register})` shape + its 7 self-test bites are the proven house pattern). The naming is `be-fold-ledger` (it folds the **BE** work's deferrals — the SEED/DAG call the wave `W-FOLD-LEDGER` and the gate `proof:be-fold-ledger`).

- **`docs/tranches/BF/FOLD-LEDGER.json`** — the machine source. One `items[]` row per census line: `{ id: "D1".."D32", item, chronic: boolean, disposition, wave?, band?, rationale?, trigger? }`. SEEDED directly from `DEFERRED-CENSUS.md` (the gate's F1 parity asserts the two never drift). Plus a `closeUnion` block (`{ runMode: "full", perRound: true, localOnlyForbidden: true }` — the BC.W-CLOSE-BATTERY floor, the masked-accretion cure carried forward).
- **`docs/tranches/BF/FOLD-LEDGER.md`** — the human face. The same 32-row table as the census (the census IS the seed; the ledger `.md` is its canonical post-decision copy, the `DEFERRAL-LEDGER.md` ↔ `FOLD-LEDGER.json` parity the BC gate's F1 asserts). The doc id extraction reuses the BC `extractDocIds` `| id |` first-cell scan.
- **`scripts/proof-be-fold-ledger.mjs`** — the gate. `tags: ["local","ci","release"]` (a bookkeeping close-oracle, no device — the BC fold-ledger tag set). Registered in `gates.mjs`.

The **disposition vocabulary** is the census's: `BUILD` · `DEFER-with-trigger` · `DEFER` · `RETIRE-with-rationale` · `BUILD(reconcile)` (the D31 form). The destination-bearing dispositions (`BUILD`, `BUILD(reconcile)`) resolve their `wave` to a real `docs/tranches/BF/waves/BF.W-*.md`; `DEFER-with-trigger` carries a non-empty `trigger`. Compositor-only / paint-first do not apply (this is a doc/JSON disposition machine, zero pixels — the BB.W-NDA-DECIDE precedent: a register-disposition flip carries NO `proof:ba-gestalt` of its own).

## The gate — `proof:be-fold-ledger` (born-RED → GREEN)

Clauses (transposed from `proof:bc-fold-ledger` F1-F7, scoped to the 32-row BF census):

- **F1 — doc⟷JSON completeness.** Every census `D#` id in `DEFERRED-CENSUS.md`'s table appears in `FOLD-LEDGER.json` and vice-versa; the **32-item count** is asserted (a drift REDs). REDS pre-fix: the JSON does not exist.
- **F2 — decided-destination soundness.** Every `BUILD`/`BUILD(reconcile)` row's `wave` resolves to a real `docs/tranches/BF/waves/BF.W-*.md`. A phantom dest (`BF.W-DOES-NOT-EXIST`) REDs. The 23 BUILD + 2 reconcile rows are cross-checked against `EXECUTION-DAG.md`'s wave set.
- **F2.b — band-string rejection.** A `BUILD` `wave` that is EMPTY or matches `/^Band\s*\d+/i` (a bare band label, not a `BF.W-*` id) REDs — a band is a thematic grouping, never a destination.
- **F3 — no-undecided / no-book.** Every row's `disposition ∈ {BUILD, BUILD(reconcile), DEFER-with-trigger, DEFER, RETIRE-with-rationale}`; a `book`/empty/`re-stamped`/`deferred`-bare disposition REDs — the chronic re-stamp the BE close perpetrated (D11 itself) is forbidden.
- **F4 — DEFER carries a trigger.** Every `DEFER-with-trigger` row carries a non-empty `trigger` (the re-entry condition: D24/D25 → `W-GOO-SPLIT-PERF` real-Metal p50; D26 → `DockNowPlaying` ≥2nd consumer; D28 → `W-FLIP-SPINE` shared driver lands). A bare `DEFER-with-trigger` REDs. (The single plain `DEFER` row, D27, carries a `rationale` instead — the gate accepts `DEFER` iff it names a `rationale` AND is explicitly NOT-a-live-BF-dep.)
- **F5 — RETIRE carries a rationale + successor.** The 1 RETIRE row (D30, `useLiquidMorph` orphan) carries a non-empty `rationale` AND a `successor` (`useDockFission` is the wired survivor) AND a `retiredBy` (`W-SPIKE-DELETE`) that resolves on disk (the BB.W-NDA-DECIDE terminal-lock shape).
- **F6 — chronic-completeness.** Every census row flagged `chronic ✓` (D1-D9, D11-D12, D17-D18, D24-D28, D30, D32) is present + carries a disposition; a chronic dropped from the JSON REDs (the cross-tranche-deferral surface is the one most prone to silent loss).
- **F7 — close-union binding.** `closeUnion.runMode === "full"` ∧ `perRound === true` ∧ `localOnlyForbidden === true` (the BC F6 floor); any other shape REDs.

**Self-test (`--self-test`, born-RED→GREEN, 7 bites — the BC pattern):** (1) a dropped item → F1 RED; (2) a phantom dest `BF.W-DOES-NOT-EXIST` → F2 RED; (3) a band-only dest `"Band 0/truth"` → F2.b RED; (4) a `book` disposition → F3 RED; (5) a bare `DEFER-with-trigger` (trigger deleted) → F4 RED; (6) a RETIRE with no successor → F5 RED; (7) a `local`-only `closeUnion` → F7 RED. Each MUST flag; the real ledger MUST be clean after.

**What REDs on the pre-fix tree:** `FOLD-LEDGER.json` does not exist (F1 hard-fails at load), so the gate is born-RED by construction — the deferrals are un-machine-decided exactly as the BE close left them.

## The binding π — none (zero-pixel register-disposition wave)

There is NO `tests-visual/be-fold-ledger.spec.ts` and NO `proof:ba-gestalt` row. Per the **BB.W-NDA-DECIDE** precedent (and SEED §6 precept 5's "retired-with-rationale" arm), a register-disposition flip + a doc reconcile + a lock gate changes ZERO paint — the gestalt bar binds VISUAL waves only. The binding truth here is the gate's self-test (the detector is load-bearing) + F1's doc⟷JSON parity (the human face cannot drift from the machine source). This is the explicit exception the anti-disease invariant carves: a paint-free truth wave is closed on its source gate + self-test, not a captured pixel.

## The gestalt row

None (see above — zero-pixel wave). This wave is what MAKES the gestalt-roster enforceable downstream: it is the Band-0 truth foundation alongside `W-GESTALT-WIRE` + `W-PI-AUTHOR`.

## Fences

- **No-legacy.** The census `DEFERRED-CENSUS.md` is the SEED; once `FOLD-LEDGER.md` lands as the canonical post-decision copy there is ONE table of record — no parallel "BE deferral list" survives. (The census file stays as the audit-input provenance the SEED §3 cites; the gate parities them so neither drifts.)
- **No double-count.** Each census `D#` is one DISTINCT fold → one JSON row. A genealogy cross-reference (e.g. D24/D25 both pointing at `W-GOO-SPLIT-PERF`) is two distinct deferrals (the real-Metal capture vs the always-on teardrop fidelity), each its own row — NOT folded (the BC `GENEALOGY_IDS` no-double-count rule applies only to literal cross-ref duplicates, of which the BF census has none).
- **Not a re-book.** The anti-pattern this must not become: a row whose `disposition` is a soft "deferred to BF+1" with no trigger and no wave — the F3/F4 floor makes that the exact RED the BE close should have hit. Every D# is BUILD|DEFER-with-trigger|DEFER-with-rationale|RETIRE, never re-stamped.
- **Foreign-tree fence (inv-26).** The cross-repo deferrals (D26 album-tint, D27 kf `snap`-option) record a by-name trigger only — this wave edits ZERO sibling tree.

## Disposition links

Closes **D11** (the disposition machine itself, BUILD → this wave) and the **bookkeeping half of D32** (the 5 BE source gates → BUILD rows naming `W-PI-AUTHOR`; the gate-tag downgrade is W-PI-AUTHOR's, the ledger row is this wave's). Machine-locks all 32 census rows (the no-silent-drop floor for the whole BF fold).
