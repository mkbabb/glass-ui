#!/usr/bin/env node
// AW.W22 — the unified glass-material gate (proof:glass-material-unified).
//
// At HEAD the moving-specular `::before` + the `--glass-edge-light` rim were
// opt-in on three components only (Button glass, DockIconButton, Card) + wired
// onto the floating tier only, so the floating/overlay/dialog/sheet/popover
// band carried the ladder alpha+blur but NOT the catch-light or the rim. W22
// promotes BOTH atoms into ONE `.glass-material` mixin the five rungs + card +
// the `.dock-icon-button` control compose, retiring the per-component opt-ins.
//
// This is a SEAM assertion (a read-and-detect over the CSS + SFC source), NOT a
// live computed-style probe — happy-dom does not resolve scoped pseudo-element
// custom properties through getComputedStyle, so the band-uniformity is proven
// at the source level: every named surface is an entry in the ONE `.glass-material`
// `::before` (specular) selector group AND the ONE rim group, and the per-
// component opt-in strings are retired.
//
// bite-check: drop a band surface from the `.glass-material::before` group, or
// re-add the `glass-specular-track` opt-in to the Button glass variant → the
// gate reddens.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

/** Strip line + block comments so a clause cannot be satisfied by a comment. */
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

// The band SURFACES the unified material must reach (the five ladder rungs +
// the card register) PLUS the `.dock-icon-button` CONTROL. The `.glass-dock`
// shell is OUT of the matrix by design (it keeps its parallel hand-rolled
// surface — the dock arm owns it).
const BAND_SELECTORS = [
    ".glass-wash",
    ".glass-quiet",
    ".glass-resting",
    ".glass-floating",
    ".glass-overlay",
    ".glass-card",
    ".dock-icon-button",
];

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        GLASS: resolve(ROOT, "src/styles/glass.css"),
        SPECULAR: resolve(ROOT, "src/styles/glass-specular-track.css"),
        BUTTON: resolve(ROOT, "src/components/ui/button/index.ts"),
        STORY: resolve(ROOT, "demo/stories/substrates/glass-material.vue"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_GLASS_MATERIAL_UNIFIED_ARTIFACT",
            "AW-glass-material-unified",
        ),
    };
    return _cliPaths;
}

/**
 * Extract the selector list of the FIRST rule whose body contains `bodyNeedle`
 * and whose selector list contains `anchorSelector`. Returns the raw selector
 * text (everything before the `{`).
 */
function selectorListContaining(src, anchorSelector, bodyNeedle) {
    // Match `<selectors> { <body> }` blocks; find the one whose selectors carry
    // the anchor and whose body carries the needle.
    const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
    let m;
    while ((m = ruleRe.exec(src))) {
        const selectors = m[1];
        const body = m[2];
        if (selectors.includes(anchorSelector) && body.includes(bodyNeedle)) {
            return selectors;
        }
    }
    return null;
}

