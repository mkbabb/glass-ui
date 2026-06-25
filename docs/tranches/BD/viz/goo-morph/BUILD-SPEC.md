# BUILD-SPEC — the liquid goo-morph WORM pager indicator

**Synthesis of** `research-google-worm.md` (R1 — the worm two-edge stretch-then-contract) ·
`research-goo-merge.md` (R2 — the SVG-goo metaball merge + the opaque-layer fix + Safari) ·
`research-primitives.md` (R3 — the shipped leaves to COMPOSE, no re-fork) ·
the binding law `feedback_liquid_weight_universal` + CLAUDE.md W-MOTION-CANON / W-PRESS-UNIFY /
W-LIQUID-REVEAL / the `morph-bridge.css` shipped goo precedent.

> **THE BINDING BAR (the user, "remember this always").** The pager/deck dots GOO-MORPH from
> one to the next like the EXTANT Google-deck dot morph — the active indicator **STRETCHES**
> across the gap (an elongated worm/capsule), the dots it touches **MERGE** into it (a metaball
> neck wells up + releases), then it **CONTRACTS + SETTLES** with a spring overshoot onto the
> target. This is **FAR more liquid + squishy than a subtle traveling pill** — the user already
> REJECTED a subtle shift; that is the hard floor. Compositor-only, PRM-carved, Safari-compatible,
> idiomatic, NO legacy.

This spec is the EXACT buildable mechanism: the worm geometry, the two-edge spring offset, the
squish, the goo filter + opaque-layer technique, the spring preset, the `--pager-*` tokens, the
a11y/PRM/Safari rules, and the precise list of shipped primitives to compose. The builder
implements `W-PAGER-GOO-MORPH` from this — it writes `src/` code; this writes none.

---

## 0. The verdict — ONE worm, TWO layers, deterministic on ONE scalar

The morph is **one traveling worm element** (an opaque capsule) gliding between dot centers on a
spring, **inside an opaque "goo layer"** wrapped in the classic SVG gooey filter, so the worm
**melts into and out of** the resting dots as it passes. The two reads the user wants compose into
this single mechanism:

1. **The STRETCH-THEN-CONTRACT (R1, the Google/Material worm).** The worm elongates from the source
   dot toward the target (leading edge moves first), reaches max length spanning both at the
   midpoint, then the trailing edge catches up + the worm contracts onto the target. We express
   this the COMPOSITOR way — `transform: translateX(head) scaleX(len/W)` over a reserved footprint
   (NEVER an animated `width`), with the two edges driven by ONE spring scalar's position +
   velocity (the timing offset emerges from the spring lag, not a second timer).

2. **The GOO MERGE (R2, the metaball neck).** The worm + the resting dots live in ONE opaque
   `.pager-goo-layer` carrying `filter: url(#pager-goo)` (the `morph-bridge.css` shipped
   blur-then-alpha-threshold goo). As the worm's blurred fringe overlaps each dot it bridges, a
   solid neck wells up → they read as ONE liquid blob; as the worm pulls away the neck thins +
   pinches off. **The merge intensity tracks the worm stretch for free** — no second clock, the
   filter is static, only the opaque shapes move.

3. **The SQUISH (R3, volume-preserving).** The worm pairs a reciprocal cross-axis pinch
   (`scale: stretch, 1/stretch`) capped LOW — the `useLiquidFlex` value, the SegmentedTabs
   indicator law. The long axis grows, the short axis pinches: the gel read.

The whole morph is `f(--worm-t)` (the ONE spring scalar). The goo filter never animates (the
Safari trap); the squish + travel are all `transform`. Two layers: the **gooed silhouette** (opaque,
`pointer-events:none`, `aria-hidden`, decorative) and the **interaction layer** (the existing
transparent 24px `<button>` hit-targets, byte-UNTOUCHED — all a11y + pointer live there).

---

## 1. Geometry vocabulary (shared by every phase)

Dots on a horizontal track (vertical = the transposed `dim` idiom, swap x↔y — the `useTabIndicator`
`vertical.value` precedent; KEEP both axes).

```
W        = --pager-dot-size          (6px resting pip diameter; the worm rests at this width)
H        = W                          (circle at rest; the capsule cross-axis)
S        = the grid gap (1.5 → gap-1.5 ≈ 6px between dot CELLS)
pitch    = dotCenter(i+1) − dotCenter(i)   ← MEASURED from the live DOM (the dotEls map / a
                                              center read), NOT a hardcoded W+S — windowFit +
                                              the 24px hit-box mean the visual pitch is the
                                              cell pitch, read it off the rail like useTabIndicator
radius   = H / 2                      (fully-rounded capsule ends — the pill that reads LIQUID)
```

