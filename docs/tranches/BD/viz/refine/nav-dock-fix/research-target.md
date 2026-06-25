# Nav-Dock Fix — Research Target (RESEARCH-2: SOTA / DESIGN TARGET)

**Wave:** BD refine · nav-dock-fix · W-DOCK-HUB-API (the dock is the central hub)
**Role:** Define PRECISELY the correct target the fix must hit — visual + behavioral + motion — against the binding north star.
**Date:** 2026-06-23 (mid-tranche, fix-NOW)

---

## 0. The verbatim user defects (the acceptance surface)

| # | Verbatim | Class |
|---|---|---|
| 1 | "Clicking categories does nothing" | DEAD category nav |
| 2 | "Using these nav buttons doesn't work half of the time" | FLAKY nav-button wiring |
| 3 | "The rail item in the centre is totally broken and needs to use our actual rail PROTOTYPE" | WRONG rail render (stack-mode generic glyph, not the shipped `mode="facets"` accent carousel) |
| 4 | "None of this works." | systemic |
| 5 | "The bottom dock should have PERSISTENT controls, but ALSO SCROLLING TABS of the current category's pages" | MISSING category-page tab-strip (FadingScroll), persistent + scrolling |
| 6 | "The vertical dock is totally broken with the broken rail." | vertical dock + rail broken |
| 7 | "When you reload a page, it very briefly displays this Pick a story item and then animates to the page" | INITIAL-RENDER FOUC (the async-route placeholder flash) |

**The bar is GESTALT, not per-mechanism.** Every defect closes only when the live shell reads as a working, idiomatic, liquid-glass central hub on a fresh reload — wired to the SHIPPED prototypes, not a re-fork. (`proof:ba-gestalt` dock + cross-page verdict, re-earned on a fresh capture at W-REFLECT.)

---

## 1. The ROOT CAUSES (what the fix must hit, located in source)

These are the diagnosed roots — the design target is "the surface the fix produces once each root is closed."

### R-1 · The Pick-a-story FOUC (defect 7) — async-route placeholder flash
`demo/router.ts` resolves every story route through `lazy(cat, id)` → `import.meta.glob("./*/*.vue")` **without `{ eager: true }`** → every `component:` is a dynamic-import chunk. On reload, `AppShell.vue:277` `<RouterView v-slot="{ Component }">` yields `Component === undefined` for the frames while the async chunk loads, so the `v-else` `<Card>` "Pick a story" placeholder (`AppShell.vue:287-295`) **PAINTS**, then the route resolves and the `<Transition name="fade-slide">` animates the real page in over it. The flash is structural: a `v-else` placeholder on an async `<RouterView>` is the FOUC.

**Target:** the "Pick a story" placeholder NEVER paints on a real route. Two correct closes (idiomatic, no workaround):
- **(A) Suspense-gate the route** — wrap the `<RouterView>` component in `<Suspense>` so Vue holds the OLD view (or a no-flash fallback) until the new async component resolves, and the placeholder is gated behind `route.matched.length === 0` (a genuine no-route), not behind `!Component` (an async-pending route). The `Card` placeholder is reachable ONLY for the literal empty/404 surface, never for a resolving story route.
- **(B) Eager-resolve the first paint** — a router `beforeResolve`/`isReady()` await on the initial navigation so the first mount never renders an empty `<RouterView>`; the placeholder's `v-if` guards on `route.name == null` (no matched route), never on `!Component`.

Either path: the guard discriminates *no matched route* (legit empty state) from *async-pending route* (must not flash). PRM-irrelevant (this is a render-gate, not motion). The page-enter `fade-slide` is KEPT — it animates the real page in once, with no placeholder underneath.

### R-2 · The rail is rendered in the WRONG MODE (defects 3, 6) — stack-mode, not facets
The shipped `<DockStack>` (`src/components/custom/dock/DockStack.vue`) has TWO render modes:
- `mode="stack"` (default) — a macOS hover-expand glyph fan; a generic `Layers` core + clear glass icons. NO accent, NO context identity.
- `mode="facets"` (BE.W-DOCK-RAIL-REALIZE) — the **real context CAROUSEL**: a flex strip of accent-tinted facet CHIPS, each carrying its OWN `--glass-accent` hue (per-instance chromatic rim+glint), the active facet lit on the `--dock-control-active-bg` selected-as-glass tier, depth-tiered via `projectFacets` (φ-ring recession scale+opacity).

