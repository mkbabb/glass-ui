// proof:consumer-staleness — AX.W62 Gate 3: the REVERSE cross-repo staleness gate.
//
// `proof:consumers:static` walks the siblings for glass-ui ROOT-SURFACE drift
// (what the barrel exports + namespace creep). It has no clause for the OPPOSITE
// failure: a consumer importing a symbol glass-ui DELETED, or a subpath glass-ui
// RETIRED. That is the W53 class — the tabs unification deleted Bouncy*/
// UnderlineTabs/ResponsiveTabs + the /responsive-tabs subpath, and several
// speedtest files still import the dropped family. On the next bump three are a
// hard module-resolution failure and three are a silent `undefined` render.
//
// This gate is the forcing function: for every PRESENT consumer sibling, each
// `import … from "@mkbabb/glass-ui[/sub]"` must resolve against glass-ui's
// CURRENT published surface —
//   (A) the SUBPATH must be a published `exports` key (retired subpath → RED),
//   (B) each NAMED import must be in that subpath's actual export set, parsed
//       from the flat `dist/<sub>.d.ts` (deleted symbol → RED).
// Absent siblings → graceful skip (constellation.resolveSibling, registry-default
// world). The named arm needs a built dist; on a never-built tree it soft-skips
// the (B) clause with a loud notice (the (A) clause always runs). `build` is a
// CI/release predecessor, so the full bite lands there.
//
// Born-RED at HEAD against the speedtest files. Bite: a consumer importing a
// deleted symbol / a retired subpath → RED; bump the consumer (or retire the
// stale import) → green.
//
// AXIS BOUNDARY (BC.W-FOURIER-DECIDES #12 — extend-in-place record). This gate is
// the JS-import-resolution axis ONLY — single-axis on purpose. The DISTINCT,
// SILENT failure of a retired CSS tier-class STRING in consumer MARKUP
// (`class="cartoon-card"`/`class="glass-subtle"` → renders zero glass, no error)
// is the SIBLING gate `proof:tier-class-staleness`'s axis (scripts/proof-tier-
// class-staleness.mjs), which REUSES this gate's constellation walk (CONSUMERS /
// resolveSibling / skipSibling) for the SAME present-consumer set. The two gates
// are jointly complete over the staleness surface (JS-import here · CSS-class
// there) and never re-fork the sibling-resolution machinery. The producer-side
// CSS-class diagnostic + the consumer PostCSS lint recipe
// (docs/consumer-evidence/consumer-tier-class-lint.md) close the mechanism gap
// that let `cartoon-card` render flat silently for an era.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import {
    ROOT,
    CONSUMERS,
    resolveSibling,
    skipSibling,
} from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:consumer-staleness";
const SPEC_PREFIX = "@mkbabb/glass-ui";
// AY.W-CONSUMER: the {receiver, close-gate} ledger. A DEFERRED row with a NON-EMPTY
// {receiver-wave, close-gate} terminal downgrades a matching stale-import violation
// from RED to an ALLOWED-WITH-TERMINAL notice (the deferral path — the clean break
// is the canon, so glass-ui does NOT re-introduce the deleted symbol; the ledger is
// the seam recording who discharges each stale import and when). An UN-ledgered
// violation, or a DEFERRED row with an empty terminal, stays RED (bite preserved).
const LEDGER = join(ROOT, "docs/tranches/AY/audit/W-CONSUMER-ledger.md");
const SRC_EXT = /\.(vue|ts|tsx|js|mjs|jsx)$/;
const SKIP_DIRS = new Set(["node_modules", "dist", ".git", ".cache", ".nuxt", "coverage"]);

// ── glass-ui's CURRENT surface (from its own package.json exports) ────────────
const PKG = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
const exportsMap = PKG.exports ?? {};

