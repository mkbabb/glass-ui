// GooBlob watercolor-edge noise — the IQ analytic-derivative gradient-noise
// machinery that displaces the organic blob edge (and drives the color field).
//
// `hash21` is the blob-LOCAL 3D-p3 hash (legitimately distinct from aurora's 2D
// hash. `noised()` is IQ's analytic-derivative gradient noise; it
// returns the noise VALUE in `.x` and its analytic 2D GRADIENT (∂/∂x, ∂/∂y) in
// `.yz` from ONE evaluation (the gradient is exact, not finite-differenced). The
// old `valueNoise()` (lattice value noise, no derivative) is retired: gradient
// noise reads as a marbled membrane rather than blocky lattice cells, and the FBM
// edge displacement now rides ONE noise primitive whose derivative the surface
// could consume.
//
// `fbm` accumulates value-only octaves (the color-noise + warp-offset scalar);
// `fbmG`/`fbmWarpedG` accumulate the value AND its ANALYTIC GRADIENT per octave
// (the feed for the analytic surface normal that removes the
// 4-tap), the warp pass folded directly into `fbmWarpedG`. All read the shared
// FBM_ROT rotation constant. Two exports: the assembler splices the
// ${FBM_ROT_GLSL} BETWEEN them (the hash + noised() before the constant, the FBM
// loops after) so FBM_ROT is in scope for the loop bodies.
export const METABALL_EDGE_NOISE_PRE_GLSL = /* glsl */ `// --- Noise ---

float hash21(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

// IQ analytic-derivative gradient noise — value in .x, ANALYTIC gradient
// (d/dx, d/dy) in .yz, from one eval. The quintic fade has a continuous 2nd
// derivative so the gradient is smooth (a cubic smoothstep fade would crease it).
// (Inigo Quilez, https://iquilezles.org/articles/gradientnoise/.)
vec3 noised(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    // Quintic fade + its derivative.
    vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
    vec2 du = 30.0 * f * f * (f * (f - 2.0) + 1.0);

    // Per-corner gradient vectors from the hash (centred to [-1, 1]).
    vec2 ga = -1.0 + 2.0 * vec2(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(7.3, 0.0)));
    vec2 gb = -1.0 + 2.0 * vec2(hash21(i + vec2(1.0, 0.0)), hash21(i + vec2(8.3, 0.0)));
    vec2 gc = -1.0 + 2.0 * vec2(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(7.3, 1.0)));
    vec2 gd = -1.0 + 2.0 * vec2(hash21(i + vec2(1.0, 1.0)), hash21(i + vec2(8.3, 1.0)));

    float va = dot(ga, f - vec2(0.0, 0.0));
    float vb = dot(gb, f - vec2(1.0, 0.0));
    float vc = dot(gc, f - vec2(0.0, 1.0));
    float vd = dot(gd, f - vec2(1.0, 1.0));

    // Value, remapped to [0,1] so it drops in as the valueNoise.
    float n = va + u.x * (vb - va) + u.y * (vc - va) + u.x * u.y * (va - vb - vc + vd);
    float value = 0.5 + 0.5 * n;

    // Analytic gradient (chain rule through the bilinear blend + the fade).
    vec2 grad =
        ga + u.x * (gb - ga) + u.y * (gc - ga) + u.x * u.y * (ga - gb - gc + gd) +
        du * (vec2(u.y, u.x) * (va - vb - vc + vd) + vec2(vb, vc) - va);
    return vec3(value, 0.5 * grad);
}

// Rotated-octave FBM over the analytic gradient noise: a fixed ~0.5 rad 2x2
// rotation between octaves breaks the axis-aligned banding. The rotation CONSTANT
// is spliced from the shared chunk; the loops below
// stay blob-local (param octaves + the LIQUID lacunarity/persistence, per §3a).`;

// Liquid-not-rocky band. The membrane reads as a liquid blob, not
// terrain: the lacunarity drops 2.0 → 1.8 (octaves stay closer in frequency so the
// edge undulates smoothly rather than fracturing) and the persistence/gain drops
// 0.5 → 0.42 (higher octaves contribute LESS, so the silhouette stays a calm wave,
// not a noisy crust). 2-3 octaves on the default path (NOT 4-5 terrain-grade). The
// QUINTIC fade in noised() is preserved — a cubic fade creases the analytic gradient
// and shimmers the normal.
const FBM_LACUNARITY = 1.8;
const FBM_GAIN = 0.42;

export const METABALL_EDGE_NOISE_POST_GLSL = /* glsl */ `float fbm(vec2 p, int octaves) {
    float value = 0.0;
    float amp = 0.5;
    float freq = 1.0;
    for (int i = 0; i < 4; i++) {
        if (i >= octaves) break;
        value += amp * noised(p * freq).x;
        p = FBM_ROT * p;
        freq *= ${FBM_LACUNARITY.toFixed(1)};
        amp *= ${FBM_GAIN.toFixed(2)};
    }
    return value;
}

// FBM with analytic gradient. Returns vec3(value, ∂/∂x, ∂/∂y). The
// gradient accumulates noised()'s analytic gradient per octave, chain-ruled
// through the per-octave frequency scale AND the FBM_ROT rotation: octave i samples
// at R^i · (freq·p), so the gradient w.r.t. the ORIGINAL p picks up freq and
// the accumulated rotation transpose (R^T)^i. The keystone feed for the
// analytic surface normal — it DELETES the per-pixel 4-tap finite difference.
vec3 fbmG(vec2 p, int octaves) {
    float value = 0.0;
    vec2 grad = vec2(0.0);
    float amp = 0.5;
    float freq = 1.0;
    // The accumulated octave rotation R^i — its transpose maps the i-th octave's
    // local gradient back into the ORIGINAL p frame. Seeded at identity (octave 0).
    mat2 rotAccum = mat2(1.0, 0.0, 0.0, 1.0);
    vec2 pp = p;
    for (int i = 0; i < 4; i++) {
        if (i >= octaves) break;
        vec3 n = noised(pp * freq);
        value += amp * n.x;
        // d(value)/dp = amp · freq · (R^i)^T · noised.yz  (the rotated chain rule).
        grad += amp * freq * (transpose(rotAccum) * n.yz);
        pp = FBM_ROT * pp;
        freq *= ${FBM_LACUNARITY.toFixed(1)};
        amp *= ${FBM_GAIN.toFixed(2)};
        rotAccum = FBM_ROT * rotAccum;
    }
    return vec3(value, grad);
}

// One domain-warp pass with the ANALYTIC GRADIENT carried (warp-Jacobian
// APPROXIMATION per the SOTA deepening [2]: the warp is low-frequency, so the
// gradient of the OUTER fbm dominates and the warp-offset Jacobian is dropped —
// the error is sub-perceptible and full autodiff is overfit for one blob).
vec3 fbmWarpedG(vec2 p, int octaves, float warpAmp) {
    if (warpAmp <= 0.0) return fbmG(p, octaves);
    vec2 q = vec2(fbm(p + vec2(0.0, 0.0), octaves), fbm(p + vec2(5.2, 1.3), octaves));
    return fbmG(p + warpAmp * (q - 0.5), octaves);
}
`;
