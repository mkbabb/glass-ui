// BG.W-GLASS-REFRACT-WEBGL — the C-SAFARI Tier-1 WebGL2 refraction FLOOR (primary).
//
// The universal Safari floor for the liquid-glass refraction register. The Tier-0
// CSS-SVG `#glass-refract` `feDisplacementMap` filter (glass-refract.css) is DEAD on
// Safari/WebKit + Firefox 2026 (a `backdrop-filter: url()` displacement never
// rasterizes there), so the refraction that a Chromium consumer gets from the SVG
// garnish silently COLLAPSES to a flat blur on the other half of the web. This
// WebGL2 fragment pass is the floor that renders the SAME depth-refraction +
// edge-chromatic register on EVERY engine that ships WebGL2 (i.e. all of them) — it
// is the primary of the SOTA degrade ladder (Tier-0 CSS box-shadow → Tier-1 WebGL2
// here → Tier-2 WGSL `glassShader.wgsl` where `navigator.gpu` is present).
//
// The operator is transcribed SHAPE-aligned from the Tier-2 WGSL source-of-truth
// (docs/tranches/BG/audit/glassShader-tier2.wgsl:100-102) so the two stacks read the
// SAME material off ONE pinned scalar:
//
//   • REFRACTION = DEPTH, never hue. The backdrop BENDS + concentrates at the rim
//     via the edge-concentrated 4th-order squircle bevel profile
//     f(x)=⁴√(1-(1-x)⁴) (Snell n=1.5, a thin-interior lens — NOT a uniform radial),
//     driven by `uRefractionStrength`. The displacement is a pure UV offset; it
//     carries NO colour split. A re-roll onto a per-channel `(1.0 ± u)` UV-fraction
//     is FORBIDDEN (that fakes refraction as hue — the fence catches it).
//
//   • HUE = an ABSOLUTE rim offset, `ca = inward · rim · uChromatic · CHROMATIC_SCALE`.
//     The R/B split rides the canonical edge-band `rim` mask (the GLSL source-of-
//     truth `rim = 1.0 - smoothstep(0.0, 0.16, edge)`, `edge` = distance to the
//     nearest panel edge) — NOT the Tier-2 `edge = prof` squircle weight — so the
//     chromatic dispersion is a whisker at the very rim and vanishes across the
//     interior. `uChromatic` is the fence operator (threaded by the degrade-floor
//     scalar `--glass-chromatic-strength`, `initial-value: 0` — no fringe by
//     default). The magnitude rides ONE pinned `CHROMATIC_SCALE = 0.0045` named
//     const shared across BOTH stacks (killing the 0.003/0.004/0.0045 drift-at-root).
//
//   • THE FULL SHIP PASS. Past the spike's `lensed = mix(lensed, soft, 0.35)` cut:
//     the drapery term folds a 2nd `curlFBM` sheen (the SHARED flow.glsl chunk — a
//     genuine curl consumer) gated by `uMetalStrength`, and the K12 ridge-local
//     plate VALVE `smoothstep(uValveKnee, 1.0, structLuma)` firms the plate alpha
//     toward `uPlateAlphaMax` only where the backdrop is BRIGHT (the AA-over-bright-
//     ridge legibility fold — the dim valley stays translucent so the metal reads).
//
//   • ONE sampler read. Every backdrop tap goes through the single `sampleBG`
//     wrapper (`textureLod` explicit-LOD, the Tier-2 discipline transposed) — the
//     ≥2-sites / 1-wrapper / 0-implicit shape the M6 WGSL gate mirrors.
//
// The backdrop texture (`uBackdrop`) is bound by the keystone FBO two-pass
// (BG.W-GLASS-BACKDROP-SAMPLE) — this module is the fragment SOURCE + the JS↔GLSL
// uniform contract; it owns no context. Machine-locked by proof:glass (the
// refract-webgl arm — operator-is-uChromatic / ONE CHROMATIC_SCALE / the canonical
// rim form / refraction-is-depth / the one-wrapper ≥2-sites shape + a self-test bite).

import { CURL_FBM_GLSL } from "./flow.glsl";

/**
 * The pinned chromatic-dispersion scale — ONE source-of-truth across BOTH refraction
 * stacks (this GLSL floor + the WGSL `glassShader.wgsl` twin). An ABSOLUTE rim-offset
 * multiplier: `|ca| = inward · rim · uChromatic · CHROMATIC_SCALE`. Pinned here so a
 * cross-stack drift (the 0.003/0.004/0.0045 three-way split the Tier-2 literal `0.004`
 * carried) is impossible — the shipped WGSL twin replaces its literal with this value.
 */
