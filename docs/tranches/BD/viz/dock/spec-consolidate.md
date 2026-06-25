# BD viz · the CONSOLIDATED per-component DOCK spec — the HALLMARK, every facility in one place

**Lane** BD viz-research / dock · **Status** PLANNING/RESEARCH 2026-06-22 · **Branch** `prototype/liquid-dock` · **Scope** SYNTHESIS ONLY — zero `src/` edits. This is the single consolidated source-of-truth for the Dock-as-hallmark: it joins the 7 already-specced dock waves (BD/BE/BF) + the north-star quality bar + the HEAD engine surface into ONE per-component spec — anatomy, every morph/animation, the expand-to-contexts + contextual layer-switch + goo-split-to-sub-dock + shrunken state + sub-sections, and the robust-KISS API for using/scrolling/linking the dock.

> **The thesis (one line).** The Dock is ONE living organism on ONE orchestrator stack — never N feature-flags. Every facility below is a COMPOSITION of a shipped engine (one FLIP runner, one spring, one squish, one specular writer, one `--dock-*` scalar convention); the per-component anatomy is DATA (descriptors), the motion is compositor-only on a reserved footprint, and every liquid move paints on Safari.
>
> **Source waves consolidated** (read for the executable detail): `BF.W-{DOCK-INTEGRATE,FLIP-SPINE,SILHOUETTE-REALIZE,FISSION-FILAMENT,LIQUID-GROW-ON-EVENT}.md` · `BE.W-{DOCK-FISSION,DOCK-CONTEXT-SILHOUETTE,DOCK-RAIL-REALIZE,DOCK-NOWPLAYING-PILL,DOCK-TINTED-CHIP}.md` · `BD.W-{DOCK-CONSTELLATION,DOCK-SUBDOCK,DOCK-GOO-SPACING,DOCK-LINK-API,DOCK-NOWPLAYING-PILL,SCROLL-MINIMIZE,TABS-LIQUID}.md` · the north-star `dock/hallmark-northstar.md` + the viz-control `dock/viz-integration.md`.

---

## 0 · The component map (what exists, what each owns)

The dock is a feature-dir colocation (`src/components/custom/dock/`) of SFCs + composables + CSS partials. The consolidated anatomy:

### 0.1 The SFC surface (`/dock` barrel)

| Component | Role | State |
|---|---|---|
| **`GlassDock`** | the presentational shell — layout/state data-attrs, the `#persistent`/`#collapsed`/`#rail` slots, the `.glass-dock-frame` non-clipping escape | SHIPPED; gains `:silhouettes`/`:context` + `fission`-context pass-throughs (BF.W-DOCK-INTEGRATE / BD.W-DOCK-LINK-API) |
| **`DockNowPlaying`** | the FLAGSHIP fission surface — the stadium now-playing pill, the goo-split source, the silhouette host | NET-NEW (BF.W-DOCK-INTEGRATE ships the shell; BD/BE waves layer the constellation/album-tint/sub-dock onto it) |
| **`DockStack`** | the ONE rail engine — `mode="stack"` (macOS hover-fan) \| `mode="facets"` (context carousel), box-INVIOLATE in the gutter | SHIPPED; `mode="facets"` re-instated (BE.W-DOCK-RAIL-REALIZE) |
| **`DockLayerGroup` / `DockLayer`** | multi-layer panes + the switcher rail; the contextual layer-switch host | SHIPPED |
| **`DockSection`** | the declarative tripartite `[{kind}]` section chassis (`rail-core`\|`section`\|`nav`) | SHIPPED |
| **`DockIconButton` / `DockTabButton` / `DockSelectTrigger` / `DockDropdownTrigger`** | the five dock CONTROL families | SHIPPED; the two trigger families gain source-rect bloom (BD.W-DOCK-LINK-API) |
| **`DockBackgroundToggle`** | the WCAG-2.2.2 pause/play for an AV backdrop | SHIPPED |
| **`DockSeparator`** | the divider seam between section groups | SHIPPED |
| **`DockGooFilter`** | the mounted SVG `<filter id="dock-fission-goo">` (sRGB, the WebKit-safe goo) | SHIPPED (engine); MOUNTED by `DockNowPlaying` (BF.W-DOCK-INTEGRATE) |

### 0.2 The composable / engine stack (ONE of each)

| Engine | Owns | The ONE rule |
|---|---|---|
| **`useDockState`** | the collapse state machine (`collapsed`\|`hover`\|`pinned`) + `keepOpen`/`release` ref-counts + the `AZ.W-DOCK-FLICKER` hysteresis | ONE registry — scroll-minimize + grow + press FEED it, never a parallel ref |
| **`dockMorphContext`** | the collapse↔expand box morph on the ONE `--dock-morph-t` scalar (ONE `SpringProgress`/`DOCK_SPRING`) | the box morph; byte-fenced clock |
| **`useDockOrientationMorph`** | the V↔H orientation morph (writes `--dock-morph-t`, the `dim`-idiom) | the orientation flip; PRM `pin()` |
| **`useLayerTransition`** | the layer FLIP between `DockLayer`s (axis-aware off the computed `dim`) | the layer crossfade |
| **`useDockFission`** | the n-ary detach orchestrator — ONE `SpringProgress` writing `--dock-split-t` + per-piece `--split-dx/dy/--neck-t` off a context SIGNATURE | the split; the `persistent?` terminus (BD.W-DOCK-SUBDOCK) |
| **`useDockContextSilhouette`** | the declarative `DockSilhouetteDescriptor[]` state machine (`bar`\|`bar+pill`\|`split`\|`search`) + the `--dock-silhouette-fuse-t` meld | the silhouette; the SOLE `setSilhouette` writer |
| **`useDockLink`** | the KISS verb FACADE (`toSurface`/`receive`/`split`/`silhouette`) over the shipped engines | NET-NEW (BD.W-DOCK-LINK-API); delegates, never re-forks |
| **`useDockSearch`** | the pill→search-field morph (the `search` silhouette mechanism) | SHIPPED |
| **`railProjection`** | the PURE φ-tier/ring facet carousel projection math (`projectFacets`/`ringOffset`) — no state, no rAF | SHIPPED |

