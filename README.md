# glass-ui

Glassmorphic design system for Vue 3.5. Shared components, design tokens, and composables built on reka-ui and Tailwind CSS v4, with a golden-ratio typography scale.

## Features

- 32 shadcn-vue components (Button, Card, Dialog, Select, Tabs, Popover, Slider, etc.)
- Four-tier glassmorphism: `.glass-subtle`, `.glass-default`, `.glass-medium`, `.glass-elevated`
- Convenience shorthands: `.glass-card`, `.glass-pill`, `.glass-btn`, `.floating-panel`
- GlassDock: collapsible glass action bar with dual-layer grid and ref-counted state
- Golden-ratio typography scale (√φ ≈ 1.272, 11 stops from micro to display-3)
- Design tokens: duration, easing, z-index, radius (primitive + semantic), shadows, glass tiers, paper textures
- Vue `<Transition>` class sets, shared `@keyframes`, SVG noise textures
- Composables: dock state, hover popover, touch gate, keyboard shortcuts, clipboard, dark mode

## Install

```bash
npm install @mkbabb/glass-ui
```

## Usage

```ts
import { Button, Card, Dialog, GlassDock, DarkModeToggle } from "@mkbabb/glass-ui";
import { useDockState, useKeyboardShortcuts, copyToClipboard } from "@mkbabb/glass-ui";
```

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "@mkbabb/glass-ui/styles";
@variant dark (&:where(.dark, .dark *));

/* override tokens locally for your project */
:root {
    --glass-opacity-subtle: 0.82;
    --glass-blur-default: blur(12px);
}
```

## Build

```bash
npm run dev          # storybook demo (multi-page, dock + carousel navigation)
npm run build        # library → dist/glass-ui.js + glass-ui.css + index.d.ts
npm run typecheck    # vue-tsc --noEmit
```

## Storybook

`npm run dev` launches a Vue 3 storybook under `demo/` covering every primitive, container, navigation element, data component, feedback pattern, motion demo, and composition. Vertical `GlassDock` rail for category navigation; horizontal `Carousel` pager for stories within a category. Keyboard: `[`/`]` prev/next story, `{`/`}` prev/next category, `,` configurator, `?` keyboard help. A dismissible right-side `Sheet` lets you live-edit font/scale/hue/grain/radius/density/cartoon-shadow/dark tokens against `:root`. See `DESIGN.md#storybook-demo` for the full category index.

## Structure

```
src/
├── index.ts                    # barrel: components + composables + utils
├── components/
│   ├── ui/                     # 32 shadcn-vue components (reka-ui primitives)
│   │   ├── button/             # Primitive + CVA (8 variants, 5 sizes)
│   │   ├── card/               # Card, CardHeader, CardTitle, CardContent, etc.
│   │   ├── dialog/             # Dialog, DialogContent, DialogHeader, etc.
│   │   ├── select/             # Select, SelectTrigger, SelectContent, etc.
│   │   ├── tabs/               # Tabs, TabsList, TabsTrigger, TabsContent
│   │   ├── popover/            # Popover, PopoverTrigger, PopoverContent
│   │   ├── dropdown-menu/      # DropdownMenu + 14 subcomponents
│   │   ├── tooltip/            # Tooltip, TooltipTrigger, TooltipContent
│   │   ├── slider/             # reka-ui Slider with glass track
│   │   ├── input/              # Glass-styled input
│   │   └── ...                 # + 22 more (toggle, switch, checkbox, badge, etc.)
│   └── custom/
│       ├── dock/               # GlassDock, DockPopover, DockLayerGroup, rail variant
│       ├── aurora/             # Aurora WebGL background
│       └── controls/           # DarkModeToggle
├── composables/
│   ├── dock/                   # useDockState, useLayerTransition, teleported-target helpers
│   ├── interaction/            # useHeightTransition, useHoverPopover, useHoverToggle, useTouchGate, useLeaveTimer
│   ├── useClipboard.ts         # copyToClipboard (navigator.clipboard + textarea fallback)
│   ├── useGlobalDark.ts        # createGlobalState(useDark) + Safari FOUC fix
│   ├── useKeyboardShortcuts.ts # singleton registry, Mod key aliasing, grouped display
│   ├── useWatercolorBlob.ts    # seeded PRNG blob animation (Mulberry32)
│   └── prng.ts                 # mulberry32, hashString, seededRandom
├── styles/
│   ├── index.css               # imports all below in order
│   ├── tokens.css              # design tokens (duration, easing, z-index, radius, shadows, glass, paper)
│   ├── theme.css               # @theme block (Tailwind color/font/radius aliases)
│   ├── typography.css          # golden-ratio type scale + semantic classes
│   ├── glass.css               # .glass-{subtle,default,medium,elevated}, .glass-card, .glass-pill, .glass-btn
│   ├── dock.css                # separators and layer-grid helpers; button styling lives in dock components
│   ├── cards.css               # .cartoon-card, .elevated-card, .paper-texture
│   ├── floating-panel.css      # .floating-panel, .floating-panel-item
│   ├── transitions.css         # Vue <Transition> classes: fade, fade-slide, pop, dialog-scale, dropdown
│   ├── animations.css          # @keyframes: dialog-in/out, floating-panel-in, collapsible, tooltip, shimmer
│   └── utilities.css           # scrollbar-hidden, focus-ring, btn-press, rainbow-text, touch-gate, etc.
└── utils/
    └── cn.ts                   # clsx + tailwind-merge
```

