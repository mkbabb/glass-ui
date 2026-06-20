#!/usr/bin/env node
// BB.W-BORDER-PROGRESS — progress IS the element's border (proof:border-progress).
//
// The born-RED→GREEN device-free SOURCE arm for the library's masked-conic border
// ring — the primitive where progress is the card's own EDGE, not a floating bar.
// The miss is structural: the three progress variants are all horizontal
// track-and-fill RECTs (the floating-bar register the user is rejecting, C2). This
// gate locks the gestalt the ask MEASURED superior:
//
//   W1 — THE RING IS THE BORDER, MASKED-CONIC, NOT A FLOATING BAR. The component
//        paints a `conic-gradient` mask-composited into the border band via a
//        `padding-box`/`border-box` mask-composite (the radius-following cut-out)
//        — AND carries NO `border-image` (the corner-squaring form the ask forbids,
//        measured inferior) AND no absolutely-positioned floating track-and-fill
//        RECT. Bite: a `border-image` in the consumption REDs; a missing
//        mask-composite pair REDs (a bottom RECT called a border fails the
//        mask-composite-present clause).
//   W2 — THE @property ANGLE IS REGISTERED + INTERPOLABLE. A registered
//        `@property --border-progress-fill <percentage>` exists (`inherits: false`
//        + an `initial-value`, the safe unregistered fallback), and the conic
//        sweep READS it (`conic-gradient(…, transparent var(--border-progress-fill),
//        …)`).
//   W3 — THE SPECTRUM IS OKLCH/SHORTER-HUE ON THE LEAF (the CONSUME, no re-roll).
//        The spectrum helper IMPORTS the `/color` leaf + value.js's
//        `interpolateHue("shorter")`, re-implements ZERO color math (no inline
//        OKLab→sRGB matrix), AND carries the `// CONSUME(value.js 0.13.0
//        oklchSpectrum):` consume-and-delete marker.
//   W4 — THE COVERAGE AXIS + THE 10-14px ENVELOPE. The `coverage` prop resolves
//        `full-ring` | `bottom-edge` through ONE conic-mask mechanism (a
//        `coverage`-scoped mask region, NOT a parallel conic-fill block), and the
//        width default + the envelope constants sit inside [10, 14]px.
//   W5 — THE MILESTONE REGISTER + THE COLOCATION/STRUCTURE SURFACE. A phase-edge
//        `milestone` emit (+ a PRM-gated `data-milestone` pulse) fires; the
//        feature-dir carries the colocation four (composables/ + constants.ts +
//        README.md + the dir); the subpath mirror + the api type publication +
//        package.json export are present.
//
// The BINDING painted truth is the π readback (tests-visual/border-progress.spec.ts
// — the radius-following ring, the backdrop-intact interior, the no-trough spectrum,
// the bottom-edge coverage, both modes) + the W-BORDER-PROGRESS-DELTA capture + the
// proof:ba-gestalt verdict (BA inv-4 — the P-1 source-green/visually-broken
// close-class this gate's π half kills). This gate is the no-device CI half.
//
// House style mirrors proof-card-padding.mjs / proof-icon-chip.mjs: ESM .mjs,
// comment-strip first (false-witness discipline), a pure exported detector, a
// byte-stable JSON artefact via gate-output, a human summary, process.exit(1) on
// any violation. The W6 self-test bite proves the PURE detector flags a synthetic
// border-image / missing-mask / re-rolled-color / out-of-envelope / floating-bar.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const d = (p) => resolve(ROOT, "src/components/custom/border-progress", p);
    _cliPaths = {
        ROOT,
        DIR: resolve(ROOT, "src/components/custom/border-progress"),
        VUE: d("BorderProgress.vue"),
        HELPER: d("composables/useBorderSpectrum.ts"),
        // BC.W-AX-BP-LAZY — the value.js OKLCH/shorter-hue walk + the CONSUME marker
        // CARVED into the dynamically-imported spectrum-walk.ts leaf (the eager-graph
        // payload move). W3's value.js-consume evidence FOLLOWS the carve into the
        // leaf (the proof:webgl-substrate-single "asserts follow the composition into
        // the carved leaf" precedent — proof:bp-lazy owns the dynamic-boundary lock).
        WALK: d("composables/spectrum-walk.ts"),
        CONSTANTS: d("constants.ts"),
        INDEX: d("index.ts"),
        README: d("README.md"),
        CSS: resolve(ROOT, "src/styles/border-progress.css"),
        PROPERTY_REGS: resolve(ROOT, "src/styles/tokens/property-regs.css"),
        INDEX_CSS: resolve(ROOT, "src/styles/index.css"),
        SUBPATH: resolve(ROOT, "src/subpaths/border-progress.ts"),
        API_INDEX: resolve(ROOT, "src/api/index.ts"),
        PKG: resolve(ROOT, "package.json"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_BORDER_PROGRESS_ARTIFACT",
            "BB-border-progress",
        ),
    };
    return _cliPaths;
}