// specifier → dts path (null when the entry has no typed surface, e.g. CSS/fonts)
const validSpecifiers = new Map();
const wildcardPrefixes = [];
for (const [key, val] of Object.entries(exportsMap)) {
    const sub = key === "." ? "" : key.replace(/^\.\//, "/");
    const spec = SPEC_PREFIX + sub;
    if (key.includes("*")) {
        wildcardPrefixes.push(SPEC_PREFIX + sub.replace(/\*.*$/, ""));
        continue;
    }
    let dts = null;
    if (val && typeof val === "object" && typeof val.types === "string") {
        dts = join(ROOT, val.types);
    }
    validSpecifiers.set(spec, dts);
}

function specifierValid(spec) {
    if (validSpecifiers.has(spec)) return true;
    return wildcardPrefixes.some((p) => spec.startsWith(p));
}

// ── The {receiver, close-gate} ledger (AY.W-CONSUMER) ─────────────────────────
// Parse the DEFERRED rows from the W-CONSUMER ledger between the MACHINE markers.
// Each row: repo | file | symbol | subpath | disposition | receiver-wave | close-gate | landed-SHA.
// A DEFERRED row with BOTH a non-empty receiver-wave AND close-gate becomes an
// allowed terminal keyed `${repo}|${file}|${symbol}`. Returns {allowed:Set, malformed:[]}
// where `malformed` are DEFERRED rows with an empty terminal (the gate refuses them).
function loadLedgerTerminals() {
    const allowed = new Set();
    const malformed = [];
    if (!existsSync(LEDGER)) return { allowed, malformed };
    const md = readFileSync(LEDGER, "utf8");
    const begin = md.indexOf("W-CONSUMER-LEDGER-MACHINE-BEGIN");
    const end = md.indexOf("W-CONSUMER-LEDGER-MACHINE-END");
    if (begin === -1 || end === -1) return { allowed, malformed };
    const block = md.slice(begin, end);
    for (const ln of block.split("\n")) {
        if (!ln.trimStart().startsWith("|")) continue;
        const cells = ln
            .split("|")
            .map((c) => c.trim())
            .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        if (cells.length < 7) continue;
        const [repo, file, symbol, , disposition, receiverWave, closeGate] = cells;
        if (disposition !== "DEFERRED") continue; // header/separator/MIGRATED rows ignored
        const key = `${repo}|${file}|${symbol}`;
        if (receiverWave && closeGate) allowed.add(key);
        else malformed.push({ repo, file, symbol, receiverWave, closeGate });
    }
    return { allowed, malformed };
}

// The dist d.ts is a thin barrel that re-exports via `export * from "./…"`, so
// the export set must be resolved RECURSIVELY down the re-export chain (a direct
// scan misses every re-exported name → false positives). Bounded by a visited
// set; returns the UNION of direct decls + named re-exports + recursed `export *`.
function resolveChildDts(fromDtsPath, rel) {
    const base = resolve(dirname(fromDtsPath), rel);
    for (const cand of [`${base}.d.ts`, join(base, "index.d.ts")]) {
        if (existsSync(cand)) return cand;
    }
    return null;
}

const dtsCache = new Map();
function exportedNames(dtsPath, seen = new Set()) {
    if (!dtsPath || !existsSync(dtsPath)) return null; // surface unknown (no build)
    if (seen.size === 0 && dtsCache.has(dtsPath)) return dtsCache.get(dtsPath);
    if (seen.has(dtsPath)) return new Set();
    seen.add(dtsPath);
    const src = readFileSync(dtsPath, "utf8");
    const names = new Set();
    for (const m of src.matchAll(
        /export\s+declare\s+(?:const|let|var|function|class|(?:abstract\s+)?class)\s+([A-Za-z_$][\w$]*)/g,
    ))
        names.add(m[1]);
    for (const m of src.matchAll(/export\s+(?:type|interface|enum)\s+([A-Za-z_$][\w$]*)/g))
        names.add(m[1]);
    // export [type] { A, B as C } [from "./…"]  — named (re-)exports (the `type`
    // modifier sits between `export` and `{`, e.g. `export type { CarouselApi }`).
    for (const m of src.matchAll(
        /export\s+(?:type\s+)?\{([^}]*)\}(?:\s*from\s*["'][^"']+["'])?/g,
    )) {
        for (const part of m[1].split(",")) {
            const seg = part.trim().replace(/^type\s+/, "");
            if (!seg) continue;
            const asMatch = seg.match(/\bas\s+([A-Za-z_$][\w$]*)\s*$/);
            names.add(asMatch ? asMatch[1] : seg.split(/\s+/)[0]);
        }
    }
    // export * from "./…"  — recurse into the re-export target
    for (const m of src.matchAll(/export\s*\*\s*from\s*["']([^"']+)["']/g)) {
        const child = resolveChildDts(dtsPath, m[1]);
        const childNames = child ? exportedNames(child, seen) : null;
        if (childNames) for (const n of childNames) names.add(n);
    }
    if (/export\s+default\b/.test(src)) names.add("default");
    if (seen.size <= 1) dtsCache.set(dtsPath, names);
    return names;
}

