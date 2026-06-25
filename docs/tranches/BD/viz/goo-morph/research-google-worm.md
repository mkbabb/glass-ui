# RESEARCH-1 — the Google/Material/iOS liquid WORM page-indicator dot morph

The user named the EXTANT Google-deck / Material liquid page-indicator dot morph: as the active
dot moves A→B the indicator **STRETCHES to span BOTH dots** (an elongated worm/capsule), then the
**trailing edge catches up** (contracts) to land on B. A 2-phase **stretch-then-contract**, very
liquid + squishy. This document is the exact, buildable mechanism — the leading-edge vs
trailing-edge positions, the spring TIMING OFFSET between them, the squish/scale math, and the
goo/metaball variant.

BINDING LAW (carried through this whole spec): MOST items + transitions carry INERTIA, WEIGHT,
BOUNCE, LIQUID-GLASS. The pager/deck dots GOO-MORPH from one to another like the extant Google
deck — FAR more liquid + squishy than a subtle shift. Compositor-only, PRM-carved,
Safari-compatible, idiomatic, no legacy.

---

## 0. The canonical sources (what the extant pattern actually IS)

The pattern has ONE canonical name across ecosystems — the **WORM indicator** — and three
reference implementations that agree on the math:

1. **Flutter `smooth_page_indicator` → `WormPainter`** (Milad-Akarie) — the cleanest closed-form:
   a single moving rounded-rect whose two edges are driven by ONE scroll-progress scalar split
   into two phases. THIS IS THE BUILD REFERENCE. (the "head"/"tail" two-edge formula below).
2. **Android `dotsindicator` → `WormDotsIndicator`** (tommybuonomo) — a SPRING-driven variant: a
   stroked "background" dot track + a filled moving worm whose left & right edges are EACH a
   `SpringAnimation` (`SpringForce`), and the timing OFFSET between the two springs is what
   produces the stretch (the leading spring fires first, the trailing spring lags → the body
   elongates mid-flight, then the lagging edge catches up). This is the INERTIA/BOUNCE arm.
3. **React-Native Reanimated pagination dots** (jehillert / `react-native-animated-pagination-dots`
   "LiquidLike") — the interpolation model: per-dot width/opacity/scale interpolated off shared
   scroll progress; the LiquidLike variant adds the goo bridge via SVG.

The goo/metaball variant is the classic **gooey SVG filter** (Codrops / visualcinnamon): a parent
`feGaussianBlur` + `feColorMatrix` alpha-threshold that melts adjacent dots into one liquid blob
with an elastic bridge.

---

## 1. The geometry vocabulary (fixed, shared by every phase)

Lay the dots on a horizontal track (vertical is the transposed `dim` idiom — swap x↔y).

```
dotWidth   = W        // resting dot diameter (e.g. 8–10px); active worm rests at this width
dotHeight  = H        // = W for a circle at rest
spacing    = S        // gap between dot edges (e.g. 8px)
distance   = W + S    // CENTER-TO-CENTER pitch between adjacent dots  ← the load-bearing constant
radius     = H / 2    // fully-rounded capsule ends (pill)
```

`distance` (= `dotWidth + spacing`) is the single pitch the worm travels per page step. Every
formula below is in terms of `distance`, so the indicator is resolution-independent.

**Progress scalar.** The pager exposes a continuous `offset` (page-space float): integer part =
current page, fractional part = swipe progress to the next page.

```
page       = floor(offset)              // the dot we are leaving (A)
t          = offset - page              // ∈ [0,1)  progress A→B (the swipe fraction)
xPos       = page * distance            // left x of dot A (the anchor)
yPos       = height / 2                 // vertical center (constant on the x-axis variant)
```

---

## 2. THE WORM MECHANISM — the two-edge, two-phase closed form (BUILD THIS)

The worm is ONE rounded-rect (capsule). It has a **leading edge** (`tail`, the edge moving toward
B) and a **trailing edge** (`head`, the edge being left behind at A). The single trick: split the
swipe `t∈[0,1]` into a **doubled** progress and gate the two edges on the two halves.

```
wormOffset = t * 2          // ∈ [0,2]  — the doubled progress
```

### Phase 1 — STRETCH (wormOffset ≤ 1, i.e. first half of the swipe, t ∈ [0, 0.5])

