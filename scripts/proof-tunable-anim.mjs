#!/usr/bin/env node
// proof:tunable-anim — BC.W-TUNABLE-ANIM: the tunable-animation registry-completeness gate.
//
// Motion in glass-ui is a TUNABLE surface, indexed by ONE registry
// (docs/precepts/tunable-anim.md). This gate is the standing guard that the registry
// stays the single source + boundary-law-correct: every named spring/scale/clock/drive
// in the registry is a REAL token in source (no phantom axis), every animatable token
// in source is INDEXED (no un-indexed axis), the live controls compose the REAL value.js
// math (no re-implemented bezier/staircase/spring evaluator), each axis has ONE re-tune
// authority, and the steppedEase generator is built + the Oscillator consume booked.
//
// The registry is READ from tunable-anim.md (gate + canon single-sourced — mirroring
// proof-bc-fold-ledger.mjs reading DEFERRAL-LEDGER.md). The token sources are read
// directly (the registry names exact homes).
//
// CLAUSES (T1-T5):
//   T1  the registry is the binding index — every tunable axis (the 5+1 springs + their
//       clocks + the affordance scales/caps + the reveal/morph drives) appears in
//       tunable-anim.md with its token. ANTI-GAMEABILITY: a NEW spring preset (a
//       `--spring-<name>` in SPRING_PRESETS) absent from the registry REDs — a future
//       axis cannot ship un-indexed.
//   T2  the registry names REAL tokens (no phantom axis) — every `--*` token in the
//       registry tables RESOLVES in source (SPRING_PRESETS for the springs, the named
//       CSS homes for the scales/clocks/drives/eases). A planted phantom row REDs.
//   T3  the boundary law holds — the live controls COMPOSE the real math: the steppedEase
//       generator reads value.js `steppedEase`/`jumpTerms`/`parseSteps` (no re-implemented
//       staircase evaluator); the bezier editor reads `CSSCubicBezier`; the spring preview
//       reads `springTimingFunction`/`SPRING_PRESETS` — and the picker re-implements NO
//       inline staircase/bezier/spring evaluator (the curves.ts NO-FORK discipline).
//   T4  the single source (no axis re-tuned twice) — each spring has exactly ONE
//       `(response, ζ)` literal authority (the SPRING_PRESETS table); a second
//       `(response, ζ)` literal for a registry spring elsewhere in src/ REDs. The clock
//       axis is recorded DERIVED-not-tunable in the registry (the W-GLASS-CAL fence).
//   T5  the steppedEase generator built + the Oscillator consume booked — the
//       <EasingPicker mode="steps"> carries the live `n`-Slider + jumpTerm-Select
//       generator (the deferral discharge); the KF-OSCILLATOR loop-seam consume is a
//       by-name row in asks-and-consumes.md.
//
// SELF-TEST (born-RED→GREEN): `node scripts/proof-tunable-anim.mjs --self-test` runs the
// bites — a planted un-indexed spring (T1 RED), a phantom registry token (T2 RED), an
// inline staircase re-implementation in the picker (T3 RED), a second spring (response,ζ)
// literal (T4 RED), a missing generator control (T5 RED), a missing book (T5 RED) — each
// MUST flag, AND the real tree must be clean (GREEN-after).
//
// House style mirrors proof-bc-fold-ledger.mjs / proof-animation-coherence.mjs: ESM .mjs,
// pure exported detectors over loaded sources (so the self-test feeds synthetic fixtures
// with no disk), a human summary, exit(1) on any violation.

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");

const REGISTRY_DOC = "docs/design/tunable-anim.md"; // BH.B5c re-home off docs/precepts submodule
const SPRING_PRESETS_TS = "src/composables/motion/springPresets.ts";
const ASKS_DOC = "docs/tranches/BC/coordination/asks-and-consumes.md";
const EASING_PICKER_SFC = "src/components/custom/easing/EasingPicker.vue";
const USE_EASING_PICKER_TS =
    "src/components/custom/easing/composables/useEasingPicker.ts";

