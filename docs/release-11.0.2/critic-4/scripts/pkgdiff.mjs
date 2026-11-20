// Critic 4: the built package against the published one.
//   node pkgdiff.mjs <published package dir> <tip repo dir>
// Prints: files gone (content hashes folded), export names gone per exports target (.js by
// es-module-lexer following `export *`, .d.ts by the TypeScript checker), declaration
// files gone or changed, and custom properties declared or read in one tree's CSS and JS
// and not the other's.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
const [PUB, TIP] = process.argv.slice(2);
const require = createRequire(path.join(TIP, "package.json"));
const { init, parse } = await import(require.resolve("es-module-lexer"));
const ts = require("typescript");
await init;
const walk = (d, b = d, o = []) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); e.isDirectory() ? walk(p, b, o) : o.push(path.relative(b, p)); } return o; };
const fold = (f) => f.replace(/-[A-Za-z0-9_-]{8}(\.(js|css|d\.ts|map))$/, "-HASH$1");
const fp = walk(path.join(PUB, "dist")), ft = walk(path.join(TIP, "dist"));
const sp = new Set(fp.map(fold)), st = new Set(ft.map(fold));
console.log(`files: published ${fp.length}, tip ${ft.length}`);
console.log("  gone:", [...sp].filter((x) => !st.has(x)));
console.log("  new:", [...st].filter((x) => !sp.has(x)));
const jsExports = (file, seen = new Set()) => {
    if (seen.has(file)) return new Set(); seen.add(file);
    const src = fs.readFileSync(file, "utf8"); const [imps, exps] = parse(src); const out = new Set(exps.map((e) => e.n));
    for (const m of src.matchAll(/export\s*\*\s*from\s*["']([^"']+)["']/g)) if (m[1].startsWith(".")) for (const n of jsExports(path.resolve(path.dirname(file), m[1]), seen)) out.add(n);
    return out;
};
const dtsExports = (root, files) => {
    const prog = ts.createProgram(files, { skipLibCheck: true, noEmit: true, moduleResolution: ts.ModuleResolutionKind.Bundler, module: ts.ModuleKind.ESNext, types: [], baseUrl: TIP, typeRoots: [path.join(TIP, "node_modules/@types")] });
    const ck = prog.getTypeChecker(); const o = {};
    for (const f of files) { const sf = prog.getSourceFile(f); const sym = sf && ck.getSymbolAtLocation(sf); o[path.relative(root, f)] = new Set(sym ? ck.getExportsOfModule(sym).map((s) => s.name) : []); }
    return o;
};
const targets = (pkg) => { const o = new Set(); const rec = (v) => { if (typeof v === "string") o.add(v); else if (v) Object.values(v).forEach(rec); }; rec(pkg.exports); return [...o]; };
const pp = JSON.parse(fs.readFileSync(path.join(PUB, "package.json"))), pt = JSON.parse(fs.readFileSync(path.join(TIP, "package.json")));
const tp = targets(pp), tt = targets(pt);
console.log(`export targets: published ${tp.length}, tip ${tt.length}; targets gone:`, tp.filter((x) => !tt.includes(x)));
let njs = 0, ndts = 0, gone = 0;
for (const t of tp.filter((x) => x.endsWith(".js"))) {
    const a = jsExports(path.join(PUB, t)), b = jsExports(path.join(TIP, t)); njs++;
    const g = [...a].filter((n) => !b.has(n)), n = [...b].filter((x) => !a.has(x));
    if (g.length) { gone += g.length; console.log("  JS GONE", t, g); } if (n.length) console.log("  js new", t, n);
}
const dts = tp.filter((x) => x.endsWith(".d.ts"));
const da = dtsExports(PUB, dts.map((t) => path.join(PUB, t))), db = dtsExports(TIP, dts.map((t) => path.join(TIP, t)));
for (const t of dts) { const k = path.normalize(t); const a = da[k], b = db[k]; ndts++; if (!a.size) console.log("  (no symbols read)", t);
    const g = [...a].filter((n) => !b.has(n)), n = [...b].filter((x) => !a.has(x));
    if (g.length) { gone += g.length; console.log("  DTS GONE", t, g); } if (n.length) console.log("  dts new", t, n);
}
console.log(`export names: ${njs} .js and ${ndts} .d.ts targets read; names gone: ${gone}`);
const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "").replace(/\s+/g, " ");
const dp = fp.filter((f) => f.endsWith(".d.ts")), dtSet = new Set(ft);
console.log(`declarations: published ${dp.length}; gone:`, dp.filter((f) => !dtSet.has(f)));
const changed = dp.filter((f) => dtSet.has(f) && strip(fs.readFileSync(path.join(PUB, "dist", f), "utf8")) !== strip(fs.readFileSync(path.join(TIP, "dist", f), "utf8")));
console.log("  changed apart from comments:", changed);
const props = (root, files) => { const dec = new Set(), read = new Set(); for (const f of files.filter((x) => /\.(css|js)$/.test(x))) { const s = fs.readFileSync(path.join(root, "dist", f), "utf8");
    for (const m of s.matchAll(/(?<![\w-])(--[a-zA-Z_][\w-]*)\s*:/g)) dec.add(m[1]); for (const m of s.matchAll(/var\(\s*(--[a-zA-Z_][\w-]*)/g)) read.add(m[1]);
    for (const m of s.matchAll(/@property\s+(--[\w-]+)/g)) dec.add(m[1]); } return { dec, read }; };
const A = props(PUB, fp), B = props(TIP, ft);
console.log(`custom properties declared: published ${A.dec.size}, tip ${B.dec.size}`);
console.log("  declared in 11.0.1, not on the tip:", [...A.dec].filter((x) => !B.dec.has(x)).map((x) => `${x}${B.read.has(x) ? " (still read)" : " (NOT READ)"}`));
console.log("  new on the tip:", [...B.dec].filter((x) => !A.dec.has(x)));
console.log("  read in 11.0.1, read nowhere on the tip:", [...A.read].filter((x) => !B.read.has(x)).map((x) => `${x}${B.dec.has(x) ? " (still declared)" : ""}`));
