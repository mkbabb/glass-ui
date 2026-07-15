// BC.W-VIZ-CONSTELLATION — the POINTS render pass (WebGL2 instanced-arrays twin fallback).
//
// The byte-parity-able twin of constellation-points.wgsl.ts: the SAME crisp `fwidth`-
// smoothstep SDF circle + the SAME DPR-aware billboard-quad sizing — a GPU render (NOT a
// Canvas2D context), the genuinely-absent-tail honest path (the §E "no canvas anywhere"
// intent: the GL2 fallback is a GPU instanced render, not a 2D-drawing context). WebGL2 has
// no storage buffers, so the per-node data rides an INSTANCED vertex attribute (`aNode`,
// `vertexAttribDivisor(1)`); the quad corner rides `gl_VertexID` (6 verts/instance). The
// uniform block is the SAME ConstellationUniforms the WGSL reads (palette + geometry), here
// as plain GL uniforms. Warm-cream identity; premultiplied-alpha over the transparent clear.

export const CONSTELLATION_POINTS_VERT_GLSL = /* glsl */ `#version 300 es
precision highp float;

// per-instance node row (x, y, radius, dim) — vertexAttribDivisor(1).
layout(location = 0) in vec4 aNode;

uniform vec2 uResolution;
uniform float uDpr;
uniform float uKVis;

out vec2 vUv;   // [-1,1] billboard-local → fragment SDF coord
out float vDim;

void main() {
  // Two-triangle quad corners (the SAME order as the WGSL QUAD).
  vec2 quad[6] = vec2[6](
    vec2(-1.0, -1.0), vec2(1.0, -1.0), vec2(-1.0, 1.0),
    vec2(-1.0,  1.0), vec2(1.0, -1.0), vec2(1.0,  1.0)
  );
  vec2 corner = quad[gl_VertexID];

  vec2 centerPx = aNode.xy;
  // px (y-down) → clip (y-up).
  vec2 centerNdc = vec2(
    centerPx.x / max(uResolution.x, 1.0) * 2.0 - 1.0,
    1.0 - centerPx.y / max(uResolution.y, 1.0) * 2.0
  );
  // half-extent: radius·kVis CSS px → backing-store px (·dpr) → NDC half (·2/res).
  // (half is a GLSL reserved word — name it halfExt.)
  float radPx = aNode.z * uKVis * uDpr;
  vec2 halfExt = vec2(
    radPx / max(uResolution.x, 1.0) * 2.0,
    radPx / max(uResolution.y, 1.0) * 2.0
  );

  gl_Position = vec4(centerNdc + corner * halfExt, 0.0, 1.0);
  vUv = corner;
  vDim = aNode.w;
}
`;

export const CONSTELLATION_POINTS_FRAG_GLSL = /* glsl */ `#version 300 es
precision highp float;

uniform vec4 uNode;      // premultiplied-ready rgba
uniform vec4 uNodeDim;
uniform float uOpacityCeiling;

in vec2 vUv;
in float vDim;
out vec4 fragColor;

void main() {
  // SDF: distance to the unit-circle edge (0 at the rim, neg inside).
  float d = length(vUv) - 1.0;
  // fwidth(d) — the pixel footprint, the resolution-independent AA width.
  float aa = max(fwidth(d), 1e-4);
  float coverage = 1.0 - smoothstep(-aa, aa, d);
  if (coverage <= 0.0) { discard; }
  vec4 col = mix(uNode, uNodeDim, vDim);
  float a = col.a * coverage * uOpacityCeiling;
  fragColor = vec4(col.rgb * a, a); // premultiplied
}
`;
