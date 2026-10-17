#!/usr/bin/env node
// crit-ringread.mjs · D3 pass 6, the critic: row 6 (M-3). Reads the ring PNGs the BATTERY's capture wrote (no browser),
// so the Close ring's 2.66 is read from the very pixels M-3 scored. For every ring whose spec matches --spec (default
// the real Dialog), it prints the probe's geometry (band rows, inside and outside rows, columns), then each column's
// pixels from 3 rows above the band to 3 below, and each column's min(inside, outside) contrast, the value M-3 takes p05 of.
//   node crit-ringread.mjs <capdir> [--theme light] [--engine chromium] [--spec dialog] [--grounds paper,white]
import path from "node:path";
import { cli, list, loadCapture, readPng, hex, cr, f } from "../harness/lib.mjs";

const a = cli({ theme: { type: "string" }, engine: { type: "string" }, spec: { type: "string" }, grounds: { type: "string" } });
const cap = loadCapture(a._[0]);
const theme = a.theme || "light", engine = a.engine || "chromium", spec = new RegExp(a.spec || "dialog"), grounds = list(a.grounds, []);
const at = (png, x, y) => { const i = (y * png.width + x) * 4; return [png.data[i], png.data[i + 1], png.data[i + 2]]; };
for (const cell of cap.cells.filter((c) => c.engine === engine && c.theme === theme && (!grounds.length || grounds.includes(c.ground)))) {
  for (const r of (cell.rings || []).filter((r) => r.painted && r.file && spec.test(r.spec || ""))) {
    const png = readPng(path.join(cap.capdir, r.file));
    console.log(`RINGREAD ${engine} ${theme} ${cell.scene}·${cell.ground} ${r.spec}:${r.id} ow ${r.width} off ${r.offset} fv ${r.focusVisible} band ${r.cols[0].band.join(",")} in ${r.cols[0].in} out ${r.cols[0].out} clip-origin ${r.dx},${r.dy} cols ${r.cols.map((c) => c.x).join(",")}`);
    for (const c of r.cols) {
      const y0 = c.out - 3, y1 = c.in + 3, prof = [];
      for (let y = y0; y <= y1; y++) prof.push(`${y}:${hex(at(png, c.x - r.dx, y - r.dy))}`);
      const band = c.band.map((y) => at(png, c.x - r.dx, y - r.dy)), m = [0, 1, 2].map((k) => band.reduce((s, p) => s + p[k], 0) / band.length);
      const vi = cr(m, at(png, c.x - r.dx, c.in - r.dy)), vo = cr(m, at(png, c.x - r.dx, c.out - r.dy));
      console.log(`   x ${c.x}: in ${f(vi)} out ${f(vo)} min ${f(Math.min(vi, vo))} · ${prof.join(" ")}`);
    }
  }
}
