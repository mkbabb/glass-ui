// BB.W-SPINE-CONSTELLATION — proof:constellation-spine.
//
// The cross-repo machine-lock for the ONE coherent-latest dependency spine. The
// structural TWIN of `proof:webgl-substrate-single` (ONE substrate within a repo)
// and the GENERALIZATION of `proof:peer-conformance` (one repo's peer-conformance
// → the fleet's spine-conformance). Walks every constellation member's
// package.json and asserts the eight coherence clauses (§6 of
// BB-AMENDMENT-constellation-modernize.md).
//
// BORN-RED, tagged ["local"]: a cross-repo gate cannot block a single repo's
// ci/release while the fleet is mid-adopt (the `proof:ba-gestalt` born-RED →
// promote model). The single authorized verdict-flipper is the Batch 5 closure
// (W-CONSUMER-MODERNIZE + W-SLIDES-DRIVE landing the last consumer). At HEAD the
// hub (glass-ui) is bumped to the coherent spine but the seven enrolled consumers
// still cap glass-ui at `^3.x` (clause 4) and three carry TS5/Vite7 (clause 5) —
// so the gate is RED until the fleet adopts. That RED IS the spec.
//
// THE PRE-1.0 LOCKSTEP NOTE (the gate header): value.js is pre-1.0, where every
// minor is breaking (`^0.13.0` admits 0.13.x only). The whole constellation moves
// its value.js range in LOCKSTEP per value minor — there is no broad-caret safety
// the way `^14` gives vueuse. This is a PRE-1.0 regime, NOT permanent: value.js →
// 1.0.0 is DECIDED (Tranche N, N.W9′, a stabilization semver-major) and is the
// DISSOLVE TRIGGER — at the cut the family moves to `^1` broad-caret and the
// recurring broken-singleton class ends. Clause 8 is glass-ui's pre-guard (its
// value range must ALREADY admit `^1` so the 1.0.0 publish cannot re-strand).
//
// Read-only across foreign trees (never writes). Absent members are recorded +
// skipped (registry-default), never a false-GREEN. The gate reads manifest RANGES
// + resolution; the per-consumer 4.0.0 API-compat surface is the e2e/visual
// obligation of W-CONSUMER-MODERNIZE, NOT this gate (the honest scope note, §6).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import semver from "semver";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const PROGRAMMING = resolve(ROOT, "..");

// The enrolled roster (§6). role ∈ hub | leaf | consumer | wasm | independent.
// Paths are absolute-from-the-Programming-dir; absent members skip gracefully.
const MEMBERS = [
    { key: "glass-ui", rel: ".", role: "hub" },
    { key: "keyframes.js", rel: "../keyframes.js", role: "leaf" },
    { key: "value.js", rel: "../value.js", role: "leaf" },
    { key: "pencil-boil", rel: "../pencil-boil", role: "leaf" },
    { key: "latex-paper", rel: "../latex-paper", role: "leaf" },
    { key: "fourier", rel: "../fourier-analysis/web", role: "consumer" },
    { key: "slides", rel: "../slides", role: "consumer" },
    { key: "speedtest", rel: "../speedtest", role: "consumer" },
    { key: "sci-report", rel: "../sci-report/usf/web", role: "consumer" },
    { key: "words/frontend", rel: "../words/frontend", role: "consumer" },
    { key: "bbnf-lang/playground", rel: "../bbnf-lang/playground", role: "consumer" },
    { key: "bbnf-buddy", rel: "../bbnf-buddy", role: "consumer" },
    // Independent-node services — recorded, explicitly NOT enrolled (own tracks).
    { key: "words/backend", rel: "../words/backend", role: "independent" },
    { key: "words/notification-server", rel: "../words/notification-server", role: "independent" },
    { key: "bbnf-lang/extension", rel: "../bbnf-lang/extension", role: "independent" },
];

const MKBABB = "@mkbabb/";
const SHARED_SINGLETONS = [
    "vue", "@vueuse/core", "reka-ui", "tailwindcss", "@tailwindcss/vite",
    "@tailwindcss/postcss", "vite", "typescript", "vue-tsc", "vitest",
    "@lucide/vue", "@types/node",
];
// The two WASM leaves — checked on the family-caret arm ONLY (clause 7), never the
// JS-singleton clauses (1/5). Their coherence regime is the Rust toolchain.
const WASM_LEAVES = ["@mkbabb/morph", "@mkbabb/csp-solver-wasm"];
// The sanctioned value bridge — the ONE @mkbabb `||` clause-2 allows (clause 8's
// pre-guard for the DECIDED 1.0.0 cut). Any OTHER @mkbabb union is a violation.
const VALUE_BRIDGE = "^0.13.0 || ^1.0.0";
const COHERENT_VALUE = "0.13.0"; // the live value floor the lockstep regime holds
const GLASSUI_4X = "4.0.0"; // a representative latest-major glass-ui version

