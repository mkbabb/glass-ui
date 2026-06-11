#!/usr/bin/env node
// AZ.W-CLOSE — the AZ terminal-close meta-gate (proof:az-final). Release-only (NOT ci).
//
// The DEV-meta successor of proof:ay-final: it asserts the AZ close is COHERENT and
// staged to READY-TO-PUBLISH (or coherently AT-CUT). At authoring time it is born-RED
// (FINAL.md absent; four reflection records mid-triumvirate) and greens only at the
// discharged terminal state.
//
// detectFinal asserts (the 10 clauses of AZ.W-CLOSE §1.3):
//   1.  FINAL-EXISTS + per-wave green citation — docs/tranches/AZ/FINAL.md exists AND for
//       each AZ wave id (read from docs/tranches/AZ/waves/*.md filenames, NOT hardcoded)
//       a green/DELTA/live-verified citation sits within 200 chars of the id.
//   2.  R3-CLOSURE — docs/tranches/AZ/audit/R3-CLOSURE-MATRIX.md carries all 15 R3 rows;
//       every row names >=1 discharging wave + >=1 binding `proof:*` gate; every row whose
//       headless-trap cell asserts `yes` ALSO has (a) a non-trivial π/live re-verify clause
//       cell AND (b) its PRIMARY discharging wave's AZ PROGRESS status token = `live-verified`
//       (the π-backed status the cardinal ledger enforces) — a source-green-only citation for
//       a headless-trap item is the clause-2 RED.
//   3.  BUDGET-REBASELINED — the committed baseline exists AND `profile-bundle.mjs --enforce
//       --skip-build` exits 0.
//   4.  NO-OPEN-LIVE-PENDING — across the AZ PROGRESS wave rows, zero `live-pending` status
//       tokens and zero positive `(DEVELOPED)`/`(DELTA owed)` modifiers.
//   5.  CARDINAL — proof:live-verified-ledger:az + :ay + :ax + proof:disposition-live all
//       exit 0 (the AZ-active arm, the two tracker arms, the register completeness).
//   6.  RUNNER-TRUTH BY EXECUTION — every AZ-minted runtime-dependent gate (the manifest
//       below; device-free gates are exempt BY the manifest tag, not by grep) is RE-RUN in
//       the synthesized device-absent shell (GLASS_UI_SYNTH_DEVICE_ABSENT=1 — the seam the
//       three π-running gates carry) and must exit 0 WITH a SKIP line on stdout. The grep
//       is never the witness; the executed exit-0-with-skip-line is.
//   7.  ZERO-ORPHANS — docs/tranches/AZ/audit/W-CLOSE-overfitting-audit.md exists and records
//       the `ORPHANS: 0` verdict line.
//   8.  STAGED-OR-CUT — staged: version 3.10.1 + >=1 .changeset/*.md; at-cut: version
//       3.13.x + changesets consumed + a CHANGELOG `## 3.13.0` entry. Anything else is the
//       silent-bump RED.
//   9.  CLEAN-TREE — `git status --porcelain` carries only the documented USER-DOMAIN
//       allowlist (the docs/precepts submodule pointer).
//   10. THE REFLECTION BAR — proof:az-reflect exits 0 (every roster surface holds an
//       operative-PASS reflection record with on-disk captures; zero open FAILs).
//
// BORN-RED WITNESS (2026-06-11, authoring tree): clause 1 RED (FINAL.md absent), clause 10
// RED (4 records mid-triumvirate awaiting the pass-2 re-stamp) — the gate REDs honestly on
// the not-yet-closed state. Self-proof rides the ay-final architecture: the pure detector
// takes injected IO, so each clause is unit-falsifiable.

import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

