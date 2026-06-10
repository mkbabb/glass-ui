#!/usr/bin/env node
// AY.W-COHERE — proof:substrate-cohesion, the SET-LEVEL cohesion gate (the
// set-canary modeled on proof:glass-cohesion — measure the SET, not one surface).
//
// The B2-gestalt red-team verdict: the four AY Batch-2 substrates (constellation,
// blob, dock, fourier) each passed its OWN isolation gate and shipped a DELTA, but
// read TOGETHER they are FOUR SEPARATE PASSES, not one cohesive family. This gate
// owns the set. It is a HYBRID: cheap source-witness arms (always run) + live π
// readback arms (the substrate-cohesion.spec.ts, invoked when the workspace is
// present). Born-RED at HEAD on D1/D2/D3:
//
//   G-ACCENT     (D1/D4) — the blob mood bead chroma must land in the warm-register
//                band the FF comet occupies (not the neon coral). SOURCE: the
//                seed->palette derivation threads a chromaCeiling. π: the live mood
//                bead C sits at-or-below the live comet C band, warm-red hue.
//   G-RECESSION  (D3)    — all FOUR substrates expose the outer-envelope recession
//                knob (aurora opacityCeiling, FF intensity, blob a config quality
//                atom, constellation the NEW opacityCeiling). SOURCE: the four
//                props/atoms exist. π: a <Constellation opacity-ceiling=0.4> paints
//                ~0.4x the ink (the prop BITES).
//   G-SHADOW     (D2)    — the blob gel bead carries NO hard `5px 5px`-class
//                near-black offset-stamp and reads the --blob-shadow ambient token.
//                SOURCE: the stamp is gone + the token is read + the token exists.
//                π: the painted shadow is soft + near-centered in BOTH modes.
//
// SELF-PROVING: a synthetic pre-edit snapshot (the `5px 5px` stamp line) is run
// through the detector every invocation; if the detector fails to flag it the gate
// REDs (the bite is demonstrated each run).
//
// FAIL-CLOSED CONTRACT (the cardinal AX precept): when the π workspace IS present
// (Playwright resolves), a failing live readback exits NON-ZERO — never SKIP. The
// source-witness arms ALWAYS run regardless of the device.

import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const WORKSPACE = resolve(ROOT, "tests-visual");
const PW_BIN =
    [
        resolve(WORKSPACE, "node_modules/.bin/playwright"),
        resolve(ROOT, "node_modules/.bin/playwright"),
    ].find(existsSync) ?? null;
const PW_PKG =
    [
        resolve(WORKSPACE, "node_modules/@playwright/test/package.json"),
        resolve(ROOT, "node_modules/@playwright/test/package.json"),
    ].find(existsSync) ?? null;
const REPORT = resolve(WORKSPACE, ".cache/substrate-cohesion-report.json");
const COMMAND = "npm run proof:substrate-cohesion";

// ── the edit-site files (re-grepped against the W-GOD1-carved tree) ────────────
const GOO_BLOB = resolve(ROOT, "src/components/custom/goo-blob/GooBlob.vue");
const SHADOW_CSS = resolve(ROOT, "src/styles/tokens/shadow.css");
const COLOR_LEAF = resolve(ROOT, "src/composables/color/index.ts");
const CONSTELLATION = resolve(ROOT, "src/components/custom/constellation/Constellation.vue");
const AURORA = resolve(ROOT, "src/components/custom/aurora/Aurora.vue");
const FOURIER = resolve(ROOT, "src/components/custom/fourier-field/FourierField.vue");
const BLOB_TYPES = resolve(ROOT, "src/components/custom/goo-blob/types.ts");
const BLOB_DEMO = resolve(ROOT, "demo/stories/substrates/blob.vue");

function workspacePresent() {
    return PW_PKG !== null && PW_BIN !== null;
}