The shared motion spine the dock composes (NEVER re-forks): **`useElementBloom`** (the ONE FLIP rAF runner, BF.W-FLIP-SPINE — `useLiquidReveal`/`useDockCtaReceive`/`useDockContextSilhouette`/`useCelebrationBurst` all play through it), **`SpringProgress`/`DOCK_SPRING`** (the ONE dock spring), **`useLiquidFlex`** (the ONE volume-preserving squish), **`useSpringPress`/`useLiquidPress`** (the ONE press), **`useDragMorph`** (the ONE pull gesture), **`usePointerVelocityField`** (the ONE pointer-physics reader), **`createSpecularWriter`** (the ONE specular write).

---

## 1 · `<GlassDock>` — the shell + the orientation axis

`GlassDock` is ONE prop-shaped component on ONE layout axis. There is NO `variant` discriminant (AZ.W-DOCK-TAXONOMY — clean break): "vertical dock" is `orientation="vertical"` alone.

### 1.1 The props (HEAD + the BD additive pass-throughs)

```ts
interface DockProps {
  orientation?: "horizontal" | "vertical";   // default "horizontal"
  startCollapsed?: boolean;                   // default true
  alwaysExpanded?: boolean;                   // default false — short-circuits the collapse machine
  density?: "mobile" | "compact" | "comfortable" | "spacious";
  containerName?: string;                     // always-expanded-only (the container-type clamp trap, AY.W-DOCK2)
  // BD additive, default-OFF → byte-identical resting:
  silhouettes?: readonly DockSilhouetteDescriptor[];  // BD.W-DOCK-LINK-API: constructs useDockContextSilhouette internally
  context?: string;                           // + v-model:context — drives setSilhouette
  fission?: DockFissionContext;               // BF.W-DOCK-INTEGRATE: a nav/search dock hosts useDockFission on its own pieces
  minimizeOnScroll?: { scroller; threshold? }; // BD.W-SCROLL-MINIMIZE (mutually-exclusive with condenseOnScroll)
  condenseOnScroll?: { … };                    // BF.W-LIQUID-GROW-ON-EVENT (mutually-exclusive with minimizeOnScroll)
}
```

The additive props are **default-OFF**: an unbound `<GlassDock>` is byte-identical to HEAD (the silhouette machine never constructs; `--dock-grow`/`--dock-split-t`/`--dock-silhouette-fuse-t` sit at their `@property initial-value`). This is the SEED §2 "the dock is ONE organism on ONE orchestrator, not N feature-flags" — every new facility is DATA the plain dock accepts, never a second SFC.

### 1.2 The slots + the non-clipping frame (the load-bearing chassis)

- **`#persistent`** — in-flow in BOTH collapsed AND expanded, NEVER `:inert`. The iOS Now-Playing / Stage-Manager idiom done STRUCTURALLY (`GlassDock.vue:363`). The now-playing pill lives here → tappable-while-collapsed with NO new engine.
- **`#collapsed`** — the collapsed-summary content; an EMPTY slot collapses the summary to a bare perfect circle (the persistent control shown alone).
- **`#rail`** — rendered OUTSIDE the clipped morph aperture via the **`.glass-dock-frame`** non-clipping escape (NO `contain`/`backdrop-filter`/`overflow` on the frame). `<DockStack>` fans here; the goo-split sub-dock re-seats here. This is the **box-INVIOLATE** chassis: anything in the frame feeds NO size into the dock's intrinsic box (`deltaW = deltaH = 0`).

### 1.3 The aria contract

The `GlassDock` root is PRESENTATIONAL (`<div class="glass-dock">` with `data-density`/`data-held`/`data-container-name`, no ARIA role). `aria-expanded` MUST NOT be on the root (trips axe `aria-allowed-attr`) — it belongs on the dock TRIGGER child (the interactive control), bound to the dock's exposed `expanded` state.

---

## 2 · The MORPH cohort — every animation, one scalar each

The dock's motion is FIVE disjoint compositor scalars, each `@property`-registered (so it interpolates, not snaps) and each driven by ONE engine. No facility shares a scalar; no scalar is animated as a layout property. **All five resolve onto `transform`/`opacity`/`filter`/`clip-path` over a RESERVED footprint** — `proof:no-layout-animation` is the floor, CLS = 0 across every dock event.

