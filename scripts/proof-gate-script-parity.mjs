// AX.W00 — proof:gate-script-parity, the proof-script ↔ package.json BIJECTION
// meta-gate (pure FS/JSON — device-free).
//
// AW shipped a partially-hand-registered gate fleet: a `scripts/proof-*.mjs` with
// no matching `proof:*` package.json script ships UNENFORCED (it runs in no
// aggregate, drifts undetected). This gate asserts the bijection so a proof script
// can never ship unregistered again, AND that every gates.mjs manifest row resolves
// to a real, runnable npm script.
//
// THE BIJECTION IS NOT 1:1 file↔key (the recon's complexity note):
//   - Some proof:* keys legitimately reference NO .mjs (vitest / bash / composite):
//       proof:dock-a11y-contract → `vitest run …`, proof:consumers:build → `bash …`,
//       proof:aurora-tensor-field → `node …mjs && vitest …`, proof:all → gates.mjs.
//     These have a proof:* registration but no DEDICATED proof-*.mjs and are
//     LEGITIMATE — not violations.
//   - Name drift: proof:theme → proof-theme-style.mjs, proof:resolution →
//     proof-resolution-contract.mjs, proof:dock-css-split → proof-dock-controls-
//     split.mjs, proof:frostShader-deleted → proof-frostshader-deleted.mjs (case),
//     proof:supportsPostTask-wired → proof-supports-post-task-wired.mjs.
//   So the match is by SCANNING each proof:* cmd string for the `scripts/proof-*.mjs`
//   it references — NOT a naive id↔filename transform (which would false-RED all the
//   name-drifted + vitest/bash keys).
//
// THE THREE ASSERTS:
//   A. SCRIPT-REGISTERED — every `scripts/proof-*.mjs` file is referenced by at
//      least one `proof:*` package.json cmd (no orphan proof script).
//   B. CMD-RESOLVES — every `scripts/proof-*.mjs` REFERENCED by a proof:* cmd
//      exists on disk (no dangling script reference).
//   C. MANIFEST-RESOLVES — every gates.mjs GATES row's `cmd` is a real package.json
//      script (the manifest never points at a ghost).
//
// THE STANDING KNOWN-ORPHAN BASELINE (the AW partially-registered fleet). Six
// proof-*.mjs were authored by AW waves W12–W16 + W3b but never registered in
// package.json (the exact class this meta-gate exists to catch). Registering them is
// OUT of W00 FileBounds — each ties to its own AW/AX wave (it may reference src/
// paths or a test that does not pass at HEAD), and W00 writes no src/ + co-edits no
// other wave's registration line. So they are recorded here as a FINITE, OWNER-
// ATTRIBUTED standing baseline: an explicit allowlist, NOT a fail-open wildcard. A
// NEW orphan (any proof-*.mjs not on this list and not registered) STILL reds —
// the gate is load-bearing. The allowlist shrinks to empty as each owner wave
// registers (or removes) its script. This is the fail-EXPLICIT shape: the orphans
// are named + owed, never silently swept.
const KNOWN_ORPHANS = new Map([
    ["proof-affordance-contrast.mjs", "AW.W13 — owner-wave registers/removes"],
    ["proof-composable-return-types.mjs", "AW.W15 — owner-wave registers/removes"],
    ["proof-datatable-split.mjs", "AW.W14 — owner-wave registers/removes"],
    ["proof-dock-big-dock.mjs", "AW.W3b — owner-wave registers/removes"],
    ["proof-glass-panel-tiers.mjs", "AW.W12 — owner-wave registers/removes"],
]);

// THE STANDING KNOWN-DANGLING baseline. Two proof:* package.json scripts were
// registered by AW waves but their proof-*.mjs file does NOT exist on disk — so
// `npm run <gate>` currently CRASHES (module-not-found). This is a pre-existing
// AW bijection breach (NOT introduced by W00), worse than an orphan: a dangling
// CI-tagged gate (proof:styling-hygiene is a gates.mjs ci row) crashes CI. Fixing
// it means authoring/restoring the missing scripts — OUT of W00 FileBounds (each
// belongs to its owner wave + may assert over src/ this wave does not touch). Like
// KNOWN_ORPHANS this is a FINITE, OWNER-ATTRIBUTED allowlist: any NEW dangling
// reference STILL reds. Recorded in W00-pi-lane.json as an owed roadblock for
// orchestrator triumvirate dispatch.
const KNOWN_DANGLING = new Map([
    ["proof:styling-hygiene", "AW.W20 — missing proof-styling-hygiene.mjs (CI-tagged, crashes)"],
    ["proof:glass-card-tiers", "AW.W12 — missing proof-glass-card-tiers.mjs"],
]);
//
// Bite (the §HardGate-3 RED witness): remove a `proof:*` registration whose
// proof-*.mjs still exists AND is NOT in KNOWN_ORPHANS → assert A reds (orphan
// script); add a gates.mjs row with a cmd that is not a package.json script → assert
// C reds.

