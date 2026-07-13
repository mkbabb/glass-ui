#!/usr/bin/env node
// proof:dock-single-engine — BI.W-DOCK-SPRING-UNIFY — the ~10-site SpringProgress
// reconcile + the deformation scalar-zoo excision + the arrival-cut removal.
//
// THE MECHANISM the dock's morph clock must speak (PASS-1 §2.2 — one engine, one
// scalar). This gate binds the MECHANISM, NEVER a spring VALUE (the SU3 closure-read
// correction / BLUR-MUTE veto-foreclosure): the dock (response, ζ) is USER-SETTABLE per
// PLAN §0.2a, so there is NO value-range predicate here — only the single-engine floor,
// the arrival-cut-absent floor, the deformation-zoo-absent floor, and the preset↔emitted-
// token AGREEMENT (the M1 parity invariant, not the numbers).
//
//   SU1 one-spring-engine  — exactly ONE `new SpringProgress` in the dock module
//                            (`useDockSpring`, the sole factory). The extra dock sites
//                            (useLayerTransition / useDockOrientationMorph / useDockItemDrag
//                            / the fission spring) are DEFINITION-ABSENT (they die with
//                            their sibling retires — CROSSFADE / RETIRES / FOLD). Born-RED
//                            at the pre-sibling HEAD (5 sites); this wave asserts the floor.
//   SU2 scalar-zoo-absent  — the DEFORMATION zoo is DEFINITION-ABSENT (born-RED-named at
//                            HEAD: `@property --dock-punch-stretch` + the 7-factor `scale:`
//                            product live): no `@property --dock-punch-stretch`, no `scale:`
//                            reading `--stretch`/`--dock-punch-stretch` (the 7-factor product
//                            + the per-child counter-scale), no dock `--stretch` read, no
//                            `[data-punching]` arm. The visible box morph rides ONE size
//                            factor (`--dock-size-scale`), the liquid weight lives in the
//                            DOCK spring's own overshoot tail (DOCK-LADDER §8), not a second
//                            parallel punch clock.
//   SU3 MECHANISM-ONLY     — (a) the `dockMorphContext` arrival-settle CUT is ABSENT (the
//                            settle is honest spring physics via `onSettle`, whatever the
//                            preset — the ζ0.64 ~1s ring is no longer HIDDEN by a `tValue >= 1`
//                            early drop); (b) the `dock` preset row AGREES with the emitted
//                            `--spring-dock*` tokens (M1 parity — the row exists, the tokens
//                            emit, the M1 source-fix `maxDuration = settle` is in effect). NO
//                            value predicate.
//   SU4 M1-clock           — the dock's morph clock reads the M1-corrected `--spring-*`
//                            emission (the per-spring `--spring-dock-duration` settle clock),
//                            NOT a hardcoded / generic-duration ~5×-compressed curve, and the
//                            M1 SOURCE fix (`regen-spring-tokens.mjs` passing
//                            `maxDuration = springSettleDurationSeconds`) is in effect.
//
// Device-free SOURCE detector over the dock module + the dock CSS + springPresets.ts +
// the emitted scheme-spring.css + regen-spring-tokens.mjs. Tags ["local","ci","release"].
// The BINDING morph PAINT (the G8 A/B settle-trace, the interrupted retarget, CDP
// Layout-flat) is the orchestrator's π — rides W-DOCK-DEVICE (visible Metal) + the
// proof:ba-gestalt dock verdict; this gate proves the SOURCE mechanism born-RED→GREEN.
//
// Self-test bites (each planted defect MUST flag): a synthetic SECOND `new SpringProgress`
// REDs SU1; a synthetic re-added `@property --dock-punch-stretch` / `var(--stretch)` scale
// REDs SU2; a synthetic re-added arrival-cut `tValue >= 1 … settleAll()` REDs SU3; a
// synthetic missing dock preset row REDs SU3(b); a synthetic reverted M1 source-fix REDs SU4.
//
// Run: node scripts/proof-dock-single-engine.mjs

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:dock-single-engine";

