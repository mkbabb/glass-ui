// Goo-blob metaball OKLCh gamut-clamp and palette-sample helper
// chunk, held under the no-god-module line bound
// (a shared WGSL helper block spliced into the assembled shader).
//
// The hue-preserving inward chroma gamut clamp + the multi-stop palette sample
// (OKLab mix + midpoint chroma-bump) + the de-synced `breath` pulse. It references
// — as bare identifiers resolved
// at the ASSEMBLED-shader level — the Ottosson OKLCh matrices
// (`oklabToLinearSrgb`/`oklchToOklab`/`oklabToOklch`/`srgbToOklab`) declared by the
// `${OKLCH_MATRICES_WGSL}` splice metaball.wgsl.ts places IMMEDIATELY BEFORE this
// chunk, the `PI` const at the top of metaball.wgsl.ts, and the `u` Uniforms
// binding. It carries NO `${...}` splice of its own (so the device-free WGSL
// assembler resolves `${METABALL_PALETTE_WGSL}` to a complete body —
// and it is spliced before the full-screen-triangle
// vertex stage (the fixed ASSEMBLED body order — the color helpers precede the vertex stage).

export const METABALL_PALETTE_WGSL = /* wgsl */ `
// ── OKLCh gamut clamp (hue-preserving inward chroma clamp — blob-local) ──
fn inGamut(lin: vec3<f32>) -> bool {
  return all(lin >= vec3<f32>(0.0)) && all(lin <= vec3<f32>(1.0));
}
fn gamutClampOklch(lch: vec3<f32>) -> vec3<f32> {
  let lin = oklabToLinearSrgb(oklchToOklab(lch));
  if (inGamut(lin)) { return lch; }
  var lo = 0.0;
  var hi = lch.y;
  for (var i = 0; i < 16; i = i + 1) {
    let mid = 0.5 * (lo + hi);
    let test = vec3<f32>(lch.x, mid, lch.z);
    if (inGamut(oklabToLinearSrgb(oklchToOklab(test)))) { lo = mid; } else { hi = mid; }
  }
  return vec3<f32>(lch.x, lo, lch.z);
}

// Sample the multi-stop palette at t, OKLab mix + midpoint chroma-bump. Returns
// an OKLCh stop [L, C, h(rad)]. Falls back to uBaseColor when uStopCount <= 1.
fn samplePaletteOklch(t: f32) -> vec3<f32> {
  let uStopCount = u.ints.x;
  if (uStopCount <= 1) { return oklabToOklch(srgbToOklab(u.base.rgb)); }
  let n = f32(uStopCount);
  let ft = clamp(t, 0.0, 1.0) * (n - 1.0);
  let i0 = i32(floor(ft));
  let i1 = min(i0 + 1, uStopCount - 1);
  let f = ft - f32(i0);
  let labA = srgbToOklab(u.palette[i0].rgb);
  let labB = srgbToOklab(u.palette[i1].rgb);
  let lab = mix(labA, labB, f);
  var lch = oklabToOklch(lab);
  lch.y = lch.y + 0.03 * sin(PI * f);
  return lch;
}

// De-synced breath using three detuned sines at irrational ratios.
fn breath(phase: f32) -> f32 {
  return (sin(phase) + 0.5 * sin(phase * 1.4444 + 1.7) + 0.28 * sin(phase * 0.31 + 4.1)) / 1.78;
}
`;
