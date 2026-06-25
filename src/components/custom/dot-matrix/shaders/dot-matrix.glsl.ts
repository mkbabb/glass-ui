// BC.W-VIZ-DOTMATRIX — the WebGL2 instanced-billboard dot-sphere FALLBACK (the
// genuinely-absent ~5-10% tail path — NOT a Canvas2D context; born-GPU).
//
// The SAME instanced-billboard SOTA the WGSL primary ships, transcribed line-for-line for
// WebGL2: `gl.drawArraysInstanced(TRIANGLES, 0, 6, N)` — 6 quad corners from a static
// vertex buffer, the per-dot `(unitPos.xyz, sphereIdx)` read via an instanced vertex
// attribute (`glVertexAttribDivisor(loc, 1)`), Baseline-universal in WebGL2. The fragment
// is the SAME crisp `fwidth`-smoothstep SDF circle (the ONE AA canon). The dot color
// splices the SHARED GLSL color chunk (the ONE color source → no drift between backends).
//
// The depth-fade + the spin + the pointer-dimple + the projection transcribe the WGSL
// vs_main EXACTLY; the dots buffer carries the JS-computed phyllotaxis positions (the
// round-trip parity anchor). Premultiplied-alpha blend over the (transparent/near-black)
// clear. No Canvas2D anywhere ("no canvas anywhere", §E).

import {
    OETF_GLSL,
    OKLCH_MATRICES_GLSL,
} from "../../../../composables/glass/webgl/shaders/procedural-color.glsl";

