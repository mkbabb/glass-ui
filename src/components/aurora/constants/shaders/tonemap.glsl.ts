// Aurora tonemap stage — the Khronos PBR-Neutral tonemap. IN: linear color. OUT:
// tonemapped linear color (the film-grain + IGN dither + the mandatory linearToSrgb
// OETF close the seam at main() level, where they ride gl_FragCoord + time).
// Spliced verbatim into FRAGMENT_SRC by aurora.frag.ts.
//
// PBR-Neutral over Narkowicz ACES: ACES is a per-channel curve that skews saturated
// stops on the way to white (the blue→magenta drift visible on the van-Gogh saturated
// cobalt/indigo). PBR-Neutral is HUE + SATURATION preserving — it desaturates only the
// near-white highlight roll-off and holds the chromatic mid-tones true, which is exactly
// what a designed [0,1]-exposed painterly backdrop wants (the §4.1 colorfulness metric
// also catches an ACES magenta-skew regression as a chroma swing off-band; PBR-Neutral
// keeps the chroma true). The function name stays `aces()` so the single main() call site
// (aurora.frag.ts) needs no edit — it is the tonemap slot, now filled by PBR-Neutral.
// The Khronos reference (`pbrNeutralToneMapping`, glTF Sample Viewer): a startCompression
// knee at 0.8 − 0.04, a hyperbolic highlight compression, and a luminance-anchored
// desaturation toward white only in the compressed highlight band.
export const AURORA_TONEMAP_GLSL = /* glsl */ `// Khronos PBR-Neutral tonemap (hue + saturation preserving)
vec3 aces(vec3 color) {
  const float startCompression = 0.8 - 0.04;
  const float desaturation = 0.15;
  float x = min(color.r, min(color.g, color.b));
  float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
  color -= offset;
  float peak = max(color.r, max(color.g, color.b));
  if (peak < startCompression) return clamp(color, 0.0, 1.0);
  float d = 1.0 - startCompression;
  float newPeak = 1.0 - d * d / (peak + d - startCompression);
  color *= newPeak / peak;
  float g = 1.0 - 1.0 / (desaturation * (peak - newPeak) + 1.0);
  return clamp(mix(color, newPeak * vec3(1.0), g), 0.0, 1.0);
}
`;