| Scalar | Axis | Engine / authority | Direction | Driven by |
|---|---|---|---|---|
| `--dock-morph-t` | collapse↔expand box morph + V↔H orientation | `dockMorphContext` / `useDockOrientationMorph` | 0↔1 | pointer-leave · scroll-down (minimize) · `collapse()`/`expand()` verbs |
| `--dock-split-t` | the n-ary fission detach | `useDockFission` | 0→1 split / 1→0 merge | `split()`/`merge()` · the `media`/`search`/`nav` signatures |
| `--dock-silhouette-fuse-t` | the pill→tabbar meld | `useDockContextSilhouette` (SOLE writer) | 0→1 fuse | `setSilhouette('media')` |
| `--dock-grow` | event-reactive size-scale (condense) | scroll-choreography `scroll()` timeline + `useDragMorph` | 1→~0.78 | `condenseOnScroll` · touch-drag-to-grow |
| `--neck-t` | the fission filament span (per-piece) | `useDockFission` (BF.W-FISSION-FILAMENT) | stretch→tense→snap | the goo neck during detach travel |

Plus the gutters that READ the merge-threshold (BD.W-DOCK-GOO-SPACING): `--dock-constellation-gutter` + `--dock-subdock-gutter` both resolve off `--dock-goo-spacing` (the ONE GlassEffectContainer `spacing:` analogue, default `1.875rem` ≈ Apple 30px). Within the threshold two glass bodies goo-blend; beyond it they read discrete.

### 2.1 The collapse↔expand box morph (`--dock-morph-t`, SHIPPED)

The box-size morph is a COMPOSITOR TRANSFORM over a RESERVED settled footprint: the morph-axis box reserves its `to` footprint (`inline-size`/`block-size: var(--dock-morph-to)`, one layout solve) and the live scalar drives `transform: scaleX/scaleY(var(--dock-morph-scale))` (from/to → 1), transform-origin at the pinned edge. NO layout property reads the live scalar → the CDP Layout track stays flat, the content reads complete behind the `overflow:clip` aperture from frame 0. Applies on BOTH orientations (a vertical dock collapses its `height`; the chrome — bg/border/padding/radius/child-stagger — morphs continuously on the SAME `--dock-expand-t`). PRM seats synchronously (`prefersReducedMotion()` in `onSwap` + `useLayerTransition`, a `nextTick`-bounded synchronous measure — never the collapsed-from sliver).

### 2.2 The V↔H orientation morph (`useDockOrientationMorph`, SHIPPED)

A V↔H flip is a TOPOLOGY change (flex column→row + two-axis size) — the platform CANNOT continuously interpolate a mismatched-topology silhouette (the binding limit). The showcase RESPECTS it: the **shipped default is the View-Transitions crossfade** (`startViewTransition`, deterministic, budget-clearing). The higher-fidelity metaball-teardrop bridge (`morph-bridge.css` SVG-goo) is the perf-gated preview, NOT the default. `useDockOrientationMorph` writes the ONE `--dock-morph-t` scalar, interruptible (velocity-continuity re-base), PRM-aware (`pin()` snaps to target with zero motion frames). Consumer #1 of `useLiquidFlex`.

### 2.3 The fission split (`--dock-split-t`, BE.W-DOCK-FISSION + BF.W-FISSION-FILAMENT)

`useDockFission` CLONES the `dockMorphContext` single-spring loop shape (NO new spring family — `DOCK_SPRING` reused) for a 0→1 `--dock-split-t` detach. Each surviving control registers as a fission PIECE carrying `{ vector, rank, profile: DockSplitSignature }`. The per-context goo-SIGNATURE is DATA, not three code paths:

- **`search` = RADIAL BURST** — controls fly outward; neck necks LATE (tense radial pop); innermost-first stagger.
- **`media` = LATERAL PEEL** — the now-playing center STAYS (anchor); flanking transport peels along the cross axis (`dimOf`) into the `--dock-rail-extend-length` gutter; LONG tapering neck.
- **`nav` = INWARD MERGE** — negative radial; the bridge runs BACKWARD; `--stretch` peaks at coalescence.

The pointer-reactive SEAM-TENSION is a FLOOR: `--seam-tension = clamp(0, field.velocity·k, cap)` written ONCE/frame off `usePointerVelocityField` (fed from INSIDE the `--dock-split-t` rAF loop — one-loop), and the neck-inset reads `inset(calc(--seam-neck − --seam-tension·--seam-give))` — a fast pull THINS the neck via the EXISTING `clip-path` channel (no re-rasterize). Cap LOW (≈0.12, the anti-taffy bar). The spanning neck (BF.W-FISSION-FILAMENT) runs stretch→tense→snap on `--neck-t`. The goo is the REGULAR `filter: url(#dock-fission-goo)` + `color-interpolation-filters="sRGB"` (the WebKit-safe path, NEVER `backdrop-filter: url()` — bug 245510); a piece is goo OR glass per-frame (the Backdrop-Root atomicity constraint). PRM seats every piece at `to` synchronously, `field.tick(0)` zeroes tension.

### 2.4 The silhouette meld (`--dock-silhouette-fuse-t`, BE.W-DOCK-CONTEXT-SILHOUETTE + BF.W-SILHOUETTE-REALIZE)

