# entrance-reveal — lens-c (AUDACIOUS CARTOON-TECHNICOLOR PUNCH)

> Greenfield redesign of the ENTRANCE + REVEAL motion systems — `useLiquidReveal`, the
> liquid-entrance general (squish/morph/fade), `useSpringMount` · `useStagger` ·
> `useStaggerReveal` · `vReveal` · `useBloomUp`, the mount-clock stagger
> (`.scroll-build`/`.scroll-cascade`). Reconciles **W-LIQUID-REVEAL-FIX** +
> **W-LIQUID-ENTRANCE-GENERAL**. Lens: 1940s technicolor FLOW & PUNCH — anticipation,
> exaggeration, follow-through, overlapping action, arcs, squash & stretch with real
> WEIGHT/INERTIA — the boldest variant that stays idiomatic + cross-engine.

---

## 0 — LIVE ROOT-CAUSE (the user's "useLiquidReveal DOESN'T SEEM TO WORK AT ALL")

**Reproduced live** on `http://localhost:5173/motion/reveal`, Chromium, both the JS leaf
and the CSS floor, with a MutationObserver on `style` + a per-rAF computed-style sampler.
The verdict is harder than "subtle": **the reveal is COMPLETELY DEAD — two independent
failures stacked, neither fires a single frame.**

### Defect 1 — `useLiquidReveal` writes ZERO inline styles (the binding-verification class)

The demo (`demo/stories/motion/reveal.vue:31-44`) does:

```ts
const surfaceRef = ref<HTMLElement | null>(null);   // bound via ref="surfaceRef" on a v-if div
const { reveal } = useLiquidReveal(surfaceRef, { trigger: triggerRef });
function toggleBloom() {
  open.value = !open.value;
  if (open.value) requestAnimationFrame(() => reveal());   // ← THE BUG
}
```

**Captured:** across the entire open, the `.glass-reveal` element's inline `style`
attribute stayed EMPTY (`getAttribute('style')` → `null`; MutationObserver caught **0**
style mutations). `useLiquidReveal.reveal()` ran but hit `if (!el) return` at line 157 —
`surface.value` was **null** at the moment the single `requestAnimationFrame` fired.

The mechanism (the [[glass-ui binding verification]] memory, exact recurrence of the
cta-receive P0): flipping `open.value = true` schedules a Vue re-render that mounts the
`v-if` div and *then* assigns `surfaceRef.value`. But that ref assignment lands in Vue's
**post-render flush**, which a single bare `requestAnimationFrame` does NOT reliably
follow — the rAF callback fires in the same paint frame the element mounts, *before* Vue
has flushed the template-ref binding. So `surface.value === null` → silent early-return.
`vue-tsc` + units pass (the call is type-correct); only live e2e catches the dead bloom.
This is precisely why the user says "at all."

### Defect 2 — the `.glass-reveal` CSS floor never transitions (the born-at-open trap)

Even with the JS leaf dead, the CSS recipe (`src/styles/glass/reveal.css`) *should* be the
"everywhere floor." It is NOT firing either. **Captured:** the surface's computed
`scale / opacity / filter` read `1 / 1 / blur(0px)` from the **first sampled frame
(t=35ms)** through settle — no entrance curve, ever.

The mechanism: the demo `v-if`-mounts the div with `data-state="open"` **already set**
(`reveal.vue:91`). CSS transitions require a *state change* between two committed style
states; an element born directly at `[data-state="open"]` has no `closed` frame to
interpolate FROM, so `transition-property: scale, …` has nothing to animate. (The recipe
was authored for reka portals that mount `closed` then flip `open` — the demo skips that.)

### Defect 3 — the entrance is NOT GENERAL + carries NO cartoon weight

The `v-reveal` stagger rows (the other pane) *do* fire on Replay (a remount), but they ride
`animation: reveal-rise 0.5s var(--spring-bouncy, ease-out)` — a flat rise+fade, **no
squish, no anticipation dip, no overshoot-arc, no cartoon cast**. And the entrance is
opt-in per-surface; CARDS, controls, list-items, dock-modules, demo sub-sections get
nothing (the T10 GAP). Screenshot confirms the rows render as **flat gray plates** (a
separate no-gray defect, but it proves the patchwork: the motion band's own entrance demo
is dead + gray).