// ── Parse a source file for glass-ui imports ──────────────────────────────────
// Match EVERY `import [type] <clause> from "<spec>"` (any specifier) so the lazy
// clause never spans across a preceding statement to reach a later glass-ui
// `from` — then filter to the glass-ui specifiers. Bare side-effect imports
// (`import "spec"`, no `from`) are matched separately.
const IMPORT_RE = /import\s+(?:type\s+)?([\s\S]*?)\s+from\s+["']([^"']+)["']/g;
const BARE_RE = /import\s+["'](@mkbabb\/glass-ui[^"']*)["']/g;

/** The ORIGINAL (imported) member names in a clause — default/namespace skipped. */
function clauseMembers(clause) {
    const out = [];
    const braced = clause.match(/\{([\s\S]*)\}/);
    if (!braced) return out; // default or `* as NS` — no named member to validate
    for (const part of braced[1].split(",")) {
        let seg = part.trim().replace(/^type\s+/, "");
        if (!seg) continue;
        // `Orig as Local` → validate Orig (the exported name)
        out.push(seg.split(/\s+as\s+/)[0].trim());
    }
    return out;
}

function walk(dir, out = []) {
    let entries;
    try {
        entries = readdirSync(dir, { withFileTypes: true });
    } catch {
        return out;
    }
    for (const e of entries) {
        if (e.name.startsWith(".") && e.name !== ".") continue;
        const p = join(dir, e.name);
        if (e.isDirectory()) {
            if (SKIP_DIRS.has(e.name)) continue;
            walk(p, out);
        } else if (SRC_EXT.test(e.name)) {
            out.push(p);
        }
    }
    return out;
}

// ── Walk every present consumer sibling ───────────────────────────────────────
const violations = []; // {repo, file, line, spec, kind, name?}
let distMissing = false;
let scannedFiles = 0;
const checkedRepos = [];
const skippedRepos = [];

for (const consumer of CONSUMERS) {
    if (consumer.self) continue; // self-imports of the published name are out of scope
    const r = resolveSibling(consumer);
    if (!r.present) {
        skipSibling("proof:consumer-staleness", consumer);
        skippedRepos.push(consumer.id);
        continue;
    }
    checkedRepos.push(consumer.id);
    const files = [];
    for (const root of consumer.roots ?? []) walk(root, files);
    for (const file of files) {
        const text = readFileSync(file, "utf8");
        if (!text.includes(SPEC_PREFIX)) continue;
        scannedFiles++;
        const lineAt = (idx) => text.slice(0, idx).split("\n").length;

        IMPORT_RE.lastIndex = 0;
        for (const m of text.matchAll(IMPORT_RE)) {
            const clause = m[1];
            const spec = m[2];
            if (!spec.startsWith(SPEC_PREFIX)) continue; // not a glass-ui import
            const line = lineAt(m.index);
            if (!specifierValid(spec)) {
                violations.push({ repo: consumer.id, file, line, spec, kind: "retired-subpath" });
                continue;
            }
            const dts = validSpecifiers.get(spec) ?? null;
            const surface = exportedNames(dts);
            if (surface === null) {
                distMissing = true;
                continue; // (B) unverifiable without a built dist — (A) already ran
            }
            for (const name of clauseMembers(clause)) {
                if (!surface.has(name)) {
                    violations.push({
                        repo: consumer.id,
                        file,
                        line,
                        spec,
                        kind: "deleted-symbol",
                        name,
                    });
                }
            }
        }

        BARE_RE.lastIndex = 0;
        for (const m of text.matchAll(BARE_RE)) {
            const spec = m[1];
            if (!specifierValid(spec)) {
                violations.push({
                    repo: consumer.id,
                    file,
                    line: lineAt(m.index),
                    spec,
                    kind: "retired-subpath",
                });
            }
        }
    }
}

