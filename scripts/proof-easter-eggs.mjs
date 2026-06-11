#!/usr/bin/env node
// AY.W-EGG §6 — the easter-egg gate (proof:easter-eggs).
//
// The storybook ships FOUR live substrates but no delight shelf — FD-storybook
// §5 confirmed (grep + runtime) no konami, no seasonal, no hidden interactions.
// W-EGG lands SIX divined eggs, each a COMPOSITION of shipped machinery, each
// `prefers-reduced-motion`-gated. This gate is the SOURCE-WITNESS half: each
// egg's seam EXISTS + carries its PRM fence. The π-readback half (each egg
// FIRING on the live demo) rides the W-EGG DELTA capture.
//
// The six eggs (each born-RED at HEAD: the interaction produced no reaction):
//   E1 ℱ-redraw     — dftFromPoints (the forward DFT sibling of positionsAt) +
//                      the FRedrawOverlay; the wordmark dispatches the redraw.
//   E2 konami       — the konami buffer detector → the full-bleed Aurora reveal.
//   E3 cmd+K        — the shell mounts the shipped CommandDialog, ⌘K-bound.
//   E4 mascot + 404 — the empty-states GooBlob mascot + the 404 constellation.
//   E5 eclipse      — the DarkModeToggle long-press slow-eclipse register (opt-in).
//   E6 eclipse seam — the DarkModeToggle eclipse register (the affordance E5 hangs
//                     off) survives in the component. AZ.W-SHELL-CONFIG removed the
//                     STANDALONE shell-rail DarkModeToggle (the dark control's single
//                     chrome home is now the configurator Switch), so E6 no longer
//                     anchors on the rail mount — it anchors on the component's
//                     `eclipse` register, the source-of-truth home of the affordance.
//
// House style mirrors proof-substrate-staging.mjs: a pure exported detector, a
// byte-stable JSON artefact via gate-output, a human summary, process.exit(1).
//
// Bite: drop dftFromPoints → E1 reds; unbind ⌘K → E3 reds; remove the PRM media
// query from an egg overlay → that egg's PRM fence reds.

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { ROOT } from "./constellation.mjs";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ARTIFACT = gateArtifactPath(
    "GLASS_UI_EASTER_EGGS_ARTIFACT",
    "AY-easter-eggs",
);

function read(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : null;
}

/**
 * The pure detector. Inputs: a map of {key → source string|null}. Returns
 * { facts, violations } — each egg's seam + its PRM fence asserted.
 */
