#!/usr/bin/env node
// plants-transcribed.mjs — post-hash transcriptions of battery plants whose premise did not hold
// on the migrated tree, or whose planting was defective (disclosed in critique-G.md §3):
//   K-B8t   battery K-B8 spelled `Badge.vue.vue` (unresolved, so E0 caught a typo, not B8)
//   K-E4t   battery K-E4 nested its 13 peers under a dominating barrel (E2 bit, E4 untested)
//   K-B35t  battery K-B35's bin comment-census.mjs left scripts/ by L6.0
//   K-B38t  B-38 (a helper two bins share, placed inside another module)
//   K-P21b  the P21 class with a registration of the fallback's target elsewhere untouched: a
//           `.catch(() => import(<live file>))` fallback onto a live sibling
//   K-S07g  battery K-S07 judged by the landed graph's census, not the gate
// Judged by clause counts (gate-counts.mjs). Same journal-and-restore discipline as plants.mjs.
//   node plants-transcribed.mjs --tree T [--out r.json]
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
const args = process.argv.slice(2);
const T = path.resolve(args[args.indexOf("--tree") + 1]);
const OUT = args.includes("--out") ? args[args.indexOf("--out") + 1] : "";
const HERE = path.dirname(new URL(import.meta.url).pathname);
function walk(d, a = []) { if (!fs.existsSync(d)) return a; for (const e of fs.readdirSync(d, { withFileTypes: true })) { if (e.name === "node_modules" || e.name.startsWith(".")) continue; const p = path.join(d, e.name); e.isDirectory() ? walk(p, a) : a.push(p); } return a; }
const find = (b, z = "src") => { const h = walk(path.join(T, z)).filter((f) => path.basename(f) === b).sort((x, y) => x.length - y.length); if (!h.length) throw new Error(`not found ${b}`); return h[0]; };
const rel = (from, to) => { let r = path.relative(path.dirname(from), to); return r.startsWith(".") ? r : "./" + r; };
let J = new Map();
const put = (f, t) => { if (!J.has(f)) J.set(f, fs.existsSync(f) ? fs.readFileSync(f) : null); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, t); };
const edit = (f, fn) => put(f, fn(fs.readFileSync(f, "utf8")));
const restore = () => { const ds = []; for (const [f, b] of J) { if (b === null) { fs.rmSync(f, { force: true }); ds.push(path.dirname(f)); } else fs.writeFileSync(f, b); } for (let d of ds) while (d.startsWith(T) && d !== T && fs.existsSync(d) && !fs.readdirSync(d).length) { fs.rmdirSync(d); d = path.dirname(d); } J = new Map(); };
const addScript = (sfc, line) => edit(sfc, (s) => { const m = s.match(/<script\b(?:[^>"']|"[^"]*"|'[^']*')*>\n/); return s.replace(m[0], m[0] + line + "\n"); });
const prepend = (f, line) => edit(f, (s) => (s.startsWith("#!") ? s.replace(/\n/, `\n${line}\n`) : `${line}\n${s}`));
const counts = () => Object.fromEntries(spawnSync("node", [path.join(HERE, "gate-counts.mjs"), "--lines"], { cwd: T, encoding: "utf8", maxBuffer: 1 << 28 }).stdout.split("\n").filter((l) => /^\S+ \d+$/.test(l)).map((l) => l.split(" ")).map(([k, n]) => [k, +n]));
const lines = () => spawnSync("node", [path.join(HERE, "gate-counts.mjs"), "--lines"], { cwd: T, encoding: "utf8", maxBuffer: 1 << 28 }).stdout.split("\n").filter((l) => l.startsWith("  "));
const census = () => { const r = spawnSync("node", ["scripts/structure/graph.mjs", "--root", T], { cwd: T, encoding: "utf8", maxBuffer: 1 << 28 }); return (r.stdout.match(/computed-read/g) ?? []).length; };

const plants = [
    { id: "K-B8t", item: "G-04", expect: "RED", run() { const k = find("useRAFLoop.ts"); edit(k, (s) => `import type __ZzBadge from "${rel(k, find("Badge.vue"))}";\n` + s); } },
    { id: "K-E4t", item: "G-02", expect: "RED", run() { const b = find("Badge.vue"); const d = path.dirname(b); const imp = []; for (let i = 0; i < 13; i++) { put(path.join(d, `zzPeer${i}.ts`), `export const zp${i} = ${i};\n`); imp.push(`import { zp${i} } from "./zzPeer${i}";`); } addScript(b, imp.join("\n") + `\nvoid [${Array.from({ length: 13 }, (_, i) => `zp${i}`).join(",")}];`); } },
    { id: "K-B35t", item: "G-06", expect: "RED", run() { const bin = find("profile-bundle.mjs", "scripts"); const h = path.join(T, "scripts/structure/zz-profile-private.mjs"); put(h, "export const pp = () => 1;\n"); prepend(bin, `import { pp as __zzPP } from "${rel(bin, h)}"; void __zzPP;`); } },
    { id: "K-B38t", item: "G-06", expect: "RED", run() { const a = find("profile-bundle.mjs", "scripts"), b = find("verify-export-types.mjs", "scripts"); const h = path.join(T, "scripts/structure/lib/zz-shared.mjs"); put(h, "export const sh = () => 1;\n"); prepend(a, `import { sh as __zzA } from "${rel(a, h)}"; void __zzA;`); prepend(b, `import { sh as __zzB } from "${rel(b, h)}"; void __zzB;`); } },
    { id: "K-P21b", item: "G-04", expect: "RED", run() { const d = find("DockControl.vue"); const live = find("DockSeparator.vue"), other = find("DockTrigger.vue"); addScript(d, `const __zzFb = import("${rel(d, live)}").catch(() => import("${rel(d, other)}"));\nvoid __zzFb;`); } },
];
const out = [];
const b0 = counts(), l0 = new Set(lines());
for (const p of plants) {
    let err = null, c = null, fresh = [];
    try { p.run(); c = counts(); fresh = lines().filter((l) => !l0.has(l)); } catch (e) { err = e.message; }
    restore();
    const rose = c ? Object.keys(c).filter((k) => c[k] > b0[k]).map((k) => `${k} ${b0[k]}→${c[k]}`) : [];
    const verdict = err ? "NOT-PLANTED" : rose.length ? "CAUGHT" : "MISSED";
    out.push({ id: p.id, item: p.item, verdict, rose, fresh: fresh.slice(0, 6), err });
    console.log(`${p.id.padEnd(8)} ${p.item} ${verdict.padEnd(11)} ${rose.join(", ")} ${err ?? ""}`);
    for (const l of fresh.slice(0, 3)) console.log(`      ${l.slice(0, 220)}`);
}
// K-S07g: the census row
const c0 = census();
const f = path.join(T, "scripts", "zz-critg-computed.mjs");
put(f, 'import { join } from "node:path";\nimport { readFileSync } from "node:fs";\nexport const readIt = (n) => readFileSync(join(process.cwd(), "src/components/" + n), "utf8");\n');
const c1 = census(); restore();
console.log(`K-S07g   S-07 ${c1 > c0 ? "CAUGHT" : "MISSED"}      computed-read mentions in graph output ${c0}→${c1}`);
out.push({ id: "K-S07g", item: "S-07", verdict: c1 > c0 ? "CAUGHT" : "MISSED", census: [c0, c1] });
if (OUT) fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
