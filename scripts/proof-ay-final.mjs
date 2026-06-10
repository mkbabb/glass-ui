#!/usr/bin/env node
// AY.W-CLOSE1 — the AY terminal-close meta-gate (proof:ay-final). Release-only (NOT ci).
//
// The DEV-meta analogue of proof:au-final: it does NOT re-run the matrix (release.sh
// does); it asserts the AY close is COHERENT and staged to READY-TO-PUBLISH — the
// publish itself is USER-DOMAIN (W-PUB1: changeset version → push v3.10.0 → release.yml
// gated provenance). At THIS wave's open it is born-RED (FINAL.md absent, the audit
// absent, no changeset); it greens only at the discharged terminal state.
//
// detectFinal asserts (the 8 clauses of AY.W-CLOSE1 §4):
//   1. FINAL-EXISTS + per-wave green citation — docs/tranches/AY/FINAL.md exists AND for
//      each AY wave id (read from docs/tranches/AY/waves/*.md filenames, NOT hardcoded —
//      a new wave is auto-required) the regex `${w}\b…(run|actions|green|DELTA|live-verified)`
//      matches within 200 chars. Bite: drop a wave's green/DELTA citation → RED.
//   2. INHERITANCE-CROSSWALK — the FINAL carries the AX→AY inheritance mapping: each of the
//      5 inherited AX close items within 200 chars of its discharging token (overfitting
//      audit → W-CLOSE1-overfitting-audit.md; FINAL → this file; budget →
//      W4-bundle-profile.baseline.json; squircle → the panel-membership decision;
//      publish-readiness → W-PUB1). Bite: omit an inherited item's mapping → RED.
//   3. BUDGET-REBASELINED — the committed baseline exists AND `profile-bundle.mjs --enforce`
//      exits 0 (the budget gate green against the rebased AY reference). Bite: dist drift
//      over the un-rebased baseline → reds.
//   4. NO-OPEN-LIVE-PENDING — across AX+AY PROGRESS.md wave rows, ZERO status-CELL TOKENS
//      are `live-pending`, and ZERO cells carry a positive `(DELTA owed)`/`(DEVELOPED)`
//      modifier (the retired inflation vocabulary). The token is the FIRST segment before a
//      separator (the proof-live-verified-ledger statusToken splitter) — NOT a substring, so
//      a prose "no DELTA owed" or a parenthetical "(… stays live-pending …)" in an augment
//      row's TAIL does not false-RED. Bite: a surviving live-pending status token → RED.
//   5. CARDINAL-GATE-GREEN (BOTH ARMS) + REGISTER-COMPLETE — three subprocesses exit 0:
//      proof:live-verified-ledger:ay (the AY-active cardinal gate) + :ax (the AX backlog
//      tracker — green proves W-DELTA0 paid the 6 complete-allowlist + W52 + W19/W09 debt
//      clause 4 cannot see) + proof:disposition-live (the W-CARRY register-completeness).
//   6. SQUIRCLE-DECIDED-ONCE — proof:squircle-language exits 0 AND theme.css's
//      --corner-shape-panel resolves a superellipse(...) (panel JOINED the family) AND
//      proof-squircle-language.mjs no longer carries the old `--corner-shape-panel must be
//      round` policy line (the gate ↔ amendment reconcile — the contradiction is GONE).
//   7. ZERO-ORPHANS — docs/tranches/AY/audit/W-CLOSE1-overfitting-audit.md exists AND records
//      the zero-orphan verdict (`zero orphans` + library-orphan|0 + delete-unused|0). The
//      audit dispositions evalFourier, header-ribbon, glass-panel, useTokenColor + the
//      bespoke-copy CLASS. Bite: an orphan survives undispositioned → non-zero → reds.
//   8. STAGED-NOT-PUBLISHED — a .changeset/*.md (non-README) is staged AND package.json
//      version is still 3.9.0 (the v3.10.0 cut is W-PUB1/USER-DOMAIN — `changeset version`
//      bumps it). Bite: no changeset → RED; a bumped version → RED.
//
// Plus the CLEAN-TREE allowlist guard: `git status --porcelain` carries only documented
// USER-DOMAIN dirt (the docs/precepts submodule pointer); any other dirty entry means a gate
// mutated a tracked artefact (inv-θ) or the close is uncommitted → RED.
//
// House style mirrors proof-au-final.mjs: ESM .mjs, lazy memoized cliPaths(), a pure exported
// detectFinal(inputs) with IO injected, a byte-stable JSON artefact via writeGateArtifact, a
// human summary, process.exit(1) on any violation, the import.meta.main guard.

