# Round 2B (confirmation pass) — colocation-census (edict A07)

## Summary

CENSUS TRUTH (supersedes design-idioms §3/§7, which describe a DEAD layout). The colocation migration has ALREADY largely happened and set a strong house standard — the conforming pattern to standardize is: component root holds the .vue + index.ts + README/DESIGN.md; sub-trees composables/, constants/ (or constants.ts), shaders/, styles/ (with nested submodules e.g. dock/styles/controls/, tabs/styles/) sit beside it. Gold-standard exemplars: aurora/ (composables/ + constants/ + constants/shaders/), liquid-grid/ (composables/ + shaders/ + constants.ts), dock/ (composables/ + styles/controls/), tabs/, blob/, fourier-field/. Per-component CSS is now colocated as `<component>/styles.css` across ~40 components (avatar, button, card, checkbox, command, drawer, dropdown-menu, switch, tags-input, …), and shared registers moved to _shared/ (feedback-tone.css, menu.css, field-*.css) — so §3's home-map (feedback-tone.css, menu.css, cards.css, dock-controls.css, instrument-chassis.css, utilities/animate.css all at src/styles/*) is entirely stale; every one of those paths is GONE. No global src/types or src/constants dir exists (good). RESIDUAL VIOLATIONS are narrow: (1) src/composables/glass/wave/ — an explicitly INTERNAL leaf whose only consumer is liquid-grid; (2) glass/textureUpload.ts — aurora-only; (3) the glass backdrop-luminance 3-file cluster — dock-only; (4) _shared/ at 21 flat entries is the one long-dir that never got its submodule carve; (5) src/composables/sidebar/ is demo-shell nav machinery promoted to a shipped /sidebar subpath, its real consumers being demo (toc-tracking, manifest, virtual) + one dock reach (useScrollTo) — asymmetric with demo/composables/virtual/ which IS demo-local. FEWEST-MOVE MIGRATION: `git mv src/composables/glass/wave → src/components/liquid-grid/wave` (rewrite 3 liquid-grid import lines; barrel is off-public so no API churn); `git mv src/composables/glass/textureUpload.ts → src/components/aurora/composables/` (rewrite 3 aurora lines); relay the backdrop-cluster + sidebar as PRUNING questions (A05 one-consumer bar) rather than blind moves; carve _shared/ into field/ feedback/ menu/ disclosure/ surface/ submodules + a core barrel. Public-barrel single-consumer helpers (useAccentTone→/color, useScrollChrome→/motion-core, useDockCtaReceive→/motion) are defensible as module-level API but are watch-items. IMPORTANT CAVEAT: consumer counts were derived by static symbol+path grep with NO browser/build run; treat the single-consumer claims as high-confidence-but-verify before any move.

## Findings (9)

### [major] single-component-leaf-in-global-composables

**Claim:** src/composables/glass/wave/ (waveField.ts + waveField.glsl.ts + waveField.wgsl.ts + index.ts) is an explicitly INTERNAL leaf that serves exactly one component, liquid-grid, yet sits in the library's global glass composables.

**Evidence:** src/composables/glass/wave/index.ts:1-3 header self-describes it as "the shared wave-field leaf barrel (INTERNAL — off the public glass barrel)". The only importers are src/components/liquid-grid/composables/liquidGrid.ts, liquid-grid/shaders/liquid-grid.glsl.ts, liquid-grid/shaders/liquid-grid.wgsl.ts — zero other components, not on any public subpath. liquid-grid/ already owns shaders/ and composables/ subdirs, so it is the natural home.

**Proposed:** git mv src/composables/glass/wave → src/components/liquid-grid/wave (or fold the .glsl/.wgsl into liquid-grid/shaders/ and waveField.ts into liquid-grid/composables/); rewrite the 3 liquid-grid import lines. Off-public barrel means no API break — clean colocation, single wave.

### [major] long-flat-dir-no-submodule-carve

**Claim:** src/components/_shared/ is a 21-entry flat grab-bag mixing 5+ unrelated cohesion families with no submodule structure — the one directory the edict's 'long dirs broken into common modules' clause squarely targets.

