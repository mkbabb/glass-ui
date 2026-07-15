# Constellation

A slow, geometric proximity-graph lattice — a field of nodes that drift on constant velocities,
bounce off the bounds, and join with hairline edges wherever two fall within `link` px, so the web
continually re-triangulates. It is a Canvas2D substrate primitive: the neutral lattice (edges,
nodes, pointer-web, tap ripples) ships in the library; any focal/branded mark (a flagged "anomaly"
node, an annotation callout) is painted by the consumer through an injected `drawOverlay` pass.

It is the Canvas2D sibling of the WebGL substrates ([`Aurora`](../aurora/), [`Blob`](../blob/)):
where those are per-pixel GPU fields, the constellation is a small CPU vector field on a 2D context.
All three compose the same lifecycle/park contract — the constellation over
[`useCanvas2D`](../../../composables/glass/canvas2d/), the WebGL pair over
[`useWebGLCanvas`](../../../composables/glass/webgl/).

> **Research-backed.** This README documents the constellation as it ships, with the proximity-graph
> and Canvas2D-substrate techniques cited under [`## References`](#references) (the Garey–Johnson
> proximity-graph / particle-network-motif ancestry). The neutral lattice — drifting nodes,
> distance-falloff edges, pointer steer, ripples — ships in the library; the branded focal content
> (an anomaly ring, an annotation callout) stays a consumer skin painted through `drawOverlay`, not a
> library export. The focal node is a first-class engine concept: a **click-to-warp** spring
> (`warpTo` + `warpOnClick`), an auto-**`wander`** cadence, and a pointer-held **`gravityWell`** all
> ride the SAME warp seam — drift and warp are ONE mechanic.

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

It renders on a transparent canvas, so it can sit as a quiet textural field under a hero, a cover,
an empty state, or a 404. A placed background consumer may set `pointer-events: none`; a foreground
instance retains host input only for the interaction modes it explicitly enables.

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
[`Blob`](../blob/).

### Non-goal — the constellation is DECORATIVE, not a data-graph renderer

The constellation is a **decorative random-seeded proximity graph**, NOT a data-graph renderer. It
will **NOT** absorb semantic fixed-topology graphs (a value.js conversion graph, a node-flow chart, a
dependency DAG). Routing a semantic graph through `drawOverlay` would FAIL — `drawOverlay` paints OVER
a random drifting field it cannot pin to fixed nodes; the focal-warp seam re-points among the random
nodes, it does not lay out a fixed topology. A data-graph primitive, if ever wanted, is a **SEPARATE
component** with its own layout + edge semantics, NOT constellation prop-bloat. The seam stays a
decorative-field skin injection, not a graph-data binding.

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
| `warpOnClick` | `boolean` | `false` | pointer activation warps the focal node to the nearest drifting node; Enter/Space targets the field center through the same warp owner. Enabling it gives the host a named button contract. Disabled under reduced-motion |
| `wander` | `boolean \| { minIdle?, jitter? }` | `false` | auto-DRIFT: a periodic auto-pick re-points the focal node to a random node on a jittered cadence, on the SAME warp spring (no second rAF). `true` uses the 8–16s default cadence; the object tunes `minIdle`/`jitter` (ms). PRM-gated — the cadence lives inside the `!reducedMotion` step block, so under reduced-motion it never advances |
| `gravityWell` | `boolean \| { holdMs?, gain?, reach?, ramp?, maxSpeed? }` | `false` | pointer hold/release and keyboard press/release drive the same inverse-square well target. Enabling it gives the host a named button contract. `true` uses the tokenised defaults; an object overrides them. Disabled under reduced-motion |
| `pinned` | `boolean \| number` | `false` | PINNED node (AZ.W-CON-GEN G1): a node HELD by every step pass — it does not drift, bounce, steer toward the cursor, or feel the gravity-well, so it holds its seeded position (the flagged node a consumer pins). `false` → no pin; `true` → node 0; a number → that index |
| `accentEdges` | `boolean` | `false` | ACCENT-edge skin (G2): edges incident on the pinned (else focal) node stroke the `--constellation-accent` tint at the `--constellation-edge-accent-alpha` weight — the flagged-node tether. Default OFF (the neutral single-color pass) |
| `pinnedDrift` | `boolean \| { wanderFrac?, durMs?, minIdle?, jitter? }` | `false` | autonomous PINNED-ANCHOR drift (G5): the pinned node gently wanders its seeded anchor (default ±0.14 of the canvas) on a jittered cadence — DISTINCT from `wander` (which re-targets the warp). A closed-form easeInOutQuad stepped inside the single rAF; PRM-gated |
| `warpAutoRelease` | `boolean` | `false` | warp AUTO-RELEASE (G6): a settled warp clears its target so the focal rides its node's raw drift (the identity-ride), freeing the spring. Default OFF (the warp holds its target forever). Read the settled signal via the `warpSettled()` expose |
| `freeze` | `boolean` | — (auto) | deterministic-capture: a reproducible STATIC frame (no `stepField`, no advance) + a FROZEN `now` to `drawOverlay`. Omit → auto-derives from `?export \| ?print \| ?freeze`; `false` forces live. Set `seed` for cross-run determinism |
| `drawOverlay` | `(ctx, field, now) => void` | — | the consumer skin pass; runs LAST, after the four neutral passes, with the live `ConstellationField`. Read `field.warp.{x,y}` for the spring-eased focal position. Under `freeze` it receives a FROZEN `now` |
| `class` | `string` | — | forwarded to the host (pin/position/z-index live here) |

