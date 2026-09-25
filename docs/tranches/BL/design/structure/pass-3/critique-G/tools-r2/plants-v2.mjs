#!/usr/bin/env node
// plants-v2.mjs: critique-G run 2, written AFTER the battery hash (disclosed). It re-aims the hashed
// battery's plants whose premise failed on the migrated layout (target absent, the move engine
// refused an undeclared scan delta, or a plant that is not a violation), keeping each plant's intent.
// Same runner and verdict rule as battery/r2/plants.mjs, plus a per-clause count diff: a plant is
// CAUGHT when a clause count rises or a new line names the planted path.
//   node plants-v2.mjs --tree T --gate "<cmd>" [--out O.json]
import { execSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmdirSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join, posix, resolve } from "node:path";

const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const T = resolve(opt("--tree"));
const GATE = opt("--gate");
const only = opt("--only")?.split(",");
const files = execSync("git ls-files --cached --others --exclude-standard", { cwd: T, encoding: "utf8", maxBuffer: 1 << 28 }).split("\n").filter((f) => f && existsSync(join(T, f)));
const read = (p) => readFileSync(join(T, p), "utf8");
const inScript = (p, code) => { const t = read(p); const m = t.match(/<script\b[^>]*>/); return t.replace(m[0], `${m[0]}\n${code}\n`); };
const find = (n, under = "src/") => { const h = files.filter((f) => f.startsWith(under) && f.endsWith("/" + n)); if (h.length !== 1) throw new Error(`find ${n}: ${h.length}`); return h[0]; };
/** a manual move: write each file at its new path, rewrite every textual reference in the tree's
 *  code files (the old dir segment → the new one), delete the old files. Returns the write map. */
