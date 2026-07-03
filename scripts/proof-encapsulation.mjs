#!/usr/bin/env node
// proof:encapsulation — the stateless-leaf encapsulation gate
// (BG.W-BLOB-KINEMATICS-LEAF, the F9 kinematics-leaf carve; ratchet-drain row 10).
//
// useBlobSatellites.ts was one of the files grandfathered in proof:no-god-module
// (533 lines, RATCHET baseline #10). This wave carves the STATELESS orbit /
// eccentricity / wobble math into a colocated PURE leaf along the one seam the
// A-component-splits audit named — the helpers read no closure:
//   • createSatellite / orbitPos / randomizeOrbit  →  composables/satelliteKinematics.ts.
// The driver (useBlobSatellites.ts) KEEPS the stateful satellite pool + the phase
// state-machine + the pure numeric helpers (randRange/clamp01/lerp) and COMPOSES
// the leaf (one writer of the satellite state; the kinematics math beside it).
//
// The ENCAPSULATION boundary is the assertion: the carved math is a stateless
// leaf (no closure state, NO `SpringProgress` fork per the wave constraint, no
// Vue reactivity, no rng ownership, no module-level mutable state), the driver
// IMPORTS it, and the carve is REAL (the three functions are DEFINITION-ABSENT
// from the driver — no dual-path copy). Pure FS, device-free (paint-class H — a
// mechanical carve changes ZERO pixels, the BB.W-CARVE4 byte-identical-paint
// discipline). Born-RED on HEAD (leaf absent + driver 533 > 500 + ratchet row
// present), GREEN on the carve + a self-test bite per clause.
//
// Asserts:
//   E1 — RATCHET-DRAIN: useBlobSatellites.ts is ≤ 500 lines AND the
//        proof-no-god-module.mjs RATCHET_BASELINES map carries NO
//        `"components/custom/goo-blob/composables/useBlobSatellites.ts": N` row
//        (baseline #10 gone; the monotonic drain).
//   E2 — COLOCATION: the carved leaf (satelliteKinematics.ts) exists on disk AND
//        EXPORTS all three kinematics functions AND useBlobSatellites.ts IMPORTS
//        all three from "./satelliteKinematics".
//   E3 — STATELESS-LEAF: the leaf owns NO state — no `SpringProgress`/keyframes
//        import (the no-fork constraint), no `mulberry32`/`hashString` rng
//        ownership (the seed lives in the driver), no `vue` import (no
//        reactivity), and ZERO module-level mutable `let`/`var` declaration.
//   E4 — SINGLE-DEFINITION: the three functions are DEFINED in the leaf AND
//        DEFINITION-ABSENT from the driver (the carve is real — no dual-path
//        copy left behind; the driver reaches them only through the import).
//
// Self-test bites (born-RED demonstration): a 601-line driver REDs E1; a
// surviving ratchet row REDs E1 (a bare comment mention does NOT); an absent leaf
// REDs E2; a dropped import REDs E2; a `SpringProgress` import in the leaf REDs
// E3; a module-level `let` in the leaf REDs E3; a re-declared `function
// createSatellite` in the driver REDs E4 (a comment mention does NOT).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const SRC = resolve(ROOT, "src");
const COMMAND = "npm run proof:encapsulation";
const SELF_TEST = process.argv.includes("--self-test");
const HARD_LIMIT = 500;

const GOO_DIR = resolve(SRC, "components/custom/goo-blob/composables");
const DRIVER = resolve(GOO_DIR, "useBlobSatellites.ts");
const LEAF = resolve(GOO_DIR, "satelliteKinematics.ts");
const GOD_MODULE = resolve(ROOT, "scripts/proof-no-god-module.mjs");

const KINEMATICS_FNS = ["createSatellite", "orbitPos", "randomizeOrbit"];

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

// Strip // line + /* block */ comments to spaces (the copy-prune fence — a symbol
// named in a comment is provenance, never a live definition/import).
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");
}

