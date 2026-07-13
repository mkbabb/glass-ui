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
//        `"components/custom/blob/composables/useBlobSatellites.ts": N` row
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

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";
// BI.W-RATCHET-GROWTH — the growth-red MIRROR. proof:no-god-module owns the frozen
// TRANCHE_BASELINE_MANIFEST (the set of files already >500 at BI tranche start) + the
// live RATCHET_BASELINES map. This gate imports both and independently reds any ratchet
// key OUTSIDE the frozen manifest — a wave-INTRODUCED grow the growing wave cannot
// self-grandfather (one manifest, two enforcers). Importing is side-effect-free: the
// sibling gate's top-level run() is guarded behind `import.meta.url`.
import {
    RATCHET_BASELINES,
    TRANCHE_BASELINE_MANIFEST,
    SHADER_LITERAL,
} from "./proof-no-god-module.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const SRC = resolve(ROOT, "src");
const COMMAND = "npm run proof:encapsulation";
const SELF_TEST = process.argv.includes("--self-test");
const HARD_LIMIT = 500;

const GOO_DIR = resolve(SRC, "components/custom/blob/composables");
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
    /"components\/custom\/blob\/composables\/useBlobSatellites\.ts"\s*:\s*\d+/;

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
        // BI.W-ENCAP-REDRAIN — the observer drains ≤ 500 by carving the stateless
        // sampling / OKLab-reduce family (the elementsFromPoint stack-walk + the
        // downsampled drawImage+getImageData field reader + the luminance/ambient-hue
        // reduce) into backdropLuminanceSample.ts; the observer COMPOSES it (keeps only
        // the reactive wiring + the downsample-canvas lifecycle + the --glass-backdrop-*
        // writes). The ambient-hue histogram it USED to compose is now composed by the
        // sample leaf (the carve below) — the composition chain deepened one hop.
        name: "useGlassBackdropLuminance",
        host: "src/composables/glass/useGlassBackdropLuminance.ts",
        ratchetKey: "composables/glass/useGlassBackdropLuminance.ts",
        leaves: [
            {
                path: "src/composables/glass/backdropLuminanceSample.ts",
                spec: "./backdropLuminanceSample",
                exports: [
                    "sampleStatic",
                    "sampleAnimated",
                    "resolveSourceCanvas",
                    "SampleResult",
                ],
                imports: ["sampleStatic", "sampleAnimated"],
                absent: "sampleAnimated",
            },
        ],
    },
    {
        // BI.W-ENCAP-REDRAIN — the sample leaf COMPOSES the ambient-hue histogram (the
        // consumer moved WITH the sampling loop out of the observer host). The histogram
        // carve re-homes here from the observer: the accumulate/resolve CALL now lives in
        // the sampler leaf, not the observer, so the "host imports accumulateHuePixel"
        // fact FOLLOWS the carve onto backdropLuminanceSample.ts.
        name: "backdropLuminanceSample",
        host: "src/composables/glass/backdropLuminanceSample.ts",
        ratchetKey: "composables/glass/backdropLuminanceSample.ts",
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

// ── BI.W-RATCHET-GROWTH — the growth-red MIRROR (RG1). A wave that grows a file past the
//    500-line bound in its OWN diff cannot self-grandfather it by adding a
//    RATCHET_BASELINES row: the frozen TRANCHE_BASELINE_MANIFEST (owned by
//    proof:no-god-module, imported above) is the ONLY legal source of baseline keys. This
//    gate INDEPENDENTLY reds any ratchet key OUTSIDE the frozen manifest — so even if the
//    sibling gate is bypassed or weakened, the encapsulation gate still catches the
//    wave-introduced grow (one manifest, two enforcers; the GF5 "ratchet normalizes
//    regrowth" disease terminalized at the contract level). A shader key is EXEMPT at the
//    sibling gate (logic-only ratchet) and never appears in the manifest, so it is skipped
//    here. Pure over an injected input map so a self-test can sabotage the maps.
function detectRatchetGrowth(overrides = {}) {
    const ratchetBaselines = overrides.ratchetBaselines ?? RATCHET_BASELINES;
    const trancheManifest = overrides.trancheManifest ?? TRANCHE_BASELINE_MANIFEST;
    const violations = [];
    const offManifest = [];
    for (const key of Object.keys(ratchetBaselines)) {
        if (SHADER_LITERAL.test(key)) continue;
        if (!(key in trancheManifest)) {
            offManifest.push(key);
            violations.push(
                `RG1 — the proof:no-god-module RATCHET_BASELINES key "${key}" is NOT in the frozen TRANCHE_BASELINE_MANIFEST — a wave-INTRODUCED >${HARD_LIMIT} file cannot self-grandfather its own growth (GROWTH reds the growing wave; only a file already >${HARD_LIMIT} at BI tranche start may carry a baseline row)`,
            );
        }
    }
    return {
        facts: {
            ratchetKeys: Object.keys(ratchetBaselines).length,
            manifestKeys: Object.keys(trancheManifest).length,
            offManifest,
            clean: violations.length === 0,
        },
        violations,
    };
}

// ── BG.W-DEAD-SWEEP — the selectableChipVariants alias-kill negative guard. ──
// The `selectableChipVariants`/`SelectableChipVariants` re-point shim (a self-admitted
// back-compat rename the no-legacy law forbids — the chip family collapsed to the ONE
// congruent `chipVariants` recipe at BD.W-CHIP-CONGRUENT-GLASS) is DELETED. The
// encapsulation boundary is the negative assertion: the shim file is DEFINITION-ABSENT
// AND no src/ module still imports/exports from its module spec (the re-point is
// complete — SelectableChip.vue / the barrel / api/index.ts read `chipVariants`/
// `ChipVariants` directly). Born-RED on HEAD (the file present + 3 referers) → GREEN on
// the delete + re-point. Pure over an injected input map so a self-test can re-add it.
const CHIP_ALIAS = resolve(SRC, "components/custom/selectable-chip/selectableChipVariants.ts");
// The MODULE-SPEC path (a quoted `.../selectableChipVariants` import specifier), NOT a
// bare symbol mention — a `` `selectableChipVariants` `` provenance comment carries no
// quoted module path, so this scopes to a live `from "…/selectableChipVariants"`.
const ALIAS_SPEC_RE = /["'][^"']*\/selectableChipVariants["']/;

// Recursively collect every `.ts`/`.vue` file under `dir` (the src tree).
function walkSrc(dir) {
    const out = [];
    for (const name of readdirSync(dir)) {
        const p = resolve(dir, name);
        const st = statSync(p);
        if (st.isDirectory()) out.push(...walkSrc(p));
        else if (/\.(ts|vue)$/.test(name)) out.push(p);
    }
    return out;
}

// The set of src/ files that still reference the deleted shim's module spec.
function scanAliasReferers() {
    const referers = [];
    for (const f of walkSrc(SRC)) {
        if (f === CHIP_ALIAS) continue; // the shim itself (if a self-test re-planted it)
        const clean = stripComments(read(f));
        if (ALIAS_SPEC_RE.test(clean)) referers.push(f.slice(SRC.length + 1));
    }
    return referers;
}

// overrides: { aliasExists?, referers? } — a self-test sabotages either.
function detectAliasKill(overrides = {}) {
    const violations = [];
    const facts = {};
    // A1 — the shim file is DEFINITION-ABSENT (deleted; the no-legacy law).
    const aliasExists = overrides.aliasExists ?? existsSync(CHIP_ALIAS);
    facts.aliasExists = aliasExists;
    if (aliasExists)
        violations.push(
            "A1 — selectableChipVariants.ts alias shim still exists (a back-compat rename the no-legacy law forbids — delete it; SelectableChip reads chipVariants directly)",
        );
    // A2 — no src/ module imports/exports from the deleted shim spec (re-point complete).
    const referers = overrides.referers ?? scanAliasReferers();
    facts.aliasReferers = referers;
    if (referers.length)
        violations.push(
            `A2 — ${referers.join(", ")} still reference the deleted selectableChipVariants module spec (re-point onto ./chipVariants — the ChipVariants/chipVariants name)`,
        );
    return { facts, violations };
}

// ── BG.W-DESHADCN — the de-shadcn HEAD-mode sweep + the --ring→--focus-ring-color
//    break + the ToastClose default name. reka = BEHAVIOUR / glass-ui = 100% of the
//    MATERIAL. This arm closes the leak classes proof:no-shadcn-default's NEUTRAL-token
//    vocabulary (bg-background/border-input/ring-ring/ring-2/ring-offset/rounded-md/
//    shadow-sm) does NOT reach — it is DISJOINT from that gate (no double-cover):
//      DS1 RING-BREAK: the shadcn `--ring` token + the `--color-ring` @theme bridge are
//           DEFINITION-ABSENT from src/styles AND the house `--focus-ring-color` register
//           is defined (the clean-break rename — no legacy alias, the de-shadcn break).
//      DS2 RING-CONSUMER-REPOINT: no src/ file reads the retired bare `var(--ring)` token
//           NOR the shadcn ring-COLOR utility (`bg-ring`/`text-ring`/`border-ring`/
//           `outline-ring` — off the deleted `--color-ring` bridge; `ring-ring` stays
//           proof:no-shadcn-default's). Every focus consumer resolves the renamed token
//           / the `.focus-ring` box-shadow.
//      DS3 PALETTE-SWEEP (HEAD-mode, the ui/ 233-file sweep): ZERO raw-tailwind PALETTE
//           utility (`text-red-300`, `bg-amber-500`, `dark:text-amber-400`, …) survives
//           in any ui/ component's live class strings — the material is 100% token-first.
//      DS4 TOASTCLOSE-NAME: ToastClose.vue ships a DEFAULT overridable `aria-label`
//           (the bare decorative <X> button owes a discernible name — the speedtest
//           ASK-GU-A11Y-AXE-CARVEOUTS (A) real defect).
//    Pure FS, device-free (paint-class P — the visible delta is the ToastClose glyph ink
//    + the aria; the token rename is byte-identical paint). Born-RED on HEAD (--ring
//    defined ×3 + --color-ring bridge + var(--ring) readers + ToastClose red palette +
//    button ai amber palette + bare-<X> no name) → GREEN + a self-test bite per clause.
const STYLES_DIR = resolve(SRC, "styles");
const UI_DIR = resolve(SRC, "components/ui");
const TOAST_CLOSE = resolve(UI_DIR, "toast/ToastClose.vue");

// The Tailwind default PALETTE (color families) + the color-capable utility PREFIXES.
const PALETTE_FAMILIES =
    "red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone";
const PALETTE_PREFIXES =
    "text|bg|border|from|to|via|ring|fill|stroke|decoration|outline|shadow|accent|caret|divide|placeholder";
// A raw-palette UTILITY (any variant prefix): `dark:text-amber-400`, `group-[.x]:text-red-300`,
// `text-red-50/50`. Boundary-guarded so `--my-text-red-300x` and a house `text-foreground`
// never match. Scale 50 | 100-900 | 950 → `\d{2,3}`.
const RAW_PALETTE_RE = new RegExp(
    `(?<![\\w-])(?:${PALETTE_PREFIXES})-(?:${PALETTE_FAMILIES})-\\d{2,3}(?![\\w-])`,
);
// The retired shadcn `--ring` DECLARATION (two dashes — `--focus-ring`/`--invalid-ring`
// carry a single dash before `ring`, so they never match). Comment-stripped.
const RING_DEF_RE = /(?<![\w-])--ring\s*:/;
const COLOR_RING_DEF_RE = /(?<![\w-])--color-ring\s*:/;
const FOCUS_RING_COLOR_DEF_RE = /(?<![\w-])--focus-ring-color\s*:/;
// A bare `var(--ring)` / `var(--ring, …)` read (NOT `var(--focus-ring-color)` — single
// dash before `ring` — NOR `var(--ring-…)` — a hyphen, not `,`/`)`, after `--ring`).
const RING_TOKEN_USE_RE = /var\(\s*--ring\s*[,)]/;
// The shadcn ring-COLOR utility off the deleted `--color-ring` bridge: `bg-ring`,
// `text-ring`, `border-ring`, `outline-ring`, … — NOT `ring-ring` (proof:no-shadcn-default
// owns that), NOT `focus-ring`/`invalid-ring` (a different prefix).
const RING_COLOR_UTIL_RE =
    /(?<![\w-])(?:bg|text|border|outline|divide|from|to|via)-ring(?![\w-])/;

// Strip // + /* */ + <!-- --> comments to spaces (a PROSE mention — a clean-break note
// naming the `text-red-300` it retired — is provenance, never a live class).
function stripAllComments(src) {
    return src
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");
}

// Collect every file under `dir` matching `extRe` (recursive).
function walkExt(dir, extRe) {
    const out = [];
    if (!existsSync(dir)) return out;
    for (const name of readdirSync(dir)) {
        const p = resolve(dir, name);
        if (statSync(p).isDirectory()) out.push(...walkExt(p, extRe));
        else if (extRe.test(name)) out.push(p);
    }
    return out;
}

// D2 live scan — src/ files that still read the retired `var(--ring)` OR the ring-color utility.
function scanRingConsumers() {
    const hits = [];
    for (const f of walkExt(SRC, /\.(css|ts|vue)$/)) {
        const clean = stripAllComments(read(f));
        if (RING_TOKEN_USE_RE.test(clean) || RING_COLOR_UTIL_RE.test(clean))
            hits.push(f.slice(SRC.length + 1));
    }
    return hits;
}

// D3 live scan — ui/ files carrying a raw-tailwind PALETTE utility. Returns {count, hits}.
function scanUiPalette() {
    const files = walkExt(UI_DIR, /\.(ts|vue)$/);
    const hits = [];
    for (const f of files) {
        const clean = stripAllComments(read(f));
        if (RAW_PALETTE_RE.test(clean)) hits.push(f.slice(UI_DIR.length + 1));
    }
    return { count: files.length, hits };
}

// overrides: { styleText?, ringConsumers?, uiPalette?, toastCloseText? } — a self-test sabotages any.
function detectDeshadcn(overrides = {}) {
    const violations = [];
    const facts = {};

    // ── DS1 — RING-BREAK: --ring + --color-ring absent from src/styles, --focus-ring-color present. ──
    const styleText =
        overrides.styleText ??
        walkExt(STYLES_DIR, /\.css$/)
            .map((f) => stripAllComments(read(f)))
            .join("\n");
    const ringDefined = RING_DEF_RE.test(styleText);
    const colorRingDefined = COLOR_RING_DEF_RE.test(styleText);
    const focusRingColorDefined = FOCUS_RING_COLOR_DEF_RE.test(styleText);
    facts.ringBreak = { ringDefined, colorRingDefined, focusRingColorDefined };
    if (ringDefined || colorRingDefined || !focusRingColorDefined)
        violations.push(
            `DS1 — the shadcn --ring token (present=${ringDefined}) + --color-ring @theme bridge (present=${colorRingDefined}) must be DEFINITION-ABSENT from src/styles AND --focus-ring-color must be defined (present=${focusRingColorDefined}) — the clean-break rename, no legacy alias`,
        );

    // ── DS2 — RING-CONSUMER-REPOINT: no src/ file reads var(--ring) / the ring-color utility. ──
    const ringConsumers = overrides.ringConsumers ?? scanRingConsumers();
    facts.ringConsumers = ringConsumers;
    if (ringConsumers.length)
        violations.push(
            `DS2 — ${ringConsumers.join(", ")} still read the retired var(--ring) token / the shadcn ring-color utility — re-point onto var(--focus-ring-color) / .focus-ring`,
        );

    // ── DS3 — PALETTE-SWEEP (HEAD-mode, ui/): zero raw-tailwind palette utility. ──
    const uiPalette = overrides.uiPalette ?? scanUiPalette();
    facts.uiPalette = { count: uiPalette.count, hits: uiPalette.hits };
    if (uiPalette.hits.length)
        violations.push(
            `DS3 — ${uiPalette.hits.join(", ")} carry a raw-tailwind PALETTE utility (text-red-NN/bg-amber-NN/…) — the material is 100% token-first; re-point onto a house token`,
        );
    if (uiPalette.count < 40)
        violations.push(
            `DS3 — the ui/ sweep walked only ${uiPalette.count} files (need ≥ 40 — the sweep must reach the surface)`,
        );

    // ── DS4 — TOASTCLOSE-NAME: ToastClose.vue binds a default overridable aria-label. ──
    const toastCloseText =
        overrides.toastCloseText ?? stripAllComments(read(TOAST_CLOSE));
    const bindsAriaLabel = /:aria-label=/.test(toastCloseText);
    const hasDefaultName = /['"`]Dismiss['"`]/.test(toastCloseText);
    facts.toastClose = { bindsAriaLabel, hasDefaultName };
    if (!(bindsAriaLabel && hasDefaultName))
        violations.push(
            `DS4 — ToastClose.vue must bind a DEFAULT overridable aria-label (bindsAriaLabel=${bindsAriaLabel}, hasDefaultName=${hasDefaultName}) — the bare <X> button owes a discernible name`,
        );

    return { facts, violations };
}

// ── BH.W-AXIS-GRAMMAR — the ONE axis-grammar home + the homonym kills. ──
// `_shared/axes.ts` mints the four axis unions (Size/Orientation/Motion + the
// re-exported Surface/SurfaceTier) as the SINGLE grammar vocabulary — the model
// `useSurfaceAxis` set (a union + a resolver + a `[data-surface]` seam) copied to
// the missing three. The visual-rung HOMONYMS are killed: GlassPanel `variant`→
// `tier: SurfaceTier` + its render-backend `tier`→`renderTier: GlassTier` (the
// Card/GlassPanel tier collision); the `ui/tabs/TabsIndicator` BOOLEAN `surface`→
// `plate` (the surface-decoration-axis noun collision). Pure FS, device-free (a
// rename changes ZERO pixels — the BB.W-CARVE4 byte-identical-paint discipline).
// Born-RED on HEAD (axes.ts absent + GlassPanel `variant`/`GlassPanelVariant`
// present + no `renderTier` + TabsIndicator boolean `surface`) → GREEN + a bite
// per clause. Asserts:
//   G1 — AXES-MINTED: axes.ts exists AND exports the four tuples
//        (SIZES/ORIENTATIONS/MOTIONS/SURFACES) + the derived Size/Orientation/
//        Motion types AND re-exports Surface + SurfaceTier from ./useSurfaceAxis.
//   G2 — SURFACE-4-MEMBER: SURFACES is exactly [glass,veil,opaque,clear] (four)
//        AND ≡ the `useSurfaceAxis` `type Surface` union (a drift REDs).
//   G3 — MEMBERSHIP-FENCE: axes.ts exports ONLY axis unions/tuples + the two
//        re-exported surface types — the anti-grab-bag clause (a function /
//        component / default export REDs).
//   G4 — HOMONYM-KILL GlassPanel: GlassPanel.vue declares NO `variant` prop, HAS
//        a `tier` prop + a `renderTier` prop, AND `GlassPanelVariant` is
//        DEFINITION-ABSENT (folded onto SurfaceTier).
//   G5 — HOMONYM-KILL TabsIndicator: ui/tabs/TabsIndicator.vue declares NO boolean
//        `surface` prop AND HAS a boolean `plate` prop.
//   G6 — /axes BARREL: src/axes.ts exists AND re-exports the axes module (the
//        types-only `/axes` subpath front door).
const AXES = resolve(SRC, "components/ui/_shared/axes.ts");
const SURFACE_AXIS = resolve(SRC, "components/ui/_shared/useSurfaceAxis.ts");
const GLASS_PANEL = resolve(SRC, "components/custom/glass-panel/GlassPanel.vue");
const TABS_INDICATOR = resolve(SRC, "components/ui/tabs/TabsIndicator.vue");
const FLAT_AXES = resolve(SRC, "axes.ts");

const AXIS_TUPLES = ["SIZES", "ORIENTATIONS", "MOTIONS", "SURFACES"];
const AXIS_TYPE_NAMES = ["Size", "Orientation", "Motion"];
const CANON_SURFACES = ["glass", "veil", "opaque", "clear"];
// The ONLY names `_shared/axes.ts` may export — the four tuples, the three derived
// unions, + the two re-exported surface types. Anything else is a grab-bag stray.
const AXIS_EXPORT_ALLOW = new Set([
    "Surface",
    "SurfaceTier",
    "Size",
    "Orientation",
    "Motion",
    "SIZES",
    "ORIENTATIONS",
    "MOTIONS",
    "SURFACES",
]);

// The string members of a `NAME = [ "a", "b" ] as const` tuple (comment-stripped);
// null when the tuple is absent.
function tupleMembers(src, name) {
    const m = stripComments(src).match(
        new RegExp(`${name}\\s*=\\s*\\[([^\\]]*)\\]`),
    );
    if (!m) return null;
    return [...m[1].matchAll(/["']([^"']+)["']/g)].map((x) => x[1]);
}

// The string members of a `type NAME = "a" | "b";` union (comment-stripped); null
// when the union is absent.
function unionMembers(src, name) {
    const m = stripComments(src).match(
        new RegExp(`type\\s+${name}\\s*=\\s*([^;]+);`),
    );
    if (!m) return null;
    return [...m[1].matchAll(/["']([^"']+)["']/g)].map((x) => x[1]);
}

// Every exported identifier from a module (comment-stripped): block exports
// (`export { A }` / `export type { A } from …`) + named-declaration exports
// (`export const/type/function/… NAME`) + a `default` sentinel. Used by the
// membership fence (a stray export is a grab-bag leak).
function collectAxesExports(src) {
    const clean = stripComments(src);
    const names = new Set();
    const hasDefault = /export\s+default\b/.test(clean);
    for (const b of clean.matchAll(/export\s+(?:type\s+)?\{([^}]*)\}/g)) {
        for (const raw of b[1].split(",")) {
            const part = raw.trim();
            if (!part) continue;
            const id = part
                .replace(/^type\s+/, "")
                .split(/\s+as\s+/)
                .pop()
                .trim();
            if (id) names.add(id);
        }
    }
    for (const m of clean.matchAll(
        /export\s+(?:async\s+)?(?:const|let|var|function|class|interface|type|enum)\s+([A-Za-z_$][\w$]*)/g,
    ))
        names.add(m[1]);
    return { names: [...names], hasDefault };
}

// overrides: { axesText?, axesExists?, surfaceText?, glassPanelText?, tabsText?,
//              flatText?, flatExists? } — a self-test sabotages any input.
function detectAxisGrammar(overrides = {}) {
    const violations = [];
    const facts = {};

    const axesExists = overrides.axesExists ?? existsSync(AXES);
    const axesSrc = overrides.axesText ?? read(AXES);
    const surfaceSrc = overrides.surfaceText ?? read(SURFACE_AXIS);
    const glassPanelSrc = overrides.glassPanelText ?? read(GLASS_PANEL);
    const tabsSrc = overrides.tabsText ?? read(TABS_INDICATOR);
    const flatExists = overrides.flatExists ?? existsSync(FLAT_AXES);
    const flatSrc = overrides.flatText ?? read(FLAT_AXES);

    // ── G1 — AXES-MINTED: the four tuples + three types + the surface re-export. ──
    const axesClean = stripComments(axesSrc);
    const tuplesPresent = AXIS_TUPLES.every((n) => exportsSymbol(axesSrc, n));
    const typesPresent = AXIS_TYPE_NAMES.every((n) => exportsSymbol(axesSrc, n));
    const reexportsSurface =
        /export\s+type\s*\{[^}]*\bSurface\b[^}]*\}\s*from\s*["']\.\/useSurfaceAxis["']/.test(
            axesClean,
        ) &&
        /export\s+type\s*\{[^}]*\bSurfaceTier\b[^}]*\}\s*from\s*["']\.\/useSurfaceAxis["']/.test(
            axesClean,
        );
    facts.axesMinted = {
        axesExists,
        tuplesPresent,
        typesPresent,
        reexportsSurface,
    };
    if (!(axesExists && tuplesPresent && typesPresent && reexportsSurface))
        violations.push(
            `G1 — _shared/axes.ts must exist (${axesExists}) AND export SIZES/ORIENTATIONS/MOTIONS/SURFACES (${tuplesPresent}) + the Size/Orientation/Motion types (${typesPresent}) + re-export Surface/SurfaceTier from ./useSurfaceAxis (${reexportsSurface})`,
        );

    // ── G2 — SURFACE-4-MEMBER: SURFACES ≡ the useSurfaceAxis Surface union. ──
    const surfacesTuple = tupleMembers(axesSrc, "SURFACES");
    const surfaceUnion = unionMembers(surfaceSrc, "Surface");
    const four = Array.isArray(surfacesTuple) && surfacesTuple.length === 4;
    const canonical = four && CANON_SURFACES.every((m) => surfacesTuple.includes(m));
    const equiv =
        Array.isArray(surfacesTuple) &&
        Array.isArray(surfaceUnion) &&
        surfacesTuple.length === surfaceUnion.length &&
        surfacesTuple.every((m) => surfaceUnion.includes(m)) &&
        surfaceUnion.every((m) => surfacesTuple.includes(m));
    facts.surfaceFourMember = { surfacesTuple, surfaceUnion, four, canonical, equiv };
    if (!(four && canonical && equiv))
        violations.push(
            `G2 — SURFACES must be the 4-member [glass,veil,opaque,clear] (got ${JSON.stringify(surfacesTuple)}) AND ≡ the useSurfaceAxis Surface union (${JSON.stringify(surfaceUnion)})`,
        );

    // ── G3 — MEMBERSHIP-FENCE: axes.ts exports ONLY axis vocabulary. ──
    const { names: axesExportNames, hasDefault } = collectAxesExports(axesSrc);
    const strays = axesExportNames.filter((n) => !AXIS_EXPORT_ALLOW.has(n));
    facts.membershipFence = { axesExportNames, strays, hasDefault };
    if (axesExists && (strays.length || hasDefault))
        violations.push(
            `G3 — _shared/axes.ts exports ONLY axis unions/tuples + the two surface types (grab-bag strays: ${strays.join(", ") || "none"}, default export: ${hasDefault}) — the anti-grab-bag membership fence`,
        );

    // ── G4 — HOMONYM-KILL GlassPanel: variant→tier, backend tier→renderTier. ──
    const gpClean = stripComments(glassPanelSrc);
    const gpHasVariantProp = /\bvariant\s*\??\s*:/.test(gpClean);
    const gpHasTierProp = /\btier\s*\??\s*:/.test(gpClean);
    const gpHasRenderTierProp = /\brenderTier\s*\??\s*:/.test(gpClean);
    const gpVariantTypeAbsent = !definesSymbol(glassPanelSrc, "GlassPanelVariant");
    facts.glassPanelHomonym = {
        gpHasVariantProp,
        gpHasTierProp,
        gpHasRenderTierProp,
        gpVariantTypeAbsent,
    };
    if (
        !(
            !gpHasVariantProp &&
            gpHasTierProp &&
            gpHasRenderTierProp &&
            gpVariantTypeAbsent
        )
    )
        violations.push(
            `G4 — GlassPanel.vue must kill the tier homonym: NO variant prop (present=${gpHasVariantProp}), a tier prop (${gpHasTierProp}) + a renderTier prop (${gpHasRenderTierProp}), GlassPanelVariant DEFINITION-ABSENT (${gpVariantTypeAbsent})`,
        );

    // ── G5 — HOMONYM-KILL TabsIndicator: DELETED (BI.W-DOCK-FOLD) or surface→plate. ──
    // The reka `ui/tabs` substrate is DEFINITION-ABSENT (BI.W-DOCK-FOLD retired it — its
    // sole internal consumer DockLayerGroup re-points onto `useSelectionGroup`), so the
    // `surface` homonym is killed by the STRONGEST form: the whole file is gone. When the
    // file is absent the homonym cannot exist; a re-minted boolean `surface` prop on a
    // resurrected file still reds (via the self-test's `tabsText` override).
    const tabsAbsent = overrides.tabsText === undefined && !existsSync(TABS_INDICATOR);
    const tabsClean = stripComments(tabsSrc);
    const tabsHasSurfaceProp = /\bsurface\s*\??\s*:\s*boolean/.test(tabsClean);
    const tabsHasPlateProp = /\bplate\s*\??\s*:\s*boolean/.test(tabsClean);
    facts.tabsHomonym = { tabsAbsent, tabsHasSurfaceProp, tabsHasPlateProp };
    if (!tabsAbsent && !(!tabsHasSurfaceProp && tabsHasPlateProp))
        violations.push(
            `G5 — ui/tabs/TabsIndicator.vue must kill the surface homonym: NO boolean surface prop (present=${tabsHasSurfaceProp}), a boolean plate prop (${tabsHasPlateProp})`,
        );

    // ── G6 — /axes BARREL: the flat types-only subpath front door. ──
    const flatReexports =
        /from\s*["']\.\/components\/ui\/_shared\/axes["']/.test(
            stripComments(flatSrc),
        );
    facts.flatBarrel = { flatExists, flatReexports };
    if (!(flatExists && flatReexports))
        violations.push(
            `G6 — src/axes.ts must exist (${flatExists}) AND re-export ./components/ui/_shared/axes (${flatReexports})`,
        );

    return { facts, violations };
}

