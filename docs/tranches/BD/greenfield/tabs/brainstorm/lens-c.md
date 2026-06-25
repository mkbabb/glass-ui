# TABS greenfield — Lens C: AUDACIOUS CARTOON-TECHNICOLOR PUNCH

> The user designates TABS as the GLASSY GOLD STANDARD that buttons + dock-buttons
> will emulate. This lens designs the tab indicator + capsule + hover register for
> **maximum 1940s-technicolor flow & punch** — anticipation, exaggeration,
> follow-through, overlapping action, arcs, real squash & stretch with weight &
> inertia — while staying idiomatic, cross-engine, and a UNION with the shipped
> `SegmentedTabs` + `segmented-tabs.css` + `useTabIndicator` + `useLiquidFlex`.
> It also **extracts the reusable glassy register** (the `.glass-tab-capsule`
> recipe + a small token vocabulary) the buttons greenfield consumes.

---

## 0. The live-interrogation findings (measured, both modes, `:5173/navigation/tabs`)

Chrome-devtools-mcp, getComputedStyle + a mid-flight rAF frame-series on a far jump
(Grid → Timeline). The SOURCE-VERIFIED status quo (not anchored on — the bar to BEAT):

| Question | Measured truth | Verdict |
|---|---|---|
| (1) **Glide + velocity squish?** | YES — `--stretch` peaked **1.13** mid-travel, `scale: 1.13152 0.883769` in flight (volume-preserving reciprocal, center-pinned cx 319→555), settling to `scale:1 / --stretch:1` at rest on `--spring-snappy` @ `--tab-indicator-duration` (0.4s). | **Glide+squish ALIVE.** But it is a *travel-axis gel-stretch only*: NO grow-overshoot AREA (never bigger than target → W-TABS-LIQUID's 5-beat unbuilt), and the spring is `snappy` (≤7% overshoot), not the cartoon punch. |
| (2) **Active tab = warm glass capsule?** | YES both modes. Light indicator `oklab(0.793 +0.005 +0.012 / 0.84)`, dark `oklab(0.379 +0.010 +0.017 / 0.89)` — warm, chroma present, **never gray**. Composite: `--glass-rim-top` (white catch) + `--glass-rim-bottom` + `--glass-shadow-floating` (lift). Reads the W55 `--glass-bg-floating-tinted` adaptive seam. | **Capsule is warm glass, six-layer, both modes.** But the **TRACK is flat** (`box-shadow` = rim-only, NO inset recess well → W-TAB-IOS-CAPSULE recess unbuilt) so the lifted pill floats on a flat strip, not seated in a sunken channel. |
| (3) **Hover register worth emulating?** | NO. Rest/active tab transition is `color 0.2s` ONLY. No bg-lift, no scale, no specular, no glass-hover. The buttons would inherit *nothing*. | **The single biggest extraction gap.** There is NO glassy hover register to emulate yet — it must be MINTED here. |
| (4) **Liquid-weight law present?** | PARTIAL. `--stretch` velocity-squish ✓. But `--ease-cartoon-punch` resolves to **EMPTY** and `--motion-weight` resolves to **EMPTY** — both are design.md spec-only, **NOT minted in `src/styles`** (grep-confirmed). The cartoon register has no live substrate. | **The §L2/§L4 cartoon vocabulary is undocked.** Tabs cannot exercise anticipation/punch because the curve does not exist as a token. |
| (5) **Extractable glassy register?** | The capsule composite exists *inline* in `segmented-tabs.css:91-122` only. No factored `.glass-tab-capsule`. No commit accent-flood. No per-glyph scale-pop. | **Must factor the capsule + mint the hover + commit registers** so buttons consume by class, not copy. |

**The gestalt verdict (both-mode screenshots, over the live aurora field):** the
capsule reads warm-glass and the glide is liquid — the *foundation is fit*. What is
missing is the PUNCH: the indicator slides confidently but does not **launch** (no
anticipation dip), does not **over-arrive** (snappy ≤7%, not a cartoon pop), the
landed tab's glyph does not **scale-pop**, there is no **accent-flood** trailing the
commit (T4's crimson-flood signature), and the track does not **sink** to seat the
lifted pill. And there is **no hover glass** at all to hand the buttons.

---

## 1. The core idea — THE LIQUID PUNCH-CAPSULE

One sentence: **the tab indicator becomes a metaball capsule that ANTICIPATES (dips
back), LAUNCHES with a volume-preserving travel-squish, OVERSHOOTS its target as a
swollen blob, then SETTLES-and-SHRINKS to fit while the destination glyph scale-pops
and a one-shot technicolor accent-flood washes the plate and clears — all seated in a
recessed warm-glass track, all on ONE calibrated clock, all compositor-only — and the
whole capsule + hover + commit recipe is factored into a reusable `.glass-tab-capsule`
register the buttons greenfield adopts wholesale.**

This is the deliberate UNION of the two pending waves, hardened to the cartoon bar:

- **W-TAB-IOS-CAPSULE** gives the *material*: recessed track + lifted warm-glass
  capsule, factored to `.glass-tab-capsule`, both modes, §3 field-aware.
- **W-TABS-LIQUID** gives the *motion envelope*: the 5-beat grow → blob-overshoot →
  travel → settle → shrink, via a SECOND `useLiquidFlex` area channel (`--tab-blob`).
- **This lens ADDS the PUNCH** that neither wave names: (a) mint `--ease-cartoon-punch`
  + `--motion-weight` as the live §L2/§L4 substrate they were always specified to have;
  (b) the indicator's open-beat rides the punch curve (real anticipation dip) scaled by
  `--motion-weight`; (c) the destination glyph scale-pops (overlapping action — it
  settles AFTER the capsule, follow-through); (d) a one-shot `--tab-commit-flood`
  accent wash trails the SPATIAL leg then clears (the T4 crimson-flood, EFFECTS-after-
  SPATIAL); (e) the moving cartoon-shadow offset slides opposite the glide (§Shadows).

### The single boldest move

**Re-time the indicator off `--ease-cartoon-punch` instead of `--spring-snappy` for
the SELECTION glide, with a real anticipation pre-dip and a ~22% overshoot, then let
the `--tab-blob` metaball area-envelope ride that SAME curve so the capsule literally
recoils-back, launches, swells past the target as a goo-blob, and snaps to fit — a tab
switch that reads like a *cel-animated character anticipating a jump and landing with
a squash*, not a UI element sliding.** The punch magnitude is governed by ONE scalar,
`--motion-weight` (rest `0.62 ≈ 1/φ`), so PRM zeroes it to a clean slide in one
assignment and the buttons inherit the exact same dial. This is the move that makes
tabs the gold standard worth emulating — it is alive, it has weight, and it is ONE
token away from calm.

---

## 2. The mechanism — precise, source-verified, no re-fork

Every cited token/composable/selector below was grep-verified to exist (or is
explicitly marked NEW-mint with its home file). The engine (`useTabIndicator` position
+ `useLiquidFlex` squish) is REUSED, never re-forked.

### 2.1 Mint the cartoon substrate (Band-0 foundation — the undocked §L2/§L4 tokens)

These are design.md-specified but absent from `src/styles` (grep-confirmed empty). The
tabs greenfield REQUIRES them; mint once, library-wide.

```css
/* src/styles/tokens/scheme-motion.css §Easing — the Cartoon punch curve (§L2).
   Anticipates (~4% dip below origin — a thing no damped spring expresses),
   crosses 1.0, peaks ~1.22, settles. A raw linear() easing token, NOT a
   SPRING_PRESETS row (keeps the ≤10% spring-overshoot invariant intact) and NOT
   a typed MOTION_CURVES entry. Compositor-safe (drives transform only). */
--ease-cartoon-punch: linear(
  0, -0.018 6%, -0.04 12%, 0.02 22%, 0.38 36%, 0.74 48%,
  1.0 60%, 1.16 70%, 1.22 76%, 1.14 82%, 1.04 88%, 0.99 94%, 1 100%
);
--ease-cartoon-punch-duration: var(--spring-bouncy-duration); /* 0.62s — the punch needs room */

/* src/styles/tokens/scale-paper.css §Motion — the one cartoon-amount scalar (§L4).
   Co-scales squash depth, overshoot share, anticipation pull, cartoon-shadow
   travel. Rest 1/φ. PRM → 0 (one assignment zeroes all five). */
--motion-weight: 0.62;
@media (prefers-reduced-motion: reduce) { :root { --motion-weight: 0; } }
```

Self-test the punch curve actually dips below 0 (anticipation) and exceeds 1.10
(past the spring fence) — that is what makes it a *register*, not a spring.

### 2.2 The recessed track + the factored capsule (the W-TAB-IOS-CAPSULE material)

**Recessed track** — add the iOS sunken well to `.segmented-tabs` `box-shadow`, as a
PLAIN per-mode inset pair (the MEMORY light-dark()-inset-shadow trap is binding — an
inset fragment inside `light-dark()` computes the WHOLE box-shadow to `none`):

```css
/* tokens/glass.css (light arm) + tokens/dark-arm.css (dark arm) — PLAIN per-mode */
--tab-track-recess-ink: color-mix(in srgb, var(--foreground) 7%, transparent);   /* light */
--tab-track-recess-ink: color-mix(in srgb, var(--foreground) 11%, transparent);  /* dark arm */

/* segmented-tabs.css .segmented-tabs — append the inset recess leg (static, never animated) */
box-shadow:
  var(--glass-rim-top), var(--glass-rim-bottom),
  inset 0 1px 2px var(--tab-track-recess-ink);   /* the sunken channel */
```

**Factor the capsule** — lift the inline `.segmented-indicator` composite
(`segmented-tabs.css:91-122`, verified) into a shared `@layer components` recipe so
both the tab pill AND the buttons greenfield compose it (≥2 consumers, the extraction):

```css
/* NEW: src/styles/glass/tab-capsule.css, @import-ed in index.css AFTER the glass
   ladder, BEFORE the consuming tabs/dock/button recipes. */
@layer components {
  .glass-tab-capsule {
    /* the W55 adaptive seam — surfaces.css:283 :where() widens to include this */
    background: var(--glass-bg-floating-tinted);
    backdrop-filter: var(--glass-blur-floating);
    -webkit-backdrop-filter: var(--glass-blur-floating);
    box-shadow:
      var(--glass-rim-top),       /* bright top catch-light (FORWARD device) */
      var(--glass-rim-bottom),    /* warm under-shadow */
      var(--glass-shadow-floating); /* the lift off the recessed track */
  }
}
```

`.segmented-indicator` composes `.glass-tab-capsule` (drops its inline fill/rim/lift —
clean break, no alias). The dock-tab selected register re-points its fill onto the SAME
class (the W-REGISTER-IOS fold — one selected-accent language across content + dock
tabs). Verified seam: `surfaces.css:283 --glass-bg-floating-tinted` already mints the
oklab-tinted adaptive pair on `:where(.btn-glass, .segmented-indicator)` — widen the
`:where()` to include `.glass-tab-capsule` so the capsule darkens-to-legible over a
bright field / stays warm-cream over a calm field (measured: light `oklab L .79`,
dark `L .38`, both chroma-positive — the no-gray identity preserved).

### 2.3 The 5-beat liquid punch envelope (W-TABS-LIQUID, hardened to the cartoon bar)

EXTEND `useTabIndicator.ts` (verified: one `useLiquidFlex` at `:172`, squish-only,
`"linear"` law, cap `--tab-indicator-max-stretch`=1.18) with a SECOND `useLiquidFlex`
— the AREA-inflation channel — composed alongside the untouched travel-squish:

```ts
// useTabIndicator.ts — beside liquidSquish (the existing :172 travel channel)
const blob = useLiquidFlex({
  from: 1, to: 1.12,            // the metaball over-inflation peak
  axis: "width", squishLaw: "linear",
  maxStretch: () => blobCap,    // reads --tab-indicator-blob-max (default ~1.12, ≤1.2 anti-taffy)
});
```

Mint `@property --tab-blob { syntax:"<number>"; inherits:false; initial-value:1 }` in
`property-regs.css` (the `--stretch`/`--dock-morph-t` registered-scalar precedent — a
bare custom snaps; the reg lets the CSS glide INTERPOLATE it). On `squishOnTravel`:

1. **Anticipation (NEW beat).** Before the position write, the capsule `transform`
   eases on `--ease-cartoon-punch` — the curve's −4% pre-dip IS the anticipation
   (capsule recoils opposite the travel direction for ~1 frame), scaled by
   `--motion-weight` so PRM kills it. No JS timer — the curve carries it.
2. **Grow + overshoot.** `blob.drive` writes `--tab-blob` to the overshoot peak on the
   SAME synchronous frame as the existing `--stretch` open (`:243`) — the capsule
   inflates past the target footprint (a goo-blob bigger than the destination tab).
3. **Travel swollen.** The capsule glides (existing anchor `inset` / JS `transform`
   path, untouched) while `--tab-blob` > 1 and `--stretch` carries the axis gel-stretch.
4. **Settle + shrink.** At the SAME `releaseAt` the squish releases (`:249-254`,
   `INDICATOR_RELEASE_AT_ARRIVAL` × `clockMs`) — ONE timer, lockstep — `--tab-blob`
   de-inflates to 1. The `--ease-cartoon-punch` overshoot gives the ζ<1 liquid land.

The CSS composes both scales into ONE write (multiplicative, center-anchored, the
BA-VJS-3 center-pin preserved):

```css
.segmented-indicator {
  /* area-times-squish: blob inflates both axes, squish stretches one / compresses
     the other reciprocally — volume-preserving squish ON a uniform inflation */
  scale: calc(var(--tab-blob,1) * var(--stretch)) calc(var(--tab-blob,1) / var(--stretch));
}
@media (prefers-reduced-motion: no-preference) {
  .segmented-indicator { transition: scale var(--ease-cartoon-punch-duration) var(--ease-cartoon-punch); }
}
```

The `underline` hairline does NOT inflate (it has no plate to deform — the existing
`isUnderline` early-return holds; the paper material stays a crisp slide).

### 2.4 The destination glyph scale-pop (overlapping action / follow-through, §L4 #5)

The landed tab's LABEL settles AFTER the capsule — the child trails the parent (the
canonical follow-through). Pure CSS, gated on the active attribute, ON the calibrated
clock with a small delay so it overlaps the capsule arrival, not synchronous:

```css
.segmented-tab[aria-selected="true"], .segmented-tab[aria-pressed="true"] {
  /* the scale-pop rides --motion-weight (0 → no pop under PRM) on the punch curve */
  --pop: calc(1 + 0.06 * var(--motion-weight));
}
@media (prefers-reduced-motion: no-preference) {
  .segmented-tab { transition: color var(--duration-fast) ease,
                               scale var(--spring-snappy-duration) var(--spring-snappy) 60ms; }
  .segmented-tab[aria-selected="true"] { scale: var(--pop, 1); }  /* settles past the capsule (overlap) */
}
```

The existing `.segmented-tab { scale:1; translate:0 }` identity base (`:235`, verified
— kept so a transform never mints a stacking context that severs `anchor()`) makes
this a byte-safe change of the value, not a new property.

### 2.5 The one-shot commit accent-flood (the T4 crimson-flood — EFFECTS trails SPATIAL)

On commit, a momentary full-plate accent wash blooms over the capsule and clears
(IOS27-REFERENCE T4 / v3 f006→f007, EFFECTS-after-SPATIAL). A registered `@property
--tab-commit-flood` (0→1→0) drives a `plus-lighter`/`screen` pseudo-layer reading the
selected `--glass-accent` (BB.W-GLASS-ACCENT axis, grep-verified to exist), PRM-static:

```css
@property --tab-commit-flood { syntax:"<number>"; inherits:false; initial-value:0 }
.segmented-indicator::after {
  content:""; position:absolute; inset:0; border-radius:inherit; pointer-events:none;
  background: radial-gradient(120% 140% at 50% 50%,
    color-mix(in oklab, var(--glass-accent, transparent) 55%, transparent), transparent 70%);
  mix-blend-mode: plus-lighter;   /* additive bloom, sRGB-safe */
  opacity: var(--tab-commit-flood, 0);
}
```

`squishOnTravel` kicks `--tab-commit-flood` to 1 a beat AFTER the SPATIAL open (the
EFFECTS-trails-SPATIAL ordering — same one timer, a second phase, not a second clock)
then eases it to 0. The accent is a CONSUMER accent (presets-in-consumers — the de-RED
neutral lift is the default identity; the consumer sets `--glass-accent` + the selected
glyph color). Default `--glass-accent: transparent` → zero flood, byte-identical rest.

### 2.6 The glassy HOVER register (the EXTRACTION the buttons need — currently absent)

The measured gap: tabs have NO hover glass (just `color 0.2s`). MINT it on
`.glass-tab-capsule` as a reusable hover-bloom so buttons + dock-buttons inherit it:

```css
@layer components {
  .glass-tab-capsule, .glass-tab-hoverable {
    --glass-specular: 0;  /* the W-GLASS-CAL specular register, disco-FREE */
    transition: --glass-specular var(--duration-fast) ease,
                box-shadow var(--duration-fast) ease;
  }
  /* a REST tab hover blooms a sub-perceptual specular catch + a hair of lift */
  .segmented-tab:not([aria-selected="true"]):hover {
    color: var(--foreground);
    background: color-mix(in srgb, var(--glass-bg-wash) 60%, transparent); /* glass-hover bg, warm */
    border-radius: var(--bouncy-slider-radius);
    transition: color var(--duration-fast) ease, background var(--duration-fast) ease;
  }
}
```

This is the **glassy register the buttons greenfield consumes**: a rest button is a
`.glass-tab-capsule`-class glass plate; hover blooms a warm `--glass-bg-wash` lift +
specular catch (never gray, never a flat `:hover { opacity }`); active/pressed is the
forward floating-tinted capsule with the punch. ONE recipe, three consumers (tab pill,
default button, dock button).

### 2.7 The moving cartoon-shadow (§Shadows — the cel cast, optional loud variant)

For the audacious demo variant only (opt-in, `<SegmentedTabs surface="cartoon">`): the
capsule's cartoon-shadow offset slides OPPOSITE the glide via a `::before` shadow-caster
`transform` (never an animated `box-shadow` — paint-bound, §L7), scaled by
`--motion-weight`. The cast deepens on the press-beat and snaps back on settle. Reads
`.shadow-cartoon-md` (verified utility family in design.md §Shadows). PRM → static cast.

---

## 3. How it composes EXISTING primitives (deft, KISS, DRY — the UNION ledger)

| Need | Reused primitive (verified on disk) | New surface |
|---|---|---|
| Position glide | `useTabIndicator` anchor/JS path (untouched) | — |
| Travel squish | `useLiquidFlex` squish-only `:172` (byte-fenced) | — |
| Area envelope | SECOND `useLiquidFlex` (`from:1,to:1.12`) — same primitive | `--tab-blob` reg + driver |
| Registered scalar | `@property` precedent (`--stretch`/`--dock-morph-t`) | `--tab-blob`, `--tab-commit-flood` |
| Capsule material | inline composite `segmented-tabs.css:91-122` | factored `.glass-tab-capsule` |
| Adaptive seam | `--glass-bg-floating-tinted` `surfaces.css:283` | `:where()` widened |
| Accent | `--glass-accent` (BB.W-GLASS-ACCENT) | `::after` flood layer |
| Springs | `--spring-snappy`/`-bouncy` (verified live) | `--ease-cartoon-punch` (mint) |
| Cartoon dial | design.md §L4 (spec-only) | `--motion-weight` (mint) |
| Recess | `--glass-rim-*` (verified) | `--tab-track-recess-ink` per-mode pair |

No new component, no second indicator engine, no second spring/rAF/timer (the envelope
+ flood ride the ONE `clockMs`/`INDICATOR_RELEASE_AT_ARRIVAL` schedule).

---

## 4. Cross-engine (Chrome + Safari) — the §L7 arm

Every channel is **compositor-only `transform`/`scale` + registered customs + static
shadows** — NO `backdrop-filter: url()`, NO WebGL, NO SVG goo. The metaball "blob" is a
pure `scale` over-inflation on the indicator's OWN box (the BC.W-LIQUID-TAB cross-engine
precedent: "pure compositor transform, works identically on WebKit"). `mix-blend-mode:
plus-lighter` is sRGB-safe and Baseline. `@property --tab-blob`/`--tab-commit-flood`
interpolation is Safari-26 Baseline; on a gap engine `initial-value` is the safe rest
(slide without inflation/flood — degraded, never broken). The recess inset shadow + rim
+ backdrop-filter capsule are all Safari-native. Enroll on the webkit Playwright project
+ a `safari-support-matrix` row. Paired-engine π capture is the acceptance proof.