const PATHS = {
    ROOT,
    DOCK_DIR: "src/components/custom/dock",
    SPRING_FACTORY: "src/components/custom/dock/composables/useDockSpring.ts",
    MORPH_CONTEXT: "src/components/custom/dock/composables/dockMorphContext.ts",
    SHAPE_CSS: "src/styles/dock/shape.css",
    DOCK_CSS_DIR: "src/styles/dock",
    SPRING_PRESETS: "src/composables/motion/springPresets.ts",
    SCHEME_SPRING: "src/styles/tokens/scheme-spring.css",
    REGEN: "scripts/regen-spring-tokens.mjs",
    ARTIFACT: gateArtifactPath("GLASS_UI_DOCK_SINGLE_ENGINE_ARTIFACT", "dock-single-engine"),
};

// ── text helpers ────────────────────────────────────────────────────────────────
// Strip JS/TS block + line comments (blank them, preserving newlines so a marker in a
// comment never satisfies a code-shape clause).
const stripJs = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/(^|[^:])\/\/[^\n]*/g, (m, p) => p + m.slice(p.length).replace(/[^\n]/g, " "));
const stripCss = (s) => s.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
// Strip HTML/Vue-template comments too (for .vue files scanned as text).
const stripVue = (s) =>
    stripJs(s).replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "));

const readRel = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

function walk(rel, exts) {
    const base = resolve(ROOT, rel);
    const out = [];
    if (!existsSync(base)) return out;
    const rec = (dir) => {
        for (const name of readdirSync(dir)) {
            const p = resolve(dir, name);
            const st = statSync(p);
            if (st.isDirectory()) rec(p);
            else if (exts.some((e) => name.endsWith(e)))
                out.push({ path: relative(ROOT, p), text: readFileSync(p, "utf8") });
        }
    };
    rec(base);
    return out;
}

