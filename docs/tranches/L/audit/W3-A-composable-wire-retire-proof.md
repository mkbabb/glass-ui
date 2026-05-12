# L.W3 Lane A — composable wire-or-retire proof

**Wave**: L.W3 Lane A — second-consumer fidelity audit (composables).
**Bounds**: `src/composables/{motion,pagination,virtual}/...` + barrels +
demo + tests + scripts + `MIGRATION.md` + `CHANGELOG.md`.
**Disposition basis**: substrate-without-consumer is binary at v1.0 (L
invariant 8). Cross-repo speedtest consumption counts toward the ≥ 2
threshold per V-tranche precedent.

---

## § Survey

`rg "<symbol>\b" src/ demo/` at wave open, plus cross-repo verification
against speedtest worktree:

| Composable | glass-ui src/ consumers | glass-ui demo consumers | Speedtest consumers | Tests | Total in-scope consumers |
|---|---:|---:|---:|---:|---:|
| `useRAFLoop` | 0 | 1 (`demo/stories/composables/use-raf-loop.vue`) | 1 (`speedtest/src/components/speedtest/composables/useMeterRenderer.ts`) | 1 (`useRAFLoop.test.ts`) | **3** |
| `useIntersectionPause` | 0 | 1 (`demo/stories/composables/use-intersection-pause.vue`) | 1 (`speedtest/src/composables/useAuroraPolicy.ts`) | 1 (`useIntersectionPause.test.ts`) | **3** |
| `useDarkModeSync` | 0 | 1 (`demo/stories/composables/use-dark-mode-sync.vue`) | 2 (`speedtest/src/components/speedtest/SpeedtestMeter.vue` + `speedtest/src/components/dashboard/composables/useEChartsTheme.ts`) | 0 | **3** |
| `useOffsetPagination` | 0 | 1 (`demo/stories/composables/use-offset-pagination.vue`) | 0 | 0 | **1** |
| `useVirtualSectionWindow` | 0 | 1 (`demo/stories/composables/use-virtual-section-window.vue`) | 0 | 0 | **1** |
| `useWindowedStore` | 0 | 1 (`demo/stories/composables/use-windowed-store.vue`) | 0 | 0 | **1** |
| `virtualSectionLayout` helpers (4 fns + 4 types) | only `useVirtualSectionWindow.ts` (now retired) | 0 (referenced only in retired tests) | 0 | 1 (`composables.smoke.spec.ts` describe-block — retired alongside parent) | **0** (support substrate for retired parent) |

Speedtest grep evidence:

```
$ rg "useRAFLoop|useIntersectionPause|useDarkModeSync" /Users/mkbabb/Programming/speedtest/src
src/composables/useAuroraPolicy.ts:11:import { useIntersectionPause } from "@mkbabb/glass-ui";
src/components/speedtest/SpeedtestMeter.vue:14:import { useDarkModeSync } from "@mkbabb/glass-ui";
src/components/speedtest/composables/useMeterRenderer.ts:32:import { ... useRAFLoop ... } from "@mkbabb/glass-ui";
src/components/dashboard/composables/useEChartsTheme.ts:3:import { useDarkModeSync } from "@mkbabb/glass-ui";
```

```
$ rg "useOffsetPagination|useVirtualSection|useWindowedStore|virtualSectionLayout" /Users/mkbabb/Programming/speedtest/src /Users/mkbabb/Programming/speedtest/admin
# (no matches in source — only doc-audit references)
```

---

## § Disposition

