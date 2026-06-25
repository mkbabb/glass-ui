# BD.W-LIQUID-ENTRANCE-GENERAL — the UNIVERSAL liquid-weight law: ALL motion carries inertia · weight · bounce · squish

**Band 17 (liquid-weight) · Tier T5 · depends: CODIFIES the shipped motion spine — the `--spring-*` `SPRING_PRESETS` (`springPresets.ts` / `scheme-motion.css`), `useLiquidFlex` (the squish), `useSpringPress`/`useLiquidPress` (the press), `useLiquidReveal` (the bloom), `useDragMorph` (the pull), the `.scroll-build`/`.scroll-cascade`/`.smooth-scroll` register (`scroll-choreography.css`), the `proof:no-layout-animation` + the motion-canon (`docs/precepts/motion-canon.md` P1-P6) · the LAW every Band-17 wave CITES · DOWNSTREAM (the instances): W-PAGER-GOO-MORPH (the FLAGSHIP — the goo-morph dots), W-LIQUID-GROW-ON-EVENT, W-SCROLL-FLUIDITY, W-STORY-PAGE-STANDARD (the sub-card entrance), W-TABS-LIQUID, W-TAB-IOS-CAPSULE, and every entrance/exit/move/scroll surface in the tranche · cite `feedback_liquid_weight_universal`**

## The defect / the ask

The BINDING LAW (`feedback_liquid_weight_universal`, the user 2026-06-23, "Remember this always"):

> **MOST items + transitions in general should have INERTIA, WEIGHT, BOUNCE, and LIQUID-GLASS
> facility/quality — and ALL scrolling + movement in general should have inertia + liquid weight.**
> Nothing snaps; everything settles with spring physics + liquid deformation. The pager/deck dots
> must GOO-MORPH from one to another (the active indicator MERGES/STRETCHES like the goo-blob
> metaball as it travels — not a hard hop). This is "the principles of animation" applied
> UNIVERSALLY.

The iOS-27 Liquid Glass north star is not just the optical composite (blur/tint/rim/catch-light) —
it is the MOTION: things move with MASS and SQUISH. A flat fade or a linear translate reads as
CHEAP; a spring-with-overshoot + a volume-preserving squish reads as ALIVE / liquid. The library
already SHIPS the primitives (`useLiquidFlex` squish, `useDragMorph`, `useSpringPress`, the
`--spring-*` presets, `useLiquidReveal`, the goo-blob metaball `smin`, the `.scroll-*` choreography);
**the gap is GENERALIZATION** — apply them EVERYWHERE, not a scattered subset — plus the goo-morph
pager dots (W-PAGER-GOO-MORPH).

The current state is a PATCHWORK: some surfaces spring (the dock morph, the tab indicator, the
liquid-reveal overlays), but MANY still snap or linear-translate (the pager dots hop on a width
transition; ad-hoc entrances linear-fade; some scrolls have no inertia register). There is no ONE
binding LAW that says "every motion carries weight" and no acceptance LENS the gestalt bar judges
against. This wave codifies the law + extends it to ALL transitions + scrolling, and wires it as a
binding W-REFLECT/gestalt acceptance lens.

## Starting state (HEAD, verified on disk)

- `docs/precepts/motion-canon.md` (READ) — P1-P6 (spring-iff-spatial / enter-bouncy-exit-no-overshoot
  / fade-coupled-to-transform / per-spring-clock / compositor-only / PRM-keeps-fade-drops-transform).
  The principle-set this wave EXTENDS into the universal liquid-weight law (P7 — the new clauses).
- `src/composables/motion/springPresets.ts` (READ) — the `SPRING_PRESETS` table: `snappy` (CONTROL,
  ~+2.0%), `bouncy` (PLAYFUL, ~+12.6%), `dock`, `smooth`, `gentle`, `press`. The enter/move registers.
- `src/composables/motion/useLiquidFlex.ts` (READ) — the ONE squish engine (the reciprocal `--stretch`,
  the `"linear"`/`"tanh"` laws, the `maxStretch` LOW cap ≈1.08 — the volume-preserving gel, NOT taffy).
- `src/composables/motion/{useSpringPress,useLiquidPress,useLiquidReveal,useDragMorph}.ts` (READ) —
  the press / bloom / pull primitives (the interruptible velocity-continuous spring, the source-rect
  bloom, the grab-follow-fling).