### Exposed methods (`defineExpose`)

| Method | Signature | Notes |
|---|---|---|
| `field` | `ConstellationField` | the live field (the low-level imperative seam for a custom overlay) |
| `warpTo` | `warpTo(localPoint: {x,y}): number` | warp to the nearest node to an **already-canvas-local** px point (the lower primitive) |
| `warpTo` | `warpTo(clientX, clientY): number` | warp to the nearest node to a **client** point, mapped through the deck-scale `toLocal` (the sugar `warpOnClick` calls). Returns the chosen node index, or `-1` on a degenerate no-op |
| `warpSettled` | `warpSettled(): boolean` | the settled signal (AZ.W-CON-GEN G6) — `true` when the warp spring has ARRIVED on its target (or no warp is active). The `isSettled` read a consumer polls to drive its own UI (a "warping…" indicator) |
| `pinNode` | `pinNode(idx: number): void` | imperatively re-point the pinned node (G1) — `idx` is HELD by every step pass; `idx < 0` clears the pin. Re-anchors the `pinnedDrift` on its next leg |
| `holdWellAt` / `releaseWell` | `(x, y) => boolean` / `() => void` | imperatively arm/release the gravity-well at a canvas-local point (the test/debug seam; no-op when `gravityWell` is off) |

### `ConstellationField`

The live field handed to `drawOverlay` — read-only, the consumer paints against it but does not mutate:

| Field | Type | Notes |
|---|---|---|
| `nodes` | `Node[]` | `{ x, y, vx, vy, r, dim }` per node, canvas-local px |
| `canvas` | `HTMLCanvasElement` | for `getComputedStyle` token reads (palette / dark-flip) |
| `w` / `h` | `number` | canvas CSS px |
| `k` | `number` | the width/base scale (`w / 1280`) — multiply px constants by `k` so a skin scales with the field |
| `dpr` | `number` | the device-pixel ratio the context is transformed by (clamped ≤ 2) |
| `focalIndex` | `number` | the designated focal node's INDEX, or `-1` when none is focal (re-points on each `warpTo`; node count is conserved) |
| `warp` | `ConstellationWarp` | the engine-owned warp spring: `{ x, y, vx, vy, targetIdx }`. A `drawOverlay` paints the focal mark at `warp.{x,y}` (the spring-eased position) |
| `pinnedIndex` | `number` | the PINNED node's INDEX (AZ.W-CON-GEN G1), or `-1` when none is pinned — the node every step pass HOLDS. A `drawOverlay` reads `field.nodes[field.pinnedIndex]` to pin a flagged mark on it |
| `pinnedDrift?` | `ConstellationPinnedDrift` | the autonomous pinned-anchor drift state (G5), present when `pinnedDrift` is on (absent → the pin holds dead-still) |
| `warpAutoRelease?` | `boolean` | the warp auto-release flag (G6) — a settled warp clears its target (the identity-ride) |