## Glass Token System

Four tiers with 1:1 alignment across opacity, blur, background, border, and shadow:

| Tier | Opacity | Blur | Use |
|------|---------|------|-----|
| `subtle` | 0.30 | 4px | Dock backgrounds, input fills, hover overlays |
| `default` | 0.50 | 8px | Cards, content containers, select triggers |
| `medium` | 0.65 | 12px | Popovers, dropdowns, floating panels |
| `elevated` | 0.80 | 16px | Dialogs, command palette, modal overlays |

Each tier defines `--glass-{opacity,blur,bg,border,shadow}-{tier}`. Consumers override the primitives (`--glass-opacity-subtle`, `--glass-blur-default`, etc.) in their own `:root` to tune intensity.

Convenience classes bundle a tier with a shape:
- `.glass-card` = default tier + `var(--radius-card)`
- `.glass-pill` = default tier + `var(--radius-pill)`

## Design Tokens

`tokens.css` defines the shared `:root` properties consumed by all style modules and components:

| Category | Tokens | Notes |
|----------|--------|-------|
| Duration | `--duration-fast` through `--duration-linger` | 6 stops, 0.1s–2.5s |
| Easing | `--ease-spring`, `--ease-dock`, `--ease-standard`, etc. | 12 curves (core + apple + extended) |
| Z-index | `--z-background` through `--z-debug` | 14-level scale, 0–99999 |
| Radius | `--radius` base + `sm`/`md`/`lg`/`xl`/`2xl`/`pill` | Primitive scale from 0.5rem base |
| Radius (semantic) | `--radius-card`, `--radius-panel`, `--radius-dialog`, `--radius-input`, `--radius-button`, `--radius-badge`, `--radius-dock` | Aliases into the primitive scale |
| Shadows | `--shadow-xs` through `--shadow-2xl` | Elevation scale, hsl-based |
| Shadows (cartoon) | `--shadow-cartoon-sm`/`md`/`lg`, `--shadow-card` | Offset hard shadows |
| Glass | `--glass-{opacity,blur,bg,border,shadow}-{subtle,default,medium,elevated}` | 4 tiers, all aligned |
| Paper | `--paper-clean-texture`, `--paper-aged-texture` | SVG feTurbulence noise |
| Colors | Full shadcn HSL-channel palette | Override locally per project |

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
- Button four-state guarantee: standard, hover, active (`scale-[0.97]`), disabled (`opacity-50`)

## Dependencies

All runtime deps are peer:

| Package | Role |
|---------|------|
| `vue` ^3.5 | Framework |
| `reka-ui` ^2.0 | Headless UI primitives |
| `@vueuse/core` ^14.0 | Composable utilities (useDark, createGlobalState, useEventListener) |
| `tailwindcss` ^4.0 | Utility CSS framework |
| `class-variance-authority` ^0.7 | Component variant definitions |
| `clsx` ^2.0 | Conditional class joining |
| `tailwind-merge` ^3.0 | Tailwind class conflict resolution |
