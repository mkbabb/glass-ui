#!/usr/bin/env node
// BG.W-TOKEN-MANIFEST — make the token basis countable (proof:token-manifest).
//
// The token basis is uncountable across FOUR consumption channels (`var()`,
// Tailwind `@theme` utility-gen, the Tailwind `prop-(--token)` arbitrary
// shorthand, and the JS read surface — `getPropertyValue`/`readNum`/`readToken`/
// `setProperty` + template-literal families). No manifest answers "is this token
// alive," so accretion is invisible and every tranche nets tokens. This gate is
// the STANDING anti-accretion floor: it emits a build-time manifest of every
// declared token → its channel(s) → alive|dead, and FAILS the close on any token
// with ZERO live channel unless allowlisted with a rationale.
//
// BORN-RED BY DESIGN. On HEAD ~39 genuinely-dead tokens (the accretion set:
// `--progress-sectioned-track`, `--glass-spine-blur/-opacity`, `--phase-color-
// label`, the superseded shimmer/stagger/timeline-gradient orphans, …) clear NO
// channel, so the gate exits 1. It is `["local"]`-tagged so it does NOT block
// ci/release mid-tranche (the proof:ba-gestalt born-RED precedent). BG.W-GLASS-
// BASIS-CONSOLIDATE (F2.2) is the authorized flipper — its step-4 dead-token
// sweep reads THIS manifest and DELETES the set (never allowlists it), flipping
// the gate GREEN + promoting it to the ci/release close battery. One manifest,
// and a dead token can never again survive a close.
//
// The `--self-test` bites prove the CHANNEL-AWARE mechanism: a planted dead token
// → RED, a `@theme`-only / prop-shorthand-only / JS-literal-only / dynamic-family
// token → GREEN (no false positive on a build-time channel), a comment-only
// mention → RED (comments never read as alive). House style mirrors
// proof-eyebrow-union.mjs: ESM .mjs, a pure detector leaf, a byte-stable JSON
// artefact via gate-output, a human summary, process.exit(1) on any violation.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    buildTokenManifest,
    classifyTokens,
} from "./lib/token-manifest.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const ALLOWLIST_PATH = resolve(ROOT, "scripts/token-manifest-allowlist.json");

/** Read the allowlist `{ "--token": "rationale" }` map (missing ⇒ empty). */
function readAllowlist() {
    try {
        const raw = JSON.parse(readFileSync(ALLOWLIST_PATH, "utf8"));
        return raw.allowlist ?? {};
    } catch {
        return {};
    }
}

/**
 * The channel-aware self-test. Each bite runs the PURE `classifyTokens` core on
 * synthetic in-memory sources and asserts the alive|dead outcome. Returns
 * { pass, results }.
 */
export function selfTest() {
    const results = [];
    const check = (label, { declSources, consumeSources }, token, expectAlive) => {
        const m = classifyTokens({ declSources, consumeSources });
        const t = m.tokens.find((x) => x.name === token);
        const actualAlive = Boolean(t?.alive);
        const ok = actualAlive === expectAlive;
        results.push({ label, token, expectAlive, actualAlive, ok, channels: t?.channels ?? [] });
    };

    // Bite 1 — a planted DEAD token (declared, consumed nowhere) → RED (dead).
    check(
        "dead token planted → dead",
        {
            declSources: [{ rel: "src/styles/x.css", content: ":root { --zz-planted-dead: 1px; }" }],
            consumeSources: [{ rel: "src/a.ts", content: "const a = 1;" }],
        },
        "--zz-planted-dead",
        false,
    );

    // Bite 2 — a `@theme`-ONLY token, never var()-read → GREEN (theme channel).
    check(
        "@theme-only token → alive (no false positive)",
        {
            declSources: [{ rel: "src/styles/theme.css", content: "@theme { --zz-theme-only: 1rem; }" }],
            consumeSources: [{ rel: "src/a.ts", content: "const a = 1;" }],
        },
        "--zz-theme-only",
        true,
    );

    // Bite 3 — a token consumed ONLY via var() → GREEN.
    check(
        "var() consumed → alive",
        {
            declSources: [{ rel: "src/styles/x.css", content: ":root { --zz-var: 1px; }" }],
            consumeSources: [{ rel: "src/styles/y.css", content: ".a { width: var(--zz-var); }" }],
        },
        "--zz-var",
        true,
    );

    // Bite 4 — a token consumed ONLY via the Tailwind prop-(--) shorthand → GREEN.
    check(
        "prop-(--) shorthand → alive",
        {
            declSources: [{ rel: "src/styles/x.css", content: ":root { --zz-prop: 1px; }" }],
            consumeSources: [{ rel: "src/a.vue", content: "<template><span class=\"text-(length:--zz-prop)\" /></template>" }],
        },
        "--zz-prop",
        true,
    );

    // Bite 5 — a token consumed ONLY via a JS string literal → GREEN.
    check(
        "JS string-literal read → alive",
        {
            declSources: [{ rel: "src/styles/x.css", content: ":root { --zz-js: 1px; }" }],
            consumeSources: [{ rel: "src/a.ts", content: "el.style.getPropertyValue(\"--zz-js\");" }],
        },
        "--zz-js",
        true,
    );

    // Bite 6 — a token reached by a DYNAMIC template family → GREEN (the
    // `--section-color-${i}` / `--${prefix}-flow` class the naive scan misses).
    check(
        "dynamic template family → alive",
        {
            declSources: [{ rel: "src/styles/x.css", content: ":root { --zz-fam-42: 1px; }" }],
            consumeSources: [{ rel: "src/a.ts", content: "getPropertyValue(`--zz-fam-${i}`);" }],
        },
        "--zz-fam-42",
        true,
    );

    // Bite 7 — a token mentioned ONLY in a comment → RED (comments never alive).
    check(
        "comment-only mention → dead",
        {
            declSources: [{ rel: "src/styles/x.css", content: ":root { --zz-comment: 1px; }" }],
            consumeSources: [
                { rel: "src/styles/y.css", content: "/* reads var(--zz-comment) here */ .a { color: red; }" },
                { rel: "src/a.ts", content: "// getPropertyValue(\"--zz-comment\") someday" },
            ],
        },
        "--zz-comment",
        false,
    );

    return { pass: results.every((r) => r.ok), results };
}

