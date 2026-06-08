#!/usr/bin/env node
// AW.W15 — the composable + CSS + DI hygiene gate (proof:composable-return-types).
//
// The code-quality assay graded glass-ui A-/B+ with strong split discipline;
// this wave closes the few real gaps. The gate locks:
//   1. Named `Use<Name>Return` interfaces on the five flagged composables, with
//      the old names (`Countup`, `AnimatedNumber`) preserved as aliases.
//   2. The `twin-line-divider` DRY: a SINGLE `@utility` definition in
//      utilities.css + ≥2 consumers (instrument-chassis + instrument-rail), with
//      the inline duplicated α-pair removed from both.
//   3. The `useTokenColor` injection seam — an optional `resolver` param.
//   4. The three cleared god-modules carry a DO-NOT-SPLIT rationale comment.
//   5. The `dom/*Controls` convention documented (not renamed).
//
// bite-check: drop any Return interface / the alias / the @utility / a consumer
// reference / a rationale comment → the matching clause reddens.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        COUNTUP: resolve(ROOT, "src/composables/motion/useCountup.ts"),
        ANIMATED: resolve(ROOT, "src/composables/motion/useAnimatedNumber.ts"),
        NUMERIC: resolve(ROOT, "src/composables/motion/useNumericTransition.ts"),
        DARK: resolve(ROOT, "src/composables/dark/useGlobalDark.ts"),
        RENDERER: resolve(ROOT, "src/composables/glass/useGlassRenderer.ts"),
        DOM_BARREL: resolve(ROOT, "src/composables/dom/index.ts"),
        TOKEN_COLOR: resolve(ROOT, "src/composables/dom/useTokenColor.ts"),
        UTILITIES: resolve(ROOT, "src/styles/utilities.css"),
        CHASSIS: resolve(ROOT, "src/styles/instrument-chassis.css"),
        RAIL: resolve(ROOT, "src/styles/instrument-rail.css"),
        BOUNCY: resolve(ROOT, "src/components/custom/tabs/SegmentedTabs.vue"),
        DOCK: resolve(ROOT, "src/components/custom/dock/GlassDock.vue"),
        MARKERS: resolve(ROOT, "src/components/custom/timeline/ContinuousMarkers.vue"),
        DENSITY: resolve(ROOT, "src/components/custom/configurator/density.ts"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_COMPOSABLE_RETURN_TYPES_ARTIFACT",
            "AW-composable-return-types",
        ),
    };
    return _cliPaths;
}

function readIf(path) {
    return existsSync(path) ? readFileSync(path, "utf8") : "";
}

