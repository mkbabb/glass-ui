# Glass-UI Design Language

A primitive design system for glassmorphic Vue 3 interfaces. Token-driven, component-first, four-state interactive, kinetically typographic, orthogonally variant.

## Philosophy

Four principles govern the library.

**Token-first.** Every visual behavior is a CSS custom property. Consumers override via a preset CSS file imported after the library. No consumer edits library source for styling. Visual parity between consumers is a side effect of token discipline.

**Component over CSS class.** Interactive elements are Vue components, not utility-class recipes. Components bundle their four-state contract — you cannot forget a hover variant, a focus ring, a disabled style. Static patterns (glass surfaces, typography, decorative utilities) are CSS classes.

**Four-state interactive contract.** Every interactive element implements rest, hover, active, and disabled states. Focus-visible adds a ring. `aria-pressed` / `.is-active` adds semantic toggling. Scale, color, and opacity compose — never hardcoded transforms scattered across components.

**Orthogonal variants.** Surface tier (opacity + blur + border + shadow) is independent of semantic variant (intent) is independent of structural variant (shape geometry). A ghost Button sits flat on any Card variant. These axes never collapse into one vocabulary.

---

## Token Architecture

Tokens live in `src/styles/tokens.css` under `:root`, with `.dark` overrides. Consumers wire in this order:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "@mkbabb/glass-ui/styles";
@import "./preset.css";        /* consumer token overrides */
@variant dark (&:where(.dark, .dark *));
```

---

## Duration

Eight timings form a rhythmic vocabulary:

| Token                | Value    | Typical use                                 |
|----------------------|----------|---------------------------------------------|
| `--duration-instant` | 0.1s     | Near-instant feedback (fade visibility)     |
| `--duration-fast`    | 0.2s     | Quick UI feedback (hover, small transforms) |
| `--duration-normal`  | 0.3s     | Standard transitions                        |
| `--duration-slow`    | 0.45s    | Deliberate reveal                           |
| `--duration-panel`   | 0.55s    | Slide/dock expand                           |
| `--duration-xl`      | 1.0s     | Long ambient animation                      |
| `--duration-xxl`     | 1.5s     | Page-level mood                             |
| `--duration-linger`  | 2.5s     | Background atmosphere, shimmer              |

Shimmer-specific durations: `--duration-shimmer-fast` 3s · `--duration-shimmer` 5s · `--duration-shimmer-slow` 8s.

Dock internals: `--duration-popup-swap` 180ms.

---

## Easing

### Spring curves (`linear()` — modern CSS)

Generated from damped spring physics. Use `easing-function: var(--spring-*)` or Tailwind `ease-spring-*`.

- **`--spring-smooth`** (ζ=1.0, critically damped, zero overshoot):
  ```
  linear(0, 0.0974, 0.2816, 0.4656, 0.6189, 0.7361, 0.821, 0.8806, 0.9213,
         0.9487, 0.9668, 0.9787, 0.9864, 0.9914, 0.9945, 0.9966, 0.9978,
         0.9987, 0.9992, 0.9995, 0.9997, 0.9998, 0.9999, 0.9999, 1)
  ```

- **`--spring-snappy`** (ζ=0.65, ~7% overshoot, quick settle):
  ```
  linear(0, 0.0727, 0.2386, 0.4363, 0.6262, 0.7861, 0.9075, 0.9902, 1.0395,
         1.0628, 1.068, 1.0619, 1.0501, 1.0366, 1.0239, 1.0133, 1.0054,
         1.0001, 0.997, 0.9956, 0.9954, 0.9959, 0.9967, 0.9976, 0.9985,
         0.9992, 0.9997, 1, 1.0002, 1.0003, 1.0003)
  ```

- **`--spring-bouncy`** (ζ=0.45, ~20% overshoot, elastic settle):
  ```
  linear(0, 0.0492, 0.1748, 0.3455, 0.5335, 0.7169, 0.8796, 1.0117, 1.1087,
         1.1706, 1.2005, 1.2039, 1.1874, 1.1575, 1.1206, 1.0818, 1.0454,
         1.0141, 0.9895, 0.9723, 0.962, 0.958, 0.959, 0.9635, 0.9703,
         0.9781, 0.986, 0.9931, 0.9991, 1.0036, 1.0066, 1.0082, 1.0087,
         1.0082, 1.007, 1.0055, 1.0039, 1.0023, 1.0009)
  ```

- **`--spring-gentle`** (ζ=0.85, barely perceptible overshoot, slow ease):
  ```
  linear(0, 0.1018, 0.3031, 0.5094, 0.6812, 0.8083, 0.8945, 0.9486, 0.98,
         0.9964, 1.0038, 1.0061, 1.006, 1.0049, 1.0036, 1.0024, 1.0015,
         1.0008, 1.0004, 1.0002, 1.0001, 1, 1, 1, 1)
  ```

### Cubic-bezier (fallback, exits, non-spring)

- `--ease-standard`: `cubic-bezier(0.4, 0, 0.2, 1)` — decelerate
- `--ease-out`: `cubic-bezier(0, 0, 0.2, 1)`
- `--ease-in`: `cubic-bezier(0.4, 0, 1, 1)`
- `--ease-out-expo`: `cubic-bezier(0.16, 1, 0.3, 1)`

---

## Z-Index Stack

Twelve-tier stacking, plus two out-of-band tiers:

| Token             | Value | Surfaces                             |
|-------------------|-------|--------------------------------------|
| `--z-background`  | 0     | Aurora, decorative layers            |
| `--z-content`     | 10    | Main content                         |
| `--z-controls`    | 20    | Inline controls                      |
| `--z-bar`         | 30    | Status bars, headers                 |
| `--z-dock`        | 40    | Docks                                |
| `--z-panel`       | 45    | Floating editor panels               |
| `--z-overlay`     | 50    | Full-screen overlays                 |
| `--z-hovercard`   | 60    | Hover cards                          |
| `--z-tooltip`     | 60    | Tooltips (coequal with hover cards)  |
| `--z-popover`     | 70    | Popovers, dropdowns                  |
| `--z-modal`       | 80    | Dialogs, sheets                      |
| `--z-fullscreen`  | 90    | Fullscreen takeovers                 |
| `--z-toast`       | 100   | Toast notifications                  |
| `--z-max`         | 9999  | Emergency escape hatch               |
| `--z-debug`       | 99999 | Debug overlays                       |

---

## Border Radius

| Token            | Value              | Pixel (at 16 px base) | Use                        |
|------------------|--------------------|-----------------------|----------------------------|
| `--radius`       | 0.5rem             | 8 px                  | Default                    |
| `--radius-sm`    | 4px                | 4 px                  | Tight corners (kbd, badge) |
| `--radius-md`    | 6px                | 6 px                  | Medium                     |
| `--radius-lg`    | var(--radius)      | 8 px                  | Interactive                |
| `--radius-xl`    | 12px               | 12 px                 | Panels                     |
| `--radius-2xl`   | 1rem               | 16 px                 | Large cards, dialogs       |
| `--radius-pill`  | 9999px             | 9999 px               | Pills                      |
| `--radius-card`  | var(--radius-2xl)  | 16 px                 | Card surfaces              |
| `--radius-panel` | var(--radius-xl)   | 12 px                 | Panels                     |
| `--radius-dialog`| var(--radius-2xl)  | 16 px                 | Modal dialogs              |
| `--radius-input` | var(--radius)      | 8 px                  | Inputs                     |
| `--radius-button`| var(--radius)      | 8 px                  | Buttons                    |
| `--radius-badge` | var(--radius-pill) | 9999 px               | Badges                     |
| `--radius-dock`  | var(--radius-pill) | 9999 px               | Dock container             |

---

## Shadows

### Elevation scale

```
--shadow-xs:   0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06);
--shadow-sm:   0 2px 8px rgba(0,0,0,0.06);
--shadow-md:   0 4px 16px rgba(0,0,0,0.08);
--shadow-lg:   0 4px 20px rgba(0,0,0,0.12);
--shadow-xl:   0 8px 24px rgba(0,0,0,0.14);
--shadow-2xl:  0 25px 50px -12px rgba(0,0,0,0.25);
```

### Cartoon shadows (offset, layered)

```
--shadow-cartoon-sm: -3px 2px 1px rgba(0,0,0,0.10),
                      0   3px 1px rgba(0,0,0,0.10),
                     -3px 3px 1px rgba(0,0,0,0.06);

