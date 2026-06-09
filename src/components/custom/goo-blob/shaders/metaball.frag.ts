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

// Multi-stop palette (W11.b) — 2-4 in-family OKLCh stops (uploaded GAMMA sRGB, like
// uBaseColor). uStopCount <= 1 falls back to uBaseColor (the single-color default,
// zero regression). MAX_BLOB_STOPS is a compile-time #define.
#define MAX_BLOB_STOPS 4
uniform int uStopCount;
uniform vec3 uPalette[MAX_BLOB_STOPS];

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

// AX.W16 (arm 5) — the PRE-FBM bounding-discard radius (UV space). main() early-outs
// to a transparent write for any fragment OUTSIDE this radius BEFORE the two 3-octave
// FBM calls + the OKLCh round-trip. The renderer uploads it PADDED by every
// outward-expanding term (body + eccentric orbit + sat radius + smin band + FBM edge
// amplitude + click-pulse + a lean/squash safety pad) so it NEVER clips the wet
// meniscus (IQ: inflate the bound to match any outward op).
uniform float uMaxReach;

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
// AX.W15 — de-synced breath. The body throb was a single sin(uPulsePhase) — a
// mechanical pulse that re-syncs every cycle. Three DETUNED sines at IRRATIONAL
// frequency ratios (1, 0.13/0.09 ≈ 1.444, 0.31) never re-phase, so the membrane
// breathes like a living creature (an asymmetric slower-exhale calm band) rather
// than a metronome. Normalized so the composite stays in ~[-1, 1].
float breath(float phase) {
    return (sin(phase)
          + 0.5 * sin(phase * 1.4444 + 1.7)
          + 0.28 * sin(phase * 0.31 + 4.1)) / 1.78;
}

// AX.W15 — the composite SDF field WITH its ANALYTIC GRADIENT, returned as
// vec3(dist, ∂d/∂x, ∂d/∂y). The domain-warped body membrane smin-merged with the
// satellites + trail; the gradient propagates through sminG's mix(a.yz, b.yz, h)
// so the surface normal reads the field gradient DIRECTLY (the 4-tap finite
// difference is DELETED — its 4 full evals per lit pixel are gone).
//
// The ANISOTROPIC SQUASH (W10 volume-preserving stretch) is a linear map
// bodyUv = D·R·uv (R rotates world→(motion-axis, perp); D = diag(1/sa, sa)). The
// body field's gradient is computed in bodyUv space, so it MUST be transformed back
// to uv space by M^T = R^T·D (the inverse-transpose handling the SOTA-deepening [2]
// warns the 4-tap did implicitly by sampling in screen space).
vec3 sceneDistG(vec2 uv) {
    // De-synced pulsing body radius.
    float bodyR = uBodyRadius + breath(uPulsePhase) * uPulseAmp;

    // Velocity-driven VOLUME-PRESERVING squash-and-stretch (W10), SATURATED (AX.W46
    // D5). sa is the stretch along motion, EXACTLY 1/sa perpendicular (area-preserving).
    // The basis (ax, perp) is captured so the gradient can be transformed back below.
    //
    // The W10 form sa = 1 + speed*uStretch rode an UNBOUNDED critically-damped spring
    // velocity (O(5-8)/s on a fast flick) -> sa ~ 1.78-2.25x elongation, a violent
    // taffy-pull. A tanh saturation sa = 1 + tanh(speed*k)*uStretch caps the elongation
    // at 1 + uStretch (~1.5x at the default stretch 0.5) no matter how fast the flick —
    // the fastest flick reads as a lively bounce, never a rubber-band snap (the standard
    // volume-preserving squash-and-stretch restraint). k = 1.6 keeps the tanh in its
    // near-linear regime for a slow drag (the gentle squash still reads) and saturates
    // only the fast flick.
    vec2 bodyUv = uv;
    vec2 ax = vec2(1.0, 0.0);
    vec2 perp = vec2(0.0, 1.0);
    float sa = 1.0;
    float speed = length(uVelocity);
    bool squashed = uStretch > 0.0 && speed > 1e-4;
    if (squashed) {
        ax = uVelocity / speed;
        perp = vec2(-ax.y, ax.x);
        sa = 1.0 + tanh(speed * 1.6) * uStretch;
        bodyUv = vec2(dot(uv, ax) / sa, dot(uv, perp) * sa);
    }

    // Domain-warped FBM displacement WITH its analytic gradient (the warp-Jacobian
    // approximation per [2]). disp = (noiseVal - 0.5) · uNoiseAmp; its gradient in
    // bodyUv space is uNoiseAmp · uNoiseFreq · fbmGrad (the uNoiseFreq chain factor
    // from the bodyUv·uNoiseFreq argument).
    vec3 fbmv = fbmWarpedG(bodyUv * uNoiseFreq + uTime * uNoiseSpeed, 3, uWarpAmp);
    float bodyDisplacement = (fbmv.x - 0.5) * uNoiseAmp;
    vec2 dispGradBody = uNoiseAmp * uNoiseFreq * fbmv.yz;

    // Body circle WITH gradient (in bodyUv space). The displaced radius subtracts
    // the displacement, so the body gradient is circleGrad - dispGrad (sign per
    // [2]: d = circleDist - displacement ⇒ grad = circleGrad - dispGrad).
    vec3 bodyG = sdgCircle(bodyUv, vec2(0.0), bodyR + bodyDisplacement);
    vec2 bodyGradBody = bodyG.yz - dispGradBody;

    // Transform the body gradient back to uv space: g_uv = R^T · D · g_body, i.e.
    // scale by D = diag(1/sa, sa) in the (ax, perp) frame then reconstruct in world.
    vec2 bodyGradUv;
    if (squashed) {
        vec2 scaled = vec2(bodyGradBody.x / sa, bodyGradBody.y * sa);
        bodyGradUv = scaled.x * ax + scaled.y * perp;
    } else {
        bodyGradUv = bodyGradBody;
    }
    vec3 d = vec3(bodyG.x, bodyGradUv);

    // Satellites — smin-merged into the body (uMerge selects quadratic/circular).
    for (int i = 0; i < MAX_SATS; i++) {
        if (i >= uSatCount) break;
        vec3 satG = sdgCircle(uv, uSatPos[i], uSatRadius[i]);
        satG.x += (1.0 - uSatOpacity[i]) * 0.3;
        d = sminG(d, satG, uSmoothK);
    }

    // Pointer trail — a decaying-radius pseudopod reaching toward the cursor,
    // smin-merged so it stretches an elastic limb and snaps back.
    for (int i = 0; i < TRAIL_N; i++) {
        if (i >= uTrailCount) break;
        vec3 trailG = sdgCircle(uv, uTrailPos[i], uTrailRadius[i]);
        d = sminG(d, trailG, uSmoothK);
    }
    return d;
}