**Progress scalar.** The worm is driven by ONE `--worm-t ∈ [page, page+1]` (a continuous
page-space float the spring writes). `head`/`tail` (the two capsule edges) are pure functions of
`--worm-t`. The travel is between MEASURED dot centers (center-anchored, the BA-VJS-3 fix — center
== dot center so the squish stays pinned), so the worm lands dead-on the active pip at every window
state + both axes.

---

## 2. THE WORM MECHANISM — the two-edge geometry, expressed as a compositor transform

R1's closed form drives two edges (`head` = trailing, `tail` = leading) off a doubled progress.
We keep the SHAPE but express it compositor-only (R3 / motion-canon P5 — `proof:no-layout-animation`
forbids per-frame `width`).

### 2a. The two-phase edge formula (the source of the stretch-then-contract)

Let `A = dotCenter(page)`, `B = dotCenter(page+1)`, `t = worm-t − page ∈ [0,1]`,
`wormOffset = t·2 ∈ [0,2]`:

```
PHASE 1 — STRETCH (wormOffset ≤ 1):    leading moves, trailing pinned
  head = A − W/2                                   (trailing edge pinned at A's left)
  tail = A + W/2 + wormOffset·(B − A)              (leading edge travels toward B)
PHASE 2 — CONTRACT (wormOffset > 1):   leading locked at B, trailing catches up
  tail = B + W/2                                   (leading edge locked at B's right)
  head = A − W/2 + (wormOffset − 1)·(B − A)        (trailing edge accelerates A→B)

len    = tail − head                               (worm length THIS frame)
center = (head + tail) / 2                          (worm center THIS frame)
```

- `t=0`: len = W (a resting dot at A).
- `t=0.5`: len = W + (B−A) — **MAX length, spans both dots — the elongated worm at full stretch.**
- `t=1`: len = W again, sitting on B. Landed.

### 2b. The compositor expression (BUILD THIS — never an animated width)

The worm `<div>` reserves a resting `inline-size: var(--pager-dot-size)` footprint ONCE (the
one-time layout reserve, motion-canon P5 / W-CARD-COMPOSITE). The per-frame paint is ALL transform:

```
lenRatio = len / W                                  (≥ 1 during travel, = 1 at rest)
tx       = center − (rail origin)                    (translate the worm center onto the path)

/* the worm element, transform-origin: center: */
transform: translateX(tx) scaleX(lenRatio) scaleY(1 / sqrt(lenRatio))
```

- `scaleX(lenRatio)` is the elongation (a `scale`, never a `width` — the W-CARD-COMPOSITE
  "the text/box lays out ONCE, the grow is `scale`" discipline).
- `scaleY(1/sqrt(lenRatio))` is the **volume-preserving cross-axis pinch** — but DO NOT hand-roll
  this: it is `useLiquidFlex`'s reciprocal `--stretch` (§3 squish), capped LOW. The `sqrt` keeps the
  pinch gentle; the CAP (`--pager-worm-max-stretch ≤ 1.08`) is the real ceiling.
- The pill ends distort slightly under `scaleX` at extreme stretch — at dot scale (W≈6px) this reads
  fine, AND the goo filter (§4) re-rounds the silhouette so the scaled-capsule end-distortion is
  hidden inside the metaball. This is exactly why the goo layer is the maximal mode: the filter
  fixes the scale-distortion the bare transform worm would show.

### 2c. WHY this is the stretch-then-contract (not a pill slide)

A subtle traveling pill is ONE rigid box that `translateX`es from A to B — constant length, no
deformation, the rejected read. THIS worm has a LENGTH that grows to span both dots at the midpoint
(`lenRatio` peaks at `1 + (B−A)/W` ≈ 5× for a 6px dot over a ~24px pitch) then contracts back to 1.
The body visibly bridges both dot centers at the crossing. That elongation-then-collapse, paired
with the goo neck + the squish + the spring overshoot, is the FAR-more-liquid bar.

---

## 3. THE SPRING + THE SQUISH — compose the shipped leaves (R3)

### 3a. The travel spring — `--spring-bouncy` (the BOUNCE + WEIGHT preset)

The user's law points at **enter-bouncy/overshoot**. The verified `SPRING_PRESETS` row
(`src/composables/motion/springPresets.ts`):