- `src/styles/scroll-choreography.css` (READ) — `.scroll-build` (page-build entrance, spring-clocked),
  `.scroll-cascade` (section cascade), `.smooth-scroll` (native `scroll-behavior: smooth` opt-in,
  PRM-gated, zero-runtime — the NO-Lenis/GSAP native-first fence). The scroll inertia register.
- `scripts/proof-no-layout-animation.mjs` (the shipped gate) — the compositor-only floor (the reflow
  set forbidden in `@keyframes`/`transition`/`<Transition>` library-wide). This law's P5 enforcer.
- `src/components/custom/pager-dots/PagerDots.vue:201` (READ) — **the law's most visible VIOLATION**:
  the per-dot width/height transition (the hard hop the user rejected) — the W-PAGER-GOO-MORPH FIX.
- `docs/tranches/BD/union/waves/W-PAGER-GOO-MORPH.md` (READ) — the FLAGSHIP instance (the goo-morph
  dots) + `docs/tranches/BD/viz/goo-morph/BUILD-SPEC.md` (the mechanism).
- `docs/tranches/BD/union/waves/W-STORY-PAGE-STANDARD.md:16,37` (READ) — references this wave as the
  sub-card-entrance dependency (the law is already cited as a dependency across the band).

## The mechanism — codify the law (P7) + extend it to ALL transitions + scrolling

This wave does TWO things: (1) CODIFY the universal liquid-weight law as a binding precept clause
(P7, appended to `motion-canon.md`) + a gate, and (2) EXTEND it — the existing surfaces that still
snap/linear-move adopt the spring + squish + fade-coupling, and ALL scrolling carries the inertia
register. It mints NO new primitive (every leaf is shipped) — it GENERALIZES.

### 1. The law (P7 — appended to `motion-canon.md`, the binding precept)

**P7 — UNIVERSAL LIQUID WEIGHT. Every motion/transition/scroll carries inertia + weight + (for
enters/emphatic moves) bounce + a volume-preserving squish. Nothing snaps; everything settles.**
Five sub-clauses (each gate-checkable):

- **P7a — SPRING, never linear/snap.** Every position/size/morph transition rides a `--spring-*`
  `linear()` clock (the spring physics baked into a timing function) on its OWN
  `--spring-*-duration` (the per-spring clock, P4) — NEVER a bare `linear`/`ease`/`ease-in-out` on a
  SPATIAL channel, NEVER a `transition: none` snap on a move (the discrete reclaim allowlist is the
  ONLY exception — the reka collapse, the one-shot user reflow). A SPATIAL transition with a
  non-spring timing function REDS.
- **P7b — ENTER bouncy, EXIT no-overshoot (the P2 generalization).** Enters/mounts/emphatic moves
  ride `--spring-bouncy`/`--spring-snappy` (the overshoot IS the bounce + weight); exits/closes ride
  the no-overshoot `--ease-out`/`--ease-standard` (an exit must never overshoot past gone). The
  audacious display register NEVER bounces (the no-overshoot `--ease-out`, the gravity-arrival).
- **P7c — SQUISH on travel/press (the volume-preserving gel).** A move/press/morph that deforms pairs
  the reciprocal `useLiquidFlex` squish (the long axis grows ⟺ the short axis pinches), capped LOW
  (≈1.08 — the gel, not taffy). The squish is the ONE engine (`useLiquidFlex`) — no second
  `tanh`/`1+frac·(cap−1)` write (the W-LIQUID single-engine fence).
- **P7d — FADE coupled to transform (the P3 generalization).** Every entrance/exit couples the
  opacity/color fade (EFFECTS leg, bezier) with the transform (SPATIAL leg, spring) — ONE continuous
  layer, not a fade-then-move desync. A color cross-fade on a spring (which reads as a wobble) REDS.
- **P7e — SCROLL carries inertia (the native-first fence).** All scrolling carries the inertia
  register — the native `.smooth-scroll` (`scroll-behavior: smooth`, PRM-gated, zero-runtime) +
  the `.scroll-build`/`.scroll-cascade` choreography on a `--spring-*` clock. **NOT Lenis/GSAP/
  Locomotive** (the native-first fence is binding — a 20-40KB JS momentum runtime the identity
  REFUSES; a consumer adds momentum in THEIR app, presets-in-consumers). The route scroller opts into
  `.smooth-scroll`; the feel is inertial via the native primitive.

