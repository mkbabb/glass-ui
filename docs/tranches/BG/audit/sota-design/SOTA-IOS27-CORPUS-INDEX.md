# SOTA iOS-27 liquid-glass analysis — the CORPUS INDEX (for the future deeper pass, USER 07-04)

A future SOTA iOS-27 liquid-glass analysis (deferred — the current pass validated the plan) draws on
these. Located + indexed so the next pass starts from the corpus, not a search.

## OUR demo — captures + recordings (the "current" side)
- **1237 dual-engine PNGs** under `docs/tranches/BG/audit/visual/` — every paint-verified wave, real
  Chrome.app (Metal M5 Max) + real Safari.app/WebKit26, BOTH modes, `:5200` built bytes, in-pixel engine
  badge. The `<wave>-{chrome,safari}-<route>-{light,dark}.png` naming is the index.
- **Recorded liquid-morph GIFs**: `docs/tranches/BE/prototype/visual/{liquid-morph-expand,liquid-vh-morph}*.gif`.
- **Live re-capture**: `npm run demo:dist:build && demo:dist:serve` (:5200) + the C18 `?capture=` harness +
  CDP `Page.startScreencast` for gesture frame-series (the motion-truth rig).

## The iOS-27 REFERENCE (the "target" side)
- **Reference videos** (external, read-only): `~/Downloads/IMG_0751.MOV`, `IMG_0752.MOV`, `IMG_0751 2.mov`.
- **Reference frame ladders** (already extracted): `docs/tranches/BG/audit/ios27-motion-truth/ref/`
  (app-open-bloom · cc-engage-music · cc-entrance · cc-dismiss · sheet-bloom-open · sheet-collapse-livebehind ·
  maps-sheet-detent · maps-sheet-full · dock-fission-split · drillin-context).
- **The consolidated target table**: `docs/tranches/BD/viz/video-audit/IOS27-REFERENCE.md` (T1-T15) +
  the v1-v4 per-clip ANALYSIS.md.
- **The frame-by-frame verdict** (the baseline to EXTEND, never re-derive):
  `docs/tranches/BG/audit/ios27-motion-truth/IOS27-MOTION-TRUTH.md`.

## THE BINDING CONSTRAINT (USER, standing, absolute)
Everything operates **within the bounds of the modern web**: general CSS + HTML elements, **Safari-compatible
as of July 2026** (Safari/WebKit 26+, the C-SAFARI dual-engine paint gate is the enforcement). No effect
ships that only paints on one engine — the graceful base IS the design on a gap engine (the
NO-MASKING-FALLBACK CROSS-ENGINE-GAP category), never a JS polyfill or a legacy ladder. Every SOTA
refinement is expressed through general CSS the target engines SHARE, driven by our own kf/value facilities.

## The 3 folded SOTA rows are Safari-July-2026-safe (verified)
- `F2.5 W-GLASS-DEPTH-TIER` — a `--glass-depth` custom-property default mapping. Pure CSS var. ✓
- `F5.4 W-BACKDROP-BLUR-ENGAGE` — `filter`/`backdrop-filter` blur read off a CSS scalar. `backdrop-filter`
  is Safari 26+; the `url()` refract gap is already `@supports`-gated (13.2 C-SAFARI floor). ✓
- `F8.8 W-APCA-CONTRAST` — a build/test-time metric in the π paint-arm. No runtime surface. ✓
