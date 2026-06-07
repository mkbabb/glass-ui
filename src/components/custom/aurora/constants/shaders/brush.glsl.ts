// Aurora brush primitive — the curved swept-brushstroke SDF + compositing.
//
// `curvedStroke` inverts an approximate projection onto a quadratic-bulge spine to
// derive coverage; `paintOver` composites a stroke over the base with internal
// streaking + impasto edge highlight; `bestOil` does the best-of-9-neighbor cell
// placement. The struct + dir helpers + shape profile support them. Consumed by the
// oil medium. Spliced verbatim into FRAGMENT_SRC by aurora.frag.ts.
export const AURORA_BRUSH_GLSL = /* glsl */ `// ── Curved swept brushstroke primitive ────────────────────────────────────
// A stroke is a curved spine from A to B with quadratic bulge K (sideways offset
// at midpoint). Width varies along length via a shape profile. Edge is ragged
// (bristle-modulated), ends are rounded blobs, inside has streak modulation.
//
// For pixel p, we invert an approximate projection onto the curved spine:
//   1) project p onto straight AB axis -> along0, cross0
//   2) at parameter along0, spine offset = 4·K·along0·(1-along0) perpendicular
//   3) cross = cross0 - spineOffset, refine along one iteration
// Coverage blends paint atop col based on per-stroke color sampled from the
// underlying base at spine midpoint — so overlapping strokes from different
// palette regions meet at hard, ragged demarcations.

struct StrokeHit {
  float coverage;  // 0..1
  vec3  color;
  float alongT;    // 0..1 along spine, for internal modulation
  float crossN;    // cross distance / current half-width, signed
  float edgeN;     // distance to edge in half-widths (0 = at edge, 1 = at spine)
};

StrokeHit noHit() { return StrokeHit(0.0, vec3(0.0), 0.0, 0.0, 0.0); }

vec2 rotateDir(vec2 dir, float angle) {
  float ca = cos(angle), sa = sin(angle);
  return vec2(dir.x * ca - dir.y * sa, dir.x * sa + dir.y * ca);
}

vec2 safeDir(vec2 dir) {
  float len = length(dir);
  return len > 1e-4 ? dir / len : vec2(1.0, 0.0);
}

// Shape profile along the stroke. type:
//   0 tapered    — thin-fat-thin (classic brush)
//   1 load-drag  — fat start, tapers to a point
//   2 dab        — ellipse-like, round center
//   3 even       — near-constant, slight end taper
float strokeShape(float t, int type) {
  t = clamp(t, 0.0, 1.0);
  if (type == 1) {
    // loaded at t=0, tapering
    return pow(1.0 - t, 0.55) * smoothstep(0.0, 0.08, t);
  } else if (type == 2) {
    // dab / blob
    float d = t - 0.5;
    return exp(-d * d * 12.0);
  } else if (type == 3) {
    // mostly even, slight end softening
    return smoothstep(0.0, 0.08, t) * smoothstep(1.0, 0.92, t) * 0.95 + 0.05;
  }
  // 0 tapered
  return smoothstep(0.0, 0.22, t) * smoothstep(1.0, 0.78, t);
}

// A single curved stroke.
//   a, b           — endpoints
//   halfW          — base half-width (world units)
//   bulge          — signed perpendicular midpoint offset, in world units
//   shapeType      — 0..3
//   bristleFreq    — spatial frequency of edge raggedness
//   bristleAmp     — 0..0.5 fraction of halfW chewed away at edge extrema
//   streakSeed     — uniqueness seed for internal streaks
//   colAtMid       — pre-sampled color at midpoint
StrokeHit curvedStroke(vec2 p, vec2 a, vec2 b, float halfW,
                       float bulge, int shapeType,
                       float bristleFreq, float bristleAmp,
                       float streakSeed, vec3 colAtMid) {
  vec2 ab = b - a;
  float L = length(ab);
  if (L < 1e-5) return noHit();
  vec2 tang = ab / L;
  vec2 norm = vec2(-tang.y, tang.x);

  vec2 rel = p - a;
  float along0 = dot(rel, tang) / L;      // straight projection 0..1 along AB
  float cross0 = dot(rel, norm);          // signed cross

  // Spine sideways offset due to bulge (parabolic)
  float bend = 4.0 * bulge * along0 * (1.0 - along0);
  float cross1 = cross0 - bend;

  // One refinement step: as the spine bends, the closest-point along shifts.
  // Spine tangent differs from straight tangent; first-order correction:
  float dBend = 4.0 * bulge * (1.0 - 2.0 * along0);  // d(bend)/d(along)
  float along1 = along0 + (cross1 * dBend) / (L * (1.0 + dBend * dBend / (L * L)));

  // Bristle-ragged edge: half-width gets chewed by 1D noise along the spine
  float edgeNoise = fbm(vec2(along1 * bristleFreq, streakSeed * 7.3)) - 0.5;
  float edgeNoise2 = fbm(vec2(along1 * bristleFreq * 2.3, streakSeed * 3.1 + 17.0)) - 0.5;
  float edgeMod = 1.0 - bristleAmp * (0.6 + 0.4 * edgeNoise) * (0.5 + edgeNoise2);

  // Width profile along the stroke
  float shape = strokeShape(along1, shapeType);
  float halfWNow = halfW * shape * edgeMod;

  // Inside-segment coverage
  float cov = 0.0;
  if (along1 >= 0.0 && along1 <= 1.0 && halfWNow > 1e-6) {
    float cn = abs(cross1) / halfWNow;
    // fwidth-derived AA: half-width from the field's screen-space gradient so the
    // edge holds ~1px regardless of zoom/DPR (mirrors metaball.frag.ts:252-255).
    float aaC = max(fwidth(cn), 1e-6);
    cov = 1.0 - smoothstep(1.0 - aaC, 1.0 + aaC, cn);
  }

  // End-cap blobs (rounded tips, not perpendicular cuts)
  float capA = 0.0, capB = 0.0;
  {
    vec2 capCenterA = a + norm * (bulge * 0.0); // at a
    vec2 capCenterB = a + tang * L + norm * bend * 0.0 + norm * 0.0; // at b; bend is 0 at endpoints
    capCenterB = b;
    float endShapeA = strokeShape(0.02, shapeType);
    float endShapeB = strokeShape(0.98, shapeType);
    float rA = halfW * endShapeA * (0.9 + 0.2 * fbm(vec2(streakSeed * 13.0)));
    float rB = halfW * endShapeB * (0.9 + 0.2 * fbm(vec2(streakSeed * 19.0 + 5.0)));
    float dA = length(p - capCenterA);
    float dB = length(p - capCenterB);
    // fwidth-derived AA on the clean Euclidean cap distances (mirrors metaball.frag.ts:252-255).
    float aaA = max(fwidth(dA), 1e-6);
    float aaB = max(fwidth(dB), 1e-6);
    capA = 1.0 - smoothstep(rA - aaA, rA + aaA, dA);
    capB = 1.0 - smoothstep(rB - aaB, rB + aaB, dB);
    // Only apply caps if we're BEYOND the segment; otherwise the segment wins.
    capA *= (along1 < 0.05) ? 1.0 : 0.0;
    capB *= (along1 > 0.95) ? 1.0 : 0.0;
  }

  float coverage = max(cov, max(capA, capB));
  if (coverage < 0.002) return noHit();

  // Edge distance (for impasto later): 0 at edge, 1 at spine
  float edgeDist = halfWNow > 1e-6 ? clamp(1.0 - abs(cross1) / halfWNow, 0.0, 1.0) : 0.0;

  return StrokeHit(
    coverage,
    colAtMid,
    clamp(along1, 0.0, 1.0),
    halfWNow > 1e-6 ? cross1 / halfWNow : 0.0,
    edgeDist
  );
}

// Composite stroke over col with internal streaking + ACCUMULATE paint HEIGHT.
//   streakAmp    — 0..0.2 how much internal streaks darken/lighten
//   impastoAmp   — 0..1 paint-thickness contribution (the height the relight reads)
//   hardness     — 0..1 how crisp the compositing transition is (1 = razor, 0 = creamy)
//
// AW.W4.2 — the fixed-RGB edge rim (the phantom upper-left light) is RETIRED. Each
// stroke now deposits PAINT HEIGHT into the height accumulator (coverage x per-stroke
// thickness, perturbed by the bristle/streak fbm for ridges/grooves); mediumOil
// derives a normal from the accumulated height gradient (dFdx/dFdy) and relights it
// once with the movable uLightDir source (relightImpasto), in linear before aces().
void paintOver(inout vec3 col, inout float height, StrokeHit s,
               float streakFreq, float streakAmp,
               float impastoAmp, float hardness, float streakSeed) {
  if (s.coverage < 0.002) return;
  float strokeOpacity = clamp(uStrokeAmount, 0.0, 1.0);
  if (strokeOpacity <= 0.001) return;
  vec3 c = s.color;

  // Internal streaks — fbm along spine, modulated by cross position. Gives
  // the loaded-brush look: some bristles carry more pigment than others.
  float streakA = fbm(vec2(s.alongT * streakFreq, s.crossN * 2.7 + streakSeed));
  float streakB = fbm(vec2(s.alongT * streakFreq * 0.6 + streakSeed * 3.7, s.crossN * 4.1));
  float streak = 0.6 * (streakA - 0.5) + 0.4 * (streakB - 0.5);
  c *= 1.0 + streak * streakAmp * 2.0;

  // Subtle value variance across width (hollow-center catch-light)
  float crossShade = smoothstep(0.0, 0.4, s.edgeN) * (1.0 - smoothstep(0.65, 1.0, s.edgeN));
  c *= 1.0 + crossShade * 0.05;

  float softLimit = mix(0.35, 0.98, hardness);
  float alpha = smoothstep(0.0, 1.0 - softLimit, s.coverage) * strokeOpacity;
  col = mix(col, c, alpha);

  // ── Accumulate paint HEIGHT (AW.W4.2). Thickness peaks at the stroke spine and
  // falls to zero at the edge (edgeN: 0=edge, 1=spine), perturbed by the bristle
  // streak so ridges/grooves form. The relight reads the gradient of this field.
  float ridge = 0.7 + 0.3 * (streak + 0.5);
  height += s.coverage * impastoAmp * (0.4 + 0.6 * s.edgeN) * ridge * alpha;
}

// AW.W4.2 — relight the accumulated paint height. Derive a normal from the height
// gradient (dFdx/dFdy — derivatives are in-pattern; fwidth is already used for AA),
// then apply diffuse + Blinn specular from the movable uLightDir/uLightColor source.
// LINEAR-space lighting BEFORE aces() (the tonemap/OETF stay locked); thin strokes
// inherit a low shininess, thick impasto raises it (high-height ridges catch a sharp
// glint). canvasBase is the tooth height so the canvas weave also catches the light.
vec3 relightImpasto(vec3 col, float height, float canvasBase) {
  float h = height + canvasBase;
  // Height-gradient normal. heightScale trades relief depth for surface flatness.
  float heightScale = 6.0;
  vec3 N = normalize(vec3(-dFdx(h) * 40.0, -dFdy(h) * 40.0, 1.0 / heightScale));
  vec3 L = normalize(uLightDir);
  vec3 V = vec3(0.0, 0.0, 1.0);            // view straight on
  vec3 H = normalize(L + V);
  float diff = max(dot(N, L), 0.0);
  // Thick impasto → high shininess (sharp glint); thin paint → broad soft sheen.
  float shininess = mix(8.0, 64.0, clamp(height * 2.0, 0.0, 1.0));
  float spec = pow(max(dot(N, H), 0.0), shininess);
  // Modulate the lit terms by how much paint sits here (no relief on bare ground).
  float relief = clamp(h * 1.5, 0.0, 1.0);
  vec3 lit = col * (1.0 + uImpasto * relief * (diff - 0.5) * 0.5 * uLightColor);
  lit += uImpasto * relief * spec * 0.6 * uLightColor;
  return lit;
}

// Best-of-9-neighbor placement: sample 3x3 surrounding cells and take the
// stroke that covers this pixel most. Breaks the grid by per-cell jitter and
// sparse density via noise thresholding.
StrokeHit bestOil(vec2 p, float cellSize, float lenMul, float halfWMul,
                  float jitterAmt, float density, int shapeType,
                  float bristleAmp, vec2 flow, float t, float seed) {
  vec2 cell = floor(p / cellSize);

  StrokeHit best = noHit();
  // 3x3 neighborhood
  for (int dy = -1; dy <= 1; dy++) {
    for (int dx = -1; dx <= 1; dx++) {
      vec2 cc = cell + vec2(float(dx), float(dy));
      vec2 hh = hash22(cc + seed) - 0.5;
      // Density gate — noise threshold; sparse placement.
      float gate = hash21(cc * 1.7 + seed * 0.3);
      if (gate > density) continue;

      vec2 center = (cc + 0.5 + hh * jitterAmt) * cellSize;

      // Per-stroke direction source — the AW.W4.1 strokeOrient switch:
      //   uStrokeOrient==0 (flow)   — the layer-provided hand-authored flowField.
      //   uStrokeOrient==1 (tensor) — the structure-tensor minor eigenvector at the
      //                               cell center (the color field's edge-tangent),
      //                               so strokes hug the color zones (van Gogh).
      // coh carries the per-cell coherence A for the W4.3 energy grading (long
      // confident strokes where structure is coherent, stubby dabs in flat zones).
      vec2 f;
      float coh = 1.0;
      if (uStrokeOrient == 1) {
        vec3 tf = structureTensorField(center, t, safeDir(flow));
        f = safeDir(tf.xy);
        coh = tf.z;
      } else {
        f = safeDir(flow);
      }
      // Per-stroke deterministic local perturbation so alternate stroke layers stay
      // live. Tensor strokes get LESS angular jitter (the field already orients them).
      float jScale = (uStrokeOrient == 1) ? 0.4 : 1.0;
      float angJ = (hash21(cc + seed + 11.0) - 0.5) * 0.9 * jScale;  // +/- 0.45/0.18 rad
      float localCurl = (fbm(center * (2.6 + seed * 0.11) + seed * 1.9) - 0.5) * 0.55 * uFlowCurl;
      vec2 dir = rotateDir(f, angJ + localCurl);

      // AW.W4.3 — energy-graded length/density for the van-Gogh cascade: in vangogh
      // mode (uMedium==5) modulate the stroke length by local luminance (bright →
      // long confident strokes, dark → short dabs, the Starry-Night Kolmogorov/
      // Batchelor congruence) AND by coherence (coherent zones → long, flat → stubby).
      float energy = 1.0;
      if (uMedium == 5) {
        float luma = clamp(dot(sampleBase(center, t), W_LUMA), 0.0, 1.0);
        // long in the lights + coherent zones; short dabs in the darks + flat zones.
        energy = mix(0.5, 1.5, luma) * mix(0.6, 1.0, coh);
      }

      float lenV = cellSize * lenMul * (0.65 + 0.55 * hash21(cc + seed + 23.0)) * energy;
      float halfW = cellSize * halfWMul * (0.70 + 0.55 * hash21(cc + seed + 41.0));
      float bulge = (hash21(cc + seed + 53.0) - 0.5) * lenV * 0.35;

      vec2 a = center - dir * (lenV * 0.5);
      vec2 b = center + dir * (lenV * 0.5);

      vec3 colMid = brokenColorJitter(
        sampleBase(center, t),
        hash21(cc + seed + 89.0),
        hash21(cc * 2.3 + seed + 97.0),
        1.0
      );

      StrokeHit h = curvedStroke(p, a, b, halfW, bulge, shapeType,
                                 7.0, bristleAmp,
                                 hash21(cc + seed + 67.0), colMid);
      if (h.coverage > best.coverage) best = h;
    }
  }
  return best;
}
`;
