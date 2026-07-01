# BH PASS-1 SOTA-LIGHT research — build tooling + export conventions

**Lens:** SOTA-LIGHT CHECK (BH-relevant: build tooling, export conventions) · **Pass:** 1 (baseline) · **Date:** 2026-06-30
**HEAD:** `e550f1b0` · **Branch:** `tranche/BG` · siblings-intact verified (exit 0)
**Scope:** Since BH's plan was developed, what material changed in (a) Vite 8/Rolldown manualChunks conventions, (b) npm exports-field best practice, (c) Vue 3.5 / TS 6.0 patch releases relevant to the export-surface restructure. **Material deltas ONLY.**

The BH plan's own §1 asserts "Backbone currency is a non-issue: … vite 8 / Rolldown, ts 6.0 … all live-latest." That is TRUE at the version-floor level (the pins are current). But **three CONVENTION deltas** have landed since the plan's basis that touch BH's B2 (export restructure) + B4 (CLAUDE.md redistribution) + B5 (build-mechanism) bands. None blocks authoring; each is a small, mechanical amendment to an already-planned wave.

---

## DELTA-1 (HIGH, doc-correctness) — the CLAUDE.md `manualChunks` recipe is STALE; it redistributes into `docs/canon/` VERBATIM under B4

**What changed:** Vite 8.0 stable shipped 2026-03-12 as single-bundler Rolldown. The object form of `output.manualChunks` is **removed**; the function form is **deprecated**. The Rollup-compat path `build.rollupOptions.output` was renamed to `build.rolldownOptions.output` (and `esbuild`→`oxc`). Rolldown's fine-grained splitter is `output.advancedChunks` — but **`advancedChunks` is itself now deprecated** in favor of `output.codeSplitting` (with a `groups: [{ name, test, minSize }]` array; if both are set `advancedChunks` is ignored). ([Vite v7→v8 migration](https://vite.dev/guide/migration), [Rolldown advancedChunks](https://rolldown.rs/reference/outputoptions.advancedchunks), [Rolldown codeSplitting](https://rolldown.rs/reference/outputoptions.codesplitting))

