// GooBlob metaball — fragment shader assembler (AU.W7 OKLCh shader-quality stage,
// DEC-AT-7 LINEAR half). A gooey SDF body + up to four orbiting satellites
// smin-merged, with FBM-displaced watercolor edges and a per-pixel
// PERCEPTUALLY-UNIFORM color perturbation in OKLCh.
//
// The GLSL is composed from cohesive partials, template-spliced into one source
// string at module load. The emitted METABALL_FRAGMENT_SRC is character-equivalent
// to the prior hand-inlined shader (the splice boundaries fall on original line
// breaks). Seams: sdf-body (sdCircle + smin) · watercolor-edges (the FBM noise that
// displaces the edge) · oklch-perturb (inGamut + gamutClampOklch). The uniforms +
// the three W2 splices + the per-pixel perturbation in main() stay inline here.
//
// The base color arrives GAMMA-sRGB (the injected `ColorResolver`'s output). The
// shader-quality flip (DEC-AT-7 LINEAR half): srgbToLinear(uBaseColor) → OKLab →
// OKLCh, perturb L/C/h perceptually, OKLCh → OKLab → linear sRGB, hue-preserving
// gamut clamp, then the MANDATORY `linearToSrgb()` OETF before output — a linear-in
// WITHOUT an OETF-out ships visibly too-dark (the named A5/A2 trap; the
// `proof:blob-space-gamma` gate forbids it). The HSV gamma-space path was DELETED.
//
// AV.W2 — the OETF + the four Ottosson matrices + the FBM_ROT constant are SPLICED
// from the shared procedural-color chunk (the single GLSL source both this shader
// and aurora.frag.ts compose), so the OETF can never again diverge between them.
// The OKLab/sRGB constants are value.js's EXACT Ottosson values; `mat3` literals
// are TRANSPOSED for GLSL column-major. Hues are in RADIANS. See
// `__tests__/metaball-color.glsl-port.ts` (the line-for-line TS transcription) +
// `__tests__/blob-color-equivalence.test.ts` (the 8-assertion gate).

import {
    FBM_ROT_GLSL,
    OETF_GLSL,
    OKLCH_MATRICES_GLSL,
} from "../../../../composables/glass/webgl/shaders/procedural-color.glsl";
import { METABALL_SDF_GLSL } from "./sdf-body.glsl";
import {
    METABALL_EDGE_NOISE_PRE_GLSL,
    METABALL_EDGE_NOISE_POST_GLSL,
} from "./watercolor-edges.glsl";
import { METABALL_OKLCH_PERTURB_GLSL } from "./oklch-perturb.glsl";

// A single newline joins every adjacent stage — the splice boundaries land on the
// original source's line breaks, so the emitted shader is character-equivalent to
// the prior hand-inlined METABALL_FRAGMENT_SRC.
const NL = "\n";

