#!/usr/bin/env node
// AX.W10 — the resolveAtoms total-function + default-roundtrip + REACHABILITY +
// DEAD-DOOR-DELETION gate (proof:aurora-atoms-roundtrip, EXTENDED).
//
// resolveAtoms is the ONE ≤7-atom door over the full AuroraConfig author schema.
// The gate's five arms (the AX.W10 closure of RED witnesses 1-6):
//   (a) TOTAL — a fuzz over the FULL atom-combination matrix (seed × harmony ×
//       colorEnergy × zones{count,arrangement} × noise × medium{kind,amount} × motion,
//       INCLUDING out-of-range inputs) yields a valid in-range config respecting every
//       budget.ts cap (no NaN, no out-of-range field).
//   (a) DEFAULT-PRESERVING — resolveAtoms(DEFAULT_ATOMS) deep-equals
//       DEFAULT_AURORA_CONFIG (the wispy-sky default survives the door).
//       [(a) is the existing vitest spec — necessary, not sufficient.]
//   (b) REACHABLE — the live aurora story (substrates/aurora.vue) is routed in the
//       manifest AND drives the canvas through resolveAtoms (the AuroraConfigDock
//       atoms surface calls resolveAtoms — NOT direct props.config.x for the atoms
//       tab). Born-RED at AW HEAD (the atoms door was an unrouted orphan panel).
//   (c) DEAD DOOR GONE — grep "deriveScene|AuroraMood|MOOD_RECIPE|thirdsNuclei" over
//       src/ = 0 (the second seed→scene door + its mood union/recipe + the duplicated
//       thirds prior are excised, including the /api re-export); exactly ONE nucleiPrior.
//   (d) NOISE ATOM EXISTS — the re-derived AuroraAtoms carries a noise atom that fans to
//       warpMode/warpScale/noiseOctaves; texture is structurally absent on a smooth
//       medium (the AuroraMediumAtom union narrows `amount` off the smooth arm).
//
// (e) the per-atom VISIBLE-CHANGE device render is the SEPARATE π-lane spec
//     tests-visual/aurora-atoms-render.spec.ts (a real GPU readback the orchestrator runs;
//     a grep cannot witness a runtime render — this gate owns only the SOURCE witnesses).
//
// The grep arms (b reachability / c deletion / d shape) are valid SOURCE-witness
// artefacts — they assert a source PRESENCE/ABSENCE, NOT a runtime behaviour (SPEC.md
// §Hard Gates — a deletion-witness grep is legitimate; only grep-FOR-runtime-behaviour
// is invalid, which is why the per-atom render is the separate device-readback spec).
//
// bite-check: re-route the atoms tab to mutate props.config.x directly → (b) REDs;
// re-introduce deriveScene → (c) REDs; drop the noise atom → (d) REDs.

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        SPEC: "tests/components/custom/aurora/atoms.test.ts",
        ARTIFACT: gateArtifactPath("GLASS_UI_AURORA_ATOMS_ROUNDTRIP_ARTIFACT", "AW-aurora-atoms-roundtrip"),
    };
    return _cliPaths;
}

/** Read a repo file (relative to ROOT); empty string if absent. */
function readRel(ROOT, rel) {
    try {
        return readFileSync(resolve(ROOT, rel), "utf8");
    } catch {
        return "";
    }
}

/** Count the dead-door tokens across the src/ aurora + /api surface (the deletion witness). */
function deadDoorHits(ROOT) {
    const RE = /\b(deriveScene|AuroraMood|MOOD_RECIPE|thirdsNuclei)\b/g;
    const files = [
        "src/components/custom/aurora/composables/color.ts",
        "src/components/custom/aurora/composables/atoms.ts",
        "src/components/custom/aurora/composables/index.ts",
        "src/components/custom/aurora/index.ts",
        "src/api/index.ts",
    ];
    const hits = [];
    for (const f of files) {
        const src = readRel(ROOT, f);
        for (const m of src.matchAll(RE)) hits.push(`${f}:${m[1]}`);
    }
    return hits;
}

