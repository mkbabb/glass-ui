// Shared seeded, deterministic procedural PRNG leaf — the single source for the
// byte-identical `mulberry32` + `hashString` that goo-blob, handmark, constellation
// and fourier-field all seed their organic shapes from. A shape keyed by
// `color + seed` reproduces across mounts. Component-specific derivations stay
// local to their own dir; this leaf holds only the two primitives.

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
