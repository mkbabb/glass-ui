#!/usr/bin/env node
// AU.W10 — the close meta-gate (proof:au-final). Release-only (NOT ci).
//
// The DEV-meta analogue of proof:au-w0-reground / proof:au-w1-design, run in
// release.sh over the full matrix on a CLEAN tree at the tag boundary. It does
// not re-run the matrix (release.sh already does); it asserts the close is
// COHERENT and the run is staged to READY-TO-PUBLISH — the publish itself is
// USER-DOMAIN (changeset version → push v3.3.0 → release.yml gated provenance).
//
// detectFinal asserts (gate-fleet §8.1):
//   1. FINAL-EXISTS  — docs/tranches/AU/AU.FINAL.md exists AND cites a green run
//      per wave (W0..W10 incl. W8b). The per-wave regex is the gate-fleet form
//      `${w}\b[\s\S]{0,200}(run|actions|green)` — each wave id needs the word
//      green/run/actions within 200 chars. Bite: drop a wave's "green" → RED.
//   2. CLEAN-TREE    — `git status --porcelain` carries ONLY the two pre-existing
//      USER-DOMAIN dirt entries (the docs/precepts submodule pointer + the
//      tranche-F aurora-profile snapshot). Any OTHER dirty entry → RED. On the
//      orchestrator's post-commit tree those two are the only survivors, so the
//      gate is GREEN; a gate that mutated a TRACKED artefact would add a third
//      entry and redden (inv-θ). See ALLOWLIST below.
//   3. MATRIX-COHERENT — `node scripts/gates.mjs --verify-ci` passes (ci==manifest)
//      AND gatesFor("release") is non-empty.
//   4. ZERO-ORPHANS  — the W10 overfitting audit shows zero orphans (cite the
//      audit md; assert it exists and records the zero-orphan verdict).
//   5. STAGED-NOT-PUBLISHED — a .changeset/*.md exists AND package.json version is
//      still "3.2.0" (the changeset stages the minor bump; `changeset version`
//      bumps it — USER-DOMAIN — so an unbumped manifest proves it is NOT yet cut).
//
// DEV-meta: no born-RED@HEAD; it greens once AU.FINAL.md + the changeset exist.
// Bite: drop a wave's "green" from AU.FINAL → RED (1); dirty a tracked file → RED
// (2); empty the release set → RED (3); delete the audit → RED (4); bump the
// version or remove the changeset → RED (5).
//
// House style mirrors proof-au-w0-reground.mjs: ESM .mjs, lazy memoized paths, a
// byte-stable JSON artefact via gate-output, a human summary, process.exit(1).

import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const WAVES = ["W0", "W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W8b", "W9", "W10"];

// CLEAN-TREE allowlist — the two PRE-EXISTING, USER-DOMAIN dirt entries that are
// NOT part of the AU close and must never false-RED the gate. The orchestrator's
// post-commit tree carries ONLY these two (the AU close files are committed):
//   - docs/precepts        — a git submodule pointer the user owns (out of scope).
//   - docs/tranches/F/audit/W5-aurora-profile.json — a tranche-F snapshot the user
//     owns (a sibling F-arm artefact, not an AU deliverable).
// A `git status --porcelain` line is `XY <path>`; we compare the path tail.
const CLEAN_TREE_ALLOWLIST = new Set([
    "docs/precepts",
    "docs/tranches/F/audit/W5-aurora-profile.json",
]);

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        FINAL: resolve(ROOT, "docs/tranches/AU/AU.FINAL.md"),
        AUDIT: resolve(ROOT, "docs/tranches/AU/audit/W10-overfitting-audit.md"),
        CHANGESET_DIR: resolve(ROOT, ".changeset"),
        PKG: resolve(ROOT, "package.json"),
        ARTIFACT: gateArtifactPath("GLASS_UI_AU_FINAL_ARTIFACT", "AU-final"),
    };
    return _cliPaths;
}

/** `git status --porcelain`, minus the documented user-domain allowlist. */
function unallowedDirt(ROOT) {
    const out = execFileSync("git", ["status", "--porcelain"], { cwd: ROOT, encoding: "utf8" });
    return out
        .split("\n")
        .filter((l) => l.trim() !== "")
        // a porcelain line is `XY <path>` (or `XY orig -> path` for renames).
        .map((l) => {
            const path = l.slice(3).trim();
            const arrow = path.indexOf(" -> ");
            return arrow === -1 ? path : path.slice(arrow + 4);
        })
        .filter((p) => !CLEAN_TREE_ALLOWLIST.has(p));
}

// We do NOT `import { gatesFor } from "./gates.mjs"` — gates.mjs runs its CLI
// dispatch unconditionally at module top-level (no import.meta.main guard), so a
// plain import would trip its usage branch + exit(2). Instead we shell the same
// manifest CLI for both the --verify-ci coherence check and the release-set
// enumeration (the meta-gate idiom — a subprocess over the single manifest).

/** `node scripts/gates.mjs --verify-ci` — true IFF it exits 0 (ci==manifest). */
function verifyCiGreen(ROOT) {
    try {
        execFileSync("node", ["scripts/gates.mjs", "--verify-ci"], { cwd: ROOT, stdio: "ignore" });
        return true;
    } catch {
        return false;
    }
}

/** `node scripts/gates.mjs --list release` — the release-tagged gate cmds. */
function releaseSet(ROOT) {
    try {
        const out = execFileSync("node", ["scripts/gates.mjs", "--list", "release"], {
            cwd: ROOT,
            encoding: "utf8",
        });
        return out.split("\n").map((l) => l.trim()).filter((l) => l.length);
    } catch {
        return [];
    }
}