`useDockContextSilhouette` reads a `DockSilhouetteDescriptor[]` map; on `setSilhouette(toId)` it DIFFs slots by `controlId` — survivors FLIP (via the ONE `useElementBloom` spine + `ElementMorph`/`springTimingFunction` off `DOCK_SPRING`), from-only DETACH (drives `useDockFission.registerPiece`), to-only BLOOM (the inverse FLIP). The `bar+pill` descriptor DOCKS the now-playing pill DOWN and MELDS it into the bar: the pill's `clip-path` insets its bottom edge + `translateY` docks it down so its bottom melds into the bar's top edge as ONE continuous glass plate, driven by `--dock-silhouette-fuse-t` 0→1. The scalar is registered `@property` (`<number>`, `inherits: true`, `initial-value: 0` — byte-identical resting, the pill above the bar). The four silhouettes: `bar` (resting nav) · `bar+pill` (media, the FUSION) · `split` (transport carve) · `search` (dock-as-field, `useDockSearch` owns the mechanism). The SINGLE-WRITER fence is binding: `useDockContextSilhouette` is the SOLE `setSilhouette` caller; CONSTELLATION/SUBDOCK/LINK-API CONSUME the wired silhouette, never re-call it.

### 2.5 The grow/condense (`--dock-grow`, BF.W-LIQUID-GROW-ON-EVENT)

The event-reactive size axis (DISJOINT from `--dock-morph-t` collapse and `--dock-scale` density). `@property --dock-grow { syntax:"<number>"; inherits:true; initial-value:1 }` → `transform: scale(var(--dock-grow))` over a reserved footprint. Two event sources FEED it: (a) **scroll-condense** — a `.dock-condense-on-scroll` `scroll()`-timeline recipe in `scroll-choreography.css` under the `@media (prefers-reduced-motion: no-preference)` + `@supports (animation-timeline: scroll())` outer gate (the keyframe animates ONLY `--dock-grow`, condenses across the first ~240px); (b) **touch-drag-to-grow** — `useDragMorph` on the sheet grip with two snap targets (condensed / full), fling-to-nearest single-commit writes `--dock-grow` via `onSnap`. PRM: the scroll recipe never binds under reduce (the dock stays full size); the drag commits with zero squish frames.

---

## 3 · The SHRUNKEN state — scroll-minimize + the perfect circle

Two DISJOINT scroll-reactive size responses, MUTUALLY-EXCLUSIVE per dock (binding both double-shrinks — `useDockState` throws-in-dev):

### 3.1 Scroll-MINIMIZE (`--dock-morph-t` collapse, BD.W-SCROLL-MINIMIZE)

The iOS `.tabBarMinimizeBehavior.onScrollDown`: scroll-DOWN → `collapse()` (the dock runs its EXISTING `--dock-morph-t` morph to the perfect-circle summary), scroll-UP → `expand()`. The `minimizeOnScroll` feed is an OPTIONAL input to the ONE `useDockState` (a rAF-coalesced `scrollTop`-DELTA read — direction, NOT position) — never a second machine, never a new morph. The `HOVER_INTENT_MS` (60ms) hysteresis + an ~8px dead-band kill the jitter-thrash. `keepOpen`/`release` ref-counts win (a held dock — a dragging slider, an open overlay — never minimizes mid-gesture); `alwaysExpanded` short-circuits. The minimize re-uses the SHIPPED collapse morph + hysteresis — ZERO new motion. The DIRECTION-read is plain JS `scrollTop` deltas (no `scroll()`-timeline dependency for the trigger) → works identically on Safari.

### 3.2 The perfect-circle collapsed floor (AY.W-DOCK-NAV B4/B15, SHIPPED)

`--dock-collapsed-summary-min-size` (`calc(--dock-layer-height * 0.85)`, a tight proportioned circle) + `--dock-collapsed-padding`, both on the `--dock-scale` coarse thread. The collapsed `.dock-layer--summary` LIFTS the height-lock + `aspect-ratio: 1` → a 1:1 circle (never an oval). An empty `#collapsed` slot collapses to the persistent control alone; the morph grows symmetrically about it (center-out). The collapse-onset is pop-free + thrash-free (AZ.W-DOCK-FLICKER): the `+1.1` hover-scale is scoped `:not([data-morphing])` (inert during the morph), + the `useDockState` hover hysteresis (60ms intent-dwell + the morphing-edge-sweep recheck).

### 3.3 Scroll-CONDENSE (`--dock-grow` scale, §2.5) — the disjoint sibling

The continuous position-keyed scale-condense (a hero/sheet dock condenses-in-place). NEVER bound on the same dock as `minimizeOnScroll` (the C7 not-both-bound guard). A content-reading dock minimizes-to-circle; a hero dock condenses-in-place.

---

## 4 · EXPAND-to-CONTEXTS + the contextual LAYER-SWITCH

