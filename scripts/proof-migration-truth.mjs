#!/usr/bin/env node
// BI.W-MIGRATION-TRUE-UP — proof:migration-truth (device-free; the pure-detector
// house pattern, the proof-doc-truth / proof-subpath-enumeration sibling).
//
// THE CLASS THIS KILLS — the binding-doc dangling-row lie. MIGRATION.md's 5.0.0
// `/api` re-home table is BINDING: a consumer follows it symbol-by-symbol at the
// cut (each `./api` symbol swaps its import PATH onto the owning subpath). At HEAD
// three rows (`PaperGridConfig` / `PaperGridHandle` / `UsePaperGridOptions`)
// pointed a consumer at the DELETED `/paper-grid` subpath under the pre-rename
// symbol names — self-contradicted within the SAME 5.0.0 section (the
// BG.W-GRID-AFFINE note that renames `PaperGrid`→`LiquidGrid` and
// `/paper-grid`→`/liquid-grid`). The lie is structural: a dangling target routes a
// consumer to a non-existent subpath.
//
// The cure is disk-following, not hand-maintained: for EVERY row the gate resolves
// the target subpath's barrel ON DISK (the same colocated-barrel entry map
// `regen-exports` / `proof:subpath-classify` own via `scripts/lib/subpath-policy`)
// and asserts the row is VALID — the target is a live export key AND the named
// symbol is exported by that subpath's barrel. A future rename that leaves a
// dangling row REDs the gate.
//
//   M1 — every `/api` table target subpath is a live `package.json` export key.
//   M2 — every `/api` table symbol is exported by its target subpath's barrel on
//        disk (a full transitive export-graph walk: local decls + named/namespace
//        re-exports + wildcard `export *` recursion; `.vue` default re-exports
//        resolve by their re-export alias without opening the SFC).
//   M3 — no row targets a DROPPED / RENAMED subpath (`/paper-grid`, `/goo-blob`,
//        `/goo-dot-matrix`, `/api`) — the durable catch independent of a
//        package.json that may transiently lag a rename.
//
// Self-test bites (falsifiable, run inline every invocation): a synthetic row
// targeting `/paper-grid` REDs M1+M3; a synthetic row naming a symbol its subpath
// does not export REDs M2; a well-formed real-subpath row with a real symbol
// PASSES (the no-false-positive floor).
//
// STRUCTURAL/doc-truth wave — NO π, NO proof:ba-gestalt (zero pixels). Device-free
// (a static disk read — the source-read house pattern, so it can never itself go
// stale). Tagged ["local","ci"].
//
// CLI: `--audit` prints every row's per-clause verdict (the build-time inspector).

import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { REPO_ROOT, buildEntrySet, readTree } from "./lib/subpath-policy.mjs";

const ROOT = REPO_ROOT;
const COMMAND = "npm run proof:migration-truth";
const MIGRATION = "MIGRATION.md";
const PKG = "package.json";

// Subpaths dropped or renamed at the 5.0.0 cut — an `/api` table target must never
// name one (the durable born-RED catch, independent of a package.json export set
// that may transiently lag the rename's serialized apply).
export const DROPPED_SUBPATHS = new Set(["paper-grid", "goo-blob", "goo-dot-matrix", "api"]);

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// ── The disk export-graph resolver ────────────────────────────────────────────
// Resolve a relative module specifier from `fromFile` to a concrete on-disk file.
function resolveModule(spec, fromFile) {
    if (!spec.startsWith(".")) return null; // package specifiers are not walked
    const p = resolve(dirname(fromFile), spec);
    for (const c of [p + ".ts", p + ".tsx", p + ".d.ts", resolve(p, "index.ts"), resolve(p, "index.tsx"), p + ".vue"]) {
        if (existsSync(c)) return c;
    }
    return null;
}

// Collect the FULL set of exported symbol names reachable from an entry barrel:
// local `export` declarations, named / namespace re-exports, and `export *`
// wildcard recursion. `.vue` files are not parsed as TS — a component's default is
// named by its re-export alias (`export { default as X } from "./X.vue"`), so the
// alias `X` is already captured at the re-exporting barrel.
export function collectExports(entryAbs, seen = new Set(), out = new Set()) {
    if (!entryAbs || seen.has(entryAbs)) return out;
    seen.add(entryAbs);
    if (entryAbs.endsWith(".vue")) return out;
    if (!existsSync(entryAbs)) return out;
    const text = readFileSync(entryAbs, "utf8");
    const sf = ts.createSourceFile(entryAbs, text, ts.ScriptTarget.Latest, true);
    for (const st of sf.statements) {
        if (ts.isExportDeclaration(st)) {
            if (st.exportClause) {
                if (ts.isNamedExports(st.exportClause)) {
                    for (const el of st.exportClause.elements) out.add(el.name.text);
                } else if (ts.isNamespaceExport(st.exportClause)) {
                    out.add(st.exportClause.name.text);
                }
            } else if (st.moduleSpecifier && ts.isStringLiteral(st.moduleSpecifier)) {
                const mod = resolveModule(st.moduleSpecifier.text, entryAbs);
                if (mod) collectExports(mod, seen, out);
            }
        } else if (ts.isExportAssignment(st)) {
            out.add("default");
        } else if ((st.modifiers ?? []).some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) {
            if (ts.isVariableStatement(st)) {
                for (const d of st.declarationList.declarations) if (ts.isIdentifier(d.name)) out.add(d.name.text);
            } else if (st.name && ts.isIdentifier(st.name)) {
                out.add(st.name.text);
            }
        }
    }
    return out;
}