function runSelfTest() {
    const { pass, results } = selfTest();
    console.log("proof:token-manifest --self-test (channel-aware bites)");
    for (const r of results) {
        const mark = r.ok ? "✓" : "✗";
        console.log(
            `  ${mark} ${r.label}  [${r.token} → ${r.actualAlive ? "alive" : "dead"}${
                r.channels.length ? " via " + r.channels.join("+") : ""
            }]`,
        );
    }
    console.log(`\n  self-test: ${pass ? "PASS" : "FAIL"}`);
    process.exit(pass ? 0 : 1);
}

function run() {
    if (process.argv.includes("--self-test")) return runSelfTest();

    const allowlist = readAllowlist();
    const manifest = buildTokenManifest({ root: ROOT });

    const violations = manifest.dead.filter((name) => !(name in allowlist));
    const allowlistedDead = manifest.dead.filter((name) => name in allowlist);
    const status = violations.length === 0 ? "pass" : "fail";

    // Emit the build-time manifest artefact (byte-stable in the gate cache;
    // GLASS_UI_TOKEN_MANIFEST points it at a committed snapshot on demand).
    const artefact = gateArtifactPath("GLASS_UI_TOKEN_MANIFEST", "token-manifest");
    writeGateArtifact(artefact, {
        generatedAt: snapshotStamp(),
        wave: "BG.W-TOKEN-MANIFEST",
        total: manifest.total,
        aliveCount: manifest.aliveCount,
        deadCount: manifest.deadCount,
        violations,
        allowlistedDead,
        dead: manifest.dead,
        tokens: manifest.tokens,
    });

    console.log(
        "proof:token-manifest — the countable-token-basis anti-accretion floor (BG.W-TOKEN-MANIFEST)",
    );
    console.log(`  total declared tokens : ${manifest.total}`);
    console.log(`  alive (≥1 live channel): ${manifest.aliveCount}`);
    console.log(`  dead (zero channel)    : ${manifest.deadCount}`);
    console.log(`  allowlisted-dead       : ${allowlistedDead.length}`);
    console.log(`  VIOLATIONS             : ${violations.length}`);

    if (violations.length > 0) {
        console.log("\nZERO-LIVE-CHANNEL TOKENS (dead surface — delete, or allowlist with rationale):");
        for (const v of violations) {
            const decl = manifest.tokens.find((t) => t.name === v);
            console.log(`  ✗ ${v}   (declared: ${decl?.decls[0] ?? "?"})`);
        }
        console.log(
            "\n  BG.W-TOKEN-MANIFEST is born-RED by design — BG.W-GLASS-BASIS-CONSOLIDATE (F2.2)" +
                "\n  sweeps this set + flips the gate GREEN. A genuinely-reserved token is allowlisted" +
                "\n  in scripts/token-manifest-allowlist.json WITH a rationale, never bulk-suppressed.",
        );
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${artefact.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
