#!/usr/bin/env node
// proof:story-tiles — the landing LIVE-TILES lock (BI.W-LIVE-TILES).
//
// The landing bento tiles are REAL scaled per-story components (curated from those
// sections), resolved down ONE ladder, mounting ZERO GL contexts and ZERO tab stops
// inside a tile — the cure for UF-F1 ("literal, live, actual components, not wasted
// icon space") + FAM-14 ("sibling stories paint the SAME per-category silhouette").
// The retired `category-hero.ts` previewKind specimen arm is GONE (clean break).
//
// DEVICE-FREE floor: these clauses prove the MECHANISM is wired on disk (the ladder
// is total, the fence is present, the CV park is present, no live GL in the tile
// surfaces). The RENDERED verdicts — the live `getContext('webgl2')` count == 0 on
// the landing route, Tab never entering a tile, the fit crisp not scale-blurred, the
// 40-/131-tile aggregate frame cost — are the π batch (#92); this is the wiring the π
// reads.
//
//   T1 — 0 GL: no live-GL component/context in the tile-MOUNTING surfaces
//        (SectionLanding · SectionPreviewCard · every *.tile.vue). A GL viz tile is
//        the frozen `vizPreviewStill` <img> raster, never a mounted <Aurora>/<canvas>.
//   T2 — the per-STORY ladder, no per-CATEGORY silhouette: category-hero.ts carries
//        NO previewKind/categorySpecimen arm; SectionLanding dispatches NO
//        specimen-{field,control,surface,metric,glyph} silhouette; it resolves via
//        `resolveStoryTile`; storyTile.ts is a TOTAL 4-rung ladder terminating in the
//        per-story identity floor (no stale-tile hole). (born-RED: silhouette live.)
//   T3 — the 8-item fence on SectionPreviewCard's stage: inert · aria-hidden ·
//        pointer-events:none · container-type fit · contain · 0-GL still (<img>) ·
//        user-select:none · rest-state (no rAF). (born-RED: contain + no-select absent.)
//   T4 — 0 tab stops inside a tile: the stage is `inert` + the whole card is ONE
//        <RouterLink>; no positive `tabindex` inside a tile.
//   T5 — the CV park: SectionPreviewCard carries content-visibility:auto +
//        contain:content + contain-intrinsic-size. (born-RED: CV absent on HEAD.)
//   T6 — the mechanism is enrolled: the manifest declares the `tile?` field + the
//        `./*/*.tile.vue` glob, and ≥1 authored `.tile.vue` exists (the demonstration).
//
//   ST1..ST3 — the /substrates index arm (BI.W-SUBSTRATE-INDEX-TILES). The substrate
//        index is the SAME LIVE-TILES mechanism consuming the `vizPreviewStill` still
//        rung (no forked ladder — UF-E9's "real components instead" answered by the
//        high-fidelity generated still). ST1 every surviving substrate resolves a
//        DISTINCT generated still (no shared silhouette, no stock raster). ST2 the
//        still generator is Canvas2D-only (0 live GL on the index). ST3 the index
//        reflects the B5-deleted set — no recipe for dot-flow-field/concentric/
//        dot-matrix; the registry ↔ manifest roster is EXACT (no orphan, no missing).
//
// Self-test bites (anti-evasion): a planted live <Aurora> in a tile REDs T1; a planted
// focusable child (tabindex="0") REDs T4; a re-introduced previewKind/categorySpecimen
// silhouette REDs T2; the CV park stripped REDs T5; the fence's contain/no-select
// stripped REDs T3; a re-added dot-flow-field recipe REDs ST3; a live webgl2 context in
// the still generator REDs ST2; a duplicate still across two substrates REDs ST1.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:story-tiles";
const SELF_TEST = process.argv.includes("--self-test");

