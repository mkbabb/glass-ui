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

Thirteen-tier stacking, plus three out-of-band tiers. Overlay tier jumps from 50 → 120 so floating chrome (toasts, modals, popovers) clears any consumer content stacking up to 100.

| Token             | Value | Surfaces                             |
|-------------------|-------|--------------------------------------|
| `--z-background`  | 0     | Aurora, decorative layers            |
| `--z-content`     | 10    | Main content                         |
| `--z-controls`    | 20    | Inline controls                      |
| `--z-bar`         | 30    | Status bars                          |
| `--z-header`      | 35    | Headers                              |
| `--z-dock`        | 40    | Docks                                |
| `--z-panel`       | 45    | Floating editor panels               |
| `--z-overlay`     | 50    | Full-screen overlays                 |
| `--z-hovercard`   | 120   | Hover cards                          |
| `--z-tooltip`     | 120   | Tooltips (coequal with hover cards)  |
| `--z-popover`     | 130   | Popovers, dropdowns                  |
| `--z-modal`       | 140   | Dialogs, sheets                      |
| `--z-fullscreen`  | 150   | Fullscreen takeovers                 |
| `--z-toast`       | 160   | Toast notifications                  |
| `--z-toggle`      | 999   | Floating UI toggles (configurator)   |
| `--z-max`         | 9999  | Emergency escape hatch               |
| `--z-debug`       | 99999 | Debug overlays                       |

---

## Border Radius

| Token            | Value              | Pixel (at 16 px base) | Use                        |
|------------------|--------------------|-----------------------|----------------------------|
| `--radius`       | 0.625rem           | 10 px                 | Default                    |
| `--radius-xs`    | 4px                | 4 px                  | Smallest                   |
| `--radius-sm`    | 4px                | 4 px                  | Tight corners (kbd, badge) |
| `--radius-md`    | 6px                | 6 px                  | Medium                     |
| `--radius-lg`    | var(--radius)      | 10 px                 | Interactive                |
| `--radius-xl`    | 12px               | 12 px                 | Panels                     |
| `--radius-2xl`   | 1rem               | 16 px                 | Large cards, dialogs       |
| `--radius-pill`  | 9999px             | 9999 px               | Pills                      |
| `--radius-card`  | var(--radius-2xl)  | 16 px                 | Card surfaces              |
| `--radius-panel` | var(--radius-xl)   | 12 px                 | Panels                     |
| `--radius-dialog`| var(--radius-2xl)  | 16 px                 | Modal dialogs              |
| `--radius-input` | var(--radius)      | 10 px                 | Inputs                     |
| `--radius-button`| var(--radius)      | 10 px                 | Buttons                    |
| `--radius-badge` | var(--radius-pill) | 9999 px               | Badges                     |
| `--radius-dock`  | var(--radius-pill) | 9999 px               | Dock container             |

---

## Shadows

### Elevation scale

Every shadow recipe uses `color-mix(in srgb, var(--shadow-color) N%, transparent)` so dark mode and consumer-overridden `--shadow-color` flow through automatically.

```
--shadow-xs:   0 1px 3px color-mix(in srgb, var(--shadow-color) 4%, transparent),
               0 1px 2px color-mix(in srgb, var(--shadow-color) 6%, transparent);
--shadow-sm:   0 2px 8px  color-mix(in srgb, var(--shadow-color) 6%, transparent);
--shadow-md:   0 4px 16px color-mix(in srgb, var(--shadow-color) 8%, transparent);
--shadow-lg:   0 4px 20px color-mix(in srgb, var(--shadow-color) 12%, transparent);
--shadow-xl:   0 8px 24px color-mix(in srgb, var(--shadow-color) 14%, transparent);
--shadow-2xl:  0 25px 50px -12px color-mix(in srgb, var(--shadow-color) 25%, transparent);
```

### Cartoon shadows (offset, layered)

Tiered cartoon shadows feed `--shadow-color` through `color-mix` so dark mode and consumer overrides flow through.

```
--shadow-cartoon-sm: -3px 2px 1px color-mix(in srgb, var(--shadow-color) 10%, transparent),
                      0   3px 1px color-mix(in srgb, var(--shadow-color) 10%, transparent),
                     -3px 3px 1px color-mix(in srgb, var(--shadow-color)  6%, transparent);

--shadow-cartoon-md: -4px 3px 1px color-mix(in srgb, var(--shadow-color) 12%, transparent),
                      0   4px 1px color-mix(in srgb, var(--shadow-color) 12%, transparent),
                     -4px 4px 2px color-mix(in srgb, var(--shadow-color)  8%, transparent);

--shadow-cartoon-lg: -6px 4px 1px color-mix(in srgb, var(--shadow-color) 12%, transparent),
                      0   6px 1px color-mix(in srgb, var(--shadow-color) 12%, transparent),
                     -6px 6px 2px color-mix(in srgb, var(--shadow-color)  8%, transparent);
```

The single-token `--shadow-cartoon` (default) and `--shadow-cartoon-hover` recipes are `3px 3px 0 0 color-mix(... var(--foreground) 8%, transparent)` and `4px 4px 0 0 color-mix(... var(--foreground) 10%, transparent)` respectively (dark mirror drops the alpha to 6% / 8%).

### Card flat-offset shadows

```
--shadow-card: var(--shadow-cartoon);
```

Card defaults to the cartoon-tier offset; consumers wanting a heavier hover use `--shadow-cartoon-hover` directly. (`--shadow-card-hover` no longer ships.)

### Dock shadows

```
--shadow-dock:           0 4px 20px color-mix(in srgb, var(--shadow-color) 18%, transparent),
                         0 0 0 1px  color-mix(in srgb, var(--shadow-color) 10%, transparent);
--shadow-dock-collapsed: 0 2px 12px color-mix(in srgb, var(--shadow-color) 14%, transparent),
                         0 0 0 1px  color-mix(in srgb, var(--shadow-color) 10%, transparent);
```

### Glass-tier shadows

```
--glass-shadow-subtle:   var(--shadow-sm), var(--glass-highlight);
--glass-shadow-default:  var(--shadow-md), var(--glass-highlight);
--glass-shadow-medium:   var(--shadow-lg), var(--glass-highlight);
--glass-shadow-elevated: var(--shadow-xl), 0 0 0 0.5px color-mix(in srgb, var(--shadow-color) 5%, transparent), var(--glass-highlight);
```

