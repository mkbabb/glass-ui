# LANE γ — src/ RESTRUCTURE + COLOCATION + GOD-MODULE PLAN (BH tranche, clean-break → 5.0.0)

Read-only research. Repo: `/Users/mkbabb/Programming/glass-ui` @ branch `tranche/BG`, package version **4.2.0** (next major = **5.0.0**). All paths absolute-relative to repo root.

---

## 0. EXECUTIVE SHAPE

The src/ tree carries **four removable indirection layers** that the clean-break 5.0.0 reshape deletes:

1. `src/subpaths/` — **79 trivial mirror barrels** (each one line: `export * from "../components/..."`). Pure build-entry indirection. **DELETE**; drive the build entry map by globbing the real colocated package barrels.
2. `src/api/` — **2 files, 854 L** (`index.ts` 505 + `types-extra.ts` 349). A pure re-export discovery layer; **only ONE external consumer** (`demo/stories/foundations/paper-texture.vue`). **FOLD** into the per-subpath typed surfaces (every type it re-exports already lives on its owning component barrel).
3. The **10 flat `src/*.ts` barrels** — 7 are trivial single-line re-exports of a colocated barrel (`dark`, `keyboard`, `sidebar`, `motion`, `motion-core`, `carousel`, `infinite-scroll`); only `index`, `forms`, `tokens` (+ folding `api`) carry real multi-source curation. Point the entry map at the colocated barrels directly; keep the 3-4 genuinely-curated ones in a `src/entries/` dir.
4. `src/types/html-attributes.d.ts` — a 1-file ambient `.d.ts`, picked up by `tsconfig.include:["src/"]` with **no explicit import**. Relocate to `src/html-attributes.d.ts` (or keep `src/types/`); trivial.

**HARD INTERLEAVE CONSTRAINT (BG collision):** BG is a live UX-fix tranche whose write-set is enormous and overlaps exactly the file-MOVING targets here — `src/styles/paper.css`, `scroll-choreography.css`, `src/components/custom/dock/**`, ScrollCard/card, configurator, the viz substrates, hero type. The styles/ + dock/ restructure bands **MUST sequence after BG closes** (or after the specific BG wave that owns each file). The subpaths/api/exports-map/god-module-TS-split/composables bands touch files BG does not, and can run concurrently with a declared bound. See §9.

**INTERNAL CONSUMER COUPLING (the big migration cost):** the demo does **NOT** import via the package subpath — it imports via **deep relative paths into `src/`** (`../../../src/components/ui/button`, `../../../src/components/custom/icon-chip`, `../../../src/utils/cn`). Top offenders: `custom/icon-chip` (40 sites), `ui/button` (38), `utils/cn` (31+10), `ui/label` (21), `custom/aurora` (17+14), `custom/dock` (16). **Any dir move under `src/` breaks hundreds of demo imports.** This is the dominant restructure cost and the reason demo-facing moves should be minimized or done with a codemod. (Mitigation: add a demo `@` / `@glass` tsconfig+vite alias to `src/` and a one-shot codemod rewriting `../../../src/...` → `@glass/...`, decoupling demo from depth — do this FIRST, as a pure-additive concurrent-safe wave.)

---

## 1. THE BUILD ENTRY MAP — how subpaths emit today, and the replacement

### Today (`vite.library.ts`, 74 L)
`libraryEntries(rootDir)` returns a `Record<entryName, absBarrelPath>` in **two tiers**:
- **Tier 1 — curated (11, hand-listed):** `index`→`src/index.ts`, `api`→`src/api/index.ts`, `tokens`→`src/tokens.ts`, `forms`, `dark`, `keyboard`, `carousel`, `motion`, `motion-core`, `sidebar`, `infinite-scroll` (each `src/<name>.ts`).
- **Tier 2 — batched:** `for file of readdirSync("src/subpaths")` → `batched[basename] = src/subpaths/<file>`. 79 entries.

`libraryFileName` maps entryName→`glass-ui.js` (for `index`) else `<name>.js`. `package.json` `exports["./<name>"].import = "./dist/<name>.js"` keys off the **entry NAME**, so the dist chunk set is name-keyed and independent of where the source barrel lives.

`vite.config.ts` feeds these as `build.lib.entry` (multi-entry library), `cssCodeSplit` handled separately; `.d.ts` emitted out-of-band by `vue-tsc --project tsconfig.build.json` (NOT a vite plugin), then `flatten-subpath-types.mjs` flattens to `dist/<name>.d.ts`.

