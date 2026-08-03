// Generate the component-only public CSS entry from the ordered style closure
// the shared Vite lifecycle supplies, so this generator owns no second source
// allowlist.

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function hasComponentStyles(path) {
    return /\.glass-(?:track-well|value-marks)\b/.test(
        readFileSync(path, "utf8").replace(/\/\*[\s\S]*?\*\//g, ""),
    );
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
    writeFileSync(output, `${imports}\n`, "utf8");
    console.log(`gen-component-styles: wrote ${output}`);
    return { output, members: [...new Set([...members, "./glass-ui.css"])] };
}
