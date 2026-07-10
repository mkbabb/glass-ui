#!/usr/bin/env node
// PROTOTYPE (BH round-2 spec-structure G1 extension) — the globality clause (T3).
//
// The decidable family count (STRUCTURE-SPEC §1.3 T3): a shared-tree leaf earns
// its module-level home iff it clears the bar. The naive grep|family|distinct
// count is WRONG (it greenlit the A1 flagship's 7 illegal folds), so the count
// specifies its inclusion/exclusion set:
//   INCLUDE composition edges  — a leaf real-imported by a SIBLING shared leaf
//                                belongs to that sibling's shared family.
//   INCLUDE demo/sibling usage — a leaf a consumer app uses APP-GLOBALLY.
//   EXCLUDE provide/inject DI plumbing.
//   EXCLUDE root-barrel + curated-aggregator re-exports (a PUBLISH edge).
// The OVERRIDING rule: a shared leaf COMPOSED BY A SIBLING SHARED LEAF or USED
// APP-GLOBALLY (incl. published on the root barrel/a subpath) STAYS shared,
// regardless of component-family count. Below the bar, it colocates under its
// sole owner.
//
// The pure decide() runs over an INJECTED consumer descriptor so the self-test
// can feed synthetic leaves. The TWO ANTI-FOLD bites the directive names:
//   (1) morphSignatures — sibling-shared-composed (useGooMorph) → STAYS shared;
//   (2) a root-barrel consumer → STAYS shared (published public primitive).
// + a FOLD-fence so the clause is not vacuous (a genuinely single-owner leaf
//   with no sibling/app-global/publish signal FOLDS).

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve, relative, basename, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

function resolveRoot() {
    const arg = process.argv.find((a) => a.startsWith("--root="));
    if (arg) return resolve(arg.slice("--root=".length));
    return resolve(fileURLToPath(new URL("../../", import.meta.url)));
}
const ROOT = resolveRoot();
const SRC = resolve(ROOT, "src");
const rel = (p) => relative(ROOT, p).split(sep).join("/");
const BAR = 2; // the ≥2-unrelated-family bar (aligned to inv-10)

/**
 * The PURE promotion decider over an INJECTED consumer descriptor:
 *   { leaf,
 *     componentFamilies,   // count of DISTINCT component families (DI-excluded)
 *     siblingComposed,     // imported by a SIBLING shared-tree leaf
 *     appGlobalDirect,     // used directly by demo/sibling app code
 *     publishedPublic,     // re-exported on the root barrel / a subpath
 *     externalEvidence,    // a docs/consumer-evidence/ record (T3a) }
 * Returns { verdict: "STAYS-SHARED" | "FOLD", reason }.
 */
export function decide(d) {
    // The OVERRIDING keep-shared signals (any one keeps it shared at ANY count).
    if (d.siblingComposed)
        return { verdict: "STAYS-SHARED", reason: "composed by a sibling shared leaf (its shared family)" };
    if (d.appGlobalDirect)
        return { verdict: "STAYS-SHARED", reason: "used app-globally by consumer app code" };
    // §2.5 CORRECTION: publication is a PUBLISH-surface signal, NOT a physical-
    // location signal — a subpath-entry re-exports the deep colocated leaf (B4),
    // so a published leaf can STILL fold physically. publishedPublic is advisory.
    // (was: if (d.publishedPublic) return STAYS-SHARED — the conflation bug.)
    if (d.externalEvidence)
        return { verdict: "STAYS-SHARED", reason: "T3a — recorded external cross-repo consumer" };
    // The family-count bar (DI + re-export edges already excluded upstream).
    if (d.componentFamilies >= BAR)
        return { verdict: "STAYS-SHARED", reason: `${d.componentFamilies} unrelated component families (≥ ${BAR})` };
    // FOLD requires EXACTLY ONE component family — a sole owner to colocate under.
    // A 0-family leaf has nowhere to fold: it is a published-subpath primitive or a
    // shared aggregate (deadness is proof:no-dead-export's charge, not this gate's).
    if (d.componentFamilies === 1)
        return { verdict: "FOLD", reason: `single owner (${d.familyNames?.[0] ?? "1 family"}) — colocate under its sole consumer` };
    return { verdict: "STAYS-SHARED", reason: "0 in-repo component families — published/global primitive with no sole owner to fold into" };
}

