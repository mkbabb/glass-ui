#!/usr/bin/env node
// proof:deps-currency — the BH.B5a-deps-currency gate.
//
// Two deliverables, one gate:
//   (A) the build-infra GOD-MODULE carve: vite.style-assets.ts (566 lines) split
//       into three cohesive sub-plugin modules the orchestrator composes IN ORDER
//       (byte-identical build — the paint-class H mechanical carve): style-fold
//       (copy + SFC-fold + font-inline + webkit), utility-emit (P9 component-utility
//       RULES), critical-split (BB.W-CSS-CRITICAL critical/deferred partition).
//       proof:no-god-module walks src/ ONLY, so a repo-root build god-module rides
//       past it — THIS gate is the build-infra bound.
//   (B) the deps-currency + shadcn-vue verdict recorded in docs/canon, and the
//       components.json baseColor fixed off the cool `slate` base (BA.W-NO-GRAY warm
//       identity) onto shadcn's warm-neutral `stone`.
//
// Pure FS, device-free. Born-RED on HEAD (566-line god-module + sub-plugins absent +
// baseColor: slate + the doc absent) → GREEN on the carve + the baseColor fix + the
// doc, with per-clause self-test bites (each synthetic sabotage REDs its clause).
//
// Asserts:
//   S1 — vite.style-assets.ts is a THIN orchestrator (≤ 200 lines), not the god-module.
//   S2 — the three sub-plugins exist on disk AND each is ≤ 500 lines.
//   S3 — each sub-plugin EXPORTS its function(s): style-fold →
//        copyStyleAssets/foldSfcBundle/inlineFonts/injectWebkitBackdrop/atSourceIndex;
//        utility-emit → emitComponentUtilities; critical-split → emitCriticalDeferredSplit.
//   S4 — publishStyleAssets stays exported from the orchestrator AND both configs
//        (vite.config.ts + vite.iter.config.ts) still import it (byte-identical plugin
//        surface — the two configs never changed).
//   S5 — the orchestrator COMPOSES the three sub-plugins (imports all three) AND does
//        NOT re-DEFINE the carved bodies (emitComponentUtilities/emitCriticalDeferredSplit
//        are DEFINITION-ABSENT from vite.style-assets.ts — the carve is real, no copy).
//   D1 — docs/canon/deps-currency.md exists + records the currency posture AS a markdown
//        TABLE (the dependencies.md table-form lesson) + the shadcn-vue verdict.
//   D2 — components.json baseColor is NOT `slate` (the warm-base fix landed).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:deps-currency";
const SELF_TEST = process.argv.includes("--self-test");

const ORCHESTRATOR_LIMIT = 200;
const SUB_LIMIT = 500;

const ORCHESTRATOR = resolve(ROOT, "vite.style-assets.ts");
const STYLE_FOLD = resolve(ROOT, "vite.style-fold.ts");
const UTILITY_EMIT = resolve(ROOT, "vite.utility-emit.ts");
const CRITICAL_SPLIT = resolve(ROOT, "vite.critical-split.ts");
const VITE_CONFIG = resolve(ROOT, "vite.config.ts");
const VITE_ITER_CONFIG = resolve(ROOT, "vite.iter.config.ts");
const COMPONENTS_JSON = resolve(ROOT, "components.json");
const DEPS_DOC = resolve(ROOT, "docs/canon/deps-currency.md");

