# BH cross-repo asks + consumes (the 5.0.0 break relay)

The foreign-tree fence is literal: glass-ui edits ZERO sibling files. Every break is a by-name ask; the sibling owns its own edit. This roster is authored now and the asks issue at the 5.0.0 cut, after B2.2 lands and the export diff is final.

## The 5.0.0 export break, exactly

One dropped key — **`./api`** — and its 203 symbols re-home onto their owning subpaths (200 pure import-path swaps; 3 orphans add an export: `Surface`→/card, `MenuItemVariants`→/command, `ControlSize`→/forms). Every other published key is preserved (regen reproduces 96/96 keys; `./api` is the only intentional drop). The flat-barrel relocations (B2.3) and the `src/subpaths/` delete (B2.1) are key-preserving and carry no consumer break.

## Asks (the complete `/api` consumer roster — grepped read-only across the constellation)

| # | Sibling | Import site | Symbols | New home | Ask |
|---|---|---|---|---|---|
| 1 | **muster** | `frontend/src/composables/useAuroraConfig.ts:47` | `DEFAULT_AURORA_CONFIG`, `AuroraConfig` | `@mkbabb/glass-ui/aurora` | `migrate-api-to-aurora` — one-line re-point |
| 2 | **speedtest** | `src/features/speedtest/ui/PhaseTimeline.vue:52` | `TimelineSegment` (type) | `@mkbabb/glass-ui/timeline` | `migrate-api-to-timeline` — one-line re-point **+** drop the dead `vite.config.mjs:1033` optimizeDeps `@mkbabb/glass-ui/api` string in the same ask |

No other sibling imports `/api`. The renamed/at-risk subpaths `/canvas`, `/motion-curves`, `/fourier-math` have zero live source consumers and are name≠dir internal renames (key unchanged) — no ask owed.

## Census (live consumers, no ask owed — keys preserved)

- **bbnf-buddy** — /dock, /sortable-list, /dark, /toggle-chip, /tabs, /controls. Zero /api. Every key preserved.
- **slides-K** — /deck, /dock, /controls, /button, /forms, /separator, /popover, /dialog. Zero /api. Every key preserved.

## Unowned-seam cross-reference

- **BG-WS5 owns the viz-subpath migration** (`/constellation`, `/fourier-field`) with **slides** as the named consumer. Both keys are present today; if WS5 deletes/renames either, the slides migration is BG-WS5's, not BH-B7's. The post-WS12 export-delta surfaces any key drop. Confirm BG-WS5 carries it.

## Disposition notes (no ask)

- **`words/frontend/glass-ui/`** is a vendored d6 fork (package name `@mkbabb/glass-ui`), NOT a registry consumer — owns its own stale `/glass-carousel`, `/pagination`, `/metaballs`, `/virtual` refs. An inv-11 lineage note, not a B7 row.
- **The B1c CONSUME interims** (kf `DragOptions.snap`, value.js `oklchSpectrum`, the viz `Oscillator`) are all met at the pinned keyframes 5.1.0 / value.js 1.2.0 — ZERO upstream asks.
