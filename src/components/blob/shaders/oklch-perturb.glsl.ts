// GooBlob OKLCh perturbation gamut machinery — the hue-preserving inward chroma
// clamp.
//
// `inGamut` tests a linear-sRGB triple against [0,1]³; `gamutClampOklch` bisects
// the OKLCh chroma toward 0 (L + h fixed) until the linear result is in gamut,
// preserving hue exactly (only C shrinks; 16 steps resolve C to < 2^-16 of its
// span). The per-pixel L/C/h perturbation itself rides inline in main() (the
// assembly point). Reads the Ottosson space conversions spliced from the shared
// chunk. Spliced verbatim into METABALL_FRAGMENT_SRC by metaball.frag.ts.
export const METABALL_OKLCH_PERTURB_GLSL = /* glsl */ `// Edit #4's gamut step — hue-preserving inward chroma clamp. If the linear result
// is out of [0,1], bisect chroma toward 0 (L + h fixed) until in gamut. Preserves
// hue exactly (only C shrinks). 16 steps resolve C to < 2^-16 of its span.
bool inGamut(vec3 lin) {
    return all(greaterThanEqual(lin, vec3(0.0))) && all(lessThanEqual(lin, vec3(1.0)));
}
vec3 gamutClampOklch(vec3 lch) {
    vec3 lin = oklabToLinearSrgb(oklchToOklab(lch));
    if (inGamut(lin)) return lch;
    float lo = 0.0;
    float hi = lch.y;
    for (int i = 0; i < 16; i++) {
        float mid = 0.5 * (lo + hi);
        vec3 test = vec3(lch.x, mid, lch.z);
        if (inGamut(oklabToLinearSrgb(oklchToOklab(test)))) {
            lo = mid;
        } else {
            hi = mid;
        }
    }
    return vec3(lch.x, lo, lch.z);
}`;
