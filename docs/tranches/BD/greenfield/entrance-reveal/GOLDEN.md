# GOLDEN — the ENTRANCE + REVEAL motion system (the canonical reference)

> Synthesis of lens-a (PURE iOS-27 fidelity), lens-b (cross-engine / perf-first), lens-c
> (AUDACIOUS cartoon-technicolor punch). Scope: `useLiquidReveal` (the FLIP/source-rect bloom),
> the liquid-entrance general (squish/morph/fade), `useSpringMount` · `useStagger` ·
> `useStaggerReveal` · `vReveal` · `useBloomUp`, the mount-clock stagger
> (`.scroll-build`/`.scroll-cascade`). Reconciles **W-LIQUID-REVEAL-FIX** +
> **W-LIQUID-ENTRANCE-GENERAL**. Charter rows: IOS27-REFERENCE T10 (liquid entrance general) +
> T5/T14 (bloom-up / capsule materialize). **A UNION, no re-fork; KISS/DRY; NO legacy.**

---

## 0 — What the three lenses agreed, where they fought, and how the GOLDEN resolves it

**The three concur on the diagnosis** (all root-caused live on `/motion/reveal`, Chromium, both
modes, captured frame-series — born-RED is real and held):

1. **`useLiquidReveal` is DEAD-ON-ARRIVAL — two stacked defects, not one.**
   - **(α) the component-ref crash** (lens-a §0a, lens-b §0). `reveal.vue:84` binds
     `<Button ref="triggerRef">`. `Button` is a Vue component → `triggerRef.value` is the
     **public instance**, not the `<button>`. `useLiquidReveal.ts:165-167` does
     `triggerEl.getBoundingClientRect()` on it → **`TypeError: not a function`, thrown
     synchronously inside `reveal()` before a single frame arms**. The fallback (a self-scale
     bloom, lines 166-176) is *unreachable* because the instance is truthy, not null. This is
     the [[glass-ui binding verification]] / cta-receive P0 class verbatim.
   - **(β) the mount-race** (lens-c §0 Defect-1). The demo flips `open=true` then fires a
     **single** `requestAnimationFrame(() => reveal())` (`reveal.vue:40`). The `v-if` div mounts
     and `surfaceRef.value` is assigned in Vue's **post-render flush**, which one bare rAF does
     not reliably follow → `surface.value === null` → silent early-return at `useLiquidReveal.ts:158`
     (`if (!el) return`). Even with α fixed, β can still no-op a slow mount.
   - Confirmed: across the whole open, the `.glass-reveal` div's inline `style` stays empty
     (0 mutations), computed `transform: none · opacity: 1 · filter: blur(0)` from frame 0. The
     JS bloom writes **nothing**. The user's "doesn't seem to work at all" is literal.

2. **The entrance is NOT GENERAL and carries NO squish.** `v-reveal`'s consumer keyframes
   (`reveal.vue`) and the `.scroll-build`/`.scroll-cascade` mount-clock all do **fade + translateY
   on a spring** — good *weight*, but no `useLiquidFlex` reciprocal squish, no anticipation, no
   overshoot ARC. The one recipe that *does* squish — `.glass-reveal` (scale `0.88→1` + fade +
   blur-settle, `glass/reveal.css`) — is **scoped to top-layer reka overlays**; cards, rows,
   controls, dock-modules, demo sub-sections get the flat fade. This is exactly IOS27-REFERENCE
   T10's stated gap: **generalization + grace + Safari**.

3. **The cross-engine law is settled and BINDING** (all three; story-page-standard DELTA-ASSAY):
   `view()` shipped **Safari 26 (late-2025)** — on most Safari today a `view()`-timeline entrance
   is **skipped to a plain fade**, AND `animation-delay` is a **no-op on a `view()` timeline**
   (delay is a clock offset; a view timeline maps to scroll progress) → the 1/φ overlap stagger
   **cannot live on `view()`**. Therefore the LOAD entrance is the **shipped `.scroll-build`/
   `.scroll-cascade` mount-clock + the `--i` time-clock stagger** (Safari-15-safe); `view()` is a
   below-fold scroll-reveal **enhancement only**, `@supports`-gated, and it **degrades to the
   mount-clock cel-slam, NEVER to a flat fade**.

**The Band-0 token DAG is source-verified** (live `getComputedStyle(:root)` + grep `src/`):

| token | state in `src/` | disposition |
|---|---|---|
| `--spring-snappy` / `-bouncy` / `-dock` + `--spring-*-duration` | **PRESENT** (`scheme-motion.css`) | reuse |
| `--shadow-cartoon` (bare, `3px 3px 0 0`) + `--shadow-cartoon-{sm,md,lg}` | **PRESENT** (`tokens/dark-arm.css`, `tokens.css`) | reuse as the cast |
| `--ease-cartoon-punch` | **ABSENT** | **depend-on** Band-0 `motion-spring-register`; `var(…, fallback)` |
| `--motion-weight` | **ABSENT** | **depend-on** Band-0 `motion-spring-register`; `var(…, 0.618)` |
| `useLiquidFlex` (`maxStretch`/`squishLaw:"tanh"`, writes `--stretch`) | **PRESENT** | reuse — the ONE squish engine |
| `ElementMorph` + `springTimingFunction` + `springPreset` | **PRESENT** (`@mkbabb/keyframes.js`, re-exported on `/motion`) | reuse |
| `asElement` resolver | **PRESENT but PRIVATE** in `useDockCtaReceive.ts:170` | HOIST to shared module (DRY) |
| `.cartoon-cast` `::after` caster child | **ABSENT** | the cast rides a child layer (NOT `::after{box-shadow}` — WebKit hole) |

