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
