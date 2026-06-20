// BC.W-VIZ-HYBRID — the goo-dot-matrix WGSL PRIMARY (Register A: the FRAGMENT dot-stamp).
//
// THE HYBRID. The metaball SDF FIELD rendered as a DOT MATRIX. This is a PURE FRAGMENT SWAP
// of the metaball pass: the SAME full-screen-triangle `vs_main`, the SAME byte-untouched
// goo-blob field (`sceneDistG`/`breath`/`samplePaletteOklch` SPLICED from the goo-blob shader
// source — the SHARED field, NOT a re-fork), the SAME OKLCh color ramp. Per fragment the
// field is sampled AT THE CELL CENTER so every fragment in a cell agrees on ONE dot radius
// (the discrete tixy/Metal dot), and the dot size + brightness are field-DRIVEN: dense+big+
// bright deep in the metaball, sparse+small+dim at the rim, gone outside the field floor.
//
// THE FIELD SPLICE (the byte-fence). `FIELD_WGSL` is `METABALL_WGSL` with its `vs_main`/
// `fs_main` sliced OFF — the struct + the @group(0)@binding(0) uniform + EVERY field/color
// helper (hash21/noised/fbm/fbmWarpedG/sdgCircle/sminG/sceneDistG/breath/samplePaletteOklch)
// stays byte-identical. The goo-blob `metaball.wgsl.ts` is NEVER edited; this shader IMPORTS
// + splices it. A re-fork (a local `fn sceneDistG`) reds `proof:viz-hybrid` clause 2.
//
// THE DOT-GRID LANES (the typed-struct extend — §T5). The dot-grid params ride a SECOND
// @group(0)@binding(1) uniform (the s8/s9 lanes), so the goo-blob field struct (binding0)
// stays byte-identical (the SoT extend, never a re-fork). The lanes mirror
// `uniformBridgeWGPU.ts` (the dot-grid SoT) from the SAME offset table.
//
// THE fwidth FENCE. The crisp `fwidth`-feathered dot AA lives in `fs_main` ONLY — never a
// vs_main-reachable helper (the dual-module WGSL-validation trap; the metaball.wgsl precedent,
// gpuweb #1795).

import { METABALL_WGSL } from "../../goo-blob/shaders/metaball.wgsl";

// The byte-untouched goo-blob field source, minus its own vs_main/fs_main (which would
// collide with the dot-stamp entry points). The slice marker is the metaball.wgsl comment
// banner that opens the full-screen vertex stage — everything BEFORE it is the struct +
// bindings + field/color helpers the dot-stamp reads. The slice keeps the leading template
// backtick's content and drops the trailing closing backtick.
const FIELD_MARKER = "// ── Full-screen triangle vertex stage";
const fieldEnd = METABALL_WGSL.indexOf(FIELD_MARKER);
/** The spliced goo-blob field (struct + bindings + sceneDistG/breath/samplePaletteOklch). */
export const GOO_DOT_FIELD_WGSL =
    fieldEnd >= 0 ? METABALL_WGSL.slice(0, fieldEnd) : METABALL_WGSL;

