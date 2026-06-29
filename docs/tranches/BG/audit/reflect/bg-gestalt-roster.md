<!-- bg-gestalt-roster — the holistic per-surface PIXEL acceptance LEDGER (BG.W-GESTALT-ROSTER-RE-POINT).

  This is the load-bearing artefact `proof:ba-gestalt` (scripts/proof-ba-gestalt.mjs)
  reads — a PIXEL reader, ci-blocking (`["local","ci","release"]`). It enumerates the
  10 named BG acceptance surfaces, each owed a fresh dated LIVE-motion :5199 capture set
  in BOTH modes over its real backdrop, a `probe` region + an `expect` pixel band, and a
  recorded GESTALT verdict mechanically DERIVED from the captured pixels — never
  author-asserted prose.

  RE-POINTED at BG (BG.W-GESTALT-ROSTER-RE-POINT). The two changes from the BC roster:

  1. The `routes` cells are DERIVED, not a hand-list. `scripts/lib/surface-closure.mjs`
     `routeSeeds()` parses each `routes` cell's `/cat/story` tokens and RESOLVES them to
     `demo/stories/<cat>/<story>.vue`. A 2-segment route token whose SFC does NOT exist
     on disk is a HARD-RED surfaced by `proof:ba-gestalt` as a `[ROUTE-RESOLVES]`
     violation (a typo'd story slug can no longer vanish from the watched surface). A
     1-segment `/cat` resolves the generic `SectionLanding.vue`; free prose without the
     slash-pattern (the cross-repo / shell rows) yields no token + no HARD-RED. Every
     route below resolves on disk — the route-resolution arm is GREEN; the gestalt
     verdicts stay born-RED (see below).

  2. The hardcoded `REQUIRED_SURFACES` completeness array is PURGED (done at
     BG.W-PAINT-IS-THE-GATE). The gate reads + pixel-reads whatever this roster declares;
     there is no hand-maintained per-tranche surface array to drift.

  BORN-RED by construction: every verdict below is FAIL, anchored to the 4.2.0 Metal
  ground the BG.W-PAINT-IS-THE-GATE wave captured (the aberrant full-width top bar / the
  gray→metallic field / the flat near-black dark void). There is NO PASS replacement and
  NO single authorized flipper: each BG paint wave flips its OWN row FAIL→PASS at its OWN
  close by capturing a fresh dated LIVE-motion :5199 set, recording the pixel-readback,
  re-pointing capture-light/capture-dark off the Metal ground to the fresh warm capture,
  re-stamping the per-surface freshness header (docs/tranches/BG/audit/reflect/
  <surface>.md surface-hash), and letting the gate DERIVE the verdict from the pixels.
  A NON-AUTHORING agent judges the paint (the building agent never flips its own row).
  There is NO terminal reflect wave — the close is the UNION of per-wave verdicts.

  BG-DATED: 2026-06-28 (BG.W-GESTALT-ROSTER-RE-POINT). Every capture cell names the BG
  surface's own `<surface>-{light,dark}-desktop-full.png` target the non-authoring agent
  fills; the ground-anchor cell cites the BG.W-PAINT-IS-THE-GATE 4.2.0 Metal evidence
  (dock-overview / glass-material / shell-aurora-field already on disk; the rest land at
  flip time).

  OVER-REVOKE DISCLOSURE (G7): the surface-hash freshness is a CONSERVATIVE auto-revoke —
  ANY byte change to a row's `surface-paths` (even a benign comment-only edit) drifts the
  hash and reverts a PASS to FAIL. This is deliberate: the gate cannot tell a cosmetic
  edit from a paint change, so it errs toward re-capture (a false-revoke costs a re-shot
  capture; a false-keep ships a stale PASS — the close-class lie). A row that re-FAILs on
  a benign edit is RE-VERIFIED by a fresh capture + re-stamp, never by deleting the header.

  PNG↔HASH SCOPE BOUNDARY: the per-surface `surface-hash` hashes the painting SOURCE bytes
  (the `surface-paths` files), NOT the capture PNG bytes. The two freshness axes are
  DISJOINT: the source-hash detects a painting-source DRIFT since capture (G7 auto-revoke);
  the captures are the PIXEL evidence the band is read against (G1/G5). A PASS needs BOTH —
  a fresh source (hash matches) AND a warm-translucent pixel-read over that source. The
  ship-attestation spine's surfaceHash (the surface-closure.mjs SOURCE + the transitive
  paint-closure file LIST) is a THIRD, separate axis owned by BG.W-SHIP-DISCIPLINE-LIVE-
  PRECONDITION — it detects the SET of paint surfaces changing, not a single surface's bytes.

  SCHEMA — the gate parses the ROSTER table below. Each data row is:
    | surface | routes | capture-light | capture-dark | probe | expect | verdict | ground-anchor |
  where:
    - surface       : the canonical BG surface name.
    - routes        : the demo route(s) the surface covers (semicolon-separated). The
                      `/cat/story` tokens are DERIVED-resolved by surface-closure.mjs;
                      free prose (the shell / cross-repo rows) is informational.
    - capture-light : the light-mode LIVE-motion :5199 capture path, repo-relative.
    - capture-dark  : the dark-mode LIVE-motion :5199 capture path, repo-relative.
    - probe         : the fractional FIELD probe box `x=,y=,w=,h=` ∈ [0,1] (the backdrop /
                      glass-plate band, declared AWAY from content so a high-chroma content
                      rainbow never trips the field ceiling). An OPTIONAL `tx=,ty=,tw=,th=`
                      TOP-BAR box localizes the D5 aberrant-top-bar defect (`topDelta`).
    - expect        : the warm-translucent pixel band, e.g.
                      `meanL=0.40..0.99;meanChroma>=0.020;meanChroma<=0.22;topDelta<=0.12`.
                      The chroma FLOOR rejects the gray slab (D-grey); the chroma CEILING
                      rejects the metallic over-correction (D2-metallic); `topDelta`
                      localizes the D5 top-bar/field divergence. Evaluated on a PASS only.
    - verdict       : FAIL | PASS. A PASS is OPERATIVE iff the pixel-read passes the band
                      AND the source is fresh (G7 auto-revoke).
    - ground-anchor : the 4.2.0 Metal-ground evidence the FAIL anchors to.
