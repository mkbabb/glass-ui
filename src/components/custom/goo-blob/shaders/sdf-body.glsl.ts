// GooBlob SDF core — the metaball body field primitives.
//
// `sdCircle` is the signed-distance to a circle. The smooth-minimum is the IQ
// 2024 NORMALIZED form: `uSmoothK` is a real blend-thickness in DISTANCE units.
// The prior `h*h*k*0.25` form folded a 0.25 magic factor into k, which is why
// `useMetaballRenderer.ts` divided the config `smoothK` by `0.22` before upload —
// a fudge papering over the un-normalized scale. The `k *= 4.0` pre-scale makes
// the polynomial's effective blend band equal to `k`, so a `uSmoothK` of `0.2`
// reads as a ~0.2-unit-wide meniscus — measurable, not magic (the
// `proof:blob-smin-normalized` gate sweeps it).
//
// Two merge variants, config-gated on `uMerge` (0 = quadratic, 1 = circular):
//   - QUADRATIC (`sminQuadratic`) — the polynomial smin; cheap, slightly creased.
//   - CIRCULAR (`sminCircular`) — IQ's circular smin; a true quarter-circle fillet
//     at the seam, the rounder/wetter premium-droplet read.
//
// Both reference the `uMerge`/`uSmoothK` uniforms declared in metaball.frag.ts;
// spliced verbatim into METABALL_FRAGMENT_SRC by the assembler.
export const METABALL_SDF_GLSL = /* glsl */ `// --- SDF ---

float sdCircle(vec2 p, vec2 center, float radius) {
    return length(p - center) - radius;
}

// IQ 2024 quadratic-polynomial smin, NORMALIZED so k is a blend band in distance
// units. The k *= 4.0 pre-scale makes the h*h*k*0.25 poly's effective blend width
// equal to k (the un-normalized form's width was 0.25*k).
float sminQuadratic(float a, float b, float k) {
    k *= 4.0;
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * k * 0.25;
}

// IQ circular smin — a quarter-circle fillet at the seam (rounder than the
// quadratic). The k *= 1.0/(1.0-sqrt(0.5)) factor normalizes k to the same
// blend-band units so the merge axis swaps shape without re-tuning uSmoothK.
float sminCircular(float a, float b, float k) {
    k *= 1.0 / (1.0 - sqrt(0.5));
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - k * 0.5 * (1.0 + h - sqrt(1.0 - h * (h - 2.0)));
}

// Config-gated merge dispatch — uMerge 0 = quadratic, 1 = circular.
float smin(float a, float b, float k) {
    if (uMerge > 0.5) return sminCircular(a, b, k);
    return sminQuadratic(a, b, k);
}`;
