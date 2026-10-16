// lib.mjs — the author scripts' shared reading of a source file. Blocks are found by their
// own text (a line that must occur exactly once), never by line number, and every import a
// new module needs is taken from the source's own import statements by the local name it
// binds, re-based to the new module's directory. So a script cuts the same split on HEAD
// (arm F) and on the route's chained tree (arm C), where the chain has already re-pointed
// some of these imports.
import { readFileSync } from "node:fs";
import { posix } from "node:path";

const WIDTH = 88; // .prettierrc.json printWidth

export function open(root, rel) {
    const text = readFileSync(`${root}/${rel}`, "utf8");
    const L = text.split("\n");
    /** The 1-based line number of the one line equal to `line`. */
    const at = (line, { after = 0 } = {}) => {
        const hits = [];
        L.forEach((r, i) => { if (r === line && i + 1 > after) hits.push(i + 1); });
        if (hits.length !== 1) throw new Error(`${rel}: ${hits.length} line(s) equal to ${JSON.stringify(line)}${after ? ` after ${after}` : ""}`);
        return hits[0];
    };
    /** The first line at or after `from` equal to `line`. */
    const next = (line, from) => {
        for (let i = from - 1; i < L.length; i++) if (L[i] === line) return i + 1;
        throw new Error(`${rel}: no ${JSON.stringify(line)} after line ${from}`);
    };
    const range = (a, b) => L.slice(a - 1, b);
    return { rel, dir: posix.dirname(rel), text, L, at, next, range };
}

/** Every import statement of a script: its line span and the bindings it makes. */
export function imports(src) {
    const out = [];
    const RE = /^import\s+(type\s+)?([\s\S]*?)\s+from\s+"([^"]+)";$/gm;
    const lineOf = (i) => src.text.slice(0, i).split("\n").length;
    for (const m of src.text.matchAll(RE)) {
        const stmtType = !!m[1];
        const clause = m[2];
        const spec = m[3];
        const bindings = [];
        const brace = clause.indexOf("{");
        const head = (brace < 0 ? clause : clause.slice(0, brace)).replace(/,\s*$/, "").trim();
        if (head && !head.startsWith("*")) bindings.push({ local: head, imported: "default", type: stmtType });
        if (head.startsWith("*")) bindings.push({ local: head.split(/\s+as\s+/)[1], imported: "*", type: stmtType });
        if (brace >= 0) {
            const inner = clause.slice(brace + 1, clause.lastIndexOf("}"));
            for (let part of inner.split(",")) {
                part = part.trim();
                if (!part) continue;
                const type = stmtType || part.startsWith("type ");
                part = part.replace(/^type\s+/, "");
                const [imported, local] = part.split(/\s+as\s+/);
                bindings.push({ local: local ?? imported, imported, type });
            }
        }
        const first = lineOf(m.index), last = lineOf(m.index + m[0].length);
        out.push({ first, last, spec, stmtType, bindings, text: m[0] });
    }
    return out;
}

/**
 * Script text with its comments and string literals blanked (a template literal keeps its
 * `${…}` expressions), so a name only prose or a string mentions is not a use.
 */
export function scriptCode(text) {
    return text.replace(
        /\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`/g,
        (m) => (m.startsWith("`") ? ` ${[...m.matchAll(/\$\{([^}]*)\}/g)].map((x) => x[1]).join(" ")} ` : " "),
    );
}
/**
 * What a template reads: its tag names, its bound attribute values (`:x`, `@x`, `#x`, `v-x`)
 * and its `{{ }}` interpolations. Text nodes, static attributes and comments are prose.
 */
