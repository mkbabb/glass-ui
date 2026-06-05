#!/usr/bin/env node
// AU.W0 — the formalize + re-ground meta-gate (proof:au-w0-reground).
//
// AU is not a fresh successor over a clean AT close — it is the execution of
// AT's authored-but-unrun mass, formalized into docs/tranches/AU/ and re-grounded
// against HEAD `8e4cb9f` so every later wave gates on FACT, not the AT plan's
// narration. This gate makes the W0 formalization falsifiable (CHARTER §3 W0):
//
//   (a) THE FORMALIZATION EXISTS — `AU.md` + `PROGRESS.md` under tranches/AU/.
//   (b) THE THREE DOCK SHAs ARE ANCESTOR-REACHABLE from HEAD — AU is grounded on
//       the post-dock tree (e906448 / f0b0ffb / 8e4cb9f). Reddens if any SHA is
//       unreachable.
//   (c) ZERO BUNDLE LABELS SURVIVE AS LIVE DELIVERABLES + ZERO UN-DISPOSITIONED
//       ITEMS — the "3 a11y asks"/"DDR-AS-RC-2 bundle" label appears ONLY in a
//       decompose context; every numbered ledger row in AU.md §4 carries a
//       FOLD/BOOK/KILL/OUT/DONE/SHIPPED/DECOMPOSED disposition (P-Inv 28).
//   (d) THE SLOT COLLISION IS RE-LETTERED — `W6-dock-b` resolves only to a
//       historical-citation/re-letter context, never a live AU deliverable; the
//       touch-gate is recorded SHIPPED (f0b0ffb); the a11y/state contract is
//       assigned AU.W8's fresh ID.
//
// inv ε / bite-check: deleting one SHA-ancestry check reddens (b); leaving any
// folded item un-tagged reddens (c); restoring `W6-dock-b` as a live deliverable
// reddens (d). The gate is the proof.
//
// House style mirrors proof-doc-consistency.mjs: ESM .mjs, lazy memoized paths,
// a byte-stable JSON artefact via gate-output, a human summary, process.exit(1)
// on any violation (fail-closed).

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const DOCK_SHAS = ["e906448", "f0b0ffb", "8e4cb9f"];

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        AU_DIR: resolve(ROOT, "docs/tranches/AU"),
        AU_MD: resolve(ROOT, "docs/tranches/AU/AU.md"),
        PROGRESS_MD: resolve(ROOT, "docs/tranches/AU/PROGRESS.md"),
        ARTIFACT: gateArtifactPath("GLASS_UI_AU_W0_ARTIFACT", "au-w0-reground"),
    };
    return _cliPaths;
}

/** (a) the two formalization docs exist. */
function checkFormalization(P) {
    const violations = [];
    for (const [name, path] of [["AU.md", P.AU_MD], ["PROGRESS.md", P.PROGRESS_MD]]) {
        if (!existsSync(path)) violations.push(`missing tranches/AU/${name}`);
    }
    return violations;
}

/** (b) every dock SHA is an ancestor of HEAD. */
function checkShaAncestry(P) {
    const violations = [];
    for (const sha of DOCK_SHAS) {
        try {
            execFileSync("git", ["merge-base", "--is-ancestor", sha, "HEAD"], {
                cwd: P.ROOT,
                stdio: "ignore",
            });
        } catch {
            violations.push(`dock SHA ${sha} is NOT an ancestor of HEAD (AU is not grounded on the post-dock tree)`);
        }
    }
    return violations;
}

const DISPOSITION_RE = /\b(FOLD-W\d+(?:-IF)?|FOLD|BOOK|KILL|OUT|DONE|SHIPPED|DECOMPOSED|DECOMPOSE)\b/;
const BUNDLE_LABEL_RE = /3 a11y asks|DDR-AS-RC-2 bundle/;
const DECOMPOSE_CTX_RE = /decompos/i;

/**
 * (c) zero bundle labels survive as live deliverables + zero un-dispositioned
 * ledger rows. A numbered ledger row is a line matching `| <n> | … |`.
 */