Two distinct expand mechanisms — the silhouette RECONFIGURATION (the dock's own shape) and the layer SWAP (the panes inside it).

### 4.1 The silhouette context switch (the dock's SHAPE, §2.4)

A context change re-flows the SAME islands via the ONE FLIP engine — the constellation BREATHES into a new shape (`bar` ↔ `bar+pill` ↔ `split` ↔ `search`), the islands gliding to new slots with the goo bridging where they fuse. ONE descriptor machine, ONE FLIP runner — NOT N feature-flag booleans toggling CSS classes (the SEED §2 anti-pattern). The trap (`hallmark-northstar.md` §3): `isPill`/`isSplit`/`isSearch` each toggling a class with a `transition` re-collapses the organism into a switch-statement of states.

### 4.2 The DockLayerGroup contextual layer-switch (the PANES, SHIPPED)

`DockLayerGroup` + N `DockLayer` children: each `DockLayer` registers via `provide`/`inject`; the group renders an optional Figma-style switcher RAIL from the registered descriptors (`showRail` + `railPosition`) and drives crossfade + size FLIP (`useLayerTransition`, axis-aware off the computed `dim`) between layers. Only the active layer is interactive (inactive get `inert` + `pointer-events: none`). `DockLayerGroup` SELF-RESERVES its peak-layer block-size (measures each pane's scrollHeight, reserves the PEAK as `min-block-size` on its OWN root — never the dock root, the box-inviolate fence — re-measured on a `useResizeObserver` tick) + exposes a read-only `--dock-layer-peak-block-size`. The `:draggable` axis (BB.W-DRAG-MORPH) wires `useDragMorph` to the switcher rail for pull-to-switch (the ≥2-consumer bar at birth).

### 4.3 The DockSection tripartite chassis (SHIPPED)

`<DockSection :sections>` renders the three-zone gestalt — a leading `rail-core` home/brand region, named `section` groups demarcated by `<DockSeparator>`, a trailing `nav` group — by composing `<DockSeparator>` over in-flow controls via a `v-for` over the descriptor array. `display: contents` (GROUPS, doesn't re-mount — the dock box shrink-wraps as before, INVIOLATE). A section's contextual facets (`descriptor.layers`) feed the seam rail OUTSIDE the dock box.

### 4.4 The cockpit preset + density (SHIPPED)

The density axis is FOUR rungs (`mobile`/`compact`/`comfortable`/`spacious`); `[data-preset="cockpit"]` is a NAMED tight instrument-cockpit geometry (a FIXED `2.75rem` control floor, the tightest chrome) that composes WITH a density base — NOT a 5th rung. The whole geometry cascade rides `--dock-scale` = `calc(--ui-scale * --dock-local-scale)`; on coarse pointer the `--dock-mobile-scale` (consumer) / `--dock-coarse-scale` (0.78, library) lift it, the `max(…, --dock-control-floor)` clamp keeps the WCAG-2.5.5 44px floor. The dock LABEL tracks the control by `--dock-label-ratio`.

---

## 5 · The GOO-SPLIT → PERSISTENT SUB-DOCK (the iOS-26 bottom-accessory re-seat)

The hallmark fission terminus: the now-playing/media control goo-SPLITS off the core dock and RE-SEATS as a standing accessory beside the minimized core — a PERSISTENT re-configuration, NOT a transient piece that flies out and merges back.

### 5.1 The mechanism (BD.W-DOCK-SUBDOCK — the persistent terminus on the shipped orchestrator)

ONE additive register on `useDockFission` — NOT a new fission engine, NOT a second spring:

1. **The `persistent?: boolean` flag** on `DockFissionPieceRegistration` (default `false` → byte-identical to today's transient fission). A persistent piece is carved OUT and does NOT auto-merge: when the orchestrator settles at `--dock-split-t` = 1, `onPersist` fires (no `merge()`) and the SFC re-seats it. The `media`=lateral signature's natural terminus.
2. **The standing sub-dock IS `<DockStack>`** (or a second `<GlassDock>` instance) — NO new floating-dock component. It re-seats in the `.glass-dock-frame` escape (a SIBLING of the core, box-INVIOLATE), `mode="stack"` the macOS fan of the surviving media controls (play/pause/scrub).
3. **The bottom-accessory RE-SEAT law** (`src/styles/dock/subdock.css`): `.dock-subdock` is `position: absolute` in the non-clipping frame, seated at the bottom edge with a `--dock-subdock-gutter` (off `--dock-goo-spacing`) BETWEEN it and the minimized core. The re-seat is a compositor `transform: translate` on a RESERVED footprint (NEVER animated `inset`/`width`). The core MINIMIZES via the SHIPPED `collapse()` (no new minimize mechanism).
4. **The goo-neck SNAPS at re-seat** — the filament runs its full stretch→tense→snap during detach, then at the re-seat the neck is GONE (the standing sub-dock is plain `.glass-floating` glass, NOT tethered — the persistent terminus). The goo is the detach-travel-only path.

### 5.2 The fences (the four traps this must NOT become)

- a transient piece dressed up as persistent (flies out then re-merges) — the PERSISTS assert (a second frame after settle reads the SAME standing accessory);
- a sub-dock that floats away free — the re-seat MUST anchor BESIDE the minimized core (the `--dock-goo-spacing` gutter assert);
- a tethered accessory keeping its goo neck — a standing dock is discrete (the no-surviving-neck assert);
- a second floating-dock component (the no-new-component bite — it IS `<DockStack>`/`<GlassDock>`).

PRM seats the split + re-seat SYNCHRONOUSLY (the accessory appears at its bottom slot in one frame — a state change, not a motion).

---

## 6 · SUB-SECTIONS + the rail (the carousel + the constellation)

### 6.1 The DockStack rail — one engine, two render modes (BE.W-DOCK-RAIL-REALIZE)

`<DockStack mode="stack" | "facets">` is the ONE rail engine on the kept `.glass-dock-frame` escape + the ONE `--spring-dock` clock, box-INVIOLATE:

- **`mode="stack"` (default)** — the macOS Dock hover-expand STACK: a `core` anchor + N members that FAN OUT on hover/focus (reusing `HOVER_INTENT_MS`), each a clear `--glass-bg-floating` glass icon. `visibleCount` (default 3) fan at rest; >visibleCount scrolls through `<FadingScroll>`. Compositor-only fan on `--spring-dock`, staggered by `--dock-stack-stagger`, PRM-carved.
- **`mode="facets"`** — the context CAROUSEL: a flex strip of facet-CHIPS, each carrying its OWN accent hue via `item.accent` → the chip's `--glass-accent`/`--glass-accent-strength` (the BB.W-GLASS-ACCENT per-instance chromatic-rim axis — NOT a flat shared fill). The active facet lifts onto the selected-as-glass `--dock-control-active-bg` tier (the lift is the glass tier; the accent is the rim DECORATION — disjoint). The accent rides the bounded `--dock-facet-accent-strength` whisper (48%). The facet hue is the consumer's context color (presets-in-consumers).

ONE registry: the chips write a consumer-owned `v-model:selected` (no internal shadow). The pure φ-tier/ring projection math lives in `railProjection.ts` (`projectFacets`/`ringOffset` — STATELESS, no spring re-fork). The fission→facet hand-off: a `<DockFissionPiece>` can target a facet's rect, the goo neck stretches dock→facet, the piece lands CARRYING the facet's accent hue (the absorb read). The clean-break delete: NO standalone `.liquid-rail-dock` capsule, NO `DockRail.vue`/`DockFacetRail.vue` 2nd component (DEFINITION-ABSENT).

### 6.2 The resting CONSTELLATION — `[home · pill · search]` (BD.W-DOCK-CONSTELLATION)

The steady-state silhouette of `<DockNowPlaying>` (the resting `bar+pill` of `useDockContextSilhouette`, CONSUMED not re-wired): a floating STADIUM PILL flanked by two perfect-circle SATELLITES over an even gutter, the whole constellation floating over the album aurora:

- **The stadium PILL (protagonist):** `.dock-constellation-pill` — `inline-size: ~70cqi` (container-relative, tracks route width), a true STADIUM radius (`--radius-pill` ceiling), `place-self: center`, composing `.glass-deep` (BB.W-DEEP-GLASS — the thick refractive 16px/saturate-1.5 read).
- **The two perfect-circle SATELLITES:** `.dock-satellite.is-home` (leading) + `.is-search` (trailing) — `aspect-ratio: 1` + diameter == pill height (`--dock-layer-height`) + `border-radius: 999px`.
- **The RECESSED home register:** `.is-home` re-points `--glass-level` DOWN (`~0.7` — a quieter, more transmissive ghost disc, a depth cue via the SHIPPED level path so it reaches the a11y + W55 machinery) + a dimmed glyph. The search satellite stays full-tier + full-ink (the live affordance).
- **The gutter** (`--dock-constellation-gutter`) reads `--dock-goo-spacing` (≈1-satellite diameter) — a satellite WITHIN the threshold goo-blends toward the pill; the re-seated sub-dock seats BEYOND it (reads discrete).

The MERELY-CORRECT trap: three rounded rects in a flex row. The FLAGSHIP: a wide stadium pill + 2 perfect circles, deep-vs-floating material step, recessed-home depth, floating over the live aurora.

### 6.3 The merge-threshold + small-vs-large adaptivity (BD.W-DOCK-GOO-SPACING)

ONE `--dock-goo-spacing` knob (the SwiftUI `GlassEffectContainer(spacing:)` analogue) governs the goo-merge by inter-element distance (within → blend, beyond → discrete) — read by `fission-bridge.css` + both gutters. PLUS the size-gated adaptivity flip on the EXISTING bright-bucket seam (NO new observer): `[data-glass-adapt="small"]` (satellites/control chips) FLIPS the content register HARD over a bright backdrop (the small-element inversion via `contrast-color()`); `[data-glass-adapt="large"]` (the pill, panels) LIFTS the plate WITHOUT a content flip (the Apple HIG small-vs-large read).

---

## 7 · The NOW-PLAYING PILL — the album-reactive hallmark

`<DockNowPlaying>` (BF.W-DOCK-INTEGRATE shell + BD.W-DOCK-NOWPLAYING-PILL album arm) — the dock HALLMARK:

- **Three regions:** a leading CIRCULAR art-chip (the ambient-hue sample SOURCE) + a `<ScrollingText>` marquee title (byte-reused, PRM-stopped) + live transport (a play↔pause `clip-path`/`opacity` glyph MORPH, never a swap). Sits in `#persistent` → tappable-while-collapsed.
- **The CLEAR surface** (`surface="clear"`, BD.W-CLEAR-VARIANT — the 4th surface-axis member, ~0.55-0.62) STRUCTURALLY COUPLED to a MANDATORY `::before` dimming-scrim (the Apple Clear contract — the live album grid bleeds through WHILE the title clears AA).
- **The album-hue plate-tint FLOOR** (the single most-repeated iOS-27 delight): the pill PLATE ABSORBS the playing album's dominant hue via `--glass-fill-tint: oklch(... var(--glass-ambient-hue))` (the W-TINTED-CHIP per-instance plate-bg axis — DISTINCT from the rim `--glass-accent` AND the W55 `--glass-tint-source` legibility axis) off the 12-bucket OKLCh histogram (the HOISTED `hueHistogram.ts` leaf). Ravel-purple album → purple-cast plate. Sub-perceptual + bounded (a WHISPER absorbed into the glass, warm-cream identity holds); a gray album → null hue → no tint (the correct neutral fall). The cross-origin album image throws on `getImageData` → null → the warm-cream default (the tainted-canvas guard).
- **The bloom-to-fullscreen** composes the SHIPPED `ExpandableContainer` (body-lock/teleport/Escape) + `useLiquidReveal` (the pill→card bloom from the pill rect) — NO second fullscreen mechanism.

The aurora-drive is presets-in-consumers: the pill + the demo DockStage aurora both READ the SAME `--glass-ambient-hue`/`hueHistogram.ts` source (the field IS the album, the plate IS the album) — ZERO library aurora/shader edit (the GL-shader fence holds).

---

## 8 · The ROBUST-KISS API — using / scrolling / linking the dock

### 8.1 `useDockLink(dockRef, { fission?, silhouette? })` — the ONE verb FACADE (BD.W-DOCK-LINK-API)

The dock as a living organism that LINKS OUT — FOUR verbs, each a thin DELEGATION to a shipped engine (owns NO rAF/spring/second physics core), ONE spring family two directions:

| Verb | Composes | Direction | Use |
|---|---|---|---|
| **`toSurface(controlRef, surfaceRef)`** | `useLiquidReveal` | bloom-out 1→0 | a dock control blooms a sheet/dialog/viz-configurator FROM its rect |
| **`receive(ctaRef, controlRef)`** | `useDockCtaReceive` | receive-in 0→1 | an external CTA flies + congests INTO a dock control (the seat reserves) |
| **`split(signature?)`** | the passed `fission` handle | — | reconfigure the silhouette for the active context |
| **`silhouette(toId)`** | the passed `silhouette` handle | — | morph the resting silhouette per route/context |

**The handle-boundary fix (load-bearing):** the fission/silhouette handles arrive via EXPLICIT options ONLY (or the facade is constructed INSIDE the dock SFC where they're in lexical scope) — NEVER through `defineExpose`/`dockRef.value.<handle>` (the template-ref silent-no-op trap, MEMORY `feedback_glass_ui_binding_verification`). `dockRef` is the bloom-rect source only.

### 8.2 The trigger blooms (BD.W-DOCK-LINK-API)

`DockSelectTrigger` / `DockDropdownTrigger` compose `useLiquidReveal(contentRef, { trigger: triggerRef })` so the portaled overlay blooms FROM the trigger's rect (not the generic center/anchor zoom). The content node is obtained via reka's PUBLISHED `:ref` — NEVER a `document.querySelector('[data-reka-*]')` internal-selector reach (the silent-no-op trap). The `.glass-reveal` CSS floor stays (the Safari-safe default; the JS bloom is the refinement).

### 8.3 The scroll API (using the dock in a scroller)

- **`minimizeOnScroll: { scroller, threshold? }`** — directional collapse-to-circle (§3.1). MUTUALLY-EXCLUSIVE with `condenseOnScroll`.
- **`condenseOnScroll`** + the `.dock-condense-on-scroll` class — continuous `scroll()`-timeline scale-condense (§2.5). Or `.smooth-scroll` / `.scroll-gutter-stable` for the app-shell scroller (the no-shift discipline when the dock hosts portaled overlays).
- The dock NEVER inflates the host scroller's box (box-INVIOLATE); `--dock-content-safe-inset` is the CONTENT-side anti-collision gutter the consumer's `<main>` reserves (scroll-padding) — DISTINCT from `--dock-control-safe-inset` (the de-overload is binding).

### 8.4 The link-scalar registry (the LIVING census)

`src/components/custom/dock/README.md` carries the `## The link-scalar registry` section — a LIVING census over EVERY `--dock-*-t`/`--dock-*-gutter`/`--dock-goo-*`/`--neck-t`/`--dock-grow` scalar declared in `src/styles/dock/`, each with its ONE authority + direction. `proof:dock-link` C5 reads the live scalar set off disk: a declared scalar with no table row REDs (a new minted scalar that didn't enroll); a row for a dead scalar REDs (the sweep). The rename fence: `--silhouette-fuse-t` is GONE (clean break) — `--dock-silhouette-fuse-t` is the canonical row.

### 8.5 The minimal usage shapes

```vue
<!-- plain dock — byte-identical to HEAD, no facility constructs -->
<GlassDock orientation="vertical"><DockIconButton :icon="Home" /></GlassDock>

<!-- the now-playing hallmark — the whole organism as DATA -->
<GlassDock :silhouettes="dockSilhouettes" v-model:context="ctx" :minimize-on-scroll="{ scroller }">
  <template #persistent><DockNowPlaying :media="now" /></template>
  <template #rail><DockStack mode="facets" v-model:selected="facet" :items="contexts" /></template>
</GlassDock>

<!-- and in <script setup>, the link facade binds the live handles -->
const dockFission = useDockFission({ rootEl, signature });
const dockSilhouette = useDockContextSilhouette({ silhouettes: dockSilhouettes });
const link = useDockLink(rootEl, { fission: dockFission, silhouette: dockSilhouette });
```

---

## 9 · The cross-cutting HALLMARK bar (binds EVERY facility)

A wave that nails its own delta but breaks one of these is merely-correct, not flagship (`hallmark-northstar.md` §8):

1. **Liquid CONTINUITY** — bodies are one mass that splits/melds, never discrete elements that translate (the goo neck spans every split, the merge-threshold fuses every near pair, the silhouette re-flows ONE constellation).
2. **MATERIAL HIERARCHY** — depth is real (the pill deep glass, the satellites floating, the home recessed via `--glass-level`; the backdrop bleeds through at DIFFERENT rates per body).
3. **ALBUM/CONTENT REACTIVITY** — the glass drinks the content's color (the pill plate tints to the album hue; the constellation floats over the album-derived aurora).
4. **ONE ORGANISM, ONE ORCHESTRATOR** — ONE silhouette descriptor machine, ONE FLIP runner, ONE spring, ONE squish, ONE press, ONE specular writer, ONE `--dock-*` scalar convention. Every transition reads as the SAME spring family. Scattered per-state booleans are the disease.
5. **SAFARI-FIRST, ABSOLUTE** — goo = `filter: url()` sRGB; glass = own-blur `backdrop-filter`; morphs = compositor `transform`/`opacity`/`filter` (NEVER `backdrop-filter: url()`). Every dock surface enrolls on the webkit Playwright project. A Chromium-only liquid move is a FAILURE, not a degrade.
6. **COMPOSITOR-ONLY on a RESERVED footprint** — every morph/split/condense/bloom is `transform`/`scale`/`translate`/`opacity`/`filter`/`clip-path` over a one-time-reserved box. `proof:no-layout-animation` is the floor; CLS = 0 across every dock event.
7. **PRM-SAFE BY CONSTRUCTION** — every facility seats synchronously under reduce (the split re-seats in one frame, the minimize collapses instantly, the tab snaps to fit, the bloom snaps to settled) — the chrome STILL gives content room, instantly.
8. **The PAINT is the truth, frame-matched** — each facility closes against its OWN fresh live `:5199` capture (4 PNGs {light,dark}×{desktop,mobile}, LIVE MOTION never reduced) + the webkit π + an oklab readback; the gestalt verdict is the side-by-side overlay against the reference frame, NOT the getImageData scan alone. The binding hallmark test: a viewer cannot tell which is iOS-27 and which is glass-ui — and where they differ, glass-ui is RICHER (the album-hue plate-tint, the deep-glass protagonist, the 5-beat tab overshoot, the persistent re-seat are the betters the reference does not carry).

---

## 10 · The flagship-vs-merely-correct ledger (the one-line bar per facility)

| Facility | Owning wave(s) | MERELY-CORRECT | FLAGSHIP |
|---|---|---|---|
| Shell + orientation | GlassDock (HEAD) + LINK-API/INTEGRATE pass-throughs | a flex container with a collapse | ONE organism; every facility is DATA the plain dock accepts default-OFF |
| Collapse / V↔H morph | dockMorphContext / useDockOrientationMorph (HEAD) | a width transition | reserved-footprint compositor scale, VT-crossfade for the topology flip, PRM sync-seat |
| Constellation | BD.W-DOCK-CONSTELLATION | 3 rounded rects in a flex row | wide stadium pill + 2 perfect circles, deep-vs-floating, recessed-home depth, over live aurora |
| Sub-dock | BD.W-DOCK-SUBDOCK | piece translates out, gap appears, merges back | goo-merged mass → spanning neck snaps → standing accessory re-seats beside minimized core, persists |
| Silhouette | BE/BF.W-SILHOUETTE | N feature-flag classes with transitions | ONE descriptor machine + FLIP fuse-meld, the constellation breathes into new shapes |
| Fission split | BE.W-DOCK-FISSION + BF.W-FISSION-FILAMENT | a piece flies off | per-context signature (radial/lateral/inward), pointer-reactive seam-tension neck, snaps |
| Scroll-minimize | BD.W-SCROLL-MINIMIZE | a min-on-scroll boolean / position-condense | directional dead-banded box-condense to the perfect circle, anticipatory |
| Grow / condense | BF.W-LIQUID-GROW-ON-EVENT | a padding/height transition | `--dock-grow` scale on a reserved box, scroll-condense + drag-to-grow, mutually-exclusive with minimize |
| Layer-switch | DockLayerGroup (HEAD) | a v-if pane swap | descriptor-registered layers, FLIP crossfade, self-reserved peak block-size, pull-to-switch |
| Rail / sub-sections | BE.W-DOCK-RAIL-REALIZE + DockSection (HEAD) | a second vertical dock / un-tinted glyph fan | ONE engine, stack-fan OR accent-facet carousel, fission lands pieces on facets, box-INVIOLATE |
| Now-playing pill | BD.W-DOCK-NOWPLAYING-PILL | static-tinted opaque pill, icon swap | plate drinks the album hue, clear window bleeds content through, transport morphs |
| Liquid-tab | BD.W-TABS-LIQUID | rigid slide / travel-squish | 5-beat grow→overshoot→travel-swollen→settle→shrink, ~1.1× metaball swell |
| Link-API | BD.W-DOCK-LINK-API | 4 hand-wired composables | ONE verb facade, ONE spring two directions, dropdowns bloom from their rect |

**The binding test (W-REFLECT, fresh pixels):** overlay each captured facility against its reference frame (`dockcrop/d036` constellation · `tabstrip/s*` pill · the V1 band split · `tabs/f060` tab bar). PASS iff a viewer cannot tell which is iOS-27 and where they differ glass-ui is richer.
