# BUILD-SPEC — Nav-Dock Fix (W-NAV-DOCK-FIX)

**Wave:** BD · refine · nav-dock-fix · W-DOCK-HUB-API (the dock is the central hub)
**Date:** 2026-06-23 (mid-tranche, fix-NOW)
**Posture:** an ASSEMBLY/wiring fix — the engines are 100% shipped, the assembly was wrong. ONE token + ONE rim α in `src/`; everything else is `demo/`. NO re-fork, NO new component, NO new store, NO Lenis/GSAP. Compositor-only, PRM-carved, Safari-compatible, BA.W-NO-GRAY warm-cream floor.

The seven verbatim defects all reduce to FOUR root causes (the research synthesis): **(A)** the FOUC placeholder paints during async route resolve; **(B)** the SidebarDock starts collapsed so its category buttons are `inert`/`pointer-events:none` at rest (dead-click) and the nav arrows are DOM-absent at boundaries (flaky); **(C)** both shell rails render the wrong `<DockStack>` mode (generic gray glyph, no accent) — not the shipped `mode="facets"` carousel; **(D)** the BottomDock has no scrolling category-page tab strip. Plus the optical gray-glass mechanism (the light dock has no `saturate()` companion).

---

## 0. THE FILE/LINE LEDGER (before → after)

| # | File | Lines | Change | Class |
|---|---|---|---|---|
| F1 | `demo/layout/AppShell.vue` | 277–297 | Gate the "Pick a story" placeholder behind `route.matched.length === 0` (a genuine no-route), not `!Component` (async-pending) | FOUC (defect 7) |
| F2 | `demo/router.ts` | 71–75 | Add a `router.beforeResolve` eager-resolve of the FIRST navigation's lazy component so the first paint never renders an empty `<RouterView>` | FOUC (defect 7) |
| F3 | `demo/layout/SidebarDock.vue` | 70, 233–240 | Un-collapse the primary category nav at rest — `collapsible` → `false` on the desktop fixed column (categories live in the always-visible register, NOT the hover-gated `#default` layer) | dead category nav (defects 1, 6) |
| F4 | `demo/layout/SidebarDock.vue` | 114–122, 441–447 | Map per-facet `accent` onto `railItems`; render `<DockStack mode="facets" :core :visible-count>` | wrong rail (defects 3, 6) |
| F5 | `demo/layout/BottomDock.vue` | 97–105, 380–386 | Same `accent` + `mode="facets"` rail fix | wrong rail (defects 3, 6) |
| F6 | `demo/layout/BottomDock.vue` | 246–286 (`#story-nav`) | Replace the adaptive `v-if="hasPrev/hasNext"` arrows + add a PERSISTENT `<FadingScroll axis="x">` strip of `current.category.stories` as `DockTabButton`s wired to `goTo` | missing tab strip + flaky arrows (defects 2, 5) |
| F7 | `demo/stories/dock-layer-contexts.ts` | `ContextLayer` interface + every row | Add an `accent: string` field (a `--section-color-N` library hue) per facet | rail accent source (defect 3) |
| S1 | `src/styles/tokens/glass.css` | 113–117, 142 | Mint `--glass-saturate-dock: 1.4`; light `--glass-blur-dock` += `saturate(var(--glass-saturate-dock)) brightness(1.02)` | gray-glass optical |
| S2 | `src/styles/tokens/glass.css` | 316 | `--glass-border-dock` 4% → 8% warm-ink | gray-glass silhouette |
| S3 | `src/styles/tokens/dark-arm.css` | 259 | Re-point the dark `saturate(1.30)` to `saturate(var(--glass-saturate-dock, 1.30))` (single retune knob, value unchanged) | dark symmetry |
| G1 | `scripts/proof-no-gray.mjs` | source-arm | Add 3 source witnesses (`dock-blur-has-saturate-light`, `dock-blur-saturate-lockstep`, `dock-border-readable-light`) — NO floor weakened | gate |
| G2 | `tests-visual/nav-dock-fix.spec.ts` | NEW | The binding π — FOUC-zero + category-live + rail-facets + tab-strip + warm-glass + liquid-weight, born-RED | gate |

