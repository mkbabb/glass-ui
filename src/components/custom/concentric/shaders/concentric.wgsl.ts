// BD.W-CONCENTRIC-RELIEF — concentric = a living level-set hypsometric SURVEY (WebGPU primary).
//
// concentric is the liquid-grid's traveling-wave CELL-WARP applied to a LOW-octave topography
// H(p,t), rendered as the level-set ISO-CONTOURS of H over an OPAQUE warm hypsometric FILL: a
// tanh tone expansion, one analytic hillshade for 2.5-D relief, and a two-tier index/minor
// contour hierarchy inked via the IQ gradient-free `contourInk` (the contour density tracks
// 1/|∇H|, bunched on steep ground). The wave flows the contours as it crosses; the cursor
// HEAVES the topography toward the pointer with velocity-scaled weight. The output is OPAQUE.
//
// THE SINGLE MATH SOURCE. `heightField` / `cellTwist` / `waveSwell` are the SHARED `waveField`
// leaf (the SAME liquid-grid splices); `sampleHeight` transcribes `composables/levelField.ts`,
// and the finishing reads (tone/hillshade/isIndex) transcribe its oracle twins. `proof:concentric`
// round-trips the JS↔GLSL↔WGSL numeric identity at a fixed level-boundary sample lattice.

import {
    OETF_WGSL,
    OKLCH_MATRICES_WGSL,
} from "../../aurora/constants/shaders/procedural-color.wgsl";
import { CURL_FBM_WGSL } from "../../../../composables/glass/webgl/shaders/flow.wgsl";
import { WAVE_FIELD_WGSL } from "../../../../composables/glass/wave/waveField.wgsl";

