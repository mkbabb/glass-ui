// AW.W27 — the peer-conformance gate (proof:peer-conformance).
// BB.W-SPINE-LATEST — the T1.1 collapse: the dual-instance INTERSECTION model
// is retired for a singleton-IDENTITY check.
//
// glass-ui's `@mkbabb/keyframes.js` + `@mkbabb/value.js` peer ranges must ADMIT
// each upstream's npm-latest major (a re-narrowed range gives every consumer on
// the current major a spurious peer WARN). This gate is born-RED if either range
// is re-narrowed below the registry latest.
//
// THE SINGLETON IDENTITY (was: the dual-range intersection). keyframes 4 hard-deps
// a SINGLE value.js range; a consumer holding glass-ui + keyframes 4 must resolve
// ONE value.js instance. The old model pinned keyframes-4's value dep at a stale
// `^0.10.0` constant and asked "do the ranges INTERSECT?" — but kf 4.3.0 deps
// value `^0.13.0` (the constant went factually false), and a tolerated overlap is
// the wrong invariant anyway. With the constellation in pre-1.0 value LOCKSTEP
// there is ONE coherent value range, so the check is now a CONTAINMENT identity:
// keyframes' OWN value dep range (read live off the installed package) must be a
// SUBSET of glass-ui's value peer — every value keyframes can pull is admitted by
// glass-ui's peer, so npm dedups to one instance. The broken-singleton stops
// being a tolerated overlap and becomes an enforced identity (the
// `proof:constellation-spine` clause-1 invariant, single-repo edition).
//
// Offline-safe: registry lookups go through `npm view`; on failure the gate falls
// back to the pinned audited latest so a network-less CI runner still enforces the
// range, never false-GREENs. keyframes' value dep is read from node_modules; if
// keyframes is not installed, the pinned audited dep is the fallback.

import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import semver from "semver";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

// The audited npm-latest at BD (2026-06-25) — the offline fallback. keyframes
// advanced to its 5.x major (the `KeyframesScrollTimeline` rename + value.js 1.x
// dep); glass-ui adopted it (peer `^5.0.0`). The pins track that reality so the
// network-less CI arm enforces the live range, never false-GREENs.
const PINNED_LATEST = {
    "@mkbabb/keyframes.js": "5.1.0",
    "@mkbabb/value.js": "1.2.0",
};

// keyframes 5's value.js dep — the singleton-identity partner. Read live off the
// installed keyframes package below; this is the offline/absent fallback only.
const PINNED_KEYFRAMES_VALUE_DEP = "^1.2.0";

// BH.B1-W2-value-destraddle — value.js's 1.0.0 stabilization cut landed; the
// pre-1.0 lockstep regime dissolved and the `^0.13.0` leg RETIRED. The value.js
// peer (AND the dev pin) must be a SINGLE clean `^1.x` range — a legacy
// `^0.13.0 || ^1.0.0` straddle re-admits a pre-1.0 value.js the constellation no
// longer ships (the no-legacy-straddle law). PRE1_PROBE is the retired leg the
// straddle still admits. Detection is a pure predicate so the self-test bite can
// plant synthetic straddles and assert each flags.
const PRE1_PROBE = "0.13.0";

export function valueDestraddleViolations(label, range) {
    const out = [];
    if (range == null) return out; // absence is reported by the admit/peer arm
    if (semver.satisfies(PRE1_PROBE, range)) {
        out.push(
            `value ${label} (${range}) still admits the RETIRED pre-1.0 leg (${PRE1_PROBE}) — the legacy straddle; value.js 1.0.0 stabilized, pin a single ^1.x range`,
        );
        return out;
    }
    const min = semver.minVersion(range);
    if (min == null || semver.lt(min, "1.0.0")) {
        out.push(
            `value ${label} (${range}) floors below 1.0.0 — destraddle to a single ^1.x range`,
        );
    }
    return out;
}

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