/** The instanced-billboard VERTEX shader (gl_VertexID quad + instanced dot attribute). */
export const DOT_MATRIX_VERT_GLSL = /* glsl */ `#version 300 es
precision highp float;

#define MAX_DOT_STOPS 4
#define GOLDEN_ANGLE 2.399963229728653

// ── The √φ proportion ladder (the liquid-lens constants; the line-for-line WGSL twin) ──
#define PI_CONST 3.141592653589793
#define TAU 6.283185307179586
#define PHI 1.618033988749895
#define SQRT_PHI 1.272019649514069
#define INV_SQRT_PHI 0.7861513777574233
#define INV_PHI2 0.3819660112501051
#define VEL_SCALE 0.18
#define STRETCH_GAIN 2.4
#define WAKE_GAIN 12.0
#define LENS_MAGNIFY SQRT_PHI
#define RIM_CHROMA 1.0
#define VIGNETTE_FLOOR INV_PHI2
#define CAST_OFFSET 0.9
#define CAST_DARK 0.0
#define CAST_ALPHA 0.55

// The static quad corner (6 verts: two triangles) + the instanced per-dot data. The draw is
// 12 verts/instance: gl_VertexID 0..5 the lit dot, 6..11 the cartoon offset-CAST shadow (the
// SAME instanced draw, zero new buffer). The corner is re-derived from gl_VertexID % 6.
in vec4 aDot;             // (unitPos.xyz, sphereIdx) — instanced (divisor 1)

uniform vec4 uU0;         // (resX, resY, dpr, time)
uniform vec4 uU1;         // (radius, dotSize, baseOpacity, aspect)
uniform vec4 uU2;         // (facingLo, facingHi, sizeLo, sizeHi)
uniform vec4 uU3;         // (parallax, pointerPush, pointerBloom, pointerActive)
uniform vec4 uU4;         // (pointerX, pointerY, sphere2Scale, breathRadius)
uniform vec4 uU5;         // (sphere2OffsetX, sphere2OffsetY, hasBackground, _pad)
uniform vec4 uU6;         // (layout, gravityStrength, gravityRadius, planeScale)
uniform vec4 uU7;         // (velX, velY, twinkleRate, wakeStrength)
uniform mat3 uSpin;       // the slow tilted Y-rotation

out vec2 vLocal;          // [-1,1] billboard-local for the SDF circle
out float vBright;        // facing-driven brightness
out float vAlpha;         // facing-driven opacity
out float vTone;          // palette tone (0 = bright cream near-front, 1 = amber rim)
out float vCast;          // 1 = the cartoon offset-cast shadow billboard, 0 = the lit dot

float facingTerm(vec3 n) {
  return clamp(n.z * 0.5 + 0.5, 0.0, 1.0);   // 1 = dead-front
}

void main() {
  // The two-triangle quad corners (6 verts), re-derived per gl_VertexID (no aCorner buffer).
  vec2 cornerLUT[6] = vec2[6](
    vec2(-1.0, -1.0), vec2(1.0, -1.0), vec2(-1.0, 1.0),
    vec2(-1.0, 1.0), vec2(1.0, -1.0), vec2(1.0, 1.0)
  );
  bool isCast = gl_VertexID >= 6;
  vec2 aCorner = cornerLUT[gl_VertexID % 6];

  vec3 unitPos = aDot.xyz;
  float sphereIdx = aDot.w;

  float breath = uU4.w;
  float pAct = uU3.w;
  vec2 pointerNdc = vec2(uU4.x * 2.0 - 1.0, 1.0 - uU4.y * 2.0);
  bool isPlane = uU6.x > 0.5;
  float gravStrength = uU6.y;
  float gravRadius = max(uU6.z, 1e-3);
  float planeScale = uU6.w;
  // The reclaimed travel velocity → the lens-frame vector (host +y is DOWN → flip to NDC +up).
  vec2 velRaw = vec2(uU7.x, -uU7.y);
  float vmag = length(velRaw) * VEL_SCALE;
  vec2 vdir = length(velRaw) > 1e-5 ? velRaw / max(length(velRaw), 1e-5) : vec2(0.0);
  float wake = uU7.w;       // the spring-engaged active (ζ=0.7) → the wake LAGS + overshoots
  float twkRate = uU7.z;
  // The per-dot twinkle phase — an on-GPU instance hash (no new buffer); uTime pinned under PRM.
  float twkPhase = fract(sin(float(gl_InstanceID) * 12.9898) * 43758.5453) * TAU;
  float twk = twkRate * sin(uU0.w * (twkRate + 0.6) + twkPhase);

  vec2 center2d;
  float facing;
  float sizeTaper;
  float burstScale;
  float facingOpacity;
  float burstBright;
  float castLobe = 0.0;

  if (isPlane) {
    // ── The 2D-PLANE register → the DIRECTIONAL LIQUID LENS ──────────────────────
    vec2 base2d = unitPos.xy * planeScale;

    // 1. ANTICIPATION — the lens LEADS its math-center along travel.
    vec2 wellC = pointerNdc + vdir * wake * (gravRadius * INV_PHI2 * 0.4);
    vec2 toLens = wellC - base2d;

    // 2. SQUASH / STRETCH — measure distance in a frame STRETCHED along travel.
    float along = dot(toLens, vdir);
    float perp = dot(toLens, vec2(-vdir.y, vdir.x));
    float stretch = 1.0 + clamp(vmag * STRETCH_GAIN, 0.0, INV_SQRT_PHI);
    float dE = length(vec2(along / stretch, perp * stretch));
    float well = gravStrength * exp(-(dE * dE) / (2.0 * gravRadius * gravRadius)) * pAct;
    vec2 lift = toLens * well;

    // 3. COMET-TAIL WAKE — a pull streamed BEHIND the lens (follow-through).
    float behind = max(0.0, -along);
    float tail = wake * exp(-(behind * behind) / (gravRadius * gravRadius)) * vmag * WAKE_GAIN;
    lift -= vdir * tail * gravRadius;
    vec2 burstPull = toLens * (uU3.z * 0.4 * exp(-(dE * dE) / (gravRadius * gravRadius))) * pAct;
    center2d = base2d + lift + burstPull;

    // 4. LENS OPTICS — magnify + brightness + the chromatic rim.
    float nearness = exp(-(dE * dE) / (2.0 * gravRadius * gravRadius));
    facing = nearness;
    sizeTaper = 0.8 + LENS_MAGNIFY * nearness * pAct;
    burstScale = 1.0 + uU3.z * 0.6 * nearness;
    float wakeGlow = behind * vmag * 1.4 * pAct;
    // 5. CONTENT-DEFERENTIAL VIGNETTE — dense edges, clear center; the lens re-densifies it.
    float presence = mix(VIGNETTE_FLOOR, 1.0, smoothstep(0.0, 1.0, length(base2d) / max(planeScale, 1e-3)));
    presence = max(presence, nearness * pAct);
    facingOpacity = (uU2.x + uU2.y * (0.5 + twk + 0.6 * nearness * pAct)) * presence;
    burstBright = 1.0 + (0.5 * nearness + wakeGlow + uU3.z * 0.8 * nearness) * pAct;
    castLobe = nearness * pAct;
  } else {
    // ── The 3D-SPHERE register → the SAME directional lens (one warp idiom) ───────
    float sphereScale = uU1.x;
    vec2 sphereOffset = vec2(0.0);
    if (sphereIdx > 0.5) {
      sphereScale = uU1.x * uU4.z;
      sphereOffset = vec2(uU5.x, uU5.y);
    }
    vec3 n = uSpin * unitPos;
    facing = facingTerm(n);
    vec2 screenN = n.xy * sphereScale + sphereOffset;
    vec2 toLensS = pointerNdc - screenN;
    float alongS = dot(toLensS, vdir);
    float perpS = dot(toLensS, vec2(-vdir.y, vdir.x));
    float stretchS = 1.0 + clamp(vmag * STRETCH_GAIN, 0.0, INV_SQRT_PHI);
    float dES = length(vec2(alongS / stretchS, perpS * stretchS));
    float pd = dES;
    float well = exp(-(dES * dES) / (2.0 * gravRadius * gravRadius)) * gravStrength * uU3.y * pAct * facing;
    vec2 lift = -toLensS * well;
    float behindS = max(0.0, -alongS);
    float tailS = wake * exp(-(behindS * behindS) / (gravRadius * gravRadius)) * vmag * WAKE_GAIN * facing;
    lift -= vdir * tailS * gravRadius * sign(uU3.y);
    vec2 parallaxOff = pointerNdc * uU3.x * pAct;
    center2d = n.xy * sphereScale * breath + sphereOffset + lift + parallaxOff;
    float nearnessS = exp(-(dES * dES) / (2.0 * gravRadius * gravRadius)) * facing;
    sizeTaper = uU2.z + uU2.w * facing + LENS_MAGNIFY * 0.4 * nearnessS * pAct;
    burstScale = 1.0 + uU3.z * exp(-(dES * dES) / (gravRadius * gravRadius));
    float wakeGlowS = behindS * vmag * 1.0 * pAct * facing;
    facingOpacity = uU2.x + uU2.y * facing + uU2.y * twk * facing;
    burstBright = 1.0 + (uU3.z * 0.8 * exp(-(dES * dES) / (gravRadius * gravRadius)) + wakeGlowS) * pAct;
    castLobe = nearnessS * pAct;
  }

  float dotR = uU1.y * sizeTaper * burstScale;
  float offX = aCorner.x * dotR;
  float offY = aCorner.y * dotR;

  // THE CARTOON OFFSET-CAST — verts 6..11 are a dark, lower-α duplicate offset along a √φ
  // light vector (down-right), gated by castLobe so the lobe appears only under the lens.
  vec2 lightVec = normalize(vec2(SQRT_PHI, -1.0)) * CAST_OFFSET * dotR;
  vec2 castShift = isCast ? lightVec : vec2(0.0);
  float castStrength = isCast ? smoothstep(0.05, 0.5, castLobe) : 1.0;

  vLocal = aCorner;
  vCast = isCast ? 1.0 : 0.0;
  if (isCast) {
    vBright = CAST_DARK;
    vAlpha = clamp(uU1.z * CAST_ALPHA * facingOpacity * castStrength, 0.0, 1.0);
    vTone = 1.0;
  } else {
    vBright = facingOpacity * burstBright;
    vAlpha = clamp(uU1.z * facingOpacity * burstBright, 0.0, 1.0);
    // The chromatic RIM refraction (REPLACES the old depth-only 1.0-facing tone — EXCISED).
    float rim = smoothstep(0.25, 0.6, 1.0 - facing) * RIM_CHROMA;
    vTone = clamp(max(1.0 - facing, rim * facing), 0.0, 1.0);
  }

  // The whole sphere + quad is built in a SQUARE space (so the globe stays circular); the
  // final clip-space x divides by aspect so a wide canvas does not squash it into an ellipse.
  float aspect = max(uU1.w, 1e-4);
  gl_Position = vec4((center2d.x + offX + castShift.x) / aspect, center2d.y + offY + castShift.y, 0.0, 1.0);
}`;

