# Greenfield — the Motion Vocabulary (lens-b: cross-engine / perf-first)

**Lens:** flawless Chrome AND Safari, compositor-only, KISS, GPU-only-where-it-is-a-viz, offscreen-pause. The motion must read weighty/gooey/inertial AS A USER — a tight snap is a FAIL.

---

## 0. The verdict up front (the delta-assay against the status quo)

I live-inspected `:5173` (`/motion`, `/dock/overview`) and read the running cascade. **The `anim-ios27-tune` triumvirate already shipped and is GOOD** — the springs are at the weighty pole, the stretch caps are lifted, JUDGE-1 PASS is real and live-reproduced:

| live token | value | reading |
|---|---|---|
| `--spring-smooth-duration` | 0.45s | weighty settle ✓ |
| `--spring-snappy-duration` | 0.40s | control, +3.2% gooey overshoot ✓ |
| `--spring-bouncy-duration` | 0.62s | softened to +9.3% (the old pointed 12.6% retired) ✓ |
| `--spring-dock-duration` | 0.66s | THE weighty morph, +7.3% ✓ |
| `--spring-press-duration` | 0.16s | inertial tap ✓ |
| `--tab-indicator-max-stretch` | **1.18** | squish reads ✓ |
| `--dock-morph-max-stretch` | **1.14** | box-morph reads ✓ |
| `--motion-weight` | **(ABSENT)** | ✗ spec-only |
| `--ease-cartoon-punch` | **(ABSENT)** | ✗ spec-only |
| `--glass-reveal-enter-scale` | **(ABSENT)** | ✗ spec-only |

**So Q1 is answered: the springs are NOT too tight any more.** The `anim-ios27-tune` re-calibration already moved the DEFAULT register slower/weightier (longer response, longer settle, un-pointed terminal overshoot). The original design.md §L2 table (snappy ζ0.65/~7%, bouncy ζ0.45/~20%, gentle ζ0.85) is the OLD pole the wave already retired — design.md §L2's *prose table* is now STALE relative to the shipped `SPRING_PRESETS` and must be reconciled (see §6). **I do NOT re-fork the springs.** The golden UNIONS with `anim-ios27-tune` and does the ONE thing it left undone: it makes `--motion-weight` real, born-RED, as the governing scalar — and lands `--ease-cartoon-punch` as a raw token — so "Liquid Weight is Universal" stops being a 6-row table edit and becomes a single cascade-scoped lever every driver reads.

**The gap, precisely:** today the iOS-27 feel is delivered by SIX independent CAP constants (the `useLiquidFlex` default 1.14, tabs 1.18, dock-morph 1.14, press 1.04, the goo caps) plus six spring rows. There is no ONE knob. design.md §L4 promises exactly that knob — `--motion-weight` (rest 1/φ≈0.62, driver-scoped, co-scales squash/overshoot/anticipation/cartoon-shadow-travel, PRM→0) — and it does not exist in `src/`. That is the headline of this golden.

---

## 1. Core idea — `--motion-weight` as the ONE cascade-scoped governor (the missing keystone)

The current squish caps are *absolute* (`maxStretch ?? 1.14`). The greenfield move: reframe every cap as **`rest_cap` modulated by a single inherited scalar** `--motion-weight ∈ [0,1]`, rest `0.62 (1/φ)`. One assignment at one ancestor re-proportions the whole deformation family — and PRM zeroes ALL of it in one line.

### 1a. Where it lives (the token home — answers Q2)

`--motion-weight` is a **Feature-token** (design.md §L4: "the token's value lands in §Motion per the Feature-token-home rule"). Its home is `src/styles/tokens/scheme-motion.css §1` (the duration/motion block), declared on `:root`:

```css
/* §1.W — LIQUID WEIGHT (the universal driver-motion governor). 0 = still,
   1 = max cartoon. Rest 1/φ ≈ 0.618: present, alive, never manic (§L4/§L6).
   DRIVER-scoped: a surface the user's finger or a route-change moved INHERITS
   this; an observer surface (auto-carousel, list reorder under scroll) pins it
   to 0 locally (the §L2 driver-vs-observer rule). It co-scales squash depth,
   overshoot share, anticipation pull-back, and cartoon-shadow travel together
   so they read as ONE proportioned deformation, never four unrelated tics. */
--motion-weight: 0.618;
```

It is a registered typed custom property so it interpolates and clamps (a viz/transition can animate weight itself — e.g. a celebration ramping toward 1):

```css
/* property-regs.css */
@property --motion-weight {
  syntax: "<number>"; inherits: true; initial-value: 0.618;
}
```

