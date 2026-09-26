// reorder.mjs --root <tree> [--undo <saved.json>] · the §P3-8.4 cascade plant (B-08, P4-F7): swap two rules that declare
// one property on co-occurring classes, by moving the sheet that holds `.accent-tone { --accent-band-strength }` after the
// sheet that holds `.glass-chip { --accent-band-strength }` in their nearest common @import parent. Prints what it moved.
// Written and hashed before reading the pass-4 kit. Exit 2 if the tree gives no such pair (a finding, reported as SKIP).
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, resolve, dirname, relative } from "node:path";

const arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const root = resolve(arg("--root"));
if (arg("--undo")) {
    const s = JSON.parse(readFileSync(arg("--undo"), "utf8"));
    writeFileSync(join(root, s.file), s.text); console.log(`UNDO ${s.file}`); process.exit(0);
}
const css = [];
(function walk(d) { for (const e of readdirSync(join(root, d), { withFileTypes: true })) {
    if (["node_modules", ".git", "dist", "dist-demo"].includes(e.name) || e.isSymbolicLink()) continue;
    const p = `${d}/${e.name}`; if (e.isDirectory()) walk(p); else if (p.endsWith(".css")) css.push(p);
} })("src");
const T = Object.fromEntries(css.map((f) => [f, readFileSync(join(root, f), "utf8")]));
const declares = (f, cls) => new RegExp(`\\.${cls}\\b[^{]*\\{[^}]*--accent-band-strength\\s*:`).test(T[f]);
const imports = (f) => [...T[f].matchAll(/^\s*@import\s+(?:url\()?["']([^"']+)["'][^\n]*$/gm)].map((m) => ({ line: m[0], to: join(dirname(f), m[1]).replace(/\\/g, "/") })).filter((x) => T[x.to] !== undefined);
const reach = (f, seen = new Set()) => { if (seen.has(f)) return seen; seen.add(f); for (const i of imports(f)) reach(i.to, seen); return seen; };
const A = css.filter((f) => declares(f, "accent-tone"));
const G = css.filter((f) => declares(f, "glass-chip"));
if (!A.length || !G.length) { console.log(`NO-PAIR accent-tone=${A} glass-chip=${G}`); process.exit(2); }
for (const parent of css) {
    const im = imports(parent);
    const ia = im.findIndex((x) => A.some((a) => reach(x.to).has(a)));
    const ig = im.findIndex((x) => G.some((g) => reach(x.to).has(g)));
    if (ia >= 0 && ig >= 0 && ia < ig) {
        const lines = T[parent].split("\n");
        const la = lines.findIndex((l) => l === im[ia].line), lg = lines.findIndex((l) => l === im[ig].line);
        const moved = lines.splice(la, 1)[0];
        lines.splice(lg, 0, moved); // lg shifted by one after the splice: lands right after the glass-chip import
        const saved = { file: parent, text: T[parent] };
        writeFileSync(join(root, parent), lines.join("\n"));
        writeFileSync(join(root, ".reorder-undo.json"), JSON.stringify(saved));
        console.log(`MOVED in ${parent}: ${moved.trim()}  after  ${im[ig].line.trim()}`);
        process.exit(0);
    }
}
// accent-tone may arrive by a non-@import channel (a JS or <style> load); then the plant cannot be cut by @import order
console.log(`NO-COMMON-PARENT accent-tone in ${A.join(",")} ; glass-chip in ${G.join(",")}`);
process.exit(2);
