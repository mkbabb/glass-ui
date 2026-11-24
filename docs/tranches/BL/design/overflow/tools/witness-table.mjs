#!/usr/bin/env node
// witness-table.mjs [--only F1,F3 ...] <witness.json>...: one Markdown row per case and
// cell, base beside cure; a later file's row replaces an earlier one's. Each side gives the named box's scrollWidth/clientWidth (the first selector's
// first element, or the selector given by KEY below), the document's scrollWidth and
// the logged eval results (a scrollLeft after a swipe, or an overhang).
import { readFileSync } from "node:fs";
// The box that carries each case's fault: [selector, element index].
const KEY = {
    "F1 SegmentedTabs in the Filters sheet": ["[data-testid=ovf-filters-body]", 0],
    "F1 SegmentedTabs long label": ["main", 0],
    "F2 detented left sheet": ["[data-slot=sheet-content]", 0],
    "F2b Dialog description": ["[data-slot=dialog-content]", 0],
    "F3 DropdownMenu": ["[data-slot=menu-content]", 0],
    "F3 Popover": ["[data-slot=popover-content]", 0],
    "F3 Select options": ["[data-slot=select-viewport]", 0],
    "F3 narrow column": ["[data-testid=ovf-narrow] [data-slot=command-item]", 1],
    "F3 ToggleGroup": ["main [data-slot=toggle-group]", 0],
    "F3 Button": ["main .buttons-stage button", 0],
    "F3 Label": ["main .inputs-stage", 0],
    "R ExpandableContainer": ["main .expandable-stage", 0],
    "F4 Timeline": ["main .tl", 0],
    "F3 Toast": ["[data-slot=toast]", 0],
    "F3 Tooltip": ["[data-slot=tooltip-content]", 0],
    "B2 eight": ["[data-testid=fold-tabs8]", 0],
    "B2 vertical": ["[data-testid=fold-tabs8] .segmented-tabs", 0],
    "B1 Table": ["[data-testid=fold-table] [data-slot=table-container]", 0],
    "B1 four": ["[data-testid=fold-buttons]", 0],
    "M2 selected": ["[data-testid=fold-chip-bare]", 0],
    "M3 three": ["[data-testid=fold-dock3] .dock-run", 0],
    "M1 atlas": ["[data-testid=fold-atlas-body]", 0],
    "M4 EasingPicker": ["[data-testid=fold-m4]", 0],
    "M4b EasingPicker": ["[data-testid=fold-m4]", 0],
    "B2c the": ["[data-testid=fold-wrap-row]", 0],
    "L1 Label": ["main .inputs-stage", 0],
};
const argv = process.argv.slice(2);
const oi = argv.indexOf("--only");
const ONLY = oi >= 0 ? argv.splice(oi, 2)[1].split(",") : null;
const rows = new Map();
for (const f of argv) {
    const w = JSON.parse(readFileSync(f, "utf8"));
    for (const j of w.jobs) {
        const k = Object.keys(KEY).find((p) => j.name.startsWith(p));
        const [sel, i] = KEY[k] || [j.read[0]?.sel, 0];
        const el = j.read.find((r) => r.sel === sel)?.els[i];
        const evals = j.log.filter((l) => l.startsWith("eval:") && !/"ok"|undefined/.test(l)).map((l) => l.slice(6));
        const side = el ? `${el.sw}/${el.cw} (w ${el.w}, right ${el.right})` : "none";
        const id = `${j.name}|${j.cell}|${w.engine}`;
        if (!rows.has(id)) rows.set(id, { name: j.name, cell: j.cell, engine: w.engine });
        rows.get(id)[j.tree.startsWith("cure") ? "cure" : "base"] = { tree: j.tree, box: side, doc: j.docSW, evals: evals.join(" "), sel, err: j.log.filter((l) => !l.startsWith("eval") && !l.startsWith("swipe")).join(" ").slice(0, 80) };
    }
}
console.log("| case | engine | cell | box | base: sw/cw, page width, read | cure: sw/cw, page width, read |");
console.log("|---|---|---|---|---|---|");
const VER = { cure: "v1", cure2: "v2", cure3: "v3", cure4: "v4" };
for (const r of rows.values()) {
    if (ONLY && !ONLY.some((p) => r.name.startsWith(p))) continue;
    const s = (x) => (x ? `${VER[x.tree] ? `(${VER[x.tree]}) ` : ""}${x.box}, ${x.doc}${x.evals ? `, ${x.evals}` : ""}${x.err && x.box === "none" ? ` (${x.err.replace(/\x1b\[[0-9;]*m/g, "")})` : ""}` : "not run");
    // The plans name the toast case F3; SWEEP.md files it as F2c (its cause is the grid column).
    console.log(`| ${r.name.replace(/^F3 Toast/, "F2c Toast")} | ${r.engine} | ${r.cell} | \`${(r.base || r.cure).sel}\` | ${s(r.base)} | ${s(r.cure)} |`);
}
