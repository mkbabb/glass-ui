#!/usr/bin/env node
// BB.W-PHASE-PALETTE — the chassis `complete`-phase ink is a CONSUMER token, not
// a hardcoded brand metal (proof:phase-palette).
//
// The born-RED→GREEN device-free SOURCE arm for the N18 demotion. The four
// active phases (ping/download/upload/jitter) already read a consumer-
// registerable `--chart-{phase}` with a library `--viz-*` fallback (the bus
// carries phase IDENTITY); `complete` was the ONE arm that pinned the library's
// gold DIRECTLY (`--phase-color: var(--color-gold)`), so every completion gilded
// itself the moment the phase flipped — gold leaked onto the survey / thank-you /
// routine-finish, when gold is meant to be the EARNED garnish (the dock CTA +
// personal-best). This wave demotes `complete` onto a `--phase-complete-color`
// consumer token that DEFAULTS to gold (the back-compat floor: an un-overriding
// consumer paints byte-identical gold) — so the consumer chooses the completion
// ink (its phase spectrum, an aurora register, or the default gold).
//
// Four falsifiable SOURCE witnesses (each born-RED at HEAD pre-wave, GREEN at
// close), plus the binding π readback (W-PHASE-PALETTE-DELTA — an un-overriding
// chassis paints gold complete byte-identical; a `--phase-complete-color`-
// overriding host paints the consumer ink, BOTH modes) + the proof:ba-gestalt
// chassis/data-band verdict:
//
//   W1 — THE COMPLETE ARM READS THE CONSUMER TOKEN, NOT THE HARDCODED GOLD.
//        `.instrument-chassis[data-phase="complete"]` sets
//        `--phase-color: var(--phase-complete-color)` and
//        `--phase-color-label: var(--phase-complete-color-label)`. NEGATIVE
//        (anti-evasion): the arm block carries NO `var(--color-gold)` directly
//        (the no-leak floor — a dual-read / fallback `var(--color-gold)` inside
//        the arm fails). RED at HEAD: the arm is `--phase-color: var(--color-gold)`.
//   W2 — THE CONSUMER TOKENS DEFAULT TO GOLD AT THE CHASSIS ROOT (back-compat).
//        `--phase-complete-color` defaults to `var(--color-gold)` and
//        `--phase-complete-color-label` to `var(--color-gold-dark, …)` declared
//        at the `.instrument-chassis` root (the un-overriding consumer inherits
//        the gold → byte-identical to HEAD). RED at HEAD: no such token.
//   W3 — THE WCAG TWIN PAIRS 1:1 (the label companion demoted in lockstep).
//        `--phase-complete-color-label` exists as the text-on-background twin,
//        paired 1:1 with `--phase-complete-color` (both demote or neither). RED
//        at HEAD: the complete arm hardcodes `--phase-color-label: var(--color-gold-dark…)`.
//   W4 — THE CANON IS RECORDED + THE SILVER DOC COHERENT.
//        CLAUDE.md's InstrumentChassis phase-canon section records the
//        `--phase-complete-color` consumer seam; design-idioms' chassis idiom row
//        carries the demotion line; the silver structure-twin comments
//        (instrument-chassis.css + InstrumentChassis.vue) name the gold DEFAULT.
//        NEGATIVE (the W-NO-GRAY fence): the silver/structure register SOURCE is
//        byte-untouched — no `--color-silver*`/`--twin-line-*` token is re-pointed
//        by this wave (only the comment narration of the gold default changed).
//        RED at HEAD: the canon names gold as the fixed complete affirmation.
//
// House style mirrors proof-eyebrow-union.mjs / proof-register-ios.mjs: ESM .mjs,
// comment-strip first for CSS (false-witness discipline) BUT read markdown RAW
// (CLAUDE.md / design-idioms.md have embedded CSS examples — a /* */ strip pairs
// across prose), a pure exported detector, a synthetic self-test bite, a
// byte-stable JSON artefact, a human summary, process.exit(1) on any violation.

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