**Evidence:** ls src/components/_shared/ = 21 entries spanning field-control (control-size.ts, field-control.css, field-surfaces.css, fieldControl.ts, valueDomain.ts), feedback (feedback.ts, feedback-tone.css, FeedbackMark.vue), menu (menu.css, menuRowClass.ts), disclosure (disclosure.css, disclosure-context.ts), surface (resolveSurfaceClass.ts, axes.ts), and loose primitives (interaction.ts, selection.ts, primitive.ts, floating.ts, useMotionAxis.ts, class-names.ts) behind one index.ts barrel. It is the largest component dir and the only long dir left un-carved (dropdown-menu at 17 is cohesive sub-components, not a grab-bag).

**Proposed:** Carve _shared/ into cohesion submodules: field/ · feedback/ · menu/ · disclosure/ · surface/ · motion/, keeping interaction/selection/primitive/floating/class-names as a thin core barrel. Bigger touch-count than the leaf moves (many import sites) — schedule as its own wave; keep the _shared/index.ts barrel stable so consumers are unaffected.

### [major] dead-doc-layout

**Claim:** docs/precepts/design-idioms.md §3 (@utility home-map) and §7 (colocation CSS half) describe a layout that no longer exists — the census is the truth source for the rewrite the charter flagged.

**Evidence:** §3's home-map rows point at src/styles/feedback-tone.css, src/styles/menu.css, src/styles/cards.css, src/styles/dock-controls.css, src/styles/instrument-chassis.css, src/styles/utilities/animate.css — all six are GONE from those paths (verified by file test). Reality: feedback-tone.css + menu.css moved to _shared/; cards→card/styles.css; dock-controls→dock/styles/controls.css; instrument-chassis→instrument-chassis/styles.css. §7 still says 'a per-component style lives in a CENTRAL partial (src/styles/*.css), NOT in the component's feature-dir' — but ~40 components now ship <component>/styles.css inside the feature-dir (avatar, button, card, dock/styles/*, tabs/styles/*, dropdown-menu/styles.css, …). The doc inverts the current standard.

**Proposed:** Rewrite §3/§7 against this census: the CURRENT rule is per-component styles colocate as <component>/styles.css (or <component>/styles/ with submodules), shared ≥2-family registers live in _shared/*.css, only truly cross-cutting cascade stylesheets stay at src/styles/ root. Delete the stale home-map rows or repoint them to the moved paths.

### [minor] single-component-leaf-in-global-composables

**Claim:** src/composables/glass/textureUpload.ts serves only aurora and is not on any public barrel — it belongs in aurora/composables/.

**Evidence:** Importers are exclusively aurora: aurora/composables/auroraImageSource.ts, aurora/composables/wgpuSetup.ts, aurora/constants/presets.ts. Not exported from src/composables/glass/index.ts (grep for textureUpload in the glass barrel = none) nor src/index.ts. aurora/composables/ already exists (16 files), so the move is a natural fit.

**Proposed:** git mv src/composables/glass/textureUpload.ts → src/components/aurora/composables/textureUpload.ts; rewrite the 3 aurora import lines. Single-file clean move, no API surface.

### [minor] single-component-leaf-in-global-composables

**Claim:** The glass backdrop-luminance cluster (backdropLuminanceSample.ts, backdropSampleMath.ts, useGlassBackdropLuminance.ts) is a 3-file family whose only src consumer is dock, but it is presented as a reusable glass primitive.

**Evidence:** backdropSampleMath.ts is used only by backdropLuminanceSample.ts + useGlassBackdropLuminance.ts (intra-cluster); useGlassBackdropLuminance.ts's only src component importer is src/components/dock/GlassDock.vue (plus demo showcases demo/stories/substrates/glass-material.vue and demo/stories/dock/_frame/DockStage.vue). None on a public barrel. So it is a single-src-consumer cluster wearing a glass-primitive name.

**Proposed:** RELAY as a pruning question (A05 'one consumer is not enough'): either colocate the 3 files into dock/composables/ (accepting it as dock-owned), OR keep it as a glass primitive by earning a genuine 2nd component consumer. The demo/glass-material story showcases it AS a glass primitive, so this is a judgment call for the user, not a blind move.

### [minor] mis-homed-public-helper

**Claim:** useDockCtaReceive.ts lives in the generic src/composables/motion/morph/ but is dock-named and dock-only-consumed — a public helper filed under the wrong cohesion.

**Evidence:** Its only component consumer is dock (src/components/dock/index.ts re-exports it; demo/stories/dock/cta-receive.vue). It is also re-exported from src/composables/motion/index.ts (the /motion public subpath), so it is public API — but the name useDockCtaReceive + sole-dock use argue it should sit in dock/composables/ and be re-exported from dock/index.ts (which already happens).

**Proposed:** Colocate into dock/composables/ and drop the motion/index.ts re-export (clean break, no alias — dock/index already surfaces it), OR keep in motion/ if a second morph consumer is intended. Watch-siblings on public barrels — useScrollChrome (→/motion-core, only reader is dock's useDockSearch) and useAccentTone (→/color, only consumer is chip) — are defensible as shipped module-level API; leave them but flag as single-consumer watch-items.

### [minor] demo-shell-machinery-in-shipped-src

**Claim:** src/composables/sidebar/ (9 files) is the demo storybook's TOC/nav machinery promoted to a shipped /sidebar subpath, yet has no owning component and near-zero real src consumers.

**Evidence:** There is no src/components/sidebar. package.json exports './sidebar'. Real consumers of the sidebar composables are demo-shell: demo/stories/navigation/toc-tracking.vue, demo/stories/manifest, demo/composables/virtual/virtualSectionLayout.ts — plus a single src reach, dock/composables/useDockSearch.ts importing useScrollTo. useSidebarState.ts has zero consumers anywhere. This is asymmetric with demo/composables/virtual/, which is correctly demo-local.

**Proposed:** RELAY as a pruning/placement question (A05): either the sidebar package earns its shipped status with a real external contract, or it is demo-shell code that belongs in demo/composables/sidebar/ (matching demo/composables/virtual/), with dock's lone useScrollTo need satisfied by a tiny colocated helper. Do not move blind — the /sidebar subpath is a published API surface.

### [note] loose-global-stylesheet-grouping

**Claim:** src/styles/ root holds 12 loose .css files where a scroll-* and glass-* family could carve into submodules, matching the dock/styles and tabs/styles precedent.

**Evidence:** src/styles root: scroll-choreography.css, scroll-chrome.css, scroll-driven.css (a scroll/ family), glass-refract.css, glass-specular-track.css (glass/ already exists as a subdir — these two are stragglers outside it), plus draw-in.css, viz-reveal.css, transitions.css, view-transition.css, animations.css. These are global cascade-ordered stylesheets (design-idioms §5 god-module carve), so this is a grouping nicety, not a true colocation break.

**Proposed:** Optional tidy: fold glass-refract.css + glass-specular-track.css into src/styles/glass/, group the three scroll-*.css into src/styles/scroll/. Preserve @import cascade order (§5 rule 3). Low priority — module-level stylesheets, no per-component ownership at stake.

### [note] conforming-pattern-and-demo-read

**Claim:** The demo/ tree already conforms to the same edict (chassis/shell/stories + demo-local composables), and the src conforming exemplars establish the standard the residual violations should be squared to.

**Evidence:** demo/chassis/ carves page-parts into submodules (body/ code/ family/ hero/ landing/ page/ play/ section/ showcase/ + routeTransition.ts + useStoryNavigation.ts); demo/shell/ colocates SidebarDock.vue + useShellNavDock.ts + dock-nav.css + configurator/; demo/stories/ is category-partitioned (compositions/ data/ display/ dock/ feedback/ forms/ foundations/ motion/ navigation/ substrates/); demo/composables/virtual/ is correctly demo-local. Src exemplars: aurora/, liquid-grid/, dock/, tabs/, blob/, fourier-field/ (component + composables/ + constants[/] + shaders/ + styles/ + README/DESIGN.md). ~40 <component>/styles.css files + colocated constants.ts prove the pattern is already the majority reality.

**Proposed:** Codify THIS as the canonical colocation shape in the design-idioms rewrite (deliverable feeding A06/A07): component-root = .vue + index.ts + README; sub-trees composables/ constants[/] shaders/ styles[/] beside it; only cross-cutting cascade CSS and genuinely multi-family composables stay global. The residual five findings above are the delta to close, not a systemic gap.

