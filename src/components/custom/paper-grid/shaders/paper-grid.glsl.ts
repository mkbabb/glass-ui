// BC.W-VIZ-PAPERGRID — the liquid paper-grid fullscreen fragment pass (WebGL2 GLSL FALLBACK;
// the genuinely-absent-tail path, never demoed where WebGPU is present).
//
// The aurora/concentric-class clean twin: a fullscreen fragment pass that evaluates the SAME
// liquid grid the WGSL primary does (transcribing `composables/paperGrid.ts`), splicing the
// SHARED `CURL_FBM_GLSL` curl chunk (`flow.glsl.ts` — the SAME curl operator the WGSL primary
// splices from `flow.wgsl.ts`, ONE curl source per backend) + the shared `OETF_GLSL`. GPU,
// NOT a Canvas2D context — the "no canvas anywhere" intent honored; the `<canvas>` ELEMENT is
// the GPU surface, there is NO Canvas2D path (a CPU grid-warp is hopeless AND forbidden). The
// full-screen-triangle vertex pass is the substrate's; this module is the fragment source the
// `setupGL` callback compiles + the JS↔GLSL math the round-trip gate matches against
// `paperGrid.ts`.

import { OETF_GLSL } from "../../../../composables/glass/webgl/shaders/procedural-color.glsl";
import { CURL_FBM_GLSL } from "../../../../composables/glass/webgl/shaders/flow.glsl";

/** The full-screen-triangle vertex shader (the substrate's standard fullscreen pass). */
export const PAPER_GRID_VERT_GLSL = /* glsl */ `#version 300 es
precision highp float;
in vec2 aPosition;
out vec2 vUv;
void main() {
  vUv = aPosition;            // [-1,1]² domain
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

/** The paper-grid fragment source — the liquid AA-grid (the same field as the WGSL primary). */
export const PAPER_GRID_FRAG_GLSL = /* glsl */ `#version 300 es
precision highp float;

#define TAU 6.283185307179586

in vec2 vUv;
out vec4 fragColor;

uniform float uTime;
uniform float uGridScale;
uniform float uMajorEvery;
uniform float uAspect;
uniform vec4  uWarp;          // (warpScale, warpSpeed, warpScale2, warpSpeed2)
uniform float uAmplitude;
uniform vec4  uGrid;          // (targetWidth, targetWidthMajor, minorAlpha, majorAlpha)
uniform float uFieldAlpha;
uniform float uHasBackground;
uniform vec4  uCursor;        // (cursorX, cursorY, bulgeStrength, bulgeRadius)
uniform float uBulgeMode;     // +1 repel / −1 attract
uniform vec3  uLineColor;     // linear-sRGB ink
uniform vec3  uBg;            // linear-sRGB themed bg

${OETF_GLSL}

// The shared divergence-free 2D-curl operator (flow.glsl.ts) — the prototype declares
// potentialFBM; the host defines its BODY below the splice (GLSL forward-declaration).
${CURL_FBM_GLSL}

// ── The host noise basis (transcribes paperGrid.ts hash21/valueNoise/potentialFBM) ──
float hash21(float x, float y) {
  float px = fract(x * 0.1031);
  float py = fract(y * 0.1031);
  float pz = fract(x * 0.1031);
  float d = px * (py + 33.33) + py * (pz + 33.33) + pz * (px + 33.33);
  px += d;
  py += d;
  pz += d;
  return fract((px + py) * pz);
}

float valueNoise(float x, float y) {
  float ix = floor(x);
  float iy = floor(y);
  float fx = x - ix;
  float fy = y - iy;
  float ux = fx * fx * fx * (fx * (fx * 6.0 - 15.0) + 10.0);
  float uy = fy * fy * fy * (fy * (fy * 6.0 - 15.0) + 10.0);
  float a = hash21(ix, iy);
  float b = hash21(ix + 1.0, iy);
  float c = hash21(ix, iy + 1.0);
  float d2 = hash21(ix + 1.0, iy + 1.0);
  return mix(mix(a, b, ux), mix(c, d2, ux), uy);
}

