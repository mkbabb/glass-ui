# BD.W-PAGER-GOO-MORPH — the pager/deck dots GOO-MORPH between states (the worm + the metaball merge)

**Band 17 (liquid-weight) · Tier T6 · depends: COMPOSES the shipped `useLiquidFlex` squish (`src/composables/motion/useLiquidFlex.ts`) + the `--spring-bouncy` `SPRING_PRESETS` row (`springPresets.ts` / `scheme-motion.css:238` `linear()` + `:261` 0.57s clock) + the `morph-bridge.css` SVG-goo filter trick + the `pagerWindow` oracle (`pagerWindow.ts`) + the `useTabIndicator` travel SHAPE · CONSUMES W-LIQUID-ENTRANCE-GENERAL's universal liquid-weight law (this is its FLAGSHIP pager instance) · sequenced AFTER the spring-preset spine is at HEAD (the `bouncy` 0.5/0.55 retune) · DOWNSTREAM: the DeckPager + carousel consumers inherit it for free; W-REFLECT re-confirms on fresh pixels · BUILD-SPEC: `docs/tranches/BD/viz/goo-morph/BUILD-SPEC.md`**

## The defect / the ask

The BINDING LAW (`feedback_liquid_weight_universal`, the user "remember this always"): the
slide-deck/pager DOTS must **GOO-MORPH** from one to another — the active indicator MERGES +
STRETCHES like the goo-blob metaball as it travels between dots, **never a hard hop**. This is the
EXTANT Google-deck dot morph: the indicator STRETCHES across the gap (an elongated worm), the dots
it touches MERGE into it (a metaball neck wells up + releases), then it CONTRACTS + SETTLES with a
spring overshoot. **The user already REJECTED a subtle traveling pill** — FAR more liquid + squishy
is the hard floor.

The current `PagerDots.vue` (lines 190-240) FAILS this on two counts:

1. **It is a per-dot `width`/`height` LAYOUT animation** (`transition: width …, height …`) — a
   per-frame reflow, FORBIDDEN by `proof:no-layout-animation` / motion-canon P5. It rides the
   `--spring-dock` clock so it "settles," but each dot independently grows/shrinks its OWN pip
   IN PLACE. There is **no traveling worm, no merge between dots, no volume-preserving squish.**
2. **It reads as a hard cross-fade** — the old dot's pill collapses while the new dot's pill grows
   (two independent box transitions, not ONE liquid element morphing across the gap). This is
   EXACTLY the "subtle shift" the user rejected vs. the Google-deck goo-morph.

The pip anatomy, the `--pager-dot-*` token surface, the 24px hit-box, the `windowFit` windowing, the
aria registers, the focus-survival, and the `.glass-pager-ring` chassis are all KEPT — only the
**active-indicator paint + travel** is replaced by a single traveling WORM that glides + squishes
between dot centers on the `--spring-bouncy` clock, with a deterministic SVG-goo neck that MERGES the
worm + the dots into one liquid mass at the crossing.

## Starting state (HEAD, verified on disk)

- `src/components/custom/pager-dots/PagerDots.vue:201-205` (READ — **the born-RED anchor**): the
  active pip morphs by `transition: width var(--spring-dock-duration) var(--spring-dock), height …`
  — a per-dot `width`/`height` LAYOUT transition (the P5 violation), no worm, no merge, no squish.
  `:215-222` the `[data-active]::before { width: var(--pager-dot-elongated) }` per-dot grow.
- `src/composables/motion/useLiquidFlex.ts` (READ) — the ONE squish engine (the reciprocal
  `--stretch` value, the `"linear"`/`"tanh"` laws, the `maxStretch` cap). The worm composes it
  squish-only (the travel is the CSS transform). The W-LIQUID single-engine fence (no second
  `tanh`/`1+frac·(cap−1)` write).
