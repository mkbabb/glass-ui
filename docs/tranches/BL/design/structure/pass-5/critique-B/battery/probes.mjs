// probes.mjs --root <tree> [--out <json>] · critique-B pass 5 · gate-independent census of the replayed tree.
// Written and hashed BEFORE reading pass-5/B-kit or B-proto.md. Each probe prints `PROBE <id> <item> <count> <detail>`
// and its hits, so a gate's zero can be compared to a count this battery makes on its own.
//  BOUNDS-DIR  (B-01/B-10, R-5, P3-R3): dirs in the five zones with > 12 direct files; kind slots bounded the same.
//  BOUNDS-LOC  (B-01/B-10, R-5): hand-written source files > 500 lines (a file whose head says it is generated is listed apart).
//  PH-NAMES    (B-07): file/dir stems that read as placeholders or provenance (utils, helpers, misc, common, part-N,
//              -N, digit-suffixed stems, wave ids). Listed for review; the gate's B15 verdict is compared per hit.
//  MASK        (S-14): every masking shape in every code file of the five zones plus root vite.*.ts.
//  B2-REACH    (B-01, P4-R1): a consumer-zone file (demo, tests, tests-visual, scripts, or a src __tests__ outside the
//              file's unit) importing a src file by relative path, alias or package deep path rather than an entry.
import { readFileSync, readdirSync, writeFileSync, statSync } from "node:fs";
import { join, resolve, dirname, basename, relative } from "node:path";

const arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const root = resolve(arg("--root"));
const ZONES = ["src", "demo", "scripts", "tests", "tests-visual"];
const SKIPD = new Set(["node_modules", ".git", "dist", "dist-demo", "test-results", "playwright-report", ".cache"]);
const files = [], dirsAll = [];
for (const z of ZONES) (function walk(d) {
    let ents; try { ents = readdirSync(join(root, d), { withFileTypes: true }); } catch { return; }
    dirsAll.push(d);
    for (const e of ents) { if (SKIPD.has(e.name) || e.isSymbolicLink()) continue; const p = `${d}/${e.name}`; if (e.isDirectory()) walk(p); else files.push(p); }
})(z);
for (const f of readdirSync(root)) if (/^vite\..*\.ts$/.test(f)) files.push(f);
const out = {};
const say = (id, item, hits, detail = "") => { out[id] = hits; console.log(`PROBE ${id} ${item} ${hits.length} ${detail}`); for (const h of hits.slice(0, 400)) console.log(`   ${h}`); };
const CODE = /\.(ts|mts|mjs|js|cjs|vue|tsx)$/;
const read = (f) => readFileSync(join(root, f), "utf8");

// BOUNDS
const SLOTS = new Set(["composables", "__tests__", "styles"]);
const direct = (d) => readdirSync(join(root, d), { withFileTypes: true }).filter((e) => e.isFile()).length;
say("BOUNDS-DIR", "B-01/B-10", dirsAll.filter((d) => direct(d) > 12).map((d) => `${d} ${direct(d)}${SLOTS.has(basename(d)) ? " (kind slot)" : ""}`));
const loc = files.filter((f) => /\.(ts|mts|mjs|js|vue|css)$/.test(f) && !f.endsWith(".d.ts")).map((f) => [f, read(f)]).filter(([, t]) => t.split("\n").length - (t.endsWith("\n") ? 1 : 0) > 500);
const gen = (t) => /generated|do not edit|auto-?gen/i.test(t.slice(0, 400));
say("BOUNDS-LOC", "B-01/B-10", loc.filter(([, t]) => !gen(t)).map(([f, t]) => `${f} ${t.split("\n").length - 1}`));
say("BOUNDS-LOC-GEN", "B-01/B-10 info", loc.filter(([, t]) => gen(t)).map(([f, t]) => `${f} ${t.split("\n").length - 1}`));

