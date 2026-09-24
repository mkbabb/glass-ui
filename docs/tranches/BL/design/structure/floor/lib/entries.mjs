// entries.mjs — F-3: the ONE entry record. `name → source path`, in the published
// order. The package.json `exports` + `typesVersions`, the vite entry map, the
// style-fold's entry walk and the graph's self-name resolution all read it.
//
// Fail-closed guard (the successor of subpath-policy's unclassified-dir error): every
// `index.ts` barrel under src/ is either an entry source or a declared door, every
// declared path exists and is non-empty, no name repeats, no source serves two names,
// and the cascade's declared terminal exists. Placement is free: a source may live
// anywhere; only the record names the door.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { DEFAULT_ROOT } from "./tree.mjs";

export const RECORD_PATH = "docs/tranches/BL/design/structure/floor/records/entry-record.json";

export function loadRecord(tree) {
    return JSON.parse(tree.read(RECORD_PATH));
}

/** src/<p> ships at dist/<p>; the styles and fonts copies preserve the relative path. */
export function distOf(source) {
    if (!source.startsWith("src/")) throw new Error(`entry-record: source outside src/: ${source}`);
    return `dist/${source.slice(4)}`;
}

export function validateRecord(record, tree) {
    const v = [];
    const names = new Set();
    const sources = new Map();
    const nonEmpty = (p) => tree.isFile(p) && (tree.read(p) ?? "").length > 0;
    for (const [name, source] of record.js) {
        if (names.has(name)) v.push({ kind: "duplicate-name", name });
        names.add(name);
        if (sources.has(source)) v.push({ kind: "two-names-one-source", name, other: sources.get(source), source });
        sources.set(source, name);
        if (!nonEmpty(source)) v.push({ kind: "entry-source-missing", name, source });
    }
    for (const [key, target] of record.css) {
        if (target.source && !nonEmpty(target.source)) v.push({ kind: "css-source-missing", key, source: target.source });
        if (target.assets && !tree.isDir(target.assets.replace(/\/$/, ""))) v.push({ kind: "asset-root-missing", key, root: target.assets });
    }
    const doors = new Set(record.doors);
    for (const d of record.doors) {
        if (!tree.isFile(d)) v.push({ kind: "stale-door", door: d });
        if (sources.has(d)) v.push({ kind: "door-is-entry", door: d });
    }
    for (const f of tree.files) {
        if (!f.startsWith("src/") || !/(^|\/)index\.ts$/.test(f)) continue;
        if (!sources.has(f) && !doors.has(f)) v.push({ kind: "undeclared-door", door: f });
    }
    if (!record.cascade?.terminal || !nonEmpty(record.cascade.terminal)) v.push({ kind: "terminal-missing", terminal: record.cascade?.terminal });
    return v;
}

