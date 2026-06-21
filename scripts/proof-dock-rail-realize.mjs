#!/usr/bin/env node
// proof:dock-rail-realize — BE.W-DOCK-RAIL-REALIZE — the RAIL-AS-HAIRLINE (user defect #4).
//
// THE DEFECT. The BE prototype minted a STANDALONE vertical glass CAPSULE (`.liquid-rail-dock`,
// 4.5×15.5rem, its own backdrop-filter + overflow:hidden) the carousel scrolled INSIDE — a
// SECOND dock (the exact inversion of the spec) + a THIRD parallel rail engine
// (`useLiquidRail`, a re-forked spring loop). The rail is NOT a vertical dock — it is a
// HAIRLINE strip of accent-tinted facet chips that fans in a real dock's gutter,
// box-INVIOLATE.
//
// THE BUILD. DELETE the capsule fork wholesale (`useLiquidRail.ts` + `liquid-rail.css`,
// no legacy). Add a `mode: "stack" | "facets"` axis to the SHIPPED `<DockStack>` (default
// "stack" = the BC byte-identical glyph fan). The "facets" mode renders the members as a
// CONTEXT CAROUSEL — a flex strip of facet chips fanning in the SAME `.glass-dock-frame`
// non-clipping gutter (box-INVIOLATE, deltaW=deltaH=0), each chip writing its OWN
// `--glass-accent` hue (the per-instance chromatic-rim axis), the active facet on the
// selected-as-glass `--dock-control-active-bg` tier, the click writing the consumer-owned
// v-model (no internal selection shadow). The φ-tier/ring projection math is harvested
// into a PURE helper (`railProjection.ts`) — the spring loop is NOT re-forked (DockStack
// speaks the ONE `--spring-dock` clock).
//
// THIS GATE EXTENDS proof:dock-stack-rail — its S1-S6 stay GREEN by construction (imported
// + re-asserted), and R1-R5 add the facet-mode + the fork-DELETE + the doc-reconcile.
// Born-RED on HEAD (no facet mode, no per-facet accent, the fork still live, the stale
// CLAUDE.md DockRail prose) → GREEN at the build:
//
//   R1 — the facet-carousel mode exists ONCE on <DockStack>. DockStack.vue carries a
//        `mode?: "stack" | "facets"` axis (default "stack" byte-identical); "facets"
//        renders a context-carousel of accent-chips. NO second component (DockRail.vue /
//        DockFacetRail.vue ABSENT — any new rail SFC reds; the S1 retire EXTENDED).
//   R2 — the per-facet --glass-accent FLOOR. Each facet chip writes its own
//        `--glass-accent`/`--glass-accent-strength` (the per-instance chromatic-rim axis)
//        — a per-facet accent hue, NOT a flat shared fill. A facet mode with no
//        --glass-accent write reds.
//   R3 — the fork is DEFINITION-ABSENT, box-INVIOLATE preserved. useLiquidRail.ts +
//        liquid-rail.css + the `.liquid-rail-dock` capsule are GONE (no alias); the
//        demo.css @import is GONE; the facet strip rides the kept `.glass-dock-frame`
//        non-clipping escape (no contain/backdrop/overflow on the frame — the box never
//        grows). The facet fan rides the ONE --spring-dock clock (no second spring).
//   R4 — ONE registry, no shadow. The facet click writes the consumer-owned v-model
//        (defineModel('selected')); DockStack owns NO internal ref()/reactive() selection
//        shadow.
//   R5 — the CLAUDE.md doc-reconcile. The stale DockRail prose (proof:rail3 /
//        tests-visual/rail3.spec.ts / --dock-rail-seam-offset / proof:rail-extend / the
//        GlassDock.vue `writes --dock-rail-seam-offset` comment) is GONE from CLAUDE.md;
//        the live proof:dock-rail-realize + the facet mode is documented. A surviving
//        `Machine-locked by proof:rail3` / `--dock-rail-seam-offset` reference reds.
//
//   Self-test bites: (i) a surviving DockRail export OR a new rail SFC reds R1; (ii) a
//   facet mode with no per-facet --glass-accent reds R2; (iii) a surviving useLiquidRail
//   import / a re-clipped frame reds R3; (iv) an internal facet-selection shadow reds R4;
//   (v) a CLAUDE.md `Machine-locked by proof:rail3` survivor reds R5.
//
// Run: node scripts/proof-dock-rail-realize.mjs

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import {
    detectS1,
    detectS2,
    detectS3,
    detectS4,
    detectS5,
    detectS6,
} from "./proof-dock-stack-rail.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:dock-rail-realize";

