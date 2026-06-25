# BUILD-REPORT-1 — Nav-Dock Fix (W-NAV-DOCK-FIX / W-DOCK-HUB-API)

**Wave:** BD · refine · nav-dock-fix
**Date:** 2026-06-23 (mid-tranche, fix-NOW)
**Status:** BUILT + LIVE-VERIFIED on `http://localhost:5173`. Typecheck clean (no new errors), siblings intact, `proof:no-gray` 39/39 (incl. 3 new dock witnesses).

The seven verbatim defects all reduce to four root causes — an ASSEMBLY/wiring fix (the engines are 100% shipped, the assembly was wrong). ONE token family + ONE rim α in `src/`; everything else `demo/`. NO re-fork, NO new component, NO new store, NO Lenis/GSAP. Compositor-only, PRM-carved, Safari-OK (the `saturate()`/`brightness()` inside `backdrop-filter` is Baseline; the build owns the `-webkit-` prefix pass).

---

## What built — file/line ledger

| # | File | Change |
|---|---|---|
| F1 | `demo/layout/AppShell.vue` (~277–297) | Gate the "Pick a story" placeholder behind `route.matched.length === 0` (a genuine no-route), not `!Component` (async-pending). During async resolve of a matched route the `<Transition>` renders NOTHING — no flash. |
| F2 | `demo/router.ts` (after `createRouter`) | One-shot `router.beforeResolve` that eager-awaits the FIRST navigation's lazy component (removes itself after). |
| F2b | `demo/main.ts` | `await router.isReady()` BEFORE `app.mount("#app")` — the first paint is the resolved page, never an empty `<RouterView>`. |
| F3 | `demo/layout/SidebarDock.vue` | Drop the `collapsible` computed + the `#collapsed` summary slot; the desktop category rail is `always-expanded` (categories clickable from frame 0, no inert dead-click). |
| F4 | `demo/layout/SidebarDock.vue` | `railItems` maps per-facet `accent`; render `<DockStack mode="facets" :core="Boxes" :visible-count="4" position="end">` (byte-matches `liquid-playground.vue`). |
| F5 | `demo/layout/BottomDock.vue` | Same `accent` + `mode="facets"` rail fix; import `FadingScroll` + `Boxes`. |
| F6 | `demo/layout/BottomDock.vue` (`#story-nav`) | PERSISTENT prev/next (`:disabled="!hasPrev/!hasNext"`, never DOM-absent) + a `<FadingScroll axis="x">` strip of `current.category.stories` as `DockTabButton`s wired to `goToStory`. Dock is `always-expanded` (one row). Dropped the `summaryStories`/`SUMMARY_MAX`/`#collapsed` machinery (clean break). + scoped CSS to cap the strip so it scrolls (box-INVIOLATE). |
| F7 | `demo/stories/dock-layer-contexts.ts` | `ContextLayer` gains `accent: string`; every facet row carries an `accent: "var(--section-color-N)"` (palette cycle 2/3/7/5/9/11 so no two adjacent share a hue); `FALLBACK` → `--section-color-7`. |
| S1 | `src/styles/tokens/glass.css` | Mint `--glass-saturate-dock: 1.4`; light `--glass-blur-dock` += `saturate(var(--glass-saturate-dock)) brightness(1.02)`. |
| S2 | `src/styles/tokens/glass.css` | `--glass-border-dock` 4% → 8% warm-ink (the floating-chrome silhouette). |
| S3 | `src/styles/tokens/dark-arm.css` | Re-point dark `saturate(1.30)` → `saturate(var(--glass-saturate-dock))` + declare `--glass-saturate-dock: 1.30` in `.dark` (single retune knob, value unchanged). |
| src+ | `src/components/custom/dock/DockIconButton.vue` | Add a `disabled?: boolean` prop (the four-state contract — the boundary nav prev/next needs it); lands native `disabled` (on a `<button>` host) + `aria-disabled`. |
| src+ | `src/styles/dock-controls/icon-button.css` | Add the `&:disabled` register (opacity `--opacity-disabled` + `pointer-events:none`) — the comment promised the contract, the rule was missing. |
| G1 | `scripts/proof-no-gray.mjs` | 3 source witnesses: `dock-blur-has-saturate-light`, `dock-blur-saturate-lockstep`, `dock-border-readable-light` (NO floor weakened). |
| G2 | `tests-visual/nav-dock-fix.spec.ts` | NEW binding π — FOUC-zero + category-live + rail-facets + tab-strip + warm-glass, both modes, ≥2 viewports. |

