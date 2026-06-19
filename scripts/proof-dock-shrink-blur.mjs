#!/usr/bin/env node
// proof:dock-shrink-blur — BC.W-DOCK-SHRINK-BLUR — the shrunken dock is CRISP, not a
// blurry mess (gate the resting self-blur to the morph transient only).
//
// At HEAD the bare `.glass-dock` carried `--dock-reveal-blur: 3px` + a `filter: blur()`
// keyed off `--dock-expand-t`, which AT REST resolves to the class endpoint (0
// collapsed) → blur(3px) — a PERMANENT 3px self-blur on a resting collapsed dock,
// stacked on the 9px backdrop blur (the "blurry mess when shrunken" defect,
// glass-dock-codebase.md §2.4). The FIX gates the self-blur to `[data-morphing]`: at
// REST (no `[data-morphing]`) the dock's own pixels are CRISP; ONLY mid-morph does the
// 3px decongest bloom (the iOS-27 materialization, preserved as the gesture-only
// effect). The backdrop blur (`--glass-blur-dock-radius: 9px`, the glass material) is
// UNTOUCHED.
//
// The device-free SOURCE/MECHANISM arm (tags ["local","ci","release"]). The PAINT arm
// is the ORCHESTRATOR's: the before/after composited screenshot of the COLLAPSED dock
// on /dock/overview (crisp pill, sharp glyph + edges) + a mid-morph capture (the
// decongest bloom IS present), captured to
// docs/tranches/BC/audit/visual/W-DOCK-SHRINK-BLUR-DELTA.md.
//
// THE CARDINAL SPLIT this gate validates born-RED→GREEN itself (the SOURCE arm):
//   S1 — resting self-blur zero: the bare `.glass-dock` rule resolves --dock-reveal-blur
//        to 0 (or carries no resting `filter: blur()` on its own pixels). Born-RED on
//        HEAD's bare `.glass-dock { --dock-reveal-blur: 3px; filter: blur(...) }`.
//        Self-test bite: a planted bare `.glass-dock { --dock-reveal-blur: 3px }` reds.
//   S2 — the decongest is morph-gated: the 3px + `filter: blur(...)` decongest lives
//        ONLY under `.glass-dock[data-morphing]`. Born-RED: HEAD keys it off the bare
//        `.glass-dock`. Self-test bite: a decongest blur on the bare `.glass-dock` reds.
//   S3 — the backdrop blur untouched: `--glass-blur-dock-radius: 9px` byte-unchanged
//        (the glass material). Self-test bite: a planted edit reds.
//   S4 — the PRM carve preserved: the PRM block zeroes the self-blur under reduce.
//
// Run: node scripts/proof-dock-shrink-blur.mjs

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:dock-shrink-blur";

const stripCss = (s) =>
    s.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
const readRel = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

const MORPH_CSS = "src/styles/dock/morph.css";
const GLASS_TOKENS = "src/styles/tokens/glass.css";

// Parse top-level rule blocks: { selector, body, line }.
function parseRules(source) {
    const out = [];
    const re = /([^{}]+)\{([^{}]*)\}/g;
    let m;
    while ((m = re.exec(source)) !== null) {
        out.push({
            selector: m[1].trim().replace(/\s+/g, " "),
            body: m[2],
            line: source.slice(0, m.index).split("\n").length,
        });
    }
    return out;
}