// A `function <name>(` DECLARATION (comment-stripped). A call site `name(...)`
// or an `import { name }` does NOT match (they lack the `function` keyword).
function definesFunction(src, name) {
    return new RegExp(`function\\s+${name}\\s*\\(`).test(stripComments(src));
}

// The leaf exports `name` — either `export function name` or an `export { … name … }`
// block (comment-stripped).
function exportsName(src, name) {
    const clean = stripComments(src);
    if (new RegExp(`export\\s+(async\\s+)?function\\s+${name}\\b`).test(clean))
        return true;
    const blocks = clean.match(/export\s*(type\s*)?\{[^}]*\}/g) || [];
    return blocks.some((b) => new RegExp(`\\b${name}\\b`).test(b));
}

// The driver imports `name` from "./satelliteKinematics" (comment-stripped).
function importsFromLeaf(src, names) {
    const clean = stripComments(src);
    const m = clean.match(
        /import\s*\{([^}]*)\}\s*from\s*["']\.\/satelliteKinematics["']/,
    );
    if (!m) return false;
    const spec = m[1];
    return names.every((n) => new RegExp(`\\b${n}\\b`).test(spec));
}

// The ratchet-row shape (E1): a quoted `src/`-relative key followed by `: <number>`.
// A bare comment mention of the path (the drain note) does NOT match.
const RATCHET_ROW_RE =
    /"components\/custom\/goo-blob\/composables\/useBlobSatellites\.ts"\s*:\s*\d+/;

// ── BG.W-COLOCATE — the WS4 carve fold (ratchet-drain #3/4/9/13). Four god-modules
//    carved under the 500-line bound into COLOCATED leaves the host COMPOSES. The
//    encapsulation boundary per carve:
//      C1 — RATCHET-DRAIN: the host is ≤ 500 lines AND its proof:no-god-module ratchet
//           row is drained (gone).
//      C2 — COLOCATION: each carved leaf exists on disk AND exports its declared
//           symbols AND the host IMPORTS the leaf back (a real `import … from "<spec>"`,
//           not just a re-export — the host composes it).
//      C3 — SINGLE-DEFINITION: the leaf's primary carved symbol is DEFINITION-ABSENT
//           from the host (the carve is real — no dual-path copy left behind).
//    Pure FS, device-free (a mechanical carve changes ZERO pixels — paint-class H). Born-
//    RED on HEAD (leaves absent + hosts > 500 + rows present) → GREEN on the carve.
const COLOCATE_CARVES = [
    {
        name: "createCanvasLifecycle",
        host: "src/composables/glass/webgl/createCanvasLifecycle.ts",
        ratchetKey: "composables/glass/webgl/createCanvasLifecycle.ts",
        leaves: [
            {
                path: "src/composables/glass/webgl/backingSize.ts",
                spec: "./backingSize",
                exports: ["sizeBacking", "BackingSize", "DprPolicy"],
                imports: ["sizeBacking"],
                absent: "sizeBacking",
            },
            {
                path: "src/composables/glass/webgl/visibility.ts",
                spec: "./visibility",
                exports: ["createCanvasVisibility"],
                imports: ["createCanvasVisibility"],
                absent: "createCanvasVisibility",
            },
        ],
    },
    {
        name: "useWebGPUCanvas",
        host: "src/composables/glass/webgpu/useWebGPUCanvas.ts",
        ratchetKey: "composables/glass/webgpu/useWebGPUCanvas.ts",
        leaves: [
            {
                path: "src/composables/glass/webgpu/webgpuDevice.ts",
                spec: "./webgpuDevice",
                exports: ["withAcquireTimeout", "WEBGPU_ACQUIRE_TIMEOUT_MS"],
                imports: ["withAcquireTimeout"],
                absent: "withAcquireTimeout",
            },
            {
                path: "src/composables/glass/webgpu/webgpuCanvasTypes.ts",
                spec: "./webgpuCanvasTypes",
                exports: [
                    "WebGPUCanvasFrame",
                    "WebGPUCanvasOptions",
                    "WebGPUCanvasHandle",
                    "WebGPUSuspendReason",
                ],
                imports: ["WebGPUCanvasOptions"],
                absent: "WebGPUCanvasOptions",
            },
        ],
    },
    {
        name: "useGlassBackdropLuminance",
        host: "src/composables/glass/useGlassBackdropLuminance.ts",
        ratchetKey: "composables/glass/useGlassBackdropLuminance.ts",
        leaves: [
            {
                path: "src/composables/glass/ambientHueHistogram.ts",
                spec: "./ambientHueHistogram",
                exports: [
                    "makeHueHistogram",
                    "accumulateHuePixel",
                    "resolveAmbientHue",
                ],
                imports: ["accumulateHuePixel"],
                absent: "accumulateHuePixel",
            },
        ],
    },
    {
        name: "SegmentedTabs",
        host: "src/components/custom/tabs/SegmentedTabs.vue",
        ratchetKey: "components/custom/tabs/SegmentedTabs.vue",
        leaves: [
            {
                path: "src/components/custom/tabs/composables/useTabResponsive.ts",
                spec: "./composables/useTabResponsive",
                exports: ["useTabResponsive"],
                imports: ["useTabResponsive"],
                absent: "useTabResponsive",
            },
            {
                path: "src/components/custom/tabs/composables/useTabRovingFocus.ts",
                spec: "./composables/useTabRovingFocus",
                exports: ["useTabRovingFocus"],
                imports: ["useTabRovingFocus"],
                absent: "useTabRovingFocus",
            },
        ],
    },
];

