#!/usr/bin/env node
// Generate the flat declaration entries from the same src/subpaths entry graph
// Vite scans in vite.library.ts. Component declarations stay in their emitted
// flat family homes; only the public entry declarations are generated here.

import { readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";

const sourceDir = resolve(ROOT, "src/subpaths");
const distDir = resolve(ROOT, "dist");
const entries = new Map(
    readdirSync(sourceDir)
        .filter((file) => file.endsWith(".ts"))
        .map((file) => [file.slice(0, -3), resolve(sourceDir, file)]),
);

for (const [name, source] of entries) {
    const declaration = readFileSync(source, "utf8")
        .replace(/(from\s+["'])\.\.\//g, "$1./");
    writeFileSync(resolve(distDir, `${name}.d.ts`), declaration);
}

rmSync(resolve(distDir, "subpaths"), { recursive: true, force: true });
console.log(`declaration entries: generated ${entries.length} flat subpaths`);
