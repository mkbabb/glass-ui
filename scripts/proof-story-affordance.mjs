#!/usr/bin/env node
// proof:story-affordance — the CBA 15-page affordance lock (BI.W-AFFORDANCE-REDESIGN).
//
// The storybook's WORST demo pages were test fixtures, debug readouts, single-
// permutation stubs, and bare panes on the page field (UF-F6 / UF-F7 / CBA-2..6). This
// gate proves the SOURCE cure is wired; the painted read (the pages look like real
// component demos on Chrome + real-Safari) rides the π batch (#92).
//
//   AF1 — data/search is a REAL search demo, not a test fixture. NO internal-API
//         button labels (buildIndex / searchIndex / fuzzyMatch), NO helper-ledger
//         `data-testid` on the user-facing page (moved to tests-visual/search.spec.ts),
//         and a real SearchBar + FuzzySearch + results are present. (born-RED: HEAD
//         shipped the `buildIndex`/`searchIndex`/`fuzzyMatch` buttons + the "Helper call
//         ledger" data-testid strip.)
//   AF2 — permutation coverage. Each enrolled container demo shows ≥2 trigger
//         widths/variants + the placement matrix + ≥1 disabled/edge state (the sheet
//         `surface` axis, card-pressable static-beside-pressable). (born-RED: HEAD had
//         popover w/o a disabled edge, dropdown-menu one trigger, sheet no surface axis,
//         card-pressable no static card, header-ribbon one placement.)
//   AF3 — StorySection consistency + veil demarcation. The enrolled 0-StorySection +
//         bare-`<section>` pages compose <StorySection heading> + the shared veil-card
//         register (`surface="veil"`, consumed not forked), with NO hand-rolled bare
//         demo-body `<section class="flex flex-col gap-3">`. (born-RED: HEAD's avatar/
//         tags-input/sortable-list used 0 StorySection; hover-popover used bare sections.)
//   AF4 — FamilyTabs IA. metrics + table resolve each member to ONE canonical path: the
//         family page is the <FamilyTabs> aggregator and every member is FOLDED (dropped
//         from the standalone nav) — no member reachable two ways that re-mounts.
//
// Self-test bites (anti-evasion): a planted `buildIndex` button label REDs AF1; a
// planted single-permutation container demo REDs AF2; a planted bare-`<section>` demo
// body REDs AF3; the real pages do NOT red their clause (the non-vacuous arm).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:story-affordance";
const SELF_TEST = process.argv.includes("--self-test");

const SEARCH = "demo/stories/data/search.vue";
const SEARCH_SPEC = "tests-visual/search.spec.ts";
const MANIFEST = "demo/stories/manifest.ts";

// AF1 — the internal-API tokens that must NEVER appear as UI labels / imports on the
// user-facing search page (they moved to the spec).
const AF1_BANNED = /\b(?:buildIndex|searchIndex|fuzzyMatch|clearSearchCache)\b/;