---

## Before / after (computed values, live on `:5173`)

### Defect 7 — FOUC
- **Before:** `<RouterView v-slot>` yields `Component === undefined` during the ~181–414ms lazy-chunk load, so the `v-else` "Pick a story" `<Card>` painted, then `fade-slide` animated the real page over it.
- **After (cache-ignoring reload of `/motion/deck`):** `window.__fouc === 0` — ZERO "Pick a story" frames across the resolve window; `main` painted `MOTION · DECK …` directly. The `fade-slide` page-enter is KEPT.

### Defects 1, 6 — dead category nav (vertical dock)
- **Before:** SidebarDock started collapsed → the 10 category buttons lived in `.dock-layer--full` (`inert:true, pointer-events:none, opacity:0` at rest) → dead-click until a ~400ms hover-dwell.
- **After:** `totalCategories: 10, deadCount: 0`, every `.demo-sidebar-item` resolves `pointerEvents: "auto", visibility: "visible"`, layer `inert: false`. A click on "Forms" navigated `/display/buttons → /forms/inputs`.

### Defects 2 — flaky nav buttons
- **Before:** prev/next were `v-if="hasPrev/hasNext"` — DOM-absent at boundaries (reads flaky); rapid clicks raced re-mounts.
- **After:** 4 consecutive `next` clicks (150ms apart) → `allChanged: true` (`textarea→checks→slider→number-field→select`). prev/next are PERSISTENT (`prevNextCount: 2`); at the first story `prevDisabled: true` + `aria-disabled="true"` + `pointer-events:none` (honest four-state, never DOM-absent). Category-jump wraps (`/forms/select → /display/buttons`).

### Defect 3, 6 — the rail is the SHIPPED facets carousel
- **Before:** both shell docks rendered `<DockStack>` with NO `mode` (default `"stack"` glyph fan) + NO `accent`.
- **After (`/forms/inputs`):** both stacks resolve `data-mode="facets"`; 3 chips each with DISTINCT `--glass-accent` (`var(--section-color-2)` → resolves `oklch(0.484 0.163 265.5)`, `-3`, `-7`); `--glass-accent-strength: var(--dock-facet-accent-strength)`. **Box INVIOLATE:** dock box `59×631` before AND after the fan-expand (`deltaW=0, deltaH=0`). The carousel fans into the gutter (screenshot: `after-light-facet-fan.png`).

### Defect 5 — the bottom-dock category-page tab strip
- **Before:** only a ≤4 collapsed-summary chip slice; no full in-category strip.
- **After (`/forms/inputs`):** `.demo-bottom-dock__tabs` present, `display:flex`, `overflow-x:auto`; **12 tabs** (every Forms page); active tab "Inputs" carries `aria-current="page"`; `scrollWidth 1460 > clientWidth 672` → overflows + scrolls internally; FadingScroll mask present, `--fade-end: 16px` (end feathered while overflowing). Bottom dock `clientHeight: 55px` (ONE row, box constant). A tab click navigated `/forms/inputs → /forms/slider`.

### Gray-glass optical fix (warm-cream luminous, never gray)
- **Before:** light `--glass-blur-dock: blur(9px)` ALONE (the only light tier with no `saturate()` companion) — over the flat warm-cream page the un-saturated backdrop-filter pulled the cream toward neutral.
- **After (light, `/forms/slider`):** dock `backdrop-filter: blur(9px) saturate(1.4) brightness(1.02)`; plate fill `srgb 0.903 0.871 0.840 / 0.44` → OKLab **L 0.906 · C 0.014 · H 67.2°** (warm register [45,85], above the chroma floor); border `0.08` warm-ink (H56°).
- **After (dark):** `backdrop-filter: blur(9px) saturate(1.3) brightness(1.12)` (the named `--glass-saturate-dock: 1.30` knob via `.dark` re-declare); plate → OKLab **L 0.449 · C 0.0178 · H 59.9°** (warm luminous-dark transmissive). Screenshots: `after-dark-forms-slider.png`.