`inherits: true` is the whole mechanism: a DRIVER ancestor (`.dock`, a celebrating card, a sheet) can locally push `--motion-weight: 0.85`; an OBSERVER subtree (`<Carousel>` auto-advance content, `[data-reorder]` lists) pins `--motion-weight: 0` — and everything below reads the local value with zero prop-drilling.

### 1b. How each consumer reads it (the cascade — answers Q2)

The cap becomes a `calc()` that LERPs from the rest footprint (weight 0 → cap 1.0, i.e. NO squish) to the design cap at weight 1:

```
effective_cap = 1 + (rest_cap − 1) · (--motion-weight / W_REST_NORM)
```

But that JS-side division is fragile. The KISS cross-engine form is a pure CSS `calc()` the squish token already reads — the cap tokens become weight-coupled in CSS:

```css
/* density.css — the dock-morph cap, now weight-governed (greenfield) */
--dock-morph-max-stretch: calc(1 + 0.226 * var(--motion-weight));
/* 0.226 = (1.14 − 1)/0.618 → at rest weight 0.618 this evaluates to EXACTLY 1.14
   (byte-identical to the anim-ios27-tune shipped cap — a UNION, not a re-fork);
   at weight 0 (PRM/observer) it collapses to 1.0 (no squish); at weight 1 it
   reaches 1.226 (the dock's audacious ceiling). */
```

Same pattern for `--tab-indicator-max-stretch` (`calc(1 + 0.291 * var(--motion-weight))` → 1.18 at rest) and the `useLiquidFlex` JS default (reads the live cascade value via the existing getter path — `maxStretch` already accepts a getter, §useLiquidFlex.ts:57, so it resolves `getComputedStyle(...).getPropertyValue('--dock-morph-max-stretch')` per-read with NO primitive change). **This is the deft union: the caps are already tokens with getter access; I only change the token's RHS from a literal to a `var(--motion-weight)` `calc()`.**

The **JS overshoot/anticipation** legs (`useSpringPress` shrinkDepth, the cartoon-shadow travel) co-scale the same way — but the spring `(response, ζ)` pairs themselves DO NOT change (the analytic spring solver + the `linear()` curves stay byte-frozen; weight scales the *amplitude* of the squish/shadow that rides ON the spring, never the spring shape — that keeps `proof:spring-ease` GREEN by construction and keeps the overshoot ≤10% invariant intact).

### 1c. The born-RED gate (answers Q2)

A new `proof:motion-weight-law` (or an arm on `proof:liquid-weight-law`) asserts:
1. `--motion-weight` is declared on `:root` at exactly `0.618` (1/φ ± 0.001) — born-RED on its absence today.
2. **The PRM cascade zeroes it:** under `@media (prefers-reduced-motion: reduce)` the cascade sets `--motion-weight: 0` (ONE assignment — design.md §L4: "the §L5 cascade zeroes the extra squash, overshoot, anticipation, arc, and stagger in one assignment"). Assert the reduce-block contains the zero-assignment.
3. **Driver-scoped, not universal:** assert the observer surfaces (`<Carousel>` auto content, `[data-reorder]`) carry a local `--motion-weight: 0` (a static-scan of the SFC/CSS) — the calm-overdamped carousel the §L2 rule demands.
4. **Every weight-coupled cap evaluates to its shipped rest value at weight 0.618** (a `calc()` round-trip check: `1 + k·0.618 == shipped_cap` for each of dock/tabs) — this is the UNION fence: it proves the greenfield re-expression did not silently change the live feel.
5. Born-RED self-test: a synthetic cap declared as a raw literal `1.14` (not weight-coupled) FAILS clause 4 (it cannot follow PRM→0).

---

## 2. The boldest move — make weight a LIVE velocity term on drivers (the "morph MORE the faster they move" law, universal)

Today `useLiquidFlex` squishes off the per-`drive` travel derivative `|ṫ|` (the velocity coupling exists, GOOD) but the **AMPLITUDE** of that coupling is a static cap. The audacious greenfield: the *rest* `--motion-weight` is the floor, and a **driver in active fast motion transiently RAISES its own `--motion-weight` toward 1**, so the deformation grows the faster the surface travels — and decays back to rest as it settles. This is design.md §L4's "morph MORE the faster they move" made a first-class, universal, single-scalar law instead of a per-primitive tanh constant.

