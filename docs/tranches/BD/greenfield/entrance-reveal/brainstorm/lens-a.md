# lens-a — the ENTRANCE + REVEAL motion system, greenfield (PURE iOS-27 fidelity)

**Lens:** the most faithful, audacious iOS-27 Liquid-Glass interpretation of the entrance/reveal
spine. **Scope:** `useLiquidReveal` (the FLIP source-rect bloom), the liquid-entrance general
(squish/morph/fade-in), `useSpringMount`, `useStagger`/`useStaggerReveal`/`vReveal`/`useBloomUp`, and
the mount-clock stagger (`.scroll-build`/`.scroll-cascade`). **Charter rows:** IOS27-REFERENCE T10
(liquid entrance general, ~65%) + T5/T14 (bloom-up / capsule materialize). **The two reconciled
waves:** `W-LIQUID-REVEAL-FIX` + `W-LIQUID-ENTRANCE-GENERAL`.

---

## 0. The live interrogation — what actually happens (born-RED, captured)

Two routes, both modes, Chrome, real trigger/mount, frame-series readback.

### 0a. `useLiquidReveal` — ROOT-CAUSED. It is the binding-verification class, exactly as predicted.

`/motion/reveal`, clicked the real "Bloom from here" trigger, sampled the surface's computed
`transform`/`opacity`/`filter` over 18 frames (~750ms):

```
ALL 18 frames: transform: none · opacity: 1 · filter: blur(0px) · inlineTransform: (none)
surfaceFound: true   (the .glass-reveal <div> mounts at 384×151)
```

The surface **mounts** but the bloom **never fires** — no inline style is ever written across 8 rAFs.
The console carries the smoking gun:

```
Uncaught TypeError: triggerEl.getBoundingClientRect is not a function   (×2)
```

**The precise mechanism.** `reveal.vue` binds `<Button ref="triggerRef">` — but `Button` is a **Vue
component**, so `triggerRef.value` resolves to the component's **public instance**, NOT the underlying
`<button>` HTMLElement. `useLiquidReveal.ts:167` does `triggerEl.getBoundingClientRect()` on that
instance and **throws synchronously** inside `reveal()` — BEFORE the `ElementMorph` is constructed and
BEFORE the rAF loop schedules. So zero frames run; the surface paints at its settled rect, fully
opaque, motionless. The `surfaceRef` is bound to a plain `<div>`, so `surface.value` resolves fine —
that is why `surfaceFound: true` while the trigger crashes. This is the **exact** cta-receive P0 class
([[glass-ui binding verification]] memory): `useTemplateRef<HTMLElement>` / `ref=` on a COMPONENT
yields the instance, `.value.getBoundingClientRect` is `undefined`, vue-tsc + units pass, only live
e2e catches it. `useDockCtaReceive.ts` already shipped the cure — an `asElement(v)` resolver
(`src/composables/motion/useDockCtaReceive.ts:170`, accepts `HTMLElement | ComponentPublicInstance`,
returns `(v as ComponentPublicInstance).$el ?? v`). `useLiquidReveal` (and `useBloomUp`, same shape,
same `getBoundingClientRect` on a bound ref) never adopted it. **The fix is to harden the composable,
not just the demo** — any consumer mis-binding a component ref must still bloom.

### 0b. The liquid-entrance general (`v-reveal` / the entrance) — it is a FLAT FADE, no liquid arc.

`/motion/reveal`, clicked Replay, sampled the staggered rows:

```
reveal-fade variant: opacity 0→0.034 ramping · transform: none · translate: none · scale: none
timing: linear(0 0%, 0.10599 2.041%, …)   ← the --spring-bouncy linear() IS applied
```

The `--spring-bouncy` `linear()` clock is correctly threaded, but the `reveal-fade` keyframe animates
**opacity only** — `transform`/`translate`/`scale` are `none` for the whole entrance. It is a spring
clock driving a flat fade: **no squish, no morph, no overshoot read**. The sibling `reveal-rise`
variant adds a `translateY(12px)→0` but **no scale/squish** — a rise, not a squish-grow. Neither
carries the IOS27-REFERENCE T10 arc: **squash → overshoot → settle** with volume-preserving
deformation. The `.glass-reveal` recipe (`glass/reveal.css`) DOES squish (scale `0.88→1` on
`--spring-snappy` + fade + blur-settle) — but it is scoped to top-layer reka overlays; cards, rows,
controls, demo sub-sections get the flat `v-reveal` fade. **The gap is exactly T10: generalization +
grace + cross-engine.**

