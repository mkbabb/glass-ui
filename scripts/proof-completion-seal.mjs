#!/usr/bin/env node
// BC.W-AX-COMPLETION-SEAL — the hero-scale earned-GOLD completion seal (proof:completion-seal).
//
// The born-RED→GREEN device-free SOURCE arm for the library's one-shot gold-draw seal —
// the hero-scale gold mark that DRAWS itself onto a completion surface (a speedtest
// finishes, a survey submits). The miss is structural: there is NO completion SEAL today
// — the gold completion register is a CHASSIS phase ink (instrument-chassis.css
// `--phase-complete-color`), no hero-scale gold-draw MARK. This gate locks the gestalt:
//
//   CS1 — THE SEAL EXISTS ONCE on /completion-seal with the colocation + publication.
//         The dir + the SFC + useCompletionSeal + constants.ts + index.ts + README.md;
//         the /completion-seal subpath mirror + the api type publication + the
//         package.json export + the index.css @import (proof:colocation /
//         proof:claude-structure-sync / proof:subpath-enumeration GREEN).
//   CS2 — THE 4 @property MOTION TOKENS ARE REGISTERED. --seal-draw / --seal-scale /
//         --seal-glint / --seal-ink are @property-registered in property-regs.css (the
//         typed-property pattern — a registered property INTERPOLATES, a bare
//         unregistered token SNAPS). A missing reg reds.
//   CS3 — THE SEAL IS GOLD (earned-gold, Q2). --seal-ink defaults to
//         `var(--phase-complete-color, var(--color-gold))` (the earned-gold completion
//         register — NOT the phase spectrum --viz-*/--chart-{phase}). A --seal-ink
//         defaulting to a phase-spectrum hue reds the Q2 earned-gold assert.
//   CS4 — THE SEAL COMPOSES THE METAL GLOW + THE GOLD REGISTER, NO RE-AUTHOR. The glint
//         reads --metal-glow-* (W-AX-METAL-GLOW) — it does NOT re-author the glow; it
//         mints NO new gold token (a --seal-gold literal reds the no-re-author fence —
//         the earned-gold register has ONE home).
//   CS5 — THE SEAL IS A ONE-SHOT, PRM-GATED, COMPOSITOR-ONLY. The draw fires ONCE on
//         `play` (a looping `animation: … infinite` reds); the draw rides
//         stroke-dashoffset / transform / filter (NO layout property — the
//         proof:no-layout-animation mirror); the motion sits inside a
//         (prefers-reduced-motion: no-preference) gate (the PRM-snap arm).
//   CS7 — THE `disc` SHAPE + `personalBest` GARNISH + disc→ring→check SEQUENCING
//         (BG.W-SEAL-DISC / SPEEDTEST-AX #1). `disc` joins the shape union and the SFC
//         COMPOSES the 3-layer earned-coin (a filled FACE + the ring RE-USE + the check
//         RE-USE, ONE mechanism, no fourth recipe); `personalBest` arms `[data-best]`
//         re-pointing `--seal-ink` onto `--seal-best`, which COMPOSES the gold FAMILY
//         (no new gold literal, never a phase spectrum — the Q2 earned-gold ONE-home
//         fence); the sequencing is the `completion-seal-disc-in` FACE keyframe + the
//         staggered `--seal-ring-delay`/`--seal-check-delay` delays. The kf5
//         `fromDrawSVG` DECIDE-AT-BUILD verdict is the CSS `stroke-dashoffset` floor —
//         the seal imports NO async draw engine (compositor-only, jsdom-safe, PRM-native;
//         the check already stroke-draws via `--seal-draw`).
//
// The BINDING painted truth is the π readback (tests-visual/completion-seal.spec.ts —
// the seal draws 0→full, settles, glints, the ink resolves gold, the override re-inks,
// PRM one-static-frame, BOTH modes) + the W-AX-COMPLETION-SEAL-DELTA capture + the
// proof:ba-gestalt feedback/completion verdict (the source-green/visually-broken
// close-class this gate's π half kills). This gate is the no-device CI half.
//
// House style mirrors proof-border-progress.mjs: ESM .mjs, comment-strip first
// (false-witness discipline), a pure exported detector, a byte-stable JSON artefact,
// a human summary, process.exit(1) on any violation. The CS6 self-test bites prove the
// PURE detector flags a phase-spectrum ink / a --seal-gold literal / a looping seal /
// a layout-animated seal / a missing @property reg.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const d = (p) => resolve(ROOT, "src/components/custom/completion-seal", p);
    _cliPaths = {
        ROOT,
        DIR: resolve(ROOT, "src/components/custom/completion-seal"),
        VUE: d("CompletionSeal.vue"),
        COMPOSABLE: d("composables/useCompletionSeal.ts"),
        CONSTANTS: d("constants.ts"),
        INDEX: d("index.ts"),
        README: d("README.md"),
        CSS: resolve(ROOT, "src/styles/completion-seal.css"),
        PROPERTY_REGS: resolve(ROOT, "src/styles/tokens/property-regs.css"),
        INDEX_CSS: resolve(ROOT, "src/styles/index.css"),
        SUBPATH: resolve(ROOT, "src/subpaths/completion-seal.ts"),
        API_INDEX: resolve(ROOT, "src/api/index.ts"),
        PKG: resolve(ROOT, "package.json"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_COMPLETION_SEAL_ARTIFACT",
            "BC-completion-seal",
        ),
    };
    return _cliPaths;
}

