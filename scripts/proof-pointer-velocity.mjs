#!/usr/bin/env node
// proof:pointer-velocity — BB.B4 (W-VIZ-POINTER): usePointerVelocityField, the shared
// viz-pointer-physics composable (pointer position + derived velocity + the ACCEL
// term), minted EARLY so the born-WebGPU viz consume it at birth.
//
// Device-free SOURCE-scan gate (the comment-strip + pure-detector house pattern,
// mirroring proof-press-unify.mjs / proof-drag-morph.mjs). Five falsifiable clauses,
// each born-RED at the pre-build HEAD (the composable did not exist) and driven GREEN
// by the leaf + the barrels + the consumer-evidence doc. The BINDING painted truth
// (the viz reading the field) is the π readback that rides W-REFLECT3 once the
// born-WebGPU viz land; this gate is the device-free CI half (it carries `ci` so
// proof:tag-parity stays green).
//
//   V1 — the composable EXISTS and is published. usePointerVelocityField is defined,
//        re-exported from the engine-free /motion-core barrel AND the root barrel
//        (it imports `vue` only — root-barrel safe per the useLiquidFlex precedent).
//   V2 — NO own rAF / no second loop. The leaf does NOT call requestAnimationFrame /
//        setInterval / setTimeout for a private loop — it is a PUSH-API the renderer
//        feeds via `tick(deltaMs)` (the one-loop / proof:offscreen-pause discipline).
//        It imports NEITHER @vueuse/core NOR @mkbabb/keyframes.js (the SCC-trap +
//        no-spring-engine fence — the smoothing is a hand-rolled lerp).
//   V3 — PRM = tick(0) FREEZE. The leaf reads prefers-reduced-motion via a SINGLE
//        cached matchMedia (the AV.W7 substrate pattern, NOT a fresh matchMedia per
//        event) AND `tick` freezes to rest under PRM or a zero/negative delta (the
//        deterministic tick(0) — no live velocity).
//   V4 — the ACCEL TERM is real. The leaf exposes an `acceleration` field DERIVED as
//        the second derivative (a velocity-delta computed in `tick`), not a stub.
//   V5 — the ≥2-consumer bar is met OR the consumer-evidence doc names the booked
//        binaries. The doc exists, names the booked WebGPU-viz consumers, and carries
//        the no-overfitting re-audit clause; OR ≥2 live call sites already exist.
//
// + a self-test bite: a synthetic leaf that forks an rAF / omits the accel term / does
//   not freeze under PRM MUST flag, proven every run (the anti-evasion floor — a
//   hollow detector that always greens is the AZ close-class lie).

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

const FILES = {
    leaf: "src/composables/motion/usePointerVelocityField.ts",
    coreBarrel: "src/composables/motion/core/index.ts",
    rootBarrel: "src/index.ts",
    evidence: "docs/consumer-evidence/use-pointer-velocity-field.md",
};

function read(rel) {
    return readFileSync(resolve(ROOT, rel), "utf8");
}

// Strip JS line- + block-comments so a detector matches REAL source, not a docstring
// example (the house comment-strip pattern). URL-safe `://` preserved by only
// stripping `//` not preceded by `:`.
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

const violations = [];
const facts = {};

if (!existsSync(resolve(ROOT, FILES.leaf))) {
    // Born-RED: the leaf does not exist yet (the pre-build HEAD).
    violations.push(`V1: ${FILES.leaf} does not exist (the composable is absent)`);
    finish();
}

const leafRaw = read(FILES.leaf);
const leaf = stripComments(leafRaw);

// ── V1 — exists + published on /motion-core + root ────────────────────────────
const defined = /export function usePointerVelocityField\b/.test(leaf);
if (!defined)
    violations.push("V1: usePointerVelocityField is not defined (export function absent)");

const coreBarrel = stripComments(read(FILES.coreBarrel));
const publishedCore = /export \* from "\.\.\/usePointerVelocityField"/.test(coreBarrel);
if (!publishedCore)
    violations.push(
        "V1: usePointerVelocityField is not re-exported from the /motion-core barrel (composables/motion/core/index.ts)",
    );

const rootBarrel = stripComments(read(FILES.rootBarrel));
const publishedRoot =
    /usePointerVelocityField/.test(rootBarrel) &&
    /from "\.\/composables\/motion\/usePointerVelocityField"/.test(rootBarrel);
