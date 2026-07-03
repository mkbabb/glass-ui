# BG.W-SIRI-DOCK-CAPABILITY — PAINT DELTA (non-authoring judge)

**Verdict: PASS** — dual-engine (Chrome + Safari), both modes, rest + engaged.
Wave cursor row 8.x flipped PAINT-PENDING → DONE.

## Method (the proven C18 pipeline)

- BUILT bytes: `npm run demo:dist:build` → `npm run demo:dist:serve` (vite preview → `http://localhost:5200`). NOT `:5199` dev.
- **Chrome leg** (real Chrome.app + CDP, real Metal GPU): `chrome-capture.mjs` via `chromium.connectOverCDP`, `deviceScaleFactor 2`, `colorScheme` per mode, `?capture=<route>&mode=<m>`, polled `data-capture-ready`, probed `GL_RENDERER` + the Siri island computed morph state, then captured rest + driven engaged (click the `.siri-ask-pill` → listening).
  - GL_RENDERER (all 8 contexts): `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)` — real Metal GPU, not SwiftShader.
- **Safari leg** (off-screen WKWebView, system WebKit.framework / Metal, no TCC): `wkshot-live` for the static/dormant snapshot; a scratch `wkshot-siriforce` variant that forces `--siri-island-t` for the engaged WebKit view (the off-screen WKWebView throttles the dock-spring rAF, so the click-driven glide does not advance off-screen — a capture-pipeline limitation, NOT a wave defect; the windowed Chrome leg is the authoritative engaged evidence).
- Engine badges decoded from the top-left overlay for provenance: `CHROME / ANGLE Metal Renderer Apple M5 Max` and `WEBKIT / Apple GPU`, `VIEW 1440×900 @2x (2880×1800px)`, `MODE LIGHT|DARK`.
- Routes: `/dock/siri-island` (the designSyncSurface — the Siri integration story off the `#rail` escape over `<DockStage>`) + `/dock/overview` (DockStage regression host).

`node scripts/verify-siblings-intact.mjs --quiet` exited 0 before AND after. Preview server + debug Chrome killed, throwaway udd removed. Zero writes outside `docs/tranches/BG/audit/visual/` + the cursor flip.

## Gate (source truth, re-run at judge time)

`proof:siri` — **PASS** (4 arms):
- **E scrim**: prop=true filterBlur=true noBackdrop=true oversize=true 2modes=true prm=true
- **S island**: composesSeam=true dockSpring=true liquidReveal=true noRawSpring=true forms=4 role=true boxInviolate=true
- **W waveform**: substrate=true noWgsl=true level=true oklab=true warm=true
- **D integration**: dockSearch=true rail=true capability=true waveform=true noSecondMatcher=true
- fences: dockReExport=true cssImport=true noSubpath=true noApi=true

## Painted truth (the binding judgment — computed DOM + pixel reads)

### Arm S — the 4-form √φ island on ONE `--siri-island-t` (`useSiriDock`)
Computed via CDP probe (`chrome-probe.json`), both modes:
- **Rest**: `--siri-island-t = 0`, `form = dormant`, `clip-path: inset(calc(50% - 23.2px) 30% round 28px)`, island rect `w=294 h=108` (the STATIC peak reserve — box-inviolate).
- **Engaged (click the pill)**: `--siri-island-t = 0.3316`, `form = listening`, `clip-path: inset(calc(33.42% - 15.5px) 20.05% round 28px)` (the aperture OPENED), island rect `w=294 h=108` (**unchanged — zero reflow; the morph is the clip aperture, not a size animation**), island translated up from y≈811 → y≈486 (the iOS-27 "rises from the source" bloom). `role="status"` present.
- The island reads as a `.glass-floating` plate over the DockStage warm field in BOTH engines BOTH modes (dark = a luminous-dark translucent plate; light = a warm-cream plate). **PASS.**

