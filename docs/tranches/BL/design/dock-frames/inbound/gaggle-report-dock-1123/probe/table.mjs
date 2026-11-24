// Digest of the film: per-cell numbers from runs/<engine>/<cell>.json (and the raw frames of faulted motions).
//   node table.mjs <dir>     prints the markdown tables the README carries
import fs from "node:fs";
import path from "node:path";

const DIR = path.resolve(process.argv[2] ?? "..");
const r1 = (v) => (v == null ? "-" : (Math.round(v * 10) / 10).toString());
const abs = (v) => Math.abs(v ?? 0);
const cells = [];
for (const eng of ["chromium", "webkit"]) {
    const d = path.join(DIR, "runs", eng);
    if (!fs.existsSync(d)) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".json")).sort()) cells.push(JSON.parse(fs.readFileSync(path.join(d, f), "utf8")));
}
const order = (c) => [c.engine, c.lens === "team" ? 0 : 1, -c.w, c.scheme, c.rm ? 1 : 0].join("|");
cells.sort((a, b) => (order(a) < order(b) ? -1 : 1));

/** the longest frame (rAF gap) after the trigger, from a raw record */
function longestFrame(eng, cell, motion) {
    const p = path.join(DIR, "runs", eng, "raw", `${cell}-${motion}.json`);
    if (!fs.existsSync(p)) return null;
    const r = JSON.parse(fs.readFileSync(p, "utf8"));
    const fr = r.frames.filter((f) => f.t >= r.trig - 20);
    let g = 0;
    for (let i = 1; i < fr.length; i++) g = Math.max(g, fr[i].t - fr[i - 1].t);
    return g;
}

console.log("| engine | cell | load: dock first frame / opacity / moves | outer box max drift l / c / r px (all motions) | seats moved (motion: px) | run overflow; scroll travel | theme hover: toggle box dcx / dw | theme press (both toggles): toggle dw, centre dcx; shrink | section switch: dock settle ms; mark overshoot | theme flip: longest frame ms |");
console.log("|---|---|---|---|---|---|---|---|---|---|");
for (const c of cells) {
    if (c.err) { console.log(`| ${c.engine} | ${c.cell} | error: ${c.err.split("\n")[0].slice(0, 80)} |||||||||`); continue; }
    const ms = Object.entries(c.motions);
    let l = 0, ce = 0, r = 0, t = 0;
    for (const [, a] of ms) if (a.outer) { l = Math.max(l, abs(a.outer.l)); ce = Math.max(ce, abs(a.outer.c)); r = Math.max(r, abs(a.outer.r)); t = Math.max(t, abs(a.outer.t)); }
    const seatMoves = [];
    for (const [id, a] of ms) for (const [k, s] of Object.entries(a.seats ?? {})) if (Math.max(abs(s.dcx), abs(s.dw)) > 0.5) seatMoves.push(`${id}: ${k} ${r1(s.dcx)}`);
    const uniq = [...new Set(seatMoves.map((s) => s.replace(/ seat.*? /, " ").replace(/: \S+ /, ": ")))];
    const seatTxt = seatMoves.length ? [...new Set(ms.flatMap(([id, a]) => { const ss = Object.values(a.seats ?? {}).filter((s) => Math.max(abs(s.dcx), abs(s.dw)) > 0.5); if (!ss.length) return []; const dx = Math.max(...ss.map((s) => abs(s.dcx))); return [dx > 0.5 ? `${id}: ${r1(dx)} px sideways` : `${id}: press size ${r1(Math.min(...ss.map((s) => s.dw)))} px, centre fixed`]; }))].join("; ") : "none";
    const run = ms.map(([, a]) => a.run).filter(Boolean);
    const ov = Math.max(0, ...run.map((x) => x.overflow ?? 0));
    const travel = Math.max(0, ...run.map((x) => abs(x.maxScrollChange)));
    const hov = c.motions["c-theme-hover-in"];
    const hk = hov ? Object.keys(hov.toggles ?? {})[0] : null;
    const hovTxt = hov && hk ? `${r1(hov.toggles[hk].dcx)} / ${r1(hov.toggles[hk].dw)}` : c.rm ? "(not run)" : "-";
    const pr = [c.motions["d-theme-toggle-1"], c.motions["d-theme-toggle-2"]].filter(Boolean);
    const pk = pr[0] ? Object.keys(pr[0].toggles ?? {}).find((k) => k === (c.compact ? "togMenu" : "togDock")) : null;
    const prTxt = pk ? pr.map((a) => `${r1(a.toggles[pk]?.dw)}, ${r1(a.toggles[pk]?.dcx)}`).join(" / ") + (c.rm ? "; one-frame" : "; spring") : "-";
    const sw = c.motions["b-section-switch"];
    const mo = sw?.overshoot?.find(([k]) => k === "mark.l");
    const swTxt = sw ? `${r1(sw.dockSettle)}; ${mo ? r1(mo[2]) + " px" : "none"}` : "-";
    const lf = ["d-theme-toggle-1", "d-theme-toggle-2"].map((m) => c.motions[m]?.longestFrame ?? longestFrame(c.engine, c.cell, m)).filter((x) => x != null);
    const ld = c.load;
    const ldTxt = ld ? `${r1(ld.firstDockAt)} ms / ${ld.firstDockOpacity} / ${ld.dockMovingFrames ? ld.dockMovingFrames + " frames" : "none"}` : "-";
    console.log(`| ${c.engine} | ${c.cell} | ${ldTxt} | ${r1(l)} / ${r1(ce)} / ${r1(r)}${t > 0.05 ? `; vertical ${r1(t)}` : ""} | ${seatTxt} | ${ov} px; ${r1(travel)} px | ${hovTxt} | ${prTxt} | ${swTxt} | ${lf.map((x) => r1(x)).join(", ") || "-"} |`);
}

// settle times per motion (median over cells), per engine
console.log("\n| engine | motion | cells | dock settle ms, median (min-max) | anything settle ms, median | outer drift max px |");
console.log("|---|---|---|---|---|---|");
const med = (xs) => { const s = [...xs].sort((a, b) => a - b); return s.length ? s[Math.floor(s.length / 2)] : null; };
for (const eng of ["chromium", "webkit"]) {
    for (const rm of [false, true]) {
        const cs = cells.filter((c) => c.engine === eng && !!c.rm === rm && !c.err);
        const ids = [...new Set(cs.flatMap((c) => Object.keys(c.motions)))];
        for (const id of ids) {
            const as = cs.map((c) => c.motions[id]).filter((a) => a && !a.err);
            if (!as.length) continue;
            const ds = as.map((a) => a.dockSettle), ss = as.map((a) => a.settle);
            const dr = Math.max(...as.map((a) => Math.max(abs(a.outer?.l), abs(a.outer?.c), abs(a.outer?.r))));
            console.log(`| ${eng}${rm ? " (reduced motion)" : ""} | ${id} | ${as.length} | ${r1(med(ds))} (${r1(Math.min(...ds))}-${r1(Math.max(...ds))}) | ${r1(med(ss))} | ${r1(dr)} |`);
        }
    }
}

// every fault, grouped by kind
console.log("\n| engine | cell | motion | fault |");
console.log("|---|---|---|---|");
for (const c of cells) for (const f of c.faults ?? []) console.log(`| ${c.engine} | ${c.cell} | ${f.motion} | ${f.kind}: ${f.why} |`);
