// BC.W-VIZ-CONSTELLATION — the LINES render pass (WebGPU primary).
//
// WebGPU's `line-list` is, like points, 1px-only + join-less — so the hairlines are
// instanced SEGMENT QUADS: for `edgeCount` edges, draw `6 verts × edgeCount` instances; the
// vertex shader loads the segment's two endpoints from the `edges` storage buffer, projects
// to screen space, and offsets the quad corners by the ORTHOGONAL of the screen-space line
// direction × half the pixel width (DPR-aware). A butt cap with no join is correct (the
// lattice is independent thin segments, not a continuous polyline). The fragment cross-line
// AA is a `smoothstep` on the cross-line coord so the hairline is itself crisp-edged.
//
// THREE edge classes (ONE pass): the NEUTRAL ambient edge (`palette.line` at the distance-
// falloff alpha), the ACCENT tether (`accent > 0` → `palette.accent` at the accent alpha),
// and the FOCUS pointer-web tether (`focus > 0` → `palette.line` at the focus alpha — the
// `drawPointerWeb` pass folded onto the SAME line pass via the cursor's "virtual node"
// edges, written by `appendPointerWeb`). Warm-cream identity (NO teal/navy); premultiplied
// alpha over the transparent clear.

export const CONSTELLATION_LINES_WGSL = /* wgsl */ `
struct Edge {
  // vec4 0: (a.x, a.y, b.x, b.y)
  ab: vec4<f32>,
  // vec4 1: (alpha, accent, focus, _pad)
  w: vec4<f32>,
};

struct ConstellationUniforms {
  // u0: (resolution.x, resolution.y, dpr, kVis)
  u0: vec4<f32>,
  // u1: (time, lineWidth, opacityCeiling, alpha)
  u1: vec4<f32>,
  // uEdge: (edgeAlpha, edgeFocusAlpha, edgeAccentAlpha, edgeFloor)
  uEdge: vec4<f32>,
  uNode: vec4<f32>,
  uNodeDim: vec4<f32>,
  uLine: vec4<f32>,
  uAccent: vec4<f32>,
};

@group(0) @binding(0) var<uniform> u: ConstellationUniforms;
@group(0) @binding(1) var<storage, read> edges: array<Edge>;

struct VSOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) lineCoord: f32,  // [-1,1] cross-line → fragment AA
  @location(1) alpha: f32,      // distance-falloff weight
  @location(2) accent: f32,     // accent flag (the flagged-node tether tint)
  @location(3) focus: f32,      // focus flag (the pointer-web tether)
};

@vertex
fn vs_main(
  @builtin(vertex_index) vIdx: u32,
  @builtin(instance_index) iIdx: u32,
) -> VSOut {
  var QUAD = array<vec2<f32>, 6>(
    vec2<f32>(-1.0, -1.0), vec2<f32>(1.0, -1.0), vec2<f32>(-1.0, 1.0),
    vec2<f32>(-1.0,  1.0), vec2<f32>(1.0, -1.0), vec2<f32>(1.0,  1.0),
  );
  let alongQuad = QUAD[vIdx];

  let e = edges[iIdx];
  let a = e.ab.xy;
  let b = e.ab.zw;
  let res = u.u0.xy;
  let dpr = u.u0.z;
  let kVis = u.u0.w;
  let lineW = u.u1.y;

  // Screen-space segment direction + orthogonal (the half-width offset axis).
  let dir = normalize(b - a + vec2<f32>(1e-6, 0.0));
  let ortho = vec2<f32>(-dir.y, dir.x);
  // Lerp along the segment (alongQuad.x ∈ [-1,1] → [0,1]); offset by ortho × half-width.
  // The accent tether reads a touch heavier (1.1× the neutral width).
  let halfWPx = lineW * kVis * dpr * 0.5 * mix(1.0, 1.1, e.w.y);
  let p = mix(a, b, alongQuad.x * 0.5 + 0.5) + ortho * (alongQuad.y) * halfWPx;

  // px (y-down) → clip (y-up).
  let ndc = vec2<f32>(
    p.x / max(res.x, 1.0) * 2.0 - 1.0,
    1.0 - p.y / max(res.y, 1.0) * 2.0,
  );

  var out: VSOut;
  out.pos = vec4<f32>(ndc, 0.0, 1.0);
  out.lineCoord = alongQuad.y;
  out.alpha = e.w.x;
  out.accent = e.w.y;
  out.focus = e.w.z;
  return out;
}

@fragment
fn fs_main(in: VSOut) -> @location(0) vec4<f32> {
  // Cross-line AA — a smoothstep on |lineCoord| so the hairline edge is crisp.
  let aaBand = 0.6;
  let cross = 1.0 - smoothstep(1.0 - aaBand, 1.0, abs(in.lineCoord));
  if (cross <= 0.0) { discard; }

  let dim = u.u1.w * u.u1.z; // alpha · opacityCeiling
  // Resolve the edge class: accent tether · focus pointer-web · neutral ambient.
  var col = u.uLine;
  var weight = (u.uEdge.x * in.alpha + u.uEdge.w) * dim; // edgeAlpha·falloff + edgeFloor
  if (in.accent > 0.5) {
    col = u.uAccent;
    weight = u.uEdge.z * in.alpha * dim; // edgeAccentAlpha
  } else if (in.focus > 0.5) {
    col = u.uLine;
    weight = u.uEdge.y * u.u1.w * u.u1.z * in.alpha; // edgeFocusAlpha · alpha · ceiling
  }

  let a = col.a * weight * cross;
  if (a <= 0.0) { discard; }
  return vec4<f32>(col.rgb * a, a);
}
`;
