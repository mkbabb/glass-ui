# glass-ui

Shared glassmorphic design system: Vue 3.5 components, CSS design tokens, composables. Built on reka-ui + Tailwind CSS v4.

## Build

```
npm run build           # library → dist/glass-ui.js + glass-ui.css + index.d.ts
npm run typecheck       # vue-tsc --noEmit
npm run profile:budget  # bundle-budget gate (re-landed K W4 Lane B); --enforce mode in CI
```

## Structure

```
src/
├── index.ts                        # barrel: components + composables + utils
├── components/
│   ├── ui/                         # 44 shadcn-vue base component packages + _shared (reka-ui)
│   │   ├── _shared/                # ModalOverlay (V.W3 43bee82) + menuItemVariants CVA (V.W3 6e6916e)
│   │   ├── accordion/              # Accordion + trigger/content wrappers
│   │   ├── alert/                  # Alert, title, description
│   │   ├── avatar/                 # Avatar, AvatarImage, AvatarFallback
│   │   ├── badge/                  # Badge + badgeVariants CVA
│   │   ├── button/                 # Primitive + buttonVariants CVA (incl. primary-audacious — K W6)
│   │   ├── card/                   # Card, header/title/description/content/footer
│   │   ├── carousel/               # Carousel primitives
│   │   ├── cartoon-card/           # CartoonCard sibling of Card (cartoon glass tier)
│   │   ├── checkbox/               # Checkbox
│   │   ├── collapsible/            # Collapsible root/trigger/content
│   │   ├── combobox/               # Combobox shell
│   │   ├── command/                # Command palette + subcomponents
│   │   ├── context-menu/           # ContextMenu public compound wrappers
│   │   ├── data-table/             # Table sorting/filter helpers
│   │   ├── dialog/                 # Dialog + subcomponents
│   │   ├── drawer/                 # Drawer bottom sheet (vaul-vue)
│   │   ├── dropdown-menu/          # DropdownMenu compound wrappers
│   │   ├── hover-card/             # HoverCard trigger/content
│   │   ├── input/                  # Glass-styled input
│   │   ├── label/                  # Label
│   │   ├── metric-pill/            # MetricPill stacked-pill primitive (V.W2 0601d62 — composes MetricBadge)
│   │   ├── multi-select/           # Multi-select control
│   │   ├── notification/           # Notification surface (consumes success/warning/info-foreground tokens — V.W2)
│   │   ├── number-field/           # NumberField + subcomponents
│   │   ├── popover/                # Popover trigger/content
│   │   ├── progress/               # Progress bar (default + gradient variant)
│   │   ├── radio-group/            # RadioGroup, RadioGroupItem
│   │   ├── scroll-pane/            # ScrollPane (glass-wash + scrollbar-hidden + grain disabled)
│   │   ├── section/                # Section sectioning landmark (V.W3 d2247c8) — composes typography ladder
│   │   ├── select/                 # Select public compound wrappers
│   │   ├── separator/              # Separator (h/v)
│   │   ├── sheet/                  # Sheet side drawer + subcomponents
│   │   ├── skeleton/               # Loading skeleton (compositor-friendly transform-only shimmer — K WP)
│   │   ├── slider/                 # reka-ui SliderRoot wrapper (keepDockOpen contract — see Slider section)
│   │   ├── switch/                 # Switch
│   │   ├── table/                  # Table primitives
│   │   ├── tabs/                   # Tabs, list, trigger, content
│   │   ├── tags-input/             # TagsInput + subcomponents
│   │   ├── textarea/               # Textarea
│   │   ├── toast/                  # Toast exports
│   │   ├── toggle/                 # Toggle + toggleVariants CVA
│   │   ├── toggle-group/           # ToggleGroup, ToggleGroupItem
│   │   ├── tooltip/                # Tooltip provider/trigger/content (rounded-tooltip token)
│   │   └── index.ts                # barrel: all ui/ exports
│   ├── custom/                     # 30 custom package dirs; 28 public package barrels
│   │   ├── animation/              # internal animation helpers
│   │   ├── aurora/                 # Aurora WebGL background + useAuroraStudio (parallel chrome — see Configurator)
│   │   ├── configurator/           # Configurator + ConfiguratorLayer + ConfiguratorRow + useConfiguratorState
│   │   ├── confirm-dialog/         # ConfirmDialog
│   │   ├── controls/
│   │   │   └── DarkModeToggle.vue  # animated sun/moon SVG (useGlobalDark)
│   │   ├── disco-glyph/            # DiscoGlyph 3-layer SVG glyph primitive
│   │   ├── dock/
│   │   │   ├── GlassDock.vue       # collapsible glass pill, dual-layer grid, horizontal | vertical, containerName prop (V.W2)
│   │   │   ├── DockLayerGroup.vue  # multi-layer container + optional switcher rail
│   │   │   ├── DockLayer.vue       # named pane inside a DockLayerGroup
│   │   │   ├── DockIconButton.vue
│   │   │   ├── DockTabButton.vue
│   │   │   ├── DockSelectTrigger.vue
│   │   │   ├── DockDropdownTrigger.vue
│   │   │   ├── composables/        # useDockState, useLayerTransition (axis-aware — see dock orientation)
│   │   │   └── index.ts
│   │   ├── dock-group/             # DockGroup chassis-strip wrapper
│   │   ├── expandable-container/   # ExpandableContainer
│   │   ├── form/                   # internal form helpers
│   │   ├── glass-carousel/         # GlassCarousel + useGlassCarousel
│   │   ├── glass-panel/            # GlassPanel substrate wrapper
│   │   ├── glyph-face/             # GlyphFace 3-layer wrapper (phase-tinted backplate + cap)
│   │   ├── hover-popover/          # HoverPopover with hoverOpenDelay prop (renamed from openDelay — K W1)
│   │   ├── icon-tooltip/           # IconTooltip
│   │   ├── infinite-scroll/        # InfiniteScroll + composable
│   │   ├── instrument-chassis/     # InstrumentChassis + RegionDivider
│   │   ├── labeled-field/          # LabeledField parent + 4 wrappers (LabeledInput/Select/Slider/Switch)
│   │   ├── metaballs/              # WebGL metaball substrate (Configurator-recursion P0 absorbed — K W7)
│   │   ├── metric-badge/           # MetricBadge primitive
│   │   ├── paper-backdrop/         # PaperBackdrop
│   │   ├── pulse/                  # Pulse (dots / ring) loading indicator
│   │   ├── scrolling-text/         # ScrollingText overflow-marquee (lifted from speedtest — v0.9.1)
│   │   ├── search/                 # Fuzzy search exports
│   │   ├── sidebar/                # ProgressiveSidebar + component-owned types only
│   │   ├── sortable-list/          # SortableList + list item helpers
│   │   ├── stacked-icons/          # StackedIcons
│   │   ├── status-dot/             # StatusDot
│   │   ├── tabs/                   # BouncyTabs, UnderlineTabs, BouncyToggle (active-state vocab canon — V.W3)
│   │   ├── timeline/               # GlassTimeline
│   │   ├── toggle-chip/            # segmented chip/cell toggle
│   │   ├── typewriter/             # TypewriterText
│   │   └── index.ts
│   └── index.ts                    # barrel: ui/ + custom/
├── composables/                    # 23 v0.9.0 public composables across 6 sub-trees + 8 top-level files
│   ├── glass/                      # useGlassRenderer + WebGL/WebGPU shader assets
│   ├── motion/                     # useScrollProgress, useSpringOrchestrator, useStaggerReveal,
│   │                               # useAnimatedNumber, useAnimatedNumberMap (v0.8.4 promotion),
│   │                               # useDarkModeSync, useRAFLoop, useIntersectionPause
│   ├── pagination/                 # useOffsetPagination
│   ├── sidebar/                    # useSidebarState, useSidebarFollow, useScrollTracker, useTreeIndex
│   ├── sortable/                   # useSortable
│   ├── virtual/                    # useVirtualSectionWindow, useWindowedStore + virtualSectionLayout
│   ├── useGlobalDark.ts            # createGlobalState(useDark) + Safari FOUC fix
│   ├── useInterval.ts              # shared interval cleanup
│   ├── useKeyboardShortcuts.ts     # singleton registry, Mod aliasing, category groups
│   ├── useResizeObserver.ts        # shared ResizeObserver substrate
│   ├── useStagger.ts               # one-shot staggered reveal-flag array (v0.8.4 promotion from speedtest)
│   ├── useStoryDemo.ts             # canonical play/reset/status harness with cleanup discipline (V.W4)
│   ├── useTimer.ts                 # shared timer cleanup substrate
│   ├── useTokenColor.ts            # CSS-custom-property → ComputedRef with theme-aware fallback (v0.8.4 — supersedes retired cssVar helper per K W3.A)
│   ├── useTouchGate.ts             # delayed touch-activation helper
│   └── index.ts                    # public barrel — 9 top-level export groups
├── styles/
│   ├── index.css                   # imports all below in cascade order
│   ├── tokens.css                  # §1–§10: duration, easing, z-index, radius, shadows, glass, paper, colors
│   ├── theme.css                   # @theme block: Tailwind color/font/radius aliases + dark variant
│   ├── typography.css              # golden-ratio scale (√φ), semantic classes, font utilities
│   ├── glass.css                   # .glass-{wash,quiet,resting,floating,overlay} 5-rung ladder + .glass-card / .glass-pill / .glass-btn
│   ├── dock.css                    # .dock-icon-btn, .dock-select-trigger, .dock-separator, .dock-layer-grid, density-rail
│   ├── dock-group.css              # DockGroup chassis-strip rules
│   ├── disco-glyph.css             # DiscoGlyph layered fills + facet gradient
│   ├── glyph-face.css              # GlyphFace cap + backplate cascade
│   ├── hover-popover.css           # popover-animation grammar (V.W3)
│   ├── instrument-chassis.css      # chassis bezel + groove dividers + region rules
│   ├── cards.css                   # .cartoon-card, .elevated-card, .paper-texture
│   ├── paper.css                   # paper-underpaint + paper-grain-overlay utilities
│   ├── floating-panel.css          # .floating-panel, .floating-panel-item
│   ├── transitions.css             # Vue <Transition>: fade, fade-slide, pop, dialog-scale, dropdown, tab-fade
│   ├── animations.css              # @keyframes: dialog-in/out, floating-panel-in, collapsible, tooltip, shimmer, sparkle-sweep
│   └── utilities.css               # focus-ring, btn-press, btn-audacious (K W6), rainbow-text, touch-gate, etc.
└── utils/
    └── cn.ts                       # clsx + hand-rolled deduplicator (v0.9.2 — replaces tailwind-merge)

```

