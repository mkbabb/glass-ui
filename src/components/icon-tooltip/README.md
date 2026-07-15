# IconTooltip

An icon-with-tooltip primitive (`@mkbabb/glass-ui/icon-tooltip`). An icon glyph that carries a
tooltip label — the accessible "info glyph" pattern, pairing a `@lucide/vue` icon with the house
Tooltip surface in one node.

```vue
<IconTooltip :icon="Info" label="What this measures" />
```

## Export

- **`IconTooltip`** — the icon+tooltip. It composes the Tooltip provider/trigger/content family
  (the `rounded-tooltip` token + the glass top-layer surface) around an icon trigger, so the
  glyph announces its label on hover/focus.

Reach for `IconTooltip` for a bare info glyph; reach for `HoverPopover` when the hover surface
is richer than a text label.
