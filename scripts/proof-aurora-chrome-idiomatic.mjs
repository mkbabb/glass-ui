#!/usr/bin/env node
// AX.W38 (Arm 2) — proof:aurora-chrome-idiomatic.
//
// The aurora studio's INNER controls (the DEFAULT-visible AuroraAtomsPanel.vue + the
// config/*Layer.vue enum pickers + the AuroraConfigDock Advanced disclosure) must read
// as the SAME idiomatic glass-ui the chrome is around — dogfooding the library's own
// LabeledSelect / LabeledSlider / ConfiguratorLayer family, not raw UA-styled native
// controls or a mis-hosted DockLayerGroup.
//
// Re-grounded to the post-W53 reality (the Hardening amendment): BouncyTabs is GONE
// (W53 unified it into SegmentedTabs, which resolves role=group + aria-pressed — the
// correct ToggleGroup-shaped surface, so the a11y "category error" is already closed).
// The live defect is VISUAL/cross-surface: the 7-way medium enum rendered as a cramped
// 7-segment pill in Advanced AND a native <select> in Atoms (two renderings of one
// enum). Both surfaces now render `medium` via LabeledSelect (ONE rendering); the short
// stroke/noise/flow/warp enums stay segmented (the correct short-toggle idiom).
//
// A source-structure parse (the SFC structure IS the artefact); the binding π-lane
// computed-style + live-interaction read is captured in
// docs/tranches/AX/audit/W38-aurora-chrome-idiomatic.json.
//
// bite-check: re-add a native <select>/<input type=range> to the atoms panel → RED;
// render medium as SegmentedTabs in MediumLayer → RED; re-host the Advanced disclosure
// in a DockLayerGroup → RED.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const AURORA = resolve(ROOT, "demo/stories/aurora");
const ATOMS = resolve(AURORA, "AuroraAtomsPanel.vue");
const DOCK = resolve(AURORA, "AuroraConfigDock.vue");
const MEDIUM = resolve(AURORA, "config/MediumLayer.vue");
const FLOW = resolve(AURORA, "config/FlowLayer.vue");
const COMPOSITION = resolve(AURORA, "config/CompositionLayer.vue");
const ARTIFACT = gateArtifactPath(
    "GLASS_UI_AURORA_CHROME_IDIOMATIC_ARTIFACT",
    "AX-W38-aurora-chrome-idiomatic",
);