// PH-NAMES
const stem = (p) => basename(p).replace(/\.(visual|test|spec|stories|story)?\.?(ts|mts|mjs|js|vue|css|tsx|json|html)$/, "").replace(/\.(visual|test|spec)$/, "");
const PH = /^(utils?|helpers?|misc|common|shared|stuff|tmp|temp|lib|core|base|part|chunk|new|old)(\d+)?$|^part-?\d+$|-\d+$|^[a-z]+[A-Za-z]*\d+$|^[A-Z][A-Za-z]*\d+$|^(w|bs|b-s|s)\d+$|^v\d+$|[Pp]art\d+$|[Ss]plit$/;
const phHits = [...new Set([...files, ...dirsAll].map((p) => [p, stem(p)]).filter(([, s]) => PH.test(s)).map(([p]) => p))];
say("PH-NAMES", "B-07", phHits.filter((p) => !/\.(png|jpe?g|svg|woff2?|json|html|md|snap)$/.test(p)), "(review list; a digit in a real concept name is legitimate)");

// MASK (S-14)
const shapes = [
    ["early-return", /if\s*\(\s*!\s*(?:fs\.)?existsSync\s*\([^)]*\)\s*\)\s*\{?\s*return\b/],
    ["ternary", /(?:fs\.)?existsSync\s*\([^()]*(?:\([^()]*\))?[^()]*\)\s*\?/],
    ["positive-guard", /if\s*\(\s*(?:fs\.)?existsSync\s*\(/],
    ["catch-return", /catch\s*(?:\([^)]*\))?\s*\{\s*(?:return\b|\/\*|\/\/|\})/],
    ["catch-fn", /\.catch\s*\(\s*(?:\(\s*\w*\s*\)|\w+)\s*=>\s*(?:null|undefined|void 0|\{\s*\}|""|''|``|\[\]|false|0|\(\s*\{\s*\}\s*\))/],
    ["then-reject", /\.then\s*\([^;]*?,\s*(?:\(\s*\w*\s*\)|\w+)\s*=>/],
    ["catch-noop", /\.catch\s*\(\s*(?:noop|\(\)\s*=>\s*\{\s*\})\s*\)/],
];
const mask = [];
for (const f of files.filter((f) => CODE.test(f))) {
    const lines = read(f).split("\n");
    lines.forEach((l, i) => { for (const [n, re] of shapes) if (re.test(l)) mask.push(`${f}:${i + 1} ${n} :: ${l.trim().slice(0, 140)}`); });
}
say("MASK", "S-14", mask, "(candidate sites; each is judged by reading it, not by the regex alone)");

// B2-REACH
const unitOf = (f) => { const m = f.match(/^(src\/.*?)\/__tests__\//); return m ? m[1] : null; };
const reach = [];
const IMP = /(?:import|export)\s+(?:type\s+)?(?:[^'"`;]*?\sfrom\s+)?["']([^"']+)["']|import\s*\(\s*["']([^"']+)["']\s*\)|vi\.mock\s*\(\s*["']([^"']+)["']|import\.meta\.glob\s*\(\s*["']([^"']+)["']/g;
for (const f of files.filter((f) => CODE.test(f))) {
    const consumer = !f.startsWith("src/") || unitOf(f);
    if (!consumer) continue;
    for (const m of read(f).matchAll(IMP)) {
        const s = m[1] || m[2] || m[3] || m[4];
        let target = null;
        if (s.startsWith(".")) target = join(dirname(f), s).replace(/\\/g, "/");
        else if (s.startsWith("@/")) target = `src/${s.slice(2)}`;
        else if (/^@mkbabb\/glass-ui\/(src|dist)\//.test(s)) target = s.replace(/^@mkbabb\/glass-ui\//, "");
        if (!target || !target.startsWith("src/")) continue;
        const u = unitOf(f);
        if (u && (target === u || target.startsWith(`${u}/`))) continue; // a unit's own test reading inside its unit
        reach.push(`${f} -> ${s}`);
    }
}
say("B2-REACH", "B-01", reach, "(consumer-zone imports into src/ not through a package entry)");
if (arg("--out")) writeFileSync(arg("--out"), JSON.stringify(out, null, 1));
