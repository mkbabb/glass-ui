#!/usr/bin/env node
// BA.W-HYGIENE — the §Structure custom/ drift gate (proof:claude-structure-sync).
// RE-HOMED off CLAUDE.md onto the GENERATED docs/canon/structure.md (BH.B5c). The
// structure map a fresh agent reads FIRST to route to a component used to live in the
// CLAUDE.md §Structure `custom/` ASCII tree; it drifted from disk through two closes
// (declared "36 custom package dirs" while disk had 33). BH regenerates the map from
// disk (`regen-structure.mjs`, the SAME colocated-barrel glob the export regen feeds),
// so the enumeration CANNOT be hand-maintained — the gate no longer parses a
// hand-authored tree, it asserts the committed generated file is FRESH.
//
// It asserts:
//   (a) REGEN-FRESHNESS — the committed docs/canon/structure.md is byte-identical to
//       the freshly-generated form (`structureFreshness()`). A custom/ui/composable
//       dir add (or delete) that never re-ran `node scripts/regen-structure.mjs
//       --write` REDs. This SUPERSEDES the CLAUDE.md-tree set-equality parse — the
//       generated map cannot drift from disk (it IS disk), and the freshness check is
//       the honest guard against a stale committed copy. The bare readFileSync(CLAUDE_MD)
//       crash (the ci ENOENT the whole BH doc-migration kills) is gone.
//   (b) PNG-TRACKED — the on-disk-but-untracked visual-png integrity assert (P-4,
//       kept): every un-ignored `docs/tranches/*/audit/{visual,reflect}/**.png` on disk
//       is `git ls-files`-tracked, so a png that resolves on the authoring tree but
//       404s on a fresh clone REDs. (This arm is BOOKED to split into
//       proof:visual-png-tracked at B5e — for B5c it rides here, CLAUDE-read-free.)
//
// Born-RED whenever the committed structure.md drifts from disk; GREEN after --write.

import { execSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { resolve, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { structureFreshness } from "./regen-structure.mjs";
import { canonDocRel } from "./lib/canon-doc.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const CUSTOM_DIR = resolve(ROOT, "src/components/custom");
const ARTIFACT = gateArtifactPath("GLASS_UI_CLAUDE_STRUCTURE_ARTIFACT", "BA-claude-structure-sync");

const rel = (p) => relative(ROOT, p);

// BA.W-HYGIENE (P-4): the on-disk-but-untracked visual-png integrity assert. A png that
// EXISTS on disk yet is NOT `git ls-files`-tracked resolves on the authoring tree and
// 404s on a fresh clone. Git-aware; on a non-git runner it degrades to skip-by-policy.
function untrackedVisualPngs() {
    try {
        const out = execSync(
            "git ls-files --others --exclude-standard 'docs/tranches/*/audit/visual/*.png' 'docs/tranches/*/audit/visual/*/*.png' 'docs/tranches/*/audit/reflect/*.png' 'docs/tranches/*/audit/reflect/*/*.png'",
            { cwd: ROOT, encoding: "utf8" },
        );
        return { gitAware: true, files: out.split("\n").map((l) => l.trim()).filter(Boolean) };
    } catch {
        return { gitAware: false, files: [] };
    }
}

/** The disk truth: immediate sub-DIRECTORIES of src/components/custom/ (a fact for the
 *  artefact; the freshness check is the binding assertion). */
function diskDirs() {
    return readdirSync(CUSTOM_DIR, { withFileTypes: true })
        .filter((e) => e.isDirectory())
        .map((e) => e.name)
        .sort();
}

function run() {
    const violations = [];
    const disk = diskDirs();
    const fr = structureFreshness();

    const facts = {
        structureHome: canonDocRel("structure"),
        customDir: rel(CUSTOM_DIR),
        diskCount: disk.length,
        structureFresh: fr.fresh,
        structurePresent: fr.committed !== null,
    };

    // (a) REGEN-FRESHNESS — the committed generated map ≡ the fresh generation.
    if (fr.committed === null) {
        violations.push(
            `${fr.outRel} — the generated structure map is ABSENT; run \`node scripts/regen-structure.mjs --write\``,
        );
    } else if (!fr.fresh) {
        violations.push(
            `${fr.outRel} — STALE: a src/components/{ui,custom} or src/composables dir drifted from disk without re-generating. Run: node scripts/regen-structure.mjs --write`,
        );
    }

    // (b) PNG-TRACKED — the on-disk-but-untracked visual-png integrity assert.
    const png = untrackedVisualPngs();
    facts.pngIntegrityGitAware = png.gitAware;
    facts.untrackedVisualPngs = png.files;
    if (!png.gitAware) {
        console.log(
            "  png-integrity: SKIP-BY-POLICY — not a git checkout (a clean CI checkout always has git; the assert bites there + locally)",
        );
    } else {
        for (const f of png.files)
            violations.push(
                `${f} — un-ignored visual png exists on disk but is NOT git-tracked; it 404s on a fresh clone (commit-if-cited / delete-if-scratch — P-4)`,
            );
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:claude-structure-sync",
        facts,
        violations,
    });

    console.log("proof:claude-structure-sync — the generated docs/canon/structure.md ≡ disk (regen-fresh) + the clean-tree png-tracked assert (BA.W-HYGIENE, BH.B5c re-home)");
    console.log(`  disk custom dirs     : ${facts.diskCount}`);
    console.log(`  structure.md fresh   : ${facts.structureFresh}`);
    console.log(`  untracked visual pngs: ${facts.pngIntegrityGitAware ? facts.untrackedVisualPngs.length : "n/a (no git)"}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${rel(ARTIFACT)}`);
    process.exit(status === "pass" ? 0 : 1);
}

void existsSync; // imported for parity with sibling gates' fs surface
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
