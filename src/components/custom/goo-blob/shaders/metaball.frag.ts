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
// breaks the axis-aligned banding the un-rotated lattice noise produces.
const mat2 FBM_ROT = mat2(0.8, 0.6, -0.6, 0.8);

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

// sRGB OETF inverse — gamma sRGB channel → linear-light. Matches value.js's
// transfer (gamma 2.4, offset 0.055, slope 12.92, transition 0.04045/12.92).
float srgbToLinearCh(float c) {
    return c <= 0.04045 ? c / 12.92 : pow((c + 0.055) / 1.055, 2.4);
}
vec3 srgbToLinear(vec3 c) {
    return vec3(srgbToLinearCh(c.r), srgbToLinearCh(c.g), srgbToLinearCh(c.b));
}

// sRGB OETF — linear-light channel → gamma sRGB (the mandatory close-the-seam).
float linearToSrgbCh(float c) {
    return c <= 0.0031308 ? c * 12.92 : 1.055 * pow(c, 1.0 / 2.4) - 0.055;
}
vec3 linearToSrgb(vec3 c) {
    return vec3(linearToSrgbCh(c.r), linearToSrgbCh(c.g), linearToSrgbCh(c.b));
}

// value.js LINEAR_SRGB_TO_LMS (constants.ts), row-major; written here as GLSL
// columns (= the transpose) so mat3 * vec3 evaluates the row-major M·v.
const mat3 LINEAR_SRGB_TO_LMS = mat3(
    0.4122214708, 0.2119034982, 0.0883024619,
    0.5363325363, 0.6806995451, 0.2817188376,
    0.0514459929, 0.1073969566, 0.6299787005
);

// value.js srgbToOKLab's INLINE LMS→OKLab coefficients (gamut.ts lines 295-297 —
// these differ at the ~1e-9 digit from LMS_TO_OKLAB_MATRIX; use the inline ones to
// mirror the exact value.js path), row-major → GLSL columns.
const mat3 LMS_TO_OKLAB = mat3(
    0.2104542553, 1.9779984951, 0.0259040371,
    0.7936177850, -2.4285922050, 0.7827717662,
    -0.0040720468, 0.4505937099, -0.8086757660
);

// value.js OKLAB_TO_LMS_COEFF (constants.ts), row-major → GLSL columns. Rows:
// l = [1, 0.3963377774, 0.2158037573], m = [1, -0.1055613458, -0.0638541728],
// s = [1, -0.0894841775, -1.2914855480].
const mat3 OKLAB_TO_LMS = mat3(
    1.0, 1.0, 1.0,
    0.3963377774, -0.1055613458, -0.0894841775,
    0.2158037573, -0.0638541728, -1.2914855480
);

// value.js LMS_TO_LINEAR_SRGB (constants.ts), row-major → GLSL columns.
const mat3 LMS_TO_LINEAR_SRGB = mat3(
    4.0767416621, -1.2684380046, -0.0041960863,
    -3.3077115913, 2.6097574011, -0.7034186147,
    0.2309699292, -0.3413193965, 1.7076147010
);

// Gamma sRGB → raw OKLab (L, a, b). Mirrors value.js srgbToOKLab.
vec3 srgbToOklab(vec3 c) {
    vec3 lin = srgbToLinear(c);
    vec3 lms = LINEAR_SRGB_TO_LMS * lin;
    vec3 lmsCbrt = sign(lms) * pow(abs(lms), vec3(1.0 / 3.0));
    return LMS_TO_OKLAB * lmsCbrt;
}

// Raw OKLab (L, a, b) → linear sRGB. Mirrors value.js oklabToLinearSRGB.
vec3 oklabToLinearSrgb(vec3 lab) {
    vec3 lms_ = OKLAB_TO_LMS * lab;
    vec3 lms = lms_ * lms_ * lms_;
    return LMS_TO_LINEAR_SRGB * lms;
}

// OKLab → OKLCh: H in RADIANS. Mirrors value.js rawOklabToOklch (which returns
// degrees; we stay in radians and only fold to [0, 2pi)).
vec3 oklabToOklch(vec3 lab) {
    float C = length(lab.yz);
    float H = atan(lab.z, lab.y);
    if (H < 0.0) H += 2.0 * PI;
    return vec3(lab.x, C, H);
}

// OKLCh (H radians) → OKLab. Mirrors value.js rawOklchToOklab.
vec3 oklchToOklab(vec3 lch) {
    return vec3(lch.x, lch.y * cos(lch.z), lch.y * sin(lch.z));
}

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
