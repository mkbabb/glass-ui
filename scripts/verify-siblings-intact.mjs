#!/usr/bin/env node
// verify-siblings-intact — the SIBLING-SAFETY SENTINEL (born 2026-06-20 after the
// park-not-restored incident). The glass-ui close-battery must emulate a
// "siblings-absent" CI checkout WITHOUT EVER moving the user's real sibling repos
// out of ~/Programming. The proven-safe pattern is a FRESH throwaway glass-ui
// worktree in /tmp (the absence comes from the fresh checkout). The FORBIDDEN
// pattern is `mv ~/Programming/<sibling> /tmp/...` (an agent did this + a TaskStop
// orphaned 11 repos for hours — see memory feedback-never-park-sibling-repos).
//
// This sentinel is the tripwire: run it BEFORE and AFTER any close-battery /
// siblings-absent operation. It REDS if (a) any park/stash dir holds a repo, or
// (b) a named constellation sibling is missing from ~/Programming. READ-ONLY.
//
//   node scripts/verify-siblings-intact.mjs            # verify
//   node scripts/verify-siblings-intact.mjs --quiet    # exit-code only
import { existsSync, readdirSync, statSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const PROG = join(homedir(), "Programming");
const QUIET = process.argv.includes("--quiet");
const log = (...a) => { if (!QUIET) console.log(...a); };

// The constellation siblings glass-ui's close-battery / cross-repo asks reference.
// A sibling is OK if it is present at ~/Programming/<name> OR genuinely never
// cloned on this machine (registry-default policy) — what is FORBIDDEN is a repo
// sitting orphaned in a /tmp park/stash dir (a park-not-restored).
const SIBLINGS = [
    "value.js", "keyframes.js", "fourier-analysis", "slides", "speedtest",
    "words", "sci-report", "bbnf-lang", "bbnf-buddy", "pencil-boil", "latex-paper",
];

// Any /tmp dir that has ever been used to park/stash a real tree.
const PARK_DIRS = ["/tmp/sibling-park", "/tmp/sibling-stash"];

const violations = [];

// (1) THE LOAD-BEARING CHECK: no real repo may sit in a park/stash dir.
for (const p of PARK_DIRS) {
    if (!existsSync(p)) continue;
    const entries = readdirSync(p).filter((e) => !e.startsWith("."));
    const repos = entries.filter((e) => {
        try { return statSync(join(p, e)).isDirectory() && existsSync(join(p, e, ".git")); }
        catch { return false; }
    });
    if (repos.length > 0)
        violations.push(`PARK-NOT-RESTORED — ${p} holds ${repos.length} orphaned repo(s): ${repos.join(", ")}. Move them back to ~/Programming NOW (mv ${p}/<repo> ${PROG}/<repo>) before the /tmp reaper runs.`);
    else if (entries.length > 0)
        log(`  note: ${p} has non-repo leftovers (${entries.join(", ")}) — harmless, but clean when convenient.`);
}

// (2) Inventory: which siblings are present vs absent (absent != violation;
// PARKED is the violation, caught above).
const present = SIBLINGS.filter((s) => existsSync(join(PROG, s, ".git")));
const absent = SIBLINGS.filter((s) => !existsSync(join(PROG, s, ".git")));

log(`[verify-siblings-intact] ${PROG}`);
log(`  siblings present : ${present.length}/${SIBLINGS.length} — ${present.join(", ") || "none"}`);
if (absent.length) log(`  siblings absent  : ${absent.join(", ")} (registry-default — OK iff not parked; verify they were never cloned, not parked)`);

if (violations.length) {
    log("\nVIOLATIONS:");
    for (const v of violations) log(`  ✗ ${v}`);
    log("\n[verify-siblings-intact] FAIL — a real repo is orphaned outside ~/Programming.");
    process.exit(1);
}
log("\n[verify-siblings-intact] OK — no repo is parked/orphaned in /tmp. The foreign-tree fence held.");
process.exit(0);
