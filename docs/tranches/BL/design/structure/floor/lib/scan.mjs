// scan.mjs — per-language reference extraction. Every function returns raw references
// with exact source offsets (whole-file coordinates); graph.mjs resolves them.
//
// A reference: { kind, mode, spec, start, end, names?, typeOnly?, spans?, abs?, prefix? }
//   mode "module"  resolve as a module specifier       mode "path"  exact file/dir
//   mode "abs"     an evaluated absolute path           mode "glob"  a pattern
//   mode "opaque"  not static: fail closed unless the opaque ledger declares it
//   mode "scan"    a static directory prefix + an opaque tail (a scanner's base)
import { dirname, join, posix } from "node:path";
import { makeEvaluator } from "./evaluate.mjs";

const TS_KIND = (ts, f) =>
    /\.(tsx|jsx)$/.test(f) ? ts.ScriptKind.TSX : /\.(js|mjs|cjs)$/.test(f) ? ts.ScriptKind.JS : ts.ScriptKind.TS;

const FS_READ = new Set(["readFileSync", "readFile", "existsSync", "statSync", "lstatSync", "readdirSync", "readdir", "createReadStream", "access", "accessSync", "stat", "opendirSync", "cpSync", "copyFileSync"]);
const VI_SPEC = new Set(["mock", "doMock", "unmock", "doUnmock", "importActual", "importMock"]);

