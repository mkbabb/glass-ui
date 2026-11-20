// Render the per-route table (b), worst-20 (c) and counts (d) from rows/summary.json
// (+ rows/load.jsonl). usage: node report.mjs > rows/fragment.md
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROWS = path.join(HERE, "../rows");
const { routes: S, meta } = JSON.parse(fs.readFileSync(path.join(ROWS, "summary.json"), "utf8"));
const loadF = path.join(ROWS, "load.jsonl");
const load = fs.existsSync(loadF) ? fs.readFileSync(loadF, "utf8").trim().split("\n").filter(Boolean).map(JSON.parse) : [];
const loadDark = Object.fromEntries(load.filter((r) => r.scheme === "dark").map((r) => [r.route, r]));
const pct = (x) => (x == null ? "–" : Math.round(x * 100) + "%");
const cfg = (list) => list.map((c) => {
    const s = c.stage ? `${c.stage.rect[2]}×${c.stage.rect[3]}` : "–";
    const a = c.aside ? `${c.aside.rect[2]}×${c.aside.rect[3]}` : "–";
    const sc = c.controls && c.controls.scrollsInside ? ` (scrolls ${c.controls.clientH}/${c.controls.scrollH})` : "";
    return `stage ${s}, editor ${a}${sc}`;
}).join("; ");
const dupOf = (r) => {
    const out = [];
    const lr = r.libRoots || {};
    if (lr.blobMain > 1) out.push(`${lr.blobMain} Blob stages`);
    if (lr.auroraMain > 1) out.push(`${lr.auroraMain} Aurora fields`);
    if (lr.constellation > 1) out.push(`${lr.constellation} constellation canvases`);
    if (lr.configurator > 1) out.push(`${lr.configurator} configurators`);
    for (const h of r.dupHeadings) out.push(`heading "${h.t}" ×${h.n}`);
    for (const p of r.dupParas) out.push(`para "${p.t.slice(0, 30)}…" ×${p.n}`);
    return out.join("; ") || "–";
};
const lines = [];
lines.push("| route | words | words before 1st component | component / prose share (1440 fold) | duplicates | canvases (main) · GL/GPU contexts | low-contrast runs d/l/390 | unrounded docks | stage · editor 1440 / 390 | console errors | cold load (dark): FCP → canvas region settled, near-black frames before |");
lines.push("|---|---|---|---|---|---|---|---|---|---|---|");
for (const r of Object.values(S)) {
    const gl = (r.ctx.webgl2 || 0) + (r.ctx.webgl || 0), gpu = r.ctx.webgpu || 0;
    const dk = r.dockFaults.length ? r.dockFaults.map((f) => `${f.w}×${f.h} [${f.eff.join(",")}] need ${f.need}`).join("; ") : "–";
    const st = r.configurators.d1440.length ? `${cfg(r.configurators.d1440)} / ${cfg(r.configurators.m390)}` : "–";
    const L = loadDark[r.route];
    const ld = L && L.summary ? `${L.paint && L.paint["first-contentful-paint"]}ms FCP → ${L.summary.firstNonBlackMs ?? "never"}ms, ${L.summary.blackBeforeOk} black` : (L && L.fail ? "fail" : "–");
    lines.push(`| ${r.route} | ${r.words} | ${r.wordsBeforeFirst} | ${pct(r.compShare)} / ${pct(r.proseShare)} | ${dupOf(r)} | ${r.canvases} (${r.canvasesMain}) · ${gl} GL, ${gpu} GPU | ${r.low.d1440}/${r.low.l1440}/${r.low.m390} | ${dk} | ${st} | ${r.errors.length ? r.errors.length + ": " + r.errors[0].replace(/\|/g, "/").replace(/\s+/g, " ").slice(0, 90) : "–"} | ${ld} |`);
}
console.log("### (b) Per-route table\n");
console.log(lines.join("\n"));
console.log("\n### (c) The worst twenty pages by prose share of the 1440 dark fold\n");
console.log("| # | route | prose share | component share | words | words before 1st component |");
console.log("|---|---|---|---|---|---|");
Object.values(S).sort((a, b) => b.proseShare - a.proseShare).slice(0, 20).forEach((r, i) => console.log(`| ${i + 1} | ${r.route} | ${pct(r.proseShare)} | ${pct(r.compShare)} | ${r.words} | ${r.wordsBeforeFirst} |`));
const all = Object.values(S);
const n = (f) => all.filter(f).length;
const sumLow = (k) => all.reduce((s, r) => s + r.low[k], 0);
console.log("\n### (d) Counts\n");
console.log(`- routes measured: ${all.length} (×3 cells = ${all.length * 3} page loads; failures: ${all.filter((r) => r.fail.length).length})`);
console.log(`- prose leads (prose share > component share at the 1440 fold): ${n((r) => r.proseShare > r.compShare)} routes; no live component in the fold at all: ${n((r) => r.compShare === 0)}`);
console.log(`- low-contrast text runs (unique element+text, under 4.5:1, 3:1 large): dark 1440 ${sumLow("d1440")} on ${n((r) => r.low.d1440)} routes; light 1440 ${sumLow("l1440")} on ${n((r) => r.low.l1440)} routes; dark 390 ${sumLow("m390")} on ${n((r) => r.low.m390)} routes`);
console.log(`- docks measured not a full stadium: ${all.reduce((s, r) => s + r.dockFaults.length, 0)} dock-measurements on ${n((r) => r.dockFaults.length)} routes`);
console.log(`- routes with a duplicate stage/heading/paragraph: ${n((r) => dupOf(r) !== "–")}`);
console.log(`- routes with console errors: ${n((r) => r.errors.length)}`);
console.log(`- routes whose main scroller overflows sideways at 390: ${n((r) => r.overflow390 && (r.overflow390.mainX || r.overflow390.docX))}`);
const ld = Object.values(loadDark).filter((r) => r.summary);
console.log(`- cold loads timed (dark 1440): ${ld.length}; with a black canvas frame before the first good one: ${ld.filter((r) => r.summary.blackBeforeOk > 0).length}; median first-good-canvas ${median(ld.map((r) => r.summary.firstNonBlackMs).filter((x) => x != null))} ms`);
function median(a) { a = [...a].sort((x, y) => x - y); return a.length ? a[Math.floor(a.length / 2)] : null; }
console.log(`\nRenderer: ${JSON.stringify(meta.d1440 && meta.d1440.renderer)}`);
