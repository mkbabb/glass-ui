#!/usr/bin/env node
// Q.W0 Lane C — Cross-repo dev-resolution contract gate.
//
// History:
//   - AD.W4 introduced the `"development"` conditional-exports branch across the
//     `@mkbabb/*` family. The flip was applied to every publisher `package.json`
//     exports map and never to the resolver side (consumer Vite configs).
//   - Q12 §2 diagnosed the desync: publisher side uniform and correct; consumer
//     side has zero explicit `default` terminal key and one hostile fossil alias
//     (value.js vite.config.ts line 30 — pre-AD.W4 era; since removed).
//   - Q12 §6.2 recommended this fail-closed proof script.
//   - Q.W0 Lane C authors it. Fleet is mid-desync at W0 — the script is EXPECTED
//     to FAIL. W1 makes it pass.
//
// Contract (Q12 §3.1):
//   Publisher half — every `@mkbabb/*` `package.json` `exports["."]` MUST declare,
//   in this key order: development → types → import → default.
//   All four keys required; `default` was the missing terminal fallback.
//
//   Consumer half — no `@mkbabb/*` consumer Vite config may carry a hard
//   `resolve.alias` whose key matches `@mkbabb/*` and whose value points at a
//   `dist/` path of a sibling repo. A `dist/` alias defeats the conditional-exports
//   mechanism entirely (it bypasses the `exports` map).
//
// Checks performed:
//   1. Publisher check — every tracked `@mkbabb/*` publisher package declares the
//      4-key shape in `exports["."]`.
//   2. Consumer check — every consumer's Vite config file(s) are text-scanned for
//      `resolve.alias` entries that key on `@mkbabb/*` and whose value string
//      contains `dist/`. Regex-based static scan — conservative (no JS eval).
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
 * sibling repos and therefore must declare the full 4-key exports shape.
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

/** The canonical 4-key order the contract requires for every exports["."] */
const REQUIRED_EXPORT_KEYS = ["development", "types", "import", "default"];

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
 * Scan a Vite config file for `@mkbabb/*` aliases whose value references `dist/`.
 * Returns an array of { line: number, text: string } violations.
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
// Check 1 — Publisher exports["."] shape
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
            continue;
        }

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

        // Key order check — conditional-exports is first-match-wins; `development`
        // must be first so it takes precedence over `import`/`default`.
        const actualKeys = Object.keys(exportsRoot);
        const firstRequired = actualKeys.find((k) => REQUIRED_EXPORT_KEYS.includes(k));
        if (firstRequired && firstRequired !== "development") {
            violations.push({
                repo: pkg.id,
                file: "package.json",
                line: null,
                message: `exports["."] key order wrong — "development" must come first (found: ${actualKeys.join(", ")})`,
            });
        }
    }

    return violations;
}

// ---------------------------------------------------------------------------
// Check 2 — Consumer Vite configs: no hard @mkbabb/* dist/ alias
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
    console.log("[proof:resolution] PASS — dev-resolution contract satisfied across the constellation");
    process.exit(0);
}

// Fail — print each violation with repo + file + line
console.error("[proof:resolution] FAIL — dev-resolution contract violations found:\n");

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
console.error("Publisher fix (Q12 §3.3): add \"default\": \"./dist/<name>.js\" as the terminal");
console.error("  key in every @mkbabb/* package's exports[\".\"] map.");
console.error("Consumer fix (Q12 §3.1): remove hard dist/ aliases from resolve.alias —");
console.error("  bare specifiers resolve through the exports map via the file: symlink.");
console.error("");
console.error("See docs/precepts/cross-repo-dev-resolution.md for the full contract.");
console.error("W1 makes this gate pass; W0 documents the expected-fail baseline.");

process.exit(1);
