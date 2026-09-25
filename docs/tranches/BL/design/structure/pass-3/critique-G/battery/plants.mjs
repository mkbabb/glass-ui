#!/usr/bin/env node
// critique-G plants. Usage:
//   GATE='<shell cmd run in T>' node plants.mjs --tree T [--only K-P18,K-P20] [--out results.json]
// Each plant locates its target by basename (paths on the migrated tree are unknown when
// this battery is written), mutates T, runs GATE, records exit code and every output line
// new against the unplanted baseline, then restores the exact bytes (created files are
// removed, created dirs pruned). The tree digest (sha256 over every file under src, demo,
// scripts, tests, tests-visual, package.json) is taken before and after the whole run.
import { execSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const T = path.resolve(opt("--tree"));
const ONLY = opt("--only", "") ? new Set(opt("--only").split(",")) : null;
const OUT = opt("--out", "");
const GATE = process.env.GATE;
if (!GATE) throw new Error("GATE env (the route's gate command) is required");
const ZONES = ["src", "demo", "scripts", "tests", "tests-visual"];

function walk(dir, acc = []) {
    if (!fs.existsSync(dir)) return acc;
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        if (e.name === "node_modules" || e.name === "dist" || e.name.startsWith(".")) continue;
        const p = path.join(dir, e.name);
        if (e.isDirectory()) walk(p, acc); else acc.push(p);
    }
    return acc;
}
function digest() {
    const h = createHash("sha256");
    const files = ZONES.flatMap((z) => walk(path.join(T, z))).concat([path.join(T, "package.json")]).sort();
    for (const f of files) { h.update(path.relative(T, f)); h.update("\0"); h.update(fs.readFileSync(f)); h.update("\0"); }
    return h.digest("hex");
}
function find(base, zone = "src", pred = () => true) {
    const hits = walk(path.join(T, zone)).filter((f) => path.basename(f) === base && pred(f));
    if (hits.length === 0) throw new Error(`plant target not found: ${zone}/**/${base}`);
    return hits.sort((a, b) => a.length - b.length)[0];
}
const rel = (f) => path.relative(T, f);
const relImport = (from, to) => {
    let r = path.relative(path.dirname(from), to).replace(/\.(ts|mjs)$/, "");
    return r.startsWith(".") ? r : "./" + r;
};
function runGate() {
    const r = spawnSync("sh", ["-c", GATE], { cwd: T, encoding: "utf8", maxBuffer: 1 << 28 });
    const lines = (r.stdout + "\n" + r.stderr).split("\n").map((l) => l.trim()).filter(Boolean);
    return { code: r.status, lines };
}

