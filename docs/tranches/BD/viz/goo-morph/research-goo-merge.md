# RESEARCH-2 — the SVG goo / metaball merge for liquid pager dots

**Lane** BD goo-morph triumvirate · **Role** RESEARCH-2 (SVG gooey-filter metaball merge) ·
**Sibling research** `research-google-worm.md` (R1 — the worm leading/trailing-edge indicator),
`research-primitives.md` (R3 — the glass-ui motion primitives to compose) ·
**Output consumer** the PLAN+WAVE architect → `BUILD-SPEC.md` + `W-PAGER-GOO-MORPH.md`.

> Research artefact. Writes no `src/` code. Documents the EXACT buildable SVG-goo mechanism that
> makes the pager dots **MERGE liquidly** as the worm indicator (R1) passes them — the goo-blob
> smin look applied to flat DOM dots. Concrete + buildable: the builder implements from this.

---

## 0. THE GOAL (the user's binding bar)

The active indicator travelling A→B must **goo-morph** the dots: as the worm stretches across the
gap, the dots it touches **MELT INTO IT** (a metaball merge — a liquid neck forms between the worm
and each dot, then releases) — FAR more liquid than a pill sliding past static pips. This is the
`smin` (smooth-minimum) read the goo-blob ships in WebGL, achieved on flat DOM via the **classic
SVG gooey filter** (blur-then-alpha-threshold). The worm (R1) is the *travelling shape*; the SVG
goo filter is the *merge medium* that fuses the worm + the dots into one amorphous silhouette
wherever their blurred alpha overlaps.

---

## 1. THE CLASSIC GOOEY FILTER — the exact mechanism + the canonical values

The gooey filter is a two-stage alpha trick (the "Goo filter", Lucas Bebber 2015, CSS-Tricks):

1. **`feGaussianBlur`** blurs the source alpha so each shape becomes a soft cloud; two clouds that
   sit close **overlap in their blurred fringe** (their summed alpha rises in the gap between them).
2. **`feColorMatrix type="matrix"`** with a steep multiply+shift on the **alpha row** thresholds
   that blurred alpha back to a hard edge — pixels above the threshold snap to opaque, below snap to
   transparent. Where two clouds overlapped, the summed alpha clears the threshold → **a solid neck
   forms between them** → they read as ONE blob. Where a shape stands alone, the threshold re-sharpens
   its own edge back to (near) its original silhouette.

### The canonical filter (the buildable source)

