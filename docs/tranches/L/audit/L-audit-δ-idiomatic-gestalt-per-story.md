# L Post-close Audit Lane δ — Idiomatic-gestalt + per-story consumption sweep

**Date**: 2026-05-12.
**Lane**: δ (4 of 7 — strengthened post-close audit).
**Bounds**: read-only. Walk every L-introduced CVA / utility / token / sub-tree restructure for idiomatic-gestalt fidelity (clean breaks, no legacy code, no workarounds), plus a per-story consumption sweep verifying canonical-vocab adoption.
**Reading order observed**: `docs/tranches/L/L.md` invariants 4 + 7; `docs/tranches/L/audit/W{0..7}-*-proof.md`; `src/api/index.ts`; `src/{dark,keyboard,carousel}.ts`; `src/composables/{dark,keyboard,reactive,dom,motion}/index.ts`; `src/styles/tokens.css` `--surface-tint-{35,40,70}`; `src/styles/animations.css` lifted keyframes; `src/components/custom/configurator/useConfiguratorState.ts` (cloneMode); every `demo/stories/**/*.vue` (135 files).

---

## §1 — Gestalt fidelity table

L change → fidelity check → severity. P0 = breaks invariant 4/7; P1 = idiomatic-gestalt deviation worth fixing in M; P2 = cosmetic; P3 = trivial.