Mechanism (KISS, compositor-only, no new engine):
- `useLiquidFlex` already computes a saturating velocity term `tanh(|ṫ|·k)`. Instead of *only* feeding the `--stretch` reciprocal scale, it **also writes a transient `--motion-weight` boost** on the driving element: `--motion-weight: calc(0.618 + 0.382 * var(--flex-vel))` where `--flex-vel = tanh(|ṫ|·k) ∈ [0,1]` is the same already-computed term. A fast morph momentarily pushes weight toward 1 (deeper squish, bigger overshoot share, more shadow travel — ALL at once, because they all read the one scalar); a slow nudge stays near rest. The decay-to-rest rides the SAME `drive` calls (the existing M5 determinism — no free-running timer).
- This costs ZERO new primitive: it is one extra computed style key (`--motion-weight`) on the existing `stretchStyle` object in `useLiquidFlex`. Every one of the 27 consumers inherits the behavior the instant the primitive writes it, because they all already compose `useLiquidFlex`. **That is the universal wiring the prompt's Q3 asks for** — the velocity→weight coupling becomes a property of the ONE primitive, so "wired everywhere driver motion happens" is true by construction, not by 27 hand-edits.

**Why this is the bold-but-safe move:** it is volume-preserving (the `--stretch` reciprocal is unchanged), compositor-only (it drives `transform` scale + a custom property, never layout), and it self-extinguishes (weight relaxes to rest as the spring settles, so a settled surface reads calm — never a permanently manic element). It makes the user's emphatic "morph MORE on move" a measurable, single-knob, system-wide law. And it is **Safari-perfect**: `--motion-weight` is a typed `<number>` custom property (WebKit Baseline), the `calc()` is sRGB-trivial, and the only painted channels are `transform`/`--stretch` (compositor) — no `backdrop-filter:url`, no per-frame filter.

---

## 3. `--ease-cartoon-punch` — the raw token, landed correctly (answers the §Easing fold)

design.md §L2/§Easing specify `--ease-cartoon-punch` as a hand-shaped `linear()` with a real **negative anticipation dip** (~−4% below origin) then a **~+22% punch** then settle — explicitly NOT a `SPRING_PRESETS` row (the ≤10% invariant + analytic solver stay intact) and NOT a typed `MOTION_CURVES` entry (`MotionCurveKind` is the closed `spring|bezier` union). It does not exist in `src/`. Land it verbatim as a raw custom property in `scheme-motion.css §2` (the easing block), beside the spring curves:

```css
/* §2.P — THE CARTOON PUNCH (the §L4 exaggeration register's MOTION half;
   its visual half is the moving cast, §Shadows). A hand-shaped linear() that
   ANTICIPATES (dips ~4% below origin — a thing no single damped spring can
   express, since a damped spring approaches monotonically from one side),
   PUNCHES to ~1.22 (deliberately past the spring ≤10% fence — which is why it
   is a register, not a spring), then settles. Drives transform/opacity ONLY
   (both engines). Loud + opt-in; the workhorse remains snappy. PRM → standard. */
--ease-cartoon-punch: linear(
  0, -0.012, -0.038 33%, 0 42%, 0.62, 0.93, 1.12, 1.22 66%,
  1.18, 1.09, 1.02, 0.985, 0.98, 0.99, 0.997, 1
);
```

- **It is NOT registered in `MOTION_CURVES`** (curves.ts) — correct per design.md: a hand-shaped `linear()` is neither a `spring` nor a `bezier`, and the union is closed. It needs no JS twin (it is a CSS-driven loud one-shot; if a JS consumer ever wants it, value.js can sample the `linear()` string directly — but no consumer needs it now, so YAGNI).
- **PRM carve:** under reduce, `--ease-cartoon-punch` is re-aliased to `--ease-standard` in the same reduce-block that zeroes `--motion-weight` (design.md §L2: "PRM collapses it to `--ease-standard` like every spring"). One block, both carves.
- **The punch amplitude co-scales with weight too** (the union with §1): the cartoon register's surfaces ride `--ease-cartoon-punch` AND a weight-scaled `--scale-press`/shadow-travel, so under a calmer local weight the punch reads softer — the register stays proportioned to the one governor.
- **Gate:** an arm on `proof:animation-coherence` asserts `--ease-cartoon-punch` exists, is a `linear()` with a sub-zero anticipation stop (the negative leg is its DISTINGUISHING feature — a born-RED check that it dips below 0), peaks > 1.10 (past the spring fence), and is NOT present as a `SPRING_PRESETS` name nor a `MOTION_CURVES` token (the closed-union fence). Born-RED on its absence.

---

## 4. The drawer/sheet — the one DRIVER still missing its velocity squish (answers Q3)