--shadow-cartoon-md: -4px 3px 1px rgba(0,0,0,0.12),
                      0   4px 1px rgba(0,0,0,0.12),
                     -4px 4px 2px rgba(0,0,0,0.08);

--shadow-cartoon-lg: -6px 4px 1px rgba(0,0,0,0.12),
                      0   6px 1px rgba(0,0,0,0.12),
                     -6px 6px 2px rgba(0,0,0,0.08);
```

### Card flat-offset shadows

```
--shadow-card:       4px 4px 0px 0px rgba(0,0,0,0.50);
--shadow-card-hover: 5px 5px 0px 0px rgba(0,0,0,0.60);
```

### Dock shadows

```
--shadow-dock:           0 4px 20px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.15);
--shadow-dock-collapsed: 0 2px 12px rgba(0,0,0,0.20), 0 0 0 1px rgba(0,0,0,0.15);
```

### Glass-tier shadows

```
--glass-shadow-subtle:   var(--shadow-sm);
--glass-shadow-default:  var(--shadow-md);
--glass-shadow-medium:   var(--shadow-lg);
--glass-shadow-elevated: var(--shadow-xl), inset 0 0 0 1px rgba(255,255,255,0.08);  /* rim */
```

---

## Glass Surfaces

Four tiers compose background opacity, backdrop-blur, border, shadow, grain. Dark mode boosts opacity and shifts grain blend (`overlay` → `soft-light`) for legibility.

| Tier     | Class              | Light opacity | Dark opacity | Blur                        | Border               | Shadow                   | Use                                 |
|----------|--------------------|---------------|--------------|-----------------------------|----------------------|--------------------------|-------------------------------------|
| Subtle   | `.glass-subtle`    | 30%           | 42%          | `blur(4px) saturate(1.05)`  | 8% foreground        | `--shadow-sm`            | Dock bg, input bg, hover overlays   |
| Default  | `.glass-default`   | 50%           | 58%          | `blur(8px) saturate(1.2)`   | 10% foreground       | `--shadow-md`            | Cards, containers, select triggers  |
| Medium   | `.glass-medium`    | 65%           | 72%          | `blur(12px) saturate(1.3)`  | 12% foreground       | `--shadow-lg`            | Popovers, dropdowns, dock expanded  |
| Elevated | `.glass-elevated`  | 80%           | 88%          | `blur(16px) saturate(1.4)`  | 15% foreground       | `--shadow-xl` + inner rim | Dialogs, command palette, modals    |

### Tokens per tier

For each tier, `--glass-bg-{tier}` (rgba), `--glass-blur-{tier}` (full filter string), `--glass-border-{tier}` (color-mix result), `--glass-shadow-{tier}` (box-shadow). Grain overlay:

- Light mode: 3.5% opacity, blend `overlay`
- Dark mode: 6% opacity, blend `soft-light`

**Dock-specific blur** — `--glass-blur-dock = blur(2px) saturate(1.025)` is its own token (half the subtle weight) so floating and rail docks read as feather-light overlays rather than heavy blurred slabs. `GlassDock` references `var(--glass-blur-dock, var(--glass-blur-subtle))`; consumers can override the dock token at `:root` without touching the four tier blurs.

### Convenience shorthands

- `.glass-card` — **static surface utility**: `.glass-default` + `border-radius: var(--radius-card)` + offset card shadow. No hover lift; interactive cards live in `<Card>` (which composes its own hover via `.glass-cartoon` / `.cartoon-card` / etc.) or in components that explicitly opt into a hover variant. The `.glass-card:hover` rule was removed because conflating a static surface with an interactive primitive forced every consumer of the utility (badges, pills, panels) to fight off an unwanted lift.
- `.glass-pill` — `.glass-default` + pill radius + press feedback (scale 0.97 on active)
- `.glass-cartoon` — **interactive cartoon surface** (Tranche G): cartoon-tier shadow (`--shadow-cartoon-md`), 2px border, hover lift via `--lift-sm` + `--shadow-cartoon-lg`. Token-fall-through to default-tier glass tokens (`--glass-bg-cartoon, var(--glass-bg-default)`) so consumers without cartoon-specific overrides still get a coherent surface. Closes the contract `Card.vue variant="cartoon"` outputs.

### Accessibility fallbacks

- `@media (prefers-reduced-transparency)` → opacity 1, blur none, grain 0
- `@media (prefers-contrast: more)` → opacity 88%–100% per tier
- `@supports not (backdrop-filter)` → solid color fallback at boosted opacity

---

## Interactive States

Every interactive element implements the four-state contract plus focus and toggle.

| State                     | Behavior                         | Token                                                            |
|---------------------------|----------------------------------|------------------------------------------------------------------|
| Rest                      | Default appearance               | —                                                                |
| Hover                     | Scale up, or bg tint             | `--scale-hover` (1.08) · `--scale-hover-dock` (1.1)              |
| Active / pressed          | Scale down                       | `--scale-press` (0.95) · `--scale-press-btn` (0.97) · `--scale-press-dock` (0.92) |
| Disabled                  | Reduced opacity, no pointer events | `--opacity-disabled` (0.50)                                    |
| Focus-visible             | Ring + glow                      | `--focus-ring-shadow`: 0 0 0 2px rgba(ring, 0.30), 0 0 8px rgba(ring, 0.15) |
| `aria-pressed` / `.is-active` | Tinted bg, full-opacity text | Component-scoped                                                 |

### Composable base classes

- `.btn-interactive` — scale-based four-state + focus ring
- `.interactive-item` — bg-tint four-state (50% accent) + focus ring
- `.active-scale` — atomic `:active { transform: scale(0.97) }`
- `.disabled-base` — atomic `:disabled { opacity + pointer-events }`
- `.focus-ring` — atomic `:focus-visible { box-shadow: var(--focus-ring-shadow) }`

---

## Typography

Scale: golden-ratio (√φ ≈ 1.272), base 1rem (16 px).

### Size tokens

| Token               | Value                                     | Px (at 16)  | Tailwind  | Use                          |
|---------------------|-------------------------------------------|-------------|-----------|------------------------------|
| `--type-micro`      | 0.6875rem                                 | 11          | `text-2xs`| Badges, fine print           |
| `--type-caption`    | 0.75rem                                   | 12          | `text-xs` | Labels, timestamps           |
| `--type-small`      | 0.875rem                                  | 14          | `text-sm` | Secondary body               |
| `--type-body`       | 1rem                                      | 16          | `text-base` | Default body copy          |
| `--type-prose`      | 1.125rem                                  | 18          | `text-lg` | Long-form reading            |
| `--type-subheading` | 1.272rem                                  | 20.4        | `text-xl` | Card titles, labels          |
| `--type-heading`    | 1.618rem                                  | 25.9        | `text-2xl`| Subsection heads             |
| `--type-title`      | 2.058rem                                  | 32.9        | `text-3xl`| Page heads                   |
| `--type-display-1`  | clamp(1.618rem, 1.2rem + 1.6vw, 2.618rem) | 25.9–41.9   | `text-4xl`| Display                      |
| `--type-display-2`  | clamp(2.058rem, 1.5rem + 2.2vw, 3.33rem)  | 32.9–53.3   | `text-5xl`| Large display                |
| `--type-display-3`  | clamp(2.618rem, 2rem + 3vw, 4.236rem)     | 41.9–67.8   | `text-6xl`| Extra-large display          |
| `--type-display-4`  | clamp(3.33rem, 2.5rem + 4vw, 5.382rem)    | 53.3–86.1   | —         | Splash (custom)              |
| `--type-display-5`  | clamp(4.236rem, 3.5rem + 6vw, 6.854rem)   | 67.8–109.7  | —         | Mega hero (custom)           |

Consumers extending beyond display-5 add tokens in their preset — the library exposes the mechanism, not every conceivable step.

### Line height

| Token                | Value  | Use                                    |
|----------------------|--------|----------------------------------------|
| `--leading-micro`    | 1.2    | Very tight (micro text)                |
| `--leading-caption`  | 1.3    | Captions                               |
| `--leading-small`    | 1.4    | Small body copy                        |
| `--leading-body`     | 1.5    | Default body text                      |
| `--leading-prose`    | 1.618  | Long-form reading (golden)             |
| `--leading-heading`  | 1.2    | Headlines                              |
| `--leading-display`  | 1.1    | Display / hero text (tight)            |

### Letter spacing

| Token                 | Value       | At body (px) | Use                  |
|-----------------------|-------------|--------------|----------------------|
| `--tracking-tight`    | −0.025em    | −0.4         | Headers, display     |
| `--tracking-normal`   | 0           | 0            | Default body         |
| `--tracking-wide`     | 0.025em     | 0.4          | Captions, labels     |
| `--tracking-wider`    | 0.05em      | 0.8          | Uppercase mono       |
| `--tracking-caps`     | 0.1em       | 1.6          | Section labels (caps)|

### Typography Tokens

| Token            | Value                                                       | Semantic Use                                          |
|------------------|-------------------------------------------------------------|-------------------------------------------------------|
| `--font-display` | Fraunces (variable; `opsz`/`wght`/`SOFT`/`WONK`)            | Ornamental display voice; headings with personality   |
| `--font-serif`   | Computer Modern Serif → Georgia fallback                    | Body, prose, headings, math                           |
| `--font-sans`    | Helvetica Neue → Arial → system-ui                          | System sans fallback (rarely direct)                  |
| `--font-mono`    | Fira Code → Fira Mono → monospace                           | Code, monospace, admin labels                         |

```css
--font-display: "Fraunces", Georgia, serif;                                         /* display voice */
--font-serif:   "Computer Modern Serif", "Latin Modern Roman", "CMU Serif", Georgia, serif; /* body serif */
--font-sans:    "Helvetica Neue", "Arial Nova", Arial, system-ui, sans-serif;       /* independent system sans */
--font-mono:    "Fira Code", "Fira Mono", monospace;
```

Consumers override these tokens at `:root` (not just `@theme` at-rules
— `@theme` may not propagate into already-emitted `@utility` rules at
evaluation time, so consumer-side cascade leaks are real). For example,
speedtest pins both `--font-display` and `--font-serif` to General Sans
at `:root` since its brand is brand-uniform sans.

`--font-sans` was previously aliased to `--font-serif`, which collapsed the
two semantic identities and confused consumers that overrode `--font-serif`
for branding. It now resolves to its own system stack; consumers override
per-app for brand sans without touching the serif voice.

`.dock-label` is pinned to `var(--font-display)` so dock typography stays
consistent regardless of consumer body cascade tweaks.

Fraunces axes available: `wght` (300–700), `opsz`, `WONK` (0–1), `SOFT` (0–100).

### Semantic typography classes

| Class                  | Font         | Size                 | Weight | Line    | Tracking  | Axes                        |
|------------------------|--------------|----------------------|--------|---------|-----------|-----------------------------|
| `.text-display-5`      | display      | `--type-display-5`   | 300    | 1.1     | tight     | `WONK` 1, `SOFT` 0          |
| `.text-display-4`      | display      | `--type-display-4`   | 350    | 1.1     | tight     | `WONK` 1, `SOFT` 0          |
| `.text-display-3`      | display      | `--type-display-3`   | 350    | 1.1     | tight     | `WONK` 1, `SOFT` 0          |
| `.text-display-2`      | display      | `--type-display-2`   | 350    | 1.1     | tight     | `WONK` 1, `SOFT` 0          |
| `.text-display`        | display      | `--type-display-1`   | 350    | 1.1     | tight     | `WONK` 1, `SOFT` 0          |
| `.text-title`          | display      | `--type-title`       | 400    | 1.2     | tight     | —                           |
| `.text-heading`        | display      | `--type-heading`     | 500    | 1.2     | normal    | —                           |
| `.text-subheading`     | serif        | `--type-subheading`  | 600    | 1.5     | normal    | —                           |
| `.text-prose`          | serif        | `--type-prose`       | 400    | 1.618   | normal    | —                           |
| `.text-body`           | serif        | `--type-body`        | 400    | 1.5     | normal    | —                           |
| `.text-small`          | serif        | `--type-small`       | 400    | 1.4     | normal    | —                           |
| `.text-caption`        | serif        | `--type-caption`     | 400    | 1.3     | wide      | —                           |
| `.text-micro`          | serif        | `--type-micro`       | 500    | 1.2     | wide      | —                           |
| `.text-mono-caption`   | mono         | `--type-caption`     | —      | 1.3     | wider     | `text-transform: uppercase` |
| `.text-mono-small`     | mono         | `--type-small`       | —      | 1.4     | normal    | —                           |
| `.section-label`       | mono         | `--type-caption`     | —      | —       | caps      | `text-transform: uppercase`, muted-foreground color |

### Kinetic typography utilities

- **`.text-breathe`** — `animation: weight-breathe 4s ease-in-out infinite` (wght 300 → 500 → 300)
- **`.text-wonk-hover`** — rest `font-variation-settings: "WONK" 0, "SOFT" 100`; hover toggles to `"WONK" 1, "SOFT" 0`; transition 450 ms `--spring-smooth`
- **`.scroll-weight-reveal`** — `animation: weight-reveal linear both; animation-timeline: view(); animation-range: entry 0% cover 30%` (wght 100 → 400 + opacity 0.3 → 1)
- **`.char-stagger > .char`** — per-char `fade-in` 300 ms `--spring-smooth backwards`; `animation-delay: calc(var(--char-index, 0) * 30ms)`
- **`.text-glass-legible`** — halo text-shadow `0 0 12px color-mix(in srgb, var(--background) 50%, transparent), 0 0 4px color-mix(in srgb, var(--background) 30%, transparent)`

All kinetic utilities respect `prefers-reduced-motion`: transforms eliminated, opacity fades preserved at `--duration-instant`.

---

## Buttons

### `Button` CVA component (primary API)

Base class `.btn-pill`:
- border-radius pill
- padding `0.5rem 1rem`
- font-size 1rem
- gap `0.375rem` (6 px)
- transition `all 200ms var(--ease-standard)`
- `:focus-visible` → `outline: none; box-shadow: var(--focus-ring-shadow)`
- `:disabled` → `opacity: 0.50; pointer-events: none`
- `[aria-pressed="true"]` → 15% primary bg, 30% primary border

### Variants

| Variant          | Rest                                                   | Hover                           |
|------------------|--------------------------------------------------------|---------------------------------|
| `default`        | Primary bg, foreground text                            | `bg-primary/90`                 |
| `destructive`    | Destructive bg, destructive-foreground text            | `bg-destructive/90`             |
| `outline`        | Border 70%, bg 60%, foreground text                    | 60% accent bg, 90% border       |
| `secondary`      | Secondary bg                                           | `bg-secondary/80`               |
| `accent`         | `.btn-pill-accent` (opaque theme accent)               | 90% opacity                     |
| `ghost`          | Transparent, 85% foreground                            | 12% foreground bg               |
| `glass`          | `.glass-subtle` + default border                       | `--glass-shadow-default`        |
| `glass-subtle`   | `.glass-subtle`                                        | 60% border                      |
| `ai`             | amber-500/15 bg, amber-700 text                        | amber-500/25                    |
| `danger-subtle`  | destructive/10 bg, destructive text                    | destructive/20                  |
| `link`           | Text-only, underline on hover                          | underline                       |

All variants scale 0.97 on `:active`.

### Sizes

| Size      | Class          | Height        | Padding                |
|-----------|----------------|---------------|------------------------|
| `default` | `h-10`         | 40 px         | `px-4 py-2`            |
| `xs`      | `h-7`          | 28 px         | `px-2`                 |
| `sm`      | `h-9`          | 36 px         | `px-3`                 |
| `lg`      | `h-11`         | 44 px         | `px-8`                 |
| `icon`    | `h-10 w-10`    | 40 × 40 px    | 0                      |

### `.glass-btn` (CSS class)

Standalone circular icon button for non-Vue contexts.
- Size `--size-icon-btn` = 2.5rem (40 px)
- Border-radius pill
- Border 1.5px `--glass-border-subtle`
- Background `--glass-bg-subtle`
- Backdrop-filter `--glass-blur-subtle`
- Color `var(--muted-foreground)`
- Hover: 85% bg lighten, 20% foreground border, 15% foreground color, `transform: scale(1.08)`
- Active: `transform: scale(0.95)`
- Focus-visible: `box-shadow: var(--focus-ring-shadow)`
- Disabled: 50% opacity, `cursor: not-allowed`
- `.is-active` / `[aria-pressed="true"]`: 10% foreground bg, 25% foreground border

---

## Dock

The dock is a first-class composable system. Three principles: a dock is a positioned container; buttons inside a dock are dock-specific components; layered content is orchestrated by `DockLayer` / `DockLayerGroup`.

### Components

| Component              | Shape                                             | Hover                                                  | Use                                             |
|------------------------|---------------------------------------------------|--------------------------------------------------------|-------------------------------------------------|
| `GlassDock`            | Pill container, height ≈ 55 px                    | —                                                      | Outer dock surface                              |
| `DockIconButton`       | Fixed square `--size-icon-btn` (40 × 40 px); `compact` prop auto-sizes to content | Bg darken + `--scale-hover-dock` (1.1)       | Icon-only buttons inside a dock                 |
| `DockSelectTrigger`    | Variable width, text + chevron                    | Bg darken only (no scale — anchors popover)            | `<Select>` triggers inside a dock               |
| `DockDropdownTrigger`  | Variable width, text + icon + chevron             | Bg darken + scale (1.1)                                | `<DropdownMenu>` triggers inside a dock         |
| `DockPopover`          | Slot-based popover anchor                         | —                                                      | Popover anchored to any dock button             |
| `DockLayer`            | Grid cell, fades in/out by slot key               | —                                                      | Layer-active switching                          |
| `DockLayerGroup`       | Grid wrapper, animates width across layers        | —                                                      | Multi-layer dock (expanded / collapsed / compact) |

### Geometry

```css
--size-icon-btn:         2.5rem;   /* 40 px */
--dock-h:                calc(var(--size-icon-btn) + 0.75rem + 3px);  /* ≈ 55 px */
--dock-margin:           0.5rem;
--dock-menubar-reserve:  4rem;
```

### Position prop

- `fixed` — viewport-anchored (`fixed bottom-[--dock-pos] left-1/2 -translate-x-1/2`)
- `inline` — flow-anchored (`margin: 0 auto`)
- `sticky` — scroll-container anchored (`position: sticky; top: 0`)

### Other props

- `always-expanded` — disable idle-collapse
- `collapse-delay` — auto-collapse timer (default 2000 ms)
- `start-collapsed` — initial state
- `fit-content` — adapt width to content vs stretch
- `wrap` — multi-line responsive dock (mobile rounded-rect, desktop pill)
- `orientation` — `horizontal` (default) or `vertical`
- `<template #collapsed>` — summary content shown when compacted