| # | L change (wave) | Surface inspected | Fidelity check | Finding |
|---|---|---|---|---|
| G1 | W1.A root-barrel curation | `src/index.ts:1-161` | Canonical v1.0 surface (no transitional shim); explicit per-package re-exports replace `export * from "./components/ui"` wildcard; comment block documents the 3-layer shape + the 23-package cherry-pick rationale | **PASS** — comment block is canonical-aware (cites Rε §B.2.2 + W1 wave doc); zero `// formerly known as` / `// TODO removed at v…`; no legacy aliases. |
| G2 | W1.B `src/api/` discovery layer | `src/api/index.ts:1-91` | Pure-types/constants re-export aggregator; never declares its own types; explicit accept/reject rationale in the leading comment | **PASS** — types track canonical homes (Aurora/Configurator/Metaballs/Surface enums/CVA variants); explicit "NOT in scope" enumeration prevents drift. |
| G3 | W1.C flat-subpath rename (`/dark`, `/keyboard`, `/carousel`) | `src/dark.ts`, `src/keyboard.ts`, `src/carousel.ts` | Pure thin re-export barrels; clean break from `composables/dark` / `composables/keyboard` (per `node` retired-subpath probe in W1-C proof: `ERR_PACKAGE_PATH_NOT_EXPORTED`); no transitional dist aliases (`dark-subpath`/`keyboard-subpath` gone) | **PASS** — `package.json exports` clean (`grep "composables/dark\|composables/keyboard\|dark-subpath\|keyboard-subpath" package.json` → empty). |
| G4 | W2.A composables/ restructure | `src/composables/{dark,keyboard,reactive,dom,motion,glass,sortable,sidebar}/index.ts` | Sub-tree barrel shape consistent (every sub-tree has its own `index.ts`); retired shims (`useGlobalDark.ts`, `useKeyboardShortcuts.ts`, `dark.ts`, `keyboard.ts` top-level impls) cleanly deleted; internal imports re-routed to sub-tree barrels (`useTokenColor` → `../dark`; `useDarkModeSync` → `../dark`; `useTouchGate` → `../reactive/useTimer`) | **P2 cosmetic** — `motion/index.ts` uses explicit-named exports (`export { useStaggerReveal } from ...`) while `dark/keyboard/reactive/dom/index.ts` use `export *`. Internal style mismatch; both legal. Rationale plausibly is that `motion/` co-exports types beside runtime, but the rationale is unstated. |
| G5 | W2.A composables/index.ts internal barrel | `src/composables/index.ts:1-32` | Walks dark/ + keyboard/ + reactive/ + dom/ + motion/ + glass/ + sortable/ + sidebar/ + co-located `infinite-scroll/composables`; clear comment that root barrel filters dark/keyboard | **PASS** — comment block names the SCC-trap reason; sub-tree shape is uniform. |
| G6 | W2.B src/index.ts cohesion docs | `src/index.ts:1-78` comment block | Documents 3 import layers + cherry-pick acceptance bar (a/b/c) + 23 explicitly excluded packages | **PASS** — text matches the actual surface; acceptance bar is empirical (matches the 7 packages re-exported). |
| G7 | W2.B styles cascade-order docs | `src/styles/index.css:11-50` (per W2-B-proof § B.5.1) | 16-file cascade with per-layer rationale | **PASS** — claimed in proof; spot-check shows tokens → typography → theme → glass → paper → component utilities → component tail order matches the actual `@import` sequence. |
| G8 | W3.A composables wire-or-retire | `src/composables/{pagination,virtual}/` retired; `useRAFLoop` / `useIntersectionPause` / `useDarkModeSync` retained on cross-repo evidence | Retired sub-trees + their dist subpaths (`/pagination`, `/virtual`) cleanly removed from `package.json exports`, `vite.library.ts`, `tests/composables.smoke.spec.ts` | **PASS** — `find src/composables/ -name pagination -o -name virtual` returns nothing; no orphan exports. |
| G9 | W3.B primitives wire-or-retire | `<DockShowcaseFrame>` retired; `<DiscoGlyph>` / `<DockGroup>` / `<InstrumentChassis>` wired with 2nd consumers | `grep "DockShowcaseFrame" src/ demo/` → 0 hits; new 2nd consumers visible at `chart-chassis-palette.vue` (DiscoGlyph), `dashboard.vue` (DockGroup), `chart-chassis-palette.vue` (InstrumentChassis) | **PASS** — CLAUDE.md "Demo storybook chassis" list at this audit's read no longer contains DockShowcaseFrame. |
| G10 | W5/K R4 — `--surface-tint-{35,40,70}` rungs | `src/styles/tokens.css:198-204` | Added with cross-link to W5 proof; consumers at `glass.css:220`, `Slider.vue:163`, `UnderlineTabs.vue:110`, `GlassTimeline.vue:172` use the tokens (NOT raw `color-mix(...foreground, {35,40,70}%, transparent)`); `grep` for raw 35/40/70 percentage `color-mix(...foreground, ...)` returns only the token DEFINITIONS in tokens.css | **PASS** — clean break; vocabulary canonical. No raw expressions remain. |
| G11 | W7.A keyframes lift | `src/styles/animations.css:171-199` (pulse-dot-bounce, pulse-ring-spin, typewriter-blink) | Bodies byte-identical to retired Pulse / TypewriterText inline `@keyframes`; `tw-cursor-blink` cleanly renamed to `typewriter-blink` (no legacy alias kept in scoped CSS); `grep "tw-cursor-blink"` in src/ → 0 live hits (only `.claude/worktrees/` archives) | **PASS** — clean rename consistent with L invariant 4. |
| G12 | W7.B `useConfiguratorState<T>` `cloneMode` | `src/components/custom/configurator/useConfiguratorState.ts:104-227` + `index.ts:8-13` | New `cloneMode: "commit-on-write" \| "per-preset"` extends generic state machine; `defaultClone` hardened with `toRaw` (Vue-proxy unwrap before `structuredClone`); `cyclePreset(direction?: 1 \| -1)` signature additive; `useAuroraStudio` deleted (Option I — no shim) | **PASS** — extension is additive on the existing canon, not a parallel substrate; `index.ts` re-exports `ConfiguratorCloneMode` alongside the existing surface; aurora story now consumes the unified state. |
| G13 | W7.B `useAuroraStudio` retirement | `demo/stories/aurora/useAuroraStudio.ts` deleted | 2 remaining `useAuroraStudio` text refs in `aurora.vue` (block-comment historical reference only; no functional callsite); no `src/` reference at all | **P3** — the 2 block-comment refs naming the retired composable are explanatory (closes the K cross-tranche-debt note). Could be re-worded to "the prior parallel state machine" to fully scrub the symbol name, but defensible as historical context. |
| G14 | `ModalOverlay.vue` `layout="edge"` | `src/components/ui/_shared/ModalOverlay.vue:16,44-47,71` | Comment self-describes `edge` as "legacy alias" for `centered`, reserved for future right/bottom edge-pinned overlays | **P2** — the comment uses the words "legacy alias" but the prop value maps to `""` (no-op); this is a *forward*-reserved alias, not a backwards-compat shim. The wording in the comment conflicts with L invariant 4's "no legacy aliases" framing. Either rename the comment to "reserved alias" (clarifies intent) or drop the alias until a real edge-pinned consumer materialises (KISS). Not a v1.0 break — pre-dates L. |
| G15 | `useStoryDemo` lift to `demo/composables/` | `demo/composables/useStoryDemo.ts` exists; not exported from `src/composables/index.ts` | Demo-private posture enforced by file location per CLAUDE.md | **PASS** — clean break from `src/composables/useStoryDemo.ts` shim. |

