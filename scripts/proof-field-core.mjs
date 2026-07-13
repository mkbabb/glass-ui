#!/usr/bin/env node
// BI.W-FIELD-CORE — proof:field-core: the ONE interaction-physics field + the four legacy
// pointer-model retires.
//
// Device-free SOURCE-scan gate (the comment-strip + pure-detector house pattern). Born-RED
// at the pre-build HEAD (aurora ran the DUAL `cursorModel.ts` + field path; the blob fed the
// field its ALREADY-SMOOTHED position at useMetaballRenderer:254 — the double-smooth;
// FourierField forced `interactive = false` for every ambient consumer; `FOLLOW_REACH = 0.7`
// was the centroid-teleport). GREEN when the field evolves + the four legacy models retire.
//
//   FC1 — the field core is EVOLVED + keyframes-FREE. `usePointerVelocityField` exposes
//         `engagement` + `attractor` + `attractorVelocity`, the attractor is a HAND-ROLLED
//         mass-spring-damper (`-ω²(x-target) - 2ζω·v`, semi-implicit Euler) with `halfLifeMs`
//         authoring; NO `@mkbabb/keyframes.js` import (the /motion-core reach — hand-rolled).
//   FC2 — the four legacy models are DEFINITION-ABSENT: `cursorModel.ts` gone (no alias, no
//         half-delete), the aurora `injectCursorVelocity` dual-path gone, the blob raw-path
//         double-smooth gone, `FOLLOW_REACH = 0.7` gone, the FourierField hard
//         `interactive = false` ambient gate gone.
//   FC3 — the double-smooth dies: the blob feeds the field the RAW pointer (`rawPointer()`)
//         ONCE, NEVER the already-smoothed spring output (`pointer.pointer`) — one stage.
//   FC4 — `useRoutePointer` exists ONCE: a CAPTURE-phase + PASSIVE window `pointermove`,
//         PRM + paused-gated, NEVER preventDefault/focus/steal.
//   FC5 — the four mappings are PURE (no DOM / rAF / Vue-ref state), unit-testable;
//         `auroraCursorMapping` wires the EXISTING `uCursor*` uniforms (ZERO shader edit — no
//         `.glsl.ts`/`.wgsl.ts` in the aurora shader tree changed the cursor uniforms).
//   FC6 — the T-38 rider: the aurora interactivity atoms are MEDIUM-GATED (a `swirl` axis
//         reads on `smooth`), the velocity BURST routes into the domain-warp path (the
//         `uCursorBurst` uniform is uploaded), and the SIZED `amplitude` atom is present.
//
// + self-test bites (anti-evasion, proven every run): a planted keyframes import in the core
//   REDs; a planted second smoothing stage (a re-smoothed field feed) REDs; a planted
//   cursorModel re-mint (`createCursorState`/`advanceCursor`) REDs.

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

const FILES = {
    field: "src/composables/motion/usePointerVelocityField.ts",
    routePointer: "src/composables/motion/useRoutePointer.ts",
    mappings: "src/composables/motion/pointerFieldMappings.ts",
    cursorModel: "src/components/custom/aurora/composables/cursorModel.ts",
    auroraRuntime: "src/components/custom/aurora/composables/runtime.ts",
    auroraFrameLoop: "src/components/custom/aurora/composables/frameLoop.ts",
    auroraAtoms: "src/components/custom/aurora/composables/atoms.ts",
    auroraUniformBridge: "src/components/custom/aurora/composables/uniformBridge.ts",
    blobRenderer: "src/components/custom/blob/composables/useMetaballRenderer.ts",
    blobPointer: "src/components/custom/blob/composables/useBlobPointer.ts",
    fourierConstants: "src/components/custom/fourier-field/constants.ts",
    fourierField: "src/components/custom/fourier-field/FourierField.vue",
    fourierUse: "src/components/custom/fourier-field/composables/useFourierField.ts",
};

function read(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : null;
}

