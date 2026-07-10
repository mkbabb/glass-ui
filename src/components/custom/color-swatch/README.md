# ColorSwatch

The first-class color-input register (`@mkbabb/glass-ui/color-swatch`; BA.W-CONFIG-CHASSIS).
A proportioned chip swatch + hex affordance over the native `<input type=color>` — the
invisible native input is the accessible carrier, the visible chip is the proportioned
register. It replaces the raw full-width `<input type=color w-full>` slabs (the aurora Seed /
DERIVE seed, the blob Seed).

```vue
<ColorSwatch v-model="hex" />
```

## Export

- **`ColorSwatch`** — the swatch. `v-model` is the color value; the chip renders the current
  color proportioned (never a full-bleed slab), the hex affordance shows/edits the value, and
  the native color input carries focus + the platform picker.

The swatch is a Configurator-chassis register — a controls-column color input that reads as a
first-class control, not a browser default box.
