# Glass-UI Design Language

Visual design system for glassmorphic Vue 3 interfaces. Tokens, surfaces, states, typography—everything a consumer needs to build consistent UI.

## Token Architecture

All tokens live in `src/styles/tokens.css` under `:root`, with `.dark` overrides. Consumers import glass-ui styles, then override tokens in their local preset CSS:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "@mkbabb/glass-ui/styles";
@import "./preset.css";        /* local token overrides */
@variant dark (&:where(.dark, .dark *));
```

### Token Categories

| Section | What it controls | Override pattern |
|---------|-----------------|-----------------|
| §1 Duration | Animation/transition timing | `--duration-fast: 0.15s` |
| §2 Easing | Spring curves + cubic-bezier | `--spring-snappy: linear(...)` |
| §3 Z-index | 12-tier stacking context | `--z-dock: 40` |
| §4 Radius | Semantic border-radius | `--radius-card: 1rem` |
| §5 Shadows | Elevation + cartoon + card offset | `--shadow-color: hsl(0 0% 0%)` |
| §6 Glass | Four-tier surface system | `--glass-opacity-subtle: 0.30` |
| §7 Animation | Slide offsets, shimmer durations | `--duration-shimmer: 5s` |
| §9 Interactive | Scale transforms, disabled opacity | `--opacity-disabled: 0.50` |
| §10 Focus | Ring width + composite shadow | `--focus-ring-shadow: ...` |
| §11 Paper | SVG noise textures | `--paper-clean-texture: url(...)` |

## Typography

Golden-ratio scale (√φ ≈ 1.272). Base: 1rem.

| Token | Size | Tailwind | Semantic use |
|-------|------|----------|-------------|
| `--type-micro` | 0.6875rem | `text-2xs` | Badges, fine print |
| `--type-caption` | 0.75rem | `text-xs` | Labels, timestamps |
| `--type-small` | 0.875rem | `text-sm` | Secondary body, metadata |
| `--type-body` | 1rem | `text-base` | Default body copy |
| `--type-prose` | 1.125rem | `text-lg` | Long-form reading |
| `--type-subheading` | 1.272rem | `text-xl` | Card titles, field labels |
| `--type-heading` | 1.618rem | `text-2xl` | Subsection heads |
| `--type-title` | 2.058rem | `text-3xl` | Page/section heads |
| `--type-display-1` | fluid | `text-4xl` | Display |
| `--type-display-2` | fluid | `text-5xl` | Display |
| `--type-display-3` | fluid | `text-6xl` | Display |
| `--type-display-4` | fluid | `text-7xl` | Hero |
| `--type-display-5` | fluid | `text-8xl` | Splash |

### Line heights

`leading-micro` (1.2) → `leading-caption` (1.3) → `leading-small` (1.4) → `leading-body` (1.5) → `leading-prose` (1.618) → `leading-heading` (1.2) → `leading-display` (1.1)

### Letter spacing

`tracking-tight` (-0.025em) → `tracking-normal` (0) → `tracking-wide` (0.025em) → `tracking-wider` (0.05em) → `tracking-caps` (0.1em)

### Font stacks

- `font-display` — Fraunces (overridden per consumer). Optical sizing, WONK/SOFT variation.
- `font-serif` — Fraunces (overridden per consumer). Body text.
- `font-sans` — system-ui. Fallback.
- `font-mono` — Fira Code. Code, technical values.

### Semantic classes

Full typography presets: `.text-display-5` through `.text-micro`, `.text-mono-caption`, `.text-mono-small`, `.section-label`, `.text-pane-title`.

### Kinetic utilities

`.text-breathe` (weight oscillation), `.text-wonk-hover` (Fraunces personality shift), `.scroll-weight-reveal` (scroll-driven), `.char-stagger` (per-character entrance).

## Glass Surfaces

Four-tier system, each composing background + blur + border + shadow + grain overlay:

| Tier | Class | Opacity | Blur | Use |
|------|-------|---------|------|-----|
| Subtle | `.glass-subtle` | 30% | 4px | Dock bg, input bg, hover overlays |
| Default | `.glass-default` | 50% | 8px | Cards, content containers, select triggers |
| Medium | `.glass-medium` | 65% | 12px | Popovers, dropdowns, floating panels |
| Elevated | `.glass-elevated` | 80% | 16px | Dialogs, command palette, modal overlays |

Dark mode boosts opacity (42%–88%) and shifts grain blend mode from `overlay` → `soft-light`.

### Convenience shorthands

- `.glass-card` — default tier + `border-radius: var(--radius-card)` + offset shadow
- `.glass-pill` — default tier + pill radius + press feedback

### Accessibility

- `prefers-reduced-transparency`: opacity → 1, blur → none, grain → 0
- `prefers-contrast: more`: opacity boosted (88%–100%)
- `@supports not (backdrop-filter)`: solid color fallback

## Interactive States

Every interactive element must implement four states:

| State | Visual | Token |
|-------|--------|-------|
| **Rest** | Default appearance | — |
| **Hover** | Scale up or bg tint | `--scale-hover` / `--scale-hover-dock` |
| **Active/Pressed** | Scale down | `--scale-press` / `--scale-press-btn` / `--scale-press-dock` |
| **Disabled** | Reduced opacity, no pointer events | `--opacity-disabled` (0.50) |

Plus:
- **Focus-visible**: `var(--focus-ring-shadow)` — 30% ring + 15% glow. Never 40%.
- **aria-pressed / .is-active**: Tinted background, full-opacity text.

### Composable base classes

- `.btn-interactive` — scale-based: hover scale, active scale, disabled, focus ring. For buttons, icon actions.
- `.interactive-item` — bg-tint-based: hover bg, active scale, disabled, focus ring. For list items, cards, nav items.
- `.active-scale` — atomic: just `:active { transform: scale(0.97) }`.
- `.disabled-base` — atomic: just `:disabled { opacity + pointer-events }`.
- `.focus-ring` — atomic: just `:focus-visible { box-shadow }`.

## Buttons

### CVA Button (primary API)

`buttonVariants` from `src/components/ui/button/index.ts`. Composes `.btn-pill` base.

| Variant | Appearance |
|---------|-----------|
| `default` | Primary bg, white text |
| `destructive` | Red bg |
| `outline` | Bordered, transparent bg |
| `secondary` | Muted bg |
| `accent` | → `.btn-pill-accent` (theme accent color) |
| `ghost` | → `.btn-pill-ghost` (transparent, hover tint) |
| `glass` | → `.btn-pill-glass` (glass-subtle bg + blur) |
| `glass-subtle` | glass-subtle surface |
| `ai` | Amber tint |
| `danger-subtle` | Red tint |
| `link` | Text-only underline |

Sizes: `default` (h-10), `xs` (h-7), `sm` (h-9), `lg` (h-11), `icon` (h-10 w-10).

### CSS glass-btn

Standalone circular icon button with glass-subtle surface. Used in non-Vue contexts (raw `<button class="glass-btn">`). Full four-state coverage via CSS.

### Dock buttons

All dock controls inherit from `.dock-btn-base`:
- `.dock-icon-btn` — fixed square (var(--size-icon-btn))
- `.dock-icon-btn-compact` — auto-sized inline
- `.dock-select-trigger` — text + chevron
- `.dock-dropdown-trigger` — text + icon + chevron
- `.dock-play-btn` — gradient CTA

## Overlays

| Type | Component | Glass tier | Transition | Z-index |
|------|-----------|-----------|------------|---------|
| Dialog | `Dialog` / `DialogContent` | elevated | `dialog-scale` | `--z-modal` |
| Popover | `Popover` / `PopoverContent` | elevated | `.popover-animate .slide-in-from-side` | `--z-popover` |
| Dropdown | `DropdownMenu` / `DropdownMenuContent` | elevated | `.popover-animate .slide-in-from-side` | `--z-popover` |
| Sheet | `Sheet` / `SheetContent` | — | slide from side | `--z-modal` |
| Floating panel | `.floating-panel` | medium | `floating-panel-in` | `--z-overlay` |

### Z-index stack

`background(0)` → `content(10)` → `controls(20)` → `bar(30)` → `dock(40)` → `overlay(50)` → `hovercard(60)` → `popover(70)` → `modal(80)` → `fullscreen(90)` → `toast(100)`

## Cards

### Card.vue variants

| Variant | Appearance |
|---------|-----------|
| `default` | Glass-default surface, card radius, shadow |
| `pane` | Glass-subtle surface, card radius, card shadow, no grain overlay |
| `plain` | No surface styling, structural wrapper only |

### CSS card classes

- `.cartoon-card` — hard offset shadow, border accent on hover
- `.elevated-card` — soft elevation shadow
- `.paper-texture` / `.paper-texture-aged` — SVG noise blend overlay

### Hover patterns

- `.card-hover` — border + bg tint on hover
- `.card-hover-interactive` — primary-tinted border + bg on hover
- `.hover-lift` / `.hover-lift-md` / `.hover-lift-lg` — translateY + shadow
- `.hover-shadow-lift` — shadow-only elevation

## Transitions

Vue `<Transition>` classes:

| Name | Effect | Use |
|------|--------|-----|
| `fade` | Opacity | Simple show/hide |
| `fade-slide` | Opacity + translateY | Dropdown items, list entries |
| `expand-fade` | Opacity + max-height | Collapsible sections |
| `dialog-scale` | Opacity + scale | Modal entrance |
| `pop` | Scale + opacity | Badge, toast entrance |
| `dropdown` | Opacity + translateY + scale | Dropdown menus |
| `tab-fade` | Opacity | Tab content swap |
| `pane-swap` | Opacity (mode="out-in") | Pane content swap |
| `pane-slide` | Opacity + translateX | Directional pane navigation |

## Consumer Wiring

### Import order

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "@mkbabb/glass-ui/styles";
@import "./preset.css";
@variant dark (&:where(.dark, .dark *));
```

### Token overrides

Override in `:root` / `.dark` blocks in your preset:

```css
:root {
    --font-display: "Instrument Serif", Georgia, serif;
    --glass-opacity-subtle: 0.82;
    --shadow-card: 3px 3px 0px 0px color-mix(in srgb, var(--shadow-color) 50%, transparent);
}
```

### @theme extensions

Extend Tailwind utilities with project-specific tokens:

```css
@theme {
    --color-th-accent: oklch(0.50 0.28 20);
}
```

### @utility for project-specific classes

```css
@utility btn-cta {
    @apply relative px-6 py-3 rounded-xl backdrop-blur-sm text-lg;
    @apply hover:scale-[1.02] hover:-translate-y-0.5;
    @apply active:scale-[0.98] active:translate-y-0;
    @apply disabled:opacity-[var(--opacity-disabled)] disabled:pointer-events-none;
}
```

### Root-level restyling

Always edit glass-ui source components for shared styling. Never override with ad-hoc consumer CSS. If you need a variant, add it to the component's CVA definition or CSS class system.

### Component re-exports

```ts
// consumer/components/ui/button/index.ts
export { Button, buttonVariants, type ButtonVariants } from "@mkbabb/glass-ui";
```