export const METABALL_FRAGMENT_SRC =
    /* glsl */ `#version 300 es
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
uniform float uMerge;   // 0 = quadratic smin, 1 = circular smin (rounder menisci)

// Membrane — domain-warp strength on the FBM edge displacement (0 = plain fbm).
uniform float uWarpAmp;

// Lit glass surface (W9.b) — gated behind uLit so the flat fill stays default.
uniform float uLit;             // 0 = flat fill (default), 1 = lit droplet
uniform vec3 uRimColor;         // Fresnel rim tint (GAMMA sRGB, via ColorResolver)
uniform vec3 uLightDir;         // normalized light direction (x, y, z)
uniform float uSpecStrength;    // Blinn-Phong specular weight
uniform float uSpecShininess;   // specular exponent (16-64, tight glint)
uniform float uRimPower;        // Fresnel/Schlick exponent (~2-3)
uniform float uRimStrength;     // Fresnel rim weight

// Iridescence + fake subsurface (W11.a) — translucent-gel read.
uniform float uIridescence;     // warm-pearl rim sheen weight (0 = off)
uniform float uIridHue;         // base hue (radians) the cosine palette biases toward (warm)
uniform float uIridSpeed;       // animated-thickness scroll for the iridescent t
uniform float uSssScale;        // fast-SSS back-light weight
uniform float uSssPower;        // fast-SSS exponent
uniform float uCoreGlow;        // thickness-driven inner-luminosity lift

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

// Pointer trail (W10) — a decaying-radius pseudopod toward the cursor. uTrail is a
// COMPILE-TIME-SIZED array (GLSL ES 3.00 forbids a uniform-sized array) with a
// DYNAMIC break on uTrailCount, mirroring the satellite loop. Later samples paint
// smaller metaballs (r *= 1 - i/N) so the trail tapers into a tail.
#define TRAIL_N 15
uniform int uTrailCount;
uniform vec2 uTrailPos[TRAIL_N];
uniform float uTrailRadius[TRAIL_N];

// Velocity-driven volume-preserving squash-and-stretch (W10).
uniform vec2 uVelocity;   // smoothed pointer velocity (motion direction + speed)
uniform float uStretch;   // squash-stretch magnitude (0 = off)

const float PI = 3.141592653589793;
` +
    NL +
    METABALL_EDGE_NOISE_PRE_GLSL +
    NL +
    /* glsl */ `${FBM_ROT_GLSL}
` +
    NL +
    METABALL_EDGE_NOISE_POST_GLSL +
    NL +
    METABALL_SDF_GLSL +
    NL +
    /* glsl */ `
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
` +
    NL +
    METABALL_OKLCH_PERTURB_GLSL +
    NL +
    /* glsl */ `
// The composite SDF field — the domain-warped body membrane smin-merged with the
// satellites. Factored so the lit-surface block (W9.b) can sample the SAME field
// at a screen-space epsilon to derive the IQ tetrahedron normal: the normal MUST
// ride the composite distance the alpha is cut from, not a clean circle.
float sceneDist(vec2 uv) {
    // Pulsing body radius.
    float bodyR = uBodyRadius + sin(uPulsePhase) * uPulseAmp;

    // Velocity-driven VOLUME-PRESERVING squash-and-stretch (W10). Stretch the body
    // along the motion direction by sa = 1 + |v|*k and squash the PERPENDICULAR
    // axis by EXACTLY 1/sa (NOT 1 - amt, which loses area so the blob SHRINKS at
    // speed). Applied as an anisotropic basis in body space: q = (dot/sa, dot*sa).
    vec2 bodyUv = uv;
    float speed = length(uVelocity);
    if (uStretch > 0.0 && speed > 1e-4) {
        vec2 ax = uVelocity / speed;          // motion axis (unit)
        vec2 perp = vec2(-ax.y, ax.x);        // perpendicular
        float sa = 1.0 + speed * uStretch;    // stretch factor along motion
        bodyUv = vec2(dot(uv, ax) / sa, dot(uv, perp) * sa);
    }

    // Domain-warped FBM displacement — the organic marbled watercolor membrane.
    float noiseVal = fbmWarped(bodyUv * uNoiseFreq + uTime * uNoiseSpeed, 3, uWarpAmp);
    float bodyDisplacement = (noiseVal - 0.5) * uNoiseAmp;

    float d = sdCircle(bodyUv, vec2(0.0), bodyR + bodyDisplacement);

    // Satellites — smin-merged into the body (uMerge selects quadratic/circular).
    for (int i = 0; i < MAX_SATS; i++) {
        if (i >= uSatCount) break;
        float satD = sdCircle(uv, uSatPos[i], uSatRadius[i]);
        satD += (1.0 - uSatOpacity[i]) * 0.3;
        d = smin(d, satD, uSmoothK);
    }

    // Pointer trail — a decaying-radius pseudopod reaching toward the cursor,
    // smin-merged so it stretches an elastic limb and snaps back. COMPILE-TIME
    // array, DYNAMIC break (mirrors the satellite loop).
    for (int i = 0; i < TRAIL_N; i++) {
        if (i >= uTrailCount) break;
        float trailD = sdCircle(uv, uTrailPos[i], uTrailRadius[i]);
        d = smin(d, trailD, uSmoothK);
    }
    return d;
}

// W9.b — the IQ 4-tap tetrahedron gradient of the composite SDF, lifted to a
// pseudo-3D surface normal so the droplet reads as a rounded bead (flat centre,
// steep rim) rather than a flat sticker.
//
// SCREEN-SPACE epsilon: the smin + domain-warped FBM field is NOT a unit-gradient
// SDF, so a tiny fixed epsilon shimmers; the tap offset is ~1.5px / uResolution.y
// so it tracks the rendered pixel size at any zoom. normalize() is guarded with
// +1e-6 (the gate's |N| ~ 1 assertion holds across the interior).
//
// The Z lift: 'interior' is the normalized depth inward from the rim
// (-d / bodyR, 0 at the edge, ~1 deep inside); the dome height
// z = sqrt(max(0, 1 - (1 - interior)^2)) is the unit half-sphere profile (flat
// at the centre, steep at the rim). n3 = normalize(vec3(grad2d * (1 - z), z))
// tilts the normal outward along the SDF gradient near the rim and points it at
// the viewer deep inside.
vec3 surfaceNormal(vec2 uv, float d, float bodyR) {
    const vec2 k = vec2(1.0, -1.0);
    float eps = 1.5 / max(uResolution.y, 1.0);
    vec2 grad2d = normalize(
        k.xy * sceneDist(uv + k.xy * eps) +
        k.yy * sceneDist(uv + k.yy * eps) +
        k.yx * sceneDist(uv + k.yx * eps) +
        k.xx * sceneDist(uv + k.xx * eps) + vec2(1e-6));

    float interior = clamp(-d / max(bodyR, 1e-4), 0.0, 1.0);
    float z = sqrt(max(0.0, 1.0 - (1.0 - interior) * (1.0 - interior)));
    return normalize(vec3(grad2d * (1.0 - z), z) + vec3(0.0, 0.0, 1e-6));
}

void main() {
    vec2 uv = vUv - 0.5;

    // Pointer deformation — honor the SIGN of uPointerAttraction (W10): a positive
    // attraction leans the body IN toward the cursor, a negative shies it AWAY. The
    // signed influence flows straight into the UV shift (no hardcoded repulsion).
    if (uPointerActive > 0.5) {
        vec2 pointerDir = uPointer - uv;
        float pointerDist = length(pointerDir);
        float influence = smoothstep(0.4, 0.0, pointerDist) * uPointerAttraction * uPointerStrength;
        uv -= normalize(pointerDir + 1e-6) * influence;
    }

    // The pulsing body radius — also reused below for the inner-glow falloff scale.
    float bodyR = uBodyRadius + sin(uPulsePhase) * uPulseAmp;

    // Composite domain-warped membrane field.
    float d = sceneDist(uv);

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

    // Surface normal — computed ONCE here and reused by the iridescence (W11.a),
    // the fake-SSS (W11.a), and the lit glass block (W9.b).
    vec3 N = surfaceNormal(uv, d, bodyR);
    vec3 V = vec3(0.0, 0.0, 1.0);
    float thickness = clamp(-d / max(bodyR, 1e-4), 0.0, 1.0); // 0 at rim, ~1 deep in
    float fres = pow(1.0 - max(dot(N, V), 0.0), 2.5);          // rim-weighted angle

    // ── W11.a iridescence — warm-biased IQ cosine palette driving OKLCh HUE ──
    //
    // A thin-film-like sheen on the RIM (fres-weighted), NOT the cold-blue default:
    // an IQ cosine palette (a + b*cos(2pi(c*t + d))) maps the Fresnel/edge angle +
    // the FBM color field + an animated thickness onto a HUE OFFSET biased to the
    // warm arc (uIridHue), with the chroma clamped to a warm-pearl band so the rim
    // reads cream/gold (congruent with the warm-cream-glass identity). Mixed into
    // OKLCh BEFORE the gamut clamp. Default LOW.
    if (uIridescence > 0.0) {
        float t = fres + 0.3 * colorNoise + uTime * uIridSpeed;
        // Cosine palette in HUE space, centred on the warm uIridHue (~0.18 turn of
        // warm sweep so the sheen shimmers gold→peach, never swinging to cold blue).
        float iridHue = uIridHue + 0.18 * PI * cos(2.0 * PI * t);
        float w = fres * uIridescence;          // rim-weighted blend
        oklch.z = mix(oklch.z, iridHue, w);
        // Warm-pearl chroma cap: lift chroma toward a pale-pearl band, clamped.
        oklch.y = min(oklch.y + 0.04 * w, oklch.y + 0.08);
        oklch.x = min(oklch.x + 0.05 * w, 1.0); // a touch brighter at the sheen
    }

    // ── W11.a fake subsurface translucency — thickness inner-glow + back-light ──
    //
    // A bright translucent CORE fading to a light-leaking EDGE (the -d ramp) plus
    // the fast-SSS back-light (light wrapping through the thin rim). Both lift OKLCh
    // L and warm the hue, consuming the W9 normal. In OKLCh before the gamut clamp.
    if (uCoreGlow > 0.0 || uSssScale > 0.0) {
        // Inner-luminosity ramp: brighter where the body is thick.
        oklch.x = min(oklch.x + uCoreGlow * thickness, 1.0);
        // Fast-SSS back-light: light wrapping through the thin (low-thickness) rim.
        vec3 L = normalize(uLightDir + vec3(1e-6));
        float back = pow(clamp(dot(V, -(L + N * thickness)), 0.0, 1.0), uSssPower);
        float sss = back * uSssScale * (1.0 - thickness);
        oklch.x = min(oklch.x + sss, 1.0);
        oklch.z += sss * 0.1; // warm the leaking edge slightly
    }

    oklch = gamutClampOklch(oklch);

    vec3 lin = oklabToLinearSrgb(oklchToOklab(oklch));

    // ── W9.b lit glass surface — Blinn-Phong glint + Fresnel rim, in LINEAR ──
    //
    // The lit terms enter lin in LINEAR space BEFORE the OETF (linearToSrgb)
    // and BEFORE the * alpha premultiply — a post-OETF apply double-gammas the
    // highlight and fringes the premultiplied edge (the named A5/A2 trap). The
    // prior flat inner-glow lift is SUBSUMED by the Fresnel rim (the curvature
    // read now comes from the surface normal, not a flat smoothstep). Gated behind
    // uLit so the flat fill stays the default (zero regression).
    if (uLit > 0.5) {
        // N, V, thickness are already computed in main() (reused by iridescence/SSS).
        vec3 L = normalize(uLightDir + vec3(1e-6)); // light direction
        vec3 H = normalize(L + V);                  // Blinn-Phong half-vector

        // Warm-cream specular glint — a near-white OKLCh TINT (L~0.97, C~0.03,
        // hue~85°) routed through the SAME spliced OKLCh matrices, NOT hardcoded
        // sRGB white (pure white reads cheap-CG). Linearized for the linear add.
        vec3 warmCream = oklabToLinearSrgb(oklchToOklab(vec3(0.97, 0.03, radians(85.0))));
        float spec = pow(max(dot(N, H), 0.0), uSpecShininess) * uSpecStrength;

        // Fresnel/Schlick rim — fed uRimColor (the --foreground warm rim via the
        // injected ColorResolver, NOT a cold-blue default). Attenuated where the
        // body is thick so the sheen rides the rim, not the core. The rim Fresnel
        // uses uRimPower (the W9.b knob), distinct from the iridescence's fixed 2.5.
        float rimFres = pow(1.0 - max(dot(N, V), 0.0), uRimPower);
        float rim = rimFres * uRimStrength * (1.0 - 0.6 * thickness);
        vec3 rimLin = srgbToLinear(uRimColor);

        // Combine the two warm highlights and add in LINEAR. max(spec, rim*scale)
        // keeps the glint from stacking on the rim into a blown hotspot.
        vec3 highlight = max(warmCream * spec, rimLin * rim);
        lin += highlight;
    }

    vec3 rgb = clamp(linearToSrgb(lin), 0.0, 1.0); // MANDATORY OETF — closes the seam

    // Edit #8 — premultiply AFTER the OETF: straight-alpha gamma → premultiplied.
    fragColor = vec4(rgb * alpha, alpha);
}`;
