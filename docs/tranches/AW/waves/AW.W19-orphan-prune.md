# AW.W19 - Orphan resolution + metric-cell/stack prune

## State

**Name**: W19 - Orphan resolution + metric-cell/stack prune
**Opens after**: AW.W0 (the spot-verify ledger is the binding precondition — inv P7) and the Band-D close (W14 owns the data-table tree; W19 touches no data-table path)
**Agents**: 1 serial
**Hard gate**: `proof:orphan-resolved` green (every W0-ledger candidate either has ≥2 documented genuine consumers OR is removed with zero residue — a hallucinated item or under-count from W0 is a close-blocker) AND `proof:no-god-module` green (no `src/` file >500; the orphan removals leave no dangling import).
**Status**: planned

## 2a. Goal criterion

This wave succeeds if, when work ends, every spot-verified orphan the W0 ledger named is resolved one of exactly two ways — **migrate-off-and-remove** (the consumers move to a kept primitive, then the artefact is deleted with zero residue) or **keep-and-document** (≥2 genuine consumers are recorded and the primitive earns a one-line load-bearing rationale) — and the metric-cell/metric-stack prune lands cleanly with its hidden dep surfaced FIRST (born-RED against the real coupling, not blind). The verdict for each candidate is the W0 ledger's; W19 executes, it does not re-adjudicate. No retire happens against a candidate W0 verdicted keep, and no candidate W0 verdicted remove survives.

## 3. Scope

1. **Resolve the instrument-chassis / instrument-rail orphan** per the W0 verdict. The W0 ledger found real consumers (GlassDock `variant="instrument-strip"`, InstrumentChassis←InstrumentRail — `RECAP :18`), so the expected verdict is **keep-and-document**: record the ≥2 genuine consumers + a one-line load-bearing rationale at the package barrel. If W0 instead verdicted migrate-off-and-remove, migrate those named consumers onto the kept surface, then delete with zero residue. Follow the ledger; do not re-decide.
2. **Resolve the glyph-face / disco-glyph orphan** per the W0 verdict. Both ship with provide/inject silhouette cooperation + demo consumers (`RECAP :19`), so the expected verdict is **keep-and-document** (the provide/inject pair + the demo consumer are the ≥2). If W0 verdicted remove, migrate the demo consumer off and delete the pair with zero residue.
3. **Prune metric-cell / metric-stack cleanly** per the W0 verdict — the clean orphan prune AV.W10 could not finish (a hidden dep restored them — `RECAP :20`). **Surface the hidden dep FIRST** (it is named in the W0 ledger): the prune is born-RED against that concrete coupling. Migrate the hidden-dep consumer off the metric-cell/stack surface, then delete both packages + their subpath mirrors (`src/subpaths/metric-cell.ts`, `src/subpaths/metric-stack.ts`) + their `package.json` exports + their `api/index.ts` type entries, with zero residue. The speedtest consumer the CLAUDE.md barrel names is the surface to confirm migrated/owned-elsewhere before deletion.
4. **Zero-residue discipline (inv P1).** Every removal is a clean break: no `legacy*` alias, no deprecate-and-keep, no orphaned subpath barrel, no dangling `api/index.ts` symbol, no dead `src/subpaths/*.ts` mirror. A `grep` for any retired symbol outside its deletion commit returns 0.
5. **Update the W0 ledger to executed-state** in `audit/W19-orphan-prune.md`: each candidate · W0 verdict · action taken (kept+documented | migrated+removed) · the post-action `grep` proving zero residue (for removals) or the recorded ≥2 consumers (for keeps).

## 3a. Triumvirate Dispatch

Trigger a triumvirate (research + plan augment + redress) when:

- a removal reveals a consumer the W0 ledger did NOT surface (an under-count escaped the spot-verify) — the W0 precondition is violated, escalate; the retire cannot proceed against an unledgered consumer (inv P7 close-blocker);
- the metric-cell/stack hidden-dep migration cannot be done without touching a path outside W19's File Bounds (the dep reaches into a band-owned surface) — file bounds expand, re-plan;
- a third iteration of `typecheck`/`build` fails after a removal (a dangling import the deletion did not fully sever).

## 4. File Bounds

