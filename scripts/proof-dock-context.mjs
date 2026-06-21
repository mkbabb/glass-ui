#!/usr/bin/env node
// BE.W-DOCK-CONTEXT-SILHOUETTE — proof:dock-context, the born-RED declarative
// context→silhouette state-machine gate.
//
// THE DISEASE THIS KILLS (audit §W3). The prototype hardcoded its 4 "modes" as a `mode`
// ref + a `data-mode` CSS switch + `v-if`/`v-show` blocks — switching a mode UNMOUNTS one
// block + MOUNTS another, so controls TELEPORT, never GLIDE. There is no descriptor map,
// no surviving-control FLIP, and the headline iOS-27 betters-move (the now-playing pill
// DOCKING DOWN + MELDING INTO the tab-bar as ONE continuous plate) is entirely absent.
//
// THE CURE. `useDockContextSilhouette` reads a declarative `DockSilhouetteDescriptor[]`
// MAP (the `DockSectionDescriptor` data-not-code-paths precedent, `proof:dock-sections`
// S1) and DIFFs the slots by `controlId`: surviving controls FLIP via the SHIPPED
// `ElementMorph` + `springTimingFunction` (ONE `DOCK_SPRING`, no fork), from-only DETACH,
// to-only BLOOM. The `bar+pill` descriptor carries the FUSED geometry (the pill's `to`-rect
// is the bar crown + the `--silhouette-fuse-t` meld scalar).
//
// PURE DEVICE-FREE static src-scan (source-text scan, no browser, no GPU). Runs on EVERY
// runner → `tags: ["local","ci","release"]`. The BINDING painted truth is the π roster
// row (W-GESTALT-ROSTER-BE `dock-context`) — this gate proves the SOURCE shape.
//
// CLAUSES (born-RED on the pre-wave tree — the composable is ABSENT):
//   C1 — DESCRIPTOR-MAP-not-data-mode-switch. The orchestrator reads a declarative
//        `DockSilhouetteDescriptor[]` with the four named kinds (bar | bar+pill | split |
//        search) present in the type, and there is NO per-context hardcoded silhouette
//        literal / `data-mode` switch (the anti-evasion floor — the `proof:dock-sections`
//        S1 hardcoded-literal discipline).
//   C2 — controlId-DIFF-FLIP via the SHIPPED substrate. The orchestrator imports
//        `ElementMorph` + `springTimingFunction` from `@mkbabb/keyframes.js` (NO fork, no
//        second spring) AND diffs the slots by `controlId` (a slot-diff that classifies
//        survivors/detaches/blooms).
//   C3 — the pill↔tabbar FUSION morph is ARTICULATED. The `bar+pill` descriptor carries a
//        `fuse` slot marker AND the orchestrator writes a `--silhouette-fuse-t` meld
//        scalar (NOT a pill-above-bar literal).
//   C4 — PRM=synchronous seat. A `prefersReducedMotion()` branch seats at the target in
//        ONE step (the `ElementMorph` snap precedent).
//   C5 — one-DOCK_SPRING-no-fork + orientation-derived slots. The orchestrator reads
//        `DOCK_SPRING` (the byte-untouched register) AND the slot geometry is
//        orientation-DERIVED (a `slotToRect` off the orientation — the `dim`-idiom, so
//        vertical falls out by construction; never a hardcoded `inline-size`/`block-size`).
//
// Self-test bites (the `proof-dock-sections.mjs` S1 precedent — each planted defect MUST
// red): (a) a per-context hardcoded silhouette literal (no descriptor map / `data-mode`
// switch) → C1 RED; (b) a bespoke FLIP fork (no `ElementMorph` import) → C2 RED; (c) a
// `bar+pill` with no fuse-meld scalar → C3 RED; (d) a no-PRM-branch orchestrator → C4 RED.

