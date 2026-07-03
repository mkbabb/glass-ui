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
// BG.W-DOTFLOW-REBUILD — the ADVECTION FLOW register lock + the faint-at-rest fix (the F7
// arm, born-RED on the pre-rebuild tree → GREEN at the rebuild):
//
//   F7a — THE ADVECTION FLOW REGISTER (compute STAYS WebGPU, the sole earner + the WebGL2
//        GPGPU state-texture + two-FBO trail). `cs_flow` exists in the compute WGSL; the GLSL
//        exports `FLOW_FIELD_STATE_GLSL` (the state-texture advect) + `FLOW_FIELD_TRAIL_FRAG_GLSL`
//        (the trail); `flowSetupGLFlow.ts` carries the two-FBO trail ping-pong + the state
//        ping-pong. (Structural lock — a future prune of the flow register reds.)
//   F7b — THE WARM-FIRE VELOCITY RAMP. presets.ts declares `WARM_FIRE_RAMP` + the
//        `mode:"flow"` `FLOW_PRESET_AURORA_CURRENT` lead; the ramp carries NO teal/navy stop
//        (h ∈ [180,280]) — the warm-fire fence, scoped to the ramp block (the concentric-theme
//        teal in the SAME file is NOT this ramp).
//   F7c — STRONGER REST CONTRAST (the born-RED arm). The present tone-map knee is a NAMED
//        `FLOW_PRESENT_KNEE` ≤ 0.7 (stronger than the prior hardcoded 0.85 magic that read
//        faint at rest), SPLICED into BOTH present passes — no bare `+ vec3(0.85)` /
//        `+ vec3<f32>(0.85)` magic literal survives, and both present passes reference the
//        named knee (the DRY single source, the tone-map parity). Born-RED: HEAD has the
//        hardcoded 0.85 ×2 + no named knee. Bite: a bare 0.85 knee (no named splice) reds.
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

// Extract a WGSL function's brace-balanced body by name (e.g. `fn cs_field(...) { … }`).
// Returns "" when the function is absent. Comment-stripped input expected.
function extractFnBody(src, fnName) {
    const sig = new RegExp(`fn\\s+${fnName}\\s*\\(`);
    const m = sig.exec(src);
    if (!m) return "";
    // find the opening brace after the signature.
    let i = src.indexOf("{", m.index);
    if (i < 0) return "";
    let depth = 0;
    const start = i;
    for (; i < src.length; i++) {
        const c = src[i];
        if (c === "{") depth++;
        else if (c === "}") {
            depth--;
            if (depth === 0) return src.slice(start, i + 1);
        }
    }
    return src.slice(start);
}

