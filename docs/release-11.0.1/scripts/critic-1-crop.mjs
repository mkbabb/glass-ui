// Critic 1: crop and integer-upscale a capture. node critic-1-crop.mjs in.png out.png x y w h k
import { readFileSync, writeFileSync } from "node:fs";
import { PNG } from "pngjs";
const [inp, out, ...n] = process.argv.slice(2);
const [x, y, w, h, k] = n.map(Number);
const a = PNG.sync.read(readFileSync(inp));
const o = new PNG({ width: w * k, height: h * k });
for (let j = 0; j < h * k; j++) for (let i = 0; i < w * k; i++) {
    const s = ((y + Math.floor(j / k)) * a.width + x + Math.floor(i / k)) * 4, d = (j * o.width + i) * 4;
    a.data.copy(o.data, d, s, s + 4);
}
writeFileSync(out, PNG.sync.write(o));