- `src/composables/motion/springPresets.ts` (READ) — `bouncy` row = response 0.5 / ζ 0.55, overshoot
  ~+12.6% (the Apple 12-18% band). `src/styles/tokens/scheme-motion.css:238` the `--spring-bouncy`
  `linear()` curve (peaks ~1.12435 at ~14% of the clock, settles by ~55%); `:261`
  `--spring-bouncy-duration: 0.57s`. The travel preset — the BOUNCE + WEIGHT the ask names.
- `src/styles/dock/morph-bridge.css` (READ) — the shipped SVG-goo metaball trick (blur-then-alpha-
  threshold `feGaussianBlur`+`feColorMatrix`), DECORATIVE-only (`pointer-events:none`,
  `isolation:isolate`, tight-boxed `contain`), deterministic `f(--scalar)` (no own clock), PRM-drop.
  The pager goo reuses this trick applied to N dots + a worm.
- `src/components/custom/tabs/composables/useTabIndicator.ts` (READ) — the travel SHAPE: ONE moving
  element, `transform: translate` to the MEASURED center (center-anchored, BA-VJS-3), the
  `transition` on the spring `linear()` clock, `squishOnTravel` writing `--stretch`,
  `INDICATOR_RELEASE_AT_ARRIVAL` releasing at arrival, `vertical.value` axis-derived,
  `squishOnTravel` early-returns on PRM (`:206`). The worm is the SAME shape on dot centers.
- `src/components/custom/pager-dots/pagerWindow.ts` (READ) — the DOM-free windowing oracle (PagerDots
  + DeckPager both source it). The deck-boundary fence — NEVER a third copy.
- `src/components/custom/pager-dots/PagerDots.vue:102-110` (READ) — the keyboard focus-survival across
  a window recompute. KEPT (the worm is `aria-hidden`, not a focus target).
- The DeckPager wrapper (composes PagerDots via `pattern="group"`) — gets the worm for FREE, ZERO
  DeckPager change (the ≥2-consumer bar met by construction: carousel + DeckPager).
- `docs/tranches/BD/viz/goo-morph/BUILD-SPEC.md` (READ) — the exact mechanism (the §2 worm geometry,
  the §3 spring+squish, the §4 goo+opaque-layer, the §6 tokens, the §8 PRM/Safari rules, the §9 reuse
  map).

## The mechanism

Replace the per-dot width/height transition with ONE traveling worm + an opaque goo layer, all
compositor-only, deterministic on the ONE `--spring-bouncy` clock, landing ONCE in PagerDots. Per the
BUILD-SPEC:

1. **The worm — ONE opaque capsule, two-edge stretch-then-contract (BUILD-SPEC §2).** A single
   `.goo-worm` element travels between the MEASURED dot centers. Its two edges (`head` trailing,
   `tail` leading) are pure functions of `--worm-t`: in phase 1 the leading edge moves while the
   trailing pins at the source → the body ELONGATES to span both dots at the midpoint; in phase 2 the
   leading edge locks at the target + the trailing catches up → the body CONTRACTS onto the target.
   Expressed COMPOSITOR-only: `transform: translateX(center) scaleX(len/W) scaleY(1/√(len/W))` over a
   RESERVED `--pager-dot-elongated` footprint (NEVER an animated `width` — the W-CARD-COMPOSITE
   one-time-reserve discipline; this FIXES the current P5 violation). The `lenRatio` peaks at
   ~1+(B−A)/W (≈5× for a 6px dot over a ~24px pitch) at the swipe midpoint then contracts to 1 — the
   body visibly bridges both dot centers (NOT a rigid pill slide).
