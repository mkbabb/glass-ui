import { PNG } from "pngjs";
import fs from "node:fs";
const [, , src, out, sx, sy, sw, sh] = process.argv;
const png = PNG.sync.read(fs.readFileSync(src));
const x = +sx, y = +sy, w = +sw, h = +sh;
const dst = new PNG({ width: w, height: h });
for (let j = 0; j < h; j++) {
  for (let i = 0; i < w; i++) {
    const si = ((y + j) * png.width + (x + i)) * 4;
    const di = (j * w + i) * 4;
    dst.data[di] = png.data[si]; dst.data[di + 1] = png.data[si + 1];
    dst.data[di + 2] = png.data[si + 2]; dst.data[di + 3] = png.data[si + 3];
  }
}
fs.writeFileSync(out, PNG.sync.write(dst));
console.log(`cropped ${src} -> ${out} (${w}x${h}) from full ${png.width}x${png.height}`);
