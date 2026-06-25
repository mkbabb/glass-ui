# Entrance + Reveal motion — greenfield lens-b (cross-engine / perf-first)

**Lens:** flawless Chrome *and* Safari + performance. The simplest mechanism that hits the
bar (KISS), compositor-only, offscreen-paused, `@supports`/PRM floored. Liquid-weight
universal, but *honest* about which engine runs which arm.

**Scope reconciled:** `useLiquidReveal` (the FLIP/source-rect bloom), the liquid-entrance
general (squish/morph/fade-in), `useSpringMount` / `useStagger` / `useStaggerReveal` /
`vReveal` / `useBloomUp`, the mount-clock stagger (`.scroll-build` / `.scroll-cascade`).
Reconciles `W-LIQUID-REVEAL-FIX` + `W-LIQUID-ENTRANCE-GENERAL`. **Union, no re-fork.**

---

## 0 — The live interrogation (root-cause, captured)

Inspected LIVE on `http://localhost:5173/motion/reveal`, Chromium, via chrome-devtools-mcp.

### (1) `useLiquidReveal` — ROOT CAUSE: the element-vs-component ref class (CONFIRMED)

The demo (`demo/stories/motion/reveal.vue:84`) binds the trigger as
`<Button ref="triggerRef">`. **`Button` is a Vue component** (reka `Primitive`), so
`triggerRef.value` is the **component public instance**, NOT the `<button>` element.

Live readback off the running story instance (`setupState.triggerRef`):

```json
{ "triggerRef_isHTMLElement": false,
  "triggerRef_hasGetBCR":      false,
  "triggerRef_hasDollarEl":    true,     // ← it's a ComponentPublicInstance
  "surfaceRef_value":          "DIV",    // the surface IS a real element
  "open":                      true }
```

The mechanism, exact (`useLiquidReveal.ts:165-167`):

```ts
const triggerEl = options.trigger?.value ?? null;     // = the Button INSTANCE (truthy!)
const triggerRect = triggerEl
    ? triggerEl.getBoundingClientRect()                // ← TypeError: not a function
    : <self-scale fallback>;
```

`triggerEl` is **truthy** (a component instance), so the ternary takes the
`.getBoundingClientRect()` branch on an object that has no such method →
**uncaught `TypeError` inside `reveal()`, before a single frame is written.** The rAF
loop never arms. The fallback (which WOULD have spring-bloomed from self) is unreachable
because the instance is truthy, not null.

Frame-series proof — the surface after "open", computed + inline:

```json
{ "surface_transform":       "none",
  "surface_inlineTransform": "(empty)",   // ← the JS bloom wrote NOTHING
  "surface_inlineFilter":    "(empty)",
  "surface_opacity":         "1" }
```

The surface appears ONLY via the static `.glass-reveal[data-state="open"]` CSS recipe
(`glass/reveal.css`). The JS source-rect bloom is **dead** — exactly the user's
"doesn't seem to work at all." This is the [[glass-ui binding verification]] class +
the cta-receive P0 precedent (`useTemplateRef<HTMLElement>` → component instance, silent
no-op; vue-tsc + units miss it, only live e2e catches it).

**Two coupled defects, not one:**
1. **The leaf is unguarded** — it trusts `trigger.value` is an `HTMLElement`. The
   shipped `useDockCtaReceive` already SOLVED this with an `asElement()` resolver
   (`useDockCtaReceive.ts:170-177`) but `useLiquidReveal` never adopted it.
2. **The demo mis-binds** — even a hardened leaf reads the resolved `$el`; the demo's
   `ref="triggerRef"` on a component is the canonical mis-wire the leaf must absorb.

### (2) The liquid-entrance general — is it ALIVE? (NO — flat, on the flagship route)

The `v-reveal` stagger (`reveal.vue:110-113`) rides `reveal-rise 0.5s var(--spring-bouncy)`
— a coupled fade + 12px translate on the bouncy spring. That carries weight, but it is a
**fixed-duration `@keyframes`**, not the squash→overshoot→settle ARC the
ScreenRecording_06-22 reference shows (stretch / inertia / morph / squeeze / settle). The
`.scroll-build` / `.scroll-cascade` mount-clock (`scroll-choreography.css`) is a
translateY + opacity coupled build on `--spring-snappy` — **good weight, but no SQUISH**:
there is no `useLiquidFlex` reciprocal `--stretch` on any entrance. The entrance fades and
rises; it does not *deform*. Per `W-LIQUID-ENTRANCE-GENERAL` P7c this is the gap — the
squish engine ships (`useLiquidFlex`) but no entrance consumes it.

