# Constellation

A slow, geometric proximity-graph lattice — a field of nodes that drift on constant velocities,
bounce off the bounds, and join with hairline edges wherever two fall within `link` px, so the web
continually re-triangulates. It is a Canvas2D substrate primitive: the neutral lattice (edges,
nodes, pointer-web, tap ripples) ships in the library; any focal/branded mark (a flagged "anomaly"
node, an annotation callout) is painted by the consumer through an injected `drawOverlay` pass.

It is the Canvas2D sibling of the WebGL substrates ([`Aurora`](../aurora/), [`GooBlob`](../goo-blob/)):
where those are per-pixel GPU fields, the constellation is a small CPU vector field on a 2D context.
All three compose the same lifecycle/park contract — the constellation over
[`useCanvas2D`](../../../composables/glass/canvas2d/), the WebGL pair over
[`useWebGLCanvas`](../../../composables/glass/webgl/).

> Research-backed. This README documents the constellation as it ships. The primitive lands the
> `useCanvas2D` + `Constellation` design that AV.W8 authored but GATED-NOT-LANDED (it had one
> consumer then); the slides anomaly-ring deck is consumer #2 that unblocked it (AW.W17). The
> mechanical engine — drifting nodes, distance-falloff edges, pointer steer, ripples — is lifted
> from the slides `til-briefing/constellation.ts`; the branded content (the NC State red anomaly
> ring, the dashed callout) stays a consumer skin, not a library export.

```ts
import { Constellation } from "@mkbabb/glass-ui/constellation";
```

---

## What it is

A **proximity graph** (a geometric / unit-disk graph) animated frame by frame:

- **Field** — `count` nodes seeded in the canvas, each with a constant velocity. They drift and
  reflect off the walls. Any two nodes within `link` px are joined by a hairline edge whose opacity
  falls off with distance (`alpha ∝ 1 − d²/link²`), so the lattice is never static — it continually
  re-triangulates as nodes pass in and out of range. This is the same "near neighbours are linked,
  far ones are not" structure as the canonical particle-network motif, but slow and geometric, not a
  dense particle storm.
- **Determinism** — the node layout is driven by glass-ui's single-source seeded PRNG
  ([`mulberry32` + `hashString`](../../../utils/prng.ts)). Pass a `seed` (number or string) for a
  reproducible web — the same field every load, which a capture/snapshot mode needs. Omit it for a
  fresh `Math.random` field per mount.
- **Passes** — the render is independent passes over the same field, sharing only the 2D context:
  edges, ambient node dots, the pointer-web, and the tap ripples — then the consumer's `drawOverlay`
  LAST. The split keeps the neutral lattice and the branded skin cleanly separated: the library
  paints the four neutral passes; the consumer paints whatever focal content it wants on top.
- **Substrate** — it composes the shared [`useCanvas2D`](../../../composables/glass/canvas2d/)
  Canvas2D substrate, which owns the canvas lifecycle: dpr-clamped resize, the RAF loop, and the
  full pause machinery (offscreen, tab-hidden, reduced-motion). The constellation never bootstraps
  its own context or RAF loop, and inherits the same freeze contract every glass-ui substrate has.

It renders on a transparent canvas behind content (`pointer-events: none` by default), so it sits as
a quiet textural field under a hero, a cover, an empty state, or a 404.

---

## Use cases

- **Ambient cover/section field** — a full-bleed lattice behind a display headline, slow enough to
  read as texture rather than motion. The cream-on-cream node tone keeps it subordinate to type.
- **Empty / loading / 404 surface** — a calm, alive backdrop that costs nothing when the surface is
  offscreen or the tab is hidden (the substrate parks).
- **A flagged-node narrative** — drift the neutral lattice, then paint ONE focal node + an annotation
  via `drawOverlay`. The slides deck does exactly this: a red "anomaly" node pinned in the field with
  a pulsing ring and a dashed callout, telling an audit story over the neutral web. The focal content
  is the consumer's; the lattice is the library's.

When NOT to reach for it: a dense, fast particle storm, a force-directed graph with semantic edges,
or a data viz where edges encode real relationships — the constellation's edges are proximity
hairlines, not data. For per-pixel organic color fields use [`Aurora`](../aurora/) /
[`GooBlob`](../goo-blob/).