The **leading edge moves first; the trailing edge stays pinned at A** → the body ELONGATES to span
the gap toward B. At the end of phase 1 the worm is at MAXIMUM length (spans A→B fully).

```
head = xPos                                      // trailing edge PINNED at dot A's left
tail = xPos + dotWidth + (wormOffset * distance) // leading edge travels one full `distance`
```

- At `t=0`:    `head=xPos`, `tail=xPos+dotWidth`        → worm length = `dotWidth` (a resting dot).
- At `t=0.5`:  `wormOffset=1` → `tail=xPos+dotWidth+distance` → worm length = `dotWidth + distance`
  (spans both dots — the elongated worm at full stretch).

### Phase 2 — CONTRACT (wormOffset > 1, i.e. second half, t ∈ [0.5, 1])

The **leading edge locks at B; the trailing edge catches up** → the body SHORTENS back to a dot.

```
tail = xPos + dotWidth + distance                // leading edge LOCKED at dot B's right
head = xPos + distance * (wormOffset - 1)         // trailing edge accelerates from A toward B
```

- At `t=0.5`:  `wormOffset=1` → `head=xPos`                  → still full length (continuous with phase 1).
- At `t=1`:    `wormOffset=2` → `head=xPos+distance`          → worm length collapses to `dotWidth`,
  now sitting exactly on dot B. Landed.

### The rounded-rect to paint each frame

```
left   = min(head, tail)
right  = max(head, tail)
rect   = RoundedRect(left, yPos - H/2, right, yPos + H/2, radius = H/2)
```

The capsule's pill ends (`radius = H/2`) are what make it read as LIQUID — the worm is a
fully-rounded capsule that grows along its length, never a hard bar.

**Why this is the exact "stretch-then-contract" the user sees:** in phase 1 only `tail` moves
(length grows from `W` → `W+distance`); in phase 2 only `head` moves (length shrinks
`W+distance` → `W`). The instant of max length is the swipe midpoint, where the worm visually
bridges both dot centers.

### Worm TYPE variants (squish on the cross-axis)

The "thin" / "underground" worm adds a **cross-axis squish** synchronized to the same
`wormOffset`, so the worm THINS while it stretches (volume-preserving liquid read):

```
half = H / 2
// thin:  height pinches to half at the midpoint, returns to full at the ends
if (wormOffset <= 1)  drawHeight = half + half * (1 - wormOffset)   // H → H/2 over phase 1
else                  drawHeight = half + half * (wormOffset - 1)   // H/2 → H over phase 2
```

- `normal`: constant `H` (a fat worm).
- `thin`: cross-axis pinches to `H/2` at full stretch (the volume-preserving liquid worm — pairs
  with our `useLiquidFlex` reciprocal-squish idiom: the long axis grows, the short axis pinches).
- `underground`: the worm dips BELOW the dot track (a `yPos` offset on the cross axis during
  flight) so it reads as a drop sliding under the dots and re-surfacing at B.
- `thinUnderground`: both at once.

This thin-pinch IS the squish/scale math the user wants: **the elongation along travel is paired
with a reciprocal pinch on the cross axis** — `scaleX↑` ⟺ `scaleY↓`, the volume-preserving gel.

---

## 3. THE SPRING / TIMING-OFFSET ARM — the inertia + bounce model (Android variant)

The Flutter formula above is geometric (deterministic in `t`). To get INERTIA, WEIGHT and BOUNCE
(the binding law), drive the two edges as TWO SEPARATE SPRINGS with a TIMING OFFSET — this is the
`WormDotsIndicator` model and the one that reads "alive."

**Two springs, one target, offset release:**

```
// targets when a page B is selected (center-to-center):
leadingTarget  = B_center      // the edge moving toward B
trailingTarget = A_center      // the edge leaving A

spring(stiffness, damping):                     // SpringForce
  STIFFNESS  ≈ MEDIUM-LOW  (SpringForce.STIFFNESS_LOW … _MEDIUM)
  DAMPING    < 1  (UNDERDAMPED → overshoot/bounce)  e.g. dampingRatio ≈ 0.6–0.75
```

The **timing OFFSET** is the entire trick: the **leading edge spring fires immediately**, the
**trailing edge spring fires after a short lag** (or with HIGHER stiffness on the leader / LOWER
stiffness on the follower so the leader simply reaches target first). Because the leader arrives
before the follower:

