#!/usr/bin/env node
// rebase.mjs — DERIVE + CHECK (B-S16, tests-visual): the carve's moves the floor engine
// cannot rewrite, as one exact-text row, and the engine's own image and FD-5 checks on it.
//
// The engine (F-2) refuses a move list with residue. On the carve it leaves residue in the
// files whose repo root or evidence dir is a `new URL("<relative>", import.meta.url)` literal
// nested in a call it evaluates as a path (`resolve(fileURLToPath(new URL("..", …)))`), or
// whose writes go through a helper built on such a base (`shot("…")`): the edge has no
// span it can respell. Every such literal is file-relative, so moving the file re-bases it:
// the literal becomes the relative path from the new dir to the same target.
//
//   --split: print which moves carry residue and write the engine list without them
//            (--out-moves), and the row's list (--out-residue): the residue moves and the
//            moves carve.json's `rowMoves` names (the engine's image check refused them).
//   --row:   on the tree after the engine list, derive the row for those moves
//            (--out-row): for a moved file, every edit the engine computes except its write
//            respellings, plus its re-based `new URL` literals; for a file that stays, every
//            engine edit, plus carve.json's `inbound` hunks; nothing else.
//   --check: after the row is applied, judge it as the engine judges its own steps: the new
//            graph must be the old one under the move map (image), with no violation, and
//            every file the row wrote must classify move-only (FD-5, classifyImage).
//   node rebase.mjs --root <tree> --carve carve.json --moves <moves.json> --split --out-moves a.json --out-residue b.json
//   node rebase.mjs --root <tree> --carve carve.json --moves <residue.json> --row --out-row row.json
//   node rebase.mjs --root <tree> --moves <residue.json> --check --base <pre-row copy> --applied row.json
import { createRequire } from "node:module";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, posix, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const STRUCTURE = resolve(HERE, "../../../../..");
const { hunksOf } = await import(pathToFileURL(join(STRUCTURE, "pass-4/B-kit/lib/row.mjs")));
const args = process.argv.slice(2);
const opt = (k) => { const i = args.indexOf(k); return i < 0 ? undefined : args[i + 1]; };
const root = resolve(opt("--root"));
const lib = join(root, "scripts/structure/lib");
// the landed floor's graph: behind its door on the route's tree (S20), at lib/graph.mjs at HEAD
const GRAPH_AT = ["index.mjs", "graph.mjs"].filter((f) => existsSync(join(lib, f)));
if (!GRAPH_AT.length) throw new Error(`rebase: no floor graph under ${lib}`);
const { buildGraph } = await import(pathToFileURL(join(lib, GRAPH_AT[0])));
const { computeEdits, applyEdits, planMoves } = await import(pathToFileURL(join(lib, "move.mjs")));
const { classifyImage } = await import(pathToFileURL(join(lib, "classify.mjs")));
const { kindClass } = await import(pathToFileURL(join(lib, "plan.mjs")));
const req = createRequire(join(root, "package.json"));
const deps = { ts: req("typescript"), postcss: req("postcss"), sfc: req("@vue/compiler-sfc") };
const ts = deps.ts;
const list = JSON.parse(readFileSync(resolve(opt("--moves")), "utf8"));
const carve = opt("--carve") ? JSON.parse(readFileSync(resolve(opt("--carve")), "utf8")) : { rowMoves: { files: [] }, inbound: [] };

// the engine's move map, over plain file moves (the carve moves files, never dirs)
const mapOf = (tree, moves) => {
    const plan = planMoves(tree, moves);
    if (plan.errors.length) throw new Error(`plan: ${JSON.stringify(plan.errors.slice(0, 3))}`);
    const fileMap = new Map(plan.pending.map((m) => [m.from, m.to]));
    const file = (p) => fileMap.get(p) ?? p;
    return { plan, fileMap, dirMap: new Map(), file, dir: (p) => p, any: (p) => (p === null ? null : file(p)) };
};