| Preset | (response, ζ) | overshoot | clock token | verdict |
|---|---|---|---|---|
| `snappy` | 0.42 / 0.78 | ~+2.0% | `--spring-snappy-duration: 0.34s` | the CONTROL register — too subtle for the ask |
| `dock` | 0.32 / 0.70 | ~+4.6% | `--spring-dock-duration: 0.28s` | what PagerDots uses NOW. Tame. The rejected read. |
| **`bouncy`** | **0.5 / 0.55** | **~+12.6%** (Apple 12-18% band) | **`--spring-bouncy-duration: 0.57s`** | **THE WORM TRAVEL** — the explicit overshoot IS the bounce; the longer 0.57s clock IS the weight/inertia |

**The worm travels on `--spring-bouncy` @ `--spring-bouncy-duration`.** The `linear()` curve in
`scheme-motion.css:238` peaks at ~1.12435 (the +12.6% overshoot) at ~14% of the clock and settles
by ~55% — the worm springs past the target dot, then settles back onto it. This is the single
biggest lever for the liquid read and the preset the user's law names. **NO new spring family**
(the W-GLASS-CAL spring fence) — `bouncy` is a shipped `SPRING_PRESETS` row.

**TWO build options for the spring drive (both no-fork):**

- **(A) PREFERRED — the CSS `linear()`-transition path (R3 §1a).** Set the worm's target
  `transform` on select; let `transition: transform var(--pager-worm-duration) var(--pager-worm-spring)`
  do the spring glide (the `--spring-bouncy` `linear()` IS the spring physics baked into a timing
  function). NO rAF, NO keyframes peer, Safari-Baseline (`linear()` is Safari 17.2+). The two-edge
  stretch-then-contract emerges because the worm is ONE element whose `scaleX`/`translateX` both
  spring on the SAME `linear()` clock — at the midpoint the spring has translated the center ~halfway
  while the scaleX is near its overshoot peak, producing the bridge. This keeps the worm on
  `/pager` (root-barrel-safe, no heavy peer) — the cheapest path, sufficient for a dot rail.
- **(B) higher-fidelity — the live `SpringProgress` path.** Drive `--worm-t` per frame off a
  `SpringProgress` (the `useLiquidMorph` loop shape) + feed `useLiquidFlex.drive(t)` so the squish
  reads the spring's REAL per-frame velocity (the `"tanh"` law, `sa = 1 + tanh(speed·1.6)·uStretch`
  — the goo-blob-faithful swell). This adds a rAF loop + the keyframes peer (→ `/motion`, off the
  root barrel — the SCC-trap discipline). RESERVE this for W-REFLECT IFF (A) proves insufficiently
  liquid; (A) is the floor.

> Register `--worm-t` as a Houdini `@property <number>` in `property-regs.css §18` ONLY on path (B)
> (the `--dock-morph-t`/`--border-progress-fill` precedent — a bare unregistered `var()` snaps; the
> typed reg lets the engine interpolate). Path (A) needs NO `@property` (the `transition` interpolates
> `transform` directly).

### 3b. The squish — `useLiquidFlex` (the ONE squish engine, R3 §1b)

The worm composes `useLiquidFlex` for the reciprocal cross-axis pinch — the SAME way the tab
indicator does (`src/composables/motion/useLiquidFlex.ts`). DO NOT re-roll the `tanh`/reciprocal:

```ts
// squish-only consumer — the TRAVEL is the CSS transform (path A); useLiquidFlex owns the deform:
const liquidSquish = useLiquidFlex({
    from: 0, to: 0, axis: "width",        // squish-only; no size span (the worm travels via transform)
    squishLaw: "linear",                   // geometry-relative travel FRACTION (the tab register law)
    maxStretch: () => readCap(),           // live --pager-worm-max-stretch (default 1.08) — consumer-retunable
});
// on select, feed the travel fraction (|B−A| / rail-extent), peak DURING travel, release AT arrival:
liquidSquish.squish(frac);
el.style.setProperty("--stretch", String(liquidSquish.stretch.value));
```

The worm CSS pairs `--stretch` reciprocally, axis-derived (the SegmentedTabs CSS, `segmented-tabs.css:121,129`):

```css
.pager-worm { scale: var(--stretch) calc(1 / var(--stretch)); }                              /* horizontal: stretch X, pinch Y */
.pager-dots[data-orientation="vertical"] .pager-worm { scale: calc(1 / var(--stretch)) var(--stretch); }  /* vertical */
```

**Release-at-arrival.** The `--stretch` PEAKS during travel and releases AT arrival — the
`INDICATOR_RELEASE_AT_ARRIVAL` constant × the bouncy clock (`useTabIndicator.ts:249` pattern, read
the clock from `--spring-bouncy-duration`, NOT `--tab-indicator-duration`). Grow-then-shrink, keyed
to the travel clock — ONE scalar drives both the travel and the squish release.

