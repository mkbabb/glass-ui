#!/usr/bin/env node
// proof:liquid-morph — BC.W-LIQUID-MORPH — the arbitrary-shape dock morph that is NEVER
// white, NEVER invisible (the D5 root; the AY box-morph re-opened).
//
// The morph-WHITE root is a degenerate scaleX(0) / a zero-width reserved box
// (glass-dock-codebase.md §2.2): a `to:0`/`from:0` measurement with no scale floor →
// `scaleX(0)` + `inline-size: 0` → `overflow: clip` blanks the content → a white box.
// This wave makes the white box impossible via THREE coordinated moves: a defensive
// scale floor (the white box can never paint), a verified+guarded live measurement (the
// to:0 race seats at the floor), and the teardrop bridge re-expressed compositor-only
// (clip-path/scale, NEVER per-frame width — folding the teardrop fidelity onto the
// compositor so the AZ perf-miss is moot).
//
// The device-free SOURCE/MECHANISM arm (tags ["local","ci","release"]). The PAINT arm is
// the ORCHESTRATOR's: the per-frame composited-pixel proof (meanLum > 0 + the glass plate
// present EVERY frame, incl. a synthetic to:0 worst-case) + the re-measured compositor-
// teardrop perf trace, captured to docs/tranches/BC/audit/visual/W-LIQUID-MORPH-DELTA.md.
//
// THE CARDINAL SPLIT this gate validates born-RED→GREEN itself (the SOURCE arm):
//   M1 — the reserve floor: layers.css reserves `max(var(--dock-morph-to),
//        var(--dock-morph-min ...))` on BOTH axes. Born-RED on HEAD's bare
//        var(--dock-morph-to). Self-test bite: a planted bare reserve reds.
//   M2 — the scale floor: --dock-morph-scale is `max(<calc>, 0.06)`. Born-RED on HEAD's
//        unfloored calc. Self-test bite: an unfloored scale reds.
//   M3 — the measure-failure guard: dockMorphContext.ts carries the measuredTo === 0 →
//        seat-at-floor branch (morphMinFloorPx). Self-test bite: an unguarded measure reds.
//   M4 — the teardrop is compositor-only: morph-bridge.css animates NO width/height on
//        --dock-morph-t (clip-path/scale/translate). Born-RED on HEAD's per-frame
//        width/height calc. Self-test bite: a planted width: calc(... --dock-morph-t ...) reds.
//   M5 — the ship decision is data-grounded: the DELTA exists + names the re-measured p50
//        + the throttle factor + the GPU + the resulting default (the AZ booking RESOLVED,
//        not silently re-booked). Self-test bite: a missing perf-field / a SwiftShader-only
//        number reds.
//
// Run: node scripts/proof-liquid-morph.mjs

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:liquid-morph";

const stripCss = (s) =>
    s.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
const stripJs = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");
const readRel = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

const LAYERS_CSS = "src/styles/dock/layers.css";
const BRIDGE_CSS = "src/styles/dock/morph-bridge.css";
const CTX_TS = "src/components/custom/dock/composables/dockMorphContext.ts";
const MEASURE_TS = "src/components/custom/dock/composables/dockMorphMeasure.ts";
const DELTA = "docs/tranches/BC/audit/visual/W-LIQUID-MORPH-DELTA.md";