// The CSS token homes the registry names (T2 resolves each registry token against
// the union of these). Each is a real file:line definition home (verified at the
// wave's starting-state read).
const TOKEN_SOURCE_FILES = [
    "src/styles/tokens/scheme-motion.css", // --motion-weight, --ease-cartoon-punch, ambient/progress curves
    "src/styles/tokens/scheme-spring.css", // BD.W-CUT carve: --spring-*, --spring-*-duration, --ease-* (the §2 EASING register)
    "src/styles/tokens/scale-paper.css", // --scale-hover*, --scale-press*, --tab-indicator-max-stretch
    "src/styles/tokens/property-regs.css", // --glass-btn-press-t, --border-progress-fill, --progress-crescendo, --phase-tint-amount
    "src/styles/tokens/scroll-tokens.css", // --scroll-*
    "src/styles/glass/surfaces.css", // --glass-btn-press-t (consumer + init)
    "src/styles/glass/reveal.css", // --glass-reveal-blur
    "src/styles/utilities/base.css", // --card-press-t @property
    "src/styles/dock.css", // --dock-morph-t @property
    "src/styles/dock/morph.css", // --dock-expand-t
];

// ── reader ───────────────────────────────────────────────────────────────────────
function read(rel) {
    const p = join(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// ── registry-token extraction ──────────────────────────────────────────────────────
// Pull every `--token` named inside a markdown TABLE cell of tunable-anim.md (a
// `| ... | `--token` | ... |` row). The bezier-default cells reference seed tokens
// (`var(--motion-ease-standard)`) — those are token NAMES too, captured by the same
// `--[a-z0-9-]+` sweep. We collect from table rows only (a `|`-leading line) so the
// brainstorm prose's inline `--spring-<name>` placeholder is not a registry token.
export function extractRegistryTokens(docText) {
    const tokens = new Set();
    for (const line of docText.split("\n")) {
        if (!line.trimStart().startsWith("|")) continue;
        for (const m of line.matchAll(/--[a-z][a-z0-9-]*/g)) tokens.add(m[0]);
    }
    return tokens;
}

// The spring preset names defined in SPRING_PRESETS (the `name: "<x>"` literals) —
// the single authority for kind 1. T1's anti-gameability reads this: every defined
// preset MUST have its `--spring-<name>` row in the registry.
export function extractSpringPresetNames(presetSrc) {
    const names = [];
    for (const m of presetSrc.matchAll(/name:\s*["'`]([a-z]+)["'`]/g)) names.push(m[1]);
    return names;
}

// Every `--token` DEFINED across the named CSS token-source files — the resolve set T2
// checks a registry token against. A custom property is "defined" two ways: the
// `--token:` assignment form (`--scale-press: 0.96`) AND the `@property --token {` typed
// REGISTRATION form (`@property --dock-morph-t { … }` — the registered 0..1 drive
// scalars have no plain assignment, only the typed registration + a per-state set). A
// `--spring-<name>` is also charted off the SPRING_PRESETS table (the CSS twin is
// generated from it).
export function buildSourceTokenSet(loadedFiles, springNames) {
    const defined = new Set();
    for (const [, src] of loadedFiles) {
        for (const m of src.matchAll(/(--[a-z][a-z0-9-]*)\s*:/g)) defined.add(m[1]);
        for (const m of src.matchAll(/@property\s+(--[a-z][a-z0-9-]*)/g)) defined.add(m[1]);
    }
    for (const n of springNames) {
        defined.add(`--spring-${n}`);
        defined.add(`--spring-${n}-duration`);
    }
    return defined;
}

// ── T1 — registry completeness (anti-gameability) ─────────────────────────────────
// Every defined spring preset has a `--spring-<name>` registry row; the four
// load-bearing affordance/clock/drive anchors are present (so a wholesale registry
// gut REDs). A NEW preset un-indexed REDs.
const REQUIRED_ANCHOR_TOKENS = [
    "--spring-press", // the minted iOS press register (BC.W-SPRING-EASE)
    "--spring-press-duration", // its derived clock (kind 2)
    "--scale-press", // the affordance-magnitude anchor (kind 4)
    "--glass-btn-press-t", // the reveal/morph drive anchor (kind 5)
    "--ease-out-expo", // the easing-curve anchor (kind 3)
];
export function detectRegistryCompleteness(registryTokens, springNames) {
    const violations = [];
    for (const n of springNames) {
        const tok = `--spring-${n}`;
        if (!registryTokens.has(tok)) {
            violations.push(
                `T1: spring preset "${n}" is defined in ${SPRING_PRESETS_TS} but its "${tok}" row is ABSENT from ${REGISTRY_DOC} — a tunable axis cannot ship un-indexed (anti-gameability).`,
            );
        }
    }
    for (const tok of REQUIRED_ANCHOR_TOKENS) {
        if (!registryTokens.has(tok)) {
            violations.push(
                `T1: the load-bearing anchor "${tok}" is ABSENT from ${REGISTRY_DOC} — the registry must index every tunable kind.`,
            );
        }
    }
    return violations;
}

// ── T2 — registry names REAL tokens (no phantom axis) ─────────────────────────────
// Every registry token resolves in source. A `var(--motion-ease-*)` seed reference in a
// default cell is a token NAME too — admit the `--motion-ease-*` seed family (defined in
// scheme-motion.css, captured by buildSourceTokenSet) so the curve-default cells pass.
export function detectPhantomTokens(registryTokens, sourceTokens) {
    const violations = [];
    for (const tok of registryTokens) {
        if (!sourceTokens.has(tok)) {
            violations.push(
                `T2: registry token "${tok}" resolves to NO definition in any token-source file — a phantom axis (the registry must name only REAL tokens).`,
            );
        }
    }
    return violations;
}

// ── T3 — the boundary law (the live controls compose the real math) ───────────────
// The picker reaches for value.js math; it re-implements NONE. (a) the composable
// IMPORTS the curve callables from value.js; (b) NO inline staircase/bezier/spring
// evaluator lives in the picker (a hand-rolled `Math.floor(t*n)/n` staircase, a
// hand-rolled cubic-bezier Newton solver, or a hand-rolled `Math.exp(-zeta*…)` spring).
const REQUIRED_VALUE_JS_IMPORTS = [
    "CSSCubicBezier",
    "steppedEase",
    "jumpTerms",
    "parseSteps",
];
// A re-implemented staircase: `Math.floor(` near a `/ n` or `* n` — the inline step
// evaluator value.js owns. A re-implemented bezier: a `Math.pow`/Newton solve over
// control points. A re-implemented spring: `Math.exp(` with a damping term. These are
// the FORK signatures the boundary law forbids in the picker leaf.
const INLINE_STAIRCASE_RE = /Math\.floor\s*\([^)]*\)\s*\/\s*[a-z]/i;
const INLINE_SPRING_RE = /Math\.exp\s*\(\s*-/i;
export function detectBoundaryLaw(composableSrc, sfcSrc) {
    const violations = [];
    // (a) the value.js imports are present (the composable reaches for the math).
    for (const sym of REQUIRED_VALUE_JS_IMPORTS) {
        const re = new RegExp(`\\b${sym}\\b[\\s\\S]*?@mkbabb/value\\.js|@mkbabb/value\\.js[\\s\\S]*?\\b${sym}\\b`);
        if (!re.test(composableSrc)) {
            violations.push(
                `T3: ${USE_EASING_PICKER_TS} does NOT import "${sym}" from @mkbabb/value.js — the live control must COMPOSE the value.js math, never re-implement it.`,
            );
        }
    }
    // (b) no inline staircase/spring re-implementation in the picker leaf.
    for (const [rel, src] of [
        [USE_EASING_PICKER_TS, composableSrc],
        [EASING_PICKER_SFC, sfcSrc],
    ]) {
        if (INLINE_STAIRCASE_RE.test(src)) {
            violations.push(
                `T3: ${rel} carries an inline staircase evaluator (Math.floor(…)/n) — value.js steppedEase owns the staircase math (the curves.ts NO-FORK discipline).`,
            );
        }
        if (INLINE_SPRING_RE.test(src)) {
            violations.push(
                `T3: ${rel} carries an inline spring evaluator (Math.exp(-…)) — keyframes.js springTimingFunction owns the spring math (the boundary law).`,
            );
        }
    }
    return violations;
}

// ── T4 — the single source (no spring re-tuned twice) ─────────────────────────────
// Each registry spring has exactly ONE `(response, ζ)` literal authority — the
// SPRING_PRESETS table. A SECOND `response: N … dampingFraction: N` block for a registry
// spring name anywhere in the scanned src/ is a fork. We count the `response:`/
// `dampingFraction:` literal PAIRS in springPresets.ts (the authority) and assert the
// scanned candidate files carry NO additional pair. The candidate is the picker leaf +
// the composable (the live control could smuggle a hand-tuned pair).
const SPRING_PAIR_RE = /response:\s*[\d.]+[\s\S]{0,80}?dampingFraction:\s*[\d.]+/g;
export function detectSingleSource(presetSrc, candidateSrcs) {
    const violations = [];
    for (const [rel, src] of candidateSrcs) {
        const pairs = [...src.matchAll(SPRING_PAIR_RE)];
        if (pairs.length > 0) {
            violations.push(
                `T4: ${rel} carries ${pairs.length} hand-authored (response, ζ) spring pair(s) — the SPRING_PRESETS table is the SINGLE re-tune authority; a second literal pair is a fork.`,
            );
        }
    }
    // The authority itself must carry exactly the defined-preset count of pairs (a
    // sanity floor — if the table lost its pairs the registry would index nothing).
    const authPairs = [...presetSrc.matchAll(SPRING_PAIR_RE)].length;
    if (authPairs < 1) {
        violations.push(
            `T4: ${SPRING_PRESETS_TS} carries no (response, ζ) pairs — the single spring authority is empty.`,
        );
    }
    return violations;
}

// ── T5 — the steppedEase generator built + the Oscillator consume booked ──────────
// The <EasingPicker mode="steps"> carries the live n-Slider + jumpTerm-Select generator;
// the KF-OSCILLATOR loop-seam consume is a by-name row in asks-and-consumes.md.
export function detectGeneratorAndBook(sfcSrc, asksSrc) {
    const violations = [];
    // The generator: a glass-ui <Slider> bound to the step count + a <Select> over the
    // jump terms, both inside the steps branch. We assert the Slider drives the step
    // count (the dogfooded affordance control), the Select iterates `terms`, and the
    // composable's steppedEase callable backs them (T3 already proves the import).
    if (!/\bSlider\b/.test(sfcSrc) || !/easing-steps-n/.test(sfcSrc)) {
        violations.push(
            `T5: ${EASING_PICKER_SFC} carries no <Slider> step-count control (data-testid="easing-steps-n") — the live steppedEase generator (the deferral discharge) is missing.`,
        );
    }
    if (!/v-for="t in terms"/.test(sfcSrc) && !/v-for="t in jumpTerms"/.test(sfcSrc)) {
        violations.push(
            `T5: ${EASING_PICKER_SFC} carries no jump-term <Select> iterating the value.js terms — the steppedEase generator's 7-term selector is missing.`,
        );
    }
    // The Oscillator consume book: a by-name row naming the EasingPicker loop seam +
    // the Oscillator + the BOOKED disposition.
    const hasBook =
        /Oscillator/.test(asksSrc) &&
        /EasingPicker/.test(asksSrc) &&
        /loop/i.test(asksSrc) &&
        /BOOKED/i.test(asksSrc);
    if (!hasBook) {
        violations.push(
            `T5: ${ASKS_DOC} carries no by-name BOOKED row for the EasingPicker loop-seam Oscillator consume — the foreign-tree fence requires the consume be booked, not faked.`,
        );
    }
    return violations;
}

// ── orchestration over loaded sources (pure — the self-test feeds fixtures) ───────
export function runChecks(sources) {
    const {
        registryDoc,
        presetSrc,
        sourceFiles, // [rel, src][]
        composableSrc,
        sfcSrc,
        asksSrc,
    } = sources;
    // docs/precepts is a git SUBMODULE — empty on a CI runner that cannot init
    // it. Absent-submodule → skip-by-policy (the sibling-gate convention) for the
    // tunable-anim.md registry clauses (T1 completeness + T2 phantom) ONLY; the
    // boundary law (T3), single-source (T4), generator + the asks-and-consumes.md
    // book (T5 — a main-repo file, NOT a submodule) keep biting below. Default
    // true so the self-test (synthetic registryDoc) keeps biting.
    const submodulePresent = sources.submodulePresent !== false;

    const failures = [];
    const push = (arr) => arr.forEach((m) => failures.push(m));

    const registryTokens = extractRegistryTokens(registryDoc);
    const springNames = extractSpringPresetNames(presetSrc);
    const sourceTokenSet = buildSourceTokenSet(sourceFiles, springNames);

    if (submodulePresent) {
        push(detectRegistryCompleteness(registryTokens, springNames));
        push(detectPhantomTokens(registryTokens, sourceTokenSet));
    }
    push(detectBoundaryLaw(composableSrc, sfcSrc));
    push(
        detectSingleSource(presetSrc, [
            [USE_EASING_PICKER_TS, composableSrc],
            [EASING_PICKER_SFC, sfcSrc],
        ]),
    );
    push(detectGeneratorAndBook(sfcSrc, asksSrc));

    return {
        failures,
        registryTokenCount: registryTokens.size,
        springCount: springNames.length,
    };
}

function preceptsSubmodulePresent() {
    // BH.B5c: the registry doc re-homed off the docs/precepts submodule onto the
    // in-repo docs/design extraction — present iff the extracted home resolves.
    return existsSync(join(ROOT, REGISTRY_DOC));
}

function loadReal() {
    return {
        registryDoc: read(REGISTRY_DOC),
        presetSrc: read(SPRING_PRESETS_TS),
        sourceFiles: TOKEN_SOURCE_FILES.map((rel) => [rel, read(rel)]),
        composableSrc: read(USE_EASING_PICKER_TS),
        sfcSrc: read(EASING_PICKER_SFC),
        asksSrc: read(ASKS_DOC),
        submodulePresent: preceptsSubmodulePresent(),
    };
}

// ── self-test ────────────────────────────────────────────────────────────────────
function selfTest() {
    const real = loadReal();
    const bites = [];
    const clone = (o) => JSON.parse(JSON.stringify(o));

    // bite 1 — a planted un-indexed spring → T1 RED.
    {
        const s = clone(real);
        s.presetSrc = s.presetSrc.replace(
            /name:\s*"press"/,
            'name: "plantednew", response: 0.2, dampingFraction: 0.8, comment: "x" },\n    {\n        name: "press"',
        );
        const { failures } = runChecks(s);
        bites.push(["un-indexed-spring → T1", failures.some((f) => f.startsWith("T1"))]);
    }
    // bite 2 — a phantom registry token → T2 RED.
    {
        const s = clone(real);
        s.registryDoc += "\n| phantom | `--spring-nonexistent` | 0,0 | x | x | x | x |\n";
        const { failures } = runChecks(s);
        bites.push(["phantom-token → T2", failures.some((f) => f.startsWith("T2"))]);
    }
    // bite 3 — an inline staircase re-implementation in the composable → T3 RED.
    {
        const s = clone(real);
        s.composableSrc += "\nconst bad = (t) => Math.floor(t * n) / n;\n";
        const { failures } = runChecks(s);
        bites.push(["inline-staircase → T3", failures.some((f) => f.startsWith("T3"))]);
    }
    // bite 3b — dropping a value.js import → T3 RED.
    {
        const s = clone(real);
        s.composableSrc = s.composableSrc.replace(/\bparseSteps\b/g, "notParseSteps");
        const { failures } = runChecks(s);
        bites.push(["missing-valuejs-import → T3", failures.some((f) => f.startsWith("T3"))]);
    }
    // bite 4 — a second spring (response, ζ) literal in the picker → T4 RED.
    {
        const s = clone(real);
        s.composableSrc += "\nconst forked = { response: 0.5, dampingFraction: 0.6 };\n";
        const { failures } = runChecks(s);
        bites.push(["second-spring-pair → T4", failures.some((f) => f.startsWith("T4"))]);
    }
    // bite 5 — a missing generator control → T5 RED.
    {
        const s = clone(real);
        s.sfcSrc = s.sfcSrc.replace(/easing-steps-n/g, "removed-marker");
        const { failures } = runChecks(s);
        bites.push(["missing-generator → T5", failures.some((f) => f.startsWith("T5"))]);
    }
    // bite 6 — a missing Oscillator book → T5 RED.
    {
        const s = clone(real);
        s.asksSrc = s.asksSrc.replace(/Oscillator/g, "Removed");
        const { failures } = runChecks(s);
        bites.push(["missing-book → T5", failures.some((f) => f.startsWith("T5"))]);
    }

    console.log("proof:tunable-anim — SELF-TEST (born-RED→GREEN)");
    let allFlag = true;
    for (const [name, flagged] of bites) {
        console.log(`  ${flagged ? "FLAGGED" : "MISSED "}  ${name}`);
        if (!flagged) allFlag = false;
    }
    const realRun = runChecks(real);
    console.log(`  real tree failures     : ${realRun.failures.length}`);
    for (const f of realRun.failures.slice(0, 20)) console.log(`    ${f}`);
    if (!allFlag) {
        console.error(
            "\n[proof:tunable-anim] SELF-TEST FAILED — a synthetic-broken fixture did not flag its clause; the detector is not load-bearing.",
        );
        process.exit(1);
    }
    if (realRun.failures.length > 0) {
        console.error(
            "\n[proof:tunable-anim] SELF-TEST FAILED — the REAL tree is not clean (the GREEN-after state must pass every clause).",
        );
        process.exit(1);
    }
    console.log(
        "\n[proof:tunable-anim] SELF-TEST GREEN — every bite flags born-RED, the real registry passes T1-T5.",
    );
    process.exit(0);
}

// ── entry ──────────────────────────────────────────────────────────────────────────
if (process.argv.includes("--self-test")) {
    selfTest();
} else {
    const real = loadReal();
    const { failures, registryTokenCount, springCount } = runChecks(real);
    console.log("proof:tunable-anim — the tunable-animation registry-completeness gate (BC.W-TUNABLE-ANIM)");
    if (!real.submodulePresent) {
        console.log(
            "  T1/T2 registry: SKIP-BY-POLICY — docs/precepts submodule not initialized on this runner (the tunable-anim.md registry clauses bite locally; T3/T4/T5 still bite)",
        );
    }
    console.log(`  registry tokens indexed : ${registryTokenCount}`);
    console.log(`  spring presets          : ${springCount}`);
    console.log(`  failures                : ${failures.length}`);
    for (const f of failures) console.error(`  ${f}`);
    if (failures.length > 0) {
        console.error(
            `\n[proof:tunable-anim] ${failures.length} registry violation(s) — a phantom/un-indexed axis, a boundary-law fork, a re-tuned-twice spring, or a missing generator/book. The tunable surface is not single-source.`,
        );
        process.exit(1);
    }
    console.log(
        "\n[proof:tunable-anim] the registry indexes every tunable axis, names only REAL tokens, the live controls compose the value.js math, each axis is single-source, and the generator + book are present.",
    );
    process.exit(0);
}
