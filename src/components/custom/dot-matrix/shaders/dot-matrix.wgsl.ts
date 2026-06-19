// BC.W-VIZ-DOTMATRIX — the instanced-billboard dot-sphere RENDER pass (WebGPU primary).
//
// The §T4 SOTA shape for sized dots on WebGPU: `draw(6, N)` — 6 quad corners selected by
// `vertex_index`, per-dot data read by `instance_index` from the STATIC phyllotaxis
// buffer. WebGPU `point-list` is hardwired to 1×1 px (the APIs disagree on point size —
// useless for sized dots), so the SOTA is instanced billboard quads camera-facing by
// construction (only the dot CENTER rotates; the quad always faces the screen). The
// fragment is the crisp `fwidth`-smoothstep SDF circle (the ONE AA canon across the suite)
// — the band is ALWAYS ~1px wide regardless of DPR/zoom/dot-size, so fine dots stay crisp
// even sub-2px. The `fwidth` lives in `fs_main` ONLY (never a vs_main-reachable helper —
// the dual-module WGSL-validation trap).
//
// The §T2 depth-fade makes it READ as a sphere: each dot's rotated surface normal IS the
// normalized dot position; the facing term (the rotated-normal's z) modulates opacity +
// size by a SOFT falloff (NOT a back-face cull), so the near hemisphere reads brighter +
// larger while the rim/far side fade toward near-invisible — a translucent dot-SHELL even
// when the spin is stopped. No depth-test sort: the depth-fade opacity does the occlusion
// implicitly (far dots already dim → read as behind), the COBE/Stripe register.
//
// The dot color rides the shared `procedural-color.wgsl.ts` OKLCh ramp (the ONE color
// source); the depth-fade multiplies the sampled stop's luminance. Premultiplied-alpha
// blend over the (transparent / near-black) clear. The math (`fibonacciDot`/`facingFade`/
// `spinMatrix`/`breathRadius`) transcribes `dotMatrixField.ts` line-for-line; the dots
// buffer carries the JS-computed phyllotaxis positions (the round-trip parity anchor).

import {
    OETF_WGSL,
    OKLCH_MATRICES_WGSL,
} from "../../aurora/constants/shaders/procedural-color.wgsl";

