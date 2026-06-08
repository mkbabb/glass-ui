# AX.W13 — First-class van-Gogh + oil-pastel mediums + pigment-true stroke compositing

**Band** C · AURORA · **Severity** major · **dependsOn** AX.W12 (the `StrokeProfile` /
`paintStrokeLayers` substrate + the high-quality painterly noise basis the medium bodies ride)
· **Charter** AX.md §3 (the `### AX.W13` block, lines 771-797) + §4 note 14 (the WEBGPU_PARITY
DELETE-branch — W13 ships GLSL/WebGL2 mediums ONLY, never a WGSL medium dispatch) + §2b band-C
precept row · **Audit** `deep-audit-corpus.json` slice `aurora-mediums-painterly` (index 8,
findings F0/F1/F2/F5 + the F6 substrate precondition W12 owns) + slice `legacy-excision`
(index 26, finding F5 — the crayon `strokeMode` peer-route special-case) + `converge-digest.md`
lines 65-66 (speedtest's `deriveAurora` OIL `uSheen` + boldness/oiliness sharpening as
medium-design INPUT) + line 365 (the W13-ships-WebGL2-mediums-only constraint).

---

## State (born-RED — the gate must fail at HEAD before the wave)

The wave is born-RED on a **first-class-medium-grammar** witness that does NOT exist at HEAD
`6e3ad10` (the charter cites `eaba94f` as the audit baseline; the four W13 surfaces below are
identical at both — re-prove live per the W00 ritual). Five falsifiable RED witnesses, each a
source-true line probe the new gate inverts:

- **RED witness 1 (the headline — van-Gogh is a one-line passthrough).**
  `mediums.glsl.ts:335-336` is literally `vec3 mediumVangogh(vec3 col, vec2 p, float t) { return
  mediumOil(col, p, t); }` — there is NO distinct van-Gogh stroke body. The only van-Gogh-specific
  behaviour is the `uMedium==5` energy-grade switch inside `bestOil` (`brush.glsl.ts:263-268`,
  4 lines) multiplying stroke LENGTH on the SAME `bestOil` placement + the SAME `curvedStroke`
  symmetric-taper SDF + the SAME bristle/streak params as plain oil. **The falsifiable RED
  assertion:** *parse `mediumVangogh`'s body — at HEAD it is `return mediumOil(...)` (a passthrough,
  RED). After the wave it is a first-class body composing its OWN comma/crescent `StrokeProfile`
  (a `vangogh` profile entry off the W12 `profileFor` selector), atomic dab placement (sparse,
  high-contrast, visible inter-stroke gaps), ETF-tangent row-clustering, and full-height impasto
  crowns — NOT a call to `mediumOil` (GREEN).*

- **RED witness 2 (oil-pastel and crayon share ONE dispatch body).** `aurora.frag.ts:405,407`
  dispatch BOTH `uMedium==4` (legacy crayon) AND `uMedium==6` (oil-pastel) to the IDENTICAL
  `mediumCrayon` body; DESIGN.md:191 confirms "share this single body — no duplicate." The body
  (`mediums.glsl.ts:138-207`) is a per-pixel tooth-noise DEPOSITION/scumble/burnish multiply-and-
  mask — it never lays a discrete pastel STROKE. RED: `mediumOilPastel` does not exist as a
  separate function; `uMedium==6` resolves to `mediumCrayon`. After the wave a distinct
  `mediumOilPastel` deposits smeared directional strokes via the (W12-extracted) brush engine with
  a creamy `hardness` + heavy burnish + pigment build-up; `mediumCrayon` keeps the dry
  tooth-multiply (no sheen, hard scumble); the two share the SUBSTRATE (placement/tooth helpers),
  NOT the dispatch body. (GREEN.)

- **RED witness 3 (stroke OVER-compositing is linear-RGB — overlap muds to grey).**
  `brush.glsl.ts:182` composites overlapping strokes via `col = mix(col, c, alpha)` — a LINEAR-RGB
  `mix`. Where two complementary-hued strokes overlap (the constant case for dense atomic van-Gogh
  dabs), the result muds toward grey — the EXACT muddy-midtone defect W5's OKLCh palette move killed
  at the palette layer, RE-ENTERING at the compositing layer because `paintOver` stayed linear.
  RED: `paintOver`'s composite is a bare linear `mix`. After the wave `paintOver` composites in
  OKLab (lerp L,a,b of the over-color toward the under-color — the Ottosson matrices already ship in
  `procedural-color.glsl.ts` per the single-source chunk) on the painterly mediums only, so
  overlapping complementaries transition through a chromatic path, not grey. (GREEN.)

- **RED witness 4 (broken color is per-CELL, not within-stroke — flat stamped swatches).**
  `brush.glsl.ts:277-282` applies `brokenColorJitter` ONCE at the stroke cell center
  (`colMid = brokenColorJitter(sampleBase(center), …)`) — one constant jittered hue for the WHOLE
  stroke; `paintOver` (`brush.glsl.ts:171-174`) modulates only VALUE via the streak fBm
  (`c *= 1.0+streak*streakAmp`), never HUE. RED: there is no WITHIN-stroke hue/chroma variation —
  `curvedStroke` returns a single `colAtMid`. After the wave the within-stroke streak modulation
  perturbs hue+chroma in OKLCh along `alongT`/`crossN` (seeded per-stroke off the streak fBm already
  in scope), so a single stroke carries a small hue gradient — broken color at the ATOM level.
  (GREEN.)

- **RED witness 5 (the crayon `strokeMode` legacy peer-route is a live silent special-case).**
  `uniformBridge.ts:38` carries a `crayon: 4` MEDIUM_ID slot annotated "the legacy StrokeMode peer
  route"; `resolveMediumId` (`uniformBridge.ts:99-100`) special-cases `oil` + `strokeMode:"crayon"`
  → `MEDIUM_ID.crayon`; `mediums.glsl.ts:141` carries a "fall back to flowField for the legacy
  crayon strokeMode route" fall-through; `presets.ts:69` still carries `"crayon"` in the `StrokeMode`
  union. RED: the legacy `strokeMode:"crayon"` path is neither excised nor failing — a silent
  special-case mapping (§0 violation). After the wave it is RESOLVED ONE way (PROMOTE to a clean
  first-class `crayon` medium with no `strokeMode` special-case, OR REMOVE the `strokeMode:"crayon"`
  union member + the `resolveMediumId` branch + the `mediums.glsl.ts:141` fall-through if the
  oil-pastel/crayon split subsumes it). (GREEN.)

The wave is RED at HEAD on all five; the HardGate below drives each to GREEN. **CRITICAL COUPLING:**
the EXISTING gates `proof:aurora-vangogh-preset` (asserts the `uMedium==5` energy-grade switch on
the SHARED engine) and `proof:aurora-oilpastel-medium` (asserts the SHARED `mediumCrayon` body
serves BOTH `uMedium 4` and `6`) currently PASS over exactly the passthrough+shared-body state this
wave dismantles — they are the live witness that "a passthrough + a shared body both PASS the
current text gates" (charter §3). Both gates are RE-AUTHORED IN THIS WAVE (born-RED on the new
first-class assertions) or the wave's own change reds its own gate. This is the headline
gate-truth-up.

---

## Goal

Van-Gogh and oil-pastel become FIRST-CLASS mediums with their own atomic stroke grammar — a distinct
comma/crescent van-Gogh body, an oil-pastel split from dry crayon, OKLab stroke OVER-compositing so
overlapping complementaries mix as pigment not grey, and within-stroke OKLCh broken color — so the
live aurora paints separable, pigment-true painterly marks congruent to actual Van Gogh / oil-pastel
works, not energy-graded oil swatches.