---

## 5. A11y / PRM carve (§L5)

- **PRM (`prefers-reduced-motion: reduce`):** `--motion-weight → 0` (one assignment)
  zeroes anticipation, blob inflation, glyph pop, cartoon-shadow travel. The existing
  `squishOnTravel` PRM early-return (`:206`) keeps `--stretch`/`--tab-blob` at 1. The
  indicator SNAPS to the destination at fit; the recess + capsule lift (static) remain
  — the legibility floor holds for everyone. The flood `@property` stays 0.
- **`prefers-reduced-transparency`:** the capsule's tinted fill floors toward the
  opaque escape via the existing `--glass-level` machinery (no new path); the recess +
  rim survive as legibility anchors.
- **`prefers-contrast: more`:** the cartoon-shadow/rim opacity floors UP (inked edge is
  a legibility asset, design.md §Shadows).
- **Focus:** the existing reka-ui/`SegmentedTabs` roving-tabindex + `aria-selected`
  semantics are untouched — this is a surface/motion layer under the indicator, not the
  selection model. Focus-visible reads the `--focus-ring-shadow` register (unchanged).
- **Proportion has NO a11y bracket** (§L6) — the √φ/φ geometry holds across all states.

---

## 6. The DELTA-ASSAY → the wave amendment

**Reconciles BD.W-TABS-LIQUID + BD.W-TAB-IOS-CAPSULE into ONE buildable surface, plus
the cartoon-punch hardening + the extraction the buttons greenfield consumes:**