// Clause 6 — the AZ-minted gate manifest. `runtime` gates spawn a π workspace and carry
// the GLASS_UI_SYNTH_DEVICE_ABSENT seam; `device-free` gates are exempt BY THIS TAG (the
// one-line manifest exemption the spec names — never by grep).
const AZ_GATE_MANIFEST = [
    { id: "proof:adaptive-glass-live", class: "runtime" },
    { id: "proof:blob-page", class: "runtime" },
    { id: "proof:blob-studio", class: "runtime" },
    { id: "proof:rail3", class: "device-free" },
    { id: "proof:motion2", class: "device-free" },
    { id: "proof:dock-rail-hairline", class: "device-free" },
    { id: "proof:dock-no-scale-pop", class: "device-free" },
    { id: "proof:adaptive-observer", class: "device-free" },
    { id: "proof:register-ios", class: "device-free" },
    { id: "proof:dock-taxonomy", class: "device-free" },
    { id: "proof:rail-extend", class: "device-free" },
    { id: "proof:dock-contextual-layers", class: "device-free" },
    { id: "proof:blob-page-fence", class: "device-free" },
    { id: "proof:motion-demo", class: "device-free" },
    { id: "proof:shell-identity", class: "device-free" },
    { id: "proof:blob-studio-config", class: "device-free" },
    { id: "proof:shell-config", class: "device-free" },
    { id: "proof:dock-tap-integrity", class: "device-free" },
    { id: "proof:no-scoped-global", class: "device-free" },
    { id: "proof:card-veil", class: "device-free" },
    { id: "proof:morph-showcase", class: "device-free" },
    { id: "proof:hierarchy", class: "device-free" },
    { id: "proof:suffuse", class: "device-free" },
    { id: "proof:metric-core", class: "device-free" },
    { id: "proof:constellation-gen", class: "device-free" },
    { id: "proof:glass-panel-tiers", class: "device-free" },
    { id: "proof:gate-manifest-sound", class: "device-free" },
    { id: "proof:az-reflect", class: "device-free" },
];

const CLEAN_TREE_ALLOWLIST = new Set(["docs/precepts"]);
const R3_IDS = Array.from({ length: 15 }, (_, i) => `R3-${i + 1}`);

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        FINAL: resolve(ROOT, "docs/tranches/AZ/FINAL.md"),
        AUDIT: resolve(ROOT, "docs/tranches/AZ/audit/W-CLOSE-overfitting-audit.md"),
        MATRIX: resolve(ROOT, "docs/tranches/AZ/audit/R3-CLOSURE-MATRIX.md"),
        WAVES_DIR: resolve(ROOT, "docs/tranches/AZ/waves"),
        AZ_PROGRESS: resolve(ROOT, "docs/tranches/AZ/PROGRESS.md"),
        BASELINE: resolve(ROOT, "docs/tranches/AP/W4-bundle-profile.baseline.json"),
        CHANGESET_DIR: resolve(ROOT, ".changeset"),
        PKG: resolve(ROOT, "package.json"),
        CHANGELOG: resolve(ROOT, "CHANGELOG.md"),
        ARTIFACT: gateArtifactPath("GLASS_UI_AZ_FINAL_ARTIFACT", "AZ-final"),
    };
    return _cliPaths;
}

function waveIds(WAVES_DIR) {
    if (!existsSync(WAVES_DIR)) return [];
    return readdirSync(WAVES_DIR)
        .filter((f) => /^AZ\.W.*\.md$/.test(f))
        .map((f) => f.replace(/^AZ\./, "").replace(/\.md$/, ""))
        .sort();
}

