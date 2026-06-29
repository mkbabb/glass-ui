// scripts/lib/design-docs.mjs  (BH.B4b-skeleton — the design-doc resolver seam)
// ============================================================================
// ONE seam naming every glass-ui DESIGN-doc home, so the ~10 precept-reading
// gates re-point THROUGH it (DRY: one map, not 10 hardcoded submodule paths).
// The 4 glass-ui design docs are EXTRACTED from the `docs/precepts` submodule into
// in-repo `docs/design/` files (B4c-precept-extract, row 1.10 DONE) so a gate reads
// an in-repo doc, not a submodule path that ENOENT-breaks on a fresh checkout. B5c
// [WS12] re-points the precept readers through this seam; this skeleton lands it.
//
// EXCLUDED (stay in the precepts submodule, base — NOT a design-doc home): the 2
// `cross-repo-dev-resolution.md` readers + `infra/`/`glossary/` (fourier/feedback-
// coder content). The upstream submodule delete is a by-name ask to mkbabb/precepts.
//
// Fail-explicit: designDoc(key) THROWS on an unknown key; readDesign(key) THROWS
// (ENOENT) if the home is absent — a re-homed gate REDs loud, never passes on a
// vanished doc.
// ============================================================================
import { existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// REPO_ROOT — this leaf lives at <root>/scripts/lib/, so up two.
export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

// The design-home registry. Keys are the design TOPIC; values resolve to the
// in-repo `docs/design/` extraction. Adding a topic = one line here.
export const DESIGN_HOMES = Object.freeze({
    "design-idioms": "docs/design/design-idioms.md",
    "motion-canon": "docs/design/motion-canon.md",
    "tunable-anim": "docs/design/tunable-anim.md",
    "affordance-map": "docs/design/affordance-map.md",
});

/** Resolve a design key to an ABSOLUTE path. Throws on unknown key (fail-explicit). */
export function designDoc(key) {
    const rel = DESIGN_HOMES[key];
    if (!rel) {
        throw new Error(
            `design-docs: unknown key "${key}". Known keys: ${Object.keys(DESIGN_HOMES).join(", ")}`,
        );
    }
    return resolve(ROOT, rel);
}

/** Relative form (for violation messages). */
export function designDocRel(key) {
    const rel = DESIGN_HOMES[key];
    if (!rel) throw new Error(`design-docs: unknown key "${key}"`);
    return rel;
}

/**
 * Read a design home. mode:"strict" (default) THROWS ENOENT if absent — a re-homed
 * gate must RED loud, never pass on a vanished doc. mode:"soft" returns "".
 */
export function readDesign(key, mode = "strict") {
    const abs = designDoc(key);
    if (!existsSync(abs)) {
        if (mode === "soft") return "";
        throw new Error(
            `design-docs: home for "${key}" is ABSENT at ${designDocRel(key)} — ` +
                `extract the design doc there BEFORE re-pointing the gate.`,
        );
    }
    return readFileSync(abs, "utf8");
}

/**
 * Standing audit: every design home resolves on disk. A BH close gate calls this so
 * a half-finished extraction (a key whose doc was never extracted) REDs explicitly.
 * Returns the list of { key, rel } whose home is ABSENT (empty = all homes present).
 */
export function auditDesignHomes() {
    return Object.entries(DESIGN_HOMES)
        .filter(([, rel]) => !existsSync(resolve(ROOT, rel)))
        .map(([key, rel]) => ({ key, rel }));
}
