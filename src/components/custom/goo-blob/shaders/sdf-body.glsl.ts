// GooBlob SDF core — the metaball body field primitives.
//
// `sdCircle` is the signed-distance to a circle; `smin` is the Inigo Quilez
// quadratic-polynomial smooth-minimum (the gooey merge between the body and its
// satellites — the quadratic h*h*k*0.25 form has a cleaner C1 seam than a cubic
// smin). Spliced verbatim into METABALL_FRAGMENT_SRC by the metaball.frag.ts
// assembler — the emitted shader string is character-equivalent.
export const METABALL_SDF_GLSL = /* glsl */ `// --- SDF ---

float sdCircle(vec2 p, vec2 center, float radius) {
    return length(p - center) - radius;
}

// W9.a — the IQ 2024 NORMALIZED quadratic smin. The `k *= 4.0` lift makes uSmoothK
// a REAL blend-thickness in distance units (the prior h*h*k*0.25 form folded a
// magic /4 into the coefficient, so uSmoothK was decoupled from the measured neck
// width). With this form uSmoothK maps directly to the merge band, so the /0.22
// normalizer + the POS_SCALE multiply on the uSmoothK upload are deleted.
float smin(float a, float b, float k) {
    k *= 4.0;
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * k * (1.0 / 4.0);
}

// W9.a — the config-gated CIRCULAR smin (rounder menisci than the quadratic). The
// IQ circular form: the merge boundary is a quarter-circle arc, so the satellite
// fusion reads as a true wet meniscus rather than a parabolic seam. Same uSmoothK
// thickness contract. Dispatched on uMerge (0 quadratic default, 1 circular).
float sminCircular(float a, float b, float k) {
    k *= 1.0 / (1.0 - sqrt(0.5));
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - k * 0.5 * (1.0 + h - sqrt(1.0 - h * (h - 2.0)));
}

// The dispatch — uMerge selects the blend curve. Both honour uSmoothK as the
// distance-unit neck width (the W9.a normalized contract).
float sminBlend(float a, float b, float k) {
    if (uMerge == 1) return sminCircular(a, b, k);
    return smin(a, b, k);
}`;
