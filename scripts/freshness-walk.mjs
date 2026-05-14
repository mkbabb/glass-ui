/**
 * Freshness walker — canonical implementation of the mtime tree-walk used by
 * the freshness gate (`scripts/freshness-gate.mjs`, prebuild lifecycle) and
 * the consumer-side helper (`src/freshness.ts`, exported as
 * `assertDistFresh()`).
 *
 * Single source of truth per O.W5 Lane C (DRY extract). Both consumers
 * statically import from here so the algorithm + constants live in exactly
 * one place. The TS runtime path is bundled to `dist/freshness.js` via Vite;
 * the `.mjs` source has a sibling `.d.mts` declaration so `tsc` can resolve
 * the static import with `moduleResolution: "bundler"`.
 */
import { readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

export const SRC_EXT = new Set([".ts", ".vue", ".tsx"]);
export const SKIP_DIRS = new Set(["__tests__", "tests", "node_modules", "dist"]);

/**
 * Walk `dir` recursively; return the newest file mtime under it.
 *
 * Skips entries whose name is in `SKIP_DIRS` (regardless of depth). Counts
 * only files whose extension is in `SRC_EXT`. Returns `{ mtimeMs: 0, path:
 * "" }` when `dir` does not exist.
 *
 * @param {string} dir Absolute directory path.
 * @returns {{ mtimeMs: number, path: string }}
 */
export function walkNewestMtime(dir) {
    let newest = 0;
    let newestPath = "";
    if (!existsSync(dir)) return { mtimeMs: 0, path: "" };
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        if (SKIP_DIRS.has(entry.name)) continue;
        const full = join(dir, entry.name);
        if (entry.isDirectory()) {
            const r = walkNewestMtime(full);
            if (r.mtimeMs > newest) {
                newest = r.mtimeMs;
                newestPath = r.path;
            }
        } else if (entry.isFile()) {
            const dot = entry.name.lastIndexOf(".");
            if (dot < 0) continue;
            const ext = entry.name.slice(dot);
            if (!SRC_EXT.has(ext)) continue;
            const m = statSync(full).mtimeMs;
            if (m > newest) {
                newest = m;
                newestPath = full;
            }
        }
    }
    return { mtimeMs: newest, path: newestPath };
}