---

## 4. THE GOO MERGE — the opaque layer + the SVG filter (R2)

This is what makes the worm MERGE the dots instead of sliding over them. It reuses the shipped
`morph-bridge.css` goo trick (the blur-then-alpha-threshold), applied to N dots + a worm.

### 4a. The filter (author ONCE in a hidden SVG, bind via `filter: var(--pager-goo-filter)`)

```html
<!-- mounted ONCE per page/rail, aria-hidden, position:absolute, w=h=0 -->
<svg class="pager-goo-defs" width="0" height="0" aria-hidden="true" focusable="false"
     style="position:absolute">
  <defs>
    <filter id="pager-goo" x="-50%" y="-50%" width="200%" height="200%"
            color-interpolation-filters="sRGB">
      <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"/>
      <feColorMatrix in="blur" mode="matrix"
        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"/>
      <feBlend in="SourceGraphic" in2="goo"/>   <!-- crisp dot cores over the gooed necks -->
    </filter>
  </defs>
</svg>
```

**The three knobs (the whole goo dial):**

| Knob | Ship value | Effect / tuning |
|---|---|---|
| `feGaussianBlur stdDeviation` | **4** (range 3-6) | the merge REACH. Tune so two RESTING pips do NOT merge (discrete at rest) but the WORM bridging them DOES. Rule of thumb: `stdDeviation ≈ 0.7-1.0× the pip radius`; the worm's body is fatter than a pip + it physically spans the gap, so it always clears the threshold across the gap while two idle pips don't. **STATIC — never animated** (the Safari trap, §6). |
| `feColorMatrix` alpha N (slope) | **18** | edge sharpness after threshold. Canonical Goo. Raise toward 25 for a wetter/softer neck. |
| `feColorMatrix` alpha M (shift) | **−7** | cutoff = M/N ≈ 0.39. Keep M/N ≈ 0.39-0.5 so the neck forms mid-overlap, not only at full overlap. |

`color-interpolation-filters="sRGB"` is **MANDATORY** — the default `linearRGB` shifts the threshold
math + darkens the blob across engines; sRGB is the predictable cross-engine path. The filter
region `x/y/width/height = -50% -50% 200% 200%` widens the blur region so it does not clip at the
bounding box.

### 4b. THE OPAQUE-LAYER TECHNIQUE (the load-bearing fix — translucent dots break the threshold)

**The collision.** The gooey filter thresholds ALPHA. The pager dots are translucent
(`--pager-dot-inactive = 52% --foreground`); a 52%-alpha pip, after blur, peaks WELL BELOW the
canonical M/N ≈ 0.39 threshold → `feColorMatrix` ERASES it (or the merge flickers at the knife-edge).
The goo filter wants NEAR-OPAQUE shapes; the rail's translucency is its whole identity. They collide
head-on.

**The clean fix — render OPAQUE, tint at the LAYER (R2 §2, technique A).** Split SILHOUETTE (opaque,
gooed) from APPEARANCE (translucency + tint, at the layer):

```css
/* The opaque goo silhouette layer — the merge medium. EVERY shape inside is full-alpha. */
.pager-goo-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;                                  /* hit-targets are the buttons ABOVE */
  filter: var(--pager-goo-filter, url(#pager-goo));      /* the metaball merge — morph-bridge.css trick */
  opacity: var(--pager-goo-layer-opacity, 0.52);         /* the 52% rail translucency, ONCE at the layer */
  color: var(--pager-dot-active);                        /* the solid ink the shapes use */
  will-change: transform;                                /* force a compositor layer — Safari re-raster, §6 */
  contain: layout paint;                                 /* tight-boxed filter region — the morph-bridge perf rule */
  isolation: isolate;                                    /* scope the filter, not the page */
}
.pager-goo-layer .goo-dot,                               /* the opaque pip silhouettes */
.pager-goo-layer .goo-worm {                             /* the opaque worm silhouette */
  background: currentColor;                              /* FULL alpha — the filter needs opacity:1 */
}
```

The merged opaque silhouette inherits the rail's 52% translucency UNIFORMLY via the layer `opacity`.
The per-dot active/hover/inactive brightness is carried by the WORM (at full layer presence) sitting
on the dim 52% dot bed — the active region reads brighter BECAUSE the opaque worm sits on it, exactly
the intended hierarchy. ONE `opacity` on the layer, ZERO per-dot alpha to fight the threshold. The
`--pager-dot-*` token surface is PRESERVED — the tokens now drive the LAYER opacity + the worm color,
not a per-dot alpha. (Techniques B `mask` + C `mix-blend-mode` from R2 §2 buy per-region tint but
carry Safari edge-cases — technique A is the Safari-portable DEFAULT; B/C are documented escapes, not
shipped.)

