// BC.W-VIZ-PAPERGRID — the liquid-grid fullscreen fragment pass (WebGL2 GLSL FALLBACK;
// the genuinely-absent-tail path, never demoed where WebGPU is present).
//
// The aurora/concentric-class clean twin: a fullscreen fragment pass that evaluates the SAME
// liquid grid the WGSL primary does (transcribing `composables/liquidGrid.ts`), splicing the
// SHARED `CURL_FBM_GLSL` curl chunk (`flow.glsl.ts` — the SAME curl operator the WGSL primary
// splices from `flow.wgsl.ts`, ONE curl source per backend) + the shared `OETF_GLSL`. GPU,
// NOT a Canvas2D context — the "no canvas anywhere" intent honored; the `<canvas>` ELEMENT is
// the GPU surface, there is NO Canvas2D path (a CPU grid-warp is hopeless AND forbidden). The
// full-screen-triangle vertex pass is the substrate's; this module is the fragment source the
// `setupGL` callback compiles + the JS↔GLSL math the round-trip gate matches against
// `liquidGrid.ts`.

import { OETF_GLSL } from "../../../../composables/glass/webgl/shaders/procedural-color.glsl";
import { CURL_FBM_GLSL } from "../../../../composables/glass/webgl/shaders/flow.glsl";
import { WAVE_FIELD_GLSL } from "../../../../composables/glass/wave/waveField.glsl";

/** The full-screen-triangle vertex shader (the substrate's standard fullscreen pass). */
export const LIQUID_GRID_VERT_GLSL = /* glsl */ `#version 300 es
precision highp float;
in vec2 aPosition;
out vec2 vUv;
void main() {
  vUv = aPosition;            // [-1,1]² domain
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

/** The liquid-grid fragment source — the liquid AA-grid (the same field as the WGSL primary). */
export const LIQUID_GRID_FRAG_GLSL = /* glsl */ `#version 300 es
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
uniform vec4  uCursor;        // (cursorX, cursorY, swirlStrength, swirlRadius)
uniform float uBulgeMode;     // +1 repel / −1 attract (signs the swirl)
uniform float uInteractive;   // 1 = cursor swirl on
uniform vec4  uWave;          // (waveDirX, waveDirY, waveK, waveOmega)
uniform vec4  uWave2;         // (waveSigma, twistMax, _pad, amp) — affine sheet-warp envelope
uniform vec3  uLineColor;     // linear-sRGB ink
uniform vec3  uBg;            // linear-sRGB themed bg
// ── The FACE (BD.W-PAPERGRID-FACE) — the height-lit filled cell interior ──
uniform vec4  uFace;          // (faceAlpha, faceRelief, squashK, baseInset)
uniform vec2  uLightDir;      // the cel key-light direction
uniform vec3  uFaceLo;        // linear-sRGB rose-umber trough (FOLD B, 3-stop)
uniform vec3  uFaceMid;       // linear-sRGB ember-amber mid
uniform vec3  uFaceHi;        // linear-sRGB warm-wheat crest

${OETF_GLSL}

// The 3-stop warm-divergent FACE ramp (FOLD B — height-keyed, NOT a 2-point mid-park). All stops
// warm hue ∈ [20,90]; linear-space (the OETF runs in main, FOLD E).
vec3 faceRamp(float rampT) {
  float s = clamp(rampT, 0.0, 1.0);
  if (s < 0.5) {
    return mix(uFaceLo, uFaceMid, s * 2.0);
  }
  return mix(uFaceMid, uFaceHi, (s - 0.5) * 2.0);
}

// The shared divergence-free 2D-curl operator (flow.glsl.ts) — the prototype declares
// potentialFBM; the host defines its BODY below the splice (GLSL forward-declaration).
${CURL_FBM_GLSL}

// ── The host noise basis (transcribes liquidGrid.ts hash21/valueNoise/potentialFBM) ──
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

// The shared traveling-wave WARP chunk (waveField.glsl.ts — waveFlow/cursorSwirl/
// travelingEnvelope + the FACE leaf; spliced AFTER valueNoise + potentialFBM bodies + the curlFBM
// chunk). liquid-grid + concentric read the SAME waveFlow continuous affine sheet-warp (the DRY
// coupling — a leaf tune moves both, never the retired per-cell twist / LINE-warp).
${WAVE_FIELD_GLSL}

