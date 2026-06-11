// AZ.W-BLOB-STUDIO — proof:blob-studio-config, the DEVICE-FREE source-witness half of
// the studio refinement (the CI-tagged config-binding arm; the W-REGISTER-IOS split
// precedent). The captured visual reads (stage-fill / satellite-separation / merge-bridge
// / shadow) live in the SIBLING proof:blob-studio (local-only, π over the live bead) —
// this gate carries ONLY the device-free SOURCE bites so the config-binding has CI
// coverage:
//
//   1. SATELLITE-LAYER-BOUND — the studio surfaces a "Geometry / Satellites"
//      ConfiguratorLayer with ALL FOUR §3.3 geometry controls bound to the BlobGeometry
//      atoms (satelliteCount / orbitRadius / satelliteRadius / eccentricity) PLUS the two
//      §3.2 merge-bridge controls (smoothK / merge), each wired to the studio config.
//   2. CONFIGURATOR-HIERARCHY — `dividers` is enabled on the studio layers AND the layer
//      order is primary(Interaction)→secondary(Mood)→tertiary(Geometry) AND the preset
//      row is weighted (the `#presets` slot override, not the plain default chips).
//   3. MERGE-DEFAULT-REBASE — types.ts re-based the membrane default toward the rounder
//      bridge (a LOUDER smoothK > the prior 0.05 + `merge: "circular"`).
//   4. LOUDER-LEAN-SURFACED — the studio surfaces a Responsiveness knob that scales the
//      pointer-lean register UP (the §3.5 surfaced register, NOT a library default
//      re-base — the shipped interaction defaults are unchanged).
//   5. GROUNDED-SHADOW-TOKEN — the GooBlob shadow is a TWO-RUNG grounded composite
//      (drop-shadow(ambient) drop-shadow(contact)) over the --blob-shadow-contact token.
//
// Pure src-scan — no browser, no GPU. tags: ["local","ci","release"].

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:blob-studio-config";

const BLOB_VUE = resolve(ROOT, "demo/stories/substrates/blob.vue");
const TYPES_TS = resolve(ROOT, "src/components/custom/goo-blob/types.ts");
const GOOBLOB_VUE = resolve(ROOT, "src/components/custom/goo-blob/GooBlob.vue");
const SHADOW_CSS = resolve(ROOT, "src/styles/tokens/shadow.css");

