# AO audit — lane BETA: deferral + legacy + workaround inventory

Read-only sweep of what is LIVE in `src/` at HEAD (v2.1.0) plus the AN-window deferrals. Directive: fold chronically-deferred items into AO; no quick solutions, no workarounds, idiomatic gestalt, no legacy code.

## Headline

**One live inv-47 / L-inv-4 violation must DELETE in AO:** the `useSpringOrchestrator` / `UseSpringOrchestratorOptions` deprecation shim at `src/composables/motion/useSpringOrchestrator.ts`. It is a `@deprecated` back-compat export alias—exactly the artefact L invariant 4 ("no backwards-compat aliases") and inv 47 forbid. It survived as a "one-minor-version" courtesy from AL.W9-δ; the window is now stale (the rename shipped pre-2.0.0, the lib is at 2.1.0, and the only callers are demo-private stories). Its own JSDoc defers retirement to "v3.0", which is the deferral the directive says to fold forward. There is no production consumer gating it.

**Chronic survivors (≥2 tranches deferred):** one—the dts-build 8 GB heap baseline (chronic across the P.W4 bake and every release since; awaits an upstream vite-plugin-dts incremental-rollup fix).

**No commented-out code, no dead substrate beyond the 2 already-ARCHIVED AN items.** The "fallback"/"back-compat" CSS + composable hits are all legitimate canon (font-swap fallbacks, SSR guards, WebGL-unavailable degrade, single-slot robustness), not legacy residue.

## Classified inventory

| # | Item | Class | Location | Disposition → AO wave |
|---|---|---|---|---|
| 1 | `useSpringOrchestrator` + `UseSpringOrchestratorOptions` `@deprecated` re-export alias | (c) workaround/stopgap AND live (d) legacy residue → **DELETE** per inv 47 / L-inv-4 | `src/composables/motion/useSpringOrchestrator.ts` (whole file); `export *` line 14 of `src/composables/motion/index.ts`; comment refs at `src/motion.ts:19,37`, `src/index.ts:45` | **AO W-MOTION-PURGE**: delete the shim file, drop the barrel `export *`, migrate the 3 demo-private call sites (`demo/stories/motion/springs.vue`, `demo/stories/composables/use-spring-orchestrator.vue`, `demo/stories/manifest.ts`) + the shim test (`src/composables/__tests__/useNumericTransition.test.ts` cases 1-2) to `useNumericTransition`. SemVer-visible removal; clean break, no replacement alias. |
| 2 | dts-build 8 GB `NODE_OPTIONS=--max-old-space-size=8192` heap bump | (a) chronically-deferred / latent-debt-awaiting-upstream-fix | `CLAUDE.md §Build`; baked into the `build` script (P.W4 Lane A) | **Documented-baseline, NOT a workaround to delete.** Root cause (TypeScript + api-extractor per-entry type-graph walk over the 42-entry matrix, ≈6.7 GB peak RSS) is upstream in vite-plugin-dts; glass-ui cannot root-fix it without an upstream incremental-rollup landing (vite-plugin-dts ≥5.x). AO disposition: **CARRY as named latent-debt** with a retirement trigger (the upstream fix). Track it; do not author a glass-ui-side workaround. No source change. |
| 3 | Interruptible MetricStack reorder recipe | (b) AN-deferred — ARCHIVED-on-2-consumer-gate | `docs/tranches/AN/audit/W5-reorder-recipe.md` (writes no `src/`) | **Stays ARCHIVED.** Realisation condition unchanged: lands when ≥2 consumers declare a mid-drag (re-aim-while-pointer-down) reorder pattern. Zero realised consumers at HEAD. No AO wave unless the gate flips—fold only as a watched condition, not work. |
| 4 | Dock panel-host variant | (b) AN-deferred — ARCHIVED-on-2-consumer-gate | `docs/tranches/AN/audit/W6-dock-panelhost-chassis-phase.md` (writes no `src/`) | **Stays ARCHIVED.** Realisation condition: ≥2 consumers declare a tall-vertical-pane stacked-control pattern. `GlassDock` + `DockLayerGroup`/`DockLayer` cover every realised case. No AO wave unless gate flips. |
| 5 | vaul-vue re-snap limitation (open-sheet external `activeSnapPoint` write does not re-snap) | (e) annotated-historical / terminal — upstream, NOT a glass-ui bug | `CLAUDE.md` line 317; `docs/tranches/AN/audit/W3-drawer-detents.md §A.limitation` | **Terminal.** No glass-ui workaround was authored (correct per directive). Retires only on a vaul-vue upstream fix. No AO wave. |
| 6 | `@source` Option-B template-utility contract | NOT a workaround — legitimate canon (documented binding requirement) | `CLAUDE.md` line 348 + 360; `docs/tranches/AN/audit/W2-tailwind-utilities.md` | **Legitimate canon, terminal.** Option A (pre-generating utilities into the dist bundle) was rejected on payload + pipeline-fragility grounds; `@source` is the idiomatic Tailwind-v4 content-scan contract, same authority as the `tw-animate-css` import. This is the gestalt answer, not a stopgap. No AO wave. |
| 7 | InstrumentChassis `"scoring"` phase | (e) annotated-historical — DOCUMENTED ("ping" canon) | `CLAUDE.md` line 327; `docs/tranches/AN/audit/W6` | **Terminal.** `"ping"` is the canonical generic-active phase; a `"scoring"` member with no consumer would be overfit substrate. Disposition applied to CLAUDE.md. No AO wave. |

