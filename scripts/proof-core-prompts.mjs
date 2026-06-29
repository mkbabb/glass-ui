#!/usr/bin/env node
// proof-core-prompts.mjs — BH.B6-core-prompts (W-core-prompts).
//
// The three reusable cleanup prompts ↔ STYLE.md self-consistency gate.
// `docs/tranches/BH/prompts/{LEGACY-EXCISION,RESTRUCTURE-BACKEND,RESTRUCTURE-
// FRONTEND}.md` (+ README) are the staged repo-local dispatch payloads B6 drafts;
// per the §2-#5 framing they promote to the precepts submodule by a by-name ask,
// never an in-repo mutation. The deliverable drifts SILENTLY: a prompt could lose
// its cross-link, drop the cite-the-edicts directive, or slip a STYLE.md banned
// word into the agent-facing payload — and nothing gated it. This gate locks the
// four close-conditions PLAN.md §B6 names ("prompts exist, cross-linked, cite the
// binding edicts; a self-consistency read — no STYLE.md banned words").
//
// House style mirrors proof-precept-current.mjs (read-LIVE-from-source so the gate
// cannot itself go stale + a pure detector + an inline self-test bite). ESM .mjs,
// byte-stable JSON artefact via gate-output, a human summary, exit(1) on violation.
//
// FOUR witnesses:
//   W1 — the four files exist with content (the 3 prompts + the README).
//   W2 — cross-linked: the README links all three prompts; each prompt links ≥1
//        sibling prompt (the recognizable-as-a-family discipline).
//   W3 — each prompt cites the binding edicts BY NAME — the "cite … by name"
//        directive is present AND ≥2 catalog edicts (god-modules, :deep()→:slotted,
//        :global(.dark), fail-explicit, version straddle, no-legacy, colocation, …)
//        are referenced. A directive with no named edict is an empty gesture.
//   W4 — the self-consistency read: NO STYLE.md banned word in any of the four
//        files (born-RED — RESTRUCTURE-FRONTEND carried "robust"). The banned list
//        is parsed LIVE from STYLE.md when the precepts submodule is present, with a
//        pinned snapshot fallback so the scan keeps biting when it is absent (the
//        proof:lineage-probe offline-safe pattern). "leverage" is the documented
//        mechanical-sense exception — excluded from the hard set.
// + the inline self-test bite: a synthetic prompt carrying a banned word AND a
//   README missing a cross-link FLAG; a clean synthetic flags NEITHER.

import { readFileSync, existsSync } from "node:fs";
import { resolve, relative } from "node:path";
import { pathToFileURL } from "node:url";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, writeGateArtifact, snapshotStamp } from "./gate-output.mjs";

const ARTIFACT = gateArtifactPath("GLASS_UI_CORE_PROMPTS_ARTIFACT", "BH-core-prompts");

const PROMPT_DIR = "docs/tranches/BH/prompts";
const PROMPT_FILES = [
    "LEGACY-EXCISION.md",
    "RESTRUCTURE-BACKEND.md",
    "RESTRUCTURE-FRONTEND.md",
];
const README_FILE = "README.md";
const STYLE_DOC = "docs/precepts/instructions/STYLE.md";

// The pinned banned-word snapshot, sourced from STYLE.md §"Banned words and
// phrases". The gate prefers the LIVE STYLE.md list (parsed below) when the
// precepts submodule is checked out; this snapshot keeps W4 biting when it is not.
// "leverage" is the documented mechanical-sense carve — never in the hard set.
const PINNED_BANNED = [
    "delve", "tapestry", "testament", "underscore", "pivotal", "robust",
    "navigate", "unleash", "foster", "align with", "ever-evolving", "bustling",
    "showcase", "landscape", "intricate", "in conclusion", "in the realm of",
    "it's worth noting",
];

// The binding-edict catalog the README names by name (the smells a prompt teaches).
// W3 counts how many a prompt references; ≥2 is the floor. Matched case-insensitive
// as substrings (a quoted edict, a hyphenated smell, an uppercased principle marker).
const EDICT_CATALOG = [
    "god module", "god-module", "no legacy", "fail-explicit", "fail explicit",
    "colocation", "colocate", ":deep(", ":slotted", ":global(.dark)",
    "version straddle", "backwards-compat", "no overfitting", "directory module",
    "generated, not hand-maintained", "one path", "abrogate",
];

// ── leaves ──────────────────────────────────────────────────────────────────────

const readRel = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : null;
};

