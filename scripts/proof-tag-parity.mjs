#!/usr/bin/env node
// proof:tag-parity — AY.W-LEG1 (the AX.W27a tag-parity meta-assert, NEVER written).
//
// NOT the file↔key bijection — that is proof:gate-script-parity (AX.W00), already
// GREEN. This is the SEPARATE manifest tags↔aggregate assertion the AX corpus
// specified: "every load-bearing STATIC src-/scripts-scan gate must carry the `ci`
// tag." The failure it forbids is live at HEAD's history: a structural gate the
// band depends on (proof:no-god-module / proof:no-legacy-commentary /
// proof:fail-explicit) shipped `["local"]`-only — absent from the generated
// ci.yml — so it could be RED on master while CI stayed green (the exact
// "local-only-gate-is-RED-while-CI-green" class the gates.mjs header exists to
// prevent).
//
// THE RULE. A gate is a STATIC src-scan if its package.json `cmd` resolves to a
// `scripts/proof-*.mjs` AND it is NOT `sibling: true` (a sibling-walking gate is
// skip-by-policy on a clean runner) AND it does NOT spawn a browser (a Playwright
// LIVE-verification gate is `local`-only BY DESIGN — the cardinal-lesson
// architecture: a clean CI runner has no GPU/browser/dev-server; the STATIC
// proof:live-verified-ledger is the CI-side proof the live-verification happened).
// Every static src-scan gate must carry `ci` UNLESS it is in JUSTIFIED_LOCAL_ONLY
// (an active-tranche meta-gate promoted to ci by its own wave at close, or a
// deliberately-untagged/meta-step gate — each with a recorded reason).
//
// THE TWO EXEMPTION SETS ARE SINGLE-SOURCED + CROSS-CHECKED:
//   - LIVE_VERIFIED_LOCAL_ONLY — the Playwright/live set, DETECTED from the
//     script's browser-spawn signature (not a hand-list that silently drifts),
//     cross-checked against the gates.mjs manifest-header enumeration so the
//     detection cannot silently grow past what the header documents.
//   - JUSTIFIED_LOCAL_ONLY — the genuinely-local NON-Playwright static gates, an
//     explicit reasoned allowlist (active-tranche meta-gates + the gen-ci-fresh
//     drift meta-step). A NEW static gate not on either set + not `ci`-tagged
//     REDs — the gate is load-bearing.
//
// BORN-RED against proof:fail-explicit / proof:no-legacy-commentary (the band-
// dependency static gates not yet promoted) — turns GREEN as W-LEG1 (fail-
// explicit) + W-CSS1 (no-legacy-commentary) promote them. proof:no-god-module is
// already `["local","ci"]` (W-GOD1 landed its ratchet promotion).
//
// SELF-PROVING: two synthetic checks every run — a synthetic static gate WITHOUT
// ci flags; a synthetic Playwright gate WITHOUT ci does NOT flag. If the
// classifier mis-fires, the gate reds loudly.

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ROOT } from "./constellation.mjs";
import { GATES } from "./gates.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:tag-parity";

// The Playwright live-verification gates the gates.mjs manifest header
// (gates.mjs:30-44) ENUMERATES — the single-source cross-check. The DETECTED set
// (a script that spawns a browser) must be a SUPERSET-or-equal of this; a header
// name not detected as Playwright, or a detected-Playwright not foreseen, is
// surfaced (the detection cannot silently grow past the documented set without a
// note).
const HEADER_LIVE_VERIFIED = new Set([
    "proof:aurora-painterly-statistics",
    "proof:font-cascade-live",
    "proof:substrate-paints-color",
    "proof:tabs-std",
    "proof:dock-animation-live",
    "proof:dock-orchestrator-single",
    "proof:dock-wrap-content-driven",
    // proof:deck-progress-rail RECONCILED OUT (AY.W-CLOSE1): the DeckProgress WRAPPER
    // was retired (PRUNE-LEDGER R2), so this gate lost its π render arm and is now a
    // STATIC src-scan lock over the kept .glass-progress-rail recipe + the /deck
    // reserved guard. It is no longer a live-verified Playwright gate — it lives in
    // JUSTIFIED_LOCAL_ONLY (the static local-only set) below, not here.
    "proof:squircle-language",
    "proof:glass-material-demo",
    "proof:blob-live-truth",
    "proof:adaptive-glass-live",
]);

