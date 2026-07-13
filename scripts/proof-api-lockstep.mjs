#!/usr/bin/env node
// proof:api-lockstep — the /api surface ≡ the renamed component prop surface
// (BI.W-SYNONYM-RENAMES · UF-P7). Every synonym-renamed axis publishes under the
// NEW name; the OLD synonym name is DEFINITION-ABSENT (clean break, no alias, no
// dual path). Born-RED at HEAD (the old synonym names still export + the old prop
// names still declare).
//
// The synonym-rename law (FAM-10 mechanism-distinctness — a synonym is a name-
// duplicate, not a distinct mechanism): the semantic TONE folds off `type`/`variant`
// onto the shared `Tone` axis; `direction` → `orientation`; `position` → `placement`.
// The `type`-in-a-`variant`-map residual is machine-locked SEPARATELY by
// proof:variant-residual; THIS gate locks the /api PUBLICATION lockstep + the two
// axis-vocabulary prop renames (orientation/placement) that gate does not cover.
//
// Asserts (per-clause, born-RED demonstration):
//   L1 — TONE-HOME-PUBLISHED: the tone axis publishes as `Tone` — `_shared/axes.ts`
//        exports the `Tone` type + `TONES` tuple AND `src/axes.ts` re-exports the axes
//        home (`export * from …/_shared/axes`) so `Tone` reaches `@mkbabb/glass-ui/axes`
//        (the retired `ToastVariant`'s successor home).
//   L2 — RETIRED-SYNONYM-EXPORTS-ABSENT: the OLD published synonym type names
//        (`ToastVariant`, `HeaderRibbonPosition`) are DEFINITION-ABSENT from the /api
//        surface (`src/api/**`) AND the component barrels — no export, no alias.
//   L3 — RENAMED-EXPORTS-PRESENT: the renamed type `HeaderRibbonPlacement` IS exported
//        on the /api surface (the rename publishes in lockstep, not merely dropped).
//   L4 — SURFACE-PROP-RENAMED: the two axis-vocabulary props carry the NEW name and
//        NOT the retired synonym — `StackedIconGroupProps` declares `orientation?` +
//        NOT `direction?`; `HeaderRibbonProps` declares `placement?` + NOT `position?`.
//
// Self-test bites (born-RED demonstration + false-red fences):
//   • a synthetic barrel re-exporting `ToastVariant` FLAGS L2;
//   • a synthetic `HeaderRibbonProps` with `position?:` FLAGS L4;
//   • a synthetic `StackedIconGroupProps` with `direction?:` FLAGS L4;
//   • the migrated tree carries ZERO violation (the clean-tree fence).

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const SRC = resolve(ROOT, "src");
const COMMAND = "npm run proof:api-lockstep";
const SELF_TEST = process.argv.includes("--self-test");

const AXES_HOME = "components/ui/_shared/axes.ts";
const AXES_BARREL = "axes.ts";
const API_DIR = "api";
const TOAST_BARREL = "components/ui/toast/index.ts";
const STACKED_TYPES = "components/custom/stacked-icons/types.ts";
const RIBBON_TYPES = "components/custom/header-ribbon/types.ts";

// The retired synonym type names that must be DEFINITION-ABSENT from /api + barrels.
const RETIRED_EXPORTS = ["ToastVariant", "HeaderRibbonPosition"];
// The renamed type names that must PUBLISH on /api.
const RENAMED_EXPORTS = ["HeaderRibbonPlacement"];

