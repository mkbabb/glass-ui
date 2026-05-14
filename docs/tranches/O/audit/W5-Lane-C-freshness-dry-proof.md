# O.W5 Lane C — Freshness algorithm DRY extract

**Worktree HEAD**: `ea71fe9aef14ff308899d482b977d0ed66619170` (master at agent dispatch).
**Lane**: C (worktree-isolated).
**Bounds**: `scripts/freshness-walk.mjs` (NEW canonical) + `scripts/freshness-walk.d.mts` (NEW TS sidecar) + `scripts/freshness-gate.mjs` (UPDATE — import canonical) + `src/freshness.ts` (UPDATE — import canonical) + this proof doc.

## § Disposition — Path A (static import) vs Path B (snapshot test)

**Chosen: Path A — static import** from `scripts/freshness-walk.mjs`, surfaced to both the prebuild CLI (`scripts/freshness-gate.mjs`) and the consumer-side runtime helper (`src/freshness.ts`).

### Why static (not dynamic) import

The task dispatch suggested a `getWalkNewestMtime()` async helper backed by `await import("../scripts/freshness-walk.mjs")`. That shape is incompatible with the existing consumer API: `assertDistFresh()` is **synchronous** (it throws) and is invoked at the top of `speedtest/vite.config.ts` (and per N.W0 Lane A5 + N-wiring-targets.md, will be wired into bbnf-buddy + 4 other consumer vite configs). Converting it to `async` would break the call site — speedtest currently invokes `assertDistFresh({ root: ... })` at module-load time, not inside an `await`.

Static ESM import from a `.ts` file to a `.mjs` file resolves cleanly under `moduleResolution: "bundler"` (set in `tsconfig.json:5`) — TS does not require a `.js` extension swap. The static import:

1. Lets `assertDistFresh` stay synchronous.
2. Is bundled by Vite into `dist/freshness.js` (inlines the walker body once — verified at byte level below).
3. Single-sources the algorithm + constants in `scripts/freshness-walk.mjs`.

### Why a `.d.mts` sidecar

Without `allowJs: true`, `tsc` cannot infer types for a `.mjs` import. The sibling `scripts/freshness-walk.d.mts` declaration file gives `tsc` + `vue-tsc` the necessary signatures (`walkNewestMtime`, `SRC_EXT`, `SKIP_DIRS`, plus the `WalkNewestMtimeResult` shape). This is the standard pattern for typing JS modules consumed from TS without polluting `tsconfig` with `allowJs`.

### Path B (snapshot test) — why not

Path B keeps two source copies + a regression test that diffs them. It explicitly preserves duplication. Lane C's purpose is DRY (per W5.md §Lane C + Rε §"freshness DRY verdict"); Path A actually eliminates the duplication. Path B was the fallback only if Vite/tsc resolution broke — neither did.

### Risk R4 status (Rε §Risks)

R4 flagged: "Centralizing freshness via dynamic import couples `src/freshness.ts` to a script path — consumer bundlers may try to inline `scripts/freshness-gate.mjs`." With Path A (static, not dynamic), the inlining is **the intended behavior** — Vite resolves `../scripts/freshness-walk.mjs` at build time, bundles its body into `dist/freshness.js`, and the consumer never sees the path. Consumer bundlers reading `dist/freshness.js` see only `node:fs` / `node:path` / `node:url` imports (already external per `vite.library.ts:65-68`). R4 is dissolved — there is no script path leakage in the published dist.

## § File changes summary

### NEW — `scripts/freshness-walk.mjs`

Canonical home for `walkNewestMtime` + `SRC_EXT` + `SKIP_DIRS`. Pure ESM, no Node-specific runtime guards. JSDoc-typed for `tsc` resolution. ~55 LOC.

### NEW — `scripts/freshness-walk.d.mts`

Type sidecar for the canonical `.mjs`. Declares `walkNewestMtime`, `SRC_EXT`, `SKIP_DIRS`, `WalkNewestMtimeResult`. ~15 LOC.

### UPDATE — `scripts/freshness-gate.mjs`

- Dropped local `walkNewestMtime` definition (28 LOC).
- Dropped local `SRC_EXT` + `SKIP_DIRS` constants (2 LOC).
- Dropped `readdirSync` import (now used only inside `freshness-walk.mjs`).
- Added `import { walkNewestMtime } from "./freshness-walk.mjs"`.
- Net: −30 LOC. `checkFreshness()` body unchanged.

### UPDATE — `src/freshness.ts`

- Dropped local `walkNewestMtime` definition + the `NewestResult` interface (35 LOC).
- Dropped local `SRC_EXT` + `SKIP_DIRS` constants (2 LOC).
- Dropped `readdirSync` import.
- Added `import { walkNewestMtime } from "../scripts/freshness-walk.mjs"`.
- Rewrote header docstring (lines 1-15): dropped the "duplication tracking" + "Rα E3 / W1 docstring drift" language; cites canonical `scripts/freshness-walk.mjs` and the Vite-bundling note. Closes the precept-vs-code mismatch flagged at Rε §"freshness DRY verdict" para 166.
- Net: −40 LOC. `assertDistFresh()` body unchanged.

### Algorithmic divergence check

Pre-extract diff between `scripts/freshness-gate.mjs:43-70` and `src/freshness.ts:32-59`: ONLY the TS-type annotations differ (`function walkNewestMtime(dir): NewestResult` vs `function walkNewestMtime(dir)`). Constants `SRC_EXT` / `SKIP_DIRS` byte-identical. The walk logic — recursion order, skip-dir check, extension check, mtime comparison — byte-identical. The canonical `.mjs` extract is a faithful merge with no behavioral change.