1. **W-CARTOON-SUBSTRATE (NEW, Band-0 dependency):** mint `--ease-cartoon-punch` (+
   `-duration`) and `--motion-weight` (rest 1/φ, PRM→0) as the live §L2/§L4 tokens.
   *Born-RED:* both grep-empty today. Self-test the curve dips < 0 and peaks > 1.10.
2. **W-TAB-IOS-CAPSULE (build as specced) + amendment:** factor `.glass-tab-capsule`
   into `glass/tab-capsule.css`; widen `surfaces.css:283 :where()` to include it; add
   the `--tab-track-recess-ink` PLAIN per-mode recess (light-dark()-trap fenced).
3. **W-TABS-LIQUID (build as specced) + amendment:** the open-beat eases on
   `--ease-cartoon-punch` (anticipation pre-dip), scaled by `--motion-weight`; the
   blob/glyph-pop/flood magnitudes all read `--motion-weight` so the punch is ONE dial.
4. **W-TAB-COMMIT-FLOOD (NEW, folds T4):** `--tab-commit-flood` accent wash, EFFECTS-
   trails-SPATIAL, consumer-accent, PRM-static, default transparent (byte-identical rest).
5. **W-TAB-GLYPH-POP (NEW, folds T4):** destination-label scale-pop with overlap delay.
6. **The hover register (NEW):** the `.glass-tab-capsule` / `.glass-tab-hoverable`
   warm specular+wash hover bloom — the absent register the buttons need.

