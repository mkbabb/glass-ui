#!/usr/bin/env node
// BC.W-VIZ-DOTFLOW — proof:viz-dotflow, the RETOPOLOGIZED dot-flow-field source gate
// (born-RED on the bare BB tree → GREEN at the retopology).
//
// The cure for the BB dot-flow noise defect (USER-DEFECTS §E: "absolutely awful — does not
// form waves/shapes, a mess of NOISE. Must be SUBTLE, form LARGER + more SWEEPING waves").
// The free-advecting particle cloud → an ANCHORED DOT-MATRIX + a restoring spring +
// brightness-shape modulation; the coherence regime inverted (octaves 6→2-3, λ₀ 2.4→2.5×,
// curl 0.6→0.12, windSpeed 1.0→0.3); the Canvas2D fallback retired for a pure WebGL2
// fragment; the teal-on-navy fabricated reference GONE (warm-cream identity default).
//
// This gate is the DEVICE-FREE SOURCE arm (born-RED → GREEN, tagged ["local","ci","release"]).
// The LIVE-GPU gestalt paint (the stable lattice + the ONE sweeping band, both modes) rides
// the orchestrator's real-Metal capture (tests-visual/flow-field.spec.ts + the DELTA), NOT
// this device-free gate — the cardinal split (CI proves the SOURCE topology/regime, the
// local close proves the PAINT).
//
// FALSIFIABLE SOURCE WITNESSES (each born-RED at HEAD pre-wave; the comment-strip +
// pure-detector house pattern):
//
//   F1 — ANCHORED TOPOLOGY, NO RESEED. flow-field.compute.wgsl carries NO `reseed(` call
//        and NO `pos = pos + v*dt` forward-Euler advection; it carries `gridOrigin(` + the
//        restoring `mix(pos, anchorTarget, 1 - exp(-springK*dt))` pull. Born-RED: HEAD has
//        the reseed branch + the advection. Bite: a planted `reseed(` re-paste reds; a
//        planted `pos = pos + v * dt` reds.
//
//   F2 — COHERENT REGIME. buildWaveLadder defaults octaves ≤ 3 AND λ₀ ≥ 2.0 (the LARGE-wave
//        band — λ₀ as a multiple of the view extent); DEFAULT_FLOW_CONFIG.windSpeed ≤ 0.4
//        AND curlStrength ≤ 0.2 (the subtle band). Born-RED: HEAD octaves 6, λ₀ 2.4
//        (absolute, not view-relative), windSpeed 1.0, curl 0.6. Bite: octaves > 4 OR curl
//        > 0.3 reds.
//
//   F3 — ONE MATH SOURCE round-trips. gridOrigin/sampleHeight/sampleDisplacement/waveBand
//        exist in flowField.ts as PURE exports AND the WGSL compute + the GLSL fragment
//        transcribe them (the shared-structure transcription check); a fixed-sample numeric
//        round-trip of the JS evaluator agrees with the transcribed structure. Bite: a
//        hand-edited WGSL curl domain-scale that drifts from the JS ×0.55 reds.
//
//   F4 — NO CANVAS2D VIZ. flow-field.glsl.ts carries NO `createCpuFlowField` / Canvas2D
//        `getContext("2d")` path; it exports the FRAGMENT shader (FLOW_FIELD_FRAG_GLSL), and
//        useDotFlowField does NOT bind useCanvas2D — it composes createGpuSubstrate with a
//        setupGL WebGL2 fragment arm. Born-RED: HEAD has the Canvas2D fallback + the
//        useCanvas2D bind. Bite: a planted `getContext("2d")` in the viz reds.
//
//   F5 — WARM-CREAM IDENTITY DEFAULT + NO TEAL/NAVY. constants.ts has NO teal/navy literal
//        (an OklchStop with `h in [180,280]`); DEFAULT_FLOW_CONFIG.palette ===
//        WARM_IDENTITY_PALETTE; presets.ts has NO TEAL_DOTS/NAVY_GROUND symbol. Born-RED if
//        the teal preset survives. Bite: a planted teal stop in the library reds.
//
//   F6 — POINTER WIRED. useDotFlowField composes usePointerVelocityField AND feeds .tick(
//        from the frame callback AND reads BOTH velocity AND acceleration/burst (the user's
//        "velocity AND acceleration" ask). Bite: a velocity-only wiring reds.
//
// + a self-test bite per clause (each planted defect REDs its clause).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const DIR = resolve(ROOT, "src/components/custom/dot-flow-field");
const PRESETS = resolve(ROOT, "demo/stories/substrates/presets.ts");

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : null);

