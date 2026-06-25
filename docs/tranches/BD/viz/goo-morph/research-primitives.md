# RESEARCH-3 — goo-morph pager: the primitive REUSE map (no re-fork, no-dual-path)

The builder of the goo-morph pager (`W-PAGER-GOO-MORPH`) **COMPOSES** the leaves
documented here. It mints NO new spring family, NO second squish engine, NO second
windowing oracle. Every gap below names the EXACT shipped primitive to wire and the
fence that forbids re-forking it.

> BINDING LAW (the user, "remember this always" — `feedback_liquid_weight_universal`):
> MOST items + transitions carry INERTIA · WEIGHT · BOUNCE · LIQUID-GLASS quality;
> ALL scrolling + movement carries inertia + liquid weight. The pager/deck dots must
> **GOO-MORPH** from one to the next like the goo-blob metaball (a smin merge /
> stretch-and-snap on a `--spring-*` clock) — **never a discrete hop**. A surface that
> snaps/hops/linear-moves FAILS the liquid-weight gestalt bar.

---

## 0. The current state (what we REPLACE)

`src/components/custom/pager-dots/PagerDots.vue` (lines 190-240) paints each dot as a
`::before` pip and morphs the active dot by **CSS `transition: width …, height …`** on
`--spring-dock-duration var(--spring-dock)`:

```css
.pager-dot[data-active]::before { width: var(--pager-dot-elongated); }     /* horizontal */
.pager-dots[aria-orientation="vertical"] .pager-dot[data-active]::before {
    height: var(--pager-dot-elongated);                                     /* vertical */
}
```

Two defects against the law + the canon:

1. **It is a per-dot `width`/`height` LAYOUT animation.** That is a `transition` on a
   layout-triggering property — forbidden by `proof:no-layout-animation` / motion-canon
   **P5** (per-frame reflow). It rides the dock spring clock so it "settles," but it
   does NOT goo-morph: each dot independently grows/shrinks its OWN pip in place. There
   is **no traveling worm**, **no merge between dots**, **no volume-preserving squish**.
2. **It reads as a hard cross-fade.** The old dot's pill collapses while the new dot's
   pill grows — two independent box transitions, not one liquid element morphing across
   the gap. This is exactly the "subtle shift" the user rejected vs. the Google-deck
   goo-morph.

The pip anatomy, the `--pager-dot-*` token surface, the 24px hit-box, the windowing,
the aria registers, and the focus-survival are all KEPT (see §6). Only the **active
indicator paint + travel** is replaced — by a single traveling **worm** element that
glides + squishes between dot centers on a spring, with a smin-style goo-neck at the
midpoint.

---

## 1. WHICH primitive the worm-morph COMPOSES

The goo-morph worm is **the `useTabIndicator` travel approach + the `useLiquidFlex`
squish** — the exact two-primitive composition the SegmentedTabs indicator ALREADY
proves out. It is the closest WORKING reference in the repo.

### 1a. The TRAVEL — from `useTabIndicator` (the working reference)

`src/components/custom/tabs/composables/useTabIndicator.ts` is a single moving element
("the slider") that glides between N anchor buttons + squishes on travel. The worm is
THE SAME SHAPE applied to dots instead of tabs:

| Mechanism | `useTabIndicator` (the reference) | The worm-pager (compose this) |
|---|---|---|
| **One moving element** | the indicator `<div>` (`indicatorRef`), absolutely positioned, NOT a per-tab box | ONE worm `<div>`/`::before` per rail, NOT a per-dot pill grow |
| **Travel = `transform: translate`** | `transform: translateX(centerX − w/2)` / `translateY(...)` — compositor-only, never `left`/`top` | `transform: translateX/Y(activeDotCenter − wormSize/2)` |
| **Center-anchored** | `centerX = btn.offsetLeft + w/2` (BA-VJS-3 — center==label center so squish stays pinned) | `center = dotCenter(activeIndex)` — center==dot center; squish pins |
| **Axis-derived** | `vertical.value` switches translateX↔translateY + width↔height | KEEP — orientation prop switches the travel axis (see §6) |
| **The glide clock** | the `transition` on the indicator rides `--spring-snappy` @ `--tab-indicator-duration` (= `--spring-snappy-duration`) | the worm glide rides a `--spring-*` @ its own `--spring-*-duration` (see §2) |
| **Squish on travel** | `squishOnTravel(toIdx)` writes `--stretch`, releases at arrival | reuse the SAME `squish`/release shape |