**Summary**: 0 P0, 0 P1, 2 P2 (G4 `motion/index.ts` style mismatch; G14 `ModalOverlay` "legacy alias" wording), 1 P3 (G13 block-comment vestige). The L tranche's idiomatic-gestalt fidelity is materially clean — every retire is cleanly broken (no transitional alias surfaces, no `// formerly known as` markers, no `// TODO remove at vN+1` debt comments).

---

## §2 — Per-story consumption sweep

**Method**: 135 `demo/stories/**/*.vue` files walked. For each: (a) every import path inspected, (b) imports cross-referenced against the canonical L-restructured shape, (c) reach-into-internal paths flagged.

**Canonical-vocab note**: glass-ui demo stories are intentionally NOT exercising the published `@mkbabb/glass-ui/*` subpaths. Stories import from `../../src/` relative paths (vite/tsconfig include both `src/` and `demo/` in a single graph; tested at `grep -rn "@mkbabb/glass-ui" demo/stories/` → 0 functional import sites; 2 prose mentions). The "v1.0 canonical pattern" for the demo is therefore: import from the canonical `src/` location matching the W2 restructure — i.e. composables via sub-tree paths (`src/composables/dom/useTokenColor`, etc.), components via package barrels (`src/components/<ui|custom>/<pkg>`).

### Aggregate findings

| Pattern | Result |
|---|---|
| Retired top-level composable paths (e.g. `src/composables/useGlobalDark`, `useTimer`, `useStagger`, `useStoryDemo`) | **0** — `grep "src/composables/(useGlobalDark\|useKeyboard\|useInterval\|useTimer\|useResizeObserver\|useTouchGate\|useTokenColor\|useStagger['\"]\|useStoryDemo\|dark\\.\|keyboard\\.)" demo/stories/` returns empty. |
| Retired nested subpath imports (e.g. `composables/dark`, `composables/keyboard`) | **0** outside the canonical sub-tree barrels — the 5 hits for `composables/dark` and `composables/keyboard` all resolve to sub-tree `index.ts` (correct shape). |
| Reach-into-internal paths (e.g. `src/components/custom/dock/composables/`, `_shared/`, `aurora/composables/`) | **0** in stories. |
| Direct `.vue` file imports bypassing the package barrel | **1** site (G16 below). |
| Consumption of retired primitives (`DockShowcaseFrame`, `useOffsetPagination`, `useVirtualSection*`, `useWindowedStore`, `useAuroraStudio`) | **0** — `grep` returns no consumer callsites (only doc/comment refs). |
| Retired keyframe name `tw-cursor-blink` | **0** in src/ + demo/ (only inside `.claude/worktrees/` archives). |
| Demo-private `useStoryDemo` consumption path | 1 awkward path (G17 below). |

### Per-story findings table

