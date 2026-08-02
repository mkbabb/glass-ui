#!/usr/bin/env node
// Generate the component-only public CSS entry from the ordered style closure.
// The CLI remains for existing callers; the shared Vite lifecycle supplies the
// already-derived order so this generator owns no second source allowlist.

import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = resolve(REPO_ROOT, "dist");

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

function deriveCompatibilityMembers(outputRoot) {
    const glassRoot = resolve(outputRoot, "styles/glass");
    if (!existsSync(glassRoot)) return [];
    return readdirSync(glassRoot)
        .filter((name) => name.endsWith(".css"))
        .map((name) => resolve(glassRoot, name))
        .filter(hasComponentStyles)
        .map((path) => `./${relative(outputRoot, path)}`)
        .sort();
}

export function generateComponentStyles(outputRoot = DIST, orderedSources = []) {
    const members = orderedSources.length
        ? orderedSources
              .filter((source) => source.endsWith(".css"))
              .filter(hasComponentStyles)
              .map((source) => outputMember(outputRoot, source))
        : deriveCompatibilityMembers(outputRoot);
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

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    generateComponentStyles(process.argv[2] ? resolve(process.argv[2]) : DIST);
}
