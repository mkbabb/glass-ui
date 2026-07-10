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
//   D5 — the deletes are CONSUMED (BH.B3 δ1 — the CodeBlock→Code-fold-consume /
//        demo-restructure verify wave): no surviving demo file references a retired
//        chassis's DELETED CSS file BY NAME. A deleted stylesheet resolves to NOTHING
//        — a live `@import` is D3's dangle, a PROSE pointer (`demo-frame.css §5` in a
//        comment describing deleted machinery as live) is dead documentation that
//        misleads the B3 restructure. DISTINCT from D3 (which strips comments so a
//        retired component NAME is honest provenance): D5 scans the RAW corpus and
//        targets the deleted FILE (a file cannot be honest provenance). The retired-
//        CSS set derives from the ledger (DRY). (born-RED: HEAD's StoryPage.vue prose
//        references the deleted `demo-frame.css §5` mount-stagger.)
//   D6 — the CodeBlock→Code fold is CONSUMED single-source ("consume, do NOT re-fold"
//        — the δ1 bar): the ONE demo code register is EXACTLY {Code.vue, CodeBlock.vue}
//        (BC.W-CODE-BLOCKS — the inline + multi-line rungs), both present, NO third
//        `Code*.vue` fork. A downstream restructure re-minting a third code chassis
//        REDs (the no-dual-path discipline on the demo code register).
//   D7 — the adopted VizStudio chassis is UNIFIED-HEADER single-source (no double-
//        header). VizStudio WRAPS StoryPage, which renders the ONE StoryHeader
//        identity cluster (eyebrow → subpath → the audacious display <h1> → blurb,
//        rendered ONCE). So the chassis MUST NOT expose a `#masthead` slot seam that
//        lets a viz restate the page identity at DISPLAY scale beside it — the exact
//        double-header the paint judge FAILED (aurora painted "Aurora" [StoryHeader
//        display <h1>] AND "Aurora Studio" [an inline #masthead <header> at
//        text-display-3], two competing display titles). Two arms: (a) VizStudio.vue
//        declares NO `<slot name="masthead">` (the seam removed at the chassis root);
//        (b) no demo .vue fills a `<template #masthead>` (no consumer double-authors a
//        masthead identity header). Comment-STRIPPED (a `masthead` mention in prose /
//        a viz's own hand-voice label is provenance, never a live seam). (born-RED:
//        HEAD's VizStudio.vue declares the slot AND aurora.vue fills it.)
//
//   T1 — SplitChars carries `stagger?: boolean` and DROPS the mount-bound
//        `.char-stagger` recipe when false (the "no mount-fire-before-reveal"
//        mechanism — the IO-gated reveal must own the entrance). (born-RED: HEAD's
//        SplitChars applies `.char-stagger` unconditionally, no `stagger` prop.)
//   T2 — `--char-stagger-step` is minted ONCE (scheme-motion.css) and the
//        `.char-stagger` recipe reads `var(--char-stagger-step)` — the hardcoded
//        `* 30ms` per-glyph literal is GONE (DRY single-source). (born-RED: no
//        token, the `* 30ms` literal live.)
//   T3 — the demo-private `useSectionReveal` exists with the FOUR sweep hooks
//        (scroll · scrollend · route-settle rAF · bounded mount re-sweep), the
//        SYNCHRONOUS `data-reveal-armed` FOUC arm + the no-IO `data-revealed`
//        VISIBLE floor, and the `SECTION_REVEAL_KEY` provide seam. (born-RED: the
//        file is DEFINITION-ABSENT on HEAD.)
//   T4 — StorySection composes the two disjoint sibling registers (the
//        `story-section__heading` `<SplitChars :stagger=false>` heading × the
//        `.story-section__body scroll-cascade` body, injecting the register), the
//        demo `gl-char-rise` reveal CSS is present (keyframe + FOUC floor +
//        `--char-stagger-step` reveal + PRM arm), AND StoryPage provides the ONE
//        observer while its page-level `.story-sections` no longer carries
//        `.scroll-cascade` (the no-double-bind). (born-RED: none of it on HEAD.)
//
//   F1 — the Timeline×3 dup collapses to ONE `data/timeline.vue` (BG.W-DEMO-DUP-MERGE
//        / F7.3): the `timeline-segmented.vue` + `timeline-continuous.vue` member
//        WRAPPERS are DEFINITION-ABSENT, their render bodies moved into colocated
//        PascalCase body sub-components (`Timeline{Segmented,Continuous}Body.vue`) that
//        EXIST, and the family page composes each as a stacked `<StorySection>` register
//        (≥3, comment-stripped so a provenance mention never fakes a tag). (born-RED:
//        the member wrappers exist on HEAD.)
//   F2 — the Scroll×3 dup collapses to ONE `motion/scroll.vue` the same way (the
//        `scroll-vt`/`scroll-system`/`scroll-choreography` wrappers DEFINITION-ABSENT,
//        the `Scroll{Native,Reader,Choreography}Body.vue` bodies EXIST, 3 stacked
//        `<StorySection>` registers, AND the F7.1-interim `<FamilyTabs>` switcher GONE
//        from the family page). (born-RED: the member wrappers exist on HEAD.)
//   F3 — the aurora studio-helper dir nests under `substrates/aurora/` (off the
//        `./*/*.vue` route glob): `demo/stories/aurora/` DEFINITION-ABSENT,
//        `demo/stories/substrates/aurora/` PRESENT. (born-RED: aurora/ sits at the top
//        level on HEAD.)
//
// Self-test bites: a synthetic retired file that still "exists" REDs D1; a synthetic
// live `<DemoFrame>` tag REDs D3; a synthetic adopted file with zero importers REDs
// D2; a synthetic decision with an empty rationale REDs D4; a jargon-in-a-comment
// mention of a retired name does NOT red D3 (the comment-strip distinguishing bite);
// a dead-doc `demo-frame.css §5` pointer REDs D5 (the deleted-FILE reference, RAW-
// scanned — distinct from the D3 name-in-comment provenance); a synthetic third code
// fork REDs D6 and a rung-missing register REDs D6 (the "consume, do NOT re-fold"
// bar); a synthetic VizStudio `<slot name="masthead">` REDs D7 (the seam-at-the-root
// arm) and a synthetic consumer `<template #masthead>` REDs D7 (the double-authored
// masthead arm), while a `masthead` mention in prose does NOT red D7 (the comment-
// strip distinguishing bite); + one bite per T-clause that recreates the HEAD state (the born-RED proof):
// the unconditional-`.char-stagger` SplitChars REDs T1, the `* 30ms` literal REDs T2,
// the absent `useSectionReveal` REDs T3, the heading-register-less StorySection REDs T4;
// a surviving `timeline-segmented.vue` wrapper REDs F1, a surviving `scroll-vt.vue`
// wrapper REDs F2 AND a re-introduced `<FamilyTabs>` on the merged scroll page REDs F2
// (the no-indirection arm), a top-level `demo/stories/aurora/` helper dir REDs F3.
//
//   ST1 — the CLOSED five-KIND demo sub-type vocabulary EXISTS (BG.W-STORY-PAGE-API
//         §4-D): the five sub-type SFCs (Demo{Stage,Specimen,Interaction,Matrix,
//         Composition}.vue) are DEFINITION-PRESENT in demo/chassis/ AND the barrel
//         exports each name. (born-RED: demo/chassis/ is DEFINITION-ABSENT on HEAD.)
//   ST2 — each sub-type is a REAL slot-bearing composition (a `<slot`), so content
//         is NOT dropped — the C1·R1 slot-drop refutation (a `(p)=>h(DemoFrame,
//         {...p})`-style variant-shim that renders EMPTY, the silent-no-op class).
//   ST3 — each sub-type declares the CONFORMITY invariant: it composes a glass tier
//         (a `glass-<rung>` class) OR the glassy `<DemoSpecimen>` base — the "one
//         product" glassy-card uniformity (a bare `bg-card` slab off the ladder REDs).
//   ST4 — each sub-type is ADOPTED, not shelf-ware: ≥1 LIVE importer/usage in the
//         demo corpus — the anti-DemoFrame floor (the zero-importer substrate D1
//         retired; a minted-but-never-used taxonomy is the flattened-out defect).
//   ST5 — the vocabulary is CLOSED (anti-drift): the on-disk `demo/chassis/Demo*.vue`
//         set is EXACTLY the five (no 6th sub-type smuggled in, no member missing).
//
// ST self-test bites: a missing sub-type REDs ST1; a slotless variant-shim REDs ST2;
// a bare `bg-card` slab (no glass tier / no DemoSpecimen) REDs ST3; a zero-importer
// sub-type REDs ST4 (the DemoFrame shelf-ware trap); a synthetic 6th `DemoFoo.vue`
// smuggled into the closed set REDs ST5 (the anti-gameability arm).

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

// ── The section-entrance congruence clauses (BG.W-SECTION-TYPEWRITER-FADEUP). ──
// The `getAnimations()`-per-node congruence π (heading per-glyph reveal × body
// cascade firing CONGRUENTLY) is the browser-side paint verdict; these T-clauses
// are the device-free STRUCTURAL floor that proves the mechanism is WIRED on disk
// so the π has something real to read. Born-RED on HEAD (none of it exists).
const SEC = {
    splitChars: "src/components/custom/split-chars/SplitChars.vue",
    schemeMotion: "src/styles/tokens/scheme-motion.css",
    typoUtil: "src/styles/typography/utilities.css",
    reveal: "demo/chassis/section/useSectionReveal.ts",
    storySection: "demo/chassis/section/StorySection.vue",
    storyHeroCss: "demo/chassis/hero/story-hero.css",
    storyPage: "demo/chassis/page/StoryPage.vue",
};

// ── The demo-IA-redesign clauses (BG.W-DEMO-IA-REDESIGN — E1-E3). ────────────────
// The demo was a 120-page spec-sheet inventory with 8 component subpaths split across
// ≥2 near-duplicate pages. This wave collapses each redundant set onto ONE family
// page (composed via <FamilyTabs>, member SFCs un-routed via FOLDED_STORY_IDS), so
// the routed set shrinks to the ~94 designed pages. E1 is the machine floor: no
// subpath is shared by >1 ROUTED page unless it is a DECLARED family. E2 keeps the
// DockStage staged field WARM (not cerulean). E3 keeps the StoryPage scroll read a
// SHRINK, never a fade.
const IA = {
    manifest: "demo/stories/manifest.ts",
    dockStage: "demo/stories/dock/DockStage.vue",
    heroCss: "demo/chassis/hero/story-hero.css",
};

// ── The demo SUB-TYPE taxonomy (BG.W-STORY-PAGE-API — the §4-D restore). ──────────
// The storybook demo pages were bespoke spec-sheets — N locally-plausible scaffolds
// with NO shared demo-KIND vocabulary (the gestalt-cohesion root, audit A2/GA-5).
// This wave restores the CLOSED five-KIND vocabulary flattened out of the earlier
// W-STORY-PAGE-API: each KIND is a THIN composition over the StoryPage chassis that
// GUARANTEES the conformity invariants (a glassy sub-card · a header/rule · the warm
// field) while the CONTENT varies — "N spec-sheets → one product with natural
// variation." Born-RED on HEAD (demo/chassis/ is DEFINITION-ABSENT).
const SUBTYPES = {
    dir: "demo/chassis",
    barrel: "demo/chassis/index.ts",
    members: [
        { name: "DemoStage", file: "demo/chassis/DemoStage.vue", kind: "stage" },
        {
            name: "DemoSpecimen",
            file: "demo/chassis/DemoSpecimen.vue",
            kind: "specimen",
        },
        {
            name: "DemoInteraction",
            file: "demo/chassis/DemoInteraction.vue",
            kind: "interaction",
        },
        { name: "DemoMatrix", file: "demo/chassis/DemoMatrix.vue", kind: "matrix" },
        {
            name: "DemoComposition",
            file: "demo/chassis/DemoComposition.vue",
            kind: "composition",
        },
    ],
};