-->

# BG gestalt acceptance roster — born-RED against the 4.2.0 Metal ground

The 10 named BG acceptance surfaces, each owed a fresh LIVE-motion :5199 capture set in
BOTH modes over its real backdrop, a probe region + an expect pixel band, and a recorded
gestalt verdict DERIVED from the captured pixels. The operative gate result is the AND of
the per-surface verdicts and resolves RED until every row is PASS with the pixel-read
inside the warm-translucent band over a fresh source, judged by a non-authoring agent.

**The route arm.** Every `routes` cell's `/cat/story` token resolves to a real demo SFC
(`surface-closure.mjs` `routeSeeds`) — the route-resolution arm is GREEN. **The gestalt
arm.** Every verdict is FAIL, anchored to the BG.W-PAINT-IS-THE-GATE 4.2.0 Metal ground.

## ROSTER

| surface | routes | capture-light | capture-dark | probe | expect | verdict | ground-anchor |
|---|---|---|---|---|---|---|---|
| dock | /dock/overview; /dock/layers; /dock/rail; the shell BottomDock+SidebarDock | docs/tranches/BG/audit/reflect/dock-light-desktop-full.png | docs/tranches/BG/audit/reflect/dock-dark-desktop-full.png | x=0.18,y=0.50,w=0.20,h=0.12,tx=0.00,ty=0.00,tw=1.00,th=0.06 | meanL=0.40..0.99;meanChroma>=0.020;meanChroma<=0.22;topDelta<=0.12 | FAIL | 4.2.0-Metal-dock (dock-overview-{light,dark}-desktop-full.png — the dock plate reads a gray→metallic field, the aberrant full-width top bar stacks divergent from the field) |
| configurators-goo | /substrates/blob; /substrates/aurora | docs/tranches/BG/audit/reflect/configurators-goo-light-desktop-full.png | docs/tranches/BG/audit/reflect/configurators-goo-dark-desktop-full.png | x=0.18,y=0.60,w=0.18,h=0.12 | meanL=0.30..0.99;meanChroma>=0.018;meanChroma<=0.22 | FAIL | 4.2.0-Metal-configurator (the gear/blob panel reads gray opaque, no warm tint) |
| aurora | /substrates/aurora | docs/tranches/BG/audit/reflect/aurora-light-desktop-full.png | docs/tranches/BG/audit/reflect/aurora-dark-desktop-full.png | x=0.20,y=0.20,w=0.60,h=0.50 | meanL=0.30..0.99;meanChroma>=0.020;meanChroma<=0.30 | FAIL | 4.2.0-Metal-aurora (the WGSL canvas paints a metallic-sheen field, not warm-translucent aurora glass) |
| glass-feedback | /feedback/toast; /feedback/notification; /display/buttons | docs/tranches/BG/audit/reflect/glass-feedback-light-desktop-full.png | docs/tranches/BG/audit/reflect/glass-feedback-dark-desktop-full.png | x=0.45,y=0.40,w=0.14,h=0.12 | meanL=0.30..0.99;meanChroma>=0.020;meanChroma<=0.24 | FAIL | 4.2.0-Metal-feedback (the toast/notification plate reads gray opaque, the tone is a slab not colored glass) |
| shell | the demo-layout shell (BottomDock + SidebarDock nav, the section model, the held page) | docs/tranches/BG/audit/reflect/shell-light-desktop-full.png | docs/tranches/BG/audit/reflect/shell-dark-desktop-full.png | x=0.15,y=0.10,w=0.20,h=0.12 | meanL=0.40..0.99;meanChroma>=0.025;meanChroma<=0.22 | FAIL | 4.2.0-Metal-shell (shell-aurora-field-{light,dark}-desktop-full.png — the SidebarDock rail reads gray opaque over the field) |
| motion-fourier | /motion/curve-gallery; /motion/springs; /substrates/fourier-field | docs/tranches/BG/audit/reflect/motion-fourier-light-desktop-full.png | docs/tranches/BG/audit/reflect/motion-fourier-dark-desktop-full.png | x=0.13,y=0.42,w=0.25,h=0.08 | meanL=0.30..0.99;meanChroma>=0.020;meanChroma<=0.24 | FAIL | 4.2.0-Metal-fourier (the field reads frozen/metallic, no warm live paint) |
| dark-register | /substrates/glass-material | docs/tranches/BG/audit/reflect/dark-register-light-desktop-full.png | docs/tranches/BG/audit/reflect/dark-register-dark-desktop-full.png | x=0.18,y=0.40,w=0.18,h=0.14 | meanL=0.20..0.99;meanChroma>=0.020;meanChroma<=0.22 | FAIL | 4.2.0-Metal-dark (glass-material-{light,dark}-desktop-full.png — the dark register reads a flat near-black void, no luminous transmissive depth) |
| tabs-segmented | /navigation/tabs | docs/tranches/BG/audit/reflect/tabs-segmented-light-desktop-full.png | docs/tranches/BG/audit/reflect/tabs-segmented-dark-desktop-full.png | x=0.18,y=0.33,w=0.18,h=0.14 | meanL=0.40..0.99;meanChroma>=0.020;meanChroma<=0.22 | FAIL | 4.2.0-Metal-tabs (the segmented-tab track reads gray opaque, no liquid-glass underline) |
| page-band | /foundations/intro; any content route glass card over its per-page background | docs/tranches/BG/audit/reflect/page-band-light-desktop-full.png | docs/tranches/BG/audit/reflect/page-band-dark-desktop-full.png | x=0.18,y=0.20,w=0.18,h=0.12,tx=0.00,ty=0.00,tw=1.00,th=0.06 | meanL=0.40..0.99;meanChroma>=0.020;meanChroma<=0.22;topDelta<=0.12 | FAIL | 4.2.0-Metal-page-band (the storybook glass card reads the gray slab; the meta-chassis reads as N inconsistent pages, the aberrant top bar divergent from the field) |
| cross-repo | the slides.friday.institute adoption surface (the cross-repo consumer of the BG tree) | docs/tranches/BG/audit/reflect/cross-repo-light-desktop-full.png | docs/tranches/BG/audit/reflect/cross-repo-dark-desktop-full.png | x=0.18,y=0.05,w=0.18,h=0.12 | meanL=0.40..0.99;meanChroma>=0.025;meanChroma<=0.24 | FAIL | 4.2.0-Metal-cross-repo (the adopted glass surface reads gray on the consumer) |