// ── Parse the `/api` re-home table ────────────────────────────────────────────
// Each body row is `| \`Symbol\` | type|const | \`@mkbabb/glass-ui\` (root) | ` or
// `| \`Symbol\` | type|const | \`/subpath\` |`. Returns rows with the resolved
// bare subpath name (`root` for the root barrel).
export function parseApiTable(migText) {
    const rows = [];
    for (const line of migText.split("\n")) {
        const m = line.match(/^\|\s*`([^`]+)`\s*\|\s*(type|const)\s*\|\s*(.+?)\s*\|\s*$/);
        if (!m) continue;
        const symbol = m[1].trim();
        const kind = m[2];
        const targetRaw = m[3].trim();
        if (symbol === "symbol") continue; // header row (defensive)
        let sub;
        if (/\(root\)/.test(targetRaw)) sub = "root";
        else {
            const tm = targetRaw.match(/`\/([^`]+)`/);
            if (!tm) continue; // a non-subpath cell — not an /api row
            sub = tm[1].trim();
        }
        rows.push({ symbol, kind, targetRaw, sub });
    }
    return rows;
}

// ── Disk truth: subpath name → package.json export key + entry barrel file ─────
function pkgKeyFor(sub) {
    return sub === "root" ? "." : `./${sub}`;
}

function buildEntryMap() {
    // buildEntrySet returns { name → rel source }; `index` is the root "." barrel.
    const { entries } = buildEntrySet(readTree());
    const map = new Map();
    for (const [name, rel] of Object.entries(entries)) map.set(name === "index" ? "root" : name, rel);
    return map;
}

// ── Evaluate one row against disk (M1/M2/M3) ──────────────────────────────────
export function evalRow(row, ctx) {
    const key = pkgKeyFor(row.sub);
    const m1 = ctx.pkgKeys.has(key);
    const m3 = !DROPPED_SUBPATHS.has(row.sub);
    const rel = ctx.entryMap.get(row.sub);
    let exps = ctx.exportCache.get(row.sub);
    if (!exps) {
        exps = rel ? collectExports(resolve(ROOT, rel)) : new Set();
        ctx.exportCache.set(row.sub, exps);
    }
    const m2 = exps.has(row.symbol);
    return { ...row, key, entry: rel ?? null, m1, m2, m3, ok: m1 && m2 && m3 };
}

function makeCtx() {
    const pkg = read(PKG);
    let pkgKeys = new Set();
    try {
        pkgKeys = new Set(Object.keys(JSON.parse(pkg).exports ?? {}));
    } catch {
        /* empty → every M1 reds */
    }
    return { pkgKeys, entryMap: buildEntryMap(), exportCache: new Map() };
}

