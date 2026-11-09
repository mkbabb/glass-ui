# Dock cluster · spec summary (O-195 → W-I.8)

The spec is `docs/tranches/BL/waves/W-I.8.md`, and it ships in **11.2.0**. It cannot go in 11.1.0: it builds on two 11.1.0 lanes that are still closing (L1's plate border-width token and L5's O-198 reduced-motion cure), it edits `GlassDock.vue` and `shell.css`, which L1 just closed its record on, it adds a public export, and it owes the Safari-app cell, which blocks the release.

Neither proposal passed the A/B, so the spec takes a graft: proposal B's shared silhouette, proposal A's reduced-motion path, and three cures. Each cure was measured on a prototype under the A/B's own harness before the spec cited it (`spec-graft/`, rounds r1 to r5).

**The mechanism.** A `DockCluster` wraps ordinary GlassDock members and takes a `fused` prop, either one boolean or one entry per join. Each member keeps its own backdrop lens, and the lens spans the cluster box and is clipped to that member's share of one px `path()` silhouette, driven by `useDockSpring(DOCK_SPRING)`. Every lens paints before any ink.

**The three cures:**
- **The ink stays GlassDock's.** Each member's own `.dock-plate` paints its ink (tier, earned darken, grain) over its share, so the material is not forked. This cures B's light-mode band, where a later plate blurred the earlier plate's ink.
- **The lens splits into a blur lens and a tone lens.** The blur lenses paint first. The tone lenses (saturate, plus brightness in dark) paint after all of them, and a pointwise filter reads only the pixels under its own share. This cures the dark tone step, where one lens re-toned its neighbour's output.
- **Members sit on whole CSS pixels.** Chromium paints a clipped member plate at an offset rounded to a whole CSS pixel, so a member at x.5 left a field-coloured column at the cut.

**The rest of the design:**
- The corner is the dock's own 16 px, never a stadium.
- One rim and one shadow come from the whole silhouette.
- One shared luminance observer gives the whole cluster one tint.
- Reduced motion follows O-198: a WAAPI opacity dip of 144 ms or less over the material only, with the geometry snapped at the floor and the controls never fading.

**What the graft measured (r5):**
- Flat-field seam: 0 to 0.2 in both engines, against A's 7.7 and B's 6.6 at worst.
- Over content: join residue 1.7 to 7.2 against a member interior of 9.2 to 10.6. A measured 17 to 65.
- No `%` or elliptical radius in any of the 181 frames per cell.
- The accessibility tree, tab order and focus are identical through a fuse.
- Adding a control causes 0 px of overlap.
- Chromium layout during the morph: 0.

**What is still open:**
- The Safari-app blur cell. Playwright WebKit renders no backdrop blur, so this cell can only be decided in Safari.
- A WebKit frame-cost check at a quiet load. In the same runs at load 15 to 18, the graft's p95 was 15 to 20 ms and B's was 12 to 17 ms. The measured lever is the member plate's grain.

Gates I8-G1 to G14 are RED on master and GREEN on the branch, each with a measured bite where one exists. Daraksha's half: three members (Pages, Controls, Theme) under one DockCluster, fused while reading and through a page change, and split into three plates when the reader reaches for the dock. On a phone, the pages plate sits above a two-member cluster.