| # | Story | Canonical-import? | Violation / Note |
|---|---|---|---|
| G16 | `demo/stories/primitives/dock-group.vue:5` | NO | Imports `MetricBadge` from `.../src/components/custom/metric-badge/MetricBadge.vue` (the SFC file) instead of the package barrel `.../src/components/custom/metric-badge`. The barrel exports `MetricBadge` as a named export; the consumer uses default-import (`import MetricBadge from ...`). **P3** cosmetic — works at runtime/typecheck but breaks the canonical "import from package barrel via named export" idiom. Repair = `import { MetricBadge } from "../../../src/components/custom/metric-badge";`. |
| G17 | `demo/stories/composables/use-story-demo.vue:8` | PARTIAL | Imports from `../../../demo/composables/useStoryDemo` — structurally weird: from `demo/stories/composables/`, going up 3 levels lands at repo root, then descending into `demo/composables/`. Canonical relative would be `../../composables/useStoryDemo` (same destination, 2 segments shorter). **P3** cosmetic. |
| G18 | `demo/stories/composables/use-token-color.vue:5` | CANON | Imports from `.../src/composables/dom/useTokenColor` (leaf file path) rather than the `dom/` sub-tree barrel. Both legal; the leaf-file form is canonical for *imports of a specific symbol* and the barrel form is canonical for grouped imports. Not a violation, but inconsistent with stories that go through the barrel (e.g. `use-scroll-progress.vue:8 import from .../motion/useScrollProgress` vs `use-stagger-reveal.vue:7 import from .../motion/useStaggerReveal` vs `compositions/dock-with-slider.vue` patterns). Note for M / future cleanup pass. |
| G19 | Stories importing from `motion/` sub-tree | MIXED | 12 sites import from `motion/<leaf>` (e.g. `motion/useScrollProgress`, `motion/useRAFLoop`); 3 sites import from the barrel `motion` (e.g. `motion/index` exports). Both resolve; the leaf form is more tree-shake-friendly but inconsistent. Cosmetic; aligns with G18. |
| G20 | All 13 `demo/stories/composables/use-*.vue` files | CANON | Each consumes from a single canonical sub-tree path after W2.A restructure (e.g. `use-dark-mode-sync.vue` → `motion/useDarkModeSync`; `use-token-color.vue` → `dom/useTokenColor`; `use-keyboard-shortcuts.vue` → `keyboard`). No retired paths. |
| G21 | `demo/stories/aurora.vue:10` `registerShortcut` | CANON | Imports from `../../src/composables/keyboard` (the canonical sub-tree barrel). Correct shape. |
| G22 | All `demo/stories/foundations/*.vue` | CANON | No reach-into-internal; surface-tint-{35,40,70} not consumed directly (foundations stories surface the token *names* as data, not consume them in styles). |
| G23 | All `demo/stories/aurora/**/*.vue` (AuroraStage, AuroraConfigDock, PresetPickerRow, OklchStopRow, NucleiOverlay, config/{Composition,Flow,Medium,Nuclei,Palette,Texture}Layer.vue) | CANON | All component imports go through package barrels (`src/components/custom/aurora`, `src/components/ui/slider`, etc.); aurora-domain assets (`./aurora/presets`, `./aurora/usePresetThumbnails`) resolve story-internally; no reach into `src/components/custom/aurora/presets` or composables internals. |
| G24 | `demo/stories/StoryPage.vue`, `StorySection.vue`, `ShowcaseFrame.vue`, `TokenLadder.vue`, `ToneSwatch.vue` | CANON | Demo-private chassis primitives import from `src/components/ui/tooltip`, `src/utils/cn`, and a story-internal `../composables/useStoryNavigation`. No public-surface violations. |
| G25 | `demo/stories/compositions/*.vue` | CANON | 8 compositions (auth-shell, dashboard, dock-with-slider, empty-states, hero, instrument-chassis, math-paper, settings). All imports go through package barrels; `dock-with-slider.vue` correctly imports `Slider` from the `ui/slider` barrel and `GlassDock` + `DockIconButton` from the `dock` barrel (the canonical bidirectional slider-dock contract surface). |