## Hits classified as legitimate canon (NO action)

The grep surfaced ~19 marker classes; after reading each, only items 1-2 above are debt. The remainder are correct idiom:

- **Font-swap fallbacks** (`src/styles/typography.css`, `fonts.css`, `tokens.css §0`): Capsize-calibrated `local()` fallback faces—a deliberate FOIT/CLS-avoidance mechanism, not legacy.
- **SSR / no-host guards** (`useTokenColor.ts`, `useViewportReady.ts`, `BouncyToggle.vue`): `typeof document === "undefined"` fallbacks—correct universal-rendering canon.
- **WebGL2-unavailable degrade** (`Aurora.vue`, `useGlassRenderer.ts` `"fallback"` tier, `GlassPanel.vue --fallback`): the documented visual-degrade path (HA4 §1.5), a feature not a stopgap.
- **`@supports` no-backdrop-filter fallbacks** (`glass.css`, `utilities.css`): progressive-enhancement canon.
- **Single-slot "back-compat"** (`utilities.css:402` metric-badge dual-slot): describes adjacent-sibling rendering robustness, not a version alias.
- **Clean renames with NO alias retained** (`installDarkModeSync` ex-`useDarkModeSync` O.W4; `/keyboard` + `/dark` ex-nested-subpath L.W1; `--meter-progress-gap` RETIRED at AM-W7-δ): these are the CORRECT pattern—renamed clean, no shim. They prove the codebase generally honours L-inv-4; item 1 is the lone exception.
- **`legacy` mentions in prose** (`glass.css:14` `-webkit-` emission note, `tokens.css:1007` "legacy button" historical aside): descriptive, no live legacy code.

## Counts per class

- (a) chronically-deferred (≥2 tranches): **1** (item 2 — dts 8 GB heap; latent-debt, CARRY).
- (b) AN-deferred: **2** (items 3, 4 — both ARCHIVED-on-2-consumer-gate; watched conditions, no AO work).
- (c) workaround/stopgap: **1** (item 1 — the deprecation shim; → DELETE).
- (d) legacy residue (DELETE): **1** (item 1, same artefact; it is both (c) and (d)).
- (e) annotated-historical / terminal: **3** (items 5, 6, 7).
- Legitimate-canon false-positives (no action): the balance of the ~19 grep hits.

## Live inv-47 / L-inv-4 violation (the one thing AO must DELETE)

`src/composables/motion/useSpringOrchestrator.ts` — a `@deprecated` back-compat export alias (`useSpringOrchestrator = useNumericTransition`, `UseSpringOrchestratorOptions = UseNumericTransitionOptions`). Forbidden by L invariant 4 / inv 47. Only consumers are demo-private. Delete the file, drop the `export *` from `src/composables/motion/index.ts:14`, migrate the 3 demo sites + 2 shim test cases, and scrub the "shim retires at v3.0" comments in `src/motion.ts` and `src/index.ts`. Clean break, no replacement alias—this is the idiomatic gestalt the directive demands.
