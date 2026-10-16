#!/usr/bin/env node
// split.mjs — DERIVE (B-S11, tests zone): split a test file over R-5's 500 lines into a named
// module, from an authored spec (`splits.json` beside this file), computed on the tree it runs
// on. The spec names blocks by their titles, never by line or text, so the route's earlier
// edits to these files (S6, S8, S16, S20, S29, S33, S34, the engine's specifier rewrites) do
// not stale it. One spec entry is
//   { source, dir, why, shared?, sharedWhy?, within?, share?, shareAll?, copy?,
//     parts: [{ file, why, blocks: [title prefix…] }] }
// and the split is:
//   - every test block (a top-level `describe`/`it`/`test` call, or with `within` the children
//     of the one top-level describe it names) goes to the one part whose `blocks` names it by
//     title prefix. A block no part names, or two parts name, stops the run: no test is dropped
//     or run twice;
//   - a top-level hook (`beforeAll`, `afterEach`, `vi.mock`, …) goes to every part, as it
//     covered every block in the source file; with `within`, the outer describe's own hooks
//     are copied the same way and each part re-opens the outer describe under its title;
//   - a declaration the parts read goes to the one part that reads it, or to `shared` (the
//     module's helper, every declaration exported) when two parts or a shared declaration read
//     it; a statement that declares nothing (a module-level walk, a loop that fills a table)
//     runs in `shared`, with everything it reads;
//   - imports are recomputed per file from the bindings it reads; a relative specifier and a
//     `resolve(__dirname, "<rel>")` literal are re-based on the new directory;
//   - the helper opens with the spec's `sharedWhy`, then the source's header comment (the
//     gate's account); with no helper the header heads the first part; each part opens with
//     its own `why`;
//   - `share` names declarations that go to `shared` though one part reads them (data a part
//     would otherwise carry over the bound); `shareAll` sends every declaration there (a file
//     whose one block cannot split); `copy` names a one-line declaration each reading part
//     carries itself (the helper too, unexported), where a helper module for it alone would
//     cost more than the line, or where the floor's graph must read the part's path
//     expressions against a local root as it did in the source;
//   - the spec's `citations` rewrite the text that cites a split source by path or file name,
//     to the file or module that now holds the cited arm. A citation is found by its text, in
//     every file git lists outside the spec's `records` (docs/, and the release records, are
//     never rewritten), because the route moves the citing files before this step; `at` is
//     where each site sat at HEAD, and the number of files holding the text must equal its
//     length, each once. A citation inside a split source is applied before the split. A
//     citation in a shipped file (`src/`, test slots aside) goes to a second row,
//     `--out-shipped`, because a comment can ship and move the bundle ratchet (P4-R3: a step
//     that moves it lands its own datum row);
//   - the floor's opaque ledger follows its entries into the outputs (below, --ledger).
// It refuses before any write when an output is over 500 lines, a block is unassigned or
// doubly assigned, a declaration is read by no output, or an output path exists.
//   node split.mjs --root <tree> --spec <splits.json> [--only <source>…] [--ledger <landed ledger>]
//                  [--apply] [--out <row.json>] [--out-shipped <row.json>]
// Without --apply it prints the plan. --out writes one row in B's row shape (lib/row.mjs:
// `create` / `remove`+`before` / exact-text `hunks`), the row the route seat lands through
// its row writer; --apply is this seat's own verification writer and parses nothing (P5-F4's
// parse check belongs to the writer that lands the row).
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { existsSync, mkdirSync, readFileSync, rmdirSync, readdirSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join, posix, resolve } from "node:path";

const args = process.argv.slice(2);
const opt = (k) => { const i = args.indexOf(k); return i < 0 ? undefined : args[i + 1]; };
const root = resolve(opt("--root") ?? ".");
const specPath = resolve(opt("--spec"));
const only = args.flatMap((a, i) => (args[i - 1] === "--only" ? [a] : []));
const apply = args.includes("--apply");
const out = opt("--out");
const outShipped = opt("--out-shipped");
const ledger = opt("--ledger");
const LANDED_LEDGER = "scripts/structure/records/opaque-ledger.json";
const ts = createRequire(join(root, "package.json"))("typescript");
const MAX = 500;