// A quoted `src/`-relative ratchet key followed by `: <number>` (a live row, not a
// comment mention — the comments were stripped).
function ratchetRowFor(godSrc, key) {
    const esc = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`"${esc}"\\s*:\\s*\\d+`).test(godSrc);
}

// The leaf exports `name` — an `export {function,const,class,interface,type,let,var}
// name` declaration OR an `export { … name … }` / `export type { … name … }` block.
function exportsSymbol(src, name) {
    const clean = stripComments(src);
    if (
        new RegExp(
            `export\\s+(async\\s+)?(function|const|class|interface|type|let|var)\\s+${name}\\b`,
        ).test(clean)
    )
        return true;
    const blocks = clean.match(/export\s*(type\s*)?\{[^}]*\}/g) || [];
    return blocks.some((b) => new RegExp(`\\b${name}\\b`).test(b));
}

// The host IMPORTS every `name` from `spec` — a real `import … from "<spec>"` (value OR
// `import type`), NOT a bare `export … from` re-export (the host must COMPOSE the leaf).
function importsFromSpec(hostSrc, spec, names) {
    const clean = stripComments(hostSrc);
    const esc = spec.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(
        `import[^;]*?\\{([^}]*)\\}[^;]*?from\\s*["']${esc}["']`,
        "g",
    );
    const seen = new Set();
    let m;
    while ((m = re.exec(clean))) {
        for (const n of names)
            if (new RegExp(`\\b${n}\\b`).test(m[1])) seen.add(n);
    }
    return names.every((n) => seen.has(n));
}

// The host DEFINES `name` (a live `function`/`const`/`class`/`interface`/`type`
// declaration — the dual-path copy). An `import { name }` / `export { name }` does NOT
// match (they carry no declaration keyword before the symbol).
function definesSymbol(src, name) {
    return new RegExp(
        `(function|const|class|interface|type)\\s+${name}\\b`,
    ).test(stripComments(src));
}

