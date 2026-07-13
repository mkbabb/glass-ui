#!/usr/bin/env node
// AY.W0 — the re-ground meta-gate (proof:ay-w0-reground).
//
// The AY AUDIT-LEDGER was authored when the 32-agent pre-audit hit the session
// limit and was NEVER re-synced to AX HEAD (the "Workflow stale-worktree trap"
// the user's MEMORY records). It marked ≥6 shipped-and-gated features
// UNADDRESSED/DEFERRED/CHRONIC — a planner trusting those labels dispatches
// agents to RE-BUILD green code (a second warp seam, a third slider variant, a
// parallel --touch-target axis, a from-zero fourier element). The ledger has
// been re-stamped this pass; this gate makes the re-ground FALSIFIABLE so the
// drift cannot silently return (AY.W0-REGROUND §HARD GATE):
//
//   (a) THE LEDGER IS PRESENT + RE-GROUNDED — AUDIT-LEDGER.md exists and carries
//       the `RE-GROUNDED to HEAD` marker. Reddens on a silent revert to the
//       stale draft.
//   (b) THE THREE LANDED SHAs ARE ANCESTOR-REACHABLE from HEAD — 45cfb79 (W17
//       warp) / a730782 (W59 slider) / 7952cd1 (W51 ui-scale). Reddens if AY is
//       re-based onto a tree where the re-ground basis is not real (the
//       stale-base trap, machine-caught).
//   (c) NO STALE LABEL ON A SHIPPED+GATED ROW — for each of the 6 named
//       evidence artefacts (proof:constellation-warp-live, proof:ui-scale,
//       proof:slider-two-only, the /constellation + /fourier-field subpath
//       exports, the 4 README files) that EXISTS in source, its ledger row
//       carries NO BARE stale label (UNADDRESSED / "DEFERRED — no" / "not done")
//       outside the quoted `MIS-MARKED "…"` refutation context. Reddens if a row
//       regresses to a stale label while its evidence still ships.
//   (d) EVERY STATUS ROW IS FROM THE CLOSED VOCABULARY + CITES EVIDENCE — every
//       numbered `| <n> | … |` row in §B/§C/§D carries one of
//       DONE-VERIFY|PARTIAL|OPEN|DEBT|NET-NEW (bare DONE accepted as the
//       done-family marker the slides-session rows use) and a non-empty
//       HEAD-evidence cell; ZERO row carries an un-grounded marker
//       (TODO|TBD|FIXME|???) outside a refutation context.
//
// inv ε / bite-check: re-introducing a bare `UNADDRESSED` on row 2 (outside the
// MIS-MARKED quote) reddens (c) naming row 2; deleting a SHA-ancestry check
// reddens (b); a numbered row without a status token or evidence reddens (d).
// The gate is the proof.
//
// House style mirrors proof-au-w0-reground.mjs: ESM .mjs, lazy memoized paths,
// a byte-stable JSON artefact via gate-output, a human summary, process.exit(1)
// on any violation (fail-closed).

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

// The three landed SHAs the re-ground basis stands on (AY.W0-REGROUND
// refutation table): W17 click-warp, W59 slider two-only, W51 ui-scale.
const LANDED_SHAS = ["45cfb79", "a730782", "7952cd1"];

// The re-ground marker the ledger header MUST carry (a silent revert reddens).
const REGROUND_MARKER = "RE-GROUNDED to HEAD";

// The closed status vocabulary (clause d). Bare `DONE` is accepted as the
// done-family marker the slides-session rows (§C 18/19, §E 30) legitimately use.
const STATUS_VOCAB_RE = /\b(DONE-VERIFY|DONE|PARTIAL|OPEN|DEBT|NET-NEW)\b/;

// Un-grounded markers that may NEVER appear outside a refutation context.
const UNGROUNDED_RE = /\b(TODO|TBD|FIXME|DEFER-LATER)\b|\?\?\?/;

