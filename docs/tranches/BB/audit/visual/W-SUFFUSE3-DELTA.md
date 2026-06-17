# BB.W-SUFFUSE3 — the suffusion completion + the pop-MOTION (DELTA)

**Freshness header (AZ-form)**
- Capture date: 2026-06-17
- HEAD sha: `086c030e97f26dcc3a86c0a33db931befb03f8cf` (branch `tranche/BB`)
- Dev-box: MacBook-Pro (Metal GPU), demo vite `:5199`
- Modes: BOTH (light + `.dark`)

The wave COMPLETES the BA.W-SUFFUSE2 suffusion (the per-category three-site
identity + the motion-purple) by closing the three holes the SOTA-pop audit
re-found, and brings the colorful pops to LIFE within proportion (the one-color-
event rule is inviolate — a moving/saturated pop is still ONE event).

## What landed

### (a) The FEEDBACK band's three-site `--section-color-8` ruby identity

The feedback band wore the flat default (a mono eyebrow, no accent, no chip —
flat-gray-on-cream). It now reads its OWN warm-status identity. The feedback stop
is **`--section-color-8` (ruby, oklch hue ~8°)** — chosen as the warm-status read
for a status/notification band (the band's icon is `Bell`), DISTINCT from the
adjacent bands (forms-3 teal · containers-2 indigo-blue · data-9 slate ·
navigation-12 periwinkle). 5/6 enrolled stories carry the full three-site FAMILY
(the `.section-label--tinted` eyebrow + the `border-l-[3px]` accent-rail + an
`<IconChip :section="8" bloom reveal>` focal pop); progress carries the same
identity but is a REFERENCE surface (its phase-bus `--viz-*` hues ARE the teaching
content, so it is exempt from the strict ≤1-event count, like select/slider/badge).

The tone specimens (Toast/Notification `--feedback-tone`, Alert variant) carry
their OWN component color — the page identity is the eyebrow/rail/chip event, the
component tone is not a competing page event (the d3 per-surface discipline, the
badge-reference precedent).

### (b) The motion + studio masthead titles at the DISPLAY register + the violet

The motion/studio chassis titles rendered flat ink while the body already carried
the violet. Each motion (`springs`/`typewriter`/`curve-gallery`) + studio
(`aurora`/`blob`/`fourier-studio`) surface now leads with a page-local masthead
`<header>` whose title is a `text-display-3` display-register element carrying the
`--motion-accent` violet (`color: var(--motion-accent)`) as the ONE color text-
event — the existing motion-purple family UNIFIED onto the masthead (the body
plots already carry the violet; the title is the SAME family, never a second hue).
fourier-studio carries the `--viz-*` basis palette as component content (reference-
class). Within proportion: the violet lands on the masthead, never a body `<p>` /
section `<h2>` (the d1 ink floor holds).

### (c) The IconChip pop is ALIVE + the `:saturated` axis

1. **c1 — the entrance rides the per-spring CLOCK.** `icon-chip-reveal` re-points
   off the fixed `var(--duration-medium) var(--ease-standard)` bezier onto
   `animation: icon-chip-reveal var(--spring-snappy-duration) var(--spring-snappy)`
   — the `scale(0.85)→1` now carries the snappy spring's `~+7%` overshoot (peak
   `~1.068`) then settles, opacity COUPLED on the SAME clock (P3). Compositor-only
   (transform/opacity); the PRM `animation: none` snap-to-endpoint carve is
   preserved + the bloom transform collapse added.
2. **c2 — the hover-bloom GROW rides `--spring-smooth`.** The `.icon-chip--bloom:
   hover` adds a `transform: scale(1.06)` on the `--spring-smooth` register (enter
   smooth); the color legs (bg/box-shadow) stay the bezier; the base transform leg
   is the no-overshoot `--ease-out` (the LEAVE — never overshoot past gone). Disco
   fence holds (no sparkle-sweep/btn-audacious/disco-grain).
3. **c3 — the `--icon-chip-plate-strength` token + the `:saturated` axis.** The
   hardcoded `25%` plate mix lifts onto `--icon-chip-plate-strength` (default
   `25%`, BYTE-IDENTICAL); `.icon-chip--saturated` (the `saturated?: boolean` prop)
   re-points it to `40%` — a louder focal pop, STILL ONE color event (the same
   event, louder). The interpolation STAYS `in srgb` (the recorded keep); the
   chip≤glyph ratio is untouched. The earned-spectrum value.js OKLCH path is HELD
   opt-in/demo-local (the named-successor ≥2-consumer bar — the `:saturated` axis
   is the shipped vibrancy lever; no value.js import baked into the primitive).

## The π readbacks (binding — LOCAL-only, :5199)

