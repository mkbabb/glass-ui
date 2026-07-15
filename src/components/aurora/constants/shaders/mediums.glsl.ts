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
import { AURORA_VANGOGH_MEDIUM_GLSL } from "./vangogh-medium.glsl";
import { AURORA_OIL_MODES_GLSL } from "./oil-modes.glsl";
import { AURORA_METAL_PACK_GLSL, AURORA_METAL_MEDIUM_GLSL } from "./metal-medium.glsl";

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
`
    // BG.W-AUR-METAL-FINISH — the gradient PACK helpers (packGrad before structureTensorField).
    + AURORA_METAL_PACK_GLSL
    + /* glsl */ `
// ── Structure-tensor / edge-tangent-flow (AW.W4.1) ─────────────────────────
// The keystone of the painterly engine: derive stroke orientation from the COLOR
// FIELD's OWN structure, not a hand-authored flow pattern. A 3x3 Sobel over
// luma(sampleBase) yields the gradient (Gx,Gy); the 2x2 structure tensor
// J = [[Gx², GxGy],[GxGy, Gy²]] eigen-decomposes closed-form into the MINOR
// eigenvector (the edge-TANGENT — least color change, the stroke direction) + the
// coherence A = (λ1-λ2)/(λ1+λ2); flat zones relax toward fallbackDir by (1-A). The
// single-pass small-tap WebGL2 form. Returns vec4(tangent.xy, A, packGrad(Gx,Gy)) —
// the .w lane carries the metal medium's gradient (BG.W-AUR-METAL-FINISH; the .xy/.z
// callers are byte-unchanged).
vec4 structureTensorField(vec2 p, float t, vec2 fallbackDir) {
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
  return vec4(dir, A, packGrad(Gx, Gy));
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
`
    + AURORA_OIL_MODES_GLSL
    + /* glsl */ `
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
  // residual stays the oil/oil-pastel stroke-cascade ceiling. BB.W-AUR-KUWAHARA DECIDED the
  // booking: the SOFT anisotropic-Kuwahara finish ships as the OPT-IN mediumKuwahara() body
  // (uMedium==7) the consumer selects — NOT a re-tune of these oil/oil-pastel knobs. The
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

#define MEDIUM_KUWAHARA 7

// ── Kuwahara — the anisotropic generalized Kuwahara painterly finish (uMedium==7,
// BB.W-AUR-KUWAHARA) ───────────────────────────────────────────────────────────────
// The SOTA edge-preserving painterly smoothing: the generalized/anisotropic Kuwahara of
// Kyprianidis 2010, the SOFT polynomial-weighted variant (NOT the pre-2010 hard argmin,
// which BANDS the flat field into an 8-spoke pinwheel — the §4.2 anti-regression). Aurora
// is a PROCEDURAL field (no input texture), so the operator runs over sampleBase() directly:
// an elliptical kernel oriented along the structure tensor (elongated along the edge-tangent,
// narrowed by the anisotropy), divided into 8 overlapping sectors via smooth weights; the
// output is the variance-weighted blend of the sector means (1/(1+var^q) — low-variance
// sectors dominate, the SOFT criterion → flat oil-paint patches with crisp zone boundaries).
// Single-pass small-radius WebGL2 form: 4 rings × 8 angular taps = 32 procedural samples
// (cost-bounded; the offscreen-park / PRM freeze the substrate owns is untouched).
vec3 mediumKuwahara(vec3 col, vec2 p, float t) {
  // Orient the kernel along the structure-tensor edge-tangent + read the coherence A
  // (the field widened vec3→vec4 for metal's gradient; kuwahara reads only .xy/.z).
  vec4 stf = structureTensorField(p, t, flowField(p, t));
  vec2 tangent = stf.xy;
  float A = stf.z;
  // The ellipse axes: major along the tangent, minor across. Anisotropy squeezes the
  // minor axis (coherent zones → long-thin patch along the colour band; flat zones →
  // near-circular so the operator degrades gracefully to the isotropic Kuwahara). The
  // base radius rides uStrokeScale so the painterly patch size tracks the studio knob.
  float radius = clamp(0.010 + uStrokeScale * 0.00018, 0.006, 0.024);
  float aniso = mix(1.0, 0.34, clamp(A, 0.0, 1.0)); // minor/major axis ratio
  vec2 ax = tangent;                  // major-axis unit vector (edge-tangent)
  vec2 ay = vec2(-tangent.y, tangent.x); // minor-axis unit vector (edge-normal)

  // 8 sectors, soft polynomial weights. Each sector i centers on angle i·45°; a sample's
  // sector weight is a smooth gaussian-of-angular-distance so sectors OVERLAP (no hard
  // argmin → no pinwheel banding). The center sample seeds all sectors equally.
  const int SECTORS = 8;
  vec3  m[8];   // per-sector weighted colour sum
  vec3  s[8];   // per-sector weighted colour² sum (for variance)
  float w[8];   // per-sector weight sum
  for (int i = 0; i < SECTORS; i++) { m[i] = vec3(0.0); s[i] = vec3(0.0); w[i] = 0.0; }

  // 4 rings × 8 angular taps over the elliptical disc. Each tap: sample the procedural
  // field, then deposit into the sectors by the soft angular weight × the radial falloff.
  const int RINGS = 4;
  const int TAPS  = 8;
  for (int r = 1; r <= RINGS; r++) {
    float rr = float(r) / float(RINGS);          // 0.25 .. 1.0
    float radial = 1.0 - 0.6 * rr;               // inner taps weigh more (gaussian-ish)
    for (int a = 0; a < TAPS; a++) {
      float ang = 6.2831853 * float(a) / float(TAPS);
      // Elliptical offset: major axis full radius, minor axis squeezed by aniso.
      vec2 dirE = ax * cos(ang) + ay * (sin(ang) * aniso);
      vec2 off  = dirE * (radius * rr);
      vec3 c = sampleBase(p + off, t);
      // The sample's angular bin (its sector) — soft, so it spills into neighbours.
      for (int k = 0; k < SECTORS; k++) {
        float sectorAng = 6.2831853 * float(k) / float(SECTORS);
        // Smallest signed angular distance to the sector center.
        float d = ang - sectorAng;
        d = atan(sin(d), cos(d));                 // wrap to [-π, π]
        float sw = exp(-d * d * 2.2) * radial;    // gaussian angular weight × radial
        m[k] += c * sw;
        s[k] += c * c * sw;
        w[k] += sw;
      }
    }
  }

  // Per-sector mean + scalar luma-variance, then the SOFT variance-weighted blend.
  vec3  accum = vec3(0.0);
  float accumW = 0.0;
  for (int k = 0; k < SECTORS; k++) {
    float wk = max(w[k], 1e-4);
    vec3  mean = m[k] / wk;
    vec3  var3 = max(s[k] / wk - mean * mean, vec3(0.0));
    float variance = dot(var3, W_LUMA);           // perceptual scalar variance
    // SOFT criterion: low-variance sectors (flat, inside a colour zone) dominate; a
    // high-variance sector (straddling an edge) is suppressed. q controls the sharpness;
    // a finite q (not argmin) keeps the blend continuous → no pinwheel spoke.
    float sectorW = 1.0 / (1.0 + pow(variance * 320.0, 4.0));
    accum  += mean * sectorW;
    accumW += sectorW;
  }
  vec3 result = accum / max(accumW, 1e-4);

  // The center sample anchors the result in near-flat zones (where every sector reads the
  // same colour) so the operator is a no-op there — the smoothing only BITES at edges.
  vec3 center = sampleBase(p, t);
  result = mix(center, result, clamp(0.35 + 0.65 * A, 0.0, 1.0));

  // A faint canvas tooth + pigment-saturation lift so the flattened patches read as
  // oil-paint, not a posterized blur (the painterly identity the smoothing alone lacks).
  float tooth = vnoise(p * 300.0) - 0.5;
  result *= 1.0 + tooth * 0.06 * uCanvasGrain;
  result = saturate3(result, 1.04);

  // Blend toward the incoming col by uStrokeAmount so the studio amount knob controls
  // the finish strength (uStrokeAmount=0 → the raw field passes through; default → full).
  return mix(col, result, clamp(uStrokeAmount, 0.0, 1.0));
}

`
    // BG.W-AUR-METAL-FINISH — the metal bodies (uMedium==8/9) splice in HERE, after
    // mediumKuwahara + before vangogh (carved to metal-medium.glsl.ts for the bound).
    + AURORA_METAL_MEDIUM_GLSL
    + AURORA_VANGOGH_MEDIUM_GLSL
    + /* glsl */ `// AX.W13 — the oil-pastel medium (uMedium==6) is a DISTINCT stroke-deposition body,
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
