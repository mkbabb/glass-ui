/**
 * Mulberry32 — fast, deterministic 32-bit PRNG. Public utility.
 *
 * Promoted from value.js's blob primitive lift; seeds the satellite state
 * machine and watercolor border-radius oscillation. SSR-safe: same seed
 * produces same sequence in Node and browser.
 *
 * Reference: https://gist.github.com/tommyettinger/46a3b06e0cba2f47bda2 (public domain)
 */
export function mulberry32(seed: number): () => number {
    let state = seed >>> 0;
    return () => {
        state = (state + 0x6d2b79f5) >>> 0;
        let t = state;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
