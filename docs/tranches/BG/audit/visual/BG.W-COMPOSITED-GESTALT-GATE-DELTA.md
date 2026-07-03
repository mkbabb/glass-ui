# BG.W-COMPOSITED-GESTALT-GATE — non-authoring dual-engine PAINT judgment (re-judge #2)

> **Role:** NON-AUTHORING PAINT JUDGE (did NOT build this wave). **Fresh dual-engine capture
> set over the BUILT `:5200` bytes at HEAD `6ce764ff`.** This re-judge **SUPERSEDES** the prior
> re-judge (`a0bfa59a`, 27/36 — preserved in git and in the sibling
> `…-paint/` capture dir). It is an INDEPENDENT re-capture taken AFTER the three dock waves
> that landed since the prior judge — `BG.W-DOCK-FISSION-WIRE` (`95276ad6`),
> `BG.W-DOCK-PERSISTENT-CUT` (`8bf41d0b`, removed the persistent ℱ brand + Fourier egg atop
> both docks), `BG.W-DOCK-CAP-SCROLL-FADE` (`9b156fe8`) — precisely the dock top-strip geometry
> the `topBar` residuals live near. **Gate arm:** `proof:warm-identity` — the composited-WHOLE
> dominant-hue paint BATTERY (measure the whole, not the part). **Date:** 2026-07-02. **Fence:**
> verification-only — ZERO `src`/demo/style/script/roster edits; PNGs + this DELTA under
> `docs/tranches/BG/audit/visual/BG.W-COMPOSITED-GESTALT-GATE-rejudge/`; the EXECUTION-PROGRESS
> cursor row is **held at PAINT-PENDING** (see verdict).

## Verdict — **FAIL** (held PAINT-PENDING) — the WARMTH DISEASE IS CURED, INDEPENDENTLY RE-CONFIRMED

The paint-fix `5eb1933d` **holds at current HEAD**: over the 9 in-repo enrolled roster surfaces
(36 composites) **every single field reads dominant-family WARM** — `warmFraction ≥ 0.907`, zero
cold, zero magenta, zero grey slab, zero metallic over-correction. The 4.2.0 class-A disease
(pink/lavender/purple ambient StoryHero backdrops; the flat near-black dark void; the gray→metallic
field) is **gone** — the substrate heroes render warm peach-cream (light) / luminous warm-amber
(dark), recessive, with no conic banding and no oversaturation. On the STATED warmth pass condition
(chroma-weighted warm-fraction band · dominant-hue family · not gray/cerulean/magenta) the set is
**36/36 PASS**, both engines, both modes.

