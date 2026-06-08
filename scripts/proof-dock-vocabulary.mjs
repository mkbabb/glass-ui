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
        DOCK_CSS: resolve(ROOT, "src/styles/dock.css"),
        ARTIFACT: gateArtifactPath("GLASS_UI_DOCK_VOCABULARY_ARTIFACT", "AU-dock-vocabulary"),
    };
    return _cliPaths;
}

// AX.W02 — strip CSS block comments so a HISTORICAL `.layer-active` mention in a
// doc-block is NOT counted as a live selector (the false-witness discipline).
function stripCssComments(css) {
    let out = "";
    let i = 0;
    while (i < css.length) {
        if (css[i] === "/" && css[i + 1] === "*") {
            const end = css.indexOf("*/", i + 2);
            const stop = end === -1 ? css.length : end + 2;
            for (let k = i; k < stop; k++) out += css[k] === "\n" ? "\n" : " ";
            i = stop;
        } else {
            out += css[i];
            i++;
        }
    }
    return out;
}

// AX.W02 — the CSS state-vocabulary + stagger-token arm. ONE active-state
// vocabulary (`.is-active`/`.is-leaving`, the `.layer-active` triple collapsed),
// a single `--dock-stagger-step` token, NO hand-typed nth-child onset ladder, and
// the greppable-sync tombstone DELETED. Pure (FS-free) over the dock.css text.
export function detectCssVocabulary(dockCss) {
    const violations = [];
    const facts = {};
    const live = stripCssComments(dockCss);

    // (1) ONE active-state vocabulary — the outer `.layer-active` is RETIRED; both
    //     surfaces drive crossfade off `.is-active`/`.is-leaving`. A live
    //     `.layer-active` selector (outside comments) is the un-merged vocabulary.
    const layerActiveHits = (live.match(/\.layer-active\b/g) ?? []).length;
    facts.liveLayerActiveSelectors = layerActiveHits;
    if (layerActiveHits > 0) {
        violations.push(
            `dock.css carries ${layerActiveHits} live \`.layer-active\` selector(s) — the outer/inner state vocabulary must collapse onto ONE set (\`.is-active\`/\`.is-leaving\`); retire \`.layer-active\``,
        );
    }
    facts.usesIsActive = /\.is-active\b/.test(live);
    facts.usesIsLeaving = /\.is-leaving\b/.test(live);
    if (!facts.usesIsActive || !facts.usesIsLeaving) {
        violations.push(
            "dock.css must express the unified crossfade vocabulary `.is-active` + `.is-leaving` (the single active-state set)",
        );
    }

    // (2) the greppable-sync tombstone is DELETED (a deletion-proof arm). It existed
    //     only because the two vocabularies were never merged.
    const tombstone = /greps for this marker so the semantics are not collapsed/.test(
        dockCss,
    );
    facts.greppableSyncCommentPresent = tombstone;
    if (tombstone) {
        violations.push(
            "the greppable-sync tombstone comment (\"greps for this marker so the semantics are not collapsed\") must be DELETED — there is nothing to keep in sync once the vocabulary is one",
        );
    }

    // (3) ONE `--dock-stagger-step` token (declared once) drives the onsets.
    const stepDecls = (live.match(/--dock-stagger-step\s*:/g) ?? []).length;
    facts.staggerStepDeclarations = stepDecls;
    if (stepDecls < 1) {
        violations.push(
            "dock.css does not declare the `--dock-stagger-step` token — the per-child onset must derive from ONE token, not five magic numbers",
        );
    }

    // (4) NO hand-typed magic onset ladder. The retired ladder set
    //     `--dock-stagger-onset: 0.08/0.16/0.24/0.32/0.4` as bare literals. A live
    //     `--dock-stagger-onset:` set to a bare decimal LITERAL (not a `calc(... )`
    //     off the token) is the magic ladder.
    const magicOnsets = [
        ...live.matchAll(/--dock-stagger-onset\s*:\s*(0?\.\d+)\s*;/g),
    ].map((m) => m[1]);
    facts.magicOnsetLiterals = magicOnsets;
    if (magicOnsets.length > 0) {
        violations.push(
            `dock.css still hand-types the onset ladder (\`--dock-stagger-onset: ${magicOnsets.join(", ")}\`) — replace the magic numbers with \`calc(var(--dock-stagger-step) * N)\``,
        );
    }
    // The token-keyed form must be present (calc off the step token).
    facts.usesTokenKeyedOnset = /--dock-stagger-onset\s*:\s*calc\([^)]*--dock-stagger-step/.test(
        live,
    );
    if (!facts.usesTokenKeyedOnset && stepDecls >= 1) {
        violations.push(
            "the per-child onset must be `calc(var(--dock-stagger-step) * N)` (the token-keyed ladder) — the token is declared but not consumed by the onsets",
        );
    }

    return { facts, violations };
}

function run() {
    const { ROOT, README, DOCK_CSS, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    // AX.W02 — the CSS state-vocabulary + stagger-token arm folds in alongside the
    // README role-vocabulary arm.
    if (!existsSync(DOCK_CSS)) {
        violations.push("dock.css (src/styles/dock.css) is absent — the CSS vocabulary arm cannot run");
    } else {
        const cssArm = detectCssVocabulary(readFileSync(DOCK_CSS, "utf8"));
        Object.assign(facts, { css: cssArm.facts });
        violations.push(...cssArm.violations);
    }

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

    console.log("proof:dock-vocabulary — the <Role>Dock README convention (AU.W8) + the CSS state vocabulary (AX.W02)");
    console.log(`  role names        : ${facts.roles}/${ROLES.length}`);
    console.log(`  canonical useDock*: ${facts.composables}/${COMPOSABLES.length}`);
    if (facts.css) {
        console.log(`  live .layer-active selectors: ${facts.css.liveLayerActiveSelectors} (== 0 — one vocabulary)`);
        console.log(`  --dock-stagger-step token   : ${facts.css.staggerStepDeclarations} (>= 1, magic ladder retired)`);
        console.log(`  greppable-sync tombstone    : ${facts.css.greppableSyncCommentPresent ? "PRESENT (must delete)" : "deleted"}`);
    }
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
