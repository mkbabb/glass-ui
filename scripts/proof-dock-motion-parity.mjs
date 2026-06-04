#!/usr/bin/env node
// AT.W6-dock-c — the dock VT/FLIP motion-parity static gate.
//
// AQ.W6 forked the dock layer-swap resize morph into two engine paths that ran
// DIFFERENT timing curves, so an identity morph FELT different per engine:
//   - the native View-Transition path  → `::view-transition-group(.gl-dock-layer)`
//     `animation-timing-function: var(--vt-ease …)` (the apple-spring
//     cubic-bezier(.175,.885,.32,1.275) — ~+27.5% overshoot, no settle);
//   - the JS FLIP fallback             → a CSS `transition` keyed off
//     `--dock-motion-resize`, whose easing was `--spring-snappy` (a settling
//     `linear()`).
//
// AT.W6-dock-c reconciles them onto ONE source curve, minted once as
// `--dock-resize-spring` (= the `--spring-snappy` linear()). A `linear()` is
// valid as BOTH a CSS transition timing-function AND a `::view-transition-group`
// animation-timing-function, so the SAME curve drives both engines.
//
// This gate is the STATIC half of `proof:dock-motion-parity` (the runtime
// concurrency half — the `isTransitioning` A→B→A no-skip/no-queue contract — is
// `src/components/custom/dock/__tests__/GlassDock.motion-parity.test.ts`, run by
// `npm run test`). It asserts, by a comment-stripped grep over the CSS substrate:
//
//   PARITY  — the dock VT group's `animation-timing-function` resolves to the
//             SAME source token as the FLIP `--dock-motion-resize` easing
//             (`--dock-resize-spring`). One curve, both engines.
//   NO-FORK — the dock VT group no longer pins the divergent `--vt-ease`
//             (the apple-spring overshoot). The general `.gl-list-item` recipe
//             may still default to `--vt-ease`; only the dock group is re-pointed.
//   SOURCE  — `--dock-resize-spring` is minted, and to the snappy spring (the
//             settling linear()), not the apple-spring overshoot.
//   GUARD   — the runtime driver (`GlassDock.vue`) carries the morph-generation
//             concurrency guard that the A→B→A runtime test exercises, so the
//             static gate and the runtime gate cannot silently drift apart.
//
// House style mirrors scripts/proof-vt-names.mjs: ESM .mjs, comment-strip first
// (the AP.W4 false-witness discipline), emit a byte-stable JSON artefact via
// gate-output, print a human summary, process.exit(1) on any violation
// (fail-closed). The pure detectors are exported for the unit spec; the CLI
// paths resolve lazily so importing the module never runs FS/url side effects.

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
        VT_CSS: resolve(ROOT, "src/styles/view-transition.css"),
        DOCK_CSS: resolve(ROOT, "src/styles/dock.css"),
        TOKENS_CSS: resolve(ROOT, "src/styles/tokens.css"),
        DOCK_VUE: resolve(ROOT, "src/components/custom/dock/GlassDock.vue"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_DOCK_MOTION_PARITY_ARTIFACT",
            "AT-dock-motion-parity",
        ),
    };
    return _cliPaths;
}

// ---------------------------------------------------------------------------
// Comment-strip — CSS block comments → spaces (newlines preserved). A doc-block
// that MENTIONS `--vt-ease` next to the dock group must not register as a real
// declaration (the false-witness discipline). For the .vue driver we only need
// the script body, so we strip both block + line comments there.
// ---------------------------------------------------------------------------
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

function stripLineComments(text) {
    return text
        .split("\n")
        .map((line) => {
            const idx = line.indexOf("//");
            return idx === -1 ? line : line.slice(0, idx);
        })
        .join("\n");
}

// ---------------------------------------------------------------------------
// Extract the declaration body of the FIRST rule whose selector text contains
// `selectorNeedle`. Returns the `{ … }` body (comment-stripped), or null.
// ---------------------------------------------------------------------------
function ruleBody(css, selectorNeedle) {
    const idx = css.indexOf(selectorNeedle);
    if (idx === -1) return null;
    const open = css.indexOf("{", idx);
    if (open === -1) return null;
    const close = css.indexOf("}", open);
    if (close === -1) return null;
    return css.slice(open + 1, close);
}

// Read a single `prop: value;` declaration's value from a rule body.
function declValue(body, prop) {
    const re = new RegExp(`(?:^|[;{\\s])${prop}\\s*:\\s*([^;}]+)`, "m");
    const m = body.match(re);
    return m ? m[1].trim() : null;
}

