# BA.W-HYGIENE — the mechanical close-debt swept before the cut, not at it

**Name**: W-HYGIENE - the close-debt sweep + the two drift-proofing gates
**Opens after**: BA tranche open (Batch 0; runs ‖ W-SHELL-HOLD ‖ W-GESTALT-GATE ‖ W-CARVE2 — disjoint file bounds)
**Agents**: 1
**Hard gate**: `proof:claude-structure-sync` (born-RED — the CLAUDE.md custom/ enumeration ≠ disk) + `proof:colocation` TARGET_DIRS derived-not-hand-listed (the gate covers aurora/ + fourier-field/, born-RED against the frozen 4-dir list) + a clean-tree integrity sweep (submodule clean, zero un-ignored-but-untracked visual pngs, MIGRATION/AY-DELTA/AX-pending debt rows discharged).
**Status**: SPEC

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave is the discharge of seven file:line-anchored close-debt findings the BA fleet
root-caused, not a blind doc-rewrite (BA invariant 3 — re-opened ≠ rebuilt-blind). Before
touching a byte the impl agent re-greps each anchor below at HEAD and confirms the debt
still stands; if any row has drifted (a file moved, a count shifted, a submodule already
committed), the agent records the drift in PROGRESS and re-locates the debt before
proceeding — it does NOT re-diagnose the close from scratch. Every count below was
HEAD-verified at authoring (`master @ v3.13.0`, the AZ close cut).

Grounding findings (the two BA fleet lanes carry the anchors):

- **DC-REC-3** [deferred-census §B] — MIGRATION.md version-skip staleness.
- **DC-REC-9** [deferred-census §B] — the 5 AY W-DELTA0 stale-hash DELTAs.
- **DC-CHR-2** [deferred-census §C] — the AX W33/W25/W26/W27 formal-close residue.
- **P-3** [precepts-conformance] — the dirty `docs/precepts` submodule.
- **P-4** [precepts-conformance] — the orphan committed-evidence pngs.
- **P-5** [precepts-conformance] — CLAUDE.md §Structure custom/ doc-drift.
- **P-6** [precepts-conformance] — `proof:colocation` covers only 4 of 6 complex feature-dirs.

The seven debts (each independently HEAD-confirmed at this authoring):

1. **MIGRATION.md is anchored to a SKIPPED version lineage (DC-REC-3).** `MIGRATION.md`
   carries `> **v3.11.0 (AZ, staged)**` (`MIGRATION.md:36`), `BREAKING (3.12.0 staged)`
   (`:52`), and two `ADDITIVE (3.12.0 staged)` headers (`:56`, `:59`). The cut SKIPPED
   3.11/3.12 — those publishes were stale-lineage pre-prune out-of-band, and the
   taxonomy/metric/constellation/veil breaks ALL shipped together in the published
   **3.13.0** (FINAL §5; the registry `latest` is 3.13.0). A consumer reading MIGRATION
   sees a version map that does not match npm. The `> **v3.11.0 (AZ, staged)**` header at
   `:36` mis-anchors the dock-taxonomy break; the `:52`/`:56`/`:59` "(3.12.0 staged)"
   labels mis-anchor the metric/constellation/veil breaks.

2. **The five AY W-DELTA0 DELTAs are stale-hash, captured surfaces gone (DC-REC-9).** Four
   AY DELTAs carry `<!-- capture-commit: 83e1e3b2 -->` + a `superseded-by` header:
   `W-BLOB2-DELTA.md:3,6`, `W-CON1-DELTA.md:6`, `W-DOCK1-DELTA.md:6`, `W-DOCK2-DELTA.md:6`;
   the fifth, `W-LIVE1-DELTA.md`, is the freshness self-test carrier (it records the
   `proof:live-verified-ledger` synthetic-check probe, `:32`). All five are graced on the
   bare freshness arm, RED under `--strict-freshness`; booked to "the next tranche's Batch-0
   re-capture sweep" (FINAL §6). The AZ dock/constellation rebuilds RE-RENDERED these
   surfaces under their OWN AZ wave ids (W-RAIL3/W-DOCK-RAIL DELTAs), so the AY-pathed
   re-shoots were never done — the captured AY-form surfaces no longer exist. The census
   recommendation is RETIRE-with-rationale over re-shoot (the surface is gone, not stale).

