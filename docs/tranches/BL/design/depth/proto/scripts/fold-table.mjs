// Prints the fold's summary from ../data/fold-<engine>-*.json.   node fold-table.mjs <engine>
import { readdirSync, readFileSync } from "node:fs";
const D = new URL("../data/", import.meta.url);
const e = process.argv[2];
const mm = (a) => (a.length ? `${Math.min(...a)} to ${Math.max(...a)}` : "-");
for (const f of readdirSync(D).filter((f) => f.startsWith(`fold-${e}-`)).sort()) {
    const d = JSON.parse(readFileSync(new URL(f, D)));
    if (d.crash) { console.log(f, "CRASH"); continue; }
    const parts = [];
    for (const s of d.scenes) {
        const runs = {};
        for (const o of s.offsets) for (const r of o.runs) {
            const a = (runs[r.depth + " " + r.text.slice(0, 10)] ??= { cover: [], letter: [], on: [], c: [], blur: null });
            a.cover.push(r.cover); if (r.letterMax) a.letter.push(r.letterMax.cover); a.on.push(r.onFigure); if (r.cMin != null) a.c.push(r.cMin);
            if (r.underFigure) a.blur = r.underFigure.ratio;
        }
        parts.push(`  ${s.scene} T=${s.T} pointer=${s.pointer?.takenByText} :: ` + Object.entries(runs).map(([k, a]) => `[${k}: cover ${mm(a.cover)}, letter ${mm(a.letter)}, onFig ${mm(a.on)}, cMin ${a.c.length ? Math.min(...a.c) : "-"}${a.blur != null ? ", blur " + a.blur : ""}]`).join(" "));
    }
    console.log(f.replace(/^fold-|\.json$/g, ""), `flow ${d.flow.scrollWidth}/${d.flow.clientWidth} bleed ${d.bleed.scrollWidth}/${d.bleed.clientWidth}`, d.fill ? `fill rate ${d.fill.rateMin}..${d.fill.rateMax} out ${d.fill.figureOutsideScenePx}px` : "", `| ${d.stageSelect} | ${d.heroName}`);
    console.log(parts.join("\n"));
}
