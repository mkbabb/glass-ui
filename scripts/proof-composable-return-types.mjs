#!/usr/bin/env node
// The composable-return-shape + carve-parity gate (proof:composable-return-types).
//
// It machine-proves that a god-module carve is RE-EXPORT-ONLY (the public surface
// is byte-identical) and that a carved composable's return shape is locked by a
// named interface. The gate locks:
//   1. Named `Use<Name>Return` interfaces on the flagged composables (the
//      countup/animated/numeric/dark/glassRenderer set + the carved
//      `useMetaballRenderer`), with the old names (`Countup`, `AnimatedNumber`)
//      preserved as aliases.
//   2. The `twin-line-divider` DRY: a SINGLE `@utility` definition in
//      utilities.css + ≥2 consumers (instrument-chassis + instrument-rail), with
//      the inline duplicated α-pair removed from both.
//   3. The `useTokenColor` injection seam — an optional `resolver` param.
//   4. A DO-NOT-SPLIT rationale comment on the keep-whole-by-design surfaces
//      (ContinuousMarkers — the lone cohesive warn-band SFC; SegmentedTabs +
//      GlassDock are CARVED, so they are NO LONGER on this list).
//   5. The `dom/*Controls` convention documented (not renamed).
//   6. The BARREL-PARITY snapshot — the goo-blob / constellation / dock-composables
//      package barrels each re-export the EXACT expected symbol set (a carve that
//      drops/renames a re-export reddens). This is the machine proof that a
//      free-function-family carve is re-export-only.
//   7. The aurora GLSL recompose STRING-PARITY — the composed
//      `AURORA_MEDIUMS_{PRE,POST}_BRUSH_GLSL` exports hash to the carve-commit
//      snapshot (the template join introduces zero byte drift).
//
// bite-check: drop any Return interface / the alias / the @utility / a consumer
// reference / a rationale comment / a barrel re-export → the matching clause reddens.

import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
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
        RENDERER_BLOB: resolve(
            ROOT,
            "src/components/custom/goo-blob/composables/useMetaballRenderer.ts",
        ),
        DOM_BARREL: resolve(ROOT, "src/composables/dom/index.ts"),
        TOKEN_COLOR: resolve(ROOT, "src/composables/dom/useTokenColor.ts"),
        // utilities.css is a thin @import root over `utilities/*.css` partials; the
        // `@utility twin-line-divider` lives in the `btn` partial post-carve. Read
        // the whole utilities tree so a partial-move never strands the clause.
        UTILITIES_DIR: resolve(ROOT, "src/styles/utilities"),
        UTILITIES_ROOT: resolve(ROOT, "src/styles/utilities.css"),
        CHASSIS: resolve(ROOT, "src/styles/instrument-chassis.css"),
        MARKERS: resolve(ROOT, "src/components/custom/timeline/ContinuousMarkers.vue"),
        DENSITY: resolve(ROOT, "src/components/custom/configurator/density.ts"),
        BARREL_BLOB: resolve(ROOT, "src/components/custom/goo-blob/index.ts"),
        BARREL_CONSTELLATION: resolve(
            ROOT,
            "src/components/custom/constellation/index.ts",
        ),
        BARREL_DOCK_COMPOSABLES: resolve(
            ROOT,
            "src/components/custom/dock/composables/index.ts",
        ),
        MEDIUMS_GLSL: resolve(
            ROOT,
            "src/components/custom/aurora/constants/shaders/mediums.glsl.ts",
        ),
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

/**
 * The set of names a barrel re-exports — every identifier inside an
 * `export { ... }` / `export type { ... }` block, resolving `default as Foo` and
 * `Foo as Bar` to the EXPORTED name (the public symbol). Comments are stripped
 * first so a commented-out export never registers.
 */
function barrelExportNames(src) {
    const code = stripComments(src);
    const out = [];
    for (const block of code.matchAll(/export\s*(?:type\s*)?\{([^}]*)\}/g)) {
        for (let part of block[1].split(",")) {
            part = part.trim();
            if (!part) continue;
            const asMatch = part.match(/\bas\s+(\w+)\s*$/);
            const name = asMatch ? asMatch[1] : part.replace(/^type\s+/, "").trim();
            if (name) out.push(name);
        }
    }
    return out;
}