### (3) Cross-engine — `view()` is Safari-26-only (CONFIRMED via story-page-standard)

`docs/tranches/BD/greenfield/story-page-standard/DELTA-ASSAY.md:58` (a landed refutation):
`view()` shipped **Safari 26 (late-2025)** — on the Safari installed base TODAY the whole
`view()`-timeline entrance is skipped to a plain fade. AND `animation-delay` is a **no-op
on a `view()` timeline** (delay is a clock offset; a view timeline maps to scroll
progress) → the "1/φ overlap stagger" cannot exist on `view()`. The honest pick (already
canon): **the LOAD entrance is the SHIPPED on-mount `.scroll-build` / `.scroll-cascade`
mount-clock stagger** (the `--i` index — Safari-15-safe, the overlap is REAL on a time
clock); `view()` is the below-fold scroll-reveal ENHANCEMENT only, `@supports`-gated.

### (4) The stagger overlap — `useStaggerReveal` is correct; `useStagger` is the time twin

`useStaggerReveal.ts` already feature-detects `NATIVE_VIEW_TIMELINE` and goes inert
(no observer, no timers) on a `view()` engine, deferring to CSS — and falls back to
IntersectionObserver + `setTimeout(staggerMs * idx)` otherwise. `useStagger` is the
unconditional time-clock cascade. **Both are fit.** The gap is they don't carry the
**1/φ overlap on the time clock** as a first-class knob, and they don't squish.

### The token-DAG reality (source-verified)

- `--ease-cartoon-punch`, `--motion-weight` — **NOT yet in `src/`** (grep: zero hits).
  They are **Band-0 deps** (`design.md` §L2/§L4/§Easing define them; `tokens.css` does
  not yet ship them). Every entrance arm that names them **DEPENDS-ON Band-0** — it must
  `var(--ease-cartoon-punch, <spring fallback>)` so it degrades cleanly until Band-0 lands.
- `--shadow-cartoon*` — SHIP (`tokens/shadow.css`, `theme/bridges.css`). The cast carrier
  is `BD.W-CARTOON-CASTER`'s `.cartoon-cast` child (NOT an `::after { box-shadow }` — a
  WebKit hole per the glass-atoms delta).
- `--spring-*` (`springPresets.ts` / `scheme-motion.css`), `useLiquidFlex`,
  `ElementMorph` + `springTimingFunction` (`@mkbabb/keyframes.js`),
  `.scroll-build`/`.scroll-cascade`/`--i` (`scroll-choreography.css`) — all SHIP.

---

## 1 — The core idea: ONE entrance system, THREE clocks, ONE resolver

The entrance + reveal surface is not five engines — it is **one taxonomy over three
clocks**, all carrying the same liquid-weight arc (squish→overshoot→settle), all
compositor-only, all defaulting-to-broken-on-Safari (the enhancement degrades to the
floor, never the floor to nothing).

| Clock | Mechanism (SHIPPED) | When | Engine floor |
|---|---|---|---|
| **MOUNT clock** | `.scroll-build` / `.scroll-cascade` `@keyframes` + `--i` stagger | route-enter, list mount, above-the-fold | **Safari 15** (plain `@keyframes`, no timeline) |
| **EVENT clock** | `useLiquidReveal` / `useBloomUp` rAF spring (ElementMorph FLIP) | a surface opens FROM a trigger (dialog, dock-pill, album→fullscreen) | **Safari 15** (rAF + transform) |
| **SCROLL clock** | `view()` timeline (`.scroll-cascade`, `[data-scroll-reveal]`) | below-the-fold reveal ENHANCEMENT only | **Safari 26** → degrades to MOUNT-clock terminal state |

The **single binding invariant**: every arm reads the SAME `--spring-*` family
(`springPresets.ts`), couples fade to transform (P3), is compositor-only (P5), carries the
PRM carve (P6), and — the NEW universal clause — pairs the **`useLiquidFlex` reciprocal
squish** on the spatial channel (P7c). The squish is the ONE engine; nothing hand-rolls a
second `1+tanh`.

### The reveal fix (the headline — `useLiquidReveal` ALIVE)

**Adopt the proven `asElement()` resolver into `useLiquidReveal` (and `useBloomUp`).**
Widen the option types to `Ref<HTMLElement | ComponentPublicInstance | null>` and resolve
through the SAME 8-line `asElement` the cta-receive fix shipped:

```ts
function asElement(v: HTMLElement | ComponentPublicInstance | null | undefined): HTMLElement | null {
    if (!v) return null;
    if (v instanceof HTMLElement) return v;
    const el = (v as ComponentPublicInstance).$el;
    return el instanceof HTMLElement ? el : null;
}
```