export const CONCENTRIC_WGSL = /* wgsl */ `
const PI: f32 = 3.141592653589793;
const TAU: f32 = 6.283185307179586;
const MAX_RING_STOPS: i32 = 4;

// ── Concentric uniforms (the typed-struct source-of-truth — see uniformBridgeWGPU.ts) ──
struct ConcentricUniforms {
  // u0: (uTime, uSpeed, uCellSize, _pad)
  u0: vec4<f32>,
  // ints: (_pad, _pad, uStopCount, _pad)
  ints: vec4<i32>,
  // bg: (background.rgb (linear), hasBackground)
  bg: vec4<f32>,
  // norm: (uFieldNorm, uAspect, lightDirX, lightDirY)
  norm: vec4<f32>,
  // line: (lineHalfWidth, aaSoftness, contourLevels, indexEvery)
  line: vec4<f32>,
  // wave: (waveDirX, waveDirY, waveK, waveOmega)
  wave: vec4<f32>,
  // wave2: (waveSigma, twistMax, shearMax, amp)
  wave2: vec4<f32>,
  // topo: (heightOctaves, heightSeed, swellAmp, perturbAmp)
  topo: vec4<f32>,
  // cursor: (cursorX, cursorY, cursorWell, interactive)
  cursor: vec4<f32>,
  // tune: (toneGain, shadeAmp, indexMul, inkDarken)
  tune: vec4<f32>,
  // each palette stop: linear-sRGB rgb + _pad
  palette: array<vec4<f32>, 4>,
};

@group(0) @binding(0) var<uniform> u: ConcentricUniforms;

${OETF_WGSL}
${OKLCH_MATRICES_WGSL}

// Full-screen-triangle (the pilot idiom).
struct VSOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) uv: vec2<f32>,
};

@vertex
fn vs_main(@builtin(vertex_index) vi: u32) -> VSOut {
  var corners = array<vec2<f32>, 3>(
    vec2<f32>(-1.0, -1.0), vec2<f32>(3.0, -1.0), vec2<f32>(-1.0, 3.0),
  );
  let c = corners[vi];
  var out: VSOut;
  out.pos = vec4<f32>(c, 0.0, 1.0);
  out.uv = vec2<f32>(c.x, c.y);
  return out;
}

// ── The host noise basis (the SAME quintic-faded value-noise the suite speaks) ──
fn hash21(x: f32, y: f32) -> f32 {
  var px = fract(x * 0.1031);
  var py = fract(y * 0.1031);
  var pz = fract(x * 0.1031);
  let d = px * (py + 33.33) + py * (pz + 33.33) + pz * (px + 33.33);
  px = px + d; py = py + d; pz = pz + d;
  return fract((px + py) * pz);
}
fn valueNoise(x: f32, y: f32) -> f32 {
  let ix = floor(x); let iy = floor(y);
  let fx = x - ix; let fy = y - iy;
  let ux = fx * fx * fx * (fx * (fx * 6.0 - 15.0) + 10.0);
  let uy = fy * fy * fy * (fy * (fy * 6.0 - 15.0) + 10.0);
  let a = hash21(ix, iy);
  let b = hash21(ix + 1.0, iy);
  let c = hash21(ix, iy + 1.0);
  let d2 = hash21(ix + 1.0, iy + 1.0);
  return mix(mix(a, b, ux), mix(c, d2, ux), uy);
}
// The single-octave potential the curl operator wraps + the height field samples.
fn potentialFBM(p: vec2f) -> f32 {
  var v = 0.0; var amp = 0.5; var freq = 1.0;
  var px = p.x; var py = p.y;
  for (var i = 0; i < 3; i = i + 1) {
    v = v + amp * valueNoise(px * freq, py * freq);
    let rx = 0.8 * px - 0.6 * py;
    let ry = 0.6 * px + 0.8 * py;
    px = rx; py = ry; freq = freq * 2.0; amp = amp * 0.5;
  }
  return v;
}

// The shared curl + wave chunks (splice AFTER valueNoise + potentialFBM are declared).
${CURL_FBM_WGSL}
${WAVE_FIELD_WGSL}

fn smoothstepEdge(e0: f32, e1: f32, x: f32) -> f32 {
  let t = clamp((x - e0) / max(e1 - e0, 1e-6), 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
}

// The level-set height at domain p (transcribes levelField.ts sampleHeight). The sampling
// coordinate is cell-twisted (the SAME wave that twists liquid-grid cells — kinship); the
// height is a low-octave topography + the swell + the cursor peak.
fn sampleHeight(p: vec2f, t: f32) -> f32 {
  // The CONTINUOUS traveling-wave flow warp (no per-cell seam — the contours flow + twist as
  // the wave passes OVER and THROUGH them, the SAME wave that twists the liquid-grid cells).
  // BG.W-GRID-AFFINE — p is UNIT-scale here (span ~1), so the curl-sampling frequency is the
  // unit-scale 0.6 (liquid-grid's cell-scale g0 passes the tiny 0.03); behaviour unchanged.
  var g = waveFlow(p, t, u.wave.xy, u.wave.z, u.wave.w, u.wave2.x, u.wave2.y, u.wave2.w, 0.6);
  if (u.cursor.w > 0.5) {
    g = cursorSwirl(g, u.cursor.xy, u.cursor.z * 0.6, u.u0.z * 2.5);
  }
  // Sample the topography at a LOW base frequency so the basins are BROAD nested loops (a
  // readable contour map — not a fine speckle). heightOctaves carries the fractal detail.
  var H = heightField(g * 0.9, u.topo.x, u.topo.y);
  H = H + u.topo.z * waveSwell(t, u.topo.y);
  if (u.cursor.w > 0.5) {
    let d = p - u.cursor.xy;
    let d2 = dot(d, d);
    // The cursor HEAVE — a SOFT bulge (a Gaussian peak feathered by a smoothstep falloff so
    // the heave is C1-smooth, NOT the hard-edged quad the old dark render showed). The well
    // depth/radius already carry the velocity-HEAVE scale (packed JS-side into u.cursor.z).
    // Clamp the exp argument (the Gaussian is 0 far past the well anyway) so a parked/far cursor
    // NEVER feeds an EXTREME -d2/sigma into exp(): a huge negative argument overflows the int32
    // range-reduction step of WebKit/Metal's fast-math exp() -> NaN -> the whole field NaNs ->
    // the SILENT blank concentric painted in Safari. exp(-60)~=0, numerically transparent here.
    let g0 = exp(-min(d2 / 0.22, 60.0));
    let fall = smoothstepEdge(0.0, 0.55, exp(-min(d2 / 0.6, 60.0)));
    H = H + u.cursor.z * g0 * fall;
  }
  return H;
}

// The IQ gradient-free level-set contour ink — KEPT BYTE-FROZEN (the perfect GPU AA). It is
// FED the per-level half-width 'hw' (a parameter, NOT a re-derivation): de_contour =
// |fract(fN + 0.5) − 0.5| / fwidth(fN). The contour density tracks 1/|∇H| automatically.
// 'aaW' floors against a DPR-aware minimum so the index line stays CONTINUOUS where the heave
// packs contours (steep |∇H| saturates fwidth — challenge R4).
// FED both the per-level half-width 'hw' AND the per-fragment AA width 'aaW' (parameters, NOT a
// re-derivation): a fragment-derivative builtin (fwidth) inside a HELPER fn is a WebKit/Metal-
// WebGPU codegen hazard, so the derivative is hoisted to fs_main's uniform control flow (the ONE
// fwidth(fN) site) and FED here — this helper is DERIVATIVE-FREE (the Safari-safe discipline).
fn contourInk(fN: f32, hw: f32, aaW: f32) -> f32 {
  let band = abs(fract(fN + 0.5) - 0.5);
  return 1.0 - smoothstepEdge(hw, hw + u.line.y, band / aaW);
}

// Static-index palette fetch — NO dynamic uniform-array indexing (a WebKit/Metal-WebGPU
// argument-buffer codegen hazard). The 4-stop cap is unrolled so every read is a CONSTANT index.
fn paletteStop(idx: i32) -> vec3<f32> {
  if (idx <= 0) { return u.palette[0].rgb; }
  else if (idx == 1) { return u.palette[1].rgb; }
  else if (idx == 2) { return u.palette[2].rgb; }
  return u.palette[3].rgb;
}

// Sample the multi-stop palette (linear-sRGB stops, OKLab mix). t in [0,1].
fn samplePaletteLin(t: f32) -> vec3<f32> {
  let stopCount = u.ints.z;
  if (stopCount <= 1) { return u.palette[0].rgb; }
  let n = f32(stopCount);
  let ft = clamp(t, 0.0, 1.0) * (n - 1.0);
  let i0 = i32(floor(ft));
  let i1 = min(i0 + 1, stopCount - 1);
  let f = ft - f32(i0);
  let labA = LMS_TO_OKLAB * cbrt3(LINEAR_SRGB_TO_LMS * paletteStop(i0));
  let labB = LMS_TO_OKLAB * cbrt3(LINEAR_SRGB_TO_LMS * paletteStop(i1));
  return oklabToLinearSrgb(mix(labA, labB, f));
}

// The SHARED hillshade finite-diff epsilon — pinned ONCE (mirrors levelField.HILLSHADE_EPSILON
// + the GLSL twin; a per-backend drift would red the L6 numeric parity).
const HILLSHADE_E: f32 = 0.012;

@fragment
fn fs_main(in: VSOut) -> @location(0) vec4<f32> {
  let aspect = max(u.norm.y, 1e-4);
  let p = vec2<f32>(in.uv.x * aspect, in.uv.y);
  let t = u.u0.x * u.u0.y;
  let levels = max(u.line.z, 1.0);

  // The level-set topography (the KEPT field — the PRIMARY path).
  let H = sampleHeight(p, t);

  // ── 1. HYPSOMETRIC TONE — tanh expands the compressed band so basins+ridges hit the ramp
  //    ENDS (the live lumVar-flat cause). samplePaletteLin is the KEPT OKLab operator.
  let tone = 0.5 + 0.5 * tanh(H * u.tune.x);
  var fill = samplePaletteLin(tone);

  // ── 2. ANALYTIC HILLSHADE — one ∇H finite-diff at the SHARED e, dotted with the fixed cel
  //    light → 2.5-D relief. A read-only re-sample of sampleHeight (no second field).
  let e = HILLSHADE_E;
  let hx = sampleHeight(p + vec2<f32>(e, 0.0), t) - sampleHeight(p - vec2<f32>(e, 0.0), t);
  let hy = sampleHeight(p + vec2<f32>(0.0, e), t) - sampleHeight(p - vec2<f32>(0.0, e), t);
  let grad = vec2<f32>(hx, hy) / (2.0 * e);
  let L = normalize(u.norm.zw + vec2<f32>(1e-5, 1e-5));
  let shade = 0.5 + 0.5 * clamp(dot(normalize(grad + vec2<f32>(1e-5)), L), -1.0, 1.0);
  fill = fill * mix(1.0 - u.tune.y, 1.0 + u.tune.y, shade);

  // ── 3. TWO-TIER INDEX/MINOR CONTOUR — isIndex a pure f(level) (floor + mod + select, NOT a
  //    state buffer); the per-level half-width hw is FED to the byte-frozen contourInk.
  //    The per-contour wobble is a CONTINUOUS function of H (NOT floor(H·levels)): a floor()
  //    inside fN jumps at every band boundary → tears the contour + explodes fwidth(fN) there
  //    (the torn-arc artifact). The smooth phase keeps fN monotone (perturbAmp·2.4 < 1).
  let fN = H * levels + u.topo.w * sin(H * levels * 2.4 + t * 0.7);
  let indexEvery = max(u.line.w, 1.0);
  let lvl = floor(fN);
  let isIndex = select(0.0, 1.0, fract(lvl / indexEvery) < (0.5 / indexEvery));
  let hw = mix(u.line.x, u.line.x * u.tune.z, isIndex);
  // Density fade — the IQ frequency-limit: when the level lines pack so tightly that this line's
  // own half-width (hw px, in fN units = hw·fwidth(fN)) approaches the 0.5 half-spacing, the IQ AA
  // band would FLOOD (band/aaW < hw everywhere → ink saturates to 1 → the contours merge into a
  // solid wash whose bright gaps read as DASHES). Fade the stroke out as it crosses that limit
  // (hw-aware, so the heavier index line fades before the finer minor) → the over-dense ground
  // reads as smooth relief, the resolvable contours stay CONTINUOUS unbroken bands. Recomputes
  // the SAME fwidth(fN) contourInk floors on (6e-4) — no second field, no re-derivation.
  // The ONE fwidth(fN) derivative site — in fs_main's UNIFORM control flow (a fragment-
  // derivative builtin inside a helper is the WebKit/Metal codegen hazard; see the GLSL twin).
  // The SAME aaW feeds the contourInk stroke AND the density-fade — no second field.
  let aaW = max(fwidth(fN), 6e-4);
  let hwAA = hw * aaW;
  let dfade = 1.0 - smoothstepEdge(0.30, 0.48, hwAA);
  let ink = clamp(contourInk(fN, hw, aaW), 0.0, 1.0) * dfade;

  // ── 4. INK = a darker ember of the LOCAL fill (the edge-of-its-own-band signature).
  let inkCol = mix(fill, fill * u.tune.w, 0.85);

  // ── 5. ONE color path + OPAQUE OUT — the viz IS the colorful field, never lines-over-nothing.
  //    Per-mode is resolved in the CONSUMED stops + the bg token (no in-shader uMode branch).
  let col = mix(fill, inkCol, ink);
  return vec4<f32>(clamp(linearToSrgb(col), vec3<f32>(0.0), vec3<f32>(1.0)), 1.0);
}
`;