### Stories that consume retired symbols

**0**. The W3 retire-or-wire wave was clean. Three previously-existing demo stories (`use-offset-pagination.vue`, `use-virtual-section-window.vue`, `use-windowed-store.vue`) were deleted alongside their underlying composables; `manifest.ts` was updated; no orphan consumer callsites remain.

### Stories that consume the new flat subpath barrels

**0** — but this is by design. The demo consumes `src/` directly (the v1.0 subpath surface is exercised via the synthetic-consumer probe at `/tmp/glass-ui-flat-subpaths-probe/` per W1-C-proof, and via the speedtest re-link commit at v1.0 per L pre-close §2). The subpath surface is consumer-public-facing; the demo is library-internal.

---

## §3 — Verdict

**Lane δ disposition: PASS with 2 P2 + 4 P3 cosmetic carry-forwards.**

L invariants 4 (no backwards compat) and 7 (idiomatic gestalt) hold at HEAD `59b7b56` (W7 close):

1. **Every L-introduced retire is clean**: no transitional aliases for retired root-barrel symbols (Carousel/Combobox/Input/Textarea/useGlobalDark/keyboard family); no `composables/dark` or `composables/keyboard` nested aliases in `package.json`; no `dark-subpath` / `keyboard-subpath` dist filename aliases; no inline `tw-cursor-blink` keyframe vestige; no `useAuroraStudio` re-export shim; no `DockShowcaseFrame` orphan; no `useOffsetPagination` / `useVirtualSection*` / `useWindowedStore` orphan composables or subpaths.

2. **Every new utility / token / sub-tree is named consistently**: `--surface-tint-{35,40,70}` rungs follow the established `--surface-tint-N` pattern (Ns = α-percentage); composables sub-trees (`dark/`, `keyboard/`, `reactive/`, `dom/`, `motion/`, `glass/`, `sortable/`, `sidebar/`) each ship `index.ts` + leaf files; the only style mismatch is `motion/index.ts` using explicit-named exports vs `export *` elsewhere (G4 P2).

3. **Sub-tree shape is coherent**: every sub-tree's `index.ts` is a thin barrel; internal cross-imports (e.g. `useTokenColor` reaches `../dark` for `useGlobalDark`; `useDarkModeSync` reaches `../dark`; `useTouchGate` reaches `../reactive/useTimer`) all go through canonical sub-tree boundaries — no reach-into-leaf or reach-into-shim patterns.

4. **Per-story consumption is canonical**: 135 stories swept; 1 P3 default-import-from-SFC violation (G16 `dock-group.vue` → `MetricBadge.vue`); 1 P3 awkward relative path (G17 `use-story-demo.vue`); 0 retired-symbol consumers; 0 reach-into-internal paths.

5. **The 2 P2 findings are wording / style, not invariant breaks**:
   - G4 — `motion/index.ts` uses `export { name } from "./leaf"` while sibling sub-tree barrels use `export *`. Both legal; M can pick one shape if it matters.
   - G14 — `ModalOverlay.vue:16,44-47` describes `layout="edge"` as a "legacy alias" in code comments. The mapping is a forward-reserved alias (maps to no-op class, awaiting future edge-pinned consumer), not a backwards-compat shim. Re-word as "reserved alias" OR drop the prop value until a consumer materialises (KISS).

The 3 P3 findings are trivial (G13 historical comment refs in `aurora.vue`; G16 import-shape style; G17 path-depth style; G18-G19/G20 inconsistent leaf-vs-barrel composable import style across stories). None block close.

**Carry-forward to M (optional)**: G4 + G14 + G16-G19 cleanups in a single CSS+import-shape style sweep — collectively ~10 LOC across ~6 files; not load-bearing.

Lane δ output is delivered; no in-flight remediation needed for L.W8 close.
