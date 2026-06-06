// Shared seeded, deterministic PRNG leaf (AV.W14) — the single source for the
// byte-identical `mulberry32` + `hashString` that the watercolor-dot and
// goo-blob both seed their organic shapes from. A dot/blob keyed by
// `color + seed` reproduces the same shape across mounts. Component-specific
// derivations (the watercolor border-radius helpers) stay local to their dir.

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
