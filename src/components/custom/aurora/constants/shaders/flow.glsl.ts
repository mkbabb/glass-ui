// Aurora flow stage — the directional flow-field used by the stroke + pastel/oil
// mediums. `flowField` dispatches the radial/swirl/diagonal/multi patterns, adds
// curl-noise perturbation, and blends a cursor-anchored swirl. IN: UV + time.
// OUT: unit flow direction. Spliced verbatim into FRAGMENT_SRC by aurora.frag.ts.
export const AURORA_FLOW_GLSL = /* glsl */ `// ── Flow field ────────────────────────────────────────────────────────────
vec2 flowField(vec2 p, float t) {
  vec2 dir = vec2(1.0, 0.0);
  if (uFlowPattern == 1) {
    // radial
    dir = normalize(p - uFlowFocal + 1e-4);
  } else if (uFlowPattern == 2) {
    // swirl — tangent to radial
    vec2 rad = normalize(p - uFlowFocal + 1e-4);
    dir = vec2(-rad.y, rad.x);
  } else if (uFlowPattern == 3) {
    // diagonal
    float a = radians(uFlowAngle);
    dir = vec2(cos(a), sin(a));
  } else if (uFlowPattern == 4) {
    // multi — curl-noise driven
    float n = fbm(p * 2.0 + t * 0.02);
    float a = n * 6.2831;
    dir = vec2(cos(a), sin(a));
  }
  // curl — perturb by noise. Radial gets much less curl so rays stay clean.
  if (uFlowCurl > 0.0) {
    float n = fbm(p * 3.0) - 0.5;
    float curlAmt = uFlowCurl;
    if (uFlowPattern == 1) curlAmt *= 0.25;  // radial: preserve ray clarity
    if (uFlowPattern == 2) curlAmt *= 0.55;  // swirl: allow moderate curl
    float a = atan(dir.y, dir.x) + n * 3.14159 * curlAmt;
    dir = vec2(cos(a), sin(a));
  }
  // cursor influence — swirl around the cursor position
  if (uCursorStrength > 0.001) {
    vec2 toCur = uCursor - p;
    float d = length(toCur);
    float r = max(uCursorRadius, 0.01);
    float w = exp(-(d * d) / (r * r * 0.5));
    // swirl tangent
    vec2 tangent = vec2(-toCur.y, toCur.x) / max(d, 1e-4);
    float a0 = atan(dir.y, dir.x);
    float a1 = atan(tangent.y, tangent.x);
    // blend angle
    float da = a1 - a0;
    da = atan(sin(da), cos(da)); // wrap to [-pi, pi]
    float a = a0 + da * w * uCursorStrength;
    dir = vec2(cos(a), sin(a));
  }
  return dir;
}
`;