export function emitExports(record) {
    const exp = {};
    const tv = {};
    for (const [name] of record.js) {
        if (name === "index") {
            exp["."] = { types: "./dist/index.d.ts", import: "./dist/glass-ui.js", default: "./dist/glass-ui.js" };
            continue;
        }
        const dts = record.types?.[name] ?? `./dist/${name}.d.ts`;
        exp[`./${name}`] = { types: dts, import: `./dist/${name}.js` };
        tv[name] = [dts.replace(/^\.\//, "")];
    }
    if (!exp["."]) throw new Error("entry-record: no `index` entry for the root key");
    const ordered = { ".": exp["."] };
    for (const [k, v] of Object.entries(exp)) if (k !== ".") ordered[k] = v;
    for (const [key, target] of record.css) {
        if (target.source) ordered[key] = `./${distOf(target.source)}`;
        else if (target.generated) ordered[key] = `./dist/${target.generated}`;
        else if (target.assets) ordered[key] = `./${distOf(target.assets)}*`;
        else throw new Error(`entry-record: css key ${key} has no source, generated or assets target`);
    }
    return { exports: ordered, typesVersions: { "*": tv } };
}

/** The subpath → source map the graph resolves `@mkbabb/glass-ui[/sub]` through. */
export function selfNameTable(record) {
    const t = new Map();
    for (const [name, source] of record.js) t.set(name === "index" ? "" : name, { source });
    for (const [key, target] of record.css) {
        const sub = key.replace(/^\.\/?/, "");
        if (target.source) t.set(sub, { source: target.source });
        else if (target.generated) t.set(sub, { generated: target.generated });
        else if (target.assets) t.set(sub, { assets: target.assets });
    }
    return t;
}

/** Vite's entry map, `{ name: absolutePath }`. Throws on any guard violation. */
export function entryMap(tree) {
    const record = loadRecord(tree);
    const v = validateRecord(record, tree);
    if (v.length) throw new Error(`entry-record: ${v.length} violation(s) — ${v.map((x) => JSON.stringify(x)).join("; ")}`);
    const map = {};
    for (const [name, source] of record.js) map[name] = join(tree.root, source);
    return map;
}

/** The style-fold's view: the JS entry sources and the non-JS export table. */
export function styleEntries(tree) {
    const record = loadRecord(tree);
    return { sources: record.js.map(([, s]) => s), css: record.css, terminal: record.cascade.terminal };
}

export function compareToPackage(record, pkg) {
    const emitted = emitExports(record);
    const a = JSON.stringify(pkg.exports);
    const b = JSON.stringify(emitted.exports);
    const c = JSON.stringify(pkg.typesVersions);
    const d = JSON.stringify(emitted.typesVersions);
    return {
        exportKeys: Object.keys(emitted.exports).length,
        typesVersions: Object.keys(emitted.typesVersions["*"]).length,
        jsEntries: record.js.length,
        exportsByteEqual: a === b,
        typesVersionsByteEqual: c === d,
        emitted,
    };
}

export function fileSize(root, p) {
    try { return statSync(join(root, p)).size; } catch { return -1; }
}

export function readJson(root, p) {
    return JSON.parse(readFileSync(join(root, p), "utf8"));
}

// ---- the build-time reader (no git: a filesystem view of the tree) -----------------

function diskTree(root) {
    const files = [];
    const walk = (dir) => {
        for (const d of readdirSync(join(root, dir), { withFileTypes: true })) {
            const rel = `${dir}/${d.name}`;
            if (d.isDirectory()) walk(rel);
            else if (d.name === "index.ts") files.push(rel);
        }
    };
    walk("src");
    const stat = (p) => { try { return statSync(join(root, p)); } catch { return null; } };
    return {
        root,
        files,
        isFile: (p) => !!stat(p)?.isFile(),
        isDir: (p) => !!stat(p)?.isDirectory(),
        read: (p) => readFileSync(join(root, p), "utf8"),
    };
}

/** Load and validate the record from disk; any guard violation throws (the build stops). */
export function diskRecord(root) {
    const tree = diskTree(root);
    const record = loadRecord(tree);
    const v = validateRecord(record, tree);
    if (v.length) throw new Error(`entry-record: ${v.length} violation(s) — ${v.map((x) => JSON.stringify(x)).join("; ")}`);
    return record;
}

/** Vite's entry map, `{ name: absolutePath }`, from the record (fail-closed). */
export function libraryEntryMap(root = DEFAULT_ROOT) {
    const map = {};
    for (const [name, source] of diskRecord(root).js) map[name] = join(root, source);
    return map;
}

/** `{ name: "src/…" }` for the declaration projector. */
export function recordEntries(root = DEFAULT_ROOT) {
    return Object.fromEntries(diskRecord(root).js);
}

/** The non-JS export keys and their dist targets, as emitted into package.json. */
export function recordCssExports(root = DEFAULT_ROOT) {
    const { exports } = emitExports(diskRecord(root));
    return Object.fromEntries(Object.entries(exports).filter(([, v]) => typeof v === "string"));
}

/** The declared cascade terminal (src path). */
export function recordTerminal(root = DEFAULT_ROOT) {
    return diskRecord(root).cascade.terminal;
}
