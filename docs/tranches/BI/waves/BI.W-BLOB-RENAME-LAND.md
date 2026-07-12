# BI.W-BLOB-RENAME-LAND — execute goo-blob→blob + file the value.js carry-ask

Band B0 (cut-blocker). Born-RED at HEAD.

## Mandate

- **FAM-1** goo-blob→blob rename UNEXECUTED ✔: the dir + exports are still `goo-blob`; `MIGRATION.md §262` documents it as landed (a clean-break `<GooBlob>`→`<Blob>` + `/goo-blob`→`/blob`). The guide LIES to consumers (incl. the value.js re-point). Disposition: W-BLOB-RENAME-LAND (or revert the doc).
- **H-3**: the rename rode ruled-DONE + cursor-DONE + MIGRATION §262-landed BH.B2→cut while disk is unchanged — a green-over-broken carried across the close.
- **XR-4**: the rename is NOT consumer-free — value.js's demo carries 5 live `goo-blob` imports (file-linked, tracks HEAD), so the rename lands a break the moment it executes.

## Design

DECIDE: **LAND the rename** (not revert the doc). MIGRATION §262 records it as "the owner-ratified full rename" — reverting would contradict the owner ratification, and the no-backwards-compat law forbids an alias. XR-4 disposition (a): land the rename + file the value.js-demo carry-ask in the SAME wave.

The rename is a clean break, no alias:
- component `<GooBlob>` → `<Blob>`; the `custom/goo-blob/` dir → `custom/blob/` (colocation-preserving); the `@mkbabb/glass-ui/goo-blob` subpath → `@mkbabb/glass-ui/blob`; the `BLOB_CONFIG_KEY`/`BLOB_CONFIG_DEFAULTS`/`BlobConfig` symbol names are ALREADY blob-prefixed (only the dir/subpath/component rename).
- exports regen is disk-following, so the `package.json` `"./goo-blob"` key becomes `"./blob"` mechanically once the dir moves; no `"./goo-blob"` alias key survives.
- The render is byte-identical (a rename, not a re-tune) — the metaball shader + `useMetaballRenderer` are untouched.

The value.js demo (5 sites: `useAtmosphere.ts:35`, `BlobPane.vue:12-13`, `HeroBlob.vue:62-63`) is a FOREIGN tree (`file:../glass-ui` link → breaks at HEAD the instant the rename lands). Per the foreign-tree fence (inv-26) glass-ui edits ZERO sibling files — this wave FILES the by-name carry-ask onto the BI crossrepo roster; `BI.W-PRECUT-XR-ASKS` gate-locks the roster completeness.

## Work

- `src/components/custom/goo-blob/` → `src/components/custom/blob/` (git mv the dir; rename `GooBlob.vue`→`Blob.vue`, update the barrel `index.ts` export `GooBlob`→`Blob`).
- All in-repo importers of `custom/goo-blob` / `@mkbabb/glass-ui/goo-blob` (demo stories, `custom/index.ts` barrel, any subpath mirror in `src/subpaths/`) re-point to `blob`.
- `package.json` exports — regen (`"./goo-blob"` → `"./blob"`; NO alias key).
- gate/reader references keyed to the dir/subpath name (`proof:aur-kuwahara` grep-lock uses `mediums.glsl.ts` not the blob dir; sweep `proof:blob-*`, `proof:colocation`, `proof:claude-structure-sync` for `goo-blob` string literals → `blob`).
- `MIGRATION.md §262` — reconcile the tense (it now describes an EXECUTED rename; the "NOT done here" swap-note deleted).
- Cross-repo: file the value.js-demo carry-ask (5 sites → `/blob` + kf `^5.2.0`/value `^3.1.0` peer bump) onto `docs/tranches/BI/coordination/asks-and-consumes.md` (created by `BI.W-PRECUT-XR-ASKS`; this wave adds the `W-BLOB-RENAME-LAND` row).

## Acceptance

Gate: **`proof:blob-rename`** (new, device-free, `local`+`ci`) — GREEN at close (BORN-RED at HEAD: dir + `"./goo-blob"` present, MIGRATION §262 claims landed).

Clauses:
- W1 dir DEFINITION-ABSENT at `custom/goo-blob/` AND present at `custom/blob/`; `Blob.vue` exists, `GooBlob.vue` absent.
- W2 `package.json` exports carries `"./blob"` AND NOT `"./goo-blob"` (no alias key).
- W3 zero in-repo `goo-blob` import specifier / `<GooBlob>` tag survives (the clean break).
- W4 MIGRATION §262 tense matches disk (EXECUTED) — reconciled by `BI.W-MIGRATION-TRUE-UP`'s disk-following check (cross-gate).
- W5 the value.js carry-ask row exists on the BI roster (asserted by `proof:crossrepo-asks:bi`, cross-gate).
- Self-test bite: a synthetic surviving `"./goo-blob"` export key OR a re-added `GooBlob` re-export REDs.

## π/DELTA

**Regression-only.** The `<Blob>` render is byte-identical to the prior `<GooBlob>` (a rename). The existing blob π (`tests-visual/goo-redress.spec.ts` / `proof:blob-live-truth`) re-points to `/blob` and must read IDENTICAL silhouette+chroma before/after — no new capture, a re-point + un-regressed pass. Engines: as the existing blob π already runs; both modes.

## Obligations

- **Cross-repo ask (foreign-tree fence)**: value.js demo 5-site `goo-blob`→`blob` + peer bump. glass-ui files the ask row; the value.js repo owns the edit.
- **Sequencing**: precedes `BI.W-BUDGET-REBASELINE` (the chunk key `goo-blob.js`→`blob.js` changes the bundle set).

## Dispositions

- Terminalizes **H-3** (goo-blob→blob DONE-but-UNEXECUTED) — LAND, no re-book. The MIGRATION §262 lie is closed at execution, not carried.