// A mutation journal: every write records the prior bytes (or absence) once.
let journal = new Map();
function put(file, text) {
    if (!journal.has(file)) journal.set(file, fs.existsSync(file) ? fs.readFileSync(file) : null);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, text);
}
function edit(file, fn) { put(file, fn(fs.readFileSync(file, "utf8"))); }
function mv(from, to) {
    put(to, fs.readFileSync(from));
    if (!journal.has(from)) journal.set(from, fs.readFileSync(from));
    fs.rmSync(from);
}
function restore() {
    const created = [];
    for (const [f, bytes] of journal) {
        if (bytes === null) { fs.rmSync(f, { force: true }); created.push(path.dirname(f)); }
        else { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, bytes); }
    }
    for (let d of created) {
        while (d.startsWith(T) && d !== T && fs.existsSync(d) && fs.readdirSync(d).length === 0) { fs.rmdirSync(d); d = path.dirname(d); }
    }
    journal = new Map();
}
function addScriptImport(sfc, line) {
    edit(sfc, (s) => {
        const m = s.match(/<script\b(?:[^>"']|"[^"]*"|'[^']*')*>\n/);
        if (!m) throw new Error(`no <script> in ${sfc}`);
        return s.replace(m[0], m[0] + line + "\n");
    });
}
function appendLine(file, line) { edit(file, (s) => s + (s.endsWith("\n") ? "" : "\n") + line + "\n"); }

// The plants. Each returns nothing; `expect` is RED or GREEN.
const plants = [
    { id: "K-S06", item: "S-06", expect: "RED", what: "self-name import in src (Chip.vue → @mkbabb/glass-ui/badge)",
      run() { addScriptImport(find("Chip.vue"), 'import "@mkbabb/glass-ui/badge";'); } },
    { id: "K-S07", item: "S-07", expect: "CENSUS", what: "computed read join(process.cwd(), 'src/components/' + n) in a scripts file",
      run() {
          const f = path.join(T, "scripts", "zz-critg-computed.mjs");
          put(f, 'import { join } from "node:path";\nimport { readFileSync } from "node:fs";\nexport const readIt = (n) => readFileSync(join(process.cwd(), "src/components/" + n), "utf8");\n');
      } },
    { id: "K-P18", item: "G-04", expect: "RED", what: "Badge.vue deep relative import of a dock-private composable (useDockSpring)",
      run() { const b = find("Badge.vue"); const c = find("useDockSpring.ts"); addScriptImport(b, `import { useDockSpring as __zz } from "${relImport(b, c)}";\nvoid __zz;`); } },
    { id: "K-P20", item: "G-04", expect: "RED", what: "same-door alias GlassDockLegacy.ts published on the dock door",
      run() {
          const g = find("GlassDock.vue"); const door = path.join(T, "src/components/dock/index.ts");
          const alias = path.join(path.dirname(g), "GlassDockLegacy.ts");
          put(alias, 'export { default } from "./GlassDock.vue";\n');
          appendLine(fs.existsSync(door) ? door : find("index.ts", "src", (f) => f.includes("/dock/")), `export { default as GlassDockLegacy } from "${relImport(door, alias)}";`);
      } },
    { id: "K-P21", item: "G-04", expect: "RED", what: "masked fallback onto an existing file: import('./<existing>').catch(() => null) in DockControl.vue",
      run() {
          const d = find("DockControl.vue"); const target = find("DockSeparator.vue");
          addScriptImport(d, `const __zzFallback = import("${relImport(d, target)}").catch(() => null);\nvoid __zzFallback;`);
      } },
    { id: "K-B8", item: "G-04", expect: "RED", what: "kernel reads a unit: type-only import of a component file from src/composables",
      run() {
          const k = find("useRAFLoop.ts", "src", (f) => f.includes("/composables/")); const c = find("Badge.vue");
          edit(k, (s) => `import type __ZzBadge from "${relImport(k, c)}.vue";\n` + s);
      } },
    { id: "K-B12", item: "G-04", expect: "RED", what: "a non-door relay file re-exporting a sibling, read by an SFC",
      run() {
          const m = find("useDockMorph.ts"); const relay = path.join(path.dirname(m), "morphRelay.ts");
          put(relay, `export * from "./useDockMorph";\n`);
          const g = find("GlassDock.vue"); addScriptImport(g, `import * as __zzRelay from "${relImport(g, relay)}";\nvoid __zzRelay;`);
      } },
    { id: "K-B14", item: "G-04", expect: "RED", what: "door impurity: a value statement inside a JS door (badge index.ts)",
      run() { appendLine(path.join(path.dirname(find("Badge.vue")), "index.ts"), "export const __zzImpure = 1;"); } },
    { id: "K-P19", item: "G-05", expect: "RED", what: "eponymous placeholder dock/utils/utils.ts over dock/utils/format.ts, read by GlassDock",
      run() {
          const g = find("GlassDock.vue"); const dir = path.join(path.dirname(g), "utils");
          put(path.join(dir, "format.ts"), "export const fmt = (n: number) => n.toFixed(2);\n");
          put(path.join(dir, "pad.ts"), "export const pad = (s: string) => s.padStart(4);\n");
          put(path.join(dir, "utils.ts"), 'export { fmt } from "./format";\nexport { pad } from "./pad";\n');
          addScriptImport(g, `import { fmt as __zzF, pad as __zzP } from "${relImport(g, path.join(dir, "utils.ts"))}";\nvoid __zzF; void __zzP;`);
      } },
    { id: "K-P19b", item: "G-05", expect: "RED", what: "placeholder module dir misc/ with an eponymous misc.ts over a helper, read by Chip",
      run() {
          const c = find("Chip.vue"); const dir = path.join(path.dirname(c), "misc");
          put(path.join(dir, "tone.ts"), "export const tone = 1;\n");
          put(path.join(dir, "misc.ts"), 'import { tone } from "./tone";\nexport const misc = () => tone;\n');
          addScriptImport(c, `import { misc as __zzM } from "${relImport(c, path.join(dir, "misc.ts"))}";\nvoid __zzM;`);
      } },
    { id: "K-P28", item: "G-06", expect: "RED", what: "scripts/foo-helper.mjs at scripts top level, read by one bin only (profile-bundle)",
      run() {
          const bin = find("profile-bundle.mjs", "scripts");
          const h = path.join(T, "scripts", "foo-helper.mjs");
          put(h, "export const fooHelper = () => 1;\n");
          edit(bin, (s) => { const r = relImport(bin, h) + ".mjs"; return s.startsWith("#!") ? s.replace(/\n/, `\nimport { fooHelper as __zzFH } from "${r}"; void __zzFH;\n`) : `import { fooHelper as __zzFH } from "${r}"; void __zzFH;\n` + s; });
      } },
    { id: "K-B35", item: "G-06", expect: "RED", what: "a bin's private helper placed in another bin's dir",
      run() {
          const bins = ["profile-bundle.mjs", "comment-census.mjs"].map((b) => find(b, "scripts"));
          const [a, b] = bins; const h = path.join(path.dirname(b), "zz-a-private.mjs");
          if (path.dirname(a) === path.dirname(b)) throw new Error("premise: both bins share one dir; B-35 needs per-bin dirs");
          put(h, "export const aPrivate = () => 2;\n");
          edit(a, (s) => { const r = relImport(a, h) + ".mjs"; return s.startsWith("#!") ? s.replace(/\n/, `\nimport { aPrivate as __zzAP } from "${r}"; void __zzAP;\n`) : `import { aPrivate as __zzAP } from "${r}"; void __zzAP;\n` + s; });
      } },
    { id: "K-B10", item: "G-07", expect: "RED", what: "CSS @import of another unit's private sheet (card styles importing a sheet private to sheet/)",
      run() {
          const own = walk(path.join(T, "src/components")).filter((f) => f.endsWith(".css") && f.includes("/sheet/"))[0];
          const card = walk(path.join(T, "src/components")).filter((f) => f.endsWith(".css") && f.includes("/card/"))[0];
          if (!own || !card) throw new Error("premise: no sheet/ or card/ css");
          edit(card, (s) => `@import "${path.relative(path.dirname(card), own)}";\n` + s);
      } },
    { id: "K-B28", item: "G-07", expect: "RED", what: "a component sheet moved to src/styles/ and imported by the styles aggregator",
      run() {
          const own = walk(path.join(T, "src/components")).filter((f) => f.endsWith(".css") && f.includes("/card/"))[0];
          if (!own) throw new Error("premise: no card css");
          const to = path.join(T, "src/styles", "zz-card-moved.css");
          put(to, fs.readFileSync(own, "utf8"));
          const agg = path.join(T, "src/styles/index.css");
          appendLine(fs.existsSync(agg) ? agg : find("index.css", "src/styles"), '@import "./zz-card-moved.css";');
      } },
    { id: "K-B14g", item: "G-07", expect: "RED", what: "import.meta.glob out of a door (deck/index.ts globbing dock SFCs)",
      run() {
          const door = path.join(T, "src/components/deck/index.ts");
          const target = path.dirname(find("GlassDock.vue"));
          appendLine(door, `export const __zzGlob = import.meta.glob("${relImport(door, target)}/*.vue");`);
      } },
    { id: "K-B22", item: "G-07", expect: "RED", what: "<style src> carve in an SFC (Badge.vue → ./badge.carve.css)",
      run() {
          const b = find("Badge.vue"); put(path.join(path.dirname(b), "badge.carve.css"), ".zz-carve { color: red; }\n");
          appendLine(b, '<style scoped src="./badge.carve.css"></style>');
      } },
    { id: "K-P07a", item: "G-08", expect: "GREEN", what: "registration-weak: dock/registry.ts places 3 dock SFCs in an object literal, read by GlassDock.vue",
      run() {
          const g = find("GlassDock.vue"); const reg = path.join(path.dirname(g), "registry.ts");
          const sfcs = ["DockSeparator.vue", "DockTrigger.vue", "DockBackgroundToggle.vue"].map((n) => find(n));
          put(reg, sfcs.map((f, i) => `import C${i} from "${relImport(reg, f)}.vue";`).join("\n").replace(/\.vue\.vue/g, ".vue") + `\nexport const registry = { a: C0, b: C1, c: C2 };\n`);
          addScriptImport(g, `import { registry as __zzReg } from "${relImport(g, reg)}";\nvoid __zzReg;`);
      } },
    { id: "K-E4", item: "G-02", expect: "RED", what: "E4: a dir at 13 direct files (13 peers under badge/)",
      run() {
          const b = find("Badge.vue"); const dir = path.join(path.dirname(b), "peers");
          for (let i = 0; i < 13; i++) put(path.join(dir, `peer${String.fromCharCode(97 + i)}.ts`), `export const p${i} = ${i};\n`);
          put(path.join(dir, "peers.ts"), Array.from({ length: 13 }, (_, i) => `export { p${i} } from "./peer${String.fromCharCode(97 + i)}";`).join("\n") + "\n");
          addScriptImport(b, `import * as __zzPeers from "./peers/peers";\nvoid __zzPeers;`);
      } },
    { id: "K-E5", item: "G-02", expect: "RED", what: "E5: one symbol on two doors (the chip door re-publishes Badge)",
      run() { appendLine(path.join(path.dirname(find("Chip.vue")), "index.ts"), 'export { Badge as __ZzBadgeTwice } from "@mkbabb/glass-ui/badge";'); } },
    { id: "K-E5b", item: "G-02", expect: "RED", what: "E5 without the self-name: the chip door relatively re-publishes the badge door's default",
      run() { const c = path.join(path.dirname(find("Chip.vue")), "index.ts"); const b = path.join(path.dirname(find("Badge.vue")), "index.ts"); appendLine(c, `export * from "${relImport(c, b)}";`); } },
    { id: "K-E6", item: "G-02", expect: "RED", what: "E6: demo reads past a door (demo App.vue imports a dock composable by path)",
      run() { const a = find("App.vue", "demo"); const c = find("useDockSpring.ts"); addScriptImport(a, `import { useDockSpring as __zzDemo } from "${relImport(a, c)}";\nvoid __zzDemo;`); } },
    { id: "K-E7", item: "G-02", expect: "RED", what: "E7: a Badge test homed in chip's __tests__/",
      run() {
          const c = find("Chip.vue"); const b = find("Badge.vue");
          const t = path.join(path.dirname(c), "__tests__", "zz-badge.test.ts");
          put(t, `import { describe, it, expect } from "vitest";\nimport Badge from "${relImport(t, b)}.vue";\ndescribe("zz", () => it("x", () => expect(Badge).toBeTruthy()));\n`.replace(".vue.vue", ".vue"));
      } },
    { id: "K-G03a", item: "G-03", expect: "RED", what: "authored name lost: the sheet detents dir renamed to its root's name",
      run() {
          const d = walk(path.join(T, "src/components")).filter((f) => /\/sheet\/.*detents\//.test(f));
          if (d.length === 0) throw new Error("premise: no sheet/**/detents/ on T");
          const dir = d[0].slice(0, d[0].indexOf("/detents/") + "/detents".length);
          const to = path.join(path.dirname(dir), "content");
          // move the files and rewrite every importer's "detents/" segment
          for (const f of walk(dir)) mv(f, path.join(to, path.relative(dir, f)));
          for (const f of ZONES.flatMap((z) => walk(path.join(T, z)))) {
              if (!/\.(ts|vue|mjs|css)$/.test(f)) continue;
              const s = fs.readFileSync(f, "utf8");
              if (s.includes("/detents/") || s.includes("./detents")) put(f, s.replaceAll("/detents/", "/content/").replaceAll("./detents", "./content"));
          }
      } },
    { id: "K-G03b", item: "G-03", expect: "RED", what: "unpinned new module: badge/tone/ with an eponymous tone.ts over a helper",
      run() {
          const b = find("Badge.vue"); const dir = path.join(path.dirname(b), "tone");
          put(path.join(dir, "shade.ts"), "export const shade = 1;\n");
          put(path.join(dir, "tone.ts"), 'import { shade } from "./shade";\nexport const tone = () => shade;\n');
          addScriptImport(b, `import { tone as __zzTone } from "./tone/tone";\nvoid __zzTone;`);
      } },
    { id: "K-L1", item: "control", expect: "GREEN", what: "a legitimate colocated test of Badge in badge/__tests__/",
      run() {
          const b = find("Badge.vue"); const t = path.join(path.dirname(b), "__tests__", "zz-legal.test.ts");
          put(t, `import { describe, it, expect } from "vitest";\nimport Badge from "../Badge.vue";\ndescribe("zz", () => it("x", () => expect(Badge).toBeTruthy()));\n`);
      } },
];

const d0 = digest();
const base = runGate();
const baseSet = new Set(base.lines);
const results = [];
for (const p of plants) {
    if (ONLY && !ONLY.has(p.id)) continue;
    let err = null, g = null;
    try { p.run(); g = runGate(); } catch (e) { err = String(e.message ?? e); }
    restore();
    const fresh = g ? g.lines.filter((l) => !baseSet.has(l)) : [];
    const red = g ? (g.code !== base.code || fresh.length > 0) : null;
    let verdict;
    if (err) verdict = "NOT-PLANTED";
    else if (p.expect === "GREEN") verdict = red ? "FALSE-POSITIVE" : "CLEAN";
    else if (p.expect === "CENSUS") verdict = fresh.some((l) => /computed-read/.test(l)) ? "CAUGHT" : (red ? "CAUGHT(other)" : "MISSED");
    else verdict = red ? "CAUGHT" : "MISSED";
    results.push({ id: p.id, item: p.item, expect: p.expect, what: p.what, verdict, exit: g?.code ?? null, baseExit: base.code, fresh: fresh.slice(0, 12), err });
    console.log(`${p.id.padEnd(8)} ${p.item.padEnd(8)} ${verdict.padEnd(14)} exit ${base.code}->${g?.code ?? "-"}  ${err ?? fresh.slice(0, 2).join(" | ").slice(0, 200)}`);
}
const d1 = digest();
console.log(`digest before ${d0.slice(0, 16)} after ${d1.slice(0, 16)} ${d0 === d1 ? "EQUAL" : "DIFFERENT"}`);
if (OUT) fs.writeFileSync(OUT, JSON.stringify({ gate: GATE, baseExit: base.code, baseLines: base.lines.length, digestBefore: d0, digestAfter: d1, results }, null, 2));
if (d0 !== d1) process.exit(3);