import { readFileSync, readdirSync } from "node:fs";
import { resolve, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const SCRIPTS_DIR = resolve(ROOT, "scripts");
const PKG_PATH = resolve(ROOT, "package.json");
const COMMAND = "npm run proof:gate-script-parity";

/** Every `scripts/proof-*.mjs` filename (the actual fleet on disk). */
function proofScriptFiles() {
    return readdirSync(SCRIPTS_DIR)
        .filter((f) => /^proof-.*\.mjs$/.test(f))
        .sort();
}

/** The `proof:*` script entries from package.json (id → cmd string). */
function proofScripts(pkg) {
    return Object.entries(pkg.scripts ?? {}).filter(([id]) =>
        id.startsWith("proof:"),
    );
}

/** Extract every `scripts/proof-*.mjs` path a cmd string references. */
function referencedScripts(cmd) {
    return [...cmd.matchAll(/scripts\/(proof-[A-Za-z0-9._-]+\.mjs)/g)].map(
        (m) => m[1],
    );
}

export function detect() {
    const violations = [];
    const facts = {};

    const pkg = JSON.parse(readFileSync(PKG_PATH, "utf8"));
    const files = proofScriptFiles();
    const scripts = proofScripts(pkg);
    facts.proofScriptFiles = files.length;
    facts.proofScriptKeys = scripts.length;

    // The set of proof-*.mjs files referenced by ANY proof:* cmd.
    const referenced = new Set();
    for (const [, cmd] of scripts) {
        for (const f of referencedScripts(cmd)) referenced.add(f);
    }

    // ── A. SCRIPT-REGISTERED — no orphan proof-*.mjs (every file is referenced),
    // EXCEPT the finite owner-attributed KNOWN_ORPHANS baseline (the AW fleet).
    const allOrphans = files.filter((f) => !referenced.has(f));
    const newOrphans = allOrphans.filter((f) => !KNOWN_ORPHANS.has(f));
    const baselineOrphans = allOrphans.filter((f) => KNOWN_ORPHANS.has(f));
    facts.orphanScripts = newOrphans;
    facts.knownOrphanBaseline = baselineOrphans.map((f) => ({
        file: f,
        owner: KNOWN_ORPHANS.get(f),
    }));
    for (const f of newOrphans) {
        violations.push(
            `orphan proof script: scripts/${f} has NO proof:* package.json registration (it ships unenforced — register it or remove it)`,
        );
    }
    // A KNOWN_ORPHANS entry that has SINCE been registered (or removed) is stale —
    // flag it so the allowlist shrinks honestly (never carries a dead entry).
    for (const [f] of KNOWN_ORPHANS) {
        if (!files.includes(f)) {
            violations.push(
                `stale KNOWN_ORPHANS entry: scripts/${f} no longer exists — remove it from the allowlist`,
            );
        } else if (referenced.has(f)) {
            violations.push(
                `stale KNOWN_ORPHANS entry: scripts/${f} is now registered — remove it from the allowlist (the owner wave landed it)`,
            );
        }
    }

    // ── B. CMD-RESOLVES — every referenced proof-*.mjs exists on disk, EXCEPT the
    // finite owner-attributed KNOWN_DANGLING baseline (the AW crashing-gate breach).
    const fileSet = new Set(files);
    const dangling = [];
    const baselineDangling = [];
    for (const [id, cmd] of scripts) {
        for (const f of referencedScripts(cmd)) {
            if (fileSet.has(f)) continue;
            if (KNOWN_DANGLING.has(id))
                baselineDangling.push({ id, file: f, owner: KNOWN_DANGLING.get(id) });
            else dangling.push({ id, file: f });
        }
    }
    facts.danglingReferences = dangling;
    facts.knownDanglingBaseline = baselineDangling;
    for (const { id, file } of dangling) {
        violations.push(
            `dangling script reference: ${id} → scripts/${file} does not exist on disk`,
        );
    }
    // A KNOWN_DANGLING entry that now RESOLVES is stale — flag so the allowlist
    // shrinks honestly.
    for (const [id, cmd] of scripts) {
        if (!KNOWN_DANGLING.has(id)) continue;
        const refs = referencedScripts(cmd);
        if (refs.length === 0 || refs.every((f) => fileSet.has(f))) {
            violations.push(
                `stale KNOWN_DANGLING entry: ${id} now resolves — remove it from the allowlist (the owner wave landed the script)`,
            );
        }
    }

    // ── C. MANIFEST-RESOLVES — every gates.mjs GATES row's cmd is a real script.
    // Parse the GATES array's `cmd: "…"` literals out of gates.mjs (the manifest
    // source) and check each resolves to a package.json script. (We parse the
    // source rather than import to stay free of gates.mjs's CLI side effects.)
    const gatesSrc = readFileSync(resolve(SCRIPTS_DIR, "gates.mjs"), "utf8");
    const cmds = [...gatesSrc.matchAll(/\bcmd:\s*"([^"]+)"/g)].map((m) => m[1]);
    facts.manifestCmds = cmds.length;
    const scriptNames = new Set(Object.keys(pkg.scripts ?? {}));
    const ghostCmds = [...new Set(cmds)].filter((c) => !scriptNames.has(c));
    facts.ghostManifestCmds = ghostCmds;
    for (const c of ghostCmds) {
        violations.push(
            `gates.mjs manifest row cmd "${c}" is not a package.json script — the manifest points at a ghost`,
        );
    }

    return { facts, violations };
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_GATE_SCRIPT_PARITY_ARTIFACT",
        "AX-gate-script-parity",
    );
    const { facts, violations } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: COMMAND,
        facts,
        violations,
    });

    console.log("proof:gate-script-parity — the proof-script ↔ package.json bijection meta-gate (AX.W00)");
    console.log(`  proof-*.mjs files     : ${facts.proofScriptFiles}`);
    console.log(`  proof:* script keys   : ${facts.proofScriptKeys}`);
    console.log(`  NEW orphan scripts    : ${facts.orphanScripts.length}`);
    console.log(
        `  known-orphan baseline : ${facts.knownOrphanBaseline.length} (AW fleet, owner-owed)`,
    );
    console.log(`  NEW dangling refs     : ${facts.danglingReferences.length}`);
    console.log(
        `  known-dangling baseline: ${facts.knownDanglingBaseline.length} (AW fleet, owner-owed)`,
    );
    console.log(`  gates.mjs ghost cmds  : ${facts.ghostManifestCmds.length}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${relative(ROOT, ARTIFACT)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
