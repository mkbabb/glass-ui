#!/usr/bin/env node
// proof:demo — the demo-chassis ADOPT-OR-RETIRE lock (BG.W-CHASSIS-ADOPT-OR-RETIRE).
//
// The storybook accreted FOUR candidate header/chassis primitives with overlapping
// jobs. This wave DECIDES each — adopt or retire — and machine-locks the verdict so
// the decision is recorded, not re-litigated each tranche:
//
//   DemoFrame          → RETIRE. A designed 5-variant demo-cel chassis
//                        (stage/specimen/interaction/matrix/composition) that NEVER
//                        earned a live importer — its only references were prose
//                        comments describing an aspirational box-model. Zero-importer
//                        substrate; retired per the visual-load-bearing invariant
//                        (J inv-10 — a primitive ships only with ≥2 consumers or is
//                        formally retired). Its `demo-frame.css` retires with it.
//   StorySectionHeader → RETIRE. The IconChip-led "42nd-paste-preventer" section
//                        header that itself was never adopted (zero .vue importers).
//                        Its role folds onto StorySection's canonical
//                        `<h2 text-subheading>` heading rung + the StoryPage chassis
//                        hero identity. Retired.
//   StoryHeader        → ADOPT. The ONE ordered header cluster (eyebrow → subpath →
//                        title → blurb, reading order). Live-imported by the StoryPage
//                        + StoryHero chassis — the adopted unified page-header.
//   VizStudio          → ADOPT. The ONE viz-studio chassis (configurator-right +
//                        rounded clip + hero-subpath). Live-imported by a viz story —
//                        the canonical studio shape every procedural-suite viz composes.
//
// Pure FS, device-free. A retire of UN-RENDERED dead substrate + an adopt of an
// already-live chassis paints ZERO new pixels (the BB "register-disposition flip
// carries no gestalt verdict" precedent); the painted render is the surviving
// StoryPage/VizStudio chassis's own proof:page-chassis / proof:ba-gestalt verdict.
// This gate is the DECISION-realized-on-disk arm.
//
// Asserts (born-RED on HEAD → GREEN at close):
//   D1 — every RETIRE verdict is realized: ALL of a retired chassis's files are
//        DEFINITION-ABSENT on disk. (born-RED: DemoFrame + demo-frame.css +
//        StorySectionHeader exist on HEAD.)
//   D2 — every ADOPT verdict is realized: the file EXISTS on disk AND carries ≥1 LIVE
//        importer — an `import … from ".../<Name>.vue"` OR a `<Name …>` tag usage in
//        a demo .vue that is NOT the chassis file itself (the adopted chassis is
//        genuinely consumed, not shelf-ware).
//   D3 — no DANGLING reference to a RETIRED chassis survives: the comment-stripped
//        demo .vue corpus carries no `import …/<RetiredName>.vue` and no
//        `<RetiredName` tag, AND no demo `*.css` `@import`s a retired chassis's CSS
//        (the delete is CLEAN, no broken import / orphaned usage). Comments are
//        STRIPPED before the scan (the proof:demo-copy-prune conservatism fence — a
//        prose mention in a `<!-- … -->` / `//` note is provenance, never a dangle).
//   D4 — the decision LEDGER is complete: the four wave-named chassis each carry
//        exactly one verdict ∈ {adopt, retire}, a non-empty rationale, and ≥1 file
//        (the decision is recorded IN the gate — the anti-re-litigation floor).
//
// Self-test bites: a synthetic retired file that still "exists" REDs D1; a synthetic
// live `<DemoFrame>` tag REDs D3; a synthetic adopted file with zero importers REDs
// D2; a synthetic decision with an empty rationale REDs D4; a jargon-in-a-comment
// mention of a retired name does NOT red D3 (the comment-strip distinguishing bite).

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:demo";
const SELF_TEST = process.argv.includes("--self-test");

const DEMO_DIR = resolve(ROOT, "demo");

