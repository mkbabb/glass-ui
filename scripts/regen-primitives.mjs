// scripts/regen-primitives.mjs — the GENERATED canonical-primitives register emitter
// (BH.B4-canon · ATLAS-M item 7 · the WG-E·PRIMITIVES-REGISTER root artifact).
// ============================================================================
// Publishes `docs/canon/primitives.json` — the machine-readable canonical-primitives
// register, GENERATED beside `structure.md`/`dependencies.md` from the EXPORT MANIFEST
// (`scripts/lib/subpath-policy.mjs` — the SAME single-source the package.json exports
// regen feeds) + the CANON DOCS (`scripts/lib/canon-doc.mjs` `CANON_HOMES`). It is the
// ROOT registry atlas's G-M11 "no hand-rolled substitute where a glass-ui primitive
// exists" gate references — never a consumer copy (co-ownership: atlas M.W0-A.6 authors
// the consume-canon; glass-ui owns THIS artifact). Atlas builds its viz-subset MANIFEST
// on top of this root register.
//
// DERIVE-NOT-HAND-AUTHOR — the register is regenerated from disk; the committed file is
// asserted byte-fresh by proof:canon-homes (the (R) REGISTER-FRESH clause). A subpath
// add / an export rename that never re-ran `node scripts/regen-primitives.mjs --write`
// REDs, so the register CANNOT drift from the real export surface. It carries NO
// timestamp (a timestamp would make committed != regen every run) — the payload is
// PURE derived data, deterministic across runs (subpaths + exports sorted).
//
// CLI:
//   (default) — print the generated register to stdout.
//   --write   — write docs/canon/primitives.json.
//   --check   — compare the on-disk register to the freshly-generated form; exit 1 on
//               drift (the parity self-lock, mirroring regen-structure --check).
// ============================================================================
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    REPO_ROOT,
    readTree,
    buildEntrySet,
    CURATED,
    COMPOSABLE_SUBPATHS,
    CSS_FONT_EXPORTS,
} from "./lib/subpath-policy.mjs";
import { CANON_HOMES } from "./lib/canon-doc.mjs";

const ROOT = REPO_ROOT ?? resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_REL = "docs/canon/primitives.json";
const OUT_ABS = resolve(ROOT, OUT_REL);
const PKG = "@mkbabb/glass-ui";

// ── The export extractor — named exports of a barrel, following `export * from`
// into the referenced .ts/index.ts one leaf at a time (bounded by `seen`, so a
// wildcard cycle terminates + a .vue leaf is never entered — its `default` is
// already captured at the `export { default as X } from "./X.vue"` barrel line).
export function namedExports(absPath, seen = new Set()) {
    if (seen.has(absPath) || !existsSync(absPath)) return [];
    seen.add(absPath);
    // Strip block + line comments so a commented-out `export …` never counts.
    const code = readFileSync(absPath, "utf8")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
    const names = new Set();

    // export [type] { A, B as C, type D } [from "…"]
    for (const m of code.matchAll(/export\s+(?:type\s+)?\{([^}]*)\}/g)) {
        for (let part of m[1].split(",")) {
            part = part.trim().replace(/^type\s+/, "");
            if (!part) continue;
            const asMatch = part.match(/\bas\s+([A-Za-z_$][\w$]*)/);
            const name = asMatch ? asMatch[1] : part.split(/\s+/)[0];
            if (name && name !== "default") names.add(name);
        }
    }
    // export [declare] [async] const|let|var|function[*]|class|type|interface|enum NAME
    for (const m of code.matchAll(
        /export\s+(?:declare\s+)?(?:async\s+)?(?:const|let|var|function\*?|class|abstract\s+class|type|interface|enum)\s+([A-Za-z_$][\w$]*)/g,
    )) {
        names.add(m[1]);
    }
    // export [type] * from "./rel" — recurse one leaf deeper (resolve .ts/index.ts).
    for (const m of code.matchAll(/export\s+(?:type\s+)?\*\s+from\s+["']([^"']+)["']/g)) {
        const base = resolve(dirname(absPath), m[1]);
        const cand = [
            `${base}.ts`,
            `${base}.mts`,
            `${base}.tsx`,
            resolve(base, "index.ts"),
            resolve(base, "index.mts"),
        ];
        const found = cand.find(existsSync);
        if (found) for (const n of namedExports(found, seen)) names.add(n);
    }
    return [...names];
}

