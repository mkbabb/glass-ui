# AY.W-BLOB-GLASS — the glass-not-enamel move: uBackdrop Snell refraction (CONDITIONALLY greenlit)

**State:** OPEN (user-greenlit 2026-06-09, CONDITIONAL: "if this is performant and actually works
on all browsers, absolutely" — the two conditions are the BINDING gates, not footnotes)
**Repo:** glass-ui · **Band:** A (blob perfection — the recorded T1/T2 decision executed)
**Provenance:** `H-research-blob.md §1 T1/T2 + §6 waveSpecInputs` (the recipe + the gate design,
pre-researched and recorded) + `goo-blob/RESEARCH.md §4.2` (the carried candidate) + the
NECESSITY-MATRIX blob lane §4.2 ("a fully-specced recorded DECISION awaiting greenlight").
**Depends on:** W-GOD1 (the renderer carve — this wave edits the carved renderer), W-COHERE (the
mood-register/shadow cohesion lands first so the refraction reads on the SETTLED bead), the
aurora-FBO seam coordination (below).

## §1 — The move

Today the bead is ENAMEL: a lit opaque body with a specular sheen. The glass-not-enamel move
makes it GLASS — the blob REFRACTS the live backdrop behind it (the aurora bending through the
bead, the page surface displaced by the dome curvature):

1. **The backdrop texture seam:** the blob's WebGL2 canvas gains a `uBackdrop` sampler — the
   backdrop rendered into an FBO texture (when the blob sits over an aurora, the aurora's frame
   is the source — the AURORA-FBO SEAM: one shared render-target handshake between the two
   substrates on the `useWebGLCanvas` substrate, coordinated, never a second compositor); over a
   static surface, a one-shot snapshot suffices.
2. **Snell refraction in-shader:** the dome's surface normal (already computed for the lighting)
   drives a refraction offset into `uBackdrop` (a single `texture()` tap with an η-scaled
   normal-projected UV displacement — the thin-glass approximation, NOT a ray-marcher); the
   refracted sample composes UNDER the existing rim/specular/SSS stack so the shipped lighting
   identity survives intact.
3. **The squircle bevel** (the T2 half): the dome-Z profile moves circle → quartic squircle
   (`metaball.frag.ts:273`-class edit-site per the research doc) so the refraction reads as a
   lensing EDGE, the iOS-glass read.

## §2 — THE TWO BINDING CONDITIONS (the user's words; gate-encoded)

**(G-PERF) "performant":** the existing blob frame-budget arm holds UNCHANGED with refraction ON —
the per-frame cost of the FBO sample + the one-tap refraction stays inside the shipped budget on a
mid-tier profile (the π lane's CPU-throttled run is the proxy; the budget numbers are the SHIPPED
ones, not a new looser budget). The FBO is allocated once and resized with the canvas (no per-frame
allocation); the aurora-FBO handshake adds ZERO extra full-screen passes (the aurora already
renders — the seam shares, never re-renders).

**(G-BROWSER) "actually works on all browsers":** the path uses WebGL2 core ONLY — no extensions,
no float-texture requirements beyond core (RGBA8 backdrop is sufficient; the refraction is a UV
displacement, not an HDR op). Verified on: the chromium π lane (automated, the binding readback) +
webkit AND firefox (a cross-engine verification arm — the playwright webkit/firefox projects are
stood up for this spec's run OR a documented manual verification with captures; EITHER way the
DELTA carries all-three-engine screenshots). A browser where the path cannot hold falls back to
the SHIPPED enamel render (the refraction is additive-on-detect, never a broken canvas) — but the
greenlight condition is that NO mainstream engine needs the fallback.

## §3 — HARD GATE (sketch; hardened pre-build)

1. **REFRACTION-READS π (born-RED):** over a live aurora backdrop, sample a high-contrast backdrop
   feature through the bead's edge — assert the refracted displacement (the feature's apparent
   position shifts by the η-predicted offset; ZERO shift = the enamel state = RED today).
2. **G-PERF:** the frame-budget arm green with refraction ON (the shipped budget, unchanged).
3. **G-BROWSER:** the three-engine capture set on disk (chromium automated + webkit + firefox);
   the core-only source-witness (no `getExtension` beyond the shipped set, no float-texture
   dependency).
4. **IDENTITY-PRESERVED:** `proof:blob-warm-default` + the `blob-render` band fleet stay GREEN
   (the cream identity + containment survive the glass move).
5. **DELTA:** the captured before(enamel)/after(glass) pair over the aurora backdrop, light+dark,
   per the cardinal protocol.

## §4 — Scope fence

- NOT a ray-marcher, NOT a second render pipeline — one sampler + one tap + the bevel profile.
- The aurora-FBO seam is a COORDINATED handshake on the shared substrate (`useWebGLCanvas`), specced
  with the aurora's render loop — never a hidden coupling.
- If G-PERF or G-BROWSER cannot hold after a genuine attempt, the wave closes CONDITIONS-UNMET with
  the measurements recorded and the enamel state stands — the user's conditional was explicit; the
  greenlight evaporates on a failed condition, never a degraded ship.
