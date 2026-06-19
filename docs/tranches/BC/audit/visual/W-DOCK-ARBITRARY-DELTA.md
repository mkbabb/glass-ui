# BC.W-DOCK-ARBITRARY — DELTA (the dock animates into arbitrary sizes + shapes)

**Status:** SOURCE arm GREEN (`proof:dock-arbitrary` A1/A3/A4/A5 born-RED→GREEN; A2 GREEN via
BC.W-LIQUID-MORPH's reserve floor). The PAINT arm (the live frame-series) is
**pending-orchestrator-capture** — see below.

## What this wave landed (SOURCE)
The dock morph is no longer locked to "a rectangle that grows wider/taller." Its SHAPE is now a
SCALAR PARAMETER on the ONE `--dock-morph-t`/`--dock-expand-t` clock (the BC.W-DOCK-ENGINE buttery
scalar):

- **The corner profile is a token lerp (A1).** The base `.glass-dock` `border-radius` interpolates
  the `--dock-shape-from`/`--dock-shape-to` token pair on `--dock-expand-t` (dock/shell.css — the
  SINGLE radius authority, no dead static). Both default to `--radius-dock` (9999px), so the lerp is
  a NO-OP at the library default — byte-identical to the prior static `var(--radius-dock)`, the
  collapsed-perfect-circle ↔ expanded-pill identity preserved. A consumer overrides either token to
  morph to an arbitrary corner.
- **The arbitrary silhouette is an OPT-IN clip-path lerp (A1).** `dock/shape.css` interpolates the
  `--dock-shape-clip-from`/`--dock-shape-clip-to` pair on `--dock-morph-t`. DEFAULT-OFF
  (`none`/`none`) so the rectangle/pill common case pays no clip cost; the arbitrary teardrop/blob
  silhouette engages ONLY when a consumer sets the clip tokens. `clip-path` is compositor-friendly —
  the silhouette morphs with ZERO reflow.
- **The footprint is consumer-targetable + floored (A2).** `--dock-morph-to` is the settled
  footprint, floored by `--dock-morph-min` (the BC.W-LIQUID-MORPH reserve floor). Shared with
  BC.W-LIQUID-MORPH M1.
- **Compositor-only (A3).** The shape register (shape.css) animates only `clip-path`/`border-radius`/
  `scale`/`--*` — ZERO `width`/`height`/`padding` morph leg. `proof:no-layout-animation` LOCKED.
- **ONE squish source (A4/A5).** The shape-morph squish reads `useLiquidFlex`'s `--stretch`
  reciprocally (`scale: var(--stretch) calc(1/--stretch)`), capped at `--dock-morph-max-stretch`
  (density.css default 1.08). `useDockOrientationMorph` writes `--stretch` onto the dock scope + reads
  the cap token — the V↔H morph shares the mechanism, not a second engine.

## The token register (minted in dock/density.css `:root`)
| token | default | meaning |
|---|---|---|
| `--dock-shape-from` | `var(--radius-dock)` | the collapsed silhouette's corner (the perfect circle) |
| `--dock-shape-to` | `var(--radius-dock)` | the expanded silhouette's corner (the pill / an arbitrary profile) |
| `--dock-shape-clip-from` | `none` | the OPT-IN `from`-silhouette clip-path (DEFAULT-OFF) |
| `--dock-shape-clip-to` | `none` | the OPT-IN `to`-silhouette clip-path (DEFAULT-OFF) |
| `--dock-morph-max-stretch` | `1.08` | the LOW squish cap (the iOS-segmented register) |

## PAINT arm — pending-orchestrator-capture
The orchestrator runs the live `:5199` gate set and captures the gestalt frame-series here:
- **The ≥3-silhouette frame-series (gif_creator):** the dock morphing through circle → pill → wide bar,
  plus the V↔H teardrop, a real GPU host, BOTH modes. A human reads: the dock FLOWS between arbitrary
  shapes as one continuous liquid-glass surface, corners + silhouette morphing smoothly, the plate
  deforming with a liquid squish — never a discrete shape-snap or a layout jump.
- **The CDP Layout-track trace:** FLAT across every shape morph (the `clip-path`/scale path triggers
  zero per-frame layout).
- **The `--stretch` swell readback:** swells on a fast morph (capped at `--dock-morph-max-stretch`),
  zeroes under PRM, both modes.
- **WebKit:** `clip-path` + `border-radius` + `scale` are cross-engine — the arbitrary-shape morph
  MUST paint on WebKit.
- Live gates: `proof:dock-arbitrary` (live paint) · `proof:liquid-morph` · `proof:no-layout-animation`.

## Gates (SOURCE)
`proof:dock-arbitrary` GREEN (A1/A3/A4/A5; A2 via the LIQUID-MORPH floor) · `proof:no-layout-animation`
LOCKED · `proof:dock-engine` GREEN (E4 reserve-floor tolerated) · `proof:spring-tokens-synced` GREEN.
