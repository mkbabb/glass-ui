# TABS — the GOLDEN reference (the glassy gold-standard register)

> The canonical synthesis of lens-a (glassy gold-standard + extraction), lens-b
> (cross-engine / luminance-ladder rigour), lens-c (cartoon-technicolor punch).
> The user's edict: **tabs is the glassy gold standard** — "our buttons should all be
> more GLASSY by default, like our tabs facility, and have better HOVER states." So
> GOLDEN has two deliverables welded into one: (1) the tab indicator + capsule made
> iOS-27-perfect (the 5-beat liquid punch on a recessed warm-glass channel), and
> (2) **a named, reusable glassy register** (`.glass-capsule` ·
> `.glass-capsule-track` · `.glass-capsule-hover`) that the buttons + dock-buttons
> greenfields consume verbatim. A UNION with the shipped engine — never a re-fork.
>
> Every cited lever was source-verified on disk (findings §0). The boldest mechanism
> (the 5-beat blob × squish composition + the cartoon-punch anticipation + the
> recessed channel) is **live-verified** by a throwaway spike (`golden/spike.html`,
> §9) — GREEN both modes over a colorful field.

---

## 0. Source-verified status quo (the bar to BEAT, not anchor on)

Grep + read of `src/`, cross-checked against all three lenses' live-interrogation.

| Claim | Disk truth | Verdict |
|---|---|---|
| Indicator GLIDES between tabs | `segmented-tabs.css:137` `transition: scale … --spring-snappy`; anchor path glides `inset` (`:181`); JS path glides `transform`/`width` (`:144`) | **REAL** |
| Velocity-coupled SQUISH | `useTabIndicator.ts:172` one `useLiquidFlex` (squish-only, `"linear"` law), `--stretch = 1 + frac·(cap−1)`, released at arrival (`:249` `clockMs × INDICATOR_RELEASE_AT_ARRIVAL`); CSS pairs it reciprocally `scale: var(--stretch) calc(1/var(--stretch))` (`:121`) | **REAL** — volume-preserving, center-pinned |
| Active = warm-glass capsule, six-layer, never gray | `:100` `background: var(--glass-bg-floating-tinted)` (the W55 seam at `surfaces.css:283` `:where(.btn-glass,.segmented-indicator)`) + `:113` rim-top/rim-bottom/shadow-floating + `blur(13px)` | **REAL + WARM both modes** |
| Track is warm-glass quiet | `:60` `--glass-bg-quiet` + `:69` `box-shadow: --glass-rim-top, --glass-rim-bottom` | **WARM but FLAT** |
| iOS-27 recessed well (track SINKS) | `:69` box-shadow is **rim-only** — no `inset … recess` leg | **MISSING** |
| 5-beat liquid morph (grow→overshoot→travel→settle→shrink) | only the 1-axis travel-squish; `--tab-blob` **absent on disk** (grep: 0 hits) | **PARTIAL** (no area over-inflation) |
| Glassy HOVER worth emulating | `.segmented-tab` `:230` hover is `transition: color` **only** — no glass lift, no specular, no scale | **ABSENT** — the user's literal "better hover" gap |
| `--motion-weight`, `--ease-cartoon-punch` | grep `src/styles/` → **0 hits**. design.md §L2/§L4 prose only — **phantoms** | **NOT MINTED** |

**Verdict: the foundation is FIT (engine, adaptive seam, `useLiquidFlex`, warm
material). Three real gaps + two phantoms. GOLDEN refines the lift/track, re-invents
the morph into the 5-beat, mints the absent hover register, and extracts the whole
thing as the reusable `.glass-capsule`.** No re-fork.

---

## 1. The golden design — ONE coherent resolution of the three lenses

**One sentence:** the selected tab is a **raised, lit, warm-glass capsule seated in a
recessed warm-glass channel**, and on selection it **anticipates** (recoils a beat),
**launches** with a volume-preserving travel-squish, **over-inflates past its target as
a metaball blob**, glides swollen, then **settles and shrinks to fit** while the
destination glyph scale-pops and a one-shot accent-flood washes the plate and clears —
all on ONE clock, all compositor-only (Chrome == Safari), and the whole capsule +
hover + commit recipe is **factored into `.glass-capsule`** the buttons greenfield
adopts wholesale.

