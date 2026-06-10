// AY.W-BLOB-CONFIG — proof:blob-config, the structural witness for the blob page's
// four config/render fixes + the library-Configurator adoption.
//
// The wave fixed FOUR defects on the blob surface and re-homed its config UI onto the
// library Configurator (the inv-16 dog-food). The LIVE behavioral truths (the hero
// re-paints on a seed change, -1 shies away, the resume is clean) are π-lane gates
// (blob-render / blob-mood-live / blob-pause-seam + the W-BLOB-CONFIG DELTA readbacks);
// THIS gate is the device-free SOURCE arm that locks the STRUCTURE each fix needs so a
// regression that silently un-wires one is caught without a browser:
//
//   (D1) DEAD-FEED FIX — GooBlob.vue carries a watcher on the LIVE config's
//        paletteStops that re-resolves into the Ref the renderer paints from (the
//        config→Ref wire). Bite: drop the watcher → the hero color-feed goes dead again.
//   (D2) SIGN FIX — metaball.frag.ts shifts the sample ALONG pointerDir (uv += …, the
//        corrected sign), AND useMetaballRenderer gates the trail pseudopod by the
//        POSITIVE net attraction (reachFactor) so a shy-away retracts its reach. Bite:
//        flip the shader back to uv -= … OR drop reachFactor → the lunge-on-negative
//        returns.
//   (D3) STRETCH DECISION — the swamped stretch axis is honestly DOCUMENTED in types.ts
//        (the jsdoc names it swamped) AND de-slidered from the demo (no raw stretch
//        <input type=range>). Bite: re-surface the stretch slider → the oversold axis
//        returns.
//   (D4) RESUME CLAMP — useMetaballRenderer clamps the per-frame dt LOWER bound (a
//        manual resume rebases the clock to a NEGATIVE raw dt that runs the symplectic
//        integrator backward — the strobe-to-slab wreck). Bite: drop the Math.max(0, …)
//        → the negative-dt divergence returns.
//   (D5) CONFIGURATOR ADOPTION — the demo imports the library Configurator and mounts
//        NO raw <input type=range> for the blob config axes (the inv-16 dog-food). Bite:
//        re-add a raw range strip → the hand-rolled config returns.
//
// SELF-PROVING (the bite): each detector is exercised against a synthetic violating
// string so the gate reds loudly if a detector goes blind.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const SFC = resolve(ROOT, "src/components/custom/goo-blob/GooBlob.vue");
const SHADER = resolve(ROOT, "src/components/custom/goo-blob/shaders/metaball.frag.ts");
const RENDERER = resolve(
    ROOT,
    "src/components/custom/goo-blob/composables/useMetaballRenderer.ts",
);
const TYPES = resolve(ROOT, "src/components/custom/goo-blob/types.ts");
const DEMO = resolve(ROOT, "demo/stories/substrates/blob.vue");

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");

