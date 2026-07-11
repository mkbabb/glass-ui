import { readFileSync, writeFileSync, readdirSync } from "node:fs";
const prefix = process.argv[2] || "census-cdark-";
const outName = process.argv[3] || "census-current-dark-merged.json";
const files = readdirSync(".").filter(f => f.startsWith(prefix) && f.endsWith(".json"));
const merged = {};
for (const f of files) Object.assign(merged, JSON.parse(readFileSync(f, "utf8")));
writeFileSync(outName, JSON.stringify(merged, null, 1));
console.log(`merged ${files.length} chunk files → ${outName} (${Object.keys(merged).length} route entries)`);