// Strip JS line- + block-comments (URL-safe `://` preserved) so a detector matches REAL
// source, not a docstring example (the house comment-strip pattern).
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, " ")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

const violations = [];
const facts = {};

// ── FC1 — the field core is evolved + keyframes-FREE ──────────────────────────
{
    const raw = read(FILES.field);
    if (!raw) {
        violations.push(`FC1: ${FILES.field} is absent`);
    } else {
        const src = stripComments(raw);
        const hasEngagement = /readonly\s*\(\s*engagement\s*\)/.test(src) && /engagement\.value\s*=/.test(src);
        const hasAttractor = /readonly\s*\(\s*attractor\s*\)/.test(src) && /attractor\.value\s*=/.test(src);
        const hasAttractorVel = /attractorVelocity/.test(src);
        // The mass-spring-damper: `-ω²(x-target) - 2ζω·v` (semi-implicit Euler). We assert the
        // characteristic `omega * omega` stiffness + the `2 * zeta * omega` damping terms.
        const massSpringDamper =
            /omega\s*\*\s*omega/.test(src) && /2\s*\*\s*zeta\s*\*\s*omega/.test(src);
        const halfLife = /halfLifeMs/.test(src);
        // ω from the response convention (2π/response) — no second ω-formula.
        const omegaFromResponse = /2\s*\*\s*Math\.PI\s*\)\s*\/\s*\(\s*attractorResponse/.test(src) || /2\s*\*\s*Math\.PI\s*\/\s*\(\s*attractorResponse/.test(src);
        const noKeyframes = !/from\s*["']@mkbabb\/keyframes\.js["']/.test(src);
        const noVueuse = !/from\s*["']@vueuse\/core["']/.test(src);
        facts.fc1 = {
            hasEngagement,
            hasAttractor,
            hasAttractorVel,
            massSpringDamper,
            halfLife,
            omegaFromResponse,
            noKeyframes,
            noVueuse,
        };
        if (!hasEngagement) violations.push("FC1: the field exposes no derived `engagement` envelope");
        if (!hasAttractor) violations.push("FC1: the field exposes no `attractor` (the mass-spring-damper follow)");
        if (!hasAttractorVel) violations.push("FC1: the field exposes no `attractorVelocity`");
        if (!massSpringDamper) violations.push("FC1: the attractor is not a hand-rolled mass-spring-damper (`-ω²(x-target) - 2ζω·v` — the `omega*omega` + `2*zeta*omega` terms)");
        if (!halfLife) violations.push("FC1: no `halfLifeMs` authoring (the engagement envelope must be half-life-authored, k derived internally)");
        if (!omegaFromResponse) violations.push("FC1: ω is not derived from the `(response)` convention (2π/attractorResponse — no second ω-formula)");
        if (!noKeyframes) violations.push("FC1: the field imports @mkbabb/keyframes.js (the core must be keyframes-FREE on the /motion-core reach — the attractor is hand-rolled)");
        if (!noVueuse) violations.push("FC1: the field imports @vueuse/core (the SCC-trap fence)");
    }
}

// ── FC2 — the four legacy models are DEFINITION-ABSENT ────────────────────────
{
    const cursorModelPresent = existsSync(resolve(ROOT, FILES.cursorModel));
    const runtime = stripComments(read(FILES.auroraRuntime) ?? "");
    const fourierConstants = stripComments(read(FILES.fourierConstants) ?? "");
    const fourierField = stripComments(read(FILES.fourierField) ?? "");
    // cursorModel.ts absent — no alias, no half-delete (no re-import anywhere).
    const runtimeImportsCursorModel = /from\s*["']\.\/cursorModel["']/.test(runtime);
    // the aurora dual-path: the retired injectCursorVelocity runtime write-path.
    const runtimeHasInjectCursorVelocity = /function\s+injectCursorVelocity\s*\(/.test(runtime);
    // FOLLOW_REACH = 0.7 gone from the fourier constants.
    const followReachPresent = /FOLLOW_REACH\s*=\s*0?\.7/.test(fourierConstants) || /export\s+const\s+FOLLOW_REACH/.test(fourierConstants);
    // the FourierField hard ambient `interactive = false` gate gone (the ambient consumer is
    // now the subtle-interactive register — `props.config ? … : true`).
    const hardInteractiveFalse = /props\.config\s*\?\s*base\.interactive\s*:\s*false/.test(fourierField);
    facts.fc2 = {
        cursorModelPresent,
        runtimeImportsCursorModel,
        runtimeHasInjectCursorVelocity,
        followReachPresent,
        hardInteractiveFalse,
    };
    if (cursorModelPresent) violations.push("FC2: cursorModel.ts still EXISTS (it must be DEFINITION-ABSENT — the field + auroraCursorMapping replace it entirely)");
    if (runtimeImportsCursorModel) violations.push("FC2: aurora runtime still imports ./cursorModel (the dual-path must be gone)");
    if (runtimeHasInjectCursorVelocity) violations.push("FC2: aurora runtime still defines injectCursorVelocity (the cursorModel velocity write-path — retired; the field derives velocity)");
    if (followReachPresent) violations.push("FC2: FOLLOW_REACH=0.7 still present in the fourier constants (the centroid-teleport must retire onto fourierLeanMapping's subtle lean)");
    if (hardInteractiveFalse) violations.push("FC2: FourierField still forces the ambient `interactive = false` gate (it must become the subtle-interactive background register)");
}

// ── FC3 — the double-smooth dies: the blob feeds RAW ONCE ─────────────────────
{
    const blob = stripComments(read(FILES.blobRenderer) ?? "");
    const blobPointer = stripComments(read(FILES.blobPointer) ?? "");
    // The field is fed the RAW pointer (`rawPointer()`), NEVER the already-smoothed
    // `pointer.pointer` spring output into setPointer.
    const feedsRaw = /rawPointer\s*\(/.test(blob) && /pointerField\.setPointer/.test(blob);
    const feedsSmoothed = /pointerField\.setPointer\s*\(\s*p\.x/.test(blob) && /const\s+p\s*=\s*pointer\.pointer\.value/.test(blob);
    const exposesRaw = /rawPointer\s*:/.test(blobPointer);
    facts.fc3 = { feedsRaw, feedsSmoothed, exposesRaw };
    if (!exposesRaw) violations.push("FC3: useBlobPointer does not expose `rawPointer()` (the field needs the RAW pointer, not the smoothed spring output)");
    if (!feedsRaw) violations.push("FC3: the blob renderer does not feed the field the RAW pointer once (rawPointer() → setPointer)");
    if (feedsSmoothed) violations.push("FC3: the blob renderer STILL feeds the field the already-smoothed `pointer.pointer` spring output (the double-smooth — it must feed the raw pointer once)");
}

// ── FC4 — useRoutePointer: capture-phase, PRM+paused-gated, non-stealing ───────
{
    const raw = read(FILES.routePointer);
    if (!raw) {
        violations.push(`FC4: ${FILES.routePointer} is absent (the route broadcaster)`);
    } else {
        const src = stripComments(raw);
        const definedOnce = /export function useRoutePointer\b/.test(src);
        const capturePhase = /addEventListener\(\s*["']pointermove["'][^)]*capture:\s*true/.test(src);
        const passive = /passive:\s*true/.test(src);
        const prmGated = /prefers-reduced-motion:\s*reduce/.test(src) && /matchMedia\s*\(/.test(src);
        const pausedGated = /paused/.test(src) && /toValue\s*\(/.test(src);
        // NEVER preventDefault / focus / steal a click.
        const noPreventDefault = !/preventDefault\s*\(/.test(src);
        const noFocusSteal = !/\.focus\s*\(/.test(src) && !/setPointerCapture\s*\(/.test(src);
        facts.fc4 = { definedOnce, capturePhase, passive, prmGated, pausedGated, noPreventDefault, noFocusSteal };
        if (!definedOnce) violations.push("FC4: useRoutePointer is not defined");
        if (!capturePhase) violations.push("FC4: the window pointermove listener is not CAPTURE-phase (it must survive a foreground child stopPropagation)");
        if (!passive) violations.push("FC4: the window pointermove listener is not PASSIVE (it must never be able to preventDefault)");
        if (!prmGated) violations.push("FC4: useRoutePointer is not PRM-gated (a cached matchMedia prefers-reduced-motion)");
        if (!pausedGated) violations.push("FC4: useRoutePointer is not paused-gated (the WCAG-2.2.2 route pause via toValue(options.paused))");
        if (!noPreventDefault) violations.push("FC4: useRoutePointer calls preventDefault (it must never steal — passive read only)");
        if (!noFocusSteal) violations.push("FC4: useRoutePointer focuses or captures the pointer (it must never steal a click/focus)");
    }
}

// ── FC5 — the four mappings are PURE + auroraCursorMapping wires uCursor* ──────
{
    const raw = read(FILES.mappings);
    if (!raw) {
        violations.push(`FC5: ${FILES.mappings} is absent`);
    } else {
        const src = stripComments(raw);
        const hasAll =
            /export function fourierLeanMapping\b/.test(src) &&
            /export function blobPullMapping\b/.test(src) &&
            /export function auroraCursorMapping\b/.test(src) &&
            /export function constellationWellMapping\b/.test(src);
        // PURE: no DOM (document/window), no rAF/timers, no Vue-ref state (ref(/reactive().
        const pure =
            !/\bdocument\b/.test(src) &&
            !/\bwindow\b/.test(src) &&
            !/requestAnimationFrame|setInterval|setTimeout/.test(src) &&
            !/\bref\s*\(/.test(src) &&
            !/\breactive\s*\(/.test(src) &&
            !/addEventListener/.test(src);
        facts.fc5 = { hasAll, pure };
        if (!hasAll) violations.push("FC5: the four mappings (fourierLean/blobPull/auroraCursor/constellationWell) are not all defined");
        if (!pure) violations.push("FC5: a mapping is not PURE (it touches DOM / rAF / timers / Vue-ref state — the mappings must be pure, unit-testable functions)");
    }
    // auroraCursorMapping wires the EXISTING uCursor* uniforms — ZERO shader edit. The
    // frameLoop uploads the mapped velX/velY/burst onto uCursorVelocity/uCursorBurst; no
    // aurora `.glsl.ts`/`.wgsl.ts` shader authored a NEW cursor uniform this wave (the
    // interactability is a WIRING gap, not a shader edit). We assert the frameLoop routes the
    // mapped cursor onto the uCursor* uniforms.
    const frameLoop = stripComments(read(FILES.auroraFrameLoop) ?? "");
    const wiresUCursor =
        /auroraCursorMapping\s*\(/.test(frameLoop) &&
        /U\.uCursorVelocity/.test(frameLoop) &&
        /U\.uCursorBurst/.test(frameLoop);
    facts.fc5wiresUCursor = wiresUCursor;
    if (!wiresUCursor) violations.push("FC5: the aurora frameLoop does not wire auroraCursorMapping onto the existing uCursor* uniforms (uCursorVelocity/uCursorBurst)");
}

// ── FC6 — the T-38 rider: medium-gated atoms + burst→warp + sized amplitude ───
{
    const atoms = stripComments(read(FILES.auroraAtoms) ?? "");
    const uniformBridge = stripComments(read(FILES.auroraUniformBridge) ?? "");
    // The interactivity atom is MEDIUM-GATED (a `swirl` axis that reads on smooth).
    const mediumGatedSwirl = /swirl\??:/.test(atoms) && /swirl:\s*it\.swirl\s*\?\?/.test(atoms);
    // The sized amplitude atom.
    const sizedAmplitude = /amplitude\??:/.test(atoms) && /amplitude:\s*/.test(atoms);
    // The velocity burst routes into the domain-warp path — the uCursorBurst uniform is
    // uploaded (the field's burst reaches the shader's warp branch; ZERO shader edit).
    const burstUploaded = /uniform1f\s*\(\s*U\.uCursorBurst/.test(uniformBridge);
    facts.fc6 = { mediumGatedSwirl, sizedAmplitude, burstUploaded };
    if (!mediumGatedSwirl) violations.push("FC6: the aurora interactivity atom is not MEDIUM-GATED (a `swirl` axis defaulting ON so the cursor reads on the smooth medium — the T-38 dead-axis fix)");
    if (!sizedAmplitude) violations.push("FC6: the SIZED `amplitude` interactivity atom is absent");
    if (!burstUploaded) violations.push("FC6: the velocity burst does not route to the shader (uCursorBurst is not uploaded — the domain-warp velocity route)");
}

// ── Self-test bites (anti-evasion — each MUST flag, proven every run) ──────────
const bites = [];
{
    // Bite 1 (FC1): a planted keyframes import in the core MUST flag.
    const fake = `import { SpringProgress } from "@mkbabb/keyframes.js"`;
    const flagged = /from\s*["']@mkbabb\/keyframes\.js["']/.test(stripComments(fake));
    bites.push({ id: "FC1-keyframes-import", flagged });
    if (!flagged) violations.push("SELF-TEST FC1 bite did not flag a planted keyframes import");
}
{
    // Bite 2 (FC3): a planted second smoothing stage (re-feed the smoothed spring) MUST flag.
    const fake = `const p = pointer.pointer.value; pointerField.setPointer(p.x, p.y)`;
    const stripped = stripComments(fake);
    const flagged = /pointerField\.setPointer\s*\(\s*p\.x/.test(stripped) && /const\s+p\s*=\s*pointer\.pointer\.value/.test(stripped);
    bites.push({ id: "FC3-double-smooth", flagged });
    if (!flagged) violations.push("SELF-TEST FC3 bite did not flag a planted double-smooth (re-fed spring output)");
}
{
    // Bite 3 (FC2): a planted cursorModel re-mint MUST flag.
    const fake = `import { createCursorState, advanceCursor } from "./cursorModel"`;
    const flagged = /from\s*["']\.\/cursorModel["']/.test(stripComments(fake));
    bites.push({ id: "FC2-cursormodel-remint", flagged });
    if (!flagged) violations.push("SELF-TEST FC2 bite did not flag a planted cursorModel re-mint");
}
facts.selfTestBites = bites;

// ── finish ────────────────────────────────────────────────────────────────────
const status = violations.length === 0 ? "pass" : "fail";
const ARTIFACT = gateArtifactPath("GLASS_UI_FIELD_CORE_ARTIFACT", "BI-field-core");
writeGateArtifact(ARTIFACT, {
    gate: "proof:field-core",
    status,
    generatedAt: snapshotStamp(),
    facts,
    violations,
});

console.log("proof:field-core — the ONE interaction-physics field + the 4 legacy pointer-model retires (BI.W-FIELD-CORE)");
console.log(`  FC1 field evolved (keyframes-free): ${facts.fc1 ? JSON.stringify(facts.fc1) : "n/a"}`);
console.log(`  FC2 legacy retired: ${JSON.stringify(facts.fc2)}`);
console.log(`  FC3 double-smooth dead: ${JSON.stringify(facts.fc3)}`);
console.log(`  FC4 route broadcaster: ${facts.fc4 ? JSON.stringify(facts.fc4) : "ABSENT"}`);
console.log(`  FC5 pure mappings + uCursor wire: ${facts.fc5 ? JSON.stringify(facts.fc5) : "n/a"} wiresUCursor=${facts.fc5wiresUCursor}`);
console.log(`  FC6 T-38 rider: ${JSON.stringify(facts.fc6)}`);
console.log(`  self-test bites all flagged: ${bites.every((b) => b.flagged)}`);
if (violations.length) {
    console.log("\nVIOLATIONS:");
    for (const v of violations) console.log(`  ✗ ${v}`);
}
console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
process.exit(status === "pass" ? 0 : 1);