// ── BH.W-SIZE-UNIFY — the size/density collision is killed onto the Size axis. ──
// The library had TWO axes meaning the same scale thing — a component `size` prop
// (with a `default` middle rung) AND a chrome `density` prop (`DockDensity` /
// `ConfiguratorDensity` / a `density:` CVA variant, adjective rungs). This arm
// asserts the ONE clean-break: the middle rung is `md` (not `default`), NO
// component exposes a `density` prop and NO `*Density` type survives, every scale
// rung ∈ Size (`xs|sm|md|lg|xl` — no `default`/`comfortable`/`spacious`/`audacious`/
// `mobile`/`compact`/`base` adjective), Button's `icon`/`icon-sm` SHAPE rungs split
// onto the `iconOnly` boolean, and chip's `cell` SHAPE rung moves onto a `shape`
// axis (a silhouette is never a scale rung — the axes.ts sub-range law). Pure FS,
// device-free (a rename changes ZERO pixels — the byte-identical-paint discipline).
// Born-RED on HEAD (ControlSize `"sm"|"default"|"lg"`, Button `default`/`icon`/
// `icon-sm`, chip `cell`, `DockDensity`/`ConfiguratorDensity` present) → GREEN + a
// bite per clause. Asserts:
//   S1 — DENSITY-ABSENT: no `type \w*Density`, no `density?:`/`density:` prop or
//        CVA-variant key anywhere in components/ (the collision axis is gone).
//   S2 — SIZE-PROP-PRESENT: the dock (useDockShellProps.ts) + configurator
//        (Configurator.vue) declare a `size?:` prop where the `density` prop was.
//   S3 — NO-ADJECTIVE-RUNG: no `size:` CVA block, `type \w*Size` union, or inline
//        `size?:` string union carries a banned scale-adjective rung.
//   S4 — CONTROL-SIZE-MD: `ControlSize` resolves exactly `sm|md|lg` (no `default`).
//   S5 — BUTTON-ICON-SPLIT: button `size:` CVA carries NO `icon`/`icon-sm` rung AND
//        the file declares an `iconOnly` boolean variant.
//   S6 — CHIP-SHAPE: chipVariants `size:` carries NO `cell` rung AND a `shape:` axis
//        with a `cell` member exists.
const CONTROL_SIZE = resolve(SRC, "components/ui/_shared/useControlSize.ts");
const BUTTON_INDEX = resolve(SRC, "components/ui/button/index.ts");
const CHIP_VARIANTS = resolve(
    SRC,
    "components/custom/selectable-chip/chipVariants.ts",
);
const DOCK_SHELL = resolve(
    SRC,
    "components/custom/dock/composables/useDockShellProps.ts",
);
const CONFIG_ROOT = resolve(SRC, "components/custom/configurator/Configurator.vue");
const COMPONENTS_DIR = resolve(SRC, "components");