### The reconcile of the three lenses (what each contributes, where they tensioned)

- **lens-a → the EXTRACTION is the spine.** Its boldest move — factor the lifted-plate
  composite + recess + hover into ONE `@layer components` recipe `.glass-capsule`
  (renamed from `.glass-tab-capsule` to drop the noun-overload so buttons own it
  without a "tab" in the class) — is GOLDEN's structural backbone. Tabs becomes the
  *reference implementation*; buttons/dock-buttons *compose* it. This directly
  discharges "make buttons glassy like the tabs" as a ONE-recipe substitution.
- **lens-b → the LUMINANCE-LADDER is the binding bar.** Its insight that lift and sink
  only read as the gold standard *in composition* — proven by the painted-pixel
  `capsule meanL > track meanL > track-recess-edge meanL` gate (+ `meanChroma ≥ 0.02`,
  the no-gray-in-the-PAINT catch) — is GOLDEN's acceptance spine. It forces the no-gray
  warm-track fix, the recess, AND the strengthened lift to land *together*. lens-b's
  caution against over-springing the morph is honored: the cartoon-punch is an opt-in
  REGISTER, the calm springs stay ≤10%.
- **lens-c → the PUNCH is the motion soul.** Its `--ease-cartoon-punch` (real
  anticipation pre-dip below 0 — a thing no damped spring expresses) + `--motion-weight`
  (the one cartoon dial, 1/φ, PRM→0) + glyph scale-pop (overlapping action) + commit
  accent-flood + moving cartoon-shadow are GOLDEN's "FLOW & PUNCH" layer. This is what
  makes the tab worth emulating — it has WEIGHT and is ONE token from calm.

**The tension resolved (audacity vs correctness):** lens-c's full punch (22% overshoot,
moving cartoon-shadow) is bold but risks taffy + cost. GOLDEN keeps the punch but
**fences it**: the area blob caps ≤1.12 (anti-taffy), the moving cartoon-shadow is an
**opt-in loud variant** (`surface="cartoon"`), and the *default* tab rides the punch
curve at `--motion-weight: 0.62` — lively but golden-restrained. The cross-engine floor
(lens-b) is non-negotiable: every channel is compositor `transform`/`scale` + static
shadows + registered scalars. No `backdrop-filter:url`, no SVG goo, no WebGL — by
construction Chrome == Safari (lens-b/lens-c agree, GOLDEN binds it as the §7 floor).

### Three cleanly separable layers

```
┌─ MATERIAL ─ .glass-capsule + .glass-capsule-track + .glass-capsule-hover
│             (warm-glass lift + recessed channel + the NEW glass hover)   ← buttons + dock-buttons inherit THIS
├─ MOTION ──── useTabIndicator + useLiquidFlex ×2 (glide + travel-squish + NEW area-blob)
│             on --ease-cartoon-punch, scaled by --motion-weight (the 5-beat)  ← tabs
└─ COMMIT ──── one-shot accent-flood (--tab-flood-t plus-lighter) + glyph scale-pop  ← tabs + dock-tabs (opt-in)
```

---

## 2. The MATERIAL layer — `.glass-capsule` (the extracted glassy register)

`src/styles/glass/glass-capsule.css`, `@layer components`, `@import`-ed in `index.css`
**after** the glass ladder (after `glass.css:164`), **before** the consuming
tabs/dock/button recipes. ONE recipe, ≥3 consumers (segmented-indicator, dock-tab
selected, Button glass) — clears the overfitting bar by construction.

### 2a. `.glass-capsule-track` — the recessed warm channel (the missing half)

```css
.glass-capsule-track {
  background: var(--glass-bg-quiet);          /* extant — warm, no-gray */
  backdrop-filter: var(--glass-blur-quiet);
  -webkit-backdrop-filter: var(--glass-blur-quiet);
  box-shadow:
    var(--glass-rim-top),                      /* extant — bright top catch-light */
    var(--glass-rim-bottom),                   /* extant — warm under-shadow */
    inset 0 1px 2px var(--tab-track-recess-ink); /* NEW — the sunken well */
}
```

