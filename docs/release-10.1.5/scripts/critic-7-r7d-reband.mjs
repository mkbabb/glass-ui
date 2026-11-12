// Re-band the banked r7d hover-vs-rest PNGs at the screenshot's own scale (WebKit's Desktop Safari project is
// deviceScaleFactor 2; the spec's bands are CSS px). Bands: outside the plate box, inside the plate > 6 px from
// the seat, near the seat. A pixel counts when any channel moves at least 12 (the spec's threshold).
//   node docs/release-10.1.5/scripts/critic-7-r7d-reband.mjs <arm-dir>/<project>
import { readFileSync, existsSync } from "node:fs";
import { PNG } from "pngjs";
const dir = process.argv[2];
for (const dark of ["0", "1"]) {
    const f = `${dir}/r7d-dark${dark}.json`;
    if (!existsSync(f)) continue;
    let rowsFar = 0, rowsOut = 0, maxFar = 0, maxOut = 0, n = 0;
    const hits = [];
    for (const r of JSON.parse(readFileSync(f, "utf8"))) {
        const rp = `${dir}/r7d-${r.name}-${r.width}-dark${dark}-rest.png`, sp = `${dir}/r7d-${r.name}-${r.width}-dark${dark}-${r.id}.png`;
        if (!existsSync(rp) || !existsSync(sp)) continue;
        const a = PNG.sync.read(readFileSync(rp)), b = PNG.sync.read(readFileSync(sp));
        const pb = r.plate, sb = r.seat, cx = Math.max(0, pb.x - 40), cy = Math.max(0, pb.y - 40);
        const k = Math.round(a.height / (pb.h + (pb.y - cy) + 40)); // the clip can pass the viewport on x, never on y
        let out = 0, far = 0;
        for (let y = 0; y < a.height; y++) for (let x = 0; x < a.width; x++) {
            const i = (y * a.width + x) * 4;
            const d = Math.max(Math.abs(a.data[i] - b.data[i]), Math.abs(a.data[i + 1] - b.data[i + 1]), Math.abs(a.data[i + 2] - b.data[i + 2]));
            if (d < 12) continue; // the spec's own threshold
            const X = x / k + cx, Y = y / k + cy;
            const inPlate = X >= pb.x - 1 && X <= pb.x + pb.w + 1 && Y >= pb.y - 1 && Y <= pb.y + pb.h + 1;
            const nearSeat = X >= sb.x - 6 && X <= sb.x + sb.width + 6 && Y >= sb.y - 6 && Y <= sb.y + sb.height + 6;
            if (!inPlate) out++; else if (!nearSeat) far++;
        }
        n++;
        if (far) { rowsFar++; maxFar = Math.max(maxFar, far / (k * k)); hits.push(`${r.name}-${r.width}-${r.id} far ${(far / (k * k)).toFixed(0)}`); }
        if (out) { rowsOut++; maxOut = Math.max(maxOut, out / (k * k)); }
    }
    console.log(`${dir} dark ${dark}: rows ${n}, far-inside >0 ${rowsFar} (max ${maxFar.toFixed(0)} css px), outside >0 ${rowsOut} (max ${maxOut.toFixed(0)} css px) ${hits.slice(0, 6).join("; ")}`);
}