**On disk (verified):**
- `CLAUDE.md:923-941` "### Vite 8 `manualChunks` recipe" gives the consumer copy-paste as `build.rollupOptions.output.manualChunks` and calls "`advancedChunks` … the Rolldown-native escape hatch." BOTH claims are now stale: the path is `rolldownOptions`, and `advancedChunks` is deprecated-in-favor-of-`codeSplitting`.
- `vite.config.ts:61-81` carries the SAME recipe as a live, build-verified reference — and its own prose comment (`:75`) tells consumers to "drop this recipe into their `build.rollupOptions.output`" (stale path) and "NEVER set `output.advancedChunks` … Rolldown IGNORES `manualChunks` when both are set" (true, but now points at a deprecated option). The library's OWN build uses `rolldownOptions.output.manualChunks` (function form — deprecated-but-working; every peer is `external` so the recipe is inert here, a consumer reference only).
- `CLAUDE.md:446` (design-axis 6) says "downstream Rollup `manualChunks` consumers" — the noun "Rollup" is now wrong (it's Rolldown).

**Why it bites BH:** B4c/B4b redistribute CLAUDE.md's live contracts into `docs/canon/` **before** B4f hard-deletes the file. If the redistribute is a verbatim copy, the stale recipe survives the delete into the new canonical home — a silent-loss-inverse (a stale-contract PROPAGATION). The `manualChunks` recipe is exactly the kind of "live contract" B4b is charged with preserving; preserving it stale is worse than dropping it.

**Amendment (small, mechanical):** When B4b redistributes the build/consumer-wiring prose into `docs/canon/build-and-gates.md` (BG's G6 already homes build+gates there — coordinate), REWRITE the recipe to the Vite-8-current form in the SAME edit:
- consumer path: `build.rolldownOptions.output` (not `rollupOptions`)
- prefer `output.codeSplitting` `groups` over `manualChunks` (function `manualChunks` still works but warns; `codeSplitting.groups` is the non-deprecated SOTA form)
- drop the "advancedChunks is the native escape hatch" sentence (advancedChunks → codeSplitting)
- fix `CLAUDE.md:446` noun Rollup→Rolldown (this line is redistributed too, or dies with the file)
- update the `vite.config.ts:61-81` comment block to match (it is the build-verified twin the doc points AT — the two must not diverge; a B1/B5 wave touching `vite.config.ts` is the natural home, or fold into B4b's redistribute).

This is a **doc/comment rewrite in an already-owned wave**, not a new wave. It does NOT change the library's own build output (the peers are external; the recipe is inert here).

---

## DELTA-2 (MEDIUM, gate-hardening opportunity) — 2026 TS-library CI standard adds `publint` + `@arethetypeswrong/cli`; glass-ui runs NEITHER

**What changed:** The 2026 baseline CI shape for any published TS library is now `npm pack` → `npx publint` → `npx @arethetypeswrong/cli --pack` — the two tools that catch exports-field / dual-condition / .d.ts-resolution breakage that `tsc` and a runtime import-probe both miss. ([exports guide, Hiroki Osame](https://hirok.io/posts/package-json-exports); the "2026 CI standards" note in [package.json exports best-practice](https://www.newline.co/courses/bundling-and-automation-in-monorepos/packagejson-exports-and-conditions))

**On disk (verified):** grep of `package.json` scripts + `scripts/*.mjs` + `.github/workflows/*.yml` for `publint`/`arethetypeswrong`/`attw` = **0 hits**. glass-ui's export-surface correctness is proven by `verify-export-types` (a runtime `import()` + tsc consumer-probe per subpath) + `public-surface.spec` + `proof:subpath-enumeration` — a good custom stack, but it does NOT catch the class publint/attw specialize in (condition-order regressions, masquerading-CJS, `.d.ts` that resolves under `bundler` but not `node16`).

**Why it bites BH:** B2 is the LARGEST band — it deletes `src/subpaths/` (79 barrels), folds `/api`, and regenerates `package.json` exports from scratch against the post-WS12 surface. That is the single highest-risk exports-field edit in the tranche's history, and it lands with NO standing tool that specializes in exports-field correctness. The plan's §5 residual-1 already flags "symbol-set fidelity is binding only post-build" — publint/attw are exactly the post-build validators that close that residual mechanically.

**Amendment (optional, low-cost):** Add `npx publint` + `npx @arethetypeswrong/cli --pack` to the B2.1-swap gate (or as a new `proof:exports-sound` in the RELEASE set). Both run against the built `dist/` with zero config, catch the 5.0.0 exports regen if it drifts condition order or emits an unresolvable `.d.ts`, and are the 2026 industry-standard belt-and-suspenders on top of glass-ui's custom stack. glass-ui's current exports condition order is CORRECT (`types`→`import`→`default` on root, `types`→`import` on subpaths — verified), so these adopt clean (they'd pass today) — the value is REGRESSION-CATCHING through the B2 regen, not a fix for a current break.

---

## DELTA-3 (MEDIUM, must-verify-at-execution) — TS 6.0's `types` default `[]` + `--stableTypeOrdering` + declaration-emit ordering affect the `emit-types` dts arm B2.1 re-authors

**What changed:** TS 6.0 (installed here: `typescript@6.0.3`, `vue-tsc@3.3.5` — both current, verified) introduces:
1. **`compilerOptions.types` now defaults to `[]`** (was: pull in all `@types/*` in scope) — a project relying on ambient `@types` auto-inclusion can lose types silently.
2. **Declaration-emit is order-sensitive** — TS assigns type IDs in encounter order and sorts unions/properties by them, so **the order symbols are declared can change the emitted `.d.ts` byte-for-byte**. A new `--stableTypeOrdering` diagnostic flag exists to smooth 6.0→7.0 migration (adds up to ~25% typecheck slowdown — diagnostic-only, not a keeper). ([TypeScript 6.0 release notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html), [TS 5→6 migration](https://gist.github.com/privatenumber/3d2e80da28f84ee30b77d53e1693378f))

**On disk (verified):** `tsconfig.json` sets `types: ["vite/client","node"]` EXPLICITLY (so the `[]`-default change is already neutralized — no action, but do NOT delete that line thinking it's redundant; under TS6 it is load-bearing). `tsconfig.build.json` extends it, sets `emitDeclarationOnly`+`declaration`, and (per CLAUDE.md §Build) the `perf-producer` note claims the `emit-types` arm runs `incremental` for a byte-identical warm re-emit.

**Why it bites BH:** B2 does the largest declaration-emit reshape in the tranche — it deletes `src/subpaths/`, moves the 11 curated flat barrels to `src/entries/`, and **re-authors `flatten-subpath-types.mjs`** for the new colocated dts emit (plan §5 residual-3: "specced, not yet built, owed at B2.1"). Because TS 6.0 declaration emit is ORDER-SENSITIVE, moving/renaming the barrel files can produce a **byte-different `.d.ts`** even when the public type SET is identical — which will red any gate that byte-compares dts output (the `perf-producer` "d.ts byte-identical" claim, and any `diff -r dist_before dist_after` gate B2.6/B2.3 rely on).

**Amendment (verify-at-execution, not a design change):**
- When B2.1 re-authors `flatten-subpath-types.mjs`, the acceptance bar is **type-SET fidelity** (publint/attw/verify-export-types + the 203-row map), NOT `.d.ts` byte-equality — the plan's own §5 residual-2 already says fidelity is symbol-set-based, so this is a REINFORCEMENT: do not let a byte-diff gate block a semantically-identical dts reshape. If a byte-compare gate exists on the dts path, it must be relaxed to a symbol-set compare for the B2 moves (or the re-author must sort-stabilize its emit).
- Keep `tsconfig.json`'s explicit `types: [...]` — under TS6 it is no longer redundant.

---

## Non-deltas (checked, NO material change — recorded so PASS 2 does not re-investigate)

- **Version floors are all current:** vite `8.0.13`, typescript `6.0.3`, vue-tsc `3.3.5`, vitest `4.1.9`, tailwind `4.3.1`, reka `^2.0`, vueuse `^14.0`, vue `^3.5` (latest patch line 3.5.38/3.5.39 as of late-June 2026). The plan's §1 "live-latest" claim holds. No floor bump owed.
- **Exports condition ORDER is already correct** (`types` first everywhere) — the #1 2026 best-practice. The B2 regen must PRESERVE this (the `regen-exports-failclosed.mjs` template already emits `{ types, import }` / `{ types, import, default }` — verified in the plan's §6 tooling). No order fix owed; just don't regress it.
- **`sideEffects: ["*.css"]`** is present and correct (tree-shaking safe for the JS, CSS preserved) — no change.
- **Dual-package (ESM+CJS) concerns do NOT apply** — glass-ui is `type: module`, ESM-only, no `require`/`.d.cts` surface. The dual-package hazard the 2026 exports guides warn about is a non-issue here.
- **`vue-tsc` 3.3.x supports TS 6.0** (requires TS ≥5.0) — the `emit-types` arm's tsc pin is compatible; no vue-tsc bump owed.

---

## Friction-history cross-check (SOTA angle)

- The DELTA-1 stale recipe is a **Class-B/Class-doc friction** (orphaned-claim / doc-drift) instance the BG friction taxonomy names generically — a live contract that says something now false. It is exactly the kind of prose B4's "redistribute the LIVE contracts" charge must not carry forward stale. It ALSO recurs the "a wave lands the surface change but not the consumer-side adaptation" shape SEED-CONTEXT flags: the codebase moved to Rolldown/`rolldownOptions` in its OWN config but never updated the CONSUMER-facing recipe it publishes.
- DELTA-2/DELTA-3 are **not friction recurrences** — they are net-new SOTA-baseline shifts (TS6 stable, the publint/attw CI norm hardening) that arrived after the plan's basis; recording them PRE-empts a "why did the B2 regen red on a byte-diff" or "why did node16 resolution break for a consumer" execution surprise.

---

## Verdict

**Three material deltas, all small mechanical amendments to already-owned waves — none is a new wave, none blocks authoring.**
- **DELTA-1** (HIGH doc-correctness): rewrite the stale `manualChunks` recipe (CLAUDE.md:923-941 + :446 + vite.config.ts:61-81 comment) to Vite-8-current (`rolldownOptions`/`codeSplitting.groups`) inside B4b's redistribute + a B1/B5 config-comment touch — else B4 propagates a stale contract into `docs/canon/`.
- **DELTA-2** (MEDIUM gate-hardening): add `publint` + `@arethetypeswrong/cli --pack` to B2.1-swap's gate (or mint `proof:exports-sound`) — the 2026 exports-correctness belt the B2 regen currently lacks.
- **DELTA-3** (MEDIUM verify-at-exec): B2.1's `flatten-subpath-types.mjs` re-author must gate on type-SET fidelity, not `.d.ts` byte-equality (TS6 emit is order-sensitive); keep `tsconfig.json`'s explicit `types: [...]` (no longer redundant under TS6).

---

## Sources

- [Migration from v7 | Vite](https://vite.dev/guide/migration)
- [Rolldown — advancedChunks (deprecated → codeSplitting)](https://rolldown.rs/reference/outputoptions.advancedchunks)
- [Rolldown — codeSplitting](https://rolldown.rs/reference/outputoptions.codesplitting)
- [Rolldown — Manual Code Splitting](https://rolldown.rs/in-depth/manual-code-splitting)
- [Guide to the package.json `exports` field — Hiroki Osame](https://hirok.io/posts/package-json-exports)
- [package.json exports and conditions — newline (2026 CI standards)](https://www.newline.co/courses/bundling-and-automation-in-monorepos/packagejson-exports-and-conditions)
- [Modules: Packages | Node.js v26 docs](https://nodejs.org/api/packages.html)
- [Announcing TypeScript 6.0 | TS release notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html)
- [TypeScript 5.x → 6.0 Migration Guide](https://gist.github.com/privatenumber/3d2e80da28f84ee30b77d53e1693378f)
- [Releases | Vue.js](https://vuejs.org/about/releases)
- [vue-tsc — npm](https://www.npmjs.com/package/vue-tsc)