**Where the lenses fought, and the GOLDEN ruling:**

| Tension | lens-a | lens-b | lens-c | **GOLDEN resolution** |
|---|---|---|---|---|
| **Audacity of the entrance** | bouncy-spring squish + cartoon-punch as a depend-on *upgrade* (no negative dip until Band-0) | simplest spring overshoot; squish low-cap | the **CEL-SLAM**: ~4% anticipation dip + ~22% PUNCH overshoot + a **lagging cartoon cast +8% late** | **Take lens-c's cel-slam ARC as the calibrated target, but gated behind `--ease-cartoon-punch` (Band-0) with lens-a's bouncy-spring floor** — the dip/punch is a `var()` upgrade, GREEN before Band-0, audacious after. The lagging cast is **opt-in** (`.is-cel`), not the universal default (it costs a layer + a second clock). |
| **The reveal fix** | `asElement` hoist + retry-once on zero-rect | `asElement` hoist (the load-bearing engine fix) + reachable fallback | `asElement` + `revealWhenReady()` (`nextTick` + double-rAF + a `watch(surface,…,{flush:'post'})` one-shot) | **All three, layered**: hoist `asElement` (closes α at the engine), AND add `revealWhenReady()` (closes β at the engine), AND a born-RED e2e. The composable is correct-by-construction for *both* mis-bind classes. |
| **The stagger** | 1/φ overlap on the time clock | 1/φ overlap as a first-class `useStagger` knob | **MERGE** `useStagger`+`useStaggerReveal` into one engine (gate: none/io/time) | **1/φ overlap is canon on the TIME clock**; KEEP `useStagger` + `useStaggerReveal` as the two shipped cousins (they are fit — DRY says don't merge two working composables for its own sake), but give BOTH the 1/φ overlap default and make `useStaggerReveal`'s `NATIVE_VIEW_TIMELINE` inert-path the single-writer law. A merge is a *follow-on* refactor, not a precondition. |
| **`.glass-reveal` disposition** | promote its 4 channels to the universal `.liquid-enter` | keep as reka floor; add squish to mount-clock | keep as reka closed→open floor; `.liquid-enter` is the channel substrate it extends | **`.liquid-enter` is the universal mount recipe** (lens-a), expressed as `@keyframes-on-mount` (so it fires for `v-if`-born-at-open surfaces — lens-c Defect-2's cure); `.glass-reveal` STAYS the reka closed→open transition floor (it is correct for portals). They share the SAME four channels + spring family. No fork. |

**The single coherent GOLDEN:** ONE entrance grammar (four coupled channels on one spring clock),
THREE orchestration registers (MOUNT / SCROLL / TRIGGER), ONE squish engine (`useLiquidFlex`), ONE
spring family (`SPRING_PRESETS`), ONE resolver (hoisted `asElement`), ONE governor (`--motion-weight`).
The flat fade dies; the dead bloom lives; the squish becomes non-optional; the cel-slam is the
audacious upgrade the moment Band-0 lands.

---

## 1 — The grammar: every entrance is a `LIQUID ENTER` = four coupled channels on one spring clock

| # | Channel | Property | Curve | The iOS-27 read |
|---|---|---|---|---|
| 1 | **SPATIAL — bloom** | `scale` (+ `translate` for FLIP/rise) | `--ease-cartoon-punch` ⟶ fallback `--spring-bouncy`/`-snappy` | squish-grow `0.88→1` with overshoot to ~`1.03`, then settle; the cel-slam adds the ~4% anticipation dip + ~22% punch when Band-0 lands |
| 2 | **SQUISH — volume** | reciprocal `--stretch` (`scale: s · 1/s` on the travel axis) | `useLiquidFlex` `tanh`, cap `1.08` (gel, not taffy) | volume-preserving deform — the long axis swells AS it travels, the short pinches; **MORE on a faster mount**; born wide+flat (≈`1.06 · 0.945`), settles square |
| 3 | **EFFECTS — fade** | `opacity 0→1` | `--ease-out` (NEVER a bounce — a fade must not overshoot) | coupled so scale+fade read as ONE coalescing layer (design.md P3) |
| 4 | **EFFECTS — decongest** | `filter: blur(b)→blur(0)` | the SAME spring clock as SPATIAL | the iOS light-bending modulation — the surface CLARIFIES as it blooms; on the surface's OWN pixels (`filter`, **NEVER** `backdrop-filter` — the resting glass plate is untouched + the WebKit per-frame-reblur hole is avoided) |

This is `.glass-reveal`'s exact channel set, **promoted from an overlay-only recipe to the
universal entrance grammar**. Channel 2 (squish) is the new leg the flat `v-reveal`/`.scroll-build`
lacked. The four channels are governed by ONE number — `--motion-weight` (rest `1/φ ≈ 0.618`):
weight 0 ⇒ no visible punch (PRM / a carousel observer), weight 1 ⇒ the full celebration slam.
Co-scaled, never four unrelated tics (design.md §L5 single-assignment cascade).

### The three registers (ONE grammar, three orchestration scopes — NOT three engines)

```
                 THE LIQUID-ENTER ARC  (one keyframe shape, --motion-weight-scaled)
   anticipation dip  →  launch  →  PUNCH overshoot  →  squash-settle  →  rest
   (squish↓, sink)      (rise)     (scale>1, lift)     (vol-preserve)    (1.0)
        └──────── --ease-cartoon-punch · --motion-weight ────────┘  + the LATE cast (.is-cel)

   ┌─ MOUNT register (Safari-15 floor, the DEFAULT) — .liquid-enter / .scroll-build / .scroll-cascade
   │     plain @keyframes-on-mount, --i 1/φ overlap stagger, EVERY engine, zero-JS
   ├─ SCROLL register (below-fold ENHANCEMENT) — @supports(animation-timeline: view())
   │     per-child view() timeline, degrades to the MOUNT cel-slam, NEVER a flat fade
   └─ TRIGGER register (the JS headline) — useLiquidReveal (FIXED) + useBloomUp
         ElementMorph FLIP from a trigger/source rect, springTimingFunction-clocked, + squish
```

---

## 2 — The mechanism, per register

### 2a — TRIGGER register: `useLiquidReveal` (+ `useBloomUp`) ALIVE — the cta-receive cure, defense-in-depth

**Two coupled engine fixes + one squish add. The bloom mechanism is correct; only its wiring was broken.**

**Fix α — hoist `asElement` to a shared module (DRY), resolve through it.**

`src/composables/motion/asElement.ts` (NEW — the 8-line resolver lifted verbatim from
`useDockCtaReceive.ts:170-177`, which then DELETES its private copy and imports the shared one —
no two authorities):

```ts
import type { ComponentPublicInstance } from "vue";
export function asElement(
    v: HTMLElement | ComponentPublicInstance | null | undefined,
): HTMLElement | null {
    if (!v) return null;
    if (v instanceof HTMLElement) return v;
    const el = (v as ComponentPublicInstance).$el; // a component → its host element
    return el instanceof HTMLElement ? el : null;   // Fragment root → null → self-scale fallback (never throws)
}
```

In `useLiquidReveal.ts`: widen `trigger?: Ref<HTMLElement | ComponentPublicInstance | null>` and
`reveal()` reads `const triggerEl = asElement(options.trigger?.value)`. Resolves the `$el` → the
source-rect FLIP blooms from the real button rect; resolves `null` (genuinely unbound) → the
**existing self-scale fallback fires** (now reachable). Apply the resolver to `surface`/`dest`
refs too (a consumer could bloom a `<Card>`). `useBloomUp` gets the SAME treatment on its
`source` / `dest` / `field` refs (it `getBoundingClientRect`s all three).

**Fix β — `revealWhenReady()`, the mount-safe arm.** The composable exposes `revealWhenReady()`
that does `await nextTick()` (Vue post-render flush → `surface.value` is bound) **then** a
double-`rAF` before driving the spring; if `surface.value` is still null (or its rect is zero —
mid-mount), it installs a one-shot `watch(surface, run, { flush: "post" })` that fires the pending
reveal the instant the element binds. **No more silent early-return, no more single-bare-rAF race.**
The demo re-points its `requestAnimationFrame(() => reveal())` to `revealWhenReady()`.

**The squish add.** The rAF `step()` already drives scale/opacity/filter off `easing.fn(t)`; the
FLIP gains the SAME `--motion-weight`-scaled `useLiquidFlex` paired vol-preserving stretch on the
travel axis (capped `1.08`, PRM-off) so the bloom DEFORMS at peak velocity, not a flat scale. The
three existing channels (scale+fade+blur-settle) + compositor-only + PRM-snap floors are KEPT
byte-for-byte.

**The e2e gap (born-RED):** `tests-visual/liquid-reveal.spec.ts` DRIVES the real open→bloom and
asserts a non-`none` transform + `filter: blur(Npx)→blur(0)` mid-flight — **born-RED on HEAD** (the
spec fails on the `TypeError` + the empty-inline-style). This is the binding-verification e2e the
absence of which let the reveal ship dead.

### 2b — MOUNT register: `.liquid-enter` recipe — promote `.glass-reveal` to the universal floor + add squish

`src/styles/glass/liquid-enter.css` (NEW partial) — `.glass-reveal`'s four channels as a mount
`@keyframes` (fires on mount, so a `v-if`-born-at-open surface animates — lens-c Defect-2's cure;
a CSS transition needs a state-change a born-at-open element lacks, an `@keyframes` does not).

**CHALLENGE-FOLD (Bug A — the single transform authority, live-proven):** the squish leg MUST ride the
`scale:` LONGHAND, never a SECOND `transform: scale()`. Two live-proven failures of the
`scale:0.88 + transform:scale(1.06,0.945)` form: (1) they COMPOSE (CSS Transforms L2) → net area 0.776,
born isotropically shrunk, vol-preservation BROKEN; (2) a keyframe `transform:scale()` REPLACES a base
centering `transform:translate(-50%,-50%)` → a centered surface snaps to the corner. Both verified live
(`DELTA-ASSAY §2 Bug A`). The fix: ONE `scale:` longhand carrying the reciprocal squish (born `1.06 0.945`
→ settles `1 1`, vol-preserving product 1.002); the bloom-from-small GRACE is the coupled `translate:`
rise + the blur decongest + the fade, NOT an isotropic shrink (folding 0.88 in keeps the 0.776 shrink).
**NO `transform:` shorthand anywhere — the §4 cross-engine law the prior code block violated.**

**The base register** (the graceful floor, GREEN before Band-0) — a 2-stop squish-grow on the
bouncy/snappy spring; the spring's `linear()` overshoot interior gives the calibrated iOS bounce:

```css
@media (prefers-reduced-motion: no-preference) {
  @keyframes gl-liquid-enter {
    0%   { opacity: 0;
           /* SQUISH on the scale: LONGHAND — born wide+flat (vol-preserving, sx·sy ≈ 1.002), settles
              square. The bloom-GRACE is the coupled translate-rise + blur + fade, NOT an isotropic
              shrink (a 0.88 multiplier would re-introduce the 0.776-area shrink — DELTA-ASSAY §2). When
              a JS clock is present, --stretch is written live and paired reciprocally on THIS longhand. */
           scale: var(--lq-stretch-x, 1.06) var(--lq-stretch-y, 0.945);
           translate: 0 var(--lq-enter-rise, 0.5rem);       /* SPATIAL rise on the LONGHAND (composes) */
           filter: blur(var(--lq-enter-blur, 4px)); }        /* DECONGEST — surface's OWN pixels */
    100% { opacity: 1; scale: 1 1; translate: 0 0; filter: blur(0); }
  }
  .liquid-enter {                                            /* BIND ONLY .liquid-enter (Bug B — never
                                                                re-target .scroll-build > * here) */
    animation: gl-liquid-enter var(--spring-snappy-duration) var(--spring-snappy) both;
    animation-delay: calc(var(--lq-enter-step,
                          calc(var(--lq-enter-duration, var(--spring-snappy-duration)) * 0.618))
                        * var(--i, 0));                       /* 1/φ overlap, keyed off THIS register's clock */
    transform-origin: var(--lq-enter-origin, center);
  }
  .liquid-enter.is-display {
    animation-timing-function: var(--ease-out);   /* type arrives with GRAVITY, no bounce (W-HIERARCHY2) */
  }
}
```

> `.scroll-build`/`.scroll-cascade` are AUGMENTED **in place** — `gl-page-build`/`gl-cascade-build` gain
> the `scale:`-longhand squish leg + the `-cel` curve modifier directly in their own keyframes; they are
> NOT re-pointed to `gl-liquid-enter` (a second `animation` shorthand on `.scroll-build > *` would clobber
> the shipped `gl-page-build` — `DELTA-ASSAY §2 Bug B`, `scroll-choreography.css:88`).

**The CEL register** (`.is-cel`, the audacious upgrade) — **LIVE-VERIFIED FINDING (§7e):** the cel-slam
punch CANNOT come from ease-overshoot across the narrow `scale: 0.88→1` span (a 0.12 span × a 1.22
ease-peak yields only ~2% absolute punch — measured: max scale 1.020). The punch MUST live in
**explicit keyframe STOPS** (lens-c's 3-stop form), `--motion-weight`-scaled, with `--ease-cartoon-punch`
adding the anticipation dip + extra overshoot ON TOP (measured: max sx `1.088`):

```css
@media (prefers-reduced-motion: no-preference) {
  @keyframes gl-cel-slam {
    0%   { opacity: 0;                                                   /* ── ANTICIPATION: sink + squish DOWN ── */
           transform: translateY(calc(14px * var(--motion-weight, 0.618)))
                      scale(calc(1 - 0.12 * var(--motion-weight, 0.618)),   /* born flat (sx↓) */
                            calc(1 + 0.06 * var(--motion-weight, 0.618)));  /* tall (sy↑), vol-preserve */
           filter: blur(var(--lq-enter-blur, 4px)); }
    62%  { opacity: 1;                                                   /* ── PUNCH: lift + stretch UP ── */
           transform: translateY(calc(-3px * var(--motion-weight, 0.618)))
                      scale(calc(1 + 0.10 * var(--motion-weight, 0.618)),   /* stretch (sx↑) */
                            calc(1 - 0.05 * var(--motion-weight, 0.618)));  /* (sy↓), vol-preserve */
           filter: blur(0); }
    100% { opacity: 1; transform: none; filter: blur(0); }              /* ── FOLLOW-THROUGH SETTLE ── */
  }
  .liquid-enter.is-cel {
    animation: gl-cel-slam var(--spring-snappy-duration)
               var(--ease-cartoon-punch, var(--spring-bouncy)) both;    /* Band-0 upgrade, bouncy floor */
  }
}
```

Live-measured (Chrome, `--motion-weight: 0.618`): born `sx:0.926 · sy:1.037 · ty:+8.7px` (sink+squish),
punch `sx:1.068 · sy:0.966 · ty:-2.4px` (~7% stretch-up + lift, overshooting PAST the 62% stop), volume-
preserving throughout (sx·sy ≈ 1), settles clean to `1·1·0`. **The 2-stop base and the 3-stop cel share
the four channels + the spring family; the cel adds the explicit punch stops the narrow-span ease cannot
supply.** The base is GREEN now; the cel is GREEN now on the bouncy floor and UPGRADES (real dip + extra
punch) the moment Band-0 `--ease-cartoon-punch` lands.

- **The 1/φ overlap stagger** is the golden-proportion read: the per-beat delay is the spring's
  settle horizon × `1/φ ≈ 0.618`, so beat N+1 launches as beat N reaches ~62% — the beats OVERLAP
  into one flowing assembly (Disney follow-through/overlap), never a discrete march. REAL on a time
  clock, a NO-OP on `view()` — so it lives in the MOUNT register by construction.
- **The cel-slam upgrade (opt-in, `.is-cel`).** The 3-stop `gl-cel-slam` keyframe carries the
  squish-DOWN-at-birth + the explicit PUNCH stop (the §7e finding — the punch is in the STOPS, not the
  ease); `--ease-cartoon-punch` (Band-0) adds the real anticipation dip + extra overshoot ON TOP, and
  the `.is-cel` modifier mounts the **lagging cartoon cast** (§2c). Until Band-0 lands, the
  `var(--ease-cartoon-punch, var(--spring-bouncy))` floor is the graceful bouncy entrance —
  **depend-on, no mint, documented fallback.** GREEN before Band-0, UPGRADES when it lands.
- **`.scroll-build`/`.scroll-cascade` are AUGMENTED, not re-forked**: their `gl-page-build`/
  `gl-cascade-build` keyframes gain the squish leg (the `transform: scale(sx,sy)` reciprocal that
  relaxes to 1) and the `var(--ease-cartoon-punch, …)` curve on an opt-in `.scroll-build-cel`
  modifier. The mount-clock floor + `view()`-enhancement structure is UNCHANGED.
- **`v-reveal` reconciled.** `vReveal` keeps writing `data-reveal` + `--i` (it is a dependency-free
  DOM-hook writer, root-barrel-safe — KEEP); the demo's scoped `reveal-fade`/`reveal-rise` keyframes
  RETIRE and the rows bind `.liquid-enter` + `--i`. The flat fade dies.

### 2c — The lagging cartoon cast (`.is-cel`, opt-in) — a CHILD layer, never `::after{box-shadow}`

A `box-shadow` cannot lag a transform (both repaint on the same element in lockstep), and an
animated `box-shadow` is a WebKit paint hole. So the cast is a **child caster layer** (the
`BD.W-CARTOON-CASTER` precedent — `.cartoon-cast` is ABSENT today, this mints it) carrying the
static `--shadow-cartoon` offset-stamp, animated on its OWN transform clock **+`6ms·--motion-weight`
later** — the object slams in, its bold technicolor shadow catches up a beat behind (overlapping
action; the cel-animation read where the drop-shadow trails the cel):

**CHALLENGE-FOLD (Challenge 3 R3 / Challenge 1 R2):** the cast rides the LAYERED `--shadow-cartoon-md`
(8-12%, the proper 1940s-technicolor punch), NOT the bare `--shadow-cartoon` (a single 3px 6-8% stamp — a
WHISPER in flight, near-invisible on a translucent glass plate). The gate asserts the cast's painted ink
at peak is a luminance-delta ABOVE the resting card shadow on a REAL `.glass-card` parent (measured on
glass, not the spike's opaque mock).

```css
.liquid-enter.is-cel > .cartoon-cast {            /* a child layer, NOT ::after */
  position: absolute; inset: 0; z-index: -1; border-radius: inherit;
  box-shadow: var(--shadow-cartoon-md);           /* STATIC layered stamp; re-tints by mode (dark-arm.css) */
  animation: gl-cast-lag var(--spring-snappy-duration)
             var(--ease-cartoon-punch, var(--spring-snappy)) both;
  animation-delay: calc(0.006s + 0.06s * var(--motion-weight, 0.618));   /* the LATE arrival */
}
@keyframes gl-cast-lag {
  0%   { opacity: 0; transform: translate3d(0, calc(10px * var(--motion-weight, 0.618)), 0) scale(0.92); }
  100% { opacity: 1; transform: none; }
}
```

The cast's *transform* is compositor; the `box-shadow` is **static-painted, never animated** (it is
the layer's transform that moves, not the shadow's spread). Identical Chrome↔Safari. Under
`prefers-contrast: more` the cast opacity floors UP (the inked edge is a legibility asset).

### 2d — SCROLL register: `.scroll-cascade` `view()` arm — the below-fold enhancement

Mechanism unchanged (the existing `@supports ((animation-timeline: view()) and (animation-range:
entry))` arm), but its keyframe gains the squish leg so a below-fold reveal reads liquid, not a flat
rise. `useStaggerReveal` stays the single-writer feature-detect fallback: `NATIVE_VIEW_TIMELINE` →
reveal immediately (CSS owns it, no observer, no timers); non-native → IntersectionObserver cascade
with the `--i`/`staggerMs` stagger, now defaulting to the **1/φ overlap** (not a rigid
`staggerMs * idx`). On a non-`view()` engine the surface falls to the MOUNT `.scroll-build` cel-slam
— **NEVER skipped to a flat fade.**

### 2e — `useStagger` / `useStaggerReveal` / `vReveal` — the 1/φ overlap on the TIME clock

- `useStagger` (the unconditional time-clock cascade) gains a `1/φ` overlap default
  (`delayMs ≈ settle × (1/φ)`) — the overlapping-action principle on a real clock.
- `useStaggerReveal` keeps the `NATIVE_VIEW_TIMELINE` dual-path-single-writer discipline; its
  fallback timer cascade adopts the 1/φ overlap.
- `vReveal` upgrade (CHALLENGE-FOLD, Challenge 2 R2 — CLEAN BREAK): `vReveal.ts:22` ships writing `--d`
  (live-confirmed), but the recipe + `.scroll-build` key `--i`. Re-key the directive output `--d → --i`
  (one writer, one reader); the demo's scoped CSS (`reveal.vue:112` reads `--d`) re-points; **NO `--d`
  alias** (no-backwards-compat). On a `view()`-less engine it writes the `--i` + `.scroll-build` hooks
  (mount-clock floor), NOT a bare fade. It stays dependency-free (writes hooks; the CSS owns the keyframes).
- **No merge required.** `useStagger` + `useStaggerReveal` are both fit; the GOLDEN gives them the
  shared 1/φ default and leaves a `useStagger(gate:'none'|'io'|'time')` consolidation as an OPTIONAL
  follow-on (DRY does not demand merging two working composables on a deadline).

### 2f — `useSpringMount` — KEPT (it is fit)

The 0→1 position spring + drag-dismiss (reuses `useSpring`) is NOT broken and NOT a fade — it is the
sheet/dialog mount-position kernel. It composes BELOW the entrance grammar: it owns the
translate-position; `.glass-reveal`/`useLiquidReveal` own the scale/fade/blur bloom. A `spring`-opt-in
Dialog rides `useSpringMount` for position AND `.glass-reveal` for the bloom — two layers, one
surface, one spring family. It reads `--motion-weight` for its overshoot share if a consumer opts in.

---

## 3 — The single BOLDEST move

**Promote the broken/scattered four-leaf entrance zoo into ONE universal `LIQUID ENTER` grammar —
make the SQUISH channel non-optional on every entrance (mount or trigger), and equip it with the
CEL-SLAM cartoon arc (anticipation dip + punch overshoot + a child-layer cartoon cast that arrives a
beat LATE) as the Band-0-gated audacious upgrade — while DEFAULTING the whole system to the
cross-engine floor (mount-clock `@keyframes` + rAF spring, both Safari-15-safe) and treating `view()`
as additive sugar.** This is the inversion of the common award-winner pattern (build on `view()`,
degrade to nothing on WebKit): the reveal FIRES on every engine because the floor IS the mechanism,
not the fallback. Concretely: (1) the hoisted `asElement` + `revealWhenReady()` close the
binding-verification defect class at the engine, once, for all time; (2) `.glass-reveal`'s four
channels generalize into a `.liquid-enter` mount recipe EVERY surface opts into on the `--i` 1/φ
time-clock stagger; (3) `useLiquidFlex`'s volume-preserving squish becomes a first-class entrance
channel — born wide-and-flat, settling square; (4) the `--ease-cartoon-punch` / `--motion-weight`
cel-slam + the lagging `--shadow-cartoon` cast land as the depend-on upgrade. The flat fade and the
dead bloom both die.

---

## 4 — Cross-engine (Chrome AND Safari) + a11y / PRM carve

- **MOUNT + TRIGGER are Safari-15-safe**: plain `@keyframes` + `transform`/`scale`/`translate`/
  `opacity`/`filter` + rAF spring — identical Chrome↔Safari. `linear()` spring curves are Baseline
  17.2+; the rAF `springTimingFunction.fn` needs nothing newer. Use the `scale:`/`translate:`
  LONGHANDS (not `transform:`) so the recipe composes with a centering transform and mints no
  stacking context.
- **`filter: blur()` decongest** rides the surface's OWN pixels — NEVER `backdrop-filter: url()`
  (WebKit hole), never clobbers the resting glass plate.
- **The cast** is a child-layer transform (compositor) over a STATIC `box-shadow` — never an
  animated `box-shadow`, never `::after{box-shadow}`. Identical both engines.
- **`view()` SCROLL register** — `@supports`-gated; on Safari < 26 the below-fold reveal degrades to
  the MOUNT cel-slam (content visible, real entrance), NEVER a flat-fade skip, NEVER a broken stage.
- **PRM (design.md P6):** every register keeps the FADE, drops transform + squish + bounce + blur +
  stagger + cast in ONE arm. `--motion-weight → 0` (the §L5 single assignment zeroes squash /
  overshoot / anticipation / cast / stagger together) AND `--ease-cartoon-punch → --ease-standard`
  (belt-and-suspenders). The `.liquid-enter` recipe gets the `@media (reduce)` arm (the
  `.scroll-build` precedent at `scroll-choreography.css:111`): `opacity 0→1` on `--duration-fast`
  `--ease-out`, scale/transform/filter → none, delay → 0 (one calm paint). `useLiquidReveal`/
  `useBloomUp` snap-to-settled-with-opacity-1 under reduce (already correct). `useStagger.flushAll`
  flushes every slot synchronously.
- **Compositor-only (P5):** every channel is `transform`/`scale`/`translate`/`opacity`/`filter` —
  NEVER a layout property (`proof:no-layout-animation` holds library-wide).
- **Golden proportion (§L6):** the stagger overlap is `1/φ ≈ 0.618` of the spring settle; the rest
  `--motion-weight` is `1/φ`; the squish cap `1.08` and the enter-scale `0.88` are the calibrated iOS
  grace.

---

## 5 — Deft integration (the UNION, not a bolt-on)

| extant artefact | disposition |
|---|---|
| `useLiquidReveal` | **REFINE** — hoisted `asElement` resolver (α) + `revealWhenReady()` mount-safe arm (β) + `useLiquidFlex` squish on the FLIP. Same `ElementMorph`+`springTimingFunction` core, channels byte-untouched. |
| `useBloomUp` | **REFINE** — same `asElement` on `source`/`dest`/`field`; gains the squish; the 4th color channel + field-warm UNTOUCHED. |
| `.glass-reveal` (`glass/reveal.css`) | **KEEP** as the reka closed→open transition floor; the channel substrate `.liquid-enter` extends. |
| `.liquid-enter` (`glass/liquid-enter.css`) | **MINT** — the universal mount recipe (the four channels as `@keyframes`-on-mount) + the `.is-cel` cast modifier. |
| `.scroll-build` / `.scroll-cascade` (`scroll-choreography.css`) | **AUGMENT** — add the squish leg + the `var(--ease-cartoon-punch,…)` curve on opt-in `-cel` modifiers; mount-clock floor + `view()` enhancement structure UNCHANGED. |
| `useStagger` / `useStaggerReveal` | **REFINE** — the 1/φ overlap default; `NATIVE_VIEW_TIMELINE` single-writer law. Both KEPT (optional follow-on merge). |
| `vReveal` | **KEEP** — dependency-free `data-reveal`+`--i` writer; consumer CSS re-points to `.liquid-enter`; the demo's scoped fork RETIRES. |
| `useSpringMount` / `useDockCtaReceive` / `useLiquidFlex` | **KEEP** — `useDockCtaReceive` imports the hoisted `asElement` (deletes its private copy); `useLiquidFlex` is the ONE squish engine (no second `tanh`). |
| `asElement` | **HOIST** to `motion/asElement.ts` (DRY — one authority for the whole bloom family). |
| `--ease-cartoon-punch`, `--motion-weight` | **DEPEND-ON** Band-0 `motion-spring-register` (`var(…, fallback)`-gated). CONSUME, never re-mint. |
| `--shadow-cartoon` | **REUSE** as the cast (PRESENT, `dark-arm.css`). |

**Mints:** `motion/asElement.ts`, `glass/liquid-enter.css` (the `.liquid-enter` recipe + `.is-cel`
cast), `revealWhenReady()`, `.cartoon-cast` caster child, `tests-visual/liquid-reveal.spec.ts`. **No
new spring family, no new squish engine, no JS scroll runtime, no parallel fork.**

**Wave reconcile (no dup):** `W-LIQUID-REVEAL-FIX` owns §2a (the α+β repair + e2e); the GOLDEN
sharpens its root-cause from "likely the ref class" to the **proven dual failure** (component-ref
crash + mount-race) with the live captured DELTA. `W-LIQUID-ENTRANCE-GENERAL` owns §1/§2b-2e (the
universal `.liquid-enter` grammar + squish + 1/φ stagger + cel-slam). They UNION (the TRIGGER
register is the fixed bloom; the MOUNT register is the new recipe; they share the spring family +
squish engine). **No new wave needed.** Depends-on: Band-0 `motion-spring-register`
(`--ease-cartoon-punch` + `--motion-weight`).

---

## 6 — The acceptance bar (the gestalt lens)

The reveal **FIRES** (the trigger bloom: `transform: matrix(…)` interpolating + `filter: blur(N)→
blur(0)` + `opacity 0→1`, anchored at the trigger rect, both modes) AND the entrance **READS
LIQUID** (every mount surface: scale `0.88→1` with overshoot + the reciprocal squish `1.06·0.945→
1·1` + coupled fade + decongest, on the `1/φ` overlap stagger), AND — with Band-0 — the **cel-slam**
reads (anticipation dip + ~22% punch + the cast arriving a beat behind), both modes, BOTH engines
(Chromium + WebKit) — the squash→overshoot→settle arc visible in the frame-series, the flat fade and
the dead bloom both retired. **Born-RED on HEAD** (the bloom crashes; the entrance flat-fades).

---

## 7 — The born-RED gate sketch (a π/readback that proves it)

**The DELTA-ASSAY artefact** = the born-RED frame-series + the post-fix readback, both modes, both
engines. The gate is a paired-engine π (Chromium + WebKit), NEVER a single-engine green.

### 7a — TRIGGER: `tests-visual/liquid-reveal.spec.ts` (Playwright, born-RED on HEAD)

```ts
// Drive the REAL open→bloom on /motion/reveal; assert the JS bloom WRITES + interpolates.
test("useLiquidReveal blooms from the trigger rect (not dead)", async ({ page }) => {
  await page.goto("/motion/reveal");
  // born-RED guard: no uncaught TypeError on the trigger click (the component-ref crash)
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.getByRole("button", { name: /bloom from here/i }).click();
  const surface = page.locator(".glass-reveal");
  // capture a frame-series of the surface's COMPUTED transform/opacity/filter
  const frames = await sampleFrames(page, surface, { count: 12, ms: 600 });
  expect(errors).toHaveLength(0);                                   // RED on HEAD: TypeError thrown
  expect(frames.some((f) => f.transform !== "none")).toBe(true);   // RED on HEAD: transform: none all frames
  expect(frames.some((f) => /blur\([1-9]/.test(f.filter))).toBe(true); // decongest fired
  expect(frames.at(-1)).toMatchObject({ transform: "none", opacity: "1", filter: "blur(0px)" }); // settles
});
```

### 7b — MOUNT: the squish/overshoot readback (the paint-arm π, both modes)

A `paint-arm.mjs`-style readback over `.liquid-enter` (or a `.scroll-build` row) mounted fresh:
sample computed `scale` + `transform` across the entrance window and assert —
1. `scale` is **≠ 1** for ≥1 mid-flight frame (the squish-grow fired) — RED on a flat/instant entrance;
2. the X·Y product of the `transform: scale(sx,sy)` leg is **≈ 1 (vol-preserving)** mid-flight (not an
   isotropic zoom) — proves channel 2 (squish), RED on the scale-only `.glass-reveal`-without-squish;
3. `scale` **overshoots past 1.0** then settles to `1.0` (the bounce interior) — RED on a monotone ease;
4. `filter` transits `blur(N)→blur(0)` coupled — RED on a no-decongest fade;
5. under `prefers-reduced-motion: reduce`: `scale`/`transform`/`filter` stay `none`, only `opacity`
   ramps — RED if the squish survives reduce.

### 7c — CEL-SLAM (post-Band-0, `.is-cel`): the anticipation + lagging-cast readback

The cel-slam reads its punch from the explicit 3-stop `gl-cel-slam` keyframe (§7e), so the gate reads
the `transform: scale(sx,sy)` leg (NOT the `scale:` longhand): assert (1) `bornWideFlat` — an early
frame with `sx < 0.94 && sy > 1.02` (squish DOWN at birth, vol-preserving); (2) `punchStretchUp` — a
beat with `sx > 1.045` (the stretch-up punch, `--motion-weight`-scaled). With `--ease-cartoon-punch`
present additionally assert the anticipation dip drops BELOW the 0%-stop value (the ~4% dip a damped
spring cannot express) AND the punch overshoots PAST the 62%-stop value. (3) the `.cartoon-cast`
child's opacity/transform lags the host's by ≥1 frame at the same timestamp (`castLagged` — the cast
arrives LATE). Both engines, both modes.

### 7d — The DELTA artefact (per [[Live-verify capture]])

A captured paired screenshot + paired-π (Chromium + WebKit, both modes) showing the bloom mid-flight
+ the squish-entrance mid-flight + (post-Band-0) the cel-slam — NOT a commit-message claim. Born-RED:
the HEAD capture is `transform: none, opacity 1, scale 1` from frame 0 + the `TypeError` in console.

### 7e — The de-risk SPIKE (built + Chrome-verified): `golden/liquid-enter-spike.html`

A throwaway pure-CSS spike (real `--spring-snappy`/`--spring-bouncy` `linear()` + `--shadow-cartoon`
tokens inlined) of the boldest mechanism — the cel-slam four channels + the 1/φ stagger + the lagging
cartoon cast — with a `window.__probe()` computed-style frame-series readback. **The load-bearing
finding:** the cel-slam punch CANNOT come from ease-overshoot across the narrow `scale: 0.88→1`
longhand span — a 0.12 span × even a 1.22 ease-peak yields only **~2% absolute punch** (measured: max
scale `1.020`, `anticipationDip:false`, `punchOvershoot:false` on the 2-stop+shaped-ease form). The
punch MUST live in **explicit keyframe STOPS** (lens-c's 3-stop `gl-cel-slam`). Re-built with the
3-stop form, the spike passes the full gate (Chrome, `--motion-weight: 0.618`):

```
bornWideFlat:true   (t=1   sx:0.926 sy:1.037 — squish DOWN at birth, vol-preserving)
punchStretchUp:true (t=237 sx:1.062 sy:0.969 — ~6% stretch-up punch, overshoots past the 62% stop)
volPreserving:true  (sx·sy ≈ 1 every mid-flight frame)
decongest:true      (blur 4px→0 coupled)
castLagged:true     (t=81 host opacity 0.403, cast opacity 0 — the shadow trails ~150ms behind)
settled             ({sx:1, sy:1, opacity:1, filter:blur(0px)})  ← clean settle, no residual
```

Artefact: `golden/liquid-enter-settled.png` (the four-card grid settled). This DROVE the §2b/§2c
recipe correction (2-stop base for the graceful floor; **explicit 3-stop `gl-cel-slam` for the cel
register** — the punch is in the stops, the `--ease-cartoon-punch` ease adds the dip + extra overshoot
on top). **OUTSTANDING (not yet captured):** the paired WebKit run + both-modes — the spike is
authored Safari-15-safe by construction (plain `@keyframes` + `transform`/`opacity`/`filter` longhands,
no `view()`, no `backdrop-filter`, child-layer cast over a static `box-shadow`), but §0's binding law
requires the WebKit capture before the gate is GREEN.
