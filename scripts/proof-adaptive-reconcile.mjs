// proof:adaptive-reconcile — BC.W-ADAPTIVE-RECONCILE: close the observer loop (the
// luma is READ + the strength is CONTINUOUS, not the binary discrete bucket).
//
// THE DISEASE (postmortem/az.md §3 + §8 classes 6/9): the sampled-backdrop observer
// (useGlassBackdropLuminance.ts) WRITES `--glass-backdrop-luma` on its target, but ZERO
// CSS rule READS it into the tint-compose chain (class 6 `built-not-wired` — the dead
// knob); AND the only adaptive darken that DID fire was the discrete `@container
// style(--glass-backdrop: light)` bucket → a binary 4%↔20% jump sold as "dynamic" (class
// 9 `static-heuristic-dressed-as-dynamic`). The loop was OPEN — the observer could never
// move the plate, and the darken was a blanket non-continuous heuristic.
//
// THIS GATE asserts the loop is CLOSED — the device-free SOURCE/MECHANISM arm of the wave
// (the cardinal BC split: this scans CSS source + runs in CI; the live π that the READ
// moves the plate over a real aurora is the local PAINT arm, owned by the orchestrator's
// bc-gestalt-roster capture). Born-RED on the HEAD open-loop shape; GREEN when the
// content/overlay/dock `:where()` rules drive `--glass-tint-strength` as a CONTINUOUS
// clamp off the measured `--glass-backdrop-luma`, the luma is a typed `@property`, and the
// AA ceiling stays bounded.
//
// Five clauses (each born-RED on the open loop, each self-tested):
//   A1 — the luma is READ (loop closed): the content/overlay/dock rules read
//        `var(--glass-backdrop-luma …)` inside a `--glass-tint-strength` clamp.
//   A2 — `--glass-backdrop-luma` is a typed inheriting `@property <number>` (a bare
//        `var()` interpolates, no snap).
//   A3 — the strength is CONTINUOUS (a clamp/calc off the luma), NOT a flat floor NOR a
//        binary `@container`-only jump.
//   A3-overlay — the OVERLAY band SPECIFICALLY joins the continuous driver (the fourier-M
//        Tier-1 #1 fold's OWN born-RED mechanism — the overlay-left-behind evasion bites).
//   A4 — the sample fires over the aurora: the DockStage/aurora demo hosts bind
//        `:background-canvas` on the staged docks (the source-presence half; the live
//        binding is the π).
//   A5 — the floor + ceiling are bounded: the clamp clamps [floor, aa], floor ≤ 5%, aa
//        ≤ 24% (the iOS clamp — never an unconditional slab).
//   + the disease-root bites: (i) a decorative write-only luma reds A1; (ii) a synthetic
//        unconditional flat-`-aa` blanket darken reds A3.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { readMonolith } from "./read-css-monoliths.mjs";

const COMMAND = "npm run proof:adaptive-reconcile";
const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

const LUMA_TOKEN = "--glass-backdrop-luma";

/** Strip CSS comments so a prose mention of a token/shape is not a false hit. */
function strip(s) {
    return s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");
}

const readFileRel = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// The dock shell carved into src/styles/dock/*.css; the tint seam lives in dock/morph.css.
// BD P10b — the `:where(.glass-dock)` adaptive self-engage (the A1 luma-read + A3 continuous
// clamp) was CARVED out of dock/morph.css into dock/adaptive-legibility.css to hold both
// partials under the 500-line no-god-module bound. The carve is isomorphic (same
// `@layer components`, source order preserved via dock.css's adjacent @imports → ZERO visual
// delta). The witness follows the carve — the joined DOCK_FILES blob still contains the rule
// (the no-gray precedent at proof-no-gray.mjs:652 reads both dock partials the same way).
const DOCK_FILES = [
    "src/styles/dock.css",
    "src/styles/dock/shell.css",
    "src/styles/dock/morph.css",
    "src/styles/dock/adaptive-legibility.css",
    "src/styles/dock/density.css",
    "src/styles/dock/layer-group.css",
    "src/styles/dock/layers.css",
    "src/styles/dock/overflow.css",
];

// The DockStage/aurora demo hosts that must bind :background-canvas on staged docks (A4).
const DEMO_HOSTS = [
    "demo/stories/dock/DockStage.vue",
    "demo/stories/dock/overview.vue",
    "demo/stories/dock/layers.vue",
];

/**
 * Extract the BARE unconditional `:where(...) { ... }` body that SETS
 * `--glass-tint-strength` for a given selector set (one brace level — an @container wraps
 * its rules in a deeper brace, so this captures only the unconditional rule). A selector
 * set can appear in MULTIPLE `:where()` rules (e.g. `:where(.glass-dock, .dock-layer)` for
 * motion tokens vs `:where(.glass-dock)` for the tint), so we return the first matching
 * block whose body actually declares the tint strength. Returns the de-commented body or
 * null.
 */