### Utilities

- `.dock-separator` — 1 px vertical divider, 50% dock-h tall, 15% foreground
- `.dock-spacer` — `flex: 1` for pushing items apart
- `.dock-label` — inline-flex, 14 px text, muted-foreground; `font-family: var(--font-display)` pinned so dock typography tracks the display voice regardless of consumer body cascade

### Layer transitions

- `DockLayerGroup` owns the stacked layer grid with scoped `.dock-layer-stack` sizing.
- `DockLayer` owns active/leaving panes through `.dock-layer-item-host`.
- `useLayerTransition` performs the FLIP size animation for layer swaps.

---

## Variant Taxonomy

Three orthogonal vocabularies. Never mix.

### Surface tier (glass)

Applied to floating surfaces: `Card`, `PopoverContent`, `DropdownMenuContent`, `HoverCardContent`, `DialogContent`, `SheetContent`, `Tooltip`, `.floating-panel`. Set via component prop `variant="subtle" | "default" | "medium" | "elevated"` or direct class.

### Semantic variant (intent)

Used on `Button`: `primary | secondary | ghost | outline | destructive | accent | link | ai | danger-subtle | glass | glass-subtle`. Scoped to intent, independent of elevation. A ghost button sits flat on any tier.

### Structural variant (geometry)