- mid-flight, `leading` is ahead of `trailing` by a growing gap → the worm body STRETCHES
  (exactly the phase-1 elongation, but now velocity-shaped, not linear).
- as the follower's spring catches up (and overshoots slightly, ζ<1), the worm body CONTRACTS and
  BOUNCES onto B — the squishy landing.

**The glass-ui-native expression of this** (do NOT fork a spring engine — CLAUDE.md W-PRESS-UNIFY /
the `useSpring`→keyframes.js `SpringProgress` discipline):

- ONE `SpringProgress` per edge (leading `sₗ`, trailing `sₜ`), both on a SPRING_PRESETS row
  (`snappy` response 0.35 / ζ 0.65 is the iOS drag register the dock/drag-morph already use; for a
  bouncier landing use `bouncy`). The two springs share the target page-index but the trailing
  spring's target is SET one beat later (a single `nextTick`/`requestAnimationFrame` lag) OR runs a
  softer ζ so it lags by physics rather than by a timer.
- The edges write `--worm-head` / `--worm-tail` (registered `@property <length>` so they
  INTERPOLATE, never snap — the `--dock-morph-t`/`--border-progress-fill` precedent), and the
  capsule paints `inline-size: calc(var(--worm-tail) - var(--worm-head))` +
  `translateX(var(--worm-head))`.

> **Compositor-only caveat (binding):** animating `inline-size` per-frame is a layout property —
> FORBIDDEN by `proof:no-layout-animation`. Build the worm the COMPOSITOR way: paint a resting
> capsule at `dotWidth` and drive **`transform: translateX(headPos) scaleX(lengthRatio)`** with
> `transform-origin: left center`, where `lengthRatio = currentLength / dotWidth`. The pill ends
> distort under `scaleX` — to keep the ends circular either (a) accept the slight end-stretch (reads
> fine at small radii) or (b) use the SVG/goo path (§4) where the bridge is a filter, not a scale.
> The cross-axis thin-pinch is a paired `scaleY(1/lengthRatio-ish)` (capped LOW, the
> `useLiquidFlex` reciprocal-squish, `--tab-indicator-max-stretch` ≤ ~1.08 ceiling discipline).

---

## 4. THE GOO / METABALL VARIANT — the liquid bridge (the "Google deck" gooey read)

For the MAXIMALLY liquid read (two dots melting into one blob with an elastic neck, then the neck
snaps to B), use the **gooey SVG filter** on a PARENT wrapping the dots + the moving worm. The blur
makes adjacent shapes bleed together; the alpha-threshold color-matrix snaps the bleed back into a
crisp merged silhouette → a metaball bridge.

### The filter (the canonical Codrops/visualcinnamon values)

```xml
<svg width="0" height="0" style="position:absolute">
  <defs>
    <filter id="goo-worm">
      <!-- 1. blur: bigger stdDeviation = longer/stickier liquid bridge -->
      <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur"/>
      <!-- 2. alpha threshold: last row multiplies alpha (contrast) then offsets (threshold) -->
      <feColorMatrix in="blur" mode="matrix"
        values="1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 19 -9" result="goo"/>
      <!-- 3. paint the original crisp graphics back on top of the goo silhouette -->
      <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
    </filter>
  </defs>
</svg>
```

Apply `filter: url(#goo-worm)` to the dots' CONTAINER (the filter must process all children as one
graphic — a per-element filter cannot merge across elements).

### Tuning the two knobs (this is the whole goo dial)

- **`stdDeviation` (blur radius) — the bridge LENGTH / stickiness.** Larger → the dots stay
  connected by a thicker liquid neck across a wider gap (more "Google deck" stretch); smaller →
  the neck pinches off sooner. Range `4–10` for dot-scale geometry; `6` is a good default for
  `W≈8, S≈8`.
- **`feColorMatrix` last row `… A B`** (here `19 -9`) — the **alpha contrast (A) + threshold (B)**.
  A multiplies the blurred alpha (edge crispness); B offsets it (where the merge cut-off sits).
  Canonical pairs in the wild: `19 -9` (Codrops), `18 -7`/`18 -8` (sharper), `22 -10` (stickier
  metaball), `25 -15` (very crisp). Higher A → crisper edges; more-negative B → the bridge only
  forms when the dots are CLOSER (a tighter neck). **Keep the A:|B| ratio near ~2:1** — that's the
  band that yields a clean blob without ringing.

