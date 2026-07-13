#!/usr/bin/env node
// BI.W-DOCK-RETIRES — proof:dock-retire-terminal, the born-RED decided-terminal
// excision gate. The superseded dock machinery dies CLEAN (no alias, no dual path):
// every §2.8 retirement evaporates with its defect class the moment its successor lands
// (proof:no-dual-path's sibling for the dock band). All verified zero-binary-consumer by
// the G10 constellation grep + registry probe.
//
// PURE DEVICE-FREE static scan (src file-existence + CSS/TS/Vue text scans + a JSON
// register read; no browser, no GPU). Runs on EVERY runner → tags ["local","ci","release"].
//
// CLAUSES (born-RED on the pre-wave tree — fission ~1,392L + siri ~565L + V↔H goo ~634L +
// the ~120L hysteresis + .glass-dock-frame + overflow-clip-margin + railProjection all live):
//   R1 fission-absent      — useDockFission / useDockFissionWiring / dockFissionSignatures /
//      fission-bridge.css / fission-island.css DEFINITION-ABSENT; the dock barrels export
//      NO useDockFission/DOCK_SPLIT_SIGNATURES; ZERO goo `filter: url(#…)` (NOT
//      backdrop-filter) in the library dock CSS — the UF-C3 Safari cause (goo `filter:url()`
//      stacked with `backdrop-filter`) removed.
//   R2 siri-absent         — useSiriDock / SiriDockCapability.vue / siri.css DEFINITION-ABSENT;
//      the dock barrels export NO useSiriDock/SiriDockCapability/SIRI_FORMS/siriFormOf;
//      constants.ts declares NO SIRI_FORMS/SIRI_SQRT_PHI (ruling 18 terminal).
//   R3 orientation-goo-absent — useDockOrientationMorph / morph-bridge.css DEFINITION-ABSENT;
//      the dock barrels export NO useDockOrientationMorph; ZERO `.dock-morph-bridge`
//      two-DOM-dock bridge selector in the library CSS (the V↔H swap is the crossfade).
//   R4 band-aids-absent    — the ~120L hysteresis (isMorphingEdgeSweep + EDGE_BAND_PX),
//      the `.glass-dock-frame` display:contents escape, the `overflow-clip-margin` band-aid,
//      and railProjection.ts DEFINITION-ABSENT (state machine + ~60ms dwell KEPT).
//   R5 decided-terminal-register — the W-DOCK-RETIRES-DISPOSITIONS.json register carries a
//      terminal `retired` row (resolved:true + non-empty rationale + successor + a retiredBy
//      that resolves to a real docs/tranches/<L>/waves/<id>.md) for EVERY required retired
//      mechanism; NO surviving `book`/`deferred`/re-book row.
//
// Self-test bites (each planted disease-state MUST flag): a synthetic re-added useDockFission
// REDs R1; a synthetic goo-`filter:url()`-over-`backdrop-filter` dock rule REDs R1; a
// synthetic re-minted useDockOrientationMorph REDs R3; a synthetic `book` row for a retired
// feature REDs R5.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const HERE = fileURLToPath(import.meta.url);
const ROOT = resolve(HERE, "../..");

const PATHS = {
    ROOT,
    DOCK_COMPOSABLES: resolve(ROOT, "src/components/custom/dock/composables"),
    DOCK_DIR: resolve(ROOT, "src/components/custom/dock"),
    DOCK_STYLES: resolve(ROOT, "src/styles/dock"),
    DOCK_ROOT_CSS: resolve(ROOT, "src/styles/dock.css"),
    DOCK_BARREL: resolve(ROOT, "src/components/custom/dock/index.ts"),
    COMPOSABLES_BARREL: resolve(ROOT, "src/components/custom/dock/composables/index.ts"),
    CONSTANTS: resolve(ROOT, "src/components/custom/dock/constants.ts"),
    USE_DOCK_STATE: resolve(ROOT, "src/components/custom/dock/composables/useDockState.ts"),
    REGISTER: resolve(ROOT, "docs/tranches/BI/audit/W-DOCK-RETIRES-DISPOSITIONS.json"),
    WAVES_DIR: resolve(ROOT, "docs/tranches"),
    ARTIFACT: gateArtifactPath("GLASS_UI_DOCK_RETIRE_ARTIFACT", "dock-retire-terminal"),
};