**Card variants**:
- `default` — glass-default surface + card shadow
- `pane` — glass-subtle surface, no grain (scroll-container safe)
- `cartoon` — pop-art aesthetic, offset shadow, accent border on hover
- `plain` — no surface styling, structural wrapper only
- `flush` — drops surface shadow (for nested cards)

**Slider variants**: all share tokens `--slider-track-bg`, `--slider-track-height`, `--slider-thumb-bg`, `--slider-thumb-size`, `--slider-thumb-border-color`, `--slider-range-bg`, `--slider-thumb-shadow`. Restyle on a wrapper, never via `:deep()`.

| Variant     | Track height | Thumb size       | Use                       |
|-------------|--------------|------------------|---------------------------|
| `standard`  | 6 px muted/50 | 14 px circle    | Default                   |
| `spectrum`  | 24 px secondary | thin bar      | Range selection           |
| `timeline`  | 24 px glass-blurred | 24 px disc| Video/timeline scrubbing  |

### Theming discipline

When a consumer needs to override component internals, the first resort is a documented CSS custom property. `:deep()` is a last resort — it indicates a missing token or slot-class prop.

Slot-class props (e.g., `ScrollPaneHeader` → `title-class`, `description-class`) expose internal elements for controlled styling.

---

## Overlays

| Type             | Components                                  | Tier       | Transition                              | Z-index             |
|------------------|---------------------------------------------|------------|-----------------------------------------|---------------------|
| Dialog           | `Dialog`, `DialogContent`                   | elevated   | `dialog-scale`                          | `--z-modal` (80)    |
| Popover          | `Popover`, `PopoverContent`                 | elevated   | `.popover-animate .slide-in-from-side`  | `--z-popover` (70)  |
| Dropdown         | `DropdownMenu`, `DropdownMenuContent`       | elevated   | `.popover-animate .slide-in-from-side`  | `--z-popover` (70)  |
| Sheet            | `Sheet`, `SheetContent`                     | —          | slide from side                         | `--z-modal` (80)    |
| Hover card       | `HoverCard`, `HoverCardContent`             | —          | `fade-slide`                            | `--z-hovercard` (60)|
| Tooltip          | `Tooltip` + `TooltipProvider`               | —          | fade                                    | `--z-tooltip` (60)  |
| Floating panel   | `.floating-panel`                           | medium     | `floating-panel-in`                     | `--z-overlay` (50)  |