## Conventions

- TypeScript `strict:true`, `verbatimModuleSyntax:true`
- `moduleResolution:bundler`, `target:ES2022`, `lib:ES2023`
- `import type` for all type-only imports
- Named exports only, no defaults
- All shadows use `hsl(var(--shadow-color) / alpha)` format
- Color palette as HSL channels: `--primary: 222.2 47.4% 11.2%`, consumed as `hsl(var(--primary))` in `@theme`

## Entry point

`src/index.ts`—re-exports public components (44 ui package barrels + 28 custom package barrels), 9 top-level composable export groups, and `cn()`. `src/components/custom/sidebar/` exports `ProgressiveSidebar` plus component-owned types only; sidebar state/follow/scroll/tree composables live under `src/composables/sidebar/`.

## Dependencies

All runtime deps are peer:

| Package | Role |
|---------|------|
| `vue` ^3.5 | Framework |
| `reka-ui` ^2.0 | Headless UI primitives |
| `@vueuse/core` ^14.0 | useDark, createGlobalState, useEventListener |
| `tailwindcss` ^4.0 | Utility CSS |
| `class-variance-authority` ^0.7 | Component variant definitions |
| `clsx` ^2.0 | Conditional class joining (replaces tailwind-merge as of v0.9.2; cn() ships its own deduplicator) |
| `embla-carousel-vue` ^8.0 | Carousel substrate |
| `lucide-vue-next` ^0.525 | Icon set |
| `vaul-vue` ^0.2 | Drawer primitives |
| `@mkbabb/keyframes.js` ^2.0 | Spring/keyframe runtime |

