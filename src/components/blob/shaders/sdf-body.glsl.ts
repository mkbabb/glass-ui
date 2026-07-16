// GooBlob SDF core — the metaball body field primitives.
//
// `sdCircle` is the signed-distance to a circle. The smooth-minimum is the IQ
// 2024 NORMALIZED form: `uSmoothK` is a real blend-thickness in DISTANCE units.
// The prior `h*h*k*0.25` form folded a 0.25 magic factor into k, which is why
// `useMetaballRenderer.ts` divided the config `smoothK` by `0.22` before upload —
// a fudge papering over the un-normalized scale. The `k *= 4.0` pre-scale makes
// the polynomial's effective blend band equal to `k`, so a `uSmoothK` of `0.2`
// reads as a ~0.2-unit-wide meniscus — measurable, not magic (the
// both merge variants share the same practical band width).
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

// Value and gradient circle: returns vec3(d, dd/dx, dd/dy). The circle
// gradient is the UNIT radial direction (p - center)/length(p - center) (the
// eikonal property holds EXACTLY for a circle), guarded at the degenerate centre.
// This is the keystone of the analytic-gradient smin: carrying the gradient
// through the scene field DELETES the per-pixel 4-tap normal (4 full sceneDist
// evals, each running 3-octave FBM + the sat/trail loops).
vec3 sdgCircle(vec2 p, vec2 center, float radius) {
    vec2 d = p - center;
    float len = length(d);
    vec2 grad = len > 1e-6 ? d / len : vec2(0.0, 1.0);
    return vec3(len - radius, grad);
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
}

// Value and gradient smin. a/b are vec3(dist, grad.xy); the blended
// gradient is mix(a.yz, b.yz, w) with the interpolation weight w the distance
// blend uses (IQ's vec2-smin insight). This propagates the analytic gradient
// through the merge so the surface normal reads the field gradient DIRECTLY — no
// finite-difference tap. The blend weight matches each variant.
vec3 sminQuadraticG(vec3 a, vec3 b, float k) {
    k *= 4.0;
    float h = max(k - abs(a.x - b.x), 0.0) / k;
    float m = h * h * k * 0.25;
    // h-weight that selects which surface dominates (0 → a, 1 → b).
    float w = (a.x < b.x) ? 0.5 * h * h : 1.0 - 0.5 * h * h;
    float dist = min(a.x, b.x) - m;
    vec2 grad = mix(a.yz, b.yz, w);
    return vec3(dist, grad);
}

vec3 sminCircularG(vec3 a, vec3 b, float k) {
    k *= 1.0 / (1.0 - sqrt(0.5));
    float h = max(k - abs(a.x - b.x), 0.0) / k;
    float m = k * 0.5 * (1.0 + h - sqrt(1.0 - h * (h - 2.0)));
    float w = (a.x < b.x) ? 0.5 * h : 1.0 - 0.5 * h;
    float dist = min(a.x, b.x) - m;
    vec2 grad = mix(a.yz, b.yz, w);
    return vec3(dist, grad);
}

vec3 sminG(vec3 a, vec3 b, float k) {
    if (uMerge > 0.5) return sminCircularG(a, b, k);
    return sminQuadraticG(a, b, k);
}`;
