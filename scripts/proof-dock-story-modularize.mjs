#!/usr/bin/env node
// proof:dock-story-modularize — the dock-story MODULARIZE protection + cleanup gate
// (BG.W-DOCK-STORY-MODULARIZE, the A10-SPLIT — COHERENCE FOLD G7 MR-1).
//
// The dock stories carry two disjoint facilities the first-fold clause CONFLATED:
//   • liquid-playground.vue is the LAB — ONE configurable dock with the live spring
//     engine + the shipped <DockStack mode="facets"> tabs facility, in BOTH a
//     horizontal AND a vertical <GlassDock>. THIS is the "ONE dock + TABS facility".
//   • dock-gallery.vue is the BREADTH gallery — a grid of distinct iOS surface tiles
//     (AppleMusic / Spotlight / DynamicIsland …) that COMPOSE the real library
//     engines. It has ZERO <GlassDock> (the deliberate breadth point — the tiles ARE
//     the surfaces the dock morphs into). Its in-dock CONTENT is generic placeholder
//     copy (Track One / Artist / New message), never real brand/song/artist names.
//
// The first-fold clause MISTARGETED dock-gallery with a GlassDock+tabs assert it can
// never satisfy (0 docks by design). This gate carries the SPLIT correction as three
// disjoint protection arms + a content-cleanup lock + the modularize import-safety —
// so the good HEAD state (the content cleanup + the examples/ carve landed at
// BE.W-LIQUID-MORPH) can never silently regress: a gutted lab, a dock smuggled into
// the breadth gallery, a re-added real name, or a modularize that breaks an import
// each RED.
//
// Pure FS, device-free (paint-class H — a demo-story protection carries no gestalt
// verdict; the tiles' own paint rides the BE.W-LIQUID-MORPH / dock-band π). CONFIRM +
// GATE: the fix already landed, this LOCKS it (the proof:demo-copy-prune / prune-
// consolidate "verified DONE, not assumed — the gate is born-RED via the self-test
// bites" precedent).
//
// Asserts:
//   P1 — liquid-playground.vue OWNS the "ONE dock + TABS facility": it contains
//        `<GlassDock` AND `<DockStack` AND `mode="facets"` (the shipped facet/tabs
//        carousel bound over the real dock — the protection assert clause (i)).
//   P2 — the V+H dock breadth: liquid-playground.vue contains BOTH
//        `orientation="horizontal"` AND `orientation="vertical"` (the dock morphs on
//        one axis in both orientations — the coherence-fold-verified breadth).
//   P3 — dock-gallery.vue is the pure BREADTH gallery: ZERO `<GlassDock` (the
//        definitional fact that SPLIT the A10 clause; the dock+tabs facility lives
//        ONLY in the lab — a dock smuggled back into the gallery reds).
//   C1 — no hardcoded REAL brand/song/artist names in the gallery's rendered CONTENT.
//        Scans the comment-stripped rendered content (template TEXT nodes + the JS
//        data-object `label:`/`title:`/`artist:`/`subtitle:`/`name:` string values) of
//        dock-gallery.vue + examples/*.vue against a denylist — EXCLUDING the tile
//        `label=`/`hint=` HTML-attribute breadth captions (Apple Music / Spotlight are
//        the deliberate KEEP set; they are `=` attributes, never scanned) and comments.
//   I1 — the modularize import-safety: every LOCAL (relative `./`/`../` or `@glass/*`)
//        import across demo/stories/dock/**/*.vue resolves on disk (a carve that
//        orphans an import reds — the spec's "Gate against broken imports").
//
// Self-test bites (born-RED demonstration — each synthetic sabotage REDs its clause,
// the comment/attribute cases do NOT red): a lab stripped of the facet facility REDs
// P1; a lab missing an orientation REDs P2; a dock smuggled into the gallery REDs P3;
// a "Spotify — Taylor Swift" content node REDs C1; a real name in a `label=` attribute
// or a comment does NOT red C1 (the breadth-caption + comment-strip fences); a broken
// import REDs I1.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const SRC = resolve(ROOT, "src");
const COMMAND = "npm run proof:dock-story-modularize";
const SELF_TEST = process.argv.includes("--self-test");

const DOCK_DIR = resolve(ROOT, "demo/stories/dock");
const LIQUID = resolve(DOCK_DIR, "liquid-playground.vue");
const GALLERY = resolve(DOCK_DIR, "dock-gallery.vue");
const EXAMPLES_DIR = resolve(DOCK_DIR, "examples");

