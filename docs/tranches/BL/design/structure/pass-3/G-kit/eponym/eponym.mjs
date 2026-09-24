#!/usr/bin/env node
// eponym.mjs — the D1-G gate (pass 3). Every clause is a rule of ../LAW.md read literally, over
// the floor's F-1 graph (one graph, fail-closed), F-7 placement with the FD-1 anchor and FD-3's
// one slot predicate, symbol origins, and law.mjs (the same functions the migration ran, frozen
// as literal lists before this gate judged the tree). Every clause judges the resolved file.
// There is no comment opt-out and no path ledger: a hold (FD-2, FD-8) is recomputed, never listed.
//
//   node scripts/structure/eponym/eponym.mjs [--root R] [--clauses E0,E1,…] [--json out]
//        [--overlay plants.json] [--verbose]
import { createRequire } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";
import { posix, resolve } from "node:path";
import { GLOBAL_ZONES, isSlot, placeAll, dirUnits } from "../lib/placement.mjs";
import { ZONES, zoneOf } from "../lib/tree.mjs";
import * as L from "./law.mjs";

const { dirname, basename } = posix;
export const CLAUSES = ["E0", "E1", "E1K", "E2", "E3", "E3N", "E3P", "E4", "E5", "E6", "E7", "B1", "B8", "B12", "B14", "A1", "S1"];
const MODULE_KINDS = new Set(["import", "import-type", "import-type-node", "import-side-effect", "reexport", "reexport-star", "reexport-ns", "dynamic", "dynamic-template", "require", "vi-mock", "sfc-style-src", "sfc-template-src", "sfc-script-src", "css-import", "sfc-inline-css-import", "css-url", "css-reference", "template-asset", "glob", "new-url"]);
const READ_KINDS = new Set(["path-literal", "path-helper", "ts-reference"]);
const AGGREGATES = new Set(["src/index.ts", "src/components/index.ts", "src/styles/index.css"]);
const PLACEHOLDER = /^(utils?|helpers?|misc|common|stuff|tmp|temp|old|new|legacy|compat|shims?|wip|v\d+|part-?\d+)$|-\d+$|^[wp]\d+$/;

