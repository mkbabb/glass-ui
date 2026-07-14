#!/usr/bin/env node
// proof:liquid-morph — BC.W-LIQUID-MORPH — the arbitrary-shape dock morph that is NEVER
// white, NEVER invisible (the D5 root; the AY box-morph re-opened).
//
// The morph-WHITE root is a degenerate scaleX(0) / a zero-width reserved box
// (glass-dock-codebase.md §2.2): a `to:0`/`from:0` measurement with no scale floor →
// `scaleX(0)` + `inline-size: 0` → `overflow: clip` blanks the content → a white box.
// This wave makes the white box impossible via two coordinated moves: a defensive
// scale floor (the white box can never paint) and a verified+guarded live measurement
// (the to:0 race seats at the floor). (The teardrop bridge — once re-expressed
// compositor-only — retired with morph-bridge.css.)
//
// The device-free SOURCE/MECHANISM arm (tags ["local","ci","release"]). The PAINT arm is
// the ORCHESTRATOR's: the per-frame composited-pixel proof (meanLum > 0 + the glass plate
// present EVERY frame, incl. a synthetic to:0 worst-case) + the re-measured compositor-
// teardrop perf trace, captured to docs/tranches/BC/audit/visual/W-LIQUID-MORPH-DELTA.md.
//
// THE CARDINAL SPLIT this gate validates born-RED→GREEN itself (the SOURCE arm):
//   M1 — the reserve endpoint (BD.W-DOCK-CORE ratio-free supersede): layers.css reserves
//        the measure-ONCE `inline/block-size: var(--dock-expanded-px)` on BOTH axes; no
//        per-swap `var(--dock-morph-to)` reserve survives. Self-test bite: a planted
//        --dock-morph-to reserve reds.
//   M2 — the scale is the CLAMPED convex blend: `--dock-size-scale: clamp(...
//        var(--dock-live)/max(var(--dock-expanded-px ...)))` (bounded by construction —
//        not the deleted unbounded `--dock-morph-scale: max(<ratio>, 0.06)`). Self-test
//        bite: the deleted --dock-morph-scale shape reds.
//   M3 — the measure-failure floor: useDockExpandedSize seats
//        `finalExpanded = Math.max(expandedSeed, collapsedPx)` (collapsedFloorPx 44px) —
//        a 0 measurement seats at collapsed, never white. Self-test bite: an unfloored
//        finalExpanded reds.
//   (M4 — the teardrop-compositor arm — RETIRED with morph-bridge.css: the bridge
//    mechanism was culled, so there is no longer a per-frame-width surface to guard.)
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
const CTX_TS = "src/components/custom/dock/composables/dockMorphContext.ts";
const MEASURE_TS = "src/components/custom/dock/composables/dockMorphMeasure.ts";
const DELTA = "docs/tranches/BC/audit/visual/W-LIQUID-MORPH-DELTA.md";

// ── M1 — the reserve endpoint is measure-ONCE + floored (both axes) ──
// BD.W-DOCK-CORE superseded the per-swap `--dock-morph-to` reserve (the white-morph
// root: a to:0 measurement) with the measure-ONCE `--dock-expanded-px` endpoint that
// `useDockExpandedSize` FLOORS at `max(measured, collapsed)` in JS (dockMorphMeasure.ts)
// — the white-morph guard MOVED from a CSS `max()` wrapper to the JS freshness floor.
// M1 now witnesses the reserve names that floored endpoint on both axes.
export function detectM1() {
    const violations = [];
    const facts = {};
    const layers = stripCss(readRel(LAYERS_CSS));
    facts.inlineReservesEndpoint = /inline-size:\s*var\(--dock-expanded-px\)/.test(layers);
    facts.blockReservesEndpoint = /block-size:\s*var\(--dock-expanded-px\)/.test(layers);
    // No BARE per-swap `--dock-morph-to` reserve survives (the deleted seizure shape).
    facts.noMorphToReserve =
        !/(?:inline|block)-size:\s*[^;]*var\(\s*--dock-morph-to\s*\)/.test(layers);
    if (!facts.inlineReservesEndpoint)
        violations.push("M1: the inline-size reserve does not name the measure-ONCE `var(--dock-expanded-px)` endpoint — the ratio-free reserved footprint regressed");
    if (!facts.blockReservesEndpoint)
        violations.push("M1: the block-size reserve does not name the measure-ONCE `var(--dock-expanded-px)` endpoint — the vertical reserved footprint regressed");
    if (!facts.noMorphToReserve)
        violations.push("M1: a deleted per-swap `var(--dock-morph-to)` reserve survives in layers.css — the seizure-prone size machinery (the white-morph root) is not fully retired");
    return { violations, facts };
}
function detectM1SelfTest() {
    const RESERVED = `.x { inline-size: var(--dock-expanded-px); }`;
    const SEIZURE = `.x { inline-size: var(--dock-morph-to); }`;
    const reserves = (s) => /inline-size:\s*var\(--dock-expanded-px\)/.test(s);
    const morphTo = (s) => /inline-size:\s*[^;]*var\(\s*--dock-morph-to\s*\)/.test(s);
    return reserves(RESERVED) === true && reserves(SEIZURE) === false && morphTo(SEIZURE) === true;
}