### Source-verified build-DAG (live `getComputedStyle(:root)`)

| token | live | disposition |
|---|---|---|
| `--spring-snappy` / `-bouncy` / `-duration` | **PRESENT** (`linear(…)`, `0.4s`) | reuse |
| `--shadow-cartoon` | **PRESENT** (`3px 3px 0 0 color-mix(…)`) | reuse (the cast) |
| `--ease-cartoon-punch` | **ABSENT** | **depend-on** Band-0 `motion-spring-register` |
| `--motion-weight` | **ABSENT** | **depend-on** Band-0 `motion-spring-register` |

So the cartoon punch + weight scalar are a hard upstream dependency (the
`motion-spring-register` GOLDEN ships the `linear()` + the `@property` — this wave CONSUMES
them, never re-mints). `ElementMorph` + `springTimingFunction` + `springPreset` are
shipped + re-exported on `/motion` (verified in `useLiquidReveal.ts:53-59`).

---

## 1 — THE CORE IDEA: ONE entrance kernel, the "CEL-SLAM" arc, driven by ONE directive

The status quo is a *patchwork of five half-wired primitives* (`useLiquidReveal` dead,
`.glass-reveal` born-at-open, `vReveal` flat, `useStagger`/`useStaggerReveal` two cousins,
`useSpringMount` for sheets only) plus a CSS mount-clock (`.scroll-build`) that *works* but
carries no punch. The greenfield is not five fixes — it is **ONE kernel with three
drivers**, all riding the SAME cartoon arc and the SAME `--motion-weight` governor:

```
                    THE CEL-SLAM ARC  (one keyframe shape, weight-scaled)
   anticipation dip  →  launch  →  PUNCH overshoot  →  squash-settle  →  rest
   (squish ↓, sink)     (rise)    (scale > 1, lift)    (vol-preserve)    (1.0)
        │                                                                  │
        └──────────── --ease-cartoon-punch · --motion-weight ─────────────┘
                              + the LAGGING CARTOON CAST (::after, +8% later)

   ┌─ MOUNT-CLOCK (Safari-safe floor) ──── .scroll-build / .scroll-cascade-cel ─┐
   │     plain @keyframes-on-mount, --i index stagger, EVERY engine             │
   ├─ VIEW-TIMELINE (enhancement) ──────── @supports(animation-timeline:view()) ┤
   │     below-fold scroll-reveal, compositor, Chrome+Safari-17, never required │
   └─ JS SOURCE-RECT BLOOM (the headline) ─ useLiquidReveal (FIXED) + useBloomUp ┘
         ElementMorph FLIP from a trigger/source rect, spring-clocked
```

**The grammar collapses to ONE consumer verb: `v-liquid-enter`** (a directive) + its CSS
twin `.liquid-enter` — the calibrated cartoon entrance EVERY surface opts into. It composes
the shipped `.glass-reveal` channels (scale/opacity/filter-blur) + `useLiquidFlex` squish +
the new `--ease-cartoon-punch` arc + the `--shadow-cartoon` lagging cast. The three drivers
(mount-clock / view-timeline / JS bloom) are *layers of the same arc*, feature-detected, a
single writer each — never a double-run.

**This is a UNION, not a re-fork.** `useLiquidReveal` is repaired (not replaced);
`.glass-reveal` is the channel substrate `v-liquid-enter` extends; `useStagger`/
`useStaggerReveal` collapse into one; `.scroll-build` gets the cartoon-punch arc overlaid;
`useBloomUp`/`useSpringMount`/`useDockCtaReceive` stay the specialized FLIP/sheet/CTA
siblings of the same `ElementMorph`+`springTimingFunction` family.

---

## 2 — THE SINGLE BOLDEST MOVE: the CEL-SLAM with a LAGGING CARTOON CAST that overshoots PAST the spring fence and the shadow ARRIVES LATE

The calm Liquid-Glass springs are bounded to ≤10% overshoot (the "too-springy" fence). The
audacious register deliberately **breaks past it** — but *only* through the shaped
`--ease-cartoon-punch` `linear()` (a curve no damped spring can express, because it has a
genuine **negative anticipation leg**: it dips ~4% *below* origin before launching). The
entrance does the full Disney arc in one compositor-only keyframe:

```css
/* src/styles/glass/liquid-enter.css — the .liquid-enter cel-slam (the greenfield recipe) */
@keyframes gl-liquid-enter {
  0%   { opacity: 0;                                    /* ── ANTICIPATION ── */
         transform: translate3d(0, calc(14px * var(--motion-weight)), 0)
                    scale(calc(1 - 0.12 * var(--motion-weight)),   /* squish DOWN  */
                          calc(1 + 0.06 * var(--motion-weight)));  /* (vol-preserve)*/
         filter: blur(var(--liquid-enter-blur, 4px)); }
  62%  { opacity: 1;                                    /* ── THE PUNCH ── (past fence) */
         transform: translate3d(0, calc(-3px * var(--motion-weight)), 0)
                    scale(calc(1 + 0.10 * var(--motion-weight)),   /* stretch UP   */
                          calc(1 - 0.05 * var(--motion-weight)));  /* (vol-preserve)*/
         filter: blur(0); }
  100% { opacity: 1; transform: none; filter: blur(0); }  /* ── FOLLOW-THROUGH SETTLE ── */
}
.liquid-enter {
  animation: gl-liquid-enter var(--liquid-enter-dur, 0.62s)
             var(--ease-cartoon-punch, var(--spring-bouncy)) both;  /* fence-break curve */
  transform-origin: var(--liquid-enter-origin, center);
  will-change: transform, opacity, filter;
}
```

**The lagging cartoon cast — the single boldest move.** A `box-shadow` *cannot lag a
transform* (both repaint on the same element in lockstep). So the cast is painted on a
`::after` shadow-caster layer carrying `--shadow-cartoon`, animated on its OWN clock
**+8% later** — the object slams in, and its bold technicolor shadow *catches up a beat
behind* (overlapping action — the cel-animation read where the drop-shadow trails the cel):

```css
.liquid-enter::after {
  content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit;
  box-shadow: var(--shadow-cartoon);                 /* the warm/ink offset-stamp, re-tints by mode */
  animation: gl-cast-lag var(--liquid-enter-dur, 0.62s)
             var(--ease-cartoon-punch, var(--spring-bouncy)) both;
  animation-delay: calc(0.06s * var(--motion-weight));   /* the LATE arrival */
}
@keyframes gl-cast-lag {
  0%   { opacity: 0; transform: translate3d(0, calc(10px * var(--motion-weight)), 0) scale(0.92); }
  100% { opacity: 1; transform: none scale(1); }
}
```

The result is the iOS-27 **squish→overshoot→settle** with a 1940s-technicolor PUNCH: the
surface anticipates (sinks + squishes), launches with weight, overshoots PAST the spring
ceiling, then squash-settles — and its bold offset shadow lands a beat behind, so the whole
thing reads as a single weighted cel slammed onto the page. **The amplitude is governed by
ONE number** (`--motion-weight`, rest `1/φ ≈ 0.618`): weight 0 ⇒ no visible punch (PRM, or
an observer carousel), weight 1 ⇒ the full celebration slam. Co-scaled, never four
unrelated tics.

---

## 3 — THE THREE DRIVERS (one arc, feature-detected, single-writer each)

### Driver A — MOUNT-CLOCK (the SHIPPED Safari-safe floor — the default)

The `story-page-standard` finding is binding: **`view()` is Safari-26-only for entry
ranges; the entrance MUST be the mount-clock `.scroll-build`/`.scroll-cascade` (Safari-15-
safe, the `--i` index), NOT a `view()`-timeline that skips to a plain fade on Safari.**

So `v-liquid-enter` defaults to the **mount-clock** — a plain `@keyframes`-on-mount
`.liquid-enter` (the cel-slam above), fired the instant the element mounts, staggered by
`--i` (the directive sets it, the same hook `.scroll-build` already reads at
`scroll-choreography.css:90`). This runs on **every engine** — no `@supports` gate, no
timeline. Under PRM it never binds the spatial keyframe; the reduce-arm keeps a coupled
fade only (the existing `.scroll-build` PRM precedent at `scroll-choreography.css:111`).
This is the floor that makes the entrance *general* (T10 GAP 1): cards, controls, list-
items, demo sub-sections all opt in with one directive, and Safari reads identically.

