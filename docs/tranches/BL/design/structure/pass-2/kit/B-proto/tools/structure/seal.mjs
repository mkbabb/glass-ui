#!/usr/bin/env node
// seal.mjs — the D1-B gate: sealed modules, one door each (SPECS-v2 §2.5, clauses B0-B15),
// written as clauses over the floor's F-1 graph (one graph, fail-closed), F-7 placement with
// the FD-1 root-door anchor and FD-3's one slot predicate, and symbol origins. Every clause
// judges the RESOLVED file, never the specifier. No comment opt-out exists anywhere.
//
//   node scripts/structure/seal.mjs [--root R] [--verbose] [--json out] [--slot-arm strict|exempt]
//                                   [--overlay plants.json] [--no-pin] [--write-pin pin.json]
import { readFileSync, writeFileSync } from "node:fs";
import { posix, resolve } from "node:path";
import { createRequire } from "node:module";
import { buildGraph, VALUE_KINDS } from "../../docs/tranches/BL/design/structure/floor/lib/graph.mjs";
import { makeOrigins } from "../../docs/tranches/BL/design/structure/floor/lib/symbols.mjs";
import { placeAll } from "../../docs/tranches/BL/design/structure/floor/lib/placement.mjs";

// ---------------------------------------------------------------- declarations (one place)
export const SEALED = ["src", "scripts"];
export const ZONES5 = ["src", "demo", "scripts", "tests", "tests-visual"]; // R-5 zones
export const CONTAINERS = new Set(["src", "src/components", "src/composables", "scripts"]);
export const KIND_SLOTS = new Set(["composables", "styles", "__tests__"]); // R-4, R-5, R-3
const DOOR_BASENAMES = ["index.ts", "index.mjs", "index.css"];
const HARNESS = /^tests\/harness\//; // R-3: the one module that walks or reads the tree (a regex, so F-1 reads no path)
const AGGREGATES = new Set(["src/index.ts", "src/styles/index.css"]); // the root door and ./styles (R-7)
/** The kernel's roots: nothing below them anchors (R-2: a kernel door anchors nothing). */
export const KERNEL_ROOTS = ["src/composables", "src/styles", "src/components/_shared", "src/fonts"];
const KERNEL = (f) => KERNEL_ROOTS.some((k) => f.startsWith(`${k}/`));
const UNIT_FILE = (f) => f.startsWith("src/components/") && !f.startsWith("src/components/_shared/") && f.split("/").length > 3;
const CODE = /\.(ts|tsx|mts|cts|js|mjs|cjs|vue|css|glsl|wgsl|sh|py)$/;
const COMPUTED = new Set(["fs-read", "path-helper"]); // F-1 census kinds that are computed-path reads
export const zoneOf = (f) => { const t = f.split("/")[0]; return ZONES5.includes(t) ? t : !f.includes("/") ? "root" : "other"; };
const isTest = (f) => /(^|\/)__tests__\//.test(f) || /\.(test|spec|test-d)\.(ts|tsx|mts)$/.test(f) || /\.visual\.ts$/.test(f);
const under = (f, d) => f === d || f.startsWith(`${d}/`);
const dirOf = (f) => posix.dirname(f);
/** FD-3: a kind slot is a dir named in R-5's set that is neither a zone root nor a direct child of a zone or container. */
export const isSlot = (d) => KIND_SLOTS.has(posix.basename(d)) && !CONTAINERS.has(d) && !CONTAINERS.has(dirOf(d)) && !ZONES5.includes(dirOf(d)) && d.includes("/");
const inSlot = (d) => { const a = d.split("/"); for (let i = 2; i < a.length; i++) if (isSlot(a.slice(0, i).join("/"))) return true; return false; };
/** R-2's unit set under FD-3: every dir a unit; a kind slot belongs to the unit that holds it. */
export const units = { name: "dir (FD-3 slots)", unitOf(file) { let d = dirOf(file); while (isSlot(d)) d = dirOf(d); return d; } };

/** FD-1 (X-10): a unit's ROOT door anchors every file it re-exports from inside its own dir; a
 *  kind-slot barrel is wiring, not a door; a kernel or container door anchors nothing; the innermost wins. */
export function anchorsOf(g, O = makeOrigins(g)) {
    const anchor = new Map();
    const doors = g.tree.files.filter((f) => /(^|\/)index\.ts$/.test(f) && f.startsWith("src/") && !CONTAINERS.has(dirOf(f)) && !isSlot(dirOf(f)) && !KERNEL(f)).sort((a, b) => a.length - b.length);
    for (const d of doors) { const u = dirOf(d); for (const [, os] of O.exportsOf(d)) for (const o of os) if (o.file.startsWith(`${u}/`) && o.file !== d) anchor.set(o.file, u); }
    return anchor;
}