function run() {
    const { ROOT, GLASS, SPECULAR, BUTTON, STORY, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    if (!existsSync(GLASS)) {
        violations.push("glass.css is absent");
    } else {
        const css = stripComments(readFileSync(GLASS, "utf8"));

        // ── 1. The unified specular `::before` group reaches every band surface.
        // The group is the rule whose body carries the masked radial-gradient
        // (`mask-image: radial-gradient`) — the moving-specular body.
        const specularSel = selectorListContaining(
            css,
            ".glass-material::before",
            "mask-image: radial-gradient",
        );
        facts.specularGroupFound = Boolean(specularSel);
        if (!specularSel) {
            violations.push(
                "no `.glass-material::before` rule carrying the masked-radial moving-specular body — the unified specular source is absent",
            );
        } else {
            const missing = BAND_SELECTORS.filter(
                (s) => !specularSel.includes(`${s}::before`),
            );
            facts.specularMissingSurfaces = missing;
            if (missing.length) {
                violations.push(
                    `the unified specular ::before group is missing band surface(s): ${missing.join(", ")} — the catch-light is not band-uniform`,
                );
            }
        }

        // ── 2. The single specular SOURCE — the masked-radial body lives in
        // exactly ONE place (the `.glass-material::before` group). The specular
        // track file must NOT carry a duplicate masked-radial `::before` body.
        const glassSpecularBodies = (
            css.match(/mask-image:\s*radial-gradient/g) || []
        ).length;
        facts.glassMaskedRadialCount = glassSpecularBodies;

        // ── 3. The unified rim reaches every band surface (the rim var group).
        const rimSel = selectorListContaining(
            css,
            ".glass-material",
            "--glass-material-rim",
        );
        facts.rimGroupFound = Boolean(rimSel);
        if (!rimSel) {
            violations.push(
                "no `.glass-material { --glass-material-rim: … }` group — the unified rim source is absent",
            );
        } else {
            const missing = BAND_SELECTORS.filter((s) => !rimSel.includes(s));
            facts.rimMissingSurfaces = missing;
            if (missing.length) {
                violations.push(
                    `the unified rim group is missing band surface(s): ${missing.join(", ")} — the edge-light is not band-uniform`,
                );
            }
        }

        // ── 4. Each rung composes the rim var into its box-shadow stack.
        for (const rung of ["wash", "quiet", "resting", "floating", "overlay"]) {
            const ruleRe = new RegExp(
                `\\.glass-${rung}\\s*\\{([^}]*)\\}`,
            );
            const rm = css.match(ruleRe);
            const composes = rm && /var\(--glass-material-rim\)/.test(rm[1]);
            facts[`${rung}ComposesRim`] = Boolean(composes);
            if (!composes) {
                violations.push(
                    `.glass-${rung} does not compose var(--glass-material-rim) into its box-shadow — the rim is not band-uniform`,
                );
            }
        }

        // ── 5. Interaction-light lockstep — the `::before` intensity lifts on
        // :hover / :active (the same rungs the press squish keys off).
        facts.hoverLift = /:hover::before[\s\S]*?--specular-intensity:\s*0\.6/.test(
            css,
        );
        facts.activeLift = /:active::before[\s\S]*?--specular-intensity:\s*0\.85/.test(
            css,
        );
        if (!facts.hoverLift || !facts.activeLift) {
            violations.push(
                "the specular intensity does not lift on :hover/:active — the interaction-light is not in lockstep with the press",
            );
        }
    }

    // ── 6. The specular `::before` body lives in exactly ONE place. The
    // specular-track file must be a thin alias (NO duplicate masked-radial body).
    if (existsSync(SPECULAR)) {
        const specCss = stripComments(readFileSync(SPECULAR, "utf8"));
        const dupBody = (specCss.match(/mask-image:\s*radial-gradient/g) || [])
            .length;
        facts.specularTrackDuplicateBody = dupBody;
        if (dupBody > 0) {
            violations.push(
                `glass-specular-track.css still carries ${dupBody} masked-radial ::before body block(s) — the specular must live in ONE place (the .glass-material mixin); the track file is a thin alias`,
            );
        }
    }

    // ── 7. The per-component opt-in is retired off the Button glass variants.
    if (existsSync(BUTTON)) {
        const btn = readFileSync(BUTTON, "utf8");
        // The two glass variant strings must NOT carry `glass-specular-track`.
        const glassVariantLines = btn
            .split("\n")
            .filter((l) => /glass-wash/.test(l) && /text-foreground/.test(l));
        const opted = glassVariantLines.filter((l) =>
            /glass-specular-track/.test(l),
        );
        facts.buttonOptInRetired = opted.length === 0;
        if (opted.length) {
            violations.push(
                "the Button glass/glass-wash variant still carries the `glass-specular-track` opt-in — it must inherit the specular from the ladder rung",
            );
        }
    }

    // ── 8. The demo stages the band over a SHIPPED backdrop (no hand-roll).
    if (!existsSync(STORY)) {
        violations.push(
            "demo/stories/substrates/glass-material.vue is absent — the band matrix is not staged",
        );
    } else {
        const story = readFileSync(STORY, "utf8");
        const importsSubstrate =
            /from\s+["'][^"']*\/(?:aurora|paper-backdrop)["']/.test(story) &&
            /<Aurora|<PaperBackdrop/.test(story);
        const handRolled =
            /style="background:\s*radial-gradient|style="background:\s*linear-gradient/.test(
                story,
            );
        facts.storyImportsSubstrate = importsSubstrate;
        facts.storyHandRolledBackdrop = handRolled;
        if (!importsSubstrate) {
            violations.push(
                "the glass-material story does not stage a shipped Aurora/PaperBackdrop substrate behind the band",
            );
        }
        if (handRolled) {
            violations.push(
                "the glass-material story declares a hand-rolled gradient backdrop literal — it must consume the shipped substrate",
            );
        }
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:glass-material-unified",
        facts,
        violations,
    });

    console.log(
        "proof:glass-material-unified — ONE .glass-material mixin carries the moving-specular + edge-rim across the band (AW.W22)",
    );
    console.log(
        `  specular group      : ${facts.specularGroupFound ? "found" : "ABSENT"}   missing surfaces: ${(facts.specularMissingSurfaces ?? []).join(", ") || "none"}`,
    );
    console.log(
        `  rim group           : ${facts.rimGroupFound ? "found" : "ABSENT"}   missing surfaces: ${(facts.rimMissingSurfaces ?? []).join(", ") || "none"}`,
    );
    console.log(
        `  single specular src : track-file dup bodies = ${facts.specularTrackDuplicateBody ?? "n/a"}`,
    );
    console.log(
        `  button opt-in retired: ${facts.buttonOptInRetired ? "yes ✓" : "NO ✗"}`,
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

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