---

## Glass Surfaces

Four tiers compose background opacity, backdrop-blur, border, shadow, grain. Dark mode boosts opacity and shifts grain blend (`overlay` → `soft-light`) for legibility.

| Tier     | Class              | Light opacity | Dark opacity | Blur                        | Border               | Shadow                   | Use                                 |
|----------|--------------------|---------------|--------------|-----------------------------|----------------------|--------------------------|-------------------------------------|
| Subtle   | `.glass-subtle`    | 82%           | 90%          | `blur(1px) saturate(1.05)`  | 8% foreground        | `--glass-shadow-subtle`   | Dock bg, input bg, hover overlays   |
| Default  | `.glass-default`   | 50%           | 58%          | `blur(3px)`                 | 10% foreground       | `--glass-shadow-default`  | Cards, containers, select triggers  |
| Medium   | `.glass-medium`    | 65%           | 72%          | `blur(3px) saturate(1.3)`   | 12% foreground       | `--glass-shadow-medium`   | Popovers, dropdowns, dock expanded  |
| Elevated | `.glass-elevated`  | 80%           | 88%          | `blur(4px) saturate(1.4)`   | 15% foreground       | `--glass-shadow-elevated` | Dialogs, command palette, modals    |

Blur radii were halved twice — first in v0.4 (speedtest tranche N.W1), again in v0.5.1 (speedtest tranche O.W2) — to feather the dock + meter card to a barely-perceptible diffusion that lets aurora bleed through cleanly. The `default` tier emits no `saturate()` filter; the other three keep their saturation lift.

### Tokens per tier

For each tier, `--glass-bg-{tier}` (rgba), `--glass-blur-{tier}` (full filter string), `--glass-border-{tier}` (color-mix result), `--glass-shadow-{tier}` (box-shadow). Grain overlay:

- Light mode: 3.5% opacity, blend `overlay`
- Dark mode: 6% opacity, blend `soft-light`

**Dock-specific blur** — `--glass-blur-dock = blur(1px) saturate(1.025)` is its own token (matches the subtle radius after the v0.4/v0.5.1 halvings) so floating and rail docks read as feather-light overlays rather than heavy blurred slabs. `GlassDock` references `var(--glass-blur-dock, var(--glass-blur-subtle))`; consumers can override the dock token at `:root` without touching the four tier blurs.

**Chassis-specific opacity** — `--glass-opacity-chassis: 0.28` light / `0.36` dark, composed at `--glass-bg-chassis` (`color-mix(in srgb, var(--card) calc(var(--glass-opacity-chassis) * 100%), transparent)`). Sits between dock (0.32) and default (0.50) so the wide-footprint `<InstrumentChassis>` surface reads as glass-over-aurora rather than an opaque slab. Lands as part of the chassis composition for consumers that compose their own large-surface instrument; the tier is its own opacity primitive (mirrors the dock-tier pattern) and inherits the default-tier `--glass-blur-default` + `--glass-border-default` + `--glass-shadow-default`.

**Chassis curvature illusion** — `--glass-curvature-overlay = radial-gradient(ellipse at 50% -20%, hsl(0 0% 100% / 0.06), transparent 60%)`. Composed into the chassis bg stack so the surface lifts very slightly at the top centre; dark companion preserves the same alpha against the lifted dark grain.

### Convenience shorthands

- `.glass-card` — **static surface utility**: `.glass-default` + `border-radius: var(--radius-card)` + offset card shadow. No hover lift; interactive cards live in `<Card>` (which composes its own hover via `.glass-cartoon` / `.cartoon-card` / etc.) or in components that explicitly opt into a hover variant. The `.glass-card:hover` rule was removed because conflating a static surface with an interactive primitive forced every consumer of the utility (badges, pills, panels) to fight off an unwanted lift.
- `.glass-cartoon` — **interactive cartoon surface** (Tranche G): cartoon-tier shadow (`--shadow-cartoon-md`), 2px border, hover lift via `--lift-sm` + `--shadow-cartoon-lg`. Token-fall-through to default-tier glass tokens (`--glass-bg-cartoon, var(--glass-bg-default)`) so consumers without cartoon-specific overrides still get a coherent surface. Closes the contract `Card.vue variant="cartoon"` outputs.

(`.glass-pill` was an earlier shorthand that no longer ships — pill geometry composes via `.btn-pill` + a glass tier when needed.)

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
| `--tracking-tightest` | −0.04em     | −0.64        | Display-mega/ultra   |
| `--tracking-tight`    | −0.025em    | −0.4         | Headers, display     |
| `--tracking-snug`     | −0.01em     | −0.16        | Subtle tightening    |
| `--tracking-normal`   | 0           | 0            | Default body         |
| `--tracking-wide`     | 0.025em     | 0.4          | Captions, labels     |
| `--tracking-wider`    | 0.05em      | 0.8          | Uppercase mono       |
| `--tracking-caps`     | 0.1em       | 1.6          | Section labels (caps)|

### Typography Tokens

| Token            | Value                                                       | Semantic Use                                          |
|------------------|-------------------------------------------------------------|-------------------------------------------------------|
| `--font-display` | Fraunces (variable; `opsz`/`wght`/`SOFT`/`WONK`)            | Ornamental display voice; headings with personality   |
| `--font-serif`   | Computer Modern Serif → Georgia fallback                    | Body, prose, headings, math                           |
| `--font-brand-sans` | Helvetica Neue → Arial → system-ui                       | Brand/system sans stack used by presets and overrides |
| `--font-sans`    | `var(--font-brand-sans)`                                    | System sans fallback (rarely direct)                  |
| `--font-mono`    | Fira Code → Fira Mono → monospace                           | Code, monospace, admin labels                         |
| `--font-display-variation-settings` | `"WONK" 1, "SOFT" 0`                    | Display font axis defaults                            |
| `--font-display-weight` | 400                                                 | Display utility weight default                        |

```css
--font-display: "Fraunces", Georgia, serif;                                         /* display voice */
--font-serif:   "Computer Modern Serif", "Latin Modern Roman", "CMU Serif", Georgia, serif; /* body serif */
--font-brand-sans: "Helvetica Neue", "Arial Nova", Arial, system-ui, sans-serif;    /* independent brand/system sans */
--font-sans:    var(--font-brand-sans);                                             /* system sans */
--font-mono:    "Fira Code", "Fira Mono", monospace;
--font-display-variation-settings: "WONK" 1, "SOFT" 0;
--font-display-weight: 400;
```