### 0c. The cross-engine truth (already adjudicated, binding).

The story-page-standard DELTA-ASSAY already settled this and it is LAW here: `view()` shipped **Safari
26 (late-2025)** — on most Safari today a `view()`-timeline entrance is **skipped to a plain fade**.
Therefore the load entrance MUST be the **shipped `.scroll-build`/`.scroll-cascade` mount-clock
stagger** (the `--i` index, Safari-15-safe, the overlap REAL on a time clock); `view()` is a
below-fold scroll-reveal **enhancement only**, `@supports`-gated. `animation-delay: calc(--i · step)`
is a NO-OP on a `view()` timeline (delay is a clock offset; a view timeline maps to scroll progress) —
so the 1/φ overlap stagger can ONLY live on the time clock. This design does not re-litigate it; it
builds ON it.

### 0d. Source-verify of the cited symbols (the build-DAG).

- `--ease-cartoon-punch`, `--motion-weight`, `--shadow-cartoon` cartoon-cast — **specced in design.md
  §L2/§L4/§Shadows but ABSENT from `src/`** (`grep -rn 'ease-cartoon-punch|motion-weight' src` → empty).
  These are **Band-0 deps** (`docs/tranches/BD/greenfield/cartoon-shadow/` + the motion-spring-register
  precept source). This design **depends-on** them — it does not mint them, it consumes them with a
  documented fallback so it lands GREEN before Band-0 and UPGRADES when Band-0 lands.
- SHIPPED + verified present: `--spring-snappy`/`--spring-bouncy`/`--spring-dock` + the
  `--spring-*-duration` clocks (`scheme-motion.css`), `useLiquidFlex` (the ONE squish engine),
  `ElementMorph`/`springTimingFunction`/`SpringProgress` (`@mkbabb/keyframes.js`), the `.glass-reveal`
  recipe (`glass/reveal.css`, scale 0.88→1 + fade + blur-settle), `.scroll-build`/`.scroll-cascade`
  (`scroll-choreography.css`), `asElement` (`useDockCtaReceive.ts:170`), `supportsViewTimeline()`.

---

## 1. The core idea — ONE entrance grammar, THREE registers, FOUR coupled channels

The entrance/reveal spine is currently a patchwork: a broken JS bloom (`useLiquidReveal` crashes), a
flat-fade declarative entrance (`v-reveal`), a squishing CSS overlay recipe (`.glass-reveal`) that no
non-overlay surface reaches, and a mount-clock stagger that only fades+rises. **The greenfield unifies
them into ONE grammar with ONE spring family, ONE squish engine, and ONE channel split** — every
surface entrance, whether mount-driven, scroll-driven, or trigger-driven, speaks it.

### The grammar: every entrance is a `LIQUID ENTER` = four coupled channels on one spring clock.

| Channel | Property | Curve | The iOS-27 read |
|---|---|---|---|
| **SPATIAL — bloom** | `scale` (+ `translate` for FLIP) | `--spring-snappy`/`-bouncy`/`-dock` (the overshoot IS the bounce) | the squish-grow from `0.88`→`1` with overshoot to ~`1.03` then settle |
| **SQUISH — volume** | reciprocal `--lq-stretch` (`scale: s · 1/s`) | `useLiquidFlex` `tanh`, cap `1.08` | the volume-preserving gel deform — the long axis swells AS it travels, the short pinches; **MORE on a faster mount** |
| **EFFECTS — fade** | `opacity` `0→1` | `--ease-out` (NO overshoot — a fade must not bounce) | coupled so scale+fade read as ONE coalescing layer (P3) |
| **EFFECTS — decongest** | `filter: blur(b)→blur(0)` | the SAME spring clock | the iOS light-bending modulation — the surface CLARIFIES as it blooms; on the surface's OWN pixels (`filter`, NOT `backdrop-filter`) so the resting glass plate is untouched |