export const GOO_DOT_WGSL = /* wgsl */ `
${GOO_DOT_FIELD_WGSL}

// ── Dot-grid uniforms (the s8/s9 lanes — see uniformBridgeWGPU.ts; the SoT extend) ──
struct DotUniforms {
  // s8: (uDotMode, uDotPixelSize, uFieldFloor, uDotBrightFloor)
  s8: vec4<f32>,
  // s9: (uDotMin, uDotMax, uPointerRadius, uPointerMode)
  s9: vec4<f32>,
  // s10: (uResX, uResY, uDpr, _pad) — the device-px resolution the cell grid quantizes to
  s10: vec4<f32>,
  // s11: (uPointerActive, uPointerX, uPointerY, uBloom) — the dot-cursor influence
  s11: vec4<f32>,
};
@group(0) @binding(1) var<uniform> dg: DotUniforms;

// The classic ordered-dither Bayer macros (Codrops — the §T2 halftone). Bayer8 is the
// perceptual ceiling ("beyond 8×8 the gain is minimal"). The metaball field already carries
// the warped-FBM membrane, so the dither inherits the organic edge for free.
fn bayer2(a0: vec2<f32>) -> f32 {
  let a = floor(a0);
  return fract(a.x / 2.0 + a.y * a.y * 0.75);
}
fn bayer4(a: vec2<f32>) -> f32 {
  return bayer2(0.5 * a) * 0.25 + bayer2(a);
}
fn bayer8(a: vec2<f32>) -> f32 {
  return bayer4(0.5 * a) * 0.25 + bayer2(a);
}

// ── Register A: the full-screen triangle vertex stage (the metaball idiom — no buffer) ──
struct DotVSOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) uv: vec2<f32>,   // [0,1] across the canvas (the metaball.vert convention)
};

@vertex
fn vs_main(@builtin(vertex_index) vi: u32) -> DotVSOut {
  var p = vec2<f32>(-1.0, -1.0);
  if (vi == 1u) { p = vec2<f32>(3.0, -1.0); }
  else if (vi == 2u) { p = vec2<f32>(-1.0, 3.0); }
  var out: DotVSOut;
  out.pos = vec4<f32>(p, 0.0, 1.0);
  out.uv = p * 0.5 + 0.5;
  return out;
}

// ── Register A: the dot-stamp fragment (§T1/§T2 — the dot-grid OUTPUT over sceneDistG) ──
@fragment
fn fs_main(in: DotVSOut) -> @location(0) vec4<f32> {
  let uDotMode        = dg.s8.x;          // 0 = smooth field-driven dot, 1 = Bayer dither
  let uDotPixelSize   = max(dg.s8.y, 1.0);
  let uFieldFloor     = dg.s8.z;
  let uDotBrightFloor = dg.s8.w;
  let uDotMin         = dg.s9.x;
  let uDotMax         = dg.s9.y;
  let uPointerRadius  = max(dg.s9.z, 1e-4);
  let uPointerMode    = dg.s9.w;          // +1 repel (push out), -1 attract (pull in)
  let uRes            = dg.s10.xy;
  let pAct            = dg.s11.x;
  let cursor          = dg.s11.yz;        // NDC-ish [-0.5,0.5] (the field's uv space)
  let uBloom          = dg.s11.w;

  let bodyR = u.s0.y + breath(u.s0.z) * u.s0.w;

  // 1. Quantize fragCoord to a dot grid (cell = uDotPixelSize device px). The fragment's
  //    pixel coordinate is in.pos.xy (device px).
  let fragCoord = in.pos.xy;
  let cell      = floor(fragCoord / uDotPixelSize);
  let cellCtr   = (cell + 0.5) * uDotPixelSize;

  // 2. The field AT THE CELL CENTER (so every fragment in a cell agrees on ONE dot). The cell
  //    center maps to the field uv = (cellCtr/res - 0.5) — the SAME uv the metaball pass uses.
  let cellCtrUv = cellCtr / uRes - 0.5;

  // 3. The dot-cursor influence (§T7 — the Metal dotted-bg idiom): dots near the cursor swell
  //    + brighten; the cell uv shifts toward/away (attract/repel). The field-lean is carried
  //    by the metaball pass's own uPointer deformation inside sceneDistG (KEEP); this is the
  //    LOCAL dot influence on TOP.
  let toCursor   = cellCtrUv - cursor;
  let cdist      = length(toCursor);
  let influence  = (1.0 - smoothstep(0.0, uPointerRadius, cdist)) * pAct;
  let sampleUv   = cellCtrUv + normalize(toCursor + vec2<f32>(1e-6)) * influence * uPointerMode * 0.03;

  // 4. The field value at the cell — thickness = clamp(-d/bodyR, 0, 1) (metaball.wgsl line 500,
  //    the one-line re-use). 0 at the silhouette → 1 deep in the core — the goo↔dot bridge.
  let scene = sceneDistG(sampleUv);
  let fCell = clamp(-scene.x / max(bodyR, 1e-4), 0.0, 1.0);

  // 5. The dot radius (px) — field-driven: dense+big inside, small at the rim, 0 outside the
  //    floor. The cursor swells the near-cursor dots (mix toward 1.5× + the accel bloom).
  let cellHalf = uDotPixelSize * 0.5;
  let baseR    = (uDotMin + (uDotMax - uDotMin) * smoothstep(uFieldFloor, 1.0, fCell)) * cellHalf;
  let dotR     = baseR * (1.0 + influence * 0.5 + uBloom * influence);

  var mask = 1.0;
  if (uDotMode > 0.5) {
    // §T2 Register-A dither: ORDERED-dither the field thickness into ON/OFF dots — denser at
    // the core, sparser at the rim (the classic halftone). The dot still AA-stamps below.
    mask = step(0.5, fCell + bayer8(cell) - 0.5);
  }

  // 6. The antialiased circle at the cell center (the fwidth-feathered Book-of-Shaders dot —
  //    the ONE AA canon, ~1px band at any DPR). fwidth lives in fs_main ONLY.
  let pd  = length(fragCoord - cellCtr);
  let aa  = max(fwidth(pd), 1e-4);
  let dot = (1.0 - smoothstep(dotR - aa, dotR + aa, pd)) * mask;

  // 7. The brightness/color ALSO reads fCell (dim outside, bright inside) on the SAME OKLCh
  //    ramp the metaball pass samples (the ONE color source). The tone reads DEPTH (the core
  //    is the bright cream stop, the rim the amber stop) so the field reads TONALLY on both
  //    grounds; the brightness multiplies the sampled stop's luminance.
  let bright = uDotBrightFloor + (1.0 - uDotBrightFloor) * fCell + uBloom * influence * 0.6;
  let tone   = clamp(1.0 - fCell, 0.0, 1.0);
  var oklch  = samplePaletteOklch(tone);
  oklch.x    = clamp(oklch.x * clamp(bright, 0.0, 1.6), 0.0, 1.0);
  let lin    = oklabToLinearSrgb(oklchToOklab(gamutClampOklch(oklch)));
  let rgb    = clamp(linearToSrgb(lin), vec3<f32>(0.0), vec3<f32>(1.0));

  // No dot where the field is below the floor (the dots stop at the silhouette band).
  let alpha = dot * step(uFieldFloor, fCell);
  if (alpha < 0.002) { discard; }

  // Premultiplied-alpha output (the warm-cream dots additive over the clear).
  return vec4<f32>(rgb * alpha, alpha);
}
`;