```html
<!-- A hidden inline SVG mounted ONCE per page (or per rail). Referenced by CSS
     `filter: url(#pager-goo)`. The filter region MUST be widened (x/y/width/height)
     or the blur clips at the bounding box. -->
<svg class="goo-defs" width="0" height="0" aria-hidden="true" focusable="false"
     style="position:absolute">
  <defs>
    <filter id="pager-goo"
            x="-50%" y="-50%" width="200%" height="200%"
            color-interpolation-filters="sRGB">
      <!-- 1. BLUR — stdDeviation is the merge REACH. Larger = dots merge from
              farther apart. For a 6px pip on a ~16-22px pitch rail, sd ≈ 4-6 px
              makes adjacent dots merge only when the worm bridges them. -->
      <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur"/>
      <!-- 2. THRESHOLD — the alpha row `0 0 0 N -M`. N = alpha multiply (slope),
              M = alpha shift (cutoff). The canonical Goo values are N=18 M=7
              ("18 -7"); a SMOOTHER (less crisp, more liquid neck) variant is
              N=25 M=15 ("25 -15"). Higher N = sharper snap; the M/N ratio sets
              the threshold (~0.39 at 18/7, ~0.60 at 25/15). -->
      <feColorMatrix in="blur" mode="matrix"
        values="1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 18 -7" result="goo"/>
      <!-- 3. RE-COMPOSITE the SHARP source atop the gooed silhouette so the dots'
              own crisp interiors paint over the merged blob (the necks stay gooey,
              the dot CORES stay crisp — the premium read). Optional: drop this
              feBlend to get a fully-soft blob with no crisp cores. -->
      <feBlend in="SourceGraphic" in2="goo"/>
    </filter>
  </defs>
</svg>
```

**The three knobs and what they do (the build dials):**

| Knob | Value | Effect | Pager tuning |
|---|---|---|---|
| `feGaussianBlur stdDeviation` | px | merge REACH — how close two shapes must be to neck | **~4-6px** for a 6px pip; tune so a resting dot does NOT merge with its neighbour, but the worm bridging them DOES |
| `feColorMatrix` alpha N (slope) | 8-25 | edge sharpness after threshold | **18** (canonical) — crisp metaball edge; raise toward 25 for a softer wetter neck |
| `feColorMatrix` alpha M (shift) | derived | the cutoff = M/N | keep M/N ≈ 0.39-0.5 (M≈7 at N=18) so the neck forms mid-overlap, not only at full overlap |

`color-interpolation-filters="sRGB"` is **mandatory** — the default `linearRGB` shifts the threshold
math and (in some engines) darkens the blob; sRGB keeps the alpha threshold predictable and matches
how the dots' own color reads.

### Why this maps to the goo-blob `smin`

The WebGL goo-blob computes a true **smooth-minimum of signed distance fields** (`sdf-body.glsl.ts`:
`sminQuadratic`/`sminCircular`, `uSmoothK` a real blend-band width). The SVG blur+threshold is the
**screen-space alpha analogue**: `feGaussianBlur stdDeviation` plays the role of `uSmoothK` (the
blend reach), and the `feColorMatrix` threshold re-extracts a sharp iso-contour — exactly what an SDF
iso-surface is (the zero-crossing of a smoothed distance). It is a cheaper, flatter `smin` for flat
DOM marks — the same melt, no shader. (The existing `dock/morph-bridge.css` ships this very trick to
merge two dock plates into a teardrop; we apply it to N dots + a worm.)

---

## 2. THE KEY PROBLEM — translucent dots break the alpha threshold (and the clean fix)

**The problem.** The gooey filter thresholds **ALPHA**. The pager dots are **translucent**:
`--pager-dot-inactive = color-mix(in srgb, var(--foreground) 52%, transparent)` (52% alpha), hover
72%, active full. A 52%-alpha pip, after blur, has a peak alpha *well below* the canonical threshold
(M/N ≈ 0.39) — so `feColorMatrix` **erases it entirely** (it never clears the cutoff), or the blur
fringe where two 52% dots meet sums to ~0.5 which is right at the knife-edge → flickery, unreliable
necks. The goo filter wants **near-opaque** shapes; the rail's translucency is its whole identity.
The two requirements collide head-on.

**The clean fix — render OPAQUE, tint at the LAYER (the opaque-goo-layer technique).**

Split the rail into TWO concerns that were previously fused on each dot:

> **SILHOUETTE (opaque, gooed)** vs **APPEARANCE (translucency + tint, applied at the layer).**

1. **The goo layer paints FULL-ALPHA black (or any opaque fill).** Render the dots + the worm
   indicator into a dedicated `.pager-goo-layer` where EVERY fill is **`opacity:1` opaque** — the dot
   `::before` pips and the worm element all paint `background: #000` (or `var(--foreground)` *forced
   to full alpha*, e.g. `background: var(--pager-goo-ink, currentColor)` with `--pager-goo-ink` an
   opaque token). The goo filter (`filter: url(#pager-goo)`) is applied to THIS layer. Because every
   shape is opaque, the blur+threshold produces clean, reliable metaball necks — the worm merges with
   each dot it bridges, exactly as the goo filter wants.