/**
 * The concatenated CONTENT of every `/* glsl *\/`-tagged template literal in a
 * GLSL-in-TS module — the GLSL bytes only, free of the TS export wrapper. Used to
 * hash the recomposed shader so a carve that moves a chunk into a sibling can be
 * proven byte-identical (the moved GLSL content is unchanged; only its TS home is).
 */
function glslLiterals(src) {
    let out = "";
    // Match `/* glsl */ ` followed by a backtick-delimited template literal,
    // capturing the literal body (no interpolation occurs in the source — the
    // join `${SIBLING}` lives at the TS level, not inside a single literal).
    for (const m of src.matchAll(/\/\*\s*glsl\s*\*\/\s*`([\s\S]*?)`/g)) {
        out += m[1];
    }
    return out;
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
        ["useMetaballRenderer", P.RENDERER_BLOB, "UseMetaballRendererReturn", null],
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

    // ── 2. twin-line-divider DRY. Read the utilities ROOT + every `utilities/*.css`
    //       partial (the @import-root carve moved the @utility into the btn partial).
    let utilitiesSrc = readIf(P.UTILITIES_ROOT);
    if (existsSync(P.UTILITIES_DIR)) {
        for (const f of readdirSync(P.UTILITIES_DIR)) {
            if (f.endsWith(".css")) utilitiesSrc += "\n" + readIf(resolve(P.UTILITIES_DIR, f));
        }
    }
    const util = stripComments(utilitiesSrc);
    const utilDefCount = (util.match(/@utility twin-line-divider\b/g) ?? []).length;
    facts.twinLineUtilityCount = utilDefCount;
    if (utilDefCount !== 1) {
        violations.push(
            `the @utility twin-line-divider definition count is ${utilDefCount} (expected exactly 1 across the utilities/* tree)`,
        );
    }
    // AZ.W-PRUNE2 (E4-1) — instrument-rail.css retired with its component; the
    // chassis is now the SOLE twin-line-divider consumer (the α pair stays
    // canonicalised in the @utility, a single retint site).
    const chassis = stripComments(readIf(P.CHASSIS));
    facts.chassisConsumes =
        /twin-line-divider/.test(chassis) && /var\(--twin-line-(catch|shadow)\)/.test(chassis);
    if (!facts.chassisConsumes) {
        violations.push("instrument-chassis.css does not consume the twin-line-divider utility");
    }
    // The inline duplicated α pair must be GONE (no surviving hardcoded
    // `rgb(255 255 255 / 0.10)` / `rgb(0 0 0 / 0.12)` divider literal).
    const inlineLiteralRe = /rgb\(255 255 255 \/ 0\.10\)|rgb\(0 0 0 \/ 0\.12\)/;
    facts.chassisInlineRemoved = !inlineLiteralRe.test(chassis);
    if (!facts.chassisInlineRemoved) {
        violations.push("instrument-chassis.css still carries the inline twin-line α literal (not collapsed onto the utility)");
    }

    // ── 3. useTokenColor injection seam.
    const tokenColor = stripComments(readIf(P.TOKEN_COLOR));
    facts.tokenColorResolverParam = /resolver\?\s*:/.test(tokenColor) && /options\.resolver/.test(tokenColor);
    if (!facts.tokenColorResolverParam) {
        violations.push("useTokenColor does not expose the optional `resolver` injection seam");
    }

    // ── 4. DO-NOT-SPLIT rationale comment (read the RAW source — the rationale
    //       IS a comment, so do not strip). ContinuousMarkers is the LONE
    //       keep-whole-by-design surface: a cohesive warn-band SFC. SegmentedTabs
    //       + GlassDock were CARVED (so their banners are gone) — the carve
    //       doctrine replaced the keep-whole rationale for those two.
    const doNotSplitTargets = [["ContinuousMarkers.vue", P.MARKERS]];
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

    // ── 6. BARREL-PARITY snapshot. A god-module carved into a free-function
    //       family has no `Use*Return` to lock — its PUBLIC shape IS the package
    //       barrel's re-export set. Each barrel must re-export EXACTLY the
    //       expected symbol set (a carve that drops/renames a re-export reddens).
    //       The expected arrays are the frozen public surface; the order is
    //       normalised (set-equality, not list-equality) so a re-ordering of the
    //       barrel is fine, a drop/add is not.
    const BARREL_SNAPSHOTS = {
        "goo-blob/index.ts": {
            path: P.BARREL_BLOB,
            expect: [
                "GooBlob", "BlobMood", "BlobMerge", "BlobQuality", "MoodParams",
                "MetaballSource", "BlobConfig", "BlobGeometry", "BlobSatelliteTiming",
                "BlobMembrane", "BlobColor", "BlobSurface", "BlobInteraction",
                "SatellitePhase", "SatelliteInternal", "BLOB_CONFIG_DEFAULTS",
                "BLOB_CONFIG_KEY", "useBlobMood", "BlobMoodSystem", "useBlobPointer",
                "BlobPointer", "useBlobSatellites", "BlobSatelliteSystem",
                "useMetaballRenderer", "UseMetaballRendererOptions",
            ],
        },
        "constellation/index.ts": {
            path: P.BARREL_CONSTELLATION,
            expect: [
                "Constellation", "seedField", "stepField", "stepWell", "refitField",
                "readPalette", "drawEdges", "drawNodes", "drawPointerWeb", "drawRipples",
                "nearestNode", "readInteractionConfig", "warpStep", "warpTo",
                "setWarpTarget", "warpSettled", "pickWanderTarget", "BASE_WIDTH",
                "DEFAULT_PALETTE", "DEFAULT_WELL_CONFIG", "DEFAULT_WANDER_IDLE",
                "DEFAULT_WANDER_JITTER", "WARP_RESPONSE", "WARP_ZETA",
                "ConstellationNode", "ConstellationRipple", "ConstellationPointer",
                "ConstellationPalette", "ConstellationField", "ConstellationWarp",
                "ConstellationWarpConfig", "ConstellationWander", "ConstellationWell",
                "ConstellationWellConfig", "ConstellationProps",
                // AZ.W-CON-GEN (R5-6) — the pinned-drift facility, ADDITIVE default-OFF
                // on the protected quintet's barrel (proof:constellation-gen G5 locks
                // the behavior; this snapshot enrolls the deliberate surface growth).
                "stepPinnedDrift", "makePinnedDrift", "DEFAULT_PINNED_DRIFT_FRAC",
                "DEFAULT_PINNED_DRIFT_DUR", "DEFAULT_PINNED_DRIFT_IDLE",
                "DEFAULT_PINNED_DRIFT_JITTER", "ConstellationPinnedDrift",
                // R5-8 (the slides-consumer kVis floor) — the visual-size draw
                // scale: SIZES floor at max(k, kFloor); positions/reach stay on
                // true k; byte-identical at/above ~922px by construction.
                "DEFAULT_K_FLOOR", "kVisOf",
            ],
        },
        "dock/composables/index.ts": {
            path: P.BARREL_DOCK_COMPOSABLES,
            expect: [
                "useDockState", "UseDockStateOptions", "UseDockStateReturn", "DockState",
                "useLayerTransition", "UseLayerTransitionOptions",
                "UseLayerTransitionReturn", "useDockHold", "UseDockHoldOptions",
                "UseDockHoldReturn", "isTeleportedTarget", "provideDockContext",
                "useDockContext", "useOptionalDockContext", "DOCK_CONTEXT_KEY",
                "DockContext", "DockOrientation", "provideDockLayerGroupContext",
                "useDockLayerGroupContext", "useOptionalDockLayerGroupContext",
                "DOCK_LAYER_GROUP_KEY", "DockLayerDescriptor", "DockLayerGroupContext",
                "useDockMorphOrchestrator", "provideDockMorphContext",
                "useOptionalDockMorphContext", "DOCK_MORPH_KEY", "DockMorphContext",
                "DockMorphGroupRegistration", "DockMorphGroupHandle",
                "UseDockMorphOrchestratorOptions", "UseDockMorphOrchestratorReturn",
                // AZ.W-MORPH-SHOWCASE — the V↔H liquid-glass morph driver.
                "useDockOrientationMorph", "DockMorphOrientation",
                "UseDockOrientationMorphOptions", "UseDockOrientationMorphReturn",
            ],
        },
    };
    facts.barrelParity = {};
    for (const [label, { path, expect }] of Object.entries(BARREL_SNAPSHOTS)) {
        const got = barrelExportNames(readIf(path));
        const want = new Set(expect);
        const have = new Set(got);
        const missing = [...want].filter((s) => !have.has(s));
        const extra = [...have].filter((s) => !want.has(s));
        const ok = missing.length === 0 && extra.length === 0;
        facts.barrelParity[label] = { ok, missing, extra };
        if (!ok) {
            violations.push(
                `${label} barrel symbol set drifted from the carve snapshot` +
                    (missing.length ? ` — MISSING ${missing.join(", ")}` : "") +
                    (extra.length ? ` — UNEXPECTED ${extra.join(", ")}` : ""),
            );
        }
    }

    // ── 7. The aurora GLSL recompose STRING-PARITY. The 2e carve splits a cohesive
    //       GLSL chunk into a sibling and rebuilds the export as a template join;
    //       the EXPORTED GLSL string must be byte-identical pre/post carve. The
    //       parity object here is the STRING (no barrel): hash the concatenated
    //       GLSL CONTENT of every `/* glsl */`-tagged template literal across the
    //       mediums module AND any co-located `*.glsl.ts` sibling it joins. The
    //       carve-commit snapshot is recorded below; a drift in any moved GLSL byte
    //       reddens. The `proof:aurora-*` shader gates are the behaviour witnesses.
    const SHADERS_DIR = resolve(ROOT, "src/components/custom/aurora/constants/shaders");
    const glslParts = [glslLiterals(readIf(P.MEDIUMS_GLSL))];
    // Fold in any co-located medium-chunk sibling the mediums module joins (the
    // 2e carve target). The list is explicit so a new unrelated *.glsl.ts cannot
    // silently shift the hash.
    const MEDIUM_SIBLINGS = ["oil-modes.glsl.ts", "vangogh-medium.glsl.ts"];
    for (const sib of MEDIUM_SIBLINGS) {
        const sp = resolve(SHADERS_DIR, sib);
        if (existsSync(sp)) glslParts.push(glslLiterals(readIf(sp)));
    }
    const composedGlsl = glslParts.join("");
    const glslHash = createHash("sha256").update(composedGlsl).digest("hex");
    // The carve-commit snapshot. EMPTY until the 2e carve lands its sibling; once
    // set, a drift in the moved GLSL reddens. The value is recorded at carve time
    // (printed by this gate when unset so the carve commit can paste it in).
    const MEDIUMS_GLSL_HASH = "1858a1d9111b7618a4cfee91e1480bc3b3431ae1f4308f1d51f60f56828e0dc7";
    facts.mediumsGlslHash = glslHash;
    facts.mediumsGlslHashExpected = MEDIUMS_GLSL_HASH;
    // The hash is asserted ONLY once a medium sibling exists (post-carve); before
    // the carve the single-file literal is its own witness and the hash floats.
    const carveLanded = MEDIUM_SIBLINGS.some((s) => existsSync(resolve(SHADERS_DIR, s)));
    facts.mediumsGlslCarveLanded = carveLanded;
    if (carveLanded && glslHash !== MEDIUMS_GLSL_HASH) {
        violations.push(
            `the aurora mediums GLSL recompose drifted: composed hash ${glslHash} ≠ carve-commit snapshot ${MEDIUMS_GLSL_HASH} (the template join must introduce zero byte drift)`,
        );
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
        "proof:composable-return-types — named Return interfaces + barrel-parity + GLSL string-parity + twin-line @utility + useTokenColor seam + DO-NOT-SPLIT rationale",
    );
    const rt = Object.entries(facts.returnTypes)
        .map(([k, v]) => `${k}:${v.iface && v.alias ? "✓" : "✗"}`)
        .join(" ");
    console.log(`  return types : ${rt}`);
    const bp = Object.entries(facts.barrelParity)
        .map(([k, v]) => `${k.split("/")[0]}:${v.ok ? "✓" : "✗"}`)
        .join(" ");
    console.log(`  barrel parity : ${bp}`);
    console.log(
        `  mediums GLSL string-parity : ${facts.mediumsGlslCarveLanded ? (facts.mediumsGlslHash === facts.mediumsGlslHashExpected ? "yes ✓" : "DRIFT ✗") : "pre-carve (single-literal witness)"}  [hash ${facts.mediumsGlslHash.slice(0, 12)}…]`,
    );
    console.log(`  twin-line @utility (1) + 2 consumers : ${utilDefCount === 1 && facts.chassisConsumes && facts.railConsumes ? "yes ✓" : "NO ✗"}`);
    console.log(`  useTokenColor resolver seam          : ${facts.tokenColorResolverParam ? "yes ✓" : "NO ✗"}`);
    console.log(`  DO-NOT-SPLIT rationale (1)           : ${Object.values(facts.doNotSplit).every(Boolean) ? "yes ✓" : "NO ✗"}`);
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