## Path aliases (tsconfig)

```
@/*  → src/
```

## Subpath surface

The library exports a vueuse-FREE root barrel plus per-package subpaths for vueuse-bearing components, large composites, and namespace-isolated composables. Active subpath exports per `package.json`:

```ts
import { Button, Card, Skeleton } from "@mkbabb/glass-ui";

import { GlassDock, DockLayer, DockLayerGroup } from "@mkbabb/glass-ui/dock";
import { DarkModeToggle } from "@mkbabb/glass-ui/controls";
import { Aurora, useAuroraStudio } from "@mkbabb/glass-ui/aurora";
import {
    Configurator,
    ConfiguratorLayer,
    ConfiguratorRow,
    useConfiguratorState,
} from "@mkbabb/glass-ui/configurator";
import { HoverPopover } from "@mkbabb/glass-ui/hover-popover";
import { Sidebar } from "@mkbabb/glass-ui/sidebar";
import { GlassCarousel } from "@mkbabb/glass-ui/glass-carousel";
// + tokens, search, confirm-dialog, infinite-scroll, tabs, typewriter, stacked-icons,
//   virtual, pagination, metric-badge, status-dot, pulse, paper-backdrop, toggle-chip,
//   glass-panel, metaballs, sortable-list, timeline, labeled-field, expandable-container,
//   icon-tooltip, instrument-chassis, glyph-face, dock-group, disco-glyph, scrolling-text,
//   freshness
```

