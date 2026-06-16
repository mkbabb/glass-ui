#!/usr/bin/env node
// BA.W-CLOSE — the BA terminal-close meta-gate (proof:ba-final). Release-only (NOT ci).
//
// The DEV-meta successor of proof:az-final: it asserts the BA close is COHERENT and
// staged to READY-TO-PUBLISH (or coherently AT-CUT). At authoring time it is born-RED
// (FINAL.md absent; the gestalt bar RED until W-REFLECT2 + W-SHELL-RAIL-RESEAT flip the
// roster verdicts) and greens only at the discharged terminal state.
//
// THE STRUCTURAL P-1 FIX (BA invariant 4): clause C2 binds proof:ba-gestalt's operative
// PASS (the whole-page, both-modes, real-backdrop, per-surface GESTALT verdict) as the
// `complete`-vs-`complete_with_misses` gate, REPLACING the AZ `proof:az-reflect`
// per-mechanism reflection-matrix clause. The close CANNOT assert a surface PASS the
// gestalt gate marks FAIL — a surface mid-triumvirate REDs the close. The AZ close told
// the per-mechanism-PASS lie (closed `complete` on a matrix the user re-opened the same
// day in R8); BA forbids it mechanically.
//
// detectFinal asserts (the 9 clauses of BA.W-CLOSE §2):
//   C1. FINAL-EXISTS + per-wave green citation — docs/tranches/BA/FINAL.md exists AND for
//       each BA wave id (read from docs/tranches/BA/waves/*.md filenames, NOT hardcoded)
//       a green/DELTA/live-verified/complete citation sits within 200 chars of the id.
//   C2. THE-GESTALT-BAR — proof:ba-gestalt exits 0 (every roster surface holds an
//       operative-PASS gestalt verdict with on-disk both-mode captures; zero open FAILs).
//       This REPLACES the AZ reflection-matrix clause (the P-1 close-class fix).
//   C3. BUDGET-REBASELINED — the committed baseline exists AND `profile-bundle.mjs
//       --enforce --skip-build` exits 0.
//   C4. NO-OPEN-LIVE-PENDING — across the BA PROGRESS wave rows, zero `live-pending`
//       status tokens and zero open `(DELTA owed)` modifiers (`(DEVELOPED)` stays RETIRED).
//   C5. CARDINAL — proof:live-verified-ledger:ba + :az + :ay + :ax + proof:disposition-live
//       all exit 0 (the BA-active arm, the three tracker arms, the register completeness +
//       the BOOK-trigger re-eval).
//   C6. RUNNER-TRUTH BY EXECUTION — every BA-minted runtime-dependent gate (the manifest
//       below; device-free gates are exempt BY the manifest tag, not by grep) is RE-RUN in
//       the synthesized device-absent shell (GLASS_UI_SYNTH_DEVICE_ABSENT=1) and must exit
//       0 WITH a SKIP line on stdout. The grep is never the witness; the executed
//       exit-0-with-skip-line is.
//   C7. ZERO-ORPHANS — docs/tranches/BA/audit/W-CLOSE-overfitting-audit.md exists and
//       records the `ORPHANS: 0` verdict line.
//   C8. CUT (the H4 version) — STAGED (pre-cut version 3.13.0 + >=1 .changeset/*.md) or
//       AT-CUT (the H4 version 4.0.0 + changesets consumed + a CHANGELOG `## 4.0.0` entry).
//       The clause reads the version from package.json (set by `changeset version`, never a
//       baked literal) AND requires a CHANGELOG entry for that exact version — a silent bump
//       (version changed, no CHANGELOG, no consumed changeset) REDs.
//   C9. CLEAN-TREE — `git status --porcelain` carries only the documented USER-DOMAIN
//       allowlist (the docs/precepts submodule pointer).
//
// BORN-RED WITNESS (2026-06-15, authoring tree): clause C1 RED (FINAL.md absent), clause C8
// RED (no changeset staged). The gate REDs honestly on the not-yet-closed state. Self-proof
// rides the az-final architecture: the pure detector takes injected IO, so each clause is
// unit-falsifiable.

import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

