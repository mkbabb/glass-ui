#!/usr/bin/env node
// scripts/regen-structure.mjs — the GENERATED structure.md emitter (BH.B4b-skeleton).
// ============================================================================
// Generates `docs/canon/structure.md` from disk via the SAME colocated-barrel glob
// `scripts/lib/subpath-policy.mjs` (`readTree`) feeds the export regen — so the
// 5-reader hot structure enumeration (the `custom/` package list that drifted from
// CLAUDE.md §Structure through two closes — proof:claude-structure-sync's lesson)
// CANNOT drift again: it is re-derived, never hand-maintained.
//
// MODES (CLI):
//   (default) — print the generated structure.md to stdout.
//   --write   — write docs/canon/structure.md.
//   --check   — compare the on-disk structure.md to the freshly-generated form;
//               exit 1 on drift (the B5c [WS12] re-point of proof:claude-structure-
//               sync consumes this so a custom/ dir add without a re-gen REDs).
//
// READ-ONLY by default. Pure disk read; no side effects unless --write.
// ============================================================================

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { REPO_ROOT, readTree } from "./lib/subpath-policy.mjs";

const ARGS = new Set(process.argv.slice(2));
const WRITE = ARGS.has("--write");
const CHECK = ARGS.has("--check");

const OUT_REL = "docs/canon/structure.md";
const OUT_ABS = resolve(REPO_ROOT, OUT_REL);

/** One tier section: `## <label> (N dirs)` + a sorted `- <name>/` bullet list. */
function tierSection(label, dirs) {
    const sorted = [...dirs].sort();
    const head = `## ${label} (${sorted.length} ${sorted.length === 1 ? "dir" : "dirs"})`;
    const body = sorted.map((d) => `- ${d}/`).join("\n");
    return `${head}\n\n${body}\n`;
}

export function generateStructureMd() {
    const tree = readTree();
    const lines = [];
    lines.push("# Structure (GENERATED — do not hand-edit)");
    lines.push("");
    lines.push(
        "> Re-derived from disk by `node scripts/regen-structure.mjs --write` via the",
    );
    lines.push(
        "> SAME colocated-barrel glob (`scripts/lib/subpath-policy.mjs` `readTree`) the",
    );
    lines.push(
        "> export regen feeds, so the package enumeration cannot drift. Run `--check` in",
    );
    lines.push(
        "> CI to RED a `custom/` dir add that never re-generated this file. The narrative",
    );
    lines.push(
        "> structure prose (the `src/styles/` cascade, the per-dir intent) lands at",
    );
    lines.push("> BH.B4b-content [WS12]; this skeleton carries the package enumeration.");
    lines.push("");
    lines.push(tierSection("src/components/ui", tree.ui));
    lines.push(tierSection("src/components/custom", tree.custom));
    lines.push(tierSection("src/composables", tree.composable));
    // Single trailing newline.
    return `${lines.join("\n").replace(/\n+$/, "")}\n`;
}

const generated = generateStructureMd();

if (WRITE) {
    writeFileSync(OUT_ABS, generated);
    console.log(`regen-structure --write — wrote ${OUT_REL}`);
    process.exit(0);
}

if (CHECK) {
    if (!existsSync(OUT_ABS)) {
        console.error(`regen-structure --check — ${OUT_REL} is ABSENT (run --write).`);
        process.exit(1);
    }
    const current = readFileSync(OUT_ABS, "utf8");
    if (current !== generated) {
        console.error(
            `regen-structure --check — ${OUT_REL} is STALE (a custom/ui/composable dir drifted from disk). Run: node scripts/regen-structure.mjs --write`,
        );
        process.exit(1);
    }
    console.log(`regen-structure --check — ${OUT_REL} is FRESH (matches disk).`);
    process.exit(0);
}

// default — print
process.stdout.write(generated);
