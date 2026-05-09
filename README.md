# glass-ui

Glassmorphic design system for Vue 3.5. Shared components, design tokens, and composables built on reka-ui and Tailwind CSS v4, with a golden-ratio typography scale.

## Features

- 44 shadcn-vue / reka-ui base components plus 28 custom composites (Button — incl. `primary-audacious` — Card, Dialog, Select, Tabs, Popover, Slider, NumberField, Section, ScrollPane, CartoonCard, MetricBadge, MetricPill, etc.)
- Five-tier glassmorphism: `.glass-wash`, `.glass-quiet`, `.glass-resting`, `.glass-floating`, `.glass-overlay` (the v0.8.0 ladder; replaces the prior subtle/default/medium/elevated naming)
- Convenience shorthands: `.glass-card`, `.glass-pill`, `.glass-btn`, `.floating-panel`, `.glass-cartoon`, `@utility btn-audacious`
- `GlassDock`: collapsible glass action bar with horizontal + vertical orientations, `containerName` prop, layered `DockLayerGroup`/`DockLayer` panes, density rail, ref-counted keep-open state
- Golden-ratio typography scale (√φ ≈ 1.272, 11+ stops from micro to display-5)
- Design tokens: duration, easing, z-index (incl. `--z-behind`), radius (primitive + semantic), shadows, glass tiers, paper textures, surface-tint 9-rung family with `quiet | floating | modal` aliases
- Vue `<Transition>` class sets, shared `@keyframes` (`sparkle-sweep`, `dock-in`, `dialog-in`, etc.), SVG noise textures
- 23 public composables: motion (spring, RAF, animated-number, animated-number-map, stagger reveal, intersection pause, dark-mode sync, scroll progress), glass renderer, sortable, sidebar tree/follow/scroll, virtual-list substrate, pagination, infinite scroll, timer/interval/resize, token color, story demo harness, keyboard shortcuts, touch gate, global dark
- Bundle-budget gate (`npm run profile:budget`) re-landed K W4 Lane B; CI workflow at `.github/workflows/lint.yml`

## Install

```bash
npm install @mkbabb/glass-ui
```

## Usage

```ts
import { Button, Card, Dialog, useKeyboardShortcuts } from "@mkbabb/glass-ui";
import { GlassDock, DockLayerGroup, DockLayer } from "@mkbabb/glass-ui/dock";
import { DarkModeToggle } from "@mkbabb/glass-ui/controls";
import { Configurator, useConfiguratorState } from "@mkbabb/glass-ui/configurator";
import { HoverPopover } from "@mkbabb/glass-ui/hover-popover";
```

```vue
<HoverPopover :hover-open-delay="120" content="Quicker reveal for chassis dock labels">
    <DockIconButton :icon="Settings" />
</HoverPopover>

<Button variant="primary-audacious" size="lg">Run audit</Button>
```

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "@mkbabb/glass-ui/styles";
@variant dark (&:where(.dark, .dark *));

/* override tokens locally for your project */
:root {
    --glass-opacity-resting: 0.82;
    --glass-blur-resting: blur(12px);
}
```

## Build

```bash
npm run dev             # storybook demo (multi-page, dock + carousel navigation)
npm run build           # library → dist/glass-ui.js + glass-ui.css + index.d.ts
npm run typecheck       # vue-tsc --noEmit
npm run profile:budget  # bundle-budget gate (--enforce in CI)
```

## Storybook

`npm run dev` launches a Vue 3 storybook under `demo/` covering every primitive, container, navigation element, data component, feedback pattern, motion demo, composable, and composition. Vertical `GlassDock` rail for category navigation; horizontal `Carousel` pager for stories within a category. Keyboard: `[`/`]` prev/next story, `{`/`}` prev/next category, `,` configurator, `?` keyboard help. A dismissible right-side `Sheet` lets you live-edit font/scale/hue/grain/radius/density/cartoon-shadow/dark tokens against `:root`. See `DESIGN.md#storybook-demo` for the full category index.

## Structure

