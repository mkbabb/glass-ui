# BI.W-MS6-SUBPATHS-DISSOLVE — rm src/subpaths/, swap vite to libraryEntryMap, repoint every consumer

Band B9 MOVE-STAGE, wave MS6. Realizes ADDENDA §2 `BI.W-S-SUBPATHS-DISSOLVE` 1:1 (F4-surgical). The
AMBER MS6 hard-block is CLEARED (border-progress + scrolling-text retired). Device-free (`H`),
paint-neutral.

## §Provenance

- STRUCTURE-ADDENDA §2 MOVE-STAGE `MS6 · BI.W-S-SUBPATHS-DISSOLVE` (F4-surgical dissolve; AY-REPOINT-
  FIRST; the full test+demo consumer repoint per S2C2-hit2) + §5.1.
- Pass-3 convergence: registry-v3 §1/§2 (AMBER→GREEN: the MS6 HARD-BLOCK CLEARED — `./border-progress`
  + `./scrolling-text` retired by B8, both ABSENT @f89e3a9d, P3C3-confirmed) + §3 (the 32 test-line list
  is EXACT; the FINAL 82-key set, not 85).

## §Scope

- `rm src/subpaths/` (~67 remaining one-line mirror barrels).
- Swap vite → `libraryEntryMap` (`@glass = src`, vite.config.ts:22). The MOVER→GENERATOR flip landed in
  MS4; this wave removes the now-dead source dir + repoints all consumers + clears `dist/subpaths/`.
- Repoint EVERY `@glass/subpaths/*` importer BEFORE the `rm` (AY-REPOINT-FIRST), each per-entry to the
  flat source (aurora → `@glass/components/aurora`, dom → `@glass/composables/dom`, …).
- `libraryEntryMap` regenerates exports/typesVersions — **it MUST read the FINAL 82-key set** (not 85;
  border-progress + scrolling-text + virtual already retired at f89e3a9d — the HARD-BLOCK is CLEARED) or
  it re-mints a retired subpath, breaking CUT-WINDOW + EXACT_REPRODUCTION.

## §Repair manifest

The FULL consumer set (S2C2-hit2 CORRECTED — the draft enumerated only the 5 demo imports and STRANDED
the tests):
- **5 demo** `@glass/subpaths/*` imports — repoint per-entry to the flat source.
- **32 TEST import lines across 3 files** (baseline @f89e3a9d; ±drift is B68/B8-volatile → MS1 recompute
  pins the final list):
  - `tests/public-surface.spec.ts` — **23** (this file IS the EXACT_REPRODUCTION / cut-window guard, so
    it MUST repoint or MS6 strands its own guard),
  - `tests/components.smoke.spec.ts` — **8**,
  - `tests/composables.smoke.spec.ts` — **1**.
  No wave previously owned these; MS6 owns them.

## §Acceptance

Durable invariants:
- CUT-WINDOW absence — 9 folded + 4 Tabs* + border-progress / scrolling-text ABSENT.
- EXACT_REPRODUCTION.
- `differential resolves-on-disk`.
- NO `dist/subpaths/*.js` (the vite swap lands here).
- 0 `@glass/subpaths/*` specifiers survive (src + demo + tests).
- build + `proof:consumers:static` green.

## §Edges

- `← W-WORKTREE-GC completion` (MS0, user-gated).
- MS4, MS5.
- ALL B8 export-mutating waves — BORDER-PROGRESS-RETIRE, SPEEDTEST-ONLY-PAIR, VIZ-DELETIONS
  (all LANDED @f89e3a9d).
- QUIESCE-TREE.

## §π

None.
