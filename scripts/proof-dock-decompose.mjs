#!/usr/bin/env node
// proof:dock-decompose — the GlassDock.vue god-SFC decomposition gate
// (BG.W-DOCK-DECOMPOSE, the F6.5 one-writer-per-concern carve; KS-DOCK 4.4).
//
// GlassDock.vue was one of three dock files grandfathered in proof:no-god-module
// (711 lines, RATCHET baseline #2). This wave carves it under the 500-line bound
// along ENGINE seams with ONE structural concern each (never arbitrary line splits):
//   • the collapsed-pill touch-gate (useTouchGate + the tap/scroll discrimination +
//     the collapse-on-deactivate watch) → composables/useDockTouchGate.ts.
//   • the fission split-facility wiring (the split-signature/placement refs + the
//     [data-dock-splittable] piece auto-registration + detach vectors + the
//     drag-to-split pointer state + the imperative split/merge/toggle surface) →
//     composables/useDockFissionWiring.ts.
// The SFC COMPOSES both leaves. Each carved leaf is single-consumer-by-design and is
// NEVER a morph-scalar writer — the collapse morph's `--dock-morph-t`/`--dock-morph-v`
// scalar stays the orchestrator's (dockMorphContext), so a carved gesture leaf that
// writes it REDs (the single-writer assert).
//
// Pure FS, device-free (paint-class H — a mechanical carve changes ZERO pixels, the
// BB.W-CARVE4 byte-identical-paint discipline). CONFIRM + GATE: born-RED on HEAD
// (GlassDock.vue 711 > 500 AND the leaves absent AND the ratchet row present), GREEN
// on the carve (≤ 500 + leaves imported + row drained). The self-test bites are the
// anti-vacuity proof — each synthetic sabotage REDs its clause.
//
// Asserts:
//   D1 — RATCHET-DRAIN: GlassDock.vue is ≤ 500 lines AND the proof-no-god-module.mjs
//        RATCHET_BASELINES map carries NO `"components/custom/dock/GlassDock.vue": N`
//        row (baseline #2 gone; the monotonic drain).
//   D2 — COLOCATION: both carved leaves (useDockTouchGate.ts + useDockFissionWiring.ts)
//        exist on disk AND GlassDock.vue imports both.
//   D3 — SINGLE-WRITER: GlassDock.vue + the two carved leaves write ZERO
//        `--dock-morph-t`/`--dock-morph-v` (comment-stripped) — the collapse morph
//        scalar has ONE writer (the orchestrator), never the SFC or a gesture leaf.
//
// Self-test bites (born-RED demonstration): a 601-line GlassDock REDs D1; a present
// ratchet row REDs D1; an absent leaf REDs D2; a missing import REDs D2; a leaf that
// `setProperty("--dock-morph-t", …)` REDs D3.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const SRC = resolve(ROOT, "src");
const COMMAND = "npm run proof:dock-decompose";
const SELF_TEST = process.argv.includes("--self-test");
const HARD_LIMIT = 500;

const DOCK_DIR = resolve(SRC, "components/custom/dock");
const GLASSDOCK = resolve(DOCK_DIR, "GlassDock.vue");
const TOUCH_GATE = resolve(DOCK_DIR, "composables/useDockTouchGate.ts");
const FISSION_WIRING = resolve(DOCK_DIR, "composables/useDockFissionWiring.ts");
const GOD_MODULE = resolve(ROOT, "scripts/proof-no-god-module.mjs");

function read(p) {
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// Line count = the proof:no-god-module lineCount (split on "\n", drop a trailing
// empty segment from a final newline — matches `wc -l`).
function lineCount(text) {
    if (text.length === 0) return 0;
    const parts = text.split("\n");
    if (parts[parts.length - 1] === "") parts.pop();
    return parts.length;
}

// Strip // line + /* block */ + <!-- vue --> comments (the copy-prune fence — a
// scalar named in a comment is provenance, never a write).
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");
}