// ── The DECISION LEDGER — the adopt/retire verdict + rationale per chassis. ──────
// This table IS the recorded decision (D4 asserts it complete). Each `files[]` is
// the on-disk artefact set the verdict governs (retire → absent; adopt → present +
// live-imported).
const DECISIONS = [
    {
        name: "DemoFrame",
        verdict: "retire",
        files: [
            "demo/stories/_chassis/DemoFrame.vue",
            "demo/stories/_chassis/demo-frame.css",
        ],
        rationale:
            "A designed 5-variant demo-cel chassis that never earned a live importer — its only references were prose comments describing an aspirational box-model. Zero-importer substrate; retired (J inv-10). Its demo-frame.css retires with it.",
    },
    {
        name: "StorySectionHeader",
        verdict: "retire",
        files: ["demo/stories/StorySectionHeader.vue"],
        rationale:
            "The IconChip-led '42nd-paste-preventer' section header that itself was never adopted (zero .vue importers). Its role folds onto StorySection's canonical <h2 text-subheading> heading rung + the StoryPage chassis hero identity.",
    },
    {
        name: "StoryHeader",
        verdict: "adopt",
        files: ["demo/stories/StoryHeader.vue"],
        rationale:
            "The ONE ordered header cluster (eyebrow → subpath → title → blurb, reading order). Live-imported by the StoryPage + StoryHero chassis — the adopted unified page-header.",
    },
    {
        name: "VizStudio",
        verdict: "adopt",
        files: ["demo/stories/substrates/VizStudio.vue"],
        rationale:
            "The ONE viz-studio chassis (configurator-right + rounded clip + hero-subpath). Live-imported by a viz story — the canonical studio shape every procedural-suite viz composes.",
    },
];

function read(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// Strip // line + /* block */ + <!-- vue --> comments so a prose mention in a
// comment is not mistaken for a live import/usage (the conservatism fence — a
// retired-chassis name inside a `<!-- … -->` / `//` note is provenance, never a
// dangle). Newline structure is preserved so a self-test can target one line.
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");
}

// Recursively gather every demo/**/*.<ext>.
function allDemoFiles(exts, dir = DEMO_DIR, acc = []) {
    if (!existsSync(dir)) return acc;
    for (const f of readdirSync(dir)) {
        const p = resolve(dir, f);
        if (statSync(p).isDirectory()) allDemoFiles(exts, p, acc);
        else if (exts.some((e) => f.endsWith(e))) acc.push(p);
    }
    return acc;
}

const basename = (rel) => rel.slice(rel.lastIndexOf("/") + 1);