// ── The live census — classify each shared-leaf's importers across src/ + demo/.
function listSharedLeaves() {
    const out = [];
    const base = resolve(SRC, "composables");
    const walk = (dir) => {
        for (const e of readdirSync(dir, { withFileTypes: true })) {
            const full = resolve(dir, e.name);
            if (e.isDirectory()) { if (e.name !== "__tests__") walk(full); }
            else if (/^use[A-Z].*\.ts$/.test(e.name) || /[A-Za-z]+\.ts$/.test(e.name)) {
                if (e.name === "index.ts" || e.name.endsWith(".d.ts")) continue;
                out.push(full);
            }
        }
    };
    walk(base);
    return out;
}

function collectImporters(dir, acc, exts) {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
        const full = resolve(dir, e.name);
        if (e.isDirectory()) {
            if (["__tests__", "node_modules", "dist", ".git"].includes(e.name)) continue;
            collectImporters(full, acc, exts);
        } else if (exts.some((x) => e.name.endsWith(x))) acc.push(full);
    }
    return acc;
}

function componentFamilyOf(relPath) {
    const m = relPath.match(/^src\/components\/(?:ui|custom)\/([a-z0-9-]+)\//);
    return m ? m[1] : null;
}

function censusLeaf(leafPath, allFiles) {
    const symbol = basename(leafPath, ".ts");
    const importRe = new RegExp(`from\\s+["'][^"']*\\/${symbol}["']`);
    const families = new Set();
    let siblingComposed = false;
    let appGlobalDirect = false;
    let publishedPublic = false;
    for (const f of allFiles) {
        if (f === leafPath) continue;
        const src = readFileSync(f, "utf8");
        if (!importRe.test(src)) continue;
        const r = rel(f);
        // EXCLUDE root-barrel / curated-aggregator re-exports (publish edges) —
        // BUT record that publication happened (the keep-shared signal).
        const isReexport = /^src\/(index|[a-z-]+)\.ts$/.test(r) || /\/index\.ts$/.test(r) || r.startsWith("src/subpaths/") || r === "src/api/index.ts";
        if (isReexport) { publishedPublic = true; continue; }
        if (r.startsWith("src/composables/")) { siblingComposed = true; continue; }
        if (r.startsWith("demo/")) { appGlobalDirect = true; continue; }
        const fam = componentFamilyOf(r);
        if (fam) families.add(fam);
    }
    const d = {
        leaf: rel(leafPath),
        componentFamilies: families.size,
        familyNames: [...families],
        siblingComposed,
        appGlobalDirect,
        publishedPublic,
        externalEvidence: existsSync(resolve(ROOT, "docs/consumer-evidence", `${kebab(symbol)}.md`)),
    };
    return { d, verdict: decide(d) };
}
function kebab(s) {
    return s.replace(/^use/, "").replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function selfTest() {
    const fails = [];
    const check = (d, expect, name) => {
        const { verdict } = decide(d);
        if (verdict !== expect) fails.push(`[SELF-TEST] ${name}: expected ${expect}, got ${verdict}`);
    };
    // (1) morphSignatures — sibling-shared-composed → STAYS shared (anti-fold).
    check(
        { leaf: "morphSignatures", componentFamilies: 1, siblingComposed: true, appGlobalDirect: false, publishedPublic: true, externalEvidence: false },
        "STAYS-SHARED", "morphSignatures (composed by sibling useGooMorph)",
    );
    // (2) REFRAMED (§2.5) — a root-barrel re-export is EXCLUDED from the family
    //     count; publication does NOT keep a leaf PHYSICALLY shared (the subpath-
    //     entry re-points to the deep leaf, B4). A 1-family leaf whose only extra
    //     "consumer" is the root barrel FOLDS — the re-export must not masquerade
    //     as a 2nd family (the anti-false-KEEP bite the T3 EXCLUDE clause is for).
    check(
        { leaf: "useDockCtaReceive", componentFamilies: 1, siblingComposed: false, appGlobalDirect: false, publishedPublic: true, externalEvidence: false },
        "FOLD", "root-barrel-published, single in-repo family (folds per §2.5; re-export excluded from count)",
    );
    // FOLD-fence — a genuine single-owner leaf FOLDS (the clause is not vacuous).
    check(
        { leaf: "useDockCtaReceive", componentFamilies: 1, siblingComposed: false, appGlobalDirect: false, publishedPublic: false, externalEvidence: false },
        "FOLD", "single-owner dock composable (no sibling/app-global/publish)",
    );
    // ≥2-family — STAYS shared by count.
    check(
        { leaf: "useResizeObserver", componentFamilies: 4, siblingComposed: false, appGlobalDirect: false, publishedPublic: false, externalEvidence: false },
        "STAYS-SHARED", "≥2 component families",
    );
    // app-global (demo-direct) — STAYS shared.
    check(
        { leaf: "useBloomUp", componentFamilies: 0, siblingComposed: false, appGlobalDirect: true, publishedPublic: false, externalEvidence: false },
        "STAYS-SHARED", "app-global demo route bloom",
    );
    // T3a — external evidence keeps a 0-family published subpath shared.
    check(
        { leaf: "useVirtualSectionWindow", componentFamilies: 0, siblingComposed: false, appGlobalDirect: false, publishedPublic: true, externalEvidence: true },
        "STAYS-SHARED", "T3a external-consumer subpath",
    );
    return fails;
}

function run() {
    const leaves = listSharedLeaves();
    const allFiles = [
        ...collectImporters(SRC, [], [".ts", ".vue"]),
        ...(existsSync(resolve(ROOT, "demo")) ? collectImporters(resolve(ROOT, "demo"), [], [".ts", ".vue"]) : []),
    ];
    const results = leaves.map((l) => censusLeaf(l, allFiles));
    const folds = results.filter((r) => r.verdict.verdict === "FOLD");
    const selfFails = selfTest();

    console.log("PROTO proof:colocation globality clause (T3) — the decidable family count");
    console.log(`  scanned ${leaves.length} shared-tree leaves (root=${rel(SRC)})`);
    console.log(`  FOLD candidates (single-owner, no keep-shared signal): ${folds.length}`);
    for (const r of folds) console.log(`    → FOLD ${r.d.leaf}  [families: ${r.d.familyNames.join(",") || "0"}]  ${r.verdict.reason}`);
    // Named anti-fold spot-checks on the live tree.
    for (const name of ["morphSignatures", "useLiquidReveal", "useBloomUp"]) {
        const hit = results.find((r) => basename(r.d.leaf, ".ts") === name);
        if (hit) console.log(`  anti-fold check ${name}: ${hit.verdict.verdict} — ${hit.verdict.reason}`);
    }
    console.log(`  self-test bites: ${selfFails.length === 0 ? "6/6 handled ✓" : selfFails.length + " FAILED"}`);
    if (selfFails.length) { console.log("\nSELF-TEST FAILURES:"); for (const f of selfFails) console.log(`  ✗ ${f}`); }
    const status = selfFails.length === 0 ? "PASS (self-test)" : "FAIL";
    console.log(`\n  status: ${status}   (census is advisory — the FOLD list is the round-2 fold set)`);
    process.exit(selfFails.length === 0 ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) run();
