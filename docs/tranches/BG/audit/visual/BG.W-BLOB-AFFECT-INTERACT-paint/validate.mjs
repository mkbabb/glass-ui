import { isRealPng, pngDimensions, pngRegionStats } from "../../../../../../scripts/reflect-capture-verify.mjs";
import { existsSync } from "node:fs";
const DIR = new URL(".", import.meta.url).pathname;
const set = [
  { f: "blob-chrome-light-desktop-full.png", eng: "chrome", mode: "light", W: 1440, H: 900 },
  { f: "blob-chrome-dark-desktop-full.png",  eng: "chrome", mode: "dark",  W: 1440, H: 900 },
  { f: "blob-safari-light-desktop-full.png", eng: "safari", mode: "light", W: 2880, H: 1800 },
  { f: "blob-safari-dark-desktop-full.png",  eng: "safari", mode: "dark",  W: 2880, H: 1800 },
];
const rows = [];
for (const s of set) {
  const p = DIR + s.f;
  if (!existsSync(p)) { rows.push({ f: s.f, resolves: false }); continue; }
  const real = isRealPng(p);
  const dim = pngDimensions(p);
  // blob sits in the lower-left of the studio card; page top is masthead text.
  const blobReg  = pngRegionStats(p, { x: 0.28, y: 0.45, w: 0.28, h: 0.28 });
  const bgReg     = pngRegionStats(p, { x: 0.02, y: 0.02, w: 0.15, h: 0.10 });
  const divergence = blobReg && bgReg ? Math.abs(blobReg.meanL - bgReg.meanL) : 0;
  rows.push({
    f: s.f, eng: s.eng, mode: s.mode, resolves: true, real,
    dim: dim ? `${dim.w}x${dim.h}` : "null",
    dimOK: dim && dim.w === s.W && dim.h === s.H,
    blobMeanL: blobReg ? +blobReg.meanL.toFixed(3) : null,
    blobChroma: blobReg ? +blobReg.meanChroma.toFixed(3) : null,
    bgMeanL: bgReg ? +bgReg.meanL.toFixed(3) : null,
    divergence: +divergence.toFixed(3),
    contentReal: divergence > 0.03,
  });
}
console.log(JSON.stringify(rows, null, 2));
console.log("ALL_PASS:", rows.every(r => r.resolves && r.real && r.dimOK && r.contentReal));