2. **The rail translucency + tint are applied to the WHOLE layer, not per-dot.** The opaque gooed
   silhouette is then re-tinted + made translucent **at the layer level** via ONE of these (in order
   of cleanliness + Safari-safety):

   - **(A) `opacity` + `color` on the layer (SIMPLEST, Safari-safe).** Paint the goo layer's shapes
     in a single solid color (`color: var(--foreground)` → opaque fills via `currentColor`), then set
     `opacity: 0.52` on the `.pager-goo-layer` itself. The merged silhouette inherits the rail's 52%
     translucency uniformly. The active/hover/inactive *per-dot* alpha differences are then carried by
     the **worm indicator** (full opacity) riding over the dim 52% dot bed — the active region reads
     brighter because the opaque worm sits on it, exactly the intended hierarchy. This is the
     **recommended default**: one `opacity` on the layer, zero per-dot alpha to fight the threshold.

   - **(B) `mask` the layer with the goo silhouette + paint the tint underneath (MAX control).**
     Use the gooed opaque shape as a **luminance/alpha MASK** (`mask-image` referencing the goo layer,
     or an SVG `<mask>`) over a tint fill (`background: var(--pager-dot-active)` / a `--foreground`
     translucent wash, or even a gradient/`--glass-accent` per-region). The mask carries the merged
     geometry; the fill carries the rail's color + translucency + any per-region tint. This buys
     per-region color (active dot a different hue from inactive) while keeping ONE gooed silhouette.
     **Caveat:** CSS `mask` + SVG filter stacking has Safari edge-cases (§4) — prefer (A) unless the
     design needs per-region tint.

   - **(C) `mix-blend-mode` the goo layer onto the rail (for a "stained-glass" tint).** Paint the
     goo layer opaque in the tint color and set `mix-blend-mode: …` against the translucent glass
     pill behind it. Riskier (blend + filter + backdrop-filter interactions are the least portable);
     documented for completeness, NOT recommended for the default.

**The recommended composition (default):** technique **(A)** — opaque goo layer in one solid
`currentColor`, `opacity` on the layer for the 52% rail translucency, the worm at full opacity
carrying the active brightness. It is the fewest moving parts, the most Safari-portable, and it
preserves the `--pager-dot-*` token surface (the tokens now drive the LAYER opacity + the worm color,
not a per-dot alpha that fights the filter).

```css
/* The opaque goo layer — the silhouette medium. Full-alpha shapes; the filter
   merges them reliably because nothing is translucent INSIDE the filter. */
.pager-goo-layer {
  position: absolute;
  inset: 0;
  /* the gooey metaball filter — the SAME trick as dock/morph-bridge.css */
  filter: var(--pager-goo-filter, url(#pager-goo));
  /* the rail translucency, applied ONCE at the layer (technique A) */
  opacity: var(--pager-goo-layer-opacity, 0.52);
  color: var(--pager-dot-active);            /* the solid ink the shapes use */
  pointer-events: none;                       /* hit-targets live on the real buttons above */
}
.pager-goo-layer .goo-dot,                    /* the opaque pip silhouettes */
.pager-goo-layer .goo-worm {                  /* the opaque worm silhouette */
  background: currentColor;                    /* FULL alpha — the filter needs opacity:1 */
}
/* the worm rides at full layer presence; the active brightness is the worm sitting
   on the 52% dot bed (no per-dot alpha needed). */
```

The interactive buttons (the real `<button class="pager-dot">` hit-targets, WCAG 2.5.8, keyboard
focus, aria) stay **above** the goo layer as **transparent 24px boxes** (no paint) — the goo layer is
purely decorative silhouette, the buttons own all a11y + pointer. This cleanly separates *paint*
(gooed, decorative, `pointer-events:none`, `aria-hidden`) from *interaction* (the existing buttons,
untouched) — the same split `morph-bridge.css` uses (the bridge is decorative; the real docks own
behaviour).

---

## 3. HOW THE GOO COMPOSES WITH THE WORM (R1) — the merge as the worm passes

R1 (the Google/Material worm) produces a **stretching capsule** that spans source→target then
contracts onto the target. The goo filter is what makes that worm **MERGE** with the dots instead of
sliding over them. The composition:

1. **One opaque goo layer holds BOTH the dot pips AND the worm.** The worm element (R1's
   leading/trailing-edge capsule, on its `--spring-*` clock) and every dot `::before` pip live inside
   `.pager-goo-layer`, all opaque. The `filter: url(#pager-goo)` is on the layer, so the filter sees
   the worm + the dots as one source graphic.

2. **As the worm stretches across the gap, its blurred fringe overlaps each dot it bridges → a neck
   forms → they read as ONE blob.** This is the merge: the worm doesn't *cover* the dot, it
   *absorbs* it — a liquid neck wells up between the worm's edge and the dot center, exactly the
   goo-blob `smin` pseudopod read. As the worm contracts onto the target (R1 phase 2), the trailing
   neck **releases** from the source dot (the alpha drops below threshold as the blurred shapes
   separate) — the source dot "pinches off" back to a free pip, the target dot is now fused into the
   landed worm. Stretch → neck-up → travel-fused → pinch-off → land. That is the Google-deck liquid
   morph, achieved by the worm geometry (R1) × the goo medium (this doc).

