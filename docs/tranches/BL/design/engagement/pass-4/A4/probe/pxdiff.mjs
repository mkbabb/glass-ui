// P-A4: mean |Δ| per channel (0-255) and the count of changed pixels between two PNG frames of the same size. A read of
// the captured frames (CK-25), not a witness.   node pxdiff.mjs a.png b.png [c.png …]  (each against the first)
import fs from "node:fs";
import pngjs from "/Users/mkbabb/Programming/glass-ui/node_modules/pngjs/lib/png.js"; const { PNG } = pngjs;
const [a, ...rest] = process.argv.slice(2); const A = PNG.sync.read(fs.readFileSync(a));
for (const b of rest) { const B = PNG.sync.read(fs.readFileSync(b));
  if (A.width !== B.width || A.height !== B.height) { console.log(`${b.split("/").pop()} size ${B.width}x${B.height} vs ${A.width}x${A.height}`); continue; }
  let s = 0, n = 0, mx = 0; for (let i = 0; i < A.data.length; i += 4) { const d = Math.max(...[0, 1, 2].map((k) => Math.abs(A.data[i + k] - B.data[i + k]))); s += d; if (d > 2) n++; mx = Math.max(mx, d); }
  console.log(`${b.split("/").pop()} vs ${a.split("/").pop()}: mean |Δ| ${(s / (A.data.length / 4)).toFixed(3)} · ${n} px > 2 · max ${mx}`); }
