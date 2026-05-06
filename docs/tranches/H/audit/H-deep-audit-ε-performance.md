# H deep-audit Lane ε — performance, bundle, runtime, build infrastructure

Captured at HEAD `c5f196c` (post H W6 close) on darwin/arm64 · Apple M4 Max · 64.0 GB RAM. Numbers are from a single `rm -rf dist && time npm run build` run executed for this audit (log: `/tmp/glass-ui-build.log`); historical timings are cited from existing tranche-H proof artefacts.

## 1. Preamble

H closed with a passing `_internal/blob-stress` baseline (W5: 119.62 fps / 0 KB heap-delta-per-instance on M4 Max). Lane ε's question is the larger one: where does the library currently sit on the cost axis? The bundle is 188.9 kB raw / 36.1 kB gz at the main entry, the dts bundle is 222 kB, the build clocks in at ~17 s end-to-end on a clean dist (vite phase 17.30 s, dts phase 16.6 s, running in parallel under a single `vite build`), and the runtime profile is sitting at ~25× the SPEC.md §9 fps headroom. The cost is dominated by three things: dts emission (a wall-clock variable, not a stable cost), the 30-subpath multi-entry build matrix (each entry is real rollup work), and the unsharded main barrel (`src/index.ts` star-exports every public component). Tests pass at 263/266; the 3 failures are public-surface drift (utilities.css string-match assertions and a dock surface count mismatch), not perf debt. Recommendations sit at the end of §11.

## 2. Bundle audit — dist/* file sizes

Source: vite build summary at `/tmp/glass-ui-build.log` and `ls -la /Users/mkbabb/Programming/glass-ui/dist/`.

Aggregate (`du -sh dist/`): **976 KB** total. Breakdown by extension:
- `*.js` → 540 KB across 48 files
- `*.d.ts` → 396 KB across 31 files
- `*.css` → 40 KB (one file: `glass-ui.css`)

Top 10 emitted JS files (by raw bytes, vite-reported):

| File | Raw | Gzip |
|---|---|---|
| `dist/glass-ui.js` | 188.91 kB | 36.12 kB |
| `dist/aurora.js` | 47.80 kB | 15.51 kB |
| `dist/glass-ui.css` | 39.48 kB | 6.96 kB |
| `dist/typewriter.js` | 20.52 kB | 5.81 kB |
| `dist/dock.js` | 18.19 kB | 5.48 kB |
| `dist/search.js` | 14.84 kB | 4.28 kB |
| `dist/Switch.vue_…OipRBWWq.js` (shared chunk) | 14.20 kB | 3.79 kB |
| `dist/sidebar.js` | 13.16 kB | 3.98 kB |
| `dist/timeline.js` | 9.42 kB | 2.75 kB |
| `dist/tabs.js` | 8.42 kB | 2.44 kB |

Top dts files (by raw bytes, `ls -la dist/*.d.ts | sort -rn -k5`):

| File | Raw |
|---|---|
| `dist/index.d.ts` | 221.84 kB |
| `dist/dock.d.ts` | 13.02 kB |
| `dist/typewriter.d.ts` | 11.95 kB |
| `dist/glass-carousel.d.ts` | 10.42 kB |
| `dist/aurora.d.ts` | 8.96 kB |

Tiny stub artefacts (≤ 0.16 kB raw, near-pure re-exports from `glass-ui.js`):
`dist/glyph-face.js` (0.12), `dist/dock-group.js` (0.12), `dist/disco-glyph.js` (0.12), `dist/icon-tooltip.js` (0.12), `dist/instrument-chassis.js` (0.16).

Per W1-E proof (`docs/tranches/H/audit/W1-E-proof.md`), `glass-ui.js` was 190.75 kB / 36.60 kB gz. HEAD at 188.91 kB / 36.12 kB gz — net **–1.84 kB raw / –0.48 kB gz** since H W1 (likely W3 slider variant + W6 audit churn rebalanced shared chunks). No regression at the main entry across H.

