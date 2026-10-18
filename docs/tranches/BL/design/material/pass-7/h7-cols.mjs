#!/usr/bin/env node
// h7-cols.mjs · D3 pass 7, H7: per-column readings of a one-cell H7-1 self-test capture (no browser): each column's
// min(inside, outside), whether its band rows are at full coverage (lib.mjs fullCoverage), and the band pixels.
//   node h7-cols.mjs <capdir>...
import path from "node:path";
import { loadCapture, readPng, at, mean3, cr, fullCoverage, hex } from "../harness/lib.mjs";
for (const d of process.argv.slice(2)) {
  const cap = loadCapture(d), c = cap.cells[0], png = readPng(path.join(d, "png/full.png"));
  for (const p of c.rings.length ? c.rings : c.specs[0].edges)
    console.log(`COLS ${path.basename(d)} ${p.kind} ow ${p.width} · ` + p.cols.map((col) => { const bp = col.band.map((y) => at(png, col.x, y)), b = mean3(bp);
      return `${col.x}${fullCoverage(bp) ? "=" : "~"}${Math.min(cr(b, at(png, col.x, col.in)), cr(b, at(png, col.x, col.out))).toFixed(2)} [${bp.map(hex).join("/")}]`; }).join(" "));
}
