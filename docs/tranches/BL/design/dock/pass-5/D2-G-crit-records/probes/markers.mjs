// markers.mjs (D2-G critic): read an ST cast's frames for the two black markers. Per frame, the dark runs (avg < 90)
// on the darkest row, as x ranges, and whether stall.mjs's own read windows (x0+3/x0+4 .. +10) see them.
//   node markers.mjs <cast dir> [MXa MXb]
import fs from "node:fs";
import path from "node:path";
import { readFrame } from "../../../harness/lib.mjs";
const dir = process.argv[2]; const MX = [Number(process.argv[3] ?? 1396), Number(process.argv[4] ?? 1418)];
const fr = fs.readdirSync(dir).filter((f) => /^f\d+\.png$/.test(f)).sort();
for (const [i, f] of fr.entries()) {
  const img = readFrame({ file: path.join(dir, f), origin: { x: 0, y: 0 } });
  const runs = []; let best = null;
  for (let y = 0; y < img.h; y++) { let x0 = -1; for (let x = 1300; x <= img.w; x++) { let d = false; if (x < img.w) { const k = (y * img.w + x) * 4; d = (img.data[k] + img.data[k + 1] + img.data[k + 2]) / 3 < 60; } if (d && x0 < 0) x0 = x; if (!d && x0 >= 0) { runs.push([y, x0, x - 1]); x0 = -1; } } }
  const xs = [...new Set(runs.map(([, a, b]) => `${a}-${b}`))];
  const dark = (x0) => { let lo = 255; for (let y = 0; y < img.h; y++) { let s = 0; for (let x = x0; x < x0 + 10; x++) { const k = (y * img.w + x) * 4; s += (img.data[k] + img.data[k + 1] + img.data[k + 2]) / 3; } lo = Math.min(lo, s / 10); } return Math.round(lo); };
  console.log(`${f} w${img.w} dark runs x>=1300: ${xs.slice(0, 6).join(" ") || "-"}  readA(min avg)=${dark(MX[0] + 3)} readB=${dark(MX[1] + 4)}`);
}