**The shipped prototype** (`demo/stories/dock/liquid-playground.vue:822-831, 869-878`) renders the rail CORRECTLY:
```
<DockStack v-model:selected="railContext" mode="facets" :items="facets"
           :core="Folder" core-label="Switch context" :visible-count="4" position="end" />
```
with per-facet `accent: "var(--section-color-N)"` on each item.

**The shell docks render it WRONG** (`SidebarDock.vue:441-447`, `BottomDock.vue:380-386`):
```
<DockStack v-if="railItems.length" v-model:selected="railContext"
           :items="railItems" core-label="Section facets" />   ← NO mode, NO core, NO accent, NO visible-count
```
→ DEFAULT `mode="stack"` → a generic gray `Layers` glyph instead of the accent context carousel. AND `railItems` (`SidebarDock.vue:114`, `BottomDock.vue:97`) strips the icon (`icon: typeof l.icon === "string" ? undefined : l.icon`) and supplies **NO `accent`** field — so even if switched to facets mode, the chips would be hueless. This is "the rail item in the centre is totally broken" (defect 3) verbatim.

**Target:** the shell rail uses the SHIPPED prototype byte-for-byte — `mode="facets"`, `:core`, `:visible-count`, and each `DockStackItem` carries an `accent` (a `--section-color-N` library identity hue, presets-in-consumers; never an invented hue), so the shell rail reads as the same accent-tinted context carousel `liquid-playground.vue` ships. Box-INVIOLATE (the rail rides `#rail` over `.glass-dock-frame`; `deltaW = deltaH = 0`). The vertical dock's rail is the SAME `<DockStack mode="facets">` (the orientation is read off `useOptionalDockContext`), so fixing the mode fixes both defect 3 and defect 6's rail.

### R-3 · The category nav + nav buttons (defects 1, 2) — dead/flaky wiring
- **Category nav (defect 1, "clicking does nothing"):** the SidebarDock category buttons call `go(category.id)` → `firstOfCategory` → `router.push(/<cat>/<firstStory>)`. The wiring EXISTS; the dead-click is the SYMPTOM of R-1 — on a fresh load the async-route + FOUC + the `railContext` writable-computed echo-suppression (`SidebarDock.vue:147-175`) can swallow the navigation, AND a category click that lands on a route whose chunk is still loading shows the placeholder, reading as "nothing happened." The fix must make the category click resolve to a PAINTED page deterministically (R-1 closes the perceived dead-click).
- **Nav buttons "half the time" (defect 2):** the BottomDock prev/next/category arrows are ADAPTIVE-hidden (`v-if="hasPrev"`, `v-if="hasNext"` — `BottomDock.vue:251,270`) — so at a category boundary the arrow is ABSENT, reading as "the button doesn't work" when the user expects a (wrapping or disabled) control. The flakiness is the adaptive-absence + the FOUC compounding.

**Target:** every nav control is a LIVE, DETERMINISTIC control. Category clicks paint the destination page (no FOUC swallow). The nav arrows are present-and-consistent: either always-present (disabled at a true boundary, the §L3 four-state contract — NOT removed from the DOM mid-row, which reads as flaky) or wrapping (the category arrows already wrap). ONE registry (`useStoryNavigation` — the router IS the single source of truth; no shadow state). The active control reads the selected-as-glass tier; press squishes (`--scale-press-dock` 0.92, `tap-squish`).

### R-4 · The bottom dock is MISSING the category-page tab strip (defect 5)
The verbatim ask: "The bottom dock should have PERSISTENT controls, but ALSO **SCROLLING TABS of the current category's pages**." Today the BottomDock has the persistent category trigger + prev/next arrows + the rail, but NO horizontally-scrolling strip of the **current category's pages** (the `DockTabButton` set exists only in the `#collapsed` summary as a ≤4-chip slice — `BottomDock.vue:356-367`). The full in-category page strip is not rendered as a scrolling tab row.