// Clause C6 — the BA-minted gate manifest. `runtime` gates spawn a π workspace and carry
// the GLASS_UI_SYNTH_DEVICE_ABSENT seam; `device-free` gates are exempt BY THIS TAG (the
// one-line manifest exemption the spec names — never by grep). Every BA wave that minted a
// proof:* gate appears here; the BA waves are overwhelmingly device-free comment-strip /
// source-scan detectors (the BINDING painted truth is the proof:ba-gestalt whole-page
// verdict + the tests-visual π specs, which the close reads via C2 — not re-run here).
const BA_GATE_MANIFEST = [
    // proof:tabs-std carries a SOURCE arm (the binding device-free truth: the ONE-engine
    // census, the ui/Tabs-off-barrel assert, the overflow/multi retirement) PLUS an
    // OPTIONAL π live arm that FAIL-OPENS (runs if chromium resolves, skips by policy if
    // not — `failClosed:false`). It does NOT carry the explicit GLASS_UI_SYNTH_DEVICE_ABSENT
    // skip-line contract the AZ runtime gates carry (those HARD-require a device); its source
    // arm passes device-free, so it is device-free BY THE MANIFEST TAG (the C6 grep-never
    // invariant: only a gate that hard-requires a device + carries the synth skip-line is
    // `runtime`). The BINDING painted truth for tabs is the proof:ba-gestalt motion-fourier
    // verdict, read via C2.
    { id: "proof:tabs-std", class: "device-free" },
    { id: "proof:dark-material", class: "device-free" },
    { id: "proof:no-gray", class: "device-free" },
    { id: "proof:fading-scroll", class: "device-free" },
    { id: "proof:dock-geometry", class: "device-free" },
    { id: "proof:goo-redress", class: "device-free" },
    { id: "proof:atlas-ab", class: "device-free" },
    { id: "proof:emission", class: "device-free" },
    { id: "proof:dock-sections", class: "device-free" },
    { id: "proof:dock-morph-insitu", class: "device-free" },
    { id: "proof:surface-axis", class: "device-free" },
    // W-FEEDBACK-TONE's tone-on-glass teeth live in proof:glass-cohesion (the
    // variant-arm bite — no standalone proof:feedback-tone script).
    { id: "proof:glass-cohesion", class: "device-free" },
    { id: "proof:menu-glass", class: "device-free" },
    { id: "proof:glass-cal", class: "device-free" },
    { id: "proof:progress-gradient", class: "device-free" },
    { id: "proof:icon-chip", class: "device-free" },
    { id: "proof:pager-ring", class: "device-free" },
    { id: "proof:handmark", class: "device-free" },
    { id: "proof:stage", class: "device-free" },
    { id: "proof:demo-affordances", class: "device-free" },
    { id: "proof:fourier-studio", class: "device-free" },
    { id: "proof:suffuse2", class: "device-free" },
    { id: "proof:ba-animate", class: "device-free" },
    { id: "proof:shell-hold", class: "device-free" },
    { id: "proof:config-chassis", class: "device-free" },
    // W-SHELL-RAIL-RESEAT's box-inviolate re-seat is verified by the rail gate set
    // (proof:rail3 + proof:rail-extend + proof:dock-rail-cohesion) + the BINDING
    // proof:ba-gestalt dock/shell whole-page verdict — no standalone reseat script.
    { id: "proof:rail3", class: "device-free" },
    { id: "proof:rail-extend", class: "device-free" },
    { id: "proof:dock-rail-cohesion", class: "device-free" },
    { id: "proof:ba-gestalt", class: "device-free" },
];

// dock-geometry / shell-rail-reseat / feedback-tone may not carry their own npm script id
// (some BA waves fold their detector into a shared gate). The synth-run is gated on the
// script existing in package.json — a manifest entry without a registered script is treated
// as device-free-by-absence (the C6 grep-never-witness invariant: only a runtime gate WITH
// a script is re-run). The classification below is the source of truth; an unregistered
// runtime id would RED the registration parity gate, not C6.

const CLEAN_TREE_ALLOWLIST = new Set(["docs/precepts"]);

// The H4-decided cut version (atlas register D — two grounds). The clause asserts the
// staged-or-cut state matches; it never bakes the version into a paint, only the gate fact.
const PRE_CUT_VERSION = "3.13.0";
const CUT_VERSION = "4.0.0";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        FINAL: resolve(ROOT, "docs/tranches/BA/FINAL.md"),
        AUDIT: resolve(ROOT, "docs/tranches/BA/audit/W-CLOSE-overfitting-audit.md"),
        WAVES_DIR: resolve(ROOT, "docs/tranches/BA/waves"),
        BA_PROGRESS: resolve(ROOT, "docs/tranches/BA/PROGRESS.md"),
        BASELINE: resolve(ROOT, "docs/tranches/AP/W4-bundle-profile.baseline.json"),
        CHANGESET_DIR: resolve(ROOT, ".changeset"),
        PKG: resolve(ROOT, "package.json"),
        CHANGELOG: resolve(ROOT, "CHANGELOG.md"),
        ARTIFACT: gateArtifactPath("GLASS_UI_BA_FINAL_ARTIFACT", "BA-final"),
    };
    return _cliPaths;
}