**The load-bearing detail to copy: the travel writes a `transform`, the spring clock
lives on a `transition`.** The indicator does NOT run its own rAF spring loop — it sets
the target `transform` + lets CSS `transition: transform <dur> <spring-linear()>` do the
spring glide (the `--spring-*` linear() curves at `scheme-motion.css:236-241` ARE the
spring physics baked into a `linear()` timing function). This is the cheapest
compositor-only path and is Safari-safe (CSS `linear()` is Baseline; `transform`
transitions are universally compositor-accelerated).

> **Do NOT re-fork `useTabIndicator`.** It is tab-coupled (reads `SegmentedTabOption[]`,
> `aria-pressed`, the anchor-positioning `@supports` branch). The worm-pager wants the
> SAME SHAPE but on the pager's `count`/`active`/`dotEls` geometry. Two honest options
> for the builder, both no-fork:
> - **(preferred) inline the ~30-line travel+squish in PagerDots** reading the dot-center
>   geometry it already measures, composing `useLiquidFlex` for the squish (so the
>   squish engine is STILL single-sourced — only the tiny tab-specific glue is not
>   shared, which is correct: the tabs glue reads tab options, the pager glue reads dot
>   indices).
> - **OR factor a `useTravelSquish({ anchors, active, axis, spring })` leaf** that BOTH
>   `useTabIndicator` and PagerDots compose, IF the builder proves the abstraction is
>   byte-faithful to the tab path (the ≥2-consumer bar met by construction: tabs + pager).
>   This is the cleaner no-dual-path answer but is a larger change; the gate
>   `proof:no-layout-animation` + a `proof:pager-goo` worm gate must back it.

### 1b. The SQUISH + the GOO-NECK — from `useLiquidFlex` (the volume-preserving deform)

`src/composables/motion/useLiquidFlex.ts` is the ONE squish engine (the W-LIQUID
reconcile of the tab `--stretch`, the metaball `sa = 1 + tanh(speed·k)·uStretch`, the
dock morph). The worm reads it the SAME way the tab indicator does:

```ts
// the worm composes useLiquidFlex (squish-only consumer — the travel is CSS transform):
const liquidSquish = useLiquidFlex({
    from: 0, to: 0, axis: "width",       // squish-only; no size span (the worm travels via transform)
    squishLaw: "linear",                  // geometry-relative travel FRACTION (the tab law)
    maxStretch: () => capFromCascade,     // live --pager-worm-max-stretch (default 1.08)
});
// on select: feed the travel fraction (|distance| / rail extent), then release at arrival
liquidSquish.squish(frac);
el.style.setProperty("--stretch", String(liquidSquish.stretch.value));
```

The worm element pairs `--stretch` **reciprocally** along the travel axis, EXACTLY the
tab CSS (`src/styles/segmented-tabs.css:121,129`):

```css
/* horizontal worm — stretch along X, compress Y (volume-preserving) */
.pager-worm { scale: var(--stretch) calc(1 / var(--stretch)); }
/* vertical worm — stretch along Y, compress X */
.pager-dots[data-orientation="vertical"] .pager-worm { scale: calc(1 / var(--stretch)) var(--stretch); }
```