// Strip JS/HTML comments so prose ("native <select>/<input type=range>",
// "instead of a DockLayerGroup") does not trip the structural probes.
function stripComments(t) {
    return t
        .replace(/<!--[\s\S]*?-->/g, " ")
        .replace(/\/\*[\s\S]*?\*\//g, " ")
        .split("\n")
        .map((l) => {
            const i = l.indexOf("//");
            return i === -1 ? l : l.slice(0, i);
        })
        .join("\n");
}

function read(p) {
    if (!existsSync(p)) return null;
    return stripComments(readFileSync(p, "utf8")).replace(/[ \t]+/g, " ");
}

function countMatches(src, re) {
    const m = src.match(re);
    return m ? m.length : 0;
}

function main() {
    const violations = [];
    const facts = {};

    const atoms = read(ATOMS);
    const dock = read(DOCK);
    const medium = read(MEDIUM);
    const flow = read(FLOW);
    const composition = read(COMPOSITION);
    if (!atoms || !dock || !medium || !flow || !composition) {
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status: "fail",
            gate: "proof:aurora-chrome-idiomatic",
            facts,
            violations: ["a required aurora demo SFC is absent"],
        });
        console.error("[proof:aurora-chrome-idiomatic] FAIL — source absent");
        process.exit(1);
    }

    // (1) No native <select> / <input type="range"> in the DEFAULT atoms panel.
    const nativeSelects = countMatches(atoms, /<select[\s>]/g);
    const nativeRanges = countMatches(atoms, /type="range"/g);
    facts.atomsNativeSelects = nativeSelects;
    facts.atomsNativeRanges = nativeRanges;
    if (nativeSelects > 0)
        violations.push(`(1) AuroraAtomsPanel.vue carries ${nativeSelects} native <select> — reauthor onto LabeledSelect`);
    if (nativeRanges > 0)
        violations.push(`(1) AuroraAtomsPanel.vue carries ${nativeRanges} native <input type="range"> — reauthor onto LabeledSlider`);

    // The atoms panel composes the library form primitives.
    facts.atomsUsesLabeledSelect = /LabeledSelect/.test(atoms);
    facts.atomsUsesLabeledSlider = /LabeledSlider/.test(atoms);
    if (!facts.atomsUsesLabeledSelect)
        violations.push("(1) AuroraAtomsPanel.vue does not compose LabeledSelect");
    if (!facts.atomsUsesLabeledSlider)
        violations.push("(1) AuroraAtomsPanel.vue does not compose LabeledSlider");

    // (2) The 7-way medium enum renders via LabeledSelect (NOT a cramped SegmentedTabs
    //     pill) in MediumLayer — matching the atoms panel (one enum, one rendering).
    facts.mediumLayerUsesLabeledSelect =
        /LabeledSelect/.test(medium) && /:items="mediumLabels"/.test(medium) && /@update:model-value="setMedium"/.test(medium);
    if (!facts.mediumLayerUsesLabeledSelect)
        violations.push("(2) MediumLayer.vue does not render the medium enum via LabeledSelect (the cramped 7-segment pill defect)");
    // medium must NOT be bound to a SegmentedTabs in MediumLayer (the setMedium handler
    // must route through a LabeledSelect, never @update:model-value on a SegmentedTabs).
    facts.mediumNotSegmented = !/<SegmentedTabs[\s\S]{0,200}@update:model-value="setMedium"/.test(
        medium,
    );
    if (!facts.mediumNotSegmented)
        violations.push("(2) MediumLayer.vue still binds `medium` to a SegmentedTabs pill");

    // (3) The Advanced disclosure composes ConfiguratorLayer, NOT DockLayerGroup.
    facts.dockUsesConfiguratorLayer = /ConfiguratorLayer/.test(dock);
    facts.dockNoDockLayerGroup = !/DockLayerGroup/.test(dock) && !/<DockLayer\b/.test(dock);
    if (!facts.dockUsesConfiguratorLayer)
        violations.push("(3) AuroraConfigDock.vue does not compose ConfiguratorLayer for the Advanced disclosure");
    if (!facts.dockNoDockLayerGroup)
        violations.push("(3) AuroraConfigDock.vue still mis-hosts the Advanced disclosure in a DockLayerGroup/DockLayer");

    // (4) `medium` renders ONE way across both surfaces — LabeledSelect in Atoms AND
    //     Advanced (cross-surface consistency).
    facts.mediumOneWay = facts.atomsUsesLabeledSelect && facts.mediumLayerUsesLabeledSelect;
    if (!facts.mediumOneWay)
        violations.push("(4) the `medium` enum does not render the SAME way (LabeledSelect) in Atoms + Advanced");

    // (5) Color-swatch RATIFY = Option B (keep native + LabeledField wrap) — NO new
    //     src/components/ color primitive minted; the seed swatch stays a native
    //     <input type=color> wrapped in LabeledField.
    facts.seedIsNativeColorInLabeledField = /LabeledField[\s\S]{0,400}type="color"|type="color"[\s\S]{0,400}LabeledField/.test(
        atoms,
    );
    facts.noColorSwatchPrimitive = !existsSync(
        resolve(ROOT, "src/components/custom/color-swatch"),
    ) && !existsSync(resolve(ROOT, "src/components/ui/color-swatch"));
    if (!facts.seedIsNativeColorInLabeledField)
        violations.push("(5) the seed swatch is not a native <input type=color> wrapped in LabeledField (the Option-B ratify)");
    if (!facts.noColorSwatchPrimitive)
        violations.push("(5) a ColorSwatch library primitive was minted — Option A is a dedicated sub-wave, NOT W38 (compose-only)");

    // (6) The 2 LEGITIMATE panel-nav SegmentedTabs in AuroraConfigDock (Atoms↔Advanced +
    //     — the advanced layer-switch was RETIRED with the DockLayerGroup, so only the
    //     top-level Atoms↔Advanced tab remains) are preserved.
    facts.topLevelTabsPreserved = /SegmentedTabs/.test(dock) && /TOP_TABS/.test(dock);
    if (!facts.topLevelTabsPreserved)
        violations.push("(6) the top-level Atoms↔Advanced panel-nav SegmentedTabs was mis-retired (it is a real tablist — preserve it)");

    // (7) No new token / variant / primitive in the atoms panel — composes-only. The
    //     panel imports ONLY from the library form-primitive family + aurora types.
    facts.composesOnly =
        /labeled-field/.test(atoms) &&
        !/defineCustomElement|cva\(|class-variance-authority/.test(atoms);
    if (!facts.composesOnly)
        violations.push("(7) AuroraAtomsPanel.vue is not composes-only (a new variant/primitive crept in)");

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:aurora-chrome-idiomatic",
        facts,
        violations,
    });

    if (violations.length) {
        console.error("[proof:aurora-chrome-idiomatic] FAIL\n  - " + violations.join("\n  - "));
        process.exit(1);
    }
    console.log("[proof:aurora-chrome-idiomatic] PASS — atoms panel + medium enum on the library form primitives, Advanced on ConfiguratorLayer, medium renders one way, Option-B native swatch, composes-only");
}

main();