### How two dots become a liquid bridge (mechanism)

Two solid circles `d` apart: after `feGaussianBlur` each becomes a soft radial alpha falloff; where
the two falloffs OVERLAP in the gap, the summed alpha rises above the `feColorMatrix` threshold (B)
and gets snapped to opaque (A) → a solid neck appears. As the worm/active blob moves and the gap
closes, the overlap region (hence the neck) FATTENS; as it pulls away it THINS and finally drops
below threshold → the neck snaps. That snap-off is the squishy "pinch" the metaball read is famous
for.

### Driving the goo worm

Place a moving filled circle (the "active blob," driven by ONE `SpringProgress` traveling
`page→page+1` over `distance`) inside the gooey container alongside the static resting dots. As the
blob springs from A toward B it forms a neck with A (stretch), bridges B at the midpoint, then the
neck to A snaps and it settles on B (contract). The §3 spring gives the inertia/overshoot; the
filter gives the liquid skin. NO per-edge geometry math needed in this variant — the FILTER does the
stretch-then-contract for free off a single traveling blob.

---

## 5. The interpolation arm (RN/Reanimated model — for the per-dot secondary cues)

Beside the worm, the EXTANT decks also interpolate the RESTING dots off the same scroll progress
(width/opacity/scale), so the whole strip breathes. Per dot index `i`, screen-width `w`:

```
inputRange  = [(i-1)*w, i*w, (i+1)*w]
opacity     = interpolate → [inactiveOpacity, 1, inactiveOpacity]   // e.g. [0.4, 1, 0.4]
scale       = interpolate → [1, activeScale, 1]                     // e.g. [1, 1.4, 1]
// "expanding dot" variant: width grows on the active dot instead of (or with) the worm:
dotWidth_i  = interpolate → [W, W_active, W]                        // e.g. [8, 24, 8]
Extrapolation.CLAMP on all
```