export const CHROMATIC_SCALE = 0.0045;

/** The uniform-name contract — the ONE spelling map the JS binder + the fence read. */
export const GLASS_REFRACT_UNIFORMS = {
    resolution: "uResolution",
    time: "uTime",
    panelCount: "uPanelCount",
    bounds: "uBounds",
    lightPos: "uLightPos",
    blurRadius: "uBlurRadius",
    refractionStrength: "uRefractionStrength",
    /** the fence operator — refraction=depth, hue=this absolute rim offset. */
    chromatic: "uChromatic",
    metalStrength: "uMetalStrength",
    valveKnee: "uValveKnee",
    plateAlphaMax: "uPlateAlphaMax",
    backdrop: "uBackdrop",
} as const;

/** The maximum panel count the fragment loop unrolls (mirrors Tier-2 `MAX_PANELS`). */
export const GLASS_REFRACT_MAX_PANELS = 8;

/** The full-screen-triangle vertex pass (the substrate's standard fullscreen pass). */
export const GLASS_REFRACT_VERT_GLSL = /* glsl */ `#version 300 es
precision highp float;
in vec2 aPosition;
out vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;   // [-1,1]² clip → [0,1]² UV
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

/**
 * The Tier-1 WebGL2 refraction fragment source. Renders the FULL ship pass: squircle
 * depth-refraction → 3×3 blur → absolute-rim chromatic split → curl drapery sheen →
 * ridge-local plate-alpha valve → directional specular + Fresnel rim. Splices the
 * SHARED `CURL_FBM_GLSL` chunk (the drapery term); `potentialFBM` is defined below
 * the uniforms per the splice-order law (the host owns the noise basis).
 */
export const GLASS_REFRACT_FRAG_GLSL = /* glsl */ `#version 300 es
precision highp float;

#define MAX_PANELS ${GLASS_REFRACT_MAX_PANELS}

in vec2 vUv;
out vec4 fragColor;

uniform vec2  uResolution;
uniform float uTime;
uniform int   uPanelCount;
uniform vec4  uBounds[MAX_PANELS];   // per-panel rect: xy = origin (UV), zw = size (UV)
uniform vec2  uLightPos;             // key-light position (UV)
uniform float uBlurRadius;           // blur kernel px scale
uniform float uRefractionStrength;   // the DEPTH knob (squircle displacement)
uniform float uChromatic;            // the fence operator — the absolute rim hue split
uniform float uMetalStrength;        // the drapery/metal sheen composite
uniform float uValveKnee;            // the K12 plate valve knee (structLuma threshold)
uniform float uPlateAlphaMax;        // the alpha the valve firms to over a bright ridge
uniform sampler2D uBackdrop;         // the field render (bound by the keystone FBO pass)

// The pinned cross-stack chromatic scale (ONE source-of-truth; see CHROMATIC_SCALE).
const float CHROMATIC_SCALE = ${CHROMATIC_SCALE};

// ── the ONE backdrop-read wrapper (explicit LOD; the Tier-2 sampleBG discipline) ──
vec3 sampleBG(vec2 uv) {
  return textureLod(uBackdrop, clamp(uv, 0.0, 1.0), 0.0).rgb;
}

// 4th-order squircle bevel profile: f(x)=⁴√(1-(1-x)⁴). 0 at centre, 1 at rim, the
// edge-concentrated slope (Snell n=1.5 thin-interior lens, NOT a uniform radial).
float squircleProfile(float x) {
  float t = 1.0 - clamp(x, 0.0, 1.0);
  float t4 = t * t * t * t;
  return sqrt(sqrt(max(0.0, 1.0 - t4)));
}

float fresnel(float cosTheta, float ior) {
  float r0 = pow((1.0 - ior) / (1.0 + ior), 2.0);
  return r0 + (1.0 - r0) * pow(1.0 - cosTheta, 5.0);
}

float luma(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }

// scalar fbm potential — the host's noise basis, wrapped so curlFBM stays basis-
// agnostic (the flow.glsl splice-order law). A cheap value-noise fbm for the sheen.
float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 w = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash21(i), hash21(i + vec2(1.0, 0.0)), w.x),
             mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), w.x), w.y);
}
float potentialFBM(vec2 p) {
  float v = 0.0, a = 0.5;
  vec2 q = p;
  for (int i = 0; i < 3; i++) { v += a * vnoise(q); q = q * 2.02 + vec2(1.7, 9.2); a *= 0.5; }
  return v;
}

