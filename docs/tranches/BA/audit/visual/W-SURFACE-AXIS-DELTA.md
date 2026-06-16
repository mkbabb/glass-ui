# BA.W-SURFACE-AXIS — DELTA (the binding π readback + gestalt verdict)

**Wave**: BA.W-SURFACE-AXIS — the ONE shared {glass·veil·opaque} surface-decoration axis
**Captured**: 2026-06-12 over the W-DARK-MATERIAL-corrected register (Batch 1 landed)
**Route**: `/containers/dialog` (loads the global `/styles` cascade)
**Backdrop**: a synthetic 4-stop busy gradient (`#1b2a4a → #7a3b8f → #c14b3a → #d8c14a`) — the floating-tier-collapse worst case
**Frames**: `W-SURFACE-AXIS-rungs-light.png`, `W-SURFACE-AXIS-rungs-dark.png`

## The π readback (`tests-visual/surface-axis.spec.ts` — 13/13 PASS, BOTH modes × 2 viewports)

| arm | assertion | result |
|---|---|---|
| (a) | `surface="glass"` + `surface="veil"` resolve a TRANSLUCENT background (α < 1) over the busy backdrop | PASS — the backdrop reads through both |
| (b) | `surface="opaque"` resolves a SOLID background (α = 1) — the `--card` plate | PASS — α = 1.0 |
| (c) | `surface="veil"` resolves `border-style: none` (the borderless text plate) | PASS |
| (d) | `<Skeleton surface="glass">` resolves a TRANSLUCENT base block (α < 1); the default `surface="opaque"` (`bg-muted`) stays SOLID | PASS — over-glass translucent, default solid |
| (e) | `.input-pill` and `.control-surface` resolve the SAME `--control-surface-bg` (the form family ONE material at rest, no gray fork) | PASS — byte-equal |

## The live-found bug the π caught (the cardinal-lesson loop closed)

The source gate `proof:surface-axis` W1-W6 was GREEN, but the π readback found the
**opaque rung painting α 0.88, NOT solid** — a source-green/visually-broken gap (the
exact AZ close-class failure BA exists to fix). Root cause: the
**substitution-vs-inheritance trap** (the recurring AX.W55 / dock-scale class). The
`--glass-bg-*` tier tokens bake `var(--glass-level)` at their `:root` DECLARATION
(level=1), so a DESCENDANT element's `--glass-level: 0` (set by `[data-surface="opaque"]`)
does NOT re-resolve the `:root`-baked `--glass-bg-floating` — the plate stayed
translucent. (The `.glass-opaque` class works only when `--glass-level` is set AT `:root`,
the cohesion-fixture pattern; a PER-ELEMENT opaque surface — the whole point of
`surface="opaque"` — needs the solid plate composed at the element.) **Fix**: the opaque
rung composes the SOLID `--card` plate DIRECTLY at the element (via the house color-mix
idiom `color-mix(in srgb, var(--card), transparent 0%)` — solid `--card`, expressed as
the cohesion-sanctioned mix, NOT the bare `var(--card)` the cohesion D1 check forbids),
re-resolving the level-0 endpoint at the element, while STILL flipping the
`--glass-level: 0` / `--glass-tint-strength: 0%` knobs so a nested glass descendant + any
level-reading consumer see the opaque register coherently. The same fix applies to
`.glass-drawer[data-surface="opaque"]`. After the fix: α = 1.0, 13/13 PASS.

## The gestalt verdict (proof:ba-gestalt — glass+feedback band)

**PASS.** Captured WHOLE-fixture, BOTH modes, over the busy backdrop. The three rungs read
as ONE coherent surface grammar:
- **light** — `glass` translucent (the gradient reads through the frosted plate), `veil`
  translucent + borderless (the text-plate look, no rim), `opaque` a solid cream `--card`
  plate (the gradient fully occluded).
- **dark** — the same coherence over the corrected dark register: `glass`/`veil`
  translucent, `opaque` a solid dark `--card` plate.

The band reads as ONE material — veil/glass/opaque speaking one grammar. No source-green/
visually-broken gap; the rendered axis (translucent-where-glass, solid-where-opaque,
frosted-where-veil) holds over the corrected register in both modes.
