# BG.W-GLASS-REFRACT-WEBGL — dual-engine paint verdict

**Wave:** BG.W-GLASS-REFRACT-WEBGL (cursor row 13.2, band F2/P) — the C-SAFARI Tier-1 WebGL2 refraction FLOOR (primary).
**designSync surface:** glass/CTA refraction — hero CTA + dock plate.
**Judge:** non-authoring paint judge (did NOT build the wave). Verdict is against the PAINTED truth, both engines, both modes.
**Date:** 2026-07-03.
**Verdict: PASS.**

## Method (the proven C18 pipeline)

BUILT bytes served on `:5200` (`npm run demo:dist:build` → `demo:dist:serve`, NOT the `:5199` dev server).
Per route+mode: `http://localhost:5200/?capture=<route>&mode=<light|dark>`, poll `document.documentElement[data-capture-ready]` before snapshot.

- **Chrome leg** — real `Google Chrome.app` `--remote-debugging-port=9456` + throwaway `--user-data-dir`, `connectOverCDP`, `playwright-core` chromium, full-viewport `page.screenshot()`. `GL_RENDERER` recorded off a throwaway webgl2 ctx: **`ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)`** — real Metal GPU, capable tier.
- **Safari/WebKit leg** — `clang -framework Cocoa -framework WebKit -fobjc-arc docs/tranches/BG/audit/wkshot-live.m -o /tmp/wkshot-live`, off-screen WKWebView over system WebKit.framework/Metal (no TCC), polls `data-capture-ready` before snapshot. Badge decodes **ENGINE WEBKIT / GPU Apple GPU**.

Capture scripts: `BG.W-GLASS-REFRACT-WEBGL-chrome-capture.mjs` (in this dir). Safari captured via `/tmp/wkshot-live` per route+mode.

## The live-wiring state (the load-bearing fact this judge verified)

The wave's WebGL2 fragment module `src/composables/glass/webgl/shaders/glass-refract.glsl.ts` (exports `GLASS_REFRACT_FRAG_GLSL`, `GLASS_REFRACT_UNIFORMS`, `CHROMATIC_SCALE=0.0045`) is a **SOURCE module + the JS↔GLSL uniform contract at this commit**. Confirmed by grep: `GLASS_REFRACT_FRAG_GLSL` has ZERO importers in `src/`/`demo/`. The FBO two-pass that BINDS `uBackdrop` and the `@property --glass-chromatic-strength` registration are BOTH explicitly DEFERRED to `BG.W-GLASS-BACKDROP-SAMPLE` (per the module header + the cursor row: "FBO 2nd-sample DROPPED-WITH-TRIGGER (13.3 booked)").

So on the LIVE painted surface the refraction register is the **Tier-0 CSS-SVG `#glass-refract` `feDisplacementMap` filter** (`.glass-lens` opt-in, `glass-refract.css`, `@supports(backdrop-filter:url())`-gated) → **full refraction on Chromium (capable), graceful flat-blur fall on Safari/WebKit (the tail)** — which IS the "full on capable, graceful … flat-blur fall on the tail" half of the SOTA degrade ladder the criteria demands. The WebGL2 floor is the source-integrated primary that becomes live-wired at the FBO keystone; this judge verified the SOURCE floor (`proof:glass` refract-webgl arm) + the painted degrade ladder that ships today.

## COMPUTED-DOM probe (Chrome, both modes)

| route | mode | `.glass-lens` | lens computed `backdrop-filter` | refract-url els | glContextCount | mainChildren | hero CTA box | CTA overflows |
|---|---|---|---|---|---|---|---|---|
| /substrates/glass-material | light | 1 | `blur(8px) saturate(1.4) url(#glass-refract)` | 1 | 1 | 2 | — | — |
| /substrates/glass-material | dark | 1 | `blur(8px) saturate(1.3) brightness(1.14) url(#glass-refract)` | 1 | 1 | 2 | — | — |
| /display/buttons | light | 0 | (btn-glass) `blur(16px) saturate(1.8)` | 0 | 2 | 2 | 200×44 @top427 | **false** |
| /display/buttons | dark | 0 | (btn-glass) `blur(16px) saturate(1.55) brightness(1.16)` | 0 | 2 | 2 | 200×44 @top427 | **false** |
| /dock/overview | light | 0 | dock `blur(8px) saturate(1.4)` | 0 | 2 | 2 | — | — |
| /dock/overview | dark | 0 | dock `blur(8px) saturate(1.3) brightness(1.14)` | 0 | 2 | 2 | — | — |