function whereBody(css, selectorRe) {
    const re = new RegExp(`:where\\(([^)]*)\\)\\s*\\{([^{}]*)\\}`, "g");
    let m;
    while ((m = re.exec(css)) !== null) {
        if (selectorRe.test(m[1]) && /--glass-tint-strength\s*:/.test(m[2])) return m[2];
    }
    return null;
}

/** The `--glass-tint-strength: …;` value declared in a body, or null. */
function tintStrengthValue(body) {
    if (!body) return null;
    const m = body.match(/--glass-tint-strength\s*:\s*([^;]+);/);
    return m ? m[1].trim() : null;
}

/**
 * A value is the SANCTIONED CONTINUOUS observer driver when it is a `clamp(` that floors
 * at `var(--glass-tint-strength-floor)` AND READS `var(--glass-backdrop-luma …)` AND
 * ceilings at `var(--glass-tint-strength-aa)`. This is the loop-closed shape: the calm
 * plate (luma ≤ knee) resolves the floor; the AA is EARNED via the measured luma.
 */
export function isContinuousDriver(value) {
    if (!value) return false;
    return (
        /\bclamp\(/.test(value) &&
        /var\(\s*--glass-tint-strength-floor\b/.test(value) &&
        /var\(\s*--glass-backdrop-luma\b/.test(value) &&
        /var\(\s*--glass-tint-strength-aa\b/.test(value)
    );
}

/**
 * Pure detector over the de-commented CSS (the tokens + glass monoliths + the dock
 * family + the property regs). Exported so the self-test feeds synthetic CSS.
 *
 * @param {{tokens:string, glass:string, dock:string}} src
 */
export function detect(src) {
    const tokens = strip(src.tokens);
    const glass = strip(src.glass);
    const dock = strip(src.dock);

    const contentBody = whereBody(glass, /\.glass-card\b/);
    const overlayBody = whereBody(glass, /\.glass-floating\b/);
    const dockBody = whereBody(dock, /\.glass-dock\b/);

    const contentVal = tintStrengthValue(contentBody);
    const overlayVal = tintStrengthValue(overlayBody);
    const dockVal = tintStrengthValue(dockBody);

    // A2 — the luma is a typed inheriting @property <number>.
    const lumaProp = tokens.match(
        new RegExp(`@property\\s+${LUMA_TOKEN}\\s*\\{([^}]*)\\}`),
    );
    const lumaPropBody = lumaProp ? lumaProp[1] : "";
    const lumaIsTypedProperty =
        Boolean(lumaProp) &&
        /syntax\s*:\s*["']<number>["']/.test(lumaPropBody) &&
        /inherits\s*:\s*true/.test(lumaPropBody);

    // A5 — the bounded knob + the floor/aa bounds.
    const kneeMatch = tokens.match(/--glass-backdrop-luma-knee\s*:\s*([\d.]+)/);
    const knee = kneeMatch ? Number(kneeMatch[1]) : null;
    const floorMatch = tokens.match(/--glass-tint-strength-floor\s*:\s*([\d.]+)%/);
    const floorPct = floorMatch ? Number(floorMatch[1]) : null;
    const aaMatch = tokens.match(/--glass-tint-strength-aa\s*:\s*([\d.]+)%/);
    const aaPct = aaMatch ? Number(aaMatch[1]) : null;

    return {
        // A1 — the luma is READ in a tint-strength clamp on the content/overlay/dock rules.
        a1_lumaRead:
            isContinuousDriver(contentVal) &&
            isContinuousDriver(overlayVal) &&
            isContinuousDriver(dockVal),
        a2_typedProperty: lumaIsTypedProperty,
        // A3 — the strength is CONTINUOUS (a clamp off the luma), not a flat floor.
        a3_continuous: isContinuousDriver(contentVal) && isContinuousDriver(dockVal),
        // A3-overlay — the overlay band SPECIFICALLY joins the continuous driver (the
        // overlay-left-behind evasion: a content/dock-continuous gate would miss it).
        a3overlay_overlayJoins: isContinuousDriver(overlayVal),
        // A4 — the demo hosts bind :background-canvas on the staged docks (source-presence).
        a4_canvasThreaded: src.demoCanvasBound,
        // A5 — bounded: the clamp clamps [floor, aa], floor ≤ 5%, aa ≤ 24%.
        a5_bounded:
            isContinuousDriver(contentVal) &&
            knee !== null &&
            knee > 0 &&
            knee < 1 &&
            floorPct !== null &&
            floorPct > 0 &&
            floorPct <= 5 &&
            aaPct !== null &&
            aaPct > 0 &&
            aaPct <= 24,
        facts: { contentVal, overlayVal, dockVal, knee, floorPct, aaPct, lumaIsTypedProperty },
    };
}

/** Are the demo hosts binding :background-canvas on staged docks (A4)? */
function demoCanvasBound() {
    const stage = strip(readFileRel("demo/stories/dock/DockStage.vue"));
    // DockStage exposes the aurora canvas through the scoped slot.
    const stageExposes =
        /ref="auroraRef"/.test(stage) &&
        /<slot\s+:background-canvas="backgroundCanvas"/.test(stage);
    // ≥1 enrolled host binds :background-canvas on a staged dock.
    const hostBinds = ["demo/stories/dock/overview.vue", "demo/stories/dock/layers.vue"].some(
        (f) => /:background-canvas="backgroundCanvas"/.test(readFileRel(f)),
    );
    return stageExposes && hostBinds;
}

function selfTest() {
    const bites = [];
    const sane = {
        tokens: `@property --glass-backdrop-luma { syntax: "<number>"; inherits: true; initial-value: 0; }
            :root { --glass-backdrop-luma-knee: 0.6; --glass-tint-strength-floor: 4%; --glass-tint-strength-aa: 20%; }`,
        demoCanvasBound: true,
    };
    const CLAMP = `clamp(var(--glass-tint-strength-floor), calc(var(--glass-tint-strength-floor) + (var(--glass-tint-strength-aa) - var(--glass-tint-strength-floor)) * max(0, (var(--glass-backdrop-luma, 0) - var(--glass-backdrop-luma-knee, 0.6)) / (1 - var(--glass-backdrop-luma-knee, 0.6)))), var(--glass-tint-strength-aa))`;
    const closedGlass = `
        :where(.glass-card, .glass-resting, .glass-quiet, .glass-wash) { --glass-tint-strength: ${CLAMP}; }
        :where(.glass-floating, .glass-overlay) { --glass-tint-strength: ${CLAMP}; }`;
    const closedDock = `:where(.glass-dock) { --glass-tint-strength: ${CLAMP}; }`;

    // CLOSED → every clause greens.
    {
        const d = detect({ ...sane, glass: closedGlass, dock: closedDock });
        bites.push({
            name: "loop-closed greens all clauses",
            reds: d.a1_lumaRead && d.a2_typedProperty && d.a3_continuous && d.a3overlay_overlayJoins && d.a4_canvasThreaded && d.a5_bounded,
        });
    }
    // Bite (i) — the decorative WRITE-ONLY dead knob: a flat floor, the luma never read.
    {
        const flatGlass = `
            :where(.glass-card, .glass-resting, .glass-quiet, .glass-wash) { --glass-tint-strength: var(--glass-tint-strength-floor); }
            :where(.glass-floating, .glass-overlay) { --glass-tint-strength: var(--glass-tint-strength-floor); }`;
        const flatDock = `:where(.glass-dock) { --glass-tint-strength: var(--glass-tint-strength-floor); }`;
        const d = detect({ ...sane, glass: flatGlass, dock: flatDock });
        bites.push({ name: "decorative write-only (flat floor, luma unread) reds A1/A3", reds: !d.a1_lumaRead && !d.a3_continuous });
    }
    // Bite (ii) — the static-heuristic-dressed-as-dynamic: a flat unconditional `-aa`.
    {
        const blanketGlass = `
            :where(.glass-card, .glass-resting, .glass-quiet, .glass-wash) { --glass-tint-strength: var(--glass-tint-strength-aa); }
            :where(.glass-floating, .glass-overlay) { --glass-tint-strength: var(--glass-tint-strength-aa); }`;
        const blanketDock = `:where(.glass-dock) { --glass-tint-strength: var(--glass-tint-strength-aa); }`;
        const d = detect({ ...sane, glass: blanketGlass, dock: blanketDock });
        bites.push({ name: "unconditional flat -aa blanket darken reds A3", reds: !d.a3_continuous });
    }
    // A3-overlay bite — content/dock CONTINUOUS but the OVERLAY left on the bare floor.
    {
        const leftBehind = `
            :where(.glass-card, .glass-resting, .glass-quiet, .glass-wash) { --glass-tint-strength: ${CLAMP}; }
            :where(.glass-floating, .glass-overlay) { --glass-tint-strength: var(--glass-tint-strength-floor); }`;
        const d = detect({ ...sane, glass: leftBehind, dock: closedDock });
        bites.push({ name: "overlay-left-behind reds A3-overlay (the fold's own bite)", reds: d.a3_continuous && !d.a3overlay_overlayJoins });
    }
    // A2 bite — the luma not a typed @property (only the empty stub) reds A2.
    {
        const stub = { ...sane, tokens: `:root { --glass-backdrop-luma: ; --glass-backdrop-luma-knee: 0.6; --glass-tint-strength-floor: 4%; --glass-tint-strength-aa: 20%; }` };
        const d = detect({ ...stub, glass: closedGlass, dock: closedDock });
        bites.push({ name: "write-only stub (no @property) reds A2", reds: !d.a2_typedProperty });
    }
    // A5 bite — an unbounded aa (> 24%) reds A5 (the slab-to-win ceiling breach).
    {
        const hot = { ...sane, tokens: sane.tokens.replace("--glass-tint-strength-aa: 20%", "--glass-tint-strength-aa: 40%") };
        const d = detect({ ...hot, glass: closedGlass, dock: closedDock });
        bites.push({ name: "aa > 24% reds A5 (the iOS ceiling breach)", reds: !d.a5_bounded });
    }
    return bites;
}

function run() {
    const det = detect({
        tokens: readMonolith(ROOT, "tokens"),
        glass: readMonolith(ROOT, "glass"),
        dock: DOCK_FILES.map((p) => readFileRel(p)).join("\n"),
        demoCanvasBound: demoCanvasBound(),
    });

    const bites = selfTest();
    const biteFailures = bites.filter((b) => !b.reds);
    const selfTestOk = biteFailures.length === 0;

    const checks = [
        { id: "A1-luma-read", pass: det.a1_lumaRead, detail: "the content/overlay/dock :where() rules READ var(--glass-backdrop-luma …) inside a --glass-tint-strength clamp (the dead-knob closed — a paint-driving read). Born-RED on HEAD write-only." },
        { id: "A2-typed-property", pass: det.a2_typedProperty, detail: "--glass-backdrop-luma is a typed inheriting @property <number> (a bare var() interpolates, no snap). Born-RED on HEAD: only the empty --glass-backdrop-luma: ; stub." },
        { id: "A3-continuous", pass: det.a3_continuous, detail: "the content/dock strength is a CONTINUOUS clamp off the luma, NOT a flat floor NOR a binary @container-only jump. Self-test: a flat-floor / unconditional-aa re-point reds." },
        { id: "A3-overlay-joins", pass: det.a3overlay_overlayJoins, detail: "the OVERLAY band (:where(.glass-floating, .glass-overlay)) SPECIFICALLY joins the continuous driver (the fourier-M Tier-1 #1 fold). Born-RED on the HEAD flat overlay floor; the overlay-left-behind self-test bites." },
        { id: "A4-canvas-threaded", pass: det.a4_canvasThreaded, detail: "the DockStage exposes the aurora <canvas> through the scoped slot + ≥1 enrolled host binds :background-canvas on a staged dock (the source-presence half; the binding live half is the π)." },
        { id: "A5-bounded", pass: det.a5_bounded, detail: `the clamp clamps [floor, aa]; floor=${det.facts.floorPct}% (≤5%), aa=${det.facts.aaPct}% (≤24% — the iOS clamp), knee=${det.facts.knee}. A calc that can exceed ≤24% reds.` },
        { id: "self-test-bites-red", pass: selfTestOk, detail: selfTestOk ? "the loop-closed / decorative-write / unconditional-blanket / overlay-left-behind / stub / unbounded-aa bites all behave (RED→GREEN over the pure detector)" : `self-test bite(s) misbehaved: ${biteFailures.map((b) => b.name).join(", ")}` },
    ];

    const failed = checks.filter((c) => !c.pass);
    const pass = failed.length === 0;

    const ARTIFACT = gateArtifactPath("GATE_ADAPTIVE_RECONCILE_OUT", "BC-adaptive-reconcile");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status: pass ? "pass" : "fail",
        gate: "proof:adaptive-reconcile",
        command: COMMAND,
        note: "SOURCE arm — asserts BC.W-ADAPTIVE-RECONCILE closed the observer loop: the luma is READ as a CONTINUOUS clamp driver (not the dead knob, not the binary bucket), typed @property, bounded [floor..aa], canvas threaded. Born-RED on HEAD open loop. The live π that the READ moves the plate over a real aurora is the local paint arm (bc-gestalt-roster glass-adaptive/dock).",
        facts: det.facts,
        checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
    });

    console.log("proof:adaptive-reconcile — the observer loop closed (BC.W-ADAPTIVE-RECONCILE)");
    for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

    if (!pass) {
        console.error(`\n[proof:adaptive-reconcile] ${failed.length} check(s) FAILED:`);
        for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
        process.exit(1);
    }
    console.log("\n[proof:adaptive-reconcile] the loop is CLOSED — the luma DRIVES the continuous darken (the dead-knob + the binary bucket retired).");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
