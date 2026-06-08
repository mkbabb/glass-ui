// Aurora medium overlays — the four PEER mediums (watercolor, pastel, crayon, oil)
// plus the `sampleBase` edge-mask recompute they share.
//
// Crayon is a PEER medium (dispatched at main() level via `uMedium == 4`), NOT an
// oil stroke-mode — it is wax pigment on paper tooth, anisotropic tooth noise
// multiplied into the base color. The four mediums read flowField (flow.glsl.ts)
// and sampleBase/samplePalette (composition.glsl.ts); the oil medium also consumes
// the brush primitive (brush.glsl.ts).
//
// Two exports because the original source order interleaves the mediums around the
// brush primitive: `sampleBase` + watercolor + pastel precede the brush, crayon +
// oil follow it. The assembler splices PRE before BRUSH and POST after — preserving
// the character-equivalent emit order.
export const AURORA_MEDIUMS_PRE_BRUSH_GLSL = /* glsl */ `// ── Medium overlays ───────────────────────────────────────────────────────

// A quick re-computation of base color for edge-mask sampling
vec3 sampleBase(vec2 p, float t) {
  vec2 pw = domainWarp(p, t);
  float id; float vm;
  nucleiField(pw, t, id, vm);
  vec3 c = samplePalette(id);
  c *= 1.0 + uValueVariance * vm;
  return c;
}

// ── Structure-tensor / edge-tangent-flow (AW.W4.1) ─────────────────────────
// The keystone of the painterly engine: derive stroke orientation from the COLOR
// FIELD's OWN structure, not a hand-authored flow pattern. A 3x3 Sobel over
// luma(sampleBase) yields the gradient (Gx,Gy); the 2x2 structure tensor
// J = [[Gx², GxGy],[GxGy, Gy²]] eigen-decomposes closed-form into the MINOR
// eigenvector (the edge-TANGENT — least color change, the stroke direction; the
// MAJOR eigenvector is the gradient/edge-NORMAL and would make strokes cross the
// bands) and the coherence A = (λ1-λ2)/(λ1+λ2). Low-coherence (flat) zones relax
// toward the smooth fallbackDir by (1-A) so tensor noise never reads as jitter.
// Single-pass small-tap WebGL2 form; the Gaussian-smoothed multi-tap + LIC smear
// is the AW.W7 WebGPU multi-pass fold. Returns vec3(tangent.x, tangent.y, A).
vec3 structureTensorField(vec2 p, float t, vec2 fallbackDir) {
  float e = 0.0035; // small-tap neighborhood (edge-mask scale)
  // 3x3 luma samples.
  float l00 = dot(sampleBase(p + vec2(-e, -e), t), W_LUMA);
  float l10 = dot(sampleBase(p + vec2( 0.0, -e), t), W_LUMA);
  float l20 = dot(sampleBase(p + vec2( e, -e), t), W_LUMA);
  float l01 = dot(sampleBase(p + vec2(-e, 0.0), t), W_LUMA);
  float l21 = dot(sampleBase(p + vec2( e, 0.0), t), W_LUMA);
  float l02 = dot(sampleBase(p + vec2(-e, e), t), W_LUMA);
  float l12 = dot(sampleBase(p + vec2( 0.0, e), t), W_LUMA);
  float l22 = dot(sampleBase(p + vec2( e, e), t), W_LUMA);
  // Sobel derivatives.
  float Gx = (l20 + 2.0 * l21 + l22) - (l00 + 2.0 * l01 + l02);
  float Gy = (l02 + 2.0 * l12 + l22) - (l00 + 2.0 * l10 + l20);
  // Structure tensor components.
  float Jxx = Gx * Gx;
  float Jyy = Gy * Gy;
  float Jxy = Gx * Gy;
  // Closed-form 2x2 eigenvalues: λ = 0.5(tr ± sqrt((Jxx-Jyy)² + 4Jxy²)).
  float tr = Jxx + Jyy;
  float disc = sqrt(max((Jxx - Jyy) * (Jxx - Jyy) + 4.0 * Jxy * Jxy, 0.0));
  float lambdaMaj = 0.5 * (tr + disc);
  float lambdaMin = 0.5 * (tr - disc);
  // The MAJOR eigenvector points along the gradient (the edge NORMAL); the MINOR
  // is its perpendicular — the edge TANGENT (the stroke direction). The principal
  // angle is θ = 0.5·atan2(2·Jxy, Jxx-Jyy); this form is robust at Jxy≈0 (where the
  // (λ-Jyy, Jxy) eigenvector formula collapses to a zero vector). The tangent is at
  // θ + 90°. Guard the fully-isotropic (no-gradient) degenerate case → fallback dir.
  vec2 tangent;
  if (disc < 1e-7) {
    tangent = fallbackDir;
  } else {
    float theta = 0.5 * atan(2.0 * Jxy, Jxx - Jyy); // major (gradient) angle
    tangent = vec2(-sin(theta), cos(theta));          // perpendicular = tangent
  }
  // Coherence A in [0,1] — high where one eigenvalue dominates (a strong edge),
  // ~0 in flat zones. Relax toward the smooth fallback by (1 - A).
  float A = (lambdaMaj - lambdaMin) / (lambdaMaj + lambdaMin + 1e-6);
  A = clamp(A, 0.0, 1.0);
  // Coherence-weighted blend: full tensor in coherent zones, smooth in flat ones.
  // Resolve the 180° sign ambiguity toward the fallback so the blend is continuous.
  if (dot(tangent, fallbackDir) < 0.0) tangent = -tangent;
  vec2 dir = normalize(mix(fallbackDir, tangent, A) + 1e-6);
  return vec3(dir, A);
}

vec3 mediumWatercolor(vec3 col, vec2 p, float t) {
  // Wet-edge cauliflowers via luma-gradient magnitude
  float eps = 0.004;
  vec3 cx1 = sampleBase(p + vec2(eps, 0.0), t);
  vec3 cx2 = sampleBase(p - vec2(eps, 0.0), t);
  vec3 cy1 = sampleBase(p + vec2(0.0, eps), t);
  vec3 cy2 = sampleBase(p - vec2(0.0, eps), t);
  float gx = dot(cx1 - cx2, W_LUMA);
  float gy = dot(cy1 - cy2, W_LUMA);
  float edge = sqrt(gx * gx + gy * gy) / (2.0 * eps);
  float mask = smoothstep(0.0, 2.5, edge);
  col *= mix(1.0, 0.78, mask * uWetEdge);

  // Granulation — pigment settles in paper tooth
  float paper = 0.5 * vnoise(p * 160.0) + 0.5 * vnoise(p * 360.0);
  float pigLoad = 1.0 - dot(col, W_LUMA);
  col *= 1.0 - uGranulation * pigLoad * (paper - 0.5);

  // Wash banding — faint horizontal wet gradient
  float band = fbm(vec2(p.x * 1.5, p.y * 0.4));
  col *= 1.0 + 0.04 * (band - 0.5);
  return col;
}

vec3 mediumPastel(vec3 col, vec2 p, float t) {
  vec2 flow = flowField(p, t);
  vec2 perp = vec2(-flow.y, flow.x);
  float along  = dot(p, flow) * uStrokeScale;
  float across = dot(p, perp) * uStrokeScale;
  across += 0.03 * (vnoise(p * 260.0) - 0.5);

  float aniso = mix(1.0, 0.18, uStrokeAnisotropy);
  float stroke = fbm(vec2(along * aniso, across));
  col *= mix(1.0, 0.82 + 0.32 * stroke, uStrokeAmount);

  // Pastel tooth — tiny high-frequency grain
  float tooth = vnoise(p * 800.0);
  col *= 1.0 - 0.08 * uStrokeAmount * (tooth - 0.5);
  return col;
}
`;