3. **The CLAUDE.md custom/ enumeration is wrong in both directions (P-5).** `CLAUDE.md:72`
   declares "**36** custom package dirs"; disk has **33** (`ls -d src/components/custom/*/`).
   The §Structure enumeration block (`CLAUDE.md:72-117`) OMITS **five** shipped feature-dirs
   present at HEAD with full barrels + ≥2 consumers: `constellation/`, `fourier-field/`,
   `glass-panel/`, `header-ribbon/` (the four the lane named) PLUS `underline/` (the
   `<GlassUnderline>` dir minted at AZ, also absent from the enumeration — the HEAD re-grep
   widens the lane's count by one). The count is wrong AND the list omits five real dirs; a
   fresh agent routing by §Structure would not find them.

4. **`proof:colocation` freezes a 4-dir hand-list (P-6).** `scripts/proof-colocation.mjs:39-44`
   sets `TARGET_DIRS = [goo-blob, dock, tabs, constellation]` — it omits `aurora/` (a
   multi-composable WebGL feature-dir carrying `composables/` + shader assets) and
   `fourier-field/` (a `math/`/`presets`-bearing feature-dir). Two genuinely-complex
   feature-dirs escape the gate; a composable drifting to one's package root, or a missing
   README, would not RED. The convention is HONORED at HEAD (both carry READMEs) — only the
   GATE under-covers. The fix DERIVES the set: every `custom/` dir with a `composables/` or
   `shaders/` subdir, not a frozen list.

5. **The precepts submodule is dirty; the canonical idiom-home is UNTRACKED (P-3).**
   `git submodule status docs/precepts` reports `63240e67…` and the superrepo gitignore
   snapshot exposes ` m docs/precepts`. Inside the submodule, `git -C docs/precepts status
   --porcelain` reports: ` M cross-repo-dev-resolution.md`, ` M instructions/LESSONS-LEARNED.md`
   (two MODIFIED), and `?? canonical-readme-shape.md`, `?? cross-repo-dev-iteration.md`,
   `?? design-idioms.md` (three UNTRACKED). `design-idioms.md` is the file CLAUDE.md +
   `proof:colocation` + `proof:design-idiom-localization` all cite as the canonical idiom
   home — on a clean recursive clone it would be ABSENT and every cross-reference would
   404. The precept canon is not actually versioned; the prose-only `ι` integrity sweep
   missed it through two closes.

6. **The orphan committed-evidence pngs (P-4).** `.gitignore:13,16` un-ignores
   `docs/tranches/*/audit/visual/*.png` + `…/*/*.png` precisely so `proof:live-verified-ledger`
   can assert the on-disk pngs exist on a fresh CI checkout. But `git ls-files --others
   --exclude-standard 'docs/tranches/AX/audit/visual/*/*.png'` returns **26 untracked**
   files across four dirs — `W18-W40/` (12), `W36/` (8), `W44/` (2), `W46/` (4) — un-ignored
   yet never committed. Any PROGRESS/ledger row citing them resolves on THIS tree but 404s
   on a fresh clone — the exact failure class the gitignore exception was built to prevent.

7. **The AX W33/W25/W26/W27 formal-close residue (DC-CHR-2).** AX was never formally closed:
   `AX/PROGRESS.md:42-45` treats it as "a closed historical record" with W25a/W25b/W26/W27a/W27b
   + W33 still `planned` (`AX/PROGRESS.md:74-84`). The SUBSTANTIVE AX work (god-module
   carves, gate hardening) was ABSORBED downstream — `proof-no-god-module.mjs` drained the
   central rows (AZ.W-CARVE), `goo-blob/composables/` split (AY.W-COLOCATE), `proof:tag-parity`
   + `proof:no-legacy-commentary` registered (AY.W-LEG1) — so the formal close is the only
   residue. No AX FINAL.md is owed (AX is historical; the AY/AZ FINALs are the operative
   records). This RETIRES the pending rows with a one-line absorbed-by note; it does NOT
   build new work.

RE-GROUND command set (run all; confirm each debt still stands):

```
grep -n 'staged\|3\.11\|3\.12\|3\.13' MIGRATION.md                       # the version-skip anchors (DC-REC-3)
grep -rln 'superseded-by\|83e1e3b2' docs/tranches/AY/audit/visual/        # the 5 stale DELTAs (DC-REC-9)
sed -n '72p' CLAUDE.md ; ls -d src/components/custom/*/ | wc -l           # the 36-vs-33 drift (P-5)
sed -n '39,44p' scripts/proof-colocation.mjs                              # the frozen TARGET_DIRS (P-6)
git -C docs/precepts status --porcelain                                   # 2 M + 3 ?? (P-3)
git ls-files --others --exclude-standard 'docs/tranches/AX/audit/visual/*/*.png' | wc -l   # 26 orphans (P-4)
sed -n '74,84p' docs/tranches/AX/PROGRESS.md                              # the W25/26/27/W33 planned rows (DC-CHR-2)
```

## Defect table (file:line — RE-GREP at HEAD)

| # | finding | file:line | the debt |
|---|---|---|---|
| 1 | DC-REC-3 [census §B] | `MIGRATION.md:36` (`v3.11.0 (AZ, staged)`), `:52` (`BREAKING (3.12.0 staged)`), `:56`/`:59` (`ADDITIVE (3.12.0 staged)`) | the published cut SKIPPED 3.11/3.12 → 3.13.0; the version map does not match the registry |
| 2 | DC-REC-9 [census §B] | `AY/audit/visual/{W-BLOB2,W-CON1,W-DOCK1,W-DOCK2}-DELTA.md` (capture-commit `83e1e3b2` + superseded-by) + `W-LIVE1-DELTA.md:32` | 5 stale-hash DELTAs; the captured AY-form surfaces no longer exist (AZ re-rendered under its own ids) |
| 3 | P-5 [precepts] | `CLAUDE.md:72` ("36 custom") vs `ls src/components/custom/` (33); the `:72-117` enumeration omits constellation/fourier-field/glass-panel/header-ribbon/underline | the structural map a fresh agent reads first is wrong in both directions |
| 4 | P-6 [precepts] | `scripts/proof-colocation.mjs:39-44` (`TARGET_DIRS` = the frozen 4) | aurora/ + fourier-field/ (composables/shader-bearing) escape the colocation gate |
| 5 | P-3 [precepts] | `git -C docs/precepts status --porcelain` (2 M + 3 ??); superrepo snapshot ` m docs/precepts` | the canonical `design-idioms.md` is UNTRACKED in the submodule; absent on a clean clone |
| 6 | P-4 [precepts] | `docs/tranches/AX/audit/visual/{W18-W40,W36,W44,W46}/*.png` (26 un-ignored-but-untracked) | orphan evidence; resolves on this tree, 404s on a fresh CI checkout |
| 7 | DC-CHR-2 [census §C] | `AX/PROGRESS.md:74-84` (W25a/W25b/W26/W27a/W27b/W33 `planned`); the orphaned Task #139/#140 | the AX formal close is the only residue; the substantive work absorbed by AY.W-COLOCATE/W-LEG1 + AZ.W-CARVE |

## Goal criterion

The mechanical close-debt is discharged at Batch 0 — NOT accumulated to the cut — so the
BA close (Batch 7) is a verification, not a debt-flush. When this wave ends: MIGRATION.md
reads true against the published 3.13.0; the CLAUDE.md structural map matches disk and a
gate forbids it drifting again; `proof:colocation` covers every complex feature-dir by
DERIVATION; the precept canon is actually versioned and a close-lane asserts the submodule
clean; the orphan evidence is disposed (committed-if-cited, deleted-if-scratch) with an
integrity assertion against recurrence; and the five stale AY DELTAs + the AX formal-close
rows are RETIRED-with-rationale, not carried a fourth tranche.

## Scope

1. **Re-anchor MIGRATION.md to 3.13.0 (DC-REC-3).** Re-point every "(staged)" / 3.11.0 /
   3.12.0 version anchor (`MIGRATION.md:36,52,56,59`) to the published **3.13.0** and drop
   the "(staged)" qualifier — the dock-taxonomy break (`:36`), the metric `amount`→`value`
   break (`:52`), the constellation generalization (`:56`), and the Card `veil` addition
   (`:59`) ALL shipped in 3.13.0. A short note records the 3.11/3.12 lineage was a
   stale out-of-band publish the cut skipped (the FINAL §5 fact), so a consumer reading the
   map understands why no 3.11/3.12 entry exists on the registry. Mechanical, no code.

2. **RETIRE the 5 stale AY DELTAs with rationale (DC-REC-9).** For each of
   `W-BLOB2-DELTA.md`, `W-CON1-DELTA.md`, `W-DOCK1-DELTA.md`, `W-DOCK2-DELTA.md`,
   `W-LIVE1-DELTA.md`: replace the stale `capture-commit: 83e1e3b2` / `superseded-by`
   headers with a one-line RETIRED-SUPERSEDED banner naming the AZ wave that re-rendered the
   surface (the dock pair → W-DOCK-RAIL/W-RAIL3; the constellation → W-REFLECT's
   constellation surface; the blob → the AZ blob-studio re-render) and the rationale "the
   captured AY-form surface no longer exists; the AZ rebuild re-shot the equivalent under
   its own id." This is RETIRE-with-rationale (the census recommendation over re-shoot — the
   surface is GONE, a re-capture would shoot a different surface). The retirement clears the
   `--strict-freshness` RED for these five at the BA close.

