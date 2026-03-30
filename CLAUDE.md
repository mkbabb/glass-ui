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
│   ├── ui/                         # 32 shadcn-vue base components (reka-ui)
│   │   ├── button/                 # Primitive + buttonVariants CVA
│   │   │   ├── Button.vue
│   │   │   └── index.ts            # exports Button, buttonVariants, ButtonVariants
│   │   ├── card/                   # Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
│   │   ├── dialog/                 # Dialog + 10 subcomponents (Content, Header, Title, etc.)
│   │   ├── input/                  # Glass-styled input (bg-card/50 backdrop-blur-sm)
│   │   ├── select/                 # Select + 10 subcomponents
│   │   ├── tabs/                   # Tabs, TabsList, TabsTrigger, TabsContent
│   │   ├── popover/                # Popover, PopoverTrigger, PopoverContent
│   │   ├── dropdown-menu/          # DropdownMenu + 14 subcomponents
│   │   ├── context-menu/           # ContextMenu + subcomponents
│   │   ├── tooltip/                # Tooltip, TooltipTrigger, TooltipContent, TooltipProvider
│   │   ├── toggle/                 # Toggle + toggleVariants CVA
│   │   ├── toggle-group/           # ToggleGroup, ToggleGroupItem
│   │   ├── slider/                 # reka-ui SliderRoot wrapper
│   │   ├── switch/                 # Switch
│   │   ├── checkbox/               # Checkbox
│   │   ├── radio-group/            # RadioGroup, RadioGroupItem
│   │   ├── label/                  # Label
│   │   ├── badge/                  # Badge + badgeVariants CVA
│   │   ├── separator/              # Separator (h/v)
│   │   ├── scroll-area/            # ScrollArea, ScrollBar
│   │   ├── collapsible/            # Collapsible, CollapsibleTrigger, CollapsibleContent
│   │   ├── accordion/              # Accordion + subcomponents
│   │   ├── sheet/                  # Sheet (side drawer) + subcomponents
│   │   ├── drawer/                 # Drawer (bottom sheet, vaul-vue)
│   │   ├── hover-card/             # HoverCard, HoverCardTrigger, HoverCardContent
│   │   ├── command/                # Command palette + subcomponents
│   │   ├── progress/               # Progress bar
│   │   ├── skeleton/               # Loading skeleton
│   │   ├── avatar/                 # Avatar, AvatarImage, AvatarFallback
│   │   ├── number-field/           # NumberField + subcomponents
│   │   ├── tags-input/             # TagsInput + subcomponents
│   │   ├── textarea/               # Textarea
│   │   └── index.ts                # barrel: all ui/ exports
│   ├── custom/
│   │   ├── dock/
│   │   │   ├── GlassDock.vue       # collapsible glass pill, dual-layer grid
│   │   │   ├── DockPopover.vue     # portaled popover for dock items
│   │   │   ├── DockLayerGroup.vue  # multi-layer content visibility
│   │   │   └── index.ts
│   │   ├── aurora/
│   │   │   ├── Aurora.vue          # WebGL aurora background
│   │   │   ├── composables/        # useAurora, color utilities
│   │   │   └── index.ts
│   │   ├── controls/
│   │   │   ├── DarkModeToggle.vue  # animated sun/moon SVG (useGlobalDark)
│   │   │   └── index.ts
│   │   └── index.ts
│   └── index.ts                    # barrel: ui/ + custom/
├── composables/
│   ├── dock/
│   │   ├── useDockState.ts         # expand/collapse, ref-counted keepOpen/release, click-away
│   │   ├── useDockTransition.ts    # reactive-ref width animation, symmetric fade-swap-animate
│   │   ├── useLayerTransition.ts   # grid-stacked crossfade + width FLIP
│   │   ├── usePopupMutex.ts        # one-at-a-time popup exclusivity
│   │   ├── useDockActionBar.ts     # action bar context
│   │   └── index.ts
│   ├── interaction/
│   │   ├── useHeightTransition.ts  # JS-driven expand/collapse hooks
│   │   ├── useHoverPopover.ts      # hover-timer + floating panel positioning
│   │   ├── useHoverToggle.ts       # toggle on hover with linger
│   │   ├── useTouchGate.ts         # iOS Safari touch-vs-scroll discrimination
│   │   ├── useLeaveTimer.ts        # debounced mouseleave timer
│   │   └── index.ts
│   ├── useClipboard.ts             # copyToClipboard (navigator.clipboard + textarea fallback)
│   ├── useGlobalDark.ts            # createGlobalState(useDark) + Safari FOUC fix
│   ├── useKeyboardShortcuts.ts     # singleton registry, Mod aliasing, category groups
│   ├── useWatercolorBlob.ts        # seeded PRNG blob animation (Mulberry32)
│   ├── prng.ts                     # mulberry32, hashString, randomRadii, seededRandom
│   └── index.ts
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

`src/index.ts`—re-exports all components (32 ui + 4 custom), 18 composables, and `cn()` utility.

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
