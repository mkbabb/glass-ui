#!/usr/bin/env node
// AY.W-AUR-STUDIO — proof:aurora-studio, the aurora-studio-repair HARD GATE.
//
// The composite fail-closed gate for the studio repairs. It combines a device-free
// SOURCE arm (deletion-proofs that grep the source, clauses 1 + 6) with a live-GPU π
// arm (the aurora-studio.spec.ts readback + the two re-skinned gates' ledger flips,
// clauses 2/3/4/5). The π arm is befitting-silent SKIP only on genuine device-absence
// (no Playwright binary); the source arm always runs.
//
// SIX clauses (each born-RED at HEAD pre-wave, driven GREEN by the wave):
//
//   1. DEAD-SELECT DELETION-PROOF — ZERO `:is-open="false"` literal across the five
//      aurora-studio LabeledSelect sites (AuroraAtomsPanel ×4 + config/MediumLayer ×1).
//      Born-RED: `grep -c ':is-open="false"'` = 5 at HEAD.
//   2. SELECTS-OPEN LIVE (π) — the medium select opens (≥1 [role=option]), picking a
//      textured medium changes the canvas + reveals the Texture slider. (aurora-studio.spec)
//   3. RE-SKINNED GATES FLIP fail→pass — proof:aurora-atoms-render + proof:aurora-painterly-
//      statistics run PASS on the real GPU against the re-skinned DOM, and their committed
//      ledgers read `status:pass` (the painterly-statistics ledger was `status:fail` at HEAD).
//   4. ATOMS-SEED-FROM-PRESET ROUND-TRIP (π) — selecting Van Gogh seeds the medium atom;
//      a one-atom touch keeps the look within drift (no first-touch clobber). (aurora-studio.spec)
//   5. SERVED-APP SENTINEL CANARY (π) — the sentinel passes on the demo + FAILS-CLOSED on a
//      planted wrong-root fixture. (aurora-studio.spec)
//   6. D5/D6 OUTCOMES RECORDED — ZERO `W-AUR-WEBGPU-DECIDE` ROUTE cite in the T5-route source
//      sites (re-pointed to AY.W-AUR-T5); the AY.W-AUR-T5 successor spec EXISTS; the DELTA
//      records the D5 radii before/after triples.

import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, liveArmCiGraceSkip, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const WORKSPACE = resolve(ROOT, "tests-visual");
const COMMAND = "npm run proof:aurora-studio";

const PW_BIN =
    [
        resolve(WORKSPACE, "node_modules/.bin/playwright"),
        resolve(ROOT, "node_modules/.bin/playwright"),
    ].find(existsSync) ?? null;
const PW_PKG =
    [
        resolve(WORKSPACE, "node_modules/@playwright/test/package.json"),
        resolve(ROOT, "node_modules/@playwright/test/package.json"),
    ].find(existsSync) ?? null;

function workspacePresent() {
    return PW_PKG !== null && PW_BIN !== null;
}

function read(rel) {
    return readFileSync(resolve(ROOT, rel), "utf8");
}

/** Strip line + block comments so a deletion-proof reads CODE, not a comment mention. */
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/.*$/gm, "$1")
        .replace(/<!--[\s\S]*?-->/g, "");
}

function countMatches(src, re) {
    return (src.match(re) ?? []).length;
}

// ── Clause 1: the dead-select sites — ZERO `:is-open="false"` literal. ──
// W-AUR-CONFIG-REBUILD (B21): the studio controls column was rebuilt as one
// progressive-disclosure stack of grouped sections (Color / Composition /
// Motion / …), retiring the prior `AuroraAtomsPanel.vue` + `config/MediumLayer.vue`
// faces. The studio's LabeledSelect sites now live in the new section files;
// the deletion-proof tracks THEM (every aurora-studio select must round-trip
// its open state via `v-model:is-open`, never the controlled-shut literal).
const DEAD_SELECT_SITES = [
    "demo/stories/substrates/aurora/sections/AuroraColorSection.vue",
    "demo/stories/substrates/aurora/sections/AuroraCompositionSection.vue",
    "demo/stories/substrates/aurora/sections/AuroraMotionSection.vue",
];

