# BI.W-MIGRATION-TRUE-UP — the /api re-home table regenerated from disk + gate-locked

Band B0 (doc-truth cut-blocker). Born-RED at HEAD.

## Mandate

- **FAM-16 DOC-1 [P1]**: MIGRATION.md's binding 203-symbol `/api` re-home table points 3 rows at the DELETED `/paper-grid` subpath under pre-rename symbol names (`MIGRATION.md:209-211` — `PaperGridConfig`/`PaperGridHandle`/`UsePaperGridOptions` → `/paper-grid`), self-contradicted within the SAME 5.0.0 section (line 303 renames `PaperGrid`→`LiquidGrid`, `/paper-grid`→`/liquid-grid`). Disposition: regenerate the table from disk + a gate clause (every target subpath resolves, every symbol exports).

## Design

MIGRATION.md's `/api` table is BINDING — a consumer follows it symbol-by-symbol at the 5.0.0 cut. `/paper-grid` is gone from `package.json` exports (only `/liquid-grid` survives), so the 3 `PaperGrid*` rows route a consumer to a non-existent subpath. The lie is structural, not stylistic: it self-contradicts within the same section.

Cure: regenerate the 203-symbol table from DISK — for each `/api` symbol, resolve its OWNING subpath by scanning the actual barrel exports (`src/components/custom/*/index.ts`, `src/composables/**`, the subpath mirrors) so the target column is disk-truth, and gate-lock it so a future rename can never leave a dangling row. The regen picks up: `PaperGrid*` → `/liquid-grid` (the BG.W-GRID-AFFINE rename), and — cross-gate with `BI.W-BLOB-RENAME-LAND` — any `/goo-blob`→`/blob` symbol re-home.

Clean: the table is disk-following, not hand-maintained; the gate is the standing anti-drift lock.

## Work

- `MIGRATION.md:42-260` (the 203-symbol `/api` table) — regenerate from disk: `PaperGridConfig`/`PaperGridHandle`/`UsePaperGridOptions` re-target `/liquid-grid` (lines 209-211); every other row verified against its owning barrel. Reconcile the `TimelineSegment*` rows (`/timeline`, exports verified at `src/components/custom/timeline/index.ts`) + the `AuroraConfig`/`DEFAULT_AURORA_CONFIG` rows (`/aurora`).
- `scripts/proof-migration-truth.mjs` (new gate, device-free, `local`+`ci`) — parse the `/api` table; for every row assert (a) the target subpath is a live `package.json` export key AND (b) the named symbol is exported by that subpath's barrel on disk. RED any dangling target or missing symbol.
- `package.json` scripts + `gates.manifest.mjs` — register `proof:migration-truth` (`local`+`ci`).

## Acceptance

Gate: **`proof:migration-truth`** (new) — GREEN at close (BORN-RED at HEAD: 3 `PaperGrid*` rows target the dropped `/paper-grid`).

Clauses:
- M1 every `/api` table target subpath is a live `package.json` export key.
- M2 every `/api` table symbol is exported by its target subpath's barrel on disk.
- M3 no row targets a dropped/renamed subpath (`/paper-grid`, `/goo-blob` — dangling).
- Self-test bite: a synthetic table row targeting `/paper-grid` REDs M1/M3; a row naming a symbol its subpath does not export REDs M2.

## π/DELTA

None — device-free doc-truth gate; zero pixel change.

## Obligations

- **Cross-gate**: shares the disk-following discipline with `BI.W-BLOB-RENAME-LAND` (W4 — the `/goo-blob`→`/blob` reconcile) and reads the same export truth `proof:subpath-enumeration` owns. Sequenced after the blob rename so the `/blob` rows resolve.

## Dispositions

None (single FAM-16 row, fully discharged). DOC-3 (the `src/subpaths/`+`src/entries/` "landed" lie) is a STRUCTURE-band (B9) doc reconcile — NOT this wave (orphan to the structure band).