- **Refraction floor LIVE on capable (Chromium):** on `/substrates/glass-material` BOTH modes the `.glass-lens` panel's computed `backdrop-filter` resolves the `url(#glass-refract)` SVG displacement filter — the full refraction paints on the capable engine.
- **Hero CTA envelope:** `.btn-glass` primary CTA box `200×44`, `overflowsViewport:false` — fits its envelope, deep-glass tier (`blur(16px) saturate(1.8)` light / `1.55 brightness(1.16)` dark). The staged blue live-field transmits through the glass buttons (lit glass, not a pale lozenge).
- **Dock plate:** `.glass-dock` translucent (bg α 0.52 light / 0.56 dark), backdrop `blur(8px) saturate(1.4)` (+ brightness lift dark) — reads as glass over the aurora field.

## Aurora recessiveness (pixel means, top-right quadrant away from badge/text)

| capture | mean RGB | reading |
|---|---|---|
| chrome glass-material light | (0.890, 0.753, 0.592) | warm-cream recessive gradient, R>G>B, no conic/oversat |
| chrome glass-material dark | (0.580, 0.443, 0.278) | luminous-dark warm-amber (glows through, not a dead void) |
| safari glass-material light | (0.949, 0.851, 0.706) | warm-cream recessive, R>G>B |
| safari glass-material dark | (0.455, 0.361, 0.220) | luminous-dark warm-amber |

Both engines agree in warm ordering + recessive character. No conic banding, no oversaturation on any capture. The minor Chrome-vs-Safari luma delta (Chrome renders slightly deeper) is an engine-luma difference within tolerance, not a defect.

## Dual-engine gestalt (all 12 captures inspected)

Both engines, both modes, all three routes read correct:
- **glass-material** — recessive warm aurora; display type in its envelope; the 5-rung glass-tier ladder cards (wash→overlay) + the nav dock read as translucent frosted glass. Dark = luminous transmissive material (aurora glows through the dark plate). Safari falls to the blur base gracefully (SVG `url()` refraction is dead on WebKit) and stays legible — the flat-blur floor.
- **buttons** — the hero "Launch sequence" + "Next →" glass CTA transmit the staged blue live field (lit glass, not a pale lozenge on a flat plate) on BOTH engines; glass/glass-wash chips + dock read as glass. CTA fits its envelope.
- **dock/overview** — dock plates (collapsible pill, media transport) read as translucent glass over the recessive warm DockStage aurora; nav dock reads as glass. Both engines both modes.

## Gate + on-disk floor

- `proof:glass` — **PASS** including the `refract-webgl` arm: RW1 operator=`uChromatic` (no `uDispersion`/no uv-fraction), RW2 `CHROMATIC_SCALE=0.0045` pinned js+glsl (no bare literal), RW3 canonical rim form + shape-aligned `ca`, RW4 refraction reads `uRefractionStrength` (squircle lens, disjoint from hue), RW5 one `sampleBG` wrapper / 4 sites / 1 raw read + all self-test teeth.
- **All 12 PNGs resolve on disk**, real dimensions 2880×1800, content-real byte sizes (1.6–4.7 MB) — the anti-evasion floor met.

## Capture paths

Chrome (`docs/tranches/BG/audit/visual/BG.W-GLASS-REFRACT-WEBGL-assets/`):
- `chrome_substrates_glass-material_light.png`, `chrome_substrates_glass-material_dark.png`
- `chrome_display_buttons_light.png`, `chrome_display_buttons_dark.png`
- `chrome_dock_overview_light.png`, `chrome_dock_overview_dark.png`
- `chrome-probes.json` (the COMPUTED-DOM probe set)

Safari (same dir):
- `safari_glass-material_light.png`, `safari_glass-material_dark.png`
- `safari_buttons_light.png`, `safari_buttons_dark.png`
- `safari_dock-overview_light.png`, `safari_dock-overview_dark.png`

## Observations (non-blocking, recorded)

- **glContextCount=2 on /display/buttons + /dock/overview** — the page-level live aurora field + the demo's second staged live field (buttons: the blue "staged over the live field" backdrop; dock: DockStage's shared aurora). This is a DEMO-PAGE composition (two backdrops the stories deliberately stage), NOT a library one-GL-per-route component violation; both fields render calm/recessive in the captures. Observed-benign.
- **The WebGL2 refract floor is source-integrated but not yet live-wired** (the FBO `uBackdrop` bind + `--glass-chromatic-strength` @property reg are the booked `BG.W-GLASS-BACKDROP-SAMPLE` keystone). Today's live floor is the Tier-0 CSS-SVG lens (full on Chromium) + the graceful flat-blur fall on the tail — the ladder the criteria requires paints correctly. When the FBO keystone lands, the WebGL2 primary becomes the universal floor; that is a distinct wave's paint verdict, not a regression of this one.

**PASS** — non-authoring dual-engine (Chrome Metal M5 Max WebGL2 + Safari WebKit) both-modes capture confirms the refraction floor paints correctly (full on capable, graceful flat-blur fall on the tail) on the hero CTA + dock plate, aurora recessive with no conic/oversaturation, hero fits its envelope, `proof:glass` GREEN, every capture PNG resolves on disk.
