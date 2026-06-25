# goo-filter — `GlassGooFilter`

The library's Safari-safe goo `<filter>` mount (BD.W-GOO-BARBELL-NECK).

`<GlassGooFilter>` is the metaball-merge SVG filter the carousel/deck slide BARBELL
goo-morph references by id (`filter: url(#glass-goo)`). It welds the two round bodies + the
concave neck into ONE warm silhouette with a real local-minimum waist. It is the plate-scale
twin of the dot-scale `#pager-goo` (PagerDots) and the dock-scale `#dock-fission-goo`
(DockGooFilter) — three distinct scales of the SAME classic blur→alpha-threshold gooey trick.

The BARBELL defaults are the gooey-shoulder band: `blur 10` (a wider alpha skirt so the
bodies feel each other → the concave neck wells gooier, bounded so it does not fill the
thin throat), `thresholdSlope 15` (the soft-shoulder sweet spot, not the slope-24 mercury
razor), `thresholdOffset -7` (re-solved for slope 15 — crisp at rest, gooey in the throat).

## Why it's Safari-first

- REGULAR `filter: url(#…)` graph — NOT `backdrop-filter: url()` (WebKit bug 245510).
- `color-interpolation-filters="sRGB"` — the WebKit-correct neck (bug 136418).
- explicit region `-50%/-50%/200%/200%` — the metaball neck never clips.
- a visually-hidden NON-ZERO (1×1) host — the WebKit zero-sized-filter no-op avoided.
- STATIC `stdDeviation`/`feColorMatrix` literals — the ONLY per-frame write is the
  `transform`/`opacity` on the plates passing through; no `var()`-driven re-blur (the
  WebKit-slow class, bug 283156).

## Usage

INTERNAL — `<Carousel>` mounts it automatically inside `CarouselContent` (a bare
`<Carousel>` consumer gets the goo bridge with zero wiring). The deck demo mounts it once
at its stage root via the relative import. The `useGooMorph` engine drives the plates
through it. Not a published subpath — both consumers reach it by relative import, and a
`<Carousel>` consumer pulls it in transitively (the `/carousel` chunk).
