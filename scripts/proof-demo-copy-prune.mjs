#!/usr/bin/env node
// proof:demo-copy-prune — de-jargon the user-facing demo copy + kill the dead
// view-source subsystem + the orphan demo scaffolds (BC.W-DEMO-COPY-PRUNE).
//
// A consumer reading the storybook never sees internal repo machinery leak through
// the glass. A blurb describes the COMPONENT — what it paints, how a designer uses
// it — not the wave/precept/build-diff that produced it. The view-source SUBSYSTEM
// is gone in full (the dead loader composable + the dead manifest field). The orphan
// demo scaffolds (a play/reset harness with zero story consumers, a tone swatch built
// for a migration that never landed) are deleted, and every cut is recorded.
//
// Pure FS, device-free. A prune of dead copy / dead orphans paints ZERO new pixels
// (the BB "register-disposition flip carries no gestalt verdict" precedent), so the
// painted render is the BC.W-PAGE-CHASSIS / W-STORYBOOK-META gestalt verdict; this is
// the de-jargon ABSENCE arm.
//
// Asserts (born-RED on HEAD → GREEN at close):
//   D1 — no leaked internal jargon in RENDERED copy. ZERO wave-ID
//        (\b[A-Z]{1,2}\.W- , \bW-[A-Z]{3,}), tokens-§-number (§[0-9N]), φ-notation
//        (φ\^), or build-provenance phrase (byte-identical / byte-unchanged /
//        ABROGATED-as-rendered) survives inside a RENDERED string in
//        demo/stories/**/*.{vue,ts}. The detector STRIPS <!-- … --> + // + /* */
//        comments before scanning (the conservatism fence — comments are provenance,
//        never pruned). Allowlist: the public RETUNE-knob token names (--glass-*,
//        --scale-*, --dock-* …) are KEPT (a token a consumer overrides is legitimate
//        teaching — the FENCE is §N / W-X, not --token).
//   D2 — the dead view-source + orphan scaffolds are GONE. The grep targets
//        (useSourceLoader / useStoryDemo / ToneSwatch / sourceFiles) have ZERO
//        reference across demo/ src/ tests/ (the files deleted, the field gone, the
//        src/index.ts comment reconciled). Each delete's pre-flight grep is RE-RUN in
//        the gate (the anti-stale-prune floor).
//   D3 — the PRUNE-LEDGER.md records each cut with its path + why + the pre-flight
//        verification (the no-silent-prune floor; the shared ledger carries both
//        waves' rows).
//
// Self-test bites: a synthetic re-added blurb="… W-FOO …" REDs D1; a synthetic
// re-added §9 in a rendered string REDs D1; a synthetic <!-- W-BAR provenance -->
// comment does NOT red (the comment-strip distinguishing bite); a synthetic
// re-imported useStoryDemo REDs D2; a synthetic re-added sourceFiles: manifest row
// REDs D2.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:demo-copy-prune";
const SELF_TEST = process.argv.includes("--self-test");

const STORIES_DIR = resolve(ROOT, "demo/stories");
const MANIFEST = "demo/stories/manifest.ts";
const LEDGER = "docs/tranches/BC/audit/PRUNE-LEDGER.md";

// The dead-helper grep targets (D2). Each must have ZERO reference across the
// scanned trees (its def deleted, every reference reconciled).
const DEAD_GREP_DIRS = ["demo", "src", "tests"];
const DEAD_TARGETS = [
    "useSourceLoader",
    "useStoryDemo",
    "ToneSwatch",
    "sourceFiles",
];

function read(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// Strip // line + /* block */ + <!-- vue --> comments so a prose mention in a
// comment is not mistaken for a rendered string. D1 scans the STRIPPED text — a
// jargon mention in a <!-- provenance --> / // note is internal-authoring metadata
// that NEVER renders (the conservatism fence). The strip preserves newline structure
// so a self-test sabotage can target a single line.
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");
}

// Recursively gather every demo/stories/**/*.{vue,ts} (for the D1 string scan).
function allStoryFiles(dir = STORIES_DIR, acc = []) {
    if (!existsSync(dir)) return acc;
    for (const f of readdirSync(dir)) {
        const p = resolve(dir, f);
        if (statSync(p).isDirectory()) allStoryFiles(p, acc);
        else if (/\.(vue|ts)$/.test(f)) acc.push(p);
    }
    return acc;
}

// Recursively gather every scanned-tree file for the D2 grep (broad — any text
// reference to a dead helper reds, mirroring `grep -rn target demo/ src/ tests/`).
function allTreeFiles(dir, acc = []) {
    if (!existsSync(dir)) return acc;
    for (const f of readdirSync(dir)) {
        const p = resolve(dir, f);
        if (statSync(p).isDirectory()) allTreeFiles(p, acc);
        else if (/\.(vue|ts|tsx|js|mjs)$/.test(f)) acc.push(p);
    }
    return acc;
}