This is the `.glass-reveal` recipe's exact channel set — **promoted from an overlay-only recipe to the
universal entrance grammar.** The squish (channel 2) is the new leg the flat `v-reveal` lacked.

### The three registers (the ONE grammar, three orchestration scopes — NOT three engines):

1. **MOUNT register — `.liquid-enter` / `.scroll-build` / `.scroll-cascade`** (the everywhere floor,
   CSS-only, zero-JS, Safari-15-safe). A surface that mounts (a card, a row, a demo sub-section, a
   route's page-build) opts into the four-channel grammar via a CSS recipe on the `--i` mount-clock
   stagger. **This is the PRIMARY entrance.** No `view()` dependency — the `--i` time-clock overlap is
   real on every engine. The squish leg is added to the keyframe (scale + the reciprocal `--lq-stretch`
   from a CSS-expressed tanh approximation, or `useLiquidFlex` when a JS clock is present).

2. **SCROLL register — `[data-scroll-reveal]` / `.scroll-cascade` `view()`** (the below-fold
   enhancement, `@supports`-gated). When the engine has genuine `view()` (Safari 26+, Chrome), a
   below-fold surface upgrades to a scroll-progress-bound entrance off its OWN `view()` timeline (the
   implicit stagger, no setTimeout). On a non-`view()` engine the `@supports` gate drops it and the
   MOUNT register's `.scroll-build` fires instead (or the surface paints terminal) — **never a broken
   silent surface, never a skipped-to-flat-fade regression.** `useStaggerReveal` is the single-writer
   feature-detect fallback (it already does this — `NATIVE_VIEW_TIMELINE` reveals immediately so the
   CSS owns it; else the IntersectionObserver cascade).

3. **TRIGGER register — `useLiquidReveal` / `useBloomUp`** (the source-rect FLIP bloom, JS, the
   refinement). A top-layer surface (a dialog from its button, the dock from its pill, an album→sheet)
   blooms FROM a trigger's measured rect via `ElementMorph` FLIP-inversion + `springTimingFunction` —
   the four channels driven off ONE spring sample. **This is the only register that needs JS** (it
   needs a live source rect the CSS recipe cannot know). The MOUNT/SCROLL registers are its CSS-floor
   cousins (a center/anchor-origin bloom without a separate source element).

**KISS / DRY / no-fork:** all three registers are the SAME four-channel grammar + the SAME spring
family (`SPRING_PRESETS`) + the SAME squish engine (`useLiquidFlex`). The MOUNT recipe is `.glass-reveal`
generalized; the TRIGGER leaf is the existing `useLiquidReveal`/`useBloomUp` (hardened); the SCROLL
recipe is the existing `.scroll-cascade` `view()` arm. We mint NO new spring, NO new squish, NO new
scroll runtime. We FIX one broken leaf, ADD a squish leg to one keyframe, and PROMOTE one recipe.

---

## 2. The mechanism — precise, per register

### 2a. TRIGGER register — fix `useLiquidReveal` (+ `useBloomUp`), the cta-receive cure.

**The fix (defense-in-depth, in the composable):** adopt the shipped `asElement` resolver so the
trigger/source ref accepts a component instance OR an element. Two surgical edits, no re-fork:

```ts
// useLiquidReveal.ts — widen the option type + resolve through asElement
import { asElement } from "./resolveElement"; // hoist the cta-receive helper to a shared module
trigger?: Ref<HTMLElement | ComponentPublicInstance | null>;
// at reveal():
const triggerEl = asElement(options.trigger?.value);   // ← was: options.trigger?.value (instance → throw)
```

`asElement` (lifted verbatim from `useDockCtaReceive.ts:170` into a shared `resolveElement.ts` so the
bloom family — `useLiquidReveal`, `useBloomUp`, `useDockCtaReceive` — share ONE resolver, DRY): returns
`(v as ComponentPublicInstance).$el ?? (v as HTMLElement)`, with a guard that `$el` is an
`Element` (a component with a non-element root — a Fragment — falls through to the self-scale fallback,
never throws). `useBloomUp` gets the same treatment on its `source`/`dest`/`field` refs (it
`getBoundingClientRect`s all three).

**Also hardened:** the `surface`/`dest` ref (the blooming element itself) is a `<div>` here so it
resolves — but for robustness the resolver applies there too (a consumer could bloom a `<Card>`
component). And the demo's `requestAnimationFrame(() => reveal())`-after-`v-if` mount race: keep the
single-rAF arm but make `reveal()` a no-op-and-retry-once if the surface rect is zero (mid-mount), so a
slow mount does not silently no-op. This is the binding-verification e2e gap: a
`tests-visual/liquid-reveal.spec.ts` that DRIVES the real open→bloom and asserts a non-`none` transform
mid-flight (born-RED on today's tree — the spec fails on the crash).

**The four channels stay exactly as designed** in `useLiquidReveal` (they are correct — scale+fade+blur
off one `springTimingFunction` sample, compositor-only, PRM-snap). The ONLY defect was the ref
resolution. The bloom is RIGHT; it just never ran. Post-fix the live readback must show
`transform: matrix(…)` interpolating + `filter: blur(Npx)→blur(0)` + `opacity 0→1` across the frame
series, anchored at the trigger's rect (`transform-origin` = trigger-top-left-relative-to-surface).

### 2b. MOUNT register — `.liquid-enter` recipe: promote `.glass-reveal` to the universal floor + add squish.

A CSS recipe (in `scroll-choreography.css` / a new `glass/liquid-enter.css` partial) that ANY surface
opts into. It is `.glass-reveal`'s four channels expressed as a mount `@keyframes` (not a data-state
transition), on the `--i` stagger clock:

```css
@media (prefers-reduced-motion: no-preference) {
  @keyframes gl-liquid-enter {
    from {
      opacity: 0;
      scale: var(--lq-enter-scale, 0.88);          /* SPATIAL squish-grow — the 0.88 grace, not 0.95 */
      /* SQUISH — the volume-preserving deform: born wide+flat, settles square. A CSS expression
         of the useLiquidFlex tanh at peak travel — the long axis swells, the short pinches.
         When a JS clock is present (useLiquidFlex-driven), --lq-stretch is written live; the CSS
         from-value is the static peak so a pure-CSS surface still squishes. */
      transform: scale(var(--lq-stretch-x, 1.06), var(--lq-stretch-y, 0.945));
      filter: blur(var(--lq-enter-blur, 4px));      /* decongest */
    }
    to { opacity: 1; scale: 1; transform: scale(1,1); filter: blur(0); }
  }
  .liquid-enter, .scroll-build > *, .scroll-cascade > * {
    animation: gl-liquid-enter var(--spring-snappy-duration) var(--spring-snappy) both;
    animation-delay: calc(var(--lq-enter-step, 90ms) * var(--i, 0));   /* the 1/φ overlap on a TIME clock */
  }
  /* the audacious-display arm — type arrives with GRAVITY, no bounce (--ease-out), per W-HIERARCHY2 */
  .liquid-enter.is-display, .scroll-build > .scroll-build-hero {
    animation-timing-function: var(--ease-out);
  }
}
```

**The 1/φ overlap stagger** is the golden-proportion read: the per-beat delay is the spring's settle
horizon × `1/φ ≈ 0.62` so beat N+1 launches as beat N reaches ~62% — the beats OVERLAP into one
flowing assembly (Disney follow-through/overlap), never a discrete march. `--lq-enter-step` defaults to
the spring-clock × 0.62. This is REAL on a time clock (the story-page-standard finding) and a NO-OP on
`view()` — so it lives here, in the MOUNT register, by construction.

**The cartoon-punch upgrade (Band-0 dependent).** When `--ease-cartoon-punch` lands in src, an opt-in
`.liquid-enter.is-cartoon` / a surface resting at higher `--motion-weight` swaps its SPATIAL timing to
`--ease-cartoon-punch` (the real ~4% anticipation dip BELOW origin — a thing no damped spring can
express — then ~22% overshoot, then settle) and its squish depth + the cartoon-shadow cast-lag scale by
`--motion-weight`. Until Band-0 lands, the recipe reads `var(--ease-cartoon-punch, var(--spring-bouncy))`
— the bouncy spring is the graceful floor, the cartoon-punch is the audacious upgrade. **depend-on, no
mint, documented fallback.**

**`v-reveal` reconciled.** The flat `reveal-fade`/`reveal-rise` consumer CSS in `reveal.vue` is replaced
by the `.liquid-enter` grammar — `v-reveal` keeps writing `[data-reveal]` + `--d` (it is a pure DOM
hook writer, root-barrel-safe, KEEP), but the demo's scoped keyframes adopt the four channels (or, the
demo binds `.liquid-enter` and `--i` directly and `v-reveal` becomes the index writer). Either way the
flat fade is RETIRED — the rows squish-grow + fade + decongest on the stagger.