if (args.includes("--split")) {
    const g0 = buildGraph(root, { deps });
    const M = mapOf(g0.tree, list.moves);
    const { residue } = computeEdits(g0, M, deps);
    const hit = new Set(residue.map((r) => r.edge.from));
    for (const r of residue) if (!M.fileMap.has(r.edge.from)) throw new Error(`residue in an unmoved file: ${JSON.stringify(r)}`);
    for (const f of carve.rowMoves.files) {
        const m = list.moves.find((x) => posix.basename(x.from) === f);
        if (!m) throw new Error(`rowMoves names ${f}, which the move list does not move`);
        hit.add(m.from);
    }
    const engine = list.moves.filter((m) => !hit.has(m.from));
    const rest = list.moves.filter((m) => hit.has(m.from));
    const byKind = {};
    for (const r of residue) { const k = `${r.kind} ${r.edge.kind}`; byKind[k] = (byKind[k] ?? 0) + 1; }
    console.log(`residue: ${residue.length} edges in ${hit.size} files ${JSON.stringify(byKind)}; engine list ${engine.length} moves, row ${rest.length} moves`);
    writeFileSync(resolve(opt("--out-moves")), `${JSON.stringify({ ...list, moves: engine }, null, 1)}\n`);
    writeFileSync(resolve(opt("--out-residue")), `${JSON.stringify({ why: `${list.why} These moves carry edges the engine cannot respell, or respells wrong (rebase.mjs); they land as one exact-text row.`, moves: rest, residue: residue.map((r) => ({ kind: r.kind, from: r.edge.from, line: r.edge.line, edge: r.edge.kind, spec: r.edge.spec })) }, null, 1)}\n`);
    process.exit(0);
}

/** Every `new URL("<relative>", import.meta.url)` literal in a file, re-based to newDir. */
function urlRebases(file, text, newDir) {
    const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
    const out = [];
    const oldDir = posix.dirname(file);
    const v = (x) => {
        if (ts.isNewExpression(x) && x.expression.getText(sf) === "URL" && x.arguments?.length === 2) {
            const [a, b] = x.arguments;
            if (ts.isStringLiteralLike(a) && a.text.startsWith(".") && b.getText(sf) === "import.meta.url") {
                const target = posix.normalize(posix.join(oldDir, a.text));
                let rel = posix.relative(newDir, target) || ".";
                if (a.text.startsWith("./") && !rel.startsWith("..")) rel = `./${rel}`;
                if (a.text.endsWith("/") && !rel.endsWith("/")) rel += "/";
                if (rel !== a.text) out.push({ start: a.getStart(sf) + 1, end: a.end - 1, text: rel, why: `new URL ${a.text} -> ${rel}` });
            }
        }
        ts.forEachChild(x, v);
    };
    v(sf);
    return out;
}

if (args.includes("--row")) {
    const g0 = buildGraph(root, { deps });
    const M = mapOf(g0.tree, list.moves);
    const { edits, residue } = computeEdits(g0, M, deps);
    const row = { step: list.why, files: {}, reasons: [] };
    const touched = new Set([...edits.keys(), ...M.fileMap.keys(), ...carve.inbound.map((h) => h.file)]);
    let rebased = 0;
    for (const f of [...touched].sort()) {
        const text = readFileSync(join(root, f), "utf8");
        let mine = [...(edits.get(f) ?? [])];
        // an authored inbound hunk replaces whatever the engine would write inside it
        for (const h of carve.inbound.filter((x) => x.file === f)) {
            const at = text.indexOf(h.from);
            if (at < 0 || text.indexOf(h.from, at + 1) >= 0) throw new Error(`${f}: inbound hunk does not match once`);
            mine = mine.filter((x) => x.end <= at || x.start >= at + h.from.length);
        }
        if (M.fileMap.has(f)) {
            mine = mine.filter((x) => x.kind !== "write");
            const urls = urlRebases(f, text, posix.dirname(M.file(f)));
            const inUrl = (x) => urls.some((r) => x.start < r.end && r.start < x.end);
            mine = [...mine.filter((x) => !inUrl(x)), ...urls];
            rebased += urls.length;
        }
        let next = mine.length ? applyEdits(text, mine) : text;
        for (const h of carve.inbound.filter((x) => x.file === f)) {
            if (next.split(h.from).length - 1 !== 1) throw new Error(`${f}: inbound hunk does not match once after the engine's edits`);
            next = next.replace(h.from, () => h.to);
        }
        if (M.fileMap.has(f)) {
            row.files[f] = { remove: true, before: text };
            row.files[M.file(f)] = { create: next };
            row.reasons.push({ file: M.file(f), why: list.moves.find((m) => m.from === f).why });
        } else if (next !== text) {
            row.files[f] = { hunks: hunksOf(text, next) };
            row.reasons.push({ file: f, why: carve.inbound.find((h) => h.file === f)?.why ?? "re-points a reference to a carved file" });
        }
    }
    console.log(`row: ${M.fileMap.size} moves, ${Object.keys(row.files).length} files, ${[...edits.values()].reduce((a, l) => a + l.length, 0)} engine edits, ${rebased} re-based new URL literals, ${residue.length} residue edges the literals must carry`);
    writeFileSync(resolve(opt("--out-row")), `${JSON.stringify(row, null, 1)}\n`);
    process.exit(0);
}

