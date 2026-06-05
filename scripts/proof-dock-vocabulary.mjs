#!/usr/bin/env node
// AU.W8 — the dock-vocabulary gate (proof:dock-vocabulary, ASK-7), RE-GROUNDED.
//
// The `<Role>Dock` precept: ONE role vocabulary documented ONCE in glass-ui's dock
// README (the source of truth) so a new consumer picks a role rather than inventing
// a name, plus ONE canonical `useDock*` name per dock composable.
//
// RE-GROUNDED against HEAD (the fourier CHARTER's two other clauses were STALE):
//   - the `useTouchGate→useDockTouchGate` rename is NOT done — `useTouchGate` is a
//     GENERAL composables/dom primitive (Slider consumes it, root-barrel public);
//     renaming would mis-name it + break consumers. A grep-for-absence over the
//     rename is therefore REJECTED (it would be unsatisfiable + wrong).
//   - the `DockTabButton` retire is NOT done — it has real demo consumers
//     (StoryPager, instrument-chassis), so it is not a 0-consumer orphan.
// So this gate asserts the GENUINE deliverable: the dock README enumerates the four
// role names + the base primitives + the canonical `useDock*` composable names, AND
// records the two re-groundings.
//
// inv ε / bite-check: deleting a role name from the README reddens it.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROLES = ["ChromeDock", "TransportDock", "CanvasDock", "ToolDock"];
const COMPOSABLES = ["useDockState", "useLayerTransition", "useDockContext"];
const BASE = ["GlassDock", "DockIconButton"];

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        README: resolve(ROOT, "src/components/custom/dock/README.md"),
        ARTIFACT: gateArtifactPath("GLASS_UI_DOCK_VOCABULARY_ARTIFACT", "AU-dock-vocabulary"),
    };
    return _cliPaths;
}

function run() {
    const { ROOT, README, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    if (!existsSync(README)) {
        violations.push("the dock README (src/components/custom/dock/README.md) is absent — the role-vocabulary source of truth (born-RED at HEAD)");
        writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status: "fail", gate: "proof:dock-vocabulary", facts, violations });
        console.error("[proof:dock-vocabulary] FAIL — README absent");
        process.exit(1);
    }
    const md = readFileSync(README, "utf8");

    const missingRoles = ROLES.filter((r) => !md.includes(r));
    const missingComposables = COMPOSABLES.filter((c) => !md.includes(c));
    const missingBase = BASE.filter((b) => !md.includes(b));
    facts.roles = ROLES.length - missingRoles.length;
    facts.composables = COMPOSABLES.length - missingComposables.length;
    if (missingRoles.length) violations.push(`the dock README is missing role name(s): ${missingRoles.join(", ")}`);
    if (missingComposables.length) violations.push(`the dock README is missing canonical composable(s): ${missingComposables.join(", ")}`);
    if (missingBase.length) violations.push(`the dock README does not name the base primitive(s): ${missingBase.join(", ")}`);

    // the two re-groundings are documented (so a later reader does not re-mint them)
    if (!/useTouchGate[\s\S]{0,120}(general|not renamed|NOT renamed|stays)/i.test(md)) {
        violations.push("the README does not record the useTouchGate re-grounding (it stays general, not renamed)");
    }
    if (!/DockTabButton[\s\S]{0,120}(KEPT|kept|consumers|not.*retire)/i.test(md)) {
        violations.push("the README does not record the DockTabButton re-grounding (kept — it has consumers)");
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, gate: "proof:dock-vocabulary", facts, violations });

    console.log("proof:dock-vocabulary — the <Role>Dock README convention (AU.W8, re-grounded)");
    console.log(`  role names      : ${facts.roles}/${ROLES.length}`);
    console.log(`  canonical useDock*: ${facts.composables}/${COMPOSABLES.length}`);
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