| File | Access |
|---|---|
| `src/components/custom/metric-cell/` | delete (per W0 verdict) |
| `src/components/custom/metric-stack/` | delete (per W0 verdict) |
| `src/subpaths/metric-cell.ts` | delete |
| `src/subpaths/metric-stack.ts` | delete |
| `src/components/custom/instrument-chassis/index.ts` | modify-carve (keep-and-document rationale, per W0 verdict) |
| `src/components/custom/instrument-rail/index.ts` | modify-carve (keep-and-document rationale) |
| `src/components/custom/glyph-face/index.ts` | modify-carve (keep-and-document rationale) |
| `src/components/custom/disco-glyph/index.ts` | modify-carve (keep-and-document rationale) |
| `src/api/index.ts` | modify-carve (remove the metric-cell/stack type entries) |
| `package.json` | modify-carve (remove the `/metric-cell` + `/metric-stack` exports; register `proof:orphan-resolved` + extend `proof:no-god-module`) |
| `<the hidden-dep consumer path named in the W0 ledger>` | modify-carve (migrate off metric-cell/stack) |
| `scripts/proof-orphan-resolved.mjs` | create |
| `scripts/proof-no-god-module.mjs` | create-or-modify (the `>500` + `DataTable.vue ≤380` ceiling — coordinate with W14's `wc -l` gate) |
| `docs/tranches/AW/audit/W19-orphan-prune.md` | create (the executed ledger) |

Do NOT touch: `docs/precepts/`, `src/components/ui/data-table/` (W14 owns the split; its `DataTable.vue ≤380` ceiling is the only `proof:no-god-module` line W14 touches — W19 owns the `>500` global assertion and reads W14's ceiling, it does not re-split), any aurora/blob/dock band surface, the W0 ledger (W19 reads it as the binding verdict; it writes the executed-state ledger separately).

## 4a. Disjointness

Single agent unit; no intra-wave path contention. W19 opens after Band D so it shares no live `modify` path with W14 (data-table), W12 (glass-panel), W13 (affordance), or W15 (hygiene). The `proof:no-god-module` script: W14's gate asserts `DataTable.vue ≤380` (a sub-ceiling); W19's `proof:no-god-module` asserts the `>500` global floor AND reads the `≤380` DataTable line — one script, W19 owns it, W14 references it. If W14 already created the script, W19 modifies it to add the global `>500` walk; if not, W19 creates it carrying both assertions.

## 5. Agent Units

### AW.W19.a Orphan resolution + clean prune

- Goal: every W0-ledger orphan resolved by its recorded verdict (keep-and-document with ≥2 documented consumers, OR migrate-off-and-remove with zero residue), the metric-cell/stack prune landed against its surfaced hidden dep, frozen by `proof:orphan-resolved` + `proof:no-god-module`.
- Mechanism:
  - For keep verdicts: add the one-line load-bearing rationale + the ≥2-consumer note to the package barrel (instrument-chassis/rail, glyph-face/disco-glyph per the W0 ledger).
  - For the metric-cell/stack remove verdict: migrate the W0-named hidden-dep consumer off the surface FIRST; then delete both package dirs + their `src/subpaths/*.ts` mirrors + their `package.json` exports + their `api/index.ts` types; `grep` proves zero residue.
  - `scripts/proof-orphan-resolved.mjs`: parse `audit/W0-spot-verify.md` (the verdicts) + `audit/W19-orphan-prune.md` (the executed actions); assert each candidate's executed action matches its W0 verdict; for keep verdicts assert ≥2 documented consumers + a rationale comment exists in the barrel; for remove verdicts assert a zero-residue `grep` (no surviving import, subpath mirror, export, or api symbol). Born RED on HEAD (the metric-cell/stack subpaths + types still exist; no executed ledger). A hallucinated W0 item or an under-count surfaced at execution exits non-zero (the close-blocker).
  - `scripts/proof-no-god-module.mjs`: walk `src/**/*.{ts,vue}`, assert none exceeds 500 lines; assert `DataTable.vue ≤380` (reads W14's ceiling). Born RED only if a `>500` file survives.
- Files: the deletions, the keep-rationale barrels, the hidden-dep consumer, `api/index.ts`, `package.json`, the two gate scripts, the executed ledger.
- Sub-gate: `npm run proof:orphan-resolved` + `npm run proof:no-god-module` green; `npm run typecheck` + `npm run build` green (no dangling import); `grep` for every retired metric-cell/stack symbol returns 0 outside the deletion commit.

## 6. Hard Gate

1. **Verdict-matched resolution.** `proof:orphan-resolved` green: every W0-ledger candidate's executed action matches its recorded verdict — keep-and-document candidates carry ≥2 documented genuine consumers + a load-bearing rationale comment in the barrel; migrate-off-and-remove candidates are deleted with a zero-residue `grep`. A candidate W0 verdicted keep that was removed, or W0 verdicted remove that survives, is RED.
2. **Hidden dep surfaced before prune.** The metric-cell/stack prune migrated the W0-named hidden-dep consumer FIRST; the executed ledger records the migration + the post-migration `grep` proving the metric-cell/stack surface is no longer imported anywhere before the delete commit. A prune that ran without the surfaced dep migration is RED.
3. **Zero residue (inv P1).** `grep -rn "MetricCell\|MetricStack\|metric-cell\|metric-stack" src/ package.json` returns only the deletion-commit removals — no surviving import, no `src/subpaths/` mirror, no `package.json` export, no `api/index.ts` type, no `legacy*` alias.
4. **No god module.** `proof:no-god-module` green: no `src/` file >500 lines; `DataTable.vue ≤380` (W14's ceiling holds).
5. **Hallucination/under-count close-blocker.** If execution surfaces a consumer the W0 ledger did not record (an under-count) or a candidate path that does not exist (a hallucination), the gate exits non-zero and the wave closes `complete_with_misses` pending a W0 re-run — never green over an integrity gap.
6. **Build + types green.** `npm run build` + `npm run typecheck` pass; `npm run verify-export-types` shows the metric-cell/stack subpaths removed cleanly (no orphaned dts probe entry).

## 7. Format And Lint Cadence

- `npm run typecheck` after each removal (catches dangling imports immediately) and before close.
- `npm run proof:orphan-resolved` + `npm run proof:no-god-module` after the executed ledger lands.
- `npm run verify-export-types` after the `package.json` export removals.
- `npm run build` before close.
- `git diff --check` for whitespace.
- No formatter skipped.

## 8. Verification Artefacts

- `docs/tranches/AW/audit/W19-orphan-prune.md` — the executed ledger (candidate · W0 verdict · action · zero-residue grep | ≥2-consumer record).
- `scripts/proof-orphan-resolved.mjs` + `scripts/proof-no-god-module.mjs` JSON artifacts.
- The `grep` output proving zero residue for the metric-cell/stack removal.
- The integration commit hashes.

## 9. Commit Plan

- `refactor(orphans): keep-and-document instrument-chassis/rail + glyph-face/disco-glyph (≥2 consumers)` — the keep-verdict rationales; body cites the W0 ledger's documented consumers.
- `refactor(metric): migrate the hidden-dep consumer off metric-cell/stack` — the dep migration (lands BEFORE the delete); body names the W0-surfaced hidden dep.
- `refactor(metric): remove metric-cell + metric-stack (zero residue)` — the deletions + subpath/export/api removals; body cites inv P1 (clean break, no alias).
- `feat(gate): proof:orphan-resolved + proof:no-god-module` — the two gates; body cites inv P7 (the W0 ledger is the binding precondition).
- `docs(AW): W19 close — executed orphan ledger` — the artefact + status flip.

## 10. Dependencies

- **Depends on**: AW.W0 (the spot-verify ledger — inv P7; the verdicts W19 executes) and the Band-D close (W14 owns the data-table tree; W19's `proof:no-god-module` reads W14's `DataTable.vue ≤380` ceiling).
- **Blocks**: AW.W21 (the close wave registers `proof:orphan-resolved` + `proof:no-god-module` in `gates.mjs` and the overfitting audit reads W19's executed ledger).

## 11. Archaeology

AV.W10 targeted metric-cell + metric-stack as orphans but a hidden dep restored them (`RECAP :20`) — the prune could not complete because the dep was not surfaced first. The instrument-chassis prune was PARTIAL: the audit found real consumers and BOOKed them with evidence rather than blind-removing (`RECAP :18`). Both near-misses are why W19 is gated on the W0 ledger (inv P7): W19 executes a spot-verified verdict, it does not re-adjudicate a raw audit number. The guardrail against a repeat blind-prune is `proof:orphan-resolved`'s verdict-match assertion + the born-RED-against-the-surfaced-dep clause.