// AX.W15 — the analytic surface normal. The field gradient grad2d arrives
// DIRECTLY from sceneDistG (no 4-tap). The smin field is sub-unit (the CD family
// |grad| ≤ 1) so the gradient is NOT unit-length — normalize() before the dome
// lift (the unit contract is on the FINAL lifted normal N, not the raw field
// gradient). The Z dome: 'interior' is the normalized depth inward from the rim
// (-d/bodyR); z = sqrt(1 - (1 - interior)^2) is the unit half-sphere profile (flat
// centre, steep rim). N tilts outward along the field gradient near the rim and
// points at the viewer deep inside.
vec3 surfaceNormalFromGrad(vec2 grad2d, float d, float bodyR) {
    vec2 g = normalize(grad2d + vec2(1e-6));
    float interior = clamp(-d / max(bodyR, 1e-4), 0.0, 1.0);
    float z = sqrt(max(0.0, 1.0 - (1.0 - interior) * (1.0 - interior)));
    return normalize(vec3(g * (1.0 - z), z) + vec3(0.0, 0.0, 1e-6));
}

// W11.b — sample the multi-stop palette at t in [0,1], interpolating adjacent
// stops in OKLab with a MIDPOINT CHROMA-BUMP (a linear OKLab mix of a vivid pair
// dips chroma through grey; the bump lifts it back). Falls back to uBaseColor when
// uStopCount <= 1. Returns an OKLCh stop [L, C, h(rad)].
vec3 samplePaletteOklch(float t) {
    if (uStopCount <= 1) return oklabToOklch(srgbToOklab(uBaseColor));
    float n = float(uStopCount);
    float ft = clamp(t, 0.0, 1.0) * (n - 1.0);
    int i0 = int(floor(ft));
    int i1 = min(i0 + 1, uStopCount - 1);
    float f = ft - float(i0);
    // Fetch adjacent stops (uPalette is gamma sRGB) → OKLab.
    vec3 labA = srgbToOklab(uPalette[i0]);
    vec3 labB = srgbToOklab(uPalette[i1]);
    vec3 lab = mix(labA, labB, f);
    vec3 lch = oklabToOklch(lab);
    // Midpoint chroma-bump: a bell (peaks at f=0.5) lifts C off the grey midpoint.
    lch.y += 0.03 * sin(PI * f);
    return lch;
}

