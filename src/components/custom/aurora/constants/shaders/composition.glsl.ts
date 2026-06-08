// Aurora composition stage — the palette LUT + the multi-nuclei softmax field.
//
// `samplePalette` reads the CPU-baked linear-sRGB palette LUT; `nucleiField`
// accumulates the softmax-Gaussian over the active nuclei and applies the slow
// palette drift. IN: warped UV + time. OUT (nucleiField): (paletteId, valueMod).
// Spliced verbatim into FRAGMENT_SRC by the aurora.frag.ts assembler — the emitted
// shader string is character-equivalent to the prior hand-inlined source.
export const AURORA_COMPOSITION_GLSL = /* glsl */ `// ── Palette LUT (W5 — OKLCh/OKLab interpolation) ──────────────────────────────
// The endpoints stay CPU-baked to LINEAR sRGB (the Aras precompute pattern); only
// the BETWEEN-endpoint interpolation runs in perceptual space. AX.W11 — the ramp
// itself (the smoothstep ease + the OKLab-rectangular-vs-OKLCh-hue-arc dispatch on
// uHuePath) is the shared samplePaletteRamp from procedural-color.glsl, the SAME
// source the WebGPU twin splices; samplePalette here only selects the bracketing
// stop pair + the raw inter-stop t and hands them to the shared ramp.
vec3 samplePalette(float id) {
  id = clamp(id, 0.0, 1.0);
  float scaled = id * float(uStopCount - 1);
  int i0 = int(floor(scaled));
  int i1 = min(i0 + 1, uStopCount - 1);
  float t = fract(scaled);
  return samplePaletteRamp(uPalette[i0], uPalette[i1], t, uHuePath);
}

// ── Nuclei field ──────────────────────────────────────────────────────────
void nucleiField(vec2 p, float t, out float paletteId, out float valueMod) {
  float accumBias  = 0.0;
  float accumValue = 0.0;
  float accumW     = 0.0;
  for (int i = 0; i < MAX_NUCLEI; i++) {
    if (i >= uNucleiCount) break;
    vec2 posI = uNucleiPos[i]
              + uNucleiDriftRadius[i] * vec2(
                  cos(t * uNucleiDrift * K_NUCLEI + uNucleiDriftPhase[i]),
                  sin(t * uNucleiDrift * K_NUCLEI + uNucleiDriftPhase[i] * 1.13)
                );
    vec2 diff = p - posI;
    // Anisotropic Gaussian: rotate diff into the nucleus's local frame
    // (major axis along uNucleiAngle), then scale the major-axis component by
    // 1/elongation so the squared distance describes an ellipse. Defaults
    // 1.0/0.0 reduce to the isotropic dot(diff, diff).
    float ca = cos(uNucleiAngle[i]);
    float sa = sin(uNucleiAngle[i]);
    vec2  local = vec2( ca * diff.x + sa * diff.y,
                       -sa * diff.x + ca * diff.y);
    float along  = local.x / max(uNucleiElong[i], 0.01);
    float across = local.y;
    float d2 = along * along + across * across;
    float r = max(uNucleiRadius[i], 0.01);
    float w = exp(-uSoftmaxBeta * d2 / (r * r));
    accumBias  += w * uNucleiPaletteBias[i];
    accumValue += w * uNucleiValueBias[i];
    accumW     += w;
  }
  paletteId = accumBias  / max(accumW, 1e-4);
  valueMod  = accumValue / max(accumW, 1e-4);

  // Palette drift — slow global paletteId breathe between adjacent stops. The
  // rate rides K_PAL (perceptible ~30–60s hue cycle at the default coefficient);
  // the amplitude lifts the authored coefficient into a 0.03..0.06 paletteId band
  // so the palette visibly travels rather than dithering within one stop.
  float palAmp = clamp(uPaletteDrift * 6.0, 0.0, 0.06);
  paletteId += palAmp * sin(t * uPaletteDrift * K_PAL);
  paletteId = clamp(paletteId, 0.0, 1.0);
}
`;