// ── Run ───────────────────────────────────────────────────────────────────────
function detect() {
    const migText = read(MIGRATION);
    const ctx = makeCtx();
    const rows = parseApiTable(migText);
    const evals = rows.map((r) => evalRow(r, ctx));
    const checks = [];
    const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

    // Parse-sanity floor (NOT a count freeze — the exact disk-true count is M1/M2/M3's
    // concern; a stub/parse-regression that guts the map to a handful of rows REDs here).
    add("table-nonempty", rows.length >= 150, `parsed ${rows.length} /api re-home rows (a substantial map — a parse regression / gutted stub REDs)`);

    // M1 — target subpath is a live package.json export key.
    const m1Bad = evals.filter((e) => !e.m1);
    add(
        "M1-target-is-live-export-key",
        rows.length > 0 && m1Bad.length === 0,
        m1Bad.length === 0
            ? `every /api target subpath is a live package.json export key (${rows.length} rows)`
            : `dangling target subpath (not a package.json export key): ${m1Bad.map((e) => `${e.symbol}→${e.targetRaw}`).join(" | ")}`,
    );

    // M2 — symbol is exported by its target subpath's barrel on disk.
    const m2Bad = evals.filter((e) => e.m1 && e.m3 && !e.m2);
    add(
        "M2-symbol-exported-by-barrel",
        rows.length > 0 && m2Bad.length === 0,
        m2Bad.length === 0
            ? `every /api symbol is exported by its target subpath's barrel on disk (${rows.length} rows)`
            : `symbol NOT exported by its target barrel: ${m2Bad.map((e) => `${e.symbol}∉${e.targetRaw} (${e.entry ?? "no entry"})`).join(" | ")}`,
    );

    // M3 — no row targets a dropped/renamed subpath.
    const m3Bad = evals.filter((e) => !e.m3);
    add(
        "M3-no-dropped-renamed-target",
        m3Bad.length === 0,
        m3Bad.length === 0
            ? `no /api row targets a dropped/renamed subpath (${[...DROPPED_SUBPATHS].map((s) => `/${s}`).join(", ")})`
            : `row targets a DROPPED/RENAMED subpath: ${m3Bad.map((e) => `${e.symbol}→${e.targetRaw}`).join(" | ")}`,
    );

    // ── Self-test bites (each planted defect MUST flag; the honest row MUST pass) ─
    const paperGridBite = evalRow({ symbol: "PaperGridConfig", kind: "type", targetRaw: "`/paper-grid`", sub: "paper-grid" }, ctx);
    add(
        "selftest-dropped-target-flags",
        !paperGridBite.m3 && (!paperGridBite.m1 || !paperGridBite.m2),
        `self-test: a synthetic /paper-grid row REDs M3 (${!paperGridBite.m3}) and M1/M2 (${!paperGridBite.m1 || !paperGridBite.m2})`,
    );
    const missingSymBite = evalRow({ symbol: "ZzzNotARealSymbol", kind: "type", targetRaw: "`/aurora`", sub: "aurora" }, ctx);
    add(
        "selftest-missing-symbol-flags",
        !missingSymBite.m2 && missingSymBite.m1,
        `self-test: a synthetic /aurora row naming a non-exported symbol REDs M2 (${!missingSymBite.m2}) while M1 stays live (${missingSymBite.m1})`,
    );
    // The no-false-positive floor — a real row over a real subpath PASSES all three.
    const honestBite = evalRow({ symbol: "AuroraConfig", kind: "type", targetRaw: "`/aurora`", sub: "aurora" }, ctx);
    add(
        "selftest-honest-row-passes",
        honestBite.ok,
        `self-test: a well-formed real row (AuroraConfig→/aurora) PASSES M1/M2/M3 (${honestBite.ok})`,
    );

    return { checks, evals, rowCount: rows.length };
}

function run() {
    const audit = process.argv.includes("--audit");
    const { checks, evals, rowCount } = detect();
    const failed = checks.filter((c) => !c.pass);
    const pass = failed.length === 0;

    console.log("proof:migration-truth — MIGRATION.md /api re-home table is disk-true (BI.W-MIGRATION-TRUE-UP)");
    console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass — ${rowCount} /api rows`);
    for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

    if (audit) {
        console.log("\n  ── per-row audit ──");
        for (const e of evals) {
            const flag = e.ok ? "OK" : `BAD${e.m1 ? "" : " M1"}${e.m2 ? "" : " M2"}${e.m3 ? "" : " M3"}`;
            if (!e.ok || process.argv.includes("--audit-all")) {
                console.log(`    ${e.ok ? "✓" : "✗"} ${e.symbol} (${e.kind}) → ${e.targetRaw}  [${flag}]  entry=${e.entry ?? "NONE"}`);
            }
        }
    }

    const ARTIFACT = gateArtifactPath("GLASS_UI_MIGRATION_TRUTH_ARTIFACT", "BI-migration-truth");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status: pass ? "pass" : "fail",
        gate: "proof:migration-truth",
        command: COMMAND,
        note: "M1 every /api table target subpath is a live package.json export key · M2 every symbol is exported by its target subpath's barrel on disk (transitive export-graph walk) · M3 no row targets a dropped/renamed subpath (/paper-grid, /goo-blob, /goo-dot-matrix, /api). Device-free; born-RED→GREEN + a 3-bite self-test.",
        rowCount,
        checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
        bad: evals.filter((e) => !e.ok).map((e) => ({ symbol: e.symbol, target: e.targetRaw, m1: e.m1, m2: e.m2, m3: e.m3 })),
    });

    if (!pass) {
        console.error(`\n[proof:migration-truth] ${failed.length} check(s) FAILED:`);
        for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
        process.exit(1);
    }
    console.log(
        "\n[proof:migration-truth] the binding /api re-home table is disk-true — every row's target subpath is a live export key AND the named symbol is exported by that barrel on disk; no row dangles onto a dropped/renamed subpath.",
    );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