// A rule sets the decongest blur if its body sets `--dock-reveal-blur` to a non-zero
// length OR carries a `filter: blur()` on the dock's own pixels.
const setsRevealBlurNonZero = (body) => {
    const m = /--dock-reveal-blur:\s*([^;]+)/.exec(body);
    if (!m) return false;
    const v = m[1].trim();
    // zero (0, 0px, 0rem, etc.) is the resting-crisp value; anything else is a blur.
    return !/^0(px|rem|em)?$/.test(v);
};
const hasOwnPixelFilterBlur = (body) => /filter:\s*blur\(/.test(body);
// Is the selector the BARE resting `.glass-dock` (no [data-morphing] / no PRM media)?
const isBareGlassDock = (selector) =>
    /(^|[\s,])\.glass-dock(\s|$|,)/.test(selector) &&
    !selector.includes("[data-morphing]");
const isMorphingScope = (selector) => selector.includes("[data-morphing]");

// ── S1 — resting self-blur zero (the bare .glass-dock is crisp) ──
// ── S2 — the decongest is morph-gated ([data-morphing] only) ──
export function detectS1S2() {
    const violations = [];
    const facts = { restingBlurRules: [], morphingBlurRules: [] };
    // Scan ONLY the cascade body (exclude the @media PRM block, which legitimately sets
    // --dock-reveal-blur: 0 on the bare .glass-dock — that is the crisp value, S4).
    const src = stripCss(readRel(MORPH_CSS));
    // Drop the @media (prefers-reduced-motion) block from the cascade-body scan.
    const cascadeBody = src.replace(/@media[^{]*prefers-reduced-motion[^{]*\{[\s\S]*?\}\s*\}/g, (m) => m.replace(/[^\n]/g, " "));

    for (const rule of parseRules(cascadeBody)) {
        const blurNonZero = setsRevealBlurNonZero(rule.body);
        const filterBlur = hasOwnPixelFilterBlur(rule.body);
        if (!blurNonZero && !filterBlur) continue;
        const entry = `${rule.selector.slice(0, 50)} @${rule.line}`;
        if (isBareGlassDock(rule.selector) && !isMorphingScope(rule.selector)) {
            facts.restingBlurRules.push(entry);
            // S1: a bare resting .glass-dock carrying a non-zero --dock-reveal-blur or a
            // filter: blur() is the permanent self-blur (the blurry mess at rest).
            if (blurNonZero)
                violations.push(
                    `S1: ${MORPH_CSS}:${rule.line} — the bare resting \`.glass-dock\` sets --dock-reveal-blur to a non-zero blur (\`${rule.selector.slice(0, 40)}\`) — a permanent self-blur on the resting collapsed dock (the blurry mess)`,
                );
            if (filterBlur)
                violations.push(
                    `S2: ${MORPH_CSS}:${rule.line} — the bare resting \`.glass-dock\` carries a \`filter: blur()\` on its own pixels — the decongest is not morph-gated (it must live ONLY under [data-morphing])`,
                );
        } else if (isMorphingScope(rule.selector)) {
            facts.morphingBlurRules.push(entry);
        }
    }
    // S2 positive: the decongest DOES live under [data-morphing] (the transient is
    // present, not removed entirely — the bloom-from-source identity is intact).
    facts.morphGatedPresent = facts.morphingBlurRules.length > 0;
    if (!facts.morphGatedPresent)
        violations.push(
            "S2: no decongest blur under `.glass-dock[data-morphing]` — the iOS-27 materialization bloom was removed entirely, not re-gated (the transient must survive mid-morph)",
        );
    // S1 positive: the bare .glass-dock resting rule explicitly resolves the self-blur
    // to zero (the crisp-at-rest contract is stated, not merely absent).
    facts.restingZeroStated = /\.glass-dock\s*\{[^}]*--dock-reveal-blur:\s*0/.test(cascadeBody);
    if (!facts.restingZeroStated)
        violations.push(
            "S1: the bare resting `.glass-dock` does not state `--dock-reveal-blur: 0` — the crisp-at-rest contract is not explicit",
        );
    return { violations, facts };
}
// S1/S2 self-test bite — a planted bare `.glass-dock { --dock-reveal-blur: 3px; filter:
// blur(...) }` MUST flag; the morph-gated `.glass-dock[data-morphing] { ... }` MUST NOT.
function detectS1S2SelfTest() {
    const BARE_BAD = `.glass-dock { --dock-reveal-blur: 3px; filter: blur(calc(var(--dock-reveal-blur) * 1)); }`;
    const GATED_GOOD = `.glass-dock[data-morphing] { --dock-reveal-blur: 3px; filter: blur(calc(var(--dock-reveal-blur) * 1)); }`;
    const bareFlags = (s) =>
        parseRules(s).some(
            (r) =>
                isBareGlassDock(r.selector) &&
                !isMorphingScope(r.selector) &&
                (setsRevealBlurNonZero(r.body) || hasOwnPixelFilterBlur(r.body)),
        );
    return bareFlags(BARE_BAD) === true && bareFlags(GATED_GOOD) === false;
}

// ── S3 — the backdrop blur untouched (--glass-blur-dock-radius: 9px byte-frozen) ──
export function detectS3() {
    const violations = [];
    const facts = {};
    const glass = readRel(GLASS_TOKENS);
    const m = /--glass-blur-dock-radius:\s*([^;]+);/.exec(glass);
    facts.backdropBlur = m ? m[1].trim() : null;
    // The wave touches ONLY the own-pixel self-blur; the backdrop (glass material) is 9px.
    facts.unchanged = facts.backdropBlur === "9px";
    if (!facts.unchanged)
        violations.push(
            `S3: --glass-blur-dock-radius is not the byte-frozen 9px (found ${facts.backdropBlur ?? "absent"}) — the wave touched the backdrop blur (the glass material), which is fenced`,
        );
    return { violations, facts };
}
// S3 self-test bite — a planted edit MUST flag.
function detectS3SelfTest() {
    const PLANTED = `--glass-blur-dock-radius: 12px;`;
    const m = /--glass-blur-dock-radius:\s*([^;]+);/.exec(PLANTED);
    return Boolean(m) && m[1].trim() !== "9px";
}

// ── S4 — the PRM carve preserved (the self-blur zeroed under reduce) ──
export function detectS4() {
    const violations = [];
    const facts = {};
    const src = stripCss(readRel(MORPH_CSS));
    const prmBlock = /@media[^{]*prefers-reduced-motion:\s*reduce[^{]*\{([\s\S]*?\}\s*)\}/.exec(src);
    facts.prmBlockPresent = Boolean(prmBlock);
    facts.prmZeroesSelfBlur =
        prmBlock != null && /--dock-reveal-blur:\s*0/.test(prmBlock[1]);
    if (!facts.prmZeroesSelfBlur)
        violations.push(
            "S4: the PRM (@media prefers-reduced-motion: reduce) block does not zero --dock-reveal-blur — the reduced-motion crisp-at-every-state carve regressed",
        );
    return { violations, facts };
}

// ── compose ──
export function detect() {
    const s1s2 = detectS1S2();
    const s3 = detectS3();
    const s4 = detectS4();
    const selfTests = {
        s1s2: detectS1S2SelfTest(),
        s3: detectS3SelfTest(),
    };
    const selfTestViolations = [];
    for (const [k, ok] of Object.entries(selfTests)) {
        if (!ok)
            selfTestViolations.push(
                `${k.toUpperCase()} self-test bite BROKE — the detector does not bite its planted ${k} fixture`,
            );
    }
    const violations = [
        ...s1s2.violations,
        ...s3.violations,
        ...s4.violations,
        ...selfTestViolations,
    ];
    return {
        violations,
        facts: { s1s2: s1s2.facts, s3: s3.facts, s4: s4.facts, selfTests },
    };
}

function run() {
    const { violations, facts } = detect();
    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath("GLASS_UI_DOCK_SHRINK_BLUR_ARTIFACT", "BC-dock-shrink-blur");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:dock-shrink-blur",
        command: COMMAND,
        note: "BC.W-DOCK-SHRINK-BLUR device-free SOURCE arm (S1 resting self-blur zero — the bare .glass-dock is crisp · S2 the decongest is morph-gated — the 3px bloom lives ONLY under [data-morphing] · S3 the backdrop blur --glass-blur-dock-radius:9px byte-untouched, the glass material · S4 the PRM carve zeroes the self-blur under reduce). The PAINT arm (the crisp collapsed pill before/after + the mid-morph bloom-present capture) is the orchestrator's W-DOCK-SHRINK-BLUR-DELTA.",
        facts,
        violations,
    });
    console.log(`proof:dock-shrink-blur — ${status.toUpperCase()}`);
    console.log(`  S1 resting-zero-stated=${facts.s1s2.restingZeroStated} resting-blur-rules=${facts.s1s2.restingBlurRules.length}`);
    console.log(`  S2 morph-gated-present=${facts.s1s2.morphGatedPresent} morphing-blur-rules=${facts.s1s2.morphingBlurRules.length}`);
    console.log(`  S3 backdrop-blur=${facts.s3.backdropBlur} unchanged=${facts.s3.unchanged}`);
    console.log(`  S4 prm-zeroes-self-blur=${facts.s4.prmZeroesSelfBlur}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    } else {
        console.log(`  artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    }
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