All of P7 is COMPOSITOR-ONLY (P5 — transform+opacity+filter, never a layout property) + PRM-carved
(P6 — keep the fade, drop the transform + the squish + the bounce; the surface still functions) +
Safari-verified (the `linear()` curves are Baseline 17.2+; the `filter` blur-settle rides the
surface's OWN pixels not `backdrop-filter` — W-LIQUID-REVEAL).

### 2. The extension — the snapping surfaces adopt the law (the instances)

The DOWNSTREAM instance waves each adopt P7 on their surface (this wave is the LAW + the lens; the
instances do the per-surface build):

- **W-PAGER-GOO-MORPH (the FLAGSHIP)** — the pager/deck dots goo-morph: the worm stretches + the dots
  merge + it overshoots + settles on `--spring-bouncy`, the goo neck via the `morph-bridge.css`
  filter. The most visible instance of the law + the FIX for the most visible violation (the per-dot
  width hop). **This wave's gestalt lens is JUDGED against the pager** — if the dots goo-morph, the
  law is met; if they hop, the band FAILS.
- **W-LIQUID-GROW-ON-EVENT** — surfaces grow/bloom on event with the spring + squish.
- **W-SCROLL-FLUIDITY** — the scroll inertia register adopted on the route scrollers (P7e).
- **W-TABS-LIQUID / W-TAB-IOS-CAPSULE** — the tab capsule indicator on the spring + squish.
- **W-STORY-PAGE-STANDARD** — the sub-card entrance (the `.scroll-build`/`.scroll-cascade` + the
  squish/morph/fade on the glassy sub-cards).
- Every other entrance/exit/move in the tranche threads P7 (the law is the default, the snap is the
  exception that must justify itself on the discrete-reclaim allowlist).

### 3. The acceptance LENS (the binding W-REFLECT/gestalt bar)

P7 is a BINDING acceptance lens for the BD tranche's W-REFLECT/gestalt: **a surface that
snaps/hops/linear-moves on a SPATIAL channel FAILS the liquid-weight bar.** The gestalt roster
(`W-GESTALT-WIRE`) carries the `liquid-weight` lens — every motion surface is judged: does it carry
inertia + weight + (where appropriate) bounce + squish, or does it snap? The pager goo-morph is the
canonical PASS; a constant-length pill slide / a linear fade / a width-transition hop is the
canonical FAIL.

This is NOT a re-fork — it CODIFIES the shipped motion spine + GENERALIZES it. It mints NO new spring
family, NO new squish engine, NO new scroll runtime — it appends the law to `motion-canon.md`, adds
the gate, and the instances adopt it. The existing motion primitives are BYTE-UNTOUCHED (this is the
LAW that says use them everywhere, not a primitive change).

## The gate — proof:liquid-weight-law (NEW, L1-L6), born-RED → GREEN

`scripts/proof-liquid-weight-law.mjs`, `["local","ci","release"]` (the source-structure + precept
arm; the binding PAINT is the per-instance π + the gestalt lens). The detector comment-strips first +
exports a pure detector for the self-test bites.

- **L1 — P7 is CODIFIED in `motion-canon.md`.** The precept carries the P7 universal-liquid-weight
  clause (P7a-P7e) with the spring/enter-exit/squish/fade-coupling/scroll-inertia sub-clauses + the
  native-first scroll fence. A `motion-canon.md` missing the P7 clause REDS (born-RED — P7 is the new
  clause). Cross-asserts `proof:precept-current` (the canon cannot fall behind the cascade).
- **L2 — no SPATIAL transition on a non-spring timing function (P7a/P7b).** The detector scans the
  library's `transition`/`<Transition>` recipes for a SPATIAL channel (`transform`/`translate`/
  `scale`/`rotate`/size-morph) on a bare `linear`/`ease`/`ease-in-out`/`ease-in` (a non-spring,
  non-`--ease-out`-exit timing) — a snap/linear move REDS (off the discrete-reclaim allowlist).
  Born-RED self-test: a planted `transition: transform 0.3s linear` REDS.