**The goo-neck (the "merge like the metaball" read).** The squish alone gives a
stretch-and-snap (the tab indicator's read). To reach the GOO-merge — the active blob
visibly necks/connects to the next dot at the midpoint, like the goo-blob smin — the
worm uses a CSS **SVG goo filter** OR a `border-radius` morph on the elongating worm,
the deterministic `f(--worm-t)` path (NOT a per-frame shader):

- The repo's deterministic goo idiom is the **CSS SVG-goo bridge** (`feGaussianBlur` +
  `feColorMatrix` alpha-threshold) the morph-showcase already uses
  (`src/styles/dock/morph-bridge.css`; chosen over the goo-blob mount precisely because
  its aspect is a pure `f(scalar)` with no `uTime`/pointer clock — the M5-deterministic
  choice). The worm should: elongate (`--stretch`) so it physically reaches toward the
  next dot during travel, with the rail wrapped in the goo filter so the elongated worm
  + the target dot's pip **merge into one liquid mass** at the crossing, then the worm
  snaps to the new center + releases `--stretch`→1. This is the smin merge expressed in
  CSS, deterministic, compositor-only.
- The metaball math reference (do NOT splice the shader — it is the CONCEPT): the
  smin merge is `sdf-body.glsl.ts` `sminQuadratic(a, b, k)` / `sminCircular`, and the
  squish law is `metaball.frag.ts` `sa = 1 + tanh(speed·1.6)·uStretch` — which IS
  `useLiquidFlex`'s `"tanh"` law (`squishK` default `1.6`). One squish law under all of
  it; the worm reads the `"linear"` arm (the tab register) for the geometry-relative
  travel fraction, OR the `"tanh"` arm if the builder drives it off the spring's
  per-frame velocity (see §2 — the spring-driven option).

> **Do NOT re-roll the tanh/reciprocal squish.** `useLiquidFlex` owns the cap-clamp +
> the reciprocal `--stretch` value + both laws. A second `1 + tanh(...)` or
> `1 + frac·(cap−1)` write reds the no-dual-path / W-LIQUID single-engine fence.

---

## 2. The EXACT spring preset for the BOUNCE + WEIGHT

The user wants **bounce + weight** — "FAR more liquid + squishy than a subtle shift."
The current `--spring-dock` (response 0.32 / ζ 0.7, overshoot ~+4.6%) is the controlled
dock register — too tame for the explicit goo-bounce ask. The candidates, from
`src/composables/motion/springPresets.ts`:

| Preset | (response, ζ) | overshoot | Token clock | Fit for the worm |
|---|---|---|---|---|
| `snappy` | 0.42 / 0.78 | ~+2.0% | `--spring-snappy-duration: 0.34s` | the tab-indicator register — CRISP, minimal bounce. The "control" default; too subtle for the ask. |
| `dock` | 0.32 / 0.70 | ~+4.6% | `--spring-dock-duration: 0.28s` | what PagerDots uses NOW. Tame. |
| **`bouncy`** | **0.5 / 0.55** | **~+12.6%** (Apple 12-18% band) | **`--spring-bouncy-duration: 0.57s`** | **THE WORM TRAVEL** — the explicit overshoot + the longer 0.57s clock give the WEIGHT + BOUNCE the user wants; the goo necks, overshoots its target, settles. |

### Recommendation — a two-clock split (the canon's P1/P3 coupling)

- **TRAVEL (the worm glide between dots) → `--spring-bouncy` @ `--spring-bouncy-duration`
  (0.57s).** This is the SPATIAL leg (position morph). The overshoot is the bounce; the
  0.57s clock is the weight/inertia. This is the single biggest lever for the "liquid +
  squishy" read and is the preset the user's law points at (`enter bouncy/overshoot`).
- **SQUISH RELEASE → keyed to the SAME travel clock** (the `INDICATOR_RELEASE_AT_ARRIVAL`
  pattern from `useTabIndicator.ts:249` — `clockMs(el) * INDICATOR_RELEASE_AT_ARRIVAL`),
  so the `--stretch` peaks DURING travel and releases AT arrival (grow-then-shrink). Read
  the clock from `--spring-bouncy-duration` instead of `--tab-indicator-duration`.