3. **The merge REACH is tuned by `stdDeviation` vs the rail pitch.** Set `stdDeviation` so:
   - a **resting** dot does NOT merge with its idle neighbour (the pips read as discrete at rest), and
   - the **worm**, whose body is fatter than a pip and which physically bridges the gap, DOES neck
     into both the dot it's leaving and the dot it's approaching.

   Practically: `stdDeviation ≈ 0.7-1.0 × the pip radius`, and the worm's resting fatness (R1's
   capsule min-width) ≥ the pip diameter, so the worm always clears the threshold across the gap
   while two idle pips don't. The worm's STRETCH (scaleX/span growth, R1) increases its blurred
   overlap with both endpoints mid-travel — automatically deepening the necks at peak stretch (the
   most-liquid frame) and releasing them as it contracts. The goo merge **intensity tracks the worm
   stretch for free** — no extra clock.

4. **The worm + goo share the SAME spring scalar.** R1 drives the worm geometry off a `--spring-*`
   clock (R3 names the preset — likely `--spring-bouncy`/`--spring-snappy` for the BOUNCE + WEIGHT,
   or `--spring-dock` per the current PagerDots elongation). The goo merge is a **pure consequence of
   the worm geometry** — it adds NO second clock (the determinism rule the goo-blob and morph-bridge
   both hold: every animated axis is `f(--spring-scalar)`, never a parallel filter animation). The
   `feGaussianBlur stdDeviation` + `feColorMatrix` values are **STATIC** — the filter never animates;
   only the shapes inside it move, on the worm's spring. (Animating `stdDeviation` is the Safari trap,
   §4 — and unnecessary: static filter + moving opaque shapes gives the full merge.)

---

## 4. SAFARI / WEBKIT + PERFORMANCE — the binding constraints (compositor-only, PRM-carved)

