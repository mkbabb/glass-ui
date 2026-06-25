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

// ── Dot-grid uniforms (the s8–s13 lanes — see uniformBridgeWGPU.ts; the SoT extend) ──
// The GLSL twin sets these as N named scalars (the WGSL packs vec4 lanes); a unit asserts the
// dU.* count == the WGSL lane-field count (a dropped uniform reds parity).
uniform float uDotMode;        // 0 = smooth field-driven dot, 1 = Bayer dither
uniform float uDotPixelSize;   // device-px cell size
uniform float uFieldFloor;     // the meniscus rise begins here
uniform float uDotBrightFloor; // dim-outside brightness floor
uniform float uDotMin;         // rim dot radius (fraction of the cell)
uniform float uDotMax;         // core dot radius (fraction of the cell)
uniform float uDotPointerRadius;
uniform float uDotPointerMode; // +1 repel, -1 attract
uniform float uDotPointerActive;
uniform vec2  uDotCursor;      // field-uv cursor [-0.5,0.5]
uniform float uDotBloom;       // accel-burst bloom (the velocity tell)
uniform float uDotShadowGate;  // 1 when an opaque ground is present (cast the cartoon shadow)
uniform float uPresenceFloor;  // Move 1 — the base-lattice floor
uniform float uWeldLo;         // Move 2 — the weld band lower fCell
uniform float uWeldHi;         // Move 2 — the weld band upper fCell
uniform float uDotTime;        // the φ-twinkle clock (s)
uniform float uWeldSwell;      // Move 2 — the neck-ridge radius swell
uniform float uWeldSpecular;   // Move 2 — the multiplicative HDR weld pop
uniform float uFlowAmt;        // Move 4b — the liquid-lattice advection
uniform float uLatticeSquash;  // Move 4b — the volume-preserving squash

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
  float cellHalf = pix * 0.5;
  vec2 cellCtr = (cell + 0.5) * pix;

  // 2. The field uv at the cell center (the SAME uv the metaball pass uses).
  vec2 cellCtrUv = cellCtr / uResolution - 0.5;

  // 3. The dot-cursor influence (the §T7 local influence on TOP of the field-lean).
  vec2 toCursor = cellCtrUv - uDotCursor;
  float cdist = length(toCursor);
  float influence = (1.0 - smoothstep(0.0, max(uDotPointerRadius, 1e-4), cdist)) * uDotPointerActive;
  vec2 cursorUv = cellCtrUv + normalize(toCursor + vec2(1e-6)) * influence * uDotPointerMode * 0.03;

  // MOVE 4b — the LIQUID LATTICE. Probe the field, advect down the gradient toward the forming
  //    core, lean the cell volume-preservingly (X·Y ≈ 1).
  vec3 probe = sceneDistG(cursorUv);
  float probeF = clamp(-probe.x / max(bodyR, 1e-4), 0.0, 1.0);
  vec2 flowDir = normalize(probe.yz + vec2(1e-6));
  float sq = max(uLatticeSquash, 1e-3);
  vec2 leanUv = vec2(cursorUv.x / sq, cursorUv.y * sq);
  vec2 sampleUv = leanUv - flowDir * uFlowAmt * probeF * 0.06;

  // 4. The field value at the cell — thickness = clamp(-d/bodyR, 0, 1) (the goo↔dot bridge).
  vec3 scene = sceneDistG(sampleUv);
  float fCell = clamp(-scene.x / max(bodyR, 1e-4), 0.0, 1.0);

  // MOVE 1 — the φ-banded PRESENCE FLOOR (uPresenceFloor = 0 ⇒ byte-identical to the old gate).
  float band = smoothstep(0.0, max(uFieldFloor, 1e-4), fCell);
  float core = smoothstep(uFieldFloor, 1.0, fCell);
  float present = max(uPresenceFloor, band);

  // MOVE 2 — the NECK-RIDGE (weld gated on the rim/iso band + a shallow gradient, not on core).
  float gradMag = length(scene.yz);
  float inBand = smoothstep(uWeldLo, (uWeldLo + uWeldHi) * 0.5, fCell)
               * (1.0 - smoothstep((uWeldLo + uWeldHi) * 0.5, uWeldHi, fCell));
  float weld = inBand * (1.0 - smoothstep(0.0, 0.25, gradMag));

  // 5. The field-driven dot radius (px) + the neck-ridge swell + the cursor swell + accel bloom.
  float coreR = (uDotMin + (uDotMax - uDotMin) * core);
  float baseR = mix(uDotMin, coreR, present)
              * (1.0 + uWeldSwell * weld)
              * (1.0 + influence * 0.5 + uDotBloom * influence);
  float dotR = clamp(baseR, 0.0, 0.98) * cellHalf;

  float mask = 1.0;
  if (uDotMode > 0.5) {
    mask = step(0.5, max(uPresenceFloor, fCell) + bayer8(cell) - 0.5);
  }

  // 6. The crisp fwidth-feathered SDF dot (the ONE AA canon, ~1px band at any DPR).
  float pd = length(fragCoord - cellCtr);
  float aa = max(fwidth(pd), 1e-4);
  float dot = (1.0 - smoothstep(dotR - aa, dotR + aa, pd)) * mask;

  // MOVE 3 — the GATED CARTOON SHADOW (offset by the cursor burst — the velocity tell — gated
  //    on uDotShadowGate so no dark halos paint on a light/transparent host).
  float twinkle = 0.85 + 0.15 * sin(uDotTime * 0.6 + hash21(cell) * 6.2831853);
  vec2 shOff = normalize(toCursor + vec2(1e-6)) * (0.6 + uDotBloom * 2.2) * uDotShadowGate;
  float shPd = length(fragCoord - (cellCtr + shOff * cellHalf));
  float shadowR = dotR * 1.45;
  float shadow = (1.0 - smoothstep(shadowR - aa, shadowR + aa, shPd)) * mask
               * uDotShadowGate * (present * 0.55);

  // 7. The TECHNICOLOR read (Move 3) — core gold, weld coral (the multiplicative HDR specular
  //    pop), base lattice amber; the floor dots carry chroma.
  float bright = (uDotBrightFloor + (1.0 - uDotBrightFloor) * core + uDotBloom * influence * 0.6)
               * (1.0 + uWeldSpecular * weld) * twinkle;
  float tone = clamp(mix(1.0 - core, 0.5, weld), 0.0, 1.0);
  vec3 oklch = samplePaletteOklch(tone);
  oklch.x = clamp(oklch.x * clamp(bright, 0.0, 1.8), 0.0, 1.0);
  vec3 lin = oklabToLinearSrgb(oklchToOklab(gamutClampOklch(oklch)));
  vec3 rgb = clamp(linearToSrgb(lin), vec3(0.0), vec3(1.0));

  float alpha = dot * present * twinkle;
  if (alpha < 0.002 && shadow < 0.002) discard;

  vec3 shadowRgb = vec3(0.10, 0.05, 0.02);
  vec3 outRgb = rgb * alpha + shadowRgb * shadow * (1.0 - alpha);
  float outA = alpha + shadow * (1.0 - alpha);
  fragColor = vec4(outRgb, outA);
}`;

// ── BD.W-GOODOT-LIQUID-FIELD Move 4a — the warm GROUND program (the GLSL twin of
// GOO_DOT_GROUND_WGSL). The WebGL2/Safari tail draws the SAME living warm gradient as pass-1
// (loadOp:"clear" equivalent — a full clear+draw before the dot pass loads over it).
export const GOO_DOT_GROUND_VERT_GLSL = /* glsl */ `#version 300 es
precision highp float;
in vec2 aPosition;
out vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

export const GOO_DOT_GROUND_FRAG_GLSL = /* glsl */ `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;
uniform float uGroundTime;
void main() {
  float d1 = 0.5 + 0.5 * sin(uGroundTime * 0.11 + vUv.x * 2.1);
  float d2 = 0.5 + 0.5 * sin(uGroundTime * 0.07 - vUv.y * 1.7 + 1.3);
  vec3 amber = vec3(0.99, 0.86, 0.62);
  vec3 coral = vec3(0.95, 0.62, 0.42);
  vec3 deep  = vec3(0.86, 0.50, 0.30);
  vec3 g = mix(deep, coral, d1);
  vec3 rgb = mix(g, amber, d2 * (1.0 - vUv.y) * 0.8);
  fragColor = vec4(rgb, 1.0);
}`;
