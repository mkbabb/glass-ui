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

  ── BB.W-GESTALT-GATE2 — THE HARDENED CONTRACT (the desktop-PNG-existence floor is RETIRED) ──
  proof:ba-gestalt no longer operative-PASSes on existsSync+size>0. The hardened bar
  (the close oracle W-REFLECT3 must clear) is, PER SURFACE, FOUR content-real
  dimension-correct viewport-faithful captures over a FRESH surface:

    G1 — content+dimension. Each declared capture is a REAL on-disk PNG (magic-byte +
         ≥1KiB, isRealPng) with a readable IHDR (pngDimensions) at sane whole-page
         dimensions (>0, ≥320×320). A renamed/truncated/0×0 nonzero PNG no longer passes.

    G2 — the BOTH-viewport floor. The gate reads all FOUR PNGs per surface: the two
         DESKTOP captures DECLARED in the table below + the two MOBILE twins DERIVED by
         the gate (direction 2b — the viewport-derivation: the gate re-points the
         declared basename's `-desktop-` token to `-mobile-`, i.e.
         <surface>-<mode>-mobile-full.png BESIDE the declared <surface>-<mode>-desktop-
         full.png, the wf-ba-reflect.js naming convention). NO ROSTER SCHEMA MIGRATION —
         the two-column desktop schema above is UNCHANGED; the mobile twins ride the
         naming convention. Each capture is reconciled via the fabricated-viewport
         verdict: a `-mobile-` IHDR ≥1000px is a desktop screenshot mislabeled mobile
         (fraud, never graced) and a `-desktop-` below 1280px is the symmetric mislabel.
         The 16 mobile captures are HARD (not graced) for an operative PASS.

    G3 — freshness (the per-surface header is now LOAD-BEARING). For each surface the
         gate opens docs/tranches/BA/audit/reflect/<surface>.md, parses its
         <!-- surface-paths --> + <!-- surface-hash --> header, recomputes via the
         SHARED surfaceHash() (one source — reflect-capture-verify.mjs re-exports the
         ledger's; no second copy), and asserts byte-identity. A PASS over a surface
         whose painting source DRIFTED since capture is STALE → REDs under
         --strict-freshness (the close/release arm; proof:ba-gestalt is tags:["release"]
         so the release run IS the close run, in lockstep with proof:live-verified-
         ledger's flag convention). On the bare mid-tranche arm staleness is a non-fatal
         NOTE (the backfill window). At BB HEAD the dock/shell/dark-register surfaces are
         STALE (their painting source moved after the BA reflection) — that born-RED is
         CORRECT; W-REFLECT3 (Batch 7) re-captures + re-stamps the surface-hash to flip
         them GREEN.

    G4 — the self-test bite rides EVERY run (the gate is un-weakenable).

  CONSUMER CONTRACT, RESTATED FOR BB: the single authorized verdict-flipper is now
  W-REFLECT3 (Batch 7 — the BA W-REFLECT2 lineage continues under the BB id). W-REFLECT3
  re-walks every surface LIVE on :5199, RE-CAPTURES whole-page in BOTH viewports ×
  {light,dark}, re-stamps each <surface>.md surface-hash to the fresh source bytes, and
  drives the gate to operative-GREEN under --strict-freshness. It changes the VERDICT
  cell + the CAPTURE cells + the per-surface freshness header; the gate logic + the
  two-column schema are FIXED (no schema surprise).
-->

# BA gestalt acceptance roster — born-RED against the R8 captures

The eight named acceptance surfaces, each owed a whole-page capture in BOTH modes over
its real backdrop plus a recorded gestalt verdict. The operative gate result is the OR
of the per-surface verdicts and resolves RED until every row is PASS with a fresh on-disk
capture pair.

**BB.W-CHIP-GRAZE — the dock + shell title-fix PASS is REVOKED (the P-1 recurrence).**
W-REFLECT2 flipped `dock` + `shell` FAIL→PASS at BA on the W-SHELL-RAIL-RESEAT title-fix
ALONE — but the re-seat traded the page-`<h1>` collision for a `/forms/inputs` FIELD
collision (the desktop SidebarDock floating facet carousel fanned RIGHT into `<main>` at
the utility-seam Y, grazing the form field at the narrow-desktop breakpoint;
`chipOverField:true` measured at HEAD). The verdict judged the TITLE relationship only,
never the FIELD relationship — the exact P-1 close-class lie this gate exists to catch,
recurring INSIDE the wave that named the P-1 fix as its charge. Both rows are re-anchored
FAIL with the field-graze evidence (CG1); the new CG2 clause requires the dock + shell
records to carry a measured `chipOverField:false` witness at the narrow-desktop breakpoint
over a FRESH source. The SOURCE redress (the desktop SidebarDock carousel re-fans DOWN the
rail gutter, not RIGHT into `<main>`) landed at BB.W-CHIP-GRAZE; W-REFLECT3 (Batch 7 — the
single authorized verdict-flipper) re-earns the PASS on a fresh content+dimension+
freshness-verified `chipOverField:false` capture. A PASS→FAIL revocation is the honest
re-statement of an open defect, NOT a verdict flip (the flip-to-PASS authority stays
W-REFLECT3's).

## ROSTER

| surface | routes | capture-light | capture-dark | verdict | ground-anchor |
|---|---|---|---|---|---|
| dock | /dock/overview; /dock/layers; /dock/rail; /dock/morph-showcase; the shell BottomDock+SidebarDock | docs/tranches/BA/audit/reflect/dock-light-desktop-full.png | docs/tranches/BA/audit/reflect/dock-dark-desktop-full.png | FAIL | R8-1; R8-2; R8-6; R8-9 (the W-REFLECT2 title-collision); the BA-close PASS REVOKED at BB.W-CHIP-GRAZE — the W-SHELL-RAIL-RESEAT re-seat traded the title-collision for a /forms/inputs FIELD-collision (the title-only DELTA masked it: chipOverField:true measured at the narrow-desktop breakpoint, chips at x=[73,329]/y=[532,558] over an .input-pill at x=[144,528]/y=[520,560]). The SOURCE redress landed (the desktop SidebarDock carousel fans DOWN the rail gutter, not RIGHT into <main>); W-REFLECT3 (Batch 7) re-earns the PASS on a fresh content+dimension+freshness-verified chipOverField:false capture |
| configurators-goo | /substrates/blob; /substrates/aurora (gear Configurator); the demo Configurator | docs/tranches/BA/audit/reflect/configurators-goo-light-desktop-full.png | docs/tranches/BA/audit/reflect/configurators-goo-dark-desktop-full.png | PASS | R8-3; R8-4; R8-7; R8-8 |
| aurora | /substrates/aurora; the aurora preset previews | docs/tranches/BA/audit/reflect/aurora-light-desktop-full.png | docs/tranches/BA/audit/reflect/aurora-dark-desktop-full.png | PASS | R8-4; R8-5 |
| glass-feedback | /feedback/toast; /feedback/notification; /feedback/progress; /display/buttons; the glass variant census | docs/tranches/BA/audit/reflect/glass-feedback-light-desktop-full.png | docs/tranches/BA/audit/reflect/glass-feedback-dark-desktop-full.png | PASS | R8-12; R8-13; R8-14; R8-18 |
| shell | the demo-layout shell (BottomDock + SidebarDock nav, the section model, the held page) | docs/tranches/BA/audit/reflect/shell-light-desktop-full.png | docs/tranches/BA/audit/reflect/shell-dark-desktop-full.png | FAIL | R8-1; R8-9 (the W-REFLECT2 title-collision); the BA-close PASS REVOKED at BB.W-CHIP-GRAZE — the re-seat cleared the <h1> but the shell.md §57 ITSELF admitted "the chips graze the LEFT EDGE of an Email field" and accepted it (the P-1 lie: the verdict judged the title, never the field). chipOverField:true measured at the narrow-desktop breakpoint on /forms/inputs. The SOURCE redress landed (the desktop SidebarDock carousel re-fans down the rail gutter, clear of <main>); overlapsH1:false STAYS true (the title fix is not regressed); W-REFLECT3 (Batch 7) re-earns the PASS on a fresh chipOverField:false capture |
| motion-fourier | /motion/springs; /substrates/fourier-field; /motion/curve-gallery; the plot play control | docs/tranches/BA/audit/reflect/motion-fourier-light-desktop-full.png | docs/tranches/BA/audit/reflect/motion-fourier-dark-desktop-full.png | PASS | R8-10; R8-16; R8-17 |
| dark-register | the dark register AS A SURFACE: /substrates/glass-material + every page background in dark | docs/tranches/BA/audit/reflect/dark-register-light-desktop-full.png | docs/tranches/BA/audit/reflect/dark-register-dark-desktop-full.png | PASS | R8-11; R8-13; R8-15; R8-19 |
| cross-repo | the slides.friday.institute adoption surface (the cross-repo consumer of the BA tree) | docs/tranches/BA/audit/reflect/cross-repo-light-desktop-full.png | docs/tranches/BA/audit/reflect/cross-repo-dark-desktop-full.png | PASS | R8-3; the cross-repo adopt/deploy book (W-CLOSE) |
