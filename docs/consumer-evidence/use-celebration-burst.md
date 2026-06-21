# useCelebrationBurst

## Artefact path

`src/composables/motion/useCelebrationBurst.ts` — published on `@mkbabb/glass-ui/motion` ONLY (keyframes-bearing via `springTimingFunction`, so it is NEVER on the root barrel — the SCC-trap discipline). Types published on `@mkbabb/glass-ui/api` (`CelebrationBurstPreset`/`UseCelebrationBurstOptions`/`UseCelebrationBurstReturn`, via `api/types-extra`). The `.glass-celebration-petal` recipe ships in `src/styles/jubilance.css`, `@import`-ed by `index.css`.

## Disposition: the EARNED-moment FLOOR with ≥2 SITED uses (BE.W-CELEBRATE-BURST)

`useCelebrationBurst` is the library's ONE EARNED-moment celebration primitive — a one-shot radial bloom of N warm-cream glass petals that scale + fade + drift outward on the bouncy spring, then a coupled chip-bloom-in cascade settles the destination. The petals read as the surface's OWN frosted glass material (the `color-mix(in oklab, var(--glass-bg-floating), var(--glass-tint-source) …)` seam), NOT a flat emoji-confetti sprite sheet — the iOS-27 *material* burst. Compositor-only + PRM-static (under reduce the earned moment confirms terminal-only — the destination content appears, the radial motion is off).

The burst FIRES for every consumer that wires it (the FLOOR). The visual-load-bearing ≥2-consumer bar (L invariant 8 / J-inv-10) is met by the SITED FLOOR uses below.

## Sited FLOOR uses (≥2)

1. **The dock fission MERGE-SPLASH gold-coalesce** (`src/components/custom/dock/composables/useDockFission.ts` → W-DOCK-JUBILANCE) — on the reverse fission (`--dock-split-t` 1→0, the N pieces merging back into ONE liquid surface), the convergence point fires `burst({ preset: 'bouncy', tone })` on the N→1 re-merge settle. The merge IS a completion event — the earned-gold splash + the petal bloom reward it. Consumer-#1.

2. **The now-playing pill COMPLETION confirm** (W-DOCK-NOWPLAYING-PILL) — a track-complete / queue-done moment fires the burst over the pill. Consumer-#2.

The demo exerciser is `demo/stories/feedback/celebration-burst.vue` (a "Personal best!" button firing the burst over a metric card) — the π capture surface (`tests-visual/celebration-burst.spec.ts`).

## The `:tone` OPT-IN axis

The hue-keyed `:tone` petal is the OPT-IN axis (a consumer who wants a neutral warm-cream burst omits it). It writes `--glass-accent` onto each petal — the W-GLASS-ACCENT rim-tint seam the SHARED `--glass-specular-core` catch-light already OKLab-mixes toward — so a download-complete petal blooms `--viz-download` through the existing cohort, never a second fork, never a library hue token (presets-in-consumers).

## Booked proof

- `rg -n "useCelebrationBurst\|burst\(" src/components/custom/dock/composables/useDockFission.ts` (consumer-#1, the merge-splash)
- the demo exerciser `demo/stories/feedback/celebration-burst.vue` (the π capture surface)