/** Parse the Playwright JSON report into {passed, failed, failures}. */
function parseReport(path) {
    const json = JSON.parse(readFileSync(path, "utf8"));
    const failures = [];
    let passed = 0;
    let failed = 0;
    let skipped = 0;
    const walk = (suite) => {
        for (const spec of suite.specs ?? []) {
            for (const t of spec.tests ?? []) {
                const results = t.results ?? [];
                // A test SKIPPED on the mobile project (the desktop-layout-only
                // readback guard) is neither a pass nor a fail — it does not gate.
                if (results.length && results.every((r) => r.status === "skipped")) {
                    skipped++;
                    continue;
                }
                const ok = results.every((r) => r.status === "passed");
                if (ok) passed++;
                else {
                    failed++;
                    const msg = results
                        .flatMap((r) => r.errors ?? [])
                        .map((e) => (e.message ?? "").split("\n")[0])
                        .join(" | ");
                    failures.push(`${spec.title}: ${msg}`);
                }
            }
        }
        for (const child of suite.suites ?? []) walk(child);
    };
    for (const suite of json.suites ?? []) walk(suite);
    return { passed, failed, skipped, failures };
}

/** Strip JS/TS/CSS block + line comments (the source-witness reads real code). */
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, " ")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

/** The G-SHADOW clause: does the source carry a hard `Npx Npx`-class drop-shadow? */
function hasHardOffsetStamp(text) {
    // a drop-shadow whose FIRST two offsets are BOTH >= 3px (the cartoon stamp:
    // `5px 5px`, `7px 7px`). A near-centered ambient shadow is `0 4px`/`0 6px`.
    return /drop-shadow\(\s*([3-9]\d*|\d{2,})px\s+([3-9]\d*|\d{2,})px/.test(text);
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_SUBSTRATE_COHESION_ARTIFACT",
        "AY-substrate-cohesion",
    );
    const violations = [];
    const facts = {};

    // ── SELF-PROVING — the detector must flag the synthetic pre-edit stamp line ──
    const SYNTHETIC =
        "filter: drop-shadow(5px 5px 2.5px color-mix(in srgb, var(--blob-color) 20%, var(--foreground)));";
    const biteFlagged = hasHardOffsetStamp(SYNTHETIC);
    facts.selfTestFlagged = biteFlagged;
    if (!biteFlagged) {
        console.error(
            "[proof:substrate-cohesion] SELF-TEST FAILED — the hard-offset-stamp detector did not flag the synthetic `5px 5px` line. The gate is not load-bearing.",
        );
        process.exit(1);
    }

    // ── G-SHADOW (source) — the gel bead carries NO hard offset-stamp + reads the
    //    --blob-shadow ambient token; the token exists in shadow.css. ─────────────
    const blobVue = existsSync(GOO_BLOB) ? readFileSync(GOO_BLOB, "utf8") : "";
    const blobStyle = stripComments(blobVue);
    const stampInBlob = hasHardOffsetStamp(blobStyle);
    facts.gShadow = {};
    facts.gShadow.noHardStamp = !stampInBlob;
    if (stampInBlob)
        violations.push(
            "G-SHADOW: GooBlob.vue still carries a hard `Npx Npx`-class drop-shadow offset-stamp (the cartoon stamp belongs on <Card surface='cartoon'>, not the gel bead — D2)",
        );
    const readsBlobShadow = /drop-shadow\(\s*var\(--blob-shadow/.test(blobStyle);
    facts.gShadow.readsToken = readsBlobShadow;
    if (!readsBlobShadow)
        violations.push(
            "G-SHADOW: GooBlob.vue does not read the `--blob-shadow` ambient token in its drop-shadow filter (E2)",
        );
    const shadowCss = existsSync(SHADOW_CSS) ? readFileSync(SHADOW_CSS, "utf8") : "";
    const tokenDefined =
        /--blob-shadow\s*:/.test(shadowCss) &&
        /--blob-shadow[^;]*var\(--(?:shadow-color|foreground|blob-shadow-color)/.test(
            stripComments(shadowCss),
        );
    facts.gShadow.tokenDefinedAdaptive = tokenDefined;
    if (!/--blob-shadow\s*:/.test(shadowCss))
        violations.push(
            "G-SHADOW: the `--blob-shadow` token is not defined in tokens/shadow.css (E2)",
        );
    else if (!tokenDefined)
        violations.push(
            "G-SHADOW: the `--blob-shadow` token does not resolve through `--shadow-color`/`--foreground` (the adaptive-by-construction dark-arm re-resolution — no hardcoded .dark block)",
        );

    // ── G-RECESSION (source) — all FOUR substrates expose the recession knob. ─────
    const aurora = existsSync(AURORA) ? readFileSync(AURORA, "utf8") : "";
    const fourier = existsSync(FOURIER) ? readFileSync(FOURIER, "utf8") : "";
    const blobTypes = existsSync(BLOB_TYPES) ? readFileSync(BLOB_TYPES, "utf8") : "";
    const constellation = existsSync(CONSTELLATION)
        ? readFileSync(CONSTELLATION, "utf8")
        : "";
    const auroraKnob = /opacityCeiling\s*\??\s*:\s*number/.test(aurora);
    const fourierKnob = /intensity\s*\??\s*:\s*number/.test(fourier);
    const blobKnob = /quality\s*:\s*BlobQuality/.test(blobTypes);
    const constellationKnob = /opacityCeiling\s*\??\s*:\s*number/.test(constellation);
    facts.gRecession = {
        aurora: auroraKnob,
        fourier: fourierKnob,
        blob: blobKnob,
        constellation: constellationKnob,
    };
    if (!auroraKnob)
        violations.push("G-RECESSION: Aurora.vue is missing the `opacityCeiling` recession knob");
    if (!fourierKnob)
        violations.push("G-RECESSION: FourierField.vue is missing the `intensity` recession knob");
    if (!blobKnob)
        violations.push("G-RECESSION: the blob config is missing the `quality: BlobQuality` envelope atom");
    if (!constellationKnob)
        violations.push(
            "G-RECESSION: Constellation.vue is missing the NEW `opacityCeiling` recession knob (the 4th of the shared contract — D3)",
        );
    // the constellation prop must actually SCALE the draw alpha (not a dead prop).
    const draw = existsSync(
        resolve(ROOT, "src/components/custom/constellation/constellationDraw.ts"),
    )
        ? readFileSync(
              resolve(ROOT, "src/components/custom/constellation/constellationDraw.ts"),
              "utf8",
          )
        : "";
    const drawScales = /opacityCeiling/.test(draw) && /\*\s*opacityCeiling/.test(draw);
    facts.gRecession.drawScales = drawScales;
    if (!drawScales)
        violations.push(
            "G-RECESSION: constellationDraw.ts does not SCALE the painted alpha by `opacityCeiling` — the prop is declared but does not bite (D3)",
        );

    // ── G-ACCENT (source) — the seed->palette derivation threads a chromaCeiling. ─
    const colorLeaf = existsSync(COLOR_LEAF) ? readFileSync(COLOR_LEAF, "utf8") : "";
    const ceilingOption = /chromaCeiling\s*\??\s*:\s*number/.test(colorLeaf);
    const ceilingApplied = /Math\.min\(\s*C\s*,\s*chromaCeiling\s*\)/.test(colorLeaf);
    facts.gAccent = { ceilingOption, ceilingApplied };
    if (!ceilingOption)
        violations.push(
            "G-ACCENT: deriveBlobPalette has no `chromaCeiling` option (the warm-register chroma cap — D1/D4)",
        );
    if (!ceilingApplied)
        violations.push(
            "G-ACCENT: the `chromaCeiling` is not applied as `Math.min(C, chromaCeiling)` on the derived chroma",
        );
    const blobDemo = existsSync(BLOB_DEMO) ? readFileSync(BLOB_DEMO, "utf8") : "";
    const demoUsesCeiling = /chromaCeiling\s*:/.test(blobDemo);
    facts.gAccent.demoUsesCeiling = demoUsesCeiling;
    if (!demoUsesCeiling)
        violations.push(
            "G-ACCENT: the blob demo does not pass `chromaCeiling` to deriveBlobPalette — the demo mood seed is not capped into the register",
        );

    // ── the LIVE π readback arms (G-ACCENT band, G-RECESSION bite, G-SHADOW soft) ─
    let piReport = null;
    let piExit = null;
    if (workspacePresent()) {
        const res = spawnSync(
            PW_BIN,
            ["test", "substrate-cohesion.spec.ts", "--reporter=list,json"],
            {
                cwd: WORKSPACE,
                stdio: ["ignore", "pipe", "inherit"],
                encoding: "utf8",
                env: { ...process.env, PLAYWRIGHT_JSON_OUTPUT_NAME: REPORT },
            },
        );
        piExit = res.status;
        if (existsSync(REPORT)) {
            try {
                piReport = parseReport(REPORT);
            } catch {
                /* fall through */
            }
        }
        if (!piReport && res.stdout) {
            try {
                const start = res.stdout.indexOf("{");
                const json = JSON.parse(res.stdout.slice(start));
                const tmp = resolve(WORKSPACE, ".cache/substrate-cohesion-report.json");
                writeGateArtifact(tmp, json, { volatile: [] });
                piReport = parseReport(tmp);
            } catch {
                /* no parseable report */
            }
        }
        facts.piWorkspacePresent = true;
        facts.piSpecsPassed = piReport?.passed ?? null;
        facts.piSpecsFailed = piReport?.failed ?? null;
        facts.piExit = piExit;
        if (piExit !== 0) {
            if (piReport?.failures?.length) violations.push(...piReport.failures);
            else
                violations.push(
                    `the substrate-cohesion π spec exited ${piExit} with no parseable report — the live set readback did not run cleanly`,
                );
        }
    } else {
        facts.piWorkspacePresent = false;
        // The source-witness arms STILL gate. The live readback is asserted on the
        // real device (the orchestrator runs the fail-CLOSED arm). NOT a false GREEN
        // — the source-witnesses cover D1/D2/D3's source shape; the π arm ratifies
        // the painted truth where the device is present.
        console.log(
            "proof:substrate-cohesion — π workspace device absent; the SOURCE-WITNESS arms ran, the live readback is deferred to the real-device run.",
        );
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:substrate-cohesion",
        command: COMMAND,
        bornRed: status === "fail",
        facts,
        violations,
    });

    console.log(
        "proof:substrate-cohesion — the SET-LEVEL substrate cohesion gate (AY.W-COHERE)",
    );
    console.log(
        `  G-SHADOW   (no stamp + reads token) : ${facts.gShadow.noHardStamp && facts.gShadow.readsToken && facts.gShadow.tokenDefinedAdaptive ? "yes ✓" : "NO ✗"}`,
    );
    console.log(
        `  G-RECESSION (4 knobs + draw scales) : ${
            auroraKnob && fourierKnob && blobKnob && constellationKnob && drawScales
                ? "4/4 ✓"
                : `aurora ${auroraKnob ? "✓" : "✗"} fourier ${fourierKnob ? "✓" : "✗"} blob ${blobKnob ? "✓" : "✗"} constellation ${constellationKnob ? "✓" : "✗"} draw-scales ${drawScales ? "✓" : "✗"}`
        }`,
    );
    console.log(
        `  G-ACCENT   (chromaCeiling threaded) : ${ceilingOption && ceilingApplied && demoUsesCeiling ? "yes ✓" : "NO ✗"}`,
    );
    console.log(
        `  π live readback                     : ${facts.piWorkspacePresent ? `${piReport?.passed ?? "?"}/${(piReport?.passed ?? 0) + (piReport?.failed ?? 0)} specs (exit ${piExit})` : "device absent (source-witness only)"}`,
    );
    console.log("  self-test (bite proof)              : OK — the `5px 5px` stamp synthetic is flagged");
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