/** The crisp fwidth-SDF dot fragment (the ONE AA canon; splices the shared color chunk). */
export const DOT_MATRIX_FRAG_GLSL = /* glsl */ `#version 300 es
precision highp float;

#define MAX_DOT_STOPS 4

in vec2 vLocal;
in float vBright;
in float vAlpha;
in float vTone;
in float vCast;
out vec4 fragColor;

uniform vec4 uBg;                       // (background.rgb, hasBackground)
uniform int  uStopCount;
uniform vec3 uPalette[MAX_DOT_STOPS];   // linear-sRGB stops

const mat2 FBM_ROT = mat2(0.8, 0.6, -0.6, 0.8);

// PI in scope for the spliced OKLCH hue fns (the procedural-color chunk contract:
// the consumer splices the matrices chunk + DEFINES PI FIRST — see
// procedural-color.glsl.ts §"PI being in scope"). The dot SDF main() reads only the
// OKLAB path, but the whole spliced chunk still compiles, so PI must be declared.
#define PI 3.141592653589793
${OETF_GLSL}
${OKLCH_MATRICES_GLSL}

vec3 samplePaletteLin(float t) {
  if (uStopCount <= 1) return uPalette[0];
  float n = float(uStopCount);
  float ft = clamp(t, 0.0, 1.0) * (n - 1.0);
  int i0 = int(floor(ft));
  int i1 = min(i0 + 1, uStopCount - 1);
  float f = ft - float(i0);
  vec3 lmsA = LINEAR_SRGB_TO_LMS * uPalette[i0];
  vec3 lmsB = LINEAR_SRGB_TO_LMS * uPalette[i1];
  vec3 labA = LMS_TO_OKLAB * (sign(lmsA) * pow(abs(lmsA), vec3(1.0 / 3.0)));
  vec3 labB = LMS_TO_OKLAB * (sign(lmsB) * pow(abs(lmsB), vec3(1.0 / 3.0)));
  return oklabToLinearSrgb(mix(labA, labB, f));
}

void main() {
  // The crisp fwidth-smoothstep SDF circle (the ONE AA canon; ~1px band at any DPR).
  float d = length(vLocal) - 1.0;
  float aa = max(fwidth(d), 1e-4);
  float coverage = 1.0 - smoothstep(-aa, aa, d);
  if (coverage < 0.002) discard;
  // The cartoon-cast billboard collapses to nothing away from the lens — drop the dead quads.
  if (vCast > 0.5 && vAlpha < 0.003) discard;

  vec3 lin = samplePaletteLin(vTone) * clamp(vBright, 0.0, 1.6);
  float alpha = vAlpha * coverage;
  vec3 rgb = clamp(linearToSrgb(lin), vec3(0.0), vec3(1.0));
  fragColor = vec4(rgb * alpha, alpha);
}`;
