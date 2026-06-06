// GooBlob metaball — fragment shader (AU.W7 OKLCh shader-quality stage, DEC-AT-7
// LINEAR half). A gooey SDF body + up to four orbiting satellites smin-merged,
// with FBM-displaced watercolor edges and a per-pixel PERCEPTUALLY-UNIFORM color
// perturbation in OKLCh.
//
// The base color arrives GAMMA-sRGB (the injected `ColorResolver`'s output). The
// shader-quality flip (DEC-AT-7 LINEAR half): srgbToLinear(uBaseColor) → OKLab →
// OKLCh, perturb L/C/h perceptually, OKLCh → OKLab → linear sRGB, hue-preserving
// gamut clamp, then the MANDATORY `linearToSrgb()` OETF before output — a
// linear-in WITHOUT an OETF-out ships visibly too-dark (the named A5/A2 trap; the
// `proof:blob-space-gamma` gate forbids it). The HSV gamma-space path was DELETED.
//
// The OKLab/sRGB constants are value.js's EXACT Ottosson values (NOT the
// GM-Shaders/LYGIA convenience matrices, which are ~1e-4 off and fail the 1e-6
// CPU-equivalence gate). `mat3` literals are TRANSPOSED from value.js's row-major
// arrays because GLSL `mat3` is column-major (`mat3 * vec3` dots each column with
// the vector); writing value.js's rows as GLSL columns yields the row-major M·v.
// Hues are in RADIANS. See `__tests__/metaball-color.glsl-port.ts` (the line-for-line TS
// transcription) + `__tests__/blob-color-equivalence.test.ts` (the 8-assertion gate).
//
// AV.W2 — the OETF + the Ottosson matrices + the FBM_ROT constant are SPLICED from
// the shared procedural-color chunk (the single GLSL source both this shader and
// aurora.frag.ts compose), so the OETF can never again diverge between them.

import {
    FBM_ROT_GLSL,
    OETF_GLSL,
    OKLCH_MATRICES_GLSL,
} from "../../../../composables/glass/webgl/shaders/procedural-color.glsl";

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

// Color perturbation (perceptually uniform — OKLCh L/C/h)
uniform float uHueRange;        // degrees of hue swing (converted to radians)
uniform float uSatShift;        // OKLCh chroma swing
uniform float uBrightnessShift; // OKLCh lightness bias
uniform float uColorNoiseFreq;
uniform float uColorNoiseSpeed;

// Satellites (max 4)
#define MAX_SATS 4
uniform int uSatCount;
uniform vec2 uSatPos[MAX_SATS];
uniform float uSatRadius[MAX_SATS];
uniform float uSatOpacity[MAX_SATS];

const float PI = 3.141592653589793;

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

// Edit #3 — rotated-octave FBM: a fixed ~0.5 rad 2x2 rotation between octaves
// breaks the axis-aligned banding the un-rotated lattice noise produces. The
// rotation CONSTANT is spliced from the shared chunk (AV.W2 — the one FBM_ROT);
// the loop below stays blob-local (param octaves + 2.0 lacunarity, per §3a).
${FBM_ROT_GLSL}

float fbm(vec2 p, int octaves) {
    float value = 0.0;
    float amp = 0.5;
    float freq = 1.0;
    for (int i = 0; i < 4; i++) {
        if (i >= octaves) break;
        value += amp * valueNoise(p * freq);
        p = FBM_ROT * p;
        freq *= 2.0;
        amp *= 0.5;
    }
    return value;
}

// --- SDF ---

float sdCircle(vec2 p, vec2 center, float radius) {
    return length(p - center) - radius;
}

// Edit #2 — Inigo Quilez quadratic polynomial smin (same uSmoothK uniform). The
// quadratic h*h*k*0.25 form has a cleaner C1 seam than the prior cubic smin.
float smin(float a, float b, float k) {
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * k * 0.25;
}

// --- Color (Ottosson OKLab/OKLCh — value.js EXACT constants, transposed) ---
//
// The OETF (srgbToLinear/linearToSrgb) + the four Ottosson matrices + their space
// conversions are SPLICED from the shared chunk (AV.W2 —
// src/composables/glass/webgl/shaders/procedural-color.glsl.ts). They live there
// ONCE so the OETF can never diverge from aurora's; the line-for-line TS port
// (__tests__/metaball-color.glsl-port.ts) mirrors that chunk. The gamut-clamp
// below stays blob-local (aurora has no in-shader OKLCh path).
${OETF_GLSL}
${OKLCH_MATRICES_GLSL}

// Edit #4's gamut step — hue-preserving inward chroma clamp. If the linear result
// is out of [0,1], bisect chroma toward 0 (L + h fixed) until in gamut. Preserves
// hue exactly (only C shrinks). 16 steps resolve C to < 2^-16 of its span.
bool inGamut(vec3 lin) {
    return all(greaterThanEqual(lin, vec3(0.0))) && all(lessThanEqual(lin, vec3(1.0)));
}
vec3 gamutClampOklch(vec3 lch) {
    vec3 lin = oklabToLinearSrgb(oklchToOklab(lch));
    if (inGamut(lin)) return lch;
    float lo = 0.0;
    float hi = lch.y;
    for (int i = 0; i < 16; i++) {
        float mid = 0.5 * (lo + hi);
        vec3 test = vec3(lch.x, mid, lch.z);
        if (inGamut(oklabToLinearSrgb(oklchToOklab(test)))) {
            lo = mid;
        } else {
            hi = mid;
        }
    }
    return vec3(lch.x, lo, lch.z);
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

    // Edit #1 — fwidth-based anti-aliased edge: derive the smoothstep half-width
    // from the SDF screen-space gradient so the edge stays ~1px regardless of zoom.
    float aa = max(fwidth(d), 1e-6);
    float alpha = 1.0 - smoothstep(-aa, aa, d);

    if (alpha < 0.001) {
        fragColor = vec4(0.0);
        return;
    }

    // Edit #4 — perceptually-uniform OKLCh variation. Gamma base → linear → OKLab
    // → OKLCh; perturb L/C/h; OKLCh → OKLab → linear; hue-preserving gamut clamp.
    vec3 oklch = oklabToOklch(srgbToOklab(uBaseColor));

    float colorNoise = fbm(uv * uColorNoiseFreq + uTime * uColorNoiseSpeed, 3);
    oklch.z += (colorNoise - 0.5) * uHueRange * (PI / 180.0);     // hue swing, radians
    oklch.y = max(oklch.y + (colorNoise - 0.5) * uSatShift, 0.0); // chroma swing
    oklch.x = clamp(oklch.x + uBrightnessShift, 0.0, 1.0);        // lightness bias

    // Subtle inner glow near the edge — lifts OKLCh lightness inward.
    float edgeGlow = smoothstep(0.0, -bodyR * 0.6, d);
    oklch.x = mix(oklch.x, min(oklch.x + 0.06, 1.0), 1.0 - edgeGlow);

    oklch = gamutClampOklch(oklch);

    vec3 lin = oklabToLinearSrgb(oklchToOklab(oklch));
    vec3 rgb = clamp(linearToSrgb(lin), 0.0, 1.0); // MANDATORY OETF — closes the seam

    // Edit #8 — premultiply AFTER the OETF: straight-alpha gamma → premultiplied.
    fragColor = vec4(rgb * alpha, alpha);
}`;
