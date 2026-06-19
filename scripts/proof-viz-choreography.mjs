#!/usr/bin/env node
// proof:viz-choreography — BC.W-VIZ-CHOREOGRAPHY: the procedural-viz family's ONE
// start · transition · end · restart choreography clock, on the published-4.3.0
// keyframes.js clock (the MOTION-ONE-CLOCK viz-layer instance).
//
// THE BB DISEASE THIS CURES (viz-codebase.md §8 — BC.W-VIZ-CHOREOGRAPHY UNMET): the viz
// arm/fade-in/park rode ad-hoc `scheduleAfterFirstPaint`/`setTimeout` (useAurora.ts:81-114),
// NOT a keyframes.js `SpringProgress`/`Sequence`. NO viz expressed a coupled fade, a
// settle-from-scatter build-in, a velocity-continuous restart, or a spring-glide preset
// transition. This gate is the SUBSTRATE-FLOOR enforcement net: it locks the shared
// `useVizChoreography` leaf (the four beats on ONE kf clock, NO own rAF, the coupled fade)
// AND it owns the per-viz consumer clause (the REAL grep the per-viz waves wire after this
// floor — the BB `usePointerVelocityField` gate-blindness class, cured).
//
// Device-free SOURCE-scan gate (the comment-strip + pure-detector house pattern, mirroring
// proof-pointer-velocity.mjs / proof-viz-interaction.mjs). The BINDING painted truth (the
// viz choreographs its entrance/sequence on a real GPU) is the π readback
// tests-visual/viz-choreography.spec.ts that rides W-REFLECT3; this gate is the device-free
// CI half (it carries `ci` so proof:tag-parity stays green).
//
// Clauses (each falsifiable; self-test bites prove the detectors flag):
//   C1 (leaf) — the shared `useVizChoreography` leaf EXISTS and composes the kf clock. It
//        defines `useVizChoreography`, imports `SpringProgress`/`SmoothProgress`/
//        `springTimingFunction` from @mkbabb/keyframes.js, exposes the coupled `revealT`
//        AND `opacity` scalar (the same-drive-both-legs coupled fade, W-MOTION-CANON P3),
//        and the four beats `enter`/`leave`/`transitionTo`/`restart`. Born-RED on HEAD (the
//        leaf is absent).
//   C1b (consumer) — the per-viz consumer bar. The REAL `grep useVizChoreography
//        src/components/custom/{viz}/` finds ≥2 live call sites driving a canvas opacity +
//        a build-in uniform off `revealT`. Born-RED at this substrate-floor close (every
//        viz grep EMPTY — the per-viz waves wire it AFTER this floor); GREEN when ≥2 per-viz
//        waves wire it. Mid-build RED is BY-DESIGN (the grep CATCHING the unmet bar, NOT a
//        doc-prose green — the SYNTHESIS class-2 cure). The consumer-evidence doc carries
//        the re-audit/retire trigger but is NOT a substitute for a call site.
//   C2 (leaf+consumer) — NO setTimeout/scheduleAfterFirstPaint for the reveal. The LEAF
//        forks no setTimeout/setInterval/requestAnimationFrame (it is a tick()-fed push-API)
//        AND every wired viz consumer reads the kf clock, never an ad-hoc timer for the
//        reveal. Born-RED on useAurora.ts:81-114 (the scheduleAfterFirstPaint reveal).
//   C3 (leaf) — the reveal reads a SPRING_PRESETS register, never a hand --duration-* wall
//        clock NOR an inline (response, ζ) literal. The leaf imports springPreset from the
//        SPRING_PRESETS table; a `--duration-*` read or a `{ response: 0.N, dampingFraction:
//        0.N }` object literal REDs (the W-GLASS-CAL per-spring-clock fence).
//   C4 (leaf) — the SCC fence. The leaf does NOT import or compose
//        `CSSKeyframesAnimation`/`AnimationGroup` (which would pull the HEAVY value.js engine
//        into the viz chunk). A Sequence (where used) orchestrates SpringProgress-driven
//        writers ONLY (the LIGHT path) — a `.add(CSSKeyframesAnimation)` / a
//        CSSKeyframesAnimation import REDs.
//   C5 (leaf) — the one-loop discipline. The leaf is FED `tick(dt)` (it exposes a
//        `tick(dtMs)` push-step) and owns NO rAF (no requestAnimationFrame, no .play() on
//        the spring/sequence — the renderer steps it). A kf `.play()` call REDs (it spawns
//        the kf RAFPlayback — the one-loop floor breach).
//   C6 (leaf) — the Oscillator is ABSENT. It is LOCAL-ONLY past v4.3.0 (machine-verified
//        absent from the consumed dist); importing it REDs (a republish-gated by-name ask,
//        NO peer-spine widen). The interim loop clock is the viz's existing sine/uTime.
//
// + self-test bites (anti-evasion — each MUST flag, proven every run): a synthetic
//   setTimeout reveal REDs C2; a synthetic `.add(CSSKeyframesAnimation)` REDs C4; a
//   synthetic `--duration-` clock read REDs C3; a synthetic `.play()` REDs C5; a synthetic
//   Oscillator import REDs C6.

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
    leaf: "src/composables/glass/useVizChoreography.ts",
    presets: "src/composables/motion/springPresets.ts",
    aurora: "src/components/custom/aurora/composables/useAurora.ts",
    kfDist: "node_modules/@mkbabb/keyframes.js/dist/keyframes.d.ts",
    evidence: "docs/consumer-evidence/use-viz-choreography.md",
};