### 2c. SCROLL register — `.scroll-cascade` `view()` arm, the below-fold enhancement.

Unchanged in mechanism (the existing `view()` arm under `@supports ((animation-timeline: view()) and
(animation-range: entry))`), but its keyframe gains the squish leg (the same `transform: scale(sx,sy)`
+ `scale`) so a below-fold reveal reads liquid, not a flat rise. `useStaggerReveal` stays the
single-writer feature-detect fallback (native → reveal immediately + CSS owns it; non-native →
IntersectionObserver cascade with the `--i`/`staggerMs` stagger). On a non-`view()` engine the surface
falls to the MOUNT `.scroll-build` register — never skipped to a flat fade.

### 2d. `useSpringMount` — kept, it is the dialog/sheet position spring (correct).

`useSpringMount` (the 0→1 position spring + drag-dismiss) is NOT broken and NOT a fade — it is the
sheet/dialog mount-position kernel (reuses `useSpring`). It composes BELOW the entrance grammar (it
owns the translate-position; `.glass-reveal`/`useLiquidReveal` own the scale/fade/blur bloom). Keep
byte-untouched; document that a `spring`-opt-in Dialog rides `useSpringMount` for position AND the
`.glass-reveal` recipe for the bloom — two layers, one surface, one spring family.

---

