#!/usr/bin/env node
// proof:git-hygiene — BH.B0-W0-scratch-sweep — the repo is disciplined, not dirty.
//
// The Pass-1 lane-α junk audit found three durable hygiene leaks that re-collect
// silently: (1) `test-results/` carried 3 ACCIDENTALLY-TRACKED Playwright failure
// artefacts (`.last-run.json` + 2 `error-context.md`) — run scratch that 404s a
// fresh clone's evidence-protocol expectations and bloats the tarball; (2) the
// DEAD `.browserslistrc` (nothing reads it — no browserslist/autoprefixer dep,
// Tailwind v4 ignores it); (3) the `.gitignore` left the three scratch-dir gaps
// (`.tmp/`, `.playwright/`, `test-results/`) open, so the run artefacts re-collect
// at the next `git add -A`. Plus the stale root scratch doc (`BD-CONTINUATION-
// PROMPT.md` belongs under `docs/tranches/BD/`) and the `.githooks/commit-msg`
// hook hardcoded to the now-CLOSED tranche `--tranche=BB` (it went stale the
// moment BB closed — the bite must read the ACTIVE tranche from the environment).
//
// This gate makes the scratch-sweep DURABLE: a future `git add -A` that re-adopts
// a Playwright artefact, a re-introduced dead `.browserslistrc`, a removed
// gitignore guard, a re-stranded root scratch doc, or a re-hardcoded tranche
// letter in the commit hook all RED here instead of silently re-rotting the repo.
//
// Device-free + git-aware (the tracking clauses use `git ls-files`; on a non-git
// runner those degrade to skip-by-policy — a clean CI checkout always has git).
// The fs clauses (gitignore / commit-msg / dead-config-on-disk / doc-rehome) run
// on EVERY runner. Tags ["local","ci"].
//
// Clauses (each born-RED at HEAD):
//   H1 — `test-results/` is UNTRACKED (zero `git ls-files` entries under it).
//   H2 — `.browserslistrc` is GONE (absent on disk AND untracked) — dead config.
//   H3 — `.gitignore` carries the three scratch-dir guards (test-results/, .tmp/,
//        .playwright/), AHEAD-OR-AFTER the force-track carve-outs (the carve-outs
//        are dir-scoped, the new guards are dir-scoped — no `*.png` ordering trap).
//   H4 — `.githooks/commit-msg` is ENV-DRIVEN (reads GLASS_UI_ACTIVE_TRANCHE, no
//        hardcoded `--tranche=<LETTER>` literal — the stale-letter class closed).
//   H5 — `BD-CONTINUATION-PROMPT.md` is RE-HOMED (absent at repo root, present at
//        docs/tranches/BD/CONTINUATION-PROMPT.md).
//   + the self-test bites (the anti-de-fang floor): each predicate flags its
//     planted synthetic violation AND passes its clean fixture.
//
// Run: node scripts/proof-git-hygiene.mjs

import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:git-hygiene";

const readRel = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};
const existsRel = (rel) => existsSync(resolve(ROOT, rel));

// ── git tracking probe (the only git-aware seam) ──────────────────────────────
// `git ls-files -- <pathspec>` lists INDEX-tracked paths under the pathspec. On a
// non-git / detached runner it throws → we degrade to skip-by-policy (gitAware:
// false), and the fs clauses carry the weight. A clean CI checkout always has git.
function trackedUnder(pathspec) {
    try {
        const out = execSync(`git ls-files -z -- ${pathspec}`, {
            cwd: ROOT,
            encoding: "utf8",
        });
        return {
            gitAware: true,
            files: out.split("\0").map((l) => l.trim()).filter(Boolean),
        };
    } catch {
        return { gitAware: false, files: [] };
    }
}

// ── pure predicates (self-testable; no git, no fs) ────────────────────────────
// H3 — the three scratch-dir guards present (dir-scoped, comment lines ignored).
const SCRATCH_GUARDS = ["test-results/", ".tmp/", ".playwright/"];
function gitignoreMissingGuards(text) {
    const lines = text
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l && !l.startsWith("#"));
    const set = new Set(lines);
    return SCRATCH_GUARDS.filter((g) => !set.has(g));
}

