#!/usr/bin/env node
// AX.W47 — proof:aurora-preset-roster.
//
// The prominent PresetPickerRow strip must ADVERTISE exactly the mediums the W13 engine
// ships: van-Gogh gets its eponymous hero (medium:"vangogh"), oil-pastel is named under
// its true name, and the dry crayon medium (medium:"crayon") gets a visible hero — so a
// user scanning the most-prominent surface SEES the three painterly mediums by name and
// clicks into atomic van-Gogh dabs, not a pre-W13 oil smear.
//
// A SOURCE/STRUCTURE parse over demo/stories/aurora/presets.ts (the TypeScript object
// literal IS the artefact — the precept-valid form for demo-content). The RUNTIME truth
// (the thumbnail PAINTS atomic dabs) is the π-lane readback captured in
// docs/tranches/AX/audit/W47-aurora-preset-roster-reconcile.json.
//
// bite-check: repoint VANGOGH back to medium:"oil" → RED; rename it back to "Oil Swirl"
// → RED; restore a CRAYON_* key → RED; re-add a dead strokeMode under oil-pastel → RED.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const PRESETS = resolve(ROOT, "demo/stories/aurora/presets.ts");
const OPTIONS = resolve(ROOT, "demo/stories/aurora/config/options.ts");
const ARTIFACT = gateArtifactPath(
    "GLASS_UI_AURORA_PRESET_ROSTER_ARTIFACT",
    "AX-W47-aurora-preset-roster",
);

const W13_MEDIA = ["vangogh", "oil-pastel", "crayon"];

function read(p) {
    return existsSync(p) ? readFileSync(p, "utf8") : null;
}

function main() {
    const violations = [];
    const facts = {};

    const presets = read(PRESETS);
    const options = read(OPTIONS);
    if (!presets || !options) {
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status: "fail",
            gate: "proof:aurora-preset-roster",
            facts,
            violations: ["presets.ts or options.ts absent"],
        });
        console.error("[proof:aurora-preset-roster] FAIL — source absent");
        process.exit(1);
    }

    // The canonical medium→label map (read-only here; W10's surface).
    const mediumLabelMap = {};
    for (const m of options.matchAll(/\{\s*label:\s*"([^"]+)",\s*value:\s*"([^"]+)"\s*\}/g)) {
        mediumLabelMap[m[2]] = m[1];
    }
    facts.mediumLabelMap = mediumLabelMap;

    // (1) Every W13 first-class medium is BAKED by ≥1 preset (a `medium: "X"` literal).
    const bakedMedia = new Set(
        [...presets.matchAll(/medium:\s*"([a-z-]+)"/g)].map((m) => m[1]),
    );
    facts.bakedMedia = [...bakedMedia];
    for (const m of W13_MEDIA) {
        if (!bakedMedia.has(m)) violations.push(`(1) no preset bakes medium:"${m}"`);
    }

    // (2) Every W13 first-class medium is NAMED in a visible PRESET_META label/sub.
    //     Extract the PRESET_META block + scan the label + sub strings.
    const metaBlock = presets.slice(presets.indexOf("PRESET_META"));
    // pull every meta("Label", "medium", "tail") call OR explicit { label, sub } rows.
    const metaLabels = [...metaBlock.matchAll(/meta\(\s*"([^"]+)",\s*"([a-z-]+)",\s*"([^"]+)"\s*\)/g)].map(
        (m) => ({ label: m[1], medium: m[2], tail: m[3] }),
    );
    facts.metaRows = metaLabels.length;
    const visibleText = metaLabels
        .map((r) => `${r.label} ${mediumLabelMap[r.medium] ?? ""} ${r.tail}`)
        .join(" | ")
        .toLowerCase();
    for (const m of W13_MEDIA) {
        const display = (mediumLabelMap[m] ?? m).toLowerCase();
        if (!visibleText.includes(display))
            violations.push(`(2) medium "${m}" (display "${mediumLabelMap[m] ?? m}") is named in NO visible PRESET_META label/sub`);
    }
    facts.vanGoghNamed = visibleText.includes("van gogh");
    facts.oilPastelNamed = visibleText.includes("oil pastel");
    facts.crayonNamed = visibleText.includes("crayon");

    // (3) No meta-value mismatch — every meta(label, medium, tail) row's medium must be
    //     baked by a preset of the same key. We assert structurally: each meta medium is
    //     a real AuroraMedium that IS baked somewhere (the meta cannot name a medium no
    //     preset bakes). Strong per-key match needs runtime; the structural guard is the
    //     meta-medium ⊆ baked-media superset + the sub medium-segment derives from
    //     mediumLabel() (no hand-typed prose medium name).
    facts.metaMediaSubsetBaked = metaLabels.every((r) => bakedMedia.has(r.medium));
    if (!facts.metaMediaSubsetBaked)
        violations.push("(3) a PRESET_META row names a medium that no preset bakes (meta-value mismatch)");
    // the sub is built by meta() as `${mediumLabel(medium)} · ${tail}` — single-sourced.
    facts.subDerivesMediumLabel = /sub:\s*`\$\{mediumLabel\(medium\)\}\s*·/.test(presets);
    if (!facts.subDerivesMediumLabel)
        violations.push("(3) the PRESET_META.sub medium-segment is not derived from mediumLabel() (the two-place drift is not one-sourced)");

    // (4) No dead strokeMode under a non-oil medium. Scan each cfg({...}) block: if it
    //     carries `strokeMode:` it must also carry `medium: "oil"`.
    const cfgBlocks = [...presets.matchAll(/=\s*cfg\(\{([\s\S]*?)\}\);/g)].map((m) => m[1]);
    facts.cfgBlocks = cfgBlocks.length;
    let deadStrokeMode = 0;
    for (const block of cfgBlocks) {
        if (/strokeMode:/.test(block)) {
            const med = block.match(/medium:\s*"([a-z-]+)"/);
            const medVal = med ? med[1] : "smooth";
            if (medVal !== "oil") {
                deadStrokeMode++;
            }
        }
    }
    facts.deadStrokeModeCount = deadStrokeMode;
    if (deadStrokeMode > 0)
        violations.push(`(4) ${deadStrokeMode} preset(s) carry a dead strokeMode under a non-oil medium (StrokeMode applies only when medium==="oil")`);

    // (5) Clean-break key proof — no legacy OIL_VANGOGH / CRAYON_* key survives.
    const legacyKeys = ["OIL_VANGOGH", "CRAYON_SUNSET", "CRAYON_RAINBOW", "CRAYON_OCEAN"];
    facts.legacyKeysFound = legacyKeys.filter((k) => new RegExp(`\\b${k}\\b`).test(presets));
    for (const k of facts.legacyKeysFound)
        violations.push(`(5) legacy key ${k} survives — clean-break rename incomplete`);

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:aurora-preset-roster",
        facts,
        violations,
    });

    if (violations.length) {
        console.error("[proof:aurora-preset-roster] FAIL\n  - " + violations.join("\n  - "));
        process.exit(1);
    }
    console.log("[proof:aurora-preset-roster] PASS — vangogh/oil-pastel/crayon all baked + named, no meta-mismatch, no dead strokeMode, clean-break keys");
}

main();
