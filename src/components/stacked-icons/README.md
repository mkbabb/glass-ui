# StackedIcons

An overlapping icon/avatar stack (`@mkbabb/glass-ui/stacked-icons`). A row of icons or avatars
that overlap by a fixed offset with an optional "+N" overflow puck — the "shared by these
people" / "these facets" cluster.

```vue
<StackedIconGroup :items="avatars" :max="4" />
```

## Export

- **`StackedIconGroup`** — the stack. It lays the items out with a negative inline offset (the
  overlap) and renders an overflow puck for items past `max`. It exposes its group prop/type
  surface.

## The on-glass legibility (BB.W-DARK-READABILITY-REPAIR)

The `.glass-capsule` overflow puck composites brighter than the calm quiet plate, so it re-points
to the STRONGER on-glass foreground rung (`--on-glass-muted-strong`) while staying subordinate to
the `--foreground` ink — the "+N" label reads over the stacked glass in both modes.