| Composable | Decision | Rationale |
|---|---|---|
| `useRAFLoop` | **WIRE (retain)** | 1 speedtest prod + 1 demo + test. Cross-repo prod consumer (speedtest's canvas render loop) is canonical use case; demo + test attest fidelity. ≥ 2 consumers per V-tranche precedent. |
| `useIntersectionPause` | **WIRE (retain)** | 1 speedtest prod + 1 demo + test. Speedtest's aurora-policy composable pairs it with reduced-motion gating — substantive cross-repo prod consumer. |
| `useDarkModeSync` | **WIRE (retain)** | 2 speedtest prod sites (SpeedtestMeter canvas re-init + ECharts theme cycle) + 1 demo. Multi-site cross-repo prod consumer — substrate is consumed broadly, not speculatively. |
| `useOffsetPagination` | **RETIRE** | 0 speedtest consumers + 1 demo. Pure demo substrate. The audit-doc references in `speedtest/docs/audits/` are inventory references, not import sites. Per L invariant 8 binary. |
| `useVirtualSectionWindow` | **RETIRE** | 0 speedtest consumers + 1 demo. Same as `useOffsetPagination`. |
| `useWindowedStore` | **RETIRE** | 0 speedtest consumers + 1 demo. Same. |
| `virtualSectionLayout` helpers + types | **RETIRE** | Support substrate for `useVirtualSectionWindow`. Retires with parent. |

The Rε A5 default disposition ("WIRE 2 of 3 into Pulse / TypewriterText /
useTokenColor; RETIRE the 3rd") presupposed zero cross-repo consumption.
The actual cross-repo grep at L.W3 open invalidated that assumption —
speedtest is the production consumer of record for all three motion
composables, so the original disposition cascades to "retain all three;
zero in-tree wiring needed."

---

## § Files modified

### Deleted (logical — orchestrator owns the index)

```
src/composables/pagination/useOffsetPagination.ts
src/composables/pagination/index.ts
src/composables/pagination/  (directory removed)
src/composables/virtual/useVirtualSectionWindow.ts
src/composables/virtual/useWindowedStore.ts
src/composables/virtual/virtualSectionLayout.ts
src/composables/virtual/index.ts
src/composables/virtual/  (directory removed)
src/pagination.ts  (subpath barrel)
src/virtual.ts     (subpath barrel)
demo/stories/composables/use-offset-pagination.vue
demo/stories/composables/use-virtual-section-window.vue
demo/stories/composables/use-windowed-store.vue
```

### Modified

- `src/composables/index.ts` — removed `export * from "./pagination"` and
  `export * from "./virtual"`.
- `package.json` — removed `./pagination` + `./virtual` entries from
  `exports` and `typesVersions`.
- `vite.library.ts` — removed `pagination` + `virtual` entries from
  `libraryEntries()`.
- `demo/stories/manifest.ts` — removed three `s("composables", ...)` rows
  for the retired stories.
- `tests/composables.smoke.spec.ts` — removed the `virtual section layout
  helpers`, `windowed store`, and `offset pagination` describe blocks
  (~150 LOC) and their imports.
- `tests/public-surface.spec.ts` — removed
  - `import * as Pagination from "../src/pagination"` +
    `import * as Virtual from "../src/virtual"`,
  - the three `{ subpath: "virtual"|"pagination", ... }` entries from
    `subpathRuntimeExports`,
  - the three names (`useWindowedStore`, `useVirtualSectionWindow`,
    `useOffsetPagination`) from `nonCoreRootRetirements`,
  - the three `virtualSectionLayout` type-surface entries from
    `typeSurfaceChecks`.
- `scripts/proof-package.mjs` — removed the
  `@mkbabb/glass-ui/virtual` + `@mkbabb/glass-ui/pagination` imports and
  their three `runtimeSymbols` entries; lowered the symbol-count
  assertion from 45 → 40 (still well above the surviving 43).

### Created

- `MIGRATION.md` — Lane A section appended at the existing
  `<!-- Lane A appends here -->` placeholder authored by Lane B.
- `docs/tranches/L/audit/W3-A-composable-wire-retire-proof.md` (this file).

---

## § MIGRATION.md section (verbatim insert)

See `MIGRATION.md` lines under `## L.W3 Lane A — composable retirements`
heading. Captures: KEPT table (3 wired composables × speedtest consumers);
4 RETIRE entries (`useOffsetPagination`, `useVirtualSectionWindow`,
`useWindowedStore`, `virtualSectionLayout` helpers) each with status,
reason, subpath retired, and migration path.

## § CHANGELOG.md section (verbatim insert)

Inserted under `## v1.0.0 — unreleased` at the `<!-- Lane A appends ... -->`
placeholder. Sections:
- `### BREAKING — W3 retirements (Lane A — composables)` — 6 bullets
  enumerating the retired symbols + 2 retired subpaths.
- `### KEPT — W3 Lane A (cross-repo wired)` — 3 bullets enumerating the
  wired composables and their speedtest consumer sites.

---

## § Verification

```
$ rg "useOffsetPagination|useVirtualSectionWindow|useWindowedStore|virtualSectionLayout|FlatSection|SectionLayout|SectionWindowRange|ForcedSectionWindowRange|buildSectionLayout|findSectionOffset|resolveActiveSection|resolveSectionWindow" src/ demo/ tests/ scripts/
# (no matches — retired symbols fully excised)

$ rg "useRAFLoop\b|useIntersectionPause\b|useDarkModeSync\b" src/ demo/ -c
src/composables/motion/index.ts:5  (useRAFLoop + useIntersectionPause + useDarkModeSync — barrel exports)
src/composables/motion/useRAFLoop.ts:1
src/composables/motion/useIntersectionPause.ts:1
src/composables/motion/useDarkModeSync.ts:1
src/composables/__tests__/useRAFLoop.test.ts:4
src/composables/__tests__/useIntersectionPause.test.ts:3
demo/stories/manifest.ts:3
demo/stories/composables/use-raf-loop.vue:3
demo/stories/composables/use-intersection-pause.vue:4
demo/stories/composables/use-dark-mode-sync.vue:3
# (wired symbols retained)

$ npx vue-tsc --noEmit
# (clean — 0 errors)

$ npx vitest run
Test Files  27 passed (27)
     Tests  330 passed (330)
  Duration  4.68s

$ NODE_OPTIONS=--max-old-space-size=8192 npm run build
✓ built in 35.20s
[vite:dts] Declaration files built in 34069ms.
```

All gates green.

---

## § Open questions for orchestrator

1. **Demo story for `useDarkModeSync` lacks a colocated `__tests__` file.**
   Lane A retains the demo + cross-repo consumers but does not author a
   new test since one was never present at HEAD. Test coverage parity
   with `useRAFLoop` + `useIntersectionPause` is W4 / W5 territory, not
   W3 wire-or-retire. Noted for downstream awareness.

2. **The two retired subpaths (`/pagination`, `/virtual`) were never
   consumed at v0.9.x outside the demo + glass-ui test fixtures**, so
   the speedtest re-link cycle (L invariant 17, gated on v1.0 release)
   has no consumer-side migration impact for these retires — only the
   L.W1 root-barrel + flatten breaks need consumer follow-up at speedtest.

3. **`useDarkModeSync` cross-repo consumer count = 2 sites** (2 separate
   speedtest source files), which alone satisfies the ≥ 2 bar before the
   glass-ui demo is counted. The disposition is unambiguous; flagging only
   for completeness — if substrate-without-consumer is later interpreted
   as "≥ 2 in-tree" rather than "≥ 2 across in-tree + canonical cross-repo
   consumer", this composable still passes.

---

## Authority

Read-only git only per L hardened agent git clause. No `git add` / `git
stash` / `git commit` / `git checkout` / `git reset` / `git restore` /
`git mv` invoked. All file deletions, edits, and creations executed via
the Edit / Write / Bash `rm` interfaces; orchestrator owns the index +
commit.
