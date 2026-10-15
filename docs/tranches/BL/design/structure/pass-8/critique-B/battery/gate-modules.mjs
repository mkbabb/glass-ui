#!/usr/bin/env node
// gate-modules.mjs <tree> <seal rel path> · critique-B pass 8 · written and hashed BEFORE reading pass-8/B-kit.
// Prints, one per line, every module file the gate loads from the tree: the closure of the seal over RELATIVE
// specifiers in static import/export-from, side-effect imports and literal dynamic import() (both are evaluated when
// the gate runs; a dynamic import under the CLI guard is exactly the cure P7-G1 names). Bare specifiers (node:, npm)
// are not the tree's. The seal file itself is printed first. Used by crash8.sh to plant a module-scope throw in each.
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";
const [T, SEAL] = process.argv.slice(2);
const root = resolve(T);
const start = join(root, SEAL);
const EXT = ["", ".mjs", ".js", "/index.mjs", "/index.js"];
const res = (b) => { for (const x of EXT) { const p = b + x; if (existsSync(p) && statSync(p).isFile()) return p; } return null; };
const seen = new Set([start]); const q = [start]; const out = [];
while (q.length) {
    const f = q.shift(); out.push(relative(root, f));
    const t = readFileSync(f, "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    const specs = [
        ...[...t.matchAll(/^\s*(?:import|export)\s+[^;]*?\sfrom\s*["']([^"']+)["']/gm)].map((m) => m[1]),
        ...[...t.matchAll(/^\s*import\s*["']([^"']+)["']/gm)].map((m) => m[1]),
        ...[...t.matchAll(/\bimport\s*\(\s*["']([^"']+)["']\s*\)/g)].map((m) => m[1]),
    ];
    for (const s of specs) {
        if (!s.startsWith(".")) continue;
        const p = res(join(dirname(f), s));
        if (p && /\.(m?js)$/.test(p) && !seen.has(p)) { seen.add(p); q.push(p); }
    }
}
console.log(out.join("\n"));
