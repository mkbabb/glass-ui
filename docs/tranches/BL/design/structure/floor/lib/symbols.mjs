// symbols.mjs — reader counting by symbol through barrels (R-2). A file's readers are the
// files that consume a symbol whose ORIGIN is that file. Re-exports (`export … from`,
// `export *`, and `import x; export { x }`) forward a symbol; they never read it, so a
// barrel or a public door is not a reader of what it re-exports.
const MODULE_EDGE = /^(import|import-type|import-side-effect|import-type-node|reexport|reexport-star|reexport-ns|dynamic|require|vi-mock)$/;
/** Edges that load a file's content (a read of the whole file). A Tailwind `@source` scan,
 *  a path string, a scanner, a write and an absence guard are couplings, not reads. */
const FILE_READ = /^((sfc-inline-)?css-(import|url|reference|plugin|config)|sfc-(style|script|template)-src|template-asset|new-url|glob|dynamic-template|html-ref|ts-reference)$/;

export function makeOrigins(graph) {
    const byFile = new Map();
    for (const e of graph.edges) {
        if (!byFile.has(e.from)) byFile.set(e.from, []);
        byFile.get(e.from).push(e);
    }
    const edgeOfRef = (file, idx) => (byFile.get(file) ?? []).find((e) => e.refIndex === idx) ?? null;
    const memo = new Map();

    /** name → [{file, name}] origins exported by `file` ("*" = the whole module). */
    function exportsOf(file, stack = new Set()) {
        if (memo.has(file)) return memo.get(file);
        if (stack.has(file)) return new Map();
        stack.add(file);
        const table = new Map();
        const put = (name, origins) => { if (!table.has(name)) table.set(name, []); table.get(name).push(...origins); };
        const info = graph.exportsOf.get(file);
        if (!info) {
            // CSS, JSON, assets: the file itself is the origin of everything read from it
            memo.set(file, table);
            return table;
        }
        for (const n of info.own) put(n, [{ file, name: n }]);
        for (const { local, exported } of info.local) {
            const b = info.importBindings.get(local);
            const e = b ? edgeOfRef(file, b.ref) : null;
            if (e?.to) put(exported, b.imported === "*" ? [{ file: e.to, name: "*" }] : originOf(e.to, b.imported, stack));
            else put(exported, [{ file, name: local }]);
        }
        for (const e of byFile.get(file) ?? []) {
            if (!e.to) continue;
            if (e.kind === "reexport") for (const n of e.names ?? []) put(n.exported, originOf(e.to, n.imported, stack));
            if (e.kind === "reexport-ns") for (const n of e.names ?? []) put(n.exported, [{ file: e.to, name: "*" }]);
            if (e.kind === "reexport-star") for (const [n, o] of exportsOf(e.to, stack)) if (n !== "default") put(n, o);
        }
        stack.delete(file);
        memo.set(file, table);
        return table;
    }

    function originOf(file, name, stack = new Set()) {
        if (name === "*") return [{ file, name: "*" }];
        const t = exportsOf(file, stack);
        return t.get(name) ?? [{ file, name }];
    }

    /** Expand an origin list to the files it lands on (a namespace lands on every origin). */
    function files(origins, seen = new Set()) {
        const out = new Set();
        for (const o of origins) {
            if (o.name !== "*") { out.add(o.file); continue; }
            if (seen.has(o.file)) continue;
            seen.add(o.file);
            const t = exportsOf(o.file);
            if (!t.size) out.add(o.file);
            for (const os of t.values()) for (const f of files(os, seen)) out.add(f);
        }
        return out;
    }

    /** reader file → Set of origin files it reads (forwarding excluded). */
    function readsOf(file) {
        const info = graph.exportsOf.get(file);
        const forwarded = new Set((info?.local ?? []).map((x) => x.local));
        const out = new Set();
        for (const e of byFile.get(file) ?? []) {
            if (!e.to || e.dir) continue;
            if (e.kind.startsWith("reexport")) continue;
            if (MODULE_EDGE.test(e.kind) && e.names?.length) {
                const used = e.names.filter((n) => !forwarded.has(n.local));
                if (!used.length) continue;
                for (const n of used) for (const f of files(originOf(e.to, n.imported))) out.add(f);
                continue;
            }
            if (e.kind === "dynamic" || e.kind === "require" || e.kind === "vi-mock") { for (const f of files([{ file: e.to, name: "*" }])) out.add(f); continue; }
            if (FILE_READ.test(e.kind)) out.add(e.to);
        }
        out.delete(file);
        return out;
    }
    return { exportsOf, originOf, files, readsOf };
}
