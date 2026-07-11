#!/usr/bin/env node
// BB.W-EASING-PRIMITIVE — the published <EasingPicker>/<EasingConfigurator> on
// /easing, the boundary law made code (proof:easing-primitive).
//
// The C-3 fold: the motion family shipped TWO live curve editors (the curve-
// gallery's BezierEditor + StepsEditor) each a DEMO-ONLY interim NAMING this wave as
// its successor. This gate is the born-RED→GREEN device-free SOURCE arm for the ONE
// published primitive the demos re-home onto. The PAINTED truth (the picker plots
// the REAL value.js twin over --motion-accent, both modes, the re-parseable readout)
// is the binding visual truth proven by the π live readback captured in
// docs/tranches/BB/audit/visual/W-EASING-PRIMITIVE-DELTA.md — this gate is the no-
// device CI half. A source-green/visually-broken gap is the AZ P-1 failure class;
// both halves + the proof:ba-gestalt motion-band verdict must hold for a clean close.
//
// Five falsifiable witnesses (each born-RED at HEAD pre-wave, driven GREEN by the
// wave):
//
//   W1 — THE PRIMITIVE EXISTS ONCE ON /easing. <EasingPicker> + <EasingConfigurator>
//        exist in EXACTLY ONE place (src/components/custom/easing/), published via
//        the src/subpaths/easing.ts barrel + the package.json ./easing exports entry,
//        with the colocation dir convention satisfied (composables/useEasingPicker.ts
//        + constants.ts + README.md). Bite (anti-evasion): the ./easing entry +
//        typesVersions row resolve (the subpath-publication-is-binary invariant — a
//        primitive in src/ that does not PUBLISH fails, the K.WS silent-miss class).
//        RED at HEAD: the dir/subpath/export are absent.
//   W2 — THE BOUNDARY LAW HOLDS (math COMPOSED, not forked). useEasingPicker imports
//        its curve callables FROM value.js (steppedEase/jumpTerms/bezierPresets/
//        CSSCubicBezier) AND re-implements NEITHER a staircase evaluator (Math.floor/
//        ceil(t*steps)) NOR a cubic-bezier Newton-solver (solveCubicBezier*) inline.
//        Bite: a re-home that leaves the value.js-equivalent math inline fails — the
//        math MUST be the value.js import. RED-equivalent at HEAD: vacuously absent.
//   W3 — NO FOURTH FORK (the demos re-homed; clean break). The two demo editors are
//        DELETED (curve-gallery/{StepsEditor,BezierEditor}.vue absent) AND
//        curve-gallery.vue imports <EasingPicker> from the LIBRARY subpath
//        (@mkbabb/glass-ui/easing or src/components/custom/easing / src/subpaths/
//        easing), NOT a demo-local SFC. Bite (the C-3 discipline): zero re-pasted
//        fourth editor SFC under demo/stories/motion/curve-gallery/. RED at HEAD:
//        both demo SFCs exist; curve-gallery imports them.
//   W4 — THE ≥2-CONSUMER BAR IS RECORDED BY CONSTRUCTION. curve-gallery (consumer #1)
//        mounts the picker in BOTH modes (a <EasingPicker mode="bezier"> AND a
//        <EasingPicker mode="steps"> binding — two live in-repo bindings so the bar
//        does not hang on the cross-repo consumer alone) AND the PROGRESS/DELTA names
//        the value.js GradientPane consumer-#2 contract. Bite: a single-binding
//        primitive (only one mode) fails. RED-equivalent at HEAD: no primitive.
//   W5 — THE CANON + THE BOUNDARY LAW ARE RECORDED. CLAUDE.md carries the
//        <EasingPicker> section (the /easing subpath + the boundary law + the C-3
//        fold DISCHARGED); design-idioms.md homes the editor-on-Configurator idiom;
//        EasingPicker/EasingConfigurator/EasingPickerMode types publish to
//        api/index.ts. RED at HEAD: no such section/idiom/api line.
//
// House style mirrors proof-surface-axis.mjs / proof-dock-rail-hairline.mjs: ESM
// .mjs, comment-strip first (false-witness discipline), a pure exported detector, a
// byte-stable JSON artefact via gate-output, a human summary, process.exit(1) on any
// violation.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { readCanon } from "./lib/canon-doc.mjs";
import { readDesign } from "./lib/design-docs.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

