#!/usr/bin/env node
// BI.W-DOCK-SPINE — proof:dock-spine, the born-RED three-z-layer clip-path plate
// SPINE gate (the FAM-3 dock-disease terminal cure, PASS-1 §0/§2.1/§2.2).
//
// The unanimous root cause: `.glass-dock` is SIMULTANEOUSLY the glass surface, the
// morph clip aperture (`overflow: clip` + `contain: layout style paint`,
// shell.css:151), AND the interactive item container — every named clip/morph defect
// (UF-C5/C6/C7) is a downstream compensation for that triple identity. The greenfield
// spine SPLITS it into three z-layers so the defects become UNREPRESENTABLE, not
// patched:
//   L0 — THE PLATE (`.dock-plate`): one absolute element owning backdrop-filter + the
//        glass surface + rim + grain; its visible extent morphs via
//        `clip-path: inset(… round …)` off ONE plate-scoped `--dock-t` (paint-only,
//        compositor-composited, ZERO endpoint measurement). A SIBLING of the controls,
//        never their ancestor — so a control hover plate overhangs the plate edge
//        UN-CLIPPED (UF-C6/C7 unrepresentable).
//   L1 — THE CONTROLS (`.dock-controls`): a normal-flow flex run OVER the plate,
//        `overflow: visible` BOTH axes ALWAYS. No ancestor clips them.
//   L2 — TRANSIENT SURFACES: top-layer popovers (W-DOCK-ESCAPE) — nothing to escape FROM.
//
// PURE DEVICE-FREE static src-scan (CSS + Vue-template scans, no browser, no GPU).
// Runs on EVERY runner → carries `tags: ["local","ci","release"]`.
//
// CLAUSES (born-RED on the pre-wave tree — `contain:layout style paint` + `overflow:clip`
// live at shell.css, NO `@property --dock-t`, the fixed dock centers `-translate-x-1/2`):
//   S1 clip-by-construction — `.glass-dock`/`.dock-controls` compose ZERO
//      `contain: … paint` and ZERO `overflow: clip`/`overflow-clip-margin`; the L1
//      `.dock-controls` resolves `overflow: visible` both axes. GREEN when the triple
//      identity splits.
//   S2 one-plate-scalar — exactly ONE `@property --dock-t` (inherits:false, the A′-4
//      restyle-scope guarantee); the plate reads `var(--dock-t)`; NO control-family
//      selector carries a `--dock-t` read.
//   S3 transform-free-centering — the dock root centers `margin-inline:auto`/`inset-inline`
//      + `width:max-content`; ZERO `translate*(-50%)`/`-translate-x-1/2` on the dock root
//      or any centering ancestor (the SAF-1 top-layer anchor fence).
//   S4 reserved-footprint-passthrough — the transparent reserved margin is
//      `pointer-events:none`; the plate + control run are `pointer-events:auto`.
//
// Self-test bites (each planted defect MUST flag): a synthetic re-added `contain:paint`
// on the item layer REDs S1; a synthetic second `@property --dock-t` REDs S2; a synthetic
// `translateX(-50%)` centering REDs S3.

