# BG.W-SHELL-DOCK-DRY — dual-engine paint DELTA

**Role:** NON-AUTHORING PAINT JUDGE (independent; did not build the wave).
**Date:** 2026-07-03 · **Branch:** tranche/BG @ `6bef3107`
**Route:** `/dock/overview` (canonical shell-dock capture route — the shell nav docks render on every route inside the demo shell).
**Method:** C18 dual-engine `?capture=` over BUILT `:5200` (vite preview, `dist-demo` built @ 00:06 — after the 23:55 HEAD commit, no uncommitted src/demo changes → provably fresh HEAD bytes). Chrome via real Chrome.app + CDP `:9466` (Playwright `connectOverCDP`, `deviceScaleFactor:2`, `colorScheme`); Safari via off-screen system-WebKit `wkshot-live` (polls `data-capture-ready` @4500ms, no TCC). Provenance = in-pixel engine badge decoded from pixels.

## VERDICT: PASS — both engines, both modes. DRY unification paints correctly + identically.

The two demo shell docks (`SidebarDock.vue` vertical rail + `BottomDock.vue` horizontal story bar) were DRY-unified onto the ONE `demo/shell/useShellNavDock.ts` composable (the shared route→facet resolver, `railItems` map, `railContext` SHELL-HOLD writable-computed, axis-agnostic `onFacetKeydown` roving, `openDockMorph` window-event dispatch). The build-proof gate `proof:dock` P1 (landing-semantics) verified the structural unification device-free; this DELTA is the owed PAINT proof. Both consumers mount and paint correctly, and their shared facet rail renders IDENTICALLY across engines and modes.

## Captures (4 PNGs on disk, 2880×1800 @2×, badge-decoded)

| PNG | dim | engine badge | GPU badge | mode |
|---|---|---|---|---|
| `BG.W-SHELL-DOCK-DRY-paint/shelldock-chrome-light.png` | 2880×1800 | CHROME | ANGLE Metal **Apple M5 Max** | LIGHT |
| `BG.W-SHELL-DOCK-DRY-paint/shelldock-chrome-dark.png`  | 2880×1800 | CHROME | ANGLE Metal **Apple M5 Max** | DARK  |
| `BG.W-SHELL-DOCK-DRY-paint/shelldock-safari-light.png` | 2880×1800 | **WEBKIT** | **Apple GPU** | LIGHT |
| `BG.W-SHELL-DOCK-DRY-paint/shelldock-safari-dark.png`  | 2880×1800 | **WEBKIT** | **Apple GPU** | DARK  |

Chrome GPU = real Metal (`ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, …)`), NOT SwiftShader. Safari = off-screen system `WebKit.framework` on `Apple GPU`, a DISTINCT engine (WEBKIT badge + visibly different WebKit font-metric wrap of the hero blurb). Inspection-scale + badge crops under `BG.W-SHELL-DOCK-DRY-paint/_inspect/`.

## Verification against the criteria

**Both shell docks present & paint (the DRY unification's two consumers both render).**
Chrome computed-DOM probe (both modes): `bottomDockPresent:true`, `sidebarDockPresent:true`. Visually confirmed in all 4 frames — the vertical `SidebarDock` category rail (left `<aside>`, category glyphs + the trailing morph/settings control group at the rail foot) AND the horizontal `BottomDock` story bar (bottom, persistent) both render.

**The shared `useShellNavDock` facet rail renders IDENTICALLY across engines/modes.**
All 4 frames show the same `DockStack mode="facets"` chip row — Liquid Morph · Dock Gallery · **Overview** (active-highlighted) · Dock Layers · Vertical Dock — with the pager arrows + the ⇄ morph-swap button. The `railContext` active-facet tracking is correct: on `/dock/overview` the **Overview** facet is the highlighted (selected-as-glass) chip in every capture. `openDockMorph` wiring paints the ⇄ control in both docks. Probe `facetChipCount:4` both modes (the windowed visible facet set); byte-consistent light↔dark.

**Computed-DOM checks (consistent both modes).**
`glContexts:1` — ONE live WebGL context (the recessive `DockStage` aurora field; the one-GL-context-per-route budget HELD; `canvasCount:2`, only 1 GL). `mainChildrenLen:3` (identical both modes). `animTimelineSupported:true`. `runningAnims:0` (settled static capture — the morph is at rest, no in-flight animation racing the snapshot). `bodyTextLen:4918/4917` (FULL route paint, not a bare shell). `captureReady:true` + correct `data-capture-mode` per frame.

**Gestalt (pixel reads).**
Recessive warm aurora field behind the dock demos — smooth warm-cream (light) / warm near-black transmissive (dark) wash, NO conic banding, NO oversaturation, grain calm. The **Overview** hero (display `<h1>` + blurb) fits its envelope in both engines/modes (WebKit wraps the blurb to 3 lines vs Chrome 4 on font-metric difference — both fit, no overflow). Dock demo cards (Collapsible pill, media-transport, select/dropdown) paint as liquid glass over the live field, both registers correct.

## Anti-evasion floor

All four declared capture paths RESOLVE ON DISK (2880×1800, 1.6–1.8 MB each). `node scripts/verify-siblings-intact.mjs --quiet` exits 0 BEFORE and AFTER the capture fan-out. No src/demo/style/script edited by this judge (record-don't-fix); only the DELTA + PNGs written under `docs/tranches/BG/audit/visual/` and the cursor row flipped in `EXECUTION-PROGRESS.md`.

**#9 in the 4.10 precond chain (PROTECT) — cleared on the PAINT axis.**