---

## 1. F1 — KILL THE FOUC (defect 7)

### Root
`AppShell.vue:277` `<RouterView v-slot="{ Component }">` yields `Component === undefined` while the lazy chunk loads (~181–414ms measured), so the `v-else` `<Card>` "Pick a story" PAINTS, then the route resolves and `fade-slide` animates the real page over it. The `v-else` on `!Component` cannot discriminate *no matched route* from *async-pending route*.

### Fix (idiomatic — the placeholder guards on a genuine no-route)
**BEFORE** (`AppShell.vue:277–297`):
```html
<RouterView v-slot="{ Component }">
    <Transition name="fade-slide">
        <component :is="Component" v-if="Component" :key="route.fullPath" />
        <Card v-else class="mx-auto max-w-xl p-8 text-center">
            <p class="font-display text-2xl text-foreground">Pick a story</p>
            …
        </Card>
    </Transition>
</RouterView>
```

**AFTER** — the placeholder is reachable ONLY for a literal no-route (the catch-all is its own `NotFound` component anyway, so in practice the `<Card>` is dead code on a routed app, which is correct — it never flashes):
```html
<RouterView v-slot="{ Component }">
    <Transition name="fade-slide">
        <!-- W-NAV-DOCK-FIX (defect 7) — the page-enter animates the real component
             ONCE the async chunk resolves; during resolution Vue holds NOTHING
             (no placeholder underneath), so the "Pick a story" flash is gone. The
             empty-state Card is reachable ONLY when there is genuinely no matched
             story route (route.matched.length === 0) — never during async resolve
             of a matched route. -->
        <component :is="Component" v-if="Component" :key="route.fullPath" />
        <Card
            v-else-if="route.matched.length === 0"
            class="mx-auto max-w-xl p-8 text-center"
        >
            <p class="font-display text-2xl text-foreground">Pick a story</p>
            <p class="mt-2 text-sm text-muted-foreground">
                Choose a category from the rail on the left, then a story from the
                bar below.
            </p>
        </Card>
    </Transition>
</RouterView>
```
`route` is already in scope (`AppShell.vue` uses it elsewhere). The `<Transition>` keeps a single child; on a matched-but-resolving route both branches are false, so the `<Transition>` renders nothing — no flash, then the page enters once.

### F2 — eager-resolve the FIRST navigation (the belt to F1's braces)
The F1 guard is the load-bearing fix; F2 removes the resolving-frame window on first paint so even the held-nothing gap is imperceptible. Add to `router.ts` after the router is created:
```ts
// W-NAV-DOCK-FIX (defect 7) — eager-resolve the lazy component of the FIRST
// navigation so the initial mount never paints an empty <RouterView>. Subsequent
// navigations are gated by the AppShell placeholder guard. A one-shot guard that
// removes itself after the first resolve (no per-nav cost).
let firstResolved = false;
router.beforeResolve(async (to) => {
    if (firstResolved) return true;
    firstResolved = true;
    const comps = to.matched
        .map((r) => r.components?.default)
        .filter((c): c is () => Promise<unknown> => typeof c === "function");
    await Promise.all(comps.map((c) => c().catch(() => undefined)));
    return true;
});
```
`main.ts` already `await router.isReady()` before mount (confirm; if not, add it) — with F2 the first paint is the resolved page, never the empty view.

**Acceptance:** a hard reload of any deep route (`/forms/inputs`, `/motion/springs`) shows ZERO "Pick a story" frames (MutationObserver over the literal text → 0 hits). The `fade-slide` page-enter is KEPT (animates the real page in once). PRM-irrelevant (render gate, not motion). Safari-irrelevant (no filter/transform).

