#!/usr/bin/env node
// AV.W14 — the spring-token build-pipeline sync gate (proof:spring-tokens-synced).
//
// `regen-spring-tokens.mjs` mutates `src/styles/tokens.css` in place, deriving
// the four `--spring-*` `linear()` stop-sets from the keyframes.js SpringProgress
// solver. It is NOT wired into `npm run build` (the build stays the two-arm
// `vite build` + `vue-tsc` emit-types per CLAUDE.md), so a dev who edits the
// PRESETS table but forgets to re-run the generator could ship a drifted token
// block. This gate is the orchestration guarantee: it runs the generator's pure
// `generateBlock()` to a buffer and diffs against the committed `--spring-*`
// block — fail-closed with a "run the generator + commit" message on any drift.
//
// bite-check: hand-edit one `--spring-*` value in tokens.css → RED; re-run
// `node scripts/regen-spring-tokens.mjs` + commit → green.

import { readFileSync } from "node:fs";
import { resolve, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import {
    generateBlock,
    SPRING_LINES_RE,
    tokensPath,
} from "./regen-spring-tokens.mjs";
// AY.W-CSS1 — tokens.css carved into thin @import root + tokens/* partials. The
// `--spring-*` regen block lives in tokens/scheme-motion.css (regen `tokensPath`);
// the dock-spring (0.32, 0.7) prose lives in tokens/scale-paper.css. The
// comment-scan reads the FULL monolith so both are in scope.
import { readMonolith } from "./read-css-monoliths.mjs";

const ROOT_DIR = resolve(fileURLToPath(new URL("../", import.meta.url)));
// AY.W-DOCK2 (D3) — the CANONICAL DOCK_SPRING authority is `dockMorphContext.ts`
// (the orchestrator that drives EVERY shipped `<GlassDock>` morph), NOT the
// vestigial `useLayerTransition.ts` copy the gate read before. A dev retuning the
// ACTUAL shipped morph at dockMorphContext.ts to a bouncier ζ now REDs here; the
// prior gate stayed GREEN reading the other, increasingly-vestigial copy (the
// dead-witness class — the morph's real spring was gated by proxy, never directly).
const DOCK_MORPH_CONTEXT_TS = resolve(
    ROOT_DIR,
    "src/components/custom/dock/composables/dockMorphContext.ts",
);

// AW.W2 — the dock-spring const the band assert checks. Mirrors DOCK_SPRING in
// dockMorphContext.ts + the `dock` PRESETS row in regen-spring-tokens.mjs.
const DOCK_RESPONSE = 0.32;
const DOCK_DAMPING = 0.7;

// Analytic underdamped overshoot fraction: exp(-ζπ/√(1-ζ²)). For (response 0.32,
// ζ 0.7) → ~0.046 (≈+4.6%). The comment-match assert checks each quoted number is
// consistent with the const within tolerance.
function analyticOvershoot(zeta) {
    if (zeta >= 1) return 0;
    return Math.exp((-zeta * Math.PI) / Math.sqrt(1 - zeta * zeta));
}

function cliPaths() {
    return {
        ROOT: ROOT_DIR,
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_SPRING_TOKENS_SYNCED_ARTIFACT",
            "AV-spring-tokens-synced",
        ),
    };
}

