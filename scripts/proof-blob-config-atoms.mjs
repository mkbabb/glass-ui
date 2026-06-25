#!/usr/bin/env node
// AY.W-BLOB2 — the BlobConfig atom-count CEILING gate (proof:blob-config-atoms).
//
// The aurora track shipped a ≤7-atom door (resolveAtoms, proof:aurora-atoms-roundtrip);
// the blob carried the IDENTICAL ~50-knob sprawl with NO simplification clause. This gate
// is the blob-shaped twin: it asserts the public `BlobConfig` top-level surface is reduced
// to an ATOM set — the flat length/weight/duration knobs folded BEHIND eight cohesive
// atoms (J §6.3 "the variant IS the bundle"), and the three derived-but-unread fields the
// AX synthesis flagged DELETED from the config surface.
//
// THREE source-witness arms (all valid build/parse artefacts — a field count, a deletion
// grep, a default round-trip; NOT grep-for-runtime-behaviour):
//
//   (1) CEILING — the `BlobConfig` interface's TOP-LEVEL field count ≤ CEILING (12). The
//       count walks ONLY the BlobConfig block (NOT the bundled sub-interface fields, NOT
//       MoodParams / SatelliteInternal — those are internal/per-atom derived state). Born-
//       RED at the pre-prune 46 flat fields verified at HEAD; GREEN at the 8-atom bundle.
//   (2) DELETION-WITNESS — the three derived-but-unread fields `orbitSpeedScale` /
//       `wobbleScale` / `mergeRate` are GONE from the CONFIG surface (the BlobConfig
//       interface + every bundled atom sub-interface + BLOB_CONFIG_DEFAULTS). They
//       legitimately SURVIVE on `MoodParams` (read off the mood params by
//       useBlobSatellites.tick — proof:blob-mood-resolved is the witness), so the grep is
//       scoped to the config-surface region of types.ts, never the whole file.
//   (3) ROUND-TRIP — BLOB_CONFIG_DEFAULTS (imported live via tsx) deep-conforms to the
//       BlobConfig shape: every declared atom is present and every declared field under it
//       has a default (no orphan field, no missing default — the "every remaining field has
//       a default" arm).
//
// bite-check: re-add a deleted field to BlobConfig → the count exceeds the ceiling (1) AND
// the deletion-witness REDs (2); drop an atom's default → the round-trip REDs (3).

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const CEILING = 12; // ≤12 top-level config atoms (RESEARCH.md §2.2; aurora atom-set mirror)
const DELETED_FIELDS = ["orbitSpeedScale", "wobbleScale", "mergeRate"];

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        TYPES: resolve(ROOT, "src/components/custom/goo-blob/types.ts"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_BLOB_CONFIG_ATOMS_ARTIFACT",
            "AY-blob-config-atoms",
        ),
    };
    return _cliPaths;
}

/** Extract the body of `interface <name> { … }` from a source string (brace-balanced). */
function interfaceBody(src, name) {
    const m = src.match(new RegExp(`interface\\s+${name}\\s*\\{`));
    if (!m) return null;
    const start = m.index + m[0].length;
    let depth = 1;
    let i = start;
    for (; i < src.length && depth > 0; i++) {
        if (src[i] === "{") depth++;
        else if (src[i] === "}") depth--;
    }
    return depth === 0 ? src.slice(start, i - 1) : null;
}

/**
 * Count the TOP-LEVEL `field:` / `field?:` declarations in an interface body, ignoring any
 * NESTED brace block (a bundled atom's inline-object fields do not count toward the
 * top-level ceiling — they live BEHIND the atom). One line, one field.
 */