3. **Re-sync the CLAUDE.md §Structure custom/ enumeration + count (P-5).** Correct
   `CLAUDE.md:72` from "36" to the true disk count (33 at HEAD) and ADD the five omitted
   feature-dirs to the §Structure enumeration with a one-line role each: `constellation/`
   (Constellation.vue + draw/field/interaction + composables/), `fourier-field/`
   (FourierField.vue + math/presets), `glass-panel/`, `header-ribbon/`, `underline/`
   (`<GlassUnderline>`). The enumeration becomes a complete map of disk.

4. **Mint `proof:claude-structure-sync` (the drift-proofing gate, P-5).** A born-RED gate
   that parses the CLAUDE.md §Structure custom/ enumeration (the dir-named lines under the
   `custom/` header) and asserts the set EQUALS `ls src/components/custom/` (excluding
   `index.ts` + `_shared`-class non-dirs), AND that the declared count matches. Born-RED at
   HEAD (36 ≠ 33, five dirs omitted); GREEN after scope 3. Registered in `package.json` +
   `scripts/gates.mjs` + the `proof:all`/parity set. This closes the silent-drift recurrence
   — the map cannot diverge from disk again without REDding the gate.

5. **Derive `proof:colocation` TARGET_DIRS (P-6).** Replace the frozen
   `TARGET_DIRS = [goo-blob, dock, tabs, constellation]` (`proof-colocation.mjs:39-44`) with
   a DERIVED set: scan `src/components/custom/*/` and include every dir that carries a
   `composables/` OR `shaders/` subdir (the complex-feature-dir signature). At HEAD this
   widens coverage to include `aurora/` + `fourier-field/` (the two escaping dirs) on top of
   the original four. The gate's existing colocation assertions (composable-at-root,
   missing-constants, missing-README) then apply to the full complex-dir set. Born-RED for
   the new coverage: a probe that a composable-at-package-root in `aurora/` REDs the gate
   (which it does not at HEAD because aurora/ is off the target list).

