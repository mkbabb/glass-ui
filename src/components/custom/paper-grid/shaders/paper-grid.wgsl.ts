// BC.W-VIZ-PAPERGRID — the liquid paper-grid fullscreen fragment pass (WebGPU primary).
//
// The same shape-class as aurora/concentric — a pure full-screen-triangle fragment pass (no
// vertex buffer, no compute, no storage buffer — the LIGHTEST viz in the suite). `fs_main`
// evaluates the grid at a WARPED coordinate `g(uv) = uv + curlWarp(uv,t) + cursorBulge(uv)`
// (the IQ domain-warp substitution f(p)→f(g(p)) driven by the Bridson divergence-free curl —
// the "liquid" that bows the whole sheet together, never a per-line jitter), and extracts
// each line as a crisp constant-pixel-width stroke via the Ben Golus screen-space derivative
// AA (the crisp-line fix — kills the CSS sub-pixel blur). Two tiers: a fine minor rule + a
// bolder major rule every `majorEvery` cells, composited brightest-wins. The ink is the warm
// `--foreground` identity over TRANSPARENT (the page reads through the cells); teal-on-navy
// is gone (§E REMOVE).
//
// THE SINGLE MATH SOURCE. `potentialFBM` / `curlWarp` / `cursorBulge` / `gridCoverage` below
// transcribe `composables/paperGrid.ts` line-for-line; `proof:viz-papergrid` clause P3
// round-trips the JS↔WGSL↔GLSL paths at a fixed sample set (the transcription-drift trap
// closed by a structural match + a numeric round-trip). The curl operator is the SHARED
// `flow.wgsl.ts` chunk (the FIRST WGSL curl consumer) — ONE curl source per backend.

import { OETF_WGSL } from "../../aurora/constants/shaders/procedural-color.wgsl";
import { CURL_FBM_WGSL } from "../../../../composables/glass/webgl/shaders/flow.wgsl";

export const PAPER_GRID_WGSL = /* wgsl */ `
const TAU: f32 = 6.283185307179586;

// ── Paper-grid uniforms (the typed-struct source-of-truth — see uniformBridgeWGPU.ts) ──
struct PaperGridUniforms {
  // u0: (uTime, uGridScale, uMinorPitch, uMajorEvery)
  u0: vec4<f32>,
  // warp: (uWarpScale, uWarpSpeed, uWarpScale2, uWarpSpeed2)
  warp: vec4<f32>,
  // warp2: (uAmplitude, uAspect, _pad, _pad)
  warp2: vec4<f32>,
  // grid: (uTargetWidth, uTargetWidthMajor, uMinorAlpha, uMajorAlpha)
  grid: vec4<f32>,
  // field: (uFieldAlpha, uHasBackground, _pad, _pad)
  field: vec4<f32>,
  // cursor: (uCursorX, uCursorY, uBulgeStrength, uBulgeRadius)
  cursor: vec4<f32>,
  // cursor2: (uBulgeMode, uInteractive, _pad, _pad)
  cursor2: vec4<f32>,
  // line: (uLineColor.rgb (linear), _pad)
  line: vec4<f32>,
  // bg: (uBg.rgb (linear), _pad)
  bg: vec4<f32>,
};

@group(0) @binding(0) var<uniform> u: PaperGridUniforms;

${OETF_WGSL}

// ── The host noise basis (transcribes paperGrid.ts hash21/valueNoise/potentialFBM) ──
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

// ── §3 The "liquid": the global curl-flow domain warp (transcribes paperGrid.ts curlWarp) ──
// TWO counter-flowing curl terms at different scales/speeds (Alex Harri counter-flow — never
// visibly loops). A SHALLOW, LOW-frequency warp keeps the lines a clearly-readable grid.
fn curlWarp(g: vec2f, t: f32) -> vec2f {
  let warpScale = u.warp.x;
  let warpSpeed = u.warp.y;
  let warpScale2 = u.warp.z;
  let warpSpeed2 = u.warp.w;
  let amp = u.warp2.x;
  let a = curlFBM(vec2f(g.x * warpScale + t * warpSpeed, g.y * warpScale + t * warpSpeed));
  let b = curlFBM(vec2f(g.x * warpScale2 - t * warpSpeed2, g.y * warpScale2 - t * warpSpeed2));
  return vec2f(a.x * amp + b.x * amp * 0.5, a.y * amp + b.y * amp * 0.5);
}

// ── §4 The pointer bulge: a LOCAL Gaussian warp (transcribes paperGrid.ts cursorBulge) ──
fn cursorBulge(g: vec2f) -> vec2f {
  let cursor = u.cursor.xy;
  let strength = u.cursor.z * u.cursor2.x;  // bulgeStrength × bulgeMode (+repel / −attract)
  let radius = max(u.cursor.w, 1e-4);
  let toC = g - cursor;
  let d = length(toC);
  let bulge = strength * exp(-(d * d) / (2.0 * radius * radius));
  if (d < 1e-5) { return vec2f(0.0); }
  return (toC / d) * bulge;
}

// ── §1 The crisp line: Ben Golus derivative-AA grid coverage (transcribes gridCoverage) ──
// targetWidth is the line half-width in GRID UNITS (lineWidthPx / minorPitchPx); uvDeriv is
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

  // §5 the per-pixel kernel: warp + bulge the grid coordinate, then two-tier Golus.
  var g = uv * gridScale;
  g = g + curlWarp(g, t);
  g = g + cursorBulge(g);

  // The screen-space derivative of g (Golus): length(vec2(dpdx, dpdy)) per axis. fwidth-class
  // derivative reads the ACTUAL backing-store pixel (NOT fwidthFine — Compatibility-Mode safe).
  let dv = vec2f(
    length(vec2f(dpdx(g.x), dpdy(g.x))),
    length(vec2f(dpdx(g.y), dpdy(g.y))),
  );

  let minor = gridCoverage(g, u.grid.x, dv);
  // The major tier evals at g / majorEvery with its own derivative scaling.
  let me = max(u.u0.w, 1.0);
  let major = gridCoverage(g / me, u.grid.y, dv / me);
  let line = max(minor * u.grid.z, major * u.grid.w);

  let col = clamp(linearToSrgb(u.line.rgb), vec3f(0.0), vec3f(1.0));
  let hasBg = u.field.y;
  if (hasBg > 0.5) {
    // opaque ground: composite the ink over the themed bg.
    let bg = clamp(linearToSrgb(u.bg.rgb), vec3f(0.0), vec3f(1.0));
    let a = line * u.field.x;
    let outRgb = mix(bg, col, a);
    return vec4f(outRgb, 1.0);
  }
  // transparent ground: the LINE carries the alpha — the page reads through the cells.
  let a = line * u.field.x;
  return vec4f(col * a, a);  // premultiplied over transparent
}
`;
