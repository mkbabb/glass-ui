// Aurora v4.1 — single fragment shader (verbatim port of Claude Design bundle).
// Three layers: composition (multi-nuclei softmax) → medium (flow-aligned texture) → post (tonemap + grain).
//
// Do not edit the GLSL below without a corresponding DESIGN.md update.
// The three non-obvious load-bearing details:
//   1. Palette baked to LINEAR sRGB (color.ts `oklchToLinear`) — shader ACES-tonemaps in linear.
//   2. Cursor rotates `p` inside domainWarp() AND blends flow direction — both channels required.
//   3. `strokeMode == 2` (crayon) routes to mediumOil_crayon which is NOT stroke-based; it's
//      anisotropic tooth noise multiplied into the base color.

export const FRAGMENT_SRC = /* glsl */ `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

#define MAX_NUCLEI 6
#define MAX_STOPS  8

// ── Uniforms ───────────────────────────────────────────────────────────────
uniform float uTime;

// Palette baked CPU-side to linear-sRGB
uniform vec3  uPalette[MAX_STOPS];
uniform int   uStopCount;

// Nuclei (parallel arrays)
uniform int   uNucleiCount;
uniform vec2  uNucleiPos[MAX_NUCLEI];
uniform float uNucleiRadius[MAX_NUCLEI];
uniform float uNucleiPaletteBias[MAX_NUCLEI];
uniform float uNucleiValueBias[MAX_NUCLEI];
uniform float uNucleiDriftRadius[MAX_NUCLEI];
uniform float uNucleiDriftPhase[MAX_NUCLEI];
// Anisotropy: per-nucleus elongation (1.0 = isotropic) and major-axis angle (radians).
// Defaults (1.0 / 0.0) reduce to the original circular Gaussian.
uniform float uNucleiElong[MAX_NUCLEI];
uniform float uNucleiAngle[MAX_NUCLEI];
uniform float uSoftmaxBeta;
uniform float uValueVariance;

// Warp
uniform float uWarpAmount;
uniform float uWarpScale;
uniform float uWarpDrift;
uniform int   uWarpMode;      // 0=fbm 1=cellular 2=hybrid
uniform int   uNoiseOctaves;

// Medium
// 0 smooth, 1 pastel, 2 watercolor, 3 oil
uniform int   uMedium;
uniform int   uFlowPattern;   // 0 none, 1 radial, 2 swirl, 3 diagonal, 4 multi
uniform vec2  uFlowFocal;
uniform float uFlowAngle;
uniform float uFlowCurl;
uniform vec2  uCursor;          // in 0..1 screen space (matches pN)
uniform float uCursorStrength;  // 0..1 attraction amount
uniform float uCursorRadius;    // radius of influence (0.05..0.5)
uniform float uStrokeAmount;
uniform float uStrokeScale;
uniform float uStrokeAnisotropy;
uniform int   uStrokeLayers;  // 1 or 2 (crosshatch)
uniform int   uStrokeMode;    // 0 oil (modern gestural), 1 palette-knife, 2 crayon/oil-pastel, 3 modern-chunky
uniform float uWetEdge;
uniform float uGranulation;
uniform float uImpasto;
uniform float uBrokenColor;
uniform float uCanvasGrain;

// Motion
uniform float uNucleiDrift;
uniform float uPaletteDrift;
uniform float uBreathDepth;
uniform float uBreathPeriod;

// Output
uniform float uSaturation;
uniform float uPaperGrain;
uniform float uAlpha;

// ── Time rate ────────────────────────────────────────────────────────────────
// The authoring coefficients (uNucleiDrift, uPaletteDrift, uWarpDrift) live in a
// human-friendly 0..~0.05 band — that scale is what the config schema and every
// demo preset are tuned against. But that band, multiplied straight into uTime
// (seconds), yields rad/sec rates so small the field reads visually static (one
// nuclei orbit took ~10 min at the old default). These K_* constants decouple
// the AUTHORING scale from the RAD/SEC scale: each time term wraps its coefficient
// in the matching K_, lifting the same authored value to a perceptible period
// without touching any preset. Tuned so the field reads SLOWLY ALIVE — drift over
// a ~5–15s window, never a frantic pan. These are downstream of uTime, which the
// runtime FREEZES under reduced-motion (t = frozenOffset) before the shader sees
// it, so the lift cannot leak motion into the reduced-motion path.
const float K_NUCLEI = 14.0; // nuclei orbit: ~one cycle per ~45s at default 0.01
const float K_PAL    = 24.0; // palette hue breathe: ~one cycle per ~33s at default
const float K_WARP   = 5.0;  // domain warp scroll: a perceptible fbm-cell traverse

// ── Noise ──────────────────────────────────────────────────────────────────
float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

vec2 hash22(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)),
           dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 r = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    if (i >= uNoiseOctaves) break;
    v += a * vnoise(p);
    p = r * p * 2.02;
    a *= 0.5;
  }
  return v;
}

// Cellular / Worley f1
float cellular(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float m = 1e9;
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 g = vec2(float(x), float(y));
      vec2 o = hash22(i + g);
      vec2 r = g + o - f;
      m = min(m, dot(r, r));
    }
  }
  return sqrt(m);
}

// ── Warp ──────────────────────────────────────────────────────────────────
vec2 domainWarp(vec2 p, float t) {
  // Quilez canonical double warp
  vec2 q = vec2(fbm(p * uWarpScale + vec2(0.0, 0.0) + t * uWarpDrift * K_WARP),
                fbm(p * uWarpScale + vec2(5.2, 1.3) + t * uWarpDrift * K_WARP));
  vec2 r = vec2(fbm(p * uWarpScale + 4.0 * q + vec2(1.7, 9.2)),
                fbm(p * uWarpScale + 4.0 * q + vec2(8.3, 2.8)));

  vec2 warp = r;
  if (uWarpMode == 1) {
    // cellular — chunky territories (MEADOW block-like)
    float c1 = cellular(p * uWarpScale * 1.5 + vec2(t * uWarpDrift * K_WARP * 2.0, 0.0));
    float c2 = cellular(p * uWarpScale * 1.5 + vec2(11.0, 7.0 + t * uWarpDrift * K_WARP * 2.0));
    warp = vec2(c1, c2);
  } else if (uWarpMode == 2) {
    // hybrid — fbm + cellular averaged
    float c1 = cellular(p * uWarpScale * 1.2);
    float c2 = cellular(p * uWarpScale * 1.2 + vec2(11.0, 7.0));
    warp = mix(r, vec2(c1, c2), 0.5);
  }
  vec2 warped = p + uWarpAmount * warp;

  // Cursor swirl — rotate p around uCursor with radial falloff.
  // This warps the underlying color field so the bands sweep around the pointer.
  if (uCursorStrength > 0.001) {
    vec2 toP = p - uCursor;
    float d = length(toP);
    float r = max(uCursorRadius, 0.01);
    // Smooth falloff; strong near cursor, zero beyond ~1.5× radius.
    float w = exp(-(d * d) / (r * r * 0.45));
    // Max rotation ~120° at cursor center, scaled by strength
    float ang = w * uCursorStrength * 2.1;
    float ca = cos(ang), sa = sin(ang);
    vec2 rotated = vec2(ca * toP.x - sa * toP.y, sa * toP.x + ca * toP.y) + uCursor;
    // Also pinch slightly toward the cursor (gravity) — adds depth to swirl
    float pinch = w * uCursorStrength * 0.08;
    rotated = mix(rotated, uCursor, pinch);
    // Blend original warped position with cursor-rotated version
    warped = mix(warped, rotated + uWarpAmount * warp * 0.7, w * uCursorStrength);
  }

  return warped;
}

// ── Palette LUT ───────────────────────────────────────────────────────────
vec3 samplePalette(float id) {
  id = clamp(id, 0.0, 1.0);
  float scaled = id * float(uStopCount - 1);
  int i0 = int(floor(scaled));
  int i1 = min(i0 + 1, uStopCount - 1);
  float t = fract(scaled);
  t = smoothstep(0.0, 1.0, t);
  return mix(uPalette[i0], uPalette[i1], t);
}

// ── Nuclei field ──────────────────────────────────────────────────────────
void nucleiField(vec2 p, float t, out float paletteId, out float valueMod) {
  float accumBias  = 0.0;
  float accumValue = 0.0;
  float accumW     = 0.0;
  for (int i = 0; i < MAX_NUCLEI; i++) {
    if (i >= uNucleiCount) break;
    vec2 posI = uNucleiPos[i]
              + uNucleiDriftRadius[i] * vec2(
                  cos(t * uNucleiDrift * K_NUCLEI + uNucleiDriftPhase[i]),
                  sin(t * uNucleiDrift * K_NUCLEI + uNucleiDriftPhase[i] * 1.13)
                );
    vec2 diff = p - posI;
    // Anisotropic Gaussian: rotate diff into the nucleus's local frame
    // (major axis along uNucleiAngle), then scale the major-axis component by
    // 1/elongation so the squared distance describes an ellipse. Defaults
    // 1.0/0.0 reduce to the isotropic dot(diff, diff).
    float ca = cos(uNucleiAngle[i]);
    float sa = sin(uNucleiAngle[i]);
    vec2  local = vec2( ca * diff.x + sa * diff.y,
                       -sa * diff.x + ca * diff.y);
    float along  = local.x / max(uNucleiElong[i], 0.01);
    float across = local.y;
    float d2 = along * along + across * across;
    float r = max(uNucleiRadius[i], 0.01);
    float w = exp(-uSoftmaxBeta * d2 / (r * r));
    accumBias  += w * uNucleiPaletteBias[i];
    accumValue += w * uNucleiValueBias[i];
    accumW     += w;
  }
  paletteId = accumBias  / max(accumW, 1e-4);
  valueMod  = accumValue / max(accumW, 1e-4);

  // Palette drift — slow global paletteId breathe between adjacent stops. The
  // rate rides K_PAL (perceptible ~30–60s hue cycle at the default coefficient);
  // the amplitude lifts the authored coefficient into a 0.03..0.06 paletteId band
  // so the palette visibly travels rather than dithering within one stop.
  float palAmp = clamp(uPaletteDrift * 6.0, 0.0, 0.06);
  paletteId += palAmp * sin(t * uPaletteDrift * K_PAL);
  paletteId = clamp(paletteId, 0.0, 1.0);
}

// ── Flow field ────────────────────────────────────────────────────────────
vec2 flowField(vec2 p, float t) {
  vec2 dir = vec2(1.0, 0.0);
  if (uFlowPattern == 1) {
    // radial
    dir = normalize(p - uFlowFocal + 1e-4);
  } else if (uFlowPattern == 2) {
    // swirl — tangent to radial
    vec2 rad = normalize(p - uFlowFocal + 1e-4);
    dir = vec2(-rad.y, rad.x);
  } else if (uFlowPattern == 3) {
    // diagonal
    float a = radians(uFlowAngle);
    dir = vec2(cos(a), sin(a));
  } else if (uFlowPattern == 4) {
    // multi — curl-noise driven
    float n = fbm(p * 2.0 + t * 0.02);
    float a = n * 6.2831;
    dir = vec2(cos(a), sin(a));
  }
  // curl — perturb by noise. Radial gets much less curl so rays stay clean.
  if (uFlowCurl > 0.0) {
    float n = fbm(p * 3.0) - 0.5;
    float curlAmt = uFlowCurl;
    if (uFlowPattern == 1) curlAmt *= 0.25;  // radial: preserve ray clarity
    if (uFlowPattern == 2) curlAmt *= 0.55;  // swirl: allow moderate curl
    float a = atan(dir.y, dir.x) + n * 3.14159 * curlAmt;
    dir = vec2(cos(a), sin(a));
  }
  // cursor influence — swirl around the cursor position
  if (uCursorStrength > 0.001) {
    vec2 toCur = uCursor - p;
    float d = length(toCur);
    float r = max(uCursorRadius, 0.01);
    float w = exp(-(d * d) / (r * r * 0.5));
    // swirl tangent
    vec2 tangent = vec2(-toCur.y, toCur.x) / max(d, 1e-4);
    float a0 = atan(dir.y, dir.x);
    float a1 = atan(tangent.y, tangent.x);
    // blend angle
    float da = a1 - a0;
    da = atan(sin(da), cos(da)); // wrap to [-pi, pi]
    float a = a0 + da * w * uCursorStrength;
    dir = vec2(cos(a), sin(a));
  }
  return dir;
}

// ── Color utils ───────────────────────────────────────────────────────────
const vec3 W_LUMA = vec3(0.2126, 0.7152, 0.0722);

vec3 hueShift(vec3 c, float degrees) {
  float a = radians(degrees);
  float co = cos(a), si = sin(a);
  mat3 m = mat3(
    0.299 + 0.701 * co + 0.168 * si,
    0.587 - 0.587 * co + 0.330 * si,
    0.114 - 0.114 * co - 0.497 * si,

    0.299 - 0.299 * co - 0.328 * si,
    0.587 + 0.413 * co + 0.035 * si,
    0.114 - 0.114 * co + 0.292 * si,

    0.299 - 0.300 * co + 1.250 * si,
    0.587 - 0.588 * co - 1.050 * si,
    0.114 + 0.886 * co - 0.203 * si
  );
  return m * c;
}

vec3 brokenColorJitter(vec3 c, float hueSeed, float valueSeed, float strength) {
  float amt = clamp(uBrokenColor * strength, 0.0, 1.0);
  if (amt <= 0.001) return c;
  float hueDeg = (hueSeed - 0.5) * 32.0 * amt;
  float valueMul = 1.0 + (valueSeed - 0.5) * 0.28 * amt;
  return max(hueShift(c, hueDeg) * valueMul, vec3(0.0));
}

vec3 saturate3(vec3 c, float amt) {
  float l = dot(c, W_LUMA);
  return mix(vec3(l), c, amt);
}

// ACES approximation
vec3 aces(vec3 x) {
  float a = 2.51;
  float b = 0.03;
  float c = 2.43;
  float d = 0.59;
  float e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

// ── Medium overlays ───────────────────────────────────────────────────────

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

// ── Curved swept brushstroke primitive ────────────────────────────────────
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
    // razor-hard edge with tiny aa
    cov = 1.0 - smoothstep(0.88, 1.02, cn);
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
    capA = 1.0 - smoothstep(rA * 0.85, rA * 1.05, dA);
    capB = 1.0 - smoothstep(rB * 0.85, rB * 1.05, dB);
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

// Composite stroke over col with internal streaking + impasto edge highlight.
//   streakAmp    — 0..0.2 how much internal streaks darken/lighten
//   impastoAmp   — 0..1 edge catch-light strength
//   hardness     — 0..1 how crisp the compositing transition is (1 = razor, 0 = creamy)
void paintOver(inout vec3 col, StrokeHit s, float streakFreq, float streakAmp,
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

  // Impasto edge highlight — bright rim on one side of the stroke
  float rim = smoothstep(0.85, 1.0, 1.0 - s.edgeN) * step(0.0, s.crossN);
  c += impastoAmp * rim * vec3(0.18, 0.15, 0.11);
  // Shadow on the other side (darker, cooler)
  float shadow = smoothstep(0.85, 1.0, 1.0 - s.edgeN) * step(0.0, -s.crossN);
  c -= impastoAmp * shadow * 0.25 * vec3(0.10, 0.09, 0.07);

  float softLimit = mix(0.35, 0.98, hardness);
  float alpha = smoothstep(0.0, 1.0 - softLimit, s.coverage) * strokeOpacity;
  col = mix(col, c, alpha);
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

      // Per-stroke direction: consume the layer-provided flow, then add only
      // deterministic local perturbation so alternate stroke layers stay live.
      vec2 f = safeDir(flow);
      float angJ = (hash21(cc + seed + 11.0) - 0.5) * 0.9;  // +/- 0.45 rad
      float localCurl = (fbm(center * (2.6 + seed * 0.11) + seed * 1.9) - 0.5) * 0.55 * uFlowCurl;
      vec2 dir = rotateDir(f, angJ + localCurl);

      float lenV = cellSize * lenMul * (0.65 + 0.55 * hash21(cc + seed + 23.0));
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

// ── Crayon / oil-pastel — paper tooth × wax pigment ───────────────────────
// Crayon is not strokes. It's pigment crumbs dragged across paper tooth.
// Model: heavy 2D tooth noise at multiple scales, anisotropically stretched
// along flow direction, multiplied into the base color. Add a slow "waxy
// film" that slightly unifies hues, and occasional darker "pressed" spots
// where the crayon dug in. NO straight segments.
vec3 mediumOil_crayon(vec3 col, vec2 p, float t) {
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
  // Mode knobs (uStrokeMode):
  //   0 oil         — balanced modern-abstract/palette-knife hybrid
  //   1 knife       — palette-knife impasto: razor edges, heavy bristle/shadow
  //   2 crayon      — soft-edged wax smudges on tooth (no straight segments)
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
  } else if (mode == 2) { // crayon — handled specially below
    return mediumOil_crayon(col, p, t);
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
}

// ── Main ──────────────────────────────────────────────────────────────────
void main() {
  // Normalized 0..1 coordinates for nuclei, domain warp, and medium sampling.
  vec2 uv = vUv;
  vec2 pN = uv;

  float t = uTime;

  // Warp in pN space
  vec2 p_warp = domainWarp(pN, t);

  // Composition
  float paletteId; float valueMod;
  nucleiField(p_warp, t, paletteId, valueMod);
  vec3 col = samplePalette(paletteId);
  col *= 1.0 + uValueVariance * valueMod;

  // Breath — slow global luminance wobble
  float breath = sin(t * 6.2831 / max(uBreathPeriod, 1.0));
  col *= 1.0 + uBreathDepth * breath * 0.5;

  // Medium
  if (uMedium == 1) col = mediumPastel(col, pN, t);
  else if (uMedium == 2) col = mediumWatercolor(col, pN, t);
  else if (uMedium == 3) col = mediumOil(col, pN, t);

  // Saturation trim
  col = saturate3(col, uSaturation);

  // Tonemap + film grain
  col = aces(col);
  float grain = hash21(gl_FragCoord.xy + t * 17.0);
  col += (grain - 0.5) * uPaperGrain;

  col = clamp(col * 0.985 + 0.008, 0.0, 1.0);
  fragColor = vec4(col * uAlpha, uAlpha);
}
`;
