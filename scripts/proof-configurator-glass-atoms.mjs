#!/usr/bin/env node
// AX.W38 (Arm 1 + Arm 3) — proof:configurator-glass-atoms.
//
// The shipped Configurator surface (Configurator.vue / ConfiguratorLayer.vue /
// ConfiguratorRow.vue) must read as the SAME glass-atoms language the rest of the
// library speaks: a glass-tier active preset chip (NOT an opaque bg-foreground stamp),
// the iOS press-spring (.tap-squish), the uniform transition-control surface cross-fade,
// the canonical focus-ring, a semantic radius geometry, and the blanket data-slot idiom.
// Arm 3 adds the D1 MOTION half: the section reveal + chevron animate on the fast snappy
// SPRING register (--spring-snappy), not the prior flat 200ms ease-out bezier.
//
// This is a source-structure parse (the SFC class strings ARE the artefact — the
// precept-valid form per SPEC.md §Hard Gates for a styling contract); the binding
// computed-style / live-interaction π-lane read is captured in
// docs/tranches/AX/audit/W38-configurator-glass-atoms.json.
//
// bite-check: revert the active chip to `bg-foreground text-background` → RED; drop
// .tap-squish from any of chip/trigger/reset → RED; revert the reveal to
// `ease-out duration-200` → RED; drop any data-slot → RED.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const DIR = resolve(ROOT, "src/components/custom/configurator");
const CONFIGURATOR = resolve(DIR, "Configurator.vue");
const LAYER = resolve(DIR, "ConfiguratorLayer.vue");
const ROW = resolve(DIR, "ConfiguratorRow.vue");
const ARTIFACT = gateArtifactPath(
    "GLASS_UI_CONFIGURATOR_GLASS_ATOMS_ARTIFACT",
    "AX-W38-configurator-glass-atoms",
);

// Strip JS/HTML comments so the inline rationale blocks between a `data-slot` attr and
// its class binding do not inflate the structural-window distance.
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
    // Collapse whitespace runs after comment-stripping so the structural windows
    // measure CODE distance, not indentation/blanked-comment-line padding.
    return stripComments(readFileSync(p, "utf8")).replace(/\s+/g, " ");
}

