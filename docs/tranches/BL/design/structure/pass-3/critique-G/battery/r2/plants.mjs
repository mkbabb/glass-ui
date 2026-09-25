#!/usr/bin/env node
// plants.mjs: critique-G run 2's plant battery. Each plant writes into T, runs the gate in T,
// and restores T byte for byte. Targets are found by basename, so the battery follows a file
// wherever the migration put it. A move plant runs T's own move engine forward and back.
//   node plants.mjs --tree T --gate "<shell cmd run in T>" [--only a,b] [--out O.json]
// CAUGHT: the gate exits 0 unplanted and non-zero planted, or (unplanted non-zero) a new
// output line names the planted path. A legal plant (L-*) must leave exit and output unchanged.
import { execSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmdirSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join, posix, relative, resolve } from "node:path";

const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const T = resolve(opt("--tree"));
const GATE = opt("--gate");
const only = opt("--only")?.split(",");
const files = execSync("git ls-files --cached --others --exclude-standard", { cwd: T, encoding: "utf8", maxBuffer: 1 << 28 }).split("\n").filter((f) => f && existsSync(join(T, f)));
const find = (name, under = "src/") => {
    const hits = files.filter((f) => f.startsWith(under) && (f === name || f.endsWith("/" + name)));
    if (hits.length !== 1) throw new Error(`find ${name} under ${under}: ${hits.length} hits ${hits.slice(0, 3).join(" ")}`);
    return hits[0];
};
const findDir = (re) => { const ds = [...new Set(files.map((f) => posix.dirname(f)))].filter((d) => re.test(d)); if (ds.length !== 1) throw new Error(`dir ${re}: ${ds.length} hits ${ds.slice(0, 3).join(" ")}`); return ds[0]; };
const rel = (from, to) => { let r = posix.relative(posix.dirname(from), to).replace(/\.ts$/, ""); return r.startsWith(".") ? r : "./" + r; };
const read = (p) => readFileSync(join(T, p), "utf8");
const inScript = (p, code) => { const t = read(p); const m = t.match(/<script\b[^>]*>/); if (!m) throw new Error(`no <script> in ${p}`); return t.replace(m[0], `${m[0]}\n${code}\n`); };
const doorOf = (p) => { const d = posix.dirname(p); const i = `${d}/index.ts`; return files.includes(i) ? i : null; };

function runGate() {
    const r = spawnSync("sh", ["-c", GATE], { cwd: T, encoding: "utf8", maxBuffer: 1 << 28 });
    const lines = `${r.stdout}\n${r.stderr}`.split("\n").map((l) => l.trim()).filter(Boolean);
    return { code: r.status, lines };
}
function moveEngine(moves) {
    const f = join(T, ".zz-crit-moves.json");
    writeFileSync(f, JSON.stringify({ moves }));
    const eng = existsSync(join(T, "scripts/structure/move.mjs")) ? "scripts/structure/move.mjs" : null;
    if (!eng) throw new Error("no move engine in tree");
    const r = spawnSync("node", [eng, f, "--root", T], { cwd: T, encoding: "utf8", maxBuffer: 1 << 28 });
    unlinkSync(f);
    if (r.status !== 0) throw new Error(`move engine refused: ${(r.stdout + r.stderr).split("\n").slice(-6).join(" | ")}`);
}

