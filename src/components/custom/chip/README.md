# Chip

The ONE folded chip (`@mkbabb/glass-ui/chip`, subpath-only — OFF the root barrel). A
single toggleable lozenge over a reka-ui `Toggle` root, carrying `aria-pressed` and
keyboard semantics. `<Chip>` (BI.W-CHIP-FOLD) unifies the retired `ToggleChip` +
`SelectableChip` — ToggleChip's `variant` (`chip`/`cell`) was a pure name-synonym of
SelectableChip's `shape` (`pill`/`cell`) over the SAME CVA, so the two merge
compile-time onto ONE recipe.

```vue
<Chip v-model="on">Grid</Chip>                                <!-- plain toggle -->
<Chip v-model="on" :tone="'var(--section-color-7)'">React</Chip>   <!-- tonal -->
<Chip v-model="on" shape="cell"><Icon /><span>Warm</span></Chip>   <!-- square tile -->
```

## Axes

- **`shape: pill | cell`** — the silhouette. `pill` (default) is the stadium capsule
  (the retired `ToggleChip variant="chip"` / `SelectableChip shape="pill"`); `cell` is
  the square icon+label TILE at `--radius-card` (the retired `variant="cell"`).
- **`size: sm | md | lg`** — the structural padding/text rung. Radius is size-invariant
  (the capsule re-rounds at every height).
- **`tone` (opt-in)** — a complete `<color>` (e.g. `var(--section-color-7)` or a
  concrete `oklch(…)`). UNSET ⇒ the plain warm-floor glass toggle. SET ⇒ the
  contrast-floored tonal-accent register (the `.accent-tone` channels: a faint idle
  FILL floored ≥3:1, a bolder active BAND + EDGE rim, and a contrast-safe INK label).
- **`surface` (opt-in)** — the shared {glass·veil·opaque} decoration axis.

## The value.js quarantine (BI.W-CHIP-FOLD)

`<Chip>` ships `/chip` ONLY, OFF the value.js-free root barrel. The tonal ink solve
(`safeAccentColor`, value.js) rides a dynamic `import('./accent-tone-solve')` boundary
INSIDE `useAccentTone` (the sync value.js-free shell), so the eager `/chip` chunk is
value.js-FREE: a plain-boolean toggle (a `var()` / unset tone) never loads value.js
(the measured 26KB quarantine; the /border-progress BC.W-AX-BP-LAZY precedent). Only a
concrete `#hex`/`oklch(…)` tone loads the value.js leaf, and it upgrades the ink on the
next tick (imperceptible on a determinate chip; the CSS `var(--accent-ink-resolved,
var(--foreground))` fallback carries the interim).

## When to reach for it

Reach for `<Chip>` for a single chip toggle (plain or tonal); `<ToggleGroup
type="multiple">` for a set of independent N-pressed toggles; `<SegmentedTabs>` for a
single-select strip. `IconChip` is a DISTINCT primitive (the section-color POP vehicle),
NOT folded here. `Badge` (static, non-interactive) SURVIVES.
