// AW.W27 — the peer-conformance gate (proof:peer-conformance).
//
// glass-ui's `@mkbabb/keyframes.js` + `@mkbabb/value.js` peer ranges must ADMIT
// each upstream's npm-latest major. The 3.3.0 ranges excluded both current
// majors (keyframes `^2.2.0 || ^3.0.0` vs latest 4.0.0; value `^0.10.0` vs latest
// 0.11.1), so every consumer on the current majors got a spurious peer WARN and
// the aurora band's value.js `interpolateHue` (0.11-only) was unreachable through
// the registry. This gate is born-RED if either range is re-narrowed below the
// registry latest.
//
// It also asserts the DUAL-INSTANCE resolution safety: keyframes 4 hard-deps
// value `^0.10.0` (it caps value at <0.11), so a consumer holding glass-ui +
// keyframes 4 must still resolve a SINGLE value.js. glass-ui's value peer
// (`^0.10.0 || ^0.11.0`) intersects keyframes-4's value dep at 0.10.x — non-empty,
// so npm dedups to one value instance. The one non-green combo (keyframes 4 +
// value 0.11) is NON-RESOLVABLE (keyframes 4's own cap excludes it), so glass-ui
// declaring both wide ranges is honest: every npm-RESOLVABLE combo typechecks.
//
// Offline-safe: registry lookups go through `npm view`; on failure the gate falls
// back to the pinned audited latest (keyframes 4.0.0, value 0.11.1) so a
// network-less CI runner still enforces the range, never false-GREENs.

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import semver from "semver";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

// The audited npm-latest at AW (2026-06-07) — the offline fallback.
const PINNED_LATEST = {
    "@mkbabb/keyframes.js": "4.0.0",
    "@mkbabb/value.js": "0.11.1",
};

// keyframes 4's hard value.js dep — the dual-instance intersection partner.
const KEYFRAMES4_VALUE_DEP = "^0.10.0";

function registryLatest(pkg) {
    try {
        const out = execSync(`npm view ${pkg} version`, {
            encoding: "utf8",
            stdio: ["ignore", "pipe", "ignore"],
            timeout: 15000,
        }).trim();
        return semver.valid(out) ? out : PINNED_LATEST[pkg];
    } catch {
        return PINNED_LATEST[pkg];
    }
}

function run() {
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_PEER_CONFORMANCE_ARTIFACT",
        "AW-peer-conformance",
    );
    const pkg = JSON.parse(readFileSync(resolve(ROOT, "package.json"), "utf8"));
    const peers = pkg.peerDependencies ?? {};

    const violations = [];
    const facts = {};

    for (const dep of ["@mkbabb/keyframes.js", "@mkbabb/value.js"]) {
        const range = peers[dep];
        const latest = registryLatest(dep);
        const admits = range ? semver.satisfies(latest, range) : false;
        facts[dep] = { range: range ?? "(missing)", latest, admits };
        if (!range) {
            violations.push(`peer range for ${dep} is MISSING`);
        } else if (!admits) {
            violations.push(
                `peer range for ${dep} (${range}) does NOT admit npm-latest ${latest} — re-narrowed; a consumer on the current major gets a spurious peer warn`,
            );
        }
    }

    // Dual-instance safety: glass-ui's value peer must intersect keyframes-4's
    // value dep, so a consumer with keyframes 4 resolves a SINGLE value.js.
    const valueRange = peers["@mkbabb/value.js"];
    const intersects =
        valueRange != null &&
        semver.intersects(valueRange, KEYFRAMES4_VALUE_DEP);
    facts.dualInstanceSafe = {
        glassuiValuePeer: valueRange ?? "(missing)",
        keyframes4ValueDep: KEYFRAMES4_VALUE_DEP,
        intersects,
    };
    if (!intersects) {
        violations.push(
            `glass-ui value peer (${valueRange}) does NOT intersect keyframes-4's value dep (${KEYFRAMES4_VALUE_DEP}) — a consumer with keyframes 4 + glass-ui would dual-install value.js (the color-singleton break)`,
        );
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:peer-conformance",
        facts,
        violations,
    });

    console.log("proof:peer-conformance — the upstream peer-range admit gate (AW.W27)");
    for (const dep of ["@mkbabb/keyframes.js", "@mkbabb/value.js"]) {
        const f = facts[dep];
        console.log(
            `  ${dep.padEnd(24)} : ${f.range}  admits latest ${f.latest}? ${f.admits ? "YES" : "NO"}`,
        );
    }
    console.log(
        `  dual-instance safe (value ∩ keyframes-4)  : ${facts.dualInstanceSafe.intersects ? "YES" : "NO"}`,
    );
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}`);
    process.exit(status === "pass" ? 0 : 1);
}

run();
