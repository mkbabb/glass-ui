#!/usr/bin/env node
// AU.W1 — the design-slice meta-gate (proof:au-w1-design).
//
// AU.W1 re-issues AT.W1's three design slices (blob-primitives · dock · color-gates)
// as-authored against HEAD 8e4cb9f — the last DEV wave before IMPL. This gate makes
// the design boundary falsifiable (CHARTER §3 W1):
//
//   (a) THE THREE SLICES EXIST under tranches/AU/design/.
//   (b) EACH CITES ITS AT.W1 ORIGIN + ITS HEAD DELTA (a grep for both an `AT.W1*`
//       origin citation and a HEAD-delta section).
//   (c) THE W1c SLICE IS THE GATE-FLEET REGISTRY — every gate the AU waves name is
//       enumerated with a greening wave (so no gate greens by being absent; inv-θ).
//       The actual gates.mjs entries land GREEN per-wave (inv-27 — green CI per wave).
//
// inv ε / bite-check: removing a slice reddens (a); deleting an origin/delta citation
// reddens (b); dropping a fleet gate from the W1c registry reddens (c).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

// The canonical AU gate fleet (the 18 IMPL gates + the W9/W10 meta-gates) — each MUST
// appear in AU.W1c-color-gates.md's registry with a greening wave. au-w0/au-w1 are the
// already-running DEV meta-gates; they appear too.
const FLEET = [
    "proof:dock-opacity-lockstep",
    "proof:strict-templates",
    "proof:peer-optional",
    "proof:vueuse-free-root",
    "proof:supportsPostTask-wired",
    "proof:font-axes",
    "proof:color-acyclic",
    "proof:single-color-core",
    "proof:webgl-substrate-single",
    "proof:frostShader-deleted",
    "proof:webgl-golden",
    "proof:blob-value-free",
    // proof:no-value-default RETIRED at the AY close (W-BLOB3 stripped the DI
    // contract it asserted); its W1c registry row stands as history.
    "proof:blob-color-equivalence",
    "proof:blob-space-gamma",
    "proof:dock-a11y-contract",
    "proof:dock-vocabulary",
    "proof:au-w9-consumers",
];

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    const DESIGN = resolve(ROOT, "docs/tranches/AU/design");
    _cliPaths = {
        ROOT,
        DESIGN,
        SLICES: {
            blob: resolve(DESIGN, "AU.W1-blob-primitives.md"),
            dock: resolve(DESIGN, "AU.W1b-dock.md"),
            color: resolve(DESIGN, "AU.W1c-color-gates.md"),
        },
        ARTIFACT: gateArtifactPath("GLASS_UI_AU_W1_ARTIFACT", "au-w1-design"),
    };
    return _cliPaths;
}

const ORIGIN_RE = /AT\.W1/;
const DELTA_RE = /HEAD delta|HEAD-delta|HEAD `8e4cb9f`|carried whole|delta @/i;
const WAVE_RE = /\bW(?:[0-9]|10)\b/; // a greening-wave token on a gate's registry row

function main() {
    const P = cliPaths();
    const violations = [];

    // (a) the three slices exist
    for (const [key, path] of Object.entries(P.SLICES)) {
        if (!existsSync(path)) violations.push(`missing design slice (${key}): ${path.replace(P.ROOT + "/", "")}`);
    }
    const allExist = violations.length === 0;

    // (b) each cites AT.W1 origin + HEAD delta
    if (allExist) {
        for (const [key, path] of Object.entries(P.SLICES)) {
            const text = readFileSync(path, "utf8");
            if (!ORIGIN_RE.test(text)) violations.push(`slice ${key} does not cite its AT.W1 origin`);
            if (!DELTA_RE.test(text)) violations.push(`slice ${key} does not record its HEAD-8e4cb9f delta`);
        }
    }

    // (c) the W1c slice is the gate-fleet registry — every fleet gate enumerated w/ a wave
    let registered = 0;
    if (allExist) {
        const color = readFileSync(P.SLICES.color, "utf8");
        const lines = color.split("\n");
        for (const gate of FLEET) {
            // find the REGISTRY ROW for this gate: a table row whose FIRST cell is
            // the gate (`| `gate` | wave | … |`). This disambiguates from prose
            // mentions of the gate name elsewhere in the slice.
            const rowRe = new RegExp(`^\\|\\s*\`${gate.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\``);
            const row = lines.find((l) => rowRe.test(l));
            if (!row) {
                violations.push(`W1c registry omits the fleet gate '${gate}' (no gate greens by being absent — inv-θ)`);
            } else if (!WAVE_RE.test(row)) {
                violations.push(`W1c registry row for '${gate}' carries no greening-wave token`);
            } else {
                registered += 1;
            }
        }
    }

    const report = {
        gate: "proof:au-w1-design",
        generatedAt: snapshotStamp(),
        slicesExist: allExist,
        fleetRegistered: registered,
        fleetTotal: FLEET.length,
        violations,
    };
    writeGateArtifact(P.ARTIFACT, report);

    if (violations.length) {
        console.error("[proof:au-w1-design] FAIL — AU.W1 design-slice violations:");
        for (const v of violations) console.error(`  ✗ ${v}`);
        process.exit(1);
    }
    console.log(
        `[proof:au-w1-design] PASS — 3 design slices exist (each cites AT.W1 origin + HEAD delta); the W1c registry enumerates all ${registered}/${FLEET.length} fleet gates with greening waves.`,
    );
}

main();
