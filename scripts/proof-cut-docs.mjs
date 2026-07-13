#!/usr/bin/env node
// BH.B4e W-doc-slim / CUT-AUTHORING — proof:cut-docs, the device-free acceptance
// witness for the 5.0.0 cut docs (the PLAN §4.8 "device-free arm").
//
// THE NEED. B4e is the CUT-AUTHORING wave: the 5.0.0 cut's PRIMARY consumer surface
// (the MIGRATION.md `## 5.0.0` section + the 203-row `/api`-fold table) did NOT exist
// at HEAD — `MIGRATION.md:1` read `# MIGRATION—v0.9.x → v1.0 → v2.0` with ZERO 5.0.0
// content, and `CHANGELOG.md` carried a stale mis-ordered `## Unreleased` (Tranche
// AX.W07) with no `## 5.0.0`. A "slim that appended one paragraph" would silently pass
// a naive check; this gate is the binding witness the cut docs were AUTHORED, not
// grazed. Five clauses over MIGRATION.md + CHANGELOG.md (born-RED at HEAD → GREEN on
// the reshape):
//   W1 — MIGRATION.md's H1 title is VERSION-AGNOSTIC (`# MIGRATION`, no baked `vN.M`);
//        the per-version guide is `## <version>` sections, not a title that trails the
//        cut cadence.
//   W2 — MIGRATION.md carries a `## 5.0.0` section (the cut is authored, newest-first).
//   W3 — the 5.0.0 `/api`-fold table is a REAL, SUBSTANTIAL markdown table (>=150 symbol
//        rows — the authored-not-a-stub witness; a table, not a paragraph). The EXACT
//        disk-true count + per-row VALIDITY (every target subpath live, every symbol
//        exported by its barrel) is owned by proof:migration-truth (BI.W-MIGRATION-TRUE-UP);
//        this clause only guards substantiality so the two never re-implement each other.
//        Scoped to the `### The `/api`` section so a same-shaped inventory table elsewhere
//        in the doc does not inflate the count. (The re-home carries 199 rows at the 5.0.0
//        cut — down from the pre-BG 203 as the dead-composable sweep + the PaperGrid→LiquidGrid
//        / SelectableChipVariants→ChipVariants renames retired/renamed their entries.)
//   W4 — MIGRATION.md carries the `--ring` → `--focus-ring-color` rename ROW with the
//        fallback-first transition form `var(--focus-ring-color, var(--ring))` (the
//        atlas by-name token ask's consumer-migration home).
//   W5 — CHANGELOG.md has EXACTLY ONE `## 5.0.0` heading AND ZERO `## Unreleased`
//        (the cut section authored + the stale Unreleased deleted, same pass).
//
// DOC-AUTHORING wave — NO π, NO proof:ba-gestalt (zero pixels). The born-RED→GREEN log
// + the 5-bite self-test (each clause driven RED by a synthetic tampered input) is the
// binding truth. The two parse-target gates the reshape must NOT break
// (`proof:on-glass-fg`, `proof:surface-axis` — both read MIGRATION.md) are asserted by
// their own gates; this gate owns the cut-authoring witness.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "node scripts/proof-cut-docs.mjs";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// Count the `/api`-fold table rows WITHIN the `### The `/api`` section only (bounded by
// the next `###`/`##` heading) so a same-shaped table elsewhere never inflates the count.
function countApiFoldRows(migration) {
    const lines = migration.split("\n");
    const start = lines.findIndex((l) => /^###\s+.*`?\/api`?/.test(l));
    if (start === -1) return 0;
    let end = start + 1;
    while (end < lines.length && !/^#{2,3}\s/.test(lines[end])) end++;
    return lines
        .slice(start, end)
        .filter((l) => /^\|\s*`[^`]+`\s*\|\s*(type|const)\s*\|/.test(l)).length;
}

/**
 * Evaluate the cut-doc witness. PURE over the two doc strings so the self-test can
 * drive synthetic tampered inputs.
 * @param {{migration:string, changelog:string}} inputs
 * @returns {{id:string, pass:boolean, detail:string}[]}
 */
export function evaluate({ migration, changelog }) {
    const checks = [];

    const titleLine = (migration.split("\n").find((l) => /^#\s/.test(l)) ?? "").trim();
    const w1 = /^#\s+MIGRATION\s*$/.test(titleLine) && !/v\d/i.test(titleLine);
    checks.push({ id: "W1-title-version-agnostic", pass: w1, detail: `title="${titleLine}"` });

    const w2 = /^##\s+5\.0\.0\b/m.test(migration);
    checks.push({ id: "W2-migration-5.0.0-section", pass: w2, detail: w2 ? "## 5.0.0 present" : "no ## 5.0.0" });

    const apiRows = countApiFoldRows(migration);
    const w3 = apiRows >= 150; // substantiality floor; exact count + validity → proof:migration-truth
    checks.push({ id: "W3-api-fold-substantial-table", pass: w3, detail: `rows=${apiRows} (>=150; disk-true count/validity owned by proof:migration-truth)` });

    const w4 =
        /--focus-ring-color/.test(migration) &&
        /--ring/.test(migration) &&
        /var\(\s*--focus-ring-color\s*,\s*var\(\s*--ring\s*\)\s*\)/.test(migration);
    checks.push({ id: "W4-focus-ring-color-rename-row", pass: w4, detail: w4 ? "rename + fallback-first" : "missing rename/fallback" });

    const cut = (changelog.match(/^##\s+5\.0\.0\s*$/gm) ?? []).length;
    const unrel = (changelog.match(/^##\s+Unreleased\b/gm) ?? []).length;
    const w5 = cut === 1 && unrel === 0;
    checks.push({ id: "W5-changelog-one-5.0.0-zero-unreleased", pass: w5, detail: `5.0.0=${cut} unreleased=${unrel}` });

    return checks;
}

// ── SELF-TEST — each clause driven RED by a synthetic tampered input (bite proof) ──
function selfTest() {
    const good = {
        migration: [
            "# MIGRATION",
            "",
            "## 5.0.0",
            "",
            "### The `/api` discovery-subpath fold — 203-symbol re-home",
            "",
            "| symbol | kind | new import |",
            "|---|---|---|",
            ...Array.from({ length: 203 }, (_, i) => `| \`Sym${i}\` | type | \`/x\` |`),
            "",
            "### `--ring` → `--focus-ring-color`",
            "",
            "`var(--focus-ring-color, var(--ring))`",
        ].join("\n"),
        changelog: "# Changelog\n\n## 5.0.0\n\n### Breaking\n\n## 4.2.0\n",
    };
    const baseline = evaluate(good);
    if (baseline.some((c) => !c.pass)) {
        return { ok: false, why: `good corpus is not all-green: ${baseline.filter((c) => !c.pass).map((c) => c.id).join(",")}` };
    }
    const bites = [
        ["W1 v2.0-title reds", { ...good, migration: good.migration.replace("# MIGRATION", "# MIGRATION—v0.9.x → v2.0") }, "W1-title-version-agnostic"],
        ["W2 no-5.0.0 reds", { ...good, migration: good.migration.replace("## 5.0.0", "## 4.9.0") }, "W2-migration-5.0.0-section"],
        ["W3 stub-table reds", { ...good, migration: good.migration.replace(/\| `Sym1[0-9][0-9]` \| type \| `\/x` \|\n?/g, "") }, "W3-api-fold-substantial-table"],
        ["W4 no-fallback reds", { ...good, migration: good.migration.replace("`var(--focus-ring-color, var(--ring))`", "renamed") }, "W4-focus-ring-color-rename-row"],
        ["W5 unreleased reds", { ...good, changelog: good.changelog.replace("## 4.2.0", "## Unreleased") }, "W5-changelog-one-5.0.0-zero-unreleased"],
    ];
    for (const [label, input, clauseId] of bites) {
        const r = evaluate(input);
        const clause = r.find((c) => c.id === clauseId);
        if (!clause || clause.pass) return { ok: false, why: `bite "${label}" did NOT flag ${clauseId}` };
    }
    return { ok: true };
}