function read(path) {
    return existsSync(path) ? readFileSync(path, "utf8") : "";
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_BLOB_STUDIO_CONFIG_ARTIFACT", "AZ-blob-studio-config");
    const violations = [];

    const blob = read(BLOB_VUE);
    const types = read(TYPES_TS);
    const goo = read(GOOBLOB_VUE);
    const shadow = read(SHADOW_CSS);

    if (!blob) violations.push("demo/stories/substrates/blob.vue not readable");
    if (!types) violations.push("src/components/custom/goo-blob/types.ts not readable");

    // ── 1. SATELLITE-LAYER-BOUND — the four geometry knobs + the two merge knobs ──
    const geometryKnobs = [
        "studio.config.satelliteCount",
        "studio.config.orbitRadius",
        "studio.config.satelliteRadius",
        "studio.config.eccentricity",
    ];
    for (const k of geometryKnobs) {
        if (!blob.includes(k))
            violations.push(
                `SATELLITE-LAYER-BOUND: the studio config does not bind \`${k}\` — the C6-7 GAP (geometry knob unsurfaced)`,
            );
    }
    const mergeKnobs = ["studio.config.smoothK", "studio.config.merge"];
    for (const k of mergeKnobs) {
        if (!blob.includes(k))
            violations.push(
                `MERGE-BRIDGE-BOUND: the studio config does not bind \`${k}\` — the §3.2 merge knob unsurfaced`,
            );
    }
    // The Satellites layer header is present.
    if (!/Geometry\s*\/\s*Satellites/.test(blob))
        violations.push(
            'SATELLITE-LAYER-BOUND: no "Geometry / Satellites" ConfiguratorLayer in the studio (the tertiary geometry layer)',
        );

    // ── 2. CONFIGURATOR-HIERARCHY — dividers + the primary→secondary→tertiary order ──
    // The three layers carry `dividers`.
    const dividerLayers = (blob.match(/<ConfiguratorLayer[^>]*\bdividers\b/g) ?? []).length;
    if (dividerLayers < 3)
        violations.push(
            `CONFIGURATOR-HIERARCHY: expected ≥3 ConfiguratorLayer with \`dividers\` enabled (the per-section hairline) — found ${dividerLayers}`,
        );
    // The layer ORDER: Interaction before Mood before Geometry (the index order in the file).
    const iInteraction = blob.indexOf('label="Interaction"');
    const iMood = blob.indexOf('label="Mood + palette"');
    const iGeometry = blob.search(/label="Geometry\s*\/\s*Satellites"/);
    if (iInteraction < 0 || iMood < 0 || iGeometry < 0)
        violations.push(
            "CONFIGURATOR-HIERARCHY: one of the Interaction / Mood + palette / Geometry layers is missing",
        );
    else if (!(iInteraction < iMood && iMood < iGeometry))
        violations.push(
            `CONFIGURATOR-HIERARCHY: the layer order is not primary(Interaction)→secondary(Mood)→tertiary(Geometry) (indices ${iInteraction}/${iMood}/${iGeometry})`,
        );
    // The weighted preset row: the studio overrides the `#presets` slot (not the plain
    // default chips) AND renders the preset `sub` descriptor with a font-semibold label.
    if (!/#presets/.test(blob) || !/p\.sub/.test(blob))
        violations.push(
            "CONFIGURATOR-HIERARCHY: the studio does not override the #presets slot with a weighted row (the preset `sub` descriptor + the semibold label) — the preset row stays the plain default chips",
        );

    // ── 3. MERGE-DEFAULT-REBASE — the C6-6 rounder-read re-base ──
    // The LIBRARY default re-base is the MERGE VARIANT: quadratic → circular (the rounder
    // menisci that fix the seam crease — lean-safe). The smoothK band stays at the
    // CALIBRATED 0.05 on the library default (the IDENTITY-PRESERVED guard: a louder
    // smoothK on the default bead inflates the proof:blob-render lean-centroid past its
    // ceiling). The LOUDER bridge is a STUDIO axis (the studio seeds a louder smoothK in
    // STUDIO_GEO_BASE + surfaces it as a live knob), NOT a library re-base.
    const membraneMatch = types.match(/membrane:\s*{[\s\S]*?smoothK:\s*([0-9.]+),[\s\S]*?merge:\s*"(quadratic|circular)"/);
    if (!membraneMatch) {
        violations.push("MERGE-DEFAULT-REBASE: could not parse the membrane smoothK/merge default in types.ts");
    } else {
        const merge = membraneMatch[2];
        if (merge !== "circular")
            violations.push(
                `MERGE-DEFAULT-REBASE: the membrane merge default is "${merge}", not "circular" (the C6-6 seam-crease quadratic was not re-based to the rounder menisci)`,
            );
    }
    // The STUDIO seeds a LOUDER smoothK than the lean-safe library default (the wider
    // bridge the studio bead shows — the §6 MERGE-BRIDGE-ROUNDER read), a page-local
    // override like W-BLOB-PAGE's orbit override.
    const studioBaseMatch = blob.match(/STUDIO_GEO_BASE\s*=\s*{[\s\S]*?smoothK:\s*([0-9.]+),/);
    if (!studioBaseMatch) {
        violations.push("MERGE-BRIDGE-STUDIO: could not parse the STUDIO_GEO_BASE smoothK seed in blob.vue");
    } else if (!(Number(studioBaseMatch[1]) > 0.05)) {
        violations.push(
            `MERGE-BRIDGE-STUDIO: the studio smoothK seed ${studioBaseMatch[1]} is not LOUDER than the 0.05 library default (the studio bead does not show the wider bridge)`,
        );
    }

    // ── 4. LOUDER-LEAN-SURFACED — the Responsiveness knob, NOT a library default re-base ──
    if (!/studio\.config\.responsiveness/.test(blob))
        violations.push(
            "LOUDER-LEAN-SURFACED: the studio does not surface a `responsiveness` knob (the §3.5 louder-lean register)",
        );
    // The SHIPPED interaction defaults are UNCHANGED (restraint: the louder lean is a
    // SURFACED knob, not a default re-base). pointerStrength 0.1, stretch 0.5 stay.
    const interactionMatch = types.match(/interaction:\s*{[\s\S]*?pointerStrength:\s*([0-9.]+),[\s\S]*?stretch:\s*([0-9.]+),/);
    if (interactionMatch) {
        const ps = Number(interactionMatch[1]);
        const st = Number(interactionMatch[2]);
        if (ps !== 0.1 || st !== 0.5)
            violations.push(
                `LOUDER-LEAN-SURFACED: the SHIPPED interaction default re-based (pointerStrength=${ps}, stretch=${st}) — the louder lean must be a SURFACED studio knob, NOT a library default re-base (restraint counter)`,
            );
    }

    // ── 5. GROUNDED-SHADOW-TOKEN — the two-rung grounded composite ──
    if (!/--blob-shadow-contact\b/.test(shadow))
        violations.push(
            "GROUNDED-SHADOW-TOKEN: shadow.css does not declare the --blob-shadow-contact rung (the grounded contact band)",
        );
    // GooBlob.vue chains TWO drop-shadow rungs (ambient + contact).
    const restFilter = goo.match(/\.goo-blob-wrapper\s*{[\s\S]*?filter:\s*([^;]+);/);
    if (!restFilter || (restFilter[1].match(/drop-shadow/g) ?? []).length < 2)
        violations.push(
            "GROUNDED-SHADOW-TOKEN: the GooBlob wrapper rest filter is not a TWO-RUNG drop-shadow composite (ambient + contact) — the shadow is not grounded",
        );

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: COMMAND,
        facts: { dividerLayers, geometryKnobs: geometryKnobs.length, mergeKnobs: mergeKnobs.length },
        violations,
    });

    console.log("proof:blob-studio-config — the device-free studio source-witness (AZ.W-BLOB-STUDIO)");
    console.log(
        "  bites: SATELLITE-LAYER-BOUND + CONFIGURATOR-HIERARCHY + MERGE-DEFAULT-REBASE + LOUDER-LEAN-SURFACED + GROUNDED-SHADOW-TOKEN",
    );
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