The library exports `ConstellationProps` + `ConstellationField` + `ConstellationWarp` — plus the full type set including `ConstellationPinnedDrift` and the engine fns `stepPinnedDrift` / `makePinnedDrift` / `warpSettled` — on `@mkbabb/glass-ui/constellation`.

### The label / callout is `drawOverlay` content (the zero-deck-domain canon — AZ.W-CON-GEN G4)

A flagged-node **label/callout** (a dashed tether + a monospace caption) is the consumer's `drawOverlay`, **NOT a library prop**. There is no `label`/`anomaly`/`resolved` prop — the branded focal content stays the consumer's (the README §"Non-goal" canon). The recipe is ≈30 lines pinned to `field.nodes[field.pinnedIndex]`: a pulse ring + halo + core + an optional checkmark + a `ctx.fillText` caption. The W-CON-GEN generalization promotes the *mechanism* (a pinned node the engine holds, its incident edges tinted accent, the autonomous drift) to first-class surface, but the *branded skin* (the wording, the brand hue) stays the consumer's drawOverlay — machine-locked by `proof:constellation-substrate-single` (ANOMALY-IS-SKIN — no deck-domain literal in the library source).

---

## Interaction model

When `pointerReactive` (the default, off under reduced-motion):

- **Steer** — nodes within reach of the cursor curve gently TOWARD it but keep their speed, so the
  lattice leans in without clumping or accelerating; the slow geometric drift is preserved.
- **Pointer-web** — the cursor itself joins the web: faint edges link it to every node within reach,
  plus a soft cursor node.
- **Ripple** — a tap/click drops an expanding ring that fades over ~0.9s.

Listeners attach to the host element and map viewport coordinates into canvas-local px via
`getBoundingClientRect`, keeping the mapping correct under CSS scale or zoom. Route backgrounds
consume the shared route-pointer feed and register no per-instance host pointer listeners.

---

## Focal node + click-to-warp (the unified warp-and-drift seam)

The focal node is a **first-class engine concept**, not a consumer `drawOverlay` hack. The design
thesis — the DRY/KISS resolution — is that **drift and warp are THE SAME mechanic**: "spring the
focal node toward a target NODE," differing only in what PICKS the target. A click picks it (warp); a
periodic auto-pick picks it (drift). ONE focal-node position spring + a pluggable target-source
carries both. There is no second parallel hook and no generic `stepOverlay` mutate-the-field callback
(that would be a single-consumer overfit) — only `focalIndex` + a per-axis `warp` spring the engine
owns.

**`warpOnClick`** — the sugar. A click resolves the nearest drifting node (an `O(count)` min-d² scan,
EXCLUDING the current focal so you never re-warp to yourself; a click that lands on the focal no-ops)
and springs the focal mark there:

```vue
<Constellation seed="warp" :count="60" warp-on-click :draw-overlay="drawFocal" />
```

The consumer paints the focal mark at `field.warp.{x,y}` in its `drawOverlay` — the engine owns the
**position**, the consumer owns the **skin**. `warpOnClick` is **independent of `pointerReactive`**:
warp works on a static (non-ripple) lattice, and ripples work without warp (the two axes are separate
guards now that the coordinate mapper is hoisted out of the pointer-reactive gate).

**`warpTo(...)`** — the low-level imperative seam (via `defineExpose`), for a consumer that picks the
target itself (the slides drift becomes "warp to a periodically-chosen random node" — the same seam,
an auto target-source). Two shapes: `warpTo(localPoint)` takes already-canvas-local px;
`warpTo(clientX, clientY)` takes client coords and maps them through the deck-scale `toLocal` mapper
(so a click lands correctly under any CSS scale/zoom).

Three properties make the warp read as a real spring chasing a real node:

- **LIVE-TARGET tracking.** The warp stores the target node's **INDEX**, not a click-time position
  snapshot. Each frame it re-reads `field.nodes[targetIdx].{x,y}` as its live target, so it CHASES a
  drifting node and arrives ON it (the **identity-ride** — on settle the mark rides that node's drift
  until the next warp re-points it). A frozen snapshot would land the mark next-to the moved node —
  visually wrong.
