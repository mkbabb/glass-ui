#!/usr/bin/env node
// proof:dock-engine-unify — BG.W-DOCK-ENGINE-UNIFY — the ONE dock spring factory +
// the busy-signal single-source discipline (born-RED → GREEN).
//
// THE DEFECT (born-RED at HEAD before this wave): the dock band ran FIVE hand-rolled
// `new SpringProgress` copies of the identical iOS interruptible-physics dance
// (create-carrying-prior-velocity → play the glide writing the scalar → self-dispose
// on settle → PRM-jump) — the collapse↔expand orchestrator (dockMorphContext), the
// V↔H orientation morph, the item-drag fling, the layer-transition standalone, and
// the fission detach. Each re-typed the create/re-base/dispose logic + the
// `respectReducedMotion: true` arm; a drift in one silently desynced the dock clock.
//
// THE FIX (this wave): the create/re-base/dispose dance is factored into the ONE
// `useDockSpring` factory (`composables/useDockSpring.ts`) — the band's SOLE
// `new SpringProgress` site. `dockMorphContext` is the FIRST consumer: it drives a
// `DockSpring` handle (arming `[data-morphing]` + writing `--dock-morph-t`), never
// instantiating a spring itself. The sibling morph surfaces re-point onto the factory
// in their own waves (the dir-wide drain to exactly-one is a reported PROGRESS fact,
// not a hard bar here — this wave lands the factory + the first consumer).
//
// WHAT IT MEASURES — three device-free SOURCE clauses + a dir-wide census fact:
//
//   U1 — the factory is the ONE owner. `composables/useDockSpring.ts` EXISTS, exports
//        `useDockSpring`, imports `SpringProgress` from `@mkbabb/keyframes.js`, carries
//        EXACTLY ONE `new SpringProgress(` armed with `respectReducedMotion: true`, and
//        does NOT import `AnimationGroup`/`./engine` (the LIGHT-surface fence — the
//        spring owns its own rAF, no static value.js edge). Born-RED on HEAD (the file
//        is absent). Self-test bite: a synthetic factory with a bare
//        `new SpringProgress({ response })` (no `respectReducedMotion`) reds.
//
//   U2 — dockMorphContext CONSUMES the factory, no raw spring. `composables/
//        dockMorphContext.ts` contains ZERO `new SpringProgress(`, imports + calls
//        `useDockSpring(`, passes the byte-fenced `DOCK_SPRING.response`/
//        `.dampingFraction` config through, and STILL writes `--dock-morph-t` + arms
//        `[data-morphing]` (the scalar + the single busy signal are preserved).
//        Self-test bite: a synthetic orchestrator with an inline `new SpringProgress(`
//        reds (the dual-path re-introduction).
//
//   U3 — the busy signal is `[data-morphing]`-single. dockMorphContext expresses
//        morph-busy through the `data-morphing` DOM attribute ONLY (setAttribute +
//        hasAttribute + removeAttribute) and carries NO separate boolean `morphing`/
//        `isMorphing` `ref(` shadow of the morph-busy state — the spring-liveness is
//        the factory's `.live`, not a parallel flag. Self-test bite: a synthetic
//        orchestrator declaring `const morphing = ref(false)` reds.
//
//   PROGRESS (reported fact, NOT a hard bar) — the dir-wide `new SpringProgress(` count
//        across `src/components/custom/dock/`. This wave lands the factory + the first
//        consumer; the sibling surfaces (useDockOrientationMorph / useDockItemDrag /
//        useLayerTransition / useDockFission) drain onto the factory in their own waves.
//        The census is printed so the drain-to-exactly-one is auditable, but a >1 count
//        does NOT red this wave's gate.
//
// Run: node scripts/proof-dock-engine-unify.mjs

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:dock-engine-unify";

const DOCK_COMPOSABLES = "src/components/custom/dock/composables";
const FACTORY_REL = `${DOCK_COMPOSABLES}/useDockSpring.ts`;
const ORCHESTRATOR_REL = `${DOCK_COMPOSABLES}/dockMorphContext.ts`;

// Strip TS/JS comments (both // and /* */) so a prose mention of a retired construct is
// never a false hit. Preserve newlines for line-count stability.
const stripComments = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/(^|[^:])\/\/[^\n]*/g, (m, p1) => p1 + " ".repeat(Math.max(0, m.length - p1.length)));

const readRel = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

const countMatches = (src, re) => (src.match(re) || []).length;