`--tab-track-recess-ink` is a **PLAIN per-mode pair** — light arm in `tokens/glass.css`,
dark arm in `tokens/dark-arm.css`. **NEVER a `light-dark()` fragment.** Binding MEMORY
lesson: *an inset-shadow fragment inside `light-dark()` computes the WHOLE box-shadow to
`none`* — the recess would silently vanish. Bounded warm ink so it darkens the inner-top
edge without re-coloring the warm fill (no gray well):

```css
/* tokens/glass.css (light) */   --tab-track-recess-ink: color-mix(in srgb, var(--foreground) 7%, transparent);
/* tokens/dark-arm.css (dark) */ --tab-track-recess-ink: color-mix(in srgb, var(--foreground) 11%, transparent);
```

The recess is **STATIC** (a sunken channel does not pulse — never a `@keyframes`
target; `proof:no-layout-animation` holds). The painted-gray defect lens-b found over
the vibrant aurora field is caught by the §8 gate's `meanChroma ≥ 0.02` arm: if the
quiet track desaturates to gray under `saturate()` over the field, the warm admit-floor
(track composes `--glass-bg-quiet` toward `--glass-tint-source` at a small floor) lifts
it back to warm-cream. `--glass-tint-source` resolves warm both modes (verified
`glass-fx.css:122` `var(--card)`; dark warmed at `dark-arm.css:70`).

### 2b. `.glass-capsule` — the raised lit lozenge (extracted, not duplicated)

The existing `.segmented-indicator` composite (`:100`–`:116`) is factored **verbatim**:

```css
.glass-capsule {
  background: var(--glass-bg-floating-tinted);  /* the W55 element-level adaptive seam */
  backdrop-filter: var(--glass-blur-floating);
  -webkit-backdrop-filter: var(--glass-blur-floating);
  box-shadow:
    var(--glass-rim-top), var(--glass-rim-bottom), var(--glass-shadow-floating);
  border-radius: var(--radius-pill);
}
```

WIDEN the `surfaces.css:283` seam `:where(.btn-glass, .segmented-indicator)` →
`:where(.btn-glass, .segmented-indicator, .glass-capsule)` so the adaptive
`--glass-bg-floating-tinted` (darken-over-bright / warm-cream-over-calm, W55, never
gray, both modes) reaches every consumer. `.segmented-indicator` **composes**
`.glass-capsule` and drops its inline fill/rim/lift (clean break, no alias — the
no-legacy law). The dock-tab selected arm re-points its fill onto the SAME class (one
selected-accent language across content + dock tabs).

### 2c. `.glass-capsule-hover` — the glass hover register (the user's explicit gap, NEW)

The current pill hover is color-only. The new register (the thing buttons emulate) is a
**two-channel glass hover** — specular catch-light lift + a hair of scale — on the FAST
bezier clock (hover is a bezier ease, not a spring), volume-preserving, compositor-only:

```css
.glass-capsule-hover {
  transition: scale var(--duration-fast) var(--ease-standard),
              --glass-specular var(--duration-fast) ease;
}
.glass-capsule-hover:hover  { --glass-specular: 0.14; scale: 1.015; } /* the W-GLASS-CAL sub-perceptual catch + 1.5% press-ready lift */
.glass-capsule-hover:active { scale: 0.97; }                          /* the --scale-press snap */
```

On the **pill tabs**, the *non-selected* tab gets `.glass-capsule-hover` so an
un-selected segment lifts a hint of glass on hover (the iOS "ready to receive" read,
currently absent). On the **selected** tab the indicator carries the lift; hover only
deepens the specular. This is the register buttons adopt wholesale: **glass at rest +
specular-lift on hover + press-snap on active**, all volume-preserving.

> Once these three classes exist, the buttons greenfield collapses to "compose
> `.glass-capsule` + `.glass-capsule-hover`, set your `--glass-accent`, done." DRY,
> KISS, no parallel button-glass fork.

