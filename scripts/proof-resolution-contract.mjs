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
import {
    PUBLISHERS,
    CONSUMERS,
    resolveSibling,
    skipSibling,
} from "./constellation.mjs";

// ---------------------------------------------------------------------------
// CONSTELLATION — membership + absent-sibling policy live in constellation.mjs
// (AS.W2, inv-θ): the single source of the @mkbabb/* workspace table. The
// publisher loop reads PUBLISHERS; the consumer loop reads CONSUMERS (which
// carries `viteConfigs` — the resolution-contract config files per repo).
// Every absent-sibling case routes through resolveSibling()+skipSibling():
// a sibling absent on a clean runner is a graceful logged skip (the registry
// is the primary surface), while glass-ui's own `self` repo is REQUIRED.
// ---------------------------------------------------------------------------

// Documented-pending SELF-aliases — a repo aliasing its OWN package name to its
// own dist/ inside its own demo config. Logged loudly as [pending], never a
// violation: it cannot break glass-ui→sibling resolution (the cross-repo path
// this gate guards), and the mechanism choice (alias vs exports-map) belongs to
// the OWNING repo's open tranche. Each entry names the owner + the reconcile
// home; an entry is REMOVED when the owning tranche closes its mechanism.
const SELF_ALIAS_PENDING = [
    {
        repo: "value.js",
        file: "vite.config.ts",
        reason: "value.js N.W1.C repointed src→dist deliberately (their comment: dist-resolution everywhere, kept fresh by build:watch) — the alias-vs-exports-map mechanism reconciles at the value.js tranche-N close (their open WIP at this AZ close); owner: the value.js session.",
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

    for (const pkg of PUBLISHERS) {
        // Absent-sibling policy (constellation.mjs): a sibling publisher repo
        // that isn't checked out on this runner (the CI case — siblings live
        // under PARENT, absent on a clean Actions runner) is a graceful logged
        // skip, never a violation — the contract-v2 exports shape can only be
        // verified for a publisher that EXISTS. glass-ui's own `self` repo is
        // REQUIRED, so its absence IS a real error.
        const { present, self } = resolveSibling(pkg);
        if (!present) {
            if (self) {
                violations.push({
                    repo: pkg.id,
                    file: "package.json",
                    line: null,
                    message: "self repo not checked out — glass-ui must always be present",
                });
            } else {
                skipSibling("proof:resolution", pkg);
            }
            continue;
        }

        const pkgJsonPath = resolve(pkg.dir, "package.json");

        if (!existsSync(pkgJsonPath)) {
            violations.push({
                repo: pkg.id,
                file: "package.json",
                line: null,
                message: "package.json not found — repo present but exports manifest missing",
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

    for (const consumer of CONSUMERS) {
        // Absent-sibling policy (constellation.mjs): a consumer repo absent on
        // a clean runner is a graceful logged skip (no silent cap). glass-ui's
        // own `self` repo is always present, so it never trips this branch.
        const { present, self } = resolveSibling(consumer);
        if (!present) {
            if (self) {
                violations.push({
                    repo: consumer.id,
                    file: "<repo>",
                    line: null,
                    message: "self repo not checked out — glass-ui must always be present",
                });
            } else {
                skipSibling("proof:resolution", consumer);
            }
            continue;
        }

        for (const relPath of consumer.viteConfigs) {
            const fullPath = resolve(consumer.dir, relPath);

            if (!existsSync(fullPath)) {
                // The repo is present but lacks this particular config; non-fatal skip.
                continue;
            }

            const hits = scanViteConfigForDistAliases(fullPath);
            for (const hit of hits) {
                // Documented-pending SELF-aliases (the proof:phantom-classes
                // precedent — loud, owned, never silent). A package aliasing its
                // OWN name to its own dist/ inside its own demo config does not
                // break glass-ui→sibling resolution; the mechanism choice (alias
                // vs exports-map) belongs to the owning repo's open tranche.
                const pending = SELF_ALIAS_PENDING.find(
                    (p) =>
                        p.repo === consumer.id &&
                        p.file === relPath &&
                        hit.key === `@mkbabb/${consumer.id}`,
                );
                if (pending) {
                    console.error(
                        `  [pending]  ${consumer.id}/${relPath}:${hit.line} self-alias ${hit.key} — ${pending.reason}`,
                    );
                    continue;
                }
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
