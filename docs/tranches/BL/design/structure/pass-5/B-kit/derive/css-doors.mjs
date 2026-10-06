#!/usr/bin/env node
// css-doors.mjs — DERIVE step B-S4c (LAW §6, clauses B3, B5, B14): the CSS door channel.
//
// Every CSS crossing (an `@import`, an SFC `<style src>`) from outside a module M into a file
// of M targets M/index.css, M being the outermost module entered (the seal's own reading).
// In one importer, a maximal run of consecutive `@import`s (comments between them do not
// break it) that enter the same M becomes ONE `@import` of M's door, and M/index.css holds
// the run's targets in the same order, so the flattened cascade is unchanged. A `<style src>`
// is re-pointed at the door. Every run into one M must name the same list; a door that
// exists must already hold exactly that list. Anything else stops the run for an authored
// decision (derive/rungs.mjs is where the two such decisions live). Passes repeat until one
// computes nothing (a new door may cross into a sub-module). Each pass is one frozen row.
//   node derive/css-doors.mjs --root <wt> [--dry]
import { createRequire } from "node:module";
import { existsSync, writeFileSync } from "node:fs";
import { join, posix, resolve } from "node:path";
import { loadFloor, arg } from "../lib/floor.mjs";
import { applyRow, makeRow } from "../lib/row.mjs";
import { KIT, recordStep } from "../lib/sequence.mjs";

const args = process.argv.slice(2);
const root = resolve(arg(args, "--root"));
const F = await loadFloor(root);
const req = createRequire(join(root, "package.json"));
const postcss = req("postcss");
const dirOf = (f) => posix.dirname(f);
const under = (f, d) => f === d || f.startsWith(`${d}/`);
const CONTAINERS = new Set(["src", "src/components", "src/composables", "src/components/_shared", "scripts"]);
const isSlot = (d) => d.includes("/") && F.isSlot(d) && !CONTAINERS.has(dirOf(d));
const inSlot = (d) => { const a = d.split("/"); for (let i = 2; i <= a.length; i++) if (isSlot(a.slice(0, i).join("/"))) return true; return false; };
const CODE = /\.(ts|mts|vue|css|glsl|wgsl)$/;
const isTest = (f) => /(^|\/)__tests__\//.test(f) || /\.(test|spec)\.ts$/.test(f);
const rel = (fromDir, to) => { const r = posix.relative(fromDir, to); return r.startsWith(".") ? r : `./${r}`; };