- **No `useSpring`, no second rAF (a hard contract).** The spring is a dt-stepped 2nd-order
  critically-damped integrator (`x += v·dt; v += (−2ζω·v − ω²·(x−target))·dt`, with `ω = 2π/response`,
  `ζ = dampingFraction` — the keyframes.js `(response, dampingFraction)` PARAM model reused, but NOT
  its rAF) advanced **inside the substrate's single rAF** (`warpStep` is called from `stepField`).
  `useSpring` wraps `SpringProgress.play()`, which spawns its OWN rAF bound to a reactive ref — a
  SECOND rAF would DEFEAT the offscreen/tab-hidden/PRM freeze the whole `useCanvas2D` substrate
  exists to provide. The `dt` is clamped (~50 ms) so a tab-throttle / offscreen-park-resume gap
  cannot teleport the mark.
- **PRM policy (stated, not accidental).** Warp follows the ripple/steer precedent: **disabled under
  `prefers-reduced-motion`**. The click does not warp; the focal node stays put. The warp listener is
  simply not registered under PRM (its own guard, independent of the ripple block).

---

## Deterministic-capture freeze (`freeze` / `?export | ?print | ?freeze`)

A pptx / print / screenshot pipeline needs a **reproducible static frame** — the same constellation
pixel-for-pixel across captures. The **`freeze` prop** lays out ONE static frame and does NOT advance:
seeded layout (set `seed` for a field stable ACROSS runs), no `stepField`, no ripple / warp / wander /
well advance, and a **FROZEN `now`** handed to `drawOverlay` so a phase-driven skin (`(now % T) / T`)
resolves to a fixed value — the pulse-ring radius is identical frame-over-frame.

```vue
<!-- explicit freeze — a stable, reproducible frame -->
<Constellation seed="cover" :count="64" :freeze="true" :draw-overlay="drawAnomaly" />
```

Omit `freeze` and it **auto-derives from `location.search`** matching `export | print | freeze` — the
deploy-pipeline contract, so a consumer's capture URL freezes the field with **zero per-instance
wiring**:

```vue
<!-- no freeze prop: the field freezes automatically under ?export / ?print / ?freeze -->
<Constellation seed="cover" :count="64" :draw-overlay="drawAnomaly" />
```

An explicit `:freeze="false"` forces the live path even under a capture URL. The freeze unifies with
the reduced-motion one-static-frame path — `freeze || reducedMotion` is the single static-frame
predicate (no parallel render branch); like PRM, a frozen capture takes no input (the pointer / warp /
well listeners are not registered).

---

## Anomaly skin recipe (a copy-pasteable `drawOverlay`)

A branded callout — a focal pulse, an optional resolved-check, a labelled annotation — is a **consumer
`drawOverlay`**, NOT a library prop. The component ships **no** `anomaly` / `resolved` / `label` prop:
that is deck-domain content (one consumer, a pinned mark with a monospace callout) and would violate
the *zero deck-domain content lives in the component* canon. Instead, copy this recipe and pin it to
the engine-owned focal (`field.warp.{x,y}` — the auto-drift / click-warp focal). The fractional anchor,
the label text, and the `resolved` flag are **consumer state closed over the fn** — not library props.

```ts
import type { ConstellationField } from "@mkbabb/glass-ui/constellation";

// CONSUMER state — closed over the overlay, NOT library props.
const label = "anomaly";
const resolved = false;
const accent = "oklch(0.55 0.18 25)"; // your domain accent (slides aliases --ncsu-red)

function drawAnomaly(
    ctx: CanvasRenderingContext2D,
    field: ConstellationField,
    now: number,
) {
    // Pin to the engine-owned focal — the click-warp / auto-drift node
    // (field.warp.{x,y}). Before the first warp it rides field-center.
    const x = field.warp.x;
    const y = field.warp.y;
    if (field.focalIndex < 0 && x === 0 && y === 0) return;
    const k = field.k; // multiply px constants by k so the mark scales with the field

    // The pulse phase. Under ?freeze the engine hands a FROZEN `now`, so this
    // resolves to ONE value — the ring radius is identical frame-over-frame.
    const phase = (now % 2600) / 2600;

    // outer pulse ring
    ctx.strokeStyle = accent;
    ctx.globalAlpha = (1 - phase) * 0.55;
    ctx.lineWidth = 1.6 * k;
    ctx.beginPath();
    ctx.arc(x, y, (12 + phase * 24) * k, 0, Math.PI * 2);
    ctx.stroke();

    // inner steady ring + soft halo + core dot
    ctx.globalAlpha = 0.85;
    ctx.lineWidth = 1.4 * k;
    ctx.beginPath();
    ctx.arc(x, y, 14 * k, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 0.18;
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(x, y, 26 * k, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(x, y, 4.4 * k, 0, Math.PI * 2);
    ctx.fill();

    // optional resolved checkmark (consumer state, not a lib prop)
    if (resolved) {
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.8 * k;
        ctx.beginPath();
        ctx.moveTo(x - 2.4 * k, y + 0.2 * k);
        ctx.lineTo(x - 0.6 * k, y + 2.2 * k);
        ctx.lineTo(x + 2.6 * k, y - 2.0 * k);
        ctx.stroke();
    }

    // dashed monospace callout pinned to the focal
    const lx = x + 30 * k;
    const ly = y - 18 * k;
    ctx.globalAlpha = 0.5;
    ctx.setLineDash([3 * k, 3 * k]);
    ctx.beginPath();
    ctx.moveTo(x + 8 * k, y - 6 * k);
    ctx.lineTo(lx - 4 * k, ly + 4 * k);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = accent;
    ctx.font = `${11 * k}px ui-monospace, monospace`;
    ctx.fillText(label, lx, ly);
}
```

