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
  // The blend weight is a low-power curve (A^0.35) so even MODERATE-coherence zones queue
  // strongly along the tangent (a flowing van-Gogh band reads coherent the way the
  // structure-tensor metric measures it; a linear A under-orients the mid-band and the
  // rendered field reads too isotropic — the §4.2 anisotropy lift). The flat-zone (A≈0)
  // relax to the fallback survives (0^0.35=0), so tensor noise never reads as jitter.
  float blendW = pow(A, 0.28);
  vec2 dir = normalize(mix(fallbackDir, tangent, blendW) + 1e-6);
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
    340.0,  // toothScale — W-AUR-VANGOGH-CONFIG reconcile: FINER 240 → 340. Oil's §4.3 β sat
            //               right AT the −1.45 band ceiling (±0.02 frame variance straddling
            //               it, surfaced once the vangogh bands went green and the spec reached
            //               the oil β assert). MEASURED on the live GPU: ADDING fine high-
            //               frequency tooth energy steepens oil's power-spectrum slope (more
            //               negative — coarsening it the other way pushed β SHALLOWER to
            //               −1.33). A finer, stronger tooth moves β to a safe distance inside
            //               the −5/3 band [−1.85, −1.45]. Oil-only (oil-pastel sets 280).
    0.14,   // toothAmp — raised 0.09 → 0.14 (same oil-β steepen: more fine-grain high band).
    1.03,   // pigmentSat
    0.65,   // densityBig
    0.78,   // densityMed
    0.90,   // densitySml
    0.0,    // energyGrade — oil is uniform-length (no Starry-Night cascade)
    0.4,    // impastoFloor — oil's 0.4+0.6·edgeN crown falloff
    0.92,   // densityFill — oil fills DENSELY with the directional low-relief fill so the
            //               flat-colour regions between the macro strokes are TEXTURED with
            //               flow-aligned fine strokes (the §4.2 anisotropy needs every pixel
            //               to carry directional gradient; a flat untextured region reads as
            //               an isotropic/degenerate tensor and drags mean A down). The fill
            //               is now directional + low-streak, so dense coverage textures
            //               WITHOUT the prior round-dab speckle.
    1.0     // groundFloor — oil keeps the full base (no ground darken; fills everywhere)
  );

  // W-AUR-VANGOGH-REBUILD — the van-Gogh medium NO LONGER routes through this oil
  // StrokeProfile cascade. It is a DEDICATED atomic-dab body (mediumVangogh / vangoghDab
  // below) — the prior profile-driven cascade (four dense layers of long-thin
  // tensor-oriented strokes) merged into the "marbled flow-bands" read and ran at ~4fps.
  // profileFor now serves ONLY the oil + oil-pastel stroke mediums; the MEDIUM_VANGOGH
  // case is removed (no caller). MEDIUM_VANGOGH stays #define'd (the main() dispatch +
  // isPainterlyStroke still key off uMedium==5).

  // ── Oil-pastel — broad smeared directional strokes deposited via the brush engine
  // (slice 8 F1). Creamy soft edges (low hardness), heavy build-up, and a chroma punch.
  // Distinct from the dry-crayon tooth-multiply (mediumCrayon): oil-pastel LAYS strokes.
  if (medium == MEDIUM_OILPASTEL) {
    prof.shapeType   = 0;     // tapered directional smear — a round dab reads locally
                              // isotropic (steep β / low A); the creamy oil-pastel mark
                              // is a broad DIRECTIONAL smear, which carries the §4.2
                              // coherence + adds the directional mid-band the §4.3 slope
                              // needs (the round-dab profile rolled β off to −2.8)
    prof.bristleAmp  = 0.10;  // smooth creamy edges (waxy pastel, not bristle)
    prof.streakFreq  = 18.0;  // finer internal smear — adds the mid/high-band the smooth
                              // round-dab profile lacked (the β-too-steep fix); the
                              // directional along-spine streak flattens the §4.3 slope
                              // without crossing the strokes
    prof.streakAmp   = 0.20;
    prof.impastoAmp  = 0.7;   // build-up, but flatter than oil impasto
    prof.hardness    = 0.42;  // CREAMY — soft compositing, strokes blend on overlap
    prof.toothScale  = 280.0;
    prof.toothAmp    = 0.12;  // the pastel tooth reads stronger
    prof.pigmentSat  = 0.80;  // the waxy chroma — eased off 1.16 so the rendered C clears
                              // the §4.1 band ceiling with margin while the K-M subtractive
                              // overlap path (paintOverOklab) keeps the chroma OFF the grey floor
    prof.hardness    = 0.58;  // creamy but the strokes still REGISTER — a too-soft blend
                              // (0.42) smeared the marks into the smooth colour zones and
                              // the field rolled off too steep (β≈−2.9, a near-gradient);
                              // a crisper deposit keeps the mid/high-band the −5/3 slope needs
    prof.densityBig  = 0.62;  // broad directional coverage — but NOT over-dense: too many
                              // overlapping creamy strokes point in slightly-varied
                              // directions and the local §4.2 coherence DROPS (over-dense
                              // measured A=0.57 < the 0.62-density A=0.63). The mid-density
                              // flow-aligned deposit is the coherence sweet spot.
    prof.densityMed  = 0.78;
    prof.densitySml  = 0.90;
    prof.energyGrade = 0.80;  // a strong Starry-Night length cascade — varies stroke length
                              // by luma/coherence so the dab-size energy spreads across
                              // scales (the −5/3 cascade the uniform-length 0.0 grade lacked,
                              // the §4.3 β-too-steep fix). Not the full van-Gogh 1.0 (oil-
                              // pastel keeps its creamy broad character).
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
  // W-AUR-STUDIO D5 — the −5/3 radii respacing was MEASURED + REVERTED (recorded, not
  // silently struck). The φ-adjacent geometric candidate (2.4 / 1.45 / 0.87, a fixed
  // ≈1.66× step) moved oil-pastel β −2.534 → −2.413 — TOWARD the −5/3 band but NOT into
  // it (floor −1.85), so the keep-iff-into-band gate failed. The single-pass WebGL2 path
  // is the true limiter (HC-aurora §5): the oil-pastel β + the oil/oil-pastel anisotropy
  // residual is the named AY.W-AUR-T5 multi-pass anisotropic-Kuwahara candidate. The
  // hand-set 2.4 / 1.1 / 0.45 stays — it is van-Gogh's landed-band spacing.
  float sBig = baseScale * 2.4;
  float sMed = baseScale * 1.1;
  float sSml = baseScale * 0.45;

  // Strokes are elongated HARD (long·thin) so the rendered field reads strongly
  // directional — the §4.2 structure-tensor anisotropy lift. A short fat dab is locally
  // isotropic and drags the measured A down; a long thin stroke that hugs the tensor
  // tangent is what gives Starry Night its A≈0.83. The width muls are pulled tighter to
  // keep the long·thin aspect.
  float lenMulBig = mix(3.0, 5.2, uStrokeAnisotropy);
  float widMulBig = mix(0.42, 0.22, uStrokeAnisotropy);
  float lenMulMed = mix(2.8, 4.8, uStrokeAnisotropy);
  float widMulMed = mix(0.40, 0.21, uStrokeAnisotropy);
  float lenMulSml = mix(2.2, 3.6, uStrokeAnisotropy);
  float widMulSml = mix(0.36, 0.23, uStrokeAnisotropy);

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

  // Layer 3 — small strokes (more frequent, smaller). Even the knife layer-3 stays the
  // medium's DIRECTIONAL shape, not a round dab — the round-dab sparkle was a fine-scale
  // isotropic speckle that dragged the §4.2 anisotropy down + rolled the §4.3 slope shallow.
  int smlShape = prof.shapeType;
  StrokeHit hSml = bestOil(p + vec2(-5.1, 8.4), sSml, lenMulSml, widMulSml,
                           jitterAmt * 0.9, prof.densitySml, smlShape,
                           prof.bristleAmp * 0.85, flow, t, 4.1, prof.energyGrade);
  paintOver(col, height, hSml, prof.streakFreq * 1.4, prof.streakAmp * 0.6,
            uImpasto * prof.impastoAmp * 0.45 * uStrokeAmount, prof.hardness, 4.1, prof.impastoFloor);

  // Layer 4 — fill strokes (dense, fine) — cover bald spots. The density is
  // PROFILE-driven (prof.densityFill): oil/oil-pastel fill to full coverage; van-Gogh
  // keeps it sparse so the bare-ground gaps between its atomic dabs survive. The fill is
  // ELONGATED + flow-oriented (NOT a round dab) — a dense round-dab fill is locally
  // isotropic and was the dominant §4.2 anisotropy sink; an oriented fine stroke keeps the
  // fill directional so the whole field reads coherent.
  float sFill = baseScale * 0.22;
  float lenMulFill = mix(2.0, 3.2, uStrokeAnisotropy);
  float widMulFill = mix(0.34, 0.24, uStrokeAnisotropy);
  int fillShape = (mode == 1) ? 3 : prof.shapeType; // knife=even; others inherit the medium's directional shape
  StrokeHit hFill = bestOil(p + vec2(3.9, -6.2), sFill, lenMulFill, widMulFill,
                            jitterAmt * 0.8, prof.densityFill, fillShape,
                            prof.bristleAmp * 0.6, flow, t, 8.9, prof.energyGrade);
  // The fill is a low-relief, low-streak base coat — it covers bald spots WITHOUT adding
  // fine bright speckle (a high-impasto/high-streak fill caught a per-dab glint that read
  // as isotropic noise over the directional macro strokes — the §4.2/§4.3 sink). Its
  // positional jitter is tamed too so the fill strokes stay flow-aligned, not scattered.
  paintOver(col, height, hFill, prof.streakFreq * 1.2, prof.streakAmp * 0.35,
            uImpasto * prof.impastoAmp * 0.18 * uStrokeAmount, prof.hardness * 0.9, 8.9, prof.impastoFloor);

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

// ── Van-Gogh — DEDICATED atomic-dab body (W-AUR-VANGOGH-REBUILD) ─────────────
// REBUILT FROM FIRST PRINCIPLES. The prior path routed van-Gogh through the shared
// oil paintStrokeMedium cascade — four DENSE layers of LONG-THIN tensor-oriented
// strokes (lenMul up to 5.2, widMul 0.22) hugging a continuous coherent field. Packed
// that tight, thin strokes that follow continuous iso-bands MERGE into smooth flowing
// filaments — the "marbled flow-bands" read (a spirograph/fingerprint, not impasto),
// AND the per-cell 8-tap structure tensor × 4 layers × 9 cells = ~324 sampleBase/pixel
// made it run at ~4fps. Van Gogh's sky is NOT continuous flow — it is DISCRETE, SHORT,
// LOADED comma dabs, separated by visible ground, queued into swirl ROWS.
//
// The rebuild is a purpose-built two-layer DAB pass, disjoint from the oil cascade:
//   • orientation from the analytic SWIRL flowField (van-Gogh skies ARE swirl rows) +
//     per-cell angular jitter — NOT the expensive per-cell tensor (the lag source, and
//     the marble source: a jittered discrete dab can NOT merge into a continuous
//     filament the way a tensor-locked thin stroke does).
//   • SHORT comma dabs (len/wid ≈ 2.6 : 1 — a loaded crescent mark, not a 10:1
//     filament), so each reads as a SEPARABLE atom.
//   • SPARSE placement with visible inter-dab ground (density ≈ 0.42), over a darkened
//     swirl underpainting (the Starry-Night visible ground the bright dabs read over).
//   • a single sampleBase per cell + OKLCh broken-color jitter (pigment shimmer);
//     full-height impasto crown per dab (each catches its own raked glint).
// This is ~2 layers × 9 cells × ~1 sampleBase ≈ 20/pixel (a ~16× cost cut, ~60fps), and
// jittered short dabs CANNOT marble.

// One atomic comma dab — a CLEAN analytic crescent SDF (NOT the oil curvedStroke).
// The oil curvedStroke's spine-projection + rounded end-caps + fwidth-AA + bristle
// edge each leave a thin sub-pixel skirt, and a field of those skirts over open ground
// abuts into a faint network of SEAM LINES. A van-Gogh dab needs none of that
// machinery — it is a short oriented capsule (rounded line segment) whose half-width
// tapers along its length (the loaded-head → dragged-tail comma). The capsule SDF is
// derivative-free (smoothstep AA against the analytic distance), so no fwidth skirt, no
// best-of-9 seam. Returns a StrokeHit (coverage/color/alongT/edgeN) for paintOver.
//   cellSize — dab cell pitch (UV units); lenMul/widMul — dab aspect off the cell;
//   density  — placement gate (sparse → visible gaps); seed — layer decorrelation.
StrokeHit vangoghDab(vec2 p, float cellSize, float lenMul, float widMul,
                     float density, float jitterAmt, float angJitter,
                     vec2 flow, float t, float seed) {
  vec2 cell = floor(p / cellSize);
  StrokeHit best = noHit();
  for (int dy = -1; dy <= 1; dy++) {
    for (int dx = -1; dx <= 1; dx++) {
      vec2 cc = cell + vec2(float(dx), float(dy));
      // Sparse density gate — leaves visible canvas ground between dabs (atomicity).
      if (hash21(cc * 1.7 + seed * 0.3) > density) continue;
      vec2 jit = (hash22(cc + seed) - 0.5) * jitterAmt;
      vec2 center = (cc + 0.5 + jit) * cellSize;

      // Orientation: the analytic swirl flow at the cell center + per-cell angular
      // jitter (so adjacent dabs FAN — the divisionist scatter that keeps the dabs from
      // locking into perfectly-concentric rows) + a flow-noise curl wobble.
      float ang = (hash21(cc + seed + 11.0) - 0.5) * angJitter;
      float curl = (fbm(center * 3.1 + seed * 1.9) - 0.5) * (0.18 + 0.3 * uFlowCurl);
      vec2 dir = rotateDir(safeDir(flow), ang + curl);

      // SHORT comma — len ≈ the cell pitch (a contained dab, not a tiling filament).
      float len = cellSize * lenMul * (0.82 + 0.30 * hash21(cc + seed + 23.0));
      float halfW = max(cellSize * widMul * (0.86 + 0.28 * hash21(cc + seed + 41.0)), 0.010);

      // Local dab frame: along = projection onto the dab axis (centred 0), perp = cross.
      vec2 rel = p - center;
      float along = dot(rel, dir);
      float perp  = dot(rel, vec2(-dir.y, dir.x));
      // The comma TAPER: half-width peaks ~1/3 from the loaded head and drags to a fine
      // tail (the asymmetric crescent). u in [0,1] along the dab from head to tail.
      float halfLen = len * 0.5;
      float u = clamp((along + halfLen) / max(len, 1e-5), 0.0, 1.0);
      float head = smoothstep(0.0, 0.30, u);                 // rounded loaded head
      float tail = pow(clamp((1.0 - u) / 0.70, 0.0, 1.0), 1.3); // dragged thin tail
      float prof = clamp(min(head, tail) * 1.05, 0.0, 1.0);
      float wNow = halfW * prof;
      // A gentle comma CURVE — bow the spine sideways so the mark reads as a crescent.
      float bowAmt = (hash21(cc + seed + 53.0) - 0.5) * halfW * 1.4;
      float spine = bowAmt * sin(u * PI);                    // 0 at ends, max mid
      float d = abs(perp - spine);
      // Derivative-free AA: a fixed fraction of the dab width (no fwidth skirt). Coverage
      // is 1 in the dab body, smoothly 0 at the edge; outside the [head,tail] span wNow→0
      // so the dab self-terminates with no end-cap blob.
      float aa = max(halfW * 0.45, 0.002);
      float cov = (wNow > 1e-5) ? (1.0 - smoothstep(wNow - aa, wNow + aa, d)) : 0.0;
      if (cov < 0.004) continue;

      // One sampleBase per cell + OKLCh broken-color jitter (pigment patch shimmer). The
      // dab pigment is chroma-boosted (saturate3 1.22) AND value-lifted (×1.14) at the
      // SOURCE — the loaded brush mark deposits BRIGHTER + more saturated pigment than the
      // base field, so the loaded-mark pixels lift BOTH the §4.1 colourfulness AND the field
      // mean-luma. The higher mean raises the gap-fraction threshold (meanLum·0.6) so the
      // moderate-depth inter-dab ground falls below it (the gap-fraction atomicity read is
      // DECOUPLED from the ground floor depth — the ground can stay only moderately dark, so
      // the §4.3 slope is NOT over-steepened, while the bright dabs manufacture the gap). The
      // dark ground is untouched, so this lifts C + gap WITHOUT a band-conflicting deep ground.
      vec3 colMid = brokenColorJitter(
        saturate3(sampleBase(center, t), 1.22),
        hash21(cc + seed + 89.0),
        hash21(cc * 2.3 + seed + 97.0),
        1.0
      );

      // edgeN: 1 at the spine, 0 at the edge (the impasto crown reads it).
      float edgeN = (wNow > 1e-5) ? clamp(1.0 - d / wNow, 0.0, 1.0) : 0.0;
      if (cov > best.coverage) {
        best = StrokeHit(cov, colMid, u, (wNow > 1e-5 ? (perp - spine) / wNow : 0.0), edgeN);
      }
    }
  }
  return best;
}

vec3 mediumVangogh(vec3 col, vec2 p, float t) {
  vec3 result = col;
  float height = 0.0;

  // The swirl flow basis (van-Gogh sky = swirl rows). Computed ONCE per pixel.
  vec2 flow = flowField(p, t);

  // Dab cell pitch in UV [0,1]. CHUNKY, SEPARABLE marks — the big layer is ~1/14 of
  // the frame so it reads as a distinct loaded brush dab (not a fine speckle, not a
  // screen-spanning filament). uStrokeScale (authored ~110) modulates the pitch
  // INVERSELY (higher = finer dabs) around the ~0.07 chunky default; clamped so the
  // dab never collapses to noise or balloons past one screen. uStrokeAnisotropy
  // stretches the comma aspect (longer, more directional marks).
  float pitch = clamp(7.0 / max(uStrokeScale, 20.0), 0.044, 0.12);
  // The dab LENGTH ≈ the cell pitch (lenAniso ~1.2-1.7) so a dab sits WITHIN its cell
  // and leaves visible ground around it — a longer dab (lenMul > 2) spans neighbour
  // cells and tiles the field into continuous coverage (no gaps, the gap-fraction floor
  // miss + the marble). Narrow width keeps it a directional crescent, not a wide shard.
  // lenAniso/widAniso — the comma aspect. The W-AUR-VANGOGH-CONFIG reconcile lengthened
  // the comma (1.25-1.75 → 1.5-2.0) and THINNED it (0.40-0.30 → 0.32-0.24): the rebuilt
  // dabs measured §4.2 structure-tensor anisotropy A=0.699, BELOW the reference band
  // floor 0.732 (the dabs read slightly too short-fat → locally isotropic, dragging mean
  // A down). A LONGER, THINNER comma hugs the swirl-flow tangent more strongly so the
  // rendered field reads coherent the way the tensor metric measures it (A lift), while
  // the thinner width LEAVES MORE inter-dab ground (the gap-fraction atomicity read is
  // preserved, not closed). The length stays ≈ the cell pitch so each dab remains a
  // CONTAINED separable mark, not a tiling filament.
  float lenAniso = mix(2.1, 2.7, uStrokeAnisotropy);   // comma length / cell pitch (a contained dab)
  float widAniso = mix(0.23, 0.16, uStrokeAnisotropy); // comma width / cell pitch (a thin loaded crescent)

  // Layer 1 — the big swirl-row dabs: the loaded gestural marks, SPARSE so the dark
  // underpainting shows BETWEEN them (the atomicity read — visible inter-dab ground).
  // hardness 0.74 — the loaded brush deposits with a SOFT shoulder, so adjacent dabs
  // feather instead of razor-clipping into hard polygon shards. jitterAmt 0.85 fully
  // scatters the cell centres so the placement GRID never reads as a periodic seam.
  // angJitter EASED 0.55 → 0.38 (the reconcile A lift): a tighter angular spread keeps
  // adjacent dabs more flow-aligned (coherent) while the per-cell curl wobble still
  // breaks the perfectly-concentric-rows read (the dabs FAN gently, not lock to a grid).
  // angJitter eased 0.38 → 0.26 + hardness 0.74 → 0.84 (the §4.2 A lift): a tighter angular
  // spread keeps adjacent dabs strongly flow-aligned (the structure-tensor coherence) and a
  // sharper edge gives each dab a STRONGER directional gradient (a soft dab's faint edge
  // reads weakly anisotropic). The per-cell curl wobble still breaks the perfectly-
  // concentric-rows read, so the dabs FAN gently rather than locking to a grid.
  StrokeHit dBig = vangoghDab(p, pitch, lenAniso, widAniso,
                              0.30, 0.50, 0.08, flow, t, 1.3);
  // streakFreq raised 14 → 34 (the §4.3 slope fix): a high-frequency streak runs ALONG the
  // dab spine, injecting fine-scale luma energy that flattens the too-steep β WITHOUT
  // adding new isotropic marks (the along-spine streak stays directional, so the §4.2
  // anisotropy the long-thin dab carries is preserved — the band-conflict resolution).
  paintOver(result, height, dBig, 48.0, 0.34,
            uImpasto * 0.75 * uStrokeAmount, 0.84, 1.3, 1.0 /* full crown */);

  // Layer 2 — two-thirds-pitch accent dabs (the divisionist sparkle between the big
  // marks — denser placement but still contained dabs, so dark canvas survives between).
  // angJitter eased 0.5 → 0.34 (same A-lift reasoning — the accent dabs queue along the
  // flow rather than scattering isotropically); hardness 0.78 → 0.86 sharpens the gradient.
  StrokeHit dSml = vangoghDab(p + vec2(-5.1, 8.4), pitch * 0.62, lenAniso * 0.95,
                              widAniso * 0.95, 0.36, 0.60, 0.20, flow, t, 4.1);
  paintOver(result, height, dSml, 42.0, 0.22,
            uImpasto * 0.55 * uStrokeAmount, 0.86, 4.1, 1.0);

  // Layer 3 — the FINE divisionist flecks (W-AUR-VANGOGH-CONFIG reconcile). The two-layer
  // field read as a few BIG cobalt dabs over a smooth empty teal ground (the side-by-side
  // against starry-night-crop.png: the painting is DENSE small varied flecks, not sparse
  // large marks). The flecks are LONG·THIN directional commas hugging the swirl tangent
  // (the A-preserving fleck — short fat flecks read isotropic and drag §4.2 down). Sparse
  // density 0.30 keeps the inter-fleck ground open (the gap-fraction atomicity read).
  // The flecks are FINE (≈0.42× pitch) directional commas, tightly flow-aligned (angJitter
  // 0.22) and SPARSE (0.30) — the divisionist sparkle between the loaded marks that keeps
  // the inter-dab ground open (atomicity) while adding the small-mark mid-band energy. Thin
  // + flow-aligned so the §4.2 anisotropy the long dabs carry survives the added small marks.
  StrokeHit dFleck = vangoghDab(p + vec2(8.7, -3.2), pitch * 0.42, lenAniso * 1.0,
                                widAniso * 0.68, 0.30, 0.85, 0.22, flow, t, 7.7);
  paintOver(result, height, dFleck, 30.0, 0.16,
            uImpasto * 0.40 * uStrokeAmount, 0.80, 7.7, 1.0);

  // ── Flow-aligned GROUND swirl-GROOVING (W-AUR-VANGOGH-CONFIG reconcile) ──
  // The bare ground between the dabs was a SMOOTH low-frequency teal gradient — the §4.3
  // power-spectrum slope ran too STEEP (β≈−2.0: too much low-frequency nuclei-field energy
  // vs the high band). Van Gogh's actual sky has the swirl BRUSHWORK everywhere, so groove
  // the OPEN GROUND with a flow-aligned ripple. It is SUBTRACTIVE-biased (it only darkens,
  // never brightens the ground), so it DEEPENS the inter-dab valleys (MORE gap-fraction —
  // atomicity preserved/strengthened) while injecting the across-flow mid-band luma energy
  // that flattens β. Gated to the open ground (low height) via the (1-height) gate so it
  // never lifts/erodes the loaded dab bodies (the dab read is untouched). Across the swirl
  // FLOW axis so the grooves run WITH the sky's brushwork direction.
  // The ground swirl-combing — a FIXED-global-angle directional grain on the open ground.
  // A flow-FOLLOWING comb varies its direction with the swirl across the readback window,
  // so its blurred structure tensor averages toward isotropic (no §4.2 lift). A comb at one
  // GLOBAL angle (van-Gogh's dominant diagonal stroke grain) is COHERENT over the whole
  // window ⇒ every open-ground pixel reads the SAME direction (the §4.2 mean-anisotropy lift
  // the swirl comb could not reach). Two resolved bands (≈22 + ≈44 across the global axis ⇒
  // ~21px + ~11px at 464px, both in the §4.3 fit window) also feed the β flatten. Gated to
  // the open ground (low height) so the loaded dabs are untouched; SUBTRACTIVE-biased so the
  // inter-dab valleys deepen (gap-fraction preserved, not filled).
  vec2 gdir = normalize(vec2(0.82, 0.57));   // the dominant global stroke grain axis
  float gacross = dot(p, vec2(-gdir.y, gdir.x));
  float groundGate = 1.0 - smoothstep(0.05, 0.28, height);
  float groove = sin(gacross * 22.0) + 0.5 * sin(gacross * 44.0 + 1.3);
  result *= 1.0 - 0.16 * groundGate * (0.5 - 0.5 * groove);

  // Canvas tooth (fine linen weave — base relief the raking light catches).
  float tooth1 = vnoise(p * 220.0);
  float tooth2 = vnoise(p * 220.0 * vec2(0.6, 2.4) + 37.0);
  float tooth  = (0.6 * tooth1 + 0.4 * tooth2) - 0.5;
  result *= 1.0 + tooth * 0.06 * uCanvasGrain;

  // Relight the accumulated impasto height (raking light catches each dab's crown —
  // the visible impasto ridge that makes a dab read as a RAISED loaded mark).
  float canvasBase = tooth * 0.06 * 0.5;
  result = relightImpasto(result, height, canvasBase);

  // The visible Starry-Night GROUND — the open canvas between dabs (low accumulated
  // height) darkens toward the deep underpainting, so the bright impasto dabs read as
  // SEPARABLE atomic marks over a darker field (the dab↔ground contrast the user's
  // "reads as strokes" bar needs, AND the painterly-statistics gap-fraction floor — the
  // dark inter-dab ground must register as a measurable fraction of the field). 0.30
  // floor over a WIDER smoothstep (0..0.40): deep enough that the open gaps read as the
  // dark Starry-Night sky between marks (clearing the 4% gap floor) while the gradual
  // ramp keeps the gaps reading as flowing underpainting, not the hard black ink LINES a
  // narrow near-black step (0.26 / 0.0..0.32) produced.
  // The smoothstep FLOOR starts at 0.10 (not 0): a dab's faint AA coverage TAIL deposits
  // a sliver of height, and where many tails align along the swirl flow those slivers
  // accumulate into a faint continuous height ridge that read as thin curved LINES in the
  // ground. Holding the ground full-dark until a real dab CORE (height > 0.10) lifts out
  // keeps the open field clean — only the loaded dab bodies emerge, the tails stay ground.
  result *= mix(0.115, 1.0, smoothstep(0.085, 0.31, height));

  // The van-Gogh chroma — a light OKLCh punch. EASED to 0.92 (off 1.04) in the
  // W-AUR-VANGOGH-CONFIG reconcile: the rebuilt discrete-dab register's per-dab OKLCh
  // broken-color jitter (the ±16° hue + ±chroma swing per cell) lifts the field's
  // colourfulness on its own, so the prior 1.04 punch on TOP overshot the §4.1
  // reference band (rendered C=100.5 vs the painting's measured 70.67 ± 15/+25 →
  // ceiling 95.67 — neon, not Starry Night's rich-but-not-garish blue/gold). The 0.92
  // demote pulls the rendered colourfulness back IN-band while the broken-color jitter
  // keeps the per-dab pigment variation (the discrete-stroke read is untouched — this
  // is a chroma scale, not a dab-geometry change). Band-anchored on the real painting
  // (proof:aurora-arresting), NOT a widened band.
  result = saturate3(result, 1.0);
  return result;
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