function main() {
    const violations = [];
    const facts = {};

    const configurator = read(CONFIGURATOR);
    const layer = read(LAYER);
    const row = read(ROW);
    if (!configurator || !layer || !row) {
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status: "fail",
            gate: "proof:configurator-glass-atoms",
            facts,
            violations: ["a required configurator SFC is absent"],
        });
        console.error("[proof:configurator-glass-atoms] FAIL — source absent");
        process.exit(1);
    }

    // (1) Preset chip glass-tier active — a glass-* tier on the active branch, NOT the
    //     opaque bg-foreground/text-background stamp.
    facts.chipGlassTierActive =
        /glass-(wash|quiet|resting|floating)/.test(configurator) &&
        !/bg-foreground\s+text-background/.test(configurator);
    if (!facts.chipGlassTierActive)
        violations.push(
            "(1) the active preset chip does not resolve a glass-* tier (or still carries the opaque `bg-foreground text-background` stamp)",
        );

    // (2) Press-spring (.tap-squish) on chip + layer trigger + row reset.
    facts.chipTapSquish = /data-slot="configurator-preset"[\s\S]{0,400}tap-squish/.test(
        configurator,
    );
    facts.triggerTapSquish = /data-slot="configurator-layer-trigger"[\s\S]{0,400}tap-squish/.test(
        layer,
    );
    facts.resetTapSquish = /data-slot="configurator-reset"[\s\S]{0,400}tap-squish/.test(row);
    // no surviving raw active:scale literal on the row reset (retired onto .tap-squish).
    facts.noRawScaleLiteral = !/active:scale-\[var\(--scale-press/.test(row);
    if (!facts.chipTapSquish)
        violations.push("(2) the preset chip does not compose .tap-squish (press-spring)");
    if (!facts.triggerTapSquish)
        violations.push("(2) the layer trigger does not compose .tap-squish (press-spring)");
    if (!facts.resetTapSquish)
        violations.push("(2) the row reset does not compose .tap-squish (press-spring)");
    if (!facts.noRawScaleLiteral)
        violations.push(
            "(2) the row reset still carries the raw `active:scale-[var(--scale-press…)]` literal — retire it onto .tap-squish",
        );

    // (3) transition-control on chip + trigger + reset (NOT bare transition-colors).
    facts.chipTransitionControl =
        /data-slot="configurator-preset"[\s\S]{0,400}transition-control/.test(configurator);
    facts.triggerTransitionControl =
        /data-slot="configurator-layer-trigger"[\s\S]{0,400}transition-control/.test(layer);
    facts.resetTransitionControl =
        /data-slot="configurator-reset"[\s\S]{0,400}transition-control/.test(row);
    if (!facts.chipTransitionControl)
        violations.push("(3) the preset chip does not resolve transition-control");
    if (!facts.triggerTransitionControl)
        violations.push("(3) the layer trigger does not resolve transition-control");
    if (!facts.resetTransitionControl)
        violations.push("(3) the row reset does not resolve transition-control");

    // (4) Semantic radius geometry — the chip + reset ride --radius-pill (rounded-pill);
    //     a one-off literal radius is forbidden.
    facts.chipSemanticRadius = /data-slot="configurator-preset"[\s\S]{0,400}rounded-pill/.test(
        configurator,
    );
    facts.resetSemanticRadius = /data-slot="configurator-reset"[\s\S]{0,400}rounded-pill/.test(row);
    if (!facts.chipSemanticRadius)
        violations.push("(4) the preset chip does not ride a semantic radius token (rounded-pill)");
    if (!facts.resetSemanticRadius)
        violations.push("(4) the row reset does not ride a semantic radius token (rounded-pill)");

    // (5) focus-ring on chip + trigger + reset (the four-state contract).
    facts.chipFocusRing = /data-slot="configurator-preset"[\s\S]{0,400}focus-ring/.test(
        configurator,
    );
    facts.triggerFocusRing = /data-slot="configurator-layer-trigger"[\s\S]{0,400}focus-ring/.test(
        layer,
    );
    facts.resetFocusRing = /data-slot="configurator-reset"[\s\S]{0,400}focus-ring/.test(row);
    if (!facts.chipFocusRing) violations.push("(5) the preset chip does not paint focus-ring");
    if (!facts.triggerFocusRing) violations.push("(5) the layer trigger does not paint focus-ring");
    if (!facts.resetFocusRing) violations.push("(5) the row reset does not paint focus-ring");

    // (6) data-slot coverage — six sub-surface roots.
    const slots = {
        configurator: /data-slot="configurator"/.test(configurator),
        "configurator-preset": /data-slot="configurator-preset"/.test(configurator),
        "configurator-layer": /data-slot="configurator-layer"/.test(layer),
        "configurator-layer-trigger": /data-slot="configurator-layer-trigger"/.test(layer),
        "configurator-row": /data-slot="configurator-row"/.test(row),
        "configurator-reset": /data-slot="configurator-reset"/.test(row),
    };
    facts.dataSlots = slots;
    for (const [name, present] of Object.entries(slots)) {
        if (!present) violations.push(`(6) data-slot="${name}" is absent`);
    }

    // (7) Arm 3 — the MOTION half. The section reveal + chevron animate on the fast
    //     snappy SPRING register (--spring-snappy), NOT a flat 200ms ease-out bezier.
    facts.revealSpring =
        /\.configurator-layer-region\s*{[^}]*transition:[^;]*grid-template-rows[^;]*var\(--spring-snappy\)/.test(
            layer,
        );
    facts.chevronSpring =
        /\.configurator-layer-chevron\s*{[^}]*transition:[^;]*transform[^;]*var\(--spring-snappy\)/.test(
            layer,
        );
    // the prior sluggish `transition-[grid-template-rows] duration-200 ease-out` Tailwind
    // chain on the region element must be GONE.
    facts.noFlatRevealBezier = !/configurator-layer-region[^>]*transition-\[grid-template-rows\][^>]*duration-200[^>]*ease-out/.test(
        layer,
    );
    if (!facts.revealSpring)
        violations.push(
            "(7) the section reveal does not animate on the fast snappy spring (--spring-snappy) — the D1 'faster/springier' motion half",
        );
    if (!facts.chevronSpring)
        violations.push("(7) the chevron rotation does not ride the --spring-snappy register");
    if (!facts.noFlatRevealBezier)
        violations.push(
            "(7) the section reveal still carries the flat `duration-200 ease-out` bezier (the sluggish read the user called out)",
        );
    // the PRM gate on the spring motion must be reachable.
    facts.revealPrmGated = /prefers-reduced-motion:\s*reduce[\s\S]*configurator-layer-region[\s\S]*transition:\s*none/.test(
        layer,
    ) || /configurator-layer-region[\s\S]*motion-reduce:transition-none/.test(layer) || /motion-reduce:transition-none[\s\S]*configurator-layer-region/.test(layer) || /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*\.configurator-layer-region/.test(layer);
    if (!facts.revealPrmGated)
        violations.push("(7) the spring reveal motion is not reachable under prefers-reduced-motion: reduce");

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:configurator-glass-atoms",
        facts,
        violations,
    });

    if (violations.length) {
        console.error("[proof:configurator-glass-atoms] FAIL\n  - " + violations.join("\n  - "));
        process.exit(1);
    }
    console.log("[proof:configurator-glass-atoms] PASS — glass-tier chip + press-spring + transition-control + semantic radius + focus-ring + 6 data-slots + the fast-spring reveal/chevron");
}

main();
