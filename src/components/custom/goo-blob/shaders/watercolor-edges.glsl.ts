// GooBlob watercolor-edge noise — the FBM machinery that displaces the organic
// blob edge (and drives the color-noise field).
//
// `hash21`/`valueNoise` are the blob-LOCAL 3D-p3 hash + value noise (legitimately
// distinct from aurora's 2D hash, per AV.W2 §3a); `fbm` is the rotated-octave loop
// (param octaves + 2.0 lacunarity, blob-local) that reads the FBM_ROT rotation
// constant spliced from the shared chunk. Two exports: the assembler splices the
// W2 ${FBM_ROT_GLSL} BETWEEN them (the hash + value noise before the constant, the
// FBM loop after) so the emitted source order is character-equivalent.
export const METABALL_EDGE_NOISE_PRE_GLSL = /* glsl */ `// --- Noise ---

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
// the loop below stays blob-local (param octaves + 2.0 lacunarity, per §3a).`;

export const METABALL_EDGE_NOISE_POST_GLSL = /* glsl */ `float fbm(vec2 p, int octaves) {
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
`;
