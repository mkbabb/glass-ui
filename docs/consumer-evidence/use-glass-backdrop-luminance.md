# useGlassBackdropLuminance

## Artefact path

`src/composables/glass/useGlassBackdropLuminance.ts` (DEMO-PRIVATE — NOT exported from the `src/composables/glass/index.ts` barrel; reached only by a direct relative import).

## Disposition: path B (demo-private + booked trigger)

AZ.W-ADAPTIVE-AUTO Completion criterion clause 2 offers two no-overfitting paths for the sampled-luminance observer:

- **Path A (public barrel export)** — ships ONLY if ≥ 2 **BINARY** consumers exist, where the dock wire-point is consumer #1 and a SECOND BINARY consumer (another library/internal mount, NOT a demo story) is #2. A demo mount is NOT binary (the `proof:component-orphan` own-story exclusion, W-PRUNE2 E4-3, applies to the sibling `useGlassRenderer` cluster).
- **Path B (demo-private, RECOMMENDED at AZ)** — the composable stays OFF the glass barrel, wired ON for the dock internally + exercised by a content-glass DEMO mount, with this evidence doc naming the booked 2nd-binary-consumer trigger.

At HEAD the dock is the ONLY binary consumer, so a public barrel seat without a 2nd binary consumer is the substrate-without-consumer trap (L invariant 8). **The chosen path is B.**

## Current consumers

**Binary consumer #1 (library source)**: `src/components/custom/dock/GlassDock.vue` — wires `useGlassBackdropLuminance(dockEl, …)` ON by DEFAULT (H3 arm a), gated by the `autoLuminance` prop (default `true`). The dock writes `--glass-backdrop-luma` + the `--glass-backdrop: light|dark` bucket on its own root, dynamically tracking the painted backdrop.
**Proof**: `rg -n 'useGlassBackdropLuminance' src/components/custom/dock/GlassDock.vue`

**Demo exerciser (NOT binary)**: `demo/stories/substrates/glass-material.vue` — mounts a `glass-card[data-glass-sample="live"]` over the page's Aurora substrate and surfaces the reactive `luma`/`bucket` readout. This exercises the LIVE sampling path (the `backgroundCanvas` downsample + the throttled re-sample loop) for visual verification. Per W-PRUNE2 E4-3 the demo mount is NOT a binary consumer — it does not by itself clear the public ≥ 2-binary bar.
**Proof**: `rg -n 'useGlassBackdropLuminance' demo/stories/substrates/glass-material.vue`

## Booked 2nd-binary-consumer trigger

The composable PROMOTES to a public glass-barrel export (path A) the moment a SECOND BINARY consumer materializes. The booked trigger is **either** of:

1. **A content-glass library surface adopts the dynamic observer** — e.g. a `<Card>` / `Section` / a sheet/panel that, like the dock, floats over an arbitrary (possibly live/animated) consumer backdrop and needs the sampled darken rather than the static declarative bucket. The first such library mount is binary consumer #2 → barrel-export at that wave.
2. **A downstream binary consumer (speedtest / fourier / words) wires it** on a glass surface over its own animated substrate (an aurora/blob/canvas field), recorded here with its source path + proof grep (the same evidence discipline E4-3/E4-9 use).

Until then the declarative bucket + the Arm-1 unconditional self-engage are the DEFAULT legibility path on every glass surface (the floor + the override); the sampled observer is the dock-only dynamic REFINEMENT.

## Re-audit proof

This document satisfies the no-overfitting bar for `useGlassBackdropLuminance` only while the dock wire-point proof grep still finds the binary consumer. If `rg -n 'useGlassBackdropLuminance' src/components/custom/dock/GlassDock.vue` fails, the composable is a library-orphan and must retire (or the wire-point is restored). A barrel export added WITHOUT a recorded 2nd binary consumer here REDs `proof:adaptive-observer`.