// The morph-scalar WRITE detector (D3). After comment-strip, a `--dock-morph-t`/
// `--dock-morph-v` occurrence in a gesture/SFC file is a write — the orchestrator is
// the sole writer of the collapse morph scalar.
function morphScalarWrites(src) {
    return (stripComments(src).match(/--dock-morph-[tv]\b/g) || []).length;
}

// The ratchet-row shape (D1): a quoted `src/`-relative key followed by `: <number>`.
// A bare comment mention of "GlassDock.vue" (e.g. the drain note) does NOT match.
const RATCHET_ROW_RE =
    /"components\/custom\/dock\/GlassDock\.vue"\s*:\s*\d+/;

// ── The detector — runs over a SOURCE MAP so a self-test can sabotage inputs.
// overrides: { glassDockText?, godModuleSource?, touchGateExists?, fissionWiringExists?,
//              touchGateSource?, fissionWiringSource? }.
function detect(overrides = {}) {
    const violations = [];
    const facts = {};
    function assert(label, ok) {
        facts[label] = Boolean(ok);
        if (!ok) violations.push(label);
    }

    const glassDockSrc =
        overrides.glassDockText ?? read(GLASSDOCK);
    const godSrc = overrides.godModuleSource ?? read(GOD_MODULE);

    // ── D1 — RATCHET-DRAIN: GlassDock.vue ≤ 500 AND no ratchet row. ──
    const glassDockLines = lineCount(glassDockSrc);
    const underBound = glassDockLines <= HARD_LIMIT;
    const rowPresent = RATCHET_ROW_RE.test(godSrc);
    facts.glassDockLines = glassDockLines;
    facts.ratchetRowPresent = rowPresent;
    assert(
        "D1 — GlassDock.vue is ≤ 500 lines AND its proof:no-god-module RATCHET baseline row is drained",
        underBound && !rowPresent,
    );

    // ── D2 — COLOCATION: both leaves exist AND GlassDock imports both. ──
    const touchExists =
        overrides.touchGateExists ?? existsSync(TOUCH_GATE);
    const fissionExists =
        overrides.fissionWiringExists ?? existsSync(FISSION_WIRING);
    const importsTouch = /from\s+"\.\/composables\/useDockTouchGate"/.test(
        glassDockSrc,
    );
    const importsFission = /from\s+"\.\/composables\/useDockFissionWiring"/.test(
        glassDockSrc,
    );
    facts.leaves = { touchExists, fissionExists, importsTouch, importsFission };
    assert(
        "D2 — the two carved leaves (useDockTouchGate + useDockFissionWiring) exist AND GlassDock.vue imports both",
        touchExists && fissionExists && importsTouch && importsFission,
    );

    // ── D3 — SINGLE-WRITER: no `--dock-morph-t`/`--dock-morph-v` write in the SFC or
    // either carved gesture leaf (the orchestrator is the sole morph-scalar writer). ──
    const touchSrc =
        overrides.touchGateSource ?? (touchExists ? read(TOUCH_GATE) : "");
    const fissionSrc =
        overrides.fissionWiringSource ??
        (fissionExists ? read(FISSION_WIRING) : "");
    const morphWrites =
        morphScalarWrites(glassDockSrc) +
        morphScalarWrites(touchSrc) +
        morphScalarWrites(fissionSrc);
    facts.morphScalarWriteCount = morphWrites;
    assert(
        "D3 — zero `--dock-morph-t`/`--dock-morph-v` write in GlassDock.vue or the carved gesture leaves (single-writer: the morph scalar stays the orchestrator's)",
        morphWrites === 0,
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
                `[proof:dock-decompose self-test] the bite FAILED to flag: ${name}`,
            );
    };
    const sabNot = (overrides, labels, name) => {
        const { violations } = detect(overrides);
        if (!labels.some((l) => violations.includes(l))) flagged++;
        else
            throw new Error(
                `[proof:dock-decompose self-test] the fence bite WRONGLY flagged: ${name}`,
            );
    };

    const D1 =
        "D1 — GlassDock.vue is ≤ 500 lines AND its proof:no-god-module RATCHET baseline row is drained";
    const D2 =
        "D2 — the two carved leaves (useDockTouchGate + useDockFissionWiring) exist AND GlassDock.vue imports both";
    const D3 =
        "D3 — zero `--dock-morph-t`/`--dock-morph-v` write in GlassDock.vue or the carved gesture leaves (single-writer: the morph scalar stays the orchestrator's)";

    const liveGlassDock = read(GLASSDOCK);

    // D1: a 601-line GlassDock (the god-SFC un-carved).
    sab(
        { glassDockText: "x\n".repeat(601) + liveGlassDock },
        [D1],
        "D1 GlassDock.vue over the 500-line bound",
    );
    // D1: a re-added / surviving ratchet row.
    sab(
        {
            godModuleSource: `const RATCHET_BASELINES = { "components/custom/dock/GlassDock.vue": 711 };`,
        },
        [D1],
        "D1 the ratchet baseline row survives",
    );
    // D1 (fence): a bare comment mention of GlassDock.vue does NOT re-arm the row.
    sabNot(
        {
            godModuleSource: `// BG.W-DOCK-DECOMPOSE DRAINED GlassDock.vue (711 → 495)\nconst RATCHET_BASELINES = {};`,
        },
        [D1],
        "D1 comment-mention fence (a drain note is not a live row)",
    );
    // D2: a carved leaf missing from disk.
    sab(
        { touchGateExists: false },
        [D2],
        "D2 the useDockTouchGate leaf absent",
    );
    // D2: the SFC never imports a carved leaf.
    sab(
        {
            glassDockText: liveGlassDock.replace(
                /import\s+\{\s*useDockFissionWiring[\s\S]*?"\.\/composables\/useDockFissionWiring";/,
                "",
            ),
        },
        [D2],
        "D2 GlassDock.vue drops the fission-wiring import",
    );
    // D3: a carved leaf writes the collapse morph scalar (the single-writer breach).
    sab(
        {
            fissionWiringSource: `el.style.setProperty("--dock-morph-t", "0.5");`,
        },
        [D3],
        "D3 a carved leaf writes --dock-morph-t",
    );

    return flagged;
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_DOCK_DECOMPOSE_ARTIFACT",
        "BG-dock-decompose",
    );

    const selfTestCount = selfTest();
    const { facts, violations } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:dock-decompose",
        command: COMMAND,
        selfTestChecks: selfTestCount,
        facts,
        violations,
    });

    console.log(
        "proof:dock-decompose — GlassDock.vue carved to leaves (ratchet #2 drained; single-writer preserved)",
    );
    console.log(`  D1 ratchet-drain (≤500, no row) : ${facts["D1 — GlassDock.vue is ≤ 500 lines AND its proof:no-god-module RATCHET baseline row is drained"]} (lines=${facts.glassDockLines}, rowPresent=${facts.ratchetRowPresent})`);
    console.log(`  D2 colocation (leaves+imports)  : ${facts["D2 — the two carved leaves (useDockTouchGate + useDockFissionWiring) exist AND GlassDock.vue imports both"]}`);
    console.log(`  D3 single-writer (0 morph write): ${facts["D3 — zero `--dock-morph-t`/`--dock-morph-v` write in GlassDock.vue or the carved gesture leaves (single-writer: the morph scalar stays the orchestrator's)"]} (writes=${facts.morphScalarWriteCount})`);
    console.log(`  self-test (bite proof)          : OK — ${selfTestCount} synthetic sabotages handled (D1×2 + D1-fence + D2×2 + D3)`);

    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);

    if (SELF_TEST)
        console.log(`\n[proof:dock-decompose --self-test] ${selfTestCount} bite(s) handled; tree ${status === "pass" ? "GREEN" : "RED"}`);

    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

export { detect, selfTest };