// ── The detector — runs over a corpus MAP so the self-test can sabotage inputs. ──
// `overrides`: {
//    decisions?         — replace the DECISIONS ledger (D4 bites);
//    existsOverride?    — { [file]: boolean } force a file's on-disk presence (D1);
//    vueCorpus?         — [{ path, text }] replace the live demo .vue corpus (D2/D3);
//    cssCorpus?         — [{ path, text }] replace the demo .css corpus (D3);
// }
function detect(overrides = {}) {
    const violations = [];
    const facts = {};
    const assert = (label, ok) => {
        facts[label] = Boolean(ok);
        if (!ok) violations.push(label);
    };

    const decisions = overrides.decisions ?? DECISIONS;
    const fileExists = (rel) =>
        overrides.existsOverride && rel in overrides.existsOverride
            ? overrides.existsOverride[rel]
            : existsSync(resolve(ROOT, rel));

    // The live demo corpus — comment-STRIPPED (imports/usages only, prose fenced out).
    const vueCorpus =
        overrides.vueCorpus ??
        allDemoFiles([".vue"]).map((p) => ({
            path: p.slice(ROOT.length + 1),
            text: stripComments(readFileSync(p, "utf8")),
        }));
    const cssCorpus =
        overrides.cssCorpus ??
        allDemoFiles([".css"]).map((p) => ({
            path: p.slice(ROOT.length + 1),
            text: stripComments(readFileSync(p, "utf8")),
        }));

    // Count LIVE consumers of a chassis (an import of its .vue OR a `<Name` tag),
    // across the demo .vue corpus, EXCLUDING the chassis file itself.
    const liveImporters = (name, ownFiles) => {
        const own = new Set(ownFiles.map(basename));
        const importRe = new RegExp(
            `import\\s+[^;]*from\\s*["'][^"']*/${name}\\.vue["']`,
        );
        const tagRe = new RegExp(`<${name}[\\s/>]`);
        return vueCorpus
            .filter((c) => !own.has(basename(c.path)))
            .filter((c) => importRe.test(c.text) || tagRe.test(c.text))
            .map((c) => c.path);
    };

    const retireVerdicts = decisions.filter((d) => d.verdict === "retire");
    const adoptVerdicts = decisions.filter((d) => d.verdict === "adopt");

    // ── D1 — every RETIRE verdict realized: ALL its files DEFINITION-ABSENT. ──
    const retireSurvivors = [];
    for (const d of retireVerdicts)
        for (const f of d.files) if (fileExists(f)) retireSurvivors.push(f);
    facts.retireSurvivors = retireSurvivors;
    assert(
        "D1 — every RETIRE verdict realized (all retired files DEFINITION-ABSENT)",
        retireSurvivors.length === 0,
    );

    // ── D2 — every ADOPT verdict realized: file EXISTS + ≥1 live importer. ──
    const adoptGaps = [];
    const adoptEvidence = {};
    for (const d of adoptVerdicts) {
        const sfc = d.files[0];
        const present = fileExists(sfc);
        const importers = liveImporters(d.name, d.files);
        adoptEvidence[d.name] = { present, importers };
        if (!present || importers.length === 0)
            adoptGaps.push(
                `${d.name} (present=${present} liveImporters=${importers.length})`,
            );
    }
    facts.adoptEvidence = adoptEvidence;
    facts.adoptGaps = adoptGaps;
    assert(
        "D2 — every ADOPT verdict realized (file present + ≥1 live importer)",
        adoptGaps.length === 0,
    );

    // ── D3 — no DANGLING reference to a RETIRED chassis (usage / css @import). ──
    const dangles = [];
    for (const d of retireVerdicts) {
        const importRe = new RegExp(
            `import\\s+[^;]*from\\s*["'][^"']*/${d.name}\\.vue["']`,
        );
        const tagRe = new RegExp(`<${d.name}[\\s/>]`);
        for (const c of vueCorpus) {
            if (basename(c.path) === `${d.name}.vue`) continue; // the file being deleted
            if (importRe.test(c.text) || tagRe.test(c.text))
                dangles.push(`${c.path}: live ref to retired <${d.name}>`);
        }
        // a retired chassis's CSS must not be @import-ed anywhere in demo CSS.
        const cssFiles = d.files.filter((f) => f.endsWith(".css"));
        for (const cssF of cssFiles) {
            const stem = basename(cssF).replace(/\.css$/, "");
            const importCssRe = new RegExp(`@import[^;]*${stem}[^;]*;`);
            for (const c of cssCorpus)
                if (importCssRe.test(c.text))
                    dangles.push(`${c.path}: @import of retired ${basename(cssF)}`);
        }
    }
    facts.dangles = dangles;
    assert(
        "D3 — no dangling reference to a retired chassis (clean delete)",
        dangles.length === 0,
    );

    // ── D4 — the decision LEDGER is complete (recorded, not re-litigated). ──
    const REQUIRED = ["DemoFrame", "StorySectionHeader", "StoryHeader", "VizStudio"];
    const names = new Set(decisions.map((d) => d.name));
    const missing = REQUIRED.filter((n) => !names.has(n));
    const malformed = decisions
        .filter(
            (d) =>
                !["adopt", "retire"].includes(d.verdict) ||
                !d.rationale ||
                d.rationale.trim().length === 0 ||
                !Array.isArray(d.files) ||
                d.files.length === 0,
        )
        .map((d) => d.name);
    facts.ledgerMissing = missing;
    facts.ledgerMalformed = malformed;
    assert(
        "D4 — the decision ledger is complete (4 named chassis, verdict + rationale + files)",
        missing.length === 0 && malformed.length === 0,
    );

    return { facts, violations };
}