function checkDisposition(P) {
    const violations = [];
    const au = readFileSync(P.AU_MD, "utf8");
    const progress = readFileSync(P.PROGRESS_MD, "utf8");

    // c1 — bundle label only ever appears in a decompose context: either the
    // line itself names the decompose, OR it sits inside the §5 decompose section
    // (the W0 decomposition table — "returns 0 OUTSIDE the W0 decomposition table").
    const DECOMPOSE_SECTION_RE = /^##\s+§5\b.*DECOMPOSE/i;
    const SECTION_RE = /^##\s/;
    for (const [docName, text] of [["AU.md", au], ["PROGRESS.md", progress]]) {
        let inDecomposeSection = false;
        text.split("\n").forEach((line, i) => {
            if (SECTION_RE.test(line)) inDecomposeSection = DECOMPOSE_SECTION_RE.test(line);
            if (BUNDLE_LABEL_RE.test(line) && !DECOMPOSE_CTX_RE.test(line) && !inDecomposeSection) {
                violations.push(
                    `${docName}:${i + 1} bundle label survives as a live deliverable (no decompose context): ${line.trim().slice(0, 80)}`,
                );
            }
        });
    }

    // c2 — every numbered ledger row in AU.md §4 carries a disposition token.
    let rows = 0;
    au.split("\n").forEach((line, i) => {
        const m = line.match(/^\|\s*(\d+)\s*\|/);
        if (!m) return;
        rows += 1;
        if (!DISPOSITION_RE.test(line)) {
            violations.push(`AU.md:${i + 1} ledger row #${m[1]} carries NO disposition tag (UN-DISPOSITIONED, P-Inv 28)`);
        }
    });
    if (rows < 63) {
        violations.push(`AU.md disposition ledger has only ${rows} numbered rows (expected ≥ 63 — the deferred-lineage rows)`);
    }

    // c3 — no explicit un-dispositioned markers anywhere.
    for (const [docName, text] of [["AU.md", au], ["PROGRESS.md", progress]]) {
        const bad = text.match(/\b(UN-DISPOSITIONED|TODO|TBD|DEFER-LATER|FIXME|\?\?\?)\b/);
        if (bad) violations.push(`${docName} carries an un-dispositioned marker '${bad[1]}' (P-Inv 28)`);
    }

    return { violations, rows };
}

/**
 * (d) the slot collision is re-lettered: every `W6-dock-b` mention is a
 * historical/re-letter citation; the touch-gate is SHIPPED; the a11y contract
 * is assigned AU.W8.
 */
function checkSlotCollision(P) {
    const violations = [];
    const au = readFileSync(P.AU_MD, "utf8");
    const lines = au.split("\n");

    const RELETTER_CTX = /(re-letter|collision|historical|SHIPPED|f0b0ffb|fresh AU ID|always owed|never shipped|never landed|touch-gate|original|the AT|PLAN assigned|deliverable the PLAN|the un-shipped)/i;
    lines.forEach((line, i) => {
        // match the bare slot id W6-dock-b, but NOT the touch-gate variant W6-dock-b′ / b'
        if (/W6-dock-b(?![′'`b-])/.test(line) && !RELETTER_CTX.test(line)) {
            violations.push(`AU.md:${i + 1} 'W6-dock-b' survives as a live deliverable (no re-letter context): ${line.trim().slice(0, 90)}`);
        }
    });

    // the touch-gate is recorded SHIPPED (under its true identity)
    if (!/touch-gate[^\n]*\b(SHIPPED|DONE-AT-HEAD)\b|\bSHIPPED\b[^\n]*touch-gate|touch-gate B.{0,3}(SHIPPED|recorded SHIPPED|DONE)/i.test(au)) {
        violations.push("AU.md does not record the touch-gate B′ as SHIPPED under its true identity");
    }
    // the a11y/state contract is assigned AU.W8
    if (!/a11y[^\n]*AU\.W8|AU\.W8[^\n]*a11y|a11y\s*\+?\s*state-machine contract[^\n]*(fresh AU ID|AU\.W8)/i.test(au)) {
        violations.push("AU.md does not assign the un-shipped a11y/state contract test to AU.W8's fresh ID");
    }
    return violations;
}

function main() {
    const P = cliPaths();
    const aFail = checkFormalization(P);
    // (b)(c)(d) only run if the docs exist (else they'd throw on read).
    const docsExist = aFail.length === 0;
    const bFail = docsExist ? checkShaAncestry(P) : [];
    const cResult = docsExist ? checkDisposition(P) : { violations: ["(skipped — docs absent)"], rows: 0 };
    const dFail = docsExist ? checkSlotCollision(P) : [];

    const violations = [...aFail, ...bFail, ...cResult.violations, ...dFail];
    const report = {
        gate: "proof:au-w0-reground",
        generatedAt: snapshotStamp(),
        clauses: {
            a_formalization: aFail.length === 0,
            b_sha_ancestry: bFail.length === 0,
            c_disposition: cResult.violations.length === 0,
            d_slot_collision: dFail.length === 0,
        },
        ledgerRows: cResult.rows,
        violations,
    };
    writeGateArtifact(P.ARTIFACT, report);

    if (violations.length) {
        console.error("[proof:au-w0-reground] FAIL — AU.W0 formalization/re-ground violations:");
        for (const v of violations) console.error(`  ✗ ${v}`);
        process.exit(1);
    }
    console.log(
        `[proof:au-w0-reground] PASS — AU.md + PROGRESS.md present; 3 dock SHAs ancestor-reachable; ${cResult.rows} ledger rows all dispositioned (zero bundle labels survive); the W6-dock-b collision re-lettered.`,
    );
}

main();