const P = {
    EASING_DIR: resolve(ROOT, "src/components/custom/easing"),
    PICKER_VUE: resolve(ROOT, "src/components/custom/easing/EasingPicker.vue"),
    CONFIGURATOR_VUE: resolve(ROOT, "src/components/custom/easing/EasingConfigurator.vue"),
    COMPOSABLE_TS: resolve(ROOT, "src/components/custom/easing/composables/useEasingPicker.ts"),
    CONSTANTS_TS: resolve(ROOT, "src/components/custom/easing/constants.ts"),
    BARREL_TS: resolve(ROOT, "src/components/custom/easing/index.ts"),
    README_MD: resolve(ROOT, "src/components/custom/easing/README.md"),
    SUBPATH_TS: resolve(ROOT, "src/subpaths/easing.ts"),
    PACKAGE_JSON: resolve(ROOT, "package.json"),
    API_INDEX_TS: resolve(ROOT, "src/api/index.ts"),
    CURVE_GALLERY_VUE: resolve(ROOT, "demo/stories/motion/curve-gallery.vue"),
    CURVE_GALLERY_DIR: resolve(ROOT, "demo/stories/motion/curve-gallery"),
    DEMO_STEPS_VUE: resolve(ROOT, "demo/stories/motion/curve-gallery/StepsEditor.vue"),
    DEMO_BEZIER_VUE: resolve(ROOT, "demo/stories/motion/curve-gallery/BezierEditor.vue"),
    PROGRESS_MD: resolve(ROOT, "docs/tranches/BB/PROGRESS.md"),
    DELTA_MD: resolve(ROOT, "docs/tranches/BB/audit/visual/W-EASING-PRIMITIVE-DELTA.md"),
    ARTIFACT: gateArtifactPath("GLASS_UI_EASING_PRIMITIVE_ARTIFACT", "BB-easing-primitive"),
};

function safeRead(path) {
    try {
        return readFileSync(path, "utf8");
    } catch {
        return "";
    }
}

function blankRange(text, start, end) {
    let out = "";
    for (let i = start; i < end; i++) out += text[i] === "\n" ? "\n" : " ";
    return out;
}

