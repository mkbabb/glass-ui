// summarize.mjs <data/engine.json>: compact tables from one AB measurement record (markdown rows).
import fs from "node:fs";
const r = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const E = r.engine;
const cells = r.cells;
const f = (x) => (x === undefined || x === null ? "–" : x);
console.log(`# ${E} ${r.version ?? ""} ${r.started} → ${r.ended}\n`);

console.log("## seam, flat field, rest fused: line step / tone step per join (interior rows rimTop,inTop,mid,inBot | halo top,bot)");
for (const c of cells) {
    if (!c.seam) { console.log(`| ${c.prop} | ${c.w} | ${c.theme} | ERR ${c.seamError ?? c.error ?? ""} |`); continue; }
    const js = c.seam.joins.map((j) => {
        const line = Math.max(j.rimTop.step, j.inTop.step, j.mid.step, j.inBot.step);
        const tone = Math.max(j.tone.rimTop, j.tone.inTop, j.tone.mid, j.tone.inBot);
        const halo = Math.max(j.haloTop.step, j.haloBot.step);
        return `${line} / ${tone} / ${halo}`;
    });
    console.log(`| ${c.prop} | ${c.w} | ${c.theme} | ${js.join(" ; ")} | gaps ${c.seam.gaps.join(",")} |`);
}

console.log("\n## backdrop probe (stripe sd): plates [split | 40 | 80 | 140 | fused] ; join residue fused ; seamTone fused ; bare ; ctl backdrop-div / filter-div");
for (const c of cells.filter((c) => c.probe)) {
    const p = c.probe;
    const pl = ["split", "40ms", "80ms", "140ms", "fused"].map((k) => p[k] ? `${Math.max(...p[k].plates)}` : "–").join(" | ");
    console.log(`| ${c.prop} | ${c.w} | ${c.theme} | max plate sd ${pl} | join ${p.fused.bridge.join(",")} | tone ${p.fused.seamTone.join(",")} | bare ${p.fused.bareBand} | ctl ${p.fused.ctlBackdropDiv}/${p.fused.ctlFilterDiv}/${p.fused.ctlBare} |`);
    console.log(`|   mid 80ms join residue ${p["80ms"].bridge.join(",")} ; plate sd ${p["80ms"].plates.join(",")}`);
}

console.log("\n## radius (non-square %, ellipse, frames)");
for (const c of cells.filter((c) => c.radius)) console.log(`| ${c.prop} | ${c.w} | ${c.theme} | ${c.radius.pct} | ${c.radius.ellip} | ${c.radius.frames} frames, ${c.radius.reads} reads, square-% ${c.radius.squarePct} | ${c.radius.examples.join("; ")}`);

console.log("\n## perf (median over 3 windows) idle vs morph");
const med = (a) => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
for (const c of cells.filter((c) => c.perf)) {
    for (const m of [false, true]) {
        const rs = c.perf.filter((x) => x.morph === m);
        const k = (n) => (rs[0][n] === undefined ? "–" : +med(rs.map((x) => x[n])).toFixed(4));
        console.log(`| ${c.prop} | ${c.w} | ${m ? "morph" : "idle"} | ${k("p50")} / ${k("p95")} / ${k("max")} | >17.5 ${k("over17")} | layout ${k("LayoutCount")} | style ${k("RecalcStyleCount")} ${k("RecalcStyleDuration")}s | script ${k("ScriptDuration")}s | task ${k("TaskDuration")}s | load ${rs[0].load} |`);
    }
    if (c.trace) console.log(`|   trace morph: ${JSON.stringify(Object.fromEntries(Object.entries(c.trace.morph).filter(([k]) => k !== "top")))}`);
}

console.log("\n## reduced motion");
for (const c of cells.filter((c) => c.reduced)) { const d = c.reduced; console.log(`| ${c.prop} | ${c.w} | ${c.theme} | min op ${d.minOpacity} | end ${d.endOpacity} | intermediate frames ${d.intermediateOpacityFrames} | controls min op ${d.minControlOpacity} | geometry states ${d.geometryStates} | translate ${d.translateWritten} | swap at ${d.firstChangeMs} ms |`); }

console.log("\n## a11y");
for (const c of cells.filter((c) => c.a11y)) { const a = c.a11y; console.log(`| ${c.prop} | ${c.w} | tree ${a.treeSame} | census ${a.censusSame} | tab ${a.tabSame} (${a.tabSplit.join(" > ")}) | focus ${a.focusKept} (${JSON.stringify(a.focus)}) | diffs ${[...a.treeDiffMid, ...a.censusDiffMid, ...a.treeDiffFused].join(" / ")} |`); }

console.log("\n## control set (+1 control, fused)");
for (const c of cells.filter((c) => c.controlset)) console.log(`| ${c.prop} | ${c.w} | ${c.theme} | ${JSON.stringify(c.controlset)} |`);

console.log("\n## errors");
for (const c of cells) { const e = Object.entries(c).filter(([k, v]) => /Error$/.test(k) || (/Errors$/.test(k) && v.length)); if (e.length) console.log(c.prop, c.w, c.theme, JSON.stringify(e).slice(0, 400)); }