// ── The colocate detector — pure over an injected input map (so a self-test can
//    sabotage a single carve's host / leaf / god-module without touching disk).
//    inputs = { hostText, godSrc, leaf: { <path>: { exists, text } } }.
function detectOneCarve(carve, inputs) {
    const violations = [];
    // C1 — ratchet-drain: host ≤ 500 AND no ratchet row.
    const hostLines = lineCount(inputs.hostText);
    const rowPresent = ratchetRowFor(inputs.godSrc, carve.ratchetKey);
    if (!(hostLines <= HARD_LIMIT && !rowPresent))
        violations.push(
            `C1 [${carve.name}] host is ${hostLines} lines (≤ ${HARD_LIMIT} required) AND its ratchet row must be drained (rowPresent=${rowPresent})`,
        );
    for (const leaf of carve.leaves) {
        const l = inputs.leaf[leaf.path] ?? { exists: false, text: "" };
        // C2 — colocation: leaf exists + exports all + host imports it back.
        const leafExportsAll = leaf.exports.every((n) =>
            exportsSymbol(l.text, n),
        );
        const hostImports = importsFromSpec(
            inputs.hostText,
            leaf.spec,
            leaf.imports,
        );
        if (!(l.exists && leafExportsAll && hostImports))
            violations.push(
                `C2 [${carve.name}] ${leaf.path} must exist (${l.exists}) + export ${leaf.exports.join("/")} (${leafExportsAll}) + be imported back into the host from "${leaf.spec}" (${hostImports})`,
            );
        // C3 — single-definition: the carved symbol is DEFINITION-ABSENT from the host.
        if (definesSymbol(inputs.hostText, leaf.absent))
            violations.push(
                `C3 [${carve.name}] the host RE-DEFINES ${leaf.absent} (a dual-path copy) — the carve must be real (the symbol lives ONLY in ${leaf.path})`,
            );
    }
    return violations;
}

// Live: read every carve's host + leaves + the god-module from disk.
function detectColocate(overrides = {}) {
    const violations = [];
    const facts = {};
    const godSrc = overrides.godModuleSource ?? read(GOD_MODULE);
    for (const carve of COLOCATE_CARVES) {
        const hostText = read(resolve(ROOT, carve.host));
        const leaf = {};
        for (const l of carve.leaves) {
            const p = resolve(ROOT, l.path);
            leaf[l.path] = { exists: existsSync(p), text: read(p) };
        }
        const carveViolations = detectOneCarve(carve, {
            hostText,
            godSrc,
            leaf,
        });
        facts[carve.name] = {
            hostLines: lineCount(hostText),
            clean: carveViolations.length === 0,
        };
        violations.push(...carveViolations);
    }
    return { facts, violations };
}

