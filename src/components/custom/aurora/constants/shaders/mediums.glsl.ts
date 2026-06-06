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
vec3 mediumCrayon(vec3 col, vec2 p, float t) {
  vec2 flow = flowField(p, t);
  float ang = atan(flow.y, flow.x);
  float ca = cos(-ang), sa = sin(-ang);
  vec2 pr = vec2(p.x * ca - p.y * sa, p.x * sa + p.y * ca);

  // Anisotropic tooth — squished along flow, coarse cross flow.
  float aniso = mix(0.45, 0.95, uStrokeAnisotropy);
  float scale = max(uStrokeScale * 1.6, 180.0);

  float t1 = vnoise(vec2(pr.x * scale * aniso, pr.y * scale));
  float t2 = vnoise(vec2(pr.x * scale * aniso * 0.4, pr.y * scale * 0.4) + 11.0);
  float t3 = vnoise(vec2(pr.x * scale * aniso * 2.1, pr.y * scale * 2.1) + 23.0);
  float tooth = 0.55 * t1 + 0.30 * t2 + 0.15 * t3;
  // Center at 0, amplify
  tooth = (tooth - 0.5) * 1.4;

  // Multiplicative darkening where tooth is low (pigment skipped paper valleys)
  float lay = 1.0 + tooth * 0.32 * uStrokeAmount;
  vec3 result = col * lay;

  // Occasional pressed-in crumbs — rare darker crumbs
  float crumbs = smoothstep(0.78, 0.95, vnoise(pr * scale * 3.0));
  result *= 1.0 - crumbs * 0.18 * uStrokeAmount;

  // Waxy highlight film — slight lightening on tooth peaks
  float waxy = smoothstep(0.55, 0.85, t1);
  result += waxy * 0.04 * vec3(1.0);

  // Paper tooth overlay (subtler than oil's canvas)
  float paperTooth = vnoise(p * 340.0) - 0.5;
  result *= 1.0 + paperTooth * 0.14 * uCanvasGrain;

  // Broken-color pigment: stable wax/pigment patches, not temporal flicker.
  vec2 pigmentCell = floor(pr * max(scale * 0.18, 32.0));
  float pigmentMask = smoothstep(0.28, 0.82, vnoise(pr * scale * 0.21 + 19.0));
  result = brokenColorJitter(
    result,
    hash21(pigmentCell + 17.0),
    hash21(pigmentCell * 2.1 + 31.0),
    0.45 + 0.55 * pigmentMask
  );

  // Crayon is saturation-amplified
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

  // Layer 1 — big gestural strokes (sparse, shaping)
  StrokeHit hBig = bestOil(p, sBig, lenMulBig, widMulBig, jitterAmt * 0.55,
                           densityBig, shapeType, bristleAmp, flow, t, 1.3);
  paintOver(result, hBig, streakFreq * 0.7, streakAmp,
            uImpasto * impastoAmp * uStrokeAmount, hardness, 1.3);

  // Layer 2 — medium body strokes
  StrokeHit hMed = bestOil(p + vec2(11.3, 3.7), sMed, lenMulMed, widMulMed,
                           jitterAmt, densityMed, shapeType, bristleAmp, flow, t, 2.7);
  paintOver(result, hMed, streakFreq, streakAmp,
            uImpasto * impastoAmp * uStrokeAmount, hardness, 2.7);

  // Layer 3 — small dabs (more frequent, smaller)
  int smlShape = (mode == 1) ? 2 : shapeType; // knife uses dabs for sparkle
  StrokeHit hSml = bestOil(p + vec2(-5.1, 8.4), sSml, lenMulSml, widMulSml,
                           jitterAmt * 1.3, densitySml, smlShape,
                           bristleAmp * 0.85, flow, t, 4.1);
  paintOver(result, hSml, streakFreq * 1.4, streakAmp * 0.8,
            uImpasto * impastoAmp * 0.65 * uStrokeAmount, hardness, 4.1);

  // Layer 4 — fill dabs (very dense, very small) — covers bald spots
  float sFill = baseScale * 0.22;
  float lenMulFill = mix(1.4, 2.0, uStrokeAnisotropy);
  float widMulFill = mix(0.50, 0.38, uStrokeAnisotropy);
  int fillShape = (mode == 1) ? 3 : 2; // knife=even, others=dab (round fills)
  StrokeHit hFill = bestOil(p + vec2(3.9, -6.2), sFill, lenMulFill, widMulFill,
                            jitterAmt * 1.5, 0.95, fillShape,
                            bristleAmp * 0.6, flow, t, 8.9);
  paintOver(result, hFill, streakFreq * 1.8, streakAmp * 0.6,
            uImpasto * impastoAmp * 0.4 * uStrokeAmount, hardness * 0.9, 8.9);

  // Optional crosshatch layer
  if (uStrokeLayers == 2) {
    vec2 flow2 = vec2(-flow.y, flow.x);
    StrokeHit hX = bestOil(p + vec2(7.3, -2.1), sMed, lenMulMed * 0.9, widMulMed,
                           jitterAmt, densityMed * 0.7, shapeType, bristleAmp, flow2, t, 6.5);
    paintOver(result, hX, streakFreq, streakAmp * 0.85,
              uImpasto * impastoAmp * 0.55 * uStrokeAmount, hardness, 6.5);
  }

  // Canvas tooth — linen weave
  float tooth1 = vnoise(p * toothScale);
  float tooth2 = vnoise(p * toothScale * vec2(0.6, 2.4) + 37.0);
  float tooth  = (0.6 * tooth1 + 0.4 * tooth2) - 0.5;
  result *= 1.0 + tooth * toothAmp * uCanvasGrain;

  // Pigment saturation boost
  result = saturate3(result, pigmentSat);

  return result;
}`;