for (let pass = 1; pass <= 6; pass++) {
    const g = F.buildGraph(root);
    const T = g.tree;
    const PUB_CSS = new Set(g.record.css.map(([, t]) => t.source).filter(Boolean));
    const hasCode = new Set();
    for (const f of T.files) if (f.startsWith("src/") && CODE.test(f) && !isTest(f)) { let d = dirOf(f); while (d !== "." && !hasCode.has(d)) { hasCode.add(d); d = dirOf(d); } }
    const modules = [...hasCode].filter((d) => !CONTAINERS.has(d) && !isSlot(d) && !inSlot(d)).sort((a, b) => a.length - b.length);
    const outerM = (from, to) => modules.find((m) => under(to, m) && !under(from, m));
    const door = (m) => `${m}/index.css`;
    const crossing = (e) => {
        if (!e.to || e.dir || !e.to.endsWith(".css") || !e.from.startsWith("src/") || !["css-import", "sfc-style-src"].includes(e.kind)) return null;
        const M = outerM(e.from, e.to);
        if (!M || e.to === door(M) || PUB_CSS.has(e.to)) return null;
        return M;
    };
    const byImporter = new Map();
    for (const e of g.edges) { const M = crossing(e); if (M) { if (!byImporter.has(e.from)) byImporter.set(e.from, []); byImporter.get(e.from).push({ e, M }); } }
    if (!byImporter.size) { console.log(`pass ${pass}: fixpoint`); break; }

    const want = new Map(); // M -> [targets]
    const intended = {};
    const stop = [];
    const claim = (M, list, where) => {
        const prev = want.get(M);
        if (prev && prev.join("|") !== list.join("|")) stop.push(`${M}: ${where} names [${list.map((x) => posix.relative(M, x)).join(", ")}], another importer [${prev.map((x) => posix.relative(M, x)).join(", ")}]`);
        want.set(M, list);
    };
    for (const [file, xs] of byImporter) {
        const text = T.read(file);
        if (file.endsWith(".vue")) {
            let out = text;
            for (const { e, M } of xs) {
                const spec = e.spans?.[0]?.value ?? e.spec;
                const tag = `<style src="${spec}">`;
                if (!out.includes(tag)) { stop.push(`${file}: ${tag} not found`); continue; }
                claim(M, [e.to], file);
                out = out.replace(tag, `<style src="${rel(dirOf(file), door(M))}">`);
            }
            intended[file] = out;
            continue;
        }
        const ast = postcss.parse(text, { from: file });
        const nodes = ast.nodes;
        const target = (n) => {
            if (n.type !== "atrule" || n.name !== "import") return null;
            const m = /^\s*(["'])([^"']+)\1\s*$/.exec(n.params);
            if (!m) return null;
            const to = posix.normalize(posix.join(dirOf(file), m[2]));
            const x = xs.find(({ e }) => e.to === to);
            return x ? { to, M: x.M } : { to, M: null };
        };
        const runs = [];
        let cur = null;
        for (const n of nodes) {
            if (n.type === "comment") continue;
            const t = target(n);
            if (t?.M) {
                if (cur && cur.M === t.M) { cur.nodes.push(n); cur.targets.push(t.to); continue; }
                cur = { M: t.M, nodes: [n], targets: [t.to] }; runs.push(cur); continue;
            }
            cur = null;
        }
        const seen = new Map();
        for (const r of runs) { if (seen.has(r.M)) stop.push(`${file}: two runs into ${r.M} (a rung decision is owed)`); seen.set(r.M, true); claim(r.M, r.targets, file); }
        // rewrite from the end so offsets stay valid: the run's first node becomes the door
        // import, the rest are removed with their line
        let out = text;
        const edits = [];
        // exact spans: an @import runs from its start offset to its terminating ';'
        const span = (n) => { const s = n.source.start.offset; const semi = out.indexOf(";", s); if (semi < 0) throw new Error(`${file}: unterminated @import`); return [s, semi + 1]; };
        for (const r of runs) {
            const [first, ...rest] = r.nodes;
            const [s0, e0] = span(first);
            edits.push({ start: s0, end: e0, text: `@import "${rel(dirOf(file), door(r.M))}";` });
            for (const n of rest) { const [s, e] = span(n); edits.push({ start: s, end: out[e] === "\n" ? e + 1 : e, text: "" }); }
        }
        edits.sort((a, b) => b.start - a.start);
        for (const x of edits) out = out.slice(0, x.start) + x.text + out.slice(x.end);
        intended[file] = out;
    }
    for (const [M, list] of want) {
        const body = list.map((t) => `@import "${rel(M, t)}";`).join("\n");
        const text = `/* ${posix.relative("src", M)} — CSS door: the sheets this module publishes, in cascade order. */\n${body}\n`;
        if (existsSync(join(root, door(M)))) {
            const cur = T.read(door(M));
            const ast = postcss.parse(cur);
            const has = ast.nodes.filter((n) => n.type !== "comment").map((n) => (n.type === "atrule" && n.name === "import" ? posix.normalize(posix.join(M, /["']([^"']+)["']/.exec(n.params)[1])) : `#${n.type}`));
            if (has.join("|") !== list.join("|")) stop.push(`${door(M)} exists and holds [${has.join(", ")}], the crossings name [${list.join(", ")}]`);
            continue;
        }
        intended[door(M)] = text;
    }
    if (stop.length) { console.error(`pass ${pass}: stopped\n  ${stop.join("\n  ")}`); process.exit(1); }
    const row = makeRow(root, `B-S4c CSS doors, pass ${pass} (LAW §6)`, intended);
    const summary = { pass, importers: byImporter.size, doors: [...want.keys()].filter((M) => !existsSync(join(root, door(M)))).length, files: Object.keys(row.files).length };
    console.log(JSON.stringify(summary));
    if (args.includes("--dry")) { for (const [M, l] of want) console.log(`  ${door(M)} <- ${l.map((x) => posix.relative(M, x)).join(", ")}`); break; }
    const file = `frozen/S4c-css-doors-${pass}.json`;
    writeFileSync(join(KIT, file), `${JSON.stringify(row, null, 1)}\n`);
    console.log(JSON.stringify(applyRow(root, row)));
    recordStep(root, { id: `S4c-${pass}`, kind: "row", file, why: `CSS doors pass ${pass}: ${summary.doors} doors; every CSS crossing re-pointed at the entered module's index.css, runs kept in cascade order (B3, B5)` });
}
