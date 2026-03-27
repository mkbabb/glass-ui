// glass-ui WebGPU glass shader
// Features: variable blur, real-time refraction, caustics, dynamic specular
//
// This shader is designed to be used with a full-screen quad.
// It reads from a background texture and applies glass effects
// for each registered glass panel.

struct Uniforms {
    resolution: vec2f,           // Canvas resolution
    glass_bounds: vec4f,         // Glass panel rect (x, y, w, h) in UV space
    blur_radius: f32,            // Base blur radius
    refraction_strength: f32,    // Snell's law displacement strength
    chromatic_aberration: f32,   // Edge chromatic aberration strength
    caustic_intensity: f32,      // Caustic light pattern intensity
    light_pos: vec2f,            // Virtual light source position (UV)
    time: f32,                   // Animation time (seconds)
    _pad: f32,                   // Alignment padding
};

@group(0) @binding(0) var<uniform> u: Uniforms;
@group(0) @binding(1) var background_texture: texture_2d<f32>;
@group(0) @binding(2) var background_sampler: sampler;

// Pseudo-random hash for noise generation
fn hash21(p: vec2f) -> f32 {
    var p3 = fract(vec3f(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

// Simplex-style noise for caustics
fn noise(p: vec2f) -> f32 {
    let i = floor(p);
    let f = fract(p);
    let u_curve = f * f * (3.0 - 2.0 * f);

    return mix(
        mix(hash21(i), hash21(i + vec2f(1.0, 0.0)), u_curve.x),
        mix(hash21(i + vec2f(0.0, 1.0)), hash21(i + vec2f(1.0, 1.0)), u_curve.x),
        u_curve.y
    );
}

// Fractal Brownian Motion for caustic patterns
fn fbm(p: vec2f) -> f32 {
    var value = 0.0;
    var amplitude = 0.5;
    var frequency = 1.0;
    var pos = p;

    for (var i = 0; i < 5; i++) {
        value += amplitude * noise(pos * frequency);
        pos += vec2f(1.7, 9.2);
        amplitude *= 0.5;
        frequency *= 2.0;
    }
    return value;
}

// Caustic light pattern — animated voronoi-like cells
fn caustics(uv: vec2f, time: f32) -> f32 {
    let p = uv * 8.0 + vec2f(time * 0.3, time * 0.2);
    let n1 = fbm(p);
    let n2 = fbm(p + vec2f(1.3, 2.7) + time * 0.1);
    let pattern = fbm(p + vec2f(n1, n2) * 2.0);
    return smoothstep(0.3, 0.7, pattern);
}

// Fresnel approximation (Schlick)
fn fresnel(cos_theta: f32, ior: f32) -> f32 {
    let r0 = pow((1.0 - ior) / (1.0 + ior), 2.0);
    return r0 + (1.0 - r0) * pow(1.0 - cos_theta, 5.0);
}

// Distance from UV to nearest edge of glass panel
fn edge_distance(uv: vec2f) -> f32 {
    let glass_min = u.glass_bounds.xy;
    let glass_max = u.glass_bounds.xy + u.glass_bounds.zw;
    let d = min(uv - glass_min, glass_max - uv);
    return min(d.x, d.y);
}

@fragment
fn fs_main(@builtin(position) frag_coord: vec4f) -> @location(0) vec4f {
    let uv = frag_coord.xy / u.resolution;
    let pixel_size = 1.0 / u.resolution;

    // Check if fragment is inside the glass panel
    let glass_min = u.glass_bounds.xy;
    let glass_max = u.glass_bounds.xy + u.glass_bounds.zw;

    if (uv.x < glass_min.x || uv.x > glass_max.x ||
        uv.y < glass_min.y || uv.y > glass_max.y) {
        return textureSample(background_texture, background_sampler, uv);
    }

    // Progressive blur — variable radius based on edge distance
    let edge_dist = edge_distance(uv);
    let max_edge_dist = min(u.glass_bounds.z, u.glass_bounds.w) * 0.5;
    let blur_factor = smoothstep(0.0, max_edge_dist * 0.3, edge_dist);
    let effective_blur = u.blur_radius * (0.4 + 0.6 * blur_factor);

    // Refraction displacement
    let center = u.glass_bounds.xy + u.glass_bounds.zw * 0.5;
    let from_center = uv - center;
    let refraction_offset = from_center * u.refraction_strength * 0.02;

    // Depth-aware blur kernel
    var blur_color = vec3f(0.0);
    var total_weight = 0.0;
    let samples = i32(min(effective_blur * 2.0, 16.0));
    let sigma = max(effective_blur * 0.5, 0.1);

    for (var x = -8; x <= 8; x++) {
        for (var y = -8; y <= 8; y++) {
            if (abs(x) > samples || abs(y) > samples) { continue; }

            let offset = vec2f(f32(x), f32(y)) * pixel_size * effective_blur * 0.1;
            let dist_sq = f32(x * x + y * y);
            let weight = exp(-dist_sq / (2.0 * sigma * sigma));

            let sample_uv = uv + offset + refraction_offset;
            blur_color += textureSample(background_texture, background_sampler, sample_uv).rgb * weight;
            total_weight += weight;
        }
    }
    blur_color /= total_weight;

    // Chromatic aberration at edges
    if (u.chromatic_aberration > 0.0) {
        let edge_strength = 1.0 - smoothstep(0.0, max_edge_dist * 0.15, edge_dist);
        let aberration_dir = normalize(from_center) * edge_strength * u.chromatic_aberration * 0.003;

        let r = textureSample(background_texture, background_sampler, uv + refraction_offset + aberration_dir).r;
        let b = textureSample(background_texture, background_sampler, uv + refraction_offset - aberration_dir).b;
        blur_color.x = mix(blur_color.x, r, edge_strength * 0.5);
        blur_color.z = mix(blur_color.z, b, edge_strength * 0.5);
    }

    // Caustic light pattern
    var caustic_light = 0.0;
    if (u.caustic_intensity > 0.0) {
        let local_uv = (uv - glass_min) / u.glass_bounds.zw;
        caustic_light = caustics(local_uv, u.time) * u.caustic_intensity;
    }

    // Specular highlight with cursor-tracking light
    let normal_xy = from_center / (u.glass_bounds.zw * 0.5);
    let normal = normalize(vec3f(normal_xy * 0.3, 1.0));
    let view_dir = vec3f(0.0, 0.0, 1.0);
    let cos_theta = max(dot(view_dir, normal), 0.0);
    var spec = fresnel(cos_theta, 1.5);

    // Light-source-aware specular
    let light_dir = normalize(u.light_pos - uv);
    let light_dot = max(dot(normal_xy, light_dir), 0.0);
    spec *= 0.3 + 0.7 * light_dot;

    // Combine
    let result = blur_color + vec3f(spec * 0.15 + caustic_light * 0.08);
    let alpha = 0.85 + spec * 0.1;

    return vec4f(result, alpha);
}

// Vertex shader — full-screen triangle
@vertex
fn vs_main(@builtin(vertex_index) vertex_index: u32) -> @builtin(position) vec4f {
    // Full-screen triangle trick: 3 vertices cover the entire viewport
    let x = f32(i32(vertex_index) / 2) * 4.0 - 1.0;
    let y = f32(i32(vertex_index) % 2) * 4.0 - 1.0;
    return vec4f(x, y, 0.0, 1.0);
}