/** Strip /* *​/ block comments so a witness never matches commented CSS prose. */
function stripBlockComments(css) {
    return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

function safeRead(p) {
    try {
        return readFileSync(p, "utf8");
    } catch {
        return "";
    }
}

/**
 * Extract the body of the FIRST CSS rule whose selector text contains `needle`
 * (a balanced single-level `{ … }` block — the chassis arms carry no nested
 * blocks, so a non-greedy `[^}]*` is exact).
 */
function ruleBody(css, needle) {
    const re = new RegExp(
        `${needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\{([^}]*)\\}`,
    );
    return css.match(re)?.[1] ?? null;
}

/**
 * Pure detector — given the source strings, return { facts, violations }.
 * `chassisCss` is the (comment-STRIPPED) instrument-chassis.css; `chassisCssRaw`
 * is the un-stripped source (for the silver-comment narration witness);
 * `vueRaw` the InstrumentChassis.vue source; `claudeMd` / `idiomsMd` read RAW.
 */
export function detectPhasePalette(sources) {
    const { chassisCss, chassisCssRaw, vueRaw, claudeMd, idiomsMd } = sources;
    // docs/precepts is a git SUBMODULE (a sibling private repo). On a CI runner
    // the checkout does not initialize it (and cannot — the default token has no
    // cross-repo grant), so the dir is empty. Absent-submodule → skip-by-policy
    // (the sibling-gate convention) — never a hard failure on a runner that cannot
    // see the doc. Locally the design-idioms.md clause BITES. Default true so the
    // self-test (which supplies a synthetic idiomsMd) keeps biting.
    const submodulePresent = sources.submodulePresent !== false;
    const facts = {};
    const violations = [];

    // ── W1 — the complete arm reads the consumer token, NOT the gold ───────────
    const completeArm = ruleBody(chassisCss, '[data-phase="complete"]');
    facts.w1 = {};
    facts.w1.armFound = completeArm !== null;
    const arm = completeArm ?? "";
    facts.w1.readsConsumerColor = /--phase-color:\s*var\(--phase-complete-color\)/.test(
        arm,
    );
    facts.w1.readsConsumerLabel =
        /--phase-color-label:\s*var\(--phase-complete-color-label\)/.test(arm);
    // NEGATIVE (anti-evasion): no hardcoded brand gold survives inside the arm.
    facts.w1.noGoldLeak = !/var\(--color-gold(?:-[a-z]+)?\b/.test(arm);

    if (!facts.w1.armFound) {
        violations.push(
            'W1: the .instrument-chassis[data-phase="complete"] arm was not found in instrument-chassis.css',
        );
    }
    if (!facts.w1.readsConsumerColor) {
        violations.push(
            "W1: the complete arm must set `--phase-color: var(--phase-complete-color)` (the demotion landed)",
        );
    }
    if (!facts.w1.readsConsumerLabel) {
        violations.push(
            "W1: the complete arm must set `--phase-color-label: var(--phase-complete-color-label)` (the WCAG twin demoted)",
        );
    }
    if (!facts.w1.noGoldLeak) {
        violations.push(
            "W1: the complete arm still reads `var(--color-gold*)` directly (the no-leak floor — the bus carries the consumer token, not the ink; the gold belongs ONLY in the root default)",
        );
    }

    // ── W2 — the consumer tokens default to gold at the chassis root ───────────
    const rootBody = ruleBody(chassisCss, ".instrument-chassis");
    facts.w2 = {};
    const root = rootBody ?? "";
    facts.w2.rootFound = rootBody !== null;
    facts.w2.colorDefaultsGold =
        /--phase-complete-color:\s*var\(--color-gold\)/.test(root);
    facts.w2.labelDefaultsGoldDark =
        /--phase-complete-color-label:\s*var\(--color-gold-dark\s*,\s*var\(--color-gold\)\s*\)/.test(
            root,
        );
    if (!facts.w2.rootFound) {
        violations.push(
            "W2: the .instrument-chassis root rule was not found (the home for the consumer-token defaults)",
        );
    }
    if (!facts.w2.colorDefaultsGold) {
        violations.push(
            "W2: `--phase-complete-color` must default to `var(--color-gold)` at the .instrument-chassis root (the back-compat gold floor)",
        );
    }
    if (!facts.w2.labelDefaultsGoldDark) {
        violations.push(
            "W2: `--phase-complete-color-label` must default to `var(--color-gold-dark, var(--color-gold))` at the .instrument-chassis root (the back-compat WCAG-twin floor)",
        );
    }

    // ── W3 — the WCAG twin pairs 1:1 ──────────────────────────────────────────
    facts.w3 = {};
    // Both consumer tokens exist (declared at the root AND consumed in the arm) —
    // the twin is NOT dropped (canvas + label demote together, the WCAG companion
    // contract the four active arms honor).
    facts.w3.labelTokenDeclared = /--phase-complete-color-label\s*:/.test(
        chassisCss,
    );
    facts.w3.labelTokenConsumed = facts.w1.readsConsumerLabel;
    facts.w3.pairedOneToOne =
        facts.w2.colorDefaultsGold &&
        facts.w2.labelDefaultsGoldDark &&
        facts.w1.readsConsumerColor &&
        facts.w1.readsConsumerLabel;
    if (!facts.w3.labelTokenDeclared) {
        violations.push(
            "W3: `--phase-complete-color-label` (the WCAG twin) must be declared (the label companion is not dropped)",
        );
    }
    if (!facts.w3.pairedOneToOne) {
        violations.push(
            "W3: the WCAG twin must pair 1:1 — `--phase-complete-color` (canvas) AND `--phase-complete-color-label` (text) both default to gold at the root AND both are consumed by the complete arm (both demote or neither)",
        );
    }

    // ── W4 — the canon recorded + the silver doc coherent + silver source fenced ─
    facts.w4 = {};
    // CLAUDE.md records the consumer seam (RAW read — embedded CSS in the doc).
    facts.w4.claudeRecordsSeam =
        /--phase-complete-color/.test(claudeMd) &&
        /InstrumentChassis phase canon/.test(claudeMd);
    // design-idioms chassis idiom row carries the demotion line (RAW read).
    facts.w4.idiomsRecordsSeam = /--phase-complete-color/.test(idiomsMd);
    // The silver structure-twin comments name the gold DEFAULT (RAW chassis css +
    // the vue doc): both reference --phase-complete-color near the silver twin.
    facts.w4.cssSilverDocCoherent =
        /cool-metal twin of the warm-gold/.test(chassisCssRaw) &&
        /--phase-complete-color/.test(chassisCssRaw);
    facts.w4.vueSilverDocCoherent =
        /twin of the warm-gold "complete"-phase affirmation/.test(vueRaw) &&
        /--phase-complete-color/.test(vueRaw);
    // NEGATIVE (the W-NO-GRAY fence): the silver/structure register SOURCE is
    // byte-untouched — no silver/twin-line token is re-DECLARED by this wave's
    // doc edits. The structure variant's existing token declarations stay; this
    // witness asserts the silver tokens are still the SAME color-mix recipes (a
    // re-point would change the property:value, caught by the next gate run vs
    // the committed source). We assert the recipe lines are PRESENT + unchanged
    // in shape (the structure register source survives).
    facts.w4.silverSourceIntact =
        /--twin-line-catch:\s*color-mix\(in oklab, var\(--color-silver-light\)/.test(
            chassisCssRaw,
        ) &&
        /--twin-line-shadow:\s*color-mix\(in oklab, var\(--color-silver-dark\)/.test(
            chassisCssRaw,
        );
    if (!facts.w4.claudeRecordsSeam) {
        violations.push(
            "W4: CLAUDE.md's InstrumentChassis phase-canon section must record the `--phase-complete-color` consumer seam",
        );
    }
    if (!submodulePresent) {
        facts.w4.idiomsSkipped = true;
        console.log(
            "  W4 design-idioms: SKIP-BY-POLICY — docs/precepts submodule not initialized on this runner (the demotion-line clause bites locally)",
        );
    } else if (!facts.w4.idiomsRecordsSeam) {
        violations.push(
            "W4: design-idioms.md's chassis idiom row must carry the `--phase-complete-color` demotion line",
        );
    }
    if (!facts.w4.cssSilverDocCoherent) {
        violations.push(
            "W4: instrument-chassis.css's silver-twin comment must name the warm-gold DEFAULT (reference `--phase-complete-color`), not gold-as-only-ink",
        );
    }
    if (!facts.w4.vueSilverDocCoherent) {
        violations.push(
            "W4: InstrumentChassis.vue's silver-twin doc-comment must name the warm-gold DEFAULT (reference `--phase-complete-color`), not gold-as-only-ink",
        );
    }
    if (!facts.w4.silverSourceIntact) {
        violations.push(
            "W4: the silver/structure register SOURCE must be byte-untouched (--twin-line-catch/-shadow color-mix recipes on the silver quad present — the W-NO-GRAY sanctioned exception, comment narration only)",
        );
    }

    return { facts, violations };
}

/**
 * The self-test bite (un-skippable) — the detector MUST flag a synthetic
 * un-demoted (gold-leaking) complete arm AND pass a synthetic fully-demoted one.
 * This proves the W1 no-leak negative predicate has teeth (the false-witness
 * floor the cardinal lesson names).
 */
function selfTest() {
    const PASS_CSS = `
    .instrument-chassis {
        --phase-color: var(--muted-foreground);
        --phase-complete-color: var(--color-gold);
        --phase-complete-color-label: var(--color-gold-dark, var(--color-gold));
        --twin-line-catch: color-mix(in oklab, var(--color-silver-light) 50%, transparent);
        --twin-line-shadow: color-mix(in oklab, var(--color-silver-dark) 40%, transparent);
    }
    .instrument-chassis[data-phase="complete"] {
        --phase-color: var(--phase-complete-color);
        --phase-color-label: var(--phase-complete-color-label);
        --phase-tint-amount: var(--phase-tint-peak);
    }`;
    // RED case: the un-demoted HEAD arm — gold hardcoded inside the complete arm,
    // no consumer-token default at the root.
    const FAIL_CSS = `
    .instrument-chassis {
        --phase-color: var(--muted-foreground);
        --twin-line-catch: color-mix(in oklab, var(--color-silver-light) 50%, transparent);
        --twin-line-shadow: color-mix(in oklab, var(--color-silver-dark) 40%, transparent);
    }
    .instrument-chassis[data-phase="complete"] {
        --phase-color: var(--color-gold);
        --phase-color-label: var(--color-gold-dark, var(--color-gold));
        --phase-tint-amount: var(--phase-tint-peak);
    }`;
    const docsOk = {
        claudeMd: "### InstrumentChassis phase canon\n--phase-complete-color seam",
        idiomsMd: "--phase-complete-color demotion line",
        vueRaw:
            'twin of the warm-gold "complete"-phase affirmation … --phase-complete-color',
        chassisCssRaw:
            "cool-metal twin of the warm-gold … --phase-complete-color\n" +
            "--twin-line-catch: color-mix(in oklab, var(--color-silver-light) 50%, transparent);\n" +
            "--twin-line-shadow: color-mix(in oklab, var(--color-silver-dark) 40%, transparent);",
    };
    const pass = detectPhasePalette({ chassisCss: PASS_CSS, ...docsOk });
    const fail = detectPhasePalette({
        chassisCss: FAIL_CSS,
        ...docsOk,
        chassisCssRaw: FAIL_CSS,
    });
    return {
        passClean: pass.violations.length === 0,
        failFlagged: fail.violations.length > 0,
        // the no-leak floor specifically catches the gold-in-arm
        leakCaught: fail.violations.some((v) => v.startsWith("W1:")),
    };
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_PHASE_PALETTE_ARTIFACT",
        "BB-phase-palette",
    );
    const chassisCssRaw = safeRead(
        resolve(ROOT, "src/styles/instrument-chassis.css"),
    );
    const sources = {
        chassisCss: stripBlockComments(chassisCssRaw),
        chassisCssRaw,
        vueRaw: safeRead(
            resolve(
                ROOT,
                "src/components/custom/instrument-chassis/InstrumentChassis.vue",
            ),
        ),
        // Markdown read RAW — a /* */ strip would pair across the embedded CSS
        // examples + prose (the binding-rules directive).
        claudeMd: safeRead(resolve(ROOT, "CLAUDE.md")),
        idiomsMd: safeRead(resolve(ROOT, "docs/precepts/design-idioms.md")),
        // docs/precepts is a git SUBMODULE — empty on a CI runner that cannot
        // init it. Skip the design-idioms.md clause when absent (the CLAUDE.md /
        // silver-source / vue-doc W4 sub-checks below are NON-submodule and keep biting).
        submodulePresent: (() => {
            const preceptsDir = resolve(ROOT, "docs/precepts");
            return existsSync(preceptsDir) && readdirSync(preceptsDir).length > 0;
        })(),
    };

    const { facts, violations } = detectPhasePalette(sources);

    // The self-test bite — un-skippable; a broken negative predicate reds.
    const bite = selfTest();
    facts.selfTest = bite;
    if (!bite.passClean) {
        violations.push(
            "[self-test] the detector wrongly flagged a synthetic fully-demoted complete arm (the bite is over-strict)",
        );
    }
    if (!bite.failFlagged) {
        violations.push(
            "[self-test] the detector FAILED to flag a synthetic gold-leaking (un-demoted) complete arm (the bite is broken)",
        );
    }
    if (!bite.leakCaught) {
        violations.push(
            "[self-test] the W1 no-leak negative predicate FAILED to catch a hardcoded `var(--color-gold)` inside the complete arm (the no-leak floor is toothless)",
        );
    }

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:phase-palette",
        facts,
        violations,
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log(
        "proof:phase-palette — the chassis `complete`-phase ink is a CONSUMER token (BB.W-PHASE-PALETTE / N18)",
    );
    console.log(
        `  W1 arm reads consumer token, no gold leak: ${yn(
            facts.w1.readsConsumerColor &&
                facts.w1.readsConsumerLabel &&
                facts.w1.noGoldLeak,
        )}`,
    );
    console.log(
        `  W2 tokens default to gold at chassis root: ${yn(
            facts.w2.colorDefaultsGold && facts.w2.labelDefaultsGoldDark,
        )}`,
    );
    console.log(
        `  W3 WCAG twin pairs 1:1                   : ${yn(
            facts.w3.pairedOneToOne && facts.w3.labelTokenDeclared,
        )}`,
    );
    console.log(
        `  W4 canon recorded + silver doc coherent  : ${yn(
            facts.w4.claudeRecordsSeam &&
                facts.w4.idiomsRecordsSeam &&
                facts.w4.cssSilverDocCoherent &&
                facts.w4.vueSilverDocCoherent &&
                facts.w4.silverSourceIntact,
        )}`,
    );
    console.log(
        `  self-test (no-leak bite has teeth)       : ${yn(
            bite.passClean && bite.failFlagged && bite.leakCaught,
        )}`,
    );

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(
            ROOT.length + 1,
        )}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
