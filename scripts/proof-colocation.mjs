#!/usr/bin/env node
// AY.W-COLOCATE — the feature-dir colocation convention gate (proof:colocation).
//
// The user's directive: "Complex components should be structured into sub-
// component dirs with components, composeables, constants, skeletons, thereof,
// if needed" + "Components and composeables should be colocated together when
// befitting." This gate makes ONE convention machine-enforced over the carved
// god-module dirs so it cannot silently drift the way it did pre-AY (goo-blob/
// dock/tabs grew a composables/ subdir organically; constellation stayed flat;
// no package ever extracted a constants.ts).
//
// For each TARGET dir it asserts (the §6 clauses):
//   (a) every composable (`^use[A-Z]` or a `*Context.ts` DI module) lives under
//       `<dir>/composables/` — NOT at the package root;
//   (b) a `<dir>/constants.ts` exists AND no composable carries a surviving
//       module-scope `const [A-Z_]{3,} = <number>` magic-number outside it;
//   (c) any `*.frag.ts`/`*.vert.ts`/`*.glsl.ts` shader OR `*Skeleton.vue` asset
//       lives in a named `shaders/`/`skeleton/` subdir (co-location WHEN present,
//       not existence — "if needed");
//   (d) a `<dir>/README.md` exists.
//
// PLUS the design-idiom-home doc-presence clause: docs/precepts/design-idioms.md
// is > 1 KB AND both CONTRIBUTING.md + src/styles/index.css carry the literal
// `design-idioms` reference.
//
// Born-RED on the pre-carve tree (constellation flat, no constants.ts).
// bite-check: move a composable to the package root, delete a constants.ts,
// inline a magic-number, or delete a target README → RED.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const SRC = resolve(ROOT, "src");
const ARTIFACT = gateArtifactPath("GLASS_UI_COLOCATION_ARTIFACT", "AY-colocation");

// The four carved god-module dirs the convention binds (the >500-origin set).
const TARGET_DIRS = [
    "components/custom/goo-blob",
    "components/custom/dock",
    "components/custom/tabs",
    "components/custom/constellation",
];

const rel = (p) => relative(ROOT, p).split(sep).join("/");

/** A composable file: a `useXxx.ts` (camel after `use`) or a `*Context.ts`. */
function isComposable(name) {
    return /^use[A-Z]/.test(name) || /Context\.ts$/.test(name);
}
/** A shader asset. */
function isShader(name) {
    return /\.(frag|vert|glsl)\.ts$/.test(name) || /\.(frag|vert)$/.test(name);
}
/** A loading-skeleton component. */
function isSkeleton(name) {
    return /Skeleton\.vue$/.test(name);
}

/** List the immediate `.ts`/`.vue` entries at the package ROOT (non-recursive). */
function rootEntries(dir) {
    if (!existsSync(dir)) return [];
    return readdirSync(dir, { withFileTypes: true })
        .filter((e) => e.isFile() && (e.name.endsWith(".ts") || e.name.endsWith(".vue")))
        .map((e) => e.name);
}

/** Recursively list `.ts` files under a sub-dir. */
function tsUnder(dir) {
    if (!existsSync(dir)) return [];
    const out = [];
    for (const e of readdirSync(dir, { withFileTypes: true })) {
        const full = resolve(dir, e.name);
        if (e.isDirectory()) out.push(...tsUnder(full));
        else if (e.isFile() && e.name.endsWith(".ts")) out.push(full);
    }
    return out;
}

/** Module-scope magic-number constants: `const NAME = <number...>` where NAME is
 *  SCREAMING_SNAKE (≥3 chars). Returns the matched names. Comments/strings are
 *  stripped first so a name mentioned in prose is not counted. */