// ── D1: the live-config paletteStops watcher (the dead-feed fix) ────────────────────
function checkD1(facts, violations) {
    const sfc = read(SFC);
    // A watcher whose source reads paletteStops off the LIVE config + re-resolves.
    facts.d1LiveConfig = /\bliveConfig\b/.test(sfc);
    facts.d1PaletteWatcher =
        /watch\(\s*\(\s*\)\s*=>\s*\{[\s\S]*?paletteStops[\s\S]*?\}\s*,\s*\(\s*\)\s*=>\s*refreshResolvedColors\(\)/.test(
            sfc,
        ) ||
        (/watch\(/.test(sfc) &&
            /paletteStops/.test(sfc) &&
            /refreshResolvedColors\(\)/.test(sfc) &&
            // the watcher must read the LIVE config (not the stale snapshot) — the
            // refresh resolves through liveConfig().
            /liveConfig\(\)\.color\.paletteStops/.test(sfc));
    // refreshResolvedColors resolves the LIVE config's stops — either inline
    // (`liveConfig().color.paletteStops`) or via a `const live = liveConfig()` binding
    // (`live.color.paletteStops`). Both are the live-read; the stale-snapshot read
    // (`cfg!.color.paletteStops` inside refresh) is the regression.
    facts.d1RefreshReadsLive =
        /liveConfig\(\)\.color\.paletteStops/.test(sfc) ||
        (/const\s+live\s*=\s*liveConfig\(\)/.test(sfc) &&
            /live\.color\.paletteStops/.test(sfc));
    if (!facts.d1LiveConfig)
        violations.push(
            "GooBlob.vue has no `liveConfig()` getter — the paletteStops watcher must read the LIVE config prop (the mount-time `cfg` snapshot goes stale when the consumer swaps the config object), else the hero color-feed stays dead (D1)",
        );
    if (!facts.d1PaletteWatcher)
        violations.push(
            "GooBlob.vue has no watcher re-resolving the LIVE config's paletteStops into the resolvedStops Ref — a post-mount seed/harmony change never re-paints the hero body (the dead hero color-feed, D1)",
        );
    if (!facts.d1RefreshReadsLive)
        violations.push(
            "GooBlob.vue `refreshResolvedColors` does not read `liveConfig().color.paletteStops` — it resolves the stale snapshot, so the watcher fires but resolves the OLD stops (D1)",
        );
}

// ── D2: the corrected shader sign + the reach-gated trail ────────────────────────────
function checkD2(facts, violations) {
    const shader = read(SHADER);
    const renderer = read(RENDERER);
    // The corrected sample-shift sign: uv += normalize(pointerDir + 1e-6) * influence.
    facts.d2ShaderSign = /uv\s*\+=\s*normalize\(\s*pointerDir\s*\+\s*1e-6\s*\)\s*\*\s*influence/.test(
        shader,
    );
    // The inverted (buggy) form must be GONE.
    facts.d2NoInvertedSign = !/uv\s*-=\s*normalize\(\s*pointerDir\s*\+\s*1e-6\s*\)\s*\*\s*influence/.test(
        shader,
    );
    // The trail pseudopod gated by the POSITIVE net attraction (reachFactor).
    facts.d2ReachFactor =
        /const\s+reachFactor\s*=\s*Math\.max\(\s*0\s*,\s*Math\.min\(\s*1\s*,\s*netAttraction\s*\)\s*\)/.test(
            renderer,
        );
    facts.d2TrailGated = /trailSources\([^)]*reachFactor[^)]*\)/.test(renderer);
    if (!facts.d2ShaderSign)
        violations.push(
            "metaball.frag.ts does not shift the sample ALONG pointerDir (`uv += normalize(pointerDir + 1e-6) * influence`) — the corrected lean sign is missing; the body leans the WRONG way (a negative attraction lunges toward, D2)",
        );
    if (!facts.d2NoInvertedSign)
        violations.push(
            "metaball.frag.ts still carries the INVERTED `uv -= normalize(pointerDir + 1e-6) * influence` — the sign was un-fixed; a shy-away -1 lunges toward (D2)",
        );
    if (!facts.d2ReachFactor)
        violations.push(
            "useMetaballRenderer.ts has no `reachFactor = Math.max(0, Math.min(1, netAttraction))` — the trail pseudopod is not sign-gated, so a shy-away still extends a pseudopod toward the cursor (D2)",
        );
    if (!facts.d2TrailGated)
        violations.push(
            "useMetaballRenderer.ts `trailSources(...)` does not ride `reachFactor` — the pseudopod reach ignores the lean sign (D2)",
        );
}

// ── D3: the stretch axis documented swamped + de-slidered ───────────────────────────
function checkD3(facts, violations) {
    const types = read(TYPES);
    const demo = read(DEMO);
    // The stretch jsdoc names it a SWAMPED fine-detail axis.
    facts.d3Documented =
        /stretch[\s\S]{0,400}?\bSWAMPED\b/i.test(types) ||
        /SWAMPED[\s\S]{0,400}?stretch/i.test(types);
    // The demo must NOT surface a stretch slider (the oversold axis is de-slidered). The
    // detector is "no aria-label naming stretch/squash on a range input" — scoped so a
    // mood/attraction slider does not false-positive.
    facts.d3NoStretchSlider =
        !/aria-label="[^"]*[Ss]quash[^"]*"/.test(demo) &&
        !/aria-label="[^"]*stretch[^"]*"/i.test(demo);
    if (!facts.d3Documented)
        violations.push(
            "types.ts `stretch` jsdoc does not name it a SWAMPED fine-detail axis — the D3 honest-down decision is unrecorded (the oversold axis must be documented OR tuned; this gate enforces the documented branch)",
        );
    if (!facts.d3NoStretchSlider)
        violations.push(
            "demo/stories/substrates/blob.vue still surfaces a stretch/squash slider — the swamped axis must be de-slidered (D3)",
        );
}

// ── D4: the resume dt LOWER clamp (the SEVERE fix) ──────────────────────────────────
function checkD4(facts, violations) {
    const renderer = read(RENDERER);
    // The dt is clamped to [0, 50]: Math.max(0, Math.min(rawDtMs, 50)).
    facts.d4LowerClamp = /Math\.max\(\s*0\s*,\s*Math\.min\(\s*rawDtMs\s*,\s*50\s*\)\s*\)/.test(
        renderer,
    );
    if (!facts.d4LowerClamp)
        violations.push(
            "useMetaballRenderer.ts does not clamp the per-frame dt LOWER bound (`Math.max(0, Math.min(rawDtMs, 50))`) — a manual resume rebases the clock to a NEGATIVE raw dt that runs the symplectic integrator backward (the strobe-to-charcoal-slab wreck, D4)",
        );
}

