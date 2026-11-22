// op9.mjs <rows.json[.gz]> ...: MEASURE-9 part H (H2; RU-104 as amended for C8-M8 and C8-M17). Per travel segment
// m8/judge8.mjs's op60 (the largest opacity change of a face or a seat in any 60 Hz window, bound 0.4) and its fade
// lengths (the shortest, bound 66.7 ms), printed with the cell's sample interval (the median time between rows), and
// G-9's root clause in both forms on the root's --dock-expand-t (`p:--dock-expand-t` of the `dock` track): it moves no
// more than 0.4 in any 60 Hz window, and from 0.02 to 0.98 (or back) takes at least 66.7 ms, read interpolated.
import { readFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
const J = fileURLToPath(new URL("../m8/judge8.mjs", import.meta.url));
const files = process.argv.slice(2);
const judged = JSON.parse(spawnSync("node", [J, "--json", ...files], { encoding: "utf8", maxBuffer: 1 << 28 }).stdout);
for (const [n, f] of files.entries()) {
    const raw = readFileSync(f);
    const d = JSON.parse((f.endsWith(".gz") ? gunzipSync(raw) : raw).toString());
    const R = d.rows;
    const dts = R.slice(1).map((r, i) => r.t - R[i].t).sort((a, b) => a - b);
    const interval = dts.length ? dts[Math.floor(dts.length / 2)] : NaN;
    // the root clause
    const e = R.map((r) => [r.t, parseFloat(r.el.dock?.["p:--dock-expand-t"])]).filter(([, v]) => Number.isFinite(v));
    let op = 0, opAt = null;
    for (let i = 0; i < e.length; i++) for (let j = i + 1; j < e.length && e[j][0] - e[i][0] <= 1000 / 60 + 1e-6; j++) { const dv = Math.abs(e[j][1] - e[i][1]); if (dv > op) (op = dv), (opAt = Math.round(e[i][0])); }
    // each crossing interpolated between the two rows around it; a travel is a run from one end to the other
    const cross = (lv, up) => { const out = []; for (let i = 1; i < e.length; i++) { const [t0, a] = e[i - 1], [t1, b] = e[i]; if (up ? a < lv && b >= lv : a > lv && b <= lv) out.push(t0 + ((lv - a) / (b - a)) * (t1 - t0)); } return out; };
    const lens = [];
    for (const up of [true, false]) {
        const s = cross(up ? 0.02 : 0.98, up), t = cross(up ? 0.98 : 0.02, up);
        for (const a of s) { const b = t.find((x) => x >= a); if (b != null) lens.push(+(b - a).toFixed(1)); }
    }
    const minLen = lens.length ? Math.min(...lens) : null;
    const rootPass = e.length > 0 && op <= 0.4 && (minLen === null || minLen >= 1000 * 4 / 60 - 1e-6);
    const segs = judged[n]?.segs ?? [];
    const isFade = (v) => v.includes("opacity") || v.includes("fade");
    const segLine = (s) => {
        const fl = Object.values(s.fades ?? {});
        const bad = s.viol.filter(isFade).slice(0, 3);
        return "op60 " + s.opMax + " at " + s.opAt + ", shortest fade " + (fl.length ? Math.min(...fl).toFixed(1) : "-") + " ms" + (bad.length ? " FAIL: " + bad.join("; ") : "");
    };
    const seg = segs.map(segLine).join(" | ");
    console.log(`${d.meta.scenario} ${d.meta.engine} ${d.meta.cell.tag}: sample interval ${interval.toFixed(2)} ms (${R.length} rows) | ${seg} | root --dock-expand-t: ${e.length} rows, largest 60 Hz move ${op.toFixed(3)}${opAt != null ? ` at ${opAt} ms` : ""}, travels 0.02-0.98 ${lens.join(", ") || "none"} ms -> root clause ${rootPass ? "pass" : "FAIL"}`);
}
