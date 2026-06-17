#!/usr/bin/env node
// AX.W38 (Arm 2) — proof:aurora-chrome-idiomatic.
// Re-pointed at AY.W-AUR-CONFIG-REBUILD (B21): the studio controls column was
// rebuilt as ONE progressive-disclosure stack of grouped sections (Color /
// Composition / Motion / Warp&noise / Flow / Texture / Nuclei), retiring the
// prior "Atoms ↔ Advanced" pill split (the janky-two-face surface the user
// named). The dead-select/native-control idiom checks still bind — they now
// read the NEW section SFCs.
//
// The aurora studio's INNER controls must read as the SAME idiomatic glass-ui
// the chrome is around — dogfooding the library's own LabeledSelect /
// LabeledSlider / ConfiguratorLayer family, not raw UA-styled native controls
// or a mis-hosted DockLayerGroup. The 7-way medium enum renders ONE way (a
// single LabeledSelect in the Composition section — the prior dual native-
// <select>/SegmentedTabs-pill double-rendering is structurally gone with the
// retired faces).
//
// A source-structure parse (the SFC structure IS the artefact); the binding
// π-lane computed-style + live-interaction read is captured in
// docs/tranches/AY/audit/visual/W-AUR-CONFIG-DELTA.md.
//
// bite-check: re-add a native <select>/<input type=range> to a section panel →
// RED; render medium as SegmentedTabs → RED; host the section stack in a
// DockLayerGroup → RED; revert the seed swatch off <ColorSwatch> back to a raw
// native <input type=color> slab → RED.
//
// BA.W-CONFIG-CHASSIS re-pointed clause 5: the prior "Option-B ratify" expected a
// native `<input type=color>` wrapped in LabeledField AND forbade a ColorSwatch
// primitive. That wave SHIPPED `<ColorSwatch>` (the first-class color-input
// register — a proportioned chip + hex affordance replacing the raw full-width
// `<input type=color w-full>` slabs), and the aurora seed swatch adopted it. The
// shipped idiom is now ColorSwatch — clause 5 asserts the seed swatch composes
// `<ColorSwatch>` and the primitive resolves (a clean break; the Option-B
// expectation was superseded, not reverted).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const AURORA = resolve(ROOT, "demo/stories/aurora");
const DOCK = resolve(AURORA, "AuroraConfigDock.vue");
const SECTIONS = resolve(AURORA, "sections");
const COLOR = resolve(SECTIONS, "AuroraColorSection.vue");
const COMPOSITION_SECTION = resolve(SECTIONS, "AuroraCompositionSection.vue");
const MOTION_SECTION = resolve(SECTIONS, "AuroraMotionSection.vue");
const FLOW = resolve(AURORA, "config/FlowLayer.vue");
const WARP = resolve(AURORA, "config/CompositionLayer.vue");
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

    const dock = read(DOCK);
    const color = read(COLOR);
    const compositionSection = read(COMPOSITION_SECTION);
    const motionSection = read(MOTION_SECTION);
    const flow = read(FLOW);
    const warp = read(WARP);
    if (!dock || !color || !compositionSection || !motionSection || !flow || !warp) {
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

    // The atom controls span the Color + Composition + Motion section SFCs —
    // the studio's default-visible knobs. Concatenate for the native-control +
    // primitive-composition checks.
    const atomSurface = [color, compositionSection, motionSection].join("\n");

    // (1) No native <select> / <input type="range"> in any atom-section panel.
    const nativeSelects = countMatches(atomSurface, /<select[\s>]/g);
    const nativeRanges = countMatches(atomSurface, /type="range"/g);
    facts.atomsNativeSelects = nativeSelects;
    facts.atomsNativeRanges = nativeRanges;
    if (nativeSelects > 0)
        violations.push(`(1) an aurora atom section carries ${nativeSelects} native <select> — reauthor onto LabeledSelect`);
    if (nativeRanges > 0)
        violations.push(`(1) an aurora atom section carries ${nativeRanges} native <input type="range"> — reauthor onto LabeledSlider`);

    // The atom sections compose the library form primitives.
    facts.atomsUsesLabeledSelect = /LabeledSelect/.test(atomSurface);
    facts.atomsUsesLabeledSlider = /LabeledSlider/.test(atomSurface);
    if (!facts.atomsUsesLabeledSelect)
        violations.push("(1) the aurora atom sections do not compose LabeledSelect");
    if (!facts.atomsUsesLabeledSlider)
        violations.push("(1) the aurora atom sections do not compose LabeledSlider");

    // (2) The 7-way medium enum renders via LabeledSelect (NOT a cramped
    //     SegmentedTabs pill) in the Composition section.
    facts.mediumUsesLabeledSelect =
        /LabeledSelect/.test(compositionSection) &&
        /:items="mediaItems"/.test(compositionSection) &&
        /@update:model-value="setMedium"/.test(compositionSection);
    if (!facts.mediumUsesLabeledSelect)
        violations.push("(2) AuroraCompositionSection.vue does not render the medium enum via LabeledSelect (the cramped 7-segment pill defect)");
    // medium must NOT be bound to a SegmentedTabs (a setMedium handler routing
    // through a SegmentedTabs would be the dual-rendering regression).
    facts.mediumNotSegmented = !/<SegmentedTabs[\s\S]{0,200}@update:model-value="setMedium"/.test(
        compositionSection,
    );
    if (!facts.mediumNotSegmented)
        violations.push("(2) AuroraCompositionSection.vue binds `medium` to a SegmentedTabs pill");

    // (3) The section stack composes ConfiguratorLayer, NOT a DockLayerGroup.
    facts.dockUsesConfiguratorLayer = /ConfiguratorLayer/.test(dock);
    facts.dockNoDockLayerGroup = !/DockLayerGroup/.test(dock) && !/<DockLayer\b/.test(dock);
    if (!facts.dockUsesConfiguratorLayer)
        violations.push("(3) AuroraConfigDock.vue does not compose ConfiguratorLayer for the section stack");
    if (!facts.dockNoDockLayerGroup)
        violations.push("(3) AuroraConfigDock.vue mis-hosts the section stack in a DockLayerGroup/DockLayer");

    // (4) `medium` renders ONE way — the rebuild has a SINGLE medium LabeledSelect
    //     (the Composition section); the prior second rendering (the retired
    //     MediumLayer pill) is structurally gone. Assert exactly one medium
    //     LabeledSelect across the studio SFCs.
    const mediumSelectSites = [dock, color, compositionSection, motionSection, flow, warp]
        .map((s) => countMatches(s, /data-atom="medium"/g))
        .reduce((a, b) => a + b, 0);
    facts.mediumSelectSites = mediumSelectSites;
    facts.mediumOneWay = mediumSelectSites === 1;
    if (!facts.mediumOneWay)
        violations.push(`(4) the \`medium\` enum renders ${mediumSelectSites} times (expected exactly 1 — one rendering, one place)`);

    // (5) Color-swatch idiom = ColorSwatch (BA.W-CONFIG-CHASSIS) — the seed swatch
    //     composes the first-class `<ColorSwatch>` register (a proportioned chip +
    //     hex affordance) OFF the raw native `<input type=color w-full>` slab, and
    //     the ColorSwatch library primitive RESOLVES (it is the new canonical color
    //     register, not a forbidden mint). A revert to a raw native color input REDS.
    facts.seedComposesColorSwatch = /<ColorSwatch[\s>]/.test(color);
    facts.seedNotRawNativeColor = !/<input[^>]*type="color"/.test(color);
    facts.colorSwatchPrimitiveResolves =
        existsSync(resolve(ROOT, "src/components/custom/color-swatch")) ||
        existsSync(resolve(ROOT, "src/components/ui/color-swatch"));
    if (!facts.seedComposesColorSwatch)
        violations.push("(5) the seed swatch does not compose the library <ColorSwatch> register (BA.W-CONFIG-CHASSIS — off the raw native <input type=color> slab)");
    if (!facts.seedNotRawNativeColor)
        violations.push("(5) the aurora color section still carries a raw native <input type=color> slab — the seed swatch is the <ColorSwatch> register now");
    if (!facts.colorSwatchPrimitiveResolves)
        violations.push("(5) the ColorSwatch library primitive does not resolve — the shipped color-input register is missing");

    // (6) The studio is ONE progressive-disclosure column — the prior top-level
    //     "Atoms ↔ Advanced" SegmentedTabs split was DELIBERATELY retired (B21:
    //     the janky-two-face surface the user named). Assert the dock carries NO
    //     SegmentedTabs face-toggle (the section stack IS the navigation). The
    //     short oil/noise enum SegmentedTabs live INSIDE the Texture section, not
    //     in the dock root.
    facts.dockNoFaceToggle = !/SegmentedTabs/.test(dock);
    if (!facts.dockNoFaceToggle)
        violations.push("(6) AuroraConfigDock.vue still carries a SegmentedTabs face-toggle — the rebuild is one progressive-disclosure column, not an Atoms↔Advanced split");

    // (7) Composes-only — the atom sections compose ONLY the library form-primitive
    //     family + aurora types; no new variant/primitive crept in.
    facts.composesOnly =
        /labeled-field/.test(atomSurface) &&
        !/defineCustomElement|cva\(|class-variance-authority/.test(atomSurface);
    if (!facts.composesOnly)
        violations.push("(7) an aurora atom section is not composes-only (a new variant/primitive crept in)");

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
    console.log("[proof:aurora-chrome-idiomatic] PASS — atom sections on the library form primitives, medium enum renders once via LabeledSelect, section stack on ConfiguratorLayer, the seed swatch on the <ColorSwatch> register, one progressive-disclosure column, composes-only");
}

main();