`--popover-offset` (6 px) governs anchor-to-content spacing. `--popover-viewport-pad` (8 px) keeps popovers from viewport edges.

---

## Motion

### Vue Transition classes

Reusable sets in `transitions.css`. Each defines enter/leave-active + enter-from/leave-to.

| Name              | Effect                                 | Enter                          | Leave                           | Use                            |
|-------------------|----------------------------------------|--------------------------------|---------------------------------|--------------------------------|
| `fade`            | Opacity                                | 200 ms `--ease-standard`       | 200 ms `--ease-standard`        | Simple show/hide               |
| `fade-slide`      | Opacity + translateY                   | 300 ms `--ease-out`            | 200 ms `--ease-in`              | Dropdown items, list entries   |
| `expand-fade`     | Opacity + max-height                   | 300 ms `--spring-smooth`       | 300 ms `--ease-in`              | Collapsible sections           |
| `dialog-scale`    | Opacity + scale + translateY           | 450 ms `--spring-bouncy`       | 300 ms `--ease-standard`        | Modal entrance                 |
| `pop`             | Scale + opacity                        | 200 ms `--spring-bouncy`       | 200 ms `--ease-out`             | Badge / toast entrance         |
| `dropdown`        | Opacity + translateY + scale           | 300 ms `--spring-snappy`       | 100 ms opacity-only             | Dropdown menus                 |
| `tab-fade`        | Opacity                                | 200 ms `--ease-standard`       | 200 ms `--ease-standard`        | Tab content swap               |
| `pane-swap`       | Opacity + translateX (mode="out-in")   | 300 ms `--spring-smooth`       | 300 ms `--ease-out`             | Pane content swap              |
| `metric-swap`     | Opacity + translateY + scale(0.95)     | 300 ms `--spring-smooth`       | 200 ms `--ease-standard`        | Metric value crossfade         |
| `pane-slide`      | Opacity + max-height                   | 550 ms `--spring-gentle`       | 550 ms `--ease-out`             | Collapsible panes              |
| `pane-left`       | translateX(−110%) + rotate(−2°)        | 450 ms `--spring-snappy`       | 300 ms `--ease-out`             | Left pane nav                  |
| `pane-right`      | translateX(110%) + rotate(2°)          | 450 ms `--spring-snappy`       | 300 ms `--ease-out`             | Right pane nav                 |