function read(rel) {
    const p = resolve(SRC, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// Strip // line + /* block */ comments to spaces (a name in a comment is provenance,
// never a live export/prop).
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");
}

// Every `.ts`/`.vue` under src/api (the /api surface is api/index.ts + the carved
// api/types-extra sibling).
function apiFiles() {
    const dir = resolve(SRC, API_DIR);
    const out = [];
    if (!existsSync(dir)) return out;
    for (const name of readdirSync(dir)) {
        const p = resolve(dir, name);
        if (statSync(p).isFile() && /\.(ts|vue)$/.test(name))
            out.push(`${API_DIR}/${name}`);
    }
    return out;
}

// Does `text` EXPORT the identifier `name` (a `type {`-list member, an
// `export type X`, or an `export { X }`)? Comment-stripped; word-bounded.
function exportsIdentifier(text, name) {
    const clean = stripComments(text);
    // an `export type { … name … }` / `export { … name … }` list member, OR an
    // `export (type )?const|interface|type name`.
    const listRe = new RegExp(
        `export\\s+(?:type\\s+)?\\{[^}]*\\b${name}\\b[^}]*\\}`,
    );
    const declRe = new RegExp(
        `export\\s+(?:type\\s+)?(?:const|interface|type|class|function)\\s+${name}\\b`,
    );
    return listRe.test(clean) || declRe.test(clean);
}

// The `export *` re-export fence — does `text` `export * from <pathFragment>`?
function exportsStarFrom(text, pathFragment) {
    const clean = stripComments(text);
    const re = new RegExp(
        `export\\s+\\*\\s+from\\s+["'][^"']*${pathFragment}["']`,
    );
    return re.test(clean);
}

// Does the (comment-stripped) source declare a `<prop>?:` interface/type member?
function declaresProp(text, prop) {
    const clean = stripComments(text);
    return new RegExp(`\\b${prop}\\s*\\?\\s*:`).test(clean);
}

// overrides: { sources?: { rel: text } } — a self-test injects synthetic files.
function detect(overrides = {}) {
    const src = overrides.sources ?? {};
    const readRel = (rel) => (rel in src ? src[rel] : read(rel));
    const violations = [];

    // ── L1 — TONE-HOME-PUBLISHED ──
    const axesHome = readRel(AXES_HOME);
    const toneTypeExported =
        /export\s+type\s+Tone\b/.test(stripComments(axesHome)) ||
        exportsIdentifier(axesHome, "Tone");
    const tonesTupleExported =
        /export\s+const\s+TONES\b/.test(stripComments(axesHome)) ||
        exportsIdentifier(axesHome, "TONES");
    const axesReExported = exportsStarFrom(readRel(AXES_BARREL), "_shared/axes");
    const l1Ok = toneTypeExported && tonesTupleExported && axesReExported;
    if (!l1Ok)
        violations.push(
            `L1 — the tone axis must publish as \`Tone\`: axes.ts exports Tone (${toneTypeExported}) + TONES (${tonesTupleExported}) AND src/axes.ts re-exports the axes home (${axesReExported}) so Tone reaches @mkbabb/glass-ui/axes`,
        );

    // ── L2 — RETIRED-SYNONYM-EXPORTS-ABSENT ──
    const surfaces = [...apiFiles(), TOAST_BARREL].filter(
        (rel) => rel in src || existsSync(resolve(SRC, rel)),
    );
    // include any injected synthetic barrel not on disk (a self-test offender).
    for (const rel of Object.keys(src))
        if (!surfaces.includes(rel) && !existsSync(resolve(SRC, rel)))
            surfaces.push(rel);
    for (const rel of surfaces) {
        const text = readRel(rel);
        for (const name of RETIRED_EXPORTS)
            if (exportsIdentifier(text, name))
                violations.push(
                    `L2 — ${rel} EXPORTS the retired synonym type \`${name}\` — the /api surface must be DEFINITION-ABSENT of it (clean break, no alias; publish the renamed axis instead)`,
                );
    }

    // ── L3 — RENAMED-EXPORTS-PRESENT ──
    const apiText = apiFiles()
        .map((rel) => readRel(rel))
        .join("\n");
    for (const name of RENAMED_EXPORTS)
        if (!exportsIdentifier(apiText, name))
            violations.push(
                `L3 — the renamed type \`${name}\` is NOT exported on the /api surface — the rename must PUBLISH in lockstep, not merely drop the old name`,
            );

    // ── L4 — SURFACE-PROP-RENAMED ──
    const stacked = readRel(STACKED_TYPES);
    if (declaresProp(stacked, "direction"))
        violations.push(
            `L4 — ${STACKED_TYPES} still declares the \`direction?\` prop — renamed to the shared \`orientation\` axis vocabulary`,
        );
    if (!declaresProp(stacked, "orientation"))
        violations.push(
            `L4 — ${STACKED_TYPES} must declare the renamed \`orientation?\` prop`,
        );
    const ribbon = readRel(RIBBON_TYPES);
    if (declaresProp(ribbon, "position"))
        violations.push(
            `L4 — ${RIBBON_TYPES} still declares the \`position?\` prop — renamed to the shared \`placement\` axis vocabulary`,
        );
    if (!declaresProp(ribbon, "placement"))
        violations.push(
            `L4 — ${RIBBON_TYPES} must declare the renamed \`placement?\` prop`,
        );

    return {
        facts: {
            toneTypeExported,
            tonesTupleExported,
            axesReExported,
            retiredAbsent: RETIRED_EXPORTS,
            renamedPresent: RENAMED_EXPORTS,
        },
        violations,
    };
}

// ── The self-test bites (born-RED demonstration + false-red fences). ──
function selfTest() {
    let flagged = 0;
    const bite = (overrides, prefix, name) => {
        const { violations } = detect(overrides);
        if (violations.some((v) => v.startsWith(prefix))) flagged++;
        else
            throw new Error(
                `[proof:api-lockstep self-test] the bite FAILED to flag: ${name}`,
            );
    };
    const fence = (rel, text, name) => {
        // The injected file must NOT itself produce a violation naming it.
        const { violations } = detect({ sources: { [rel]: text } });
        if (!violations.some((v) => v.includes(rel))) flagged++;
        else
            throw new Error(
                `[proof:api-lockstep self-test] the fence bite WRONGLY flagged: ${name}`,
            );
    };

    // A synthetic barrel re-exporting the retired ToastVariant FLAGS L2.
    bite(
        {
            sources: {
                "api/_selftest-toastvariant.ts":
                    "export type { ToastVariant } from '../components/ui/toast';",
            },
        },
        "L2",
        "a re-export of the retired `ToastVariant`",
    );
    // A synthetic HeaderRibbonProps with `position?:` FLAGS L4.
    bite(
        {
            sources: {
                [RIBBON_TYPES]:
                    "export type HeaderRibbonPlacement = 'left' | 'right';\nexport interface HeaderRibbonProps { position?: HeaderRibbonPlacement; }",
            },
        },
        "L4",
        "a `position?` prop back on HeaderRibbonProps",
    );
    // A synthetic StackedIconGroupProps with `direction?:` FLAGS L4.
    bite(
        {
            sources: {
                [STACKED_TYPES]:
                    "export interface StackedIconGroupProps<T> { items: T[]; direction?: 'horizontal' | 'vertical'; }",
            },
        },
        "L4",
        "a `direction?` prop back on StackedIconGroupProps",
    );
    // Fence: a clean HeaderRibbonProps (placement, no position) does NOT flag itself.
    fence(
        RIBBON_TYPES,
        "export type HeaderRibbonPlacement = 'left' | 'right';\nexport interface HeaderRibbonProps { placement?: HeaderRibbonPlacement; }",
        "the clean placement-only HeaderRibbonProps",
    );

    return flagged;
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_API_LOCKSTEP_ARTIFACT",
        "BI-api-lockstep",
    );
    const selfTestCount = selfTest();
    const { facts, violations } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:api-lockstep",
        command: COMMAND,
        selfTestChecks: selfTestCount,
        facts,
        violations,
    });

    console.log(
        "proof:api-lockstep — the /api surface ≡ the renamed component prop surface (BI.W-SYNONYM-RENAMES)",
    );
    console.log(
        `  L1 tone-home-published     : ${facts.toneTypeExported && facts.tonesTupleExported && facts.axesReExported ? "GREEN" : "RED"} (Tone+TONES on axes.ts, /axes export *)`,
    );
    console.log(
        `  L2 retired-synonyms-absent : ${violations.some((v) => v.startsWith("L2")) ? "RED" : "GREEN"} (${RETIRED_EXPORTS.join(", ")} DEFINITION-ABSENT)`,
    );
    console.log(
        `  L3 renamed-exports-present : ${violations.some((v) => v.startsWith("L3")) ? "RED" : "GREEN"} (${RENAMED_EXPORTS.join(", ")})`,
    );
    console.log(
        `  L4 surface-prop-renamed    : ${violations.some((v) => v.startsWith("L4")) ? "RED" : "GREEN"} (orientation not direction; placement not position)`,
    );
    console.log(
        `  self-test (bite proof)     : OK — ${selfTestCount} synthetic sabotages handled (L2 + L4×2 + clean-fence)`,
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
            `\n[proof:api-lockstep --self-test] ${selfTestCount} bite(s) handled; tree ${status === "pass" ? "GREEN" : "RED"}`,
        );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

export { detect, selfTest };
