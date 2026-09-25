#!/usr/bin/env node
// probes.mjs: critique-G run 2's measurements over one tree, read with the tree's own
// floor (T/scripts/structure/lib after fd11 lands, else the checkout's docs floor).
//   node probes.mjs --tree T [--floor F] [--snapshot out.json] [--base base.json] [--moves m1.json,m2.json] [--out O.json]
// --snapshot writes the numbers a later run compares against (the SCC pairs by R-2 unit).
// --base + --moves: added co-cyclic pairs = pairs on T not present on the base once the
// base's unit names are mapped through the moves (a dir that moved whole maps to its new dir).
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, posix, resolve } from "node:path";

const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const T = resolve(opt("--tree"));
const F = resolve(opt("--floor") ?? (existsSync(join(T, "scripts/structure/lib/graph.mjs")) ? join(T, "scripts/structure") : join(import.meta.dirname, "../../../../floor")));
const G = await import(join(F, "lib/graph.mjs"));
const P = await import(join(F, "lib/placement.mjs"));
const S = await import(join(F, "lib/symbols.mjs"));
const g = G.buildGraph(T);
const tree = g.tree;
const out = { tree: T, floor: F };

// ---- scc (S-05, G-12): static module SCCs under the floor's R-2 unit
const units = P.dirUnits();
const sccs = G.moduleSccs(g, { moduleOf: units.unitOf, zones: ["src", "demo"], kinds: "static" });
const pairsOf = (list) => { const s = []; for (const c of list) for (let i = 0; i < c.length; i++) for (let j = i + 1; j < c.length; j++) s.push([c[i], c[j]]); return s; };
const isNest = ([a, b]) => a.startsWith(b + "/") || b.startsWith(a + "/");
const pairs = pairsOf(sccs);
out.scc = { sccs: sccs.length, members: sccs.reduce((n, c) => n + c.length, 0), sizes: sccs.map((c) => c.length), pairs: pairs.length, nestingPairs: pairs.filter(isNest).length };
if (opt("--snapshot")) writeFileSync(opt("--snapshot"), JSON.stringify({ tree: T, scc: out.scc, pairs, sccList: sccs }, null, 1));
if (opt("--base")) {
    const base = JSON.parse(readFileSync(opt("--base"), "utf8"));
    const fileMap = new Map();
    for (const m of (opt("--moves") ?? "").split(",").filter(Boolean)) {
        const j = JSON.parse(readFileSync(m, "utf8"));
        for (const x of j.moves ?? j) if (x.from && x.to) fileMap.set(x.from, x.to);
    }
    // a base unit maps to the unit its files went to, when all of them went to one unit
    const baseUnitFiles = new Map();
    for (const f of [...fileMap.keys()]) { const u = units.unitOf(f); if (!baseUnitFiles.has(u)) baseUnitFiles.set(u, new Set()); baseUnitFiles.get(u).add(units.unitOf(fileMap.get(f))); }
    const mapUnit = (u) => (baseUnitFiles.has(u) && baseUnitFiles.get(u).size === 1 ? [...baseUnitFiles.get(u)][0] : u);
    const key = ([a, b]) => [a, b].sort().join("\u0000");
    const p0 = new Set(base.pairs.map(([a, b]) => key([mapUnit(a), mapUnit(b)])));
    const added = pairs.filter((p) => !p0.has(key(p)));
    out.sccVsBase = { baseMembers: base.scc.members, baseSccs: base.scc.sccs, members: out.scc.members, sccs: out.scc.sccs, addedPairs: added.length, addedNesting: added.filter(isNest).length, addedOther: added.filter((p) => !isNest(p)).length, firstAddedOther: added.filter((p) => !isNest(p)).slice(0, 12), firstAddedNesting: added.filter(isNest).slice(0, 12) };
}

// ---- depth (G-12)
const srcDirs = [...tree.dirs].filter((d) => d.startsWith("src/components/"));
const depthOf = (d) => d.split("/").length - 2; // src/components/<x> = 1
const maxDepth = Math.max(...srcDirs.map(depthOf));
out.depth = { max: maxDepth, deepest: srcDirs.filter((d) => depthOf(d) === maxDepth).slice(0, 5), atLeast6: srcDirs.filter((d) => depthOf(d) >= 6).length };

// ---- placement (S-04, E1)
const anchor = P.publicationAnchor ? P.publicationAnchor(g) : null;
const rows = P.placeAll(g, units, { zones: ["src"], anchor }).rows;
out.placement = { hasAnchorParam: !!P.publicationAnchor, byClass: G.countBy(rows, "class"), moveOrGlobal: rows.filter((r) => r.class === "move" || r.class === "global").map((r) => `${r.file} → ${r.home} (${r.class})`) };