function run() {
    const P = cliPaths();
    const { ROOT, ARTIFACT } = P;
    const violations = [];
    const facts = {};

    // ── 1. Named Return interfaces + aliases.
    const returnChecks = [
        ["useCountup", P.COUNTUP, "UseCountupReturn", "Countup"],
        ["useAnimatedNumber", P.ANIMATED, "UseAnimatedNumberReturn", "AnimatedNumber"],
        ["useNumericTransition", P.NUMERIC, "UseNumericTransitionReturn", null],
        ["useGlobalDark", P.DARK, "UseGlobalDarkReturn", null],
        ["useGlassRenderer", P.RENDERER, "UseGlassRendererReturn", null],
    ];
    facts.returnTypes = {};
    for (const [name, path, iface, alias] of returnChecks) {
        const src = readIf(path);
        const hasIface = new RegExp(`export interface ${iface}\\b`).test(src);
        const hasAlias = alias
            ? new RegExp(`export type ${alias} = ${iface}\\b`).test(src)
            : true;
        facts.returnTypes[name] = { iface: hasIface, alias: hasAlias };
        if (!hasIface) {
            violations.push(`${name} does not export the named ${iface} interface`);
        }
        if (!hasAlias) {
            violations.push(`${name}'s preserved alias \`${alias} = ${iface}\` is missing`);
        }
    }

    // ── 2. twin-line-divider DRY.
    const util = stripComments(readIf(P.UTILITIES));
    const utilDefCount = (util.match(/@utility twin-line-divider\b/g) ?? []).length;
    facts.twinLineUtilityCount = utilDefCount;
    if (utilDefCount !== 1) {
        violations.push(
            `the @utility twin-line-divider definition count is ${utilDefCount} (expected exactly 1 in utilities.css)`,
        );
    }
    const chassis = stripComments(readIf(P.CHASSIS));
    const rail = stripComments(readIf(P.RAIL));
    facts.chassisConsumes =
        /twin-line-divider/.test(chassis) && /var\(--twin-line-(catch|shadow)\)/.test(chassis);
    facts.railConsumes =
        /twin-line-divider/.test(rail) && /var\(--twin-line-(catch|shadow)\)/.test(rail);
    if (!facts.chassisConsumes) {
        violations.push("instrument-chassis.css does not consume the twin-line-divider utility");
    }
    if (!facts.railConsumes) {
        violations.push("instrument-rail.css does not consume the twin-line-divider utility");
    }
    // The inline duplicated α pair must be GONE from both (no surviving
    // hardcoded `rgb(255 255 255 / 0.10)` / `rgb(0 0 0 / 0.12)` divider literal).
    const inlineLiteralRe = /rgb\(255 255 255 \/ 0\.10\)|rgb\(0 0 0 \/ 0\.12\)/;
    facts.chassisInlineRemoved = !inlineLiteralRe.test(chassis);
    facts.railInlineRemoved = !inlineLiteralRe.test(rail);
    if (!facts.chassisInlineRemoved) {
        violations.push("instrument-chassis.css still carries the inline twin-line α literal (not collapsed onto the utility)");
    }
    if (!facts.railInlineRemoved) {
        violations.push("instrument-rail.css still carries the inline twin-line α literal (not collapsed onto the utility)");
    }

    // ── 3. useTokenColor injection seam.
    const tokenColor = stripComments(readIf(P.TOKEN_COLOR));
    facts.tokenColorResolverParam = /resolver\?\s*:/.test(tokenColor) && /options\.resolver/.test(tokenColor);
    if (!facts.tokenColorResolverParam) {
        violations.push("useTokenColor does not expose the optional `resolver` injection seam");
    }

    // ── 4. DO-NOT-SPLIT rationale comments (read the RAW source — the rationale
    //       IS a comment, so do not strip).
    const doNotSplitTargets = [
        ["SegmentedTabs.vue", P.BOUNCY],
        ["GlassDock.vue", P.DOCK],
        ["ContinuousMarkers.vue", P.MARKERS],
    ];
    facts.doNotSplit = {};
    for (const [label, path] of doNotSplitTargets) {
        const raw = readIf(path);
        const present = /DO-NOT-SPLIT/.test(raw);
        facts.doNotSplit[label] = present;
        if (!present) {
            violations.push(`${label} is missing its DO-NOT-SPLIT rationale comment`);
        }
    }

    // ── 5. dom/*Controls convention documented (raw — a comment).
    const domBarrelRaw = readIf(P.DOM_BARREL);
    facts.controlsConventionDocumented = /Controls/.test(domBarrelRaw) && /AW\.W15/.test(domBarrelRaw);
    if (!facts.controlsConventionDocumented) {
        violations.push("the dom/ barrel does not document the *Controls-vs-Return convention");
    }

    // ── density colocation verify (no move; just confirm the sibling).
    facts.densityColocated = existsSync(P.DENSITY);
    if (!facts.densityColocated) {
        violations.push("configurator/density.ts is not colocated as a sibling");
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:composable-return-types",
        facts,
        violations,
    });

    console.log(
        "proof:composable-return-types — named Return interfaces + twin-line @utility + useTokenColor seam + DO-NOT-SPLIT rationale (AW.W15)",
    );
    const rt = Object.entries(facts.returnTypes)
        .map(([k, v]) => `${k}:${v.iface && v.alias ? "✓" : "✗"}`)
        .join(" ");
    console.log(`  return types : ${rt}`);
    console.log(`  twin-line @utility (1) + 2 consumers : ${utilDefCount === 1 && facts.chassisConsumes && facts.railConsumes ? "yes ✓" : "NO ✗"}`);
    console.log(`  useTokenColor resolver seam          : ${facts.tokenColorResolverParam ? "yes ✓" : "NO ✗"}`);
    console.log(`  DO-NOT-SPLIT rationale (3)           : ${Object.values(facts.doNotSplit).every(Boolean) ? "yes ✓" : "NO ✗"}`);
    if (violations.length) {
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