---

## Quick start

```vue
<script setup lang="ts">
import { Constellation } from "@mkbabb/glass-ui/constellation";
</script>

<template>
    <!-- a quiet, reproducible cream lattice behind a hero -->
    <div class="relative isolate">
        <Constellation
            class="absolute inset-0 -z-10"
            seed="hero-cover"
            :count="56"
            :link="132"
            :speed="0.16"
        />
        <h1 class="text-display">…</h1>
    </div>
</template>
```

To paint a focal mark, inject a `drawOverlay` — it runs after the neutral passes with the live field:

```vue
<script setup lang="ts">
import { Constellation } from "@mkbabb/glass-ui/constellation";
import type { ConstellationField } from "@mkbabb/glass-ui/constellation";

// a focal node pulsing in the primary tone — your skin, not the library's
function drawFocal(ctx: CanvasRenderingContext2D, field: ConstellationField, now: number) {
    const n = field.nodes[0];
    const phase = (now % 2600) / 2600;
    ctx.strokeStyle = getComputedStyle(field.canvas).getPropertyValue("--primary");
    ctx.globalAlpha = (1 - phase) * 0.5;
    ctx.beginPath();
    ctx.arc(n.x, n.y, (12 + phase * 20) * field.k, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
}
</script>

<template>
    <Constellation seed="cover" :count="64" :draw-overlay="drawFocal" pointer-reactive />
</template>
```

---

## API

### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `count` | `number` | `64` | node count |
| `link` | `number` | `132` | edge-join radius (px at the 1280 base width; scaled by `k`) |
| `speed` | `number` | `0.16` | node drift speed |
| `seed` | `number \| string` | — | omit → fresh `Math.random` field; supply → reproducible `mulberry32` field (string hashed via `hashString`) |
| `pointerReactive` | `boolean` | `true` | nodes steer gently toward the cursor + taps drop ripples (disabled under reduced-motion) |
| `drawOverlay` | `(ctx, field, now) => void` | — | the consumer skin pass; runs LAST, after the four neutral passes, with the live `ConstellationField` |
| `class` | `string` | — | forwarded to the host (pin/position/z-index live here) |

### `ConstellationField`

The live field handed to `drawOverlay` — read-only, the consumer paints against it but does not mutate:

| Field | Type | Notes |
|---|---|---|
| `nodes` | `Node[]` | `{ x, y, vx, vy, r, dim }` per node, canvas-local px |
| `canvas` | `HTMLCanvasElement` | for `getComputedStyle` token reads (palette / dark-flip) |
| `w` / `h` | `number` | canvas CSS px |
| `k` | `number` | the width/base scale (`w / 1280`) — multiply px constants by `k` so a skin scales with the field |
| `dpr` | `number` | the device-pixel ratio the context is transformed by (clamped ≤ 2) |

The library exports `ConstellationProps` + `ConstellationField` on `@mkbabb/glass-ui/api`.

---

## Interaction model

When `pointerReactive` (the default, off under reduced-motion):

- **Steer** — nodes within reach of the cursor curve gently TOWARD it but keep their speed, so the
  lattice leans in without clumping or accelerating; the slow geometric drift is preserved.
- **Pointer-web** — the cursor itself joins the web: faint edges link it to every node within reach,
  plus a soft cursor node.
- **Ripple** — a tap/click drops an expanding ring that fades over ~0.9s.

The host canvas is `pointer-events: none` (it sits behind content), so the listeners attach to the
host element and map viewport coordinates into canvas-local px via `getBoundingClientRect` — which
keeps the mapping correct even when the surface is CSS-scaled (a deck-scale transform, a zoom).

---

## Best practices

- **Pin via `class`, not the component.** The library owns the field math; the consumer owns the
  chrome. Position/z-index/`inset-0`/safe-area live in the `class` you pass — the same math/chrome
  split [`DeckProgress`](../deck-progress/) uses.
- **Seed for captures.** A snapshot/print/export mode wants a reproducible web — pass a `seed` so the
  field is deterministic frame-over-frame; omit it for live variety.
- **Tone the palette with tokens.** The neutral passes read `--constellation-node` / `--constellation-line`
  (with neutral fallbacks). Override them at the consumer to retint; the field re-samples on a
  dark-mode flip so the lattice tracks the color mode instead of freezing at the arm it mounted under.