// ── Ledger-allowlist partition (AY.W-CONSUMER) ────────────────────────────────
// A stale-import violation whose {repo, file (rel form), symbol} matches a DEFERRED
// ledger row with a non-empty terminal is downgraded RED → allowed-with-terminal.
const rel = (p) => p.replace(ROOT + "/", "").replace(/.*\/Programming\//, "../");
const { allowed: ledgerAllowed, malformed: ledgerMalformed } = loadLedgerTerminals();
const hardViolations = [];
const allowedWithTerminal = [];
for (const v of violations) {
    const key = `${v.repo}|${rel(v.file)}|${v.name ?? ""}`;
    if (v.kind === "deleted-symbol" && ledgerAllowed.has(key)) allowedWithTerminal.push(v);
    else hardViolations.push(v);
}

// ── Report ────────────────────────────────────────────────────────────────────
console.log("proof:consumer-staleness — the reverse cross-repo staleness gate (AX.W62 / AY.W-CONSUMER)");
console.log(`  consumers checked     : ${checkedRepos.join(", ") || "(none present)"}`);
if (skippedRepos.length)
    console.log(`  siblings skipped      : ${skippedRepos.join(", ")} (registry-default; CI-expected)`);
console.log(`  files scanned         : ${scannedFiles}`);
if (distMissing)
    console.log(
        "  NOTE: dist d.ts absent — the (B) deleted-symbol arm soft-skipped; run `npm run build` for the full bite (the (A) retired-subpath arm ran).",
    );
console.log(`  raw stale imports     : ${violations.length}`);
console.log(`  allowed-with-terminal : ${allowedWithTerminal.length} (DEFERRED ledger rows, W-CONSUMER)`);
console.log(`  malformed ledger rows : ${ledgerMalformed.length}`);
console.log(`  violations            : ${hardViolations.length}`);

for (const v of allowedWithTerminal) {
    const where = `${rel(v.file)}:${v.line}`;
    console.log(`  ALLOWED-WITH-TERMINAL  ${where}  { ${v.name} } from "${v.spec}" — DEFERRED in W-CONSUMER-ledger.md (receiver-wave + close-gate recorded)`);
}
for (const m of ledgerMalformed)
    console.error(`  LEDGER MALFORMED  ${m.repo} ${m.file} { ${m.symbol} } — DEFERRED with an empty {receiver-wave, close-gate} terminal (refused — name the exact consumer-tranche wave + close-gate).`);
for (const v of hardViolations) {
    const where = `${rel(v.file)}:${v.line}`;
    if (v.kind === "retired-subpath")
        console.error(`  RETIRED SUBPATH  ${where}  imports "${v.spec}" (no such export entry)`);
    else
        console.error(`  DELETED SYMBOL   ${where}  imports { ${v.name} } from "${v.spec}" (not on the current surface; UN-ledgered — migrate or add a DEFERRED row with a terminal)`);
}

const pass = hardViolations.length === 0 && ledgerMalformed.length === 0;
const ARTIFACT = gateArtifactPath(
    "GATE_CONSUMER_STALENESS_OUT",
    "AX-consumer-staleness",
);
const relViol = (v) => ({
    repo: v.repo,
    file: rel(v.file),
    line: v.line,
    spec: v.spec,
    kind: v.kind,
    name: v.name ?? null,
});
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:consumer-staleness",
    command: COMMAND,
    consumersChecked: checkedRepos,
    siblingsSkipped: skippedRepos,
    filesScanned: scannedFiles,
    distMissing,
    rawStaleImports: violations.length,
    allowedWithTerminal: allowedWithTerminal.map(relViol),
    ledgerMalformed,
    violations: hardViolations.map(relViol),
});

if (!pass) {
    if (ledgerMalformed.length)
        console.error(
            `\n[proof:consumer-staleness] ${ledgerMalformed.length} DEFERRED ledger row(s) with an empty terminal — a deferral must name an exact consumer-tranche receiver-wave + close-gate, never empty.`,
        );
    if (hardViolations.length)
        console.error(
            `\n[proof:consumer-staleness] ${hardViolations.length} UN-ledgered stale glass-ui import(s) across the constellation — a consumer is armed to break on bump. Migrate to the current surface or add a DEFERRED row with a {receiver-wave, close-gate} terminal to W-CONSUMER-ledger.md.`,
        );
    process.exit(1);
}
if (allowedWithTerminal.length)
    console.log(
        `\n[proof:consumer-staleness] every present-consumer glass-ui import either resolves against the current surface OR is a DEFERRED ledger row with a {receiver-wave, close-gate} terminal (${allowedWithTerminal.length} deferred).`,
    );
else
    console.log(`\n[proof:consumer-staleness] every present-consumer glass-ui import resolves against the current surface.`);
console.log(
    "[proof:consumer-staleness] axis boundary (BC.W-FOURIER-DECIDES #12): this gate is the JS-import-resolution axis; the CSS-tier-class-staleness axis (a retired `class=\"cartoon-card\"`/`class=\"glass-subtle\"` in consumer markup) is the sibling gate `proof:tier-class-staleness` (reuses this gate's constellation walk).",
);