export function templateCode(text) {
    const t = text.replace(/<!--[\s\S]*?-->/g, " ");
    const parts = [];
    for (const m of t.matchAll(/<\/?([A-Za-z][\w-]*)/g)) parts.push(m[1]);
    for (const m of t.matchAll(/\s(?:[:@#]|v-)[\w:.\-[\]]*="([^"]*)"/g)) parts.push(scriptCode(m[1]));
    for (const m of t.matchAll(/\{\{([\s\S]*?)\}\}/g)) parts.push(scriptCode(m[1]));
    return parts.join("\n");
}
/** An SFC's script and template text (a plain module is all script). */
export function sfcParts(text) {
    const tA = text.indexOf("<template>"), tB = text.lastIndexOf("</template>");
    if (tA < 0) return { script: text, template: "" };
    const sA = text.indexOf("<script"), sB = text.indexOf("</script>");
    return { script: sA < 0 ? "" : text.slice(text.indexOf(">", sA) + 1, sB), template: text.slice(tA + 10, tB) };
}
/** A body is script text, or `{ script, template }`. */
export const code = (body) => (typeof body === "string" ? scriptCode(body) : `${scriptCode(body.script ?? "")}\n${templateCode(body.template ?? "")}`);
/** Whether `body` reads `name` as an identifier: not a property (`a.name`), a spread is a read. */
export const uses = (body, name) => {
    const c = code(body);
    for (const m of c.matchAll(new RegExp(`(?<![\\w$])${name.replace(/\$/g, "\\$")}(?![\\w$])`, "g"))) {
        const before = c.slice(Math.max(0, m.index - 3), m.index);
        if (!before.endsWith(".") || before === "...") return true;
    }
    return false;
};

const rebase = (spec, fromDir, toDir) =>
    spec.startsWith(".") ? (() => {
        const r = posix.relative(toDir, posix.join(fromDir, spec));
        return r.startsWith(".") ? r : `./${r}`;
    })() : spec;

function emit(spec, list, stmtType, multiline) {
    const def = list.find((b) => b.imported === "default");
    const ns = list.find((b) => b.imported === "*");
    const named = list.filter((b) => b.imported !== "default" && b.imported !== "*");
    const allType = named.length > 0 && named.every((b) => b.type) && !def;
    const typeKw = stmtType || allType ? "type " : "";
    const item = (b) => `${!typeKw && b.type ? "type " : ""}${b.imported}${b.local !== b.imported ? ` as ${b.local}` : ""}`;
    const out = [];
    if (ns) out.push(`import ${ns.type ? "type " : ""}* as ${ns.local} from "${spec}";`);
    if (def && !named.length) out.push(`import ${def.type ? "type " : ""}${def.local} from "${spec}";`);
    if (named.length) {
        const lead = def ? `${def.local}, ` : "";
        const one = `import ${typeKw}${lead}{ ${named.map(item).join(", ")} } from "${spec}";`;
        if (one.length <= WIDTH && !multiline) out.push(one);
        else out.push(`import ${typeKw}${lead}{\n${named.map((b) => `    ${item(b)},`).join("\n")}\n} from "${spec}";`);
    }
    return out.join("\n");
}

/**
 * The import lines a new module at `toDir` needs: every binding of `src` whose local name
 * `body` uses, grouped by specifier in the source's statement order, re-based.
 */
export function importsFor(src, body, toDir, { except = [] } = {}) {
    const lines = [];
    for (const st of imports(src)) {
        const list = st.bindings.filter((b) => !except.includes(b.local) && uses(body, b.local));
        if (list.length) lines.push(emit(rebase(st.spec, src.dir, toDir), list, st.stmtType, false));
    }
    return lines;
}

/**
 * The source after its split: the `cuts` (inclusive 1-based line ranges) leave, `put[n]`
 * lines are written where line n stood, each import statement keeps the bindings the
 * remaining code still uses and the ones no moved part used (an unchanged statement keeps
 * its exact text), and `addImports` follow the last import statement.
 * `moved` is the code that left (script text, or `{ script, template }`), so an import
 * only it read leaves with it.
 */
export function rebuild(src, { cuts = [], put = {}, addImports = [], moved = "" }) {
    const cut = new Set();
    for (const [a, b] of cuts) for (let i = a; i <= b; i++) cut.add(i);
    const sts = imports(src);
    const inStmt = new Map();
    for (const st of sts) for (let i = st.first; i <= st.last; i++) inStmt.set(i, st);
    for (const n of cut) if (inStmt.has(n)) throw new Error(`${src.rel}:${n} a cut takes an import line`);
    // the remaining code in file order, put lines in place, so a comment keeps its context
    const body = [];
    for (let n = 1; n <= src.L.length; n++) {
        if (put[n]) body.push(...put[n]);
        if (!cut.has(n) && !inStmt.has(n)) body.push(src.L[n - 1]);
    }
    const remaining = src.rel.endsWith(".vue") ? sfcParts(body.join("\n")) : body.join("\n");
    const lastImport = Math.max(...sts.map((s) => s.last));
    const out = [];
    for (let n = 1; n <= src.L.length; n++) {
        if (put[n]) out.push(...put[n]);
        if (!cut.has(n)) {
            const st = inStmt.get(n);
            if (!st) out.push(src.L[n - 1]);
            else if (n === st.first) {
                const keep = st.bindings.filter((b) => uses(remaining, b.local) || !uses(moved, b.local));
                if (keep.length === st.bindings.length) out.push(...st.text.split("\n"));
                else if (keep.length) out.push(...emit(st.spec, keep, st.stmtType, st.first !== st.last).split("\n"));
            }
        }
        if (n === lastImport) out.push(...addImports);
    }
    return out.join("\n");
}

/** The first line at or before `n` that opens a JSDoc block (`/**`). */
export function docStart(src, n) {
    for (let i = n - 1; i >= 1; i--) if (src.L[i - 1].startsWith("/**")) return i;
    throw new Error(`${src.rel}: no doc block above line ${n}`);
}