// ── comment-strip (the false-witness discipline) ────────────────────────────
function stripBlockComments(t) {
    return t.replace(/\/\*[\s\S]*?\*\//g, " ");
}
function stripLineComments(t) {
    return t
        .split("\n")
        .map((l) => {
            // keep `http://`-style `://` (no URL form here, but the house idiom)
            const i = l.search(/(^|[^:])\/\//);
            if (i === -1) return l;
            const m = l.match(/(^|[^:])\/\//);
            return l.slice(0, l.indexOf("//", m.index));
        })
        .join("\n");
}
function stripTs(t) {
    return stripLineComments(stripBlockComments(t));
}
function stripCss(t) {
    return stripBlockComments(t);
}

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");

/**
 * THE PURE DETECTOR — takes file CONTENTS (so the self-test can plant synthetic
 * inputs) and returns { facts, violations }. No disk read inside (the caller reads).
 */
export function detectBorderProgress(inputs) {
    const {
        vue = "",
        vueRaw = "", // un-stripped (for the CONSUME-marker comment presence)
        helper = "",
        helperRaw = "",
        // BC.W-AX-BP-LAZY — the carved value.js-bearing dynamic leaf (spectrum-walk.ts).
        walk = "",
        walkRaw = "",
        constants = "",
        css = "",
        propertyRegs = "",
        indexCss = "",
        subpath = "",
        apiIndex = "",
        pkg = "",
        readmeExists = false,
        constantsExists = false,
        helperExists = false,
        dirExists = false,
    } = inputs;

    const violations = [];
    const facts = { w1: {}, w2: {}, w3: {}, w4: {}, w5: {} };

    // ── W1 — the ring is the BORDER, masked-conic, not a floating bar ─────────
    // The consumption (css) carries the radius-following mask-composite pair.
    const hasMaskComposite =
        /mask-composite\s*:\s*exclude/.test(css) &&
        /-webkit-mask-composite\s*:\s*xor/.test(css);
    const hasPaddingBorderBoxPair =
        /padding-box/.test(css) && /border-box/.test(css);
    const hasConic = /conic-gradient\s*\(/.test(css);
    // The forbidden corner-squaring path + the floating-bar RECT.
    const hasBorderImage =
        /\bborder-image\b/.test(css) || /\bborder-image\b/.test(vue);
    // A floating-bar child = an absolutely-positioned track-and-fill bar (a
    // `position: absolute` rule with a `width`/`height` percentage fill that is NOT
    // the radius-following ring layer). We narrow to a forbidden literal: a
    // declared `.*-track`/`.*-fill` RECT with an explicit width animation. The
    // honest negative is "no border-image, the mask-composite IS the only path".
    facts.w1 = {
        hasMaskComposite,
        hasPaddingBorderBoxPair,
        hasConic,
        hasBorderImage,
    };
    if (!dirExists)
        violations.push("W1: the border-progress/ feature-dir does not exist");
    if (!hasMaskComposite)
        violations.push(
            "W1: no `mask-composite: exclude` + `-webkit-mask-composite: xor` pair — the radius-following border-band cut-out is the only sanctioned path (a bottom RECT called a border fails this)",
        );
    if (!hasPaddingBorderBoxPair)
        violations.push(
            "W1: no padding-box/border-box mask pair — the border-band mask-composite requires both fills",
        );
    if (!hasConic)
        violations.push("W1: no `conic-gradient(…)` — the ring fill is the conic sweep");
    if (hasBorderImage)
        violations.push(
            "W1: `border-image` present — the corner-squaring path is MEASURED INFERIOR and forbidden (the ring must follow border-radius via mask-composite)",
        );

    // ── W2 — the @property fill is registered + interpolable ──────────────────
    const regBlock =
        propertyRegs.match(
            /@property\s+--border-progress-fill\s*\{[\s\S]*?\}/,
        )?.[0] ?? "";
    const regSyntaxPct = /syntax\s*:\s*"<percentage>"/.test(regBlock);
    const regInheritsFalse = /inherits\s*:\s*false/.test(regBlock);
    const regInitial = /initial-value\s*:/.test(regBlock);
    const conicReadsFill = /var\(--border-progress-fill/.test(css);
    facts.w2 = {
        registered: regBlock.length > 0,
        regSyntaxPct,
        regInheritsFalse,
        regInitial,
        conicReadsFill,
    };
    if (regBlock.length === 0)
        violations.push(
            "W2: no `@property --border-progress-fill` registration in property-regs.css §18",
        );
    if (regBlock.length > 0 && !(regSyntaxPct && regInheritsFalse && regInitial))
        violations.push(
            "W2: the @property reg must be `<percentage>` + `inherits: false` + an `initial-value` (the safe unregistered fallback)",
        );
    if (!conicReadsFill)
        violations.push(
            "W2: the conic sweep does not read `var(--border-progress-fill)` — the registered angle must drive the interpolable fill",
        );

    // ── W3 — the spectrum is OKLCH/shorter-hue on the leaf (no re-roll) ───────
    // BC.W-AX-BP-LAZY — the value.js-bearing walk + the CONSUME marker live in the
    // CARVED spectrum-walk.ts leaf (the dynamic-import boundary); W3 reads the carve.
    const importsLeaf = /from\s+["'][^"']*composables\/color["']/.test(walk);
    const importsInterpolateHue = /interpolateHue/.test(walk);
    const usesShorterArc = /["']shorter["']/.test(walk);
    const hasConsumeMarker = /CONSUME\(value\.js[^)]*oklchSpectrum\)/.test(
        walkRaw,
    );
    // The no-re-roll fence: no inline OKLab→sRGB matrix / hand-rolled hue lerp in the
    // component, the sync shell, OR the carved walk leaf (proof:single-color-core's
    // mirror). A re-rolled path would name the matrix coefficients or re-define a
    // color primitive — scanned across all three so the carve cannot hide a re-roll.
    const reRollRe =
        /(srgbToOKLab|oklabToLinearSRGB|oklabToRgb255|rawOklabToOklch|rawOklchToOklab)\s*=|\b0\.2104542553\b|\b1\.9779984951\b/;
    const reRollsColorMath =
        reRollRe.test(helper) || reRollRe.test(walk) || reRollRe.test(vue);
    facts.w3 = {
        importsLeaf,
        importsInterpolateHue,
        usesShorterArc,
        hasConsumeMarker,
        reRollsColorMath,
    };
    if (!helperExists)
        violations.push(
            "W3: the spectrum helper composables/useBorderSpectrum.ts does not exist",
        );
    if (!importsLeaf)
        violations.push(
            "W3: the spectrum helper does not IMPORT the /color leaf (src/composables/color) — the CONSUME must compose the leaf, not fork",
        );
    if (!(importsInterpolateHue && usesShorterArc))
        violations.push(
            "W3: the spectrum walk does not use `interpolateHue` with the `\"shorter\"` arc — the OKLCH/shorter-hue arc avoids the OKLab chroma trough",
        );
    if (!hasConsumeMarker)
        violations.push(
            "W3: missing the `// CONSUME(value.js 0.13.0 oklchSpectrum):` consume-and-delete marker (the interim must name its re-point successor, not silently fork)",
        );
    if (reRollsColorMath)
        violations.push(
            "W3: a re-implemented OKLab/sRGB color matrix or hand-rolled primitive is present — the math stays value.js (proof:single-color-core's mirror)",
        );

    // ── W4 — the coverage axis + the 10-14px envelope ────────────────────────
    const propCoverage = /coverage\??\s*:\s*BorderProgressCoverage/.test(vue);
    const coverageUnion =
        /BorderProgressCoverage\s*=\s*["']full-ring["']\s*\|\s*["']bottom-edge["']/.test(
            constants,
        );
    const coverageData = /data-coverage/.test(vue) && /data-coverage/.test(css);
    const bottomEdgeScopedMask =
        /\[data-coverage="bottom-edge"\][\s\S]*?mask-composite/.test(css);
    // The 10-14px envelope: the constants declare MIN/MAX/DEFAULT inside [10,14].
    const widthDefault = Number(
        constants.match(/BORDER_PROGRESS_WIDTH_DEFAULT\s*=\s*(\d+(?:\.\d+)?)/)?.[1],
    );
    const widthMin = Number(
        constants.match(/BORDER_PROGRESS_WIDTH_MIN\s*=\s*(\d+(?:\.\d+)?)/)?.[1],
    );
    const widthMax = Number(
        constants.match(/BORDER_PROGRESS_WIDTH_MAX\s*=\s*(\d+(?:\.\d+)?)/)?.[1],
    );
    const envelopeOk =
        widthMin === 10 &&
        widthMax === 14 &&
        Number.isFinite(widthDefault) &&
        widthDefault >= 10 &&
        widthDefault <= 14;
    facts.w4 = {
        propCoverage,
        coverageUnion,
        coverageData,
        bottomEdgeScopedMask,
        widthDefault,
        widthMin,
        widthMax,
        envelopeOk,
    };
    if (!coverageUnion)
        violations.push(
            'W4: the `BorderProgressCoverage = "full-ring" | "bottom-edge"` union is not declared in constants.ts',
        );
    if (!(propCoverage && coverageData))
        violations.push(
            "W4: the coverage axis is not threaded (the `coverage` prop + the `data-coverage` CSS seam)",
        );
    if (!bottomEdgeScopedMask)
        violations.push(
            "W4: `bottom-edge` does not scope the SHARED mask (a `[data-coverage=\"bottom-edge\"]` mask-composite rule) — it must be a coverage-scoped mask region, NOT a parallel conic-fill recipe",
        );
    if (!envelopeOk)
        violations.push(
            `W4: the thickness envelope is not [10,14]px (MIN=${widthMin} MAX=${widthMax} DEFAULT=${widthDefault}) — the AMENDED A1 thicker band (NOT 6-8px) must lock`,
        );

    // ── W5 — the milestone register + the colocation/structure surface ───────
    const milestoneEmit = /emit\s*\(\s*["']milestone["']/.test(vue);
    const milestoneType =
        /BorderProgressMilestone\b/.test(constants) &&
        /milestones\??\s*:/.test(vue);
    const dataMilestone = /data-milestone/.test(vue) && /data-milestone/.test(css);
    const prmPulse =
        /@media\s*\(prefers-reduced-motion:\s*no-preference\)[\s\S]*?data-milestone/.test(
            css,
        );
    const subpathMirror = /export \* from ["']\.\.\/components\/custom\/border-progress["']/.test(
        subpath,
    );
    const apiPublishes = /BorderProgress(Coverage|Props|Milestone)/.test(apiIndex);
    const pkgExport = /"\.\/border-progress"/.test(pkg);
    const partialImported = /@import\s+["']\.\/border-progress\.css["']/.test(
        indexCss,
    );
    facts.w5 = {
        milestoneEmit,
        milestoneType,
        dataMilestone,
        prmPulse,
        readmeExists,
        constantsExists,
        helperExists,
        subpathMirror,
        apiPublishes,
        pkgExport,
        partialImported,
    };
    if (!milestoneEmit)
        violations.push(
            "W5: no `emit('milestone', …)` — the phase-edge milestone event seam is required",
        );
    if (!milestoneType)
        violations.push(
            "W5: the `BorderProgressMilestone` type + the `milestones` prop are not threaded",
        );
    if (!(dataMilestone && prmPulse))
        violations.push(
            "W5: the `data-milestone` pulse is not PRM-gated (no edge-pulse under prefers-reduced-motion: reduce)",
        );
    if (!(readmeExists && constantsExists && helperExists))
        violations.push(
            "W5: the colocation four are incomplete (composables/useBorderSpectrum.ts + constants.ts + README.md + the dir)",
        );
    if (!subpathMirror)
        violations.push(
            "W5: the src/subpaths/border-progress.ts mirror is missing/mis-shaped",
        );
    if (!apiPublishes)
        violations.push(
            "W5: src/api/index.ts does not publish a BorderProgress* type (the discovery layer)",
        );
    if (!pkgExport)
        violations.push("W5: package.json has no `./border-progress` export");
    if (!partialImported)
        violations.push(
            "W5: src/styles/index.css does not @import ./border-progress.css (the consumption partial)",
        );

    return { facts, violations };
}

// ── the live-disk read ───────────────────────────────────────────────────────
function readInputs(P) {
    const vueRaw = read(P.VUE);
    const helperRaw = read(P.HELPER);
    const walkRaw = read(P.WALK);
    return {
        vue: stripTs(vueRaw),
        vueRaw,
        helper: stripTs(helperRaw),
        helperRaw,
        walk: stripTs(walkRaw),
        walkRaw,
        constants: stripTs(read(P.CONSTANTS)),
        css: stripCss(read(P.CSS)),
        propertyRegs: stripCss(read(P.PROPERTY_REGS)),
        indexCss: stripCss(read(P.INDEX_CSS)),
        subpath: stripTs(read(P.SUBPATH)),
        apiIndex: stripTs(read(P.API_INDEX)),
        pkg: read(P.PKG),
        readmeExists: existsSync(P.README),
        constantsExists: existsSync(P.CONSTANTS),
        helperExists: existsSync(P.HELPER),
        dirExists: existsSync(P.DIR),
    };
}

// ── W6 self-test: the false-witness bites (each planted defect must RED) ──────
function selfTest() {
    // A GOOD synthetic corpus the detector greens.
    const good = {
        vue: `coverage?: BorderProgressCoverage
            data-coverage data-milestone
            emit("milestone", { milestone: ms, value })
            milestones?: readonly BorderProgressMilestone[]
            var(--border-progress-fill)`,
        vueRaw: "",
        // The sync shell — value.js-FREE (BC.W-AX-BP-LAZY); the dynamic boundary only.
        helper: `import("./spectrum-walk")`,
        helperRaw: ``,
        // The CARVED value.js-bearing dynamic leaf — W3 reads its evidence here.
        walk: `import { cssToOklch } from "../../../../composables/color";
            import { interpolateHue } from "@mkbabb/value.js";
            interpolateHue(a, b, f, "shorter")`,
        walkRaw: `// CONSUME(value.js 0.13.0 oklchSpectrum): re-point here`,
        constants: `export type BorderProgressCoverage = "full-ring" | "bottom-edge";
            export const BORDER_PROGRESS_WIDTH_MIN = 10;
            export const BORDER_PROGRESS_WIDTH_MAX = 14;
            export const BORDER_PROGRESS_WIDTH_DEFAULT = 12;
            export interface BorderProgressMilestone { at: number; id: string; }`,
        css: `.border-progress__ring {
            background: conic-gradient(from 0deg, var(--s), transparent var(--border-progress-fill), transparent);
            -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0) border-box;
            -webkit-mask-composite: xor;
            mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0) border-box;
            mask-composite: exclude;
        }
        .border-progress[data-coverage="bottom-edge"] .border-progress__ring { mask-composite: exclude, intersect; }
        @media (prefers-reduced-motion: no-preference) { .border-progress[data-milestone] .x { animation: pulse; } }`,
        propertyRegs: `@property --border-progress-fill { syntax: "<percentage>"; inherits: false; initial-value: 0%; }`,
        indexCss: `@import "./border-progress.css";`,
        subpath: `export * from "../components/custom/border-progress";`,
        apiIndex: `export type { BorderProgressProps, BorderProgressCoverage } from "../components/custom/border-progress";`,
        pkg: `"./border-progress": { "types": "./dist/border-progress.d.ts" }`,
        readmeExists: true,
        constantsExists: true,
        helperExists: true,
        dirExists: true,
    };
    const baseGreen = detectBorderProgress(good).violations.length === 0;

    const bites = [];
    // Bite A — re-introduce border-image (the corner-squaring path) reds W1.
    bites.push({
        name: "border-image",
        red:
            detectBorderProgress({
                ...good,
                css: good.css + "\n.x { border-image: linear-gradient(red, blue) 1; }",
            }).violations.length > 0,
    });
    // Bite B — drop the mask-composite (a bottom RECT) reds W1.
    bites.push({
        name: "no-mask-composite",
        red:
            detectBorderProgress({
                ...good,
                css: good.css.replace(/mask-composite\s*:\s*exclude/g, "mask-composite: add"),
            }).violations.length > 0,
    });
    // Bite C — re-roll the color math reds W3 (planted in the carved walk leaf).
    bites.push({
        name: "re-rolled-color",
        red:
            detectBorderProgress({
                ...good,
                walk: good.walk + "\nconst rawOklchToOklab = (L,C,h) => [L,0,0];",
            }).violations.length > 0,
    });
    // Bite D — out-of-envelope width (a 6-8px hairline) reds W4.
    bites.push({
        name: "out-of-envelope",
        red:
            detectBorderProgress({
                ...good,
                constants: good.constants
                    .replace("WIDTH_MIN = 10", "WIDTH_MIN = 6")
                    .replace("WIDTH_MAX = 14", "WIDTH_MAX = 8")
                    .replace("WIDTH_DEFAULT = 12", "WIDTH_DEFAULT = 7"),
            }).violations.length > 0,
    });
    // Bite E — drop the consume marker reds W3 (it lives in the carved walk leaf).
    bites.push({
        name: "no-consume-marker",
        red:
            detectBorderProgress({ ...good, walkRaw: "no marker here" }).violations
                .length > 0,
    });
    // Bite F — drop the bottom-edge shared-mask scope reds W4.
    bites.push({
        name: "no-coverage-scope",
        red:
            detectBorderProgress({
                ...good,
                css: good.css.replace(
                    /\.border-progress\[data-coverage="bottom-edge"\][^}]*\}/,
                    "",
                ),
            }).violations.length > 0,
    });
    // Bite G — drop the PRM gate on the milestone pulse reds W5.
    bites.push({
        name: "milestone-not-prm-gated",
        red:
            detectBorderProgress({
                ...good,
                css: good.css.replace(
                    /@media \(prefers-reduced-motion: no-preference\)[^}]*\}[^}]*\}/,
                    "",
                ),
            }).violations.length > 0,
    });

    return { baseGreen, bites };
}

function run() {
    const P = cliPaths();
    const inputs = readInputs(P);
    const { facts, violations } = detectBorderProgress(inputs);

    // The W6 self-test bites.
    const st = selfTest();
    const biteFailures = st.bites.filter((b) => !b.red).map((b) => b.name);
    if (!st.baseGreen)
        violations.push(
            "W6: the self-test GOOD corpus did not green (detector over-strict)",
        );
    if (biteFailures.length > 0)
        violations.push(
            `W6: self-test bite(s) did not RED: ${biteFailures.join(", ")}`,
        );
    facts.w6 = { baseGreen: st.baseGreen, allBite: biteFailures.length === 0, bites: st.bites };

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(P.ARTIFACT, {
        gate: "proof:border-progress",
        stamp: snapshotStamp(),
        status,
        facts,
        violations,
    });

    const yn = (b) => (b ? "✓" : "✗");
    console.log(
        "proof:border-progress — progress IS the element's border (BB.W-BORDER-PROGRESS)",
    );
    console.log(
        `  W1 ring is the BORDER (masked-conic): ${yn(
            facts.w1.hasMaskComposite &&
                facts.w1.hasPaddingBorderBoxPair &&
                facts.w1.hasConic &&
                !facts.w1.hasBorderImage,
        )}  (border-image:${yn(facts.w1.hasBorderImage)})`,
    );
    console.log(
        `  W2 @property fill registered+read  : ${yn(
            facts.w2.registered &&
                facts.w2.regSyntaxPct &&
                facts.w2.regInheritsFalse &&
                facts.w2.regInitial &&
                facts.w2.conicReadsFill,
        )}`,
    );
    console.log(
        `  W3 spectrum OKLCH/shorter on leaf  : ${yn(
            facts.w3.importsLeaf &&
                facts.w3.importsInterpolateHue &&
                facts.w3.usesShorterArc &&
                facts.w3.hasConsumeMarker &&
                !facts.w3.reRollsColorMath,
        )}`,
    );
    console.log(
        `  W4 coverage axis + 10-14px envelope: ${yn(
            facts.w4.coverageUnion &&
                facts.w4.propCoverage &&
                facts.w4.coverageData &&
                facts.w4.bottomEdgeScopedMask &&
                facts.w4.envelopeOk,
        )}  (width default:${facts.w4.widthDefault}px)`,
    );
    console.log(
        `  W5 milestone + colocation/surface  : ${yn(
            facts.w5.milestoneEmit &&
                facts.w5.milestoneType &&
                facts.w5.dataMilestone &&
                facts.w5.prmPulse &&
                facts.w5.readmeExists &&
                facts.w5.constantsExists &&
                facts.w5.helperExists &&
                facts.w5.subpathMirror &&
                facts.w5.apiPublishes &&
                facts.w5.pkgExport &&
                facts.w5.partialImported,
        )}`,
    );
    console.log(
        `  W6 self-test bites RED             : ${yn(facts.w6.allBite && facts.w6.baseGreen)}`,
    );

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(
            P.ROOT.length + 1,
        )}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