**THE EXTRACTED GLASSY REGISTER (named for the buttons greenfield to consume):**

> **`.glass-tab-capsule`** + the token vocab **`{ --glass-bg-floating-tinted` (adaptive
> forward fill, never gray, both modes) · `--glass-rim-top` / `--glass-rim-bottom`
> (the FORWARD-ness directional rim) · `--glass-shadow-floating` (the lift) ·
> `--glass-specular` (disco-free hover catch) · `--glass-bg-wash` (the warm hover-lift
> bg) · `--motion-weight` + `--ease-cartoon-punch` (the punch dial) · `--scale-press`
> (the §L3 press squish) }`** — three states: **REST** = `.glass-tab-capsule` glass
> plate; **HOVER** = warm `--glass-bg-wash` lift + `--glass-specular` catch (never a
> flat opacity dim); **ACTIVE/PRESS** = forward floating-tinted capsule + the cartoon
> punch + `--scale-press` squish. This is the gold-standard register the user pinned:
> buttons + dock-buttons re-class onto `.glass-tab-capsule` and get the warm glass +
> the better hover + the punch for free, no copy.

---

## 7. The gate must reproduce the REAL gesture (not arithmetic/seed/computed)

The π MUST drive a real tab-switch click and judge painted pixels (the prior-golden
failure modes — invented levers, arithmetic gates, stop-strings, computed-not-measured,
ancestor-filter-kills-glass — are explicitly forbidden):

- **Reproduce the gesture:** `select(toIdx)` via a real `.click()` on a far jump, both
  modes + webkit, over a LIVE aurora field (so the W55 adaptive arm + the §3 colorful-
  field-behind-glass engages), NEVER `reducedMotion` (the live-morph arm).
- **Judge the glide gestalt on a frame-series (painted pixel, measured bbox):**
  - **Anticipation:** the capsule center moves OPPOSITE the travel by ≥1px before
    launching (the pre-dip is real, not arithmetic) — control pinned at
    `--motion-weight:0` shows zero pre-dip.
  - **Grow + overshoot:** measured bbox AREA exceeds the destination tab's footprint by
    the overshoot ratio (~1.08–1.12×) at the peak frame (the metaball over-inflation).
  - **Travel swollen → settle → shrink:** center traverses the gap while area > 1, then
    de-inflates to the target footprint across ≥2 frames (legible shrink, not a snap),
    with a ζ<1 land (small overshoot-undershoot in the area trace).
  - **Center-pin:** the capsule stays pinned to the destination label center across the
    whole envelope (BA-VJS-3 holds under blob × squish).
  - **Glyph-pop:** the destination label's measured scale peaks AFTER the capsule
    settles (overlap — a frame-ordering assertion, not a value check).
  - **Commit-flood:** the plate's accent-channel luminance blooms then clears, TRAILING
    the SPATIAL leg (EFFECTS-after-SPATIAL frame-ordering).
  - **Capsule warm-glass, both modes:** `meanChroma ≥ 0.02` on the capsule fill (no-gray
    identity) AND `capsule meanL > track meanL > track-recess-edge meanL` (the recessed-
    well + lifted-accent gestalt — the iOS-27 measured assertion).
  - **Material fence:** `variant="underline"` reads a crisp slide, NO area inflation.
  - **PRM single-paint:** under reduce, one static frame at fit, zero inflation/flood.
- **Cross-engine:** the SAME assertions PASS on the webkit Playwright project (paired-
  engine π, never single-engine green).
- **Self-test bites:** a pinned `--motion-weight:0` kills anticipation+pop+blob (must
  RED the punch assertions); a `light-dark()`-wrapped recess inset (the trap — computes
  to `none`) must RED the recess-well assertion; an `underline` indicator inflating must
  RED the material fence; a flood firing BEFORE the SPATIAL leg must RED the ordering.

---

## 8. Fences (no-legacy, no re-fork, KISS)

- **Clean break, no alias.** `.segmented-indicator` DROPS its inline composite and
  composes `.glass-tab-capsule`; the flat-track box-shadow is SUPERSEDED by the recessed
  one (no legacy flat-track alias). The dock-tab selected fill RE-POINTS onto the shared
  capsule (no dual `--dock-control-active-bg` + capsule path).
- **No second engine.** ONE position engine (`useTabIndicator`), ONE squish primitive
  (`useLiquidFlex`, now two channels), ONE clock (`clockMs`/`INDICATOR_RELEASE_AT_ARRIVAL`).
  No `new SpringProgress`/extra rAF/`@keyframes`-with-own-clock beside the schedule.
- **The anti-patterns this must NOT become:** a taffy-pull (blob cap > 1.2 — fenced at
  ≤1.2); a too-springy snap (the calm springs stay ≤10%; the punch is a deliberate
  opt-in REGISTER, governed by `--motion-weight`, PRM-zeroed); a gray well or gray
  capsule (the no-gray warm floor, measured chroma ≥ 0.02 both modes); a `light-dark()`
  inset recess (the trap → silently `none`); a flood that fires WITH the SPATIAL leg
  (must trail it); a hover that is a flat `opacity` dim (must be the warm glass bloom).
- **Presets-in-consumers.** The library owns the 5-beat envelope, the capsule recipe,
  the punch dial, the recess depth (its iOS identity). The overshoot magnitude, the
  `--glass-accent` flood hue, and the selected glyph color are consumer/demo tunables;
  defaults are byte-identical at rest (accent transparent → zero flood).
