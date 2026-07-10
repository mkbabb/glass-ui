# IconChip

The section-color POP primitive (`@mkbabb/glass-ui/icon-chip` + the root barrel; BA.W-ICON-CHIP).
The ONE color-event vehicle — a `color-mix(… 25%, transparent)` backplate + a full-chroma glyph
— the four inline `:style` chip pastes (icons / empty-states / auth-shell + MetricCell iconColor)
collapse onto.

```vue
<IconChip :section="8" :icon="Bell" />       <!-- the section-color ramp index -->
<IconChip :tone="'var(--success)'" :icon="Check" bare />  <!-- a complete token, no plate -->
```

## Export

- **`IconChip`** — the chip. `:section` (the `--section-color-N` ramp index) XOR `:tone` (a
  complete token); `:bare` is the no-plate register (MetricCell's `iconColor` reconciles onto
  it). The chip ≤ glyph proportion is enforced IN the component (`--icon-chip-glyph-ratio`
  floor, default 2.18) so a tiny `size` can NEVER collapse the plate under the glyph.

## The opt-in axes + the spring entrance (BB.W-SUFFUSE3)

Three disco-FREE opt-in axes: `:duotone` (low-α filled-tonal fill), `:bloom` (smooth-glass
hover), `:reveal` (composing `vReveal`, PRM-gated). The `icon-chip-reveal` entrance rides the
per-spring clock (`scale(0.85)→1` on `--spring-snappy-duration`, opacity coupled per motion-canon
P3, compositor-only, PRM snap-to-endpoint). The `:saturated` axis re-points
`--icon-chip-plate-strength` off the reference 25% stop to 40% (a louder focal pop, STILL ONE
color event). The backplate stays `in srgb` (the brand-overlay house path). Machine-locked by
`proof:icon-chip` + the one-color-event `proof:suffuse` predicates.
