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

export const AURORA_MEDIUMS_POST_BRUSH_GLSL = /* glsl */ `// ── Crayon / oil-pastel — paper tooth × wax pigment (PEER medium) ─────────
// Crayon is not strokes. It's pigment crumbs dragged across paper tooth.
// Model: heavy 2D tooth noise at multiple scales, anisotropically stretched
// along flow direction, multiplied into the base color. Add a slow "waxy
// film" that slightly unifies hues, and occasional darker "pressed" spots
// where the crayon dug in. NO straight segments. Dispatched at main() level as
// a peer of pastel/watercolor/oil — never a branch inside mediumOil().
// AW.W4.4 — GENUINE oil pastel: pigment DEPOSITED on the paper tooth, a broken
// SCUMBLE upper layer letting the paper/lower color show through, and a waxy BURNISH
// film whose sheen grows with layer count. Reworked from the old tooth-multiply
// gradient into a material-truth deposition model. Oriented along the ETF field
// (W4.1); OKLCh broken color (W5). The oil-pastel first-class medium (uMedium==6)
// AND the legacy crayon peer (uMedium==4) both dispatch this single body.
vec3 mediumCrayon(vec3 col, vec2 p, float t) {
  // Orient the deposition streaks along the structure-tensor edge-tangent. The
  // painterly mediums force uStrokeOrient==tensor, so read the tensor field directly;
  // fall back to flowField for the legacy crayon strokeMode route.
  vec2 flow = (uStrokeOrient == 1)
    ? structureTensorField(p, t, flowField(p, t)).xy
    : flowField(p, t);
  float ang = atan(flow.y, flow.x);
  float ca = cos(-ang), sa = sin(-ang);
  vec2 pr = vec2(p.x * ca - p.y * sa, p.x * sa + p.y * ca);

  float aniso = mix(0.45, 0.95, uStrokeAnisotropy);
  float scale = max(uStrokeScale * 1.6, 180.0);

  // ── Paper TOOTH height field — the relief the pigment rides. Anisotropic
  // (squished along flow, coarse cross-flow). Peaks = ridges, valleys = paper pits.
  float t1 = vnoise(vec2(pr.x * scale * aniso, pr.y * scale));
  float t2 = vnoise(vec2(pr.x * scale * aniso * 0.4, pr.y * scale * 0.4) + 11.0);
  float t3 = vnoise(vec2(pr.x * scale * aniso * 2.1, pr.y * scale * 2.1) + 23.0);
  float paperHeight = 0.55 * t1 + 0.30 * t2 + 0.15 * t3;

  // ── DEPOSITION — pigment lands on the tooth PEAKS and skips the valleys. Light
  // pressure (low uStrokeAmount) shows paper through the valleys; heavy pressure
  // fills them. deposit in [0,1] is the per-pixel pigment coverage.
  float pressure = clamp(uStrokeAmount, 0.0, 1.0);
  float toothFloor = mix(0.62, 0.18, pressure);  // heavy pressure lowers the floor
  float deposit = smoothstep(toothFloor, toothFloor + 0.35, paperHeight);

  // ── SCUMBLE — a broken UPPER layer at coverage < 1 (the signature oil-pastel
  // move). A coarse mask gates a lighter dragged stroke over the deposition so the
  // LOWER color shows through the gaps. Drag direction follows the tensor flow.
  float scumbleMask = smoothstep(0.35, 0.85, vnoise(vec2(pr.x * scale * 0.55, pr.y * scale * 0.22) + 7.0));
  float scumbleCoverage = scumbleMask * pressure * 0.6;  // < 1 — paper/lower shows

  // The lower color is the base; the deposited pigment is the base lifted into the
  // tooth. Mix the base toward the deposited layer by the deposition coverage, then
  // let the scumble break the upper layer so the lower reads through the gaps.
  vec3 paper = col * 0.92;                       // the paper-showing-through tone
  vec3 deposited = col;                          // the pigment-on-tooth tone
  vec3 result = mix(paper, deposited, deposit);
  // Scumble: a broken pass of the deposited color at < 1 coverage.
  result = mix(result, deposited * (0.96 + 0.08 * t1), scumbleCoverage);

  // ── WAXY BURNISH FILM — a low-roughness BROAD specular lobe whose sheen grows
  // with the pigment build-up (burnish), distinct from oil's sharp glint. Reads the
  // paper-height gradient as a soft normal and lights it with the movable uLightDir.
  float waxNormalZ = 2.4;
  vec3 N = normalize(vec3(-dFdx(paperHeight) * 30.0, -dFdy(paperHeight) * 30.0, waxNormalZ));
  vec3 L = normalize(uLightDir);
  vec3 V = vec3(0.0, 0.0, 1.0);
  vec3 H = normalize(L + V);
  float burnish = deposit * (0.5 + 0.5 * scumbleMask); // sheen grows with build-up
  float sheen = pow(max(dot(N, H), 0.0), 6.0);          // broad waxy lobe
  result += burnish * sheen * 0.10 * uLightColor;

  // ── Broken-color pigment: stable wax/pigment patches in OKLCh (W5), not flicker.
  vec2 pigmentCell = floor(pr * max(scale * 0.18, 32.0));
  float pigmentMask = smoothstep(0.28, 0.82, vnoise(pr * scale * 0.21 + 19.0));
  result = brokenColorJitter(
    result,
    hash21(pigmentCell + 17.0),
    hash21(pigmentCell * 2.1 + 31.0),
    0.45 + 0.55 * pigmentMask
  );

  // Oil pastel is saturation-amplified (the waxy chroma punch).
  result = saturate3(result, 1.12);

  return result;
}

vec3 mediumOil(vec3 col, vec2 p, float t) {
  // Mode knobs (uStrokeMode) — oil-stroke modes ONLY (crayon is a peer medium,
  // uMedium==4, dispatched at main()):
  //   0 oil         — balanced modern-abstract/palette-knife hybrid
  //   1 knife       — palette-knife impasto: razor edges, heavy bristle/shadow
  //   3 brushwork   — thick bristle brush
  int mode = uStrokeMode;

  // Per-mode parameters
  int  shapeType   = 0;     // tapered
  float bristleAmp = 0.25;  // 0..0.5
  float streakFreq = 9.0;
  float streakAmp  = 0.09;
  float impastoAmp = 0.9;
  float hardness   = 0.80;  // edge compositing
  float toothScale = 240.0;
  float toothAmp   = 0.09;
  float pigmentSat = 1.03;
  float densityBig = 0.65;
  float densityMed = 0.78;
  float densitySml = 0.90;

  if (mode == 1) {        // palette knife
    shapeType = 3;        // flat, even
    bristleAmp = 0.12;
    streakFreq = 4.0;  streakAmp = 0.05;
    impastoAmp = 1.6;
    hardness   = 0.95;
    toothAmp   = 0.04;
    densityBig = 0.80; densityMed = 0.88; densitySml = 0.70;
  } else if (mode == 3) { // thick brushwork
    shapeType = 0;        // tapered
    bristleAmp = 0.32;
    streakFreq = 14.0; streakAmp = 0.14;
    impastoAmp = 1.2;
    hardness   = 0.85;
    toothAmp   = 0.07;
  }

  // Scales & multipliers from uniforms
  float baseScale = max(uStrokeScale * 0.006, 0.008);
  // Three layers: big gestural, medium body, small dabs
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

  vec3 result = col;
  // AW.W4.2 — accumulated paint HEIGHT across the stroke layers. The relight reads
  // its gradient for the normal; the canvas tooth seeds the base relief.
  float height = 0.0;

  // Layer 1 — big gestural strokes (sparse, shaping)
  StrokeHit hBig = bestOil(p, sBig, lenMulBig, widMulBig, jitterAmt * 0.55,
                           densityBig, shapeType, bristleAmp, flow, t, 1.3);
  paintOver(result, height, hBig, streakFreq * 0.7, streakAmp,
            uImpasto * impastoAmp * uStrokeAmount, hardness, 1.3);

  // Layer 2 — medium body strokes
  StrokeHit hMed = bestOil(p + vec2(11.3, 3.7), sMed, lenMulMed, widMulMed,
                           jitterAmt, densityMed, shapeType, bristleAmp, flow, t, 2.7);
  paintOver(result, height, hMed, streakFreq, streakAmp,
            uImpasto * impastoAmp * uStrokeAmount, hardness, 2.7);

  // Layer 3 — small dabs (more frequent, smaller)
  int smlShape = (mode == 1) ? 2 : shapeType; // knife uses dabs for sparkle
  StrokeHit hSml = bestOil(p + vec2(-5.1, 8.4), sSml, lenMulSml, widMulSml,
                           jitterAmt * 1.3, densitySml, smlShape,
                           bristleAmp * 0.85, flow, t, 4.1);
  paintOver(result, height, hSml, streakFreq * 1.4, streakAmp * 0.8,
            uImpasto * impastoAmp * 0.65 * uStrokeAmount, hardness, 4.1);

  // Layer 4 — fill dabs (very dense, very small) — covers bald spots
  float sFill = baseScale * 0.22;
  float lenMulFill = mix(1.4, 2.0, uStrokeAnisotropy);
  float widMulFill = mix(0.50, 0.38, uStrokeAnisotropy);
  int fillShape = (mode == 1) ? 3 : 2; // knife=even, others=dab (round fills)
  StrokeHit hFill = bestOil(p + vec2(3.9, -6.2), sFill, lenMulFill, widMulFill,
                            jitterAmt * 1.5, 0.95, fillShape,
                            bristleAmp * 0.6, flow, t, 8.9);
  paintOver(result, height, hFill, streakFreq * 1.8, streakAmp * 0.6,
            uImpasto * impastoAmp * 0.4 * uStrokeAmount, hardness * 0.9, 8.9);

  // Optional crosshatch layer
  if (uStrokeLayers == 2) {
    vec2 flow2 = vec2(-flow.y, flow.x);
    StrokeHit hX = bestOil(p + vec2(7.3, -2.1), sMed, lenMulMed * 0.9, widMulMed,
                           jitterAmt, densityMed * 0.7, shapeType, bristleAmp, flow2, t, 6.5);
    paintOver(result, height, hX, streakFreq, streakAmp * 0.85,
              uImpasto * impastoAmp * 0.55 * uStrokeAmount, hardness, 6.5);
  }

  // Canvas tooth — linen weave
  float tooth1 = vnoise(p * toothScale);
  float tooth2 = vnoise(p * toothScale * vec2(0.6, 2.4) + 37.0);
  float tooth  = (0.6 * tooth1 + 0.4 * tooth2) - 0.5;
  result *= 1.0 + tooth * toothAmp * uCanvasGrain;

  // AW.W4.2 — relight the accumulated paint height with the movable uLightDir
  // source (diffuse + Blinn specular, in LINEAR before aces()). The canvas tooth
  // is the base relief term so the weave also catches the raking light.
  float canvasBase = tooth * toothAmp * 0.5;
  result = relightImpasto(result, height, canvasBase);

  // Pigment saturation boost
  result = saturate3(result, pigmentSat);

  return result;
}

// AW.W4.3 — the van-Gogh atomic-stroke medium. Composes the oil stroke engine
// (mediumOil) with the W4.1 ETF orientation (forced tensor via the bridge), the
// W4.3 energy grading (gated by uMedium==5 inside bestOil — long confident strokes
// in the lights/coherent zones, short dabs in the darks/flat zones, the Starry-Night
// Kolmogorov/Batchelor cascade), the W5 OKLCh per-stroke pigment jitter (already in
// bestOil's brokenColorJitter), and the W4.2 real impasto relight. No subject matter
// — the "source image" is the generated nuclei field, so strokes trace its iso-bands.
vec3 mediumVangogh(vec3 col, vec2 p, float t) {
  return mediumOil(col, p, t);
}`;