/** The reviewed door and module pin (B11): growth or loss is a diff against this file. Read by a
 *  root-relative path (vitest serves this module under a non-file import.meta.url). */
export const readPin = (root) => JSON.parse(readFileSync(posix.join(root, "scripts/structure/seal-pin.json"), "utf8"));

export function seal(root, { overlay = {}, slotArm = "strict", pin = readPin(root) } = {}) {
    const g = buildGraph(root, { overlay });
    const T = g.tree;
    const ts = createRequire(`${T.root}/package.json`)("typescript");
    const postcss = createRequire(`${T.root}/package.json`)("postcss");

    // ---------------------------------------------------------------- the published set (F-3)
    const PUB_JS = new Set(g.record.js.map(([, s]) => s));
    const PUB_CSS = new Set(g.record.css.map(([, t]) => t.source).filter(Boolean));
    const PUB_ASSETS = g.record.css.map(([, t]) => t.assets).filter(Boolean);
    const PUB = new Set([...PUB_JS, ...PUB_CSS, ...T.files.filter((f) => PUB_ASSETS.some((a) => f.startsWith(a)))]);

    // ---------------------------------------------------------------- the module tree
    const filesIn = new Map();
    for (const f of T.files) { const d = dirOf(f); if (!filesIn.has(d)) filesIn.set(d, []); filesIn.get(d).push(f); }
    const allDirs = [...T.dirs].filter((d) => ZONES5.includes(zoneOf(`${d}/x`)));
    const subtreeHasCode = new Map();
    for (const f of T.files) if (CODE.test(f) && !isTest(f)) { let d = dirOf(f); while (d !== "." && !subtreeHasCode.has(d)) { subtreeHasCode.set(d, true); d = dirOf(d); } }
    const doorFilesOf = (d) => DOOR_BASENAMES.map((b) => `${d}/${b}`).filter((p) => T.isFile(p));
    const sealedCodeDirs = allDirs.filter((d) => SEALED.includes(zoneOf(`${d}/x`)) && subtreeHasCode.get(d) && !CONTAINERS.has(d) && !isSlot(d) && !inSlot(d));
    const modules = sealedCodeDirs.filter((d) => doorFilesOf(d).length).sort((a, b) => a.length - b.length);
    const modSet = new Set(modules);
    const jsDoor = (m) => (m.startsWith("scripts") ? `${m}/index.mjs` : `${m}/index.ts`);
    const cssDoor = (m) => `${m}/index.css`;
    const isDoorOf = (m, f) => f === jsDoor(m) || f === cssDoor(m);
    const isDoorFile = (f) => DOOR_BASENAMES.includes(posix.basename(f)) && (modSet.has(dirOf(f)) || CONTAINERS.has(dirOf(f)));
    const chain = (f) => modules.filter((m) => under(f, m));
    const outerM = (from, to) => modules.find((m) => under(to, m) && !under(from, m));
    const innerM = (f) => chain(f).pop();

    // ---------------------------------------------------------------- edge classes
    const MODULE_KINDS = new Set(["import", "import-type", "import-type-node", "import-side-effect", "reexport", "reexport-star", "reexport-ns", "dynamic", "dynamic-template", "require", "vi-mock", "sfc-style-src", "sfc-template-src", "sfc-script-src", "css-import", "sfc-inline-css-import", "css-url", "css-reference", "template-asset", "glob"]);
    const READ_KINDS = new Set(["path-literal", "path-helper", "new-url", "ts-reference"]);
    const WALK_KINDS = new Set(["scan", "glob-literal"]);
    const CSS_KINDS = new Set(["css-import", "sfc-style-src", "sfc-inline-css-import"]);
    const reach = (e) => e.to && !e.dir && (MODULE_KINDS.has(e.kind) || READ_KINDS.has(e.kind)) && zoneOf(e.from) !== "other" && zoneOf(e.to) !== "other";
    const isCss = (e) => CSS_KINDS.has(e.kind) && e.to.endsWith(".css");

    const V = {}; const put = (k, s) => V[k].push(s);
    for (const k of ["B0", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11", "B12", "B13", "B14", "B15"]) V[k] = [];
    const b0 = { f1: 0, walks: 0, computed: 0 };

    // ---- B0 · resolution, walks, computed reads
    for (const v of g.violations) b0.f1++, put("B0", `${v.from}:${v.line ?? ""} ${v.kind} [${v.edgeKind ?? ""}] ${v.spec ?? ""}`);
    const walkers = new Set();
    for (const e of g.edges) {
        const walk = WALK_KINDS.has(e.kind) || (READ_KINDS.has(e.kind) && e.dir && e.to !== ".");
        if (!walk || !e.to || HARNESS.test(e.from) || zoneOf(e.from) === "root" || zoneOf(e.from) === "other") continue;
        const tz = zoneOf(e.dir ? `${e.to}/x` : e.to);
        if (!SEALED.includes(tz)) continue;
        const k = `${e.from}:${e.line}`; if (walkers.has(k)) continue; walkers.add(k);
        b0.walks++; put("B0", `${e.from}:${e.line} walk of ${e.dir ? `${e.to}/` : e.glob ?? e.to} [${e.kind}]`);
    }
    for (const c of g.census) if (["tests", "tests-visual", "scripts"].includes(zoneOf(c.from)) && !HARNESS.test(c.from) && COMPUTED.has(c.kind)) b0.computed++, put("B0", `${c.from}:${c.line} computed-path read ${String(c.spec).slice(0, 60)} [${c.kind}]`);

    // ---- B1 door (recursive) + own door · B2 consumer (R-10, R-3) · B3 CSS door · B8b library → consumer zone
    for (const e of g.edges) {
        if (!reach(e) || e.from === e.to) continue;
        const zf = zoneOf(e.from), zt = zoneOf(e.to);
        if (zf === "src" && zt !== "src") { put("B8", `${e.from}:${e.line} -> ${e.to} [${e.kind}] (the library reads the ${zt} zone)`); continue; }
        if (!SEALED.includes(zt)) continue;
        if (zt === "src" && zf !== "src") { if (!HARNESS.test(e.from) && !PUB.has(e.to)) put("B2", `${e.from}:${e.line} -> ${e.to} [${e.kind}]`); continue; }
        const own = innerM(e.from);
        if (own && isDoorOf(own, e.to) && !isTest(e.from) && !e.kind.startsWith("reexport") && !isCss(e)) { put("B1", `${e.from}:${e.line} -> ${e.to} (own door)`); continue; }
        const M = outerM(e.from, e.to);
        if (!M) continue;
        if (isCss(e)) { if (e.to !== cssDoor(M) && !PUB_CSS.has(e.to)) put("B3", `${e.from}:${e.line} -> ${e.to} (css door ${cssDoor(M)})`); continue; }
        if (isDoorOf(M, e.to) || PUB.has(e.to)) continue;
        put("B1", `${e.from}:${e.line} -> ${e.to}${e.typeOnly ? " [type]" : ""} [${e.kind}] (door ${jsDoor(M)})`);
    }

    // ---- B4 acyclic: value and type edges among sibling nodes at every depth
    const adjBy = new Map(); const typeOnlyPair = new Map();
    for (const e of g.edges) {
        if (!e.to || e.dir || isTest(e.from) || isTest(e.to)) continue;
        const isVal = VALUE_KINDS.has(e.kind) && !e.typeOnly;
        const isType = /^import-type/.test(e.kind) || (e.typeOnly && (VALUE_KINDS.has(e.kind) || e.kind.startsWith("reexport")));
        if (!isVal && !isType) continue;
        const zf = zoneOf(e.from); if (zf !== zoneOf(e.to) || !SEALED.includes(zf)) continue;
        const ca = chain(e.from), cb = chain(e.to); const common = ca.filter((m) => cb.includes(m)).pop() ?? zf;
        const node = (f, c) => c.find((m) => m !== common && under(m, common) && (chain(m).filter((y) => y !== m).pop() ?? zf) === common) ?? f;
        const a = node(e.from, ca), b = node(e.to, cb); if (a === b) continue;
        if (!adjBy.has(common)) adjBy.set(common, new Map()); const A = adjBy.get(common);
        if (!A.has(a)) A.set(a, new Map()); if (!A.has(b)) A.set(b, new Map());
        if (!A.get(a).has(b)) A.get(a).set(b, `${e.from} -> ${e.to}${isVal ? "" : " [type]"}`);
        const k = `${a}|${b}`; typeOnlyPair.set(k, (typeOnlyPair.get(k) ?? true) && !isVal);
    }
    const tarjan = (adj) => { let i = 0; const I = new Map(), L = new Map(), st = [], on = new Set(), out = [];
        const sc = (x) => { I.set(x, i); L.set(x, i++); st.push(x); on.add(x); for (const w of adj.get(x).keys()) { if (!I.has(w)) { sc(w); L.set(x, Math.min(L.get(x), L.get(w))); } else if (on.has(w)) L.set(x, Math.min(L.get(x), I.get(w))); }
            if (L.get(x) === I.get(x)) { const c = []; let w; do { w = st.pop(); on.delete(w); c.push(w); } while (w !== x); if (c.length > 1) out.push(c); } };
        for (const x of adj.keys()) if (!I.has(x)) sc(x); return out; };
    const b4info = [];
    for (const [lvl, adj] of adjBy) for (const c of tarjan(adj)) {
        if (!c.some((x) => modSet.has(x)) && new Set(c.map(dirOf)).size === 1) { b4info.push(`${lvl}: [${c.join(" ")}]`); continue; }
        const S = new Set(c); const why = c.flatMap((a) => [...adj.get(a)].filter(([b]) => S.has(b)).map(([, w]) => w));
        const typeOnly = c.every((a) => [...adj.get(a).keys()].filter((b) => S.has(b)).every((b) => typeOnlyPair.get(`${a}|${b}`)));
        put("B4", `cycle @${lvl} [${c.map((x) => x.replace(`${lvl}/`, "")).join(" ")}]${typeOnly ? " (type-only)" : ""} via ${why.slice(0, 3).join(" ; ")}`);
    }

    // ---- B5 kind slot: no door, no sub-dir
    for (const d of allDirs) {
        if (!SEALED.includes(zoneOf(`${d}/x`))) continue;
        if (isSlot(d) && doorFilesOf(d).length) put("B5", `${doorFilesOf(d).join(",")} (door in a kind slot)`);
        if (isSlot(dirOf(d))) put("B5", `${d} (dir inside kind slot ${dirOf(d)})`);
    }

    // ---- B6 bounds (R-5): every zone, tests counted; strict slot arm bounds the slot itself
    for (const d of allDirs) {
        const n = (filesIn.get(d) ?? []).length;
        if (slotArm === "exempt" && KIND_SLOTS.has(posix.basename(d))) continue;
        if (n > 12) put("B6", `${d}/: ${n} direct files > 12`);
    }
    for (const f of T.files) {
        if (!ZONES5.includes(zoneOf(f)) || !CODE.test(f)) continue;
        const n = (T.read(f) ?? "").split("\n").length - ((T.read(f) ?? "").endsWith("\n") ? 1 : 0);
        if (n > 500) put("B6", `${f}: ${n} lines > 500`);
    }

    // ---- B7 mandatory seal: every code dir in a sealed zone is a module, a kind slot or a container
    for (const d of sealedCodeDirs) {
        const own = filesIn.get(d) ?? [];
        const hasScript = own.some((f) => /\.(ts|vue|mjs)$/.test(f) && !isTest(f) && !/\.d\.m?ts$/.test(f));
        if (!doorFilesOf(d).length) put("B7", `${d}/ (${own.length} direct files, no door)`);
        else if (hasScript && !T.isFile(jsDoor(d))) put("B7", `${d}/ (script code behind a CSS-only door: ${jsDoor(d)} missing)`);
        else if (d.startsWith("src/") && T.isFile(jsDoor(d)) && !g.record.doors.includes(jsDoor(d)) && !PUB_JS.has(jsDoor(d))) put("B7", `${jsDoor(d)} (not in record.doors)`);
    }

    // ---- B8a rank: the kernel reads no unit (type-only and re-exports included; aggregates are doors)
    for (const e of g.edges) {
        if (!reach(e) || isTest(e.from) || AGGREGATES.has(e.from)) continue;
        if (KERNEL(e.from) && UNIT_FILE(e.to)) put("B8", `${e.from}:${e.line} -> ${e.to}${e.typeOnly ? " [type]" : ""} [${e.kind}] (kernel reads a unit)`);
    }

    // ---- B9 one symbol, one door (R-6)
    const O = makeOrigins(g);
    const doorLike = (f) => isDoorFile(f) || PUB_JS.has(f);
    for (const e of g.edges) {
        if (!e.to || !e.kind.startsWith("reexport") || !doorLike(e.from) || AGGREGATES.has(e.from)) continue;
        if (!under(e.to, dirOf(e.from))) put("B9", `${e.from}:${e.line} re-exports ${e.to} (outside its subtree)`);
    }
    const onEntries = new Map();
    for (const [name, src] of g.record.js) {
        if (name === "index") continue;
        for (const [n, os] of O.exportsOf(src)) for (const o of os) { const k = `${o.file}#${o.name === "*" ? n : o.name}`; if (!onEntries.has(k)) onEntries.set(k, new Set()); onEntries.get(k).add(name); }
    }
    const multi = [...onEntries].filter(([, s]) => s.size > 1);
    for (const [k, s] of multi) put("B9", `${k} on ${[...s].map((x) => `./${x}`).join(" + ")}`);

    // ---- B10 placement: F-7 over R-2 units (FD-3), FD-1 root-door anchor, doors are not readers
    const anchor = anchorsOf(g, O);
    const P = placeAll(g, units, { zones: ["src"] });
    let anchored = 0;
    for (const r of P.rows) {
        if (r.class !== "move" && r.class !== "global") continue;
        if (anchor.has(r.file)) { anchored++; continue; }
        put("B10", `${r.file} -> ${r.home} [${r.class}] readers: ${r.readerUnits.join(", ")}`);
    }

    // ---- B11 surface: internal-door names with no outside reader; empty doors; the pin (names + module set)
    const readersOfKey = new Map();
    for (const e of g.edges) {
        if (!e.to || !e.names?.length || e.kind.startsWith("reexport") || doorLike(e.from)) continue;
        for (const n of e.names) for (const o of O.originOf(e.to, n.imported)) { const k = `${o.file}#${o.name}`; if (!readersOfKey.has(k)) readersOfKey.set(k, new Set()); readersOfKey.get(k).add(e.from); }
    }
    const publishedKeys = new Set();
    for (const [, src] of g.record.js) for (const [, os] of O.exportsOf(src)) for (const o of os) publishedKeys.add(`${o.file}#${o.name}`);
    const pinNow = { modules: [...modules].sort(), doors: {} };
    for (const m of modules) {
        const d = jsDoor(m); if (!T.isFile(d)) continue;
        const ex = O.exportsOf(d); pinNow.doors[d] = [...ex.keys()].sort();
        if (!ex.size) { put("B11", `${d} exports nothing`); continue; }
        if (PUB.has(d) || AGGREGATES.has(d)) continue;
        for (const [n, os] of ex) {
            if (os.some((o) => publishedKeys.has(`${o.file}#${o.name}`))) continue;
            const outside = os.some((o) => [...(readersOfKey.get(`${o.file}#${o.name}`) ?? [])].some((r) => !under(r, m)));
            if (!outside) put("B11", `${d} exports ${n} (no reader outside ${m})`);
        }
    }
    if (pin) {
        const a = new Set(pin.modules ?? []), b = new Set(pinNow.modules);
        for (const m of b) if (!a.has(m)) put("B11", `module ${m} (not in the pin)`);
        for (const m of a) if (!b.has(m)) put("B11", `module ${m} (pinned, now gone)`);
        for (const d of new Set([...Object.keys(pin.doors ?? {}), ...Object.keys(pinNow.doors)])) {
            const x = new Set(pin.doors?.[d] ?? []), y = new Set(pinNow.doors[d] ?? []);
            for (const n of y) if (!x.has(n)) put("B11", `${d} +${n} (not in the pin)`);
            for (const n of x) if (!y.has(n)) put("B11", `${d} -${n} (pinned, now gone)`);
        }
    }

    // ---- B12 relays: only a door re-exports; no declaration mirror
    for (const e of g.edges) {
        if (!e.to || !e.kind.startsWith("reexport") || !SEALED.includes(zoneOf(e.from)) || doorLike(e.from) || isTest(e.from)) continue;
        put("B12", `${e.from}:${e.line} re-exports ${e.to} (relay)`);
    }
    for (const f of T.files) { const m = /^(.*)\.d\.(m?ts)$/.exec(f); if (m && SEALED.includes(zoneOf(f)) && [".mjs", ".ts", ".js", ".vue"].some((x) => T.isFile(m[1] + x))) put("B12", `${f} (declaration mirror of ${m[1]})`); }

    // ---- B13 bins: a json-command target or a root-config import is imported by nothing but the harness
    const bins = new Set(g.edges.filter((e) => e.to && zoneOf(e.to) === "scripts" && (e.kind === "json-command" || (zoneOf(e.from) === "root" && MODULE_KINDS.has(e.kind)))).map((e) => e.to));
    // a bin's own tests are its members (R-3), not importers
    for (const e of g.edges) if (bins.has(e.to) && MODULE_KINDS.has(e.kind) && zoneOf(e.from) !== "root" && !HARNESS.test(e.from) && !isTest(e.from)) put("B13", `${e.from}:${e.line} imports the bin ${e.to} [${e.kind}]`);

    // ---- B14 door purity: a JS door holds only `export … from`; a CSS door only @import and @layer statements
    const doorsToJudge = new Set([...modules.flatMap((m) => doorFilesOf(m)), ...g.record.doors.filter((d) => T.isFile(d))]);
    for (const d of doorsToJudge) {
        const text = T.read(d) ?? "";
        if (d.endsWith(".css")) {
            let r; try { r = postcss.parse(text); } catch { put("B14", `${d} (unparseable)`); continue; }
            const bad = r.nodes.filter((n) => n.type !== "comment" && !(n.type === "atrule" && (n.name === "import" || (n.name === "layer" && !n.nodes))));
            if (bad.length) put("B14", `${d}:${bad[0].source?.start?.line} holds ${bad.length} non-import node(s), first ${bad[0].type === "rule" ? `rule ${bad[0].selector}` : `@${bad[0].name ?? bad[0].type}`}`);
        } else {
            const sf = ts.createSourceFile(d, text, ts.ScriptTarget.Latest, true);
            const bad = sf.statements.filter((s) => !(ts.isExportDeclaration(s) && s.moduleSpecifier));
            if (bad.length) put("B14", `${d}:${sf.getLineAndCharacterOfPosition(bad[0].getStart()).line + 1} holds ${bad.length} statement(s) that are not \`export … from\`, first ${ts.SyntaxKind[bad[0].kind]}`);
        }
    }

    // ---- B15 names: no numbered or wave/pass segments, no segment equal to its parent, no module named as a kind slot
    for (const d of allDirs) {
        if (!SEALED.includes(zoneOf(`${d}/x`)) || CONTAINERS.has(d) || CONTAINERS.has(dirOf(d)) || !subtreeHasCode.get(d)) continue;
        const seg = posix.basename(d), parent = posix.basename(dirOf(d));
        if (/^part-?\d+$/.test(seg) || /-\d+$/.test(seg) || /^[wp]\d+$/.test(seg)) put("B15", `${d} (placeholder name)`);
        if (seg === parent) put("B15", `${d} (repeats its parent)`);
        if (KIND_SLOTS.has(seg) && !isSlot(d)) put("B15", `${d} (a module named as a kind slot)`);
    }

    const counts = Object.fromEntries(Object.entries(V).map(([k, l]) => [k, l.length]));
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    const meta = { b0, files: T.files.length, edges: g.edges.length, modules: modules.length, required: sealedCodeDirs.length, b10: { anchored, counted: V.B10.length }, b4info: b4info.length, multiDoorSymbols: multi.length, pin: { modules: pinNow.modules.length, doors: Object.keys(pinNow.doors).length, names: Object.values(pinNow.doors).reduce((a, b) => a + b.length, 0) }, slotArm };
    return { total, counts, V, meta, pinNow };
}

const isMain = process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.dirname, "seal.mjs");
if (isMain) {
    const args = process.argv.slice(2);
    const opt = (k, d = null) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
    const root = resolve(opt("--root", resolve(import.meta.dirname, "../..")));
    const r = seal(root, {
        overlay: opt("--overlay") ? JSON.parse(readFileSync(opt("--overlay"), "utf8")) : {},
        slotArm: opt("--slot-arm", "strict"),
        pin: args.includes("--no-pin") ? null : readPin(root),
    });
    for (const [k, list] of Object.entries(r.V)) {
        console.log(`${list.length ? "FAIL" : "PASS"} ${k} ${list.length}`);
        for (const s of args.includes("--verbose") ? list : list.slice(0, 3)) console.log(`   ${s}`);
        if (!args.includes("--verbose") && list.length > 3) console.log(`   … ${list.length - 3} more`);
    }
    console.log(`seal ${JSON.stringify(r.meta)}: ${r.total ? `FAIL (${r.total})` : "PASS"}`);
    if (opt("--write-pin")) writeFileSync(opt("--write-pin"), `${JSON.stringify(r.pinNow, null, 1)}\n`);
    if (opt("--json")) writeFileSync(opt("--json"), JSON.stringify({ counts: r.counts, meta: r.meta, V: r.V }, null, 1));
    process.exitCode = r.total ? 1 : 0;
}
