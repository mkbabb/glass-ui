#!/usr/bin/env node
// proof:dock-persistent-cut — the persistent ℱ brand + Fourier-egg cut gate
// (BG.W-DOCK-PERSISTENT-CUT, D8 / C-PERSIST; the lone structural-only defect close).
//
// The persistent ℱ brand wordmark + its long-press Fourier-redraw egg sat atop the
// SidebarDock (#persistent slot) since AZ. The iOS-26 HIG ("glass is the floating
// NAVIGATION layer, never content") condemns the brand vanity; the content-first tab
// bar avoids it. This wave removes the wordmark + the egg dead-chain and rejoins
// Foundations as a normal category chip. The cut is ONE coordinated diff — a
// half-edit silently kills Foundations nav (delete the slot only) OR leaves a
// zero-consumer dead leaf (delete the wordmark, keep FRedrawOverlay/useLongPress).
//
// Pure FS, device-free (paint-class H). Born-RED on HEAD (the ℱ slot + egg + the
// foundations-filter present, the egg leaves on disk, the AppShell mount live) →
// GREEN on the coordinated cut. The self-test bites are the anti-vacuity proof —
// each synthetic sabotage reproduces a HEAD-state fragment and REDs its clause.
//
// Asserts:
//   P1 — SIDEBAR-ℱ-EGG-ABSENT: comment-stripped SidebarDock.vue carries ZERO of the
//        egg tokens (useLongPress · fireRedraw · wordmarkPress · redrawFired ·
//        the `#persistent` slot · the ℱ glyph U+2131 · the `glass-ui-demo:f-redraw`
//        dispatch). A provenance COMMENT that names ℱ/f-redraw does NOT flag (the
//        comment-strip fence).
//   P2 — FOUNDATIONS-REJOINS: the `c.id !== "foundations"` filter clause is GONE
//        (comment-stripped) AND the `!c.reference` category filter survives — so
//        Foundations is a normal roving-tablist chip (one tab-stop, no duplicate).
//   P3 — BOTTOM-PERSISTENT-KEPT: BottomDock.vue's `#persistent` PanelLeft
//        category-Sheet trigger SURVIVES (the load-bearing mobile nav — "atop BOTH
//        docks" is imprecise; BottomDock has no ℱ, do NOT delete its slot).
//   P4 — EGG-CHAIN-DELETED: demo/eggs/useLongPress.ts AND demo/eggs/FRedrawOverlay.vue
//        are DEFINITION-ABSENT (the now-zero-consumer leaves).
//   P5 — APPSHELL-REFS-GONE: comment-stripped AppShell.vue carries ZERO of the
//        FRedrawOverlay references (the import/mount + onFRedraw/showFRedraw + the
//        `glass-ui-demo:f-redraw` listener) — else a deleted-file import breaks build.
//   P6 — FGLYPH-KEPT: demo/eggs/fGlyphPoints.ts SURVIVES (shared with the substrates
//        band — fourier-paths.ts; a co-deletion would break the substrates viz).
//
// Self-test bites (born-RED demonstration): a synthetic sidebar with a `useLongPress`
// import REDs P1; a `<template #persistent>` ℱ slot REDs P1; a bare comment mentioning
// ℱ does NOT flag P1 (the strip fence); a `c.id !== "foundations"` filter REDs P2; a
// BottomDock without `#persistent`/`PanelLeft` REDs P3; a surviving egg leaf REDs P4;
// an AppShell `FRedrawOverlay` import REDs P5; a missing fGlyphPoints.ts REDs P6.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:dock-persistent-cut";
const SELF_TEST = process.argv.includes("--self-test");

const SIDEBAR = resolve(ROOT, "demo/layout/SidebarDock.vue");
const BOTTOM = resolve(ROOT, "demo/layout/BottomDock.vue");
const APPSHELL = resolve(ROOT, "demo/layout/AppShell.vue");
const USE_LONG_PRESS = resolve(ROOT, "demo/eggs/useLongPress.ts");
const FREDRAW_OVERLAY = resolve(ROOT, "demo/eggs/FRedrawOverlay.vue");
const FGLYPH = resolve(ROOT, "demo/eggs/fGlyphPoints.ts");

