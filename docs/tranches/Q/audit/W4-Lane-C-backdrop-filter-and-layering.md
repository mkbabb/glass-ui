# Q.W4 Lane C — backdrop-filter single-source + transitions.css layering (Q-sty-3 + Q-sty-4)

## Charter

Per Qγ W1 + G3.

- **Q-sty-3**: `ContinuousTimeline.vue`, `ScrubberTimeline.vue`,
  `SegmentedTimeline.vue`, and `Slider.vue` manually author
  `-webkit-backdrop-filter` alongside the unprefixed property. This
  contradicts `glass.css`'s documented single-source-prefix policy
  (`glass.css:12-19`): authoring both forms manually caused Lightning CSS in
  Tailwind v4 to dedup-and-keep-prefixed, which modern Chromium then drops from
  the CSSOM (a CSSOM-drop bug class). `3cb70db` propagated the anti-pattern.
- **Q-sty-4**: `transitions.css` is the only `src/styles/` sheet shipping
  UNLAYERED top-level class rules. Unlayered rules land in the implicit
  unlayered origin, which outranks every `@layer` block — a latent cascade
  hazard letting a Vue `<Transition>` class silently outrank a
  `@layer components` recipe.

## What changed

### Q-sty-3 — backdrop-filter single-source

Stripped the manual `-webkit-backdrop-filter` declaration from all 4 SFCs;
the unprefixed `backdrop-filter` is authored alone, and the consumer's
Lightning CSS / autoprefixer pipeline emits the `-webkit-` form per
browserslist — the canonical `glass.css` policy, now applied library-wide.

- `src/components/ui/slider/Slider.vue` — 3 sites (`timeline`, `glass-pill`,
  `glass-scrubber` track variants).
- `src/components/custom/timeline/ScrubberTimeline.vue` — 1 site (`.scrubber-track`).
- `src/components/custom/timeline/SegmentedTimeline.vue` — 1 site (`.segmented-track`).
- `src/components/custom/timeline/ContinuousTimeline.vue` — 1 site
  (`.continuous-dot`; this edit folded into the Lane B token-promotion edit on
  the same recipe block).

### Q-sty-4 — transitions.css layering

`src/styles/transitions.css` — the entire body (all class rules + the
`@media (prefers-reduced-motion: reduce)` block, which itself carries only
class rules) is now wrapped in `@layer components`, matching every other recipe
sheet. The `!important` declarations inside the reduced-motion block are
unaffected by layering (important always wins regardless of layer order). A
header comment records the rationale and notes `animations.css` stays unlayered
by design (pure `@keyframes`, layer-agnostic by spec).

## Verification

- `npm run typecheck` — GREEN.
- `npx vitest run` — 379/379 GREEN.
- `npm run build` — built clean; `dist/glass-ui.css` emits the `-webkit-`
  prefix via the pipeline and `@layer components` wraps the transition rules.
- `grep -rn 'webkit-backdrop-filter' src/components` — zero hits (the only
  remaining `src/` site is `useGlassRenderer.ts`, a WebGL/WebGPU canvas
  composable, out of scope — it is not a glass.css ladder consumer).

## Verdict

**CLOSED.** One canonical backdrop-filter authorship policy library-wide;
the CSSOM-drop bug class is removed. `transitions.css` is brought into
`@layer components` discipline — the last unlayered class sheet is gone.
