// seqdiff.mjs <base.seq> <now.seq> — the F-4 flattened sequences (cascade.mjs snapshot): the rules whose relative order changed (outside the longest common subsequence), listed; exit 0 always (it measures, the verifier judges)
import { readFileSync } from "node:fs";
const a = readFileSync(process.argv[2], "utf8").split("\n"), b = readFileSync(process.argv[3], "utf8").split("\n");
const n = a.length, m = b.length;
const L = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i][j] = a[i] === b[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
let i = 0, j = 0; const outA = [], outB = [];
while (i < n && j < m) { if (a[i] === b[j]) { i++; j++; } else if (L[i + 1][j] >= L[i][j + 1]) outA.push(a[i++]); else outB.push(b[j++]); }
while (i < n) outA.push(a[i++]); while (j < m) outB.push(b[j++]);
console.log(`rules ${n}/${m}; common subsequence ${L[0][0]}; moved ${outA.length}`);
for (const x of outA) console.log("  moved:", x.slice(0, 110));
