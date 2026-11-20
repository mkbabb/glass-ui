# Orchestrator note — the Slider geometry cure joins 11.0.2 (owner, 2026-11-12 17:14)

The owner, three times today, the last marked expedite: "the sliders need refinement from glass-ui, expedite, mark."; "the glass-ui slider thumb should be more filled to the slider, taking up the full height"; "the granular UI sldier from glass-ui is not rounded properly ... Think of it again from first principles in glass-ui."

This is BINDING and joins this release. Group C takes it last; if group C has closed, the next fix seat takes it; a critic that finds it absent files a blocking defect.

1. Read, on master in the main checkout (read-only): `docs/tranches/BL/waves/W-B.18.md` (the section "11.1.1, the geometry cure" and rulings R-1 to R-8 as far as they apply to it), `docs/tranches/BL/design/slider/BRIEF.md`, `MEASURE.md`, `PROTOTYPE.md`, `challenge.md`, and `fold.md` if it exists (it supersedes where it differs). The prototype's diff is `docs/tranches/BL/design/slider/prototype/prototype.patch`; the frames are in `docs/tranches/BL/design/slider/owner/` (PNGs, untracked).
2. Land ONLY the geometry cure: `src/components/slider/styles.css` and the comment over the size tokens. No prop, no token name, no DOM node changes; O-273's `--slider-thumb-bg` stays. Thumb diameter equals the track and fill height; the thumb is concentric with the fill's end cap and with the track's end at 0 and at 100; fill and track heights are equal by rule; both orientations, every size, the spectrum variant by the same law where the spec says so.
3. Gates, Chromium and WebKit, light and dark, at values 0, 1, 5, 25, 50, 95, 99, 100: concentricity within 0.5 px; fill height equals track height; the thumb's diameter equals the track height; forced-colors focus (O-267) still passes; the Slider's existing unit and e2e specs pass; RED on v11.0.1, GREEN on the branch.
4. The CHANGELOG says, in consumer words, that the thumb now fills the track and that `--slider-thumb-size-*` no longer resizes a scrubber's thumb (set `--slider-track-height-*`).
5. Nothing of the expanded view, the transform mechanism or the press deform's removal beyond what the geometry cure itself requires: those stay 11.2.0.

## Added 2026-11-12 19:02 — the design loop has finished

W-B.18 is folded (master 9504737d3; `docs/tranches/BL/design/slider/fold.md` supersedes where it differs). The prototype is on branch `bl/slider/proto` in `.claude/worktrees/bl/slider/proto` (read-only for you): 87b3d259c is the geometry cure alone, styles only; the fold's commit fe30f9882 amends it. Take the geometry cure from those two, limited to what item 2 above allows, and re-measure it here; do not take fcea8de25 (the 11.2.0 mechanism and `expand`). Known open: the reduced-motion fade still cuts, from the library's own carve; that is not this row's.
