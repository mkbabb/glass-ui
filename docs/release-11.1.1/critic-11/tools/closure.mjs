// Critic 1: an entry's static import closure inside a built dist, raw and gzipped.
//   node closure.mjs <dist dir> <entry file>...
import { readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { dirname, resolve, relative } from "node:path";
const [dist, ...entries] = process.argv.slice(2);
for (const entry of entries) {
    const seen = new Set();
    const walk = (file) => {
        if (seen.has(file)) return;
        seen.add(file);
        let src;
        try { src = readFileSync(file, "utf8"); } catch { seen.delete(file); return; }
        for (const m of src.matchAll(/(?:from|import)\s*["'](\.{1,2}\/[^"']+)["']/g)) walk(resolve(dirname(file), m[1]));
    };
    walk(resolve(dist, entry));
    if (!seen.size) { console.log(JSON.stringify({ entry, missing: true })); continue; }
    let raw = 0, gz = 0;
    const rows = [...seen].map((f) => { const b = readFileSync(f); const g = gzipSync(b, { level: 9 }).length; raw += b.length; gz += g; return [relative(dist, f), b.length, g]; });
    console.log(JSON.stringify({ entry, files: seen.size, raw, gz, entryGz: rows[0][2] }));
    if (process.env.LIST) for (const r of rows.sort((a, b) => b[2] - a[2]).slice(0, 12)) console.log("  ", r.join(" "));
}