function waveIds(WAVES_DIR) {
    if (!existsSync(WAVES_DIR)) return [];
    return readdirSync(WAVES_DIR)
        .filter((f) => /^BA\.W.*\.md$/.test(f))
        .map((f) => f.replace(/^BA\./, "").replace(/\.md$/, ""))
        // The close itself (W-CLOSE) authors FINAL; a self-citation is vacuous, so the
        // wave-citation clause covers the OTHER waves. W-CLOSE's own row carries its
        // citation in FINAL §1 but the gate does not require a self-reference.
        .filter((w) => w !== "W-CLOSE")
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
        // The BA board is | batch | wave | status | notes |; the wave is col 1.
        const wave = body[1] ?? body[0];
        if (!/^W(\d|-[A-Z])/.test(wave)) return;
        rows.push({ wave, status: body[2] ?? body[body.length - 1], line: i + 1 });
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

function pkgScripts(ROOT) {
    try {
        return JSON.parse(readFileSync(resolve(ROOT, "package.json"), "utf8")).scripts ?? {};
    } catch {
        return {};
    }
}

/** Clause C6 — run one runtime gate in the synthesized device-absent shell. */
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

    // (C1) FINAL-EXISTS + per-wave green citation.
    if (inputs.finalMd == null) {
        violations.push("docs/tranches/BA/FINAL.md is absent");
        facts.finalExists = false;
    } else {
        facts.finalExists = true;
        const missing = [];
        for (const w of inputs.waveIds) {
            const re = new RegExp(
                `${w}\\b[\\s\\S]{0,200}(green|DELTA|live-verified|complete)`,
                "i",
            );
            if (!re.test(inputs.finalMd)) missing.push(w);
        }
        facts.wavesTotal = inputs.waveIds.length;
        facts.wavesCited = inputs.waveIds.length - missing.length;
        for (const w of missing)
            violations.push(
                `FINAL.md does not cite a green/DELTA/live-verified/complete status for ${w} within 200 chars of the wave id`,
            );
    }

    // (C2) THE GESTALT BAR — the P-1 close-class fix.
    facts.gestaltGreen = inputs.gestaltGreen;
    if (!inputs.gestaltGreen)
        violations.push(
            "proof:ba-gestalt is RED (a roster surface holds an open FAIL — the close cannot assert a surface PASS the gestalt gate marks FAIL; mechanically forbidden by BA invariant 4, the P-1 fix)",
        );

    // (C3) BUDGET.
    facts.budgetExists = inputs.budgetExists;
    facts.budgetEnforceGreen = inputs.budgetEnforceGreen;
    if (!inputs.budgetExists)
        violations.push("docs/tranches/AP/W4-bundle-profile.baseline.json is absent");
    if (!inputs.budgetEnforceGreen)
        violations.push("profile-bundle.mjs --enforce is RED (dist drift over the rebased baseline)");

    // (C4) NO-OPEN-LIVE-PENDING on the BA board.
    const open = [];
    for (const r of waveRows(inputs.baProgress)) {
        const reason = openLivePendingReason(r.status);
        if (reason) open.push(`BA ${r.wave} (line ${r.line}): ${reason}`);
    }
    facts.openLivePending = open;
    if (open.length)
        violations.push(`${open.length} BA PROGRESS row(s) carry an open status: ${open.join("; ")}`);

    // (C5) CARDINAL — the four ledger arms + the disposition register.
    facts.ledgerBaGreen = inputs.ledgerBaGreen;
    facts.ledgerAzGreen = inputs.ledgerAzGreen;
    facts.ledgerAyGreen = inputs.ledgerAyGreen;
    facts.ledgerAxGreen = inputs.ledgerAxGreen;
    facts.dispositionGreen = inputs.dispositionGreen;
    if (!inputs.ledgerBaGreen) violations.push("proof:live-verified-ledger:ba is RED");
    if (!inputs.ledgerAzGreen) violations.push("proof:live-verified-ledger:az is RED");
    if (!inputs.ledgerAyGreen) violations.push("proof:live-verified-ledger:ay is RED");
    if (!inputs.ledgerAxGreen) violations.push("proof:live-verified-ledger:ax is RED");
    if (!inputs.dispositionGreen) violations.push("proof:disposition-live is RED");

    // (C6) RUNNER-TRUTH BY EXECUTION.
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

    // (C7) ZERO-ORPHANS.
    if (inputs.auditMd == null) {
        violations.push("docs/tranches/BA/audit/W-CLOSE-overfitting-audit.md is absent");
        facts.zeroOrphans = false;
    } else {
        facts.zeroOrphans = /ORPHANS:\s*\*{0,2}0\*{0,2}/.test(inputs.auditMd);
        if (!facts.zeroOrphans)
            violations.push("W-CLOSE-overfitting-audit.md does not record the `ORPHANS: 0` verdict");
    }

    // (C8) STAGED-OR-CUT at the H4 version.
    facts.changesets = inputs.changesets;
    facts.pkgVersion = inputs.pkgVersion;
    const staged = inputs.pkgVersion === PRE_CUT_VERSION && inputs.changesets.length > 0;
    const changelogHasCut = new RegExp(`^## ${CUT_VERSION.replace(/\./g, "\\.")}$`, "m").test(
        inputs.changelogMd ?? "",
    );
    const cut =
        inputs.pkgVersion === CUT_VERSION &&
        inputs.changesets.length === 0 &&
        changelogHasCut;
    facts.cutState = cut ? "at-cut" : staged ? "staged" : "invalid";
    if (!staged && !cut)
        violations.push(
            `the cut state is neither STAGED (version ${PRE_CUT_VERSION} + a .changeset/*.md) nor AT-CUT (version ${CUT_VERSION} + changeset consumed + a CHANGELOG '## ${CUT_VERSION}' entry) — version '${inputs.pkgVersion}', ${inputs.changesets.length} changeset(s)`,
        );

    // (C9) CLEAN-TREE.
    facts.unallowedDirt = inputs.dirt;
    if (inputs.dirt.length)
        violations.push(
            `the working tree carries ${inputs.dirt.length} non-allowlisted dirty entr${inputs.dirt.length === 1 ? "y" : "ies"}: ${inputs.dirt.join(", ")}`,
        );

    facts.clean = violations.length === 0;
    return { facts, violations };
}