const NEW_SPRING_RE = /\bnew\s+SpringProgress\s*\(/g;
// A `new SpringProgress({ … respectReducedMotion: true … })` block (the PRM-armed form).
const PRM_ARMED_SPRING_RE = /new\s+SpringProgress\(\s*\{[\s\S]*?respectReducedMotion:\s*true/;

// ── U1 — the factory is the ONE owner ──────────────────────────────────────────
export function detectU1(factorySrcRaw) {
    const violations = [];
    const facts = {};
    facts.exists = factorySrcRaw.length > 0;
    if (!facts.exists) {
        violations.push(
            `U1: ${FACTORY_REL} does not exist — the ONE dock spring factory is absent (the band's raw \`new SpringProgress\` copies are un-factored)`,
        );
        return { violations, facts };
    }
    const src = stripComments(factorySrcRaw);
    facts.exportsFactory = /export\s+function\s+useDockSpring\s*\(/.test(src);
    facts.importsSpringProgress =
        /import\s*\{[^}]*\bSpringProgress\b[^}]*\}\s*from\s*["']@mkbabb\/keyframes\.js["']/.test(src);
    facts.newSpringCount = countMatches(src, NEW_SPRING_RE);
    facts.armsRespectPrm = PRM_ARMED_SPRING_RE.test(src);
    // The LIGHT-surface fence — the factory carries no static value.js edge.
    facts.noHeavyEngineImport =
        !/from\s*["'][^"']*\/engine["']/.test(src) && !/\bAnimationGroup\b/.test(src);

    if (!facts.exportsFactory)
        violations.push(`U1: ${FACTORY_REL} does not export \`function useDockSpring(\` — the factory surface is missing`);
    if (!facts.importsSpringProgress)
        violations.push(`U1: ${FACTORY_REL} does not import \`SpringProgress\` from \`@mkbabb/keyframes.js\` — the one spring substrate`);
    if (facts.newSpringCount !== 1)
        violations.push(`U1: ${FACTORY_REL} has ${facts.newSpringCount} \`new SpringProgress(\` sites — the factory must own EXACTLY ONE (the sole create site)`);
    if (!facts.armsRespectPrm)
        violations.push(`U1: the factory's \`new SpringProgress\` is not armed with \`respectReducedMotion: true\` — under PRM the scalar must jump 0→target in one frame (no in-between motion frames)`);
    if (!facts.noHeavyEngineImport)
        violations.push(`U1: ${FACTORY_REL} imports \`AnimationGroup\`/\`./engine\` — the LIGHT-surface fence forbids a static value.js edge on the dock spring leaf`);
    return { violations, facts };
}

// ── U2 — dockMorphContext CONSUMES the factory, no raw spring ───────────────────
export function detectU2(orchestratorSrcRaw) {
    const violations = [];
    const facts = {};
    const src = stripComments(orchestratorSrcRaw);
    facts.rawSpringCount = countMatches(src, NEW_SPRING_RE);
    facts.importsFactory = /import\s*\{[^}]*\buseDockSpring\b[^}]*\}\s*from\s*["']\.\/useDockSpring["']/.test(src);
    facts.callsFactory = /\buseDockSpring\s*\(/.test(src);
    facts.passesDockSpringConfig =
        /DOCK_SPRING\.response/.test(src) && /DOCK_SPRING\.dampingFraction/.test(src);
    facts.writesScalar = /setProperty\(\s*["']--dock-morph-t["']/.test(src);
    facts.armsMorphing = /setAttribute\(\s*["']data-morphing["']/.test(src);

    if (facts.rawSpringCount !== 0)
        violations.push(`U2: ${ORCHESTRATOR_REL} still contains ${facts.rawSpringCount} raw \`new SpringProgress(\` — the orchestrator must DRIVE the factory handle, never instantiate a spring (the dual-path the unify forbids)`);
    if (!facts.importsFactory)
        violations.push(`U2: ${ORCHESTRATOR_REL} does not import \`useDockSpring\` from \`./useDockSpring\` — it must compose the factory`);
    if (!facts.callsFactory)
        violations.push(`U2: ${ORCHESTRATOR_REL} does not call \`useDockSpring(\` — the factory handle is not driven`);
    if (!facts.passesDockSpringConfig)
        violations.push(`U2: ${ORCHESTRATOR_REL} does not pass \`DOCK_SPRING.response\`/\`DOCK_SPRING.dampingFraction\` to the factory — the byte-fenced dock clock config must flow through`);
    if (!facts.writesScalar)
        violations.push(`U2: ${ORCHESTRATOR_REL} no longer writes \`--dock-morph-t\` — the scalar the size cascade reads regressed`);
    if (!facts.armsMorphing)
        violations.push(`U2: ${ORCHESTRATOR_REL} no longer arms \`data-morphing\` — the single busy signal regressed`);
    return { violations, facts };
}

// ── U3 — the busy signal is `[data-morphing]`-single ────────────────────────────
export function detectU3(orchestratorSrcRaw) {
    const violations = [];
    const facts = {};
    const src = stripComments(orchestratorSrcRaw);
    // The DOM-attr busy signal is the SINGLE source: set + read + clear.
    facts.setsMorphingAttr = /setAttribute\(\s*["']data-morphing["']/.test(src);
    facts.readsMorphingAttr = /hasAttribute\(\s*["']data-morphing["']/.test(src);
    facts.clearsMorphingAttr = /removeAttribute\(\s*["']data-morphing["']/.test(src);
    // NO parallel boolean `morphing`/`isMorphing`/`morphActive` `ref(` shadow of the
    // morph-busy state (the spring-liveness is the factory's `.live`, not a flag).
    facts.boolBusyShadow =
        /\b(?:const|let)\s+(?:morphing|isMorphing|morphActive|busy|isMorphBusy)\s*=\s*ref\s*\(/.test(src);

    if (!(facts.setsMorphingAttr && facts.readsMorphingAttr && facts.clearsMorphingAttr))
        violations.push(`U3: ${ORCHESTRATOR_REL} does not express morph-busy through the \`data-morphing\` attribute end-to-end (set/read/clear) — the single busy signal is incomplete`);
    if (facts.boolBusyShadow)
        violations.push(`U3: ${ORCHESTRATOR_REL} carries a boolean \`morphing = ref(…)\` busy shadow beside \`[data-morphing]\` — the 4-signals→1 discipline forbids a parallel flag (spring-liveness is the factory's \`.live\`)`);
    return { violations, facts };
}

// ── PROGRESS census (fact-only) — dir-wide `new SpringProgress(` count ───────────
export function censusDirSprings() {
    const dirAbs = resolve(ROOT, DOCK_COMPOSABLES);
    const perFile = {};
    let total = 0;
    if (existsSync(dirAbs)) {
        for (const name of readdirSync(dirAbs)) {
            if (!name.endsWith(".ts")) continue;
            const src = stripComments(readRel(`${DOCK_COMPOSABLES}/${name}`));
            const n = countMatches(src, NEW_SPRING_RE);
            if (n > 0) perFile[name] = n;
            total += n;
        }
    }
    return { total, perFile };
}

// ── self-test bites — the detectors MUST bite their planted fixtures ────────────
function selfTest() {
    const failures = [];

    // U1 bite — a factory whose spring is NOT PRM-armed reds `armsRespectPrm`.
    const U1_BARE = `import { SpringProgress } from "@mkbabb/keyframes.js";
export function useDockSpring(config) {
  const s = new SpringProgress({ response: config.response });
  return { dispose() { s.dispose(); } };
}`;
    if (detectU1(U1_BARE).violations.length === 0)
        failures.push("U1 self-test BROKE — a factory with a non-PRM-armed spring did not red");
    // U1 bite — TWO springs in the factory reds the exactly-one owner.
    const U1_TWO = `import { SpringProgress } from "@mkbabb/keyframes.js";
export function useDockSpring(config) {
  const a = new SpringProgress({ response: 0.6, respectReducedMotion: true });
  const b = new SpringProgress({ response: 0.6, respectReducedMotion: true });
  return { a, b };
}`;
    if (!detectU1(U1_TWO).violations.some((v) => /EXACTLY ONE/.test(v)))
        failures.push("U1 self-test BROKE — a two-spring factory did not red the exactly-one owner");
    // U1 positive — a correct single PRM-armed factory passes.
    const U1_OK = `import { SpringProgress } from "@mkbabb/keyframes.js";
export function useDockSpring(config) {
  const s = new SpringProgress({ response: config.response, dampingFraction: config.dampingFraction, respectReducedMotion: true });
  return { dispose() { s.dispose(); } };
}`;
    if (detectU1(U1_OK).violations.length !== 0)
        failures.push("U1 self-test BROKE — a correct single PRM-armed factory red falsely");

    // U2 bite — an orchestrator with an inline `new SpringProgress(` reds the dual-path.
    const U2_RAW = `import { useDockSpring } from "./useDockSpring";
import { DOCK_SPRING } from "../constants";
function orch() {
  const s = new SpringProgress({ response: DOCK_SPRING.response, dampingFraction: DOCK_SPRING.dampingFraction, respectReducedMotion: true });
  s.play(() => { root.style.setProperty("--dock-morph-t", "1"); root.setAttribute("data-morphing", ""); });
}`;
    if (!detectU2(U2_RAW).violations.some((v) => /dual-path/.test(v)))
        failures.push("U2 self-test BROKE — an orchestrator with a raw `new SpringProgress(` did not red the dual-path");

    // U3 bite — a boolean `morphing = ref(false)` busy shadow reds.
    const U3_SHADOW = `const morphing = ref(false);
root.setAttribute("data-morphing", "");
root.hasAttribute("data-morphing");
root.removeAttribute("data-morphing");`;
    if (!detectU3(U3_SHADOW).violations.some((v) => /busy shadow/.test(v)))
        failures.push("U3 self-test BROKE — a boolean `morphing = ref()` busy shadow did not red");
    // U3 positive — attr-only busy signal passes.
    const U3_OK = `root.setAttribute("data-morphing", "");
root.hasAttribute("data-morphing");
root.removeAttribute("data-morphing");`;
    if (detectU3(U3_OK).violations.length !== 0)
        failures.push("U3 self-test BROKE — an attr-only busy signal red falsely");

    return failures;
}

// ── compose ─────────────────────────────────────────────────────────────────────
export function detect() {
    const factorySrc = readRel(FACTORY_REL);
    const orchestratorSrc = readRel(ORCHESTRATOR_REL);
    const u1 = detectU1(factorySrc);
    const u2 = detectU2(orchestratorSrc);
    const u3 = detectU3(orchestratorSrc);
    const census = censusDirSprings();
    const selfTestFailures = selfTest();
    const violations = [
        ...u1.violations,
        ...u2.violations,
        ...u3.violations,
        ...selfTestFailures.map((f) => `SELF-TEST: ${f}`),
    ];
    return {
        violations,
        facts: { u1: u1.facts, u2: u2.facts, u3: u3.facts, census, selfTestFailures },
    };
}

function run() {
    const { violations, facts } = detect();
    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath("GLASS_UI_DOCK_ENGINE_UNIFY_ARTIFACT", "BG-dock-engine-unify");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:dock-engine-unify",
        command: COMMAND,
        note: "BG.W-DOCK-ENGINE-UNIFY device-free SOURCE arm (U1 the ONE useDockSpring factory owns the sole new SpringProgress · U2 dockMorphContext consumes the factory, no raw spring · U3 the busy signal is [data-morphing]-single, no boolean ref shadow). The dir-wide raw-spring census is a PROGRESS fact (the sibling morph surfaces drain onto the factory in their own waves). The binding PAINT is proof:dock-engine's live --dock-morph-t envelope + the proof:ba-gestalt dock verdict (this gate proves the ENGINE consolidation, not the paint).",
        facts,
        violations,
    });
    console.log(`proof:dock-engine-unify — ${status.toUpperCase()}`);
    console.log(`  U1 factory: exists=${facts.u1.exists} exportsFactory=${facts.u1.exportsFactory ?? false} newSpring=${facts.u1.newSpringCount ?? 0} prmArmed=${facts.u1.armsRespectPrm ?? false} lightSurface=${facts.u1.noHeavyEngineImport ?? false}`);
    console.log(`  U2 consume: rawSpring=${facts.u2.rawSpringCount} importsFactory=${facts.u2.importsFactory} callsFactory=${facts.u2.callsFactory} passesConfig=${facts.u2.passesDockSpringConfig} scalar=${facts.u2.writesScalar} morphing=${facts.u2.armsMorphing}`);
    console.log(`  U3 busy-single: attr(set/read/clear)=${facts.u3.setsMorphingAttr}/${facts.u3.readsMorphingAttr}/${facts.u3.clearsMorphingAttr} boolShadow=${facts.u3.boolBusyShadow}`);
    console.log(`  census dir new SpringProgress: total=${facts.census.total} ${JSON.stringify(facts.census.perFile)} (drain-to-1 completes as sibling waves adopt)`);
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
