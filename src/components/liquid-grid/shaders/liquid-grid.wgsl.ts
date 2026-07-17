// The LiquidGrid fullscreen fragment pass is the WebGPU primary.
//
// The same shape-class as aurora/concentric — a pure full-screen-triangle fragment pass (no
// vertex buffer, no compute, no storage buffer — the LIGHTEST viz in the suite). `fs_main`
// evaluates the grid at an AFFINE-WARPED coordinate `g = waveFlow(uv·scale) → cursorSwirl`
// as a smooth continuous domain transform gated by the traveling wave, locally
// affine at the cell scale — the sheet bows/shears as ONE coherent transform, major lines a
// single smooth curve) and extracts each line as a crisp constant-pixel-width stroke via the Ben
// Golus screen-space derivative AA (the blur-kill). The pass adds the face: a
// height-lit filled cell interior (`cellHeight`/`faceRelief`/`facePlateau` — the slope of the
// SAME traveling-wave height the warp rides, squashed so the crest face inflates), a 3-stop
// warm-divergent ramp keyed on `mix(shade,h)`, composited UNDER the kept creases. The ink is warm
// (hue ∈ [20,90] — teal-on-navy gone, §E REMOVE); over TRANSPARENT (the page reads through the
// gutters). `faceAlpha:0` default → the face evaporates → byte-identical line render.
//
// The single math source combines local `potentialFBM` and `gridCoverage` with shared
// `waveFlow`, `cellHeight`, `faceRelief`, `facePlateau`, and `cursorSwirl` from the
// `waveField` leaf. Together they transcribe `composables/liquidGrid.ts` line-for-line;
// shared numeric vectors round-trip the
// JS↔WGSL↔GLSL paths at a fixed sample set. The curl operator is the SHARED `flow.wgsl.ts` chunk
// (ONE curl source per backend).

import { OETF_WGSL } from "../../../composables/glass/procedural/color.wgsl";
import { CURL_FBM_WGSL } from "../../../composables/glass/webgl/shaders/flow.wgsl";
import { WAVE_FIELD_WGSL } from "../../../composables/glass/wave/waveField.wgsl";

