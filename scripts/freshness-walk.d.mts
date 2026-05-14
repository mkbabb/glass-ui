/**
 * Declaration sidecar for `scripts/freshness-walk.mjs` — lets `tsc` resolve
 * the canonical walker from `src/freshness.ts` under `moduleResolution:
 * "bundler"` without `allowJs`. O.W5 Lane C (DRY extract).
 */

export declare const SRC_EXT: Set<string>;
export declare const SKIP_DIRS: Set<string>;

export interface WalkNewestMtimeResult {
    mtimeMs: number;
    path: string;
}

export declare function walkNewestMtime(dir: string): WalkNewestMtimeResult;
