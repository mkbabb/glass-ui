#!/usr/bin/env node
// BV11-frames.mjs · D3 pass 12, the F-1 owner frame (REGISTRY P11-4): the aurora focus spot under the dark veil, R-2 vs
// R-32 on ONE ground, one engine per file. It reads two M-9 --bank pair PNGs (raw | full, 240 × 160 around the probe, 2×,
// written by m9-state-registers.mjs over the dark aurora state cell): floor v11a's (R-2) and floor v11's (R-32), and lays
// out three panels: the bare ground (floor v11's raw) | R-2 veiled | R-32 veiled. It prints each panel's probe mean
// (the 60 × 40 probe sits at the crop's centre) as OKLCH L, C, h, and checks that the two raw halves agree (same ground).
// No browser; it reads PNGs only.
//   node BV11-frames.mjs <bank-r2-dir> <bank-r32-dir> <out.png> <engine>
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { PNG, readPng, region, mean3, lch, hex, f } from "../harness/lib.mjs";

const [r2dir, r32dir, out, engine] = process.argv.slice(2);
if (!engine) { console.error("usage: node BV11-frames.mjs <bank-r2-dir> <bank-r32-dir> <out.png> <engine>"); process.exitCode = 2; }
else {
  const name = `${engine}-dark-aurora-state-veil-raw-vs-full.png`;
  const p2 = readPng(path.join(r2dir, name)), p32 = readPng(path.join(r32dir, name));
  const S = 2, Wd = 240 * S, Hh = 160 * S, G = 8;
  const half = (png, k) => ({ png, x0: k * (Wd + G) });
  const panels = [["the bare ground (raw)", half(p32, 0)], ["R-2 (40% black, floor v11a)", half(p2, 1)], ["R-32 (OKLCH-lightness tone, floor v11)", half(p32, 1)]];
  // the raw halves of the two banks must be the same ground
  let maxd = 0;
  for (let y = 0; y < Hh; y++) for (let x = 0; x < Wd; x++) { const i = (p2.width * y + x) * 4; for (let c = 0; c < 3; c++) maxd = Math.max(maxd, Math.abs(p2.data[i + c] - p32.data[i + c])); }
  const img = new PNG({ width: 3 * Wd + 2 * G, height: Hh }); img.data.fill(255);
  panels.forEach(([, { png, x0 }], k) => {
    for (let y = 0; y < Hh; y++) for (let x = 0; x < Wd; x++) {
      const i = (png.width * y + x0 + x) * 4, o = (img.width * y + k * (Wd + G) + x) * 4;
      img.data[o] = png.data[i]; img.data[o + 1] = png.data[i + 1]; img.data[o + 2] = png.data[i + 2]; img.data[o + 3] = 255;
    }
  });
  fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
  fs.writeFileSync(out, PNG.sync.write(img));
  const sha = crypto.createHash("sha256").update(fs.readFileSync(out)).digest("hex");
  console.log(`F-1 ${engine}: ${path.basename(out)} ${img.width}×${img.height} sha256 ${sha}`);
  console.log(`  raw halves of the two banks: max channel difference ${maxd} (0 = the same ground)`);
  const probe = [(120 - 30) * S, (80 - 20) * S, 60 * S, 40 * S];   // the 60 × 40 probe at the crop's centre, at 2×
  const raw = lch(mean3(region(img, probe)));
  panels.forEach(([label], k) => {
    const c = mean3(region(img, [probe[0] + k * (Wd + G), probe[1], probe[2], probe[3]])), [L, C, h] = lch(c);
    console.log(`  panel ${k + 1} ${label}: ${hex(c)} L ${f(L, 3)} C ${f(C, 3)} h ${f(h, 1)}°${k ? ` · ΔL ${f(L - raw[0], 3)} · C ×${f(C / raw[1], 3)}` : ""}`);
  });
}
