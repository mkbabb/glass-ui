#!/usr/bin/env node
// BA.W-HYGIENE — the CLAUDE.md §Structure custom/ drift gate (proof:claude-structure-sync).
//
// CLAUDE.md is the structural map a fresh agent reads FIRST to route to a component.
// Through two closes (P-5) the §Structure `custom/` enumeration drifted from disk: it
// declared "36 custom package dirs" while disk had 33, and OMITTED five shipped
// feature-dirs (constellation/ fourier-field/ glass-panel/ header-ribbon/ underline/).
// A fresh agent routing by §Structure could not find them. This gate makes the
// enumeration ≡ disk MACHINE-ENFORCED so the map cannot silently diverge again.
//
// It asserts (the anti-evasion bite — SET EQUALITY in BOTH directions):
//   (a) the dir-named lines under the `custom/` header enumerate EXACTLY the dirs
//       present at `ls src/components/custom/` (excluding `index.ts` + any non-dir);
//       a dir on disk missing from the doc REDs, AND a dir in the doc absent from disk
//       REDs.
//   (b) the declared count ("<N> custom package dirs") EQUALS the actual disk dir
//       count. It is DERIVED-vs-actual, not a literal "33" match — adding a dir to
//       disk must re-sync the count, never green a frozen number; correcting the count
//       while a future dir is added un-enumerated also REDs (the set arm catches it).
//
// Born-RED at HEAD pre-edit (36 ≠ 33, five dirs omitted); GREEN after the §Structure
// re-sync. The gate guards every later wave adding a custom/ dir — it must enumerate
// the dir in CLAUDE.md or RED.

import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const CLAUDE_MD = resolve(ROOT, "CLAUDE.md");
const CUSTOM_DIR = resolve(ROOT, "src/components/custom");
const ARTIFACT = gateArtifactPath("GLASS_UI_CLAUDE_STRUCTURE_ARTIFACT", "BA-claude-structure-sync");

const rel = (p) => relative(ROOT, p);

// BA.W-HYGIENE (P-4): the on-disk-but-untracked visual-png integrity assert. The
// .gitignore un-ignores `docs/tranches/*/audit/visual/*.png` + `…/*/*.png` precisely so
// proof:live-verified-ledger / proof:az-reflect can assert the cited pngs exist on a
// fresh CI checkout. But a png that EXISTS on disk yet is NOT `git ls-files`-tracked
// resolves on the authoring tree and 404s on a fresh clone — the exact failure class the
// gitignore exception was built to prevent (the AX close left 26 such orphans). This arm
// asserts every on-disk un-ignored visual png is tracked, closing the class MECHANICALLY.
// It is git-aware (the only seam that needs git); on a non-git or detached runner it
// degrades to skip-by-policy (a clean CI checkout always has git).
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

/** The disk truth: immediate sub-DIRECTORIES of src/components/custom/ (excludes
 *  index.ts + any loose file; a dir IS a package by the custom/ convention). */
function diskDirs() {
    return readdirSync(CUSTOM_DIR, { withFileTypes: true })
        .filter((e) => e.isDirectory())
        .map((e) => e.name)
        .sort();
}

/** Parse the CLAUDE.md §Structure custom/ enumeration. The enumeration lives in a
 *  fenced ``` block as an ASCII tree. The `custom/` header line carries the declared
 *  count; the DIRECT-CHILD dir lines carry the 3-deep tree prefix `│   │   ├── <name>/`
 *  (the deeper `│   │   │   ├──` nested children of dock/ + controls/ and the trailing
 *  `└── index.ts` barrel are NOT direct package dirs and are excluded). */
function parseDoc() {
    const lines = readFileSync(CLAUDE_MD, "utf8").split("\n");
    // The custom/ header: `│   ├── custom/   # <N> custom package dirs ...`
    const headerIdx = lines.findIndex((l) =>
        /^│\s+├──\s+custom\/\s+#.*custom package dirs/.test(l),
    );
    if (headerIdx === -1)
        return { found: false, declaredCount: null, dirs: [] };
    const header = lines[headerIdx];
    const countMatch = header.match(/#\s*(\d+)\s+custom package dirs/);
    const declaredCount = countMatch ? Number(countMatch[1]) : null;

    // Walk forward from the header collecting DIRECT-CHILD dir lines until the block
    // closes (the `│   └── index.ts` custom-barrel line, or the next sibling section
    // `│   └──`/`├──` at the components level, or the fence close).
    const dirs = [];
    for (let i = headerIdx + 1; i < lines.length; i++) {
        const l = lines[i];
        // Block end: the custom/ barrel close `│   │   └── index.ts` then the
        // components-level `│   └── index.ts`, or a fence / next top section.
        if (/^```/.test(l)) break;
        if (/^│\s+└──\s+index\.ts/.test(l)) break; // components/ barrel close
        // A direct-child package dir line: exactly the 3-deep `│   │   ├── <name>/`.
        const m = l.match(/^│\s+│\s+├──\s+([a-z0-9][a-z0-9-]*)\/(?:\s|$)/);
        if (m) dirs.push(m[1]);
    }
    return { found: true, declaredCount, dirs: dirs.sort() };
}

function run() {
    const violations = [];
    const disk = diskDirs();
    const doc = parseDoc();

    const facts = {
        claudeMd: rel(CLAUDE_MD),
        customDir: rel(CUSTOM_DIR),
        diskCount: disk.length,
        declaredCount: doc.declaredCount,
        enumeratedCount: doc.dirs.length,
    };

    if (!doc.found) {
        violations.push(
            "CLAUDE.md — the §Structure `custom/` header (`# <N> custom package dirs ...`) was not found; the parse anchor drifted",
        );
    } else {
        // (a) SET EQUALITY both directions.
        const docSet = new Set(doc.dirs);
        const diskSet = new Set(disk);
        const onDiskNotDoc = disk.filter((d) => !docSet.has(d));
        const inDocNotDisk = doc.dirs.filter((d) => !diskSet.has(d));
        facts.onDiskMissingFromDoc = onDiskNotDoc;
        facts.inDocAbsentFromDisk = inDocNotDisk;
        for (const d of onDiskNotDoc)
            violations.push(
                `src/components/custom/${d}/ — present on disk but ABSENT from the CLAUDE.md §Structure enumeration; add it`,
            );
        for (const d of inDocNotDisk)
            violations.push(
                `CLAUDE.md enumerates \`${d}/\` but it is ABSENT from src/components/custom/; remove the stale line`,
            );

        // (b) declared count = actual disk count (DERIVED, not a literal "33").
        if (doc.declaredCount === null)
            violations.push(
                "CLAUDE.md — the custom/ header carries no parseable `<N> custom package dirs` count",
            );
        else if (doc.declaredCount !== disk.length)
            violations.push(
                `CLAUDE.md declares ${doc.declaredCount} custom package dirs; disk has ${disk.length} — re-sync the count`,
            );

        // Belt-and-suspenders: the enumerated set count must also equal disk (it
        // follows from set-equality, but record it as a fact for the artefact).
        if (doc.dirs.length !== disk.length)
            facts.enumeratedNeqDisk = true;
    }

    // (P-4) the on-disk-but-untracked visual-png integrity assert (the clean-tree arm).
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

    console.log("proof:claude-structure-sync — the CLAUDE.md §Structure custom/ map ≡ disk + the clean-tree png-tracked assert (BA.W-HYGIENE)");
    console.log(`  disk dirs            : ${facts.diskCount}`);
    console.log(`  declared count       : ${facts.declaredCount}`);
    console.log(`  enumerated dirs      : ${facts.enumeratedCount}`);
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