**THE LOAD-BEARING SAFARI BUG — `feColorMatrix` on MOVING elements (WebKit #184601).** WebKit has a
long-standing class of bugs where a CSS `filter: url(#…)` referencing `feColorMatrix`/`feGaussianBlur`
**fails to update / renders stale or blank when the filtered element (or its children) is
animated/translated** — the filter result is computed once and not re-rasterized on transform. This
is the exact case here (the worm + dots move inside the filtered layer). Mitigations, in order:

1. **Force WebKit to re-rasterize the filtered layer per frame.** The reliable workaround is to keep
   the filtered layer on its own compositor layer AND nudge it each frame, OR — cleaner — apply the
   filter to a layer whose **own** transform/contents change is what WebKit watches. In practice:
   - Add **`will-change: transform`** (or `transform: translateZ(0)`) to `.pager-goo-layer` to force a
     dedicated layer, and
   - drive the worm/dots with **`transform: translate`/`scale`** (compositor channels) — WebKit
     re-rasterizes filtered content more reliably when the change is a transform on the filtered
     subtree than when it's a geometry/`stdDeviation` change.
   - **NEVER animate `stdDeviation` or the `feColorMatrix` values** (the most broken WebKit path +
     un-CSS-var-able + non-compositor). The filter is STATIC; only opaque shapes translate/scale.

2. **`@supports` GATE the goo — graceful degrade to the current cross-fade.** Wrap the goo layer in
   `@supports (filter: url(#x))` AND feature-detect the WebKit staleness at runtime if needed. On a
   non-supporting / buggy engine, **hide `.pager-goo-layer` and show the existing translucent dots +
   a plain spring-elongating pill** (the current `PagerDots` `::before` width-morph is the floor).
   The goo is a PROGRESSIVE ENHANCEMENT over a correct non-goo worm — never the sole path. This
   mirrors `morph-bridge.css` (the goo teardrop degrades to a VT crossfade) and the dual-path
   single-writer discipline the library uses everywhere.

3. **Tile the filter region TIGHT (perf).** `feGaussianBlur` is a per-frame full-region repaint. Keep
   the filter `x/y/width/height` and the `.pager-goo-layer` box just larger than the dot rail (NOT
   the whole pager / page) so the blur covers a small region — the same `contain: layout paint` +
   tight-box discipline `morph-bridge.css` documents ("a small region, not the full stage"). Add
   `contain: layout paint` to the goo layer. A pager rail is a tiny strip, so the cost is trivial
   when boxed; unboxed over a full viewport it would be a budget risk.

4. **`color-interpolation-filters="sRGB"`** (repeat — also a portability point: linearRGB filter math
   diverges subtly across engines; sRGB is the predictable cross-engine path).

5. **PRM CARVE (absolute — `prefers-reduced-motion: reduce`).** Under reduce:
   - the worm does NOT stretch (R1's stretch → instant nearest-snap), AND
   - **drop the goo layer entirely** (`.pager-goo-layer { display: none }` under reduce) — show the
     plain dots + an instant active-dot change. The blur/threshold is a motion garnish; with no
     travel there's nothing to merge, and a static blur+threshold is pure cost. This matches
     `morph-bridge.css` (`@media (prefers-reduced-motion: reduce) { --dock-bridge-opacity: 0 }` — the
     teardrop never paints under reduce). The discrete active change still happens (correctness
     preserved), just with no liquid.

6. **`-webkit-filter` is NOT needed for `url(#…)`** (modern Safari supports unprefixed `filter:
   url()`); the prefix only matters for the shorthand `blur()`/`grayscale()` functions on old WebKit.
   Use unprefixed `filter: url(#pager-goo)` (the SVG-reference form is standard).

**Net Safari posture:** static SVG goo filter + opaque shapes moved by compositor `transform` on a
`will-change`-promoted, tightly-boxed layer, `@supports`-gated with the plain worm as the floor,
goo-layer dropped under PRM. This clears the WebKit #184601 class (no moving-element filter-recompute
reliance — the transform on the promoted layer forces re-raster) and the no-layout-animation /
compositor-only law (the filter is paint; the motion is transform; zero layout property animates).

---

## 5. THE BUILDABLE RECIPE (the synthesis for PLAN/BUILD)

```
┌─ <PagerDots> rail (the glass pill chassis, unchanged) ────────────────────────┐
│  ┌─ .pager-goo-layer  (position:absolute; inset:0; pointer-events:none;       │
│  │     aria-hidden; will-change:transform; contain:layout paint;              │
│  │     filter:url(#pager-goo); opacity:.52; color:var(--pager-dot-active))    │
│  │   • N opaque .goo-dot pips      (background:currentColor, full alpha)       │
│  │   • 1 opaque .goo-worm capsule  (R1 worm — opaque, transform-driven,       │
│  │       spring clock, stretches src→target then contracts)                   │
│  │   → the SVG goo filter merges worm+dots into ONE metaball silhouette;      │
│  │     necks form mid-travel, pinch off on land; layer opacity gives the      │
│  │     52% rail translucency uniformly                                        │
│  └────────────────────────────────────────────────────────────────────────── │
│  ┌─ N transparent <button.pager-dot> hit-targets (ABOVE the goo layer) ──────  │
│  │   • 24px box, no paint, focus-ring, aria/role, keyboard, windowFit, click  │
│  │   → ALL a11y + interaction lives here, UNTOUCHED from current PagerDots    │
│  └────────────────────────────────────────────────────────────────────────── │
└────────────────────────────────────────────────────────────────────────────────┘
+ ONE hidden <svg><defs><filter id="pager-goo"> mounted per page (or per rail).
+ @supports(filter:url())   → goo layer; else current ::before width-morph floor.
+ @media(prefers-reduced-motion) → goo layer display:none; instant active change.
```

**The filter (final values to ship):**
```
feGaussianBlur stdDeviation = 5        (tune 4-6 to the live pip size + rail pitch)
feColorMatrix  alpha row    = 0 0 0 18 -7   (canonical; raise N→25, M→15 for a wetter neck)
feBlend SourceGraphic over goo         (keep crisp dot cores; drop for fully-soft)
color-interpolation-filters = sRGB
filter region x/y/w/h = -50% -50% 200% 200%
```

**The token surface (preserve + extend `--pager-dot-*`):**
- `--pager-dot-active` → the solid ink the goo layer paints (was the active fill).
- `--pager-goo-layer-opacity` (default `0.52`) → the rail translucency, now at the LAYER (replaces
  the per-dot 52% alpha that fought the threshold). Consumers retint/re-alpha here, zero fork.
- `--pager-goo-filter` (default `url(#pager-goo)`) → lets a consumer swap a wetter/crisper filter.
- `--pager-goo-reach` (maps to `stdDeviation`, if exposed as a CSS-driven SVG mount) — OPTIONAL;
  prefer a static filter (Safari). If reach must be tunable, mount the `<filter>` per-rail and set
  `stdDeviation` from a token via a small inline SVG (not a CSS animation).

**What R1 owns vs what this doc owns:**
- R1 owns the **worm geometry** (leading/trailing edges, the spring timing offset that creates the
  stretch-then-contract, the squish/scale, the spring preset). The worm is an **opaque transform-
  driven element** inside the goo layer.
- This doc owns the **merge medium**: the opaque goo layer, the SVG filter values, the
  translucency-at-the-layer fix, the Safari/PRM/perf rules, and the fact that the merge intensity
  **tracks the worm stretch for free** (no second clock).
- R3 owns **which glass-ui primitive drives the worm's spring** (`useLiquidFlex` squish /
  `useTabIndicator` travel / the `--spring-*` preset) — this doc assumes the worm arrives spring-
  driven and opaque.