Consumers override these tokens at `:root` (not just `@theme` at-rules
— `@theme` may not propagate into already-emitted `@utility` rules at
evaluation time, so consumer-side cascade leaks are real). Consumers
that need a uniform sans voice set `--font-brand-sans` and apply the
root preset:

```html
<html data-typography-preset="brand-uniform-sans">
```

The preset maps `--font-serif` and `--font-display` to
`--font-brand-sans`, normalizes display font variation settings, and
sets `--font-display-weight` for a non-Fraunces display stack.

`--font-sans` was previously aliased to `--font-serif`, which collapsed the
two semantic identities and confused consumers that overrode `--font-serif`
for branding. It now resolves to its own system stack; consumers override
per-app for brand sans without touching the serif voice.

Fraunces axes available: `wght` (300–700), `opsz`, `WONK` (0–1), `SOFT` (0–100).

### Semantic typography classes

All five display rungs share `font-weight: var(--font-display-weight)` (= 400). The historical 300/350 ladder predated the warm-cream identity and no longer ships.

| Class                  | Font         | Size                 | Weight | Line    | Tracking  | Axes                        |
|------------------------|--------------|----------------------|--------|---------|-----------|-----------------------------|
| `.text-display-ultra`  | display      | `--type-display-ultra` | 400  | 1.1     | tightest  | `"WONK" 1, "SOFT" 100, "wdth" 115` (literal) |
| `.text-display-mega`   | display      | `--type-display-mega`  | 400  | 1.1     | tightest  | `"WONK" 1, "SOFT" 100, "wdth" 112` (literal) |
| `.text-display-5`      | display      | `--type-display-5`   | 400    | 1.1     | tight     | `"WONK" 1, "SOFT" 100, "wdth" 110` (literal) |
| `.text-display-4`      | display      | `--type-display-4`   | 400    | 1.1     | tight     | `"WONK" 1, "SOFT" 75, "wdth" 108` (literal) |
| `.text-display-3`      | display      | `--type-display-3`   | 400    | 1.1     | tight     | `"WONK" 1, "SOFT" 50, "wdth" 105` (literal) |
| `.text-display-2`      | display      | `--type-display-2`   | 400    | 1.1     | tight     | `var(--font-display-2-variation-settings)` = `"WONK" 1, "SOFT" 25, "wdth" 102` |
| `.text-display`        | display      | `--type-display-1`   | 400    | 1.1     | tight     | `var(--font-display-1-variation-settings)` = `"WONK" 1, "SOFT" 0, "wdth" 100` |
| `.text-title`          | serif        | `--type-title`       | 700    | 1.2     | tight     | —                           |
| `.text-heading`        | serif        | `--type-heading`     | 700    | 1.2     | normal    | —                           |
| `.text-subheading`     | serif        | `--type-subheading`  | 600    | 1.5     | normal    | —                           |
| `.text-prose`          | serif        | `--type-prose`       | 400    | 1.618   | normal    | —                           |
| `.text-body`           | serif        | `--type-body`        | 400    | 1.5     | normal    | —                           |
| `.text-small`          | serif        | `--type-small`       | 400    | 1.4     | normal    | —                           |
| `.text-caption`        | serif        | `--type-caption`     | 400    | 1.3     | normal    | italic                      |
| `.text-micro`          | (inherit)    | `--type-micro`       | —      | 1.25    | —         | —                           |
| `.text-admin-label`    | mono         | `--type-admin-label` (10 px) | 500 | 1   | caps      | `text-transform: uppercase` |
| `.text-math`           | serif        | (inherit)            | —      | —       | —         | italic                      |
| `.text-math-body`      | serif        | `--type-prose`       | —      | 1.618   | —         | italic                      |
| `.text-mono-caption`   | mono         | `--type-caption`     | 500    | (none)  | wider     | `text-transform: uppercase` |
| `.text-mono-small`     | mono         | `--type-small`       | —      | 1.4     | normal    | —                           |
| `.text-mono-micro`     | mono         | `--type-micro`       | —      | 1.25    | 0.025em   | —                           |
| `.text-mono-prose`     | mono         | `--type-prose`       | 500    | 1.5     | 0.02em    | tabular-nums alongside (Q.W2.B `4fb163d` — 18px Fira Code; consumer for the audacious MetricBadge xl pill amount) |
| `.text-pane-title`     | display      | `clamp(2.4rem, 1.8rem + 2vw, 3.33rem)` (≥ 640 px → `--type-display-3`) | 400 | 1.1 | tight | `var(--font-display-variation-settings)` (`"WONK" 1, "SOFT" 0`) |
| `.text-engraved`       | (inherit)    | (inherit)            | —      | —       | —         | dual inset text-shadow; muted-foreground color |
| `.section-label`       | mono         | `--type-caption`     | —      | —       | caps      | `text-transform: uppercase`, muted-foreground color |

### Kinetic typography utilities

- **`.text-breathe`** — `animation: weight-breathe 4s ease-in-out infinite` (wght 300 → 500 → 300)
- **`.text-wonk-hover`** — rest `font-variation-settings: "WONK" 0, "SOFT" 100`; hover toggles to `"WONK" 1, "SOFT" 0`; transition 450 ms `--spring-smooth`
- **`.scroll-weight-reveal`** — `animation: weight-reveal linear both; animation-timeline: view(); animation-range: entry 0% cover 30%` (wght 100 → 400 + opacity 0.3 → 1)
- **`.char-stagger > .char`** — per-char `fade-in` 300 ms `--spring-smooth backwards`; `animation-delay: calc(var(--char-index, 0) * 30ms)`
- **`.text-glass-legible`** — halo text-shadow `0 0 12px color-mix(in srgb, var(--background) 50%, transparent), 0 0 4px color-mix(in srgb, var(--background) 30%, transparent)`
- **`.text-engraved`** — letter-pressed treatment that reads as type carved into a glass panel. Mutes by colour (`--muted-foreground`) and composes a dual inset text-shadow (`0 1px 0 background-30%, 0 -1px 0 foreground-8%`); never dims by alpha. Consumers compose with `[data-idle="true"]` or any rest-state hook so the active-state lift is colour-only.

All kinetic utilities respect `prefers-reduced-motion`: transforms eliminated, opacity fades preserved at `--duration-instant`.