All transitions respect `prefers-reduced-motion`: fades preserved at 150 ms, transforms eliminated.

### Keyframe entrance animations

- `floating-panel-in` — opacity 0 → 1, blur 4px → 0, scale 0.96 → 1
- `dialog-in` — opacity + scale(0.95) + translateY(8 px)
- `scale-in` — opacity + scale(0.95)
- `fade-in` — opacity + translateY(6 px)
- `slide-up` — opacity + translateY(16 px)
- `dock-in` — opacity + translateY(14 px) + scale(0.96); opt-in via `.dock-in` utility on a dock wrapper (panel duration, `--spring-snappy`)

### Kinetic typography keyframes

- `weight-breathe` — font-variation-settings wght 300 → 500 → 300 over 4 s (ease-in-out)
- `weight-reveal` — wght 100 → 400, opacity 0.3 → 1 (scroll-timeline driven)
- `gold-shimmer-slide` — `background-position: 200% → -200%` over 6 s linear

### Utility animations

- `rainbow-hue` — hue-rotate 0 → 360°
- `shimmer-sweep` — background-position sweep
- `shake` — translateX ±4 px over 0.5 s

---

## Layout & Sizing Tokens

### Icons

```
--icon-xs: 0.75rem   (12 px)
--icon-sm: 0.875rem  (14 px)
--icon-md: 1rem      (16 px)
--icon-lg: 1.25rem   (20 px)
--icon-xl: 1.5rem    (24 px)
```

Utility classes `.icon-xs`..`.icon-xl` set width + height.

### Input & form constraints

```
--mask-fade-width:     1rem    (16 px)
--max-width-input:     24rem   (384 px)
--min-width-input-sm:  5rem    (80 px)
```

### Chart dimensions (consumer-facing tokens)

```
--chart-height-compact: 15rem   (240 px)
--chart-height-default: 22.5rem (360 px)
--chart-height-large:   25rem   (400 px)
--chart-margin:         1.25rem (20 px)
```

Tailwind exposure: `h-chart-compact`, `h-chart-default`, `h-chart-large`; `min-w-input-sm`.

### Divider colors (for charts, overlays, echarts)

```
--color-divider-subtle: rgba(128, 128, 128, 0.05)
--color-divider-medium: rgba(128, 128, 128, 0.4)
--color-divider-strong: rgba(128, 128, 128, 0.7)
```

