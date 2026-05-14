/**
 * Freshness gate helper — re-exported for consumer-side `vite.config.ts`
 * wiring. Closes the stale-dist drift class.
 *
 * Consumers import `assertDistFresh()` and invoke it from their
 * `vite.config.ts` (or any startup hook). When a workspace symlink points
 * at a glass-ui clone whose `dist/` is older than `src/`, the function
 * throws with a human-readable message naming the offending source file.
 *
 * The mtime tree-walk algorithm is single-sourced at
 * `scripts/freshness-walk.mjs` (canonical home — also consumed by the
 * prebuild CLI at `scripts/freshness-gate.mjs`). Static import below;
 * Vite bundles the .mjs body into `dist/freshness.js`. O.W5 Lane C
 * (DRY extract; closes Rε §"freshness DRY verdict").
 */
import { statSync, existsSync } from "node:fs";
import { resolve, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { walkNewestMtime } from "../scripts/freshness-walk.mjs";

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
