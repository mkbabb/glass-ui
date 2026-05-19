#!/usr/bin/env node
// Cross-repo dev-resolution contract gate.
//
// History:
//   - AD.W4 introduced the `"development"` conditional-exports branch across the
//     `@mkbabb/*` family — workspace-linked consumers resolved a sibling's live
//     `src/` in dev mode.
//   - Tranche Q (Q.W0 Lane C) authored this gate for contract-v1: it ASSERTED
//     the 4-key `development → types → import → default` exports shape.
//   - The AG glass-ui-core wave (2026-05-19) rewrites this gate for
//     contract-v2. The user directed the `development` condition be entirely
//     abrogated: consumers resolve `dist/`; every publisher exposes a
//     `build:watch` that keeps `dist/` fresh. The gate is INVERTED — it now
//     FORBIDS the very condition it once required (a fail-closed
//     anti-regression) and additionally REQUIRES the `build:watch` script.
//
// Contract-v2 (docs/precepts/cross-repo-dev-resolution.md §2):
//   Publisher half — every `@mkbabb/*` `package.json` `exports["."]` MUST
//   declare the 3-key shape `types → import → default` and MUST NOT carry a
//   `development` key (anywhere in the exports map — root or subpath).
//   Watch-build — every `@mkbabb/*` publisher MUST declare a `build:watch`
//   script so consumer dev-orchestration can keep `dist/` fresh.
//   Consumer half — no `@mkbabb/*` consumer Vite config may carry a hard
//   `resolve.alias` whose key matches `@mkbabb/*` and whose value points at a
//   `dist/` path. A `dist/` alias shadows the `exports` map (which under
//   contract-v2 already resolves `dist/` — the alias is a redundant fossil).
//
// Checks performed:
//   1. Publisher exports shape — every tracked `@mkbabb/*` publisher's
//      `exports["."]` declares the 3-key shape AND no `exports` entry (root or
//      subpath) carries a `development` key.
//   2. Watch-build presence — every publisher `package.json` declares a
//      `build:watch` script.
//   3. Consumer check — every consumer's Vite config file(s) are text-scanned
//      for `resolve.alias` entries that key on `@mkbabb/*` and whose value
//      string contains `dist/`. Regex-based static scan — conservative.
//
// Migration note: the AG glass-ui-core wave rewrites this gate together with
// glass-ui's own `exports`/`scripts`, so the gate is GREEN for glass-ui at
// that wave's close. The sibling consumers (keyframes.js, value.js) and the
// four leaf consumers still carry contract-v1 shape until the AG-GU
// fleet-migration waves (GU0/GU2/GU4); the gate is EXPECTED RED for those
// repos until then — the intended contract-v1→v2 inversion transient.
//
// Exit 0 → clean (all checks pass).
// Exit 1 → violation(s) found; each named with repo + file + line.
//
// Run: node scripts/proof-resolution-contract.mjs
// npm:  npm run proof:resolution

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------------------
// CONSTELLATION — maintainable const. Update when repos join or leave the
// @mkbabb/* workspace. Paths are siblings of glass-ui under the shared parent.
// ---------------------------------------------------------------------------

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const PARENT = resolve(ROOT, "..");

/**
 * Publisher packages — `@mkbabb/*` libraries that are workspace-linked between
 * sibling repos. Under contract-v2 each must declare the 3-key exports shape,
 * carry no `development` key, and expose a `build:watch` script.
 * These are the repos that appear as `file:` deps in other repos' package.json.
 *
 * Format: { id: string, dir: string }
 *   id  — human-readable name for diagnostics
 *   dir — absolute path to the repo root
 */
const PUBLISHER_PACKAGES = [
    { id: "glass-ui",     dir: ROOT },
    { id: "keyframes.js", dir: resolve(PARENT, "keyframes.js") },
    { id: "value.js",     dir: resolve(PARENT, "value.js") },
];

/**
 * Consumer repos — every repo that has a Vite config and might carry a
 * `resolve.alias` pointing at a sibling `@mkbabb/*` dist/ path.
 * glass-ui itself is a consumer of keyframes.js.
 *
 * Format: { id: string, viteConfigs: string[] }
 *   id          — human-readable name for diagnostics
 *   viteConfigs — relative paths from that repo's root to its Vite config(s)
 */