**Target:** the bottom dock carries TWO co-resident regions:
1. **PERSISTENT controls** — the `#persistent` category trigger (home-left anchor) + the prev/next + category-jump arrows (the nav group), pinned (they do not scroll away).
2. **A horizontally-SCROLLING TAB STRIP of the current category's pages** — every story in the active category as a `DockTabButton` (the active one `aria-current="page"` + the selected-as-glass tier), wrapped in **`<FadingScroll axis="x">`** (the shipped scroll-state edge-fade primitive — start sharp at rest, end feathered while overflowing; `@mkbabb/glass-ui/fading-scroll`). Clicking a tab navigates to that page (`goTo(category.id, story.id)` — one registry). The strip is the category's page list, wired live to navigation.

The persistent group + the scrolling strip are ONE dock row: `[ #persistent | sep | <FadingScroll> category-page tabs | sep | nav arrows ]`. The box stays a single ~52px row (box-INVIOLATE); the overflow scrolls inside the FadingScroll port, never inflating the dock.

---

## 2. THE VISUAL TARGET — warm-cream luminous Liquid Glass (the binding north star)

Per design.md §L1 (the six-layer composite), the BA.W-NO-GRAY warm-chroma floor, and the iOS-26 Liquid Glass language. **Glass is warm MATERIAL, never gray.** Every dock surface MUST read as the warm-cream luminous glass below.