// ── The real-name denylist (C1). These are brand-apps / recording artists /
// hardware product names that NEVER belong in placeholder demo content — the "no
// real names" A10 request. The deliberate iOS-surface breadth CAPTIONS (Apple Music,
// Spotlight, Dynamic Island) are NOT here — they are the gallery's KEEP set and ride
// `=` attributes the content scan never reaches. Matched as case-insensitive whole
// tokens. ──
const REAL_NAMES = [
    // streaming / social / brand apps (not the iOS-surface breadth captions)
    "Spotify", "Instagram", "WhatsApp", "Netflix", "YouTube", "TikTok",
    "Snapchat", "Uber", "Lyft", "Airbnb", "Twitter", "Facebook", "Discord",
    "Slack", "Figma", "Notion", "Gmail", "Reddit", "LinkedIn", "Pinterest",
    "Venmo", "PayPal", "Dropbox",
    // real recording artists (the "real song/artist" class)
    "Taylor Swift", "Drake", "Beyonce", "Beyoncé", "Kendrick", "The Weeknd",
    "Billie Eilish", "Olivia Rodrigo", "Bad Bunny", "Ariana Grande", "Dua Lipa",
    "Kanye", "Rihanna", "Adele",
    // real hardware product names
    "iPhone", "MacBook", "AirPods", "iPad", "Apple Watch",
];

// Local-import resolution extensions/index forms (I1).
const IMPORT_EXTS = [".ts", ".vue", ".mjs", ".js", ".tsx", ""];
const IMPORT_INDEX = ["/index.ts", "/index.vue", "/index.js", "/index.mjs", "/index.tsx"];

function read(p) {
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// Strip // line + /* block */ + <!-- vue --> comments (the copy-prune conservatism
// fence — a real name / a marker mentioned in a comment is provenance, never rendered).
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");
}

// Extract the RENDERED content strings of a .vue source (comment-stripped):
//   • template TEXT nodes (>…<) — the literal copy; {{ }} interpolations excluded by
//     the [^{}] class; HTML `attr="…"` values excluded (they sit inside <…>, never
//     between > and <).
//   • JS data-object string values for label/title/artist/subtitle/name (the `key:`
//     colon form — the in-dock content arrays), DISTINCT from the `key=` HTML
//     attribute form (the tile breadth captions the scan deliberately skips).
function renderedContent(rawSrc) {
    const src = stripComments(rawSrc);
    const out = [];
    const tpl = src.match(/<template>([\s\S]*)<\/template>/);
    if (tpl) {
        for (const m of tpl[1].matchAll(/>([^<>{}]+)</g)) {
            const t = m[1].trim();
            if (t && /[A-Za-z]{2,}/.test(t)) out.push(t);
        }
    }
    for (const m of src.matchAll(/\b(?:label|title|artist|subtitle|name)\s*:\s*"([^"]+)"/g)) {
        const t = m[1].trim();
        if (t) out.push(t);
    }
    return out;
}

function denylistHits(strings) {
    const hits = [];
    for (const s of strings) {
        for (const name of REAL_NAMES) {
            const re = new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
            if (re.test(s)) hits.push({ name, text: s });
        }
    }
    return hits;
}

// Gather every demo/stories/dock/**/*.vue (I1 import scan + the gallery-content corpus).
function allDockVue(dir = DOCK_DIR, acc = []) {
    if (!existsSync(dir)) return acc;
    for (const f of readdirSync(dir)) {
        const p = resolve(dir, f);
        if (statSync(p).isDirectory()) allDockVue(p, acc);
        else if (f.endsWith(".vue")) acc.push(p);
    }
    return acc;
}

// Resolve a LOCAL import specifier from a host file; returns true iff it lands on
// disk (bare package specifiers — vue / @lucide/vue / reka-ui — are SKIPPED, they are
// not the modularize's concern). `@glass/*` → src/*.
function localImportResolves(hostPath, spec) {
    let target;
    if (spec.startsWith("@glass/")) target = resolve(SRC, spec.slice("@glass/".length));
    else if (spec.startsWith(".")) target = resolve(dirname(hostPath), spec);
    else return null; // bare package — not a local import
    for (const e of IMPORT_EXTS) if (existsSync(target + e)) return true;
    for (const i of IMPORT_INDEX) if (existsSync(target + i)) return true;
    return false;
}

function localImportsOf(src) {
    const specs = [];
    for (const m of src.matchAll(/\bfrom\s+"([^"]+)"/g)) specs.push(m[1]);
    for (const m of src.matchAll(/\bimport\s*\(\s*["']([^"']+)["']\s*\)/g)) specs.push(m[1]);
    return specs.filter((s) => s.startsWith(".") || s.startsWith("@glass/"));
}