export function detectEggs(src) {
    const violations = [];
    const seams = {};

    function assert(eggId, label, ok) {
        seams[`${eggId}:${label}`] = ok;
        if (!ok) {
            violations.push(`${eggId}: ${label} — seam absent`);
        }
        return ok;
    }

    // ── E1 — the ℱ wordmark Fourier redraw ──────────────────────────────────
    // dftFromPoints is the forward DFT (general points→spectrum, the inverse of
    // the shipped positionsAt). The overlay reconstructs the glyph; the wordmark
    // dispatches the redraw event.
    assert("E1", "dftFromPoints", /export function dftFromPoints/.test(src.math ?? ""));
    assert("E1", "fGlyphPoints", /export function fGlyphPoints/.test(src.fpoints ?? ""));
    assert(
        "E1",
        "redraw-overlay",
        /dftFromPoints/.test(src.fredraw ?? "") &&
            /positionsAt/.test(src.fredraw ?? ""),
    );
    assert(
        "E1",
        "wordmark-trigger",
        /glass-ui-demo:f-redraw/.test(src.rail ?? "") &&
            /useLongPress/.test(src.rail ?? ""),
    );
    // E1 PRM fence — the overlay paints the completed curve once under reduce.
    assert(
        "E1",
        "prm-fence",
        /prefers-reduced-motion/.test(src.fredraw ?? "") &&
            /prefersReduced/.test(src.fredraw ?? ""),
    );

    // ── E2 — konami → full-bleed aurora ─────────────────────────────────────
    assert("E2", "konami-detector", /ArrowUp/.test(src.konami ?? "") && /useKonami/.test(src.konami ?? ""));
    assert(
        "E2",
        "shell-wires-konami",
        /useKonami/.test(src.shell ?? "") && /KonamiAurora/.test(src.shell ?? ""),
    );
    assert(
        "E2",
        "aurora-reveal",
        /Aurora/.test(src.konamiAurora ?? "") &&
            /opacity-ceiling="1"|:opacity-ceiling="1"/.test(src.konamiAurora ?? ""),
    );
    // E2 PRM fence — static aurora frame under reduce (no fade drift).
    assert(
        "E2",
        "prm-fence",
        /prefers-reduced-motion/.test(src.konamiAurora ?? ""),
    );

    // ── E3 — cmd+K command palette (first-class) ────────────────────────────
    assert(
        "E3",
        "command-palette",
        /CommandDialog/.test(src.palette ?? "") &&
            /CATEGORIES/.test(src.palette ?? "") &&
            /router\.push/.test(src.palette ?? ""),
    );
    assert(
        "E3",
        "shell-mounts-palette",
        /CommandPalette/.test(src.shell ?? "") &&
            /mod\+k/.test(src.shell ?? ""),
    );
    // E3 — navigation MUST work under reduce (only open/close is motion-gated).
    // The seam is that the shortcut is registered allowInInput (works anywhere)
    // — its PRM behaviour is the dialog grammar, not a suppress.
    assert("E3", "prm-nav-works", /allowInInput:\s*true/.test(src.shell ?? ""));

    // ── E4 — GooBlob empty-state mascot + the 404 ───────────────────────────
    assert(
        "E4",
        "mascot",
        /GooBlob/.test(src.empty ?? "") &&
            /empty-states-mascot/.test(src.empty ?? ""),
    );
    assert(
        "E4",
        "404-route",
        /NotFound/.test(src.router ?? "") &&
            /pathMatch/.test(src.router ?? ""),
    );
    assert(
        "E4",
        "404-constellation",
        /Constellation/.test(src.notFound ?? "") &&
            /lattice/i.test(src.notFound ?? ""),
    );
    // E4 PRM fence — the blob/constellation substrates PRM-freeze natively
    // (useWebGLCanvas / the constellation warpOnClick auto-off). The 404 uses
    // warp-on-click which is auto-off under reduce; the seam is the warp prop.
    assert(
        "E4",
        "prm-fence",
        /warp-on-click|warpOnClick/.test(src.notFound ?? ""),
    );

    // ── E5 — long-press dark toggle → slow eclipse (opt-in, default unchanged) ─
    assert(
        "E5",
        "eclipse-opt-in",
        /eclipse\?:\s*boolean/.test(src.darkToggle ?? "") &&
            /data-eclipsing/.test(src.darkToggle ?? ""),
    );
    assert(
        "E5",
        "long-press",
        /onEclipseDown/.test(src.darkToggle ?? "") &&
            /pressTimer/.test(src.darkToggle ?? ""),
    );
    // E5 PRM fence — under reduce the eclipse flips instantly (no animation).
    assert(
        "E5",
        "prm-fence",
        /prefers-reduced-motion/.test(src.darkToggle ?? "") &&
            /prefersReduced/.test(src.darkToggle ?? ""),
    );
    // E5 default-path canary — the eclipse is opt-in; default false.
    assert("E5", "default-off", /eclipse:\s*false/.test(src.darkToggle ?? ""));

    // ── E6 — the eclipse register (the affordance E5 hangs off) ─────────────
    // AZ.W-SHELL-CONFIG removed the STANDALONE shell-rail DarkModeToggle (the dark
    // control's single chrome home is now the glass-ui demo Configurator's Switch).
    // E6 therefore anchors on the COMPONENT's `eclipse` register — the source-of-truth
    // home of the long-press slow-eclipse affordance — not the (removed) rail mount.
    assert(
        "E6",
        "eclipse-register",
        /eclipse/.test(src.darkToggle ?? ""),
    );

    const seamCount = Object.keys(seams).length;
    const passCount = Object.values(seams).filter(Boolean).length;

    return {
        facts: {
            eggs: ["E1", "E2", "E3", "E4", "E5", "E6"],
            seamCount,
            passCount,
            seams,
        },
        violations,
    };
}

function run() {
    const src = {
        math: read("src/components/custom/fourier-field/math.ts"),
        fpoints: read("demo/eggs/fGlyphPoints.ts"),
        fredraw: read("demo/eggs/FRedrawOverlay.vue"),
        konami: read("demo/eggs/useKonami.ts"),
        konamiAurora: read("demo/eggs/KonamiAurora.vue"),
        palette: read("demo/eggs/CommandPalette.vue"),
        notFound: read("demo/eggs/NotFound.vue"),
        shell: read("demo/layout/AppShell.vue"),
        rail: read("demo/layout/SidebarDock.vue"),
        empty: read("demo/stories/compositions/empty-states.vue"),
        router: read("demo/router.ts"),
        darkToggle: read("src/components/custom/controls/DarkModeToggle.vue"),
    };

    // Self-proof: a synthetic egg with an absent seam MUST be flagged.
    const probe = detectEggs({ ...src, math: "" });
    const selfProofOk = probe.violations.some((v) => v.startsWith("E1:"));

    const { facts, violations } = detectEggs(src);
    if (!selfProofOk) {
        violations.push(
            "SELF-PROOF: the detector failed to flag a synthetic missing-seam egg — the gate is toothless",
        );
    }
    facts.selfProof = selfProofOk ? "ok" : "TOOTHLESS";

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:easter-eggs",
        facts,
        violations,
    });

    console.log("proof:easter-eggs — the six divined eggs, each PRM-fenced (AY.W-EGG)");
    console.log(`  eggs surveyed   : ${facts.eggs.join(", ")}`);
    console.log(`  seams asserted  : ${facts.seamCount}`);
    console.log(`  seams present   : ${facts.passCount}`);
    console.log(`  self-proof      : ${facts.selfProof}`);
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
