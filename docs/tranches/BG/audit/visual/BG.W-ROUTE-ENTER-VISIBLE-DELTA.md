# BG.W-ROUTE-ENTER-VISIBLE — dual-engine paint verdict (NON-AUTHORING)

> **Role:** fresh NON-AUTHORING paint judge (did not build the wave). Verify the PAINTED
> + COMPUTED truth against the wave criteria, never the builder's claim.
> **Wave:** `BG.W-ROUTE-ENTER-VISIBLE` (F1.R1) — the route-entrance-VISIBLE-in-paint repair
> (IOS27-MOTION-TRUTH §2.6/§4.5: 2.1's `gl-route-enter` beat was EATEN because the
> route-chunk stall landed INSIDE the animation clock and the 12px-rise tail was
> sub-perceptual). Build commit `e68bfb38`.
> **Date:** 2026-07-04. **Engines:** Chrome (ANGLE Metal, Apple M5 Max — real GPU, NOT
> SwiftShader) + Safari (off-screen WKWebView, Apple GPU / Metal). **Modes:** light + dark.

## VERDICT: PASS

Every criterion reads correct in BOTH engines and BOTH modes; every capture PNG resolves on
disk. The route-entrance beat is VISIBLE in paint — the chunk is pre-resolved off the clock so
the first composited frame after the swap paints the FROM state (the 20px rise + opacity 0),
NOT a fully-placed settled page.

## The capture-mode caveat (load-bearing method note)

