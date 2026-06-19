# W-GLASS-GLOW-FIX — §0 EVIDENCE PASS (Atlas A-8 root: the spurious unbounded radial halo)

The binding first step (the wave spec §0): root WHICH library-CSS rule leaks the
spurious unbounded radial halo the Atlas confirms over-painting a glass surface on its
viz routes, and DISCONFIRM the candidates that are NOT the leak. The Atlas confirms the
SURFACE (a viz route it consumes — `aurora, constellation, glass-panel, dock` + the root
barrel); this pass roots the LIBRARY rule. The fix targets the MECHANISM, not the pixel.

## The candidate inventory (measured, file:line at HEAD)

| # | Rule | file:line | Mechanism | Verdict |
|---|------|-----------|-----------|---------|
| 1 | `.pulse-aura` breath-scaled radial | `src/components/custom/pulse/Pulse.vue:161-180` | `position:absolute; inset:0; transform: scale(→1.15 / 1.22 vivid)` with **NO clip**; the host is NOT guaranteed `overflow:clip` | **ROOT** |
| 2 | `--glass-spine-vignette` / `--glass-curvature-overlay` `--phase-color` read | `src/styles/tokens/glass-fx.css:232-236,314-318` | `radial-gradient(ellipse …)` reading `--phase-color`; could tint a viz card via a stray ancestor cascade | DISCONFIRM |
| 3 | `.glass-material::before` specular | `src/styles/glass/material.css:65-185` | masked radial-gradient catch-light disc, `z-index:1`; over-canvas stacking vector | DISCONFIRM (already bounded) |
| 4 | `.dock-morph-bridge-plate` radial | `src/styles/dock/morph-bridge.css:68-83` | `radial-gradient(120% 120% …)` LARGER than the plate box on the perf-gated teardrop | DISCONFIRM-as-painted-source; bounded defensively |

## The rooted leak — CANDIDATE 1 (the unclipped breath-scaled Pulse aura)

`src/components/custom/pulse/Pulse.vue:161-180` — the `.pulse-aura` layer:

- `position: absolute; inset: 0; border-radius: inherit` — it scopes to its host's box.
- `transform: scale(var(--animate-ambient-pulse-scale-min, 1))` at rest, animated by
  `@keyframes ambient-pulse` (`src/styles/animations.css:206-220`) to
  `scale(var(--animate-ambient-pulse-scale-max, 1.15))` at the 50% breath peak —
  `1.15` (`scheme-motion.css:291`), `1.22` on `intensity="vivid"` (Pulse.vue:73).
- **NO `overflow` / NO clip on the aura layer**, and the host is NOT required to be
  `overflow: clip`. The aura doc itself only requires the host be `position: relative`
  and own a `border-radius` (Pulse.vue:13-16) — NOT that it clip.

THE LEAK MECHANISM (measured): when the host is `overflow: visible` — a viz/showcase
tile, a card without `overflow:clip`, or a **bare relative wrapper** — the `inset:0` +
`transform: scale(1.15)` radial **spills past the host edge** and over-paints whatever
sits behind/beside it (a neighboring glass card, a viz canvas). The demo aura host
(`demo/stories/display/pulse.vue:70-84`) places `<Pulse variant="aura">` directly inside
a bare `flex flex-col` wrapper with NO positioned/clipping host — so the aura positions
against the nearest positioned ancestor and its scaled radial escapes its intended
`inset:0` bounds entirely. This is the exact "glass surface on a viz" the A-8 report
names: `<Pulse variant="aura">` is a viz/loading decoration over a substrate, and the
`inset:0` + `scale(1.15)`-with-no-clip is the unbounded-halo mechanism.

## Why the others are DISCONFIRMED as the painted A-8 source

- **CANDIDATE 2 (spine/curvature vignette):** the `--phase-color` read defaults to the
  neutral `--surface-tint-8` (`glass-fx.css:316`) and the curvature overlay reads the
  warm-cream `hsl(40 30% 96%)` at `--glass-curvature-intensity: 0.02` falling to
  `transparent 38%` (`glass-fx.css:231-236`) — a thin top-edge sheen, NOT a giant halo.
  Both are consumed only by `<InstrumentChassis>`, not a bare viz card. A stray
  `--phase-color` cascade onto an unrelated viz card is hypothetical; no painted instance
  in the inventory. NOT the painted root.
- **CANDIDATE 3 (over-canvas specular):** the `.glass-material::before` disc is masked
  (`--glass-edge-glint-band` rim mask + own-radius clip) and in-paint-bounded
  (`--glass-specular-size: 36%`, falloff `/0` at 70%), `--specular-intensity` defaults 0
  at rest (`material.css:96`) so an unwired surface paints NOTHING. It is NOT unbounded by
  itself. NOT the painted root.
- **CANDIDATE 4 (bridge radial):** the `120% 120%` is the gradient EXTENT, not an
  overflow; the plate's own `border-radius: 999px` already clips the fill to the capsule,
  and the bridge is perf-gated OFF by default. Lower-probability; bounded defensively (see
  the fix) so the class holds, but NOT the painted A-8 source.

## The fix (ROOT + BOUND, not paper-over)

1. **CANDIDATE 1 (the root):** `overflow: clip` added to the `.pulse-aura` LAYER
   (`Pulse.vue`) — the bound is on the aura, not the host, so the 1.15× / 1.22× breath
   peak is clipped to the aura's own `inset:0` border-box and NEVER spills past the host
   edge, on EVERY consumer surface regardless of the host's own overflow. The contained
   ambient halo is PRESERVED (the radial still paints its full read inside the box); only
   the past-bounds spill dies. PRM-static untouched (the reduce arm already holds the
   breath-min static halo at `scale(1)`).
2. **CANDIDATE 4 (defensive class-close):** `overflow: clip` added to
   `.dock-morph-bridge-plate` (`morph-bridge.css`) — the 120% radial is bounded inside the
   teardrop silhouette explicitly (the `border-radius` already clipped it; this makes the
   bound structural so the leak-class gate holds). Zero visual change.

## The structural close (the gate)

`scripts/proof-glass-glow-fix.mjs` codifies the rooted mechanism class-wide: G1 the
rooted aura is BOUND (`.pulse-aura` carries `overflow: clip`); G2 the leak PATTERN is
barred — no radial-gradient glow layer is `inset:0` + `transform: scale(>1)` with NO clip
on the layer, and no `::before` catch-light paints over a canvas-content glass card; G3
the intentional glows are PRESERVED (the aura radial, the `.glass-material::before`
catch-light, the chassis sheen all still read). The disease-root bite plants the rooted
leak pattern (a `.pulse-aura` with `overflow:visible` + `scale(1.15)`) and asserts it
reds. The π readback (`tests-visual/glass-glow-fix.spec.ts`) is the binding painted truth:
over the aura/viz route the breath-scaled aura stays within its host content box (no large
soft radial bleed past the host edge), BOTH modes.

## PAINT-ARM (pending-orchestrator-capture)

- **Surfaces:** the aura/viz route `/display/pulse` (the `<Pulse variant="aura">`
  showcase) + the morph-showcase route (the bridge teardrop), both modes + WebKit.
- **Target:** NO spurious large radial halo over-paints any glass/viz surface; the
  intentional aura halo reads as a contained light WITHIN its host content box; the
  catch-light/chassis sheen read on their own surfaces. BEFORE (the spill visible) →
  AFTER (the halo bounded). Lands at `W-GLASS-GLOW-FIX-DELTA.md` under
  `audit/screenshots/session-*/`.