6. **Commit the precepts submodule + advance the pointer (P-3).** Inside `docs/precepts`:
   commit the three UNTRACKED files (`canonical-readme-shape.md`, `cross-repo-dev-iteration.md`,
   `design-idioms.md`) + the two MODIFIED files (`cross-repo-dev-resolution.md`,
   `instructions/LESSONS-LEARNED.md`); advance the superrepo submodule pointer to the new
   submodule HEAD. Add the close-lane assertion (coordinate with the BA `ι` integrity sweep
   — see Dependencies): `git -C docs/precepts status --porcelain` MUST be empty at every
   tranche close, so the prose-only walk that missed this through two closes cannot miss it
   again. (Agents NEVER git in the superrepo per the hardened agent clause — the SUBMODULE
   commit + pointer advance is an ORCHESTRATOR step the wave specs as a literal instruction;
   the agent prepares the files, the orchestrator runs the commit. See §Triumvirate +
   File Bounds note.)

7. **Dispose the orphan AX evidence pngs (P-4).** For the 26 un-ignored-but-untracked pngs
   under `AX/audit/visual/{W18-W40,W36,W44,W46}/`: the agent greps every
   `proof:live-verified-ledger` row + PROGRESS/FINAL DELTA citation for a reference to each
   path. CITED ⇒ commit (the evidence must resolve on a fresh checkout). UN-CITED (orphan
   scratch from the AX live-capture passes) ⇒ delete. Add a one-line integrity assertion (a
   clause on the existing `proof:live-verified-ledger` or a small dedicated check): every
   path matching the un-ignored visual png globs that EXISTS on disk must be
   `git ls-files`-tracked — closing the on-disk-but-untracked class mechanically. (The
   commit/delete are orchestrator git steps; the agent produces the cited-vs-scratch ledger
   + the integrity-assert source.)

8. **RETIRE the AX W33/W25/W26/W27 pending rows as absorbed (DC-CHR-2).** Edit
   `AX/PROGRESS.md:74-84` to mark W25a/W25b/W26/W27a/W27b/W33 `superseded` (NOT `planned`)
   with the one-line note "absorbed by AY.W-COLOCATE/W-LEG1 + AZ.W-CARVE; the AX formal close
   is superseded by the AY→AZ close cadence — no AX FINAL.md owed." Mark the orphaned Task
   #139/#140 superseded in the same note (they sit pending in the task ledger; this is a
   doc-only supersede record, no new work — the substantive carves already landed). This is
   the RETIRE-absorbed disposition, not a fold.

## Triumvirate Dispatch