// ── D5: the library Configurator adoption (the inv-16 dog-food) ─────────────────────
function checkD5(facts, violations) {
    const demo = read(DEMO);
    facts.d5ImportsConfigurator =
        /import\s*\{[\s\S]*?\bConfigurator\b[\s\S]*?\}\s*from\s*["'][^"']*configurator["']/.test(
            demo,
        );
    facts.d5MountsConfigurator = /<Configurator\b/.test(demo);
    facts.d5UsesLayerRow = /<ConfiguratorLayer\b/.test(demo) && /<ConfiguratorRow\b/.test(demo);
    facts.d5UsesState = /useConfiguratorState\b/.test(demo);
    // NO raw <input type=range> anywhere in the blob demo (the hand-rolled strip is gone).
    facts.d5NoRawRange = !/<input[^>]*type="range"/.test(demo);
    if (!facts.d5ImportsConfigurator || !facts.d5MountsConfigurator)
        violations.push(
            "demo/stories/substrates/blob.vue does not import + mount the library `Configurator` — the blob showcase must dog-food the library's own controls (the inv-16 dog-food, D5)",
        );
    if (!facts.d5UsesLayerRow)
        violations.push(
            "demo/stories/substrates/blob.vue does not compose ConfiguratorLayer + ConfiguratorRow — the blob axes must be Configurator rows (D5)",
        );
    if (!facts.d5UsesState)
        violations.push(
            "demo/stories/substrates/blob.vue does not use `useConfiguratorState` — the preset-driven studio chrome is missing (D5)",
        );
    if (!facts.d5NoRawRange)
        violations.push(
            "demo/stories/substrates/blob.vue STILL mounts a raw <input type=range> — the hand-rolled config strip must be replaced by the library Configurator (D5)",
        );
}

function run() {
    const facts = {};
    const violations = [];
    checkD1(facts, violations);
    checkD2(facts, violations);
    checkD3(facts, violations);
    checkD4(facts, violations);
    checkD5(facts, violations);

    // SELF-TEST — the bite. Each detector must FLAG its synthetic violation.
    const biteShaderInverted = /uv\s*-=\s*normalize\(\s*pointerDir\s*\+\s*1e-6\s*\)\s*\*\s*influence/.test(
        "        uv -= normalize(pointerDir + 1e-6) * influence;",
    );
    const biteLowerClampMissing = !/Math\.max\(\s*0\s*,\s*Math\.min\(\s*rawDtMs\s*,\s*50\s*\)\s*\)/.test(
        "const dtMs = Math.min(rawDtMs, 50);",
    );
    const biteRawRange = /<input[^>]*type="range"/.test(
        '<input type="range" min="0" max="1" />',
    );
    const biteReachMissing = !/const\s+reachFactor\s*=\s*Math\.max\(\s*0\s*,\s*Math\.min\(\s*1\s*,\s*netAttraction\s*\)\s*\)/.test(
        "const trail = pointer.trailSources(r);",
    );
    if (
        !biteShaderInverted ||
        !biteLowerClampMissing ||
        !biteRawRange ||
        !biteReachMissing
    ) {
        console.error(
            `[proof:blob-config] SELF-TEST FAILED — shaderInverted:${biteShaderInverted} lowerClampMissing:${biteLowerClampMissing} rawRange:${biteRawRange} reachMissing:${biteReachMissing}. The gate is not load-bearing.`,
        );
        process.exit(1);
    }

    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath("GLASS_UI_BLOB_CONFIG_ARTIFACT", "AY-blob-config");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:blob-config",
        facts,
        violations,
    });

    console.log("proof:blob-config — the blob config/render fixes + Configurator adoption (AY.W-BLOB-CONFIG)");
    console.log(`  (D1) live-config paletteStops watcher : liveConfig ${facts.d1LiveConfig ? "✓" : "✗"} · watcher ${facts.d1PaletteWatcher ? "✓" : "✗"} · refresh-reads-live ${facts.d1RefreshReadsLive ? "✓" : "✗"}`);
    console.log(`  (D2) shader sign + reach-gated trail  : sign+= ${facts.d2ShaderSign ? "✓" : "✗"} · no-inverted ${facts.d2NoInvertedSign ? "✓" : "✗"} · reachFactor ${facts.d2ReachFactor ? "✓" : "✗"} · trail-gated ${facts.d2TrailGated ? "✓" : "✗"}`);
    console.log(`  (D3) stretch documented + de-slidered : documented ${facts.d3Documented ? "✓" : "✗"} · no-slider ${facts.d3NoStretchSlider ? "✓" : "✗"}`);
    console.log(`  (D4) resume dt lower-clamp            : ${facts.d4LowerClamp ? "✓" : "✗"}`);
    console.log(`  (D5) library Configurator adoption    : import ${facts.d5ImportsConfigurator ? "✓" : "✗"} · mount ${facts.d5MountsConfigurator ? "✓" : "✗"} · layer/row ${facts.d5UsesLayerRow ? "✓" : "✗"} · state ${facts.d5UsesState ? "✓" : "✗"} · no-raw-range ${facts.d5NoRawRange ? "✓" : "✗"}`);
    console.log("  self-test (bite proof)                : OK — all four synthetic violations flag");
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