// each plant: build() → { write: {path: text}, moves?: [{from,to}] , names: [paths the output should name] }
const PLANTS = [
    { id: "K-selfname", item: "S-06", build: () => { const b = find("Badge.vue"); return { write: { [b]: inScript(b, `import { Button as __ZzSelf } from "@mkbabb/glass-ui/button"; void __ZzSelf;`) }, names: [b] }; } },
    { id: "K-reach", item: "G-04 (P18)", build: () => { const b = find("Badge.vue"); const s = find("useDockSpring.ts"); return { write: { [b]: inScript(b, `import * as __ZzReach from "${rel(b, s)}"; void __ZzReach;`) }, names: [b, s] }; } },
    { id: "K-alias", item: "G-04 (P20)", build: () => { const gd = find("GlassDock.vue"); const door = find("index.ts", "src/components/dock/") ; const al = `${posix.dirname(gd)}/GlassDockLegacy.ts`; return { write: { [al]: `export { default } from "./GlassDock.vue";\n`, [door]: `${read(door)}\nexport { default as GlassDockLegacy } from "${rel(door, al)}";\n` }, names: [al, door] }; } },
    { id: "K-fallback-live", item: "G-04 (P21+)", build: () => { const t = find("DockTrigger.vue"); const sib = find("DockSeparator.vue"); return { write: { [t]: inScript(t, `const __zzFb = () => import("${rel(t, sib)}").catch(() => null); void __zzFb;`) }, names: [t] }; } },
    { id: "K-fallback-missing", item: "G-04 (P21)", build: () => { const t = find("DockTrigger.vue"); return { write: { [t]: inScript(t, `const __zzFb = () => import("./zz-nope-missing.vue").catch(() => null); void __zzFb;`) }, names: [t] }; } },
    { id: "K-kernel-type", item: "G-04 (B8)", build: () => { const k = find("useTimer.ts"); const door = find("GlassDock.vue"); return { write: { [k]: `import type * as __ZzDock from "${rel(k, door)}";\nexport type __ZzKernel = typeof __ZzDock;\n${read(k)}` }, names: [k] }; } },
    { id: "K-relay", item: "G-04 (B12, R-6)", build: () => { const c = doorOf(find("Chip.vue")); const bd = doorOf(find("Badge.vue")); return { write: { [c]: `${read(c)}\nexport { Badge } from "${rel(c, bd).replace(/\/index$/, "")}";\n` }, names: [c] }; } },
    { id: "K-door-impure", item: "G-04 (B14)", build: () => { const bd = doorOf(find("Badge.vue")); return { write: { [bd]: `${read(bd)}\nexport const BADGE_PLANT = 3;\n` }, names: [bd] }; } },
    { id: "K-placeholder", item: "G-05 (P19)", build: () => { const t = find("DockTrigger.vue"); const d = posix.dirname(t); return { write: { [`${d}/utils/format.ts`]: `export const zzFormat = (n: number) => String(n);\n`, [`${d}/utils/utils.ts`]: `export { zzFormat } from "./format";\n`, [t]: inScript(t, `import { zzFormat as __zzF } from "./utils/utils"; void __zzF;`) }, names: [`${d}/utils`] }; } },
    { id: "K-misc", item: "G-05", build: () => { const b = find("Badge.vue"); const d = posix.dirname(b); return { write: { [`${d}/misc/misc.ts`]: `export const zzMisc = 1;\n`, [`${d}/misc/extra.ts`]: `export const zzExtra = 2;\n`, [b]: inScript(b, `import { zzMisc as __a } from "./misc/misc"; import { zzExtra as __b } from "./misc/extra"; void __a; void __b;`) }, names: [`${d}/misc`] }; } },
    { id: "K-scripts-helper", item: "G-06 (P28/B-35)", build: () => { const bin = find("profile-bundle.mjs", "scripts/"); const h = "scripts/foo-helper.mjs"; return { write: { [h]: `export const zzHelper = 1;\n`, [bin]: `import { zzHelper as __zz } from "${rel(bin, h).replace(/(\.mjs)?$/, ".mjs")}"; void __zz;\n${read(bin)}` }, names: [h] }; } },
    { id: "K-scripts-shared-in-bin", item: "G-06 (B-38)", build: () => { const a = find("profile-bundle.mjs", "scripts/"); const bs = files.filter((f) => /^scripts\/.*\.mjs$/.test(f) && f !== a && !f.startsWith("scripts/structure/") && posix.dirname(f) !== posix.dirname(a)); const b = bs[0]; const h = `${posix.dirname(a)}/zz-shared-in-bin.mjs`; const imp = (from) => { const r = posix.relative(posix.dirname(from), h); return r.startsWith(".") ? r : "./" + r; }; return { write: { [h]: `export const zzShared = 1;\n`, [a]: `import { zzShared as __zz } from "${imp(a)}"; void __zz;\n${read(a)}`, [b]: `import { zzShared as __zz } from "${imp(b)}"; void __zz;\n${read(b)}` }, names: [h] }; } },
    { id: "K-glob-out", item: "G-07 (B-14)", build: () => { const dd = doorOf(find("Deck.vue")) ?? find("index.ts", "src/components/deck/"); const gd = posix.dirname(find("GlassDock.vue")); return { write: { [dd]: `${read(dd)}\nexport const __zzGlob = import.meta.glob("${posix.relative(posix.dirname(dd), gd)}/*.vue");\n` }, names: [dd] }; } },
    { id: "K-style-src", item: "G-07 (B-22)", build: () => { const b = find("Badge.vue"); const c = `${posix.dirname(b)}/badge-carve.css`; return { write: { [c]: `.zz-badge-carve { color: red; }\n`, [b]: `${read(b)}\n<style src="./badge-carve.css"></style>\n` }, names: [b, c] }; } },
    { id: "K-css-private", item: "G-07 (B-10)", build: () => { const b = find("Badge.vue"); const card = find("Card.vue"); const cardCss = files.filter((f) => f.startsWith(posix.dirname(card) + "/") && f.endsWith(".css") && !f.endsWith("index.css"))[0]; const s = `${posix.dirname(b)}/zz-badge-extra.css`; return { write: { [s]: `@import "${posix.relative(posix.dirname(s), cardCss)}";\n.zz-badge-extra{color:red}\n`, [b]: inScript(b, `import "./zz-badge-extra.css";`) }, names: [s] }; } },
    { id: "K-css-global-one", item: "G-07 (B-28)", build: () => { const b = find("Badge.vue"); const s = "src/styles/zz-badge-only.css"; return { write: { [s]: `.zz-badge-only{color:red}\n`, [b]: inScript(b, `import "${posix.relative(posix.dirname(b), s)}";`) }, names: [s] }; } },
    { id: "K-source-out", item: "G-07 (P3-R8)", build: () => { const cssDoor = files.find((f) => /^src\/components\/[^/]+\/index\.css$/.test(f)) ?? files.find((f) => /^src\/styles\/[^/]+\/index\.css$/.test(f)); const gd = posix.dirname(find("GlassDock.vue")); return { write: { [cssDoor]: `@source "${posix.relative(posix.dirname(cssDoor), gd)}/**/*.vue";\n${read(cssDoor)}` }, names: [cssDoor] }; } },
    { id: "K-pin-newdir", item: "G-03 (pin)", build: () => { const b = find("Badge.vue"); const d = `${posix.dirname(b)}/badge-glow`; return { write: { [`${d}/BadgeGlow.vue`]: `<script setup lang="ts">\nimport { zzGlowTone } from "./glowTone";\nvoid zzGlowTone;\n</script>\n<template><span /></template>\n`, [`${d}/glowTone.ts`]: `export const zzGlowTone = 1;\n`, [b]: inScript(b, `import __ZzGlow from "./badge-glow/BadgeGlow.vue"; void __ZzGlow;`) }, names: [d] }; } },
    { id: "K-rename-detents", item: "G-03 (rename)", build: () => { const d = findDir(/(^|\/)detents$/); const ms = files.filter((f) => posix.dirname(f) === d).map((f) => ({ from: f, to: `${posix.dirname(d)}/content/${posix.basename(f)}` })); return { write: {}, moves: ms, names: [`${posix.dirname(d)}/content`] }; } },
    { id: "K-peer13", item: "G-10 (E4)", build: () => { const b = find("Badge.vue"); const d = posix.dirname(b); const w = {}; let imp = ""; for (let i = 1; i <= 13; i++) { const n = String(i).padStart(2, "0"); w[`${d}/zzPart${n}.ts`] = `export const zzP${n} = ${i};\n`; imp += `import { zzP${n} } from "./zzPart${n}"; void zzP${n}; `; } w[b] = inScript(b, imp); return { write: w, names: [d] }; } },
    { id: "K-long", item: "G-10/G-11 (R-5 lines)", build: () => { const b = find("Badge.vue"); const f = `${posix.dirname(b)}/zzBadgeTable.ts`; let t = ""; for (let i = 0; i < 510; i++) t += `export const zzB${i} = ${i};\n`; return { write: { [f]: t, [b]: inScript(b, `import { zzB0 } from "./zzBadgeTable"; void zzB0;`) }, names: [f] }; } },
    { id: "K-test-wrong-unit", item: "G-11 (G-S7, E7)", build: () => { const btn = posix.dirname(find("Button.vue")); const bd = doorOf(find("Badge.vue")); const t = `${btn}/__tests__/zz-badge.test.ts`; return { write: { [t]: `import { describe, it, expect } from "vitest";\nimport * as B from "${rel(t, bd).replace(/\/index$/, "")}";\ndescribe("zz", () => { it("x", () => { expect(B).toBeTruthy(); }); });\n` }, names: [t] }; } },
    { id: "K-test-outside", item: "G-11 (G-S7, E7)", build: () => { const bd = doorOf(find("Badge.vue")); const t = "tests/zz-badge-only.test.ts"; return { write: { [t]: `import { describe, it, expect } from "vitest";\nimport * as B from "${rel(t, bd).replace(/\/index$/, "")}";\ndescribe("zz", () => { it("x", () => { expect(B).toBeTruthy(); }); });\n` }, names: [t] }; } },
    { id: "K-demo-deep", item: "G-11 (G-S8, E6)", build: () => { const s = files.find((f) => /^demo\/.*\.vue$/.test(f) && /<script\b[^>]*setup/.test(read(f))); const h = find("useDockHold.ts"); return { write: { [s]: inScript(s, `import { useDockHold as __zzH } from "${rel(s, h)}"; void __zzH;`) }, names: [s] }; } },
    { id: "K-nest-cycle", item: "G-12", build: () => { const b = find("Badge.vue"); const d = posix.dirname(b); return { write: { [`${d}/zzTone.ts`]: `import { zzDotSize } from "./badge-dot/dotSize";\nexport const zzTone = zzDotSize + 1;\n`, [`${d}/badge-dot/BadgeDot.vue`]: `<script setup lang="ts">\nimport { zzTone } from "../zzTone";\nimport { zzDotSize } from "./dotSize";\nvoid zzTone; void zzDotSize;\n</script>\n<template><span /></template>\n`, [`${d}/badge-dot/dotSize.ts`]: `export const zzDotSize = 2;\n`, [b]: inScript(b, `import __ZzDot from "./badge-dot/BadgeDot.vue"; import { zzTone as __zzT } from "./zzTone"; void __ZzDot; void __zzT;`) }, names: [`${d}/badge-dot`, `${d}/zzTone.ts`] }; } },
    { id: "K-crossfade-helper", item: "control E2", build: () => { const c = find("DockCrossfade.vue"); const door = find("GlassDock.vue"); const h = `${posix.dirname(door)}/zzCrossfadeHelper.ts`; return { write: { [h]: `export const zzCf = 1;\n`, [c]: inScript(c, `import { zzCf as __zzCf } from "${rel(c, h)}"; void __zzCf;`) }, names: [h] }; } },
    { id: "K-no-root", item: "control E3", build: () => { const b = find("Badge.vue"); const d = posix.dirname(b); return { write: { [`${d}/zzgroup/a.ts`]: `export const zzA = 1;\n`, [`${d}/zzgroup/b.ts`]: `export const zzB = 2;\n`, [b]: inScript(b, `import { zzA as __a } from "./zzgroup/a"; import { zzB as __b } from "./zzgroup/b"; void __a; void __b;`) }, names: [`${d}/zzgroup`] }; } },
    { id: "K-skeleton-away", item: "control E1", build: () => { const sk = find("Skeleton.vue"); const dt = posix.dirname(find("DataTable.vue")); return { write: {}, moves: [{ from: sk, to: `${dt}/Skeleton.vue` }], names: [`${dt}/Skeleton.vue`] }; } },
    { id: "L-door-read", item: "legal", legal: true, build: () => { const b = find("Badge.vue"); const dom = "src/composables/dom/index.ts"; return { write: { [b]: inScript(b, `import * as __zzDom from "${rel(b, dom).replace(/\/index$/, "")}"; void __zzDom;`) }, names: [] }; } },
    { id: "L-colocated-test", item: "legal", legal: true, build: () => { const bd = doorOf(find("Badge.vue")); const t = `${posix.dirname(bd)}/__tests__/zz-Badge.test.ts`; return { write: { [t]: `import { describe, it, expect } from "vitest";\nimport * as B from "..";\ndescribe("zz", () => { it("x", () => { expect(B).toBeTruthy(); }); });\n` }, names: [] }; } },
    { id: "L-shared-hook", item: "legal", legal: true, build: () => { const b = find("Badge.vue"); const bt = find("Button.vue"); const h = "src/composables/dom/useZzShared2.ts"; return { write: { [h]: `export function useZzShared2() { return 1; }\n`, [b]: inScript(b, `import { useZzShared2 as __s } from "${rel(b, h)}"; void __s;`), [bt]: inScript(bt, `import { useZzShared2 as __s } from "${rel(bt, h)}"; void __s;`) }, names: [] }; } },
    { id: "L-registry", item: "G-08 (P07a)", legal: true, build: () => { const gd = find("GlassDock.vue"); const d = posix.dirname(gd); const pick = ["DockTrigger.vue", "DockSeparator.vue", "DockCrossfade.vue"].map((n) => find(n)); const r = `${d}/registry.ts`; let t = ""; pick.forEach((p, i) => { t += `import C${i} from "${rel(r, p)}";\n`; }); t += `export const zzRegistry = { a: C0, b: C1, c: C2 };\n`; return { write: { [r]: t, [gd]: inScript(gd, `import { zzRegistry as __zzR } from "./registry"; void __zzR;`) }, names: [r] }; } },
];