- **File-bounds expansion that invalidates the wave**: if minting `proof:claude-structure-sync`
  (scope 4) or deriving the colocation TARGET_DIRS (scope 5) cannot parse the existing
  CLAUDE.md enumeration / `custom/` tree shape without editing a SHARED gate harness another
  Batch-0 wave writes (W-GESTALT-GATE owns the gate-manifest-sound widening; W-CARVE2 owns
  the no-god-module ratchet) — that is a scope-reveal; triumvirate (research the gate-registry
  seam + plan-augment the bound + redress), do NOT widen into another wave's gate file
  unilaterally. (The two new gates land in their OWN scripts; only the shared `gates.mjs`
  registry + `package.json` are co-touched — see Disjointness for the Batch-0 row coordination.)
- **Hard-gate failures not local-edit-recoverable**: if the derived colocation TARGET_DIRS
  surfaces a genuine colocation VIOLATION in `aurora/` or `fourier-field/` (a composable at
  the package root, a missing README) that the gate now REDs — that is a SOURCE defect, not a
  doc debt, and out of this wave's docs-only mandate. Halt and triumvirate: the structural fix
  routes to W-CARVE2 (the Batch-0 carve wave) or a named successor, not a unilateral source
  edit here.
- **Diagnostic loop halt**: if the submodule commit (scope 6) or the orphan-png cited-vs-scratch
  classification (scope 7) cannot resolve cleanly after three iterations (a submodule file with
  ambiguous provenance, a png cited by a ledger row that itself looks stale), halt and
  triumvirate — the integrity-sweep precept seam is the suspect, not a value to loop on.

## File Bounds

| File | Access |
|---|---|
| `MIGRATION.md` | modify (re-anchor the version headers to 3.13.0; drop "(staged)") |
| `docs/tranches/AY/audit/visual/W-BLOB2-DELTA.md` | modify (RETIRED-SUPERSEDED banner) |
| `docs/tranches/AY/audit/visual/W-CON1-DELTA.md` | modify (RETIRED-SUPERSEDED banner) |
| `docs/tranches/AY/audit/visual/W-DOCK1-DELTA.md` | modify (RETIRED-SUPERSEDED banner) |
| `docs/tranches/AY/audit/visual/W-DOCK2-DELTA.md` | modify (RETIRED-SUPERSEDED banner) |
| `docs/tranches/AY/audit/visual/W-LIVE1-DELTA.md` | modify (RETIRED-SUPERSEDED banner) |
| `CLAUDE.md` | modify (the §Structure custom/ enumeration + count re-sync) |
| `scripts/proof-claude-structure-sync.mjs` | create (the born-RED sync gate) |
| `scripts/proof-colocation.mjs` | modify (derive TARGET_DIRS off composables/shaders subdir presence) |
| `scripts/gates.mjs` | modify (register `proof:claude-structure-sync` in the gate registry) |
| `package.json` | modify (register `proof:claude-structure-sync` + add to `proof:all`/parity) |
| `docs/tranches/AX/PROGRESS.md` | modify (W25/26/27/W33 rows → `superseded`-absorbed) |
| `docs/precepts/canonical-readme-shape.md` | create-track (submodule — commit the untracked file) |
| `docs/precepts/cross-repo-dev-iteration.md` | create-track (submodule — commit the untracked file) |
| `docs/precepts/design-idioms.md` | create-track (submodule — commit the untracked file) |
| `docs/precepts/cross-repo-dev-resolution.md` | modify-track (submodule — commit the modification) |
| `docs/precepts/instructions/LESSONS-LEARNED.md` | modify-track (submodule — commit the modification) |
| `docs/tranches/AX/audit/visual/{W18-W40,W36,W44,W46}/*.png` | commit-if-cited \| delete-if-scratch (orchestrator git; 26 files) |

**Submodule + git note (the hardened agent clause)**: agents NEVER stage/commit/checkout in
the superrepo or the submodule. Scope 6 (the submodule commit + pointer advance) and the
orphan-png commit/delete in scope 7 are ORCHESTRATOR steps. The agent prepares the content
(the submodule files are already on disk; the png cited-vs-scratch ledger names which to
commit vs delete) and the orchestrator runs the index operations. The wave specs them as
literal instructions so the orchestrator executes deterministically.

Do NOT touch:
- **`scripts/proof-gate-manifest-sound.mjs` + the `:5175`/`:5173` live-gate defaults** —
  W-GESTALT-GATE (Batch 0, parallel) owns the gate-hygiene port sweep + the manifest-sound
  widening (the deferred-census CHR-1 + DC-CHR-1 items). This wave does NOT touch the port
  defaults or the manifest-sound regex.
