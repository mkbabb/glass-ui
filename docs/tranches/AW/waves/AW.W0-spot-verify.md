# AW.W0 - Formalize + spot-verify (DEV reground)

## State

**Name**: W0 - Formalize + spot-verify (DEV reground)
**Opens after**: AW tranche open (FIRST; the DEV wave — writes no `src/`)
**Agents**: 1 serial
**Hard gate**: `proof:aw-w0-reground` green — `AW.md` + `PROGRESS.md` exist; HEAD `afdc485` is ancestor-reachable; the spot-verify ledger records EXISTS + verbatim-rg-count + alias-resolved verdict for every W19 retire candidate; a hallucinated path or an under-count halts the close.
**Status**: planned

## 2a. Goal criterion

This wave succeeds if, when work ends, the tranche has a re-grounded ledger every later retire wave can trust: `PROGRESS.md` is the live status log, HEAD is confirmed, and the overfitting spot-verify has run BEFORE any retire wave so each retire candidate (instrument-chassis/instrument-rail, glyph-face/disco-glyph, metric-cell/metric-stack) carries a recorded EXISTS check, a verbatim `rg` consumer count, and a verdict resolved through re-export aliases — not a hallucinated audit number. This is the binding precondition for W19 (inv P7); W19 cannot retire anything the W0 ledger has not cleared.

## 3. Scope

1. Create `docs/tranches/AW/PROGRESS.md` — the per-wave status log (W0-W21, one row each: planned/in_progress/complete/…, the green run-id when closed). Mirrors the AV `PROGRESS.md` shape. W0 marks itself `in_progress` at open, `complete` at close.
2. Re-ground against HEAD: confirm HEAD `afdc485` on branch `at-dock-convergence`, version 3.3.0 published, is ancestor-reachable; record the confirm in the ledger. Bind zero-deferral at open (P-Inv 28 — no ask is carried forward unledgered; every `RECAP.md` row maps to an `AW.md §0` disposition or a wave).
3. Run the overfitting spot-verify (`SPEC §"Audit-verdict spot-verification gate"`) over the retire candidates BEFORE W19 dispatches. For EACH candidate:
   - **EXISTS** — `ls`/Read the cited path; record present/absent.
   - **verbatim rg** — re-run the consumer-count `rg` the audit claimed, paste the literal command + the literal count (no paraphrase).
   - **alias-resolved verdict** — resolve every "zero consumers" claim through re-export aliases (a `custom/<x>/index.ts` barrel re-export, a subpath mirror in `src/subpaths/`, a root-barrel cherry-pick in `src/index.ts`). A consumer reached only through an alias still counts.
   The candidate set is exactly: instrument-chassis/instrument-rail (`RECAP :18`), glyph-face/disco-glyph (`RECAP :19`), metric-cell/metric-stack (`RECAP :20`).
4. Surface the **metric-cell/metric-stack hidden dep** explicitly in the ledger: AV.W10 targeted them as orphans but a hidden dep restored them (`RECAP :20`). The W0 ledger names that dep (the importing path + the `rg` that finds it) so W19's prune is born-RED against a real, surfaced coupling — not blind.
5. Write the spot-verify ledger to `docs/tranches/AW/audit/W0-spot-verify.md` (the table: candidate · EXISTS · verbatim-rg-cmd · count · alias chain · verdict {migrate-off-and-remove | keep-and-document | prune}). The verdict is W0's recommendation; W19 executes it (W19 may not retire a candidate W0 verdicted keep-and-document, and may not skip a candidate W0 verdicted remove).

## 3a. Triumvirate Dispatch

Trigger a triumvirate (research + plan augment + redress) when:

- a cited retire candidate path does NOT exist (a hallucinated audit item) — the file bounds of the downstream W19 are invalidated, escalate before W19 dispatches;
- a verbatim `rg` count contradicts the audit's claimed count by ≥1 genuine consumer (an under-count) — the retire verdict flips, re-plan W19's scope;
- the metric-cell/stack hidden-dep trace cannot be located on the third pass (the dep that restored them after AV.W10 is not findable) — halt; W19's prune cannot be born-RED against an unfound coupling.

## 4. File Bounds

| File | Access |
|---|---|
| `docs/tranches/AW/PROGRESS.md` | create |
| `docs/tranches/AW/audit/W0-spot-verify.md` | create (the ledger) |
| `scripts/proof-aw-w0-reground.mjs` | create |
| `package.json` | modify (register `proof:aw-w0-reground`) |

Do NOT touch: `docs/precepts/`, any `src/*` (this is the DEV wave — it writes no source; the retire EXECUTION is W19), the other wave files (each wave owns its own status row update at its own close — W0 seeds the rows, later waves flip them).

## 4a. Disjointness