/** Blank out CSS comments so documented prose never false-matches a live-rule scan. */
function stripCssComments(text) {
    return text.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
}
/** Blank out TS/JS line + block comments. */
function stripTsComments(text) {
    return text
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/(^|[^:])\/\/[^\n]*/g, (m, p1) => p1 + m.slice(p1.length).replace(/[^\n]/g, " "));
}
/** Blank out Vue `<!-- -->` template comments. */
function stripVueComments(text) {
    return text.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "));
}

/** Flat CSS rule split (the dock partials nest only under @layer/@media/@supports). */
function cssRules(text) {
    const clean = stripCssComments(text);
    const rules = [];
    const stack = [];
    let selStart = 0;
    for (let i = 0; i < clean.length; i++) {
        const ch = clean[i];
        if (ch === "{") {
            const selector = clean.slice(selStart, i).trim().split(/[{}]/).pop().trim();
            stack.push({ selector, bodyStart: i + 1 });
        } else if (ch === "}") {
            const frame = stack.pop();
            if (frame) rules.push({ selector: frame.selector, body: clean.slice(frame.bodyStart, i) });
            selStart = i + 1;
        }
    }
    return rules;
}

/** Read a file → "" when absent. */
function read(p) {
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

/** All library dock CSS texts (src/styles/dock/*.css + dock.css). */
function loadDockCss() {
    const files = [];
    if (existsSync(PATHS.DOCK_STYLES)) {
        for (const f of readdirSync(PATHS.DOCK_STYLES)) {
            if (f.endsWith(".css")) files.push(resolve(PATHS.DOCK_STYLES, f));
        }
    }
    files.push(PATHS.DOCK_ROOT_CSS);
    return files.filter(existsSync).map((p) => ({ path: p, text: read(p) }));
}

// ── R1 — fission-absent (+ the UF-C3 goo cause) ──────────────────────────────
function checkR1({ present, barrels, dockCssRules }) {
    const violations = [];
    const facts = {};

    const fissionFiles = [
        "composables/useDockFission.ts",
        "composables/useDockFissionWiring.ts",
        "composables/dockFissionSignatures.ts",
        "styles/dock/fission-bridge.css",
        "styles/dock/fission-island.css",
    ];
    const stillPresent = fissionFiles.filter((f) => present[f]);
    facts.r1FissionFilesPresent = stillPresent;
    if (stillPresent.length) {
        violations.push(
            `R1 — fission SOURCE files still on disk (${stillPresent.join(", ")}); the fission facility must be DEFINITION-ABSENT (clean break, no alias)`,
        );
    }

    // the dock barrels export NO fission symbol.
    const barrelHits = [];
    for (const [name, text] of Object.entries(barrels)) {
        const clean = stripTsComments(text);
        if (/\buseDockFission\b/.test(clean) || /\bDOCK_SPLIT_SIGNATURES\b/.test(clean)) {
            barrelHits.push(name);
        }
    }
    facts.r1FissionExportSites = barrelHits;
    if (barrelHits.length) {
        violations.push(
            `R1 — a dock barrel still exports a fission symbol (${barrelHits.join(", ")}); the /dock surface must drop useDockFission/DOCK_SPLIT_SIGNATURES`,
        );
    }

    // ZERO goo `filter: url(#…)` (NOT backdrop-filter) in the library dock CSS — the UF-C3
    // Safari cause (a goo filter:url() stacked over a backdrop-filter subtree).
    const gooFilterRe = /(?<!backdrop-)filter\s*:\s*url\(/;
    const gooRules = dockCssRules.filter((r) => gooFilterRe.test(r.body));
    facts.r1GooFilterUrlSites = gooRules.map((r) => r.selector);
    if (gooRules.length) {
        violations.push(
            `R1 — a library dock CSS rule declares a goo 'filter: url(#…)' (${gooRules
                .map((r) => r.selector)
                .join(", ")}); the goo-over-backdrop-filter stack is the UF-C3 Safari cause — it must be absent`,
        );
    }

    return { violations, facts };
}

// ── R2 — siri-absent ─────────────────────────────────────────────────────────
function checkR2({ present, barrels, constantsText }) {
    const violations = [];
    const facts = {};

    const siriFiles = [
        "composables/useSiriDock.ts",
        "SiriDockCapability.vue",
        "styles/dock/siri.css",
    ];
    const stillPresent = siriFiles.filter((f) => present[f]);
    facts.r2SiriFilesPresent = stillPresent;
    if (stillPresent.length) {
        violations.push(
            `R2 — siri SOURCE files still on disk (${stillPresent.join(", ")}); the dock module must ship NO siri facility (ruling 18 terminal)`,
        );
    }

    const barrelHits = [];
    for (const [name, text] of Object.entries(barrels)) {
        const clean = stripTsComments(text);
        if (
            /\buseSiriDock\b/.test(clean) ||
            /\bSiriDockCapability\b/.test(clean) ||
            /\bSIRI_FORMS\b/.test(clean) ||
            /\bsiriFormOf\b/.test(clean)
        ) {
            barrelHits.push(name);
        }
    }
    facts.r2SiriExportSites = barrelHits;
    if (barrelHits.length) {
        violations.push(
            `R2 — a dock barrel still exports a siri symbol (${barrelHits.join(", ")}); the /dock surface must drop the siri-* set`,
        );
    }

    // constants.ts declares no SIRI_FORMS/SIRI_SQRT_PHI ladder.
    const constClean = stripTsComments(constantsText);
    const siriConst =
        /\bexport\s+const\s+SIRI_FORMS\b/.test(constClean) ||
        /\bexport\s+const\s+SIRI_SQRT_PHI\b/.test(constClean) ||
        /\bexport\s+function\s+siriFormOf\b/.test(constClean);
    facts.r2SiriConstantsPresent = siriConst;
    if (siriConst) {
        violations.push(
            "R2 — constants.ts still declares the SIRI_FORMS/SIRI_SQRT_PHI/siriFormOf ladder; the Siri form DATA must be DEFINITION-ABSENT",
        );
    }

    return { violations, facts };
}

// ── R3 — orientation-goo-absent ──────────────────────────────────────────────
function checkR3({ present, barrels, dockCssRules }) {
    const violations = [];
    const facts = {};

    const orientFiles = [
        "composables/useDockOrientationMorph.ts",
        "styles/dock/morph-bridge.css",
    ];
    const stillPresent = orientFiles.filter((f) => present[f]);
    facts.r3OrientationFilesPresent = stillPresent;
    if (stillPresent.length) {
        violations.push(
            `R3 — V↔H orientation-morph SOURCE files still on disk (${stillPresent.join(", ")}); the platform cannot interpolate a flex-column→row topology change — the swap is <DockCrossfade>`,
        );
    }

    const barrelHits = [];
    for (const [name, text] of Object.entries(barrels)) {
        const clean = stripTsComments(text);
        if (/\buseDockOrientationMorph\b/.test(clean)) barrelHits.push(name);
    }
    facts.r3OrientationExportSites = barrelHits;
    if (barrelHits.length) {
        violations.push(
            `R3 — a dock barrel still exports useDockOrientationMorph (${barrelHits.join(", ")}); the V↔H driver must be DEFINITION-ABSENT`,
        );
    }

    // ZERO `.dock-morph-bridge` two-DOM-dock teardrop bridge selector in the library CSS.
    const bridgeRules = dockCssRules.filter((r) =>
        /\.dock-morph-bridge\b|\.dock-fission-bridge\b|\.dock-fission-piece\b/.test(r.selector),
    );
    facts.r3BridgeSelectorSites = bridgeRules.map((r) => r.selector);
    if (bridgeRules.length) {
        violations.push(
            `R3 — a library dock CSS rule still targets the goo bridge (${bridgeRules
                .map((r) => r.selector)
                .join(", ")}); the two-DOM-dock metaball bridge must be DEFINITION-ABSENT`,
        );
    }

    return { violations, facts };
}

// ── R4 — band-aids-absent ────────────────────────────────────────────────────
function checkR4({ present, useDockStateText, constantsText, dockCssRules }) {
    const violations = [];
    const facts = {};

    // the ~120L hysteresis — isMorphingEdgeSweep fn + EDGE_BAND_PX const DEFINITION-ABSENT.
    const stateClean = stripTsComments(useDockStateText);
    const constClean = stripTsComments(constantsText);
    const edgeSweep = /function\s+isMorphingEdgeSweep\b/.test(stateClean);
    const edgeBand =
        /\bexport\s+const\s+EDGE_BAND_PX\b/.test(constClean) ||
        /\bconst\s+EDGE_BAND_PX\b/.test(stateClean) ||
        /\bEDGE_BAND_PX\b/.test(stateClean); // any LIVE read in the state machine
    facts.r4HysteresisFnPresent = edgeSweep;
    facts.r4EdgeBandConstPresent = edgeBand;
    if (edgeSweep) {
        violations.push(
            "R4 — useDockState.ts still declares isMorphingEdgeSweep; the ~120L moving-edge-sweep hysteresis must be DEFINITION-ABSENT (the stationary hit frame makes it dead — W-DOCK-SPINE G7)",
        );
    }
    if (edgeBand) {
        violations.push(
            "R4 — the EDGE_BAND_PX moving-edge band constant is still declared/read; it retires with the hysteresis (HOVER_INTENT_MS intent-dwell KEPT)",
        );
    }

    // railProjection.ts DEFINITION-ABSENT.
    facts.r4RailProjectionPresent = present["composables/railProjection.ts"] === true;
    if (facts.r4RailProjectionPresent) {
        violations.push(
            "R4 — railProjection.ts still on disk; an anchored flex strip needs no φ²-crossing ring math (ruling 4) — DEFINITION-ABSENT",
        );
    }

    // the `.glass-dock-frame` display:contents escape — NO live selector in library dock CSS.
    const frameRules = dockCssRules.filter((r) => /\.glass-dock-frame\b|\.dock-hairline-slot\b/.test(r.selector));
    facts.r4FrameEscapeSites = frameRules.map((r) => r.selector);
    if (frameRules.length) {
        violations.push(
            `R4 — a library dock CSS rule still targets the .glass-dock-frame/.dock-hairline-slot escape (${frameRules
                .map((r) => r.selector)
                .join(", ")}); the display:contents escape retires (L2 = top-layer popover)`,
        );
    }

    // the `overflow-clip-margin` cross-axis band-aid — NO live property in library dock CSS.
    const clipMarginRules = dockCssRules.filter((r) => /overflow-clip-margin\s*:/.test(r.body));
    facts.r4ClipMarginSites = clipMarginRules.map((r) => r.selector);
    if (clipMarginRules.length) {
        violations.push(
            `R4 — a library dock CSS rule still declares overflow-clip-margin (${clipMarginRules
                .map((r) => r.selector)
                .join(", ")}); the cross-axis clip band-aid retires (L1 overflow:visible)`,
        );
    }

    return { violations, facts };
}

// ── R5 — decided-terminal register ────────────────────────────────────────────
const REQUIRED_RETIRED = [
    "dock-fission",
    "dock-siri-island",
    "dock-orientation-morph",
    "dock-hysteresis",
    "dock-escape-band-aids",
];

function waveSpecResolves(retiredBy) {
    // retiredBy is `<LETTER>.W-<ID>` → docs/tranches/<LETTER>/waves/<LETTER>.W-<ID>.md
    const m = /^([A-Z]+)\.(W-[A-Z0-9-]+)$/.exec(retiredBy || "");
    if (!m) return false;
    const [, letter] = m;
    const spec = resolve(PATHS.WAVES_DIR, letter, "waves", `${retiredBy}.md`);
    return existsSync(spec);
}

function checkR5({ registerText, requiredRetired = REQUIRED_RETIRED }) {
    const violations = [];
    const facts = {};

    let register = null;
    try {
        register = JSON.parse(registerText);
    } catch {
        violations.push("R5 — the W-DOCK-RETIRES-DISPOSITIONS.json register does not parse (the terminal-register witness is unreadable)");
        return { violations, facts };
    }
    const items = Array.isArray(register?.items) ? register.items : [];
    facts.r5RegisterRows = items.length;

    // NO re-book: no item carries a book/deferred disposition (the disease-state).
    const bookRows = items.filter(
        (it) => it && typeof it.disposition === "string" && /^(book|deferred|deferral)$/i.test(it.disposition),
    );
    facts.r5BookRows = bookRows.map((it) => it.id);
    if (bookRows.length) {
        violations.push(
            `R5 — a retired-feature register row carries a re-book disposition (${bookRows
                .map((it) => it.id)
                .join(", ")}); UF-P2 forbids re-booking — decide (retire/build), never re-book`,
        );
    }

    // every REQUIRED retired mechanism has a sound terminal row.
    const byId = new Map(items.map((it) => [it && it.id, it]));
    const specFacts = {};
    for (const id of requiredRetired) {
        const row = byId.get(id);
        if (!row) {
            violations.push(`R5 — the required retired mechanism '${id}' has NO register row (decided-terminal disposition missing)`);
            continue;
        }
        if (row.disposition !== "retired") {
            violations.push(`R5 — '${id}' is not disposition:"retired" (found "${row.disposition}")`);
        }
        if (row.resolved !== true) {
            violations.push(`R5 — '${id}' is not resolved:true (a retired row must be discharged)`);
        }
        if (!row.rationale || String(row.rationale).trim().length < 20) {
            violations.push(`R5 — '${id}' carries no substantive rationale`);
        }
        if (!row.successor || String(row.successor).trim().length < 10) {
            violations.push(`R5 — '${id}' names no successor (where any surviving need is covered — a NEW ≥2, never a re-open)`);
        }
        const resolves = waveSpecResolves(row.retiredBy);
        specFacts[id] = { retiredBy: row.retiredBy, resolves };
        if (!resolves) {
            violations.push(
                `R5 — '${id}' retiredBy '${row.retiredBy}' does NOT resolve to a real docs/tranches/<L>/waves/<id>.md wave-spec (a phantom-destination retirement)`,
            );
        }
    }
    facts.r5RetiredBySpecs = specFacts;

    return { violations, facts };
}

// ── self-test bites ──────────────────────────────────────────────────────────
function selfTest() {
    const errors = [];

    // R1 bite (a) — a synthetic re-added useDockFission MUST flag.
    const r1a = checkR1({
        present: { "composables/useDockFission.ts": true },
        barrels: {},
        dockCssRules: [],
    });
    if (!r1a.violations.some((v) => v.startsWith("R1"))) {
        errors.push("R1 self-test BROKE — a synthetic re-added useDockFission.ts was NOT flagged");
    }

    // R1 bite (b) — a synthetic goo `filter:url()` over `backdrop-filter` dock rule MUST flag.
    const r1b = checkR1({
        present: {},
        barrels: {},
        dockCssRules: [
            { selector: ".glass-dock", body: "backdrop-filter: blur(8px); filter: url(#dock-fission-goo);" },
        ],
    });
    if (!r1b.violations.some((v) => /UF-C3|goo 'filter: url/.test(v))) {
        errors.push("R1 self-test BROKE — a synthetic goo 'filter: url(#…)' over 'backdrop-filter' dock rule was NOT flagged");
    }

    // R1 bite (c) — a bare `backdrop-filter: url(#…)` must NOT false-flag (the lens, not the goo).
    const r1c = checkR1({
        present: {},
        barrels: {},
        dockCssRules: [{ selector: ".glass-lens", body: "backdrop-filter: url(#glass-refract);" }],
    });
    if (r1c.violations.some((v) => /goo 'filter: url/.test(v))) {
        errors.push("R1 self-test BROKE — a bare 'backdrop-filter: url(#…)' lens was WRONGLY flagged as the goo cause");
    }

    // R3 bite — a synthetic re-minted useDockOrientationMorph MUST flag.
    const r3 = checkR3({
        present: { "composables/useDockOrientationMorph.ts": true },
        barrels: {},
        dockCssRules: [],
    });
    if (!r3.violations.some((v) => v.startsWith("R3"))) {
        errors.push("R3 self-test BROKE — a synthetic re-minted useDockOrientationMorph was NOT flagged");
    }

    // R4 bite — a synthetic isMorphingEdgeSweep MUST flag.
    const r4 = checkR4({
        present: {},
        useDockStateText: "function isMorphingEdgeSweep(e) { return false; }",
        constantsText: "",
        dockCssRules: [],
    });
    if (!r4.violations.some((v) => v.startsWith("R4"))) {
        errors.push("R4 self-test BROKE — a synthetic isMorphingEdgeSweep hysteresis was NOT flagged");
    }

    // R5 bite — a synthetic `book` row for a retired feature MUST flag.
    const r5 = checkR5({
        registerText: JSON.stringify({
            items: [
                { id: "dock-fission", disposition: "book", note: "re-booked (forbidden)" },
                { id: "dock-siri-island", disposition: "retired", resolved: true, retiredBy: "BI.W-DOCK-RETIRES", rationale: "x".repeat(30), successor: "yyyyyyyyyyyy" },
                { id: "dock-orientation-morph", disposition: "retired", resolved: true, retiredBy: "BI.W-DOCK-RETIRES", rationale: "x".repeat(30), successor: "yyyyyyyyyyyy" },
                { id: "dock-hysteresis", disposition: "retired", resolved: true, retiredBy: "BI.W-DOCK-RETIRES", rationale: "x".repeat(30), successor: "yyyyyyyyyyyy" },
                { id: "dock-escape-band-aids", disposition: "retired", resolved: true, retiredBy: "BI.W-DOCK-ESCAPE", rationale: "x".repeat(30), successor: "yyyyyyyyyyyy" },
            ],
        }),
    });
    if (!r5.violations.some((v) => /re-book/.test(v))) {
        errors.push("R5 self-test BROKE — a synthetic 'book' row for a retired feature was NOT flagged (re-book fence not load-bearing)");
    }

    return { ok: errors.length === 0, errors };
}

function loadFs() {
    // file-presence map (repo-relative-ish keys the checks use).
    const p = (rel) => existsSync(resolve(PATHS.DOCK_DIR, rel));
    const present = {
        "composables/useDockFission.ts": p("composables/useDockFission.ts"),
        "composables/useDockFissionWiring.ts": p("composables/useDockFissionWiring.ts"),
        "composables/dockFissionSignatures.ts": p("composables/dockFissionSignatures.ts"),
        "styles/dock/fission-bridge.css": existsSync(resolve(ROOT, "src/styles/dock/fission-bridge.css")),
        "styles/dock/fission-island.css": existsSync(resolve(ROOT, "src/styles/dock/fission-island.css")),
        "composables/useSiriDock.ts": p("composables/useSiriDock.ts"),
        "SiriDockCapability.vue": p("SiriDockCapability.vue"),
        "styles/dock/siri.css": existsSync(resolve(ROOT, "src/styles/dock/siri.css")),
        "composables/useDockOrientationMorph.ts": p("composables/useDockOrientationMorph.ts"),
        "styles/dock/morph-bridge.css": existsSync(resolve(ROOT, "src/styles/dock/morph-bridge.css")),
        "composables/railProjection.ts": p("composables/railProjection.ts"),
    };
    const dockCssRules = loadDockCss().flatMap(({ text }) => cssRules(text));
    return {
        present,
        dockCssRules,
        barrels: {
            "dock/index.ts": read(PATHS.DOCK_BARREL),
            "dock/composables/index.ts": read(PATHS.COMPOSABLES_BARREL),
        },
        constantsText: read(PATHS.CONSTANTS),
        useDockStateText: read(PATHS.USE_DOCK_STATE),
        registerText: read(PATHS.REGISTER),
    };
}

function run() {
    const fs = loadFs();
    const r1 = checkR1(fs);
    const r2 = checkR2(fs);
    const r3 = checkR3(fs);
    const r4 = checkR4(fs);
    const r5 = checkR5(fs);
    const self = selfTest();

    const violations = [
        ...r1.violations,
        ...r2.violations,
        ...r3.violations,
        ...r4.violations,
        ...r5.violations,
        ...self.errors,
    ];
    const facts = {
        ...r1.facts,
        ...r2.facts,
        ...r3.facts,
        ...r4.facts,
        ...r5.facts,
        selfTest: self.ok,
    };
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(PATHS.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:dock-retire-terminal",
        note: "BI.W-DOCK-RETIRES — the decided-terminal excisions (fission ~1,392L + siri ~565L + V↔H goo ~634L + the ~120L hysteresis + .glass-dock-frame + overflow-clip-margin + railProjection all DEFINITION-ABSENT, clean break no alias). R1 fission-absent (+ the UF-C3 goo `filter:url()`×`backdrop-filter` cause removed) · R2 siri-absent (ruling 18 terminal) · R3 orientation-goo-absent (V↔H = crossfade) · R4 band-aids-absent · R5 decided-terminal-register (retiredBy resolves, no re-book) + 4 self-test bites.",
        facts,
        violations,
    });

    const ok = (b) => (b ? "OK" : "RED");
    console.log("proof:dock-retire-terminal — the decided-terminal dock excisions gate (BI.W-DOCK-RETIRES)");
    console.log(
        `  R1 fission-absent          : files=${facts.r1FissionFilesPresent?.length ?? "?"} exports=${facts.r1FissionExportSites?.length ?? "?"} goo-filter-url=${facts.r1GooFilterUrlSites?.length ?? "?"} ${ok(r1.violations.length === 0)}`,
    );
    console.log(
        `  R2 siri-absent             : files=${facts.r2SiriFilesPresent?.length ?? "?"} exports=${facts.r2SiriExportSites?.length ?? "?"} const=${facts.r2SiriConstantsPresent} ${ok(r2.violations.length === 0)}`,
    );
    console.log(
        `  R3 orientation-goo-absent  : files=${facts.r3OrientationFilesPresent?.length ?? "?"} exports=${facts.r3OrientationExportSites?.length ?? "?"} bridge-sel=${facts.r3BridgeSelectorSites?.length ?? "?"} ${ok(r3.violations.length === 0)}`,
    );
    console.log(
        `  R4 band-aids-absent        : hysteresis=${facts.r4HysteresisFnPresent} edge-band=${facts.r4EdgeBandConstPresent} railProjection=${facts.r4RailProjectionPresent} frame-escape=${facts.r4FrameEscapeSites?.length ?? "?"} clip-margin=${facts.r4ClipMarginSites?.length ?? "?"} ${ok(r4.violations.length === 0)}`,
    );
    console.log(
        `  R5 decided-terminal-register: rows=${facts.r5RegisterRows} book-rows=${facts.r5BookRows?.length ?? "?"} ${ok(r5.violations.length === 0)}`,
    );
    console.log(`  self-test (bite proof)     : ${ok(self.ok)}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${relative(PATHS.ROOT, PATHS.ARTIFACT)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

export { checkR1, checkR2, checkR3, checkR4, checkR5, selfTest };