function statusToken(status) {
    return status.split(/[—·(]/)[0].trim().toLowerCase();
}

function waveRows(md) {
    const rows = [];
    md.split("\n").forEach((ln, i) => {
        if (!ln.trimStart().startsWith("|")) return;
        const cells = ln.split("|").map((c) => c.trim());
        const body = cells.filter((_, idx) => idx > 0 && idx < cells.length - 1);
        if (body.length < 2) return;
        const wave = body[0];
        if (!/^W(\d|-[A-Z])/.test(wave)) return;
        rows.push({ wave, status: body[body.length - 1], line: i + 1 });
    });
    return rows;
}

function openLivePendingReason(status) {
    if (statusToken(status) === "live-pending") return "status token is `live-pending`";
    if (/\(\s*developed\s*\)/i.test(status)) return "carries the retired `(DEVELOPED)` modifier";
    if (/\(\s*delta\s+owed\s*\)/i.test(status) && !/no\s[^()]*delta\s+owed/i.test(status))
        return "carries an open `(DELTA owed)` modifier";
    return null;
}

/** Parse the R3-CLOSURE-MATRIX table → one row per R3 id.
 *  Columns: | R3 | surface | discharging wave(s) | completion clause | binding gate |
 *  headless-trap | π/live clause | */
function matrixRows(md) {
    const rows = new Map();
    for (const ln of md.split("\n")) {
        if (!ln.trimStart().startsWith("|")) continue;
        const cells = ln.split("|").map((c) => c.trim());
        const body = cells.filter((_, idx) => idx > 0 && idx < cells.length - 1);
        if (body.length < 7) continue;
        const idMatch = body[0].match(/R3-(\d{1,2})/);
        if (!idMatch) continue;
        rows.set(`R3-${idMatch[1]}`, {
            waves: [...body[2].matchAll(/W-[A-Z0-9-]+/g)].map((m) => m[0]),
            gates: [...body[4].matchAll(/proof:[a-z0-9-]+/g)].map((m) => m[0]),
            headlessTrap: /^\s*\*{0,2}yes/i.test(body[5]),
            piClause: body[6],
        });
    }
    return rows;
}

function unallowedDirt(ROOT) {
    const out = execFileSync("git", ["status", "--porcelain"], { cwd: ROOT, encoding: "utf8" });
    return out
        .split("\n")
        .filter((l) => l.trim() !== "")
        .map((l) => {
            const path = l.slice(3).trim();
            const arrow = path.indexOf(" -> ");
            return arrow === -1 ? path : path.slice(arrow + 4);
        })
        .filter((p) => !CLEAN_TREE_ALLOWLIST.has(p));
}

function npmGreen(ROOT, script) {
    try {
        execFileSync("npm", ["run", script], { cwd: ROOT, stdio: "ignore" });
        return true;
    } catch {
        return false;
    }
}

function budgetEnforceGreen(ROOT) {
    try {
        execFileSync("node", ["scripts/profile-bundle.mjs", "--enforce", "--skip-build"], {
            cwd: ROOT,
            stdio: "ignore",
        });
        return true;
    } catch {
        return false;
    }
}

/** Clause 6 — run one runtime gate in the synthesized device-absent shell. */
function synthAbsentRun(ROOT, id) {
    const res = spawnSync("npm", ["run", id], {
        cwd: ROOT,
        encoding: "utf8",
        env: { ...process.env, GLASS_UI_SYNTH_DEVICE_ABSENT: "1" },
    });
    const out = `${res.stdout ?? ""}${res.stderr ?? ""}`;
    return {
        id,
        exit0: res.status === 0,
        skipLinePrinted: /SKIP/i.test(out),
    };
}

function changesetFiles(CHANGESET_DIR) {
    if (!existsSync(CHANGESET_DIR)) return [];
    return readdirSync(CHANGESET_DIR).filter(
        (f) => f.endsWith(".md") && f.toLowerCase() !== "readme.md",
    );
}

/** The pure detector — all IO injected. */
export function detectFinal(inputs) {
    const violations = [];
    const facts = {};

    // (1) FINAL-EXISTS + per-wave green citation.
    if (inputs.finalMd == null) {
        violations.push("docs/tranches/AZ/FINAL.md is absent");
        facts.finalExists = false;
    } else {
        facts.finalExists = true;
        const missing = [];
        for (const w of inputs.waveIds) {
            const re = new RegExp(
                `${w}\\b[\\s\\S]{0,200}(run|actions|green|DELTA|live-verified|complete)`,
                "i",
            );
            if (!re.test(inputs.finalMd)) missing.push(w);
        }
        facts.wavesTotal = inputs.waveIds.length;
        facts.wavesCited = inputs.waveIds.length - missing.length;
        for (const w of missing)
            violations.push(
                `FINAL.md does not cite a green run/DELTA for ${w} (no run/green/DELTA/live-verified/complete within 200 chars of the wave id)`,
            );
    }

    // (2) R3-CLOSURE — the matrix is the binding artefact.
    if (inputs.matrixMd == null) {
        violations.push("docs/tranches/AZ/audit/R3-CLOSURE-MATRIX.md is absent (the clause-2 binding artefact)");
        facts.r3Closed = 0;
    } else {
        const rows = matrixRows(inputs.matrixMd);
        const azStatusByWave = new Map(
            waveRows(inputs.azProgress).map((r) => [r.wave, statusToken(r.status)]),
        );
        let closed = 0;
        for (const id of R3_IDS) {
            const row = rows.get(id);
            if (!row) {
                violations.push(`R3 matrix: ${id} has no row`);
                continue;
            }
            const probs = [];
            if (row.waves.length === 0) probs.push("no discharging W-* wave named");
            if (row.gates.length === 0) probs.push("no binding proof:* gate named");
            if (row.headlessTrap) {
                if ((row.piClause ?? "").length < 40)
                    probs.push("headless-trap: yes but the π/live re-verify clause cell is trivial");
                const primary = row.waves[0];
                const tok = primary ? azStatusByWave.get(primary) : null;
                // The π-backed status: live-verified (the ledger enforces its DELTA).
                // An R3 item discharged by a wave whose own π half is the binding truth
                // cannot cite a source-green-only state.
                if (primary && tok !== "live-verified")
                    probs.push(
                        `headless-trap: yes but the primary discharging wave ${primary} has AZ PROGRESS status token '${tok ?? "(no row)"}' (needs the π-backed 'live-verified')`,
                    );
            }
            if (probs.length) violations.push(`R3 matrix ${id}: ${probs.join("; ")}`);
            else closed++;
        }
        facts.r3Closed = closed;
    }

    // (3) BUDGET.
    facts.budgetExists = inputs.budgetExists;
    facts.budgetEnforceGreen = inputs.budgetEnforceGreen;
    if (!inputs.budgetExists)
        violations.push("docs/tranches/AP/W4-bundle-profile.baseline.json is absent");
    if (!inputs.budgetEnforceGreen)
        violations.push("profile-bundle.mjs --enforce is RED (dist drift over the baseline)");

    // (4) NO-OPEN-LIVE-PENDING on the AZ board.
    const open = [];
    for (const r of waveRows(inputs.azProgress)) {
        const reason = openLivePendingReason(r.status);
        if (reason) open.push(`AZ ${r.wave} (line ${r.line}): ${reason}`);
    }
    facts.openLivePending = open;
    if (open.length)
        violations.push(`${open.length} AZ PROGRESS row(s) carry an open status: ${open.join("; ")}`);

    // (5) CARDINAL — the three ledger arms + the disposition register.
    facts.ledgerAzGreen = inputs.ledgerAzGreen;
    facts.ledgerAyGreen = inputs.ledgerAyGreen;
    facts.ledgerAxGreen = inputs.ledgerAxGreen;
    facts.dispositionGreen = inputs.dispositionGreen;
    if (!inputs.ledgerAzGreen) violations.push("proof:live-verified-ledger:az is RED");
    if (!inputs.ledgerAyGreen) violations.push("proof:live-verified-ledger:ay is RED");
    if (!inputs.ledgerAxGreen) violations.push("proof:live-verified-ledger:ax is RED");
    if (!inputs.dispositionGreen) violations.push("proof:disposition-live is RED");

    // (6) RUNNER-TRUTH BY EXECUTION.
    facts.runnerTruth = inputs.synthRuns;
    for (const r of inputs.synthRuns) {
        if (!r.exit0)
            violations.push(
                `RUNNER-TRUTH: ${r.id} hard-REDs in the synthesized device-absent shell (no executable skip-by-policy path)`,
            );
        else if (!r.skipLinePrinted)
            violations.push(
                `RUNNER-TRUTH: ${r.id} exits 0 in the device-absent shell but prints NO skip line (a silent pass is indistinguishable from a vacuous one)`,
            );
    }

    // (7) ZERO-ORPHANS.
    if (inputs.auditMd == null) {
        violations.push("docs/tranches/AZ/audit/W-CLOSE-overfitting-audit.md is absent");
        facts.zeroOrphans = false;
    } else {
        facts.zeroOrphans = /ORPHANS:\s*\*{0,2}0\*{0,2}/.test(inputs.auditMd);
        if (!facts.zeroOrphans)
            violations.push("W-CLOSE-overfitting-audit.md does not record the `ORPHANS: 0` verdict");
    }

    // (8) STAGED-OR-CUT.
    facts.changesets = inputs.changesets;
    facts.pkgVersion = inputs.pkgVersion;
    const staged = inputs.pkgVersion === "3.10.1" && inputs.changesets.length > 0;
    const cut =
        /^3\.13\.\d+$/.test(inputs.pkgVersion) &&
        inputs.changesets.length === 0 &&
        /^## 3\.13\.0$/m.test(inputs.changelogMd ?? "");
    facts.cutState = cut ? "at-cut" : staged ? "staged" : "invalid";
    if (!staged && !cut)
        violations.push(
            `the cut state is neither STAGED (version 3.10.1 + a .changeset/*.md) nor AT-CUT (version 3.13.x + changeset consumed + a CHANGELOG '## 3.13.0' entry) — version '${inputs.pkgVersion}', ${inputs.changesets.length} changeset(s)`,
        );

    // (9) CLEAN-TREE.
    facts.unallowedDirt = inputs.dirt;
    if (inputs.dirt.length)
        violations.push(
            `the working tree carries ${inputs.dirt.length} non-allowlisted dirty entr${inputs.dirt.length === 1 ? "y" : "ies"}: ${inputs.dirt.join(", ")}`,
        );

    // (10) THE REFLECTION BAR.
    facts.reflectGreen = inputs.reflectGreen;
    if (!inputs.reflectGreen)
        violations.push(
            "proof:az-reflect is RED (a surface is mid-triumvirate — the close cannot start while any reflection record's operative verdict is FAIL)",
        );

    facts.clean = violations.length === 0;
    return { facts, violations };
}

function run() {
    const P = cliPaths();
    const synthRuns = AZ_GATE_MANIFEST.filter((g) => g.class === "runtime").map((g) =>
        synthAbsentRun(P.ROOT, g.id),
    );
    const inputs = {
        finalMd: existsSync(P.FINAL) ? readFileSync(P.FINAL, "utf8") : null,
        auditMd: existsSync(P.AUDIT) ? readFileSync(P.AUDIT, "utf8") : null,
        matrixMd: existsSync(P.MATRIX) ? readFileSync(P.MATRIX, "utf8") : null,
        waveIds: waveIds(P.WAVES_DIR),
        azProgress: existsSync(P.AZ_PROGRESS) ? readFileSync(P.AZ_PROGRESS, "utf8") : "",
        dirt: unallowedDirt(P.ROOT),
        budgetExists: existsSync(P.BASELINE),
        budgetEnforceGreen: budgetEnforceGreen(P.ROOT),
        ledgerAzGreen: npmGreen(P.ROOT, "proof:live-verified-ledger:az"),
        ledgerAyGreen: npmGreen(P.ROOT, "proof:live-verified-ledger:ay"),
        ledgerAxGreen: npmGreen(P.ROOT, "proof:live-verified-ledger:ax"),
        dispositionGreen: npmGreen(P.ROOT, "proof:disposition-live"),
        reflectGreen: npmGreen(P.ROOT, "proof:az-reflect"),
        synthRuns,
        changesets: changesetFiles(P.CHANGESET_DIR),
        pkgVersion: JSON.parse(readFileSync(P.PKG, "utf8")).version,
        changelogMd: existsSync(P.CHANGELOG) ? readFileSync(P.CHANGELOG, "utf8") : null,
    };
    const { facts, violations } = detectFinal(inputs);
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:az-final",
        facts,
        violations,
    });

    console.log("proof:az-final — the AZ terminal-close meta-gate (release-only, W-CLOSE)");
    console.log(`  FINAL.md present           : ${facts.finalExists ? "YES" : "NO"}`);
    console.log(`  per-wave green citations   : ${facts.wavesCited ?? 0}/${facts.wavesTotal ?? inputs.waveIds.length}`);
    console.log(`  R3 closure (matrix)        : ${facts.r3Closed ?? 0}/15`);
    console.log(`  budget rebaselined+enforced: ${facts.budgetExists && facts.budgetEnforceGreen ? "YES" : "NO"}`);
    console.log(`  no open live-pending       : ${facts.openLivePending && facts.openLivePending.length === 0 ? "YES" : "NO"}`);
    console.log(`  cardinal az/ay/ax/disp     : ${facts.ledgerAzGreen ? "Y" : "N"}/${facts.ledgerAyGreen ? "Y" : "N"}/${facts.ledgerAxGreen ? "Y" : "N"}/${facts.dispositionGreen ? "Y" : "N"}`);
    console.log(`  runner-truth (executed)    : ${synthRuns.filter((r) => r.exit0 && r.skipLinePrinted).length}/${synthRuns.length} runtime gates skip clean (+${AZ_GATE_MANIFEST.length - synthRuns.length} device-free by manifest)`);
    console.log(`  zero orphans (audit)       : ${facts.zeroOrphans ? "YES" : "NO"}`);
    console.log(`  cut state                  : ${facts.cutState} (version ${facts.pkgVersion}; ${facts.changesets.length} changeset(s))`);
    console.log(`  clean tree (allowlisted)   : ${facts.unallowedDirt && facts.unallowedDirt.length === 0 ? "YES" : "NO"}`);
    console.log(`  reflection bar             : ${facts.reflectGreen ? "GREEN" : "RED"}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(P.ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) run();