## 3. The single boldest move

**PROMOTE the broken/scattered four-leaf entrance zoo into ONE universal `LIQUID ENTER` grammar — and
make the SQUISH channel non-optional on every entrance, mount or trigger.** Today the squish lives only
in the overlay-only `.glass-reveal` recipe; cards, rows, and the `v-reveal` stagger get a flat fade,
and the one JS bloom that DOES squish is dead-on-arrival from a component-ref crash. The bold move is:
(1) fix the crash with the shipped `asElement` cure hoisted to a shared resolver the whole bloom family
reads (DRY); (2) generalize `.glass-reveal`'s four channels into a `.liquid-enter` mount recipe EVERY
surface opts into on the Safari-safe `--i` time-clock stagger with a **1/φ golden overlap**; and (3)
make the **volume-preserving squish (`useLiquidFlex` tanh) a first-class entrance channel** — born
wide-and-flat (scale `1.06 · 0.945`), settling square — so EVERY entrance, not just overlays,
squash→overshoots→settles like the iOS-27 reference, with the **`--ease-cartoon-punch` /
`--motion-weight` cartoon register as the depend-on upgrade** (real anticipation dip + 22% punch, scaled
by the rest `1/φ` weight) the moment Band-0 lands. One grammar, one spring family, one squish engine,
three orchestration registers — the flat fade and the dead bloom both die.

---

## 4. a11y / PRM / cross-engine carve

- **PRM (P6):** every register keeps the FADE, drops the transform + squish + bounce + blur-settle in
  ONE arm. `useLiquidReveal`/`useBloomUp` already snap-to-settled-with-opacity-1 under reduce (correct).
  The `.liquid-enter` recipe gets the `@media (prefers-reduced-motion: reduce)` arm (the
  `.scroll-build` precedent): `opacity 0→1` on `--duration-fast` `--ease-out`, scale/transform/filter
  → none, stagger delay → 0 (one calm paint). `--motion-weight → 0` under PRM (the §L5 cascade zeroes
  squash/overshoot/anticipation/cast in one assignment).