### 4c. The merge tracks the stretch for FREE

As the worm stretches across the gap (§2), its blurred fringe overlaps each endpoint dot → the necks
DEEPEN at peak stretch (the most-liquid frame, the midpoint) → and RELEASE as it contracts onto B
(the alpha drops below threshold as the blurred shapes separate → the source dot "pinches off" back
to a free pip, the target dot is fused into the landed worm). **Stretch → neck-up → travel-fused →
pinch-off → land.** That is the Google-deck liquid morph, the worm geometry (§2) × the goo medium
(§4), with NO second clock — the filter is static, the merge is a pure consequence of the moving
opaque shapes.

---

## 5. The layer composition (what the builder wires)

```
┌─ <PagerDots> rail (the .glass-pager-ring glass pill chassis, UNCHANGED) ──────────────┐
│  ┌─ .pager-goo-layer  (absolute; inset:0; pointer-events:none; aria-hidden;            │
│  │     will-change:transform; contain:layout paint; isolation:isolate;                 │
│  │     filter:url(#pager-goo); opacity:.52; color:var(--pager-dot-active))             │
│  │   • N opaque .goo-dot pips      (background:currentColor, full alpha, grid-placed)  │
│  │   • 1 opaque .goo-worm capsule  (§2 — transform-driven, --spring-bouncy clock,      │
│  │       stretches src→target then contracts; squish via useLiquidFlex --stretch)      │
│  │   → the SVG goo filter merges worm+dots into ONE metaball silhouette;               │
│  │     necks form mid-travel, pinch off on land; layer opacity = the 52% translucency  │
│  └─────────────────────────────────────────────────────────────────────────────────── │
│  ┌─ N transparent <button.pager-dot> hit-targets (ABOVE the goo layer) ───────────────  │
│  │   • 24px box, no paint, focus-ring, aria/role, keyboard, windowFit, click — KEPT    │
│  │   → ALL a11y + interaction lives here, BYTE-UNTOUCHED from current PagerDots         │
│  └─────────────────────────────────────────────────────────────────────────────────── │
└────────────────────────────────────────────────────────────────────────────────────────┘
+ ONE hidden <svg><defs><filter id="pager-goo"> mounted per page/rail.
+ @supports(filter:url(#x)) → the goo layer; ELSE the transform worm alone (no filter) — the floor.
+ @media(prefers-reduced-motion:reduce) → goo layer display:none; worm snaps; fade-only.
```

**What R1/R2/R3 each own:** R1 owns the worm GEOMETRY (the two edges, the stretch-then-contract);
R2 owns the MERGE MEDIUM (the opaque goo layer, the filter values, the translucency-at-layer fix);
R3 owns WHICH primitive drives it (`useLiquidFlex` squish + the `--spring-bouncy` travel + the
`pagerWindow` oracle + the `useTabIndicator` travel SHAPE). The builder composes; re-forks none.

---

## 6. The `--pager-*` token surface (KEEP every existing; ADD the worm tokens)

KEEP every `--pager-dot-*` token (the consumer retint seam — `slides` sets
`--pager-dot-active: var(--ncsu-red)`, presets-in-consumers). ADD beside them, all `var(--t, fallback)`
reads so a consumer `:root`/scope override cascades in with zero `:deep()` (the `--metric-row-*` /
`--dock-scale` consumer-token precedent):

| Token | Default | Role |
|---|---|---|
| `--pager-dot-size` | `0.375rem` (6px) | KEEP — base pip diameter (the worm rests at this width) |
| `--pager-dot-elongated` | `1.5rem` (24px) | KEEP — the worm's max elongation reference along the rail axis |
| `--pager-dot-active` | `var(--foreground)` | KEEP — the solid ink the goo layer paints (was the active fill) |
| `--pager-dot-inactive` | `52% --foreground` | KEEP (now the SEMANTIC of the LAYER opacity, see below) |
| `--pager-dot-hover` | `72% --foreground` | KEEP |
| **`--pager-worm-spring`** | `var(--spring-bouncy)` | NEW — the worm travel spring `linear()` (consumer re-points to `--spring-snappy` for a calm deck) |
| **`--pager-worm-duration`** | `var(--spring-bouncy-duration)` (0.57s) | NEW — the worm travel clock, paired with the spring (motion-canon P4 per-spring clock) |
| **`--pager-worm-max-stretch`** | `1.08` | NEW — the LOW squish cap fed to `useLiquidFlex.maxStretch` (the tab `DEFAULT_INDICATOR_MAX_STRETCH`; live-read so a consumer retunes the swell) |
| **`--pager-goo-layer-opacity`** | `0.52` | NEW — the rail translucency, now at the LAYER (replaces the per-dot 52% alpha that fought the threshold; consumer re-alphas here) |
| **`--pager-goo-filter`** | `url(#pager-goo)` | NEW — lets a consumer swap a wetter/crisper filter without a fork |