---

## 3. The MOTION layer — the 5-beat liquid punch (additive, the squish channel untouched)

### 3a. The cartoon substrate — MINT FIRST (Band-0 prerequisite, the phantoms)

`--motion-weight` and `--ease-cartoon-punch` are design.md promises **not in the live
cascade** (verified 0 grep hits). GOLDEN **mints them** as the §L2/§L4 substrate — never
`var()`s a phantom. (The spike proves the curve is real: it dips < 0 = anticipation, and
peaks > 1.10 = past the spring fence.)

```css
/* tokens/scheme-motion.css §Easing — the cartoon punch curve. A raw linear() easing,
   NOT a SPRING_PRESETS row (keeps the ≤10% spring-overshoot invariant intact), NOT a
   typed MOTION_CURVES entry. Drives transform only → compositor-safe. */
--ease-cartoon-punch: linear(
  0, -0.018 6%, -0.04 12%, 0.02 22%, 0.38 36%, 0.74 48%,
  1.0 60%, 1.16 70%, 1.22 76%, 1.14 82%, 1.04 88%, 0.99 94%, 1 100%);
--ease-cartoon-punch-duration: var(--spring-bouncy-duration); /* the punch needs room */

/* tokens/scale-paper.css §Motion — the ONE cartoon-amount scalar. Co-scales squash
   depth, overshoot share, anticipation pull, glyph-pop, cartoon-shadow travel.
   Rest 1/φ. PRM → 0 zeroes all five in ONE assignment. */
--motion-weight: 0.62;
@media (prefers-reduced-motion: reduce) { :root { --motion-weight: 0; } }
```

The default tab rides this register at `--motion-weight: 0.62` (lively but
golden-restrained); a louder `surface="cartoon"` variant scales it up. The calm springs
(`--spring-snappy`/`--spring-bouncy`) are untouched — the punch is an opt-in REGISTER,
not a spring re-tune.

### 3b. `--tab-blob` — the area-inflation scalar (registered, so it interpolates)

```css
/* property-regs.css §18 — the --stretch/--glass-accent/--specular registered-scalar
   precedent (verified). Registration lets the CSS glide INTERPOLATE it; a bare custom snaps. */
@property --tab-blob    { syntax: "<number>"; inherits: false; initial-value: 1; }
@property --tab-flood-t { syntax: "<number>"; inherits: false; initial-value: 0; }
```

The CSS composes it into the **ONE** existing `scale` write (`segmented-tabs.css:121`)
alongside the reciprocal squish — byte-minimal change, ONE property:

```css
.segmented-indicator {
  /* area-inflation (uniform, both axes) × volume-preserving travel-squish (reciprocal) */
  scale: calc(var(--tab-blob, 1) * var(--stretch)) calc(var(--tab-blob, 1) / var(--stretch));
  transform-origin: center;              /* BA-VJS-3 center-pin — blob grows from center, label stays put */
}
@media (prefers-reduced-motion: no-preference) {
  .segmented-indicator { transition: scale var(--ease-cartoon-punch-duration) var(--ease-cartoon-punch); }
}
```

The vertical arm mirrors it: `scale: calc(--tab-blob/--stretch) calc(--tab-blob*--stretch)`.

### 3c. The second `useLiquidFlex` channel + the 5-beat envelope

Beside the extant squish channel in `useTabIndicator.ts` (the squish channel is
**byte-fenced** — additive only):

```ts
const blob = useLiquidFlex({
  from: 1, to: () => blobPeak,           // blobPeak read from --tab-indicator-blob-max (default 1.10, cap ≤1.12)
  axis: "width", squishLaw: "linear",
  maxStretch: () => blobCap,             // a SECOND area cap beside the axis cap — never a fork of DEFAULT_INDICATOR_MAX_STRETCH
});
```

`squishOnTravel(toIdx)` shapes `--tab-blob` + `--stretch` as a **hump** across the
existing `clockMs(el) × INDICATOR_RELEASE_AT_ARRIVAL` schedule the release already reads
(`:249`). ONE timer, both channels release in lockstep. **No second spring, no second
rAF, no `@keyframes`.** The five beats:

1. **Anticipation** — the `--ease-cartoon-punch` pre-dip (−4%, scaled by
   `--motion-weight`) IS the recoil-back; the curve carries it, no JS timer.
2. **Grow + overshoot** — on the squish-open frame (same write site as the existing
   `--stretch` open, `:243`), drive `--tab-blob` toward ~**1.10×** (cap ≤1.12 — the
   anti-taffy bar). The lozenge over-inflates *bigger than the destination footprint*.
3. **Travel swollen** — the `inset`/`transform` glide carries it while `--tab-blob > 1`
   and `--stretch` rides the axis.
4. **Settle** — the punch curve's ζ<1 give lands soft.
5. **Shrink-to-fit** — at the SAME `releaseAt` the squish release fires (`:250`),
   `--tab-blob` de-inflates to 1. The lozenge shrinks to the exact destination footprint.

PRM: the existing `prefersReducedMotion()` early-return (`:206`) already skips the
squish — the SAME branch gates the blob write → `--tab-blob` stays 1, indicator snaps to
fit, vestibular-safe.

### 3d. The destination glyph scale-pop (overlapping action / follow-through)

The landed label settles AFTER the capsule (the child trails the parent). Pure CSS, on
the `aria-selected` flip, with a small delay so it OVERLAPS the capsule arrival:

```css
.segmented-tab { transition: color var(--duration-fast) ease,
                             scale var(--spring-snappy-duration) var(--spring-snappy) 60ms; }
.segmented-tab[aria-selected="true"] { scale: calc(1 + 0.06 * var(--motion-weight)); }  /* 0 under PRM */
```

The existing `.segmented-tab { scale:1; translate:0 }` identity base (`:234`, kept so a
transform never mints a stacking context that severs `anchor()`) makes this a byte-safe
value change.

### 3e. Calibration

Bring `--tab-indicator-max-stretch` DOWN from the live **1.18** (verified
`constants.ts:18`) toward ~**1.10–1.12** once the area-blob carries the "grow" — the two
channels compose to lively-but-not-taffy. Area cap `--tab-indicator-blob-max` ~1.10.
Total peak deformation (area × squish) stays well under the rubber-band threshold (the
spike measured 1.16× total overshoot — strong but legible). A **consumer/demo tunable**
(presets-in-consumers); the library owns the 5-beat envelope + the two axes.

---

## 4. The COMMIT layer — one-shot accent-flood (T4, opt-in)

IOS27-REFERENCE T4: "a one-shot accent-flood on commit then clears (EFFECTS trails
SPATIAL)." A momentary full-capsule wash of `--glass-accent`, driven by `--tab-flood-t`
(0→1→0), `mix-blend-mode: plus-lighter` over the capsule, that **trails** the spatial
glide by ~1 frame then clears (the fission-ripple precedent):

```css
.segmented-indicator::after {
  content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  background: radial-gradient(120% 140% at 50% 50%,
    color-mix(in oklab, var(--glass-accent, transparent) 55%, transparent), transparent 70%);
  mix-blend-mode: plus-lighter;          /* additive bloom, sRGB-safe */
  opacity: var(--tab-flood-t, 0);
}
```

`squishOnTravel` kicks `--tab-flood-t` to 1 a beat AFTER the SPATIAL open (the
EFFECTS-trails-SPATIAL ordering — same one timer, a second phase) then eases to 0.
**PRM-static** (no flood under reduce). **Opt-in** (`:floodOnCommit`). The accent is a
**consumer accent** (presets-in-consumers; `--glass-accent` default `transparent` →
byte-identical rest, provable no-op). The same register dock-tabs adopt, so it ships in
`.glass-capsule` as the parameterized `::after`, dormant at `--tab-flood-t: 0`.

### 4a. (opt-in loud) the moving cartoon-shadow

For `surface="cartoon"` only: the capsule's cartoon-shadow offset slides OPPOSITE the
glide via a `::before` shadow-caster `transform` (never an animated `box-shadow` —
paint-bound; reads `.shadow-cartoon-md`), scaled by `--motion-weight`, PRM → static cast.
Not the tab default.

