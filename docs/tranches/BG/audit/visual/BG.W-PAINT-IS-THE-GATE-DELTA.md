# BG.W-PAINT-IS-THE-GATE — DELTA (the born-RED Metal ground-freeze)

> **Wave class:** `[P]` paint-gated, WS7 Band-2 STAGE-0. **Cursor state at capture:** `0.1 PAINT-PENDING`
> (device-free gate GREEN @ `7fa3156b`, 14 self-test bites; the non-authoring dual-engine paint verdict OWED).
> **Judge:** non-authoring paint judge (did NOT build the wave). **Verdict:** **FAIL — born-RED ground
> correctly captured** (the surfaces read 4.2.0-broken BY DESIGN; this is the anchor, not a regression).

This wave does not FIX paint — it freezes the 4.2.0-line broken paint as the born-RED anchor + ships the
defect-localizing decoder. The captures below are the binding artifact the gate's new `topDelta` /
chroma-ceiling / `meanA`/`meanB` axes were built to read. They are SUPPOSED to read broken; the downstream
WS1/WS3 paint waves flip each surface GREEN, each re-captured + re-verdicted by a non-authoring agent.

## Capture provenance (real GPU, both engines, both modes)

- **Chrome leg — REAL Chrome.app 149 over CDP (`connectOverCDP`), `GL_RENDERER = ANGLE (Apple, ANGLE Metal
  Renderer: Apple M5 Max)`.** NOT headless SwiftShader. Desktop 1440×900 + mobile-twin 390×844, both modes.
- **Safari leg — REAL WebKit 26 (system `WebKit.framework`, Metal) via off-screen `WKWebView takeSnapshot`
  (`wkshot-live.m`, the protocol §5-sanctioned composite path, no Screen-Recording TCC needed).** 2880×1800
  (retina 2× of 1440×900), both modes. This is the real Safari engine, NOT Playwright bundled WebKit.
- **Served origin:** the vite **dev** server `:5199` (`npm run dev --port 5199`). NOTE: the protocol mandates
  the served **built** dist (`demo:dist`); that script does NOT exist at HEAD (it is wave 0.3
  `BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION`, PENDING). The dev-server origin is the available interim and is
  the proximate cause of the Safari content-absence below.
- **Capture box / harness gap:** the protocol's prescribed on-screen `screencapture -o -l <windowID>`
  window-mode is **TCC-blocked** in this environment (`could not create image from display/window` — Screen
  Recording denied to the agent process). The C18 `?capture=`+engine-badge deterministic harness is UNBUILT.
  The WKWebView off-screen snapshot is the §5 interim composite path used here.

## The pixel reads (the gate's own `reflect-capture-verify` decoder)

### Chrome (Apple M5 Max / Metal) — field probe `x=0.80,y=0.30,w=0.16,h=0.16`, top-bar `x=0.30,y=0.005,w=0.40,h=0.03`

| surface | mode | vp | field L | field C | field b | topΔ | localized defect |
|---|---|---|---|---|---|---|---|
| shell-aurora-field | light | desktop | 0.800 | 0.059 | **+0.002** | 0.034 | (warm edge) |
| shell-aurora-field | dark | desktop | 0.534 | 0.059 | **−0.003** | **0.194** | D5-TOP-BAR · D2-COLD-HUE |
| dock-overview | light | desktop | 0.717 | 0.076 | **−0.048** | **0.125** | D5-TOP-BAR · D2-COLD-HUE |
| dock-overview | dark | desktop | 0.543 | 0.075 | **−0.054** | **0.221** | D5-TOP-BAR · D2-COLD-HUE |
| glass-material | light | desktop | 0.766 | 0.074 | **−0.055** | 0.090 | D2-COLD-HUE |
| glass-material | dark | desktop | 0.523 | 0.077 | **−0.063** | **0.199** | D5-TOP-BAR · D2-COLD-HUE |

(mobile twins track the desktop reads within ±0.02 L / ±0.01 b; full set in
`reflect/BG.W-PAINT-IS-THE-GATE-measurements.json`.)

