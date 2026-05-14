#!/usr/bin/env node
/**
 * Freshness gate — fails loudly when `dist/` is older than `src/`.
 *
 * Closes the V.W8 stale-dist drift class (FINAL.md:104-106). Wired into
 * `package.json` as `prebuild` (with `--pre` permissive mode) so it
 * announces staleness in front of `vite build` without blocking the very
 * build that would fix it. Re-exported as `assertDistFresh()` from
 * `src/freshness.ts` for consumer-side `vite.config.ts` plug-in usage.
 *
 * Modes:
 *   - default (no flag): strict — exits 1 if any src tree's newest mtime
 *     exceeds the bundled dist artefact's mtime. Designed for standalone
 *     audit invocation (CI, hard-gate verification).
 *   - `--pre`: permissive — exits 0 always; emits a warning if stale.
 *     Designed for the `prebuild` lifecycle hook so the upcoming `vite
 *     build` can rebuild dist without the gate blocking it.
 *
 * Algorithm: walk `src/` for the newest .ts / .vue / .tsx mtime; compare
 * against `dist/glass-ui.js` and `dist/index.d.ts`. The bundle is rolled
 * up, so any source-side edit anywhere bumps the bundle's mtime on a
 * fresh build.
 */
import { statSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { walkNewestMtime } from "./freshness-walk.mjs";

function defaultRoot() {
    // Resolve the package root from this script's URL when invoked as a
    // file. When imported under a non-file loader (e.g. vitest's transform
    // pipeline), fall back to `process.cwd()` — callers pass `{ root }`
    // explicitly in that case.
    const url = import.meta.url;
    if (url && url.startsWith("file:")) {
        return resolve(fileURLToPath(new URL("../", url)));
    }
    return process.cwd();
}

/**
 * @returns {{ ok: boolean, reasons: string[] }}
 */
export function checkFreshness({ root = defaultRoot() } = {}) {
    const reasons = [];

    const distDir = join(root, "dist");
    const srcDir = join(root, "src");

    if (!existsSync(distDir)) {
        reasons.push(
            `[glass-ui freshness] dist/ does not exist — run \`npm run build\`.`,
        );
        return { ok: false, reasons };
    }

    // Newest src/ mtime — captures any edit anywhere in the tree.
    const newest = walkNewestMtime(srcDir);
    if (newest.mtimeMs === 0) {
        reasons.push(`[glass-ui freshness] no source files found under src/`);
        return { ok: false, reasons };
    }

    // The library bundle index file is the canonical "everything is rolled up
    // here" output. Use its mtime as the threshold.
    const indexJs = join(distDir, "glass-ui.js");
    const indexDts = join(distDir, "index.d.ts");

    for (const artefact of [indexJs, indexDts]) {
        if (!existsSync(artefact)) {
            reasons.push(
                `[glass-ui freshness] missing dist artefact ${artefact} — run \`npm run build\`.`,
            );
            continue;
        }
        const distMtime = statSync(artefact).mtimeMs;
        if (newest.mtimeMs > distMtime) {
            const srcDate = new Date(newest.mtimeMs).toISOString();
            const distDate = new Date(distMtime).toISOString();
            reasons.push(
                `[glass-ui freshness] dist out of date for ${artefact} — ${newest.path} (${srcDate}) > dist artefact (${distDate}). Run \`npm run build\`.`,
            );
        }
    }

    return { ok: reasons.length === 0, reasons };
}

const isMain =
    import.meta.url === `file://${process.argv[1]}` ||
    import.meta.url.endsWith(process.argv[1] ?? "");

if (isMain) {
    const isPreBuild = process.argv.slice(2).includes("--pre");
    const result = checkFreshness();
    if (!result.ok) {
        if (isPreBuild) {
            // Permissive mode — warn, don't block the upcoming rebuild.
            for (const r of result.reasons) console.warn(`[prebuild] ${r}`);
            process.exit(0);
        }
        for (const r of result.reasons) console.error(r);
        process.exit(1);
    }
    console.log("[glass-ui freshness] dist/ is fresh.");
    process.exit(0);
}
