// Crop a vertical strip around a chosen x and upscale (nearest) for a clean visual read of
// a single major gridline's bow. Also crops a horizontal strip for a horizontal major line.
import { PNG } from "pngjs";
import fs from "fs";

const src = process.argv[2];
const out = process.argv[3];
const cx = parseInt(process.argv[4], 10);      // center x of the strip
const halfW = parseInt(process.argv[5] || "45", 10);
const scale = parseInt(process.argv[6] || "3", 10);

const png = PNG.sync.read(fs.readFileSync(src));
const { width: W, height: H, data } = png;
const x0 = Math.max(0, cx - halfW), x1 = Math.min(W, cx + halfW);
const sw = x1 - x0, sh = H;
const dst = new PNG({ width: sw * scale, height: sh });
for (let y = 0; y < sh; y++) {
    for (let x = 0; x < sw; x++) {
        const si = (y * W + (x0 + x)) * 4;
        for (let k = 0; k < scale; k++) {
            const di = (y * sw * scale + (x * scale + k)) * 4;
            dst.data[di] = data[si];
            dst.data[di + 1] = data[si + 1];
            dst.data[di + 2] = data[si + 2];
            dst.data[di + 3] = 255;
        }
    }
}
fs.writeFileSync(out, PNG.sync.write(dst));
console.log("wrote", out, sw * scale + "x" + sh);
