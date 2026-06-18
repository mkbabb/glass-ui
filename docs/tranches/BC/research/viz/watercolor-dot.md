# BC viz research — `watercolor-dot`

> Per-viz SOTA re-modernization research (BC iteration 1d). RESEARCH ONLY — no `src/` edits.
> Author: per-viz research agent. Date: 2026-06-18.

## 0. What this is, and what it is NOT (the framing)

`watercolor-dot` is the suite's ONE **decorative MARK** — not a full-canvas viz. It mounts
**ZERO drawing context** (no WebGL, no WebGPU, no Canvas2D): it is a CSS element whose organic
silhouette is a seeded 8-vertex `border-radius` morph and whose wet bleeding edge is an
internalized SVG `<filter>` (`feTurbulence` → `feDisplacementMap`). This is its IDENTITY, and
the suite index records it as **PERMANENTLY OUT** of the WebGPU migration with the reason
stated verbatim:

> **watercolor-dot** — PERMANENTLY out (a CSS/SVG primitive mounting ZERO drawing context). A
> GPU context for one decorative dot is a regression against the ~8-context-per-page cap.
> (`src/components/custom/PROCEDURAL-SUITE.md:72,102`)

So the §E mandate — "WebGPU is present EVERYWHERE … NO FALLBACKS. EVER. No canvas anywhere" —
**does NOT apply to this mark, and applying it would be the regression.** The mandate targets
the canvas-bearing viz (aurora/blob/concentric/dot-flow-field/constellation). watercolor-dot
satisfies "no canvas" trivially — it already has none, and it must NOT acquire a GPU context.
The BC ask for THIS member is narrow and explicit in the assignment:

> this is a MARK not a full-canvas viz — keep it lightweight; the focus is **Safari-correctness**
> + the **ghost dashed-outline** ask.

This doc is therefore Safari-first + ghost-first, not a WebGPU port. (The §E mandate text is
read from `docs/tranches/BC/audit/USER-DEFECTS.md:50-51`; the permanently-out verdict from
`src/components/custom/PROCEDURAL-SUITE.md:72,102`.)

---

## 1. The defects (verbatim) + the root causes

### 1.1 The ghost is the WRONG affordance — `USER-DEFECTS.md §C`

> Ghost items must have a **DASHED outline**.

This is the headline. The CURRENT `ghost` variant
(`WatercolorDot.vue:182-202`) is a **SOLID** stroke (`border: 2px solid color-mix(...)`) over a
low-alpha fill, and the source + the `proof:emission` W5 gate explicitly FORBID a dashed
border:

```ts
// scripts/proof-emission.mjs:302-308 — the gate REDs a dashed border on the swatch root.
const isDashedRect = /border-style\s*:\s*dashed|border\s*:\s*[^;]*dashed/.test(watercolorStripped);
```

The source comment (`WatercolorDot.vue:27,178`) justifies the solid stroke as "NOT a CSS dashed
rectangle." **That reasoning conflated two different things and is now wrong against the user
ask.** The user did NOT ask for a dashed *rectangle*; they asked for a **dashed outline** — i.e.
a dashed stroke that FOLLOWS the seeded blob silhouette. The reconciliation (the core finding,
§2.2) is: render the irregular blob outline as a dashed stroke ALONG the organic shape — a
dashed silhouette, not a dashed box. The current gate's intent ("not a dashed box") survives;
its IMPLEMENTATION (forbid *all* dashes) is too broad and must be narrowed to "not a dashed
**rectangular** border" while AFFIRMING a dashed **blob-following** stroke.

### 1.2 Safari flashes the whole screen — `USER-DEFECTS.md §H`

> **NONE of this works on Safari.** None of the liquid morphing works on Safari at all — it
> **rapidly FLASHES the screen.**

This §H complaint is cross-cutting (it covers the dock/morph too), but it bites THIS mark
directly through three Safari/WebKit SVG-filter realities:

- **Per-frame filter re-rasterization.** When `animate` is true, `useWatercolorBlob` runs an
  rAF loop mutating the inline `border-radius` EVERY frame
  (`useWatercolorBlob.ts:110`), while a `filter: url(#…)` is applied to the SAME element
  (`WatercolorDot.vue:161`). `border-radius` is a **paint** property (it is "vector clipping
  paths on the content and background image layers"
  — [CSS-Tricks, Animating Border](https://css-tricks.com/animating-border/)), so each frame
  re-paints the element, which forces the SVG `<filter>` graph (`feTurbulence` + 6 octaves +
  `feDisplacementMap`) to **re-rasterize every frame**. Safari "does alright as long as you
  stick to CSS's filter shorthands and not SVG's `<filter>`"
  ([O'Reilly, Planning for Performance](https://oreillymedia.github.io/Using_SVG/extras/ch19-performance.html));
  with an SVG `<filter>` re-rastering on every frame, "in severe cases … Safari might not render
  such elements at all" and "various CSS transitions, transforms and animations have major
  rendering problems where elements are loaded multiple times and flicker"
  ([SVGator, Fix SVG Animation Lag in Safari](https://www.svgator.com/help/animation-and-interactivity/how-to-fix-svg-animation-lag-in-safari)).
  This is the §H flash for this mark. The HandMark sibling already learned this lesson and
  records it verbatim: its filter is "**STATIC + SEEDED. It rasters ONCE per (mount, resize,
  scheme flip) and is cached** … it NEVER animates … under the filter (which would re-raster the
  graph per frame)" (`src/components/custom/handmark/texture.ts:24-27`). **WatercolorDot
  violates the very idiom HandMark cites as the WatercolorDot idiom.**

- **Safari ignores `color-interpolation-filters="linearRGB"`.** Safari uses **sRGB** for SVG
  filter math while Chrome/Firefox honor `linearRGB` — a known WebKit bug
  ([Master.dev / FrontendMasters SVG Filters Guide](https://frontendmasters.com/blog/svg-filters-guide-getting-started-with-the-basics/);
  surfaced in the search corpus). The current filter sets
  `color-interpolation-filters="linearRGB"` (`WatercolorDot.vue:134`) precisely to get the
  smooth-edge AA the AZ.W-BLOB-PAGE device-px fix introduced — but **Safari silently renders it
  in sRGB**, so the wet edge bands/quantizes on Safari where it is smooth on Chrome. The
  cross-engine appearance diverges. This is the "looks different / broken on Safari" axis of §H.

- **The `feDisplacementMap` reference-filter tiling-gap bug (recently fixed).** WebKit only just
  fixed "tiling gaps in CSS reference filters using `<feDisplacementMap>`" in **Safari 26.4
  (released 2026-03-24)** ([WebKit — Safari 26.4 features](https://webkit.org/blog/17862/webkit-features-for-safari-26-4/),
  bug 135448018; also Safari Technology Preview 235, Jan 2026). Pre-26.4 Safari could show
  filter-region tiling seams in the wet bleed. We must not rely on the fix being present on
  every visitor's Safari — the `stitchTiles="stitch"` + the widened `-15%/130%` filter region
  (already present, `WatercolorDot.vue:130-133,141`) are the cross-version mitigations, and they
  stay.

### 1.3 Lesser items (folded in)

- **No configurator surface.** The mark exposes props (`color`/`variant`/`animate`/`tag`/
  `cycleDuration`/`range`/`seed`) but the demo (`blob.vue:581-720`) drives only `color`+`seed`.
  The BC standard wants a tunable demo surface. For a MARK (not a full viz) this is a *light*
  configurator (color/seed/spread/edge), NOT the full studio the canvas viz get (§4).
- **The animated `border-radius` CSS transition is disabled in animate mode** (`watercolor-animated`
  drops the `border-radius` transition, `WatercolorDot.vue:206-211`) — correct for smoothness,
  but it is exactly the per-frame paint that triggers §1.2.
- **`isolation` is absent.** The Safari `border-radius` + transform flicker is fixed by
  `isolation: isolate` ([Steven Woodson / Apple Dev Forums thread 705172](https://developer.apple.com/forums/thread/705172)).
  Note the tension with HandMark's blend warning (§2.4) — here there is no `multiply` blend to
  wall, so `isolation: isolate` is a safe Safari fix.

---

## 2. The SOTA technique (cited)

### 2.1 The wet edge — `feTurbulence` → `feDisplacementMap` (KEEP; it IS the SOTA)

The canonical web technique for an organic wet/rough/watercolor edge is exactly what the mark
already does: synthesize Perlin noise with `<feTurbulence>` and use it to spatially displace the
source graphic with `<feDisplacementMap>`. This is the documented, canonical approach
([MDN feTurbulence](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feTurbulence);
[MDN feDisplacementMap](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feDisplacementMap);
[Codrops — SVG Filter Effects: Creating Texture with feTurbulence](https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/);
[bengammon — Rough CSS borders with SVG filters](https://bengammon.co.uk/rough-css-borders-with-svg-filters/)).
The parameter guidance from the Codrops reference, applied to the current settings:

| param | current value | Codrops/SOTA guidance | verdict |
|---|---|---|---|
| `type` | `fractalNoise` | `fractalNoise` = smoother/cloudier (gas); `turbulence` = ripply (liquid) | KEEP `fractalNoise` for a soft wet edge (a hard `turbulence` would be too ripply for a calm swatch). |
| `baseFrequency` | `0.05` | "0.02–0.2 … useful starting points"; lower = larger pattern | KEEP / configurator-expose as **edge spread**. |
| `numOctaves` | `6` | "beyond `numOctaves=5`, additional octaves … practically imperceptible" | Drop to `5` (octave 6 is imperceptible per the reference, and is pure cost — a Safari raster saving). |
| `seed` | `2` (constant!) | seed determines where ripple lines form | **BUG-ADJACENT:** the filter seed is HARDCODED `2`, so every dot's wet edge displaces identically. Tie it to the per-instance `seed`+`color` PRNG so each dot's wet edge is unique (the mark's whole point is per-color uniqueness). See §2.3. |
| `stitchTiles` | `stitch` | smooths discontinuities at tile borders → seamless | KEEP (the cross-Safari tiling-seam mitigation, §1.2). |
| `scale` (feDisplacementMap) | `1.3` | controls distortion intensity | KEEP / configurator-expose as **edge wetness**. |
| `color-interpolation-filters` | `linearRGB` | Safari ignores it (sRGB) | See §2.5 — accept sRGB as the floor and drop the assumption, or keep `linearRGB` knowing it is a Chrome/FF-only nicety. |

So the wet-edge SOTA is **unchanged in kind** — the displacement filter IS the right primitive.
The fixes are (a) make the filter seed per-instance, (b) make it truly static under animation
(§2.4), (c) be honest about Safari sRGB (§2.5).

### 2.2 The ghost — a DASHED stroke FOLLOWING the blob silhouette (the core finding)

The user wants ghost items to have a **dashed outline** (`§C`). The wrong reading (a dashed
*rectangle*, `border: dashed` on the box) is correctly forbidden by the gate. The RIGHT reading
is a dashed stroke that FOLLOWS the seeded blob's organic silhouette. There are two viable web
techniques; pick (b).

**(a) `border-style: dashed` on the `border-radius`-morphed box.** A dashed CSS border DOES
follow `border-radius` corners. BUT: an 8-value asymmetric `border-radius` produces a smooth
super-ellipse-ish blob, and a CSS dashed border on a heavily-rounded box renders **uneven dash
spacing** (the dashes bunch on the tight-radius arcs and stretch on the flat runs — CSS dash
distribution along a rounded rect is not arc-length-uniform), AND it would trip the current gate
regex. Not chosen.

**(b) An SVG `<path>`/`<ellipse>` dashed stroke at the silhouette (PICK THIS).** Render the
blob outline as an SVG stroke with `stroke-dasharray`. `stroke-dasharray` is the canonical SVG
dash mechanism: "the first number specif[ies] a distance for the filled area, and the second a
distance for the unfilled area"; it applies to `<path>`, `<ellipse>`, `<polygon>` &c.
([MDN stroke-dasharray](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/stroke-dasharray);
[CSS-Tricks almanac stroke-dasharray](https://css-tricks.com/almanac/properties/s/stroke-dasharray/)).
Designers use it precisely "to convey … a hand-drawn look" — exactly the ghost/placeholder
affordance. The dashes are arc-length-uniform along the stroked path, so a dashed ELLIPSE or a
dashed blob `<path>` reads as a clean, evenly-spaced dashed outline that traces the organic
silhouette — the "dashed outline" the user asked for, that is NOT a dashed rectangle.

Two implementation choices for the silhouette path, in increasing fidelity:

1. **Dashed `<ellipse>` carrying the SAME wet `<filter>`.** Cheapest: a `vector-effect:
   non-scaling-stroke` dashed ellipse stroke, displaced by the SAME `feDisplacementMap` filter
   the solid dot uses. The displacement wobbles the dashed ellipse into the organic blob outline
   — so the ghost is literally the solid dot's silhouette, drawn as dashes, distorted by the same
   wet edge. The `border-radius` morph is the SOLID register's silhouette source; the ghost reads
   the SAME seeded distortion via the SAME filter. This satisfies the gate's "ghost matches the
   solid seed's silhouette" intent while delivering the dashed outline.
2. **Dashed blob `<path>` from the seeded radii (highest fidelity).** Reconstruct the exact
   8-vertex super-ellipse path the `border-radius` produces and stroke IT with the dash array.
   Heavier (a path generator) and only marginally better than (1)+filter; booked, not the
   default.

**The PRM + reduced-transparency note:** the dash stroke is static (no animation), so it is
PRM-neutral. Under `prefers-reduced-transparency` the low-alpha fill firms up (mirrors the glass
brackets) — the dashed outline still reads.

### 2.3 The per-instance filter seed (the uniqueness bug)

The mark's identity is "the same color reproduces the same shape" and "a grid of distinct
colored dots." The `border-radius` IS seeded per color
(`useWatercolorBlob.ts:46`), but the wet-edge **filter** is NOT — `seed="2"` is hardcoded on
`<feTurbulence>` (`WatercolorDot.vue:140`). So 12 dots share ONE wet-edge displacement. The fix
is to derive the `feTurbulence seed` from the SAME `hashString(color + seed)` the shape PRNG
uses — one seed leaf, the house identity (the `src/utils/prng.ts` single-source, AV.W14). Then
each dot's wet edge is uniquely displaced, coherent with its silhouette. This is the
HandMark grain-sub-seed precedent: "one top seed re-rolls the grain coherently with the
centerline wobble" (`handmark/texture.ts:38-40`).

### 2.4 Make the animation Safari-safe (the §H fix — the load-bearing one)

The §H flash is the per-frame `border-radius` paint re-rastering the SVG filter (§1.2). The SOTA
fix, per the HandMark idiom + the Safari guidance, is **decouple the morph from the filter**:

- **Animate ONLY compositor-safe channels under the filter.** "Animate only GPU-accelerated
  properties like `transform` … and `opacity`, and avoid … properties that trigger layout or
  paint recalculations" ([search corpus, hardware-accelerated-animations / O'Reilly]). A
  `border-radius` morph is a paint. The SOTA approach: keep the wet `<filter>` STATIC (rasterized
  once, cached — the HandMark idiom) and express the organic LIVENESS via a `transform` (a
  sub-perceptual seeded `scale`/`skew`/`rotate` wobble) that the compositor handles WITHOUT
  re-rastering the filter graph. This is "static filter + compositor transform" — the same split
  the whole liquid-glass band uses (compositor-only, `proof:no-layout-animation`).
- **OR, if the `border-radius` morph is kept** (it is the mark's signature), then **the filter
  must NOT be applied to the morphing element directly** during animation — separate the layers:
  the morphing fill on one element, the wet `<filter>` on a wrapping/sibling that does not
  re-layout. The cleanest is the static-filter + transform-wobble above.
- **`isolation: isolate`** on the swatch root fixes the residual Safari `border-radius`+transform
  flicker ([Apple Dev Forums 705172](https://developer.apple.com/forums/thread/705172); Steven
  Woodson). Safe here (no blend to wall, unlike HandMark's highlighter `multiply`).
- **`prefers-reduced-motion: reduce`** → the morph drops to a single static frame (the suite
  PRM discipline; here it just means `animate` is inert under reduce — the dot is a still blob).
  The current default is `animate: false` (static), so most mounts are already safe; the demo
  grid sets `animate` (`blob.vue:586,690`) which is the live-Safari risk surface.

### 2.5 Honest cross-engine color (the Safari sRGB reality)

Because Safari renders SVG filters in **sRGB** regardless of `color-interpolation-filters`
(§1.2, known WebKit bug), the AZ.W-BLOB-PAGE `linearRGB` smoothing is a Chrome/Firefox-only
nicety. Two honest options: (a) KEEP `linearRGB` (it costs nothing and helps the engines that
honor it; Safari falls to sRGB, which is acceptable for a soft decorative edge — the
displacement is small `scale=1.3`), or (b) drop the assumption from the code comment so a future
reader does not trust it cross-engine. **Recommendation: keep `linearRGB`, fix the COMMENT** to
record that Safari renders sRGB (a known WebKit limitation) — never silently assume smooth AA on
Safari. The finer-noise `numOctaves` + small `scale` already keep the sRGB edge acceptable.

---

## 3. WebGPU / WebGL2 / canvas — explicitly N/A (the honest verdict)

This mark mounts **no drawing context and must not acquire one.** The suite index records it
**PERMANENTLY OUT** of migration, with the reason (a GPU context for one decorative dot is a
regression against the per-page context cap — `PROCEDURAL-SUITE.md:72,102`). The §E "WebGPU
everywhere / no canvas anywhere" mandate is *satisfied by construction* (there is no canvas to
remove, no GPU context to add). The relevant Baseline facts, recorded for completeness:

- **`feDisplacementMap` is effectively Baseline** — supported since **Safari 6 / iOS Safari 6 /
  Chrome 5 / Firefox 3 / Edge 12**, **96.7% global** support
  ([caniuse — SVG feDisplacementMap](https://caniuse.com/mdn-svg_elements_fedisplacementmap)). So
  the mark's primitive works on every relevant engine including all current Safari.
- **The Safari caveat is rendering FIDELITY, not support** — (a) sRGB filter math (§2.5), (b) the
  pre-26.4 reference-filter tiling-gap bug, fixed in Safari 26.4 / 2026-03-24
  ([WebKit Safari 26.4](https://webkit.org/blog/17862/webkit-features-for-safari-26-4/)), (c) the
  per-frame re-raster flicker on animated filtered elements (§1.2). All three are mitigated by
  §2 (static filter, `stitch`, widened region, `isolation`, transform-wobble), not by a context.
- **No WebGPU/WGSL/Canvas2D code in this member** — the assignment's WGSL-kernel / WebGL2-fallback
  / dual-substrate sections are **N/A by design**. There is no kernel, no fallback, no parity
  pair. (This is the deliberate counterexample in the suite: the member that documents WHY it is
  not a context, not a port.)

---

## 4. The configurator (a LIGHT mark configurator — color / seed / spread / edge)

A MARK gets a *light* configurator, not the full studio the canvas viz get (the assignment:
"keep it lightweight"). The §E "controls on the RIGHT on desktop, rounded panel" idiom applies
to the demo PAGE chrome, but for a mark the tunable surface is small. The configurator axes
(driving the existing props + the new ones from §2):

| axis | control | maps to | range / note |
|---|---|---|---|
| **color** | `<ColorSwatch>` (BA.W-CONFIG-CHASSIS) | `color` prop | any CSS color; warm-cream identity default, NOT a teal-on-navy literal |
| **seed** | text input (Fira-Code) | `seed` prop | the per-instance shape + (NEW) wet-edge seed; same color+seed → same dot |
| **variant** | SegmentedTabs (pill) | `variant` | `solid` · `ghost` (the dashed-outline register) |
| **edge spread** (NEW) | slider | `feTurbulence baseFrequency` | 0.02–0.2 (Codrops band) — larger pattern ↔ finer grain |
| **edge wetness** (NEW) | slider | `feDisplacementMap scale` | 0.5–3 — how far the wet edge bleeds |
| **shape range** | two sliders | `range` `[lo,hi]` | the border-radius morph spread (20–80 default); tighter → rounder |
| **animate** | switch | `animate` | OFF default (Safari-safe static); ON runs the (now transform-wobble) liveness |
| **cycle duration** | slider | `cycleDuration` | 2000–8000 ms (only meaningful when animate ON) |
| **dash pattern** (NEW, ghost-only) | two sliders | ghost `stroke-dasharray` | dash / gap length — the dashed-outline tuning |

The configurator is a `<Configurator>` on the RIGHT in a rounded panel; the live dot fills a
preview card. `cloneMode: "commit-on-write"` (a single mark; a preset switch is a clean reset).
Light surface — no WCAG pause control (the static default has no continuous motion; the `animate`
toggle IS the user-reachable motion control, and it is OFF by default).

---

## 5. The comprehensive demo suite (stories / states)

The §C/§E standard for the page: one giant audacious hero header that shrinks on scroll, the
subpath shown explicitly (`@mkbabb/glass-ui/watercolor-dot`) in a Fira-Code code block, the body
in ONE card, sections delimited, controls on the right. The mark lives in the substrates/blob
page today (`blob.vue:675-720` as the "zero-GL register" + "ghost register"); BC keeps it as the
supporting register there (the ≥2-mount keep) AND/OR promotes its own light story. The states:

- **Solid grid** — a grid of seeded colored dots, EACH wet edge now uniquely displaced (the
  §2.3 per-instance-seed fix made visible: 12 dots, 12 distinct wet edges, not 12 clones).
  Warm-cream identity palette default.
- **Ghost grid — the DASHED OUTLINE** (the headline state) — the SAME seeds rendered as the
  dashed blob-silhouette stroke (§2.2). Paired solid-LEFT / ghost-RIGHT per seed so the
  silhouette match reads at a glance (the existing `watercolor-ghost-pair` layout,
  `blob.vue:704-720`, kept — now showing a DASHED stroke, not a solid one).
- **Solid ↔ ghost toggle** — one dot, a `<Switch>`/SegmentedTabs flips `variant`, showing the
  same seed's silhouette filled vs dashed-outlined.
- **Animated (Safari-safe)** — `animate: true`, the transform-wobble liveness (§2.4) — proves the
  mark breathes WITHOUT the per-frame filter re-raster flash. (This is the state that must be
  verified on real Safari.)
- **Edge tour** — a row sweeping `baseFrequency` (spread) and `scale` (wetness) so the wet-edge
  configurator axes read.
- **Empty-palette placeholder** — the canonical ghost use: an empty palette slot rendered as a
  dashed ghost dot (the "add a color here" affordance) beside filled solid dots.
- **Reduced-motion** — PRM on → `animate` inert, the dots are still blobs (legible at rest). The
  filter is static either way.
- **As a button** — `tag="button"` interactive swatch (a palette picker dot), focus-ring intact.
- **Configurator-driven** — every axis from §4 wired live, controls on the right, the live dot
  in the preview card.

---

## 6. The cursor / touch interaction model (minimal — it is a MARK)

A decorative mark does NOT consume the heavy `usePointerVelocityField` (that is for the
canvas viz). Its interaction is the existing CSS four-state + a light morph nudge:

- **Hover** — `transform: scale(1.06)` + a `brightness(1.05)` filter add (existing,
  `WatercolorDot.vue:213-220`); on `animate` mode, a `nudge()` retargets all 8 vertices for a
  quick organic jiggle (`useWatercolorBlob.ts:118-129`). KEEP — but the nudge, like the morph,
  must ride the transform-wobble (or a one-shot CSS transition) so it does NOT re-raster the
  filter per frame on Safari (§2.4). A static-mode hover already morphs `border-radius` via a
  600ms CSS transition (`WatercolorDot.vue:169`) — a one-shot transition is far less Safari-risky
  than a continuous rAF, but on a filtered element even a transition repaints; gating the hover
  morph onto a `transform`-based perturbation is the Safari-safe form.
- **Active** — `transform: scale(0.97)` press (existing, `WatercolorDot.vue:222-224`). KEEP.
- **Touch** — identical (pointer-event-driven hover/active; `touch-action` default is fine — no
  drag gesture on a decorative dot). A `button`-tagged swatch gets the native tap.
- **No velocity / acceleration / burst** — those are the canvas-viz pointer-physics model
  (`usePointerVelocityField`), explicitly NOT consumed here (a mark feeding a GPU uniform buffer
  would be the over-engineering the suite forbids for this member).
- **PRM** — hover scale is a transform (PRM keeps it minimal); the morph/nudge drops under reduce.

---

## 7. Discipline checklist (the binding fences)

- **NO drawing context** — the mark stays CSS/SVG-only; it does NOT acquire WebGL/WebGPU/Canvas2D
  (the `PROCEDURAL-SUITE.md:72,102` permanently-out verdict is binding; a GPU context here is the
  regression).
- **ONE seed leaf** — the wet-edge filter seed derives from the SAME `hashString(color+seed)`
  via `src/utils/prng.ts` (AV.W14 single-source); the mark imports ZERO foreign PRNG (the
  HandMark seed-reconcile precedent).
- **Warm-cream identity default + presets-in-consumers** — the demo palette default is the
  warm-cream identity; named palettes (and ANY teal-on-navy) live in the demo/consumer, never a
  library token (§E "REMOVE the teal-on-navy reference entirely"; the dot takes `color` as a
  prop, so it never bakes a hue — compliant by construction).
- **Static filter, compositor-only liveness** — the SVG `<filter>` rasterizes once + caches (the
  HandMark idiom, `handmark/texture.ts:24-27`); animation rides a `transform` wobble, never a
  per-frame `border-radius` paint under the filter (the §H Safari flash fix).
- **The gate is NARROWED, not broken** — `proof:emission` W5 currently REDs ALL `border`/`dashed`
  on the swatch (`proof-emission.mjs:302-308`); it must be re-pointed to RED a dashed
  **rectangular box border** while AFFIRMING a dashed **blob-silhouette stroke** (an SVG
  `stroke-dasharray` on the displaced outline). The "matches the solid seed's silhouette" assert
  stays. The π readback (`tests-visual/emission.spec.ts`, the seeded-ghost-silhouette-match arm)
  re-anchors onto the dashed stroke.
- **keyframes.js for choreography** — any enter/reveal of the mark (e.g. a `vReveal` pop-in on a
  palette grid) rides the ONE keyframes.js/motion clock the band uses; the morph wobble is a
  seeded compositor transform, not a second timeline.
- **Real cited technique** — `feTurbulence`/`feDisplacementMap` (MDN/Codrops), `stroke-dasharray`
  blob outline (MDN/CSS-Tricks), the Safari sRGB-filter + per-frame-raster + tiling-gap caveats
  (WebKit/SVGator/Apple-Dev-Forums). No arbitrary effect.
- **No CLAUDE.md / src edit here** — research only.

---

## 8. Summary of the change (what the implementation wave does)

1. **Ghost → DASHED outline** (the headline): re-render the `ghost` variant as a dashed stroke
   FOLLOWING the seeded blob silhouette — an SVG `stroke-dasharray` ellipse/path displaced by the
   SAME wet `<filter>` (so it matches the solid seed's outline), NOT a solid stroke, NOT a dashed
   rectangle. Narrow `proof:emission` W5 to affirm the blob-following dash while still REDing a
   dashed rectangular box border.
2. **Per-instance filter seed**: derive `feTurbulence seed` from `hashString(color+seed)` so each
   dot's wet edge is unique (the mark's whole point), via the ONE house PRNG leaf.
3. **Safari-safe animation** (the §H flash fix): keep the SVG `<filter>` STATIC + cached (the
   HandMark idiom); express liveness via a seeded compositor `transform` wobble, never a
   per-frame `border-radius` paint under the filter; add `isolation: isolate` for the residual
   Safari flicker; PRM drops the wobble.
4. **Honest Safari color**: record that Safari renders SVG filters in sRGB (a known WebKit
   limitation) so `linearRGB` is a Chrome/FF-only smoothing nicety; keep `linearRGB`, fix the
   comment; drop `numOctaves` 6→5 (octave 6 is imperceptible + pure raster cost).
5. **Light configurator** (§4): color / seed / variant / edge-spread / edge-wetness / shape-range /
   animate / dash-pattern — a `<Configurator>` on the RIGHT in a rounded panel, the live dot in a
   preview card; NO heavy studio, NO WCAG pause (static default).
6. **Demo suite** (§5): solid grid (now per-instance-unique edges) · ghost DASHED grid (paired
   solid/ghost per seed) · solid↔ghost toggle · Safari-safe animated · edge tour · empty-slot
   placeholder · reduced-motion · button swatch · configurator-driven.
7. **NO context** — the mark stays SVG/CSS; no WebGPU port (the permanently-out verdict holds).

---

## Sources

- [MDN — `<feTurbulence>` (Perlin turbulence; type/baseFrequency/numOctaves/seed/stitchTiles)](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feTurbulence)
- [MDN — `<feDisplacementMap>` (spatial displacement by a second input's color channels)](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feDisplacementMap)
- [Codrops — SVG Filter Effects: Creating Texture with feTurbulence (parameter guidance: octaves≤5, baseFrequency 0.02–0.2, stitchTiles=stitch)](https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/)
- [bengammon — Rough CSS borders with SVG filters feTurbulence + feDisplacementMap (the organic-edge idiom)](https://bengammon.co.uk/rough-css-borders-with-svg-filters/)
- [MDN — `stroke-dasharray` (the dashed-outline mechanism; applies to path/ellipse/polygon)](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/stroke-dasharray)
- [CSS-Tricks — stroke-dasharray almanac (dash/gap pattern; hand-drawn look)](https://css-tricks.com/almanac/properties/s/stroke-dasharray/)
- [CSS-Tricks — Animating Border (border-radius = vector clipping on content/bg layers → paint)](https://css-tricks.com/animating-border/)
- [caniuse — SVG feDisplacementMap (Safari 6+, iOS 6+, 96.7% global — effectively Baseline)](https://caniuse.com/mdn-svg_elements_fedisplacementmap)
- [WebKit — Safari 26.4 features (fixed tiling gaps in CSS reference filters using feDisplacementMap, bug 135448018, released 2026-03-24)](https://webkit.org/blog/17862/webkit-features-for-safari-26-4/)
- [SVGator — How to Fix SVG Animation Lag in Safari (SVG `<filter>` re-rasterizes; Safari may not render filtered elements at all; remove filters during animation)](https://www.svgator.com/help/animation-and-interactivity/how-to-fix-svg-animation-lag-in-safari)
- [O'Reilly — Planning for Performance, Using SVG (Safari ok with CSS filter shorthands, NOT SVG `<filter>`; pre-rasterize transforms; avoid animating filters)](https://oreillymedia.github.io/Using_SVG/extras/ch19-performance.html)
- [FrontendMasters / Master.dev — SVG Filters Guide (Safari uses sRGB for SVG filters while Chrome/FF use linearRGB — a WebKit bug)](https://frontendmasters.com/blog/svg-filters-guide-getting-started-with-the-basics/)
- [Apple Developer Forums 705172 + Steven Woodson — `isolation: isolate` fixes Safari border-radius/transform flicker](https://developer.apple.com/forums/thread/705172)
- file:src/components/custom/watercolor-dot/WatercolorDot.vue:27,128-151,161,182-202 (the current ghost = SOLID stroke; the static filter applied to the morphing element; seed="2" hardcoded)
- file:src/components/custom/watercolor-dot/useWatercolorBlob.ts:46,110,118-129 (the seeded border-radius PRNG + the per-frame rAF border-radius write + nudge)
- file:src/components/custom/watercolor-dot/prng.ts:7 (the shared `src/utils/prng.ts` single-source leaf)
- file:src/components/custom/handmark/texture.ts:24-27,38-40 (the STATIC+SEEDED filter idiom + the seed-reconcile precedent — the idiom WatercolorDot violates in animate mode)
- file:src/components/custom/PROCEDURAL-SUITE.md:72,102 (watercolor-dot PERMANENTLY OUT of WebGPU migration — a CSS/SVG mark with ZERO drawing context)
- file:scripts/proof-emission.mjs:286-321 (the W5 ghost gate: REDs `border-style: dashed` — must narrow to RED a dashed RECTANGLE while affirming a dashed blob-silhouette stroke)
- file:demo/stories/substrates/blob.vue:581-720 (the current solid + ghost demo mounts on the blob page)
- file:docs/tranches/BC/audit/USER-DEFECTS.md:35,50-51,75 (§C ghost-dashed-outline · §E WebGPU-everywhere/no-canvas · §H Safari-flashes)
