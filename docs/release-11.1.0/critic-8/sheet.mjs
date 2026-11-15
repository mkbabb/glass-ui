// Contact sheet: node sheet.mjs <out.png> <cols> <png>...   (pngjs only, no browser)
import { PNG } from "pngjs";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
const [out, colsArg, ...files] = process.argv.slice(2);
const cols = Number(colsArg), pad = 6;
const imgs = files.map((f) => PNG.sync.read(readFileSync(f)));
const cw = Math.max(...imgs.map((i) => i.width)), ch = Math.max(...imgs.map((i) => i.height));
const rows = Math.ceil(imgs.length / cols);
const sheet = new PNG({ width: cols * (cw + pad) + pad, height: rows * (ch + pad) + pad });
sheet.data.fill(128);
for (let i = 3; i < sheet.data.length; i += 4) sheet.data[i] = 255;
imgs.forEach((im, k) => PNG.bitblt(im, sheet, 0, 0, im.width, im.height, pad + (k % cols) * (cw + pad), pad + Math.floor(k / cols) * (ch + pad)));
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, PNG.sync.write(sheet));
console.log(out, sheet.width, sheet.height, files.length);
