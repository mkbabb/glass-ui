// C-E5 reader: print every cell of witness JSON files as `STATUS name · line` (optionally filtered by a regex)
//   node cells.mjs <file.json…> [--grep <re>] [--w <width>]
import fs from "node:fs";
const args = process.argv.slice(2); let re = null, w = 260; const files = [];
for (let i = 0; i < args.length; i++) { if (args[i] === "--grep") re = new RegExp(args[++i]); else if (args[i] === "--w") w = +args[++i]; else files.push(args[i]); }
for (const f of files) { const j = JSON.parse(fs.readFileSync(f, "utf8")); for (const c of j.cells) { const s = `${c.status.padEnd(10)} ${c.name} · ${c.line}`; if (!re || re.test(s)) console.log(s.slice(0, w)); } }