Single agent unit; no intra-wave path contention. W0 writes only the two docs + the gate script + the `package.json` script entry. It shares no `modify` path with any IMPL wave; the only `src`-adjacent write is the `package.json` script registration (a one-line entry, disjoint from every other wave's `proof:*` registration line by the gate id).

## 5. Agent Units

### AW.W0.a The reground ledger + spot-verify gate

- Goal: a live `PROGRESS.md`, a confirmed HEAD, and a recorded spot-verify ledger (EXISTS + verbatim-rg + alias-resolved verdict) for every retire candidate, frozen by a gate that halts on a hallucinated item or under-count.
- Mechanism:
  - Author `PROGRESS.md` (the W0-W21 status table) + the reground note (HEAD `afdc485` ancestor-reachable, 3.3.0 published).
  - Run the spot-verify over the three candidate pairs; paste verbatim `rg` commands + counts; resolve through the alias chain; record verdicts in `audit/W0-spot-verify.md`. Surface the metric-cell/stack hidden dep with its importing-path `rg`.
  - `scripts/proof-aw-w0-reground.mjs`: assert `AW.md` + `PROGRESS.md` exist; assert `git merge-base --is-ancestor afdc485 HEAD` succeeds; parse `audit/W0-spot-verify.md` and assert every retire candidate row carries a non-empty EXISTS field, a non-empty verbatim-rg command + a numeric count, and a verdict in the allowed set; assert the metric-cell/stack hidden-dep row names a concrete importing path. A missing row, an empty rg field, or a verdict outside the set exits non-zero. JSON artifact, default export. Register `"proof:aw-w0-reground"` in `package.json`.
- Files: `PROGRESS.md`, `audit/W0-spot-verify.md`, `scripts/proof-aw-w0-reground.mjs`, `package.json`.
- Sub-gate: `npm run proof:aw-w0-reground` green; the ledger table is complete for all three candidate pairs; the hidden-dep row is non-empty.

## 6. Hard Gate

1. **Docs exist.** `AW.md` and `docs/tranches/AW/PROGRESS.md` both present; `PROGRESS.md` carries a status row for every wave W0-W21.
2. **HEAD confirmed.** `git merge-base --is-ancestor afdc485 HEAD` exits 0 (HEAD `afdc485` ancestor-reachable); the reground note records branch + published version.
3. **Spot-verify ledger complete.** `audit/W0-spot-verify.md` records, for EACH of the three retire candidate pairs (instrument-chassis/rail, glyph-face/disco-glyph, metric-cell/stack): an EXISTS check, the verbatim `rg` consumer-count command + its literal count, the alias chain walked, and a verdict in `{migrate-off-and-remove, keep-and-document, prune}`. A row with an empty rg field or a verdict outside the set fails the gate.
4. **Hidden dep surfaced.** The ledger names the concrete path + the `rg` that restored metric-cell/metric-stack after AV.W10 (the hidden dep W19's prune must be born-RED against).
5. **No hallucination / no under-count.** Every cited candidate path EXISTS (no `ls`-absent row); no verbatim count contradicts the audit by ≥1 genuine consumer without the verdict flipping accordingly. `proof:aw-w0-reground` exits 0.

## 7. Format And Lint Cadence

- This is a docs-only DEV wave (the only `src`-adjacent change is the `package.json` script entry). Run `git diff --check` on `PROGRESS.md` + the ledger for whitespace; `node --check scripts/proof-aw-w0-reground.mjs` for the new ESM gate.
- `npm run proof:aw-w0-reground` is the generated-format/evidence check at close.
- No formatter skipped; no typecheck arm (no `.ts` surface beyond the `.mjs` gate, which the `node --check` covers).

## 8. Verification Artefacts

- `docs/tranches/AW/PROGRESS.md` (the live status log).
- `docs/tranches/AW/audit/W0-spot-verify.md` (the spot-verify ledger — the binding W19 precondition).
- `scripts/proof-aw-w0-reground.mjs` JSON artifact.
- The reground note (HEAD `afdc485` ancestor confirm + 3.3.0-published).

## 9. Commit Plan

- `docs(tranche-AW): W0 — PROGRESS.md + reground note (HEAD afdc485, 3.3.0)` — the status log + the reground; body cites the zero-deferral bind (P-Inv 28).
- `docs(tranche-AW): W0 — spot-verify ledger (EXISTS + verbatim-rg + alias verdict)` — the ledger; body names the three candidate pairs + the surfaced metric-cell/stack hidden dep.
- `feat(gate): proof:aw-w0-reground — the retire precondition gate` — the `.mjs` + the `package.json` registration; body cites inv P7 (the spot-verify gate is binding).
- `docs(AW): W0 close — status` — the status row flip.

## 10. Dependencies

- **Depends on**: AW tranche open. No dependency on any IMPL wave; W0 opens FIRST.
- **Blocks**: AW.W19 (the orphan/prune wave) — inv P7 makes the W0 ledger the binding precondition for every W19 retire. W19 may not dispatch until `proof:aw-w0-reground` is green and the ledger verdicts are recorded.

## 11. Archaeology

AV.W10 targeted metric-cell + metric-stack as orphans but a hidden dep restored them (`RECAP :20`); the instrument-chassis prune was PARTIAL because the audit found real consumers (GlassDock `variant="instrument-strip"`, InstrumentChassis←InstrumentRail — `RECAP :18`). Those two near-misses are exactly why the spot-verify gate is binding: a blind retire against a hallucinated or under-counted audit number is the failure class inv P7 closes. W0 produces the ledger; W19 may retire only what the ledger clears.
