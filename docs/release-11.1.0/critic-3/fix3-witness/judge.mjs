// Fix 3 judge: verdicts from out/{label}-{engine}.json. The layout cells of the
// Collapsible with the gap unset are GREEN when equal to the v11.0.0 reading (label red).
//   node judge.mjs <out-dir> <label> <engine> [v11.0.0-label]
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [outDir, label, engine, refLabel = "red"] = process.argv.slice(2);
const load = (l) => JSON.parse(readFileSync(join(outDir, `${l}-${engine}.json`), "utf8")).cells;
const cells = load(label);
const ref = Object.fromEntries(load(refLabel).map((c) => [`${c.item}|${c.cell}`, c.detail]));
const near = (a, b, tol) => Math.abs(a - b) <= tol;
const verdicts = [];
const judge = (c, pass, why) => verdicts.push({ item: c.item, cell: c.cell, pass, why });

for (const c of cells) {
    const d = c.detail;
    if (d?.error) { judge(c, false, d.error); continue; }
    if (c.item === "Collapsible layout") {
        const r = ref[`${c.item}|${c.cell}`];
        const same = r && near(d.contentHeight, r.contentHeight, 0.5) && d.kids.every((k, i) => k.every((v, j) => near(v, r.kids[i][j], 0.5)));
        judge(c, !!same, `content ${d.contentHeight} vs v11.0.0 ${r?.contentHeight}; kids ${JSON.stringify(d.kids)} vs ${JSON.stringify(r?.kids)}`);
    } else if (c.item === "Collapsible gap") {
        const [x1, y1] = d.kids[0], [x2, y2] = d.kids[1];
        const grid2 = c.cell.endsWith("grid2");
        const pass = near(y1, 12, 0.5) && near(x1, 0, 0.5) && (!grid2 || (near(y2, y1, 0.5) && x2 > 0));
        judge(c, pass, `first child at (${x1}, ${y1})${grid2 ? `, second at (${x2}, ${y2})` : ""}; ::before ${d.before.content}`);
    } else if (c.item === "Collapsible frames") {
        const ok = !d.first.error && !d.last.error && near(d.first.root, d.closed, 2) && near(d.last.root, d.closed, 2) && d.opened > d.closed + 20;
        judge(c, ok, `closed ${d.closed}, first open frame ${d.first.root} (content ${d.first.content}, padding ${d.first.paddingTop}), open ${d.opened}, last close frame ${d.last.root}`);
    } else if (c.item === "Slider controlled") {
        const bad = d.steps.filter(([, s]) => String(s.model) !== s.ariaValueNow || !near(s.thumbAt, s.model / 100, 0.03));
        judge(c, bad.length === 0, d.steps.map(([k, s]) => `${k} ${s.model}/${s.ariaValueNow}/${s.thumbAt}`).join("; "));
    } else if (c.item === "Root tempo") {
        const rows = Object.entries(d).filter(([, v]) => v && typeof v === "object" && "css" in v);
        const bad = rows.filter(([, v]) => !near(+v.js, +v.css, 1e-6));
        judge(c, bad.length === 0, rows.map(([k, v]) => `${k} ${v.js}/${v.css}`).join("; ") + `; link ${d.linkEvent}, sheet at append ${d.atAppend?.sheetAtAppend}`);
    } else if (c.item === "Tabs radius") {
        // Coarse: every tab at least 44 px and the tab, indicator and strip capsules
        // (radius at least half the height). Fine: unchanged from v11.0.0.
        const coarse = c.cell.includes("coarse");
        const r = ref[`${c.item}|${c.cell}`];
        const parts = [];
        let pass = coarse ? d.coarse && d.page.tab.h >= 43.5 && d.dock.tab.h >= 43.5 : !d.coarse && !!r;
        for (const host of ["page", "dock"]) for (const p of ["tab", "indicator", "strip"]) {
            const v = d[host][p];
            pass &&= coarse ? v.r >= v.h / 2 - 0.5 : near(v.h, r[host][p].h, 0.5) && near(v.r, r[host][p].r, 0.01);
            parts.push(`${host}.${p} ${v.h}/${v.r}`);
        }
        judge(c, pass, `coarse ${d.coarse}; h/r ${parts.join(", ")}${coarse ? "" : " (fine: equal to v11.0.0)"}`);
    }
}
const byItem = {};
for (const v of verdicts) (byItem[v.item] ??= { pass: 0, total: 0 }).total++, v.pass && byItem[v.item].pass++;
writeFileSync(join(outDir, `verdict-${label}-${engine}.json`), JSON.stringify({ label, engine, byItem, verdicts }, null, 2));
for (const [k, v] of Object.entries(byItem)) console.log(`${label} ${engine} ${k}: ${v.pass}/${v.total}`);
