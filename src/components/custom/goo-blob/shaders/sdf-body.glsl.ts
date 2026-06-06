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

// Edit #2 — Inigo Quilez quadratic polynomial smin (same uSmoothK uniform). The
// quadratic h*h*k*0.25 form has a cleaner C1 seam than the prior cubic smin.
float smin(float a, float b, float k) {
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * k * 0.25;
}`;