const spec = JSON.parse(readFileSync(specPath, "utf8"));
const listed = execFileSync("git", ["-C", root, "ls-files", "-co", "--exclude-standard", "-z"], { encoding: "utf8", maxBuffer: 1 << 28 })
    .split("\0").filter((f) => f && !(spec.records ?? []).some((r) => f === r || f.startsWith(r)) && !f.includes("node_modules"))
    .filter((f) => existsSync(join(root, f)));
const siteCache = new Map();
/** The files holding a citation's text, found by text; their count must equal `at`'s. */
function sitesOf(c) {
    if (siteCache.has(c)) return siteCache.get(c);
    const hits = listed.filter((f) => { try { return readFileSync(join(root, f), "utf8").includes(c.from); } catch (e) { if (e.code === "EISDIR") return false; throw e; } });
    if (hits.length !== c.at.length) throw new Error(`citation ${JSON.stringify(c.from.slice(0, 60))}: ${hits.length} file(s) hold it (${hits.join(", ")}), HEAD had ${c.at.length} (${c.at.join(", ")})`);
    siteCache.set(c, hits);
    return hits;
}
const entries = spec.splits.filter((s) => !only.length || only.includes(s.source));
if (only.length && entries.length !== only.length) throw new Error(`--only names a source the spec does not hold`);

const TEST_CALLS = new Set(["describe", "it", "test"]);
const HOOK_CALLS = new Set(["beforeAll", "afterAll", "beforeEach", "afterEach"]);
const callee = (s) => {
    if (!ts.isExpressionStatement(s) || !ts.isCallExpression(s.expression)) return null;
    let e = s.expression.expression;
    while (ts.isCallExpression(e)) e = e.expression; // describe.each(...)(...)
    const parts = [];
    while (ts.isPropertyAccessExpression(e)) { parts.unshift(e.name.text); e = e.expression; }
    if (ts.isIdentifier(e)) parts.unshift(e.text);
    return parts;
};
const kindOf = (s) => {
    const c = callee(s);
    if (!c) return "decl";
    if (TEST_CALLS.has(c[0])) return "block";
    if (HOOK_CALLS.has(c[0]) || (c[0] === "vi" && c[1] === "mock")) return "hook";
    return "decl";
};
const titleOf = (s) => {
    const a = s.expression.arguments[0];
    if (!a) return "";
    if (ts.isStringLiteralLike(a)) return a.text;
    return a.getText();
};
const countTests = (node) => {
    let n = 0;
    const v = (x) => {
        if (ts.isCallExpression(x)) {
            let e = x.expression;
            while (ts.isPropertyAccessExpression(e)) e = e.expression;
            if (ts.isIdentifier(e) && (e.text === "it" || e.text === "test")) n++;
        }
        ts.forEachChild(x, v);
    };
    v(node);
    return n;
};

/** Names a statement declares at module level. */
function declared(s) {
    if (ts.isVariableStatement(s)) {
        const names = [];
        const bind = (n) => {
            if (ts.isIdentifier(n)) names.push(n.text);
            else for (const el of n.elements ?? []) if (!ts.isOmittedExpression(el)) bind(el.name);
        };
        for (const d of s.declarationList.declarations) bind(d.name);
        return names;
    }
    if ((ts.isFunctionDeclaration(s) || ts.isClassDeclaration(s) || ts.isInterfaceDeclaration(s) || ts.isTypeAliasDeclaration(s) || ts.isEnumDeclaration(s)) && s.name) return [s.name.text];
    return [];
}
const isTypeOnly = (s) => ts.isInterfaceDeclaration(s) || ts.isTypeAliasDeclaration(s);

