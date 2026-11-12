// critic-6: collapse frames (last 20% and settled: uniform half-extent radius, no ghost) and
// layer-switch frames (uniform half-extent, sw = cw). node critic-6-frames.mjs <dir>
import { readFileSync, existsSync } from "node:fs";
const dir = process.argv[2];
const uni = (radii, ext) => radii.every((x) => /^[\d.]+px$/.test(x) && Math.abs(Number.parseFloat(x) - ext / 2) <= 0.5);
for (const p of ["fine", "coarse"]) {
    const cf = `${dir}/dock-collapse-${p}.json`;
    if (existsSync(cf)) for (const run of JSON.parse(readFileSync(cf, "utf8"))) {
        const fr = run.frames ?? [];
        const tail = fr.slice(Math.floor(fr.length * 0.8));
        const bad = tail.filter((f) => !uni(f.radii, Math.min(...f.layout)) || (f.ghosts ?? []).length);
        const last = fr[fr.length - 1];
        console.log(`collapse ${p} ${run.q}: frames ${fr.length}, tail bad ${bad.length}, settled ${last?.radii?.join("|")} layout ${last?.layout}${bad.length ? " e.g. " + JSON.stringify(bad[0]).slice(0, 200) : ""}`);
    }
    const lf = `${dir}/dock-layer-switch-${p}.json`;
    if (existsSync(lf)) {
        const fr = JSON.parse(readFileSync(lf, "utf8")).flat();
        const bad = fr.filter((f) => f.radii && (!uni(f.radii, Math.min(f.lw, f.lh)) || f.sw !== f.cw));
        console.log(`layer switch ${p}: frames ${fr.length}, bad ${bad.length}${bad.length ? " e.g. " + JSON.stringify(bad[0]).slice(0, 200) : ""}`);
    }
}
