#!/usr/bin/env node
// critique-G structural probes. Usage:
//   node probes.mjs --tree T [--only S-02,G-10] [--out probes.json]
// Read-only over the replayed tree T (whose docs/ are the committed artifacts at the cut).
// Each probe prints PASS/FAIL with its evidence. Probes that need a build, vitest, the
// browser seat or the kit's replay log (S-08, S-09, S-10, S-11 vitest, S-12, G-09) are
// command recipes in BATTERY.md, run by hand, and their outputs are recorded in the report.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const T = path.resolve(opt("--tree"));
const ONLY = opt("--only", "") ? new Set(opt("--only").split(",")) : null;
const OUT = opt("--out", "");
const S = "docs/tranches/BL/design/structure";
const ZONES = ["src", "demo", "scripts", "tests", "tests-visual"];
const SLOTS = new Set(["composables", "__tests__", "styles"]);

function walk(dir, acc = [], dirs = []) {
    if (!fs.existsSync(dir)) return acc;
    dirs.push(dir);
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        if (e.name === "node_modules" || e.name === "dist" || e.name.startsWith(".")) continue;
        const p = path.join(dir, e.name);
        if (e.isDirectory()) walk(p, acc, dirs); else acc.push(p);
    }
    return acc;
}
function dirsOf(zone) { const d = []; walk(path.join(T, zone), [], d); return d; }
const sh = (cmd) => spawnSync("sh", ["-c", cmd], { cwd: T, encoding: "utf8", maxBuffer: 1 << 28 });
const tracked = (p) => sh(`git ls-files -- '${p}'`).stdout.split("\n").filter(Boolean);
const untracked = (p) => sh(`git ls-files --others --exclude-standard -- '${p}'`).stdout.split("\n").filter(Boolean);
const read = (p) => (fs.existsSync(path.join(T, p)) ? fs.readFileSync(path.join(T, p), "utf8") : "");
const rulings = read(`${S}/RULINGS.md`);
const kitText = () => tracked(`${S}/pass-3/G-kit`).filter((f) => /\.(md|json|mjs|txt)$/.test(f)).map((f) => read(f)).join("\n");

const HOOKS = ["useClipboard", "useDragVelocity", "useRAFLoop", "useYieldToMain", "useScrollChrome", "useScrollProgress", "useRoutePointer"];