function manualMove(fromDir, toDir, fileFilter = () => true) {
    const moving = files.filter((f) => posix.dirname(f) === fromDir && fileFilter(f));
    const w = {};
    for (const f of moving) w[`${toDir}/${posix.basename(f)}`] = read(f);
    for (const f of moving) w[f] = null;
    const oldSeg = posix.basename(fromDir), newSeg = posix.basename(toDir);
    for (const f of files) {
        if (!/\.(ts|mts|vue|mjs|js|css|json)$/.test(f) || f.startsWith("docs/") || moving.includes(f)) continue;
        const t = read(f);
        let n = t;
        for (const m of moving) {
            const stem = posix.basename(m).replace(/\.ts$/, "");
            n = n.split(`${oldSeg}/${stem}`).join(`${newSeg}/${stem}`);
        }
        if (n !== t) w[f] = n;
    }
    for (const m of moving) { const nf = `${toDir}/${posix.basename(m)}`; w[nf] = w[nf]; }
    return w;
}
const PLANTS = [
    { id: "V1-e2-nested-helper", item: "control E2", build: () => { const sc = find("SheetContent.vue"); const h = `${posix.dirname(posix.dirname(sc))}/zzDetentHelper.ts`; return { write: { [h]: `export const zzDh = 1;\n`, [sc]: inScript(sc, `import { zzDh as __zzDh } from "../zzDetentHelper"; void __zzDh;`) }, names: [h] }; } },
    { id: "V2-glob-out", item: "G-07 (B-14)", build: () => { const dd = "src/components/deck/index.ts"; return { write: { [dd]: `${read(dd)}\nexport const __zzGlob = import.meta.glob("../dock/*.vue");\n` }, names: [dd] }; } },
    { id: "V3-source-out", item: "G-07 (P3-R8)", build: () => { const b = find("Badge.vue"); const d = posix.dirname(b); return { write: { [`${d}/index.css`]: `@source "../dock/**/*.vue";\n`, [b]: `${read(b)}\n<style src="./index.css"></style>\n` }, names: [`${d}/index.css`] }; } },
    { id: "V4-scripts-shared-in-module", item: "G-06 (B-38)", build: () => { const h = "scripts/structure/zzShared.mjs"; const a = "scripts/profile-bundle.mjs", b = "scripts/regen-spring-tokens.mjs"; return { write: { [h]: `export const zzShared = 1;\n`, [a]: `import { zzShared as __zz } from "./structure/zzShared.mjs"; void __zz;\n${read(a)}`, [b]: `import { zzShared as __zz } from "./structure/zzShared.mjs"; void __zz;\n${read(b)}` }, names: [h] }; } },
    { id: "V5-rename-detents", item: "G-03 (pin, rename)", build: () => { const sc = find("SheetContent.vue"); const d = posix.dirname(sc); return { write: manualMove(d, `${posix.dirname(d)}/content`), names: [`${posix.dirname(d)}/content`, d] }; } },
    { id: "V6-skeleton-away", item: "control E1", build: () => { const sk = find("Skeleton.vue"); const dt = posix.dirname(find("DataTable.vue")); return { write: manualMove(posix.dirname(sk), dt, (f) => f === sk), names: [`${dt}/Skeleton.vue`, sk] }; } },
    { id: "V7-css-global-one", item: "G-07 (B-28)", build: () => { const b = find("Badge.vue"); const s = "src/styles/zz-badge-only.css"; return { write: { [s]: `.zz-badge-only{color:red}\n`, [b]: `${read(b)}\n<style src="../../styles/zz-badge-only.css"></style>\n` }, names: [s] }; } },
    { id: "V9-nest-cycle-clean", item: "G-12", build: () => { const b = find("Badge.vue"); const d = posix.dirname(b); return { write: { [`${d}/zzTone.ts`]: `export const zzTone = 1;\n`, [`${d}/badge-dot/BadgeDot.vue`]: `<script setup lang="ts">\nimport { zzTone } from "../zzTone";\nimport { zzDotSize } from "./dotSize";\nvoid zzTone; void zzDotSize;\n</script>\n<template><span /></template>\n`, [`${d}/badge-dot/dotSize.ts`]: `export const zzDotSize = 2;\n`, [b]: inScript(b, `import __ZzDot from "./badge-dot/BadgeDot.vue"; import { zzTone as __zzT } from "./zzTone"; void __ZzDot; void __zzT;`) }, names: [`${d}/badge-dot`, `${d}/zzTone.ts`] }; } },
    { id: "V10-registry-sole-reader", item: "G-08 (P07a, bite arm)", legal: true, build: () => { const gd = find("GlassDock.vue"); const d = posix.dirname(gd); const w = {}; let t = ""; for (const n of ["ZzRegA", "ZzRegB", "ZzRegC"]) { w[`${d}/${n}.vue`] = `<script setup lang="ts">\nimport { zzRegTone } from "./zzRegTone";\nvoid zzRegTone;\n</script>\n<template><span /></template>\n`; t += `import ${n} from "./${n}.vue";\n`; } w[`${d}/zzRegTone.ts`] = `export const zzRegTone = 1;\n`; t += `export const zzRegistry = { a: ZzRegA, b: ZzRegB, c: ZzRegC };\n`; w[`${d}/zzRegistry.ts`] = t; w[gd] = inScript(gd, `import { zzRegistry as __zzR } from "./zzRegistry"; void __zzR;`); return { write: w, names: [`${d}/zzRegistry.ts`] }; } },
    { id: "V8-b8-test-reads-demo", item: "G-04 (B8, L4.2)", build: () => { const t = `${posix.dirname(find("Badge.vue"))}/__tests__/zz-reads-demo.test.ts`; const demo = files.find((f) => /^demo\/.*\.ts$/.test(f) && !/\.d\.ts$/.test(f)); return { write: { [t]: `import { it, expect } from "vitest";\nimport * as D from "${posix.relative(posix.dirname(t), demo).replace(/\.ts$/, "")}";\nimport * as B from "..";\nit("x", () => { expect(D && B).toBeTruthy(); });\n` }, names: [t] }; } },
];
const counts = (lines) => Object.fromEntries(lines.map((l) => /^(PASS|FAIL) (\w+) (\d+)/.exec(l)).filter(Boolean).map((m) => [m[2], +m[3]]));
function runGate() { const r = spawnSync("sh", ["-c", GATE], { cwd: T, encoding: "utf8", maxBuffer: 1 << 28 }); const lines = `${r.stdout}\n${r.stderr}`.split("\n").map((l) => l.trim()).filter(Boolean); return { code: r.status, lines, c: counts(lines) }; }
const base = runGate();
const results = [];
for (const p of PLANTS) {
    if (only && !only.includes(p.id)) continue;
    let spec;
    try { spec = p.build(); } catch (e) { results.push({ id: p.id, verdict: "N/A", why: e.message }); console.log(`N/A ${p.id} ${e.message}`); continue; }
    const saved = new Map(); const created = [];
    let r;
    try {
        for (const [f, text] of Object.entries(spec.write)) {
            if (existsSync(join(T, f))) saved.set(f, readFileSync(join(T, f))); else created.push(f);
            if (text === null) { unlinkSync(join(T, f)); continue; }
            mkdirSync(dirname(join(T, f)), { recursive: true });
            writeFileSync(join(T, f), text);
        }
        r = runGate();
    } catch (e) { r = { code: null, lines: [`PLANT-ERROR ${e.message}`], c: {} }; }
    finally {
        for (const [f, bytes] of saved) { mkdirSync(dirname(join(T, f)), { recursive: true }); writeFileSync(join(T, f), bytes); }
        for (const f of created) { try { unlinkSync(join(T, f)); } catch {} let d = dirname(join(T, f)); while (d.startsWith(T) && d !== T) { try { if (readdirSync(d).length) break; rmdirSync(d); } catch { break; } d = dirname(d); } }
    }
    const rose = Object.entries(r.c).filter(([k, n]) => n > (base.c[k] ?? 0)).map(([k, n]) => `${k} ${base.c[k] ?? 0}→${n}`);
    const bs = new Set(base.lines);
    const fresh = r.lines.filter((l) => !bs.has(l) && !l.startsWith("eponym {"));
    const verdict = r.code === null ? "ERROR" : rose.length || fresh.some((l) => spec.names.some((n) => l.includes(n))) ? "CAUGHT" : "MISSED";
    results.push({ id: p.id, item: p.item, verdict, rose, fresh: fresh.slice(0, 8) });
    console.log(`${verdict.padEnd(8)}${p.id} (${p.item}) rose: ${rose.join(", ") || "-"} | ${fresh.slice(0, 3).join(" | ").slice(0, 300)}`);
}
const st = execSync("git status --porcelain", { cwd: T, encoding: "utf8" }).split("\n").filter(Boolean).length;
console.log(JSON.stringify({ base: base.c, statusLinesAfter: st }));
if (opt("--out")) writeFileSync(opt("--out"), JSON.stringify({ base: base.c, results, statusLinesAfter: st }, null, 1));