function read(p) {
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// Line count = the proof:no-god-module lineCount (split on "\n", drop a trailing
// empty segment from a final newline — matches `wc -l`).
function lineCount(text) {
    if (text.length === 0) return 0;
    const parts = text.split("\n");
    if (parts[parts.length - 1] === "") parts.pop();
    return parts.length;
}

function exportsFn(src, name) {
    return new RegExp(`export\\s+(?:async\\s+)?function\\s+${name}\\b`).test(src);
}

// A DEFINITION of a named function (the copy-not-carve breach for S5): the body
// lives inline in the orchestrator rather than being imported from a sub-plugin.
function definesFn(src, name) {
    return new RegExp(`(?:^|\\n)\\s*(?:export\\s+)?(?:async\\s+)?function\\s+${name}\\b`).test(
        src,
    );
}

// A real markdown table: a header pipe-row followed by a `|---|---|` delimiter row
// (the citedDeps parser shape — a prose/bullet list does NOT satisfy this).
function hasMarkdownTable(src) {
    return /^\s*\|.*\|.*$\n^\s*\|[\s:|-]*-[\s:|-]*\|.*$/m.test(src);
}

// ── The detector — runs over a SOURCE MAP so a self-test can sabotage inputs. ──
function detect(overrides = {}) {
    const violations = [];
    const facts = {};
    function assert(label, ok) {
        facts[label] = Boolean(ok);
        if (!ok) violations.push(label);
    }

    const orchestratorSrc = overrides.orchestratorText ?? read(ORCHESTRATOR);
    const styleFoldSrc =
        overrides.styleFoldSource ??
        ((overrides.styleFoldExists ?? existsSync(STYLE_FOLD))
            ? read(STYLE_FOLD)
            : "");
    const utilityEmitSrc =
        overrides.utilityEmitSource ??
        ((overrides.utilityEmitExists ?? existsSync(UTILITY_EMIT))
            ? read(UTILITY_EMIT)
            : "");
    const criticalSplitSrc =
        overrides.criticalSplitSource ??
        ((overrides.criticalSplitExists ?? existsSync(CRITICAL_SPLIT))
            ? read(CRITICAL_SPLIT)
            : "");
    const viteConfigSrc = overrides.viteConfigText ?? read(VITE_CONFIG);
    const viteIterSrc = overrides.viteIterConfigText ?? read(VITE_ITER_CONFIG);
    const componentsJson = overrides.componentsJson ?? read(COMPONENTS_JSON);
    const depsDoc = overrides.depsDoc ?? read(DEPS_DOC);

    // ── S1 — the orchestrator is thin (≤ 200 lines). ──
    const orchestratorLines = lineCount(orchestratorSrc);
    facts.orchestratorLines = orchestratorLines;
    assert(
        "S1 — vite.style-assets.ts is a thin orchestrator (≤ 200 lines), not the 566-line god-module",
        orchestratorLines > 0 && orchestratorLines <= ORCHESTRATOR_LIMIT,
    );

    // ── S2 — the three sub-plugins exist AND each ≤ 500 lines. ──
    const styleFoldExists =
        overrides.styleFoldExists ??
        (overrides.styleFoldSource !== undefined || existsSync(STYLE_FOLD));
    const utilityEmitExists =
        overrides.utilityEmitExists ??
        (overrides.utilityEmitSource !== undefined || existsSync(UTILITY_EMIT));
    const criticalSplitExists =
        overrides.criticalSplitExists ??
        (overrides.criticalSplitSource !== undefined ||
            existsSync(CRITICAL_SPLIT));
    const subLines = {
        styleFold: lineCount(styleFoldSrc),
        utilityEmit: lineCount(utilityEmitSrc),
        criticalSplit: lineCount(criticalSplitSrc),
    };
    facts.subPlugins = {
        styleFoldExists,
        utilityEmitExists,
        criticalSplitExists,
        ...subLines,
    };
    assert(
        "S2 — the three sub-plugins (vite.style-fold/utility-emit/critical-split) exist AND each is ≤ 500 lines",
        styleFoldExists &&
            utilityEmitExists &&
            criticalSplitExists &&
            subLines.styleFold <= SUB_LIMIT &&
            subLines.utilityEmit <= SUB_LIMIT &&
            subLines.criticalSplit <= SUB_LIMIT,
    );

    // ── S3 — each sub-plugin EXPORTS its function(s). ──
    const styleFoldExports =
        exportsFn(styleFoldSrc, "copyStyleAssets") &&
        exportsFn(styleFoldSrc, "foldSfcBundle") &&
        exportsFn(styleFoldSrc, "inlineFonts") &&
        exportsFn(styleFoldSrc, "injectWebkitBackdrop") &&
        exportsFn(styleFoldSrc, "atSourceIndex");
    const utilityEmitExports = exportsFn(utilityEmitSrc, "emitComponentUtilities");
    const criticalSplitExports = exportsFn(
        criticalSplitSrc,
        "emitCriticalDeferredSplit",
    );
    facts.subExports = {
        styleFoldExports,
        utilityEmitExports,
        criticalSplitExports,
    };
    assert(
        "S3 — each sub-plugin exports its function(s) (style-fold: copy/fold/inline/webkit/atSource; utility-emit: emitComponentUtilities; critical-split: emitCriticalDeferredSplit)",
        styleFoldExports && utilityEmitExports && criticalSplitExports,
    );

    // ── S4 — publishStyleAssets stays exported AND both configs import it. ──
    const orchestratorExportsPlugin = exportsFn(
        orchestratorSrc,
        "publishStyleAssets",
    );
    const configImports = /import\s*\{\s*publishStyleAssets\s*\}\s*from\s*"\.\/vite\.style-assets"/;
    const configUsesPlugin =
        configImports.test(viteConfigSrc) && configImports.test(viteIterSrc);
    facts.pluginSurface = { orchestratorExportsPlugin, configUsesPlugin };
    assert(
        "S4 — publishStyleAssets stays exported from the orchestrator AND both vite configs import it (byte-identical plugin surface)",
        orchestratorExportsPlugin && configUsesPlugin,
    );

    // ── S5 — the orchestrator COMPOSES the three sub-plugins AND re-DEFINES no carved
    // body (the carve is real, not a copy). ──
    const importsStyleFold = /from\s*"\.\/vite\.style-fold"/.test(orchestratorSrc);
    const importsUtilityEmit = /from\s*"\.\/vite\.utility-emit"/.test(
        orchestratorSrc,
    );
    const importsCriticalSplit = /from\s*"\.\/vite\.critical-split"/.test(
        orchestratorSrc,
    );
    const redefinesCarvedBody =
        definesFn(orchestratorSrc, "emitComponentUtilities") ||
        definesFn(orchestratorSrc, "emitCriticalDeferredSplit");
    facts.composition = {
        importsStyleFold,
        importsUtilityEmit,
        importsCriticalSplit,
        redefinesCarvedBody,
    };
    assert(
        "S5 — the orchestrator imports all three sub-plugins AND re-defines no carved body (emitComponentUtilities/emitCriticalDeferredSplit DEFINITION-ABSENT — a real carve, not a copy)",
        importsStyleFold &&
            importsUtilityEmit &&
            importsCriticalSplit &&
            !redefinesCarvedBody,
    );

    // ── D1 — the deps-currency + shadcn verdict doc exists + carries a markdown table
    // + records the shadcn-vue verdict. ──
    const docTable = hasMarkdownTable(depsDoc);
    const docShadcn =
        /shadcn-vue/i.test(depsDoc) && /components\.json/i.test(depsDoc);
    const docVerdict = /baseColor/i.test(depsDoc) && /stone/i.test(depsDoc);
    facts.docArm = {
        docExists: depsDoc.length > 0,
        docTable,
        docShadcn,
        docVerdict,
    };
    assert(
        "D1 — docs/canon/deps-currency.md exists + records the currency posture AS a markdown table + the shadcn-vue verdict (keep components.json, baseColor→stone)",
        depsDoc.length > 0 && docTable && docShadcn && docVerdict,
    );

    // ── D2 — components.json baseColor is NOT `slate`. ──
    let baseColor = null;
    try {
        baseColor = JSON.parse(componentsJson)?.tailwind?.baseColor ?? null;
    } catch {
        baseColor = null;
    }
    facts.baseColor = baseColor;
    assert(
        "D2 — components.json baseColor is NOT `slate` (the warm-base fix landed)",
        baseColor !== null && baseColor !== "slate",
    );

    return { facts, violations };
}

// ── The self-test bites (anti-vacuity / born-RED demonstration). ──
function selfTest() {
    let flagged = 0;
    const sab = (overrides, label, name) => {
        const { violations } = detect(overrides);
        if (violations.includes(label)) flagged++;
        else
            throw new Error(
                `[proof:deps-currency self-test] the bite FAILED to flag: ${name}`,
            );
    };
    const sabNot = (overrides, label, name) => {
        const { violations } = detect(overrides);
        if (!violations.includes(label)) flagged++;
        else
            throw new Error(
                `[proof:deps-currency self-test] the fence bite WRONGLY flagged: ${name}`,
            );
    };

    const S1 =
        "S1 — vite.style-assets.ts is a thin orchestrator (≤ 200 lines), not the 566-line god-module";
    const S2 =
        "S2 — the three sub-plugins (vite.style-fold/utility-emit/critical-split) exist AND each is ≤ 500 lines";
    const S3 =
        "S3 — each sub-plugin exports its function(s) (style-fold: copy/fold/inline/webkit/atSource; utility-emit: emitComponentUtilities; critical-split: emitCriticalDeferredSplit)";
    const S4 =
        "S4 — publishStyleAssets stays exported from the orchestrator AND both vite configs import it (byte-identical plugin surface)";
    const S5 =
        "S5 — the orchestrator imports all three sub-plugins AND re-defines no carved body (emitComponentUtilities/emitCriticalDeferredSplit DEFINITION-ABSENT — a real carve, not a copy)";
    const D1 =
        "D1 — docs/canon/deps-currency.md exists + records the currency posture AS a markdown table + the shadcn-vue verdict (keep components.json, baseColor→stone)";
    const D2 =
        "D2 — components.json baseColor is NOT `slate` (the warm-base fix landed)";

    // S1: the un-carved 566-line god-module.
    sab({ orchestratorText: "x\n".repeat(566) }, S1, "S1 orchestrator over 200 lines");
    // S2: a sub-plugin absent.
    sab({ styleFoldExists: false, styleFoldSource: "" }, S2, "S2 style-fold absent");
    // S2: a sub-plugin over the 500-line bound.
    sab({ criticalSplitSource: "y\n".repeat(501) }, S2, "S2 critical-split over 500 lines");
    // S3: a sub-plugin drops an export.
    sab(
        { utilityEmitSource: "// no emitComponentUtilities export" },
        S3,
        "S3 utility-emit drops its export",
    );
    // S4: a config drops the plugin import.
    sab({ viteIterConfigText: "// no publishStyleAssets import" }, S4, "S4 iter config drops the import");
    // S5: the orchestrator re-DEFINES a carved body (the copy breach).
    sab(
        {
            orchestratorText:
                'import { copyStyleAssets, foldSfcBundle, inlineFonts, injectWebkitBackdrop } from "./vite.style-fold";\n' +
                'import { x } from "./vite.utility-emit";\n' +
                'import { y } from "./vite.critical-split";\n' +
                "function emitCriticalDeferredSplit() {}\n" +
                "export function publishStyleAssets() {}\n",
        },
        S5,
        "S5 the orchestrator re-defines a carved body (copy-not-carve)",
    );
    // S5 (fence): the real orchestrator that IMPORTS but never defines the bodies passes.
    sabNot({}, S5, "S5 fence — the live composed orchestrator is not a copy");
    // D1: a prose-only doc with no markdown table.
    sab(
        { depsDoc: "shadcn-vue verdict: keep components.json, baseColor stone. No table here." },
        D1,
        "D1 the doc carries no markdown table",
    );
    // D1: the doc absent.
    sab({ depsDoc: "" }, D1, "D1 the deps-currency doc absent");
    // D2: baseColor still slate.
    sab(
        { componentsJson: JSON.stringify({ tailwind: { baseColor: "slate" } }) },
        D2,
        "D2 baseColor still slate",
    );
    // D2 (fence): the warm `stone` base passes.
    sabNot(
        { componentsJson: JSON.stringify({ tailwind: { baseColor: "stone" } }) },
        D2,
        "D2 fence — the warm stone base is accepted",
    );

    return flagged;
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_DEPS_CURRENCY_ARTIFACT",
        "BH-deps-currency",
    );

    const selfTestCount = selfTest();
    const { facts, violations } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:deps-currency",
        command: COMMAND,
        selfTestChecks: selfTestCount,
        facts,
        violations,
    });

    console.log(
        "proof:deps-currency — style-assets god-module carved (3 sub-plugins) + deps/shadcn verdict recorded",
    );
    console.log(`  S1 thin orchestrator (≤200)   : ${facts.orchestratorLines} lines`);
    console.log(
        `  S2 sub-plugins exist + ≤500   : fold=${facts.subPlugins.styleFold} emit=${facts.subPlugins.utilityEmit} split=${facts.subPlugins.criticalSplit}`,
    );
    console.log(
        `  S3 sub-plugin exports         : fold=${facts.subExports.styleFoldExports} emit=${facts.subExports.utilityEmitExports} split=${facts.subExports.criticalSplitExports}`,
    );
    console.log(
        `  S4 plugin surface unchanged   : exported=${facts.pluginSurface.orchestratorExportsPlugin} bothConfigs=${facts.pluginSurface.configUsesPlugin}`,
    );
    console.log(
        `  S5 real carve (no copy)       : imports3=${facts.composition.importsStyleFold && facts.composition.importsUtilityEmit && facts.composition.importsCriticalSplit} redefines=${facts.composition.redefinesCarvedBody}`,
    );
    console.log(
        `  D1 deps-currency doc + table  : table=${facts.docArm.docTable} shadcn=${facts.docArm.docShadcn} verdict=${facts.docArm.docVerdict}`,
    );
    console.log(`  D2 baseColor off slate        : ${facts.baseColor}`);
    console.log(`  self-test (bite proof)        : OK — ${selfTestCount} synthetic sabotages handled`);

    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );

    if (SELF_TEST)
        console.log(
            `\n[proof:deps-currency --self-test] ${selfTestCount} bite(s) handled; tree ${status === "pass" ? "GREEN" : "RED"}`,
        );

    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