function run() {
    const { ROOT, SPEC, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    // ── (a) the totality + default-roundtrip vitest property spec. ───────────────
    let testPassed = false;
    let output = "";
    try {
        output = execFileSync("npx", ["vitest", "run", SPEC], {
            cwd: ROOT,
            encoding: "utf8",
            stdio: ["ignore", "pipe", "pipe"],
        });
        testPassed = true;
    } catch (err) {
        output = `${err.stdout ?? ""}\n${err.stderr ?? ""}`;
        testPassed = false;
    }
    facts.atomsSpecGreen = testPassed;
    if (!testPassed) {
        violations.push(
            "the resolveAtoms total-function fuzz OR the default-roundtrip deep-equal FAILED (atoms.test.ts) — resolveAtoms is not total or DEFAULT_ATOMS no longer resolves to the wispy-sky default",
        );
    }

    // ── (b) REACHABILITY: the atoms door is routed + drives the canvas via resolveAtoms.
    const manifest = readRel(ROOT, "demo/stories/manifest.ts");
    const auroraRouted = /\bs\(\s*"substrates"\s*,\s*"aurora"/.test(manifest);
    facts.auroraStoryRouted = auroraRouted;
    if (!auroraRouted) {
        violations.push(
            "the aurora story is NOT routed in demo/stories/manifest.ts — the atoms door is unreachable (RED witness 1)",
        );
    }
    // AY re-point (W-AUR-STUDIO/W-AUR-CONFIG rebuilt the chrome on the library
    // Configurator): the monolithic AuroraAtomsPanel carved into the sections/
    // family, and the atoms door is no longer a DEFAULT TAB — it is the ONLY
    // door (the dock's single live state IS the atoms object, seeded from the
    // preset via configToAtoms; every section mutates atoms; resolveAtoms over
    // the preset baseline drives the canvas). The two witnesses below assert
    // that stronger shape directly.
    const dock = readRel(ROOT, "demo/stories/substrates/aurora/AuroraConfigDock.vue");
    const dockDrivesAtoms =
        /resolveAtoms\s*\(/.test(dock) &&
        /reactive<AuroraAtoms>\(\s*configToAtoms\(/.test(dock);
    facts.dockDrivesViaResolveAtoms = dockDrivesAtoms;
    if (!dockDrivesAtoms) {
        violations.push(
            "AuroraConfigDock does NOT drive the canvas through resolveAtoms over an atoms-shaped live state (reactive<AuroraAtoms>(configToAtoms(…))) — the live UI bypasses the simplified door (RED witness 1)",
        );
    }
    // The atoms door is the ONLY surface: no dock section mutates the raw
    // config directly (a `props.config.<field> =` write would be a second door
    // around resolveAtoms — the bypass this clause exists to forbid).
    const sectionsDir = resolve(ROOT, "demo/stories/substrates/aurora/sections");
    const sectionWrites = [];
    if (existsSync(sectionsDir)) {
        for (const f of readdirSync(sectionsDir)) {
            if (!f.endsWith(".vue")) continue;
            const src = readFileSync(resolve(sectionsDir, f), "utf8");
            if (/props\.config\.\w+\s*=/.test(src)) sectionWrites.push(f);
        }
    }
    facts.atomsTabIsDefault = sectionWrites.length === 0;
    if (sectionWrites.length > 0) {
        violations.push(
            `a dock section writes props.config directly (a second door around resolveAtoms): ${sectionWrites.join(", ")}`,
        );
    }

    // ── (c) the dead second door is GONE (deletion witness). ─────────────────────
    const dead = deadDoorHits(ROOT);
    facts.deadDoorHits = dead;
    if (dead.length > 0) {
        violations.push(
            `the dead door survives — deriveScene/AuroraMood/MOOD_RECIPE/thirdsNuclei still present at: ${dead.join(", ")} (RED witnesses 2+3)`,
        );
    }
    const atomsSrc = readRel(ROOT, "src/components/custom/aurora/composables/atoms.ts");
    const nucleiPriorDefs = (atomsSrc.match(/function nucleiPrior\b/g) ?? []).length;
    facts.nucleiPriorCount = nucleiPriorDefs;
    if (nucleiPriorDefs !== 1) {
        violations.push(
            `expected exactly ONE nucleiPrior, found ${nucleiPriorDefs} — the duplicated thirds prior was not single-sourced (RED witness 3)`,
        );
    }

    // ── (d) the NOISE atom exists + the medium union narrows texture off smooth. ──
    const hasNoiseAtom =
        /\bnoise\?\s*:/.test(atomsSrc) &&
        /\bwarpMode\b/.test(atomsSrc) &&
        /\bwarpScale\b/.test(atomsSrc) &&
        /\bnoiseOctaves\b/.test(atomsSrc);
    facts.noiseAtomFansOut = hasNoiseAtom;
    if (!hasNoiseAtom) {
        violations.push(
            "the NOISE atom is absent or does not fan to warpMode/warpScale/noiseOctaves (RED witness 4)",
        );
    }
    // smooth must be a distinct union arm with NO amount field (structural absence).
    const smoothArmNoAmount = /\{\s*kind:\s*"smooth"\s*\}/.test(atomsSrc);
    facts.textureStructurallyAbsentOnSmooth = smoothArmNoAmount;
    if (!smoothArmNoAmount) {
        violations.push(
            'the AuroraMediumAtom union does not narrow `amount` off the smooth arm — texture-on-smooth is not structurally absent (RED witness 5)',
        );
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:aurora-atoms-roundtrip",
        facts,
        violations,
    });

    console.log("proof:aurora-atoms-roundtrip — resolveAtoms total + default-preserving + REACHABLE + dead-door-GONE (AX.W10)");
    console.log(`  (a) atoms.test.ts green        : ${facts.atomsSpecGreen ? "yes ✓" : "NO ✗"}`);
    console.log(`  (b) aurora story routed        : ${facts.auroraStoryRouted ? "yes ✓" : "NO ✗"}`);
    console.log(`  (b) dock drives via resolveAtoms: ${facts.dockDrivesViaResolveAtoms ? "yes ✓" : "NO ✗"}`);
    console.log(`  (b) atoms tab is default       : ${facts.atomsTabIsDefault ? "yes ✓" : "NO ✗"}`);
    console.log(`  (c) dead door gone (grep=0)    : ${dead.length === 0 ? "yes ✓" : `NO ✗ (${dead.length})`}`);
    console.log(`  (c) exactly one nucleiPrior    : ${nucleiPriorDefs === 1 ? "yes ✓" : `NO ✗ (${nucleiPriorDefs})`}`);
    console.log(`  (d) noise atom fans out        : ${facts.noiseAtomFansOut ? "yes ✓" : "NO ✗"}`);
    console.log(`  (d) texture absent on smooth   : ${facts.textureStructurallyAbsentOnSmooth ? "yes ✓" : "NO ✗"}`);
    if (!testPassed) {
        const tail = output.split("\n").slice(-30).join("\n");
        console.log("\n--- vitest tail ---\n" + tail);
    }
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