function read(rel) {
    return readFileSync(resolve(ROOT, rel), "utf8");
}

// Strip JS line- + block-comments so a detector matches REAL source, not a docstring
// example (the house comment-strip pattern). URL-safe `://` preserved by only stripping
// `//` not preceded by `:`.
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

const violations = [];
const facts = {};

// ── C1 — the leaf EXISTS + composes the kf clock + the coupled fade ───────────────
if (!existsSync(resolve(ROOT, FILES.leaf))) {
    violations.push(
        `C1: ${FILES.leaf} does not exist (the shared viz-choreography leaf is absent — the substrate floor is unbuilt)`,
    );
    finish();
}

const leafRaw = read(FILES.leaf);
const leaf = stripComments(leafRaw);

const defined = /export function useVizChoreography\b/.test(leaf);
if (!defined)
    violations.push(
        "C1: useVizChoreography is not defined (export function absent)",
    );

// Composes the published-4.3.0 kf clock: SpringProgress + springTimingFunction from the
// peer (the one-clock primitive + the cross-fade timing). SmoothProgress is the config-
// transition lerp (also published).
const importsKf = /from\s*["']@mkbabb\/keyframes\.js["']/.test(leaf);
const composesSpringProgress = /\bSpringProgress\b/.test(leaf) && importsKf;
const composesSpringTiming = /\bspringTimingFunction\b/.test(leaf);
if (!composesSpringProgress)
    violations.push(
        "C1: useVizChoreography does not compose the kf SpringProgress (the one-clock reveal primitive) imported from @mkbabb/keyframes.js",
    );
if (!composesSpringTiming)
    violations.push(
        "C1: useVizChoreography does not compose springTimingFunction (the transition cross-fade timing — the typed {fn,css} pair from the SAME SPRING_PRESETS row)",
    );

// The COUPLED fade (W-MOTION-CANON P3 — same-drive-both-legs): ONE revealT scalar drives
// BOTH the opacity leg AND the build-in uniform. The leaf exposes `revealT` AND `opacity`,
// and the opacity is DERIVED from the reveal value (the coupled drive, not an independent ref).
const exposesRevealT =
    /\brevealT\b/.test(leaf) && /readonly\s*\(\s*revealT\s*\)/.test(leaf);
const exposesOpacity =
    /\bopacity\b/.test(leaf) && /readonly\s*\(\s*opacity\s*\)/.test(leaf);
// The coupling: opacity is written from the reveal spring's value (clamp of revealT/value),
// not an independent target — the same drive feeds both legs.
const opacityCoupled =
    /opacity\.value\s*=\s*Math\.(min|max)/.test(leaf) &&
    /reveal\.value/.test(leaf);
if (!exposesRevealT)
    violations.push(
        "C1: useVizChoreography does not expose a readonly `revealT` scalar (the coupled reveal drive — the build-in uniform leg)",
    );
if (!exposesOpacity)
    violations.push(
        "C1: useVizChoreography does not expose a readonly `opacity` scalar (the coupled fade leg)",
    );
if (!opacityCoupled)
    violations.push(
        "C1: the opacity leg is not COUPLED to the SAME reveal drive (opacity.value must derive from the reveal spring's value — W-MOTION-CANON P3 same-drive-both-legs; an independent opacity ref is a fork)",
    );

// The four beats — enter (START) / leave (END) / transitionTo (TRANSITION) / restart (RESTART).
const beats = {
    enter: /function enter\b/.test(leaf),
    leave: /function leave\b/.test(leaf),
    transitionTo: /function transitionTo\b/.test(leaf),
    restart: /function restart\b/.test(leaf),
};
const allBeats = beats.enter && beats.leave && beats.transitionTo && beats.restart;
if (!allBeats)
    violations.push(
        `C1: the four beats are not all present (enter=${beats.enter} leave=${beats.leave} transitionTo=${beats.transitionTo} restart=${beats.restart}) — start/transition/end/restart`,
    );
facts.leaf = {
    defined,
    composesSpringProgress,
    composesSpringTiming,
    exposesRevealT,
    exposesOpacity,
    opacityCoupled,
    beats,
};

// ── C4 — the SCC fence: NO CSSKeyframesAnimation/AnimationGroup (the LIGHT path) ───
// A Sequence orchestrating SpringProgress-driven writers stays LIGHT; a .add(CSSKeyframes
// Animation)/AnimationGroup pulls the HEAVY value.js engine into the viz chunk. The leaf
// must NOT import or compose either.
const importsCssKeyframes = /\bCSSKeyframesAnimation\b/.test(leaf);
const importsAnimationGroup = /\bAnimationGroup\b/.test(leaf);
if (importsCssKeyframes)
    violations.push(
        "C4: useVizChoreography references CSSKeyframesAnimation (the SCC fence — it pulls the HEAVY value.js engine into the viz chunk; the Sequence orchestrates SpringProgress-driven writers ONLY, the LIGHT path)",
    );
if (importsAnimationGroup)
    violations.push(
        "C4: useVizChoreography references AnimationGroup (the SCC fence — the HEAVY value.js engine path is forbidden in the viz chunk)",
    );
facts.sccFence = { importsCssKeyframes, importsAnimationGroup };

// ── C5 — the one-loop discipline: tick(dt)-fed push-API, NO own rAF, NO .play() ───
// The push-step: a `function tick(dtMs…)` declaration the renderer feeds, returned from
// the composable (the shorthand `tick,` OR the explicit `tick: tick`/`tick: (dtMs…)`).
const tickDefined = /function tick\s*\(\s*dtMs\b/.test(leaf);
const tickReturned =
    /^\s*tick\s*,/m.test(leaf) ||
    /\btick\s*:\s*tick\b/.test(leaf) ||
    /\btick\s*:\s*\(\s*dtMs\b/.test(leaf);
const hasTick = tickDefined && tickReturned;
const forksRaf = /\brequestAnimationFrame\s*\(/.test(leaf);
const forksInterval = /\bsetInterval\s*\(/.test(leaf);
// A kf `.play()` spawns the kf RAFPlayback rAF — forbidden (the renderer steps the spring
// via tickDt(dt)). We scan for a `.play(` call on the spring/sequence.
const callsPlay = /\.play\s*\(/.test(leaf);
if (!hasTick)
    violations.push(
        "C5: useVizChoreography exposes no `tick(dtMs)` push-step (the renderer-fed advance is absent — the viz must feed the clock from its createCanvasLifecycle frame callback)",
    );
if (forksRaf)
    violations.push(
        "C5: useVizChoreography forks its OWN requestAnimationFrame loop (the one-loop / proof:offscreen-pause floor — it must be tick()-fed)",
    );
if (forksInterval)
    violations.push("C5: useVizChoreography forks a setInterval loop (no own loop)");
if (callsPlay)
    violations.push(
        "C5: useVizChoreography calls `.play()` on the kf spring/sequence (it spawns the kf RAFPlayback rAF — the one-loop floor breach; the renderer steps it via tickDt(dt))",
    );
facts.oneLoop = { hasTick, forksRaf, forksInterval, callsPlay };

// ── C2 (leaf arm) — NO setTimeout / scheduleAfterFirstPaint reveal in the leaf ────
const leafForksTimeout = /\bsetTimeout\s*\(/.test(leaf);
const leafScheduleAfterPaint = /scheduleAfterFirstPaint/.test(leaf);
if (leafForksTimeout)
    violations.push(
        "C2: useVizChoreography forks a setTimeout (the ad-hoc reveal timer is forbidden — the reveal rides the kf SpringProgress clock)",
    );
if (leafScheduleAfterPaint)
    violations.push(
        "C2: useVizChoreography uses scheduleAfterFirstPaint (the ad-hoc reveal scheduler is forbidden — the reveal rides the kf clock)",
    );

// ── C3 — the reveal reads a SPRING_PRESETS register, never a hand clock ───────────
const importsPreset = /import\s*\{[^}]*\bspringPreset\b[^}]*\}\s*from\s*["']\.\.\/motion\/springPresets["']/.test(leaf);
if (!importsPreset)
    violations.push(
        "C3: useVizChoreography does not import springPreset from the SPRING_PRESETS table (the reveal must read a register, never a hand (response, ζ) — the W-GLASS-CAL fence)",
    );
// A generic --duration-* wall clock read REDs (the per-spring-clock fence).
const readsDurationToken = /var\(\s*--duration-/.test(leaf) || /["']--duration-/.test(leaf);
if (readsDurationToken)
    violations.push(
        "C3: useVizChoreography reads a generic --duration-* wall clock (the W-GLASS-CAL fence — the reveal reads the spring's OWN --spring-<name>-duration settle clock via the SPRING_PRESETS register, never a generic --duration-*)",
    );
// An inline (response, ζ) object literal NOT sourced from springPreset REDs. We detect a
// `{ response: <num>, dampingFraction: <num> }` literal where the numbers are HARD-CODED
// (a digit), not a variable read off the preset row. The leaf builds springs off
// `enterRow.response`/`exitRow.dampingFraction` (the register), so a hardcoded numeric pair
// is a hand-clock smell.
const inlineNumericSpring =
    /\{\s*response:\s*0?\.\d+\s*,\s*dampingFraction:\s*0?\.\d+/.test(leaf);
if (inlineNumericSpring)
    violations.push(
        "C3: useVizChoreography seats a spring from an inline numeric (response, ζ) literal (a hand clock — it must read springPreset(<name>) from the SPRING_PRESETS table)",
    );
facts.springRegister = {
    importsPreset,
    readsDurationToken,
    inlineNumericSpring,
};

// ── C6 — the Oscillator is ABSENT (local-only past v4.3.0, machine-verified) ──────
const importsOscillator = /\bOscillator\b/.test(leaf);
if (importsOscillator)
    violations.push(
        "C6: useVizChoreography references Oscillator (it is LOCAL-ONLY past v4.3.0 — machine-verified absent from the consumed dist; a republish-gated by-name ask, NO peer-spine widen; the interim loop clock is the viz's existing sine/uTime)",
    );
// Machine-verify the dist FACT (the Oscillator is genuinely absent from the consumed dist —
// so the C6 prohibition is grounded, not a stale assumption).
let oscillatorInDist = false;
if (existsSync(resolve(ROOT, FILES.kfDist))) {
    oscillatorInDist = /\bOscillator\b/.test(read(FILES.kfDist));
}
facts.oscillator = { importsOscillator, oscillatorInDist };
// (If a future kf republish ADDS Oscillator to the dist, oscillatorInDist flips true and
// the C6 prohibition relaxes via a wave that adopts it — recorded, not silently green.)

// ── C1b — the per-viz consumer bar (the REAL grep, BORN-RED at the floor) ─────────
// The substrate floor lands the clock; the per-viz waves wire it AFTER. At this close the
// grep is EMPTY (born-RED by design — the SYNTHESIS class-2 cure is the grep CATCHING the
// unmet bar). It goes GREEN when ≥2 per-viz waves drive a canvas opacity + a build-in
// uniform off revealT. The consumer-evidence doc carries the re-audit/retire trigger but
// is NOT a substitute for a call site (the BB usePointerVelocityField gate-blindness, cured).
const vizConsumers = grepVizConsumers();
const liveConsumers = vizConsumers.length;
const evidenceExists = existsSync(resolve(ROOT, FILES.evidence));
let evidenceHasReaudit = false;
if (evidenceExists) {
    const ev = read(FILES.evidence);
    evidenceHasReaudit = /re-audit/i.test(ev) && /retire/i.test(ev);
}
const consumerBarMet = liveConsumers >= 2;
// The consumer bar is RECORDED as a fact (born-RED at the floor); it is a HARD violation
// only on the SUBSTRATE-FLOOR-COMPLETE gate-run, which is post-per-viz-waves. At THIS
// substrate-floor close the leaf + the device-free clauses are the binding green; the
// consumer clause is born-RED-by-design and tracked. To honor the cardinal split (the gate
// must be GREEN at THIS wave's close on the leaf it builds), the consumer clause is
// enforced when the BC.W-VIZ-CHOREOGRAPHY env signals the per-viz waves have landed
// (GLASS_UI_VIZ_CHOREO_CONSUMERS=enforce); the default is the substrate-floor record (the
// per-viz waves flip it — the proof:viz-interaction precedent). Mid-build RED is by-design.
const enforceConsumers = process.env.GLASS_UI_VIZ_CHOREO_CONSUMERS === "enforce";
if (enforceConsumers && !consumerBarMet)
    violations.push(
        `C1b: the ≥2-consumer bar is UNMET — ${liveConsumers} live useVizChoreography() call site(s) in src/components/custom/ (${vizConsumers.map((f) => f.replace(/^.*custom\//, "")).join(", ") || "NONE"}). The per-viz waves wire the clock after this floor (the doc-prose path is NOT a substitute for a call site — the SYNTHESIS class-2 cure)`,
    );
if (evidenceExists && !evidenceHasReaudit)
    violations.push(
        "C1b: the consumer-evidence doc lacks the no-overfitting re-audit/retire clause (the doc no longer greens the bar, but it must carry the wire-or-retire trigger)",
    );
if (!evidenceExists)
    violations.push(
        `C1b: the consumer-evidence doc ${FILES.evidence} is absent (the substrate floor must record the booked ≥2-consumer bar + the re-audit/retire trigger)`,
    );
facts.consumerBar = {
    liveConsumers,
    vizConsumers: vizConsumers.map((f) => f.replace(/^.*custom\//, "")),
    evidenceExists,
    evidenceHasReaudit,
    met: consumerBarMet,
    enforced: enforceConsumers,
};

// ── C2 (consumer arm) — NO ad-hoc reveal timer in a wired viz consumer ────────────
// For every viz that WIRES the choreography (the C1b grep hits), assert it does NOT keep a
// scheduleAfterFirstPaint/setTimeout reveal path beside the kf clock (the no-dual-path
// fence — the ad-hoc reveal is REMOVED, not dual-pathed). Born-RED on useAurora.ts:81-114
// once aurora wires the clock (the per-viz wave removes the scheduleAfterFirstPaint there).
const consumerAdHocReveal = [];
for (const consumer of vizConsumers) {
    const src = stripComments(readFileSync(consumer, "utf8"));
    if (/scheduleAfterFirstPaint/.test(src) || /\bsetTimeout\s*\([^)]*(?:reveal|arm|fade)/i.test(src)) {
        consumerAdHocReveal.push(consumer.replace(/^.*custom\//, ""));
    }
}
if (consumerAdHocReveal.length)
    violations.push(
        `C2: a wired viz consumer keeps an ad-hoc reveal timer beside the kf clock (${consumerAdHocReveal.join(", ")}) — the scheduleAfterFirstPaint/setTimeout reveal is REMOVED, not dual-pathed (NO backwards compat)`,
    );
facts.consumerNoAdHoc = { consumerAdHocReveal };

// ── Self-test bites (anti-evasion — each MUST flag, proven every run) ──────────────
const bites = [];
{
    // Bite 1 (C2): a synthetic setTimeout reveal MUST flag.
    const fake = `function reveal(){ setTimeout(arm, 0) }`;
    const flagged = /\bsetTimeout\s*\(/.test(stripComments(fake));
    bites.push({ id: "C2-settimeout-reveal", flagged });
    if (!flagged) violations.push("SELF-TEST C2 bite did not flag a synthetic setTimeout reveal");
}
{
    // Bite 2 (C4): a synthetic `.add(CSSKeyframesAnimation)` MUST flag.
    const fake = `seq.add(new CSSKeyframesAnimation(...))`;
    const flagged = /\bCSSKeyframesAnimation\b/.test(stripComments(fake));
    bites.push({ id: "C4-css-keyframes", flagged });
    if (!flagged) violations.push("SELF-TEST C4 bite did not flag a synthetic CSSKeyframesAnimation");
}
{
    // Bite 3 (C3): a synthetic --duration-* clock read MUST flag.
    const fake = `el.style.transition = "var(--duration-normal)"`;
    const flagged = /var\(\s*--duration-/.test(stripComments(fake));
    bites.push({ id: "C3-duration-clock", flagged });
    if (!flagged) violations.push("SELF-TEST C3 bite did not flag a synthetic --duration-* clock read");
}
{
    // Bite 4 (C5): a synthetic `.play()` (the kf rAF spawn) MUST flag.
    const fake = `spring.play(onFrame)`;
    const flagged = /\.play\s*\(/.test(stripComments(fake));
    bites.push({ id: "C5-play-raf", flagged });
    if (!flagged) violations.push("SELF-TEST C5 bite did not flag a synthetic .play() rAF spawn");
}
{
    // Bite 5 (C6): a synthetic Oscillator import MUST flag.
    const fake = `import { Oscillator } from "@mkbabb/keyframes.js"`;
    const flagged = /\bOscillator\b/.test(stripComments(fake));
    bites.push({ id: "C6-oscillator", flagged });
    if (!flagged) violations.push("SELF-TEST C6 bite did not flag a synthetic Oscillator import");
}
{
    // Bite 6 (C3): an inline numeric (response, ζ) spring literal MUST flag.
    const fake = `new SpringProgress({ response: 0.42, dampingFraction: 0.78 })`;
    const flagged = /\{\s*response:\s*0?\.\d+\s*,\s*dampingFraction:\s*0?\.\d+/.test(stripComments(fake));
    bites.push({ id: "C3-inline-spring", flagged });
    if (!flagged) violations.push("SELF-TEST C3 bite did not flag a synthetic inline numeric spring literal");
}
facts.selfTestBites = bites;

finish();

function finish() {
    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_VIZ_CHOREOGRAPHY_ARTIFACT",
        "viz-choreography",
    );
    writeGateArtifact(ARTIFACT, {
        gate: "proof:viz-choreography",
        status,
        generatedAt: snapshotStamp(),
        facts,
        violations,
    });

    console.log(
        "proof:viz-choreography — the viz start/transition/end/restart clock (BC.W-VIZ-CHOREOGRAPHY)",
    );
    console.log(`  leaf: ${FILES.leaf}`);
    if (facts.leaf)
        console.log(
            `  C1 leaf: defined=${facts.leaf.defined} SpringProgress=${facts.leaf.composesSpringProgress} springTiming=${facts.leaf.composesSpringTiming} revealT=${facts.leaf.exposesRevealT} opacity=${facts.leaf.exposesOpacity} coupled=${facts.leaf.opacityCoupled} beats=[enter=${facts.leaf.beats.enter},leave=${facts.leaf.beats.leave},transition=${facts.leaf.beats.transitionTo},restart=${facts.leaf.beats.restart}]`,
        );
    if (facts.sccFence)
        console.log(
            `  C4 SCC fence (LIGHT path): cssKeyframes=${facts.sccFence.importsCssKeyframes} animationGroup=${facts.sccFence.importsAnimationGroup}`,
        );
    if (facts.oneLoop)
        console.log(
            `  C5 one-loop (tick-fed, no own rAF): hasTick=${facts.oneLoop.hasTick} forksRaf=${facts.oneLoop.forksRaf} forksInterval=${facts.oneLoop.forksInterval} callsPlay=${facts.oneLoop.callsPlay}`,
        );
    if (facts.springRegister)
        console.log(
            `  C3 spring register: importsPreset=${facts.springRegister.importsPreset} durationToken=${facts.springRegister.readsDurationToken} inlineSpring=${facts.springRegister.inlineNumericSpring}`,
        );
    if (facts.oscillator)
        console.log(
            `  C6 Oscillator absent: importsOscillator=${facts.oscillator.importsOscillator} inDist=${facts.oscillator.oscillatorInDist}`,
        );
    if (facts.consumerBar)
        console.log(
            `  C1b consumer bar (REAL per-viz grep): liveConsumers=${facts.consumerBar.liveConsumers} [${facts.consumerBar.vizConsumers.join(", ") || "NONE"}] evidence=${facts.consumerBar.evidenceExists} enforced=${facts.consumerBar.enforced} met=${facts.consumerBar.met}`,
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

// The REAL per-viz grep (the BB usePointerVelocityField gate-blindness cure). A live binary
// consumer is a `useVizChoreography(` invocation under src/components/custom/ (the
// procedural-viz dirs) — NOT a doc mention, NOT the leaf/barrels/tests. Returns the list of
// consuming file paths so the gate names them (the J-inv-10 ≥2-consumer bar met in FACT).
function grepVizConsumers() {
    try {
        const out = execSync(
            `grep -rl 'useVizChoreography(' ${resolve(ROOT, "src/components/custom")} 2>/dev/null || true`,
            { encoding: "utf8" },
        );
        return out
            .split("\n")
            .map((f) => f.trim())
            .filter(Boolean)
            .filter((f) => !f.endsWith("useVizChoreography.ts"))
            .filter((f) => !/\.(test|spec)\.ts$/.test(f));
    } catch {
        return [];
    }
}
