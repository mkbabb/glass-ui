#!/usr/bin/env node
// AU.W3 — the peer-optional gate (proof:peer-optional).
//
// At HEAD package.json carried a NON-STANDARD `optionalPeerDependencies` field —
// npm reads it as NOTHING, so every peer was silently REQUIRED (and CLAUDE.md's
// optional-peer claim was false). AU.W3 deletes that dead field (P1) and uses the
// standard `peerDependenciesMeta[P].optional`. This gate asserts the DERIVED fact:
//
//   a peer P is `optional: true`  IFF  (P's literal is ABSENT from the root bundle
//   `dist/glass-ui.js`)  AND  (P is not a CORE-SUBSTRATE peer).
//
// The root bundle is the v1.0 vueuse-FREE curated barrel; a peer it imports is
// needed by the core (REQUIRED), one it does not is feature-specific (only some
// subpaths need it — a Button-only consumer can omit it, so OPTIONAL). The
// CORE-SUBSTRATE allowlist names the peers that are universally required despite
// being ABSENT from the JS bundle (they're consumed outside it): the CSS framework
// (tailwindcss), the inlined cn() util (clsx), and the pervasive icon set
// (@lucide/vue).
//
// Also asserts the dead `optionalPeerDependencies` field is GONE (P1, no alias).
//
// inv ε / bite-check: re-adding a hard import of an optional peer into the root
// bundle (so its literal appears in glass-ui.js) flips it to IN → it should be
// required → the still-optional mark reddens. RED@HEAD (the absent feature-peers
// were not marked optional); greens after the field reshape.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

// Peers universally required despite being absent from the JS root bundle.
const CORE_SUBSTRATE = new Set(["tailwindcss", "clsx", "@lucide/vue"]);

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        PKG: resolve(ROOT, "package.json"),
        DIST: resolve(ROOT, "dist/glass-ui.js"),
        ARTIFACT: gateArtifactPath("GLASS_UI_PEER_OPTIONAL_ARTIFACT", "AU-peer-optional"),
    };
    return _cliPaths;
}

function literalInDist(dist, dep) {
    const re = new RegExp(`["'/]${dep.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'/]`);
    return re.test(dist);
}

function run() {
    const { ROOT, PKG, DIST, ARTIFACT } = cliPaths();
    const pkg = JSON.parse(readFileSync(PKG, "utf8"));
    const violations = [];
    const facts = { peers: {} };

    // (P1) the dead field is gone.
    if (pkg.optionalPeerDependencies !== undefined) {
        violations.push("the non-standard `optionalPeerDependencies` field still exists — DELETE it (P1); npm reads it as nothing");
    }

    const peers = pkg.peerDependencies ?? {};
    const meta = pkg.peerDependenciesMeta ?? {};

    if (!existsSync(DIST)) {
        violations.push("dist/glass-ui.js is absent — build before this gate (the derived fact reads the root bundle)");
    } else {
        const dist = readFileSync(DIST, "utf8");
        for (const dep of Object.keys(peers)) {
            const inDist = literalInDist(dist, dep);
            const isCore = CORE_SUBSTRATE.has(dep);
            const shouldBeOptional = !inDist && !isCore;
            const isOptional = meta[dep]?.optional === true;
            facts.peers[dep] = { inDist, isCore, shouldBeOptional, isOptional };
            if (shouldBeOptional && !isOptional) {
                violations.push(`${dep} is absent from the root bundle (feature-specific) but NOT marked optional in peerDependenciesMeta`);
            }
            if (!shouldBeOptional && isOptional) {
                const why = inDist ? "it is imported by the root bundle (required)" : "it is a CORE-SUBSTRATE peer (required)";
                violations.push(`${dep} is marked optional but ${why}`);
            }
        }
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, gate: "proof:peer-optional", facts, violations });

    console.log("proof:peer-optional — peer optionality is a derived fact of the root bundle (AU.W3)");
    for (const [dep, f] of Object.entries(facts.peers)) {
        console.log(`  ${f.shouldBeOptional ? "optional" : "required"}  ${dep.padEnd(26)} (${f.inDist ? "in" : "out"}${f.isCore ? ", core" : ""}; marked ${f.isOptional ? "optional" : "required"})`);
    }
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
