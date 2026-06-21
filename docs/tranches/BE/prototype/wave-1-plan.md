# Liquid-dock prototype — wave 1

## Plan
## VERIFIED SUBSTRATE (all on disk, line-confirmed)

- `dockMorphContext.ts` (498L) — ONE `SpringProgress` on `DOCK_SPRING` (response 0.32/ζ0.7), `play()`s ONE rAF loop writing `--dock-morph-t` once/frame to the root (:276-289); `inheritedVelocity = spring.velocity` carried into a fresh spring on re-arm (:255-256, the iOS interruptible re-base); `prefersReducedMotion()` probe (:179); `settleTarget`/`seatTargetSync` synchronous PRM seat; `MorphTarget` registry `Set` + `addTarget` (:434). **This is the engine to CLONE, never edit (box-inviolate fence).**
- `dockMorphMeasure.ts` (354L) — exports `dimOf(axis)`/`morphAxisProp(axis)` (the cross-axis/morph-axis idioms the arbitrary-angle vector reuses).
- `morph-bridge.css` (159L) — the merge-2-plate SVG-goo: a `--vertical` plate (:109) + `--horizontal` plate (:133) neck toward ONE shared center via `clip-path: inset(... round 999px)` interpolated on `--dock-morph-t`, volume-squish on `--stretch`, `contain: layout paint` (:59), `will-change: clip-path,transform,opacity` (:98), PRM hides the bridge (:154). **Currently H/V-axis-ONLY — the inset is hardcoded to block-axis (vertical) and inline-axis (horizontal). This is what generalizes to angle θ.**
- `useLiquidReveal.ts` (259L) — composes kf `ElementMorph(settledRect, triggerRect)` driven 1→0 by `springTimingFunction({response,dampingFraction})`, three coupled channels (transform/opacity/`filter blur`), compositor-only, PRM snaps to settled+opacity1. `springPreset(name)` from `springPresets.ts`. **This IS the dock→card bloom — reused as-is.**
- `useLiquidFlex.ts` (206L) — pure projection: `drive(t)` → `size` span + `stretch` (`1+tanh(|Δt|·k)·(max−1)`, capped LOW ≈1.08), `squishLaw:"tanh"|"linear"`. No spring/rAF/element. **The squish for the goo neck swell.**
- `useDockCtaReceive.ts` (15.4KB) — `ElementMorph(ctaRect, dockControlRect)` forward 0→1 fly+reshape+fade+`filter blur 0→4px`+`onReceived` hand-off; `setPending()`/`clearPending()` seat-reserve. **The fly-onto-foreign-target hand-off the union/rail-fusion reuses.**
- `springPresets.ts` — `SPRING_PRESETS` table: dock(0.32/0.7), snappy(0.42/0.78), bouncy(0.5/0.55), press(0.15/0.86). `springPreset(name)` lookup. **No new spring family minted — reuse `dock`.**
- `DockStack.vue` (176L, `BC.W-DOCK-STACK-RAIL`) — the macOS hover-FAN stack rail over the `.glass-dock-frame` non-clipping escape, box-inviolate, `useOptionalDockContext()` degrades standalone (:75-76), `v-model:selected` one-registry, `HOVER_INTENT_MS` hysteresis reused, `<FadingScroll>` n-stack port. **The carousel-WRAP rail is a THIRD render-mode on THIS engine — NOT a new rail SFC (the `proof:dock-stack-rail` retire-bite forbids `DockRail.vue`/`LiquidRail.vue`).**
- `property-regs.css §18` — `@property` block shape confirmed (`syntax:"<number>"; inherits:true; initial-value:...`). `--dock-split-t`/`--liquid-morph-t`/`--liquid-rail-t` register here, the `--dock-morph-t`/`--glass-level` precedent so the scalar INTERPOLATES.
- BE specs: `BE.W-DOCK-FISSION.md` (the n-ary detach orchestrator — the playground's core engine is its generalized form), `BE.W-GOO-SPLIT-PERF` (generalizes morph-bridge→fission-bridge + library `<filter>` mount), `BE.W-DOCK-RAIL-REALIZE`, `BE.W-LENS-SAFARI`. **`useDockFission`/`useLiquidRail` do NOT yet exist on disk — confirmed absent (born-RED anchors). The playground is the EVOLUTION these specs point at.**
- Demo chassis: `StoryPage.vue` (`variant="hero"|"page"` off `story.hero`, `heroScale` rung, `.story-hero-shrink` sticky scroll-shrink register, `.scroll-cascade` body build), `StoryHero.vue`, `StoryHeader.vue`. Stories register one row in `manifest.ts` (`"dock/<id>": "@mkbabb/glass-ui/dock"`). The 8 dock stories live in `demo/stories/dock/`.

---

## THE FILE PLAN

### (1) Core engine — `useLiquidMorph` (the generalized fission/morph/union driver)
**Path: `src/components/custom/dock/composables/useLiquidMorph.ts`** (dock-family, keyframes-BEARING via `SpringProgress` → ships `/dock` subpath, OFF root barrel — the `useDockCtaReceive`/`useDockState` precedent).

It is the **generalization of `useDockFission`** (BE.W-DOCK-FISSION is a special case): n-ary SPLIT/MORPH/UNION at an arbitrary angle θ, vertical OR horizontal, plus the dock→card expand.

**COMPOSES (no re-fork):**
- CLONES the `dockMorphContext.ts:234-290` loop SHAPE (not edits it): ONE `SpringProgress` on `DOCK_SPRING` via `springPreset("dock")`, ONE `play()` rAF loop writing `--liquid-morph-t` once/frame to the host root. `inheritedVelocity` re-base on re-toggle (interruptible). `prefersReducedMotion()` branch seats synchronously.
- Per-piece registry mirrors the `Set<MorphTarget>` pattern; each piece carries a **VECTOR descriptor** not a size span: `{ angle: number /*radians, atan2(dy,dx)*/, rank: number, distance: number, profile: LiquidMorphSignature }`.
- `useLiquidFlex({squishLaw:"tanh", maxStretch})` → `--stretch` per piece (the bud-off swell).
- For the **dock→card EXPAND**: composes `useLiquidReveal(cardRef, {trigger: dockPillRef, preset:"bouncy"})` — the FLIP bloom from the pill rect onto the settled card rect + a footprint RESERVE (scale, never width — the `useLiquidFlex.sizeStyle` one-time reserve, then `transform` per frame).
- For **UNION/hand-off** (a piece fuses ONTO a foreign target — the rail fusion): composes `useDockCtaReceive`'s `ElementMorph(pieceRect, targetRect)` + `onReceived`.

**API:**
```ts
export type LiquidMorphMode = "split" | "union" | "expand";
export interface LiquidMorphSignature {
  vector: "radial" | "lateral" | "inward" | "directed"; // directed = explicit θ
  neckHold: number;          // when the goo neck snaps (0.4 tense → 0.7 long-tail)
  staggerRank: (i:number, n:number) => number;
  squishPeak: "late" | "long" | "coalesce";
}
export interface UseLiquidMorphOptions {
  rootEl: Ref<HTMLElement|null>;        // the host (a card OR a dock) carrying the scalar
  signature?: LiquidMorphSignature;     // default = radial
  spring?: SpringPresetName;            // default "dock" — NO new family
  maxStretch?: number | (()=>number);
}
export interface LiquidMorphPiece {
  el: Ref<HTMLElement|null>;
  angle?: number;       // explicit θ (radians) for "directed"; else derived from center-delta
  rank?: number;
  release(): void;
}
export interface UseLiquidMorphReturn {
  registerPiece(p: Omit<LiquidMorphPiece,"release">): LiquidMorphPiece;
  split(): void;        // 0→1
  union(): void;        // 1→0 (the SAME loop, reversed — bidirectional floor)
  expand(opts:{ card: Ref<HTMLElement|null>; trigger: Ref<HTMLElement|null> }): void; // useLiquidReveal bloom
  collapse(): void;     // the card→pill conceal
  readonly t: Readonly<Ref<number>>;
}
```
**The arbitrary-angle goo** = for each piece, write `--split-dx = cos(θ)`, `--split-dy = sin(θ)` (θ from `signature.vector`: radial = unit (cx_i−cx_host, cy_i−cy_host); lateral = `dimOf(axis)` cross-axis; inward = negated radial; directed = explicit θ). The piece translate is `transform: translate(calc(var(--split-dx)*var(--liquid-morph-distance)*var(--liquid-morph-t)), calc(var(--split-dy)*...))`. The neck (CSS, below) reads θ to rotate the inset axis. **Box-inviolate**: the host box never changes — pieces paint in a non-clipping frame (the `.glass-dock-frame` escape precedent).

### (2) Angle-generalized goo-bridge CSS — `fission-bridge.css`
**Path: `src/styles/dock/fission-bridge.css`** (generalizes `morph-bridge.css`; per BE.W-GOO-SPLIT-PERF the morph-bridge stays for the V↔H showcase, the fission-bridge is the N-piece-off-a-vector recipe — they coexist, the playground uses fission-bridge).

The generalization of the H/V-only `clip-path: inset()` neck to angle θ: **ONE neck-capsule per piece, ROTATED to θ.** The plate reserves its MAX footprint (one layout solve), then the neck is a `clip-path: inset(<neck> ... round 999px)` applied in a **`rotate(var(--piece-angle))`-transformed local frame** so the inset always runs along the piece's LOCAL X (the travel axis) regardless of θ — the inset travel is `f(--liquid-morph-t)` exactly as morph-bridge's `--dock-bridge-*-neck` is, but the axis is θ-rotated not hardcoded block/inline. Add the **seam-tension** scalar (BE.W-DOCK-FISSION F4): `--seam-tension = clamp(0, field.velocity·k, cap≈0.12)` written once/frame; the neck inset reads `calc(--neck − --seam-tension·--seam-give)` so a fast pull THINS the neck (resist-then-snap) through the EXISTING clip channel — no new layer. The goo threshold is on **whole-GROUP alpha** (`feGaussianBlur stdDev=7` + `feColorMatrix` threshold, mounted ONCE as a library `<svg><filter>`, per BE.W-GOO-SPLIT-PERF). Warm-cream gel fill kept from morph-bridge:72-77. `will-change: clip-path,transform,opacity`, `contain: layout paint`, PRM hides the bridge. **Safari fence (BE.W-LENS-SAFARI / WebKit 245510): `filter: url(local-inline)` only, `backdrop-filter: url()` is broken — a piece is goo OR glass per-frame, swapped at a sub-perceptual `--liquid-morph-t` threshold.**

### (3) The rail carousel-stack — `useLiquidRail`
**Path: `src/components/custom/dock/composables/useLiquidRail.ts`** (dock-family, keyframes-BEARING → `/dock` subpath). **NOT a new SFC** — the carousel-WRAP is a THIRD render-MODE on `DockStack.vue` (`mode="carousel"` or `wrap?:boolean` axis), the JS in this composable. (`proof:dock-stack-rail` forbids a 4th rail SFC.)

The pure carousel-wrap-with-opacity-fade projection (no DOM, testable): for each item at slot offset `o = ((i − chosen) mod N + N) mod N`, signed to nearest, compute `{ translate: o·slotSpacing, opacity: max(minAlpha, 1 − |o|·fadeStep), scale: 1 − |o|·scaleStep }` — the x/y/z TIERS are translate+opacity layers keyed off distance-from-chosen (x=chosen offset0/op1/scale1; y=near ~0.94/0.6; z=far → fade toward minAlpha). φ-proportioned slot spacing above (golden 2x), partial peek below (wrap tail). Carousel-WRAP via negative-safe modulo. Collapsed = just-chosen (`x` alone); hover → x+y → x+y+z (reuse `HOVER_INTENT_MS` hysteresis + `useDockState` hover from DockStack). Optionally composes `SpringProgress` for the inter-slot glide; `useLiquidFlex` for the squish on scroll-snap. Edge/angle placeable: `<DockStack mode="carousel" :edge :angle>` (degrades standalone via `useOptionalDockContext`).

### (4) The playground demo SFC
**Path: `demo/stories/compositions/liquid-dock-playground.vue`** + one manifest row `"compositions/liquid-dock-playground": "@mkbabb/glass-ui/dock"` (heroTitle, hero rung). Over `<StoryPage>` — inherits the hero title + `.story-hero-shrink` scroll-shrink + `.scroll-cascade` design language. Composes the SHIPPED leaves (no demo-local re-fork): a `<DockStage>`-style live aurora backdrop so the glass reads as liquid glass. Demonstrates, all on `useLiquidMorph`: (a) **dock↔container EXPAND** — the search-pill dock blooms UP into the full Places card (ios27-ref2 f_004→f_010) via `expand()`/`collapse()`; (b) **n-ary SPLIT at arbitrary θ** — controls fission off the dock at a draggable angle-of-attack, the goo neck resisting the pull; (c) **the RAIL** — `<DockStack mode="carousel">` carousel-stack on the dock edge. The playground SUBSUMES the 8 dock stories (it is the superset surface).

---

## WAVE SEQUENCING

**WAVE 1 (the prototype — core engine + REAL proof of the two hardest claims):**
1. Register `--liquid-morph-t`, `--liquid-morph-distance`, `--seam-tension`, `--seam-give` as `@property` (`property-regs.css §18` block shape).
2. Ship `useLiquidMorph.ts` — the full generalized driver (clones the dockMorphContext loop, the vector registry, `split()`/`union()`/`expand()`/`collapse()`, composing `useLiquidReveal` for expand + `useLiquidFlex` for squish + `useDockCtaReceive` for union). Re-export from `/dock` barrel.
3. Ship `fission-bridge.css` — the angle-θ-rotated neck-capsule generalization + the library `<filter>` mount + the Safari goo-OR-glass swap + the seam-tension thin.
4. Ship the **minimal-but-REAL** `liquid-dock-playground.vue` over `<StoryPage>` proving the TWO load-bearing claims: **dock↔container expand** (pill blooms into card and collapses back, the iOS-27 hallmark) + **arbitrary-angle n-ary split** (controls fission off the dock at a draggable θ with the goo neck). This is the prototype's binding paint — both modes, the design language matched.
5. Gate `proof:liquid-morph` (born-RED→GREEN): the n-ary detach rides ONE `SpringProgress`/`DOCK_SPRING` (no new family), bidirectional (split↔union same scalar), arbitrary-angle (θ-driven not H/V-hardcoded), compositor-only (`proof:no-layout-animation` holds — every channel transform/clip-path/opacity/`--*`), `dockMorphContext.ts`/`morph-bridge.css` byte-untouched (consuming seam beside, not edit), PRM=instant. Self-test bites: a 2nd bespoke spring/clock → RED; uni-directional → RED; a layout-axis (`inline-size`/`inset`) channel → RED.

**WAVE 2:** `useLiquidRail` + `DockStack` `mode="carousel"` (the carousel-stack rail decoded from rail-sketch.png) + the playground rail panel. Gate extends `proof:dock-stack-rail` (no 4th SFC).

**WAVE 3:** the UNION direction made full (a card SPLITS/MORPHS/UNIONs with ANOTHER element — n-ary metaball merge of two arbitrary cards via `useDockCtaReceive` fusion) + the per-context goo signatures (search=radial / media=lateral peel / nav=inward, BE.W-DOCK-FISSION F3 as DATA).

**WAVE 4 (the full subsume):** the playground absorbs the 8 dock stories (overview/layers/morph-showcase/sections/cta-receive/rail/dock-search) as panels of the ONE playground; retire the standalone stories (clean break, no alias) once parity is captured. Closes congruent with the storybook (hero title + scroll-shrink + the design language throughout).

**FENCES (binding):** `DOCK_SPRING` byte-untouched (no clock re-tune); `dockMorphContext.ts`/`dockMorphMeasure.ts`/`metaball.frag.ts` NOT edited (the high-fidelity GL metaball is the OPT-IN tier, the CSS-goo is the default — the morph-showcase M5-deterministic precedent); warm-cream identity (no hue injected into the gel); compositor-only library-wide; Safari `filter url(inline)` only / goo-OR-glass swap; PRM=instant everywhere; the rail is a render-MODE not a new SFC. No `proof:ba-gestalt`-deferral close — the prototype's binding paint is the captured DELTA (both modes), not a source-green claim.

## Research: framework
useLiquidMorph: (1) ARBITRARY-ANGLE goo = rotate one neck capsule to theta=atan2(dy,dx), clip-path inset along local X; goo threshold on whole-group alpha. (2) ONE SpringProgress drives N pieces via vector+rank descriptor, DOCK_SPRING untouched. (3) PILL-TO-CARD = useLiquidReveal FLIP bloom + footprint RESERVE (scale not width). (4) SAFARI: filter url(local) inline only, backdrop-filter url broken (WebKit 245510), goo-OR-glass swap. (5) compositor-only, no GL edit. BE dock waves are special cases.

## Research: rail
# THE RAIL CAROUSEL-STACK — pinned architecture for `useLiquidRail` / `<LiquidRail>`

## 1. The sketch DECODED (the binding read of /tmp/ios27-ref2/rail-sketch.png)

The sketch shows ONE vertical carousel in THREE expansion states, top→bottom. The vertical INK LINE in each is the dock edge; the capsule pills are rail items laid out as a **STRAIGHT LINEAR stack** (flat capsules stacked along the line — NOT the 3D `rotateY`+`translateZ` picker-wheel; the iCarousel/desandro `tz = (cellSize/2)/tan(π/N)` wheel math is the WRONG model here, the user said verbatim "NOT the macOS angled-fan — a STRAIGHT carousel-wrap").

- **State 1 — `x`**: the chosen item sits AT the dock line, alone. This is the **collapsed / rest state** ("rail 90% collapsed", "collapsed=just-chosen"). The capsule is the chosen facet only.
- **State 2 — `↑y / x`**: chosen at the line + ONE item ABOVE it, translated up (`↑y`). One-before revealed.
- **State 3 — `↑z ↑y / x`** + a partial item BELOW: chosen at line, TWO above (the `y` near-tier then the `z` far-tier), AND a partial item below (the `x` mark below the line in the sketch = the wrap tail peeking below). This is the **hover-expanded state** showing N-before + N-after.

**x/y/z are NOT 3D axes** — they are the **layered TRANSLATE+OPACITY tiers** keyed off distance-from-chosen: `x` = the chosen item (offset 0, opacity 1, scale 1); `y` = near neighbors (one slot of offset, ~0.6 opacity, ~0.94 scale); `z` = far neighbors (two+ slots of offset, fading toward 0 opacity, ~0.86 scale). The `↑` arrows + the increasing-distance ovals encode: the FURTHER from chosen, the MORE translated AND the MORE faded — exactly the iCarousel `FadeRange`/`FadeMinAlpha` model (fade by `|offsetFromCenter|`, capped at a min alpha). The golden-2x note: the ABOVE side shows 2 full tiers (φ-proportioned slot spacing — see §4), the BELOW side shows a partial (the wrap peek). **Carousel-WRAP**: the list loops — scrolling past the last item wraps to the first via negative-safe modulo `((i % N) + N) % N`.

## 2. WHERE it sits (the no-fork placement — this is NOT a new component, it is a THIRD render-mode reconcile)

CRITICAL: BE already specs `<DockStack>` with two render modes — `mode="stack"` (the BC macOS hover-FAN of glyphs, `src/components/custom/dock/DockStack.vue`:176L) and `mode="facets"` (the AZ context-carousel of accent-chips, BE.W-DOCK-RAIL-REALIZE re-instates it). The rail-sketch carousel-WRAP is a THIRD mode on the SAME `<DockStack>` engine — `mode="carousel"` (or a `wrap?: boolean` axis on `facets`). It MUST NOT be a fourth rail SFC: `proof:dock-stack-rail` S1 (the retire bite, EXTENDED by `proof:dock-rail-realize` R1) reds any new rail SFC (`DockRail.vue`/`DockFacetRail.vue`/a `LiquidRail.vue` all ABSENT/forbidden — the de-overloaded-rail-noun + box-INVIOLATE discipline). The carousel is a RENDER MODE; the JS lives in `useLiquidRail` (a NEW composable beside `useTabIndicator`/`useDragMorph`).

- **`useLiquidRail(railRef, opts)` → `src/components/custom/dock/composables/useLiquidRail.ts`** (NOT `/motion` — it is dock-family, like `useDockState`/`useDockFission`). It is keyframes-BEARING (composes `SpringProgress` via the dock spring + optionally `useLiquidFlex`), so it ships on the `/dock` subpath, OFF the root barrel (the `useDockCtaReceive` precedent).
- **`<LiquidRail edge angle>`** is the rail-sketch's "placeable on ANY edge" surface — but to honor the no-fork bar it should be the `<DockStack mode="carousel" :edge :angle>` axis, NOT a separate SFC. If the orchestrator wants a standalone `<LiquidRail>` (rail outside a dock, "in any element therein"), it is a thin wrapper that mounts `<DockStack mode="carousel">` with no dock context — the SAME engine, the `DockStack` `useOptionalDockContext()` already degrades to standalone (`:75-76`).

## 3. The CAROUSEL-WRAP-WITH-OPACITY-FADE math (the load-bearing geometry — pure, testable, no DOM)

The core is a **pure projection** factored like `useLiquidFlex` (no spring, no rAF, no element — the caller owns the clock). Given:
- `N` items, `chosen` index (the item at the dock line), a live `position` scalar (the scroll offset in slot-units, fractional during a fling), a continuous `expand` scalar 0→1 (the hover/collapse progress the dock spring writes), and the geometry knobs.

**Per-item placement** (for item `i`, computed against `chosen`):
```
// negative-safe signed offset from chosen, on the WRAP ring (shortest arc):
raw   = i - chosen - position           // fractional during a fling
off   = ((raw + N/2) mod N) - N/2        // wraps to [-N/2, N/2), shortest-path signed distance
                                          //   (the "negative-infinity modulus" the research names —
                                          //    JS: ((raw + N/2) % N + N) % N - N/2)
adist = |off|                            // absolute slot-distance from chosen
```

**The TRANSLATE tier (the x/y/z stacking — STRAIGHT, along the rail's main axis):**
```
translate = off * slotSpacing * expand   // collapsed (expand→0) ⇒ all items collapse onto the
                                          //   chosen at the line (state x); expanded ⇒ they fan
slotSpacing = baseSlot * (golden tier scaling — see §4)
```
The translate is along the rail's MAIN axis (a vertical dock's rail fans vertically = `translateY`; a horizontal dock's = `translateX`). The cross-axis is fixed (the items column-align on the dock edge line).

**The OPACITY fade (the iCarousel FadeRange/FadeMinAlpha model — the `↑z` fade-to-opacity):**
```
opacity = clamp(1 - (adist - fadeStart) / fadeRange, fadeMinAlpha, 1)
//   fadeStart  ≈ 0.5  (the chosen + immediate neighbor stay full)
//   fadeRange  ≈ 2.0  (fades out over ~2 slots — the y→z transition)
//   fadeMinAlpha ≈ 0  (the far z-tier fades to transparent — the wrap edge dissolves)
// MULTIPLY by `expand` so the off-chosen items are invisible when collapsed:
opacity *= (adist === 0 ? 1 : expand)
```

**The SCALE tier (the depth read — far items smaller, the `z` recession):**
```
scale = 1 - min(adist, scaleClampSlots) * scaleStep   // scaleStep ≈ 0.06, the y/z recession
                                                        //   (mirrors DockStack member fan scale)
```

**The carousel-WRAP virtualization** (the ≥2-consumer / perf floor): render only a WINDOW of `±ceil(fadeRange + 1)` slots around `chosen` (the visible + the just-fading), mapped through `((i % N) + N) % N` so the strip loops seamlessly without N DOM nodes — this is the `useVirtualSectionWindow` / `pagerWindow` precedent (one window oracle, the PagerDots `pattern="group"` axis), NOT a third windowing fork.

**The EDGE opacity-fade** (the rail's start/end feather as items wrap off-edge) is owned by **`<FadingScroll>`** (the SAME port `DockStack` already wraps its fan in, `DockStack.vue:154`) — the `--fade-start`/`--fade-end` mask-width customs feather the wrap edges so an item dissolving off the top/bottom does so behind a soft mask, NOT a hard clip. `useFadingScroll` is the JS fallback writer (dual-path single-writer, native `scroll()` timeline primary). DO NOT re-fork the edge fade.

## 4. The GOLDEN-RATIO geometry (the "golden 2x above / partial below")

The slot spacing is φ-stepped, NOT uniform — the chosen→y gap is wider than the y→z gap (the recession compresses as items recede, the depth read):
```
slotSpacing(tier) :  tier 0 (chosen)→1 (y) = baseSlot
                     tier 1 (y)→2 (z)       = baseSlot / 1.618   (φ-compressed)
                     tier 2 (z)→3           = baseSlot / 1.618²  (φ²-compressed)
```
This is the EXACT φ-ladder idiom W-CARD-PAD uses (`sqrt-φ`/`φ`/`φ²` constants EXPRESSED in the `calc()` chain, NEVER a flat resolved-rem rebake). The "golden 2x above" = the ABOVE side reserves 2 full φ-tiers (y + z); the "partial below" = the BELOW side shows 1 partial tier (the wrap peek) — an ASYMMETRIC window (`aboveCount=2, belowCount=1` default, the sketch's exact silhouette). Token home: `--rail-slot-base` + `--rail-tier-ratio` (default 1.618) in `dock/density.css` beside `--dock-rail-extend-length` (`:21,35`).

## 5. The EDGE + ANGLE generalization (placeable on any edge L/R/T/B, at angle θ)

The rail anchors on ANY dock edge via the dock's existing axis idiom (`dimOf`/`morphAxisProp` in `dockMorphMeasure.ts:26-33`): a VERTICAL dock's rail fans on the BLOCK axis (`translateY`), a HORIZONTAL dock's on the INLINE axis (`translateX`). The `edge: "start"|"end"` axis (already on `DockStack.vue:53`, `position`) picks WHICH side. For the ARBITRARY-angle θ ask (congruent with the generalized metaball framework — BE.W-DOCK-FISSION/METABALL-BRIDGE2 generalize `morph-bridge.css` H/V→θ), the rail's main-axis translate becomes a 2-vector: `translate = off * slotSpacing * expand * (cos θ, sin θ)` — the chosen at the dock-edge anchor point, items fanning along the θ-direction. The DEFAULT θ derives from the edge (vertical dock → θ=90°/270°, horizontal → 0°/180°); an explicit `angle` prop overrides for the off-axis fan. This is the SAME `(dx,dy)` unit-vector the fission `--split-dx/--split-dy` registry carries — ONE direction-vector vocabulary across rail + fission.

## 6. The SPRING + INTERRUPTIBILITY (the no-second-engine reuse)

- **Clock**: the `DOCK_SPRING` register (`response 0.32, ζ 0.7`, `constants.ts:73`) drives the `expand` scalar (collapse↔hover-expand) AND the `position` scalar (the scroll/fling settle). ONE `SpringProgress` per concern, the `dockMorphContext.ts:234-290` `ensureSpringRunning` loop shape cloned (a fresh spring per episode carrying `inheritedVelocity` — the iOS interruptible re-base, `:255-256`). NO new spring family, NO `@keyframes` (the W-GLASS-CAL spring fence).
- **The fling-to-nearest-slot** reuses the `useDragMorph` decay-rest-projection shape (`decayRest`, nearest-slot snap on `position`); a drag past a slot-midpoint advances, a slow release snaps back. The `position` settles to the nearest INTEGER slot (the chosen flips on settle).
- **The `@property` scalars**: `--rail-expand-t` + `--rail-position` register as typed inheriting `<number>` @properties (`property-regs.css §18`, the `--dock-morph-t`/`--glass-level` precedent, `inherits: true` initial `0`) so they INTERPOLATE not snap, and a host retunes the rail from any ancestor.

## 7. The HOVER + the per-item ACCENT (compose, don't fork)

- **Hover/collapse**: `useDockState`'s hover-hysteresis (`HOVER_INTENT_MS=60`, `constants.ts:97`) + the `getBoundingClientRect` edge-recheck on leave (AZ.W-DOCK-FLICKER, `useDockState.ts:288`) — REUSE it (the `DockStack.vue:97-119` `onPointerEnter`/intentTimer pattern is the exact shape, do not re-roll). Hover→expand shows N-before+N-after; leave→collapse to just-chosen (state x).
- **Per-item accent**: each rail item reads the per-INSTANCE `--glass-accent`/`--glass-accent-strength` chromatic-rim FLOOR (`rim.css:82,91` — a one-line `--glass-accent: <hue>; --glass-accent-strength: <N%>` per item), the active item lit on `--dock-control-active-bg` (the selected-as-glass tier). This is BE.W-DOCK-RAIL-REALIZE R2's per-facet accent — the carousel-wrap inherits it (the AZ context-carousel identity).
- **One registry**: the chosen index writes the consumer-owned `v-model:selected`/`v-model:context` — NO internal selection shadow (`DockStack.vue:66` `defineModel`, R4).

## 8. The PRM + compositor floor (binding)

Compositor-ONLY: every per-item write is `transform: translate()`+`scale()` + `opacity` + the `--*` customs (NEVER `inline-size`/`top`/`margin` — `proof:no-layout-animation` library-wide). Under `prefers-reduced-motion: reduce`: the spring's `respectReducedMotion` SNAPS `expand`/`position` to terminal (zero travel frames), the carousel hard-cuts to its target state, the fade is discrete (opacity survives, the squish/scale-travel drops — the W-LIQUIDHOVER/`useLiquidFlex` PRM mirror). The edge fade (`useFadingScroll`) does NOT vanish under PRM (it is a legibility cue, not motion — `useFadingScroll.ts:13-17`).

## 9. The FISSION→RAIL hand-off congruence (the one-liquid-surface read)

A fission piece (BE.W-DOCK-FISSION `<DockFissionPiece>`) can LAND on a rail slot: the `to`-getter resolves a rail-item rect (`() => railItemRect`, the live-FLIP getter idiom), the detach rides `--dock-split-t` off `DOCK_SPRING`, the goo neck (BE.W-METABALL-BRIDGE2) bridges dock→slot, and the piece arrives carrying the slot's `--glass-accent` hue (the absorb read) via the `useDockCtaReceive` `onReceived` hand-off (`setPending`/`clearPending` arm the landing seat). The rail's chosen-at-line slot IS the natural fission landing target — the carousel and the fission share the `.glass-dock-frame` non-clipping escape (box-INVIOLATE, `deltaW=deltaH=0`).

## 10. The GATE + π shape (for the wave spec)

- `proof:dock-rail-realize` (BE.W-DOCK-RAIL-REALIZE, EXTENDS `proof:dock-stack-rail`) gains the carousel-mode clauses: the wrap-window virtualization present, the φ-tier slot spacing in the `calc()` (not a flat rebake), the opacity-fade reads the FadeRange model, the per-item `--glass-accent`, box-INVIOLATE, one-registry, PRM-snap, compositor-only. Self-test bites: a uniform (non-φ) slot spacing reds; a hard-clip edge (no FadingScroll) reds; a layout-axis translate reds; an internal selection shadow reds; a new rail SFC reds (the S1 retire extend).
- π `tests-visual/dock-rail-realize.spec.ts`: the carousel frame-series at sampled `--rail-expand-t` (collapsed→x, mid→x+y, full→x+y+z + below-peek — byte-reproducible, the deterministic-scalar contract), the per-item distinct-accent rim read, the wrap (scroll past last→first), the edge-fade feather, the box-INVIOLATE witness, the PRM single-paint, both modes × ≥2 viewports. NO source-green close ("rides W-REFLECT3" FORBIDDEN — G8).

## KEY FILES (all absolute, glass-ui only)
- substrate to COMPOSE: `/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/DockStack.vue` (the engine the carousel mode extends), `/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/composables/useDockState.ts` (hover-hysteresis), `/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/composables/dockMorphContext.ts:234-290` (the spring-loop shape to clone), `/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/composables/dockMorphMeasure.ts:26-36` (dimOf/axis idioms), `/Users/mkbabb/Programming/glass-ui/src/composables/motion/useLiquidFlex.ts` (the pure-projection factoring template + the squish), `/Users/mkbabb/Programming/glass-ui/src/components/custom/fading-scroll/composables/useFadingScroll.ts` (the edge fade — REUSE), `/Users/mkbabb/Programming/glass-ui/src/composables/motion/springPresets.ts` (DOCK_SPRING via SPRING_PRESETS), `/Users/mkbabb/Programming/glass-ui/src/styles/glass/rim.css:82,91` (the `--glass-accent` per-item floor), `/Users/mkbabb/Programming/glass-ui/src/composables/motion/useDockCtaReceive.ts` (the fission→slot hand-off), `/Users/mkbabb/Programming/glass-ui/src/styles/tokens/property-regs.css` (the @property scalar registration).
- the wave home: `/Users/mkbabb/Programming/glass-ui/docs/tranches/BE/waves/BE.W-DOCK-RAIL-REALIZE.md` (the carousel mode is its R1/R2 — ADD the wrap-window + φ-tier + opacity-fade clauses), with `/Users/mkbabb/Programming/glass-ui/docs/tranches/BE/waves/BE.W-DOCK-FISSION.md` for the hand-off congruence.
- NEW files: `src/components/custom/dock/composables/useLiquidRail.ts` (the pure carousel-wrap projection + the spring wiring), the `mode="carousel"` arm in `DockStack.vue`, the carousel rules in `src/styles/dock/stack-rail.css`, the `--rail-slot-base`/`--rail-tier-ratio`/`--rail-expand-t`/`--rail-position` tokens in `dock/density.css` + `property-regs.css`.

## ARCHITECTURE PITFALLS (recorded)
1. NOT the 3D rotateY picker-wheel (the desandro `tz=(cellSize/2)/tan(π/N)` math is the wrong model — the sketch is a STRAIGHT linear stack). The opacity/scale tiers give the depth read, not perspective.
2. NOT a new SFC (`proof:dock-stack-rail` S1 retire bite reds it) — a THIRD render-mode on `DockStack`.
3. The negative-safe modulo `((raw + N/2) % N + N) % N - N/2` is MANDATORY for the wrap (the research's "negative-infinity modulus" caveat — a naive `raw % N` breaks the backward wrap, the item jumps the long way around).
4. The φ-tier spacing must be EXPRESSED in the `calc()` (the W-CARD-PAD rebake fence), not a resolved-rem.
5. The edge fade is `<FadingScroll>`'s job — do NOT mask-fork (the BA.W-FADING-SCROLL single-edge-fade-primitive discipline).

Sources: [David DeSandro 3D carousel math](https://3dtransforms.desandro.com/carousel) (the wheel model I REJECT as wrong-for-sketch), [iCarousel FadeRange/FadeMinAlpha](https://github.com/nicklockwood/iCarousel) (the opacity-fade-by-offset model I ADOPT), [circular indexing / negative-safe modulo](https://www.approxion.com/circular-adventures-i-the-modulo-operation/) (the wrap math).