---

## Scope (the gestalt fix — no workaround, no legacy, no shared dispatch body)

Slice 8 F0/F1/F2/F5 + slice 26 F5 are the SAME architectural seam — the W4 DRY precept collapsed two
distinct media onto one engine and left the compositing/broken-color at the WRONG layer. ONE
cohesive first-class-medium pass, RIDING the W12 substrate (`StrokeProfile` + `paintStrokeLayers` +
the high-quality painterly noise basis), NOT a fork of the 117-line `mediumOil` monolith. The
charter root-cause (slice 8 F0): real Van Gogh atomicity is NOT a length modulation — it is separable
directional dabs with their OWN shape/spacing/impasto, and the W4.3 spec collapsing it onto a
`uMedium==5` energy-grade switch is the defect.

1. **First-class `mediumVangogh` body (slice 8 F0 — the headline).** Replace the `return mediumOil(…)`
   passthrough with a real body authored through a `vangogh` `StrokeProfile` (the W12 selector):
   (a) a **comma/crescent stroke profile** — a new `strokeShape` type bending the spine + tapering
   both ends ASYMMETRICALLY (vs oil's symmetric taper); (b) **explicit atomic dab placement** —
   sparse, high-contrast, with visible inter-stroke canvas gaps (lower density, higher per-stroke
   opacity) so each stroke reads as a separable mark, not a coverage smear; (c) **rhythmic
   row-clustering** — offset stroke cells along the ETF tangent so dabs queue into Starry-Night
   swirl rows; (d) **per-stroke impasto ridge crowns at FULL height** (not oil's `0.4+0.6·edgeN`
   falloff) so each atomic stroke catches its own glint. The `bestOil`/`curvedStroke` placement
   substrate is REUSED (parameterized through the `vangogh` profile), NOT a `uMedium==5` if-branch
   buried in the shared engine — the 4-line `brush.glsl.ts:263-268` energy-grade switch is folded
   INTO the profile (the energy-graded cascade survives AS a profile field, not a buried branch).

2. **Split `mediumOilPastel` from `mediumCrayon` (slice 8 F1).** Author a distinct `mediumOilPastel`
   that DEPOSITS short broad smeared directional strokes via the (W12-extracted) brush engine with a
   soft creamy `hardness`, heavy burnish, and pigment build-up where strokes overlap — the
   stroke-deposition model that gives oil-pastel its "depth" and "less uniform" read. Keep
   `mediumCrayon` as the existing DRY tooth-multiply (no sheen, hard scumble) for the dry crayon
   medium. Re-point `aurora.frag.ts:407` (`uMedium==6`) to `mediumOilPastel`; `uMedium==4` keeps
   `mediumCrayon`. The W4.4 "no parallel duplicate medium" precept is satisfied by sharing the
   SUBSTRATE (placement/tooth helpers via the W12 `paintStrokeLayers` + tooth fields), NOT the
   dispatch body — the audit's explicit gestalt-fix language (slice 8 F1).

3. **OKLab stroke OVER-compositing (slice 8 F2 — the single highest-leverage lever).** Move
   `paintOver`'s linear-RGB `mix` (`brush.glsl.ts:182`) into OKLab on the PAINTERLY mediums only
   (oil/vangogh/oil-pastel) — lerp the L,a,b of the over-color toward the under-color using the
   Ottosson matrices ALREADY in `procedural-color.glsl.ts` (the single-source chunk — no new color
   math, KISS). Overlapping complementaries then transition through a chromatic path, not grey. This
   is the deferred AW.W4 §10 Kubelka-Munk fold whose trigger condition is NOW MET (dense atomic
   van-Gogh strokes overlap constantly). **The cheapest correct fix is OKLab; the Kubelka-Munk
   `pigmentMix` is the richer option — RATIFY which (see Open Questions).** Gate the OKLab composite
   OFF for the smooth/atmospheric pole for cost (the painterly mediums opt in).

4. **Within-stroke OKLCh broken color (slice 8 F5).** Move the within-stroke streak modulation into
   OKLCh — perturb the stroke color's hue+chroma along `alongT`/`crossN` (the streak fBm already
   computed in `paintOver`), seeded per-stroke, so a single stroke carries a small hue gradient (the
   broken-color read at the ATOM level, not just cell-to-cell). Cheap (the fBm + the OKLCh matrices
   are already in scope) and it is what makes adjacent strokes shimmer like real impasto rather than
   reading as flat stamped swatches. This folds INTO the van-Gogh body (the audit routes F5 "folds
   into the van-Gogh medium wave") but applies to every painterly medium that calls `paintOver`.

5. **Resolve the crayon `strokeMode` legacy peer-route (slice 26 F5 — the aurora-domain disposition
   the legacy lane deferred to this wave).** The `oil` + `strokeMode:"crayon"` → `MEDIUM_ID.crayon`
   special-case is an aurora-medium-axis judgment (slice 26 F5 explicitly deferred it to "the aurora
   simplification wave"). With the oil-pastel/crayon split landing here, RESOLVE it ONE way — either
   PROMOTE `crayon` to a clean first-class medium with no `strokeMode` special-case, OR REMOVE the
   `strokeMode:"crayon"` union member + the `resolveMediumId` branch (`uniformBridge.ts:99-100`) +
   the `mediums.glsl.ts:141` fall-through if the split subsumes it. **RECOMMENDATION (RATIFY-BEFORE-
   IMPL): REMOVE** — the split makes `crayon` a clean `uMedium==4` first-class medium and the
   `strokeMode:"crayon"` ALIAS becomes pure legacy debris (no backwards-compat aliases, MEMORY
   no-backwards-compat). The atoms-door medium-axis simplification is W10's; the per-pixel crayon
   peer-route disposition is THIS wave's (the split forces it).

### CONVERGE folds (consumer-grounded design INPUT, NOT executed here)

- **speedtest `deriveAurora` sharpening as medium-design INPUT (digest 65-66).** speedtest's
  hand-rolled `deriveAurora` carries an OIL register with a `uSheen` lever + a boldness/oiliness
  perceptual axis (5 axes, 6 registers, derived-from-#CC2233). This is rich consumer-grounded INPUT
  for the oil-pastel `hardness`/`burnish`/sheen and the van-Gogh impasto magnitudes — the
  oil-pastel BURNISH film (slice 8 F1 gestalt) maps onto speedtest's OIL `uSheen`. The wave READS
  this as design reference; the speedtest consumer-adoption (revert its stopgap onto the converged
  surface) is W10/W28/W34's, NOT this wave's. Author the cross-ref note, not the sibling edit.
- **The WGSL twin gains NO medium dispatch — and that is CORRECT (§4 note 14 / digest 365).** W13
  ships the GLSL/WebGL2 mediums ONLY. The WGSL single-pass twin (`aurora.wgsl.ts`) gets no
  `mediumVangogh`/`mediumOilPastel` branch — and per §4 note 14's DELETE-branch decision, it never
  should: WebGPU is an OPT-IN Kuwahara finish over a parity-FLOOR field (W14), never an auto-default,
  so "medium parity in the WGSL twin" is explicitly NOT a goal. This wave does NOT touch
  `aurora.wgsl.ts`; the W07-set `WEBGPU_PARITY=false` stays false. Flagged so an implementer does
  not try to "reach parity" by porting the mediums into WGSL (the rejected alternative path).

---

## SOTA deepening (aurora research)

This is the corpus's densest medium-fidelity wave. The literature supplies the van-Gogh stroke-based-rendering
cascade, the oil-pastel scumble/burnish/tooth model, and the named pigment-compositing math for the OVER-blend.
Cited facets: **9** (van-Gogh brushstroke synthesis), **8** (oil-pastel rendering), **10** (impasto
height→normal→relight), **11** (SBR), **12** (watercolor), **13** (paper texture).

**Van-Gogh body (scope item 1) — the SBR cascade [facets 9, 11, 10]:**

- **Multi-scale coarse-to-fine SBR is the biggest quality lever, named [facets 9, 11].** Hertzmann 1998: paint
  in layers of DECREASING brush radius (canonical {8,4,2}), fine dabs ONLY where the coarse layer's luma
  diverges from a blurred reference (the residual field). Facet 11 flags this as "the single most important
  quality lever and NOT yet in our engine — our oil path is single-scale." A 2–3 descending-cellSize cascade,
  each gated by the previous residual, is the principled engine for "long-in-lights / dabs-in-darks" as a
  SCALE cascade, not a single-pass length lerp. The Starry-Night turbulence prior (facet 9: luminance power
  spectrum follows −5/3 Kolmogorov across the visible-eddy band, −1 Batchelor below) is the cell-size /
  brightness-coupling exponent.
- **Replace the fixed quadratic-bulge spine with structure-tensor integration [facets 9, 11].** The engine's
  `bend = 4·K·t·(1−t)` is a single symmetric parabola; facet 11 prescribes a SHORT multi-step integration
  (2–4 segments) along the `structureTensorField` minor-eigenvector — genuinely meandering strokes that hug
  iso-bands. The comma/crescent `strokeShape` (asymmetric taper) the W13 van-Gogh profile authors is the
  divisionist atomic dab.
- **Directional complementary broken color (NOT i.i.d. jitter) [facet 9].** Facet 9's divisionism note: push
  NEIGHBORING cells toward OPPOSITE OKLCh hue/temperature poles (the blue/orange, red/green optical mixing van
  Gogh used), not symmetric ±16° jitter. This is the corpus's exact refinement for W13 scope item 4's
  within-stroke OKLCh broken color — the directional pole-push is what makes adjacent strokes shimmer.
- **GGX relight is the 2026 SOTA over Blinn-Phong, with named constants [facet 10].** Facet 10 (Liu et al.
  2026, Differentiable Stroke Planning): shade the impasto height field with a GGX/Cook-Torrance microfacet
  BRDF — roughness α=0.3, Fresnel F0=0.08 (the canonical non-metallic-pigment value), `(Ld,Ls)=(1.0,0.8)`. The
  Schlick-Fresnel `pow(1−N·V, p)` rim is the TRUE view-dependent catch-light (the old `vec3(0.18,0.15,0.11)`
  constant rim was a screen-space phantom UL light); for a camera-less backdrop V is fixed at (0,0,1) so N·V
  reads as a grazing sheen on the steep impasto flanks. MANDATORY companion: geometric specular AA (Toksvig /
  Kaplanyan — fold sub-pixel normal variance into roughness, `roughness'² = roughness² + k·|∇N|²`) or the
  fbm-driven height field strobes once the lobe sharpens; and a 4-tap central-difference normal (kill the
  dFdx 2×2-quad faceting). The full-height impasto crowns (scope item 1d) catch their own glint under this.

**Oil-pastel body (scope item 2) — scumble / waxy burnish / paper tooth [facet 8]:**

- **Pigment-on-tooth deposition + scumble is the headline oil-pastel model [facet 8].** Facet 8 (Murakami &
  Tsuruno 2002): model the support as a height field; pigment lands on tooth PEAKS and skips VALLEYS
  (smoothstep coverage against paper height with a pressure-lowered floor). SCUMBLE = a broken upper layer at
  coverage<1 dragged over a base so the lower color reads THROUGH the gaps → OPTICAL mixing. The W13 oil-pastel
  profile makes scumble optical (let the lower palette color show through) — facet 8's "the eye blends the
  broken film" pointillism principle. Sgraffito (scratch-through to reveal under-layers) is the inverse
  negative-coverage move, a cheap high-value gesture.
- **Waxy burnish = a wide low-roughness specular lobe that grows with layer count [facet 8].** Facet 8: model
  the oil-pastel sheen as a wide Blinn lobe (low exponent ~6) whose intensity GROWS with pigment build-up
  (burnish), distinct from oil-impasto's sharp glint. This maps onto speedtest's OIL `uSheen` axis (the
  CONVERGE fold INPUT already noted in scope) and the W13 `hardness`/burnish profile fields.
- **Broken color via per-cell OKLCh jitter, not RGB snow [facet 8].** Hash stable pigment patches, jitter
  hue(±~16°)/value(±~14%) in OKLCh — "so it reads as broken paint not chroma snow." This is scope item 4 done
  per-cell; the directional-complementary refinement (facet 9) is the van-Gogh sharpening over it.

**Pigment compositing (scope item 3) — the OKLab vs Kubelka-Munk RATIFY [facets 8, 12, 13]:**

- **OKLab OVER-compositing is the cheap-correct fix; Kubelka-Munk is the richer option, both corpus-named
  [facets 8, 12].** The W13 recommendation (move `paintOver`'s linear-RGB `mix` into OKLab on painterly
  mediums) is the cheapest correct fix — overlapping complementaries transition through a chromatic path, not
  grey, reusing the Ottosson matrices already in the shared chunk. The RICHER option is Kubelka-Munk
  subtractive mixing (facet 8/12: spectral.js / spectral.glsl — lift sRGB to a 38-band reflectance curve, mix
  K/S by concentration, recombine; blue+yellow→green, not the muddy lerp). The corpus's COST guidance is
  decisive: **bake the K-M mix into the CPU palette LUT (zero per-pixel cost)** rather than calling 38-band
  `spectral_mix` per fragment, strip spectral.js's own companding (keep aurora's single shared OETF), and gate
  to painterly mediums. This is the citable basis for the W13 Open-Questions RATIFY (OKLab vs K-M) — OKLab
  ships as the default; K-M-as-CPU-LUT is the recorded richer path if the LUT bake is warranted.
- **Watercolor's wet-edge / granulation / boundary-wobble levers are single-pass and corpus-named [facet
  12].** Though watercolor is not W13's headline medium, facet 12 supplies the single-pass upgrades the
  `watercolor` profile can adopt: the wet-edge power-curve `col = pow(col, 1+k·edge)` (monotone, rim-darkens
  more, pre-tonemap — replaces a flat multiply), pigment-density turbulence `col *= (1 − density·(τ−0.5))` (the
  no-flat-fills keystone), paper-height granulation + OKLab two-pigment separation, and boundary wobble (warp
  the edge sample coordinate by the existing fBm). The fluid wet-on-wet bleed + backruns are inherently
  multi-pass → the W14 WebGPU wake, NOT W13.
- **Paper-tooth grain is luminance-adaptive + soft-light composited [facet 13].** Facet 13: grain amplitude is
  gated by local brightness (`smoothstep(0.05,0.5,luminance)` — strongest in mid-shadows, suppressed in
  highlights) and blended via soft-light NOT additive (additive washes shadows to grey). Physically-based
  granulation = heavy pigment settles in tooth valleys (height-field × pigment-load weight, not a uniform
  multiply). These are the corpus's "grain interacts with pigment opacity" laws for the tooth fields the W12
  noise basis feeds.

**Reconciliation note:** W13 authors NEW medium bodies (van-Gogh, oil-pastel split) RIDING the W12 substrate +
the confirmed-correct placement/relight primitives — it does not re-derive them. The corpus confirms the
bristle/impasto relight is already SOTA-parity (facet 11) and supplies the named upgrades (GGX + specular AA +
central-difference normal, multi-scale cascade, directional broken color, scumble optical mixing) as the
medium-fidelity perfection layer. The multi-pass Kuwahara/LIC painterly FINISH is explicitly W14, not W13.

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/components/custom/aurora/constants/shaders/mediums.glsl.ts` | **Author** the first-class `mediumVangogh` body (`:335-336` passthrough → a real body through the `vangogh` `StrokeProfile`); **split** `mediumOilPastel` OUT of `mediumCrayon` (new function; `mediumCrayon` stays the dry tooth-multiply); resolve the `:141` legacy crayon fall-through per the W5 disposition. |
| `src/components/custom/aurora/constants/shaders/brush.glsl.ts` | Add the comma/crescent `strokeShape` type (`:46`); move `paintOver`'s linear `mix` (`:182`) into OKLab on the painterly mediums; move the within-stroke streak modulation into OKLCh (`:171-174`); fold the `uMedium==5` energy-grade switch (`:263-268`) INTO the `vangogh` profile path (un-bury it from the shared `bestOil` branch). |
| `src/components/custom/aurora/constants/shaders/aurora.frag.ts` | Re-point the `uMedium==6` dispatch (`:407`) to `mediumOilPastel`; `:405` (`uMedium==4`) keeps `mediumCrayon`. (NO change to the `uMedium==5` dispatch line — it still calls `mediumVangogh`, now first-class.) |
| `src/components/custom/aurora/composables/uniformBridge.ts` | Resolve the `crayon: 4` legacy peer-route per the W5 disposition: REMOVE the `resolveMediumId` `strokeMode:"crayon"` branch (`:99-100`) + the comment (`:38`) if REMOVE is ratified; or promote to a clean first-class medium with no special-case. |
| `src/components/custom/aurora/constants/presets.ts` | REMOVE `"crayon"` from the `StrokeMode` union (`:69`) if REMOVE is ratified (clean break, no alias). |
| `src/components/custom/aurora/DESIGN.md` | Correct `:180-181,190-191` to the painted reality — van-Gogh is a first-class body (not "composes the oil stroke engine" via passthrough); oil-pastel/crayon NO LONGER "share this single body" (they share the SUBSTRATE); the OKLab stroke composite + within-stroke OKLCh broken color; the crayon `strokeMode` disposition. Documentation is part of the change. |
| `scripts/proof-aurora-vangogh-preset.mjs` | **RE-AUTHOR** (born-RED): assert `mediumVangogh` is NOT a `return mediumOil(...)` passthrough; assert a distinct comma/crescent profile + atomic placement + full-height impasto; assert the energy-grade is a PROFILE field not a buried `uMedium==5` `bestOil` branch. (Co-update so the wave's own change does not red its own gate.) |
| `scripts/proof-aurora-oilpastel-medium.mjs` | **RE-AUTHOR** (born-RED): assert `mediumOilPastel` is a DISTINCT function (NOT `mediumCrayon`); assert `uMedium==6`→`mediumOilPastel` and `uMedium==4`→`mediumCrayon` dispatch to DIFFERENT bodies; assert the shared SUBSTRATE (placement/tooth) is reused; assert the dry-crayon tooth-multiply survives. |
| `scripts/proof-aurora-stroke-composite.mjs` | **NEW** — assert `paintOver` composites in OKLab on the painterly mediums (NOT a bare linear `mix`); assert the within-stroke modulation perturbs hue/chroma in OKLCh (not value-only); the OKLab matrices resolve from the shared `procedural-color` chunk (single-source). |
| `package.json` | Register `proof:aurora-stroke-composite` (the new `proof:*` entry + the W00 meta-gate parity match); the two re-authored gates keep their names (`proof:aurora-vangogh-preset`, `proof:aurora-oilpastel-medium`). |
| `docs/tranches/AX/audit/W13-vangogh-oilpastel-mediums.json` | **NEW** — the born-RED→GREEN audit artefact + the paired-π BEFORE/AFTER + DELTA reference. |

**OUT of bounds:** the `StrokeProfile` struct + `profileFor` selector + `paintStrokeLayers` + the
high-quality painterly noise basis (**W12 owns** — this wave CONSUMES them; if W12's substrate is
not yet landed the implement step BLOCKS on it); `aurora.wgsl.ts` / `painterly.wgsl.ts` /
`wake.wgsl.ts` (the WGSL twin + the WebGPU multi-pass — **W14**, NOT touched here; §4 note 14); the
`createGPUCanvas`/`gpuRuntime` FBO plumbing (**W14**); the atoms-door / `resolveAtoms` / the
medium-AXIS simplification + the `deriveAurora` public surface (**W10/W11**); the OKLCh palette
INTERPOLATION + the catch-light sRGB-literal + the WGSL palette-ramp gate hole (**W11**); the
specular catch-light (**W09**); the aurora black-canvas WGSL fixes (**W07**); the blob mediums
(none — blob has its own surface, **W15/W16**).

---

## Disjointness (sibling waves it must NOT overlap)

W13 is the THIRD aurora-band wave touching the shader tree; the dispatch contract keeps it
file-disjoint from its band siblings:

- **vs W12 (mediums substrate) — HARD PREDECESSOR, file-OVERLAPPING.** W12 EXTRACTS `StrokeProfile`
  + `profileFor` + `paintStrokeLayers` into `mediums.glsl.ts`/`brush.glsl.ts` and authors the new
  GLSL integer-PCG hash + gradient-noise basis in `procedural-color.glsl.ts`. W13 then AUTHORS the
  `vangogh` + `oil-pastel` profile bodies ON that substrate IN THE SAME two shader files. **They
  share `mediums.glsl.ts` + `brush.glsl.ts` — so W13 runs STRICTLY AFTER W12 (dependsOn AX.W12),
  never concurrently.** W12 leaves the existing oil medium visually NEUTRAL (its gate asserts no
  regression); W13 builds the new bodies on the settled substrate. No three-way merge: sequential by
  dependsOn.
- **vs W07 (aurora core unblock — WGSL black-canvas).** W07 edits `aurora.wgsl.ts` + `packGPUUniforms`
  + the storage-buffer transposition + sets `WEBGPU_PARITY=false`. W13 touches NONE of the WGSL twin
  (the GLSL/WebGL2 mediums only). File-disjoint — but W13 dependsOn W12 dependsOn W07, so W07 is a
  transitive predecessor (the WebGL2 path must render non-black before the mediums on it can be
  visually audited). No file collision.
- **vs W14 (WebGPU painterly parity).** W14 dependsOn {W07, W13}. W14 wires the multi-pass
  Kuwahara/LIC/tensor compositor in `gpuPasses.ts`/`gpuRuntime`/`painterly.wgsl.ts` OR excises the
  scaffold, and owns the `WEBGPU_PARITY` flip (the OPT-IN path, §4 note 14). W13 does NOT touch the
  WGSL/WebGPU surface; W14 does NOT touch the GLSL medium bodies. File-disjoint; sequential by
  dependsOn (W14 runs AFTER W13's mediums are the WebGL2-side reference).
- **vs W10 (aurora options converge) + W11 (aurora color seams).** W10 owns `atoms.ts`/`presets.ts`
  atoms-door + the medium-AXIS exposure + the dead `deriveScene` excision; W11 owns the OKLCh
  palette INTERPOLATION + the catch-light + the WGSL palette-ramp gate hole. W13 shares `presets.ts`
  ONLY for the `StrokeMode` union `"crayon"` removal (RED witness 5) — a SINGLE-LINE union edit
  disjoint from W10's atoms-field work. **Coordinate the one shared `presets.ts` file:** W13's
  `StrokeMode` union edit is a value/union removal; W10's atoms-door is a field-shape change.
  RECOMMENDATION: W13 lands its one-line `StrokeMode` removal; if W10 runs concurrently, the union
  edit rebases trivially (non-overlapping lines). The OKLab matrices W13 reads from
  `procedural-color.glsl.ts` are READ-ONLY here (W11 owns any color-chunk WRITES). No write
  collision.
- **vs W09 (specular tune).** Fully file-disjoint — W09 is `glass.css`/`tokens.css`/SFCs; W13 is the
  aurora shader tree. No shared file.
- **vs W34 (cross-repo consumer adoption).** W13 authors the speedtest `deriveAurora`-as-INPUT
  cross-ref NOTE (the OIL `uSheen`/boldness mapping) and the medium-design reference; the speedtest
  consumer-adoption (revert its `auroraConfig.ts` stopgap onto the converged surface) executes in
  W10/W28/W34. W13 writes NO sibling source.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤2 agents — the shader-body authoring + the compositing/color seam).** Agent 1 lands
  the first-class `mediumVangogh` body (the comma/crescent `strokeShape` + atomic placement +
  row-clustering + full-height impasto, through the W12 `vangogh` profile) and the `mediumOilPastel`
  split from `mediumCrayon` + the `aurora.frag.ts` re-dispatch + the crayon `strokeMode` disposition
  (`uniformBridge`/`presets`). Agent 2 lands the OKLab `paintOver` composite + the within-stroke
  OKLCh broken color in `brush.glsl.ts` (reading the shared `procedural-color` matrices). Both lint
  + typecheck at every interval; coordinate on the two shared shader files (the bodies vs the
  compositing seam are line-disjoint within `brush.glsl.ts`). Correct DESIGN.md to the painted
  reality.
- **Adversarially-verify (≤1 read-only lane).** Re-runs the five RED witnesses against the patched
  tree: parses `mediumVangogh`'s body (asserts NOT `return mediumOil(...)`; asserts a distinct comma
  profile + atomic placement + full-height impasto); asserts `mediumOilPastel` is a DISTINCT function
  and `uMedium 4` vs `6` dispatch to DIFFERENT bodies; asserts `paintOver` composites in OKLab (not
  linear `mix`) on the painterly mediums; asserts the within-stroke modulation is OKLCh hue/chroma
  (not value-only); asserts the crayon `strokeMode` special-case is resolved. ADVERSARIAL twist:
  tries to make the re-authored `proof:aurora-vangogh-preset`/`-oilpastel-medium` PASS with the OLD
  passthrough/shared-body still present (confirms the re-authored gates RED on the legacy state); and
  tries a linear-`mix` `paintOver` (confirms the new `proof:aurora-stroke-composite` REDs). Drives the
  VISUAL-TRUTH live audit (the binding close — see HardGate). Confirms no WGSL-twin medium dispatch
  was added (the §4-note-14 guard).
- **Gate-author (≤1 agent).** RE-AUTHORS `proof-aurora-vangogh-preset.mjs` + `proof-aurora-oilpastel-
  medium.mjs` (born-RED on the first-class assertions — they currently PASS over the passthrough/
  shared-body); authors the NEW `proof-aurora-stroke-composite.mjs` (the OKLab/OKLCh assertion);
  confirms ALL THREE FAIL at HEAD `6e3ad10` (passthrough + shared body + linear `mix` present) and
  PASS on the patched tree. Registers `proof:aurora-stroke-composite` in `package.json` + the W00
  meta-gate parity match. The texture-snapshot per-medium arm (charter §3 "per-medium texture-
  snapshot gates") rides the π-lane readback, NOT a CPU text gate alone.

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 4.)

**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX REQUIREMENTS §22.4b — mandatory):** the wave-agnostic authorization grant is AX.md §6.1 (the canonical clause — work AROUND a roadblock with an idiomatic gestalt fix, never stall; §6.2 is the 4-class halt-vs-work-around decision tree) — read it by reference, it is not restated here. The wave-SPECIFIC §3a auto-triggers (authored from this wave's FileBounds + HardGate):

- **Scope-reveal → halt + triumvirate (Class 2; NEVER absorb in-line):** any need to touch the OUT-of-bounds surfaces — the W12 substrate (`StrokeProfile`/`profileFor`/`paintStrokeLayers`/the painterly noise basis — this wave CONSUMES them, it does NOT re-author them; if W12 is not yet landed the implement step BLOCKS on it, never re-derives the substrate locally), `aurora.wgsl.ts`/`painterly.wgsl.ts`/`wake.wgsl.ts` or any WGSL/WebGPU surface (W14 — adding a WGSL-twin medium dispatch is the §4-note-14 violation), the atoms-door/`resolveAtoms`/`deriveAurora`/OKLCh palette INTERPOLATION/catch-light (W10/W11), the aurora black-canvas WGSL fixes (W07), the specular catch-light (W09).
- **Non-local hard-gate failure → triumvirate (Class 2):** if any of the three gates REDs non-locally — `proof:aurora-vangogh-preset` (re-authored: NOT a passthrough + distinct comma/crescent profile + energy-grade-as-profile-field), `proof:aurora-oilpastel-medium` (re-authored: `mediumOilPastel` a DISTINCT function from `mediumCrayon` + `uMedium 4`-vs-`6` dispatch to different bodies), or `proof:aurora-stroke-composite` (new: OKLab `paintOver` + OKLCh within-stroke modulation single-sourced from the `procedural-color` chunk) — escalate the gate design, do NOT make a gate pass over a residual legacy state.
- **3rd diagnostic-loop iteration → triumvirate (Class 2):** if the first-class `mediumVangogh` body does NOT read congruent-to-real-works (separable atomic comma/crescent dabs, not an oil coverage smear; complementaries mixing as PIGMENT not grey) after three authoring iterations, OR the oil-pastel-vs-crayon media do NOT read visibly distinct after three retunes, dispatch research→plan→redress rather than re-tuning stroke constants ad hoc.
- **§5.3 ratify reached un-ratified → HALT-and-ratify (Class 3):** the crayon `strokeMode` disposition (the W5 disposition — REMOVE the `resolveMediumId` `strokeMode:"crayon"` branch + the `presets.ts` `StrokeMode` union member, clean break, vs promote to a first-class medium) is a ratify-before-impl decision touching the cross-consumer `strokeMode` surface — if it reaches impl un-ratified, surface to the orchestrator (take the recorded default + run the consumer-sweep cadence step), do NOT self-ratify the clean break.

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / runtime gates — born-RED→GREEN.** THREE gates, two RE-AUTHORED + one NEW (the
re-authoring is itself the headline gate-truth-up — the existing gates PASS over the very
passthrough/shared-body state this wave dismantles):

- **`proof:aurora-vangogh-preset` (RE-AUTHORED, born-RED).** Assert `mediumVangogh` is NOT a
  `return mediumOil(...)` passthrough; assert it composes a distinct `vangogh` `StrokeProfile` (the
  comma/crescent `strokeShape` type, atomic dab placement, ETF-tangent row-clustering, full-height
  impasto crowns); assert the energy-grade is a PROFILE field, not a buried `uMedium==5` `bestOil`
  branch. **Born-RED at HEAD** (the body IS a passthrough; the current gate asserts the OPPOSITE — the
  `uMedium==5` energy-grade switch — and PASSES, the defect this re-author corrects).
- **`proof:aurora-oilpastel-medium` (RE-AUTHORED, born-RED).** Assert `mediumOilPastel` is a DISTINCT
  function (a deletion-proof that `uMedium==6` no longer resolves to `mediumCrayon`); assert
  `uMedium==4`→`mediumCrayon` (dry tooth-multiply survives) and `uMedium==6`→`mediumOilPastel`
  (stroke-deposition) dispatch to DIFFERENT bodies sharing the SUBSTRATE (placement/tooth helpers).
  **Born-RED at HEAD** (both ids resolve to `mediumCrayon`; the current gate asserts the SHARED body
  and PASSES).
- **`proof:aurora-stroke-composite` (NEW, born-RED).** Assert `paintOver` composites in OKLab (the
  Ottosson L,a,b lerp via the shared `procedural-color` matrices) on the painterly mediums, NOT a
  bare linear-RGB `mix(col,c,alpha)`; assert the within-stroke modulation perturbs hue/chroma in
  OKLCh (not the value-only `c *= 1.0+streak*streakAmp`); assert the matrices are single-sourced from
  the `procedural-color` chunk (no duplicate inline color math). **Born-RED at HEAD** (`paintOver` is
  a linear `mix`; the modulation is value-only).

These are **source-parse + deletion-proof** gates (the precept-valid artefact forms per SPEC.md
§Hard Gates — accepted forms include build/test/source-structure/deletion-proof; INVALID is
"grep found a source string" FOR RUNTIME BEHAVIOUR). The passthrough-absence + the distinct-function
+ the linear-`mix`-absence are STRUCTURE proofs (the SHADER STRING is the artefact — a GLSL body is
a source-structure assertion, the precept-valid form for shader-program structure); the RUNTIME
behaviour (the painted pixels) is proven by the VISUAL-TRUTH π-lane readback below, NOT a text gate.

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion; the charter §3
binding clause: "a LIVE bake of the vangogh + oil-pastel presets against actual Van Gogh / oil-pastel
reference works … do NOT trust a green snapshot gate (a passthrough + a shared body both PASS the
current text gates)").** A live Playwright + frontend-design pass in the π workspace, rendering the
real WebGL2 aurora at `t=1` over the `vangogh` and `oil-pastel` presets, read back as pixels and
audited AGAINST actual Van Gogh (Starry Night swirl-row dabs) / oil-pastel reference works:

- **Van Gogh reads as separable atomic dabs, NOT an oil coverage smear** — discrete comma/crescent
  strokes with visible inter-stroke canvas gaps, queued into swirl rows along the ETF tangent, each
  catching its own full-height impasto glint. Side-by-side against a Starry Night reference: the
  atomicity is congruent (the passthrough's continuous best-of-9 coverage field is visibly gone).
- **Oil-pastel reads as smeared directional strokes with creamy build-up + sheen, NOT a textured
  gradient** — overlapping pigment-on-pigment deposition with the burnish film; distinct from the
  dry crayon (tooth-multiply, no sheen) rendered side-by-side. The two media are visibly different.
- **Overlapping complementaries mix as PIGMENT, not grey** — a dense van-Gogh overlap region (the
  constant case) transitions through a chromatic OKLab path; the muddy-midtone grey defect is
  visibly gone (the single highest-leverage lever — slice 8 F2).
- **A single stroke carries broken color at the ATOM level** — within-stroke hue shimmer (not a flat
  stamped swatch); adjacent strokes shimmer like real impasto.
- **Per-medium texture readback** — the π-lane captures a per-medium texture snapshot (vangogh /
  oil-pastel / crayon / oil) so each medium's distinct character is pixel-evidenced, not asserted by
  a text gate that a passthrough passes.
- **Affordance / hierarchy / NO visual occlusion / no regression on the existing oil medium** per
  the AX cardinal gate (the W12 substrate already proved oil neutral; W13 re-confirms oil unchanged).

**The wave does NOT close on the headless gates alone** — the executed live audit (captured as a
paired-π BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/`, per the W00 protocol) is the
binding close criterion. The BEFORE capture pins the HEAD passthrough/shared-body render (van-Gogh ≡
energy-graded oil; oil-pastel ≡ crayon textured gradient; grey overlap mud) the new bodies must
visibly beat against the reference works.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the five RED witnesses against HEAD
   `6e3ad10` on the live demo: the `mediumVangogh` passthrough, the `uMedium 4/6` shared body, the
   linear `paintOver` mix, the per-cell broken color, the crayon `strokeMode` peer-route. Confirm the
   W12 substrate (`StrokeProfile`/`profileFor`/`paintStrokeLayers` + the high-quality noise basis) IS
   landed (this wave BLOCKS on it). Capture the BEFORE π render (van-Gogh ≡ oil; oil-pastel ≡ crayon;
   grey overlap mud) as the born-RED baseline in `audit/W13-vangogh-oilpastel-mediums.json`. Do NOT
   proceed on the audit's word — re-prove.
