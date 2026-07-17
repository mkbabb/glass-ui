# Round 1 — story-page structure census (?)

## Summary

The demo is 100 navigable pages — 1 catalog home + 11 section landings + 88 story routes (+14 family-member sub-pages, +404) — and every route does root through the single StoryPage chassis (directly or via VizStudio), so the meta-framework ROOT is genuinely standardized. But StoryPage exposes only ONE variant axis (hero|page); the "per-type variants" the user ordered are realized instead as ~6 parallel, non-unified wrapper mechanisms plus ~23 pages carrying bespoke scoped CSS, and the width/hero-scale idioms diverge (an undefined width token, dead landing-scale data). The natural taxonomy the census supports is ~7 clean page types, but the implementation splinters them into far more distinct layout idioms than variants exist to name them.

## Findings (6)

### [major] per-type-variant-fragmentation

**Claim:** The ONE standardized meta-framework with per-type variants is unrealized: StoryPage is a universal root but carries a single variant axis (hero|page), while the actual per-type behavior is scattered across ≥6 parallel wrapper frameworks with no page-type discriminant, so no registry maps page-type → layout.

**Evidence:** StoryPage.vue:32-34 defines the only variant: `variant = story.hero ? 'hero' : 'page'`. Per-type behavior lives in disjoint wrappers instead: VizStudio.vue (substrate studio, wraps Configurator), dock/_frame/DockStage.vue (dock backdrop column, used by 7/8 dock routes), family/FamilyTabs.vue + story-nested.ts (family switcher, 7 routes), body/StoryBodyRenderer.vue (data-driven, 3 files), plus hand-authored StorySection/ShowcaseFrame stacks. ~23 route SFCs additionally carry bespoke scoped <style> (motion/deck.vue 227 lines, dock/dock-search.vue 97, display/surface.vue 42, compositions/settings.vue 37, foundations/surface-tints.vue 41).

**Proposed:** build — a page-type field on the manifest Story + a StoryPage variant registry keyed by it (spec | studio | dock | family | scene | landing | doc), folding VizStudio/DockStage/FamilyTabs into named variants rather than ad-hoc sibling wrappers.

### [major] undefined-layout-token-noop

**Claim:** The dominant page type's width cap is inoperative: the page-variant article sets max-inline-size to var(--story-article-w), a token defined nowhere, so it computes to `none` and every content page runs uncapped, while hero pages cap at 72rem and landings at max-w-6xl — three divergent width idioms where one was intended.

**Evidence:** StoryPage.vue:48-53 sets `maxInlineSize: variant==='page' ? 'var(--story-article-w)' : 'var(--story-page-max-inline)'` with no fallback. Repo-wide grep for `story-article-w` returns exactly one hit (that reference); 0 definitions in src/styles, 0 @property registrations. The hero path's --story-page-max-inline:72rem is defined at story-hero.css:5; the landings hardcode max-w-6xl (CatalogLanding.vue:13, SectionLanding.vue:22). No .story-page-article CSS rule sets a width. .demo-main-scroller (dock-nav.css:132) has no max-width, so content articles fill the full column.

**Proposed:** build — define --story-article-w (the intended content reading measure) in story-hero.css, or collapse to the single --story-page-max-inline for both variants; the undefined-token no-op is a silent break, not a design choice.

### [major] dead-scale-data-render-contradiction

