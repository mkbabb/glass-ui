export const FRAG_SRC = `#version 300 es
precision highp float;
precision highp int;

#define MAX_STOPS 8
#define FLOW_RADIAL   0
#define FLOW_SWIRL    1
#define FLOW_DIAGONAL 2
#define FLOW_LINEAR   3

out vec4 fragColor;

// ── Uniforms ─────────────────────────────────────────────────────────
uniform vec2  uResolution;
uniform float uTime;           // seconds
uniform float uScrollY;
uniform float uDark;
uniform float uAlpha;
uniform float uDarkDesaturate;

// Palette LUT (linear-sRGB), packed flat
uniform vec3  uPalette[MAX_STOPS];
uniform int   uPaletteCount;

// Flow
uniform int   uFlowPattern;
uniform vec2  uFocal;
uniform float uFlowAngle;      // radians
uniform float uFlowCurl;
uniform float uFlowStrength;

// Color field
uniform float uColorScale;
uniform float uWarpAmount;
uniform float uWarpScale;
uniform float uValueVariance;

// Texture
uniform float uBrushAmount;
uniform float uBrushScale;
uniform float uBrushAnisotropy;
uniform float uPaperGrain;

// Motion
uniform float uFlowDrift;
uniform float uPaletteDrift;
uniform float uBreathDepth;
uniform float uBreathPeriod;

// Output
uniform int   uNoiseOctaves;
uniform float uSaturation;
uniform float uSoftness;

// ── Hash + noise ─────────────────────────────────────────────────────
float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    mat2 rot = mat2(0.80, 0.60, -0.60, 0.80);
    for (int i = 0; i < 5; i++) {
        if (i >= uNoiseOctaves) break;
        v += a * vnoise(p);
        p = rot * p * 2.03;
        a *= 0.5;
    }
    return v;
}

vec2 fbm2(vec2 p) {
    return vec2(fbm(p), fbm(p + vec2(17.3, 31.7)));
}

// ── Flow field ───────────────────────────────────────────────────────
// Returns a unit-ish vector giving the local flow direction at point p.
vec2 flowField(vec2 p, float t) {
    vec2 dir;
    if (uFlowPattern == FLOW_RADIAL) {
        dir = normalize(p - uFocal + vec2(0.0001));
    } else if (uFlowPattern == FLOW_SWIRL) {
        vec2 r = p - uFocal;
        float d = length(r) + 0.0001;
        vec2 radial  = r / d;
        vec2 tangent = vec2(-radial.y, radial.x);
        dir = normalize(mix(radial, tangent, clamp(uFlowCurl * 1.6, 0.0, 1.0)));
    } else {
        // DIAGONAL and LINEAR both use angle; differ only in how much curl mixes in
        float a = uFlowAngle;
        dir = vec2(cos(a), sin(a));
    }
    // Slow rotation of the whole field
    float rot = t * uFlowDrift;
    float cr = cos(rot), sr = sin(rot);
    dir = mat2(cr, -sr, sr, cr) * dir;
    // Per-position curl perturbation (tangent drift) for swirl/diagonal/linear
    if (uFlowPattern != FLOW_RADIAL) {
        vec2 perp = vec2(-dir.y, dir.x);
        float swirl = (fbm(p * 0.9 + t * uFlowDrift * 2.0) - 0.5) * 2.0;
        dir = normalize(dir + perp * swirl * uFlowCurl * 0.9);
    }
    return dir;
}

// ── Palette sampling (multi-stop LUT, linear interp in linear-sRGB) ─
vec3 samplePalette(float x) {
    x = clamp(x, 0.0, 0.9999);
    float span = float(uPaletteCount - 1);
    float f = x * span;
    int i0 = int(floor(f));
    int i1 = min(i0 + 1, uPaletteCount - 1);
    float t = fract(f);
    // Smooth the interpolation so stop transitions read as painterly
    float ts = t * t * (3.0 - 2.0 * t);
    vec3 a = uPalette[0];
    vec3 b = uPalette[0];
    for (int k = 0; k < MAX_STOPS; k++) {
        if (k == i0) a = uPalette[k];
        if (k == i1) b = uPalette[k];
    }
    return mix(a, b, ts);
}

// ── Utility ──────────────────────────────────────────────────────────
vec3 desaturate(vec3 c, float amt) {
    float lum = dot(c, vec3(0.2126, 0.7152, 0.0722));
    return mix(c, vec3(lum), amt);
}

vec3 saturate(vec3 c, float amt) {
    float lum = dot(c, vec3(0.2126, 0.7152, 0.0722));
    return clamp(mix(vec3(lum), c, amt), 0.0, 1.0);
}

void main() {
    vec2 frag    = gl_FragCoord.xy / uResolution;
    float aspect = uResolution.x / uResolution.y;
    vec2 p       = vec2(frag.x * aspect, frag.y);
    float t      = uTime;

    // Apply scroll parallax globally — subtle downward shift
    p.y += uScrollY / uResolution.y * 0.3;

    // 1) Flow direction at this point
    vec2 flow = flowField(p, t);
    vec2 perp = vec2(-flow.y, flow.x);

    // 2) Domain-warp p along flow — gentle, not aggressive enough to reveal a locus.
    vec2 wOffset = fbm2(p * uWarpScale + t * uPaletteDrift) - 0.5;
    float alongAmt = 1.2 + uFlowStrength * 2.0;
    float crossAmt = 1.0 - uFlowStrength * 0.5;
    vec2 warpV = flow * (wOffset.x * alongAmt) + perp * (wOffset.y * crossAmt);
    vec2 pw = p + warpV * uWarpAmount;

    // 2b) Elongate color regions along flow by compressing along-flow coord.
    float alongFlow = dot(pw, flow);
    vec2 perpComp   = pw - flow * alongFlow;
    float stretch   = 1.0 + 1.5 * uFlowStrength;
    vec2 pStretched = flow * (alongFlow / stretch) + perpComp;

    // 3) Color-id from multi-scale fBm ONLY — no radial-distance axis.
    //    Macro/meso/micro octaves give distributed zones with painterly depth.
    //    Each octave is evaluated at a different rotated domain so they don't
    //    echo each other's contours.
    float cScale = uColorScale;
    float macro = fbm(pStretched * cScale * 0.28 + vec2( 3.7, -1.1) + t * uPaletteDrift * 0.25);
    float meso  = fbm(pStretched * cScale * 0.80 + vec2(-5.3,  7.2) + t * uPaletteDrift * 0.55);
    float micro = fbm(pStretched * cScale * 1.90 + vec2( 9.9, -4.8) + t * uPaletteDrift);

    // Aggressively spread the fBm bell OUT to palette extremes.
    // pow(x, 0.35) pushes mid-values hard toward the rails.
    float mRaw = clamp((macro - 0.2) / 0.6, 0.0, 1.0);
    float mSpread = mRaw < 0.5
        ? 0.5 - 0.5 * pow(max(1.0 - 2.0 * mRaw, 0.0), 0.35)
        : 0.5 + 0.5 * pow(max(2.0 * mRaw - 1.0, 0.0), 0.35);

    // Ultra-low-freq distributed zone bias — no direction, just large patches
    // that push palette toward its extremes in different canvas regions.
    float zone = fbm(pStretched * uColorScale * 0.14 + vec2(17.7, -2.3)
                     + t * uPaletteDrift * 0.12) - 0.5;

    // Blend: macro + zone dominate the region choice; meso/micro add variation.
    float ci = mSpread + zone * 0.55;
    ci += (meso  - 0.5) * 0.26;
    ci += (micro - 0.5) * 0.12;

    // Softness lowers → more contrasty swatches; higher → smooth gradient
    float softGain = mix(1.3, 0.95, uSoftness);
    ci = 0.5 + (ci - 0.5) * softGain;
    ci = clamp(ci, 0.0, 1.0);

    // 4) Oil-swatch brush — two layers combined so strokes aren't pure 1D bands.
    //    Each layer perturbs ci; together they give painterly "patchy" variation.
    float alongF  = dot(p * uBrushScale, flow);
    float acrossF = dot(p * uBrushScale, perp);
    float lengthScale = mix(0.7, 0.09, uBrushAnisotropy);
    float widthScale  = mix(0.7, 1.8,  uBrushAnisotropy);
    // Layer A: stroke-aligned (anisotropic)
    float brushA = fbm(vec2(alongF * lengthScale, acrossF * widthScale));
    // Layer B: cross-hatched (slightly rotated), much softer
    float brushB = fbm(vec2(alongF * 0.3 + 4.2, acrossF * 0.4 - 1.1));
    float brush  = mix(brushA, brushB, 0.35);
    // Moderate amplitude — distinct adjacent swatches without posterizing
    float brushCi = (brush - 0.5) * 0.26 * uBrushAmount;
    ci = clamp(ci + brushCi, 0.0, 1.0);

    vec3 col = samplePalette(ci);

    // 5) Within-region value mottling (wet/dry)
    float valN = fbm(p * 2.8 + t * uPaletteDrift * 0.3);
    col *= 1.0 + uValueVariance * (valN - 0.5);

    // 6) Brush brightness — much subtler than before, just a veil of tonal variation
    if (uBrushAmount > 0.001) {
        col *= mix(1.0, 0.88 + 0.22 * brush, uBrushAmount * 0.55);
    }

    // 6) Fine paper grain (isotropic, very subtle)
    if (uPaperGrain > 0.0001) {
        float g = hash21(gl_FragCoord.xy * 0.5 + t * 13.0);
        col += (g - 0.5) * uPaperGrain;
    }

    // 7) Slow global breathing — gentle brightness wobble
    if (uBreathDepth > 0.001) {
        float breath = sin(t * (6.2831 / max(uBreathPeriod, 1.0))) * 0.5 + 0.5;
        col *= 1.0 + uBreathDepth * (breath - 0.5);
    }

    // 8) Saturation + dark desaturation
    col = saturate(col, uSaturation);
    col = desaturate(col, uDark * uDarkDesaturate);

    // 9) Gentle compression — never pure white, never pure black
    col = col * 0.95 + 0.025;
    col = clamp(col, 0.0, 1.0);

    fragColor = vec4(col * uAlpha, uAlpha);
}
`;