---

## 5. The UNION ledger (deft, KISS, DRY — no re-fork)

| Need | Reused primitive (verified) | New surface |
|---|---|---|
| Position glide | `useTabIndicator` anchor/JS path (untouched) | — |
| Travel squish | `useLiquidFlex` squish channel `:172` (byte-fenced) | — |
| Area envelope | SECOND `useLiquidFlex` (same primitive, `from:1`) | `--tab-blob` reg + driver |
| Registered scalar | `@property` precedent `property-regs.css §18` | `--tab-blob`, `--tab-flood-t` |
| Capsule material | inline composite `segmented-tabs.css:100-116` | factored `.glass-capsule` |
| Adaptive seam | `--glass-bg-floating-tinted` `surfaces.css:283` | `:where()` widened to `.glass-capsule` |
| Recess | `--glass-rim-*` (verified) | `--tab-track-recess-ink` plain per-mode pair |
| Accent flood | `--glass-accent` (BB.W-GLASS-ACCENT, `property-regs.css:178`) | `::after` flood layer |
| Springs | `--spring-snappy`/`-bouncy` (verified live) | `--ease-cartoon-punch` (MINT) |
| Cartoon dial | design.md §L4 (spec-only) | `--motion-weight` (MINT) |
| Hover register | `--glass-specular` (`property-regs.css §11b`), `--scale-press` | `.glass-capsule-hover` |

ONE position engine, ONE squish primitive (now 2 channels), ONE clock
(`clockMs`/`INDICATOR_RELEASE_AT_ARRIVAL`). No new component, no second spring/rAF/timer,
no `DockTabBar` SFC (the dock-tab register re-points its selected arm onto the shared
recipe). Reconciles **BD.W-TABS-LIQUID** (the 5-beat motion) + **BD.W-TAB-IOS-CAPSULE**
(the recessed material) into one coherent build.

---

## 6. Cross-engine (Chrome + Safari) — §L7

Every channel is **compositor-only + Safari-native by construction** — no
`backdrop-filter: url()`, no WebGL, no SVG goo (the tab blob is a CSS `scale` on the
indicator's OWN rounded box, NOT a metaball goo filter; the dock-fission goo is a
disjoint register this wave never touches):

- **Glide** — `inset`/`transform` interpolation: cross-engine.
- **Squish + blob** — `scale` on the indicator's own box: compositor, identical on WebKit.
- **Recess** — static inset `box-shadow`: Safari-native (the inset-shadow-trap fence is
  the only hazard, neutralized by the plain per-mode pair).
- **Capsule fill** — `backdrop-filter` on the surface's OWN layer (the capsule sits OVER
  the track, not nested inside its blur → the §L1 "glass cannot sample glass" trap avoided).
- **`@property --tab-blob`/`--tab-flood-t` interpolation** — Safari-26 Baseline; on a gap
  engine `initial-value: 1`/`0` is the safe rest (slides without inflation/flood — never
  broken).
- **Flood** — `plus-lighter` blend + opacity: Safari-safe, sRGB.

Acceptance is a **paired-engine π** (chromium + webkit Playwright projects), both
light/dark, never `reducedMotion` on the morph arm. The spike (§9) already proves the
exact `scale: calc(--tab-blob*--stretch) calc(--tab-blob/--stretch)` write is sound;
Safari uses the identical CSS.

---

## 7. A11y / PRM carve

- **PRM `reduce`** → `--motion-weight: 0` (one assignment) zeroes anticipation, blob,
  glyph-pop, cartoon-shadow; the `:206` early-return keeps `--stretch`/`--tab-blob` at 1;
  glide is instant. The recess + capsule lift (both static) remain — a sunken well + a
  lifted accent need no motion. Flood suppressed.
- **`prefers-reduced-transparency`** → the capsule falls to the opaque-tier escape (the
  extant `--glass-level` machinery); fill goes solid, recess + lift survive as legibility
  anchors.
- **`prefers-contrast: more`** → the recess ink + rim floor UP (the inked edge is a
  legibility asset).