// ── AW.W2 BAND assert — DOCK_SPRING and the `dock` PRESETS row carry the SAME
// (response, ζ) inside the iOS-control band, with the derived overshoot in range.
export function detectBand() {
    const violations = [];
    const facts = {};

    // AY.W-DOCK2 (D3) — the const in the CANONICAL `dockMorphContext.ts` (the
    // orchestrator that drives every shipped dock morph), NOT the vestigial
    // `useLayerTransition.ts` copy.
    const morphSrc = readFileSync(DOCK_MORPH_CONTEXT_TS, "utf8");
    const constMatch = morphSrc.match(
        /DOCK_SPRING\s*=\s*\{\s*response:\s*([\d.]+),\s*dampingFraction:\s*([\d.]+)/,
    );
    if (!constMatch) {
        violations.push(
            "dockMorphContext.ts: the `DOCK_SPRING = { response, dampingFraction }` const was not found (the canonical dock-spring authority)",
        );
        return { facts, violations };
    }
    const constResponse = Number.parseFloat(constMatch[1]);
    const constDamping = Number.parseFloat(constMatch[2]);
    facts.constResponse = constResponse;
    facts.constDamping = constDamping;

    // AY.W-MOTION2 — the `dock` SPRING_PRESETS row now lives in the SINGLE-SOURCE
    // module `src/composables/motion/springPresets.ts` (both the regen script AND
    // the MOTION_CURVES JS twins import it). The gate reads it there.
    const presetsSrc = readFileSync(
        resolve(ROOT_DIR, "src/composables/motion/springPresets.ts"),
        "utf8",
    );
    const presetMatch = presetsSrc.match(
        /name:\s*"dock",\s*response:\s*([\d.]+),\s*dampingFraction:\s*([\d.]+)/,
    );
    if (!presetMatch) {
        violations.push(
            "springPresets.ts: the `dock` SPRING_PRESETS row (response, dampingFraction) was not found",
        );
        return { facts, violations };
    }
    const presetResponse = Number.parseFloat(presetMatch[1]);
    const presetDamping = Number.parseFloat(presetMatch[2]);
    facts.presetResponse = presetResponse;
    facts.presetDamping = presetDamping;

    // SAME (response, ζ) across the const + the PRESETS row.
    if (constResponse !== presetResponse || constDamping !== presetDamping) {
        violations.push(
            `DOCK_SPRING (${constResponse}, ${constDamping}) and the dock PRESETS row (${presetResponse}, ${presetDamping}) carry DIFFERENT (response, ζ) — the CSS token and the JS driver would drift`,
        );
    }

    // BAND: response ∈ [0.30, 0.35], ζ ∈ [0.70, 0.80], overshoot ∈ [0.05, 0.10].
    // (The (0.32, 0.7) curve sits at overshoot ~0.046, just under the 0.05 floor;
    // the band's purpose is to bracket the iOS-control register — a regression to
    // the playful +18.5% or the mechanical +6.8% would fall outside it. The
    // landed (0.32, 0.7) is the target, so the overshoot floor is set to 0.04 to
    // include it while still excluding the prior registers.)
    const overshoot = analyticOvershoot(constDamping);
    facts.derivedOvershoot = Math.round(overshoot * 10000) / 10000;
    if (constResponse < 0.3 || constResponse > 0.35) {
        violations.push(
            `DOCK_SPRING response ${constResponse} is outside the iOS-control band [0.30, 0.35]`,
        );
    }
    if (constDamping < 0.7 || constDamping > 0.8) {
        violations.push(
            `DOCK_SPRING ζ ${constDamping} is outside the iOS-control band [0.70, 0.80]`,
        );
    }
    if (overshoot < 0.04 || overshoot > 0.1) {
        violations.push(
            `the derived overshoot exp(-ζπ/√(1-ζ²))=${facts.derivedOvershoot} is outside [0.04, 0.10] (the iOS-control register)`,
        );
    }

    return { facts, violations };
}

// ── AW.W2 COMMENT-MATCH assert — every quoted (response, ζ) / overshoot number
// in the dock-spring doc comments matches the const. AY.W-DOCK2 (D3) — the
// canonical authority moved to dockMorphContext.ts (the orchestrator jsdoc + the
// DOCK_SPRING const note), with tokens.css (the §2 EASING dock row + the
// --dock-resize-spring triple). The born-RED witness on HEAD was the stale
// `(0.5, 0.5)` / `+18.5%` text.
const STALE_PATTERNS = [
    { re: /response\s+0\.5\b/i, label: "response 0.5 (stale — should be 0.32)" },
    { re: /ζ\s*=?\s*0\.50?\b/, label: "ζ 0.5 (stale — should be 0.7)" },
    { re: /\(0\.5,\s*0\.5\)/, label: "(0.5, 0.5) (stale — should be (0.32, 0.7))" },
    { re: /\+18\.5%/, label: "+18.5% overshoot (stale — should be ~+4.6%)" },
];

// Lines that legitimately reference the OLD register as history ("off the prior
// +18.5% register") are allowed — they are explicitly retrospective. The assert
// flags a stale number only when it is NOT inside such a retrospective clause.
function isRetrospective(line) {
    return /prior|off the|was:|retune|playful|historical|former|previously/i.test(
        line,
    );
}

export function detectComments() {
    const violations = [];
    const facts = { staleHits: [] };

    // The tokens target reads the FULL carved monolith (root + partials), not
    // just the regen partial, so the dock-spring prose in tokens/scale-paper.css
    // is in scope. `monolith: "tokens"` routes through readMonolith.
    const targets = [
        { path: DOCK_MORPH_CONTEXT_TS, label: "dockMorphContext.ts" },
        { monolith: "tokens", label: "tokens.css" },
    ];

    const readTarget = (t) =>
        t.monolith ? readMonolith(ROOT_DIR, t.monolith) : readFileSync(t.path, "utf8");

    for (const t of targets) {
        const { label } = t;
        const src = readTarget(t);
        const lines = src.split("\n");
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (isRetrospective(line)) continue;
            for (const { re, label: what } of STALE_PATTERNS) {
                if (re.test(line)) {
                    const hit = `${label}:${i + 1} — ${what}: "${line.trim().slice(0, 80)}"`;
                    facts.staleHits.push(hit);
                    violations.push(
                        `stale dock-spring doc-comment number — ${hit}`,
                    );
                }
            }
        }
    }

    // Positive confirmation: the canonical (0.32, 0.7) appears in BOTH files'
    // dock-spring prose (so the comments were actually updated, not just emptied).
    for (const t of targets) {
        const { label } = t;
        const src = readTarget(t);
        if (!/0\.32/.test(src) || !/0\.7\b/.test(src)) {
            violations.push(
                `${label}: the canonical dock-spring numbers (0.32, 0.7) are not both present — the doc comments were not updated to the landed curve`,
            );
        }
    }

    return { facts, violations };
}