/** A string that names (or tries to name) a repo location. */
export function pathCandidate(v) {
    if (!v || v.length > 300 || /[\s\n<>|"'`$]/.test(v) || v.includes("://") || v.startsWith("data:")) return null;
    const bare = v.replace(/[?#].*$/, "");
    const glob = /[*{]/.test(bare);
    if (/^\/?(src|demo|tests|tests-visual|scripts|docs)\/./.test(bare) || /^\/?(src|demo|tests|tests-visual|scripts)$/.test(bare)) return { glob, zoneRooted: true };
    if (/^(\.\.?\/)+./.test(bare)) return { glob, zoneRooted: /^(\.\.?\/)+(src|demo|tests|tests-visual|scripts|docs)(\/|$)/.test(bare), hasExt: /\.[a-z0-9]{1,6}$/i.test(bare) };
    return null;
}

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
            push({ kind: write ? "write" : kind, mode: "abs", abs: v.v, anchor: v.anchor, spec: node.getText(sf), ...at(node), spans: v.lits.map(lit), write });
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

// ---- CSS --------------------------------------------------------------------
export function scanCss(postcss, file, code, offset, { inline = false } = {}) {
    const refs = [];
    let rootNode;
    try { rootNode = postcss.parse(code, { from: file }); } catch (e) { return { refs: [{ kind: "css-parse-error", mode: "error", spec: String(e.message).slice(0, 120), start: offset, end: offset }] }; }
    const quoted = (text, base) => {
        const out = [];
        for (const m of text.matchAll(/url\(\s*(["']?)([^"')\s]+)\1\s*\)|(["'])((?:(?!\3).)*)\3/g)) {
            const value = m[2] ?? m[4];
            const q = m[1] !== undefined ? m[1] : m[3];
            const idx = m.index + m[0].indexOf(value, m[2] !== undefined ? 4 : 1);
            out.push({ value, start: base + idx, end: base + idx + value.length, isUrl: m[2] !== undefined, q });
        }
        return out;
    };
    const tag = inline ? "sfc-inline-" : "";
    rootNode.walk((n) => {
        if (n.type === "atrule") {
            const start = offset + n.source.start.offset;
            const raw = code.slice(n.source.start.offset, n.source.end.offset + 1);
            const pstart = start + raw.indexOf(n.params, n.name.length + 1);
            const qs = quoted(n.params, pstart);
            const name = n.name;
            if (name === "import" && qs[0]) {
                refs.push({ kind: `${tag}css-import`, mode: "module", spec: qs[0].value, start: qs[0].start, end: qs[0].end, spans: [qs[0]], cssImport: true });
                // Tailwind's `@import "tailwindcss" source("../demo")` names a scan root
                const src = /\bsource\(\s*(["'])([^"']+)\1\s*\)/.exec(n.params);
                const q = src && qs.find((x) => x.value === src[2] && x !== qs[0]);
                if (q) refs.push({ kind: `${tag}css-source`, mode: "glob", spec: q.value, start: q.start, end: q.end, spans: [q], cssSource: true });
            }
            else if (name === "reference" && qs[0]) refs.push({ kind: `${tag}css-reference`, mode: "module", spec: qs[0].value, start: qs[0].start, end: qs[0].end, spans: [qs[0]] });
            else if ((name === "plugin" || name === "config") && qs[0]) refs.push({ kind: `${tag}css-${name}`, mode: "module", spec: qs[0].value, start: qs[0].start, end: qs[0].end, spans: [qs[0]] });
            else if (name === "source" && !/^\s*inline\(/.test(n.params.replace(/^not\s+/, "")) && qs[0]) refs.push({ kind: `${tag}css-source`, mode: "glob", spec: qs[0].value, start: qs[0].start, end: qs[0].end, spans: [qs[0]], negated: /^\s*not\b/.test(n.params), cssSource: true });
            else if (name !== "import") for (const q of qs.filter((x) => x.isUrl)) urlRef(q);
        } else if (n.type === "decl" && /url\(/.test(n.value)) {
            const raw = code.slice(n.source.start.offset, n.source.end.offset + 1);
            const vstart = offset + n.source.start.offset + raw.indexOf(n.value, n.prop.length);
            for (const q of quoted(n.value, vstart).filter((x) => x.isUrl)) urlRef(q);
        }
    });
    function urlRef(q) {
        if (/^(data:|https?:|#|\/\/|var\()/.test(q.value) || q.value.startsWith("%23")) return;
        refs.push({ kind: `${tag}css-url`, mode: "module", spec: q.value, start: q.start, end: q.end, spans: [q] });
    }
    return { refs };
}

// ---- JSON (tsconfig, package.json, floor records) -------------------------------
export function jsonStrings(code) {
    const out = [];
    let i = 0;
    const stack = [];
    let expectKey = false;
    while (i < code.length) {
        const c = code[i];
        if (c === "/" && code[i + 1] === "/") { while (i < code.length && code[i] !== "\n") i++; continue; }
        if (c === "/" && code[i + 1] === "*") { i = code.indexOf("*/", i + 2) + 2; continue; }
        if (c === "{") { stack.push("o"); expectKey = true; i++; continue; }
        if (c === "[") { stack.push("a"); expectKey = false; i++; continue; }
        if (c === "}" || c === "]") { stack.pop(); i++; continue; }
        if (c === ",") { expectKey = stack.at(-1) === "o"; i++; continue; }
        if (c === ":") { expectKey = false; i++; continue; }
        if (c === '"') {
            let j = i + 1;
            while (j < code.length && code[j] !== '"') j += code[j] === "\\" ? 2 : 1;
            const raw = code.slice(i + 1, j);
            let value;
            try { value = JSON.parse(`"${raw}"`); } catch { value = raw; }
            out.push({ value, start: i + 1, end: j, isKey: expectKey, path: [...stack] });
            i = j + 1;
            continue;
        }
        i++;
    }
    return out;
}

export function scanJson(file, code) {
    const refs = [];
    const strings = jsonStrings(code);
    const isPkg = /(^|\/)package\.json$/.test(file);
    const isRecord = /(^|\/)floor\/records\//.test(file);
    const isLedger = /(^|\/)floor\/records\/opaque-ledger\.json$/.test(file);
    let key = null;
    for (const s of strings) {
        if (s.isKey) { key = s.value; continue; }
        if (isPkg && /\s/.test(s.value)) {
            for (const tok of commandTokens(s.value, s.start)) refs.push({ kind: "json-command", mode: "path", spec: tok.value, start: tok.start, end: tok.end, spans: [tok], rootFirst: false, claim: true });
            continue;
        }
        const c = pathCandidate(s.value) ?? (/^(\.\/)?(dist|MIGRATION\.md|tests-visual)(\/|$)/.test(s.value) ? { glob: /\*/.test(s.value), zoneRooted: true, hasExt: /\.[a-z]+$/.test(s.value) } : null);
        if (!c) continue;
        if (isRecord && !c.zoneRooted) continue; // export keys ("./styles"), not paths
        if (isLedger && key !== "file") continue; // a ledger names phantoms as data; only `file` is a path
        refs.push({ kind: c.glob ? "json-glob" : "json-ref", mode: c.glob ? "glob" : "path", spec: s.value, start: s.start, end: s.end, spans: [{ start: s.start, end: s.end, value: s.value }], rootFirst: isRecord || c.zoneRooted, claim: true, hasExt: c.hasExt ?? true });
    }
    return { refs };
}

/** Tokens of a shell command line that name repo files (scripts, configs). */
export function commandTokens(cmd, base) {
    const out = [];
    for (const m of cmd.matchAll(/[^\s"';&|=()]+/g)) {
        const v = m[0];
        if (/^(\.\/)?(src|demo|tests|tests-visual|scripts|docs)\/[^\s]*\.[a-z0-9]+$/i.test(v) || /^(\.\/)?[\w.-]+\.(mjs|cjs|mts|ts|js|sh)$/.test(v))
            out.push({ value: v, start: base + m.index, end: base + m.index + v.length });
    }
    return out;
}

export function scanSh(file, code) {
    const refs = [];
    code.split("\n").reduce((off, line) => {
        if (!/^\s*#/.test(line)) for (const tok of commandTokens(line, off)) refs.push({ kind: "sh-ref", mode: "path", spec: tok.value, start: tok.start, end: tok.end, spans: [tok], rootFirst: true, hasExt: true, claim: true });
        return off + line.length + 1;
    }, 0);
    return { refs };
}

export function scanHtml(file, code) {
    const refs = [];
    for (const m of code.matchAll(/<(?:script|link|img|source)\b[^>]*?\b(?:src|href)\s*=\s*(["'])([^"']+)\1/g)) {
        const v = m[2];
        if (/^(https?:|data:|#|\/\/)/.test(v)) continue;
        const start = m.index + m[0].lastIndexOf(v);
        refs.push({ kind: "html-ref", mode: v.startsWith("/") ? "module" : "path", spec: v, start, end: start + v.length, spans: [{ start, end: start + v.length, value: v }] });
    }
    return { refs };
}

// ---- Vue SFC ----------------------------------------------------------------
export function scanVue(ts, postcss, sfc, file, code, ctx) {
    const refs = [];
    const exp = { own: new Set(["default"]), local: [], importBindings: new Map() };
    const { descriptor, errors } = sfc.parse(code, { filename: file, ignoreEmpty: false });
    if (errors?.length) refs.push({ kind: "sfc-parse-error", mode: "error", spec: String(errors[0].message ?? errors[0]).slice(0, 120), start: 0, end: 0 });
    for (const m of code.matchAll(/<(style|script|template)\b[^>]*?\bsrc\s*=\s*(["'])([^"']+)\2/g)) {
        const v = m[3];
        const start = m.index + m[0].lastIndexOf(v);
        refs.push({ kind: `sfc-${m[1]}-src`, mode: "module", spec: v, start, end: start + v.length, spans: [{ start, end: start + v.length, value: v }] });
    }
    for (const block of [descriptor.script, descriptor.scriptSetup]) {
        if (!block || block.src) continue;
        const r = scanScript(ts, `${file}.${block.lang === "ts" ? "ts" : "js"}`, block.content, block.loc.start.offset, { ...ctx, abs: () => ctx.abs(file) });
        for (const ref of r.refs) refs.push(ref);
        for (const [k, v] of r.exp.importBindings) exp.importBindings.set(k, { ...v, ref: v.ref + refs.length - r.refs.length });
        for (const n of r.exp.own) if (block === descriptor.script) exp.own.add(n);
    }
    for (const style of descriptor.styles) {
        if (style.src) continue;
        for (const ref of scanCss(postcss, file, style.content, style.loc.start.offset, { inline: true }).refs) refs.push(ref);
    }
    const tpl = descriptor.template;
    if (tpl && !tpl.src) {
        const base = tpl.loc.start.offset;
        for (const m of tpl.content.matchAll(/\s(?:src|href)\s*=\s*(["'])(\.{1,2}\/[^"']+|\/(?:src|demo)\/[^"']+)\1/g)) {
            const start = base + m.index + m[0].lastIndexOf(m[2]);
            refs.push({ kind: "template-asset", mode: "module", spec: m[2], start, end: start + m[2].length, spans: [{ start, end: start + m[2].length, value: m[2] }] });
        }
        for (const m of tpl.content.matchAll(/url\(\s*(['"]?)(\.{1,2}\/[^'")\s]+)\1\s*\)/g)) {
            const start = base + m.index + m[0].indexOf(m[2]);
            refs.push({ kind: "template-asset", mode: "module", spec: m[2], start, end: start + m[2].length, spans: [{ start, end: start + m[2].length, value: m[2] }] });
        }
    }
    return { refs, exp };
}