// ── comment-strip (the false-witness discipline) ────────────────────────────
function stripBlockComments(t) {
    return t.replace(/\/\*[\s\S]*?\*\//g, " ");
}
function stripLineComments(t) {
    return t
        .split("\n")
        .map((l) => {
            const m = l.match(/(^|[^:])\/\//);
            if (!m) return l;
            return l.slice(0, l.indexOf("//", m.index));
        })
        .join("\n");
}
function stripTs(t) {
    return stripLineComments(stripBlockComments(t));
}
function stripCss(t) {
    return stripBlockComments(t);
}

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");

/** Extract a single @property block by name from the (comment-stripped) regs text. */
function propBlock(regs, name) {
    return (
        regs.match(
            new RegExp(`@property\\s+${name}\\s*\\{[\\s\\S]*?\\}`),
        )?.[0] ?? ""
    );
}

/**
 * THE PURE DETECTOR — takes file CONTENTS (so the self-test can plant synthetic inputs)
 * and returns { facts, violations }. No disk read inside (the caller reads).
 */
export function detectCompletionSeal(inputs) {
    const {
        vue = "",
        composable = "",
        constants = "",
        css = "",
        propertyRegs = "",
        indexCss = "",
        subpath = "",
        apiIndex = "",
        pkg = "",
        readmeExists = false,
        constantsExists = false,
        composableExists = false,
        indexExists = false,
        dirExists = false,
    } = inputs;

    const violations = [];
    const facts = { cs1: {}, cs2: {}, cs3: {}, cs4: {}, cs5: {}, cs7: {} };

    // ── CS1 — the seal exists ONCE with the colocation + publication ──────────
    const subpathMirror =
        /export \* from ["']\.\.\/components\/custom\/completion-seal["']/.test(
            subpath,
        );
    const apiPublishes = /CompletionSeal(Props|Shape)/.test(apiIndex);
    const pkgExport = /"\.\/completion-seal"/.test(pkg);
    const partialImported = /@import\s+["']\.\/completion-seal\.css["']/.test(
        indexCss,
    );
    facts.cs1 = {
        dirExists,
        readmeExists,
        constantsExists,
        composableExists,
        indexExists,
        subpathMirror,
        apiPublishes,
        pkgExport,
        partialImported,
    };
    if (!dirExists)
        violations.push("CS1: the completion-seal/ feature-dir does not exist");
    if (!(readmeExists && constantsExists && composableExists && indexExists))
        violations.push(
            "CS1: the colocation set is incomplete (composables/useCompletionSeal.ts + constants.ts + index.ts + README.md + the dir)",
        );
    if (!subpathMirror)
        violations.push(
            "CS1: src/subpaths/completion-seal.ts mirror is missing/mis-shaped (the glob-resolved subpath)",
        );
    if (!apiPublishes)
        violations.push(
            "CS1: src/api/index.ts does not publish a CompletionSeal* type (the discovery layer)",
        );
    if (!pkgExport)
        violations.push("CS1: package.json has no `./completion-seal` export");
    if (!partialImported)
        violations.push(
            "CS1: src/styles/index.css does not @import ./completion-seal.css (the consumption partial)",
        );

    // ── CS2 — the 4 @property motion tokens are registered ────────────────────
    const drawBlock = propBlock(propertyRegs, "--seal-draw");
    const scaleBlock = propBlock(propertyRegs, "--seal-scale");
    const glintBlock = propBlock(propertyRegs, "--seal-glint");
    const inkBlock = propBlock(propertyRegs, "--seal-ink");
    const drawOk =
        /syntax\s*:\s*"<percentage>"/.test(drawBlock) &&
        /inherits\s*:\s*false/.test(drawBlock) &&
        /initial-value\s*:\s*100%/.test(drawBlock);
    const scaleOk =
        /syntax\s*:\s*"<number>"/.test(scaleBlock) &&
        /initial-value\s*:/.test(scaleBlock);
    const glintOk =
        /syntax\s*:\s*"<number>"/.test(glintBlock) &&
        /initial-value\s*:/.test(glintBlock);
    const inkOk =
        /syntax\s*:\s*"<color>"/.test(inkBlock) &&
        /inherits\s*:\s*true/.test(inkBlock) &&
        /initial-value\s*:/.test(inkBlock);
    facts.cs2 = {
        drawRegistered: drawBlock.length > 0,
        scaleRegistered: scaleBlock.length > 0,
        glintRegistered: glintBlock.length > 0,
        inkRegistered: inkBlock.length > 0,
        drawOk,
        scaleOk,
        glintOk,
        inkOk,
    };
    if (!(drawBlock && scaleBlock && glintBlock && inkBlock))
        violations.push(
            "CS2: not all 4 seal @property registrations exist (--seal-draw/--seal-scale/--seal-glint/--seal-ink) in property-regs.css §18",
        );
    if (drawBlock && !drawOk)
        violations.push(
            "CS2: --seal-draw must be `<percentage>` + `inherits: false` + `initial-value: 100%` (the safe fully-drawn fallback — a non-supporting engine paints the finished seal, never a blank)",
        );
    if (scaleBlock && !scaleOk)
        violations.push(
            "CS2: --seal-scale must be a `<number>` with an `initial-value` (the settle scale)",
        );
    if (glintBlock && !glintOk)
        violations.push(
            "CS2: --seal-glint must be a `<number>` with an `initial-value` (the glint intensity)",
        );
    if (inkBlock && !inkOk)
        violations.push(
            "CS2: --seal-ink must be a `<color>` + `inherits: true` + a concrete var-free `initial-value` (the typed-property fallback rule)",
        );

    // ── CS3 — the seal is GOLD (earned-gold, Q2) ──────────────────────────────
    // The recipe's runtime cascade default must default --seal-ink onto the EARNED-gold
    // completion register (--phase-complete-color, fallback --color-gold), NOT the
    // running phase spectrum.
    const inkDefaultsGold =
        /--seal-ink\s*:\s*var\(\s*--phase-complete-color\s*,\s*var\(\s*--color-gold\s*\)\s*\)/.test(
            css,
        );
    // The Q2 fence: a --seal-ink defaulting to a phase-spectrum hue reds. The phase
    // spectrum is the running --viz-*/--chart-{phase} register (the bus IDENTITY), NOT
    // the earned-gold completion mark.
    const inkReadsPhaseSpectrum =
        /--seal-ink\s*:[^;]*var\(\s*--viz-/.test(css) ||
        /--seal-ink\s*:[^;]*var\(\s*--chart-(ping|download|upload|jitter|phase)/.test(
            css,
        );
    facts.cs3 = { inkDefaultsGold, inkReadsPhaseSpectrum };
    if (!inkDefaultsGold)
        violations.push(
            "CS3: --seal-ink does not default to `var(--phase-complete-color, var(--color-gold))` (the earned-gold completion register — Q2: gold is EARNED at completion, the seal reads the W-PHASE-PALETTE register so a consumer re-inking completion re-inks the seal)",
        );
    if (inkReadsPhaseSpectrum)
        violations.push(
            "CS3: --seal-ink reads the running phase spectrum (--viz-*/--chart-{phase}) — the seal is GOLD (earned-gold), NEVER the phase spectrum (the Q2 fence)",
        );

    // ── CS4 — the seal composes the metal glow + gold register, no re-author ──
    const glintReadsMetalGlow =
        /var\(\s*--metal-glow-blur/.test(css) &&
        /var\(\s*--metal-glow-opacity/.test(css);
    // The no-re-author fence: the seal mints NO new gold token (a --seal-gold literal
    // reds — the earned-gold register lives at W-PHASE-PALETTE's --color-gold; the
    // catch-light at W-AX-METAL-GLOW's --metal-glow-*). A re-authored
    // `--metal-glow-blur:`/`--metal-glow-opacity:` DECLARATION reds — but the seal is NOT
    // a `.metal-*` element, so the bare `--metal-glow-*` (scoped inside .metal-{gold,
    // silver,bronze}) do NOT cascade to it; the seal LOCALLY RE-POINTS them OFF the
    // `--metal-glow-*-default` knob (`--metal-glow-blur: var(--metal-glow-blur-default,
    // …)`, BC.W-CUT batch-1, completion-seal.css:62-63) so a consumer who retunes the
    // `-default` re-tunes the seal in LOCKSTEP — that IS composing the glow (the comment
    // names it "composed, never re-authored"). The RE-AUTHOR the fence forbids is a
    // HARDCODED magic-number declaration that does NOT read the `-default` token. So a
    // `--metal-glow-blur: var(--metal-glow-blur-default, …)` re-point is GREEN; a
    // `--metal-glow-blur: 2em` literal (no `-default` read) REDS.
    const mintsSealGold = /--seal-gold\b/.test(css);
    const reAuthorsGlowDecl = (prop) => {
        const re = new RegExp(`--metal-glow-${prop}\\s*:\\s*([^;]+);`, "g");
        for (const m of css.matchAll(re)) {
            // a declaration that READS the matching `-default` knob is the sanctioned
            // local re-point (composes); anything else is a hardcoded re-author.
            if (!new RegExp(`var\\(\\s*--metal-glow-${prop}-default`).test(m[1])) return true;
        }
        return false;
    };
    const reAuthorsGlow = reAuthorsGlowDecl("blur") || reAuthorsGlowDecl("opacity");
    facts.cs4 = { glintReadsMetalGlow, mintsSealGold, reAuthorsGlow };
    if (!glintReadsMetalGlow)
        violations.push(
            "CS4: the glint does not read `--metal-glow-blur` + `--metal-glow-opacity` (the W-AX-METAL-GLOW catch-light) — the seal COMPOSES the gold glow, it must read both",
        );
    if (mintsSealGold)
        violations.push(
            "CS4: a `--seal-gold` literal is minted — the earned-gold register has ONE home (W-PHASE-PALETTE's --color-gold/--phase-complete-color); the seal mints NO new gold token (the no-re-author fence)",
        );
    if (reAuthorsGlow)
        violations.push(
            "CS4: the seal re-authors a --metal-glow-* declaration — the catch-light is W-AX-METAL-GLOW's; the seal COMPOSES it (reads, never re-declares)",
        );

    // ── CS5 — the seal is a ONE-SHOT, PRM-gated, compositor-only ──────────────
    // The draw rides stroke-dashoffset (a paint prop). The strokes/transform/filter are
    // compositor channels.
    const ridesStrokeDashoffset = /stroke-dashoffset/.test(css);
    // The one-shot fence: NO looping `animation: … infinite` on the seal recipe.
    const hasInfiniteLoop = /animation[^;]*\binfinite\b/.test(css);
    // The PRM gate: the motion sits inside a (prefers-reduced-motion: no-preference)
    // block (so under reduce the seal is the static fully-drawn @property initial-value).
    const prmGated =
        /@media\s*\(\s*prefers-reduced-motion\s*:\s*no-preference\s*\)[\s\S]*?\.completion-seal\[data-play\]/.test(
            css,
        );
    // The compositor-only mirror: NO layout property animates in the seal recipe. We
    // scan the seal keyframes/animation for a forbidden layout property.
    const LAYOUT_PROPS = [
        "\\bwidth\\b",
        "\\bheight\\b",
        "\\binline-size\\b",
        "\\bblock-size\\b",
        "\\bpadding(-\\w+)?\\b",
        "\\bmargin(-\\w+)?\\b",
        "\\btop\\b",
        "\\bleft\\b",
        "\\bright\\b",
        "\\bbottom\\b",
        "\\binset\\b",
        "\\bfont-size\\b",
        "\\bline-height\\b",
        "\\bgap\\b",
    ];
    // Look only inside the seal @keyframes bodies (where the animated props live).
    const sealKeyframeBodies = (
        css.match(/@keyframes\s+completion-seal-[\w-]+\s*\{[\s\S]*?\}\s*\}/g) ??
        []
    ).join("\n");
    const animatesLayoutProp = LAYOUT_PROPS.some((p) =>
        new RegExp(`(${p})\\s*:`).test(sealKeyframeBodies),
    );
    facts.cs5 = {
        ridesStrokeDashoffset,
        hasInfiniteLoop,
        prmGated,
        animatesLayoutProp,
    };
    if (!ridesStrokeDashoffset)
        violations.push(
            "CS5: the seal does not ride `stroke-dashoffset` (the draw-on is a paint-prop wipe, not a flat fade)",
        );
    if (hasInfiniteLoop)
        violations.push(
            "CS5: the seal has a looping `animation: … infinite` — the seal is a ONE-SHOT (draws once on `play`, then holds static; no looping shimmer — the §6 calm register)",
        );
    if (!prmGated)
        violations.push(
            "CS5: the seal motion is not inside a `(prefers-reduced-motion: no-preference)` gate — under reduce the seal must appear instantly fully-drawn (the @property initial-values), no stroke/glint animation",
        );
    if (animatesLayoutProp)
        violations.push(
            "CS5: a layout property animates in a completion-seal @keyframes (the proof:no-layout-animation mirror — the draw rides stroke-dashoffset/transform/filter ONLY)",
        );

    // ── CS7 — the disc shape + personalBest garnish + disc→ring→check sequencing ──
    // BG.W-SEAL-DISC (SPEEDTEST-AX #1). The seal gains a `disc` shape — the composed
    // earned-coin gesture — a `personalBest` earned-gold garnish, and the sequencing
    // draw. The kf5 `fromDrawSVG` decide-at-build verdict is the CSS stroke-dashoffset
    // floor (no async draw engine imported — the compositor-only, jsdom-safe floor).

    // (a) the `disc` member joins the shape union (constants.ts).
    const discInUnion = /CompletionSealShape[^=]*=\s*[^;]*["']disc["']/.test(
        constants,
    );
    // (b) the SFC COMPOSES the 3-layer disc gesture off ONE mechanism — a disc FACE +
    //     the ring RE-USE + the check RE-USE, gated on the disc branch.
    const sfcComposesDisc =
        /completion-seal__disc/.test(vue) &&
        /completion-seal__ring/.test(vue) &&
        /completion-seal__check/.test(vue) &&
        /shape\s*===\s*["']disc["']/.test(vue);
    // (c) `personalBest` prop exists AND wires the [data-best] seam.
    const personalBestProp = /personalBest/.test(vue) && /data-best/.test(vue);
    // (d) --seal-best COMPOSES the gold FAMILY (no new gold literal — the earned-gold
    //     register has ONE home; Q2 no-re-author), AND [data-best] re-points the ink.
    const sealBestReadsGold = /--seal-best\s*:\s*var\(\s*--(color-)?gold/.test(
        css,
    );
    const sealBestPhaseSpectrum =
        /--seal-best\s*:[^;]*var\(\s*--viz-/.test(css) ||
        /--seal-best\s*:[^;]*var\(\s*--chart-(ping|download|upload|jitter|phase)/.test(
            css,
        );
    const bestRePointsInk =
        /\[data-best\][\s\S]{0,160}--seal-ink\s*:\s*var\(\s*--seal-best/.test(
            css,
        );
    const sealBestComposesGold =
        sealBestReadsGold && bestRePointsInk && !sealBestPhaseSpectrum;
    // (e) the disc→ring→check SEQUENCING is wired — the disc FACE materialize keyframe +
    //     the two staggered delays READ (the ring after the face, the check after the
    //     ring; the same-clock passes staggered on animation-delay — no fourth recipe).
    const discSequenced =
        /@keyframes\s+completion-seal-disc-in/.test(css) &&
        /var\(\s*--seal-ring-delay/.test(css) &&
        /var\(\s*--seal-check-delay/.test(css);
    // (f) the kf5 `fromDrawSVG` DECIDE-AT-BUILD verdict — the CSS stroke-dashoffset floor
    //     is KEPT; the seal imports NO async draw engine (fromDrawSVG/DrawSVG/
    //     loadAnimationEngine reachable only via loadAnimationEngine() indirection —
    //     awkward + jsdom-unsafe for a mount-triggered one-shot, zero gestalt gain).
    const reachesDrawEngine =
        /fromDrawSVG|DrawSVG|loadAnimationEngine/.test(vue) ||
        /fromDrawSVG|DrawSVG|loadAnimationEngine/.test(composable);
    const drawSvgCssFloor = !reachesDrawEngine;

    facts.cs7 = {
        discInUnion,
        sfcComposesDisc,
        personalBestProp,
        sealBestReadsGold,
        sealBestPhaseSpectrum,
        bestRePointsInk,
        sealBestComposesGold,
        discSequenced,
        drawSvgCssFloor,
    };
    if (!discInUnion)
        violations.push(
            "CS7: `disc` is not a member of the CompletionSealShape union (constants.ts) — BG.W-SEAL-DISC adds the composed earned-coin shape beside check/ring/wordmark",
        );
    if (!sfcComposesDisc)
        violations.push(
            "CS7: the SFC does not COMPOSE the 3-layer disc gesture (a `.completion-seal__disc` FACE + the `.completion-seal__ring` RE-USE + the `.completion-seal__check` RE-USE, gated on `shape === 'disc'`) — the disc is the composed disc→ring→check, ONE mechanism, not a fourth recipe",
        );
    if (!personalBestProp)
        violations.push(
            "CS7: the `personalBest` prop is missing or does not wire the `[data-best]` seam (the earned-gold garnish)",
        );
    if (sealBestPhaseSpectrum)
        violations.push(
            "CS7: --seal-best reads the running phase spectrum (--viz-*/--chart-{phase}) — the personal-best garnish is EARNED-gold, NEVER the phase spectrum (the Q2 fence)",
        );
    if (!sealBestComposesGold)
        violations.push(
            "CS7: the personalBest garnish does not COMPOSE the gold family — `--seal-best` must read `var(--color-gold*)`/`var(--gold*)` (a brighter earned gold, NOT a new literal — the earned-gold register has ONE home) AND `[data-best]` must re-point `--seal-ink: var(--seal-best)`",
        );
    if (!discSequenced)
        violations.push(
            "CS7: the disc→ring→check SEQUENCING is not wired (the `completion-seal-disc-in` FACE-materialize keyframe + the `--seal-ring-delay`/`--seal-check-delay` staggered delays READ) — the disc gesture must stagger the same-clock passes on animation-delay",
        );
    if (!drawSvgCssFloor)
        violations.push(
            "CS7: the seal reaches an async kf draw engine (fromDrawSVG/DrawSVG/loadAnimationEngine) — the BG.W-SEAL-DISC decide-at-build verdict is the CSS `stroke-dashoffset` floor (compositor-only + jsdom-safe + PRM-native; the check already stroke-draws via `--seal-draw`, the async engine adds indirection for zero gestalt gain)",
        );

    return { facts, violations };
}

// ── the live-disk read ───────────────────────────────────────────────────────
function readInputs(P) {
    return {
        vue: stripTs(read(P.VUE)),
        composable: stripTs(read(P.COMPOSABLE)),
        constants: stripTs(read(P.CONSTANTS)),
        css: stripCss(read(P.CSS)),
        propertyRegs: stripCss(read(P.PROPERTY_REGS)),
        indexCss: stripCss(read(P.INDEX_CSS)),
        subpath: stripTs(read(P.SUBPATH)),
        apiIndex: stripTs(read(P.API_INDEX)),
        pkg: read(P.PKG),
        readmeExists: existsSync(P.README),
        constantsExists: existsSync(P.CONSTANTS),
        composableExists: existsSync(P.COMPOSABLE),
        indexExists: existsSync(P.INDEX),
        dirExists: existsSync(P.DIR),
    };
}

// ── CS6 self-test: the false-witness bites (each planted defect must RED) ─────
function selfTest() {
    const good = {
        vue: `data-play data-shape data-best role="status" personalBest shape === 'disc' completion-seal__disc completion-seal__ring completion-seal__check`,
        composable: `useCompletionSeal`,
        constants: `export type CompletionSealShape = "check" | "ring" | "disc" | "wordmark";`,
        css: `.completion-seal { --seal-ink: var(--phase-complete-color, var(--color-gold)); transform: scale(var(--seal-scale)); }
        .completion-seal[data-best] { --seal-best: var(--color-gold-light); --seal-ink: var(--seal-best); }
        .completion-seal[data-shape="disc"] { --seal-ring-delay: var(--spring-snappy-duration); --seal-check-delay: calc(var(--spring-snappy-duration) * 2); }
        .completion-seal__disc { fill: var(--seal-disc-fill, color-mix(in oklab, var(--seal-ink), transparent 82%)); }
        .completion-seal__mark {
            stroke: var(--seal-ink);
            stroke-dashoffset: calc(100 - var(--seal-draw) / 1%);
            filter: drop-shadow(0 0 calc(var(--metal-glow-blur) * var(--seal-glint)) color-mix(in oklab, var(--seal-ink), transparent calc(100% - var(--metal-glow-opacity) * var(--seal-glint) * 100%)));
        }
        @media (prefers-reduced-motion: no-preference) {
            .completion-seal[data-play] { animation: completion-seal-settle var(--spring-bouncy-duration) var(--spring-bouncy) both; }
            .completion-seal[data-play] .completion-seal__mark { animation: completion-seal-draw var(--spring-snappy-duration) var(--ease-out) both; }
        }
        .completion-seal[data-shape="disc"][data-play] .completion-seal__ring { animation: completion-seal-draw var(--spring-snappy-duration) var(--ease-out) var(--seal-ring-delay) both; }
        .completion-seal[data-shape="disc"][data-play] .completion-seal__check { animation: completion-seal-draw var(--spring-snappy-duration) var(--ease-out) var(--seal-check-delay) both; }
        @keyframes completion-seal-disc-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes completion-seal-draw { from { --seal-draw: 0%; } to { --seal-draw: 100%; } }
        @keyframes completion-seal-settle { from { --seal-scale: 0.92; } to { --seal-scale: 1; } }
        @keyframes completion-seal-glint { 0% { --seal-glint: 0; } 45% { --seal-glint: 1; } 100% { --seal-glint: 0; } }`,
        propertyRegs: `@property --seal-draw { syntax: "<percentage>"; inherits: false; initial-value: 100%; }
        @property --seal-scale { syntax: "<number>"; inherits: false; initial-value: 1; }
        @property --seal-glint { syntax: "<number>"; inherits: false; initial-value: 0; }
        @property --seal-ink { syntax: "<color>"; inherits: true; initial-value: oklch(0.751 0.147 84.2); }`,
        indexCss: `@import "./completion-seal.css";`,
        subpath: `export * from "../components/custom/completion-seal";`,
        apiIndex: `export type { CompletionSealProps, CompletionSealShape } from "../components/custom/completion-seal";`,
        pkg: `"./completion-seal": { "types": "./dist/completion-seal.d.ts" }`,
        readmeExists: true,
        constantsExists: true,
        composableExists: true,
        indexExists: true,
        dirExists: true,
    };
    const baseGreen = detectCompletionSeal(good).violations.length === 0;

    const bites = [];
    // Bite A — the ink reads the phase spectrum reds CS3.
    bites.push({
        name: "phase-spectrum-ink",
        red:
            detectCompletionSeal({
                ...good,
                css: good.css.replace(
                    "--seal-ink: var(--phase-complete-color, var(--color-gold))",
                    "--seal-ink: var(--viz-legendre)",
                ),
            }).violations.length > 0,
    });
    // Bite B — a --seal-gold literal reds CS4 (the no-re-author fence).
    bites.push({
        name: "mints-seal-gold",
        red:
            detectCompletionSeal({
                ...good,
                css: good.css + "\n.completion-seal { --seal-gold: gold; }",
            }).violations.length > 0,
    });
    // Bite C — a re-authored metal-glow declaration reds CS4.
    bites.push({
        name: "re-authors-metal-glow",
        red:
            detectCompletionSeal({
                ...good,
                css:
                    good.css +
                    "\n.completion-seal { --metal-glow-blur: 2em; --metal-glow-opacity: 0.9; }",
            }).violations.length > 0,
    });
    // Bite D — a looping seal reds CS5.
    bites.push({
        name: "looping-seal",
        red:
            detectCompletionSeal({
                ...good,
                css: good.css.replace(
                    "animation: completion-seal-draw var(--spring-snappy-duration) var(--ease-out) both;",
                    "animation: completion-seal-draw var(--spring-snappy-duration) var(--ease-out) infinite;",
                ),
            }).violations.length > 0,
    });
    // Bite E — a layout-animated seal reds CS5.
    bites.push({
        name: "layout-animated-seal",
        red:
            detectCompletionSeal({
                ...good,
                css: good.css.replace(
                    "@keyframes completion-seal-settle { from { --seal-scale: 0.92; } to { --seal-scale: 1; } }",
                    "@keyframes completion-seal-settle { from { width: 0; } to { width: 100%; } }",
                ),
            }).violations.length > 0,
    });
    // Bite F — a missing @property reg reds CS2.
    bites.push({
        name: "missing-property-reg",
        red:
            detectCompletionSeal({
                ...good,
                propertyRegs: good.propertyRegs.replace(
                    /@property --seal-glint \{[^}]*\}/,
                    "",
                ),
            }).violations.length > 0,
    });
    // Bite G — drop the PRM gate reds CS5.
    bites.push({
        name: "no-prm-gate",
        red:
            detectCompletionSeal({
                ...good,
                css: good.css.replace(
                    /@media \(prefers-reduced-motion: no-preference\) \{[\s\S]*?\}\s*\}/,
                    "",
                ),
            }).violations.length > 0,
    });
    // Bite H — dropping `disc` from the union reds CS7.
    bites.push({
        name: "disc-not-in-union",
        red:
            detectCompletionSeal({
                ...good,
                constants: good.constants.replace(` | "disc"`, ""),
            }).violations.length > 0,
    });
    // Bite I — dropping the disc FACE layer (no composition) reds CS7.
    bites.push({
        name: "disc-not-composed",
        red:
            detectCompletionSeal({
                ...good,
                vue: good.vue.replace("completion-seal__disc", "x-removed"),
            }).violations.length > 0,
    });
    // Bite J — dropping `personalBest` reds CS7.
    bites.push({
        name: "no-personal-best",
        red:
            detectCompletionSeal({
                ...good,
                vue: good.vue.replace("personalBest", "x-removed"),
            }).violations.length > 0,
    });
    // Bite K — a phase-spectrum --seal-best reds CS7 (the earned-gold fence).
    bites.push({
        name: "seal-best-phase-spectrum",
        red:
            detectCompletionSeal({
                ...good,
                css: good.css.replace(
                    "--seal-best: var(--color-gold-light)",
                    "--seal-best: var(--viz-legendre)",
                ),
            }).violations.length > 0,
    });
    // Bite L — dropping the disc-in FACE keyframe (no sequencing) reds CS7.
    bites.push({
        name: "disc-not-sequenced",
        red:
            detectCompletionSeal({
                ...good,
                css: good.css.replace(
                    /@keyframes completion-seal-disc-in \{[^}]*\}[^}]*\}/,
                    "",
                ),
            }).violations.length > 0,
    });
    // Bite M — reaching the async kf draw engine reds CS7 (the CSS-floor verdict).
    bites.push({
        name: "reaches-draw-engine",
        red:
            detectCompletionSeal({
                ...good,
                composable: good.composable + `\nimport { fromDrawSVG } from "kf";`,
            }).violations.length > 0,
    });

    return { baseGreen, bites };
}

function run() {
    const P = cliPaths();
    const inputs = readInputs(P);
    const { facts, violations } = detectCompletionSeal(inputs);

    const st = selfTest();
    const biteFailures = st.bites.filter((b) => !b.red).map((b) => b.name);
    if (!st.baseGreen)
        violations.push(
            "CS6: the self-test GOOD corpus did not green (detector over-strict)",
        );
    if (biteFailures.length > 0)
        violations.push(
            `CS6: self-test bite(s) did not RED: ${biteFailures.join(", ")}`,
        );
    facts.cs6 = {
        baseGreen: st.baseGreen,
        allBite: biteFailures.length === 0,
        bites: st.bites,
    };

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(P.ARTIFACT, {
        gate: "proof:completion-seal",
        stamp: snapshotStamp(),
        status,
        facts,
        violations,
    });

    const yn = (b) => (b ? "✓" : "✗");
    console.log(
        "proof:completion-seal — the hero-scale earned-GOLD completion seal (BC.W-AX-COMPLETION-SEAL)",
    );
    console.log(
        `  CS1 seal exists + colocation/publish: ${yn(
            facts.cs1.dirExists &&
                facts.cs1.readmeExists &&
                facts.cs1.constantsExists &&
                facts.cs1.composableExists &&
                facts.cs1.indexExists &&
                facts.cs1.subpathMirror &&
                facts.cs1.apiPublishes &&
                facts.cs1.pkgExport &&
                facts.cs1.partialImported,
        )}`,
    );
    console.log(
        `  CS2 the 4 @property motion tokens   : ${yn(
            facts.cs2.drawOk &&
                facts.cs2.scaleOk &&
                facts.cs2.glintOk &&
                facts.cs2.inkOk,
        )}`,
    );
    console.log(
        `  CS3 GOLD ink (earned-gold, Q2)      : ${yn(
            facts.cs3.inkDefaultsGold && !facts.cs3.inkReadsPhaseSpectrum,
        )}`,
    );
    console.log(
        `  CS4 composes glow+gold, no re-author: ${yn(
            facts.cs4.glintReadsMetalGlow &&
                !facts.cs4.mintsSealGold &&
                !facts.cs4.reAuthorsGlow,
        )}`,
    );
    console.log(
        `  CS5 one-shot, PRM-gated, compositor : ${yn(
            facts.cs5.ridesStrokeDashoffset &&
                !facts.cs5.hasInfiniteLoop &&
                facts.cs5.prmGated &&
                !facts.cs5.animatesLayoutProp,
        )}`,
    );
    console.log(
        `  CS7 disc shape + best + sequencing  : ${yn(
            facts.cs7.discInUnion &&
                facts.cs7.sfcComposesDisc &&
                facts.cs7.personalBestProp &&
                facts.cs7.sealBestComposesGold &&
                facts.cs7.discSequenced &&
                facts.cs7.drawSvgCssFloor,
        )}`,
    );
    console.log(
        `  CS6 self-test bites RED             : ${yn(
            facts.cs6.allBite && facts.cs6.baseGreen,
        )}`,
    );

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(
            P.ROOT.length + 1,
        )}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
