# RESEARCH-1 — Nav-dock LIVE root-cause (confirmed on http://localhost:5173)

Inspection method: chrome-devtools-mcp `getComputedStyle`/ancestor-walk on the live shell at
`/display/buttons` + `/motion/springs`. Every value below is a LIVE computed reading, not a
source guess.

## TL;DR — the five confirmed root causes

| # | User defect | Confirmed root cause | Where |
|---|-------------|----------------------|-------|
| 1 | "Clicking categories does nothing" | Desktop SidebarDock is **`start-collapsed` by default**; the category buttons live in the collapsed dock's `.dock-layer--full` which resolves **`inert`, `opacity:0`, `visibility:hidden`, `pointer-events:none`** at rest. They only become clickable after a ~400ms hover-intent-dwell expand. | `SidebarDock.vue:236` (`:start-collapsed="collapsible"`) |
| 2 | "Nav buttons don't work half the time" | BottomDock's `#default` (full) layer carries ONLY prev/next + category-jump + morph icon buttons — **ZERO story tabs**. You can only STEP one page at a time via arrows; there is no jump-to-page tab. The 4 "tabs" that exist are summary chips in the inert `#collapsed` layer. | `BottomDock.vue` `#default`/`#collapsed` |
| 3 | "The rail item in the centre is totally broken and needs our actual rail PROTOTYPE" | Both shell docks render `<DockStack>` with the DEFAULT `mode="stack"` (macOS glyph fan) — NOT `mode="facets"` (the BE.W-DOCK-RAIL-REALIZE context-carousel prototype the user means), and pass NO per-facet `accent` hue. The core anchor also positions at **y:-14** (partly off the dock top). | `SidebarDock.vue:441` / `BottomDock.vue:380` |
| 5 | "Bottom dock: PERSISTENT controls + SCROLLING TABS of the current category's pages" | The scrolling category-tab strip **was never built**. No `<FadingScroll>` story-tab strip exists in BottomDock. | `BottomDock.vue` (missing) |
| 6 | "Vertical dock totally broken with the broken rail" | Same as (1) + (3): collapsed-inert categories + wrong rail mode. | `SidebarDock.vue` |
| 7 | "Reload briefly shows 'Pick a story' then animates to the page" | `<RouterView v-slot="{Component}">` + **lazy `() => import()` route components**: `Component` is `undefined` until the async chunk resolves (~181–414ms+ measured), so the `v-else` "Pick a story" Card paints, then the `fade-slide` Transition animates the real page in. Fires on EVERY deep-route reload. | `AppShell.vue:277–296`, `router.ts` (`story.component` lazy), `manifest.ts` (`lazy()`) |

---

## (1)/(6) — Category nav is DEAD because the dock is collapsed-inert at rest

`getComputedStyle` on the "Substrates" category button at rest (`/display/buttons`):

```
BUTTON .demo-sidebar-item        pointerEvents:none  visibility:hidden  opacity:1
DIV    .dock-section-zone--section pointerEvents:none visibility:hidden
DIV    .dock-section (display:contents)
DIV    .dock-layer--full          pointerEvents:none  visibility:hidden  opacity:0  INERT:true   ← killer
DIV    .dock-layers               pointerEvents:auto  visibility:visible
DIV    .demo-sidebar-dock … collapsed   ← the dock carries `collapsed`
```

All 10 category buttons read `pointer-events:none`. The ONLY clickable nav control is the
collapsed-summary glyph (`aria-label="Display — open navigation"`, `pointer-events:auto`) — the
single active-category glyph shown in the `#collapsed` slot.

Confirmed the expand path works: dispatching `mouseenter`/`pointerenter` on `.demo-sidebar-dock`
and waiting ~400ms flips `collapsed → expanded`, the `.dock-layer--full` becomes
`inert:false, opacity:1, visibility:visible`, and the categories become `pointer-events:auto`.

So the mechanism is sound but the DEFAULT STATE is wrong for a primary nav surface: the user sees
a collapsed pill, clicks where a category sits, and nothing happens because the real category
buttons are inert until a hover-dwell. `SidebarDock.vue:70` sets `collapsible = props.showTooltips`
(true on desktop), and `:start-collapsed="collapsible"` (line 236) starts it collapsed. A primary
category-nav rail must NOT be collapsed-by-default (or its category set must live in the always-visible
`#persistent`/`#collapsed` register, not the hover-gated `#default` layer).

## (2)/(5) — No jump-to-page tabs; only step arrows

BottomDock at `/motion/springs`, EXPANDED:
- `.dock-layer--full` (the `#default` layer, NOT inert) children = `["Next story", "Previous
  category", "Next category", "Demonstrate the … dock morph"]` — **`hasStoryTabs:0`,
  `hasFadingScroll:false`, `clickableTabsNow:0`**.
- The 4 `DockTabButton`s that exist (`Buttons/Card/Badge/Separator`) live in `.dock-layer--summary`
  (the `#collapsed` slot), which is `inert:true, opacity:0, visibility:hidden` while the dock is
  EXPANDED.

Net: when expanded → 0 clickable page tabs (only arrows). When collapsed → the 4 summary chips show
but the arrows hide. There is no persistent scrolling tab strip of the current category's pages at
any state. This is why nav "works half the time" — prev/next arrows are the only working path, and
they step one page at a time, disabled at category bounds (`hasPrev`/`hasNext`, `BottomDock.vue:158`).

The category data IS available: `useStoryNavigation().current.category.stories` is the full ordered
list; the FadingScroll primitive (`src/components/custom/fading-scroll/FadingScroll.vue`, axis `x`) is
shipped. The fix is to render a persistent `<FadingScroll axis="x">` strip of
`current.category.stories` as `DockTabButton`s (active = `aria-current="page"`, click → `goTo(category.id,
story.id)`), in a register that is NOT the hover-gated `#default` layer.

