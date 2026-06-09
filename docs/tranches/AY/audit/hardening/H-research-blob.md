# H-research-blob — RED-TEAM + SOTA research-brief for AY.W-BLOB

**Lane:** H-research-blob (RESEARCH blob/metaball SOTA; seeds AY.W-BLOB1).
**Verdict:** NEEDS-RESEARCH → the seed (AY.W-BLOB1) is UNDER-SPECCED, and the AX prior
research it inherits is WRONG on the headline claim. This brief replaces the AX finding,
ranks the missing techniques, and lands the acceptance bar.

---

## 0 — The adversarial headline (the AX research is WRONG where it matters)

The AX synthesis (`docs/tranches/AX/research/blob-synthesis.md:9-11`) declares the blob
**"already at or beyond the public web frontier"** and reclassifies every blob wave as
"scale-reconciliation / hygiene, NOT algorithm-replacement." That conclusion is
**falsified by the live capture** the same tranche produced:

- `docs/tranches/AX/audit/visual/W46-goo-blob-desktop-light.png` — the four default blobs
  render as **flat, matte, OPAQUE colored lumps** (a black rubber ball, a red sticker, a
  blue plastic bead, a green blob). NO translucency. NO refraction. NO sense of glass.
- `docs/tranches/AX/audit/visual/W46-goo-blob-desktop-dark.png` — the "warm-cream" default
  in dark mode is a **flat white lump** with a hard rim. It reads as enamel, not gel.

This is the ledger's CHRONIC #7 ("blob SOTA … the perfection bar open" — AUDIT-LEDGER.md:26)
and the MEMORY note's "blob broken" / "visually-broken gap". The AX research measured the
SHADER MATH (smin normalization, OETF correctness, analytic gradient) and found it correct —
and it IS correct, gate-green (`proof:blob-*` × 12 all present). But **the math being correct
does not make the artifact read as glass.** The AX corpus answered "is the metaball algorithm
SOTA?" (yes) and never asked "does this read as LIQUID GLASS in 2025?" (no). That is the gap
this lane exists to close, and it is an ALGORITHM/ARCHITECTURE gap, not hygiene.

**Root architectural cause (the one the AX corpus structurally could not see):** the blob is a
**self-lit premultiplied-alpha OVERLAY**. `metaball.frag.ts:497` outputs `vec4(rgb*alpha, alpha)`
where `rgb` is the blob's OWN color (palette sample + lit terms) and the canvas is
`alphaMode:'premultiplied'`. **The shader samples NOTHING behind it.** Every lit term
(Blinn-Phong glint, Fresnel rim, SSS, iridescence, Beer-Lambert core) ADDS light to the blob's
own fill — it is a lit OPAQUE droplet, the WWDC-2015 "goo", not the WWDC-2025 "liquid glass".
The 2025 SOTA blob **bends and lenses the backdrop through itself** (Snell refraction +
chromatic dispersion). The current architecture cannot, by construction, do that — it has no
backdrop input. This is why the live render reads as plastic. The AX research never identified
this because it audited the shader in isolation against IQ/Codrops metaball references (which
ARE all self-lit-overlay references) and never against the 2025 liquid-glass refraction corpus.

---

## 1 — The 2025 liquid-glass SOTA corpus (web, fresh — what AX missed)

The frontier moved in June 2025 (WWDC Liquid Glass). The web replication corpus that landed
since is the reference AY.W-BLOB must consume. Ranked by impact-on-the-glass-read:

### Technique 1 (KEYSTONE) — Backdrop refraction via a bevel-normal displacement map
The single technique that turns "lit lump" into "glass". The recipe (kube.io, aave.com):
- **Bevel height profile** maps edge-distance `x∈[0,1]` → thickness. Apple's preferred is the
  **convex squircle** `y = ⁴√(1 - (1-x)⁴)` (softer flat-to-curve than the spherical
  `y = √(1-(1-x)²)`). The glass-ui blob's CURRENT dome-Z (`metaball.frag.ts:273`,
  `z = sqrt(1 - (1-interior)²)`) is the **circle** profile — already the right family, wrong curve.
- **Normal = derivative of the height profile**, which the blob ALREADY has analytically
  (`surfaceNormalFromGrad`, `metaball.frag.ts:270`). The normal that today only feeds Blinn-Phong
  must ALSO drive a refraction displacement.
- **Snell's law** `n₁sinθ₁ = n₂sinθ₂`, n_air=1, n_glass≈1.5, single-refraction-event, rays
  orthogonal to a parallel backdrop (the 2D-UI simplification — no view ray, matches the blob's
  flat-mark assumption). The refracted direction → a UV displacement → sample the backdrop at
  `uv + refractOffset`.
