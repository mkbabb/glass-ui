// scan/script.mjs — references in TypeScript and JavaScript (the full AST): module
// specifiers, path expressions evaluated to repo locations, read helpers, absence guards,
// writes, and the path strings a file names. Offsets are whole-file coordinates; graph.mjs
// resolves them.
//
// A reference: { kind, mode, spec, start, end, names?, typeOnly?, spans?, abs?, prefix? }
//   mode "module"  resolve as a module specifier       mode "path"  exact file/dir
//   mode "abs"     an evaluated absolute path           mode "glob"  a pattern
//   mode "opaque"  not static: fail closed unless the opaque ledger declares it
//   mode "scan"    a static directory prefix + an opaque tail (a scanner's base)
//   mode "census"  counted, not judged (a computed read, an unresolvable mention)
import { join, posix } from "node:path";
import { makeEvaluator } from "../evaluate.mjs";
import { pathCandidate } from "./text.mjs";

const TS_KIND = (ts, f) =>
    /\.(tsx|jsx)$/.test(f) ? ts.ScriptKind.TSX : /\.(js|mjs|cjs)$/.test(f) ? ts.ScriptKind.JS : ts.ScriptKind.TS;

const FS_READ = new Set(["readFileSync", "readFile", "existsSync", "statSync", "lstatSync", "readdirSync", "readdir", "createReadStream", "access", "accessSync", "stat", "opendirSync", "cpSync", "copyFileSync"]);
const VI_SPEC = new Set(["mock", "doMock", "unmock", "doUnmock", "importActual", "importMock"]);

/** A bare multi-segment path with an extension (`components/x/y.css`): relative to a dir
 *  the same file walks or names (a scanner's base), resolved in graph.mjs. */
const BASED = /^[\w@][\w@.\-]*(\/[\w@.\-]+)+\.[a-z0-9]{1,6}$/i;

/** A string shaped like a scoped specifier with a file tail (`@glass/components/x/X.vue`):
 *  an alias or the package's own name resolves it to a file; any other package is a mention. */
const SPECIFIER = /^@[\w-]+\/[\w@.\-/]+\.[a-z0-9]{1,6}$/i;