function run() {
    const migration = read("MIGRATION.md");
    const changelog = read("CHANGELOG.md");
    const checks = evaluate({ migration, changelog });

    const self = selfTest();
    console.log("proof:cut-docs — the 5.0.0 cut-doc acceptance witness (BH.B4e)");
    for (const c of checks) console.log(`  ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);
    console.log(`  self-test (bite proof): ${self.ok ? "OK — every clause flags its tamper" : "FAILED — " + self.why}`);

    const failed = checks.filter((c) => !c.pass);
    const pass = failed.length === 0 && self.ok;

    const ARTIFACT = gateArtifactPath("GATE_CUT_DOCS_OUT", "BH-cut-docs");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status: pass ? "pass" : "fail",
        gate: "proof:cut-docs",
        command: COMMAND,
        note: "DOC-AUTHORING wave — the 5.0.0 cut-doc witness: W1 version-agnostic MIGRATION title, W2 ## 5.0.0 section, W3 the SUBSTANTIAL /api-fold table (>=150 rows — authored-not-a-stub; the exact disk-true count/validity is proof:migration-truth's, BI.W-MIGRATION-TRUE-UP; the re-home carries 199 rows at the cut), W4 the --ring→--focus-ring-color fallback-first rename row, W5 CHANGELOG exactly-one ## 5.0.0 + zero ## Unreleased. Born-RED at HEAD (v2.0 title, no 5.0.0, stale Unreleased) → GREEN on the reshape. + a 5-bite self-test.",
        checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
        selfTest: self,
    });

    if (!self.ok) {
        console.error(`\n[proof:cut-docs] SELF-TEST FAILED — ${self.why}; the gate is not load-bearing.`);
        process.exit(1);
    }
    if (!pass) {
        console.error(`\n[proof:cut-docs] ${failed.length} clause(s) FAILED:`);
        for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
        process.exit(1);
    }
    console.log("\n[proof:cut-docs] the 5.0.0 cut docs are authored — MIGRATION `## 5.0.0` + the substantial /api-fold table (199 rows at the cut; validity → proof:migration-truth) + the --focus-ring-color rename, version-agnostic title; CHANGELOG one `## 5.0.0`, zero `## Unreleased`.");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
