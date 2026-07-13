#!/usr/bin/env node
// BI.W-DOCK-CONTROLS — proof:dock-controls, the born-RED selection-engine + face-fold
// gate. The dock IS SegmentedTabs/ToggleGroup wearing chrome (PASS-1 §1 DOCK-D verdict):
// its control run, the tabs, and the toggle-group are the SAME roving-focus selection
// strip. This wave MINTS the ONE headless engine + the ONE indicator writer + the folded
// control face; the ~34-site consumer migration EXECUTES in W-DOCK-FOLD (the two are
// sequenced: CONTROLS mints, FOLD migrates).
//
// PURE DEVICE-FREE static src-scan (CSS + TS + Vue-template, no browser, no GPU) →
// tags ["local","ci","release"].
//
// CLAUSES (born-RED on the pre-wave tree — no `useSelectionGroup`, the safe-inset 10%
// band-aid is live in the recipe files, `useTabIndicator.ts` + the SegmentedTabs CSS-anchor
// dual path are live, no `<DockControl>`):
//   C1 one-selection-engine — exactly ONE `useSelectionGroup` (minted once, composes
//      `useTabRovingFocus` + `useSelectionIndicator` VERBATIM — no re-forked roving/
//      indicator/selection machinery inside it), published on `/motion-core`, with ≥1
//      consumer wiring it. (The full three-mount consolidation — tabs + toggle-group +
//      dock — greens at W-DOCK-FOLD; this wave mints the engine + the dock-run consumer.)
//   C2 one-indicator-writer — exactly ONE `useSelectionIndicator`; `useTabIndicator.ts`
//      DEFINITION-ABSENT (promoted); the SegmentedTabs CSS-anchor dual path
//      (`ANCHOR_SUPPORTED`/`jsSliderActive`/`segmented-indicator--anchor`) + the pill
//      `.segmented-indicator--anchor` CSS rules DEFINITION-ABSENT (Safari-identical).
//   C3 face-token-fold — `--dock-control-safe-inset` reads ONLY through the
//      `.glass-capsule` face (`glass-capsule.css` carries the read + `background-clip:
//      content-box`); ZERO standalone safe-inset routing survives in the dock-control
//      recipe files.
//   C4 44px-hit-cell — `<DockControl>` exists; the icon-control recipe sizes its HIT CELL
//      off the full `--dock-control-size` (never reduced by the inset — the inset is
//      `padding` inside the cell); `--dock-control-size` carries the `max(…,
//      --dock-control-floor)` WCAG clamp (the axe target-size floor, A11Y-5's 17×40px cure).
//
// Self-test bites (each planted defect MUST flag): a synthetic SECOND indicator writer
// REDs C2; a synthetic sub-cell width (safe-inset subtracted from the hit box) REDs C4;
// a synthetic re-forked roving machine inside the engine REDs C1.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, relative, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const HERE = fileURLToPath(import.meta.url);
const ROOT = resolve(HERE, "../..");

const PATHS = {
    ROOT,
    USG: resolve(ROOT, "src/composables/motion/useSelectionGroup.ts"),
    USI: resolve(ROOT, "src/composables/motion/useSelectionIndicator.ts"),
    USI_OLD: resolve(ROOT, "src/components/custom/tabs/composables/useTabIndicator.ts"),
    ROVING: resolve(ROOT, "src/components/custom/tabs/composables/useTabRovingFocus.ts"),
    SEGTABS: resolve(ROOT, "src/components/custom/tabs/SegmentedTabs.vue"),
    SEGCSS: resolve(ROOT, "src/styles/segmented-tabs.css"),
    SEGDRAG: resolve(ROOT, "src/styles/tabs/segmented-tabs-drag.css"),
    CAPSULE: resolve(ROOT, "src/styles/glass/glass-capsule.css"),
    ICONBTN: resolve(ROOT, "src/styles/dock-controls/icon-button.css"),
    TABBTN: resolve(ROOT, "src/styles/dock-controls/tab-button.css"),
    TRIGGERS: resolve(ROOT, "src/styles/dock-controls/triggers.css"),
    DENSITY: resolve(ROOT, "src/styles/dock/density.css"),
    DOCKCONTROL: resolve(ROOT, "src/components/custom/dock/DockControl.vue"),
    DOCKTRIGGER: resolve(ROOT, "src/components/custom/dock/DockTrigger.vue"),
    CORE_BARREL: resolve(ROOT, "src/composables/motion/core/index.ts"),
    SCAN_ROOTS: [resolve(ROOT, "src"), resolve(ROOT, "demo")],
};