### Replacement (5.0.0)
Delete `src/subpaths/` entirely. Rewrite `libraryEntries`:

```ts
export function libraryEntries(rootDir: string) {
    const entries: Record<string, string> = {
        // genuinely-curated, multi-source (stay as authored files)
        index: r("src/entries/index.ts"),
        forms: r("src/entries/forms.ts"),
        tokens: r("src/entries/tokens.ts"),
    };
    // batch every colocated PACKAGE barrel: name = dir name, path = its index.ts
    for (const dir of [
        ...globDirs("src/components/ui/*"),     // 44 reka/shadcn base packages
        ...globDirs("src/components/custom/*"),  // 51 house packages
        ...PUBLISHED_COMPOSABLE_SUBTREES,        // dark, keyboard, sidebar, motion,
                                                 // motion-core, reactive, dom, color,
                                                 // virtual, glass(canvas), ...
    ]) entries[exportName(dir)] = r(`${dir}/index.ts`);
    return entries;
}
```

**Key facts to preserve:**
- The entry NAME must equal the published subpath name. Today it equals the `src/subpaths/<name>.ts` basename. **There are name≠dir mismatches** to encode in an explicit `EXPORT_NAME` override map: e.g. CLAUDE.md says `pager-dots` ships as `/pager` (but `package.json` exports `./pager-dots` AND no `./pager` — verify; the subpath file is `pager-dots.ts`), `motion-core`→`composables/motion/core`, `canvas`→`composables/glass` substrate slice, `dom`/`reactive`/`color`/`virtual`→`composables/<subtree>`, `fourier-math`→ a fourier-field math slice, `motion-curves`→ a motion slice. **Action for BH spec: enumerate the full 79 subpath→sourceDir map** (the `src/subpaths/*.ts` files ARE that map today — read each one-liner to harvest it before deleting).
- Not every `ui/*`/`custom/*` dir is published (some are root-barrel-only or internal). The subpath set is **76-79 JS exports** (gate `proof:subpath-enumeration` is source of truth). The new glob must reproduce **exactly** that export set — drive it off a single `PUBLISHED` allowlist derived from `package.json exports`, OR (cleaner) make the glob the source of truth and regenerate `package.json exports` + `typesVersions` from it via a script (kills the hand-maintained 90-key exports block too).
- **Gate to re-home:** `proof:subpath-enumeration` (asserts the batched set ≡ hand-list). After the move it asserts the glob ≡ `package.json exports`. Keep it; re-point its source.

**Net deletion:** 79 files (`src/subpaths/`) + the Tier-1/Tier-2 split in `vite.library.ts`.

---

## 2. src/api/ — FOLD into typed per-subpath surfaces

### What it is
`src/api/index.ts` (505 L) + `src/api/types-extra.ts` (349 L). Header: "re-exports from each canonical home — never declares its own types." It is a **discovery aggregator**: `export type { CardTier } from "../components/ui/card"`, `export { MAX_NUCLEI } from "../components/custom/aurora"`, etc. `types-extra.ts` carries the carved Aurora/Configurator/Timeline type groups (split off to dodge the 500-L god-module bound — itself an artifact of the no-god-module ratchet).

### Who imports `@mkbabb/glass-ui/api`
- Internal: `src/index.ts` (root barrel re-uses some), `src/api/types-extra.ts` (sibling).
- **External: exactly ONE** — `demo/stories/foundations/paper-texture.vue`.
- All other refs are in `docs/tranches/**` historical wave notes (dead).