const DOCK_DIR = "src/components/custom/dock";
const DOCK_STACK = `${DOCK_DIR}/DockStack.vue`;
const CONSTANTS = `${DOCK_DIR}/constants.ts`;
const RAIL_PROJECTION = `${DOCK_DIR}/composables/railProjection.ts`;
const USE_LIQUID_RAIL = `${DOCK_DIR}/composables/useLiquidRail.ts`;
const STACK_CSS = "src/styles/dock/stack-rail.css";
const LIQUID_RAIL_CSS = "src/styles/dock/liquid-rail.css";
const DEMO_CSS = "demo/demo.css";
const PLAYGROUND = "demo/stories/dock/liquid-playground.vue";
const CLAUDE_MD = "CLAUDE.md";

const PRE_FIX_COMMIT = "9b301f4a"; // the WF-2-integration tree (the capsule fork live)

const stripVue = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/^\s*\/\/.*$/gm, (m) => m.replace(/[^\n]/g, " "))
        .replace(/^\s*\*.*$/gm, (m) => m.replace(/[^\n]/g, " "));
const stripCss = (s) => s.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
const readRel = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// ── R1 — the facet-carousel mode exists ONCE on <DockStack>, no second component ──
function detectR1() {
    const violations = [];
    const facts = {};
    const stack = stripVue(readRel(DOCK_STACK));

    // The `mode?: "stack" | "facets"` axis exists on DockStack.
    facts.hasModeAxis =
        /mode\?:\s*["']stack["']\s*\|\s*["']facets["']/.test(stack) ||
        /mode\?:\s*["']facets["']\s*\|\s*["']stack["']/.test(stack);
    facts.modeDefaultStack = /mode:\s*["']stack["']/.test(stack);
    // The facet render path exists (the `mode==="facets"` branch + a facet-chip class).
    facts.rendersFacets =
        /mode\s*===?\s*["']facets["']/.test(stack) && /dock-facet-chip/.test(stack);
    if (!facts.hasModeAxis)
        violations.push(`R1: ${DOCK_STACK} has no \`mode?: "stack" | "facets"\` axis — the facet-carousel render mode is missing`);
    if (!facts.modeDefaultStack)
        violations.push(`R1: the \`mode\` default is not \`"stack"\` — the BC byte-identical path must be the default (the facet mode is additive)`);
    if (!facts.rendersFacets)
        violations.push(`R1: ${DOCK_STACK} does not render a facet-carousel branch (a \`mode==="facets"\` path emitting \`dock-facet-chip\`)`);

    // NO second rail component (DockRail.vue / DockFacetRail.vue absent — the S1 retire
    // EXTENDED to any new rail SFC).
    const newRailSfcs = ["DockRail.vue", "DockFacetRail.vue", "LiquidRail.vue", "FacetRail.vue"];
    facts.newRailSfcs = newRailSfcs.filter((f) => existsSync(resolve(ROOT, `${DOCK_DIR}/${f}`)));
    if (facts.newRailSfcs.length)
        violations.push(`R1: a second rail SFC exists (${facts.newRailSfcs.join(", ")}) — the facet carousel is a RENDER MODE on DockStack, NOT a second component`);

    return { violations, facts };
}

// ── R2 — the per-facet --glass-accent FLOOR ──
function detectR2() {
    const violations = [];
    const facts = {};
    const stack = stripVue(readRel(DOCK_STACK));
    const css = stripCss(readRel(STACK_CSS));

    // DockStack writes a per-facet `--glass-accent` (off the item's `accent` hue).
    facts.writesPerFacetAccent =
        /["']--glass-accent["']\s*:/.test(stack) && /\baccent\b/.test(stack);
    if (!facts.writesPerFacetAccent)
        violations.push(`R2: ${DOCK_STACK} does not write a per-facet \`--glass-accent\` (off each item's accent hue) — the facet mode must carry a per-facet accent, NOT a flat shared fill`);

    // The DockStackItem descriptor carries the optional `accent` hue.
    const constants = stripVue(readRel(CONSTANTS));
    facts.itemHasAccent = /interface\s+DockStackItem\b[\s\S]*?\baccent\?:\s*string/.test(constants);
    if (!facts.itemHasAccent)
        violations.push(`R2: \`interface DockStackItem\` carries no \`accent?: string\` field — the per-facet hue has no descriptor seam`);

    // The facet-chip CSS reads --glass-accent / --glass-accent-strength (the per-instance
    // chromatic-rim axis — the rim/glint composes the accent, NOT a fork).
    facts.cssReadsAccent =
        /\.dock-facet-chip\b/.test(css) &&
        /--glass-accent\b/.test(css) &&
        /--glass-accent-strength\b/.test(css);
    if (!facts.cssReadsAccent)
        violations.push(`R2: ${STACK_CSS} \`.dock-facet-chip\` does not compose \`--glass-accent\`/\`--glass-accent-strength\` — the facet rim must read the per-instance chromatic-rim axis`);

    return { violations, facts };
}

// ── R3 — the fork is DEFINITION-ABSENT, box-INVIOLATE preserved ──
function detectR3() {
    const violations = [];
    const facts = {};

    // The capsule fork + the re-forked spring are GONE (no alias).
    facts.useLiquidRailAbsent = !existsSync(resolve(ROOT, USE_LIQUID_RAIL));
    facts.liquidRailCssAbsent = !existsSync(resolve(ROOT, LIQUID_RAIL_CSS));
    if (!facts.useLiquidRailAbsent)
        violations.push(`R3: ${USE_LIQUID_RAIL} still exists — the re-forked rail spring engine must be DELETED wholesale (no legacy)`);
    if (!facts.liquidRailCssAbsent)
        violations.push(`R3: ${LIQUID_RAIL_CSS} still exists — the standalone \`.liquid-rail-dock\` capsule CSS must be DELETED wholesale (no legacy)`);

    // No `.liquid-rail-dock` / `.liquid-rail` capsule class survives anywhere in src/styles.
    const stackCss = stripCss(readRel(STACK_CSS));
    facts.noCapsuleClass = !/\.liquid-rail(-dock)?\b/.test(stackCss);
    if (!facts.noCapsuleClass)
        violations.push(`R3: a \`.liquid-rail\`/\`.liquid-rail-dock\` capsule class survives in ${STACK_CSS} — the standalone capsule register must be gone`);

    // The demo.css @import of liquid-rail.css is GONE; the playground no longer imports
    // useLiquidRail.
    const demoCss = readRel(DEMO_CSS);
    facts.demoCssImportsLiquidRail = /@import\s+["'][^"']*liquid-rail\.css["']/.test(demoCss);
    if (facts.demoCssImportsLiquidRail)
        violations.push(`R3: ${DEMO_CSS} still @imports liquid-rail.css — the retired capsule partial is still wired`);
    const playground = stripVue(readRel(PLAYGROUND));
    facts.playgroundImportsUseLiquidRail = /useLiquidRail/.test(playground);
    if (facts.playgroundImportsUseLiquidRail)
        violations.push(`R3: ${PLAYGROUND} still references \`useLiquidRail\` — the deleted fork is still imported`);

    // box-INVIOLATE: the facet strip rides the kept `.glass-dock-frame` escape (no
    // contain/backdrop/overflow on the frame — the same chassis the stack mode rides), and
    // the fan rides the ONE --spring-dock clock (no second spring; the projection helper is
    // a PURE function — no SpringProgress in it).
    const stackCssRaw = stripCss(readRel(STACK_CSS));
    const frameRules = [...stackCssRaw.matchAll(/\.glass-dock-frame[^{]*\{([^}]*)\}/g)].map((m) => m[1]);
    const frameBody = frameRules.join("\n");
    facts.frameNoClip =
        !/contain\s*:/.test(frameBody) &&
        !/backdrop-filter\s*:/.test(frameBody) &&
        !/overflow[^:]*:/.test(frameBody);
    if (!facts.frameNoClip)
        violations.push(`R3: the \`.glass-dock-frame\` escape re-introduces clipping (contain/backdrop/overflow) — the box-INVIOLATE chassis must NOT re-clip the rail (the dock box would grow/clip)`);
    facts.fanRidesSpringDock = /--spring-dock/.test(stackCssRaw);
    if (!facts.fanRidesSpringDock)
        violations.push(`R3: the facet fan does not ride the \`--spring-dock\` clock — it must reuse the ONE dock spring, never a re-forked clock`);

    // The harvested projection helper is a PURE function (no spring loop — no SpringProgress
    // import, no rAF). Scan the CODE (comments stripped — a header comment NAMING
    // SpringProgress to say it is ABSENT must not false-RED the purity check).
    facts.projectionExists = existsSync(resolve(ROOT, RAIL_PROJECTION));
    const projectionRaw = readRel(RAIL_PROJECTION);
    const projection = projectionRaw
        .replace(/\/\*[\s\S]*?\*\//g, " ")
        .replace(/^\s*\/\/.*$/gm, " ");
    facts.projectionPure =
        facts.projectionExists &&
        !/\bSpringProgress\b/.test(projection) &&
        !/\brequestAnimationFrame\b/.test(projection) &&
        !/from\s+["']@mkbabb\/keyframes\.js["']/.test(projection) &&
        /export\s+function\s+projectFacets/.test(projection);
    if (!facts.projectionExists)
        violations.push(`R3: ${RAIL_PROJECTION} does not exist — the harvested φ-tier/ring projection helper is missing`);
    else if (!facts.projectionPure)
        violations.push(`R3: ${RAIL_PROJECTION} is not a PURE helper (it re-forks a SpringProgress/rAF loop, or exports no \`projectFacets\`) — only the projection math is harvested, never the spring`);

    // The harvest has a REAL consumer — DockStack IMPORTS + CALLS it (no dead substrate;
    // the spec's "a pure helper DockStack imports").
    const stack = stripVue(readRel(DOCK_STACK));
    facts.dockStackConsumesProjection =
        /from\s+["']\.\/composables\/railProjection["']/.test(stack) && /projectFacets\s*\(/.test(stack);
    if (!facts.dockStackConsumesProjection)
        violations.push(`R3: ${DOCK_STACK} does not import + call \`projectFacets\` from railProjection — the harvested math must have a real consumer (no dead substrate)`);

    return { violations, facts };
}

// ── R4 — ONE registry, no shadow ──
function detectR4() {
    const violations = [];
    const facts = {};
    const stack = stripVue(readRel(DOCK_STACK));

    facts.selectedIsModel = /defineModel<[^>]*>\(\s*["']selected["']/.test(stack);
    facts.hasSelectionShadow =
        /\b(selected|active|context)\s*=\s*ref\(/.test(stack) ||
        /\breactive\(\s*\{[^}]*selected/.test(stack);
    if (!facts.selectedIsModel)
        violations.push(`R4: the selected member is not a \`defineModel('selected')\` consumer-owned ref — the facet click must write the consumer model (one registry)`);
    if (facts.hasSelectionShadow)
        violations.push(`R4: DockStack owns an internal ref()/reactive() SHADOW of the active facet — the one-registry discipline is broken`);

    return { violations, facts };
}

// ── R5 — the CLAUDE.md doc-reconcile ──
function detectR5() {
    const violations = [];
    const facts = {};
    const claude = readRel(CLAUDE_MD);

    // The stale retired-machinery references are GONE.
    facts.hasProofRail3 = /Machine-locked by\s+`?proof:rail3`?/.test(claude) || /\bproof:rail3\b/.test(claude);
    facts.hasRail3Spec = /tests-visual\/rail3\.spec\.ts/.test(claude);
    facts.hasSeamOffset = /--dock-rail-seam-offset/.test(claude);
    facts.hasProofRailExtend = /\bproof:rail-extend\b/.test(claude);
    if (facts.hasProofRail3)
        violations.push("R5: CLAUDE.md still references `proof:rail3` (a deleted gate) — the doc-reconcile must replace it with proof:dock-rail-realize / proof:dock-stack-rail");
    if (facts.hasRail3Spec)
        violations.push("R5: CLAUDE.md still references `tests-visual/rail3.spec.ts` (a deleted spec) — the doc-reconcile must remove it");
    if (facts.hasSeamOffset)
        violations.push("R5: CLAUDE.md still references `--dock-rail-seam-offset` (the retired divider-seam locator) — the doc-reconcile must remove it (the rail seats at the dock edge / in the gutter, no seam-offset)");
    if (facts.hasProofRailExtend)
        violations.push("R5: CLAUDE.md still references `proof:rail-extend` (a retired predecessor gate) — the doc-reconcile must remove it");

    // The live contract IS documented (the facet mode + the live gate).
    facts.documentsDockRailRealize = /\bproof:dock-rail-realize\b/.test(claude);
    facts.documentsFacetMode = /mode="facets"|facet carousel|facet-carousel|FACET CAROUSEL/i.test(claude);
    if (!facts.documentsDockRailRealize)
        violations.push("R5: CLAUDE.md does not document `proof:dock-rail-realize` — the live facet-mode gate must be the recorded contract");
    if (!facts.documentsFacetMode)
        violations.push("R5: CLAUDE.md does not document the `mode=\"facets\"` facet carousel — the re-instated rail contract must be recorded");

    return { violations, facts };
}

// ── the extended S-clauses (proof:dock-stack-rail S1-S6 stay GREEN by construction) ──
function detectExtendedStackRail() {
    const s1 = detectS1();
    const s2 = detectS2();
    const s3 = detectS3();
    const s4 = detectS4();
    const s5 = detectS5();
    const s6 = detectS6();
    const violations = [
        ...s1.violations,
        ...s2.violations,
        ...s3.violations,
        ...s4.violations,
        ...s5.violations,
        ...s6.violations,
    ].map((v) => `(extends proof:dock-stack-rail) ${v}`);
    return { violations, facts: { s1: s1.facts, s2: s2.facts, s3: s3.facts, s4: s4.facts, s5: s5.facts, s6: s6.facts } };
}

// ── born-RED via git-show (the pre-fix tree carried the capsule fork) ──
async function reconstructBornRed() {
    const { execFileSync } = await import("node:child_process");
    const exists = (path) => {
        try {
            execFileSync("git", ["cat-file", "-e", `${PRE_FIX_COMMIT}:${path}`], {
                cwd: ROOT,
                stdio: ["ignore", "ignore", "ignore"],
            });
            return true;
        } catch {
            return false;
        }
    };
    let reconstructed = true;
    let useLiquidRailAtHead = false;
    let liquidRailCssAtHead = false;
    try {
        useLiquidRailAtHead = exists(USE_LIQUID_RAIL);
        liquidRailCssAtHead = exists(LIQUID_RAIL_CSS);
    } catch {
        reconstructed = false;
    }
    return { reconstructed, useLiquidRailAtHead, liquidRailCssAtHead };
}

// ── self-tests ──
function selfTests() {
    const out = {};
    // R1 — a missing `mode` axis reds (the detector flags the absence).
    out.r1 = (() => {
        const fixture = "const props = defineProps<{ items: readonly DockStackItem[] }>()";
        const hasAxis = /mode\?:\s*["']stack["']\s*\|\s*["']facets["']/.test(fixture);
        return hasAxis === false; // a no-axis fixture would red R1
    })();
    // R2 — a flat shared fill (no per-facet --glass-accent write) reds.
    out.r2 = (() => {
        const fixture = "background: var(--glass-bg-floating);"; // no --glass-accent
        return !/["']--glass-accent["']\s*:/.test(fixture);
    })();
    // R3 — a surviving useLiquidRail import reds.
    out.r3 = (() => {
        const fixture = 'import { useLiquidRail } from "./composables/useLiquidRail";';
        return /useLiquidRail/.test(fixture);
    })();
    // R3b — a re-clipped frame reds (the box-INVIOLATE bite).
    out.r3b = (() => {
        const body = "display: inline-flex; contain: paint;";
        return /contain\s*:/.test(body);
    })();
    // R4 — an internal selection shadow reds.
    out.r4 = (() => /\b(selected|active|context)\s*=\s*ref\(/.test("const context = ref('music');"))();
    // R5 — a CLAUDE.md `Machine-locked by proof:rail3` survivor reds (the doc-reconcile bite).
    out.r5 = (() => /Machine-locked by\s+`?proof:rail3`?/.test("Machine-locked by `proof:rail3` (R1…R6)"))();
    return out;
}

export async function detect() {
    const r1 = detectR1();
    const r2 = detectR2();
    const r3 = detectR3();
    const r4 = detectR4();
    const r5 = detectR5();
    const ext = detectExtendedStackRail();
    const bornRed = await reconstructBornRed();

    const st = selfTests();
    const stViolations = [];
    for (const [k, ok] of Object.entries(st))
        if (!ok) stViolations.push(`${k} self-test bite BROKE — the detector does not bite its planted ${k} fixture`);

    const bornRedViolations = [];
    if (bornRed.reconstructed && !bornRed.useLiquidRailAtHead)
        bornRedViolations.push(`born-RED: the pre-fix tree (${PRE_FIX_COMMIT}) did NOT carry useLiquidRail.ts — the gate is not born-RED against the capsule-fork tree`);

    const violations = [
        ...r1.violations,
        ...r2.violations,
        ...r3.violations,
        ...r4.violations,
        ...r5.violations,
        ...ext.violations,
        ...bornRedViolations,
        ...stViolations,
    ];
    return {
        violations,
        facts: {
            r1: r1.facts,
            r2: r2.facts,
            r3: r3.facts,
            r4: r4.facts,
            r5: r5.facts,
            extendsStackRail: ext.facts,
            bornRed,
            selfTests: st,
        },
    };
}

async function run() {
    const { violations, facts } = await detect();
    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath("GLASS_UI_DOCK_RAIL_REALIZE_ARTIFACT", "BE-dock-rail-realize");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:dock-rail-realize",
        command: COMMAND,
        note: "BE.W-DOCK-RAIL-REALIZE device-free SOURCE arm — the rail-as-hairline (user defect #4). EXTENDS proof:dock-stack-rail (S1-S6 re-asserted GREEN by construction). R1 the facet-carousel mode exists ONCE on <DockStack> (mode=stack|facets, default stack byte-identical; NO second component). R2 the per-facet --glass-accent FLOOR (each chip writes its own context hue off the per-instance chromatic-rim axis). R3 the capsule fork is DEFINITION-ABSENT (useLiquidRail.ts + liquid-rail.css DELETED wholesale, no alias; the demo.css @import gone; box-INVIOLATE preserved — the .glass-dock-frame escape un-clipped, the fan on the ONE --spring-dock clock, the projection helper PURE). R4 ONE registry — the facet click writes the consumer-owned v-model, no selection shadow. R5 the CLAUDE.md doc-reconcile (proof:rail3 / rail3.spec / --dock-rail-seam-offset / proof:rail-extend GONE; proof:dock-rail-realize + the facet mode documented). The LIVE facet-hue + box-INVIOLATE + both-orientation PAINT is the orchestrator's W-DOCK-RAIL-REALIZE-DELTA.",
        facts,
        violations,
    });
    console.log(`proof:dock-rail-realize — ${status.toUpperCase()}`);
    console.log(`  R1 facet-mode: mode-axis=${facts.r1.hasModeAxis} default-stack=${facts.r1.modeDefaultStack} renders-facets=${facts.r1.rendersFacets} no-second-sfc=${facts.r1.newRailSfcs.length === 0}`);
    console.log(`  R2 per-facet-accent: writes-accent=${facts.r2.writesPerFacetAccent} item-accent-field=${facts.r2.itemHasAccent} css-reads-accent=${facts.r2.cssReadsAccent}`);
    console.log(`  R3 fork-absent: useLiquidRail-absent=${facts.r3.useLiquidRailAbsent} liquid-rail-css-absent=${facts.r3.liquidRailCssAbsent} no-capsule-class=${facts.r3.noCapsuleClass} demo-import-gone=${!facts.r3.demoCssImportsLiquidRail} box-inviolate(frame-no-clip)=${facts.r3.frameNoClip} spring-dock=${facts.r3.fanRidesSpringDock} projection-pure=${facts.r3.projectionPure}`);
    console.log(`  R4 one-registry: selected-is-model=${facts.r4.selectedIsModel} no-shadow=${!facts.r4.hasSelectionShadow}`);
    console.log(`  R5 doc-reconcile: no-rail3=${!facts.r5.hasProofRail3} no-rail3-spec=${!facts.r5.hasRail3Spec} no-seam-offset=${!facts.r5.hasSeamOffset} no-rail-extend=${!facts.r5.hasProofRailExtend} documents-realize=${facts.r5.documentsDockRailRealize} documents-facet=${facts.r5.documentsFacetMode}`);
    console.log(`  extends proof:dock-stack-rail S1-S6: violations=${facts.extendsStackRail ? "(see below)" : "n/a"}`);
    console.log(`  born-RED: reconstructed=${facts.bornRed.reconstructed} useLiquidRail@head=${facts.bornRed.useLiquidRailAtHead}`);
    console.log(`  self-tests: ${Object.entries(facts.selfTests).map(([k, v]) => `${k}=${v ? "OK" : "BROKE"}`).join(" ")}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    } else {
        console.log(`  artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    }
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