const probes = {
    "S-01"() {
        const kit = tracked(`${S}/pass-3/G-kit`), un = untracked(`${S}/pass-3`), p2 = tracked(`${S}/pass-2/kit`);
        const xj = tracked(`${S}/pass-3/xj-BonG.md`).length + tracked(`${S}/pass-3/xj-GonB.md`).length;
        return { pass: kit.length > 0 && p2.length > 0 && xj === 2 && un.length === 0, ev: `G-kit tracked ${kit.length}; pass-2/kit tracked ${p2.length}; xj docs tracked ${xj}/2; untracked under pass-3 ${un.length}` };
    },
    "S-02"() {
        const src = walk(path.join(T, "src"));
        const where = HOOKS.map((h) => [h, src.filter((f) => path.basename(f).replace(/\.ts$/, "") === h).map((f) => path.relative(T, f))]);
        const bad = where.filter(([, fs_]) => fs_.length !== 1 || !fs_[0].startsWith("src/composables/"));
        return { pass: /\| P3-R1 \|/.test(rulings) && bad.length === 0, ev: where.map(([h, f]) => `${h}: ${f.join(",") || "MISSING"}`).join("; ") };
    },
    "S-03"() {
        const rows = ["P3-R2", "P3-R3", "P3-R4", "P3-R5", "P3-R6", "P3-R7", "P3-R8", "P3-R9"].filter((r) => rulings.includes(`| ${r} |`));
        const pkg = JSON.parse(read("package.json"));
        const aurora = Object.keys(pkg.exports ?? {}).includes("./aurora-config");
        const accent = walk(path.join(T, "src")).filter((f) => path.basename(f) === "accent-tone.css").map((f) => path.relative(T, f));
        const ratchetT = read(".bundle-ratchet"), ratchetH = sh("git show HEAD:.bundle-ratchet").stdout;
        const nums = (s) => (s.match(/\d{3,}/g) ?? []).join(",");
        return { pass: rows.length === 8 && aurora, ev: `rulings ${rows.length}/8; ./aurora-config exported ${aurora}; accent-tone.css at ${accent.join(",") || "MISSING"}; .bundle-ratchet ceilings ${nums(ratchetT) === nums(ratchetH) ? "equal to HEAD" : "CHANGED vs HEAD"}` };
    },
    "S-04"() {
        const lib = read("scripts/structure/lib/placement.mjs") || read(`${S}/floor/lib/placement.mjs`);
        const anchor = (lib.match(/anchor/g) ?? []).length;
        const cli = fs.existsSync(path.join(T, "scripts/structure/placement.mjs")) ? "scripts/structure/placement.mjs" : `${S}/floor/placement.mjs`;
        const r = sh(`node ${cli} --root ${T} 2>&1 | tail -40`);
        const move = (r.stdout.match(/^\s*move\b.*$/gim) ?? []).length, global = (r.stdout.match(/^\s*global\b.*$/gim) ?? []).length;
        const summary = r.stdout.split("\n").filter((l) => /\b(move|global|anchored|ok|proposed|NEEDS-NAME)\b/.test(l)).slice(-6).join(" / ");
        return { pass: anchor > 0 && r.status === 0, ev: `anchor occurrences ${anchor}; ${cli} exit ${r.status}; summary: ${summary}`, note: `move rows ${move}, global rows ${global} (read from the summary above)` };
    },
    "S-05"() {
        const src = walk(path.join(T, "src"));
        const hook = src.find((f) => path.basename(f) === "useScrollChrome.ts");
        if (!hook) return { pass: false, ev: "useScrollChrome.ts not found" };
        const name = "useScrollChrome";
        const readers = src.filter((f) => /\.(vue|ts)$/.test(f) && f.includes("/components/") && fs.readFileSync(f, "utf8").includes(name)).sort();
        if (!readers.length) return { pass: false, ev: "no component reader" };
        const to = path.join(path.dirname(readers[0]), "useScrollChrome.ts");
        const list = path.join(T, "..", "crit-G-k-s05.json");
        fs.writeFileSync(list, JSON.stringify([{ from: path.relative(T, hook), to: path.relative(T, to) }], null, 1));
        const eng = fs.existsSync(path.join(T, "scripts/structure/move.mjs")) ? "scripts/structure/move.mjs" : `${S}/floor/move.mjs`;
        const r = sh(`node ${eng} ${list} --root ${T} --dry 2>&1 | tail -15`);
        const refused = /FD-2/.test(r.stdout) && r.status !== 0;
        return { pass: refused, ev: `move ${path.relative(T, hook)} -> ${path.relative(T, to)}: exit ${r.status}; ${r.stdout.split("\n").filter((l) => /FD-2|refus|CO-CYCLIC|error/i.test(l)).slice(0, 3).join(" / ") || r.stdout.slice(-300)}` };
    },
    "S-11"() {
        const st = fs.existsSync(path.join(T, "scripts/structure"));
        const r = sh(`grep -rlE "from ['\\"][./]*docs/tranches|docs/tranches/BL/design/structure/floor" src demo scripts tests tests-visual package.json vite*.ts vitest*.ts 2>/dev/null | grep -v node_modules`);
        const hits = r.stdout.split("\n").filter(Boolean);
        return { pass: st && hits.length === 0, ev: `scripts/structure present ${st}; files outside docs/ naming the docs floor: ${hits.length} ${hits.slice(0, 5).join(",")}` };
    },
    "S-13"() {
        const b = read(`${S}/pass-3/xj-BonG.md`), g = read(`${S}/pass-3/xj-GonB.md`);
        const v = (s) => /merge|MERGE/.test(s) && /GREEN|RED/.test(s);
        return { pass: v(b) && v(g), ev: `xj-BonG ${b.length} B, verdict-bearing ${v(b)}; xj-GonB ${g.length} B, verdict-bearing ${v(g)}` };
    },
    "G-01"() {
        const kit = tracked(`${S}/pass-3/G-kit`); const t = kitText();
        const clauses = ["E0", "E1", "E2", "E3", "E4", "E5", "E6", "E7"].filter((c) => t.includes(c));
        const choices = { "CSS hold": /CSS hold|aggregator-held|aggregator/i, "global-zone landing": /global[- ]zone landing|composables\/glass\/composables|global zone/i,
            "sibling-stem rename": /sibling[- ]stem|curl-fbm|sole export/i, STAGES: /STAGES|shader[- ]stage/i, "slot tolerance": /slot tolerance/i,
            "eponymy pin": /eponymy pin|eponymous root stays/i, "hook-only composables": /hook-only/i, "relay-cure rows": /relay[- ]cure/i, "auto-hold": /auto-hold/i };
        const missing = Object.entries(choices).filter(([, re]) => !re.test(t)).map(([k]) => k);
        return { pass: kit.length > 0 && clauses.length === 8 && missing.length === 0, ev: `kit files ${kit.length}; clauses named ${clauses.join(",")}; §8 choices without a disposition keyword: ${missing.join(", ") || "none"}` };
    },
    "G-02"() {
        const pkg = JSON.parse(read("package.json"));
        const test = pkg.scripts?.test ?? "";
        const r = sh(`grep -rlE "eponym|g-law|E4|gate-g" tests scripts/structure 2>/dev/null | head -10`);
        return { pass: r.stdout.trim().length > 0, ev: `npm test = "${test}"; test-side files naming the G gate: ${r.stdout.split("\n").filter(Boolean).join(",") || "none"}`, note: "E4..E7 readings are taken from the gate run in step 3" };
    },
    "G-03"() {
        const dirs = dirsOf("src").map((d) => path.relative(T, d));
        const det = dirs.filter((d) => /\/sheet(\/.*)?\/detents$/.test(d)), ren = dirs.filter((d) => /\/fourier-field(\/.*)?\/renderer$/.test(d)), cfg = dirs.filter((d) => /\/aurora(\/.*)?\/config$/.test(d));
        const stage = dirs.filter((d) => /(^|\/)(aurora-frag|mediums-glsl|aurora-wgsl|[\w-]+-(frag|vert|glsl|wgsl))$/.test(d));
        const pin = tracked(`${S}/pass-3/G-kit`).filter((f) => /pin|module-set|modules\.json|names/i.test(f));
        return { pass: det.length > 0 && ren.length > 0 && cfg.length > 0 && stage.length === 0 && pin.length > 0, ev: `detents ${det.join(",") || "NONE"}; renderer ${ren.join(",") || "NONE"}; aurora config ${cfg.join(",") || "NONE"}; stage-named dirs ${stage.join(",") || "none"}; pin files ${pin.join(",") || "NONE"}` };
    },
    "G-06"() {
        const top = fs.readdirSync(path.join(T, "scripts"), { withFileTypes: true }).filter((e) => e.isFile()).map((e) => e.name);
        const pkg = JSON.parse(read("package.json"));
        const binTokens = JSON.stringify(pkg.scripts ?? {}) + read(".github/workflows/release.yml") + read(".github/workflows/ci.yml");
        const nonBin = top.filter((n) => !binTokens.includes(n));
        return { pass: top.length <= 12 && nonBin.length === 0, ev: `scripts/ top-level files ${top.length}: ${top.join(",")}; not named by package.json or CI: ${nonBin.join(",") || "none"}` };
    },
    "G-07"() {
        const t = kitText();
        return { pass: /B-30|symbol[- ]grain/i.test(t), ev: `kit states the symbol-grain answer: ${/B-30|symbol[- ]grain/i.test(t)}` };
    },
    "G-10"() {
        const over = [], slotsOver = [];
        for (const z of ZONES) for (const d of dirsOf(z)) {
            const n = fs.readdirSync(d, { withFileTypes: true }).filter((e) => e.isFile() && !e.name.startsWith(".")).length;
            if (n > 12) (SLOTS.has(path.basename(d)) ? slotsOver : over).push(`${path.relative(T, d)}=${n}`);
        }
        const named = ["src/components/menu", "src/styles/glass", "src/styles/tokens", "tests-visual"].map((d) => {
            const p = path.join(T, d); if (!fs.existsSync(p)) return `${d}: gone`;
            const e = fs.readdirSync(p, { withFileTypes: true });
            return `${d}: files ${e.filter((x) => x.isFile()).length}, dirs ${e.filter((x) => x.isDirectory() && x.name !== "node_modules").length}`;
        });
        return { pass: over.length === 0 && slotsOver.length === 0, ev: `non-slot dirs over 12: ${over.length} ${over.join(" ")}; slots over 12: ${slotsOver.length} ${slotsOver.join(" ")}; ${named.join("; ")}` };
    },
    "G-11"() {
        const pkg = JSON.parse(read("package.json"));
        const aurora = Object.keys(pkg.exports ?? {}).includes("./aurora-config");
        const big = ZONES.flatMap((z) => walk(path.join(T, z))).filter((f) => /\.(ts|vue|mjs|css)$/.test(f) && !/generated|\.gen\./.test(f))
            .map((f) => [path.relative(T, f), fs.readFileSync(f, "utf8").split("\n").length]).filter(([, n]) => n > 500);
        const tests = dirsOf("src").filter((d) => path.basename(d) === "__tests__").length;
        return { pass: aurora && big.length === 0 && tests > 0, ev: `./aurora-config ${aurora}; files over 500 lines ${big.length} (${big.slice(0, 6).map(([f, n]) => `${f}:${n}`).join(", ")}${big.length > 6 ? ", …" : ""}); src __tests__ dirs ${tests}`, note: "E5 and E6 readings come from the gate run" };
    },
    "G-12"() {
        const dirs = dirsOf("src").map((d) => path.relative(path.join(T, "src"), d)).filter(Boolean);
        const depth = Math.max(...dirs.map((d) => d.split("/").length));
        const deepest = dirs.filter((d) => d.split("/").length === depth);
        // parent↔child dir cycles: a direct file of P imports into child C's subtree, and a file of C's subtree imports a direct file of P
        const files = walk(path.join(T, "src")).filter((f) => /\.(ts|vue)$/.test(f));
        const edges = [];
        const re = /(?:import|export)[^'"`]*?from\s*['"](\.[^'"]+)['"]|import\(\s*['"](\.[^'"]+)['"]\s*\)|import\s+['"](\.[^'"]+)['"]/g;
        for (const f of files) {
            const s = fs.readFileSync(f, "utf8"); let m;
            while ((m = re.exec(s))) { const spec = m[1] ?? m[2] ?? m[3]; edges.push([f, path.resolve(path.dirname(f), spec)]); }
        }
        const cyc = new Set();
        const dirOf = (p) => (fs.existsSync(p) && fs.statSync(p).isDirectory() ? p : path.dirname(p));
        const down = new Set(), up = new Set();
        for (const [a, bRaw] of edges) {
            const A = path.dirname(a), B = dirOf(bRaw);
            if (B.startsWith(A + "/")) down.add(`${A}|${A + "/" + B.slice(A.length + 1).split("/")[0]}`);
            if (A.startsWith(B + "/")) up.add(`${B}|${B + "/" + A.slice(B.length + 1).split("/")[0]}`);
        }
        for (const k of down) if (up.has(k)) cyc.add(k.split("|").map((d) => path.relative(T, d)).join(" <-> "));
        const ruled = /intra-unit|G-12/.test(rulings) || /G-12/.test(kitText());
        return { pass: null, ev: `max src dir depth ${depth} (${deepest.slice(0, 3).join(", ")}); parent<->child dir cycles ${cyc.size}: ${[...cyc].slice(0, 8).join("; ")}; ruling/kit text on G-12 present ${ruled}`, note: "PASS needs FD-2 to count these (checked by a plant) or a ruling" };
    },
};

const out = {};
for (const [id, fn] of Object.entries(probes)) {
    if (ONLY && !ONLY.has(id)) continue;
    let r; try { r = fn(); } catch (e) { r = { pass: false, ev: `probe error: ${e.message}` }; }
    out[id] = r;
    console.log(`${id}  ${r.pass === null ? "REPORT" : r.pass ? "PASS" : "FAIL"}  ${r.ev}${r.note ? `  [${r.note}]` : ""}`);
}
if (OUT) fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