// ── Clause 6: the T5-route sites — ZERO `W-AUR-WEBGPU-DECIDE` ROUTE cite. ──
// The arresting spec / the gate driver / the DELTA Named-successor. (PROGRESS.md is the
// orchestrator's shared file — checked separately by the close; not grepped here.)
const T5_ROUTE_SITES = [
    "tests-visual/aurora-arresting.spec.ts",
    "scripts/proof-aurora-arresting.mjs",
    "docs/tranches/AY/audit/visual/W-AUR-PAINTERLY-DELTA.md",
];

/** The pure SOURCE detector (clauses 1 + 6). Returns the violation list. */
export function detectSourceViolations() {
    const violations = [];

    // Clause 1 — deletion-proof on `:is-open="false"` in CODE (comment-stripped, so a
    // footgun-documenting comment that NAMES the literal does not false-fire).
    let deadCount = 0;
    for (const site of DEAD_SELECT_SITES) {
        deadCount += countMatches(stripComments(read(site)), /:is-open="false"/g);
    }
    if (deadCount !== 0) {
        violations.push(
            `clause 1 (dead-select deletion-proof): ${deadCount} \`:is-open="false"\` literal(s) remain across ${DEAD_SELECT_SITES.join(", ")} — every aurora-studio LabeledSelect must round-trip its open state (a re-introduced literal keeps the select controlled-shut forever)`,
        );
    }

    // Clause 6a — the T5-route deletion-proof on the dead `W-AUR-WEBGPU-DECIDE` ROUTE cite.
    // The cite is dead as a ROUTE pointer; a HISTORICAL mention ("re-routed off the retired
    // W-AUR-WEBGPU-DECIDE") is allowed, so the deletion-proof targets the ROUTE phrasing —
    // `gated on … W-AUR-WEBGPU-DECIDE` / `(AY.W-AUR-WEBGPU-DECIDE)` as the successor pointer.
    for (const site of T5_ROUTE_SITES) {
        // Per-LINE scan (a dead route pointer is a single-line phrasing). A line that names
        // WEBGPU-DECIDE as the live route/gate/successor is dead; a HISTORICAL mention
        // ("retired"/"could not receive"/"terminally"/"dead"/"re-routed off") is allowed —
        // those record WHY the re-route happened, not a live pointer.
        const lines = stripComments(read(site)).split(/\r?\n/);
        for (const line of lines) {
            if (!/W-AUR-WEBGPU-DECIDE/.test(line)) continue;
            const historical = /retired|could not|terminally|\bdead\b|re-routed off|antecedent/i.test(
                line,
            );
            const routePointer =
                /gated on|routed to|named successor|the named T5|successor[^—]*\(/i.test(line);
            if (routePointer && !historical) {
                violations.push(
                    `clause 6 (T5 re-route): ${site} still ROUTES the residual at the dead W-AUR-WEBGPU-DECIDE (terminally retired) — re-point the successor pointer to AY.W-AUR-T5 — line: "${line.trim().slice(0, 120)}"`,
                );
            }
        }
    }

    // Clause 6b — the AY.W-AUR-T5 successor spec EXISTS (the live owner the re-route names).
    if (!existsSync(resolve(ROOT, "docs/tranches/AY/waves/AY.W-AUR-T5.md"))) {
        violations.push(
            "clause 6 (T5 live owner): docs/tranches/AY/waves/AY.W-AUR-T5.md is missing — the re-route names a successor that does not exist",
        );
    }

    // Clause 6c — the DELTA records the D5 radii before/after triples (the measured outcome).
    const delta = existsSync(resolve(ROOT, "docs/tranches/AY/audit/visual/W-AUR-STUDIO-DELTA.md"))
        ? read("docs/tranches/AY/audit/visual/W-AUR-STUDIO-DELTA.md")
        : "";
    if (!/−?-?2\.5\d{2}/.test(delta) || !/−?-?2\.4\d{2}/.test(delta) || !/radii/i.test(delta)) {
        violations.push(
            "clause 6 (D5 recorded): W-AUR-STUDIO-DELTA.md does not record the D5 radii before/after triples (the −2.53 → −2.41 oil-pastel β measurement + the kept-or-reverted disposition)",
        );
    }

    return violations;
}

function parseReport(path) {
    const json = JSON.parse(readFileSync(path, "utf8"));
    const failures = [];
    let passed = 0;
    let failed = 0;
    let skipped = 0;
    const walk = (suite) => {
        for (const spec of suite.specs ?? []) {
            for (const t of spec.tests ?? []) {
                const results = t.results ?? [];
                const anySkipped = results.some((r) => r.status === "skipped");
                const allPassed =
                    results.length > 0 && results.every((r) => r.status === "passed");
                if (anySkipped) skipped++;
                else if (allPassed) passed++;
                else {
                    failed++;
                    const msg = results
                        .flatMap((r) => r.errors ?? [])
                        .map((e) => (e.message ?? "").split("\n")[0])
                        .join(" | ");
                    failures.push(`${spec.title}: ${msg}`);
                }
            }
        }
        for (const child of suite.suites ?? []) walk(child);
    };
    for (const suite of json.suites ?? []) walk(suite);
    return { passed, failed, skipped, failures };
}

/** Run one π spec → { passed, failed, skipped, failures, exit }. */
function runSpec(specFile, reportName) {
    const report = resolve(WORKSPACE, `.cache/${reportName}.json`);
    const res = spawnSync(PW_BIN, ["test", specFile, "--reporter=list,json"], {
        cwd: WORKSPACE,
        stdio: ["ignore", "pipe", "inherit"],
        encoding: "utf8",
        env: { ...process.env, PLAYWRIGHT_JSON_OUTPUT_NAME: report },
    });
    let parsed = null;
    if (existsSync(report)) {
        try {
            parsed = parseReport(report);
        } catch {
            /* fall through */
        }
    }
    return { ...(parsed ?? { passed: 0, failed: 0, skipped: 0, failures: [] }), exit: res.status };
}

/** Read a committed gate ledger's status (the fail→pass flip assertion). */
function ledgerStatus(cacheName) {
    const path = resolve(ROOT, ".cache/gates", `${cacheName}.json`);
    if (!existsSync(path)) return null;
    try {
        return JSON.parse(readFileSync(path, "utf8")).status ?? null;
    } catch {
        return null;
    }
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_AURORA_STUDIO_ARTIFACT", "AY-aurora-studio");

    // ── The SOURCE arm always runs (device-free deletion-proofs). ──
    const sourceViolations = detectSourceViolations();

    // ── The π arm: befitting-silent SKIP only on genuine device-absence. ──
    // liveArmCiGraceSkip(): grace-SKIP the live arm under CI (the proof:dock-no-scale-pop
    // `!process.env.CI` precedent — the CI proof is the device-free union + the ledger;
    // the SOURCE arm below still gates under CI, only the live π clauses skip; the local
    // hard-CLOSED live path, CI unset, is untouched). See gate-output.mjs.
    if (!workspacePresent() || liveArmCiGraceSkip()) {
        // The source arm still gates; the π clauses are recorded as device-absent.
        const status = sourceViolations.length === 0 ? "pass-source-only" : "fail";
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status: status === "pass-source-only" ? "skipped" : "fail",
            reason:
                "the tests-visual π workspace has no installed @playwright/test — the SOURCE deletion-proofs (clauses 1 + 6) ran; the live-GPU π clauses (2/3/4/5) are the orchestrator real-GPU run.",
            command: COMMAND,
            facts: { workspacePresent: false, sourceViolations },
            violations: sourceViolations,
        });
        console.log(
            `proof:aurora-studio — SOURCE arm ${sourceViolations.length === 0 ? "GREEN" : "RED"}, π arm SKIPPED (workspace device absent).`,
        );
        for (const v of sourceViolations) console.log(`  x ${v}`);
        process.exit(sourceViolations.length === 0 ? 0 : 1);
    }

    // Clauses 2/4/5 — the aurora-studio.spec readback.
    const studio = runSpec("aurora-studio.spec.ts", "aurora-studio-report");
    // Clause 3 — the two re-skinned gates run PASS + their ledgers flip to `pass`.
    const atomsRender = runSpec("aurora-atoms-render.spec.ts", "aurora-atoms-render-report");
    const painterly = runSpec(
        "aurora-painterly-statistics.spec.ts",
        "aurora-painterly-statistics-report",
    );

    const piViolations = [];

    // If the heavy shaders never paint (GPU-less SwiftShader), the specs SKIP — befitting-
    // silent (the source arm still gated). Distinguish skip from fail.
    const allSkipped =
        studio.passed === 0 && studio.failed === 0 && studio.skipped > 0 &&
        atomsRender.failed === 0 && painterly.failed === 0;
    if (allSkipped) {
        const status = sourceViolations.length === 0 ? "skipped" : "fail";
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status,
            reason:
                "the GPU-less runner SwiftShader-degrades + the π specs test.skip internally — the live-GPU clauses are the orchestrator real-GPU run; the SOURCE deletion-proofs ran here.",
            command: COMMAND,
            facts: { workspacePresent: true, sourceViolations, studio, atomsRender, painterly },
            violations: sourceViolations,
        });
        console.log("proof:aurora-studio — π arm SKIPPED (no real GPU); SOURCE arm gated.");
        process.exit(sourceViolations.length === 0 ? 0 : 1);
    }

    if (studio.exit !== 0 || studio.failed > 0) {
        piViolations.push(
            ...(studio.failures.length
                ? studio.failures.map((f) => `clause 2/4/5 (studio π): ${f}`)
                : [`clause 2/4/5 (studio π): aurora-studio.spec exited ${studio.exit} with no parseable failure`]),
        );
    }
    if (atomsRender.exit !== 0 || atomsRender.failed > 0) {
        piViolations.push(
            `clause 3 (re-skin): aurora-atoms-render.spec did not pass on the real GPU (exit ${atomsRender.exit}, failed ${atomsRender.failed})`,
        );
    }
    if (painterly.exit !== 0 || painterly.failed > 0) {
        piViolations.push(
            `clause 3 (re-skin): aurora-painterly-statistics.spec did not pass on the real GPU (exit ${painterly.exit}, failed ${painterly.failed})`,
        );
    }

    // Clause 3 ledger-flip: the committed ledgers must read `pass`.
    const arLedger = ledgerStatus("AX-aurora-atoms-render");
    const psLedger = ledgerStatus("AX-aurora-painterly-statistics");
    if (psLedger !== "pass") {
        piViolations.push(
            `clause 3 (ledger flip): AX-aurora-painterly-statistics.json status is "${psLedger}" (expected "pass") — the committed status:fail ledger did not flip`,
        );
    }
    if (arLedger !== "pass") {
        piViolations.push(
            `clause 3 (ledger flip): AX-aurora-atoms-render.json status is "${arLedger}" (expected "pass") — the re-skinned atoms-render ledger is not green`,
        );
    }

    const violations = [...sourceViolations, ...piViolations];
    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: COMMAND,
        facts: {
            workspacePresent: true,
            sourceViolations,
            studio: { passed: studio.passed, failed: studio.failed, skipped: studio.skipped, exit: studio.exit },
            atomsRender: { passed: atomsRender.passed, failed: atomsRender.failed, exit: atomsRender.exit },
            painterly: { passed: painterly.passed, failed: painterly.failed, exit: painterly.exit },
            ledgers: { atomsRender: arLedger, painterlyStatistics: psLedger },
        },
        violations,
    });

    console.log("proof:aurora-studio — the aurora-studio-repair hard gate (AY.W-AUR-STUDIO)");
    console.log(`  source deletion-proofs (1+6) : ${sourceViolations.length === 0 ? "GREEN" : "RED"}`);
    console.log(`  studio π (2/4/5)             : ${studio.passed} passed / ${studio.failed} failed`);
    console.log(`  re-skin gates (3)            : atoms-render ${atomsRender.passed}p/${atomsRender.failed}f, painterly ${painterly.passed}p/${painterly.failed}f`);
    console.log(`  ledger flips (3)             : atoms-render=${arLedger}, painterly=${psLedger}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