const CATEGORY_HERO = "demo/chassis/hero/category-hero.ts";
const SECTION_LANDING = "demo/chassis/landing/SectionLanding.vue";
const STORY_TILE = "demo/chassis/landing/storyTile.ts";
const PREVIEW_CARD = "demo/chassis/landing/SectionPreviewCard.vue";
const VIZ_STILL = "demo/chassis/landing/vizPreviewStill.ts";
const MANIFEST = "demo/stories/manifest.ts";
const STORIES_DIR = resolve(ROOT, "demo/stories");

// The B5-deleted substrate vizzes (BI.W-VIZ-DELETIONS: dot-flow-field/concentric/
// dot-matrix retired) + their now-orphan generator patterns. The /substrates index
// must carry NO tile or still recipe for any of these (ST3).
const DELETED_VIZ = ["dot-flow-field", "concentric", "dot-matrix"];
const DELETED_PATTERN = ["flow", "rings", "phyllotaxis"];

// Parse the `s("substrates", "<id>", ...)` story-factory calls → the surviving
// substrate id set (the /substrates index roster).
function parseSubstrateIds(manifestSrc) {
    const re = /\bs\(\s*["']substrates["']\s*,\s*["']([a-z0-9-]+)["']/g;
    const ids = [];
    let m;
    while ((m = re.exec(manifestSrc))) ids.push(m[1]);
    return ids;
}

// Parse the VIZ_PREVIEW_STILLS `/substrates/<id>: { pattern, hue, seed }` registry
// → the per-route still recipes (the id + its distinct (pattern,hue,seed) triple).
function parseVizStills(vizSrc) {
    const re =
        /["']\/substrates\/([a-z0-9-]+)["']\s*:\s*\{\s*pattern:\s*["']([a-z-]+)["']\s*,\s*hue:\s*(\d+)\s*,\s*seed:\s*(\d+)\s*\}/g;
    const out = [];
    let m;
    while ((m = re.exec(vizSrc))) {
        out.push({ id: m[1], pattern: m[2], hue: Number(m[3]), seed: Number(m[4]) });
    }
    return out;
}

function read(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// Strip // line + /* block */ + <!-- vue --> comments so a doc-comment mention of
// "WebGL"/"canvas"/"previewKind" is never mistaken for a live reference.
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "")
        .replace(/<!--[\s\S]*?-->/g, "");
}

// Walk demo/stories/<cat>/<id>.tile.vue — the authored landing-tile SFCs.
function tileFiles() {
    const out = [];
    if (!existsSync(STORIES_DIR)) return out;
    for (const cat of readdirSync(STORIES_DIR)) {
        const dir = resolve(STORIES_DIR, cat);
        if (!statSync(dir).isDirectory()) continue;
        for (const f of readdirSync(dir)) {
            if (f.endsWith(".tile.vue")) out.push(`demo/stories/${cat}/${f}`);
        }
    }
    return out.sort();
}

// The live-GL markers a tile-mounting surface must NOT carry (a viz tile is a frozen
// <img> still, never a mounted context).
const GL_LIVE = [
    /<\s*Aurora\b/,
    /<\s*Constellation\b/,
    /<\s*FourierField\b/,
    /\brender-mode\s*=/,
    /getContext\(\s*["']webgl/i,
    /getContext\(\s*["']webgpu/i,
    /<\s*canvas\b/,
];

// The retired per-category silhouette markers — none may survive.
const SILHOUETTE = [
    /\bpreviewKind\b/,
    /\bPreviewKind\b/,
    /\bcategorySpecimen\b/,
    /\bspecimen-field\b/,
    /\bspecimen-control\b/,
    /\bspecimen-surface\b/,
    /\bspecimen-metric\b/,
    /\bspecimen-glyph\b/,
];

// ── The detector — runs over a SOURCE MAP so the self-test can sabotage inputs. All
// `overrides.*` default to the real FS read. `overrides.tiles` is an array of
// { path, text } that REPLACES the walked tile set.
function detect(overrides = {}) {
    const violations = [];
    const facts = {};
    function assert(label, ok) {
        facts[label] = Boolean(ok);
        if (!ok) violations.push(label);
    }
    const hasAny = (text, patterns) => patterns.some((re) => re.test(text));

    const ch = overrides.categoryHero ?? read(CATEGORY_HERO);
    const sl = overrides.sectionLanding ?? read(SECTION_LANDING);
    const st = overrides.storyTile ?? read(STORY_TILE);
    const pc = overrides.previewCard ?? read(PREVIEW_CARD);
    const vs = overrides.vizStill ?? read(VIZ_STILL);
    const mf = overrides.manifest ?? read(MANIFEST);
    const tiles =
        overrides.tiles ??
        tileFiles().map((p) => ({ path: p, text: readFileSync(resolve(ROOT, p), "utf8") }));

    const chBody = stripComments(ch);
    const slBody = stripComments(sl);
    const pcBody = stripComments(pc);

    // ── T1 — 0 GL in the tile-MOUNTING surfaces. ──
    const glMounts = [
        { path: SECTION_LANDING, text: slBody },
        { path: PREVIEW_CARD, text: pcBody },
        ...tiles.map((t) => ({ path: t.path, text: stripComments(t.text) })),
    ].filter((s) => hasAny(s.text, GL_LIVE));
    facts.glMounts = glMounts.map((s) => s.path);
    assert("T1 — 0 live-GL in the tile surfaces", glMounts.length === 0);

    // ── T2 — the per-STORY ladder, no per-CATEGORY silhouette. ──
    assert(
        "T2a — category-hero.ts carries no previewKind/categorySpecimen arm",
        !hasAny(chBody, SILHOUETTE),
    );
    assert(
        "T2b — SectionLanding dispatches no per-category silhouette",
        !hasAny(slBody, SILHOUETTE),
    );
    assert(
        "T2c — SectionLanding resolves tiles via the resolveStoryTile ladder",
        /resolveStoryTile\s*\(/.test(slBody),
    );
    // storyTile.ts is a TOTAL ladder terminating in the per-story identity floor.
    const rungs = [
        /kind:\s*["']authored["']/,
        /kind:\s*["']still["']/,
        /kind:\s*["']identity["']/,
    ];
    const stBody = stripComments(st);
    assert(
        "T2d — storyTile.ts is a total ladder (authored·still·identity floor)",
        rungs.every((re) => re.test(stBody)) &&
            /return\s*\{[\s\S]{0,40}kind:\s*["']identity["']/.test(stBody),
    );

    // ── T3 — the 8-item fence on SectionPreviewCard's stage. ──
    const fence = {
        inert: /class="section-preview-card-preview"[^>]*\binert\b/.test(pc) ||
            /\binert\b[^>]*class="section-preview-card-preview"/.test(pc) ||
            /section-preview-card-preview[\s\S]{0,120}\binert\b/.test(pc),
        ariaHidden: /section-preview-card-preview[\s\S]{0,160}aria-hidden="true"/.test(pc),
        pointerEvents: /pointer-events:\s*none/.test(pcBody),
        containerType: /container-type:\s*size/.test(pcBody),
        contain: /\bcontain:\s*paint\b/.test(pcBody),
        userSelect: /user-select:\s*none/.test(pcBody),
        // the 0-GL still branch renders an <img>, never a live component.
        stillImg:
            /<\s*img\b[\s\S]{0,200}section-preview-card-viz-still/.test(pc) &&
            /tile\?\.kind\s*===\s*["']still["']/.test(pc),
        // rest-state — the body tile suppresses animation (no rAF/reveal on a landing).
        restState: /animation:\s*none/.test(pcBody),
    };
    facts.fence = fence;
    assert(
        "T3 — the 8-item fence present on the tile stage",
        Object.values(fence).every(Boolean),
    );

    // ── T4 — 0 tab stops inside a tile. ──
    const stageInert = fence.inert;
    const oneLink = /<\s*RouterLink\b/.test(pc);
    const positiveTab = [
        { path: PREVIEW_CARD, text: pc },
        ...tiles,
    ].filter((s) => /tabindex\s*=\s*["'](?!-1)\d/.test(s.text));
    facts.positiveTabInTiles = positiveTab.map((s) => s.path);
    assert(
        "T4 — 0 tab stops inside a tile (inert stage · one RouterLink · no positive tabindex)",
        stageInert && oneLink && positiveTab.length === 0,
    );

    // ── T5 — the CV park. ──
    assert(
        "T5 — SectionPreviewCard carries the CV park (content-visibility + contain:content + intrinsic reserve)",
        /content-visibility:\s*auto/.test(pcBody) &&
            /\bcontain:\s*content\b/.test(pcBody) &&
            /contain-intrinsic-size:/.test(pcBody),
    );

    // ── T6 — the mechanism is enrolled (the manifest field + glob + ≥1 authored tile). ──
    // Scanned on the RAW manifest: a glob pattern string (`./*/*.tile.vue`) carries a
    // literal `/*`, which a comment-stripper would mistake for a block-comment open.
    assert(
        "T6 — the manifest declares the tile? field + the ./*/*.tile.vue glob",
        /\btile\?\s*:\s*\(\)\s*=>\s*Promise/.test(mf) &&
            /import\.meta\.glob<[^>]*>\(\s*["']\.\/\*\/\*\.tile\.vue["']\s*\)/.test(mf),
    );
    facts.authoredTileCount = tiles.length;
    assert("T6 — ≥1 authored .tile.vue demonstrator exists", tiles.length >= 1);

    // ── ST — the /substrates index arm (BI.W-SUBSTRATE-INDEX-TILES). ──
    // The /substrates index is the SAME LIVE-TILES mechanism (SectionLanding + the
    // resolveStoryTile ladder + SectionPreviewCard), consuming the `vizPreviewStill`
    // still rung — NOT a forked ladder. These clauses lock the substrate-specific
    // truths: every surviving substrate resolves a DISTINCT high-fidelity generated
    // still, the still generator is Canvas2D-only (0 GL), and the index reflects the
    // B5-deleted set (no orphan recipe for a retired viz).
    const vsBody = stripComments(vs);
    const substrateIds = parseSubstrateIds(mf); // raw mf — the `s(...)` calls are code
    const stills = parseVizStills(vs);
    const stillIds = stills.map((s) => s.id);
    facts.substrateIds = substrateIds;
    facts.stillIds = stillIds;

    // ST1 — each substrate tile is a real-component-derived DISTINCT preview: every
    // substrate story resolves a still, all stills are pairwise DISTINCT (no shared
    // pattern → no shared silhouette; no shared (pattern,hue,seed) → no shared
    // raster), and the still is GENERATED (toDataURL off a characteristic generator),
    // never an imported low-quality stock raster.
    const patternDistinct = new Set(stills.map((s) => s.pattern)).size === stills.length;
    const tripleDistinct =
        new Set(stills.map((s) => `${s.pattern}:${s.hue}:${s.seed}`)).size === stills.length;
    const everySubstrateResolves =
        substrateIds.length > 0 && substrateIds.every((id) => stillIds.includes(id));
    const generatedNotStock =
        /toDataURL\(/.test(vsBody) && !/from\s+["'][^"']+\.(png|jpe?g|webp|gif|avif)["']/.test(vsBody);
    facts.st1 = { patternDistinct, tripleDistinct, everySubstrateResolves, generatedNotStock };
    assert(
        "ST1 — each /substrates index tile is a real-component-derived DISTINCT still (no shared silhouette, no stock raster)",
        patternDistinct && tripleDistinct && everySubstrateResolves && generatedNotStock,
    );

    // ST2 — the 0-GL budget holds on the /substrates index: the still generator is
    // Canvas2D-ONLY (getContext("2d")), never a live getContext("webgl"|"webgpu").
    const canvas2dOnly =
        /getContext\(\s*["']2d["']/.test(vsBody) &&
        !/getContext\(\s*["']webgl/i.test(vsBody) &&
        !/getContext\(\s*["']webgpu/i.test(vsBody);
    facts.st2 = { canvas2dOnly };
    assert(
        "ST2 — the /substrates index still generator is Canvas2D-only (0 live GL contexts)",
        canvas2dOnly,
    );

    // ST3 — the index reflects the B5-deleted set: NO still recipe (registry entry or
    // generator pattern) for a retired viz, and the registry ↔ manifest roster is
    // EXACT (no orphan still for a gone story, no substrate missing its still).
    const deletedRoute = stillIds.filter((id) => DELETED_VIZ.includes(id));
    const deletedPatternLive = DELETED_PATTERN.filter((p) =>
        new RegExp(`["']${p}["']`).test(vsBody),
    );
    const orphanStills = stillIds.filter((id) => !substrateIds.includes(id));
    const missingStills = substrateIds.filter((id) => !stillIds.includes(id));
    facts.st3 = { deletedRoute, deletedPatternLive, orphanStills, missingStills };
    assert(
        "ST3 — the index reflects the B5-deleted set (no dot-flow-field/concentric/dot-matrix recipe; registry ↔ manifest exact)",
        deletedRoute.length === 0 &&
            deletedPatternLive.length === 0 &&
            orphanStills.length === 0 &&
            missingStills.length === 0,
    );

    return { facts, violations };
}

// ── The self-test bites (anti-evasion) — each sabotage REDs its clause. ──
function selfTest() {
    let flagged = 0;
    const sab = (overrides, clausePrefix, name) => {
        const { violations } = detect(overrides);
        const tripped = violations.some((v) => v.startsWith(clausePrefix));
        if (tripped) flagged++;
        else
            throw new Error(
                `[proof:story-tiles self-test] the bite FAILED to flag the sabotage: ${name}`,
            );
    };
    // T1: a live <Aurora> planted in a tile.
    sab(
        { tiles: [{ path: "demo/stories/__synthetic__.tile.vue", text: `<template><Aurora /></template>` }] },
        "T1",
        "live <Aurora> in a tile",
    );
    // T4: a focusable child (positive tabindex) planted in a tile.
    sab(
        { tiles: [{ path: "demo/stories/__synthetic__.tile.vue", text: `<template><button tabindex="0">x</button></template>` }] },
        "T4",
        "focusable child in a tile",
    );
    // T2: a re-introduced previewKind silhouette in category-hero.ts.
    sab(
        { categoryHero: `export interface CategoryHero { previewKind: string }` },
        "T2a",
        "previewKind re-introduced in category-hero.ts",
    );
    // T2: a re-introduced categorySpecimen dispatch in SectionLanding.
    sab(
        { sectionLanding: `const specimen = categorySpecimen(id); <div class="specimen-field" />` },
        "T2b",
        "categorySpecimen silhouette re-introduced in SectionLanding",
    );
    // T5: the CV park stripped from SectionPreviewCard.
    sab(
        { previewCard: `.section-preview-card { position: relative; }` },
        "T5",
        "CV park stripped",
    );
    // T3: the fence's contain/no-select stripped.
    sab(
        {
            previewCard: `<div class="section-preview-card-preview" inert aria-hidden="true"><img v-if="tile?.kind === 'still'" /></div>\n.section-preview-card-preview { pointer-events: none; container-type: size; }`,
        },
        "T3",
        "fence contain/no-select stripped",
    );
    // ST3: a re-added dot-flow-field still recipe (a retired viz) in the registry.
    sab(
        {
            vizStill: `export const VIZ_PREVIEW_STILLS = {
  "/substrates/dot-flow-field": { pattern: "flow", hue: 50, seed: 707 },
};
canvas.getContext("2d"); canvas.toDataURL("image/png");`,
        },
        "ST3",
        "re-added dot-flow-field recipe",
    );
    // ST2: a live getContext('webgl2') in the still generator (a live GL context).
    sab(
        {
            vizStill: `export const VIZ_PREVIEW_STILLS = { "/substrates/aurora": { pattern: "nuclei", hue: 58, seed: 101 } };
canvas.getContext("webgl2"); canvas.toDataURL("image/png");`,
        },
        "ST2",
        "live webgl2 context in the still generator",
    );
    // ST1: two substrates sharing the SAME (pattern,hue,seed) — a duplicate still
    // (matched synthetic manifest so ONLY the distinctness clause fails).
    sab(
        {
            vizStill: `export const VIZ_PREVIEW_STILLS = {
  "/substrates/aurora": { pattern: "nuclei", hue: 58, seed: 101 },
  "/substrates/blob": { pattern: "nuclei", hue: 58, seed: 101 },
};
canvas.getContext("2d"); canvas.toDataURL("image/png");`,
            manifest: `s("substrates", "aurora", "A", "b", {}) s("substrates", "blob", "B", "b", {})`,
        },
        "ST1",
        "duplicate still shared across two substrates",
    );
    return flagged;
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_STORY_TILES_ARTIFACT", "BI-story-tiles");
    const selfTestCount = selfTest();
    const { facts, violations } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:story-tiles",
        command: COMMAND,
        selfTestChecks: selfTestCount,
        facts,
        violations,
    });

    console.log("proof:story-tiles — the landing bento tiles are REAL scaled per-story components (BI.W-LIVE-TILES)");
    console.log(`  T1 0-GL tile surfaces     : ${facts["T1 — 0 live-GL in the tile surfaces"]}`);
    console.log(`  T2 per-story ladder       : ${facts["T2a — category-hero.ts carries no previewKind/categorySpecimen arm"] && facts["T2b — SectionLanding dispatches no per-category silhouette"] && facts["T2c — SectionLanding resolves tiles via the resolveStoryTile ladder"] && facts["T2d — storyTile.ts is a total ladder (authored·still·identity floor)"]}`);
    console.log(`  T3 8-item fence           : ${facts["T3 — the 8-item fence present on the tile stage"]}`);
    console.log(`  T4 0 tab stops in a tile  : ${facts["T4 — 0 tab stops inside a tile (inert stage · one RouterLink · no positive tabindex)"]}`);
    console.log(`  T5 CV park                : ${facts["T5 — SectionPreviewCard carries the CV park (content-visibility + contain:content + intrinsic reserve)"]}`);
    console.log(`  T6 mechanism enrolled     : ${facts["T6 — the manifest declares the tile? field + the ./*/*.tile.vue glob"] && facts["T6 — ≥1 authored .tile.vue demonstrator exists"]}  (${facts.authoredTileCount} authored tiles)`);
    console.log(`  ST1 substrate distinct    : ${facts["ST1 — each /substrates index tile is a real-component-derived DISTINCT still (no shared silhouette, no stock raster)"]}  (${facts.stillIds?.length ?? 0} stills)`);
    console.log(`  ST2 substrate 0-GL still  : ${facts["ST2 — the /substrates index still generator is Canvas2D-only (0 live GL contexts)"]}`);
    console.log(`  ST3 B5-deleted reflected  : ${facts["ST3 — the index reflects the B5-deleted set (no dot-flow-field/concentric/dot-matrix recipe; registry ↔ manifest exact)"]}`);
    console.log(`  self-test (bite proof)    : OK — ${selfTestCount} synthetic sabotages flagged`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
        if (facts.glMounts?.length) console.log(`  GL mounts: ${JSON.stringify(facts.glMounts)}`);
        if (facts.positiveTabInTiles?.length) console.log(`  positive tabindex: ${JSON.stringify(facts.positiveTabInTiles)}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);

    if (SELF_TEST) {
        console.log(`\n[proof:story-tiles --self-test] ${selfTestCount} bite(s) flagged`);
    }
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
