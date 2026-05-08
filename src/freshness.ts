/**
 * Freshness gate helper — re-exported for consumer-side `vite.config.ts`
 * wiring. Closes the V.W8 stale-dist drift class.
 *
 * Consumers import `assertDistFresh()` and invoke it from their
 * `vite.config.ts` (or any startup hook). When a workspace symlink points
 * at a glass-ui clone whose `dist/` is older than `src/`, the function
 * throws with a human-readable message naming the offending source file.
 *
 * The gate's authoritative implementation lives at
 * `scripts/freshness-gate.mjs` so it can run as a `prebuild` script
 * without requiring a TypeScript loader. This module re-imports the same
 * mtime-walk via dynamic import + a tiny pure-TS fallback that matches
 * the script's algorithm. The CLI path remains canonical; this helper
 * is the structural fix per A3 §4.3 / V.FINAL.md:104-106.
 *
 * NOTE: The W3 wave wires this into `speedtest/vite.config.ts`. W2 only
 * ships the helper.
 */
import { readdirSync, statSync, existsSync } from "node:fs";
import { resolve, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const SRC_EXT = new Set([".ts", ".vue", ".tsx"]);
const SKIP_DIRS = new Set(["__tests__", "tests", "node_modules", "dist"]);

interface NewestResult {
    mtimeMs: number;
    path: string;
}

function walkNewestMtime(dir: string): NewestResult {
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

export interface AssertDistFreshOptions {
    /**
     * Absolute path to the glass-ui package root (the directory containing
     * `package.json`, `src/`, `dist/`). Defaults to the package's own
     * resolution via `import.meta.url`.
     */
    root?: string;
}

/**
 * Throw if any source file under `<root>/src/` is newer than the bundled
 * `dist/glass-ui.js` or `dist/index.d.ts`. Used by consumer
 * `vite.config.ts` wiring to fail-closed when the workspace symlink points
 * at a stale dist.
 *
 * @param options.root — glass-ui package root. Defaults to this module's
 *   ancestor (works when imported from a workspace symlink).
 */
export function assertDistFresh(options: AssertDistFreshOptions = {}): void {
    const root =
        options.root ??
        // `dist/freshness.js` lives at `<root>/dist/freshness.js` and the
        // src twin lives at `<root>/src/freshness.ts`. Either way the parent
        // is the package root.
        resolve(dirname(fileURLToPath(import.meta.url)), "..");

    const distDir = join(root, "dist");
    const srcDir = join(root, "src");

    if (!existsSync(distDir)) {
        throw new Error(
            `[glass-ui freshness] dist/ does not exist at ${root} — run \`npm run build\`.`,
        );
    }

    const newest = walkNewestMtime(srcDir);
    if (newest.mtimeMs === 0) return;

    const indexJs = join(distDir, "glass-ui.js");
    const indexDts = join(distDir, "index.d.ts");

    for (const artefact of [indexJs, indexDts]) {
        if (!existsSync(artefact)) {
            throw new Error(
                `[glass-ui freshness] missing dist artefact ${artefact} — run \`npm run build\`.`,
            );
        }
        const distMtime = statSync(artefact).mtimeMs;
        if (newest.mtimeMs > distMtime) {
            const srcDate = new Date(newest.mtimeMs).toISOString();
            const distDate = new Date(distMtime).toISOString();
            throw new Error(
                `[glass-ui freshness] dist out of date for ${artefact} — ${newest.path} (${srcDate}) > dist (${distDate}). Run \`npm run build\`.`,
            );
        }
    }
}
