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

        // ── 5. Interaction-light lockstep, TOKENIZED (AX.W09). The `::before`
        // intensity reads the `--glass-specular-intensity-{rest,hover,active}`
        // token cohort (NOT the retired `0.35`/`0.6`/`0.85` literals) so the
        // subtle-vs-extreme magnitude is a single overridable knob. The rest rung
        // reads the cohort default so a static unwired surface is CLEAN (the
        // @property `initial-value: 0` dormancy is no longer defeated by a floor).
        facts.restReadsToken =
            /--specular-intensity:\s*var\(\s*--glass-specular-intensity-rest/.test(
                css,
            );
        facts.hoverReadsToken =
            /:hover::before[\s\S]*?--specular-intensity:\s*var\(\s*--glass-specular-intensity-hover/.test(
                css,
            );
        facts.activeReadsToken =
            /:active::before[\s\S]*?--specular-intensity:\s*var\(\s*--glass-specular-intensity-active/.test(
                css,
            );
        if (
            !facts.restReadsToken ||
            !facts.hoverReadsToken ||
            !facts.activeReadsToken
        ) {
            violations.push(
                "the specular intensity does not read the `--glass-specular-intensity-{rest,hover,active}` token cohort on rest/:hover/:active — the magnitude is not the single overridable token (AX.W09)",
            );
        }

        // ── 5b. The retired literals are GONE — the rest floor is not an
        // unconditional `0.35`, and the hover/active rungs are not the bare
        // `0.6`/`0.85` literals (a deletion-proof the tune actually landed).
        facts.retiredRestFloor = /--specular-intensity:\s*0\.35\b/.test(css);
        facts.retiredHoverLiteral =
            /:hover::before[\s\S]*?--specular-intensity:\s*0\.6\b/.test(css);
        facts.retiredActiveLiteral =
            /:active::before[\s\S]*?--specular-intensity:\s*0\.85\b/.test(css);
        if (
            facts.retiredRestFloor ||
            facts.retiredHoverLiteral ||
            facts.retiredActiveLiteral
        ) {
            violations.push(
                "a retired literal specular magnitude (rest 0.35 / hover 0.6 / active 0.85) is still present — the tune must read the token cohort, not the buried literal (AX.W09)",
            );
        }

        // ── 5c. Warm-cream, NOT pure-white. The `.glass-material::before` inner
        // radial stop must NOT be pure white (`hsl(40 30% 100%)`, L=100% — the
        // blown-out core); L must be < 100% so the warm hue survives.
        const pureWhiteCore = /hsl\(\s*40\s+30%\s+100%/.test(css);
        facts.pureWhiteSpecularCore = pureWhiteCore;
        // The recipe must carry a warm-cream stop at L < 100% (hsl with the warm
        // hue ~40 and a lightness below 100).
        facts.warmCreamCore = /hsl\(\s*40\s+\d+%\s+9[0-9]%/.test(css);
        if (pureWhiteCore || !facts.warmCreamCore) {
            violations.push(
                "the `.glass-material::before` inner gradient stop is pure-white (hsl(40 30% 100%)) or carries no warm-cream L<100% stop — the catch-light blows out under the screen blend (AX.W09)",
            );
        }
    }

    // ── 5d. The token cohort is MINTED in tokens.css (+ a `.dark` arm). The
    // magnitude is an overridable `:root` cohort, not three buried literals.
    const TOKENS = resolve(ROOT, "src/styles/tokens.css");
    if (!existsSync(TOKENS)) {
        violations.push("tokens.css is absent");
    } else {
        const tok = stripComments(readFileSync(TOKENS, "utf8"));
        for (const rung of ["rest", "hover", "active"]) {
            const minted = new RegExp(
                `--glass-specular-intensity-${rung}\\s*:`,
            ).test(tok);
            facts[`token_${rung}Minted`] = minted;
            if (!minted) {
                violations.push(
                    `--glass-specular-intensity-${rung} is not minted in tokens.css — the magnitude cohort is incomplete (AX.W09)`,
                );
            }
        }
        // The `.dark` arm re-tunes at least one interaction rung.
        facts.tokenDarkArm =
            /\.dark\s*\{[^}]*--glass-specular-intensity-(?:hover|active)\s*:/.test(
                tok,
            );
        if (!facts.tokenDarkArm) {
            violations.push(
                "the `.dark` arm does not re-tune the `--glass-specular-intensity-*` cohort — the dark-canvas softening is not on the cascade (AX.W09)",
            );
        }
        // The SUBTLE magnitude: the light-mode rest rung is 0 (clean static
        // plate), and hover/active are ≤ half the retired `0.6`/`0.85`.
        const restM = tok.match(/--glass-specular-intensity-rest\s*:\s*([\d.]+)/);
        const hoverM = tok.match(
            /--glass-specular-intensity-hover\s*:\s*([\d.]+)/,
        );
        const activeM = tok.match(
            /--glass-specular-intensity-active\s*:\s*([\d.]+)/,
        );
        const restV = restM ? Number(restM[1]) : NaN;
        const hoverV = hoverM ? Number(hoverM[1]) : NaN;
        const activeV = activeM ? Number(activeM[1]) : NaN;
        facts.subtleRest = restV;
        facts.subtleHover = hoverV;
        facts.subtleActive = activeV;
        if (!(restV <= 0.08)) {
            violations.push(
                `rest rung ${restV} is not ≈ 0 (≤ 0.08) — the static plate is not clean (AX.W09)`,
            );
        }
        if (!(hoverV <= 0.3)) {
            violations.push(
                `hover rung ${hoverV} is not subtle (≤ 0.30, ≤ half the retired 0.6) (AX.W09)`,
            );
        }
        if (!(activeV <= 0.425)) {
            violations.push(
                `active rung ${activeV} is not subtle (≤ 0.425, ≤ half the retired 0.85) (AX.W09)`,
            );
        }
    }

    // ── 5e. ONE dock catch-light owner. The dock control's SECOND specular (the
    // `:hover:not(:focus-visible)` `--glass-highlight` box-shadow) is RETIRED —
    // a deletion-proof over dock-controls.css.
    const DOCK_CONTROLS = resolve(ROOT, "src/styles/dock-controls.css");
    if (existsSync(DOCK_CONTROLS)) {
        const dock = stripComments(readFileSync(DOCK_CONTROLS, "utf8"));
        const dockSecondSpecular =
            /:hover[^{]*:not\(:focus-visible\)[^{]*\{[^}]*box-shadow:[^}]*--glass-highlight/.test(
                dock,
            ) ||
            /:hover[^{]*:not\(:focus-visible\)[^{]*\{[^}]*--dock-icon-hover-shadow/.test(
                dock,
            );
        facts.dockSecondSpecularRetired = !dockSecondSpecular;
        if (dockSecondSpecular) {
            violations.push(
                "the dock control still applies the `:hover:not(:focus-visible)` `--glass-highlight` box-shadow — the second catch-light is not retired (AX.W09)",
            );
        }
    }

    // ── 5f. DRY composable — the inline `trackSpecular` is GONE from Card.vue +
    // DockIconButton.vue (a deletion-proof: `useSpecularTracking` is the sole
    // home). And the Card `specular` prop produces three DISTINCT registers
    // (off|subtle|full).
    const CARD = resolve(ROOT, "src/components/ui/card/Card.vue");
    const DOCK_ICON = resolve(
        ROOT,
        "src/components/custom/dock/DockIconButton.vue",
    );
    const COMPOSABLE = resolve(
        ROOT,
        "src/composables/glass/useSpecularTracking.ts",
    );
    facts.composableExists = existsSync(COMPOSABLE);
    if (!facts.composableExists) {
        violations.push(
            "src/composables/glass/useSpecularTracking.ts is absent — the DRY pointer seam was not extracted (AX.W09)",
        );
    }
    for (const [label, path] of [
        ["Card.vue", CARD],
        ["DockIconButton.vue", DOCK_ICON],
    ]) {
        if (!existsSync(path)) continue;
        const sfc = readFileSync(path, "utf8");
        const inlineCopy = /function\s+trackSpecular\s*\(/.test(sfc);
        const usesComposable = /useSpecularTracking\s*\(/.test(sfc);
        facts[`${label}_inlineTrackSpecularGone`] = !inlineCopy;
        facts[`${label}_usesComposable`] = usesComposable;
        if (inlineCopy) {
            violations.push(
                `${label} still declares an inline \`trackSpecular\` — it must consume useSpecularTracking() (AX.W09 DRY)`,
            );
        }
        if (!usesComposable) {
            violations.push(
                `${label} does not call useSpecularTracking() — the DRY pointer seam is not the sole home (AX.W09)`,
            );
        }
    }

    // The Card `specular` prop carries three DISTINCT registers (off|subtle|full).
    if (existsSync(CARD)) {
        const cardSrc = readFileSync(CARD, "utf8");
        const hasType =
            /CardSpecular\s*=\s*["']off["']\s*\|\s*["']subtle["']\s*\|\s*["']full["']/.test(
                cardSrc,
            );
        // `full` overrides the intensity tokens (a distinct brighter rung set);
        // `off` arms nothing; `subtle` rides the ladder defaults.
        const fullDistinct =
            /full[\s\S]*?--glass-specular-intensity-(?:rest|hover|active)/.test(
                cardSrc,
            );
        const offClean = /specular\s*!==?\s*["']off["']/.test(cardSrc);
        facts.cardSpecularType = hasType;
        facts.cardSpecularFullDistinct = fullDistinct;
        facts.cardSpecularOffClean = offClean;
        if (!hasType) {
            violations.push(
                "Card does not declare `CardSpecular = 'off' | 'subtle' | 'full'` — the three-register opt-in is absent (AX.W09)",
            );
        }
        if (!fullDistinct || !offClean) {
            violations.push(
                "the Card `specular` prop does not produce three DISTINCT intensity registers (off clean / subtle ladder / full brighter override) (AX.W09)",
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
    console.log(
        `  AX.W09 token cohort : rest=${facts.subtleRest ?? "?"} hover=${facts.subtleHover ?? "?"} active=${facts.subtleActive ?? "?"} (minted: rest=${facts.token_restMinted ? "✓" : "✗"} hover=${facts.token_hoverMinted ? "✓" : "✗"} active=${facts.token_activeMinted ? "✓" : "✗"}; dark-arm=${facts.tokenDarkArm ? "✓" : "✗"})`,
    );
    console.log(
        `  AX.W09 reads tokens : rest=${facts.restReadsToken ? "✓" : "✗"} hover=${facts.hoverReadsToken ? "✓" : "✗"} active=${facts.activeReadsToken ? "✓" : "✗"}; warm-cream=${facts.warmCreamCore ? "✓" : "✗"} pure-white=${facts.pureWhiteSpecularCore ? "PRESENT ✗" : "gone ✓"}`,
    );
    console.log(
        `  AX.W09 one-owner+DRY: dock 2nd-specular retired=${facts.dockSecondSpecularRetired ? "✓" : "✗"}; composable=${facts.composableExists ? "✓" : "✗"}; Card-specular-3-register=${facts.cardSpecularType && facts.cardSpecularFullDistinct ? "✓" : "✗"}`,
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