function topLevelFieldNames(body) {
    const names = [];
    let depth = 0;
    for (const raw of body.split("\n")) {
        const line = raw.trim();
        // Track nesting: a `{` opens an inline-object/atom, `}` closes it. We only read a
        // field declaration when depth === 0 (the BlobConfig top level).
        const opens = (line.match(/\{/g) ?? []).length;
        const closes = (line.match(/\}/g) ?? []).length;
        if (depth === 0) {
            const fm = line.match(/^([a-zA-Z_]\w*)\??\s*:/);
            // A line that DECLARES a field AND opens an inline object on the same line
            // (e.g. `geometry: {`) still counts as ONE top-level field — match before the
            // depth change is applied.
            if (fm) names.push(fm[1]);
        }
        depth += opens - closes;
        if (depth < 0) depth = 0;
    }
    return names;
}

/** Recursively walk an object's leaf paths (for the round-trip "every field has a default"). */
function leafPaths(obj, prefix = "") {
    const out = [];
    for (const [k, v] of Object.entries(obj)) {
        const path = prefix ? `${prefix}.${k}` : k;
        if (v !== null && typeof v === "object" && !Array.isArray(v)) {
            out.push(...leafPaths(v, path));
        } else {
            out.push(path);
        }
    }
    return out;
}

