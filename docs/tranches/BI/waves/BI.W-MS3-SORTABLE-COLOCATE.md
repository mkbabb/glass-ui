# BI.W-MS3-SORTABLE-COLOCATE — colocate the internal sortable composable to its single owner

Band B9 MOVE-STAGE, wave MS3. Realizes ADDENDA §2 `BI.W-S-COMPOSABLE-COLOCATE` 1:1 (sortable ONLY —
coalesceMetric moved in MS2). Device-free (`H`), paint-neutral.

## §Provenance

- STRUCTURE-ADDENDA §2 MOVE-STAGE `MS3 · BI.W-S-COMPOSABLE-COLOCATE` (R5 lands as: only the 2 INTERNAL
  no-owner composable subdirs move — context→shared in MS2, sortable→its single owner here; the 8
  published composable subpaths CANNOT colocate — USER-FLAG #2).
- Pass-3 convergence: registry-v3 §1 (composables-impossibility HOLDS, 7/11). Source path CORRECTED
  (S2C3-H1): the folded composable lives at `src/composables/sortable/`, not `components/custom` — the
  draft's MS3 source tree was garbled.

## §Scope

Move `src/composables/sortable/` (8 files) → `src/components/custom/sortable-list/`:
- `dragController`, `dropResolver`, `ghostRenderer`, `index`, `touchGate`, `transitionTiming`, `types`,
  `useSortable`.
- Single owner; `sortable-list/index.ts:7` already re-exports `useSortableContext`.
- At MS3-time components are still `ui/custom` (flatten is MS4) → target is `custom/sortable-list/`.
- sortable ONLY — coalesceMetric moved in MS2 (AD4 edge removed from this wave).

## §Repair manifest

- `mv` the 8 sortable files into `custom/sortable-list/`; repoint every `@glass/composables/sortable`
  importer to the colocated home.
- Re-locate importers by symbol at codemod time.

## §Acceptance

Durable invariants:
- build green.
- 0 `@glass/composables/sortable` specifiers survive.

## §Edges

- `← W-WORKTREE-GC completion` (MS0, user-gated).
- MS1.
- QUIESCE-TREE.

## §π

None.
