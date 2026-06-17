#!/usr/bin/env node
// BB.W-PAPER-GRID-TEXTURE — the geometric paper-cascade peer LOCK (proof:paper-grid).
//
// The paper-cascade shipped the ORGANIC turbulence register end-to-end
// (`--paper-clean-texture`/`--paper-aged-texture` + `.paper-texture` /
// `paper-grain-overlay`) but NEVER the GEOMETRIC one — the math/grid brand
// pillar lived only as a demo-private page-substrate recipe (`.story-bg-grid`)
// every opaque card plate occludes, so on a dense surface the grid contributed
// 0.0000. This wave mints the geometric half — a `--paper-grid-texture` peer +
// the `.paper-grid` opt-in utility + the additive `<Card grid>` axis — so a
// document-register card carries the two-frequency blueprint grid as its own
// interior ground, felt THROUGH the plate.
//
// FOUR device-free SOURCE witnesses (the comment-strip + pure-detector house
// pattern, mirroring proof-shadow-contract.mjs / proof-surface-axis.mjs), each
// born-RED at HEAD pre-wave; the BINDING painted truth is the π readback
// (tests-visual/paper-grid.spec.ts) + the proof:ba-gestalt verdict.
//
//   W1 — the geometric peer exists in the paper-cascade (scale-paper.css): a
//        `--paper-grid-texture` + `--paper-grid-texture-size` (+ the
//        `--paper-grid-opacity` strength knob) in the SAME :root cascade
//        context as the organic peers; the texture is a TWO-FREQUENCY grid
//        (a minor cell + a 4×-major rule, NOT a uniform single line); the
//        ink BITE — the line color is a `color-mix(… var(--foreground) …)`
//        form, NOT a hardcoded hsl()/oklch() (the no-gray / token-first floor).
//   W2 — the `.paper-grid` opt-in utility paints the interior ground
//        (cards.css): the grid `background-image` + a `.dark .paper-grid` arm
//        re-pointing the blend for the dark card interior; the dark-arm BITE —
//        a PLAIN-ancestor `.dark .paper-grid` selector, NOT a scoped
//        `:global()` (the recurring scoped-global-drop trap).
//   W3 — the a11y guard mirrors paper.css: `.paper-grid` honors
//        `@media (prefers-reduced-transparency: reduce)` (the same idiom
//        paper.css establishes, not a grid-local fork).
//   W4 — Card threads the additive `grid` axis, default OFF (Card.vue): the
//        `grid?: boolean` prop default `false` composing `.paper-grid` when
//        true (the `data-grid` binding mirrors the `grain` shape); the
//        no-regression BITE — the default is OFF (a bare card is byte-identical
//        to HEAD) AND the existing `grain` axis + its default are UNTOUCHED.
//
// House style mirrors proof-shadow-contract.mjs: ESM .mjs, comment-strip first
// (false-witness discipline), a pure exported detector, a byte-stable JSON
// artefact via gate-output, a human summary, process.exit(1) on any violation,
// + a SELF-TEST bite (--self-test) proving each witness has teeth.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { readMonolith } from "./read-css-monoliths.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        CARDS_CSS: resolve(ROOT, "src/styles/cards.css"),
        CARD_VUE: resolve(ROOT, "src/components/ui/card/Card.vue"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_PAPER_GRID_ARTIFACT",
            "BB-paper-grid",
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

// Strip `// …` line comments (Vue `<script>` half) without eating `://` in a URL
// (the clause-7 house idiom — a bare `//` strip ate the URL's `://`).
function stripLineComments(text) {
    return text.replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

// Find the `{ … }` body of the first rule whose selector matches `selectorRe`.
// Brace-balanced so a nested `&::after { … }` inside the rule body is captured.
function matchRuleBody(css, selectorRe) {
    const m = css.match(selectorRe);
    if (!m) return null;
    const open = css.indexOf("{", m.index);
    if (open === -1) return null;
    let depth = 0;
    for (let i = open; i < css.length; i++) {
        if (css[i] === "{") depth++;
        else if (css[i] === "}") {
            depth--;
            if (depth === 0) return css.slice(open + 1, i);
        }
    }
    return null;
}

/**
 * The pure detector. Takes the comment-stripped sources, returns
 * {facts, violations}. The four witnesses run over the stripped text.
 */
export function detectPaperGrid({ tokensCss, cardsCss, cardVue }) {
    const violations = [];
    const facts = {};

    // ── W1 — the geometric peer exists in the paper-cascade ──────────────
    const declaresTexture = /--paper-grid-texture\s*:/.test(tokensCss);
    const declaresSize = /--paper-grid-texture-size\s*:/.test(tokensCss);
    const declaresOpacity = /--paper-grid-opacity\s*:/.test(tokensCss);
    facts.w1DeclaresTexture = declaresTexture;
    facts.w1DeclaresSize = declaresSize;
    facts.w1DeclaresOpacity = declaresOpacity;
    if (!declaresTexture)
        violations.push(
            "W1: scale-paper.css does not declare the `--paper-grid-texture` peer (the geometric half of the paper-cascade is absent)",
        );
    if (!declaresSize)
        violations.push(
            "W1: scale-paper.css does not declare the `--paper-grid-texture-size` peer (the cell-size axis)",
        );
    if (!declaresOpacity)
        violations.push(
            "W1: scale-paper.css does not declare the `--paper-grid-opacity` strength knob (the ambient through-card strength)",
        );

    // The texture VALUE must be a TWO-FREQUENCY grid: a minor cell + a major
    // rule. The recipe rides a `* 4` major-cell size in the consuming utility,
    // and the peer ships a minor + a major line ink. We assert the peer family
    // carries BOTH a minor + a major ink token (the 4×-major engineering rule),
    // NOT a single uniform line.
    const declaresMinorInk = /--paper-grid-line\s*:/.test(tokensCss);
    const declaresMajorInk = /--paper-grid-line-major\s*:/.test(tokensCss);
    facts.w1TwoFrequency = declaresMinorInk && declaresMajorInk;
    if (!facts.w1TwoFrequency)
        violations.push(
            "W1: the grid is not two-frequency — the `--paper-grid-line` (minor) + `--paper-grid-line-major` (major rule) ink peers must BOTH exist (a uniform single-line grid is not the engineering-paper 4×-major register)",
        );

    // The ink BITE — the line color must be a `color-mix(… var(--foreground) …)`
    // form, NEVER a hardcoded hsl()/oklch() literal (the no-gray / token-first
    // floor — the ink must re-tint with --foreground in lockstep).
    const minorMatch = tokensCss.match(/--paper-grid-line\s*:\s*([\s\S]*?);/);
    const majorMatch = tokensCss.match(/--paper-grid-line-major\s*:\s*([\s\S]*?);/);
    const inkValues = [minorMatch?.[1] ?? "", majorMatch?.[1] ?? ""].join(" ");
    const inkIsForegroundMix =
        /color-mix\([^)]*var\(\s*--foreground\s*\)/.test(inkValues) ||
        /color-mix\([\s\S]*?var\(\s*--foreground\s*\)/.test(inkValues);
    // The hardcode bite scans the ink VALUE (the captured group, post-`:`) for a
    // raw hsl()/oklch()/rgb()/hex literal. A `color-mix(in srgb, …)` is the
    // sanctioned form (its `srgb`/`oklab` keyword is NOT a color literal); a bare
    // `hsl(…)`/`#rrggbb` as the ink IS the no-gray violation.
    const inkRaw = (minorMatch?.[1] ?? "") + " " + (majorMatch?.[1] ?? "");
    const inkHasHardcode = /\b(?:hsl|hsla|oklch|rgb|rgba)\(/i.test(inkRaw) ||
        /#[0-9a-f]{3,8}\b/i.test(inkRaw);
    facts.w1InkForegroundMix = inkIsForegroundMix;
    facts.w1InkHardcoded = inkHasHardcode;
    if (!inkIsForegroundMix)
        violations.push(
            "W1 (ink bite): the grid line ink is not a `color-mix(… var(--foreground) …)` form — it cannot re-tint with --foreground in lockstep (token-first / no-gray floor)",
        );
    if (inkHasHardcode)
        violations.push(
            "W1 (ink bite): the grid line ink carries a hardcoded hsl()/oklch()/rgb()/hex literal — the no-gray / token-first floor requires a --foreground-derived mix",
        );

    // ── W2 — the `.paper-grid` opt-in utility paints the interior ground ──
    const utilBody = matchRuleBody(cardsCss, /\.paper-grid\s*\{/);
    facts.w2UtilityFound = utilBody !== null;
    if (utilBody === null) {
        violations.push(
            "W2: cards.css has no `.paper-grid` utility rule (the geometric opt-in is absent)",
        );
    } else {
        const consumesTexture = /var\(\s*--paper-grid-texture\s*\)/.test(utilBody);
        facts.w2ConsumesTexture = consumesTexture;
        if (!consumesTexture)
            violations.push(
                "W2: the `.paper-grid` utility does not consume `var(--paper-grid-texture)` (it must paint the peer, not a re-pasted raw gradient)",
            );
    }

    // The dark-arm BITE — a PLAIN-ancestor `.dark .paper-grid` selector, NOT a
    // scoped `:global()` (the recurring scoped-global-drop trap).
    const darkArmPlain = /\.dark\s+\.paper-grid\b/.test(cardsCss);
    const darkArmScopedGlobal = /:global\([^)]*\.dark[^)]*\)\s+\.paper-grid/.test(
        cardsCss,
    );
    facts.w2DarkArmPlain = darkArmPlain;
    facts.w2DarkArmScopedGlobal = darkArmScopedGlobal;
    if (!darkArmPlain)
        violations.push(
            "W2: cards.css has no plain-ancestor `.dark .paper-grid` dark arm (the grid ink/blend is not re-pointed for the dark card interior)",
        );
    if (darkArmScopedGlobal)
        violations.push(
            "W2 (dark-arm bite): the dark arm uses a scoped `:global(.dark)` selector (the scoped-global-drop trap — it silently drops from emitted CSS; use a PLAIN-ancestor `.dark .paper-grid`)",
        );

    // ── W3 — the a11y guard mirrors paper.css ────────────────────────────
    // A `@media (prefers-reduced-transparency: reduce)` block reaches
    // `.paper-grid` (the same idiom paper.css establishes, not a grid-local fork).
    // Brace-balanced (not a fragile `\n}` anchor) so an indented closing brace
    // is captured.
    const rtBody = matchRuleBody(
        cardsCss,
        /@media\s*\(\s*prefers-reduced-transparency\s*:\s*reduce\s*\)\s*\{/,
    );
    const rtReachesGrid = rtBody ? /\.paper-grid\b/.test(rtBody) : false;
    facts.w3ReducedTransparencyGuard = rtReachesGrid;
    if (!rtReachesGrid)
        violations.push(
            "W3: `.paper-grid` is not covered by a `@media (prefers-reduced-transparency: reduce)` block (a reduced-transparency user must get a clean card interior — the same a11y idiom paper.css establishes)",
        );

    // ── W4 — Card threads the additive `grid` axis, default OFF ───────────
    const cardVueStripped = stripBlockComments(stripLineComments(cardVue));
    const declaresGridProp = /\bgrid\?\s*:\s*boolean/.test(cardVueStripped);
    facts.w4DeclaresGridProp = declaresGridProp;
    if (!declaresGridProp)
        violations.push(
            "W4: Card.vue declares no `grid?: boolean` prop (the consumer-facing geometric axis is absent)",
        );

    // The default must be OFF (`grid: false` in withDefaults) — the additive,
    // not-default-changing floor (a default-ON would change every existing card).
    const defaultOff = /withDefaults[\s\S]*?\bgrid\s*:\s*false\b/.test(
        cardVueStripped,
    );
    facts.w4DefaultOff = defaultOff;
    if (!defaultOff)
        violations.push(
            "W4 (no-regression bite): the `grid` prop default is not `false` (a bare <Card> must be byte-identical to HEAD — a default-ON would change every existing card)",
        );

    // The prop composes the `.paper-grid` utility when true (mirroring the
    // `grain` → overlay shape), and binds `:data-grid`.
    const composesUtility = /grid\s*&&\s*['"]paper-grid['"]/.test(cardVueStripped);
    const bindsDataGrid = /:data-grid\s*=\s*['"]grid['"]/.test(cardVueStripped);
    facts.w4ComposesUtility = composesUtility;
    facts.w4BindsDataGrid = bindsDataGrid;
    if (!composesUtility)
        violations.push(
            "W4: the `grid` prop does not compose the `.paper-grid` utility when true (the `grid && 'paper-grid'` class binding is absent)",
        );
    if (!bindsDataGrid)
        violations.push(
            "W4: Card does not bind `:data-grid=\"grid\"` (the data-attr seam mirroring `:data-grain`)",
        );

    // The existing `grain` axis must be UNTOUCHED (the additive floor — the new
    // axis is orthogonal, not a replacement).
    const grainPropPresent = /\bgrain\?\s*:\s*boolean/.test(cardVueStripped);
    const grainDefaultTrue = /withDefaults[\s\S]*?\bgrain\s*:\s*true\b/.test(
        cardVueStripped,
    );
    facts.w4GrainUntouched = grainPropPresent && grainDefaultTrue;
    if (!facts.w4GrainUntouched)
        violations.push(
            "W4: the existing `grain` axis (the `grain?: boolean` prop + its `grain: true` default) is no longer intact — the geometric axis must be ADDITIVE, not a replacement",
        );

    facts.w1 =
        declaresTexture &&
        declaresSize &&
        declaresOpacity &&
        facts.w1TwoFrequency &&
        inkIsForegroundMix &&
        !inkHasHardcode;
    facts.w2 = facts.w2UtilityFound && facts.w2ConsumesTexture && darkArmPlain && !darkArmScopedGlobal;
    facts.w3 = rtReachesGrid;
    facts.w4 =
        declaresGridProp &&
        defaultOff &&
        composesUtility &&
        bindsDataGrid &&
        facts.w4GrainUntouched;

    return { facts, violations };
}

export function detectSource(sources) {
    return detectPaperGrid({
        tokensCss: stripBlockComments(sources.tokensCss ?? ""),
        cardsCss: stripBlockComments(sources.cardsCss ?? ""),
        // Card.vue is a Vue SFC — pass it RAW; the detector strips block + line
        // comments on the script half itself (the prop/default scan must read
        // the live source, not a comment).
        cardVue: sources.cardVue ?? "",
    });
}

function loadSources() {
    const { ROOT, CARDS_CSS, CARD_VUE } = cliPaths();
    return {
        tokensCss: readMonolith(ROOT, "tokens"),
        cardsCss: readFileSync(CARDS_CSS, "utf8"),
        cardVue: readFileSync(CARD_VUE, "utf8"),
    };
}

// ── SELF-TEST — prove each witness has teeth (the false-witness floor) ──────
function selfTest() {
    const failures = [];
    const ASSERT = (name, cond) => {
        if (!cond) failures.push(name);
    };

    // A SOUND fixture — every witness green.
    const goodTokens = `:root {
        --paper-grid-opacity: 0.08;
        --paper-grid-texture-size: 32px;
        --paper-grid-line: color-mix(in srgb, var(--foreground) calc(var(--paper-grid-opacity) * 100%), transparent);
        --paper-grid-line-major: color-mix(in srgb, var(--foreground) calc(var(--paper-grid-opacity) * 160%), transparent);
        --paper-grid-texture: linear-gradient(to right, var(--paper-grid-line-major) 1px, transparent 1px), linear-gradient(to bottom, var(--paper-grid-line) 1px, transparent 1px);
    }`;
    const goodCards = `@layer components {
        .paper-grid { background-image: var(--paper-grid-texture); background-blend-mode: multiply; }
        .dark .paper-grid { background-blend-mode: screen; }
    }
    @media (prefers-reduced-transparency: reduce) {
        .paper-grid { background-image: none; }
    }`;
    const goodVue = `const props = withDefaults(defineProps<Props>(), { grain: true, grid: false });
        // template: :data-grid="grid"  grid && 'paper-grid'
        interface Props { grain?: boolean; grid?: boolean; }`;
    // Reconstruct the template idioms the SFC carries (the self-test mirrors the
    // shipped Card.vue strings).
    const goodVueFull =
        goodVue +
        ` :data-grid="grid"  grid && 'paper-grid'`;

    let r = detectSource({ tokensCss: goodTokens, cardsCss: goodCards, cardVue: goodVueFull });
    ASSERT("sound fixture is green", r.violations.length === 0);

    // W1 bite — a hardcoded hsl() ink REDs.
    const badInkTokens = goodTokens.replace(
        "--paper-grid-line: color-mix(in srgb, var(--foreground) calc(var(--paper-grid-opacity) * 100%), transparent);",
        "--paper-grid-line: hsl(0 0% 50% / 0.08);",
    );
    r = detectSource({ tokensCss: badInkTokens, cardsCss: goodCards, cardVue: goodVueFull });
    ASSERT("W1 ink bite reds a hardcoded hsl() line", r.violations.some((v) => v.startsWith("W1 (ink bite)")));

    // W1 two-frequency bite — drop the major ink REDs.
    const uniformTokens = goodTokens.replace(/--paper-grid-line-major\s*:[\s\S]*?;/, "");
    r = detectSource({ tokensCss: uniformTokens, cardsCss: goodCards, cardVue: goodVueFull });
    ASSERT("W1 two-frequency bite reds a uniform grid", r.violations.some((v) => v.includes("two-frequency")));

    // W2 dark-arm bite — a scoped :global(.dark) REDs.
    const scopedDarkCards = goodCards.replace(".dark .paper-grid { background-blend-mode: screen; }", ":global(.dark) .paper-grid { background-blend-mode: screen; }");
    r = detectSource({ tokensCss: goodTokens, cardsCss: scopedDarkCards, cardVue: goodVueFull });
    ASSERT("W2 dark-arm bite reds a scoped :global(.dark)", r.violations.some((v) => v.startsWith("W2 (dark-arm bite)")));

    // W3 bite — drop the a11y block REDs.
    const noA11yCards = goodCards.replace(/@media\s*\(\s*prefers-reduced-transparency[\s\S]*?\}\s*\}/, "");
    r = detectSource({ tokensCss: goodTokens, cardsCss: noA11yCards, cardVue: goodVueFull });
    ASSERT("W3 bite reds a missing reduced-transparency guard", r.violations.some((v) => v.startsWith("W3:")));

    // W4 no-regression bite — a default-ON grid REDs.
    const defaultOnVue = goodVueFull.replace("grid: false", "grid: true");
    r = detectSource({ tokensCss: goodTokens, cardsCss: goodCards, cardVue: defaultOnVue });
    ASSERT("W4 no-regression bite reds a default-ON grid", r.violations.some((v) => v.startsWith("W4 (no-regression bite)")));

    // W4 additive bite — drop the grain axis REDs.
    const noGrainVue = goodVueFull.replace("grain: true,", "").replace("grain?: boolean;", "");
    r = detectSource({ tokensCss: goodTokens, cardsCss: goodCards, cardVue: noGrainVue });
    ASSERT("W4 additive bite reds a removed grain axis", r.violations.some((v) => v.includes("ADDITIVE")));

    if (failures.length > 0) {
        console.error("proof:paper-grid SELF-TEST FAILED:");
        for (const f of failures) console.error(`  ✗ ${f}`);
        process.exit(1);
    }
    console.log("proof:paper-grid SELF-TEST PASSED — all witnesses have teeth.");
    process.exit(0);
}

function run() {
    const { ROOT, ARTIFACT } = cliPaths();
    const { facts, violations } = detectSource(loadSources());
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "contract",
        command: "npm run proof:paper-grid",
        facts,
        violations,
    });

    console.log(
        "proof:paper-grid — the geometric paper-cascade peer + .paper-grid card-interior register (BB.W-PAPER-GRID-TEXTURE)",
    );
    console.log(`  W1 geometric peer (two-freq, fg-mix ink) : ${facts.w1 ? "YES" : "NO"}`);
    console.log(`  W2 .paper-grid utility + plain dark arm   : ${facts.w2 ? "YES" : "NO"}`);
    console.log(`  W3 reduced-transparency a11y guard        : ${facts.w3 ? "YES" : "NO"}`);
    console.log(`  W4 Card grid axis, default OFF, additive  : ${facts.w4 ? "YES" : "NO"}`);
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
    if (process.argv.includes("--self-test")) selfTest();
    else run();
}
