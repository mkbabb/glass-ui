#!/usr/bin/env node
// flatten-subpath-types.mjs — AV.W5.A.
//
// W5 Lane A moved the 58 trivial one-line subpath barrels from `src/<name>.ts`
// into `src/subpaths/<name>.ts`. The JS bundle is unaffected (vite keys each
// chunk by its ENTRY NAME → `dist/<name>.js`, regardless of source location).
// The DTS emit, however, mirrors the SOURCE tree (`tsconfig.build.json` uses
// `rootDir: src` + `include: src/`), so the moved barrels' declarations land at
// `dist/subpaths/<name>.d.ts` instead of the flat `dist/<name>.d.ts` the
// `package.json` `types`/`typesVersions` contract publishes.
//
// This step restores the FLAT publication surface — byte-identical to HEAD:
//   1. move each `dist/subpaths/<name>.d.ts` → `dist/<name>.d.ts`
//   2. rewrite its single re-export's relative depth (`from "../…"` → `from
//      "./…"`) since flattening one dir shallower undeepens the path
//   3. remove the now-empty `dist/subpaths/` dir
//
// The dist `.d.ts` set is therefore identical to the pre-move publication: the
// source move is invisible to consumers (proof:subpath-enumeration + verify-
// export-types byte-stable).

import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";

const SUBPATHS_DTS = resolve(ROOT, "dist/subpaths");
const DIST = resolve(ROOT, "dist");

if (!existsSync(SUBPATHS_DTS)) {
    // Nothing to flatten — the emit produced no subpaths dir (e.g. a JS-only
    // vite build with no dts). A no-op is correct.
    console.log("flatten-subpath-types: no dist/subpaths/ — nothing to flatten.");
    process.exit(0);
}

let moved = 0;
for (const file of readdirSync(SUBPATHS_DTS)) {
    if (!file.endsWith(".d.ts")) continue;
    const src = resolve(SUBPATHS_DTS, file);
    const dest = resolve(DIST, file);
    // Undeepen the re-export path: `"../components/…"` → `"./components/…"`,
    // `"../composables/…"` → `"./composables/…"` (the barrel sat one dir deeper).
    const body = readFileSync(src, "utf8").replace(/(from\s+")\.\.\//g, "$1./");
    writeFileSync(dest, body);
    rmSync(src);
    moved++;
}

// Drop the now-empty dir so the dist tree carries no `subpaths/` artefact.
rmSync(SUBPATHS_DTS, { recursive: true, force: true });

console.log(`flatten-subpath-types: flattened ${moved} subpath .d.ts → dist/ root.`);
