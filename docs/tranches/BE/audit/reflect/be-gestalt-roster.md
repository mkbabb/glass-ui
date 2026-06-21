<!-- be-gestalt-roster — the holistic per-surface acceptance LEDGER for the BE
  liquid-dock re-architecture (the dock-hallmark band: bloom · island-fission ·
  rail-facet · player · vertical · jubilance).

  This is the load-bearing artefact the BE arm of `proof:ba-gestalt`
  (scripts/proof-ba-gestalt.mjs) reads once BE.W-GESTALT-ROSTER-BE re-points the
  gate consts at the BE tree. It enumerates the BE dock-hallmark acceptance
  surfaces, each owed a whole-page capture in BOTH modes over its real backdrop
  plus a recorded GESTALT verdict — the holistic "does this look right as a
  liquid-glass dock?" read ABOVE the per-mechanism π readback (a per-mechanism π
  verifies a pixel ΔL / a compositor-only assert; it cannot verify the GESTALT —
  "the chip TELEPORTS instead of budding off" is a relationship judgement, not a
  contrast delta).

  SCOPE OF THIS FILE (the WF band-1 dock-hallmark rows). This roster carries the
  SIX dock-hallmark surfaces the liquid-dock BE re-architecture mints — the
  bloom-up FLIP, the 1→N island fission, the realized rail-facet carousel, the
  now-playing player register, the vertical content-reflow register, and the
  jubilance FLOOR (ripple/splash/celebration). The full BE close oracle
  (BE.W-GESTALT-ROSTER-BE) GROWS this set with the carried-forward 13 REQUIRED BC
  surfaces + the remaining iOS-27 extras (nowplaying-pill/card-bloom/iconchip-
  glass/aurora-artwork/tinted-chip/lens-safari/deshadcn-form) and re-points the
  gate consts (REFLECT_DIR/ROSTER/WAVES_DIR/TRANCHE_DIR) at the BE tree; that
  wave is the gate-re-point owner. This file is the dock-hallmark seed it grows.

  BORN-RED by construction. Every verdict below is FAIL at the BE band-1 state,
  anchored to the WF prototype/integration captures under
  docs/tranches/BE/audit/visual/ (the build-agent paint-verification deltas —
  the prototype's 4 user defects FIXED, but these are PROTOTYPE-route captures,
  NOT the fresh whole-page LIVE-motion :5199 set the per-wave discipline owes).
  The gate's OPERATIVE state is the AND of the per-surface verdicts; a row is
  PASS only when its painting wave re-captures a fresh whole-page set in BOTH
  modes, the pixel-read clears the warm-glass band, and the per-surface
  surface-hash is fresh. A PASS with a missing/zero-byte capture is the
  close-class lie, mechanically forbidden (the W-GESTALT-GATE2 G1 floor).

  CONSUMER CONTRACT (the per-wave discipline — NO single flipper, NO terminal
  reflect funnel; the BC anti-disease law). Each dock-hallmark wave flips its OWN
  row FAIL→PASS at its OWN close by: (1) capturing a fresh dated LIVE-motion :5199
  set (4 PNGs: {light,dark}×{desktop,mobile}, NEVER reducedMotion:reduce);
  (2) recording the pixel-readback table in its DELTA; (3) re-pointing
  capture-light/capture-dark off the WF prototype anchor to the fresh whole-page
  capture under docs/tranches/BE/audit/reflect/<surface>-{light,dark}-desktop-
  full.png; (4) re-stamping its per-surface freshness header
  (docs/tranches/BE/audit/reflect/<surface>.md surface-hash) to the fresh source
  bytes. The gate DERIVES the verdict from the pixels.

  SCHEMA — the gate parses the ROSTER table below. Each data row is:
    | surface | routes | capture-light | capture-dark | probe | expect | verdict | ground-anchor |
  where:
    - surface       : the canonical BE dock-hallmark surface name.
    - routes        : the demo route(s)/story the surface covers (informational).
    - capture-light : the light-mode whole-page capture path, repo-relative.
                      Born-RED: points at the WF prototype/integration delta
                      (no fresh whole-page BE capture exists yet). The gate
                      asserts this path RESOLVES ON DISK for an operative PASS.
    - capture-dark  : the dark-mode whole-page capture path, repo-relative. Same
                      resolve rule. Where a dark WF delta does not yet exist the
                      cell points at the nearest dark prototype capture, to be
                      re-pointed to the fresh dark whole-page set at the flip.
    - probe         : the pixel-probe box (fractional x,y,w,h of the capture) the
                      gate reads.
    - expect        : the expected pixel band (the warm-translucent-glass floor).
    - verdict       : FAIL | PASS (any other value reds the well-formedness check).
    - ground-anchor : the FAIL baseline a flip clears (BE-net-new — no BC
                      predecessor surface, AUTHORED FRESH for the BE band).
