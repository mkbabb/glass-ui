#!/usr/bin/env node
// AU.W8b.3 — the dock.css → dock-controls.css split gate (proof:dock-css-split).
//
// dock.css was a monolith: the shell / density / grain / layer-crossfade
// contract PLUS the five interactive control families (.dock-icon-button,
// .dark-mode-toggle-button, .dock-tab-button + tiers, the
// .dock-select-trigger / .dock-dropdown-trigger pair). AU.W8b.3 carves the five
// control families OUT to dock-controls.css (imported directly after dock.css in
// index.css, same @layer components), leaving dock.css the shell substrate + the
// SHARED cross-control four-state contract (the :focus-visible / :disabled
// comma-groups + the motion-token :where() group — they REFERENCE the control
// selectors but are shared, not per-control, so they stay at the import root).
//
// This gate proves the carve held:
//   1. EXISTS+IMPORTED — dock-controls.css exists and index.css @imports it.
//   2. MOVED           — no per-control BASE rule (`.dock-icon-button {` etc.)
//                        survives in dock.css, EXEMPTING the shared comma-groups
//                        (a selector that also names another control / carries a
//                        :focus-visible|:disabled pseudo) and the :where() group.
//   3. LANDED          — each of the five families has its base rule in
//                        dock-controls.css.
//
// House style mirrors proof-dock-opacity-lockstep.mjs: ESM .mjs, comment-strip
// first (false-witness discipline — a commented-out rule is never a witness), a
// pure exported detector, a byte-stable JSON artefact via gate-output, a human
// summary, process.exit(1) on any violation.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

// The five control families. `base` is the bare base-rule selector each MUST
// carry in dock-controls.css and must NOT carry as a top-level block in dock.css.
const CONTROL_FAMILIES = [
    ".dock-icon-button",
    ".dark-mode-toggle-button",
    ".dock-tab-button",
    ".dock-select-trigger",
    ".dock-dropdown-trigger",
];

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        DOCK_CSS: resolve(ROOT, "src/styles/dock.css"),
        DOCK_CONTROLS_CSS: resolve(ROOT, "src/styles/dock-controls.css"),
        INDEX_CSS: resolve(ROOT, "src/styles/index.css"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_DOCK_CSS_SPLIT_ARTIFACT",
            "AU-dock-css-split",
        ),
    };
    return _cliPaths;
}

function blankRange(text, start, end) {
    let out = "";
    for (let i = start; i < end; i++) out += text[i] === "\n" ? "\n" : " ";
    return out;
}