- **The displacement is strongest at the RIM (steep normal), ~0 at the centre (flat)** — exactly
  the lensing edge that reads as glass.

### Technique 2 — Chromatic dispersion (per-channel IOR)
The rim rainbow-fringe that sells real glass (Heckel, geeks3d). Three IORs (R/G/B ~0.01-0.08
apart), sample the backdrop 3× with `refract(eye, N, 1/iorR/G/B)`, recombine. Saturation-correct
after (dispersion desaturates) via luminance mix. A 4-16 tap slide-loop kills banding. DEFAULT
LOW (a whisper of fringe, not a prism) — congruent with the warm-cream restraint identity.

### Technique 3 — Specular bloom over the refraction (NOT instead of it)
The 2025 model is **a thin edge catch-light over the lensed backdrop** (the same D19/gold-audacious
"thin edge catch-light over a diffuse central bloom" model glass-ui already names in CLAUDE.md for
the gold CTA). The blob's CURRENT Blinn-Phong + Fresnel rim is this layer — it is CORRECT but it is
the TOP layer, and today it is the ONLY layer (there's nothing under it to catch light over).

### Technique 4 — The portability constraint (the architecture decision AY MUST make)
There is **no portable web API that reads pixels behind a `backdrop-filter`/transparent canvas**
(confirmed: html2canvas is a frozen, CORS-limited, slow snapshot; Chrome's HTML-in-Canvas is a
2026 origin-trial, Chrome-only). The aave.com production answer is **refract the content ITSELF
via an SVG `feDisplacementMap`** (works Chromium+Safari+Firefox, no fallback) — but that is for a
glass PANEL over live DOM, not a free-floating WebGL blob.

**The glass-ui-specific escape (the keystone the brief lands):** the blob does NOT need the DOM.
glass-ui RENDERS its own rich backdrops — Aurora, the page-redesign gradient heros (W60/AY-W-AUR).
The blob can sample a **backdrop texture glass-ui itself produces** (an Aurora FBO, a CSS-gradient
baked to a texture, or a `uBackdrop` sampler the consumer supplies). This makes TRUE refraction
feasible AS A PORTABLE WEBGL2 PRIMITIVE without any DOM-sampling API — the refraction is over the
substrate glass-ui controls. This is the architectural transposition (gestalt, not a patch) the
wave needs, and it dovetails with the AY aurora waves (the blob over the aurora is the hero composition).

### Technique 5 — Goo/restraint motion doctrine (preserve, confirmed)
The existing de-synced multi-sine breath, critically-damped pointer spring, volume-preserving
squash, and decaying-radius pseudopod ARE the motion SOTA (Codrops/IQ/keyframes.js) and the
restraint doctrine (Apple Liquid Glass / Stripe / Linear: present-not-distracting) holds. NOT a
gap — preserve. The motion is fine; the SURFACE is the gap.

---

## 2 — Source-grounded findings (file:line)

1. **The blob samples no backdrop — it cannot read as glass.** `metaball.frag.ts:497`
   `fragColor = vec4(rgb*alpha, alpha)` is a self-color premultiplied overlay; there is no
   `uBackdrop`/scene sampler uniform anywhere in the 498-line shader. Live proof:
   `AX/audit/visual/W46-goo-blob-desktop-light.png` (opaque plastic lumps).
   → The 2025 liquid-glass read (Technique 1/2) is ARCHITECTURALLY absent, not mis-tuned.

2. **The dome-Z is the spherical-circle profile, not Apple's squircle.** `metaball.frag.ts:273`
   `z = sqrt(1 - (1-interior)²)`. Apple's preferred liquid-glass bevel is the convex SQUIRCLE
   `⁴√(1-(1-x)⁴)` (softer flat-to-curve — kube.io). Mismatch with the library's own squircle
   identity (AX.W56 ships squircle to dialogs/sheets — the blob bevel should rhyme).

3. **Five lighting layers co-add with no backdrop to ground them.** `types.ts:283-296` ships
   `iridescence:0.09 + sssScale:0.1 + coreGlow:0.06 + specStrength:0.16 + rimStrength:0.32` ALL on
   a ~0.14uv bead. AX.W46 already had to crush these (the `0.85` highlight clamp at
   `metaball.frag.ts:483`, the energy-conserving re-derivation) because they blew to white. This
   is the tell: the lit terms are over-worked precisely BECAUSE there is no refracted backdrop
   doing the heavy lifting — lighting is being asked to fake glass that refraction should provide.

4. **`useMetaballRenderer.ts` is 694 lines — a STILL-LIVE god-module.** Confirmed `wc -l = 694`
   (> the 500 floor). This is AY.W-GOD1's named carve target; any AY.W-BLOB impl wave that ADDS a
   backdrop-sampling pass MUST land on the post-carve module or it deepens the violation. The
   research input must FLAG the ordering dependency (W-GOD1 carve BEFORE or WITH the blob impl).

5. **The README is stale and over-claims.** `goo-blob/README.md` (per AX W16 note 9, the
   planned→landed sweep) and the live look diverge: the component sells "lit contained droplet /
   living membrane" but renders as a matte lump. Any README the AY.W-DOC1 wave produces must cite
   the W-BLOB research and show a CAPTURED delta, not the aspirational copy.

6. **No backdrop/refraction proof gate exists.** The 12 `proof:blob-*` gates lock the MATH
   (smin-normalized, space-gamma, gradient-unit-length, spec-premult, color-equivalence) and the
   render BOUNDS (blob-render opaque-fraction, blob-live-truth). NONE asserts the glass read
   (a backdrop visibly bent through the body, a measurable rim-vs-centre displacement). The
   acceptance bar has no machine lock for the actual deliverable.

---

## 3 — Chronic-miss flag

**The "stunning blob" bar is CHRONIC across AT → AU → AV → AW → AX (≥5 tranches).** Every tranche
"unblocked the core" (AT primitives → AU OKLCh → AV converge → AW droplet → AX contained-lit-tune)
and every tranche's live capture still shows a matte lump. The pattern: each tranche TUNES the
self-lit-overlay model harder (more lighting layers, tighter clamps, re-derived magnitudes) instead
of CHANGING the model. **AY breaks the chronic only by changing the architecture** (add the backdrop
refraction pass — Technique 1/4), not by tuning the lit terms a sixth time. A sixth tune-pass is the
chronic-miss trap; the wave spec must forbid it.

---

## 4 — Fold-into routing

- **AY.W-BLOB1 (research)** — this brief IS its input. Re-point W-BLOB1's hard gate from "research
  doc + ranked path" (which AX already produced and got WRONG) to "research doc that lands the
  backdrop-refraction architecture decision + the glass-read acceptance bar". DONE here.
- **AY.W-BLOB2 (impl — surface)** — folds Technique 1/2/3: add the `uBackdrop` sampler + the
  squircle-bevel refraction-displacement + low chromatic dispersion + the saturation-correct;
  re-balance the five lit layers DOWN now that refraction grounds the glass read.
- **AY.W-BLOB3 (impl — integration/perf)** — folds Technique 4: the substrate-FBO/`uBackdrop` wiring
  (the aurora-as-backdrop hero composition), perf budget for the +3-tap dispersion (gate behind a
  `dispersion`/`refraction` axis, half-res tier), the `proof:blob-glass-read` gate, live capture.
- **AY.W-GOD1** — ORDERING DEPENDENCY: carve `useMetaballRenderer.ts` (694→<500) BEFORE/WITH
  W-BLOB2 so the new sampler pass does not deepen the god-module.
- **AY.W-DOC1** — the README sweep cites this brief + the W-BLOB2/3 captured delta (finding 5).
- **AY.W-AUR (aurora)** — COUPLING: the "blob over aurora" is the canonical backdrop-refraction
  hero; W-BLOB3 and the aurora impl share the FBO/backdrop-texture seam. Coordinate.

---

## 5 — Convergence criteria (what "perfected blob" concretely means)

The blob is PERFECTED when, on a CAPTURED live delta (the cardinal lesson — screenshot + π readback,
NOT a commit claim):
1. Over a non-flat backdrop (aurora or a gradient), the backdrop is **visibly bent/lensed through
   the body** — a straight gradient line behind the blob reads as curved at the rim and undisplaced
   at the centre (the lensing signature). Measurable: rim-region UV displacement > 0, centre ≈ 0.
2. A **whisper of chromatic fringe** at the rim (R/G/B edges separable on zoom), default-LOW, never
   a prism.
3. The body reads **TRANSLUCENT** — the backdrop shows through, not an opaque fill (the live capture
   no longer looks like the W46 plastic lumps).
4. The five lit layers are **re-balanced DOWN** (refraction now carries the glass; lighting is the
   thin edge catch-light on top, not the whole show).
5. The motion doctrine (breath/spring/squash/pseudopod) is **PRESERVED unchanged** (it was never the
   gap).
6. Perf: the +3-tap dispersion is gated behind a `refraction`/`dispersion` axis with a half-res tier;
   the offscreen-park + PRM-rest-pose + multi-instance-context-cap (WatercolorDot cascade) all hold.
7. `useMetaballRenderer.ts < 500` and no new nested-import / tests-in-src.
8. `proof:blob-glass-read` (new) green + the existing 12 `proof:blob-*` stay green.

---

## 6 — waveSpecInputs (the material a fully-authored AY.W-BLOB spec needs)

**Defect (file:line):**
- `metaball.frag.ts:497` — self-color premultiplied overlay, NO backdrop sampler → cannot read as
  glass (live proof `AX/audit/visual/W46-goo-blob-desktop-light.png` = opaque lumps).
- `metaball.frag.ts:273` — spherical-circle dome-Z, not Apple's convex-squircle bevel.
- `types.ts:283-296` — five lit layers over-worked to fake glass refraction should provide.
- `useMetaballRenderer.ts` = 694 LOC god-module (ordering dep on W-GOD1).

**Objective:** Transpose the blob from a self-lit OPAQUE-overlay metaball to a 2025 LIQUID-GLASS
droplet that refracts a glass-ui-rendered backdrop through itself (Snell displacement off the
squircle-bevel normal + low chromatic dispersion + saturation-correct), with the existing lit terms
re-balanced to the thin-edge-catch-light TOP layer and the motion doctrine preserved. Portable
WebGL2; the backdrop is a `uBackdrop` sampler glass-ui supplies (aurora FBO / baked gradient), NOT
the DOM (no DOM-sampling API is portable).

**Files / edit-sites:**
- `src/components/custom/goo-blob/shaders/metaball.frag.ts` — add `uniform sampler2D uBackdrop`,
  `uIor`/`uDispersion`/`uRefractPower` uniforms; the refraction block (sample backdrop along the
  Snell-refracted UV, 3× for dispersion, saturation-correct); switch the dome profile to the squircle.
- `src/components/custom/goo-blob/shaders/sdf-body.glsl.ts` — squircle dome-Z helper.
- `src/components/custom/goo-blob/composables/useMetaballRenderer.ts` — bind the backdrop texture
  (FBO or consumer-supplied), upload the IOR/dispersion uniforms; CARVE to <500 (W-GOD1).
- `src/components/custom/goo-blob/types.ts` — `refraction`/`dispersion`/`ior` config fields + defaults
  (refraction ON-by-default low, dispersion whisper-low — the SOTA-as-default per the greenfield mandate).
- `src/composables/glass/webgl/...` — the shared backdrop-FBO seam (coordinate with the aurora wave).
- `package.json` — `proof:blob-glass-read` gate.
- `goo-blob/README.md` — planned→landed sweep citing this brief.

**The HARD GATE (evidence-backed):** `proof:blob-glass-read` — mount the blob over a SYNTHETIC
striped/gradient backdrop texture, render N frames, `preserveDrawingBuffer` readback, and ASSERT:
(a) the backdrop stripe is DISPLACED at the rim region (sampled-UV offset > threshold) and
UNDISPLACED at the centre (offset ≈ 0) — the lensing signature; (b) R/G/B channel separation at the
rim > 0 (dispersion present) but bounded (not a prism); (c) the body is TRANSLUCENT (backdrop
luminance contributes to the body pixels — not a pure self-color fill). PLUS a CAPTURED live delta
(blob over the real aurora, before/after) — the cardinal lesson, not a commit claim. The existing 12
`proof:blob-*` stay green; `proof:no-god-module` green (renderer <500).

**Anti-pattern to FORBID in the spec:** a sixth tune-pass of the self-lit-overlay lighting layers in
lieu of the architectural refraction change (the chronic-miss trap — §3). No html2canvas/DOM-snapshot
backdrop path (non-portable, slow — research-rejected). No hard WebGPU dependency (decorative element;
WebGPU stays a documented substrate-wide non-goal per the AX research, which IS correct on this point).

---

## Sources
- [Liquid Glass in the Browser: Refraction with CSS and SVG — kube.io](https://kube.io/blog/liquid-glass-css-svg/)
- [Refraction, dispersion, and other shader light effects — Maxime Heckel](https://blog.maximeheckel.com/posts/refraction-dispersion-and-other-shader-light-effects/)
- [Building Glass for the Web — aave.com](https://aave.com/design/building-glass-for-the-web)
- [Recreating Apple's Liquid Glass on the Web — DEV/maxgeris](https://dev.to/maxgeris/recreating-apples-liquid-glass-effect-on-the-web-with-css-svg-and-physics-based-refraction-5cek)
- [HTML-in-Canvas API (Chrome 2026 origin trial) — byteiota](https://byteiota.com/html-in-canvas-api-draw-live-dom-inside-webgl-chrome-2026/)
- [Chromatic Aberration / dispersion GLSL — Geeks3D](https://www.geeks3d.com/20101008/shader-library-chromatic-aberration-demo-glsl/)
- Prior-tranche grounding: `docs/tranches/AX/research/blob-synthesis.md` (the AX claim this brief falsifies); `docs/tranches/AX/audit/visual/W46-goo-blob-*.png` (the live proof).