### 2.1 · The six-layer optical composite (design.md §L1 — ALL six, or the §L5 degraded fallback)
A dock/rail surface that omits a layer reads iOS-7-flat. Required:
1. **Backdrop blur + saturation** — the refraction proxy. The dock tier carries the `blur(0)` floor BY DESIGN (`--glass-blur-dock` radius `0`; the backdrop's own blur reads through the translucent plate); the rail CHIPS ride `--glass-bg-floating` (`blur(16px) saturate(1.4)` light / the dark luminosity-lift companion `saturate(1.22–1.35) brightness(1.06–1.18)`). The `saturate()` channel carries the "concentrated light" reading — never drop it.
2. **Surface tint (warm-cream rgba)** — `--glass-bg-dock` (0.42 opacity, mode-invariant) over the warm-cream `--card` identity. Light AND dark tints differ (dark denser, per design.md §L1.2).
3. **Edge rim (border)** — `--glass-border-{tier}` warm hairline that holds the surface against the backdrop; carved a few points per BA.W-NO-GRAY so the silhouette reads.
4. **Inner catch-light** — the upper-edge specular streak (`--glass-highlight` / the `--glass-material::before` core); the rail-facet chip's `--glass-accent` enters the ONE warm-cream core (W-GLASS-ACCENT composes W-LENSING — accent owns the core COLOR, never a second specular layer).
5. **Drop shadow** — `--shadow-dock` / `--shadow-dock-collapsed`, adaptive depth.
6. **Grain overlay** — `paper-grain-overlay` (3.5% light / 6% dark, `overlay`→`soft-light`); the glass+PAPER morphism — never flat plastic.

### 2.2 · The warm-chroma floor (BA.W-NO-GRAY — BINDING, NOT gray)
The dock plate + rail chips are warm MATERIAL:
- The neutral ladder + `--card` resolve at **OKLab hue 62–75°** (the warm-amber `--foreground` hsl-24 / OKLab-56° family) — authored at **hsl hue 28–40** (NOT the prior hsl-48 yellow-green that read gray). **NEVER OKLab hue ~95° (yellow-green) and NEVER a desaturated neutral.**
- Chroma floor: mid/low-L rungs clear **C ≥ 0.020** (STRONG floor); the near-white plate (`--card` `hsl(36 48% 97%)` light) clears a materially-warm PLATE floor (~2× the head floor) — warm material, not a visible cast.
- The `--card` plate **decouples from `--neutral-0`** onto its own warm-cream value so a glass control reads warm over a flat backdrop (glass is transmissive; over a flat page there is nothing behind to modulate — the warmth must be IN the plate).
- The dock rail's facet chips carry per-instance `--glass-accent` (a `--section-color-N` hue) — a CHROMATIC rim+glint, `color-mix(in oklab, …)`, bounded at `--dock-facet-accent-strength` (48% whisper). The warm-cream CORE survives; the accent is rim DECORATION, never a full-bleed fill, never gray.

**The forbidden state:** any dock/rail surface resolving to a desaturated neutral (OKLab C < 0.012) OR OKLab hue ~95° yellow-green. That is the gray defect the BA.W-NO-GRAY floor kills. Verified by the `paint-arm.mjs` OKLab readback (getComputedStyle returns `oklab()` for oklab tokens; separate gray by C, warm-vs-yellow-green by hue).

### 2.3 · The dark register (W-DARK-MATERIAL — luminous-dark transmissive, NOT a charcoal slab)
In `.dark` the dock is a luminous-dark transmissive material:
- The dark `--glass-blur-*` saturate/brightness companion makes the backdrop GLOW through (iOS-dark "dark glass glows where light passes").
- The dark `--glass-edge-light-dark` α lifts to 0.22 as the PRIMARY silhouette device (dark's edge+transmission carry the plate where light's fill+shadow do).
- The dark tint-seam LIFTS toward a luminous translucent dark (the mirror of the light darken), bounded at `--glass-tint-strength-aa: 12%` dark.
- The dark `--foreground` ink is warm (hsl 30 14% 90%, OKLab H75.4°) — every dark dock glyph re-resolves warm, not a cold gray-white.

### 2.4 · The adaptive legibility seam (the dock self-darkens over bright)
The dock floats over an UNKNOWN backdrop (the live PaperBackdrop / aurora), so it self-darkens UNCONDITIONALLY at full AA strength (`:where(.glass-dock)` self-engage, `--glass-tint-strength-aa: 20%` light) toward the warm-ink — never gray, always the warm darken. The sampled-luminance observer (`useGlassBackdropLuminance`, wired ON for the dock) dynamically tracks a live backdrop. Worst-case WCAG 4.5:1 against the brightest AND darkest backdrop pixel (design.md §L5).

---

## 3. THE MOTION TARGET — liquid-weight on ALL motion ([[feedback-liquid-weight-universal]])

**The standing law (BINDING acceptance lens):** most items/transitions carry INERTIA, WEIGHT, BOUNCE, and liquid-glass facility; all scrolling + movement carries inertia and liquid weight. A flat fade or linear translate reads cheap and FAILS the bar. Nothing snaps; everything settles with spring physics + volume-preserving squish + fade-coupled-to-transform. Compositor-only, PRM-carved, Safari-verified.

| Surface | Target motion | Spring / register |
|---|---|---|
| **Rail fan-out** (`<DockStack>` hover-expand) | Members SPRING out staggered (not a hard show); the φ-ring projection gives depth recession (scale+opacity); fold→expand on the dock clock | `--spring-dock` (DOCK_SPRING, ζ 0.7 — RIDDEN, never re-forked), staggered by `--dock-stack-stagger`; hover-intent dwell `HOVER_INTENT_MS` (no flash-open) |
| **Rail facet select** | The active chip lifts onto the selected-as-glass tier with a spring; the recession re-projects (the neighbours settle back) | `--spring-snappy` (the user touched a pixel — §L2 spring rule) |
| **Category-page tab strip scroll** | INERTIAL/weighted scroll; the FadingScroll edges feather on scroll-state (legibility cue, NOT motion — survives PRM) | native `.smooth-scroll` + `<FadingScroll>` dual-path single-writer; consumer momentum stays in the app (native-first fence — NO Lenis/GSAP) |
| **Active-tab indicator** | The active page tab's selected-glass plate GLIDES + SQUISHES between tabs (volume-preserving X/Y reciprocal ≈+8% cap), goo-morph not a hard hop — the [[feedback-liquid-weight-universal]] goo-morph law | `--spring-snappy` at `--tab-indicator-duration` (= `--spring-snappy-duration`); release-at-arrival squish; PRM → no squish |
| **Dock collapse/expand** (bottom + vertical) | Center-out, crisp, scale-floored; the box-size morph is a COMPOSITOR transform over a reserved footprint (CDP Layout-flat — no per-frame reflow) | `--dock-morph-t` scalar on DOCK_SPRING; PRM seats synchronously (no collapsed-sliver) |
| **Press** (every dock control) | Squish-press (transform scale, never opacity/bg as the press feedback) | `--scale-press-dock` (0.92) + `tap-squish`; release on `--spring-snappy` ~7% overshoot |
| **Page enter** (route nav) | ONE coherent page-enter: opacity on `--ease-out`, transform on `--spring-smooth` (the SETTLE register); exit no-overshoot | `fade-slide` recipe; KEPT (R-1 only gates the placeholder, not the enter) |

**The goo-morph mandate (the active-indicator special case):** the active-page-tab indicator and the rail's active-facet transition must goo-morph (metaball-merge/stretch on the spring clock) between states — never a discrete jump. Mirror the goo-blob smin / tab-indicator squish. This is the explicit [[feedback-liquid-weight-universal]] call-out applied to the dock's selection indicators.

All motion: **compositor-only** (transform/opacity/filter/`--*` customs — never a layout property; `proof:no-layout-animation` library-wide), **PRM-carved** (springs → `--ease-standard` no overshoot; squish off; fade kept, transform dropped — design.md §L5), **Safari-compatible** (the `filter` blur-settle on WebKit; the SVG-goo `color-interpolation-filters: sRGB` + non-zero host floor).

---

## 4. THE WIRING TARGET — the dock is the central hub (W-DOCK-HUB-API)

The fix WIRES the SHIPPED prototypes into the live shell; it does NOT re-fork them. The shipped surface (all already in `src/`):

| Prototype | Subpath | Role in the hub |
|---|---|---|
| `GlassDock` + `useDockState` | `/dock` | the dock shell (orientation, collapse, box-inviolate `#rail` slot over `.glass-dock-frame`) |
| `<DockStack mode="facets">` | `/dock` | THE rail — accent context carousel (R-2); per-facet `--glass-accent`, `projectFacets` recession |
| `useContextualDockLayers(route)` | demo composable | route→facet resolver (KEPT — the correct route-keyed seam; only its render target is the facets-mode rail) |
| `<DockSection>` | `/dock` | the tripartite `rail-core \| section \| nav` grouping (`display:contents`; box stays one row) |
| `<DockSeparator>` | `/dock` | the divider seams between persistent / nav / utility groups |
| `<FadingScroll axis="x">` | `/fading-scroll` | the category-page scrolling tab strip (R-4) — at-rest sharp, end-feathered while overflowing |
| `DockTabButton` | `/dock` | each category-page tab (active = `aria-current="page"` + selected-as-glass tier) |
| `DockIconButton` | `/dock` | persistent + nav controls (`tap-squish`, `--scale-press-dock`) |
| `useStoryNavigation` | demo composable | THE ONE registry (router-backed; no shadow state) — `goTo`/`next`/`prev`/`*Category`/`firstOfCategory` |

**The hub shape (acceptance):**
- **SidebarDock (vertical):** `[ ℱ home (#persistent) | sep(anchor) | category nav (section) | sep | utility: morph + gear (nav) ]` with the `#rail` = `<DockStack mode="facets">` of the active category's facets fanning in the gutter (box-inviolate). Category click → paint the section. The rail is the accent carousel, not a gray glyph (defect 6 closed).
- **BottomDock (horizontal):** `[ category trigger (#persistent) | sep | <FadingScroll x> category-page tabs (the in-category page strip — R-4) | sep | prev/next + category-jump arrows (nav) ]` with the `#rail` = `<DockStack mode="facets">` fanning UP into the gutter above the row. PERSISTENT controls + SCROLLING category-page tabs co-resident (defect 5 closed).
- **One registry everywhere:** every click (category, page tab, arrow, facet) writes the router via `useStoryNavigation`; no parallel store; the `railContext` writable-computed echo-suppression stays (it is correct — it discriminates a genuine user chip-click from a non-interactive v-model echo).

---

## 5. ACCEPTANCE BAR (the gestalt verdict — what closes the wave)

A fresh reload of the live demo (`:5199`), BOTH light + dark modes, BOTH desktop + coarse-touch, on a real GPU (Safari + Chromium):

1. **No FOUC (defect 7):** the "Pick a story" placeholder NEVER paints on a real route reload. A hard reload of `/forms/text-inputs` shows the page (or the held prior view), never the placeholder flash. The placeholder is reachable ONLY on a literal no-route/404. (π: a reload frame-series shows zero placeholder frames on a matched route.)
2. **Category nav LIVE (defect 1):** clicking any SidebarDock category navigates AND paints the destination section deterministically. (π: click → the route changes → the section paints, no dead-click, no placeholder.)
3. **Nav buttons CONSISTENT (defect 2):** every nav arrow is a deterministic four-state control (present + disabled at a true boundary, or wrapping) — never DOM-absent-mid-row reading as flaky. Prev/next + category-jump all navigate. (π: exhaustive click of every arrow from every boundary state navigates or is honestly-disabled.)
4. **The rail is the SHIPPED facets carousel (defects 3, 6):** the shell rail renders `<DockStack mode="facets">` — accent-tinted context chips (each a distinct `--section-color-N` hue at the rim+glint), the active facet lit on the selected-as-glass tier, the φ-ring recession, box-INVIOLATE (`deltaW = deltaH = 0` across the fan). NOT a generic gray `Layers` glyph. Identical render to `liquid-playground.vue`'s rail. Works in BOTH the vertical SidebarDock AND the horizontal BottomDock. (π: the per-facet accent hues read distinct at the rim; the box width/height is constant across the fan; both orientations.)
5. **The bottom-dock category-page tab strip (defect 5):** the BottomDock shows PERSISTENT controls + a horizontally-SCROLLING `<FadingScroll>` strip of the current category's pages; the active page is `aria-current`; clicking a tab navigates; the strip scrolls (end feathered while overflowing, start sharp at rest); the dock box stays one row (box-inviolate). (π: the in-category page count == the tab count; overflow scrolls inside FadingScroll; the dock height is constant.)
6. **Warm-cream luminous glass, NEVER gray (§2):** every dock plate + rail chip resolves OKLab hue 62–75° (warm-amber), clears the chroma floor (plate ~2× head, mid/low-L C ≥ 0.020), the six-layer composite reads (blur+saturate · warm tint · rim · catch-light · shadow · grain). Dark mode is luminous-dark transmissive (backdrop glows through, warm edge silhouette, warm ink). NO surface resolves to a desaturated neutral or OKLab ~95° yellow-green. (π: `paint-arm.mjs` OKLab readback on the dock plate + a rail chip, both modes.)
7. **Liquid-weight on ALL motion (§3):** the rail fan springs+staggers (no hard show); the active-tab/facet indicator goo-morphs/glides+squishes between states (no hard hop — the [[feedback-liquid-weight-universal]] mandate); presses squish; the tab strip scrolls inertially; the page-enter glides. Everything compositor-only, PRM-carved (springs → no-overshoot, squish off, fade kept), Safari-verified. NO surface snaps/hops/linear-moves. (π: a frame-series on the rail fan + the indicator travel shows spring overshoot + squish; a PRM run shows no-overshoot + no-squish + fade-kept.)
8. **The dock is the central hub (W-DOCK-HUB-API):** every navigation path (category, page tab, arrow, facet) routes through the ONE `useStoryNavigation` registry — no shadow state, no parallel store, the router is the single source of truth.

**The wave closes `complete` IFF every verdict is PASS on a FRESH capture in BOTH modes over the REAL shell backdrop, AND every declared capture path resolves on disk** (the `proof:ba-gestalt` anti-evasion floor). A source-green / visually-broken close is the close-class the gestalt bar kills.

---

## 6. FENCES (no-legacy, idiomatic, gestalt — what the fix must NOT do)

- **NO re-fork.** Wire the SHIPPED `<DockStack mode="facets">` / `useContextualDockLayers` / `<FadingScroll>` / `GlassDock` / `useStoryNavigation`. NO demo-local rail capsule, NO second nav store, NO parallel scroll engine (the `.liquid-rail-dock` capsule + `useLiquidRail` are already DELETED — do not resurrect; `proof:dock-rail-realize` R1/R3 reds a second rail SFC). The `railProjection.ts` φ-math is the only harvested spike piece.
- **NO Lenis/GSAP/Locomotive.** The inertial scroll is native (`.smooth-scroll` + `<FadingScroll>`); consumer momentum stays in the consumer app (the native-first fence is binding).
- **NO gray.** Every dock surface is warm material (BA.W-NO-GRAY). No `--surface-tint-N` neutral plate on the rail, no desaturated chip, no OKLab ~95° yellow-green.
- **NO layout animation.** Compositor-only (transform/opacity/filter/`--*`). The dock box is INVIOLATE — the rail feeds zero size into it; the morph is a transform over a reserved footprint (`proof:no-layout-animation` library-wide).
- **NO snap/hop/linear-move.** Liquid-weight on all motion ([[feedback-liquid-weight-universal]]); the indicator goo-morphs, the fan springs, the scroll is inertial. A flat fade/linear translate FAILS the bar.
- **NO workaround for the FOUC.** The placeholder gate discriminates *no matched route* from *async-pending route* idiomatically (Suspense / router-ready), not a `setTimeout` hide or an opacity hack.
- **PRM-carved + Safari-compatible + four-state contract** on every interactive control (design.md §L3/§L5).
- **Presets-in-consumers:** the rail facet hues are `--section-color-N` library identities READ by the demo; the demo never mints a library token.

---

## 7. SOURCES (the binding north star + the live diagnosis)

- `design.md` — §L1 the six-layer Liquid Glass composite + the seven tiers (Dock tier = `blur(0)` floor, rail chips `floating`); §L2 the three springs (smooth/snappy/bouncy) + the spring-vs-ease rule; §L3 tap-squish (`--scale-press-dock` 0.92); §L5 the three a11y brackets + worst-case contrast.
- `CLAUDE.md` — BA.W-NO-GRAY (warm-chroma floor, OKLab hue 62–75, C floors); W-DARK-MATERIAL (luminous-dark transmissive); the `--glass-tint-*` adaptive seam + the dock self-engage; `<DockStack>` two-mode contract + box-INVIOLATE; `<FadingScroll>` dual-path; `useContextualDockLayers` route→facet seam; `useStoryNavigation` registry.
- `[[feedback-liquid-weight-universal]]` (MEMORY) — the standing animation law (inertia/weight/bounce/squish on ALL motion; the goo-morph indicator mandate; native-first inertial scroll).
- Live diagnosis (this repo, HEAD): `demo/router.ts` (lazy glob → FOUC), `demo/layout/AppShell.vue:277-296` (the `v-else` placeholder flash), `demo/layout/SidebarDock.vue:441-447` + `BottomDock.vue:380-386` (rail in stack-mode, no accent), `BottomDock.vue:356-367` (the ≤4 collapsed slice, NOT the full category-page strip — defect 5), `demo/stories/dock/liquid-playground.vue:822-878` (the CORRECT shipped `mode="facets"` rail prototype with per-facet `accent`).
- iOS-26 Liquid Glass language (WWDC 2025): real-time light-bending/lensing, specular highlights, adaptive shadows, tab bars shrink-on-scroll then fluidly expand, Light/Dark/Tinted/Clear modes — the warm-tint adaptive material the glass-ui dock tier embodies. [Apple Newsroom — Liquid Glass](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/) · [LiquidGlassReference (Luddy)](https://github.com/conorluddy/LiquidGlassReference) · [Build a UIKit app with the new design — WWDC25](https://developer.apple.com/videos/play/wwdc2025/284/)