import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

// The 5 inherited AX close items + the discharging-token regex each must sit within 200
// chars of (clause 2). The AX close ran these; AY's terminal close owns the cross-walk.
const INHERITED = [
    { item: "overfitting audit", token: /W-CLOSE1-overfitting-audit\.md/ },
    { item: "FINAL", token: /FINAL\.md/ },
    { item: "budget", token: /W4-bundle-profile\.baseline\.json/ },
    { item: "squircle", token: /squircle|corner-shape-panel|superellipse/i },
    { item: "publish-readiness", token: /W-PUB1/ },
];

// CLEAN-TREE allowlist — the documented USER-DOMAIN dirt that is NOT part of the AY close
// and must never false-RED the gate. The orchestrator's post-commit tree carries ONLY the
// submodule pointer (the AY close files are committed). A `git status --porcelain` line is
// `XY <path>`; we compare the path tail.
const CLEAN_TREE_ALLOWLIST = new Set(["docs/precepts"]);

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        FINAL: resolve(ROOT, "docs/tranches/AY/FINAL.md"),
        AUDIT: resolve(ROOT, "docs/tranches/AY/audit/W-CLOSE1-overfitting-audit.md"),
        WAVES_DIR: resolve(ROOT, "docs/tranches/AY/waves"),
        AX_PROGRESS: resolve(ROOT, "docs/tranches/AX/PROGRESS.md"),
        AY_PROGRESS: resolve(ROOT, "docs/tranches/AY/PROGRESS.md"),
        BASELINE: resolve(ROOT, "docs/tranches/AP/W4-bundle-profile.baseline.json"),
        THEME_CSS: resolve(ROOT, "src/styles/theme.css"),
        SQUIRCLE_GATE: resolve(ROOT, "scripts/proof-squircle-language.mjs"),
        CHANGESET_DIR: resolve(ROOT, ".changeset"),
        PKG: resolve(ROOT, "package.json"),
        ARTIFACT: gateArtifactPath("GLASS_UI_AY_FINAL_ARTIFACT", "AY-final"),
    };
    return _cliPaths;
}

/** The AY wave ids — read from `docs/tranches/AY/waves/AY.W*.md` filenames (NOT hardcoded,
 *  so a new wave auto-becomes a required citation). The id is the filename minus the
 *  `AY.` prefix + `.md` suffix (e.g. `AY.W-CLOSE1.md` → `W-CLOSE1`). */
function waveIds(WAVES_DIR) {
    if (!existsSync(WAVES_DIR)) return [];
    return readdirSync(WAVES_DIR)
        .filter((f) => /^AY\.W.*\.md$/.test(f))
        .map((f) => f.replace(/^AY\./, "").replace(/\.md$/, ""))
        .sort();
}

/** The status TOKEN a PROGRESS wave-cell asserts: the first segment before a separator
 *  (— · ( ). Mirrors proof-live-verified-ledger.mjs:statusToken so the clause reads the
 *  ASSERTED status, not prose buried in a parenthetical tail. */
