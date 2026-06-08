#!/usr/bin/env node
// AU.W2 — the dock opacity-lockstep static gate (proof:dock-opacity-lockstep).
//
// slides-F P0 (the user's "not iOS-smooth" report, V02 Problem 2). AT.W6-dock-c
// shipped the VT-curve half (the overshoot is gone), but the OPACITY half stayed
// desynced: the dock layer fade ran `--dock-motion-fast` (0.2s) while the
// container morph runs `--dock-motion-resize` (0.3s + the snappy spring) — a
// 100ms-apart settle, so the items appeared to lag the pill as it morphed.
//
// AU.W2 unifies the curve: the `.dock-layer{,-item-host}` opacity transition now
// rides `--dock-motion-resize` — the SAME compound token (duration AND easing)
// the container morph uses. Because the fade and the morph consume ONE source
// token, they settle in lockstep BY CONSTRUCTION — a 0-frame split, comfortably
// inside the ≤1-frame (≤16.7ms) bar the CHARTER names.
//
// AW.W2 — the clip-reveal one-clock redefinition. The ACTIVE pane is now
// REVEALED by the box (the clip aperture), statically opacity:1 — it has ZERO
// opacity authority. The ONLY surviving opacity animation is the LEAVING pane's
// fade, which rides the base `.dock-layer{,-item-host}` rule's
// `opacity var(--dock-motion-resize)` (the leaving pane inherits the base rule;
// it does not redeclare `transition`). So the lockstep target moved: the gate
// asserts (a) the base/leaving fade still names --dock-motion-resize, and (b) the
// ACTIVE pane has NO opacity transition arm (it must be statically revealed, not
// faded — re-introducing `opacity var(--dock-motion-resize)` on the active pane
// would regress the clip-reveal contract).
//
// WHY A STATIC SAME-TOKEN GATE (not a headless-Chrome timing probe): jsdom/
// happy-dom do not run real CSS transitions, so a unit-test "settle" reading is
// impossible; a real-browser rAF probe of getComputedStyle('opacity') vs the
// container size is inherently flaky (sub-frame jitter, GPU scheduling). The
// same-source-token proof is EXACT (the settle delta is identically 0 — both
// properties read one `transition-duration` + one `animation-timing-function`)
// and CANNOT flake. This is the same call `proof:dock-motion-parity` (gates.mjs)
// made for the VT/FLIP timing-parity: a static one-token proof IS the timing
// instrument. The perceptual half is validated downstream (the slides deck's
// Playwright dock validation consumes this published dock).
//
// House style mirrors proof-dock-motion-parity.mjs: ESM .mjs, comment-strip
// first (false-witness discipline), a pure exported detector, a byte-stable JSON
// artefact via gate-output, a human summary, process.exit(1) on any violation.
//
// DEMOTED at AU.W8 to the SYNTACTIC token-match; the frame-origin (perceptual)
// half is proof:dock-motion-single-source. This gate stays KEPT — it is the
// cheap fast-guard that both rules name --dock-motion-resize; the W8 sibling
// gate proves the FLIP fallback's ref-swap and width-set share ONE rAF origin.
//
// SEVERITY: STRUCTURE (re-demoted at AV.W9.4). A same-token proof is EXACT for
// "do both rules name one curve" but BLIND to whether the morph paints — it could
// not catch the AU.W8b dual-driver freeze. The behavioral source of truth is now
// proof:dock-animation-live (the born-RED Playwright frame-sampling gate). This
// gate stays GREEN as a fast guard that opacity + the container morph still share
// the --dock-motion-resize token.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        DOCK_CSS: resolve(ROOT, "src/styles/dock.css"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_DOCK_OPACITY_LOCKSTEP_ARTIFACT",
            "AU-dock-opacity-lockstep",
        ),
    };
    return _cliPaths;
}