- **Keep the skin in `drawOverlay`.** Anything branded — a red anomaly, an annotation, a domain mark —
  belongs in your overlay pass, not the library. That is the seam that lets one lattice serve many
  consumers without any one consumer's identity leaking into the primitive.

---

## Performance notes

The cost is `O(count²)` per frame for the edge pass (every pair tested against `link²`, the square
compared to avoid a `sqrt`). At the default `count: 64` that is ~2K cheap distance checks a frame — a
small CPU field, not a GPU concern. Keep `count` modest (≤ ~96) for a calm field; the motif reads as
texture well below the density where the quadratic bites.

The substrate parks the RAF entirely when the host is offscreen (`IntersectionObserver`,
`rootMargin: 200px`), the tab is hidden (`document.hidden`), or `prefers-reduced-motion: reduce` is
set — so a constellation that is not on screen attaches zero frames. dpr is clamped to 2 so a 3×
display does not triple the fill cost.

---

## Accessibility

The canvas is decorative — it carries no semantic content, sits behind the type at
`pointer-events: none`, and is `aria-hidden` by default. Under `prefers-reduced-motion: reduce` the
substrate paints ONE static frame and parks the loop (the lattice is present but still); the pointer
steer + ripples are disabled. The freeze is live-monitored — a runtime PRM flip re-freezes or re-arms
without a remount. Because the field is purely ambient texture, no pause/play control is required (it
is not the auto-running, attention-pulling background that WCAG 2.2.2 obligates a stop control for —
that contract is the AV-background story the WebGL substrates carry via `DockBackgroundToggle`).

---

## Examples

**A reproducible cover field with a focal overlay**

```vue
<Constellation
    class="absolute inset-0 -z-10"
    seed="til-cover"
    :count="64"
    :link="132"
    :draw-overlay="drawAnomaly"
    pointer-reactive
/>
```

The slides deck consumes the primitive exactly this way: the neutral lattice on warm cream, and a
`drawAnomaly` overlay that pins a red anomaly node with a pulsing ring + a dashed monospace callout.
The red, the pulse cadence, and the callout typeface are all in the consumer's overlay — the library
ships none of them.

---

## Architecture

```
src/components/custom/constellation/
├── Constellation.vue        # the component: composes useCanvas2D, seeds via prng,
│                            #   runs the four neutral passes, then drawOverlay
├── constellationField.ts    # the pure engine: Node, seedField, stepField, and the
│                            #   four neutral draw passes as free functions
├── index.ts                 # package barrel
└── README.md                # this file

src/composables/glass/canvas2d/
└── useCanvas2D.ts           # the Canvas2D lifecycle substrate (dpr-resize, RAF-park,
                             #   offscreen + tab-hidden + reduced-motion freeze, dispose)
                             #   — the Canvas2D parallel to useWebGLCanvas
```

The neutral/skin split is the load-bearing design choice: `constellationField.ts` contains NO
anomaly pass, no accent color, no callout typeface — only the four neutral passes. The branded mark
reaches the canvas exclusively through `Constellation.vue`'s `drawOverlay` prop. The single-source
PRNG ([`prng.ts`](../../../utils/prng.ts)) is consumed verbatim — the constellation re-rolls no
`mulberry32` of its own.

---

## References

- M. R. Garey & D. S. Johnson — unit-disk / proximity-graph structure (near-neighbours linked within
  a radius). The constellation's edge rule is the geometric proximity graph, not a data graph.
- The canonical particle-network motif (VANTA.NET / particles.js family) — the visual ancestor; the
  constellation is its slow, geometric, token-toned restatement on the glass-ui substrate.
- glass-ui internals — [`useWebGLCanvas`](../../../composables/glass/webgl/useWebGLCanvas.ts) (the
  park/freeze/dispose contract `useCanvas2D` parallels), [`prng.ts`](../../../utils/prng.ts) (the
  single-source `mulberry32` + `hashString`), [`useIntersectionPause`](../../../composables/motion/useIntersectionPause.ts)
  + [`useResizeObserver`](../../../composables/dom/useResizeObserver.ts) (composed by the substrate).