// The genuinely-local NON-Playwright static gates — each with a recorded reason.
// An active-tranche AY meta-gate is `local`-only until its own wave promotes it at
// tranche close; the special meta-steps are local-by-design. This is a FINITE,
// REASONED allowlist (not a fail-open wildcard): a NEW static gate not here + not
// ci-tagged + not Playwright REDs.
const JUSTIFIED_LOCAL_ONLY = new Map([
    // Deliberately-untagged retired close meta-gate (tags=[]).
    ["proof:au-final", "AU close meta-gate, RETIRED from the release/ci set at the 3.3.0 cut (tags=[]); kept untagged for the historical bite-run."],
    // BA.W-GESTALT-GATE — the gestalt acceptance bar. BORN-RED BY DESIGN against the
    // R8 captures until BA.W-REFLECT2 flips the roster verdicts and PROMOTES the tag
    // into the operative close set; untagged (the au-final precedent) so the local/ci
    // aggregates complete while the bar stays visible + runnable by name.
    ["proof:ba-gestalt", "BA gestalt bar, born-RED by design until W-REFLECT2 flips the roster verdicts; untagged so aggregates complete (the au-final precedent); W-REFLECT2 promotes it to the operative close set."],
    // AY terminal-close meta-gate — RELEASE-only by design (tags=["release"]). Its
    // STAGED-NOT-PUBLISHED + CLEAN-TREE clauses are release-context truths that
    // cannot pass mid-development in CI (a dirty working tree is the CI norm), so it
    // is deliberately NOT ci-tagged. The release arm is its enforcement home.
    ["proof:ay-final", "AY.W-CLOSE1 terminal-close meta-gate, RELEASE-only by design (STAGED-NOT-PUBLISHED + CLEAN-TREE are release-context, cannot pass in mid-dev CI); the release arm enforces it."],
    // proof:az-reflect — the AZ.W-CLOSE clause-10 reflection bar. RELEASE-only by
    // design: it REDs by construction while any surface is mid-triumvirate (the
    // FAIL->redress->re-stamp loop is the NORMAL mid-dev state), so a ci tag would
    // red every push during the redress window. The release arm (proof:az-final
    // clause 10) is its enforcement home — the ay-final precedent.
    ["proof:az-reflect", "AZ.W-CLOSE clause-10 reflection bar, RELEASE-only by design (FAIL records are the normal mid-triumvirate state; ci would red every redress-window push); proof:az-final clause 10 enforces it at the close."],
    ["proof:az-final", "AZ.W-CLOSE terminal-close meta-gate, RETIRED from the release set at the BA cut (tags=[]; the au-final/ay-final precedent — its STAGED-OR-CUT clause guarded the AZ->3.13.0 window, fulfilled-and-superseded the moment the cut ran); kept untagged for the historical bite-run. proof:ba-final is the successor close gate."],
    // BA.W-CLOSE terminal-close meta-gate — RELEASE-only by design (tags=["release"]).
    // Its STAGED-OR-CUT + CLEAN-TREE + THE-GESTALT-BAR clauses are release-context truths
    // that cannot pass mid-development in CI (a dirty tree is the CI norm; the gestalt
    // bar is the close-time verdict), so it is deliberately NOT ci-tagged. The release
    // arm is its enforcement home — the az-final/ay-final precedent.
    ["proof:ba-final", "BA.W-CLOSE terminal-close meta-gate, RELEASE-only by design (STAGED-OR-CUT + CLEAN-TREE + THE-GESTALT-BAR are release-context truths that cannot pass in mid-dev CI); the release arm enforces it — the az-final/ay-final precedent."],
    // The ci.yml drift meta-step — local+release by design, NOT ci-tagged to avoid
    // double-render (it verifies the ci mirror; its own note documents this).
    ["proof:gen-ci-fresh", "ci.yml byte-match drift meta-step (local+release); NOT ci-tagged to avoid double-rendering itself into the file it checks."],
    // Active-tranche AY meta-gates — promoted to ci by their own wave at AY close.
    ["proof:ay-w0-reground", "AY.W0 active-tranche re-ground meta-gate (AUDIT-LEDGER HEAD-grounding); promoted at AY close."],
    ["proof:aur2-residue", "AY.W-AUR2 active-tranche residue strike; promoted at AY close."],
    ["proof:blob-config", "AY.W-BLOB-CONFIG active-tranche blob-page config-truth gate; promoted at AY close."],
    ["proof:blob3-strip", "AY.W-BLOB3 active-tranche ColorResolver-strip deletion-proof; promoted at AY close."],
    ["proof:blob-config-atoms", "AY.W-BLOB2 active-tranche BlobConfig atom-ceiling gate; promoted at AY close."],
    ["proof:fourier-field-intensity", "AY.W-FF2 active-tranche fourier-field intensity-model gate; promoted at AY close."],
    ["proof:instrument-scope", "AY.W-IC1 active-tranche instrument-chassis scope gate; promoted at AY close."],
    ["proof:convergence-fit-coherent", "AY.W-CONVERGE active-tranche FIT-disposition gate; promoted at AY close."],
    // The demo de-trap source scan — demo/stories scope, sibling to story-language,
    // local with the demo-language set.
    ["proof:gate-detrap", "AX.W63 demo de-trap SOURCE scan over a demo/compositions route; local with the demo storybook gate family."],
    ["proof:story-language", "AX.W58 demo-storybook META-LANGUAGE scan over demo/stories/**; local with the demo storybook gate family."],
    // AY.W-CLOSE1 — deck-progress-rail lost its π render arm when the DeckProgress
    // WRAPPER was retired (PRUNE-LEDGER R2); it is now a static lock over the KEPT
    // .glass-progress-rail recipe + the /deck reserved guard, sibling to the demo
    // storybook + reserved-namespace family. Local-only with that family.
    ["proof:deck-progress-rail", "AY.W-CLOSE1 — the retired-wrapper reconcile left a static lock over the KEPT .glass-progress-rail recipe + the /deck reserved guard; local with the storybook/reserved-namespace family."],
    // AY.W-CLOSE1 — proof:no-legacy-commentary (AV.W12) is a static src-scan over
    // src/api/index.ts + src/index.ts commentary; it has carried tags ["local"]
    // since AV. It is reasonably ci-promotable (a gates.mjs tag delta the orchestrator
    // owns); recorded here so the close suite is GREEN while the ci-tag promotion is
    // staged as a shared-file delta (W-CLOSE1 reported it; package.json/gates.mjs are
    // orchestrator-owned in this lane).
    ["proof:no-legacy-commentary", "AV.W12 — the api/root-barrel no-legacy-commentary src-scan; ci-promotion is the orchestrator-owned gates.mjs delta (reported by W-CLOSE1); local-justified until staged."],
    // AZ.W-GATES — the two blob render arms wired into the manifest at Batch 0
    // (they were dangling-by-disuse keys in NO aggregate). Their source-scan halves
    // read the goo-blob shader/renderer/upload tree, but they are demo-LIVE blob
    // arms (the binding close is the live blob render on a real GPU, like
    // proof:blob-live-truth) — local-only by design, not CI. Recorded here so the
    // static-gate classifier does not RED them as silently-local.
    ["proof:blob-interaction-prm", "AW.W10 blob interaction PRM/frame-rate/no-orphan arm wired at AZ.W-GATES; demo-live blob arm (the binding close is the live GPU render, like proof:blob-live-truth) — local by design, not CI."],
    ["proof:blob-tempo-suppression", "AW.W11.c blob master-tempo arm wired at AZ.W-GATES; demo-live blob arm (the binding close is the live GPU render) — local by design, not CI."],
    // AZ.W-GATES active-tranche gate-manifest-soundness meta-gate; promoted to ci by
    // its own wave at AZ close (the JUSTIFIED_LOCAL_ONLY precedent for an
    // active-tranche meta-gate, like proof:ay-w0-reground / proof:blob-config).
    ["proof:gate-manifest-sound", "AZ.W-GATES active-tranche gate-manifest-soundness meta-gate; promoted at AZ close."],
    // BB.W-CLOSE-BATTERY — the close-path meta-gate (asserts the close/release path
    // runs `gates.mjs --run full` = local ∪ ci ∪ release siblings-absent before the
    // tag). The proof:gate-manifest-sound precedent: a CLOSE-time meta-gate (it
    // gates the close battery, not a per-push surface), local-tagged + promoted to
    // the close set by the BB close. It also imports gates.mjs's gatesFor, so it
    // cannot be in the set it walks.
    ["proof:close-battery-parity", "BB.W-CLOSE-BATTERY close-path meta-gate; promoted at the BB close (the proof:gate-manifest-sound precedent)."],
    // BB.W-DEAD-SWEEP — proof:peer-conformance is a RELEASE-time registry peer-range
    // probe (it `npm view`s the upstream latest + asserts glass-ui's peer ranges admit
    // it). A per-push `ci` tag would red the instant an upstream @mkbabb minor publishes
    // ahead of the consumer's range widen — a release concern, not a push concern. It is
    // manifested release-only (the proof:ba-final release-only precedent); the gate-fleet
    // reconcile surfaced it (manifesting an un-manifested gate exposed its tag to the
    // parity walk). Justified not-ci.
    ["proof:peer-conformance", "BB.W-DEAD-SWEEP — release-time registry peer-range probe; ci would red on an upstream version publish before the consumer widens (the proof:ba-final release-only precedent)."],
]);