## (3) — Wrong rail MODE

Live: `[data-testid="sidebar-dock-rail"]` and `[data-testid="bottom-dock-rail"]` both render
`.dock-stack … mode-stack` (`data-mode="stack"`). Source: both call `<DockStack v-model:selected …
:items="railItems" core-label="…">` with **no `mode` prop** → defaults to `"stack"`
(`DockStack.vue` `withDefaults … mode: "stack"`).

The user's "actual rail PROTOTYPE" is the **BE.W-DOCK-RAIL-REALIZE `mode="facets"`** context-carousel:
a flex strip of facet CHIPS, each carrying its own `item.accent` hue written to `--glass-accent`
(per-instance chromatic rim), the active facet lit on `--dock-control-active-bg`, the tiered
recession projection (`projectFacets`/`railProjection.ts`). The `DockStackItem.accent` field exists
(`constants.ts:37`) but `railItems` (both docks) never sets it (`SidebarDock.vue:114`,
`BottomDock.vue:97` map only `{id,label,icon}`).

Additional polish bug: the rail core anchor reads `getBoundingClientRect → y:-14` (partly above the
dock top edge) — contributes to the "broken" read; the facets-mode rebuild should re-seat the gutter
projection.

Fix: pass `mode="facets"` + map `accent` onto `railItems` (a context hue per facet — presets in
consumer, never a library token). The facet chips already write the consumer-owned
`v-model:selected` → `railContext` → `router.push` (the navigation wire is correct; only the render
mode + accent are missing).

## (7) — The "Pick a story" FOUC

Live capture on reload of `/motion/springs` (MutationObserver + 8ms poll watching for the literal
`<p>Pick a story</p>`):

```
sawPickStory: true
firstSamples (performance.now ms): 181, 192, 197, 205, … 414+  (present continuously)
```

The placeholder paints from ~181ms and persists past ~414ms until the lazy chunk resolves.

Mechanism (`AppShell.vue:277`):
```html
<RouterView v-slot="{ Component }">
  <Transition name="fade-slide">
    <component :is="Component" v-if="Component" :key="route.fullPath" />
    <Card v-else …>Pick a story</Card>   ← paints while Component === undefined
  </Transition>
</RouterView>
```
`Component` is `undefined` on first render because `story.component` is a lazy
`() => Promise<Component>` (`manifest.ts` `lazy(cat,id)` via `import.meta.glob`; `router.ts` uses it
directly as the route `component`). vue-router resolves the async component AFTER the initial paint,
so the `v-else` Card shows, then swaps + the `fade-slide` Transition animates → "briefly shows Pick a
story then animates to the page." It fires on EVERY real deep-route reload, not just an unrouted path.

Fix options (idiomatic, no workaround):
- Guard the placeholder so it only paints on a genuinely UNROUTED path (e.g. `v-else-if` keyed on
  `route.matched.length === 0` / `route.name === 'not-found'` is its own component anyway), so a real
  route that is merely still-resolving shows nothing (or the prior page) instead of "Pick a story";
  AND/OR
- Wrap the `<component :is>` in `<Suspense>` with a `#fallback` that is EMPTY (or a skeleton matching
  the page chrome), so the async resolve never falls through to the empty-state Card; AND/OR
- Eager-resolve the initial route (await `router.isReady()` before app mount — already implied, but
  the lazy component still resolves post-mount, so the `v-else` guard is the load-bearing fix).
  The minimal correct fix is the placeholder guard: the "Pick a story" empty-state must be reachable
  ONLY when there is no matched story route, NEVER during async resolution of a matched route.

---

## Glass tokens — NO gray-glass defect (warm-cream confirmed)

For completeness (no gray defect, but recorded): the dock plates resolve warm-cream, not gray.
`.demo-sidebar-dock` background-color = `color(srgb 0.872 0.841 0.810 / 0.328)`,
`.demo-bottom-dock__shell` = `color(srgb 0.903 0.871 0.840 / 0.443)` — warm (R>G>B, ~hue 30),
`backdrop-filter: blur(9px)`, `--glass-level:1`, `--glass-bg-dock` resolves the warm
`light-dark(hsl(30 85% 96%), hsl(26 22% 17%))` cream. The BA.W-NO-GRAY floor holds; the defects are
structural (collapse/inert/missing-tabs/wrong-mode/FOUC), not chromatic.

---

## Files to edit (the fix map)

- `demo/layout/SidebarDock.vue` — un-collapse the primary category nav at rest (or host categories
  in the always-visible register); pass `mode="facets"` + `accent` to its `<DockStack>`.
- `demo/layout/BottomDock.vue` — add a persistent `<FadingScroll axis="x">` story-tab strip of
  `current.category.stories` (jump-to-page `DockTabButton`s wired to `goTo`); keep prev/next +
  category-jump as the PERSISTENT controls; pass `mode="facets"` + `accent` to its `<DockStack>`.
- `demo/layout/AppShell.vue` — guard the "Pick a story" placeholder so it never flashes during async
  route resolution (only on an unrouted path); optionally wrap in `<Suspense>` with an empty/skeleton
  fallback.
- `demo/stories/dock-layer-contexts.ts` — supply per-facet `accent` context hues (presets in
  consumer) for the facets-mode rail.
- (no `src/` paint required — `<DockStack mode="facets">`, `<FadingScroll>`, `useContextualDockLayers`,
  `useStoryNavigation` are all shipped; this is an ASSEMBLY/wiring fix per W-DOCK-HUB-API /
  W-DOCK-SCROLL-FISSION "engine 100%, assembly 0%".)