// Strip CSS block comments to blanks (preserve offsets/newlines) so a
// commented-out control rule is never a false witness.
function stripBlockComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text[i] === "/" && text[i + 1] === "*") {
            const end = text.indexOf("*/", i + 2);
            const stop = end === -1 ? text.length : end + 2;
            result += blankRange(text, i, stop);
            i = stop;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Remove every `:where( … )` group so its inner comma-list (the shared
// motion-token group names the control selectors followed by `,`) cannot be
// mistaken for a base rule. The group is single-level here (no nested parens).
function stripWhereGroups(css) {
    return css.replace(/:where\([^)]*\)/g, ":where()");
}

// A BASE rule: the selector token followed by a selector-name boundary
// (`(?![\w-])`) then optional whitespace then `,` (it heads a comma-list base —
// e.g. the `.dock-select-trigger, .dock-dropdown-trigger {` shared base) OR `{`
// (a standalone base). The trailing boundary rejects prefix collisions
// (`.dock-select-trigger__chevron`); the `(?![\w-])` + `[,{]` rejects every
// STATE rule (`:hover`, `[data-tier]`, `:focus-visible`) because those carry a
// pseudo / attribute between the class and the `,`/`{`. After :where()-stripping
// the only base-position commas left are real comma-grouped BASE rules.
function hasBaseRule(css, selector) {
    const re = new RegExp(`${reEsc(selector)}(?![\\w-])\\s*[,{]`);
    return re.test(stripWhereGroups(css));
}

// The pure detector. Takes the THREE comment-stripped sources, returns
// { facts, violations }.
export function detectSplit(dockCss, controlsCss, indexCss, controlsExists) {
    const violations = [];
    const facts = {};

    // (1) EXISTS + IMPORTED.
    facts.controlsExists = controlsExists;
    if (!controlsExists) {
        violations.push(
            "src/styles/dock-controls.css does not exist — the control family was not carved out",
        );
    }
    const imported = /@import\s+["']\.\/dock-controls\.css["']/.test(indexCss);
    facts.importedByIndex = imported;
    if (!imported) {
        violations.push(
            "src/styles/index.css does not @import ./dock-controls.css (the /styles bundle would not ship it)",
        );
    }

    // (2) MOVED — no per-control base rule survives in dock.css.
    facts.survivingBaseRules = [];
    for (const sel of CONTROL_FAMILIES) {
        if (hasBaseRule(dockCss, sel)) {
            facts.survivingBaseRules.push(sel);
            violations.push(
                `dock.css still defines the base rule \`${sel} { … }\` — move the whole ${sel} family to dock-controls.css`,
            );
        }
    }

    // (3) LANDED — each family's base rule is present in dock-controls.css.
    facts.landedBaseRules = [];
    facts.missingBaseRules = [];
    for (const sel of CONTROL_FAMILIES) {
        if (hasBaseRule(controlsCss, sel)) {
            facts.landedBaseRules.push(sel);
        } else {
            facts.missingBaseRules.push(sel);
            violations.push(
                `dock-controls.css is missing the base rule \`${sel} { … }\` (the control family did not land)`,
            );
        }
    }

    // Coherence anchor — the shared cross-control contract STAYS in dock.css
    // (the import root): the :where() motion group + the :focus-visible group
    // must still reference the control selectors there.
    const sharedWhere = /:where\([^)]*\.dock-icon-button/.test(dockCss);
    const sharedFocus = /\.dock-icon-button:focus-visible/.test(dockCss);
    facts.sharedContractStaysInDock = sharedWhere && sharedFocus;
    if (!sharedWhere) {
        violations.push(
            "the motion-token :where(…) group must STAY in dock.css (the import root) — it references the control family but is shared",
        );
    }
    if (!sharedFocus) {
        violations.push(
            "the shared :focus-visible comma-group must STAY in dock.css (the cross-control four-state contract)",
        );
    }

    facts.split = violations.length === 0;
    return { facts, violations };
}

export function detectSource({ dockCss, controlsCss, indexCss, controlsExists }) {
    return detectSplit(
        stripBlockComments(dockCss ?? ""),
        stripBlockComments(controlsCss ?? ""),
        stripBlockComments(indexCss ?? ""),
        controlsExists,
    );
}

function run() {
    const { ROOT, DOCK_CSS, DOCK_CONTROLS_CSS, INDEX_CSS, ARTIFACT } = cliPaths();
    const controlsExists = existsSync(DOCK_CONTROLS_CSS);
    const { facts, violations } = detectSource({
        dockCss: readFileSync(DOCK_CSS, "utf8"),
        controlsCss: controlsExists ? readFileSync(DOCK_CONTROLS_CSS, "utf8") : "",
        indexCss: readFileSync(INDEX_CSS, "utf8"),
        controlsExists,
    });
    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:dock-css-split",
        facts,
        violations,
    });

    console.log("proof:dock-css-split — the dock.css → dock-controls.css carve gate (AU.W8b.3)");
    console.log(`  dock-controls.css exists  : ${facts.controlsExists ? "YES" : "NO"}`);
    console.log(`  @imported by index.css    : ${facts.importedByIndex ? "YES" : "NO"}`);
    console.log(`  control base rules landed : ${facts.landedBaseRules.length}/${CONTROL_FAMILIES.length}`);
    console.log(`  surviving in dock.css     : ${facts.survivingBaseRules.length === 0 ? "none" : facts.survivingBaseRules.join(", ")}`);
    console.log(`  shared contract stays     : ${facts.sharedContractStaysInDock ? "YES" : "NO"}`);
    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