// ---- entries: record, dual doors (R-6), kernel re-exports outside the global zone (P3-R1(a))
const recordFile = [join(F, "records/entry-record.json")].find(existsSync);
const record = JSON.parse(readFileSync(recordFile, "utf8"));
const O = S.makeOrigins(g);
const inGlobal = (f) => P.GLOBAL_ZONES.some((z) => f === z || f.startsWith(z + "/"));
const pub = new Map(); // "origin#name" -> entries
const kernelOutside = [];
for (const [name, source] of record.js) {
    if (name === "index") continue;
    let table;
    try { table = O.exportsOf(source); } catch { continue; }
    for (const [sym, origins] of table) for (const o of origins) {
        const k = `${o.file}#${o.name}`;
        if (!pub.has(k)) pub.set(k, new Set());
        pub.get(k).add(name);
        if (inGlobal(source) && !inGlobal(o.file) && o.file.startsWith("src/")) kernelOutside.push(`${name}: ${sym} ← ${o.file}`);
    }
}
const dual = [...pub].filter(([, s]) => s.size > 1).map(([k, s]) => `${k} on ${[...s].join(",")}`);
out.entries = { js: record.js.length, css: record.css.length, doors: record.doors.length, cssWithoutDist: record.css.filter(([, t]) => t.source && !t.dist).map(([k]) => k), hasAuroraConfig: record.js.some(([n]) => n === "aurora-config"), dualDoor: dual.length, dualDoorFirst: dual.slice(0, 10), kernelReexportOutside: kernelOutside.length, kernelReexportOutsideFirst: [...new Set(kernelOutside)].slice(0, 10) };

// ---- self-name (S-06), B8 kernel reads a unit, demo past a door (R-10)
const MOD = /^(import|import-type|import-side-effect|import-type-node|reexport|reexport-star|reexport-ns|dynamic|require|vi-mock|sfc-script-src)$/;
const doorsAndEntries = new Set([...record.js.map(([, s]) => s), ...record.doors, ...record.css.map(([, t]) => t.source).filter(Boolean)]);
const inComponentUnit = (f) => f.startsWith("src/components/") && !f.startsWith("src/components/_shared/") && f.split("/").length > 3;
out.selfNameInSrc = g.violations.filter((v) => v.kind === "self-name-in-src").length;
out.kernelReadsUnit = g.edges.filter((e) => MOD.test(e.kind) && e.to && inGlobal(e.from) && inComponentUnit(e.to)).map((e) => `${e.from} → ${e.to}${e.typeOnly ? " (type)" : ""}`);
out.demoPastDoor = g.edges.filter((e) => MOD.test(e.kind) && e.to && e.from.startsWith("demo/") && e.to.startsWith("src/") && !doorsAndEntries.has(e.to)).map((e) => `${e.from} → ${e.to}`);
out.counts = { kernelReadsUnit: out.kernelReadsUnit.length, demoPastDoor: out.demoPastDoor.length, violations: g.violations.length };

