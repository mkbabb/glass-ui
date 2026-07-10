# Pulse

A loading-pulse indicator (`@mkbabb/glass-ui/pulse`). A compositor-only pulse — dots or a ring —
for an indeterminate "working" state, the calm loading register beside the Skeleton shimmer.

```vue
<Pulse variant="dots" />
<Pulse variant="ring" />
```

## Export

- **`Pulse`** — the indicator. `variant`: `dots` (a row of pulsing dots) or `ring` (a pulsing
  ring). The pulse rides opacity/scale/transform only (compositor-safe, `proof:no-layout-
  animation` holds) and collapses to a static frame under `prefers-reduced-motion`.

Reach for `Pulse` for an indeterminate spinner-analogue; reach for `Skeleton` when you want a
content-shaped placeholder, `Progress` when the work has a determinate value.
