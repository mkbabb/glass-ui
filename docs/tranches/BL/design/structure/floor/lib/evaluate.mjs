// evaluate.mjs — a partial evaluator for path-producing expressions over the TS AST.
// It folds string literals, const bindings, __dirname / import.meta.*, process.cwd(),
// and the path/url helpers (join, resolve, dirname, fileURLToPath, new URL, +, `${}`)
// into {t:"str"|"path"|"url", v} or {t:"opaque", prefix?}.
//
// For the move engine it also reports how the value is spelled at THIS site:
//   anchor  the absolute path the non-literal part evaluates to (ROOT, __dirname, …)
//   lits    the literal nodes that spell the rest, in order (a const binding
//           contributes a value, never spans: its own site carries its own edge)
// A value whose literal tail is interleaved with non-literals has lits = [] and is
// resolved but not rewritable; the engine reports it as residue if its target moves.
import { dirname, join, posix, resolve } from "node:path";

const PATH_FNS = new Set(["join", "resolve", "normalize", "dirname", "fileURLToPath", "pathToFileURL", "relative"]);

export function makeEvaluator(ts, sf, fileAbs, rootAbs) {
    const consts = new Map();
    const collect = (n) => {
        if (ts.isVariableDeclarationList(n) && n.flags & ts.NodeFlags.Const) {
            for (const d of n.declarations) {
                if (!ts.isIdentifier(d.name) || !d.initializer) continue;
                const prev = consts.get(d.name.text);
                consts.set(d.name.text, prev === undefined ? d.initializer : null);
            }
        }
        ts.forEachChild(n, collect);
    };
    collect(sf);
    // path helpers count only when imported from node:path / node:url (a `require_.resolve`
    // or a local `join` is not path.join)
    const fnLocal = new Map();
    const nsLocal = new Set();
    for (const st of sf.statements) {
        if (!ts.isImportDeclaration(st) || !ts.isStringLiteral(st.moduleSpecifier)) continue;
        if (!/^(node:)?(path|url)$/.test(st.moduleSpecifier.text)) continue;
        const c = st.importClause;
        if (!c) continue;
        if (c.name) nsLocal.add(c.name.text);
        const nb = c.namedBindings;
        if (nb && ts.isNamespaceImport(nb)) nsLocal.add(nb.name.text);
        if (nb && ts.isNamedImports(nb))
            for (const e of nb.elements) {
                const imported = (e.propertyName ?? e.name).text;
                if (imported === "posix" || imported === "win32") nsLocal.add(e.name.text);
                else fnLocal.set(e.name.text, imported);
            }
    }
    const OPAQUE = { t: "opaque", lits: [], anchor: null };
    /** parameter substitutions, set while a path helper's body is evaluated */
    const bindings = new Map();
    const isLit = (n) => ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n);
    const calleeName = (e) => {
        if (ts.isIdentifier(e)) return fnLocal.get(e.text) ?? (e.text === "String" ? "String" : null);
        if (ts.isPropertyAccessExpression(e)) {
            if (ts.isIdentifier(e.expression) && nsLocal.has(e.expression.text)) return e.name.text;
            if (e.name.text === "toString") return "toString";
        }
        return null;
    };
    const val = (t, v, lits = [], anchor = null) => ({ t, v, lits, anchor });

    function ev(n, depth = 0) {
        if (!n || depth > 24) return OPAQUE;
        if (ts.isParenthesizedExpression(n) || ts.isAsExpression(n) || ts.isNonNullExpression(n) || (ts.isSatisfiesExpression && ts.isSatisfiesExpression(n)))
            return ev(n.expression, depth + 1);
        if (isLit(n)) return val("str", n.text, [n]);
        if (ts.isTemplateExpression(n)) {
            let s = n.head.text;
            let kind = "str";
            let anchor = null;
            let strAnchor = null;
            for (const [i, span] of n.templateSpans.entries()) {
                const x = ev(span.expression, depth + 1);
                if (x.t === "opaque") return { t: "opaque", prefix: val(kind, s), lits: [], anchor: null, template: n };
                if (i === 0 && s === "" && (x.t === "path" || x.t === "url")) { kind = x.t; anchor = x.v; }
                // `${DOCK}/composables/x.ts` with DOCK a const string: the const is the anchor
                // (its own literal is its own edge) and the tail literal spells the rest
                if (i === 0 && s === "" && x.t === "str") strAnchor = x.v;
                s += x.v + span.literal.text;
            }
            const one = n.templateSpans.length === 1 && n.head.text === "";
            const tail = one && (anchor || strAnchor !== null) ? [n.templateSpans[0].literal] : [];
            return { t: kind, v: s, lits: tail, anchor, strAnchor: kind === "str" && one ? strAnchor : null, template: n };
        }
        if (ts.isIdentifier(n)) {
            if (bindings.has(n.text)) return bindings.get(n.text);
            if (n.text === "__dirname") return val("path", dirname(fileAbs));
            if (fnLocal.get(n.text) === "sep") return val("str", "/");
            if (n.text === "__filename") return val("path", fileAbs);
            const init = consts.get(n.text);
            if (init) {
                const x = ev(init, depth + 1);
                return { ...x, lits: [], anchor: null };
            }
            return OPAQUE;
        }
        if (ts.isPropertyAccessExpression(n)) {
            const txt = n.getText(sf);
            if (txt === "import.meta.url") return val("url", fileAbs);
            if (txt === "import.meta.dirname") return val("path", dirname(fileAbs));
            if (txt === "import.meta.filename") return val("path", fileAbs);
            if (n.name.text === "sep" && ts.isIdentifier(n.expression) && nsLocal.has(n.expression.text)) return val("str", "/");
            if (n.name.text === "pathname" || n.name.text === "href") {
                const x = ev(n.expression, depth + 1);
                if (x.t === "url") return n.name.text === "pathname" ? { ...x, t: "path" } : x;
            }
            return OPAQUE;
        }
        if (ts.isBinaryExpression(n) && n.operatorToken.kind === ts.SyntaxKind.PlusToken) {
            const a = ev(n.left, depth + 1);
            const b = ev(n.right, depth + 1);
            if (a.t !== "opaque" && b.t === "str") {
                const t = a.t;
                const anchorable = (t === "path" || t === "url") && a.lits.length === 0 && isLit(n.right);
                return { t, v: a.v + b.v, lits: anchorable ? [n.right] : [], anchor: anchorable ? a.v : null };
            }
            if (a.t !== "opaque" && b.t === "opaque") return { t: "opaque", prefix: a, lits: [], anchor: null };
            return OPAQUE;
        }
        if (ts.isNewExpression(n) && ts.isIdentifier(n.expression) && n.expression.text === "URL" && n.arguments?.length) {
            const a = ev(n.arguments[0], depth + 1);
            if (n.arguments.length === 1) {
                if (a.t === "str" && a.v.startsWith("file://")) return val("url", a.v.slice(7));
                return OPAQUE;
            }
            const b = ev(n.arguments[1], depth + 1);
            if (b.t !== "url") return OPAQUE;
            const base = dirname(b.v);
            // URL resolution keeps a directory's trailing slash: new URL("..", f) is "…/dir/"
            const dirLike = (x) => x === "." || x === ".." || x.endsWith("/") || x.endsWith("/.") || x.endsWith("/..");
            if (a.t === "str") return { t: "url", v: resolve(base, a.v) + (dirLike(a.v) ? "/" : ""), lits: isLit(n.arguments[0]) ? [n.arguments[0]] : [], anchor: base, newUrl: true };
            if (a.t === "opaque" && a.prefix?.t === "str") return { t: "opaque", prefix: val("path", resolve(base, a.prefix.v)), lits: [], anchor: null, newUrl: true };
            return { ...OPAQUE, newUrl: true };
        }
        if (ts.isCallExpression(n)) {
            const name = calleeName(n.expression);
            const txt = n.expression.getText(sf);
            if (txt === "process.cwd") return val("path", rootAbs);
            if (name === "String" && n.arguments.length === 1) return ev(n.arguments[0], depth + 1);
            if (name === "toString" && ts.isPropertyAccessExpression(n.expression)) return ev(n.expression.expression, depth + 1);
            if (!name || !PATH_FNS.has(name)) return OPAQUE;
            const args = n.arguments.map((a) => ev(a, depth + 1));
            if (name === "fileURLToPath") {
                const x = args[0];
                if (x?.t === "url") return { ...x, t: "path" };
                if (x?.t === "str" && x.v.startsWith("file://")) return val("path", x.v.slice(7));
                if (x?.t === "opaque" && (x.prefix?.t === "path" || x.prefix?.t === "url")) return { t: "opaque", prefix: { ...x.prefix, t: "path" }, lits: [], anchor: null };
                return OPAQUE;
            }
            if (name === "pathToFileURL") return args[0]?.t === "path" ? { ...args[0], t: "url" } : OPAQUE;
            if (name === "dirname") {
                if (args[0]?.t === "path") return val("path", dirname(args[0].v));
                if (args[0]?.t === "str") return val("str", posix.dirname(args[0].v));
                return OPAQUE;
            }
            if (name === "relative") return OPAQUE;
            // join / resolve / normalize
            const firstOpaque = args.findIndex((a) => a.t === "opaque" || a.t === "url");
            const staticArgs = firstOpaque === -1 ? args : args.slice(0, firstOpaque);
            const combine = (list) => {
                let acc = null;
                for (const a of list) {
                    if (name === "resolve") acc = acc === null ? { path: true, v: a.t === "path" ? a.v : resolve(rootAbs, a.v) } : { path: true, v: resolve(acc.v, a.v) };
                    else if (acc === null) acc = { path: a.t === "path", v: a.v };
                    else acc = { path: acc.path, v: acc.path ? join(acc.v, a.v) : posix.join(acc.v, a.v) };
                }
                return acc;
            };
            const acc = combine(staticArgs);
            if (firstOpaque !== -1) return acc && firstOpaque > 0 ? { t: "opaque", prefix: val(acc.path ? "path" : "str", acc.v), lits: [], anchor: null } : OPAQUE;
            if (!acc) return OPAQUE;
            // literal tail: the longest run of literal args ending at the last arg
            let k = n.arguments.length;
            while (k > 0 && isLit(n.arguments[k - 1])) k--;
            const head = combine(args.slice(0, k));
            const anchor = k === 0 ? (name === "resolve" ? rootAbs : null) : head?.path ? head.v : null;
            const lits = anchor !== null || k === 0 ? n.arguments.slice(k) : [];
            return { t: acc.path ? "path" : "str", v: acc.v, lits, anchor, call: n };
        }
        return OPAQUE;
    }
    const selfDir = dirname(fileAbs);
    return { ev, consts, selfDir, bindings, isPathCall: (n) => ts.isCallExpression(n) && PATH_FNS.has(calleeName(n.expression) ?? "") };
}
