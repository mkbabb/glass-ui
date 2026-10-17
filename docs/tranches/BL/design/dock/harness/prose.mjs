// PR · prose by fact (H4-8, pass-4/H4.md). A source gate over a worktree; engine-independent.
//
//   node prose.mjs <worktree> [--out <dir>]          a tree (HEAD, or HEAD with route patches applied)
//   node prose.mjs --fixture pass|noreader|count|duprow|partials|passcite [--out <dir>]
//
// Cells (engine "source"):
//   prose·readers  every custom property DECLARED in the dock band (a CSS declaration `--x:` or an
//                  `@property --x`, comments stripped) or WRITTEN there by script (setProperty("--x"),
//                  a style-object key "--x") has a reader somewhere in src/: `var(--x`, a
//                  getPropertyValue("--x"), or a container `style(--x` (in src/ or the in-repo consumer,
//                  demo/: a token published for consumers is read by one). N-2 gated script writes only;
//                  pass 3 found a declared token with zero readers kept standing on both routes
//                  (`--dock-morph-max-stretch`, G-crit CX-3; this seat's B′ read in REGISTRY P3-2)
//   prose·count    every prose statement "<n> members|props" on a line within 3 lines of "DockProps",
//                  "prop contract" or "surface is" in the dock band names the member count of
//                  `export interface DockProps` (useDockShellProps.ts). Pass 3: "SIX members" over 7
//   prose·rows     a token has one row in docs/design/tunable-anim.md (a table row whose cell is exactly
//                  that `--token`). Pass 3: G's two `--dock-expand-t` rows
//   prose·partials (H5-8) a count of partials ("<n> partials") in a dock-band CSS file that @imports partials names the
//                  number of its @import rules, or the count is struck (B′-crit B3, G-crit B3: "The six partials" over
//                  twelve @imports in the dock's index.css)
//   prose·citations (H5-8) no file in src/ or tests/ cites a design-pass record (`pass-<n>/<file>.md`): the record is
//                  rewritten pass by pass and the citation goes stale (B′-crit §6.6: a test citing pass-3/D2-Bp-proto.md
//                  for a contract pass 4 rewrote)
// Limits: a reader assembled at run time (`var(--${name})`) is not seen; such a token reads as
// reader-less and the cell names it, so a false red is visible, never a silent green.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { parseArgs, loadAvg } from "./lib.mjs";

const args = parseArgs();
const outRoot = path.resolve(args.out ?? process.env.DOCK_HARNESS_OUT ?? path.join(os.tmpdir(), "dock-harness"));
const WORDS = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14 };

/** A tiny tree for the self-test: a pass and three plants, written under <out>/prose-fixture-<name>. */
function fixtureTree(name) {
    const root = path.join(outRoot, `prose-fixture-${name}`);
    fs.rmSync(root, { recursive: true, force: true });
    const w = (f, body) => { fs.mkdirSync(path.dirname(path.join(root, f)), { recursive: true }); fs.writeFileSync(path.join(root, f), body); };
    w("src/components/dock/composables/useDockShellProps.ts", `// The surface is ${name === "count" ? "SIX" : "THREE"} props.\nexport interface DockProps {\n    shape?: "pill" | "card";\n    orientation?: "horizontal" | "vertical";\n    collapse?: false | "closed" | "open";\n}\nexport function f(el: HTMLElement) { el.style.setProperty("--dock-t", "0.5"); }\n`);
    w("src/components/dock/GlassDock.vue", `<script setup lang="ts">\n/* The prop contract is ONE shape (DockProps): THREE members. */\nconst s = { "--dock-seat": "44px" };\n</script>\n<template><div :style="s"></div></template>\n<style>\n.dock { width: calc(var(--dock-seat) * 2); opacity: var(--dock-t); }\n</style>\n`);
    w("src/components/dock/styles/density.css", `/* a comment that names --dock-ghost: it is prose, not a declaration */\n.glass-dock {\n    --dock-gap: 8px;\n${name === "noreader" ? "    --dock-dead: 1.14;\n" : ""}}\n@property --dock-t { syntax: "<number>"; inherits: true; initial-value: 0; }\n`);
    w("src/components/dock/styles/run.css", `.dock-run { gap: var(--dock-gap); }\n`);
    w("src/components/dock/styles/index.css", `/* The ${name === "partials" ? "three" : "two"} partials @import in cascade order. */\n@import "./density.css";\n@import "./run.css";\n.glass-dock { display: flex; }\n`);
    w("tests/components/dock/run.test.ts", `// the run's gap token${name === "passcite" ? " (docs/tranches/BL/design/dock/pass-3/D2-Bp-proto.md §2)" : ""}\nimport { it } from "vitest";\nit("gap", () => {});\n`);
    w("docs/design/tunable-anim.md", `| spring | token | default |\n|---|---|---|\n| dock expand | \`--dock-t\` | 0 |\n| dock gap | \`--dock-gap\` | 8px |\n${name === "duprow" ? "| dock expand (again) | `--dock-t` | 0 |\n" : ""}`);
    return root;
}