function magicNumberConsts(file) {
    let css = readFileSync(file, "utf8")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\/\/[^\n]*/g, "");
    const names = [];
    // module-scope (line begins, optional `export `) const NAME = <numeric/array>
    const re = /^\s*(?:export\s+)?const\s+([A-Z][A-Z0-9_]{2,})\s*[:=]/gm;
    let m;
    while ((m = re.exec(css))) {
        // Only count it as a magic-number const if the RHS looks numeric/array-of-
        // number/string-tuple (a magic constant), not a function/object factory.
        const tail = css.slice(m.index, m.index + 240);
        if (/=\s*(-?\d|\[|\(?\s*\d|1\s*\/|Math\.|\{?\s*["']?\w)/.test(tail)) {
            names.push(m[1]);
        }
    }
    return names;
}

function checkDir(dirRel) {
    const dir = resolve(ROOT, "src", dirRel);
    const violations = [];
    const facts = { dir: `src/${dirRel}`, exists: existsSync(dir) };
    if (!facts.exists) {
        violations.push(`${facts.dir} — target dir is absent`);
        return { violations, facts };
    }

    // (a) composables at the package root → violation.
    const rootComposables = rootEntries(dir).filter(isComposable);
    facts.rootComposables = rootComposables;
    for (const c of rootComposables) {
        violations.push(
            `src/${dirRel}/${c} — a composable lives at the package ROOT; relocate it under composables/`,
        );
    }

    // (b) constants.ts exists + no surviving magic-number const in a composable.
    const constantsPath = resolve(dir, "constants.ts");
    facts.hasConstants = existsSync(constantsPath);
    if (!facts.hasConstants) {
        violations.push(`src/${dirRel}/constants.ts — missing (extract the module-scope magic-numbers here)`);
    }
    const composablesDir = resolve(dir, "composables");
    const composableFiles = tsUnder(composablesDir).filter((f) => {
        const base = f.split(sep).pop();
        return isComposable(base) || /^build|^upload/.test(base); // carve leaves
    });
    const stray = [];
    for (const f of composableFiles) {
        const names = magicNumberConsts(f);
        if (names.length) stray.push({ file: rel(f), names });
    }
    facts.strayMagicNumbers = stray;
    for (const s of stray) {
        violations.push(
            `${s.file} — surviving module-scope magic-number const(s) [${s.names.join(", ")}]; extract to constants.ts`,
        );
    }

    // (c) shaders/skeletons co-located WHEN present.
    const rootShaders = rootEntries(dir).filter(isShader);
    const rootSkeletons = rootEntries(dir).filter(isSkeleton);
    facts.rootShaders = rootShaders;
    facts.rootSkeletons = rootSkeletons;
    for (const s of rootShaders)
        violations.push(`src/${dirRel}/${s} — shader asset at the package root; co-locate under shaders/`);
    for (const s of rootSkeletons)
        violations.push(`src/${dirRel}/${s} — skeleton at the package root; co-locate under skeleton/`);

    // (d) README present.
    facts.hasReadme = existsSync(resolve(dir, "README.md"));
    if (!facts.hasReadme) violations.push(`src/${dirRel}/README.md — missing`);

    return { violations, facts };
}

function checkIdiomHome() {
    const violations = [];
    const doc = resolve(ROOT, "docs/precepts/design-idioms.md");
    const facts = { docExists: existsSync(doc), docBytes: 0, citedByContributing: false, citedByIndexCss: false };
    if (!facts.docExists) {
        violations.push("docs/precepts/design-idioms.md — the design-idiom home is missing");
    } else {
        facts.docBytes = statSync(doc).size;
        if (facts.docBytes < 1024)
            violations.push(`docs/precepts/design-idioms.md is ${facts.docBytes}B (< 1 KB) — a stub, not the enumerated home`);
        const body = readFileSync(doc, "utf8");
        // Must enumerate the @theme + @utility homes + the partial rule.
        for (const needle of ["@theme", "@utility", "@apply", "@import"]) {
            if (!body.includes(needle))
                violations.push(`docs/precepts/design-idioms.md — does not enumerate the ${needle} home`);
        }
    }
    const contributing = resolve(ROOT, "CONTRIBUTING.md");
    if (existsSync(contributing) && readFileSync(contributing, "utf8").includes("design-idioms"))
        facts.citedByContributing = true;
    else violations.push("CONTRIBUTING.md — does not cite design-idioms");
    const indexCss = resolve(ROOT, "src/styles/index.css");
    if (existsSync(indexCss) && readFileSync(indexCss, "utf8").includes("design-idioms"))
        facts.citedByIndexCss = true;
    else violations.push("src/styles/index.css — cascade header does not cite design-idioms");
    return { violations, facts };
}

function run() {
    void SRC;
    const allViolations = [];
    const dirFacts = [];
    for (const d of TARGET_DIRS) {
        const { violations, facts } = checkDir(d);
        dirFacts.push(facts);
        allViolations.push(...violations);
    }
    const idiom = checkIdiomHome();
    allViolations.push(...idiom.violations);

    const status = allViolations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:colocation",
        facts: { targets: dirFacts, idiomHome: idiom.facts },
        violations: allViolations,
    });

    console.log("proof:colocation — the feature-dir convention over the carved god-module dirs (AY.W-COLOCATE)");
    for (const f of dirFacts) {
        const flags = [
            f.hasConstants ? "constants✓" : "constants✗",
            (f.rootComposables?.length ?? 0) === 0 ? "composables✓" : "composables✗",
            f.hasReadme ? "readme✓" : "readme✗",
        ].join(" ");
        console.log(`  ${f.dir}  ${flags}`);
    }
    console.log(
        `  idiom-home: doc=${idiom.facts.docExists ? idiom.facts.docBytes + "B" : "MISSING"} contributing=${idiom.facts.citedByContributing} index.css=${idiom.facts.citedByIndexCss}`,
    );
    if (allViolations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of allViolations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${rel(ARTIFACT)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
