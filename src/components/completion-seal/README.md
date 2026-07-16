# CompletionSeal

`@mkbabb/glass-ui/completion-seal` — the hero-scale earned-GOLD completion seal
(BC.W-AX-COMPLETION-SEAL).

A determinate process completes (a speedtest finishes, a survey submits, a task
settles) and a HERO-SCALE gold mark DRAWS itself onto the surface: the stroke INKS
itself (a `stroke-dashoffset` wipe), settles with a small overshoot, glints once with a
gold catch-light, then holds static. It is GOLD because completion is EARNED — the seal
is the visual seal of the same completion event the chassis phase bus marks.

## Anatomy

- **The gold mark INKS itself — not a flat fade.** The `.completion-seal__mark` SVG
  stroke draws via the registered `--seal-draw` `<percentage>` (`tokens/property-regs.css
§18`, `inherits: false`, `initial-value: 100%` — the safe fully-drawn fallback) on a
  `stroke-dashoffset` wipe. You watch the gold draw itself, not appear.
- **The `disc` shape is the composed earned-COIN — disc→ring→check (BG.W-SEAL-DISC).**
  `shape="disc"` renders THREE layers off the ONE gold-draw mechanism: a filled
  translucent glass-gold disc FACE materializes (opacity fade), then the ring RE-USES the
  ring geometry to stroke-draw around it, then the check RE-USES the check path to
  draw-in inside. The layers stagger on `animation-delay` off the token-first
  `--seal-ring-delay`/`--seal-check-delay` sequencing clocks (each defaulting to the
  per-spring `--spring-snappy-duration`) — no fourth recipe, one mechanism, three
  sequenced passes. `check`/`ring`/`wordmark` stay the single-mark register.
- **`personalBest` is the earned-gold garnish.** `:personalBest` arms `[data-best]`,
  which re-points `--seal-ink` onto `--seal-best` — a colour LIFT within the gold family
  (`--color-gold-light`, the brighter earned gold), NOT a new token. Gold is EARNED (Q2);
  a personal-best coin reads a touch brighter, never a new hue. The seal mints no new gold
  literal — `--seal-best` composes the gold register, so the earned-gold register keeps
  its ONE home.
- **`fromDrawSVG` decide-at-build → the CSS stroke-dashoffset floor is KEPT.** kf5's
  `fromDrawSVG` was evaluated and DECLINED (BG.W-SEAL-DISC): the check already
  stroke-draws via the compositor-only `--seal-draw` wipe, and `fromDrawSVG`/`DrawSVG`
  are reachable only via an async `loadAnimationEngine()` indirection (not statically
  exported) — awkward + jsdom-unsafe for a mount-triggered one-shot, for zero gestalt
  gain over the CSS-native draw. The CSS floor stays the mechanism; the seal imports no
  kf draw engine (the PRM-native, compositor-only, jsdom-safe floor).
- **It is GOLD — the earned-gold completion register (Q2).** `--seal-ink` defaults to
  `var(--phase-complete-color, var(--color-gold))` — the W-PHASE-PALETTE completion ink,
  NOT the running phase spectrum. Gold is EARNED at completion (the personal-best / done
  garnish). A consumer re-inking `--phase-complete-color` re-inks the seal in lockstep.
- **The settle overshoot + the one-pass glint.** The seal lands with a small spring
  overshoot (the `--seal-scale` SPATIAL leg on the `--spring-bouncy` clock — an ENTER may
  overshoot on arrival, W-MOTION-CANON P2) and glints ONCE on settle (the `--seal-glint`
    - the W-AX-METAL-GLOW `--metal-glow-blur`/`--metal-glow-opacity` gold catch-light — a
      one-pass sweep, NOT a loop; the §6 calm register).
- **One-shot, never a loop.** The seal draws ONCE on `play`, then holds the static
  fully-drawn mark (no looping shimmer — the disco family stays gone).
- **PRM-gated.** Under `prefers-reduced-motion: reduce` the seal appears instantly
  fully-drawn (no stroke animation, no glint sweep — the seal is correct, the motion off,
  the vestibular floor).
- **Compositor-only.** The draw rides `stroke-dashoffset` (a paint prop) + `transform`
  (the scale) + `filter`/`opacity` (the glint) — NO layout property animates
  (`proof:no-layout-animation` holds).
- **Its own register, NOT the HandMark family.** The seal is the GOLD-DRAW completion
  register — distinct from the hand-voice marks. It mints NO new gold token and does NOT
  re-author the metal glow; it COMPOSES the W-PHASE-PALETTE gold + the W-AX-METAL-GLOW
  catch-light (the earned-gold register has ONE home).

## Usage

```vue
<script setup lang="ts">
import { CompletionSeal } from "@mkbabb/glass-ui/completion-seal";
import { ref } from "vue";

const done = ref(false);
// …flip `done` when the speedtest run finishes…
</script>

<template>
    <CompletionSeal v-if="done" :play="done" shape="check" label="Speedtest complete" />
</template>
```

## Props

| prop           | type                                        | default   | meaning                                                      |
| -------------- | ------------------------------------------- | --------- | ------------------------------------------------------------ |
| `shape`        | `"check" \| "ring" \| "disc" \| "wordmark"` | `"check"` | the seal glyph the gold stroke draws                         |
| `label`        | `string`                                    | —         | the accessible completion announcement (`role="status"`)     |
| `play`         | `boolean`                                   | —         | the draw trigger; unset plays on mount                       |
| `personalBest` | `boolean`                                   | `false`   | the earned-gold garnish — arms `[data-best]` (brighter gold) |
| `class`        | `string`                                    | —         | pass-through class on the root                               |

## The motion tokens (off the `@property` register)

The 4 registered typed properties driving the one-shot draw (`tokens/property-regs.css
§18`): `--seal-draw` (the `<percentage>` stroke-reveal extent), `--seal-scale` (the
settle scale), `--seal-glint` (the gold glint intensity), `--seal-ink` (the `<color>`
stroke ink — the earned-gold register). Registered so the draw INTERPOLATES (a bare
unregistered `var()` snaps).

Off the root barrel — a hero-scale completion seal is a focal opt-in feedback surface
(the feedback-surface subpath-only posture), keyframes-free but
import-on-demand.