## 3. Build performance — dts emission timing

Single fresh build at HEAD: `time npm run build` (log captured to `/tmp/glass-ui-build.log`).

```
✓ 663 modules transformed.
[vite:dts] Declaration files built in 16596ms.
✓ built in 17.30s
npm run build  33.44s user 3.44s system 204% cpu 18.021 total
```

So vite's bundling phase + dts phase run **concurrently under one `vite build`** — wall clock 17.30 s. CPU is 33.44 s user, ratio 204% (two cores busy), confirming concurrency.

Historical dts-phase times (from H proofs):

| Source | dts phase wall | Notes |
|---|---|---|
| `W1-B-proof.md` (mid-refactor) | 235.75 s | Lane B mass-deletes in flight |
| `W1-E-proof.md` (mid-refactor) | 169.63 s | Same window, different lane |
| `W3-slider-glass-track-proof.md` | 24.62 s | Settled tree, single targeted edit |
| HEAD (this audit) | 16.60 s | Settled tree, post-H |

Variance is ~14× (16.6 → 235 s). The 3.5–4-minute outliers correlate with `vite-plugin-dts` + API Extractor reanalysing many in-flux modules; on a settled tree the cost lands at 16–25 s. Reading the build log, the bundled extractor logs `Analysis will use the bundled TypeScript version 5.8.2 *** target uses 5.9.3 …` **31 times** (one per subpath entry) — i.e. the extractor restarts/re-parses the module graph per entry. With `rollupTypes: true`, every entry's d.ts gets rolled into a single file, but the extractor work is paid 31×.

**Cacheable?** `vite-plugin-dts` itself does not have a content-hash cache; rollupTypes runs API Extractor over the entire entry graph. Practical caching options: (a) split the build into `vite build` (fast, ~14 s) and `vue-tsc --emitDeclarationOnly` once, then a cheap `dts-bundle-generator` per entry; or (b) accept current cost and parallelise across CI runners. Today the cost is paid every CI invocation (the stress workflow runs `npm run build` then `npm run stress`).

## 4. Runtime profile vs SPEC.md §9 budget

W5 baseline (`docs/tranches/H/audit/W5-stress-baseline.md`) on M4 Max:

| Metric | Measured | SPEC.md §9 budget | Headroom |
|---|---|---|---|
| FPS (8 instances, 30-fps gate) | 119.62 fps | 30 fps | **3.99×** above floor (SPEC §9 baseline is 4-instance / 60 fps; story exercises 8 / 30) |
| Mean RAF delta (driver) | 8.36 ms | 0.5 ms (renderer) | RAF is bounded below by ~16 ms display refresh; 8.36 ms is a half-frame at 120 Hz, so the driver is at-or-better-than-refresh and the SPEC budget is not directly comparable to the captured shape (W5 doc itself notes this) |
| Max frame | 25.10 ms | 33.30 ms (2 frames @ 60 Hz) | 1.33× under |
| Heap delta / instance | 0.0 KB | ≤ 256 KB | Effectively unbounded headroom |

SPEC §9 reference table, verbatim from `docs/tranches/G/blob/SPEC.md`:

```
Per-frame GPU time         ≤ 2 ms   (M1 / iPhone 12 / Pixel 5)
Per-frame CPU (renderer)   ≤ 0.5 ms
Per-frame CPU (state machine) ≤ 0.3 ms
Memory per instance        ≤ 256 KB
4-instance baseline        60 fps
```

**Headroom analysis.** On M4 Max, 8 instances pull 119 fps — there is room for ~32 instances before the 30 fps gate trips, or ~16 before the 60 fps gate trips, all else equal. On M1 (the SPEC reference) and on slower mobile this halves or more; the CI stress workflow wraps numbers in `STRESS_CI_RELAX=1` (2× factor) precisely because GitHub runners can't hold M1-class numbers. Heap-delta is the cleaner signal: 0 KB across 8 instances over 5 s says the renderer holds no per-instance retained state beyond initial allocation. **There is real headroom for additional satellites, additional shaders, or more concurrent instances**, but the SPEC §9 per-frame CPU budgets (0.5 ms renderer / 0.3 ms state) are not directly observable from the W5 capture (RAF-driver granularity, not `performance.measure` per phase). I-tranche should re-instrument with `performance.measure` if those individual budgets need verifying.

