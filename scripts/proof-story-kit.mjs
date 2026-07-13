#!/usr/bin/env node
// proof:story-kit — the storybook SPECIMEN-FRAME kit lock (BI.W-SPECIMEN-FRAME).
//
// The structural cure for the ss-14 "outrageously sized" trigger (UF-F8 / CBA-1 /
// CBA-7 / G4-Arm-B / G9): the storybook now composes ONE specimen host
// (`<SpecimenFrame>`) that NEVER lets a lone interactive child balloon to the
// article width, + ONE variant grid (`<PermutationGrid>`). The BG-era five-KIND
// sub-type taxonomy (Demo{Stage,Specimen,Interaction,Matrix,Composition}) is FOLDED
// away (clean break, no alias) — its census retired from proof:demo and its
// conformity re-authored here.
//
// This is the DEVICE-FREE floor; the BINDING w-full verdict is the RENDERED-WIDTH π
// (CBA-7 law: measure rendered width in a real browser, NEVER grep markup) — booked
// to the π batch (#92). The clauses here prove the MECHANISM is wired on disk so the
// π has something real to read.
//
//   SF1 — SpecimenFrame is a REAL scoped component (the ShowcaseFrame+DemoSpecimen
//         fold: a `<style scoped>` carrying the align-self carve + the size cap); the
//         four retired sub-types (DemoSpecimen/DemoInteraction/DemoComposition/
//         DemoStage) are DEFINITION-ABSENT; DemoMatrix is renamed to PermutationGrid
//         (DemoMatrix.vue absent, PermutationGrid.vue present + the auto-fit grid).
//   SF2 — the 3 offending triggers (popover "Dimensions" / dropdown-menu "Open menu"
//         / hover-popover "Save document") each sit inside the `flex flex-wrap` wrap
//         idiom, so the trigger sizes to its content, not the column (born-RED: bare
//         lone flex-col children on HEAD). The rendered-width readback is the π.
//   A1  — the kit is TREE-GLOBAL: the chassis barrel exports BOTH SpecimenFrame and
//         PermutationGrid (the kit is complete + barrelled) AND StoryPage is composed
//         by the routed corpus (adoption floor). (born-RED: SpecimenFrame un-barrelled
//         on HEAD.)
//   A3  — the w-full ban MECHANISM: SpecimenFrame carries the bounded align-self carve
//         (`.specimen-frame__body > button|[role=button]|a[href] { align-self: start }`,
//         `>`-depth-BOUNDED so a nested-flex button is untouched) AND the `size` cap
//         makes a full-bleed specimen UN-EXPRESSIBLE without an explicit `fluid`.
//
// Self-test bites (anti-evasion): a re-added DemoSpecimen.vue REDs SF1; a DemoMatrix
// left un-renamed REDs SF1; SpecimenFrame stripped of its align-self carve REDs A3; an
// UNWRAPPED offending trigger REDs SF2; SpecimenFrame absent REDs A1; a correctly-
// wrapped trigger does NOT red SF2 (the non-vacuous arm).

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:story-kit";
const SELF_TEST = process.argv.includes("--self-test");

const SPECIMEN = "demo/chassis/showcase/SpecimenFrame.vue";
const PERMGRID = "demo/chassis/PermutationGrid.vue";
const BARREL = "demo/chassis/index.ts";
const DEMOMATRIX = "demo/chassis/DemoMatrix.vue";
const RETIRED = [
    "demo/chassis/DemoSpecimen.vue",
    "demo/chassis/DemoInteraction.vue",
    "demo/chassis/DemoComposition.vue",
    "demo/chassis/DemoStage.vue",
];
// The 3 lone-trigger offenders — each anchored on the unique Button close so the
// PopoverContent copy (e.g. the "<h4>Dimensions</h4>" heading) is never matched.
const TRIGGERS = [
    {
        file: "demo/stories/containers/popover.vue",
        anchor: ">Dimensions</Button>",
        name: "popover Dimensions",
    },
    {
        file: "demo/stories/containers/dropdown-menu.vue",
        anchor: ">Open menu</Button>",
        name: "dropdown-menu Open menu",
    },
    {
        file: "demo/stories/containers/hover-popover.vue",
        anchor: ">Save document</Button>",
        name: "hover-popover Save document",
    },
];