const base = runGate();
const results = [];
for (const p of PLANTS) {
    if (only && !only.includes(p.id)) continue;
    let spec;
    try { spec = p.build(); } catch (e) { results.push({ id: p.id, item: p.item, verdict: "N/A", why: String(e.message ?? e) }); console.log(`N/A     ${p.id}  ${e.message}`); continue; }
    const saved = new Map();
    const created = [];
    let moved = false;
    let r;
    try {
        for (const [f, text] of Object.entries(spec.write)) {
            if (existsSync(join(T, f))) saved.set(f, readFileSync(join(T, f))); else created.push(f);
            mkdirSync(dirname(join(T, f)), { recursive: true });
            writeFileSync(join(T, f), text);
        }
        if (spec.moves?.length) { moveEngine(spec.moves); moved = true; }
        r = runGate();
    } catch (e) {
        r = { code: null, lines: [`PLANT-ERROR ${e.message}`] };
    } finally {
        if (moved) moveEngine(spec.moves.map(({ from, to }) => ({ from: to, to: from })));
        for (const [f, bytes] of saved) writeFileSync(join(T, f), bytes);
        for (const f of created) { try { unlinkSync(join(T, f)); } catch {} let d = dirname(join(T, f)); while (d.startsWith(T) && d !== T) { try { if (readdirSync(d).length) break; rmdirSync(d); } catch { break; } d = dirname(d); } }
    }
    const baseSet = new Set(base.lines);
    const fresh = r.lines.filter((l) => !baseSet.has(l));
    const namesIt = fresh.filter((l) => spec.names.some((n) => l.includes(n) || l.includes(posix.basename(n))));
    let verdict;
    if (p.legal) verdict = r.code === base.code && namesIt.length === 0 ? "PASS" : "FALSE-POSITIVE";
    else if (r.code === null) verdict = "ERROR";
    else if (base.code === 0) verdict = r.code !== 0 ? "CAUGHT" : "MISSED";
    else verdict = namesIt.length ? "CAUGHT" : "MISSED";
    results.push({ id: p.id, item: p.item, verdict, exit: r.code, baseExit: base.code, fresh: fresh.slice(0, 8) });
    console.log(`${verdict.padEnd(8)}${p.id}  (${p.item})  exit ${r.code}  ${fresh.slice(0, 2).join(" | ").slice(0, 240)}`);
}
// the tree must be restored
const after = execSync("git status --porcelain", { cwd: T, encoding: "utf8" });
const summary = { gate: GATE, baseExit: base.code, caught: results.filter((x) => x.verdict === "CAUGHT").length, missed: results.filter((x) => x.verdict === "MISSED").map((x) => x.id), na: results.filter((x) => x.verdict === "N/A").map((x) => x.id), legalPass: results.filter((x) => x.verdict === "PASS").length, falsePositive: results.filter((x) => x.verdict === "FALSE-POSITIVE").map((x) => x.id), errors: results.filter((x) => x.verdict === "ERROR").map((x) => x.id), statusLinesAfter: after.split("\n").filter(Boolean).length };
console.log(JSON.stringify(summary, null, 1));
if (opt("--out")) writeFileSync(opt("--out"), JSON.stringify({ summary, results }, null, 1));
