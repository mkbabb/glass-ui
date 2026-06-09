// constellation.mjs — the SINGLE source of constellation membership + the ONE
// absent-sibling resolution policy (AS.W2, inv-θ).
//
// Before AS.W2 the constellation/sibling list was hardcoded five times
// (proof-resolution-contract, proof-consumers-static, proof-consumers-build,
// proof-phantom-classes, proof-package) and had already DRIFTED — the consumer
// set was partial-and-inconsistent across gates (proof-consumers-static knew
// `bbnf-lang/playground`; proof-phantom-classes + proof-resolution knew
// `bbnf-buddy` — both are REAL, distinct repos, so each gate held a partial
// view of the true union). "Absent sibling on a clean runner" was likewise
// solved three different ways (registry-fallback, logged-skip,
// existsSync-continue). This module collapses all of that into one membership
// table + one `resolveSibling` policy.
//
// The policy encodes the G.W5 §8 registry-default world (inv 53): the published
// REGISTRY is the primary resolution surface; the local sibling checkout is a
// DEV convenience, present on a developer machine and ABSENT on a clean CI
// runner. So an absent sibling is never a violation — it is a graceful,
// LOGGED skip (no silent cap). glass-ui itself (the self repo) is always
// present; an absent self IS an error.

import { existsSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// ROOT = the glass-ui repo root (this file lives in <root>/scripts/).
export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
// PARENT = the shared `~/Programming` dir the constellation repos live under.
export const PARENT = resolve(ROOT, "..");

// ── Publishers ────────────────────────────────────────────────────────────
// The `@mkbabb/*` packages glass-ui publishes ALONGSIDE — each ships the
// contract-v2 exports shape (types/import/default, build:watch, no
// `development` key). glass-ui (self) is always present; the siblings are
// dev-only checkouts.
export const PUBLISHERS = [
    { id: "glass-ui", dir: ROOT, self: true },
    { id: "keyframes.js", dir: resolve(PARENT, "keyframes.js") },
    { id: "value.js", dir: resolve(PARENT, "value.js") },
];

// ── Consumers ───────────────────────────────────────────────────────────────
// Every repo that consumes `@mkbabb/glass-ui` (scanned for phantom-classes,
// surface-creep, and dev-resolution conformance). The set is the canonical
// UNION the five scattered lists each held a partial view of. `roots` are the
// source trees to scan; `self` marks glass-ui's own surface; `viteConfigs` are
// the resolution-contract config files (relative to `dir`). Note `bbnf-lang`
// (the playground) and `bbnf-buddy` (the mascot app) are DISTINCT repos — both
// real consumers, not a naming drift.
export const CONSUMERS = [
    {
        id: "glass-ui",
        dir: ROOT,
        self: true,
        roots: [resolve(ROOT, "src"), resolve(ROOT, "demo")],
        viteConfigs: ["vite.config.ts"],
    },
    {
        id: "keyframes.js",
        dir: resolve(PARENT, "keyframes.js"),
        roots: [resolve(PARENT, "keyframes.js/src")],
        viteConfigs: ["vite.config.ts"],
    },
    {
        id: "value.js",
        dir: resolve(PARENT, "value.js"),
        roots: [resolve(PARENT, "value.js/src")],
        viteConfigs: ["vite.config.ts"],
    },
    {
        id: "fourier-analysis/web",
        dir: resolve(PARENT, "fourier-analysis/web"),
        // fourier carries both a legacy `../src` and the active `web/src`.
        roots: [
            resolve(PARENT, "fourier-analysis/src"),
            resolve(PARENT, "fourier-analysis/web/src"),
        ],
        viteConfigs: ["vite.config.ts"],
    },
    {
        id: "words/frontend",
        dir: resolve(PARENT, "words/frontend"),
        roots: [resolve(PARENT, "words/frontend/src")],
        viteConfigs: ["vite.config.ts"],
    },
    {
        id: "bbnf-lang/playground",
        dir: resolve(PARENT, "bbnf-lang/playground"),
        roots: [resolve(PARENT, "bbnf-lang/playground/src")],
        viteConfigs: ["vite.config.ts"],
    },
    {
        id: "bbnf-buddy",
        dir: resolve(PARENT, "bbnf-buddy"),
        roots: [resolve(PARENT, "bbnf-buddy/src")],
        viteConfigs: ["vite.config.ts"],
    },
    {
        id: "speedtest",
        dir: resolve(PARENT, "speedtest"),
        roots: [resolve(PARENT, "speedtest/src")],
        viteConfigs: ["vite.config.ts"],
    },
];

/**
 * resolveSibling — the ONE absent-sibling policy (registry-default world).
 *
 * Returns `{ present, dir, self }`. A member whose `dir` is not a directory on
 * disk is ABSENT (the clean-runner case) — `present: false`. The caller decides
 * what absence means, but the canonical rule (used by every gate) is:
 *   - `self` absent  → a real error (glass-ui must always be checked out).
 *   - sibling absent → a graceful skip (the registry is the primary surface;
 *     the local checkout is a dev convenience). Callers log the skip via
 *     `skipSibling` so absence is never a silent cap.
 *
 * @param {{id:string,dir:string,self?:boolean}} member
 */
export function resolveSibling(member) {
    const present = existsSync(member.dir) && statSync(member.dir).isDirectory();
    return { present, dir: member.dir, self: Boolean(member.self) };
}

/** Emit the canonical "sibling not checked out — skipping" line (no silent cap). */
export function skipSibling(gate, member) {
    console.log(
        `[${gate}] ${member.id} not checked out — sibling skip (registry-default; CI-expected)`,
    );
}

// ── Deletion-sweep roots ──────────────────────────────────────────────────────
// AX.W62 — the SHARED source-tree set every "no-Identifier-survives" deletion
// proof walks. Before this, each clean-break gate hand-rolled its own
// `["src","demo"]` local, so the `tests/` mirror (carved out of every tsconfig
// + every sweep since AV.W14) was a blind spot: a deleted symbol could survive
// in a test file un-caught (the W53 BouncyToggle class). Minting it ONCE here
// (and having `proof:tabs-unified` + every future deletion gate consume it)
// stops the copy-forward `["src","demo"]` hole from propagating into the next
// clean-break wave's gate.
export const DELETION_SWEEP_ROOTS = ["src", "demo", "tests"];

/** Present publishers, in declaration order (self first). */
export function presentPublishers() {
    return PUBLISHERS.filter((p) => resolveSibling(p).present);
}

/** Present consumers, in declaration order (self first). */
export function presentConsumers() {
    return CONSUMERS.filter((c) => resolveSibling(c).present);
}