- **L3 — the squish is the ONE engine (P7c).** Every reciprocal-squish write reads `useLiquidFlex`
  (the `--stretch` reciprocal, the LOW cap); a hand-rolled `1+tanh`/`1+frac·(cap−1)`/a second
  reciprocal-scale write REDS (the W-LIQUID single-engine bite). Born-RED self-test: a planted second
  squish write REDS.
- **L4 — scroll carries the native inertia register, NO JS momentum lib (P7e).** The route scrollers
  carry the `.smooth-scroll`/`.scroll-build`/`.scroll-cascade` register; the dependency graph carries
  ZERO `lenis`/`gsap`/`locomotive-scroll`/`@studio-freight` (the native-first fence). A
  `lenis`/`gsap` import / a hand-rolled rAF momentum loop REDS. Born-RED self-test: a planted
  `import … from "lenis"` REDS.
- **L5 — COMPOSITOR-ONLY + PRM-carved (P5/P6).** Every P7 motion is transform+opacity+filter (cross-
  asserts `proof:no-layout-animation` GREEN library-wide); every P7 surface carries the PRM carve
  (keep-fade / drop-transform+squish+bounce; the surface still functions). A P7 surface with no PRM
  carve / a layout-property animation REDS. Born-RED self-test: a P7 surface missing the PRM arm REDS.
- **L6 — the gestalt LENS is wired + the FLAGSHIP is GREEN.** The `liquid-weight` lens is in the
  union gestalt roster (`W-GESTALT-WIRE`); the FLAGSHIP instance (W-PAGER-GOO-MORPH) is GREEN at its
  close (the pager goo-morphs — the canonical PASS). A `liquid-weight` lens absent from the roster /
  the flagship pager still hopping REDS. Born-RED self-test: a synthetic snapping pager fails the lens.

**Self-test bites (each planted defect MUST red):** (a) `motion-canon.md` missing P7 → L1 RED;
(b) a `transition: transform 0.3s linear` SPATIAL snap → L2 RED; (c) a hand-rolled `1+tanh` squish →
L3 RED; (d) an `import … from "lenis"` / a rAF momentum loop → L4 RED; (e) a P7 surface with no PRM
carve / a layout-property animation → L5 RED; (f) a snapping pager failing the lens → L6 RED.

**What reds on the pre-fix tree:** L1 (P7 not yet in `motion-canon.md`), L6 (the flagship pager still
hops — the W-PAGER-GOO-MORPH FIX). Extend-vs-new: NEW `proof:liquid-weight-law` (it CROSS-asserts the
shipped `proof:no-layout-animation` + `proof:precept-current`, it does not duplicate them).

## The binding π — the per-instance frame-series + the gestalt lens (both modes, Chromium + WebKit)

This wave is the LAW + the LENS; its binding PAINT is the FLAGSHIP instance π + the gestalt-lens
wiring (the per-surface π live on the instance waves). A `proof:ba-gestalt` `liquid-weight` lens
verdict + the flagship DELTA, both modes × desktop+mobile, Chromium + WebKit. GREEN at THIS wave's
OWN close ("rides W-REFLECT" FORBIDDEN). LIVE MOTION.