// Strip /* */ + // comments (TS/JS, false-witness discipline). Blanks the span so
// offsets are preserved.
function stripBlockComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text[i] === "/" && text[i + 1] === "*") {
            const end = text.indexOf("*/", i + 2);
            const stop = end === -1 ? text.length : end + 2;
            result += blankRange(text, i, stop);
            i = stop;
        } else if (text[i] === "/" && text[i + 1] === "/") {
            let end = text.indexOf("\n", i + 2);
            if (end === -1) end = text.length;
            result += blankRange(text, i, end);
            i = end;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

// Strip Vue SFC `<!-- … -->` HTML comments — a commented-out import/binding must not
// satisfy or trip a witness.
function stripHtmlComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text.startsWith("<!--", i)) {
            const end = text.indexOf("-->", i + 4);
            const stop = end === -1 ? text.length : end + 3;
            result += blankRange(text, i, stop);
            i = stop;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

/**
 * The W-EASING-PRIMITIVE detector. Pure: takes the comment-stripped sources, returns
 * `{ facts, violations }`. Each witness pushes a falsifiable violation string.
 */
export function detectEasingPrimitive(sources) {
    const violations = [];

    const pickerVue = stripHtmlComments(stripBlockComments(sources.pickerVue ?? ""));
    const configuratorVue = stripHtmlComments(stripBlockComments(sources.configuratorVue ?? ""));
    const composableTs = stripBlockComments(sources.composableTs ?? "");
    const apiTs = stripBlockComments(sources.apiTs ?? "");
    const curveGalleryVue = stripHtmlComments(stripBlockComments(sources.curveGalleryVue ?? ""));
    // Markdown prose — read raw (no //-strip would mangle URLs / prose; not owed).
    const claudeMd = sources.claudeMd ?? "";
    const designIdiomsMd = sources.designIdiomsMd ?? "";
    const progressMd = sources.progressMd ?? "";
    const deltaMd = sources.deltaMd ?? "";

    // ── W1 — the primitive exists ONCE on /easing ─────────────────────────────
    const dirExists = sources.dirExists === true;
    const pickerExists = (sources.pickerVue ?? "") !== "";
    const configuratorExists = (sources.configuratorVue ?? "") !== "";
    const composableExists = (sources.composableTs ?? "") !== "";
    const constantsExists = sources.constantsExists === true;
    const readmeExists = sources.readmeExists === true;
    const subpathBarrel = sources.subpathTs ?? "";
    const subpathReExports = /export\s+\*\s+from\s+["']\.\.\/components\/custom\/easing["']/.test(
        stripBlockComments(subpathBarrel),
    );
    const exportsEntry = sources.packageHasExportsEntry === true;
    const typesVersionsRow = sources.packageHasTypesVersionsRow === true;
    if (!dirExists) violations.push("W1: src/components/custom/easing/ does not exist (the primitive is unminted).");
    if (!pickerExists) violations.push("W1: EasingPicker.vue is absent.");
    if (!configuratorExists) violations.push("W1: EasingConfigurator.vue is absent (the chassis-seated register).");
    if (!composableExists) violations.push("W1: composables/useEasingPicker.ts is absent (the colocation composable clause).");
    if (!constantsExists) violations.push("W1: constants.ts is absent (the colocation constants clause).");
    if (!readmeExists) violations.push("W1: README.md is absent (the colocation README clause).");
    if (!subpathReExports) violations.push("W1: src/subpaths/easing.ts does not re-export ../components/custom/easing (the subpath barrel).");
    if (!exportsEntry) violations.push("W1: package.json carries no `./easing` exports entry (the subpath-publication-is-binary invariant — a primitive that does not PUBLISH fails).");
    if (!typesVersionsRow) violations.push("W1: package.json typesVersions carries no `easing` row (the dts publication probe).");

    // ── W2 — the boundary law holds (math COMPOSED, not forked) ───────────────
    // The composable imports the four value.js curve callables.
    const importsValueJs = /from\s+["']@mkbabb\/value\.js["']/.test(composableTs);
    const importsCSSCubic = /\bCSSCubicBezier\b/.test(composableTs);
    const importsSteppedEase = /\bsteppedEase\b/.test(composableTs);
    const importsBezierPresets = /\bbezierPresets\b/.test(composableTs);
    const importsJumpTerms = /\bjumpTerms\b/.test(composableTs);
    const composesMath =
        importsValueJs && importsCSSCubic && importsSteppedEase && importsBezierPresets && importsJumpTerms;
    if (!composesMath) {
        violations.push(
            `W2: useEasingPicker does not COMPOSE the value.js curve math (value.js:${importsValueJs} CSSCubicBezier:${importsCSSCubic} steppedEase:${importsSteppedEase} bezierPresets:${importsBezierPresets} jumpTerms:${importsJumpTerms}).`,
        );
    }
    // The anti-fork bite: no hand-rolled staircase evaluator nor cubic-bezier solver
    // inline in the easing dir (the boundary-law fork forbidden — the math is
    // value.js's). The staircase fork is `Math.floor/ceil(t * steps...)`; the bezier
    // fork is a `solveCubicBezier*` Newton-solver re-implementation.
    const easingDirCode = `${composableTs}\n${pickerVue}\n${configuratorVue}`;
    const forksStaircase = /Math\.(floor|ceil)\s*\(\s*t\s*\*\s*steps/.test(easingDirCode);
    const forksBezierSolver = /\bsolveCubicBezier|\bnewtonRaphson|function\s+cubicBezier\b/.test(
        easingDirCode,
    );
    if (forksStaircase) {
        violations.push(
            "W2: a hand-rolled staircase evaluator (Math.floor/ceil(t * steps)) lives inline in custom/easing/ — the staircase math MUST be the value.js steppedEase import (the boundary-law fork forbidden).",
        );
    }
    if (forksBezierSolver) {
        violations.push(
            "W2: a hand-rolled cubic-bezier solver (solveCubicBezier/newtonRaphson/cubicBezier) lives inline in custom/easing/ — the bezier math MUST be the value.js CSSCubicBezier import (the boundary-law fork forbidden).",
        );
    }

    // ── W3 — no fourth fork (the demos re-homed; clean break) ──────────────────
    const demoStepsPresent = sources.demoStepsPresent === true;
    const demoBezierPresent = sources.demoBezierPresent === true;
    if (demoStepsPresent) {
        violations.push("W3: demo StepsEditor.vue still exists (the re-home did not delete the fork — no alias, clean break).");
    }
    if (demoBezierPresent) {
        violations.push("W3: demo BezierEditor.vue still exists (the re-home did not delete the fork — no alias, clean break).");
    }
    // curve-gallery imports the picker from the LIBRARY surface (the published
    // primitive, NOT a demo-local SFC).
    const galleryImportsLibraryPicker =
        /import\s+(?:\{[^}]*\bEasingPicker\b[^}]*\}|EasingPicker)\s+from\s+["'](?:@mkbabb\/glass-ui\/easing|[^"']*subpaths\/easing|[^"']*components\/custom\/easing)["']/.test(
            curveGalleryVue,
        );
    if (!galleryImportsLibraryPicker) {
        violations.push(
            "W3: curve-gallery.vue does not import <EasingPicker> from the LIBRARY subpath (@mkbabb/glass-ui/easing or src/components/custom/easing / src/subpaths/easing) — the C-3 no-fourth-fork discipline.",
        );
    }
    // Anti-evasion: no re-pasted fourth editor SFC under the curve-gallery dir (a
    // fourth fork). The only allowed residents are NON-editor helpers; an `*Editor.vue`
    // re-paste reds.
    const galleryDirEditorForks = (sources.curveGalleryDirEntries ?? []).filter((n) =>
        /Editor\.vue$/.test(n),
    );
    if (galleryDirEditorForks.length > 0) {
        violations.push(
            `W3: a fourth editor fork re-appeared under demo/stories/motion/curve-gallery/ [${galleryDirEditorForks.join(", ")}] — re-home into the published primitive, do not re-paste.`,
        );
    }

    // ── W4 — the ≥2-consumer bar is recorded by construction ──────────────────
    // curve-gallery binds the picker in BOTH modes (bezier + steps).
    const bindsBezierMode = /<EasingPicker[^>]*mode\s*=\s*["']bezier["']/.test(curveGalleryVue);
    const bindsStepsMode = /<EasingPicker[^>]*mode\s*=\s*["']steps["']/.test(curveGalleryVue);
    if (!(bindsBezierMode && bindsStepsMode)) {
        violations.push(
            `W4: curve-gallery does not mount <EasingPicker> in BOTH modes (bezier:${bindsBezierMode} steps:${bindsStepsMode}) — the ≥2-consumer bar at the mode level (a single-binding primitive fails).`,
        );
    }
    // The value.js GradientPane consumer-#2 contract is recorded by name in PROGRESS
    // AND the DELTA (the cross-repo CONSUME contract, value.js's call).
    const progressRecordsConsumer2 = /GradientPane/.test(progressMd) && /value\.?js/i.test(progressMd);
    const deltaRecordsConsumer2 = /GradientPane/.test(deltaMd);
    if (!progressRecordsConsumer2) {
        violations.push("W4: PROGRESS.md does not record the value.js GradientPane consumer-#2 contract by name.");
    }
    if (!deltaRecordsConsumer2) {
        violations.push("W4: the W-EASING-PRIMITIVE DELTA does not record the value.js GradientPane consumer-#2 contract.");
    }

    // ── W5 — the canon + the boundary law are recorded ─────────────────────────
    // BH.B5c re-home: the picker/boundary canon reads the easing README (canon home);
    // the editor-on-Configurator idiom reads the extracted docs/design/design-idioms.md.
    const claudeNamesPicker = /EasingPicker/.test(claudeMd) && /\/easing/.test(claudeMd);
    const claudeRecordsBoundary =
        /boundary law/i.test(claudeMd) && /value\.?js/i.test(claudeMd) && /keyframes\.?js/i.test(claudeMd);
    if (!claudeNamesPicker) {
        violations.push("W5: the easing README carries no <EasingPicker> / /easing section under the motion canon.");
    }
    if (!claudeRecordsBoundary) {
        violations.push("W5: the easing README does not record the boundary law (curve MATH = value.js · playback = keyframes.js · the editor = glass-ui).");
    }
    // docs/design/design-idioms.md is an IN-REPO extraction (B4c) — always present on a
    // fresh checkout. Kept a soft-skip only if the home is somehow empty; else bites.
    const submodulePresent = sources.submodulePresent !== false;
    const idiomHomesConfigurator =
        /Easing/.test(designIdiomsMd) &&
        (/EasingConfigurator/.test(designIdiomsMd) || /editor-on-(?:the-)?[Cc]onfigurator/.test(designIdiomsMd));
    if (!submodulePresent) {
        console.log(
            "  W5 design-idioms: SKIP-BY-POLICY — docs/design/design-idioms.md is empty/absent on this runner (the editor-on-Configurator idiom-home clause bites where present)",
        );
    } else if (!idiomHomesConfigurator) {
        violations.push("W5: design-idioms.md does not home the editor-on-Configurator idiom (the <EasingConfigurator> register).");
    }
    const apiPublishesTypes =
        /EasingPicker(?:Mode|Value)?/.test(apiTs) &&
        /from\s+["'][^"']*components\/custom\/easing["']/.test(apiTs);
    if (!apiPublishesTypes) {
        violations.push("W5: src/api/index.ts does not publish the EasingPicker/EasingConfigurator/EasingPickerMode types from ../components/custom/easing.");
    }

    const facts = {
        w1: {
            dirExists,
            pickerExists,
            configuratorExists,
            composableExists,
            constantsExists,
            readmeExists,
            subpathReExports,
            exportsEntry,
            typesVersionsRow,
        },
        w2: { composesMath, forksStaircase, forksBezierSolver },
        w3: { demoStepsPresent, demoBezierPresent, galleryImportsLibraryPicker, galleryDirEditorForks },
        w4: { bindsBezierMode, bindsStepsMode, progressRecordsConsumer2, deltaRecordsConsumer2 },
        w5: { claudeNamesPicker, claudeRecordsBoundary, idiomHomesConfigurator, apiPublishesTypes, submodulePresent },
    };
    return { facts, violations };
}

function readPackageFacts(pkgRaw) {
    let pkg = null;
    try {
        pkg = JSON.parse(pkgRaw);
    } catch {
        pkg = null;
    }
    const exportsEntry =
        !!pkg?.exports?.["./easing"] &&
        typeof pkg.exports["./easing"].types === "string" &&
        typeof pkg.exports["./easing"].import === "string";
    const tv = pkg?.typesVersions?.["*"]?.easing;
    const typesVersionsRow = Array.isArray(tv) && tv.length > 0;
    return { exportsEntry, typesVersionsRow };
}

function run() {
    const pkgRaw = safeRead(P.PACKAGE_JSON);
    const { exportsEntry, typesVersionsRow } = readPackageFacts(pkgRaw);
    const curveGalleryDirEntries = existsSync(P.CURVE_GALLERY_DIR)
        ? readdirSync(P.CURVE_GALLERY_DIR)
        : [];
    // docs/design/design-idioms.md is the extracted in-repo idiom home (B4c) — always
    // present on a fresh checkout. Present iff the readDesign body is non-empty.
    const designIdiomsMd = readDesign("design-idioms", "soft");
    const submodulePresent = designIdiomsMd.length > 0;

    const { facts, violations } = detectEasingPrimitive({
        submodulePresent,
        dirExists: existsSync(P.EASING_DIR),
        pickerVue: safeRead(P.PICKER_VUE),
        configuratorVue: safeRead(P.CONFIGURATOR_VUE),
        composableTs: safeRead(P.COMPOSABLE_TS),
        constantsExists: existsSync(P.CONSTANTS_TS),
        readmeExists: existsSync(P.README_MD),
        subpathTs: safeRead(P.SUBPATH_TS),
        packageHasExportsEntry: exportsEntry,
        packageHasTypesVersionsRow: typesVersionsRow,
        apiTs: safeRead(P.API_INDEX_TS),
        curveGalleryVue: safeRead(P.CURVE_GALLERY_VUE),
        curveGalleryDirEntries,
        demoStepsPresent: existsSync(P.DEMO_STEPS_VUE),
        demoBezierPresent: existsSync(P.DEMO_BEZIER_VUE),
        claudeMd: readCanon("component:easing", "soft"), // BH.B5c re-home off CLAUDE.md
        designIdiomsMd, // BH.B5c re-home off docs/precepts → docs/design via readDesign
        progressMd: safeRead(P.PROGRESS_MD),
        deltaMd: safeRead(P.DELTA_MD),
    });

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:easing-primitive",
        facts,
        violations,
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log("proof:easing-primitive — the published <EasingPicker>/<EasingConfigurator> on /easing (BB.W-EASING-PRIMITIVE)");
    console.log(
        `  W1 primitive exists ONCE on /easing : ${yn(
            facts.w1.dirExists &&
                facts.w1.pickerExists &&
                facts.w1.configuratorExists &&
                facts.w1.composableExists &&
                facts.w1.constantsExists &&
                facts.w1.readmeExists &&
                facts.w1.subpathReExports &&
                facts.w1.exportsEntry &&
                facts.w1.typesVersionsRow,
        )}`,
    );
    console.log(
        `  W2 boundary law (math COMPOSED)     : ${yn(
            facts.w2.composesMath && !facts.w2.forksStaircase && !facts.w2.forksBezierSolver,
        )}  (composes:${yn(facts.w2.composesMath)} staircase-fork:${yn(facts.w2.forksStaircase)} bezier-fork:${yn(facts.w2.forksBezierSolver)})`,
    );
    console.log(
        `  W3 no fourth fork (demos re-homed)  : ${yn(
            !facts.w3.demoStepsPresent &&
                !facts.w3.demoBezierPresent &&
                facts.w3.galleryImportsLibraryPicker &&
                facts.w3.galleryDirEditorForks.length === 0,
        )}`,
    );
    console.log(
        `  W4 ≥2-consumer bar recorded         : ${yn(
            facts.w4.bindsBezierMode &&
                facts.w4.bindsStepsMode &&
                facts.w4.progressRecordsConsumer2 &&
                facts.w4.deltaRecordsConsumer2,
        )}  (bezier:${yn(facts.w4.bindsBezierMode)} steps:${yn(facts.w4.bindsStepsMode)} gradient-pane:${yn(facts.w4.progressRecordsConsumer2 && facts.w4.deltaRecordsConsumer2)})`,
    );
    console.log(
        `  W5 canon + boundary law recorded    : ${yn(
            facts.w5.claudeNamesPicker &&
                facts.w5.claudeRecordsBoundary &&
                (facts.w5.submodulePresent === false || facts.w5.idiomHomesConfigurator) &&
                facts.w5.apiPublishesTypes,
        )}${facts.w5.submodulePresent === false ? " (idiom-home skip — submodule absent)" : ""}`,
    );

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