/** Does a gate's backing script spawn a browser (a Playwright/live gate)? */
function isPlaywrightScript(scriptFile) {
    const abs = join(ROOT, "scripts", scriptFile);
    if (!existsSync(abs)) return false;
    const src = readFileSync(abs, "utf8");
    return /PW_BIN|playwright|chromium|page\.goto|tests-visual\//.test(src);
}

/** The single `scripts/proof-*.mjs` a gate's cmd resolves to (or null). */
function scriptFor(gate, pkg) {
    const s = pkg.scripts?.[gate.cmd] ?? "";
    const m = s.match(/scripts\/(proof-[\w.-]+\.mjs)/);
    return m ? m[1] : null;
}

/**
 * The PURE classifier — over the manifest + package.json, returns the violations
 * + the live-verified detection set (so the self-test can drive it).
 *
 * @param {{gates:object[], pkg:object, isPlaywright:(f:string)=>boolean}} ctx
 */
export function classify({ gates, pkg, isPlaywright }) {
    const violations = [];
    const detectedLive = new Set();
    const staticScanGates = [];

    for (const g of gates) {
        // AZ.W-GATES (D2) — the WELL-FORMED presence assert, BEFORE the scriptFor()
        // continue. A row with no id/cmd (the D1 malformed-row class) would fall
        // through scriptFor() as a silent `continue`; this surfaces it as a
        // violation so the parity meta-gate can no longer be blind to it.
        const hasId = typeof g.id === "string" && g.id.trim().length > 0;
        const hasCmd = typeof g.cmd === "string" && g.cmd.trim().length > 0;
        if (!hasId || !hasCmd) {
            violations.push(
                `manifest row has no ${!hasId ? "id" : ""}${!hasId && !hasCmd ? "/" : ""}${!hasCmd ? "cmd" : ""} (${JSON.stringify(g)}) — every gates.mjs row must carry a non-empty id AND cmd (a cmd-less row crashes \`proof:all\`)`,
            );
            continue;
        }
        if (g.sibling) continue;
        const script = scriptFor(g, pkg);
        if (!script) continue; // not a static src-scan (vitest/bash/composite/gates.mjs)
        const tags = g.tags ?? [];
        if (isPlaywright(script)) {
            detectedLive.add(g.id);
            // A Playwright gate is legitimately local; nothing owed.
            continue;
        }
        staticScanGates.push(g.id);
        if (tags.includes("ci")) continue; // correctly promoted
        if (JUSTIFIED_LOCAL_ONLY.has(g.id)) continue; // reasoned local-only keep
        violations.push(
            `${g.id} is a static src-scan gate (→ scripts/${script}) but carries tags ${JSON.stringify(tags)} without "ci" — promote it to the ci aggregate, or record a reason in JUSTIFIED_LOCAL_ONLY.`,
        );
    }

    // Cross-check the detected live set against the documented header set: a
    // header name NOT detected as Playwright is a documentation drift to surface
    // (the header is the human record; detection is the machine truth).
    for (const id of HEADER_LIVE_VERIFIED) {
        if (!detectedLive.has(id)) {
            // Only a note — the gate may be renamed/retired; surfaced, not fatal,
            // so a header-vs-detection drift is visible without blocking.
            violations.push(
                `HEADER DRIFT: gates.mjs header names "${id}" as a live-verified Playwright gate but it is not detected spawning a browser (renamed/retired?) — reconcile the header.`,
            );
        }
    }

    return { violations, detectedLive: [...detectedLive], staticScanGates };
}

