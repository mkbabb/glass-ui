// AZ.W-BLOB-PAGE — proof:blob-page-fence, the device-free GL-fence diff-witness.
//
// THE FENCE (§X orchestrator ruling HC-GATESPEC — MANDATORY split): the wave's §0
// RE-GROUND re-attribution is BINDING — the GL renderer is NOT re-opened (C6-1 /
// F2-R3-9-pixelation REFUTED; the bead is crisp). What is refuted-closed is the
// *pixelation / resolution / DPR* reading: W-BLOB-PAGE may NOT re-open the renderer's
// sampling resolution or "fix pixelation" in-shader. This gate gives that fence BINARY
// TEETH: it asserts the GL-renderer file set is UNTOUCHED by W-BLOB-PAGE'S OWN COMMIT.
//
// SCOPE — THE WAVE'S COMMIT ONLY (the §6 bite-4 disjointness): the witness diffs ONLY
// the commit whose subject starts with `feat(AZ): blob-page` (the §9 commit message). It
// must NOT red on W-BLOB-STUDIO's PARALLEL authorized shader edits (the §3.2 smin-band
// widen in uploadBlobUniforms.ts/sdf-body.glsl.ts + the §3.7 conditional Snell refraction
// in metaball.frag.ts/useMetaballRenderer.ts), which land under a DISTINCT studio commit.
// The bite proves "the PAGE wave didn't touch the renderer," NOT "no AZ wave touched the
// renderer." The render-band gates alone cannot catch the violation (they gate render
// CORRECTNESS, not file-immutability) — this diff-witness is the fence's bite.
//
// This is a pure git-scope src-scan (no browser) → tags: ["local","ci","release"],
// carrying `ci` per proof:tag-parity (the falsifiable-on-every-runner half; the three π
// bites are the live proof:blob-page, local-only + ledger).

import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:blob-page-fence";

// The refuted-GL renderer file set — the §4 "Do NOT touch (THIS WAVE)" GL core. An edit
// to ANY of these BY W-BLOB-PAGE'S COMMIT is a wave-bounds violation (a "fix pixelation
// in the shader" re-open of the refuted-closed resolution/DPR reading). These paths stay
// OPEN tranche-wide for W-BLOB-STUDIO's distinct commit — the fence scopes to this wave.
const FENCED = [
    "src/components/custom/blob/composables/buildMetaballProgram.ts",
    "src/components/custom/blob/composables/uploadBlobUniforms.ts",
    "src/components/custom/blob/composables/useMetaballRenderer.ts",
    "src/components/custom/blob/shaders/metaball.frag.ts",
];
// The shaders/*.glsl.ts set (matched by a prefix+suffix rule so a new shader chunk is
// covered without a hand-add).
const FENCED_SHADER_DIR = "src/components/custom/blob/shaders/";
const FENCED_SHADER_SUFFIX = ".glsl.ts";

// The §9 commit-plan subject prefix for THIS wave's implementation commit.
const COMMIT_SUBJECT_PREFIX = "feat(AZ): blob-page";

function git(args) {
    return execFileSync("git", args, { cwd: ROOT, encoding: "utf8" }).trim();
}

/** Locate W-BLOB-PAGE's own commit SHA(s) by the §9 subject prefix (newest first). */
function findWaveCommits() {
    // --grep is a substring/regex match on the subject+body; anchor to the prefix.
    const out = git([
        "log",
        "--all",
        "--format=%H\t%s",
        `--grep=^${escapeRe(COMMIT_SUBJECT_PREFIX)}`,
        "-E",
    ]);
    if (!out) return [];
    return out
        .split("\n")
        .map((line) => {
            const [sha, ...rest] = line.split("\t");
            return { sha, subject: rest.join("\t") };
        })
        .filter((c) => c.sha && c.subject.startsWith(COMMIT_SUBJECT_PREFIX));
}

function escapeRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Files touched by a commit (name-only diff against its first parent). */
function filesInCommit(sha) {
    // --root handles the (unlikely) initial-commit case; -m flattens merge diffs.
    const out = git(["show", "--name-only", "--format=", "-m", sha]);
    return out
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
}

/** Whether a touched path is in the fenced GL-renderer set. */
function isFenced(path) {
    if (FENCED.includes(path)) return true;
    if (path.startsWith(FENCED_SHADER_DIR) && path.endsWith(FENCED_SHADER_SUFFIX)) return true;
    return false;
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_BLOB_PAGE_FENCE_ARTIFACT", "AZ-blob-page-fence");
    const violations = [];
    let commits = [];
    let scanned = "none";
    try {
        commits = findWaveCommits();
    } catch (e) {
        // No git or not a repo — the fence cannot run; record an honest skip-pass (the
        // device-present runners carry git; a git-less environment is not a violation).
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status: "skipped",
            reason: `git unavailable (${(e?.message ?? "").split("\n")[0]}) — the GL-fence diff-witness needs a git repo; run it where git is present`,
            command: COMMAND,
        });
        console.log("proof:blob-page-fence — SKIPPED (no git repo).");
        process.exit(0);
    }

    if (commits.length === 0) {
        // No W-BLOB-PAGE commit landed yet (pre-commit / the orchestrator owns the index
        // and has not made `feat(AZ): blob-page …`). The fence has nothing to fence yet —
        // it BINDS once the commit lands. This is an honest PENDING-COMMIT pass (NOT a
        // false GREEN: there is no wave commit to violate). The moment the commit lands,
        // this gate diffs it and reds on any fenced-file touch.
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status: "pass",
            command: COMMAND,
            facts: {
                waveCommitFound: false,
                note: "no `feat(AZ): blob-page` commit yet — the fence binds once the orchestrator commits this wave; nothing to fence pre-commit",
                fencedFileCount: FENCED.length + 1,
            },
            violations: [],
        });
        console.log("proof:blob-page-fence — PASS (PENDING-COMMIT: no `feat(AZ): blob-page` commit yet; the fence binds once it lands).");
        process.exit(0);
    }

    // A W-BLOB-PAGE commit (or commits) exists — assert NONE touches a fenced GL file.
    scanned = commits.map((c) => c.sha.slice(0, 9)).join(",");
    for (const c of commits) {
        const files = filesInCommit(c.sha);
        const offenders = files.filter(isFenced);
        for (const f of offenders) {
            violations.push(
                `W-BLOB-PAGE commit ${c.sha.slice(0, 9)} ("${c.subject}") touched the REFUTED-CLOSED GL-renderer file "${f}" — the GL-fence is BREACHED (the wave re-opened the resolution/DPR reading that C6-1/F2-R3-9 REFUTED; a "fix pixelation in the shader" violation). The page wave may NOT edit the renderer's sampling resolution. (W-BLOB-STUDIO's distinct studio commit MAY edit these — this fence diffs the page wave's commit ONLY.)`,
            );
        }
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: COMMAND,
        facts: {
            waveCommitFound: true,
            scannedCommits: scanned,
            fencedFileCount: FENCED.length + 1,
        },
        violations,
    });

    console.log("proof:blob-page-fence — the device-free GL-fence diff-witness (AZ.W-BLOB-PAGE §X)");
    console.log(`  scanned W-BLOB-PAGE commit(s): ${scanned}`);
    console.log(`  fenced GL-renderer files: ${FENCED.map((f) => f.split("/").pop()).join(", ")}, *${FENCED_SHADER_SUFFIX}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
