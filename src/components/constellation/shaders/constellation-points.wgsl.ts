// BC.W-VIZ-CONSTELLATION — the POINTS render pass (WebGPU primary).
//
// THE headline fix: the low-res Canvas2D `arc()` becomes instanced billboard quads + a
// crisp `fwidth`-smoothstep SDF circle. WebGPU's `point-list` is hardwired 1×1px (the
// Metal/Vulkan/DX/GL backends disagree on point size) — useless for sized dots. So we draw
// `6 vertices × N` instances, one quad per node, the per-node center/radius/dim read from
// the `nodes` storage buffer by `instance_index`. The crispness comes from sizing `half` in
// REAL backing-store units (`· uDpr`) AND the fragment SDF edge — the node samples at full
// device resolution and is AA'd by the pixel-footprint derivative (`fwidth`), never the
// CSS-upscaled soft blob Canvas2D painted (the resolution-independent SDF-AA canon — the
// SAME `fwidth` discipline goo-blob + concentric use, ONE AA canon across the suite).
//
// The color is `mix(uNode, uNodeDim, dim)` — the warm-cream identity default (NO teal/navy;
// the palette is resolved JS-side off the `--constellation-*` tokens and written to the
// uniform buffer). Premultiplied-alpha output over the transparent clear.

export const CONSTELLATION_POINTS_WGSL = /* wgsl */ `
// ── Node storage row + uniforms (the typed-struct source-of-truth — uniformBridgeWGPU.ts) ──
struct Node {
  // (pos.x, pos.y, radius, dim)
  data: vec4<f32>,
};

struct ConstellationUniforms {
  // u0: (resolution.x, resolution.y, dpr, kVis)
  u0: vec4<f32>,
  // u1: (time, lineWidth, opacityCeiling, alpha)
  u1: vec4<f32>,
  // uEdge: (edgeAlpha, edgeFocusAlpha, edgeAccentAlpha, edgeFloor)
  uEdge: vec4<f32>,
  // colours (premultiplied-ready rgba)
  uNode: vec4<f32>,
  uNodeDim: vec4<f32>,
  uLine: vec4<f32>,
  uAccent: vec4<f32>,
};

@group(0) @binding(0) var<uniform> u: ConstellationUniforms;
@group(0) @binding(1) var<storage, read> nodes: array<Node>;

struct VSOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) uv: vec2<f32>,   // [-1,1] billboard-local → fragment SDF coord
  @location(1) dim: f32,        // 0 = full node, 1 = dim node
};

@vertex
fn vs_main(
  @builtin(vertex_index) vIdx: u32,
  @builtin(instance_index) iIdx: u32,
) -> VSOut {
  // Two-triangle quad corners in billboard-local space.
  var QUAD = array<vec2<f32>, 6>(
    vec2<f32>(-1.0, -1.0), vec2<f32>(1.0, -1.0), vec2<f32>(-1.0, 1.0),
    vec2<f32>(-1.0,  1.0), vec2<f32>(1.0, -1.0), vec2<f32>(1.0,  1.0),
  );
  let corner = QUAD[vIdx];

  let node = nodes[iIdx].data;
  let res = u.u0.xy;
  let dpr = u.u0.z;
  let kVis = u.u0.w;

  // center: node px → clip space (y-flip — px is y-down, clip is y-up).
  let centerPx = node.xy;
  let centerNdc = vec2<f32>(
    centerPx.x / max(res.x, 1.0) * 2.0 - 1.0,
    1.0 - centerPx.y / max(res.y, 1.0) * 2.0,
  );
  // half-extent: radius·kVis in CSS px → backing-store px (·dpr) → NDC half (·2/res).
  // (the DPR-aware crispness leg — the disc samples at device resolution.)
  // (half is a WGSL reserved keyword — name it halfExt.)
  let radPx = node.z * kVis * dpr;
  let halfExt = vec2<f32>(radPx / max(res.x, 1.0) * 2.0, radPx / max(res.y, 1.0) * 2.0);

  var out: VSOut;
  out.pos = vec4<f32>(centerNdc + corner * halfExt, 0.0, 1.0);
  out.uv = corner;
  out.dim = node.w;
  return out;
}

@fragment
fn fs_main(in: VSOut) -> @location(0) vec4<f32> {
  // SDF: distance to the unit-circle edge in billboard-local space (0 at the rim, neg inside).
  let d = length(in.uv) - 1.0;
  // fwidth(d) = |dpdx(d)| + |dpdy(d)| — the pixel footprint of the SDF, the resolution-
  // independent AA width (~1px band at ANY DPR/zoom/size).
  let aa = max(fwidth(d), 1e-4);
  let coverage = 1.0 - smoothstep(-aa, aa, d);
  if (coverage <= 0.0) { discard; }
  let col = mix(u.uNode, u.uNodeDim, in.dim);
  let a = col.a * coverage * u.u1.z;  // ·opacityCeiling
  // premultiplied-alpha output.
  return vec4<f32>(col.rgb * a, a);
}
`;