### Safari / WebKit 26 (Metal) — same probes

| surface | mode | field L | field C | field b | topΔ | note |
|---|---|---|---|---|---|---|
| shell-aurora-field | light | 0.803 | 0.058 | +0.021 | 0.005 | **route content ABSENT — shell-only** |
| shell-aurora-field | dark | 0.345 | 0.057 | +0.020 | 0.015 | **route content ABSENT — shell-only** |
| dock-overview | light | 0.803 | 0.058 | +0.021 | 0.005 | **identical to aurora → content never mounts** |
| dock-overview | dark | 0.345 | 0.057 | +0.020 | 0.015 | **identical → content never mounts** |
| glass-material | light | 0.803 | 0.058 | +0.021 | 0.005 | **identical → content never mounts** |
| glass-material | dark | 0.345 | 0.057 | +0.020 | 0.015 | **identical → content never mounts** |

The Safari field reads warm (b +0.02) and IDENTICAL across all three routes — diagnostic that the WebKit
render is the bare shell field; the per-route story content (`<RouterView>`) never mounts (the lazy story
chunk fails to render on the dev-server ESM origin in WebKit). The vue-router DID resolve (the bottom dock
highlights the correct route), so the divergence is the route component, not nav. Safari topΔ is LOW only
because there is no content/DockStage to diverge the top bar from — an ARTIFACT of the content-absence, NOT
evidence the D5 top-bar is clean.

## Defect localization (region → defect → fix wave)

1. **top-bar → D5-TOP-BAR.** A thin full-width top rule (black in light, magenta/purple in dark) + a top band
   divergent from the field. Chrome `topΔ` 0.12–0.22 (worst dark + dock-overview), far above the 0.10 max.
   Present in BOTH engines (the rule paints in Safari too). → WS1 `BG.W-SCROLL-PROGRESS-RAIL`.
2. **field (aurora lobe) → D2-COLD-HUE.** The aurora field carries a cold blue lobe; the field `meanB` is
   NEGATIVE on every dock/glass Chrome read (−0.05 to −0.06) and most aurora reads — a cold cast, not the
   warm-amber identity. → WS1 `BG.W-FIELD-AURORA`.
3. **field (dark shell) → cartoon-ink-maroon / dark-material.** The dark page reads a muddy maroon-brown→tan
   grain, not the luminous-dark transmissive material. → WS3 `BG.W-CARTOON-INK-GAMUT` + dark-material band.
4. **field (whole) → paper-grain over-application.** A heavy uniform `.paper-field` grain frames the whole
   field (dramatic in WebKit). → WS1 `BG.W-PAPER-GRAIN-OPTIN` / `BG.W-FIELD-AURORA` `.paper-field` surgical
   retire.
5. **route content (Safari) → cross-engine content-absence.** WebKit renders the shell only. Re-capture over
   the BUILT dist (wave 0.3 `demo:dist`) to disambiguate dev-server-ESM-vs-WebKit from a product defect.

## Why FAIL (and why the FAIL is correct)

- The gate's **device-free arm is GREEN** (14 self-test bites; the `topDelta`/ceiling/hue/localizer clauses
  are load-bearing). The born-RED Metal ground now RESOLVES ON DISK (18 PNGs, both engines, both modes).
  The wave's MACHINERY deliverable is met.
- The **surfaces read 4.2.0-broken** (D5-TOP-BAR, D2-COLD-HUE, maroon-dark, grain) — EXPECTED for a
  ground-freeze; this is the anchor the downstream waves clear. Per the §1 AND ("every surface reads
  correct"), the operative verdict is FAIL.
- The **dual-engine close is not yet bindable**: (a) `proof:ba-gestalt` is born-RED on `[ROSTER-PRESENT]` —
  `bg-gestalt-roster.md` is absent (wave 0.2); (b) the Safari leg must re-shoot over the BUILT dist (wave
  0.3 `demo:dist`); (c) the on-screen `screencapture` path is TCC-blocked + the C18 harness is unbuilt.

These three are the close-machine preconditions, NOT defects in this wave's committed gate code.
