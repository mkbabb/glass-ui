# The motion canon

The ONE binding principle-set for glass-ui motion. Every wave that animates a
surface CITES this doc instead of re-deriving "which easing where" from first
principles. The doctrine was already SOTA-aligned in substance — the §6 easing
table (`src/styles/tokens/scheme-motion.css`), the analytically-derived per-spring
duration clock, the coupled-fade enter recipes (`src/styles/transitions.css`), and
the universal `prefers-reduced-motion` carve (`src/styles/utilities/a11y-overrides.css`
+ the `transitions.css` recipe-local arm) — but it lived scattered across a token
comment, recipe sheets, and CLAUDE.md prose with no single artefact to cite. This
codifies it (BB.W-MOTION-CANON).

This is a CODIFICATION, not a re-tune. No spring constant moves; no recipe re-times;
no new physics. The §6 table is the SOURCE; this doc is its canonical re-statement
plus the Material-3 framing and the SIZE/MORPH register the table was missing.

## P1 — spring iff spatial, bezier iff effect

Adopt Material 3's spatial-vs-effects split as the formal law. Every motion is one of
two kinds:

- **SPATIAL** — the box MOVES or RESHAPES: position, SIZE, rotation, corners. Rides a
  `--spring-<name>` (`scheme-motion.css`); the overshoot reads as physicality.
- **EFFECTS** — the surface RE-TINTS: color, opacity, box-shadow. Rides a bezier
  `--ease-*` (`--ease-standard`/`--ease-out`); a colour cross-fade on a spring reads as
  a wobble or a hesitation.

glass-ui's §6 "Surface props" row IS Material's effects token; its "Transform" row IS
spatial. The table now tags each row `[SPATIAL]` or `[EFFECTS]` so the rule is legible.

The **SIZE/MORPH** register (the dock V↔H morph, the SegmentedTabs indicator
size-correction, a reveal source-rect bloom) is SPATIAL: it rides a spring
(`--spring-dock`/`--spring-snappy`), expressed as a COMPOSITOR `transform` (P5),
NEVER an animated `width`/`height`. This is the most-used spatial channel and it was
the one row the §6 table never listed; it is added now.

The SOTA **arrival** ease — the bold decelerating settle for a draw-on reveal or a
big-distance arrival — is the EXISTING `--ease-out-expo` (alias →
`--motion-ease-out-expo` = `cubic-bezier(0.16, 1, 0.3, 1)`, the house expo with the
value.js `easeOutExpo` JS twin in the `curves.ts` `MOTION_CURVES` table). The canon
NAMES it as the arrival register; it is not re-minted — a duplicate alias would fail
`proof:animation-coherence`'s EASING-TABLE-BOUND arm (every `--ease-*` named on a leg
must have its canonical/alias row, the two halves cannot drift).

## P2 — enter bouncy/snappy, exit no-overshoot bezier

Enter (mount, popover open, dialog in, reveal) rides `--spring-bouncy`/`--spring-snappy`
— the lively settle. Exit (unmount, close) rides `--ease-out`/`--ease-standard` — a
bezier with NO overshoot, because an exit must never overshoot past gone. Already held
in `transitions.css` (`dialog-scale`/`pop`/`dropdown` enter-springs, ease-out exits);
the canon names the rule.

## P3 — fade COUPLED to transform

Every enter/exit pairs opacity WITH scale/translate in the SAME transition — the
"squishy quick" read, the iOS light-bending-modulated arrival where the surface
materializes as one continuous layer. The opacity channel rides the shorter `--ease`
leg; the transform channel rides the matching `--spring-<name>-duration`. The
`transitions.css` `dialog-scale`/`pop`/`dropdown`/`pane-swap`/`metric-swap` recipes are
the model (each is a two-leg `transition: opacity …, transform …`). A bare opacity fade
with no transform reads flat; a bare transform with no fade reads abrupt.

## P4 — the per-spring duration clock is MANDATORY

Every spring transition pairs `--spring-<name>` with its matching
`--spring-<name>-duration` (the W-GLASS-CAL clock), NEVER a generic `--duration-*`. The
`--spring-<name>` `linear()` curve is normalized to 0..1 and DISCARDS the spring's
settle time, so pairing it with a generic clock re-times every spring to the same wall
clock and drags a dead sub-pixel tail (snappy and smooth both running 300ms was the
R10-2 read). The per-spring clock is the spring's OWN analytic 2%-band settle
`t_s = -ln(0.02) / (ζ·ωₙ)`, generated in `scripts/regen-spring-tokens.mjs` from the same
`(response, ζ)` PRESETS table the curve derives from — never a hand value.
`proof:animation-coherence`'s DURATION-BAND arm reds a generic-duration orphan on a
spring leg.