/** Identifiers a node reads (property names, declaration names of members and import clauses left out). */
function reads(node) {
    const out = new Set();
    const v = (x) => {
        if (ts.isIdentifier(x)) {
            const p = x.parent;
            const isName =
                (ts.isPropertyAccessExpression(p) && p.name === x) ||
                (ts.isPropertyAssignment(p) && p.name === x) ||
                (ts.isQualifiedName(p) && p.right === x) ||
                ((ts.isPropertySignature(p) || ts.isMethodSignature(p) || ts.isPropertyDeclaration(p) || ts.isMethodDeclaration(p) || ts.isGetAccessor(p) || ts.isSetAccessor(p) || ts.isEnumMember(p)) && p.name === x) ||
                (ts.isBindingElement(p) && p.propertyName === x) ||
                ts.isImportSpecifier(p) || ts.isExportSpecifier(p) || ts.isImportClause(p) || ts.isNamespaceImport(p) ||
                (ts.isLabeledStatement(p) && p.label === x) ||
                (ts.isJsxAttribute?.(p) && p.name === x);
            if (!isName) out.add(x.text);
        }
        ts.forEachChild(x, v);
    };
    v(node);
    return out;
}

const rel = (fromDir, toAbs) => {
    let r = posix.relative(fromDir, toAbs);
    if (!r.startsWith(".")) r = `./${r}`;
    return r;
};
const lines = (t) => t.replace(/\n$/, "").split("\n").length;