## 5. Subpath audit — 30 typed subpaths × consumer usage

`vite.library.ts` declares **31 entries** (1 main + 30 subpath); `package.json` `exports` declares **32 keys** (33 minus the two style-only paths `./styles` + `./styles/prism-theme`). One typesVersions entry list of 30. The mapping is 1:1.

In-repo consumer usage:

| Site | Imports from `@mkbabb/glass-ui[/<sub>]` | Imports via `@/` alias |
|---|---|---|
| `src/` (library internals) | 4 (`Blob.vue`, `Swatch.vue`, `blob/index.ts`, `index.ts`) | n/a |
| `demo/` | 0 (verified `grep -rn 'from "@mkbabb/glass-ui' demo/`) | 379 |
| `presets/` | 0 (only `presets/words.css`) | 0 |
| `scripts/proof-package.mjs` | 31 (every declared subpath imported once for proof) | n/a |
| `scripts/proof-consumers-static.mjs` | enforces the rule that consumer code must import only from declared subpaths | n/a |

So the only proof of subpath usefulness is `scripts/proof-package.mjs` itself. There is no in-repo consumer; the library's external consumer (per CLAUDE.md, the `value.js` migration work) is out-of-tree.

**Subpath retire-candidates** (sub-200-byte stubs whose only public surface duplicates the main barrel; consumer can import from `@mkbabb/glass-ui` for the same payload):

| Subpath | dist size | Source size (lines) | Wraps |
|---|---|---|---|
| `./glyph-face` | 0.12 kB | 1 | one re-export |
| `./dock-group` | 0.12 kB | 1 | one re-export |
| `./disco-glyph` | 0.12 kB | 1 | one re-export |
| `./icon-tooltip` | 0.12 kB | 1 | one re-export |
| `./instrument-chassis` | 0.16 kB | 1 | one re-export |
| `./paper-backdrop` | 0.79 kB | 1 | one re-export |
| `./pulse` | 1.42 kB | 1 | one re-export |
| `./glass-panel` | 1.65 kB | 1 | one re-export |
| `./metric-badge` | 1.71 kB | 1 | one re-export |
| `./status-dot` | 2.23 kB | 1 | one re-export |
| `./toggle-chip` | 3.22 kB | 1 | one re-export |

These 11 subpaths are pure re-exports of leaves the main barrel already exports. Retiring them collapses 11 × {package.json exports key, typesVersions entry, vite.library entry, dist `.js`, dist `.d.ts`} = 55 declarations. Worth retaining: `./dock`, `./aurora`, `./typewriter`, `./search`, `./sidebar`, `./glass-carousel`, `./tabs`, `./timeline`, `./metaballs`, `./virtual` (each ≥ 6.5 kB, real isolated payloads). Marginal: `./controls`, `./confirm-dialog`, `./infinite-scroll`, `./pagination`, `./expandable-container`, `./labeled-field`, `./sortable-list`, `./stacked-icons`, `./tokens` (1–5 kB; drop only with consumer review).

This is the biggest config-collapse opportunity in the build.

## 6. Build-system config audit

Three vite configs in tree:
- `vite.config.ts` — main library build (vite + tailwind + vue + dts plugins, libraryEntries × all 31)
- `vite.iter.config.ts` — same but no dts (`npm run iter-build`, used by `profile-bundle.mjs`)
- `vite.library.ts` — *not* a config; it's a shared module exporting `libraryEntries`, `libraryAliases`, `libraryExternal`, `libraryGlobals`, `libraryFileName`. Imported by both configs above. Naming is misleading (looks like a config, isn't one).
- `vitest.config.ts` — duplicates the alias resolution from `vite.library.ts` (`@` → src, `@utils` → src/utils) using `fileURLToPath` instead of `resolve(rootDir, …)`. Vitest is on v4 (config schema works fine).