CSS imports the unified bundle via `@mkbabb/glass-ui/styles`. The K WS additive subpath split (vueuse-bearing composables + Input/Textarea/Combobox*) ships under v0.9.3 — additive only; root-barrel removal defers to L / v1.0 per WS.W1 disposition.

## Design Axes

The library binds these axes at K close:

1. **Token-first** (J invariant) — every visual behaviour is a CSS custom property; no consumer edits library source for styling.
2. **Component over CSS class** (J invariant) — interactive elements bundle the four-state contract; static patterns are CSS classes.
3. **Visual-load-bearing-ness** (J invariant 10) — substrate-without-consumer is binary at every close; primitives ship only when ≥ 2 consumers (or are formally retired with rationale).
4. **No tranche-letter shadow execution** (K invariant 3) — work cohorts spanning ≥ 1 release ship under a `docs/tranches/<LETTER>/` plan folder. The V-tranche post-hoc write-up under `docs/tranches/V/` (K WV) closes the precept loop retroactively.
5. **Hardened agent git clause** (K W0 — `docs/precepts/instructions/tranche/AGENT_DISPATCH_TEMPLATE.md`) — agents NEVER stage / commit / stash / checkout / reset / restore. Read-only git only; orchestrator owns the index.

## Component architecture

All `ui/` components follow the shadcn-vue pattern:

1. **Simple wrappers** (Card, Input): native element + `cn()` styling
2. **Primitive wrappers** (Button, Toggle): reka-ui `Primitive` + CVA variants
3. **Compound wrappers** (Dialog, Select, Slider): reka-ui sub-components + `useForwardPropsEmits`

CVA variants are co-exported from each component's `index.ts` (e.g., `buttonVariants`, `toggleVariants`, `badgeVariants`, `sliderVariants`, `menuItemVariants`).

Button variants: `default`, `primary-audacious` (K W6), `destructive`, `outline`, `secondary`, `accent`, `ghost`, `glass`, `glass-wash`, `ai`, `link`. All enforce four states: standard, hover, active (`scale-[var(--scale-press-btn)]`), disabled (`opacity-disabled`, `pointer-events-none`).