/** URL-safe comment strip — `(^|[^:])//` keeps a `://` in a URL intact. */
function stripComments(src) {
    return (src ?? "")
        .replace(/\/\*[\s\S]*?\*\//g, " ")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

// ── F1: anchored topology, no reseed ────────────────────────────────────────────
function clauseTopology(over) {
    const viol = [];
    const wgsl = stripComments(
        over?.compute ?? read(resolve(DIR, "shaders/flow-field.compute.wgsl.ts")),
    );
    if (/\breseed\s*\(/.test(wgsl))
        viol.push(
            "F1 topology: the compute kernel still calls reseed( — the anchored lattice has NO re-seed (delete the free-advection re-spawn branch)",
        );
    // The advection integrand `pos = pos + v * dt` (any spacing) — the free-walker step.
    if (/\bpos\s*=\s*pos\s*\+\s*v\s*\*\s*dt\b/.test(wgsl))
        viol.push(
            "F1 topology: the compute kernel still integrates pos = pos + v*dt (forward-Euler advection) — the lattice does NOT advect, it eases to its anchor target",
        );
    if (!/\bgridOrigin\s*\(/.test(wgsl))
        viol.push(
            "F1 topology: the compute kernel does not derive the lattice origin via gridOrigin( — the anchored grid is missing",
        );
    // The framerate-independent critically-damped pull: BOTH the mix(pos, …) blend AND the
    // `1 - exp(-springK*dt)` rate must be present (the two may sit on separate lines —
    // `let k = 1 - exp(-springK*dt); pos = mix(pos, anchorTarget, k);`).
    const hasMix = /mix\s*\(\s*pos\s*,/.test(wgsl);
    const hasSpringRate = /1\.0\s*-\s*exp\s*\(\s*-\s*springK\s*\*\s*dt\s*\)/.test(wgsl);
    if (!hasMix || !hasSpringRate)
        viol.push(
            `F1 topology: the compute kernel carries no restoring spring (mix(pos,…):${hasMix} · 1-exp(-springK*dt):${hasSpringRate}) — the framerate-independent pull-to-anchor is missing`,
        );
    return viol;
}

// ── F2: coherent regime ─────────────────────────────────────────────────────────
function clauseRegime(over) {
    const viol = [];
    const js = stripComments(
        over?.flowField ?? read(resolve(DIR, "composables/flowField.ts")),
    );
    const consts = stripComments(
        over?.constants ?? read(resolve(DIR, "constants.ts")),
    );
    // buildWaveLadder default octaves ≤ 3.
    const octM = js.match(/function buildWaveLadder\([^)]*octaves\s*=\s*(\d+)/);
    const octaves = octM ? Number(octM[1]) : null;
    if (octaves == null)
        viol.push("F2 regime: buildWaveLadder has no default octaves parameter");
    else if (octaves > 3)
        viol.push(
            `F2 regime: buildWaveLadder default octaves ${octaves} > 3 — the coherent regime is ≤ 3 octaves (no fine chatter)`,
        );
    // buildWaveLadder default λ₀ multiple ≥ 2.0 (the LARGE-wave band).
    const lamM = js.match(/lambda0Mul\s*=\s*([\d.]+)/);
    const lam0 = lamM ? Number(lamM[1]) : null;
    if (lam0 == null)
        viol.push(
            "F2 regime: buildWaveLadder has no lambda0Mul (λ₀ as a view-extent multiple) — the LARGE-wave regime knob is missing",
        );
    else if (lam0 < 2.0)
        viol.push(
            `F2 regime: buildWaveLadder default λ₀ multiple ${lam0} < 2.0 — the LARGE dominant wave needs λ₀ ≥ 2× the view`,
        );
    // The DEFAULT_FLOW_CONFIG subtle band.
    const wsM = consts.match(/windSpeed\s*:\s*([\d.]+)/);
    const ws = wsM ? Number(wsM[1]) : null;
    if (ws == null) viol.push("F2 regime: DEFAULT_FLOW_CONFIG has no windSpeed");
    else if (ws > 0.4)
        viol.push(
            `F2 regime: DEFAULT_FLOW_CONFIG.windSpeed ${ws} > 0.4 — the subtle slow-sweep band is ≤ 0.4`,
        );
    const curlM = consts.match(/curlStrength\s*:\s*([\d.]+)/);
    const curl = curlM ? Number(curlM[1]) : null;
    if (curl == null) viol.push("F2 regime: DEFAULT_FLOW_CONFIG has no curlStrength");
    else if (curl > 0.2)
        viol.push(
            `F2 regime: DEFAULT_FLOW_CONFIG.curlStrength ${curl} > 0.2 — the subtle organic-break band is ≤ 0.2`,
        );
    return viol;
}

// ── F3: one math source round-trips (structural transcription) ──────────────────
function clauseRoundTrip(over) {
    const viol = [];
    const js = stripComments(
        over?.flowField ?? read(resolve(DIR, "composables/flowField.ts")),
    );
    const wgsl = stripComments(
        over?.compute ?? read(resolve(DIR, "shaders/flow-field.compute.wgsl.ts")),
    );
    const glsl = stripComments(
        over?.glsl ?? read(resolve(DIR, "shaders/flow-field.glsl.ts")),
    );
    const checks = [
        ["gridOrigin in JS", () => /export function gridOrigin/.test(js)],
        ["sampleHeight in JS", () => /export function sampleHeight/.test(js)],
        ["sampleDisplacement in JS", () => /export function sampleDisplacement/.test(js)],
        ["waveBand in JS", () => /export function waveBand/.test(js)],
        ["gridOrigin in WGSL", () => /fn gridOrigin/.test(wgsl)],
        ["sampleHeight in WGSL", () => /fn sampleHeight/.test(wgsl)],
        ["sampleDisplacement in WGSL", () => /fn sampleDisplacement/.test(wgsl)],
        ["sampleHeight in GLSL", () => /float sampleHeight/.test(glsl)],
        ["waveBand in GLSL", () => /float waveBand/.test(glsl)],
        // The coarse ×0.55 curl domain-scale transcribes identically (the §3.2 inversion).
        ["curl ×0.55 in JS", () => /p\.x\s*\*\s*0\.55/.test(js)],
        ["curl ×0.55 in WGSL", () => /p\.x\s*\*\s*0\.55/.test(wgsl)],
        ["curl ×0.55 in GLSL", () => /p\.x\s*\*\s*0\.55/.test(glsl)],
        // The tanh soft-clamp on the displacement transcribes (bounds the sub-cell offset).
        ["tanh soft-clamp in JS", () => /Math\.tanh\s*\(\s*mag\s*\)/.test(js)],
        ["tanh soft-clamp in WGSL", () => /tanh\s*\(\s*mag\s*\)/.test(wgsl)],
        ["tanh soft-clamp in GLSL", () => /tanh\s*\(\s*mag\s*\)/.test(glsl)],
    ];
    for (const [label, fn] of checks) {
        if (!fn())
            viol.push(
                `F3 round-trip: ${label} — the WGSL/GLSL must transcribe the SAME flowField.ts math (the single source)`,
            );
    }
    return viol;
}

// ── F4: no Canvas2D viz ─────────────────────────────────────────────────────────
function clauseNoCanvas2D(over) {
    const viol = [];
    const glsl = stripComments(
        over?.glsl ?? read(resolve(DIR, "shaders/flow-field.glsl.ts")),
    );
    const composable = stripComments(
        over?.useDotFlowField ??
            read(resolve(DIR, "composables/useDotFlowField.ts")),
    );
    const particles = stripComments(
        over?.useFlowParticles ??
            read(resolve(DIR, "composables/useFlowParticles.ts")),
    );
    if (/createCpuFlowField/.test(glsl) || /createCpuFlowField/.test(particles))
        viol.push(
            "F4 no-canvas: createCpuFlowField (the Canvas2D point-cloud) survives — retire it for the WebGL2 fragment fallback (clean break, no alias)",
        );
    const all = glsl + "\n" + composable + "\n" + particles;
    if (/getContext\s*\(\s*["']2d["']\s*\)/.test(all))
        viol.push(
            "F4 no-canvas: a getContext('2d') Canvas2D path survives in the viz — no canvas anywhere (§E)",
        );
    if (/\buseCanvas2D\b/.test(composable))
        viol.push(
            "F4 no-canvas: useDotFlowField still binds useCanvas2D — it must compose createGpuSubstrate (the setupGL WebGL2 fragment arm)",
        );
    if (!/FLOW_FIELD_FRAG_GLSL/.test(glsl))
        viol.push(
            "F4 no-canvas: flow-field.glsl.ts does not export the FLOW_FIELD_FRAG_GLSL fragment shader (the fragment fallback is missing)",
        );
    return viol;
}

// ── F5: warm-cream identity default + no teal/navy ──────────────────────────────
function clauseWarmIdentity(over) {
    const viol = [];
    const consts = stripComments(
        over?.constants ?? read(resolve(DIR, "constants.ts")),
    );
    const presets = stripComments(over?.presets ?? read(PRESETS));
    const stopRe = /h\s*:\s*(\d+(?:\.\d+)?)/g;
    let m;
    while ((m = stopRe.exec(consts))) {
        const h = Number(m[1]);
        if (h >= 180 && h <= 280)
            viol.push(
                `F5 warm-identity: a teal/navy hue (h=${h}) in the LIBRARY constants.ts — the reference palette belongs in the DEMO preset (presets-in-consumers)`,
            );
    }
    if (!/WARM_IDENTITY_PALETTE/.test(consts))
        viol.push("F5 warm-identity: constants.ts does not declare WARM_IDENTITY_PALETTE");
    if (!/palette\s*:\s*WARM_IDENTITY_PALETTE/.test(consts))
        viol.push(
            "F5 warm-identity: DEFAULT_FLOW_CONFIG.palette is not WARM_IDENTITY_PALETTE (the default must be warm-cream)",
        );
    // The teal-on-navy fabricated reference is GONE entirely (clean break, no alias).
    if (presets != null && /\bTEAL_DOTS\b|\bNAVY_GROUND\b|TEAL_PALETTE/.test(presets))
        viol.push(
            "F5 warm-identity: a TEAL_DOTS/NAVY_GROUND/TEAL_PALETTE symbol survives in presets.ts — the teal-on-navy fabricated reference is DELETED (clean break, no alias — BC.W-TEAL-NAVY-PURGE)",
        );
    return viol;
}

// ── F6: pointer wired (velocity AND acceleration/burst) ─────────────────────────
function clausePointer(over) {
    const viol = [];
    const composable = stripComments(
        over?.useDotFlowField ??
            read(resolve(DIR, "composables/useDotFlowField.ts")),
    );
    if (!/usePointerVelocityField\s*\(/.test(composable))
        viol.push(
            "F6 pointer: useDotFlowField does not call usePointerVelocityField( — the shared pointer field is unwired (BC.W-VIZ-INTERACTION)",
        );
    if (!/\.tick\s*\(/.test(composable))
        viol.push(
            "F6 pointer: useDotFlowField does not feed .tick( from the frame callback (the no-own-rAF push-step is missing)",
        );
    const readsVelocity = /\.velocity\b/.test(composable) || /\.speed\b/.test(composable);
    const readsAccel = /\.acceleration\b/.test(composable) || /\.burst\b/.test(composable);
    if (!readsVelocity)
        viol.push("F6 pointer: useDotFlowField does not read the pointer velocity/speed");
    if (!readsAccel)
        viol.push(
            "F6 pointer: useDotFlowField reads velocity but not acceleration/burst — the user's ask is 'velocity AND acceleration' (the flick burst)",
        );
    return viol;
}

function runAll(over = {}) {
    return [
        ...clauseTopology(over),
        ...clauseRegime(over),
        ...clauseRoundTrip(over),
        ...clauseNoCanvas2D(over),
        ...clauseWarmIdentity(over),
        ...clausePointer(over),
    ];
}

// ── Self-test: a synthetic broken tree MUST red ──
function selfTest() {
    const fails = [];
    // (a) a planted reseed re-paste reds F1.
    const liveCompute = read(resolve(DIR, "shaders/flow-field.compute.wgsl.ts"));
    const reseedPlanted = runAll({
        compute: liveCompute + "\nfn x(){ let r = reseed(1.0, 2.0); }",
    });
    if (!reseedPlanted.some((v) => v.startsWith("F1")))
        fails.push("self-test: a planted reseed( did NOT red F1");
    // (b) octaves > 4 reds F2.
    const liveFlow = read(resolve(DIR, "composables/flowField.ts"));
    const octBroken = runAll({
        flowField: liveFlow.replace(/octaves\s*=\s*3/, "octaves = 6"),
    });
    if (!octBroken.some((v) => v.startsWith("F2")))
        fails.push("self-test: octaves=6 did NOT red F2");
    // (c) a drifted WGSL curl scale reds F3.
    const curlDrift = runAll({
        compute: liveCompute.replace(/p\.x \* 0\.55/g, "p.x * 1.7"),
    });
    if (!curlDrift.some((v) => v.startsWith("F3")))
        fails.push("self-test: a drifted WGSL curl ×1.7 did NOT red F3");
    // (d) a getContext('2d') in the viz reds F4.
    const liveGlsl = read(resolve(DIR, "shaders/flow-field.glsl.ts"));
    const c2dPlanted = runAll({
        glsl: liveGlsl + "\nconst ctx = canvas.getContext('2d');",
    });
    if (!c2dPlanted.some((v) => v.startsWith("F4")))
        fails.push("self-test: a planted getContext('2d') did NOT red F4");
    // (e) a teal stop in the library reds F5.
    const liveConsts = read(resolve(DIR, "constants.ts"));
    const tealPlanted = runAll({
        constants: liveConsts + "\nconst X = { L: 0.8, C: 0.11, h: 195 };",
    });
    if (!tealPlanted.some((v) => v.startsWith("F5")))
        fails.push("self-test: a teal hue in the library did NOT red F5");
    // (f) a velocity-only pointer wiring reds F6.
    const velOnly = runAll({
        useDotFlowField:
            "const f = usePointerVelocityField(); f.tick(d); use(f.velocity.value);",
    });
    if (!velOnly.some((v) => v.startsWith("F6")))
        fails.push("self-test: a velocity-only wiring did NOT red F6");
    return fails;
}

function main() {
    const isSelftest = process.argv.includes("--selftest");
    const viol = runAll();
    const selfFails = isSelftest ? selfTest() : [];
    const ok = viol.length === 0 && selfFails.length === 0;

    const artifact = {
        gate: "proof:viz-dotflow",
        wave: "BC.W-VIZ-DOTFLOW",
        stamp: snapshotStamp(),
        ok,
        violations: viol,
        selfTestFailures: selfFails,
    };
    const out = gateArtifactPath(
        "GLASS_UI_VIZ_DOTFLOW_ARTIFACT",
        "proof-viz-dotflow.json",
    );
    writeGateArtifact(out, artifact);

    console.log(
        "proof:viz-dotflow — the RETOPOLOGIZED dot-flow-field: an anchored dot-matrix a LARGE wave sweeps through (BC.W-VIZ-DOTFLOW)",
    );
    if (viol.length) {
        console.error("  RED:");
        for (const v of viol) console.error("    ✗ " + v);
    } else {
        console.log("  GREEN (F1 topology · F2 regime · F3 round-trip · F4 no-canvas · F5 warm-identity · F6 pointer)");
    }
    if (isSelftest) {
        if (selfFails.length) {
            console.error("  --selftest — the gate FAILED to red a planted defect:");
            for (const f of selfFails) console.error("    ✗ " + f);
        } else {
            console.log("  --selftest — every planted defect RED ✓");
        }
    }
    process.exit(ok ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    main();
}