// ── SU1 — one-spring-engine ──────────────────────────────────────────────────────
// EXACTLY one `new SpringProgress(` across the dock module, in the sole factory.
function checkSU1({ files }) {
    const violations = [];
    const NEW_SPRING = /\bnew\s+SpringProgress\s*\(/g;
    const sites = [];
    for (const f of files) {
        const code = f.path.endsWith(".vue") ? stripVue(f.text) : stripJs(f.text);
        const n = (code.match(NEW_SPRING) || []).length;
        for (let i = 0; i < n; i++) sites.push(f.path);
    }
    const factory = PATHS.SPRING_FACTORY;
    if (sites.length !== 1) {
        violations.push(
            `SU1 one-spring-engine — expected EXACTLY 1 'new SpringProgress' in the dock module, found ${sites.length} (${[...new Set(sites)].join(", ") || "none"}). The extra sites (useLayerTransition / useDockOrientationMorph / useDockItemDrag / fission) must be DEFINITION-ABSENT.`,
        );
    } else if (sites[0] !== factory) {
        violations.push(
            `SU1 one-spring-engine — the sole 'new SpringProgress' must live in the useDockSpring factory (${factory}), found in ${sites[0]}.`,
        );
    }
    return {
        violations,
        facts: { su1SpringSites: [...new Set(sites)], su1Count: sites.length },
    };
}

// ── SU2 — deformation scalar-zoo-absent ────────────────────────────────────────────
function checkSU2({ dockCssText, morphContextCode }) {
    const violations = [];
    // (a) no `@property --dock-punch-stretch`
    const punchProp = /@property\s+--dock-punch-stretch\b/.test(dockCssText);
    if (punchProp)
        violations.push(
            "SU2 scalar-zoo — '@property --dock-punch-stretch' is REGISTERED (the cartoon-punch channel must be DEFINITION-ABSENT).",
        );
    // (b) no `scale:` declaration reading --stretch or --dock-punch-stretch (the 7-factor
    //     product + the per-child counter-scale).
    const scaleDecls = dockCssText.match(/\bscale\s*:[^;}]*[;}]/g) || [];
    const zooScales = scaleDecls.filter(
        (d) => /var\(--stretch\b/.test(d) || /var\(--dock-punch-stretch\b/.test(d),
    );
    if (zooScales.length)
        violations.push(
            `SU2 scalar-zoo — ${zooScales.length} 'scale:' declaration(s) still fold the deformation zoo (--stretch / --dock-punch-stretch). The box morph must ride ONE size factor (--dock-size-scale), no reciprocal squish/punch.`,
        );
    // (c) no dock `--stretch` read anywhere in the dock CSS (the orientation/fission squish
    //     died with its V↔H-goo owner).
    const stretchReads = (dockCssText.match(/var\(--stretch\b/g) || []).length;
    if (stretchReads)
        violations.push(
            `SU2 scalar-zoo — ${stretchReads} dock 'var(--stretch)' read(s) survive (the squish channel must be DEFINITION-ABSENT in the dock).`,
        );
    // (d) no `[data-punching]` arm — CSS OR the morph orchestrator (the punch driver + its
    //     JS arming are gone).
    const punchAttrCss = (dockCssText.match(/data-punching/g) || []).length;
    const punchAttrJs = (morphContextCode.match(/data-punching/g) || []).length;
    if (punchAttrCss || punchAttrJs)
        violations.push(
            `SU2 scalar-zoo — '[data-punching]' still armed (css=${punchAttrCss}, orchestrator=${punchAttrJs}). The cartoon-punch driver + its JS arming must be DEFINITION-ABSENT.`,
        );
    return {
        violations,
        facts: {
            su2PunchProp: punchProp,
            su2ZooScales: zooScales.length,
            su2StretchReads: stretchReads,
            su2PunchAttr: punchAttrCss + punchAttrJs,
        },
    };
}

// ── SU3 — MECHANISM-ONLY (arrival-cut absent + preset↔token agree) ──────────────────
function checkSU3({ morphContextCode, presetsText, schemeSpringText, regenText }) {
    const violations = [];

    // (a) the arrival-settle CUT is ABSENT. Its signature is a `tValue >= 1` (numeric
    //     early-arrival) guard that drops the morph state before the spring's own 2%-band
    //     settle. NOTHING else in the orchestrator legitimately compares a scalar `>= 1`
    //     (the size blend uses `clamp(0, …, 1)`), so any `\w+ >= 1` is the arrival-cut.
    const arrivalGuard = /\b[\w.]+\s*>=\s*1\b/.test(morphContextCode);
    // A settle timer (setTimeout / setInterval that seats the morph on a wrong clock) is
    // the same dishonesty in another shape.
    const settleTimer = /\bset(Timeout|Interval)\s*\(/.test(morphContextCode);
    if (arrivalGuard)
        violations.push(
            "SU3 arrival-cut — a `>= 1` early-arrival guard survives in dockMorphContext (the settle must be honest spring physics via onSettle, not a scalar-arrival CUT that hides the ring-down).",
        );
    if (settleTimer)
        violations.push(
            "SU3 arrival-cut — a setTimeout/setInterval settle timer survives in dockMorphContext (the wrong-clock arrival hack; the settle is the spring's OWN 2%-band ring-down).",
        );

    // (b) preset↔token AGREEMENT (M1 parity — NOT the numbers). The `dock` row exists with
    //     a (response, ζ) pair; the emitted --spring-dock* tokens exist; the M1 SOURCE fix
    //     (maxDuration = settle) is in effect. NO value-range predicate (user-settable).
    const dockRow = /\bname:\s*["']dock["'][\s\S]*?response:\s*([0-9.]+)[\s\S]*?dampingFraction:\s*([0-9.]+)/.exec(
        presetsText,
    );
    if (!dockRow)
        violations.push(
            "SU3 preset↔token — the 'dock' preset row (response + dampingFraction) is missing from springPresets.ts (the single-source (response, ζ) authority).",
        );
    const hasCurve = /--spring-dock\s*:/.test(schemeSpringText);
    const hasSettle = /--spring-dock-settle\s*:/.test(schemeSpringText);
    const hasDuration = /--spring-dock-duration\s*:/.test(schemeSpringText);
    if (!(hasCurve && hasSettle && hasDuration))
        violations.push(
            `SU3 preset↔token — the emitted --spring-dock* token set is incomplete (curve=${hasCurve} settle=${hasSettle} duration=${hasDuration}); the dock preset row must GENERATE all three via regen.`,
        );
    // The M1 source-fix: regen passes maxDuration = the numeric settle (kills the ~5× break)
    const m1Fix = /maxDuration:\s*springSettleDurationSeconds\s*\(/.test(regenText);
    if (!m1Fix)
        violations.push(
            "SU3 preset↔token — the M1 source-fix is reverted: regen-spring-tokens.mjs no longer passes `maxDuration: springSettleDurationSeconds(...)` (the CSS-vs-JS ~5× time-base break returns; the preset↔token agreement breaks).",
        );

    return {
        violations,
        facts: {
            su3ArrivalGuard: arrivalGuard,
            su3SettleTimer: settleTimer,
            su3DockRow: dockRow ? `${dockRow[1]}/${dockRow[2]}` : "MISSING",
            su3Tokens: { curve: hasCurve, settle: hasSettle, duration: hasDuration },
            su3M1Fix: m1Fix,
        },
    };
}

// ── SU4 — M1-clock (the dock morph reads the corrected emission) ────────────────────
function checkSU4({ dockCssText, regenText }) {
    const violations = [];
    // The dock morph clock reads the per-spring settle clock `--spring-dock-duration`
    // (the M1 emission), never a generic `--duration-*` paired with the spring curve.
    const readsPerSpringClock = /var\(--spring-dock-duration\b/.test(dockCssText);
    if (!readsPerSpringClock)
        violations.push(
            "SU4 M1-clock — the dock morph clock does not read `var(--spring-dock-duration)` (the per-spring settle clock); it must ride the M1-corrected emission, not a generic --duration-* on the spring curve.",
        );
    // No hardcoded morph curve (a `linear(0,` / `cubic-bezier(` literal on a dock morph
    // leg would bypass the regenerated --spring-* token → the pre-M1 compressed curve).
    const hardcoded = (dockCssText.match(/\b(?:linear\(\s*0\s*,|cubic-bezier\()/g) || []).length;
    if (hardcoded)
        violations.push(
            `SU4 M1-clock — ${hardcoded} hardcoded morph curve literal(s) (linear(0,…)/cubic-bezier(…)) in the dock CSS bypass the regenerated --spring-* token (the pre-M1 ~5×-compressed curve). The morph legs must read the token.`,
        );
    // The M1 source-fix in effect (shared witness — a reverted regen re-breaks SU4).
    const m1Fix = /maxDuration:\s*springSettleDurationSeconds\s*\(/.test(regenText);
    if (!m1Fix)
        violations.push(
            "SU4 M1-clock — the M1 source-fix is reverted (regen no longer passes maxDuration=settle); the dock's --spring-* legs would carry the pre-fix ~5× compressed curve.",
        );
    return {
        violations,
        facts: {
            su4PerSpringClock: readsPerSpringClock,
            su4HardcodedCurves: hardcoded,
            su4M1Fix: m1Fix,
        },
    };
}

// ── self-test (each planted defect MUST flag) ───────────────────────────────────────
function selfTest() {
    const errors = [];

    // SU1 bite — a synthetic SECOND `new SpringProgress` MUST flag.
    const s1 = checkSU1({
        files: [
            { path: PATHS.SPRING_FACTORY, text: "const a = new SpringProgress({});" },
            { path: "src/components/custom/dock/composables/useLayerTransition.ts", text: "const b = new SpringProgress({});" },
        ],
    });
    if (!s1.violations.some((v) => v.startsWith("SU1")))
        errors.push("SU1 self-test BROKE — a synthetic SECOND 'new SpringProgress' was NOT flagged");

    // SU2 bite — a re-added `@property --dock-punch-stretch` + a `--stretch` scale MUST flag.
    const s2 = checkSU2({
        dockCssText:
            "@property --dock-punch-stretch { syntax: '<number>'; }\n.glass-dock[data-punching] { scale: calc(var(--dock-size-scale,1) * var(--stretch,1)) 1; }",
        morphContextCode: "r.setAttribute('data-punching', '');",
    });
    if (!s2.violations.some((v) => v.startsWith("SU2")))
        errors.push("SU2 self-test BROKE — a synthetic re-added punch/stretch deformation zoo was NOT flagged");

    // SU3 bite (a) — a re-added arrival-cut `tValue >= 1 … settleAll()` MUST flag.
    const s3a = checkSU3({
        morphContextCode: "if (tValue >= 1 && rr.hasAttribute('data-morphing')) { settleAll(); }",
        presetsText: 'name: "dock", response: 0.3, dampingFraction: 0.82,',
        schemeSpringText: "--spring-dock: linear(0);\n--spring-dock-settle: 0.4s;\n--spring-dock-duration: calc(var(--spring-dock-settle));",
        regenText: "maxDuration: springSettleDurationSeconds(preset),",
    });
    if (!s3a.violations.some((v) => /arrival-cut/.test(v)))
        errors.push("SU3 self-test BROKE — a synthetic re-added arrival-cut ('tValue >= 1 … settleAll') was NOT flagged");

    // SU3 bite (b) — a MISSING dock preset row MUST flag.
    const s3b = checkSU3({
        morphContextCode: "options.onSettle?.();",
        presetsText: 'name: "snappy", response: 0.48, dampingFraction: 0.74,',
        schemeSpringText: "--spring-dock: linear(0);\n--spring-dock-settle: 0.4s;\n--spring-dock-duration: 0.4s;",
        regenText: "maxDuration: springSettleDurationSeconds(preset),",
    });
    if (!s3b.violations.some((v) => /preset↔token/.test(v)))
        errors.push("SU3 self-test BROKE — a synthetic MISSING dock preset row was NOT flagged");

    // SU4 bite — a reverted M1 source-fix MUST flag.
    const s4 = checkSU4({
        dockCssText: "--dock-motion-resize: var(--spring-dock-duration) var(--dock-resize-spring);",
        regenText: "const stops = springLinearStops({ response, dampingFraction });",
    });
    if (!s4.violations.some((v) => v.startsWith("SU4")))
        errors.push("SU4 self-test BROKE — a synthetic reverted M1 source-fix was NOT flagged");

    return { ok: errors.length === 0, errors };
}

// ── run ─────────────────────────────────────────────────────────────────────────────
function run() {
    const files = walk(PATHS.DOCK_DIR, [".ts", ".vue"]);
    const morphContextCode = stripJs(readRel(PATHS.MORPH_CONTEXT));
    const dockCssText = stripCss(
        walk(PATHS.DOCK_CSS_DIR, [".css"]).map((f) => f.text).join("\n"),
    );
    const presetsText = readRel(PATHS.SPRING_PRESETS);
    const schemeSpringText = readRel(PATHS.SCHEME_SPRING);
    const regenText = readRel(PATHS.REGEN);

    const su1 = checkSU1({ files });
    const su2 = checkSU2({ dockCssText, morphContextCode });
    const su3 = checkSU3({ morphContextCode, presetsText, schemeSpringText, regenText });
    const su4 = checkSU4({ dockCssText, regenText });
    const self = selfTest();

    const violations = [
        ...su1.violations,
        ...su2.violations,
        ...su3.violations,
        ...su4.violations,
        ...self.errors,
    ];
    const facts = {
        ...su1.facts,
        ...su2.facts,
        ...su3.facts,
        ...su4.facts,
        selfTest: self.ok,
    };
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(PATHS.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: COMMAND,
        note:
            "BI.W-DOCK-SPRING-UNIFY — the single-engine dock morph mechanism (MECHANISM-ONLY, no value predicate — the dock (response, ζ) is user-settable per PLAN §0.2a). SU1 one-spring-engine · SU2 deformation-scalar-zoo-absent · SU3 arrival-cut-absent + preset↔token M1-parity · SU4 M1-clock. The G8 A/B settle-trace + interrupted-retarget PAINT rides W-DOCK-DEVICE + proof:ba-gestalt.",
        facts,
        violations,
    });

    const ok = (b) => (b ? "OK" : "RED");
    console.log(
        "proof:dock-single-engine — the single-engine dock morph mechanism (BI.W-DOCK-SPRING-UNIFY; MECHANISM-ONLY)",
    );
    console.log(
        `  SU1 one-spring-engine    : sites=${facts.su1Count} (${(facts.su1SpringSites || []).join(", ") || "none"}) ${ok(su1.violations.length === 0)}`,
    );
    console.log(
        `  SU2 scalar-zoo-absent    : punchProp=${facts.su2PunchProp} zooScales=${facts.su2ZooScales} stretchReads=${facts.su2StretchReads} punchAttr=${facts.su2PunchAttr} ${ok(su2.violations.length === 0)}`,
    );
    console.log(
        `  SU3 mechanism-only       : arrivalGuard=${facts.su3ArrivalGuard} settleTimer=${facts.su3SettleTimer} dockRow=${facts.su3DockRow} m1Fix=${facts.su3M1Fix} ${ok(su3.violations.length === 0)}`,
    );
    console.log(
        `  SU4 M1-clock             : perSpringClock=${facts.su4PerSpringClock} hardcodedCurves=${facts.su4HardcodedCurves} m1Fix=${facts.su4M1Fix} ${ok(su4.violations.length === 0)}`,
    );
    console.log(`  self-test (bite proof)   : ${ok(self.ok)}`);
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

export { checkSU1, checkSU2, checkSU3, checkSU4, selfTest };
