#!/usr/bin/env node
// css-doors-dock.mjs — B-S4's CSS door row for the dock (B §7.1), authored and frozen: the dock
// door `dock/index.css` holds only @import lines; its trailing rules become `styles/core.css`,
// imported after the partials; the controls module's door `controls/index.css` imports its four
// families then its own leaf `controls.css`, and is imported LAST by the dock door, which is
// where `src/styles/index.css` imported it at HEAD (so that aggregate line is removed); the
// legibility, layers and search modules each get an index.css over their partials. The order
// of every leaf rule is unchanged (cascade-fd4 verify is the check).
//   node css-doors-dock.mjs --root WT --out frozen/S4b-dock-css-doors.json
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const root = resolve(opt("--root"));
const D = "src/components/dock";
const read = (p) => (existsSync(join(root, p)) ? readFileSync(join(root, p), "utf8") : null);
const files = {};
const put = (p, after) => { files[p] = { before: read(p), after }; };

// the dock door: leading comment + imports; everything after the last @import is core.css
const door = read(`${D}/index.css`);
const lines = door.split("\n");
const last = lines.map((l, i) => (/^@import /.test(l) ? i : -1)).filter((i) => i >= 0).pop();
const first = lines.findIndex((l) => /^@import /.test(l));
const head = lines.slice(0, first).join("\n");
const imports = lines.slice(first, last + 1).filter((l) => /^@import /.test(l));
const trailing = lines.slice(last + 1).join("\n").replace(/^\n+/, "");
const via = { "./legibility/adaptive-legibility.css": "./legibility/index.css", "./layers/layers.css": "./layers/index.css", "./search/search.css": "./search/index.css" };
const out = [];
for (const l of imports) {
    const spec = /^@import "([^"]+)";$/.exec(l)[1];
    if (spec === "./layers/layer-group.css" || spec === "./layers/crossfade.css") continue; // behind the layers door
    out.push(`@import "${via[spec] ?? spec}";`);
}
out.push('@import "./styles/core.css";', '@import "./controls/index.css";');
put(`${D}/index.css`, `${head}\n${out.join("\n")}\n`);
put(`${D}/styles/core.css`, `/* dock/styles/core.css — the dock core rules (the @property registrations and the core\n   component layer), imported by the dock door after the partials: the order they held\n   as the trailing rules of the old dock/styles/index.css. */\n${trailing}`);
put(`${D}/legibility/index.css`, '@import "./adaptive-legibility.css";\n');
put(`${D}/search/index.css`, '@import "./search.css";\n');
put(`${D}/layers/index.css`, '@import "./layers.css";\n@import "./layer-group.css";\n@import "./crossfade.css";\n');
// the controls module: its four families + its own leaf, behind one door
const ctl = read(`${D}/controls/controls.css`);
const ctlImports = ctl.split("\n").filter((l) => /^@import /.test(l));
put(`${D}/controls/controls.css`, ctl.split("\n").filter((l) => !/^@import /.test(l)).join("\n"));
put(`${D}/controls/index.css`, `${ctlImports.join("\n")}\n@import "./controls.css";\n`);
// the aggregate loaded controls right after the dock door; the dock door now carries it last
const agg = read("src/styles/index.css");
const line = '@import "../components/dock/controls/controls.css";\n';
if (!agg.includes(line)) throw new Error("aggregate controls line not found");
put("src/styles/index.css", agg.replace(line, ""));
writeFileSync(opt("--out"), `${JSON.stringify({ step: "B-S4 dock CSS doors", files }, null, 1)}\n`);
console.log(JSON.stringify({ files: Object.keys(files), doorImports: out }));