Also exposed as literal constants via `@mkbabb/glass-ui/tokens` for Canvas 2D / echarts consumers that can't resolve CSS variables.

### Lift offsets (hover-lift utilities)

```
--lift-sm: -1px
--lift-md: -2px
--lift-lg: -4px
```

### Stacking overlaps (StackedIcons)

```
--stack-overlap-sm: 0.375rem (6 px)
--stack-overlap-md: 0.5rem   (8 px)
--stack-overlap-lg: 0.625rem (10 px)
```

### Border opacity scale

```
--border-opacity-light:  0.15
--border-opacity-medium: 0.25
--border-opacity-strong: 0.60
```

### Animation offsets

```
--animation-slide-sm: 3px
--animation-slide-md: 6px
--animation-slide-lg: 8px
```

### Paper textures

```
--paper-texture-size:    200px 200px
--paper-clean-texture:   url("data:image/svg+xml,...")   /* baseFrequency 0.65, 4 octaves */
--paper-aged-texture:    url("data:image/svg+xml,...")   /* baseFrequency 0.5, 5 octaves */
```

Classes `.paper-texture` and `.paper-texture-aged` apply the overlay with `multiply` blend (light) / `screen` blend (dark).

---

## Default Color Palette

Consumer-overridable HSL tokens. Light values; dark overrides in `.dark {}`.

```
--background:          hsl(0 0% 100%)
--foreground:          hsl(222.2 84% 4.9%)
--card:                hsl(0 0% 100%)
--primary:             hsl(222.2 47.4% 11.2%)
--secondary:           hsl(210 40% 96.1%)
--accent:              hsl(210 40% 96.1%)
--destructive:         hsl(0 84.2% 60.2%)
--muted:               hsl(210 40% 96.1%)
--muted-foreground:    hsl(215.4 16.3% 46.9%)
--ring:                hsl(222.2 84% 4.9%)
```

### Status

```
--color-status-active:  hsl(142 71% 45%)   /* green */
--color-status-paused:  hsl(48 96% 53%)    /* amber */
--color-status-idle:    var(--muted-foreground)
```

### Gold

```
--color-gold:       hsl(43 74% 49%)   /* #D49819 */
--color-gold-light: hsl(51 100% 50%)  /* #FFD900 */
--color-gold-dark:  hsl(34 87% 38%)   /* #B56D11 */
```

### Rainbow vivid / pastel (7 hues each, 0° → 300°)

`--rainbow-red`, `--rainbow-orange`, `--rainbow-yellow`, `--rainbow-green`, `--rainbow-blue`, `--rainbow-indigo`, `--rainbow-violet`, plus `--rainbow-pastel-*` desaturated counterparts.

### Blue shimmer

```
--shimmer-blue-dark:  hsl(224 76% 40%)
--shimmer-blue-mid:   hsl(217 91% 60%)
--shimmer-blue-light: hsl(213 94% 68%)
```

### Heatmap (10 levels)

`--heatmap-{1..10}-bg` and `--heatmap-{1..10}-fg`, pale red → deep red in light mode, inverted in dark mode.

---

## Component Catalog

### UI primitives (`src/components/ui/`)

accordion · alert · avatar · badge · button · card · carousel · checkbox · collapsible · combobox · command · context-menu · data-table · dialog · drawer · dropdown-menu · hover-card · input · label · multi-select · notification · number-field · popover · progress · radio-group · scroll-area · scroll-pane · select · separator · sheet · skeleton · slider · switch · table · tabs · tags-input · textarea · toast · toggle · toggle-group · tooltip.

### Custom composites (`src/components/custom/`)

animation · aurora · confirm-dialog · controls · **dock** (`GlassDock`, `DockLayer`, `DockLayerGroup`, `DockIconButton`, `DockSelectTrigger`, `DockDropdownTrigger`, `DockPopover`) · expandable-container · form · glass-carousel · glass-panel · icon-tooltip · infinite-scroll · labeled-field · **metric-badge** · metaballs · **pulse** · search · sidebar · sortable-list · stacked-icons · tabs (BouncyTabs, UnderlineTabs, BouncyToggle) · timeline · toggle-chip · typewriter.

### Key component specs

**`Skeleton`** — `<Skeleton variant="pulse" | "shimmer" class="..." />`. Pulse: `animate-pulse rounded-md bg-muted`. Shimmer: sliding gradient sweep 90°, from `var(--muted)` at 25% / 75% to `color-mix(in srgb, var(--muted-foreground) 30%, transparent)` at 50%, `background-size: 200% 100%`, 1.5 s linear loop. Reduced-motion disables animation.

**`Pulse`** — `<Pulse :count="3" variant="dots|ring" speed="slow|normal|fast" />`. Dots: count-many 6 × 6 px rounded circles with current-color background, staggered `pulse-dot-bounce` animation (opacity 0.35 → 1 → 0.35, scale 0.8 → 1.2 → 0.8). Ring: 16 × 16 px current-color border with transparent top, linear spin. `--pulse-duration` mapped from `speed` prop to `--duration-slow|panel|fast`. Reduced-motion → animation none, opacity 0.6.

**`MetricBadge`** — `<MetricBadge :amount="str|num" :unit="str" :color="hex" :placeholder="—" />`. Inline-flex, baseline-aligned, `max-w-32`, overflow-hidden. Amount: `text-mono-micro font-semibold tabular-nums`, colored with prop when amount is truthy, muted-foreground/40 when falsy. Unit: `text-micro font-mono text-muted-foreground`. Interactive: `hover:scale-110 hover:shadow-md active:scale-95`.

### Composables (`src/composables/`)

Dock: `useDockState`, `useLayerTransition`. Sorting: `useSortable`. Sidebar: `useTreeIndex`, `useScrollTracker`, `useSidebarFollow`, `useSidebarState`, `buildTreeIndex`. Effects: `useGlobalDark`, `useKeyboardShortcuts`. Infinite scroll: `useInfiniteScroll`.