The reciprocal `--stretch` custom is INTERNAL (the indicator precedent — JS-written, not a public
knob). On path (B) ONLY, register `--worm-t` as a `@property <number>` (§3a).

---

## 7. a11y / windowFit / orientation — PRESERVE (byte-kept)

The worm changes ONLY the active-indicator paint+travel. Everything else is BYTE-KEPT (R3 §4):

- **The 24px hit-box** (WCAG 2.5.8) — the transparent `button` stays 24×24; the painted pip/worm is
  centered by the grid + the goo layer. UNCHANGED.
- **The aria register split** — `pattern="tabs"` (carousel) → `role="tablist"`/`role="tab"` +
  `aria-selected`; `pattern="group"` (DeckPager) → `role="group"`/`aria-current`. **The worm + goo
  layer are PRESENTATIONAL `aria-hidden`** (the tab-indicator precedent) — NO role, NOT a focus
  target. The dot buttons keep their semantics.
- **`windowFit`** (the `pagerWindow` oracle, `pagerWindow.ts`) — the worm travels between the SHOWN
  dot centers; at a clipped edge it anchors on the active dot's painted center. The `pagerWindow`
  math is DOM-free + the ONE oracle (PagerDots + DeckPager both source it). **NEVER re-fork
  `pagerWindow`** (the deck-boundary fence — no third copy).
- **Keyboard focus-survival across a window recompute** (PagerDots.vue:102-110) — the worm is
  `aria-hidden` (not a focus target), so it does not break this. KEEP.
- **Orientation** — the worm travel axis is derived off `data-orientation` (the tab `vertical.value`
  precedent: horizontal → translateX + stretch-X; vertical → translateY + stretch-Y; the reciprocal
  `--stretch` pairing flips per axis). KEEP both axes.
- **The `.glass-pager-ring` glass chassis** — UNCHANGED.
- **DeckPager is a THIN wrapper** — composes PagerDots via `pattern="group"`; gets the worm for FREE,
  ZERO DeckPager change (the no-re-implementation fence). The goo-morph lands ONCE in PagerDots;
  DeckPager + the carousel both inherit it (**≥2 consumers by construction**).

---

## 8. Compositor-only / PRM / Safari rules (motion-canon P5/P6 + `proof:no-layout-animation`)

These are BINDING + gate-enforced. The current PagerDots `width`/`height` transition VIOLATES P5
(a per-frame layout animation) — the worm rewrite is partly a FIX for that.

- **P5 — COMPOSITOR-ONLY.** The worm travels on `transform: translate`, deforms on `scale` (the
  `--stretch` reciprocal) + `opacity` + `filter` (the goo blur). It NEVER animates
  `width`/`height`/`inline-size`/`left`/`top`/`padding`/`margin`. **The elongation that LOOKS like a
  width grow is a `scale` over a RESERVED footprint** (the worm reserves `--pager-dot-elongated`
  ONCE; the travel + squish are all `transform` — the W-CARD-COMPOSITE / `useLiquidFlex.sizeStyle`
  one-time-reserve discipline). The goo filter is PAINT (a `filter`), not layout.
- **P3 — fade coupled to transform.** The worm's fill lift (inactive→active) couples opacity/color
  (EFFECTS leg, `--ease-standard` bezier — a color cross-fade on a spring reads as a wobble) with the
  transform travel (SPATIAL leg, the bouncy spring). The dot the worm leaves fades to inactive; the
  dot it arrives at is subsumed by the worm — ONE continuous layer, not two box transitions.
- **P6 — PRM keeps the fade, drops the transform.** Under `prefers-reduced-motion: reduce`:
  - the worm SNAPS to the active dot center (no travel spring, no overshoot),
  - the `--stretch` stays 1 (no squish — `squishOnTravel` early-returns on PRM, the
    `useTabIndicator.ts:206` precedent),
  - **the goo layer is DROPPED** (`.pager-goo-layer { display: none }` under reduce — the
    blur/threshold is a motion garnish; with no travel there is nothing to merge + a static
    blur+threshold is pure cost; the `morph-bridge.css` PRM-drop precedent), the plain dots show,
  - ONLY the color/opacity fill cross-fade survives (shortened). The pager STILL FUNCTIONS (the
    active dot is still indicated — correctness preserved, no liquid). KEEP the current PagerDots PRM
    arm shape (PagerDots.vue:236-240), extended to the worm transform; the worm needs its OWN
    recipe-local PRM block (the JS `--stretch` write must early-return).