---

## 6. PRECEDENT IN-REPO (the builder reuses, never re-forks)

- **`src/styles/dock/morph-bridge.css`** — ships the EXACT blur-then-alpha-threshold goo trick to
  merge two dock plates into a teardrop. Reuse its discipline: tight-boxed filter region
  (`contain: layout paint`), `isolation: isolate` to scope the filter, decorative-only
  (`pointer-events:none`, hosts no children that own behaviour), the filter id authored once in a
  hidden SVG and bound via `filter: var(--…-filter)`, every animated axis `f(--scalar)` (no second
  clock), and the PRM drop (`--dock-bridge-opacity: 0` under reduce). The pager goo is this pattern
  applied to N dots + a worm instead of two plates.
- **`src/components/custom/goo-blob/shaders/sdf-body.glsl.ts`** — the `smin` philosophy: a blend-band
  width (`uSmoothK`) + an iso-contour extraction is what the SVG `stdDeviation` + `feColorMatrix`
  threshold approximate in screen-space alpha. Same melt, flatter medium. (Don't import the shader —
  the pager is flat DOM; the goo-blob is the conceptual reference, not a code dependency.)

---

## Sources

- [The Gooey Effect — CSS-Tricks (Lucas Bebber's Goo filter, the canonical recipe)](https://css-tricks.com/gooey-effect/)
- [SVG Metaball Gooey Filter with feColorMatrix — Animation Patterns](https://animationpatterns.art/animations/gooey-blob-metaball-filter/)
- [SVG Metaballs — DEV Community](https://dev.to/antogarand/svg-metaballs-35pj)
- [The infamous Goo filter — Medium (feColorMatrix "18 -7" + "25 -15" threshold values)](https://medium.com/@parth_jansari/the-infamous-goo-filter-9caceb44ebb5)
- [Gooey Navigation with css/svg filters — CodePen (simeydotme)](https://codepen.io/simeydotme/pen/LYLxJqV)
- [Filter Effects — SVG 1.1 spec (feColorMatrix / feGaussianBlur)](https://www.w3.org/TR/SVG11/filters.html)
- [WebKit bug 184601 — CSS filter feColorMatrix on moving elements does not work](https://bugs.webkit.org/show_bug.cgi?id=184601)
- [Cross-browser filters with CSS and SVG — Broken Links (Safari filter support scope)](https://broken-links.com/2013/11/20/cross-browser-filters-css-svg/)
- In-repo: `src/styles/dock/morph-bridge.css` (the shipped goo bridge), `src/components/custom/goo-blob/shaders/sdf-body.glsl.ts` (the smin), `src/components/custom/pager-dots/PagerDots.vue` (the current translucent dot register to enhance).
