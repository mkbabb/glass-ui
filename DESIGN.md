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
| `--z-bar`         | 30    | Status bars                          |
| `--z-header`      | 35    | Headers                              |
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

### Uniform-cast shadow (offset 0)

```
--shadow-uniform: 0 0 12px color-mix(in srgb, var(--shadow-color) 8%, transparent);
```

Offset-0 elevation token, no directional Y bias. Use case: dock-hosted icons (rightmost child of a horizontal dock pill, where the dock's `--shadow-dock` `0 4px 20px` downward cast reads as a per-icon right-edge halo). Consumers compose via `--shadow-dock-override: var(--shadow-uniform)` per-instance, or attach to per-icon-button shadow stacks where directional cast is wrong-shape. Same color-mix recipe family as the sized rungs above; reads as a peer elevation. Added Z.W2.T3a per A2 §B7.

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
--glass-shadow-subtle:   var(--shadow-sm), var(--glass-highlight);
--glass-shadow-default:  var(--shadow-md), var(--glass-highlight);
--glass-shadow-medium:   var(--shadow-lg), var(--glass-highlight);
--glass-shadow-elevated: var(--shadow-xl), 0 0 0 0.5px color-mix(in srgb, var(--shadow-color) 5%, transparent), var(--glass-highlight);
```

---

## Glass Surfaces

Five tiers compose background opacity, backdrop-blur, border, shadow, grain. Dark mode boosts opacity and shifts grain blend (`overlay` → `soft-light`) for legibility. v0.8.0 renamed and extended the ladder: the prior four-rung ladder (subtle / default / medium / elevated) becomes a five-rung ladder (wash / quiet / resting / floating / overlay) — `quiet` is a new mid-low rung, `overlay` is a new modal-over-modal rung, and the others are renamed for tier semantics rather than utility-class register.

| Tier      | Class               | Light opacity | Dark opacity | Blur                          | Border               | Shadow                     | Use                                 |
|-----------|---------------------|---------------|--------------|-------------------------------|----------------------|----------------------------|-------------------------------------|
| Wash      | `.glass-wash`       | 30%           | 38%          | `blur(1px) saturate(1.05)`    | 8% foreground        | `--glass-shadow-wash`      | Dock bg, input bg, hover overlays   |
| Quiet     | `.glass-quiet`      | 50%           | 58%          | `blur(3px)`                   | 10% foreground       | `--glass-shadow-quiet`     | Inline workspace chrome             |
| Resting   | `.glass-resting`    | 65%           | 72%          | `blur(12px) saturate(1.05)`   | 12% foreground       | `--glass-shadow-resting`   | Cards, the canonical plate; **`<GlassPanel>` default** (canonical translucent + frosted)          |
| Floating  | `.glass-floating`   | 80%           | 88%          | `blur(16px) saturate(1.4)`    | 15% foreground       | `--glass-shadow-floating`  | Popovers, tooltips, dropdowns       |
| Overlay   | `.glass-overlay`    | 95%           | 96%          | `blur(24px) saturate(1.5)`    | 18% foreground       | `--glass-shadow-overlay`   | Dialogs, command palette, modals    |

### Tokens per tier

For each tier, `--glass-bg-{tier}` (rgba), `--glass-blur-{tier}` (full filter string), `--glass-border-{tier}` (color-mix result), `--glass-shadow-{tier}` (box-shadow), `--glass-blur-{tier}-radius` (raw blur radius). Grain overlay:

- Light mode: 3.5% opacity, blend `overlay`
- Dark mode: 6% opacity, blend `soft-light`

**Dock-specific blur** — `--glass-blur-dock` is its own token so floating and rail docks read as feather-light overlays rather than heavy blurred slabs. As of J.W3.C the radius is `0px` (compositor floor) + the `saturate()` channel is omitted; the dock's translucent register is carried by `--glass-bg-dock` (32 % card opacity) bleeding the backdrop through. `GlassDock` references `var(--glass-blur-dock, var(--glass-blur-wash))`; consumers can override the dock token at `:root` without touching the five tier blurs.

### N7 dock-blur perceptual audit (N.W2 Lane B — NO-OP)

User feedback at N open suggested "top dock blur is a bit much, and generally our dock blurs need to be resolved to be more subtle." Source-of-truth audit at HEAD:

| Surface | `backdrop-filter` value | Blur radius |
|---|---|---|
| `.glass-dock` (any dock; horizontal or vertical) | `blur(var(--glass-blur-dock-radius))` | **`0px`** |
| `.glass-wash`, `.glass-quiet`, ..., `.glass-overlay` | `blur(<tier-radius>) saturate(<tier-factor>)` | `1` / `3` / `12` / `16` / `24` px |

The dock filter contributes ZERO blur — the compositor still emits a backdrop-filter pass (the property is set + composes the `saturate(1.05)` from `--glass-blur-wash` if the dock token is missing, but with the dock token present the `saturate` channel is also omitted), but the radius is at the floor. Any perceived dock blur visible at the page level is contributed by the **backdrop** the dock sits over (e.g., `<Aurora>` or `<MetaballCanvas>` ambient layer); the dock is purely a translucent plate of `--glass-bg-dock` (32 % opacity) admitting backdrop pixels through.

Per N invariant 22 (audit-verdict spot-verification gate): the user's perception was real, but the source is the page-composition stacking, not the dock substrate. The right adjustment lives at the consumer site (reduce backdrop blur per-page; or lower aurora opacity; or use `<Aurora>`'s tone controls), not at the library token. The library token already holds the floor.

NO-OP for N.W2 Lane B. No token change; no cascade adjustment. The audit lands here for posterity.

### Canonical translucent + frosted (N.W1 Lane A — `<GlassPanel>` default)

`<GlassPanel>` (`src/components/custom/glass-panel/GlassPanel.vue`) defaults
to `variant="resting"`, which composes the `.glass-resting` recipe above:
**65% background opacity + 12 px backdrop-blur + 1.05 saturation + 12%
foreground border + grain overlay**. This is the canonical
"translucent + frosted" surface; consumers asking for "the translucent
frosted panel" should reach for `<GlassPanel>` (or `<Card>` for the
cartoon-shadowed sibling) without a tier override. No additional tier
ships at v1.1.1 — per the N KISS posture (V2 + V4 + wire-before-retire),
the existing resting rung already satisfies the brief; we verify the
rendering rather than invent.

Per N invariant 22 (audit-verdict spot-verification gate), this lane
verified at HEAD: `GlassPanel.vue`'s `VARIANT_CLASS.resting`
binding (line ~19) → `.glass-resting` utility → token recipe in
`src/styles/glass.css`. The grain overlay `::after` rule renders via
`paper-grain-overlay` composition. Visual inspection at consumer
build-time is the canonical verification path; library-side rendering
verification is asynchronous (Playwright-MCP or equivalent).

### Convenience shorthands

- `.glass-card` — **static surface utility**: `.glass-resting` + `border-radius: var(--radius-card)` + offset card shadow. No hover lift; interactive cards live in `<Card>` (which composes its own hover via `.glass-cartoon` / `.cartoon-card` / etc.) or in components that explicitly opt into a hover variant.
- `.glass-pill` — `.glass-resting` + pill radius + press feedback (scale 0.97 on active)
- `.glass-cartoon` — **interactive cartoon surface** (Tranche G): cartoon-tier shadow (`--shadow-cartoon-md`), 2px border, hover lift via `--lift-sm` + `--shadow-cartoon-lg`. Token-fall-through to resting-tier glass tokens (`--glass-bg-cartoon, var(--glass-bg-resting)`) so consumers without cartoon-specific overrides still get a coherent surface. Carried by the `<CartoonCard>` sibling primitive (v0.8.0).

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
| `--type-display-mega`      | clamp(5.382rem, 4rem + 9vw, 11.089rem)   | 86.1–177.4  | —         | Poster: section / pane title (v1.0.3) |
| `--type-display-hero`      | clamp(6.854rem, 4.5rem + 12vw, 17.942rem) | 109.7–287.1 | —        | Poster: page hero / metric value (v1.0.3) |
| `--type-display-audacious` | clamp(8.728rem, 5rem + 16vw, 22rem)      | 139.6–352   | —         | Fast.com-scale single number (v1.0.3) |

Consumers extending beyond display-audacious add tokens in their preset — the library exposes the mechanism, not every conceivable step.

### Audacious display tier (`--type-display-mega` / `-hero` / `-audacious`)

Added in **v1.0.3** (AA.W3.5). Three rungs above `display-5` for
poster-type consumers — the speedtest hero number, dashboard pane
titles where the consumer wants the number/title to win the visual
hierarchy, marketing-surface headlines. Same vw-axis as
`display-1..5`, so the size is consumer-agnostic; a consumer that
needs container-query precision (e.g. speedtest's `.metric-col`
container) wraps its own clamp with these tokens as the ceiling:

```css
/* speedtest SpeedtestResults.vue:763 — cqi axis with audacious ceiling */
font-size: clamp(6rem, calc(38cqi * 3 / max(3, var(--digit-count))), var(--type-display-audacious));
```

The φ-ladder progression (`√φ ≈ 1.272` between steps) continues
unbroken — every rung is one consistent step up the scale. Peak
sizes (at viewport ≥ 1440):

- `display-mega` → 177.4 px (φ^9/2 — pane titles, section heads)
- `display-hero` → 287.1 px (φ^5 — hero numbers, metric values)
- `display-audacious` → 352 px (φ^11/2 — fast.com peg for a single hero number)

The matching `.text-display-mega`, `.text-display-hero`,
`.text-display-audacious` utilities mirror the `.text-display-5`
shape — Fraunces with `WONK=1 / SOFT=0` and `var(--font-display-weight)`
by default; the `data-typography-preset="brand-uniform-sans"`
:root override still maps `--font-display` → `var(--font-brand-sans)`
so consumers in the brand-uniform-sans register get their stack at
the audacious size without any extra wiring.

Opt-out: consumers that want their own ceiling can ignore the tokens
entirely (and the existing `display-1..5` rungs remain) — the
audacious tier is additive, not a default. Consumers that consume
the tokens but want a smaller ceiling can reset them locally:
`:root { --type-display-audacious: 12rem; }`.

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

`.dock-label` is pinned to `var(--font-display)` so dock typography stays
consistent regardless of consumer body cascade tweaks.

Fraunces axes available: `wght` (300–700), `opsz`, `WONK` (0–1), `SOFT` (0–100).

### Semantic typography classes

| Class                  | Font         | Size                 | Weight | Line    | Tracking  | Axes                        |
|------------------------|--------------|----------------------|--------|---------|-----------|-----------------------------|
| `.text-display-audacious` | display   | `--type-display-audacious` | display-weight | 1.1 | tight | `WONK` 1, `SOFT` 0     |
| `.text-display-hero`   | display      | `--type-display-hero` | display-weight | 1.1 | tight | `WONK` 1, `SOFT` 0          |
| `.text-display-mega`   | display      | `--type-display-mega` | display-weight | 1.1 | tight | `WONK` 1, `SOFT` 0          |
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

| Variant              | Rest                                                                                            | Hover                                                       |
|----------------------|-------------------------------------------------------------------------------------------------|-------------------------------------------------------------|
| `default`            | Primary bg, primary-foreground text                                                             | `bg-primary/90`                                             |
| `primary-audacious`  | Primary bg + `@utility btn-audacious` recipe (disco-grain + sparkle-sweep + specular-highlight) | `scale-[var(--scale-hover)]` + recipe-internal hue lift     |
| `destructive`        | Destructive bg, destructive-foreground text                                                     | `bg-destructive/90`                                         |
| `outline`            | Border 70%, bg 60%, foreground text                                                             | 60% accent bg, 90% border                                   |
| `secondary`          | Secondary bg                                                                                    | `bg-secondary/80`                                           |
| `accent`             | `.btn-pill-accent` (opaque theme accent)                                                        | 90% opacity                                                 |
| `ghost`              | Transparent, 85% foreground                                                                     | 12% foreground bg                                           |
| `glass`              | `.glass-wash` + default border                                                                  | `--glass-shadow-resting`                                    |
| `glass-wash`         | `.glass-wash`                                                                                   | 60% border                                                  |
| `ai`                 | amber-500/15 bg, amber-700 text                                                                 | amber-500/25                                                |
| `link`               | Text-only, underline on hover                                                                   | underline                                                   |

`destructive` is the canonical "danger" variant (clears WCAG AA).

#### `primary-audacious` — K W6 architectural transposition (K HEADLINE)

K W6 lifted the disco-grain + sparkle-sweep + specular-highlight composite from `dock.css` (where it had lived under `.dock-tab-button[data-tier="primary"]`) into a canonical `@utility btn-audacious` in `src/styles/utilities.css`. The composite reads:

- **Disco-grain texture** — radial gradient noise band over the primary fill, anchored to `--primary` so the recipe inherits theme hue automatically.
- **Sparkle-sweep glyph** — `@keyframes sparkle-sweep` (already in `animations.css:151`) drives a diagonal specular streak across the button face on a long cadence, PRM-gated via `prefers-reduced-motion: no-preference` (matches the `.gold-shimmer` precedent).
- **Specular-highlight backplate** — soft white-stop highlight at upper-left composing against the disco-grain layer for the "polished plastic" reading.

Existing tokens consumed: `--primary`, `--shadow-cartoon`, `--surface-tint-*`, `--scale-press-btn`, `--scale-hover`, `--duration-sparkle`, `--ease-apple-spring`. No new keyframes were introduced.

**Phase-color decoupling — Option B (per K W6 decision per Rε E3 recommendation)**: the canonical `@utility btn-audacious` recipe binds the radial to `--primary`, NOT to `--phase-color`. The recipe is reusable from any audacious primary-CTA context without inheriting an instrument-chassis phase cascade. The dock primary tier composes the canonical recipe via class-list inclusion (`btn-audacious` on `.dock-tab-button[data-tier="primary"]`) AND retains a dock-local extension that overrides the radial with `--phase-color` when a dock descendant of `<InstrumentChassis>` sets the phase variable. This keeps the canonical recipe axis-agnostic (≥ 2 consumer bar met: `<Button variant="primary-audacious">` + dock primary tier) while preserving the chassis-aware phase-tint flourish where it earns its keep.

All variants scale `var(--scale-press-btn)` on `:active`.

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

---

## Badges

### `Badge` CVA component

Pill primitive for inline metadata, status chips, and count indicators. CVA root composes `focus-ring inline-flex items-center rounded-full border font-semibold transition-colors`; the `variant` axis paints fill+border and the `size` axis governs typography + padding.

### Variants

| Variant       | Rest                                                  |
|---------------|-------------------------------------------------------|
| `default`     | Primary bg, primary-foreground text, transparent border |
| `secondary`   | Secondary bg, secondary-foreground text                |
| `destructive` | Destructive bg, destructive-foreground text            |
| `outline`     | Foreground text on transparent fill, border-from-context |

### Sizes (J.W6 size axis)

| Size  | Typography           | Padding         | Use                                                        |
|-------|----------------------|-----------------|------------------------------------------------------------|
| `sm`  | `text-xs leading-4`  | `px-2 py-0.5`   | Sits inside `text-xs` rows or compact inline metadata      |
| `md`  | `text-sm leading-5`  | `px-2.5 py-1`   | **Default.** Aligns baseline-to-baseline with `text-sm` row text — canonical for table status cells |
| `lg`  | `text-base leading-6`| `px-3 py-1.5`   | Standalone callouts inside `text-base` body copy           |

The `md` default matches the baseline of the most common surrounding context (table rows + card body — both `text-sm`). Consumers nesting a Badge inside an explicitly compact context (`text-xs` mono cells, dense filter rows) opt down to `size="sm"`.

### Section-tone recipe (table status cells)

Tables and tag-input chips frequently need a per-section tinted chip whose hue tracks `--section-color-N`. The canonical recipe — composed by demo consumers (`stories/data/table.vue`, `stories/data/tags-input.vue`) — is the triplet:

```
bg-section-N/15 text-section-N border-section-N/30
```

paired with `<Badge variant="outline" size="md">`. The `outline` variant supplies the focus-ring/border substrate and yields foreground text; the section triplet then overrides fill, foreground, and border with the section-tinted hue. The recipe is intentionally **not** lifted into a `tone` axis on `badgeVariants` — the section-N family is a 13-rung tinted ladder, not a 4-state semantic tone (`success/warning/destructive/info`), and a CVA-side enumeration would be overfit to the current demo consumers (1 src consumer count). When a second consumer surfaces with semantic tone needs (success/warning/destructive/info), introduce a `tone` axis at that point.
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
- `.dock-label` (typography.css `@utility` — AB.W1.T5) — canonical register
  for text labels INSIDE `.dock-tab-button` (Start, Next, Submit, Done, New
  Test, survey labels). `font-family: var(--font-serif)` picks up the
  consumer's brand-uniform-sans preset; `font-size: var(--dock-label-size,
  var(--type-subheading))` composes the audacious-dock label-size knob
  (14–15px at narrow viewports, falls back to `--type-subheading` at
  desktop); `font-weight: 500` (medium rung — present but NOT bold). Use
  this instead of `.text-heading` for dock control labels; `.text-heading`
  is the heading register and reads as literal bold inside a dock pill.
- `DarkModeToggle size="control"` follows `--control-size` and `--control-icon-padding`.
- `DarkModeToggle size="dock"` follows `--dock-control-size` and `--dock-icon-padding`; a toggle placed inside `.glass-dock` defaults to dock sizing unless an explicit `sm`, `lg`, or `control` size is supplied.

### Layer transitions

- `DockLayerGroup` owns the stacked layer grid with scoped `.dock-layer-stack` sizing.
- `DockLayer` owns active/leaving panes through `.dock-layer-item-host`.
- `useLayerTransition` performs the FLIP size animation for layer swaps.

### Orientation

`GlassDock` accepts `orientation?: "horizontal" | "vertical"` (default `"horizontal"`). Horizontal docks animate `width` on expand/collapse and lay children out in a row; vertical docks animate `height` and stack children in a column. The prop is threaded through `useDockTransition` as its `axis` ref — both `useDockTransition` and `useLayerTransition` are axis-aware, keying their FLIP logic off a computed `dim` (`"width" | "height"`) rather than a hardcoded dimension. Vertical consumers just set the prop; no other consumer changes are required.

### Multi-layer composition

Beyond the built-in two-layer grid (the default slot + the `collapsed` slot), richer docks compose `DockLayerGroup` with one or more `DockLayer` children. Each `DockLayer` registers itself with its parent via `provide`/`inject`; the group renders an optional Figma-style switcher rail from the registered descriptors (`showRail` + `railPosition`) and drives crossfade + size FLIP transitions between layers. Only the active layer is interactive — inactive layers receive `inert` and `pointer-events: none`.

```vue
<GlassDock orientation="vertical">
    <DockLayerGroup v-model:active="tab" orientation="vertical">
        <DockLayer id="assets" label="Assets" :icon="Package">…</DockLayer>
        <DockLayer id="layers" label="Layers" :icon="Layers">…</DockLayer>
        <DockLayer id="libs" label="Libraries" :icon="Library">…</DockLayer>
    </DockLayerGroup>
</GlassDock>
```

---

## Variant Taxonomy

Three orthogonal vocabularies. Never mix.

### Surface tier (glass)

Applied to floating surfaces. v0.8.0 retired the four-rung `variant="subtle | default | medium | elevated"` enum on `Card` in favour of a `tier` prop naming a single class on the five-rung canon `wash | quiet | resting | floating | overlay`. Adjacent surface-bearing primitives (`PopoverContent`, `DropdownMenuContent`, `HoverCardContent`, `DialogContent`, `SheetContent`, `TooltipContent`, `.floating-panel`) hard-code `glass-floating` directly because the popover family always wants the elevated rung; they don't need a `tier` prop.

```vue
<Card>...</Card>                              <!-- default tier="resting" -->
<Card tier="floating">...</Card>              <!-- explicit elevated rung -->
<Card tier="resting" as="section">...</Card>  <!-- polymorphic root via reka-ui Primitive -->
<Card :shadow="false">...</Card>              <!-- nested: drop the surface shadow -->
<Card :grain="false">...</Card>               <!-- drop the ::after grain overlay -->
```

`<ScrollPane>` and `<CartoonCard>` are sibling primitives lifted from the retired `variant="pane"` and `variant="cartoon"` rungs. `<ScrollPane>` is `glass-wash` + `overflow:auto` + `scrollbar-hidden` + grain disabled (the grain overlay conflicts with overflow:auto repaint). `<CartoonCard>` resolves through `.glass-cartoon`.

### Semantic variant (intent)

Used on `Button`: `default | primary-audacious | secondary | ghost | outline | destructive | accent | link | ai | glass | glass-wash`. Scoped to intent, independent of elevation. A ghost button sits flat on any tier. `primary-audacious` (K W6) composes the canonical `@utility btn-audacious` recipe over the primary intent — see `## Buttons → primary-audacious` for the disco-grain + sparkle-sweep + specular-highlight composite and the phase-color decoupling decision (Option B). `destructive` is the canonical danger variant.

### Structural variant (geometry)

`Card` no longer carries a structural `variant` enum (v0.8.0). Cards distinguish their structural register via the new `tier` prop (the surface ladder) plus the `<ScrollPane>` and `<CartoonCard>` sibling primitives (the structural lifts).

**Slider variants**: shipped via `sliderVariants` CVA (J.W5.A) with both a `variant` axis and a `size` axis. All share tokens `--slider-track-bg`, `--slider-track-height`, `--slider-thumb-bg`, `--slider-thumb-size`, `--slider-thumb-border-color`, `--slider-range-bg`, `--slider-thumb-shadow`. Restyle on a wrapper, never via `:deep()`.

| Variant         | Track                       | Thumb                                | Use                              |
|-----------------|-----------------------------|--------------------------------------|----------------------------------|
| `standard`      | 6 px muted/50               | 14 px circle                         | Default                          |
| `spectrum`      | 24 px secondary             | thin bar                             | Range selection                  |
| `timeline`      | 24 px glass-blurred         | 24 px disc                           | Video/timeline scrubbing (slider variant — see also the standalone `<GlassTimeline>` primitive below) |
| `glass-pill`    | pill substrate w/ gradient  | halo on hover (`--surface-tint-12`)  | Audacious primary control        |
| `glass-cartoon` | cartoon-surface track       | cartoon-shadow disc                  | Editorial / paper-design context |

| Size  | Track height | Thumb size | Use                   |
|-------|--------------|------------|-----------------------|
| `sm`  | 4 px         | 12 px      | Density-tight UIs     |
| `md`  | 6 px         | 16 px      | Default               |
| `lg`  | 12 px        | 24 px      | Hero / featured       |

### Slider keep-dock-open contract

`<Slider>` exposes `keepDockOpen?: boolean` (default `true`). When a Slider is a descendant of a `<GlassDock>`, the contract is bidirectional and pointer-anchored:

1. **Acquire** — `pointerdown` on the slider thumb injects a `dockKeepOpen` token via the dock's `useDockState` provide tree. While the token is held, the dock's idle-collapse timer is suspended.
2. **Release** — `pointerup` / `pointercancel` (attached at window scope so the gesture survives the cursor leaving the dock) drops the token.
3. **Visual binding** — the Slider subscribes to the dock's reactive `dockHeld` flag (the OR-reduction of all currently-held tokens) and reflects it via `data-held` on its root, intensifying the thumb-halo via a denser `--surface-tint` rung in scoped CSS.
4. **Substrate response** — `.glass-dock[data-held]` in `src/styles/dock.css` tier-shades the dock background up while any descendant holds a token.

The cross-substrate proof story lives at `demo/stories/compositions/dock-with-slider.vue` (K W7) — three cells exercising the contract: standard slider (Volume), `glass-pill` variant (Brightness), and a multi-slider mixer demonstrating multi-token reference-counting.

**Slider-only contract — Option B per K W7 decision**: `<NumberField>` is NOT a consumer of `keepDockOpen`. NumberField interactions are keyboard- and discrete-button (chevron tap) — they have no continuous-interaction window for which keep-open matters. The K plan originally floated an Option A where NumberField also acquired the token; W7 picked Option B (Slider-only) on the rationale that the contract's load-bearing semantics are pointer-drag + thumb-halo intensification — neither of which applies to NumberField. The contract is documented as Slider-only; future consumers must demonstrate a pointer-anchored continuous-interaction model before joining.

### Theming discipline

When a consumer needs to override component internals, the first resort is a documented CSS custom property. `:deep()` is a last resort — it indicates a missing token or slot-class prop.

Slot-class props (e.g., `ScrollPaneHeader` → `title-class`, `description-class`) expose internal elements for controlled styling.

---

## Timeline Primitive

`<GlassTimeline>` is the canonical primitive for time-axis displays: scrubbing, multi-phase progress, and per-section status indication. Three variants form an orthogonal taxonomy. **Note**: the `timeline` slider variant in the table above is a *separate* primitive (a `<Slider>` with the timeline visual treatment for video-style scrubbing); `<GlassTimeline>` is a standalone Vue component with its own variant enum.

### `variant="scrubber"` (default; pre-Z baseline)

Single-track normalized 0..1 scrubber with full keyboard a11y: `role="slider"` + arrow-key step (0.01) + shift-arrow step (0.1). Optional tooltip caret via `:label` prop. Pointer + keyboard models converge on the same `update:modelValue` event surface.

```vue
<GlassTimeline v-model="position" label="0:23 / 4:12" />
```

### `variant="segmented"` (Z.W2.T1)

Adjacent gradient bands — N rectangles in a row, one per phase, with boundary dots emitting `hover` + `click` events. Per-segment gradient (either `{from, to}` pair or raw CSS gradient string), lifecycle state (`pending | active | completed`), and optional payload surface via the events. Used by multi-phase progress UIs where each phase is conceptually independent.

```vue
<GlassTimeline
  variant="segmented"
  :segments="phases"
  @hover="onPhaseHover"
  @click="onPhaseClick"
/>
```

### `variant="continuous"` (AA.W1.T1)

ONE rounded-pill rail substrate with N absolute-positioned region children spanning prev-boundary → current-boundary. Same `TimelineSegment[]` data shape as `segmented` — only the rendering geometry differs. Visual: 1 pill with N internal gradient regions + optional seam dividers at boundaries + boundary dots overlaid at each region's right edge. Used by multi-phase progress UIs where the phases are conceptually one progression bar (the speedtest ping → download → upload pipeline is the canonical consumer).

```vue
<GlassTimeline
  variant="continuous"
  :segments="phases"
  @hover="onPhaseHover"
  @click="onPhaseClick"
/>
```

### `TimelineSegment` data shape

```ts
interface TimelineSegment {
    key: string;                                          // stable id; emitted on hover/click
    label: string;                                        // display name; surfaces in dot aria-label
    state: "pending" | "active" | "completed";            // lifecycle — drives fill + dot affordance
    progress?: number;                                    // 0..1, overrides state-default fill
    gradient?: { from: string; to: string } | string;    // `{from,to}` pair or raw CSS gradient
    value?: unknown;                                      // hover/click event payload
    weight?: number;                                      // continuous-variant width share (default 1)
}
```

`weight` is only honoured by the `continuous` variant (region widths are computed as `weight / sum(weights)`); the `segmented` variant distributes via CSS flex (`--timeline-segment-flex`).

### Tokens (`§16 TIMELINE`)

| Token | Default | Use |
|---|---|---|
| `--timeline-scrubber-height`            | `0.5rem`           | Scrubber-variant rail height |
| `--timeline-segmented-height`           | `0.625rem`         | Segmented-variant rail height |
| `--timeline-continuous-height`          | `0.75rem`          | Continuous-variant rail height |
| `--timeline-dot-size`                   | `0.875rem`         | Boundary dot diameter (segmented + continuous) |
| `--timeline-segment-flex`               | `1 1 0`            | Per-cell flex distribution (segmented) |
| `--timeline-continuous-seam-opacity`    | `0.25`             | Continuous inter-region 1px divider opacity (`0` to suppress) |
| `--timeline-continuous-seam-color`      | `color-mix(...)`   | Seam tint (composes from opacity by default) |
| `--timeline-segment-default-gradient`   | wash → mid wash    | Fallback gradient when `segment.gradient` is omitted |
| `--timeline-segment-gradient-ping`      | (chart-ping)       | Per-phase canonical default — `ping` |
| `--timeline-segment-gradient-download`  | (chart-download)   | Per-phase canonical default — `download` |
| `--timeline-segment-gradient-upload`    | (chart-upload)     | Per-phase canonical default — `upload` |
| `--timeline-segment-gradient-jitter`    | (chart-jitter)     | Per-phase canonical default — `jitter` |

### A11y contract

- **Scrubber**: `role="slider"` + `aria-valuemin/max/now` + keyboard arrow-key step. `aria-valuenow` is always rendered as a numeric attribute (the binding coerces via `Number(modelValue ?? 0)`; AA.W1.T2 / A4 §S-16 fix). Defaults to `0` when `modelValue` is `undefined` or `null`.
- **Segmented**: `role="group"` on the wrapper, per-dot `<button>` with composed `aria-label` (`"{label}: {state}"`). Per-segment payload surfaces via the `hover` + `click` events.
- **Continuous**: `role="group"` on the wrapper, plus an **Option C structural split** (AB.W2.T4 / A4 §nested-interactive) under the wrapper:
  - `.continuous-track[role="progressbar"]` with `aria-valuemin="0"`, `aria-valuemax=N`, `aria-valuenow` derived from completed-segment-count + fractional active progress (rounded to 2 decimals). The rail is **non-interactive** — it carries no focusable descendants, satisfying axe `nested-interactive` (serious; WCAG 2.0 A — 4.1.2). Each region renders a `.continuous-region-fill` child that paints the per-phase gradient up to the inline `--continuous-fill-width` (load-bearing: the var actually paints, it is not merely computed; W3 will lean on this substrate for the phase-bus echo).
  - `.continuous-markers[role="list"]` carries the interactive `<button class="continuous-dot">` markers as `<li role="listitem">` siblings. Each button has composed `aria-label` (`"{label}: {state}"`), per-segment data hooks (`data-state`, `data-current`, `data-completed`), and a `<HoverPopover>` wrap that surfaces `{ label, value, description, state }` on hover (color-coded via the segment's gradient endpoint).
  - The `currentSegmentKey?: string` prop stamps `data-current="true"` on the matching marker so consumers (panel rendering, W3 raised-rivet styling) can distinguish active phase from transient hovered phase without DOM surgery. Hover affects only the floating popover; the data-current marker survives hover-leave.

The continuous variant's event surface adds `hoverEnd` (mirror of `hover`) so consumers can blend hover-over-current in panels via `effective = hovered ?? current`. The events fire from the HoverPopover's debounced `update:open` cadence (inherits `hoverOpenDelay` + `closeDelay`), eliminating the pointer-skim flicker the raw `@mouseenter`/`@mouseleave` model produced when the popover content overlapped the trigger.

All variants respect `prefers-reduced-motion: reduce` by collapsing band / region / dot transitions to `0.01ms`.

---

## Configurator

The configurator family is the canonical chrome for live token / preset editing in storybook + consumer admin surfaces. Four primitives compose:

- `<Configurator>` — outer shell (FAB + sheet + persistence).
- `<ConfiguratorLayer>` — labelled group of related rows (typography, glass tier, density, etc.).
- `<ConfiguratorRow>` — single labelled control (slider, select, color, switch).
- `useConfiguratorState` — reactive preset state (active key, draft buffer, commit / reset / cycle, persistence).

The family reaches the ≥ 2-consumer bar via:
1. `demo/stories/motion/metaballs.vue` (`useConfiguratorState` with the metaballs preset cohort — `cloneMode: "commit-on-write"` default).
2. `demo/stories/primitives/configurator.vue` (V-tranche fb38034 — primitive-side story consuming `<ConfiguratorRow>` + `useConfiguratorState`).
3. `demo/stories/aurora.vue` (L.W7 Lane B — `cloneMode: "per-preset"` consumer; absorbed the retired `useAuroraStudio` parallel chrome).

**Clone modes**. `useConfiguratorState<T>` ships two clone-mode strategies via the `cloneMode` option:

- `"commit-on-write"` (default) — single live `config` reactive object. `selectPreset(key)` overwrites `config` with that preset's baseline; edits do NOT persist across preset switches. Matches metaballs' shape.
- `"per-preset"` — each preset slot holds an independent live clone. `selectPreset(key)` snapshots the current `config` into the outgoing slot, then loads the incoming slot's clone into `config`. Edits persist per slot across switches. Matches aurora's shape (slider edits survive a preset round-trip).

`defaultClone` calls `toRaw(value)` before `structuredClone` so Vue reactive proxies snapshot cleanly; JSON-clone is the fallback for shapes `structuredClone` rejects. Consumers can override via `options.clone`.

**Configurator P0 absorb (K W7)**: `useConfiguratorState.ts:85-87` previously declared `let activeKey: string | undefined` — non-reactive — so `studio.activePreset` returned a stale computed value and templates binding it never updated when `selectPreset` mutated the local. K W7 replaced the plain `let` with `const activeKey = ref<string | undefined>(...)`; `selectPreset` / `resetCurrent` / `cyclePreset` mutate `activeKey.value`. The "Maximum recursive updates exceeded" runtime error on `/motion/metaballs` (Lighthouse P0-1) is gone. A bidirectional `colorDraft ↔ cfg.colors` watch-write loop in `metaballs.vue` was eliminated by Strategy 1 (KISS — drop `colorDraft` entirely; iterate `cfg.colors` directly via `studio.config`).

**Aurora chrome Option-A unification (L W7 Lane B — Rε §A.8)**: the prior `useAuroraStudio` + per-preset clone map collapsed into a `cloneMode: "per-preset"` consumer of the canonical `useConfiguratorState<AuroraConfig>`. Closes K cross-tranche-debt item; retires the Option-B-with-rationale note. Aurora is now the second consumer of the canonical state primitive (third overall counting `primitives/configurator.vue`). F-ε-3 (`/motion/metaballs` recursion warning surfaced under L W6 Lighthouse) probed clean post-unification under the 2-preset-swap + 4-color-mutation reproduction pattern — see `docs/tranches/L/audit/W7-B-aurora-option-a-unification-proof.md`.

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

`animations.css` owns shimmer keyframes only. Text shimmer utility
classes, including `.gold-shimmer`, live in `utilities.css`.

### Utility animations

- `rainbow-hue` — hue-rotate 0 → 360°
- `shimmer-sweep` — background-position sweep
- `shake` — translateX ±4 px over 0.5 s

---

## Composables

Library-tier composables decompose into three rough registers. The first register exposes platform primitives behind a Vue-shaped seam (timers, intersection, resize, dark mode). The second wraps `@mkbabb/keyframes.js` motion primitives so consumers don't reach into the engine directly. The third wraps cross-cutting orchestration patterns that consumers were rolling by hand.

| Composable | Register | Purpose |
|---|---|---|
| `useGlobalDark` | platform | Single shared dark-mode ref + toggle. |
| `useInterval` / `useTimer` | platform | Lifecycle-clean `setInterval` / `setTimeout` wrappers. |
| `useResizeObserver` | platform | ResizeObserver behind `onScopeDispose`. |
| `useTouchGate` | platform | Pointer-event coalescing for touch + mouse. |
| `useKeyboardShortcuts` | platform | Scoped keybinding registration. |
| `useTokenColor` | platform | Reactive read of a CSS custom property; re-resolves on dark-mode transitions. Replaces ad-hoc `getComputedStyle(html).getPropertyValue("--xxx")` reads in canvas + Aurora consumers. |
| `useStagger` | orchestration | Fixed-count timed reveal cascade — `revealed.value[i]` flips true at `initialDelayMs + i * delayMs`. Distinct from `useStaggerReveal`: that one gates on IntersectionObserver thresholds; this one fires on a pure timer. The two compose. |
| `useStaggerReveal` | orchestration | IntersectionObserver-gated entrance choreography for grids and lists. |
| `useAnimatedNumber` | motion | Hysteresis-smoothed live numeric tracking via keyframes.js `SmoothProgress`. |
| `useAnimatedNumberMap` | motion | N-up `useAnimatedNumber` fan-out behind a `Record<K, ComputedRef<number \| null>>`. Replaces hand-rolled per-key smoother arrays where consumers can't run the composable inside a `v-for`. |
| `useSpringOrchestrator` | motion | Multi-spring snapshot engine for choreographed transitions. |
| `useRAFLoop` | motion | rAF loop with start/stop/dispose + per-frame timing. |
| `useDarkModeSync` | motion | Reactive bridge between `useGlobalDark` and animation engine state. |
| `useScrollProgress` | motion | Scroll-position-driven progress ref. |
| `useIntersectionPause` | motion | Pause/resume long-running animation when target is offscreen. |
| `useGlassRenderer` | glass | Glass-surface renderer wiring (filter, mask, backdrop). |
| `useSidebarFollow` / `useTreeIndex` / etc. | sidebar | Sidebar layout + active-section tracking. |
| `useInfiniteScroll` | data | Infinite scroll engine wired to a backing source. |
| `useSortable` | data | SortableJS wrapper preserving Vue reactivity. |

### When to add a new composable

Reach for a new composable when:
1. The pattern duplicates across two or more consumers (the "lifts on first duplication" rule).
2. The consumer wraps a library primitive in a hand-rolled scheduler / fan-out / lifecycle loop. That's a library gap; fix it upstream.
3. The platform API needs an `onScopeDispose` cleanup pair to be safe inside Vue components.

The composables registry is consumed via the root `@mkbabb/glass-ui` barrel for cross-domain primitives, or via path-specific entries (e.g. `@mkbabb/glass-ui/sidebar`) for domain-bounded composables.

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
--input-min-width-sm:  5rem    (80 px)
--min-width-input-sm:  var(--input-min-width-sm)
```

### Chassis sizing — dock-adjusted viewport (AB.W1)

```
--chassis-max-block-size: calc(
    100dvh
    - var(--dock-footer-space, 5.75rem)
    - var(--page-padding-top, 0rem)
    - 1rem
)
```

A guardrail for consumer-app chassis cards (e.g. speedtest's
`.results-card`). The recipe subtracts the consumer-owned
`--dock-footer-space` (dock height + dock inset + card-edge inset) and
`--page-padding-top` from the dynamic viewport, then keeps one further
rem of breathing room so the card never butts the dock — the user
mandate is `≥ 1rem visible gap above dock`.

Consumers should:

1. **Centre the card vertically inside the dock-adjusted viewport.**
   The dock-adjusted viewport is `100dvh − dock-footer-space − page-padding-top`;
   the chassis lives above the dock, not behind it.

2. **Clamp internal regions to that area before any scroll falls out.**
   In a meter-and-readout chassis the yielding order is:
   meter → readout → timeline → (last resort) `overflow-y: auto` with
   `scrollbar-gutter: stable both-edges` + scroll-shadow guards.

3. **Treat scroll as a documented fallback, never the primary passing
   path.** Clamp-first / no-scroll-first is the canon. If `overflow-y:
   auto` is needed it must be after every internal region has reached
   its minimum.

Speedtest's AB.W1.T2 consumes the token to repair B1 (chassis-too-tall
occlusion), B10 (mobile/desktop fit) and H3 (mobile-375 CLS 0.926 → ≤
0.15) at the chassis level.

### Chart dimensions (consumer-facing tokens)

```
--chart-height-compact: 15rem   (240 px)
--chart-height-default: 22.5rem (360 px)
--chart-height-large:   25rem   (400 px)
--chart-margin:         1.25rem (20 px)
```

Tailwind exposure: `h-chart-compact`, `h-chart-default`, `h-chart-large`; `min-w-input-sm`; `m-chart-margin`, `mx-chart-margin`, `my-chart-margin`, and related spacing utilities backed by `--spacing-chart-margin`.

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

_shared (`<ModalOverlay>`, `menuItemVariants` CVA — V.W3) · accordion · alert · avatar · badge · button · card · carousel · cartoon-card · checkbox · collapsible · combobox · command · context-menu · data-table · dialog · drawer · dropdown-menu · hover-card · input · label · metric-pill · multi-select · notification · number-field · popover · progress · radio-group · scroll-pane · section · select · separator · sheet · skeleton · slider · switch · table · tabs · tags-input · textarea · toast · toggle · toggle-group · tooltip.

### Custom composites (`src/components/custom/`)

aurora · **configurator** (`Configurator`, `ConfiguratorLayer`, `ConfiguratorRow`, `useConfiguratorState`) · confirm-dialog · controls · **disco-glyph** · **dock** (`GlassDock`, `DockLayer`, `DockLayerGroup`, `DockIconButton`, `DockTabButton`, `DockSelectTrigger`, `DockDropdownTrigger`) · **dock-group** · expandable-container · glass-carousel · glass-panel · **glyph-face** · **hover-popover** · icon-tooltip · infinite-scroll · **instrument-chassis** · **labeled-field** · **metric-badge** · metaballs · **paper-backdrop** · **pulse** · **scrolling-text** · search · sidebar · sortable-list · stacked-icons · **status-dot** · tabs (BouncyTabs, UnderlineTabs, BouncyToggle) · timeline · toggle-chip · typewriter.

### Key component specs

**`Skeleton`** — `<Skeleton variant="pulse" | "shimmer" class="..." />`. Pulse: `animate-pulse rounded-md bg-muted`. Shimmer (K WP migration): a transform-only `::after` overlay with `transform: translateX(-100% → 100%)` over 1.5 s linear loop, `will-change: transform`. Visual fidelity preserved (1.5 s sweep cadence, `--muted-foreground` highlight band over `bg-muted` base). The migration moves the sweep off `background-position` (which forced main-thread paint per frame) onto compositor-friendly transform-only animation — addresses Lighthouse P1-4 (non-composited animation). Reduced-motion gate preserved.

**`Pulse`** — `<Pulse :count="3" variant="dots|ring" speed="slow|normal|fast" />`. Dots: count-many 6 × 6 px rounded circles with current-color background, staggered `pulse-dot-bounce` animation (opacity 0.35 → 1 → 0.35, scale 0.8 → 1.2 → 0.8). Ring: 16 × 16 px current-color border with transparent top, linear spin. `--pulse-duration` mapped from `speed` prop to `--duration-slow|panel|fast`. Reduced-motion → animation none, opacity 0.6.

**`MetricBadge`** — `<MetricBadge :size="sm|md|lg|xl" :amount="str|num" :unit="str" :color="hex" :placeholder="—" :label?="str" :abbreviation?="str" />`. Inline-flex, baseline-aligned, `max-w-32`, overflow-hidden. Amount: `text-mono-micro font-semibold tabular-nums` at sm (11px), `text-mono-caption` at md (12px), `text-mono-small` at lg (14px), `text-mono-prose` at xl (18px) — the audacious-canon-plus-one ladder per Q.W2.B; colored with prop when amount is truthy, muted-foreground/40 when falsy. Unit: `text-micro font-mono text-muted-foreground` (sm/md/lg) lifting to `text-prose font-mono` at xl. Interactive: `hover:scale-110 hover:shadow-md active:scale-95`. The `size` prop scales the typographic ladder for the audacious-canon use (consumer-side `useMediaQuery` selects `xl` ≥1200, `lg` ≥480, `sm` below to fit the mobile carve without clipping).

**v0.7.2 inline-label / abbreviation extension** (R.W4 consumer-driven, no breaking change). When `label` is set, the badge renders `[label][space][amount][space][unit]` inside the same container. The label is `font-mono` Fira Code uppercase tracking 0.18em at the badge's unit-tier size (one tier below the amount), colour `var(--muted-foreground)` at 80% — never the amount's `color` prop, because the label is the schedule annotation and the amount is the readout (Vignelli typographic asymmetry). When `abbreviation` is also set, consumers can swap to it via their own viewport branching (`useMediaQuery("(max-width: 479px)")` is the canonical pattern for the 3-letter mobile collapse `LAT 36 ms` / `JIT 1` / `DL 730` / `UL 130`); the library exposes both modes but does NOT branch on viewport — that's consumer logic per glass-ui's first principle (component owns visual contract; consumer owns layout decisions). Both `label` and `abbreviation` are `undefined`-default; pre-v0.7.2 consumers render unchanged. Hover popovers stay valid for description copy ("Network latency — lower is better") because the label-on-pill answers "what is this number" and the popover answers "what does it mean".

**v0.8.3 stacked refinement** (T.W2 audit-B-spec). When `labelPosition === "stacked"`, the template wraps `<span class="metric-badge__amount">` + `<span class="metric-badge__unit">` in a single `<span class="metric-badge__row">`. Layout becomes 2 rows: row 1 label/abbreviation, row 2 amount + unit baseline-aligned via `display: inline-flex; align-items: baseline; gap: 0.25rem`. The pre-T 3-row layout (label / amount / unit on three rows) was the bug, not the contract — the value+unit pair reads as one quantity. Inline mode keeps the flat sibling order so the single-row baseline reads unbroken. Two new tokens land in `tokens.css`: `--metric-badge-min-height-stacked: 2.625rem` (taller floor for breathing room above the baseline pair) and `--metric-badge-padding-block-stacked: 0.375rem`. Existing `labelPosition="stacked"` consumers were zero — the refinement is safe.

**`MetricPill`** (v0.8.3, T.W2) — `<MetricPill :amount="str|num" :unit="str" :label="str" :abbreviation="str" :color="hex" :size="sm|md|lg|xl" :labelPosition="inline|stacked" :density="comfortable|spacious" :placeholder="—" />`. Composition-only over `<MetricBadge>` with `labelPosition="stacked"` + `density="spacious"` + `size="lg"` defaults. The pill lands at the 2.625rem floor declared by `--metric-badge-min-height-stacked`; row 1 carries the label, row 2 baseline-aligns amount + unit. The `density` prop is the dock-tier knob lifted onto the pill: `spacious` (default) widens block padding for chassis-strip rhythm; `comfortable` keeps the tighter compact register where pills nest in a denser dock. The CSS modifier (`.metric-pill--density-{value}`) adjusts the local metric-badge padding tokens; the underlying badge stays unchanged. Per audit-B's T1 lock: composition only, no parallel logic vs `<MetricBadge>` — visual changes to the underlying badge surface compose here without divergence.

**`GlassDock` containerName prop** (v0.8.3, T.W2) — optional `containerName?: string`. When set, the dock root emits inline `container-type: inline-size; container-name: <value>; overflow: visible` plus a `data-container-name` structural marker. The base `overflow: hidden` shell gates on `:not([data-container-name])` so non-host docks keep the default clip — a backward-compatible extension. Consumers query the named container via `@container <value> (...)` rules without wrapping the dock in a sibling subject. Lifts the container subject onto the primitive (audit-B §1.3 gestalt move): a container subject must be a peer or ancestor of the dock, never an interior descendant whose intrinsic size the dock relies on (CSS Containment L3 §3.2). Replaces the W3-stash workaround that put `container-type: inline-size` on the cluster itself, which collapsed the dock to 0 width.

**`GlyphFace`** — `<GlyphFace :tint="hex|undefined" :active="bool" :silhouette="path-d|clip-path">`. Three-layer wrapper around a slotted lucide glyph: a phase-tinted radial backplate (visible only when `[data-active="true"]`), the slotted silhouette (stays `currentColor` so the Vignelli-clean idle reading holds), and a 165° linear-gradient catch-light cap. Four CSS knobs:

- `--gf-tint` — backplate hue (defaults `transparent`).
- `--gf-cap-strength` — cap-gradient white-stop alpha (defaults `0.55`; dark companion `0.35`). Q.W3 raised from `0.35` to compose against translucent dock substrates.
- `--gf-cap-blend` — cap mix-blend-mode (defaults `screen` post-Q.W3; consumers needing the metallic-overlay punch override to `overlay`).
- `--gf-cap-radius` — cap clip radius (defaults `50%`).

`silhouette` is the default cap-clip mode (Q.W3 inverted: clip-to-silhouette is the default; no-silhouette renders no cap, dropping the wrapper-rectangle fallback). DiscoGlyph hands silhouette upward via `provide(GlyphFaceSilhouetteKey)` so wrapping GlyphFace cascades reach the disco-glyph silhouette without per-consumer prop plumb. Without `active` the wrapper reads as a plain glyph holder and joins clusters that share the same edge-light + cap-radius register.

**`DiscoGlyph`** — `<DiscoGlyph :silhouette="path-d" :viewBox="0 0 24 24" :active="bool" :phaseColor="currentColor" :facetAxis="diagonal|horizontal|vertical">`. Three-layer SVG glyph primitive that paints the silhouette (1) filled `currentColor` so the lucide cascade carries through at idle, (2) overlaid by an 8-stop linear gradient that simulates ~6 facets cutting across the glyph face — gradient axis follows `facetAxis` so each consumer picks the direction that cuts across its dominant stroke (CheckDisco / ArrowRightDisco vertical, PlayDisco / RotateCcwDisco diagonal), (3) capped by a 165° catch-light gradient (white at the upper-left, transparent past 40%). `useId()` scopes the gradient ids so multiple glyphs on one page do not collide post-SSR/hydration. Hands silhouette upward via `provide(GlyphFaceSilhouetteKey)` for wrapping GlyphFace cap consumption. Speedtest's disco icons (Play / RotateCcw / ArrowRight / Check) are thin wrappers that pass only the silhouette path + facet axis.

**`HoverPopover`** — `<HoverPopover content="..." :hover-open-delay="250" :close-delay="150" :side="auto" :align="auto">`. Hover-triggered popover-tier label with adaptive `side`/`align` (auto-flips off viewport edges). Composed via reka-ui HoverCard primitives; popover-tier substrate for chassis dock consumers (SettingsCog tooltip; ActionCluster Back / Stop / Retake hover-labels).

The `hoverOpenDelay` prop (default `250`ms) is the public API name as of K W1 (renamed from a prior generic name in J close). Rationale: reka-ui's HoverCard primitive exposes a generic `open-delay` for hover-card-family components; the glass-ui wrapper specialises hover-popover semantics (lighter, dock-internal label tier — distinct from the heavier hover-card register). The hover-popover-specific name disambiguates from the generic primitive's API at consumer call-sites and matches the `closeDelay` sibling. The rename is a clean break per K invariant 1 (no legacy aliases); the J FINAL named prop now matches the shipped API.

**`InstrumentChassis`** — `<InstrumentChassis>` with `strip` / `dial` / `control` slots. Composes the chassis CSS once: `--glass-bg-chassis` + `--glass-blur-default` + `--glass-border-default` + `--glass-shadow-default` + the `--glass-curvature-overlay` lift + an engraved-bezel inner stroke + twin-line groove dividers between regions. Consumers render through the slots — speedtest, survey, thank-you all share the same chassis with different region content. `RegionDivider` ships the twin-line groove rule for nested splits. Q.W4.A lifted the light-mode bezel-line α from 0.04 / 0.06 to 0.10 / 0.12 so the divider reads against saturated-aurora bleed; dark-mode pair (0.06 / 0.18) stays. Lands on `o-w2_7-instrument-chassis` and cherry-picks into `release/0.7.x` as v0.7.1 patch.

### Library-only primitives (post-R consumer state)

`InstrumentChassis`, `RegionDivider`, `GlyphFace`, and `DiscoGlyph` are
first-class library primitives with their own demo stories
(`demo/stories/compositions/instrument-chassis.vue`,
`demo/stories/primitives/glyph-face.vue`, plus the `_internal/blob-stress.vue`
that exercises `MetricBadge` at scale). The speedtest project consumed them
during O.W2.7 → Q.W4 but stops consuming them at R.W1 — speedtest now
composes its UI from `MetricPillCluster` + `SpeedtestResults` + `Dock`
against the deployed three-flow-box shape (see speedtest `DESIGN.md`
`## Tranche-R revisions` for the full ledger). The library exports stay;
the demo stories stay; downstream consumers other than speedtest remain
free to compose them. The primitives' API contracts above are unchanged
post-R — this subsection records the consumer-state shift, not a library
change.

The `MetricBadge.label + abbreviation` extension above (v0.7.2) is the only
library-side R-tranche landing. It ships as a non-breaking minor on the
`release/0.7.x` line; no v0.8.0 cut required by R itself. Consumers on
v0.7.0 / v0.7.1 keep working unchanged.

### Composables (`src/composables/`)

v1.0 restructures composables into **eight coherent sub-trees** per L.W2 Lane A (Rε §B.1.3 + §B.2.7 + §B.2.8). The pre-L flat top-level files (`useGlobalDark.ts`, `useKeyboardShortcuts.ts`, `useInterval.ts`, `useTimer.ts`, `useResizeObserver.ts`, `useTouchGate.ts`, `useTokenColor.ts`, `useStagger.ts`, `useStoryDemo.ts`) all moved under coherent sub-trees; `useStoryDemo` demoted to demo-private at `demo/composables/useStoryDemo.ts`.

**Dock** (component-internal, under `src/components/custom/dock/composables/`): `useDockState`, `useLayerTransition`. Both axis-aware via the `axis` ref (see Dock → Orientation). Not on the public surface.

**Sortable** (`src/composables/sortable/`): `useSortable`.

**Sidebar** (`src/composables/sidebar/`): `useTreeIndex`, `useScrollTracker`, `useSidebarFollow`, `useSidebarState`, `buildTreeIndex`.

**Dark** (`src/composables/dark/`): `useGlobalDark`. Vueuse-bearing; reach via flat `@mkbabb/glass-ui/dark` subpath. Not on the root barrel (L.W1 Phase 2 SCC closure).

**Keyboard** (`src/composables/keyboard/`): `useKeyboardShortcuts` + `registerShortcut` + `useRegisteredShortcuts` + `formatCombo` + `formatComboParts` + `isMac` + types. Vueuse-bearing; reach via flat `@mkbabb/glass-ui/keyboard` subpath.

**Reactive** (`src/composables/reactive/`): `useInterval`, `useTimer`. Vue-scope-aware timer/interval primitives.

**DOM** (`src/composables/dom/`): `useResizeObserver`, `useTouchGate`, `useTokenColor`. DOM observers + cascade bridges.

**Infinite scroll** (co-located under `src/components/custom/infinite-scroll/composables/`): `useInfiniteScroll`. Re-exported from the internal `src/composables/index.ts` barrel.

**Motion** (`src/composables/motion/`): `useSpringOrchestrator`, `useStaggerReveal`, `useScrollProgress`, `useAnimatedNumber`, `useAnimatedNumberMap`, `useStagger`, `useDarkModeSync`, `useRAFLoop`, `useIntersectionPause`. `useAnimatedNumber` wraps keyframes.js `SmoothProgress.play` to expose a reactive hysteresis-smoothed value for live numeric tracking (hero values, pill amounts, progress bars). Not a typewriter — the target glides toward a moving signal via exponential damping. `useAnimatedNumberMap` (v0.8.4 promotion) is the N-up fan-out behind a Record-returning composable. `useDarkModeSync` (Tranche G) encapsulates the two-step `nextTick → requestAnimationFrame` dance required to react to dark-mode toggles in code that reads computed CSS variables (canvas renderers etc.).

**Glass renderer** (`src/composables/glass/`): `useGlassRenderer`, `createGlassFilter`, `destroyGlassFilter`. WebGL + WebGPU substrate.

**v0.8.4 promotions** (lifted from speedtest per V.W2):
- **`useTokenColor`** (`a4959ef`) — read CSS custom property as `ComputedRef` with theme-aware fallback. Supersedes the retired `cssVar` helper for the WAAPI-adjacent reactive-read use case.
- **`useStagger`** (`4e28520`) — one-shot staggered reveal-flag array with cleanup-safe timer set; PRM brackets via `prefers-reduced-motion`.
- **`useAnimatedNumberMap`** (`16df6db`) — covered above under Motion.

**`cssVar` retire** (K W3.A) — `cssVar.ts` retired. The single in-tree consumer (BouncyToggle) inlined a 5-line `readToken(name, fallback)` helper at click-time (no reactivity needed). `useTokenColor` (above) supersedes for reactive use cases.

**v1.0 retires** (L.W3 Lane A — second-consumer fidelity audit per L invariant 8):
- `useOffsetPagination` — 0 production consumers; demo-only at v0.9.x. `@mkbabb/glass-ui/pagination` subpath removed.
- `useVirtualSectionWindow` + `useWindowedStore` + `virtualSectionLayout` helpers — 0 production consumers. `@mkbabb/glass-ui/virtual` subpath removed.
- `useStoryDemo` — moved to `demo/composables/useStoryDemo.ts` (demo-private; no longer on library public surface).

The three motion composables flagged in K cross-tranche debt (`useRAFLoop`, `useIntersectionPause`, `useDarkModeSync`) all WIRED at L.W3 via cross-repo speedtest consumption (`useMeterRenderer.ts` + `useAuroraPolicy.ts` + `SpeedtestMeter.vue` + `useEChartsTheme.ts`); ≥ 2 consumers per L invariant 8.

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

## Subpath surface

v1.0 (L.W1 HEADLINE) closes the vueuse SCC trap with **Phase 2 root-barrel curation** + a **flat subpath surface**. The library ships under three import shapes — the curated root barrel, 37 flat JS subpaths (32 component packages + `/forms` + `/dark` + `/keyboard` + `/carousel` + `/api`), and the `/styles` CSS bundle (38 `package.json` exports entries total).

### The three layers

1. **Root barrel `@mkbabb/glass-ui`** — vueuse-FREE curated surface. Re-exports 40 `ui/` packages (the 4 vueuse-bearing — `input/`, `textarea/`, `combobox/`, `carousel/` — are intentionally absent) plus 7 cherry-picked `custom/` packages (`instrument-chassis`, `glyph-face`, `dock-group`, `disco-glyph`, `hover-popover`, `configurator`, `scrolling-text`) plus the vueuse-free composable sub-trees. Acceptance bar for root-barrel inclusion is documented inline in `src/index.ts` (header comment block; L.W2 Lane B).

2. **Per-package flat subpaths** — `./tokens`, `./dock`, `./search`, `./sidebar`, `./controls`, `./confirm-dialog`, `./infinite-scroll`, `./tabs`, `./typewriter`, `./stacked-icons`, `./glass-carousel`, `./aurora`, `./configurator`, `./metric-badge`, `./status-dot`, `./pulse`, `./paper-backdrop`, `./toggle-chip`, `./glass-panel`, `./metaballs`, `./sortable-list`, `./timeline`, `./labeled-field`, `./expandable-container`, `./icon-tooltip`, `./instrument-chassis`, `./glyph-face`, `./dock-group`, `./disco-glyph`, `./hover-popover`, `./scrolling-text`, `./freshness`. Each maps to a `src/<name>.ts` barrel and a `dist/<name>.{js,d.ts}` artefact.

3. **API discovery layer `@mkbabb/glass-ui/api`** — pure types + constants re-export aggregator. Ships 32 canonical public symbols (28 types + 4 constants) across Aurora, Configurator, Metaballs, Surface enums (`CardTier`, `InstrumentChassisPhase`, `ToastVariant`), and CVA variants (`ButtonVariants`, `SliderVariants`, etc.). Pure-additive; types erase at build so consumer JS pays 0 B for type-only imports. See `src/api/index.ts`.

`./styles` is the shared CSS bundle (sole CSS subpath; consumers wire it via `@import "@mkbabb/glass-ui/styles"`).

### vueuse-bearing subpaths (v1.0 flat shape)

| Subpath | Purpose | vueuse symbols |
|---|---|---|
| `@mkbabb/glass-ui/forms` | Input, Textarea, Combobox\* family | `useVModel`, `reactiveOmit` |
| `@mkbabb/glass-ui/dark` | `useGlobalDark` | `createGlobalState`, `useDark`, `useToggle` |
| `@mkbabb/glass-ui/keyboard` | `registerShortcut`, `useRegisteredShortcuts`, `formatCombo`, `formatComboParts`, `isMac`, types | `createGlobalState`, `useEventListener` |
| `@mkbabb/glass-ui/carousel` | `useCarousel` + `CarouselApi` PLUS the full `Carousel*` component family — `Carousel`, `CarouselContent`, `CarouselDots`, `CarouselItem`, `CarouselNext`, `CarouselPager`, `CarouselPrevious`, `GlassCarouselPager` (substrate aligned with MIGRATION.md §1.2 at v1.0.4 / M.W0; pre-v1.0.4 only re-exported the composable + type) | `createInjectionState` (via `useCarousel`); every `Carousel*.vue` injects it |

```ts
// v1.0 required shape
import { Input, Textarea, Combobox } from "@mkbabb/glass-ui/forms";
import { useGlobalDark } from "@mkbabb/glass-ui/dark";
import { registerShortcut } from "@mkbabb/glass-ui/keyboard";
import { useCarousel } from "@mkbabb/glass-ui/carousel";
```

The mechanism behind the carve: when a consumer's entry chunk depends on Vue AND a manualChunks rule pulls vueuse to a leaf, Rollup hoists `@vue/shared` + `@vue/reactivity` + `@vue/runtime-core` into the vueuse bucket to satisfy both consumers. The entry chunk then imports from the vueuse leaf to access Vue, and Vite emits `<link rel="modulepreload">` to keep the eager critical path warm. The trap is the same SCC-hoist mechanism V.W1.T7 retired vue-echarts to escape; the vueuse subpath shape is the upstream fix for the same bug class. K.WS Phase 1 (v0.9.3) shipped the additive subpaths; **L.W1 Phase 2 (v1.0) removed the root-barrel re-exports** to actually close the trap. Speedtest dist/index.html modulepreload directives = 0 (was 1 at K close); speedtest entry-chunk gz dropped 32.5 KB. See `docs/tranches/L/audit/W1-A-root-barrel-curation-proof.md` for the v1.0 closure evidence + bundle deltas.

### Naming-pair disambiguation

Two pairs of subpath names sit close enough to confuse consumers; each names a different primitive:

- `@mkbabb/glass-ui/dock` exports `GlassDock` + `DockLayer` + `DockLayerGroup` + the dock-button family. `@mkbabb/glass-ui/dock-group` exports `DockGroup` — a different primitive (a chassis-strip wrapper, not part of the `GlassDock` composite).
- `@mkbabb/glass-ui/glass-carousel` exports `<GlassCarousel>` + `useGlassCarousel` (the custom-styled glass carousel composite). `@mkbabb/glass-ui/carousel` exports `useCarousel` + `CarouselApi` (the embla-carousel-vue primitive that the `<Carousel>` family wraps).

### v1.0 subpath retirements (L invariant 4 — no legacy aliases)

- `@mkbabb/glass-ui/composables/dark` REMOVED — use `@mkbabb/glass-ui/dark` (flat).
- `@mkbabb/glass-ui/composables/keyboard` REMOVED — use `@mkbabb/glass-ui/keyboard` (flat).
- `@mkbabb/glass-ui/pagination` REMOVED — `useOffsetPagination` retired (L.W3 Lane A; 0 production consumers).
- `@mkbabb/glass-ui/virtual` REMOVED — `useVirtualSectionWindow` + `useWindowedStore` + `virtualSectionLayout` retired (L.W3 Lane A; 0 production consumers).

The retirements break v0.9.x consumer shapes per L's v1.0-cohort identity (L invariant 16); `MIGRATION.md` ships the canonical migration path.

### Subpath authoring rules

- One `src/<name>.ts` per `exports[<name>]` entry. Every public subpath is **flat** post-L.W1 (no nested `composables/dark` shapes); flat entry-keys avoid the `vite-plugin-dts` `rollupTypes` nested-entry stub-emission bug surfaced at K.WS (L.W0 Lane III diagnostic).
- `vite.library.ts` `libraryEntries(rootDir)` lists the entry name keyed by the file basename minus extension. The corresponding `package.json` `exports` + `typesVersions` entries must be added in the same commit.
- Subpaths re-export named symbols only; no default exports anywhere in the library.
- Subpaths must NOT introduce a new peer-dependency: the substrate cost of a subpath is the same as the root barrel (one peer-dep, one Vue runtime). The only thing a subpath isolates is the *consumer-side bundle graph*.
- **Publication gate** (L invariant 18): `scripts/release.sh` runs `node -e 'import("@mkbabb/glass-ui/<sp>")'` + `npm run verify-export-types` for every published subpath BEFORE `git tag`. Closes the K.WS silent-miss class.

### CSS cascade (`src/styles/index.css`)

The 16 `@import` statements in `src/styles/index.css` are documented inline (L.W2 Lane B): tokens → typography → theme → glass → paper → component utilities → component CSS tail. Each layer depends on the prior layer's tokens. Per-file role + dependencies are recorded as comments in the cascade.

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
| Primitives | Buttons, Inputs, Textarea, Checkbox/Radio/Switch, Slider, NumberField, Select, Combobox, Multi-Select, Toggle, Label, Badge, MetricBadge, MetricPill, StatusDot, Pulse, Separator |
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
