// glass-ui WebGPU glass shader — Tier-2 REWRITE (PT-C)
// Fixes the uniformity-analysis rejection: textureSampleLevel (explicit LOD)
// EVERYWHERE, so every sample is legal in the non-uniform per-panel branch.
// glass_bounds is an ARRAY (N panels). Rim-concentrated 4th-order squircle
// displacement replaces the flat from_center*strength. <=9-tap blur.

const MAX_PANELS: u32 = 8u;

struct Uniforms {
    resolution: vec2f,             // 0
    time: f32,                     // 8
    panel_count: u32,              // 12
    light_pos: vec2f,              // 16
    blur_radius: f32,              // 24
    refraction_strength: f32,      // 28
    chromatic_aberration: f32,     // 32
    caustic_intensity: f32,        // 36
    _pad0: vec2f,                  // 40 -> 48
    // each panel: xy = rect origin (UV), zw = rect size (UV)
    glass_bounds: array<vec4f, 8>, // 48 -> 176
};

@group(0) @binding(0) var<uniform> u: Uniforms;
@group(0) @binding(1) var background_texture: texture_2d<f32>;
@group(0) @binding(2) var background_sampler: sampler;

// Explicit-LOD sampler wrapper — the ONE rule of the rewrite: never an implicit
// derivative inside the per-panel branch.
fn sampleBG(uv: vec2f) -> vec4f {
    return textureSampleLevel(background_texture, background_sampler, uv, 0.0);
}

// 4th-order squircle bevel profile: f(x)=⁴√(1-(1-x)⁴). 0 at centre, 1 at rim,
// edge-concentrated slope (Snell n=1.5 thin-interior lens, NOT a uniform radial).
fn squircleProfile(x: f32) -> f32 {
    let t = 1.0 - clamp(x, 0.0, 1.0);
    let t4 = t * t * t * t;
    return sqrt(sqrt(max(0.0, 1.0 - t4)));
}

fn fresnel(cos_theta: f32, ior: f32) -> f32 {
    let r0 = pow((1.0 - ior) / (1.0 + ior), 2.0);
    return r0 + (1.0 - r0) * pow(1.0 - cos_theta, 5.0);
}

// hash/noise/fbm for an in-shader caustic (P4 structured light); pure arithmetic,
// no texture sampling -> uniformity-irrelevant.
fn hash21(p: vec2f) -> f32 {
    var p3 = fract(vec3f(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}
fn noise2(p: vec2f) -> f32 {
    let i = floor(p);
    let f = fract(p);
    let w = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i), hash21(i + vec2f(1.0, 0.0)), w.x),
               mix(hash21(i + vec2f(0.0, 1.0)), hash21(i + vec2f(1.0, 1.0)), w.x), w.y);
}
fn fbm2(p: vec2f) -> f32 {
    var v = 0.0; var a = 0.5; var q = p;
    for (var i = 0; i < 4; i = i + 1) {
        v += a * noise2(q);
        q = q * 2.0 + vec2f(1.7, 9.2);
        a *= 0.5;
    }
    return v;
}

// The glass material over one panel. ALL sampling is textureSampleLevel.
fn glassSample(uv: vec2f, b: vec4f) -> vec3f {
    let gmin = b.xy;
    let size = b.zw;
    let local = (uv - gmin) / size;          // 0..1 within panel
    let centered = local - vec2f(0.5);        // -0.5..0.5

    // rim-concentrated squircle displacement (refraction)
    let r = clamp(length(centered) * 2.0, 0.0, 1.0);
    let prof = squircleProfile(r);
    let dir = normalize(centered + vec2f(1e-5));
    let disp = dir * prof * (u.refraction_strength * 0.04 / 1.5); // n=1.5
    let refr_uv = uv + disp;

    let px = 1.0 / u.resolution;

    // <=9-tap (3x3) blur kernel around the displaced UV — explicit LOD.
    var col = vec3f(0.0);
    var wsum = 0.0;
    for (var x = -1; x <= 1; x = x + 1) {
        for (var y = -1; y <= 1; y = y + 1) {
            let o = vec2f(f32(x), f32(y)) * px * max(u.blur_radius, 0.5);
            let wgt = 1.0 - 0.25 * f32(abs(x) + abs(y));
            col += sampleBG(refr_uv + o).rgb * wgt;
            wsum += wgt;
        }
    }
    col /= wsum;

    // chromatic aberration concentrated at the rim — explicit LOD.
    if (u.chromatic_aberration > 0.0) {
        let edge = prof;
        let ab = dir * edge * (u.chromatic_aberration * 0.004);
        let cr = sampleBG(refr_uv + ab).r;
        let cb = sampleBG(refr_uv - ab).b;
        col.x = mix(col.x, cr, edge * 0.6);
        col.z = mix(col.z, cb, edge * 0.6);
    }

    // in-shader caustic structured light (no sampling)
    if (u.caustic_intensity > 0.0) {
        let cp = local * 8.0 + vec2f(u.time * 0.3, u.time * 0.2);
        let c = smoothstep(0.3, 0.7, fbm2(cp)) * u.caustic_intensity;
        col += vec3f(c * 0.08);
    }

    // directional specular + Fresnel rim
    let n = normalize(vec3f(centered * 0.6, 1.0));
    let spec = fresnel(max(n.z, 0.0), 1.5);
    let ldir = normalize(u.light_pos - uv);
    let ldot = max(dot(centered, ldir), 0.0);
    col += vec3f(spec * (0.3 + 0.7 * ldot) * 0.15);

    return col;
}

@fragment
fn fs_main(@builtin(position) frag_coord: vec4f) -> @location(0) vec4f {
    let uv = frag_coord.xy / u.resolution;

    // BASE: the field passes through unchanged. (textureSampleLevel — legal
    // in the implicitly-uniform top level too, and required below.)
    var color = sampleBG(uv).rgb;
    var alpha = 1.0;

    // Uniform loop (panel_count is a uniform); the per-fragment `inside` test is
    // NON-uniform, but glassSample only ever calls textureSampleLevel, so the
    // uniformity analyser accepts it. This is the whole fix.
    for (var i = 0u; i < u.panel_count; i = i + 1u) {
        if (i >= MAX_PANELS) { break; }
        let b = u.glass_bounds[i];
        let gmin = b.xy;
        let gmax = b.xy + b.zw;
        let inside = uv.x >= gmin.x && uv.x <= gmax.x &&
                     uv.y >= gmin.y && uv.y <= gmax.y;
        if (inside) {
            color = glassSample(uv, b);
            alpha = 0.9;
        }
    }

    return vec4f(color, alpha);
}

@vertex
fn vs_main(@builtin(vertex_index) vertex_index: u32) -> @builtin(position) vec4f {
    // full-screen triangle
    let x = f32(i32(vertex_index) / 2) * 4.0 - 1.0;
    let y = f32(i32(vertex_index) % 2) * 4.0 - 1.0;
    return vec4f(x, y, 0.0, 1.0);
}