// The 3-octave scalar fbm potential — the curl chunk's forward-declared potentialFBM body.
float potentialFBM(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  float freq = 1.0;
  float px = p.x;
  float py = p.y;
  for (int i = 0; i < 3; i++) {
    v += amp * valueNoise(px * freq, py * freq);
    // FBM_ROT mat2(0.8, 0.6, -0.6, 0.8) — same rotation as the shared chunk.
    float rx = 0.8 * px - 0.6 * py;
    float ry = 0.6 * px + 0.8 * py;
    px = rx;
    py = ry;
    freq *= 2.0;
    amp *= 0.5;
  }
  return v;
}

// ── §3 The global curl-flow domain warp (transcribes paperGrid.ts curlWarp) ──
vec2 curlWarp(vec2 g, float t) {
  float warpScale = uWarp.x;
  float warpSpeed = uWarp.y;
  float warpScale2 = uWarp.z;
  float warpSpeed2 = uWarp.w;
  vec2 a = curlFBM(vec2(g.x * warpScale + t * warpSpeed, g.y * warpScale + t * warpSpeed));
  vec2 b = curlFBM(vec2(g.x * warpScale2 - t * warpSpeed2, g.y * warpScale2 - t * warpSpeed2));
  return vec2(a.x * uAmplitude + b.x * uAmplitude * 0.5, a.y * uAmplitude + b.y * uAmplitude * 0.5);
}

// ── §4 The local pointer bulge (transcribes paperGrid.ts cursorBulge) ──
vec2 cursorBulge(vec2 g) {
  vec2 cursor = uCursor.xy;
  float strength = uCursor.z * uBulgeMode;  // bulgeStrength × bulgeMode (+repel / −attract)
  float radius = max(uCursor.w, 1e-4);
  vec2 toC = g - cursor;
  float d = length(toC);
  float bulge = strength * exp(-(d * d) / (2.0 * radius * radius));
  if (d < 1e-5) return vec2(0.0);
  return (toC / d) * bulge;
}

// ── §1 The Ben Golus derivative-AA grid coverage (transcribes paperGrid.ts gridCoverage) ──
float gridCoverage(vec2 g, float targetWidth, vec2 uvDeriv) {
  vec2 gridUV = 1.0 - abs(fract(g) * 2.0 - 1.0);
  vec2 drawWidth = clamp(vec2(targetWidth), uvDeriv, vec2(0.5));
  vec2 lineAA = uvDeriv * 1.5;
  vec2 grid2 = smoothstep(drawWidth + lineAA, drawWidth - lineAA, gridUV);
  grid2 *= clamp(vec2(targetWidth) / max(drawWidth, vec2(1e-6)), vec2(0.0), vec2(1.0));
  grid2 = mix(grid2, vec2(targetWidth), clamp(uvDeriv * 2.0 - 1.0, vec2(0.0), vec2(1.0)));
  return max(grid2.x, grid2.y);
}

void main() {
  float aspect = max(uAspect, 1e-4);
  vec2 uv = vec2(vUv.x * aspect, vUv.y);

  // §5 the per-pixel kernel: warp + bulge the grid coordinate, then two-tier Golus.
  vec2 g = uv * uGridScale;
  g += curlWarp(g, uTime);
  g += cursorBulge(g);

  // The screen-space derivative of g (Golus): length(vec2(dFdx, dFdy)) per axis (the actual
  // backing-store pixel — NOT a CSS sub-pixel, the blur-kill).
  vec2 dv = vec2(
    length(vec2(dFdx(g.x), dFdy(g.x))),
    length(vec2(dFdx(g.y), dFdy(g.y)))
  );

  float minor = gridCoverage(g, uGrid.x, dv);
  float me = max(uMajorEvery, 1.0);
  float major = gridCoverage(g / me, uGrid.y, dv / me);
  float line = max(minor * uGrid.z, major * uGrid.w);

  vec3 col = clamp(linearToSrgb(uLineColor), vec3(0.0), vec3(1.0));
  if (uHasBackground > 0.5) {
    vec3 bg = clamp(linearToSrgb(uBg), vec3(0.0), vec3(1.0));
    float a = line * uFieldAlpha;
    fragColor = vec4(mix(bg, col, a), 1.0);
    return;
  }
  float a = line * uFieldAlpha;
  fragColor = vec4(col * a, a);  // premultiplied over transparent
}`;
