# AW.W25 — primitives-perfection audit (the cross-atom affordance/state/motion/a11y sweep)

Gate: `proof:primitive-affordance` — **PASS** (falsifiable; a synthetic revert of any one sub-fix turns it RED).

## Per-atom four-state + press-spring matrix

| Atom | hover | active-press (squish) | focus-ring | disabled | transition | notes |
|---|---|---|---|---|---|---|
| Button (`button/index.ts`) | per-variant | `.tap-squish` channel + `active:scale-[var(--scale-press-btn)]` (0.97) | `.focus-ring` | `disabled:opacity-disabled`/`pointer-events-none` | `.btn-pill` | spring channel from `.tap-squish`, scale value its own softer rung |
| Checkbox | `data-[state=checked]` fill | `.tap-squish` | `.focus-ring` | `disabled:opacity-disabled` | `transition-control` | glass-tint checked fill; `rounded-control` |
| RadioGroupItem | indicator | `.tap-squish` | `.focus-ring` | `disabled:opacity-disabled` | `transition-control` | |
| Switch | `data-[state]` track | thumb springs on `--spring-snappy` (translate) | `.focus-ring` | `disabled:opacity-disabled` | `transition-control` | glass-tint track + `--glass-highlight` thumb |
| SelectTrigger | `glass-wash` | `.tap-squish` | `.focus-ring` | `disabled:opacity-disabled` | `transition-control` | `aria-invalid:` destructive paint (W26) |
| TabsTrigger | `hover:text-foreground/70` | `.tap-squish` | `.focus-ring` | `disabled:opacity-disabled` | `transition-control` | `rounded-control`; sits over the indicator pill (`z-[1]`) |
| AccordionTrigger | `hover:underline` | `.tap-squish` | `.focus-ring` (NEW) | `disabled:opacity-disabled` (NEW) | `transition-control` (NEW) | was `transition-colors` + UA-outline only |
| CollapsibleTrigger | (consumer) | `.tap-squish` (NEW) | `.focus-ring` (NEW) | `disabled:opacity-disabled` (NEW) | `transition-control` (NEW) | was a bare passthrough |
| NumberField steppers | via `<Button variant="ghost">` | inherits Button's spring | inherits | inherits | inherits | press feedback via the composed Button |

The `.tap-squish` PRM reset (`@media (prefers-reduced-motion: reduce) { .tap-squish:active { scale: 1 } }`) is reachable for every squish atom — one source in `utilities.css`.

## Checkbox indeterminate rendered-glyph proof

reka 2.9's `CheckboxIndicator` force-mounts on `data-state="indeterminate"`, so the indicator branches the glyph: `<Minus class="… group-data-[state=indeterminate]:block">` (the dash) + `<Check class="… group-data-[state=indeterminate]:hidden">`. The render-effect spec (`tests/components/ui/reka-binding-idiom.test.ts`) mounts a Checkbox at `modelValue="indeterminate"`, asserts the root `data-state="indeterminate"`, both glyphs mount, and the reveal/hide classes are wired. Pre-fix: `Checkbox.vue` rendered `<Check>` unconditionally (the dash never showed).

## Form-radius computed-radius table

| Atom | radius | rung |
|---|---|---|
| Input | `9999px` | pill (`.input-pill`) — KEPT (single-line) |
| SelectTrigger | `9999px` | `rounded-pill` — KEPT (single-line) |
| Textarea | `--radius-field` (`1rem`) | `rounded-field` — was `9999px` stadium (FIXED) |
| NumberFieldInput | `--radius-field` (`1rem`) | `rounded-field` + the `.input-pill` glass recipe (was solid `bg-background`/`border-input`) |
| Checkbox / TabsTrigger | `--radius-control` (`6px`) | `rounded-control` — was raw `rounded-sm` (4px) |

Tokens minted in `theme.css` `@theme` (the radius scale's single source — no tokens.css twin): `--radius-field: var(--radius-2xl)`, `--radius-control: var(--radius-md)`.

## Overlay-band `glass-*` tier proof

| Surface | was | now |
|---|---|---|
| Toast (`Toast.vue`) | flat `bg-background`/`shadow-modal` | `glass-floating` |
| Command (`Command.vue`) | flat `bg-popover` | `glass-floating` |

Alert + Badge correctly STAY flat (content-band) — left untouched.

## Alert / Toast tone-resolution table

`alertVariants` + the Toast `variant` resolve `success`/`warning`/`info` from the `--{success,warning,info}` + `-foreground` tokens (the same tokens Badge already ships). Alert's tones ride the border/glyph/description (content-band register); Toast's ride the saturated plate. The `ToastVariant` union is sourced once from `use-toast.ts`. The demo fakes (`feedback/alert.vue` hardcoded `border-amber-500/…`; `feedback/toast.vue` local `toneClass` map) are retired onto the real CVA tones.

## Switch material + base Tabs indicator

- Switch track: `color-mix(in srgb, var(--input) 80%, var(--glass-bg-quiet))`; thumb: `bg-background` + `box-shadow: var(--shadow-md), var(--glass-highlight)`; travel springs on `transition: translate var(--duration-normal) var(--spring-snappy)`.
- Base `TabsList` now renders `<TabsIndicator>` (the spring pill on `--reka-tabs-indicator-*`, `bg-secondary/80`, `ease-spring-snappy`) behind the triggers; `:indicator` prop (default `true`) opts out. The base default Tabs now matches its own indicator primitive.

## W13 / W18 floor re-assertion (composed, not re-owned)

- gold-audacious rest foreground = `text-foreground` (warm ink, AA over the 8%-gold-tint rest substrate) — W13-owned, unchanged.
- `.input-pill` resting border = `1.5px solid var(--surface-tint-15)` (15%α, above the 8%α floor) — W13-owned, unchanged.
- the `[aria-invalid]` destructive ring rides the widened `:where(:user-invalid, .user-invalid-fallback, [aria-invalid="true"])` group — W18-owned, unchanged; W26 supplies the SelectTrigger/ComboboxInput paint.

No floor regressed under the §1-§9 sweep.

## Browser-verify notes (Playwright, orchestrator-run)

At 1440×900: (1) mid-press squish on Checkbox/Radio/Switch-thumb/SelectTrigger/TabsTrigger/AccordionTrigger; (2) the Checkbox indeterminate DASH (not a check) at `checks.vue`; (3) the Textarea with finite `--radius-field` corners (not stadium ends) at `textarea.vue`; (4) Toast + Command on the floating glass substrate (backdrop blur); (5) Alert in all five tones at `feedback/alert.vue`, Toast in all five tones at `feedback/toast.vue`; (6) the base Tabs indicator pill spring-sliding between triggers at `navigation/tabs.vue`.