---

## 2. F3 — UN-COLLAPSE THE CATEGORY NAV (defects 1, 6 — the dead-click root)

### Root
`SidebarDock.vue:70` `collapsible = props.showTooltips` (true on the desktop fixed column) → `:start-collapsed="collapsible"` (line 236) starts the dock collapsed → the 10 category buttons live in `.dock-layer--full` which resolves `inert:true, opacity:0, visibility:hidden, pointer-events:none` at rest. They only become clickable after a ~400ms hover-intent-dwell. The user clicks a category, the real button is inert, nothing happens.

### Fix — a primary nav rail is NOT collapsed-by-default
The categories must live in the ALWAYS-VISIBLE register. The desktop vertical category rail is a primary navigation surface; it is NOT a hover-to-reveal dock. Set the column always-expanded:

**BEFORE** (`SidebarDock.vue:70`):
```ts
const collapsible = computed(() => props.showTooltips);
```
**AFTER:**
```ts
// W-NAV-DOCK-FIX (defects 1, 6) — the desktop category rail is a PRIMARY nav
// surface, so it is NEVER collapsed-by-default (a collapsed dock parks its
// category buttons in the `inert`/`pointer-events:none` #default layer until a
// ~400ms hover-dwell — the user's dead-click). It is always-expanded: the
// categories are clickable from frame 0. The mobile Sheet host already passed
// `:show-tooltips="false"` → always-expanded, so this UNIFIES both hosts on the
// always-expanded register (the collapse affordance is the BottomDock's job, not
// the category rail's). `showTooltips` keeps its tooltip-anchor meaning only.
```
And the template (`SidebarDock.vue:233–240`):
**BEFORE:**
```html
<GlassDock
    orientation="vertical"
    :always-expanded="!collapsible"
    :start-collapsed="collapsible"
    …
>
```
**AFTER:**
```html
<GlassDock
    orientation="vertical"
    always-expanded
    …
>
```
Drop the now-dead `collapsible` computed and the `#collapsed` slot's `activeCategory` single-glyph summary (`SidebarDock.vue:409–426`) — clean break, no legacy: an always-expanded rail never shows a collapsed summary. (Keep `activeCategoryId`/`activeCategory` ONLY if still referenced elsewhere; the `#collapsed` template block is removed.)

**Acceptance:** every category button reads `pointer-events:auto, visibility:visible, inert:false` at rest on a fresh load. Clicking any category → `go(category.id)` → `firstOfCategory` → `router.push` → the section paints (no dead-click, no FOUC swallow once F1 lands). π: `getComputedStyle` on every `.demo-sidebar-item` → `pointerEvents !== "none"`.

---

## 3. F4 / F5 — WIRE THE SHIPPED `mode="facets"` RAIL (defects 3, 6)

### Root
Both shell docks render `<DockStack>` with NO `mode` (→ default `"stack"`, the macOS glyph fan) and `railItems` supplies NO `accent`. The user's "actual rail PROTOTYPE" is the BE.W-DOCK-RAIL-REALIZE `mode="facets"` context-carousel (`liquid-playground.vue:822–831` is the byte-correct reference).

