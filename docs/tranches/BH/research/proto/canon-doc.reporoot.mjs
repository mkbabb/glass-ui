// scripts/lib/canon-doc.mjs  (BH B5c PROTOTYPE)
// ONE seam naming every canon-doc home, so the ~16 CLAUDE-reading gates re-point
// THROUGH it (DRY: one map, not 16 hardcoded paths). After CLAUDE.md is deleted,
// re-homing a contract = edit ONE entry here, not N gate scripts.
//
// Fail-explicit: canonDoc(key) THROWS on an unknown key, and readCanon(key) THROWS
// (ENOENT) if the home is absent — the gate REDs loud, never silently passes on a
// vanished doc (the close-class lie the whole BH doc-migration is built to kill).
import { existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = "/Users/mkbabb/Programming/glass-ui";  // PROTO: real-repo root (in-tree this is the scripts/lib/ walk)

// The canon-home registry. Keys are the contract TOPIC; values resolve to disk.
// cross-cutting → docs/canon/<topic>.md ; per-component → the colocated README ;
// public-facing → README.md. Adding a topic = one line here.
export const CANON_HOMES = Object.freeze({
  // ── docs/canon cross-cutting set ──
  "structure":        "docs/canon/structure.md",
  "dependencies":     "docs/canon/dependencies.md",
  "build-and-gates":  "docs/canon/build-and-gates.md",
  "conventions":      "docs/canon/conventions.md",
  "design-axes":      "docs/canon/design-axes.md",
  "glass-system":     "docs/canon/glass-system.md",
  "motion-system":    "docs/canon/motion-system.md",
  "consumer-wiring":  "docs/canon/consumer-wiring.md",
  "exports-subpaths": "docs/canon/exports-and-subpaths.md",
  // ── public-facing ──
  "readme":           "README.md",
  // ── per-component READMEs (colocated; DRY beside the code) ──
  "component:dock":              "src/components/custom/dock/README.md",
  "component:easing":            "src/components/custom/easing/README.md",
  "component:handmark":          "src/components/custom/handmark/README.md",
  "component:spa-view":          "src/components/custom/spa-view/README.md",
  "component:instrument-chassis":"src/components/custom/instrument-chassis/README.md",
});

/** Resolve a canon key to an ABSOLUTE path. Throws on unknown key (fail-explicit). */
export function canonDoc(key) {
  const rel = CANON_HOMES[key];
  if (!rel) {
    throw new Error(
      `canon-doc: unknown key "${key}". Known keys: ${Object.keys(CANON_HOMES).join(", ")}`
    );
  }
  return resolve(ROOT, rel);
}

/** Relative form (for violation messages). */
export function canonDocRel(key) {
  const rel = CANON_HOMES[key];
  if (!rel) throw new Error(`canon-doc: unknown key "${key}"`);
  return rel;
}

/**
 * Read a canon home. mode:"strict" (default) THROWS ENOENT if the home is absent
 * — a re-homed gate must RED loud, never pass on a vanished doc. mode:"soft"
 * returns "" (only for the WARN-degrade readers like accent-tone).
 */
export function readCanon(key, mode = "strict") {
  const abs = canonDoc(key);
  if (!existsSync(abs)) {
    if (mode === "soft") return "";
    throw new Error(
      `canon-doc: home for "${key}" is ABSENT at ${canonDocRel(key)} — ` +
      `re-home the contract there BEFORE re-pointing the gate (redistribute → re-home → delete).`
    );
  }
  return readFileSync(abs, "utf8");
}

/** Standing audit: every home resolves on disk. A BH close gate calls this so a
 *  half-finished migration (a key whose doc was never authored) REDs explicitly. */
export function auditCanonHomes() {
  return Object.entries(CANON_HOMES)
    .filter(([, rel]) => !existsSync(resolve(ROOT, rel)))
    .map(([key, rel]) => ({ key, rel }));
}