```
src/
├── index.ts                    # core primitives, core composables, utilities (vueuse-FREE root barrel)
├── components/
│   ├── ui/                     # 44 shadcn-vue components (reka-ui primitives) + _shared
│   │   ├── _shared/            # ModalOverlay (V.W3), menuItemVariants CVA (V.W3)
│   │   ├── button/             # Primitive + CVA (11 variants incl. primary-audacious; 5 sizes)
│   │   ├── card/               # Card + CartoonCard + ScrollPane sibling primitives
│   │   ├── section/            # Section sectioning landmark
│   │   ├── slider/             # reka-ui Slider with glass track + keepDockOpen contract
│   │   ├── skeleton/           # Compositor-friendly transform-only shimmer
│   │   ├── notification/       # Consumes success/warning/info-foreground tokens
│   │   ├── metric-pill/        # Stacked-pill primitive composing MetricBadge
│   │   └── ...                 # accordion, alert, avatar, badge, carousel, checkbox, collapsible,
│   │                           # combobox, command, context-menu, data-table, dialog, drawer,
│   │                           # dropdown-menu, hover-card, input, label, multi-select,
│   │                           # number-field, popover, progress, radio-group, select,
│   │                           # separator, sheet, switch, table, tabs, tags-input, textarea,
│   │                           # toast, toggle, toggle-group, tooltip
│   └── custom/                 # 28 custom composites
│       ├── aurora/             # Aurora WebGL background + useAurora composable
│       ├── configurator/       # Configurator + Layer + Row + useConfiguratorState
│       ├── dock/               # GlassDock, DockLayer, DockLayerGroup, DockIconButton,
│       │                       # DockTabButton, DockSelectTrigger, DockDropdownTrigger
│       ├── dock-group/         # DockGroup chassis-strip wrapper
│       ├── hover-popover/      # HoverPopover (hoverOpenDelay prop — K W1 rename)
│       ├── instrument-chassis/ # InstrumentChassis + RegionDivider
│       ├── glyph-face/         # GlyphFace 3-layer wrapper
│       ├── disco-glyph/        # DiscoGlyph 3-layer SVG glyph primitive
│       ├── labeled-field/      # LabeledField parent + 4 wrappers
│       ├── metaballs/          # Metaballs WebGL substrate
│       ├── metric-badge/       # MetricBadge primitive
│       ├── pulse/              # Dots / ring loading indicator
│       ├── scrolling-text/     # Overflow-marquee primitive (lifted from speedtest — v0.9.1)
│       ├── tabs/               # BouncyTabs, UnderlineTabs, BouncyToggle
│       ├── timeline/           # GlassTimeline
│       ├── typewriter/         # TypewriterText
│       └── ...                 # confirm-dialog, controls, expandable-container, glass-carousel,
│                               # glass-panel, icon-tooltip, infinite-scroll, paper-backdrop,
│                               # search, sidebar, sortable-list, stacked-icons, status-dot,
│                               # toggle-chip
├── composables/                # 23 public composables across 6 sub-trees + 8 top-level files
│   ├── glass/                  # useGlassRenderer, createGlassFilter, destroyGlassFilter (WebGL/WebGPU)
│   ├── motion/                 # useSpringOrchestrator, useStaggerReveal, useScrollProgress,
│   │                           # useAnimatedNumber, useAnimatedNumberMap, useDarkModeSync,
│   │                           # useRAFLoop, useIntersectionPause
│   ├── pagination/             # useOffsetPagination
│   ├── sidebar/                # useSidebarState, useSidebarFollow, useScrollTracker, useTreeIndex
│   ├── sortable/               # useSortable
│   ├── virtual/                # useVirtualSectionWindow, useWindowedStore + virtualSectionLayout
│   ├── useGlobalDark.ts        # createGlobalState(useDark) + Safari FOUC fix
│   ├── useInterval.ts          # shared interval cleanup
│   ├── useKeyboardShortcuts.ts # singleton registry, Mod aliasing, grouped display
│   ├── useResizeObserver.ts    # shared ResizeObserver substrate
│   ├── useStagger.ts           # one-shot staggered reveal-flag array
│   ├── useStoryDemo.ts         # canonical play/reset/status harness with cleanup discipline
│   ├── useTimer.ts             # shared timer cleanup substrate
│   ├── useTokenColor.ts        # CSS-custom-property → ComputedRef with theme-aware fallback
│   └── useTouchGate.ts         # delayed touch-activation helper
├── styles/
│   ├── index.css               # imports all below in order
│   ├── tokens.css              # design tokens (duration, easing, z-index, radius, shadows, glass, paper, surface-tint)
│   ├── theme.css               # @theme block (Tailwind color/font/radius aliases)
│   ├── typography.css          # golden-ratio type scale + semantic classes
│   ├── glass.css               # 5-rung glass ladder + .glass-card / .glass-pill / .glass-btn / .glass-cartoon
│   ├── dock.css                # density rail + dock-layer-grid + separators (button styling lives in dock components)
│   ├── dock-group.css          # DockGroup chassis-strip rules
│   ├── disco-glyph.css         # DiscoGlyph layered fills + facet gradient
│   ├── glyph-face.css          # GlyphFace cap + backplate cascade
│   ├── hover-popover.css       # popover-animation grammar
│   ├── instrument-chassis.css  # bezel + groove dividers + region rules
│   ├── cards.css               # .cartoon-card, .elevated-card
│   ├── paper.css               # paper-underpaint + paper-grain-overlay utilities
│   ├── floating-panel.css      # .floating-panel, .floating-panel-item
│   ├── transitions.css         # Vue <Transition> classes: fade, fade-slide, pop, dialog-scale, dropdown
│   ├── animations.css          # @keyframes: dialog-in/out, floating-panel-in, collapsible, tooltip, shimmer, sparkle-sweep
│   └── utilities.css           # focus-ring, btn-press, btn-audacious, rainbow-text, touch-gate, etc.
└── utils/
    └── cn.ts                   # clsx + hand-rolled deduplicator (v0.9.2 — replaces tailwind-merge)
```