- **Cross-engine (the binding law):** MOUNT register = `.scroll-build`/`.liquid-enter` `@keyframes` +
  `--i` time clock = **Safari-15-safe** (no `view()`, no `@scroll-timeline`). SCROLL register =
  `view()` under `@supports` = Safari-26+/Chrome enhancement, falls to MOUNT on older Safari (never a
  flat-fade skip). The `linear()` spring curves are Baseline 17.2+; the `filter` blur-settle rides the
  surface's OWN pixels (never `backdrop-filter:url`, the Safari goo-fence). `scale:`/`translate:`
  longhands (not `transform:`) so the recipe composes with a centering transform and mints no stacking
  context.
- **Compositor-only (P5):** every channel is `transform`/`scale`/`translate`/`opacity`/`filter` —
  NEVER a layout property (`proof:no-layout-animation` holds library-wide).
- **Golden proportion (§L6):** the stagger overlap is `1/φ ≈ 0.62` of the spring settle (beats overlap,
  never march); the rest `--motion-weight` is `1/φ`; the squish cap `1.08` and the enter-scale `0.88`
  stay the calibrated iOS grace.

---

## 5. The wave amendment (reconcile vs the 116-wave set — no dup)

- **`W-LIQUID-REVEAL-FIX`** → REFINE to the precise mechanism: NOT "maybe a race / maybe a trigger /
  maybe a ref" — it IS the component-ref crash (`triggerEl.getBoundingClientRect is not a function`,
  captured live). The fix is the shared `asElement` resolver hoisted from `useDockCtaReceive`, applied
  to `useLiquidReveal` + `useBloomUp`, + the binding-verification e2e (`tests-visual/liquid-reveal.spec.ts`,
  born-RED on the crash). NO re-fork — the bloom mechanism is correct, only the ref resolution was wrong.
- **`W-LIQUID-ENTRANCE-GENERAL`** → KEEP as the P7 universal-liquid-weight LAW + lens, but its
  INSTANCE-mechanism is this design's `.liquid-enter` grammar: the four-channel squish-entrance
  generalized off `.glass-reveal`, on the `--i` mount-clock (the story-page-standard cross-engine
  finding is binding), with `useLiquidFlex` as the squish channel + the `--ease-cartoon-punch` /
  `--motion-weight` depend-on upgrade. It UNIONS with `W-LIQUID-REVEAL-FIX` (the TRIGGER register is
  the fixed bloom; the MOUNT register is the new recipe; they share the spring family + squish engine).
- **NO new wave needed** — both extant waves cover the scope; this design supplies the precise
  mechanism + the cross-engine reconcile + the source-verified Band-0 dependency. The DELTA-ASSAY
  artefact: the born-RED frame-series (§0a/§0b above) + the post-fix bloom + squish-entrance readback,
  both modes, Chrome + WebKit.
- **Depends-on (build-DAG):** Band-0 `--ease-cartoon-punch` + `--motion-weight` + `--shadow-cartoon`
  (cartoon-shadow greenfield + motion-spring-register precept source). This design lands GREEN on the
  bouncy-spring floor BEFORE Band-0 and upgrades to the cartoon punch when it lands — `var(--ease-
  cartoon-punch, var(--spring-bouncy))`, the documented fallback.

## 6. The gestalt bar (the acceptance lens)

The reveal FIRES (the trigger bloom: `transform: matrix(…)` interpolating + `filter blur→0` + `opacity
0→1`, anchored at the trigger rect, both modes) AND the entrance READS LIQUID (every mount surface:
scale `0.88→1` with overshoot + the reciprocal squish `1.06·0.945→1·1` + coupled fade + decongest, on
the `1/φ` overlap stagger), both modes, both engines — the squash→overshoot→settle arc visible in the
frame-series, the flat fade and the dead bloom both retired. Born-RED on HEAD (the bloom crashes; the
entrance flat-fades).
