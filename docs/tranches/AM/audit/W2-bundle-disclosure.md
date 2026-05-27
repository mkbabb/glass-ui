# AM.W2 — chunk-strategy confirmation + per-subpath size disclosure

Closes gap 14 (per-subpath gzipped-size disclosure), gap 6's library half (root-barrel shake proof) + docs half, gap 16 (Vite 8 `manualChunks` recipe), gap 13 (Tabs-vs-ToggleGroup matrix), and surfaces the AM.W0 tw-animate-css requirement (gap 15) + GlassDock aria contract (gap 3) in CLAUDE.md.

## Task 1 — per-subpath gzipped-size table (gap 14)

`scripts/profile-bundle.mjs` already walked + gzipped every `dist/` file but only budgeted `dist/glass-ui.js` + `dist/glass-ui.css`. The wave extends it to ALSO emit a per-subpath table:

- Classifies every `dist/*.js` chunk as an **entry** (a published subpath read authoritatively from `package.json` exports' `import` targets — not pattern-matched, so hyphenated names like `glass-carousel`/`paper-backdrop` are never mistaken for content-hashed leaves) or a **shared** Rolldown-extracted leaf.
- Writes `subpathTable` + `subpathTotals` into the existing artifact JSON (`docs/tranches/K/audit/W4-bundle-profile.json`).
- Writes a human-readable markdown table to `docs/tranches/K/audit/W4-subpath-sizes.md` (regenerated each run).
- Echoes the same table to stdout, sorted largest-gzip first, with entry/shared subtotals.

The additions are purely informational — they do NOT add or change any enforce-gate threshold. The existing `dist/glass-ui.js` (190 KB raw / 33.7 KB gzip) and `dist/glass-ui.css` (48 KB / 8.65 KB) budgets are untouched.

### profile:budget result

`npm run profile:budget` (`--enforce`) against the built dist exits **0**:

```
Bundle budget report:
  [PASS] dist/glass-ui.js — raw 36047 / 190000 (19.0%); gzip 8491 / 33700 (25.2%)
  [PASS] dist/glass-ui.css — raw 43090 / 48000 (89.8%); gzip 7809 / 8650 (90.3%)
EXIT:0
```

### Per-subpath table — top entries (full table at `docs/tranches/K/audit/W4-subpath-sizes.md`)

| Chunk | Kind | Raw | Gzip |
|---|---|---|---|
| `dist/aurora.js` | entry | 50545 (49.4 KiB) | 16351 (16.0 KiB) |
| `dist/glass-ui.js` | entry | 36047 (35.2 KiB) | 8491 (8.3 KiB) |
| `dist/typewriter.js` | entry | 19501 (19.0 KiB) | 5649 (5.5 KiB) |
| `dist/dock.js` | entry | 16145 (15.8 KiB) | 5205 (5.1 KiB) |
| `dist/search.js` | entry | 13825 (13.5 KiB) | 4595 (4.5 KiB) |
| `dist/DataTable-C-WgCrqm.js` | shared | 15327 (15.0 KiB) | 4260 (4.2 KiB) |
| `dist/timeline.js` | entry | 14017 (13.7 KiB) | 4125 (4.0 KiB) |
| `dist/useConfiguratorState-BlaevW0S.js` | shared | 9935 (9.7 KiB) | 3638 (3.6 KiB) |
| `dist/carousel.js` | entry | 11938 (11.7 KiB) | 3386 (3.3 KiB) |
| `dist/motion.js` | entry | 8221 (8.0 KiB) | 2880 (2.8 KiB) |

Totals — **65 entry** files (248615 raw / 83402 gzip), **65 shared** leaves (177790 raw / 67988 gzip). The full 130-row table lives in the generated `W4-subpath-sizes.md`.

## Task 2 — root-barrel shake proof (gap 6 library half)

The headline evidence: `dist/glass-ui.js` is the root barrel at **35.2 KiB raw / 8.3 KiB gzip**, while `dist/aurora.js` is a separate standalone entry at **49.4 KiB raw / 16.0 KiB gzip**. A static import-graph walk confirms the shake is total, not just an incidental size difference:

```
$ node … (transitive import walk from dist/glass-ui.js)
glass-ui.js transitively reaches 58 chunks
reaches aurora.js? false
any aurora/webgl chunk in reach? [ 'useGlassRenderer-DMDdMH55.js' ]
```

- The root barrel transitively reaches **58 chunks**; `aurora.js` is **not** among them. The 76-entry per-subpath split tree-shakes Aurora's standalone WebGL chunk fully out of the root-barrel graph.
- `grep -c aurora dist/glass-ui.js` → **0** (no textual reference either).
- The one WebGL-adjacent chunk in the root-barrel reach is `useGlassRenderer-DMDdMH55.js` (4.0 KiB / 1.6 KiB gzip), pulled via `glass-panel.js` (the GlassPanel substrate) — a small shared renderer composable, NOT the Aurora component. Notably `aurora.js` does **not** import that shared chunk: Aurora inlines its own WebGL renderer + shader assets (the 49.4 KiB standalone weight), so it is fully isolated from the root barrel.

A consumer importing the root barrel (or any non-Aurora subpath) never drags in Aurora's 16 KiB-gzip WebGL chunk; reaching Aurora is an explicit `@mkbabb/glass-ui/aurora` import.

## Task 3 — CLAUDE.md sections added

1. **§Component architecture → "Tabs vs ToggleGroup"** (gap 13) — `<Tabs>` for mutually-exclusive PANEL navigation (`role="tablist"`, distinct content per tab); `<ToggleGroup>` for independent-or-single-select TOGGLES mutating one surface (`role="group"`, no panel swap).
2. **§Component architecture → "GlassDock aria contract"** (gap 3) — the GlassDock root is presentational (`<div>`, no role); `aria-expanded` belongs on the interactive trigger child, not the root. Cites `audit/W0-forms-a11y.md`.
3. **§Consumer wiring — tw-animate-css requirement** (gap 15) — explicit install + `@import "tw-animate-css";` requirement for consumers of the Dialog/Sheet/Popover/DropdownMenu animation grammar; noted as an `optionalPeerDependency`.
4. **§Consumer wiring → "Subpath-import discipline"** (gap 6 docs) — import from flat subpaths (`@mkbabb/glass-ui/button`) not the root barrel for minimal payload; the 76-entry split tree-shakes each subpath; cites the published per-subpath size table.
5. **§Consumer wiring → "Vite 8 `manualChunks` recipe"** (gap 16) — the Rolldown-compatible single-arg form with the glass-ui → vueuse → vendor ordering note and the `advancedChunks` caveat.

## Verification

- `npm run profile:budget` (`--enforce`) — exits **0** (both budget rows PASS).
- `npm run typecheck` — exits **0** (doc + script edits regress no type-bearing file).
- Files touched: `scripts/profile-bundle.mjs`, `CLAUDE.md`, this audit doc. (The generated `docs/tranches/K/audit/W4-subpath-sizes.md` + `W4-bundle-profile.json` are script artefacts, rewritten on each profile run.)