// ── D1 jargon detectors (each runs over a STRIPPED, comment-free line). ──
// The fence is §N / W-X / φ^ / build-provenance — NOT a --token (a public
// retune-knob a consumer overrides is legitimate teaching).
const JARGON = [
    { key: "wave-id-dotted", re: /\b[A-Z]{1,2}\.W-/ }, // AZ.W- , BB.W-
    { key: "wave-id-bare", re: /\bW-[A-Z]{3,}/ }, // W-NOGRAY , W-LENSING
    { key: "section-number", re: /§[0-9N]/ }, // §6 , §N6
    { key: "phi-notation", re: /φ\^/ }, // φ^(9/2)
    {
        key: "build-provenance",
        re: /\b(byte-identical|byte-unchanged|ABROGATED)\b/,
    },
];

function jargonHits(corpusParts) {
    const hits = [];
    for (const c of corpusParts) {
        const lines = c.text.split("\n");
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            for (const d of JARGON) {
                if (d.re.test(line)) {
                    hits.push({ path: c.path, line: i + 1, key: d.key, text: line.trim() });
                }
            }
        }
    }
    return hits;
}

// ── The detector — runs over a SOURCE MAP so the self-test can sabotage inputs.
// `overrides`: { storiesText?, manifest?, ledger?, deadInjected?[] }.
function detect(overrides = {}) {
    const violations = [];
    const facts = {};
    function assert(label, ok) {
        facts[label] = Boolean(ok);
        if (!ok) violations.push(label);
    }

    const ledger = overrides.ledger ?? read(LEDGER);

    // ── D1 — no leaked internal jargon in RENDERED (comment-stripped) copy. ──
    // `corpusOnly` REPLACES the real corpus (the self-test isolates a single
    // synthetic so the real tree's state does not confound the bite); `storiesText`
    // APPENDS to the real corpus (the live-tree-plus-sabotage case).
    let corpusParts;
    if (overrides.corpusOnly) {
        corpusParts = [
            {
                path: "demo/stories/__synthetic__.vue",
                text: stripComments(overrides.corpusOnly),
            },
        ];
    } else {
        const realFiles = allStoryFiles();
        corpusParts = realFiles.map((p) => ({
            path: p.slice(ROOT.length + 1),
            text: stripComments(readFileSync(p, "utf8")),
        }));
        if (overrides.storiesText) {
            corpusParts.push({
                path: "demo/stories/__synthetic__.vue",
                text: stripComments(overrides.storiesText),
            });
        }
    }
    const d1Hits = jargonHits(corpusParts);
    facts.jargonHits = d1Hits;
    assert("D1 — zero leaked internal jargon in rendered demo copy", d1Hits.length === 0);

    // ── D2 — the dead view-source + orphan scaffolds are GONE (grep-re-run). ──
    // Build the reference corpus over demo/ src/ tests/ (the pre-flight grep, the
    // anti-stale-prune floor). A self-test can inject a synthetic reference.
    const treeFiles = [];
    for (const d of DEAD_GREP_DIRS) allTreeFiles(resolve(ROOT, d), treeFiles);
    const refCorpus = treeFiles.map((p) => ({
        path: p.slice(ROOT.length + 1),
        text: readFileSync(p, "utf8"),
    }));
    if (overrides.manifest) {
        refCorpus.push({ path: "demo/stories/__manifest__.ts", text: overrides.manifest });
    }
    if (overrides.deadInjected) {
        for (const inj of overrides.deadInjected) {
            refCorpus.push({ path: "demo/__synthetic__.vue", text: inj });
        }
    }
    const deadRefs = {};
    let deadTotal = 0;
    for (const t of DEAD_TARGETS) {
        const re = new RegExp(`\\b${t}\\b`);
        const hits = refCorpus.filter((c) => re.test(c.text)).map((c) => c.path);
        deadRefs[t] = hits;
        deadTotal += hits.length;
    }
    facts.deadRefs = deadRefs;
    assert(
        "D2 — the dead view-source + orphan scaffolds are GONE (zero reference)",
        deadTotal === 0,
    );
    // The deleted-file absence witness (the structural twin of the grep).
    const deletedFiles = [
        "demo/composables/useSourceLoader.ts",
        "demo/composables/useStoryDemo.ts",
        "tests/useStoryDemo.spec.ts",
        "demo/stories/ToneSwatch.vue",
    ];
    const survivors = deletedFiles.filter((f) => existsSync(resolve(ROOT, f)));
    facts.deletedFileSurvivors = survivors;
    assert("D2 — the 4 orphan files are deleted on disk", survivors.length === 0);

    // ── D3 — the PRUNE-LEDGER records the demo-content cuts. ──
    assert("D3 — PRUNE-LEDGER.md exists", ledger.length > 0);
    assert(
        "D3 — ledger records the view-source subsystem cut",
        /useSourceLoader/.test(ledger) && /sourceFiles/.test(ledger),
    );
    assert(
        "D3 — ledger records the useStoryDemo + ToneSwatch orphan cut",
        /useStoryDemo/.test(ledger) && /ToneSwatch/.test(ledger),
    );
    assert(
        "D3 — ledger records the de-jargon move with the pre-flight",
        /de-jargon/i.test(ledger) && /pre-flight/i.test(ledger),
    );

    return { facts, violations };
}