// Parse every s("cat","id") routed-row candidate from the manifest source.
function parseStoryRows(src) {
    const out = [];
    const re = /\bs\(\s*"([\w-]+)"\s*,\s*"([\w-]+)"/g;
    let m;
    while ((m = re.exec(src))) out.push(`${m[1]}/${m[2]}`);
    return out;
}

// Parse a `new Set<string>([ "a", "b", … ])` literal named `name` → its members.
// Returns an EMPTY set when the const is absent (the HEAD state — no FOLDED yet).
function parseSetLiteral(src, name) {
    const i = src.indexOf(name);
    if (i < 0) return new Set();
    const open = src.indexOf("([", i);
    if (open < 0) return new Set();
    const close = src.indexOf("])", open);
    if (close < 0) return new Set();
    return new Set(
        [...src.slice(open + 2, close).matchAll(/"([^"]+)"/g)].map((x) => x[1]),
    );
}

// Parse the SUBPATHS `"cat/id": "<subpath>"` map from the manifest source.
function parseSubpaths(src) {
    const out = {};
    const i = src.indexOf("const SUBPATHS");
    if (i < 0) return out;
    const open = src.indexOf("{", i);
    let depth = 0,
        end = -1;
    for (let j = open; j < src.length; j++) {
        if (src[j] === "{") depth++;
        else if (src[j] === "}") {
            depth--;
            if (depth === 0) {
                end = j;
                break;
            }
        }
    }
    for (const m of src
        .slice(open + 1, end)
        .matchAll(/"([\w-]+\/[\w-]+)"\s*:\s*"([^"]+)"/g))
        out[m[1]] = m[2];
    return out;
}

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
        files: ["demo/chassis/hero/StoryHeader.vue"],
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

// ── The B3-d2 composables-dissolve moves (BH.F7 δ2-dock-layers-shell). ───────────
// `demo/composables/` was a two-file catch-all off the colocation grain — a
// navigation composable that belongs BESIDE the storybook chassis it drives, and
// a route→layer resolver that belongs BESIDE its shell consumer. This wave
// DISSOLVES the dir: useStoryNavigation → demo/chassis/, useContextualDockLayers →
// demo/shell/ (beside useShellNavDock.ts, its sole consumer). Each `from`/`to` is
// the on-disk artefact the move governs (from → absent; to → present). The CD
// clauses assert the dissolve is realized + clean (born-RED on HEAD, where both
// files live under demo/composables/).
const COMPOSABLE_MOVES = {
    dissolvedDir: "demo/composables",
    moves: [
        {
            name: "useStoryNavigation",
            from: "demo/composables/useStoryNavigation.ts",
            to: "demo/chassis/useStoryNavigation.ts",
        },
        {
            name: "useContextualDockLayers",
            from: "demo/composables/useContextualDockLayers.ts",
            to: "demo/shell/useContextualDockLayers.ts",
        },
    ],
};

// ── The B3-δ34 chassis-colocation move (BH.B3 δ3/δ4). ────────────────────────────
// The flat `demo/stories/` ROOT chassis kit + the `demo/layout/` app frame + the
// `demo/presets/` configurator preset-data carried NO colocation grain — the
// story-kit primitives, the app shell, and the preset data all sat at flat roots
// off their consumers (the exact defect the colocation edict names). This wave
// RE-HOMES each into a colocated dir: the story-kit chassis →
// `demo/chassis/<group>/` (page · hero · section · landing · showcase · code ·
// play · family), the app frame `layout/` → `shell/` (beside the shell composables
// δ2 landed), and the configurator preset-data `presets/` → `configurator/presets/`
// (its ONLY consumers are the configurator preset-editor). Each `to` is
// DEFINITION-PRESENT after the move and each `from` DEFINITION-ABSENT (a clean move,
// never a copy that leaves a dual-path husk behind), and the dissolved flat-root
// dirs (`layout/` · `presets/`) are EXTIRPATED. Born-RED on HEAD (every `to`
// absent, every `from` present, both dirs live). The CL clauses assert the move is
// realized + clean + extirpated.
const COLOCATION = {
    // the dissolved flat-root dirs — no empty husk may survive (the extirpation edict)
    dissolvedDirs: ["demo/layout", "demo/presets"],
    // the ONLY flat file allowed to remain directly under demo/stories/ (the route
    // manifest — its per-category carve + the ./*/*.vue glob is the δ5/δ6 wave, not
    // this one). Any OTHER flat chassis .vue/.css at the stories root is a re-drift.
    storiesRootAllowed: new Set(["manifest.ts"]),
    moves: [
        // chassis/page
        { from: "demo/stories/StoryPage.vue", to: "demo/chassis/page/StoryPage.vue" },
        // chassis/hero
        { from: "demo/stories/StoryHero.vue", to: "demo/chassis/hero/StoryHero.vue" },
        {
            from: "demo/stories/StoryHeader.vue",
            to: "demo/chassis/hero/StoryHeader.vue",
        },
        {
            from: "demo/stories/story-hero.css",
            to: "demo/chassis/hero/story-hero.css",
        },
        {
            from: "demo/stories/aurora-hero.ts",
            to: "demo/chassis/hero/aurora-hero.ts",
        },
        {
            from: "demo/stories/category-hero.ts",
            to: "demo/chassis/hero/category-hero.ts",
        },
        {
            from: "demo/stories/warm-field.ts",
            to: "demo/chassis/hero/warm-field.ts",
        },
        { from: "demo/stories/focal.ts", to: "demo/chassis/hero/focal.ts" },
        // chassis/section
        {
            from: "demo/stories/StorySection.vue",
            to: "demo/chassis/section/StorySection.vue",
        },
        {
            from: "demo/stories/useSectionReveal.ts",
            to: "demo/chassis/section/useSectionReveal.ts",
        },
        // chassis/landing
        {
            from: "demo/stories/SectionLanding.vue",
            to: "demo/chassis/landing/SectionLanding.vue",
        },
        {
            from: "demo/stories/SectionPreviewCard.vue",
            to: "demo/chassis/landing/SectionPreviewCard.vue",
        },
        {
            from: "demo/stories/vizPreviewStill.ts",
            to: "demo/chassis/landing/vizPreviewStill.ts",
        },
        // chassis/showcase
        {
            from: "demo/stories/ShowcaseFrame.vue",
            to: "demo/chassis/showcase/ShowcaseFrame.vue",
        },
        {
            from: "demo/stories/TokenLadder.vue",
            to: "demo/chassis/showcase/TokenLadder.vue",
        },
        // chassis/code (the BC.W-CODE-BLOCKS two-rung register, colocated)
        { from: "demo/stories/Code.vue", to: "demo/chassis/code/Code.vue" },
        { from: "demo/stories/CodeBlock.vue", to: "demo/chassis/code/CodeBlock.vue" },
        // chassis/play
        {
            from: "demo/stories/StoryPlayButton.vue",
            to: "demo/chassis/play/StoryPlayButton.vue",
        },
        // chassis/family
        {
            from: "demo/stories/FamilyTabs.vue",
            to: "demo/chassis/family/FamilyTabs.vue",
        },
        {
            from: "demo/stories/story-nested.ts",
            to: "demo/chassis/family/story-nested.ts",
        },
        // shell (was layout/ + the stories-root dock-layer data)
        { from: "demo/layout/AppShell.vue", to: "demo/shell/AppShell.vue" },
        { from: "demo/layout/SidebarDock.vue", to: "demo/shell/SidebarDock.vue" },
        { from: "demo/layout/BottomDock.vue", to: "demo/shell/BottomDock.vue" },
        { from: "demo/layout/dock-nav.css", to: "demo/shell/dock-nav.css" },
        {
            from: "demo/stories/dock-layer-contexts.ts",
            to: "demo/shell/dock-layer-contexts.ts",
        },
        // configurator/presets (was demo/presets/)
        {
            from: "demo/presets/manifest.ts",
            to: "demo/configurator/presets/manifest.ts",
        },
        {
            from: "demo/presets/neutral.css",
            to: "demo/configurator/presets/neutral.css",
        },
    ],
};

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
    // Raw source read (comments PRESERVED — the T-clauses assert on live source
    // strings, not usage/import shapes). `srcOverride` lets a self-test bite feed
    // a synthetic (HEAD-recreating) file body.
    const readSrc = (rel) =>
        overrides.srcOverride && rel in overrides.srcOverride
            ? overrides.srcOverride[rel]
            : read(rel);

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

    // ── D5 — the deletes are CONSUMED: no surviving demo file references a retired
    //    chassis's DELETED CSS file BY NAME (the δ1 CodeBlock→Code-fold-consume /
    //    demo-restructure verify wave — BH.B3). A deleted stylesheet points at
    //    NOTHING: a live `@import` is D3's dangle; a PROSE pointer (`demo-frame.css §5`
    //    in a comment describing the deleted mount-stagger as a live mechanism) is
    //    DEAD DOCUMENTATION that misleads the B3 demo-restructure consumer. DISTINCT
    //    from D3 — which STRIPS comments so a retired COMPONENT NAME (`<DemoFrame>`) in
    //    provenance prose is legitimately OK — because D5 targets the deleted FILE (a
    //    file, unlike a name, cannot be honest provenance: it resolves to nothing). D5
    //    scans the RAW (un-stripped) corpus. The retired-CSS set is DERIVED from the
    //    ledger (DRY — a new retired `.css` auto-enrolls, no hand-list drift).
    const retiredCssNames = [
        ...new Set(
            retireVerdicts
                .flatMap((d) => d.files)
                .filter((f) => f.endsWith(".css"))
                .map(basename),
        ),
    ];
    const rawCorpus =
        overrides.rawCorpus ??
        allDemoFiles([".vue", ".css"]).map((p) => ({
            path: p.slice(ROOT.length + 1),
            text: readFileSync(p, "utf8"),
        }));
    const deadCssRefs = [];
    for (const name of retiredCssNames)
        for (const c of rawCorpus)
            if (c.text.includes(name))
                deadCssRefs.push(`${c.path}: dead reference to deleted ${name}`);
    facts.retiredCssNames = retiredCssNames;
    facts.deadCssRefs = deadCssRefs;
    assert(
        "D5 — the deletes are consumed (no demo file references a retired chassis's deleted CSS by name)",
        deadCssRefs.length === 0,
    );

    // ── D6 — the CodeBlock→Code fold is CONSUMED single-source (consume, do NOT
    //    re-fold — the δ1 wave's central bar). The ONE demo code register is EXACTLY
    //    {Code.vue, CodeBlock.vue} (BC.W-CODE-BLOCKS — the inline + multi-line rungs):
    //    BOTH present, and NO THIRD `Code*.vue` fork. A downstream restructure that
    //    re-mints a third code chassis (a `CodeSnippet.vue`, a second `*CodeBlock*`)
    //    REDs — the no-dual-path discipline transposed to the demo code register. The
    //    family is basename `/^Code.*\.vue$/` (Code.vue / CodeBlock.vue / a fork), so
    //    Encode/Decode/Barcode never false-flag.
    const ALLOWED_CODE = new Set(["Code.vue", "CodeBlock.vue"]);
    const codeVueBasenames =
        overrides.codeVueBasenames ??
        [
            ...new Set(
                allDemoFiles([".vue"])
                    .map((p) => basename(p.slice(ROOT.length + 1)))
                    .filter((b) => /^Code.*\.vue$/.test(b)),
            ),
        ];
    const codeForks = codeVueBasenames.filter((b) => !ALLOWED_CODE.has(b));
    const codeRegisterComplete = [...ALLOWED_CODE].every((b) =>
        codeVueBasenames.includes(b),
    );
    facts.codeVueBasenames = codeVueBasenames;
    facts.codeForks = codeForks;
    facts.codeRegisterComplete = codeRegisterComplete;
    assert(
        "D6 — the CodeBlock→Code fold is single-source (Code + CodeBlock only, no third fork)",
        codeRegisterComplete && codeForks.length === 0,
    );

    // ── D7 — the adopted VizStudio chassis is UNIFIED-HEADER single-source (no
    //    double-header). VizStudio WRAPS StoryPage, which renders the ONE StoryHeader
    //    identity cluster (eyebrow → subpath → audacious display <h1> → blurb, ONCE).
    //    A `#masthead` slot seam let a viz restate the page identity at DISPLAY scale
    //    beside it — the aurora "Aurora" + "Aurora Studio" double-header the paint
    //    judge FAILED. Two arms: (a) VizStudio.vue declares NO `<slot name="masthead">`
    //    (the seam removed at the chassis root); (b) no demo .vue fills a
    //    `<template #masthead>` (no consumer double-authors a masthead identity).
    //    Comment-STRIPPED so a `masthead` mention in prose (or a viz's own hand-voice
    //    label string) is never a false live-seam flag.
    const VIZSTUDIO = "demo/stories/substrates/VizStudio.vue";
    const vizStudioSrc = stripComments(readSrc(VIZSTUDIO));
    const d7NoMastheadSlot = !/<slot\s+name=["']masthead["']/.test(vizStudioSrc);
    const mastheadRe = /<template\s+(?:#masthead|v-slot:masthead)\b/;
    const mastheadFills = vueCorpus
        .filter((c) => mastheadRe.test(c.text))
        .map((c) => c.path);
    facts.d7 = { noMastheadSlot: d7NoMastheadSlot, mastheadFills };
    assert(
        "D7 — VizStudio unified-header single-source (no #masthead double-header seam)",
        d7NoMastheadSlot && mastheadFills.length === 0,
    );

    // ── CF — the CONFIGURATOR-STANDARDIZE arm (BG.W-CONFIGURATOR-STANDARDIZE). The
    //    three procedural STUDIOS (aurora · blob · fourier) speak ONE chassis grammar:
    //    each composes the shared VizStudio → <Configurator>, NEVER a raw <Configurator>
    //    floated in a <ShowcaseFrame> under its own inline display <header> masthead (the
    //    OFFSET + the double-header the wave retires; aurora is the reference, blob +
    //    fourier re-home). CF1 reads the three studio SFCs comment-STRIPPED (so a prose
    //    mention is never a false live-seam flag); CF2 is the anti-fork bite over the
    //    WHOLE substrate band so a future studio cannot re-introduce the dialect.
    const CF_STUDIOS = [
        "demo/stories/substrates/aurora.vue",
        "demo/stories/substrates/blob.vue",
        "demo/stories/substrates/fourier-field.vue",
    ];
    const cfComposesVizStudio = (rel) =>
        /<VizStudio(?:\s|>|\/|$)/m.test(stripComments(readSrc(rel)));
    const cf1Missing = CF_STUDIOS.filter((f) => !cfComposesVizStudio(f));
    facts.cf1 = { studios: CF_STUDIOS, missing: cf1Missing };
    assert(
        "CF1 — the 3 procedural studios (aurora/blob/fourier) each compose the ONE VizStudio chassis",
        cf1Missing.length === 0,
    );
    // CF2 — the anti-fork bite: NO substrate studio floats a raw <Configurator> DIRECTLY
    // inside a <ShowcaseFrame> (the OFFSET) NOR carries an inline text-display-3 <header>
    // masthead (the double-header). Scanned comment-STRIPPED across the whole substrate
    // band; the sanctioned concentric/liquid-grid raw <Configurator>-in-<StorySection>
    // (no ShowcaseFrame wrapper, no masthead — a valid DIRECT composition of the library
    // controls-right primitive) never trips, and VizStudio's own <Configurator> never
    // trips (it is not ShowcaseFrame-wrapped).
    const CF_OFFSET_RE = /<ShowcaseFrame\b[^>]*>\s*<Configurator\b/;
    const CF_MASTHEAD_RE = /<header\b[\s\S]{0,400}?\btext-display-3\b/;
    const cf2Scan = vueCorpus.filter((c) =>
        c.path.startsWith("demo/stories/substrates/"),
    );
    const cf2Offenders = cf2Scan
        .filter((c) => CF_OFFSET_RE.test(c.text) || CF_MASTHEAD_RE.test(c.text))
        .map((c) => c.path);
    facts.cf2 = { scanned: cf2Scan.length, offenders: cf2Offenders };
    assert(
        "CF2 — no substrate studio floats a raw <Configurator> in a <ShowcaseFrame> or an inline text-display-3 masthead (the anti-fork bite)",
        cf2Offenders.length === 0,
    );

    // ── The section-entrance congruence clauses (BG.W-SECTION-TYPEWRITER-FADEUP). ──
    const splitCharsSrc = readSrc(SEC.splitChars);
    const schemeMotionSrc = readSrc(SEC.schemeMotion);
    const typoSrc = readSrc(SEC.typoUtil);
    const revealSrc = readSrc(SEC.reveal);
    const storySectionSrc = readSrc(SEC.storySection);
    const storyHeroSrc = readSrc(SEC.storyHeroCss);
    const storyPageSrc = readSrc(SEC.storyPage);

    // T1 — SplitChars `stagger?:boolean` DROPS `.char-stagger` (no mount-fire-before-reveal).
    const t1StaggerProp = /\bstagger\?\s*:\s*boolean/.test(splitCharsSrc);
    const t1Conditional =
        /props\.stagger\s*&&\s*["']char-stagger["']/.test(splitCharsSrc) &&
        // the UNCONDITIONAL HEAD form (`cn("char-stagger", …)`) is GONE.
        !/cn\(\s*["']char-stagger["']/.test(splitCharsSrc);
    facts.t1 = { staggerProp: t1StaggerProp, dropsWhenFalse: t1Conditional };
    assert(
        "T1 — SplitChars `stagger?:boolean` DROPS .char-stagger (no mount-fire-before-reveal)",
        t1StaggerProp && t1Conditional,
    );

    // T2 — `--char-stagger-step` minted once + read by the recipe (DRY, off `* 30ms`).
    const t2Minted = /--char-stagger-step\s*:/.test(schemeMotionSrc);
    const t2Reads =
        /animation-delay:\s*calc\(\s*var\(--char-index[^)]*\)\s*\*\s*var\(--char-stagger-step\)/.test(
            typoSrc,
        );
    // the hardcoded per-glyph literal (`var(--char-index …) * 30ms`) is GONE.
    const t2NoLiteral = !/var\(--char-index[^)]*\)\s*\*\s*30ms/.test(typoSrc);
    facts.t2 = { minted: t2Minted, reads: t2Reads, noLiteral: t2NoLiteral };
    assert(
        "T2 — --char-stagger-step minted once + single-sourced (off the * 30ms literal)",
        t2Minted && t2Reads && t2NoLiteral,
    );

    // T3 — useSectionReveal exists w/ the 4 sweep hooks + FOUC arm + provide key.
    const revealExists = fileExists(SEC.reveal);
    const t3Hooks =
        /addEventListener\(\s*["']scroll["']/.test(revealSrc) && // (i)
        /addEventListener\(\s*["']scrollend["']/.test(revealSrc) && // (ii)
        /onRouteSettle/.test(revealSrc) && // (iii)
        (revealSrc.match(/requestAnimationFrame/g) || []).length >= 3; // (iv) mount re-sweep
    const t3Fouc =
        /data-reveal-armed/.test(revealSrc) && /data-revealed/.test(revealSrc);
    const t3Key = /SECTION_REVEAL_KEY/.test(revealSrc);
    facts.t3 = { exists: revealExists, hooks: t3Hooks, fouc: t3Fouc, key: t3Key };
    assert(
        "T3 — useSectionReveal exists w/ 4 sweep hooks + FOUC-safe arm + provide key",
        revealExists && t3Hooks && t3Fouc && t3Key,
    );

    // T4 — StorySection two-register + demo gl-char-rise CSS + page provides singleton, no double-cascade.
    const t4Heading =
        /story-section__heading/.test(storySectionSrc) &&
        /<SplitChars[\s\S]*?:stagger="false"/.test(storySectionSrc) &&
        /SECTION_REVEAL_KEY/.test(storySectionSrc);
    const t4Body =
        /story-section__body[^"']*scroll-cascade/.test(storySectionSrc) ||
        /scroll-cascade[^"']*story-section__body/.test(storySectionSrc);
    const t4Css =
        /@keyframes\s+gl-char-rise/.test(storyHeroSrc) &&
        /\[data-reveal-armed\][\s\S]*?:not\(\[data-revealed\]\)/.test(storyHeroSrc) &&
        /\[data-revealed\][\s\S]*?--char-stagger-step/.test(storyHeroSrc) &&
        /prefers-reduced-motion:\s*reduce/.test(storyHeroSrc);
    const t4Provide = /provide\(\s*SECTION_REVEAL_KEY/.test(storyPageSrc);
    // the page-level .story-sections must NOT keep .scroll-cascade (no double-bind).
    const t4NoDouble =
        !/class="scroll-cascade\s+story-sections/.test(storyPageSrc) &&
        !/class="story-sections[^"]*\bscroll-cascade/.test(storyPageSrc);
    facts.t4 = {
        heading: t4Heading,
        body: t4Body,
        css: t4Css,
        provide: t4Provide,
        noDoubleCascade: t4NoDouble,
    };
    assert(
        "T4 — StorySection two-register + gl-char-rise CSS + page provides singleton, no double-cascade",
        t4Heading && t4Body && t4Css && t4Provide && t4NoDouble,
    );

    // ── E1 — demo-earns-page: no subpath shared by >1 ROUTED page off the declared
    //    family allowlist. The routed set = the s() rows MINUS FOLDED_STORY_IDS (the
    //    collapsed member pages). Born-RED on HEAD (no FOLDED → the 8 collisions;
    //    only `dock` is a declared family so 7 are undeclared). GREEN once the
    //    families fold — the only surviving multi-row subpaths are the two DECLARED
    //    families (`/dock` + `/motion-core`). ──
    const manifestSrc = overrides.manifestSrc ?? read(IA.manifest);
    const rows = parseStoryRows(manifestSrc);
    const folded =
        overrides.foldedOverride ??
        parseSetLiteral(manifestSrc, "FOLDED_STORY_IDS");
    const declared =
        overrides.declaredOverride ??
        parseSetLiteral(manifestSrc, "DECLARED_FAMILY_SUBPATHS");
    const subpaths = overrides.subpathsOverride ?? parseSubpaths(manifestSrc);
    const routed = rows.filter((r) => !folded.has(r));
    const bySubpath = {};
    for (const r of routed) {
        const sp = subpaths[r] ?? `/${r}`;
        (bySubpath[sp] ??= []).push(r);
    }
    const e1Collisions = Object.entries(bySubpath)
        .filter(([sp, rs]) => rs.length > 1 && !declared.has(sp))
        .map(([sp, rs]) => `${sp} ← ${rs.join(", ")}`);
    facts.e1 = {
        routedCount: routed.length,
        declared: [...declared],
        collisions: e1Collisions,
    };
    assert(
        "E1 — demo-earns-page (no undeclared subpath shared by >1 routed page)",
        e1Collisions.length === 0,
    );

    // ── E2 — field-warm-default: the DockStage staged field DEFAULT is a WARM
    //    heroAuroraConfig (identity-aligned), NEVER the cerulean OPENAI_SKY (hue
    //    240) at war with the warm-cream identity. ──
    const dockStageSrc = overrides.dockStageSrc ?? read(IA.dockStage);
    const dsDefault =
        (dockStageSrc.match(/config:\s*\(\)\s*=>\s*([^\n,}]+)/) || [])[1] ?? "";
    const e2NotCerulean = !/OPENAI_SKY/.test(dsDefault);
    const e2Warm = /heroAuroraConfig\(/.test(dsDefault);
    facts.e2 = {
        default: dsDefault.trim(),
        notCerulean: e2NotCerulean,
        warm: e2Warm,
    };
    assert(
        "E2 — field-warm-default (DockStage default is warm heroAuroraConfig, not OPENAI_SKY cerulean)",
        e2NotCerulean && e2Warm,
    );

    // ── E3 — shrink-not-fade: the StoryPage header SHRINKS on scroll (the
    //    title-collapse scale is the primary read); the subordinate eyebrow/blurb
    //    fade may only COUPLE to it (open AFTER the pin), never LEAD from scroll 0.
    //    Born-RED on the HEAD `animation-range: normal, 0 var(--hero-condense-fade-
    //    range)` form (the fade leads from 0). ──
    const heroCssSrc = overrides.heroCssSrc ?? read(IA.heroCss);
    const e3ShrinkPresent =
        /@keyframes\s+title-collapse/.test(heroCssSrc) &&
        /animation:\s*title-collapse\b/.test(heroCssSrc);
    const e3FadeLeadsAt0 =
        /animation-range:\s*normal,\s*0\s+var\(--hero-condense-fade-range/.test(
            heroCssSrc,
        );
    facts.e3 = {
        shrinkPresent: e3ShrinkPresent,
        fadeLeadsAt0: e3FadeLeadsAt0,
    };
    assert(
        "E3 — shrink-not-fade (title-collapse shrink leads; subordinate fade follows the pin, not scroll 0)",
        e3ShrinkPresent && !e3FadeLeadsAt0,
    );

    // ── F1-F3 — the BG.W-DEMO-DUP-MERGE mechanical dup-collapse (F7.3). The
    //    concentrated content duplication (Timeline×3, Scroll×3) + the top-level
    //    aurora/ studio-helper dir are collapsed: each duplicate member WRAPPER is
    //    DELETED and its render body moves into the ONE family page as a
    //    <StorySection> register over a colocated PascalCase body sub-component
    //    (copy-the-render-body-delete-the-wrapper, the curve-gallery exemplar), and
    //    the aurora/ helper dir nests under substrates/aurora/ (off the ./*/*.vue
    //    glob). Born-RED on HEAD (the member wrappers exist + aurora/ sits at the top
    //    level); GREEN once each set collapses onto its ONE family page. The F5+
    //    bites recreate the HEAD state (a surviving member wrapper, a re-introduced
    //    FamilyTabs, a top-level aurora/) so the collapse cannot silently regress. ──
    const DUP_MERGE = {
        timeline: {
            family: "demo/stories/data/timeline.vue",
            members: [
                "demo/stories/data/timeline-segmented.vue",
                "demo/stories/data/timeline-continuous.vue",
            ],
            bodies: [
                "demo/stories/data/TimelineSegmentedBody.vue",
                "demo/stories/data/TimelineContinuousBody.vue",
            ],
            bodyTags: ["TimelineSegmentedBody", "TimelineContinuousBody"],
        },
        scroll: {
            family: "demo/stories/motion/scroll.vue",
            members: [
                "demo/stories/motion/scroll-vt.vue",
                "demo/stories/motion/scroll-system.vue",
                "demo/stories/motion/scroll-choreography.vue",
            ],
            bodies: [
                "demo/stories/motion/ScrollNativeBody.vue",
                "demo/stories/motion/ScrollReaderBody.vue",
                "demo/stories/motion/ScrollChoreographyBody.vue",
            ],
            bodyTags: [
                "ScrollNativeBody",
                "ScrollReaderBody",
                "ScrollChoreographyBody",
            ],
        },
        // The aurora studio-helper dir moved off the top-level ./*/*.vue glob.
        auroraTopLevelWitness: "demo/stories/aurora/presets.ts",
        auroraNestedWitness: "demo/stories/substrates/aurora/presets.ts",
    };
    // A family page collapse is realized IFF every member wrapper is DEFINITION-ABSENT,
    // every colocated body sub-component EXISTS, and the family page composes each body
    // as a stacked <StorySection> register (≥ N registers). The family src is
    // comment-STRIPPED so a retired member NAME in a provenance comment never fakes a
    // live composition/tag.
    const mergeRealized = (spec, minSections, forbidTag) => {
        const membersGone = spec.members.every((m) => !fileExists(m));
        const bodiesPresent = spec.bodies.every((b) => fileExists(b));
        const famSrc = fileExists(spec.family)
            ? stripComments(readSrc(spec.family))
            : "";
        const composes = spec.bodyTags.every((t) =>
            new RegExp(`<${t}[\\s/>]`).test(famSrc),
        );
        const sectionCount = (famSrc.match(/<StorySection\b/g) || []).length;
        const forbidGone = forbidTag ? !new RegExp(forbidTag).test(famSrc) : true;
        return {
            membersGone,
            bodiesPresent,
            composes,
            sectionCount,
            forbidGone,
            ok:
                membersGone &&
                bodiesPresent &&
                composes &&
                sectionCount >= minSections &&
                forbidGone,
        };
    };

    const f1 = mergeRealized(DUP_MERGE.timeline, 3, null);
    facts.f1 = f1;
    assert(
        "F1 — Timeline×3 merged to ONE data/timeline.vue (3 <StorySection> registers over colocated bodies; the segmented/continuous wrappers deleted)",
        f1.ok,
    );

    const f2 = mergeRealized(DUP_MERGE.scroll, 3, "FamilyTabs");
    facts.f2 = f2;
    assert(
        "F2 — Scroll×3 merged to ONE motion/scroll.vue (3 <StorySection> registers over colocated bodies, no FamilyTabs; the vt/system/choreography wrappers deleted)",
        f2.ok,
    );

    const f3TopLevelGone = !fileExists(DUP_MERGE.auroraTopLevelWitness);
    const f3NestedPresent = fileExists(DUP_MERGE.auroraNestedWitness);
    facts.f3 = { topLevelGone: f3TopLevelGone, nestedPresent: f3NestedPresent };
    assert(
        "F3 — the aurora studio-helper dir nested under substrates/aurora/ (off the ./*/*.vue route glob)",
        f3TopLevelGone && f3NestedPresent,
    );

    // ── ST1-ST5 — the demo SUB-TYPE taxonomy (BG.W-STORY-PAGE-API §4-D). The
    //    CLOSED five-KIND vocabulary is minted, real, conformity-guaranteeing, and
    //    ADOPTED (not the zero-importer DemoFrame shelf-ware D1 retired). Born-RED
    //    on HEAD (demo/chassis/ DEFINITION-ABSENT). ──
    const stMembers = SUBTYPES.members;

    // ST1 — the five members DEFINITION-PRESENT + the barrel exports each name (the
    //    vocabulary is closed + barrelled, not a loose set of orphan SFCs).
    const stMissing = stMembers
        .filter((m) => !fileExists(m.file))
        .map((m) => m.name);
    const stBarrelSrc = readSrc(SUBTYPES.barrel);
    const stBarrelGaps = stMembers
        .filter((m) => !new RegExp(`\\b${m.name}\\b`).test(stBarrelSrc))
        .map((m) => m.name);
    facts.st1 = { missing: stMissing, barrelGaps: stBarrelGaps };
    assert(
        "ST1 — the five demo sub-types exist in demo/chassis/ + the barrel exports each",
        stMissing.length === 0 && stBarrelGaps.length === 0,
    );

    // ST2 — each member is a REAL slot-bearing composition (a `<slot`). The C1·R1
    //    slot-drop refutation baked in: a slotless `(p)=>h(DemoFrame,{...p})`-style
    //    variant-shim that DROPS its content (the silent-no-op class) REDs.
    const stSlotless = stMembers
        .filter((m) => !/<slot[\s/>]/.test(readSrc(m.file)))
        .map((m) => m.name);
    facts.st2 = { slotless: stSlotless };
    assert(
        "ST2 — each demo sub-type is a real slot-bearing composition (content is not dropped)",
        stSlotless.length === 0,
    );

    // ST3 — each member declares the CONFORMITY invariant: it composes a glass tier
    //    (a `glass-<rung>` class, concrete OR dynamic-concat) OR composes the glassy
    //    `<DemoSpecimen>` base. A sub-type rendering a bare opaque `bg-card` slab off
    //    the glass ladder breaks the "one product" glassy-card conformity and REDs.
    const stNoConformity = stMembers
        .filter((m) => {
            const src = readSrc(m.file);
            const glassTier =
                /glass-(wash|quiet|resting|floating|overlay)/.test(src) ||
                /glass-['"]/.test(src);
            const composesSpecimen = /<DemoSpecimen[\s/>]/.test(src);
            return !(glassTier || composesSpecimen);
        })
        .map((m) => m.name);
    facts.st3 = { noConformity: stNoConformity };
    assert(
        "ST3 — each demo sub-type composes the glassy-card conformity (a glass tier / DemoSpecimen)",
        stNoConformity.length === 0,
    );

    // ST4 — each member is ADOPTED, not shelf-ware: ≥1 LIVE importer/usage in the
    //    demo corpus (excluding its own file) — the anti-DemoFrame floor (the
    //    zero-importer substrate D1 retired). A minted-but-never-used taxonomy is the
    //    exact flattened-out DemoFrame the audit condemns.
    const stShelfware = [];
    const stImporters = {};
    for (const m of stMembers) {
        const importers = liveImporters(m.name, [m.file]);
        stImporters[m.name] = importers;
        if (importers.length === 0) stShelfware.push(m.name);
    }
    facts.st4 = { shelfware: stShelfware, importers: stImporters };
    assert(
        "ST4 — every demo sub-type is adopted (≥1 live importer, not zero-importer shelf-ware)",
        stShelfware.length === 0,
    );

    // ST5 — the vocabulary is CLOSED (anti-drift): the on-disk `demo/chassis/Demo*.vue`
    //    set is EXACTLY the five members — no 6th sub-type smuggled in unaudited, no
    //    member missing. The anti-gameability floor (a future agent cannot silently
    //    add a `DemoFoo.vue` kind off the roster).
    const chassisDir = resolve(DEMO_DIR, "chassis");
    const chassisVueBasenames =
        overrides.chassisVueBasenames ??
        (existsSync(chassisDir)
            ? readdirSync(chassisDir).filter((b) => /^Demo.*\.vue$/.test(b))
            : []);
    const stDeclared = new Set(stMembers.map((m) => `${m.name}.vue`));
    const stExtras = chassisVueBasenames.filter((b) => !stDeclared.has(b));
    const stAllPresent = [...stDeclared].every((b) =>
        chassisVueBasenames.includes(b),
    );
    facts.st5 = {
        basenames: chassisVueBasenames,
        extras: stExtras,
        allPresent: stAllPresent,
    };
    assert(
        "ST5 — the demo sub-type vocabulary is closed (exactly the five members on disk, no drift)",
        stExtras.length === 0 && stAllPresent,
    );

    // ── CD1/CD2/CD3 — the B3-d2 composables-dissolve moves (BH.F7 δ2). ────────────
    const moves = overrides.composableMoves ?? COMPOSABLE_MOVES;

    // CD1 — the OLD home is DISSOLVED: the `demo/composables/` dir AND both old
    //   composable files are DEFINITION-ABSENT (born-RED: HEAD carries both under
    //   demo/composables/). A survivor = a half-move (the old copy left behind is
    //   the dual-path the dissolve forbids).
    const cdDissolveSurvivors = [];
    if (fileExists(moves.dissolvedDir)) cdDissolveSurvivors.push(moves.dissolvedDir);
    for (const m of moves.moves)
        if (fileExists(m.from)) cdDissolveSurvivors.push(m.from);
    facts.cdDissolveSurvivors = cdDissolveSurvivors;
    assert(
        "CD1 — demo/composables/ is dissolved (the dir + both old composable files DEFINITION-ABSENT)",
        cdDissolveSurvivors.length === 0,
    );

    // CD2 — each dissolved composable is RE-HOMED: the new file EXISTS on disk
    //   (useStoryNavigation → demo/chassis/, useContextualDockLayers → demo/shell/).
    //   The dissolve is a MOVE, never a delete.
    const cdRehomeGaps = [];
    for (const m of moves.moves)
        if (!fileExists(m.to)) cdRehomeGaps.push(`${m.name} → ${m.to}`);
    facts.cdRehomeGaps = cdRehomeGaps;
    assert(
        "CD2 — each dissolved composable is re-homed (chassis/useStoryNavigation + shell/useContextualDockLayers present)",
        cdRehomeGaps.length === 0,
    );

    // CD3 — the move is CLEAN: no demo/ import statement still references the retired
    //   `demo/composables/` path. A stale `../composables/use{Story…}` import would
    //   resolve to NOTHING (the broken-import dangle). Comment-STRIPPED corpus over
    //   demo/**/*.{ts,vue} (both the .vue consumers + the shell .ts consumer).
    const moveCorpus =
        overrides.moveCorpus ??
        allDemoFiles([".ts", ".vue"]).map((p) => ({
            path: p.slice(ROOT.length + 1),
            text: stripComments(readFileSync(p, "utf8")),
        }));
    const staleMoveImportRe =
        /from\s*["'][^"']*\/composables\/(useStoryNavigation|useContextualDockLayers)["']/;
    const cdDangles = moveCorpus
        .filter((c) => staleMoveImportRe.test(c.text))
        .map((c) => c.path);
    facts.cdDangles = cdDangles;
    assert(
        "CD3 — the composables dissolve is clean (no demo import references the retired demo/composables/ path)",
        cdDangles.length === 0,
    );

    // ── CL1/CL2/CL3 — the B3-δ34 chassis-colocation move (BH.B3 δ3/δ4). The flat
    //    demo/stories/ root chassis kit + demo/layout/ + demo/presets/ re-home into
    //    colocated dirs (chassis/<group>/ · shell/ · configurator/presets/). Born-RED
    //    on HEAD (every `to` absent, every `from` present, both flat-root dirs live).
    const coloc = overrides.colocation ?? COLOCATION;

    // CL1 — every moved chassis is PRESENT at its colocated home (the move landed —
    //   not a delete, a re-home).
    const clHomeGaps = [];
    for (const m of coloc.moves) if (!fileExists(m.to)) clHomeGaps.push(m.to);
    facts.cl1 = { homeGaps: clHomeGaps };
    assert(
        "CL1 — every flat-root chassis is re-homed to its colocated dir (chassis/<group>/ · shell/ · configurator/presets/ present)",
        clHomeGaps.length === 0,
    );

    // CL2 — every flat-root SOURCE is DEFINITION-ABSENT (a clean MOVE, never a copy
    //   that leaves the old flat-root file behind as a dual-path husk).
    const clSurvivors = [];
    for (const m of coloc.moves) if (fileExists(m.from)) clSurvivors.push(m.from);
    facts.cl2 = { survivors: clSurvivors };
    assert(
        "CL2 — the flat-root chassis are gone (each moved source DEFINITION-ABSENT, no dual-path husk)",
        clSurvivors.length === 0,
    );

    // CL3 — the dissolved flat-root dirs are EXTIRPATED (demo/layout · demo/presets
    //   DEFINITION-ABSENT — no empty husk survives) AND no stray flat chassis .vue/.css
    //   re-drifts to the demo/stories/ ROOT (only manifest.ts is sanctioned there; the
    //   per-category carve + the ./*/*.vue glob is the δ5/δ6 wave). The anti-drift floor.
    const clDirHusks = coloc.dissolvedDirs.filter((d) => fileExists(d));
    const storiesDir = resolve(ROOT, "demo/stories");
    const storiesRootEntries =
        overrides.storiesRootEntries ??
        (existsSync(storiesDir)
            ? readdirSync(storiesDir).filter((f) => {
                  const p = resolve(storiesDir, f);
                  return statSync(p).isFile() && /\.(vue|css)$/.test(f);
              })
            : []);
    const clStrays = storiesRootEntries.filter(
        (f) => !coloc.storiesRootAllowed.has(f),
    );
    facts.cl3 = { dirHusks: clDirHusks, strays: clStrays };
    assert(
        "CL3 — the dissolved flat-root dirs are extirpated (demo/layout + demo/presets gone) + no stray flat chassis at the stories root",
        clDirHusks.length === 0 && clStrays.length === 0,
    );

    // ── M1-M3 — the δ5/δ6 manifest-carve+glob DECISION (BH.B3 δ5/δ6). ────────────
    //   δ6 (glob `./*/*.vue` → `./*/*/index.vue` + per-story-dir moves) is DROPPED
    //   (BH.PLAN §4.0 row 8 "δ6 glob DROPPED"): trivial stories stay FLAT, so the
    //   glob stays flat by design. δ5 (carve manifest.ts) is executed as the SAFE,
    //   foreign-gate-preserving colocation of the ONE cleanly-carveable concern —
    //   the glob-resolved SFC `lazy` resolver → `demo/stories/manifest/lazy.ts` —
    //   while every literal ~13 foreign gates parse (the `s()` rows, the SUBPATHS
    //   map, the `Story` interface fields, the category-id order, sectionLanding)
    //   STAYS textually in manifest.ts (the single parseable source-of-truth;
    //   demo/ is exempt from proof:no-god-module which scans src/ only). Born-RED on
    //   HEAD (the lazy resolver was inlined in manifest.ts, no manifest/ dir).
    const LAZY_TS = "demo/stories/manifest/lazy.ts";
    const lazyExists =
        overrides.lazyExists ?? fileExists(LAZY_TS);
    const lazySrc = readSrc(LAZY_TS);
    // M1 — the lazy resolver is colocated + composed (the carve landed clean, no
    //   inline resolver husk): lazy.ts exports makeLazy, manifest.ts imports it, and
    //   manifest.ts no longer inlines a `function lazy(` resolver.
    const m1LazyLeaf = lazyExists && /export\s+function\s+makeLazy\b/.test(lazySrc);
    const m1ManifestImports = /from\s+["']\.\/manifest\/lazy["']/.test(manifestSrc);
    const m1NoInlineResolver = !/\bfunction\s+lazy\s*\(/.test(manifestSrc);
    facts.m1 = {
        lazyLeaf: m1LazyLeaf,
        manifestImports: m1ManifestImports,
        noInlineResolver: m1NoInlineResolver,
    };
    assert(
        "M1 — the manifest `lazy` resolver is colocated (manifest/lazy.ts exports makeLazy, manifest.ts imports it, no inline resolver husk)",
        m1LazyLeaf && m1ManifestImports && m1NoInlineResolver,
    );
    // M2 — the single-source contract PRESERVED (the anti-carve foreign-gate
    //   regression guard): manifest.ts still carries the ~13-gate-parsed literals —
    //   the s() rows (≥80), the SUBPATHS map, FOLDED/DECLARED, and the SAME Story
    //   interface field regexes proof:page-chassis reads (subpath/heroScale/depth).
    //   A carve that moved these OUT breaks a foreign gate → M2 REDs.
    const m2Rows = parseStoryRows(manifestSrc).length >= 80;
    const m2Maps =
        /const\s+SUBPATHS\b/.test(manifestSrc) &&
        /FOLDED_STORY_IDS\b/.test(manifestSrc) &&
        /DECLARED_FAMILY_SUBPATHS\b/.test(manifestSrc);
    const m2Iface =
        /subpath\?:\s*string/.test(manifestSrc) &&
        /heroScale\?:\s*HeroScale/.test(manifestSrc) &&
        /depth\?:\s*StoryDepth/.test(manifestSrc);
    facts.m2 = {
        rows: parseStoryRows(manifestSrc).length,
        maps: m2Maps,
        iface: m2Iface,
    };
    assert(
        "M2 — the manifest single-source contract preserved (s() rows + SUBPATHS + FOLDED/DECLARED + Story interface fields still in manifest.ts)",
        m2Rows && m2Maps && m2Iface,
    );
    // M3 — the δ6-drop record: the route glob stays FLAT `./*/*.vue` (the
    //   per-story-`index.vue` dir-form is NOT adopted — the KISS decision that keeps
    //   ~80 trivial stories flat and never renders a flat story blank).
    const m3Flat =
        /import\.meta\.glob<[^>]*>\(\s*["']\.\/\*\/\*\.vue["']\)/.test(
            manifestSrc,
        );
    const m3NoIndexForm = !/["']\.\/\*\/\*\/index\.vue["']/.test(manifestSrc);
    facts.m3 = { flat: m3Flat, noIndexForm: m3NoIndexForm };
    assert(
        "M3 — the δ6 glob stays FLAT `./*/*.vue` (no per-story `index.vue` dir-form contrivance)",
        m3Flat && m3NoIndexForm,
    );

    // ── WC1-WC5 — the colors-watercolor arm (BG.W-COLORS-WATERCOLOR-SWATCH). The
    //    /foundations/colors section-ramp stops render as the shipped <WatercolorDot>
    //    seeded blobs (REUSED not re-forked), sized ≥112px (larger than the retired
    //    96px flat chip), laid out with a HAND-LAID stagger (adjacent stops carry
    //    DISTINCT block-offsets), entering on scroll via the EXISTING
    //    `.scroll-cascade--columns` register (no demo-local @keyframes). Born-RED on
    //    HEAD (the flat `h-24 rounded-lg` chip painting `background:
    //    var(--section-color-N)`). The ramp IS the content — the reference-class
    //    one-color-event exemption, so the full-chroma per-stop hue is correct here.
    const WC_FILE = "demo/stories/foundations/colors.vue";
    const wcRaw = readSrc(WC_FILE);
    const wcSrc = stripComments(wcRaw);

    // WC1 — the ramp composes the SHIPPED <WatercolorDot> primitive over
    // --section-color-N (the ramp IS the content). A demo-local blob re-fork (an
    // import off any non-watercolor-dot path, or a hand-rolled blob) fails the
    // shipped-primitive import; a flat-chip HEAD tree carries no <WatercolorDot>.
    const wc1Import =
        /import\s*\{[^}]*\bWatercolorDot\b[^}]*\}\s*from\s*["'][^"']*\/watercolor-dot["']/.test(
            wcSrc,
        );
    const wc1Tag = /<WatercolorDot[\s/>]/.test(wcSrc);
    const wc1Ramp = /var\(--section-color-/.test(wcSrc);
    facts.wc1 = { import: wc1Import, tag: wc1Tag, ramp: wc1Ramp };
    assert(
        "WC1 — the colors ramp composes the shipped <WatercolorDot> primitive over --section-color-N",
        wc1Import && wc1Tag && wc1Ramp,
    );

    // WC2 — no flat-chip regression: no element paints the ramp as a flat
    // `background: var(--section-color-N)` fill (the retired h-24 chip). The
    // signature is a `background`/`background-color` style paired with
    // --section-color on one line — WatercolorDot reads its hue via `:color`, never
    // a background.
    const wc2FlatChip = /background(?:-color)?[^\n]{0,40}var\(--section-color-/.test(
        wcSrc,
    );
    facts.wc2 = { flatChip: wc2FlatChip };
    assert(
        "WC2 — no flat-chip regression (the ramp is not a raw background: var(--section-color-N) chip)",
        !wc2FlatChip,
    );

    // WC3 — the blobs are sized ≥112px (strictly larger than the retired 96px flat
    // chip). The size is the SWATCH_SIZE const (rem/px) applied as blob width+height.
    const wc3Match = wcRaw.match(/SWATCH_SIZE\s*=\s*["']([\d.]+)(rem|px)["']/);
    const wc3Px = wc3Match
        ? wc3Match[2] === "rem"
            ? parseFloat(wc3Match[1]) * 16
            : parseFloat(wc3Match[1])
        : 0;
    const wc3Applied =
        /width:\s*SWATCH_SIZE/.test(wcSrc) && /height:\s*SWATCH_SIZE/.test(wcSrc);
    facts.wc3 = { px: wc3Px, applied: wc3Applied };
    assert(
        "WC3 — the ramp swatches are sized ≥112px (larger than the retired 96px flat chip)",
        wc3Px >= 112 && wc3Applied,
    );

    // WC4 — the hand-laid stagger: adjacent stops carry DISTINCT block-offsets. The
    // STAGGER_REM array drives a per-stop `marginBlockStart` (a block-axis offset),
    // and no two consecutive entries are equal (the irregular hand-laid read, not a
    // flat aligned row).
    const wc4Match = wcRaw.match(/STAGGER_REM\s*=\s*\[([^\]]*)\]/);
    const staggerVals = wc4Match
        ? wc4Match[1]
              .split(",")
              .map((s) => parseFloat(s.trim()))
              .filter((v) => !Number.isNaN(v))
        : [];
    const wc4Distinct =
        staggerVals.length >= 2 &&
        staggerVals.every((v, idx) => idx === 0 || v !== staggerVals[idx - 1]);
    const wc4BlockAxis =
        /marginBlockStart/.test(wcSrc) &&
        (wcSrc.match(/STAGGER_REM/g) || []).length >= 2;
    facts.wc4 = {
        count: staggerVals.length,
        distinct: wc4Distinct,
        blockAxis: wc4BlockAxis,
    };
    assert(
        "WC4 — the ramp carries a hand-laid stagger (adjacent stops carry distinct block-offsets)",
        wc4Distinct && wc4BlockAxis,
    );

    // WC5 — the entrance rides the EXISTING `.scroll-cascade--columns` register
    // (KISS — no demo-local @keyframes in the colors pane). The container carries the
    // register + the per-stop --col index; the file mints no local @keyframes.
    const wc5Cascade = /scroll-cascade--columns/.test(wcSrc) && /--col/.test(wcSrc);
    // Scan the COMMENT-STRIPPED source (a `@keyframes` mention in a prose comment is
    // provenance, never a live demo-local fork; a real definition lives in a <style>).
    const wc5NoLocalKeyframes = !/@keyframes/.test(wcSrc);
    facts.wc5 = { cascade: wc5Cascade, noLocalKeyframes: wc5NoLocalKeyframes };
    assert(
        "WC5 — the ramp enters on scroll via the existing .scroll-cascade--columns register (no demo-local @keyframes)",
        wc5Cascade && wc5NoLocalKeyframes,
    );

    // ── PR1-PR3 — the preset-ribbon arm (BG.W-PRESET-RIBBON-TOP / F7.6). The aurora
    //    studio's presets are a LARGE full-width TOP RIBBON, not the 360px aside
    //    gutter: the studio pins galleryPlacement="top", the shared VizStudio chassis
    //    THREADS the axis to the ONE library <Configurator> (single-writer — the studio
    //    only sets the axis, the chassis owns the passthrough, never a per-studio
    //    gallery re-fork), and the top-placed preset tiles read a LARGE floor (≥72px)
    //    via a top-scoped configurator.css rule. Born-RED on HEAD (aurora passes no
    //    gallery-placement; VizStudio hardcodes the aside default; no top-scoped tile
    //    floor). The FadingScroll overflow is the shipped PresetPickerRow scroll-port
    //    (byte-untouched). The studio + chassis srcs are comment-STRIPPED (a
    //    gallery-placement mention in prose is provenance, never a live bind — the anti-
    //    evasion strip a self-test bite proves).
    const AURORA_STUDIO = "demo/stories/substrates/aurora.vue";
    const VIZ_STUDIO_PR = "demo/stories/substrates/VizStudio.vue";
    const CONFIG_CSS = "src/styles/configurator.css";
    const auroraStudioSrc = stripComments(readSrc(AURORA_STUDIO));
    const vizStudioPrSrc = stripComments(readSrc(VIZ_STUDIO_PR));
    const configCssSrc = stripComments(
        overrides.configCssSrc ?? read(CONFIG_CSS),
    );

    // PR1 — the aurora studio pins the TOP ribbon: it binds gallery-placement="top"
    //   (static or the `:gallery-placement="'top'"` bound form) on its <VizStudio> host.
    const pr1Top =
        /gallery-placement\s*=\s*"top"/.test(auroraStudioSrc) ||
        /:gallery-placement\s*=\s*"'top'"/.test(auroraStudioSrc);
    facts.pr1 = { pinsTop: pr1Top };
    assert(
        'PR1 — the aurora studio pins the preset gallery as a top ribbon (gallery-placement="top")',
        pr1Top,
    );

    // PR2 — the VizStudio chassis THREADS the axis to the library <Configurator>
    //   (single-writer passthrough): it declares a `galleryPlacement` prop AND binds
    //   `:gallery-placement=` on <Configurator>. The studio sets the axis; the chassis
    //   owns the ONE Configurator — never a per-studio gallery re-fork.
    const pr2Prop = /\bgalleryPlacement\?\s*:/.test(vizStudioPrSrc);
    const pr2Bind = /:gallery-placement\s*=/.test(vizStudioPrSrc);
    facts.pr2 = { prop: pr2Prop, bind: pr2Bind };
    assert(
        "PR2 — VizStudio threads galleryPlacement to <Configurator> (single-writer passthrough)",
        pr2Prop && pr2Bind,
    );

    // PR3 — the top-placed preset tiles read a LARGE floor (≥72px): a top-scoped
    //   configurator.css rule (`[data-gallery="top"] .configurator-preset-tile`) sets
    //   an inline-size whose clamp MIN rung is ≥72px (the wave's LARGE-ribbon tile
    //   floor). A missing top-scoped rule (HEAD) or a sub-72px floor REDs.
    const prTileMatch = configCssSrc.match(
        /\[data-slot="configurator"\]\[data-gallery="top"\]\s*\.configurator-preset-tile\s*\{[^}]*inline-size:\s*clamp\(\s*([\d.]+)px/,
    );
    const pr3Px = prTileMatch ? parseFloat(prTileMatch[1]) : 0;
    facts.pr3 = { present: Boolean(prTileMatch), minPx: pr3Px };
    assert(
        "PR3 — the top-placed preset tiles read a LARGE floor (≥72px, top-scoped configurator.css rule)",
        pr3Px >= 72,
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
            existsOverride: { "demo/chassis/hero/StoryHeader.vue": true },
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
    // D5: a demo file that names a retired chassis's DELETED css file (the HEAD
    // StoryPage.vue `demo-frame.css §5` dead-doc form) → REDs D5. The raw corpus is
    // fed directly (D5 scans un-stripped source — a comment reference IS the dead doc).
    sab(
        {
            rawCorpus: [
                {
                    path: "demo/stories/x.vue",
                    text: `<!-- the cel-slam --i stagger — demo-frame.css §5 -->`,
                },
            ],
        },
        "D5 — the deletes are consumed (no demo file references a retired chassis's deleted CSS by name)",
        "D5 dead-doc pointer to a deleted retired-chassis CSS file (HEAD form)",
    );
    // D6 (fork): a synthetic THIRD code-register fork alongside Code + CodeBlock →
    // REDs D6 (the re-fold the wave's "consume, do NOT re-fold" bar forbids).
    sab(
        { codeVueBasenames: ["Code.vue", "CodeBlock.vue", "CodeSnippet.vue"] },
        "D6 — the CodeBlock→Code fold is single-source (Code + CodeBlock only, no third fork)",
        "D6 a third code-component fork (re-fold)",
    );
    // D6 (incomplete): a register missing a rung (only Code.vue, CodeBlock.vue gone) →
    // REDs D6 (the fold is not the two-rung register).
    sab(
        { codeVueBasenames: ["Code.vue"] },
        "D6 — the CodeBlock→Code fold is single-source (Code + CodeBlock only, no third fork)",
        "D6 incomplete register (a rung missing)",
    );
    // D7 (seam-at-root): a synthetic VizStudio.vue that declares the `#masthead` slot
    // → REDs D7 (the chassis re-exposes the double-header seam). vueCorpus isolated to
    // an empty set so ONLY the slot-seam arm fires.
    sab(
        {
            srcOverride: {
                "demo/stories/substrates/VizStudio.vue": `<template><slot name="masthead" /></template>`,
            },
            vueCorpus: [],
        },
        "D7 — VizStudio unified-header single-source (no #masthead double-header seam)",
        "D7 VizStudio re-declares the #masthead slot (HEAD form)",
    );
    // D7 (double-authored): a synthetic consumer that fills a `<template #masthead>`
    // with an inline <header> → REDs D7 (a viz double-authors its identity masthead).
    sab(
        {
            vueCorpus: [
                {
                    path: "demo/stories/substrates/viz.vue",
                    text: `<template #masthead><header><span class="text-display-3">Aurora Studio</span></header></template>`,
                },
            ],
            cssCorpus: [],
        },
        "D7 — VizStudio unified-header single-source (no #masthead double-header seam)",
        "D7 a consumer fills the #masthead slot (aurora HEAD form)",
    );
    // D7 (distinguishing): a bare `masthead` mention in a comment / a viz's own
    // hand-voice label string must NOT red D7 (the conservatism fence — only a live
    // `<template #masthead>` seam is the double-header, not the word `masthead`).
    sabNot(
        {
            vueCorpus: [
                {
                    path: "demo/stories/motion/handmark.vue",
                    text: stripComments(
                        `<!-- The masthead underline — a hand pen line under the word. -->\n<HandMark label="pen underline · the masthead default" />`,
                    ),
                },
            ],
            cssCorpus: [],
        },
        "D7 — VizStudio unified-header single-source (no #masthead double-header seam)",
        "D7 comment/label `masthead` mention distinguishing bite",
    );

    // ── T-clause bites — each recreates the HEAD state (the born-RED proof). ──
    // T1: the unconditional-`.char-stagger` SplitChars (no `stagger` prop) → REDs T1.
    sab(
        {
            srcOverride: {
                [SEC.splitChars]:
                    `defineProps<{ text: string; as?: string }>();\n` +
                    `const hostClass = computed(() => cn("char-stagger", props.class));`,
            },
        },
        "T1 — SplitChars `stagger?:boolean` DROPS .char-stagger (no mount-fire-before-reveal)",
        "T1 unconditional .char-stagger (HEAD form)",
    );
    // T2: the hardcoded `* 30ms` per-glyph literal + no token → REDs T2.
    sab(
        {
            srcOverride: {
                [SEC.schemeMotion]: `:root { --motion-stagger-tight: 40ms; }`,
                [SEC.typoUtil]:
                    `.char-stagger > .char { animation-delay: calc(var(--char-index, 0) * 30ms); }`,
            },
        },
        "T2 — --char-stagger-step minted once + single-sourced (off the * 30ms literal)",
        "T2 hardcoded * 30ms literal (HEAD form)",
    );
    // T3: the DEFINITION-ABSENT useSectionReveal → REDs T3.
    sab(
        { existsOverride: { [SEC.reveal]: false }, srcOverride: { [SEC.reveal]: "" } },
        "T3 — useSectionReveal exists w/ 4 sweep hooks + FOUC-safe arm + provide key",
        "T3 useSectionReveal DEFINITION-ABSENT (HEAD form)",
    );
    // T4: a StorySection with no heading register (the HEAD `{{ heading }}` form) → REDs T4.
    sab(
        {
            srcOverride: {
                [SEC.storySection]:
                    `<h2 v-else-if="heading" class="text-subheading">{{ heading }}</h2>\n<slot />`,
            },
        },
        "T4 — StorySection two-register + gl-char-rise CSS + page provides singleton, no double-cascade",
        "T4 heading-register-less StorySection (HEAD form)",
    );

    // E1 (born-RED): the HEAD state — EMPTY folded set over the real manifest rows +
    // subpaths → the 8 redundant-page collisions surface (7 undeclared) → REDs E1.
    sab(
        { foldedOverride: new Set() },
        "E1 — demo-earns-page (no undeclared subpath shared by >1 routed page)",
        "E1 empty FOLDED (HEAD) leaves undeclared subpath collisions",
    );
    // E1 (distinguishing): a subpath shared by 2 rows that IS a declared family
    // (dock) must NOT red — the allowlist is the sanction.
    sabNot(
        {
            manifestSrc: `s("nav","a","A") s("nav","b","B")`,
            subpathsOverride: {
                "nav/a": "@mkbabb/glass-ui/dock",
                "nav/b": "@mkbabb/glass-ui/dock",
            },
            foldedOverride: new Set(),
            declaredOverride: new Set(["@mkbabb/glass-ui/dock"]),
        },
        "E1 — demo-earns-page (no undeclared subpath shared by >1 routed page)",
        "E1 a declared-family (dock) collision is sanctioned",
    );
    // E2 (born-RED): a synthetic DockStage default of PRESETS.OPENAI_SKY (cerulean)
    // → REDs E2.
    sab(
        { dockStageSrc: `config: () => PRESETS.OPENAI_SKY,` },
        "E2 — field-warm-default (DockStage default is warm heroAuroraConfig, not OPENAI_SKY cerulean)",
        "E2 cerulean OPENAI_SKY default (HEAD form)",
    );
    // E3 (born-RED): the HEAD subordinate-fade `animation-range: normal, 0 var(--hero-
    // condense-fade-range …)` (the fade leads from scroll 0) → REDs E3.
    sab(
        {
            heroCssSrc: `@keyframes title-collapse { to { scale: 0.82; } }\n.x { animation: title-collapse both; animation-range: normal, 0 var(--hero-condense-fade-range, 120px); }`,
        },
        "E3 — shrink-not-fade (title-collapse shrink leads; subordinate fade follows the pin, not scroll 0)",
        "E3 subordinate fade leads from scroll 0 (HEAD form)",
    );
    // F1 (born-RED): the HEAD state — a surviving `timeline-segmented.vue` member
    // wrapper (the dup un-collapsed) → REDs F1.
    sab(
        { existsOverride: { "demo/stories/data/timeline-segmented.vue": true } },
        "F1 — Timeline×3 merged to ONE data/timeline.vue (3 <StorySection> registers over colocated bodies; the segmented/continuous wrappers deleted)",
        "F1 surviving timeline-segmented.vue member wrapper (HEAD form)",
    );
    // F2 (born-RED): a surviving `scroll-vt.vue` member wrapper → REDs F2.
    sab(
        { existsOverride: { "demo/stories/motion/scroll-vt.vue": true } },
        "F2 — Scroll×3 merged to ONE motion/scroll.vue (3 <StorySection> registers over colocated bodies, no FamilyTabs; the vt/system/choreography wrappers deleted)",
        "F2 surviving scroll-vt.vue member wrapper (HEAD form)",
    );
    // F2 (distinguishing): the family page re-introduces the <FamilyTabs> switcher
    // (the F7.1 interim indirection the mechanical merge retires) even with the bodies
    // composed → REDs F2 on the no-FamilyTabs arm.
    sab(
        {
            srcOverride: {
                "demo/stories/motion/scroll.vue":
                    "<template><StorySection><ScrollNativeBody /></StorySection><StorySection><ScrollReaderBody /></StorySection><StorySection><ScrollChoreographyBody /></StorySection><FamilyTabs :members=\"m\" /></template>",
            },
        },
        "F2 — Scroll×3 merged to ONE motion/scroll.vue (3 <StorySection> registers over colocated bodies, no FamilyTabs; the vt/system/choreography wrappers deleted)",
        "F2 FamilyTabs re-introduced on the merged family page",
    );
    // F3 (born-RED): the aurora studio-helper dir still sits at the top level
    // (demo/stories/aurora/, matched by the ./*/*.vue route glob) → REDs F3.
    sab(
        { existsOverride: { "demo/stories/aurora/presets.ts": true } },
        "F3 — the aurora studio-helper dir nested under substrates/aurora/ (off the ./*/*.vue route glob)",
        "F3 top-level demo/stories/aurora/ helper dir (HEAD form)",
    );

    // ── ST-clause bites — the demo SUB-TYPE taxonomy (BG.W-STORY-PAGE-API §4-D). ──
    // ST1 (born-RED HEAD form): a missing sub-type member → REDs ST1.
    sab(
        { existsOverride: { "demo/chassis/DemoStage.vue": false } },
        "ST1 — the five demo sub-types exist in demo/chassis/ + the barrel exports each",
        "ST1 a missing sub-type member (HEAD absent-dir form)",
    );
    // ST2: a slotless sub-type source (the C1·R1 slot-drop shim — content dropped;
    // a glass tier is present so ONLY the slot-drop arm fires) → REDs ST2.
    sab(
        {
            srcOverride: {
                "demo/chassis/DemoStage.vue": `<template><div class="glass-resting" /></template>`,
            },
        },
        "ST2 — each demo sub-type is a real slot-bearing composition (content is not dropped)",
        "ST2 a slotless sub-type (the slot-drop variant-shim)",
    );
    // ST3: a sub-type with a real slot but NO glass tier / no DemoSpecimen (a bare
    // opaque bg-card slab off the glass ladder) → REDs ST3.
    sab(
        {
            srcOverride: {
                "demo/chassis/DemoStage.vue": `<template><div class="bg-card rounded-card"><slot /></div></template>`,
            },
        },
        "ST3 — each demo sub-type composes the glassy-card conformity (a glass tier / DemoSpecimen)",
        "ST3 a bare bg-card slab off the glass ladder (no conformity)",
    );
    // ST4: a sub-type with ZERO live importers (the zero-importer DemoFrame shelf-ware
    // trap D1 retired) → REDs ST4. (vueCorpus isolated to a demo with no sub-type usage.)
    sab(
        {
            vueCorpus: [
                { path: "demo/foo.vue", text: `<template><div /></template>` },
            ],
            cssCorpus: [],
        },
        "ST4 — every demo sub-type is adopted (≥1 live importer, not zero-importer shelf-ware)",
        "ST4 a zero-importer sub-type (the DemoFrame shelf-ware trap)",
    );
    // ST5: a synthetic 6th `DemoFoo.vue` smuggled into the closed set → REDs ST5
    // (the anti-drift / anti-gameability arm — the roster is exactly the five).
    sab(
        {
            chassisVueBasenames: [
                "DemoStage.vue",
                "DemoSpecimen.vue",
                "DemoInteraction.vue",
                "DemoMatrix.vue",
                "DemoComposition.vue",
                "DemoFoo.vue",
            ],
        },
        "ST5 — the demo sub-type vocabulary is closed (exactly the five members on disk, no drift)",
        "ST5 a 6th sub-type smuggled into the closed set (drift)",
    );

    // ── CF self-test bites (BG.W-CONFIGURATOR-STANDARDIZE) ──
    // CF1: a named studio that does NOT compose <VizStudio> (the HEAD blob/fourier form —
    // a raw <Configurator> studio, not the shared chassis) → REDs CF1.
    sab(
        {
            srcOverride: {
                "demo/stories/substrates/blob.vue": `<template><StoryPage><ShowcaseFrame><Configurator /></ShowcaseFrame></StoryPage></template>`,
            },
        },
        "CF1 — the 3 procedural studios (aurora/blob/fourier) each compose the ONE VizStudio chassis",
        "CF1 a studio that does not compose <VizStudio> (the HEAD raw-Configurator form)",
    );
    // CF2 (offset): a substrate studio that floats a raw <Configurator> DIRECTLY inside a
    // <ShowcaseFrame> (the fourier/blob OFFSET the wave retires) → REDs CF2.
    sab(
        {
            vueCorpus: [
                {
                    path: "demo/stories/substrates/x.vue",
                    text: `<template><StorySection><ShowcaseFrame pad="lg" tier="quiet">\n<Configurator :presets="p"><template #stage /></Configurator></ShowcaseFrame></StorySection></template>`,
                },
            ],
            cssCorpus: [],
        },
        "CF2 — no substrate studio floats a raw <Configurator> in a <ShowcaseFrame> or an inline text-display-3 masthead (the anti-fork bite)",
        "CF2 a raw <Configurator> floated in a <ShowcaseFrame> (the OFFSET)",
    );
    // CF2 (masthead): a substrate studio that carries an inline text-display-3 <header>
    // masthead (the double-header the F7.2 aurora fix killed) → REDs CF2.
    sab(
        {
            vueCorpus: [
                {
                    path: "demo/stories/substrates/y.vue",
                    text: `<template><StoryPage><header class="flex flex-col gap-1"><span class="section-label">Substrates · Foo</span><span class="text-display-3 font-display">Foo Studio</span></header></StoryPage></template>`,
                },
            ],
            cssCorpus: [],
        },
        "CF2 — no substrate studio floats a raw <Configurator> in a <ShowcaseFrame> or an inline text-display-3 masthead (the anti-fork bite)",
        "CF2 an inline text-display-3 <header> masthead (the double-header)",
    );
    // CF2 (distinguishing): a substrate studio whose text-display-3 / ShowcaseFrame-over-
    // Configurator mention lives ONLY in a COMMENT must NOT trip CF2 (the corpus is
    // comment-STRIPPED — prose is provenance, not a live seam), AND the sanctioned
    // concentric/liquid-grid raw <Configurator>-in-<StorySection> (no ShowcaseFrame
    // wrapper) is a valid DIRECT composition that never trips.
    sabNot(
        {
            vueCorpus: [
                {
                    path: "demo/stories/substrates/z.vue",
                    text: stripComments(
                        `<!-- the retired inline <header> masthead at text-display-3, and the <ShowcaseFrame> <Configurator> OFFSET, are GONE -->\n<template><StorySection><Configurator :presets="p"><template #stage /></Configurator></StorySection></template>`,
                    ),
                },
            ],
            cssCorpus: [],
        },
        "CF2 — no substrate studio floats a raw <Configurator> in a <ShowcaseFrame> or an inline text-display-3 masthead (the anti-fork bite)",
        "CF2 comment-strip + sanctioned raw-Configurator-in-StorySection distinguishing bite",
    );

    // CD1: an OLD composable file still on disk (the HEAD half-move form) → REDs CD1.
    sab(
        { existsOverride: { "demo/composables/useStoryNavigation.ts": true } },
        "CD1 — demo/composables/ is dissolved (the dir + both old composable files DEFINITION-ABSENT)",
        "CD1 old composable file survives on disk (half-move)",
    );
    // CD2: a re-home target absent (the composable deleted, never re-homed) → REDs CD2.
    sab(
        { existsOverride: { "demo/chassis/useStoryNavigation.ts": false } },
        "CD2 — each dissolved composable is re-homed (chassis/useStoryNavigation + shell/useContextualDockLayers present)",
        "CD2 re-home target absent (delete-not-move)",
    );
    // CD3: a stale `../composables/useStoryNavigation` import survives → REDs CD3
    //   (the broken-import dangle the clean move forbids).
    sab(
        {
            moveCorpus: [
                {
                    path: "demo/layout/AppShell.vue",
                    text: `import { useStoryNavigation } from "../composables/useStoryNavigation";`,
                },
            ],
        },
        "CD3 — the composables dissolve is clean (no demo import references the retired demo/composables/ path)",
        "CD3 stale demo/composables import survives",
    );
    // CD3 (distinguishing): a `composables/` mention INSIDE a comment must NOT red
    //   (the corpus is comment-stripped — a prose note is provenance, never a dangle).
    sabNot(
        {
            moveCorpus: [
                {
                    path: "demo/layout/AppShell.vue",
                    text: stripComments(
                        `// moved off ../composables/useStoryNavigation to ../chassis/\n<template><div/></template>`,
                    ),
                },
            ],
        },
        "CD3 — the composables dissolve is clean (no demo import references the retired demo/composables/ path)",
        "CD3 comment-strip distinguishing bite",
    );

    // ── CL-clause bites (BH.B3 δ34 chassis-colocation) — each recreates a HEAD-state
    // defect the move must not carry. existsOverride drives the fileExists() probes
    // CL1/CL2 read; storiesRootEntries drives the CL3 stray scan.
    // CL1: a colocated home MISSING (the move deleted instead of re-homed) → REDs CL1.
    sab(
        { existsOverride: { "demo/chassis/page/StoryPage.vue": false } },
        "CL1 — every flat-root chassis is re-homed to its colocated dir (chassis/<group>/ · shell/ · configurator/presets/ present)",
        "CL1 a colocated chassis home is absent (delete-not-rehome)",
    );
    // CL2: a flat-root SOURCE still on disk (the HEAD form / a copy-not-move husk) → REDs CL2.
    sab(
        { existsOverride: { "demo/stories/StoryPage.vue": true } },
        "CL2 — the flat-root chassis are gone (each moved source DEFINITION-ABSENT, no dual-path husk)",
        "CL2 a flat-root chassis survives (dual-path husk, HEAD form)",
    );
    // CL3 (dir husk): the dissolved demo/layout/ dir still present → REDs CL3.
    sab(
        { existsOverride: { "demo/layout": true }, storiesRootEntries: [] },
        "CL3 — the dissolved flat-root dirs are extirpated (demo/layout + demo/presets gone) + no stray flat chassis at the stories root",
        "CL3 a dissolved flat-root dir husk survives",
    );
    // CL3 (stray-drift): a flat chassis .vue re-drifts to the stories root → REDs CL3.
    sab(
        { existsOverride: {}, storiesRootEntries: ["StoryPage.vue", "manifest.ts"] },
        "CL3 — the dissolved flat-root dirs are extirpated (demo/layout + demo/presets gone) + no stray flat chassis at the stories root",
        "CL3 a flat chassis re-drifts to the stories root",
    );

    // ── M-clause bites (BH.B3 δ5/δ6 manifest-carve+glob) — each recreates a defect
    // the carve must not carry. The M2/M3 synthetics carry every OTHER M-clause
    // literal so exactly the sabotaged clause reds.
    const M_HEAD =
        `import { makeLazy } from "./manifest/lazy";\n` +
        `interface Story { subpath?: string; heroScale?: HeroScale; depth?: StoryDepth }\n` +
        `const SUBPATHS: Record<string, string> = {};\n` +
        `export const FOLDED_STORY_IDS = new Set([]);\n` +
        `export const DECLARED_FAMILY_SUBPATHS = new Set([]);\n`;
    const M_ROWS = Array.from({ length: 90 }, (_, i) => `s("c", "id${i}", "T");`).join(
        "\n",
    );
    // M1: the lazy resolver leaf is absent (the carve deleted-not-colocated / a
    //   re-inlined HEAD husk) → REDs M1.
    sab(
        { lazyExists: false },
        "M1 — the manifest `lazy` resolver is colocated (manifest/lazy.ts exports makeLazy, manifest.ts imports it, no inline resolver husk)",
        "M1 the colocated lazy resolver leaf is absent",
    );
    // M2: the s() rows moved OUT of manifest.ts (0 rows) — the foreign-gate-breaking
    //   full row-split → REDs M2 (the single-source contract broken).
    sab(
        {
            manifestSrc:
                M_HEAD +
                `const modules = import.meta.glob<{ default: Component }>("./*/*.vue");\n`,
        },
        "M2 — the manifest single-source contract preserved (s() rows + SUBPATHS + FOLDED/DECLARED + Story interface fields still in manifest.ts)",
        "M2 the s() rows moved out of manifest.ts",
    );
    // M3: the glob adopts the dropped per-story `./*/*/index.vue` dir-form → REDs M3.
    sab(
        {
            manifestSrc:
                M_HEAD +
                `const modules = import.meta.glob<{ default: Component }>("./*/*/index.vue");\n` +
                M_ROWS,
        },
        "M3 — the δ6 glob stays FLAT `./*/*.vue` (no per-story `index.vue` dir-form contrivance)",
        "M3 the glob adopts the dropped ./*/*/index.vue dir-form",
    );

    // ── WC-clause bites (BG.W-COLORS-WATERCOLOR-SWATCH) — each recreates a defect
    // the fixed colors pane must not carry. GOOD_WC satisfies every WC clause; each
    // bite mutates ONE axis. WC_FILE is the literal path detect() reads via readSrc.
    const WC_KEY = "demo/stories/foundations/colors.vue";
    const GOOD_WC =
        `import { WatercolorDot } from "@glass/components/custom/watercolor-dot";\n` +
        `const SWATCH_SIZE = "7.5rem";\n` +
        `const STAGGER_REM = [0, 1.6, 0.5];\n` +
        `<template><div class="scroll-cascade scroll-cascade--columns">` +
        `<div :style="{ '--col': i, marginBlockStart: \`\${STAGGER_REM[i]}rem\` }">` +
        `<WatercolorDot :color="\`var(--section-color-\${i})\`" :seed="\`s-\${i}\`" animate ` +
        `:style="{ width: SWATCH_SIZE, height: SWATCH_SIZE }" /></div></div></template>`;
    // WC1 (born-RED HEAD form): the flat h-24 chip, no <WatercolorDot> → REDs WC1.
    sab(
        {
            srcOverride: {
                [WC_KEY]:
                    `<template><div class="scroll-cascade scroll-cascade--columns">` +
                    `<div :style="{ '--col': i }"><div class="h-24 rounded-lg" ` +
                    `:style="{ background: \`var(--section-color-\${i})\` }" /></div></div></template>`,
            },
        },
        "WC1 — the colors ramp composes the shipped <WatercolorDot> primitive over --section-color-N",
        "WC1 flat-chip HEAD form (no <WatercolorDot>)",
    );
    // WC2: a half-migration — <WatercolorDot> present BUT a flat background chip
    // still paints the ramp beside it → REDs WC2 (the good axes stay green).
    sab(
        {
            srcOverride: {
                [WC_KEY]:
                    GOOD_WC.replace(
                        "</div></div></template>",
                        `</div><div :style="{ background: \`var(--section-color-\${i})\` }" /></div></template>`,
                    ),
            },
        },
        "WC2 — no flat-chip regression (the ramp is not a raw background: var(--section-color-N) chip)",
        "WC2 a surviving flat background: var(--section-color-N) chip",
    );
    // WC3: a too-small swatch (SWATCH_SIZE = 6rem = 96px, the retired chip size) →
    // REDs WC3 (the >=112px floor).
    sab(
        {
            srcOverride: {
                [WC_KEY]: GOOD_WC.replace('"7.5rem"', '"6rem"'),
            },
        },
        "WC3 — the ramp swatches are sized ≥112px (larger than the retired 96px flat chip)",
        "WC3 a sub-112px swatch (96px, the retired chip)",
    );
    // WC4: a flat stagger (adjacent-equal offsets [0, 0, 1]) → REDs WC4 (the
    // hand-laid distinct-adjacency read is gone).
    sab(
        {
            srcOverride: {
                [WC_KEY]: GOOD_WC.replace(
                    "[0, 1.6, 0.5]",
                    "[0, 0, 1]",
                ),
            },
        },
        "WC4 — the ramp carries a hand-laid stagger (adjacent stops carry distinct block-offsets)",
        "WC4 a flat stagger (adjacent-equal block-offsets)",
    );
    // WC5: a demo-local @keyframes minted in the colors pane (the KISS-violating
    // fork the shipped .scroll-cascade--columns register makes unnecessary) → REDs WC5.
    sab(
        {
            srcOverride: {
                [WC_KEY]:
                    GOOD_WC +
                    `\n<style>@keyframes colors-local-rise { to { opacity: 1; } }</style>`,
            },
        },
        "WC5 — the ramp enters on scroll via the existing .scroll-cascade--columns register (no demo-local @keyframes)",
        "WC5 a demo-local @keyframes in the colors pane",
    );

    // ── PR-clause bites (BG.W-PRESET-RIBBON-TOP / F7.6) — each recreates the HEAD
    // (failing) state, so the arm cannot silently regress. ──
    // PR1 (born-RED HEAD form): the aurora studio passes NO gallery-placement (the
    // default aside gutter) → REDs PR1.
    sab(
        {
            srcOverride: {
                "demo/stories/substrates/aurora.vue": `<template><VizStudio heading="Aurora" scroll-mode="never"><template #presets><PresetPickerRow /></template></VizStudio></template>`,
            },
        },
        'PR1 — the aurora studio pins the preset gallery as a top ribbon (gallery-placement="top")',
        "PR1 aurora studio passes no gallery-placement (HEAD aside form)",
    );
    // PR1 (comment-strip anti-evasion): a gallery-placement="top" that lives ONLY in a
    // comment does NOT satisfy PR1 (the corpus is comment-stripped — a prose mention is
    // provenance, never a live bind) → still REDs PR1.
    sab(
        {
            srcOverride: {
                "demo/stories/substrates/aurora.vue": `<!-- gallery-placement="top" is the F7.6 ribbon --><template><VizStudio heading="Aurora" /></template>`,
            },
        },
        'PR1 — the aurora studio pins the preset gallery as a top ribbon (gallery-placement="top")',
        "PR1 comment-only gallery-placement does not satisfy the bind (comment-strip)",
    );
    // PR2 (born-RED HEAD form): VizStudio hardcodes the aside default (no
    // galleryPlacement prop, no :gallery-placement bind) → REDs PR2. vueCorpus empty so
    // the D7 masthead-fill arm never confounds the bite.
    sab(
        {
            srcOverride: {
                "demo/stories/substrates/VizStudio.vue": `defineProps<{ heading?: string }>();\n<template><Configurator :aside-side="'right'"><template #stage /></Configurator></template>`,
            },
            vueCorpus: [],
        },
        "PR2 — VizStudio threads galleryPlacement to <Configurator> (single-writer passthrough)",
        "PR2 VizStudio hardcodes the aside default (HEAD form)",
    );
    // PR3 (born-RED HEAD form): no top-scoped preset-tile floor in configurator.css →
    // REDs PR3 (only the base `.configurator-preset-tile` rule, no top placement).
    sab(
        {
            configCssSrc: `.configurator-preset-tile { inline-size: clamp(160px, 22vw, 232px); }`,
        },
        "PR3 — the top-placed preset tiles read a LARGE floor (≥72px, top-scoped configurator.css rule)",
        "PR3 no top-scoped preset-tile floor (HEAD form)",
    );
    // PR3 (sub-72 distinguishing): a top-scoped tile rule whose clamp floor is sub-72px
    // → REDs PR3 (the ≥72px LARGE-ribbon floor — a small ribbon does not clear it).
    sab(
        {
            configCssSrc: `[data-slot="configurator"][data-gallery="top"] .configurator-preset-tile { inline-size: clamp(64px, 20vw, 120px); }`,
        },
        "PR3 — the top-placed preset tiles read a LARGE floor (≥72px, top-scoped configurator.css rule)",
        "PR3 a sub-72px top-scoped tile floor",
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
        `  D5 deletes consumed (δ1)  : ${facts["D5 — the deletes are consumed (no demo file references a retired chassis's deleted CSS by name)"]}`,
    );
    console.log(
        `  D6 code-fold single-source: ${facts["D6 — the CodeBlock→Code fold is single-source (Code + CodeBlock only, no third fork)"]}  (register: ${JSON.stringify(facts.codeVueBasenames)})`,
    );
    console.log(
        `  D7 unified-header 1-source : ${facts["D7 — VizStudio unified-header single-source (no #masthead double-header seam)"]}  (mastheadFills: ${JSON.stringify(facts.d7?.mastheadFills ?? [])})`,
    );
    console.log(
        `  CF1 studios→VizStudio     : ${facts["CF1 — the 3 procedural studios (aurora/blob/fourier) each compose the ONE VizStudio chassis"]}  (missing: ${JSON.stringify(facts.cf1?.missing ?? [])})`,
    );
    console.log(
        `  CF2 anti-fork (no OFFSET) : ${facts["CF2 — no substrate studio floats a raw <Configurator> in a <ShowcaseFrame> or an inline text-display-3 masthead (the anti-fork bite)"]}  (offenders: ${JSON.stringify(facts.cf2?.offenders ?? [])})`,
    );
    console.log(
        `  T1 SplitChars stagger-drop: ${facts["T1 — SplitChars `stagger?:boolean` DROPS .char-stagger (no mount-fire-before-reveal)"]}`,
    );
    console.log(
        `  T2 --char-stagger-step DRY: ${facts["T2 — --char-stagger-step minted once + single-sourced (off the * 30ms literal)"]}`,
    );
    console.log(
        `  T3 useSectionReveal wired : ${facts["T3 — useSectionReveal exists w/ 4 sweep hooks + FOUC-safe arm + provide key"]}`,
    );
    console.log(
        `  T4 two-register + no-2×    : ${facts["T4 — StorySection two-register + gl-char-rise CSS + page provides singleton, no double-cascade"]}`,
    );
    console.log(
        `  E1 demo-earns-page        : ${facts["E1 — demo-earns-page (no undeclared subpath shared by >1 routed page)"]}  (routed: ${facts.e1?.routedCount}, undeclared collisions: ${JSON.stringify(facts.e1?.collisions ?? [])})`,
    );
    console.log(
        `  E2 field-warm-default     : ${facts["E2 — field-warm-default (DockStage default is warm heroAuroraConfig, not OPENAI_SKY cerulean)"]}  (default: ${facts.e2?.default})`,
    );
    console.log(
        `  E3 shrink-not-fade        : ${facts["E3 — shrink-not-fade (title-collapse shrink leads; subordinate fade follows the pin, not scroll 0)"]}`,
    );
    console.log(
        `  F1 timeline×3→1 merged    : ${facts["F1 — Timeline×3 merged to ONE data/timeline.vue (3 <StorySection> registers over colocated bodies; the segmented/continuous wrappers deleted)"]}  (sections: ${facts.f1?.sectionCount})`,
    );
    console.log(
        `  F2 scroll×3→1 merged      : ${facts["F2 — Scroll×3 merged to ONE motion/scroll.vue (3 <StorySection> registers over colocated bodies, no FamilyTabs; the vt/system/choreography wrappers deleted)"]}  (sections: ${facts.f2?.sectionCount}, noFamilyTabs: ${facts.f2?.forbidGone})`,
    );
    console.log(
        `  F3 aurora nested          : ${facts["F3 — the aurora studio-helper dir nested under substrates/aurora/ (off the ./*/*.vue route glob)"]}  (topLevelGone: ${facts.f3?.topLevelGone}, nested: ${facts.f3?.nestedPresent})`,
    );
    console.log(
        `  ST1 sub-types exist+barrel: ${facts["ST1 — the five demo sub-types exist in demo/chassis/ + the barrel exports each"]}`,
    );
    console.log(
        `  ST2 slot-bearing (no drop): ${facts["ST2 — each demo sub-type is a real slot-bearing composition (content is not dropped)"]}`,
    );
    console.log(
        `  ST3 glassy-card conformity: ${facts["ST3 — each demo sub-type composes the glassy-card conformity (a glass tier / DemoSpecimen)"]}`,
    );
    console.log(
        `  ST4 adopted (≥1 importer) : ${facts["ST4 — every demo sub-type is adopted (≥1 live importer, not zero-importer shelf-ware)"]}  (importers: ${JSON.stringify(Object.fromEntries(Object.entries(facts.st4?.importers ?? {}).map(([k, v]) => [k, v.length])))})`,
    );
    console.log(
        `  ST5 closed vocabulary     : ${facts["ST5 — the demo sub-type vocabulary is closed (exactly the five members on disk, no drift)"]}  (${JSON.stringify(facts.st5?.basenames ?? [])})`,
    );
    console.log(
        `  CD1 composables dissolved : ${facts["CD1 — demo/composables/ is dissolved (the dir + both old composable files DEFINITION-ABSENT)"]}  (survivors: ${JSON.stringify(facts.cdDissolveSurvivors ?? [])})`,
    );
    console.log(
        `  CD2 re-homed (move not del): ${facts["CD2 — each dissolved composable is re-homed (chassis/useStoryNavigation + shell/useContextualDockLayers present)"]}  (gaps: ${JSON.stringify(facts.cdRehomeGaps ?? [])})`,
    );
    console.log(
        `  CD3 clean move (no dangle) : ${facts["CD3 — the composables dissolve is clean (no demo import references the retired demo/composables/ path)"]}  (dangles: ${JSON.stringify(facts.cdDangles ?? [])})`,
    );
    console.log(
        `  CL1 chassis re-homed      : ${facts["CL1 — every flat-root chassis is re-homed to its colocated dir (chassis/<group>/ · shell/ · configurator/presets/ present)"]}  (homeGaps: ${JSON.stringify(facts.cl1?.homeGaps ?? [])})`,
    );
    console.log(
        `  CL2 flat-root extirpated  : ${facts["CL2 — the flat-root chassis are gone (each moved source DEFINITION-ABSENT, no dual-path husk)"]}  (survivors: ${JSON.stringify(facts.cl2?.survivors ?? [])})`,
    );
    console.log(
        `  CL3 dirs gone + no drift  : ${facts["CL3 — the dissolved flat-root dirs are extirpated (demo/layout + demo/presets gone) + no stray flat chassis at the stories root"]}  (dirHusks: ${JSON.stringify(facts.cl3?.dirHusks ?? [])}, strays: ${JSON.stringify(facts.cl3?.strays ?? [])})`,
    );
    console.log(
        `  WC1 colors→WatercolorDot  : ${facts["WC1 — the colors ramp composes the shipped <WatercolorDot> primitive over --section-color-N"]}`,
    );
    console.log(
        `  WC2 no flat-chip regress  : ${facts["WC2 — no flat-chip regression (the ramp is not a raw background: var(--section-color-N) chip)"]}`,
    );
    console.log(
        `  WC3 swatch ≥112px         : ${facts["WC3 — the ramp swatches are sized ≥112px (larger than the retired 96px flat chip)"]}  (px: ${facts.wc3?.px})`,
    );
    console.log(
        `  WC4 hand-laid stagger     : ${facts["WC4 — the ramp carries a hand-laid stagger (adjacent stops carry distinct block-offsets)"]}  (stops: ${facts.wc4?.count}, distinct: ${facts.wc4?.distinct})`,
    );
    console.log(
        `  WC5 scroll-cascade entrance: ${facts["WC5 — the ramp enters on scroll via the existing .scroll-cascade--columns register (no demo-local @keyframes)"]}`,
    );
    console.log(
        `  PR1 aurora ribbon (top)   : ${facts['PR1 — the aurora studio pins the preset gallery as a top ribbon (gallery-placement="top")']}  (pinsTop: ${facts.pr1?.pinsTop})`,
    );
    console.log(
        `  PR2 VizStudio threads axis: ${facts["PR2 — VizStudio threads galleryPlacement to <Configurator> (single-writer passthrough)"]}  (prop: ${facts.pr2?.prop}, bind: ${facts.pr2?.bind})`,
    );
    console.log(
        `  PR3 ribbon tile ≥72px     : ${facts["PR3 — the top-placed preset tiles read a LARGE floor (≥72px, top-scoped configurator.css rule)"]}  (minPx: ${facts.pr3?.minPx})`,
    );
    console.log(
        `  self-test (bite proof)    : OK — ${selfTestCount} synthetic sabotages handled (D1 + D2 + D3×2 incl. comment-strip + D4 + D5 + D6×2 + D7×3 incl. comment-strip + T1-T4 + E1×2 incl. declared-family + E2 + E3 + F1 + F2×2 incl. FamilyTabs + F3 + ST1-ST5 + CF1 + CF2×3 incl. comment-strip + CD1 + CD2 + CD3×2 incl. comment-strip + CL1 + CL2 + CL3×2 incl. dir-husk + stray-drift + M1 + M2 + M3 + WC1-WC5 + PR1×2 incl. comment-strip + PR2 + PR3×2 incl. sub-72)`,
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
        if (facts.deadCssRefs?.length)
            console.log(`  dead css refs   : ${JSON.stringify(facts.deadCssRefs)}`);
        if (facts.codeForks?.length)
            console.log(`  code forks      : ${JSON.stringify(facts.codeForks)}`);
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