// The ℱ glyph (SCRIPT CAPITAL F, U+2131) — the wordmark's ink; the HEAD source
// carried it as the `&#x2131;` HTML entity inside the deleted <span>.
const SCRIPT_F = "ℱ";
const F_ENTITY = "&#x2131;";

function read(p) {
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// Strip /* block */ + // line + <!-- vue --> comments so a provenance comment that
// NAMES the retired egg (ℱ, f-redraw, #persistent) is never a false RED — a token
// named in a comment is history, never a live wire. The // strip is URL-safe (the
// `(^|[^:])//` house idiom) so a `://` in a string literal survives.
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/(^|[^:])\/\/[^\n]*/gm, "$1");
}

// The egg-token set — a live wire of ANY of these in the comment-stripped SidebarDock
// is a surviving ℱ-egg / persistent slot.
const SIDEBAR_EGG_TOKENS = [
    "useLongPress",
    "fireRedraw",
    "wordmarkPress",
    "redrawFired",
    "#persistent",
    "glass-ui-demo:f-redraw",
    SCRIPT_F,
    F_ENTITY,
];

// overrides: { sidebarSrc?, bottomSrc?, appShellSrc?, useLongPressExists?,
//              fRedrawExists?, fGlyphExists? }.
function detect(overrides = {}) {
    const violations = [];
    const facts = {};
    function assert(label, ok) {
        facts[label] = Boolean(ok);
        if (!ok) violations.push(label);
    }

    const sidebar = stripComments(overrides.sidebarSrc ?? read(SIDEBAR));
    const bottom = stripComments(overrides.bottomSrc ?? read(BOTTOM));
    const appShell = stripComments(overrides.appShellSrc ?? read(APPSHELL));
    const useLongPressExists =
        overrides.useLongPressExists ?? existsSync(USE_LONG_PRESS);
    const fRedrawExists = overrides.fRedrawExists ?? existsSync(FREDRAW_OVERLAY);
    const fGlyphExists = overrides.fGlyphExists ?? existsSync(FGLYPH);

    // ── P1 — SIDEBAR-ℱ-EGG-ABSENT ──
    const survivingEggTokens = SIDEBAR_EGG_TOKENS.filter((t) =>
        sidebar.includes(t),
    );
    facts.survivingSidebarEggTokens = survivingEggTokens;
    assert(
        "P1 — SidebarDock.vue carries ZERO ℱ-egg tokens (no useLongPress/fireRedraw/#persistent slot/ℱ glyph/f-redraw dispatch)",
        survivingEggTokens.length === 0,
    );

    // ── P2 — FOUNDATIONS-REJOINS ──
    const foundationsFilterPresent = /!==\s*["']foundations["']/.test(sidebar);
    const referenceFilterPresent = /!c\.reference/.test(sidebar);
    facts.foundationsFilterPresent = foundationsFilterPresent;
    facts.referenceFilterPresent = referenceFilterPresent;
    assert(
        "P2 — the `c.id !== \"foundations\"` filter is GONE AND the `!c.reference` category filter survives (Foundations rejoins the roving tablist)",
        !foundationsFilterPresent && referenceFilterPresent,
    );

    // ── P3 — BOTTOM-PERSISTENT-KEPT ──
    const bottomPersistentKept =
        bottom.includes("#persistent") && bottom.includes("PanelLeft");
    facts.bottomPersistentKept = bottomPersistentKept;
    assert(
        "P3 — BottomDock.vue's `#persistent` PanelLeft category-Sheet trigger SURVIVES (the load-bearing mobile nav is not deleted)",
        bottomPersistentKept,
    );

    // ── P4 — EGG-CHAIN-DELETED ──
    facts.useLongPressExists = useLongPressExists;
    facts.fRedrawExists = fRedrawExists;
    assert(
        "P4 — demo/eggs/useLongPress.ts AND demo/eggs/FRedrawOverlay.vue are DEFINITION-ABSENT (the zero-consumer egg leaves deleted)",
        !useLongPressExists && !fRedrawExists,
    );

    // ── P5 — APPSHELL-REFS-GONE ──
    const survivingAppShellRefs = [
        "FRedrawOverlay",
        "glass-ui-demo:f-redraw",
        "onFRedraw",
        "showFRedraw",
    ].filter((t) => appShell.includes(t));
    facts.survivingAppShellRefs = survivingAppShellRefs;
    assert(
        "P5 — AppShell.vue carries ZERO FRedrawOverlay references (import/mount + onFRedraw/showFRedraw + the f-redraw listener gone)",
        survivingAppShellRefs.length === 0,
    );

    // ── P6 — FGLYPH-KEPT ──
    facts.fGlyphExists = fGlyphExists;
    assert(
        "P6 — demo/eggs/fGlyphPoints.ts SURVIVES (shared with the substrates band's fourier-paths.ts — a co-deletion is forbidden)",
        fGlyphExists,
    );

    return { facts, violations };
}

// ── The self-test bites (anti-vacuity / born-RED demonstration). ──
function selfTest() {
    let flagged = 0;
    const sab = (overrides, labelFrag, name) => {
        const { violations } = detect(overrides);
        if (violations.some((v) => v.startsWith(labelFrag))) flagged++;
        else
            throw new Error(
                `[proof:dock-persistent-cut self-test] the bite FAILED to flag: ${name}`,
            );
    };
    const sabNot = (overrides, labelFrag, name) => {
        const { violations } = detect(overrides);
        if (!violations.some((v) => v.startsWith(labelFrag))) flagged++;
        else
            throw new Error(
                `[proof:dock-persistent-cut self-test] the fence bite WRONGLY flagged: ${name}`,
            );
    };

    // A clean synthetic baseline for each SFC, so a single planted fragment is the
    // sole cause of the RED (never a live-tree confound).
    const CLEAN_SIDEBAR = `<script setup lang="ts">
const primaryCategories = computed(() => CATEGORIES.filter((c) => !c.reference));
</script>
<template><GlassDock><DockSection :sections="sections" /></GlassDock></template>`;
    const CLEAN_BOTTOM = `<template><GlassDock>
<template #persistent><PanelLeft /></template>
<DockSection :sections="sections" /></GlassDock></template>`;
    const CLEAN_APPSHELL = `<script setup lang="ts">
const showKonami = ref(false);
</script>
<template><CommandPalette /></template>`;
    const cleanFiles = {
        useLongPressExists: false,
        fRedrawExists: false,
        fGlyphExists: true,
    };
    const base = {
        sidebarSrc: CLEAN_SIDEBAR,
        bottomSrc: CLEAN_BOTTOM,
        appShellSrc: CLEAN_APPSHELL,
        ...cleanFiles,
    };

    // Sanity: the clean baseline is fully GREEN (no confound).
    if (detect(base).violations.length !== 0)
        throw new Error(
            "[proof:dock-persistent-cut self-test] the clean synthetic baseline is not GREEN",
        );

    // P1: a re-added useLongPress import.
    sab(
        {
            ...base,
            sidebarSrc:
                `import { useLongPress } from "../eggs/useLongPress";\n` +
                CLEAN_SIDEBAR,
        },
        "P1",
        "P1 a useLongPress import survives",
    );
    // P1: a re-added #persistent ℱ wordmark slot.
    sab(
        {
            ...base,
            sidebarSrc:
                CLEAN_SIDEBAR +
                `\n<template #persistent><span>${F_ENTITY}</span></template>`,
        },
        "P1",
        "P1 the #persistent ℱ slot survives",
    );
    // P1 (fence): a bare COMMENT mentioning ℱ/f-redraw does NOT flag (comment-strip).
    sabNot(
        {
            ...base,
            sidebarSrc:
                `// BG.W-DOCK-PERSISTENT-CUT — the ${SCRIPT_F} wordmark + glass-ui-demo:f-redraw egg are GONE\n` +
                `<!-- the #persistent ${SCRIPT_F} brand is removed -->\n` +
                CLEAN_SIDEBAR,
        },
        "P1",
        "P1 the comment-mention fence (a provenance note is not a live wire)",
    );
    // P2: the foundations-filter re-added.
    sab(
        {
            ...base,
            sidebarSrc: `const primaryCategories = computed(() => CATEGORIES.filter((c) => !c.reference && c.id !== "foundations"));`,
        },
        "P2",
        "P2 the c.id !== 'foundations' filter survives",
    );
    // P3: BottomDock loses its #persistent PanelLeft trigger.
    sab(
        { ...base, bottomSrc: `<template><GlassDock></GlassDock></template>` },
        "P3",
        "P3 the BottomDock #persistent PanelLeft is deleted",
    );
    // P4: a surviving egg leaf on disk.
    sab(
        { ...base, useLongPressExists: true },
        "P4",
        "P4 useLongPress.ts survives on disk",
    );
    sab(
        { ...base, fRedrawExists: true },
        "P4",
        "P4 FRedrawOverlay.vue survives on disk",
    );
    // P5: AppShell keeps the FRedrawOverlay import.
    sab(
        {
            ...base,
            appShellSrc:
                `import FRedrawOverlay from "../eggs/FRedrawOverlay.vue";\n` +
                CLEAN_APPSHELL,
        },
        "P5",
        "P5 the AppShell FRedrawOverlay import survives",
    );
    // P6: fGlyphPoints.ts co-deleted (the forbidden over-cut).
    sab(
        { ...base, fGlyphExists: false },
        "P6",
        "P6 fGlyphPoints.ts is co-deleted",
    );

    return flagged;
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_DOCK_PERSISTENT_CUT_ARTIFACT",
        "BG-dock-persistent-cut",
    );

    const selfTestCount = selfTest();
    const { facts, violations } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:dock-persistent-cut",
        command: COMMAND,
        selfTestChecks: selfTestCount,
        facts,
        violations,
    });

    console.log(
        "proof:dock-persistent-cut — the persistent ℱ brand + Fourier egg removed atop the docks (D8; Foundations rejoins the nav loop)",
    );
    console.log(
        `  P1 sidebar ℱ-egg absent        : ${violations.every((v) => !v.startsWith("P1"))} (surviving=${JSON.stringify(facts.survivingSidebarEggTokens)})`,
    );
    console.log(
        `  P2 foundations rejoins          : ${violations.every((v) => !v.startsWith("P2"))} (filter=${facts.foundationsFilterPresent}, !reference=${facts.referenceFilterPresent})`,
    );
    console.log(
        `  P3 bottom #persistent kept      : ${facts.bottomPersistentKept}`,
    );
    console.log(
        `  P4 egg chain deleted            : ${!facts.useLongPressExists && !facts.fRedrawExists} (useLongPress=${facts.useLongPressExists}, FRedrawOverlay=${facts.fRedrawExists})`,
    );
    console.log(
        `  P5 appShell refs gone           : ${violations.every((v) => !v.startsWith("P5"))} (surviving=${JSON.stringify(facts.survivingAppShellRefs)})`,
    );
    console.log(`  P6 fGlyphPoints kept            : ${facts.fGlyphExists}`);
    console.log(
        `  self-test (bite proof)          : OK — ${selfTestCount} synthetic sabotages handled (P1×2 + P1-fence + P2 + P3 + P4×2 + P5 + P6)`,
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
            `\n[proof:dock-persistent-cut --self-test] ${selfTestCount} bite(s) handled; tree ${status === "pass" ? "GREEN" : "RED"}`,
        );

    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

export { detect, selfTest };
