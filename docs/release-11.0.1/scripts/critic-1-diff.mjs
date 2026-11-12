// Critic 1: the differing ink between two captures, per threshold. node critic-1-diff.mjs a.png b.png
import { readFileSync } from "node:fs";
import { PNG } from "pngjs";
const [a, b] = process.argv.slice(2).map((p) => PNG.sync.read(readFileSync(p)));
let max = 0;
const hist = {};
for (let i = 0; i < a.data.length; i += 4) {
    const d = Math.abs(a.data[i] - b.data[i]) + Math.abs(a.data[i + 1] - b.data[i + 1]) + Math.abs(a.data[i + 2] - b.data[i + 2]);
    max = Math.max(max, d);
    const k = d === 0 ? "0" : d <= 2 ? "1-2" : d <= 6 ? "3-6" : d <= 20 ? "7-20" : ">20";
    hist[k] = (hist[k] ?? 0) + 1;
}
console.log(JSON.stringify({ w: a.width, h: a.height, max, hist }));
for (const t of [0, 2, 6]) {
    const rows = [];
    for (let y = 0; y < a.height; y++) {
        let lo = -1, hi = -1;
        for (let x = 0; x < a.width; x++) {
            const i = (y * a.width + x) * 4;
            const d = Math.abs(a.data[i] - b.data[i]) + Math.abs(a.data[i + 1] - b.data[i + 1]) + Math.abs(a.data[i + 2] - b.data[i + 2]);
            if (d > t) { if (lo < 0) lo = x; hi = x; }
        }
        rows.push(lo < 0 ? null : [lo, hi]);
    }
    const ys = rows.map((r, y) => (r ? y : -1)).filter((y) => y >= 0);
    if (!ys.length) { console.log(`t>${t}: nothing`); continue; }
    const top = ys[0], bottom = ys.at(-1), H = bottom - top + 1, mid = rows[Math.round((top + bottom) / 2)];
    const W = mid[1] - mid[0] + 1, d = Math.round(H * 0.08) || 1, at = rows[top + d], w = at ? at[1] - at[0] + 1 : 0, r = H / 2;
    console.log(`t>${t}: W=${W} H=${H} row@${d}=${w} stadium=${Math.round(W - 2 * (r - Math.sqrt(r * r - (r - d) ** 2)))} ellipse=${Math.round(W * Math.sqrt(1 - ((r - d) / r) ** 2))}`);
}