// H4 — a hardcoded `--tranche=<LETTER>` literal is the stale-tranche signature
// (`--tranche=BB`, `--tranche=AY`, …). The env-driven form is `--tranche="$TRANCHE"`
// / `--tranche=${…}`, where the char after `=` is a quote/`$`, never a letter.
const HARDCODED_TRANCHE_RE = /--tranche=[A-Za-z]/;
const ENV_TRANCHE_RE = /GLASS_UI_ACTIVE_TRANCHE/;
// Strip full-line shell comments — a hardcoded literal in a `#` COMMENT is not an
// executed stale-tranche bug (this gate's own re-target comment names the prior
// `--tranche=BB` to explain the fix; only the EXECUTED line is binding).
const stripShellComments = (text) =>
    text
        .split("\n")
        .map((l) => (/^\s*#/.test(l) ? "" : l))
        .join("\n");
function commitMsgViolations(text) {
    const v = [];
    const code = stripShellComments(text);
    const m = code.match(HARDCODED_TRANCHE_RE);
    if (m) v.push(`hardcoded tranche literal '${m[0]}…' (must read the active tranche from the environment)`);
    if (code.trim() && !ENV_TRANCHE_RE.test(code))
        v.push("no GLASS_UI_ACTIVE_TRANCHE reference (the hook is not env-driven)");
    return v;
}

const BD_ROOT_DOC = "BD-CONTINUATION-PROMPT.md";
const BD_REHOME = "docs/tranches/BD/CONTINUATION-PROMPT.md";
const DEAD_CONFIG = ".browserslistrc";

export function detect() {
    const violations = [];
    const facts = {};

    // H1 — test-results untracked
    const tr = trackedUnder("test-results");
    facts.gitAware = tr.gitAware;
    facts.trackedTestResults = tr.files.length;
    if (tr.gitAware && tr.files.length)
        violations.push(
            `H1: ${tr.files.length} test-results/ file(s) still TRACKED (run scratch — untrack: \`git rm --cached -r test-results\`): ${tr.files.slice(0, 3).join(", ")}`,
        );

    // H2 — .browserslistrc gone (on disk AND tracking)
    const bsOnDisk = existsRel(DEAD_CONFIG);
    const bsTracked = trackedUnder(DEAD_CONFIG);
    facts.browserslistOnDisk = bsOnDisk;
    facts.browserslistTracked = bsTracked.files.length;
    if (bsOnDisk)
        violations.push(`H2: ${DEAD_CONFIG} still on disk (DEAD config — nothing reads it; delete it)`);
    if (bsTracked.gitAware && bsTracked.files.length)
        violations.push(`H2: ${DEAD_CONFIG} still TRACKED (DEAD config — \`git rm ${DEAD_CONFIG}\`)`);

    // H3 — gitignore hardened
    const ignore = readRel(".gitignore");
    facts.gitignoreExists = ignore.length > 0;
    const missing = gitignoreMissingGuards(ignore);
    facts.gitignoreMissingGuards = missing;
    if (!facts.gitignoreExists) violations.push("H3: .gitignore not found");
    else if (missing.length)
        violations.push(`H3: .gitignore missing the scratch-dir guard(s): ${missing.join(", ")}`);

    // H4 — commit-msg hook env-driven
    const hook = readRel(".githooks/commit-msg");
    facts.commitMsgHookExists = hook.length > 0;
    if (!facts.commitMsgHookExists) violations.push("H4: .githooks/commit-msg not found");
    else {
        const cv = commitMsgViolations(hook);
        facts.commitMsgViolations = cv;
        for (const v of cv) violations.push(`H4: ${v}`);
    }

    // H5 — BD scratch doc re-homed
    facts.bdDocAtRoot = existsRel(BD_ROOT_DOC);
    facts.bdDocRehomed = existsRel(BD_REHOME);
    if (facts.bdDocAtRoot)
        violations.push(`H5: ${BD_ROOT_DOC} still at repo root (re-home it under docs/tranches/BD/)`);
    if (!facts.bdDocRehomed)
        violations.push(`H5: ${BD_REHOME} absent (the re-homed scratch doc must land under the tranche dir)`);

    return { violations, facts };
}

// ── Self-test bites (the anti-de-fang floor) ──────────────────────────────────
function selfTest() {
    const GOOD_IGNORE = "node_modules/\ntest-results/\n.tmp/\n.playwright/\n";
    const BAD_IGNORE = "node_modules/\n*.png\n"; // none of the three guards
    const GOOD_HOOK = 'TRANCHE="${GLASS_UI_ACTIVE_TRANCHE:-}"\nnode scripts/proof-live-verified-ledger.mjs --tranche="$TRANCHE"\n';
    const BAD_HOOK = "node scripts/proof-live-verified-ledger.mjs --tranche=BB\n";
    // a hardcoded literal in a COMMENT is not an executed stale-tranche bug — the
    // strip must ignore it (else this gate's own re-target comment self-reds).
    const COMMENT_HOOK = '# the prior --tranche=BB went stale\nTRANCHE="${GLASS_UI_ACTIVE_TRANCHE:-}"\nnode x.mjs --tranche="$TRANCHE"\n';

    return {
        // H3 — clean fixture passes, the planted gap reds
        gitignoreGoodPasses: gitignoreMissingGuards(GOOD_IGNORE).length === 0,
        gitignoreGapReds: gitignoreMissingGuards(BAD_IGNORE).length === SCRATCH_GUARDS.length,
        // H4 — env-driven fixture passes, the hardcoded `--tranche=BB` reds
        commitMsgEnvDrivenPasses: commitMsgViolations(GOOD_HOOK).length === 0,
        commitMsgHardcodedReds: commitMsgViolations(BAD_HOOK).some((v) => v.includes("hardcoded tranche literal")),
        // H4 — a literal inside a `#` comment is IGNORED (the executed line is env-driven)
        commitMsgCommentLiteralIgnored: commitMsgViolations(COMMENT_HOOK).length === 0,
    };
}

function run() {
    const { violations, facts } = detect();
    const bites = selfTest();
    const biteViolations = [];
    for (const [k, ok] of Object.entries(bites)) {
        if (!ok)
            biteViolations.push(
                `SELF-TEST: the \`${k}\` bite BROKE — the detector no longer distinguishes its planted fixture (the anti-de-fang floor)`,
            );
    }
    const allViolations = [...violations, ...biteViolations];
    const status = allViolations.length === 0 ? "pass" : "fail";

    const ARTIFACT = gateArtifactPath("GLASS_UI_GIT_HYGIENE_ARTIFACT", "BH-git-hygiene");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:git-hygiene",
        command: COMMAND,
        note: "BH.B0-W0-scratch-sweep device-free + git-aware hygiene gate — test-results untracked (H1) · dead .browserslistrc gone (H2) · .gitignore scratch-dir guards (H3) · commit-msg hook env-driven not --tranche=BB (H4) · BD scratch doc re-homed under docs/tranches/BD/ (H5). Makes the scratch-sweep DURABLE — a re-adopted artefact / re-introduced dead config / removed guard / re-stranded doc / re-hardcoded tranche letter all RED here.",
        facts: { ...facts, selfTests: bites },
        violations: allViolations,
    });

    console.log(`proof:git-hygiene — ${status.toUpperCase()}`);
    console.log(
        `  H1 tracked-test-results=${facts.trackedTestResults} (gitAware=${facts.gitAware}) H2 browserslist on-disk=${facts.browserslistOnDisk}/tracked=${facts.browserslistTracked}`,
    );
    console.log(
        `  H3 gitignore-missing=[${(facts.gitignoreMissingGuards ?? []).join(",")}] H4 hook-env-driven=${facts.commitMsgHookExists && (facts.commitMsgViolations ?? []).length === 0} H5 bd-doc rehomed=${facts.bdDocRehomed}/at-root=${facts.bdDocAtRoot}`,
    );
    if (allViolations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of allViolations) console.log(`  ✗ ${v}`);
    } else {
        console.log(`  artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    }
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
