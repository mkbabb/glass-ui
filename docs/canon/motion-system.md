# Motion system (canon home)

## The motion canon (BB.W-MOTION-CANON)

The scattered motion doctrine is codified in `docs/precepts/motion-canon.md` (P1-P6):
- **P1** spring-iff-spatial / bezier-iff-effect (Material 3's split — a SPATIAL channel
  that MOVES/RESHAPES (position/size/rotation/corners) rides a `--spring-<name>`; an
  EFFECTS channel that RE-TINTS (color/opacity/box-shadow) rides a bezier `--ease-*`).
- **P2** enter-bouncy / exit-no-overshoot (a closing surface must not overshoot past gone).
- **P3** fade-coupled-to-transform.
- **P4** the per-spring `--spring-<name>-duration` clock is mandatory.
- **P5** compositor-only.
- **P6** PRM-keeps-fade / drops-transform.

The §6 easing table (`scheme-motion.css`) is the SOURCE the canon re-states. Rows: surface
props → `--ease-standard`; transform hover/press/active → `--spring-smooth` (ζ=0.80 — 0.86 is
`useSpring`'s own bare default, a different primitive, not this register); enter →
`--spring-bouncy`/`--spring-snappy`; exit → `--ease-out`/`--ease-standard`; position-tracked
→ `--ease-standard`.

## The per-spring DURATION clock (BA.W-GLASS-CAL Unit 3)

The `--spring-<name>` `linear()` curve is normalized to 0..1 and DISCARDS the settle time,
so pairing it with a generic `--duration-*` clock re-timed every spring to one wall clock.
**`--spring-<name>-duration`** is the spring's OWN 2%-band settle clock, GENERATED in
`scripts/regen-spring-tokens.mjs` from the SAME `(response, ζ)` SPRING_PRESETS table (never a
hand value): `t_s = -ln(0.02) / (ζ·ωₙ)`, ωₙ = 2π/response.

## The ONE interruptible, coupled spring-press (BB.W-PRESS-UNIFY)

`useSpringPress` (on `@mkbabb/glass-ui/motion`) is the driver wrapping `useSpring` → kf
`SpringProgress`, whose target re-seat is velocity-continuous (a rapid re-press mid-release
inherits the first's momentum — the iOS interruptible contract, NOT a CSS-transition restart).
`useLiquidPress` factors the pattern ONCE (composes `useSpringPress` + `useLiquidFlex`,
exposes one `pressStyle` + a `--*-press-t` drive scalar). Bound on two binary consumers —
Button (direct `useSpringPress`) + Card (`:pressable`). Compositor-only + PRM-instant.

## Compositor-safe keyframes — the reflow set is forbidden (BB.W-CARD-COMPOSITE)

A CSS `@keyframes` step may animate ONLY compositor-safe channels — transform/translate/
scale/rotate, opacity, filter/backdrop-filter, clip-path, paint props, and `--*` customs
that resolve onto them — NEVER a layout-triggering property (padding/margin/font-size/
width/height/inset/grid-template/flex-basis/line-height/border-width/gap). Review the
changed keyframes and transitions directly, then inspect layout stability in the routed
product.

## The liquid-open / bloom-from-source register (BB.W-LIQUID-REVEAL)

Every top-layer surface MATERIALIZES as glass coalescing — scales + fades + decongests
(`filter: blur(4px)→0`) from its trigger/anchor on a snappy/bouncy spring, never a flat
fixed-bezier zoom-95. `.glass-reveal` (`src/styles/glass/reveal.css`) is the zero-JS top-
layer default; `useLiquidReveal` is the source-rect bloom JS refinement (composes kf
`ElementMorph` + `springTimingFunction`); `useDockCtaReceive` is the bloom's inverse (an
external CTA morphs onto a dock control). `popover-animate` + `slide-in-from-side` retired
as a clean break.

## The data-viz entrance register

Chart marks enter on rows the spring table already has; there is no data-viz spring.
`composables/motion/reveal/entranceRegister.ts` (`VIZ_ENTRANCE`) is the one record of
which row lands which kind, and `styles/glass/viz-enter.css` is its CSS twin.

| kind | class | row | how it enters |
| --- | --- | --- | --- |
| mark (a point, dot, glyph) | `.viz-mark` | `present` | scales up from its own centre and lands dead; no fade |
| bar or area | `.viz-bar` | `panel` | a clip uncovers it from its baseline (`data-viz-from` names another edge); the row's rebound runs the clip past the bar's box, so the bar never draws past its value |
| ripple, radial field | `.viz-ripple` | `bloom` | a circle clip opens from `--viz-ripple-at` |

The cascade has one spacing: each item sets `--i`, the series sets `--viz-n`, and the
spacing is `min(--motion-stagger-default, --spring-panel-duration / n)`, so a series of
any length starts inside one `panel` duration. `useStagger` defaults to the same spacing
(`cascadeStaggerMs`). Reduced motion draws every mark at rest. The Motion Lab story's
"Chart entrances" section shows all three.

The Collapsible's height and the menu plate's growth are the two disclosure geometries:
the Collapsible transitions its grid row (`0fr` ↔ `1fr`) on `present`, which turns
mid-flight where it stands; a menu plate is laid out at its final size and a clip
uncovers it from its trigger on `bloom`. Neither fades in.

## useDragMorph — the pull/drag-to-morph-squish primitive (BB.W-DRAG-MORPH)

The platform's ONE pull-gesture primitive: grab live chrome and pull it. Composes the kf
`Draggable` (pointer-capture follow + velocity-windowed sample + C¹ fling) + `SpringProgress`
+ `useLiquidFlex` (the tanh velocity-squish, capped low). Fling-to-nearest, interruptible,
single-commit. Consumers: SegmentedTabs `:draggable` + DockLayerGroup pull-to-switch, plus
the WAI-ARIA roving-tabindex contract on every strip.

## DOCK_SPRING

`DOCK_SPRING` (`src/components/dock/constants.ts`) is the dock's single spring register
sourced from `springPreset("dock")` (the SPRING_PRESETS row — defined ONCE, read by
`dockMorphContext.ts` + `useLayerTransition`). It is byte-fenced across the dock-morph waves
(a re-tune touches the SPRING_PRESETS table, never a hardcoded copy).

## The scroll-choreography register (BB.W-SCROLL-MOTION)

The SOTA scroll-driven CHOREOGRAPHY rides the NATIVE `scroll()`/`view()`/`timeline-scope`
substrate — glass-ui ships the native register; **the no-Lenis/GSAP/Locomotive fence is
binding** (a 20-40KB JS runtime the native-first identity refuses). `src/styles/scroll-
choreography.css` mints `.scroll-build` (route-enter page-build), `.scroll-cascade` (section
cascade), `.scroll-pin`/`.scroll-pin-stage` (scroll-pinned), and `.smooth-scroll` (native
`scroll-behavior: smooth`, not a rAF momentum loop). All compositor-only and reduced-motion
aware.
