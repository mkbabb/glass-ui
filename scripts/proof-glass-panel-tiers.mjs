#!/usr/bin/env node
// AW.W12 — the per-rung GlassPanel tier gate (proof:glass-panel-tiers).
//
// The svg-filter branch returned `glass-panel glass-panel--svg` for ALL
// variants and the scoped CSS painted the SINGLE `--glass-bg-wash` rung onto
// every panel — the five-rung ladder collapsed to one surface in the tier
// Chromium detects by default. The fallback branch did the same with the
// single `--glass-bg-floating`. The fix threads `props.variant` onto a
// `data-variant` attr and the scoped CSS reads `--glass-bg-{variant}` per rung.
//
// This is a SEAM assertion (a pure read-and-detect over the SFC source), NOT a
// live computed-style probe — happy-dom does not resolve scoped CSS custom
// properties through `getComputedStyle`, so a computed-background diff is not
// assertable headless. The render-level per-variant `data-variant` emission is
// covered by the companion Vitest mount test
// (tests/components/custom/glass-panel/GlassPanel.test.ts); this gate locks the
// CSS half — five DISTINCT `--glass-bg-{variant}` rungs per tier.
//
// bite-check: revert any svg-filter or fallback rung back to the single
// `--glass-bg-wash`/`--glass-bg-floating` → the distinct-rung count drops below
// five and the gate reddens.

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

const VARIANTS = ["wash", "quiet", "resting", "floating", "overlay"];

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        PANEL: resolve(ROOT, "src/components/custom/glass-panel/GlassPanel.vue"),
        STORY_PANEL: resolve(ROOT, "demo/stories/substrates/glass-panel.vue"),
        STORY_CARD: resolve(ROOT, "demo/stories/primitives/card.vue"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_GLASS_PANEL_TIERS_ARTIFACT",
            "AW-glass-panel-tiers",
        ),
    };
    return _cliPaths;
}

/**
 * For a given tier-class prefix (`glass-panel--svg` / `glass-panel--fallback`),
 * collect the set of distinct `--glass-bg-*` rung tokens the scoped CSS reads
 * via the `[data-variant="…"]` per-rung rules.
 */
function distinctRungsForTier(src, tierClass) {
    const rungs = new Set();
    for (const variant of VARIANTS) {
        // `.glass-panel--<tier>[data-variant="<variant>"] { … background: var(--glass-bg-<rung>) … }`
        const ruleRe = new RegExp(
            `\\.${tierClass}\\[data-variant="${variant}"\\][^{]*\\{([^}]*)\\}`,
        );
        const m = src.match(ruleRe);
        if (!m) continue;
        const bg = m[1].match(/background:\s*var\((--glass-bg-[a-z]+)\)/);
        if (bg) rungs.add(bg[1]);
    }
    return rungs;
}

function run() {
    const { ROOT, PANEL, STORY_PANEL, STORY_CARD, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    if (!existsSync(PANEL)) {
        violations.push("GlassPanel.vue is absent");
    } else {
        const src = stripComments(readFileSync(PANEL, "utf8"));

        // The template root must emit the `data-variant` attr so the scoped CSS
        // can key the per-rung background off it.
        facts.emitsDataVariant = /:data-variant="props\.variant"/.test(src);
        if (!facts.emitsDataVariant) {
            violations.push(
                "GlassPanel.vue does not bind `:data-variant=\"props.variant\"` on the root — the svg/fallback tiers cannot resolve a per-rung background",
            );
        }

        // ── svg-filter tier — five DISTINCT --glass-bg-{variant} rungs.
        const svgRungs = distinctRungsForTier(src, "glass-panel--svg");
        facts.svgDistinctRungs = svgRungs.size;
        facts.svgRungs = [...svgRungs];
        if (svgRungs.size < 5) {
            violations.push(
                `the svg-filter tier resolves ${svgRungs.size}/5 distinct --glass-bg rungs — the per-rung ladder did not land (pre-fix all five collapsed onto --glass-bg-wash)`,
            );
        }

        // ── fallback tier — five DISTINCT --glass-bg-{variant} rungs.
        const fbRungs = distinctRungsForTier(src, "glass-panel--fallback");
        facts.fallbackDistinctRungs = fbRungs.size;
        facts.fallbackRungs = [...fbRungs];
        if (fbRungs.size < 5) {
            violations.push(
                `the fallback tier resolves ${fbRungs.size}/5 distinct --glass-bg rungs — the per-rung ladder did not land (pre-fix all five collapsed onto --glass-bg-floating)`,
            );
        }
    }

    // ── the two stories stage a SHIPPED backdrop (no hand-rolled gradient).
    function staysOverShippedBackdrop(label, path) {
        if (!existsSync(path)) {
            violations.push(`the ${label} story is absent`);
            return;
        }
        const raw = readFileSync(path, "utf8");
        const src = stripComments(raw);
        const importsSubstrate =
            /from\s+["'][^"']*\/(?:aurora|paper-backdrop)["']/.test(src) &&
            /<Aurora|<PaperBackdrop/.test(src);
        // A hand-rolled gradient/backdrop literal `background:` inline style on a
        // story element is the anti-pattern the wave abrogates.
        const handRolledBackdrop =
            /style="background:\s*radial-gradient|style="background:\s*linear-gradient/.test(
                src,
            );
        facts[`${label}ImportsSubstrate`] = importsSubstrate;
        facts[`${label}HandRolledBackdrop`] = handRolledBackdrop;
        if (!importsSubstrate) {
            violations.push(
                `the ${label} story does not stage a shipped Aurora/PaperBackdrop substrate behind the ladder`,
            );
        }
        if (handRolledBackdrop) {
            violations.push(
                `the ${label} story still declares a hand-rolled gradient backdrop literal — it must consume the shipped substrate`,
            );
        }
    }
    staysOverShippedBackdrop("glassPanel", STORY_PANEL);
    staysOverShippedBackdrop("card", STORY_CARD);

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:glass-panel-tiers",
        facts,
        violations,
    });

    console.log(
        "proof:glass-panel-tiers — GlassPanel honors variant per-rung in every tier; demos stage a shipped backdrop (AW.W12)",
    );
    console.log(
        `  svg-filter distinct rungs : ${facts.svgDistinctRungs ?? 0}/5   (${(facts.svgRungs ?? []).join(", ")})`,
    );
    console.log(
        `  fallback distinct rungs   : ${facts.fallbackDistinctRungs ?? 0}/5   (${(facts.fallbackRungs ?? []).join(", ")})`,
    );
    console.log(
        `  glass-panel backdrop      : ${facts.glassPanelImportsSubstrate ? "shipped ✓" : "NO ✗"}   card backdrop: ${facts.cardImportsSubstrate ? "shipped ✓" : "NO ✗"}`,
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
