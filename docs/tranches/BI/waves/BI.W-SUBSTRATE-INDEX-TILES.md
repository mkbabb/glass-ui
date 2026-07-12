# BI.W-SUBSTRATE-INDEX-TILES — the /substrates index previews are real-component-derived, not low-quality rasters

Band B6 (storybook meta-system). Born-RED at HEAD.

## Mandate

- **UF-E9** "All of the preview images hereof are stunningly low quality, and must be real components instead." (/substrates index tiles). [Section-E surface, band-assigned to B6 per the charter — the storybook-index-tile mechanism.]
- Ledger **WS5-01** "/substrates previews work (live, animate)" — REGRESSED / UNADDRESSED (UF-E9/F1 stills low-quality).

## Design

The /substrates index tiles are the SAME tile mechanism W-LIVE-TILES lands — this wave CONSUMES the resolution ladder, it does not fork a second one (KISS/DRY). The `story/PASS-1.md` §4.3 ladder applied to the substrate index: a GL-viz preview cannot mount a live GL context on an index (the 0-GL landing budget — G5, `CLAUDE.md` §BA.W-STAGE one-GL-per-route), so the honest fix is the HIGH-FIDELITY frozen still rastered off the REAL viz generator (`vizPreviewStill.ts` — a DISTINCT (pattern,hue,seed) still per viz, a parked Canvas2D frame, NOT a low-quality pre-baked PNG), and the non-GL substrate previews render as real scaled components. "Real components instead" is honored by the still being derived from the real viz field (the luminance-faithful `auroraFallbackGround`/characteristic-generator raster), never a stock low-res image — a masking-fallback (a picture of a broken thing) is forbidden.

Coordination with B5 (D-VIZ): the substrate set SHRINKS this tranche — `dot-flow-field`, `concentric`, `dot-matrix` are DELETED (UF-E8, band B5). This wave's index reflects the post-deletion set (three tiles gone), and its still-ladder covers only the surviving vizzes (aurora / blob / fourier-field / constellation / glass-material / paper-grid / liquid-grid). This wave lands AFTER the B5 deletions (the index census is post-prune — the FAM-13 sequencing law).

## Work

- `demo/stories/substrates/` index + `demo/chassis/landing/SectionPreviewCard.vue` (shared with W-LIVE-TILES) — resolve each surviving substrate's tile via the ladder: a high-fidelity frozen still off `vizPreviewStill.ts` for the GL viz, a real scaled component for the non-GL.
- `demo/chassis/landing/vizPreviewStill.ts` — ensure each surviving substrate route resolves a DISTINCT recognizable still (the characteristic generator per viz); drop the deleted `dot-flow-field`/`concentric`/`dot-matrix` recipes.
- Verify the index reflects the B5-deleted set (no tile for a deleted viz; no orphan still recipe).

## Acceptance

Gate: **`proof:story-tiles`** substrate-index arm (EXTENDS the W-LIVE-TILES gate) — GREEN at close (BORN-RED at HEAD: UF-E9 low-quality stills live; deleted-viz recipes still present).

Clauses (added to W-LIVE-TILES's proof:story-tiles):
- ST1 each /substrates index tile is a real-component-derived preview (a high-fidelity frozen still off the real viz generator, or a live non-GL component) — no low-quality stock raster, no shared silhouette.
- ST2 the 0-GL budget holds on the /substrates index (a live `getContext('webgl2')`/`getContext('webgpu')` count == 0 — frozen stills, not live contexts).
- ST3 the index reflects the B5-deleted set — NO tile or still recipe for `dot-flow-field`/`concentric`/`dot-matrix`; every surviving substrate resolves a distinct still.
- Self-test bite: a re-added `dot-flow-field` tile reds ST3; a live `<Aurora>` on the index reds ST2; a shared/duplicate still across two substrates reds ST1.

## π/DELTA

- **The /substrates index reads as real previews** — each surviving substrate tile shows a distinct high-fidelity still (aurora/blob/fourier-field/constellation/glass-material/paper-grid/liquid-grid), no low-quality raster, 0 live GL contexts on the index; Chrome + real-Safari, both modes.

## Obligations

- **Sequencing (FAM-13)**: lands AFTER the B5 viz deletions (`dot-flow-field`/`concentric`/`dot-matrix` retired) — the index census is post-prune. Coordinate the still-recipe drop with B5's `W-VIZ-DELETE`.
- **STABLE-Safari** (SAF-1): the still fidelity on real Safari.app.

## Dispositions

- Terminalizes **UF-E9** / **WS5-01**. Consumes the W-LIVE-TILES tile mechanism (no second ladder). The live-animate-preview ask (WS5-01 "live, animate") is answered by the honest 0-GL frozen still — a live GL preview on a multi-tile index violates the one-GL-per-route budget (the recorded bound; a single live substrate is the studio ROUTE, not the index tile).
