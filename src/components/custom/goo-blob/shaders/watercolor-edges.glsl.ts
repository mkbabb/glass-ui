// GooBlob watercolor-edge noise — the IQ analytic-derivative gradient-noise
// machinery that displaces the organic blob edge (and drives the color field).
//
// `hash21` is the blob-LOCAL 3D-p3 hash (legitimately distinct from aurora's 2D
// hash, per AV.W2 §3a). `noised()` is IQ's analytic-derivative gradient noise — it
// returns the noise VALUE in `.x` and its analytic 2D GRADIENT (∂/∂x, ∂/∂y) in
// `.yz` from ONE evaluation (the gradient is exact, not finite-differenced). The
// old `valueNoise()` (lattice value noise, no derivative) is retired: gradient
// noise reads as a marbled membrane rather than blocky lattice cells, and the FBM
// edge displacement now rides ONE noise primitive whose derivative the surface
// could consume.
//
// `fbm` accumulates value-only octaves (the displacement scalar); `fbmWarped`
// wraps it in ONE domain-warp pass (`fbm(p + W*fbm(p+offset))`) for the organic
// marbled edge. Both read the shared FBM_ROT rotation constant. Two exports: the
// assembler splices the W2 ${FBM_ROT_GLSL} BETWEEN them (the hash + noised() before
// the constant, the FBM loops after) so FBM_ROT is in scope for the loop bodies.
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

    // Value, remapped to [0,1] so it drops in for the prior valueNoise.
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
// is spliced from the shared chunk (AV.W2 — the one FBM_ROT); the loops below
// stay blob-local (param octaves + 2.0 lacunarity, per §3a).`;

export const METABALL_EDGE_NOISE_POST_GLSL = /* glsl */ `float fbm(vec2 p, int octaves) {
    float value = 0.0;
    float amp = 0.5;
    float freq = 1.0;
    for (int i = 0; i < 4; i++) {
        if (i >= octaves) break;
        value += amp * noised(p * freq).x;
        p = FBM_ROT * p;
        freq *= 2.0;
        amp *= 0.5;
    }
    return value;
}

// One domain-warp pass: offset the sample point by a low-frequency FBM of itself
// (the IQ \`fbm(p + W*fbm(p))\` marbling). \`warpAmp\` (uniform-driven) is the warp
// strength; \`warpAmp == 0.0\` degrades to plain \`fbm\` (the pre-warp look).
float fbmWarped(vec2 p, int octaves, float warpAmp) {
    if (warpAmp <= 0.0) return fbm(p, octaves);
    vec2 q = vec2(fbm(p + vec2(0.0, 0.0), octaves), fbm(p + vec2(5.2, 1.3), octaves));
    return fbm(p + warpAmp * (q - 0.5), octaves);
}
`;