function plan(entry) {
    const src = entry.source;
    const abs = join(root, src);
    if (!existsSync(abs)) throw new Error(`${src}: absent from the tree`);
    const text0 = readFileSync(abs, "utf8");
    let cited = text0;
    for (const c of spec.citations ?? []) if (sitesOf(c).includes(src) && [].concat(c.for).every((f) => entries.some((e) => e.source === f))) {
        const n = cited.split(c.from).length - 1;
        if (n < 1) throw new Error(`${src}: citation ${JSON.stringify(c.from)} has no match`);
        cited = cited.split(c.from).join(c.to);
    }
    const oldDir = posix.dirname(src);
    const newDir = entry.dir;

    // re-base `__dirname`-relative literals first (the only path-relative code the zone holds
    // besides import specifiers; `import.meta.url` refuses, it has no case here)
    let text = cited;
    {
        const sf = ts.createSourceFile(src, text, ts.ScriptTarget.Latest, true);
        const edits = [];
        const v = (x) => {
            if (ts.isMetaProperty(x)) throw new Error(`${src}: import.meta reads its own location; no rebase is authored for it`);
            if (ts.isCallExpression(x)) x.arguments.forEach((a, i) => {
                const b = x.arguments[i + 1];
                if (ts.isIdentifier(a) && a.text === "__dirname" && b && ts.isStringLiteral(b) && b.text.startsWith(".")) {
                    const target = posix.normalize(posix.join(oldDir, b.text));
                    edits.push([b.getStart() + 1, b.end - 1, posix.relative(newDir, target) || "."]);
                }
            });
            ts.forEachChild(x, v);
        };
        v(sf);
        for (const [a, b, t] of edits.sort((p, q) => q[0] - p[0])) text = text.slice(0, a) + t + text.slice(b);
    }

    const sf = ts.createSourceFile(src, text, ts.ScriptTarget.Latest, true);
    const stmts = [...sf.statements];
    const first = stmts[0];
    const header = text.slice(0, first.getStart()).replace(/\s+$/, "");
    // a statement's text carries its leading comments and at most one blank line before them
    const trimLead = (t) => t.replace(/^[ \t]*\n/, "").replace(/^(?:[ \t]*\n)+/, "\n");
    const chunk = (s, i) => (i === 0 ? text.slice(s.getStart(), s.end) : trimLead(text.slice(stmts[i - 1].end, s.end)));
    const tail = text.slice(stmts[stmts.length - 1].end).trim();
    if (tail) throw new Error(`${src}: trailing text after the last statement is not placed`);

    const imports = [], decls = [], hooks = [], blocks = [];
    stmts.forEach((s, i) => {
        const c = { node: s, text: chunk(s, i), index: i };
        if (ts.isImportDeclaration(s)) imports.push(c);
        else {
            const k = kindOf(s);
            (k === "block" ? blocks : k === "hook" ? hooks : decls).push(c);
        }
    });

    // `within`: the parts split the children of one top-level describe
    let outer = null;
    let units = blocks.map((b) => ({ ...b, title: titleOf(b.node), tests: countTests(b.node) }));
    let innerHooks = [];
    if (entry.within) {
        const hit = blocks.filter((b) => titleOf(b.node).startsWith(entry.within));
        if (hit.length !== 1 || blocks.length !== 1) throw new Error(`${src}: within "${entry.within}" must name the file's one top-level block`);
        outer = hit[0];
        const fn = outer.node.expression.arguments[1];
        if (!fn || !(ts.isArrowFunction(fn) || ts.isFunctionExpression(fn)) || !ts.isBlock(fn.body)) throw new Error(`${src}: the outer describe has no block body`);
        const body = fn.body.statements;
        const bchunk = (s, i) => trimLead(i === 0 ? text.slice(fn.body.getStart() + 1, s.end) : text.slice(body[i - 1].end, s.end));
        units = [];
        body.forEach((s, i) => {
            const k = kindOf(s);
            const c = { node: s, text: bchunk(s, i), title: k === "block" ? titleOf(s) : null, tests: countTests(s) };
            if (k === "block") units.push(c);
            else if (k === "hook") innerHooks.push(c);
            else throw new Error(`${src}: the outer describe holds a statement that is neither a block nor a hook (${text.slice(s.getStart(), s.getStart() + 60)})`);
        });
        outer.open = text.slice(outer.node.getStart(), fn.body.getStart() + 1);
        outer.lead = outer.text.slice(0, outer.text.length - text.slice(outer.node.getStart(), outer.node.end).length).replace(/^\s*\n/, "");
        outer.close = text.slice(fn.body.end - 1, outer.node.end);
    }

    // assign units to parts
    const owner = new Map();
    for (const u of units) {
        const hits = entry.parts.filter((p) => p.blocks.some((b) => u.title.startsWith(b)));
        if (hits.length !== 1) throw new Error(`${src}: block "${u.title.slice(0, 70)}" is named by ${hits.length} parts`);
        owner.set(u, hits[0]);
    }
    for (const p of entry.parts) for (const b of p.blocks) if (!units.some((u) => u.title.startsWith(b))) throw new Error(`${src}: part ${p.file} names "${b}", which no block carries`);

    // declarations: who reads what
    const declOf = new Map(); // name -> decl chunk
    for (const d of decls) { d.names = declared(d.node); d.reads = reads(d.node); for (const n of d.names) declOf.set(n, d); }
    const need = (names, seen = new Set()) => {
        for (const n of names) {
            const d = declOf.get(n);
            if (d && !seen.has(d)) { seen.add(d); need(d.reads, seen); }
        }
        return seen;
    };
    const hookReads = new Set([...hooks, ...innerHooks].flatMap((h) => [...reads(h.node)]));
    const partReads = new Map(entry.parts.map((p) => [p, new Set(hookReads)]));
    for (const u of units) for (const n of reads(u.node)) partReads.get(owner.get(u)).add(n);
    const users = new Map(decls.map((d) => [d, new Set()]));
    for (const p of entry.parts) for (const d of need(partReads.get(p))) users.get(d).add(p);
    // a statement that declares nothing runs once, in shared, with everything it reads
    const shared = new Set();
    const isCopy = (d) => d.names.some((n) => entry.copy?.includes(n));
    const copies = new Set(); // copy declarations the helper carries for itself, unexported
    const toShared = (d) => {
        if (shared.has(d) || copies.has(d)) return;
        (isCopy(d) ? copies : shared).add(d);
        for (const x of need(d.reads)) toShared(x);
    };
    for (const n of entry.share ?? []) if (!declOf.has(n)) throw new Error(`${src}: share names ${n}, which no declaration carries`);
    for (const d of decls) if (!isCopy(d) && (!d.names.length || entry.shareAll || d.names.some((n) => entry.share?.includes(n)))) toShared(d);
    for (const n of entry.copy ?? []) if (!declOf.has(n)) throw new Error(`${src}: copy names ${n}, which no declaration carries`);
    for (const d of decls) if (users.get(d).size > 1 && !isCopy(d)) toShared(d);
    // a declaration a shared one reads is shared (closure)
    let grew = true;
    while (grew) { grew = false; for (const d of [...shared]) for (const x of need(d.reads)) if (!shared.has(x) && !copies.has(x)) { toShared(x); grew = true; } }
    const unread = decls.filter((d) => !shared.has(d) && !copies.has(d) && users.get(d).size === 0);
    if (unread.length) throw new Error(`${src}: declarations no output reads: ${unread.flatMap((d) => d.names).join(", ")}`);
    if (shared.size && !entry.shared) throw new Error(`${src}: ${shared.size} shared declaration(s) and no shared module named`);
    const inline = new Map(entry.parts.map((p) => [p, decls.filter((d) => !shared.has(d) && users.get(d).has(p))]));

    // imports, recomputed per output
    // A binding no statement of the source reads is an import ASSERTION (a type-only door
    // that must resolve, a `@ts-expect-error` that must stay an error): it lands verbatim, with
    // its comments, in the host (the helper, or the first part). An import's leading comment
    // goes with the first output that keeps the import; a `@ts-` directive goes with every copy.
    const readAnywhere = new Set();
    for (const s of stmts) if (!ts.isImportDeclaration(s)) for (const n of reads(s)) readAnywhere.add(n);
    const bindingsOf = (cl) => [
        ...(cl.name ? [cl.name.text] : []),
        ...(cl.namedBindings ? (ts.isNamespaceImport(cl.namedBindings) ? [cl.namedBindings.name.text] : cl.namedBindings.elements.map((e) => e.name.text)) : []),
    ];
    const commented = new Set();
    const importFor = (body, dir, host) => {
        const used = reads(ts.createSourceFile("x.ts", body, ts.ScriptTarget.Latest, true));
        const outL = [];
        for (const im of imports) {
            const s = im.node;
            const raw = s.moduleSpecifier.text;
            const spec = raw.startsWith(".") ? rel(dir, posix.normalize(posix.join(oldDir, raw))) : raw;
            const lead = im.text.slice(0, im.text.length - text.slice(s.getStart(), s.end).length).replace(/^\s*\n/, "");
            const directive = /@ts-/.test(lead);
            const cl = s.importClause;
            if (!cl) { outL.push(`import ${JSON.stringify(spec)};`); continue; }
            const all = bindingsOf(cl);
            const asserted = all.filter((n) => !readAnywhere.has(n));
            const keep = new Set(all.filter((n) => used.has(n) || (host && asserted.includes(n))));
            if (!keep.size) continue;
            const withLead = (line) => ((directive || !commented.has(im)) && lead ? `${lead}${line}` : line);
            if (keep.size === all.length && (directive || asserted.length)) {
                // whole and load-bearing as written: verbatim, specifier re-based
                const verbatim = text.slice(s.getStart(), s.end).replace(s.moduleSpecifier.getText(), JSON.stringify(spec));
                outL.push(withLead(verbatim));
                commented.add(im);
                continue;
            }
            if (directive) throw new Error(`${src}: an import under a @ts- directive is read by more than one output in part; split it by hand`);
            const typeAll = cl.isTypeOnly ? "type " : "";
            const def = cl.name && keep.has(cl.name.text) ? cl.name.text : null;
            let named = null;
            if (cl.namedBindings && ts.isNamespaceImport(cl.namedBindings)) {
                if (keep.has(cl.namedBindings.name.text)) named = `* as ${cl.namedBindings.name.text}`;
            } else if (cl.namedBindings) {
                const els = cl.namedBindings.elements.filter((e) => keep.has(e.name.text)).map((e) => e.getText());
                if (els.length) named = els.join(", ").length > 80 ? `{\n    ${els.join(",\n    ")},\n}` : `{ ${els.join(", ")} }`;
            }
            outL.push(withLead(`import ${typeAll}${[def, named].filter(Boolean).join(", ")} from ${JSON.stringify(spec)};`));
            commented.add(im);
        }
        return outL;
    };
    const sharedBase = entry.shared ? entry.shared.replace(/\.ts$/, "") : null;
    const exportText = (d) => {
        const s = d.node;
        const exported = s.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
        if (exported || !d.names.length) return d.text;
        // prefix `export` on the declaration itself, after its leading comments
        const lead = d.text.length - text.slice(s.getStart(), s.end).length;
        return d.text.slice(0, lead) + "export " + d.text.slice(lead);
    };

    const outputs = [];
    const sharedDecls = decls.filter((d) => shared.has(d) || copies.has(d));
    if (sharedDecls.length) {
        const body = sharedDecls.map((d) => (copies.has(d) ? d.text : exportText(d))).join("\n").replace(/^\s*\n/, "");
        const im = importFor(body, newDir, true);
        if (!entry.sharedWhy) throw new Error(`${src}: a shared module needs its sharedWhy`);
        const doc = `// ${entry.sharedWhy.replace(/\n/g, "\n// ")}\n`;
        const content = `${doc}${header ? `//\n${header}\n\n` : "\n"}${im.length ? `${im.join("\n")}\n\n` : ""}${body.replace(/^\n+/, "")}\n`;
        outputs.push({ path: posix.join(newDir, entry.shared), content, role: "shared", tests: 0 });
    }
    const sharedNames = sharedDecls.filter((d) => !copies.has(d)).flatMap((d) => d.names.map((n) => ({ n, type: isTypeOnly(d.node) })));
    entry.parts.forEach((p, pi) => {
        const mine = units.filter((u) => owner.get(u) === p);
        const own = inline.get(p).map((d) => d.text).join("\n");
        const hookText = hooks.map((h) => h.text).join("\n");
        let blockText = mine.map((u) => u.text).join("\n");
        if (outer) blockText = `${pi === 0 ? outer.lead : ""}${outer.open}\n${[...innerHooks.map((h) => h.text), blockText].join("\n").replace(/^\s*\n/, "")}\n${outer.close}`;
        const body = [own, hookText, blockText].filter((x) => x.trim()).map((x) => x.replace(/^\s*\n/, "")).join("\n\n");
        const used = reads(ts.createSourceFile("x.ts", body, ts.ScriptTarget.Latest, true));
        const fromShared = sharedNames.filter(({ n }) => used.has(n)).map(({ n, type }) => (type ? `type ${n}` : n));
        const im = importFor(body, newDir, !sharedDecls.length && pi === 0);
        if (fromShared.length) {
            const list = fromShared.join(", ");
            im.push(list.length > 80 ? `import {\n    ${fromShared.join(",\n    ")},\n} from "./${sharedBase}";` : `import { ${list} } from "./${sharedBase}";`);
        }
        const head = !sharedDecls.length && pi === 0 && header ? `${header}\n\n` : "";
        const why = `// ${p.why.replace(/\n/g, "\n// ")}\n\n`;
        const content = `${head}${why}${im.join("\n")}\n\n${body}\n`;
        outputs.push({ path: posix.join(newDir, p.file), content, role: "part", tests: mine.reduce((a, u) => a + u.tests, 0) });
    });

    // checks
    const stop = [];
    for (const o of outputs) {
        const n = lines(o.content);
        o.lines = n;
        if (n > MAX) stop.push(`${o.path}: ${n} lines > ${MAX}`);
        if (o.path !== src && existsSync(join(root, o.path))) stop.push(`${o.path}: exists`);
    }
    const before = units.reduce((a, u) => a + u.tests, 0);
    const after = outputs.reduce((a, o) => a + o.tests, 0);
    if (before !== after) stop.push(`${src}: ${before} test calls in, ${after} out`);
    if (stop.length) throw new Error(`${src}: stopped\n  ${stop.join("\n  ")}`);
    return { entry, src, text0, sourceLines: lines(text0), outputs, tests: before, shared: sharedDecls.filter((d) => !copies.has(d)).flatMap((d) => d.names), hooks: hooks.length + innerHooks.length };
}