// ---- names (G-03, G-05)
const dirsAll = [...tree.dirs];
const has = (re) => dirsAll.filter((d) => re.test(d));
out.names = {
    detents: has(/(^|\/)detents$/),
    renderer: has(/(^|\/)renderer$/),
    auroraConfig: has(/aurora\/config$/),
    shaderStemDirs: has(/(^|\/)[\w-]+-(frag|vert|glsl|wgsl)$/),
    placeholderDirs: has(/(^|\/)(utils?|helpers?|misc|common|stuff|v\d+|shared|lib)$/).filter((d) => !/^scripts\/lib$|^src\/components\/_shared$/.test(d)),
    placeholderFiles: tree.files.filter((f) => /^(src|demo|scripts)\//.test(f) && /(^|\/)(utils?|helpers?|misc|common|stuff)\.(ts|mjs|js|vue)$/.test(f)),
};

// ---- bounds (G-10, G-11: R-5 strict with P3-R3)
const direct = new Map();
const long = [];
for (const f of tree.files) {
    if (!["src", "demo", "scripts", "tests", "tests-visual"].includes(f.split("/")[0])) continue;
    const d = posix.dirname(f);
    direct.set(d, (direct.get(d) ?? 0) + 1);
    if (!/\.(ts|mts|js|mjs|vue|css)$/.test(f)) continue;
    const text = tree.read(f);
    const n = text.split("\n").length - (text.endsWith("\n") ? 1 : 0);
    if (n > 500 && !/^[^\n]*(@generated|GENERATED|do not edit)/i.test(text.slice(0, 400))) long.push(`${n} ${f}`);
}
const over = [...direct].filter(([, n]) => n > 12).sort((a, b) => b[1] - a[1]).map(([d, n]) => `${n} ${d}`);
const named = (d) => direct.get(d) ?? 0;
out.bounds = { dirsOver: over.length, dirsOverList: over, filesOver: long.length, filesOverList: long.sort().slice(0, 40), peer: { menu: named(dirsAll.find((d) => /components\/menu$/.test(d)) ?? ""), stylesGlass: named("src/styles/glass"), stylesTokens: named("src/styles/tokens"), testsVisual: named("tests-visual") } };

// ---- scripts (G-06): top-level scripts files that are not bins (no json-command / yaml edge reaches them)
const bins = new Set(g.edges.filter((e) => /^(json-command|yaml-command|yaml-npm-script|sh-ref)$/.test(e.kind) && e.to?.startsWith("scripts/")).map((e) => e.to));
const topScripts = tree.files.filter((f) => /^scripts\/[^/]+\.(mjs|js|ts|sh|cjs)$/.test(f));
out.scripts = { top: topScripts.length, topNonBin: topScripts.filter((f) => !bins.has(f)), subdirs: [...new Set(tree.files.filter((f) => /^scripts\/[^/]+\//.test(f)).map((f) => f.split("/")[1]))] };

// ---- accent-tone (G-07, P3-R2)
out.accentTone = tree.files.filter((f) => f.endsWith("/accent-tone.css"));
out.accentToneReaders = g.edges.filter((e) => out.accentTone.includes(e.to)).map((e) => `${e.from} [${e.kind}]`);

// ---- census (S-07): overlay three computed-read forms
{
    const probe = "tests/zz-crit-census.test.ts";
    const text = `import { join, resolve } from "node:path";\nimport { readFileSync } from "node:fs";\nconst n = String(Date.now());\nreadFileSync(join(process.cwd(), "src/components/" + n));\nreadFileSync(\`src/components/\${n}/x.ts\`);\nreadFileSync(resolve(import.meta.dirname, "..", "src", n));\n`;
    const g2 = G.buildGraph(T, { overlay: { [probe]: text } });
    const rowsC = g2.census.filter((c) => (c.file ?? c.from) === probe);
    out.census = { rows: rowsC.length, kinds: rowsC.map((c) => `${c.kind ?? c.class ?? "?"}@${c.base ?? "-"}`) };
}

// ---- eponymyLiteral (G-01): my reading of E3 from SPECS-v2 §4.3/§4.5, over component units
{
    const norm = (s) => s.toLowerCase().replace(/[-_]/g, "");
    const stemOf = (f) => {
        let b = posix.basename(f);
        let shader = "";
        const m = b.match(/\.(frag|vert|glsl|wgsl)\.(ts|js)$/);
        if (m) { shader = "-" + m[1]; b = b.slice(0, -m[0].length); }
        else b = b.replace(/\.(vue|ts|mts|mjs|js|css)$/, "");
        return b + shader;
    };
    const rootName = (f, unitName) => {
        let s = stemOf(f);
        if (s === "index") return posix.basename(posix.dirname(f));
        s = s.replace(/^use(?=[A-Z])/, "");
        const kebab = s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
        const toks = kebab.split("-");
        if (unitName && toks.length > 1 && norm(toks[0]) === norm(unitName)) return toks.slice(1).join("-");
        return kebab;
    };
    const fails = [];
    const compDirs = [...tree.dirs].filter((d) => d.startsWith("src/components/") && d.split("/").length >= 4 && !P.isSlot(d) && !d.includes("/__tests__"));
    for (const d of compDirs) {
        if (d.split("/").some((seg, i, a) => i > 2 && P.KIND_SLOTS.has(seg) && P.isSlot(a.slice(0, i + 1).join("/")))) continue;
        const files = tree.files.filter((f) => posix.dirname(f) === d);
        if (!files.length) continue;
        const parentName = posix.basename(posix.dirname(d));
        const dn = posix.basename(d);
        const ok = files.some((f) => /\/index\.[a-z]+$/.test(f)) || files.some((f) => norm(rootName(f, parentName)) === norm(dn) || norm(rootName(f, null)) === norm(dn));
        if (!ok) fails.push(d);
    }
    out.eponymyLiteral = { dirs: compDirs.length, fail: fails.length, failList: fails.slice(0, 40) };
}

const o = opt("--out");
if (o) writeFileSync(o, JSON.stringify(out, null, 1));
const brief = { ...out };
for (const k of ["kernelReadsUnit", "demoPastDoor"]) brief[k] = out[k].slice(0, 8);
console.log(JSON.stringify(brief, null, 1));
