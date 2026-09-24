// resolve.mjs — one resolver for every specifier form the tree uses: relative,
// root-absolute (/src/… as the dev server and index.html read it), alias (read from
// the configs, never hard-coded), the package's own name (through the entry record),
// Node builtins, and installed packages. Anything else is unresolved, and the graph
// fails closed on it.
import { builtinModules } from "node:module";
import { existsSync } from "node:fs";
import { join, posix } from "node:path";
import { selfNameTable } from "./entries.mjs";

export const SELF = "@mkbabb/glass-ui";
export const GENERATED_ROOTS = ["dist", "dist-demo", "tests-visual/.cache", "test-results", "playwright-report", ".glass-generation"];
const MODULE_EXT = ["", ".ts", ".tsx", ".mts", ".cts", ".d.ts", ".js", ".mjs", ".cjs", ".jsx", ".vue", ".css", ".json"];
const INDEX = ["/index.ts", "/index.mts", "/index.js", "/index.mjs", "/index.css", "/index.vue"];
const BUILTIN = new Set(builtinModules);

export function splitQuery(spec) {
    const m = /^([^?#]*)([?#].*)?$/.exec(spec);
    return { bare: m[1], query: m[2] ?? "" };
}

export function packageName(spec) {
    const parts = spec.split("/");
    return spec.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0];
}

export function isGenerated(p) {
    return GENERATED_ROOTS.some((g) => p === g || p.startsWith(`${g}/`) || p.startsWith(`${g}-`));
}

export function makeResolver(tree, { aliases, record }) {
    const self = selfNameTable(record);
    const pkgCache = new Map();
    const hasPackage = (name) => {
        if (!pkgCache.has(name)) pkgCache.set(name, existsSync(join(tree.root, "node_modules", name, "package.json")));
        return pkgCache.get(name);
    };
    const probe = (base) => {
        base = posix.normalize(base).replace(/\/$/, "");
        if (base.startsWith("../")) return null;
        const cands = [];
        for (const e of MODULE_EXT) cands.push(base + e);
        if (/\.(m|c)?js$/.test(base)) for (const e of [".ts", ".mts", ".cts"]) cands.push(base.replace(/\.(m|c)?js$/, e));
        for (const e of INDEX) cands.push(base + e);
        for (const c of cands) if (tree.isFile(c)) return c;
        return null;
    };
    const exact = (base) => {
        base = posix.normalize(base).replace(/\/$/, "") || ".";
        if (base.startsWith("../")) return null;
        if (tree.isFile(base)) return { to: base };
        if (tree.isDir(base)) return { to: base, dir: true };
        return null;
    };
    const matchAlias = (spec) => {
        for (const a of aliases) {
            if (spec === a.key) return a.target;
            if (spec.startsWith(`${a.key}/`)) return posix.join(a.target, spec.slice(a.key.length + 1));
        }
        return null;
    };

    /** Module-specifier resolution (import, export, import(), require, vi.mock, CSS @import …). */
    function module(from, spec) {
        const { bare } = splitQuery(spec);
        if (!bare) return { via: "empty", error: "unresolved" };
        if (bare.startsWith("./") || bare.startsWith("../") || bare === "." || bare === "..") {
            const to = probe(posix.join(posix.dirname(from), bare));
            return to ? { via: "relative", to } : generatedOr(posix.join(posix.dirname(from), bare), "relative");
        }
        if (bare.startsWith("/")) {
            const to = probe(bare.slice(1));
            return to ? { via: "root-absolute", to } : { via: "root-absolute", error: "unresolved" };
        }
        if (bare === SELF || bare.startsWith(`${SELF}/`)) {
            const sub = bare === SELF ? "" : bare.slice(SELF.length + 1);
            if (self.has(sub)) {
                const t = self.get(sub);
                if (t.source) return { via: "self-name", to: t.source };
                if (t.generated) return { via: "self-name", generated: `dist/${t.generated}` };
            }
            for (const [k, t] of self) {
                if (t.assets && sub.startsWith(k.replace(/\*$/, ""))) {
                    const to = posix.join(t.assets, sub.slice(k.replace(/\*$/, "").length));
                    return tree.isFile(to) ? { via: "self-name", to } : { via: "self-name", error: "unresolved" };
                }
            }
            return { via: "self-name", error: "unknown-subpath" };
        }
        const aliased = matchAlias(bare);
        if (aliased !== null) {
            const to = probe(aliased);
            return to ? { via: "alias", to } : { via: "alias", error: "unresolved" };
        }
        if (bare.startsWith("node:") || BUILTIN.has(bare) || BUILTIN.has(packageName(bare))) return { via: "builtin", external: bare };
        if (/^(virtual|https?|data):/.test(bare)) return { via: "url", external: bare };
        if (hasPackage(packageName(bare))) return { via: "package", external: packageName(bare) };
        return { via: "bare", error: "unknown-bare" };
    }

    function generatedOr(base, via) {
        const n = posix.normalize(base);
        if (isGenerated(n)) return { via, generated: n };
        return { via, error: "unresolved" };
    }

    /** Filesystem-path resolution: exact file or dir, file-relative then root-relative. */
    function path(from, value, { rootFirst = false } = {}) {
        const { bare } = splitQuery(value);
        if (!bare) return null;
        const tries = [];
        if (bare.startsWith("/")) tries.push(["root-absolute", bare.slice(1)]);
        else {
            const fileRel = ["file-relative", posix.join(posix.dirname(from), bare)];
            const rootRel = ["root-relative", bare.replace(/^(\.\.\/)+/, "")];
            if (rootFirst) tries.push(rootRel, fileRel);
            else tries.push(fileRel, rootRel);
        }
        for (const [via, base] of tries) {
            const hit = exact(base);
            if (hit) return { via, ...hit };
            if (isGenerated(posix.normalize(base))) return { via, generated: posix.normalize(base) };
        }
        if (bare.startsWith("/")) {
            const to = probe(bare.slice(1));
            if (to) return { via: "root-absolute", to };
        }
        return { via: tries[0][0], error: "unresolved" };
    }

    function absPath(abs) {
        const rel = tree.rel(abs);
        if (rel.startsWith("..")) return { via: "outside", external: abs };
        const r = rel === "" ? "." : rel;
        const hit = exact(r);
        if (hit) return { via: "anchored", ...hit };
        if (isGenerated(posix.normalize(r))) return { via: "anchored", generated: r };
        return { via: "anchored", error: "unresolved", base: r };
    }

    return { module, path, absPath, probe, exact };
}

// ---- globs ------------------------------------------------------------------
export function globToRegex(glob) {
    let re = "";
    for (let i = 0; i < glob.length; i++) {
        const c = glob[i];
        if (c === "*" && glob[i + 1] === "*") {
            if (glob[i + 2] === "/") { re += "(?:[^/]+/)*"; i += 2; } else { re += ".*"; i++; }
        } else if (c === "*") re += "[^/]*";
        else if (c === "?") re += "[^/]";
        else if (c === "{") {
            const end = glob.indexOf("}", i);
            re += `(?:${glob.slice(i + 1, end).split(",").map((x) => x.replace(/[.+^$()|[\]\\]/g, "\\$&").replace(/\*/g, "[^/]*")).join("|")})`;
            i = end;
        } else re += c.replace(/[.+^$()|[\]\\]/g, "\\$&");
    }
    return new RegExp(`^${re}$`);
}

export function expandGlob(tree, pattern) {
    const re = globToRegex(posix.normalize(pattern));
    return tree.files.filter((f) => re.test(f));
}

/** Aliases, read from every tsconfig `paths` and every vite/vitest config `alias` object. */
export function discoverAliases(tree, ts, makeEvaluator) {
    const found = [];
    for (const f of tree.parsed) {
        if (/(^|\/)tsconfig[^/]*\.json$/.test(f)) {
            let json;
            try { json = JSON.parse(stripJsonComments(tree.read(f))); } catch { continue; }
            const paths = json.compilerOptions?.paths ?? {};
            const base = posix.join(posix.dirname(f), json.compilerOptions?.baseUrl ?? ".");
            for (const [k, vs] of Object.entries(paths)) {
                const key = k.replace(/\/\*$/, "");
                for (const v of vs) found.push({ key, target: posix.normalize(posix.join(base, v.replace(/\/\*$/, ""))), plane: f });
            }
        }
        if (/(^|\/)(vite|vitest|playwright)[^/]*\.(ts|mts|js|mjs)$/.test(f)) {
            const code = tree.read(f);
            const sf = ts.createSourceFile(f, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
            const { ev } = makeEvaluator(ts, sf, tree.abs(f), tree.root);
            const visit = (n) => {
                if (ts.isPropertyAssignment(n) && n.name.getText(sf).replace(/["']/g, "") === "alias" && ts.isObjectLiteralExpression(n.initializer)) {
                    for (const p of n.initializer.properties) {
                        if (!ts.isPropertyAssignment(p)) continue;
                        const key = ts.isStringLiteral(p.name) ? p.name.text : p.name.getText(sf);
                        const v = ev(p.initializer);
                        if (v.t === "path" || v.t === "url") found.push({ key, target: tree.rel(v.v), plane: f });
                        else found.push({ key, target: null, plane: f });
                    }
                }
                ts.forEachChild(n, visit);
            };
            visit(sf);
        }
    }
    const byKey = new Map();
    for (const a of found) {
        if (!byKey.has(a.key)) byKey.set(a.key, []);
        byKey.get(a.key).push(a);
    }
    const aliases = [];
    const conflicts = [];
    for (const [key, list] of byKey) {
        const targets = [...new Set(list.map((a) => a.target))];
        if (targets.length !== 1 || targets[0] === null) conflicts.push({ key, planes: list });
        aliases.push({ key, target: targets.find((t) => t !== null) ?? null, planes: list.map((a) => a.plane) });
    }
    aliases.sort((a, b) => b.key.length - a.key.length);
    return { aliases: aliases.filter((a) => a.target !== null), conflicts };
}

export function stripJsonComments(s) {
    let out = "";
    let i = 0;
    let inStr = false;
    while (i < s.length) {
        const c = s[i];
        if (inStr) {
            out += c;
            if (c === "\\") { out += s[i + 1] ?? ""; i += 2; continue; }
            if (c === '"') inStr = false;
            i++;
            continue;
        }
        if (c === '"') { inStr = true; out += c; i++; continue; }
        if (c === "/" && s[i + 1] === "/") { while (i < s.length && s[i] !== "\n") { out += " "; i++; } continue; }
        if (c === "/" && s[i + 1] === "*") { while (i < s.length && !(s[i] === "*" && s[i + 1] === "/")) { out += s[i] === "\n" ? "\n" : " "; i++; } out += "  "; i += 2; continue; }
        out += c;
        i++;
    }
    return out.replace(/,(\s*[}\]])/g, " $1");
}
