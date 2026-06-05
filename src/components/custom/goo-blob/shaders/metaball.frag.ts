// GooBlob metaball — fragment shader (AU.W7 GAMMA-space faithful lift). A gooey
// SDF body + up to four orbiting satellites smin-merged, with FBM-displaced
// watercolor edges and a per-pixel HSV perturbation. The base color arrives as a
// GAMMA-sRGB triple (the injected `ColorResolver`'s output), so the HSV round-trip
// here operates in gamma space exactly as the source did — this is the lift stage,
// NOT the OKLCh-linear shader-quality flip (the orchestrator owns that follow-on).

export const METABALL_FRAGMENT_SRC = /* glsl */ `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uBaseColor;

// Pointer
uniform vec2 uPointer;
uniform float uPointerActive;
uniform float uPointerAttraction;
uniform float uPointerStrength;

// Main body
uniform float uBodyRadius;

// Pulsation
uniform float uPulsePhase;
uniform float uPulseAmp;

// Surface noise
uniform float uNoiseAmp;
uniform float uNoiseFreq;
uniform float uNoiseSpeed;

// Gooey
uniform float uSmoothK;

// Color perturbation
uniform float uHueRange;
uniform float uSatShift;
uniform float uBrightnessShift;
uniform float uColorNoiseFreq;
uniform float uColorNoiseSpeed;

// Satellites (max 4)
#define MAX_SATS 4
uniform int uSatCount;
uniform vec2 uSatPos[MAX_SATS];
uniform float uSatRadius[MAX_SATS];
uniform float uSatOpacity[MAX_SATS];

// --- Noise ---

float hash21(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

float valueNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p, int octaves) {
    float value = 0.0;
    float amp = 0.5;
    float freq = 1.0;
    for (int i = 0; i < 4; i++) {
        if (i >= octaves) break;
        value += amp * valueNoise(p * freq);
        freq *= 2.0;
        amp *= 0.5;
    }
    return value;
}

// --- SDF ---

float sdCircle(vec2 p, vec2 center, float radius) {
    return length(p - center) - radius;
}

float smin(float a, float b, float k) {
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * h * k / 6.0;
}

// --- Color ---

vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    vec2 uv = vUv - 0.5;

    // Pointer deformation
    if (uPointerActive > 0.5) {
        vec2 pointerDir = uPointer - uv;
        float pointerDist = length(pointerDir);
        float influence = smoothstep(0.4, 0.0, pointerDist) * uPointerAttraction * uPointerStrength;
        uv -= normalize(pointerDir + 1e-6) * influence;
    }

    // Main body with pulsation
    float bodyR = uBodyRadius + sin(uPulsePhase) * uPulseAmp;

    // FBM displacement for organic watercolor edge
    float noiseVal = fbm(uv * uNoiseFreq + uTime * uNoiseSpeed, 3);
    float bodyDisplacement = (noiseVal - 0.5) * uNoiseAmp;

    float d = sdCircle(uv, vec2(0.0), bodyR + bodyDisplacement);

    // Satellites
    for (int i = 0; i < MAX_SATS; i++) {
        if (i >= uSatCount) break;
        float satD = sdCircle(uv, uSatPos[i], uSatRadius[i]);
        satD += (1.0 - uSatOpacity[i]) * 0.3;
        d = smin(d, satD, uSmoothK);
    }

    // Anti-aliased edge
    float px = 1.0 / min(uResolution.x, uResolution.y);
    float alpha = 1.0 - smoothstep(-px * 1.5, px * 1.5, d);

    if (alpha < 0.001) {
        fragColor = vec4(0.0);
        return;
    }

    // Color with position-dependent perturbation
    vec3 hsv = rgb2hsv(uBaseColor);

    float colorNoise = fbm(uv * uColorNoiseFreq + uTime * uColorNoiseSpeed, 3);
    hsv.x += (colorNoise - 0.5) * uHueRange / 360.0;
    hsv.y = clamp(hsv.y + (colorNoise - 0.5) * uSatShift, 0.0, 1.0);
    hsv.z = clamp(hsv.z + uBrightnessShift, 0.0, 1.0);

    // Subtle inner glow near the edge
    float edgeGlow = smoothstep(0.0, -bodyR * 0.6, d);
    hsv.z = mix(hsv.z, min(hsv.z + 0.06, 1.0), 1.0 - edgeGlow);

    vec3 rgb = hsv2rgb(hsv);

    fragColor = vec4(rgb * alpha, alpha);
}`;