const CONSUMER_REPOS = [
    {
        id: "glass-ui",
        dir: ROOT,
        viteConfigs: ["vite.config.ts"],
    },
    {
        id: "keyframes.js",
        dir: resolve(PARENT, "keyframes.js"),
        viteConfigs: ["vite.config.ts"],
    },
    {
        id: "value.js",
        dir: resolve(PARENT, "value.js"),
        viteConfigs: ["vite.config.ts"],
    },
    {
        id: "fourier-analysis/web",
        dir: resolve(PARENT, "fourier-analysis/web"),
        viteConfigs: ["vite.config.ts"],
    },
    {
        id: "bbnf-buddy",
        dir: resolve(PARENT, "bbnf-buddy"),
        viteConfigs: ["vite.config.ts"],
    },
    {
        id: "words/frontend",
        dir: resolve(PARENT, "words/frontend"),
        viteConfigs: ["vite.config.ts"],
    },
    {
        id: "speedtest",
        dir: resolve(PARENT, "speedtest"),
        viteConfigs: ["vite.config.ts"],
    },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * The canonical 3-key shape contract-v2 requires for every exports["."].
 * `development` is deliberately ABSENT — its presence is a violation (the gate
 * forbids what contract-v1 once required).
 */
const REQUIRED_EXPORT_KEYS = ["types", "import", "default"];

/** The condition key contract-v2 abrogates — forbidden anywhere in `exports`. */
const FORBIDDEN_EXPORT_KEY = "development";

/** The script every `@mkbabb/*` publisher must declare under contract-v2. */
const REQUIRED_PUBLISHER_SCRIPT = "build:watch";

/**
 * Regex to detect a hard `@mkbabb/*` alias whose value string contains `dist/`.
 *
 * We scan raw TypeScript/JS source text. The pattern looks for:
 *   "@mkbabb/something"  (or single-quoted)
 *   followed (on the same line or nearby) by a path string containing "dist/"
 *
 * Conservative two-pass approach:
 *   Pass 1 — find lines that contain `"@mkbabb/` or `'@mkbabb/` as an alias key.
 *   Pass 2 — within a window of ±3 lines around each hit, look for `dist/`.
 *
 * This avoids false positives from comment references (e.g. `// @mkbabb/keyframes.js`
 * resolved via dist/ — the path value must appear on the same or adjacent line).
 */
const MKBABB_ALIAS_KEY_RE = /["']@mkbabb\/[^"']+["']\s*:/;
const DIST_VALUE_RE = /["'`][^"'`]*dist\/[^"'`]*["'`]/;

/**
 * Recursively collect every conditional-exports key name that appears anywhere
 * in an `exports` map — root, subpath, or nested condition object. Used to
 * assert the `development` key is absent across the WHOLE map, not just root.
 */
function collectExportConditionKeys(node, acc) {
    if (!node || typeof node !== "object" || Array.isArray(node)) return acc;
    for (const [key, value] of Object.entries(node)) {
        // Subpath keys start with "." — they are paths, not condition keys.
        if (!key.startsWith(".")) acc.add(key);
        collectExportConditionKeys(value, acc);
    }
    return acc;
}

/**
 * Scan a Vite config file for `@mkbabb/*` aliases whose value references `dist/`.
 * Returns an array of { line: number, key: string, text: string } violations.
 */
function scanViteConfigForDistAliases(filePath) {
    const violations = [];
    const source = readFileSync(filePath, "utf8");
    const lines = source.split("\n");

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!MKBABB_ALIAS_KEY_RE.test(line)) continue;

        // Window: the key line itself + the next 3 lines (value may be on the next line).
        const window = lines.slice(i, Math.min(i + 4, lines.length)).join("\n");
        if (DIST_VALUE_RE.test(window)) {
            // Extract what matched to make the diagnostic useful.
            const keyMatch = line.match(/["'](@mkbabb\/[^"']+)["']/);
            const key = keyMatch ? keyMatch[1] : "<unknown>";
            violations.push({ line: i + 1, key, text: line.trim() });
        }
    }

    return violations;
}

// ---------------------------------------------------------------------------
// Check 1+2 — Publisher exports["."] shape + build:watch script
// ---------------------------------------------------------------------------

