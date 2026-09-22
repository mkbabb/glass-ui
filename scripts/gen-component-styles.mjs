// Generate the component-only public CSS entry from the ordered style closure
// the shared Vite lifecycle supplies, so this generator owns no second source
// allowlist.

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/* The shared component-structure registers a consumer loses if it imports the raw
   SFC bundle alone: the groove (`.track-well`), the indeterminate flow band
   (`.track-flow`) and the checkpoint dots (`.glass-value-marks`). Each is emitted
   as a CLASS by an SFC template but declared in a partial, so the manifest has to
   fold the partial in. `.track-flow` was missing from this predicate while
   `Progress`/`Timeline` already emitted the class — the flow band shipped with no
   rules on `./styles.css`. Comments are stripped first so a mention can never
   enrol a file. */
function hasComponentStyles(path) {
    return /\.(?:track-well|track-flow|glass-value-marks)\b/.test(
        readFileSync(path, "utf8").replace(/\/\*[\s\S]*?\*\//g, ""),
    );
}

/* The layer order `./styles` declares at `styles/index.css:1`, read rather than restated.
   Every shipped rule sits in `@layer components` (A-3-CLASS, 10.0.0), so the
   component-only entry declares the same order before its first import and its layers
   rank exactly as the full entry's do. */
function declaredLayerOrder() {
    const order = readFileSync(resolve(REPO_ROOT, "src/styles/index.css"), "utf8").match(
        /^@layer [^;{]+;/m,
    );
    if (!order) throw new Error("gen-component-styles: styles/index.css declares no @layer order");
    return order[0];
}

function outputMember(outputRoot, source) {
    const sourceRoot = resolve(REPO_ROOT, "src");
    if (source.startsWith(`${sourceRoot}/`)) return `./${relative(sourceRoot, source)}`;
    return `./${relative(outputRoot, source)}`;
}

export function generateComponentStyles(outputRoot, orderedSources) {
    const members = orderedSources
        .filter((source) => source.endsWith(".css"))
        .filter(hasComponentStyles)
        .map((source) => outputMember(outputRoot, source));
    const imports = [...new Set([...members, "./glass-ui.css"])]
        .map((member) => `@import ${JSON.stringify(member)};`)
        .join("\n");
    const missing = [...new Set([...members, "./glass-ui.css"])]
        .filter((member) => !existsSync(resolve(outputRoot, member)));
    if (missing.length) {
        throw new Error(`gen-component-styles: closure target(s) absent from output — ${missing.join(", ")}`);
    }
    const output = resolve(outputRoot, "component-styles.css");
    writeFileSync(output, `${declaredLayerOrder()}\n${imports}\n`, "utf8");
    console.log(`gen-component-styles: wrote ${output}`);
    return { output, members: [...new Set([...members, "./glass-ui.css"])] };
}
