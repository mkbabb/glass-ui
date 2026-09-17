# Chip

The single chip family (`@mkbabb/glass-ui/chip`). Root semantics are explicit and
independent from geometry:

```vue
<Chip>Static label</Chip>
<Chip v-model="selected" mode="selectable">Filter</Chip>
<Chip mode="action" @click="run">Run</Chip>
<Chip mode="removable" remove-label="Remove Fourier" @remove="remove">Fourier</Chip>
<Chip shape="icon"><Sparkles aria-hidden="true" /></Chip>
```

## Axes

- `mode: static | selectable | action | removable` — `static` is the noninteractive
  default; selectable uses Toggle and `aria-pressed`; action is a native button;
  removable is static content with one separately named remove button.
- `shape: pill | cell | icon` — geometry only. It never changes role, focus, state,
  or events.
- `size: xs | sm | md | lg`, `tone`, and `surface` remain orthogonal visual axes.
  `xs` is the static micro-pill rung (4/2px pads, fixed 11px roman type); `md` is the
  default. On a coarse pointer an INTERACTIVE chip still takes the 44px touch floor
  whatever its rung, so `xs` is for the static pill.

An unplated glyph is ordinary DOM. Interactive icon-only chips need an accessible
name on their actual button. Use ToggleGroup or SegmentedTabs when the owner requires
exclusive selection or roving focus rather than coordinating independent chips by hand.
