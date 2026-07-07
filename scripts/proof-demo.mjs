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
// the absent `useSectionReveal` REDs T3, the heading-register-less StorySection REDs T4.

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
    reveal: "demo/stories/useSectionReveal.ts",
    storySection: "demo/stories/StorySection.vue",
    storyHeroCss: "demo/stories/story-hero.css",
    storyPage: "demo/stories/StoryPage.vue",
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
    heroCss: "demo/stories/story-hero.css",
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
        `  self-test (bite proof)    : OK — ${selfTestCount} synthetic sabotages handled (D1 + D2 + D3×2 incl. comment-strip + D4 + D5 + D6×2 + D7×3 incl. comment-strip + T1-T4 + E1×2 incl. declared-family + E2 + E3)`,
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
