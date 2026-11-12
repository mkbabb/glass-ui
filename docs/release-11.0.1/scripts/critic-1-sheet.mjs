// Critic 1: stack captures into one contact sheet. node critic-1-sheet.mjs out.png cols in1.png in2.png ...
import { readFileSync, writeFileSync } from "node:fs";
import { PNG } from "pngjs";
const [out, colsArg, ...ins] = process.argv.slice(2);
const cols = Number(colsArg);
const imgs = ins.map((p) => PNG.sync.read(readFileSync(p)));
const cw = Math.max(...imgs.map((i) => i.width)) + 8, ch = Math.max(...imgs.map((i) => i.height)) + 8;
const rows = Math.ceil(imgs.length / cols);
const sheet = new PNG({ width: cw * cols, height: ch * rows });
sheet.data.fill(128);
for (let i = 3; i < sheet.data.length; i += 4) sheet.data[i] = 255;
imgs.forEach((img, n) => PNG.bitblt(img, sheet, 0, 0, img.width, img.height, (n % cols) * cw + 4, Math.floor(n / cols) * ch + 4));
writeFileSync(out, PNG.sync.write(sheet));