- **The background/color cross-fade (active fill lift) → bezier `--ease-standard`** (an
  EFFECTS leg, motion-canon P1 — a color cross-fade on a spring reads as a wobble). The
  current PagerDots already does this (`background … var(--ease-standard)`); KEEP.

This is the per-spring-duration-clock mandate (motion-canon **P4/P7**): the worm reads
its OWN `--spring-bouncy-duration`, never a generic `--duration-*`. Expose it as a
`--pager-worm-spring` / `--pager-worm-duration` token pair defaulting to bouncy so a
consumer (a calm deck) can re-point to `--spring-snappy` without a fork (§6 token surface).

> Optional higher-fidelity path: drive the worm off a live `SpringProgress`
> (`useLiquidMorph`'s loop shape, `src/composables/motion/useLiquidMorph.ts`) writing a
> `--worm-t` scalar per frame + feeding `useLiquidFlex.drive(t)` so the squish reads the
> spring's REAL per-frame velocity (the `"tanh"` law). This is the goo-blob-faithful
> path (velocity-driven swell) but adds a rAF loop + the keyframes peer (→ `/motion`,
> off root barrel). The CSS-`linear()`-transition path (§1a) is cheaper, Safari-safe,
> and sufficient for the dot worm — PREFER it unless the live-velocity squish proves
> necessary at W-REFLECT.

---

## 3. The `--pager-*` token surface

KEEP every existing `--pager-dot-*` token (PagerDots.vue:173-177) — they are the
consumer retint seam (`slides` sets `--pager-dot-active: var(--ncsu-red)`,
presets-in-consumers). ADD the worm-morph tokens beside them:

| Token | Default | Role |
|---|---|---|
| `--pager-dot-size` | `0.375rem` (6px) | KEEP — base pip diameter (the dot the worm rests at) |
| `--pager-dot-elongated` | `1.5rem` (24px) | KEEP — the worm's elongated length along the rail axis |
| `--pager-dot-active` | `var(--foreground)` | KEEP — worm fill + active dot fill |
| `--pager-dot-inactive` | `52% --foreground` | KEEP |
| `--pager-dot-hover` | `72% --foreground` | KEEP |
| **`--pager-worm-spring`** | `var(--spring-bouncy)` | NEW — the worm travel spring `linear()` (consumer re-points to `--spring-snappy` for a calm deck) |
| **`--pager-worm-duration`** | `var(--spring-bouncy-duration)` | NEW — the worm travel clock (paired with the spring per P4) |
| **`--pager-worm-max-stretch`** | `1.08` | NEW — the LOW squish cap fed to `useLiquidFlex.maxStretch` (the tab `DEFAULT_INDICATOR_MAX_STRETCH` value; live-read so a consumer retunes the swell) |
| **`--pager-worm-goo-strength`** | (filter-local) | NEW (if SVG-goo) — the `feGaussianBlur` stdDeviation / threshold the goo-neck reads; bounded so the merge reads liquid, not blobby |

All worm tokens follow the house pattern: a `var(--token, fallback)` read so a consumer
`:root`/scope override cascades in with zero `:deep()` and zero fork (the
`--metric-row-*` / `--dock-scale` consumer-token precedent). The reciprocal `--stretch`
custom is INTERNAL (the indicator precedent — it is JS-written, not a public knob).

If the worm runs on a live `SpringProgress` (§2 optional path), register `--worm-t` as a
Houdini `@property <number>` in `property-regs.css §18` (the `--dock-morph-t` /
`--border-progress-fill` precedent — a bare unregistered `var()` snaps; the typed reg
lets the engine interpolate). The CSS-`linear()`-transition path needs NO `@property`
(the transition interpolates `transform` directly).

---

## 4. The a11y / windowFit / orientation constraints to PRESERVE (un-touched)

The worm changes ONLY the active-indicator paint+travel. Everything else is BYTE-KEPT —
the builder must not regress any of:

- **The 24px hit-box** (WCAG 2.5.8 target-size) — the transparent `button` stays 24×24,
  the painted pip/worm is centered by the grid. UNCHANGED.
- **The aria register split** (PagerDots.vue:122-148):
  - `pattern="tabs"` (carousel) → `role="tablist"`/`role="tab"` + `aria-selected`.
  - `pattern="group"` (DeckPager) → `role="group"`/`aria-current`.
  - The worm is a PRESENTATIONAL `aria-hidden` element (like the tab indicator) — it
    carries NO role; the dot buttons keep their semantics. **Do not put the worm on a
    focusable/role-bearing node.**
- **`windowFit`** (the `pagerWindow` oracle, `pagerWindow.ts`) — the windowed rail,
  centered on active, with `data-edge` dimmed clip cues. The worm travels between the
  SHOWN dot centers; at a clipped edge it must still anchor on the active dot's painted
  center. The `pagerWindow` math is DOM-free + the ONE oracle (PagerDots + DeckPager both
  source it). **NEVER re-fork `pagerWindow`** (the deck-boundary fence; `pagerWindow.ts`
  header is explicit — there is no third copy).
- **Keyboard focus-survival across a window recompute** (PagerDots.vue:102-110) — if the
  focused dot scrolls out of the window, focus moves to the active dot, never `<body>`.
  The worm must not break this (it is `aria-hidden`, so it is not a focus target — fine).
- **Orientation** (`orientation: "horizontal" | "vertical"`) — the worm travel axis is
  derived off `data-orientation` (the tab `vertical.value` precedent: horizontal →
  translateX + stretch-X; vertical → translateY + stretch-Y). The reciprocal `--stretch`
  pairing flips per axis (§1b). KEEP both axes.
- **The `ring` glass chassis** (`.glass-pager-ring`) — UNCHANGED.
- **DeckPager is a THIN wrapper** — it composes PagerDots via `pattern="group"`; it gets
  the worm for free, ZERO DeckPager change (the no-re-implementation fence). The
  goo-morph lands ONCE in PagerDots; DeckPager + carousel both inherit it (≥2 consumers
  by construction).

---

## 5. Compositor-only / PRM / Safari rules (motion-canon P5/P6 + `proof:no-layout-animation`)

These are BINDING and gate-enforced. The current PagerDots `width`/`height` transition
VIOLATES P5 — the worm rewrite is partly a FIX for that.

- **P5 — COMPOSITOR-ONLY.** The worm travels on `transform: translate` and deforms on
  `scale` (the `--stretch` reciprocal) + `opacity` + `filter` (the goo blur). It NEVER
  animates `width`/`height`/`inline-size`/`block-size`/`left`/`top`/`padding`/`margin`
  — the per-frame reflow set `proof:no-layout-animation` forbids library-wide. **The
  elongation that LOOKS like a width grow is a `scale` over a reserved footprint**, the
  W-CARD-COMPOSITE / `useLiquidFlex.sizeStyle`-is-a-one-time-reserve discipline
  (motion-canon P5: "a SIZE/MORPH animation is `transform: scale()` over a RESERVED
  settled footprint, never an animated box dimension"). The worm reserves its
  `--pager-dot-elongated` box ONCE; the visible travel + squish are all `transform`.
- **P3 — fade coupled to transform.** The worm's fill lift (inactive→active) couples
  opacity/color (EFFECTS leg, `--ease-standard`) with the transform travel (SPATIAL leg,
  the bouncy spring). The dot the worm leaves fades to inactive; the dot it arrives at is
  subsumed by the worm — one continuous layer, not two box transitions.
- **P6 — PRM keeps the fade, drops the transform.** Under
  `prefers-reduced-motion: reduce`: the worm SNAPS to the active dot center (no travel
  spring, no overshoot), the `--stretch` stays 1 (no squish — `squishOnTravel`
  early-returns on PRM, the `useTabIndicator.ts:206` precedent), the goo filter is off,
  and ONLY the color/opacity fill cross-fade survives (shortened). The pager STILL
  FUNCTIONS (the active dot is still indicated). The current PagerDots PRM arm
  (`@media (prefers-reduced-motion: reduce)` dropping the width/height transition,
  PagerDots.vue:236-240) is the model — KEEP that shape, extended to the worm transform.
  - The PRM carve is single-sourced at `a11y-overrides.css` (the universal
    `*:not([data-allow-motion])` `transition-property` restriction strips every transform
    transition library-wide) + the recipe-local keep-fade. The worm needs its OWN
    recipe-local PRM block (the `transitions.css` recipe precedent) since it carries
    explicit legs + a JS `--stretch` write that must early-return.
- **Safari / WebKit.** All worm channels are WebKit-safe:
  - `transform: translate`/`scale` + CSS `transition` — universally compositor-accelerated.
  - `linear()` timing function (the `--spring-*` curves) — Baseline, Safari 17.2+.
  - `filter: blur()` (the SVG goo `feGaussianBlur`) — WebKit-native; the `filter` blur is
    the surface's OWN pixels (NOT `backdrop-filter`, which would clobber the glass plate
    blur — the W-LIQUID-REVEAL rule: "the blur rides `filter` not `backdrop-filter`").
  - If the live-`SpringProgress` path is used, the `@property <number>` reg crosses
    Baseline 2024-07-09 (Safari 16.4+) — the `--border-progress-fill` precedent; the
    `initial-value` is the safe fallback on a non-supporting engine.
  - The `mix-blend-mode`/SVG-goo filter merge is the morph-bridge.css precedent (already
    shipped + Safari-verified); reuse its filter, do not author a second goo filter.

---

## 6. The composition summary (what the builder wires)

| Gap | COMPOSE (shipped leaf) | Fence (no re-fork) |
|---|---|---|
| Worm travels between dot centers | the `useTabIndicator` travel SHAPE: `transform: translate` to center, CSS `transition` on a `--spring-*` `linear()` clock, axis-derived | don't fork `useTabIndicator` (tab-coupled); inline the dot-geometry glue OR factor a shared `useTravelSquish` leaf |
| Volume-preserving squish on travel | `useLiquidFlex` (`squishLaw: "linear"`, `maxStretch` live-read), `--stretch` reciprocal CSS | `useLiquidFlex` is the ONE squish engine (W-LIQUID); no second `tanh`/`1+frac·(cap−1)` write |
| Goo-neck merge at the crossing | the CSS SVG-goo bridge (`morph-bridge.css` `feGaussianBlur`+`feColorMatrix`), deterministic `f(--worm-t)` | don't mount goo-blob (non-deterministic `uTime`); reuse the shipped deterministic filter |
| The bounce + weight clock | `--spring-bouncy` @ `--spring-bouncy-duration` (0.57s, overshoot ~+12.6%) | a `SPRING_PRESETS` row, never a new family (W-GLASS-CAL spring fence) |
| Release-at-arrival | `INDICATOR_RELEASE_AT_ARRIVAL` × the bouncy clock (the `useTabIndicator` release pattern) | reuse the constant + shape |
| Windowing | `pagerWindow` oracle (unchanged) | NEVER a third copy (deck-boundary fence) |
| Deck inheritance | DeckPager composes PagerDots via `pattern="group"` — worm for free | no DeckPager re-implementation |
| Tokens | `--pager-dot-*` KEPT + `--pager-worm-*` added (§3) | consumer-token `var(--t, fallback)` pattern, no `:deep()` |
| Compositor/PRM/Safari | transform+scale+opacity+filter only; PRM snaps+keeps-fade; `filter` not `backdrop-filter` | `proof:no-layout-animation` + motion-canon P5/P6 (the CURRENT width/height transition is the violation this fixes) |

**Net:** the goo-morph pager is `useTabIndicator`'s traveling-squishing-indicator shape,
applied to dot centers, on the `--spring-bouncy` clock, with the squish from
`useLiquidFlex` and a deterministic CSS goo-neck from the morph-bridge filter — all
compositor-only, PRM-carved, Safari-safe, landing ONCE in PagerDots so DeckPager + the
carousel both inherit it. It composes four shipped leaves and re-forks none.
