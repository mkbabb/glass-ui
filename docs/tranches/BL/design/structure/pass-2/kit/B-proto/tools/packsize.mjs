import { readFileSync } from "node:fs";
const t = readFileSync(process.argv[2], "utf8");
const r = JSON.parse(t.slice(t.lastIndexOf("\n[") + 1))[0];
console.log(JSON.stringify({ entryCount: r.entryCount, size: r.size, unpackedSize: r.unpackedSize }));