const plans = entries.map(plan);
const sources = new Set(plans.map((p) => p.src));
const row = { step: spec.why, files: {}, reasons: [] };
const shipped = { step: spec.whyShipped, files: {}, reasons: [] };
for (const p of plans) {
    row.files[p.src] = { remove: true, before: p.text0 };
    for (const o of p.outputs) row.files[o.path] = { create: o.content };
    row.reasons.push({ file: p.src, why: p.entry.why });
}
// citations in files the split does not replace: one exact-text hunk per citation site
const cites = [];
for (const c of spec.citations ?? []) for (const file of [].concat(c.for).every((f) => sources.has(f)) ? sitesOf(c) : []) {
    if (sources.has(file)) continue;
    const t = readFileSync(join(root, file), "utf8");
    const n = t.split(c.from).length - 1;
    if (n < 1) throw new Error(`${file}: citation ${JSON.stringify(c.from)} has no match`);
    const target = file.startsWith("src/") && !file.includes("/__tests__/") ? shipped : row;
    const op = (target.files[file] ??= { hunks: [] });
    if (n !== 1) throw new Error(`${file}: citation ${JSON.stringify(c.from)} matches ${n} times; name it with more context`);
    op.hunks.push([c.from, c.to]);
    target.reasons.push({ file, why: `cites ${c.for}; now ${c.to}` });
    cites.push({ file, from: c.from, to: c.to, shipped: target === shipped });
}