/** A changeset is any .changeset/*.md that is not the README. */
function changesetFiles(CHANGESET_DIR) {
    if (!existsSync(CHANGESET_DIR)) return [];
    return readdirSync(CHANGESET_DIR).filter(
        (f) => f.endsWith(".md") && f.toLowerCase() !== "readme.md",
    );
}

/**
 * The pure detector. All IO is injected so the clauses are unit-testable.
 * @param {{finalMd:string|null, auditMd:string|null, dirt:string[],
 *   verifyCiGreen:boolean, releaseSet:Array, changesets:string[],
 *   pkgVersion:string}} inputs
 */
export function detectFinal(inputs) {
    const { finalMd, auditMd, dirt, releaseSet, changesets, pkgVersion } = inputs;
    const violations = [];
    const facts = {};

    // (1) FINAL-EXISTS + per-wave green citation.
    if (finalMd == null) {
        violations.push("docs/tranches/AU/AU.FINAL.md is absent");
        facts.finalExists = false;
    } else {
        facts.finalExists = true;
        const missing = [];
        for (const w of WAVES) {
            const re = new RegExp(`${w}\\b[\\s\\S]{0,200}(run|actions|green)`, "i");
            if (!re.test(finalMd)) missing.push(w);
        }
        facts.wavesCited = WAVES.length - missing.length;
        for (const w of missing) {
            violations.push(`AU.FINAL.md does not cite a green run for ${w} (no run/actions/green within 200 chars of the wave id)`);
        }
    }

    // (2) CLEAN-TREE (minus the documented user-domain allowlist).
    facts.unallowedDirt = dirt;
    if (dirt.length) {
        violations.push(
            `the working tree carries ${dirt.length} non-allowlisted dirty entr${dirt.length === 1 ? "y" : "ies"} (a gate mutated a tracked artefact, or the close is not committed): ${dirt.join(", ")}`,
        );
    }

    // (3) MATRIX-COHERENT — verify-ci green + a non-empty release set.
    facts.verifyCiGreen = inputs.verifyCiGreen;
    facts.releaseGates = releaseSet.length;
    if (!inputs.verifyCiGreen) violations.push("node scripts/gates.mjs --verify-ci is RED (ci.yml drifted from the manifest)");
    if (!releaseSet.length) violations.push("the release-tagged gate set is empty (gatesFor('release'))");

    // (4) ZERO-ORPHANS — the overfitting audit exists + records zero orphans.
    if (auditMd == null) {
        violations.push("docs/tranches/AU/audit/W10-overfitting-audit.md is absent (the ZERO-ORPHANS evidence)");
        facts.zeroOrphans = false;
    } else {
        // the audit's verdict line: "Zero orphans." + the distribution row library-orphan|0, delete-unused|0.
        const zero = /zero\s+orphans/i.test(auditMd) && /library-orphan\s*\|\s*\*?\*?0/i.test(auditMd) && /delete-unused\s*\|\s*\*?\*?0/i.test(auditMd);
        facts.zeroOrphans = zero;
        if (!zero) violations.push("W10-overfitting-audit.md does not record a ZERO-ORPHANS verdict (library-orphan=0 + delete-unused=0 + 'Zero orphans')");
    }

    // (5) STAGED-NOT-PUBLISHED — a changeset exists AND version is still 3.2.0.
    facts.changesets = changesets;
    facts.pkgVersion = pkgVersion;
    if (!changesets.length) violations.push("no .changeset/*.md is staged (the 3.3.0 changeset must be staged — publish is USER-DOMAIN)");
    if (pkgVersion !== "3.2.0") {
        violations.push(`package.json version is '${pkgVersion}', expected '3.2.0' — the changeset stages the minor bump; \`changeset version\` (USER-DOMAIN) bumps it. A bumped manifest means the cut already ran`);
    }

    facts.clean = violations.length === 0;
    return { facts, violations };
}

function run() {
    const P = cliPaths();
    const inputs = {
        finalMd: existsSync(P.FINAL) ? readFileSync(P.FINAL, "utf8") : null,
        auditMd: existsSync(P.AUDIT) ? readFileSync(P.AUDIT, "utf8") : null,
        dirt: unallowedDirt(P.ROOT),
        verifyCiGreen: verifyCiGreen(P.ROOT),
        releaseSet: releaseSet(P.ROOT),
        changesets: changesetFiles(P.CHANGESET_DIR),
        pkgVersion: JSON.parse(readFileSync(P.PKG, "utf8")).version,
    };
    const { facts, violations } = detectFinal(inputs);
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:au-final",
        facts,
        violations,
    });

    console.log("proof:au-final — the AU close meta-gate (release-only, AU.W10)");
    console.log(`  AU.FINAL.md present       : ${facts.finalExists ? "YES" : "NO"}`);
    console.log(`  per-wave green citations  : ${facts.wavesCited ?? 0}/${WAVES.length}`);
    console.log(`  clean tree (allowlisted)  : ${facts.unallowedDirt && facts.unallowedDirt.length === 0 ? "YES" : "NO"}`);
    console.log(`  --verify-ci green         : ${facts.verifyCiGreen ? "YES" : "NO"}`);
    console.log(`  release gate set          : ${facts.releaseGates}`);
    console.log(`  zero orphans (audit)      : ${facts.zeroOrphans ? "YES" : "NO"}`);
    console.log(`  changeset staged          : ${facts.changesets && facts.changesets.length ? facts.changesets.join(", ") : "NONE"}`);
    console.log(`  pkg version (unbumped)    : ${facts.pkgVersion}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(P.ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) run();
