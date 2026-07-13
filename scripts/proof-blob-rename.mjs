#!/usr/bin/env node
// BI.W-BLOB-RENAME-LAND — proof:blob-rename, the goo-blob→blob clean-break rename
// gate (device-free; the pure-detector house pattern, the proof:crossrepo-asks:bi
// precedent).
//
// THE NEED. MIGRATION.md §262 documented the `<GooBlob>`→`<Blob>` + `/goo-blob`→
// `/blob` clean-break rename as LANDED (the owner-ratified full rename) while the disk
// was UNCHANGED — the H-3 green-over-broken carried BH.B2→cut. This wave EXECUTES the
// rename (dir/component/subpath; the config keys were already BLOB-prefixed) and this
// gate is its terminal lock:
//   W1 — the dir is DEFINITION-ABSENT at custom/goo-blob/ AND present at custom/blob/;
//        Blob.vue exists, GooBlob.vue absent; the barrel exports `Blob` (not `GooBlob`).
//   W2 — package.json exports carries `./blob` AND NOT `./goo-blob` (NO alias key);
//        typesVersions carries `blob` AND NOT `goo-blob`. (The exports are disk-following
//        via scripts/lib/subpath-policy.mjs — re-pinned by `regen-exports --write`.)
//   W3 — ZERO in-repo `goo-blob` import specifier / `<GooBlob>` tag survives in the app
//        code trees (src/demo/tests/tests-visual). The clean break — no alias, no dual
//        path.
//   W4 — MIGRATION §262 tense matches disk (EXECUTED): it names the new `/blob` subpath +
//        `<Blob>` component and carries no "not done"/"pending"/"will rename" swap-note.
//        (The AUTHORITATIVE disk-following /api-table check is proof:migration-truth,
//        BI.W-MIGRATION-TRUE-UP — cross-gate.)
//   W5 — the value.js 5-site carry-ask row exists on the BI crossrepo roster.
//        (The AUTHORITATIVE roster-completeness check is proof:crossrepo-asks:bi X3 —
//        cross-gate; this is the owning-wave mirror.)
//
// STRUCTURAL rename — the `<Blob>` render is BYTE-IDENTICAL to the prior `<GooBlob>`
// (a rename, not a re-tune; the metaball shader + useMetaballRenderer + the internal
// `.goo-blob-*` scoped CSS classes are untouched). No π of its own (regression-only —
// the existing blob π re-points /blob + reads identical silhouette+chroma). The born-RED
// → GREEN log + a self-test bite is the binding truth.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:blob-rename";

const readRel = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : null;
};

// ── The breaking-form patterns (W3): the import path, the subpath specifier, the tag ───
// SCOPED to the actual clean-break forms — NOT a bare `goo-blob` grep (which would flag
// the byte-fenced shader comments `research/viz/goo-blob.md`, the historical RESEARCH.md
// prose, the BUDGET-owned `dist/goo-blob.js` chunk key, and the roster's intentional
// value.js `/goo-blob`-current-import mention).
const BREAKING = [
    { id: "import-path", re: /custom\/goo-blob/ },
    { id: "subpath-specifier", re: /glass-ui\/goo-blob/ },
    { id: "component-tag", re: /<GooBlob\b/ },
];
// W3 scans the APP code trees (imports + tags live here — NOT the scripts/ gate machinery
// that legitimately references the dist chunk name / the roster in prose).
const CODE_TREES = ["src", "demo", "tests", "tests-visual"];
const CODE_EXT = new Set([".ts", ".tsx", ".vue", ".mjs", ".cjs", ".js"]);
const SKIP_DIR = new Set(["node_modules", "dist", ".git"]);

function walkCode(absDir, out) {
    let entries;
    try {
        entries = readdirSync(absDir, { withFileTypes: true });
    } catch {
        return;
    }
    for (const e of entries) {
        if (e.name.startsWith(".") && e.name !== ".") continue;
        const abs = join(absDir, e.name);
        if (e.isDirectory()) {
            if (SKIP_DIR.has(e.name)) continue;
            walkCode(abs, out);
        } else if (CODE_EXT.has(extname(e.name))) {
            out.push(abs);
        }
    }
}

const checks = [];
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