import { existsSync, readFileSync } from "node:fs";
import { resolve, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const HERE = fileURLToPath(import.meta.url);
const ROOT = resolve(HERE, "../..");

const PATHS = {
    ROOT,
    SHELL: resolve(ROOT, "src/styles/dock/shell.css"),
    MORPH: resolve(ROOT, "src/styles/dock/morph.css"),
    DOCKCSS: resolve(ROOT, "src/styles/dock/dock.css"),
    DOCK_ROOT: resolve(ROOT, "src/styles/dock.css"),
    OVERFLOW: resolve(ROOT, "src/styles/dock/overflow.css"),
    GLASSDOCK: resolve(ROOT, "src/components/custom/dock/GlassDock.vue"),
    ARTIFACT: gateArtifactPath("GLASS_UI_DOCK_SPINE_ARTIFACT", "dock-spine"),
};

/** Blank out CSS `/* *​/` comments so a documented HEAD pattern in prose never
 *  false-matches a live-rule scan (the house stripComments idiom). */
function stripCssComments(text) {
    return text.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
}

/** Blank out Vue `<!-- -->` template comments. */
function stripVueComments(text) {
    return text.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "));
}

/** Split a CSS body into `{ selector, body }` rules (flat — good enough for the
 *  dock partials which nest only under `@layer components`/`@media`/`@supports`,
 *  none of which carry a `--dock-t` read at their own bracket). */
function cssRules(text) {
    const clean = stripCssComments(text);
    const rules = [];
    // Walk brace pairs; capture the immediately-preceding selector run.
    let depth = 0;
    let selStart = 0;
    let stack = [];
    for (let i = 0; i < clean.length; i++) {
        const ch = clean[i];
        if (ch === "{") {
            const selector = clean.slice(selStart, i).trim().split(/[{}]/).pop().trim();
            stack.push({ selector, bodyStart: i + 1 });
            depth++;
        } else if (ch === "}") {
            const frame = stack.pop();
            if (frame) {
                rules.push({
                    selector: frame.selector,
                    body: clean.slice(frame.bodyStart, i),
                });
            }
            depth = Math.max(0, depth - 1);
            selStart = i + 1;
        }
    }
    return rules;
}

// ── S1 — clip-by-construction ────────────────────────────────────────────────
function checkS1({ shellText, dockcssText, overflowText }) {
    const violations = [];
    const facts = {};

    // (a) NO `contain: … paint` anywhere the interactive box composes it (shell.css:151).
    // A `contain` value containing the `paint` keyword on `.glass-dock`/`.dock-controls`.
    const rules = [
        ...cssRules(shellText),
        ...cssRules(dockcssText),
        ...cssRules(overflowText),
    ];
    // The INTERACTIVE LAYER is the aperture ROOT (`.glass-dock`) + the L1 control run
    // (`.dock-controls`) — NOT a content descendant (`.glass-dock … .dock-layer--full`,
    // whose scroll-port overflow is W-DOCK-OVERFLOW's file-disjoint concern). Match ONLY
    // when a comma-group member's KEY (rightmost) compound is the interactive root.
    const interactive = (sel) =>
        sel.split(",").some((s) => {
            const parts = s.trim().split(/[\s>+~]+/).filter(Boolean);
            const key = parts[parts.length - 1] || "";
            return (
                /^\.glass-dock(?:[.:[]|$)/.test(key) ||
                /^\.dock-controls(?:[.:[]|$)/.test(key)
            );
        });
    const containPaint = rules.filter(
        (r) => interactive(r.selector) && /contain\s*:[^;]*\bpaint\b/.test(r.body),
    );
    facts.s1ContainPaintSites = containPaint.map((r) => r.selector);
    if (containPaint.length) {
        violations.push(
            `S1 — the interactive layer composes 'contain: … paint' (${containPaint
                .map((r) => r.selector)
                .join(", ")}); the plate lens is the ONLY clip box now (no triple-identity paint clip)`,
        );
    }

    // (b) NO `overflow: clip`/`overflow-x/y: clip` + NO `overflow-clip-margin` on the
    // interactive layer.
    const clipRules = rules.filter(
        (r) =>
            interactive(r.selector) &&
            /overflow(-x|-y)?\s*:\s*clip\b/.test(r.body),
    );
    const clipMargin = rules.filter(
        (r) => interactive(r.selector) && /overflow-clip-margin\s*:/.test(r.body),
    );
    facts.s1OverflowClipSites = clipRules.map((r) => r.selector);
    facts.s1OverflowClipMarginSites = clipMargin.map((r) => r.selector);
    if (clipRules.length) {
        violations.push(
            `S1 — the interactive layer composes 'overflow: clip' (${clipRules
                .map((r) => r.selector)
                .join(", ")}); the plate clip-path owns the visible extent (no box aperture)`,
        );
    }
    if (clipMargin.length) {
        violations.push(
            `S1 — the interactive layer composes 'overflow-clip-margin' (${clipMargin
                .map((r) => r.selector)
                .join(", ")}); a clip-margin band-aid is the aperture the plate retires`,
        );
    }

    // (c) L1 `.dock-controls` resolves `overflow: visible` BOTH axes.
    const controls = cssRules(dockcssText).filter((r) =>
        /\.dock-controls(?![-\w])/.test(r.selector),
    );
    const visibleBoth = controls.some(
        (r) =>
            /overflow\s*:\s*visible\b/.test(r.body) ||
            (/overflow-x\s*:\s*visible\b/.test(r.body) &&
                /overflow-y\s*:\s*visible\b/.test(r.body)),
    );
    facts.s1ControlsOverflowVisible = visibleBoth;
    if (!visibleBoth) {
        violations.push(
            "S1 — L1 '.dock-controls' does NOT resolve 'overflow: visible' both axes; a hover plate at the dock edge would clip (UF-C6/C7)",
        );
    }

    return { violations, facts };
}

// ── S2 — one-plate-scalar ────────────────────────────────────────────────────
function checkS2({ dockRootText, dockcssText, shellText, morphText, overflowText }) {
    const violations = [];
    const facts = {};

    // exactly ONE `@property --dock-t` across the styles tree.
    const allCss = [dockRootText, dockcssText, shellText, morphText, overflowText]
        .map(stripCssComments)
        .join("\n");
    const registrations = allCss.match(/@property\s+--dock-t\b/g) || [];
    facts.s2DockTRegistrations = registrations.length;
    if (registrations.length !== 1) {
        violations.push(
            `S2 — expected EXACTLY one '@property --dock-t' (found ${registrations.length}); the plate scalar is minted ONCE (a second writer is a scalar fork)`,
        );
    }

    // the registration is inherits:false (the A′-4 restyle-scope guarantee — a per-frame
    // plate write must NOT invalidate the 10-selector control subtree).
    const regBlock = (() => {
        const m = allCss.match(/@property\s+--dock-t\s*\{([\s\S]*?)\}/);
        return m ? m[1] : "";
    })();
    const inheritsFalse = /inherits\s*:\s*false\b/.test(regBlock);
    facts.s2InheritsFalse = inheritsFalse;
    if (registrations.length === 1 && !inheritsFalse) {
        violations.push(
            "S2 — '@property --dock-t' is NOT 'inherits: false'; an inheriting plate scalar re-invalidates the control subtree per frame (the A′-4 restyle-storm)",
        );
    }

    // the plate reads it; the control subtree does NOT. Walk every rule that reads
    // `var(--dock-t` and assert its selector targets `.dock-plate`.
    const readerRules = [
        ...cssRules(dockcssText),
        ...cssRules(shellText),
        ...cssRules(morphText),
        ...cssRules(overflowText),
    ].filter(
        (r) =>
            // EXCLUDE at-rule wrappers (`@layer`/`@media`/`@supports`) — the nesting-naive
            // brace walker attributes a nested rule's `var(--dock-t)` to its enclosing
            // block too; only a REAL selector reading the scalar is a reader.
            !r.selector.trimStart().startsWith("@") &&
            /var\(\s*--dock-t\b/.test(r.body),
    );
    const plateReads = readerRules.filter((r) => /\.dock-plate\b/.test(r.selector));
    const strayReads = readerRules.filter((r) => !/\.dock-plate\b/.test(r.selector));
    facts.s2PlateReadsScalar = plateReads.length > 0;
    facts.s2StrayReaders = strayReads.map((r) => r.selector);
    if (plateReads.length === 0) {
        violations.push(
            "S2 — '.dock-plate' does NOT read 'var(--dock-t)'; the plate lens is not driven by the one scalar (a dead plate)",
        );
    }
    if (strayReads.length) {
        violations.push(
            `S2 — a NON-plate selector reads 'var(--dock-t)' (${strayReads
                .map((r) => r.selector)
                .join(", ")}); the per-frame write must reach the plate ONLY (the restyle-scope assert)`,
        );
    }

    return { violations, facts };
}

// ── S3 — transform-free-centering ────────────────────────────────────────────
function checkS3({ glassDockText, dockcssText }) {
    const violations = [];
    const facts = {};
    const vue = stripVueComments(glassDockText);
    const css = stripCssComments(dockcssText);

    // ZERO translate(-50%) centering on the dock root / centering ancestor. The Tailwind
    // form (`-translate-x-1/2`), the CSS `translate: -50%`, and `translateX(-50%)` all bite.
    const translateHits = [];
    if (/-translate-x-1\/2/.test(vue)) translateHits.push("-translate-x-1/2 (GlassDock.vue)");
    if (/-translate-y-1\/2/.test(vue)) translateHits.push("-translate-y-1/2 (GlassDock.vue)");
    if (/translate(X|Y)?\s*\(\s*-?50%/.test(vue)) translateHits.push("translateX(-50%) (GlassDock.vue)");
    if (/translate\s*:\s*-?50%/.test(css)) translateHits.push("translate:-50% (dock.css)");
    if (/translate(X|Y)?\s*\(\s*-?50%/.test(css)) translateHits.push("translateX(-50%) (dock.css)");
    facts.s3TranslateHits = translateHits;
    if (translateHits.length) {
        violations.push(
            `S3 — the dock centers with a transform (${translateHits.join(
                ", ",
            )}); the top-layer escape mis-resolves native anchor() through any transformed ancestor (SAF-1) — center transform-FREE (margin-inline:auto / inset-inline)`,
        );
    }

    // the centering IS margin-inline:auto / inset-inline + width:max-content.
    const marginAuto =
        /\bmx-auto\b/.test(vue) ||
        /margin-inline\s*:\s*auto/.test(css) ||
        /\bmargin\s*:\s*0\s+auto\b/.test(css);
    const insetInline =
        /\binset-inline(-0)?\b/.test(vue) || /inset-inline\s*:\s*0/.test(css);
    const widthMax = /\bw-max\b/.test(vue) || /width\s*:\s*max-content/.test(css) || /inline-size\s*:\s*max-content/.test(css);
    facts.s3MarginAuto = marginAuto;
    facts.s3InsetInline = insetInline;
    facts.s3WidthMaxContent = widthMax;
    if (!(marginAuto || insetInline)) {
        violations.push(
            "S3 — the dock root does NOT center transform-free (no margin-inline:auto / inset-inline); the SAF-1 anchor-safe center is missing",
        );
    }
    if (!widthMax) {
        violations.push(
            "S3 — the transform-free centered dock does NOT pin width:max-content; margin:auto centering needs a definite (content) width to resolve",
        );
    }

    return { violations, facts };
}

// ── S4 — reserved-footprint-passthrough ──────────────────────────────────────
function checkS4({ dockcssText }) {
    const violations = [];
    const facts = {};
    const rules = cssRules(dockcssText);

    // the transparent reserved margin (the out-of-flow frame) is pointer-events:none.
    const reserveNone = rules.some(
        (r) =>
            /reserve|glass-dock-frame|dock-reserve/.test(r.selector) &&
            /pointer-events\s*:\s*none\b/.test(r.body),
    );
    // the plate + control run own the hit area (pointer-events:auto).
    const hitAuto = rules.some(
        (r) =>
            /\.dock-plate\b|\.dock-controls\b/.test(r.selector) &&
            /pointer-events\s*:\s*auto\b/.test(r.body),
    );
    facts.s4ReservedMarginNone = reserveNone;
    facts.s4HitAreaAuto = hitAuto;
    if (!reserveNone) {
        violations.push(
            "S4 — the reserved-footprint transparent margin is NOT 'pointer-events: none'; click/wheel over the reserved area must pass through to the page",
        );
    }
    if (!hitAuto) {
        violations.push(
            "S4 — the plate + control run are NOT 'pointer-events: auto'; the dock surface + items must own their hit area",
        );
    }

    return { violations, facts };
}

// ── self-test bites ──────────────────────────────────────────────────────────
function selfTest() {
    const errors = [];

    // S1 bite — a synthetic re-added `contain: paint` on the item layer MUST flag.
    const s1 = checkS1({
        shellText: ".glass-dock { position: relative; }",
        dockcssText: ".dock-controls { contain: layout paint; overflow: visible; }",
        overflowText: "",
    });
    if (!s1.violations.some((v) => v.startsWith("S1"))) {
        errors.push("S1 self-test BROKE — a synthetic 'contain: paint' on '.dock-controls' was NOT flagged");
    }

    // S2 bite — a synthetic SECOND `@property --dock-t` MUST flag.
    const s2 = checkS2({
        dockRootText: "@property --dock-t { syntax: '<number>'; inherits: false; initial-value: 0; }",
        dockcssText:
            "@property --dock-t { syntax: '<number>'; inherits: false; initial-value: 0; }\n.dock-plate { clip-path: inset(calc((1 - var(--dock-t)) * 0px)); }",
        shellText: "",
        morphText: "",
        overflowText: "",
    });
    if (!s2.violations.some((v) => v.startsWith("S2"))) {
        errors.push("S2 self-test BROKE — a synthetic SECOND '@property --dock-t' was NOT flagged");
    }

    // S2 bite (b) — a stray control-subtree `--dock-t` read MUST flag.
    const s2b = checkS2({
        dockRootText: "@property --dock-t { inherits: false; }",
        dockcssText: ".dock-plate { clip-path: inset(calc(var(--dock-t) * 0px)); }\n.dock-icon-button { opacity: var(--dock-t); }",
        shellText: "",
        morphText: "",
        overflowText: "",
    });
    if (!s2b.violations.some((v) => /reach the plate ONLY/.test(v))) {
        errors.push("S2 self-test BROKE — a stray control-subtree '--dock-t' read was NOT flagged (restyle-scope not load-bearing)");
    }

    // S3 bite — a synthetic `translateX(-50%)` centering MUST flag.
    const s3 = checkS3({
        glassDockText: '<div class="glass-dock fixed bottom-4 left-1/2 -translate-x-1/2 mx-auto w-max"></div>',
        dockcssText: "",
    });
    if (!s3.violations.some((v) => v.startsWith("S3"))) {
        errors.push("S3 self-test BROKE — a synthetic '-translate-x-1/2' centering was NOT flagged (SAF-1 fence not load-bearing)");
    }

    // S4 bite — a plate/control with no pointer-events contract MUST flag.
    const s4 = checkS4({ dockcssText: ".dock-plate { position: absolute; }" });
    if (!s4.violations.some((v) => v.startsWith("S4"))) {
        errors.push("S4 self-test BROKE — a missing reserved-footprint pointer-events contract was NOT flagged");
    }

    return { ok: errors.length === 0, errors };
}

function loadFs() {
    const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");
    return {
        shellText: read(PATHS.SHELL),
        morphText: read(PATHS.MORPH),
        dockcssText: read(PATHS.DOCKCSS),
        dockRootText: read(PATHS.DOCK_ROOT),
        overflowText: read(PATHS.OVERFLOW),
        glassDockText: read(PATHS.GLASSDOCK),
    };
}

function run() {
    const fs = loadFs();
    const s1 = checkS1(fs);
    const s2 = checkS2(fs);
    const s3 = checkS3(fs);
    const s4 = checkS4(fs);
    const self = selfTest();

    const violations = [
        ...s1.violations,
        ...s2.violations,
        ...s3.violations,
        ...s4.violations,
        ...self.errors,
    ];
    const facts = {
        ...s1.facts,
        ...s2.facts,
        ...s3.facts,
        ...s4.facts,
        selfTest: self.ok,
    };
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(PATHS.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:dock-spine",
        note: "BI.W-DOCK-SPINE — the three-z-layer clip-path plate SPINE: L0 plate (clip-path off the ONE --dock-t) / L1 controls (overflow:visible both axes) / L2 top-layer. The triple identity (glass surface + clip aperture + item container) SPLITS — the FAM-3 dock-disease terminal cure. S1 clip-by-construction · S2 one-plate-scalar (A′-4 restyle-scope) · S3 transform-free-centering (SAF-1 fence) · S4 reserved-footprint-passthrough + self-test bites.",
        facts,
        violations,
    });

    const ok = (b) => (b ? "OK" : "RED");
    console.log("proof:dock-spine — the three-z-layer clip-path plate SPINE gate (BI.W-DOCK-SPINE; FAM-3 dock-disease cure)");
    console.log(
        `  S1 clip-by-construction   : containPaint=${facts.s1ContainPaintSites?.length ?? "?"} overflowClip=${facts.s1OverflowClipSites?.length ?? "?"} clipMargin=${facts.s1OverflowClipMarginSites?.length ?? "?"} L1-visible=${facts.s1ControlsOverflowVisible} ${ok(s1.violations.length === 0)}`,
    );
    console.log(
        `  S2 one-plate-scalar       : registrations=${facts.s2DockTRegistrations} inherits-false=${facts.s2InheritsFalse} plate-reads=${facts.s2PlateReadsScalar} stray-readers=${facts.s2StrayReaders?.length ?? "?"} ${ok(s2.violations.length === 0)}`,
    );
    console.log(
        `  S3 transform-free-centering: translate-hits=${facts.s3TranslateHits?.length ?? "?"} margin-auto=${facts.s3MarginAuto} inset-inline=${facts.s3InsetInline} width-max=${facts.s3WidthMaxContent} ${ok(s3.violations.length === 0)}`,
    );
    console.log(
        `  S4 reserved-passthrough   : reserve-none=${facts.s4ReservedMarginNone} hit-auto=${facts.s4HitAreaAuto} ${ok(s4.violations.length === 0)}`,
    );
    console.log(`  self-test (bite proof)    : ${ok(self.ok)}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${relative(PATHS.ROOT, PATHS.ARTIFACT)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

export { checkS1, checkS2, checkS3, checkS4, selfTest };
