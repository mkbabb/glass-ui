// scripts/lib/canon-doc.mjs  (BH.B4b-skeleton seam · BH.B4b-content content-audit)
// ============================================================================
// ONE seam naming every canon-doc home, so the ~16 CLAUDE-reading gates re-point
// THROUGH it (DRY: one map, not 16 hardcoded paths). After CLAUDE.md is deleted
// (B4f, the absolute-last act), re-homing a contract = edit ONE entry here, not N
// gate scripts. B5c [WS12] re-points the readers; the skeleton landed the seam +
// the empty-but-present docs/canon scaffolds; B4b-content redistributes the live
// contract PROSE into those homes (marker stripped, real body).
//
// Fail-explicit: canonDoc(key) THROWS on an unknown key, and readCanon(key) THROWS
// (ENOENT) if the home is absent — the gate REDs loud, never silently passes on a
// vanished doc (the close-class lie the whole BH doc-migration is built to kill).
//
// CONTENT vs PRESENCE (BH.B4b-content). auditCanonHomes(mode) is the silent-loss
// fence: mode:"present" is the B4b-skeleton existsSync floor (a home is a FILE);
// mode:"content" (the DEFAULT) is the B4b-content floor — a home is content-real
// (the verbatim SKELETON marker STRIPPED + a >200-char body), so a green-over-a-
// scaffold (the C5 close-class lie: strip the marker, leave a stub) cannot pass.
// ============================================================================
import { existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// REPO_ROOT — this leaf lives at <root>/scripts/lib/, so up two.
export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

// The verbatim skeleton-scaffold marker (`> SKELETON (BH.B4b-skeleton). …`, the
// blockquote every B4b-skeleton stub carries). A content-complete home has it
// STRIPPED — its presence in a home is the "green-over-scaffold" tell.
export const SKELETON_MARKER = "SKELETON (BH.B4b-skeleton)";

// The content-complete body floor (chars past the H1 title line). A redistributed
// contract is prose; 200 chars is the "not a one-line stub" floor.
export const CONTENT_MIN_CHARS = 200;

// The canon-home registry. Keys are the contract TOPIC; values resolve to disk.
// cross-cutting → docs/canon/<topic>.md ; per-component → the colocated README ;
// public-facing → README.md. Adding a topic = one line here.
export const CANON_HOMES = Object.freeze({
    // ── docs/canon cross-cutting set (the structure.md home is GENERATED) ──
    structure: "docs/canon/structure.md",
    dependencies: "docs/canon/dependencies.md",
    "build-and-gates": "docs/canon/build-and-gates.md",
    conventions: "docs/canon/conventions.md",
    "design-axes": "docs/canon/design-axes.md",
    "glass-system": "docs/canon/glass-system.md",
    "motion-system": "docs/canon/motion-system.md",
    "consumer-wiring": "docs/canon/consumer-wiring.md",
    "exports-subpaths": "docs/canon/exports-and-subpaths.md",
    // ── public-facing ──
    readme: "README.md",
    // ── per-component READMEs (colocated; DRY beside the code) ──
    "component:dock": "src/components/dock/README.md",
    "component:easing": "src/components/easing/README.md",
    "component:handmark": "src/components/handmark/README.md",
    "component:spa-view": "src/components/spa-view/README.md",
    "component:instrument-chassis": "src/components/instrument-chassis/README.md",
});

/** Resolve a canon key to an ABSOLUTE path. Throws on unknown key (fail-explicit). */
export function canonDoc(key) {
    const rel = CANON_HOMES[key];
    if (!rel) {
        throw new Error(
            `canon-doc: unknown key "${key}". Known keys: ${Object.keys(CANON_HOMES).join(", ")}`,
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
                `re-home the contract there BEFORE re-pointing the gate (redistribute → re-home → delete).`,
        );
    }
    return readFileSync(abs, "utf8");
}

/**
 * The PURE content-state classifier (fed a raw string so a gate self-test can hand
 * it synthetic bodies without touching disk). Returns "absent" | "skeleton" |
 * "thin" | "content".
 *   absent   — src is null/undefined (the home file does not exist).
 *   skeleton — the verbatim SKELETON_MARKER survives (a B4b-skeleton stub).
 *   thin     — marker stripped BUT the body (past the H1 title line) is < the floor.
 *   content  — marker stripped AND the body clears the floor (content-complete).
 */
export function classifyCanonBody(src) {
    if (src == null) return "absent";
    if (src.includes(SKELETON_MARKER)) return "skeleton";
    // Body = everything past the first H1 title line (a bare "# Title" is not prose).
    const body = src.replace(/^\s*#[^\n]*\n/, "").trim();
    return body.length >= CONTENT_MIN_CHARS ? "content" : "thin";
}

/** The on-disk content state of a canon home (reads the file, then classifies). */
export function canonHomeState(key) {
    const abs = canonDoc(key);
    if (!existsSync(abs)) return "absent";
    return classifyCanonBody(readFileSync(abs, "utf8"));
}

/**
 * Standing audit — the silent-loss fence. mode:"content" (DEFAULT) flags every
 * home that is NOT content-complete (absent / skeleton-stub / thin body), so a
 * half-finished redistribution REDs explicitly. mode:"present" is the
 * B4b-skeleton existsSync floor (the file exists), kept for the skeleton-band gate.
 * Returns the list of { key, rel, state } that fail (empty = all homes pass).
 */
export function auditCanonHomes(mode = "content") {
    const out = [];
    for (const [key, rel] of Object.entries(CANON_HOMES)) {
        const abs = resolve(ROOT, rel);
        if (mode === "present") {
            if (!existsSync(abs)) out.push({ key, rel, state: "absent" });
            continue;
        }
        const state = existsSync(abs)
            ? classifyCanonBody(readFileSync(abs, "utf8"))
            : "absent";
        if (state !== "content") out.push({ key, rel, state });
    }
    return out;
}

/**
 * The dependency-citation source (BH.B4b-content fold-obligation 1). The
 * doc-consistency dep-rot arm re-homes onto docs/canon/dependencies.md and reads
 * its dependency list AS A MARKDOWN TABLE — `| \`pkg\` ^range | role |` rows — so a
 * PROSE-only dependencies.md (marker stripped + >200 chars, NO table) would green
 * auditCanonHomes("content") WHILE this arm parses 0 deps and stays permanently
 * vacuous. citedDeps() is the parser: it returns [{ pkg, range }] for every table
 * row whose first cell is a backtick-wrapped package. A 0-row result over a table-
 * bearing home means the dep list is not in the binding TABLE form.
 *
 * @param {string} [src] — the dependencies.md body (defaults to the on-disk home).
 */
export function citedDeps(src = readCanon("dependencies", "soft")) {
    const deps = [];
    for (const line of src.split("\n")) {
        // A table data row: | `pkg` ^range | role |  — first cell backtick-wrapped.
        const m = line.match(/^\s*\|\s*`([^`]+)`\s*([^|]*?)\s*\|/);
        if (!m) continue;
        const pkg = m[1].trim();
        const range = (m[2] || "").trim();
        // Skip the "| `Package` | Role |" header if it were backticked — a real dep
        // pkg carries a `@scope/name` or bare-name, never the literal "Package".
        if (!pkg || /^package$/i.test(pkg)) continue;
        deps.push({ pkg, range });
    }
    return deps;
}