// ── M1 — the reserve floor (both axes) ──
export function detectM1() {
    const violations = [];
    const facts = {};
    const layers = stripCss(readRel(LAYERS_CSS));
    const floored = (prop) =>
        new RegExp(
            `${prop}:\\s*max\\(\\s*var\\(\\s*--dock-morph-to\\s*\\)\\s*,\\s*var\\(\\s*--dock-morph-min`,
        ).test(layers);
    facts.inlineFloored = floored("inline-size");
    facts.blockFloored = floored("block-size");
    // No BARE unfloored reserve survives (the white-morph root).
    facts.noBareReserve =
        !/inline-size:\s*var\(\s*--dock-morph-to\s*\)\s*;/.test(layers) &&
        !/block-size:\s*var\(\s*--dock-morph-to\s*\)\s*;/.test(layers);
    if (!facts.inlineFloored)
        violations.push("M1: the inline-size reserve is not floored by max(var(--dock-morph-to), var(--dock-morph-min ...)) — a to:0 measurement reserves a zero-width box (the white morph)");
    if (!facts.blockFloored)
        violations.push("M1: the block-size reserve is not floored by max(var(--dock-morph-to), var(--dock-morph-min ...)) — a to:0 measurement reserves a zero-height box (the vertical white morph)");
    if (!facts.noBareReserve)
        violations.push("M1: a BARE unfloored `inline-size`/`block-size: var(--dock-morph-to)` reserve survives in layers.css — the white-morph root is not closed");
    return { violations, facts };
}
function detectM1SelfTest() {
    const BARE = `.x { inline-size: var(--dock-morph-to); }`;
    const FLOORED = `.x { inline-size: max(var(--dock-morph-to), var(--dock-morph-min, 2.75rem)); }`;
    const floored = (s) =>
        /inline-size:\s*max\(\s*var\(\s*--dock-morph-to\s*\)\s*,\s*var\(\s*--dock-morph-min/.test(s);
    const bare = (s) => /inline-size:\s*var\(\s*--dock-morph-to\s*\)\s*;/.test(s);
    return floored(BARE) === false && bare(BARE) === true && floored(FLOORED) === true;
}

// ── M2 — the scale floor ──
export function detectM2() {
    const violations = [];
    const facts = {};
    const layers = stripCss(readRel(LAYERS_CSS));
    // --dock-morph-scale is `max(calc(...), 0.06)` (the degenerate ratio bottoms at a
    // visible sliver, never scaleX(0)).
    facts.scaleFloored =
        /--dock-morph-scale:\s*max\(\s*calc\([\s\S]*?\)\s*,\s*0\.0\d+\s*\)/.test(layers);
    if (!facts.scaleFloored)
        violations.push("M2: --dock-morph-scale is not floored by max(<calc>, 0.06) — a degenerate ratio runs scaleX(0) (the zero-width white void)");
    // The scaleX/scaleY composite still reads --dock-morph-scale (the morph mechanism kept).
    facts.scaleStillComposited =
        /scaleX\(var\(--dock-morph-scale\)\)/.test(layers) &&
        /scaleY\(var\(--dock-morph-scale\)\)/.test(layers);
    if (!facts.scaleStillComposited)
        violations.push("M2: the scaleX/scaleY composite no longer reads --dock-morph-scale — the reserved-footprint scale morph regressed");
    return { violations, facts };
}
function detectM2SelfTest() {
    const UNFLOORED = `--dock-morph-scale: calc(var(--dock-morph-ratio) + (1 - var(--dock-morph-ratio)) * var(--dock-morph-t, 0));`;
    const FLOORED = `--dock-morph-scale: max(calc(var(--dock-morph-ratio) + (1 - var(--dock-morph-ratio)) * var(--dock-morph-t, 0)), 0.06);`;
    const floored = (s) => /--dock-morph-scale:\s*max\(\s*calc\([\s\S]*?\)\s*,\s*0\.0\d+\s*\)/.test(s);
    return floored(UNFLOORED) === false && floored(FLOORED) === true;
}

// ── M3 — the measure-failure guard (measuredTo === 0 → seat at floor) ──
export function detectM3() {
    const violations = [];
    const facts = {};
    const ctx = stripJs(readRel(CTX_TS));
    const measure = stripJs(readRel(MEASURE_TS));
    // The orchestrator seats a 0 measurement at the floor span (morphMinFloorPx).
    facts.guardPresent =
        /morphMinFloorPx/.test(ctx) &&
        /measuredTo\s*>\s*0\s*\?\s*measuredTo\s*:/.test(ctx);
    if (!facts.guardPresent)
        violations.push("M3: dockMorphContext.ts has no `measuredTo === 0 → seat-at-floor` guard (the defensive measure-failure complement) — a missed measurement degrades to white, not visible-at-floor");
    // The floor helper exists (pure, reads the resolved --dock-morph-min, falls back to 44px).
    facts.floorHelperPresent =
        /export function morphMinFloorPx/.test(measure) &&
        /--dock-morph-min/.test(measure) &&
        /44/.test(measure);
    if (!facts.floorHelperPresent)
        violations.push("M3: dockMorphMeasure.ts has no morphMinFloorPx helper reading --dock-morph-min with the 44px WCAG fallback (the reserve-floor px)");
    return { violations, facts };
}
function detectM3SelfTest() {
    const UNGUARDED = `const toSize = getSize(elNow, axis); armTarget(t, id, fromSize, toSize);`;
    const GUARDED = `const measuredTo = getSize(elNow, axis); const toSize = measuredTo > 0 ? measuredTo : morphMinFloorPx(elNow); armTarget(t, id, fromSize, toSize);`;
    const guarded = (s) => /morphMinFloorPx/.test(s) && /measuredTo\s*>\s*0\s*\?\s*measuredTo\s*:/.test(s);
    return guarded(UNGUARDED) === false && guarded(GUARDED) === true;
}

// ── M4 — the teardrop is compositor-only (no width/height on --dock-morph-t) ──
const LAYOUT_PROPS = ["width", "height", "inline-size", "block-size", "padding", "margin", "top", "left", "right", "bottom", "inset"];
function parseDecls(source) {
    const out = [];
    const re = /([a-z-]+)\s*:\s*([^;{}]+)/gi;
    let m;
    while ((m = re.exec(source)) !== null) {
        out.push({ prop: m[1].toLowerCase(), value: m[2], line: source.slice(0, m.index).split("\n").length });
    }
    return out;
}
const isLayoutProp = (p) => LAYOUT_PROPS.some((l) => p === l || p.startsWith(`${l}-`));
const animatesScalar = (value) =>
    /var\(\s*--dock-morph-t/.test(value) && /calc\(/.test(value);
export function detectM4() {
    const violations = [];
    const facts = { layoutLegs: [] };
    const bridge = stripCss(readRel(BRIDGE_CSS));
    for (const d of parseDecls(bridge)) {
        if (isLayoutProp(d.prop) && animatesScalar(d.value)) {
            facts.layoutLegs.push(`morph-bridge.css:${d.line} — ${d.prop}: ${d.value.trim().slice(0, 50)}`);
            violations.push(
                `M4: morph-bridge.css:${d.line} — the layout property \`${d.prop}\` animates --dock-morph-t (\`${d.value.trim().slice(0, 50)}\`) — the teardrop silhouette must be clip-path/scale only (the per-frame-width layout-jank root)`,
            );
        }
    }
    // Positive: the silhouette DOES morph on the compositor (clip-path on the scalar).
    facts.clipPathMorphPresent = /clip-path:\s*inset\([\s\S]*?var\(\s*--dock-bridge-[vh]-neck/.test(bridge) ||
        /clip-path:[\s\S]*?var\(\s*--dock-morph-t/.test(bridge);
    if (!facts.clipPathMorphPresent)
        violations.push("M4: the teardrop bridge does not morph its silhouette via clip-path on --dock-morph-t — the compositor re-expression is absent");
    return { violations, facts };
}
function detectM4SelfTest() {
    const PLANTED = `.x { width: calc(3.25rem * (1 - var(--dock-morph-t, 0)) + 18rem * var(--dock-morph-t, 0)); }`;
    const SAFE = `.x { clip-path: inset(0 var(--dock-bridge-h-neck) 0 var(--dock-bridge-h-neck) round 999px); scale: var(--stretch, 1) calc(1 / var(--stretch, 1)); }`;
    const layoutLeg = (s) => parseDecls(s).some((d) => isLayoutProp(d.prop) && animatesScalar(d.value));
    return layoutLeg(PLANTED) === true && layoutLeg(SAFE) === false;
}

// ── M5 — the ship decision is data-grounded (the DELTA names the perf fields) ──
export function detectM5() {
    const violations = [];
    const facts = {};
    const delta = readRel(DELTA);
    facts.deltaExists = delta.length > 0;
    if (!facts.deltaExists) {
        violations.push("M5: the W-LIQUID-MORPH-DELTA.md does not exist — the ship-decision number is not recorded (the AZ booking would be silently re-booked)");
        return { violations, facts };
    }
    // The DELTA names the required ship-decision fields (the orchestrator fills the live
    // values; the gate asserts the fields are NAMED so the booking is resolved on a
    // number, not silently dropped).
    facts.namesP50 = /p50/i.test(delta);
    facts.namesThrottle = /throttle/i.test(delta) && /4×|4x/i.test(delta);
    facts.namesGpu = /Metal|ANGLE/i.test(delta);
    // The binding protocol REJECTS a SwiftShader-only number (the non-binding headless judge).
    facts.notSwiftShaderOnly = !/SwiftShader.*(only|the.*judge|p50)/i.test(delta) || /NOT.*SwiftShader|not headless SwiftShader/i.test(delta);
    facts.namesDefault = /resulting default|the default arbitrary-shape morph|stays the default|SHIPS as the default/i.test(delta);
    facts.namesAzGround = /13\.7|15\.1|arm-a/i.test(delta);
    if (!facts.namesP50)
        violations.push("M5: the DELTA does not name the re-measured p50 (the ship-decision number)");
    if (!facts.namesThrottle)
        violations.push("M5: the DELTA does not name the 4× CPU throttle factor (the binding protocol)");
    if (!facts.namesGpu)
        violations.push("M5: the DELTA does not name the Metal/ANGLE dev box (a SwiftShader-only number cannot judge liquid-morph smoothness)");
    if (!facts.notSwiftShaderOnly)
        violations.push("M5: the DELTA records a SwiftShader-only number (the non-binding headless judge) — the binding protocol requires the Metal/ANGLE dev box");
    if (!facts.namesDefault)
        violations.push("M5: the DELTA does not name the resulting ship default (the always-on teardrop vs the VT-crossfade floor decision)");
    if (!facts.namesAzGround)
        violations.push("M5: the DELTA does not name the AZ arm-a born-RED ground (p50 13.7–15.1ms, the before)");
    return { violations, facts };
}
function detectM5SelfTest() {
    const MISSING = `# delta\nsome text, no perf number`;
    const COMPLETE = `# delta\np50 8ms under 4× throttle on the Metal/ANGLE dev box; resulting default the always-on teardrop SHIPS as the default; the AZ arm-a ground p50 13.7–15.1ms.`;
    const ok = (s) =>
        /p50/i.test(s) &&
        /throttle/i.test(s) &&
        /(4×|4x)/i.test(s) &&
        /Metal|ANGLE/i.test(s) &&
        /resulting default|SHIPS as the default/i.test(s) &&
        /13\.7|15\.1|arm-a/i.test(s);
    return ok(MISSING) === false && ok(COMPLETE) === true;
}

// ── compose ──
export function detect() {
    const m1 = detectM1();
    const m2 = detectM2();
    const m3 = detectM3();
    const m4 = detectM4();
    const m5 = detectM5();
    const selfTests = {
        m1: detectM1SelfTest(),
        m2: detectM2SelfTest(),
        m3: detectM3SelfTest(),
        m4: detectM4SelfTest(),
        m5: detectM5SelfTest(),
    };
    const selfTestViolations = [];
    for (const [k, ok] of Object.entries(selfTests)) {
        if (!ok)
            selfTestViolations.push(
                `${k.toUpperCase()} self-test bite BROKE — the detector does not bite its planted ${k} fixture`,
            );
    }
    const violations = [
        ...m1.violations,
        ...m2.violations,
        ...m3.violations,
        ...m4.violations,
        ...m5.violations,
        ...selfTestViolations,
    ];
    return {
        violations,
        facts: { m1: m1.facts, m2: m2.facts, m3: m3.facts, m4: m4.facts, m5: m5.facts, selfTests },
    };
}

function run() {
    const { violations, facts } = detect();
    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath("GLASS_UI_LIQUID_MORPH_ARTIFACT", "BC-liquid-morph");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:liquid-morph",
        command: COMMAND,
        note: "BC.W-LIQUID-MORPH device-free SOURCE arm (M1 the reserve floor — max(--dock-morph-to, --dock-morph-min) both axes · M2 the scale floor — max(<calc>, 0.06) · M3 the measure-failure guard — measuredTo===0 → seat-at-floor via morphMinFloorPx · M4 the teardrop compositor-only — no width/height on --dock-morph-t, clip-path/scale · M5 the ship decision is data-grounded — the DELTA names the re-measured p50 + throttle + GPU + resulting default). The white-morph SAFETY NET is inert on healthy measurements. The PAINT arm (the per-frame meanLum>0 + the synthetic to:0 worst-case + the re-measured compositor-teardrop perf trace) is the orchestrator's W-LIQUID-MORPH-DELTA.",
        facts,
        violations,
    });
    console.log(`proof:liquid-morph — ${status.toUpperCase()}`);
    console.log(`  M1 inline-floored=${facts.m1.inlineFloored} block-floored=${facts.m1.blockFloored} no-bare=${facts.m1.noBareReserve}`);
    console.log(`  M2 scale-floored=${facts.m2.scaleFloored} scale-composited=${facts.m2.scaleStillComposited}`);
    console.log(`  M3 guard=${facts.m3.guardPresent} floor-helper=${facts.m3.floorHelperPresent}`);
    console.log(`  M4 layout-legs=${facts.m4.layoutLegs.length} clip-path-morph=${facts.m4.clipPathMorphPresent}`);
    console.log(`  M5 delta-exists=${facts.m5.deltaExists} p50=${facts.m5.namesP50} throttle=${facts.m5.namesThrottle} gpu=${facts.m5.namesGpu} default=${facts.m5.namesDefault}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    } else {
        console.log(`  artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    }
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