// ---------------------------------------------------------------------------
// The pure detector. Takes the four comment-stripped sources, returns
// { facts, violations }. Exported so the unit spec can drive it FS-free.
// ---------------------------------------------------------------------------
export function detectParity({ vtCss, dockCss, tokensCss, dockVue }) {
    const violations = [];
    const facts = {};

    // ── PARITY + NO-FORK: the dock VT group's animation-timing-function.
    const vtGroupBody = ruleBody(vtCss, "::view-transition-group(.gl-dock-layer)");
    if (vtGroupBody === null) {
        violations.push(
            "view-transition.css: no `::view-transition-group(.gl-dock-layer)` rule found — the dock VT recipe is missing",
        );
    } else {
        const vtTiming = declValue(vtGroupBody, "animation-timing-function");
        facts.vtTiming = vtTiming;
        if (vtTiming === null) {
            violations.push(
                "the .gl-dock-layer VT group declares no `animation-timing-function`",
            );
        } else {
            // PARITY: must reference --dock-resize-spring (the shared source).
            if (!/--dock-resize-spring\b/.test(vtTiming)) {
                violations.push(
                    `the dock VT timing-fn must consume --dock-resize-spring (the shared FLIP source), got: \`${vtTiming}\``,
                );
            }
            // NO-FORK: the divergent --vt-ease must NOT drive the dock group.
            if (/--vt-ease\b/.test(vtTiming)) {
                violations.push(
                    `the dock VT timing-fn still pins the divergent --vt-ease (the apple-spring overshoot) — it must use --dock-resize-spring: \`${vtTiming}\``,
                );
            }
        }
    }

    // ── PARITY (the FLIP side): --dock-motion-resize's easing is the same token.
    const dockMotionResize = declValue(dockCss, "--dock-motion-resize");
    facts.dockMotionResize = dockMotionResize;
    if (dockMotionResize === null) {
        violations.push("dock.css: no `--dock-motion-resize` declaration found");
    } else if (!/--dock-resize-spring\b/.test(dockMotionResize)) {
        violations.push(
            `--dock-motion-resize (the FLIP easing) must consume --dock-resize-spring, got: \`${dockMotionResize}\``,
        );
    }

    // ── THE ONE-GREP PARITY: the VT timing-fn token ≡ the FLIP easing token.
    // Both must resolve to the SAME source identifier (--dock-resize-spring).
    if (
        facts.vtTiming &&
        facts.dockMotionResize &&
        /--dock-resize-spring\b/.test(facts.vtTiming) &&
        /--dock-resize-spring\b/.test(facts.dockMotionResize)
    ) {
        facts.parity = true;
    } else {
        facts.parity = false;
    }

    // ── SOURCE: --dock-resize-spring is minted to the settling snappy spring,
    // NOT the apple-spring overshoot.
    const springDecl = declValue(tokensCss, "--dock-resize-spring");
    facts.dockResizeSpring = springDecl;
    if (springDecl === null) {
        violations.push(
            "tokens.css: --dock-resize-spring is not minted — the shared source curve is missing",
        );
    } else if (!/--spring-snappy\b/.test(springDecl)) {
        violations.push(
            `--dock-resize-spring must be the settling snappy spring (var(--spring-snappy)), got: \`${springDecl}\``,
        );
    } else if (/apple-spring/.test(springDecl)) {
        violations.push(
            `--dock-resize-spring must NOT be the apple-spring overshoot, got: \`${springDecl}\``,
        );
    }

    // ── GUARD: the runtime driver carries the morph-generation concurrency
    // guard the A→B→A runtime test exercises — so the static parity gate and the
    // runtime concurrency gate cannot drift apart (a refactor that drops the
    // generation guard fails HERE too, not only in vitest).
    const hasGenerationGuard =
        /morphGeneration/.test(dockVue) &&
        /\+\+morphGeneration/.test(dockVue) &&
        /generation\s*!==\s*morphGeneration/.test(dockVue);
    facts.hasGenerationGuard = hasGenerationGuard;
    if (!hasGenerationGuard) {
        violations.push(
            "GlassDock.vue: the `morphGeneration` concurrency guard is absent — isTransitioning can skip-fast-forward / stale-clear on a rapid A→B→A re-trigger",
        );
    }

    return { facts, violations };
}

// FS-free convenience for the spec: strip + detect over in-memory sources.
export function detectSource(sources) {
    return detectParity({
        vtCss: stripBlockComments(sources.vtCss ?? ""),
        dockCss: stripBlockComments(sources.dockCss ?? ""),
        tokensCss: stripBlockComments(sources.tokensCss ?? ""),
        dockVue: stripLineComments(stripBlockComments(sources.dockVue ?? "")),
    });
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------
function run() {
    const { ROOT, VT_CSS, DOCK_CSS, TOKENS_CSS, DOCK_VUE, ARTIFACT } = cliPaths();

    const { facts, violations } = detectSource({
        vtCss: readFileSync(VT_CSS, "utf8"),
        dockCss: readFileSync(DOCK_CSS, "utf8"),
        tokensCss: readFileSync(TOKENS_CSS, "utf8"),
        dockVue: readFileSync(DOCK_VUE, "utf8"),
    });

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:dock-motion-parity",
        facts,
        violations,
    });

    console.log("proof:dock-motion-parity — dock VT/FLIP timing-parity static gate (AT.W6-dock-c)");
    console.log(`  dock VT timing-fn  : ${facts.vtTiming ?? "(missing)"}`);
    console.log(`  FLIP --dock-motion-resize : ${facts.dockMotionResize ?? "(missing)"}`);
    console.log(`  --dock-resize-spring : ${facts.dockResizeSpring ?? "(missing)"}`);
    console.log(`  one-grep parity (VT ≡ FLIP source) : ${facts.parity ? "YES" : "NO"}`);
    console.log(`  morph-generation concurrency guard : ${facts.hasGenerationGuard ? "present" : "ABSENT"}`);
    if (violations.length > 0) {
        console.log("");
        console.log("VIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log("");
    console.log(`  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);

    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