2. **The travel spring — `--spring-bouncy` (BUILD-SPEC §3a).** The worm travels on `--spring-bouncy`
   @ `--spring-bouncy-duration` (0.57s, overshoot ~+12.6%) — the explicit overshoot IS the bounce,
   the 0.57s clock IS the weight/inertia, the preset the user's law names. The PREFERRED drive is the
   CSS `linear()`-transition path (set the target transform on select, let `transition: transform
   var(--pager-worm-duration) var(--pager-worm-spring)` spring it — the `--spring-bouncy` `linear()`
   IS the spring physics baked into a timing function; NO rAF, NO keyframes peer, root-barrel-safe,
   Safari-Baseline). The higher-fidelity live-`SpringProgress` path (the velocity-driven `"tanh"`
   squish, → `/motion` off the root barrel) is RESERVED for W-REFLECT IFF the CSS path proves
   insufficiently liquid — the CSS path is the floor. NO new spring family (the W-GLASS-CAL fence —
   `bouncy` is a shipped `SPRING_PRESETS` row).
3. **The squish — `useLiquidFlex` (BUILD-SPEC §3b).** The worm composes `useLiquidFlex`
   (`squishLaw:"linear"`, `maxStretch` live-read off `--pager-worm-max-stretch` default 1.08) for the
   reciprocal cross-axis pinch — the SAME `--stretch` reciprocal CSS the SegmentedTabs indicator runs,
   axis-derived (horizontal → `scale: stretch, 1/stretch`; vertical flips). The `--stretch` PEAKS
   during travel + releases AT arrival (the `INDICATOR_RELEASE_AT_ARRIVAL` × the bouncy clock pattern,
   read from `--spring-bouncy-duration`). NO re-rolled squish (the W-LIQUID single-engine fence).
4. **The goo merge — the opaque layer + the SVG filter (BUILD-SPEC §4).** The worm + the resting dots
   live in ONE `.pager-goo-layer` carrying `filter: var(--pager-goo-filter, url(#pager-goo))` (the
   `morph-bridge.css` blur-then-alpha-threshold goo, `stdDeviation=4`, `feColorMatrix 0 0 0 18 -7`,
   `color-interpolation-filters="sRGB"`, region `-50% -50% 200% 200%`). As the worm's blurred fringe
   overlaps each dot it bridges, a solid metaball NECK wells up → they read as ONE blob; as the worm
   contracts the neck pinches off → the source dot springs back to a free pip. **The merge tracks the
   worm stretch for FREE** — the filter is STATIC (the Safari trap), only the opaque shapes move; ONE
   scalar drives everything.
5. **THE OPAQUE-LAYER TECHNIQUE — the translucency fix (BUILD-SPEC §4b, the load-bearing fix).** The
   gooey filter thresholds ALPHA; the 52%-translucent pips break the threshold (after blur they peak
   below the M/N≈0.39 cutoff → erased/flickery). The fix: EVERY shape in `.pager-goo-layer` paints
   FULL-alpha `currentColor`, the filter merges them reliably, and the 52% rail translucency is
   applied ONCE at the LAYER (`opacity: var(--pager-goo-layer-opacity, 0.52)`). The per-dot brightness
   hierarchy is carried by the WORM (full layer presence) sitting on the dim 52% dot bed — the active
   region reads brighter because the opaque worm sits on it. ZERO per-dot alpha to fight the filter;
   the `--pager-dot-*` token surface is PRESERVED (the tokens now drive the LAYER opacity + the worm
   color).
6. **The token surface (BUILD-SPEC §6).** KEEP every `--pager-dot-*` (the consumer retint seam —
   `slides` sets `--pager-dot-active: var(--ncsu-red)`). ADD `--pager-worm-spring`
   (`var(--spring-bouncy)`), `--pager-worm-duration` (`var(--spring-bouncy-duration)`),
   `--pager-worm-max-stretch` (`1.08`), `--pager-goo-layer-opacity` (`0.52`), `--pager-goo-filter`
   (`url(#pager-goo)`) — all `var(--t, fallback)` reads (the consumer-token cascade, no `:deep()`). A
   consumer re-points `--pager-worm-spring: var(--spring-snappy)` for a calm deck — no fork.
