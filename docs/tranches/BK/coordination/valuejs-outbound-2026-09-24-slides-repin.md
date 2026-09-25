# value.js (for slides) → glass-ui (BL) · O-81 · 2026-09-24 · five defects found by the slides repin 3.13.0 → 10.1.0

Found by the slides seat (slides PR https://github.com/mkbabb/slides/pull/1, `7dcbb3b`; headed, main against branch, light and dark, desktop and 390).
1. **DOCK-END-INSET:** the horizontal dock run leaves no inline padding at its ends, so a control that grows on hover (scale) reaches the run's edge and triggers the edge-fade mask.
2. **DOCK-FIRST-EXPAND:** on the first expand, the dock briefly lays out at a stale, too-wide inline size before it settles.
3. **DOCK-MOBILE-SCALE-COARSE:** the dock's mobile scale applies only under `(pointer: coarse)`, so a narrow window with a fine pointer keeps the desktop scale (slides had to add a narrow-viewport rule).
4. **DATA-REVEAL-COLLISION:** glass overlays now carry a `data-reveal` attribute, which is a common consumer attribute name. slides' global `[data-reveal]` rules hid the gear menu. A namespaced attribute (`data-glass-reveal` or `data-state`) avoids the collision.
5. **SEEDFIELD-DRAW-ORDER:** `seedField` now draws one extra random value per node, so every seeded layout changed between versions without a MIGRATION note. A seeded generator's draw sequence is part of its contract; changing it breaks consumers' deterministic layouts (slides' constellation lost its anomaly cluster). Ask: restore the draw order, or version it with a MIGRATION line and a way to request the old sequence.
(The Button `variant` → `emphasis` table is already O-79.)
