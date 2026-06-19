# W-VIZ-WATERCOLOR — captured DELTA

The watercolor-dot mark: the ghost becomes a DASHED blob-silhouette outline, the SVG
filter made per-instance unique + Safari-safe (static filter + compositor transform
wobble). A CSS/SVG mark — ZERO drawing context (the deliberate suite counterexample,
PROCEDURAL-SUITE.md:72,102 permanently-out verdict held).

## Route + selectors (for re-capture)
- **Route:** `/substrates/blob` (the blob showcase page)
- **Ghost pair:** `[data-testid="watercolor-ghost-pair"]` — the "ghost register" StorySection (solid LEFT, ghost RIGHT of each seed)
- **Dashed stroke:** `.watercolor-ghost-stroke` (the SVG `<ellipse>` overlay carrying `stroke-dasharray`, displaced by the same wet filter)
- **Solid grid:** the "static zero-GL register" ShowcaseFrame (`.grid:has([data-testid="watercolor-swatch"].aspect-square)`)
- **Filter seed:** `feTurbulence[seed]` inside each `[data-testid="watercolor-swatch"]`

## Captured frames (chromium, deviceScaleFactor 2, both modes)
- `W-VIZ-WATERCOLOR-ghost-light.png` / `W-VIZ-WATERCOLOR-ghost-dark.png` — the dashed ghost outlines tracing the seeded silhouette
- `W-VIZ-WATERCOLOR-solid-light.png` / `W-VIZ-WATERCOLOR-solid-dark.png` — the per-instance-unique wet edges (PRM-frozen for the still)

## What the eye sees (verified)
- **The dashed ghost (the headline):** clean evenly-spaced DASHED strokes (`8px` dash / `5px` gap) tracing the organic blob silhouette — a hand-drawn placeholder outline, NOT a solid ring and NOT a dashed rectangle. The solid-LEFT/ghost-RIGHT pair shows the silhouette match (the ghost dash line traces the same wobbled outline the solid dot fills). Both modes.
- **Per-instance unique edges:** the eight solid dots across the two grids resolve DISTINCT `feTurbulence` seeds — readback `77, 25, 79, 245, 147, 57, 15, 245` (7 distinct of 8; the 4 demo colors each carry their own seed, repeated across the two grids). The prior hardcoded `seed="2"` painted twelve clones; the per-instance `hashString(color+seed) % 256` derivation makes each wet edge unique + coherent with its silhouette.
- **Warm-cream identity (§E / TEAL-NAVY-PURGE):** the demo palette is warm amber / terracotta-coral / pale cream-gold + `var(--primary)` (the library identity — legendre-violet in dark, warm-ink in light). NO teal-on-navy literal anywhere. The dot bakes no hue (takes `color` as a prop) — compliant by construction; the warm default is asserted in the demo palette.

## Machine readback (binding, both modes)
- Ghost stroke: `hasStroke: true`, `strokeDasharray: "8px, 5px"`, `strokeWidth: 2px` (light AND dark)
- Seeded match (π `emission.spec.ts`): `ghostRadius === solidRadius` (`60.9072% 43.6223% 21.9287% 59.7097% / 65.2026% 44.7639% 35.308% 25.7651%`) — the ghost box keeps the SAME seeded border-radius silhouette the solid dot of that seed renders; the dashed stroke is the overlay
- Box border NOT dashed (the forbidden form): `ghostBorderStyle` is never `dashed`

## Gates (born-RED → GREEN)
- `proof:emission` W5 (narrowed in place, NO new key): `10/10 pass`. Born-RED on HEAD's solid-stroke ghost (`dashed-silhouette-stroke false`, `hardcoded-filter-seed true`, `per-instance-filter-seed false`, `per-frame-radius-paint true`, `drives-transform-wobble false`) → GREEN after the rebuild (dashed `stroke-dasharray` silhouette stroke, per-instance `:seed="filterSeed"` off `hashString`, compositor `transform.value=` wobble in the rAF tick, no per-frame `borderRadius.value=` paint).
- `proof:emission` self-test bites: all four BITE (a dashed box border reds, a removed `stroke-dasharray` reds, a re-pasted `seed="2"` reds, a per-frame `borderRadius.value=` under the filter reds).
- `proof:no-layout-animation` stays GREEN (the animate liveness is a compositor `transform`, not a per-frame layout/paint property).
- `proof:gpu-substrate-single` / `proof:offscreen-pause` stay GREEN (untouched — this mark mounts no drawing context).
- π `tests-visual/emission.spec.ts` (WatercolorDot ghost arm): PASS on chromium-headless-new.

## PENDING — orchestrator real-device capture (the §H binding arm)
The Safari/WebKit no-flash proof is the ORCHESTRATOR's real-device job (the shared chrome-devtools profile was locked at execution; a WebKit engine is required for the §H complaint). The wave's source fix is verified (static filter + compositor `transform` wobble + `isolation: isolate`); the binding Safari evidence to capture:

- **Route:** `/substrates/blob` (the animated solid grid — `WatercolorDot animate`)
- **Engine:** REAL Safari / WebKit (a WebKit Playwright project or Safari via the chrome-devtools MCP)
- **What the eye should see:** a ~3s recording of an ANIMATED watercolor dot breathing WITHOUT a screen flash, flicker, or the element vanishing. The dot wobbles via a sub-perceptual compositor `scale/skew/rotate` transform; the SVG `<filter>` is STATIC (rasterizes once, never re-rasterizes per frame). The HEAD defect (the per-frame `border-radius` paint under the filter forcing the `feTurbulence`→`feDisplacementMap` graph to re-rasterize each frame) is the §H flash this wave kills.
- **Selector:** `[data-testid="watercolor-swatch"].watercolor-animated` (the wobble rides `--watercolor-wobble`; the filter host is `.watercolor-filter-host`).
- **PRM check:** `prefers-reduced-motion: reduce` → the wobble drops to a single static frame (`transform: none` on `.watercolor-animated`); the dashed ghost stroke is static either way.
