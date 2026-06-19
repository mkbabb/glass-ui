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

// The static quad corner (6 verts: two triangles) + the instanced per-dot data.
in vec2 aCorner;          // billboard-local [-1,1]
in vec4 aDot;             // (unitPos.xyz, sphereIdx) — instanced (divisor 1)

uniform vec4 uU0;         // (resX, resY, dpr, time)
uniform vec4 uU1;         // (radius, dotSize, baseOpacity, aspect)
uniform vec4 uU2;         // (facingLo, facingHi, sizeLo, sizeHi)
uniform vec4 uU3;         // (parallax, pointerPush, pointerBloom, pointerActive)
uniform vec4 uU4;         // (pointerX, pointerY, sphere2Scale, breathRadius)
uniform vec4 uU5;         // (sphere2OffsetX, sphere2OffsetY, hasBackground, _pad)
uniform mat3 uSpin;       // the slow tilted Y-rotation

out vec2 vLocal;          // [-1,1] billboard-local for the SDF circle
out float vBright;        // facing-driven brightness
out float vAlpha;         // facing-driven opacity
out float vTone;          // palette tone (0 = bright cream near-front, 1 = amber rim)

float facingTerm(vec3 n) {
  return clamp(n.z * 0.5 + 0.5, 0.0, 1.0);   // 1 = dead-front
}

void main() {
  vec3 unitPos = aDot.xyz;
  float sphereIdx = aDot.w;

  float breath = uU4.w;
  float sphereScale = uU1.x;
  vec2 sphereOffset = vec2(0.0);
  if (sphereIdx > 0.5) {
    sphereScale = uU1.x * uU4.z;
    sphereOffset = vec2(uU5.x, uU5.y);
  }

  // The rotated surface normal = spin · unitPos (the §T2 facing source).
  vec3 n = uSpin * unitPos;
  float facing = facingTerm(n);

  // Pointer-repel/attract dimple (the §T7 local perturbation).
  float pAct = uU3.w;
  vec2 pointerNdc = vec2(uU4.x * 2.0 - 1.0, 1.0 - uU4.y * 2.0);
  vec2 screenN = n.xy * sphereScale + sphereOffset;
  vec2 toPointer = screenN - pointerNdc;
  float pd = length(toPointer);
  float dimple = exp(-pd * pd * 18.0) * uU3.y * pAct;
  vec2 lift = n.xy * dimple;

  vec2 parallaxOff = pointerNdc * uU3.x * pAct;
  vec2 center2d = n.xy * sphereScale * breath + sphereOffset + lift + parallaxOff;

  // The depth-of-field size taper + the accel-burst bloom scale.
  float sizeTaper = uU2.z + uU2.w * facing;
  float burstScale = 1.0 + uU3.z * exp(-pd * pd * 12.0);
  float dotR = uU1.y * sizeTaper * burstScale;

  float offX = aCorner.x * dotR;
  float offY = aCorner.y * dotR;

  float facingOpacity = uU2.x + uU2.y * facing;
  float burstBright = 1.0 + uU3.z * 0.8 * exp(-pd * pd * 12.0);

  vLocal = aCorner;
  vBright = facingOpacity * burstBright;
  vAlpha = clamp(uU1.z * facingOpacity * burstBright, 0.0, 1.0);
  // The palette tone reads the DEPTH (near-front bright cream → rim amber) so the depth-shell
  // reads tonally on BOTH a dark AND a light ground.
  vTone = clamp(1.0 - facing, 0.0, 1.0);

  // The whole sphere + quad is built in a SQUARE space (so the globe stays circular); the
  // final clip-space x divides by aspect so a wide canvas does not squash it into an ellipse.
  float aspect = max(uU1.w, 1e-4);
  gl_Position = vec4((center2d.x + offX) / aspect, center2d.y + offY, 0.0, 1.0);
}`;

/** The crisp fwidth-SDF dot fragment (the ONE AA canon; splices the shared color chunk). */
export const DOT_MATRIX_FRAG_GLSL = /* glsl */ `#version 300 es
precision highp float;

#define MAX_DOT_STOPS 4

in vec2 vLocal;
in float vBright;
in float vAlpha;
in float vTone;
out vec4 fragColor;

uniform vec4 uBg;                       // (background.rgb, hasBackground)
uniform int  uStopCount;
uniform vec3 uPalette[MAX_DOT_STOPS];   // linear-sRGB stops

const mat2 FBM_ROT = mat2(0.8, 0.6, -0.6, 0.8);

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

  vec3 lin = samplePaletteLin(vTone) * clamp(vBright, 0.0, 1.6);
  float alpha = vAlpha * coverage;
  vec3 rgb = clamp(linearToSrgb(lin), vec3(0.0), vec3(1.0));
  fragColor = vec4(rgb * alpha, alpha);
}`;