### Fix — map `accent` + render `mode="facets"`, byte-matching the prototype
**F7 first** — give every facet a hue. `dock-layer-contexts.ts` `ContextLayer` interface gains:
```ts
export interface ContextLayer {
    id: string;
    label: string;
    icon: Component | string;
    /**
     * W-NAV-DOCK-FIX — the per-facet accent hue (the `mode="facets"` context
     * carousel's `--glass-accent` rim, presets-in-consumers). A `--section-color-N`
     * LIBRARY identity hue (read by the demo, never minted here). Distinct per
     * facet so the carousel reads as distinct accent-tinted contexts.
     */
    accent: string;
    entries: ContextLayerEntry[];
}
```
Then add an `accent: "var(--section-color-N)"` to EVERY facet row (use a stable per-context palette — e.g. within a category, facet 0→`--section-color-2`, facet 1→`--section-color-3`, facet 2→`--section-color-7`, cycling the prototype's hue set so no two adjacent chips share a hue). The `FALLBACK_CONTEXT_LAYER` gets `accent: "var(--section-color-7)"`.

**F4** — `SidebarDock.vue` `railItems` (lines 114–122) maps the accent through:
```ts
const railItems = computed<DockStackItem[]>(() =>
    contextLayers.value.length > 1
        ? contextLayers.value.map((l) => ({
              id: l.id,
              label: l.label,
              icon: typeof l.icon === "string" ? undefined : l.icon,
              accent: l.accent, // W-NAV-DOCK-FIX — the per-facet context hue
          }))
        : [],
);
```
And the `#rail` template (lines 441–447) byte-matches the prototype:
```html
<template #rail>
    <DockStack
        v-if="railItems.length"
        v-model:selected="railContext"
        mode="facets"
        :items="railItems"
        :core="Boxes"
        core-label="Section facets"
        :visible-count="4"
        position="end"
        data-testid="sidebar-dock-rail"
    />
</template>
```
(Import a `core` glyph — `Boxes`/`Folder` from `@lucide/vue` — so the core anchor reads as a context switcher, not the default `Layers`.) The `railContext` writable-computed echo-suppression (lines 147–175) is KEPT verbatim — it is correct (discriminates a real chip click from a v-model echo).

**F5** — identical change to `BottomDock.vue` (`railItems` lines 97–105 + `#rail` template lines 380–386). The BottomDock rail core fans UP into the gutter above the row.

**Acceptance (both docks, both orientations):** the rail renders `.dock-stack … mode-facets` (`data-mode="facets"`); each facet chip resolves a DISTINCT `--glass-accent` hue at its rim+glint; the active facet lifts onto `--dock-control-active-bg`; the dock box is INVIOLATE (`deltaW = deltaH = 0` across the fan); identical render to `liquid-playground.vue`'s rail. π: per-facet `getComputedStyle(chip).getPropertyValue("--glass-accent")` distinct + `getBoundingClientRect` of the dock constant across fan open/closed.

---

## 4. F6 — THE PERSISTENT + SCROLLING CATEGORY-PAGE TAB STRIP (defects 2, 5)

### Root
The BottomDock `#story-nav` carries only adaptive `v-if="hasPrev/hasNext"` prev/next arrows (DOM-absent at boundaries → reads flaky). There is NO horizontally-scrolling strip of the current category's pages. The user's verbatim: "PERSISTENT controls, but ALSO SCROLLING TABS of the current category's pages."

### Fix — TWO co-resident regions in ONE dock row
The bottom dock row becomes: `[ #persistent category trigger | sep | <FadingScroll x> category-page tabs (the in-category page strip) | sep | prev/next + category-jump arrows (nav) ]`. The box stays one ~52px row (the FadingScroll port scrolls internally — box-INVIOLATE).

**Add the import:**
```ts
import { FadingScroll } from "../../src/components/custom/fading-scroll";
```
**Add the computed** (the full in-category page list):
```ts
// W-NAV-DOCK-FIX (defect 5) — the FULL in-category page list (NOT the ≤4 summary
// slice). Every story in the active category is a jump-to-page tab; the active one
// carries aria-current="page" (DockTabButton auto-lifts its selected-as-glass tier).
const categoryStories = computed(() => {
    const loc = current.value;
    if (!loc) return [];
    return loc.category.stories.map((story, index) => ({
        story,
        index,
        active: index === loc.storyIndex,
    }));
});
```
**Replace the `#story-nav` template** (`BottomDock.vue:247–286`) — the prev arrow, the FadingScroll page strip, the next arrow, all in the `section` zone:
```html
<template #story-nav>
    <TooltipProvider :delay-duration="250">
        <!-- W-NAV-DOCK-FIX (defect 2) — prev/next are PERSISTENT four-state controls,
             never DOM-absent mid-row. Disabled (not removed) at a true boundary so the
             row geometry holds and the control reads honestly, never "flaky". -->
        <Tooltip>
            <TooltipTrigger as-child>
                <DockIconButton
                    type="button"
                    class="tap-squish"
                    aria-label="Previous story"
                    :disabled="!hasPrev"
                    @click="prev()"
                >
                    <ChevronLeft class="h-4 w-4" aria-hidden="true" />
                </DockIconButton>
            </TooltipTrigger>
            <TooltipContent side="top" :side-offset="10">Previous story · <kbd class="font-mono text-[0.7em]">[</kbd></TooltipContent>
        </Tooltip>

        <!-- W-NAV-DOCK-FIX (defect 5) — the SCROLLING category-page tab strip. Every
             story in the active category as a jump-to-page DockTabButton, wrapped in the
             shipped <FadingScroll axis="x"> (start sharp at rest, end feathered while
             overflowing). The strip scrolls INSIDE the port — the dock box stays one row
             (box-INVIOLATE). Clicking a tab navigates via goTo (one registry). -->
        <FadingScroll axis="x" class="demo-bottom-dock__tabs">
            <DockTabButton
                v-for="entry in categoryStories"
                :key="entry.story.id"
                class="tap-squish"
                :aria-current="entry.active ? 'page' : undefined"
                :aria-label="entry.story.title"
                @click="goToSummary(entry.story.id)"
            >
                {{ entry.story.title }}
            </DockTabButton>
        </FadingScroll>

        <Tooltip>
            <TooltipTrigger as-child>
                <DockIconButton
                    type="button"
                    class="tap-squish"
                    aria-label="Next story"
                    :disabled="!hasNext"
                    @click="next()"
                >
                    <ChevronRight class="h-4 w-4" aria-hidden="true" />
                </DockIconButton>
            </TooltipTrigger>
            <TooltipContent side="top" :side-offset="10">Next story · <kbd class="font-mono text-[0.7em]">]</kbd></TooltipContent>
        </Tooltip>
    </TooltipProvider>
</template>
```
**DELETE the `#collapsed` summary-chip slice** (`BottomDock.vue:356–367`) and the `summaryStories`/`SUMMARY_MAX`/`goToSummary→summary` machinery (lines 56–80) — clean break, no legacy. The full strip in `#story-nav` SUPERSEDES the ≤4 collapsed summary (the bottom dock is now always-row, not a collapse-summary register). Rename `goToSummary` → `goToStory` (keeps the `goTo(category.id, storyId)` body). The `#persistent` category trigger + the `#category-jump` nav group (prev/next-category + morph) stay PERSISTENT.

**The CSS** (scoped `<style>` in `BottomDock.vue`) — cap the strip so it scrolls, never inflates:
```css
/* W-NAV-DOCK-FIX — the category-page tab strip scrolls horizontally inside the
   FadingScroll port; cap its inline-size so overflow scrolls, never widening the
   dock box. min-w-0 lets the flex child shrink below content. */
.demo-bottom-dock__tabs {
    min-inline-size: 0;
    max-inline-size: min(60vw, 42rem);
    flex: 1 1 auto;
}
.demo-bottom-dock__tabs :deep([data-fade-scroll-content]) {
    display: flex;
    gap: var(--dock-gap, 0.25rem);
    align-items: center;
}
```

**Acceptance:** the BottomDock shows the persistent category trigger + prev/next (disabled at boundary, never removed) + the `<FadingScroll axis="x">` strip of EVERY in-category page + the category-jump nav group, all in ONE ~52px row. Tab count == `current.category.stories.length`. The active tab is `aria-current="page"`. Overflow scrolls inside FadingScroll (end feathered while overflowing, start sharp at rest). The dock height is constant. π: tab count match + FadingScroll `--fade-end` non-zero while overflowing + dock `clientHeight` constant.

---

## 5. S1 / S2 / S3 — THE GRAY-GLASS OPTICAL FIX (the warm-cream lift)

### Root
The base `--card` is warm (OKLab L 0.974, C 0.0147, H 70.9° — above the gate's `WARM_PLATE_FLOOR`). The gray-READ is OPTICAL: the LIGHT `--glass-blur-dock` is `blur()` ALONE (`glass.css:142`) — the ONLY light surface with no `saturate()` companion (wash/quiet/resting all carry 1.4). Over a flat warm-cream page the un-saturated backdrop-filter pulls the cream toward neutral → a pale flat slab. The dark arm (`dark-arm.css:259`) already has `saturate(1.30) brightness(1.12)` — the light arm is the orphan (the BB.W-DARK-INK-WARM light/dark-asymmetry class).

### S1 — give the light dock its saturate + light-concentration companion (THE headline)
**Mint the knob** (`glass.css:113–117` saturate block, add after `--glass-saturate-overlay`):
```css
    /* W-NAV-DOCK-FIX — the dock's named light-concentration saturate. The dock is a
       calm chrome strip (the wash/quiet/resting register 1.4, NOT the floating 1.6).
       Mirrors the dark arm's dock saturate; the single retune knob in both modes. */
    --glass-saturate-dock:     1.4;
```
**Compose it** (`glass.css:142`):
```css
/* BEFORE: blur only — the flat-slab gray-read root (the only light surface with no
   saturate companion). */
/* --glass-blur-dock: blur(calc(var(--glass-blur-dock-radius) * var(--glass-level))); */

/* AFTER — W-NAV-DOCK-FIX. The dock concentrates light like every other tier
   (apple-glass §4): the saturate lifts the warm-cream chroma THROUGH the plate, the
   small brightness is the light-concentration the quiet rung carries. The blur RADIUS
   is untouched (the W-GLASS-CAL dial). */
--glass-blur-dock:
    blur(calc(var(--glass-blur-dock-radius) * var(--glass-level)))
    saturate(var(--glass-saturate-dock))
    brightness(1.02);
```
- **Compositor-only:** `backdrop-filter` is a paint/composite op — NO layout, `proof:no-layout-animation` unaffected.
- **PRM / reduced-transparency-safe:** the `prefers-reduced-transparency: reduce` bracket already maps `--glass-blur-dock: none` (the a11y bracket in glass.css) → the saturate drops with the blur. No separate carve owed.
- **Safari:** the build owns the `-webkit-backdrop-filter` prefix pass (`vite.style-assets.ts`); `saturate()`/`brightness()` inside `backdrop-filter` is Baseline. Verify on WebKit (the dock plate reads warm-luminous, not flat).
- **`--surface-tint-*` fence:** UNTOUCHED — S1 touches `backdrop-filter`, not the in-srgb `--surface-tint-*` family (the AW.W26 fence holds).

### S2 — lift the dock perimeter hairline (the silhouette)
**`glass.css:316`:**
```css
/* BEFORE: --glass-border-dock: color-mix(in srgb, var(--foreground) 4%, transparent); */
/* AFTER — W-NAV-DOCK-FIX. The dock is FLOATING chrome over an UNKNOWN backdrop
   (unlike a content card on the page), so it earns a readable warm-INK hairline (the
   iOS-27 edge-rim layer). 8% warm-ink is still a whisper, never the BC.W-BLACK-BAR
   "black bar" (that was a content card over a near-white plate — the dock floats,
   different case). --foreground H≈56° → a WARM rim, never a gray line. */
--glass-border-dock: color-mix(in srgb, var(--foreground) 8%, transparent);
```
Keep `--glass-rim-top`/`-bottom` (the directional catch-light/under-shadow) — they compose ON TOP.

### S3 — dark symmetry (the single knob, value unchanged)
**`dark-arm.css:259`** — re-point the dark dock saturate to the named knob (value stays 1.30):
```css
/* WAS: --glass-blur-dock: …  saturate(1.30)  brightness(1.12); */
/* AFTER — W-NAV-DOCK-FIX. The named --glass-saturate-dock is the single retune point
   in BOTH modes (light 1.4 / dark 1.30 via the .dark re-declare); value unchanged. */
--glass-saturate-dock: 1.30;
--glass-blur-dock:
    blur(calc(var(--glass-blur-dock-radius) * var(--glass-level)))
    saturate(var(--glass-saturate-dock))
    brightness(1.12);
```
(Declare `--glass-saturate-dock: 1.30` inside the `.dark` block so the descendant `var()` substitutes the dark value — the substitution-vs-redeclaration discipline.)

### NO-CHANGE (recorded fences)
- **FIX-3 tint floor — NO CHANGE.** Do NOT raise `--glass-tint-strength-floor` (4%) toward ink — that is the AZ gray-slab regression (`glass-fx.css:187` warns 20% → oklab(0.785) gray). The luminous warmth comes from S1's saturate, NOT from more ink-darken (the substitution trap).
- **FIX-4 hover/active — NO CHANGE.** They already read `--glass-bg-resting`/`--glass-bg-floating` (warm-cream tiers); S1's saturate companion fixes the read transitively.
- **FIX-5 facet chips — NO CHANGE.** They ride `--glass-bg-floating` (saturate 1.6, warm) + the per-instance `--glass-accent` rim.

**Acceptance:** the live `.glass-dock` plate over the demo PaperBackdrop resolves OKLab hue ∈ [45,85] AND clears the chroma floor AND reads as luminous MATERIAL (the saturate term present). Hover over a dock control reads warm-cream-brighter, not gray. Dark mode: luminous-dark transmissive (the saturate/brightness companion glows the backdrop through). π: `paint-arm.mjs` OKLab readback on the dock plate + a rail chip, both modes.

---

## 6. THE MOTION AUDIT — already liquid-weight-compliant (NO token change)

Per RESEARCH-3 §4: every nav-dock motion clock is already correct and is the W-GLASS-CAL read-only fence — DO NOT re-tune a spring (reds `proof:animation-coherence`/`proof:spring-tokens-synced`):
- Dock control press → `--scale-press-dock` on `--dock-press-spring` (= `--spring-smooth`, no-overshoot tap — correct per Apple "Fluid Interfaces" 100%-damping-for-taps).
- Collapse↔expand morph → `--dock-morph-t` on `DOCK_SPRING` (response 0.32, ζ 0.7 — has the overshoot weight).
- Facet fan-out → scale/translate on `--spring-dock` + `--spring-dock-duration`, staggered `--dock-stack-stagger * --i` (springy, staggered, compositor-only, PRM-carved).
- Route page-enter → `fade-slide` (opacity `--ease-out` + transform `--spring-smooth`) — KEPT (F1 only gates the placeholder, not the enter).
- The new tab strip scroll → native `.smooth-scroll` + `<FadingScroll>` (the edge fade is a LEGIBILITY cue, survives PRM — never motion; no Lenis/GSAP).

The goo-morph BETWEEN states (`useDockFission` + `DockGooFilter`) is the SEPARATE W-DOCK-SCROLL-FISSION assembly — out of THIS wave's scope. No motion TOKEN is owed here.

---

## 7. GATE IMPACT — `proof:no-gray` extend-in-place (G1) + the binding π (G2)

### G1 — `scripts/proof-no-gray.mjs` (3 source witnesses, NO floor weakened)
The existing `WARM_PLATE_FLOOR` (0.010) / `WARM_HUE_LO/HI` (45/85) asserts ALREADY PASS at HEAD (the base `--card` chroma is met) — they do NOT catch the optical gray-slab. Add witnesses (parse `glass.css`), born-RED on HEAD, GREEN after S1/S2:
1. **`dock-blur-has-saturate-light`** — the light `--glass-blur-dock` carries a `saturate()` term (the flat-slab root cannot regress silently).
2. **`dock-blur-saturate-lockstep`** — the light dock saturate ≥ 1.2 AND the dark arm carries its own (the §2c per-mode pair).
3. **`dock-border-readable-light`** — the light `--glass-border-dock` α ≥ 6% (the silhouette floor — catches a regression to the sub-threshold 4%).

Every existing floor stays UNCHANGED — extend-in-place, NO new gate, NO weakening (W-PRUNE-CONSOLIDATE no-dual-path). `surface-tint-stays-srgb` stays GREEN (S1 touches `backdrop-filter`).

### G2 — `tests-visual/nav-dock-fix.spec.ts` (NEW — the binding π, born-RED on HEAD)
The sketch is in W-NAV-DOCK-FIX.md §gate. It is the gestalt-bar-binding paint over the REAL shell, both modes, both viewports, on a real GPU.

---

## 8. ACCEPTANCE BAR (the gestalt verdict — the wave closes IFF all PASS on a FRESH capture)

1. **No FOUC** — zero "Pick a story" frames on a matched-route reload.
2. **Category nav LIVE** — every SidebarDock category clickable from frame 0 → paints the section.
3. **Nav buttons CONSISTENT** — prev/next present + disabled at boundary (four-state, never DOM-absent); category-jump wraps.
4. **The rail is the SHIPPED facets carousel** — `mode="facets"`, per-facet `--glass-accent` distinct, active on `--dock-control-active-bg`, box-INVIOLATE, both orientations, identical to `liquid-playground.vue`.
5. **The bottom-dock category-page tab strip** — persistent controls + a `<FadingScroll x>` strip of the full in-category page list, active `aria-current`, overflow scrolls inside, dock box one row.
6. **Warm-cream luminous glass, NEVER gray** — the dock plate + rail chip resolve OKLab hue [45,85], clear the chroma floor, the saturate term present; dark mode luminous-dark transmissive.
7. **Liquid-weight on ALL motion** — the rail fan springs+staggers, the indicator glides+squishes, presses squish, the strip scrolls inertially, the page-enter glides; compositor-only, PRM-carved, Safari-verified.
8. **The dock is the central hub** — every nav path routes through the ONE `useStoryNavigation` registry; no shadow state.

A source-green / visually-broken close is the close-class the gestalt bar kills (`proof:ba-gestalt` dock + cross-page verdict, re-earned on a FRESH capture, every declared capture path resolves on disk).

---

## 9. FENCES (no-legacy, idiomatic, gestalt)

- **NO re-fork** — wire the SHIPPED `<DockStack mode="facets">`/`useContextualDockLayers`/`<FadingScroll>`/`GlassDock`/`useStoryNavigation`. No demo-local rail capsule, no second nav store, no parallel scroll engine. `proof:dock-rail-realize` R1/R3 reds a second rail SFC.
- **NO Lenis/GSAP/Locomotive** — native `.smooth-scroll` + `<FadingScroll>`.
- **NO gray** — every dock surface warm material (BA.W-NO-GRAY); no `--surface-tint-N` neutral on the rail.
- **NO layout animation** — compositor-only; the dock box INVIOLATE (the rail feeds zero size in).
- **NO snap/hop/linear-move** — liquid-weight on all motion.
- **NO workaround for the FOUC** — the placeholder gate discriminates no-route from async-pending idiomatically (router-ready + `route.matched.length`), not a `setTimeout`/opacity hack.
- **PRM-carved + Safari-compatible + four-state contract** on every interactive control.
- **Presets-in-consumers** — the rail facet hues are `--section-color-N` library identities READ by the demo; the demo mints NO library token.