-->

# BE gestalt acceptance roster — the dock-hallmark band, born-RED against the WF prototype ground

Every BE dock-hallmark surface, each owed a fresh whole-page LIVE-motion :5199 capture set
in BOTH modes over its real backdrop, a probe region + an expect pixel band, and a recorded
gestalt verdict DERIVED from the captured pixels. The operative gate result is the AND of
the per-surface verdicts and resolves RED until every row is PASS with the pixel-read inside
the warm-translucent-glass band over a fresh whole-page source.

**The prototype ground.** Every row below anchors its FAIL to the WF prototype/integration
delta under `docs/tranches/BE/audit/visual/` — the build-agent paint-verification of the
liquid-dock mechanism (the bloom FLIP, the goo neck, the rail facet, the player register).
These are PROTOTYPE-route captures: the mechanism reads correct, but the roster owes a fresh
WHOLE-PAGE both-mode :5199 capture per surface (the per-wave discipline) before a verdict
flips. The painting wave lands warm-cream translucent glass (`meanChroma >= 0.02`,
`meanAlpha < 0.70`) and the gate flips the verdict only when the pixel-read confirms it.

## ROSTER

| surface | routes | capture-light | capture-dark | probe | expect | verdict | ground-anchor |
|---|---|---|---|---|---|---|---|
| dock-bloom | /dock/liquid-playground (the search/player bloom-up FLIP); the dock-gallery bloom destinations | docs/tranches/BE/audit/visual/integration/search-bloom.png | docs/tranches/BE/audit/visual/integration/dark-island.png | x=0.30,y=0.30,w=0.40,h=0.40 | meanL=0.30..0.99;meanChroma>=0.02 | FAIL | BE-net-new (the bloom-up FLIP destination field — the search/player panel must BLOOM from its dock trigger, not pop; prototype delta only, no fresh whole-page both-mode capture) |
| island-fission | /dock/liquid-playground (the 1→N goo island carve); the dock-gallery fission host | docs/tranches/BE/audit/visual/integration/island-neck.png | docs/tranches/BE/audit/visual/integration/dark-island.png | x=0.30,y=0.30,w=0.40,h=0.40 | meanL=0.30..0.99;meanChroma>=0.02 | FAIL | BE-net-new (the goo-neck stretch-and-snap fission — the two halves must NECK apart through the goo bridge then SNAP-BACK recoil, reading as ONE warm-glass metaball body mid-carve; prototype delta only) |
| rail-facet | /dock/liquid-playground + the shell SidebarDock/BottomDock rail (the realized floating tinted-glass facet carousel) | docs/tranches/BE/audit/visual/rail/horizontal-dock-facet.png | docs/tranches/BE/audit/visual/rail/vertical-dock-facet-dark.png | x=0.05,y=0.40,w=0.30,h=0.20 | meanL=0.30..0.99;meanChroma>=0.02 | FAIL | BE-net-new (the floating detached-glass facet strip — the box-inviolate carousel of per-facet `--glass-accent` chips along the seam hairline, extending past the dock edge into the gutter; prototype delta only) |
| player | /dock/liquid-playground (the collapse-to-media now-playing register); the player-bloom destination | docs/tranches/BE/audit/visual/integration/player-bloom.png | docs/tranches/BE/audit/visual/integration/dark-island.png | x=0.30,y=0.30,w=0.40,h=0.40 | meanL=0.30..0.99;meanChroma>=0.02 | FAIL | BE-net-new (the now-playing media register — the art-chip + transport read as warm glass, the album-hue tint reads on the surface, the player blooms from the dock; prototype delta only) |
| vertical | /dock/liquid-playground (the vertical content-reflow register); the vertical player + vertical rail facet | docs/tranches/BE/audit/visual/integration/vertical-player.png | docs/tranches/BE/audit/visual/rail/vertical-dock-facet-dark.png | x=0.05,y=0.20,w=0.25,h=0.50 | meanL=0.30..0.99;meanChroma>=0.02 | FAIL | BE-net-new (the vertical orientation as a CONTENT-REFLOW, never a `display:none` amputation — the column dock + vertical rail facet + vertical player read as warm glass on the cross-axis; prototype delta only) |
| jubilance | /dock/liquid-playground (the FLOOR delights — fission ripple, merge splash, celebration burst); the bloom destinations | docs/tranches/BE/audit/visual/integration/search-bloom.png | docs/tranches/BE/audit/visual/integration/dark-island.png | x=0.30,y=0.30,w=0.40,h=0.40 | meanL=0.30..0.99;meanChroma>=0.004 | FAIL | BE-net-new (the jubilance FLOOR — the fission ripple's warm-cream specular ring + the merge splash's earned-gold flash + the celebration glass-petal bloom, the §6 calm-whisper register, never disco; prototype delta only, no fresh whole-page both-mode capture of the delight at peak) |
