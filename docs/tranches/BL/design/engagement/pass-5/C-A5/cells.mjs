// prints the cells of a witness JSON matching a regex: node cells.mjs <json> <regex> [maxlen]
import fs from "node:fs";
const [, , file, re = ".", n = "220"] = process.argv;
const j = JSON.parse(fs.readFileSync(file, "utf8"));
for (const c of j.cells) if (new RegExp(re).test(c.name)) console.log(`${c.status.padEnd(10)} ${c.name} | ${String(c.line).slice(0, +n)}`);
