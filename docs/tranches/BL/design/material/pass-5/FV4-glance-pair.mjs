#!/usr/bin/env node
// FV4-glance-pair.mjs · the owner-glance pair for R-6 (H-13's form: base on the left, route on the right, one crop each).
// glance.mjs cannot show R-6: its pairs are the dock, the Dialog and the floating plate, painted at rest, and R-6 changes
// only what a menu row paints under a resting pointer. FV4-hover-probe.mjs --shot banks the open menu with the pointer on
// row 0 and the keyboard's highlight on row 1; this composes two such frames side by side with a 12 px gutter and prints
// the share of pixels that differ by more than 8/255 (the glance's own paint threshold) inside the common box.
//   node FV4-glance-pair.mjs <left.png> <right.png> <out.png>
import fs from "node:fs";
import { PNG } from "../harness/lib.mjs";
const [l, r, out] = process.argv.slice(2);
const A = PNG.sync.read(fs.readFileSync(l)), Bp = PNG.sync.read(fs.readFileSync(r));
const G = 12, W = A.width + G + Bp.width, H = Math.max(A.height, Bp.height);
const o = new PNG({ width: W, height: H });
o.data.fill(255);
const blit = (src, ox) => { for (let y = 0; y < src.height; y++) for (let x = 0; x < src.width; x++) { const i = (y * src.width + x) * 4, j = (y * W + x + ox) * 4; for (let k = 0; k < 4; k++) o.data[j + k] = src.data[i + k]; } };
blit(A, 0); blit(Bp, A.width + G);
let diff = 0, n = 0;
for (let y = 0; y < Math.min(A.height, Bp.height); y++) for (let x = 0; x < Math.min(A.width, Bp.width); x++) {
  const i = (y * A.width + x) * 4, j = (y * Bp.width + x) * 4; n++;
  if (Math.max(Math.abs(A.data[i] - Bp.data[j]), Math.abs(A.data[i + 1] - Bp.data[j + 1]), Math.abs(A.data[i + 2] - Bp.data[j + 2])) > 8) diff++;
}
fs.writeFileSync(out, PNG.sync.write(o));
console.log(`${out}: ${A.width}x${A.height} | ${Bp.width}x${Bp.height}; paint delta ${(100 * diff / n).toFixed(2)}% of ${n} px`);