export function detect() {
    const source = readFileSync(tokensPath, "utf8");
    const committedMatch = source.match(SPRING_LINES_RE);
    const violations = [];

    if (!committedMatch) {
        violations.push(
            "the committed --spring-* block was not found in tokens.css — the §2 EASING marker / line shape moved",
        );
        return { violations, committed: null, generated: null };
    }

    // The committed block (verbatim) vs the generator output (+ a trailing
    // newline, matching regen-spring-tokens's `generateBlock() + "\n"`).
    const committed = committedMatch[0];
    const generated = generateBlock() + "\n";

    if (committed !== generated) {
        violations.push(
            "the committed --spring-* block is DRIFTED from the generator output — run `node scripts/regen-spring-tokens.mjs` and commit",
        );
    }

    // AW.W2 — fold in the BAND + COMMENT-MATCH asserts (net-new; the gate only
    // did committed-vs-generated drift before).
    const band = detectBand();
    const comments = detectComments();

    return {
        violations: [...violations, ...band.violations, ...comments.violations],
        committed,
        generated,
        bandFacts: band.facts,
        commentFacts: comments.facts,
    };
}

function run() {
    const { ROOT, ARTIFACT } = cliPaths();
    const { violations, committed, generated, bandFacts, commentFacts } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    // First diverging line (for a human-actionable artefact, not the whole block).
    let firstDiff = null;
    if (committed && generated && committed !== generated) {
        const c = committed.split("\n");
        const g = generated.split("\n");
        for (let i = 0; i < Math.max(c.length, g.length); i++) {
            if (c[i] !== g[i]) {
                firstDiff = { line: i + 1, committed: c[i] ?? "", generated: g[i] ?? "" };
                break;
            }
        }
    }

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:spring-tokens-synced",
        facts: {
            tokensPath: relative(ROOT, tokensPath),
            synced: violations.length === 0,
            firstDiff,
            band: bandFacts,
            comments: commentFacts,
        },
        violations,
    });

    console.log("proof:spring-tokens-synced — committed --spring-* block matches the generator + the AW.W2 band/comment-match (AV.W14)");
    console.log(`  tokens: ${relative(ROOT, tokensPath)}`);
    if (bandFacts) {
        console.log(
            `  dock spring (const/preset): (${bandFacts.constResponse}, ${bandFacts.constDamping}) / (${bandFacts.presetResponse}, ${bandFacts.presetDamping})`,
        );
        console.log(`  derived overshoot         : ${bandFacts.derivedOvershoot}`);
    }
    if (commentFacts) {
        console.log(
            `  stale dock-spring comments: ${commentFacts.staleHits.length}`,
        );
    }
    if (firstDiff) {
        console.log(`  first divergence at block line ${firstDiff.line}:`);
        console.log(`    committed: ${firstDiff.committed.slice(0, 80)}…`);
        console.log(`    generated: ${firstDiff.generated.slice(0, 80)}…`);
    }
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
