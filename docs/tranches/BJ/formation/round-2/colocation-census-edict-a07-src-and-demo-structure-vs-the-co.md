# Round 2 — Colocation census (edict A07) — src/ and demo/ structure vs the colocation grand edict; truth source for design-idioms §7's rewrite

## Summary

CENSUS RESULT: the colocation edict A07 is ~70% realized and self-consistent for the god-module components, but three residue classes violate it and one governing doc (design-idioms §7) actively contradicts the shipped layout.

THE PATTERN TO STANDARDIZE ON (conforming counter-examples): dock/ is the gold standard — composables/ (14 files incl dockContext, useDockMorph, useDockSpring), constants.ts, and a nested styles/ with styles/controls/ sub-carve. aurora/ (composables/ + constants/ with nested constants/shaders/), blob/ (composables/ + shaders/ + constants/config/presets/types), drawer/ (composables/ + constants.ts + styles.css), tabs/ (composables/ + constants.ts + styles/), pager-dots/ (composables/ + pagerWindow.ts) all conform. src/composables/color/ is the model of a LEGITIMATE module-level composable — a value.js-backed shared leaf consumed by aurora + blob + fourier-field (verified: it is NOT single-consumer). src/composables/glass/procedural/ (prng, color.glsl/wgsl) is a legit common module — 7 component consumers. watercolor-dot/prng.ts is the model 'shared-leaf re-export + component-local derivation' idiom. CRITICAL for the §7 rewrite: src/styles/index.css lines 181-247 already @import ~15 component-FEATURE-DIR styles (dock/styles/*, card/styles.css, drawer/styles.css, tabs/styles/*, dialog/placement.css, instrument-chassis/styles.css, metric/styles.css, scroll-progress-rim/styles.css, completion-seal/styles.css, header-ribbon/styles.css, button/styles.css, configurator/styles.css, _shared/*.css) — proving the shipped pattern is 'colocate the CSS in the feature-dir AND @import it from index.css at the correct cascade rung', which satisfies BOTH colocation and cascade order.

DEMO READ: demo/stories/ (139 files) is subdivided by category (compositions/containers/data/display/dock/feedback/forms/foundations/motion/navigation/substrates) — conforms. demo/chassis/ (30) subdivided by role (hero/landing/code/section/...) — conforms. demo/shell/ (21) with configurator/ + a nested preset-editor/ submodule — conforms and is a good app-level counter-example. The one demo defect is an INVERSION (see finding): demo/composables/ is nearly empty (only virtual/) while the demo-only sidebar composables live in the LIBRARY's src/composables/sidebar/.

MIGRATION SHAPE (fewest moves): (1) src/composables/glass/wave/* → src/components/liquid-grid/composables/wave/; (2) src/composables/glass/textureUpload.ts → src/components/aurora/composables/; (3) src/composables/sidebar/* → demo/composables/sidebar/ + drop the ./sidebar package export; (4) src/styles/glass/accent-tone.css → src/components/chip/styles.css, re-@import at chip's cascade rung; (5) carve src/components/_shared/ (21 flat) into field/ menu/ feedback/ surface/ motion/ submodules; (6) normalize src/components/handmark/ loose helpers into composables/; (7) rewrite design-idioms §7 to the shipped colocate-plus-@import pattern, retaining the cascade-order invariant bound to @import POSITION not file LOCATION, and keeping the ≥2-surface shared-register carve-out (glass-chip.css, surfaces-pager.css, glass-capsule.css are correctly central).

## Findings (8)

### [major] dead-idiom-doctrine-contradicts-shipped-layout

**Claim:** design-idioms.md §7 'Where a per-component style lives' mandates that a component's visual recipe lives in a CENTRAL src/styles/*.css partial 'NOT in the component's feature-dir' — but the shipped layout does the opposite for ~15 components, so §7 is the DEAD layout the charter warned of and must be rewritten from this census.

**Evidence:** docs/precepts/design-idioms.md lines 227-238 state 'A component's visual recipe lives in a CENTRAL partial ... NOT in the component's feature-dir — the cascade order is load-bearing'. Refuted directly by src/styles/index.css lines 181-247 which @import component-feature-dir styles: components/dock/styles/index.css (:183), components/card/styles.css (:185), components/_shared/feedback-tone.css (:186), components/button/styles.css (:204), components/configurator/styles.css (:205), components/instrument-chassis/styles.css (:206), components/drawer/styles.css (:211), components/tabs/styles/segmented.css (:212), components/dialog/placement.css (:225), components/metric/styles.css (:227), components/scroll-progress-rim/styles.css (:229), components/completion-seal/styles.css (:237). The shipped pattern solves cascade order via the @import POSITION in index.css, not via file location — the exact thing §7 claims is impossible.

**Proposed:** Rewrite §7 'Where a per-component style lives' to the shipped truth: colocate the CSS in the feature-dir (dir/styles.css or dir/styles/*), then @import it from src/styles/index.css at its correct cascade rung — the index.css @import order IS the cascade order, so colocation and cascade-safety are not in tension. Retain the cascade-order invariant but bind it to @import position. Keep the carve-out that a recipe ≥2 surfaces compose (or one needing a fixed cascade seat as a shared register) stays a CENTRAL partial (glass-chip.css, surfaces-pager.css, glass-capsule.css, feedback-tone.css, menu.css are correct).

### [major] single-consumer-composable-marooned-in-global-dir

**Claim:** src/composables/glass/wave/ (4 files) is consumed by exactly ONE component (liquid-grid) and is NOT part of any public subpath, so per A07 it belongs colocated in the component that already has its own composables/ and shaders/ dirs.

**Evidence:** grep for waveField/glass/wave across src+demo returns only src/components/liquid-grid/composables/liquidGrid.ts, src/components/liquid-grid/shaders/liquid-grid.glsl.ts, liquid-grid.wgsl.ts (plus the module's own 4 files: src/composables/glass/wave/index.ts, waveField.ts, waveField.glsl.ts, waveField.wgsl.ts). The /glass and /canvas barrels (src/composables/glass/index.ts) do NOT re-export wave — it is internal-only. liquid-grid already conforms with src/components/liquid-grid/composables/ and shaders/.

**Proposed:** MOVE src/composables/glass/wave/* → src/components/liquid-grid/composables/wave/ (or fold the .glsl/.wgsl siblings under liquid-grid/shaders/). Update the 3 liquid-grid import sites. Zero public-API impact (not exported).

### [major] single-consumer-composable-marooned-in-global-dir

**Claim:** src/composables/glass/textureUpload.ts is consumed by exactly ONE component (aurora) and is not exported by the /glass or /canvas barrels, so it belongs colocated in aurora/composables/.

**Evidence:** grep for textureUpload across src+demo returns only src/components/aurora/composables/{auroraImageSource.ts,wgpuSetup.ts} and aurora/constants/presets.ts. src/composables/glass/index.ts exports canvas2d but not textureUpload (verified — the /canvas public surface excludes it). aurora already has a conforming composables/ subtree (17 files).

**Proposed:** MOVE src/composables/glass/textureUpload.ts → src/components/aurora/composables/textureUpload.ts; update the 3 aurora import sites. Zero public-API impact.

### [major] demo-concern-living-in-library-src

**Claim:** src/composables/sidebar/ (7 files) has ZERO library-internal consumers and no corresponding src component — it is consumed only by demo/ — yet it lives in the library's src/composables/ and is exposed as the public ./sidebar subpath. It is a demo/app-level concern misfiled into the shipped library, and its single-consumer status collides with the 'one consumer is not enough' pruning edict (A05).

**Evidence:** grep 'composables/sidebar' across src+demo returns only demo/composables/virtual/virtualSectionLayout.ts, demo/stories/dock/dock-search.vue, demo/stories/navigation/toc-tracking.vue. No src/components/sidebar exists (ls src/components | grep sidebar => none). package.json exports './sidebar' => dist/sidebar.js. The 7 files: src/composables/sidebar/{index,types,useClickDelegate,useLazyLoader,useScrollTo,useScrollTracker,useSidebarFollow,useSidebarState,useTreeIndex}.ts. Meanwhile demo/composables/ holds only a virtual/ subdir — the natural home is empty.

**Proposed:** MOVE src/composables/sidebar/* → demo/composables/sidebar/ and DROP the ./sidebar package.json export (clean break, no library consumer depends on it). Update the 3 demo import sites + virtualSectionLayout.ts. If retention as a public headless package is intended, that must be an explicit decision justified against A05 — the census says demote.

### [minor] component-style-marooned-in-global-glass-bucket

**Claim:** src/styles/glass/accent-tone.css styles exactly ONE component (chip) and pairs with the chip-only useAccentTone composable, yet lives in the global styles/glass/ bucket — the half-migrated remnant of the §7 dead rule while dock/drawer/tabs/etc. already colocate their styles.

**Evidence:** The .glass-accent-tone family (accent-tone.css, @import at src/styles/glass.css:63) is driven by useAccentTone, whose only consumers are src/components/chip/Chip.vue and chip/chipVariants.ts (verified single-component). Contrast: surfaces-pager.css (.glass-pager-ring) IS correctly central — its consumers are BOTH carousel/CarouselPager.vue AND pager-dots/PagerDots.vue (2 surfaces); glass-chip.css is consumed by chip AND combobox (2 surfaces) — both are legitimate shared registers and should stay central. Only accent-tone is truly chip-private.

**Proposed:** MOVE src/styles/glass/accent-tone.css → src/components/chip/styles.css and re-@import it from src/styles/index.css at chip's cascade rung (remove the glass.css:63 @import). The paired useAccentTone composable is DELIBERATELY parked in /color for a documented value.js-quarantine + SCC-trap boundary (src/composables/color/index.ts header) — record that as a §9 deliberate-keep rather than force-colocate, or colocate into chip/composables only if the quarantine boundary is preserved.

### [minor] oversized-flat-dir-no-submodule

**Claim:** src/components/_shared/ holds 21 flat entries mixing .vue, .ts, and .css with no submodule structure — it exceeds the ~15-entry break-into-common-modules threshold of A07 and is the largest unstructured dir in src/components.

**Evidence:** ls src/components/_shared = 21 entries: FeedbackMark.vue, axes.ts, class-names.ts, control-size.ts, disclosure-context.ts, disclosure.css, feedback-tone.css, feedback.ts, field-control.css, field-surfaces.css, fieldControl.ts, floating.ts, index.ts, interaction.ts, menu.css, menuRowClass.ts, primitive.ts, resolveSurfaceClass.ts, selection.ts, useMotionAxis.ts, valueDomain.ts. Cohesive clusters are already visible in the names (field-*, menu*, feedback*, disclosure*) but not carved into dirs.

**Proposed:** Carve into cohesive submodules: _shared/field/ (fieldControl.ts, valueDomain.ts, field-control.css, field-surfaces.css), _shared/menu/ (menu.css, menuRowClass.ts), _shared/feedback/ (FeedbackMark.vue, feedback.ts, feedback-tone.css), _shared/surface/ (disclosure-context.ts, disclosure.css, resolveSurfaceClass.ts, primitive.ts), _shared/motion/ (axes.ts, useMotionAxis.ts, interaction.ts, selection.ts); keep pure primitives (class-names.ts, control-size.ts, floating.ts, index.ts) at root. Update the barrel + the index.css @imports of the moved .css.

### [minor] internal-colocation-inconsistency-within-feature-dir

**Claim:** src/components/handmark/ splits its logic inconsistently: one composable sits in composables/useHandMark.ts while six sibling helpers (brush, freehand, geometry, ink, noise, texture) plus constants.ts/types.ts sprawl flat at the dir root — unlike blob/ and aurora/ which house ALL helpers under composables/.

**Evidence:** find src/components/handmark: HandMark.vue, composables/useHandMark.ts, and loose root files brush.ts, freehand.ts, geometry.ts, ink.ts, noise.ts, texture.ts, constants.ts, types.ts. Compare blob/ (all 13 helpers under composables/, shaders under shaders/) and aurora/ (17 under composables/, shaders under constants/shaders/).

**Proposed:** Normalize handmark to the blob/aurora pattern: move brush/freehand/geometry/ink/noise/texture into handmark/composables/ (or a handmark/ink/ leaf if they form a rendering sub-family); keep constants.ts/types.ts at root per convention. Update HandMark.vue + useHandMark.ts imports.

### [note] single-consumer-composable-in-public-motion-package

**Claim:** src/composables/motion/morph/useDockCtaReceive.ts is dock-named and consumed only by dock (and its demo story), sitting in the shared motion/ tree rather than dock/composables/ — a borderline colocation case softened only by motion/ being the public /motion package.

**Evidence:** grep useDockCtaReceive (excluding composables/motion) => src/components/dock/index.ts and demo/stories/dock/cta-receive.vue only. It lives at src/composables/motion/morph/useDockCtaReceive.ts. Contrast the genuinely-shared morph siblings useDragMorph and useSelectionGroup/useSelectionIndicator which have 2 consumers each (dock + tabs) and correctly stay central.

**Proposed:** Either colocate into dock/composables/ (consistent with dock's other 14 dock-* composables) OR record it as an intentional public-/motion export if consumers are meant to reach it standalone. If it is not part of the intended /motion public surface, colocate. Low priority relative to the wave/textureUpload/sidebar moves.

