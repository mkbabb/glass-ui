import { createRequire } from "node:module"; import fs from "node:fs";
const { PNG } = createRequire("/Users/mkbabb/Programming/glass-ui/package.json")("pngjs");
const [a, b] = process.argv.slice(2).map((f) => PNG.sync.read(fs.readFileSync(f)));
let n = 0, s = 0, N = a.width * a.height; const L = (p, i) => 0.2126 * p.data[i] + 0.7152 * p.data[i + 1] + 0.0722 * p.data[i + 2];
for (let i = 0; i < a.data.length; i += 4) { const d = Math.abs(L(a, i) - L(b, i)); s += d; if (d >= 16) n++; }
console.log(`${a.width}x${a.height} frac≥16 ${(100 * n / N).toFixed(1)}% mean ${(s / N).toFixed(2)}`);
