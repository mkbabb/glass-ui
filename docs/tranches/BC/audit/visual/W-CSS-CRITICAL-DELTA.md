# BC.W-CSS-CRITICAL — DELTA (the render-blocking /styles split: VERIFIED LIVE — the binding paint the BB close never ran)

**Wave**: BC.W-CSS-CRITICAL (Band 11 — PERFORMANCE, FIRST of the band) · **Branch**: tranche/BC · **Date**: 2026-06-19
**Demo build hash**: b0c3403d (HEAD at this authoring) · **Demo origin**: `http://127.0.0.1:5199` (the `:5199` clause-4 default) · **Playwright projects**: `chromium-headless-new` (desktop 1280×800) + `coarse-touch` (mobile 390×844)
**Gate**: `proof:css-critical` born-RED → GREEN over the SETTLED BC cascade (W1 published / W2 byte-complete / W3 under-the-RE-PINNED-ceiling / W4 manifest-driven / delta-capture). The render-block FLOOR is W-LIGHTHOUSE's W3-arm-1 lever (`render-blocking-insight` mobile-ms ceiling) — this DELTA captures the win + the FOUC-safe paint; that gate floors the ms.

## §0 What this wave is (CONFIRM + RE-MEASURE + VERIFY-LIVE, NOT re-author)

The split MECHANISM (the `critical-partition.mjs` manifest, the `vite.style-assets.ts emitCriticalDeferredSplit` build emit, the `proof:css-critical` gate, the `./styles/critical` + `./styles/deferred` + `./styles` exports) was BUILT at BB.W-CSS-CRITICAL but NEVER VERIFIED LIVE — the W5 FOUC-safe π + the render-block DELTA "rode W-REFLECT3", which never ran, and the `styles-critical-split` disposition book stayed `pendingResolvedBy: BB.W-CSS-CRITICAL`, OPEN. This wave:

1. **RE-MEASURES the partition over the SETTLED BC cascade** (Bands 1-7 + 9 churned `index.css`).
2. **RE-PINS the W3 ceiling** at the settled-cascade achieved size (the reviewed write).
3. **RUNS the FOUC-safe π LIVE** (the binding paint, both modes, both projects).
4. Re-points the gate's `delta-capture-exists` to THIS BC DELTA — the disposition flips `pendingResolvedBy → resolvedBy: BC.W-CSS-CRITICAL`.

## §1 The partition re-measured over the settled BC cascade (the byte-completeness re-confirm)

The BC visual bands added TWO painting partials to the monolith `index.css` draw since BB; both are bucketed DEFERRED (neither paints an above-the-fold first-paint chrome pixel):

| BC-added partial | role | bucket | rationale |
|---|---|---|---|
| `scroll-chrome.css` (BC.W-SCROLL-CHROME) | the scroll-driven floating-CHROME collapse recipe | **DEFERRED** | a late-mount surface decoration (a chrome element collapses on scroll — it does not paint the FIRST frame) |
| `completion-seal.css` (BC.W-AX-COMPLETION-SEAL) | the one-shot earned-gold completion seal | **DEFERRED** | a focal opt-in feedback surface that mounts on a completion EVENT — never above-the-fold first paint |

The settled partition set is now **29 top-level partials** (6 critical + 23 deferred) + the 2 build-time folds (`../glass-ui.css` SFC scoped payload + `./components.css` utility surface) + the `@source "../*.js"` content-scan backstop, all in DEFERRED. The CRITICAL bucket is UNCHANGED (the 6 documented token+glass+type partials — `tokens.css`, `typography.css`, `theme.css`, `glass.css`, `glass-specular-track.css`, `glass-refract.css`). `proof:css-critical` W2 byte-complete re-runs GREEN over the settled draw — no partial dropped (`dropped=[]`), none duplicated.

**Byte-completeness (the partition floor — empty diff):**
```
critical partials (6) ∪ deferred partials (23) ≡ monolith partials (29)
  dropped:    []          (none — every partial in the union; scroll-chrome.css + completion-seal.css now bucketed)
  duplicated: []          (none — disjoint buckets)
  SFC-fold (../glass-ui.css):   DEFERRED ✓ (not in critical — no leak)
  components.css:               DEFERRED ✓ (not in critical — no leak)
  @source "../*.js":            DEFERRED ✓ (the content-scan backstop rides the tail)
```

