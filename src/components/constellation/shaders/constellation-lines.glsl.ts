// BC.W-VIZ-CONSTELLATION — the LINES render pass (WebGL2 instanced-arrays twin fallback).
//
// The byte-parity-able twin of constellation-lines.wgsl.ts: the SAME instanced segment-quad
// expansion (the ORTHOGONAL screen-space offset, DPR-aware half-width) + the SAME cross-line
// `smoothstep` AA + the SAME three edge classes (neutral · accent tether · focus pointer-
// web). A GPU instanced render (NOT Canvas2D). The per-edge data rides TWO instanced vertex
// attributes (`aAB` = a.xy/b.xy, `aW` = alpha/accent/focus/_pad; `vertexAttribDivisor(1)`);
// the quad corner rides `gl_VertexID` (6 verts/instance). Warm-cream identity; premultiplied
// alpha over the transparent clear.

export const CONSTELLATION_LINES_VERT_GLSL = /* glsl */ `#version 300 es
precision highp float;

// per-instance edge rows — vertexAttribDivisor(1).
layout(location = 0) in vec4 aAB;  // (a.x, a.y, b.x, b.y)
layout(location = 1) in vec4 aW;   // (alpha, accent, focus, _pad)

uniform vec2 uResolution;
uniform float uDpr;
uniform float uKVis;
uniform float uLineWidth;

out float vLineCoord;
out float vAlpha;
out float vAccent;
out float vFocus;

void main() {
  vec2 quad[6] = vec2[6](
    vec2(-1.0, -1.0), vec2(1.0, -1.0), vec2(-1.0, 1.0),
    vec2(-1.0,  1.0), vec2(1.0, -1.0), vec2(1.0,  1.0)
  );
  vec2 alongQuad = quad[gl_VertexID];

  vec2 a = aAB.xy;
  vec2 b = aAB.zw;
  vec2 dir = normalize(b - a + vec2(1e-6, 0.0));
  vec2 ortho = vec2(-dir.y, dir.x);
  // accent tether reads a touch heavier (1.1×).
  float halfWPx = uLineWidth * uKVis * uDpr * 0.5 * mix(1.0, 1.1, aW.y);
  vec2 p = mix(a, b, alongQuad.x * 0.5 + 0.5) + ortho * alongQuad.y * halfWPx;

  vec2 ndc = vec2(
    p.x / max(uResolution.x, 1.0) * 2.0 - 1.0,
    1.0 - p.y / max(uResolution.y, 1.0) * 2.0
  );

  gl_Position = vec4(ndc, 0.0, 1.0);
  vLineCoord = alongQuad.y;
  vAlpha = aW.x;
  vAccent = aW.y;
  vFocus = aW.z;
}
`;

export const CONSTELLATION_LINES_FRAG_GLSL = /* glsl */ `#version 300 es
precision highp float;

uniform vec4 uLine;     // premultiplied-ready rgba
uniform vec4 uAccent;
uniform float uAlphaGlobal;       // --constellation-alpha
uniform float uOpacityCeiling;
uniform float uEdgeAlpha;
uniform float uEdgeFocusAlpha;
uniform float uEdgeAccentAlpha;
uniform float uEdgeFloor;

in float vLineCoord;
in float vAlpha;
in float vAccent;
in float vFocus;
out vec4 fragColor;

void main() {
  float aaBand = 0.6;
  float cross = 1.0 - smoothstep(1.0 - aaBand, 1.0, abs(vLineCoord));
  if (cross <= 0.0) { discard; }

  float dim = uAlphaGlobal * uOpacityCeiling;
  vec4 col = uLine;
  float weight = (uEdgeAlpha * vAlpha + uEdgeFloor) * dim;
  if (vAccent > 0.5) {
    col = uAccent;
    weight = uEdgeAccentAlpha * vAlpha * dim;
  } else if (vFocus > 0.5) {
    col = uLine;
    weight = uEdgeFocusAlpha * uAlphaGlobal * uOpacityCeiling * vAlpha;
  }

  float a = col.a * weight * cross;
  if (a <= 0.0) { discard; }
  fragColor = vec4(col.rgb * a, a);
}
`;
