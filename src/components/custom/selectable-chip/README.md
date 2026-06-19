# SelectableChip

`@mkbabb/glass-ui/selectable-chip` — the public face of the contrast-floored tonal-accent
register (BC.W-ACCENT-TONE).

A reka-`Toggle` selectable chip whose COLOUR identity comes from ONE `:tone` (a complete
`<color>`). The chip reads the `.accent-tone` register — set `:tone="var(--section-color-7)"`
once and the chip is idle-legible, active-bold, ink-correct in BOTH modes; no per-state
`color-mix(…)` hand-roll, no "is the active fill dark enough that white text reads?" guesswork.

This is the FOURIER-INBOUND #3 ask verbatim: a contrast-floored 3-channel tonal accent
(`--accent-fill` idle ~6-8% **floored ≥3:1** + active band / `-edge` / `-ink`) from one
`--tone` via value.js `safeAccentColor`; the IDLE/resting state floored ≥3:1 **not just
hover/active**. fourier re-derives this ~57×; glass-ui's own ToggleChip hand-rolled it 2×
inside an 8-literal per-state cluster. The register collapses both.

## Anatomy

- **The four-channel register (`.accent-tone`, `glass/accent-tone.css`).** ONE `--tone`
  → `--accent-fill` (idle, faint but FLOORED), `--accent-band` (active), `--accent-edge`
  (active rim), `--accent-ink` (the label ink). The mix is `in oklab` (the perceptual
  glass-tint family, W55/W-NO-GRAY) — NOT `in srgb` (the `--surface-tint-*` brand-overlay
  fence). The strength MAGNITUDES are TOKENS (`--accent-fill-strength` 8% / `-band-strength`
  18% / `-edge-strength` 55%) a `:root`/scope override retunes — NOT props (the no-over-prop
  fence). The idle floor is the load-bearing new behavior: the resting tint stays ≥3:1 so a
  chip is legible BEFORE you hover it.

- **The contrast-safe INK (the JS half, `useAccentTone`).** CSS cannot call value.js, so the
  ONE channel that needs a contrast SOLVE — the label `--accent-ink`, darkened/lightened
  until it clears AA OVER the resolved band — is resolved by `useAccentTone(tone)` via
  value.js `safeAccentColor`/`computeSafeAccent` and written to `--accent-ink-resolved`. The
  CSS reads `var(--accent-ink-resolved, var(--foreground))` (the warm-ink fallback for the
  pure-CSS `--tone` default path). glass-ui re-implements ZERO contrast/lightness math (the
  `useBorderSpectrum` precedent; `proof:single-color-core`).

- **The chip face.** A reka-`Toggle` root (the `aria-pressed`/`data-[state=on]` selectable
  semantic) composing `.accent-tone` + the size axis. The idle reads `--accent-fill`
  (floored); `data-[state=on]` reads `--accent-band` + the `--accent-edge` rim + the
  `--accent-ink` label.

## DISTINCT seams (do not fork)

- **`<SelectableChip>` vs `<IconChip>`.** IconChip is a STATIC color-event glyph pop
  (`:section`/`:tone`, no `data-state`); SelectableChip is the SELECTABLE tonal chip (a
  toggle). File-disjoint; this register never touches IconChip.

- **`--accent-tone` (control tonal-FILL) vs `--glass-accent` (glass-RIM).** The BB
  `--glass-accent` axis tints a glass surface's RIM + specular CORE (decoration). This
  register fills a control's plate BACKGROUND + solves the contrast-safe ink. The two
  COMPOSE on a chip that is both a glass surface and a tonal control (the rim from
  `--glass-accent`, the fill from `--accent-tone`); they never write each other's channels.

- **ToggleChip's reka chassis is INVIOLATE.** ToggleChip's tonal PAINT re-points onto
  `.accent-tone`; its reka-`Toggle` root + variant structure (padding/radius/text-size) +
  `aria-pressed`/`data-state` contract are untouched (reka = behavior, glass-ui = material).

## Publication

`/selectable-chip` ONLY — OFF the value.js-free root barrel. The SFC STATICALLY imports
`useAccentTone` (which reaches value.js), so the chip chunk is value.js-bearing; the L.W1
SCC closure cannot carry it. The BorderProgress/EasingPicker precedent.
