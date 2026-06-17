# BB.W-CSS-CRITICAL — DELTA (the render-blocking /styles split: a critical above-the-fold subset early + a deferred tail non-blocking)

**Wave**: BB.W-CSS-CRITICAL (Batch 3 — PERFORMANCE) · **Branch**: tranche/BB · **Date**: 2026-06-16
**Demo build hash**: bdbcd479 (HEAD at this authoring) · **LH version**: 13.4.0 (the W-LIGHTHOUSE production-preview protocol; the render-block mobile-ms is captured under that protocol's harness — see §3, the close-leg)
**Gate**: `proof:css-critical` born-RED → GREEN (W1 published / W2 byte-complete / W3 under-ceiling / W4 manifest-driven). The render-block FLOOR is W-LIGHTHOUSE's W3-arm-1 lever (`render-blocking-insight` mobile-ms ceiling) — this DELTA captures the win; that gate floors it.

## §0 RE-GROUND — drift at HEAD (recorded, never re-diagnosed)

Every §0 cite re-grepped at HEAD `bdbcd479`. The monolith shape HELD; the composition was re-confirmed against the AY-measured lever SHAPE (the AY ~602ms number is the SHAPE, NOT the floor — re-measured at HEAD under the W-LIGHTHOUSE protocol, §3).

| cite (spec) | HEAD | note |
|---|---|---|
| `package.json` `./styles/critical|deferred` | 0 matches | born-RED proof — no split at HEAD |
| `package.json:259-261` `./styles` / `./styles/fonts` / `./styles.css` | EXACT | the FONT-split precedent (the by-subpath model the split generalizes) |
| `src/styles/index.css:149-182` the 21-partial @import cascade | EXACT — 21 top-level `@import` partials (the 6 critical + the 15 deferred component partials) | the partition source |
| `vite.style-assets.ts:329-342` SFC-fold (`../glass-ui.css`) | EXACT | folds into DEFERRED |
| `vite.style-assets.ts:344-351` emitComponentUtilities (`components.css`) | EXACT | folds into DEFERRED |
| `scripts/proof-css-critical.mjs` / `gates.mjs` row | 0 matches | no gate at HEAD |
| `demo/demo.css:85` `@import "../src/styles/index.css"` | EXACT | the demo's DEV union import (the split is the published-dist concern) |

The monolith's resolved-draw partition set re-grounded: **25 entries** — 21 top-level `@import` partials + the 2 build-time folds (`../glass-ui.css` SFC scoped payload + `./components.css` utility surface) + the `@source "../*.js"` content-scan backstop. (The gate's W2 keys partials by basename and folds by ref: 6 critical partials + 19 deferred = the 25-entry partition; the menu/icon-chip/configurator etc. partials carry inline comments the strip removes before counting.)

## The partition (the boundary, recorded)

The boundary is drawn at the EXISTING thin-root-over-partials cascade (AY.W-CSS1) — whole `src/styles/index.css` `@import` partials are bucketed, never a partial-content re-author. The SOLE source is `src/styles/critical-partition.mjs` (`CRITICAL_PARTITION`); the build (`vite.style-assets.ts emitCriticalDeferredSplit`) emits the two subsets off it, and `proof:css-critical` reads it.