function readPkg(absDir) {
    const p = resolve(absDir, "package.json");
    if (!existsSync(p)) return null;
    try {
        return JSON.parse(readFileSync(p, "utf8"));
    } catch {
        return null;
    }
}
function allDeps(pkg) {
    return {
        ...(pkg.dependencies ?? {}),
        ...(pkg.devDependencies ?? {}),
        ...(pkg.peerDependencies ?? {}),
    };
}
function isStarOrTag(range) {
    if (range == null) return false;
    const r = String(range).trim();
    return (
        r === "*" || r === "latest" || r === "x" || r === "" ||
        /(^|[^\w.])next($|[^\w.])/.test(r) || /-next\b/.test(r) ||
        r.startsWith("npm:") === false && /\blatest\b/.test(r)
    );
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_CONSTELLATION_SPINE_ARTIFACT",
        "BB-constellation-spine",
    );
    const violations = [];
    const facts = { members: {}, absent: [], independent: [] };

    // Resolve every present member up-front.
    const present = [];
    for (const m of MEMBERS) {
        const pkg = readPkg(resolve(ROOT, m.rel));
        if (!pkg) {
            facts.absent.push(m.key);
            continue;
        }
        if (m.role === "independent") {
            facts.independent.push(m.key);
            facts.members[m.key] = { role: m.role, enrolled: false };
            continue; // recorded, NOT enrolled — no clause applied
        }
        present.push({ ...m, pkg, deps: allDeps(pkg) });
        facts.members[m.key] = { role: m.role, enrolled: true };
    }

    const V = (clause, key, msg) =>
        violations.push(`[clause ${clause}] ${key}: ${msg}`);

    // ── Clause 1 — value singleton coherence (the IDENTITY, not a tolerated overlap)
    // The hub's value peer ⊇ keyframes' value dep; every member's direct value dep
    // admits the coherent floor (0.13.0).
    {
        const hub = present.find((m) => m.role === "hub");
        if (hub) {
            const vPeer = hub.pkg.peerDependencies?.["@mkbabb/value.js"];
            const kfPkg = readPkg(resolve(ROOT, "node_modules/@mkbabb/keyframes.js"));
            const kfValueDep =
                kfPkg?.dependencies?.["@mkbabb/value.js"] ?? "^0.13.0";
            facts.singleton = { hubValuePeer: vPeer, keyframesValueDep: kfValueDep };
            if (!vPeer || !semver.subset(kfValueDep, vPeer)) {
                V(1, "glass-ui", `value peer (${vPeer}) does not contain keyframes' value dep (${kfValueDep}) — dual-install risk`);
            }
        }
        for (const m of present) {
            const v = m.deps["@mkbabb/value.js"];
            if (v && v !== VALUE_BRIDGE && !semver.satisfies(COHERENT_VALUE, v)) {
                V(1, m.key, `value range (${v}) does not admit the coherent floor ${COHERENT_VALUE} (pre-1.0 lockstep)`);
            }
        }
    }

    // ── Clause 2 — no multi-major `||` on any @mkbabb (except the value bridge)
    for (const m of present) {
        for (const [dep, range] of Object.entries(m.deps)) {
            if (!dep.startsWith(MKBABB)) continue;
            if (String(range).includes("||") && range !== VALUE_BRIDGE) {
                V(2, m.key, `@mkbabb union on ${dep} (${range}) — collapse to a single major (the value ${VALUE_BRIDGE} pre-guard is the ONLY sanctioned bridge)`);
            }
        }
    }

    // ── Clause 3 — no dist-tag/star/pre-release-next on any @mkbabb or singleton
    for (const m of present) {
        for (const [dep, range] of Object.entries(m.deps)) {
            const tracked = dep.startsWith(MKBABB) || SHARED_SINGLETONS.includes(dep);
            if (tracked && isStarOrTag(range)) {
                V(3, m.key, `${dep} pinned to a dist-tag/star/next (${range}) — pin to a caret range`);
            }
        }
    }

    // ── Clause 4 — no stale-lineage glass-ui cap (every consumer admits ^4.x)
    for (const m of present.filter((x) => x.role === "consumer")) {
        const g = m.deps["@mkbabb/glass-ui"];
        if (g && !semver.satisfies(GLASSUI_4X, g)) {
            V(4, m.key, `glass-ui range (${g}) does not admit the latest major ${GLASSUI_4X} — stale-lineage cap`);
        }
    }

    // ── Clause 5 — no ancient major (TS ^6, vite ^8, vue-tsc ^3) on JS members
    const ANCIENT = { typescript: 6, vite: 8, "vue-tsc": 3 };
    for (const m of present) {
        for (const [tool, floor] of Object.entries(ANCIENT)) {
            const range = m.deps[tool];
            if (!range) continue;
            const min = semver.minVersion(range);
            if (min && min.major < floor) {
                V(5, m.key, `${tool} (${range}) is below the fleet floor ^${floor} — ancient major`);
            }
        }
    }

    // ── Clause 6 — the registry-consumer probe discipline (cross-refs W-LINEAGE-PROBE)
    // Structural: the dependency-order-book (the prune/publish-beat record) must
    // exist; the live `npm view` probe is W-LINEAGE-PROBE's, never re-implemented here.
    {
        const book = resolve(ROOT, "docs/tranches/BB/audit/spine/dependency-order-book.md");
        facts.dependencyOrderBook = existsSync(book);
        if (!facts.dependencyOrderBook) {
            V(6, "spine", "dependency-order-book.md absent — the registry-consumer probe discipline is unrecorded");
        }
    }

    // ── Clause 7 — the WASM-leaf caret arm + the csp divergent-publisher fence
    for (const m of present) {
        for (const leaf of WASM_LEAVES) {
            const range = m.deps[leaf];
            if (!range) continue;
            // family-caret arm ONLY: must be a caret range, never star/pin/union
            if (isStarOrTag(range) || String(range).includes("||")) {
                V(7, m.key, `${leaf} (${range}) is not a clean caret on the WASM family-caret arm`);
            }
        }
        // provenance fence: csp-solver-wasm must never be sourced from muster/csp-wasm
        const cspSrc = m.deps["@mkbabb/csp-solver-wasm"];
        if (cspSrc && /muster|csp-wasm@/.test(String(cspSrc))) {
            V(7, m.key, `@mkbabb/csp-solver-wasm sourced from a divergent publisher (${cspSrc}) — must originate from the csc411 wasm crate (NEW-L provenance fence)`);
        }
    }

    // ── Clause 8 — the born-RED value `^1.0.0` pre-guard (the hub admits ^1)
    {
        const hub = present.find((m) => m.role === "hub");
        if (hub) {
            const vPeer = hub.pkg.peerDependencies?.["@mkbabb/value.js"];
            const vDev = hub.pkg.devDependencies?.["@mkbabb/value.js"];
            const admits = (r) => r != null && semver.satisfies("1.0.0", r);
            facts.preGuard = { valuePeer: vPeer, valueDev: vDev };
            if (!admits(vPeer)) V(8, "glass-ui", `value peer (${vPeer}) does not admit ^1.0.0 — the 1.0.0 pre-guard is missing (value.js → 1.0.0 is DECIDED)`);
            if (!admits(vDev)) V(8, "glass-ui", `value dev (${vDev}) does not admit ^1.0.0 — the 1.0.0 pre-guard is missing`);
        }
    }

    const status = violations.length === 0 ? "pass" : "fail";
    facts.counts = {
        present: present.length,
        absent: facts.absent.length,
        independent: facts.independent.length,
        violations: violations.length,
    };
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:constellation-spine",
        facts,
        violations,
    });

    console.log("proof:constellation-spine — the coherent-latest cross-repo spine gate (BB.W-SPINE-CONSTELLATION; born-RED, tagged local)");
    console.log(`  pre-1.0 lockstep regime — value.js per-minor lockstep until the DECIDED 1.0.0 cut (the dissolve trigger); clause 8 is the pre-guard`);
    console.log(`  members present : ${present.length}   absent : ${facts.absent.length} [${facts.absent.join(", ") || "none"}]   independent (not enrolled) : ${facts.independent.length}`);
    if (violations.length) {
        console.log(`\n  VIOLATIONS (${violations.length}) — born-RED until the Batch-5 fleet adopt:`);
        for (const v of violations) console.log(`  x ${v}`);
    } else {
        console.log("\n  the whole constellation resolves the coherent-latest spine — PROMOTE-READY");
    }
    console.log(`\n  status: ${status.toUpperCase()}`);
    process.exit(status === "pass" ? 0 : 1);
}

run();