The `?capture=` harness DE-PROMOTES the `.route-enter` entrance for the snapshot
(`demo/capture/capture.css` forces `.route-enter{opacity:1;transform:none}` — the C18 fix that
lets an off-screen WKWebView read FULL settled content). So a STATIC PNG shows the SETTLED page,
NOT a mid-entrance frame. The entrance BEATS are therefore verified via the **COMPUTED-DOM path**
the criteria name ("use COMPUTED DOM checks where the criteria are computational — animationTimeline,
getAnimations(), main.children.length, glContextCount") on the LIVE (non-capture) demo, driving
real SPA navigations through the Vue router and reading `getAnimations()` / computed `transform`
per rAF frame + per `animationstart` event. The static PNGs carry the SETTLED-gestalt verdict
(recessive aurora, calm grain, hero-fits-envelope, engine-badge provenance).

## R1 — chunk pre-resolved before the swap on EVERY nav (first-frame ≠ settled)

Live SPA nav `/foundations/intro → /foundations/colors`, sampled per-rAF from the swap commit:

| frame t (ms) | `.route-enter` animationName | translateY | opacity |
|---|---|---|---|
| 60 (frame 0, swap commit) | `gl-route-enter` running ct:0 | **20px** | **0** |
| 90 | `gl-route-enter` ct:20 | 11.98px | 0.40 |
| 132 | `gl-route-enter` ct:61 | −0.26px (overshoot) | 1.0 |
| 213 | `gl-route-enter` ct:143 | 0.02px | ~1.0 |
| 294 | settled | 0px | 1.0 |

- **`wrapperFirstFrame = { ty:20, op:0 }`** — the first painted frame after the swap is the
  FROM state, NOT settled layout. The chunk was warm (pre-resolved), so the whole rise reads.
- The rise decelerates 20→12→−0.26→0 with a small ζ<1 overshoot then settle = a real
  `--spring-snappy` curve, not a linear fade.
- Source (`proof:route-enter-visible` GREEN, this-tree): `router.beforeResolve` awaits
  `Promise.all(comps.map(c=>c()))` with **NO** `firstResolved` one-shot gate (SUPERSEDED).

## R2 — perceptible 16–24px rise on `--spring-snappy`+`backwards`; PRM fade-only

- Rise = **20px** (1.25rem) — inside the 16–24px band (`@keyframes gl-route-enter from
  { translateY(1.25rem) }`, transitions.css). Runs `gl-route-enter var(--spring-snappy-duration)
  var(--spring-snappy) backwards`.
- **PRM arm** (Playwright `emulateMedia reducedMotion:reduce`, live nav):
  `wrapperAnims:["gl-route-fade"]` (re-points onto the fade-only keyframe), `maxWrapperTranslateY:0`
  and `maxEyebrowTranslateY:0` (rise DROPPED), `fadeStillHappens:true` (opacity 0→1 KEPT). The P6
  fade-keeps/rise-drops vestibular floor holds in paint.

## R3 — StoryHeader bands each with a real translateY leg, reading-order stagger

Live nav, per-band `animationstart` + per-rAF read across all 3 route pairs:

| band | keyframe fired | max translateY | opacity-0.5 cross (pair 1) |
|---|---|---|---|
| eyebrow | `story-hero-cluster-rise` | 24px | 62ms |
| subpath | `story-hero-cluster-rise` | 24px | 176ms |
| title | `story-hero-title-rise` | 24px | 247ms |
| blurb | `story-hero-cluster-rise` | 24px | (rides subordinate-fade) |

- **Reading order `ordered:true`** — eyebrow (62) ≤ subpath (176) ≤ title (247), the
  eyebrow→subpath→title cascade top-to-bottom with real staggers spanning the spring settle.
- **The subpath chip — the dead-class the wave closed — fires `story-hero-cluster-rise`** with a
  24px translateY leg (confirmed in pairs 1/2/3), never a bare opacity fade. The broken 4-band
  cascade is repaired in paint.
- Confirmed present + rising across ALL 3 pairs: `/foundations/intro↔/foundations/colors`,
  `/substrates/aurora↔/dock/overview`, `/compositions/configurator↔/display/buttons`.

## π — ≥8 painted rise frames, first-frame ≠ settled

Live nav `/foundations/intro → /foundations/colors`, full 65-frame series:

- **`paintedRiseFrames = 55`** (≥8 by a wide margin) — frames where any cluster element is
  mid-flight (0.5 < |ty| < 23.5). Per-element: wrapper 8 · eyebrow 34 · subpath 35 · title 48 · blurb 35.
- **`firstFrameWrapTY = 20`** — frame-0-after-swap is the from-state, not settled layout.
- Structural invariants (settled `/dock/overview`): `mainChildren:2` (clean single mount, no
  stale-view leak), `glContextCount:1` (one-GL-per-route budget held — no entrance GL over-mount),
  all 4 StoryHeader bands present, `runningAnims:0` after 1.5s (entrance settles cleanly).

## Settled-gestalt pixel reads (static captures, both engines both modes)

- **Aurora DockStage field is RECESSIVE** — a soft warm-peach (light) / warm-terracotta (dark)
  gradient wash behind the dock demos; NO conic-gradient banding, NO oversaturation, the
  warm-cream identity holds. Grain calm (no disco/noise pop).
- **Dark register is the luminous-dark transmissive material** — near-black page, the field GLOWS
  through, glass dock reads as luminous glass over the deep canvas (not a charcoal slab).
- **Hero fits its envelope** — the display title + blurb settle cleanly; the StoryHeader cluster
  reads eyebrow (`DISPLAY · BUTTONS`) → title (`Launch the sequence`) → blurb top-to-bottom (the
  subpath chip paints).
- **Engine badge decodes in-pixel** — `ENGINE CHROME · GPU ANGLE Metal Apple M5 Max` /
  `ENGINE WEBKIT · Apple GPU`, MODE LIGHT/DARK — provenance read FROM the pixels.

## Evidence on disk (`docs/tranches/BG/audit/visual/route-enter/`)

| png | isRealPng | dims | body meanL | body σ(L) | body chroma |
|---|---|---|---|---|---|
| chrome-buttons-dark.png | true | 1440x900 | 0.312 | 0.0975 | 0.0400 |
| chrome-buttons-light.png | true | 2880x1800 | 0.887 | 0.0376 | 0.0464 |
| chrome-colors-dark.png | true | 1440x900 | 0.305 | 0.0885 | 0.0378 |
| chrome-colors-light.png | true | 2880x1800 | 0.869 | 0.0857 | 0.0466 |
| chrome-overview-dark.png | true | 2880x1800 | 0.538 | 0.1871 | 0.0679 |
| chrome-overview-light.png | true | 2880x1800 | 0.852 | 0.0587 | 0.0638 |
| safari-buttons-dark.png | true | 2880x1800 | 0.265 | 0.0918 | 0.0336 |
| safari-buttons-light.png | true | 2880x1800 | 0.921 | 0.0439 | 0.0319 |
| safari-colors-dark.png | true | 2880x1800 | 0.275 | 0.1138 | 0.0380 |
| safari-colors-light.png | true | 2880x1800 | 0.896 | 0.0917 | 0.0396 |
| safari-overview-dark.png | true | 2880x1800 | 0.451 | 0.1381 | 0.0493 |
| safari-overview-light.png | true | 2880x1800 | 0.900 | 0.0338 | 0.0434 |

- **All real=true**; body σ(L) 0.034–0.187 (a uniform shell reads ~0 — every capture is content).
- **Mode-differentiated:** light meanL 0.85–0.92 (bright) vs dark meanL 0.27–0.54 (deep) — the
  luminous-dark register is genuinely deeper, not the same paint.
- **Warm chroma 0.032–0.068** — the aurora field + warm-cream glass (not gray).
- overview routes carry the highest σ(L) (0.14–0.19 both engines) = the DockStage field + two nav
  docks, the most structure.

### Capture-tooling note (not a wave defect)

The Chrome `foundations/colors`-dark + `display/buttons`-dark captures were taken at 1440×900
(dpr-1, viewport) via the Playwright screenshot path because CDP `Page.captureScreenshot`
reproducibly STALLED on those two heavy dark WebGL routes (beyond-viewport + heavy GL never
yields a stable composite frame in this Chrome-CDP session — rAF-freeze, virtual-time, and clip
fallbacks all timed out). This is a Chrome-CDP capture-tooling limitation for those two dark
surfaces, NOT a wave defect: Safari captured both routes cleanly at 2880×1800 with full content;
the live DOM probe confirmed both routes settled + correct (title/mode/anims:0); and the entrance
verification for those routes rode the live computed-DOM path (pair 3 = `→/display/buttons`,
`ordered:true`, all bands rise 24px). All 12 captures are real content, correct mode, decodable.

## `proof:route-enter-visible` GREEN

```
chunk pre-resolved every nav (R1): true
perceptible rise on snappy   (R2): true
cluster stagger reading order(R3): true
self-test bites                  : 7/7 GREEN
status: PASS
```

## Fences honored

Operated ONLY under `/Users/mkbabb/Programming/glass-ui`. No `/tmp` PNG/DELTA output. No sibling
under `~/Programming` touched/moved (`verify-siblings-intact.mjs --quiet` exit 0 before AND
after). No `src`/`demo`/`styles`/`scripts` edit — the paint was JUDGED, never patched.
`demo:dist:serve` + Chrome CDP killed on completion.
