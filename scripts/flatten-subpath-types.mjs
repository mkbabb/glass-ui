#!/usr/bin/env node
// Generate flat declaration entries from the semantic entry graph Vite scans
// in vite.library.ts. Component declarations stay in their emitted
// flat family homes; only the public entry declarations are generated here.

import { rmSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildEntrySet, readTree } from "./lib/subpath-policy.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = resolve(ROOT, "dist");
const { entries } = buildEntrySet(readTree());

for (const [name, source] of Object.entries(entries)) {
    const target = resolve(distDir, `${name === "index" ? "index" : name}.d.ts`);
    const emitted = resolve(
        distDir,
        source.replace(/^src\//, "").replace(/(?:\/index)?\.ts$/, ".d.ts"),
    );
    if (target === emitted) continue;
    let specifier = relative(dirname(target), emitted).replace(/\.d\.ts$/, "");
    if (!specifier.startsWith(".")) specifier = `./${specifier}`;
    writeFileSync(target, `export * from ${JSON.stringify(specifier)};\n`);
}

rmSync(resolve(distDir, "subpaths"), { recursive: true, force: true });
console.log(`declaration entries: projected ${Object.keys(entries).length} public entries`);
