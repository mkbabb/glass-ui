# BH cross-repo asks + consumes (the 5.0.0 break relay)

The foreign-tree fence is literal: glass-ui edits ZERO sibling files. Every break is a by-name ask; the sibling owns its own edit. This roster is authored now and the asks issue at the 5.0.0 cut, after B2.2 lands and the export diff is final.

## The 5.0.0 export break, exactly

One dropped key — **`./api`** — and its 203 symbols re-home onto their owning subpaths (200 pure import-path swaps; 3 orphans add an export: `Surface`→/card, `MenuItemVariants`→/command, `ControlSize`→/forms). Every other published key is preserved (regen reproduces 96/96 keys; `./api` is the only intentional drop). The flat-barrel relocations (B2.3) and the `src/subpaths/` delete (B2.1) are key-preserving and carry no consumer break.

## Asks (the complete 5.0.0-BH-B7 by-name migration roster — grepped read-only across the constellation)

The roster is **exactly 4 by-name asks** — the two `/api` re-homes (rows 1-2) plus the two non-`/api` break vectors the 5.0.0 cut carries (row 3 the `--ring`→`--focus-ring-color` rename, row 4 the `--glass-blur-dock` token-retire). The gate `proof:crossrepo-asks:bh` derives the expected set by SOURCE-DOC AUTO-SCAN (`consumer-constellation.md`'s By-name ask ledger row-filter `lands == 5.0.0-BH-B7 AND is-a-by-name-migration-ask` → {aurora, timeline, ring} ∪ the bbnf id auto-scanned from `bg-build-map §G7 U1`) — NOT a hand-list count — and asserts the roster covers all four.

| # | Sibling | Import / usage site | Symbols / tokens | New home | Lands | Ask | Primary witness |
|---|---|---|---|---|---|---|---|
| 1 | **muster** | `frontend/src/composables/useAuroraConfig.ts:47` | `DEFAULT_AURORA_CONFIG`, `AuroraConfig` | `@mkbabb/glass-ui/aurora` | 5.0.0-BH-B7 | `migrate-api-to-aurora` — one-line re-point | `proof:crossrepo-asks:bh` |
| 2 | **speedtest** | `src/features/speedtest/ui/PhaseTimeline.vue:52` | `TimelineSegment` (type) | `@mkbabb/glass-ui/timeline` | 5.0.0-BH-B7 | `migrate-api-to-timeline` — one-line re-point **+** drop the dead `vite.config.mjs:1033` optimizeDeps `@mkbabb/glass-ui/api` string in the same ask | `proof:crossrepo-asks:bh` |
| 3 | **atlas** | `--ring` bare token (12 bare / 11 files; GU-3-TRIAGE ASK-B, an explicit BH ACTION) | `--ring` → `--focus-ring-color` | rename (no alias — clean break) | 5.0.0-BH-B7 | `migrate-ring-to-focus-ring-color` — token rename, no back-compat alias | `proof:crossrepo-asks:bh` |
| 4 | **bbnf-buddy** | `bbnf-buddy/src/styles/preset.css:230` (live `--glass-blur-dock`) | `--glass-blur-dock` (token-retire) | no-op retune (the retired token resolves to its composed default) | 5.0.0-BH-B7 | `bbnf-glass-blur-dock-retune-no-op` — drop the dead override | MIGRATION.md `--glass-blur-dock` retire ROW + `proof:crossrepo-asks:bh` `>=4` covered-floor |

No other sibling imports `/api`. The renamed/at-risk subpaths `/canvas`, `/motion-curves`, `/fourier-math` have zero live source consumers and are name≠dir internal renames (key unchanged) — no ask owed. **Row-filter EXCLUDES** the 4.4.0-line rows (`glass-key-fill` GU-1, `StatusDot forced-colors` GU-3-ASK-A) + the WS2 no-engine `drop-overflow-scroll` consume (not 5.0.0-BH-B7 by-name migration asks).

**The row-4 asymmetry + the ruling #3 re-base (recorded).** Row 4's source is a PROSE anchor (`bg-build-map §G7 U1`), a token-retire not an `/api` drop. Its born-RED witness is **re-based per ruling #3**: the original spec named `proof:retired-token-consumers` (BG-owned), but that sibling-probe gate is **KILLED** (`BG.W-CLOSEFIX-9SITE` stripped to `BG.W-DOCK-BLUR-RETIRE-CARVE` — a `[local]`-only sibling raw-grep of `$BBNF/src` ran the inv-26 foreign-tree fence backwards into a coupling, and could not fire in the siblings-absent `--run full` close it claimed to guard). The row-4 witness is now the **MIGRATION.md `--glass-blur-dock` retire ROW + `proof:crossrepo-asks:bh` `>=4` covered-floor** — a purely in-repo witness pair; the sibling resolves the built `dist/` on its own bump (contract-v2 — no glass-ui gate probes the sibling). `proof:crossrepo-asks:bh` asserts the roster RECORDS the id + covers the covered-floor; it never probes a sibling tree.

## Census (live consumers — keys preserved; the one non-`/api` token-retire ask noted)

- **bbnf-buddy** — /dock, /sortable-list, /dark, /toggle-chip, /tabs, /controls. Zero /api (every subpath key preserved), but carries the row-4 `--glass-blur-dock` token-retire ask (`preset.css:230` live override — its `bbnf-glass-blur-dock-retune-no-op` ask above, witnessed by the MIGRATION.md `--glass-blur-dock` retire ROW + `proof:crossrepo-asks:bh` `>=4` covered-floor; the killed `proof:retired-token-consumers` re-based per ruling #3).
- **slides-K** — /deck, /dock, /controls, /button, /forms, /separator, /popover, /dialog. Zero /api. Every key preserved, no ask.

## Unowned-seam cross-reference

- **BG-WS5 owns the viz-subpath migration** (`/constellation`, `/fourier-field`) with **slides** as the named consumer. Both keys are present today; if WS5 deletes/renames either, the slides migration is BG-WS5's, not BH-B7's. The post-WS12 export-delta surfaces any key drop. Confirm BG-WS5 carries it.

## Disposition notes (no ask)

- **`words/frontend/glass-ui/`** is a vendored d6 fork (package name `@mkbabb/glass-ui`), NOT a registry consumer — owns its own stale `/glass-carousel`, `/pagination`, `/metaballs`, `/virtual` refs. An inv-11 lineage note, not a B7 row.
- **The B1c CONSUME interims** (kf `DragOptions.snap`, value.js `oklchSpectrum`, the viz `Oscillator`) are all met at the pinned keyframes 5.1.0 / value.js 1.1.1 (the `wcagContrastRatio`-bearing npm-latest floor; kf's transitive value `^1.2.0` ⊆ `^1.1.1`) — ZERO upstream asks.