// ── F1: anchored topology, no reseed ────────────────────────────────────────────
function clauseTopology(over) {
    const viol = [];
    const wgsl = stripComments(
        over?.compute ?? read(resolve(DIR, "shaders/flow-field.compute.wgsl.ts")),
    );
    // The compute kernel is now DUAL-MODE: `cs_field` is the ANCHORED-LATTICE register (the F1
    // subject — no advection, no reseed) and `cs_flow` is the AURORA-CURRENT register (the legit
    // forward-Euler advection of the RE-INVENT flow mode). F1's reseed/advection witnesses are
    // SCOPED to the cs_field brace-span (a whole-file grep false-trips the legit cs_flow
    // integrator `pos = pos + v * dt * 60.0`). When cs_field is absent the gate falls back to the
    // whole file (born-RED pre-split state).
    const fieldBody = extractFnBody(wgsl, "cs_field") || wgsl;
    if (/\breseed\s*\(/.test(fieldBody))
        viol.push(
            "F1 topology: cs_field still calls reseed( — the anchored lattice has NO re-seed (delete the free-advection re-spawn branch)",
        );
    // The advection integrand `pos = pos + v * dt` (any spacing) — the free-walker step. Scoped to
    // cs_field; the cs_flow current legitimately advects (its own RE-INVENT register).
    if (/\bpos\s*=\s*pos\s*\+\s*v\s*\*\s*dt\b/.test(fieldBody))
        viol.push(
            "F1 topology: cs_field still integrates pos = pos + v*dt (forward-Euler advection) — the anchored lattice does NOT advect, it eases to its anchor target",
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

// ── F7: the advection FLOW register + the faint-at-rest / stronger-rest-contrast fix ──────
// BG.W-DOTFLOW-REBUILD. The BD.W-DOTFLOW-AURORA-CURRENT source landed the advected FLOW
// register; this wave LANDS it (the paint carrier) + fixes the faint-at-rest read by naming
// the present tone-map knee (the rest-contrast lever) as ONE stronger source both backends
// splice. F7a/F7b are structural locks (the flow register + the warm-fire ramp cannot
// silently regress); F7c is the born-RED arm (HEAD carries the hardcoded 0.85 magic knee ×2).
function clauseFlowRegister(over) {
    const viol = [];
    const compute = stripComments(
        over?.compute ?? read(resolve(DIR, "shaders/flow-field.compute.wgsl.ts")),
    );
    const glsl = stripComments(
        over?.glsl ?? read(resolve(DIR, "shaders/flow-field.glsl.ts")),
    );
    const renderWgsl = stripComments(
        over?.renderWgsl ?? read(resolve(DIR, "shaders/flow-field.render.wgsl.ts")),
    );
    const glFlow = stripComments(
        over?.glFlow ?? read(resolve(DIR, "composables/flowSetupGLFlow.ts")),
    );
    const bridge = stripComments(
        over?.bridge ?? read(resolve(DIR, "composables/uniformBridgeWGPU.ts")),
    );
    const presets = stripComments(over?.presets ?? read(PRESETS));

    // ── F7a — the advection FLOW register (WebGPU compute sole-earner + WebGL2 GPGPU) ──
    if (!/fn cs_flow\s*\(/.test(compute))
        viol.push(
            "F7a flow-register: the compute kernel has no `fn cs_flow` — the advection register (the WebGPU sole-earner) is missing",
        );
    if (!/FLOW_FIELD_STATE_GLSL/.test(glsl))
        viol.push(
            "F7a flow-register: flow-field.glsl.ts does not export FLOW_FIELD_STATE_GLSL — the WebGL2 GPGPU state-texture advect pass is missing",
        );
    if (!/FLOW_FIELD_TRAIL_FRAG_GLSL/.test(glsl))
        viol.push(
            "F7a flow-register: flow-field.glsl.ts does not export FLOW_FIELD_TRAIL_FRAG_GLSL — the two-FBO feedback-fade trail pass is missing",
        );
    // The WebGL2 flow channel ping-pongs TWO trail FBOs + TWO state textures (the GPGPU
    // state-texture + two-FBO trail the wave carries).
    if (!/trailFbo\s*:\s*\[/.test(glFlow) || !/trailTex\s*:\s*\[/.test(glFlow))
        viol.push(
            "F7a flow-register: flowSetupGLFlow.ts carries no two-FBO trail ping-pong (trailFbo/trailTex pair) — the GPGPU feedback-fade trail is missing",
        );
    if (!/stateTex\s*:\s*\[/.test(glFlow))
        viol.push(
            "F7a flow-register: flowSetupGLFlow.ts carries no state-texture ping-pong (stateTex pair) — the GPGPU advect state is missing",
        );

    // ── F7b — the warm-fire velocity ramp is the demo flow preset (no teal/navy) ──
    if (presets != null) {
        if (!/WARM_FIRE_RAMP/.test(presets))
            viol.push(
                "F7b warm-fire: presets.ts declares no WARM_FIRE_RAMP — the flow register's velocity ramp is missing",
            );
        if (!/FLOW_PRESET_AURORA_CURRENT/.test(presets))
            viol.push(
                'F7b warm-fire: presets.ts declares no FLOW_PRESET_AURORA_CURRENT (the mode:"flow" lead)',
            );
        // Scope the teal/navy scan to the WARM_FIRE_RAMP array block ONLY (the concentric
        // theme's legitimate teal in the SAME file is a DIFFERENT viz — not this ramp).
        const rampBlock = presets.match(
            /WARM_FIRE_RAMP\s*:[^=]*=\s*\[([\s\S]*?)\]/,
        );
        if (rampBlock) {
            const hueRe = /h\s*:\s*(\d+(?:\.\d+)?)/g;
            let m;
            while ((m = hueRe.exec(rampBlock[1]))) {
                const h = Number(m[1]);
                if (h >= 180 && h <= 280)
                    viol.push(
                        `F7b warm-fire: WARM_FIRE_RAMP carries a teal/navy stop (h=${h}) — the velocity ramp is warm-fire (hue ∈ ~[10,100]), NO cyan/teal`,
                    );
            }
        }
    }

    // ── F7c — STRONGER REST CONTRAST (the born-RED arm; the faint-at-rest fix) ──
    const kneeM = bridge?.match(/export const FLOW_PRESENT_KNEE\s*=\s*([\d.]+)/);
    const knee = kneeM ? Number(kneeM[1]) : null;
    if (knee == null)
        viol.push(
            "F7c rest-contrast: uniformBridgeWGPU.ts exports no named FLOW_PRESENT_KNEE — the present tone-map knee (the rest-contrast lever) is an unnamed magic literal",
        );
    else if (knee > 0.7)
        viol.push(
            `F7c rest-contrast: FLOW_PRESENT_KNEE ${knee} > 0.7 — the faint-at-rest fix needs a STRONGER (lower) Reinhard knee so the warm-fire ribbons pop off the deep floor at rest`,
        );
    // Neither present pass may carry the bare hardcoded 0.85 Reinhard knee (the faint-at-rest
    // magic) — it must splice the named FLOW_PRESENT_KNEE.
    if (/trail\s*\+\s*vec3\s*\(\s*0\.85/.test(glsl))
        viol.push(
            "F7c rest-contrast: the GLSL present pass still carries the hardcoded 0.85 Reinhard knee — splice the named FLOW_PRESENT_KNEE (the faint-at-rest lever)",
        );
    if (/trail\s*\+\s*vec3<f32>\s*\(\s*0\.85/.test(renderWgsl))
        viol.push(
            "F7c rest-contrast: the WGSL present pass still carries the hardcoded 0.85 Reinhard knee — splice the named FLOW_PRESENT_KNEE (the faint-at-rest lever)",
        );
    // Both present passes reference the named knee (the DRY single source, the tone-map parity).
    if (glsl != null && !/FLOW_PRESENT_KNEE/.test(glsl))
        viol.push(
            "F7c rest-contrast: the GLSL present pass does not reference FLOW_PRESENT_KNEE — the named rest-contrast lever is unwired",
        );
    if (renderWgsl != null && !/FLOW_PRESENT_KNEE/.test(renderWgsl))
        viol.push(
            "F7c rest-contrast: the WGSL present pass does not reference FLOW_PRESENT_KNEE — the named rest-contrast lever is unwired",
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
        ...clauseFlowRegister(over),
    ];
}

// ── Self-test: a synthetic broken tree MUST red ──
function selfTest() {
    const fails = [];
    // (a) a planted reseed/advection re-paste INSIDE cs_field reds F1 (the scoped witness — the
    //     anchored register must NOT advect or re-seed; the bite injects into cs_field's body).
    const liveCompute = read(resolve(DIR, "shaders/flow-field.compute.wgsl.ts"));
    const reseedPlanted = runAll({
        compute: liveCompute.replace(
            /fn cs_field\(([^)]*)\)\s*\{/,
            "fn cs_field($1) {\n  let r = reseed(1.0, 2.0);\n  pos = pos + v * dt;",
        ),
    });
    if (!reseedPlanted.some((v) => v.startsWith("F1")))
        fails.push("self-test: a planted reseed(/advection INSIDE cs_field did NOT red F1");
    // (a2) the LEGIT cs_flow forward-Euler advection must NOT red F1 (the scope is real — a
    //      whole-file grep would false-trip the cs_flow current register).
    const flowAdvectionOnly = clauseTopology({ compute: liveCompute });
    if (flowAdvectionOnly.some((v) => /advect/i.test(v)))
        fails.push("self-test: the LEGIT cs_flow advection false-tripped F1 (the cs_field scope leaked)");
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
    // (g) a compute kernel WITHOUT cs_flow reds F7a (the advection register removed).
    const liveCompute2 = read(resolve(DIR, "shaders/flow-field.compute.wgsl.ts"));
    const noFlow = runAll({
        compute: liveCompute2.replace(/fn cs_flow\s*\(/g, "fn cs_disabled_flow("),
    });
    if (!noFlow.some((v) => v.startsWith("F7a")))
        fails.push("self-test: a compute kernel with no cs_flow did NOT red F7a");
    // (h) a teal stop planted INSIDE the WARM_FIRE_RAMP block reds F7b (scoped to the ramp).
    const livePresets = read(PRESETS);
    const tealRamp = runAll({
        presets: livePresets.replace(
            /(const WARM_FIRE_RAMP[^=]*=\s*\[)/,
            "$1\n    { L: 0.5, C: 0.11, h: 210 }, // planted teal",
        ),
    });
    if (!tealRamp.some((v) => v.startsWith("F7b")))
        fails.push("self-test: a teal stop inside WARM_FIRE_RAMP did NOT red F7b");
    // (h2) the concentric-theme teal (h:210 etc.) in the SAME presets file must NOT red F7b
    //      (the ramp-scoping is real — a whole-file teal grep would false-trip it).
    const cleanPresets = clauseFlowRegister({ presets: livePresets });
    if (cleanPresets.some((v) => v.startsWith("F7b")))
        fails.push(
            "self-test: the concentric-theme teal false-tripped F7b (the WARM_FIRE_RAMP scope leaked)",
        );
    // (i) a bare 0.85 knee (no named FLOW_PRESENT_KNEE splice) reds F7c.
    const bareKnee = runAll({
        glsl: "vec3 mapped = trail / (trail + vec3(0.85));",
        renderWgsl: "let mapped = trail / (trail + vec3<f32>(0.85));",
    });
    if (!bareKnee.some((v) => v.startsWith("F7c")))
        fails.push("self-test: a bare 0.85 present knee (no named splice) did NOT red F7c");
    // (i2) a too-high named knee (> 0.7) reds F7c (the stronger-contrast floor).
    const liveBridge = read(resolve(DIR, "composables/uniformBridgeWGPU.ts"));
    const weakKnee = runAll({
        bridge: liveBridge.replace(
            /export const FLOW_PRESENT_KNEE\s*=\s*[\d.]+/,
            "export const FLOW_PRESENT_KNEE = 0.85",
        ),
    });
    if (!weakKnee.some((v) => v.startsWith("F7c")))
        fails.push("self-test: a weak FLOW_PRESENT_KNEE=0.85 (> 0.7) did NOT red F7c");
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
        "proof:viz-dotflow — the dot-flow-field: the AURORA CURRENT (advected flow) over the kept anchored halftone (BC.W-VIZ-DOTFLOW + BG.W-DOTFLOW-REBUILD)",
    );
    if (viol.length) {
        console.error("  RED:");
        for (const v of viol) console.error("    ✗ " + v);
    } else {
        console.log("  GREEN (F1 topology · F2 regime · F3 round-trip · F4 no-canvas · F5 warm-identity · F6 pointer · F7 flow-register+rest-contrast)");
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