---

## Screenshots (on disk)

- `docs/tranches/BD/viz/refine/nav-dock-fix/after-light-forms-slider.png` — the full shell: warm-cream sidebar rail (always-expanded), bottom dock with the scrolling tab strip + persistent prev/next + category-jump.
- `docs/tranches/BD/viz/refine/nav-dock-fix/after-light-facet-fan.png` — the `mode="facets"` carousel fanned into the gutter above the bottom dock (3 accent chips).
- `docs/tranches/BD/viz/refine/nav-dock-fix/after-dark-forms-slider.png` — dark mode: luminous-dark transmissive glass docks + facet fan + tab strip.

---

## Typecheck / a11y / gates

- **`npx vue-tsc --noEmit -p tsconfig.json`:** 0 errors (no new errors). The `DockIconButton :disabled` TS errors were resolved by adding the declared prop.
- **`node scripts/verify-siblings-intact.mjs --quiet`:** SIBLINGS OK.
- **`node scripts/proof-no-gray.mjs`:** 39/39 pass — the 3 new dock witnesses GREEN (`dock-blur-has-saturate-light`, `dock-blur-saturate-lockstep` = light 1.4 + dark carries saturate, `dock-border-readable-light` = 8% ≥ 6%); every pre-existing floor unchanged (`surface-tint-stays-srgb` still GREEN — S1 touches `backdrop-filter`, not the in-srgb family).
- **a11y:** the disabled boundary control lands native `disabled` + `aria-disabled="true"` + `pointer-events:none` (AT-announced four-state). The category buttons keep `aria-current="page"`. The rail core is `aria-expanded`. AA text contrast preserved (the warm-ink rim + the warm-cream plate clear the chroma floor; the `--on-glass-muted` register untouched). Console: only 2 PRE-EXISTING warnings (a StoryPage `<Transition>` non-element-root warn + the aurora-no-onInitError demo warn), neither from this wave; ZERO errors.

---

## Fences honored

- **NO re-fork:** wired the SHIPPED `<DockStack mode="facets">` / `useContextualDockLayers` / `<FadingScroll>` / `GlassDock` / `useStoryNavigation`. No demo-local rail capsule, no second nav store, no parallel scroll engine.
- **NO Lenis/GSAP:** native `<FadingScroll>` + `.smooth-scroll`.
- **NO gray:** every dock surface warm material (OKLab H 60–67°, both modes); the rail accents are `--section-color-N` library identities READ by the demo (presets-in-consumers — the demo mints no library token).
- **NO layout animation:** the rail feeds zero size into the dock box (`deltaW=deltaH=0`); the saturate is a `backdrop-filter` paint op.
- **ONE registry:** every nav path (category click, tab click, prev/next, rail chip, category-jump) routes through the ONE `useStoryNavigation` registry; the rail `railContext` echo-suppression is KEPT verbatim.
- **Clean break, no legacy:** the `#collapsed` summary slices + `summaryStories`/`SUMMARY_MAX`/`collapsible` are deleted, not aliased.

## Notes / deviations from spec

- The spec's tab-strip CSS targeted `:deep([data-fade-scroll-content])`, but `<FadingScroll>` renders its content as a direct `<slot/>` inside the `.fading-scroll` root (no content wrapper). Since `class="demo-bottom-dock__tabs"` merges onto the FadingScroll root, the flex/cap rules target `.demo-bottom-dock__tabs` directly (the root IS the scroll port) + `> *` for the flex children — verified live (`display:flex`, `overflow-x:auto`, mask present).
- Added a `disabled` prop to `DockIconButton` + the `:disabled` CSS rule (the spec's F6 used `:disabled` but the primitive didn't declare it; this is a legitimate src/ strengthening of the four-state contract the comment already promised, not a workaround).
- The bottom dock is now `always-expanded` (the full tab strip + persistent controls supersede the collapse-summary register — the spec's F6 intent).