- **`scripts/proof-no-god-module.mjs` + the typography/constellation carve** — W-CARVE2
  (Batch 0, parallel) owns the god-module ratchet drain (DC-REC-1/2; P-2). This wave's
  CLAUDE.md edit touches the §Structure enumeration ONLY, never the no-god-module bound.
- **`demo/layout/{BottomDock,SidebarDock}.vue` + the railContext guard** — W-SHELL-HOLD
  (Batch 0, parallel) owns the shell-hold fix.
- **Any `src/` source file** — this is a docs+gates+submodule wave. The colocation gate
  derivation (scope 5) reads the `custom/` tree but edits NO component source; if it surfaces
  a real source colocation violation, that triggers the triumvirate (out of bounds).
- **The standing fences**: GL shader internals (aurora.frag/metaball.frag) unless a wave
  names them (none here); ppmycota purple (the W-SUFFUSE2 motion violet stays demo-local —
  not in scope); the slides `docs/tranches/M/` foreign docs (re-stamped at W-CLOSE, never
  edited here); the ~28 DISPOSITION-REGISTER ≥2-consumer BOOKs (held by design, L inv-8 —
  re-stamped at W-CLOSE, not folded here).

### Disjointness

Single agent; no intra-wave path contention. Across Batch 0 (`W-SHELL-HOLD ‖ W-GESTALT-GATE
‖ W-HYGIENE ‖ W-CARVE2`): the only co-touched files are the SHARED gate-registry pair
`scripts/gates.mjs` + `package.json` — both W-GESTALT-GATE (its `proof:ba-gestalt` registration)
and this wave (its `proof:claude-structure-sync` registration) ADD a row. This is the standard
gate-registration coordination seam: the two waves add DISJOINT rows (different gate ids,
different append points), and the orchestrator sequences the two registration commits or lands
them on a shared clean main before parallelizing (per WAVE_SPEC §4b — commit before
parallelizing so all agents share clean main). No two units WRITE the same gate row. Every
other file bound in this wave (MIGRATION, the 5 AY DELTAs, CLAUDE.md §Structure, the two new
gate scripts, `proof-colocation.mjs`, AX/PROGRESS, the submodule files, the orphan pngs) is
touched by NO other Batch-0 wave — verified against the EXECUTION-DAG §1 + §3 write bounds
(W-SHELL-HOLD = the shell docks; W-GESTALT-GATE = the gate ports + manifest-sound; W-CARVE2 =
typography/constellation carve + the no-god-module ratchet).

### Worktree Plan

Single agent — no sibling worktree needed. The wave runs on the shared Batch-0 main after the
orchestrator lands the two parallel-sibling gate registrations on a clean base (or sequences
the `gates.mjs`/`package.json` registration commits). The submodule commit + pointer advance +
orphan-png disposition are orchestrator index steps post-agent.

## Agent Units

### BA.W-HYGIENE.1 the close-debt document sweep + the two drift-proofing gates

- Goal: MIGRATION reads true against 3.13.0, the CLAUDE.md map matches disk under a gate, the
  colocation gate covers every complex feature-dir by derivation, and the AY-DELTA/AX-pending
  debt rows are RETIRED-with-rationale — all in ONE coherent docs+gates unit.
- Mechanism: scope 1 (MIGRATION re-anchor) + scope 2 (5 AY DELTA retirements) + scope 3
  (CLAUDE.md §Structure re-sync) + scope 4 (`proof:claude-structure-sync` born-RED→GREEN) +
  scope 5 (colocation TARGET_DIRS derived) + scope 8 (AX PROGRESS rows superseded). The agent
  drives the two new gates born-RED (proving they fail at HEAD pre-edit) then GREEN, and
  prepares the submodule files + orphan-png cited-vs-scratch ledger (scopes 6, 7) for the
  orchestrator index steps.
- Files: every `modify`/`create` row in File Bounds (the docs + the two gate scripts +
  `proof-colocation.mjs` + the registry pair); the submodule files are prepared-not-committed;
  the orphan-png ledger is authored, the git disposition is the orchestrator's.
- Sub-gate: `proof:claude-structure-sync` born-RED at HEAD (36 ≠ 33, five dirs omitted),
  GREEN after the §Structure re-sync; `proof:colocation` GREEN with the derived TARGET_DIRS
  covering aurora/ + fourier-field/ (the source-assert that a composable-at-root in aurora/
  would now RED); `grep -n 'staged' MIGRATION.md` returns ZERO; the five AY DELTAs each carry
  a RETIRED-SUPERSEDED banner and no `superseded-by`/`83e1e3b2` stale header; AX/PROGRESS
  W25/26/27/W33 rows read `superseded`, not `planned`; the orchestrator's clean-tree sweep
  (submodule porcelain empty, zero un-ignored-but-untracked visual pngs) passes.