export const DOT_MATRIX_WGSL = /* wgsl */ `
const PI: f32 = 3.141592653589793;
const TAU: f32 = 6.283185307179586;
const MAX_DOT_STOPS: i32 = 4;
// The golden-angle constant (transcribes dotMatrixField.ts GOLDEN_ANGLE = PI*(3-sqrt5)).
const GOLDEN_ANGLE: f32 = 2.399963229728653;

struct Dot {
  // (unitPos.xyz, sphereIdx)
  data: vec4<f32>,
};

// ── Render uniforms (the typed-struct source-of-truth — see uniformBridgeWGPU.ts) ──
struct Uniforms {
  // u0: (uResolutionX, uResolutionY, uDpr, uTime)
  u0: vec4<f32>,
  // u1: (uRadius, uDotSize, uBaseOpacity, uAspect)
  u1: vec4<f32>,
  // u2: (uFacingLo, uFacingHi, uSizeLo, uSizeHi)
  u2: vec4<f32>,
  // u3: (uParallax, uPointerPush, uPointerBloom, uPointerActive)
  u3: vec4<f32>,
  // u4: (uPointerX, uPointerY, uSphere2Scale, uBreathRadius)
  u4: vec4<f32>,
  // u5: (uSphere2OffsetX, uSphere2OffsetY, uHasBackground, _pad)
  u5: vec4<f32>,
  spin: mat3x3<f32>,
  // ints: (uStopCount, uDotCount, uSpheres, _pad)
  ints: vec4<i32>,
  // bg: (background.rgb, _pad)
  bg: vec4<f32>,
  palette: array<vec4<f32>, 4>,
};

@group(0) @binding(0) var<uniform> u: Uniforms;
@group(0) @binding(1) var<storage, read> dots: array<Dot>;

${OETF_WGSL}
${OKLCH_MATRICES_WGSL}

// The §T2 depth-fade (transcribes dotMatrixField.ts facingFade): the rotated-normal's z
// → a SOFT facing term → opacity + size ramps. NOT a binary back-face cull.
fn facingTerm(n: vec3<f32>) -> f32 {
  return clamp(n.z * 0.5 + 0.5, 0.0, 1.0);   // 1 = dead-front, 0 = dead-back
}

// Sample the multi-stop palette (linear-sRGB stops, OKLab mix). t in [0,1].
fn samplePaletteLin(t: f32) -> vec3<f32> {
  let stopCount = u.ints.x;
  if (stopCount <= 1) { return u.palette[0].rgb; }
  let n = f32(stopCount);
  let ft = clamp(t, 0.0, 1.0) * (n - 1.0);
  let i0 = i32(floor(ft));
  let i1 = min(i0 + 1, stopCount - 1);
  let f = ft - f32(i0);
  let labA = LMS_TO_OKLAB * cbrt3(LINEAR_SRGB_TO_LMS * u.palette[i0].rgb);
  let labB = LMS_TO_OKLAB * cbrt3(LINEAR_SRGB_TO_LMS * u.palette[i1].rgb);
  return oklabToLinearSrgb(mix(labA, labB, f));
}

struct VSOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) local: vec2<f32>,   // [-1,1] billboard-local coords for the SDF circle
  @location(1) bright: f32,        // facing-driven brightness [0, ~1.6]
  @location(2) alpha: f32,         // facing-driven opacity
  @location(3) tone: f32,          // palette tone (0 = bright cream near-front, 1 = amber rim)
};

@vertex
fn vs_main(
  @builtin(vertex_index) vi: u32,
  @builtin(instance_index) ii: u32,
) -> VSOut {
  // Two-triangle quad corners in billboard-local space (camera-facing by construction).
  var corners = array<vec2<f32>, 6>(
    vec2<f32>(-1.0, -1.0), vec2<f32>(1.0, -1.0), vec2<f32>(-1.0, 1.0),
    vec2<f32>(-1.0, 1.0), vec2<f32>(1.0, -1.0), vec2<f32>(1.0, 1.0),
  );
  let local = corners[vi];

  let dot = dots[ii].data;
  var unitPos = dot.xyz;          // the STATIC phyllotaxis position (JS-computed)
  let sphereIdx = dot.w;

  // The breathing radius pulse (transcribes breathRadius — 1 at rest).
  let breath = u.u4.w;
  // Per-sphere offset/scale (the reference two-globe composition).
  var sphereScale = u.u1.x;       // uRadius
  var sphereOffset = vec2<f32>(0.0, 0.0);
  if (sphereIdx > 0.5) {
    sphereScale = u.u1.x * u.u4.z;             // uRadius * uSphere2Scale
    sphereOffset = vec2<f32>(u.u5.x, u.u5.y);  // uSphere2Offset
  }

  // The rotated surface NORMAL = spin · unitPos (the §T2 facing source). The spin matrix
  // is the slow tilted Y-rotation (dotMatrixField.ts spinMatrix).
  let n = u.spin * unitPos;
  let facing = facingTerm(n);

  // Pointer-repel/attract — a soft Gaussian dimple lifts the dot radially off the surface
  // near the cursor (the §T7 local perturbation). The pointer is in NDC (-1..1); a repel
  // (push>0) pushes the dot OUT, an attract (push<0) pulls IN. Velocity scales the push.
  let pAct = u.u3.w;
  let pointerNdc = vec2<f32>(u.u4.x * 2.0 - 1.0, 1.0 - u.u4.y * 2.0);
  let screenN = n.xy * sphereScale + sphereOffset;
  let toPointer = screenN - pointerNdc;
  let pd = length(toPointer);
  let dimple = exp(-pd * pd * 18.0) * u.u3.y * pAct;   // soft Gaussian falloff × push
  // Lift along the rotated normal's screen projection (radially through the shell).
  let lift = n.xy * dimple;

  // Project the rotated normal to the screen (orthographic — the §T5 flat hero look),
  // scaled by the sphere radius + the breathing, plus the per-sphere offset + the dimple
  // lift + the pointer-parallax screen-center track.
  let parallaxOff = (pointerNdc) * u.u3.x * pAct;       // uParallax · pointer · active
  let center2d = n.xy * sphereScale * breath + sphereOffset + lift + parallaxOff;

  // The depth-of-field dot-size taper (transcribes facingFade size): 0.6 + 0.4·facing,
  // plus the accel-burst bloom scale near the cursor.
  let sizeTaper = u.u2.z + u.u2.w * facing;
  let burstScale = 1.0 + u.u3.z * exp(-pd * pd * 12.0);
  let dotR = u.u1.y * sizeTaper * burstScale;            // uDotSize · taper · burst

  let offX = local.x * dotR;
  let offY = local.y * dotR;

  // The opacity ramp (transcribes facingFade opacity): facingLo + facingHi·facing, scaled
  // by the base opacity + a faint burst brightness lift near the cursor.
  let facingOpacity = u.u2.x + u.u2.y * facing;          // facingLo + facingHi·facing
  let burstBright = 1.0 + u.u3.z * 0.8 * exp(-pd * pd * 12.0);

  // The whole sphere + quad is built in a SQUARE space (so the globe stays circular); the
  // final clip-space x divides by aspect so a wide canvas does not squash it into an
  // ellipse (aspect ≥ 1 → x shrinks; aspect < 1 → x grows). This keeps the dot quads round
  // AND the sphere circular in PIXELS regardless of the canvas aspect.
  let aspect = max(u.u1.w, 1e-4);
  let clipX = (center2d.x + offX) / aspect;
  let clipY = center2d.y + offY;

  var out: VSOut;
  out.pos = vec4<f32>(clipX, clipY, 0.0, 1.0);
  out.local = local;
  out.bright = facingOpacity * burstBright;
  out.alpha = clamp(u.u1.z * facingOpacity * burstBright, 0.0, 1.0);
  // The palette tone reads the DEPTH (not the opacity): the near-front samples the bright
  // cream stop[0] (tone 0), the rim/far the darker amber stop (tone → 1), so the depth-shell
  // reads TONALLY on BOTH a dark AND a light ground (a light-ground globe can't lean on the
  // opacity fade alone — over a light card a faded dot reads brighter, inverting the shell).
  out.tone = clamp(1.0 - facing, 0.0, 1.0);
  return out;
}

@fragment
fn fs_main(in: VSOut) -> @location(0) vec4<f32> {
  // The crisp fwidth-smoothstep SDF circle (the ONE AA canon — the band is ~1px wide at
  // any DPR/zoom, so fine sub-2px dots stay crisp). d = |uv| - 1; aa = fwidth(d).
  let d = length(in.local) - 1.0;
  let aa = max(fwidth(d), 1e-4);
  let coverage = 1.0 - smoothstep(-aa, aa, d);
  if (coverage < 0.002) { discard; }

  // The palette tints the dot by DEPTH (near-front cream → rim amber); the brightness lights
  // the core. The near hemisphere reads as the bright warm-cream stop, the rim/far fading to
  // the darker amber — the translucent dot-shell on both grounds.
  let lin = samplePaletteLin(in.tone) * clamp(in.bright, 0.0, 1.6);
  let alpha = in.alpha * coverage;
  let rgb = clamp(linearToSrgb(lin), vec3<f32>(0.0), vec3<f32>(1.0));
  // Premultiplied-alpha output (the translucent dot-shell additive over the clear).
  return vec4<f32>(rgb * alpha, alpha);
}
`;
