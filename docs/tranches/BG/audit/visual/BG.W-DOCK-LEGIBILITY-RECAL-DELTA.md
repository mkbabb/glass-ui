# BG.W-DOCK-LEGIBILITY-RECAL — paint DELTA (dual-engine, non-authoring)

**Verdict: PASS.** The dock plate reads **calm-not-metallic over the bright field** in
BOTH modes, BOTH engines, on BOTH wave routes. Every capture PNG resolves on disk at
`isRealPng` 2880×1800. Non-authoring gestalt PASS.

## Method (the proven C18 dual-engine pipeline)

- **Built bytes.** `npm run demo:dist:build` → `dist-demo/` → `npm run demo:dist:serve`
  on `:5200` (HTTP 200 verified before capture).
- **Chrome leg (ANGLE-Metal M5 Max).** Real `Google Chrome.app`
  (`--remote-debugging-port=9477 --user-data-dir=<scratch>/chrome-prof --no-first-run`),
  `playwright.connectOverCDP('http://localhost:9477')`, per mode
  `newContext({viewport 1440×900, deviceScaleFactor 2, colorScheme <mode>})` →
  `goto http://localhost:5200/?capture=<route>&mode=<mode>` (`waitUntil:load`) →
  `waitForFunction data-capture-ready` → GL_RENDERER recorded off a throwaway WebGL2
  context (`ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)`) →
  `page.screenshot`. Capture script:
  `BG.W-DOCK-LEGIBILITY-RECAL-chrome-capture.mjs`.
- **Safari leg (WebKit / Apple GPU).**
  `clang -framework Cocoa -framework WebKit -fobjc-arc docs/tranches/BG/audit/wkshot-live.m
  -o /tmp/wkshot-live`, then
  `/tmp/wkshot-live "http://localhost:5200/?capture=<route>&mode=<m>" out.png <m> 15000`
  (WKWebView = system WebKit.framework = the real Safari 26 engine, Metal; polls
  `data-capture-ready` before `takeSnapshot`). Each snapshot logged
  `data-capture-ready after 4500–4800ms -> snapshotting` + `OK 2880x1800`.
- **Provenance decoded off each PNG top-left engine badge** (read directly from the pixels,
  not asserted): Chrome captures badge `ENGINE CHROME / GPU ANGLE (Apple, ANGLE Metal
  Renderer: Apple M5 Max…)`; Safari captures badge `ENGINE WEBKIT / GPU Apple GPU`. The two
  engines are provably distinct.

## Captures (all resolve on disk, isRealPng 2880×1800)

| Route | Mode | Chrome (ANGLE-Metal) | Safari (WebKit) |
|---|---|---|---|
| /dock/overview | light | `…-paint/chrome-overview-light.png` (1861275 B) | `…-paint/safari-overview-light.png` (1680224 B) |
| /dock/overview | dark  | `…-paint/chrome-overview-dark.png` (1889718 B)  | `…-paint/safari-overview-dark.png` (1706590 B)  |
| /dock/layers   | light | `…-paint/chrome-layers-light.png` (1919186 B)   | `…-paint/safari-layers-light.png` (1831708 B)   |
| /dock/layers   | dark  | `…-paint/chrome-layers-dark.png` (1964925 B)    | `…-paint/safari-layers-dark.png` (1866391 B)    |

(paths relative to `docs/tranches/BG/audit/visual/BG.W-DOCK-LEGIBILITY-RECAL-paint/`)
All eight: PNG magic `89504e470d0a1a0a`, 2880×1800, ≥1.68 MB — real content, non-blank.

## The computational truth — saturate re-anchored to the calm floor (the primary criterion)

Read via `getComputedStyle` over every `.glass-dock` plate (probe
`BG.W-DOCK-LEGIBILITY-RECAL-probe.mjs`):

- **Light, both routes:** every dock plate composes `backdrop-filter: blur(8px)
  saturate(1.2)` — saturate = **1.2 ∈ [1.15, 1.25]**, the calm floor, OFF the metallic
  ≥1.4 ceiling the content-tier resting peer rode through at HEAD.
- **Dark, both routes:** every dock plate composes `backdrop-filter: blur(8px)
  saturate(1.3) brightness(1.14)` — saturate = **1.3 ≥ 1.2** (the luminous-dark
  read-weight-preserved floor, the plain per-mode pair with the brightness glow companion).
- **The unified plate tint is the primary anti-gray device.** `--glass-tint-source`
  resolves `--glass-tint-ink-dock` (a WARM ink, `oklch(from light-dark(#1c1917,#e9e6e2)
  .42 .05 h)` light / `oklch(from #e9e6e2 .9 .045 h)` dark) and `--glass-tint-strength`
  clamps toward the AA ceiling (light `clamp(4%…20%)` → 20% under the bright-bucket signal;
  dark 12%). The tint (darken-over-light toward the warm ink) carries the anti-gray load,
  which lets `saturate` drop to the calm secondary floor — exactly the wave's mechanism.
- **The blur radius primitive is byte-locked** at `blur(8px)` on every plate (the
  `proof:glass-cal` 8px peer-lock held; the recal is saturate-only).
- `glContextCount` 1–2 (one-GL-per-route class), `mainChildren` 2 — sane composed page.

## The visual truth — calm-not-metallic over the recessive field

- **Dock plates read as translucent glass** over the warm aurora field in every capture:
  the field transmits through the plates (aurora tint visible through the plate body), the
  plate silhouettes are defined by a warm-ink rim, and every glyph + label is legible
  (Assets / Layers / Libraries / "The Garden" / "images, fonts, tokens" / the bottom nav
  labels). NO metallic sheen, NO chrome/silver oversaturated specular, NO harsh edge glint.
- **Light mode:** calm warm-cream translucent plates over a peach field; the plate darkens
  gently toward the warm ink (the 20% bright-bucket AA darken) so it silhouettes without
  turning gray or metallic.
- **Dark mode:** luminous-dark transmissive plates — the aurora glows warmly through
  (the 1.3·1.14 saturate·brightness luminous-dark read), warm-ink rims, glyphs legible.
- **The aurora field is recessive** (pixel sample of the field-region mean, ImageMagick
  1×1 downsample): warm hue **19–21°** (the `--foreground` warm-amber family; uniform
  across both routes → NO conic banding / NO hue break), HSV saturation **34% light /
  44% dark** (moderate — well below any neon/oversaturation threshold), value 64% light /
  49% dark. A soft warm wash behind the plates, never a hard conic ring or oversaturated
  gradient.
- **The hero fits its envelope** — the "Overview" / "Dock Layers" hero `<h1>` + blurb sit
  within the route header, no overflow, no clip.

## Cross-engine consistency

Chrome (ANGLE-Metal) and Safari (WebKit) render the same calm-not-metallic register. WebKit
paints the glass a hair more transmissive/softer than Chrome's ANGLE-Metal path (the
expected per-engine `backdrop-filter` compositing difference), but the plate identity — calm
warm translucent, saturate at the calm floor, warm-ink tint as the anti-gray device — is
identical across both engines in both modes. No engine-specific defect (no WebKit
backdrop-filter blowout, no ANGLE oversaturation).

## Sibling-safety

`node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before + after). No path under
`~/Programming` outside glass-ui touched; the WKWebView binary compiled to `/tmp/wkshot-live`
per the proven method (a build artifact, not a sibling repo).