// ── M2 — the scale is the CLAMPED ratio-free blend (never scaleX(0)) ──
// BD.W-DOCK-CORE replaced the degenerate `--dock-morph-scale: max(<ratio-calc>, 0.06)`
// (a FLOOR with no CEILING — the seizure) with `--dock-size-scale: clamp(...)`, a
// convex-blend ratio of the two MEASURED endpoints (`--dock-live/--dock-expanded-px`),
// BOUNDED by construction (collapsed/expanded ≤ ratio ≤ 1). The clamp keeps the visible
// sliver floor; the convex blend kills the unbounded ceiling. M2 witnesses THAT scalar.
export function detectM2() {
    const violations = [];
    const facts = {};
    const layers = stripCss(readRel(LAYERS_CSS));
    // --dock-size-scale is a CLAMPED ratio of the convex --dock-live blend over the
    // measured expanded endpoint (bottoms at a visible sliver, never scale(0)).
    facts.scaleClamped =
        /--dock-size-scale:\s*clamp\([\s\S]*?var\(--dock-live\)\s*\/\s*max\(\s*var\(--dock-expanded-px/.test(layers);
    if (!facts.scaleClamped)
        violations.push("M2: --dock-size-scale is not the clamped convex-blend ratio `clamp(... var(--dock-live)/max(var(--dock-expanded-px ...)))` — a degenerate/unbounded scale could run (the zero-width or 56× seizure)");
    // The size morph rides `scale: var(--dock-size-scale)` (the compositor footprint
    // morph kept — composed in shape.css, where the size·squish·punch fold lives).
    const shape = stripCss(readRel("src/styles/dock/shape.css"));
    facts.scaleComposited = /var\(--dock-size-scale\b/.test(shape) || /var\(--dock-size-scale\b/.test(layers);
    if (!facts.scaleComposited)
        violations.push("M2: the `scale:` composite no longer reads --dock-size-scale (shape.css/layers.css) — the reserved-footprint scale morph regressed");
    // The deleted per-swap --dock-morph-scale ratio does not survive.
    facts.noMorphScale = !/--dock-morph-scale\s*:/.test(layers);
    if (!facts.noMorphScale)
        violations.push("M2: the deleted per-swap `--dock-morph-scale` ratio survives in layers.css — the seizure machinery is not fully retired");
    return { violations, facts };
}
function detectM2SelfTest() {
    const BLEND = `--dock-size-scale: clamp(var(--dock-collapsed-px) / var(--dock-expanded-px), calc(var(--dock-live) / max(var(--dock-expanded-px, 1px), 1px)), 1);`;
    const SEIZURE = `--dock-morph-scale: max(calc(var(--dock-morph-ratio) + (1 - var(--dock-morph-ratio)) * var(--dock-morph-t, 0)), 0.06);`;
    const clamped = (s) => /--dock-size-scale:\s*clamp\([\s\S]*?var\(--dock-live\)\s*\/\s*max\(\s*var\(--dock-expanded-px/.test(s);
    return clamped(BLEND) === true && clamped(SEIZURE) === false;
}

// ── M3 — the measure-failure floor (expanded endpoint never below collapsed) ──
// BD.W-DOCK-CORE deleted `morphMinFloorPx`/`measureAndArmMorph` and the per-target
// generation gating; the white-morph guard is now `useDockExpandedSize`'s freshness
// floor: `finalExpanded = Math.max(expandedSeed, collapsedPx)` (so collapsed/expanded
// is never collapsed/0 = ∞) backed by `collapsedFloorPx` (the WCAG 44px touch floor).
// A missed (0) measurement seats at the collapsed floor, NOT white. M3 follows the guard
// into its new home (the W-CARVE reader-gate discipline: assert the floor where it lives).
export function detectM3() {
    const violations = [];
    const facts = {};
    const measure = stripJs(readRel(MEASURE_TS));
    // The expanded endpoint is floored at max(seed, collapsed) — never below collapsed,
    // so the convex blend can never reserve a zero / divide by zero.
    facts.guardPresent =
        /useDockExpandedSize/.test(measure) &&
        /Math\.max\(\s*expandedSeed\s*,\s*collapsedPx\s*\)/.test(measure);
    if (!facts.guardPresent)
        violations.push("M3: dockMorphMeasure.ts's useDockExpandedSize has no `finalExpanded = Math.max(expandedSeed, collapsedPx)` freshness floor — a missed (0) measurement degrades to white, not visible-at-collapsed-floor");
    // The collapsed-floor helper exists (reads the resolved icon-square / WCAG touch
    // floor, falls back to 44px).
    facts.floorHelperPresent =
        /function collapsedFloorPx/.test(measure) &&
        /44/.test(measure);
    if (!facts.floorHelperPresent)
        violations.push("M3: dockMorphMeasure.ts has no collapsedFloorPx helper with the 44px WCAG touch fallback (the reserve-floor px)");
    return { violations, facts };
}
function detectM3SelfTest() {
    const UNGUARDED = `function useDockExpandedSize() { const finalExpanded = expandedSeed; root.style.setProperty("--dock-expanded-px", finalExpanded); }`;
    const GUARDED = `function useDockExpandedSize() { const finalExpanded = Math.max(expandedSeed, collapsedPx); root.style.setProperty("--dock-expanded-px", finalExpanded); }`;
    const guarded = (s) => /useDockExpandedSize/.test(s) && /Math\.max\(\s*expandedSeed\s*,\s*collapsedPx\s*\)/.test(s);
    return guarded(UNGUARDED) === false && guarded(GUARDED) === true;
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
    const m5 = detectM5();
    const selfTests = {
        m1: detectM1SelfTest(),
        m2: detectM2SelfTest(),
        m3: detectM3SelfTest(),
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
        ...m5.violations,
        ...selfTestViolations,
    ];
    return {
        violations,
        facts: { m1: m1.facts, m2: m2.facts, m3: m3.facts, m5: m5.facts, selfTests },
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
        note: "BC.W-LIQUID-MORPH device-free SOURCE arm (M1 the reserve floor — max(--dock-morph-to, --dock-morph-min) both axes · M2 the scale floor — max(<calc>, 0.06) · M3 the measure-failure guard — measuredTo===0 → seat-at-floor via morphMinFloorPx · M5 the ship decision is data-grounded — the DELTA names the re-measured p50 + throttle + GPU + resulting default). The M4 teardrop compositor-only arm retired with morph-bridge.css (the bridge mechanism was culled). The white-morph SAFETY NET is inert on healthy measurements. The PAINT arm (the per-frame meanLum>0 + the synthetic to:0 worst-case) is the orchestrator's W-LIQUID-MORPH-DELTA.",
        facts,
        violations,
    });
    console.log(`proof:liquid-morph — ${status.toUpperCase()}`);
    console.log(`  M1 inline-endpoint=${facts.m1.inlineReservesEndpoint} block-endpoint=${facts.m1.blockReservesEndpoint} no-morph-to=${facts.m1.noMorphToReserve}`);
    console.log(`  M2 scale-clamped=${facts.m2.scaleClamped} scale-composited=${facts.m2.scaleComposited} no-morph-scale=${facts.m2.noMorphScale}`);
    console.log(`  M3 guard=${facts.m3.guardPresent} floor-helper=${facts.m3.floorHelperPresent}`);
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