const walk = (d, exts, acc = []) => { if (!fs.existsSync(d)) return acc; for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) { if (e.name !== "node_modules") walk(p, exts, acc); } else if (exts.includes(path.extname(e.name))) acc.push(p); } return acc; };
/** Comments out: block comments everywhere, HTML comments in .vue, line comments in script. */
const strip = (src, ext) => { let s = src.replace(/\/\*[\s\S]*?\*\//g, " "); if (ext === ".vue") s = s.replace(/<!--[\s\S]*?-->/g, " "); if (ext !== ".css") s = s.replace(/(^|[^:"'`])\/\/[^\n]*/g, "$1"); return s; };

function judge(tree) {
    const src = path.join(tree, "src"), band = path.join(src, "components", "dock");
    const bandFiles = walk(band, [".css", ".vue", ".ts"]);
    // readers: the library (src/) and its in-repo consumer (demo/): a token published for consumers is read by one
    const allFiles = [...walk(src, [".css", ".vue", ".ts", ".js", ".mjs"]), ...walk(path.join(tree, "demo"), [".css", ".vue", ".ts", ".js", ".mjs"])];
    // declared and written in the band
    const declared = new Map();
    const note = (tok, f) => { if (!declared.has(tok)) declared.set(tok, path.relative(tree, f)); };
    for (const f of bandFiles) {
        const ext = path.extname(f), body = strip(fs.readFileSync(f, "utf8"), ext);
        const css = ext === ".css" ? body : ext === ".vue" ? (body.match(/<style[\s\S]*?<\/style>/g) ?? []).join("\n") : "";
        for (const m of css.matchAll(/(?<![\w-])(--[a-zA-Z][\w-]*)\s*:(?!:)/g)) note(m[1], f);
        for (const m of css.matchAll(/@property\s+(--[a-zA-Z][\w-]*)/g)) note(m[1], f);
        if (ext !== ".css") {
            for (const m of body.matchAll(/setProperty\(\s*["'`](--[a-zA-Z][\w-]*)["'`]/g)) note(m[1], f);
            for (const m of body.matchAll(/["'](--[a-zA-Z][\w-]*)["']\s*:/g)) note(m[1], f);
        }
    }
    const readers = new Set();
    for (const f of allFiles) {
        const body = strip(fs.readFileSync(f, "utf8"), path.extname(f));
        for (const m of body.matchAll(/var\(\s*(--[a-zA-Z][\w-]*)/g)) readers.add(m[1]);
        for (const m of body.matchAll(/getPropertyValue\(\s*["'`](--[a-zA-Z][\w-]*)["'`]/g)) readers.add(m[1]);
        for (const m of body.matchAll(/style\(\s*(--[a-zA-Z][\w-]*)/g)) readers.add(m[1]);
    }
    const dead = [...declared].filter(([t]) => !readers.has(t)).map(([t, f]) => `${t} (${f})`);
    // the DockProps count
    const propsFile = path.join(band, "composables", "useDockShellProps.ts");
    let members = null;
    if (fs.existsSync(propsFile)) {
        const s = strip(fs.readFileSync(propsFile, "utf8"), ".ts");
        const i = s.indexOf("export interface DockProps");
        if (i >= 0) { let d = 0, j = s.indexOf("{", i), body = ""; for (let k = j; k < s.length; k++) { if (s[k] === "{") d++; else if (s[k] === "}") { d--; if (d === 0) { body = s.slice(j + 1, k); break; } } } let depth = 0, n = 0; for (const line of body.split("\n")) { if (depth === 0 && /^\s*[a-zA-Z_]\w*\??\s*:/.test(line)) n++; for (const c of line) { if (c === "{" || c === "(" || c === "<") depth++; else if (c === "}" || c === ")" || c === ">") depth = Math.max(0, depth - 1); } } members = n; }
    }
    const counts = [];
    for (const f of bandFiles) {
        const lines = fs.readFileSync(f, "utf8").split("\n");
        lines.forEach((line, k) => {
            for (const m of line.matchAll(/\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|\d+)\s+(members|props)\b/gi)) {
                const near = lines.slice(Math.max(0, k - 3), k + 4).join(" ");
                if (!/DockProps|prop contract|surface is/i.test(near)) continue;
                const n = /^\d+$/.test(m[1]) ? +m[1] : WORDS[m[1].toLowerCase()];
                counts.push({ at: `${path.relative(tree, f)}:${k + 1}`, says: m[0], n, ok: n === members });
            }
        });
    }
    // tunable-anim rows
    const md = path.join(tree, "docs", "design", "tunable-anim.md");
    const rows = new Map();
    if (fs.existsSync(md)) fs.readFileSync(md, "utf8").split("\n").forEach((line, k) => { if (!line.trim().startsWith("|")) return; for (const c of line.split("|")) { const m = /^\s*`(--[a-zA-Z][\w-]*)`\s*$/.exec(c); if (m) rows.set(m[1], [...(rows.get(m[1]) ?? []), k + 1]); } });
    const dup = [...rows].filter(([, ls]) => ls.length > 1).map(([t, ls]) => `${t} (lines ${ls.join(", ")})`);
    // H5-8 · partial counts beside an @import list
    const partials = [];
    for (const f of walk(band, [".css"])) {   // the dock band, as the other PR cells
        const raw = fs.readFileSync(f, "utf8"), body = strip(raw, ".css");
        const imports = (body.match(/@import\s/g) ?? []).length; if (!imports) continue;
        raw.split("\n").forEach((line, k) => { for (const m of line.matchAll(/\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|\d+)\s+partials\b/gi)) { const n = /^\d+$/.test(m[1]) ? +m[1] : WORDS[m[1].toLowerCase()]; partials.push({ at: `${path.relative(tree, f)}:${k + 1}`, says: m[0], n, imports, ok: n === imports }); } });
    }
    // H5-8 · design-pass citations in src/ and tests/
    const cites = [];
    for (const f of [...walk(src, [".css", ".vue", ".ts", ".js", ".mjs", ".md"]), ...walk(path.join(tree, "tests"), [".css", ".vue", ".ts", ".tsx", ".js", ".mjs", ".md"])]) {
        fs.readFileSync(f, "utf8").split("\n").forEach((line, k) => { for (const m of line.matchAll(/pass-\d+\/[\w.′'-]+\.md/g)) cites.push(`${path.relative(tree, f)}:${k + 1} ${m[0]}`); });
    }
    return { declared: declared.size, readersSeen: readers.size, dead, members, counts, rowsSeen: rows.size, dup, mdFound: fs.existsSync(md), partials, cites };
}

const tree = args.fixture ? fixtureTree(args.fixture) : path.resolve(args.positional[0] ?? "");
if (!fs.existsSync(path.join(tree, "src"))) { console.error("usage: node prose.mjs <worktree> | --fixture pass|noreader|count|duprow"); process.exit(2); }
const r = judge(tree);
const load = loadAvg();
const label = args.fixture ? `fixture:${args.fixture}` : path.basename(tree);
const badCounts = r.counts.filter((c) => !c.ok);
const cells = [
    { engine: "source", cell: "prose·readers", pass: r.dead.length === 0, failed: r.dead.length ? ["readers"] : [], dead: r.dead, summary: `${r.declared} custom propert(ies) declared or written in the dock band; ${r.dead.length} with no reader in src/ or demo/${r.dead.length ? ": " + r.dead.slice(0, 8).join(", ") + (r.dead.length > 8 ? ` … (+${r.dead.length - 8})` : "") : ""}` },
    { engine: "source", cell: "prose·count", pass: r.members != null && badCounts.length === 0, failed: r.members == null || badCounts.length ? ["count"] : [], counts: r.counts, members: r.members, summary: `DockProps has ${r.members ?? "NO interface found"} member(s); ${r.counts.length} prose count(s) near it, ${badCounts.length} wrong${badCounts.length ? ": " + badCounts.map((c) => `${c.at} "${c.says}"`).join(", ") : ""}` },
    { engine: "source", cell: "prose·partials", pass: r.partials.every((c) => c.ok), failed: r.partials.every((c) => c.ok) ? [] : ["partials"], partials: r.partials, summary: `${r.partials.length} partial count(s) in an @import file; ${r.partials.filter((c) => !c.ok).length} wrong${r.partials.some((c) => !c.ok) ? ": " + r.partials.filter((c) => !c.ok).map((c) => `${c.at} "${c.says}" over ${c.imports} @import(s)`).join(", ") : ""}` },
    { engine: "source", cell: "prose·citations", pass: r.cites.length === 0, failed: r.cites.length ? ["citations"] : [], cites: r.cites, summary: `${r.cites.length} design-pass record citation(s) in src/ or tests/${r.cites.length ? ": " + r.cites.slice(0, 4).join(", ") + (r.cites.length > 4 ? ` … (+${r.cites.length - 4})` : "") : ""}` },
    { engine: "source", cell: "prose·rows", pass: r.mdFound && r.dup.length === 0, failed: !r.mdFound || r.dup.length ? ["rows"] : [], dup: r.dup, summary: `${r.mdFound ? `${r.rowsSeen} token(s) with a row in docs/design/tunable-anim.md; ${r.dup.length} with more than one${r.dup.length ? ": " + r.dup.join(", ") : ""}` : "docs/design/tunable-anim.md not found"}` },
];
for (const c of cells) { c.load = load; console.log(`${c.pass ? "PASS" : "FAIL"}  PR  source  ${c.cell}  ${c.summary}  [load ${load}]`); }
const dir = path.join(outRoot, "runs", `PR-${args.fixture ? "fixture-" + args.fixture : path.basename(tree)}`);
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, "PR.json"), JSON.stringify({ witness: "PR", target: label, when: new Date().toISOString(), load, cells }, null, 1));
console.log(`${cells.every((c) => c.pass) ? "PASS" : "FAIL"}  PR  ${label}  ${cells.filter((c) => c.pass).length}/${cells.length} cells pass  (json: ${path.join(dir, "PR.json")})`);
process.exitCode = cells.every((c) => c.pass) ? 0 : 1;