// The adjective rungs banned from any `size`-shaped union — a scale axis speaks the
// Size ordinal, never an adjective. `base` is a `default` synonym; the contextual
// `control`/`dock` rungs (DarkModeToggle) are NOT scale adjectives and stay legal.
const BANNED_SIZE_RUNGS = new Set([
    "default",
    "comfortable",
    "spacious",
    "audacious",
    "mobile",
    "compact",
    "base",
]);

// Every string-literal / identifier key in a flat `{ … }` block body (no nested
// braces — CVA size/shape blocks are flat key:string maps).
function blockKeys(body) {
    return [...body.matchAll(/(?:^|[,{]\s*)(['"]?)([A-Za-z_$][\w$-]*)\1\s*:/g)].map(
        (m) => m[2],
    );
}
// The body of the FIRST `<name>: { … }` flat block (comment-stripped); null when absent.
function flatBlockBody(src, name) {
    const m = stripComments(src).match(
        new RegExp(`\\b${name}\\s*\\??\\s*:\\s*\\{([^{}]*)\\}`),
    );
    return m ? m[1] : null;
}

// overrides: { controlText, buttonText, chipText, dockText, configText, sources }
// `sources` is a { relPath: text } map merged over the real components/ tree for
// the S1/S3 blanket scan (a self-test injects a synthetic offender file).
function detectSizeGrammar(overrides = {}) {
    const violations = [];
    const facts = {};

    const controlSrc = overrides.controlText ?? read(CONTROL_SIZE);
    const buttonSrc = overrides.buttonText ?? read(BUTTON_INDEX);
    const chipSrc = overrides.chipText ?? read(CHIP_VARIANTS);
    const dockSrc = overrides.dockText ?? read(DOCK_SHELL);
    const configSrc = overrides.configText ?? read(CONFIG_ROOT);

    // The scanned source map: the real components/ tree with per-file overrides so
    // a self-test can sabotage a specific file (or inject a synthetic one).
    const pathFor = {
        [CONTROL_SIZE]: controlSrc,
        [BUTTON_INDEX]: buttonSrc,
        [CHIP_VARIANTS]: chipSrc,
        [DOCK_SHELL]: dockSrc,
        [CONFIG_ROOT]: configSrc,
    };
    const sources = [];
    for (const f of walkSrc(COMPONENTS_DIR)) {
        const rel = f.slice(SRC.length + 1);
        const over = overrides.sources && overrides.sources[rel];
        sources.push({ rel, text: over ?? pathFor[f] ?? read(f) });
    }
    if (overrides.sources)
        for (const [rel, text] of Object.entries(overrides.sources))
            if (!sources.some((s) => s.rel === rel)) sources.push({ rel, text });

    // ── S1 — DENSITY-ABSENT (the collision axis is gone). ──
    const densityTypeHits = [];
    const densityPropHits = [];
    for (const { rel, text } of sources) {
        const clean = stripComments(text);
        if (/\b(?:export\s+)?type\s+[A-Za-z_$][\w$]*Density\b/.test(clean))
            densityTypeHits.push(rel);
        if (/\bdensity\s*\??\s*:/.test(clean)) densityPropHits.push(rel);
    }
    facts.densityAbsent = { densityTypeHits, densityPropHits };
    if (densityTypeHits.length || densityPropHits.length)
        violations.push(
            `S1 — the density axis must be GONE (folded onto Size): \`*Density\` types in [${densityTypeHits.join(", ") || "none"}], \`density:\` props/keys in [${densityPropHits.join(", ") || "none"}]`,
        );

    // ── S2 — SIZE-PROP-PRESENT (the dock + configurator carry a `size` prop). ──
    const dockHasSize = /\bsize\s*\??\s*:/.test(stripComments(dockSrc));
    const configHasSize = /\bsize\s*\??\s*:/.test(stripComments(configSrc));
    facts.sizeProp = { dockHasSize, configHasSize };
    if (!(dockHasSize && configHasSize))
        violations.push(
            `S2 — the dock (useDockShellProps.ts=${dockHasSize}) + configurator (Configurator.vue=${configHasSize}) must declare a \`size\` prop (the density prop re-pointed)`,
        );

    // ── S3 — NO-ADJECTIVE-RUNG (every scale rung ∈ Size). ──
    const adjectiveHits = [];
    const pushHit = (rel, where, rung) => {
        if (BANNED_SIZE_RUNGS.has(rung)) adjectiveHits.push(`${rel}:${where}:${rung}`);
    };
    for (const { rel, text } of sources) {
        const clean = stripComments(text);
        // (a) `type \w*Size = "a" | "b";` unions
        for (const m of clean.matchAll(
            /\btype\s+[A-Za-z_$][\w$]*Size\s*=\s*([^;]+);/g,
        ))
            for (const lit of m[1].matchAll(/["']([^"']+)["']/g))
                pushHit(rel, "type-union", lit[1]);
        // (b) `size: { … }` CVA blocks — the rung KEYS
        for (const m of clean.matchAll(/\bsize\s*\??\s*:\s*\{([^{}]*)\}/g))
            for (const k of blockKeys(m[1])) pushHit(rel, "cva-key", k);
        // (c) inline `size?: "a" | "b"` string unions
        for (const m of clean.matchAll(
            /\bsize\s*\??\s*:\s*("[^"]*"(?:\s*\|\s*"[^"]*")*)/g,
        ))
            for (const lit of m[1].matchAll(/"([^"]+)"/g))
                pushHit(rel, "inline-union", lit[1]);
    }
    facts.adjectiveRungs = adjectiveHits;
    if (adjectiveHits.length)
        violations.push(
            `S3 — a \`size\` axis carries a banned scale-adjective rung (must be xs|sm|md|lg|xl): ${adjectiveHits.join(", ")}`,
        );

    // ── S4 — CONTROL-SIZE-MD (the middle rung is `md`, not `default`). ──
    const controlMembers = unionMembers(controlSrc, "ControlSize");
    const controlOk =
        Array.isArray(controlMembers) &&
        controlMembers.length === 3 &&
        ["sm", "md", "lg"].every((r) => controlMembers.includes(r)) &&
        !controlMembers.includes("default");
    facts.controlSize = { controlMembers };
    if (!controlOk)
        violations.push(
            `S4 — ControlSize must resolve exactly [sm, md, lg] (no \`default\` middle rung) — got ${JSON.stringify(controlMembers)}`,
        );

    // ── S5 — BUTTON-ICON-SPLIT (icon/icon-sm → iconOnly boolean). ──
    const btnSizeBody = flatBlockBody(buttonSrc, "size");
    const btnSizeKeys = btnSizeBody ? blockKeys(btnSizeBody) : [];
    const btnHasIconRung =
        btnSizeKeys.includes("icon") || btnSizeKeys.includes("icon-sm");
    const btnHasIconOnly = /\biconOnly\s*:/.test(stripComments(buttonSrc));
    facts.buttonIcon = { btnSizeKeys, btnHasIconRung, btnHasIconOnly };
    if (btnHasIconRung || !btnHasIconOnly)
        violations.push(
            `S5 — button size must carry NO icon/icon-sm rung (present=${btnHasIconRung}, keys=${JSON.stringify(btnSizeKeys)}) AND declare an \`iconOnly\` boolean variant (${btnHasIconOnly})`,
        );

    // ── S6 — CHIP-SHAPE (cell → shape axis). ──
    const chipSizeBody = flatBlockBody(chipSrc, "size");
    const chipSizeKeys = chipSizeBody ? blockKeys(chipSizeBody) : [];
    const chipSizeHasCell = chipSizeKeys.includes("cell");
    const chipShapeBody = flatBlockBody(chipSrc, "shape");
    const chipShapeHasCell = chipShapeBody
        ? blockKeys(chipShapeBody).includes("cell")
        : false;
    facts.chipShape = { chipSizeKeys, chipSizeHasCell, chipShapeHasCell };
    if (chipSizeHasCell || !chipShapeHasCell)
        violations.push(
            `S6 — chip size must carry NO \`cell\` rung (present=${chipSizeHasCell}) AND a \`shape\` axis with a \`cell\` member (${chipShapeHasCell})`,
        );

    return { facts, violations };
}

// ── BH.W-MOTION-AXIS — the four-boolean motion scatter is killed onto the Motion axis. ──
// The library expressed "opt into physics" as an unnamed four-boolean scatter
// (`draggable`/`pressable`/`spring`/`liquidDrag` — 7 prop instances across 6 SFCs).
// The liquid-weight-universal law means physics is the DEFAULT, so the collapse is a
// single `motion?: Motion` opt-DOWN axis (`full` default → `reduced` → `off`). This arm
// asserts the §GQ-4 contract: NO component PROP exports the four booleans, every carrier
// declares `motion?: Motion` + binds `:data-motion`, the resolver writes `--motion-weight:
// 0` on `off`, PRM clamps DOWN (never escalates), and the kept gesture CONTRACTS
// (`keepDockOpen`/`dragDismiss`/`responsive`) survive. Pure FS, device-free (the collapse
// resolves the SAME physics the booleans did — byte-identical paint at the `full`
// default). Born-RED on HEAD (the four booleans as props) → GREEN + a bite per clause.
//
// THE PROPS-NOT-OPTION-FIELDS FENCE (named so the arm cannot born-RED on legitimate
// holders): the boolean-word scan is scoped to component PROP surfaces — `.vue` files'
// `defineProps`/`withDefaults` interfaces ONLY. The 8 internal composables that own those
// words as OPTION-interface fields at HEAD (`useDrawerSnap.spring` · `useDockFission`/
// `useTabDragMorph`.draggable · `dockMorphContext`/`useDockItemDrag`/
// `useDockOrientationMorph`/`useLayerTransition`/`useDockSpring`'s local `spring`) are
// `.ts` files under `composables/` — EXCLUDED from the grep surface by construction; NONE
// is a public prop, NONE renames. The self-test proves the fence BOTH directions (a
// re-minted `pressable` PROP flags; a `spring` OPTION field on a synthetic composable
// passes). Asserts:
//   M1 — BOOLEAN-PROPS-GONE: no `.vue` `defineProps` interface declares
//        `draggable`/`pressable`/`spring`/`liquidDrag` as a prop (a native HTML
//        `draggable=` template attr / a `.ts` composable option field does NOT count).
//   M2 — MOTION-TYPED: each of the 6 carriers declares a `motion?: Motion` prop.
//   M3 — DATA-MOTION-WRITE: each carrier binds `:data-motion` in its template.
//   M4 — MOTION-WEIGHT-OFF: the `useMotionAxis` resolver writes `--motion-weight: 0`
//        on the `off` rung (the live scalar the cartoon channels already read).
//   M5 — PRM-PRECEDENCE: `resolveMotion` clamps a prop DOWN under PRM (full/reduced →
//        reduced) — no code path lets the prop escalate ABOVE PRM.
//   M6 — KEPT-CONTRACTS: `keepDockOpen`/`dragDismiss`/`responsive` survive as distinct
//        props (the inverse-over-unification fence — a gesture CONTRACT is not motion
//        intensity).
const MOTION_AXIS_LEAF = resolve(SRC, "components/ui/_shared/useMotionAxis.ts");
// The six carriers the §4.5 disk-grep names (4 boolean names across 6 SFCs).
const MOTION_CARRIERS = [
    { rel: "components/ui/card/Card.vue", name: "Card" },
    { rel: "components/ui/slider/Slider.vue", name: "Slider" },
    { rel: "components/ui/dialog/DialogContent.vue", name: "DialogContent" },
    { rel: "components/ui/sheet/SheetContent.vue", name: "SheetContent" },
    { rel: "components/custom/tabs/SegmentedTabs.vue", name: "SegmentedTabs" },
    { rel: "components/custom/dock/DockLayerGroup.vue", name: "DockLayerGroup" },
];
const MOTION_BOOLEANS = ["draggable", "pressable", "spring", "liquidDrag"];
// The kept gesture contracts (NOT motion intensity) — must survive the collapse.
const KEPT_CONTRACTS = [
    { prop: "keepDockOpen", rel: "components/ui/slider/Slider.vue" },
    { prop: "dragDismiss", rel: "components/ui/sheet/SheetContent.vue" },
    { prop: "responsive", rel: "components/custom/tabs/SegmentedTabs.vue" },
];

// A PROP declaration of `name` in a `.vue` file's `defineProps`/`withDefaults`
// interface — `name?:`/`name:` followed by a TYPE IDENTIFIER (comment-stripped). Three
// non-prop shapes are EXCLUDED by construction: (a) a native HTML `draggable="x"` / a
// `:draggable="x"` v-bind has NO `:` AFTER the word; (b) an inline composable OPTION
// passed in the .vue script (`draggable: () => …`) is a VALUE — the `:` is followed by
// `(`/`'`/`"`/`[`, not a type identifier, so the type-start class rejects it; (c) a
// `.ts` composable is not scanned at all. The prop-type start must be a type identifier
// (`boolean`/`Motion`/`SpringPreset`/…) — an uppercase or lowercase-primitive word.
function declaresProp(src, name) {
    // `?:` marks a prop (optional-field syntax); a bare `name:` requires an identifier
    // type NOT immediately followed by `=>` (which would be an inline arrow VALUE).
    const clean = stripComments(src);
    // Optional-prop form `name?: <TypeIdent>` — the `?` before `:` is prop-shape.
    if (new RegExp(`\\b${name}\\s*\\?\\s*:\\s*[A-Za-z_$]`).test(clean)) return true;
    // Non-optional `name: <TypeIdent>` NOT part of an inline `() =>`/value — the type
    // token is a bare identifier and the next non-space is a type continuation
    // (`|`/`&`/`<`/`;`/`}`/`,`/end), never `=>` (an arrow value) or `(` (a call value).
    const m = new RegExp(`\\b${name}\\s*:\\s*([A-Za-z_$][\\w$]*)\\s*(=>|[^\\w$])`).exec(
        clean,
    );
    if (m && m[2].trim() !== "=>" && m[2] !== "(") return true;
    return false;
}

// overrides: { leafText?, leafExists?, sources? } — `sources` is a { rel: text } map
// merged over the real components/ tree; a self-test injects a synthetic offender/holder.
function detectMotionAxis(overrides = {}) {
    const violations = [];
    const facts = {};

    const leafExists = overrides.leafExists ?? existsSync(MOTION_AXIS_LEAF);
    const leafSrc =
        overrides.leafText ?? (leafExists ? read(MOTION_AXIS_LEAF) : "");

    // The scanned .vue component prop surface — the real ui/ + custom/ tree with
    // per-file overrides so a self-test can sabotage a specific file or inject one.
    const vueSources = [];
    for (const f of walkSrc(COMPONENTS_DIR)) {
        if (!f.endsWith(".vue")) continue; // props live in .vue; .ts composables excluded.
        const rel = f.slice(SRC.length + 1);
        const over = overrides.sources && overrides.sources[rel];
        vueSources.push({ rel, text: over ?? read(f) });
    }
    if (overrides.sources)
        for (const [rel, text] of Object.entries(overrides.sources))
            if (rel.endsWith(".vue") && !vueSources.some((s) => s.rel === rel))
                vueSources.push({ rel, text });

    // Per-carrier text (over-ridable) for the M2/M3/M6 per-file asserts.
    const carrierText = {};
    for (const c of MOTION_CARRIERS) {
        const over =
            overrides.sources && overrides.sources[c.rel];
        carrierText[c.rel] = over ?? read(resolve(SRC, c.rel));
    }

    // ── M1 — BOOLEAN-PROPS-GONE (no .vue defineProps declares the four booleans). ──
    const boolPropHits = [];
    for (const { rel, text } of vueSources) {
        for (const b of MOTION_BOOLEANS)
            if (declaresProp(text, b)) boolPropHits.push(`${rel}:${b}`);
    }
    facts.boolPropsGone = { hits: boolPropHits, scanned: vueSources.length };
    if (boolPropHits.length)
        violations.push(
            `M1 — no .vue component may declare a \`draggable\`/\`pressable\`/\`spring\`/\`liquidDrag\` PROP (folded onto \`motion\`): ${boolPropHits.join(", ")}`,
        );

    // ── M2 — MOTION-TYPED (each carrier declares `motion?: Motion`). ──
    const missingMotion = [];
    for (const c of MOTION_CARRIERS) {
        const clean = stripComments(carrierText[c.rel]);
        // `motion?: Motion` AND the `Motion` type imported from the axes home.
        const hasMotionProp = /\bmotion\s*\??\s*:\s*Motion\b/.test(clean);
        const importsMotion =
            /import\s+type\s*\{[^}]*\bMotion\b[^}]*\}\s*from\s*["'][^"']*axes["']/.test(
                clean,
            );
        if (!(hasMotionProp && importsMotion))
            missingMotion.push(
                `${c.name}(prop=${hasMotionProp},import=${importsMotion})`,
            );
    }
    facts.motionTyped = { missing: missingMotion };
    if (missingMotion.length)
        violations.push(
            `M2 — every carrier must declare a \`motion?: Motion\` prop (Motion imported from axes): ${missingMotion.join(", ")}`,
        );

    // ── M3 — DATA-MOTION-WRITE (each carrier binds `:data-motion`). ──
    const missingDataMotion = [];
    for (const c of MOTION_CARRIERS) {
        const clean = stripComments(carrierText[c.rel]);
        if (!/:data-motion\s*=/.test(clean)) missingDataMotion.push(c.name);
    }
    facts.dataMotionWrite = { missing: missingDataMotion };
    if (missingDataMotion.length)
        violations.push(
            `M3 — every carrier must bind \`:data-motion\` on its root (the F5.2 two-door calm selector hook): ${missingDataMotion.join(", ")}`,
        );

    // ── M4 — MOTION-WEIGHT-OFF (the resolver writes `--motion-weight: 0` on `off`). ──
    const cleanLeaf = stripComments(leafSrc);
    const writesWeightOff =
        /--motion-weight/.test(cleanLeaf) &&
        /["']off["']/.test(cleanLeaf) &&
        /useMotionAxis/.test(cleanLeaf);
    facts.motionWeightOff = { leafExists, writesWeightOff };
    if (!(leafExists && writesWeightOff))
        violations.push(
            `M4 — useMotionAxis.ts must exist AND write \`--motion-weight: 0\` on the \`off\` rung (leaf=${leafExists}, write=${writesWeightOff})`,
        );

    // ── M5 — PRM-PRECEDENCE (resolveMotion clamps DOWN under PRM, never escalates). ──
    const hasResolveMotion = /export\s+function\s+resolveMotion\b/.test(
        cleanLeaf,
    );
    // The clamp: `off` short-circuits (returns off) AND the PRM branch forces
    // full/reduced → "reduced" (a live `matchMedia('(prefers-reduced-motion: reduce)')`
    // read gating a return of "reduced"). No branch returns a rung ABOVE the requested.
    const prmClampsDown =
        /return\s+["']off["']/.test(cleanLeaf) &&
        /prefers-reduced-motion/.test(cleanLeaf) &&
        /return\s+prmActive\(\)\s*\?\s*["']reduced["']/.test(cleanLeaf);
    facts.prmPrecedence = { hasResolveMotion, prmClampsDown };
    if (!(hasResolveMotion && prmClampsDown))
        violations.push(
            `M5 — resolveMotion must clamp DOWN under PRM (full/reduced → reduced) + preserve \`off\`, never escalate above PRM (resolveMotion=${hasResolveMotion}, prmClampsDown=${prmClampsDown})`,
        );

    // ── M6 — KEPT-CONTRACTS (the distinct gesture contracts survive as PROPS). ──
    // `declaresProp` (the same prop-shape detector M1 uses) — so a `keepDockOpen: true`
    // withDefaults VALUE does not count as a surviving contract; only the `keepDockOpen?:
    // boolean` PROP declaration does (the contract must stay a real prop, not a value).
    const missingContracts = [];
    for (const c of KEPT_CONTRACTS) {
        const over = overrides.sources && overrides.sources[c.rel];
        const text = over ?? read(resolve(SRC, c.rel));
        if (!declaresProp(text, c.prop))
            missingContracts.push(`${c.prop}@${c.rel.split("/").pop()}`);
    }
    facts.keptContracts = { missing: missingContracts };
    if (missingContracts.length)
        violations.push(
            `M6 — the kept gesture contracts (keepDockOpen/dragDismiss/responsive — NOT motion intensity) must survive: missing ${missingContracts.join(", ")}`,
        );

    return { facts, violations };
}

// ── BG.W-GOO-BARBELL-CSS — the goo-morph BARBELL geometry carve. ──
// useGooMorph.ts is the ONE goo-morph engine (Carousel≡Pager share it via
// useCarouselWorm/usePagerWorm). The PURE barbell-projection GEOMETRY — the
// bell() well shape, the body-center separation, the neck girth/span, the
// volume-preserving squash, the overlapping-action arc, and the compositor
// transform-string composers — is carved into a colocated STATELESS leaf
// (gooBarbellGeometry.ts) the engine COMPOSES. The engine KEEPS the stateful
// rAF/transition/DOM-write orchestration + the token reads; the geometry math
// beside it. Byte-identical paint (the transform strings are byte-preserved —
// paint-class P). Born-RED on HEAD (leaf absent + the geometry defined in the
// engine) → GREEN on the carve + a bite per clause. Asserts:
//   GB1 — COLOCATION: gooBarbellGeometry.ts exists AND exports the geometry fns
//         (projectBarbell/composeBodyTransform/composeNeckTransform/
//         composeRestNeckTransform/bell/bodyDiameter/PHI) AND useGooMorph.ts
//         imports the consumed set back from "./gooBarbellGeometry".
//   GB2 — STATELESS-LEAF: the leaf owns NO state — no SpringProgress/keyframes
//         import, no vue import (no reactivity), no rAF (requestAnimationFrame),
//         no DOM read/write (getComputedStyle/.style/document/window), no
//         mulberry32/hashString rng ownership, and ZERO module-level mutable
//         let/var.
//   GB3 — SINGLE-DEFINITION: the pure geometry fns are DEFINED in the leaf AND
//         DEFINITION-ABSENT from the engine (the carve is real — no dual-path
//         copy; writeBody stays a thin driver DOM wrapper over the composer).
const GOO_ENGINE = resolve(SRC, "composables/motion/useGooMorph.ts");
const GOO_LEAF = resolve(SRC, "composables/motion/gooBarbellGeometry.ts");
// The pure geometry symbols the leaf owns (the exports).
const GOO_GEOM_EXPORTS = [
    "PHI",
    "bell",
    "bodyDiameter",
    "projectBarbell",
    "composeBodyTransform",
    "composeNeckTransform",
    "composeRestNeckTransform",
];
// The subset the engine COMPOSES back (bell/bodyDiameter/PHI live inside
// projectBarbell — the engine consumes the projection + the three composers).
const GOO_GEOM_IMPORTS = [
    "projectBarbell",
    "composeBodyTransform",
    "composeNeckTransform",
    "composeRestNeckTransform",
];
// The pure functions that must be DEFINITION-ABSENT from the engine (the dual-path
// fence). PHI is a const (checked via definesSymbol below); the DOM-writing
// writeBody wrapper stays in the engine and is NOT a leaf symbol, so it is fine.
const GOO_GEOM_SINGLE_DEF = [
    "bell",
    "bodyDiameter",
    "projectBarbell",
    "composeBodyTransform",
    "composeNeckTransform",
    "composeRestNeckTransform",
];

// overrides: { engineText?, leafExists?, leafText? } — a self-test sabotages any.
function detectGooBarbell(overrides = {}) {
    const violations = [];
    const facts = {};

    const engineSrc = overrides.engineText ?? read(GOO_ENGINE);
    const leafExists = overrides.leafExists ?? existsSync(GOO_LEAF);
    const leafSrc = overrides.leafText ?? (leafExists ? read(GOO_LEAF) : "");

    // ── GB1 — COLOCATION: leaf exists + exports the geometry fns + engine imports back. ──
    const leafExportsAll = GOO_GEOM_EXPORTS.every((n) => exportsSymbol(leafSrc, n));
    const engineImports = importsFromSpec(
        engineSrc,
        "./gooBarbellGeometry",
        GOO_GEOM_IMPORTS,
    );
    facts.colocation = { leafExists, leafExportsAll, engineImports };
    if (!(leafExists && leafExportsAll && engineImports))
        violations.push(
            `GB1 — gooBarbellGeometry.ts must exist (${leafExists}) AND export ${GOO_GEOM_EXPORTS.join("/")} (${leafExportsAll}) AND useGooMorph.ts must import ${GOO_GEOM_IMPORTS.join("/")} from "./gooBarbellGeometry" (${engineImports})`,
        );

    // ── GB2 — STATELESS-LEAF: no spring/keyframes fork, no vue, no rAF, no DOM, no rng, no module state. ──
    const cleanLeaf = stripComments(leafSrc);
    const hasSpring =
        /\bSpringProgress\b/.test(cleanLeaf) ||
        /from\s*["']@mkbabb\/keyframes(\.js)?["']/.test(cleanLeaf);
    const importsVue = /from\s*["']vue["']/.test(cleanLeaf);
    const hasRaf = /\brequestAnimationFrame\b/.test(cleanLeaf);
    const touchesDom =
        /\bgetComputedStyle\b/.test(cleanLeaf) ||
        /\.style\b/.test(cleanLeaf) ||
        /\bdocument\b/.test(cleanLeaf) ||
        /\bwindow\b/.test(cleanLeaf);
    const ownsRng = /\b(mulberry32|hashString)\s*\(/.test(cleanLeaf);
    // Module-scope mutable = a `let`/`var` at COLUMN 0 (a function-local decl is indented).
    const moduleMutable = /^(let|var)\s/m.test(cleanLeaf);
    facts.stateless = {
        hasSpring,
        importsVue,
        hasRaf,
        touchesDom,
        ownsRng,
        moduleMutable,
    };
    if (
        !(
            leafExists &&
            !hasSpring &&
            !importsVue &&
            !hasRaf &&
            !touchesDom &&
            !ownsRng &&
            !moduleMutable
        )
    )
        violations.push(
            `GB2 — gooBarbellGeometry.ts must be a stateless pure leaf (spring=${hasSpring}, vue=${importsVue}, rAF=${hasRaf}, DOM=${touchesDom}, rng=${ownsRng}, module-mutable=${moduleMutable})`,
        );

    // ── GB3 — SINGLE-DEFINITION: the geometry fns live in the leaf, absent from the engine. ──
    const leafDefinesAll = GOO_GEOM_SINGLE_DEF.every(
        (n) => definesFunction(leafSrc, n) || definesSymbol(leafSrc, n),
    );
    const engineRedefines = GOO_GEOM_SINGLE_DEF.filter(
        (n) => definesFunction(engineSrc, n) || definesSymbol(engineSrc, n),
    );
    facts.singleDefinition = { leafDefinesAll, engineRedefines };
    if (!(leafDefinesAll && engineRedefines.length === 0))
        violations.push(
            `GB3 — the geometry fns must be DEFINED in the leaf (${leafDefinesAll}) AND DEFINITION-ABSENT from useGooMorph.ts (re-defined: ${engineRedefines.join(", ") || "none"}) — the carve is real, no dual-path copy`,
        );

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
            godModuleSource: `const RATCHET_BASELINES = { "components/custom/blob/composables/useBlobSatellites.ts": 533 };`,
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

    // ── BI.W-ENCAP-REDRAIN — the C2/C3 bites over the useGlassBackdropLuminance carve
    //    (the sample-leaf drain). A host re-inlining the sampler (a leaf-import fig-leaf
    //    over a live `function sampleAnimated`) REDs C3; a severed import REDs C2. ──
    const lum = COLOCATE_CARVES.find(
        (c) => c.name === "useGlassBackdropLuminance",
    );
    const lumHost = read(resolve(ROOT, lum.host));
    const lumGod = read(GOD_MODULE);
    const lumLeaf = {};
    for (const l of lum.leaves) {
        const p = resolve(ROOT, l.path);
        lumLeaf[l.path] = { exists: existsSync(p), text: read(p) };
    }
    const lumInputs = () => ({ hostText: lumHost, godSrc: lumGod, leaf: lumLeaf });
    const sabLum = (inputs, prefix, name) => {
        const v = detectOneCarve(lum, inputs);
        if (v.some((x) => x.startsWith(prefix))) flagged++;
        else
            throw new Error(
                `[proof:encapsulation self-test] luminance-carve bite FAILED to flag: ${name}`,
            );
    };
    const sabNotLum = (inputs, prefix, name) => {
        const v = detectOneCarve(lum, inputs);
        if (!v.some((x) => x.startsWith(prefix))) flagged++;
        else
            throw new Error(
                `[proof:encapsulation self-test] luminance-carve fence bite WRONGLY flagged: ${name}`,
            );
    };
    // C3: the observer RE-INLINES `function sampleAnimated` (the dual-path fig-leaf —
    // a leaf import over a live duplicate; the spec's named self-test bite).
    sabLum(
        {
            ...lumInputs(),
            hostText: `function sampleAnimated(el, source, ctx) { return null; }\n${lumHost}`,
        },
        "C3",
        "C3 useGlassBackdropLuminance re-inlines sampleAnimated (dual-path fig-leaf)",
    );
    // C2: the observer SEVERS the backdropLuminanceSample import (no composition).
    sabLum(
        {
            ...lumInputs(),
            hostText: lumHost.replace(
                /import\s*\{[\s\S]*?\}\s*from\s*["']\.\/backdropLuminanceSample["'];/,
                "",
            ),
        },
        "C2",
        "C2 useGlassBackdropLuminance drops the backdropLuminanceSample import",
    );
    // C3 (fence): a bare comment mention of `sampleAnimated` in the host does NOT flag.
    sabNotLum(
        {
            ...lumInputs(),
            hostText: `// sampleAnimated is the live-field sampler\n${lumHost}`,
        },
        "C3",
        "C3 comment-mention fence (a note is not a definition)",
    );

    // ── BG.W-DEAD-SWEEP — the alias-kill A1/A2 bites over detectAliasKill. ──
    const sabA = (overrides, prefix, name) => {
        const { violations } = detectAliasKill(overrides);
        if (violations.some((x) => x.startsWith(prefix))) flagged++;
        else
            throw new Error(
                `[proof:encapsulation self-test] alias-kill bite FAILED to flag: ${name}`,
            );
    };
    const sabNotA = (overrides, name) => {
        const { violations } = detectAliasKill(overrides);
        if (violations.length === 0) flagged++;
        else
            throw new Error(
                `[proof:encapsulation self-test] alias-kill fence bite WRONGLY flagged: ${name}`,
            );
    };
    // A1: the shim file re-planted on disk (born-RED demonstration).
    sabA({ aliasExists: true, referers: [] }, "A1", "A1 selectableChipVariants.ts re-planted");
    // A2: a src/ module still imports the deleted shim spec (a half-done re-point).
    sabA(
        { aliasExists: false, referers: ["components/custom/selectable-chip/index.ts"] },
        "A2",
        "A2 a straggler still imports the shim spec",
    );
    // Fence: file absent + zero referers (the swept, fully re-pointed tree) → no violation.
    sabNotA({ aliasExists: false, referers: [] }, "the swept + re-pointed tree");

    // ── BG.W-DESHADCN — the DS1/DS2/DS3/DS4 bites over detectDeshadcn. ──
    const sabD = (overrides, prefix, name) => {
        const { violations } = detectDeshadcn(overrides);
        if (violations.some((x) => x.startsWith(prefix))) flagged++;
        else
            throw new Error(
                `[proof:encapsulation self-test] deshadcn bite FAILED to flag: ${name}`,
            );
    };
    const sabNotD = (overrides, prefix, name) => {
        const { violations } = detectDeshadcn(overrides);
        if (!violations.some((x) => x.startsWith(prefix))) flagged++;
        else
            throw new Error(
                `[proof:encapsulation self-test] deshadcn fence bite WRONGLY flagged: ${name}`,
            );
    };
    // A clean baseline the sabotage overlays (the live tree at close).
    const cleanD = () => ({
        styleText: "  --focus-ring-color: hsl(24 10% 10%);\n",
        ringConsumers: [],
        uiPalette: { count: 234, hits: [] },
        toastCloseText: ':aria-label="ariaLabel"  ariaLabel ?? "Dismiss"',
    });
    // DS1: a re-added `--ring:` declaration (the retired token survives).
    sabD(
        { ...cleanD(), styleText: "  --ring: hsl(24 10% 10%);\n  --focus-ring-color: hsl(24 10% 10%);\n" },
        "DS1",
        "DS1 the shadcn --ring declaration survives",
    );
    // DS1: a re-added `--color-ring:` @theme bridge.
    sabD(
        { ...cleanD(), styleText: "  --color-ring: var(--focus-ring-color);\n  --focus-ring-color: hsl(24 10% 10%);\n" },
        "DS1",
        "DS1 the --color-ring @theme bridge survives",
    );
    // DS1: --focus-ring-color missing (the rename never landed the house token).
    sabD(
        { ...cleanD(), styleText: "  --shadow: hsl(24 10% 10%);\n" },
        "DS1",
        "DS1 --focus-ring-color absent",
    );
    // DS1 (fence): a bare COMMENT mention of --ring does NOT re-arm (comment-stripped upstream).
    sabNotD(
        { ...cleanD(), styleText: "  --focus-ring-color: hsl(24 10% 10%);\n" },
        "DS1",
        "DS1 clean rename (no --ring, no --color-ring, --focus-ring-color present)",
    );
    // DS2: a src/ file still reads the retired var(--ring) token.
    sabD(
        { ...cleanD(), ringConsumers: ["styles/tokens/scale-paper.css"] },
        "DS2",
        "DS2 a file still reads var(--ring)",
    );
    // DS3: a ui/ file carries a raw-tailwind palette utility (the ToastClose red).
    sabD(
        { ...cleanD(), uiPalette: { count: 234, hits: ["toast/ToastClose.vue"] } },
        "DS3",
        "DS3 a ui/ file carries a raw palette utility",
    );
    // DS3 (live regex bite): the RE flags a synthetic red-palette + a renamed emerald-500 evasion
    // AND SPARES the house `text-foreground`/`bg-card`/`opacity-0` non-palette tokens.
    if (
        RAW_PALETTE_RE.test("group-[.destructive]:text-red-300 hover:text-red-50") &&
        RAW_PALETTE_RE.test("dark:text-amber-400") &&
        RAW_PALETTE_RE.test("bg-emerald-500") &&
        !RAW_PALETTE_RE.test("text-foreground bg-card opacity-0 focus-ring rounded-button")
    )
        flagged++;
    else
        throw new Error(
            "[proof:encapsulation self-test] DS3 palette regex FAILED the distinguishing bite (must flag red/amber/emerald palette, spare foreground/card/opacity/focus-ring)",
        );
    // DS3 (count floor): a too-thin sweep reds (the sweep must reach the surface).
    sabD(
        { ...cleanD(), uiPalette: { count: 3, hits: [] } },
        "DS3",
        "DS3 the ui/ sweep walked < 40 files",
    );
    // DS4: ToastClose without a default aria-label (the bare <X>).
    sabD(
        { ...cleanD(), toastCloseText: "<ToastClose><X /></ToastClose>" },
        "DS4",
        "DS4 ToastClose ships no default aria-label",
    );
    // DS-clean (fence): the full swept + renamed tree → zero deshadcn violation.
    sabNotD(cleanD(), "DS", "the swept + renamed + named tree");

    // ── BH.W-AXIS-GRAMMAR — the G1–G6 bites over detectAxisGrammar. ──
    const liveAxes = read(AXES);
    const liveGlassPanel = read(GLASS_PANEL);
    const liveTabs = read(TABS_INDICATOR);
    const sabG = (overrides, prefix, name) => {
        const { violations } = detectAxisGrammar(overrides);
        if (violations.some((x) => x.startsWith(prefix))) flagged++;
        else
            throw new Error(
                `[proof:encapsulation self-test] axis-grammar bite FAILED to flag: ${name}`,
            );
    };
    const sabNotG = (overrides, prefix, name) => {
        const { violations } = detectAxisGrammar(overrides);
        if (!violations.some((x) => x.startsWith(prefix))) flagged++;
        else
            throw new Error(
                `[proof:encapsulation self-test] axis-grammar fence bite WRONGLY flagged: ${name}`,
            );
    };
    // G1: axes.ts drops the SIZES tuple (the vocabulary is incomplete).
    sabG(
        { axesText: liveAxes.replace(/export const SIZES[^\n]*\n/, "") },
        "G1",
        "G1 axes.ts drops the SIZES tuple",
    );
    // G2: SURFACES drifts to a 3-member set (clear dropped — off the Surface union).
    sabG(
        {
            axesText: liveAxes.replace(
                /SURFACES\s*=\s*\[[^\]]*\]/,
                'SURFACES = ["glass", "veil", "opaque"]',
            ),
        },
        "G2",
        "G2 SURFACES drifts off the Surface union (3-member)",
    );
    // G3: a grab-bag function export planted in axes.ts (the anti-grab-bag fence).
    sabG(
        { axesText: `${liveAxes}\nexport function computeSize() { return 0; }\n` },
        "G3",
        "G3 a grab-bag function export in axes.ts",
    );
    // G3 (fence): the clean axes-only vocabulary does NOT trip the membership fence.
    sabNotG({}, "G3", "G3 the clean axes-only vocabulary");
    // G4: GlassPanel re-mints the `variant` surface-rung prop (the homonym returns).
    sabG(
        {
            glassPanelText: liveGlassPanel.replace(
                /export interface GlassPanelProps \{/,
                "export interface GlassPanelProps {\n    variant?: SurfaceTier;",
            ),
        },
        "G4",
        "G4 GlassPanel re-mints a variant prop",
    );
    // G4 (fence): a bare COMMENT mention of `variant` in GlassPanel does NOT flag.
    sabNotG(
        { glassPanelText: `// variant is the retired homonym\n${liveGlassPanel}` },
        "G4",
        "G4 comment-mention fence (a note is not a prop)",
    );
    // G5: TabsIndicator re-mints the boolean `surface` prop (the homonym returns).
    sabG(
        {
            tabsText: liveTabs.replace(/\bplate\?:\s*boolean/, "surface?: boolean"),
        },
        "G5",
        "G5 TabsIndicator re-mints a boolean surface prop",
    );
    // G6: the flat /axes barrel is absent (the subpath front door never landed).
    sabG(
        { flatExists: false, flatText: "" },
        "G6",
        "G6 the /axes barrel is absent",
    );

    // ── BH.W-SIZE-UNIFY — the S1–S6 bites over detectSizeGrammar. ──
    const liveButtonSz = read(BUTTON_INDEX);
    const liveChipSz = read(CHIP_VARIANTS);
    const liveControlSz = read(CONTROL_SIZE);
    const sabS = (overrides, prefix, name) => {
        const { violations } = detectSizeGrammar(overrides);
        if (violations.some((x) => x.startsWith(prefix))) flagged++;
        else
            throw new Error(
                `[proof:encapsulation self-test] size-grammar bite FAILED to flag: ${name}`,
            );
    };
    const sabNotS = (overrides, prefix, name) => {
        const { violations } = detectSizeGrammar(overrides);
        if (!violations.some((x) => x.startsWith(prefix))) flagged++;
        else
            throw new Error(
                `[proof:encapsulation self-test] size-grammar fence bite WRONGLY flagged: ${name}`,
            );
    };
    // S1: a `*Density` type survives (the collision axis re-introduced).
    sabS(
        { sources: { "components/_selftest-density-type.ts": 'export type FooDensity = "a" | "b";' } },
        "S1",
        "S1 a *Density type survives",
    );
    // S1: a `density?:` prop survives (the collision axis re-introduced).
    sabS(
        { sources: { "components/_selftest-density-prop.vue": "defineProps<{ density?: string }>()" } },
        "S1",
        "S1 a density prop survives",
    );
    // S2: the dock drops its `size` prop (the density re-point never landed).
    sabS(
        { dockText: "export interface DockProps { orientation?: string; }" },
        "S2",
        "S2 the dock drops its size prop",
    );
    // S3: a size rung re-adds the `default` scale adjective.
    sabS(
        { buttonText: liveButtonSz.replace("md: 'h-(--control-h-md)',", "default: 'h-(--control-h-md)',") },
        "S3",
        "S3 a size rung re-adds the `default` adjective",
    );
    // S4: ControlSize re-adds the `default` middle rung.
    sabS(
        { controlText: liveControlSz.replace('export type ControlSize = "sm" | "md" | "lg";', 'export type ControlSize = "sm" | "default" | "lg";') },
        "S4",
        "S4 ControlSize re-adds `default`",
    );
    // S5: button re-adds an `icon` SHAPE rung to the size axis.
    sabS(
        { buttonText: liveButtonSz.replace("md: 'h-(--control-h-md)',", "md: 'h-(--control-h-md)',\n        icon: 'h-(--control-h-md) w-(--control-h-md) p-0',") },
        "S5",
        "S5 button re-adds an `icon` size rung",
    );
    // S6: chip drops its `shape` axis (the `cell` silhouette has nowhere to live).
    sabS(
        { chipText: liveChipSz.replace("shape: {", "xshape: {") },
        "S6",
        "S6 chip drops its shape axis",
    );
    // S-fence: the migrated tree carries ZERO size/density-collision violation.
    sabNotS({}, "S", "S the migrated tree (no size/density collision)");

    // ── BH.W-MOTION-AXIS — the M1–M6 bites over detectMotionAxis. ──
    const liveMotionLeaf = read(MOTION_AXIS_LEAF);
    const liveCard = read(resolve(SRC, "components/ui/card/Card.vue"));
    const sabM = (overrides, prefix, name) => {
        const { violations } = detectMotionAxis(overrides);
        if (violations.some((x) => x.startsWith(prefix))) flagged++;
        else
            throw new Error(
                `[proof:encapsulation self-test] motion-axis bite FAILED to flag: ${name}`,
            );
    };
    const sabNotM = (overrides, prefix, name) => {
        const { violations } = detectMotionAxis(overrides);
        if (!violations.some((x) => x.startsWith(prefix))) flagged++;
        else
            throw new Error(
                `[proof:encapsulation self-test] motion-axis fence bite WRONGLY flagged: ${name}`,
            );
    };
    // M1: a re-minted `pressable` PROP on a synthetic .vue (the collapse un-does).
    sabM(
        {
            sources: {
                "components/_selftest-pressable.vue":
                    "defineProps<{ pressable?: boolean }>()",
            },
        },
        "M1",
        "M1 a re-minted `pressable` prop on a .vue",
    );
    // M1: a re-minted `draggable` PROP on a synthetic .vue.
    sabM(
        {
            sources: {
                "components/_selftest-draggable.vue":
                    "withDefaults(defineProps<{ draggable?: boolean }>(), {})",
            },
        },
        "M1",
        "M1 a re-minted `draggable` prop on a .vue",
    );
    // M1 (the props-not-option-fields fence — the CARDINAL bite): a `spring` OPTION
    // field on a synthetic COMPOSABLE (`.ts` under composables/) must NOT flag — the
    // arm scans .vue prop surfaces ONLY, so a legitimate internal option holder passes.
    sabNotM(
        {
            sources: {
                "components/custom/dock/composables/_selftest-fission.ts":
                    "interface FissionOpts { spring?: SpringProgress; draggable?: () => boolean; }",
            },
        },
        "M1",
        "M1 fence — a `spring`/`draggable` OPTION field on a .ts composable passes",
    );
    // M1 (the native-attr fence): a template `<img draggable="false">` native HTML attr
    // is NOT a prop declaration (no `:` after the word) — must NOT flag.
    sabNotM(
        {
            sources: {
                "components/_selftest-native-drag.vue":
                    '<template><img draggable="false" :draggable="x" /></template>',
            },
        },
        "M1",
        "M1 fence — a native `draggable=` template attr is not a prop",
    );
    // M2: a carrier drops its `motion: Motion` prop (the collapse never landed).
    sabM(
        {
            sources: {
                "components/ui/card/Card.vue": liveCard
                    .replace(/\bmotion\s*\?:\s*Motion;/, "")
                    .replace(
                        /import type \{ Motion \} from "\.\.\/_shared\/axes";/,
                        "",
                    ),
            },
        },
        "M2",
        "M2 Card drops its `motion: Motion` prop",
    );
    // M3: a carrier drops its `:data-motion` bind (the F5.2 hook never landed).
    sabM(
        {
            sources: {
                "components/ui/card/Card.vue": liveCard.replace(
                    /:data-motion="[^"]*"/,
                    "",
                ),
            },
        },
        "M3",
        "M3 Card drops its :data-motion bind",
    );
    // M4: the resolver stops writing `--motion-weight: 0` on `off`.
    sabM(
        { leafText: liveMotionLeaf.replace(/--motion-weight/g, "--x-dead") },
        "M4",
        "M4 the resolver drops the --motion-weight off-write",
    );
    // M5: the resolver escalates a prop ABOVE PRM (drops the PRM clamp branch).
    sabM(
        {
            leafText: liveMotionLeaf.replace(
                /return prmActive\(\) \? "reduced" : requested;/,
                "return requested;",
            ),
        },
        "M5",
        "M5 the resolver escalates above PRM (no clamp)",
    );
    // M6: a kept contract (`keepDockOpen`) is folded away (the inverse-over-unify smell).
    // Rename EVERY `keepDockOpen` token (prop decl + withDefaults value + readers) so no
    // prop-shape declaration survives — the contract genuinely gone.
    sabM(
        {
            sources: {
                "components/ui/slider/Slider.vue": read(
                    resolve(SRC, "components/ui/slider/Slider.vue"),
                ).replace(/keepDockOpen/g, "xkeepDockOpen"),
            },
        },
        "M6",
        "M6 the keepDockOpen contract is folded away",
    );
    // M-fence: the migrated tree carries ZERO motion-axis violation.
    sabNotM({}, "M", "M the migrated tree (no boolean-scatter, motion axis clean)");

    // ── BG.W-GOO-BARBELL-CSS — the GB1–GB3 bites over detectGooBarbell. ──
    const liveGooEngine = read(GOO_ENGINE);
    const liveGooLeaf = read(GOO_LEAF);
    const sabGoo = (overrides, prefix, name) => {
        const { violations } = detectGooBarbell(overrides);
        if (violations.some((x) => x.startsWith(prefix))) flagged++;
        else
            throw new Error(
                `[proof:encapsulation self-test] goo-barbell bite FAILED to flag: ${name}`,
            );
    };
    const sabNotGoo = (overrides, prefix, name) => {
        const { violations } = detectGooBarbell(overrides);
        if (!violations.some((x) => x.startsWith(prefix))) flagged++;
        else
            throw new Error(
                `[proof:encapsulation self-test] goo-barbell fence bite WRONGLY flagged: ${name}`,
            );
    };
    // GB1: the carved leaf is absent from disk.
    sabGoo(
        { leafExists: false, leafText: "" },
        "GB1",
        "GB1 the goo geometry leaf is absent",
    );
    // GB1: the engine drops the geometry import (no composition).
    sabGoo(
        {
            engineText: liveGooEngine.replace(
                /import\s*\{[\s\S]*?\}\s*from\s*["']\.\/gooBarbellGeometry["'];/,
                "",
            ),
        },
        "GB1",
        "GB1 useGooMorph drops the gooBarbellGeometry import",
    );
    // GB2: the leaf imports SpringProgress (the forbidden spring fork).
    sabGoo(
        {
            leafText: `import { SpringProgress } from "@mkbabb/keyframes.js";\n${liveGooLeaf}`,
        },
        "GB2",
        "GB2 the leaf forks SpringProgress",
    );
    // GB2: the leaf reaches into the DOM (a stateful read the engine owns).
    sabGoo(
        { leafText: `${liveGooLeaf}\nconst _p = getComputedStyle;` },
        "GB2",
        "GB2 the leaf touches the DOM (getComputedStyle)",
    );
    // GB2: the leaf owns an rAF (a private loop — the one-loop discipline).
    sabGoo(
        { leafText: `${liveGooLeaf}\nrequestAnimationFrame(() => {});` },
        "GB2",
        "GB2 the leaf owns a requestAnimationFrame loop",
    );
    // GB2: the leaf declares module-level mutable state.
    sabGoo(
        { leafText: `let gooFrameCounter = 0;\n${liveGooLeaf}` },
        "GB2",
        "GB2 the leaf carries module-level mutable state",
    );
    // GB3: the engine re-declares projectBarbell (the dual-path copy).
    sabGoo(
        {
            engineText: `function projectBarbell(s) { return s; }\n${liveGooEngine}`,
        },
        "GB3",
        "GB3 the engine re-declares projectBarbell (dual-path)",
    );
    // GB3 (fence): a bare comment mention of a geometry fn in the engine does NOT flag.
    sabNotGoo(
        { engineText: `// projectBarbell composes the barbell\n${liveGooEngine}` },
        "GB3",
        "GB3 comment-mention fence (a note is not a definition)",
    );
    // GB-fence: the migrated tree carries ZERO goo-barbell violation.
    sabNotGoo({}, "GB", "GB the migrated tree (goo geometry carved clean)");

    // ── BI.W-RATCHET-GROWTH — the growth-red MIRROR (RG1) bites. ──
    const sabRG = (overrides, prefix, name) => {
        const { violations } = detectRatchetGrowth(overrides);
        if (violations.some((x) => x.startsWith(prefix))) flagged++;
        else
            throw new Error(
                `[proof:encapsulation self-test] ratchet-growth bite FAILED to flag: ${name}`,
            );
    };
    const sabNotRG = (overrides, prefix, name) => {
        const { violations } = detectRatchetGrowth(overrides);
        if (!violations.some((x) => x.startsWith(prefix))) flagged++;
        else
            throw new Error(
                `[proof:encapsulation self-test] ratchet-growth fence bite WRONGLY flagged: ${name}`,
            );
    };
    // RG1: a NEW encap ratchet row (a wave-grown key) NOT in the frozen manifest REDs.
    sabRG(
        {
            ratchetBaselines: { "components/custom/x/wave-grown.ts": 600 },
            trancheManifest: {},
        },
        "RG1",
        "RG1 a wave-introduced ratchet key outside the frozen manifest (grow-and-self-grandfather)",
    );
    // RG1 (fence): a ratchet key that IS a frozen-manifest member (a file already >500 at
    //   tranche start) does NOT flag — a legal grandfather of a real BI-start over-bound file.
    sabNotRG(
        {
            ratchetBaselines: { "components/custom/aurora/composables/runtime.ts": 502 },
            trancheManifest: { "components/custom/aurora/composables/runtime.ts": 502 },
        },
        "RG1",
        "RG1 fence — a ratchet key inside the frozen manifest (legal grandfather)",
    );
    // RG1 (fence): a shader key in the ratchet map is EXEMPT (logic-only ratchet) and is
    //   skipped by the mirror even though it is not a manifest member.
    sabNotRG(
        {
            ratchetBaselines: { "components/custom/x/shaders/big.wgsl.ts": 999 },
            trancheManifest: {},
        },
        "RG1",
        "RG1 fence — a shader key is skipped (the sibling shader-literal exemption)",
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
    // BG.W-DEAD-SWEEP — the selectableChipVariants alias-kill negative guard.
    const { facts: aliasFacts, violations: aliasViolations } = detectAliasKill();
    // BG.W-DESHADCN — the de-shadcn sweep + the --ring→--focus-ring-color break + ToastClose name.
    const { facts: deshadcnFacts, violations: deshadcnViolations } =
        detectDeshadcn();
    // BH.W-AXIS-GRAMMAR — the ONE axis-grammar home + the homonym kills.
    const { facts: axisFacts, violations: axisViolations } =
        detectAxisGrammar();
    // BH.W-SIZE-UNIFY — the size/density collision folded onto the Size axis.
    const { facts: sizeFacts, violations: sizeViolations } =
        detectSizeGrammar();
    // BH.W-MOTION-AXIS — the four-boolean motion scatter folded onto the Motion axis.
    const { facts: motionFacts, violations: motionViolations } =
        detectMotionAxis();
    // BG.W-GOO-BARBELL-CSS — the goo-morph barbell GEOMETRY carve.
    const { facts: gooFacts, violations: gooViolations } = detectGooBarbell();
    // BI.W-RATCHET-GROWTH — the growth-red MIRROR (RG1) over the sibling gate's ratchet map.
    const { facts: growthFacts, violations: growthViolations } =
        detectRatchetGrowth();
    const facts = {
        ...blobFacts,
        colocate: colocateFacts,
        aliasKill: aliasFacts,
        deshadcn: deshadcnFacts,
        axisGrammar: axisFacts,
        sizeGrammar: sizeFacts,
        motionAxis: motionFacts,
        gooBarbell: gooFacts,
        ratchetGrowth: growthFacts,
    };
    const violations = [
        ...blobViolations,
        ...colocateViolations,
        ...aliasViolations,
        ...deshadcnViolations,
        ...axisViolations,
        ...sizeViolations,
        ...motionViolations,
        ...gooViolations,
        ...growthViolations,
    ];
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
        `  BG.W-DEAD-SWEEP alias-kill      : ${aliasViolations.length === 0 ? "GREEN" : "RED"} (selectableChipVariants.ts absent=${!aliasFacts.aliasExists}, referers=${aliasFacts.aliasReferers.length})`,
    );
    console.log(
        "  BG.W-DESHADCN (DS1 ring-break · DS2 ring-consumers · DS3 palette-sweep · DS4 ToastClose-name):",
    );
    console.log(
        `    DS1 ring-break                : ${!deshadcnFacts.ringBreak.ringDefined && !deshadcnFacts.ringBreak.colorRingDefined && deshadcnFacts.ringBreak.focusRingColorDefined ? "GREEN" : "RED"} (--ring=${deshadcnFacts.ringBreak.ringDefined}, --color-ring=${deshadcnFacts.ringBreak.colorRingDefined}, --focus-ring-color=${deshadcnFacts.ringBreak.focusRingColorDefined})`,
    );
    console.log(
        `    DS2 ring-consumers            : ${deshadcnFacts.ringConsumers.length === 0 ? "GREEN" : "RED"} (${deshadcnFacts.ringConsumers.length} readers of var(--ring)/ring-color-util)`,
    );
    console.log(
        `    DS3 ui/ palette-sweep         : ${deshadcnFacts.uiPalette.hits.length === 0 && deshadcnFacts.uiPalette.count >= 40 ? "GREEN" : "RED"} (${deshadcnFacts.uiPalette.count} ui/ files swept, ${deshadcnFacts.uiPalette.hits.length} raw-palette hits)`,
    );
    console.log(
        `    DS4 ToastClose default name   : ${deshadcnFacts.toastClose.bindsAriaLabel && deshadcnFacts.toastClose.hasDefaultName ? "GREEN" : "RED"} (aria-label=${deshadcnFacts.toastClose.bindsAriaLabel}, default=${deshadcnFacts.toastClose.hasDefaultName})`,
    );
    console.log(
        "  BH.W-AXIS-GRAMMAR (G1 axes-minted · G2 surface-4-member · G3 membership-fence · G4 GlassPanel-tier · G5 TabsIndicator-plate · G6 /axes-barrel):",
    );
    console.log(
        `    axis-grammar                  : ${axisViolations.length === 0 ? "GREEN" : "RED"} (axes.ts=${axisFacts.axesMinted.axesExists}, SURFACES=${JSON.stringify(axisFacts.surfaceFourMember.surfacesTuple)}, GlassPanel variant-killed=${!axisFacts.glassPanelHomonym.gpHasVariantProp}+renderTier=${axisFacts.glassPanelHomonym.gpHasRenderTierProp}, TabsIndicator plate=${axisFacts.tabsHomonym.tabsHasPlateProp}, /axes=${axisFacts.flatBarrel.flatExists})`,
    );
    console.log(
        "  BH.W-SIZE-UNIFY (S1 density-absent · S2 size-prop · S3 no-adjective-rung · S4 ControlSize-md · S5 button-iconOnly · S6 chip-shape):",
    );
    console.log(
        `    size-grammar                  : ${sizeViolations.length === 0 ? "GREEN" : "RED"} (density-gone=${sizeFacts.densityAbsent.densityTypeHits.length === 0 && sizeFacts.densityAbsent.densityPropHits.length === 0}, ControlSize=${JSON.stringify(sizeFacts.controlSize.controlMembers)}, adjective-rungs=${sizeFacts.adjectiveRungs.length}, button-iconOnly=${sizeFacts.buttonIcon.btnHasIconOnly}, chip-shape=${sizeFacts.chipShape.chipShapeHasCell})`,
    );
    console.log(
        "  BH.W-MOTION-AXIS (M1 booleans-gone · M2 motion-typed · M3 data-motion · M4 weight-off · M5 PRM-clamp · M6 kept-contracts):",
    );
    console.log(
        `    motion-axis                   : ${motionViolations.length === 0 ? "GREEN" : "RED"} (bool-props=${motionFacts.boolPropsGone.hits.length}, motion-typed-missing=${motionFacts.motionTyped.missing.length}, data-motion-missing=${motionFacts.dataMotionWrite.missing.length}, weight-off=${motionFacts.motionWeightOff.writesWeightOff}, PRM-clamp=${motionFacts.prmPrecedence.prmClampsDown}, kept-missing=${motionFacts.keptContracts.missing.length})`,
    );
    console.log(
        "  BG.W-GOO-BARBELL-CSS (GB1 colocation · GB2 stateless-leaf · GB3 single-definition):",
    );
    console.log(
        `    goo-barbell geometry          : ${gooViolations.length === 0 ? "GREEN" : "RED"} (leaf=${gooFacts.colocation.leafExists}, exports=${gooFacts.colocation.leafExportsAll}, engine-imports=${gooFacts.colocation.engineImports}, stateless=${!gooFacts.stateless.hasSpring && !gooFacts.stateless.importsVue && !gooFacts.stateless.hasRaf && !gooFacts.stateless.touchesDom && !gooFacts.stateless.moduleMutable}, engine-redefs=${gooFacts.singleDefinition.engineRedefines.length})`,
    );
    console.log(
        "  BI.W-RATCHET-GROWTH (RG1 growth-red mirror — no ratchet key outside the frozen tranche manifest):",
    );
    console.log(
        `    ratchet-growth mirror         : ${growthViolations.length === 0 ? "GREEN" : "RED"} (${growthFacts.ratchetKeys} ratchet key(s) vs ${growthFacts.manifestKeys} frozen manifest key(s); off-manifest=${growthFacts.offManifest.length ? growthFacts.offManifest.join(", ") : "none"})`,
    );
    console.log(
        `  self-test (bite proof)          : OK — ${selfTestCount} synthetic sabotages handled (blob E1×2+E1-fence+E2×2+E3×2+E4+E4-fence + colocate C1×2+C1-fence+C2×2+C3+C3-fence + luminance-carve C3+C2+C3-fence + alias-kill A1+A2+fence + deshadcn DS1×3+DS1-fence+DS2+DS3×2+DS3-regex+DS4+DS-clean + axis-grammar G1+G2+G3+G3-fence+G4+G4-fence+G5+G6 + size-grammar S1x2+S2+S3+S4+S5+S6+S-fence + motion-axis M1×2+M1-fence×2+M2+M3+M4+M5+M6+M-fence + goo-barbell GB1×2+GB2×4+GB3+GB3-fence+GB-fence + ratchet-growth RG1+RG1-fence×2)`,
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

export {
    detect,
    detectColocate,
    detectOneCarve,
    detectAliasKill,
    detectDeshadcn,
    detectAxisGrammar,
    detectSizeGrammar,
    detectMotionAxis,
    detectGooBarbell,
    detectRatchetGrowth,
    selfTest,
};