7. **a11y / windowFit / orientation / DeckPager inheritance — BYTE-KEPT (BUILD-SPEC §7).** The worm +
   goo layer are PRESENTATIONAL `aria-hidden` (no role, not a focus target — the tab-indicator
   precedent). The 24px hit-box, the `pattern` aria split, the `pagerWindow` windowing (the worm
   travels between SHOWN centers; the oracle is NEVER re-forked — the deck-boundary fence), the
   focus-survival, both orientation axes, the `.glass-pager-ring` chassis — all UNCHANGED. DeckPager
   inherits the worm for FREE (the goo-morph lands ONCE in PagerDots — ≥2 consumers by construction).
8. **Compositor-only / PRM / Safari (BUILD-SPEC §8).** Transform+scale+opacity+filter ONLY (the
   elongation is `scale` over a reserved footprint — the P5 fix). PRM: the worm SNAPS to the active
   center (no travel spring), `--stretch` stays 1 (the `squishOnTravel` early-return), the goo layer
   `display:none` (the `morph-bridge.css` PRM-drop), the color/opacity fade survives (the pager still
   functions). Safari: `will-change: transform` + `contain: layout paint` + `isolation: isolate` on
   the goo layer (forces the compositor re-raster that clears WebKit #184601 — the moving-element
   filter-staleness bug); the filter is STATIC (NEVER animate `stdDeviation`/`feColorMatrix`); the
   whole goo layer is `@supports (filter: url(#x))`-gated with the plain transform worm as the
   everywhere FLOOR (progressive enhancement, the `morph-bridge.css`/W-LENSING `@supports url()`
   precedent); the blur rides `filter` not `backdrop-filter` (W-LIQUID-REVEAL); unprefixed
   `filter: url()`.

This is NOT a re-fork — it COMPOSES five shipped leaves (`useLiquidFlex`, `--spring-bouncy`, the
`morph-bridge.css` goo trick, the `pagerWindow` oracle, the `useTabIndicator` travel shape) and
re-forks none. It mints NO new spring family, NO second squish engine, NO second goo filter, NO
third windowing oracle, NO DeckPager re-implementation. The change lands ONCE in PagerDots.

## The gate — proof:pager-goo (NEW, P1-P6), born-RED → GREEN

`scripts/proof-pager-goo.mjs`, `["local","ci","release"]` (the source-structure arm; the binding
PAINT is the π frame-series below). The detector comment-strips first + exports a pure detector for
the self-test bites.

- **P1 — the per-dot width/height LAYOUT transition is GONE; the worm is a `transform`.** The
  `.pager-dot::before` no longer carries a `transition: width …`/`height …` (the P5 violation); the
  active indicator is a SINGLE `.goo-worm` element driven by `transform: translate`/`scale` (the
  reserved-footprint discipline). A surviving `width`/`height`/`inline-size`/`block-size` `transition`
  on a pager paint element REDS (born-RED on HEAD — `PagerDots.vue:201` reads the width transition).
  Cross-asserts `proof:no-layout-animation` GREEN on the pager corpus.
- **P2 — the worm composes `useLiquidFlex`, NOT a re-rolled squish.** The squish reads the shipped
  `useLiquidFlex` (`--stretch` reciprocal, `maxStretch` live-read); a hand-rolled `1 + tanh(...)` /
  `1 + frac·(cap−1)` / a second reciprocal-scale write on the pager REDS (the W-LIQUID single-engine
  bite). Born-RED self-test: a planted `1+tanh` squish on the worm REDS.
- **P3 — the travel rides `--spring-bouncy` @ its own clock, NOT `--spring-dock`/a generic
  `--duration-*`.** The worm `transition`/drive reads `var(--pager-worm-spring, var(--spring-bouncy))`
  @ `var(--pager-worm-duration, var(--spring-bouncy-duration))` (the per-spring clock, motion-canon
  P4). A worm on `--spring-dock` (the tame current register) or a generic `--duration-normal` REDS.
  Born-RED self-test: a worm on `--duration-normal` REDS.
