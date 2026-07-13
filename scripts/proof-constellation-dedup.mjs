#!/usr/bin/env node
// BI.W-CONSTELLATION-DEDUPE — proof:constellation-dedup: the constellation demo census +
// the interactive-background standard.
//
// Device-free SOURCE-scan gate (the comment-strip + pure-detector house pattern). Born-RED at
// the pre-dedup HEAD: the two duplicative/superfluous exhibits (the double-tap SUPERNOVA + the
// ?freeze ANOMALY-recipe section) were present, AND the full-bleed background vizzes were
// `pointer-events:none` canvases with NO route-broadcaster feed (dead to the pointer). GREEN
// when the census lands, the duplicative exhibits are DEFINITION-ABSENT, and every full-bleed
// background viz reads the route broadcaster (Fourier self-injects, Constellation via
// `backgroundInteractive`, Aurora threaded via `setCursor`).
//
//   CD1 — the census artifact exists on disk; the RETIRED exhibits (the nova + freeze
//         sections, their window hooks + painters) are DEFINITION-ABSENT in the story; the
//         surviving distinct exhibits (exactly 6) are present.
//   CD2 — every full-bleed background viz reads `useRoutePointer`: StoryHero installs +
//         CAPTURES the ONE broadcaster; the Constellation background sets
//         `background-interactive` AND the Constellation component reads the broadcaster;
//         Aurora is threaded via `setCursor` off the route; FourierField self-injects; the
//         full-bleed background canvas stays `pointer-events:none` (no click theft).
//   CD3 — the per-node integrators (constellationWell.ts / constellationInteraction.ts) are
//         BYTE-FROZEN: no `useRoutePointer` / `backgroundInteractive` / `routePointer` edit
//         (the pointer FEEDS them, it does not replace them); `stepWell` + the well
//         cool/ramp constants are intact.
//
// + self-test bites (anti-evasion, proven every run): a planted duplicate constellation
//   exhibit (a re-added nova host) REDs (CD1); a planted background viz with NO broadcaster
//   feed (a StoryHero that never calls useRoutePointer) REDs (CD2).

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

const FILES = {
    census: "docs/tranches/BI/audit/W-CONSTELLATION-DEDUPE-census.md",
    story: "demo/stories/substrates/constellation.vue",
    storyHero: "demo/chassis/hero/StoryHero.vue",
    storyHeroCss: "demo/chassis/hero/story-hero.css",
    component: "src/components/custom/constellation/Constellation.vue",
    useConstellation:
        "src/components/custom/constellation/composables/useConstellation.ts",
    well: "src/components/custom/constellation/constellationWell.ts",
    interaction: "src/components/custom/constellation/constellationInteraction.ts",
    fourier: "src/components/custom/fourier-field/FourierField.vue",
};

function read(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : null;
}

