# ToggleChip

A segmented chip/cell toggle (`@mkbabb/glass-ui/toggle-chip`). A single toggleable chip — a
pressable pill that flips a boolean or selects within a small set — the chip-shaped toggle
beside the SegmentedTabs strip.

```vue
<ToggleChip v-model:pressed="on">Grid</ToggleChip>
```

## Export

- **`ToggleChip`** — the chip. It exposes its chip prop/type surface; the pressed state reads the
  selected-as-glass register (a glass tint FORWARD of the rest fill, never a saturated
  `--foreground` slab).

## The de-red'd hover register (BA.W-GLASS-CAL)

The chip re-points off the flat `transition-colors duration-150 ease-out` onto the §6 register —
a `--spring-smooth` scale lift + the surface bezier legs — so the toggle reads as a coherent
glide, not a fast color-snap. Reach for `ToggleChip` for a single chip toggle;
`<ToggleGroup type="multiple">` for a set of independent N-pressed toggles, `SegmentedTabs` for
a single-select strip.