## §2 The byte split re-measured (the render-block lever — fully-resolved consumer draw, settled BC cascade)

Measured at HEAD `b0c3403d` (post-build dist), the subsets resolved RECURSIVELY (the real first-paint byte a consumer's bundler emits — the critical partials' `@import` roots resolved through their nested `tokens/*` + `glass/*` sub-partials):

| subset | raw | gzip | share of monolith gzip |
|---|---:|---:|---:|
| **CRITICAL** (token cascade + 5-rung ladder + type + theme + specular/refract) | 482 228 | **149 748** | **47.3%** |
| DEFERRED (component recipes + transitions/utilities + SFC fold + components.css) | 598 519 | 163 195 | ~52% (the component SFC + utility surface — loads NON-blocking) |
| MONOLITH (full resolved union draw) | — | 316 614 | 100% |

**The render-block lever:** the WHOLE ~316KiB-gzip resolved draw ships as ONE eager render-blocking `<head>` stylesheet (the FCP/LCP gate on mobile, the AY ~602ms Shared #1). After the split, only the **149KiB-gzip CRITICAL subset** is render-blocking-early — **47.3% of the monolith**, the spec's ~46% small-above-the-fold-subset bar HELD over the settled cascade — and the ~163KiB-gzip component-recipe + SFC + utility tail loads NON-blocking after first paint. The render-blocking byte is roughly HALVED, and the long component-CSS tail "most of which a given route never paints" (the AY analysis) no longer gates first paint.

**The growth from BB (131469 → 149748 gzip) is NOT a component-recipe leak.** The critical bucket is STILL the 6 documented token+glass+type partials (W2 partials-disjoint + W4 hold); the BC visual bands 1-7 + 9 legitimately re-authored the critical `tokens/*` + `glass/*` SUB-partials (the warm-cream page-chassis tokens, the on-glass-fg/surface-axis registers, the calm/deep glass ladder, the scroll/motion token additions in `scale-paper.css`) — all of which live in the critical token cascade by construction.

**The W3 ceiling re-pinned (the reviewed write, never a silent recipe swallow):** `CRITICAL_GZIP_CEILING` `137000 → 156000` (~4.2% headroom over the measured 149748, the profile-bundle re-base convention). A component recipe folded back into critical climbs the resolved gzip over the ceiling → RED (the revert-toward-monolith bite). The render-block FLOOR stays W-LIGHTHOUSE's W3-arm-1 mobile-ms gate (the binding perf truth); this ceiling guards against a recipe revert-toward-monolith.

## §3 The FOUC-safe π — RUN LIVE (the binding no-flash paint, both modes, both projects)

`tests-visual/css-critical.spec.ts` — the W5 binding paint the BB gate header named + never ran. The demo above-the-fold chrome (`/foundations` section landing — the StoryHero display `<h1>`, the eyebrow, the bento glass cards, the shell dock) is measured under the FULL union, then the DEFERRED cascade is disabled (the 19 SFC-scoped `[data-v-*]` sheets — the build-time `../glass-ui.css` SFC fold — + the 40 deferred-component-recipe rules in the union sheet, matched by deferred-partial selector signature), simulating the FOUC moment (critical render-blocking-early HAS arrived, the deferred tail has NOT). The consumer's own Tailwind layout is KEPT on both arms (a real consumer ships its layout independently of glass-ui's `/styles` split — never stripped — so a geometry delta is unambiguously a glass-ui partial mis-bucketed to deferred).

**The captured pair (`css-critical/afold-both-{light,dark}.png` vs `css-critical/afold-critical-only-{light,dark}.png`):**

