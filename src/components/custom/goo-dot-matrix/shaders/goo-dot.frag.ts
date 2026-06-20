// BC.W-VIZ-HYBRID — the goo-dot-matrix WebGL2 Register-A FALLBACK (the genuinely-absent
// ~5-10% tail path — NOT a Canvas2D context; born-GPU). The line-for-line GLSL twin of the
// WGSL dot-stamp (`goo-dot.wgsl.ts`): the SAME full-screen-triangle field swap, the SAME
// byte-untouched goo-blob field (`sceneDistG`/`breath`/`samplePaletteOklch` SPLICED from the
// goo-blob shader source), the SAME dot-grid OUTPUT stage. The round-trip gate
// (`proof:viz-hybrid` clause 3) keeps the WGSL + GLSL dot-grid constants lockstep.
//
// THE FIELD SPLICE (the byte-fence). `FIELD_GLSL` is `METABALL_FRAGMENT_SRC` with its
// `void main()` sliced OFF — the `#version`/precision/IO decls (vUv, uResolution, fragColor),
// the OETF + OKLCh matrices, the noise/FBM/SDF/smin chunks, `breath`/`sceneDistG`/
// `samplePaletteOklch`/`gamutClampOklch` all stay byte-identical. The goo-blob
// `metaball.frag.ts` is NEVER edited; this shader IMPORTS + splices it. A re-fork (a local
// `vec3 sceneDistG`) reds `proof:viz-hybrid` clause 2.
//
// The dot-grid params are appended `uniform` decls (the GLSL has one program; the WGSL rides
// a second binding); the `fwidth` dot AA is the SAME crisp ~1px band canon.

import { METABALL_FRAGMENT_SRC } from "../../goo-blob/shaders/metaball.frag";

// The byte-untouched goo-blob field source, minus its own `void main()` (which would collide
// with the dot-stamp entry point). The slice marker is the `void main()` opening — everything
// BEFORE it is the IO/uniform decls + field/color helpers the dot-stamp reads.
const MAIN_MARKER = "void main()";
const fieldEnd = METABALL_FRAGMENT_SRC.indexOf(MAIN_MARKER);
/** The spliced goo-blob field GLSL (decls + sceneDistG/breath/samplePaletteOklch). */
export const GOO_DOT_FIELD_GLSL =
    fieldEnd >= 0 ? METABALL_FRAGMENT_SRC.slice(0, fieldEnd) : METABALL_FRAGMENT_SRC;

/**
 * The full-quad vertex shader — the BYTE-IDENTICAL metaball.vert convention (the `aPosition`
 * attrib name + `vUv = aPosition·0.5+0.5`), so the goo-blob `uploadBlobUniforms` draw path
 * (the SHARED field upload — `gl.drawArrays(TRIANGLES, 0, 6)` over the `aPosition` quad) is
 * REUSED wholesale for the field lanes; the dot-grid uniforms are set beside it.
 */
export const GOO_DOT_VERT_GLSL = /* glsl */ `#version 300 es
precision highp float;
in vec2 aPosition;
out vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

/** The Register-A dot-stamp fragment — the GLSL twin of the WGSL `fs_main`. */
export const GOO_DOT_FRAG_GLSL = /* glsl */ `${GOO_DOT_FIELD_GLSL}

// ── Dot-grid uniforms (the s8/s9 lanes — see uniformBridgeWGPU.ts; the SoT extend) ──
uniform float uDotMode;        // 0 = smooth field-driven dot, 1 = Bayer dither
uniform float uDotPixelSize;   // device-px cell size
uniform float uFieldFloor;     // no dot below this field value
uniform float uDotBrightFloor; // dim-outside brightness floor
uniform float uDotMin;         // rim dot radius (fraction of the cell)
uniform float uDotMax;         // core dot radius (fraction of the cell)
uniform float uDotPointerRadius;
uniform float uDotPointerMode; // +1 repel, -1 attract
uniform float uDotPointerActive;
uniform vec2  uDotCursor;      // field-uv cursor [-0.5,0.5]
uniform float uDotBloom;       // accel-burst bloom

// The Codrops Bayer8 ordered-dither macros (the §T2 halftone).
float bayer2(vec2 a0){ vec2 a = floor(a0); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
float bayer4(vec2 a){ return bayer2(0.5 * a) * 0.25 + bayer2(a); }
float bayer8(vec2 a){ return bayer4(0.5 * a) * 0.25 + bayer2(a); }

void main() {
  float bodyR = uBodyRadius + breath(uPulsePhase) * uPulseAmp;

  // 1. Quantize gl_FragCoord (device px) to a dot grid (cell = uDotPixelSize device px).
  vec2 fragCoord = gl_FragCoord.xy;
  float pix = max(uDotPixelSize, 1.0);
  vec2 cell = floor(fragCoord / pix);
  vec2 cellCtr = (cell + 0.5) * pix;

  // 2. The field uv at the cell center (the SAME uv the metaball pass uses).
  vec2 cellCtrUv = cellCtr / uResolution - 0.5;

  // 3. The dot-cursor influence (the §T7 local influence on TOP of the field-lean).
  vec2 toCursor = cellCtrUv - uDotCursor;
  float cdist = length(toCursor);
  float influence = (1.0 - smoothstep(0.0, max(uDotPointerRadius, 1e-4), cdist)) * uDotPointerActive;
  vec2 sampleUv = cellCtrUv + normalize(toCursor + vec2(1e-6)) * influence * uDotPointerMode * 0.03;

  // 4. The field value at the cell — thickness = clamp(-d/bodyR, 0, 1) (the goo↔dot bridge).
  vec3 scene = sceneDistG(sampleUv);
  float fCell = clamp(-scene.x / max(bodyR, 1e-4), 0.0, 1.0);

  // 5. The field-driven dot radius (px) + the cursor swell + the accel bloom.
  float cellHalf = pix * 0.5;
  float baseR = (uDotMin + (uDotMax - uDotMin) * smoothstep(uFieldFloor, 1.0, fCell)) * cellHalf;
  float dotR = baseR * (1.0 + influence * 0.5 + uDotBloom * influence);

  float mask = 1.0;
  if (uDotMode > 0.5) {
    mask = step(0.5, fCell + bayer8(cell) - 0.5);
  }

  // 6. The crisp fwidth-feathered SDF dot (the ONE AA canon, ~1px band at any DPR).
  float pd = length(fragCoord - cellCtr);
  float aa = max(fwidth(pd), 1e-4);
  float dot = (1.0 - smoothstep(dotR - aa, dotR + aa, pd)) * mask;

  // 7. The brightness/color reads fCell on the SAME OKLCh ramp (the ONE color source).
  float bright = uDotBrightFloor + (1.0 - uDotBrightFloor) * fCell + uDotBloom * influence * 0.6;
  float tone = clamp(1.0 - fCell, 0.0, 1.0);
  vec3 oklch = samplePaletteOklch(tone);
  oklch.x = clamp(oklch.x * clamp(bright, 0.0, 1.6), 0.0, 1.0);
  vec3 lin = oklabToLinearSrgb(oklchToOklab(gamutClampOklch(oklch)));
  vec3 rgb = clamp(linearToSrgb(lin), vec3(0.0), vec3(1.0));

  float alpha = dot * step(uFieldFloor, fCell);
  if (alpha < 0.002) discard;

  fragColor = vec4(rgb * alpha, alpha);
}`;