- **The flagship — the pager goo-morphs (W-PAGER-GOO-MORPH's π, cross-asserted here).** The dot
  indicator STRETCHES across the gap + the dots MERGE + it OVERSHOOTS + SETTLES (the frame-series
  proof) — the canonical PASS of the universal law. A constant-length pill slide is the canonical
  FAIL.
- **The lens is wired.** The `liquid-weight` lens is in the union gestalt roster; a sampling of motion
  surfaces (the pager, a tab indicator, a card entrance, a route scroll) each read as spring-weighted
  (non-linear position curves, the overshoot rebound, the squish deform) — NOT a linear ramp / a
  snap. The lens FAILS a surface that snaps.
- **PRM-INSTANT.** Under reduce, every sampled surface snaps to its endpoint (the fade survives, the
  transform + squish + bounce drop) — the surfaces still function.
- **BOTH ENGINES.** The `linear()` spring curves + the squish render on the webkit project (Baseline
  17.2+); the scroll inertia register is native (no JS lib).
- **The captured DELTA** at `docs/tranches/BD/audit/visual/W-LIQUID-ENTRANCE-GENERAL-DELTA.md` — the
  P7 clause excerpt, the flagship pager goo-morph frame-series, the sampled-surface spring-curve
  readbacks, the PRM single-change, the no-JS-momentum dependency proof, both engines, both modes.

## The gestalt row

**BD-union-roster surface: `liquid-weight` (the universal-law acceptance LENS).** The verdict
requirement: a FRESH whole-page both-mode `:5199` capture sampling the tranche's motion surfaces
(the pager, the tabs, the card entrances, the route scroll), NEVER `reducedMotion`, surface-hash
floor, BOTH Chromium + WebKit. The gestalt judgement: EVERY motion surface carries INERTIA + WEIGHT +
(where appropriate) BOUNCE + SQUISH — nothing snaps, everything settles with spring physics + liquid
deformation; the pager dots GOO-MORPH (the flagship). A surface that snaps/hops/linear-moves on a
SPATIAL channel FAILS the lens. Born-FAIL on HEAD (the pager hops; some surfaces linear-move). GREEN
at its OWN close (P7 codified + the flagship green + the lens wired); W-REFLECT re-confirms on fresh
pixels across the whole tranche. Wired into the union roster by W-GESTALT-WIRE.

## Jubilance

- **FLOOR — the law is ONE binding clause.** P7 in `motion-canon.md` — every wave CITES it instead of
  re-deriving "does this need a spring." The scattered motion doctrine is codified.
- **FLOOR — nothing snaps.** Every entrance/exit/move/scroll carries inertia + weight + (where
  appropriate) bounce + squish — the iOS-27 alive/liquid read, universally.
- **FLOOR — the flagship goo-morphs.** The pager dots are the canonical PASS — FAR more liquid than a
  subtle pill (the user's hard floor, met + made the acceptance lens).
- **FLOOR — the native-first scroll fence holds.** Inertial scrolling via the native `.smooth-scroll`
  + `.scroll-*` register — NO Lenis/GSAP (the identity refuses the JS runtime).
- **No OPT-IN motion jubilance of its own** — this wave is the LAW; the per-surface delight lives on
  the instance waves.

## Fences

1. **NO new primitive** — P7 GENERALIZES the shipped motion spine (the `--spring-*` presets,
   `useLiquidFlex`, the `.scroll-*` register); it mints no spring family, no squish engine, no scroll
   runtime (L1-L5).
2. **NO Lenis/GSAP/Locomotive** — the native-first scroll fence is binding (the consumer adds momentum
   in their app, presets-in-consumers — L4).
3. **NO second squish engine** — `useLiquidFlex` is the ONE engine (the W-LIQUID fence — L3).
4. **COMPOSITOR-ONLY + PRM-carved** — every P7 motion is transform+opacity+filter, PRM keeps the fade
   + drops the rest; the surface still functions (L5 / `proof:no-layout-animation`).
5. **The motion primitives are BYTE-UNTOUCHED** — this is the LAW that says use them everywhere, not a
   primitive change.
6. **The discrete-reclaim allowlist is the ONLY snap exception** — a genuine one-shot user reflow (the
   reka collapse) is allowlisted; a per-frame/per-move snap is NOT (L2).
7. **The audacious display register NEVER bounces** — the no-overshoot `--ease-out` gravity-arrival
   (P7b — the type-arrives-with-gravity discipline).

## Disposition links

- **CODIFIES** — the shipped motion spine (`--spring-*` `SPRING_PRESETS`, `useLiquidFlex`,
  `useSpringPress`/`useLiquidPress`/`useLiquidReveal`/`useDragMorph`, the `.scroll-*` choreography,
  `proof:no-layout-animation`, `motion-canon.md` P1-P6) — re-authors NO primitive; appends P7 + the
  gate.
- **CITED BY (the instances)** — W-PAGER-GOO-MORPH (the FLAGSHIP), W-LIQUID-GROW-ON-EVENT,
  W-SCROLL-FLUIDITY, W-TABS-LIQUID, W-TAB-IOS-CAPSULE, W-STORY-PAGE-STANDARD, + every entrance/exit/
  move/scroll surface in the tranche.
- **MINTS** — `proof:liquid-weight-law` + the P7 clause in `docs/precepts/motion-canon.md` + the
  `liquid-weight` gestalt lens (via W-GESTALT-WIRE) +
  `docs/tranches/BD/audit/visual/W-LIQUID-ENTRANCE-GENERAL-DELTA.md`.
- **cite** — `feedback_liquid_weight_universal` (the user's standing animation law).
