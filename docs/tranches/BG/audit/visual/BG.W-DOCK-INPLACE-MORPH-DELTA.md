# BG.W-DOCK-INPLACE-MORPH — dual-engine paint DELTA

**Role:** NON-AUTHORING PAINT JUDGE (independent; did not build the wave).
**Date:** 2026-07-03 · **Branch:** tranche/BG @ `f42b45ab`
**Routes:** `/dock/overview` (the in-situ SHELL in-place morph target — the real `<aside>` nav dock reshapes here on every route) · `/dock/morph-showcase` (the standalone two-real-dock weld story).
**Method:** C18 dual-engine `?capture=` over BUILT `:5200` (vite preview of a FRESH `demo:dist:build` — rebuilt this session from HEAD `f42b45ab`, no uncommitted src/demo changes; the built `dist-demo/assets/index-*.js` carries `dock-morph-bridge--inplace` + `shell-dock-morph-bridge` and NO `shell-dock-morph-goo`). Chrome via real Chrome.app + CDP `:9466` (Playwright `connectOverCDP`, `deviceScaleFactor:2`, `colorScheme`); Safari via off-screen system-WebKit `wkshot-live` (polls `data-capture-ready` @4500ms, no TCC). Provenance = in-pixel engine badge decoded from pixels. Plus a LIVE interactive CDP runtime probe (drives the real morph trigger to prove the flip fires — beyond the static settled snapshot).

## VERDICT: PASS — both engines, both modes. The in-dock button flips the REAL `<aside>` nav dock V↔H IN PLACE via the liquid teardrop; no modal, no synthetic-dual-DOM, no VT-crossfade.

The D13 headline is PAINTED-TRUE. The modal stage + the synthetic two-dock View-Transitions crossfade + the modal-local `#shell-dock-morph-goo` are DELETED; the teardrop is re-anchored to the canonical `#dock-morph-goo` mount; the `useDockOrientationMorph` driver's `boundOrientation`/`bridgeStyle` + the analytic-velocity 12-laws squish (`--dock-morph-v`) + the `.dock-morph-bridge--inplace` corner-pinned goo reshape the REAL shell `<aside class="demo-sidebar-rail">` in place. The static captures verify the settled endpoints + the structural deletions; the interactive runtime probe verifies the flip actually fires as a continuous scalar field (the historical "only the teardrop preview works / the crossfade snapped in one frame while `--dock-morph-t` stayed 0.000" defect is dead).

## Captures (8 PNGs on disk, 2880×1800 @2×, badge-decoded)

| PNG | dim | engine badge | GPU badge | mode |
|---|---|---|---|---|
| `BG.W-DOCK-INPLACE-MORPH-paint/inplacemorph-dock_overview-chrome-light.png` | 2880×1800 | CHROME | ANGLE Metal **Apple M5 Max** | LIGHT |
| `BG.W-DOCK-INPLACE-MORPH-paint/inplacemorph-dock_overview-chrome-dark.png`  | 2880×1800 | CHROME | ANGLE Metal **Apple M5 Max** | DARK  |
| `BG.W-DOCK-INPLACE-MORPH-paint/inplacemorph-dock_overview-safari-light.png` | 2880×1800 | **WEBKIT** | **Apple GPU** | LIGHT |
| `BG.W-DOCK-INPLACE-MORPH-paint/inplacemorph-dock_overview-safari-dark.png`  | 2880×1800 | **WEBKIT** | **Apple GPU** | DARK  |
| `BG.W-DOCK-INPLACE-MORPH-paint/inplacemorph-dock_morph-showcase-chrome-light.png` | 2880×1800 | CHROME | ANGLE Metal **Apple M5 Max** | LIGHT |
| `BG.W-DOCK-INPLACE-MORPH-paint/inplacemorph-dock_morph-showcase-chrome-dark.png`  | 2880×1800 | CHROME | ANGLE Metal **Apple M5 Max** | DARK  |
| `BG.W-DOCK-INPLACE-MORPH-paint/inplacemorph-dock_morph-showcase-safari-light.png` | 2880×1800 | **WEBKIT** | **Apple GPU** | LIGHT |
| `BG.W-DOCK-INPLACE-MORPH-paint/inplacemorph-dock_morph-showcase-safari-dark.png`  | 2880×1800 | **WEBKIT** | **Apple GPU** | DARK  |

Chrome GPU = real Metal (`ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)`), NOT SwiftShader. Safari = off-screen system `WebKit.framework` on `Apple GPU`, a DISTINCT engine (WEBKIT badge + visibly different WebKit font-metric wrap of both blurbs — Overview blurb wraps 3 lines WebKit vs 4 Chrome; the morph-showcase blurb wraps 4 WebKit vs 6 Chrome). Structural + interactive JSON: `chrome-results-inplacemorph.json`, `interactive-runtime.json`.