Coverage map (live grep): velocity-squish is wired on **dock, tabs, pager-dots, button, card, carousel, goo-morph** (all compose `useLiquidFlex`). The gap: the **drawer/sheet** (`useDrawerSnap.ts`, `DrawerContent.vue`) drives a bare `SpringProgress` with NO `useLiquidFlex` coupling — yet the Maps-card sheet-grow is the prompt's named "morph more on move" reference. The greenfield deft-union: the drawer composes `useLiquidFlex` (squish-only, like `useLiquidPress` does) off its own snap spring, reading the universal `--motion-weight`. A fast fling → deeper squish on the sheet's leading edge; a slow drag → calm. No new primitive — the SAME composition `useLiquidPress` already proves. This closes the "wired everywhere driver motion happens" gap to literally-everywhere. (The `DRAWER_SNAP` clock retune to `{0.50, 0.74}` from BUILD-SPEC §6 is a separate, complementary edit — keep it; it sets the sheet's inertial *clock*, while this sets its *deformation*.)

Observer surfaces stay carved OUT (weight 0): the auto-advancing carousel content, list-reorder-under-scroll. That is the §L2 driver-vs-observer rule made literal via the local `--motion-weight: 0` pin — the cheap-reading over-springy carousel is forbidden by the gate (§1c clause 3).

---

## 5. Selection rules — spring-vs-ease + driver-vs-observer (made one decision tree)

The greenfield consolidates the two scattered rules (design.md §L2 "if the finger touched a pixel, use a spring" + §L4 driver-vs-observer) into ONE table the gate and the consumer both read:

| the motion | who caused it | channel | curve | weight |
|---|---|---|---|---|
| press / tap | finger (DRIVER) | transform scale | `--spring-press` | rest, + velocity boost |
| tab glide / dock morph / sheet snap | finger / route (DRIVER) | compositor transform + `--stretch` | `--spring-snappy`/`--spring-dock` | rest, + velocity boost |
| entrance / reveal / dialog | route arrival (DRIVER) | transform + opacity | `--spring-snappy`/`--spring-bouncy` | rest |
| **loud one-shot** (celebration, attention pop) | deliberate (DRIVER) | transform | **`--ease-cartoon-punch`** | pushed → 1 |
| surface re-tint (color/bg/border/shadow) | any | paint props | `--ease-standard` (bezier) | n/a — never a spring on color (§6 binding) |
| exit / close | any | opacity | `--ease-out` (no overshoot past gone) | n/a |
| auto-carousel / list reorder / progress fill | system (OBSERVER) | transform/width | `--ease-standard` | **0** (calm) |
| specular pointer-follow | tracked | transform | `--ease-standard` | n/a |

The single rule it encodes: **DRIVER → spring (or cartoon-punch for the loud register) + `--motion-weight`; OBSERVER → bezier + weight 0.** Weight is the new axis that makes driver-vs-observer mechanical instead of editorial.

---

## 6. The design.md reconciliation (the wave-amendment, no dup)

`anim-ios27-tune` re-baked `SPRING_PRESETS` but did NOT update design.md §L2's prose table — which still prints the OLD pole (snappy ζ0.65/~7%, bouncy ζ0.45/~20%, gentle ζ0.85). **The golden's amendment, not a new wave:**

1. **AUGMENT `W-ANIM-IOS27-TUNE`** (do not re-fork it) with a §12 "design.md reconcile + the governor": (a) rewrite design.md §L2's spring table to the SHIPPED pole (smooth 0.58/0.80/+1.5%, snappy 0.48/0.74/+3.2%, bouncy 0.60/0.60/+9.5%, gentle 0.82/1.0/0%, dock 0.68/0.64/+7.3%, press 0.20/0.80/+1.5%) so the prose stops lying; (b) land `--motion-weight` (§1), `--ease-cartoon-punch` (§3), `--glass-reveal-enter-scale: 0.88` (BUILD-SPEC §5, still absent live — confirmed) as the THREE spec-only tokens the wave's §3/§5 named but never wrote.
2. **The velocity→weight coupling (§2)** and the **drawer squish-union (§4)** are the net-new substrate — fold them as `W-LIQUID-WEIGHT-GOVERNOR`, a single wave that DEPENDS on `W-ANIM-IOS27-TUNE` (it consumes the shipped springs/caps and re-expresses the caps as weight-`calc()`s). It touches: `property-regs.css` (the `@property`), `scheme-motion.css` (the token + reduce carve + cartoon-punch), `density.css`/`scale-paper.css` (caps → `calc(var(--motion-weight))`), `useLiquidFlex.ts` (the `--motion-weight` velocity write — ONE computed key), `useDrawerSnap.ts`/`DrawerContent.vue` (the `useLiquidFlex` union), `proof-motion-weight-law.mjs` (new gate). NO second spring family, NO second squish engine, NO `MOTION_CURVES` extension.
3. Reconcile against the 116 union waves: this is ONE governor wave + a §12 amendment to an existing wave. The squish caps are the SAME tokens `anim-ios27-tune` shipped (only their RHS becomes weight-coupled, byte-identical at rest by the §1c-clause-4 fence). Zero duplication.

---

## 7. Cross-engine + a11y carve (the lens-b bar)

- **Chrome + Safari identical:** `--motion-weight` is a typed `<number>` custom property (WebKit Baseline), the cap `calc()`s are sRGB-trivial arithmetic, `--ease-cartoon-punch` is a plain `linear()` (Baseline 17.2+, no `-webkit` prefix, no unsupported function). Every painted channel is `transform`/opacity/`--stretch` (compositor) — NO `backdrop-filter:url`, NO per-frame `filter` re-blur. The meatball/goo surfaces are untouched by this wave (it is the deformation GOVERNOR, not the blob shader) so their static-SVG-goo WebKit path is unaffected.
- **PRM:** ONE reduce-block in `scheme-motion.css` sets `--motion-weight: 0` (zeroes squash + overshoot-amplitude + anticipation + cartoon-shadow travel + the velocity boost in one assignment — design.md §L4) AND re-aliases `--ease-cartoon-punch: var(--ease-standard)`. Springs still snap to endpoint via the existing `respectReducedMotion` in `SpringProgress`. The fade survives (P6). At weight 0 every cap `calc()` collapses to 1.0 → `--stretch` is identically 1 → zero deformation frames.
- **`prefers-reduced-transparency` / `prefers-contrast`:** motion-weight is geometry/motion, orthogonal to transparency — no bracket (matches §L6 proportion having no transparency bracket). The cartoon CAST (the visual half) floors its opacity UP under `contrast: more` (design.md §Shadows) — that is the shadow token's carve, not the weight scalar's.
- **Offscreen-pause:** the velocity→weight boost only writes while `drive` is called (gesture/route active); a settled or offscreen surface holds rest weight and emits zero frames — pause is free (no timer to stop).

---

## 8. Acceptance (born-RED on today's spec-only state)

1. `--motion-weight: 0.618` exists on `:root` + `@property` registered; born-RED on absence today (live-confirmed absent).
2. Every weight-coupled cap evaluates to its `anim-ios27-tune` shipped rest value at weight 0.618 (the union fence) AND to 1.0 at weight 0 (the PRM fence).
3. `useLiquidFlex` writes the velocity→weight boost; a fast drive on ANY of the 27 consumers reads a transiently deeper squish (π frame-series: peak weight > 0.7 mid-fast-travel, decays to 0.618 at settle).
4. The drawer/sheet now squishes on fling (live frame-series on a Maps-card-class sheet); the auto-carousel does NOT (weight 0 pinned).
5. `--ease-cartoon-punch` exists as a raw `linear()` with the negative anticipation leg + >1.10 punch, NOT in `MOTION_CURVES`/`SPRING_PRESETS`; PRM re-aliases it to `--ease-standard`.
6. design.md §L2 prose table matches the shipped pole (no stale OLD-pole numbers).
7. Safari + Chrome identical; compositor-only; PRM zeroes all deformation in one assignment.

---

## TL;DR

The springs were ALREADY fixed by `anim-ios27-tune` (live-confirmed weighty/gooey — Q1: not too tight, do not re-fork). The real gap is the **governor**: design.md's `--motion-weight` (rest 1/φ), `--ease-cartoon-punch`, and `--glass-reveal-enter-scale` are spec-only, absent from `src/`. This golden lands `--motion-weight` as ONE inherited, `@property`-typed `<number>` scalar whose `var()` `calc()` drives every squish cap (byte-identical to the shipped caps at rest, collapsing to zero deformation under one PRM assignment), re-expressing six scattered constants as one governor; lands `--ease-cartoon-punch` verbatim as the raw register token; and unions the drawer/sheet into the velocity-squish family so "morph more on move" is wired everywhere a driver moves. **The single boldest move: make `--motion-weight` a LIVE velocity term — `useLiquidFlex` transiently pushes its own element's weight toward 1 the faster it travels (one extra computed key, inherited by all 27 consumers for free), so "elements morph MORE the faster they move" becomes a measurable, universal, single-scalar law instead of 27 per-primitive tanh constants — self-extinguishing to a calm rest, volume-preserving, compositor-only, Safari-perfect.**
