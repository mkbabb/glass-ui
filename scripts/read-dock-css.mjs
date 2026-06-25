// AX.W06 — the dock-CSS authority reader.
//
// dock.css was a 1762-line god-module that EVERY dock structural-proof gate
// read directly (`readFileSync("src/styles/dock.css")`). AX.W06 CARVED it into
// `src/styles/dock/` cohesive partials (shell · morph · density · layers ·
// layer-group · overflow), each @import-ed by the thin `dock.css` core in the
// SAME `@layer components`. The dock CSS AUTHORITY is therefore now the partial
// SET, not the single file. This helper returns the authority as ONE
// concatenated string (the core + the six partials in @import / cascade order),
// so a gate that scanned `dock.css` for a structural rule keeps finding it after
// the carve with a one-line read swap — no detector change. The concatenation
// preserves the on-disk source order (core's @property + shared groups, then the
// six partials in cascade order), which is the order the cascade itself reads.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

// The cascade order of the carved partials (matches the @import order in
// dock.css + the cascade the carve preserves bit-for-bit).
export const DOCK_PARTIAL_ORDER = [
    "shell.css",
    "morph.css",
    "adaptive-legibility.css",
    "density.css",
    "layers.css",
    "layer-group.css",
    "overflow.css",
];

/**
 * Read the dock CSS authority (the `dock.css` core + the `src/styles/dock/`
 * partials) as one concatenated string in cascade order. `root` is the repo
 * root (the same `ROOT` each gate's `cliPaths()` already computes).
 */
export function readDockCss(root) {
    const core = resolve(root, "src/styles/dock.css");
    const dir = resolve(root, "src/styles/dock");
    const parts = [];
    if (existsSync(core)) parts.push(readFileSync(core, "utf8"));
    if (existsSync(dir)) {
        // Read in the canonical cascade order; append any future partial not yet
        // listed (alpha) so a new cohesion axis is never silently dropped.
        const present = new Set(
            readdirSync(dir).filter((f) => f.endsWith(".css")),
        );
        const ordered = [
            ...DOCK_PARTIAL_ORDER.filter((f) => present.has(f)),
            ...[...present].filter((f) => !DOCK_PARTIAL_ORDER.includes(f)).sort(),
        ];
        for (const f of ordered) parts.push(readFileSync(resolve(dir, f), "utf8"));
    }
    return parts.join("\n");
}
