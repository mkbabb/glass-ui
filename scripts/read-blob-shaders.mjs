// AZ.W-GATES (D5) — the blob-shader authority reader.
//
// The goo-blob fragment program was a single `metaball.frag.ts`; the AY-era
// shader split CARVED the uniform DECLARATIONS into `metaball-uniforms.glsl.ts`
// (the #define TRAIL_N + the uTrailPos/uTrailRadius arrays, the uTrailCount
// uniform) while the LOOP BODY (the `for (int i = 0; i < TRAIL_N; …)` walk) stayed
// in `metaball.frag.ts`. A gate that scanned `metaball.frag.ts` alone for the
// trail-define + the uTrailPos uniform now matches the WRONG file. This helper
// returns the shader AUTHORITY as ONE concatenated string (the uniforms partial +
// the frag + the other goo-blob/shaders/*.glsl.ts in source order), mirroring the
// read-dock-css.mjs authority-reader precedent — so a gate that scanned the frag
// for a uniform declaration keeps finding it after the carve with a one-line read
// swap. The vert is excluded (it carries no fragment uniforms).

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

// The source order of the carved shader chunks (uniforms first — the frag splices
// them ahead of the body; the remaining .glsl.ts leaves follow in alpha order).
export const BLOB_SHADER_ORDER = [
    "metaball-uniforms.glsl.ts",
    "metaball.frag.ts",
];

/**
 * Read the blob-shader authority (the metaball uniforms partial + the frag + the
 * other goo-blob/shaders/*.glsl.ts chunks) as one concatenated string in source
 * order. `root` is the repo root (the same `ROOT` each gate's `cliPaths()`
 * computes). The vert (`metaball.vert.ts`) is excluded — it holds no fragment
 * uniform declarations.
 */
export function readBlobShaders(root) {
    const dir = resolve(root, "src/components/custom/goo-blob/shaders");
    if (!existsSync(dir)) return "";
    const present = new Set(
        readdirSync(dir).filter(
            (f) => /\.(frag|glsl)\.ts$/.test(f) && f !== "metaball.vert.ts",
        ),
    );
    const ordered = [
        ...BLOB_SHADER_ORDER.filter((f) => present.has(f)),
        ...[...present].filter((f) => !BLOB_SHADER_ORDER.includes(f)).sort(),
    ];
    return ordered.map((f) => readFileSync(resolve(dir, f), "utf8")).join("\n");
}