async function run() {
    const { ROOT, TYPES, ARTIFACT } = cliPaths();
    const src = readFileSync(TYPES, "utf8");
    const violations = [];
    const facts = {};

    // ── Arm 1: the top-level field-count CEILING ──────────────────────────────────────
    const body = interfaceBody(src, "BlobConfig");
    if (!body) {
        violations.push(
            "could not parse the `interface BlobConfig { … }` block from types.ts — the surface moved; the ceiling cannot be counted",
        );
    }
    const topFields = body ? topLevelFieldNames(body) : [];
    facts.topLevelFieldCount = topFields.length;
    facts.ceiling = CEILING;
    facts.topLevelFields = topFields;
    if (body && topFields.length > CEILING) {
        violations.push(
            `BlobConfig declares ${topFields.length} top-level fields — exceeds the atom CEILING ${CEILING}. Fold the flat knobs behind cohesive atoms (the aurora atom-set discipline). Fields: ${topFields.join(", ")}`,
        );
    }

    // ── Arm 2: the deletion-witness (scoped to the CONFIG surface, NOT MoodParams) ──────
    // The config surface = the BlobConfig interface body + every bundled atom
    // sub-interface body + the BLOB_CONFIG_DEFAULTS literal. The deleted fields survive on
    // MoodParams (the mood-param twin), so we grep ONLY the config-surface region.
    const ATOM_INTERFACES = [
        "BlobGeometry",
        "BlobSatelliteTiming",
        "BlobMembrane",
        "BlobColor",
        "BlobSurface",
        "BlobInteraction",
    ];
    let configSurface = body ?? "";
    for (const iface of ATOM_INTERFACES) {
        const b = interfaceBody(src, iface);
        if (b) configSurface += "\n" + b;
    }
    // The BLOB_CONFIG_DEFAULTS literal (the assignment block).
    const defMatch = src.match(/const BLOB_CONFIG_DEFAULTS[\s\S]*?\n\};/);
    if (defMatch) configSurface += "\n" + defMatch[0];

    const survivors = DELETED_FIELDS.filter((f) =>
        new RegExp(`\\b${f}\\b`).test(configSurface),
    );
    facts.deletedFields = DELETED_FIELDS;
    facts.survivorsOnConfigSurface = survivors;
    if (survivors.length) {
        violations.push(
            `the derived-but-unread field(s) [${survivors.join(", ")}] still appear on the BlobConfig surface — they are config-level identity no-ops (read only off MoodParams), so they must be DELETED from the config (they legitimately stay on MoodParams). Strike them from the BlobConfig atom + BLOB_CONFIG_DEFAULTS.`,
        );
    }

    // ── Arm 3: BLOB_CONFIG_DEFAULTS round-trips to a complete BlobConfig ────────────────
    // Import the live module so the defaults are the SHIPPED const, then assert every
    // declared atom is present + every declared field under it has a non-undefined default.
    let defaults = null;
    try {
        const out = execFileSync(
            "npx",
            [
                "tsx",
                "-e",
                `import { BLOB_CONFIG_DEFAULTS } from "${TYPES}"; process.stdout.write(JSON.stringify(BLOB_CONFIG_DEFAULTS));`,
            ],
            { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
        );
        defaults = JSON.parse(out.slice(out.indexOf("{")));
    } catch (e) {
        violations.push(
            `could not import BLOB_CONFIG_DEFAULTS for the round-trip arm: ${String(e).split("\n")[0]}`,
        );
    }

    if (defaults) {
        // Every top-level atom declared on BlobConfig must be present in the defaults.
        // OPTIONAL top-level atoms (declared `name?:`) legitimately carry NO default — their
        // absence is the documented derived floor (e.g. BD.W-GOO-CAROUSEL-DECK's `morphT?`: when
        // absent the upload derives the byte-identical STAGE-1 pure-blob floor, so the default
        // blob is the un-morphed blob — a default would force a non-default identity). The
        // "no orphan" rule binds only the REQUIRED atoms; an optional consumer-animated lever is
        // exempt. (A REQUIRED atom with no default is still the orphan the gate guards.)
        const optionalTop = body
            ? body
                  .split("\n")
                  .map((l) => l.trim().match(/^([a-zA-Z_]\w*)\?\s*:/))
                  .filter(Boolean)
                  .map((m) => m[1])
            : [];
        facts.optionalTopAtoms = optionalTop;
        const missingAtoms = topFields.filter(
            (f) => !(f in defaults) && !optionalTop.includes(f),
        );
        facts.missingAtomDefaults = missingAtoms;
        if (missingAtoms.length) {
            violations.push(
                `BLOB_CONFIG_DEFAULTS is missing a default for REQUIRED atom(s): ${missingAtoms.join(", ")} (every required declared atom must have a default — no orphan; optional \`name?:\` levers are exempt).`,
            );
        }
        // Every declared field under each bundled atom must have a default. Cross-check the
        // sub-interface declared fields against the defaults' leaf set.
        for (const [iface, atomKey] of [
            ["BlobGeometry", "geometry"],
            ["BlobSatelliteTiming", "satellites"],
            ["BlobMembrane", "membrane"],
            ["BlobColor", "color"],
            ["BlobSurface", "surface"],
            ["BlobInteraction", "interaction"],
        ]) {
            const ib = interfaceBody(src, iface);
            if (!ib || !defaults[atomKey]) continue;
            const declared = topLevelFieldNames(ib);
            const present = Object.keys(defaults[atomKey]);
            const missing = declared.filter((d) => !present.includes(d));
            if (missing.length) {
                violations.push(
                    `the ${atomKey} atom is missing a default for field(s): ${missing.join(", ")} (declared on ${iface} but absent in BLOB_CONFIG_DEFAULTS.${atomKey}).`,
                );
            }
        }
        facts.defaultLeafCount = leafPaths(defaults).length;
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:blob-config-atoms",
        facts,
        violations,
    });

    console.log(
        "proof:blob-config-atoms — the BlobConfig atom-count CEILING (≤12) (AY.W-BLOB2)",
    );
    console.log(
        `  (1) top-level atoms      : ${facts.topLevelFieldCount} / ${CEILING} ${
            facts.topLevelFieldCount <= CEILING ? "✓" : "✗"
        }`,
    );
    console.log(
        `  (2) deleted fields gone  : ${
            survivors.length === 0 ? "✓" : `✗ (${survivors.join(", ")})`
        }`,
    );
    console.log(
        `  (3) defaults round-trip  : ${
            defaults &&
            (facts.missingAtomDefaults ?? []).length === 0 &&
            !violations.some((v) => v.includes("missing a default"))
                ? "✓"
                : "✗"
        }`,
    );
    if (facts.topLevelFields)
        console.log(`  atoms: ${facts.topLevelFields.join(" · ")}`);
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