// A bare stale label (clause c). Reddens a shipped+gated row UNLESS it sits in
// the quoted `MIS-MARKED "…"` refutation context (stripped before this test).
const STALE_LABEL_RE = /\bUNADDRESSED\b|DEFERRED\s+—\s+no\b|\bnot\s+done\b/i;

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        LEDGER: resolve(ROOT, "docs/tranches/AY/audit/AUDIT-LEDGER.md"),
        PACKAGE_JSON: resolve(ROOT, "package.json"),
        // The 6 evidence artefacts → the ledger row # each one underwrites. Each
        // is a (existence-probe, rowNumber) pair: clause (c) only checks the row
        // when its evidence actually SHIPS at HEAD.
        EVIDENCE: [
            { name: "proof:constellation-warp-live", row: 2, kind: "gate" },
            { name: "proof:ui-scale", row: 4, kind: "gate" },
            { name: "proof:slider-two-only", row: 9, kind: "gate" },
            { name: "./constellation", row: 1, kind: "export" },
            { name: "./fourier-field", row: 8, kind: "export" },
            { name: "4 component READMEs", row: 14, kind: "readmes" },
        ],
        READMES: [
            resolve(ROOT, "src/components/custom/aurora/README.md"),
            resolve(ROOT, "src/components/custom/blob/README.md"),
            resolve(ROOT, "src/components/custom/dock/README.md"),
            resolve(ROOT, "src/components/custom/constellation/README.md"),
        ],
        ARTIFACT: gateArtifactPath("GLASS_UI_AY_W0_ARTIFACT", "AY-w0-reground"),
    };
    return _cliPaths;
}

/** (a) the ledger exists and carries the re-grounded header marker. */
function checkLedgerPresent(P) {
    const violations = [];
    if (!existsSync(P.LEDGER)) {
        violations.push("missing docs/tranches/AY/audit/AUDIT-LEDGER.md");
        return violations;
    }
    const text = readFileSync(P.LEDGER, "utf8");
    if (!text.includes(REGROUND_MARKER)) {
        violations.push(
            `AUDIT-LEDGER.md does not carry the '${REGROUND_MARKER}' marker (a silent revert to the stale draft)`,
        );
    }
    return violations;
}

/** (b) every landed SHA is an ancestor of HEAD. */
function checkShaAncestry(P) {
    const violations = [];
    for (const sha of LANDED_SHAS) {
        try {
            execFileSync("git", ["merge-base", "--is-ancestor", sha, "HEAD"], {
                cwd: P.ROOT,
                stdio: "ignore",
            });
        } catch {
            violations.push(
                `landed SHA ${sha} is NOT an ancestor of HEAD (the AY re-ground basis is not real — the stale-base trap)`,
            );
        }
    }
    return violations;
}

/** Whether a named evidence artefact actually SHIPS at HEAD. */
function evidenceShips(P, ev, pkg) {
    switch (ev.kind) {
        case "gate":
            // a `"<name>": "node …"` script entry in package.json
            return new RegExp(`"${ev.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"\\s*:`).test(pkg);
        case "export":
            // a `"<subpath>": {` exports entry in package.json
            return new RegExp(`"${ev.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"\\s*:\\s*\\{`).test(pkg);
        case "readmes":
            return P.READMES.every((f) => existsSync(f));
        default:
            return false;
    }
}

/** Pull the full text of a numbered ledger row `| <n> | … |`. */
function rowText(ledgerLines, n) {
    const re = new RegExp(`^\\|\\s*${n}\\s*\\|`);
    const idx = ledgerLines.findIndex((l) => re.test(l));
    return idx === -1 ? null : { idx, line: ledgerLines[idx] };
}

/**
 * Strip the quoted `MIS-MARKED "…"` refutation context from a row so a stale
 * label that survives OUTSIDE the quote is the only thing the bare-label scan
 * sees (the row legitimately QUOTES its old stale label inside MIS-MARKED).
 */
function stripRefutationContext(line) {
    // Drop every double-quoted span (the `"DEFERRED — no system."` / `"UNADDRESSED"`
    // quoted stale labels the refutation cites) and the literal MIS-MARKED token.
    return line.replace(/"[^"]*"/g, "").replace(/MIS-MARKED/g, "");
}

/**
 * (c) for each shipped+gated evidence artefact, its ledger row carries NO bare
 * stale label outside the MIS-MARKED quote.
 */
