# BG.W-SHEET-INSET-ROOT — paint DELTA (non-authoring W-REFLECT judge)

**Verdict: PASS** (dual-engine, both modes, all 3 routes, overlays OPEN + edge-pinned) — flip cursor `10.2` PAINT-PENDING → DONE.

- **Judge role:** non-authoring paint judge (did NOT build the wave). Verified the PAINTED truth against the Row-10.2 F6 verbatim paint criteria — *"PAINT rides W-REFLECT — Sheet gestalt + the configurator gear→Sheet drawer"* — plus the sheet-inset computed-DOM criteria (top===0 / edge-pinned / on-screen / no fixed-breaking ancestor over the teleported content, both modes) and the emission-inverse shipped-CSS truth.
- **Method (proven C18 pipeline over BUILT bytes):** `npm run demo:dist:build` (fresh from HEAD `6db21b08`, 1.04s) → `vite preview :5200`. Because the paint IS the OPEN overlay (the Sheet is trigger-controlled — no route auto-opens it), each capture CLICKS the trigger by accessible name, then snapshots the settled frame. Under `html[data-capture]` **all animations/transitions are killed** (`capture.css`), so a clicked overlay JUMPS to its settled OPEN edge-pinned frame instantly — no spring to race. Chrome via CDP (headed real Chrome 149, `chromium.connectOverCDP`, 1440×900 @2x, playwright `.click()` on the trigger, then screenshot + a computed-DOM inset probe). Safari/WebKit via a **click-then-snapshot** off-screen WKWebView variant of `wkshot-live.m` (system WebKit.framework / Metal; injects mode, polls `data-capture-ready`, `evaluateJavaScript`-clicks the trigger by accessible name, 1.1s settle, `takeSnapshotWithConfiguration`). Both shooters are scratchpad capture tooling — NO src/demo/styles/scripts edit.
- **Triggers clicked** (confirmed by the shooters' `clicked:…` echo): sheet → **Open Right** (side sheet, full-height, right-pinned); configurator → **Open the glass-ui demo configurator** (the dock GEAR → opens the PresetEditor as a right-edge **Sheet** — this IS the "gear→Sheet drawer"); drawer → **Open drawer** (the house `.glass-drawer`, snap=1).
- **Provenance (in-pixel engine badge, decoded top-left of every PNG):** Chrome = `ENGINE CHROME / GPU ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max) / @2x` · Safari = `ENGINE WEBKIT / GPU Apple GPU / @2x`. Both real-GPU (Metal), not SwiftShader.

## Routes × engines × modes (12 captures, all resolve on disk, 2880×1800)

| Route (overlay) | Chrome light | Chrome dark | Safari light | Safari dark |
|---|---|---|---|---|
| `/containers/sheet` (Right Sheet) | PASS | PASS | PASS | PASS |
| `/compositions/configurator` (gear→Sheet) | PASS | PASS | PASS | PASS |
| `/containers/drawer` (`.glass-drawer`) | PASS | PASS | PASS | PASS |

PNGs: `docs/tranches/BG/audit/visual/BG.W-SHEET-INSET-ROOT-paint/{chrome,safari}-{sheet,configurator,drawer}-{light,dark}.png` (12 files, each 2880×1800, verified on disk).

## The BINDING computed-DOM inset truth (Chrome, both modes — `chrome-results.json`)

The core of the wave: the `sheetVariants` CVA geometry was STRIPPED and re-expressed as the precompiled `:where([data-slot=sheet-content][data-side]) { position/inset/size }` rules shipped through `/styles`. The opened overlay must be `position:fixed`, edge-pinned, `top===0`, on-screen, teleported to `<body>`, with NO transform/filter/contain ancestor over the portaled content.

| Overlay | node | position | inset | top | onScreen | broken ancestor | parent=body | role |
|---|---|---|---|---|---|---|---|---|
| sheet (right) | `[data-slot=sheet-content][data-side=right]` | fixed | `0 0 0 1056px` | **0** | ✅ | **none** | ✅ | dialog |
| configurator gear→Sheet | `[data-slot=sheet-content][data-side=right]` | fixed | `0 0 0 1056px` | **0** | ✅ | **none** | ✅ | dialog |
| drawer | `.glass-drawer` | fixed | `0` (full-vp container) | **0** | ✅ | **none** | ✅ | dialog |

- **`top===0` / edge-pinned:** the right Sheet resolves `inset: 0 0 0 1056px` → top 0, right 1440 (=vw), bottom 900 (=vh), width 384 (75% clamp → max-width 24rem), full height — edge-pinned to the right with no top gap. The drawer container is `inset:0` and the content rides `translateY(calc((1 - var(--glass-drawer-t, 1)) * 100%))` whose **CSS fallback `1` keeps it OPEN** even where an off-screen WKWebView throttles the rAF spring (verified: Safari drawer captures render open).
- **No fixed-breaking ancestor:** every overlay teleports to `<body>` (`parentIsBody:true`) with `brokenAncestor:none` — no transform/filter/perspective/contain/will-change ancestor could clip a `position:fixed` child. The D7 configurator-drawer root fix holds.
- **Glass, not opaque:** sheet bg `oklab(0.936 … / 0.808)` light / `oklab(0.380 … / 0.894)` dark — translucent; backdrop `blur(13px) saturate(1.6)` (light) / `blur(13px) saturate(1.28) brightness(1.1)` (dark, the W-DARK-MATERIAL luminosity companion). The page reads through the scrim in every capture.

## Painted gestalt (pixel reads, both engines both modes)

- **Sheet:** the "Right Sheet" panel slides to the right edge, full-height, warm-cream translucent glass (light) / luminous warm-dark transmissive glass (dark), title + description + Name input + Notes textarea + Cancel/Save-changes + close-X, the page dimmed behind by the scrim. Reads unmistakably as an edge-pinned glass side-drawer.
- **Configurator gear→Sheet drawer:** the dock GEAR opens the "glass-ui demo Configurator" as a right-edge Sheet — Appearance section (DarkModeToggle sun/moon glyph, Glass-level 1.00 + UI-scale 1.00× sliders, Reduce-motion toggle) + Preset section (Glass-UI default / Neutral / Custom) + footer (`glass-ui-demo-config` · Reset all). Edge-pinned, glass, scrim over the configurator page behind. The exact "gear→Sheet drawer" gestalt the criteria names.
- **Drawer:** the `.glass-drawer` opens to snap=1 (full height) with the rounded grip handle top-center, the snap-fraction buttons at top, the "Close" footer pinned to the bottom edge, warm glass, page dimmed behind.
- **Cross-engine parity:** Chrome (ANGLE Metal M5 Max) ↔ WebKit (Apple GPU) render the same layout, edge-pin, and content for all three overlays in both modes. WebKit's plate reads a hair more solid (the classic backdrop-filter compositing difference) but the glass gestalt + inset are faithful.

## Shipped-CSS + gate corroboration (the emission-inverse)

- **The precompiled inset rule SHIPS in the built bundle** (`dist-demo/assets/index-QReHeD9E.css`): `:where([data-slot=sheet-content]){z-index:var(--z-modal);position:fixed}` + `:where([data-slot=sheet-content][data-side=right]){width:75%;height:100%;top:0;bottom:0;right:0}` (and top/bottom/left) + the `max-width:24rem` clamp. Exactly the `top:0` edge-pin the criteria demands — no consumer-JIT-dependent utility.
- **The `sheetVariants` CVA geometry is STRIPPED:** `src/components/ui/sheet/*.ts` carries 0 occurrences of `fixed`/`inset-x`/`inset-y`/`z-modal` (the W6 emission-inverse).
- **`proof:emission` GREEN 16/16** on the integrated tree (re-run for corroboration), incl. `sheet-cva-geometry-stripped` · `sheet-positioning-in-built-css` · `sheet-content-mints-data-slot-side` · `overlay-content-forwards-portal-attrs` (SheetContent **+ DrawerContent** — the W7 PORTAL-ATTRS `inheritAttrs:false`+`...$attrs`) · `sheet-inset-self-test-bites` · `sheet-inset-pi-spec-exists`.

## Verdict

Every surface reads correct in BOTH engines (Chrome ANGLE-Metal + system WebKit/Apple GPU) and BOTH modes; every overlay opens edge-pinned, `top===0`, on-screen, teleported to `<body>` with no fixed-breaking ancestor; the precompiled inset CSS ships in the built bytes; the gate is GREEN 16/16; all 12 capture PNGs resolve on disk at 2880×1800. **PASS** → flip cursor `10.2` PAINT-PENDING → DONE.