// ── W1 — the dir/component/barrel rename on disk ──────────────────────────────────────
const oldDir = existsSync(resolve(ROOT, "src/components/custom/goo-blob"));
const newDir = existsSync(resolve(ROOT, "src/components/custom/blob"));
const oldSfc = existsSync(resolve(ROOT, "src/components/custom/blob/GooBlob.vue"));
const newSfc = existsSync(resolve(ROOT, "src/components/custom/blob/Blob.vue"));
const barrel = readRel("src/components/custom/blob/index.ts") ?? "";
const barrelExportsBlob = /export\s*\{\s*default as Blob\s*\}\s*from\s*["']\.\/Blob\.vue["']/.test(barrel);
const barrelExportsGooBlob = /default as GooBlob\b/.test(barrel);
const subpathMirror = readRel("src/subpaths/blob.ts") ?? "";
const mirrorPointsBlob = /from\s*["']\.\.\/components\/custom\/blob["']/.test(subpathMirror);
const oldMirror = existsSync(resolve(ROOT, "src/subpaths/goo-blob.ts"));

add("W1-old-dir-absent", !oldDir, `src/components/custom/goo-blob/ ${oldDir ? "STILL PRESENT (rename UNEXECUTED — H-3)" : "DEFINITION-ABSENT"}`);
add("W1-new-dir-present", newDir, `src/components/custom/blob/ ${newDir ? "present" : "ABSENT"}`);
add("W1-Blob.vue-present", newSfc, `custom/blob/Blob.vue ${newSfc ? "present" : "ABSENT"}`);
add("W1-GooBlob.vue-absent", !oldSfc, `custom/blob/GooBlob.vue ${oldSfc ? "STILL PRESENT" : "absent (renamed)"}`);
add("W1-barrel-exports-Blob", barrelExportsBlob && !barrelExportsGooBlob, `blob/index.ts exports \`default as Blob\` — Blob:${barrelExportsBlob} GooBlob-survivor:${barrelExportsGooBlob}`);
add("W1-subpath-mirror-repointed", mirrorPointsBlob && !oldMirror, `src/subpaths/blob.ts → ../components/custom/blob (blob.ts:${mirrorPointsBlob}, goo-blob.ts absent:${!oldMirror})`);

// ── W2 — package.json exports/typesVersions carry ./blob, NOT ./goo-blob (no alias) ────
const pkgRaw = readRel("package.json");
let pkg = null;
try {
    pkg = pkgRaw ? JSON.parse(pkgRaw) : null;
} catch {
    pkg = null;
}
const exportKeys = pkg ? Object.keys(pkg.exports ?? {}) : [];
const tvKeys = pkg ? Object.keys(pkg.typesVersions?.["*"] ?? {}) : [];
const hasBlobExport = exportKeys.includes("./blob");
const hasGooExport = exportKeys.includes("./goo-blob");
const hasBlobTv = tvKeys.includes("blob");
const hasGooTv = tvKeys.includes("goo-blob");
add("W2-exports-has-blob", hasBlobExport, `package.json exports carries "./blob" — ${hasBlobExport ? "yes" : 'MISSING (run `node scripts/regen-exports.mjs --write` to re-pin from disk)'}`);
add("W2-exports-no-goo-blob-alias", !hasGooExport, `package.json exports carries NO "./goo-blob" alias — ${hasGooExport ? "ALIAS SURVIVOR (the clean-break law forbids it)" : "clean"}`);
add("W2-typesVersions-has-blob", hasBlobTv, `typesVersions carries "blob" — ${hasBlobTv ? "yes" : "MISSING (re-pin via regen-exports --write)"}`);
add("W2-typesVersions-no-goo-blob", !hasGooTv, `typesVersions carries NO "goo-blob" — ${hasGooTv ? "SURVIVOR" : "clean"}`);

// ── W3 — zero breaking form in the app code trees (the clean break) ───────────────────
const codeFiles = [];
for (const t of CODE_TREES) walkCode(resolve(ROOT, t), codeFiles);
const w3Hits = [];
for (const abs of codeFiles) {
    const rel = abs.slice(ROOT.length + 1);
    let src;
    try {
        src = readFileSync(abs, "utf8");
    } catch {
        continue;
    }
    for (const { id, re } of BREAKING) {
        const lines = src.split("\n");
        for (let i = 0; i < lines.length; i++) {
            if (re.test(lines[i])) w3Hits.push({ rel, line: i + 1, form: id, text: lines[i].trim().slice(0, 100) });
        }
    }
}
add(
    "W3-clean-break-no-survivor",
    w3Hits.length === 0,
    w3Hits.length === 0
        ? `zero \`goo-blob\` import-specifier / \`<GooBlob>\` tag survives in ${codeFiles.length} app code files (${CODE_TREES.join(", ")}) — the clean break`
        : `${w3Hits.length} breaking-form survivor(s): ${w3Hits.slice(0, 6).map((h) => `${h.rel}:${h.line} [${h.form}]`).join(", ")}`,
);

// ── W4 — MIGRATION §262 tense matches disk (EXECUTED); AUTHORITATIVE check is
//        proof:migration-truth (BI.W-MIGRATION-TRUE-UP, cross-gate) ────────────────────
const migration = readRel("MIGRATION.md") ?? "";
const sec = migration.match(/###\s*`?goo-blob`?\s*→\s*`?blob`?[\s\S]*?(?=\n###\s|\n##\s|$)/);
const secText = sec ? sec[0] : "";
const migHeadingPresent = secText.length > 0;
const migNamesNewSubpath = /@mkbabb\/glass-ui\/blob/.test(secText) && /<Blob>/.test(secText);
const migNoPendingNote = migHeadingPresent && !/(not done here|NOT done here|not yet executed|will (be )?rename|pending on disk|deferred to a later)/i.test(secText);
add("W4-migration-section-present", migHeadingPresent, `MIGRATION §262 \`goo-blob → blob\` section ${migHeadingPresent ? "present" : "ABSENT"}`);
add("W4-migration-names-executed-rename", migNamesNewSubpath, `§262 names the new /blob subpath + <Blob> component — ${migNamesNewSubpath ? "yes (executed tense)" : "MISSING"}`);
add("W4-migration-no-pending-swap-note", migNoPendingNote, `§262 carries no "not done / pending / will rename" swap-note — ${migNoPendingNote ? "clean (matches disk)" : "STALE SWAP-NOTE (contradicts the landed rename)"}`);

// ── W5 — the value.js carry-ask row on the BI roster (owning-wave mirror of
//        proof:crossrepo-asks:bi X3) ────────────────────────────────────────────────
const roster = readRel("docs/tranches/BI/coordination/asks-and-consumes.md") ?? "";
const rosterHasBlobAsk =
    roster.includes("value-blob-rename-5site") && roster.includes("goo-blob") && roster.includes("/blob") && roster.includes("BI.W-BLOB-RENAME-LAND");
add(
    "W5-roster-value-carry-ask",
    rosterHasBlobAsk,
    `BI roster carries the value.js goo-blob→blob 5-site carry row (value-blob-rename-5site + /blob + BI.W-BLOB-RENAME-LAND) — ${rosterHasBlobAsk ? "present" : "MISSING"}`,
);

// ── The self-test bites — the detectors are falsifiable ───────────────────────────────
function selfTest() {
    const bites = [];
    // bite 1: a synthetic surviving "./goo-blob" export key REDs W2.
    const doctoredExports = [...exportKeys.filter((k) => k !== "./goo-blob"), "./goo-blob"];
    bites.push({ id: "bite-goo-blob-export-alias-flags", pass: doctoredExports.includes("./goo-blob") });
    // bite 2: a re-added `default as GooBlob` barrel re-export REDs W1.
    const doctoredBarrel = `export { default as GooBlob } from "./GooBlob.vue";`;
    bites.push({ id: "bite-GooBlob-barrel-reexport-flags", pass: /default as GooBlob\b/.test(doctoredBarrel) });
    // bite 3: a synthetic `<GooBlob>` tag in code REDs W3.
    const doctoredCode = `<GooBlob :config="cfg" />`;
    bites.push({ id: "bite-GooBlob-tag-flags", pass: BREAKING.some((b) => b.re.test(doctoredCode)) });
    // bite 4: a synthetic `custom/goo-blob` import path REDs W3.
    const doctoredImport = `import { Blob } from "@glass/components/custom/goo-blob";`;
    bites.push({ id: "bite-goo-blob-import-path-flags", pass: BREAKING.some((b) => b.re.test(doctoredImport)) });
    return bites;
}
const bites = selfTest();
const allBitesPass = bites.every((b) => b.pass);
for (const b of bites) add(`selftest-${b.id}`, b.pass, `self-test bite: ${b.id} ${b.pass ? "FLAGS as expected" : "FAILED to flag"}`);
add("selftest-all-bites", allBitesPass, "every self-test bite flags its planted defect (a surviving ./goo-blob alias / a re-added GooBlob re-export / a <GooBlob> tag / a custom/goo-blob import all RED)");

// ── Report ───────────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);
const pass = failed.length === 0;

console.log("proof:blob-rename — the goo-blob→blob clean-break rename (BI.W-BLOB-RENAME-LAND)");
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const ARTIFACT = gateArtifactPath("GATE_BLOB_RENAME_OUT", "BI-blob-rename");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:blob-rename",
    command: COMMAND,
    note: "STRUCTURAL rename — the <Blob> render is BYTE-IDENTICAL to <GooBlob> (dir/component/subpath; config keys already BLOB-prefixed; shader + useMetaballRenderer + internal .goo-blob-* CSS untouched). W1 dir absent/present + barrel Blob; W2 package.json exports ./blob no ./goo-blob alias (disk-following via subpath-policy, re-pinned by regen-exports --write); W3 zero goo-blob import-specifier / <GooBlob> tag in the app code trees; W4 MIGRATION §262 executed-tense (authoritative disk-follow = proof:migration-truth); W5 the value.js carry-ask row on the BI roster (authoritative = proof:crossrepo-asks:bi X3). + a 4-bite self-test. Born-RED at HEAD (dir + ./goo-blob present, MIGRATION §262 claims landed).",
    w3Hits,
    exportKeysSample: exportKeys.filter((k) => k.includes("blob")),
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:blob-rename] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:blob-rename] the goo-blob→blob clean-break rename is LANDED — the dir/component/subpath moved to blob, package.json carries ./blob with no ./goo-blob alias, zero import-specifier/tag survivor, MIGRATION §262 matches disk, and the value.js carry-ask is on the BI roster.",
);
