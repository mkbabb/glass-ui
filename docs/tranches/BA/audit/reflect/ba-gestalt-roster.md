<!-- ba-gestalt-roster — the holistic per-surface acceptance LEDGER (BA.W-GESTALT-GATE).

  This is the load-bearing artefact `proof:ba-gestalt` (scripts/proof-ba-gestalt.mjs)
  reads. It enumerates the EIGHT named W-REFLECT2 acceptance surfaces, each owed a
  whole-page capture in BOTH modes over its real backdrop plus a recorded GESTALT
  verdict — the holistic "does this look right as a page?" read ABOVE the per-mechanism
  π readback. It is the structural answer to the P-1 close-class failure (precepts-
  conformance.md:42-86): AZ closed `complete` on a 9-surface per-mechanism PASS matrix
  the user re-opened the SAME DAY (R8) on ≥7 surfaces — the 6th consecutive re-opening
  round (R3→R8). A per-mechanism π verifies the LOCAL mechanism (a pixel ΔL, an
  `h1Overlap:false`) but cannot verify the GESTALT ("totally mis-aligned" is a
  placement/relationship judgement, not a contrast delta).

  BORN-RED by construction: every verdict below is FAIL at HEAD, anchored to the user's
  own R8 gestalt-FAIL captures under docs/tranches/BA/audit/ground/. There is no PASS
  replacement — the BA surfaces are visually broken until the build batches land. The
  gate's OPERATIVE state is the OR of the per-surface verdicts; it is `ok` IFF every
  verdict is PASS AND every declared capture path resolves on disk (the anti-evasion
  floor — a PASS with a missing/zero-byte capture is the close-class lie, mechanically
  forbidden by W-GESTALT-GATE G1).

  CONSUMER CONTRACT (W-REFLECT2, Batch 7 — the single authorized verdict-flipper):
  W-REFLECT2 re-walks every surface LIVE on :5199 (and the shell), captures whole-page
  in BOTH modes over the real W-DARK-MATERIAL backdrop, records the gestalt verdict, and
  flips a row FAIL→PASS one surface at a time, repointing CAPTURE-LIGHT/CAPTURE-DARK off
  the R8 ground anchor to the fresh BA capture. It then PROMOTES the gate off ["local"]
  to the operative close set (G3 defers that promotion to W-REFLECT2 — NOT this wave).
  The schema below is fixed so W-REFLECT2 can drive it to GREEN without a schema change:
  it changes only the VERDICT cell (FAIL→PASS) and the two CAPTURE cells (R8 anchor →
  fresh BA capture). The GROUND-ANCHOR cell stays the FAIL baseline a flip is audited
  against.

  SCHEMA — the gate parses the ROSTER table below. Each data row is:
    | surface | routes | capture-light | capture-dark | verdict | ground-anchor |
  where:
    - surface       : the canonical W-REFLECT2 surface name (one of the EIGHT below;
                      the gate asserts the full set is present — a dropped surface reds
                      the completeness assert).
    - routes        : the demo route(s) the surface covers (semicolon-separated; informational).
    - capture-light : the light-mode whole-page capture path, repo-relative. Born-RED:
                      points at the R8 ground anchor (no fresh BA capture exists yet).
                      The gate asserts this path RESOLVES ON DISK for an operative PASS.
    - capture-dark  : the dark-mode whole-page capture path, repo-relative. Same resolve rule.
    - verdict       : FAIL | PASS (any other value reds the well-formedness check).
    - ground-anchor : the R8 ground-capture id(s) the FAIL anchors to (the user's own
                      evidence; semicolon-separated; the FAIL baseline a flip clears).
-->

# BA gestalt acceptance roster — born-RED against the R8 captures

The eight named acceptance surfaces, each owed a whole-page capture in BOTH modes over
its real backdrop plus a recorded gestalt verdict. Every verdict is FAIL at HEAD; the
operative gate result is the OR of the per-surface verdicts and resolves RED until
W-REFLECT2 flips every row to PASS with a fresh on-disk capture pair.

## ROSTER

| surface | routes | capture-light | capture-dark | verdict | ground-anchor |
|---|---|---|---|---|---|
| dock | /dock/overview; /dock/layers; /dock/rail; /dock/morph-showcase; the shell BottomDock+SidebarDock | docs/tranches/BA/audit/ground/R8-01-dock-rail-misaligned-a.png | docs/tranches/BA/audit/ground/R8-06-dock-buttons-cutoff-rail-fanout.png | FAIL | R8-1; R8-2; R8-6; R8-9 |
| configurators-goo | /substrates/blob; /substrates/aurora (gear Configurator); the demo Configurator | docs/tranches/BA/audit/ground/R8-07-goo-configurator-broken.png | docs/tranches/BA/audit/ground/R8-04-aurora-configurator-occlusion-a.png | FAIL | R8-3; R8-4; R8-7; R8-8 |
| aurora | /substrates/aurora; the aurora preset previews | docs/tranches/BA/audit/ground/R8-05-speedtest-preview-dim.png | docs/tranches/BA/audit/ground/R8-04-aurora-configurator-occlusion-b.png | FAIL | R8-4; R8-5 |
| glass-feedback | /feedback/toast; /feedback/notification; /feedback/progress; /display/buttons; the glass variant census | docs/tranches/BA/audit/ground/R8-13-button-large-uninteresting.png | docs/tranches/BA/audit/ground/R8-12-toasts-not-glassy.png | FAIL | R8-12; R8-13; R8-14; R8-18 |
| shell | the demo-layout shell (BottomDock + SidebarDock nav, the section model, the held page) | docs/tranches/BA/audit/ground/R8-09-docks-lack-sections.png | docs/tranches/BA/audit/ground/R8-01-dock-rail-misaligned-b.png | FAIL | R8-1; R8-9 |
| motion-fourier | /motion/springs; /substrates/fourier-field; /motion/curve-gallery; the plot play control | docs/tranches/BA/audit/ground/R8-10-padding-fourier-demos.png | docs/tranches/BA/audit/ground/R8-16-awful-scrolling-item.png | FAIL | R8-10; R8-16; R8-17 |
| dark-register | the dark register AS A SURFACE: /substrates/glass-material + every page background in dark | docs/tranches/BA/audit/ground/R8-13-not-glassy-b.png | docs/tranches/BA/audit/ground/R8-11-black-bg-hides-glass.png | FAIL | R8-11; R8-13; R8-15; R8-19 |
| cross-repo | the slides.friday.institute adoption surface (the cross-repo consumer of the BA tree) | docs/tranches/BA/audit/ground/R8-03-darkmode-toggle-broken.png | docs/tranches/BA/audit/ground/R8-12-toasts-not-glassy.png | FAIL | R8-3; the cross-repo adopt/deploy book (W-CLOSE) |
