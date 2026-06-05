// Seeded, deterministic PRNG leaf — so a watercolor dot keyed by `color + seed`
// reproduces the same organic blob shape across mounts. Mulberry32 (fast 32-bit)
// seeded from a djb2 string hash, plus the 8-value border-radius helpers the dot's
// morph reads.

/** Mulberry32 — fast 32-bit seeded PRNG. Returns a `() => number` in [0, 1). */
export function mulberry32(seed: number): () => number {
    return () => {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

/** Simple string → u32 hash (djb2). */
export function hashString(str: string): number {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0;
    }
    return hash >>> 0;
}

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