// Parse the banned list LIVE from STYLE.md's "Do not use: …" sentence. Returns null
// when the doc (the submodule) is absent, so the caller falls back to the pinned
// snapshot. "leverage" is stripped — STYLE.md carves its mechanical sense.
export function parseBannedFromStyle(styleSrc) {
    if (!styleSrc) return null;
    const m = styleSrc.match(/Do not use:\s*([^.]*)\./);
    if (!m) return null;
    const list = m[1]
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter((s) => s.length > 0 && s !== "leverage");
    return list.length > 0 ? list : null;
}

// A banned term may be a single word (word-boundary match) or a phrase (flexible
// inner whitespace). Build a matcher per term; an apostrophe is literal.
function bannedMatcher(term) {
    const esc = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (/\s/.test(term)) {
        return new RegExp(esc.replace(/\s+/g, "\\s+"), "i");
    }
    return new RegExp(`\\b${esc}\\b`, "i");
}

// Find the 1-based line of the first banned hit in a file (for a legible violation).
function firstHitLine(content, re) {
    const lines = content.split("\n");
    for (let i = 0; i < lines.length; i++) {
        if (re.test(lines[i])) return i + 1;
    }
    return 0;
}

// ── the pure detector ─────────────────────────────────────────────────────────────
// `files` is { displayPath -> content }; the prompt keys are PROMPT_FILES, plus the
// README under README_FILE. `banned` is the resolved banned-word list.

export function detectCorePrompts({ files, banned }) {
    const violations = [];
    const facts = {};

    // ── W1 — the four files exist with content ──────────────────────────────────
    const expected = [README_FILE, ...PROMPT_FILES];
    const missing = [];
    for (const name of expected) {
        const c = files[name];
        if (c == null || c.trim().length === 0) missing.push(name);
    }
    facts.w1_missing = missing.length;
    for (const name of missing) {
        violations.push(`W1 ${PROMPT_DIR}/${name}: file absent or empty`);
    }

    // ── W2 — cross-linked ───────────────────────────────────────────────────────
    // The README links every prompt; each prompt links ≥1 sibling prompt. A link is
    // a markdown link whose target ends in the prompt FILENAME.
    const linksTo = (content, fileName) =>
        content != null &&
        new RegExp(`\\]\\([^)]*${fileName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\)`).test(content);

    let w2 = 0;
    const readme = files[README_FILE];
    for (const prompt of PROMPT_FILES) {
        if (!linksTo(readme, prompt)) {
            w2++;
            violations.push(`W2 ${PROMPT_DIR}/${README_FILE}: no link to \`${prompt}\``);
        }
    }
    for (const prompt of PROMPT_FILES) {
        const content = files[prompt];
        const siblings = PROMPT_FILES.filter((p) => p !== prompt);
        const linked = siblings.some((s) => linksTo(content, s));
        if (!linked) {
            w2++;
            violations.push(
                `W2 ${PROMPT_DIR}/${prompt}: links no sibling prompt (${siblings.join(", ")})`,
            );
        }
    }
    facts.w2_crosslinkGaps = w2;

    // ── W3 — each prompt cites the binding edicts by name ───────────────────────
    let w3 = 0;
    const edictCounts = {};
    for (const prompt of PROMPT_FILES) {
        const content = files[prompt] ?? "";
        const lower = content.toLowerCase();
        const directive = /cite[^.\n]*by name/i.test(content);
        const cited = EDICT_CATALOG.filter((e) => lower.includes(e.toLowerCase()));
        edictCounts[prompt] = cited.length;
        if (!directive) {
            w3++;
            violations.push(`W3 ${PROMPT_DIR}/${prompt}: missing the "cite … by name" edict directive`);
        }
        if (cited.length < 2) {
            w3++;
            violations.push(
                `W3 ${PROMPT_DIR}/${prompt}: references ${cited.length} catalog edicts (floor 2)`,
            );
        }
    }
    facts.w3_citationGaps = w3;
    facts.w3_edictCounts = edictCounts;

    // ── W4 — the self-consistency read (no STYLE.md banned word) ────────────────
    const matchers = banned.map((term) => ({ term, re: bannedMatcher(term) }));
    let w4 = 0;
    for (const name of expected) {
        const content = files[name];
        if (content == null) continue;
        for (const { term, re } of matchers) {
            if (re.test(content)) {
                w4++;
                violations.push(
                    `W4 ${PROMPT_DIR}/${name}:${firstHitLine(content, re)}: STYLE.md banned word "${term}"`,
                );
            }
        }
    }
    facts.w4_bannedHits = w4;

    return { facts, violations };
}

// ── the inline self-test bite ─────────────────────────────────────────────────────
// A SYNTHETIC dirty set (a banned word in a payload + a README missing a link) FLAGS
// both classes; a clean synthetic flags NEITHER. The bite is independent of the live
// files, so a future weakening (the detector silently passing a banned word) is
// caught here.