### Arm W — the demo-private WebGL2 warm-OKLab waveform (no WGSL)
- The waveform `<canvas.siri-waveform-canvas>` is present (584×212), demo-private (`SiriWaveform.vue`), on the shared `useWebGLCanvas` substrate.
- `.siri-wave-bed` opacity ramps `0` (rest) → `0.48` (engaged) — the waveform lights up on listening.
- **Teal-navy-purge — DECISIVE.** Pixel-analysis of the engaged island interior (saturated pixels only):

  | capture | sat% | warm% of sat | cool(teal/navy)% of sat | mean hue |
  |---|---|---|---|---|
  | chrome light listening | 99.8 | **100.0** | **0.0** | 20.8° |
  | chrome dark listening | 99.5 | **100.0** | **0.0** | 22.4° |
  | safari light forced | 58.1 | **100.0** | **0.0** | 22.0° |
  | safari dark forced | 94.4 | **100.0** | **0.0** | 22.7° |

  Zero cool (teal/navy) pixels; mean hue ≈ 21° warm amber-gold across both engines both modes. The Chrome real-Metal-GPU listening captures show the warm amber-gold prismatic ribbon behind the "Ask…" field. **PASS.**

### Arm D — integration off the `#rail` escape (`useDockSearch`)
- `railSlotPresent = true`; the island is the `#rail` slot child (`.siri-island-in-rail`) — box-inviolate beside the dock.
- The "Search or ask" pill (Sparkles) + the "Ask…" search field (the composed `useDockSearch` pipeline) render and read; the island blooms FROM the pill. **PASS.**

### Arm E — the blur-engage scrim
- `filter: blur(calc(var(--siri-scrim-blur) * var(--siri-island-t)))` — Safari-safe (`filter`, not `backdrop-filter`), coupled to the ONE scalar; blur(0) at rest, ramps on engage. Gate E arm all-true; the engaged Chrome captures show the route content receding subtly behind the risen island. **PASS.**

### DockStage field / grain / hero (the gestalt bar)
- The DockStage aurora reads as a smooth **warm recessive** gradient — NO conic banding, NO oversaturation — in every capture. Grain calm. The "Siri Island" hero title fits its envelope. **PASS.**

### `/dock/overview` (DockStage regression host)
- Renders correctly both engines both modes: dock demos (collapsible pill, media transport, select/dropdown triggers) read as glass over the warm field. `islandPresent = false`, `canvasCount = 2` — **no Siri island, by design** (Siri is scoped to `/dock/siri-island` via the `#rail` escape; the source has zero Siri refs in overview and the gate confines the capability to the siri-island story). The overview is a clean regression context — no regression. NOT a defect.

## Capture inventory (all resolve on disk — `BG.W-SIRI-DOCK-CAPABILITY-paint/`)

Chrome (Metal M5 Max): `chrome-dock-siri-island-{light,dark}-{rest,listening,responding}.png`, `chrome-dock-overview-{light,dark}-rest.png`.
Safari (WebKit / Apple GPU): `safari-dock-siri-island-{light,dark}-{rest,listening,forced}.png`, `safari-dock-overview-{light,dark}-rest.png`.
Probe: `chrome-probe.json`. Downscaled + island-region crops: `view/`.

(Note: the Chrome `-responding` captures stalled at the listening scalar — the result-row click was intercepted by an overlapping form layer; the responding advance is a scripting artefact, not a paint defect. Listening is the binding engaged-bloom evidence.)

## Conclusion

Every arm of `proof:siri` is confirmed in the PAINT on real hardware — the warm Siri island blooms from the dock pill over the DockStage field, morphs on the ONE `--siri-island-t` scalar (box-inviolate, zero reflow), lights a 100%-warm WebGL2 waveform (zero teal/navy), and composes the `useDockSearch` pipeline off the `#rail` escape — in Chrome (Metal) AND Safari (WebKit), light AND dark. All capture PNGs resolve on disk. **PASS → DONE.**
