# glass-ui

Shared glassmorphic design system: Vue 3.5 components, CSS design tokens, composables. Built on reka-ui + Tailwind CSS v4.

## Build

```
npm run build        # library → dist/glass-ui.js + glass-ui.css + index.d.ts
npm run typecheck    # vue-tsc --noEmit
```

## Structure

```
src/
├── index.ts                        # barrel: components + composables + utils
├── components/
│   ├── ui/                         # 39 shadcn-vue base component packages (reka-ui)
│   │   ├── accordion/              # Accordion + trigger/content wrappers
│   │   ├── alert/                  # Alert, title, description
│   │   ├── avatar/                 # Avatar, AvatarImage, AvatarFallback
│   │   ├── badge/                  # Badge + badgeVariants CVA
│   │   ├── button/                 # Primitive + buttonVariants CVA
│   │   ├── card/                   # Card, header/title/description/content/footer
│   │   ├── carousel/               # Carousel primitives
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
│   │   ├── multi-select/           # Multi-select control
│   │   ├── notification/           # Notification surface
│   │   ├── number-field/           # NumberField + subcomponents
│   │   ├── popover/                # Popover trigger/content
│   │   ├── progress/               # Progress bar
│   │   ├── radio-group/            # RadioGroup, RadioGroupItem
│   │   ├── select/                 # Select public compound wrappers
│   │   ├── separator/              # Separator (h/v)
│   │   ├── sheet/                  # Sheet side drawer + subcomponents
│   │   ├── skeleton/               # Loading skeleton
│   │   ├── slider/                 # reka-ui SliderRoot wrapper
│   │   ├── switch/                 # Switch
│   │   ├── table/                  # Table primitives
│   │   ├── tabs/                   # Tabs, list, trigger, content
│   │   ├── tags-input/             # TagsInput + subcomponents
│   │   ├── textarea/               # Textarea
│   │   ├── toast/                  # Toast exports
│   │   ├── toggle/                 # Toggle + toggleVariants CVA
│   │   ├── toggle-group/           # ToggleGroup, ToggleGroupItem
│   │   ├── tooltip/                # Tooltip provider/trigger/content
│   │   └── index.ts                # barrel: all ui/ exports
│   ├── custom/                     # 26 custom package dirs; 24 public package barrels
│   │   ├── animation/              # internal animation helpers
│   │   ├── dock/
│   │   │   ├── GlassDock.vue       # collapsible glass pill, dual-layer grid, horizontal | vertical
│   │   │   ├── DockPopover.vue     # portaled popover for dock items
│   │   │   ├── DockLayerGroup.vue  # multi-layer container + optional switcher rail
│   │   │   ├── DockLayer.vue       # named pane inside a DockLayerGroup
│   │   │   └── index.ts
│   │   ├── aurora/
│   │   │   ├── Aurora.vue          # WebGL aurora background
│   │   │   ├── composables/        # useAurora, color utilities
│   │   │   └── index.ts
│   │   ├── controls/
│   │   │   ├── DarkModeToggle.vue  # animated sun/moon SVG (useGlobalDark)
│   │   │   └── index.ts
│   │   ├── form/                   # internal form helpers
│   │   ├── glass-carousel/         # GlassCarousel + useGlassCarousel
│   │   ├── glass-panel/            # GlassPanel substrate wrapper
│   │   ├── infinite-scroll/        # InfiniteScroll + current public composable implementation
│   │   ├── metaballs/              # WebGL metaball substrate
│   │   ├── search/                 # Fuzzy search exports
│   │   ├── sidebar/                # ProgressiveSidebar + component-owned types only
│   │   ├── sortable-list/          # SortableList + list item helpers
│   │   ├── toggle-chip/            # segmented chip/cell toggle
│   │   └── index.ts
│   └── index.ts                    # barrel: ui/ + custom/
├── composables/
│   ├── glass/                      # useGlassRenderer + shader assets
│   ├── motion/                     # useScrollProgress, useSpringOrchestrator, useStaggerReveal
│   ├── pagination/                 # useOffsetPagination
│   ├── sidebar/                    # useSidebarState, useSidebarFollow, useScrollTracker, useTreeIndex
│   ├── sortable/                   # useSortable
│   ├── virtual/                    # virtual section/windowed-store helpers
│   ├── useGlobalDark.ts            # createGlobalState(useDark) + Safari FOUC fix
│   ├── useKeyboardShortcuts.ts     # singleton registry, Mod aliasing, category groups
│   └── index.ts                    # 9 top-level public export groups
├── styles/
│   ├── index.css                   # imports all below in cascade order
│   ├── tokens.css                  # §1–§10: duration, easing, z-index, radius, shadows, glass, paper, colors
│   ├── theme.css                   # @theme block: Tailwind color/font/radius aliases + dark variant
│   ├── typography.css              # golden-ratio scale (√φ), semantic classes, font utilities
│   ├── glass.css                   # .glass-{subtle,default,medium,elevated}, .glass-card, .glass-pill, .glass-btn
│   ├── dock.css                    # .dock-icon-btn, .dock-select-trigger, .dock-separator, .dock-layer-grid
│   ├── cards.css                   # .cartoon-card, .elevated-card, .paper-texture
│   ├── floating-panel.css          # .floating-panel, .floating-panel-item
│   ├── transitions.css             # Vue <Transition>: fade, fade-slide, pop, dialog-scale, dropdown, tab-fade
│   ├── animations.css              # @keyframes: dialog-in/out, floating-panel-in, collapsible, tooltip, shimmer
│   └── utilities.css               # scrollbar-hidden, focus-ring, btn-press, rainbow-text, touch-gate, etc.
└── utils/
    └── cn.ts                       # clsx + tailwind-merge

```

