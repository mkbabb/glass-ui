// Aurora tonemap stage — the ACES filmic approximation. IN: linear color. OUT:
// tonemapped linear color (the film-grain + IGN dither + the mandatory linearToSrgb
// OETF close the seam at main() level, where they ride gl_FragCoord + time).
// Spliced verbatim into FRAGMENT_SRC by aurora.frag.ts.
export const AURORA_TONEMAP_GLSL = /* glsl */ `// ACES approximation
vec3 aces(vec3 x) {
  float a = 2.51;
  float b = 0.03;
  float c = 2.43;
  float d = 0.59;
  float e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}
`;