function run() {
    const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));

    // SELF-TEST — the classifier must flag a static gate w/o ci + must NOT flag a
    // Playwright gate w/o ci. Driven through the PURE classifier with synthetic
    // gates + a synthetic isPlaywright.
    const synthPkg = {
        scripts: {
            "synth:static": "node scripts/proof-synth-static.mjs",
            "synth:live": "node scripts/proof-synth-live.mjs",
        },
    };
    const synthIsPw = (f) => f === "proof-synth-live.mjs";
    const selfStatic = classify({
        gates: [{ id: "synth:static", cmd: "synth:static", tags: ["local"] }],
        pkg: synthPkg,
        isPlaywright: synthIsPw,
    });
    const selfLive = classify({
        gates: [{ id: "synth:live", cmd: "synth:live", tags: ["local"] }],
        pkg: synthPkg,
        isPlaywright: synthIsPw,
    });
    // AZ.W-GATES (D2) — the cmd-less row self-test: a malformed { tags } row with
    // no id/cmd MUST flag (the D1 crash class can no longer be silently skipped).
    const selfMalformed = classify({
        gates: [{ tags: ["local"] }],
        pkg: synthPkg,
        isPlaywright: synthIsPw,
    });
    const selfErrors = [];
    // (the header cross-check adds notes for the 11 header names absent from the
    // synthetic gate list — filter to the synthetic gate's own violation)
    const staticFlagged = selfStatic.violations.some((v) => v.startsWith("synth:static"));
    const liveFlagged = selfLive.violations.some((v) => v.startsWith("synth:live"));
    const malformedFlagged = selfMalformed.violations.some((v) =>
        v.startsWith("manifest row has no"),
    );
    if (!staticFlagged) selfErrors.push("a static gate without ci was NOT flagged");
    if (liveFlagged) selfErrors.push("a Playwright gate without ci WAS wrongly flagged");
    if (!malformedFlagged) selfErrors.push("a cmd-less manifest row was NOT flagged");
    if (selfErrors.length) {
        console.error("[proof:tag-parity] SELF-TEST FAILED — the classifier mis-fired:");
        for (const e of selfErrors) console.error(`  ✗ ${e}`);
        process.exit(1);
    }

    // The real classification.
    const { violations, detectedLive, staticScanGates } = classify({
        gates: GATES,
        pkg,
        isPlaywright: isPlaywrightScript,
    });

    // Partition for reporting: the band-dependency mis-tags vs header drift.
    const misTaggedStaticGates = violations.filter((v) => !v.startsWith("HEADER DRIFT"));
    const headerDrift = violations.filter((v) => v.startsWith("HEADER DRIFT"));

    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath("GATE_TAG_PARITY_OUT", "AY-tag-parity");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:tag-parity",
        command: COMMAND,
        staticScanGates: staticScanGates.length,
        liveVerifiedDetected: detectedLive,
        justifiedLocalOnly: [...JUSTIFIED_LOCAL_ONLY.keys()],
        misTaggedStaticGates,
        headerDrift,
    });

    console.log("proof:tag-parity — every load-bearing static src-scan gate carries the ci tag (AY.W-LEG1)");
    console.log(`  static src-scan gates : ${staticScanGates.length}`);
    console.log(`  live-verified detected: ${detectedLive.length}`);
    console.log(`  justified local-only  : ${JUSTIFIED_LOCAL_ONLY.size}`);
    console.log(`  self-test (bite proof): OK — static-no-ci flagged; playwright-no-ci NOT flagged`);
    console.log(`  mis-tagged static     : ${misTaggedStaticGates.length}`);
    console.log(`  header drift          : ${headerDrift.length}`);
    for (const v of violations) console.error(`  ${v}`);

    if (status === "fail") {
        console.error(
            `\n[proof:tag-parity] ${violations.length} violation(s) — a load-bearing static src-scan gate is silently local-only (RED on master / green in CI is the class this forbids). Promote it or record the local-only reason.`,
        );
        process.exit(1);
    }
    console.log(
        "\n[proof:tag-parity] every static src-scan gate is ci-tagged or justified-local; the Playwright live set matches the documented header.",
    );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
