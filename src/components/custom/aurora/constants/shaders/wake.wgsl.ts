// AW.W8.2 — the WebGPU stateful pointer-wake feedback pass.
//
// On the AW.W7 WebGPU branch the pointer leaves a SELF-ADVECTING DECAYING wake —
// lingering eddies, not an instantaneous swirl (the stateless swirl is the WebGL2
// floor; this is the stateful WebGPU half). The technique is Pavel Dobryakov's
// WebGL-Fluid-Simulation stable-fluids pattern: ONE ping-pong velocity texture; the
// pointer writes a delta-tracked Gaussian SPLAT that self-advects and dissipates,
// biasing the flow; a click writes a radial-ripple impulse.
//
// The feedback pass runs on the SAME shouldContinue()/isRunning() park gate the
// WebGPU compute dispatch uses (inherited from the shared createCanvasLifecycle core
// — createGPUCanvas composes it). A parked rAF (offscreen / PRM-reduce /
// DockBackgroundToggle-paused) skips the wake's self-advection — it does NOT
// accumulate while hidden (proof:offscreen-pause extends to it). The MASTER TEMPO
// SCALAR zeroes the wake's INJECTION under reduce (uTempo, fed from the same seam the
// WebGL2 axes route through — uTempo multiplies the injection, never uTime).
//
// The shared color/noise math is not needed here (the wake is a velocity field, not
// a color field), so this pass does not splice the color chunk.

/** The wake velocity-texture format (the CONSUMER declares it; the substrate bakes none). */
export const WAKE_TEXTURE_FORMAT = "rg16float" as const;

// The ADVECT + DISSIPATE pass — reads the prior velocity texture, advects it along
// itself (self-advection), and dissipates by a decay factor. The ping-pong target is
// the next velocity texture. dt-fed (uDt), tempo-gated (uTempo) — never uTime.
export const WAKE_ADVECT_WGSL = /* wgsl */ `
struct WakeUniforms {
  dt: f32,
  tempo: f32,        // the master tempo scalar (0 under PRM/pause — freezes injection)
  dissipation: f32,
  pad: f32,
  splatPos: vec2f,   // the delta-tracked pointer position (0..1)
  splatVel: vec2f,   // the pointer velocity (the splat direction/strength)
  splatRadius: f32,
  rippleAmp: f32,    // a click → a radial-ripple impulse
  pad2: vec2f,
};

@group(0) @binding(0) var velTex: texture_2d<f32>;
@group(0) @binding(1) var velSampler: sampler;
@group(0) @binding(2) var<uniform> U: WakeUniforms;

@fragment
fn advect_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let texel = 1.0 / vec2f(textureDimensions(velTex));
  // Self-advection: trace back along the local velocity by dt (semi-Lagrangian).
  let v0 = textureSample(velTex, velSampler, uv).xy;
  let back = uv - v0 * U.dt;
  var v = textureSample(velTex, velSampler, back).xy;
  // Dissipate (the eddies decay so the wake lingers but fades).
  v = v * U.dissipation;

  // Delta-tracked Gaussian SPLAT — the pointer writes velocity into the field. The
  // injection is gated by the master tempo (0 under PRM → no new motion under reduce).
  let d = uv - U.splatPos;
  let g = exp(-dot(d, d) / max(U.splatRadius * U.splatRadius, 1e-6));
  v = v + U.splatVel * g * U.tempo;

  // Click → a radial-ripple impulse (pushes velocity radially outward from the splat).
  if (U.rippleAmp > 0.001) {
    let dir = d / max(length(d), 1e-4);
    v = v + dir * U.rippleAmp * g * U.tempo;
  }

  return vec4f(v, 0.0, 1.0);
}`;

// The wake biases the base flow field — sampled in the aurora fragment as an additive
// flow term (the consumer wires the wake velocity texture into the flow lookup). The
// bias is tempo-gated at the source (the advect pass), so this pass is a pure read.
export const WAKE_APPLY_WGSL = /* wgsl */ `
@group(0) @binding(0) var wakeTex: texture_2d<f32>;
@group(0) @binding(1) var wakeSampler: sampler;

fn wakeBias(uv: vec2f) -> vec2f {
  return textureSample(wakeTex, wakeSampler, uv).xy;
}`;