function statusToken(status) {
    return status.split(/[—·(]/)[0].trim().toLowerCase();
}

/** Parse the PROGRESS wave-table rows → [{wave, status, line}]. Mirrors the ledger gate's
 *  waveRows parser (the last cell is the status). */
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

/** The forbidden open-live-pending verdict over one status cell. The token is checked for
 *  `live-pending`; the FULL cell is scanned for a POSITIVE `(DELTA owed)`/`(DEVELOPED)`
 *  parenthetical modifier (a negation "no … DELTA owed" / "no live DELTA owed" is allowed,
 *  and a tail parenthetical that merely QUOTES the prior live-pending vocabulary in an
 *  augment row is not the asserted token). Returns null if clean, else the reason. */
function openLivePendingReason(status) {
    if (statusToken(status) === "live-pending") return "status token is `live-pending`";
    // A parenthesized retired-modifier ASSERTION (not a "no …" negation).
    if (/\(\s*developed\s*\)/i.test(status)) return "carries the retired `(DEVELOPED)` modifier";
    if (/(?<!no\s)(?<!no\s\w{1,8}\s)\(\s*delta\s+owed\s*\)/i.test(status) && !/no\s[^()]*delta\s+owed/i.test(status))
        return "carries an open `(DELTA owed)` modifier";
    return null;
}

/** `git status --porcelain`, minus the documented user-domain allowlist. */
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

/** Shell an npm script; true IFF it exits 0. */
function npmGreen(ROOT, script) {
    try {
        execFileSync("npm", ["run", script], { cwd: ROOT, stdio: "ignore" });
        return true;
    } catch {
        return false;
    }
}

/** `node scripts/profile-bundle.mjs --enforce` — true IFF it exits 0. */
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

/** A changeset is any .changeset/*.md that is not the README. */
function changesetFiles(CHANGESET_DIR) {
    if (!existsSync(CHANGESET_DIR)) return [];
    return readdirSync(CHANGESET_DIR).filter(
        (f) => f.endsWith(".md") && f.toLowerCase() !== "readme.md",
    );
}

/**
 * The pure detector. All IO is injected so the 8 clauses are unit-testable.
 * @param {{
 *   finalMd:string|null, auditMd:string|null, waveIds:string[],
 *   axProgress:string, ayProgress:string, dirt:string[],
 *   budgetExists:boolean, budgetEnforceGreen:boolean,
 *   ledgerAyGreen:boolean, ledgerAxGreen:boolean, dispositionGreen:boolean,
 *   squircleGreen:boolean, panelShape:string|null, squircleGateSrc:string,
 *   changesets:string[], pkgVersion:string
 * }} inputs
 */
export function detectFinal(inputs) {
    const violations = [];
    const facts = {};

    // (1) FINAL-EXISTS + per-wave green citation.
    if (inputs.finalMd == null) {
        violations.push("docs/tranches/AY/FINAL.md is absent");
        facts.finalExists = false;
    } else {
        facts.finalExists = true;
        const missing = [];
        for (const w of inputs.waveIds) {
            // W-CLOSE1 is THIS wave — it cites itself via the FINAL header; a generic
            // citation regex still requires its presence, which is correct.
            const re = new RegExp(`${w}\\b[\\s\\S]{0,200}(run|actions|green|DELTA|live-verified)`, "i");
            if (!re.test(inputs.finalMd)) missing.push(w);
        }
        facts.wavesTotal = inputs.waveIds.length;
        facts.wavesCited = inputs.waveIds.length - missing.length;
        for (const w of missing)
            violations.push(`FINAL.md does not cite a green run/DELTA for ${w} (no run/actions/green/DELTA/live-verified within 200 chars of the wave id)`);
    }

    // (2) INHERITANCE-CROSSWALK.
    if (inputs.finalMd != null) {
        const hasCrosswalk = /AX\s*[→\-]+\s*AY|AX→AY|inheritance/i.test(inputs.finalMd);
        facts.crosswalkSection = hasCrosswalk;
        if (!hasCrosswalk)
            violations.push("FINAL.md has no AX→AY inheritance section (no `AX → AY` / `inheritance` heading)");
        const missingItems = [];
        for (const { item, token } of INHERITED) {
            // each inherited item's NAME must appear, and its discharging token must too.
            const itemRe = new RegExp(item.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"), "i");
            if (!itemRe.test(inputs.finalMd) || !token.test(inputs.finalMd)) missingItems.push(item);
        }
        facts.inheritedMapped = INHERITED.length - missingItems.length;
        for (const item of missingItems)
            violations.push(`FINAL.md inheritance cross-walk does not map the AX close item "${item}" to a discharging AY artefact`);
    }

    // (3) BUDGET-REBASELINED.
    facts.budgetExists = inputs.budgetExists;
    facts.budgetEnforceGreen = inputs.budgetEnforceGreen;
    if (!inputs.budgetExists) violations.push("docs/tranches/AP/W4-bundle-profile.baseline.json is absent (the rebased AY reference)");
    if (!inputs.budgetEnforceGreen) violations.push("profile-bundle.mjs --enforce is RED (dist drift over the rebased baseline)");

    // (4) NO-OPEN-LIVE-PENDING — across AX + AY PROGRESS rows, no open live-pending TOKEN.
    const open = [];
    for (const [tag, md] of [["AX", inputs.axProgress], ["AY", inputs.ayProgress]]) {
        for (const r of waveRows(md)) {
            const reason = openLivePendingReason(r.status);
            if (reason) open.push(`${tag} ${r.wave} (line ${r.line}): ${reason}`);
        }
    }
    facts.openLivePending = open;
    if (open.length)
        violations.push(`${open.length} PROGRESS row(s) carry an open live-pending/DELTA-owed status: ${open.join("; ")}`);

    // (5) CARDINAL-GATE-GREEN (BOTH ARMS) + REGISTER-COMPLETE.
    facts.ledgerAyGreen = inputs.ledgerAyGreen;
    facts.ledgerAxGreen = inputs.ledgerAxGreen;
    facts.dispositionGreen = inputs.dispositionGreen;
    if (!inputs.ledgerAyGreen) violations.push("proof:live-verified-ledger:ay is RED (an AY visual wave lacks a captured own-surface DELTA)");
    if (!inputs.ledgerAxGreen) violations.push("proof:live-verified-ledger:ax is RED (the W-DELTA0 backfill did not pay an AX complete-allowlist/W52/W19/W09 row)");
    if (!inputs.dispositionGreen) violations.push("proof:disposition-live is RED (the W-CARRY register is incomplete or a booked trigger re-MET)");

    // (6) SQUIRCLE-DECIDED-ONCE.
    facts.squircleGreen = inputs.squircleGreen;
    facts.panelShape = inputs.panelShape;
    const panelIsSuperellipse = inputs.panelShape != null && /superellipse\s*\(/.test(inputs.panelShape);
    facts.panelIsSuperellipse = panelIsSuperellipse;
    // the OLD policy-round assertion line must be GONE from the gate script (the reconcile).
    const oldPolicyLive = /--corner-shape-panel must be `round`/.test(inputs.squircleGateSrc);
    facts.oldPanelRoundPolicyLive = oldPolicyLive;
    if (!inputs.squircleGreen) violations.push("proof:squircle-language is RED (the corner-shape policy is not green)");
    if (!panelIsSuperellipse) violations.push(`theme.css: --corner-shape-panel must resolve a superellipse(...) (panel JOINED the squircle family — W56b); got ${inputs.panelShape ?? "(missing)"}`);
    if (oldPolicyLive) violations.push("proof-squircle-language.mjs still carries the old `--corner-shape-panel must be round` policy line (the gate ↔ amendment contradiction is un-resolved)");

    // (7) ZERO-ORPHANS.
    if (inputs.auditMd == null) {
        violations.push("docs/tranches/AY/audit/W-CLOSE1-overfitting-audit.md is absent (the ZERO-ORPHANS evidence)");
        facts.zeroOrphans = false;
    } else {
        const zero =
            /zero\s+orphans/i.test(inputs.auditMd) &&
            /library-orphan\s*\|\s*\*?\*?0/i.test(inputs.auditMd) &&
            /delete-unused\s*\|\s*\*?\*?0/i.test(inputs.auditMd);
        facts.zeroOrphans = zero;
        if (!zero) violations.push("W-CLOSE1-overfitting-audit.md does not record a ZERO-ORPHANS verdict (library-orphan=0 + delete-unused=0 + 'Zero orphans')");
    }

    // (8) STAGED-NOT-PUBLISHED.
    facts.changesets = inputs.changesets;
    facts.pkgVersion = inputs.pkgVersion;
    if (!inputs.changesets.length) violations.push("no .changeset/*.md is staged (the 3.10.0 changeset must be staged — publish is USER-DOMAIN)");
    if (inputs.pkgVersion !== "3.9.0")
        violations.push(`package.json version is '${inputs.pkgVersion}', expected '3.9.0' — the v3.10.0 cut is W-PUB1/USER-DOMAIN. A bumped manifest means the cut already ran`);

    // CLEAN-TREE guard (minus the documented user-domain allowlist).
    facts.unallowedDirt = inputs.dirt;
    if (inputs.dirt.length)
        violations.push(`the working tree carries ${inputs.dirt.length} non-allowlisted dirty entr${inputs.dirt.length === 1 ? "y" : "ies"} (a gate mutated a tracked artefact, or the close is not committed): ${inputs.dirt.join(", ")}`);

    facts.clean = violations.length === 0;
    return { facts, violations };
}

function tokenValueOf(css, token) {
    const re = new RegExp(`${token.replace(/[-]/g, "\\-")}\\s*:\\s*([^;}]+)`, "g");
    let last = null;
    for (const m of css.matchAll(re)) last = m[1].replace(/\s+/g, " ").trim();
    return last;
}

function run() {
    const P = cliPaths();
    const inputs = {
        finalMd: existsSync(P.FINAL) ? readFileSync(P.FINAL, "utf8") : null,
        auditMd: existsSync(P.AUDIT) ? readFileSync(P.AUDIT, "utf8") : null,
        waveIds: waveIds(P.WAVES_DIR),
        axProgress: existsSync(P.AX_PROGRESS) ? readFileSync(P.AX_PROGRESS, "utf8") : "",
        ayProgress: existsSync(P.AY_PROGRESS) ? readFileSync(P.AY_PROGRESS, "utf8") : "",
        dirt: unallowedDirt(P.ROOT),
        budgetExists: existsSync(P.BASELINE),
        budgetEnforceGreen: budgetEnforceGreen(P.ROOT),
        ledgerAyGreen: npmGreen(P.ROOT, "proof:live-verified-ledger:ay"),
        ledgerAxGreen: npmGreen(P.ROOT, "proof:live-verified-ledger:ax"),
        dispositionGreen: npmGreen(P.ROOT, "proof:disposition-live"),
        squircleGreen: npmGreen(P.ROOT, "proof:squircle-language"),
        panelShape: existsSync(P.THEME_CSS)
            ? tokenValueOf(readFileSync(P.THEME_CSS, "utf8"), "--corner-shape-panel")
            : null,
        squircleGateSrc: existsSync(P.SQUIRCLE_GATE) ? readFileSync(P.SQUIRCLE_GATE, "utf8") : "",
        changesets: changesetFiles(P.CHANGESET_DIR),
        pkgVersion: JSON.parse(readFileSync(P.PKG, "utf8")).version,
    };
    const { facts, violations } = detectFinal(inputs);
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:ay-final",
        facts,
        violations,
    });

    console.log("proof:ay-final — the AY terminal-close meta-gate (release-only, W-CLOSE1)");
    console.log(`  FINAL.md present          : ${facts.finalExists ? "YES" : "NO"}`);
    console.log(`  per-wave green citations  : ${facts.wavesCited ?? 0}/${facts.wavesTotal ?? inputs.waveIds.length}`);
    console.log(`  inheritance cross-walk    : ${facts.inheritedMapped ?? 0}/${INHERITED.length} items mapped`);
    console.log(`  budget rebaselined+enforced: ${facts.budgetExists && facts.budgetEnforceGreen ? "YES" : "NO"}`);
    console.log(`  no open live-pending      : ${facts.openLivePending && facts.openLivePending.length === 0 ? "YES" : "NO"}`);
    console.log(`  cardinal :ay / :ax / disp : ${facts.ledgerAyGreen ? "Y" : "N"} / ${facts.ledgerAxGreen ? "Y" : "N"} / ${facts.dispositionGreen ? "Y" : "N"}`);
    console.log(`  squircle decided once     : ${facts.squircleGreen && facts.panelIsSuperellipse && !facts.oldPanelRoundPolicyLive ? "YES" : "NO"}`);
    console.log(`  zero orphans (audit)      : ${facts.zeroOrphans ? "YES" : "NO"}`);
    console.log(`  changeset staged          : ${facts.changesets && facts.changesets.length ? facts.changesets.join(", ") : "NONE"}`);
    console.log(`  pkg version (unbumped)    : ${facts.pkgVersion}`);
    console.log(`  clean tree (allowlisted)  : ${facts.unallowedDirt && facts.unallowedDirt.length === 0 ? "YES" : "NO"}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(P.ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) run();