export const LIQUID_GRID_WGSL = /* wgsl */ `
const TAU: f32 = 6.283185307179586;

// ── Paper-grid uniforms (the typed-struct source-of-truth — see uniformBridgeWGPU.ts) ──
struct LiquidGridUniforms {
  // u0: (uTime, uGridScale, uMinorPitch, uMajorEvery)
  u0: vec4<f32>,
  // face: (uFaceAlpha, uFaceRelief, uSquashK, uBaseInset) — the height-lit FACE (re-points the retired warp lane)
  face: vec4<f32>,
  // warp2: (uAmplitude, uAspect, uLightDirX, uLightDirY) — aspect + the cel key-light
  warp2: vec4<f32>,
  // grid: (uTargetWidth, uTargetWidthMajor, uMinorAlpha, uMajorAlpha)
  grid: vec4<f32>,
  // field: (uFieldAlpha, uHasBackground, _pad, _pad)
  field: vec4<f32>,
  // cursor: (uCursorX, uCursorY, uSwirlStrength, uSwirlRadius)
  cursor: vec4<f32>,
  // cursor2: (uBulgeMode, uInteractive, _pad, _pad)
  cursor2: vec4<f32>,
  // line: (uLineColor.rgb (linear), _pad)
  line: vec4<f32>,
  // bg: (uBg.rgb (linear), _pad)
  bg: vec4<f32>,
  // wave: (waveDirX, waveDirY, waveK, waveOmega) — the traveling-wave crest
  wave: vec4<f32>,
  // wave2: (waveSigma, twistMax, _pad, amp) — the affine sheet-warp envelope (amp: spring-eased)
  wave2: vec4<f32>,
  // faceLo: (rose-umber trough.rgb (linear), _pad) — the warm-divergent ramp (FOLD B, 3-stop)
  faceLo: vec4<f32>,
  // faceMid: (ember-amber mid.rgb (linear), _pad)
  faceMid: vec4<f32>,
  // faceHi: (warm-wheat crest.rgb (linear), _pad)
  faceHi: vec4<f32>,
};

@group(0) @binding(0) var<uniform> u: LiquidGridUniforms;

${OETF_WGSL}

// ── The host noise basis (transcribes liquidGrid.ts hash21/valueNoise/potentialFBM) ──
// A quintic-faded 2D value-noise fbm potential — the SAME basis the dot-flow-field carries
// (so the suite speaks ONE noise basis). DECLARED ABOVE the curl splice (WGSL has no forward
// declaration — a function may only call one declared earlier).
fn hash21(x: f32, y: f32) -> f32 {
  var px = fract(x * 0.1031);
  var py = fract(y * 0.1031);
  var pz = fract(x * 0.1031);
  let d = px * (py + 33.33) + py * (pz + 33.33) + pz * (px + 33.33);
  px = px + d;
  py = py + d;
  pz = pz + d;
  return fract((px + py) * pz);
}

fn valueNoise(x: f32, y: f32) -> f32 {
  let ix = floor(x);
  let iy = floor(y);
  let fx = x - ix;
  let fy = y - iy;
  let ux = fx * fx * fx * (fx * (fx * 6.0 - 15.0) + 10.0);
  let uy = fy * fy * fy * (fy * (fy * 6.0 - 15.0) + 10.0);
  let a = hash21(ix, iy);
  let b = hash21(ix + 1.0, iy);
  let c = hash21(ix, iy + 1.0);
  let d2 = hash21(ix + 1.0, iy + 1.0);
  return mix(mix(a, b, ux), mix(c, d2, ux), uy);
}

// The 3-octave scalar fbm potential — the host noise basis the curl operator wraps.
fn potentialFBM(p: vec2f) -> f32 {
  var v = 0.0;
  var amp = 0.5;
  var freq = 1.0;
  var px = p.x;
  var py = p.y;
  for (var i = 0; i < 3; i = i + 1) {
    v = v + amp * valueNoise(px * freq, py * freq);
    // FBM_ROT mat2(0.8, 0.6, -0.6, 0.8) — same rotation as the shared chunk.
    let rx = 0.8 * px - 0.6 * py;
    let ry = 0.6 * px + 0.8 * py;
    px = rx;
    py = ry;
    freq = freq * 2.0;
    amp = amp * 0.5;
  }
  return v;
}

// The shared divergence-free 2D-curl operator (flow.wgsl.ts — the FIRST WGSL curl consumer).
${CURL_FBM_WGSL}

// The shared traveling-wave WARP chunk (waveField.wgsl.ts — waveFlow/cursorSwirl/
// travelingEnvelope + the FACE leaf; splices AFTER valueNoise + curlFBM are declared). liquid-grid
// + concentric read the SAME waveFlow continuous affine sheet-warp (the DRY coupling — a leaf
// tune moves both).
${WAVE_FIELD_WGSL}

// ── §1 The crisp line: Ben Golus derivative-AA grid coverage (transcribes gridCoverage) ──
// targetWidth is the line half-width in grid units (lineWidthPx / minorPitchPx); uvDeriv is
// the per-axis screen-space derivative of g (length(vec2(dpdx, dpdy)) per axis). Returns
// line coverage [0..1] — exactly N device-pixels wide at ANY DPR/zoom (the blur-kill).
fn gridCoverage(g: vec2f, targetWidth: f32, uvDeriv: vec2f) -> f32 {
  // triangle wave per axis: 0 at a line, 1 at the cell center.
  let gridUV = 1.0 - abs(fract(g) * 2.0 - 1.0);
  let drawWidth = clamp(vec2f(targetWidth), uvDeriv, vec2f(0.5));
  let lineAA = uvDeriv * 1.5;
  // smoothstep with edge0 > edge1 (Golus) → a falling edge.
  var grid2 = smoothstep(drawWidth + lineAA, drawWidth - lineAA, gridUV);
  // preserve thin-line intensity where the line is sub-drawWidth.
  grid2 = grid2 * clamp(vec2f(targetWidth) / max(drawWidth, vec2f(1e-6)), vec2f(0.0), vec2f(1.0));
  // Moiré suppression: fade toward the average where the cell packs tighter than a pixel.
  grid2 = mix(grid2, vec2f(targetWidth), clamp(uvDeriv * 2.0 - 1.0, vec2f(0.0), vec2f(1.0)));
  return max(grid2.x, grid2.y);
}

// ── The 3-stop warm-divergent FACE ramp (FOLD B — height-keyed, NOT a 2-point mid-park) ──
// trough (faceLo) → mid (faceMid) → crest (faceHi), keyed on rampT = mix(shade, h). All stops
// are warm hue ∈ [20,90] (the teal-navy purge clear by construction). Linear-space stops; the
// fs_main routes the result through the production OETF (FOLD E).
fn faceRamp(rampT: f32) -> vec3f {
  let s = clamp(rampT, 0.0, 1.0);
  if (s < 0.5) {
    return mix(u.faceLo.rgb, u.faceMid.rgb, s * 2.0);
  }
  return mix(u.faceMid.rgb, u.faceHi.rgb, (s - 0.5) * 2.0);
}

// Full-screen-triangle (the pilot idiom): NDC corners (-1,-1),(3,-1),(-1,3) cover the
// viewport from a single 3-vertex draw — no vertex buffer.
struct VSOut {
  @builtin(position) pos: vec4f,
  @location(0) uv: vec2f,  // domain [-1,1]², aspect-corrected x
};

@vertex
fn vs_main(@builtin(vertex_index) vi: u32) -> VSOut {
  var corners = array<vec2f, 3>(
    vec2f(-1.0, -1.0), vec2f(3.0, -1.0), vec2f(-1.0, 3.0),
  );
  let c = corners[vi];
  var out: VSOut;
  out.pos = vec4f(c, 0.0, 1.0);
  out.uv = vec2f(c.x, c.y);
  return out;
}

@fragment
fn fs_main(in: VSOut) -> @location(0) vec4f {
  let aspect = max(u.warp2.y, 1e-4);
  // aspect-correct the domain x so the cells read square.
  let uv = vec2f(in.uv.x * aspect, in.uv.y);
  let t = u.u0.x;
  let gridScale = u.u0.y;

  // §5 the per-pixel kernel: AFFINE sheet-warp + cursor-swirl the grid coordinate, then two-tier
  // Golus. waveFlow is the SMOOTH continuous domain transform (the SAME warp concentric reads) —
  // a low-order curl-flow displacement gated by the traveling wave, locally affine at the cell
  // scale, so the sheet bows/shears as ONE coherent transform (major lines a single smooth curve,
  // no per-cell seam); cursorSwirl twists the cells about the finger. The Golus dv reads the FINAL
  // warped coord (the crisp-line fence survives).
  let g0 = uv * gridScale;
  // g0 is CELL-scale, so pass the tiny 0.03 curl-sampling frequency (== the JS
  // LIQUID_GRID_WARP_FREQ) so the warp is locally affine at the cell scale (major lines bow as ONE
  // smooth curve, no sub-cell crackle). Concentric passes 0.6 (its p is unit-scale).
  var g = waveFlow(g0, t, u.wave.xy, u.wave.z, u.wave.w, u.wave2.x, u.wave2.y, u.wave2.w, 0.03);
  if (u.cursor2.y > 0.5) {
    // bulgeMode (cursor2.x: +repel, −attract) signs the swirl direction.
    g = cursorSwirl(g, u.cursor.xy, u.cursor.z * u.cursor2.x, u.cursor.w);
  }

  // The screen-space derivative of g (Golus): length(vec2(dpdx, dpdy)) per axis. fwidth-class
  // derivative reads the ACTUAL backing-store pixel (NOT fwidthFine — Compatibility-Mode safe).
  let dv = vec2f(
    length(vec2f(dpdx(g.x), dpdy(g.x))),
    length(vec2f(dpdx(g.y), dpdy(g.y))),
  );

  let minor = gridCoverage(g, u.grid.x, dv);
  // The major tier evaluates at g / majorEvery with its own derivative scaling.
  let me = max(u.u0.w, 1.0);
  let major = gridCoverage(g / me, u.grid.y, dv / me);
  let line = max(minor * u.grid.z, major * u.grid.w);

  // ── The FACE — height-lit filled cell interior ──────────────────
  // Sample height/relief at the WARPED-space cell center (floor(g)+0.5, the cell the fragment
  // lands in under the affine warp); Lambert the ∇H slope against the fixed cel key-light; squash
  // the inset so the crest face inflates; multi-stop warm-divergent ramp keyed on mix(shade, h)
  // (FOLD B); the ink through the production OETF (FOLD E).
  let cc    = floor(g) + vec2f(0.5);
  let h     = cellHeight(cc, t, u.wave.xy, u.wave.z, u.wave.w, u.wave2.x, u.wave2.w);
  let grad  = faceRelief(cc, 1.0, t, u.wave.xy, u.wave.z, u.wave.w, u.wave2.x, u.wave2.w);
  let n     = normalize(vec3f(-grad * u.face.y, 1.0));
  let shade = clamp(0.5 + dot(n, normalize(vec3f(u.warp2.zw, 1.0))) * 0.5, 0.0, 1.0);
  let inset = u.face.w * (1.0 - u.face.z * h);            // squash & stretch
  let face  = facePlateau(g, inset, dv);
  let rampT = clamp(shade * 0.5 + h * 0.5, 0.0, 1.0);     // FOLD B — height-keyed crest
  let faceInk = clamp(linearToSrgb(faceRamp(rampT)), vec3f(0.0), vec3f(1.0));
  let faceA = face * u.face.x * u.field.x;                // FOLD D — one field-blend scalar

  let col = clamp(linearToSrgb(u.line.rgb), vec3f(0.0), vec3f(1.0));
  let hasBg = u.field.y;
  if (hasBg > 0.5) {
    // opaque ground: the face fills the cell, the ink over the themed bg, the line on top.
    let bg = clamp(linearToSrgb(u.bg.rgb), vec3f(0.0), vec3f(1.0));
    let base = mix(bg, faceInk, faceA);
    let a = line * u.field.x;
    let outRgb = mix(base, col, a);
    return vec4f(outRgb, 1.0);
  }
  // transparent ground: the FACE composites UNDER the line, the SOURCE-OVER operator in
  // PREMULTIPLIED space (the page reads through the gutters). faceAlpha:0 → faceA=0 → the face
  // term vanishes → vec4f(col·line, line) = the line-only render.
  let linePremult = (col * line) * u.field.x;            // line layer (the FieldAlpha global subtlety)
  let lineA = line * u.field.x;
  let facePremult = faceInk * faceA;                     // face layer premultiplied (faceA folds field.x)
  let outPremult = linePremult + facePremult * (1.0 - lineA);
  let a = lineA + faceA * (1.0 - lineA);
  return vec4f(outPremult, a);                           // premultiplied over transparent
}
`;
