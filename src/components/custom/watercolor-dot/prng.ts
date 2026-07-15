// Watercolor-dot PRNG surface — so a dot keyed by `color + seed` reproduces the
// same organic blob shape across mounts. The core `mulberry32` + `hashString`
// is the shared `src/composables/glass/procedural/prng.ts` leaf (AV.W14 single-source); the 8-value
// border-radius helpers below are watercolor-local (single-component) and stay
// here. Re-exported so the existing named surface (and the package barrel) is
// byte-identical.
export { mulberry32, hashString } from "../../../composables/glass/procedural/prng";

/** Generate 8 random border-radius percentages in [lo, hi] using the given PRNG. */
export function randomRadii(rng: () => number, lo: number, hi: number): number[] {
    const out: number[] = [];
    for (let i = 0; i < 8; i++) {
        out.push(lo + rng() * (hi - lo));
    }
    return out;
}

/** Serialise 8 radii into a CSS `border-radius` shorthand (4 corners / 4 corners). */
export function radiiToCSS(r: number[]): string {
    return `${r[0]}% ${r[1]}% ${r[2]}% ${r[3]}% / ${r[4]}% ${r[5]}% ${r[6]}% ${r[7]}%`;
}
