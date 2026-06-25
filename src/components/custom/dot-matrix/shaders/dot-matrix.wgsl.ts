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

// ── The √φ proportion ladder (the liquid-lens constants; Aristotelian, no magic numbers) ──
const PHI: f32 = 1.618033988749895;        // the golden ratio φ
const SQRT_PHI: f32 = 1.272019649514069;   // √φ
const INV_SQRT_PHI: f32 = 0.7861513777574233;  // 1/√φ ≈ the squash/stretch cap
const INV_PHI2: f32 = 0.3819660112501051;  // 1/φ² ≈ the anticipation-lead rung
// The velocity (normalized-host/sec) → NDC/lens-frame scale: a sweep across the host reads as a
// strong-but-bounded ellipse. The lens constants ladder off √φ off this scaled vmag.
const VEL_SCALE: f32 = 0.18;
const STRETCH_GAIN: f32 = 2.4;             // vmag → ellipse eccentricity gain
const WAKE_GAIN: f32 = 12.0;               // the comet-tail displacement gain (spike-calibrated)
const LENS_MAGNIFY: f32 = SQRT_PHI;        // the dot SWELLS √φ× under the lens core (over the 0.8 base)
const RIM_CHROMA: f32 = 1.0;               // the chromatic-rim tone gain (samples the warmer amber stop)
const VIGNETTE_FLOOR: f32 = INV_PHI2;      // the resting center-clear floor (dense edges, clear center)
// The cartoon 1940s offset-cast: a darkened, lower-α, offset duplicate billboard (the SAME
// instanced draw, verts 6..11). The light vector is a √φ-proportioned down-right cast.
const CAST_OFFSET: f32 = 0.9;              // the cast displacement (× dot radius), down-right
const CAST_DARK: f32 = 0.0;               // the cast samples pure-dark (a shadow lobe, not a tint)
const CAST_ALPHA: f32 = 0.55;             // the cast's lower opacity (under the lit dot)

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
  // u6: (uLayout, uGravityStrength, uGravityRadius, uPlaneScale)  // layout: 0 sphere · 1 plane
  u6: vec4<f32>,
  // u7: (uVelX, uVelY, uTwinkleRate, uWakeStrength)  // the reclaimed travel-velocity lane
  u7: vec4<f32>,
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

// A 2D dot product — the local 'let dot = dots[ii].data' SHADOWS the WGSL 'dot()' builtin
// inside vs_main, so the lens math calls this helper instead (the same value, un-shadowed).
fn dot2(a: vec2<f32>, b: vec2<f32>) -> f32 {
  return a.x * b.x + a.y * b.y;
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
  @location(4) cast: f32,          // 1 = the cartoon offset-cast shadow billboard, 0 = the lit dot
};