- **P4 — the goo layer is OPAQUE + the filter is STATIC + `@supports`-gated.** The `.pager-goo-layer`
  shapes paint full-alpha `currentColor` (the opaque-layer technique — NO per-dot translucent alpha
  inside the filter); the layer translucency is `--pager-goo-layer-opacity` at the LAYER; the goo
  filter reuses the `morph-bridge.css` trick (`feGaussianBlur`+`feColorMatrix`,
  `color-interpolation-filters="sRGB"`) and is referenced via `filter: var(--pager-goo-filter)`; the
  layer is wrapped in `@supports (filter: url(#x))` with a plain-worm floor. An ANIMATED `stdDeviation`
  / `feColorMatrix` values (the Safari trap) REDS; a translucent shape INSIDE the filter REDS; a goo
  layer with no `@supports` gate / no plain-worm floor REDS. Born-RED self-test: a planted
  `stdDeviation` animation REDS; a translucent goo shape REDS.
- **P5 — PRM snaps + drops the goo + keeps the fade.** A recipe-local `@media (prefers-reduced-motion:
  reduce)` block: the worm transform transition is dropped (snap), the `useLiquidFlex` squish
  early-returns (`--stretch`=1), the `.pager-goo-layer` is `display:none`, the color/opacity fade
  survives. A PRM arm that animates the worm transform / keeps the goo layer / drops the active-state
  fade REDS. Born-RED self-test: a PRM arm with no goo-drop REDS.
- **P6 — landed ONCE in PagerDots; the consumers inherit; the fences hold.** The worm lives in
  PagerDots (the ONE home); DeckPager carries ZERO worm re-implementation (composes via
  `pattern="group"`); the `pagerWindow` oracle is NOT re-forked (no third copy — the deck-boundary
  fence); the 24px hit-box + the aria register split + the focus-survival are byte-kept; the worm +
  goo layer are `aria-hidden` (no role). A DeckPager-local worm fork / a third `pagerWindow` copy / a
  role on the worm REDS. Born-RED self-test: a synthetic DeckPager-local worm fork REDS.

**Self-test bites (each planted defect MUST red):** (a) a surviving `transition: width` on a pager
paint element → P1 RED; (b) a hand-rolled `1+tanh` squish on the worm → P2 RED; (c) a worm on
`--spring-dock`/`--duration-normal` → P3 RED; (d) an animated `stdDeviation` / a translucent shape
inside the filter / a goo layer with no `@supports` floor → P4 RED; (e) a PRM arm with no goo-drop →
P5 RED; (f) a DeckPager-local worm fork / a third `pagerWindow` copy / a role on the worm → P6 RED.

**What reds on the pre-fix tree:** P1 (the current width/height transition — born-RED), P3 (the
current `--spring-dock` register, not `--spring-bouncy`). Extend-vs-new: NEW `proof:pager-goo`.
`proof:no-layout-animation` (the worm is the FIX) + `proof:safari-stacking`/the Safari-filter-floor
gate (the `@supports`-gate + the static filter) cross-asserted GREEN.

## The binding π — tests-visual/pager-goo.spec.ts (both modes, Chromium + WebKit, LIVE MOTION)

VISUAL wave → a `proof:ba-gestalt` navigation-band verdict + a captured DELTA, both modes ×
desktop+mobile, **Chromium + the webkit project** (the Safari goo-filter is the load-bearing risk —
Safari-first §8). GREEN at THIS wave's OWN close ("rides W-REFLECT" FORBIDDEN — `proof:pi-author`
reds it). **LIVE MOTION** (never `reducedMotion` for the morph arm); a FRAME-SERIES capture (the
worm in flight), a `getComputedStyle` readback, + a `surface-hash` floor on `PagerDots.vue` /
`morph-bridge.css` / `scheme-motion.css`.

