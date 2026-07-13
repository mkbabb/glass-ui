#!/usr/bin/env node
// BI.W-VIZ-DELETIONS — proof:viz-deletions, the clean-break DELETION census gate.
//
// THE PRUNE. `dot-flow-field`, `concentric`, and `dot-matrix` — the three condemned
// procedural-viz members — are DELETED by USER ORDER (the edict verbatim: "Dot flow field,
// concentric, dot matrix — all to be deleted. You've failed 30+ attempts to implement
// these."). This is a BREAKING export change routed into the 5.0.0 MAJOR cut (STRUCT-2); it
// REVERSES BG.W-DOTFLOW-REBUILD (STRUCT-14 — the family is RETIRED, not re-attempted).
//
// This gate is the terminal census lock: born-RED at HEAD (the 3 dirs + 3 subpath barrels +
// 3 package exports + 3 stories + 4 gate rows all present) → GREEN once the clean-break
// deletion lands AND the exports/gate-row de-registration is applied (via regen-exports +
// the gates.manifest.mjs de-register). The symmetric-closure discipline (W-PRUNE-CONSOLIDATE)
// is binding: a broken-reference half-delete REDs the SAME as a stub.
//
// FALSIFIABLE WITNESSES:
//
//   V1 — the 3 component dirs + the 3 subpath barrels + the 3 package exports are ABSENT.
//        `src/components/custom/{dot-flow-field,concentric,dot-matrix}/` +
//        `src/subpaths/{…}.ts` resolve to NOTHING; `package.json` publishes no
//        `./dot-flow-field` / `./concentric` / `./dot-matrix` export or typesVersions row.
//
//   V2 — the 4 per-viz gates are DE-REGISTERED. `scripts/proof-{concentric,dot-matrix,
//        viz-dotflow,flow-field}.mjs` are DELETED AND `package.json` `scripts` carry no
//        `proof:concentric` / `proof:dot-matrix` / `proof:viz-dotflow` / `proof:flow-field`
//        entry AND `scripts/gates.manifest.mjs` registers no matching gate row.
//
//   V3 — the 3 demo stories + their manifest rows are ABSENT.
//        `demo/stories/substrates/{…}.vue` resolve to NOTHING; `demo/stories/manifest.ts`
//        carries no `substrates/dot-flow-field` (etc.) route — no route resolves to a
//        deleted viz.
//
//   V4 — the shared-chunk consumer-evidence re-bases hold (NO false-green orphan). The
//        curlFBM chunk retires the deleted flow-field viz consumer (curl-fbm.md re-bases to
//        the ≥2 aurora + paper-grid bar, NOT a stale ≥3 LIVE claim naming the flow-field viz)
//        AND use-pointer-velocity-field.md no longer BOOKS the deleted DotFlowField/Concentric
//        binaries as live consumers. A shared chunk/field retaining a DELETED consumer as LIVE
//        REDs (the symmetric-closure floor).
//
//   V5 — the family docs reconcile. PROCEDURAL-SUITE.md declares SIX members (not nine) and
//        carries no dot-flow-field/concentric/dot-matrix member row; MIGRATION.md records the
//        clean-break deletion (the honest no-op-for-consumers record, not a silent prune).
//
// + a self-test bite per class (a re-minted deleted dir REDs V1; a dangling gate row REDs V2;
//   a curl-fbm.md retaining the flow-field LIVE consumer REDs V4).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

const DELETED = ["dot-flow-field", "concentric", "dot-matrix"];
// The 4 per-viz gate scripts + their `proof:` script keys (concentric/dot-matrix each own a
// gate; the dot-flow-field viz owns TWO — proof:viz-dotflow + proof:flow-field).
const GATE_SCRIPTS = [
    ["proof:concentric", "scripts/proof-concentric.mjs"],
    ["proof:dot-matrix", "scripts/proof-dot-matrix.mjs"],
    ["proof:viz-dotflow", "scripts/proof-viz-dotflow.mjs"],
    ["proof:flow-field", "scripts/proof-flow-field.mjs"],
];