// ── The self-test bites (anti-evasion) — each sabotage REDs (or, for the
// comment-strip bite, does NOT red) its clause. Proves the gate is not vacuous.
function selfTest() {
    let flagged = 0;
    const sab = (overrides, clauseLabels, name) => {
        const { violations } = detect(overrides);
        const tripped = clauseLabels.some((l) => violations.includes(l));
        if (tripped) flagged++;
        else
            throw new Error(
                `[proof:demo-copy-prune self-test] the bite FAILED to flag the sabotage: ${name}`,
            );
    };
    const sabNot = (overrides, clauseLabels, name) => {
        const { violations } = detect(overrides);
        const tripped = clauseLabels.some((l) => violations.includes(l));
        if (!tripped) flagged++;
        else
            throw new Error(
                `[proof:demo-copy-prune self-test] the comment-strip bite WRONGLY flagged: ${name}`,
            );
    };
    // D1: a blurb carrying a wave-ID → REDs D1 (isolated synthetic corpus).
    sab(
        { corpusOnly: `<StorySection blurb="The lit glass over the field — W-FOO material." />` },
        ["D1 — zero leaked internal jargon in rendered demo copy"],
        "D1 wave-ID re-added",
    );
    // D1: a §9 in a rendered string → REDs D1 (isolated synthetic corpus).
    sab(
        { corpusOnly: `<StorySection label="Easing doctrine (§9)" />` },
        ["D1 — zero leaked internal jargon in rendered demo copy"],
        "D1 section-number re-added",
    );
    // D1 (distinguishing): a jargon mention INSIDE a comment must NOT red (the
    // conservatism fence — comments are provenance, never pruned). Isolated so the
    // real tree's state does not confound the bite.
    sabNot(
        { corpusOnly: `<!-- W-BAR provenance — the §6 doctrine note. -->\n<p>Clean copy.</p>` },
        ["D1 — zero leaked internal jargon in rendered demo copy"],
        "comment-strip distinguishing bite",
    );
    // D2: re-import useStoryDemo → REDs D2.
    sab(
        { deadInjected: [`import { useStoryDemo } from "../composables/useStoryDemo";`] },
        ["D2 — the dead view-source + orphan scaffolds are GONE (zero reference)"],
        "D2 useStoryDemo re-imported",
    );
    // D2: re-add a sourceFiles: manifest row → REDs D2.
    sab(
        { manifest: `const x = { sourceFiles: ["./a.vue"] };` },
        ["D2 — the dead view-source + orphan scaffolds are GONE (zero reference)"],
        "D2 sourceFiles re-added",
    );
    return flagged;
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_DEMO_COPY_PRUNE_ARTIFACT",
        "BC-demo-copy-prune",
    );

    const selfTestCount = selfTest();
    const { facts, violations } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:demo-copy-prune",
        command: COMMAND,
        selfTestChecks: selfTestCount,
        facts,
        violations,
    });

    console.log("proof:demo-copy-prune — every rendered demo word teaches the component");
    console.log(
        `  D1 no jargon in rendered  : ${facts["D1 — zero leaked internal jargon in rendered demo copy"]}`,
    );
    console.log(
        `  D2 dead helpers GONE      : ${facts["D2 — the dead view-source + orphan scaffolds are GONE (zero reference)"]}`,
    );
    console.log(
        `  D2 4 orphans deleted      : ${facts["D2 — the 4 orphan files are deleted on disk"]}`,
    );
    console.log(`  D3 ledger records cuts    : ${facts["D3 — PRUNE-LEDGER.md exists"]}`);
    console.log(
        `  self-test (bite proof)    : OK — ${selfTestCount} synthetic sabotages handled (D1×3 incl. comment-strip + D2×2)`,
    );
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
        if (facts.jargonHits?.length) {
            console.log("  jargon hits:");
            for (const h of facts.jargonHits)
                console.log(`    ${h.path}:${h.line} [${h.key}] ${h.text}`);
        }
        if (facts.deadRefs) {
            for (const [t, paths] of Object.entries(facts.deadRefs))
                if (paths.length) console.log(`  dead ref ${t}: ${JSON.stringify(paths)}`);
        }
        if (facts.deletedFileSurvivors?.length)
            console.log(`  un-deleted: ${JSON.stringify(facts.deletedFileSurvivors)}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );

    if (SELF_TEST) {
        console.log(
            `\n[proof:demo-copy-prune --self-test] ${selfTestCount} bite(s) handled; ledger ${status === "pass" ? "GREEN" : "RED"}`,
        );
    }
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