// ── The detector — runs over a SOURCE MAP so a self-test can sabotage inputs.
// overrides: { liquidText?, galleryText?, galleryContentOnly?, contentAppend?,
//              importInject?: [{ path, src }], importInjectAppend?: [{ path, src }] }.
function detect(overrides = {}) {
    const violations = [];
    const facts = {};
    function assert(label, ok) {
        facts[label] = Boolean(ok);
        if (!ok) violations.push(label);
    }

    // ── P1/P2 — the lab OWNS the "ONE dock + TABS facility" (V+H breadth). ──
    const liquid = overrides.liquidText ?? read(LIQUID);
    const hasDock = /<GlassDock\b/.test(liquid);
    const hasStack = /<DockStack\b/.test(liquid);
    const hasFacets = /mode\s*=\s*"facets"/.test(liquid);
    facts.liquid = { hasDock, hasStack, hasFacets };
    assert(
        "P1 — liquid-playground OWNS the ONE dock + TABS facility (GlassDock + DockStack + facets)",
        hasDock && hasStack && hasFacets,
    );
    const hasH = /orientation\s*=\s*"horizontal"/.test(liquid);
    const hasV = /orientation\s*=\s*"vertical"/.test(liquid);
    facts.liquidOrientations = { hasH, hasV };
    assert(
        "P2 — the lab dock is shown in BOTH orientations (horizontal + vertical)",
        hasH && hasV,
    );

    // ── P3 — dock-gallery is the pure BREADTH gallery (ZERO <GlassDock). ──
    const gallery = overrides.galleryText ?? read(GALLERY);
    const galleryDockCount = (gallery.match(/<GlassDock\b/g) || []).length;
    facts.galleryDockCount = galleryDockCount;
    assert(
        "P3 — dock-gallery is the BREADTH gallery (zero <GlassDock> — the dock+tabs facility lives ONLY in the lab)",
        galleryDockCount === 0,
    );

    // ── C1 — no hardcoded real names in the gallery's rendered CONTENT. ──
    // galleryContentOnly REPLACES the real corpus (isolated synthetic bite);
    // contentAppend ADDS a synthetic file to the live corpus (live-tree-plus-sabotage).
    let contentParts;
    if (overrides.galleryContentOnly) {
        contentParts = [
            { path: "demo/stories/dock/__synthetic__.vue", strings: renderedContent(overrides.galleryContentOnly) },
        ];
    } else {
        const files = [GALLERY, ...allDockVue(EXAMPLES_DIR)];
        contentParts = files.map((p) => ({
            path: p.slice(ROOT.length + 1),
            strings: renderedContent(read(p)),
        }));
        if (overrides.contentAppend) {
            contentParts.push({
                path: "demo/stories/dock/__synthetic__.vue",
                strings: renderedContent(overrides.contentAppend),
            });
        }
    }
    const c1Hits = [];
    for (const part of contentParts)
        for (const h of denylistHits(part.strings))
            c1Hits.push({ path: part.path, ...h });
    facts.realNameHits = c1Hits;
    assert(
        "C1 — no hardcoded real brand/song/artist names in the gallery's rendered content",
        c1Hits.length === 0,
    );

    // ── I1 — the modularize import-safety (every local import resolves). ──
    let importParts;
    if (overrides.importInject) {
        importParts = overrides.importInject.map((f) => ({ path: f.path, src: f.src }));
    } else {
        importParts = allDockVue().map((p) => ({ path: p, src: read(p) }));
        if (overrides.importInjectAppend)
            for (const f of overrides.importInjectAppend) importParts.push(f);
    }
    const brokenImports = [];
    for (const part of importParts) {
        for (const spec of localImportsOf(part.src)) {
            if (localImportResolves(part.path, spec) === false)
                brokenImports.push({ path: String(part.path).replace(ROOT + "/", ""), spec });
        }
    }
    facts.brokenImports = brokenImports;
    assert(
        "I1 — every local dock-story import resolves on disk (the modularize import-safety)",
        brokenImports.length === 0,
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
                `[proof:dock-story-modularize self-test] the bite FAILED to flag: ${name}`,
            );
    };
    const sabNot = (overrides, labels, name) => {
        const { violations } = detect(overrides);
        if (!labels.some((l) => violations.includes(l))) flagged++;
        else
            throw new Error(
                `[proof:dock-story-modularize self-test] the fence bite WRONGLY flagged: ${name}`,
            );
    };

    const P1 = "P1 — liquid-playground OWNS the ONE dock + TABS facility (GlassDock + DockStack + facets)";
    const P2 = "P2 — the lab dock is shown in BOTH orientations (horizontal + vertical)";
    const P3 = "P3 — dock-gallery is the BREADTH gallery (zero <GlassDock> — the dock+tabs facility lives ONLY in the lab)";
    const C1 = "C1 — no hardcoded real brand/song/artist names in the gallery's rendered content";
    const I1 = "I1 — every local dock-story import resolves on disk (the modularize import-safety)";

    // P1: a lab stripped of the facet facility (a bare dock, no <DockStack mode>).
    sab(
        { liquidText: `<template><GlassDock orientation="horizontal"><div/></GlassDock></template>` },
        [P1],
        "P1 lab stripped of the facets facility",
    );
    // P2: a lab with only one orientation.
    sab(
        { liquidText: `<template><GlassDock orientation="horizontal"><DockStack mode="facets"/></GlassDock></template>` },
        [P2],
        "P2 lab missing the vertical orientation",
    );
    // P3: a <GlassDock> smuggled into the breadth gallery.
    sab(
        { galleryText: `<template><StoryPage><GlassDock><div/></GlassDock></StoryPage></template>` },
        [P3],
        "P3 dock smuggled into the gallery",
    );
    // C1: a real brand + artist name in a rendered content node.
    sab(
        { galleryContentOnly: `<template><span class="row">Spotify — Taylor Swift</span></template>` },
        [C1],
        "C1 real name in a content text node",
    );
    // C1 (fence): a real name in a `label=` ATTRIBUTE (a breadth caption) does NOT red
    // — the scan targets text nodes + `key:` data values, never `key=` attributes.
    sabNot(
        { galleryContentOnly: `<template><DockExampleTile label="Spotify" hint="Netflix demo"><span>Track One</span></DockExampleTile></template>` },
        [C1],
        "C1 attribute-caption fence (breadth captions not scanned)",
    );
    // C1 (fence): a real name in a COMMENT does NOT red (comment-strip conservatism).
    sabNot(
        { galleryContentOnly: `<template><!-- the Spotify / Taylor Swift reference --><span>New message</span></template>` },
        [C1],
        "C1 comment-strip fence",
    );
    // I1: a broken local import.
    sab(
        { importInject: [{ path: resolve(DOCK_DIR, "__synthetic__.vue"), src: `import X from "./does-not-exist.vue";` }] },
        [I1],
        "I1 broken local import",
    );

    return flagged;
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_DOCK_STORY_MODULARIZE_ARTIFACT",
        "BG-dock-story-modularize",
    );

    const selfTestCount = selfTest();
    const { facts, violations } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:dock-story-modularize",
        command: COMMAND,
        selfTestChecks: selfTestCount,
        facts,
        violations,
    });

    console.log("proof:dock-story-modularize — the A10-SPLIT protection: lab OWNS the dock+tabs facility, gallery is BREADTH");
    console.log(`  P1 lab owns dock+tabs facility : ${facts["P1 — liquid-playground OWNS the ONE dock + TABS facility (GlassDock + DockStack + facets)"]}`);
    console.log(`  P2 lab V+H breadth            : ${facts["P2 — the lab dock is shown in BOTH orientations (horizontal + vertical)"]}`);
    console.log(`  P3 gallery is breadth (0 dock): ${facts["P3 — dock-gallery is the BREADTH gallery (zero <GlassDock> — the dock+tabs facility lives ONLY in the lab)"]} (dockCount=${facts.galleryDockCount})`);
    console.log(`  C1 no real names in content   : ${facts["C1 — no hardcoded real brand/song/artist names in the gallery's rendered content"]}`);
    console.log(`  I1 imports resolve            : ${facts["I1 — every local dock-story import resolves on disk (the modularize import-safety)"]}`);
    console.log(`  self-test (bite proof)        : OK — ${selfTestCount} synthetic sabotages handled (P1/P2/P3/C1 + 2 fences + I1)`);

    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
        if (facts.realNameHits?.length)
            for (const h of facts.realNameHits)
                console.log(`  real-name hit: ${h.path} [${h.name}] "${h.text}"`);
        if (facts.brokenImports?.length)
            for (const b of facts.brokenImports)
                console.log(`  broken import: ${b.path} -> ${b.spec}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);

    if (SELF_TEST)
        console.log(`\n[proof:dock-story-modularize --self-test] ${selfTestCount} bite(s) handled; tree ${status === "pass" ? "GREEN" : "RED"}`);

    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

export { detect, selfTest };