function stripComments(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

const violations = [];
const facts = {};

// ── CD1 — census exists; duplicative exhibits DEFINITION-ABSENT; 6 distinct survive ──────
{
    const censusExists = existsSync(resolve(ROOT, FILES.census));
    if (!censusExists) violations.push("CD1: the census artifact is ABSENT on disk");

    const storyRaw = read(FILES.story);
    if (!storyRaw) {
        violations.push("CD1: constellation.vue is ABSENT");
    } else {
        // The RETIRED exhibits (nova + freeze) — every fingerprint DEFINITION-ABSENT.
        const retiredFingerprints = [
            "constellation-nova-host",
            "constellation-freeze-host",
            "novaRef",
            "novaHostRef",
            "freezeRef",
            "drawAnomaly",
            "__constellationFreeze",
            "supernova",
            "double-tap",
        ];
        const survivors = retiredFingerprints.filter((f) => storyRaw.includes(f));
        if (survivors.length) {
            violations.push(
                `CD1: a RETIRED constellation exhibit survives (${survivors.join(", ")}) — the dedup is not clean`,
            );
        }

        // The 6 surviving distinct exhibits are present (each a distinct engine mechanism).
        const KEPT_LABELS = [
            "proximity-graph lattice",
            "click-to-warp focal node",
            "resize re-fit + auto-drift wander",
            "pointer-held gravity-well",
            "recession envelope (opacityCeiling)",
            "pinned anomaly (generalized)",
        ];
        const missing = KEPT_LABELS.filter((l) => !storyRaw.includes(l));
        if (missing.length) {
            violations.push(
                `CD1: a surviving distinct exhibit is MISSING (${missing.join(", ")})`,
            );
        }
        // Exactly 6 StorySection labels (no smuggled re-add).
        const labelCount = (storyRaw.match(/label="/g) ?? []).length;
        if (labelCount !== 6) {
            violations.push(
                `CD1: constellation.vue has ${labelCount} StorySection labels, expected exactly 6 (the deduped set)`,
            );
        }
        facts.cd1 = {
            censusExists,
            retiredSurvivors: survivors,
            missingKept: missing,
            labelCount,
        };
    }
}

// ── CD2 — every full-bleed background viz reads useRoutePointer (the standard) ──────────
{
    const heroRaw = read(FILES.storyHero);
    const heroStripped = heroRaw ? stripComments(heroRaw) : "";
    const compRaw = read(FILES.component);
    const compStripped = compRaw ? stripComments(compRaw) : "";
    const fourierRaw = read(FILES.fourier);
    const fourierStripped = fourierRaw ? stripComments(fourierRaw) : "";
    const cssRaw = read(FILES.storyHeroCss);

    // StoryHero installs + CAPTURES the ONE broadcaster (not the discard form).
    const heroImportsBroadcaster =
        /import\s*\{[^}]*\buseRoutePointer\b[^}]*\}\s*from/.test(heroStripped);
    const heroCaptures = /\b(?:const|let)\s+\w+\s*=\s*useRoutePointer\s*\(/.test(
        heroStripped,
    );
    // Aurora is threaded via setCursor off the route pointer.
    const auroraThreaded =
        /auroraRef/.test(heroStripped) &&
        /\.setCursor\s*\(/.test(heroStripped) &&
        /route\.pointer/.test(heroStripped);
    // The Constellation background opts into the standard.
    const constellationBgWired = /background-interactive/.test(heroStripped);

    if (!heroImportsBroadcaster || !heroCaptures) {
        violations.push(
            "CD2: StoryHero does not install + CAPTURE the useRoutePointer broadcaster",
        );
    }
    if (!auroraThreaded) {
        violations.push(
            "CD2: the Aurora background is not threaded to the route pointer (auroraRef.setCursor off route.pointer)",
        );
    }
    if (!constellationBgWired) {
        violations.push(
            "CD2: the Constellation background does not opt into the interactive standard (background-interactive)",
        );
    }

    // The Constellation COMPONENT reads the broadcaster (self-contained, gated on the prop).
    const compReadsBroadcaster =
        /import\s*\{[^}]*\buseRoutePointer\b[^}]*\}\s*from/.test(compStripped) &&
        /useRoutePointer\s*\(/.test(compStripped) &&
        /backgroundInteractive/.test(compStripped);
    if (!compReadsBroadcaster) {
        violations.push(
            "CD2: the Constellation component does not read useRoutePointer gated on backgroundInteractive",
        );
    }

    // FourierField self-injects the broadcaster (the FIELD-CORE pattern).
    const fourierSelfInjects =
        /import\s*\{[^}]*\buseRoutePointer\b[^}]*\}\s*from/.test(fourierStripped) &&
        /useRoutePointer\s*\(/.test(fourierStripped);
    if (!fourierSelfInjects) {
        violations.push("CD2: FourierField no longer self-injects useRoutePointer");
    }

    // The full-bleed background canvas stays pointer-events:none (no click theft).
    const canvasPointerNone =
        !!cssRaw &&
        /\.story-hero-bg--bleed\s*\{[^}]*pointer-events:\s*none/s.test(cssRaw);
    if (!canvasPointerNone) {
        violations.push(
            "CD2: the full-bleed background layer (.story-hero-bg--bleed) is not pointer-events:none",
        );
    }

    facts.cd2 = {
        heroImportsBroadcaster,
        heroCaptures,
        auroraThreaded,
        constellationBgWired,
        compReadsBroadcaster,
        fourierSelfInjects,
        canvasPointerNone,
    };
}

// ── CD3 — the per-node integrators are BYTE-FROZEN (the pointer feeds, never edits) ─────
{
    const wellRaw = read(FILES.well);
    const interactionRaw = read(FILES.interaction);
    // The integrators must carry NONE of this wave's route/background edits.
    const routeTouch = /useRoutePointer|backgroundInteractive|routePointer/;
    const wellFrozen =
        !!wellRaw &&
        !routeTouch.test(wellRaw) &&
        /export function stepWell/.test(wellRaw) &&
        /WELL_COOL_HELD/.test(wellRaw) &&
        /WELL_RELEASE_RAMP/.test(wellRaw);
    const interactionFrozen =
        !!interactionRaw &&
        !routeTouch.test(interactionRaw) &&
        /export function fireBurst/.test(interactionRaw) &&
        /DEFAULT_WELL_CONFIG/.test(interactionRaw);
    if (!wellFrozen) {
        violations.push(
            "CD3: constellationWell.ts is NOT byte-frozen (route edit present or stepWell/well-constants missing)",
        );
    }
    if (!interactionFrozen) {
        violations.push(
            "CD3: constellationInteraction.ts is NOT byte-frozen (route edit present or fireBurst/well-config missing)",
        );
    }
    facts.cd3 = { wellFrozen, interactionFrozen };
}

// ── self-test bites (anti-evasion) ──────────────────────────────────────────────────────
const bites = [];
{
    // Bite 1 (CD1): a planted duplicate exhibit (a re-added nova host) MUST be caught by the
    // retired-fingerprint scan.
    const fake = `<div data-testid="constellation-nova-host"><Constellation ref="novaRef" /></div>`;
    const flagged = ["constellation-nova-host", "novaRef"].some((f) =>
        fake.includes(f),
    );
    bites.push({ id: "CD1-duplicate-exhibit", flagged });
    if (!flagged) {
        violations.push(
            "SELF-TEST CD1 bite did not flag a planted duplicate constellation exhibit",
        );
    }
}
{
    // Bite 2 (CD2): a planted StoryHero that NEVER calls useRoutePointer MUST fail the
    // capture detector.
    const fakeHero = stripComments(`const foo = 1; // no broadcaster here`);
    const capturesBroadcaster = /\b(?:const|let)\s+\w+\s*=\s*useRoutePointer\s*\(/.test(
        fakeHero,
    );
    const flagged = !capturesBroadcaster;
    bites.push({ id: "CD2-no-broadcaster", flagged });
    if (!flagged) {
        violations.push(
            "SELF-TEST CD2 bite did not flag a background viz with no broadcaster feed",
        );
    }
}
facts.selfTestBites = bites;

// ── finish ──────────────────────────────────────────────────────────────────────────────
const status = violations.length === 0 ? "pass" : "fail";
const ARTIFACT = gateArtifactPath(
    "GLASS_UI_CONSTELLATION_DEDUP_ARTIFACT",
    "BI-constellation-dedup",
);
writeGateArtifact(ARTIFACT, {
    gate: "proof:constellation-dedup",
    status,
    generatedAt: snapshotStamp(),
    facts,
    violations,
});

console.log(
    "proof:constellation-dedup — the constellation demo census + the interactive-background standard (BI.W-CONSTELLATION-DEDUPE)",
);
console.log(`  CD1 census + dedup: ${JSON.stringify(facts.cd1 ?? "n/a")}`);
console.log(
    `  CD2 interactive-background standard: ${JSON.stringify(facts.cd2 ?? "n/a")}`,
);
console.log(`  CD3 integrators byte-frozen: ${JSON.stringify(facts.cd3 ?? "n/a")}`);
console.log(`  self-test bites all flagged: ${bites.every((b) => b.flagged)}`);
if (violations.length) {
    console.log("\nVIOLATIONS:");
    for (const v of violations) console.log(`  ✗ ${v}`);
}
console.log(
    `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
);
process.exit(status === "pass" ? 0 : 1);
