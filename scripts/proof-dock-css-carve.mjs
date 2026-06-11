#!/usr/bin/env node
// AX.W06 — the dock.css → src/styles/dock/ carve gate (proof:dock-css-carve).
//
// dock.css was a structurally-invisible 1762-line CSS god-module (slice 25): the
// `.ts`/`.vue`-only `proof:no-god-module` collector never saw it, so it shipped a
// false "largest now ~475" green-claim. AX.W06 CARVES it into cohesive
// single-axis partials under `src/styles/dock/`, each under the 500-line bound,
// @import-ed by a thin `dock.css` CORE in cascade order into the SAME
// `@layer components`. This gate is the LOCAL `.css`-aware line-count probe the
// W06 carve clears against (W25a owns the ci-tagged `.css`-extension of the
// shared collector; until it lands, this gate proves the dock arm). It folds in
// the wave's other structural witnesses (the deletion proof + the type-narrow
// proof) so the four falsifiable RED witnesses drive to GREEN together.
//
// Born-RED at HEAD: dock.css = 1762 > 500; the debris stories + their manifest
// rows present; the rail compiles with the inapplicable collapse surface.
//
// (1) CARVED — the six `dock/*.css` partials exist + are @import-ed by dock.css,
//     and EVERY partial AND the carved dock.css core are < 500 lines.
// (2) DELETION — the renamed token-ladder debris (foundations/dock-active-tokens)
//     + the relocated keepDockOpen proof (compositions/dock-with-slider) are GONE
//     (files absent + 0 manifest refs).
// (3) SINGLE-SHAPE — the ONE DockProps surface ships (AZ.W-DOCK-TAXONOMY arm a): the
//     generated GlassDock dts carries the typed props (orientation is the single
//     layout axis), NOT erased to `Record<string, any>`, AND no retired `variant`
//     discriminant survives — the clean break from the prior `DockVariantProps |
//     DockRailProps` discriminated union.
//
// House style mirrors proof-dock-controls-split.mjs: ESM .mjs, a byte-stable JSON
// artefact via gate-output, a human summary, process.exit(1) on any violation.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { DOCK_PARTIAL_ORDER } from "./read-dock-css.mjs";

const HARD_LIMIT = 500;

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        DOCK_DIR: resolve(ROOT, "src/styles/dock"),
        DOCK_CSS: resolve(ROOT, "src/styles/dock.css"),
        MANIFEST: resolve(ROOT, "demo/stories/manifest.ts"),
        DEBRIS: [
            resolve(ROOT, "demo/stories/foundations/dock-active-tokens.vue"),
            resolve(ROOT, "demo/stories/compositions/dock-with-slider.vue"),
        ],
        GLASSDOCK_DTS: resolve(ROOT, "dist/components/custom/dock/GlassDock.vue.d.ts"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_DOCK_CSS_CARVE_ARTIFACT",
            "AX-dock-css-carve",
        ),
    };
    return _cliPaths;
}

// Line count = `wc -l` + final-line (mirror the no-god-module collector).
function lineCount(file) {
    const text = readFileSync(file, "utf8");
    if (text.length === 0) return 0;
    const parts = text.split("\n");
    if (parts[parts.length - 1] === "") parts.pop();
    return parts.length;
}