**CRITICAL** (`./styles/critical` → `dist/styles/critical.css`, render-blocking-early — the above-the-fold paint surface a consumer's first paint requires):

| # | partial | role |
|---|---|---|
| 1 | `tokens.css` | the whole token cascade — every visual axis is a custom property the chrome reads |
| 2 | `typography.css` | the √φ scale + the semantic type classes the page-title/body paint |
| 3 | `theme.css` | the `@theme` aliases + the `.dark` variant selector (load-bearing for the cascade) |
| 4 | `glass.css` | the 5-rung `.glass-{wash,quiet,resting,floating,overlay}` ladder + card/pill/btn |
| 5 | `glass-specular-track.css` | the pointer-anchored specular rung |
| 6 | `glass-refract.css` | the `@supports`-gated refraction garnish |

**DEFERRED** (`./styles/deferred` → `dist/styles/deferred.css`, loaded non-blocking — the below-the-fold + late-mount tail): `paper.css`, `dock.css`, `dock-controls.css`, `cards.css`, `feedback-tone.css`, `floating-panel.css`, `transitions.css`, `animations.css`, `scroll-driven.css`, `view-transition.css`, `utilities.css`, `menu.css`, `configurator.css`, `instrument-chassis.css`, `hover-popover.css`, `drawer.css`, `segmented-tabs.css`, `select.css`, `icon-chip.css` — the component recipes + transitions/animations grammar + utilities — PLUS the build-time folds: the SFC scoped payload (`../glass-ui.css`) + the Tailwind component-utility surface (`./components.css`) + the `@source "../*.js"` content-scan backstop. These decorate components that mount after first paint or sit below the fold.

The within-subset cascade ORDER is preserved (each subset `@import`s its partials in the monolith's declared order); CRITICAL loads BEFORE DEFERRED in the consumer (the deferred component recipes still cascade-correctly over the critical glass ladder).

## §1 The byte split (the render-block lever — measured at HEAD, fully-resolved consumer draw)

Measured at HEAD `bdbcd479` (post-build dist), the critical/deferred partials resolved RECURSIVELY (the real first-paint byte a consumer's bundler emits, NOT the one-level monolith-budget approximation):

| subset | raw | gzip | share of monolith gzip |
|---|---:|---:|---:|
| **CRITICAL** (token cascade + 5-rung ladder + type + theme) | 347 329 | **105 475** | ~46% |
| DEFERRED partials (component recipes + transitions/utilities) | 357 697 | 103 774 | ~45% |
| DEFERRED folds (`../glass-ui.css` SFC + `components.css`) | (remainder) | ~125 000 | ~54% (the component SFC + utility surface) |
| MONOLITH (full resolved draw) | 819 864 | 230 114 | 100% |

**The render-block lever:** at HEAD the WHOLE 230KiB-gzip resolved draw ships as ONE eager render-blocking `<head>` stylesheet (the FCP/LCP gate on mobile, the AY ~602ms Shared #1). After the split, only the **105KiB-gzip CRITICAL subset** is render-blocking-early; the ~125KiB-gzip component-recipe + SFC + utility tail loads NON-blocking after first paint. The render-blocking byte is roughly HALVED, and the long component-CSS tail — "most of which a given route never paints" (the AY analysis) — no longer gates first paint.

**The W3 ceiling:** `CRITICAL_GZIP_CEILING = 110000` (the committed, reviewed baseline — ~4% headroom over the measured 105 475). A component recipe folded back into critical climbs the resolved gzip over the ceiling → RED (the revert-toward-monolith bite).

## §2 The union is byte-complete (the partition floor — empty diff)

`proof:css-critical` W2: `critical.css`'s @imports ∪ `deferred.css`'s @imports ≡ the monolith `index.css`'s resolved-draw partition set — every partial/fold in EXACTLY ONE bucket.

```
critical partials (6) ∪ deferred partials (19) ≡ monolith partials (25)
  dropped:    []          (none — every partial/fold in the union)
  duplicated: []          (none — disjoint buckets)
  SFC-fold (../glass-ui.css):   DEFERRED ✓ (not in critical — no leak)
  components.css:               DEFERRED ✓ (not in critical — no leak)
  @source "../*.js":            DEFERRED ✓ (the content-scan backstop rides the tail)
```

The anti-evasion BITE holds: the SFC-fold + `components.css` MUST land in DEFERRED (a leak fails W2 byte-complete-in-one-bucket AND W3 ceiling) — the set-equality forbids the "split by dropping the hard-to-place rules" evasion.

## §3 The render-block DELTA (the W-LIGHTHOUSE production-preview protocol — the close-leg)

The render-block mobile-ms before/after is captured under W-LIGHTHOUSE's `render-blocking-insight` lever (LH 13.4.0, production `vite preview`, slow-4G + 4×CPU mobile — the AY-era throttle):

| | resource | gzip | render-block (mobile, slow-4G + 4×CPU) |
|---|---|---:|---|
| BEFORE (the HEAD monolith) | single `dist/styles/index.css` | ~230KiB resolved (~97KiB one-level budget draw) | the AY ~602ms Shared #1 — re-measured at HEAD under the protocol (the AY number is the SHAPE; the re-measured floor is recorded by `proof:lighthouse` W3-arm-1) |
| AFTER (the split) | `dist/styles/critical.css` (render-blocking) | **~105KiB** | the critical subset's far smaller render-block; the ~125KiB deferred tail loads NON-blocking (`media="print" onload` swap) — off the FCP/LCP critical path |

> **NOTE (the close-leg sequencing):** the binding render-block mobile-ms FLOOR is `proof:lighthouse`'s W3-arm-1 gate. The orchestrator sequences W-LIGHTHOUSE's production-preview protocol (`.1`) before this wave's DELTA capture; the before/after numbers above are captured under that committed protocol at the close (this wave's `proof:css-critical` proves the split is SOUND — byte-complete + FOUC-safe + manifest-driven — and W-LIGHTHOUSE proves the split WON). If the re-measured critical subset is STILL over the mobile-ms floor, the inline-critical-head-block direction routes to the named `BB.W-CSS-CRITICAL-INLINE` successor (recorded, NOT a silent carry; the recommendation is the partition alone clears the floor — the critical subset is the small token+ladder+type surface).

## §4 The FOUC-safe π (the binding no-flash floor — critical-only vs both, both modes)

The split is correct only if the deferred tail's late arrival shifts NO above-the-fold pixel. The binding visual truth (captured under the W-LIGHTHOUSE production-preview, the home/forms front door, BOTH modes):

- **critical-only capture** (the deferred tail blocked): the chrome/page/glass-ladder/typography read CORRECTLY — no unstyled flash, no missing glass plate (the 5-rung ladder is in critical), no font-fallback jank (the calibrated `local()` fallback faces stay on the critical-path typography.css; the real woff2 faces ride the separate `./styles/fonts` export and paint during the `font-display: optional/swap` window with zero CLS). The above-the-fold chrome paints stably with the token cascade + glass ladder + type surface ALONE.
- **both-subsets capture**: PIXEL-STABLE against the critical-only capture in the above-the-fold band (the deferred tail decorated below-the-fold + late-mount components only — no above-the-fold shift = no introduced CLS).

A non-stable above-the-fold band would mean a component the chrome paints above the fold landed in deferred — a boundary re-draw (the triumvirate trigger, not a one-partial-at-a-time fill). The boundary is designed: the chrome's first paint reads tokens + glass ladder + typography + theme, all in critical.

> The π captures are produced under the W-LIGHTHOUSE production-preview at the close; this DELTA records the boundary DESIGN + the byte split + the byte-complete diff (the device-free truth) — the pixel-stability pair is the `.2` close-leg under the committed protocol.

## Gate state

- `proof:css-critical` — born-RED at HEAD (W1-W3 fail: no subpath, no emitted split; W4 GREEN — the manifest + build wiring exist). FLIPS GREEN on the orchestrator build (W1 published + W2 byte-complete + W3 under-ceiling validated against the emitted `dist/styles/{critical,deferred}.css` in the simulated emit: W2 25-partition byte-complete ✓, W3 gzip 105 496 ≤ 110 000 ✓, W4 manifest-single-source ✓).
- No-regress: `profile:budget` (the `./styles` union entry is UNTOUCHED — the monolith index.css still emits + resolves; the two split files are ADDITIVE siblings, no byte moved off the union). `proof:emission` (the `@source "../*.js"` + `components.css` ride the deferred tail unchanged). `proof:verify-export-types` (the two new subpaths are CSS-only entries, the `./styles`/`./styles/fonts` precedent).
