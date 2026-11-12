// Public surface of the branch's dist against the 11.0.0 tarball: export names per entry
// (TypeScript checker), component props and emits by .d.ts text, custom properties and
// class names declared in the shipped CSS.
//   node compare.mjs <old-package-dir> <new-package-dir>
import ts from "typescript";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
const [oldDir, newDir] = process.argv.slice(2).map((p) => resolve(p));
const out = { exports: {}, dts: {}, css: {} };
const entries = (dir) => {
    const pkg = JSON.parse(readFileSync(join(dir, "package.json"), "utf8"));
    const m = {};
    for (const [k, v] of Object.entries(pkg.exports)) {
        const t = typeof v === "string" ? null : v.types ?? v.import?.types ?? null;
        if (t) m[k] = join(dir, t);
    }
    return m;
};
const namesOf = (files) => {
    const program = ts.createProgram(Object.values(files), { moduleResolution: ts.ModuleResolutionKind.Bundler, skipLibCheck: true, noEmit: true, allowJs: false });
    const checker = program.getTypeChecker();
    const r = {};
    for (const [k, f] of Object.entries(files)) {
        const sf = program.getSourceFile(f);
        const sym = sf && checker.getSymbolWithoutCheck?.(sf) || (sf && checker.getSymbolAtLocation(sf));
        r[k] = sym ? checker.getExportsOfModule(sym).map((s) => s.getName()).sort() : null;
    }
    return r;
};
const a = namesOf(entries(oldDir)), b = namesOf(entries(newDir));
for (const k of Object.keys(a)) {
    if (!b[k]) { out.exports[k] = "ENTRY MISSING"; continue; }
    if (!a[k] || !b[k]) { out.exports[k] = "unreadable"; continue; }
    const gone = a[k].filter((n) => !b[k].includes(n)), added = b[k].filter((n) => !a[k].includes(n));
    if (gone.length || added.length) out.exports[k] = { gone, added };
}
const walk = (dir, ext, acc = [], rel = "") => {
    for (const n of readdirSync(join(dir, rel))) {
        const p = join(rel, n);
        if (statSync(join(dir, p)).isDirectory()) walk(dir, ext, acc, p);
        else if (p.endsWith(ext)) acc.push(p);
    }
    return acc;
};
const oldD = walk(join(oldDir, "dist"), ".d.ts"), newD = new Set(walk(join(newDir, "dist"), ".d.ts"));
out.dts.missing = oldD.filter((p) => !newD.has(p));
out.dts.changed = oldD.filter((p) => newD.has(p) && readFileSync(join(oldDir, "dist", p), "utf8") !== readFileSync(join(newDir, "dist", p), "utf8"));
const cssFacts = (dir) => {
    const props = new Set(), classes = new Set();
    for (const p of walk(join(dir, "dist"), ".css")) {
        const s = readFileSync(join(dir, "dist", p), "utf8").replace(/url\([^)]*\)/g, "");
        for (const m of s.matchAll(/(?<![\w-])(--[A-Za-z0-9_-]+)\s*:/g)) props.add(m[1]);
        for (const m of s.matchAll(/@property\s+(--[A-Za-z0-9_-]+)/g)) props.add(m[1]);
        for (const m of s.matchAll(/\.([A-Za-z_][A-Za-z0-9_-]*)(?=[\s,{:.>+~\[)])/g)) classes.add(m[1]);
    }
    return { props, classes };
};
const ca = cssFacts(oldDir), cb = cssFacts(newDir);
out.css.propsGone = [...ca.props].filter((p) => !cb.props.has(p)).sort();
out.css.propsAdded = [...cb.props].filter((p) => !ca.props.has(p)).sort();
out.css.classesGone = [...ca.classes].filter((p) => !cb.classes.has(p)).sort();
out.css.classesAdded = [...cb.classes].filter((p) => !ca.classes.has(p)).sort();
console.log(JSON.stringify(out, null, 2));