// AF2 — the enrolled container demos + their required permutation markers. Each check
// is a real permutation axis my redesign added; each was ABSENT at HEAD.
const AF2_PAGES = [
    {
        file: "demo/stories/containers/popover.vue",
        name: "popover",
        need: (s) =>
            /side="top"/.test(s) &&
            /side="bottom"/.test(s) && // the placement matrix
            (s.match(/variant="/g) ?? []).length >= 2 && // ≥2 trigger variants
            /\bdisabled\b/.test(s), // the disabled edge
    },
    {
        file: "demo/stories/containers/dropdown-menu.vue",
        name: "dropdown-menu",
        need: (s) =>
            (s.match(/<DropdownMenuTrigger/g) ?? []).length >= 2 && // ≥2 triggers
            /\bdisabled\b/.test(s), // a disabled item/trigger
    },
    {
        file: "demo/stories/containers/context-menu.vue",
        name: "context-menu",
        need: (s) =>
            /canvasStyle|backgroundImage/.test(s) && // the tinted canvas (not a mono readout)
            /\bdisabled\b/.test(s), // a disabled item
    },
    {
        file: "demo/stories/containers/sheet.vue",
        name: "sheet",
        need: (s) =>
            (s.match(/placement=/g) ?? []).length >= 2 && // the placement matrix
            /:surface=/.test(s) && // the surface axis (the CBA-4 gap)
            /\bdisabled\b/.test(s), // the disabled edge
    },
    {
        file: "demo/stories/containers/card-pressable.vue",
        name: "card-pressable",
        need: (s) =>
            /as="button"/.test(s) && // the pressable card
            /Static card/.test(s), // the static-beside-pressable (the CBA-4 gap)
    },
    {
        file: "demo/stories/navigation/header-ribbon.vue",
        name: "header-ribbon",
        need: (s) =>
            (s.match(/<HeaderRibbon/g) ?? []).length >= 2 && // ≥2 placement permutations
            /\bdisabled\b/.test(s), // a disabled control
    },
];

// AF3 — the enrolled 0-StorySection + bare-<section> pages (metrics is EXEMPT: it is a
// pure <FamilyTabs> aggregator with no demo body of its own — its members carry their
// own sections; it is adjudicated under AF4).
const AF3_PAGES = [
    "demo/stories/data/avatar.vue",
    "demo/stories/data/tags-input.vue",
    "demo/stories/data/sortable-list.vue",
    "demo/stories/containers/hover-popover.vue",
];
// The pre-migration bare demo-body anti-pattern (a hand-rolled section wrapper the
// StorySection host replaces). StorySection renders its OWN `<section>` inside the
// COMPONENT, so a migrated page's SOURCE carries none of these.
const BARE_SECTION = /<section\s+class="flex flex-col gap-3"/;

// AF4 — every metrics/table FamilyTabs member is FOLDED (the drop-standalone decision):
// reachable ONLY via its family aggregator, never as a live standalone route.
const AF4_FAMILY_MEMBERS = [
    "display/metric-badge",
    "data/metric-cell",
    "data/metric-stack",
    "data/data-table",
];

function readReal(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

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

    // ── AF1 — data/search is a real search demo, the fixture instrumentation gone. ──
    const searchSrc = readSrc(SEARCH);
    const af1NoBanned = !AF1_BANNED.test(searchSrc);
    const af1NoTestid = !/data-testid/.test(searchSrc);
    const af1RealSearch =
        /<SearchBar\b/.test(searchSrc) && /<FuzzySearch\b/.test(searchSrc);
    const af1SpecMoved = fileExists(SEARCH_SPEC);
    facts.af1 = {
        noInternalApiLabels: af1NoBanned,
        noLedgerTestid: af1NoTestid,
        realSearchPresent: af1RealSearch,
        instrumentationMovedToSpec: af1SpecMoved,
    };
    assert(
        "AF1 — data/search carries NO internal-API button labels + NO data-testid ledger (moved to spec); a real SearchBar + FuzzySearch + results present",
        af1NoBanned && af1NoTestid && af1RealSearch && af1SpecMoved,
    );

    // ── AF2 — permutation coverage per enrolled container demo. ──
    const af2Failing = AF2_PAGES.filter((p) => !p.need(readSrc(p.file))).map(
        (p) => p.name,
    );
    facts.af2 = { failing: af2Failing, enrolled: AF2_PAGES.map((p) => p.name) };
    assert(
        "AF2 — each enrolled container demo shows ≥2 trigger widths/variants + the placement matrix + ≥1 disabled/edge state (sheet surface axis, card-pressable static-beside-pressable)",
        af2Failing.length === 0,
    );

    // ── AF3 — StorySection heading + veil-card demarcation; no bare demo-body section. ──
    const af3Failing = [];
    for (const file of AF3_PAGES) {
        const s = readSrc(file);
        const hasHeadingSection = /<StorySection\b/.test(s) && /heading="/.test(s);
        const hasVeil = /surface="veil"/.test(s);
        const noBarePane = !BARE_SECTION.test(s);
        if (!(hasHeadingSection && hasVeil && noBarePane)) {
            af3Failing.push(file.split("/").slice(-1)[0]);
        }
    }
    facts.af3 = {
        failing: af3Failing,
        enrolled: AF3_PAGES.map((f) => f.split("/").slice(-1)[0]),
    };
    assert(
        "AF3 — the enrolled 0-StorySection + bare-<section> pages compose <StorySection heading> + the shared veil register (surface=\"veil\"), with no hand-rolled bare demo-body section",
        af3Failing.length === 0,
    );

    // ── AF4 — FamilyTabs IA: metrics/table are aggregators, every member FOLDED. ──
    const manifestSrc = readSrc(MANIFEST);
    const foldStart = manifestSrc.indexOf("FOLDED_STORY_IDS");
    const foldBlock =
        foldStart < 0 ? "" : manifestSrc.slice(foldStart, foldStart + 2000);
    const membersFolded = AF4_FAMILY_MEMBERS.filter(
        (id) => !new RegExp(`"${id}"`).test(foldBlock),
    );
    const metricsAggregates = /<FamilyTabs\b/.test(readSrc("demo/stories/data/metrics.vue"));
    const tableAggregates = /<FamilyTabs\b/.test(readSrc("demo/stories/data/table.vue"));
    facts.af4 = {
        unfoldedMembers: membersFolded,
        metricsAggregates,
        tableAggregates,
    };
    assert(
        "AF4 — metrics + table are <FamilyTabs> aggregators AND every family member is FOLDED (one canonical path per member, no two-way re-mount)",
        membersFolded.length === 0 && metricsAggregates && tableAggregates,
    );

    return { facts, violations };
}

const AF1 =
    "AF1 — data/search carries NO internal-API button labels + NO data-testid ledger (moved to spec); a real SearchBar + FuzzySearch + results present";
const AF2 =
    "AF2 — each enrolled container demo shows ≥2 trigger widths/variants + the placement matrix + ≥1 disabled/edge state (sheet surface axis, card-pressable static-beside-pressable)";
const AF3 =
    "AF3 — the enrolled 0-StorySection + bare-<section> pages compose <StorySection heading> + the shared veil register (surface=\"veil\"), with no hand-rolled bare demo-body section";

function selfTest() {
    let flagged = 0;
    const sab = (overrides, clause, name) => {
        const { violations } = detect(overrides);
        if (violations.includes(clause)) flagged++;
        else
            throw new Error(
                `[proof:story-affordance self-test] the bite FAILED to flag the sabotage: ${name}`,
            );
    };
    const sabNot = (overrides, clause, name) => {
        const { violations } = detect(overrides);
        if (!violations.includes(clause)) flagged++;
        else
            throw new Error(
                `[proof:story-affordance self-test] the bite WRONGLY flagged: ${name}`,
            );
    };

    // AF1: a re-added internal-API button label (the HEAD fixture form) → REDs AF1.
    sab(
        {
            srcOverride: {
                [SEARCH]: `<template><StoryPage><Button @click="runBuildIndex">buildIndex</Button></StoryPage></template>`,
            },
        },
        AF1,
        "AF1 a re-added buildIndex button label (HEAD fixture form)",
    );
    // AF1 (non-vacuous): the real search page does NOT red AF1.
    sabNot({}, AF1, "AF1 the real search page (must NOT red)");

    // AF2: a single-permutation popover (one trigger, no disabled edge) → REDs AF2.
    sab(
        {
            srcOverride: {
                "demo/stories/containers/popover.vue": `<template><StorySection><Popover><PopoverTrigger as-child><Button variant="outline">Dimensions</Button></PopoverTrigger><PopoverContent side="top">x</PopoverContent></Popover></StorySection></template>`,
            },
        },
        AF2,
        "AF2 a single-permutation popover (no disabled, no matrix)",
    );

    // AF3: a bare-<section> demo body (the HEAD hover-popover form) → REDs AF3.
    sab(
        {
            srcOverride: {
                "demo/stories/containers/hover-popover.vue": `<template><StoryPage><section class="flex flex-col gap-3"><p class="section-label">sides</p></section></StoryPage></template>`,
            },
        },
        AF3,
        "AF3 a bare-<section> demo body (HEAD 0-StorySection form)",
    );
    // AF3 (non-vacuous): the real avatar page does NOT red AF3.
    sabNot({}, AF3, "AF3 the real migrated pages (must NOT red)");

    return flagged;
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_STORY_AFFORDANCE_ARTIFACT",
        "BI-story-affordance",
    );

    const selfTestCount = selfTest();
    const { facts, violations } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:story-affordance",
        command: COMMAND,
        selfTestChecks: selfTestCount,
        facts,
        violations,
    });

    console.log(
        "proof:story-affordance — the CBA 15-page affordance lock (BI.W-AFFORDANCE-REDESIGN)",
    );
    console.log(
        `  AF1 data/search real demo   : ${facts[AF1]}  (banned-free: ${facts.af1?.noInternalApiLabels}, no-testid: ${facts.af1?.noLedgerTestid}, spec-moved: ${facts.af1?.instrumentationMovedToSpec})`,
    );
    console.log(
        `  AF2 permutation coverage    : ${facts[AF2]}  (failing: ${JSON.stringify(facts.af2?.failing ?? [])})`,
    );
    console.log(
        `  AF3 StorySection + veil     : ${facts[AF3]}  (failing: ${JSON.stringify(facts.af3?.failing ?? [])})`,
    );
    console.log(
        `  AF4 FamilyTabs IA           : ${facts["AF4 — metrics + table are <FamilyTabs> aggregators AND every family member is FOLDED (one canonical path per member, no two-way re-mount)"]}  (unfolded: ${JSON.stringify(facts.af4?.unfoldedMembers ?? [])})`,
    );
    console.log(
        `  self-test (bite proof)      : OK — ${selfTestCount} synthetic sabotages handled (AF1×2 incl. non-vacuous + AF2 + AF3×2 incl. non-vacuous)`,
    );
    console.log(
        "  π obligation (#92)          : the PAINTED read (search reads as a search demo; the container permutation grids render; the veil plates demarcate) rides the π batch, Chrome + real-Safari, both modes.",
    );

    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: .cache/gates/BI-story-affordance.json`,
    );

    if (SELF_TEST) {
        console.log(`  --self-test: ${selfTestCount} bites verified`);
    }
    process.exit(status === "pass" ? 0 : 1);
}

run();