function blankRange(text, start, end) {
    let out = "";
    for (let i = start; i < end; i++) out += text[i] === "\n" ? "\n" : " ";
    return out;
}

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

// Find the `{ … }` body of the first rule whose selector matches `selectorRe`.
function matchRuleBody(css, selectorRe) {
    const m = css.match(selectorRe);
    if (!m) return null;
    const open = css.indexOf("{", m.index);
    if (open === -1) return null;
    const close = css.indexOf("}", open);
    if (close === -1) return null;
    return css.slice(open + 1, close);
}

// Extract the `transition: …;` value (may span newlines), whitespace-collapsed.
function transitionValue(body) {
    const m = body.match(/transition\s*:\s*([^;]+);/);
    return m ? m[1].replace(/\s+/g, " ").trim() : null;
}

const BASE_RULE_RE = /\.dock-layer\s*,\s*\.dock-layer-item-host\s*\{/;
// AX.W02 — the active-pane vocabulary UNIFIED: the outer `.layer-active` triple
// retired, both surfaces now drive crossfade off `.is-active`. The active rule is
// `.dock-layer.is-active, .dock-layer-item-host.is-active`. The gate's INTENT is
// unchanged (the active pane carries NO opacity transition arm — only the leaving
// pane fades); only the selector name moved off `.layer-active`.
const ACTIVE_RULE_RE =
    /\.dock-layer\.is-active\s*,\s*\.dock-layer-item-host\.is-active\s*\{/;

// The pure detector. Takes the comment-stripped dock.css, returns {facts,violations}.
export function detectLockstep(dockCss) {
    const violations = [];
    const facts = {};

    // (anchor) the container morph rides --dock-motion-resize (the lockstep target).
    const morphUsesResize = /\b(?:width|height)\s+var\(--dock-motion-resize\)/.test(
        dockCss,
    );
    facts.containerMorphToken = morphUsesResize
        ? "--dock-motion-resize"
        : "(not --dock-motion-resize)";
    if (!morphUsesResize) {
        violations.push(
            "the dock container morph (width/height) does not ride --dock-motion-resize — the lockstep anchor is missing",
        );
    }

    // (base/inactive) opacity rides --dock-motion-resize; visibility hold → --duration-normal.
    const baseBody = matchRuleBody(dockCss, BASE_RULE_RE);
    if (baseBody === null) {
        violations.push(
            "dock.css: the `.dock-layer, .dock-layer-item-host` base transition rule is missing",
        );
    } else {
        const t = transitionValue(baseBody);
        facts.baseTransition = t;
        if (!t) {
            violations.push("the base layer rule declares no `transition`");
        } else {
            if (/opacity\s+var\(--dock-motion-fast\)/.test(t)) {
                violations.push(
                    `the base layer OPACITY still rides --dock-motion-fast (the 0.2s desync) — must ride --dock-motion-resize: \`${t}\``,
                );
            }
            if (!/opacity\s+var\(--dock-motion-resize\)/.test(t)) {
                violations.push(
                    `the base layer opacity must ride --dock-motion-resize (lockstep with the morph): \`${t}\``,
                );
            }
            if (/visibility\s+0s\s+linear\s+var\(--duration-fast\)/.test(t)) {
                violations.push(
                    `the base layer VISIBILITY hold still uses --duration-fast — must extend to --duration-normal (matched to the longer fade): \`${t}\``,
                );
            }
            if (!/visibility\s+0s\s+linear\s+var\(--duration-normal\)/.test(t)) {
                violations.push(
                    `the base layer visibility hold must be \`0s linear var(--duration-normal)\`: \`${t}\``,
                );
            }
        }
    }

    // (active, AW.W2 clip-reveal) — the active pane has NO opacity transition arm
    // (statically opacity:1, REVEALED by the clip aperture, never faded), and
    // visibility stays IMMEDIATE (`visibility 0s`, no deferred delay). A
    // re-introduced `opacity var(--dock-motion-resize)` here would regress the
    // clip-reveal contract (a second opacity authority on the active pane).
    const activeBody = matchRuleBody(dockCss, ACTIVE_RULE_RE);
    if (activeBody === null) {
        violations.push(
            "dock.css: the `.dock-layer.is-active, .dock-layer-item-host.is-active` rule is missing",
        );
    } else {
        const t = transitionValue(activeBody);
        facts.activeTransition = t;
        if (!t) {
            violations.push("the active layer rule declares no `transition`");
        } else {
            if (/opacity\s+var\(/.test(t)) {
                violations.push(
                    `the active layer must NOT animate opacity (AW.W2 clip-reveal: it is statically opacity:1, REVEALED by the aperture). The opacity transition arm must be deleted: \`${t}\``,
                );
            }
            // The active layer must show IMMEDIATELY (`visibility 0s`, no deferred delay) — the :434 rule.
            if (!/visibility\s+0s\s*(?:,|$)/.test(t)) {
                violations.push(
                    `the active layer visibility must stay IMMEDIATE (\`visibility 0s\`, no deferred delay) per the :434 governing rule: \`${t}\``,
                );
            }
        }
    }

    // (leaving, AW.W2) — the leaving pane is the SOLE surviving opacity animation
    // (the thin polish). It carries no own `transition` (it inherits the base
    // rule's `opacity var(--dock-motion-resize)`), so the lockstep anchor is the
    // base rule above. Assert the leaving-pane rule EXISTS and is opacity:0 +
    // painted (visibility:visible) so the base-rule fade actually runs on it.
    const leavingBody = matchRuleBody(
        dockCss,
        /\.dock-layer-item-host\.is-leaving\s*\{/,
    );
    if (leavingBody === null) {
        violations.push(
            "dock.css: the `.dock-layer-item-host.is-leaving` rule is missing — the leaving-pane fade (the sole opacity animation under clip-reveal) is gone",
        );
    } else {
        facts.leavingFadesOnBaseToken = /opacity\s+var\(--dock-motion-resize\)/.test(
            transitionValue(baseBody) ?? "",
        );
        if (/opacity\s*:\s*0/.test(leavingBody) === false) {
            violations.push(
                "the leaving pane must target opacity:0 (it fades out as the aperture reveals the active content)",
            );
        }
    }

    // AW.W2 lockstep = the morph rides --dock-motion-resize AND the leaving fade
    // (the base-rule opacity transition the leaving pane inherits) names it too,
    // AND the active pane has NO opacity transition (it is revealed, not faded).
    facts.lockstep =
        morphUsesResize &&
        baseBody !== null &&
        /opacity\s+var\(--dock-motion-resize\)/.test(transitionValue(baseBody) ?? "") &&
        activeBody !== null &&
        !/opacity\s+var\(/.test(transitionValue(activeBody) ?? "");

    return { facts, violations };
}

export function detectSource(dockCss) {
    return detectLockstep(stripBlockComments(dockCss ?? ""));
}

function run() {
    const { ROOT, DOCK_CSS, ARTIFACT } = cliPaths();
    const { facts, violations } = detectSource(readFileSync(DOCK_CSS, "utf8"));
    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "structure",
        sourceOfTruth: "proof:dock-animation-live",
        command: "npm run proof:dock-opacity-lockstep",
        facts,
        violations,
    });

    console.log(
        "proof:dock-opacity-lockstep — the dock fade↔morph lockstep static gate (AU.W2)",
    );
    console.log(`  container morph token     : ${facts.containerMorphToken}`);
    console.log(`  base layer transition     : ${facts.baseTransition ?? "(missing)"}`);
    console.log(
        `  active layer transition   : ${facts.activeTransition ?? "(missing)"}`,
    );
    console.log(
        `  fade↔morph lockstep (one token) : ${facts.lockstep ? "YES" : "NO"}`,
    );
    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