if (args.includes("--check")) {
    // g0 from the pre-row snapshot (a copy of the tree before the row), g1 from the tree now
    const base = resolve(opt("--base"));
    const g0 = buildGraph(base, { deps });
    const g1 = buildGraph(root, { deps });
    const M = mapOf(g0.tree, list.moves);
    const sig = (e, map) => {
        const from = map ? map.file(e.from) : e.from;
        const to = e.to ? (map ? map.any(e.to) : e.to) : e.output ?? e.generated ?? "-";
        return `${from}|${kindClass(e.kind)}|${to}|${e.dir ? "d" : "f"}|${e.plane ?? "source"}`;
    };
    const want = new Map(), got = new Map();
    for (const e of g0.edges) { const k = sig(e, M); want.set(k, (want.get(k) ?? 0) + 1); }
    for (const e of g1.edges) { const k = sig(e, null); got.set(k, (got.get(k) ?? 0) + 1); }
    const lost = [...want].filter(([k, n]) => (got.get(k) ?? 0) < n).map(([k]) => k);
    const gained = [...got].filter(([k, n]) => (want.get(k) ?? 0) < n).map(([k]) => k);
    // the files the row wrote, as they were: every removal and every edited file
    const row = JSON.parse(readFileSync(resolve(opt("--applied")), "utf8"));
    const original = new Map();
    for (const [f, op] of Object.entries(row.files)) if (op.remove || op.hunks) original.set(f, readFileSync(join(base, f)));
    const cls = classifyImage(g0, g1, M, original, root);
    // FD-5 cannot mask a literal its graph could not respell (the residue this row exists
    // for), so a file it leaves unclassified is judged again with every file-relative
    // literal (a relative module specifier, a relative `new URL(…, import.meta.url)`) read
    // as the repo path it resolves to: equal texts are move-only. A file that differs only by
    // an authored inbound hunk is "authored" with that hunk's reason.
    const resolved = (file, text) => {
        const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
        const spans = [];
        const at = (lit) => spans.push({ start: lit.getStart(sf), end: lit.end, text: `"@${posix.normalize(posix.join(posix.dirname(file), lit.text))}"` });
        const v = (x) => {
            if ((ts.isImportDeclaration(x) || ts.isExportDeclaration(x)) && x.moduleSpecifier && ts.isStringLiteral(x.moduleSpecifier) && x.moduleSpecifier.text.startsWith(".")) at(x.moduleSpecifier);
            if (ts.isCallExpression(x) && x.expression.kind === ts.SyntaxKind.ImportKeyword && x.arguments[0] && ts.isStringLiteralLike(x.arguments[0]) && x.arguments[0].text.startsWith(".")) at(x.arguments[0]);
            if (ts.isImportTypeNode?.(x) && ts.isLiteralTypeNode(x.argument) && ts.isStringLiteral(x.argument.literal) && x.argument.literal.text.startsWith(".")) at(x.argument.literal);
            if (ts.isNewExpression(x) && x.expression.getText(sf) === "URL" && x.arguments?.length === 2 && ts.isStringLiteralLike(x.arguments[0]) && x.arguments[0].text.startsWith(".") && x.arguments[1].getText(sf) === "import.meta.url") at(x.arguments[0]);
            ts.forEachChild(x, v);
        };
        v(sf);
        return applyEdits(text, spans);
    };
    for (const r of cls.rows) {
        if (r.class !== "unclassified") continue;
        const f0 = r.from ?? r.file;
        const t0 = original.get(f0).toString("utf8"), t1 = readFileSync(join(root, r.file), "utf8");
        const hunks = carve.inbound.filter((h) => h.file === f0);
        if (hunks.length && hunks.reduce((t, h) => t.replace(h.from, () => h.to), t0) === t1) { r.class = "authored"; r.why = hunks.map((h) => h.why).join("; "); continue; }
        if (/\.(m?[jt]s)$/.test(r.file) && resolved(f0, t0) === resolved(r.file, t1)) { r.class = "move-only"; r.why = "equal with every file-relative literal read as the path it resolves to"; }
    }
    cls.counts = {};
    for (const r of cls.rows) cls.counts[r.class] = (cls.counts[r.class] ?? 0) + 1;
    cls.failed = cls.rows.filter((r) => r.class === "unclassified").length;
    console.log(JSON.stringify({ edgesBefore: g0.edges.length, edgesAfter: g1.edges.length, lost: lost.length, gained: gained.length, violations: g1.violations.length, classified: cls.counts, unclassified: cls.rows.filter((r) => r.class === "unclassified") }, null, 1));
    for (const k of lost.slice(0, 20)) console.log(`LOST ${k}`);
    for (const k of gained.slice(0, 20)) console.log(`GAINED ${k}`);
    for (const v of g1.violations.slice(0, 20)) console.log(`VIOLATION ${v.kind} ${v.from}:${v.line ?? ""} ${v.spec}`);
    process.exit(lost.length || gained.length || g1.violations.length || cls.failed ? 1 : 0);
}