This is LINEAR off scroll (no spring) and is the calm secondary layer UNDER the springy worm — use
it for the inactive dots' fade/scale while the worm carries the hero motion. Do NOT make this the
hero (it's a subtle shift; the user explicitly wants FAR more liquid than this alone).

---

## 6. BUILD RECIPE — the glass-ui-idiomatic synthesis (what the builder implements)

Combine the THREE arms into the deck/pager dot morph:

1. **Geometry** (§1–§2): lay dots on `distance = W+S` pitch; the worm is a capsule
   (`radius = H/2`).
2. **Motion** (§3): drive the worm as the COMPOSITOR transform
   `translateX(head) scaleX(length/W)` with `transform-origin:left center`, where `head` and
   `length` come from TWO `SpringProgress` edges (leading fires first, trailing lags) on a
   SPRING_PRESETS row (`snappy` ζ≈0.65 for crisp, `bouncy` for more overshoot). Pair a capped
   reciprocal `scaleY` for the volume-preserving thin-pinch (§2 thin variant; the `useLiquidFlex`
   law, `≤1.08` stretch ceiling). Write `--worm-head`/`--worm-tail`/`--worm-stretch` as registered
   `@property` customs so they interpolate.
3. **Liquid skin** (§4, OPTIONAL maximal mode): wrap the dots + worm in the gooey SVG filter
   container (`stdDeviation≈6`, matrix `… 19 -9`) so the worm melts into and out of the resting
   dots with a metaball neck — the "Google deck goo" read.
4. **Secondary** (§5): interpolate the resting dots' opacity/scale off the same scroll progress
   (linear, calm) so the strip breathes under the springy worm.

### Bindings the builder MUST honor (CLAUDE.md + the binding law)

- **Compositor-only.** Only `transform`/`opacity`/`filter` per frame. NEVER animate
  `inline-size`/`width`/`left`/`margin` (`proof:no-layout-animation`). The worm LENGTH is `scaleX`,
  not an animated width. The settled FOOTPRINT (the resting capsule at `W`) is a one-time layout
  reserve.
- **Spring discipline.** Reuse `useSpring`→keyframes.js `SpringProgress` on a SPRING_PRESETS row;
  NO new spring clock, NO hand-rolled rAF integrator (W-GLASS-CAL spring fence / W-PRESS-UNIFY). The
  worm IS a `useDragMorph`/`useLiquidFlex` sibling — it composes the same substrate.
- **PRM-carved.** Under `prefers-reduced-motion: reduce`: the worm SNAPS to B (no stretch, no
  bounce, `scaleX=1`, `scaleY=1` instant), the goo filter holds a static merged frame or drops to a
  plain dot, the secondary opacity cross-fade STAYS (legibility cue, not motion). The
  `SpringProgress.respectReducedMotion` deterministic seat handles the snap.
- **Safari-compatible.** `@property` registered customs + `feGaussianBlur`/`feColorMatrix` are all
  Safari-supported; SVG filters can be jank-heavy on large areas (Codrops warning) — the dot strip
  is TINY, so the goo filter is cheap here (the §4 perf caveat applies to large fills, not a
  ~120px-wide dot row). Provide an `@supports`/feature-detect fallback to the §2–§3 transform worm
  (no filter) on any engine where the filter is a perf risk — the transform worm is the everywhere
  floor, the goo filter the refinement (the W-LENSING `@supports url()` precedent).
- **One registry.** The worm reads the consumer-owned active-page model; it owns NO shadow ref
  (the `<DockStack>`/`useTabIndicator` one-registry discipline).

---

## 7. EXACT-VALUE QUICK REFERENCE

| Quantity | Value / formula |
|---|---|
| pitch `distance` | `dotWidth + spacing` (center-to-center) |
| progress `t` | `offset - floor(offset)` ∈ [0,1) |
| doubled `wormOffset` | `t * 2` ∈ [0,2] |
| phase-1 (stretch) head | `xPos` (pinned at A) |
| phase-1 (stretch) tail | `xPos + dotWidth + wormOffset*distance` |
| phase-2 (contract) tail | `xPos + dotWidth + distance` (locked at B) |
| phase-2 (contract) head | `xPos + distance*(wormOffset-1)` |
| max worm length | `dotWidth + distance` (at the swipe midpoint) |
| capsule radius | `dotHeight / 2` (pill ends) |
| thin-pinch height | `H/2 + H/2*(1-wormOffset)` then `H/2 + H/2*(wormOffset-1)` |
| spring (crisp) | response ≈0.35, ζ ≈0.65 (snappy / iOS drag) |
| spring (bouncy land) | ζ < 0.6 underdamped for visible overshoot |
| timing offset | leading spring fires first; trailing lags ~1 frame OR softer ζ |
| goo blur | `feGaussianBlur stdDeviation ≈ 6` (4–10 for dot scale) |
| goo alpha matrix last row | `0 0 0 19 -9` (multiply 19, offset -9; ~2:1 ratio) |
| goo composite | `feComposite operator="atop"` (crisp graphics over goo) |
| secondary opacity | interpolate [0.4, 1, 0.4] off scroll, CLAMP |
| secondary scale | interpolate [1, 1.4, 1] off scroll, CLAMP |

---

## Sources

- [Flutter `smooth_page_indicator` (Milad-Akarie) — `WormPainter` head/tail two-phase formula](https://pub.dev/packages/smooth_page_indicator)
- [Android `dotsindicator` (tommybuonomo) — spring-driven WormDotsIndicator](https://github.com/tommybuonomo/dotsindicator)
- [`react-native-animated-pagination-dots` — LiquidLike SVG dots](https://github.com/weahforsage/react-native-animated-pagination-dots)
- [jehillert — RN Reanimated pagination dots interpolation model](https://jehillert.medium.com/how-to-create-a-react-native-pagination-dots-component-with-react-native-reanimated-e427c5731ada)
- [Codrops — Creative Gooey Effects (filter values + perf caveat)](https://tympanus.net/codrops/2015/03/10/creative-gooey-effects/)
- [Visual Cinnamon — the gooey SVG effect (feColorMatrix alpha threshold)](https://www.visualcinnamon.com/2016/06/fun-data-visualizations-svg-gooey-effect/)
- [Reactiive — Metaball animation (blur + threshold merge mechanism)](https://reactiive.io/articles/metaball)
- [Medium (Parth Jansari) — the infamous Goo filter](https://medium.com/@parth_jansari/the-infamous-goo-filter-9caceb44ebb5)