${CURL_FBM_GLSL}

// The glass material over one panel rect. Every sample flows through sampleBG.
vec4 glassSample(vec2 uv, vec4 b) {
  vec2 gmin = b.xy;
  vec2 size = b.zw;
  vec2 local = (uv - gmin) / size;      // 0..1 within panel
  vec2 centered = local - vec2(0.5);    // -0.5..0.5

  // REFRACTION = DEPTH: rim-concentrated squircle displacement (a pure UV offset).
  float r = clamp(length(centered) * 2.0, 0.0, 1.0);
  float prof = squircleProfile(r);
  vec2 dir = normalize(centered + vec2(1e-5));
  vec2 disp = dir * prof * (uRefractionStrength * 0.04 / 1.5);   // n=1.5
  vec2 refrUv = uv + disp;

  // the canonical edge-band rim mask (GLSL source-of-truth) — hue rides the RIM only.
  vec2 toEdge = vec2(0.5) - abs(centered);       // 0 at the panel edge, 0.5 at centre
  float edge = min(toEdge.x, toEdge.y);
  float rim = 1.0 - smoothstep(0.0, 0.16, edge); // 1 at the rim band, 0 by 16% inward

  vec2 px = 1.0 / uResolution;

  // 3×3 blur around the displaced UV (the demoted-blur read carrier) — explicit LOD.
  vec3 col = vec3(0.0);
  float wsum = 0.0;
  for (int x = -1; x <= 1; x++) {
    for (int y = -1; y <= 1; y++) {
      vec2 o = vec2(float(x), float(y)) * px * max(uBlurRadius, 0.5);
      float wgt = 1.0 - 0.25 * float(abs(x) + abs(y));
      col += sampleBG(refrUv + o) * wgt;
      wsum += wgt;
    }
  }
  col /= wsum;

  // HUE = ABSOLUTE rim offset: split R/B by ca = inward · rim · uChromatic · CHROMATIC_SCALE.
  vec2 inward = dir;
  vec2 ca = inward * rim * uChromatic * CHROMATIC_SCALE;
  float cr = sampleBG(refrUv + ca).r;
  float cb = sampleBG(refrUv - ca).b;
  col.r = mix(col.r, cr, rim * 0.6);
  col.b = mix(col.b, cb, rim * 0.6);

  // FULL PASS — the curl-drapery metal sheen (2nd curlFBM), gated by uMetalStrength.
  vec2 flow = curlFBM(local * 3.0 + uTime * 0.05);
  float sheen = potentialFBM(local * 5.0 + flow * 1.5 + uTime * 0.08);
  col += vec3(smoothstep(0.55, 0.95, sheen) * uMetalStrength * 0.12);

  // directional specular + Fresnel rim.
  vec3 n = normalize(vec3(centered * 0.6, 1.0));
  float spec = fresnel(max(n.z, 0.0), 1.5);
  vec2 ldir = normalize(uLightPos - uv);
  float ldot = max(dot(centered, ldir), 0.0);
  col += vec3(spec * (0.3 + 0.7 * ldot) * 0.15);

  // K12 ridge-local plate VALVE: firm the alpha toward uPlateAlphaMax over a BRIGHT
  // ridge (AA legibility); the dim valley stays translucent so the metal reads.
  float structLuma = luma(col);
  float valve = smoothstep(uValveKnee, 1.0, structLuma);
  float plateA = mix(0.9, uPlateAlphaMax, valve);

  return vec4(col, plateA);
}

void main() {
  vec2 uv = vUv;
  vec3 color = sampleBG(uv);   // BASE: the field passes through unchanged.
  float alpha = 1.0;

  for (int i = 0; i < MAX_PANELS; i++) {
    if (i >= uPanelCount) break;
    vec4 b = uBounds[i];
    vec2 gmin = b.xy;
    vec2 gmax = b.xy + b.zw;
    bool inside = uv.x >= gmin.x && uv.x <= gmax.x && uv.y >= gmin.y && uv.y <= gmax.y;
    if (inside) {
      vec4 s = glassSample(uv, b);
      color = s.rgb;
      alpha = s.a;
    }
  }

  fragColor = vec4(color, alpha);
}`;