function checkNoStaleLabel(P) {
    const violations = [];
    const pkg = readFileSync(P.PACKAGE_JSON, "utf8");
    const ledgerLines = readFileSync(P.LEDGER, "utf8").split("\n");
    let checked = 0;

    for (const ev of P.EVIDENCE) {
        if (!evidenceShips(P, ev, pkg)) {
            // genuinely absent → its row is NOT a stale-label case (clause c only
            // bites when the evidence still ships).
            violations.push(
                `evidence '${ev.name}' for ledger row ${ev.row} does NOT ship at HEAD (cannot ratify the re-ground for that row)`,
            );
            continue;
        }
        const row = rowText(ledgerLines, ev.row);
        if (!row) {
            violations.push(`ledger row ${ev.row} (evidence '${ev.name}') not found in AUDIT-LEDGER.md`);
            continue;
        }
        checked += 1;
        const residue = stripRefutationContext(row.line);
        if (STALE_LABEL_RE.test(residue)) {
            violations.push(
                `AUDIT-LEDGER.md:${row.idx + 1} row ${ev.row} carries a BARE stale label outside the MIS-MARKED quote while its evidence '${ev.name}' still ships: ${row.line.trim().slice(0, 90)}`,
            );
        }
    }
    return { violations, checked };
}

/**
 * (d) every numbered row in §B/§C/§D carries a closed-vocab status token + a
 * non-empty HEAD-evidence cell; no un-grounded marker survives outside a
 * refutation context. A numbered ledger row is `| <n> | item | status | evidence | fold |`.
 */
function checkClosedVocab(P) {
    const violations = [];
    const ledgerLines = readFileSync(P.LEDGER, "utf8").split("\n");
    let rows = 0;

    ledgerLines.forEach((line, i) => {
        const m = line.match(/^\|\s*(\d+)\s*\|/);
        if (!m) return;
        rows += 1;
        const cells = line.split("|").map((c) => c.trim());
        // cells: ["", "<n>", "item", "status", "evidence", "fold", ""]
        const status = cells[3] ?? "";
        const evidence = cells[4] ?? "";
        if (!STATUS_VOCAB_RE.test(status)) {
            violations.push(
                `AUDIT-LEDGER.md:${i + 1} row #${m[1]} status '${status.slice(0, 40)}' is NOT from the closed vocabulary (DONE-VERIFY|DONE|PARTIAL|OPEN|DEBT|NET-NEW)`,
            );
        }
        if (evidence.length === 0) {
            violations.push(`AUDIT-LEDGER.md:${i + 1} row #${m[1]} carries an EMPTY HEAD-evidence cell`);
        }
        // un-grounded marker outside a refutation context (MIS-MARKED quote stripped).
        const residue = stripRefutationContext(line);
        const bad = residue.match(UNGROUNDED_RE);
        if (bad) {
            violations.push(
                `AUDIT-LEDGER.md:${i + 1} row #${m[1]} carries an un-grounded marker '${bad[0]}' outside a refutation context`,
            );
        }
    });

    if (rows < 30) {
        violations.push(`AUDIT-LEDGER.md has only ${rows} numbered status rows (expected ≥ 30 — §B/§C/§D/§E)`);
    }
    return { violations, rows };
}

function main() {
    const P = cliPaths();
    const aFail = checkLedgerPresent(P);
    // (b)(c)(d) only run if the ledger exists (else they'd throw on read).
    const ledgerExists = existsSync(P.LEDGER);
    const bFail = ledgerExists ? checkShaAncestry(P) : [];
    const cResult = ledgerExists
        ? checkNoStaleLabel(P)
        : { violations: ["(skipped — ledger absent)"], checked: 0 };
    const dResult = ledgerExists
        ? checkClosedVocab(P)
        : { violations: ["(skipped — ledger absent)"], rows: 0 };

    const violations = [...aFail, ...bFail, ...cResult.violations, ...dResult.violations];
    const report = {
        gate: "proof:ay-w0-reground",
        generatedAt: snapshotStamp(),
        clauses: {
            a_ledger_present: aFail.length === 0,
            b_sha_ancestry: bFail.length === 0,
            c_no_stale_label: cResult.violations.length === 0,
            d_closed_vocab: dResult.violations.length === 0,
        },
        evidenceRowsChecked: cResult.checked,
        ledgerRows: dResult.rows,
        violations,
    };
    writeGateArtifact(P.ARTIFACT, report);

    if (violations.length) {
        console.error("[proof:ay-w0-reground] FAIL — AY.W0 re-ground violations:");
        for (const v of violations) console.error(`  ✗ ${v}`);
        process.exit(1);
    }
    console.log(
        `[proof:ay-w0-reground] PASS — AUDIT-LEDGER.md present + RE-GROUNDED; ${LANDED_SHAS.length} landed SHAs ancestor-reachable; ${cResult.checked} shipped+gated rows carry NO bare stale label; ${dResult.rows} numbered rows all closed-vocab + evidenced.`,
    );
}

main();