function checkPublisherPackages() {
    const violations = [];

    for (const pkg of PUBLISHER_PACKAGES) {
        const pkgJsonPath = resolve(pkg.dir, "package.json");

        if (!existsSync(pkgJsonPath)) {
            violations.push({
                repo: pkg.id,
                file: "package.json",
                line: null,
                message: "package.json not found — repo missing or path wrong in PUBLISHER_PACKAGES",
            });
            continue;
        }

        let parsed;
        try {
            parsed = JSON.parse(readFileSync(pkgJsonPath, "utf8"));
        } catch (e) {
            violations.push({
                repo: pkg.id,
                file: "package.json",
                line: null,
                message: `JSON parse error: ${e.message}`,
            });
            continue;
        }

        const exportsRoot = parsed.exports?.["."];

        if (!exportsRoot || typeof exportsRoot !== "object" || Array.isArray(exportsRoot)) {
            violations.push({
                repo: pkg.id,
                file: "package.json",
                line: null,
                message: `exports["."] is missing or not an object`,
            });
        } else {
            // Required 3-key shape — types, import, default all present.
            for (const key of REQUIRED_EXPORT_KEYS) {
                if (typeof exportsRoot[key] !== "string") {
                    violations.push({
                        repo: pkg.id,
                        file: "package.json",
                        line: null,
                        message: `exports["."] missing required key "${key}" (found keys: ${Object.keys(exportsRoot).join(", ")})`,
                    });
                }
            }
        }

        // Contract-v2 anti-regression — the `development` condition is
        // abrogated. It must NOT appear anywhere in the exports map (root or
        // any subpath). The gate forbids what contract-v1 once required.
        const conditionKeys = collectExportConditionKeys(parsed.exports, new Set());
        if (conditionKeys.has(FORBIDDEN_EXPORT_KEY)) {
            violations.push({
                repo: pkg.id,
                file: "package.json",
                line: null,
                message: `exports map carries a forbidden "${FORBIDDEN_EXPORT_KEY}" condition key — contract-v2 abrogates it; collapse the entry to the 3-key shape (types/import/default)`,
            });
        }

        // Watch-build — contract-v2 §2.3: every publisher exposes build:watch.
        const scripts = parsed.scripts ?? {};
        if (typeof scripts[REQUIRED_PUBLISHER_SCRIPT] !== "string") {
            violations.push({
                repo: pkg.id,
                file: "package.json",
                line: null,
                message: `missing required "${REQUIRED_PUBLISHER_SCRIPT}" script — contract-v2 §2.3 requires every @mkbabb/* publisher to expose an incremental watch build that keeps dist/ fresh`,
            });
        }
    }

    return violations;
}

// ---------------------------------------------------------------------------
// Check 3 — Consumer Vite configs: no hard @mkbabb/* dist/ alias
// ---------------------------------------------------------------------------

function checkConsumerViteConfigs() {
    const violations = [];

    for (const consumer of CONSUMER_REPOS) {
        for (const relPath of consumer.viteConfigs) {
            const fullPath = resolve(consumer.dir, relPath);

            if (!existsSync(fullPath)) {
                // Not all consumers may have every config; non-fatal skip.
                continue;
            }

            const hits = scanViteConfigForDistAliases(fullPath);
            for (const hit of hits) {
                violations.push({
                    repo: consumer.id,
                    file: relPath,
                    line: hit.line,
                    message: `hard dist/ alias for ${hit.key}: ${hit.text}`,
                });
            }
        }
    }

    return violations;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const publisherViolations = checkPublisherPackages();
const consumerViolations = checkConsumerViteConfigs();
const allViolations = [...publisherViolations, ...consumerViolations];

if (allViolations.length === 0) {
    console.log("[proof:resolution] PASS — contract-v2 dev-resolution contract satisfied across the constellation");
    process.exit(0);
}

// Fail — print each violation with repo + file + line
console.error("[proof:resolution] FAIL — contract-v2 dev-resolution contract violations found:\n");

let publisherCount = 0;
let consumerCount = 0;

for (const v of publisherViolations) {
    publisherCount++;
    const loc = v.line != null ? `:${v.line}` : "";
    console.error(`  [publisher] ${v.repo}/${v.file}${loc}`);
    console.error(`              ${v.message}`);
}

if (publisherViolations.length > 0) console.error("");

for (const v of consumerViolations) {
    consumerCount++;
    const loc = v.line != null ? `:${v.line}` : "";
    console.error(`  [consumer]  ${v.repo}/${v.file}${loc}`);
    console.error(`              ${v.message}`);
}

console.error("");
console.error(
    `Summary: ${publisherCount} publisher violation(s), ${consumerCount} consumer violation(s).`,
);
console.error("");
console.error("Publisher fix (contract-v2 §2.1/§2.3): collapse every exports entry to the");
console.error("  3-key shape (types/import/default) — delete every \"development\" key — and");
console.error("  declare a \"build:watch\" script in package.json.");
console.error("Consumer fix (contract-v2 §2.4): remove hard dist/ aliases from resolve.alias —");
console.error("  bare specifiers resolve through the exports map to dist/ via the file: symlink.");
console.error("");
console.error("See docs/precepts/cross-repo-dev-resolution.md for the full contract-v2.");
console.error("Fleet-green is staged: glass-ui passes at the AG glass-ui-core wave close;");
console.error("the sibling + leaf consumers migrate in AG-GU0/GU2/GU4 — RED for them is expected.");

process.exit(1);