const abs = (rel) => resolve(ROOT, rel);
const read = (rel) => (existsSync(abs(rel)) ? readFileSync(abs(rel), "utf8") : null);
/** Read with a self-test override: `over[rel]` (string=content, true=present, null/undefined=disk). */
function readOver(over, rel) {
    if (over && rel in over) return over[rel] === true ? "" : over[rel];
    return read(rel);
}
/** Existence with an override: `over[rel] === true` forces present, a string forces present. */
function existsOver(over, rel) {
    if (over && rel in over) return over[rel] !== false && over[rel] != null;
    return existsSync(abs(rel));
}
/** URL-safe comment strip (`(^|[^:])//` keeps `://` intact). */
function strip(src) {
    return (src ?? "")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

// ── V1 — dirs + subpath barrels + package exports ABSENT ──────────────────────
function clauseV1(over) {
    const viol = [];
    for (const id of DELETED) {
        if (existsOver(over, `src/components/custom/${id}`))
            viol.push(`V1: src/components/custom/${id}/ STILL RESOLVES — the deleted viz must be DEFINITION-ABSENT (clean break, no stub)`);
        if (existsOver(over, `src/subpaths/${id}.ts`))
            viol.push(`V1: src/subpaths/${id}.ts STILL RESOLVES — the /${id} mirror barrel must be retired (no dangling barrel)`);
    }
    const pkg = readOver(over, "package.json") ?? "";
    for (const id of DELETED) {
        if (new RegExp(`"\\./${id}"\\s*:`).test(pkg))
            viol.push(`V1: package.json STILL publishes the "./${id}" export — a deleted subpath must be un-published (run regen-exports.mjs --write)`);
        if (new RegExp(`"${id}"\\s*:\\s*\\[`).test(pkg))
            viol.push(`V1: package.json typesVersions STILL carries a "${id}" row — the deleted subpath must be un-published`);
    }
    return viol;
}

// ── V2 — the 4 per-viz gates DE-REGISTERED ───────────────────────────────────
function clauseV2(over) {
    const viol = [];
    const pkg = readOver(over, "package.json") ?? "";
    const manifest = readOver(over, "scripts/gates.manifest.mjs") ?? "";
    for (const [key, script] of GATE_SCRIPTS) {
        if (existsOver(over, script))
            viol.push(`V2: ${script} STILL RESOLVES — the retired per-viz gate script must be DELETED`);
        if (new RegExp(`"${key.replace(":", "\\:")}"\\s*:`).test(pkg))
            viol.push(`V2: package.json scripts STILL carry "${key}" — de-register the retired gate (run regen-exports / hand-remove the script)`);
        // The gates.manifest row: `id: "concentric"` / `proof:concentric` in the row registry.
        const short = key.replace(/^proof:/, "");
        if (new RegExp(`(id\\s*:\\s*["']${short}["']|["']${key}["'])`).test(manifest))
            viol.push(`V2: scripts/gates.manifest.mjs STILL registers the "${key}" gate row — de-register it (the gate script is DELETED)`);
    }
    return viol;
}

// ── V3 — the 3 stories + manifest rows ABSENT ────────────────────────────────
function clauseV3(over) {
    const viol = [];
    const manifest = readOver(over, "demo/stories/manifest.ts") ?? "";
    for (const id of DELETED) {
        if (existsOver(over, `demo/stories/substrates/${id}.vue`))
            viol.push(`V3: demo/stories/substrates/${id}.vue STILL RESOLVES — a deleted viz must leave no live demo story`);
        if (new RegExp(`["']substrates/${id}["']`).test(manifest))
            viol.push(`V3: demo/stories/manifest.ts STILL carries a substrates/${id} route — no route may resolve to a deleted viz`);
    }
    return viol;
}

// ── V4 — the shared-chunk consumer-evidence re-bases (no false-green orphan) ──
function clauseV4(over) {
    const viol = [];
    const curl = strip(readOver(over, "docs/consumer-evidence/curl-fbm.md"));
    // The curlFBM chunk must NOT retain the deleted flow-field viz as a LIVE consumer #3.
    // A stale "≥3-consumer bar is MET" LIVE claim naming the flow-field viz is the orphan.
    if (curl) {
        if (/≥3-consumer bar is MET/.test(curl))
            viol.push('V4: docs/consumer-evidence/curl-fbm.md still claims the "≥3-consumer bar is MET" — the flow-field viz consumer #3 is DELETED; re-base to the ≥2 (aurora + paper-grid) bar');
        // A "LIVE NOW … flow-field viz" consumer entry (the deleted consumer surviving as live).
        if (/#3\s*—\s*LIVE NOW[\s\S]{0,120}flow-field/i.test(curl))
            viol.push("V4: curl-fbm.md still lists the flow-field viz as a LIVE consumer #3 — the deleted viz must be dropped (or marked DELETED), never LIVE");
        // The re-base must be recorded (aurora-curl-warp + paper-grid the ≥2 survivors — the
        // proof:aurora-curl-warp W4 tokens must survive).
        if (!/aurora-curl-warp/.test(curl) || !/paper-grid-breathe/.test(curl))
            viol.push("V4: curl-fbm.md dropped the surviving ≥2 consumer names (aurora-curl-warp + paper-grid-breathe) — the re-base must record them");
    }
    const pv = strip(readOver(over, "docs/consumer-evidence/use-pointer-velocity-field.md"));
    // The field must not BOOK the deleted DotFlowField/Concentric as live binary consumers.
    if (pv && /Booked binary consumers[\s\S]{0,400}<DotFlowField>[\s\S]{0,400}<Concentric>/.test(pv))
        viol.push("V4: use-pointer-velocity-field.md still BOOKS <DotFlowField> + <Concentric> as the binary consumers — they are DELETED; re-base onto the surviving live consumer set");
    return viol;
}

// ── V5 — the family docs reconcile ───────────────────────────────────────────
function clauseV5(over) {
    const viol = [];
    const suite = readOver(over, "src/components/custom/PROCEDURAL-SUITE.md") ?? "";
    if (/family of nine members|## The nine members|ALL NINE members/.test(suite))
        viol.push("V5: PROCEDURAL-SUITE.md still claims NINE members — reconcile to the SIX survivors (aurora · blob · liquid-grid · fourier-field · constellation · watercolor-dot)");
    // No deleted-viz member ROW survives in the member tables.
    for (const id of DELETED) {
        if (new RegExp(`\\|\\s*\\*\\*${id}\\*\\*\\s*\\|`).test(suite))
            viol.push(`V5: PROCEDURAL-SUITE.md still carries a **${id}** member row — the deleted viz must leave no suite-index entry`);
    }
    const mig = readOver(over, "MIGRATION.md") ?? "";
    if (!/BI\.W-VIZ-DELETIONS/.test(mig))
        viol.push("V5: MIGRATION.md records no BI.W-VIZ-DELETIONS deletion section — the clean-break must be the honest no-op-for-consumers record, not a silent prune (invariant-11)");
    return viol;
}

function runAll(over = {}) {
    return [
        ...clauseV1(over),
        ...clauseV2(over),
        ...clauseV3(over),
        ...clauseV4(over),
        ...clauseV5(over),
    ];
}

// ── Self-test: a synthetic broken tree MUST red ──
function selfTest() {
    const fails = [];

    // (a) a re-minted deleted viz dir reds V1.
    const reminted = runAll({ "src/components/custom/dot-flow-field": true });
    if (!reminted.some((v) => v.startsWith("V1")))
        fails.push("self-test: a re-minted deleted viz dir did NOT red V1");

    // (b) a dangling gate row (a surviving proof-flow-field.mjs) reds V2.
    const dangling = runAll({ "scripts/proof-flow-field.mjs": true });
    if (!dangling.some((v) => v.startsWith("V2")))
        fails.push("self-test: a surviving per-viz gate script did NOT red V2");

    // (b') a surviving package "./concentric" export reds V1.
    const exportLive = runAll({ "package.json": '{ "exports": { "./concentric": { "import": "./dist/concentric.js" } } }' });
    if (!exportLive.some((v) => v.startsWith("V1")))
        fails.push("self-test: a surviving ./concentric export did NOT red V1");

    // (c) a curl-fbm.md retaining the flow-field LIVE consumer reds V4.
    const staleCurl = runAll({
        "docs/consumer-evidence/curl-fbm.md":
            "The ≥3-consumer bar is MET.\n- #3 — LIVE NOW (the flow-field viz). aurora-curl-warp paper-grid-breathe",
    });
    if (!staleCurl.some((v) => v.startsWith("V4")))
        fails.push("self-test: a curl-fbm.md retaining the flow-field LIVE consumer did NOT red V4");

    // (d) a surviving manifest route reds V3.
    const routeLive = runAll({
        "demo/stories/manifest.ts": 'const x = { "substrates/dot-matrix": "@mkbabb/glass-ui/dot-matrix" };',
    });
    if (!routeLive.some((v) => v.startsWith("V3")))
        fails.push("self-test: a surviving substrates/dot-matrix route did NOT red V3");

    // (e) a PROCEDURAL-SUITE.md claiming nine members reds V5.
    const nineMembers = runAll({
        "src/components/custom/PROCEDURAL-SUITE.md": "a documented family of nine members",
    });
    if (!nineMembers.some((v) => v.startsWith("V5")))
        fails.push("self-test: a PROCEDURAL-SUITE.md claiming nine members did NOT red V5");

    return fails;
}

function main() {
    const isSelftest = process.argv.includes("--selftest");
    const viol = runAll();
    const selfFails = isSelftest ? selfTest() : [];
    const ok = viol.length === 0 && selfFails.length === 0;

    const artifact = {
        gate: "proof:viz-deletions",
        wave: "BI.W-VIZ-DELETIONS",
        stamp: snapshotStamp(),
        ok,
        violations: viol,
        selfTestFailures: selfFails,
    };
    const out = gateArtifactPath("GLASS_UI_VIZ_DELETIONS_ARTIFACT", "proof-viz-deletions.json");
    writeGateArtifact(out, artifact);

    console.log(
        "proof:viz-deletions — dot-flow-field / concentric / dot-matrix DELETED (the user-ordered clean-break prune, BI.W-VIZ-DELETIONS)",
    );
    if (viol.length) {
        console.error("  RED:");
        for (const v of viol) console.error("    ✗ " + v);
    } else {
        console.log(
            "  GREEN (V1 dirs+subpaths+exports absent · V2 4 gates de-registered · V3 stories+routes absent · V4 consumer-evidence re-bases hold · V5 PROCEDURAL-SUITE+MIGRATION reconciled)",
        );
    }
    if (isSelftest) {
        if (selfFails.length) {
            console.error("  --selftest — the gate FAILED to red a planted defect:");
            for (const f of selfFails) console.error("    ✗ " + f);
        } else {
            console.log("  --selftest — every planted defect RED ✓");
        }
    }
    process.exit(ok ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    main();
}

export { runAll };