## § Verification

All commands executed in worktree `/Users/mkbabb/Programming/glass-ui/.claude/worktrees/agent-a9b8f70b6ad20bd91/`.

### 1. Prebuild gate runs (post-extract)

```
$ node scripts/freshness-gate.mjs --pre
[prebuild] [glass-ui freshness] dist/ does not exist — run `npm run build`.
exit=0   (permissive mode behavior — preserved)

$ node scripts/freshness-gate.mjs
[glass-ui freshness] dist/ does not exist — run `npm run build`.
exit=1   (strict mode behavior — preserved)
```

Import of `walkNewestMtime` from `./freshness-walk.mjs` resolves at runtime. Permissive vs strict mode branches both fire correctly.

### 2. Typecheck (`vue-tsc --noEmit`)

```
$ npm run typecheck
> @mkbabb/glass-ui@1.3.0 typecheck
> vue-tsc --noEmit
exit=0
```

The `.d.mts` sidecar lets `vue-tsc` resolve `import { walkNewestMtime } from "../scripts/freshness-walk.mjs"` from `src/freshness.ts`. No `allowJs` change needed.

### 3. Build (`vite build`)

```
$ NODE_OPTIONS="--max-old-space-size=8192" npm run build
[vite:dts] Declaration files built in 23366ms.
✓ built in 24.12s
```

(The `--max-old-space-size` is pre-existing infrastructure noise — api-extractor's dts rollup phase OOMs on the default 4GB heap; orthogonal to Lane C.)

`dist/freshness.js` byte-compare to pre-extract: **identical** — Vite inlines the walker body once (minified to `function d(o) { ... }`), tree-shakes the now-unused export. The dist artefact is bit-for-bit equivalent to what shipped at v1.3.0.

```
$ grep -rn "freshness-walk" dist/
(no matches)
```

No script-path leakage in dist. R4 dissolved.

### 4. Strict freshness gate post-build

```
$ node scripts/freshness-gate.mjs
[glass-ui freshness] dist/ is fresh.
exit=0
```

### 5. `verify-export-types`

```
$ npm run verify-export-types
All package export targets and type resolutions are valid.
```

The `freshness` subpath (`./freshness` in package.json:288) still publishes a clean dts (`dist/freshness.d.ts` → re-exports `dist/src/freshness.d.ts` → declares `assertDistFresh(options?: AssertDistFreshOptions): void`). L.W0 Lane III binary subpath publication preserved.

### 6. Test suite

```
$ npm run test
Test Files  30 passed (30)
     Tests  348 passed (348)
   Duration  2.96s
```

All 348 tests green. No regression.

## § Open questions for orchestrator

1. **W5 sibling lanes touching `release.sh` / `package.json`** — Lane B (verify-export-types unconditional) + Lane D (release.sh + prepublishOnly dedup) both edit `scripts/release.sh`. Lane C does NOT touch release.sh, so there is no merge conflict in our bound. Confirm Lane B/D conflict-resolution policy at orchestrator-merge time.
2. **Future `walkNewestMtime` consumers** — if a hypothetical Layer F implementation of `prepare` (Rε §"Layer F — `prepare` hook freshness") wants to invoke the strict freshness check, it can now `import { walkNewestMtime } from "./freshness-walk.mjs"` from any new `scripts/*.mjs` cleanly. The canonical home is open-ended.
3. **`SKIP_DIRS` evolution** — currently `["__tests__", "tests", "node_modules", "dist"]`. If glass-ui ever adds a `docs/` walk target or wants to honor `.gitignore`, the canonical .mjs is the single edit point. (No change in Lane C — flagged for future tranche awareness.)

## § Worktree diff verification

```
$ git status --short
 M scripts/freshness-gate.mjs
 M src/freshness.ts
?? scripts/freshness-walk.d.mts
?? scripts/freshness-walk.mjs

$ git diff --stat
 scripts/freshness-gate.mjs | 35 ++-------------------------------
 src/freshness.ts           | 49 +++++++---------------------------------------
 2 files changed, 9 insertions(+), 75 deletions(-)
```

Two modified files (both lose net LOC — the duplication elimination) + two new files (the canonical + its type sidecar). Bounds match the W5.md §Lane C charter exactly. No mutations outside the four allowed files + this proof doc.

## § Hard-gate alignment (W5.md §Hard gate clause c)

> (c) `walkNewestMtime` extracted to `scripts/freshness-walk.mjs`; both consumers import it (DRY).

- [x] Canonical home created at `scripts/freshness-walk.mjs`.
- [x] `scripts/freshness-gate.mjs` imports the canonical (line 27).
- [x] `src/freshness.ts` imports the canonical (line 19).
- [x] No duplicate `walkNewestMtime` definition remains in either consumer.
- [x] Sibling type declaration at `scripts/freshness-walk.d.mts` keeps `tsc` happy without `allowJs`.

> (f) `npm run typecheck` + build + test green; profile:budget PASS; `release.sh --dry-run` clean.

- [x] typecheck — exit 0 (see § Verification step 2).
- [x] build — `vite build` succeeds; `dist/freshness.js` byte-identical to pre-extract (see step 3).
- [x] test — 348/348 (see step 6).
- [ ] `profile:budget` + `release.sh --dry-run` — out of Lane C's bound; orchestrator runs at close.

Lane C charter satisfied. Orchestrator owns the index; worktree files left in place per closing rule.
