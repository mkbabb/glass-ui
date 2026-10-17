#!/usr/bin/env node
// crit-ringapex.mjs · D3 pass 6, the critic: row 6 (M-3), a REPORTED reading beside the gate, not a gate. No browser.
// M-3 reads a ring with no straight run (a round control: x1 − x0 < 3 in capture.mjs RING_PROBE) on three columns
// [c−1, c, c+1] around the rounded centre, with a straight band of `ow` rows, and takes p05 (= the worst of three).
// Off the apex the outline curves, so that band straddles the antialiased edge and reads part ring, part plate.
// This prints, for every such ring in the gated cells, M-3's value beside the APEX reading: the column whose band
// rows are equal (full coverage, the ring's solid composite), else the best column. Straight rings are skipped.
//   node crit-ringapex.mjs <capdir> [--engine chromium]
import path from "node:path";
import { cli, loadCapture, readPng, cr, f, hex } from "../harness/lib.mjs";

const a = cli({ engine: { type: "string" } });
const cap = loadCapture(a._[0]), engine = a.engine || "chromium";
const at = (png, x, y) => { const i = (y * png.width + x) * 4; return [png.data[i], png.data[i + 1], png.data[i + 2]]; };
let n = 0, m3under = 0, apexUnder = 0;
for (const cell of cap.cells.filter((c) => c.engine === engine && !c.crashed && ["ladder", "dialog", "held", "hostile"].includes(c.scene))) {
  for (const r of (cell.rings || []).filter((r) => r.painted && r.file && r.cols.length === 3)) {
    const png = readPng(path.join(cap.capdir, r.file));
    const cols = r.cols.map((c) => { const b = c.band.map((y) => at(png, c.x - r.dx, y - r.dy));
      const m = [0, 1, 2].map((k) => b.reduce((s, p) => s + p[k], 0) / b.length);
      const flat = b.every((p) => p.every((v, k) => Math.abs(v - b[0][k]) <= 1));
      return { x: c.x, flat, band: hex(m), v: Math.min(cr(m, at(png, c.x - r.dx, c.in - r.dy)), cr(m, at(png, c.x - r.dx, c.out - r.dy))) }; });
    const m3 = Math.min(...cols.map((c) => c.v)), flat = cols.filter((c) => c.flat), apex = flat.length ? Math.max(...flat.map((c) => c.v)) : Math.max(...cols.map((c) => c.v));
    n++; if (m3 < 3) m3under++; if (apex < 3) apexUnder++;
    console.log(`APEX ${engine} ${cell.theme} ${cell.scene}·${cell.ground}${cell.variant && cell.variant !== "base" ? "·" + cell.variant : ""} ${r.spec}:${r.id} · M-3 ${f(m3)} · apex ${f(apex)}${flat.length ? "" : " (no full-coverage column)"} · cols ${cols.map((c) => `${c.x}${c.flat ? "=" : "~"}${f(c.v)}`).join(" ")}`);
  }
}
console.log(`RING-APEX ${engine} rings=${n} m3<3=${m3under} apex<3=${apexUnder}`);
