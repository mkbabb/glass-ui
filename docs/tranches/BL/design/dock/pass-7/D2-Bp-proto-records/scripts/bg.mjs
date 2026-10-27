// boot graph as gate:boot-graph measures it: node bg.mjs <dist-demo>
import fs from "node:fs"; import path from "node:path";
const d = process.argv[2]; const html = fs.readFileSync(path.join(d, "index.html"), "utf8");
const pre = [...html.matchAll(/<link[^>]+rel="modulepreload"[^>]+href="([^"]+)"/g)].map((m) => m[1]);
const ent = [...html.matchAll(/<script[^>]+type="module"[^>]+src="([^"]+)"/g)].map((m) => m[1]);
const files = [...new Set([...ent, ...pre])]; let sum = 0; const rows = [];
for (const f of files) { const s = fs.statSync(path.join(d, f.replace(/^\//, ""))).size; sum += s; rows.push([s, f]); }
console.log(`${pre.length} preloads + ${ent.length} entry = ${files.length} files / ${sum} B; ceiling 503808; margin ${503808 - sum} B`);
for (const [s, f] of rows.filter((r) => /Dock|dock/.test(r[1]))) console.log(s, f);