- **Safari / WebKit — all channels WebKit-safe, the binding constraints:**
  - `transform: translate`/`scale` + CSS `transition` — universally compositor-accelerated.
  - `linear()` timing function (the `--spring-*` curves) — Baseline, Safari 17.2+.
  - **THE WebKit #184601 TRAP — `feColorMatrix`/`feGaussianBlur` on MOVING elements renders STALE.**
    WebKit computes the filter once + does not re-rasterize when the filtered subtree is
    animated/translated. The MITIGATIONS (R2 §4): (1) `will-change: transform` on `.pager-goo-layer`
    forces a dedicated compositor layer + WebKit re-rasterizes filtered content more reliably when the
    change is a TRANSFORM on the filtered subtree (which the worm IS); (2) **NEVER animate
    `stdDeviation` or the `feColorMatrix` values** — the most-broken WebKit path + un-CSS-var-able +
    non-compositor; the filter is STATIC, only opaque shapes translate/scale; (3) `@supports
    (filter: url(#x))` GATE the goo layer — on a non-supporting/buggy engine, hide `.pager-goo-layer`
    + show the plain transform worm (no filter) — the goo is a PROGRESSIVE ENHANCEMENT over a correct
    non-goo worm, NEVER the sole path (the `morph-bridge.css` degrade precedent + the W-LENSING
    `@supports url()` precedent + the dual-path single-writer discipline).
  - `filter: blur()` (the SVG goo) rides the surface's OWN pixels (NOT `backdrop-filter`, which would
    clobber the glass plate blur — the W-LIQUID-REVEAL rule: "the blur rides `filter` not
    `backdrop-filter`").
  - `color-interpolation-filters="sRGB"` — the predictable cross-engine path.
  - Tile the filter region TIGHT (`contain: layout paint` + the `-50% -50% 200% 200%` region just
    larger than the dot rail, NOT the whole page) — a pager rail is a tiny strip, so the blur cost is
    trivial when boxed (the `morph-bridge.css` tight-box rule).
  - Use UNPREFIXED `filter: url(#pager-goo)` (the SVG-reference form is standard; `-webkit-filter` is
    only needed for the shorthand `blur()`/`grayscale()` functions, not `url()`).

**Net Safari posture:** static SVG goo filter + opaque shapes moved by compositor `transform` on a
`will-change`-promoted, tight-boxed, `@supports`-gated layer (the plain worm as the floor), goo-layer
dropped under PRM. Clears the WebKit #184601 class (the transform on the promoted layer forces
re-raster, no moving-element filter-recompute reliance) + the no-layout-animation / compositor-only law.

---

## 9. The primitive REUSE map (R3 — COMPOSE, no re-fork)

| Gap | COMPOSE (shipped leaf) | Fence (no re-fork) |
|---|---|---|
| Worm travels between dot centers | the `useTabIndicator` travel SHAPE — `transform: translate` to MEASURED center, CSS `transition` on `--spring-bouncy` `linear()`, axis-derived | DON'T fork `useTabIndicator` (tab-coupled — reads `SegmentedTabOption[]`/`aria-pressed`); inline the ~30-line dot-geometry travel+squish glue in PagerDots OR factor a shared `useTravelSquish({anchors,active,axis,spring})` leaf IFF byte-faithful to the tab path (≥2-consumer bar met: tabs + pager) |
| Volume-preserving squish on travel | `useLiquidFlex` (`squishLaw:"linear"`, `maxStretch` live-read), the `--stretch` reciprocal CSS | `useLiquidFlex` is the ONE squish engine (W-LIQUID); NO second `tanh`/`1+frac·(cap−1)` write |
| The goo-neck merge | the CSS SVG-goo bridge — `morph-bridge.css` `feGaussianBlur`+`feColorMatrix` (the SAME blur-then-alpha-threshold), opaque-layer technique | DON'T mount goo-blob (non-deterministic `uTime`/pointer clock would red the M5 scalar-binding); reuse the shipped deterministic filter trick |
| The bounce + weight clock | `--spring-bouncy` @ `--spring-bouncy-duration` (0.57s, overshoot ~+12.6%) | a `SPRING_PRESETS` row, never a new family (W-GLASS-CAL spring fence) |
| Release-at-arrival | `INDICATOR_RELEASE_AT_ARRIVAL` × the bouncy clock (the `useTabIndicator.ts:249` pattern) | reuse the constant + shape |
| Windowing | the `pagerWindow` oracle (`pagerWindow.ts`, unchanged) | NEVER a third copy (the deck-boundary fence) |
| Deck inheritance | DeckPager composes PagerDots via `pattern="group"` — worm for free | NO DeckPager re-implementation |
| Tokens | `--pager-dot-*` KEPT + `--pager-worm-*`/`--pager-goo-*` added (§6) | consumer-token `var(--t, fallback)`, no `:deep()` |
| Compositor/PRM/Safari | transform+scale+opacity+filter only; PRM snaps+keeps-fade+drops-goo; `filter` not `backdrop-filter`; `@supports`-gated | `proof:no-layout-animation` + motion-canon P5/P6 (the CURRENT width/height transition is the violation this FIXES) |

