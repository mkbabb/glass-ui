// reorder.mjs --root <tree> --plant acc|out [--listing <json>] | --undo <saved.json>
// critique-B pass 5 · cascade plants. Written and hashed BEFORE reading pass-5/B-kit or B-proto.md.
//  acc: pass 4's regression. Move the @import that reaches `.accent-tone { --accent-band-strength }` after the one that
//       reaches `.glass-chip { --accent-band-strength }` in their nearest common parent (a risky pair; must read RED).
//  out: a reorder OUTSIDE the listed rung (REGISTRY §P4-8.4, P5-F3). Swap two adjacent @imports, both sheets holding
//       rules, in a parent under src/styles, where neither sheet's file name nor first selector appears in the route's
//       listing. Under the listing it must read RED (UNLISTED), risky pair or not.
// Writes <root>/.crit-reorder-undo.json; prints what moved. Exit 2 when the tree gives no candidate (reported, not hidden).
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, resolve, dirname, basename } from "node:path";

const arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const root = resolve(arg("--root"));
if (arg("--undo")) { const s = JSON.parse(readFileSync(arg("--undo"), "utf8")); writeFileSync(join(root, s.file), s.text); console.log(`UNDO ${s.file}`); process.exit(0); }
const css = [];
(function walk(d) { for (const e of readdirSync(join(root, d), { withFileTypes: true })) {
    if (["node_modules", ".git", "dist", "dist-demo", "__tests__"].includes(e.name) || e.isSymbolicLink()) continue;
    const p = `${d}/${e.name}`; if (e.isDirectory()) walk(p); else if (p.endsWith(".css")) css.push(p);
} })("src");
const T = Object.fromEntries(css.map((f) => [f, readFileSync(join(root, f), "utf8")]));
const imports = (f) => [...T[f].matchAll(/^\s*@import\s+(?:url\()?["']([^"']+)["'][^\n]*$/gm)]
    .map((m) => ({ line: m[0], to: join(dirname(f), m[1]).replace(/\\/g, "/") })).filter((x) => T[x.to] !== undefined);
const reach = (f, seen = new Set()) => { if (seen.has(f)) return seen; seen.add(f); for (const i of imports(f)) reach(i.to, seen); return seen; };
const save = (parent, text) => { writeFileSync(join(root, ".crit-reorder-undo.json"), JSON.stringify({ file: parent, text: T[parent] })); writeFileSync(join(root, parent), text); };
const mode = arg("--plant");
if (mode === "acc") {
    const declares = (f, cls) => new RegExp(`\\.${cls}\\b[^{]*\\{[^}]*--accent-band-strength\\s*:`).test(T[f]);
    const A = css.filter((f) => declares(f, "accent-tone")), G = css.filter((f) => declares(f, "glass-chip"));
    if (!A.length || !G.length) { console.log(`NO-PAIR accent-tone=${A} glass-chip=${G}`); process.exit(2); }
    for (const parent of css) {
        const im = imports(parent);
        const ia = im.findIndex((x) => A.some((a) => reach(x.to).has(a))), ig = im.findIndex((x) => G.some((g) => reach(x.to).has(g)));
        if (ia >= 0 && ig >= 0 && ia < ig) {
            const lines = T[parent].split("\n");
            const la = lines.findIndex((l) => l === im[ia].line), lg = lines.findIndex((l) => l === im[ig].line);
            const moved = lines.splice(la, 1)[0]; lines.splice(lg, 0, moved);
            save(parent, lines.join("\n"));
            console.log(`MOVED in ${parent}: ${moved.trim()}  after  ${im[ig].line.trim()}`); process.exit(0);
        }
    }
    console.log(`NO-COMMON-PARENT accent-tone in ${A} ; glass-chip in ${G}`); process.exit(2);
}
if (mode === "out") {
    const listing = arg("--listing") ? readFileSync(resolve(arg("--listing")), "utf8") : "";
    const firstSel = (f) => (T[f].replace(/\/\*[\s\S]*?\*\//g, "").match(/(^|\})\s*([^@{}][^{}]*?)\s*\{/) || [])[2]?.trim() ?? null;
    const hasRules = (f) => /\{[^}]*:[^}]*\}/.test(T[f].replace(/\/\*[\s\S]*?\*\//g, ""));
    const listed = (f) => listing.includes(basename(f)) || (firstSel(f) && listing.includes(firstSel(f)));
    for (const parent of css.filter((f) => f.startsWith("src/styles/")).sort()) {
        const im = imports(parent);
        for (let i = 0; i + 1 < im.length; i++) {
            const a = im[i].to, b = im[i + 1].to;
            if (!hasRules(a) || !hasRules(b) || listed(a) || listed(b) || listed(parent)) continue;
            const lines = T[parent].split("\n");
            const la = lines.findIndex((l) => l === im[i].line), lb = lines.findIndex((l) => l === im[i + 1].line);
            if (la < 0 || lb !== la + 1) continue;
            [lines[la], lines[lb]] = [lines[lb], lines[la]];
            save(parent, lines.join("\n"));
            console.log(`SWAPPED in ${parent}: ${im[i].line.trim()} <-> ${im[i + 1].line.trim()} (first selectors: ${firstSel(a)} | ${firstSel(b)})`);
            process.exit(0);
        }
    }
    console.log("NO-CANDIDATE: no adjacent unlisted @import pair with rules under src/styles"); process.exit(2);
}
console.log("usage: --plant acc|out | --undo f"); process.exit(9);