// ── The detector — runs over a SOURCE MAP so a self-test can sabotage inputs.
// overrides: { driverText?, godModuleSource?, leafExists?, leafSource? }.
function detect(overrides = {}) {
    const violations = [];
    const facts = {};
    function assert(label, ok) {
        facts[label] = Boolean(ok);
        if (!ok) violations.push(label);
    }

    const driverSrc = overrides.driverText ?? read(DRIVER);
    const godSrc = overrides.godModuleSource ?? read(GOD_MODULE);
    const leafExists = overrides.leafExists ?? existsSync(LEAF);
    const leafSrc =
        overrides.leafSource ?? (leafExists ? read(LEAF) : "");

    // ── E1 — RATCHET-DRAIN: driver ≤ 500 AND no ratchet row. ──
    const driverLines = lineCount(driverSrc);
    const underBound = driverLines <= HARD_LIMIT;
    const rowPresent = RATCHET_ROW_RE.test(godSrc);
    facts.driverLines = driverLines;
    facts.ratchetRowPresent = rowPresent;
    assert(
        "E1 — useBlobSatellites.ts is ≤ 500 lines AND its proof:no-god-module RATCHET baseline row is drained",
        underBound && !rowPresent,
    );

    // ── E2 — COLOCATION: leaf exists + exports all three + driver imports all three. ──
    const leafExportsAll = KINEMATICS_FNS.every((n) => exportsName(leafSrc, n));
    const driverImportsAll = importsFromLeaf(driverSrc, KINEMATICS_FNS);
    facts.colocation = { leafExists, leafExportsAll, driverImportsAll };
    assert(
        "E2 — satelliteKinematics.ts exists AND exports createSatellite/orbitPos/randomizeOrbit AND useBlobSatellites.ts imports all three",
        leafExists && leafExportsAll && driverImportsAll,
    );

    // ── E3 — STATELESS-LEAF: no spring fork, no rng ownership, no vue, no module state. ──
    const cleanLeaf = stripComments(leafSrc);
    const hasSpring =
        /\bSpringProgress\b/.test(cleanLeaf) ||
        /from\s*["']@mkbabb\/keyframes(\.js)?["']/.test(cleanLeaf);
    const ownsRng = /\b(mulberry32|hashString)\s*\(/.test(cleanLeaf);
    const importsVue = /from\s*["']vue["']/.test(cleanLeaf);
    // Module-scope mutable declaration = a `let`/`var` at COLUMN 0 (a function-local
    // `let`/`var` is indented, so it never matches). A stateless math leaf has none.
    const moduleMutable = /^(let|var)\s/m.test(cleanLeaf);
    facts.stateless = {
        hasSpring,
        ownsRng,
        importsVue,
        moduleMutable,
    };
    assert(
        "E3 — satelliteKinematics.ts is a stateless pure leaf (no SpringProgress fork, no rng ownership, no vue reactivity, no module-level mutable state)",
        leafExists && !hasSpring && !ownsRng && !importsVue && !moduleMutable,
    );

    // ── E4 — SINGLE-DEFINITION: the three fns live in the leaf, absent from the driver. ──
    const leafDefinesAll = KINEMATICS_FNS.every((n) => definesFunction(leafSrc, n));
    const driverRedefines = KINEMATICS_FNS.filter((n) =>
        definesFunction(driverSrc, n),
    );
    facts.singleDefinition = {
        leafDefinesAll,
        driverRedefines,
    };
    assert(
        "E4 — createSatellite/orbitPos/randomizeOrbit are DEFINED in the leaf AND DEFINITION-ABSENT from the driver (the carve is real, no dual-path copy)",
        leafDefinesAll && driverRedefines.length === 0,
    );

    return { facts, violations };
}

// ── The self-test bites (anti-vacuity / born-RED demonstration). ──
function selfTest() {
    let flagged = 0;
    const sab = (overrides, labels, name) => {
        const { violations } = detect(overrides);
        if (labels.some((l) => violations.includes(l))) flagged++;
        else
            throw new Error(
                `[proof:encapsulation self-test] the bite FAILED to flag: ${name}`,
            );
    };
    const sabNot = (overrides, labels, name) => {
        const { violations } = detect(overrides);
        if (!labels.some((l) => violations.includes(l))) flagged++;
        else
            throw new Error(
                `[proof:encapsulation self-test] the fence bite WRONGLY flagged: ${name}`,
            );
    };

    const E1 =
        "E1 — useBlobSatellites.ts is ≤ 500 lines AND its proof:no-god-module RATCHET baseline row is drained";
    const E2 =
        "E2 — satelliteKinematics.ts exists AND exports createSatellite/orbitPos/randomizeOrbit AND useBlobSatellites.ts imports all three";
    const E3 =
        "E3 — satelliteKinematics.ts is a stateless pure leaf (no SpringProgress fork, no rng ownership, no vue reactivity, no module-level mutable state)";
    const E4 =
        "E4 — createSatellite/orbitPos/randomizeOrbit are DEFINED in the leaf AND DEFINITION-ABSENT from the driver (the carve is real, no dual-path copy)";

    const liveDriver = read(DRIVER);
    const liveLeaf = read(LEAF);

    // E1: a 601-line driver (the god-module un-carved).
    sab(
        { driverText: "x\n".repeat(601) + liveDriver },
        [E1],
        "E1 useBlobSatellites.ts over the 500-line bound",
    );
    // E1: a re-added / surviving ratchet row.
    sab(
        {
            godModuleSource: `const RATCHET_BASELINES = { "components/custom/goo-blob/composables/useBlobSatellites.ts": 533 };`,
        },
        [E1],
        "E1 the ratchet baseline row survives",
    );
    // E1 (fence): a bare comment mention of the path does NOT re-arm the row.
    sabNot(
        {
            godModuleSource: `// BG.W-BLOB-KINEMATICS-LEAF DRAINED useBlobSatellites.ts (533 -> 427)\nconst RATCHET_BASELINES = {};`,
        },
        [E1],
        "E1 comment-mention fence (a drain note is not a live row)",
    );
    // E2: the carved leaf missing from disk.
    sab({ leafExists: false, leafSource: "" }, [E2], "E2 the leaf absent");
    // E2: the driver never imports the leaf.
    sab(
        {
            driverText: liveDriver.replace(
                /import\s*\{[\s\S]*?\}\s*from\s*["']\.\/satelliteKinematics["'];/,
                "",
            ),
        },
        [E2],
        "E2 useBlobSatellites.ts drops the kinematics import",
    );
    // E3: the leaf imports SpringProgress (the forbidden spring fork).
    sab(
        {
            leafSource: `import { SpringProgress } from "@mkbabb/keyframes.js";\n${liveLeaf}`,
        },
        [E3],
        "E3 the leaf forks SpringProgress",
    );
    // E3: the leaf declares module-level mutable state.
    sab(
        { leafSource: `let orbitCounter = 0;\n${liveLeaf}` },
        [E3],
        "E3 the leaf carries module-level mutable state",
    );
    // E4: the driver re-declares a kinematics function (the dual-path copy).
    sab(
        {
            driverText: `function orbitPos(s, now) { return { x: 0, y: 0 }; }\n${liveDriver}`,
        },
        [E4],
        "E4 the driver re-declares function orbitPos (dual-path)",
    );
    // E4 (fence): a bare comment mention of a kinematics fn in the driver does NOT flag.
    sabNot(
        { driverText: `// orbitPos worst-case reach note\n${liveDriver}` },
        [E4],
        "E4 comment-mention fence (a note is not a definition)",
    );

    // ── BG.W-COLOCATE — the C1/C2/C3 bites over the createCanvasLifecycle carve ──
    const cc = COLOCATE_CARVES[0]; // createCanvasLifecycle → backingSize + visibility
    const ccHost = read(resolve(ROOT, cc.host));
    const ccGod = read(GOD_MODULE);
    const ccLeaf = {};
    for (const l of cc.leaves) {
        const p = resolve(ROOT, l.path);
        ccLeaf[l.path] = { exists: existsSync(p), text: read(p) };
    }
    const cleanInputs = () => ({ hostText: ccHost, godSrc: ccGod, leaf: ccLeaf });
    const sabC = (inputs, prefix, name) => {
        const v = detectOneCarve(cc, inputs);
        if (v.some((x) => x.startsWith(prefix))) flagged++;
        else
            throw new Error(
                `[proof:encapsulation self-test] colocate bite FAILED to flag: ${name}`,
            );
    };
    const sabNotC = (inputs, prefix, name) => {
        const v = detectOneCarve(cc, inputs);
        if (!v.some((x) => x.startsWith(prefix))) flagged++;
        else
            throw new Error(
                `[proof:encapsulation self-test] colocate fence bite WRONGLY flagged: ${name}`,
            );
    };
    // C1: the host re-grows past the 500-line bound.
    sabC(
        { ...cleanInputs(), hostText: "x\n".repeat(601) + ccHost },
        "C1",
        "C1 createCanvasLifecycle re-grows > 500",
    );
    // C1: a surviving / re-added ratchet row for the carved host.
    sabC(
        {
            ...cleanInputs(),
            godSrc: `const RATCHET_BASELINES = { "composables/glass/webgl/createCanvasLifecycle.ts": 736 };`,
        },
        "C1",
        "C1 the ratchet row survives",
    );
    // C1 (fence): a bare comment mention of the drain does NOT re-arm the row.
    sabNotC(
        {
            ...cleanInputs(),
            godSrc: `// BG.W-COLOCATE DRAINED createCanvasLifecycle.ts (736 -> 457)\nconst RATCHET_BASELINES = {};`,
        },
        "C1",
        "C1 comment-mention fence (a drain note is not a live row)",
    );
    // C2: the carved leaf is absent from disk.
    sabC(
        {
            ...cleanInputs(),
            leaf: {
                ...ccLeaf,
                [cc.leaves[1].path]: { exists: false, text: "" },
            },
        },
        "C2",
        "C2 the visibility leaf is absent",
    );
    // C2: the host drops the leaf import (no composition).
    sabC(
        {
            ...cleanInputs(),
            hostText: ccHost.replace(
                /import\s*\{[^}]*\}\s*from\s*["']\.\/backingSize["'];/,
                "",
            ),
        },
        "C2",
        "C2 the host drops the backingSize import",
    );
    // C3: the host RE-DEFINES the carved symbol (the dual-path copy).
    sabC(
        {
            ...cleanInputs(),
            hostText: `function createCanvasVisibility() { return {}; }\n${ccHost}`,
        },
        "C3",
        "C3 the host re-defines createCanvasVisibility (dual-path)",
    );
    // C3 (fence): a bare comment mention of the symbol in the host does NOT flag.
    sabNotC(
        {
            ...cleanInputs(),
            hostText: `// sizeBacking is the ONE sizer\n${ccHost}`,
        },
        "C3",
        "C3 comment-mention fence (a note is not a definition)",
    );

    return flagged;
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_ENCAPSULATION_ARTIFACT",
        "BG-encapsulation",
    );

    const selfTestCount = selfTest();
    const { facts: blobFacts, violations: blobViolations } = detect();
    // BG.W-COLOCATE — the WS4 carve fold (ratchet #3/4/9/13) joins the same gate.
    const { facts: colocateFacts, violations: colocateViolations } =
        detectColocate();
    const facts = { ...blobFacts, colocate: colocateFacts };
    const violations = [...blobViolations, ...colocateViolations];
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:encapsulation",
        command: COMMAND,
        selfTestChecks: selfTestCount,
        facts,
        violations,
    });

    console.log(
        "proof:encapsulation — the colocated-leaf encapsulation gate (BG.W-BLOB-KINEMATICS-LEAF ratchet #10 + BG.W-COLOCATE ratchet #3/4/9/13)",
    );
    console.log(
        `  E1 ratchet-drain (≤500, no row) : ${facts["E1 — useBlobSatellites.ts is ≤ 500 lines AND its proof:no-god-module RATCHET baseline row is drained"]} (lines=${facts.driverLines}, rowPresent=${facts.ratchetRowPresent})`,
    );
    console.log(
        `  E2 colocation (leaf+imports)    : ${facts["E2 — satelliteKinematics.ts exists AND exports createSatellite/orbitPos/randomizeOrbit AND useBlobSatellites.ts imports all three"]}`,
    );
    console.log(
        `  E3 stateless leaf (pure math)   : ${facts["E3 — satelliteKinematics.ts is a stateless pure leaf (no SpringProgress fork, no rng ownership, no vue reactivity, no module-level mutable state)"]}`,
    );
    console.log(
        `  E4 single-definition (no copy)  : ${facts["E4 — createSatellite/orbitPos/randomizeOrbit are DEFINED in the leaf AND DEFINITION-ABSENT from the driver (the carve is real, no dual-path copy)"]}`,
    );
    console.log(
        "  BG.W-COLOCATE carves (C1 ≤500+row-drained · C2 leaf+import · C3 no-dual-path):",
    );
    for (const carve of COLOCATE_CARVES) {
        const f = colocateFacts[carve.name];
        console.log(
            `    ${carve.clean === false ? "" : ""}${carve.name.padEnd(26)}: ${f.clean ? "GREEN" : "RED"} (host ${f.hostLines} lines → ${carve.leaves.map((l) => l.path.split("/").pop()).join(" + ")})`,
        );
    }
    console.log(
        `  self-test (bite proof)          : OK — ${selfTestCount} synthetic sabotages handled (blob E1×2+E1-fence+E2×2+E3×2+E4+E4-fence + colocate C1×2+C1-fence+C2×2+C3+C3-fence)`,
    );

    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );

    if (SELF_TEST)
        console.log(
            `\n[proof:encapsulation --self-test] ${selfTestCount} bite(s) handled; tree ${status === "pass" ? "GREEN" : "RED"}`,
        );

    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

export { detect, detectColocate, detectOneCarve, selfTest };
