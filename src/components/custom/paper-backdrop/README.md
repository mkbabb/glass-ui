# PaperBackdrop

A paper-texture backdrop surface (`@mkbabb/glass-ui/paper-backdrop`). A full-bleed paper wash —
the paper-underpaint + grain-overlay vocabulary as a mountable backdrop — for a calm content
route that wants the paper identity behind its cards without a live GL substrate.

```vue
<PaperBackdrop>
    …page content…
</PaperBackdrop>
```

## Export

- **`PaperBackdrop`** — the backdrop. It composes the `paper-underpaint` + `paper-grain-overlay`
  utilities (`paper.css`) into a mounted surface; it exposes its backdrop prop/type surface.

The backdrop is the calm-content lever (the one-GL-context-per-route budget keeps live substrates
off content routes — a paper/grid wash reads through the thin `wash`/`quiet` card tier instead).
Reach for it when a route wants the paper identity as its ground.