## Verification against the criteria

**The REAL `<aside>` shell dock reshapes IN PLACE — no modal, no synthetic dual-DOM, no VT (Chrome computed-DOM probe, all 4 static frames).**
`asidePresent:true` · `sidebarDockInsideAside:true` (the real `.glass-dock` IS a child of `aside.demo-sidebar-rail` — not a synthetic clone in a modal) · `asideOrientation:"vertical"` (the settled `[data-shell-dock-orientation]` resolves) · `inplaceBridgeAtRest:false` (correct — the `.dock-morph-bridge--inplace` teardrop mounts ONLY during the flight, absent at rest) · `morphStageModalAbsent:true` (no morph-path `role="dialog"` stage in the shell). Visually confirmed on `/dock/overview` in all 4 frames: the vertical left-rail `<aside>` SidebarDock (category glyphs + the trailing ⇄ morph / settings control group at the rail foot) AND the horizontal BottomDock facet bar (with its ⇄ morph-swap control) both paint over the live field — the real chrome, no overlay/scrim, no second synthetic dock.

**The teardrop is re-anchored to the canonical `#dock-morph-goo`; the modal-local `#shell-dock-morph-goo` is DELETED.**
`dockMorphGooPresent:true` · `shellDockMorphGooAbsent:true` in every frame. Grep of the FRESH built bytes: `dock-morph-bridge--inplace`/`shell-dock-morph-bridge` present, `shell-dock-morph-goo` absent.

**The morph ACTUALLY FIRES as a continuous scalar field (LIVE interactive CDP runtime probe on `/dock/overview`).**
Firing the in-dock `glass-ui-demo:toggle-dock-morph` trigger (the SAME window event both shell dock ⇄ buttons dispatch): `initialOrientation:"vertical"` → `settledOrientation:"horizontal"` → **`flipped:true`** (a REAL V→H reshape of the real `<aside>`, not a no-op). `--dock-morph-t` drove **tPeak 1.073** across **23 distinct sampled values** (`scalarDrove:true` — a continuous spring field with the snappy overshoot, NOT the historical one-frame VT crossfade that stuck at 0.000); the analytic-velocity squish engaged (`--dock-morph-v` vPeak 1.0 → `--stretch` peak **1.227**, the volume-preserving 12-laws squish); the `.dock-morph-bridge--inplace` teardrop MOUNTED during the flight (`anyBridge:true`, `anyMorphing:true`) with the goo teardrop filter `url(#dock-morph-goo)` engaged in the occluded midpoint window (`anyGooEngaged:true`). This closes the historical defect ("`/dock/morph-showcase` does not work at all, only the teardrop preview works").

**The standalone morph-showcase weld story paints (both engines/modes).**
The "Vertical ↔ Horizontal Morph" story renders the two-real-dock weld demo — the vertical dock pill at settled rest (`T = 0.000`), the "⇄ Morph to horizontal" trigger + the live scalar readout, the blurb confirming the scalar-field weld ("A scalar field has no topology — there is nothing to crossfade, no reflow to dodge"). Liquid glass over the warm field, both registers correct.

**Budget + settle facts (consistent both modes).**
`glContextCount:1` on `/dock/overview` (the recessive DockStage aurora — one-GL-context-per-route budget HELD) · `mainChildrenLen:3` (route root + sticky scroll-progress + sr-only announce, identical both modes) · `animTimelineSupported:true` (Chrome) · `runningAnims:0` (settled static capture — the morph at rest, T=0.000, nothing racing the snapshot).

**Gestalt (pixel reads).**
Recessive warm aurora field behind the dock demos — smooth warm salmon/cream (light) / warm transmissive near-black (dark), NO conic banding, NO oversaturation, grain calm. Both heroes ("Overview" · "Vertical ↔ Horizontal Morph") fit their envelope in both engines/modes (WebKit wraps the blurbs to fewer lines on font-metric difference — both fit, no overflow). Dock demo cards (collapsible pill, media-transport, select/dropdown, the vertical dock pill) paint as liquid glass over the live field, both registers correct.

## Anti-evasion floor

All eight declared capture paths RESOLVE ON DISK (2880×1800, 1.6–2.1 MB each). `node scripts/verify-siblings-intact.mjs --quiet` exits 0 BEFORE and AFTER the capture fan-out. No src/demo/style/script edited by this judge (record-don't-fix); only the DELTA + PNGs + probe JSON written under `docs/tranches/BG/audit/visual/` and the cursor row flipped in `EXECUTION-PROGRESS.md`.

**4.10 (the model-band tentpole, UNTOUCHABLE §4) — cleared on the PAINT axis.** The in-situ shell V↔H in-place morph paints + FIRES correctly, both engines, both modes; the modal/synthetic-dual-DOM/VT-crossfade deletions are confirmed absent in the live DOM + the fresh built bytes.