- **THE WORM STRETCHES mid-travel (the load-bearing paint).** Mount a `<PagerDots count=5>` at
  `:5199`; select dot A→B; capture a FRAME-SERIES across the 0.57s travel. The mid-flight frames show
  the worm's painted silhouette SPANNING both dot centers (an elongated capsule, `lenRatio > 1`,
  measured via the painted bounding box / a pixel-width scan at the midpoint frame) — STRICTLY longer
  than a resting pip, NOT a constant-length pill (the rejected read is born-FAIL — a rigid translate
  never elongates). The peak length frame bridges A↔B.
- **THE DOTS MERGE (the goo neck).** At the mid-flight frame the worm + the bridged dot read as ONE
  connected silhouette (a pixel-connectivity scan across the gap finds a SOLID neck above the goo
  threshold — no transparent gap between the worm and the dot it bridges). As the worm contracts, the
  source-dot neck RELEASES (the gap re-opens, the source dot pinches off to a free pip). The merge is
  the binding goo-morph read.
- **IT SETTLES (the spring overshoot).** The travel frame-series shows the worm OVERSHOOTING the
  target dot center (~+12.6%, the `--spring-bouncy` overshoot) then settling back onto it — the
  position curve is non-monotonic (the spring rebound), NOT a linear ramp.
- **PRM-INSTANT (the carve).** Under `prefers-reduced-motion: reduce`: the active change is INSTANT
  (the worm snaps to B — no intermediate stretch frame, the frame-series is a single discrete change),
  the `.pager-goo-layer` is `display:none` (the dots read plain), the color/opacity fade survives
  (the active dot is still indicated — correctness preserved). A reduce arm that paints a stretch
  frame / keeps the goo blur FAILS.