---

## Buttons

### `Button` CVA component (primary API)

Base class `.btn-pill`:
- border-radius pill
- padding `0.5rem 1rem`
- font-size 1rem
- gap `0.375rem` (6 px)
- transition: explicit per-property list at `var(--duration-fast)` `var(--ease-standard)` covering background-color, border-color, box-shadow, color, opacity, transform (no `all`)
- `:focus-visible` → `outline: none; box-shadow: var(--focus-ring-shadow)`
- `:disabled` → `opacity: var(--opacity-disabled)` (0.50); `pointer-events: none`
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
- Hover: 85% bg lighten, 20% foreground border, full-opacity foreground color, `transform: scale(var(--scale-hover))`
- Active: `transform: scale(var(--scale-press))`
- Focus-visible: `outline: var(--focus-ring-width) solid var(--ring); outline-offset: var(--focus-ring-width)` (outline, not box-shadow)
- Disabled: `opacity: 0.35` (literal — intentionally heavier than `--opacity-disabled`'s 0.50), `cursor: not-allowed`
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
| `DockGroup`            | Inline-flex shelf wrapper with `density="compact|comfortable|spacious|audacious"`; renders an inner glass shelf via `data-tier="secondary"` so a pill cluster reads as one shelved row rather than free-floating chips | —                                                      | Pill clusters, secondary-tier control rows      |

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
- `density` — `compact | comfortable | spacious`; controls padding, gaps, layer height, and inherited dock control sizing through root-overridable CSS variables
- `<template #collapsed>` — summary content shown when compacted

### Density variables

`comfortable` is the default and keeps the historical dimensions. The
`compact` and `spacious` classes set these variables, each with a
consumer-overridable density token fallback:

```css
--dock-padding-block
--dock-padding-inline
--dock-control-size
--dock-layer-height
--dock-layer-gap
--dock-trigger-padding-block
--dock-trigger-padding-inline
--dock-tab-padding-block
--dock-tab-padding-inline
```

Density overrides are named by tier, for example
`--dock-density-compact-control-size`,
`--dock-density-compact-padding-block`,
`--dock-density-spacious-layer-height`, and
`--dock-density-spacious-gap`.

### Utilities

- `.dock-separator` — 1 px vertical divider, 50% dock-h tall, 15% foreground
- `.dock-spacer` — `flex: 1` for pushing items apart
- `DarkModeToggle size="control"` follows `--control-size` and `--control-icon-padding`.
- `DarkModeToggle size="dock"` follows `--dock-control-size` and `--dock-icon-padding`; a toggle placed inside `.glass-dock` defaults to dock sizing unless an explicit `sm`, `lg`, or `control` size is supplied.

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

| Type             | Components                                  | Tier       | Transition                              | Z-index              |
|------------------|---------------------------------------------|------------|-----------------------------------------|----------------------|
| Dialog           | `Dialog`, `DialogContent`                   | elevated   | `dialog-scale`                          | `--z-modal` (140)    |
| Popover          | `Popover`, `PopoverContent`                 | elevated   | `.popover-animate .slide-in-from-side`  | `--z-popover` (130)  |
| Dropdown         | `DropdownMenu`, `DropdownMenuContent`       | elevated   | `.popover-animate .slide-in-from-side`  | `--z-popover` (130)  |
| Sheet            | `Sheet`, `SheetContent`                     | —          | slide from side                         | `--z-modal` (140)    |
| Hover card       | `HoverCard`, `HoverCardContent`             | —          | `fade-slide`                            | `--z-hovercard` (120)|
| Tooltip          | `Tooltip` + `TooltipProvider`               | —          | fade                                    | `--z-tooltip` (120)  |
| Floating panel   | `.floating-panel`                           | medium     | `floating-panel-in`                     | `--z-overlay` (50)   |

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
| `pop`             | Scale + opacity                        | opacity 200 ms `--ease-out` + transform 450 ms `--spring-bouncy` | 200 ms `--ease-out`             | Badge / toast entrance         |
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

`animations.css` owns shimmer keyframes only. Text shimmer utility
classes, including `.gold-shimmer`, live in `utilities.css`.

### Utility animations

- `rainbow-hue` — hue-rotate 0 → 360°
- `shimmer-sweep` — background-position sweep
- `shake` — translateX ±4 px over 0.5 s

---

## Layout & Sizing Tokens

### Icons

```
--icon-xs:   0.75rem   (12 px)
--icon-sm:   0.875rem  (14 px)
--icon-md:   1rem      (16 px)
--icon-lg:   1.25rem   (20 px)
--icon-xl:   1.5rem    (24 px)
--icon-2xl:  2rem      (32 px)   /* audacious tier — empty states + section glyphs */
--icon-3xl:  3rem      (48 px)   /* hero feature glyphs */
--icon-mega: 4.5rem    (72 px)   /* mascot-scale display icons */
```

Utility classes `.icon-{xs,sm,md,lg,xl,2xl,3xl,mega}` set width + height (`utilities.css` §Skeuo). Tailwind aliases follow as `--size-icon-{xs..mega}`; `<IconStamp size="…">` consumes the same scale.

### Input & form constraints

```
--mask-fade-width:     1rem    (16 px)
--max-width-input:     24rem   (384 px)
--input-min-width-sm:  5rem    (80 px)
--min-width-input-sm:  var(--input-min-width-sm)
```

### Chart dimensions (consumer-facing tokens)

```
--chart-height-compact: 15rem   (240 px)
--chart-height-default: 22.5rem (360 px)
--chart-height-large:   25rem   (400 px)
--chart-margin:         1.25rem (20 px)
```

Tailwind exposure: `h-chart-compact`, `h-chart-default`, `h-chart-large`; `min-w-input-sm`; `m-chart-margin`, `mx-chart-margin`, `my-chart-margin`, and related spacing utilities backed by `--spacing-chart-margin`.

### Divider colors (for charts, overlays, echarts)

These are JS constants, not CSS variables. Exposed via `@mkbabb/glass-ui/tokens` for Canvas 2D / echarts consumers that can't resolve CSS at render time:

```ts
import { chartColors } from "@mkbabb/glass-ui/tokens";
// chartColors.dividerSubtle  → "rgba(128, 128, 128, 0.05)"
// chartColors.dividerMedium  → "rgba(128, 128, 128, 0.4)"
// chartColors.dividerStrong  → "rgba(128, 128, 128, 0.7)"
```

(Older docs referenced `--color-divider-{subtle,medium,strong}` CSS tokens; canon never declared them — only the JS constants exist.)

### Lift offsets (hover-lift utilities)

```
--lift-sm: -1px
--lift-md: -2px
--lift-lg: -4px
```

### Stacking overlaps (StackedIcons)

`--stack-overlap-sm` / `-md` / `-lg` are consumed by `<StackedIconGroup>` but are **consumer-defined** — the library does not declare defaults in `tokens.css`. Consumers set them at the wrapper or at `:root`:

```
/* consumer preset */
:root {
    --stack-overlap-sm: 0.375rem; /* 6 px */
    --stack-overlap-md: 0.5rem;   /* 8 px */
    --stack-overlap-lg: 0.625rem; /* 10 px */
}
```

### Border opacity scale

```
--border-opacity-light:  0.15
--border-opacity-medium: 0.25
--border-opacity-strong: 0.60
```

### Animation offsets

```
--motion-slide-sm: 3px
--motion-slide-md: 6px
--motion-slide-lg: 8px
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

Canon uses the standard semantic tokens — no `--color-status-*` aliases ship.

```
--success:           hsl(142 71% 45%)   /* green */
--warning:           hsl(38 92% 50%)    /* amber */
--info:              hsl(217 91% 60%)   /* blue */
--muted-foreground:  /* idle / paused fallback */
```

### Accent / section / shadow primitives

`--accent-pink` (`hsl(330 65% 55%)` / dark `hsl(335 55% 65%)`) and `--accent-red` (`hsl(0 72% 50%)` / dark `hsl(0 68% 62%)`) ship as canonical sibling alarm/error hues — live consumers exist in `fourier-analysis/web` (morph viz) and several preset overrides. The `--shadow:` primitive (`hsl(24 10% 10%)` light / `hsl(0 0% 5%)` dark) feeds `--depth-color-shadow` in `.depth-text` and serves as the consumer-overridable foreground-shadow primitive (`bbnf-lang/playground` consumes it 8 times). `--section-heading` was retired in W1 — it had zero in-source consumers.

### Gold

`--gold` is the primitive; `--color-gold` is the `@theme` alias.

```
--gold:       hsl(43 74% 49%)   /* #D49819 */
--gold-light: hsl(51 100% 50%)  /* #FFD900 */
--gold-dark:  hsl(34 87% 38%)   /* #B56D11 */

/* @theme aliases for Tailwind utilities */
--color-gold:       var(--gold);
--color-gold-light: var(--gold-light);
--color-gold-dark:  var(--gold-dark);
```

### Rainbow vivid / pastel (irregular hue distribution)

The hue distribution is not a regular 0° → 300° sweep. Canon hues match the warm-cream palette:

```
/* vivid */
--rainbow-red:    hsl(  0 85% 60%)
--rainbow-orange: hsl( 30 90% 55%)
--rainbow-yellow: hsl( 55 90% 55%)
--rainbow-green:  hsl(130 70% 50%)
--rainbow-blue:   hsl(210 80% 55%)
--rainbow-indigo: hsl(260 70% 60%)
--rainbow-violet: hsl(300 75% 60%)

/* pastel */
--rainbow-pastel-red:    hsl(  0 50% 78%)
--rainbow-pastel-orange: hsl( 25 55% 76%)
--rainbow-pastel-yellow: hsl( 50 55% 78%)
--rainbow-pastel-green:  hsl(130 35% 74%)
--rainbow-pastel-blue:   hsl(220 45% 76%)
--rainbow-pastel-indigo: hsl(260 35% 76%)
--rainbow-pastel-violet: hsl(280 40% 78%)
```

---

## Component Catalog

### UI primitives (`src/components/ui/`)

accordion · alert · avatar · badge · button · card · carousel · checkbox · collapsible · combobox · command · context-menu · data-table · dialog · drawer · dropdown-menu · hover-card · input · label · multi-select · notification · number-field · popover · progress · radio-group · scroll-area · scroll-pane · select · separator · sheet · skeleton · slider · switch · table · tabs · tags-input · textarea · toast · toggle · toggle-group · tooltip.

### Custom composites (`src/components/custom/`)

animation · aurora · confirm-dialog · controls · **disco-glyph** (`DiscoGlyph`) · **dock** (`GlassDock`, `DockLayer`, `DockLayerGroup`, `DockGroup`, `DockIconButton`, `DockSelectTrigger`, `DockDropdownTrigger`, `DockPopover`) · expandable-container · form · glass-carousel · glass-panel · **glyph-face** (`GlyphFace`) · **hover-popover** (`HoverPopover`) · icon-tooltip · infinite-scroll · **instrument-chassis** (`InstrumentChassis`, `RegionDivider`) · labeled-field · **metric-badge** · metaballs · **pulse** · search · sidebar · sortable-list · stacked-icons · tabs (BouncyTabs, UnderlineTabs, BouncyToggle) · timeline · toggle-chip · typewriter.

### Key component specs

**`Skeleton`** — `<Skeleton variant="pulse" | "shimmer" class="..." />`. Pulse: `animate-pulse rounded-md bg-muted`. Shimmer: sliding gradient sweep 90°, from `var(--muted)` at 25% / 75% to `color-mix(in srgb, var(--muted-foreground) 30%, transparent)` at 50%, `background-size: 200% 100%`, 1.5 s linear loop. Reduced-motion disables animation.

**`Pulse`** — `<Pulse :count="3" variant="dots|ring" speed="slow|normal|fast" />`. Dots: count-many 6 × 6 px rounded circles with current-color background, staggered `pulse-dot-bounce` animation (opacity 0.35 → 1 → 0.35, scale 0.8 → 1.2 → 0.8). Ring: 16 × 16 px current-color border with transparent top, linear spin. `--pulse-duration` mapped from `speed` prop to `--duration-slow|panel|fast`. Reduced-motion → animation none, opacity 0.6.

**`MetricBadge`** — `<MetricBadge :size="sm|md|lg|xl" :amount="str|num" :unit="str" :color="hex" :placeholder="—" />`. Inline-flex, baseline-aligned, `max-w-32`, overflow-hidden. Q.W2.B (`0fa6980` + `ce0c56d`) lifted the size enum to four rungs with the ladder `sm 11px / md 12px / lg 14px / xl 18px` (md was previously dead-equal to sm at 11px — `ce0c56d` re-mapped md to `text-mono-caption` 12px to close that latent equality). The `xl` rung consumes `.text-mono-prose` for the amount (18px Fira Code) and `.text-prose` for the unit; `sm/md/lg` continue to consume `text-mono-micro` / `text-mono-caption` / (default) at their respective sizes. Amount: `font-semibold tabular-nums`, colored with prop when amount is truthy, muted-foreground/40 when falsy. Unit: `font-mono text-muted-foreground`. Interactive: `hover:scale-110 hover:shadow-md active:scale-95`. The `size` prop scales the typographic ladder for the audacious-canon use (consumer-side `useMediaQuery` selects `xl` ≥720, `lg` ≥480, `sm` below per the speedtest Q.W2.A `d779591` ladder).

**`GlyphFace`** — `<GlyphFace :tint="hex|undefined" :active="bool" :silhouette="path-d|clip-path">`. Three-layer wrapper around a slotted lucide glyph: a phase-tinted radial backplate (visible only when `[data-active="true"]`), the slotted silhouette (stays `currentColor` so the Vignelli-clean idle reading holds), and a 165° linear-gradient catch-light cap. Q.W3 (`64b3488`; `release/0.7.x` cherry-pick `cfc3311`) flipped the cap to clip-to-silhouette by default — when no silhouette resolves (neither prop nor inject), the cap renders nothing rather than its prior square-bounded shape. Consumers that want the legacy square cap pass `:silhouette="null"` plus an explicit `--gf-cap-radius` override. Four CSS knobs:

- `--gf-tint` — backplate hue (defaults `transparent`).
- `--gf-cap-strength` — cap-gradient white-stop alpha (defaults `0.55` light / `0.45` dark per Q.W3 — lifted from the pre-Q `0.35 / 0.22` so the cap reads against the chassis-tier translucent substrate).
- `--gf-cap-blend` — cap `mix-blend-mode` (defaults `screen` per Q.W3 — composes correctly against translucent substrates; the pre-Q `overlay` muddied the cap when stacked on chassis-tier glass).
- `--gf-cap-radius` — cap clip radius (defaults `50%`; ignored when a silhouette resolves).

`silhouette` accepts an SVG path d-attribute or a raw `clip-path` value, and **provide/inject path** — DiscoGlyph (and any disco-skeu primitive) emits its silhouette upward via `provide(GlyphFaceSilhouetteKey)` so a wrapping `<GlyphFace>` reads the silhouette without per-consumer prop plumb (closes the speedtest PrimaryAction case where the glyph swap re-renders without the wrapping consumer needing to re-pass the path). When the silhouette resolves through any path, `--gf-silhouette` injects into the cap so the cap clips to the glyph silhouette rather than the wrapper bounds — closes the residual square-leak path that capped non-circular wrapped glyphs. Without `active` the wrapper reads as a plain glyph holder and joins clusters that share the same edge-light + cap-radius register.

**`DiscoGlyph`** — `<DiscoGlyph :silhouette="path-d" :viewBox="0 0 24 24" :active="bool" :phaseColor="currentColor" :facetAxis="vertical|horizontal|diagonal">`. Three-layer SVG glyph primitive that paints the silhouette (1) filled `currentColor` so the lucide cascade carries through at idle, (2) overlaid by an 8-stop linear gradient that simulates ~6 facets cutting across the glyph face (driven by `phaseColor`; the `facetAxis` prop selects the gradient axis — `vertical` is the default, `horizontal` reads as panning facets, `diagonal` reads as a rotational catch — Q.W3 `64b3488`), (3) capped by a 165° catch-light gradient (white at the upper-left, transparent past 40%). `useId()` scopes the gradient ids so multiple glyphs on one page do not collide post-SSR/hydration. The primitive emits its silhouette upward via `provide(GlyphFaceSilhouetteKey, silhouette)` (Q.W3 `64b3488`) so a wrapping `<GlyphFace>` reads the path without per-consumer prop plumb — speedtest's PrimaryAction wraps `<GlyphFace>` around `<DiscoGlyph>` and the cap clips to the disco silhouette on every glyph swap. Speedtest's disco icons (Play / RotateCcw / ArrowRight / Check) are thin wrappers that pass only the silhouette path.

**`HoverPopover`** — `<HoverPopover :label="str" :side="auto|top|bottom|left|right" :align="auto|start|center|end" :open-delay="200" :close-delay="100">`. Q.W3 (`0cb88c2`; `release/0.7.x` cherry-pick `a042b61`) substrate primitive — adaptive-side / adaptive-align hover affordance with defer-on-leave behaviour (the popover defers its close on intra-popover hover so the user can move into the content). Composes glass-medium tier + popover token contract. Lands with named consumers in the same wave per the no-naked-substrate rule: speedtest's SettingsCog wraps in `<HoverPopover label="Settings">` and ActionCluster's three buttons each carry a HoverPopover label (Q.W3 cluster `b5731ca` + `8dca588`).

**Tier-primary `::before` phase backplate** — Q.W3 `7e8a809` (`release/0.7.x` cherry-pick `6dd2505`) added a `::before` phase-tint backplate scoped to the active phase on `<DockTabButton data-tier="primary">`. The pre-Q composition pinned the inner GlyphFace's `inset: -25%` halo inside `overflow: hidden` so it died at the pill boundary; the `::before` rule lifts the halo past the pill clip. Active phase reads `var(--phase-color)` at low chroma; the backplate fades to transparent when the active state releases. Composes alongside `--glass-specular` on hover; the two registers (specular catch-light + phase backplate) are independent — both fire on `data-active="true"` for the running primary.

**`InstrumentChassis`** — `<InstrumentChassis>` with `strip` / `dial` / `control` slots. Composes the chassis CSS once: `--glass-bg-chassis` + `--glass-blur-default` + `--glass-border-default` + `--glass-shadow-default` + the `--glass-curvature-overlay` lift + an engraved-bezel inner stroke + twin-line groove dividers between regions. Consumers render through the slots — speedtest, survey, thank-you all share the same chassis with different region content. `RegionDivider` ships the twin-line groove rule for nested splits. Q.W4.A lifted the light-mode bezel-line α from 0.04 / 0.06 to 0.10 / 0.12 so the divider reads against saturated-aurora bleed; dark-mode pair (0.06 / 0.18) stays. Lands on `o-w2_7-instrument-chassis` and cherry-picks into `release/0.7.x` as v0.7.1 patch.

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
import {
    chartHeights,
    chartMargin,
    chartColors,
    minWidthInputSm,
    NAMED_EASING_BEZIER,
} from "@mkbabb/glass-ui/tokens";

chartHeights = { compact: 240, default: 360, large: 400 }
chartMargin  = 20
chartColors  = {
    dividerSubtle: "rgba(128, 128, 128, 0.05)",
    dividerMedium: "rgba(128, 128, 128, 0.4)",
    dividerStrong: "rgba(128, 128, 128, 0.7)",
}
minWidthInputSm = 80

NAMED_EASING_BEZIER = {
    standard:       [0.4,   0,    0.2,  1],
    out:            [0,     0,    0.2,  1],
    in:             [0.4,   0,    1,    1],
    "out-expo":     [0.16,  1,    0.3,  1],
    apple:          [0.25,  0.1,  0.25, 1],
    "apple-spring": [0.175, 0.885, 0.32, 1.275],
}
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

---

## Tranche G additions

### Cream identity

The library's warm-cream base (hue 48) is now a public surface noun.

| Token                 | Light                | Dark            | Use                                            |
|-----------------------|----------------------|-----------------|------------------------------------------------|
| `--cream`             | `var(--neutral-0)`   | `var(--neutral-0)` (warm-charcoal) | Page surface (== `--background`) |
| `--cream-warm`        | `hsl(40 18% 96%)`    | `hsl(28 6% 8%)` | Warm tonal shift (paper-card, formula-block) |
| `--cream-cool`        | `hsl(54 8% 97%)`     | `hsl(40 5% 9%)` | Cool tonal shift                              |
| `--cream-edge`        | `var(--neutral-3)`   | `var(--neutral-3)` | Cream-surface border                       |
| `--cream-foreground`  | `var(--foreground)`  | `var(--foreground)` | Text on cream                              |

`@theme` aliases: `--color-cream`, `--color-cream-warm`, `--color-cream-cool`, `--color-cream-edge`, `--color-cream-foreground` → Tailwind utilities `bg-cream`, `bg-cream-warm`, etc.

Surface hooks: `.cream-surface` (utilities), `<Card variant="cream">`, `<CreamSurface>`.

### Paper tier

A sibling family to the four glass tiers — no `backdrop-filter`, no compositing tricks. Pure substrate. Tier values inline directly into the four `.paper-N` rules in `paper.css` rather than going through `--paper-bg/-shadow/-border-N` tokens (the per-tier tokens were retired in H.W1 for single-call-site usage).

| Tier       | Background (light → dark)              | Border (foreground-mix) | Shadow                                      |
|------------|----------------------------------------|-------------------------|---------------------------------------------|
| `.paper-1` | `var(--cream)` → unchanged             | 6%                      | `var(--shadow-cartoon-sm)`                  |
| `.paper-2` | `hsl(48 12% 97%)` → `hsl(24 7% 11%)`   | 9% → 12%                | `var(--shadow-cartoon-md)`                  |
| `.paper-3` | `hsl(48 10% 95%)` → `hsl(24 6% 14%)`   | 12% → 16%               | `var(--shadow-elevated)`                    |
| `.paper-4` | `hsl(48 8% 92%)`  → `hsl(24 5% 17%)`   | 16% → 22%               | `var(--shadow-modal)`                       |

Surface hooks: `.paper-1`, `.paper-2`, `.paper-3`, `.paper-4`, `.paper-card` (paper-2 + grain overlay + φ-spacing), `.paper-rule` (lined-paper tapered horizontal rule), `<Card variant="paper">`.

### Cartoon-shadow accent (modern-skeuomorphic axis)

Per G invariant 7: the modern-skeuomorphic axis is delivered by extending the cartoon-shadow family with an accent recipe — not by introducing a bevel pair. The mix percentage inlines as a literal (`15%` light / `18%` dark — `--cartoon-accent-mix` was retired in H.W1 as a single-call-site token).

| Token                    | Default                | Use                                        |
|--------------------------|------------------------|--------------------------------------------|
| `--cartoon-accent-color` | `var(--foreground)`    | Hook for accent-tinted shadow              |
| `--shadow-cartoon-accent`| `3px 3px 0px 0px color-mix(in srgb, var(--cartoon-accent-color) 15%, transparent)` (dark mirror lifts to 18%) | Composed recipe |

Consumers wire by overriding `--cartoon-accent-color` on the wrapper element.

### Display-mega / display-ultra typography rungs

Per G Design POV: audacious sizes go softer + slightly wider.

| Token                  | Value                              | Notes        |
|------------------------|------------------------------------|--------------|
| `--type-display-mega`  | `clamp(6.854rem, 5rem + 9vw, 11.089rem)`     | φ⁵ |
| `--type-display-ultra` | `clamp(11.089rem, 8rem + 12vw, 17.944rem)`   | φ⁶ |
| `--tracking-tightest`  | `-0.04em`                          | Display-mega/ultra ladder |

Per-rung Fraunces variation axes: `--font-display-1-variation-settings` and `--font-display-2-variation-settings` survive as named tokens because each has at least two consumers. Rungs 3..ultra inline their literal axes directly into their `@utility` blocks (the `--font-display-{3,4,5,mega,ultra}-variation-settings` tokens were retired in H.W1 for single-call-site usage). The literal values:

| Rung    | `WONK` | `SOFT` | `wdth` |
|---------|--------|--------|--------|
| display-1 | 1    | 0      | 100    |
| display-2 | 1    | 25     | 102    |
| display-3 | 1    | 50     | 105    |
| display-4 | 1    | 75     | 108    |
| display-5 | 1    | 100    | 110    |
| display-mega  | 1 | 100   | 112    |
| display-ultra | 1 | 100   | 115    |

Audacious sizes step `SOFT` to 100 and `wdth` to 110+; rung-1 keeps SOFT 0 / wdth 100 (canonical Fraunces). `@utility text-display-{mega,ultra}` and `<DisplayHero size="display-{mega,ultra}">` consume the rungs. Math typography uses the existing `--type-subheading` rung directly (the `--type-formula` alias was retired in H.W1).

### Iconography scale extension

| Token         | Value     | Use                              |
|---------------|-----------|----------------------------------|
| `--icon-2xl`  | `2rem`    | Empty states, section glyphs     |
| `--icon-3xl`  | `3rem`    | Hero feature glyphs              |
| `--icon-mega` | `4.5rem`  | Mascot-scale display icons       |

Generated `.icon-{xs..mega}` width+height utilities live in `utilities.css`; `<IconStamp size="…">` and `--size-icon-{xs..mega}` Tailwind aliases follow.

### Mathematical axis

`math.css` is default-included via the `index.css` cascade. Consumers using `@import "@mkbabb/glass-ui/styles"` get math utilities automatically.

| Token / utility         | Use                                          |
|-------------------------|----------------------------------------------|
| `--space-phi-{1..4}`    | 0.618 / 1 / 1.618 / 2.618 rem golden-ratio rungs |
| `.math-display`         | KaTeX block container (overflow-x scroll)    |
| `.math-inline-pill`     | Chip-shaped inline math container            |
| `.formula-block`        | Cream-warm + accent left rule + tabular-nums + φ leading |
| `.text-formula`         | CM serif italic + tabular-nums + leading-prose |
| `.production-rule`      | BBNF-style `lhs ::= rhs` formal-grammar typography |
| `.perf-number`/`.perf-unit` | Numeric + unit pair typography           |

(Math typography sizes off the existing `--type-subheading` rung; the `--type-formula` alias retired in H.W1.)

Components: `<MathSurface>`, `<MathFormula accent="…">`, `<MathGlyph char="…">`.

### Blob primitive (sub-tranche β)

The Blob is the design language's mascot grammar. Specified in full at `docs/tranches/G/blob/SPEC.md`.

| Token                          | Default       | Use                                        |
|--------------------------------|---------------|--------------------------------------------|
| `--blob-color`                 | `var(--easing-accent)` | Per-instance accent (HSL recommended) |
| `--blob-border-mix`            | `12%` (light) / `16%` (dark) | Edge color-mix percentage |
| `--blob-border-mix-contrast`   | `24%` / `28%` | Active under `prefers-contrast: more`      |
| `--blob-grain-opacity`         | `0.04`        | Subtle paper-grain overlay                 |
| `--blob-chromatic-aberration`  | `0.002`       | WebGL shader uniform; NDC units            |
| `--blob-cast-shadow-y`         | `0.5rem`      | Cast-shadow y offset                       |
| `--blob-cast-shadow-blur`      | `1.5rem`      | Cast-shadow blur radius                    |
| `--blob-cast-shadow-mix`       | `18%` / `24%` | Color-mix percentage of `--blob-color` into `--foreground` |

Cast-shadow contract per SPEC.md §11.3: the `<Blob>` wrapper renders `box-shadow: 0 var(--blob-cast-shadow-y) var(--blob-cast-shadow-blur) color-mix(in srgb, var(--blob-color) var(--blob-cast-shadow-mix), var(--foreground))`.

Five moods (`idle | happy | curious | sleepy | excited`) × eleven blended parameters per `BLOB_MOOD_PARAMS`. Instance-local WebGL2 renderer with Canvas2D fallback; deterministic `mulberry32` PRNG seeding. Five §11 user locks documented.

### Shimmer family

| Utility                    | Notes                                          |
|----------------------------|------------------------------------------------|
| `.text-shimmer-gold`       | Single-hue gold gradient (consumes `--gold-{,light,dark}`) |
| `.text-shimmer-vivid`      | Full-rainbow sweep (vivid stops)                  |
| `.text-shimmer-pastel`     | Full-rainbow sweep (pastel stops)                 |

All three parameterize via `--shimmer-duration` (default `var(--duration-shimmer)`); animation `gold-shimmer-slide` slides the background-position.

(The `--shimmer-blue-{dark,mid,light}` tokens and `.text-shimmer-blue` utility were retired in H.W1 for failing the ≥ 2-call-site bar.)

### φ-spacing

| Token            | Value     | Tailwind utility       |
|------------------|-----------|------------------------|
| `--space-phi-1`  | `0.618rem` | `p-phi-1`, `gap-phi-1`, etc. |
| `--space-phi-2`  | `1rem`    | …                      |
| `--space-phi-3`  | `1.618rem` | …                      |
| `--space-phi-4`  | `2.618rem` | …                      |

Mapped via `@theme` block as `--spacing-phi-{1..4}`.

### Runtime tokens (under existing `@mkbabb/glass-ui/tokens` subpath)

| Export                  | Use                                         |
|-------------------------|---------------------------------------------|
| `chartHeights`, `chartMargin`, `chartColors`, `minWidthInputSm` | Chart geometry primitives (pre-G) |
| `NAMED_EASING_BEZIER`   | Runtime projection of canon `--ease-*` cubic-beziers (G addition that survived) |

No new public subpath — all under existing `@mkbabb/glass-ui/tokens`. (Four other G runtime helpers — `chartNeutrals`, `vizColorsHex`, `spectrumColor`, `goldenShimmer` — were retired in tranche H.W1 for failing the ≥ 2-call-site bar.)

### Retired tokens

Retired in tranche G.W1:

- `--section-heading` — truly orphan; retired in W1.
- `:root[data-typography-preset="brand-uniform-sans"]` block — single-presence orphan.

Retired in tranche H.W1 (all failed the ≥ 2-call-site bar):

- `--paper-bg-{1..4}`, `--paper-shadow-{1..4}`, `--paper-border-{1..4}` (12 tokens) — values inlined into the four `.paper-N` rules.
- `--cartoon-accent-mix` — value inlined as `15%` (light) / `18%` (dark) into `--shadow-cartoon-accent`.
- `--type-formula` — math typography uses `--type-subheading` directly.
- `--shimmer-blue-{dark,mid,light}` (3 tokens) and the `.text-shimmer-blue` utility.
- Per-rung Fraunces axis tokens for display-3, display-4, display-5, display-mega, display-ultra (5 tokens) — values inlined into each `@utility text-display-N` block. The display-1 + display-2 rung tokens survive as named tokens (each has at least two consumers).

`--accent-pink`, `--accent-red`, and the `--shadow:` alias retained per W0 evidence (live consumer call sites).

### Retired utility

- `.gold-shimmer` — replaced by `.text-shimmer-gold`. W5 ledgers name the consumer-side rename.
- `.text-shimmer-blue` — retired in H.W1 alongside its tokens.