This is **DRY law** — it is currently duplicated in `useDockCtaReceive`; the union HOISTS
it to a shared `motion/asElement.ts` and BOTH the reveal family and cta-receive consume
the one resolver. Then `reveal()` reads `asElement(options.trigger?.value)` →
when it resolves null (a genuinely unbound trigger), the **self-scale fallback fires**
(spring bloom from a 92%-inset of self — already coded, just currently unreachable). When
it resolves the `$el`, the source-rect FLIP blooms from the real button rect. **The leaf
can no longer silently no-op on a component ref** — the cardinal defect class is closed at
the engine, not patched per-consumer.

The demo's `ref="triggerRef"` mis-bind ALSO gets fixed (bind to the host element via the
`$el` the resolver reads, OR document `useTemplateRef` + `.$el`), but the **engine-level
resolver is the load-bearing fix** — it makes EVERY future consumer correct-by-construction.

### The entrance ALIVE (the squish the reference shows)

The mount-clock `@keyframes` gains a **squish leg** so the entrance deforms, not just
rises. Two composable paths, ONE squish engine:

- **CSS arm (the floor, zero-JS):** the `gl-page-build` / `gl-cascade-build` keyframes add
  a reciprocal `scaleY`/`scaleX` squash that RELAXES to 1 as the rise settles — keyed off
  `--motion-weight` (Band-0; `var(--motion-weight, 0.62)` fallback) so the squash depth,
  the overshoot share, and the cast travel co-scale as ONE deformation. The spring's
  overshoot interior on the transform IS the cartoon punch; for the audacious display
  register the curve reaches `--ease-cartoon-punch` (Band-0; `var(--ease-cartoon-punch,
  var(--spring-bouncy))` fallback — the real ~4% anticipation dip + ~22% overshoot a
  damped spring can't express).
- **JS arm (the driven entrance):** a thin `vBloomUp` / `useStagger` consumer drives
  `useLiquidFlex({ squishLaw: "tanh", maxStretch: 1.08 })` off the spring derivative,
  writing `--stretch` the CSS pairs reciprocally. This is the EXACT pattern
  `useLiquidMorph` already runs per-piece — reused, not re-forked.

The squish is **volume-preserving, capped LOW (≈1.08 — gel, not taffy)** per the
W-LIQUID single-engine fence.

---

## 2 — The single BOLDEST move

**Hoist a `useReveal` taxonomy composable that auto-selects the clock — and make the
element-resolver + the squish-coupling NON-OPTIONAL at the engine, so "doesn't work at
all" becomes structurally impossible.**

Concretely: one `motion/asElement.ts` resolver consumed by the WHOLE bloom family
(`useLiquidReveal`, `useBloomUp`, `useDockCtaReceive`), so any `Ref<HTMLElement |
ComponentPublicInstance>` blooms correctly whether a consumer binds an element or a
component — the binding-verification defect class is closed at the source, once, for all
time. Paired with a `vReveal` directive upgrade that, on a `view()`-less engine (most
Safari today), **does not silently fall to a plain fade** — it routes the entrance to the
MOUNT-clock `.scroll-build` `--i` stagger (Safari-15-safe, real time-clock overlap),
reserving `view()` purely as the `@supports`-gated below-fold enhancement. **The boldest
part is the inversion of the default:** the system DEFAULTS to the cross-engine floor
(mount-clock + rAF spring, both Safari-15-safe) and treats `view()` as additive sugar —
the opposite of the common award-winner pattern that builds on `view()` and degrades to
nothing on WebKit. The reveal FIRES on every engine because the floor IS the mechanism,
not the fallback.

---

## 3 — Mechanism detail (tokens / recipes / composables)

### 3a — `motion/asElement.ts` (NEW, hoisted; the DRY resolver)
The 8-line resolver above. `useLiquidReveal`, `useBloomUp`, `useDockCtaReceive` all import
it; the duplicated copy in cta-receive is DELETED (no two authorities).

### 3b — `useLiquidReveal` (REFINE — keep the engine, fix the seam)
- Widen `trigger?: Ref<HTMLElement | ComponentPublicInstance | null>`.
- `reveal()` resolves `asElement(options.trigger?.value)`; null → the existing self-scale
  spring fallback (now reachable). Wrap the rect read in the resolver so a component ref
  NEVER throws.
- Add the squish: optionally drive `useLiquidFlex` so the bloom DEFORMS at peak velocity
  (the surface stretches along its travel axis then settles) — coupled, capped 1.08, PRM-off.
- The three channels (scale+fade+blur-settle) + the compositor-only + PRM-snap floors are
  KEPT byte-for-byte. This is a seam fix + a squish add, not a re-author.

### 3c — `useBloomUp` (REFINE — same resolver)
Already excellent (the 4th color channel, the no-mount-flash prime). It reads `source` /
`dest` directly — adopt `asElement` on both so a component-bound source/dest blooms. The
field-warm + prime stay untouched.

### 3d — the mount-clock (`scroll-choreography.css`) — add the squish leg
`gl-page-build` / `gl-cascade-build` gain a reciprocal `scale` that relaxes to 1, scaled by
`var(--motion-weight, 0.62)`. The display/hero beat reaches `var(--ease-cartoon-punch,
var(--ease-out))` (gravity-arrival, no bounce on type). `--i` stagger KEPT (the real
time-clock overlap). The `view()` `.scroll-cascade` arm stays `@supports`-gated, enhancement-only.

### 3e — `useStagger` / `useStaggerReveal` / `vReveal` — the 1/φ overlap on the TIME clock
- `useStagger` gains a `1/φ` overlap default (each item's reveal starts before the prior
  settles — `delayMs ≈ settle × (1/φ)`), the overlapping-action principle on a real clock.
- `vReveal` upgrade: on a `view()`-less engine, write the `--i` + `.scroll-build` hooks
  (mount-clock), NOT a bare fade. The directive stays dependency-free (it writes hooks; the
  CSS owns the keyframes) but the hooks now route to the cross-engine floor.

### 3f — `useSpringMount` — KEEP (it's fit)
Spring 0→1 position, drag-dismiss, PRM-snap via `useSpring`. No change beyond reading the
shared `--motion-weight` for its squish if a consumer opts in.

---

## 4 — Cross-engine (Chrome + Safari) + a11y/PRM

- **Mount clock + EVENT rAF spring**: plain `@keyframes` + `transform`/`opacity`/`filter` +
  rAF — **Safari 15-safe**, identical Chrome↔Safari. The `linear()` spring curves are
  Baseline 17.2+; the rAF JS spring (`springTimingFunction.fn`) needs NOTHING newer.
- **`filter: blur()` decongest** rides the surface's OWN pixels — never
  `backdrop-filter: url()` (WebKit hole), never clobbers the resting glass plate.
- **`view()` SCROLL clock** — `@supports (animation-timeline: view())`-gated; on Safari < 26
  the below-fold reveal degrades to its terminal state (content visible, no broken stage).
  It is enhancement, NEVER the load entrance.
- **PRM**: every arm keeps the fade, drops transform + squish + bounce + blur (P6). The
  mount-clock has its explicit `@media (reduce)` fade-only arm; the rAF leaves snap to
  settled. `--motion-weight → 0` zeroes squash/overshoot/anticipation/stagger in one
  assignment (Band-0 §L5).
- **Offscreen-pause**: any steady-state viz inside an entrance owns `useIntersectionPause`;
  entrances are one-shot (no steady-state loop), so no park needed beyond the existing
  `once` latch.

---

## 5 — Reconciliation vs the 116-wave set (no dup)

- **`W-LIQUID-REVEAL-FIX`** — this lens GROUNDS it: the root-cause is the
  element-vs-component ref class (confirmed live), the fix is the hoisted `asElement`
  resolver + the unreachable-fallback repair + the demo re-bind + the born-RED live π.
  The amendment ADDS: hoist the resolver to `motion/asElement.ts` (DRY with cta-receive),
  add the squish to the bloom, born-RED `tests-visual/liquid-reveal.spec.ts`.
- **`W-LIQUID-ENTRANCE-GENERAL`** — this lens SHARPENS P7c: the entrance must SQUISH (the
  gap — `useLiquidFlex` ships, no entrance consumes it). Adds the squish leg to the
  mount-clock + the 1/φ overlap to `useStagger`. The cross-engine clause is made explicit:
  the LOAD entrance is the mount-clock (Safari-15), `view()` is enhancement-only.
- **No new wave needed** — both existing waves absorb the amendments. The DELTA-ASSAY
  records: the resolver hoist (DRY), the squish-on-entrance (P7c instance), the
  default-inversion (cross-engine floor as primary).

## Fences honored
KISS (one resolver, three existing clocks, no new engine) · DRY (the resolver is hoisted,
not duplicated) · no re-fork (every arm is a shipped primitive; the leaves are REFINED, not
re-authored) · compositor-only + PRM-carved + Safari-default-to-floor · the squish is the
ONE `useLiquidFlex` engine · Band-0 deps (`--ease-cartoon-punch`/`--motion-weight`) are
`var(…, fallback)`-gated until they land · no legacy.
