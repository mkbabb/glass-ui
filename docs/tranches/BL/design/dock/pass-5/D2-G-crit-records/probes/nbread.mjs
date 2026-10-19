// nbread.mjs (D2-G critic, DIAGNOSIS ONLY, not an H5 reading): an ST stall·nb cast read with the markers where the
// video actually paints them. Per frame on the centre row: marker A (painted x 1368-1384) and B (1389-1406) lit,
// the plate's last magenta column and the neighbour's blue run, divided by the video scale (given).
//   node nbread.mjs <cast dir> <scale>
import fs from "node:fs";
import path from "node:path";
import { readFrame } from "../../../harness/lib.mjs";
const dir = process.argv[2], S = Number(process.argv[3] ?? 1);
const fr = fs.readdirSync(dir).filter((f) => /^f\d+\.png$/.test(f)).sort();
let prev = null, go = -1, end = -1, worst = { step: 0, at: -1 };
const rows = [];
for (const [i, f] of fr.entries()) {
  const img = readFrame({ file: path.join(dir, f), origin: { x: 0, y: 0 } });
  const lum = (x, y) => { const k = (y * img.w + x) * 4; return (img.data[k] + img.data[k + 1] + img.data[k + 2]) / 3; };
  const lit = (a, b) => { for (let y = 0; y < img.h; y++) { let s = 0; for (let x = a; x < b; x++) s += lum(x, y); if (s / (b - a) < 60) return true; } return false; };
  const y = Math.floor(img.h / 2); let magR = -1, bluR = -1;
  for (let x = 0; x < img.w; x++) { const k = (y * img.w + x) * 4, R = img.data[k], G = img.data[k + 1], B = img.data[k + 2]; if (R > 170 && B > 170 && G < 110) magR = x; if (B > 170 && R < 130 && G < 150 && B - R > 90) bluR = x; }
  const A = lit(1370, 1382), Bm = lit(1391, 1404);
  if (A && !Bm && magR >= 0 && go < 0) go = i; if (Bm && go >= 0 && end < 0) end = i;
  const nb = bluR >= 0 ? bluR / S : null;
  if (go >= 0 && prev != null && nb != null) { const st = Math.abs(nb - prev); if (st > worst.step) worst = { step: +st.toFixed(2), at: i }; }
  if (nb != null) prev = nb;
  rows.push(`${f} A${+A} B${+Bm} plateR ${magR >= 0 ? (magR / S).toFixed(1) : "-"} nbR ${nb != null ? nb.toFixed(1) : "-"}`);
}
console.log(rows.filter((_, i) => i >= go - 2 && go >= 0).join("\n"));
console.log(`trigger frame ${go}, block-end frame ${end}; neighbour worst one-frame step after the trigger ${worst.step} px at frame ${worst.at}`);