`.scroll-build` is AUGMENTED (not re-forked): its terminal `gl-page-build` keyframe gains
the cartoon-punch arc + the lagging cast (an opt-in `.scroll-build-cel` modifier) — the
page-build BEATS slam in with weight instead of a flat rise.

### Driver B — VIEW-TIMELINE (the below-fold ENHANCEMENT — never required)

For below-fold content that should reveal *on scroll*, `.scroll-cascade` rides the native
`view()` timeline under `@supports ((animation-timeline: view()) and (animation-range:
entry))` — the implicit per-child stagger, compositor-driven, zero `setTimeout`. This is an
**enhancement layer**: an engine without `view()` entry-ranges (older WebKit) falls to the
mount-clock floor (Driver A) — the content still reveals with the cel-slam, just on mount
instead of on scroll. `useStaggerReveal`'s `NATIVE_VIEW_TIMELINE` dual-path-single-writer
discipline (`useStaggerReveal.ts:26-39`) is the precedent and is REUSED verbatim. **A
`view()` timeline never degrades to a plain fade — it degrades to the mount-clock cel-slam.**

### Driver C — JS SOURCE-RECT BLOOM (the headline — `useLiquidReveal` REPAIRED)

The dialog-from-button / dock-from-pill / album-pill→sheet bloom: the surface materializes
FROM a trigger's rect via the `ElementMorph` FLIP inversion, spring-clocked. This is the
existing `useLiquidReveal` mechanism — **it is sound; only its WIRING is broken.** The fix:

1. **Element-resolution guard (the cta-receive `asElement` precedent).** Accept
   `HTMLElement | ComponentPublicInstance`; resolve `.$el`. (`Button ref="triggerRef"`
   happened to forward the DOM node here, but the guard makes it robust for any reka
   portal / component trigger — the class the memory flags.)
2. **Mount-safe arm (the load-bearing fix for Defect 1).** Replace the demo's fragile bare
   `requestAnimationFrame(() => reveal())` with an arm that WAITS for the ref to resolve:
   the composable exposes `revealWhenReady()` that does `nextTick()` (Vue post-render flush,
   so `surface.value` is bound) **then** a double-rAF before driving the spring. A null
   surface at first tick re-schedules once (a one-shot `watch(surface, …, { flush: 'post'
   })` that fires the pending reveal the instant the element binds). No more silent
   early-return.
3. **Cartoon-arc the JS bloom too.** The rAF `step()` already drives scale/opacity/filter
   off `easing.fn(t)`; the headline bloom gains the SAME `--motion-weight`-scaled squish on
   the FLIP (the `ElementMorph` apply gets a paired vol-preserving stretch on the travel
   axis via `useLiquidFlex`, capped LOW). The bloom now reads liquid, not a flat scale.
4. **Born-at-open fix for the CSS floor (Defect 2).** The `.glass-reveal` recipe stays the
   reka-portal floor (mounts `closed`→flips `open`); for `v-if`-mounted-at-open consumers
   the directive `.liquid-enter` mount-clock is the correct path (it fires on mount, no
   state-change needed). The demo is re-pointed to `v-liquid-enter` so it actually animates.

All three drivers share `springTimingFunction(springPreset('bouncy'|'snappy'))` + the
`--ease-cartoon-punch` curve + `--motion-weight` — **ONE family, one governor.**

---

## 4 — THE STAGGER (overlapping action on a TIME clock, the 1/φ overlap)