Motion: `useSpringOrchestrator`, `useStaggerReveal`, `useScrollProgress`, `useAnimatedNumber`, `useDarkModeSync`. `useAnimatedNumber` wraps keyframes.js `SmoothProgress.play` to expose a reactive hysteresis-smoothed value for live numeric tracking (hero values, pill amounts, progress bars). Not a typewriter — the target glides toward a moving signal via exponential damping. `useDarkModeSync` (Tranche G) encapsulates the two-step `nextTick → requestAnimationFrame` dance required to react to dark-mode toggles in code that reads computed CSS variables (canvas renderers etc.).

### Progress component variants (Tranche G)

`<Progress>` accepts a `variant?: "default" | "gradient"` prop:

- **default**: `bg-secondary` rail + `bg-primary` indicator. Back-compat;
  every existing consumer renders unchanged.
- **gradient**: rail bg resolves from `var(--progress-track)` (with
  `bg-secondary` fallback); indicator bg resolves from
  `var(--progress-fill)` (with `bg-primary` fallback). Consumers paint
  arbitrary CSS values inline (linear-gradient, color-mix, hex, etc.):

  ```vue
  <Progress
      variant="gradient"
      :model-value="phaseProgress"
      :style="{ '--progress-fill': linearGradient, '--progress-track': trackColor }"
  />
  ```

  Replaces the `:deep(> *) { background: var(--progress-fill) }` workaround
  speedtest had been carrying — first-class API instead of breaking
  component encapsulation.

---

## Runtime Tokens (`@mkbabb/glass-ui/tokens`)

For Canvas 2D, echarts, and other consumers that cannot resolve CSS variables at render time, the library exposes concrete JS/TS constants:

```ts
import { chartHeights, chartMargin, chartColors, minWidthInputSm } from "@mkbabb/glass-ui/tokens";

chartHeights = { compact: 240, default: 360, large: 400 }
chartMargin  = 20
chartColors  = {
    dividerSubtle: "rgba(128, 128, 128, 0.05)",
    dividerMedium: "rgba(128, 128, 128, 0.4)",
    dividerStrong: "rgba(128, 128, 128, 0.7)",
}
minWidthInputSm = 80
```

Keep in sync with `tokens.css` when editing CSS tokens.

---

## Consumer Wiring

### Preset overrides

```css
:root {
    --font-display: "Instrument Serif", Georgia, serif;
    --glass-opacity-subtle: 0.82;
    --shadow-card: 3px 3px 0px 0px color-mix(in srgb, var(--shadow-color) 50%, transparent);
}

.dark {
    --meter-background-color: rgb(255 255 255 / 0.15);
}
```

### @theme extensions

```css
@theme {
    --color-th-accent: oklch(0.50 0.28 20);
    --height-chart-default: 22.5rem;
}
```

### Consumer utilities

```css
@utility btn-cta {
    @apply relative px-6 py-3 rounded-xl backdrop-blur-sm text-lg;
    @apply hover:scale-[1.02] hover:-translate-y-0.5;
    @apply active:scale-[0.98] active:translate-y-0;
    @apply disabled:opacity-[var(--opacity-disabled)] disabled:pointer-events-none;
}
```

### Component re-export

```ts
// consumer/components/ui/button/index.ts
export { Button, buttonVariants, type ButtonVariants } from "@mkbabb/glass-ui";
```

When a consumer needs shared styling tweaks, edit glass-ui source — add a variant to the CVA definition or a new CSS class. Consumer-side `:deep()` overrides signal that a token, slot-class prop, or variant is missing.


---

## Storybook (demo)

`npm run dev` launches a multi-page Vue storybook at the repo root. Use it as the canonical view of every primitive in its natural habitat — no synthetic isolation, live against real tokens.

### Navigation

- **Vertical `GlassDock` rail** (left) — `variant="rail"` with tooltip-backed category icons. Click an icon to swap categories.
- **Horizontal `Carousel` pager** (top of content) — chips for every story in the active category.
- **Keyboard**: `[` / `]` prev/next story · `{` / `}` prev/next category · `,` toggle configurator · `?` keyboard help.
- URL scheme `/:category/:story` with browser history — every page is linkable.

### Categories

| Category | What it covers |
|----------|----------------|
| Foundations | Intro, Colors (core / rainbow / accent / viz-basis), Typography, Radii, Shadows, Motion, Paper & Glass, Icons |
| Primitives | Buttons, Inputs, Textarea, Checkbox/Radio/Switch, Slider, NumberField, Select, Combobox, Multi-Select, Toggle, Label, Badge, MetricBadge, StatusDot, Pulse, Separator |
| Containers | Card, Dialog, Sheet, Drawer, Popover, DropdownMenu, ContextMenu, HoverCard, Tooltip, Alert, Accordion, Collapsible |
| Navigation | Tabs, BouncyTabs, Dock, DockLayers, Sidebar, Carousel, Command |
| Data | Table, DataTable, TagsInput, Avatar, SortableList, InfiniteScroll, Timeline |
| Feedback | Toast, Notification, Progress, Skeleton, ConfirmDialog |
| Motion | Transitions, Spring Orchestrator, Stagger Reveal, Scroll-driven Type, Typewriter |
| Compositions | Hero, Math-paper, Dashboard, Auth shell, Settings, Empty States, Aurora Playground |

### Adding a story

1. Create `demo/stories/<category>/<id>.vue`.
2. Append the row to the matching category in `demo/stories/manifest.ts` (helper `s(cat, id, title, blurb?)`).

The story loader is convention-based (`import.meta.glob`) — no router edits required.

### Configurator

Bottom-right FAB opens a `Sheet` with live controls for preset, font family (serif/sans/display/mono), scale base, hue rotation, grain opacity, density, radius, cartoon shadow, dark mode. Writes to `:root` CSS custom properties, persists to `localStorage['glass-ui-demo-config']`. The *neutral* preset in `demo/presets/neutral.css` showcases the library's range against its warm-cream default.
