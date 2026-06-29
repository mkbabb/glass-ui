#!/usr/bin/env node
// BH.B1-W1 — the external-payload gate (proof:external-payload).
//
// THE PAYLOAD CONTRACT: every JS-bundleable runtime peer that `src/` imports MUST
// be listed in `vite.library.ts` `libraryExternal` — so it is `external` and is
// NEVER bundled into `dist` (the vite.config.ts §"every peer is external" claim,
// made machine-true). A peer the source imports yet OMITS from the list gets
// BUNDLED into a `dist/<vendor>.js` chunk, and a consumer — who already installs
// that peer per the peer-dep contract — double-loads it.
//
// THE BUG THIS CLOSES (the ζ-lane payload bug): `libraryExternal` carried the two
// DEAD pre-v1.0 strings `lucide-vue-next` (renamed → `@lucide/vue` at v1.0) and
// `vaul-vue` (abrogated at BB.W-DRAWER-ABROGATE — the house reka substrate owns
// the snap math now) but NOT the LIVE `@lucide/vue` (39 src imports). So lucide
// shipped inside `dist/createLucideIcon-*.js` + the vendor chunk — every consumer
// double-loaded the icon set.
//
// Two device-free SOURCE clauses (read `vite.library.ts` + `package.json` + the
// `src/` import graph — NO build, NO dist) + a self-test bite proven every run:
//   E1 — every peer `src/` JS-imports ∈ `libraryExternal`   (no BUNDLED peer)
//   E2 — every `libraryExternal` entry ∈ `peerDependencies`  (no DEAD string)
//
// Born-RED at HEAD (E1: `@lucide/vue` imported but absent → bundled; E2:
// `lucide-vue-next` + `vaul-vue` dead) → GREEN on the BH.B1-W1 fix. `tailwindcss`
// / `tw-animate-css` are CSS-only peers (never JS-imported in `src/`), so E1 does
// not demand them; `perfect-freehand` is VENDORED into handmark/freehand.ts (zero
// `from "perfect-freehand"`), so it does not leak and is correctly absent. The
// BUILD-side mirror (dist carries NO `createLucideIcon-*` chunk; the bundle shrinks)
// is `profile:budget`'s re-baselined arm — this SOURCE gate is the always-on witness
// that needs no toolchain.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

// ── pure detector — exercised on real + synthetic inputs ─────────────────────
// `external`      : the libraryExternal string list
// `peers`         : the declared peerDependencies keys
// `importedPeers` : the peers that appear as a bare JS import in src/
export function checkExternalPayload({ external, peers, importedPeers }) {
    const violations = [];
    const externalSet = new Set(external);
    const peerSet = new Set(peers);

    // E1 — a JS-imported peer MUST be external (else it is bundled).
    for (const p of importedPeers) {
        if (!externalSet.has(p)) {
            violations.push({
                clause: "E1",
                msg: `peer "${p}" is JS-imported in src/ but ABSENT from libraryExternal — it gets BUNDLED into dist and a consumer double-loads it`,
            });
        }
    }

    // E2 — every external entry MUST be a declared peer (else it is a dead string).
    for (const e of external) {
        if (!peerSet.has(e)) {
            violations.push({
                clause: "E2",
                msg: `libraryExternal entry "${e}" is NOT a declared peerDependency — a dead string externalizing a package no longer in the import graph`,
            });
        }
    }
    return violations;
}

// ── source readers ───────────────────────────────────────────────────────────
function parseLibraryExternal(viteLibSrc) {
    const m = viteLibSrc.match(
        /export\s+const\s+libraryExternal\s*=\s*\[([\s\S]*?)\]/,
    );
    if (!m) return null; // fail-loud: the array shape changed
    // strip line/block comments inside the array, then collect quoted strings.
    const body = m[1]
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\/\/[^\n]*/g, "");
    return [...body.matchAll(/["']([^"']+)["']/g)].map((x) => x[1]);
}

function packageNameOf(spec) {
    if (!spec || spec.startsWith(".") || spec.startsWith("/")) return null;
    const parts = spec.split("/");
    return spec.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0];
}

