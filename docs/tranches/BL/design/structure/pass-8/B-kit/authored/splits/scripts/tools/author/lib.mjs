// lib.mjs — the derive primitives the three zone-scripts split scripts share (B-S11).
//
// A source is read from the tree the split runs on and parsed with that tree's own
// TypeScript. Its top-level statements are addressed by NAME (a function, a const/let, an
// import by its specifier) or, for an anonymous statement, by the text it starts with. A
// statement's text runs from the end of the previous statement, so the comment block above
// a declaration travels with it. Nothing is addressed by line number, so an earlier chain
// row that edits a statement's body (the route's S-14 cures, S34's guard drops) does not
// break the split: the edited body moves as it stands.
//
// Every exact-text edit (`sub`) must match exactly once, or the derive stops before writing.
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";

export function rootArg() {
    const args = process.argv.slice(2);
    const i = args.indexOf("--root");
    if (i < 0) throw new Error("missing --root <tree>");
    return resolve(args[i + 1]);
}

const nameOf = (ts, s, src) => {
    if (ts.isFunctionDeclaration(s) && s.name) return [s.name.text];
    if (ts.isVariableStatement(s)) return s.declarationList.declarations.map((d) => d.name.getText());
    if (ts.isImportDeclaration(s)) return [`import:${s.moduleSpecifier.text}`];
    return [];
};

/** Open `file` under `root`: its text and its top-level statements, each with its span. */
export function openSource(root, file) {
    const ts = createRequire(join(root, "package.json"))("typescript");
    const text = readFileSync(join(root, file), "utf8");
    const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
    const stmts = sf.statements.map((s, i) => ({
        i,
        names: nameOf(ts, s, text),
        start: i === 0 ? 0 : sf.statements[i - 1].end,
        end: s.end,
        head: text.slice(s.getStart(sf), s.getStart(sf) + 120),
    }));
    const taken = new Set();
    const find = (key) => {
        const hits = stmts.filter((s) => (typeof key === "string" ? s.names.includes(key) : key.test(s.head)));
        if (hits.length !== 1) throw new Error(`${file}: ${hits.length} top-level statement(s) for ${key}`);
        return hits[0];
    };
    const takeIdx = (i, key) => {
        if (taken.has(i)) throw new Error(`${file}: ${key} taken twice`);
        taken.add(i);
        return text.slice(stmts[i].start, stmts[i].end);
    };
    return {
        file,
        text,
        /** The statement's text (leading comments included), marked as taken. */
        take(key) {
            return takeIdx(find(key).i, key);
        },
        /** Several statements, in source order, as one block. */
        takeAll(keys) {
            return keys.map((k) => find(k).i).sort((a, b) => a - b).map((i) => takeIdx(i, i)).join("");
        },
        /** The contiguous run of statements from `fromKey` through `toKey`, as one block. */
        takeRun(fromKey, toKey) {
            const a = find(fromKey), b = find(toKey);
            if (b.i < a.i) throw new Error(`${file}: run ${fromKey}..${toKey} is reversed`);
            for (let i = a.i; i <= b.i; i++) {
                if (taken.has(i)) throw new Error(`${file}: statement ${i} taken twice`);
                taken.add(i);
            }
            return text.slice(a.start, b.end);
        },
        /** The source with every taken statement removed; `replace` maps a taken key to text left in its place. */
        rest(replace = new Map()) {
            let out = "";
            let at = 0;
            const at_ = new Map([...replace].map(([k, v]) => [find(k).i, v]));
            for (const s of stmts) {
                if (!taken.has(s.i)) continue;
                out += text.slice(at, s.start);
                if (at_.has(s.i)) out += at_.get(s.i);
                at = s.end;
            }
            return out + text.slice(at);
        },
        startOf: (key) => find(key).start,
    };
}

/** Replace `from` with `to` in `text`; `from` must occur exactly once. */
export function sub(text, from, to, where = "") {
    const n = text.split(from).length - 1;
    if (n !== 1) throw new Error(`${where}: ${n} match(es) for ${JSON.stringify(from.slice(0, 80))}`);
    return text.replace(from, () => to);
}

/** Strip the blank lines a taken block starts with. */
export const trimLead = (block) => block.replace(/^\n+/, "");

export function write(root, file, text) {
    mkdirSync(dirname(join(root, file)), { recursive: true });
    writeFileSync(join(root, file), text);
}

/** The source's import declarations, in order: `{ spec, names: [{ imported, local }], def }`. */
export function importsOf(root, text) {
    const ts = createRequire(join(root, "package.json"))("typescript");
    const sf = ts.createSourceFile("x.mjs", text, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
    return sf.statements.filter(ts.isImportDeclaration).map((s) => {
        const c = s.importClause;
        const names = c?.namedBindings && ts.isNamedImports(c.namedBindings)
            ? c.namedBindings.elements.map((e) => ({ imported: (e.propertyName ?? e.name).text, local: e.name.text }))
            : [];
        return { spec: s.moduleSpecifier.text, def: c?.name?.text ?? null, names };
    });
}

/** The identifiers `body` reads (property names and object-literal keys left out). */
export function readsOf(root, body) {
    const ts = createRequire(join(root, "package.json"))("typescript");
    const sf = ts.createSourceFile("x.mjs", body, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
    const out = new Set();
    const visit = (n) => {
        if (ts.isIdentifier(n)) {
            const p = n.parent;
            const isKey = (ts.isPropertyAccessExpression(p) && p.name === n) || (ts.isPropertyAssignment(p) && p.name === n) || (ts.isImportSpecifier(p)) || (ts.isImportClause(p));
            if (!isKey) out.add(n.text);
        }
        ts.forEachChild(n, visit);
    };
    visit(sf);
    return out;
}

/**
 * The import lines `body` needs: from `table` (the source's own imports, then sibling
 * modules as `{ spec, names: [{ imported, local }] }`), each declaration kept only with the
 * names the body reads, in the table's order. A name the body declares itself is not
 * imported.
 */
export function importLines(root, body, table) {
    const reads = readsOf(root, body);
    const lines = [];
    for (const { spec, def, names } of table) {
        const d = def && reads.has(def) ? def : null;
        const n = names.filter((x) => reads.has(x.local) && !new RegExp(`\\n(?:export )?(?:const|let|function) ${x.local}\\b`).test(`\n${body}`));
        if (!d && !n.length) continue;
        const list = n.map((x) => (x.imported === x.local ? x.local : `${x.imported} as ${x.local}`));
        const named = list.length ? `{ ${list.join(", ")} }` : "";
        const one = `import ${[d, named].filter(Boolean).join(", ")} from "${spec}";`;
        lines.push(one.length <= 100 || !list.length ? one : `import ${d ? `${d}, ` : ""}{\n${list.map((x) => `    ${x},`).join("\n")}\n} from "${spec}";`);
    }
    return lines;
}

/** A sibling module's table row. */
export const sibling = (spec, names) => ({ spec, def: null, names: names.map((n) => ({ imported: n, local: n })) });

/** Every file under `dirs` (relative to root) whose text contains `needle`, sorted. */
export function filesContaining(root, dirs, needle) {
    const out = [];
    const walk = (d) => {
        for (const e of readdirSync(join(root, d), { withFileTypes: true })) {
            if (e.name === "node_modules") continue;
            const f = `${d}/${e.name}`;
            if (e.isDirectory()) walk(f);
            else if (/\.(ts|mts|mjs|js|vue)$/.test(e.name) && readFileSync(join(root, f), "utf8").includes(needle)) out.push(f);
        }
    };
    for (const d of dirs) if (existsSync(join(root, d))) walk(d);
    return out.sort();
}