- **Focus** → `.glass-capsule-hover` composes `--focus-ring-shadow` on `:focus-visible`;
  the reka roving-tabindex + `aria-selected` selection model is **untouched** (this is a
  surface/motion layer under the indicator).
- **Tap target** → the segment padding keeps the ≥44px effective hit (§L3).
- **Reduced-motion still FUNCTIONS** — selection works, glide is instant, the
  gold-standard read (sunken well + lifted warm capsule) is fully present.

---

## 8. The acceptance bar + the born-RED gate

The π MUST drive the REAL tab-switch gesture and judge **painted pixels** — no
arithmetic, no stop-string, no seed, no computed-not-measured (the prior-golden failure
modes are forbidden). `tests-visual/tabs-liquid.spec.ts`, **chromium + webkit**, both
modes, over a LIVE aurora field, NEVER `reducedMotion` (the morph arm):

1. **Drive a real `select(farTab)`** via the SFC model (click a `.segmented-tab` that
   flips `aria-selected` — verified this is what moves the indicator; a raw `.click()` on
   a non-model-bound node no-ops, which is how a faked gate would silently pass).
2. **Grow + overshoot** — frame-series the indicator's measured bbox AREA → it EXCEEDS
   the destination footprint by the overshoot ratio (~1.08–1.12× at peak), then
   DE-INFLATES to the destination footprint at arrival. A control pinned `--tab-blob: 1`
   never exceeds → **born-RED on HEAD** (no blob channel exists).
   *Spike-measured: peak 1.163×, end fitDelta 0.000 — GREEN (§9).*
3. **Anticipation** — the capsule center moves OPPOSITE the travel by ≥1px before
   launching; a `--motion-weight: 0` control shows zero pre-dip → **born-RED on HEAD**.
4. **Center-pin** — the indicator stays pinned to the destination label center across
   the whole envelope (cx convergence). *Spike-measured: 0px — GREEN.*
5. **Sink + lift (the gold standard)** — vertical luminance scan reads
   `capsule meanL > track meanL > track-recess-edge meanL` AND track `meanChroma ≥ 0.02`
   (warm, not gray) over the vibrant field, BOTH modes → **born-RED on HEAD** (no recess
   leg; the track reads gray over the aurora).
6. **The fold** — the SegmentedTabs pill and the dock-tab selected accent resolve the
   SAME computed `background-color` (the shared capsule off the shared seam).
7. **Glyph-pop** — the destination label's measured scale peaks AFTER the capsule settles
   (frame-ordering, not a value check).
8. **Commit-flood** — the plate's accent-channel luminance blooms then clears, TRAILING
   the SPATIAL leg (EFFECTS-after-SPATIAL frame-ordering).
9. **Material fence** — `variant="underline"` reads a crisp SLIDE, zero area inflation.
10. **PRM** — one static frame at fit, `--tab-blob: 1`, sink+lift present, no flood.

**Detector self-test bites (`proof:tabs-liquid` / `proof:tab-ios-capsule`):** a recess
inside `light-dark()` (→ computes to `none`) RED; a hand-rolled grow `@keyframes` instead
of the 2nd `useLiquidFlex` RED; a blob that opens-but-never-shrinks RED; a second timer
RED; the underline inflating RED; a blob cap >1.2 RED; a flood firing WITH (not after)
the SPATIAL leg RED; a `--motion-weight:0` killing anticipation+pop+blob RED; a gray
track (`meanChroma < 0.02`) RED.

---

## 9. The spike — live-verified de-risk of the boldest mechanism

`golden/spike.html` (throwaway, greenfield-dir — no `src/` touched). A self-contained
page that mirrors the EXACT shipping CSS write
(`scale: calc(--tab-blob*--stretch) calc(--tab-blob/--stretch)`, center-pinned, on
`--ease-cartoon-punch`) + the recessed channel (plain per-mode inset) + the lifted
capsule + the accent-flood + the glyph-pop. Built and run in Chrome via the gate
readback (`window.__gate()`):