## Hard Gate

This is a DOCS+GATES+SUBMODULE wave, NOT a visual wave — there is no `/route` π readback and
no `proof:ba-gestalt` verdict (BA invariant 4 binds visual waves; this wave renders no surface).
The completion criterion is born-RED falsifiable witnesses + a clean-tree integrity sweep:

1. **`proof:claude-structure-sync` born-RED→GREEN.** The gate parses the CLAUDE.md §Structure
   custom/ enumeration and asserts the dir set EQUALS `ls src/components/custom/` (minus
   `index.ts`) AND the declared count matches. RED at HEAD: the assert log shows the symmetric
   difference `{constellation, fourier-field, glass-panel, header-ribbon, underline}` present
   on disk + absent from the doc, and `36 ≠ 33`. GREEN at close: empty symmetric difference,
   count = 33. The gate is registered in `gates.mjs` + `package.json` + the `proof:all`/parity
   set (verified by `npm run proof:gate-script-parity`). **Bite-tightening (anti-evasion)**:
   the gate asserts SET EQUALITY both directions — adding the five dirs to the doc without
   correcting the count, OR correcting the count while a future dir is added to disk
   un-enumerated, both RED. It does NOT match a literal "33" string (a dir add/remove must
   re-sync the count, not green a frozen number).

2. **`proof:colocation` derived-coverage, born-RED.** A probe asserts the gate's complex-dir
   set is DERIVED (every `custom/` dir with `composables/` or `shaders/`), not a frozen
   4-element list. RED at HEAD: `aurora/` carries `composables/` + shader assets but is ABSENT
   from `TARGET_DIRS` (`proof-colocation.mjs:39-44`), so a composable drifted to `aurora/`'s
   package root would NOT RED the gate. GREEN at close: `aurora/` + `fourier-field/` are in the
   covered set (the derivation includes them), and the negative-predicate self-test (a synthetic
   composable-at-root in a covered dir REDs) holds. **Bite-tightening**: the assert checks the
   DERIVATION mechanism (the gate scans the tree), not a hardcoded `[…aurora, fourier-field]`
   re-list — a future complex dir gains coverage automatically; a hand-extended frozen list
   would pass a naive count check but fail the derivation assert.

3. **MIGRATION.md version-truth.** `grep -n 'staged' MIGRATION.md` returns ZERO; the dock-taxonomy
   / metric / constellation / veil break headers each resolve to **3.13.0** (the published cut);
   a one-line note records the skipped 3.11/3.12 lineage. RED at HEAD: four "(staged)" matches at
   `:36,52,56,59`.

4. **The 5 AY DELTAs RETIRED-with-rationale.** Each of W-BLOB2/W-CON1/W-DOCK1/W-DOCK2/W-LIVE1
   DELTA carries a RETIRED-SUPERSEDED banner naming the AZ wave that re-rendered the surface; no
   `capture-commit: 83e1e3b2` / `superseded-by` stale header survives. RED at HEAD: four carry the
   `83e1e3b2` capture-commit + superseded-by, RED under `--strict-freshness`. The retirement
   clears the strict-freshness RED for the five at the BA close.

5. **The AX W25/26/27/W33 rows RETIRED-absorbed.** `AX/PROGRESS.md` W25a/W25b/W26/W27a/W27b/W33
   read `superseded` with the absorbed-by note; Task #139/#140 marked superseded. RED at HEAD:
   `:74-84` read `planned`.

6. **The clean-tree integrity sweep (orchestrator-verified).** Post-disposition: (a)
   `git -C docs/precepts status --porcelain` is EMPTY (the three untracked + two modified
   precept files committed; the superrepo pointer advanced) — the `design-idioms.md` canon is
   versioned, resolving on a fresh recursive clone; (b)
   `git ls-files --others --exclude-standard 'docs/tranches/AX/audit/visual/*/*.png'` returns
   ZERO (every orphan committed-if-cited or deleted-if-scratch); (c) the integrity assertion
   (every on-disk un-ignored visual png is `git ls-files`-tracked) holds, closing the
   on-disk-but-untracked class. RED at HEAD: 2 M + 3 ?? in the submodule; 26 untracked pngs.

All six are device-free (no live server, no π capture) — this wave's truth is source/document/
index state, not a rendered surface. `npm run proof:all` (or the BA gate battery) green on a
clean runner with the two new gates registered is the close evidence.

## Format And Lint Cadence