**Net.** The goo-morph pager is the `useTabIndicator` traveling-squishing-indicator shape applied to
dot centers, on the `--spring-bouncy` clock, with the squish from `useLiquidFlex` and a deterministic
CSS goo-neck from the `morph-bridge.css` filter wrapped in the opaque-layer technique — all
compositor-only, PRM-carved, Safari-safe, landing ONCE in PagerDots so DeckPager + the carousel both
inherit it. It composes five shipped leaves and re-forks none.

---

## 10. EXACT-VALUE QUICK REFERENCE

| Quantity | Value / formula |
|---|---|
| pitch | MEASURED `dotCenter(i+1) − dotCenter(i)` (off the live DOM, not hardcoded) |
| progress `t` | `worm-t − floor(worm-t)` ∈ [0,1) |
| doubled `wormOffset` | `t·2` ∈ [0,2] |
| phase-1 stretch head/tail | `A−W/2` / `A+W/2 + wormOffset·(B−A)` |
| phase-2 contract tail/head | `B+W/2` / `A−W/2 + (wormOffset−1)·(B−A)` |
| max worm length | `W + (B−A)` (at the swipe midpoint) |
| compositor worm transform | `translateX(center) scaleX(len/W) scaleY(1/√(len/W))`, origin center |
| squish cap | `--pager-worm-max-stretch` = 1.08 (LOW — the gel, not taffy) |
| capsule radius | `H/2` (pill ends) |
| travel spring | `--spring-bouncy` (response 0.5 / ζ 0.55, overshoot ~+12.6%) |
| travel clock | `--spring-bouncy-duration` = 0.57s |
| release-at-arrival | `INDICATOR_RELEASE_AT_ARRIVAL × 0.57s` |
| goo blur | `feGaussianBlur stdDeviation = 4` (3-6 for dot scale; STATIC) |
| goo alpha matrix last row | `0 0 0 18 -7` (slope 18, shift −7; cutoff M/N ≈ 0.39) |
| goo composite | `feBlend SourceGraphic over goo` (crisp dot cores) |
| filter interpolation | `color-interpolation-filters="sRGB"` (mandatory) |
| filter region | `x/y/width/height = -50% -50% 200% 200%` |
| layer translucency | `--pager-goo-layer-opacity` = 0.52 (at the LAYER, not per-dot) |
| Safari layer promote | `will-change: transform` + `contain: layout paint` + `isolation: isolate` |
| PRM | worm snaps, `--stretch`=1, goo layer `display:none`, fade-only survives |
| `@supports` gate | `(filter: url(#x))` → goo layer; else the plain transform worm (the floor) |

---

## Sources (the research lineage)

- `research-google-worm.md` (R1) — the worm two-edge stretch-then-contract closed form + the
  spring timing-offset + the squish + the goo variant.
- `research-goo-merge.md` (R2) — the SVG gooey filter mechanism + values, the opaque-layer
  translucency fix, the WebKit #184601 trap + mitigations, the PRM/perf rules.
- `research-primitives.md` (R3) — the shipped-leaf reuse map: `useTabIndicator` travel,
  `useLiquidFlex` squish, `--spring-bouncy`, the `pagerWindow` oracle, the `--pager-*` tokens.
- In-repo: `src/components/custom/pager-dots/PagerDots.vue` (the current width/height-transition
  register to replace), `src/styles/dock/morph-bridge.css` (the shipped goo bridge — the filter +
  the deterministic-`f(scalar)` + tight-box + PRM-drop discipline), `src/composables/motion/{useLiquidFlex,springPresets}.ts`,
  `src/styles/tokens/scheme-motion.css` (the `--spring-bouncy` `linear()` + the 0.57s clock),
  `src/components/custom/tabs/composables/useTabIndicator.ts` (the travel + release-at-arrival shape).
