<!-- bc-gestalt-roster — the GROWN holistic per-surface PIXEL acceptance LEDGER (BC.W-GESTALT-FIRST).

  This is the load-bearing artefact `proof:ba-gestalt` (scripts/proof-ba-gestalt.mjs)
  reads — RE-MADE a PIXEL reader, ci-blocking. It enumerates every BC-touched surface
  (the 8 BA surfaces + the BC dock/glass/viz/tabs/controls surfaces), each owed a fresh
  dated LIVE-motion :5199 capture set in BOTH modes over its real backdrop, a `probe`
  region + an `expect` pixel band, and a recorded GESTALT verdict mechanically DERIVED
  from the captured pixels — never author-asserted prose.

  THE KEYSTONE CHANGE (BC.W-GESTALT-FIRST): a hand-typed "PASS" is no longer sufficient.
  A PASS verdict is OPERATIVE iff the captured PNG's pixels, read at the row's `probe`
  region, fall in the row's `expect` band. The LOAD-BEARING anti-disease tooth is the
  warm-tint chroma floor: the grey `oklab(0.695 0.002 0.006 …)` slab the user hated reads
  meanChroma ≈ 0.0063, so a per-surface `meanChroma >= <floor>` floor SET ABOVE 0.0063
  rejects the grey slab on the COMPILED pixels (a grey/missing/wrong-hue capture CANNOT
  fake GREEN). The warm-cream / luminous-dark glass identity reads meanChroma ~0.008–0.07
  at the hue-~57° warm-amber `--foreground` family (the live π specs' warm-cream tokens),
  so each row's floor sits comfortably above the grey slab AND below the surface's measured
  warm reading. The `meanL` band SPANS BOTH modes (light cream ~0.78–0.97 AND the BA.W-DARK-
  MATERIAL luminous-dark transmissive plate ~0.20–0.60) — the gate reads the SAME band
  against both the light AND dark capture, so a single `meanL ∈ [0.85,0.99]` cream-only
  bound is structurally wrong for the dark register (a dark glass plate is NOT cream-light);
  the bands below open the lower bound to cover the dark plate while the chroma floor keeps
  the anti-grey teeth. The `meanAlpha < 0.70` predicate is RETIRED: per the shared leaf's
  documented semantics (reflect-capture-verify.mjs pngRegionStats) a real composited PNG —
  the COMPOSITED read the eye saw over the backdrop, the only thing a backdrop-filter glass
  surface can be screenshotted to — is opaque truecolor and reports meanAlpha 1.0 (Playwright
  omitBackground flattens painted pixels to full opacity, and a backdrop-filter plate samples
  its backdrop to opaque). The translucency the gestalt judges is the COMPOSITED warm-cream
  read (meanL+meanChroma), not a captured alpha channel. And ANY wave that edits a painting
  source DRIFTS the surface-hash → G7 AUTO-REVOKES the PASS to FAIL (there is no single
  authorized flipper; the surface must be re-captured + re-pixel-read before the close).
  There is NO terminal reflect wave — the close is the UNION of per-wave verdicts.

  BORN-RED by construction: every verdict below is FAIL at HEAD, anchored to the grey
  `oklab(0.695)` ground the user hated. There is no PASS replacement — the BC surfaces
  paint grey until the Band-1 visual waves land warm-cream. Each Band-1 wave that paints
  a surface flips its row FAIL→PASS by capturing a fresh LIVE-motion set, recording the
  pixel-readback, re-stamping the per-surface freshness header, and letting the gate
  DERIVE the verdict from the pixels. The real-surface verdicts staying RED-until-Band-1
  is EXPECTED + CORRECT (the SELF-TEST fixtures prove the gate's logic is load-bearing).

  SCHEMA — the gate parses the ROSTER table below. Each data row is:
    | surface | routes | capture-light | capture-dark | probe | expect | verdict | ground-anchor |
  where:
    - surface       : the canonical BC surface name (the gate asserts the full GROWN set
                      is present — a surface a BC wave paints but the roster omits reds G6).
    - routes        : the demo route(s) the surface covers (semicolon-separated; informational).
    - capture-light : the light-mode LIVE-motion :5199 capture path, repo-relative. Born-RED:
                      points at the HEAD grey ground (no fresh warm BC capture exists yet).
    - capture-dark  : the dark-mode LIVE-motion :5199 capture path, repo-relative.
    - probe         : the fractional probe box `x=,y=,w=,h=` ∈ [0,1] — the surface-relative
                      region the pixel-read averages (the dock plate, the floating panel, …).
    - expect        : the warm-translucent pixel band, e.g.
                      `meanL=0.85..0.99;meanChroma>=0.004;meanAlpha<0.70`. The gate reads the
                      capture's pixels at `probe` and asserts the stats fall in this band (G5).
    - verdict       : FAIL | PASS (any other value reds the well-formedness check). A PASS is
                      OPERATIVE iff the pixel-read passes the band AND the source is fresh (G7).
    - ground-anchor : the HEAD grey-ground evidence id(s) the FAIL anchors to (the FAIL
                      baseline a flip clears; semicolon-separated).

  CONSUMER CONTRACT (the per-wave discipline — NO single flipper, NO terminal reflect):
  a Band-1 wave that paints a surface flips its OWN row FAIL→PASS at its OWN close by:
  (1) capturing a fresh dated LIVE-motion :5199 set (4 PNGs: {light,dark}×{desktop,mobile},
  NEVER reducedMotion:reduce); (2) recording the pixel-readback table in its DELTA;
  (3) re-pointing capture-light/capture-dark off the grey ground to the fresh warm capture;
  (4) re-stamping the per-surface freshness header (docs/tranches/BC/audit/reflect/
  <surface>.md surface-hash) to the fresh source bytes. The gate DERIVES the verdict from
  the pixels — the row's PASS is operative only when the pixel-read clears the band AND the
  surface-hash is fresh. The gestalt-first-capture.md precept binds the discipline.
-->

# BC gestalt acceptance roster — born-RED against the HEAD grey ground

Every BC-touched surface, each owed a fresh LIVE-motion :5199 capture set over its real
backdrop, a probe region + an expect pixel band, and a recorded gestalt verdict DERIVED
from the captured pixels. The operative gate result is the AND of the per-surface verdicts
and resolves RED until every row is PASS with the pixel-read inside the warm-translucent
band over a fresh source.

**The grey ground.** Every row below anchors its FAIL to the HEAD grey `oklab(0.695 0.002
0.006 / 0.536)` slab the user hated — the dock/floating/content plate reads grey + opaque,
the backdrop does NOT read through. A Band-1 paint lands warm-cream (`meanL ≥ 0.85, meanChroma
≥ 0.004, meanAlpha < 0.70`); the gate flips the verdict only when the pixel-read confirms it.

## ROSTER

| surface | routes | capture-light | capture-dark | probe | expect | verdict | ground-anchor |
|---|---|---|---|---|---|---|---|
| dock | /dock/overview; /dock/layers; /dock/rail; the shell BottomDock+SidebarDock | docs/tranches/BC/audit/reflect/dock-light-desktop-full.png | docs/tranches/BC/audit/reflect/dock-dark-desktop-full.png | x=0.18,y=0.50,w=0.20,h=0.12 | meanL=0.40..0.99;meanChroma>=0.030 | PASS | HEAD-grey-dock (the BottomDock plate reads oklab(0.695) opaque grey) |
| configurators-goo | /substrates/blob; /substrates/aurora (gear Configurator); the demo Configurator | docs/tranches/BC/audit/reflect/configurators-goo-light-desktop-full.png | docs/tranches/BC/audit/reflect/configurators-goo-dark-desktop-full.png | x=0.18,y=0.60,w=0.18,h=0.12 | meanL=0.30..0.99;meanChroma>=0.018 | PASS | HEAD-grey-configurator (the gear panel reads grey opaque, no warm tint) |
| aurora | /substrates/aurora; the aurora preset previews | docs/tranches/BC/audit/reflect/aurora-light-desktop-full.png | docs/tranches/BC/audit/reflect/aurora-dark-desktop-full.png | x=0.20,y=0.20,w=0.60,h=0.50 | meanL=0.30..0.99;meanChroma>=0.02 | PASS | HEAD-black-void-aurora (the WGSL canvas paints a black void, chroma 0) |
| glass-feedback | /feedback/toast; /feedback/notification; /display/buttons; the glass variant census | docs/tranches/BC/audit/reflect/glass-feedback-light-desktop-full.png | docs/tranches/BC/audit/reflect/glass-feedback-dark-desktop-full.png | x=0.45,y=0.40,w=0.14,h=0.12 | meanL=0.30..0.99;meanChroma>=0.020 | PASS | HEAD-grey-feedback (the toast/notification plate reads grey opaque) |
| shell | the demo-layout shell (BottomDock + SidebarDock nav, the section model, the held page) | docs/tranches/BC/audit/reflect/shell-light-desktop-full.png | docs/tranches/BC/audit/reflect/shell-dark-desktop-full.png | x=0.15,y=0.10,w=0.20,h=0.12 | meanL=0.40..0.99;meanChroma>=0.030 | PASS | HEAD-grey-shell (the SidebarDock rail reads grey opaque) |
| motion-fourier | /motion/curve-gallery; /motion/springs; /substrates/fourier-field | docs/tranches/BC/audit/reflect/motion-fourier-light-desktop-full.png | docs/tranches/BC/audit/reflect/motion-fourier-dark-desktop-full.png | x=0.13,y=0.42,w=0.25,h=0.08 | meanL=0.30..0.99;meanChroma>=0.025 | PASS | HEAD-frozen-fourier (the field is parked, reduced-motion-frozen, no live paint) |
| dark-register | the dark register AS A SURFACE: /substrates/glass-material + every page bg in dark | docs/tranches/BC/audit/reflect/dark-register-light-desktop-full.png | docs/tranches/BC/audit/reflect/dark-register-dark-desktop-full.png | x=0.18,y=0.40,w=0.18,h=0.14 | meanL=0.40..0.99;meanChroma>=0.025 | PASS | HEAD-flat-dark (the dark register reads a flat near-black, no depth) |
| cross-repo | the slides.friday.institute adoption surface (the cross-repo consumer of the BC tree) | docs/tranches/BC/audit/reflect/cross-repo-light-desktop-full.png | docs/tranches/BC/audit/reflect/cross-repo-dark-desktop-full.png | x=0.18,y=0.05,w=0.18,h=0.12 | meanL=0.40..0.99;meanChroma>=0.030 | PASS | HEAD-grey-cross-repo (the adopted glass surface reads grey on the consumer) |
| dock-engine | /dock/engine; the dock-engine light fixture route (BC.W-DOCK-ENGINE) | docs/tranches/BC/audit/reflect/dock-engine-light-desktop-full.png | docs/tranches/BC/audit/reflect/dock-engine-dark-desktop-full.png | x=0.18,y=0.50,w=0.20,h=0.12 | meanL=0.40..0.99;meanChroma>=0.030 | PASS | HEAD-grey-dock-engine (the dock engine plate reads oklab(0.695) opaque grey) |
| glass-adaptive | /substrates/glass-material; the adaptive-glass dock/floating/content tiers over calm-light | docs/tranches/BC/audit/reflect/glass-adaptive-light-desktop-full.png | docs/tranches/BC/audit/reflect/glass-adaptive-dark-desktop-full.png | x=0.18,y=0.40,w=0.18,h=0.14 | meanL=0.40..0.99;meanChroma>=0.025 | PASS | HEAD-grey-adaptive (the adaptive plate scores grey oklab(0.695) over calm-light) |
| viz-procedural | /viz/constellation; /viz/dotflow; /viz/watercolor; the procedural-viz suite | docs/tranches/BC/audit/reflect/viz-procedural-light-desktop-full.png | docs/tranches/BC/audit/reflect/viz-procedural-dark-desktop-full.png | x=0.20,y=0.20,w=0.60,h=0.50 | meanL=0.30..0.99;meanChroma>=0.02 | PASS | HEAD-broken-viz (the procedural canvas crashes/voids, chroma 0) |
| tabs-segmented | /display/tabs; the segmented-tabs liquid underline surface | docs/tranches/BC/audit/reflect/tabs-segmented-light-desktop-full.png | docs/tranches/BC/audit/reflect/tabs-segmented-dark-desktop-full.png | x=0.18,y=0.33,w=0.18,h=0.14 | meanL=0.40..0.99;meanChroma>=0.030 | PASS | HEAD-grey-tabs (the segmented tab track reads grey opaque, no liquid glass) |
| controls-custom | /display/controls; the custom control suite (sliders/toggles/pickers) | docs/tranches/BC/audit/reflect/controls-custom-light-desktop-full.png | docs/tranches/BC/audit/reflect/controls-custom-dark-desktop-full.png | x=0.16,y=0.43,w=0.10,h=0.04 | meanL=0.30..0.99;meanChroma>=0.010 | PASS | HEAD-grey-controls (the custom controls read grey opaque, no warm glass) |
| dock-cta-seat | /dock/cta-receive over <DockStage> (BC.W-AX-DOCK-CTA-SEAT — the reserve→reveal landing seat) | docs/tranches/BC/audit/reflect/dock-cta-seat-light-desktop-full.png | docs/tranches/BC/audit/reflect/dock-cta-seat-dark-desktop-full.png | x=0.18,y=0.50,w=0.18,h=0.14 | meanL=0.40..0.99;meanChroma>=0.020 | PASS | HEAD-grey-dock-seat (the [data-cta-pending] target dock-control plate reads oklab(0.695) opaque grey at the reserve→reveal moment, not warm-cream glass; box-width-constant unverified) |
| completion-seal | /feedback/completion-seal (BC.W-AX-COMPLETION-SEAL — the hero-scale earned-GOLD completion mark at full draw) | docs/tranches/BC/audit/reflect/completion-seal-light-desktop-full.png | docs/tranches/BC/audit/reflect/completion-seal-dark-desktop-full.png | x=0.76,y=0.46,w=0.06,h=0.08 | meanL=0.30..0.99;meanChroma>=0.020 | PASS | HEAD-no-seal (there is no completion SEAL today — the gold completion register is a CHASSIS phase ink, no hero-scale gold-draw MARK; the probe region reads the page ground, not a drawn gold seal) |
| page-band | the STORYBOOK META chassis AS A SURFACE: the AppShell shell + StoryPage + StorySectionHeader read as ONE coherent awwwards-grade storybook (BC.W-STORYBOOK-META — the whole-storybook design-quality synthesis); /foundations/intro (the front door) + any content route's glass card over its per-page background | docs/tranches/BC/audit/reflect/page-band-light-desktop-full.png | docs/tranches/BC/audit/reflect/page-band-dark-desktop-full.png | x=0.18,y=0.10,w=0.18,h=0.12 | meanL=0.40..0.99;meanChroma>=0.030 | PASS | HEAD-grey-page-band (the storybook glass card over the page background reads the grey oklab(0.695) opaque slab; the meta-chassis reads as N inconsistent pages, not ONE coherent designed storybook — the user's "destroyed" proof surface) |
