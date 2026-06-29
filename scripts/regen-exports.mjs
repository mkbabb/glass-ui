#!/usr/bin/env node
// regen-exports.mjs — the fail-CLOSED package.json exports generator (BH.B2.1-mech).
// ============================================================================
// Re-derives the published-subpath surface (`package.json` exports +
// `typesVersions`) from the SINGLE-SOURCE classification in
// `scripts/lib/subpath-policy.mjs` — NOT from the 79 `src/subpaths/*.ts` mirror
// lines and NOT from a deny-list that defaults a stranger to PUBLIC.
//
// FAIL-CLOSED: every `src/components/{ui,custom}/<dir>` + every
// `src/composables/<subtree>` on disk MUST carry an EXPLICIT PUBLISH | INTERNAL |
// CURATED classification. A dir with no entry is a HARD ERROR (exit 1) — never a
// silent auto-publish onto the semver export surface.
//
// THREE LAYERS the gate proves:
//   1. fail-closed classification — every disk dir classified, else exit 1.
//   2. symbol-fidelity existence  — every PUBLISH/CURATED source barrel EXISTS +
//      is NON-EMPTY, else exit 1 (the EXISTENCE half; verify-export-types proves
//      the symbol SET post-build).
//   3. EXACT_REPRODUCTION — the PUBLISH-driven regen reproduces package.json's
//      `exports` + `typesVersions` with ZERO add/drop/mismatch, else exit 1. This
//      proves the explicit classification is a faithful re-expression of the
//      shipped surface, not a behaviour change.
//
// READ-ONLY by default (the gate's check mode). `--write` is the B2.1-swap
// capability (re-pins package.json against the LANDED post-WS12 surface); it is
// never invoked by `proof:subpath-classify`.
//
// MODES (CLI):
//   (default)             — real tree; exit 0 IFF classified + fidelity + exact.
//   --inject-unclassified — real tree + a synthetic phantom dir; MUST exit 1.
//   --break-fidelity      — real tree + a phantom hand-mapped source; MUST exit 1.
//   --json                — emit the machine report to stdout (the gate parses it).
//   --write               — re-pin package.json exports/typesVersions in place
//                           (REQUIRES classified + fidelity; refuses otherwise).
// ============================================================================

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import {
    REPO_ROOT,
    buildEntrySet,
    classifyAll,
    emitExports,
    readTree,
    symbolFidelity,
} from "./lib/subpath-policy.mjs";

const ARGS = new Set(process.argv.slice(2));
const MODE = ARGS.has("--inject-unclassified")
    ? "inject"
    : ARGS.has("--break-fidelity")
      ? "break-fidelity"
      : "real";
const JSON_OUT = ARGS.has("--json");
const WRITE = ARGS.has("--write");

// ---------------------------------------------------------------------------
// COMPUTE
// ---------------------------------------------------------------------------
const tree = readTree({ injectUnclassified: MODE === "inject" });
const cls = classifyAll(tree);
const fidelity = symbolFidelity(tree, { breakFidelity: MODE === "break-fidelity" });

// regen + zero-delta diff against package.json. Skipped under --inject (the
// injected phantom would itself add a spurious ./zzz key; the inject run's point
// is the fail-closed ERROR, not reproduction).
let regen = null;
const pkgPath = resolve(REPO_ROOT, "package.json");
if (cls.pass) {
    const { entries, collisions } = buildEntrySet(tree);
    const emitted = emitExports(entries);
    const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
    const curKeys = new Set(Object.keys(pkg.exports));
    const newKeys = new Set(Object.keys(emitted.exports));
    const drops = [...curKeys].filter((k) => !newKeys.has(k)).sort();
    const adds = [...newKeys].filter((k) => !curKeys.has(k)).sort();
    const targetMismatches = [];
    for (const k of curKeys) {
        if (!newKeys.has(k)) continue;
        if (JSON.stringify(pkg.exports[k]) !== JSON.stringify(emitted.exports[k]))
            targetMismatches.push({ key: k, current: pkg.exports[k], emitted: emitted.exports[k] });
    }
    const curTV = pkg.typesVersions["*"];
    const newTV = emitted.typesVersions["*"];
    const tvDrops = Object.keys(curTV).filter((k) => !(k in newTV)).sort();
    const tvAdds = Object.keys(newTV).filter((k) => !(k in curTV)).sort();
    const tvMismatch = Object.keys(curTV).filter(
        (k) => k in newTV && JSON.stringify(curTV[k]) !== JSON.stringify(newTV[k]),
    );
    regen = {
        currentExportKeys: curKeys.size,
        emittedExportKeys: newKeys.size,
        jsSubpaths: Object.keys(entries).filter((n) => n !== "index").length,
        publishUi: cls.tiers.ui.counts.PUBLISH,
        publishCustom: cls.tiers.custom.counts.PUBLISH,
        collisions,
        drops,
        adds,
        targetMismatchCount: targetMismatches.length,
        targetMismatches,
        tvDrops,
        tvAdds,
        tvMismatchCount: tvMismatch.length,
        EXACT_REPRODUCTION:
            drops.length === 0 &&
            adds.length === 0 &&
            targetMismatches.length === 0 &&
            tvDrops.length === 0 &&
            tvAdds.length === 0 &&
            tvMismatch.length === 0,
        emitted: WRITE ? emitted : undefined,
    };
}