export function judge(root, { overlay = {}, clauses = CLAUSES } = {}) {
    const ctx = L.context(root, { overlay });
    const { g, T, O } = ctx;
    const ts = createRequire(`${T.root}/package.json`)("typescript");
    const postcss = createRequire(`${T.root}/package.json`)("postcss");
    const V = Object.fromEntries(CLAUSES.map((k) => [k, []]));
    const info = {};
    const want = new Set(clauses);
    const put = (k, s) => V[k].push(s);
    const lineCount = (t) => t.split("\n").length - (t.endsWith("\n") ? 1 : 0);
    const reach = (e) => e.to && !e.dir && (MODULE_KINDS.has(e.kind) || READ_KINDS.has(e.kind));
    const PUB = new Set([...ctx.entrySources, ...ctx.cssEntrySources]);
    const gDoor = (f) => ctx.entrySources.has(f) || ctx.cssEntrySources.has(f) || (g.record.doors.includes(f) && !isSlot(dirname(f)));

    // E0 · F-1 violations, fail-closed over every S-4 edge kind (self-name in src included, P3-F3)
    for (const v of g.violations) put("E0", `${v.from}:${v.line ?? ""} ${v.kind} [${v.edgeKind ?? ""}] ${v.spec ?? ""}`);

    // E1 · stage 1 proposes nothing; FD-2 and FD-8 holds are recomputed and reported (LAW L1.4, L1.6)
    const s1 = L.stage1(ctx);
    for (const m of s1.moves) put("E1", `${m.class} ${m.from} → ${m.to} (readers ${m.readers.join(", ")})`);
    for (const m of s1.needsName) put("E1", `NEEDS-NAME ${m.from} → ${m.to}`);
    info.E1 = { anchored: s1.anchored, fd2Held: s1.held.map((h) => `${h.from}: ${h.pairs.join("; ")}`), fd8Held: s1.globHeld.map((h) => `${h.from}: ${h.glob}`) };

    // E1K · P3-R1(a): no kernel entry re-exports a file outside the global zone
    for (const [name, src] of g.record.js) {
        if (!ctx.kernelEntry(name)) continue;
        for (const [n, os] of O.exportsOf(src)) for (const f of O.files(os)) if (f.startsWith("src/") && !L.inGlobal(f)) put("E1K", `./${name} publishes ${n} from ${f}`);
    }

    // E2 · stage 2 proposes nothing: every file of a unit sits in its owner's dir (LAW L2)
    let s2 = null;
    if (want.has("E2") || want.has("E3") || want.has("E3N") || want.has("E7")) {
        s2 = L.stage2(ctx, { ts });
        for (const m of s2.moves) put("E2", `${m.from} → ${m.to}`);
        for (const m of s2.needsName) put("E2", `NEEDS-NAME ${m.from} → ${m.to}`);
        info.E2 = { fd2Flattened: s2.held.map((h) => `${h.root} (${h.dir})`), fd8Held: s2.globHeld.map((h) => `${h.from}: ${h.glob}`) };
    }

    // E3 · eponymy: every non-slot dir below a component unit holds its root (a file whose L3 dir
    // name is the dir's name) or an index door (LAW L3.3)
    const codeDirs = new Set(); for (const f of T.files) if (!L.isTest(f)) for (let d = dirname(f); d.includes("/"); d = dirname(d)) codeDirs.add(d);
    const compDirs = [...T.dirs].filter((d) => L.componentUnitOf(`${d}/x`) && d !== L.componentUnitOf(`${d}/x`) && !isSlot(d) && codeDirs.has(d));
    for (const d of compDirs.sort()) {
        const U = L.componentUnitOf(`${d}/x`);
        const own = T.files.filter((f) => dirname(f) === d && /\.(ts|mts|vue|css)$/.test(f) && !L.isTest(f));
        const hasDoor = own.some((f) => /^index\.(ts|css)$/.test(basename(f)));
        const root = own.find((f) => L.norm(L.dirNameOf(f, U)) === L.norm(basename(d)));
        if (!hasDoor && !root) put("E3", `${d}/ holds no root named ${basename(d)} and no door`);
    }
    // E3N · the module set is pinned (names.json `modules`): every nested dir of a component unit,
    // and no other, is listed; a new, lost or renamed module is a reviewed diff (G-03)
    const pinned = new Set(Object.entries(L.NAMES.modules ?? {}).flatMap(([u, ds]) => ds.map((d) => `${u}/${d}`)));
    const present = new Set(compDirs.map((d) => d.slice(L.COMPONENTS.length + 1)));
    for (const d of present) if (!pinned.has(d)) put("E3N", `module ${d} is not in the pin`);
    for (const d of pinned) if (!present.has(d)) put("E3N", `pinned module ${d} is gone`);
    // E3P · placeholder and provenance names (P19): no dir or file stem in src or scripts named as
    // a placeholder, a number, a wave or pass id, or its parent's name
    for (const d of [...T.dirs].filter((x) => ["src", "scripts"].includes(zoneOf(`${x}/x`)) && x.includes("/"))) {
        const seg = basename(d);
        if (PLACEHOLDER.test(seg) && !(seg === "lib" && d === "scripts/lib")) put("E3P", `${d}/ (placeholder name)`);
        if (seg === basename(dirname(d)) && !isSlot(d)) put("E3P", `${d}/ (repeats its parent)`);
    }
    for (const f of T.files.filter((x) => ["src", "scripts"].includes(zoneOf(x)) && /\.(ts|mts|mjs|vue)$/.test(x) && !L.isTest(x))) {
        const stem = basename(f).replace(/\.(d\.)?(ts|mts|mjs|vue)$/, "");
        if (PLACEHOLDER.test(stem)) put("E3P", `${f} (placeholder file name)`);
    }

    // E4 · R-5 strict (P3-R3): > 12 direct files in any dir of the five zones (a slot is bounded
    // itself), or a hand-written source over 500 lines
    const direct = new Map();
    for (const f of T.files) { if (!ZONES.includes(zoneOf(f))) continue; const d = dirname(f); direct.set(d, (direct.get(d) ?? 0) + 1); }
    for (const [d, n] of [...direct].sort()) if (n > 12) put("E4", `${d}/ ${n} direct files`);
    for (const f of T.files) {
        if (!ZONES.includes(zoneOf(f)) || !/\.(ts|mts|cts|js|mjs|cjs|vue|css)$/.test(f)) continue;
        const n = lineCount(T.read(f) ?? "");
        if (n > 500) put("E4", `${f} ${n} lines`);
    }

    // E5 · R-6: one symbol, one door: a symbol origin on two non-root entries
    const onEntries = new Map();
    for (const [name, src] of g.record.js) {
        if (name === "index") continue;
        for (const [n, os] of O.exportsOf(src)) for (const o of os) { const k = `${o.file}#${o.name === "*" ? n : o.name}`; if (!onEntries.has(k)) onEntries.set(k, new Set()); onEntries.get(k).add(name); }
    }
    for (const [k, s] of onEntries) if (s.size > 1) put("E5", `${k} on ${[...s].map((x) => `./${x}`).join(" + ")}`);

    // E6 · R-10: the demo reaches src only through entry sources (module and read kinds)
    for (const e of g.edges) if (zoneOf(e.from) === "demo" && reach(e) && zoneOf(e.to) === "src" && !PUB.has(e.to)) put("E6", `${e.from}:${e.line} ${e.kind} → ${e.to}`);

    // E7 · R-3: a test whose src imports lie in one component unit lives in the __tests__/ slot of
    // the dir of the root that dominates them; any other test lives in the harness zone (LAW L5)
    if (s2) {
        const layoutOf = new Map(s2.layouts.map((x) => [x.U, x]));
        const tests = T.files.filter((f) => /\.(test|test-d)\.(ts|mts)$/.test(f) && (zoneOf(f) === "tests" || f.includes("/__tests__/")));
        for (const t of tests) {
            const home = L.testHome(ctx, t, layoutOf);
            const here = dirname(t);
            if (home === null) { if (here.includes("__tests__")) put("E7", `${t} (no single subject: belongs in the harness)`); continue; }
            if (here !== `${home}/__tests__`) put("E7", `${t} → ${home}/__tests__/`);
        }
    }

    // B1 · the component seal: an edge from outside a component unit U into U lands on U's door or
    // an entry source (within U, E2 owns the rule)
    for (const e of g.edges) {
        if (!reach(e) || zoneOf(e.from) !== "src" || zoneOf(e.to) !== "src") continue;
        const U = L.componentUnitOf(e.to);
        if (!U || L.within(e.from, U) || AGGREGATES.has(e.from)) continue;
        if (e.to === `${U}/index.ts` || e.to === `${U}/index.css` || PUB.has(e.to)) continue;
        put("B1", `${e.from}:${e.line} → ${e.to}${e.typeOnly ? " [type]" : ""} [${e.kind}] (door ${U}/index.ts)`);
    }

    // B8 · the kernel reads no unit (type-only and re-exports included; aggregates excepted), and
    // src reads no consumer zone
    for (const e of g.edges) {
        if (!reach(e) || L.isTest(e.from)) continue;
        if (zoneOf(e.from) === "src" && ["demo", "tests", "tests-visual", "scripts"].includes(zoneOf(e.to))) { put("B8", `${e.from}:${e.line} → ${e.to} (the library reads ${zoneOf(e.to)})`); continue; }
        if (L.inGlobal(e.from) && !AGGREGATES.has(e.from) && L.componentUnitOf(e.to)) put("B8", `${e.from}:${e.line} → ${e.to}${e.typeOnly ? " [type]" : ""} [${e.kind}] (the kernel reads a unit)`);
    }

    // B12 · relays: only a G door re-exports (an entry source, or a declared door that is not a
    // slot barrel, X-10); no declaration mirror
    for (const e of g.edges) {
        if (!e.to || !e.kind.startsWith("reexport") || !["src", "scripts"].includes(zoneOf(e.from)) || L.isTest(e.from) || gDoor(e.from)) continue;
        put("B12", `${e.from}:${e.line} re-exports ${e.to} (relay)`);
    }
    for (const f of T.files) { const m = /^(.*)\.d\.(m?ts)$/.exec(f); if (m && ["src", "scripts"].includes(zoneOf(f)) && [".mjs", ".ts", ".js", ".vue"].some((x) => T.isFile(m[1] + x))) put("B12", `${f} (declaration mirror)`); }

    // B14 · door purity: an index.ts G door holds only `export … from`; an index.css door only
    // @import, bodiless @layer, and @source for its own subtree (P3-R8)
    for (const d of T.files.filter((f) => /\/index\.(ts|css)$/.test(f) && gDoor(f) && !AGGREGATES.has(f))) {
        const text = T.read(d) ?? "";
        if (d.endsWith(".css")) {
            let r; try { r = postcss.parse(text); } catch { put("B14", `${d} (unparseable)`); continue; }
            const bad = r.nodes.filter((n) => n.type !== "comment" && !(n.type === "atrule" && (n.name === "import" || (n.name === "layer" && !n.nodes) || (n.name === "source" && !/\.\.\//.test(n.params)))));
            if (bad.length) put("B14", `${d}:${bad[0].source?.start?.line} holds ${bad.length} non-import node(s)`);
        } else {
            const sf = ts.createSourceFile(d, text, ts.ScriptTarget.Latest, true);
            const bad = sf.statements.filter((s) => !(ts.isExportDeclaration(s) && s.moduleSpecifier));
            if (bad.length) put("B14", `${d}:${sf.getLineAndCharacterOfPosition(bad[0].getStart()).line + 1} holds ${bad.length} statement(s) that are not \`export … from\``);
        }
    }

    // A1 · aliases (P20): one door publishes one origin under one name
    for (const d of [...ctx.entrySources, ...g.record.doors]) {
        if (!T.isFile(d)) continue;
        const byOrigin = new Map();
        for (const [n, os] of O.exportsOf(d)) for (const o of os) { if (o.name === "*") continue; const k = `${o.file}#${o.name}`; if (!byOrigin.has(k)) byOrigin.set(k, new Set()); byOrigin.get(k).add(n); }
        for (const [k, ns] of byOrigin) if (ns.size > 1) put("A1", `${d} publishes ${k} as ${[...ns].join(", ")}`);
    }

    // S1 · scripts (LAW L6): a scripts file that one bin alone reaches lives in that bin's module dir
    const S = L.scriptsLaw(ctx);
    for (const r of S.misplaced) put("S1", `${r.file} → ${r.want} (reached only by the bin ${r.bin})`);
    info.S1 = { bins: S.bins.length };

    const counts = Object.fromEntries(Object.entries(V).map(([k, l]) => [k, l.length]));
    return { counts, V, info, edges: g.edges.length, files: T.files.length };
}

const isMain = process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.dirname ?? "", "eponym.mjs");
if (isMain) {
    const args = process.argv.slice(2);
    const opt = (k, d = null) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
    const root = resolve(opt("--root", resolve(import.meta.dirname, "../../..")));
    const clauses = opt("--clauses") ? opt("--clauses").split(",") : CLAUSES;
    const r = judge(root, { overlay: opt("--overlay") ? JSON.parse(readFileSync(opt("--overlay"), "utf8")) : {}, clauses });
    let fail = 0;
    for (const k of clauses) {
        const list = r.V[k];
        if (list.length) fail++;
        console.log(`${list.length ? "FAIL" : "PASS"} ${k} ${list.length}`);
        for (const s of args.includes("--verbose") ? list : list.slice(0, 3)) console.log(`   ${s}`);
        if (!args.includes("--verbose") && list.length > 3) console.log(`   … ${list.length - 3} more`);
    }
    console.log(`eponym ${JSON.stringify({ edges: r.edges, info: r.info })}: ${fail ? `FAIL (${fail} clause(s))` : "PASS"}`);
    if (opt("--json")) writeFileSync(opt("--json"), JSON.stringify(r, null, 1));
    process.exitCode = fail ? 1 : 0;
}