import { existsSync, readFileSync } from "node:fs";
import { resolve, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

function stripComments(text) {
    return text
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/(^|[^:])\/\/[^\n]*/g, (m, p1) => p1 + " ".repeat(m.length - p1.length));
}

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        SILHOUETTE: resolve(
            ROOT,
            "src/components/custom/dock/composables/useDockContextSilhouette.ts",
        ),
        ARTIFACT: gateArtifactPath("GLASS_UI_DOCK_CONTEXT_ARTIFACT", "BE-dock-context"),
    };
    return _cliPaths;
}

/**
 * The PURE detector (injected) — exported so a born-RED self-test can feed a synthetic
 * mutation and assert it flags. `text` is the (already comment-stripped) composable
 * source.
 *
 * @param {{ silhouetteText: string }} fs
 */
export function detectDockContext(fs) {
    const violations = [];
    const facts = {};
    const src = stripComments(fs.silhouetteText ?? "");
    const exists = (fs.silhouetteText ?? "").length > 0;

    // ── C1 — descriptor-map, not a data-mode switch ──
    const descriptorType = /\bDockSilhouetteDescriptor\b/.test(src);
    const slotsField = /\bslots\s*:/.test(src);
    // the four named kinds present in the kind type/contract.
    const kindBar = /["']bar["']/.test(src);
    const kindBarPill = /["']bar\+pill["']/.test(src);
    const kindSplit = /["']split["']/.test(src);
    const kindSearch = /["']search["']/.test(src);
    const fourKinds = kindBar && kindBarPill && kindSplit && kindSearch;
    // the orchestrator reads the MAP (a Map/array over `silhouettes`), NOT a `data-mode`
    // CSS-switch / `v-if`-block literal (the prototype disease).
    const readsMap = /\bsilhouettes\b/.test(src) && /new\s+Map\s*\(/.test(src);
    const noDataModeSwitch = !/data-mode\s*=/.test(src) && !/\bmodeRef\b/.test(src);
    facts.c1DescriptorType = descriptorType;
    facts.c1SlotsField = slotsField;
    facts.c1FourKinds = fourKinds;
    facts.c1ReadsMap = readsMap;
    facts.c1NoDataModeSwitch = noDataModeSwitch;
    if (!exists || !descriptorType || !slotsField) {
        violations.push(
            "C1: useDockContextSilhouette / DockSilhouetteDescriptor / slots[] missing — the declarative silhouette-descriptor map is absent (the data-not-code-paths contract)",
        );
    }
    if (!fourKinds) {
        violations.push(
            "C1: the four named silhouette kinds (bar | bar+pill | split | search) are not all present in the descriptor contract",
        );
    }
    if (!readsMap || !noDataModeSwitch) {
        violations.push(
            "C1: the orchestrator does NOT read a declarative descriptor MAP — it must build a Map over the `silhouettes` descriptor array, NOT a per-context hardcoded literal / `data-mode` switch (the prototype teleport disease)",
        );
    }

    // ── C2 — controlId-diff FLIP via the SHIPPED substrate (no fork) ──
    const importsElementMorph =
        /import\s*\{[^}]*\bElementMorph\b/.test(src) &&
        /from\s*["']@mkbabb\/keyframes\.js["']/.test(src);
    const importsSpringTF = /\bspringTimingFunction\b/.test(src);
    const diffsByControlId =
        /\bcontrolId\b/.test(src) &&
        (/diffSilhouetteSlots|fromSlots|toSlots/.test(src));
    // no bespoke second spring family / hand-rolled spring integrator.
    const noBespokeSpring =
        !/new\s+SpringProgress\b/.test(src) && !/response\s*:\s*0\.\d+\s*,\s*dampingFraction/.test(
            // a literal (response, ζ) pair MINTED in this file (not read from DOCK_SPRING/
            // springPreset) is a fork — flag it. DOCK_SPRING destructure is allowed.
            src.replace(/DOCK_SPRING/g, ""),
        );
    facts.c2ImportsElementMorph = importsElementMorph;
    facts.c2ImportsSpringTF = importsSpringTF;
    facts.c2DiffsByControlId = diffsByControlId;
    facts.c2NoBespokeSpring = noBespokeSpring;
    if (!importsElementMorph || !importsSpringTF) {
        violations.push(
            "C2: the orchestrator does NOT compose the SHIPPED ElementMorph + springTimingFunction from @mkbabb/keyframes.js — a surviving-control FLIP must reuse the substrate (no fork, no second engine)",
        );
    }
    if (!diffsByControlId) {
        violations.push(
            "C2: the orchestrator does NOT diff the slots by `controlId` — surviving controls must be classified by the from/to slot diff (present-in-both → FLIP)",
        );
    }
    if (!noBespokeSpring) {
        violations.push(
            "C2: the orchestrator mints a bespoke (response, ζ) spring family — it must read DOCK_SPRING / springPreset (the byte-untouched register, no second clock)",
        );
    }

    // ── C3 — the pill↔tabbar FUSION morph is articulated ──
    const fuseSlotMarker = /\bfuse\b/.test(src);
    const fuseScalar = /--silhouette-fuse-t/.test(src);
    facts.c3FuseSlotMarker = fuseSlotMarker;
    facts.c3FuseScalar = fuseScalar;
    if (!fuseSlotMarker || !fuseScalar) {
        violations.push(
            "C3: the pill↔tabbar FUSION morph is NOT articulated — the `bar+pill` descriptor must carry a `fuse` slot marker AND the orchestrator must drive a `--silhouette-fuse-t` meld scalar (NOT a pill-above-bar literal)",
        );
    }

    // ── C4 — PRM=synchronous seat ──
    const prmBranch =
        /\bprefersReducedMotion\b/.test(src) &&
        /respectReducedMotion|respectPRM/.test(src);
    facts.c4PrmBranch = prmBranch;
    if (!prmBranch) {
        violations.push(
            "C4: no PRM synchronous-seat branch — the silhouette transition must seat at the target in ONE step under prefers-reduced-motion (the ElementMorph snap precedent)",
        );
    }

    // ── C5 — one DOCK_SPRING (no fork) + orientation-derived slots ──
    const readsDockSpring =
        /\bDOCK_SPRING\b/.test(src) && /from\s*["'][^"']*constants["']/.test(src);
    const orientationDerived =
        /\bslotToRect\b/.test(src) &&
        /\borientation\b/.test(src) &&
        // the dim-idiom: a vertical/horizontal branch swapping main/cross onto X/Y, never
        // a hardcoded inline-size/block-size literal in the slot resolver.
        /["']vertical["']/.test(src);
    const noHardcodedSize =
        !/inline-size\s*:|block-size\s*:/.test(src);
    facts.c5ReadsDockSpring = readsDockSpring;
    facts.c5OrientationDerived = orientationDerived;
    facts.c5NoHardcodedSize = noHardcodedSize;
    if (!readsDockSpring) {
        violations.push(
            "C5: the orchestrator does NOT read DOCK_SPRING from the dock constants — the FLIP must ride the existing byte-untouched register (one spring, no fork)",
        );
    }
    if (!orientationDerived || !noHardcodedSize) {
        violations.push(
            "C5: the slot geometry is NOT orientation-derived — `slotToRect` must map main/cross onto X/Y off the orientation (the dim-idiom; vertical falls out by construction), never a hardcoded inline-size/block-size literal",
        );
    }

    return { violations, facts };
}

/**
 * The born-RED SELF-TEST bites (the `proof-dock-sections.mjs` precedent). Each synthetic
 * defect MUST flag — if the detector greens on a mutation it is not load-bearing.
 *
 * @returns {{ ok: boolean, errors: string[] }}
 */
export function silhouetteSelfTest() {
    const errors = [];
    // A correct-shaped baseline (so each bite isolates ONE defect).
    const good =
        'import { ElementMorph, springTimingFunction } from "@mkbabb/keyframes.js";\n' +
        'import { DOCK_SPRING } from "../constants";\n' +
        "export interface DockSilhouetteDescriptor { kind: 'bar'|'bar+pill'|'split'|'search'; slots: SilhouetteSlot[]; }\n" +
        "const map = new Map(silhouettes.map(s => [s.id, s]));\n" +
        "function slotToRect(slot, orientation){ if (orientation==='vertical'){} return {}; }\n" +
        "if (slot.fuse) {} root.style.setProperty('--silhouette-fuse-t', t);\n" +
        "const fromSlots = new Map(); const toSlots = new Map(); slot.controlId;\n" +
        "if (respectPRM && prefersReducedMotion()) {}\n";
    const baseline = detectDockContext({ silhouetteText: good });
    if (baseline.violations.length) {
        errors.push(
            "SELF-TEST baseline BROKE — the synthetic correct shape flagged: " +
                baseline.violations.join(" | "),
        );
    }

    // (a) C1 — a hardcoded data-mode switch (no descriptor map) must flag.
    const a = detectDockContext({
        silhouetteText:
            'import { ElementMorph, springTimingFunction } from "@mkbabb/keyframes.js";\n' +
            'import { DOCK_SPRING } from "../constants";\n' +
            "const mode = ref('island'); el.setAttribute('data-mode', mode.value);\n" +
            "function slotToRect(slot, orientation){ if (orientation==='vertical'){} }\n" +
            "if (slot.fuse) {} setProperty('--silhouette-fuse-t', t); slot.controlId; fromSlots; toSlots;\n" +
            "if (respectPRM && prefersReducedMotion()) {}\n",
    });
    if (!a.violations.some((v) => v.startsWith("C1"))) {
        errors.push("C1 self-test BROKE — a data-mode switch (no descriptor map) was NOT flagged");
    }

    // (b) C2 — a bespoke FLIP fork (no ElementMorph import) must flag.
    const b = detectDockContext({
        silhouetteText:
            "export interface DockSilhouetteDescriptor { kind: 'bar'|'bar+pill'|'split'|'search'; slots: SilhouetteSlot[]; }\n" +
            'import { DOCK_SPRING } from "../constants";\n' +
            "const map = new Map(silhouettes.map(s => [s.id, s]));\n" +
            "function slotToRect(slot, orientation){ if (orientation==='vertical'){} }\n" +
            "if (slot.fuse) {} setProperty('--silhouette-fuse-t', t); slot.controlId; fromSlots; toSlots;\n" +
            "if (respectPRM && prefersReducedMotion()) {}\n",
    });
    if (!b.violations.some((v) => v.startsWith("C2"))) {
        errors.push("C2 self-test BROKE — a bespoke FLIP (no ElementMorph) was NOT flagged");
    }

    // (c) C3 — a bar+pill with NO fuse-meld scalar must flag.
    const c = detectDockContext({
        silhouetteText:
            'import { ElementMorph, springTimingFunction } from "@mkbabb/keyframes.js";\n' +
            'import { DOCK_SPRING } from "../constants";\n' +
            "export interface DockSilhouetteDescriptor { kind: 'bar'|'bar+pill'|'split'|'search'; slots: SilhouetteSlot[]; }\n" +
            "const map = new Map(silhouettes.map(s => [s.id, s]));\n" +
            "function slotToRect(slot, orientation){ if (orientation==='vertical'){} }\n" +
            "slot.controlId; fromSlots; toSlots; if (respectPRM && prefersReducedMotion()) {}\n",
    });
    if (!c.violations.some((v) => v.startsWith("C3"))) {
        errors.push("C3 self-test BROKE — a bar+pill with no fuse-meld scalar was NOT flagged");
    }

    // (d) C4 — a no-PRM-branch orchestrator must flag.
    const d = detectDockContext({
        silhouetteText:
            'import { ElementMorph, springTimingFunction } from "@mkbabb/keyframes.js";\n' +
            'import { DOCK_SPRING } from "../constants";\n' +
            "export interface DockSilhouetteDescriptor { kind: 'bar'|'bar+pill'|'split'|'search'; slots: SilhouetteSlot[]; }\n" +
            "const map = new Map(silhouettes.map(s => [s.id, s]));\n" +
            "function slotToRect(slot, orientation){ if (orientation==='vertical'){} }\n" +
            "if (slot.fuse) {} setProperty('--silhouette-fuse-t', t); slot.controlId; fromSlots; toSlots;\n",
    });
    if (!d.violations.some((v) => v.startsWith("C4"))) {
        errors.push("C4 self-test BROKE — a no-PRM-branch orchestrator was NOT flagged");
    }

    return { ok: errors.length === 0, errors };
}

function loadFs() {
    const P = cliPaths();
    const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");
    return { silhouetteText: read(P.SILHOUETTE) };
}

function run() {
    const P = cliPaths();
    const fs = loadFs();
    const { violations: detectorViolations, facts } = detectDockContext(fs);

    const self = silhouetteSelfTest();
    const violations = [...detectorViolations, ...self.errors];
    facts.selfTest = self.ok;
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:dock-context",
        note: "BE.W-DOCK-CONTEXT-SILHOUETTE — the declarative context→silhouette state-machine gate. C1 the orchestrator reads a DockSilhouetteDescriptor[] MAP (the four kinds bar|bar+pill|split|search present), NOT a per-context hardcoded literal / data-mode switch; C2 surviving controls FLIP via the SHIPPED ElementMorph + springTimingFunction (no fork) + a controlId slot-diff; C3 the pill↔tabbar FUSION morph is articulated (a `fuse` slot marker + the --silhouette-fuse-t meld scalar, NOT a pill-above-bar literal); C4 PRM seats synchronously (the ElementMorph snap precedent); C5 ONE DOCK_SPRING (byte-untouched register, no fork) + orientation-derived slots (slotToRect off the orientation — the dim-idiom, vertical by construction). A born-RED self-test bites every run (a data-mode switch / a bespoke FLIP / a bar+pill with no fuse-meld / a no-PRM-branch each flag). The BINDING painted truth is the W-GESTALT-ROSTER-BE dock-context π row (no source-green close).",
        facts,
        violations,
    });

    const ok = (b) => (b ? "OK" : "RED");
    console.log("proof:dock-context — the declarative context→silhouette state-machine gate (BE.W-DOCK-CONTEXT-SILHOUETTE)");
    console.log(
        `  C1 descriptor-map-not-data-mode : type=${facts.c1DescriptorType} slots=${facts.c1SlotsField} 4kinds=${facts.c1FourKinds} map=${facts.c1ReadsMap} no-switch=${facts.c1NoDataModeSwitch} ${ok(facts.c1DescriptorType && facts.c1SlotsField && facts.c1FourKinds && facts.c1ReadsMap && facts.c1NoDataModeSwitch)}`,
    );
    console.log(
        `  C2 controlId-diff-FLIP-no-fork  : ElementMorph=${facts.c2ImportsElementMorph} springTF=${facts.c2ImportsSpringTF} diff=${facts.c2DiffsByControlId} no-bespoke-spring=${facts.c2NoBespokeSpring} ${ok(facts.c2ImportsElementMorph && facts.c2ImportsSpringTF && facts.c2DiffsByControlId && facts.c2NoBespokeSpring)}`,
    );
    console.log(
        `  C3 pill↔tabbar FUSION articulated: fuse-marker=${facts.c3FuseSlotMarker} fuse-scalar=${facts.c3FuseScalar} ${ok(facts.c3FuseSlotMarker && facts.c3FuseScalar)}`,
    );
    console.log(`  C4 PRM synchronous seat         : ${ok(facts.c4PrmBranch)}`);
    console.log(
        `  C5 one-DOCK_SPRING + orient-slots: dock-spring=${facts.c5ReadsDockSpring} orient-derived=${facts.c5OrientationDerived} no-hardcoded-size=${facts.c5NoHardcodedSize} ${ok(facts.c5ReadsDockSpring && facts.c5OrientationDerived && facts.c5NoHardcodedSize)}`,
    );
    console.log(`  self-test (bite proof)          : ${ok(self.ok)}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${relative(P.ROOT, P.ARTIFACT)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