function run() {
    const P = cliPaths();
    const scripts = pkgScripts(P.ROOT);
    const synthRuns = BA_GATE_MANIFEST.filter(
        (g) => g.class === "runtime" && scripts[g.id],
    ).map((g) => synthAbsentRun(P.ROOT, g.id));
    const inputs = {
        finalMd: existsSync(P.FINAL) ? readFileSync(P.FINAL, "utf8") : null,
        auditMd: existsSync(P.AUDIT) ? readFileSync(P.AUDIT, "utf8") : null,
        waveIds: waveIds(P.WAVES_DIR),
        baProgress: existsSync(P.BA_PROGRESS) ? readFileSync(P.BA_PROGRESS, "utf8") : "",
        dirt: unallowedDirt(P.ROOT),
        budgetExists: existsSync(P.BASELINE),
        budgetEnforceGreen: budgetEnforceGreen(P.ROOT),
        gestaltGreen: npmGreen(P.ROOT, "proof:ba-gestalt"),
        ledgerBaGreen: npmGreen(P.ROOT, "proof:live-verified-ledger:ba"),
        ledgerAzGreen: npmGreen(P.ROOT, "proof:live-verified-ledger:az"),
        ledgerAyGreen: npmGreen(P.ROOT, "proof:live-verified-ledger:ay"),
        ledgerAxGreen: npmGreen(P.ROOT, "proof:live-verified-ledger:ax"),
        dispositionGreen: npmGreen(P.ROOT, "proof:disposition-live"),
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
        command: "npm run proof:ba-final",
        facts,
        violations,
    });

    console.log("proof:ba-final — the BA terminal-close meta-gate (release-only, W-CLOSE)");
    console.log(`  FINAL.md present           : ${facts.finalExists ? "YES" : "NO"}`);
    console.log(`  per-wave green citations   : ${facts.wavesCited ?? 0}/${facts.wavesTotal ?? inputs.waveIds.length}`);
    console.log(`  THE GESTALT BAR            : ${facts.gestaltGreen ? "GREEN (8/8 operative-PASS)" : "RED"}`);
    console.log(`  budget rebaselined+enforced: ${facts.budgetExists && facts.budgetEnforceGreen ? "YES" : "NO"}`);
    console.log(`  no open live-pending       : ${facts.openLivePending && facts.openLivePending.length === 0 ? "YES" : "NO"}`);
    console.log(`  cardinal ba/az/ay/ax/disp  : ${facts.ledgerBaGreen ? "Y" : "N"}/${facts.ledgerAzGreen ? "Y" : "N"}/${facts.ledgerAyGreen ? "Y" : "N"}/${facts.ledgerAxGreen ? "Y" : "N"}/${facts.dispositionGreen ? "Y" : "N"}`);
    console.log(`  runner-truth (executed)    : ${synthRuns.filter((r) => r.exit0 && r.skipLinePrinted).length}/${synthRuns.length} runtime gates skip clean (+${BA_GATE_MANIFEST.length - synthRuns.length} device-free by manifest)`);
    console.log(`  zero orphans (audit)       : ${facts.zeroOrphans ? "YES" : "NO"}`);
    console.log(`  cut state                  : ${facts.cutState} (version ${facts.pkgVersion}; ${facts.changesets.length} changeset(s))`);
    console.log(`  clean tree (allowlisted)   : ${facts.unallowedDirt && facts.unallowedDirt.length === 0 ? "YES" : "NO"}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(P.ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) run();