`node scripts/proof-claude-structure-sync.mjs` born-RED before the CLAUDE.md edit (proof it
fails at HEAD), GREEN at close; `node scripts/proof-colocation.mjs` GREEN with the derived
TARGET_DIRS; `npm run proof:gate-script-parity` after the `package.json`/`gates.mjs`
registration (the new gate appears in every parity set); `git diff --check` before close
(whitespace/conflict-marker clean across the doc edits); the repository markdown checks on the
edited docs. No formatter is skipped. The submodule commit + pointer advance + orphan-png
disposition are orchestrator index steps verified by the §Hard-Gate clean-tree sweep.

## Verification Artefacts

- `proof:claude-structure-sync` JSON artefact — the born-RED log (the symmetric-difference set
  + the 36-vs-33 count) + the GREEN-at-close log.
- `proof:colocation` JSON artefact — the derived TARGET_DIRS set (showing aurora/ + fourier-field/
  now covered) + the negative-predicate self-test result.
- The orphan-png cited-vs-scratch ledger (authored by the agent; the path-by-path commit/delete
  disposition the orchestrator executed).
- The submodule commit hash + the advanced superrepo pointer (orchestrator commit).
- `git -C docs/precepts status --porcelain` empty + the `git ls-files --others` visual-png
  zero-count, captured at close.
- The `proof:gate-script-parity` output post-registration.

## Commit Plan

- doc commit: `docs(hygiene): re-anchor MIGRATION to 3.13.0, re-sync CLAUDE.md custom/ map, RETIRE the 5 AY DELTAs + AX W25/26/27/W33 rows (BA.W-HYGIENE)` — names the seven debts in the body.
- gate commit: `test(hygiene): proof:claude-structure-sync born-RED→GREEN + colocation TARGET_DIRS derived + parity registration`.
- submodule commit (orchestrator): inside `docs/precepts` — `chore(precepts): commit the untracked idiom-home + dev-resolution + readme-shape precepts; advance the superrepo pointer`; the superrepo pointer-advance commit references it.
- evidence commit (orchestrator): `chore(hygiene): dispose the orphan AX evidence pngs (commit-cited / delete-scratch) + the on-disk-tracked integrity assert`.
- status commit: the PROGRESS row + the verification-artefact paths.

## Dependencies

- **Depends on**: nothing structurally (Batch 0, disjoint bounds). The submodule clean-tree
  assertion (scope 6) COORDINATES with the BA `ι` integrity-sweep close lane — this wave LANDS
  the submodule commit + pointer advance early (so the canon is versioned for the whole tranche),
  and the close `ι` lane gains the explicit `git -C docs/precepts status --porcelain` empty
  assertion this wave specs. The gate-registry append (scope 4) coordinates with W-GESTALT-GATE's
  own `proof:ba-gestalt` registration on the shared `gates.mjs`/`package.json` — disjoint rows,
  orchestrator-sequenced (see Disjointness).
- **Blocks**: the BA close (W-CLOSE, Batch 7) inherits a discharged debt ledger — MIGRATION is
  already reconciled, the structure map is gate-locked, the AY/AX pending rows are retired, the
  submodule is clean. W-CLOSE's MIGRATION-carries-every-clean-break step (the disco retirement,
  tone recompose, scroll-fade retirement) appends to the now-true 3.13.0-anchored base rather
  than first correcting the stale 3.11/3.12 lineage. The `proof:claude-structure-sync` gate
  guards every later wave that adds a `custom/` dir (W-FADING-SCROLL's `fading-scroll/`,
  W-ICON-CHIP's potential `icon-chip/`) — they must enumerate it in CLAUDE.md or RED.

## Archaeology

Prior attempt: the AY and AZ closes both ran a prose-only `ι` integrity sweep that walked
`git log --since=<open> -- 'docs/precepts/'` for unexpected precept changes — and BOTH missed
the uncommitted/untracked precept files (the canonical `design-idioms.md` has been UNTRACKED in
the submodule across two closes; P-3). The AX close left 26 generated visual pngs uncommitted
(P-4) and never formally closed via W33 (DC-CHR-2). The MIGRATION version-skip (DC-REC-3) and
the AY-DELTA stale-hash carry (DC-REC-9) are debts that accumulated TO each close rather than
being swept early. The new guardrail: BA sweeps the mechanical close-debt at Batch 0 (the
EXECUTION-DAG §1 rationale — "the AZ close surfaced ~25 latent defects precisely because debt
accumulated to the cut"), and TWO new gates (`proof:claude-structure-sync` + the colocation
derivation) plus a structural clean-tree assertion (submodule-porcelain-empty +
on-disk-png-tracked) replace the prose-only walk that missed these through two closes — the
debt cannot silently re-accumulate by construction.