// The keyframes package's OWN value.js dependency range, read off the installed
// copy (the exports map blocks `require`, so read the file directly). Falls back
// to the pinned audited dep when keyframes is absent.
function keyframesValueDep(ROOT) {
    const kfPkgPath = resolve(
        ROOT,
        "node_modules/@mkbabb/keyframes.js/package.json",
    );
    if (existsSync(kfPkgPath)) {
        try {
            const kf = JSON.parse(readFileSync(kfPkgPath, "utf8"));
            const dep =
                kf.dependencies?.["@mkbabb/value.js"] ??
                kf.peerDependencies?.["@mkbabb/value.js"];
            if (dep) return dep;
        } catch {
            /* fall through to the pin */
        }
    }
    return PINNED_KEYFRAMES_VALUE_DEP;
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

    // Singleton identity: keyframes' OWN value dep must be a SUBSET of glass-ui's
    // value peer, so a consumer with keyframes 4 + glass-ui resolves a SINGLE
    // value.js (the color-singleton). A tolerated INTERSECTION is no longer
    // enough — containment is the enforced invariant (the constellation-spine
    // clause-1 identity, single-repo edition).
    const valueRange = peers["@mkbabb/value.js"];
    const kfValueDep = keyframesValueDep(ROOT);
    const contained =
        valueRange != null && semver.subset(kfValueDep, valueRange);
    facts.singletonIdentity = {
        glassuiValuePeer: valueRange ?? "(missing)",
        keyframesValueDep: kfValueDep,
        contained,
    };
    if (!contained) {
        violations.push(
            `keyframes' value dep (${kfValueDep}) is NOT a subset of glass-ui's value peer (${valueRange}) — a consumer with keyframes 4 + glass-ui would dual-install value.js (the color-singleton break); widen glass-ui's value peer to admit keyframes' value range`,
        );
    }

    // BH.B1-W2 destraddle — the value.js peer AND the dev pin must be a single
    // clean ^1.x range, no `^0.13.0 || ^1.0.0` legacy straddle re-admitting the
    // retired pre-1.0 leg. Born-RED on HEAD (both carry the straddle) → GREEN at
    // the `^1.0.0` re-pin (the clean ^1.x that admits the registry-latest
    // dist-tag AND contains keyframes' `^1.2.0` value dep — see the singleton
    // arm; a `^1.2.0` peer would re-narrow below registry-latest 1.1.1).
    const valueDevDep = (pkg.devDependencies ?? {})["@mkbabb/value.js"];
    const peerDestraddle = valueDestraddleViolations("peer", valueRange);
    const devDestraddle = valueDestraddleViolations("devDependency", valueDevDep);
    const destraddled = peerDestraddle.length === 0 && devDestraddle.length === 0;
    facts.valueDestraddle = {
        peer: valueRange ?? "(missing)",
        dev: valueDevDep ?? "(missing)",
        destraddled,
    };
    violations.push(...peerDestraddle, ...devDestraddle);

    // self-test bite — synthetic straddles MUST flag (the anti-hollow-detector
    // floor; a softened predicate re-greens the bite), and the clean ^1.x range
    // must NOT (the over-eager floor).
    const SELF_TEST_STRADDLES = [
        "^0.13.0 || ^1.0.0",
        "^0.13.0",
        ">=0.10.0",
        "0.13.x || ^1.2.0",
    ];
    const selfTestBites = SELF_TEST_STRADDLES.map((r) => ({
        range: r,
        flagged: valueDestraddleViolations("self-test", r).length > 0,
    }));
    const cleanProbe = {
        range: "^1.2.0",
        flagged: valueDestraddleViolations("self-test", "^1.2.0").length > 0,
    };
    const allStraddlesFlagged = selfTestBites.every((b) => b.flagged);
    const cleanGreen = cleanProbe.flagged === false;
    facts.selfTest = { straddles: selfTestBites, clean: cleanProbe, allStraddlesFlagged, cleanGreen };
    if (!allStraddlesFlagged) {
        violations.push(
            `SELF-TEST — a planted value straddle did NOT flag (hollow detector): ${selfTestBites
                .filter((b) => !b.flagged)
                .map((b) => b.range)
                .join(", ")}`,
        );
    }
    if (!cleanGreen) {
        violations.push(
            `SELF-TEST — the clean ^1.2.0 range false-flagged (over-eager detector)`,
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

    console.log("proof:peer-conformance — the upstream peer-range admit + singleton-identity gate (AW.W27 / BB.W-SPINE-LATEST)");
    for (const dep of ["@mkbabb/keyframes.js", "@mkbabb/value.js"]) {
        const f = facts[dep];
        console.log(
            `  ${dep.padEnd(24)} : ${f.range}  admits latest ${f.latest}? ${f.admits ? "YES" : "NO"}`,
        );
    }
    console.log(
        `  value singleton (kf value dep ${facts.singletonIdentity.keyframesValueDep} ⊆ glass-ui peer) : ${facts.singletonIdentity.contained ? "YES" : "NO"}`,
    );
    console.log(
        `  value destraddled (single ^1.x, no pre-1.0 leg)   : ${facts.valueDestraddle.destraddled ? "YES" : "NO"} (peer=${facts.valueDestraddle.peer}, dev=${facts.valueDestraddle.dev})`,
    );
    console.log(
        `  self-test straddles flagged + clean green         : ${allStraddlesFlagged && cleanGreen}`,
    );
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}`);
    process.exit(status === "pass" ? 0 : 1);
}

run();
