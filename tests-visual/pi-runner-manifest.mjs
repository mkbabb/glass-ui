// BB.W-VISUAL-RUNNER — the visual-π ENROLLMENT manifest (the anti-hand-list seam).
//
// The ~93 `*.spec.ts` in this workspace are the binding painted truth CLAUDE.md
// repeatedly names. Before this manifest they ran NOWHERE automated: only ~22 were
// spawned by a `proof-*.mjs` gate, the other ~57 ran only if a human cd'd in and
// typed `playwright test`. The `gates.mjs --run pi` mode runs the WHOLE enrolled set
// as one command; this module is the single source of truth for WHICH specs that set
// contains.
//
// THE ANTI-DRIFT DISCIPLINE (the pi-manifest.ts I-1/I-2 idiom, extended from the
// SCENE targets to the spec ENROLLMENT): the enrolled set is COMPUTED FROM DISK — the
// non-private (`!/^_/`) `*.spec.ts` glob MINUS a small explicitly-declared EXCLUDE
// allowlist (each row carrying a one-line rationale). The default is INCLUDE: a new
// `tests-visual/foo.spec.ts` is enrolled the MOMENT it lands, no manifest edit. There
// is NO hand-list of enrolled spec names to drift — `proof:visual-runner`'s W2 clause
// reds if a future agent re-hand-lists the set, and reds if a committed spec is
// neither enrolled nor excluded-with-rationale (the orphan self-test bite).
//
// `.mjs` (not `.ts`) BY NECESSITY: the two consumers are node `.mjs` modules — the
// `gates.mjs --run pi` runner (it spawns Playwright with this set as the spec args)
// and `proof-visual-runner.mjs` (the headless enrollment census) — so a single
// node-importable ESM source is the no-second-copy shape. No Playwright spec imports
// the enrollment (the runner passes the list on the CLI); the spec side needs no
// mirror.

import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const WORKSPACE = fileURLToPath(new URL(".", import.meta.url));

/**
 * The EXCLUDE allowlist — the ONLY non-private specs NOT in the `--run pi` set, each
 * with a one-line rationale (the `pi-manifest.ts` reasoned-allowlist discipline). The
 * default is INCLUDE; a spec lands here ONLY when it is genuinely non-binding (an
 * orchestration/capture probe that drives a constellation capture rather than assert a
 * re-runnable readback). A committed non-private spec on NEITHER the enrolled set NOR
 * this allowlist REDs `proof:visual-runner` (the orphan-class fix).
 *
 * The 14 `_`-prefixed private capture helpers are excluded by the `!/^_/` glob, NOT by
 * a row here (the rationale recorded once, in the glob below — not 14 rows).
 *
 * @type {ReadonlyArray<{ spec: string, rationale: string }>}
 */
export const PI_EXCLUDE = [
    {
        spec: "reflect-aurora.spec.ts",
        rationale:
            "AZ.W-REFLECT aurora-lane capture probe — AUDIT-ONLY, not a gate (its own header). Drives a fresh whole-page capture into docs/tranches/AZ/audit/reflect/ and probes the dead-select fix; it asserts no re-runnable binding readback (the painterly metrics are reported, not asserted). A reflection-orchestration helper, not the binding-π suite.",
    },
    {
        spec: "reflect-aurora-selects.spec.ts",
        rationale:
            "AZ.W-REFLECT focused combobox-open probe — a one-off D1 dead-select reflection probe (dumps results to console + a capture), not a binding readback. Reflection orchestration.",
    },
    {
        spec: "reflect-medium.spec.ts",
        rationale:
            "AZ.W-REFLECT medium-select reflection probe — captures a screenshot + logs combobox state, asserts `expect(true).toBe(true)` (trivially true). A capture orchestration helper, not a binding readback.",
    },
    {
        spec: "reflect-medium2.spec.ts",
        rationale:
            "AZ.W-REFLECT 2nd-combobox reflection probe — the medium2 twin of reflect-medium, captures + logs, asserts `expect(true).toBe(true)`. Capture orchestration, not a binding readback.",
    },
];

/** Every `*.spec.ts` on disk, sorted (the raw workspace glob). */
export function allSpecs() {
    return readdirSync(WORKSPACE)
        .filter((f) => /\.spec\.ts$/.test(f))
        .sort();
}

/** The non-private (`!/^_/`) specs — the candidate binding suite. */
export function nonPrivateSpecs() {
    return allSpecs().filter((f) => !/^_/.test(f));
}

const EXCLUDE_SET = new Set(PI_EXCLUDE.map((r) => r.spec));

/**
 * The ENROLLED visual-π set — the non-private glob MINUS the declared EXCLUDE rows.
 * COMPUTED FROM DISK (no hand-list); a new spec is enrolled the moment it lands.
 */
export function enrolledSpecs() {
    return nonPrivateSpecs().filter((f) => !EXCLUDE_SET.has(f));
}

/** Absolute paths of the enrolled specs (for a runner that wants full paths). */
export function enrolledSpecPaths() {
    return enrolledSpecs().map((f) => resolve(WORKSPACE, f));
}
