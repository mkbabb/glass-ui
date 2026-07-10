# GlassPanel

A rimless glass-tier surface (`@mkbabb/glass-ui/glass-panel`). A bare glass plate — the glass
ladder tier without the Card's rim/shadow chrome — for a surface that wants the transmissive
glass material and nothing else.

```vue
<GlassPanel tier="floating">…</GlassPanel>
<GlassPanel surface="veil">…</GlassPanel>
```

## Export

- **`GlassPanel`** — the panel. It threads the shared `surface="glass" | "veil" | "opaque"`
  decoration axis (BA.W-SURFACE-AXIS) over a base glass tier, so `<GlassPanel surface="opaque">`
  is the solid escape through the ONE `--glass-level` machinery. It exposes the panel's tier +
  surface types for the consumer's own typing.

The panel is the plate for a consumer composing their own chrome; reach for `Card` when you
want the rim + padding ladder + header/content/footer sections, `GlassPanel` when you want the
bare transmissive material.
