# User feedback 2026-06-23 BATCH 2 (verbatim + dispatch) — "nothing lost"

Mode: tranche-dev + aggressive prototype; triumvirate dispatch (research → plan/wave → prototype); paced batches-of-3, one workflow at a time. Long-horizon.

## A — NAV DOCKS (the emphatic "FIX NOW, mid-tranche, using our prototype + wave info")
| # | Verbatim | Triumvirate / fix |
|---|---|---|
| A1 | "Clicking categories does nothing" | **nav-dock-fix** — the demo shell category nav is dead |
| A2 | "Using these nav buttons doesn't work half of the time" | nav-dock-fix — flaky nav button wiring |
| A3 | "The rail item in the centre is totally broken and needs to use our actual rail PROTOTYPE" | nav-dock-fix — wire the real `<DockStack>` rail (the shipped prototype), not the broken one |
| A4 | "None of this works" | nav-dock-fix |
| A5 | "The bottom dock should have PERSISTENT controls, but also SCROLLING TABS of the current category's pages" | nav-dock-fix — persistent controls + a scrolling category-page tab strip (FadingScroll + the dock) |
| A6 | "The vertical dock is totally broken with the broken rail" | nav-dock-fix — the SidebarDock + its rail |
| A7 | "When you reload a page, it very briefly displays this 'Pick a story' item and then animates to the page — a MAJOR defect" | nav-dock-fix — the initial-render FOUC flash (the route resolves async; an empty/placeholder state paints first) |
**→ `nav-dock-fix` triumvirate** (the priority): research the broken demo shell nav (`demo/layout/` AppShell/BottomDock/SidebarDock/dock-nav) + the "Pick a story" FOUC, wire the SHIPPED dock prototypes (DockStack rail, useContextualDockLayers, the contextual switching, FadingScroll category-tab strip), fix the category nav + the nav buttons + the FOUC. Compose the dock-hub/scroll-fission waves.

## B — TOGGLE / GLASS / STORYBOOK CHROME
| B1 | /forms/toggle — "toggle groups have no distinct state when clicked" | the ToggleGroup selected-state is invisible (the gray-glass/no-distinct-state — fold into W-CONTROL-LIQUID + W-GLASS-ABROGATE-GRAY) |
| B2 | "why is the items here not rounded" | the toggle items need rounded (the radii — W-IOS27-SUFFUSE) |
| B3 | "why is this background so warm — should our storybook itself not leverage our warm cream colors everywhere?" | the storybook chrome should use the warm-cream identity consistently (a chrome-bg audit) |
| B4 | "Why is default so gray" | the default control/surface reads gray (the gray-glass — W-GLASS-ABROGATE-GRAY + §3) |
| B5 | "Cards should be as WIDE as the HERO TITLE text — the fonts should align" | the card max-width = the hero title width (alignment — W-STORY-PAGE-STANDARD) |
→ fold into the GLASS/ios27 + W-STORY-PAGE-STANDARD waves; the toggle-state is a control-liquid fix.

## C — PROCEDURAL VIZ BUGS (the substrate band — re-spec + fix)
| C1 | /substrates/blob — "totally broken"; "the dashed outline does not follow the proper path"; "the hero text should not scroll like this on every page" | **viz-fix** — blob broken + the ghost dashed-outline path + the hero-scroll (W-STICKY-TITLE-CONDENSE) |
| C2 | /substrates/fourier-field — "does not follow the cursor properly"; "These options do not even work" | viz-fix — the cursor-follow + the configurator options dead |
| C3 | /substrates/paper-grid — "the individual paper LINES should not wave, but the CELLS in local boxes should — the grid should TWIST and MORPH as if a wave was passing over and through it" | **viz-respec** — paper-grid: wave the CELLS (local-box warp), not the lines; a wave passing through |
| C4 | /substrates/dot-matrix — "good, but should persist more GRAVITY to the cursor, and should function more in a 2d space as a background effect" | viz-respec — more cursor gravity + a 2d background register |
| C5 | /substrates/goo-dot — "totally broken" | viz-fix — goo-dot broken |
| C6 | /substrates/concentric — "not right; should function as essentially the paper grid, but with concentric LEVEL-SET lines (vector calculus, level set, gradient topology)" | **viz-respec** — concentric = paper-grid mechanics + concentric level-set/gradient-topology |
→ **`viz-respec` triumvirate(s)**: re-spec + fix the procedural vizzes (blob/goo-dot broken; fourier cursor; paper-grid cell-warp; dot-matrix gravity/2d; concentric level-set). The paper-grid + concentric share a level-set/topology basis.

## D — NEW PROCEDURAL BACKGROUND: the BLURRED IMAGE + custom per-page auroras
| D1 | "Each page should have a DIFFERENT, CUSTOM AURORA instead of a constellation to better display the glass effects. Custom aurora, OR images." | per-page custom aurora field (W-PAGE-BACKGROUND — replace constellation defaults with varied auroras) |
| D2 | "research the web for MACRO images of FLOWERS and provide an ARRAY" | a curated macro-flower image array (consumer assets) |
| D3 | "a NEW procedural animation background: the BLURRED IMAGE — take a base image and blur it DRAMATICALLY, with different ZONES of blur, with this blur MOVING SUBTLY like an aurora, to create a subtle aurora-like effect" | **`W-BLURRED-IMAGE-BG`** (NEW) — a procedural background: a base image, zone-varying dramatic blur, the blur-zones drifting subtly (aurora-like) |
→ **`blurred-image-bg` triumvirate**: research (the macro-flower array + the zone-blur-drift technique — a multi-zone gaussian/lens blur on a sampled image, the zones animated like aurora nuclei) → spec W-BLURRED-IMAGE-BG → prototype.

## Dispatch order (paced, one workflow at a time)
1. **nav-dock-fix** (the emphatic "fix now") — investigate + wire the shipped dock prototypes + the FOUC.
2. **viz-respec** (blob/goo-dot broken; paper-grid/concentric level-set; fourier; dot-matrix).
3. **blurred-image-bg** (the new procedural bg + macro flowers).
4. continue the Pass-E audit + the toggle/glass/chrome folds in parallel-paced.
