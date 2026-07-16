# Conventions (canon home)

## TypeScript

- `strict: true`, `verbatimModuleSyntax: true`
- `moduleResolution: bundler`, `target: ES2022`, `lib: ES2023`
- `import type` for all type-only imports
- **Named exports only, no defaults**

## Color tokens are complete `hsl()` colors

Color tokens resolve to a whole color: `--primary: hsl(24 10% 10%)`, consumed directly
as `var(--primary)`. NEVER `hsl(var(--token))` — the token is already a color, and
double-wrapping is invalid and never paints. For an alpha derivative use
`color-mix(in srgb, var(--token) N%, transparent)` (the `--surface-tint-*` / `--border-soft`
house pattern). All shadows compose via `color-mix(in srgb, var(--shadow-color) N%, transparent)`
over `--shadow-color: var(--foreground)` (tokens.css §7).

## The `color-mix(in srgb …)` surface-tint fence (AW.W26)

The `--surface-tint-*` ladder generates a foreground-over-transparent overlay
(`color-mix(in srgb, var(--foreground) N%, transparent)`). Perceptual-uniformity doctrine
prefers `in oklab` for tint GENERATION, but glass-ui's tints are hand-tuned at fixed α
stops against a warm-ink `--foreground` over a cream substrate: `in srgb` is the brand-
calibrated mix the whole token ladder + the shadow family already speak, and switching
the interpolation space would shift every resting border/wash α off its hand-set value.
The `in srgb` choice is the house identity — not drift to "fix" to `in oklab`. (Aurora/
blob shaders that DO want perceptual interpolation run OKLCh in-shader; that is the
separate, correct oklab path.)

## The display-ladder tracking + leading (BB.W-DISPLAY-TRACKING)

The √φ audacious display ladder reads a display-ONLY proportional negative tracking rung
`--type-tracking-display: -0.015em` (the Apple −1.5%-of-size signature) + a tight display
leading `--type-leading-display: 1.05` (the Apple 84/80 signature). The display ladder
NEVER piggybacks the shared `--type-tracking-tight` (the heading/title register at
`-0.025em`) — re-tuning one would bleed into the other (the substitution-trap).

## The warm-chroma floor — the neutral ladder is warm MATERIAL, not gray (BA.W-NO-GRAY)

The `--neutral-*` ladder + the `--card` glass plate carry a CHROMA FLOOR onto the warm
identity: authored at hsl hue 28-40 so the resolved OKLab hue lands at H 62-75° (the
warm-amber family), the saturation lifted so each rung clears the perceptual gray floor.
The floor is L-aware by gamut necessity; the `--card` plate decouples from `--neutral-0`
onto its own warm-cream value so a glass Card/Button reads warm over a flat backdrop. The
dark ladder warms in lockstep on the W-DARK-MATERIAL base. See `glass-system.md`.

## `cn()` is a deliberate hand-rolled deduplicator keep (AW.W26)

`src/components/_shared/class-names.ts` owns a dependency-free class normalizer and
small conflict-bucket deduplicator. It is NOT a gap to add a general-purpose runtime
class helper. Unknown and arbitrary-selector utilities pass through untouched; a
host-sized icon does not false-merge against the base `size-4`.

## The token-first ring registers

- **`.focus-ring`** — every interactive atom composes the `.focus-ring` utility
  (`utilities.css`, keyed off `--focus-ring-shadow`) rather than the inline
  `focus-visible:ring-2 ring-ring` chain. ONE token re-tints every focus ring library-
  wide from a single override (AW.W26).
- **`--invalid-ring`** — the destructive twin of `--focus-ring-shadow`, minted ONCE in
  `tokens/scale-paper.css` (+ `--invalid-ring-tint`) and read everywhere (the `.input-pill`
  focus arm, SelectTrigger, ComboboxInput, TagsInput) via `box-shadow: var(--invalid-ring)`
  — a consumer retints every invalid ring library-wide from a single override (BB.W-INVALID-RING).