const SRC_EXT = new Set([".ts", ".tsx", ".vue", ".mts", ".cts", ".mjs", ".js"]);
const SKIP_DIR = new Set(["node_modules", "__tests__", "dist"]);
const IMPORT_RE =
    /(?:from\s*|import\s*|require\s*\(\s*)["']([^"']+)["']|import\s*\(\s*["']([^"']+)["']/g;

function collectImportedPackages(dir, acc) {
    for (const name of readdirSync(dir)) {
        if (name.startsWith(".") || SKIP_DIR.has(name)) continue;
        const full = resolve(dir, name);
        const st = statSync(full);
        if (st.isDirectory()) {
            collectImportedPackages(full, acc);
        } else if (SRC_EXT.has(name.slice(name.lastIndexOf(".")))) {
            const text = readFileSync(full, "utf8");
            for (const mm of text.matchAll(IMPORT_RE)) {
                const pkg = packageNameOf(mm[1] ?? mm[2]);
                if (pkg) acc.add(pkg);
            }
        }
    }
    return acc;
}

// ── the always-on self-test bite (the detector cannot silently no-op) ────────
function selfTest() {
    const failures = [];
    // Bite A (E1): a JS-imported peer missing from external MUST flag.
    const a = checkExternalPayload({
        external: ["vue"],
        peers: ["vue", "@lucide/vue"],
        importedPeers: ["vue", "@lucide/vue"],
    });
    if (!a.some((v) => v.clause === "E1" && v.msg.includes("@lucide/vue"))) {
        failures.push("bite A: a bundled (imported-but-not-external) peer did NOT flag E1");
    }
    // Bite B (E2): a dead external string (not a peer) MUST flag.
    const b = checkExternalPayload({
        external: ["vue", "lucide-vue-next"],
        peers: ["vue"],
        importedPeers: ["vue"],
    });
    if (!b.some((v) => v.clause === "E2" && v.msg.includes("lucide-vue-next"))) {
        failures.push("bite B: a dead external string did NOT flag E2");
    }
    // Bite C (clean): a sound config MUST be violation-free.
    const c = checkExternalPayload({
        external: ["vue", "@lucide/vue"],
        peers: ["vue", "@lucide/vue", "tailwindcss"],
        importedPeers: ["vue", "@lucide/vue"],
    });
    if (c.length !== 0) {
        failures.push(`bite C: a sound config falsely flagged ${c.length} violation(s)`);
    }
    return failures;
}

function run() {
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_EXTERNAL_PAYLOAD_ARTIFACT",
        "BH-external-payload",
    );
    const violations = [];

    const pkg = JSON.parse(readFileSync(resolve(ROOT, "package.json"), "utf8"));
    const peers = Object.keys(pkg.peerDependencies ?? {});

    const viteLibPath = resolve(ROOT, "vite.library.ts");
    const external = parseLibraryExternal(readFileSync(viteLibPath, "utf8"));
    if (external == null) {
        violations.push({
            clause: "E0",
            msg: "could not parse `export const libraryExternal = [...]` in vite.library.ts (the array shape changed — re-point the gate)",
        });
    }

    const srcDir = resolve(ROOT, "src");
    const importedPkgs = existsSync(srcDir)
        ? collectImportedPackages(srcDir, new Set())
        : new Set();
    const importedPeers = peers.filter((p) => importedPkgs.has(p));

    if (external != null) {
        violations.push(
            ...checkExternalPayload({ external, peers, importedPeers }),
        );
    }

    // the always-on bite — a broken detector REDs the gate itself.
    const biteFailures = selfTest();
    for (const f of biteFailures) {
        violations.push({ clause: "SELF-TEST", msg: f });
    }

    const status = violations.length === 0 ? "pass" : "fail";
    const facts = {
        external: external ?? "(unparseable)",
        peerCount: peers.length,
        importedPeers,
        selfTestBites: biteFailures.length === 0 ? "3/3 GREEN" : biteFailures,
    };
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:external-payload",
        facts,
        violations,
    });

    console.log(
        "proof:external-payload — every JS peer external, no dead string (BH.B1-W1)",
    );
    console.log(`  libraryExternal      : ${(external ?? []).join(", ")}`);
    console.log(`  peers src JS-imports : ${importedPeers.join(", ")}`);
    console.log(
        `  self-test bites      : ${biteFailures.length === 0 ? "3/3 GREEN" : `${biteFailures.length} FAILED`}`,
    );
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x [${v.clause}] ${v.msg}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}`);
    process.exit(status === "pass" ? 0 : 1);
}

// Run as the gate ONLY when invoked directly — importing `checkExternalPayload`
// (e.g. a future unit test) never triggers the gate's process.exit (the
// import.meta.url entrypoint guard, the proof-live-verified-ledger idiom).
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