2. **Re-author the two gates born-RED.** RE-AUTHOR `proof-aurora-vangogh-preset.mjs` (assert NOT a
   passthrough + a distinct profile) + `proof-aurora-oilpastel-medium.mjs` (assert distinct functions);
   author NEW `proof-aurora-stroke-composite.mjs` (OKLab/OKLCh); register
   `proof:aurora-stroke-composite` in `package.json` + the W00 meta-gate; confirm ALL THREE FAIL at
   HEAD.
3. **First-class `mediumVangogh` body.** Author the comma/crescent `strokeShape` type (`brush.glsl.ts`);
   author the `vangogh` profile body (`mediums.glsl.ts:335`) — atomic placement, row-clustering,
   full-height impasto; fold the `uMedium==5` energy-grade switch INTO the profile (un-bury it from
   `bestOil`). Lint + typecheck.
4. **Split oil-pastel from crayon.** Author `mediumOilPastel` (stroke-deposition, creamy hardness,
   burnish, build-up); keep `mediumCrayon` (dry tooth-multiply); re-point `aurora.frag.ts:407` →
   `mediumOilPastel`. Lint + typecheck.
5. **OKLab stroke composite + within-stroke OKLCh broken color.** Move `paintOver`'s `mix`
   (`brush.glsl.ts:182`) into OKLab on the painterly mediums; move the within-stroke streak
   modulation into OKLCh hue/chroma (`brush.glsl.ts:171-174`), reading the shared `procedural-color`
   matrices. Lint + typecheck.