for (const p of plans) {
    console.log(`${p.src} (${p.sourceLines} lines, ${p.tests} tests) -> ${p.entry.dir}/`);
    for (const o of p.outputs) console.log(`  ${o.path.slice(p.entry.dir.length + 1).padEnd(28)} ${String(o.lines).padStart(4)} lines  ${o.role === "shared" ? `shared: ${p.shared.length} decls` : `${o.tests} tests`}`);
}
// The floor's opaque ledger matches an unresolvable reference by (file, kind, spec). An entry
// that names a split source follows its reference to every output that now carries it (one
// entry per output), so the graph neither loses the declaration nor reads a stale one. The
// split lands after the floor rows (S1), so the ledger is the landed one, named by --ledger;
// a tree whose landed ledger names a split source refuses to run without it.
const ledgered = [];
{
    const path = ledger ?? (existsSync(join(root, LANDED_LEDGER)) ? LANDED_LEDGER : null);
    if (path) {
        const before = readFileSync(join(root, path), "utf8");
        const doc = JSON.parse(before);
        if (`${JSON.stringify(doc, null, 4)}\n` !== before) throw new Error(`${path}: not in its canonical form; refusing to edit it`);
        const hits = doc.entries.filter((e) => sources.has(e.file));
        if (hits.length && !ledger) throw new Error(`${path} names ${hits.length} reference(s) in split sources; pass --ledger ${path}`);
        const indent = (t) => t.replace(/\n/g, "\n        ");
        const op = { hunks: [] };
        for (const e of hits) {
            const p = plans.find((x) => x.src === e.file);
            const outs = p.outputs.filter((o) => o.content.includes(e.spec));
            if (!outs.length) throw new Error(`${path}: the entry (${e.file}, ${e.kind}, ${e.spec}) matches no output of the split`);
            const next = outs.map((o) => ({ ...e, file: o.path }));
            op.hunks.push([indent(JSON.stringify(e, null, 4)), next.map((x) => indent(JSON.stringify(x, null, 4))).join(",\n        ")]);
            ledgered.push({ spec: e.spec, from: e.file, to: outs.map((o) => o.path) });
        }
        if (op.hunks.length) { row.files[path] = op; row.reasons.push({ file: path, why: `${op.hunks.length} opaque-ledger entries follow their references into the split modules` }); }
    }
}
for (const l of ledgered) console.log(`ledger ${l.from} ${JSON.stringify(l.spec)} -> ${l.to.join(", ")}`);
for (const c of cites) console.log(`cite ${c.shipped ? "(shipped) " : ""}${c.file}: ${c.from} -> ${c.to}`);
if (outShipped) writeFileSync(resolve(outShipped), `${JSON.stringify(shipped, null, 1)}\n`);
if (out) writeFileSync(resolve(out), `${JSON.stringify(row, null, 1)}\n`);
if (apply) {
    for (const [path, op] of [...Object.entries(row.files), ...Object.entries(shipped.files)]) {
        const abs = join(root, path);
        if (op.remove) {
            unlinkSync(abs);
            for (let d = dirname(abs); d.startsWith(root) && d !== root && !readdirSync(d).length; d = dirname(d)) rmdirSync(d);
        } else if (op.create !== undefined) { mkdirSync(dirname(abs), { recursive: true }); writeFileSync(abs, op.create); }
        else {
            let t = readFileSync(abs, "utf8");
            for (const [f, to] of op.hunks) { if (t.split(f).length - 1 !== 1) throw new Error(`${path}: hunk does not match once`); t = t.replace(f, () => to); }
            writeFileSync(abs, t);
        }
    }
    console.log(`applied: ${Object.keys(row.files).length} files in the row, ${Object.keys(shipped.files).length} in the shipped row`);
}