function stripCssComments(text) {
    return text.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
}
function stripTsComments(text) {
    return text
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/(^|[^:])\/\/[^\n]*/g, (m, p1) => p1 + m.slice(p1.length).replace(/[^\n]/g, " "));
}
function stripVueComments(text) {
    return text.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "));
}
const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : null);

/** Recursively grep the scan roots for a live (comment-stripped) `useSelectionGroup(`
 *  CALL, excluding the definition file + the barrel re-export. */
function findEngineConsumers() {
    const hits = [];
    const exclude = new Set([PATHS.USG, PATHS.CORE_BARREL]);
    const walk = (dir) => {
        let entries;
        try {
            entries = readdirSync(dir);
        } catch {
            return;
        }
        for (const name of entries) {
            if (name === "node_modules" || name === "dist" || name.startsWith(".")) continue;
            const p = join(dir, name);
            let st;
            try {
                st = statSync(p);
            } catch {
                continue;
            }
            if (st.isDirectory()) {
                walk(p);
            } else if (/\.(ts|vue)$/.test(name) && !exclude.has(p)) {
                const raw = readFileSync(p, "utf8");
                const clean = name.endsWith(".vue")
                    ? stripTsComments(stripVueComments(raw))
                    : stripTsComments(raw);
                if (/\buseSelectionGroup\s*(<[^>]*>)?\s*\(/.test(clean)) {
                    hits.push(relative(PATHS.ROOT, p));
                }
            }
        }
    };
    for (const r of PATHS.SCAN_ROOTS) walk(r);
    return hits;
}

// ── C1 — one-selection-engine ────────────────────────────────────────────────
function checkC1({ usgText, coreBarrelText, consumers }) {
    const violations = [];
    const facts = {};

    facts.c1EngineExists = usgText != null;
    if (usgText == null) {
        violations.push(
            "C1 — 'composables/motion/useSelectionGroup.ts' is ABSENT; the ONE headless selection engine is not minted",
        );
        return { violations, facts };
    }
    const clean = stripTsComments(usgText);

    // it EXPORTS the engine once.
    const exports = clean.match(/export\s+function\s+useSelectionGroup\b/g) || [];
    facts.c1EngineExports = exports.length;
    if (exports.length !== 1) {
        violations.push(
            `C1 — expected EXACTLY one 'export function useSelectionGroup' (found ${exports.length})`,
        );
    }

    // it COMPOSES the roving machine + the indicator writer VERBATIM (imports both).
    const composesRoving = /import[^;]*\buseTabRovingFocus\b[^;]*from/.test(clean) &&
        /\buseTabRovingFocus\s*\(/.test(clean);
    const composesIndicator = /import[^;]*\buseSelectionIndicator\b[^;]*from/.test(clean) &&
        /\buseSelectionIndicator\s*(<[^>]*>)?\s*\(/.test(clean);
    facts.c1ComposesRoving = composesRoving;
    facts.c1ComposesIndicator = composesIndicator;
    if (!composesRoving) {
        violations.push(
            "C1 — 'useSelectionGroup' does NOT compose 'useTabRovingFocus' (the ONE roving machine); a re-forked roving machine is a selection-engine fork",
        );
    }
    if (!composesIndicator) {
        violations.push(
            "C1 — 'useSelectionGroup' does NOT compose 'useSelectionIndicator' (the ONE writer)",
        );
    }

    // it does NOT RE-FORK the roving internals (the `useTabRovingFocus` private helpers).
    // A local `function focusEnabled`/`function focusEdge` would be a re-implementation.
    const reForked =
        /function\s+focusEnabled\b/.test(clean) || /function\s+focusEdge\b/.test(clean);
    facts.c1ReForkedRoving = reForked;
    if (reForked) {
        violations.push(
            "C1 — 'useSelectionGroup' RE-FORKS the roving internals (focusEnabled/focusEdge); it must compose 'useTabRovingFocus' VERBATIM, not re-implement it",
        );
    }

    // published on /motion-core (the core barrel re-exports it).
    const published = coreBarrelText != null &&
        /export \* from ["']\.\.\/useSelectionGroup["']/.test(stripTsComments(coreBarrelText));
    facts.c1PublishedMotionCore = published;
    if (!published) {
        violations.push(
            "C1 — 'useSelectionGroup' is NOT published on '/motion-core' (the core barrel does not re-export it)",
        );
    }

    // ≥1 consumer wires it (the dock control run — the demo reference).
    facts.c1Consumers = consumers;
    if (consumers.length < 1) {
        violations.push(
            "C1 — NO consumer wires 'useSelectionGroup'; the engine must drive ≥1 selection mount (the dock control run)",
        );
    }

    return { violations, facts };
}

// ── C2 — one-indicator-writer ────────────────────────────────────────────────
function checkC2({ usiText, usiOldExists, segTabsText, segCssText, segDragText }) {
    const violations = [];
    const facts = {};

    // exactly ONE `useSelectionIndicator` definition.
    facts.c2WriterExists = usiText != null;
    const exports = usiText ? (stripTsComments(usiText).match(/export\s+function\s+useSelectionIndicator\b/g) || []) : [];
    facts.c2WriterExports = exports.length;
    if (exports.length !== 1) {
        violations.push(
            `C2 — expected EXACTLY one 'export function useSelectionIndicator' (found ${exports.length}); the ONE writer is minted once`,
        );
    }

    // the promoted `useTabIndicator.ts` is DEFINITION-ABSENT.
    facts.c2OldWriterAbsent = !usiOldExists;
    if (usiOldExists) {
        violations.push(
            "C2 — 'tabs/composables/useTabIndicator.ts' still EXISTS; the writer was PROMOTED to 'composables/motion/useSelectionIndicator.ts' (a dual writer is a fork)",
        );
    }

    // the writer carries NO CSS-anchor gate (no `anchorSupported`/`jsSliderActive` param).
    if (usiText) {
        const cw = stripTsComments(usiText);
        const anchorParam =
            /\banchorSupported\b/.test(cw) || /\bjsSliderActive\b/.test(cw);
        facts.c2WriterNoAnchorGate = !anchorParam;
        if (anchorParam) {
            violations.push(
                "C2 — 'useSelectionIndicator' still carries a CSS-anchor gate (anchorSupported/jsSliderActive); the dual path retired — the ONE JS writer measures on EVERY engine",
            );
        }
    }

    // SegmentedTabs.vue — the CSS-anchor dual path is DEFINITION-ABSENT.
    const segClean = segTabsText ? stripTsComments(stripVueComments(segTabsText)) : "";
    const segAnchorHits = [];
    if (/\bANCHOR_SUPPORTED\b/.test(segClean)) segAnchorHits.push("ANCHOR_SUPPORTED");
    if (/\bjsSliderActive\b/.test(segClean)) segAnchorHits.push("jsSliderActive");
    if (/\bjsSingleSlider\b/.test(segClean)) segAnchorHits.push("jsSingleSlider");
    if (/segmented-indicator--anchor/.test(segClean)) segAnchorHits.push("segmented-indicator--anchor(class)");
    facts.c2SegAnchorHits = segAnchorHits;
    if (segAnchorHits.length) {
        violations.push(
            `C2 — SegmentedTabs.vue still carries the CSS-anchor dual path (${segAnchorHits.join(", ")}); the pill indicator must ride the ONE JS writer (Safari-identical)`,
        );
    }
    // the SFC still imports the promoted writer (not the retired one).
    if (segTabsText) {
        const importsWriter = /import[^;]*\buseSelectionIndicator\b[^;]*from/.test(segClean);
        const importsOld = /useTabIndicator/.test(segClean);
        facts.c2SegImportsWriter = importsWriter;
        facts.c2SegImportsOld = importsOld;
        if (!importsWriter || importsOld) {
            violations.push(
                "C2 — SegmentedTabs.vue does NOT import the promoted 'useSelectionIndicator' (or still references 'useTabIndicator')",
            );
        }
    }

    // the pill `.segmented-indicator--anchor` CSS rules are DEFINITION-ABSENT (a comment
    // mention is fine — scan the comment-stripped CSS for a live SELECTOR/block).
    const cssAnchorSites = [];
    for (const [label, txt] of [["segmented-tabs.css", segCssText], ["segmented-tabs-drag.css", segDragText]]) {
        if (!txt) continue;
        const clean = stripCssComments(txt);
        // a rule whose selector targets `.segmented-indicator--anchor` (a live block).
        const re = /\.segmented-indicator--anchor\b[^{}]*\{/g;
        const hits = clean.match(re) || [];
        if (hits.length) cssAnchorSites.push(`${label}(${hits.length})`);
    }
    facts.c2CssAnchorSites = cssAnchorSites;
    if (cssAnchorSites.length) {
        violations.push(
            `C2 — the pill '.segmented-indicator--anchor' CSS rules survive (${cssAnchorSites.join(", ")}); the anchor branch is DEFINITION-ABSENT (the underline ::before anchor is a distinct paper indicator, kept)`,
        );
    }

    return { violations, facts };
}

// ── C3 — face-token-fold ─────────────────────────────────────────────────────
function checkC3({ capsuleText, iconBtnText, tabBtnText, triggersText }) {
    const violations = [];
    const facts = {};

    // the FACE reads `--dock-control-safe-inset` + carries `background-clip: content-box`.
    const capClean = capsuleText ? stripCssComments(capsuleText) : "";
    const faceReadsInset = /var\(\s*--dock-control-safe-inset\b/.test(capClean);
    const faceContentBox = /background-clip\s*:\s*content-box\b/.test(capClean);
    facts.c3FaceReadsInset = faceReadsInset;
    facts.c3FaceContentBox = faceContentBox;
    if (!faceReadsInset) {
        violations.push(
            "C3 — 'glass-capsule.css' (the face) does NOT read 'var(--dock-control-safe-inset)'; the safe-inset must fold INTO the face token home",
        );
    }
    if (!faceContentBox) {
        violations.push(
            "C3 — the '.glass-capsule' face does NOT carry 'background-clip: content-box'; the painted plate cannot inset within the hit cell",
        );
    }

    // ZERO standalone safe-inset TOKEN routing survives in the dock-control recipe files.
    const recipeSites = [];
    for (const [label, txt] of [
        ["icon-button.css", iconBtnText],
        ["tab-button.css", tabBtnText],
        ["triggers.css", triggersText],
    ]) {
        if (!txt) continue;
        const clean = stripCssComments(txt);
        if (/var\(\s*--dock-control-safe-inset\b/.test(clean)) recipeSites.push(label);
    }
    facts.c3RecipeSafeInsetSites = recipeSites;
    if (recipeSites.length) {
        violations.push(
            `C3 — standalone '--dock-control-safe-inset' routing survives in the dock-control recipe files (${recipeSites.join(", ")}); it must read ONLY through the '.glass-capsule' face`,
        );
    }

    return { violations, facts };
}

// ── C4 — 44px-hit-cell ───────────────────────────────────────────────────────
function checkC4({ dockControlText, dockTriggerText, iconBtnText, densityText }) {
    const violations = [];
    const facts = {};

    // <DockControl> + <DockTrigger> exist (the folded survivors).
    facts.c4DockControlExists = dockControlText != null;
    facts.c4DockTriggerExists = dockTriggerText != null;
    if (dockControlText == null) {
        violations.push("C4 — '<DockControl>' is ABSENT; the folded icon+tab survivor is not minted");
    }
    if (dockTriggerText == null) {
        violations.push("C4 — '<DockTrigger>' is ABSENT; the folded overlay-trigger survivor is not minted");
    }

    // the icon-control HIT CELL reads the full `--dock-control-size` (never reduced by the
    // inset — the inset is `padding` INSIDE the cell, not a width/inline-size subtraction).
    const iconClean = iconBtnText ? stripCssComments(iconBtnText) : "";
    const widthReadsSize = /(?:width|inline-size)\s*:\s*var\(\s*--dock-control-size\b/.test(iconClean);
    const heightReadsSize = /(?:height|block-size)\s*:\s*var\(\s*--dock-control-size\b/.test(iconClean);
    facts.c4WidthReadsCellSize = widthReadsSize;
    facts.c4HeightReadsCellSize = heightReadsSize;
    if (!(widthReadsSize && heightReadsSize)) {
        violations.push(
            "C4 — the icon control hit cell does NOT size off the full '--dock-control-size' (width+height); the hit box must read the full cell (the 17×40px defect is a reduced hit box)",
        );
    }
    // the hit cell must not SUBTRACT the safe-inset from the width/height (that IS the
    // 17×40 defect — the inset eaten off the hit box).
    const subtractsInset =
        /(?:width|height|inline-size|block-size)\s*:[^;]*--dock-control-safe-inset/.test(iconClean);
    facts.c4WidthSubtractsInset = subtractsInset;
    if (subtractsInset) {
        violations.push(
            "C4 — the icon control hit cell SUBTRACTS '--dock-control-safe-inset' from its width/height; the inset must be PADDING inside the cell, never a hit-box reduction (A11Y-5)",
        );
    }

    // `--dock-control-size` carries the `max(…, --dock-control-floor)` WCAG clamp (density).
    const densClean = densityText ? stripCssComments(densityText) : "";
    const clamp = /--dock-control-size\s*:\s*max\([^;]*--dock-control-floor/.test(densClean);
    facts.c4ControlSizeClamp = clamp;
    if (!clamp) {
        violations.push(
            "C4 — '--dock-control-size' does NOT carry the 'max(…, --dock-control-floor)' clamp; the ≥44px coarse touch floor is not guaranteed",
        );
    }

    return { violations, facts };
}

// ── self-test bites ──────────────────────────────────────────────────────────
function selfTest() {
    const errors = [];

    // C2 bite — a synthetic SECOND indicator writer (still-present useTabIndicator.ts) MUST flag.
    const c2 = checkC2({
        usiText: "export function useSelectionIndicator() {}",
        usiOldExists: true,
        segTabsText: "import { useSelectionIndicator } from '.';",
        segCssText: "",
        segDragText: "",
    });
    if (!c2.violations.some((v) => /useTabIndicator\.ts/.test(v))) {
        errors.push("C2 self-test BROKE — a still-present 'useTabIndicator.ts' (a second writer) was NOT flagged");
    }

    // C2 bite (b) — a surviving `.segmented-indicator--anchor` CSS rule MUST flag.
    const c2b = checkC2({
        usiText: "export function useSelectionIndicator() {}",
        usiOldExists: false,
        segTabsText: "import { useSelectionIndicator } from '.';",
        segCssText: ".segmented-indicator--anchor { position-anchor: --x; }",
        segDragText: "",
    });
    if (!c2b.violations.some((v) => /segmented-indicator--anchor/.test(v))) {
        errors.push("C2 self-test BROKE — a surviving pill '.segmented-indicator--anchor' rule was NOT flagged");
    }

    // C4 bite — a synthetic sub-cell width (safe-inset subtracted from the hit box) MUST flag.
    const c4 = checkC4({
        dockControlText: "<template></template>",
        dockTriggerText: "<template></template>",
        iconBtnText:
            ".dock-icon-button { width: calc(var(--dock-control-size) - var(--dock-control-safe-inset)); height: var(--dock-control-size); }",
        densityText: ".glass-dock[data-size=md] { --dock-control-size: max(2.5rem, var(--dock-control-floor)); }",
    });
    if (!c4.violations.some((v) => /SUBTRACTS/.test(v))) {
        errors.push("C4 self-test BROKE — a hit box that subtracts the safe-inset from its width was NOT flagged (A11Y-5 not load-bearing)");
    }

    // C1 bite — a re-forked roving machine inside the engine MUST flag.
    const c1 = checkC1({
        usgText:
            "import { useTabRovingFocus } from '.'; export function useSelectionGroup() { function focusEnabled() {} useTabRovingFocus(); }",
        coreBarrelText: "export * from '../useSelectionGroup';",
        consumers: ["demo/x.vue"],
    });
    if (!c1.violations.some((v) => /RE-FORKS/.test(v))) {
        errors.push("C1 self-test BROKE — a re-forked roving machine inside the engine was NOT flagged");
    }

    return { ok: errors.length === 0, errors };
}

function loadFs() {
    return {
        usgText: read(PATHS.USG),
        usiText: read(PATHS.USI),
        usiOldExists: existsSync(PATHS.USI_OLD),
        segTabsText: read(PATHS.SEGTABS),
        segCssText: read(PATHS.SEGCSS),
        segDragText: read(PATHS.SEGDRAG),
        capsuleText: read(PATHS.CAPSULE),
        iconBtnText: read(PATHS.ICONBTN),
        tabBtnText: read(PATHS.TABBTN),
        triggersText: read(PATHS.TRIGGERS),
        densityText: read(PATHS.DENSITY),
        dockControlText: read(PATHS.DOCKCONTROL),
        dockTriggerText: read(PATHS.DOCKTRIGGER),
        coreBarrelText: read(PATHS.CORE_BARREL),
    };
}

function run() {
    const fs = loadFs();
    const consumers = findEngineConsumers();
    const c1 = checkC1({ usgText: fs.usgText, coreBarrelText: fs.coreBarrelText, consumers });
    const c2 = checkC2(fs);
    const c3 = checkC3(fs);
    const c4 = checkC4(fs);
    const self = selfTest();

    const violations = [
        ...c1.violations,
        ...c2.violations,
        ...c3.violations,
        ...c4.violations,
        ...self.errors,
    ];
    const facts = {
        ...c1.facts,
        ...c2.facts,
        ...c3.facts,
        ...c4.facts,
        selfTest: self.ok,
    };
    const status = violations.length === 0 ? "pass" : "fail";

    const ARTIFACT = gateArtifactPath("GLASS_UI_DOCK_CONTROLS_ARTIFACT", "dock-controls");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:dock-controls",
        note: "BI.W-DOCK-CONTROLS — useSelectionGroup (the ONE headless selection engine) + useSelectionIndicator (the ONE writer, CSS-anchor dual path retired → Safari-identical) + the folded --dock-control-safe-inset face token + <DockControl>/<DockTrigger>. C1 one-selection-engine · C2 one-indicator-writer · C3 face-token-fold · C4 44px-hit-cell (A11Y-5) + self-test bites. The ~34-site consumer migration EXECUTES in W-DOCK-FOLD.",
        facts,
        violations,
    });

    const ok = (b) => (b ? "OK" : "RED");
    console.log("proof:dock-controls — useSelectionGroup + the ONE indicator writer + the folded face (BI.W-DOCK-CONTROLS)");
    console.log(
        `  C1 one-selection-engine   : engine=${facts.c1EngineExists} composes(roving=${facts.c1ComposesRoving}/indicator=${facts.c1ComposesIndicator}) motion-core=${facts.c1PublishedMotionCore} consumers=${facts.c1Consumers?.length ?? "?"} ${ok(c1.violations.length === 0)}`,
    );
    console.log(
        `  C2 one-indicator-writer   : writer=${facts.c2WriterExists} old-absent=${facts.c2OldWriterAbsent} seg-anchor=${facts.c2SegAnchorHits?.length ?? "?"} css-anchor=${facts.c2CssAnchorSites?.length ?? "?"} ${ok(c2.violations.length === 0)}`,
    );
    console.log(
        `  C3 face-token-fold        : face-reads-inset=${facts.c3FaceReadsInset} content-box=${facts.c3FaceContentBox} recipe-routing=${facts.c3RecipeSafeInsetSites?.length ?? "?"} ${ok(c3.violations.length === 0)}`,
    );
    console.log(
        `  C4 44px-hit-cell          : DockControl=${facts.c4DockControlExists} hit-cell-full=${facts.c4WidthReadsCellSize && facts.c4HeightReadsCellSize} subtracts-inset=${facts.c4WidthSubtractsInset} floor-clamp=${facts.c4ControlSizeClamp} ${ok(c4.violations.length === 0)}`,
    );
    console.log(`  self-test (bite proof)    : ${ok(self.ok)}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${relative(PATHS.ROOT, ARTIFACT)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

export { checkC1, checkC2, checkC3, checkC4, selfTest };