- **BOTH ENGINES — the Safari goo holds OR floors.** On the **webkit project**: the goo layer renders
  the merge (the `will-change`-promoted layer forces the re-raster — WebKit #184601 cleared) OR the
  `@supports` gate has dropped to the plain transform worm (the floor — still a STRETCHING worm, just
  no neck). EITHER is a PASS (the goo is progressive enhancement); a STALE/BLANK filter frame (the
  un-mitigated #184601) FAILS.
- **The ≥2-consumer proof.** The SAME morph is captured on the carousel `<PagerDots pattern="tabs">`
  AND the DeckPager `pattern="group"` route — both inherit the worm from the ONE PagerDots home (the
  no-re-implementation fence confirmed in paint).
- **The captured DELTA** at `docs/tranches/BD/audit/visual/W-PAGER-GOO-MORPH-DELTA.md` — the worm
  frame-series (rest → stretch → bridge → contract → land), the goo-neck connectivity scan, the
  overshoot position curve, the PRM single-change, the carousel + DeckPager parity, both engines,
  both modes.

## The gestalt row

**BD-union-roster surface: `pager-goo-morph` (the liquid-weight navigation verdict).** The verdict
requirement: a FRESH whole-page both-mode `:5199` FRAME-SERIES capture of a pager selecting A→B,
NEVER `reducedMotion`, surface-hash floor, the worm frame-series + the goo-neck connectivity,
BOTH Chromium + WebKit. The gestalt judgement: the dot indicator **GOO-MORPHS** from one dot to the
next — it visibly STRETCHES across the gap (an elongated worm bridging both dot centers), the dots
MERGE into it with a liquid metaball neck, it OVERSHOOTS + SETTLES with spring weight, and it reads
**FAR more liquid + squishy than a subtle traveling pill** (the user's hard floor — a constant-length
pill slide is born-FAIL). Born-FAIL on HEAD (the current per-dot width transition is the rejected hop).
GREEN at its OWN close; W-REFLECT re-confirms on fresh pixels. Wired into the union roster by
W-GESTALT-WIRE. **This is the FLAGSHIP instance of W-LIQUID-ENTRANCE-GENERAL's universal law** — the
acceptance lens the whole liquid-weight band is judged against.

## Jubilance

- **FLOOR — the dots GOO-MORPH.** The active indicator stretches across the gap, the dots melt into
  it with a metaball neck, it overshoots + settles — the EXTANT Google-deck liquid dot morph, FAR
  more liquid than a subtle pill. The user's binding bar, met.
- **FLOOR — the merge tracks the stretch for FREE.** The goo necks deepen at peak stretch (the
  most-liquid frame) + release on contract — no second clock, the filter is static, ONE scalar.
- **FLOOR — the P5 violation is FIXED.** The per-dot width/height layout animation becomes a
  compositor `scale` over a reserved footprint — `proof:no-layout-animation` GREEN on the pager.
- **OPT-IN — the calm-deck retune.** A consumer re-points `--pager-worm-spring: var(--spring-snappy)`
  for a crisper, less-bouncy deck (the cascading-token idiom, no fork).
- **OPT-IN — the consumers inherit.** DeckPager + the carousel get the goo-morph for FREE (the
  one-home discipline — ≥2 consumers by construction).

## Fences

1. **NO new spring family** — the worm rides `--spring-bouncy` (a shipped `SPRING_PRESETS` row); the
   W-GLASS-CAL spring fence holds (P3).
2. **NO second squish engine** — the worm composes `useLiquidFlex`; the W-LIQUID single-engine fence
   holds (no re-rolled `tanh`/reciprocal — P2).
3. **NO second goo filter** — the worm reuses the `morph-bridge.css` blur-then-alpha-threshold trick;
   the filter is STATIC (the Safari trap — P4).
4. **NO third windowing oracle** — the `pagerWindow` math is the ONE oracle (the deck-boundary fence;
   no third copy — P6).
5. **NO DeckPager re-implementation** — the worm lands ONCE in PagerDots; DeckPager inherits via
   `pattern="group"` (P6).
6. **COMPOSITOR-ONLY** — transform+scale+opacity+filter; the elongation is `scale` over a reserved
   footprint, NEVER an animated `width` (the P5 fix — `proof:no-layout-animation` library-wide).
7. **PRM keeps the fade, drops the transform + the goo** — the pager still functions under reduce
   (correctness preserved — P5).
8. **Safari** — `@supports`-gated goo with the plain-worm floor, `will-change`-promoted layer
   (WebKit #184601 cleared), STATIC filter, `filter` not `backdrop-filter`, sRGB filter
   interpolation, tight-boxed region (P4 / §8).
9. **The `--pager-dot-*` token surface PRESERVED** — the worm adds `--pager-worm-*`/`--pager-goo-*`
   beside the kept dot tokens; the consumer retint seam (`slides` → `--ncsu-red`) is untouched.
10. **The a11y register byte-kept** — the worm + goo layer are `aria-hidden` (no role); the 24px
    hit-box + the `pattern` aria split + the focus-survival are unchanged.

## Disposition links

- **COMPOSES** — `useLiquidFlex` (the squish) + the `--spring-bouncy` `SPRING_PRESETS` row (the
  travel) + the `morph-bridge.css` SVG-goo trick (the merge) + the `pagerWindow` oracle (the
  windowing) + the `useTabIndicator` travel SHAPE (the center-anchored glide + release-at-arrival) —
  re-authors NONE.
- **CONSUMES** — W-LIQUID-ENTRANCE-GENERAL's universal liquid-weight law (this is its FLAGSHIP pager
  instance — the acceptance lens it is judged against).
- **MINTS** — `proof:pager-goo` + `tests-visual/pager-goo.spec.ts` + the `.goo-worm`/`.pager-goo-layer`
  worm + opaque-goo-layer in PagerDots + the `#pager-goo` hidden-SVG filter + the `--pager-worm-*` /
  `--pager-goo-*` tokens + `docs/tranches/BD/audit/visual/W-PAGER-GOO-MORPH-DELTA.md`.
- **BUILD-SPEC** — `docs/tranches/BD/viz/goo-morph/BUILD-SPEC.md` (the exact mechanism the builder
  implements from).