// ---------------------------------------------------------------------------
// VERDICT (the fail-explicit gate semantics)
// ---------------------------------------------------------------------------
let exit = 0;
let verdict = "EXIT 0 — fail-closed PASS + fidelity PASS + regen exact.";
if (!cls.pass) {
    exit = 1;
    verdict = "EXIT 1 — fail-closed: unclassified dir is a HARD ERROR, never a silent publish.";
} else if (fidelity.failed.length) {
    exit = 1;
    verdict = "EXIT 1 — symbol-fidelity existence failure.";
} else if (regen && !regen.EXACT_REPRODUCTION) {
    exit = 1;
    verdict = "EXIT 1 — regen no longer reproduces package.json.";
}

// ---------------------------------------------------------------------------
// --write — the B2.1-swap re-pin capability (refuses on any failure; never run by
// the gate). Replaces package.json's exports + typesVersions wholesale from the
// re-derived surface, preserving 4-space indent + trailing newline.
// ---------------------------------------------------------------------------
if (WRITE) {
    if (exit !== 0) {
        console.error("regen-exports --write REFUSED — surface not classified/faithful (exit 1).");
        process.exit(1);
    }
    const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
    pkg.exports = regen.emitted.exports;
    pkg.typesVersions = regen.emitted.typesVersions;
    writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 4)}\n`);
    console.log(`regen-exports --write — re-pinned ${Object.keys(pkg.exports).length} export keys in package.json`);
}

// ---------------------------------------------------------------------------
// REPORT
// ---------------------------------------------------------------------------
const report = {
    mode: MODE,
    failClosed: { pass: cls.pass, unclassified: cls.unclassified, stale: cls.stale },
    tiers: cls.tiers,
    symbolFidelity: { total: fidelity.total, failedCount: fidelity.failed.length, failed: fidelity.failed },
    regen: regen
        ? {
              currentExportKeys: regen.currentExportKeys,
              emittedExportKeys: regen.emittedExportKeys,
              jsSubpaths: regen.jsSubpaths,
              collisions: regen.collisions,
              drops: regen.drops,
              adds: regen.adds,
              targetMismatchCount: regen.targetMismatchCount,
              tvDrops: regen.tvDrops,
              tvAdds: regen.tvAdds,
              tvMismatchCount: regen.tvMismatchCount,
              EXACT_REPRODUCTION: regen.EXACT_REPRODUCTION,
          }
        : null,
    exitCode: exit,
};

if (JSON_OUT) {
    console.log(JSON.stringify(report, null, 2));
} else {
    console.log(`=== regen-exports — MODE=${MODE} ===\n`);
    for (const t of [cls.tiers.ui, cls.tiers.custom, cls.tiers.composable]) {
        console.log(
            `[${t.tier}] disk=${t.total}  PUBLISH=${t.counts.PUBLISH} INTERNAL=${t.counts.INTERNAL} CURATED=${t.counts.CURATED}  unclassified=${t.unclassified.length} stale=${t.stale.length}`,
        );
        if (t.unclassified.length) console.log(`    UNCLASSIFIED: ${t.unclassified.join(", ")}`);
        if (t.stale.length) console.log(`    STALE(classified-but-absent): ${t.stale.join(", ")}`);
    }
    console.log(
        `\nFAIL-CLOSED CHECK: ${cls.pass ? "PASS — every dir classified" : "FAIL — unclassified dir(s) present"}`,
    );
    if (!cls.pass) console.log(`  >>> ${cls.unclassified.length} unclassified: ${cls.unclassified.join(", ")}`);
    console.log(`\nSYMBOL-FIDELITY EXISTENCE: ${fidelity.total} sources checked, ${fidelity.failed.length} failed`);
    for (const f of fidelity.failed) console.log(`  MISSING/EMPTY [${f.kind}] ${f.name}: ${f.rel} (${f.reason})`);
    if (regen) {
        console.log(
            `\nREGEN (PUBLISH-driven): exportKeys ${regen.emittedExportKeys}/${regen.currentExportKeys}  jsSubpaths=${regen.jsSubpaths}  drops=${regen.drops.length} adds=${regen.adds.length} targetMismatch=${regen.targetMismatchCount} tvDrops=${regen.tvDrops.length} tvAdds=${regen.tvAdds.length} collisions=${regen.collisions.join(",") || "(none)"}`,
        );
        if (regen.adds.length) console.log(`  ADDS: ${regen.adds.join(", ")}`);
        if (regen.drops.length) console.log(`  DROPS: ${regen.drops.join(", ")}`);
        console.log(`  >>> EXACT REPRODUCTION: ${regen.EXACT_REPRODUCTION ? "YES" : "NO"}`);
    }
    console.log(`\n${verdict}`);
}

process.exit(exit);