6. **Resolve the crayon `strokeMode` peer-route.** Per the ratified disposition (recommend REMOVE):
   strike the `resolveMediumId` `strokeMode:"crayon"` branch (`uniformBridge.ts:99-100`) + the
   `"crayon"` `StrokeMode` union member (`presets.ts:69`) + the `mediums.glsl.ts:141` fall-through;
   or promote to a clean first-class medium.
7. **Correct DESIGN.md.** Rewrite `:180-181,190-191` to the painted reality (first-class van-Gogh, the
   split, the OKLab composite, the within-stroke broken color, the crayon disposition).
8. **Gates GREEN + VISUAL-TRUTH.** Confirm all three gates pass; run the VISUAL-TRUTH live π audit of
   the vangogh + oil-pastel presets against the reference works, side-by-side with crayon/oil;
   capture the paired-π BEFORE/AFTER + DELTA; write `audit/W13-vangogh-oilpastel-mediums.json` to
   GREEN; author the speedtest `deriveAurora`-as-INPUT cross-ref note (routes to W10/W34).

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W13-vangogh-oilpastel-mediums.json` — the born-RED→GREEN ledger: the five
  RED witnesses (the passthrough, the shared body, the linear `mix`, the per-cell broken color, the
  crayon peer-route), the per-finding (slice 8 F0/F1/F2/F5 + slice 26 F5) disposition, the W12
  substrate-consumed confirmation, and the post-wave GREEN structure + π-readback measurements.
- `scripts/proof-aurora-vangogh-preset.mjs` — the RE-AUTHORED gate (passthrough-absent + distinct
  comma-profile + energy-grade-as-profile-field).
- `scripts/proof-aurora-oilpastel-medium.mjs` — the RE-AUTHORED gate (distinct `mediumOilPastel`
  function + `uMedium 4`/`6` different bodies + shared substrate).
- `scripts/proof-aurora-stroke-composite.mjs` — the NEW gate (OKLab `paintOver` + within-stroke
  OKLCh + single-source matrices).
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): π-lane readbacks of the `vangogh`
  + `oil-pastel` presets at `t=1` side-by-side with `crayon`/`oil`, BEFORE (van-Gogh ≡ energy-graded
  oil; oil-pastel ≡ crayon textured gradient; grey overlap mud) vs AFTER (atomic comma dabs;
  smeared creamy deposition; chromatic OKLab overlap), and the per-medium texture-snapshot delta
  against the Van Gogh / oil-pastel reference works.
- A consumer-NOTE annex (folded into the W10/W34 coordination ledger, NOT executed here): the
  speedtest `deriveAurora` OIL `uSheen`/boldness mapping onto the oil-pastel burnish + van-Gogh
  impasto magnitudes (design INPUT; the consumer-adoption revert is W10/W28/W34's).

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(aurora): re-author vangogh-preset + oilpastel-medium gates born-RED + new stroke-composite gate — assert first-class bodies, not passthrough/shared (AX.W13 slice8-F0/F1/F2)`
2. `feat(aurora): first-class mediumVangogh — comma/crescent profile, atomic dabs, swirl-row clustering, full-height impasto (AX.W13 slice8-F0)`
3. `feat(aurora): split mediumOilPastel from mediumCrayon — stroke-deposition oil-pastel vs dry tooth-multiply crayon, shared substrate not body (AX.W13 slice8-F1)`
4. `fix(aurora): OKLab paintOver stroke composite + within-stroke OKLCh broken color — overlap mixes as pigment not grey (AX.W13 slice8-F2/F5)`
5. `refactor(aurora): resolve the crayon strokeMode legacy peer-route — REMOVE the special-case, crayon is first-class uMedium==4 (AX.W13 slice26-F5)`
6. `docs(aurora): DESIGN.md to painted reality — first-class van-Gogh, oil-pastel split, OKLab composite (AX.W13)`
7. `chore(AX.W13): audit ledger GREEN + paired-π BEFORE/AFTER + DELTA + speedtest deriveAurora-input note`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/
stash per the hardened agent git clause. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W12 (mediums substrate) — the HARD predecessor (charter §3 dependsOn AX.W12).** W12 extracts
  the `StrokeProfile` struct + `profileFor(medium, mode)` selector + the parameterized
  `paintStrokeLayers(profile)` AND upgrades the painterly-medium noise basis (the new GLSL
  integer-PCG hash + gradient-noise variant in the shared `procedural-color` chunk). W13 AUTHORS the
  `vangogh` + `oil-pastel` profile bodies ON that substrate — without W12 the new-medium work would
  fork the 117-line `mediumOil` monolith (the exact anti-pattern slice 8 F6 names). The high-quality
  noise basis is the substrate every new medium's tooth/granulation/stroke fidelity rides (slice 8
  F4). W13 BLOCKS on W12 landing; they share `mediums.glsl.ts`/`brush.glsl.ts` so they NEVER run
  concurrently.