`primary-audacious` composes the canonical `@utility btn-audacious` recipe from `src/styles/utilities.css` — disco-grain texture + sparkle-sweep glyph + specular-highlight backplate, bound to `--primary` (phase-color decoupled per K W6 Option B; dock primary tier retains phase-tinting as a dock-local extension via `--phase-color` cascade).

### Dock orientation and multi-layer

`GlassDock` takes an `orientation?: "horizontal" | "vertical"` prop (default `"horizontal"`). Horizontal docks animate `width` on expand/collapse and lay children out in a row; vertical docks animate `height` and stack children in a column. The prop is threaded through `useDockTransition` as its `axis` ref—both `useDockTransition` and `useLayerTransition` are axis-aware, keying their FLIP logic off a computed `dim` (`"width" | "height"`) rather than a hardcoded dimension. Vertical consumers just set the prop; no other consumer changes are required.

Beyond the built-in two-layer grid (the default slot + the `collapsed` slot), richer docks can compose `DockLayerGroup` with one or more `DockLayer` children:

```vue
<GlassDock orientation="vertical">
    <DockLayerGroup v-model:active="tab" orientation="vertical">
        <DockLayer id="assets" label="Assets" :icon="Package">...</DockLayer>
        <DockLayer id="layers" label="Layers" :icon="Layers">...</DockLayer>
        <DockLayer id="libs" label="Libraries" :icon="Library">...</DockLayer>
    </DockLayerGroup>
</GlassDock>
```

Each `DockLayer` registers itself with its parent via `provide`/`inject`; the group renders an optional Figma-style switcher rail from the registered descriptors (`showRail` + `railPosition`) and drives crossfade + size FLIP transitions between layers. Only the active layer is interactive—inactive layers receive `inert` and `pointer-events: none`.

### Slider keep-dock-open contract

`<Slider>` exposes `keepDockOpen?: boolean` (default `true`). When a Slider is a descendant of a `<GlassDock>`, pointer-drag acquires a `dockKeepOpen` token for the duration of the gesture (preventing idle-collapse) AND the Slider subscribes to the dock's `dockHeld` computed and reflects it via `data-held` on its root for thumb-halo intensification. The contract is bidirectional and pointer-anchored — the Slider is the only consumer (Option B per K W7); keyboard- and discrete-button interactions on `<NumberField>` are not eligible because they have no continuous-interaction window. The cross-substrate proof story lives at `demo/stories/compositions/dock-with-slider.vue`.

## Demo storybook chassis (demo-private)

`demo/stories/` ships canonical chassis primitives that are NOT exported from the library. Stories migrate to these instead of raw recipe triplets:

- `<StorySection>` (V.W4 deff97a) — label + body sectioning chassis.
- `<ShowcaseFrame>` (V.W4 8136baf) — pad knob over the rounded-card showcase chassis. Replaces the `rounded-card border bg-card shadow-cartoon` triplet across ~25-30 demo sites.
- `<DockShowcaseFrame>` (V.W4 60fd745) — chassis-aware showcase for 13 dock sites.
- `<TokenLadder>` + `<ToneSwatch>` (V.W4 cfbcb48) — token-tour primitives.
- `useStoryDemo` (V.W4 227e1b0) — canonical play/reset/status harness with cleanup discipline.

## Consumer wiring

Projects import styles via CSS, components and composables via JS:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "@mkbabb/glass-ui/styles";
@variant dark (&:where(.dark, .dark *));

/* then override tokens locally */
:root {
    --glass-opacity-resting: 0.82;
    --glass-blur-resting: blur(12px);
}
```

```ts
import { Button } from "@mkbabb/glass-ui";
import { GlassDock } from "@mkbabb/glass-ui/dock";
import { Configurator, useConfiguratorState } from "@mkbabb/glass-ui/configurator";
```

To avoid rewriting every import in a consumer project, replace each local `ui/<component>/index.ts` barrel with a re-export:

```ts
// demo/@/components/ui/button/index.ts
export { Button, buttonVariants, type ButtonVariants } from "@mkbabb/glass-ui";
```