/** The tier label for an entry name (the export-manifest classification). */
function tierFor(name, publishComponents) {
    if (name === "index") return "root-barrel";
    if (name in COMPOSABLE_SUBPATHS) return "composable";
    if (name in CURATED) return "curated";
    if (publishComponents.includes(name)) return "component";
    return "unknown";
}

/** The canon-home rel for a primitive family (the colocated README, from the
 *  canon-doc CANON_HOMES map), or null. This is the CANON-DOCS derivation leg. */
function canonHomeFor(name) {
    const rel = CANON_HOMES[`component:${name}`];
    return rel && existsSync(resolve(ROOT, rel)) ? rel : null;
}

/** Build the register OBJECT from disk (the export manifest + canon docs). */
export function buildPrimitivesRegister() {
    const tree = readTree({ repoRoot: ROOT });
    const { entries, publishComponents } = buildEntrySet(tree);

    const primitives = Object.entries(entries)
        .map(([name, rel]) => {
            const abs = resolve(ROOT, rel);
            const specifier = name === "index" ? PKG : `${PKG}/${name}`;
            return {
                specifier,
                name,
                tier: tierFor(name, publishComponents),
                source: rel,
                canonHome: canonHomeFor(name),
                exports: namedExports(abs).sort((a, b) => a.localeCompare(b)),
            };
        })
        .sort((a, b) => a.specifier.localeCompare(b.specifier));

    const assets = Object.keys(CSS_FONT_EXPORTS).sort();

    return {
        _generator: "node scripts/regen-primitives.mjs --write",
        _derivedFrom: [
            "scripts/lib/subpath-policy.mjs (the published-subpath export manifest)",
            "scripts/lib/canon-doc.mjs CANON_HOMES (the canon-doc homes)",
        ],
        _note:
            "Machine-readable canonical-primitives register — the ROOT registry atlas G-M11 " +
            "(no-hand-rolled-substitute-where-a-glass-ui-primitive-exists) references. Co-ownership: " +
            "atlas M.W0-A.6 authors the consume-canon; glass-ui owns this artifact. DERIVE-not-hand-author " +
            "— regenerate via the generator, never hand-edit; proof:canon-homes asserts committed==regen. " +
            "BH.B4-canon / ATLAS-M item 7 / the WG-E·PRIMITIVES-REGISTER root.",
        package: PKG,
        subpathCount: primitives.length,
        primitiveCount: primitives.reduce((n, p) => n + p.exports.length, 0),
        assets,
        primitives,
    };
}

/** The generated register as a stable, trailing-newline JSON string. */
export function generatePrimitivesRegister() {
    return `${JSON.stringify(buildPrimitivesRegister(), null, 2)}\n`;
}

/** The re-home seam — proof:canon-homes imports this to compare the committed
 *  register to the freshly-generated form WITHOUT the CLI side effects. */
export function primitivesFreshness() {
    const generated = generatePrimitivesRegister();
    const committed = existsSync(OUT_ABS) ? readFileSync(OUT_ABS, "utf8") : null;
    return { fresh: committed === generated, committed, generated, outRel: OUT_REL };
}

function run() {
    const args = new Set(process.argv.slice(2));
    if (args.has("--write")) {
        writeFileSync(OUT_ABS, generatePrimitivesRegister());
        console.log(`regen-primitives --write — wrote ${OUT_REL}`);
        return;
    }
    if (args.has("--check")) {
        const fr = primitivesFreshness();
        if (fr.committed === null) {
            console.error(`regen-primitives --check — ${OUT_REL} is ABSENT (run --write).`);
            process.exit(1);
        }
        if (!fr.fresh) {
            console.error(
                `regen-primitives --check — ${OUT_REL} is STALE (a subpath / export drifted from disk). Run: node scripts/regen-primitives.mjs --write`,
            );
            process.exit(1);
        }
        console.log(`regen-primitives --check — ${OUT_REL} is FRESH (matches disk).`);
        return;
    }
    process.stdout.write(generatePrimitivesRegister());
}

void relative; // parity with sibling generators' path surface
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