The π specs are wired + parse-clean (`playwright --list` enrolls all 7 new tests);
they are LOCAL-only (real-render dev-box, the AY W-LIVE1 split), backstopped on CI
by `proof:live-verified-ledger`. The binding assertions:

- **(a) feedback** (`tests-visual/suffuse.spec.ts` BB.W-SUFFUSE3 describe) — at
  `/feedback/alert` BOTH modes: `--section-color-8` resolves to the warm-status
  ruby band (hue < 45° or > 345°, distinct from slate/indigo), the eyebrow + rail
  + IconChip glyph resolve the event — the band reads its identity, not flat-gray.
  Captures: `W-SUFFUSE3-feedback-{light,dark}.png`.
- **(b) title-violet** (`tests-visual/suffuse.spec.ts`) — at `/motion/springs`
  BOTH modes: the masthead display title resolves a DISPLAY font-size (>> 25.9px
  text-heading) AND a violet color (hue 290-350°, the `--motion-accent` family).
  Captures: `W-SUFFUSE3-motion-title-{light,dark}.png`.
- **(c1) pop overshoot** (`tests-visual/icon-chip.spec.ts` BB.W-SUFFUSE3 describe)
  — a synthesized reveal chip's scale series across the `--spring-snappy-duration`
  window OVERSHOOTS past 1.0 (the snappy bloom, not a flat ease-up). Under emulated
  `prefers-reduced-motion: reduce` the pop SNAPS to scale 1 (peak ≤ 1.001 — the P6
  carve, zero overshoot frames).
- **(c2/c3) saturated vibrancy** — the `:saturated` plate α reads LOUDER than the
  default 25% reference (α delta > 0.05).

## The `proof:ba-gestalt` verdicts (BB inv-4)

The feedback band + the motion band gestalt surfaces are owed a whole-page capture
in BOTH modes over their real backdrop with a recorded VERDICT. These verdicts are
re-earned at **W-REFLECT3 (Batch 7)**, the single authorized verdict-flipper, on a
FRESH capture (the AZ-form freshness header + the surface-hash floor from
W-GESTALT-GATE2). At this wave's close the source clauses (a–c3) are GREEN and the
π specs are wired; the operative-PASS gestalt verdict flip is the Batch-7 close.

- **Feedback verdict (provisional, W-REFLECT3 to confirm):** the band reads its
  ruby warm-status identity (eyebrow/rail/chip), not flat-gray-on-cream; the tone
  specimens keep their colored-glass component register. PROVISIONAL-PASS pending
  the Batch-7 fresh capture.
- **Motion verdict (provisional, W-REFLECT3 to confirm):** the violet reads from
  masthead through body; the IconChip pops bloom alive within proportion (the
  spring overshoot paints, the saturated plate louder, the hover-bloom grows).
  PROVISIONAL-PASS pending the Batch-7 fresh capture.

## Gates (born-RED → GREEN)

- `proof:suffuse` — 20/20 (added: `a-feedback-three-site-identity`,
  `b-motion-studio-title-violet`, `b-title-not-orange-red`; the LEDGER gains the 6
  feedback rows + the 3 studio rows). Born-RED demonstrated on the committed
  `feedback/alert.vue` (eyebrow/rail/chip/stop all false).
- `proof:suffuse2` — 7/7 (the `CATEGORY_MAP` gains the `feedback→8` category, 36
  pages). Born-RED demonstrated on the committed feedback files.
- `proof:icon-chip` — W1–W7 PASS (W7 added: the spring-clock entrance + the no-
  fixed-bezier + compositor-only + opacity-coupled + PRM-carve + bloom-on-spring-
  smooth + leave-no-overshoot + the plate-strength token default-25 + the
  `:saturated` 40% rule + the prop + the in-srgb keep). Born-RED demonstrated on
  the committed `icon-chip.css` + `types.ts`.
- Siblings stay GREEN: `proof:no-layout-animation` (the compositor floor — 38
  keyframes, 0 layout animations; the re-timed keyframe is transform/opacity only),
  `proof:spring-tokens-synced` (untouched).

## Fences preserved

- `--motion-accent` is DEMO-LOCAL (`demo/demo.css`) — the title-violet READS it,
  never mints a library token (the presets-in-consumers + ppmycota fences).
- The `--section-color-N` ramp is the library identity (the feedback stop reads it).
- The IconChip plate interpolation STAYS `in srgb` (the recorded reference keep).
- The value.js color leaf (`src/composables/color/`) is CONSUMED read-only — the
  earned-spectrum path is held demo-local (no fork, no primitive import; the ≥2-
  consumer bar gates its promotion).
- The one-color-event proportion rule is INVIOLATE (a saturated/moving pop is ONE
  event, never a second).