// ── The self-test bites (anti-evasion) — each sabotage REDs (or, for the
// comment-strip bite, does NOT red) its clause. Proves the gate is not vacuous.
function selfTest() {
    let flagged = 0;
    const sab = (overrides, clause, name) => {
        const { violations } = detect(overrides);
        if (violations.includes(clause)) flagged++;
        else
            throw new Error(
                `[proof:demo self-test] the bite FAILED to flag the sabotage: ${name}`,
            );
    };
    const sabNot = (overrides, clause, name) => {
        const { violations } = detect(overrides);
        if (!violations.includes(clause)) flagged++;
        else
            throw new Error(
                `[proof:demo self-test] the comment-strip bite WRONGLY flagged: ${name}`,
            );
    };

    // D1: a retired file that still "exists" on disk → REDs D1.
    sab(
        { existsOverride: { "demo/stories/StorySectionHeader.vue": true } },
        "D1 — every RETIRE verdict realized (all retired files DEFINITION-ABSENT)",
        "D1 retired file survives on disk",
    );
    // D2: an adopted chassis with zero live importers → REDs D2. (cssCorpus isolated
    // so the bite tests EXACTLY the missing-importer path, not a stray css dangle.)
    sab(
        {
            existsOverride: { "demo/stories/StoryHeader.vue": true },
            vueCorpus: [
                { path: "demo/stories/foo.vue", text: `<template><div/></template>` },
            ],
            cssCorpus: [],
        },
        "D2 — every ADOPT verdict realized (file present + ≥1 live importer)",
        "D2 adopted chassis with zero importers",
    );
    // D3: a live `<DemoFrame>` tag usage in a surviving story → REDs D3. (cssCorpus
    // isolated so the bite tests EXACTLY the tag dangle.)
    sab(
        {
            vueCorpus: [
                {
                    path: "demo/stories/bar.vue",
                    text: `<template><DemoFrame variant="stage"/></template>`,
                },
            ],
            cssCorpus: [],
        },
        "D3 — no dangling reference to a retired chassis (clean delete)",
        "D3 live <DemoFrame> usage survives",
    );
    // D3 (distinguishing): a retired name INSIDE a comment must NOT red (the
    // conservatism fence — comments are provenance). The vue corpus is
    // comment-stripped by detect(); the raw text carries the mention only in a
    // comment. cssCorpus isolated so a real-tree css dangle does not confound the bite.
    sabNot(
        {
            vueCorpus: [
                {
                    path: "demo/stories/baz.vue",
                    text: stripComments(
                        `<!-- a stack of FREE cels (<DemoFrame variant>) over the field -->\n<template><div/></template>`,
                    ),
                },
            ],
            cssCorpus: [],
        },
        "D3 — no dangling reference to a retired chassis (clean delete)",
        "D3 comment-strip distinguishing bite",
    );
    // D4: a decision with an empty rationale → REDs D4.
    sab(
        {
            decisions: [
                { name: "DemoFrame", verdict: "retire", files: ["x"], rationale: "" },
                {
                    name: "StorySectionHeader",
                    verdict: "retire",
                    files: ["y"],
                    rationale: "ok",
                },
                { name: "StoryHeader", verdict: "adopt", files: ["z"], rationale: "ok" },
                { name: "VizStudio", verdict: "adopt", files: ["w"], rationale: "ok" },
            ],
        },
        "D4 — the decision ledger is complete (4 named chassis, verdict + rationale + files)",
        "D4 empty rationale",
    );
    return flagged;
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_DEMO_ARTIFACT", "BG-demo");

    const selfTestCount = selfTest();
    const { facts, violations } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:demo",
        command: COMMAND,
        selfTestChecks: selfTestCount,
        decisions: DECISIONS.map((d) => ({
            name: d.name,
            verdict: d.verdict,
            files: d.files,
        })),
        facts,
        violations,
    });

    console.log(
        "proof:demo — the demo-chassis adopt-or-retire lock (BG.W-CHASSIS-ADOPT-OR-RETIRE)",
    );
    for (const d of DECISIONS)
        console.log(
            `  ${d.verdict.toUpperCase().padEnd(6)} ${d.name.padEnd(20)} → ${d.files.join(", ")}`,
        );
    console.log(
        `  D1 retires realized       : ${facts["D1 — every RETIRE verdict realized (all retired files DEFINITION-ABSENT)"]}`,
    );
    console.log(
        `  D2 adopts realized        : ${facts["D2 — every ADOPT verdict realized (file present + ≥1 live importer)"]}`,
    );
    console.log(
        `  D3 clean delete (no dangle): ${facts["D3 — no dangling reference to a retired chassis (clean delete)"]}`,
    );
    console.log(
        `  D4 ledger complete        : ${facts["D4 — the decision ledger is complete (4 named chassis, verdict + rationale + files)"]}`,
    );
    console.log(
        `  self-test (bite proof)    : OK — ${selfTestCount} synthetic sabotages handled (D1 + D2 + D3×2 incl. comment-strip + D4)`,
    );
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
        if (facts.retireSurvivors?.length)
            console.log(`  retire survivors: ${JSON.stringify(facts.retireSurvivors)}`);
        if (facts.adoptGaps?.length)
            console.log(`  adopt gaps      : ${JSON.stringify(facts.adoptGaps)}`);
        if (facts.dangles?.length)
            console.log(`  dangling refs   : ${JSON.stringify(facts.dangles)}`);
        if (facts.ledgerMissing?.length)
            console.log(`  ledger missing  : ${JSON.stringify(facts.ledgerMissing)}`);
        if (facts.ledgerMalformed?.length)
            console.log(`  ledger malformed: ${JSON.stringify(facts.ledgerMalformed)}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );

    if (SELF_TEST) {
        console.log(
            `\n[proof:demo --self-test] ${selfTestCount} bite(s) handled; ledger ${status === "pass" ? "GREEN" : "RED"}`,
        );
    }
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