// ── §1 The Ben Golus derivative-AA grid coverage (transcribes liquidGrid.ts gridCoverage) ──
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

  // §5 the per-pixel kernel: AFFINE sheet-warp + cursor-swirl the grid coordinate, then two-tier
  // Golus. waveFlow is the SMOOTH continuous domain transform (the SAME warp concentric reads) —
  // a low-order curl-flow displacement gated by the traveling wave, locally affine at the cell
  // scale, so the sheet bows/shears as ONE coherent transform (major lines a single smooth curve,
  // no per-cell seam); cursorSwirl twists the cells about the finger. The Golus dv reads the FINAL
  // warped coord (the crisp-line fence survives).
  vec2 g0 = uv * uGridScale;
  // BG.W-GRID-AFFINE — g0 is CELL-scale, so pass the tiny 0.03 curl-sampling frequency (== the JS
  // LIQUID_GRID_WARP_FREQ) so the warp is locally affine at the cell scale (major lines bow as ONE
  // smooth curve, no sub-cell crackle). Concentric passes 0.6 (its p is unit-scale).
  vec2 g = waveFlow(g0, uTime, uWave.xy, uWave.z, uWave.w, uWave2.x, uWave2.y, uWave2.w, 0.03);
  if (uInteractive > 0.5) {
    g = cursorSwirl(g, uCursor.xy, uCursor.z * uBulgeMode, uCursor.w);
  }

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

  // ── The FACE (BD.W-PAPERGRID-FACE) — height-lit filled cell interior ──────────────────
  // Sample height/relief at the WARPED-space cell center (floor(g)+0.5, the cell the fragment
  // lands in under the affine warp); Lambert the ∇H slope against the fixed cel key-light; squash
  // the inset so the crest face inflates; multi-stop warm-divergent ramp keyed on mix(shade, h)
  // (FOLD B); the ink through the production OETF (FOLD E).
  vec2  cc     = floor(g) + 0.5;
  float h      = cellHeight(cc, uTime, uWave.xy, uWave.z, uWave.w, uWave2.x, uWave2.w);
  vec2  grad   = faceRelief(cc, 1.0, uTime, uWave.xy, uWave.z, uWave.w, uWave2.x, uWave2.w);
  vec3  n      = normalize(vec3(-grad * uFace.y, 1.0));
  float shade  = clamp(0.5 + dot(n, normalize(vec3(uLightDir, 1.0))) * 0.5, 0.0, 1.0);
  float inset  = uFace.w * (1.0 - uFace.z * h);            // squash & stretch
  float face   = facePlateau(g, inset, dv);
  float rampT  = clamp(shade * 0.5 + h * 0.5, 0.0, 1.0);   // FOLD B — height-keyed crest
  vec3  faceInk = clamp(linearToSrgb(faceRamp(rampT)), vec3(0.0), vec3(1.0));
  float faceA  = face * uFace.x * uFieldAlpha;             // FOLD D — one field-blend scalar

  vec3 col = clamp(linearToSrgb(uLineColor), vec3(0.0), vec3(1.0));
  if (uHasBackground > 0.5) {
    vec3 bg = clamp(linearToSrgb(uBg), vec3(0.0), vec3(1.0));
    vec3 base = mix(bg, faceInk, faceA);
    float a = line * uFieldAlpha;
    fragColor = vec4(mix(base, col, a), 1.0);
    return;
  }
  // transparent ground: the FACE composites UNDER the line, the SOURCE-OVER operator in
  // PREMULTIPLIED space. faceAlpha:0 → faceA=0 → the face term vanishes → vec4(col·line, line) =
  // byte-identical to the HEAD line-only render.
  vec3 linePremult = (col * line) * uFieldAlpha;          // line layer (the FieldAlpha subtlety)
  float lineA = line * uFieldAlpha;
  vec3 facePremult = faceInk * faceA;                     // face layer premultiplied (faceA folds field)
  vec3 outPremult = linePremult + facePremult * (1.0 - lineA);
  float a = lineA + faceA * (1.0 - lineA);
  fragColor = vec4(outPremult, a);  // premultiplied over transparent
}`;