## Subpath imports

Beyond the root barrel, the library exposes per-package subpaths for vueuse-bearing components, large composites, and namespace-isolated composables:

```ts
import { GlassDock, DockLayerGroup, DockLayer } from "@mkbabb/glass-ui/dock";
import { DarkModeToggle } from "@mkbabb/glass-ui/controls";
import { Aurora, useAurora } from "@mkbabb/glass-ui/aurora";
import { Configurator, useConfiguratorState } from "@mkbabb/glass-ui/configurator";
import { HoverPopover } from "@mkbabb/glass-ui/hover-popover";
import { InstrumentChassis, RegionDivider } from "@mkbabb/glass-ui/instrument-chassis";
import { Sidebar } from "@mkbabb/glass-ui/sidebar";
import { GlassCarousel } from "@mkbabb/glass-ui/glass-carousel";
import { ScrollingText } from "@mkbabb/glass-ui/scrolling-text";
```

See `package.json` `exports` for the full subpath map (29 active subpaths plus `/styles` and `/tokens`).

## Glass Token System

Five tiers with 1:1 alignment across opacity, blur, background, border, and shadow:

| Tier | Class | Light opacity | Dark opacity | Blur | Use |
|------|-------|---------------|--------------|------|-----|
| Wash | `.glass-wash` | 30% | 38% | `blur(1px) saturate(1.05)` | Dock backgrounds, input fills, hover overlays |
| Quiet | `.glass-quiet` | 50% | 58% | `blur(3px)` | Inline workspace chrome |
| Resting | `.glass-resting` | 65% | 72% | `blur(12px) saturate(1.05)` | Cards, content containers |
| Floating | `.glass-floating` | 80% | 88% | `blur(16px) saturate(1.4)` | Popovers, tooltips, dropdowns |
| Overlay | `.glass-overlay` | 95% | 96% | `blur(24px) saturate(1.5)` | Dialogs, command palette, modals |

Each tier defines `--glass-{opacity,blur,bg,border,shadow}-{tier}`. Consumers override the primitives at `:root` to tune intensity. Convenience classes bundle a tier with a shape:
- `.glass-card` = resting tier + `var(--radius-card)` + offset card shadow
- `.glass-pill` = resting tier + pill radius + press feedback
- `.glass-cartoon` = cartoon-tier shadow + 2px border + hover-lift (carried by `<CartoonCard>`)

## Design Tokens

`tokens.css` defines the shared `:root` properties consumed by all style modules and components:

| Category | Tokens | Notes |
|----------|--------|-------|
| Duration | `--duration-instant` through `--duration-linger` | 8 stops, 0.1s–2.5s; `--duration-shimmer{,-fast,-slow}` for shimmer cadence |
| Easing | `--spring-{smooth,snappy,bouncy,gentle}`, `--ease-standard`, `--ease-apple-spring` etc. | Spring linear() + cubic-bezier fallbacks |
| Z-index | `--z-behind` (-10) through `--z-debug` (99999) | 14-level scale plus background tier |
| Radius | `--radius` base + `sm`/`md`/`lg`/`xl`/`2xl`/`pill` | Primitive scale from 0.5rem base |
| Radius (semantic) | `--radius-{card,panel,dialog,input,button,badge,dock,tooltip}` | Aliases into the primitive scale |
| Shadows | `--shadow-xs` through `--shadow-2xl` + cartoon + dock + glass-tier | Elevation scale, hsl-based |
| Glass | `--glass-{opacity,blur,bg,border,shadow}-{wash,quiet,resting,floating,overlay}` | 5 tiers, all aligned |
| Surface tint | `--surface-tint-{4,6,8,10,12,15,18,22,25}` + `{quiet,floating,modal}` aliases | 9-rung family with tier aliases |
| Paper | `paper-underpaint` + `paper-grain-overlay` utilities | SVG feTurbulence noise |
| Colors | Full shadcn HSL-channel palette + viz-basis + section-N + status (success/warning/info) tinted families | Override locally per project |

## Typography

Type scale based on √φ ≈ 1.272 (modulated golden ratio). Each step is φ^(n/2) of the base.

| Token | Size | ~px | Class |
|-------|------|-----|-------|
| `--type-micro` | 0.6875rem | 11 | `.text-micro` |
| `--type-caption` | 0.75rem | 12 | `.text-caption` |
| `--type-small` | 0.875rem | 14 | `.text-small` |
| `--type-body` | 1rem | 16 | `.text-body` |
| `--type-prose` | 1.125rem | 18 | `.text-prose` |
| `--type-subheading` | 1.272rem | 20 | `.text-subheading` |
| `--type-heading` | 1.618rem | 26 | `.text-heading` |
| `--type-title` | 2.058rem | 33 | `.text-title` |
| `--type-display-1` | 2.618rem | 42 | `.text-display` |
| `--type-display-2` | 3.33rem | 53 | `.text-display-2` |
| `--type-display-3` | 4.236rem | 68 | `.text-display-3` |

The `@theme` block in `theme.css` maps these to Tailwind's `--font-size-*` tokens, so `text-sm`, `text-lg`, etc. adopt the golden-ratio scale.

## Conventions

- TypeScript `strict:true`, `verbatimModuleSyntax:true`
- `moduleResolution:bundler`, `target:ES2022`, `lib:ES2023`
- `import type` for all type-only imports
- Named exports only, no defaults
- shadcn-vue component pattern: reka-ui `Primitive` / `useForwardPropsEmits`, CVA for variants, `cn()` for class composition
- All shadows normalized to `hsl(var(--shadow-color) / alpha)` format
- Color palette as HSL channels in `:root` (e.g., `--primary: 222.2 47.4% 11.2%`), consumed as `hsl(var(--primary))` in `@theme`
- Button four-state guarantee: standard, hover, active (`scale-[var(--scale-press-btn)]`), disabled (`opacity-disabled`)

## Dependencies

All runtime deps are peer:

| Package | Role |
|---------|------|
| `vue` ^3.5 | Framework |
| `reka-ui` ^2.0 | Headless UI primitives |
| `@vueuse/core` ^14.0 | Composable utilities (useDark, createGlobalState, useEventListener) |
| `tailwindcss` ^4.0 | Utility CSS framework |
| `class-variance-authority` ^0.7 | Component variant definitions |
| `clsx` ^2.0 | Conditional class joining (cn() ships its own deduplicator as of v0.9.2; replaces tailwind-merge) |
| `embla-carousel-vue` ^8.0 | Carousel substrate |
| `lucide-vue-next` ^0.525 | Icon set |
| `vaul-vue` ^0.2 | Drawer primitives |
| `@mkbabb/keyframes.js` ^2.0 | Spring/keyframe runtime |