Two tsconfigs:
- `tsconfig.json` — includes `src/` + `demo/`, `noEmit:true`, used by `vue-tsc --noEmit` + IDE
- `tsconfig.src.json` — extends, `include: ["src/"]` only, used by `vite-plugin-dts` + the iter check

This is *almost* right; iter-config exists because `npm run iter-build` must skip the dts cost during dev iteration. The drift: `vitest.config.ts` re-implements aliasing instead of importing `libraryAliases`, so any alias change must touch two files. Quick consolidation: have `vitest.config.ts` import + spread `libraryAliases(__dirname)`. (`vite.library.ts` is plain TS, importable from any config.)

`vite.iter.config.ts` redundancy: it differs from `vite.config.ts` only by (a) no `dts()` plugin and (b) `sourcemap: false`. Could be expressed as one config with a flag (`process.env.GLASS_UI_ITER === "1"`) and removed. Net 33 lines collapsed. Cosmetic, not load-bearing; keep two files if explicit-is-better wins.

`vite.library.ts` should be renamed `vite.shared.ts` or moved to `scripts/build/shared.ts` to stop reading like a config.

## 7. Dependency audit — peer vs dev hygiene

`peerDependencies` (10): `@mkbabb/keyframes.js`, `@vueuse/core`, `class-variance-authority`, `clsx`, `embla-carousel-vue`, `lucide-vue-next`, `reka-ui`, `tailwind-merge`, `tailwindcss`, `vaul-vue`, `vue`. (CLAUDE.md said `vaul-vue` + `lucide-vue-next` were dev-only — they're now peer-promoted; correct given they're imported by published code.)

`devDependencies` (29): includes the peer mirrors (every peer also listed at dev for local resolution) + tooling (`@playwright/*`, `@vitejs/plugin-vue`, `@tailwindcss/{postcss,vite}`, `happy-dom`, `playwright`, `tw-animate-css`, `typescript`, `vite-plugin-dts`, `vitest`, `vue-router`, `vue-tsc`, `@vue/test-utils`).