### Fold design (5.0.0)
- **DELETE `src/api/`.** Every type/constant it re-exports is **already on its owning component barrel** (that's the whole point — it re-exports, declares nothing). `import type { AuroraConfig } from "@mkbabb/glass-ui/aurora"` already resolves post-build (the dts is per-subpath). So the discovery layer is pure redundancy under the per-subpath-typed model.
- **Migration map** (ship in `MIGRATION-5.0.md` + cross-repo by-name ask): `api`-type → owning subpath. e.g. `AuroraConfig|MAX_NUCLEI|DEFAULT_AURORA_CONFIG` → `/aurora`; `CardTier|CardSurface|CardVariant|CardMetal|ScrollCardProps` → `/card`; `Surface` → a new tiny `/surface-axis` OR `/card` (it lives in `ui/_shared`); `InstrumentChassisPhase` → `/instrument-chassis`; `ToastVariant` → `/toast`; `GlassPanelVariant` → `/glass-panel`; `ConfiguratorState` → `/configurator`; `SidebarState|FuzzySearchState` → `/sidebar` `/search`.
- The single demo consumer (`paper-texture.vue`) migrates to the owning subpaths.
- **The `_shared` `Surface` type** is the one orphan (lives in `src/components/ui/_shared/`, no own subpath). Give it a home: either publish `ui/_shared` as `/surface-axis` (it also holds `useSurfaceAxis`/`surfaceClass`/`menuItemVariants`/`ModalOverlay`) or re-export `Surface` from `/card`. Recommend a small published `/_shared`→`/internal-shared`? No — overfitting. Re-export `Surface` + `surfaceClass` from `/card` (Card is its canonical first consumer).
- **Gate impact:** the L-tranche `proof:*` for api-discovery and any `verify-export-types` probe of `./api` must drop the `./api` key. `proof:subpath-enumeration` loses `api`.

**Net deletion:** 2 files / 854 L, 1 export key, 1 demo migration.

---

## 3. src/types/html-attributes.d.ts — relocate

1 ambient `.d.ts` (3.8 KB). No `import` references; consumed via `tsconfig.include:["src/"]` global ambient pickup. **Move to `src/html-attributes.d.ts`** (flatten the 1-file dir) — stays under `src/`, still ambient-included, zero import churn. Keeping a 1-file `src/types/` dir is contrivance the user's "logical grouping without contrivance" rule rejects. Trivial, concurrent-safe (BG does not touch it).

---

## 4. THE 10 FLAT `src/*.ts` BARRELS — new homes

| File | Size | Content | New home (5.0.0) |
|---|---|---|---|
| `index.ts` | 15 KB | curated vueuse-FREE root barrel (37 ui + 6 cherry-picked custom + composable subtrees + `cn`) | **`src/entries/index.ts`** — genuine curation, KEEP (re-export depth unchanged) |
| `forms.ts` | 1 KB | curated vueuse-bearing Input/Textarea/Combobox | **`src/entries/forms.ts`** — multi-source curation, KEEP |
| `tokens.ts` | 2.2 KB | curated token-value exports | **`src/entries/tokens.ts`** — KEEP |
| `motion.ts` | 3 KB | `export * from "./composables/motion"` (1 real line + doc) | **DELETE** — entry map points `motion`→`src/composables/motion/index.ts` |
| `motion-core.ts` | 1 KB | `export * from "./composables/motion/core"` | **DELETE** — entry→`src/composables/motion/core/index.ts` |
| `dark.ts` | 1.4 KB | re-export `composables/dark` | **DELETE** — entry→`src/composables/dark/index.ts` |
| `keyboard.ts` | 0.8 KB | re-export `composables/keyboard` | **DELETE** — entry→`src/composables/keyboard/index.ts` |
| `sidebar.ts` | 0.3 KB | re-export `composables/sidebar` | **DELETE** — entry→`src/composables/sidebar/index.ts` |
| `carousel.ts` | 1.2 KB | re-export `components/ui/carousel` | **DELETE** — entry→`src/components/ui/carousel/index.ts` |
| `infinite-scroll.ts` | 0.1 KB | re-export the infinite-scroll component+composable pair | **DELETE** — entry→ its colocated barrel |

The 7 trivial barrels exist only because the OLD entry map hand-listed `src/<name>.ts`. Once the entry map points at colocated barrels directly, they are dead indirection. **package.json `exports` keys resolve unchanged** (they key off dist chunk NAME, not source path). Keep `src/entries/{index,forms,tokens}.ts` as the only authored entry files (4 incl. nothing else). The doc-block rationale in each trivial barrel (the SCC-trap notes) → moves to the precepts submodule / per-subtree README, not lost.

**Net deletion:** 7 files; 3 relocate into `src/entries/`.

---

## 5. src/styles/ — COLOCATION PLAN (the hardest band; BG-collision-heavy)

### Today
~40 flat `.css` + 8 subdirs (`tokens/` 17, `glass/` 18, `dock/` 14, `dock-controls/` 5, `theme/` 4, `typography/` 3, `utilities/` 7, `motion/` 1). **Assembly = `src/styles/index.css`'s `@import` chain** (ordered, ~30 imports). Build = `publishStyleAssets` (`vite.style-assets.ts`, 566 L) does `cpSync(src/styles → dist/styles)` **wholesale**, then folds the SFC scoped bundle (`dist/glass-ui.css`) via an injected `@import "../glass-ui.css"`, then `emitComponentUtilities`→`components.css`, then `emitCriticalDeferredSplit` off `src/styles/critical-partition.mjs`.

### What MUST stay global (cross-component / cascade-load-bearing)
- `tokens/**` (the entire token cascade — `scheme-motion`, `scheme-spring`, `glass`, `glass-fx`, `glass-deep`, `dark-arm`, `light-dark`, `property-regs`, `scale-paper`, `shadow`, `sizing*`, `on-glass-fg`, `color-radius`, `offsets`, `scroll-tokens`) — these are the design IDENTITY, read by every component.
- `theme/**` (`@theme` block, bridges, dark, literals, radius) — the Tailwind bridge.
- `typography/**` (the √φ ladder + semantic classes + utilities).
- `glass/**` (the 5-rung ladder `ladder.css`, `material.css`, `surfaces.css`, `surface-axis.css`, `reveal.css`, `rim.css`, `squircle.css`, `accent-tone.css`, `control-surfaces.css`, `liquid-*`, `a11y-fallback`) — the shared glass material, composed by ALL surfaces. STAYS GLOBAL.
- `utilities/**` (`base`, `base-misc`, `animate`, `a11y-overrides`, `btn`, `metal`, `components`).
- `animations.css`, `transitions.css`, `scroll-driven.css`, `scroll-choreography.css`, `scroll-chrome.css`, `view-transition.css`, `paper.css`, `floating-panel.css`, `cards.css` (`.paper-texture`+`cartoon-surface` decoration), `jubilance.css`.
- **Cross-component recipes that look component-named but serve ≥2 families** (KEEP GLOBAL): `menu.css` (DropdownMenu+ContextMenu+Command+Select+Combobox — 5 families), `feedback-tone.css` (Toast+Notification+Alert), `dock-controls.css` + `dock-controls/**` (5 control families), `glass-refract.css`/`glass-specular-track.css` (the lensing axis, multiple surfaces).
- `index.css` (the assembly root) + `critical-partition.mjs` (the partition manifest) + `fonts.css`.

### What CAN colocate (component-EXCLUSIVE css → its component dir)
| Stylesheet | Owner | New home |
|---|---|---|
| `segmented-tabs.css` | tabs | `custom/tabs/tabs.css` |
| `border-progress.css` | border-progress | `custom/border-progress/border-progress.css` |
| `completion-seal.css` | completion-seal | `custom/completion-seal/completion-seal.css` |
| `icon-chip.css` | icon-chip | `custom/icon-chip/icon-chip.css` |
| `configurator.css` | configurator | `custom/configurator/configurator.css` |
| `instrument-chassis.css` | instrument-chassis | `custom/instrument-chassis/instrument-chassis.css` |
| `hover-popover.css` | hover-popover | `custom/hover-popover/hover-popover.css` |
| `drawer.css` | drawer | `ui/drawer/drawer.css` |
| `select.css` | select | `ui/select/select.css` |
| `dock.css` + `dock/**` (14) | dock | `custom/dock/styles/**` |
| `dock-controls.css` + `dock-controls/**` | dock | `custom/dock/controls-styles/**` (still shared by the 5 control SFCs in dock/) |

**Verdict on dock/styles:** `dock/**` (shell, morph, density, layers, layer-group, overflow, section, stack-rail, cta-seat, fission-bridge, morph-bridge, search, shape, adaptive-legibility) ARE dock-exclusive → colocate under `custom/dock/styles/`. **But BG owns dock heavily** → this sub-band sequences after BG-dock waves close.

### Build re-assembly (the load-bearing redesign)
`cpSync(src/styles→dist/styles)` wholesale **breaks** once css scatters into component dirs. Two viable replacements:
- **Option A (recommended): keep `src/styles/index.css` as the ordered assembly manifest, but point its `@import`s at colocated paths** (`@import "../components/custom/tabs/tabs.css"` etc.), then run a **lightningcss `bundle()` pass** at build that resolves all cross-dir `@import`s into ONE `dist/styles/index.css`. This preserves the ordered-cascade authoring (the source of cascade correctness), kills the wholesale `cpSync`, and the colocated css ships in the same bundle. `critical-partition.mjs` paths update to the colocated source paths.
- **Option B: a CSS manifest array** (`src/styles/manifest.mjs` = ordered list of colocated paths) the build concatenates. More explicit but loses the readable `@import` chain. Option A is more idiomatic + the existing `proof:read-css-monoliths` `.order` asserts already verify @import order.

**Gate impact:** `proof:theme` (source-reads `index.css`), `proof:css-critical` (partition manifest), `proof:read-css-monoliths` (`.order` asserts), `proof:emission`, `proof:colocation` (asserts `index.css` carries certain literals — see `proof-colocation.mjs:23`), `proof:shadow-contract`/`proof:border-progress` W5 (`index.css` @imports `./border-progress.css`). All need their `index.css`-path expectations re-pointed to colocated paths. Substantial but mechanical.

**BG collision:** `paper.css`, `scroll-choreography.css`, `dock/**`, `cards.css`, `glass/**` are all in BG's live defect set (D2/D3/D4/D5/D14). **The styles colocation band is the LAST to run — strictly after BG closes.** The global-stays css (tokens/theme/typography/glass/utilities) does not move at all, so only the ~11 component-exclusive sheets + dock/** move, minimizing collision.

---

## 6. src/composables/ — component-specific vs shared

9 published/internal subtrees. Most are **correctly shared** (the J-inv-10 ≥2-consumer bar already gatekeeps them). Component-SPECIFIC composables ALREADY live in their component dirs (`dock/composables/` 17 files, `goo-blob/composables/`, `dot-flow-field/`, etc.) — the colocation discipline is largely already done.

| Subtree | Files | Disposition |
|---|---|---|
| `motion/` | 42 | **SHARED** (useSpring, useSpringPress, useLiquidFlex, usePointerVelocityField, useStaggerReveal, vReveal, useViewTransition…). KEEP. But audit for single-consumer leaves (e.g. `useBloomUp.ts` 507L — who consumes? if 1 component → move into it). |
| `glass/` | 11 | **SHARED substrate** (createCanvasLifecycle, useWebGLCanvas, useWebGPUCanvas, useGpuSubstrate, useGlassBackdropLuminance, vSpecular, useSpecularTracking). KEEP — aurora/blob/viz all compose it. |
| `color/` | 2 | **SHARED** (OKLCh + ColorResolver; `/color` subpath). KEEP. |
| `dom/` | 12 | **SHARED** (useResizeObserver, useTouchGate, useTokenColor; `/dom`). KEEP. |
| `sidebar/` | 9 | **SHARED** ToC engine (`/sidebar`). KEEP. |
| `sortable/` | 8 | **SHARED** (`useSortable` + SortableList). KEEP. |
| `virtual/` | 4 | **SHARED** (`/virtual` leaf). KEEP. |
| `reactive/` | 3 | **SHARED** (useInterval, useTimer; `/reactive`). KEEP. |
| `dark/` | 4 | **SHARED** (`/dark`). KEEP. |
| `keyboard/` | 2 | **SHARED** (`/keyboard`). KEEP. |
| `context/` | 2 | **SHARED** DI factory (createStrictContext). KEEP — internal. |

**Action:** run the overfitting audit (`docs/audits/overfitting-audit.md`) over each `composables/*` leaf; any with exactly 1 component consumer + not exported → move into that component's `composables/`. Candidates to verify: `useBloomUp` (motion), `useViewTransition` if dock-only, any single-consumer `dom/` leaf. Otherwise composables/ is already correctly structured. Low-collision with BG (BG touches dock/composables in-place, not the shared tree).

---

## 7. ui/ vs custom/ — KEEP THE SPLIT

**Recommendation: KEEP `ui/` and `custom/` separate.** The user constraint is explicit: "keep the shadcn/reka backbone SEPARABLE so base components can be updated." `ui/` = 44 reka/shadcn base packages (the upstream-trackable backbone + `_shared`); `custom/` = 51 house components. Flattening into one `components/` dir would destroy the upstream-update seam and is contrivance. The split IS the service boundary.

Refinements (additive, not a flatten):
- Consider renaming for clarity: `ui/`→`base/` (reka backbone) and `custom/`→`glass/` (house) — **but** this is a huge demo-relative-import churn (95 dirs × many sites) for a cosmetic gain. **Recommend NOT renaming** under the foreign-tree/demo-coupling cost unless the demo `@glass` alias codemod (§0) lands first, after which the rename is one alias-target change. Low priority.
- `ui/_shared/` (ModalOverlay, menuItemVariants, useSurfaceAxis, surfaceClass, `Surface` type) is the cross-cutting shared base — KEEP, give `Surface`/`surfaceClass` a published home via `/card` re-export (§2).
- **`ui/carousel/CarouselContent.vue` is 577 L** — a god module in the reka backbone (not in the prompt's list). Split it too (§8).

---

## 8. GOD MODULES >500 L — per-file split / justified-keep

Found 16 files >500L (prompt listed 15; **`ui/carousel/CarouselContent.vue` 577 L** is a 16th, missed). User directive: NO god modules.

| File | L | Verdict + split strategy |
|---|---|---|
| `custom/dock/GlassDock.vue` | 711 | **SPLIT.** Script already delegates shell-props (`useDockShellProps`) + morph-window (`useDockMorphWindow`). Extract the **fission wiring** (registerSplittablePieces/dockCenter/fission scalars, ~lines 341-446) → `composables/useDockFissionWiring.ts`; the **touch-gate machine** (shouldGateTouch/onTouchStart/Move/End, ~274-340) → `composables/useDockTouchGate.ts`; the **draggable-items axis** (onDockPointerMove, ~447+) → already-present `useDockItemDrag.ts` (move remaining logic in). SFC drops to template + composable wiring. **BG-OWNED — sequence after BG dock waves.** |
| `composables/glass/webgl/createCanvasLifecycle.ts` | 695 | **SPLIT.** The shared lifecycle leaf. Carve the **suspend/demand-gate state machine** (the suspend Set + rAF tick/wake) → `lifecycle/scheduler.ts`; the **visibility/offscreen owners** (visibilitychange + content-visibility + PRM re-monitor) → `lifecycle/visibility.ts`; keep `createCanvasLifecycle.ts` as the composer. Concurrent-safe (BG does not touch the substrate). |
| `composables/glass/webgpu/useWebGPUCanvas.ts` | 606 | **SPLIT.** Carve the **async device-acquisition + device.lost self-heal** (`armAsync`/requestAdapter/requestDevice/device.lost Promise + error-scope bracket) → `webgpu/deviceAcquire.ts`; keep the canvas wrapper thin. Concurrent-safe. |
| `custom/dock/composables/useDockFission.ts` | 604 | **SPLIT.** The fission engine. Carve the **silhouette/placement geometry** → `useDockFissionGeometry.ts`; the **spring/animation drive** → keep. **BG-adjacent (dock) — sequence after BG.** |
| `ui/carousel/CarouselContent.vue` | 577 | **SPLIT (NEW finding).** Reka backbone. Extract scroll/embla wiring → `composables/useCarouselContent.ts`. Verify BG doesn't touch carousel (it doesn't per defect ledger). |
| `custom/dock/composables/useDockContextSilhouette.ts` | 551 | **SPLIT.** Carve the pure silhouette-projection math → `dockSilhouetteMath.ts` (stateless, like the existing `railProjection.ts` harvest precedent); keep the reactive wrapper. **BG-adjacent.** |
| `composables/glass/useGlassBackdropLuminance.ts` | 542 | **SPLIT.** Carve the **sampling strategies** (elementsFromPoint stack-walk vs downsampled-canvas getImageData) → `backdropSample.ts`; keep the rAF-throttled observer wrapper. Concurrent-safe. |
| `custom/goo-blob/composables/useBlobSatellites.ts` | 533 | **SPLIT.** Carve the **orbit/envelope constants + pure orbit math** → `blobSatelliteOrbit.ts`; keep the reactive satellite manager. Concurrent-safe. |
| `custom/goo-blob/shaders/metaball.wgsl.ts` | 529 | **JUSTIFIED-KEEP (single shader string).** A WGSL source string is one cohesive artifact; splitting it fragments a shader. The no-god-module rule should EXEMPT `*.wgsl.ts`/`*.glsl.ts`/`*.frag.ts` shader-literal files (they are data, not logic). **Recommend: add a shader-literal exemption to the no-god-module gate** rather than splitting. |
| `custom/dot-flow-field/shaders/flow-field.glsl.ts` | 517 | **JUSTIFIED-KEEP (shader string).** Same exemption. |
| `custom/tabs/SegmentedTabs.vue` | 512 | **SPLIT.** Extract the indicator/squish wiring (already partly in `useTabIndicator`) + the responsive-collapse-to-Select branch → `composables/useTabsResponsive.ts`; the draggable axis → `useTabDragMorph` (exists). Concurrent-safe-ish (BG doesn't list tabs). |
| `custom/goo-blob/shaders/metaball.frag.ts` | 510 | **JUSTIFIED-KEEP (shader string).** Exemption. |
| `custom/pager-dots/PagerDots.vue` | 509 | **SPLIT.** Extract the windowing oracle (`pagerWindow`) + goo-morph worm logic → `composables/usePagerWindow.ts`. Note: BD "liquid-weight" goo-morph dots — verify BG/BD ownership. |
| `custom/goo-dot-matrix/composables/useGooDotMatrix.ts` | 508 | **SPLIT.** Carve the dot-grid output stage / SDF-field splice → `gooDotGrid.ts`; keep renderer. Concurrent-safe. |
| `composables/motion/useBloomUp.ts` | 507 | **SPLIT or AUDIT.** Likely over-built. First run overfitting audit (≥2 consumers?); if single-consumer, move into owner + split. If shared, carve the keyframe-construction helper out. |
| `api/index.ts` | 505 | **DELETED entirely** (§2) — the god-module is an artifact of the discovery-layer aggregation; folding it removes the file. |

**Shader-literal exemption is the key insight:** 3 of the 16 (metaball.wgsl/frag, flow-field.glsl) are single GLSL/WGSL strings — splitting them is anti-cohesive. The no-god-module ratchet must gain a `*.{wgsl,glsl,frag,vert}.ts` exemption; otherwise BH "splits" them into incoherent fragments.

---

## 9. TARGET src/ TREE (5.0.0)

```
src/
├── entries/                 # the ONLY authored multi-source barrels
│   ├── index.ts             # vueuse-FREE root barrel (was src/index.ts)
│   ├── forms.ts             # vueuse-bearing curated (was src/forms.ts)
│   └── tokens.ts            # token-value exports (was src/tokens.ts)
├── html-attributes.d.ts     # ambient (was src/types/html-attributes.d.ts)
├── components/
│   ├── ui/                  # 44 reka/shadcn base packages — KEPT SEPARABLE
│   │   └── <pkg>/ { *.vue, index.ts, [composables/], [<pkg>.css] }
│   └── custom/              # 51 house packages
│       └── <pkg>/ { *.vue, index.ts, composables/, constants.ts,
│                     shaders/, [<pkg>.css], README.md }
├── composables/             # SHARED-only sub-trees (component-specific ones
│   │                        #   already live in component dirs)
│   ├── motion/ (incl. core/) glass/ color/ dom/ sidebar/ sortable/
│   ├── virtual/ reactive/ dark/ keyboard/ context/
├── styles/                  # GLOBAL-only after colocation
│   ├── index.css            # ordered @import assembly (now reaches colocated css)
│   ├── critical-partition.mjs
│   ├── tokens/ theme/ typography/ glass/ utilities/
│   ├── menu.css feedback-tone.css dock-controls.css  # cross-family (stay)
│   ├── animations.css transitions.css scroll-*.css view-transition.css
│   └── paper.css cards.css floating-panel.css jubilance.css fonts.css
├── utils/ { cn, prng, coalesceMetric, moveBefore, platformSupport, index }
└── fonts/
# DELETED: src/subpaths/ (79), src/api/ (2), src/types/ (1 moved),
#          src/{dark,keyboard,sidebar,motion,motion-core,carousel,infinite-scroll}.ts (7)
```

### New exports map (driven, not hand-maintained)
Generate `package.json exports` + `typesVersions` from the entry-map glob via a script (`scripts/regen-exports.mjs`), so the 90-key block stops drifting. Shape unchanged per key (`{types,import}` for subpaths, `{types,import,default}` for `.`); `./api` key **dropped**; CSS keys (`./styles`, `./styles/critical|deferred|fonts`, `./styles.css`, `./fonts/*`) unchanged. Net export count: ~76 JS subpaths − 1 (`api`) = ~75; the `proof:subpath-enumeration` figure re-baselines.

---

## 10. CLAUDE.md-PARSING GATES — retire/re-home (26 scripts)

CLAUDE.md is DELETED. **26 `proof-*.mjs` scripts read `CLAUDE.md`** (ref counts): `dock-rail-realize`(14), `doc-consistency`(12), `claude-structure-sync`(11), `surface-axis`(10), `readme-meta-clean`(10), `doc-override-idiom`(10), `dock-unify`(9), `phase-palette`(6), `split-chars`(5), `easing-primitive`(5), `accent-tone`(5), `handmark`(4), `close-battery-parity`(4), `on-glass-fg`(3), `visual-runner`(2), `spa-view`(2), `dropdown-fix`(2), + 9 single-ref (`viz-configurator-suite`, `storybook-meta`, `spring-tokens-synced`, `scroll-trigger`, `peer-optional`, `page-hierarchy`, `page-chassis`, `expandable-part`, `crossrepo-asks`).

Two failure modes to fix per gate:
- **Structural map gates** (`claude-structure-sync` — asserts §Structure `custom/` enumeration ≡ `ls custom/`; `doc-consistency`): **RETIRE** `claude-structure-sync` (the map it guards is deleted) OR **RE-HOME** onto a generated `docs/canon/component-index.md` (regenerated from disk, the same set-equality assert). Recommend re-home onto a generated index so the drift-guard survives.
- **Contract-text gates** (the ~24 that assert a specific contract SENTENCE exists in CLAUDE.md — `doc-override-idiom` checks the consumer-wiring override example; `surface-axis`/`phase-palette`/`handmark`/etc. assert their canon is recorded): **RE-POINT** each to the new modular home (per-component `README.md` or `docs/canon/<topic>.md`). The contract TEXT moves to the per-component README per framing-decision-1; the gate's `readFileSync(CLAUDE_MD)` → `readFileSync(componentReadme)`.
- `readme-meta-clean` + `doc-override-idiom` assert byte-parity between CLAUDE.md and README.md copies → re-point to README-only or the canon home.
- `close-battery-parity` references CLAUDE.md for battery-mode canon → re-home to the precepts submodule.

**This is a full band of work:** 26 gate re-homes, sequenced WITH the contract-redistribution (a gate can't re-point until its target README exists). Concurrent-safe vs BG (BG doesn't edit scripts/ gate-parsing or CLAUDE.md text). **But** BG is actively closing waves that may ADD CLAUDE.md notes — coordinate the deletion timing so BG's last CLAUDE.md append lands before BH extracts.

---

## 11. BG-COLLISION PROTOCOL (per band)

| BH band | Touches | BG overlap | Protocol |
|---|---|---|---|
| Demo `@glass` alias + codemod | demo/** imports, tsconfig, vite | low | **FIRST**, concurrent-safe (additive alias; codemod is mechanical) |
| Delete subpaths/ + rewrite entry map | `src/subpaths/`, `vite.library.ts`, `package.json` | none | concurrent-safe |
| Fold api/ | `src/api/`, 1 demo file, exports | none | concurrent-safe |
| Relocate types/ + delete flat barrels | `src/types/`, 7 `src/*.ts`, `src/entries/` | none | concurrent-safe |
| CLAUDE.md extract + 26 gate re-homes | CLAUDE.md, scripts/proof-*, docs/canon, READMEs | BG appends CLAUDE.md notes | **after BG's last CLAUDE.md write** |
| Composables overfitting audit + single-consumer moves | `src/composables/*` | dock/composables in-place (BG) | dodge dock subtree; else concurrent |
| God-module TS splits (non-dock, non-shader) | createCanvasLifecycle, useWebGPUCanvas, useGlassBackdropLuminance, useBlobSatellites, useGooDotMatrix, SegmentedTabs, PagerDots, CarouselContent, useBloomUp | none (BG = dock/styles/scroll) | concurrent-safe |
| God-module splits (dock): GlassDock, useDockFission, useDockContextSilhouette | `custom/dock/**` | **HIGH (BG owns dock)** | **after BG dock waves** |
| Styles colocation (component-exclusive + dock/**) | `src/styles/**`, build, partition manifest, ~8 gates | **HIGH (paper/scroll/dock/cards/glass)** | **LAST — after BG closes** |
| Shader-literal exemption to no-god-module gate | the ratchet gate | none | concurrent-safe |
| Regen exports script | `package.json`, scripts | none | concurrent-safe |

---

## 12. KEY CITATIONS
- Build entry: `vite.library.ts:30-58` (two-tier map), `:60-62` (filename), `:64-73` (external peers).
- Styles assembly: `src/styles/index.css:161-220` (@import order), `vite.style-assets.ts:402-470` (cpSync + SFC fold + components.css + critical split).
- api fold: `src/api/index.ts:1-30` (header — "re-exports, never declares"), only external consumer `demo/stories/foundations/paper-texture.vue`.
- Demo coupling: demo imports `../../../src/components/custom/icon-chip` ×40, `ui/button` ×38, `utils/cn` ×41 — deep relative, NOT subpath.
- God modules: `find src -name '*.ts' -o -name '*.vue' | xargs wc -l | awk '$1>500'` → 16 files (incl. unlisted `ui/carousel/CarouselContent.vue` 577).
- CLAUDE.md gates: `rg -l "CLAUDE\.md" scripts/proof-*.mjs` → 26 scripts; `proof-claude-structure-sync.mjs:1-60` (set-equality §Structure assert).
- BG live write-set: `docs/tranches/BG/PLAN.md` D1-D14 (routing/paper.css/dock/scroll-choreography/ScrollCard/configurator/hero — the file-move collision zone).