// The adoption floor — StoryPage is composed by the routed corpus. The HEAD count is
// well above this; the floor is the anti-regression tripwire, not a moving target.
const STORYPAGE_FLOOR = 60;

const STORIES_DIR = resolve(ROOT, "demo/stories");

function readReal(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// Recursively gather every demo/stories/**/*.vue path (relative).
function allStoryVue(dir = STORIES_DIR, acc = []) {
    if (!existsSync(dir)) return acc;
    for (const f of readdirSync(dir)) {
        const p = resolve(dir, f);
        if (statSync(p).isDirectory()) allStoryVue(p, acc);
        else if (f.endsWith(".vue")) acc.push(p);
    }
    return acc;
}

// The detector — runs over an overridable corpus so the self-test can sabotage inputs.
//   existsOverride?  — { [rel]: boolean } force a file's on-disk presence.
//   srcOverride?     — { [rel]: string } replace a file's source.
function detect(overrides = {}) {
    const violations = [];
    const facts = {};
    const assert = (label, ok) => {
        facts[label] = Boolean(ok);
        if (!ok) violations.push(label);
    };

    const fileExists = (rel) =>
        overrides.existsOverride && rel in overrides.existsOverride
            ? overrides.existsOverride[rel]
            : existsSync(resolve(ROOT, rel));
    const readSrc = (rel) =>
        overrides.srcOverride && rel in overrides.srcOverride
            ? overrides.srcOverride[rel]
            : readReal(rel);

    // ── SF1 — SpecimenFrame is a real scoped component; the retired sub-types are
    //    DEFINITION-ABSENT; DemoMatrix → PermutationGrid. ──
    const specSrc = readSrc(SPECIMEN);
    const specimenReal =
        fileExists(SPECIMEN) &&
        /<style\s+scoped>/.test(specSrc) &&
        /specimen-frame__body/.test(specSrc);
    const retiredSurvivors = RETIRED.filter((f) => fileExists(f));
    const permReal =
        fileExists(PERMGRID) &&
        !fileExists(DEMOMATRIX) &&
        /auto-fit/.test(readSrc(PERMGRID));
    facts.sf1 = {
        specimenReal,
        retiredSurvivors,
        demoMatrixGone: !fileExists(DEMOMATRIX),
        permutationGridPresent: fileExists(PERMGRID),
    };
    assert(
        "SF1 — SpecimenFrame is a real scoped component; the 4 retired sub-types are DEFINITION-ABSENT; DemoMatrix renamed to PermutationGrid",
        specimenReal && retiredSurvivors.length === 0 && permReal,
    );

    // ── SF2 — each offending trigger sits inside the `flex flex-wrap` wrap. The
    //    ~400-char window before the Button close captures the wrap opener my edit
    //    placed immediately around the overlay root. ──
    const unwrapped = [];
    for (const t of TRIGGERS) {
        const src = readSrc(t.file);
        const i = src.indexOf(t.anchor);
        const before = i < 0 ? "" : src.slice(Math.max(0, i - 400), i);
        if (i < 0 || !/flex\s+flex-wrap/.test(before)) unwrapped.push(t.name);
    }
    facts.sf2 = { unwrapped };
    assert(
        "SF2 — the 3 offending triggers (popover/dropdown-menu/hover-popover) each sit inside a flex-wrap wrapper (not a bare lone flex-col child)",
        unwrapped.length === 0,
    );

    // ── A1 — the kit is tree-global: the barrel exports both primitives + the
    //    StoryPage adoption floor holds. ──
    const barrelSrc = readSrc(BARREL);
    const barrelsSpecimen = /\bSpecimenFrame\b/.test(barrelSrc);
    const barrelsGrid = /\bPermutationGrid\b/.test(barrelSrc);
    const storyPageAdopters =
        overrides.storyPageAdopters ??
        allStoryVue().filter((p) => /\bStoryPage\b/.test(readFileSync(p, "utf8")))
            .length;
    facts.a1 = {
        barrelsSpecimen,
        barrelsGrid,
        storyPageAdopters,
        floor: STORYPAGE_FLOOR,
    };
    assert(
        "A1 — the chassis barrel exports SpecimenFrame + PermutationGrid AND StoryPage is composed by the routed corpus (adoption floor)",
        barrelsSpecimen && barrelsGrid && storyPageAdopters >= STORYPAGE_FLOOR,
    );

    // ── A3 — the w-full ban MECHANISM: the bounded align-self carve + the size cap.
    //    The `>`-child selector is depth-BOUNDED (a nested-flex button is untouched);
    //    the `size` cap defaults to a NON-fluid rung (a full-bleed specimen needs an
    //    explicit `fluid`). ──
    const hasCarve =
        /\.specimen-frame__body\s*>\s*button/.test(specSrc) &&
        /align-self:\s*start/.test(specSrc);
    const hasSizeCap =
        /size\?:\s*"sm"\s*\|\s*"md"\s*\|\s*"prose"\s*\|\s*"fluid"/.test(specSrc) &&
        /size:\s*"md"/.test(specSrc) &&
        /max-w-none/.test(specSrc);
    facts.a3 = { hasCarve, hasSizeCap };
    assert(
        "A3 — SpecimenFrame carries the bounded align-self carve (>-depth-bounded) + the size cap (full-bleed is un-expressible without explicit fluid)",
        hasCarve && hasSizeCap,
    );

    return { facts, violations };
}

// ── The self-test bites (anti-evasion). ──
function selfTest() {
    let flagged = 0;
    const sab = (overrides, clause, name) => {
        const { violations } = detect(overrides);
        if (violations.includes(clause)) flagged++;
        else
            throw new Error(
                `[proof:story-kit self-test] the bite FAILED to flag the sabotage: ${name}`,
            );
    };
    const sabNot = (overrides, clause, name) => {
        const { violations } = detect(overrides);
        if (!violations.includes(clause)) flagged++;
        else
            throw new Error(
                `[proof:story-kit self-test] the bite WRONGLY flagged: ${name}`,
            );
    };

    const SF1 =
        "SF1 — SpecimenFrame is a real scoped component; the 4 retired sub-types are DEFINITION-ABSENT; DemoMatrix renamed to PermutationGrid";
    const SF2 =
        "SF2 — the 3 offending triggers (popover/dropdown-menu/hover-popover) each sit inside a flex-wrap wrapper (not a bare lone flex-col child)";
    const A1 =
        "A1 — the chassis barrel exports SpecimenFrame + PermutationGrid AND StoryPage is composed by the routed corpus (adoption floor)";
    const A3 =
        "A3 — SpecimenFrame carries the bounded align-self carve (>-depth-bounded) + the size cap (full-bleed is un-expressible without explicit fluid)";

    // SF1: a re-added DemoSpecimen.vue (the retired sub-type survives) → REDs SF1.
    sab(
        { existsOverride: { "demo/chassis/DemoSpecimen.vue": true } },
        SF1,
        "SF1 a re-added DemoSpecimen.vue (retired sub-type survives)",
    );
    // SF1: DemoMatrix left un-renamed (both DemoMatrix + PermutationGrid on disk) → REDs SF1.
    sab(
        { existsOverride: { [DEMOMATRIX]: true } },
        SF1,
        "SF1 DemoMatrix left un-renamed (the rename incomplete)",
    );
    // SF2: an UNWRAPPED offending trigger (the HEAD bare-lone-child form) → REDs SF2.
    sab(
        {
            srcOverride: {
                "demo/stories/containers/popover.vue": `<template><StorySection><Popover><PopoverTrigger as-child><Button variant="outline">Dimensions</Button></PopoverTrigger></Popover></StorySection></template>`,
            },
        },
        SF2,
        "SF2 an unwrapped Dimensions trigger (HEAD bare-lone-child form)",
    );
    // SF2 (non-vacuous): a correctly-wrapped trigger does NOT red SF2.
    sabNot(
        {
            srcOverride: {
                "demo/stories/containers/popover.vue": `<template><StorySection><div class="flex flex-wrap gap-3"><Popover><PopoverTrigger as-child><Button variant="outline">Dimensions</Button></PopoverTrigger></Popover></div></StorySection></template>`,
            },
        },
        SF2,
        "SF2 a correctly-wrapped trigger (must NOT red)",
    );
    // A1: SpecimenFrame un-barrelled → REDs A1.
    sab(
        {
            srcOverride: {
                [BARREL]: `export { default as PermutationGrid } from "./PermutationGrid.vue";`,
            },
        },
        A1,
        "A1 SpecimenFrame un-barrelled (kit incomplete)",
    );
    // A3: SpecimenFrame stripped of its align-self carve → REDs A3.
    sab(
        {
            srcOverride: {
                [SPECIMEN]: `<template><section class="specimen-frame"><div class="specimen-frame__body"><slot /></div></section></template><style scoped>.specimen-frame__header{}</style>`,
            },
        },
        A3,
        "A3 SpecimenFrame without the align-self carve (the balloon un-fenced)",
    );

    return flagged;
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_STORY_KIT_ARTIFACT", "BI-story-kit");

    const selfTestCount = selfTest();
    const { facts, violations } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:story-kit",
        command: COMMAND,
        selfTestChecks: selfTestCount,
        facts,
        violations,
    });

    console.log(
        "proof:story-kit — the storybook SpecimenFrame kit lock (BI.W-SPECIMEN-FRAME)",
    );
    console.log(
        `  SF1 SpecimenFrame + fold   : ${facts["SF1 — SpecimenFrame is a real scoped component; the 4 retired sub-types are DEFINITION-ABSENT; DemoMatrix renamed to PermutationGrid"]}  (survivors: ${JSON.stringify(facts.sf1?.retiredSurvivors ?? [])})`,
    );
    console.log(
        `  SF2 triggers wrapped       : ${facts["SF2 — the 3 offending triggers (popover/dropdown-menu/hover-popover) each sit inside a flex-wrap wrapper (not a bare lone flex-col child)"]}  (unwrapped: ${JSON.stringify(facts.sf2?.unwrapped ?? [])})`,
    );
    console.log(
        `  A1  kit tree-global        : ${facts["A1 — the chassis barrel exports SpecimenFrame + PermutationGrid AND StoryPage is composed by the routed corpus (adoption floor)"]}  (StoryPage adopters: ${facts.a1?.storyPageAdopters}/${facts.a1?.floor})`,
    );
    console.log(
        `  A3  w-full carve mechanism : ${facts["A3 — SpecimenFrame carries the bounded align-self carve (>-depth-bounded) + the size cap (full-bleed is un-expressible without explicit fluid)"]}  (carve: ${facts.a3?.hasCarve}, sizeCap: ${facts.a3?.hasSizeCap})`,
    );
    console.log(
        `  self-test (bite proof)     : OK — ${selfTestCount} synthetic sabotages handled (SF1×2 + SF2×2 incl. non-vacuous + A1 + A3)`,
    );
    console.log(
        "  π obligation (#92)         : the RENDERED-WIDTH readback (the 3 triggers < article width, Chrome + real-Safari, both modes) is the BINDING w-full verdict (CBA-7).",
    );

    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: .cache/gates/BI-story-kit.json`,
    );

    if (SELF_TEST) {
        console.log(`  --self-test: ${selfTestCount} bites verified`);
    }
    process.exit(status === "pass" ? 0 : 1);
}

run();