## P5 — compositor-only

Animate ONLY compositor-safe channels: `transform`/`translate`/`scale`/`rotate`/
`perspective`, `opacity`, `filter`/`backdrop-filter`, `clip-path`, paint props
(`color`/`background*`/`box-shadow`/`border-color`/`fill`/`stroke`/`outline-color`), and
`--*` customs that resolve onto them. NEVER a layout-triggering property —
`width`/`height`/`inline-size`/`block-size` (+ `min-`/`max-` axes), `padding`/`margin`,
`font-size`, `top`/`left`/`right`/`bottom`/`inset*`, `grid-template-*`/`grid-auto-*`,
`flex-basis`, `line-height`, `border-*-width`, `gap`/`row-gap`/`column-gap` — because the
browser re-layouts on EVERY animation frame (the per-frame reflow storm → CLS, the A'-3
class).

A SIZE/MORPH animation is a `transform: scale()` over a RESERVED settled footprint, never
an animated box dimension (the W-CARD-COMPOSITE precedent: padding→`translateY`,
font-size→`scale`, grid-track→`scaleY`+opacity, gestalt-identical, zero reflow).

**`useLiquidFlex.sizeStyle` is the settled-FOOTPRINT writer** — a one-time reserve of the
morph target box, NEVER the per-frame channel. The per-frame channel is `transform` (the
`stretchStyle` `--stretch` reciprocal scale). A consumer binding `sizeStyle` to a
continuously-animated element animates `width` off the compositor (the A'-3 class) and is
forbidden by this canon. The primitive is correct; the contract was unstated — it is
recorded here and in the `useLiquidFlex.ts` JSDoc (the SIZESTYLE-LATENT note).

Enforced library-wide by `proof:no-layout-animation` (the `@keyframes` corpus + the
`transition`/`transition-property` declarations + the Vue `<Transition>` recipe classes,
under one shared reflow-set). A genuine discrete layout RECLAIM (a user-initiated
open/close where the body content MUST reflow up into freed space — the reka-ui
Collapsible/Accordion `height`/`grid-template-rows` toggle) is a DIFFERENT primitive than
a continuous compositor-safe shrink: it is a one-shot bounded-CLS transition, named on the
gate's narrow audited allowlist with its rationale, never a silent escape.

## P6 — PRM keeps the fade, drops the transform

Under `prefers-reduced-motion: reduce`, motion keeps the opacity/color fade (shortened)
and STRIPS the spatial transform (`transform: none`, durations to ~0.01ms). Opacity and
color fades are NOT vestibular triggers; scale, translate, and spin ARE (WCAG 2.3.3,
web.dev guidance). A drag or gesture still FUNCTIONS under PRM — the physics is off, the
gesture works (the PRM-safe-by-construction principle).

The discipline is SINGLE-SOURCED at the library seam, not re-declared per recipe:

- **The universal carve** is `a11y-overrides.css` — `@media (prefers-reduced-motion:
  reduce) *:not([data-allow-motion])` restricts `transition-property` to the non-spatial
  set (`opacity, color, background-color, border-color, box-shadow`) and snaps animation
  durations, so EVERY transform transition is stripped library-wide by construction. The
  `data-allow-motion` attribute is the narrow opt-OUT for a control whose whole purpose IS
  the animation (the `DarkModeToggle` icon spring) — and PRM still overrides even that
  (accessibility is absolute).
- **The recipe-local carve** is `transitions.css` — the Vue `<Transition>` classes
  (`fade-slide`/`dialog-scale`/`pop`/`dropdown`/`pane-swap`/`metric-swap`/`dock-in`) carry
  their OWN `@media (prefers-reduced-motion: reduce)` block that keeps opacity and zeroes
  transform, because a `<Transition>`-class transition is authored with explicit legs the
  global property-reset shape complements rather than fully replaces.

Enforced by `proof:no-layout-animation`'s PRM-carve assertion: the universal carve exists
and restricts `transition-property` to the non-spatial channels, AND the recipe-local
keep-fade/drop-transform reference exists — the discipline cannot silently regress.

## P7 — the ONE source + the ONE clock + the sanctioned off-spine SET

keyframes.js is the ONE motion brain. Every spring you see — a dock morphing V↔H, a
dialog blooming open, a tab pill flinging to its slot, a button squishing under a
press, a number tweening up — is the SAME `SpringProgress` physics core running off
the SAME `SPRING_PRESETS` `(response, ζ)` register table (`springPresets.ts`), ticked
by the SAME frame discipline, snapped by the SAME `prefers-reduced-motion` gate, AND
CLOCKED by the SAME per-spring `--spring-<name>-duration` analytic settle the SAME
table derives. There is genuinely ONE source and ONE clock under all of it, so the
whole demo reads as ONE coherent physical material (the iOS-27 "everything is the same
liquid" feel).

**The ONE source AND the ONE clock fall out of the SAME table.** The `SPRING_PRESETS`
`(response, ζ)` pair derives BOTH the `--spring-<name>` `linear()` curve (via
`springTimingFunction` / `springLinearStops`) AND the `--spring-<name>-duration`
analytic 2%-band settle (`t_s = -ln(0.02)/(ζ·ωₙ)`, `scripts/regen-spring-tokens.mjs`).
A curve and its clock can never desync because they are generated from ONE table. So
the P4 clock rule is now BINDING and UNIVERSAL — the user-mandate clock bar
(2026-06-18): EVERY animating spatial leg, in EVERY band (tabs · dock · buttons ·
cards · dialogs · drawers · menus · reveals · the viz choreography · the page-build
cascade), reads its OWN `--spring-<name>-duration` clock with the coupled fade (P3),
NEVER a generic `--duration-*`. A spring curve on a generic clock re-times the spring
to one wall clock and drags the dead sub-pixel tail (the R10-2 "abrupt"/"springs too
slow" read). The ONLY sanctioned non-spring clock is an EFFECTS-only bezier leg
(color/opacity-only on `--ease-*`, P1) — recorded, never a loophole for a spatial
channel. `--tab-indicator-duration: var(--spring-snappy-duration)` is the model — a
spring leg reads its OWN clock through the named token.

**The sanctioned off-spine SET (the allowlist).** The canonical motion authority is
`keyframes.js` reached through the `/motion` barrel: every spring/morph/press/drag/
reveal/number-tween composes a kf primitive (`SpringProgress`/`Draggable`/
`ElementMorph`/`SmoothProgress`/`NumericAnimation`/`Sequence`). There are exactly TWO
sanctioned off-spine seams, both for SCC / foreign-tree reasons, both documented:

- **`usePointerVelocityField`** — the shared viz-pointer-physics field. A hand-rolled
  critically-damped lerp (position → velocity → acceleration), intentionally kf-FREE so
  it ships on the engine-free `/motion-core` subpath AND the root barrel (a keyframes
  edge would trap it off-root — the SCC root-barrel discipline). It owns NO rAF: the
  renderer FEEDS it `tick(delta)` from its own canvas-lifecycle loop. The ONE allowed
  off-spine smoother.
- **`useDragMorph`** — the pull/drag-to-morph primitive. It WIRES the published kf
  surface (`Draggable` + `SpringProgress` + the shipped `decayRest` projection) and
  re-rolls the SNAP HERE (`decayRest` projects the frictional rest, then `spring.target`
  re-seats to the nearest declared center) because the kf `snap` option is not yet on
  the published dist. The kf-snap-not-on-dist INTERIM; it collapses onto kf `snap` when
  it ships. NOT a second engine — a published-surface composition with one re-rolled
  seam.

A THIRD un-sanctioned off-spine spring/rAF (a `new SpringProgress` inside a private
hand-rolled rAF integrator, a hand-rolled lerp smoother with no kf import, a second
`decayRest`+`spring.target` re-roll) reds `proof:motion-one-clock` M2.

**The sanctioned per-primitive `(response, ζ)` defaults (NOT a second register table).**
`SPRING_PRESETS` is the ONLY hand-authored register TABLE. These four are documented
per-primitive DEFAULTS, declared at each primitive's own seam, never a hand-kept second
table — every other `(response, ζ)` read derives via `springPreset(name)`:

- **`useSpring`** `(0.5, 0.86)` — the base `SpringProgress` primitive default (the
  SETTLE register's response/ζ), the floor every `useSpring` caller may override.
- **`useSpringPress`** `(0.25, 0.7)` — the press-squish primitive default (a crisp
  short-response press settle, W-PRESS-UNIFY).
- **`DOCK_SPRING`** `(0.68, 0.64)` — the dock expand/collapse morph register
  (`dock/constants.ts`); the WEIGHTY iOS-27 gooey-morph re-tune (BD.W-ANIM-IOS27-TUNE),
  DERIVED from the `dock` `SPRING_PRESETS` row via `springPreset("dock")` (the
  no-second-authority fence — ONE table row feeds the CSS token, the JS-driven morph,
  and the const; not a frozen hand-value).
- **`DRAWER_SNAP`** `(0.4, 0.82)` — the drawer detent-snap register
  (`drawer/constants.ts`).

A NEW hand-inlined `(response, ζ)` register TABLE (≥2 unsanctioned rows in one file)
reds M1 — it should be a `SPRING_PRESETS` row read via `springPreset(name)`.

**The viz inversion (FEED, don't OWN).** The viz are the one un-clocked island: they
own a `createCanvasLifecycle` rAF and FEED kf primitives `tick(dt)` from inside that
ONE loop — they must NEVER call `RAFPlayback.play`/`.loop`/`.drive` (a viz owning a kf
rAF inverts the relationship and breaks the one-loop / `proof:offscreen-pause` fence).
`proof:motion-one-clock` M4 records this; `BC.W-VIZ-CHOREOGRAPHY` owns the positive
viz-side wiring (the viz internal smoothing math — `useBlobMood`, `useBlobSatellites`,
the aurora/flow-field uniforms — is the viz island's, NOT the UI spine's, so M2 does
not sweep the viz dirs).

This §P7 is the SINGLE source the `proof:motion-one-clock` gate reads its
`OFF_SPINE_ALLOWLIST` + `SPRING_DEFAULTS_ALLOWLIST` against (M5 cross-checks the gate
and the canon name the SAME set — a new sanctioned seam is added in ONE place). The
gate owns the WHICH-engine / WHICH-clock / WHICH-exception axis; it is the
PROPERTY-SPINE sibling of `proof:animation-coherence` (register tier) and
`proof:no-layout-animation` (compositor tier), not a duplicate. The CURVE-SHAPE arm
(abrupt-vs-eased) is `BC.W-SPRING-EASE`'s — the disjoint complement on the same swept
corpus.

## Ratify-no-re-tune notes

Two facts the canon RECORDS so a future agent does not "fix" a correct thing:

- **The "quick" read is the spring's EARLY ARRIVAL, not the 2%-settle.** snappy's
  PERCEPTUAL arrival (90% travel) is ~100-120ms — the `linear()` curve hits ~1.0 by the
  12-16% slot — even though its 2%-band settle clock runs 340ms. It reads QUICK; the tail
  is sub-pixel and intentional. Do NOT truncate the snappy clock to ~150ms to "make it
  snappier" — that re-introduces the truncated-tail jank the W-GLASS-CAL clock killed. The
  clocks are generated, not hand-set; the spring fence is binding.
- **The proportion fence.** Morph the MEANINGFUL transition; never everywhere-jitter (the
  NN/g liquid-glass overuse warning, the §4 identity guard). A gel morph is reserved for a
  state change that earns it (a topology flip, a reveal), not applied to every hover. The
  iOS-26 register is restraint: the light-bending modulates the fade; the gel is the
  exception.

## Cross-references

- `src/styles/tokens/scheme-motion.css` §6 — the SOURCE easing table (the spatial/effects
  labels + the SIZE/MORPH row this doc re-states) + the per-spring duration clock (P4).
- `src/styles/transitions.css` — the coupled-fade enter recipes (P2/P3) + the recipe-local
  PRM carve (P6).
- `src/styles/utilities/a11y-overrides.css` — the universal PRM carve (P6).
- `src/composables/motion/useLiquidFlex.ts` — the `sizeStyle` settled-footprint contract
  (P5, the SIZESTYLE-LATENT note).
- `scripts/proof-no-layout-animation.mjs` — the compositor-only enforcement (P5) across the
  `@keyframes` + transition + `<Transition>` surface, plus the PRM-carve assertion (P6).
- `scripts/proof-animation-coherence.mjs` — the REGISTER-tier gate (the curve assignment,
  P1/P4); `proof:no-layout-animation` is the PROPERTY-tier complement (layout-vs-compositor,
  P5), not a duplicate.
- `design-idioms.md` §6 (the easing register) + §10 (the house snap engine on
  `SpringProgress`, the §6 per-spring clock made structural).