- **Transitive: AX.W07 (aurora core unblock) → AX.W00 (π lane).** W12 dependsOn W07 (the WebGL2 path
  must render non-black before the mediums on it can be visually audited); W07/W12/W13 all dependsOn
  the W00 π-lane (the binding live-audit close machinery — a passthrough + a shared body both pass
  the CPU text gates, so ONLY the live readback catches this class; the cardinal AX precept).
- **Downstream (waves that dependsOn W13):** **W14** (WebGPU painterly parity — dependsOn {W07, W13};
  W13's WebGL2 mediums are the reference the W14 Kuwahara finish layers over, and §4 note 14's
  DELETE-branch decision is predicated on W13 shipping the GLSL/WebGL2 mediums ONLY). **W10/W11**
  read the medium surface this wave settles (the medium-axis simplification + the color seams).
  **W34** receives the speedtest `deriveAurora`-as-INPUT cross-ref note this wave authors.

---

## Archaeology (the git commits / prior-tranche lineage the audit cited)

- **AW.W4.3 (`AW.W4-aurora-painterly.md §5`)** — the ORIGIN of the van-Gogh passthrough. The W4.3 spec
  reused `bestOil`+`curvedStroke` verbatim ("only the direction source, the energy grading, and the
  height accumulation change") — a DRY decision that COLLAPSED the van-Gogh medium into a thin
  `uMedium==5` energy-grade switch on the oil engine (slice 8 F0 rootCause). `mediumVangogh` has been
  `return mediumOil(...)` since; the only van-Gogh logic is the 4-line `brush.glsl.ts:263-268` switch.
- **AW.W4.4** — the ORIGIN of the oil-pastel/crayon shared body. The "no parallel duplicate medium"
  precept collapsed two materially-different media (waxy oil-pastel vs dry crayon) onto one
  `mediumCrayon` dispatch body (DESIGN.md:191 "share this single body — no duplicate"); the rework
  was a per-pixel tooth-noise deposition/scumble/burnish, never a stroke (slice 8 F1 rootCause).
- **AW.W4 §10 (the deferred Kubelka-Munk fold)** — explicitly DEFERRED spectral pigment-mixing with
  the trigger "a design pass judging the van-Gogh/oil-pastel overlap regions muddy" (slice 8 F2
  evidence). The trigger condition is NOW MET (dense atomic van-Gogh strokes overlap constantly →
  the overlap muds to grey under the linear `paintOver` mix). `README.md:620` names `spectral.js`.
- **W5 (the OKLCh palette move)** — moved palette INTERPOLATION + broken-color JITTER into OKLCh but
  left stroke OVER-compositing (`paintOver`'s `mix`) AND the within-stroke streak modulation in
  linear-RGB / value-only (slice 8 F2/F5 rootCause — the muddy-midtone defect OKLCh killed at the
  palette layer RE-ENTERS at the compositing layer). The Ottosson OKLab/OKLCh matrices W5 single-
  sourced into `procedural-color.glsl.ts` are the matrices this wave reads (no new color math).
- **The crayon `strokeMode` peer-route (`uniformBridge.ts:38,99-100` + `mediums.glsl.ts:141` +
  `presets.ts:69`)** — the older crayon strokeMode kept as a peer-medium alias when the medium/
  strokeMode axes were reworked (vangogh:5, oil-pastel:6), neither excised nor failing (slice 26 F5).
  The legacy lane deferred its disposition to "the aurora simplification wave"; the oil-pastel/crayon
  split forces it HERE.
- **HEAD `6e3ad10`** (the audit baseline `eaba94f` is functionally identical for these four surfaces;
  re-prove live) — the passthrough + the shared body + the linear `paintOver` + the per-cell broken
  color + the crayon peer-route are all live-proven here.
- **Corroboration:** DESIGN.md:190-191 (the current doc CLAIMS van-Gogh "composes the oil stroke
  engine" and oil-pastel/crayon "share this single body — no duplicate" — the doc describes the
  defect AS the design, which this wave both fixes and corrects in the doc).

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-C binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **one-path / no-legacy-code (single-source shader twins; no shared dispatch body for distinct
  media).** Van-Gogh is a first-class body, NOT a `return mediumOil(...)` passthrough; oil-pastel and
  crayon are SEPARATE dispatch bodies sharing the SUBSTRATE, not the body. The crayon `strokeMode`
  legacy peer-route is RESOLVED one way (promote OR remove), never left as a silent special-case
  (§0 "excise or fail loudly"; MEMORY no-backwards-compat — REMOVE the alias, no migration shim). The
  OKLab composite is the ONE correct compositing path (the linear `mix` muddy-midtone is the defect).
  MUST NOT leave the passthrough, the shared body, or the legacy alias.
- **substrate-with-consumer / visual-load-bearing-ness (Design-Axis-3).** W13 RIDES the W12 substrate
  (`StrokeProfile`/`paintStrokeLayers`) — the new-medium work is authoring a PROFILE, not forking the
  monolith (slice 8 F6). The OKLab matrices are CONSUMED from the shared `procedural-color` chunk (the
  single-source seam W5 established), not re-derived inline. Each new medium body is a LIVE consumer
  of the substrate the same band ships.
- **no-overfitting (no-overfitting precept; MEMORY overfitting-audit).** The new mediums are real,
  visually-distinct, consumer-grounded (the §2.5/§2.6 requirements + speedtest's `deriveAurora`
  OIL/boldness register as design INPUT). The crayon `strokeMode` removal STRIKES dead substrate (a
  legacy alias with no live preset need once split), not adds speculative knobs. MUST NOT add a
  medium/profile field with no painted consequence.
- **fail-explicit on library-internal violations (vs befitting-silent browser-API degradation).** The
  passthrough + the shared body + the legacy crayon special-case are library-internal contract
  violations (the code contradicts the DESIGN.md claims of "first-class" / distinct media); the wave
  makes the painted reality TRUE to the doc (and corrects the doc to the new reality). MUST NOT
  silently keep the passthrough behind an honest-looking gate. (No browser-API degradation path is
  involved — these are pure shader-program structure fixes; the PRM freeze the substrate owns is
  untouched.)
- **canonical-readme-shape / documentation-is-part-of-the-change (band-C precept row;
  `docs/precepts/canonical-readme-shape.md`).** DESIGN.md is corrected to the painted reality (the
  van-Gogh first-class body, the oil-pastel/crayon split, the OKLab composite, the within-stroke
  broken color, the crayon disposition) — the documentation evolves WITH the change, never describing
  the defect AS the design.
- **π visual-runtime lane / Gates-close-on-evidence (SPEC.md §Hard Gates; the cardinal AX precept).**
  The headless gates are source-structure + deletion proofs (the GLSL body IS the artefact — the
  precept-valid form for shader-program structure); the RUNTIME behaviour (the painted dabs, the
  pigment overlap, the within-stroke shimmer) is proven by the VISUAL-TRUTH π-lane readback against
  actual reference works, NEVER a green snapshot text gate (charter §3: "a passthrough + a shared
  body both PASS the current text gates" — the literal cardinal-lesson instance this wave embodies).
  The wave closes on the executed live audit, never the headless proof alone.
- **no-silent-deferrals.** The WGSL-twin medium dispatch is EXPLICITLY out-of-scope with rationale
  (§4 note 14 DELETE-branch — WebGPU is an OPT-IN Kuwahara finish, never a medium-parity auto-default,
  so this wave correctly ships GLSL/WebGL2 mediums only). The speedtest `deriveAurora`-as-INPUT
  consumer-adoption is ROUTED to W10/W34 with a named annex (design INPUT here; the revert executes
  there). The Kubelka-Munk `pigmentMix` richer-option is flagged RATIFY-BEFORE-IMPL, not silently
  picked. Nothing is dropped without a routed home.

---

## Open questions / RATIFY-BEFORE-IMPL

1. **OKLab composite vs the deferred Kubelka-Munk `pigmentMix` (slice 8 F2 — the two gestalt-fix
   options).** The audit offers BOTH: the cheapest correct fix (move `paintOver`'s `mix` into OKLab —
   the matrices already ship) OR the richer deferred Kubelka-Munk spectral `pigmentMix` (`spectral.js`
   named, `README.md:620`) on the painterly mediums only. **RECOMMENDATION: OKLab first** (KISS — the
   single-source matrices are in scope, zero new dependency, and it is "THE single lever that turns
   procedural texture over a gradient into mixed paint" per slice 8 F2). RATIFY whether the live audit
   demands the spectral KM richness (the complementary-overlap chromatic path) over the OKLab
   approximation — add KM ONLY if the OKLab overlap still reads insufficiently pigment-true against
   the reference works. **RATIFY-BEFORE-IMPL.**
2. **Crayon `strokeMode` peer-route — PROMOTE vs REMOVE (slice 26 F5 disposition).** The split makes
   `crayon` a clean `uMedium==4` first-class medium; the `oil`+`strokeMode:"crayon"` alias becomes
   pure legacy debris. **RECOMMENDATION: REMOVE** the `strokeMode:"crayon"` union member + the
   `resolveMediumId` branch + the `mediums.glsl.ts:141` fall-through (MEMORY no-backwards-compat — no
   alias, no migration shim; one-line union edit, clean break). RATIFY against any preset still
   referencing `strokeMode:"crayon"` — if a shipped preset uses it, the REMOVE re-points that preset
   to `medium:"crayon"` in the same wave (no silent no-op). **RATIFY-BEFORE-IMPL.**
3. **van-Gogh atomic density / impasto magnitudes — tune live.** The charter specifies sparse,
   high-contrast, visible inter-stroke gaps + full-height impasto crowns, but the exact density /
   per-stroke opacity / impasto height are visual tuning knobs. **RECOMMENDATION: tune live against
   the Starry Night reference** in the π audit (the atoms door W10 may later expose density as an
   axis; THIS wave bakes a strong default congruent to the reference). RATIFY the final density/
   impasto triple against the live audit, not a pre-committed number.
4. **OKLab composite cost-gating — confirm the smooth pole stays linear.** The OKLab `paintOver`
   composite is the painterly-medium path only (oil/vangogh/oil-pastel); the smooth/atmospheric pole
   keeps the cheap linear mix for cost (slice 8 F2). **RECOMMENDATION: gate the OKLab branch behind
   the painterly-medium dispatch** (the per-fragment cost lands only where strokes overlap). RATIFY
   the cost on a real device in the π audit (the FBM + matrices are already evaluated; the added
   OKLab round-trip is a few mat-vec ops per overlapping stroke). **RATIFY-BEFORE-IMPL.**
5. **W12-substrate readiness gate.** W13 BLOCKS on W12's `StrokeProfile`/`profileFor`/
   `paintStrokeLayers` + the high-quality noise basis being landed. **RECOMMENDATION: the cadence
   step-1 live re-diagnosis CONFIRMS the W12 substrate is present before any W13 authoring begins** —
   if W12 has not landed, W13 does not dispatch (the dependsOn is hard). No open decision; a
   sequencing guard the orchestrator enforces.