@vertex
fn vs_main(
  @builtin(vertex_index) vi: u32,
  @builtin(instance_index) ii: u32,
) -> VSOut {
  // Two-triangle quad corners in billboard-local space (camera-facing by construction).
  // 12 verts/instance: 0..5 the LIT dot, 6..11 the cartoon offset-CAST shadow duplicate (the
  // SAME instanced draw, zero new buffer — the 1940s layered-offset cast as a binding precept).
  var corners = array<vec2<f32>, 6>(
    vec2<f32>(-1.0, -1.0), vec2<f32>(1.0, -1.0), vec2<f32>(-1.0, 1.0),
    vec2<f32>(-1.0, 1.0), vec2<f32>(1.0, -1.0), vec2<f32>(1.0, 1.0),
  );
  let isCast = vi >= 6u;
  let local = corners[vi % 6u];

  let dot = dots[ii].data;
  var unitPos = dot.xyz;          // the STATIC phyllotaxis position (JS-computed)
  let sphereIdx = dot.w;

  let breath = u.u4.w;
  let pAct = u.u3.w;
  let pointerNdc = vec2<f32>(u.u4.x * 2.0 - 1.0, 1.0 - u.u4.y * 2.0);
  let isPlane = u.u6.x > 0.5;
  let gravStrength = u.u6.y;
  let gravRadius = max(u.u6.z, 1e-3);
  let planeScale = u.u6.w;
  // The reclaimed travel velocity → the lens-frame vector (host +y is DOWN → flip to NDC +up).
  let velRaw = vec2<f32>(u.u7.x, -u.u7.y);
  let vmag = length(velRaw) * VEL_SCALE;
  let vdir = select(vec2<f32>(0.0, 0.0), velRaw / max(length(velRaw), 1e-5), length(velRaw) > 1e-5);
  let wake = u.u7.w;             // the spring-engaged active (ζ=0.7) → the wake LAGS + overshoots
  let twkRate = u.u7.z;
  // The per-dot twinkle phase — an on-GPU instance_index hash (no new buffer); the resting
  // field becomes a LIVING warm constellation. uTime is pinned under PRM (deterministic capture).
  let twkPhase = fract(sin(f32(ii) * 12.9898) * 43758.5453) * TAU;
  let twk = twkRate * sin(u.u0.w * (twkRate + 0.6) + twkPhase);

  var center2d: vec2<f32>;
  var facing: f32;
  var sizeTaper: f32;
  var burstScale: f32;
  var facingOpacity: f32;
  var burstBright: f32;
  var castLobe: f32 = 0.0;       // the cartoon-cast strength (nearness·pAct), set per-register

  if (isPlane) {
    // ── The 2D-PLANE register → the DIRECTIONAL LIQUID LENS ──────────────────────
    // A heavy liquid-glass lens dragged across a taut warm membrane: it LEADS its travel,
    // STRETCHES the gathered dots along the travel axis, drags an ember comet-tail WAKE behind,
    // and MAGNIFIES+refracts the lattice beneath it. (Replaces the symmetric 'toCursor*well' —
    // clean break, no alias, no dual path; the reclaimed velocity makes the warp directional.)
    let base2d = unitPos.xy * planeScale;

    // 1. ANTICIPATION — the lens LEADS its math-center along travel (dots ahead feel it early).
    let wellC = pointerNdc + vdir * wake * (gravRadius * INV_PHI2 * 0.4);
    let toLens = wellC - base2d;

    // 2. SQUASH / STRETCH — measure distance in a frame STRETCHED along travel (vol-preserving).
    let along = dot2(toLens, vdir);
    let perp = dot2(toLens, vec2<f32>(-vdir.y, vdir.x));
    let stretch = 1.0 + clamp(vmag * STRETCH_GAIN, 0.0, INV_SQRT_PHI);
    let dE = length(vec2<f32>(along / stretch, perp * stretch));
    let well = gravStrength * exp(-(dE * dE) / (2.0 * gravRadius * gravRadius)) * pAct;
    var lift = toLens * well;

    // 3. COMET-TAIL WAKE — a pull streamed BEHIND the lens (overlapping action; follow-through).
    let behind = max(0.0, -along);
    let tail = wake * exp(-(behind * behind) / (gravRadius * gravRadius)) * vmag * WAKE_GAIN;
    lift = lift - vdir * tail * gravRadius;
    // The flick BURST over-extends the gather then the spring snaps it (the cartoon take).
    let burstPull = toLens * (u.u3.z * 0.4 * exp(-(dE * dE) / (gravRadius * gravRadius))) * pAct;
    center2d = base2d + lift + burstPull;

    // 4. LENS OPTICS — the ellipse nearness drives magnify + brightness + the chromatic rim.
    let nearness = exp(-(dE * dE) / (2.0 * gravRadius * gravRadius));
    facing = nearness;
    sizeTaper = 0.8 + LENS_MAGNIFY * nearness * pAct;        // the dot SWELLS (a lens magnifies)
    burstScale = 1.0 + u.u3.z * 0.6 * nearness;
    // the comet-tail also reads via LUMINANCE (trailing dots glow ∝ behind·vmag — the PRIMARY
    // wake witness; the displacement alone is fragile, the spike proved).
    let wakeGlow = behind * vmag * 1.4 * pAct;
    // 5. CONTENT-DEFERENTIAL VIGNETTE — dense edges, clear center (the field FRAMES the content);
    // the cursor-lens RE-DENSIFIES the center it enters (the calm-until-touched duality).
    var presence = mix(VIGNETTE_FLOOR, 1.0, smoothstep(0.0, 1.0, length(base2d) / max(planeScale, 1e-3)));
    presence = max(presence, nearness * pAct);
    // the resting TWINKLE floor + the lens bloom; the vignette modulates the whole field.
    facingOpacity = (u.u2.x + u.u2.y * (0.5 + twk + 0.6 * nearness * pAct)) * presence;
    burstBright = 1.0 + (0.5 * nearness + wakeGlow + u.u3.z * 0.8 * nearness) * pAct;
    castLobe = nearness * pAct;   // the cartoon offset-cast under the magnified lozenge
  } else {
    // ── The 3D-SPHERE register (the KEPT preset — "good") ────────────────────────
    var sphereScale = u.u1.x;       // uRadius
    var sphereOffset = vec2<f32>(0.0, 0.0);
    if (sphereIdx > 0.5) {
      sphereScale = u.u1.x * u.u4.z;             // uRadius * uSphere2Scale
      sphereOffset = vec2<f32>(u.u5.x, u.u5.y);  // uSphere2Offset
    }
    let n = u.spin * unitPos;       // the rotated surface NORMAL (the §T2 facing source)
    facing = facingTerm(n);
    let screenN = n.xy * sphereScale + sphereOffset;
    // The SAME screen-space DIRECTIONAL LENS as the plane (one warp idiom, both registers —
    // the dim-idiom, no second mechanism): the surface dots smear toward the cursor ALONG
    // travel + carry a wake (a finger pressing a dot-globe through glass). Bounded by 'facing'
    // so the near hemisphere leads + the silhouette can't tear.
    let toLensS = pointerNdc - screenN;
    let alongS = dot2(toLensS, vdir);
    let perpS = dot2(toLensS, vec2<f32>(-vdir.y, vdir.x));
    let stretchS = 1.0 + clamp(vmag * STRETCH_GAIN, 0.0, INV_SQRT_PHI);
    let dES = length(vec2<f32>(alongS / stretchS, perpS * stretchS));
    let pd = dES;
    // A repel pushes OUT, an attract pulls IN (u.u3.y sign); facing bounds the near hemisphere.
    let well = exp(-(dES * dES) / (2.0 * gravRadius * gravRadius)) * gravStrength * u.u3.y * pAct * facing;
    var lift = -toLensS * well;     // toward (attract) / away (repel) per the u3.y sign baked above
    // The comet-tail WAKE on the near hemisphere (streams behind the cursor along travel).
    let behindS = max(0.0, -alongS);
    let tailS = wake * exp(-(behindS * behindS) / (gravRadius * gravRadius)) * vmag * WAKE_GAIN * facing;
    lift = lift - vdir * tailS * gravRadius * sign(u.u3.y);
    let parallaxOff = pointerNdc * u.u3.x * pAct;
    center2d = n.xy * sphereScale * breath + sphereOffset + lift + parallaxOff;
    let nearnessS = exp(-(dES * dES) / (2.0 * gravRadius * gravRadius)) * facing;
    sizeTaper = u.u2.z + u.u2.w * facing + LENS_MAGNIFY * 0.4 * nearnessS * pAct;  // the lens magnify
    burstScale = 1.0 + u.u3.z * exp(-(dES * dES) / (gravRadius * gravRadius));
    let wakeGlowS = behindS * vmag * 1.0 * pAct * facing;
    facingOpacity = u.u2.x + u.u2.y * facing + u.u2.y * twk * facing;  // the twinkle rides the facing
    burstBright = 1.0 + (u.u3.z * 0.8 * exp(-(dES * dES) / (gravRadius * gravRadius)) + wakeGlowS) * pAct;
    castLobe = nearnessS * pAct;    // the cartoon offset-cast under the smeared near-hemisphere
  }

  let dotR = u.u1.y * sizeTaper * burstScale;            // uDotSize · taper · burst
  let offX = local.x * dotR;
  let offY = local.y * dotR;

  // THE CARTOON OFFSET-CAST (the 1940s layered-offset shadow, a binding precept). Verts 6..11
  // are a darkened, lower-α duplicate billboard offset along a √φ light vector (down-right),
  // keyed off castLobe (nearness·pAct) so the shadow lobe appears ONLY under the magnified lens
  // lozenge. When castLobe ≈ 0 the cast collapses to alpha 0 (the fragment discards it).
  let lightVec = normalize(vec2<f32>(SQRT_PHI, -1.0)) * CAST_OFFSET * dotR;
  let castShift = select(vec2<f32>(0.0, 0.0), lightVec, isCast);
  let castStrength = select(1.0, smoothstep(0.05, 0.5, castLobe), isCast);

  // The whole sphere + quad is built in a SQUARE space (so the globe stays circular); the
  // final clip-space x divides by aspect so a wide canvas does not squash it into an
  // ellipse (aspect ≥ 1 → x shrinks; aspect < 1 → x grows). This keeps the dot quads round
  // AND the sphere circular in PIXELS regardless of the canvas aspect.
  let aspect = max(u.u1.w, 1e-4);
  let clipX = (center2d.x + offX + castShift.x) / aspect;
  let clipY = center2d.y + offY + castShift.y;

  var out: VSOut;
  out.pos = vec4<f32>(clipX, clipY, 0.0, 1.0);
  out.local = local;
  out.cast = select(0.0, 1.0, isCast);
  if (isCast) {
    // The cast is a dark shadow lobe — full dark tone, lower α, gated by the cast strength.
    out.bright = CAST_DARK;
    out.alpha = clamp(u.u1.z * CAST_ALPHA * facingOpacity * castStrength, 0.0, 1.0);
    out.tone = 1.0;
  } else {
    out.bright = facingOpacity * burstBright;
    out.alpha = clamp(u.u1.z * facingOpacity * burstBright, 0.0, 1.0);
    // The chromatic RIM refraction (REPLACES the old depth-only '1.0 - facing' tone — EXCISED,
    // no double-write, no legacy). At rest the tone reads the depth/edge; under the lens a faint
    // RIM band glows the warmer-amber stop (tone → 1), the iOS-27 glass chromatic refraction.
    let rim = smoothstep(0.25, 0.6, 1.0 - facing) * RIM_CHROMA;
    out.tone = clamp(max(1.0 - facing, rim * facing), 0.0, 1.0);
  }
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
  // The cartoon-cast billboard collapses to nothing away from the lens — drop the dead quads.
  if (in.cast > 0.5 && in.alpha < 0.003) { discard; }

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