`useStagger` (unconditional timer) + `useStaggerReveal` (IO-gated) are two cousins of one
idea. The greenfield collapses the SHARED core: **the stagger is an overlapping-action
cascade on a TIME clock, NOT a view timeline** (per the brief's point 4). Each child's
entrance begins before its predecessor settles — the **1/φ overlap**: child *i* starts at
`i · step · (1/φ)` where `step` is one entrance duration, so consecutive cels overlap by
`1 − 1/φ ≈ 0.382` of their arc (the golden overlap — present, alive, never a rigid
metronome). This is Disney's *follow-through/overlap* (§L4 principle 5) made proportional.

- **CSS path (the default):** `.scroll-cascade-cel > *` sets `animation-delay: calc(var(
  --i) * var(--liquid-stagger-step) * 0.618)`. The `--i` index is the same hook
  `.scroll-build` reads; `vReveal` writes it (`--d`). One directive, one index, one clock.
- **JS path (when a count/IO gate is needed):** the merged `useStaggerReveal` keeps the
  `NATIVE_VIEW_TIMELINE` dual-path (CSS owns it when `view()` is present; the IO observer is
  the fallback writer) — but the *fallback* timer cascade now uses the 1/φ overlap, not a
  rigid `staggerMs * idx`. `useStagger` (the unconditional cousin) folds in as the
  `immediate: true, gate: 'none'` mode of the same composable (DRY — one stagger engine).
- `vReveal` stays the dependency-free directive: it writes `--i` (renamed from `--d` for
  one canonical index name) + `data-reveal`; the consumer CSS is now the shipped
  `.liquid-enter` cel arc, not a hand-rolled `reveal-rise` (the demo's scoped fork retires).

PRM: the cascade flushes every slot synchronously (the existing `useStagger` `flushAll`
precedent) — no timeline, fade-only.

---

## 5 — CROSS-ENGINE (§L7 — Chrome AND Safari, the paired-engine floor)

| channel | Chrome | Safari | fence |
|---|---|---|---|
| cel-slam keyframe | `@keyframes` on mount | identical | mount-clock = every engine, no gate |
| `--ease-cartoon-punch` `linear()` | Baseline | Baseline 17.2+ | a raw `linear()` curve; `var(…, --spring-bouncy)` fallback for <17.2 |
| `--motion-weight` `@property <number>` | Houdini | Baseline (typed) | interpolates the squish; bare `var` fallback `0.618` |
| `filter: blur()` decongest | surface's OWN pixels | identical | NEVER `backdrop-filter` (the fragile per-frame re-blur — T10 GAP 3) |
| `.scroll-cascade` `view()` | Chrome 115+ | Safari 17+ (entry-range 26 for some) | `@supports`-gated; falls to mount-clock cel-slam, NEVER a plain fade |
| `ElementMorph` FLIP | compositor `translate+scale` | identical | a transform; no engine extension |
| `--shadow-cartoon` cast | `box-shadow` on `::after` + `transform` | identical | the cast TRANSFORM is compositor; the box-shadow is static-painted (animated via the layer's transform, never an animated `box-shadow`) |

The acceptance proof is a **paired-engine π** (Chromium + WebKit captures), both modes,
never a single-engine green — the cel-slam squishes (scale ≠ 1 mid-flight + X·Y ≈ 1
vol-preserving), overshoots PAST 1.0, settles to 1.0, with the cast arriving a beat behind,
on BOTH engines. Born-RED on the current dead-on-arrival tree (the live readback: `scale 1,
opacity 1` from frame 0 — no entrance at all).

---

## 6 — A11Y / PRM CARVE

- **PRM (`prefers-reduced-motion: reduce`)** → `--motion-weight: 0` (the §L5 single
  assignment zeroes the squash, overshoot, anticipation, arc, and stagger together) AND
  `--ease-cartoon-punch: var(--ease-standard)` (belt-and-suspenders). Every entrance
  collapses to a **coupled fade-only** on `--duration-fast` — no translate, no scale, no
  blur frames, no cast travel, no stagger (single calm paint). The surface still FUNCTIONS
  (it appears) — the fade survives (opacity is not a vestibular trigger; scale/translate/
  blur are). This is the existing `.scroll-build` reduce-arm + `useStagger.flushAll` +
  `useLiquidReveal.respectReducedMotion` precedents, unified.
- **`prefers-contrast: more`** → the `--shadow-cartoon` cast opacity floors UP (the inked
  edge is a legibility asset, per §Shadows).
- **`prefers-reduced-transparency`** → does NOT touch the cast (opaque ink, a bonus
  legibility anchor) and the glass plate falls to its opaque arm (inherited from the glass
  recipe, not this wave's concern).
- The cast is a `::after` with `z-index: -1` — never interactive, never in the a11y tree.

---

## 7 — DEFT INTEGRATION (the UNION, not a bolt-on)

| extant artefact | disposition |
|---|---|
| `useLiquidReveal` | **REPAIRED** — element-resolution guard + mount-safe `revealWhenReady` arm + cartoon squish on the FLIP. Same `ElementMorph`+`springTimingFunction` core. |
| `.glass-reveal` (reveal.css) | **KEPT** as the reka-portal closed→open floor; the channel substrate `.liquid-enter` extends. |
| `useBloomUp` | **KEPT** — the source≠dest FLIP + 4th color channel; a specialized sibling of the same family. Gains the cartoon squish. |
| `useSpringMount` | **KEPT** — the sheet/dialog drag-dismiss mount; reads `--motion-weight` for its overshoot share. |
| `useDockCtaReceive` | **KEPT** — the CTA→dock morph; same substrate. |
| `useStagger` + `useStaggerReveal` | **MERGED** into one stagger engine (gate: `none`/`io`/`time`), the 1/φ overlap, dual-path-single-writer kept. |
| `vReveal` | **KEPT** — writes the canonical `--i` index + `data-reveal`; consumer CSS re-points to the shipped `.liquid-enter` (the demo's scoped `reveal-rise` fork RETIRES). |
| `.scroll-build` / `.scroll-cascade` | **AUGMENTED** — the cel-slam arc + lagging cast overlaid (opt-in `-cel` modifier); the mount-clock floor + view() enhancement structure UNCHANGED. |
| `--ease-cartoon-punch`, `--motion-weight` | **DEPEND-ON** Band-0 `motion-spring-register` (ABSENT in src — verified live). This wave CONSUMES; never re-mints. |
| `--shadow-cartoon` | **REUSED** as the cast (PRESENT live). |
| `useLiquidFlex` | **REUSED** as the ONE squish engine (no second `tanh` write — the L3 fence). |

**Mints:** the `v-liquid-enter` directive + `.liquid-enter` recipe (the ONE entrance verb),
the merged stagger engine, the `.scroll-build-cel`/`.scroll-cascade-cel` modifiers, and the
test-gap closure `tests-visual/liquid-reveal.spec.ts` (the binding-verification e2e that
DRIVES the real open→bloom — born-RED on the current dead tree, the gap that let the reveal
ship dead). No new spring family, no new squish engine, no JS scroll runtime.

---

## 8 — THE DELTA-ASSAY (reconcile vs the 116-wave set — no dup)

This brainstorm reconciles **W-LIQUID-REVEAL-FIX** (the JS leaf repair) + **W-LIQUID-
ENTRANCE-GENERAL** (the universal P7 law) WITHOUT duplicating either:

- **W-LIQUID-REVEAL-FIX** owns the §0 Defect-1/2 repair (element-resolution + mount-safe arm
  + the born-at-open re-point + the e2e gap). The greenfield SHARPENS its root-cause from
  "likely the ref class" to the **proven** dual failure (JS leaf null-ref + CSS born-at-open),
  with the live captured DELTA (0 inline writes, scale 1 from frame 0).
- **W-LIQUID-ENTRANCE-GENERAL** owns the §1-§4 universal law (the cel-slam arc, the
  `v-liquid-enter` verb, the mount-clock-vs-view() Safari structure, the 1/φ stagger, the
  `--motion-weight` governor). The greenfield gives it the **boldest variant** (the lagging
  cartoon cast past the spring fence) while staying inside P7's compositor-only + PRM +
  native-first fences.
- **No new wave is minted** — the two existing waves ABSORB this design (REVEAL-FIX = the
  driver-C repair; ENTRANCE-GENERAL = the kernel + drivers A/B + stagger). The only new
  artefact is the e2e test (booked under REVEAL-FIX) + the Band-0 dependency edge
  (`motion-spring-register` → both waves, already a stated DAG dep).

**The gestalt bar:** the reveal FIRES (a captured frame-series of the JS bloom + the
mount-clock cel-slam, both showing scale ≠ 1 mid-flight then settle) AND the entrance reads
liquid (squish + anticipation + PUNCH overshoot + lagging cast), both modes, both engines —
born-RED on today's dead-on-arrival surface.