function run() {
    const P = cliPaths();
    const violations = [];
    const facts = {};

    // ── (1) CARVED — partials exist, @import-ed, all < 500 ───────────────────
    const dockCssExists = existsSync(P.DOCK_CSS);
    facts.dockCoreExists = dockCssExists;
    if (!dockCssExists) {
        violations.push("src/styles/dock.css (the carved core) is absent");
    }
    const dockCss = dockCssExists ? readFileSync(P.DOCK_CSS, "utf8") : "";

    facts.partials = [];
    for (const name of DOCK_PARTIAL_ORDER) {
        const file = resolve(P.DOCK_DIR, name);
        const exists = existsSync(file);
        const lines = exists ? lineCount(file) : -1;
        facts.partials.push({ name: `src/styles/dock/${name}`, exists, lines });
        if (!exists) {
            violations.push(`src/styles/dock/${name} is missing (the carve partial was not created)`);
            continue;
        }
        const imported = new RegExp(`@import\\s+["']\\./dock/${name.replace(".", "\\.")}["']`).test(dockCss);
        if (!imported) {
            violations.push(`src/styles/dock.css does not @import ./dock/${name} (the partial would not cascade)`);
        }
        if (lines > HARD_LIMIT) {
            violations.push(`src/styles/dock/${name} is ${lines} lines (> ${HARD_LIMIT}) — split on a further cohesion axis`);
        }
    }

    // The carved core itself must clear the bound.
    const coreLines = dockCssExists ? lineCount(P.DOCK_CSS) : -1;
    facts.dockCoreLines = coreLines;
    if (coreLines > HARD_LIMIT) {
        violations.push(`src/styles/dock.css (core) is ${coreLines} lines (> ${HARD_LIMIT})`);
    }

    // ── (2) DELETION — the two debris stories + 0 manifest refs ──────────────
    facts.debrisPresent = [];
    for (const f of P.DEBRIS) {
        if (existsSync(f)) {
            facts.debrisPresent.push(relative(P.ROOT, f).split(sep).join("/"));
            violations.push(`debris story still present: ${relative(P.ROOT, f).split(sep).join("/")} (must be DELETED outright)`);
        }
    }
    const manifest = existsSync(P.MANIFEST) ? readFileSync(P.MANIFEST, "utf8") : "";
    const debrisRowRe = /dock-active-tokens|dock-with-slider/g;
    const manifestRefs = (manifest.match(debrisRowRe) || []).length;
    facts.debrisManifestRefs = manifestRefs;
    if (manifestRefs > 0) {
        violations.push(`manifest.ts still references the debris route(s) ${manifestRefs}× (dock-active-tokens / dock-with-slider) — drop the row(s)`);
    }

    // ── (3) SINGLE-SHAPE — the dts surfaces the ONE DockProps shape, no `variant` ──
    // AZ.W-DOCK-TAXONOMY (arm a) — the discriminated union `DockVariantProps |
    // DockRailProps` is RETIRED; GlassDock takes ONE `DockProps` interface (orientation
    // is the single layout axis, the collapse surface applies on both). The honest
    // surface ships when the GlassDock dts carries the typed props (e.g. `orientation`)
    // NOT erased to `Record<string, any>`, AND no retired `variant: "rail" |
    // "instrument-strip"` discriminant survives (the clean break).
    if (existsSync(P.GLASSDOCK_DTS)) {
        const dts = readFileSync(P.GLASSDOCK_DTS, "utf8");
        const hasTypedProps = /orientation\??:\s*"horizontal"\s*\|\s*"vertical"|DockProps/.test(dts);
        const erasedToRecord = /props:\s*Record<string,\s*any>/.test(dts) && !hasTypedProps;
        const retiredVariant = /variant\??:\s*"(rail|instrument-strip|dock)"/.test(dts);
        facts.dtsHasTypedProps = hasTypedProps;
        facts.dtsErasedToRecord = erasedToRecord;
        facts.dtsRetiredVariant = retiredVariant;
        if (erasedToRecord) {
            violations.push("GlassDock dts erased to Record<string, any> — the single DockProps shape regressed (rebuild dist, or the prop types were lost)");
        }
        if (retiredVariant) {
            violations.push("GlassDock dts still surfaces the retired `variant` discriminant (AZ.W-DOCK-TAXONOMY removed it — the clean break)");
        }
    } else {
        facts.dtsHasTypedProps = "skipped (dist not built)";
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:dock-css-carve",
        facts,
        violations,
    });

    console.log("proof:dock-css-carve — the dock.css → src/styles/dock/ carve + deletion + type-narrow gate (AX.W06)");
    console.log(`  dock.css core      : ${facts.dockCoreExists ? `${coreLines} lines` : "MISSING"} (< ${HARD_LIMIT})`);
    console.log("  partials (< 500):");
    for (const p of facts.partials) {
        const tag = !p.exists ? "MISSING" : p.lines > HARD_LIMIT ? `${p.lines} OVER` : `${p.lines} ok`;
        console.log(`    ${tag.padStart(8)}  ${p.name}`);
    }
    console.log(`  debris present     : ${facts.debrisPresent.length === 0 ? "none" : facts.debrisPresent.join(", ")}`);
    console.log(`  debris manifest refs: ${facts.debrisManifestRefs}`);
    console.log(`  dts rail branch    : ${facts.dtsHasRailBranch}`);
    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(P.ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