function selfTest(banned) {
    const failures = [];

    const cleanPrompt = (self, siblingA, siblingB) =>
        [
            `# ${self}`,
            "",
            `Pairs with [${siblingA}](./${siblingA}.md) and [${siblingB}](./${siblingB}.md).`,
            "",
            "THE PRINCIPLE (cite by name):",
            '- "No god modules": a sturdy seam.',
            '- "No legacy code": delete at the root.',
        ].join("\n");

    const cleanReadme = PROMPT_FILES.map(
        (p) => `| **[${p.replace(/\.md$/, "")}](./${p})** | a row |`,
    ).join("\n");

    const cleanFiles = {
        [README_FILE]: `# Reusable cleanup prompts\n\n${cleanReadme}\n`,
        "LEGACY-EXCISION.md": cleanPrompt("LEGACY-EXCISION", "RESTRUCTURE-BACKEND", "RESTRUCTURE-FRONTEND"),
        "RESTRUCTURE-BACKEND.md": cleanPrompt("RESTRUCTURE-BACKEND", "LEGACY-EXCISION", "RESTRUCTURE-FRONTEND"),
        "RESTRUCTURE-FRONTEND.md": cleanPrompt("RESTRUCTURE-FRONTEND", "LEGACY-EXCISION", "RESTRUCTURE-BACKEND"),
    };
    const cleanR = detectCorePrompts({ files: cleanFiles, banned });
    if (cleanR.violations.length !== 0) {
        failures.push(`self-test: CLEAN set false-flagged (${cleanR.violations.join("; ")})`);
    }

    // dirty: FRONTEND carries "robust" (banned) + README drops the LEGACY link.
    const dirtyFiles = {
        ...cleanFiles,
        "RESTRUCTURE-FRONTEND.md": cleanFiles["RESTRUCTURE-FRONTEND.md"].replace("a sturdy seam", "a robust seam"),
        [README_FILE]: `# Reusable cleanup prompts\n\n| **[RESTRUCTURE-BACKEND](./RESTRUCTURE-BACKEND.md)** | a row |\n| **[RESTRUCTURE-FRONTEND](./RESTRUCTURE-FRONTEND.md)** | a row |\n`,
    };
    const dirtyR = detectCorePrompts({ files: dirtyFiles, banned });
    if (dirtyR.facts.w4_bannedHits < 1) {
        failures.push("self-test: DIRTY set did not flag the planted banned word (W4 mute)");
    }
    if (dirtyR.facts.w2_crosslinkGaps < 1) {
        failures.push("self-test: DIRTY set did not flag the dropped README cross-link (W2 mute)");
    }

    return failures;
}

// ── runner ────────────────────────────────────────────────────────────────────────

function run() {
    const files = {};
    files[README_FILE] = readRel(`${PROMPT_DIR}/${README_FILE}`);
    for (const p of PROMPT_FILES) files[p] = readRel(`${PROMPT_DIR}/${p}`);

    // The banned list: LIVE from STYLE.md when the precepts submodule is checked out,
    // else the pinned snapshot (so the W4 scan bites on a submodule-absent runner).
    const styleSrc = readRel(STYLE_DOC);
    const liveBanned = parseBannedFromStyle(styleSrc);
    const banned = liveBanned ?? PINNED_BANNED;
    const bannedSource = liveBanned ? "live STYLE.md" : "pinned snapshot";

    const { facts, violations } = detectCorePrompts({ files, banned });
    const selfFailures = selfTest(banned);

    const allViolations = [...violations, ...selfFailures];
    const status = allViolations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:core-prompts",
        facts: { ...facts, bannedSource, bannedCount: banned.length, selfTestFailures: selfFailures.length },
        violations: allViolations,
    });

    console.log("proof:core-prompts — the 3 reusable cleanup prompts + README (BH.B6-core-prompts)");
    console.log(`  prompt dir            : ${PROMPT_DIR}`);
    console.log(`  banned-word source    : ${bannedSource} (${banned.length} terms)`);
    console.log(`  W1 missing files      : ${facts.w1_missing}`);
    console.log(`  W2 cross-link gaps    : ${facts.w2_crosslinkGaps}`);
    console.log(`  W3 citation gaps      : ${facts.w3_citationGaps}`);
    console.log(`  W4 banned-word hits   : ${facts.w4_bannedHits}`);
    console.log(`  self-test failures    : ${selfFailures.length}`);
    if (allViolations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of allViolations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${relative(ROOT, ARTIFACT)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
