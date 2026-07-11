# Glass system (canon home)

Glass is the **DEFAULT surface register for EVERY band** (AX.W54, USER-DECIDED MAXIMAL):
containers, chrome, buttons, and content panels all default to glass; the opaque surface
is the explicit opt-out. Five disjoint axes carry the system.

## `--glass-level` — the ONE opacity+blur knob (AX.W54)

`--glass-level` is a typed inheriting `@property <number>` (default `1`) threaded through
both glass ladders at their single sites: the `--glass-bg-*` opacity recipe
`1 - (1 - <rung-α>) * --glass-level`, and the `--glass-blur-*` radii `radius * --glass-level`.
`level=1` is byte-identical to the hand-tuned ladder; **`level=0` is the OPAQUE escape**
(solid `--card` + `blur(0)`) through the SAME machinery — `.glass-opaque { --glass-level: 0 }`,
the `opaque` CardTier rung, and the a11y brackets (`prefers-reduced-transparency` → 0,
`prefers-contrast: more` → 0.3) all ride the ONE level path. `inherits: true`, so a host
sets `--glass-level` on any ancestor to retune every descendant. The blur ladder was
dialed back ~15-20% uniformly at BA.W-GLASS-CAL. The legibility allowlist that legitimately
stays opaque: `avatar`, `label`, `separator`, `skeleton`, `table`/`data-table`, and Badge's
loud-saturated-pill register (`proof:glass-cohesion`).

## The per-tier alpha is canonical at the primitive (BB.W-CARD-TIER-ALPHA)

Each glass tier's alpha is the library's NAMED identity register. The per-tier opacity
primitives `--glass-opacity-{wash,quiet,resting,floating,overlay}` (the alpha-monotonic
ladder 0.30/0.50/0.65/0.80/0.95 light · 0.38/0.58/0.72/0.88/0.96 dark) + `--glass-opacity-dock`
(0.42, mode-INVARIANT) + `--glass-opacity-chassis` (0.28 / 0.36) are the canonical alpha
INPUTS to the ONE `--glass-level` compose recipe. A consumer reads the named alpha, never
re-pins a magic number; a per-scope tier alpha RE-DECLARES the composed `--glass-bg-{tier}`
on the scope (the substitution-vs-inheritance seam, since each `--glass-bg-{tier}` is
composed at `:root`).

## The OPT-IN deep-glass tier (BB.W-DEEP-GLASS)

Above the calm default sits an opt-in maximal-iOS-27 register — the separate
`--glass-blur-deep-*` family the calm ladder never reads (deep radius 16px, deep saturate
1.5), interpolated by `--glass-depth` (the `--glass-level` twin `@property <number>`).
`.glass-deep` is a token-substitution decoration on a base rung (re-points
`--glass-blur-floating: var(--glass-blur-deep)`); the `deep` CardTier rung maps
`'glass-floating glass-deep'`. Opt-in only, never the bare content default.

## Adaptive-glass legibility (AX.W55 · AZ.W-ADAPTIVE-AUTO)

Over a very-light or busy backdrop the warm-cream translucent glass collapses. The
legibility rides the EXISTING `color-mix(in oklab, <rung bg>, var(--glass-tint-source)
var(--glass-tint-strength))` tint seam across three layers: (1) the unconditional
self-engage default (the dock + overlay band darken at full AA; the plain content tiers
self-engage only the sub-perceptual floor); (2) the declarative `--glass-backdrop: light`
ancestor bucket; (3) the sampled-luminance observer `useGlassBackdropLuminance` (DEMO-
PRIVATE). The bounded AA floor `--glass-tint-strength-aa` is 20% light. `contrast-color()`
is an `@supports`-gated progressive enhancement anchored on the LIGHT backdrop signal.

## The surface-aware foreground register (BB.W-ON-GLASS-FG)

A caption/well/track on a translucent content-tier glass plate collapses the canvas-
calibrated `--muted-foreground`. The library mints a three-rung on-glass foreground family
whose contrast TARGET is the composited glass FILL: `--on-glass-muted` (+ `-strong`),
`--input-on-glass`, `--progress-track-on-glass` — the THIRD state beside the adaptive seam
(calm translucent glass → legible-AND-subordinate). The calm content tiers re-point
`--muted-foreground → --on-glass-muted` BESIDE the frozen W-DARK-MATERIAL seam.

## The dark register as a luminous transmissive material (BA.W-DARK-MATERIAL)

Dark is a luminous-dark transmissive material, the mirror of light's richness. Six dark-arm
mechanisms: the dark elevation ladder (page L4 / card L16), transmissive dark glass
(saturate/brightness luminosity-lift companions), the dark tint-seam arm (bounded 12%),
chromatic dark `--primary` (legendre-violet), the `--surface-tint-*` dark arm (the warm-ink
DERIVED via `oklch(from var(--foreground) …)`, BB.W-DARK-INK-WARM), and the contrast-color()
selection-inversion fix.

## The per-instance chromatic-rim accent axis (BB.W-GLASS-ACCENT)

`--glass-accent` (a complete `<color>`, `@property inherits:true`, `initial-value: transparent`)
+ `--glass-accent-strength` (`<percentage>`, initial 0%) OKLab-tint a glass surface's RIM +
`::before` specular catch-light CORE — a per-instance chromatic decoration, DISTINCT from the
whole-plate legibility tint (it never writes the `--glass-tint-*` cohort). At the defaults it
is a byte-identical no-op.

## The shared surface-decoration axis (BA.W-SURFACE-AXIS)

`surface="glass" | "veil" | "opaque"` is a single SHARED axis minted once
(`src/styles/glass/surface-axis.css` + `_shared/useSurfaceAxis.ts`) that every
content/floating/feedback surface exposes uniformly (Card, GlassPanel, Dialog, Sheet,
Drawer, Popover, Command, ExpandableContainer, Skeleton, Toast, Button). `veil` is the
borderless legibility plate; `opaque` is `--glass-level:0`. No second three-rung surface
recipe is possible (`proof:surface-axis` W1). W-FEEDBACK-TONE and W-MENU-GLASS CONSUME
this axis; they do not re-author it.

The enrolled surfaces each thread the `surface` prop through the resolver, so `<Sheet
surface="opaque">` / `<Popover surface="veil">` / `<Toast surface="veil">` / `<Button
surface="veil">` all mean the SAME thing — the doc-honest eleven-surface enrollment (each
example names a prop the SFC genuinely declares; `proof:surface-axis` W7).