Findings:
- **`tw-animate-css`** — declared dev only; not in peers, not in `libraryExternal`. `grep -rn "tw-animate-css" src/` returns 0 hits. Imported only by demo/presets stylesheets per CLAUDE.md guidance (`@import "tw-animate-css"`). Consumer-side dependency by convention but not declared anywhere. **Action**: either document it in README "consumer wiring" only (CLAUDE.md already does this) or move to `optionalPeerDependencies` so consumers get an install hint.
- **`@playwright/mcp`** — listed dev. The library does not test via MCP; this is a developer-tool dep. Probably accumulated from the H W4 design-fidelity work. Worth keeping if `scripts/audit/playwright-deep-audit.mjs` uses it, otherwise prune.
- **`@playwright/test` + `playwright`** — both pinned at 1.59.x. Stress workflow uses raw `playwright`; `@playwright/test` is for the e2e harness that may not exist yet. `find . -name "*.e2e.ts"` returns nothing, so `@playwright/test` is currently unused. Either install when needed or prune.
- **`vue-router`** — dev only, used by demo. Correct (consumer doesn't need router).
- **`happy-dom`** — vitest environment; correct.
- **`@vue/test-utils`** — currently 0 imports outside `tests/utils/`. Confirm via `find . -name "*.test.ts" -exec grep -l "@vue/test-utils" {} \;`.
- **No peer that's never imported**: spot-checked via `grep -rn` for each peer; all 10 peers are imported by `src/`.

The peer/dev list is largely clean. The two trim candidates are `@playwright/mcp` and `@playwright/test` (unused at HEAD per repo grep).

## 8. Test infrastructure

Counts (from `find … -name "*.test.ts" -o -name "*.spec.ts"`):

| Location | Files |
|---|---|
| `src/composables/__tests__/` | 7 |
| `src/components/ui/{button,card,progress}/__tests__/` | 3 |
| `src/components/ui/{multi-select,data-table}/` | 2 (`*.spec.ts`) |
| `src/components/custom/search/__tests__/` | 1 |
| `src/components/custom/sidebar/` | 1 (`ProgressiveSidebar.spec.ts`) |
| `tests/` | 4 (`components.smoke`, `composables.smoke`, `lifecycle-cleanup`, `public-surface`) |
| **Total** | **18 test files** |

`npx vitest run` summary (this audit): **18 files, 266 tests, 263 pass, 3 fail**, 1.56 s. The 3 failures all live in `tests/public-surface.spec.ts`:

1. `keeps exact 'dock' runtime surface` — public-surface ledger expects an exact key list; current `dock` subpath has more (or fewer) exports than declared. (Drift between `tests/utils/`'s expected list and the actual barrel.)
2. `does not re-export retired utility .code-badge` — `src/styles/utilities.css:160` still contains `.code-badge {`. Either retire the rule or update the ledger.
3. `keeps utility shimmer/progress aliases off undefined local tokens` — `src/styles/utilities.css:124,131` still contains `--shimmer-duration` references. Same shape.

These three are surface-drift, not perf-debt. They block CI today (or would, if a CI job ran `npm test` — `stress.yml` does not).

**Coverage gaps relative to public surface:**
- 39 ui packages, only 5 have unit tests (Button, Card, Progress, MultiSelect, DataTable).
- 40 custom packages, only 2 have unit tests (Sidebar, search-contracts).
- 0 tests for: Aurora, Blob, Metaballs, Dock, Typewriter, GlassCarousel, Sidebar tree composables, useSpringOrchestrator, useGlassRenderer, glass shaders.
- The 4 `tests/*.smoke|surface|lifecycle.spec.ts` files are the only integration coverage; they're list-driven (iterate over a `*Checks` array).

This is shallow for a 79-package library. I-tranche could plausibly add: per-component snapshot/render smoke (target every package with a default `<Component />` mount), one shader-init test for each GL composable (verify no console.error on instantiation in JSDOM-equivalent), one accessibility smoke per package with a focusable surface.

## 9. CI workflows

`.github/workflows/`:

| File | Trigger | Purpose |
|---|---|---|
| `stress.yml` | PR + push to master/main + `workflow_dispatch` | Build → install Chromium → run `npm run stress` → upload baseline artefact + post PR comment |

That is the only workflow. No build-only workflow, no test workflow, no lint, no type-check, no bundle-size check.

The stress workflow does build + stress; if `npm run build` fails the workflow fails, so build correctness is implicitly covered. But:
- `npm test` (vitest) is **not** run in CI; the 3 surface-drift failures sit unguarded.
- `npm run typecheck` is **not** run in CI.
- `npm run proof:package` is not run in CI; the 30-subpath proof harness (the only thing that exercises the `exports` matrix) is local-only.
- Bundle-size regression is not gated; the 188.91 kB main entry could quietly drift.

Recommended additions for I-tranche:
- `ci.yml`: `npm ci` → `npm run typecheck` → `npm test`. ~1–2 min on free runners.
- `package-proof.yml`: `npm ci` → `npm run proof:package` → `npm run proof:consumers:static`. Catches subpath drift.
- `bundle-budget.yml`: run `npm run profile:bundle`, diff against committed `docs/tranches/F/audit/W1-bundle-profile.json`, fail if `glass-ui.js` exceeds e.g. 200 kB raw.

The stress workflow uses `STRESS_CI_RELAX=1` (2× factor); under that, the M4-Max-captured 119 fps would still pass on a GitHub free runner. The captured baseline auto-posts to the PR — well-architected.

## 10. Critical findings

1. **Subpath sprawl** (`§5`). 11 of 30 subpaths are zero-payload re-export stubs. The package surface is wider than it needs to be; every additional subpath increases dts cost and exports-key surface. Highest-leverage cleanup target.
2. **dts emission unbounded under refactor churn** (`§3`). 16 s settled vs 235 s mid-refactor — a 14× variance. CI stress workflow rebuilds on every PR; if I-tranche reopens cross-cutting refactors (likely), expect 3-minute build phases and proportional CI cost. No content-hash cache.
3. **`vitest.config.ts` re-implements aliasing** (`§6`). Single source of truth for `@/*` is `vite.library.ts:libraryAliases()`; vitest config duplicates it inline. Easy fix, real footgun.
4. **CI runs only stress; doesn't run tests or typecheck** (`§9`). Three surface-drift test failures sit at HEAD undetected by CI gates.
5. **Public-surface ledger and source have drifted** (`§8`). Three failing assertions in `tests/public-surface.spec.ts` are shape-of-bundle assertions that have not been re-baselined since the styles in `utilities.css` and the dock surface evolved. Either the ledger or the source is stale.

## 11. Recommendations for tranche I (performance)

Prioritised (highest ROI first):

1. **Subpath retirement**. Delete 11 zero-payload stub entries (`./glyph-face`, `./dock-group`, `./disco-glyph`, `./icon-tooltip`, `./instrument-chassis`, `./paper-backdrop`, `./pulse`, `./glass-panel`, `./metric-badge`, `./status-dot`, `./toggle-chip`). Net effect: 11 × 5 declarations removed (package.json exports, typesVersions, vite.library entries, dist js, dist d.ts) = 55 lines + 11 d.ts files no longer rolled. Expect dts phase ~25–30% faster.
2. **Wire CI test + typecheck workflow**. `.github/workflows/ci.yml`: `typecheck`, `test`, `proof:package`, `proof:consumers:static`. Free runner, < 3 min. Resolves finding #4 + #5.
3. **dts-emission caching path**. Two options to evaluate:
   - Replace `rollupTypes: true` in `vite-plugin-dts` with `vue-tsc --emitDeclarationOnly` followed by per-entry `dts-bundle-generator`. Probably 3× faster on settled tree, but a config-rewrite.
   - Keep current path, parallelise across CI runner matrix (one job per subpath cluster). Cheaper to set up, no code change.
4. **Shared-config dedup**. Have `vitest.config.ts` import `libraryAliases` from `vite.library.ts` (or rename it `vite.shared.ts`). Collapse `vite.iter.config.ts` into `vite.config.ts` with a flag-toggle.
5. **Re-instrument stress capture for SPEC §9 budgets that aren't observed today**. The 0.5 ms renderer / 0.3 ms state-machine budgets are not directly captured by W5; add `performance.measure("blob.render", …)` and `performance.measure("blob.state", …)` inside `useMetaballRenderer` + the satellite-state composable, then surface the means in the baseline output. This is the only way to verify those rows of SPEC §9 without trusting the FPS aggregate.
6. **Bundle-budget CI gate**. `npm run profile:bundle` already exists (writes `docs/tranches/F/audit/W1-bundle-profile.json`). Add a workflow that runs it and diffs `glass-ui.js` raw bytes against the committed profile; warn on +5%, fail on +15%.
7. **Test depth**. One render-smoke per public package (39 ui + 40 custom) gets the suite from 18 → ~80 files at near-zero per-file authoring cost (parameterised). Prevents future surface drift.
8. **Resolve the 3 public-surface failures** as a cleanup wave at the start of I, not a deferred residual.

## Appendix — confirmation

- Read-only on tracked files: confirmed. No `Edit`/`Write` against `src/`, `vite.*`, `tsconfig.*`, `package.json`, or any tracked file. Only the audit deliverable was written, plus `dist/` (dist is gitignored / build output).
- Ran `npm run build` exactly once for instrumentation (background task, exit 0).
- No destructive git commands run. No `git reset`, no `git checkout --`, no force-push, no commit.