/** A repo path quoted or url()-wrapped inside a longer string. */
const EMBEDDED = /(["'(])((?:\.\.?\/)+[\w@.\-/]+\.[a-z0-9]+|(?:src|demo|tests|tests-visual|scripts)\/[\w@.\-/]+\.[a-z0-9]+)(?=\\?["')])/g;

const WRITE_ARG0 = new Set(["writeFileSync", "writeFile", "appendFileSync", "appendFile", "mkdirSync", "mkdir", "createWriteStream", "rmSync", "rm", "unlinkSync", "unlink", "mkdtempSync"]);
const WRITE_ARG1 = new Set(["copyFileSync", "copyFile", "cpSync", "cp", "renameSync", "rename", "symlinkSync"]);
const WRITE_PROPS = new Set(["path", "outputDir", "outputFolder", "outputFile", "snapshotDir"]);

export function scanScript(ts, file, code, offset, ctx) {
    const refs = [];
    const exp = { own: new Set(), local: [], importBindings: new Map() };
    const sf = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true, TS_KIND(ts, file));
    const { ev, isPathCall, bindings } = makeEvaluator(ts, sf, ctx.abs(file), ctx.root);
    const consumed = new Set();
    // an absence assertion names a path that must NOT exist: `expect(() => read(p)).toThrow()`,
    // `expect(existsSync(p)).toBe(false)`. The graph records it and fails if the path resolves.
    const matcherOf = (expectCall) => {
        const acc = expectCall.parent;
        if (!acc || !ts.isPropertyAccessExpression(acc) || acc.expression !== expectCall) return null;
        const call = acc.parent;
        const arg0 = call && ts.isCallExpression(call) ? call.arguments[0] : null;
        return { name: acc.name.text, arg: arg0 ? arg0.getText(sf) : null };
    };
    const isExpect = (n) => n && ts.isCallExpression(n) && ts.isIdentifier(n.expression) && n.expression.text === "expect";
    const absentAt = (node) => {
        for (let n = node, depth = 0; n && depth < 12 && !ts.isBlock(n) && !ts.isSourceFile(n); n = n.parent, depth++) {
            const p = n.parent;
            if ((ts.isArrowFunction(n) || ts.isFunctionExpression(n)) && isExpect(p) && p.arguments[0] === n) {
                const m = matcherOf(p);
                return !!m && (m.name === "toThrow" || m.name === "toThrowError");
            }
            if (ts.isCallExpression(n) && fnNameOf(n.expression) === "existsSync" && isExpect(p) && p.arguments[0] === n) {
                const m = matcherOf(p);
                return !!m && ((m.name === "toBe" && m.arg === "false") || m.name === "toBeFalsy");
            }
        }
        return false;
    };
    const fnNameOf = (e) => (ts.isIdentifier(e) ? e.text : ts.isPropertyAccessExpression(e) ? e.name.text : null);
    /** the repo-relative dir a computed read's static head names, or null when it names none */
    const censusBase = (prefix) => {
        let head = prefix.v;
        if (prefix.t === "path" || prefix.t === "url") {
            // a join/resolve prefix ends on a segment boundary: it is the dir itself
            const rel = posix.relative(ctx.root, head);
            if (rel.startsWith("..")) return null;
            return rel.replace(/\/$/, "") || ".";
        }
        if (!pathCandidate(head.slice(0, head.lastIndexOf("/")) || "x")) return null;
        head = head.replace(/^\.?\//, "");
        const dir = head.endsWith("/") ? head.slice(0, -1) : posix.dirname(head);
        return dir === "" ? "." : dir;
    };
    const at = (node) => (absentAt(node) ? { start: offset + node.getStart(sf), end: offset + node.end, absent: true } : { start: offset + node.getStart(sf), end: offset + node.end });
    const lit = (node) => {
        const span = { start: offset + node.getStart(sf) + 1, end: offset + node.end - 1, value: node.text };
        const parent = node.parent;
        if (parent && (ts.isCallExpression(parent) || ts.isNewExpression(parent)) && parent.arguments) {
            const i = parent.arguments.indexOf(node);
            if (i > 0) span.delFrom = offset + parent.arguments[i - 1].end;
        }
        return span;
    };
    const push = (r) => refs.push(r);
    const fnName = (e) => (ts.isIdentifier(e) ? e.text : ts.isPropertyAccessExpression(e) ? e.name.text : null);

    // --- pre-pass: require-like names, and the output plane (dirs the file writes into)
    const requireNames = new Set(["require"]);
    const outputIds = new Set();
    const anchorId = (n) => {
        while (n && (ts.isParenthesizedExpression(n) || ts.isAsExpression(n))) n = n.expression;
        if (!n) return null;
        if (ts.isIdentifier(n)) return n.text;
        if (ts.isTemplateExpression(n)) return anchorId(n.templateSpans[0]?.expression);
        if (ts.isBinaryExpression(n)) return anchorId(n.left);
        if (ts.isCallExpression(n) && n.arguments[0]) return anchorId(n.arguments[0]);
        return null;
    };
    const writePosition = (node) => {
        const p = node.parent;
        if (!p) return false;
        if (ts.isCallExpression(p)) {
            const name = fnName(p.expression);
            if (WRITE_ARG0.has(name) && p.arguments[0] === node) return true;
            if (WRITE_ARG1.has(name) && p.arguments[1] === node) return true;
        }
        if (ts.isPropertyAssignment(p) && p.initializer === node && WRITE_PROPS.has(p.name.getText(sf))) {
            if (p.name.getText(sf) !== "path") return true;
            const call = p.parent?.parent;
            return !!call && ts.isCallExpression(call) && ["screenshot", "pdf"].includes(fnName(call.expression));
        }
        return false;
    };
    const pre = (n) => {
        if (ts.isVariableDeclaration(n) && ts.isIdentifier(n.name) && n.initializer && ts.isCallExpression(n.initializer) && fnName(n.initializer.expression) === "createRequire") requireNames.add(n.name.text);
        if (writePosition(n)) { const id = anchorId(n); if (id) outputIds.add(id); }
        ts.forEachChild(n, pre);
    };
    pre(sf);
    const outputDirs = [];
    for (const id of outputIds) {
        const v = ev(ts.factory.createIdentifier(id));
        if (v.t === "path" || v.t === "url") outputDirs.push(v.v);
    }
    const isWrite = (node, v) => {
        if (writePosition(node)) return true;
        const p = node.parent;
        if (p && ts.isVariableDeclaration(p) && p.initializer === node && ts.isIdentifier(p.name) && outputIds.has(p.name.text)) return true;
        const abs = v?.v ?? v?.prefix?.v;
        return !!abs && outputDirs.some((d) => abs === d || abs.startsWith(`${d}/`));
    };

    // --- path helpers: a local function whose body builds a path from a static prefix and
    // one of its parameters (`const read = (rel) => readFileSync(resolve(ROOT, "src", rel))`).
    // Each call with a literal argument is an edge, spelled by that argument.
    const SENTINEL = "\u0001";
    const helpers = new Map();
    /** the parameterised path inside a helper's body: its calls are the edges, it is not a scanner */
    const helperBodies = new Set();
    const findHelpers = (n) => {
        let name = null;
        let fn = null;
        if (ts.isFunctionDeclaration(n) && n.name) { name = n.name.text; fn = n; }
        else if (ts.isVariableDeclaration(n) && ts.isIdentifier(n.name) && n.initializer && (ts.isArrowFunction(n.initializer) || ts.isFunctionExpression(n.initializer))) { name = n.name.text; fn = n.initializer; }
        if (fn && fn.body) {
            fn.parameters.forEach((param, i) => {
                if (!ts.isIdentifier(param.name)) return;
                bindings.set(param.name.text, { t: "str", v: SENTINEL, lits: [], anchor: null });
                const probe = (m) => {
                    // a helper that calls a helper (`readStyle = (rel) => read(join("src/styles", rel))`)
                    // composes: the inner helper's prefix, then the outer's static head
                    if (ts.isCallExpression(m) && ts.isIdentifier(m.expression) && m.expression.text !== name && helpers.has(m.expression.text)) {
                        let composed = false;
                        for (const h of helpers.get(m.expression.text)) {
                            const a = m.arguments[h.index];
                            const v = a ? ev(a) : null;
                            const k = v && typeof v.v === "string" ? v.v.indexOf(SENTINEL) : -1;
                            if (!v || v.t !== "str" || k < 0 || !h.clean) continue;
                            const head = v.v.slice(0, k);
                            const clean = k === 0 || head.endsWith("/");
                            const prefix = head ? join(h.prefix, clean ? head.slice(0, -1) : head) : h.prefix;
                            const list = helpers.get(name) ?? [];
                            const entry = { index: i, prefix: clean ? prefix : `${prefix}`, suffix: v.v.slice(k + 1) + h.suffix, clean, write: h.write };
                            if (!list.some((x) => x.index === i && x.prefix === entry.prefix && x.suffix === entry.suffix)) list.push(entry);
                            helpers.set(name, list);
                            helperBodies.add(m);
                            composed = true;
                        }
                        if (composed) return;
                    }
                    if (isPathCall(m) || ts.isTemplateExpression(m) || (ts.isBinaryExpression(m) && m.operatorToken.kind === ts.SyntaxKind.PlusToken)) {
                        let v = ev(m);
                        const k = typeof v.v === "string" ? v.v.indexOf(SENTINEL) : -1;
                        // a cwd-relative string prefix (`${DIR}/${rel}` with DIR = "src/…") is the root's
                        if (v.t === "str" && k > 0 && !v.v.startsWith(".") && pathCandidate(v.v.slice(0, v.v.lastIndexOf("/", k)) || "x")?.zoneRooted)
                            v = { ...v, t: "path", v: join(ctx.root, v.v.replace(/^\//, "")) };
                        const k2 = typeof v.v === "string" ? v.v.indexOf(SENTINEL) : -1;
                        // a parameter that is the BASE of a zone-rooted literal tail
                        // (`resolve(root, "src/styles/theme.css")`) is the root, not a leaf: the
                        // tail is a repo path in its own right (a path-literal edge), never a
                        // helper whose body swallows it
                        const tail = k2 > 0 ? v.v.slice(k2 + 1).replace(/^\//, "") : "";
                        if (tail && pathCandidate(tail)?.zoneRooted) { ts.forEachChild(m, probe); return; }
                        if ((v.t === "path" || v.t === "url") && k2 > 0) {
                            const list = helpers.get(name) ?? [];
                            // a clean helper joins the parameter as whole path segments; a partial
                            // filename (`${DIR}/shot-${name}.png`) is recorded but not rewritable
                            const clean = v.v[k2 - 1] === "/";
                            const prefix = v.v.slice(0, clean ? k2 - 1 : k2);
                            const suffix = v.v.slice(k2 + 1);
                            const write = isWrite(m, v);
                            if (!list.some((h) => h.index === i && h.prefix === prefix && h.suffix === suffix)) list.push({ index: i, prefix, suffix, clean, write });
                            helpers.set(name, list);
                            helperBodies.add(m);
                            return;
                        }
                    }
                    ts.forEachChild(m, probe);
                };
                probe(fn.body);
                bindings.delete(param.name.text);
            });
        }
        ts.forEachChild(n, findHelpers);
    };
    findHelpers(sf);
    // a read helper's prefix is a base its callers' bare relative strings resolve against
    // (`for (const rel of ["styles/glass/rim.css", …]) src(rel)`): a dir marker, not a read
    for (const list of helpers.values()) for (const h of list) if (h.clean && !h.write) push({ kind: "helper-base", mode: "hbase", abs: h.prefix, spec: h.prefix, start: offset, end: offset });
    const helperCall = (node) => {
        if (!ts.isCallExpression(node) || !ts.isIdentifier(node.expression) || !helpers.has(node.expression.text)) return false;
        for (const h of helpers.get(node.expression.text)) {
            const a = node.arguments[h.index];
            if (!a) continue;
            if (ts.isStringLiteralLike(a)) {
                consumed.add(a);
                const abs = h.clean ? `${h.prefix}/${a.text}${h.suffix}` : `${h.prefix}${a.text}${h.suffix}`;
                const write = h.write || isWrite(node, { v: abs });
                push({ kind: write ? "write" : "path-helper", mode: "abs", abs, anchor: h.clean ? h.prefix : null, suffix: h.suffix, spec: `${node.expression.text}(${a.getText(sf)})`, ...at(a), spans: h.clean ? [lit(a)] : [], claim: !write, write });
            } else push({ kind: "path-helper", mode: "census", spec: `${node.expression.text}(${a.getText(sf)})`, ...at(a) });
        }
        return true;
    };

    for (const ref of sf.referencedFiles) push({ kind: "ts-reference", mode: "path", spec: ref.fileName, start: offset + ref.pos, end: offset + ref.end, spans: [{ start: offset + ref.pos, end: offset + ref.end, value: ref.fileName }], claim: true });

    const modSpec = (node, kind, extra = {}) => {
        consumed.add(node);
        push({ kind, mode: "module", spec: node.text, ...at(node), spans: [lit(node)], ...extra });
    };
    const importNames = (c) => {
        const out = [];
        if (!c) return out;
        if (c.name) out.push({ imported: "default", local: c.name.text, type: c.isTypeOnly });
        const nb = c.namedBindings;
        if (nb && ts.isNamespaceImport(nb)) out.push({ imported: "*", local: nb.name.text, type: c.isTypeOnly });
        if (nb && ts.isNamedImports(nb)) for (const e of nb.elements) out.push({ imported: (e.propertyName ?? e.name).text, local: e.name.text, type: c.isTypeOnly || e.isTypeOnly });
        return out;
    };
    const specArg = (node, kind, extra = {}) => {
        const a = node.arguments?.[0];
        if (!a) return;
        if (ts.isStringLiteralLike(a)) return modSpec(a, kind, extra);
        const v = ev(a);
        consumed.add(a);
        if (ts.isTemplateExpression(a) && v.t === "opaque" && v.prefix?.t === "str" && /^(\.\.?\/|\/)/.test(v.prefix.v))
            return push({ kind: `${kind}-template`, mode: "glob", spec: `${v.prefix.v}*${a.templateSpans.at(-1).literal.text}`, ...at(a), templateHead: v.prefix.v });
        push({ kind, mode: "opaque", spec: a.getText(sf), ...at(a) });
    };

    const visit = (node) => {
        if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
            const c = node.importClause;
            const names = importNames(c);
            const typeOnly = !!c && (c.isTypeOnly || (!c.name && c.namedBindings && ts.isNamedImports(c.namedBindings) && c.namedBindings.elements.length > 0 && c.namedBindings.elements.every((e) => e.isTypeOnly)));
            const kind = !c ? "import-side-effect" : typeOnly ? "import-type" : "import";
            const idx = refs.length;
            modSpec(node.moduleSpecifier, kind, { names, typeOnly });
            for (const n of names) exp.importBindings.set(n.local, { ref: idx, imported: n.imported });
            return;
        }
        if (ts.isExportDeclaration(node)) {
            if (node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
                const ec = node.exportClause;
                let kind = "reexport";
                const names = [];
                if (!ec) { kind = "reexport-star"; names.push({ imported: "*", exported: "*" }); }
                else if (ts.isNamespaceExport(ec)) { kind = "reexport-ns"; names.push({ imported: "*", exported: ec.name.text }); }
                else for (const e of ec.elements) names.push({ imported: (e.propertyName ?? e.name).text, exported: e.name.text, type: node.isTypeOnly || e.isTypeOnly });
                const typeOnly = node.isTypeOnly || (!!ec && ts.isNamedExports(ec) && ec.elements.length > 0 && ec.elements.every((e) => e.isTypeOnly));
                modSpec(node.moduleSpecifier, kind, { names, typeOnly });
                return;
            }
            if (node.exportClause && ts.isNamedExports(node.exportClause))
                for (const e of node.exportClause.elements) exp.local.push({ local: (e.propertyName ?? e.name).text, exported: e.name.text });
        }
        if (ts.isExportAssignment(node)) {
            exp.own.add("default");
            if (ts.isIdentifier(node.expression)) exp.local.push({ local: node.expression.text, exported: "default" });
        }
        if (ts.isModuleDeclaration(node) && ts.isStringLiteral(node.name)) consumed.add(node.name);
        if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference) && ts.isStringLiteral(node.moduleReference.expression))
            modSpec(node.moduleReference.expression, "require");
        if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument) && ts.isStringLiteral(node.argument.literal))
            modSpec(node.argument.literal, "import-type-node", { names: [{ imported: node.qualifier ? node.qualifier.getText(sf).split(".")[0] : "*", type: true }], typeOnly: true });
        if (ts.isCallExpression(node)) {
            helperCall(node);
            const e = node.expression;
            const name = fnName(e);
            if (e.kind === ts.SyntaxKind.ImportKeyword) specArg(node, "dynamic");
            else if (ts.isIdentifier(e) && requireNames.has(e.text)) specArg(node, "require");
            else if (ts.isPropertyAccessExpression(e) && ts.isIdentifier(e.expression) && requireNames.has(e.expression.text) && e.name.text === "resolve") specArg(node, "require");
            else if (ts.isPropertyAccessExpression(e) && ts.isIdentifier(e.expression) && e.expression.text === "vi" && VI_SPEC.has(e.name.text)) specArg(node, "vi-mock");
            else if (ts.isPropertyAccessExpression(e) && e.getText(sf) === "import.meta.glob") {
                const a = node.arguments[0];
                const pats = a && ts.isArrayLiteralExpression(a) ? a.elements : a ? [a] : [];
                for (const p of pats) {
                    consumed.add(p);
                    if (ts.isStringLiteralLike(p)) push({ kind: "glob", mode: "glob", spec: p.text, ...at(p), spans: [lit(p)] });
                    else push({ kind: "glob", mode: "opaque", spec: p.getText(sf), ...at(p) });
                }
            } else if (isPathCall(node)) return pathExpr(node);
            else if (FS_READ.has(name) || WRITE_ARG0.has(name) || WRITE_ARG1.has(name)) {
                node.arguments.forEach((a, i) => {
                    if (i > (WRITE_ARG1.has(name) ? 1 : 0)) return;
                    if (ts.isStringLiteralLike(a)) {
                        const c = pathCandidate(a.text);
                        consumed.add(a);
                        const write = isWrite(a, null);
                        if (c || FS_READ.has(name) || write) push({ kind: write ? "write" : "path-literal", mode: "path", spec: a.text, ...at(a), spans: [lit(a)], rootFirst: !!c?.zoneRooted, claim: !write, write });
                    } else if (i === 0) {
                        const v = ev(a);
                        if (v.t === "opaque" && !v.prefix && !isPathCall(a) && !ts.isNewExpression(a) && FS_READ.has(name)) push({ kind: "fs-read", mode: "census", spec: a.getText(sf), ...at(a) });
                        // P3-F4: a read whose path has a static head and a run-time tail is a
                        // computed read (B-crit I32/I32b/I32c): `join(cwd, "src/x/" + n)`,
                        // `` `src/x/${n}/index.ts` ``, `resolve(import.meta.dirname, "../src/x", n)`,
                        // in a helper body or not. It is census, with the head's dir as its base.
                        else if (v.t === "opaque" && v.prefix && FS_READ.has(name) && !isWrite(a, null)) {
                            const base = censusBase(v.prefix);
                            if (base !== null) push({ kind: "computed-read", mode: "census", spec: `${base}/<computed>`, ...at(a), base });
                        }
                    }
                });
            }
        }
        if (ts.isNewExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "URL" && node.arguments?.length === 2) {
            const b = node.arguments[1];
            if (b.getText(sf) === "import.meta.url") {
                const a = node.arguments[0];
                if (ts.isStringLiteralLike(a)) {
                    consumed.add(a);
                    push({ kind: "new-url", mode: "url", spec: a.text, ...at(a), spans: [lit(a)] });
                    return;
                }
                return pathExpr(node, "new-url");
            }
            return pathExpr(node);
        }
        if ((ts.isTemplateExpression(node) || (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken)) && !consumed.has(node)) {
            const v = ev(node);
            if (v.t === "path" || v.t === "url" || (v.t === "opaque" && (v.prefix?.t === "path" || v.prefix?.t === "url"))) return pathExpr(node);
            stringPath(node, v);
        }
        ts.forEachChild(node, visit);
    };

    // A string assembled by `${}` or `+` that names a repo location with no path call:
    // `demo/stories/compositions/${name}.vue` is a scanner over its static head's dir (a
    // scan edge; the dir must exist, and a move that shrinks it fails loud), and a fully
    // static assembly (`${DIR}/x.css` with DIR a const) is one path edge with no rewritable
    // span, so a move of its target is residue rather than a silent break.
    function stringPath(node, v) {
        if (consumed.has(node)) return true; // an enclosing assembly already owns it
        if (helperBodies.has(node)) { consumed.add(node); return true; }
        const own = (n) => { consumed.add(n); ts.forEachChild(n, own); };
        if (v.t === "opaque" && v.prefix?.t === "str") {
            // the base is the longest prefix that is certainly a directory: up to the last "/"
            const head = v.prefix.v;
            const dir = head.slice(0, head.lastIndexOf("/"));
            const c = dir ? pathCandidate(dir) : null;
            if (!c || c.glob) return false;
            own(node);
            const write = isWrite(node, null);
            push({ kind: write ? "write" : "template-path", mode: "tscan", head: dir, spec: node.getText(sf).slice(0, 160), ...at(node), write });
            return true;
        }
        if (v.t === "str") {
            const c = pathCandidate(v.v);
            if (!c) return false;
            own(node);
            const write = isWrite(node, null);
            const kind = write ? "write" : c.glob ? "glob-literal" : "path-literal";
            // rewritable when it is anchored at the root: a `${CONST}/tail` template (the const is
            // the anchor) or a join of literal segments; a relative assembly stays unrewritable
            const rooted = !v.v.startsWith(".") && !c.glob;
            if (rooted && v.lits.length && (v.strAnchor !== null && v.strAnchor !== undefined ? pathCandidate(v.strAnchor) : v.lits.length === (v.call?.arguments.length ?? -1))) {
                const anchor = v.strAnchor != null ? join(ctx.root, v.strAnchor.replace(/^\//, "")) : ctx.root;
                push({ kind, mode: "abs", abs: join(ctx.root, v.v.replace(/^\//, "")), anchor, spec: node.getText(sf).slice(0, 160), ...at(node), spans: v.lits.map(lit), composite: true, write });
                return true;
            }
            push({ kind, mode: c.glob ? "glob" : "path", spec: v.v, ...at(node), spans: [], rootFirst: c.zoneRooted, zoneRooted: c.zoneRooted, claim: true, composite: true, write });
            return true;
        }
        return false;
    }

    function pathExpr(node, kind = "path-literal") {
        const markLits = (n) => { if (ts.isStringLiteralLike(n)) consumed.add(n); ts.forEachChild(n, markLits); };
        if (helperBodies.has(node)) return markLits(node);
        const v = ev(node);
        const write = isWrite(node, v);
        if (v.t === "path" || v.t === "url") {
            markLits(node);
            push({ kind: write ? "write" : kind, mode: "abs", abs: v.v, anchor: v.anchor, spec: node.getText(sf), ...at(node), spans: v.lits.map(lit), write, rooted: !!v.rooted });
            return;
        }
        if (v.t === "opaque" && (v.prefix?.t === "path" || v.prefix?.t === "url")) {
            markLits(node);
            // a join/resolve prefix ends on a segment boundary, so it must itself be a dir;
            // a template prefix may end mid-name (`${DIR}/shot-${n}`), so its dir is the base
            const boundary = isPathCall(node) || v.prefix.v.endsWith("/");
            if (write) return push({ kind: "write", mode: "scan", abs: v.prefix.v, spec: node.getText(sf), ...at(node), write });
            push({ kind: kind === "new-url" ? "new-url" : "scan", mode: kind === "new-url" ? "opaque" : "scan", abs: v.prefix.v, boundary, spec: node.getText(sf), ...at(node) });
            return;
        }
        if (v.t === "str" && stringPath(node, v)) return;
        ts.forEachChild(node, visit);
    }

    for (const st of sf.statements) {
        const mods = ts.canHaveModifiers(st) ? ts.getModifiers(st) ?? [] : [];
        if (!mods.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) continue;
        if (mods.some((m) => m.kind === ts.SyntaxKind.DefaultKeyword)) exp.own.add("default");
        else if (ts.isVariableStatement(st)) for (const d of st.declarationList.declarations) { if (ts.isIdentifier(d.name)) exp.own.add(d.name.text); }
        else if (st.name && ts.isIdentifier(st.name)) exp.own.add(st.name.text);
    }
    visit(sf);

    // leftover string literals that name a repo location by their form
    const isPart = (n) => ts.isTemplateHead(n) || ts.isTemplateMiddle(n) || ts.isTemplateTail(n);
    const leftovers = (n) => {
        if ((ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) && !consumed.has(n)) {
            if (ts.isPropertyAssignment(n.parent) && n.parent.name === n) return;
            const c = pathCandidate(n.text);
            const write = c && isWrite(n, null);
            if (c) push({ kind: write ? "write" : c.glob ? "glob-literal" : "path-literal", mode: c.glob ? "glob" : "path", spec: n.text, ...at(n), spans: [lit(n)], rootFirst: c.zoneRooted, hasExt: c.hasExt, zoneRooted: c.zoneRooted, bareLiteral: true, write });
            else if (SPECIFIER.test(n.text)) push({ kind: "specifier-literal", mode: "maybe-module", spec: n.text, ...at(n), spans: [lit(n)] });
            else if (BASED.test(n.text)) push({ kind: "base-relative", mode: "based", spec: n.text, ...at(n), spans: [lit(n)] });
            else embedded(n);
        } else if (isPart(n) && !consumed.has(n)) embedded(n);
        ts.forEachChild(n, leftovers);
    };
    // a path quoted INSIDE a string: source text a test asserts (`'@import "./glass/x.css";'`).
    // The graph resolves it against the files this same file reads (graph.mjs).
    function embedded(n) {
        const s0 = n.getStart(sf);
        const raw = code.slice(s0, n.end);
        for (const m of raw.matchAll(EMBEDDED)) {
            if (m.index === 0) continue; // the literal's own delimiter: a plain path, judged above
            const start = offset + s0 + m.index + m[1].length;
            const end = start + m[2].length;
            push({ kind: "embedded-path", mode: "embedded", spec: m[2], start, end, spans: [{ start, end, value: m[2] }] });
        }
    }
    leftovers(sf);
    return { refs, exp };
}