## Conventions

- TypeScript `strict:true`, `verbatimModuleSyntax:true`
- `moduleResolution:bundler`, `target:ES2022`, `lib:ES2023`
- `import type` for all type-only imports
- Named exports only, no defaults
- All shadows use `hsl(var(--shadow-color) / alpha)` format
- Color palette as HSL channels: `--primary: 222.2 47.4% 11.2%`, consumed as `hsl(var(--primary))` in `@theme`

## Entry point

`src/index.ts`—re-exports all public components (39 ui package barrels + 24 custom package barrels), 9 top-level composable export groups, and `cn()` utility. `src/components/custom/sidebar/` now exports `ProgressiveSidebar` plus component-owned types only; sidebar state/follow/scroll/tree composables live under `src/composables/sidebar/`.

## Dependencies

All runtime deps are peer:

| Package | Role |
|---------|------|
| `vue` ^3.5 | Framework |
| `reka-ui` ^2.0 | Headless UI primitives |
| `@vueuse/core` ^14.0 | useDark, createGlobalState, useEventListener |
| `tailwindcss` ^4.0 | Utility CSS |
| `class-variance-authority` ^0.7 | Component variant definitions |
| `clsx` ^2.0 | Conditional class joining |
| `tailwind-merge` ^3.0 | Class conflict resolution |

Dev-only: `vaul-vue` (drawer), `lucide-vue-next` (icons).

## Path aliases (tsconfig)

```
@/*  → src/
```

## Component architecture

All `ui/` components follow the shadcn-vue pattern:

1. **Simple wrappers** (Card, Input): native element + `cn()` styling
2. **Primitive wrappers** (Button, Toggle): reka-ui `Primitive` + CVA variants
3. **Compound wrappers** (Dialog, Select, Slider): reka-ui sub-components + `useForwardPropsEmits`

CVA variants are co-exported from each component's `index.ts` (e.g., `buttonVariants`, `toggleVariants`, `badgeVariants`).

Button variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`, `glass`, `glass-subtle`. All enforce four states: standard, hover, active (`scale-[0.97]`), disabled (`opacity-50`, `pointer-events-none`).

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

## Consumer wiring

Projects import styles via CSS, components and composables via JS:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "@mkbabb/glass-ui/styles";
@variant dark (&:where(.dark, .dark *));

/* then override tokens locally */
:root {
    --glass-opacity-subtle: 0.82;
    --glass-blur-default: blur(12px);
}
```

```ts
import { Button, GlassDock, useDockState } from "@mkbabb/glass-ui";
```

To avoid rewriting every import in a consumer project, replace each local `ui/<component>/index.ts` barrel with a re-export:

```ts
// demo/@/components/ui/button/index.ts
export { Button, buttonVariants, type ButtonVariants } from "@mkbabb/glass-ui";
```