| | fully-loaded (union) | critical-only (deferred disabled: 19 SFC sheets + 40 recipe rules) |
|---|---|---|
| hero "Foundations" display `<h1>` | x=166.2 y=145.3 w=1029.6 | **IDENTICAL** x/y/w (the √φ display ladder is in critical typography.css) |
| eyebrow + `@mkbabb/glass-ui/styles` chip | in place | **IDENTICAL** position |
| blurb body copy | in place | **IDENTICAL** position |
| bento glass-card grid frame | x/y/w in place | **IDENTICAL** above-the-fold x/y/w (only the below-the-fold internal content reflows — the card's own tail) |
| shell dock | in place | **IDENTICAL** position |

What a reader SEES: the above-the-fold chrome paints RIGHT before the heavy tail arrives — the display hero at the exact same size + position, the eyebrow + chip + blurb + card grid + dock all in place, NO unstyled flash, NO above-the-fold layout shift. The DEFERRED tail's absence drops only the BELOW-the-fold + non-layout decoration: the icon-chip `--section-color` backplates (icon-chip.css, deferred — the chips show bare glyphs), the inner card preview canvases (deferred component recipes), the within-card content reflow (below-the-fold). The deferred tail decorates components that mount after first paint or sit below the fold — its late arrival shifts NO above-the-fold pixel (the FOUC-safe floor, binding).

**π result (LIVE):**
```
chromium-headless-new (desktop 1280×800): light ✓  dark ✓
coarse-touch          (mobile  390×844):  light ✓  dark ✓
4/4 PASS — every above-the-fold chrome anchor x/y/w pixel-stable (≤1px sub-pixel tol)
           with vs without the deferred tail; the hero resolves a real critical
           display font-size without the deferred tail (no unstyled UA-default flash).
```

The fail-CLOSED bite is binding: an above-the-fold chrome anchor whose x/y/w SHIFTS when the deferred tail is absent reds the recompute (a partial the first-paint chrome reads landed in DEFERRED — the re-bucket-to-critical trigger, NOT a tolerance bump). The deferred-cascade-genuinely-present assert (`sfcSheets + recipeRules > 0`) forbids a vacuous no-op pass.

## §4 The render-block ms feed (the W6 floor — BC.W-LIGHTHOUSE's W3-arm-1 lever)

The achieved critical-subset gzip (149748, 47.3% of the monolith) FEEDS BC.W-LIGHTHOUSE's `loadLeverCeilings.renderBlockMobileMsMax` re-pin: the split's effect (the render-blocking byte roughly halved, the ~163KiB component tail moved NON-blocking) is the lever BC.W-LIGHTHOUSE re-pins below the HEAD pre-fix ~602ms. The two waves share the demo (a render-block measure), NOT a file — this owns the cascade carve (`critical-partition.mjs` + `proof:css-critical`); BC.W-LIGHTHOUSE owns the score floor (`proof:lighthouse` + `scripts/lighthouse/*`). The dependency is ONE-directional: this lands the split → LIGHTHOUSE reads its effect. The critical-render-blocking-early + deferred-non-blocking `<head>` import pattern in the consumer harness (`scripts/lighthouse/consumer-app/`) is the LIGHTHOUSE owner's focused-diff integration (the registry single-owner rule).

## Gate state

- `proof:css-critical` — born-RED at HEAD (W2 dropped `scroll-chrome.css`+`completion-seal.css`; W3 gzip 149748 > the stale 137000 ceiling) → GREEN over the settled BC cascade (W1 published, W2 29-partition byte-complete, W3 gzip 149748 ≤ the re-pinned 156000, W4 manifest-single-source, delta-capture → this BC DELTA).
- No-regress: `proof:no-layout-animation` + `proof:glass-cohesion` + the visual π corpus stay GREEN (a perf cascade carve moves NO paint — the partial CONTENTS are byte-untouched, whole-partial bucketing only). `profile:budget` (the `./styles` union entry is UNTOUCHED — the monolith `index.css` still emits + resolves; the two split files are ADDITIVE siblings). `proof:emission` (the `@source "../*.js"` + `components.css` ride the deferred tail unchanged). `verify-export-types` / `proof:resolution` (the two split subpaths are CSS-only entries, the `./styles`/`./styles/fonts` precedent — no new export).

## Disposition discharge

`styles-critical-split` (AX DISPOSITION-REGISTER, `pendingResolvedBy: BB.W-CSS-CRITICAL`, OPEN since the source landed but the binding paint never ran) → **BUILD-discharged LIVE**: the FOUC-safe π + the render-block DELTA + the Lighthouse floor feed ran here. The disposition flips `pendingResolvedBy → resolvedBy: BC.W-CSS-CRITICAL` (the FOLD-LEDGER F7 destination is now a real on-disk wave; closes CHALLENGE-1 BLOCKER 4/5/7).
