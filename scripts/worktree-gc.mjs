#!/usr/bin/env node
// worktree-gc.mjs — the `.claude/worktrees/` hygiene tripwire + pruner (BG Stage-0 · DEV-B §3.4 / GA-12).
//
// SCOPE-FENCED ABSOLUTELY: this tool touches ONLY `<repo>/.claude/worktrees/`. It NEVER reaches
// `~/Programming` siblings, NEVER `/tmp`, never parks/moves anything (inv-26 + the 2026-06-20
// park-not-restored law). It runs `verify-siblings-intact.mjs --quiet` FIRST and aborts if that reds.
//
// Modes:
//   --report          census only (dirs, bytes, threshold verdict); never deletes. Exit 0 always.
//   --gate            census only; exit 1 if over threshold (the proof:worktree-hygiene arm).
//   --prune           `git worktree prune` + remove every INACTIVE worktree whose HEAD is an ancestor of
//                     tranche/BG (no unique commits). Non-ancestor trees are REPORTED, never force-removed.
//   --runId <id>      the active run id — any dir whose name contains it is NEVER touched.
//
// Thresholds (DEV-B §3.4): RED over 20 dirs OR 20 GB. Boot RED is a WARN; the pre-cut battery RED aborts the tag.

import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, realpathSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const WT = path.join(REPO, ".claude", "worktrees");
const MAX_DIRS = 20;
const MAX_BYTES = 20 * 1024 ** 3;

const argv = process.argv.slice(2);
const mode = argv.includes("--prune") ? "prune" : argv.includes("--gate") ? "gate" : "report";
const runId = argv.includes("--runId") ? argv[argv.indexOf("--runId") + 1] : null;

const sh = (cmd, args, opts = {}) =>
    execFileSync(cmd, args, { cwd: REPO, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], ...opts }).trim();

// 0 — the sibling tripwire runs FIRST, unconditionally.
try {
    sh("node", ["scripts/verify-siblings-intact.mjs", "--quiet"]);
} catch {
    console.error("worktree-gc: verify-siblings-intact REDs — ABORT (fix the sibling state first; this tool changes nothing).");
    process.exit(2);
}

if (!existsSync(WT)) {
    console.log(`worktree-gc: ${WT} absent — 0 dirs / 0 bytes. GREEN.`);
    process.exit(0);
}

const wtReal = realpathSync(WT);
const inFence = (p) => {
    const rp = realpathSync(p);
    return rp === wtReal || rp.startsWith(wtReal + path.sep);
};

const dirs = readdirSync(WT, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => path.join(WT, d.name));
const bytes = Number(sh("du", ["-sk", WT]).split(/\s+/)[0]) * 1024;
const over = dirs.length > MAX_DIRS || bytes > MAX_BYTES;
const gb = (bytes / 1024 ** 3).toFixed(1);

console.log(`worktree-gc: ${dirs.length} dirs / ${gb} GB under .claude/worktrees (thresholds ${MAX_DIRS} dirs / 20 GB) — ${over ? "RED" : "GREEN"}`);

if (mode === "gate") process.exit(over ? 1 : 0);
if (mode === "report") process.exit(0);

// --prune
sh("git", ["worktree", "prune"]);
let removed = 0, kept = 0, skippedActive = 0, freed0 = bytes;
for (const dir of dirs) {
    if (!existsSync(dir)) continue;
    if (runId && dir.includes(runId)) { skippedActive++; continue; }
    if (!inFence(dir)) { console.error(`worktree-gc: ${dir} resolves OUTSIDE the fence — SKIP (never touched).`); kept++; continue; }
    let head = null;
    try { head = sh("git", ["-C", dir, "rev-parse", "HEAD"]); } catch { /* not a worktree — a stray dir; still fenced-in, remove below via worktree remove failing → skip */ }
    let ancestor = false;
    if (head) {
        try { sh("git", ["merge-base", "--is-ancestor", head, "tranche/BG"]); ancestor = true; } catch { ancestor = false; }
    }
    if (head && !ancestor) { console.log(`worktree-gc: KEEP ${path.basename(dir)} — HEAD ${head.slice(0, 8)} not merged into tranche/BG (unique commits).`); kept++; continue; }
    try {
        sh("git", ["worktree", "remove", "--force", dir]);
        removed++;
    } catch {
        // Not a registered worktree (already pruned admin refs) — fenced rm of the leaf dir only.
        if (inFence(dir)) { sh("rm", ["-rf", dir]); removed++; } else kept++;
    }
}
const bytesAfter = existsSync(WT) ? Number(sh("du", ["-sk", WT]).split(/\s+/)[0]) * 1024 : 0;
console.log(`worktree-gc: pruned ${removed} · kept ${kept} (unmerged/unfenced) · active-skipped ${skippedActive} · freed ${((freed0 - bytesAfter) / 1024 ** 3).toFixed(1)} GB → now ${(bytesAfter / 1024 ** 3).toFixed(1)} GB.`);
process.exit(0);