The wave nevertheless does **NOT** reach its OPERATIVE bar — the *full* `warmIdentityVerdict` kernel
(which bundles the anti-artifact `topBar`/`edgeCast` delta predicates + the roster's own expect-band)
reads **27/36** — **byte-for-byte the same 9 residuals the prior judge found**, now re-confirmed on
a moved HEAD. All 9 are **PROBE-GEOMETRY artifacts** (page-top-margin luminance; a field-edge over a
black masthead heading glyph) — verified NOT paint/warmth defects by cropping the exact probe boxes.
Critically, the `dock` `topBar` residual **PERSISTED after `BG.W-DOCK-PERSISTENT-CUT` removed the
ℱ brand + Fourier egg atop the dock** — proving the residual is the plain page-top margin the box
straddles, NOT the removed chrome. Clearing the residuals requires a **roster probe recalibration**,
which is a build/roster-agent job the paint-judge fence forbids; the operative all-FAIL→all-PASS
roster flip is therefore not achieved and the row is held PAINT-PENDING.

| axis | result |
|---|---|
| **Device-free gate** (`proof:warm-identity`) | GREEN (kernel + wiring + 14-bite self-test) — the paint-gate PRECONDITION |
| **Dual-engine capture on disk** | 56 PNGs (14 routes × chrome+safari × light+dark), all resolve, all `isRealPng`, all 2880×1800 |
| **Engine provenance (in-pixel badge)** | Chrome `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)` (real Metal — `GL_RENDERER` on all 28 chrome captures + decoded badge) · WebKit `ENGINE WEBKIT · GPU Apple GPU`; MODE light/dark decodable FROM the pixels |
| **Computed-DOM render sanity** | `main.children.length = 3` on ALL 28 chrome routes (shell rendered, not a blank/error page); `glContextCount` 0–3 per route (GL routes carry canvases); `bodyText` non-empty on every route |
| **Composited WARMTH (stated pass condition)** | **36/36** all-warm (dominant-hue family + warm-fraction ≥ 0.907; recessive, no conic/oversaturation) — class-A disease CURED |
| **Full operative kernel (warm-identity band)** | **27/36** — 9 `topBar`/`edgeCast` PROBE-GEOMETRY artifacts (roster-recalibration owed) |

## Provenance

- **Chrome leg:** real Chrome.app 149 via CDP (`chromium.connectOverCDP :9456`), non-headless
  (headed → real Metal), gitignored throwaway profile, `--use-angle=metal`; `GL_RENDERER = ANGLE
  (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)` on all 28 chrome captures.
  Badge decodes `ENGINE CHROME / GPU ANGLE Metal Renderer: Apple M5 Max / MODE {LIGHT,DARK}`.
- **Safari leg:** off-screen WKWebView (`wkshot-live`, system `WebKit.framework`/Metal, no TCC),
  compiled repo-locally under the rejudge dir (NEVER `/tmp`). Badge decodes `ENGINE WEBKIT · GPU
  Apple GPU · MODE {LIGHT,DARK}`.
- **Bytes:** BUILT demo dist (`npm run demo:dist:build` → `dist-demo`, 972ms) served by `vite
  preview :5200` (NOT `:5199` dev), via the C18 `?capture=<route>&mode=<m>` harness (poll
  `data-capture-ready`, never a fixed sleep; +900ms live-frame settle post-ready).
- **Kernel:** the SAME `scripts/reflect-capture-verify.mjs` `pngRegionHueHistogram` +
  `scripts/lib/paint-arm.mjs` `warmIdentityVerdict` the gate reads, over each surface's CURRENT
  roster FIELD probe. WARM_BAND: warmFractionFloor 0.55 · chromaCeiling 0.30 · edgeCastCeiling 0.16
  · topBarCeiling 0.14 · cornerClipFloor 0.04. Analysis: `…-rejudge/analyze.mjs` → `analysis.json`.

## The composited dominant-hue matrix (36 roster composites)

| surface | route | chrome-L | chrome-D | safari-L | safari-D | warmth | kernel |
|---|---|:--:|:--:|:--:|:--:|:--:|:--:|
| dock | /dock/overview | ✗ topBar .203 | ✗ topBar .471 | ✓ | ✗ topBar .396 | 4/4 warm | 1/4 |
| configurators-goo | /substrates/blob | ✗ edge .172 | ✓ | ✓ | ✓ | 4/4 warm | 3/4 |
| aurora | /substrates/aurora | ✓ | ✓ | ✓ | ✓ | 4/4 warm | **4/4** |
| glass-feedback | /feedback/toast | ✓ | ✓ | ✓ | ✓ | 4/4 warm | **4/4** |
| shell | /foundations/intro | ✓ | ✓ | ✓ | ✓ | 4/4 warm | **4/4** |
| motion-fourier | /motion/curve-gallery | ✓ | ✓ | ✓ | ✓ | 4/4 warm | **4/4** |
| dark-register | /substrates/glass-material | ✗ edge .179 | ✓ | ✓ | ✓ | 4/4 warm | 3/4 |
| tabs-segmented | /navigation/tabs | ✓ | ✓ | ✓ | ✓ | 4/4 warm | **4/4** |
| page-band | /foundations/intro | ✗ topBar .224 | ✗ topBar .339 | ✗ topBar .166 | ✗ topBar .287 | 4/4 warm | 0/4 |

Representative warm reads: aurora warmF 1.00 chroma .041–.057 (recessive, no conic) · shell warmF
.907–.962 chroma .045–.066 · glass-feedback warmF 1.00 chroma .025–.038 · dark-register warmF 1.00
chroma .032–.045 (luminous-dark, no void) · dock warmF 1.00 chroma .060–.091 · page-band warmF 1.00
chroma .037–.054 warm peach hero. **Every** field: dominantFamily=warm. **Warmth 36/36.**

## Defect localization — ALL 9 residuals are CAPTURE/PROBE-GEOMETRY artifacts (NOT paint defects)

Pixel-verified by cropping the exact probe boxes over the fresh captures (`…-rejudge/_inspect-*.png`).

### `topBar` (7): dock ×3, page-band ×4 — the topbar box samples the PAGE-TOP MARGIN

The roster topbar box (`tx=0.52,ty=0.00,tw=0.46,th=0.05`) samples the plain **page-top margin** —
white in light mode, near-black in dark — which diverges in **luminance** from the field probe (a
bright warm DockStage card for `dock`; the warm peach aurora hero for `page-band`, which begins BELOW
the ~5% near-black top margin). The top-strip crops show **NO aberrant colored slab, no cold cast, no
metallic bar** (the 4.2.0 D5 disease is absent) — only the harness magenta engine-badge overlay
(top-LEFT, dodged by the `tx=0.52` narrowing) and the page's own top margin. Dark-mode topDelta is
largest (dock-D .471) because a near-black margin vs a bright dock pill is a maximal `L` gap. The
band `topDelta<=0.12` assumes the field extends to the top; the current layout has a margin/hero-start
seam the probe box straddles. **The residual persisted after `BG.W-DOCK-PERSISTENT-CUT`** removed the
ℱ brand + Fourier egg atop the dock, so it is definitively the page margin, not the removed chrome.
Evidence: `_inspect-topstrip-{dock-overview,foundations-intro}-chrome-{light,dark}.png`.

### `edgeCast` (2): configurators-goo chrome-L, dark-register chrome-L — field-edge over MASTHEAD HEADING GLYPH

Chrome-LIGHT ONLY (Safari + both-dark PASS the same probe). The field probe's left 0.02 edge column
overlaps a large **black masthead heading letter** — the "b" of "Blob" (configurators-goo) / the "M"
of "Material" (dark-register) — over a warm cream/peach field. Chrome's text rasterization places the
anti-aliased letter edge inside the edge column while WebKit lays it out a sub-pixel differently, so
the edge↔field ΔE trips only in chrome-light. The field itself is warm (warmF 1.00). Evidence:
`_inspect-edge-configgoo-chrome-light.png`, `_inspect-edge-darkreg-chrome-light.png`,
`_inspect-darkreg-boxes.png` (field box yellow / edge column red overlaid on the "M").

### cross-repo (10th enrolled surface) — out of in-repo pipeline scope

A foreign consumer (`slides.friday.institute`); no `/cat/story` route token, uncapturable under the
foreign-tree fence. Warmth inherited from the library tokens the in-repo surfaces prove.

## mustFix[] (for a build/roster-fix agent — I record, I do not edit src/demo/styles/roster)

1. **[roster calibration · primary] Move the `dock` + `page-band` `topbar` probe OFF the page-top
   margin.** The current `tx=0.52,ty=0.00,th=0.05` box samples the white(light)/near-black(dark)
   page-top margin, which legitimately diverges in `L` from the field (a bright warm DockStage card /
   the warm hero that starts below the margin). Re-point the topbar box into the field's OWN top band
   (below the page margin, where the dock/hero actually paints), OR — since no aberrant colored top
   bar exists in the current build — re-scope/relax the `topDelta<=0.12`/`topBarCeiling` band with a
   recorded rationale. Owned by the build/roster agent (`bg-gestalt-roster.md` + the gate's
   `WARM_BAND`); a paint judge may not edit the roster.
2. **[roster calibration] Inset the `configurators-goo` + `dark-register` field probes off the
   masthead heading glyph.** The field's left-edge column overlaps the black "Blob"/"Material" heading
   letter, tripping `edgeCast` in chrome-light only. Nudge the field `x` right (or `y` down) so the
   whole probe — including its left 0.02 edge column — sits on the warm field, clear of the large
   heading glyph.
3. **[none for src/demo]** No paint change is owed — the composited WARMTH is 36/36 across both
   engines both modes, recessive, no conic/oversaturation, no gray/cerulean/metallic. Re-run the
   non-authoring dual-engine judge AFTER the roster recalibration; the expectation is 36/36 kernel →
   operative all-PASS → flip.

## Fable / DesignSync dominant-hue read (F8.3)

DesignSync provisioning is USER-GATED (unprovisioned at HEAD); per the F8.3 arm the Fable verdict is
recorded against the committed dual-engine captures by a non-authoring instance. **Filed dominant-hue
read: WARM PASS** — the composited-whole reads warm-cream/peach across every enrolled hero-page field
in both modes both engines (the flagship substrate heroes are warm peach-gold light / luminous
warm-amber dark; the feedback/tabs/motion plates read warm-cream glass). The operative kernel's
residual 9 trips are probe geometry, not a hue read. Matches the pixel kernel.

## Captures on disk

- 56 PNGs: `docs/tranches/BG/audit/visual/BG.W-COMPOSITED-GESTALT-GATE-rejudge/<route>-{chrome,safari}-{light,dark}-desktop-full.png` (all 14 wave routes)
- Roster-surface analysis: `…-rejudge/analysis.json` · matrix driver `…-rejudge/analyze.mjs`
- Chrome provenance + computed-DOM: `…-rejudge/chrome-results.json` (GL_RENDERER + main.children + glContextCount + anims per capture) · driver `…-rejudge/chrome-capture.mjs` (WKWebView leg: repo-local `wkshot-live` over the same `?capture=` URLs)
- Inspection crops (probe-box overlays proving the 9 residuals are artifacts): `…-rejudge/_inspect-*.png`; downscaled gestalt views: `…-rejudge/_view-*.png`