void main() {
    vec2 uv = vUv - 0.5;

    // AX.W16 (arm 5) — PRE-FBM bounding early-out. The oversized canvas (1.6x the
    // wrapper) runs the full fragment ALU — two 3-octave FBM evals + the OKLCh
    // round-trip + the lit/iridescence/SSS block — on a large transparent border
    // otherwise (~60% of the canvas is outside the droplet reach). Any fragment beyond
    // uMaxReach (the PADDED worst-case painted reach, uploaded so it never clips the
    // wet meniscus) writes transparent and returns BEFORE any of that work. This is a
    // transparent WRITE, NOT a GLSL discard: the pass is a pure premultiplied blend
    // with no depth, and discard disables the tiled-renderer fast path on mobile GPUs.
    // No fwidth is computed before the return, so there is no
    // derivative-in-non-uniform-control-flow hazard (the kept pixels compute their own
    // fwidth normally below). The pad covers the pointer-lean uv shift, so testing the
    // pre-deform uv is safe.
    if (dot(uv, uv) > uMaxReach * uMaxReach) {
        fragColor = vec4(0.0);
        return;
    }

    // Pointer deformation — honor the SIGN of uPointerAttraction (W10): a positive
    // attraction leans the body IN toward the cursor, a negative shies it AWAY. The
    // signed influence flows straight into the UV shift (no hardcoded repulsion).
    //
    // AX.W46 D5 — the falloff radius NARROWS 0.65 → 0.5 (the calm-lean reconciliation).
    // The W15 REDRESS widened it to 0.65 to clear a synthetic floor; the live π-lane
    // read the result as a LUNGE. The drama lives in the STRENGTH (pointerStrength,
    // dropped to 0.18 in types.ts), NOT the falloff — the falloff's job is purely to keep
    // the lean COHERENT across the creature so the body, satellites and trail all tilt
    // toward the cursor as ONE. At 0.5 the body (sitting ≈0.2 uv from the cursor on a
    // hover-flick) is still well inside the cutoff, so the whole creature tilts as one —
    // a gentle, coherent "it notices you" lean rather than the body lunging a body-width.
    if (uPointerActive > 0.5) {
        vec2 pointerDir = uPointer - uv;
        float pointerDist = length(pointerDir);
        float influence = smoothstep(0.5, 0.0, pointerDist) * uPointerAttraction * uPointerStrength;
        uv -= normalize(pointerDir + 1e-6) * influence;
    }

    // The de-synced pulsing body radius — also reused below for the inner-glow scale.
    float bodyR = uBodyRadius + breath(uPulsePhase) * uPulseAmp;

    // Composite domain-warped membrane field WITH its analytic gradient (AX.W15).
    vec3 scene = sceneDistG(uv);
    float d = scene.x;
    vec2 fieldGrad = scene.yz;

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
    // The base is the multi-stop palette sample (W11.b) — distributed across the
    // body/satellites by the color noise field — or uBaseColor when single-stop.
    float colorNoise = fbm(uv * uColorNoiseFreq + uTime * uColorNoiseSpeed, 3);
    vec3 oklch = samplePaletteOklch(colorNoise);

    oklch.z += (colorNoise - 0.5) * uHueRange * (PI / 180.0);     // hue swing, radians
    oklch.y = max(oklch.y + (colorNoise - 0.5) * uSatShift, 0.0); // chroma swing
    oklch.x = clamp(oklch.x + uBrightnessShift, 0.0, 1.0);        // lightness bias

    // Surface normal — from the ANALYTIC field gradient (AX.W15: the 4-tap is
    // deleted). Computed ONCE here and reused by the iridescence (W11.a), the
    // fake-SSS (W11.a), and the lit glass block (W9.b).
    vec3 N = surfaceNormalFromGrad(fieldGrad, d, bodyR);
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
        // Beer-Lambert inner luminosity (AX.W15): a SATURATING 1 - exp(-k·thickness)
        // curve — a flat thick core with a fast warm rim falloff — NOT the linear
        // coreGlow·thickness ramp (which over-brightens deep interiors). k ≈ 3 reads
        // as glass depth.
        oklch.x = min(oklch.x + uCoreGlow * (1.0 - exp(-3.0 * thickness)), 1.0);
        // Fast-SSS back-light: light wrapping through the thin (low-thickness) rim.
        vec3 L = normalize(uLightDir + vec3(1e-6));
        float back = pow(clamp(dot(V, -(L + N * thickness)), 0.0, 1.0), uSssPower);
        float sss = back * uSssScale * (1.0 - thickness);
        oklch.x = min(oklch.x + sss, 1.0);
        // Warm the THIN leaking rim only (scale by 1 - thickness): the SSS hue-warm
        // shift rides the rim, not the core (AX.W15 — only the thin rim warms).
        oklch.z += sss * 0.1 * (1.0 - thickness);
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

        // ENERGY-CONSERVING Blinn-Phong (AX.W15 [9]): the (shininess+2)/8 factor
        // DECOUPLES shininess from strength (without it, raising shininess dims the
        // glint, so the two knobs fight). SPECULAR ANTIALIASING: the FBM membrane
        // makes the normal vary fast, so a tight glint (16-64) STROBES on small
        // dock-grid blobs. Widen the effective lobe where the normal varies
        // (Toksvig-style fwidth clamp) — drop shininess, NOT raise it. nVar reads
        // the screen-space normal derivative; a high-variance pixel softens the
        // exponent so the glint stays stable.
        float nVar = length(fwidth(N));
        float shininess = uSpecShininess / (1.0 + 24.0 * nVar);
        float energyNorm = (shininess + 2.0) / 8.0;
        float spec = pow(max(dot(N, H), 0.0), shininess) * uSpecStrength * energyNorm;

        // Fresnel/Schlick rim — fed uRimColor (the --foreground warm rim via the
        // injected ColorResolver). FOREGROUND-AWARE MIN-CONTRAST GUARD (AX.W15 [10]):
        // a var(--primary) blob in dark mode resolves a rim near the BODY color, so
        // the rim washes out (no contrast). When the rim's luminance sits too close
        // to the body's, the guard CHROMA-REDUCES and L-LIFTS the rim stop (a
        // perceptual move, NOT a re-tint) so the curved rim always reads. Computed in
        // OKLCh so the lift is perceptual.
        vec3 rimOkl = oklabToOklch(srgbToOklab(uRimColor));
        float bodyL = oklch.x; // the post-perturb body lightness
        float dL = abs(rimOkl.x - bodyL);
        // If the rim is within 0.22 L of the body, push it AWAY (lift if the body is
        // dark, the dark-mode primary case; the chroma-reduce keeps it neutral-warm).
        float lack = clamp((0.22 - dL) / 0.22, 0.0, 1.0);
        rimOkl.x = clamp(mix(rimOkl.x, (bodyL < 0.5 ? 0.92 : 0.18), lack), 0.0, 1.0);
        rimOkl.y *= mix(1.0, 0.5, lack); // chroma-reduce toward a pale pearl
        vec3 rimLin = oklabToLinearSrgb(oklchToOklab(rimOkl));

        float rimFres = pow(1.0 - max(dot(N, V), 0.0), uRimPower);
        float rim = rimFres * uRimStrength * (1.0 - 0.6 * thickness);

        // Combine the two warm highlights and add in LINEAR. max(spec, rim*scale)
        // keeps the glint from stacking on the rim into a blown hotspot.
        //
        // AX.W46 D4 — CLAMP the linear highlight below unity before the add (the
        // belt-and-braces guard the re-derived specStrength makes rarely-binding but
        // never lets a worst-case normal blow to a hard white spot). The energy-
        // conserving Blinn-Phong CAN still spike on a grazing normal where the Toksvig
        // widen has not kicked in; capping the highlight magnitude at 0.85 (a contained
        // warm gleam, sub-unity) means the OETF clamp below can never crush a
        // pure-white pixel over the dome. The cap is on the highlight ALONE (not the
        // composited lin), so the body color underneath is untouched — it caps only
        // the additive catch-light's energy.
        vec3 highlight = max(warmCream * spec, rimLin * rim);
        highlight = min(highlight, vec3(0.85));
        lin += highlight;
    }

    vec3 rgb = clamp(linearToSrgb(lin), 0.0, 1.0); // MANDATORY OETF — closes the seam

    // IGN dither (AX.W15 [2][9]) — the low-chroma warm-cream dome BANDS on 8-bit
    // panels (visible Mach steps in the smooth L roll). Interleaved-gradient noise at
    // 1/255, applied AFTER linearToSrgb and BEFORE the *alpha premultiply (aurora
    // ships the same splice). A triangular ±0.5 LSB dither decorrelates the steps.
    float ign = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
    rgb = clamp(rgb + (ign - 0.5) / 255.0, 0.0, 1.0);

    // Edit #8 — premultiply AFTER the OETF: straight-alpha gamma → premultiplied.
    fragColor = vec4(rgb * alpha, alpha);
}`;