**Claim:** The section-landing and catalog-home heroes render at the SMALLEST title rung despite the manifest declaring them the largest: landing.heroScale is computed as 'hero' but never consumed — SectionLanding.vue and CatalogLanding.vue hardcode hero-scale="4", so all 11 section heroes render at display-4 (equal to a D3 sub-page, smaller than the section's own D2 main at display-5), inverting the documented depth-IS-size hierarchy.

**Evidence:** manifest.ts:296-302 sectionLanding() returns `heroScale: "hero", depth: "D1"`; manifest.ts:133 documents D1 as "the largest audacious rung, out-sizing every page beneath it"; assignDepths maps D0→mega (manifest.ts:333). But SectionLanding.vue:28 passes literal `hero-scale="4"` (only :depth is data-bound) and CatalogLanding.vue:18-19 passes `hero-scale="4" depth="D0"`. story-hero.css:88-102 maps scale 4→type-display-4, hero→type-display-hero, mega→type-display-mega. Net: landing.heroScale is dead data; the two D0 declarations (home vs foundations/intro at manifest.ts:352) render at different sizes (4 vs mega).

**Proposed:** build — bind SectionLanding/CatalogLanding hero-scale to landing.heroScale (delete the hardcoded "4"), or retire the unused heroScale field; the current state is both dead data and a hierarchy inversion.

### [minor] studio-idiom-fork

**Claim:** The substrate category carries three distinct staging idioms for the same job, and liquid-grid hand-reimplements the shared VizStudio studio wrapper instead of using it — a needless configurator idiom fork within one category.

**Evidence:** aurora.vue:121, blob.vue:476, fourier-field.vue:318 stage via the shared VizStudio.vue (StoryPage→StorySection→Configurator, stage-left/controls-right, height-class, shadow-cartoon). liquid-grid.vue:113-123 open-codes the identical pattern by hand (StoryPage→StorySection→`<Configurator class="h-[min(78vh,720px)] shadow-cartoon">` with #stage/#controls) with 0 VizStudio import. constellation.vue/glass-material.vue/glass-panel.vue use neither VizStudio nor Configurator (StorySection/ShowcaseFrame spec-sheet). Heading naming also forks: VizStudio pages use display names ("Aurora","Blob","Fourier Field") vs liquid-grid.vue:115 heading="LiquidGrid".

**Proposed:** fold-into-per-type-variant-fragmentation — route liquid-grid through VizStudio; the studio idiom is exactly what VizStudio exists to standardize.

### [minor] hero-variant-heading-duplication

**Claim:** VizStudio studio pages render the page title twice: hero:true makes StoryPage emit the StoryHero <h1> from story.title, and VizStudio's inner StorySection emits the same string as an <h2>, so each studio page shows its name at two heading levels.

**Evidence:** aurora is hero:true (manifest.ts:435-437); StoryPage.vue:83-104 routes hero pages into StoryHero whose <h1> renders heroDisplayTitle=title (StoryHero.vue:48,162-168) = "Aurora". VizStudio.vue:72-73 wraps content in `<StorySection :heading="heading">`; aurora.vue:122 passes heading="Aurora" → <h2> "Aurora". Same duplication for blob (manifest.ts:450-452 hero; blob.vue:477 heading="Blob") and fourier-field (manifest.ts:478-481 hero; fourier-field.vue:319 heading="Fourier Field").

**Proposed:** build — either drop the redundant StorySection heading on hero-variant studios or suppress the StoryHero title when VizStudio owns the heading; verify in-browser (Playwright seat) to confirm both render.

### [note] unadopted-standardized-subsystem

**Claim:** The pages-as-data StoryBody framework — a substantial standardized spec-page path — is adopted by only 3 files out of 88 routes, so ~97% of spec pages remain hand-authored StorySection/ShowcaseFrame templates and the intended uniformity is near-unrealized.

**Evidence:** story-body.ts (175 lines, the schema) + body/StoryBodyRenderer.vue (266 lines, the renderer) constitute the subsystem. `grep -rl ':body=' stories/` returns exactly 3 files: forms/select.vue, feedback/alert.vue, display/badge.vue (and select is a family-member sub-page, not a route). Every other spec route hand-authors its section stack (e.g. the 90 files importing StorySection).

**Proposed:** retire-or-expand — either migrate the uniform spec pages onto StoryBody to justify the ~440 LOC, or retire the schema as overfit; at 3 consumers it reads as a near-dead standardized path (fails the ≥2-real-consumers overfitting bar only nominally).