if (!publishedRoot)
    violations.push(
        "V1: usePointerVelocityField is not re-exported from the root barrel (src/index.ts)",
    );
facts.published = { coreBarrel: publishedCore, rootBarrel: publishedRoot, defined };

// ── V2 — NO own rAF / no second loop / no heavy peer ──────────────────────────
const forksRaf = /\brequestAnimationFrame\s*\(/.test(leaf);
const forksInterval = /\bsetInterval\s*\(/.test(leaf);
// setTimeout would be a private loop; the leaf must not schedule one. (A degenerate
// no-rAF fallback is the createSpecularWriter pattern, but THIS leaf is a pure
// push-API — it schedules nothing.)
const forksTimeout = /\bsetTimeout\s*\(/.test(leaf);
if (forksRaf)
    violations.push(
        "V2: usePointerVelocityField forks its OWN requestAnimationFrame loop (it must be a tick()-fed push-API — the one-loop / proof:offscreen-pause discipline)",
    );
if (forksInterval)
    violations.push("V2: usePointerVelocityField forks a setInterval loop (no own loop)");
if (forksTimeout)
    violations.push("V2: usePointerVelocityField forks a setTimeout loop (no own loop)");
// The push-API: a `tick(` entry the renderer feeds.
const hasTick = /\btick\s*\(\s*deltaMs?\b/.test(leaf) || /\btick:\s*\(/.test(leaf);
if (!hasTick)
    violations.push(
        "V2: usePointerVelocityField exposes no `tick(delta)` push-step (the renderer-fed advance is absent — without it there is no way to advance without an own rAF)",
    );
// No @vueuse / no @mkbabb/keyframes import (the SCC-trap + no-spring-engine fence —
// the leaf is root-barrel-published, so it MUST be heavy-peer-free).
const importsVueuse = /from\s*["']@vueuse\/core["']/.test(leaf);
const importsKeyframes = /from\s*["']@mkbabb\/keyframes\.js["']/.test(leaf);
if (importsVueuse)
    violations.push(
        "V2: usePointerVelocityField imports @vueuse/core (it is root-barrel-published — the SCC-trap fence; the smoothing must be hand-rolled)",
    );
if (importsKeyframes)
    violations.push(
        "V2: usePointerVelocityField imports @mkbabb/keyframes.js (it is root-barrel-published — the heavy-peer fence; the smoothing must be a hand-rolled lerp, not a spring engine)",
    );
facts.noOwnLoop = {
    forksRaf,
    forksInterval,
    forksTimeout,
    hasTick,
    importsVueuse,
    importsKeyframes,
};

// ── V3 — PRM = tick(0) freeze, cached matchMedia ──────────────────────────────
// The PRM signal is a SINGLE cached matchMedia (minted once, not per-event). We
// assert ONE matchMedia call + a change listener (the AV.W7 substrate pattern).
const matchMediaCalls = (leaf.match(/\bmatchMedia\s*\(/g) || []).length;
const cachedPrm =
    matchMediaCalls >= 1 &&
    /addEventListener\(\s*["']change["']/.test(leaf) &&
    /prefers-reduced-motion:\s*reduce/.test(leaf);
if (!cachedPrm)
    violations.push(
        "V3: usePointerVelocityField does not cache a single matchMedia('prefers-reduced-motion: reduce') change listener (the AV.W7 substrate pattern)",
    );
// A fresh matchMedia per pointer event is forbidden (the cached-listener fence). The
// listener must be set up at composable setup, not inside the move handler. Heuristic:
// matchMedia is called at most a small constant number of times (setup), never inside
// onPointerMove. We assert the call count is low (≤2 — defensive).
const matchMediaNotPerEvent = matchMediaCalls <= 2;
if (!matchMediaNotPerEvent)
    violations.push(
        `V3: usePointerVelocityField calls matchMedia ${matchMediaCalls} times (a fresh matchMedia per event is forbidden — cache ONE listener at setup)`,
    );
// tick freezes under PRM or a zero/negative delta → reset() to rest. The freeze gate
// reads the cached `reduced` flag AND the delta guard.
const tickFreezes =
    /reduced/.test(leaf) &&
    /reset\s*\(\s*\)/.test(leaf) &&
    /deltaMs\s*>\s*0/.test(leaf);
if (!tickFreezes)
    violations.push(
        "V3: tick() does not freeze to rest under PRM or a zero/negative delta (the deterministic tick(0) freeze — `reduced` + `deltaMs > 0` guard reaching reset())",
    );
// The pointer-position write is PRM-gated (skip the live target write under reduce).
const positionWriteGated = /respectPRM\s*&&\s*reduced/.test(leaf);
if (!positionWriteGated)
    violations.push(
        "V3: the pointer-position write is not PRM-gated (the createSpecularWriter precedent — skip the live target write under reduce)",
    );
facts.prm = {
    matchMediaCalls,
    cachedPrm,
    matchMediaNotPerEvent,
    tickFreezes,
    positionWriteGated,
};

// ── V4 — the ACCEL TERM is real (a derived second derivative) ─────────────────
const exposesAcceleration =
    /\bacceleration\b/.test(leaf) && /readonly\s*\(\s*acceleration\s*\)/.test(leaf);
// The accel is DERIVED in tick: a velocity-delta divided by dt (the second
// derivative), not a stub. We assert a `(vx - prevVelocity` / `prevVelocity` read
// feeding an acceleration write.
const accelDerived =
    /prevVelocity/.test(leaf) &&
    /acceleration\.value\s*=/.test(leaf) &&
    /\/\s*dt/.test(leaf);
if (!exposesAcceleration)
    violations.push(
        "V4: usePointerVelocityField does not expose an `acceleration` field (the accel term the relay names is absent)",
    );
if (!accelDerived)
    violations.push(
        "V4: the acceleration is not DERIVED as a second derivative (a velocity-delta / dt feeding acceleration.value — a stub accel REDs)",
    );
// Velocity is also derived (the chain position→velocity→acceleration).
const velocityDerived =
    /\bvelocity\b/.test(leaf) &&
    /velocity\.value\s*=/.test(leaf) &&
    /readonly\s*\(\s*velocity\s*\)/.test(leaf);
if (!velocityDerived)
    violations.push("V4: usePointerVelocityField does not derive + expose `velocity`");
facts.derived = { exposesAcceleration, accelDerived, velocityDerived };

// ── V5 — the ≥2-consumer bar OR the consumer-evidence doc ─────────────────────
// Live call sites across src/ (a real binary consumer is a usePointerVelocityField()
// call in a non-test, non-leaf source file).
let liveConsumers = 0;
try {
    const grep = execGrep();
    liveConsumers = grep;
} catch {
    liveConsumers = 0;
}
const evidenceExists = existsSync(resolve(ROOT, FILES.evidence));
let evidenceNamesBooked = false;
let evidenceHasReaudit = false;
if (evidenceExists) {
    const ev = read(FILES.evidence);
    // Names the booked WebGPU-viz consumers (W-FLOWFIELD + W-CONCENTRIC).
    evidenceNamesBooked =
        /W-FLOWFIELD/.test(ev) &&
        /W-CONCENTRIC/.test(ev) &&
        /usePointerVelocityField/.test(ev);
    // Carries the no-overfitting re-audit clause (a retire/wire trigger).
    evidenceHasReaudit = /re-audit/i.test(ev) && /retire/i.test(ev);
}
const consumerBarMet =
    liveConsumers >= 2 ||
    (evidenceExists && evidenceNamesBooked && evidenceHasReaudit);
if (!consumerBarMet) {
    if (!evidenceExists)
        violations.push(
            `V5: the ≥2-consumer bar is unmet (${liveConsumers} live call site(s)) AND ${FILES.evidence} does not exist (the booked-consumer evidence is required for the EARLY publish)`,
        );
    else if (!evidenceNamesBooked)
        violations.push(
            "V5: the consumer-evidence doc does not name the booked WebGPU-viz consumers (W-FLOWFIELD + W-CONCENTRIC + usePointerVelocityField)",
        );
    else if (!evidenceHasReaudit)
        violations.push(
            "V5: the consumer-evidence doc lacks the no-overfitting re-audit/retire clause",
        );
}
facts.consumerBar = {
    liveConsumers,
    evidenceExists,
    evidenceNamesBooked,
    evidenceHasReaudit,
    met: consumerBarMet,
};

// ── Self-test bites (anti-evasion — each MUST flag, proven every run) ──────────
const bites = [];
{
    // Bite 1 (V2): a synthetic leaf that forks an rAF MUST flag.
    const fake = `function tick(){ requestAnimationFrame(loop) }`;
    const flagged = /\brequestAnimationFrame\s*\(/.test(stripComments(fake));
    bites.push({ id: "V2-own-raf", flagged });
    if (!flagged)
        violations.push("SELF-TEST V2 bite did not flag a synthetic own-rAF leaf");
}
{
    // Bite 2 (V4): a synthetic accel-stub (no /dt second derivative) MUST flag.
    const fakeStub = `const acceleration = ref({x:0,y:0}) /* never derived */`;
    const stripped = stripComments(fakeStub);
    const derived =
        /prevVelocity/.test(stripped) &&
        /acceleration\.value\s*=/.test(stripped) &&
        /\/\s*dt/.test(stripped);
    bites.push({ id: "V4-accel-stub", flagged: !derived });
    if (derived)
        violations.push("SELF-TEST V4 bite did not flag a stub (never-derived) acceleration");
}
{
    // Bite 3 (V3): a synthetic tick with no PRM/zero-delta freeze MUST flag.
    const fakeTick = `function tick(deltaMs){ const dt = deltaMs/1000; smooth() }`;
    const stripped = stripComments(fakeTick);
    const freezes =
        /reduced/.test(stripped) &&
        /reset\s*\(\s*\)/.test(stripped) &&
        /deltaMs\s*>\s*0/.test(stripped);
    bites.push({ id: "V3-no-freeze", flagged: !freezes });
    if (freezes)
        violations.push("SELF-TEST V3 bite did not flag a tick with no PRM/zero-delta freeze");
}
facts.selfTestBites = bites;

finish();

function finish() {
    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_POINTER_VELOCITY_ARTIFACT",
        "pointer-velocity",
    );
    writeGateArtifact(ARTIFACT, {
        gate: "proof:pointer-velocity",
        status,
        generatedAt: snapshotStamp(),
        facts,
        violations,
    });

    console.log(
        "proof:pointer-velocity — the shared viz-pointer-physics field (BB.B4 W-VIZ-POINTER)",
    );
    console.log(`  leaf: ${FILES.leaf}`);
    if (facts.published)
        console.log(
            `  published: core=${facts.published.coreBarrel} root=${facts.published.rootBarrel}`,
        );
    if (facts.noOwnLoop)
        console.log(
            `  no own loop (push-API tick): raf=${facts.noOwnLoop.forksRaf} interval=${facts.noOwnLoop.forksInterval} timeout=${facts.noOwnLoop.forksTimeout} hasTick=${facts.noOwnLoop.hasTick} vueuse=${facts.noOwnLoop.importsVueuse} keyframes=${facts.noOwnLoop.importsKeyframes}`,
        );
    if (facts.prm)
        console.log(
            `  PRM tick(0) freeze: cachedMatchMedia=${facts.prm.cachedPrm} tickFreezes=${facts.prm.tickFreezes} positionGated=${facts.prm.positionWriteGated}`,
        );
    if (facts.derived)
        console.log(
            `  accel term derived: accel=${facts.derived.accelDerived} velocity=${facts.derived.velocityDerived}`,
        );
    if (facts.consumerBar)
        console.log(
            `  consumer bar: liveConsumers=${facts.consumerBar.liveConsumers} evidence=${facts.consumerBar.evidenceExists} booked=${facts.consumerBar.evidenceNamesBooked} met=${facts.consumerBar.met}`,
        );
    console.log(
        `  self-test bites all flagged: ${(facts.selfTestBites ?? []).every((b) => b.flagged)}`,
    );
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

// Count live usePointerVelocityField() CALL sites across src/ (excluding the leaf
// itself + the barrels + tests). A real binary consumer is a `usePointerVelocityField(`
// invocation in a non-leaf src file.
function execGrep() {
    try {
        const out = execSync(
            `grep -rl 'usePointerVelocityField(' ${resolve(ROOT, "src")} 2>/dev/null || true`,
            { encoding: "utf8" },
        );
        const files = out
            .split("\n")
            .map((f) => f.trim())
            .filter(Boolean)
            .filter((f) => !f.endsWith("usePointerVelocityField.ts"))
            .filter((f) => !f.endsWith("/index.ts"));
        return files.length;
    } catch {
        return 0;
    }
}
