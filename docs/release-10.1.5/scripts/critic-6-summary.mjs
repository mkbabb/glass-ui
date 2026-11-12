// Summarise critic-6 battery rows (critic-4's read(): plate radii, run extents, seat rings) per
// file: rows read, non-uniform rest corners with nothing to scroll, reach (sw≠cw), clipped rings;
// and the r5 run-clip shape rows (ring cut, fill past the plate).
//   node docs/release-10.1.5/scripts/critic-6-summary.mjs <dir> [tol]
import { readFileSync, readdirSync } from "node:fs";
const dir = process.argv[2];
const tol = Number(process.argv[3] ?? 0.5);
const walk = (x, out) => {
    if (Array.isArray(x)) x.forEach((y) => walk(y, out));
    else if (x && typeof x === "object") {
        if (Array.isArray(x.radii) && x.plate && "seats" in x) out.push(x);
        else Object.values(x).forEach((y) => walk(y, out));
    }
    return out;
};
for (const f of readdirSync(dir).filter((f) => f.endsWith(".json")).sort()) {
    const data = JSON.parse(readFileSync(`${dir}/${f}`, "utf8"));
    if (f.startsWith("r5-runclip")) {
        let n = 0, ring = 0, fill = 0, maxR = 0, maxF = 0;
        for (const r of data) for (const s of r.seats ?? []) { n++; if (s.ringCut > tol) ring++; if (s.fillPastPlate > tol) fill++; maxR = Math.max(maxR, s.ringCut ?? 0); maxF = Math.max(maxF, s.fillPastPlate ?? 0); }
        console.log(`${f}: seat reads ${n}, ring cut>${tol} ${ring} (max ${maxR}), fill past plate>${tol} ${fill} (max ${maxF})`);
        continue;
    }
    const rows = walk(data, []);
    if (!rows.length) continue;
    const bad = [];
    for (const r of rows) {
        const h = Math.min(r.plate.lw, r.plate.lh) / 2;
        const uniform = r.radii.every((x) => /^[\d.]+px$/.test(x) && Math.abs(Number.parseFloat(x) - h) <= tol);
        const reach = r.run ? r.run.sw !== r.run.cw || r.run.sh !== r.run.ch : false;
        const ring = r.seats.filter((s) => s.clipped).map((s) => s.id);
        if ((!uniform && !reach) || ring.length || (reach && /postures|o155|s1|s3/.test(f)))
            bad.push(`${r.tag ?? ""} uniform=${uniform} reach=${reach}${r.run ? ` sw/cw=${r.run.sw}/${r.run.cw} sh/ch=${r.run.sh}/${r.run.ch}` : ""} radii=${r.radii.join("|")} h=${h} ring=${ring.join(",")}`);
    }
    console.log(`${f}: rows ${rows.length}, flagged ${bad.length}`);
    for (const b of bad.slice(0, 8)) console.log("   ", b);
}