| Assertion | Spike result | Verdict |
|---|---|---|
| GROW past target (peak/targetArea) | **1.163×** | GREEN (> 1.04) |
| SHRINK to fit (end fitDelta) | **0.000** | GREEN (< 0.06) |
| Center-pin (end cx delta) | **0px** | GREEN (< 2.5px) |
| area trace | 3344 (fit) → 3884 (swollen peak) → 3340 (= targetArea 3340) | the 5-beat hump, exact shrink-to-fit |
| Recessed well + lifted capsule, warm, NOT gray | `spike-light.png` / `spike-dark.png` over a purple/teal field | GREEN both modes |
| Cartoon-punch curve real (dips < 0, peaks > 1.10) | the `linear()` curve sampled | GREEN — anticipation + overshoot |

Artefacts: `golden/spike.html`, `golden/spike-light.png`, `golden/spike-dark.png`. The
boldest mechanism (5-beat blob × squish on the cartoon-punch curve, the recessed
channel, the warm-glass capsule both modes) is proven sound BEFORE any `src/` change.

---

## 10. The build order + the named extracted register

**Reconciles BD.W-TAB-IOS-CAPSULE + BD.W-TABS-LIQUID into one buildable wave:**

1. **MINT (Band-0 first):** `--ease-cartoon-punch` (+ `-duration`) + `--motion-weight`
   (1/φ, PRM→0); self-test the curve dips < 0 and peaks > 1.10.
2. **MATERIAL:** `glass/glass-capsule.css` (`.glass-capsule` + `.glass-capsule-track` +
   `.glass-capsule-hover`); widen `surfaces.css:283` `:where()`; add the
   `--tab-track-recess-ink` PLAIN per-mode pair; `.segmented-indicator` composes
   `.glass-capsule` (clean break, no alias); track composes `.glass-capsule-track`;
   non-selected tabs compose `.glass-capsule-hover`.
3. **MOTION:** register `--tab-blob`/`--tab-flood-t` in `property-regs.css §18`; add the
   2nd `useLiquidFlex` channel in `useTabIndicator.ts`; compose `--tab-blob` into the ONE
   `scale` write; re-time the indicator onto `--ease-cartoon-punch`; glyph scale-pop;
   calibrate `--tab-indicator-max-stretch` 1.18 → ~1.11.
4. **COMMIT:** the `::after` accent-flood (opt-in `:floodOnCommit`, PRM-static).
5. **GATE:** the paired-engine π (§8) + the detector self-test bites.
6. **ADOPT:** the buttons + dock-buttons greenfields compose `.glass-capsule` +
   `.glass-capsule-hover` (+ their `--glass-accent`); the dock-tab selected arm re-points
   onto the shared recipe.

> ## THE NAMED EXTRACTED GLASSY REGISTER (buttons + dock-buttons consume verbatim)
>
> **`.glass-capsule`** — the warm-transmissive lifted lozenge: `--glass-bg-floating-tinted`
> fill (the W55 element-level adaptive seam, warm both modes, never gray) + the six-layer
> composite (`--glass-rim-top` catch-light + `--glass-rim-bottom` under-shadow +
> `--glass-shadow-floating` lift + `--glass-blur-floating`) on `--radius-pill`.
>
> **`.glass-capsule-track`** — the recessed warm channel it rides in: `--glass-bg-quiet` +
> rim + `inset 0 1px 2px var(--tab-track-recess-ink)` (PLAIN per-mode pair, NEVER `light-dark()`).
>
> **`.glass-capsule-hover`** — the glass hover/press register: `--glass-specular: 0.14`
> catch-light + `scale: 1.015` hover / `scale: 0.97` press, fast bezier clock,
> volume-preserving, compositor-only.
>
> Three states — **REST** = `.glass-capsule` glass plate; **HOVER** = specular catch +
> lift (never a flat opacity dim); **ACTIVE/PRESS** = forward floating-tinted capsule +
> the cartoon punch + press-snap. ONE recipe in `src/styles/glass/glass-capsule.css`,
> ≥3 consumers. "Make buttons glassy like the tabs" = a ONE-recipe substitution.