export const AURORA_MEDIUMS_POST_BRUSH_GLSL = /* glsl */ `// ── Medium id constants (mirror uniformBridge.ts MEDIUM_ID — the uMedium ladder) ──
// The StrokeProfile selector (AX.W12 + AX.W13) dispatches on the medium id: oil,
// van-Gogh, and oil-pastel each AUTHOR a first-class profile in profileFor.
#define MEDIUM_OIL 3
#define MEDIUM_CRAYON 4
#define MEDIUM_VANGOGH 5
#define MEDIUM_OILPASTEL 6

// ── Crayon — DRY wax pigment on paper tooth (first-class medium, uMedium==4) ──
// Crayon is not strokes. It's dry pigment crumbs dragged across paper tooth — the
// DRY tooth-multiply model: anisotropic tooth noise multiplied into the base, a hard
// SCUMBLE that lets the lower color show through the broken upper layer, and stable
// OKLCh broken-color pigment patches. NO sheen, NO burnish film — that waxy gloss is
// the OIL-PASTEL deposition's signature (mediumOilPastel), distinct from dry crayon
// (AX.W13 slice 8 F1 — the split). Crayon shares the SUBSTRATE (the structure-tensor
// orientation, the tooth noise, OKLCh brokenColorJitter), not the dispatch body.
vec3 mediumCrayon(vec3 col, vec2 p, float t) {
  // Orient the deposition along the structure-tensor edge-tangent (the bridge forces
  // tensor for crayon, so read the tensor field directly).
  vec2 flow = structureTensorField(p, t, flowField(p, t)).xy;
  float ang = atan(flow.y, flow.x);
  float ca = cos(-ang), sa = sin(-ang);
  vec2 pr = vec2(p.x * ca - p.y * sa, p.x * sa + p.y * ca);

  float aniso = mix(0.45, 0.95, uStrokeAnisotropy);
  float scale = max(uStrokeScale * 1.6, 180.0);

  // ── Paper TOOTH height field — the relief the dry pigment rides. Anisotropic
  // (squished along flow, coarse cross-flow). Peaks = ridges, valleys = paper pits.
  float t1 = vnoise(vec2(pr.x * scale * aniso, pr.y * scale));
  float t2 = vnoise(vec2(pr.x * scale * aniso * 0.4, pr.y * scale * 0.4) + 11.0);
  float t3 = vnoise(vec2(pr.x * scale * aniso * 2.1, pr.y * scale * 2.1) + 23.0);
  float tooth = 0.55 * t1 + 0.30 * t2 + 0.15 * t3;

  // ── DRY TOOTH-MULTIPLY — the crayon multiplies the tooth relief into the base
  // color (dark in the pits, bright on the ridges). The pressure (uStrokeAmount) sets
  // how hard the multiply bites. This is the DRY model — no pigment build-up, no sheen.
  float pressure = clamp(uStrokeAmount, 0.0, 1.0);
  float bite = mix(0.18, 0.46, pressure);        // multiply strength
  vec3 result = col * (1.0 - bite * (0.5 - tooth));

  // ── HARD SCUMBLE — a broken upper layer that lets the lower color show through the
  // gaps. A coarse mask gates a HARD (high-contrast) dragged pass so the dry crayon
  // reads as broken pigment crumbs, not a smooth wash. Drag follows the tensor flow.
  float scumbleMask = smoothstep(0.42, 0.78, vnoise(vec2(pr.x * scale * 0.55, pr.y * scale * 0.22) + 7.0));
  float scumbleCoverage = scumbleMask * pressure * 0.7;     // hard broken upper layer
  vec3 paper = col * mix(0.80, 0.94, pressure);             // the paper showing through
  result = mix(paper, result, scumbleCoverage);

  // ── Broken-color pigment: stable wax/pigment patches in OKLCh (W5), not flicker.
  vec2 pigmentCell = floor(pr * max(scale * 0.18, 32.0));
  float pigmentMask = smoothstep(0.28, 0.82, vnoise(pr * scale * 0.21 + 19.0));
  result = brokenColorJitter(
    result,
    hash21(pigmentCell + 17.0),
    hash21(pigmentCell * 2.1 + 31.0),
    0.45 + 0.55 * pigmentMask
  );

  // Crayon is saturation-amplified (the wax chroma punch — but DRY, no sheen).
  result = saturate3(result, 1.08);

  return result;
}

// ── StrokeProfile — the oil-stroke parameter vector (AX.W12, slice 8 F6) ──────
// The SBR "stroke = parameter vector" canon (facet 11): the per-mode if-ladder knobs
// become struct FIELDS — logic-as-DATA, not an imperative branch. profileFor(medium,
// mode) populates the profile for a (medium, mode) pair; paintStrokeLayers(profile) runs
// the four-layer bestOil/paintOver cascade off it. A new medium (the W13 van-Gogh /
// oil-pastel profiles) AUTHORS a profile entry — it never edits a monolith.
struct StrokeProfile {
  int   shapeType;   // 0 tapered, 1 load-drag, 2 dab, 3 even, 4 comma/crescent
  float bristleAmp;  // edge raggedness 0..0.5
  float streakFreq;  // internal-streak spatial frequency
  float streakAmp;   // internal-streak amplitude
  float impastoAmp;  // paint-thickness contribution (the relight reads the height)
  float hardness;    // edge-compositing crispness 0..1
  float toothScale;  // canvas-tooth (linen weave) spatial frequency
  float toothAmp;    // canvas-tooth amplitude
  float pigmentSat;  // pigment saturation boost (OKLCh chroma scale)
  float densityBig;  // layer-1 (big gestural) placement density gate
  float densityMed;  // layer-2 (medium body) placement density gate
  float densitySml;  // layer-3 (small dabs) placement density gate
  float energyGrade; // AX.W13 — SBR energy-grade magnitude (0 off; 1 the van-Gogh
                     // Starry-Night length cascade). The energy grade is a PROFILE
                     // field, NOT a buried uMedium==5 bestOil branch (slice 8 F0).
  float impastoFloor;// AX.W13 — the per-stroke height-crown floor (0.4 oil falloff;
                     // 1.0 van-Gogh FULL-height crown so each dab catches its glint).
  float densityFill; // AX.W13 — layer-4 fill-dab density. Oil/oil-pastel fill the
                     // bald spots (0.95, full coverage); van-Gogh sets it LOW so the
                     // sparse atomic dabs keep their visible inter-stroke ground gaps
                     // (the atomicity read — a 0.95 fill would close every gap to a smear).
  float groundFloor; // AX.W13 — the bare-ground darken floor. The gaps between strokes
                     // (low accumulated height) multiply toward this floor, so van-Gogh's
                     // sparse atomic dabs read over a visibly darker underpainting (the
                     // Starry-Night visible ground). Oil/oil-pastel keep 1.0 (no darken).
};

// The (medium, mode) -> StrokeProfile selector. The if-ladder's knobs are the profile's
// fields; a new medium adds a CASE here (never an edit to a dispatch body). mode is the
// uStrokeMode oil-stroke sub-mode (0 oil, 1 palette-knife, 3 brushwork). crayon
// (uMedium==4) is a PEER tooth-multiply medium that never reaches the stroke cascade.
// The painterly STROKE mediums are oil (MEDIUM_OIL), van-Gogh (MEDIUM_VANGOGH) and
// oil-pastel (MEDIUM_OILPASTEL) — each AUTHORS its own profile entry below.
StrokeProfile profileFor(int medium, int mode) {
  // The oil baseline (mode 0) — balanced modern-abstract/palette-knife hybrid.
  StrokeProfile prof = StrokeProfile(
    0,      // shapeType — tapered
    0.25,   // bristleAmp
    9.0,    // streakFreq
    0.09,   // streakAmp
    0.9,    // impastoAmp
    0.80,   // hardness
    240.0,  // toothScale
    0.09,   // toothAmp
    1.03,   // pigmentSat
    0.65,   // densityBig
    0.78,   // densityMed
    0.90,   // densitySml
    0.0,    // energyGrade — oil is uniform-length (no Starry-Night cascade)
    0.4,    // impastoFloor — oil's 0.4+0.6·edgeN crown falloff
    0.95,   // densityFill — oil fills the bald spots (full coverage, no bare canvas)
    1.0     // groundFloor — oil keeps the full base (no ground darken; fills everywhere)
  );

  // ── Van-Gogh — first-class atomic comma/crescent dabs (slice 8 F0). NOT a length
  // modulation of oil: sparse high-contrast SEPARABLE marks with their own asymmetric
  // shape, the full Starry-Night energy cascade (energyGrade=1), and full-height
  // impasto crowns so each dab catches its own glint. The mode sub-modes don't apply
  // (van-Gogh has its own grammar), so this returns early.
  if (medium == MEDIUM_VANGOGH) {
    prof.shapeType   = 4;     // comma / crescent — the divisionist atomic dab
    prof.bristleAmp  = 0.22;  // a touch of raggedness on the loaded head
    prof.streakFreq  = 16.0;  // tight within-stroke streaks (the loaded comma)
    prof.streakAmp   = 0.16;
    prof.impastoAmp  = 1.5;   // heavy paint per atomic dab
    prof.hardness    = 0.92;  // crisp separable edges (visible inter-stroke gaps)
    prof.toothScale  = 220.0;
    prof.toothAmp    = 0.06;
    prof.pigmentSat  = 1.12;  // the van-Gogh chroma punch
    // SPARSE placement — visible inter-stroke canvas gaps (the atomicity read). Lower
    // density gates than oil so each mark stays separable, not a coverage smear.
    prof.densityBig  = 0.42;
    prof.densityMed  = 0.52;
    prof.densitySml  = 0.60;
    prof.energyGrade = 1.0;   // the full Starry-Night length cascade (the profile field)
    prof.impastoFloor = 1.0;  // FULL-height crowns — every atomic dab catches its glint
    prof.densityFill = 0.09;  // SPARSE fill — the bald-spot layer stays mostly open so
                              // the atomic dabs read as separable marks over a bare
                              // ground, not a fill-closed coverage smear (the gap read).
    prof.groundFloor = 0.38;  // darken the bare-ground gaps to the visible Starry-Night
                              // underpainting so the bright impasto dabs read separable.
    return prof;
  }

  // ── Oil-pastel — broad smeared directional strokes deposited via the brush engine
  // (slice 8 F1). Creamy soft edges (low hardness), heavy build-up, and a chroma punch.
  // Distinct from the dry-crayon tooth-multiply (mediumCrayon): oil-pastel LAYS strokes.
  if (medium == MEDIUM_OILPASTEL) {
    prof.shapeType   = 2;     // dab / blob — broad short smeared marks
    prof.bristleAmp  = 0.10;  // smooth creamy edges (waxy pastel, not bristle)
    prof.streakFreq  = 6.0;   // soft low-frequency internal smear
    prof.streakAmp   = 0.07;
    prof.impastoAmp  = 0.7;   // build-up, but flatter than oil impasto
    prof.hardness    = 0.42;  // CREAMY — soft compositing, strokes blend on overlap
    prof.toothScale  = 280.0;
    prof.toothAmp    = 0.12;  // the pastel tooth reads stronger
    prof.pigmentSat  = 1.16;  // the waxy chroma punch
    prof.densityBig  = 0.80;  // dense — broad coverage, pigment-on-pigment build-up
    prof.densityMed  = 0.90;
    prof.densitySml  = 0.95;
    prof.energyGrade = 0.0;   // uniform (no Starry-Night grade)
    prof.impastoFloor = 0.55; // a softer crown than van-Gogh's full-height glint
    return prof;
  }

  // ── Oil sub-modes (mode dispatch on the oil medium).
  if (mode == 1) {           // palette knife — razor edges, heavy impasto
    prof.shapeType  = 3;     // flat, even
    prof.bristleAmp = 0.12;
    prof.streakFreq = 4.0;  prof.streakAmp = 0.05;
    prof.impastoAmp = 1.6;
    prof.hardness   = 0.95;
    prof.toothAmp   = 0.04;
    prof.densityBig = 0.80; prof.densityMed = 0.88; prof.densitySml = 0.70;
  } else if (mode == 3) {    // thick brushwork — heavy bristle brush
    prof.shapeType  = 0;     // tapered
    prof.bristleAmp = 0.32;
    prof.streakFreq = 14.0; prof.streakAmp = 0.14;
    prof.impastoAmp = 1.2;
    prof.hardness   = 0.85;
    prof.toothAmp   = 0.07;
  }
  return prof;
}

// The single parameterized four-layer stroke cascade (AX.W12). The four hand-unrolled
// bestOil/paintOver invocations collapse into ONE body driven by the profile + the
// uniform-derived per-layer scale/anisotropy multipliers (which are mode-INVARIANT — the
// per-layer offsets, seeds, and len/wid muls are fixed across modes, so they stay here as
// the cascade's structure; only the profile's knobs differentiate the medium). The
// mode passes through for the two mode-special-cased shapes (knife layer-3 dabs +
// layer-4 fill shape), which are placement details of the cascade, not profile knobs.
void paintStrokeLayers(inout vec3 col, inout float height, StrokeProfile prof,
                       int mode, vec2 p, float t) {
  // Scales & multipliers from uniforms (mode-invariant cascade structure).
  float baseScale = max(uStrokeScale * 0.006, 0.008);
  // Three primary layers: big gestural, medium body, small dabs.
  float sBig = baseScale * 2.4;
  float sMed = baseScale * 1.1;
  float sSml = baseScale * 0.45;

  float lenMulBig = mix(2.2, 3.8, uStrokeAnisotropy);
  float widMulBig = mix(0.55, 0.32, uStrokeAnisotropy);
  float lenMulMed = mix(2.0, 3.4, uStrokeAnisotropy);
  float widMulMed = mix(0.50, 0.30, uStrokeAnisotropy);
  float lenMulSml = mix(1.6, 2.6, uStrokeAnisotropy);
  float widMulSml = mix(0.45, 0.32, uStrokeAnisotropy);

  float jitterAmt = 0.75;   // large jitter — no grid
  vec2 flow = flowField(p, t);

  // Layer 1 — big gestural strokes (sparse, shaping)
  StrokeHit hBig = bestOil(p, sBig, lenMulBig, widMulBig, jitterAmt * 0.55,
                           prof.densityBig, prof.shapeType, prof.bristleAmp, flow, t, 1.3,
                           prof.energyGrade);
  paintOver(col, height, hBig, prof.streakFreq * 0.7, prof.streakAmp,
            uImpasto * prof.impastoAmp * uStrokeAmount, prof.hardness, 1.3, prof.impastoFloor);

  // Layer 2 — medium body strokes
  StrokeHit hMed = bestOil(p + vec2(11.3, 3.7), sMed, lenMulMed, widMulMed,
                           jitterAmt, prof.densityMed, prof.shapeType, prof.bristleAmp, flow, t, 2.7,
                           prof.energyGrade);
  paintOver(col, height, hMed, prof.streakFreq, prof.streakAmp,
            uImpasto * prof.impastoAmp * uStrokeAmount, prof.hardness, 2.7, prof.impastoFloor);

  // Layer 3 — small dabs (more frequent, smaller)
  int smlShape = (mode == 1) ? 2 : prof.shapeType; // knife uses dabs for sparkle
  StrokeHit hSml = bestOil(p + vec2(-5.1, 8.4), sSml, lenMulSml, widMulSml,
                           jitterAmt * 1.3, prof.densitySml, smlShape,
                           prof.bristleAmp * 0.85, flow, t, 4.1, prof.energyGrade);
  paintOver(col, height, hSml, prof.streakFreq * 1.4, prof.streakAmp * 0.8,
            uImpasto * prof.impastoAmp * 0.65 * uStrokeAmount, prof.hardness, 4.1, prof.impastoFloor);

  // Layer 4 — fill dabs (very dense, very small) — covers bald spots. The density is
  // PROFILE-driven (prof.densityFill): oil/oil-pastel fill to full coverage; van-Gogh
  // keeps it sparse so the bare-ground gaps between its atomic dabs survive.
  float sFill = baseScale * 0.22;
  float lenMulFill = mix(1.4, 2.0, uStrokeAnisotropy);
  float widMulFill = mix(0.50, 0.38, uStrokeAnisotropy);
  int fillShape = (mode == 1) ? 3 : 2; // knife=even, others=dab (round fills)
  StrokeHit hFill = bestOil(p + vec2(3.9, -6.2), sFill, lenMulFill, widMulFill,
                            jitterAmt * 1.5, prof.densityFill, fillShape,
                            prof.bristleAmp * 0.6, flow, t, 8.9, prof.energyGrade);
  paintOver(col, height, hFill, prof.streakFreq * 1.8, prof.streakAmp * 0.6,
            uImpasto * prof.impastoAmp * 0.4 * uStrokeAmount, prof.hardness * 0.9, 8.9, prof.impastoFloor);

  // Optional crosshatch layer
  if (uStrokeLayers == 2) {
    vec2 flow2 = vec2(-flow.y, flow.x);
    StrokeHit hX = bestOil(p + vec2(7.3, -2.1), sMed, lenMulMed * 0.9, widMulMed,
                           jitterAmt, prof.densityMed * 0.7, prof.shapeType, prof.bristleAmp, flow2, t, 6.5,
                           prof.energyGrade);
    paintOver(col, height, hX, prof.streakFreq, prof.streakAmp * 0.85,
              uImpasto * prof.impastoAmp * 0.55 * uStrokeAmount, prof.hardness, 6.5, prof.impastoFloor);
  }
}

// The shared stroke-medium SUBSTRATE finish (AX.W12 + AX.W13): paint the four-layer
// cascade off the profile, then canvas-tooth + relight + saturation. The three painterly
// STROKE mediums (oil / van-Gogh / oil-pastel) each AUTHOR their own profile and call
// this — the substrate is shared, the PROFILE (not a dispatch-body fork) differentiates
// the medium (slice 8 F6). mode passes through for the cascade's mode-special-cased shapes.
vec3 paintStrokeMedium(vec3 col, vec2 p, float t, StrokeProfile prof, int mode) {
  vec3 result = col;
  // AW.W4.2 — accumulated paint HEIGHT across the stroke layers. The relight reads
  // its gradient for the normal; the canvas tooth seeds the base relief.
  float height = 0.0;
  paintStrokeLayers(result, height, prof, mode, p, t);

  // Canvas tooth — linen weave
  float tooth1 = vnoise(p * prof.toothScale);
  float tooth2 = vnoise(p * prof.toothScale * vec2(0.6, 2.4) + 37.0);
  float tooth  = (0.6 * tooth1 + 0.4 * tooth2) - 0.5;
  result *= 1.0 + tooth * prof.toothAmp * uCanvasGrain;

  // AW.W4.2 — relight the accumulated paint height with the movable uLightDir
  // source (diffuse + Blinn specular, in LINEAR before aces()). The canvas tooth
  // is the base relief term so the weave also catches the raking light.
  float canvasBase = tooth * prof.toothAmp * 0.5;
  result = relightImpasto(result, height, canvasBase);

  // AX.W13 — the visible ground. The bare-ground gaps (low accumulated stroke height)
  // multiply toward prof.groundFloor, so van-Gogh's sparse atomic dabs read as separable
  // marks over a darker underpainting (oil/oil-pastel keep groundFloor=1.0 → no-op). The
  // smoothstep keeps the impasto dabs (high height) at full value; only the open ground
  // between them darkens.
  result *= mix(prof.groundFloor, 1.0, smoothstep(0.0, 0.38, height));

  // Pigment saturation boost
  result = saturate3(result, prof.pigmentSat);

  return result;
}

vec3 mediumOil(vec3 col, vec2 p, float t) {
  // The oil medium is a thin body: fetch the oil profile (mode-dispatched), paint via
  // the shared stroke substrate.  uStrokeMode: 0 oil (gestural), 1 knife, 3 brushwork.
  int mode = uStrokeMode;
  StrokeProfile prof = profileFor(MEDIUM_OIL, mode);
  return paintStrokeMedium(col, p, t, prof, mode);
}

// AX.W13 — the van-Gogh atomic-stroke medium is now a FIRST-CLASS body, NOT a
// mediumOil passthrough (slice 8 F0). It composes its OWN vangogh StrokeProfile (the
// comma/crescent shapeType, sparse high-contrast atomic placement with visible
// inter-stroke gaps, the full Starry-Night energy-grade cascade as a PROFILE field,
// and full-height impasto crowns) through the shared stroke substrate. The bridge forces
// the ETF (tensor) orientation so the swirl-rows queue along the color field's tangent;
// the within-stroke OKLCh broken color (paintOver) + the OKLab stroke OVER-composite
// give pigment-true atom-level shimmer. No subject matter — the "source image" is the
// generated nuclei field, so dabs trace its iso-bands (the Starry-Night swirl-rows).
vec3 mediumVangogh(vec3 col, vec2 p, float t) {
  StrokeProfile prof = profileFor(MEDIUM_VANGOGH, 0);
  return paintStrokeMedium(col, p, t, prof, 0);
}

// AX.W13 — the oil-pastel medium (uMedium==6) is a DISTINCT stroke-deposition body,
// split out of the dry-crayon tooth-multiply (mediumCrayon) (slice 8 F1). It DEPOSITS
// broad smeared directional strokes via the same brush engine with a creamy soft
// hardness, heavy pigment build-up where strokes overlap, and a chroma punch — the
// stroke-deposition model that gives oil-pastel its depth and less-uniform read.
// Shares the SUBSTRATE (the stroke cascade + tooth + relight) with oil/van-Gogh, NOT
// the dispatch body of dry crayon. The bridge forces tensor orientation.
vec3 mediumOilPastel(vec3 col, vec2 p, float t) {
  StrokeProfile prof = profileFor(MEDIUM_OILPASTEL, 0);
  return paintStrokeMedium(col, p, t, prof, 0);
}`;
