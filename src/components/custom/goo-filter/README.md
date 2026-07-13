# goo-filter — `GooFilter`

The library's ONE Safari-safe goo `<filter>` mount (BD.W-MORPH-FIELD-WELD).

`<GooFilter>` is the SINGLE metaball-merge SVG mount the whole library references by id. It
exposes EVERY library metaball id off ONE byte-identical blur→alpha-threshold graph:

| id | scale | consumer |
|---|---|---|
| `glass-goo` | plate | deck slide BARBELL goo-morph (`useGooMorph`) |
| `pager-worm-goo` | dot-worm | PagerDots liquid dot-morph worm (Arm A, σ4/18/−6) |
| `dock-fission-goo` | dock | the fission bridge necks |
| `dock-morph-goo` | teardrop | the V↔H dock teardrop weld |
| `morph-goo` | generic | `useMorphField` default |

The dot-pip PLATE `pager-goo` (σ8/18/−7) RETIRED at BI.W-PAGER-RETIRES — no surviving
consumer once the pager's liquid worm paints the worm-scale `pager-worm-goo` (the G8
live-plate fence).

It is the DRY union of the prior byte-near-identical mounts (`GlassGooFilter`,
`DockGooFilter`, the inline showcase filter) — and the fix for the live
duplicate-`<filter id>` double-mount. A Safari regression can now happen in ONE place; a fix
lands once. Each id is the SAME graph at its own `blur`/`slope`/`offset` (DATA in the
`LIBRARY_IDS` register); a consumer tunes a one-off via the `extra` prop.

## Why it's Safari-first

- REGULAR `filter: url(#…)` graph — NOT `backdrop-filter: url()` (WebKit bug 245510).
- `color-interpolation-filters="sRGB"` — the WebKit-correct neck (bug 136418); Chrome MATCHES
  it so the waist thresholds IDENTICALLY on both engines.
- explicit region `-50%/-50%/200%/200%` — the metaball neck + travelling masses never clip.
- a visually-hidden NON-ZERO (1×1) host — the WebKit zero-sized-filter no-op avoided.
- STATIC `stdDeviation`/`feColorMatrix` literals per id — the ONLY per-frame write is the
  `transform`/`opacity` on the masses passing through; no `var()`-driven re-blur (the
  WebKit-slow class, bug 283156).

## Usage

Mount `<GooFilter />` ONCE at the app/shell root (the demo's `AppShell` does). Every route's
morph — carousel, deck, pager, dock fission, V↔H — reaches its id off that one mount. NEVER
mount it twice (it is a global `<defs>`; a second mount dups every id). A standalone consumer
using a bare `<Carousel>`/deck outside an app shell mounts `<GooFilter/>` once near their own
root.