```vue
<template>
    <!-- a live wander focal the anomaly rides, frozen for a capture -->
    <Constellation seed="cover" :count="60" warp-on-click wander
                   :freeze="captureMode" :draw-overlay="drawAnomaly" />
</template>
```

The recipe lives in the **demo** (`demo/stories/substrates/constellation.vue` — the "anomaly
drawOverlay recipe + ?freeze" section) as the executable reference. A decl-model markup contract (e.g.
`data-anomaly="0.6,0.36" data-anomaly-label="anomaly"`) is the consumer's, parsed in the consumer and
re-expressed as the `label` / anchor / `resolved` state closed over this fn.

---

## Tokens — the `--constellation-*` legibility vocabulary

The library ships a `--constellation-*` light/dark token block as its **own legibility identity** (the
hard-won dark-mode-lift / field-yields-to-type intelligence). Both arms are **plain-hsl literals**,
NEVER `light-dark()` and NEVER a `var()` alias to a neutral-ladder token — Canvas2D silently rejects a
`light-dark()` value into `strokeStyle`/`fillStyle` (it would paint a wrong/inverted color), so the
`:root`/`.dark` cascade carries two literals. The static gate `proof:constellation-tokens` machine-
locks this (no `light-dark(` substring NOR any transitive `var()` to a `light-dark()`-bearing token).

| Token | Role | Boundary |
|---|---|---|
| `--constellation-node` / `--constellation-node-dim` | the two node tones (the `.dark` arm LIFTS them off the ink ground) | **library legibility** |
| `--constellation-line` | the hairline edge/pointer-web stroke color (plain-hsl, never `--foreground`) | **library legibility** |
| `--constellation-edge-alpha` | the ambient hairline-edge alpha multiplier | **library legibility** |
| `--constellation-edge-focus-alpha` | the focus/pointer-web edge multiplier (a touch stronger near the active point) | **library legibility** |
| `--constellation-alpha` | the field-yields-to-type translucency knob (the global field dimmer) | **library legibility** |
| `--constellation-accent` | the anomaly/focal **tint** — the library ships a NEUTRAL default | **consumer preset** (slides aliases it to `--ncsu-red`) |

Everything except `--constellation-accent` is **universal legibility** (a node color that reads on a
dark ground is universal, not deck-identity), so it evolves in the library. Only the brand accent is
the consumer's preset — the single legitimate preset boundary.

#### The numeric interaction cohort

The warp / well / wander mechanics read a 9-member numeric token cohort (the interaction tuning, NOT
legibility — these are physics constants, not color). All ship as library defaults; a consumer
overrides a token to retune the mechanic without touching the engine.

| Token | Default | Role |
|---|---|---|
| `--constellation-warp-response` | `0.55` | the warp spring's keyframes.js ANGULAR PERIOD (the ω convention — NOT a settle-duration) |
| `--constellation-warp-zeta` | `1.0` | critically damped — a focal mark must NOT ring |
| `--constellation-well-gain` | `22000` | inverse-square force scale (the held-pull gain) |
| `--constellation-well-reach` | `340` | base-width px — the well's reach (k-scaled at step) |
| `--constellation-well-ramp` | `8.0` | 1/s arm rate (≈0.12s bloom; release is the fixed brisk field-cools invariant, not consumer-tunable) |
| `--constellation-well-max-speed` | `4.0` | base-width px/frame cap — the no-slingshot clamp |
| `--constellation-well-hold-ms` | `140` | ms hold before the well arms |
| `--constellation-wander-idle` | `8000` | ms — min idle between auto re-targets (the wander cadence) |
| `--constellation-wander-jitter` | `8000` | ms — random extra idle per cadence (so the rhythm is not metronomic) |

Note the keyframes.js convention: `--constellation-warp-response` is an ANGULAR period (the ω the
spring runtime consumes), NOT a settle duration — a smaller value is a STIFFER spring.

**Recessive-by-default calibration.** `--constellation-alpha` ships tuned to the legible-but-RECESSIVE
midpoint, NOT maximum legibility — the lattice must RECEDE behind type while staying visible on both
grounds. The two arms are per-mode by construction: a LOWER alpha on light (the cream ground already
lifts the node tones, so the field can recede further) + a MODESTLY-HIGHER alpha on dark (the ink
ground needs more presence to read). Both ship BELOW a max-legibility reference, so a drop-in consumer
inherits a recessive field with zero tuning; a consumer that wants more presence overrides the token.

---

## Best practices

- **Pin via `class`, not the component.** The library owns the field math; the consumer owns the
  chrome. Position/z-index/`inset-0`/safe-area live in the `class` you pass — the same math/chrome
  split [`DeckProgress`](../deck-progress/) uses.
- **Seed for captures.** A snapshot/print/export mode wants a reproducible web — pass a `seed` so the
  field is deterministic frame-over-frame; omit it for live variety.
- **Tone the palette with tokens.** The neutral passes read the FULL `--constellation-*` set (node /
  node-dim / line colors + the edge-alpha multipliers + the `--constellation-alpha` field dimmer; see
  the Tokens section). The library ships a recessive-but-legible default for both light + dark;
  override any rung at the consumer to retint or re-weight. The field re-samples on a dark-mode flip
  so the lattice tracks the color mode instead of freezing at the arm it mounted under. **Never** set
  a `--constellation-*` token to `light-dark()` or a `var(--foreground)`/`var(--neutral-*)` alias —
  Canvas2D silently rejects it (write a plain-hsl literal per arm; the gate enforces this).
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

The canvas itself is always `aria-hidden`: its pixels carry no semantic content. With direct
interaction props off, the host is ordinary decorative chrome. Enabling `warpOnClick` or
`gravityWell` promotes the host to a named, focusable button whose pointer and Enter/Space paths use
the same field owner. Under `prefers-reduced-motion: reduce` the substrate paints one static frame,
parks, and disables input-driven motion.

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
src/components/constellation/
├── Constellation.vue        # the component: composes useCanvas2D, seeds via prng,
│                            #   runs the four neutral passes + the warp spring,
│                            #   then drawOverlay; warpOnClick + the warpTo expose
├── constellationField.ts    # seeded field stepping + the single edge scan
├── constellationRender.ts   # the Canvas2D neutral passes over that field/edge set
├── composables/
│   ├── createConstellationField.ts
│   └── useConstellation.ts  # shared lifecycle, input, field step, ordered paint
├── index.ts                 # package barrel
└── README.md                # this file

src/composables/glass/canvas2d/
└── useCanvas2D.ts           # the Canvas2D lifecycle substrate (dpr-resize, RAF-park,
                             #   offscreen + tab-hidden + reduced-motion freeze, dispose)
                             #   — the Canvas2D parallel to useWebGLCanvas
```

The neutral/skin split is the load-bearing design choice: the field contains no anomaly pass,
callout, or deck-domain content. The branded mark reaches the canvas exclusively through
`Constellation.vue`'s final `drawOverlay` prop. The single-source
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

## Substrate

Constellation renders on **Canvas2D** through `useCanvas2D` over the shared
`createCanvasLifecycle` leaf. Its deterministic CPU field feeds one edge scan and one ordered vector
paint; the consumer overlay is the final pass. Constellation owns no WebGPU/WebGL setup, shader,
bridge, or GPU context.
