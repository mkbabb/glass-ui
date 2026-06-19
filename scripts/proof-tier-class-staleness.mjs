#!/usr/bin/env node
// proof:tier-class-staleness — BC.W-FOURIER-DECIDES #12 (FOURIER-INBOUND Tier-4).
//
// THE GAP. `proof:consumer-staleness` catches the JS-import-resolution class — a
// consumer importing a DELETED symbol or a RETIRED subpath of @mkbabb/glass-ui.
// It does NOT scan consumer MARKUP for a retired CSS tier-class STRING. That is a
// DISTINCT, SILENT failure: glass-ui retires a tier-class on a clean break (no
// aliases — inv-7), and a consumer still writing `class="cartoon-card"` /
// `class="glass-subtle"` gets ZERO diagnostic — the surface renders FLAT (zero
// glass) for an era. The history: `.cartoon-card` + `.elevated-card` were removed
// at C.W5 (cards.css:2); fourier kept binding `cartoon-card` at 14 sites and got
// no error. This gate is the producer-side broadcast diagnostic for that class.
//
// THE MECHANISM (the spec). For every PRESENT consumer sibling, scan its
// .vue/.tsx/.html/.css markup for a `class=`/`:class=`/className literal containing
// a RETIRED_TIER_CLASSES member → WARN (a retired tier-class renders zero glass
// silently). It REUSES the proof:consumer-staleness constellation walk
// (CONSUMERS / resolveSibling / skipSibling) — it does NOT re-fork the sibling
// machinery (DRY). It is the producer-side mirror of value.js's inv-N-7
// self-emission probe.
//
//   - The consumer-markup arm is a WARN (a DIAGNOSTIC), NOT a hard-RED — the
//     consumer's markup is THEIR repo (the foreign-tree fence). The WARN is the
//     diagnostic the era LACKED. Born-RED IFF a present consumer writes a retired
//     class. `PROOF_TIER_CLASS_WARN_ONLY=1` keeps the WARN non-fatal for a
//     glass-ui-side green run while a present-consumer migration is open
//     (never wired into CI); default is fail-closed so the bite lands.
//   - The COMPLETENESS arm IS a hard-RED: every tier-class glass-ui's OWN
//     retirement records name as retired MUST be in RETIRED_TIER_CLASSES — a
//     retired-without-entry reds (glass-ui's own single-source discipline, the
//     proof:precept-current pattern). The set cannot fall behind the retirements.
//
// The companion consumer-side lint recipe (the consumer drops it into its own
// PostCSS/stylelint config) lives at docs/consumer-evidence/consumer-tier-class-lint.md.
//
// Born-RED at HEAD: the fourier sibling carries `cartoon-card`/`glass-subtle`
// markup → the consumer arm WARNs (fatal by default). Bite: a present consumer
// writes a retired tier-class → WARN; a retired class absent from the set → the
// completeness arm reds.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { CONSUMERS, ROOT, resolveSibling, skipSibling } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:tier-class-staleness";

// ── The single-sourced retired-tier-class set ────────────────────────────────
// A class is ADDED here when it is retired (the proof:precept-current discipline).
// The COMPLETENESS arm reds a retired class named in glass-ui's own retirement
// records but absent from this set, so the set cannot fall behind the retirements.
//   - cartoon-card / elevated-card — removed at C.W5 (cards.css:2).
//   - glass-subtle / glass-medium / glass-elevated — the pre-ladder tier strings
//     retired by the 5-rung glass-ladder re-model (the .glass-{subtle,medium}
//     cluster + the elevated tier; Q.W4 Lane F's phantom sweep).
export const RETIRED_TIER_CLASSES = [
    "cartoon-card",
    "elevated-card",
    "glass-subtle",
    "glass-medium",
    "glass-elevated",
];

// The glass-ui-own retirement RECORDS the completeness arm reads (the source of
// truth for "what glass-ui has retired"). Each entry: a file the comment/record
// lives in. The arm scans these for `.<class>` tokens flagged as removed/retired
// and asserts every such class is in RETIRED_TIER_CLASSES. cards.css:2 records the
// `.cartoon-card` + `.elevated-card` C.W5 removal in prose.
const RETIREMENT_RECORD_FILES = ["src/styles/cards.css"];

const SRC_EXT = /\.(vue|tsx|jsx|html|css)$/;
const SKIP_DIRS = new Set([
    "node_modules",
    "dist",
    ".git",
    ".cache",
    ".nuxt",
    "coverage",
]);

const rel = (p) => p.replace(ROOT + "/", "").replace(/.*\/Programming\//, "../");

// ── Class-usage detection ─────────────────────────────────────────────────────
// A retired tier-class is a true phantom only when used AS A CSS CLASS — inside a
// `class=`/`:class=`/`className` attribute literal, a class-list string, or a
// `.selector`. Prose in a comment, a `variant=` enum token, or text content are
// NOT phantom references (the proof:phantom-classes isClassUsage discipline,
// distilled). Returns true when `cls` appears in a class position on the line.
function lineHasClassUsage(line, cls) {
    // Skip block-comment continuation lines (` * …`) — documentation, not markup.
    if (/^\s*\*/.test(line)) return false;
    // (1) class / className attribute value containing the token. Find the attr's
    //     quoted value, then test the token is a whole space-fenced class within it
    //     (so `cartoon-card` matches but `cartoon-cards` does not). The token may be
    //     the FIRST class in the value (quote-delimited) or any later one (space-
    //     delimited) — a leading-fence regex would miss the first-class case.
    const attrMatch = line.match(/(?::|\b)class(?:Name)?\s*=\s*(["'`])([^"'`]*)\1/);
    if (attrMatch) {
        const classFenced = new RegExp(`(^|[^-A-Za-z0-9_])${cls}([^-A-Za-z0-9_]|$)`);
        if (classFenced.test(` ${attrMatch[2]} `)) return true;
    }
    // (2) a `.selector` (CSS) — the leading dot immediately before the token, and
    //     NOT inside a backtick-wrapped markdown inline-code span (prose).
    const selRe = new RegExp(`\\.${cls}([^-A-Za-z0-9_]|$)`);
    const m = line.match(selRe);
    if (m) {
        const before = line.slice(0, m.index);
        // a `.name` wrapped in backticks is markdown inline-code in a comment.
        const backticks = (before.match(/`/g) || []).length;
        if (backticks % 2 === 0) return true;
    }
    return false;
}

function walk(dir, out = []) {
    let entries;
    try {
        entries = readdirSync(dir, { withFileTypes: true });
    } catch {
        return out;
    }
    for (const e of entries) {
        if (e.name.startsWith(".") && e.name !== ".") continue;
        const p = join(dir, e.name);
        if (e.isDirectory()) {
            if (SKIP_DIRS.has(e.name)) continue;
            walk(p, out);
        } else if (SRC_EXT.test(e.name)) {
            out.push(p);
        }
    }
    return out;
}

// ── Scan one present consumer's markup for retired tier-class strings ─────────
function scanConsumer(dir, roots) {
    const hits = [];
    for (const root of roots ?? []) {
        if (!existsSync(root)) continue; // multi-root: a present repo may lack one
        for (const file of walk(root)) {
            const text = readFileSync(file, "utf8");
            if (!RETIRED_TIER_CLASSES.some((c) => text.includes(c))) continue;
            const lines = text.split("\n");
            for (let i = 0; i < lines.length; i++) {
                for (const cls of RETIRED_TIER_CLASSES) {
                    if (lineHasClassUsage(lines[i], cls)) {
                        hits.push({ file, line: i + 1, cls });
                    }
                }
            }
        }
    }
    return hits;
}

// ── The COMPLETENESS arm — the single-source discipline (hard-RED) ────────────
// Every tier-class glass-ui's own retirement RECORDS name as removed/retired must
// be in RETIRED_TIER_CLASSES. Reads RETIREMENT_RECORD_FILES for `.<class>` tokens
// in a removed/retired-flagged sentence; a class so named but absent from the set
// reds (a retired-without-entry — the set fell behind the retirement).
function completenessGaps() {
    const set = new Set(RETIRED_TIER_CLASSES);
    const gaps = [];
    for (const recFile of RETIREMENT_RECORD_FILES) {
        const p = join(ROOT, recFile);
        if (!existsSync(p)) continue;
        const text = readFileSync(p, "utf8");
        // Only sentences that FLAG a removal/retirement (the record prose). The
        // cards.css:2 form: "`.cartoon-card` + `.elevated-card` recipe classes
        // were removed at C.W5".
        for (const sentence of text.split(/(?<=[.])\s/)) {
            if (!/\b(removed|retired|deleted)\b/i.test(sentence)) continue;
            for (const m of sentence.matchAll(/[`.]([a-z][a-z0-9-]*-(?:card|subtle|medium|elevated))\b/gi)) {
                const cls = m[1];
                if (!set.has(cls)) gaps.push({ file: recFile, cls });
            }
        }
    }
    return gaps;
}

// ── Walk every present consumer sibling ───────────────────────────────────────
const consumerHits = []; // {repo, file, line, cls}
const checkedRepos = [];
const skippedRepos = [];

for (const consumer of CONSUMERS) {
    if (consumer.self) continue; // glass-ui's own markup is not a "consumer" of itself
    const r = resolveSibling(consumer);
    if (!r.present) {
        skipSibling("proof:tier-class-staleness", consumer);
        skippedRepos.push(consumer.id);
        continue;
    }
    checkedRepos.push(consumer.id);
    for (const h of scanConsumer(consumer.dir, consumer.roots)) {
        consumerHits.push({ repo: consumer.id, ...h });
    }
}

const gaps = completenessGaps();

// ── The self-test bite (the diagnostic is falsifiable) ────────────────────────
// 1. a synthetic consumer-markup `class="cartoon-card"` line is detected as a
//    class usage (the WARN bite); a comment-prose mention is NOT.
// 2. a retired class absent from the set is flagged by the completeness scan.
function selfTest() {
    const bites = [];
    bites.push({
        id: "synthetic-class-attr-warns",
        pass: lineHasClassUsage('  <div class="cartoon-card config-card">', "cartoon-card"),
    });
    bites.push({
        id: "prose-mention-not-flagged",
        pass: !lineHasClassUsage(" * the cartoon-card recipe was removed at C.W5", "cartoon-card"),
    });
    // a doctored record naming a NOT-in-set retired class is caught by the same
    // sentence-scan predicate the completeness arm runs.
    const doctored = "The `.phantom-card` recipe was removed at Z.W9.";
    const set = new Set(RETIRED_TIER_CLASSES);
    let missingCaught = false;
    for (const m of doctored.matchAll(/[`.]([a-z][a-z0-9-]*-(?:card|subtle|medium|elevated))\b/gi)) {
        if (/\b(removed|retired|deleted)\b/i.test(doctored) && !set.has(m[1])) missingCaught = true;
    }
    bites.push({ id: "retired-missing-from-set-reds", pass: missingCaught });
    return bites;
}
const bites = selfTest();
const allBitesPass = bites.every((b) => b.pass);

// ── Report ────────────────────────────────────────────────────────────────────
const warnOnly = process.env.PROOF_TIER_CLASS_WARN_ONLY === "1";

console.log("proof:tier-class-staleness — the retired-CSS-tier-class consumer-markup gate (BC.W-FOURIER-DECIDES #12)");
console.log(`  retired tier-classes  : ${RETIRED_TIER_CLASSES.join(", ")}`);
console.log(`  consumers checked     : ${checkedRepos.join(", ") || "(none present)"}`);
if (skippedRepos.length)
    console.log(`  siblings skipped      : ${skippedRepos.join(", ")} (registry-default; CI-expected)`);
console.log(`  consumer-markup WARNs : ${consumerHits.length}`);
console.log(`  completeness gaps     : ${gaps.length}`);

for (const h of consumerHits)
    console.error(
        `  WARN  ${h.repo} ${rel(h.file)}:${h.line}  class="${h.cls}" — a RETIRED glass-ui tier-class renders zero glass silently (migrate to the current tier; see docs/consumer-evidence/consumer-tier-class-lint.md)`,
    );
for (const g of gaps)
    console.error(
        `  COMPLETENESS  ${g.file}  records ".${g.cls}" as retired but it is ABSENT from RETIRED_TIER_CLASSES — add it (the single-source discipline; the set fell behind the retirement)`,
    );
for (const b of bites)
    console.log(`  self-test: ${b.id} ${b.pass ? "✓" : "✗ FAILED"}`);

// completeness gaps + a failed self-test are ALWAYS fatal (glass-ui's own
// discipline). The consumer-markup WARNs are fatal by default (the bite) but the
// WARN_ONLY escape keeps a glass-ui-side green run while a present-consumer
// migration is open (never wired into CI).
const hardFail = gaps.length > 0 || !allBitesPass;
const warnFail = consumerHits.length > 0 && !warnOnly;
const pass = !hardFail && !warnFail;

const ARTIFACT = gateArtifactPath(
    "GATE_TIER_CLASS_STALENESS_OUT",
    "BC-tier-class-staleness",
);
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:tier-class-staleness",
    command: COMMAND,
    note: "BC.W-FOURIER-DECIDES #12 — the producer-side retired-CSS-tier-class consumer-markup diagnostic, reusing the proof:consumer-staleness constellation walk. Consumer-markup arm WARNs (foreign-tree fence; fatal-by-default, PROOF_TIER_CLASS_WARN_ONLY=1 to grace an open migration); the COMPLETENESS arm hard-REDs a retired-without-set-entry (single-source). Pairs with docs/consumer-evidence/consumer-tier-class-lint.md (the consumer-side recipe).",
    retiredTierClasses: RETIRED_TIER_CLASSES,
    consumersChecked: checkedRepos,
    siblingsSkipped: skippedRepos,
    consumerWarns: consumerHits.map((h) => ({ repo: h.repo, file: rel(h.file), line: h.line, cls: h.cls })),
    completenessGaps: gaps,
    selfTest: bites,
});

if (!pass) {
    if (gaps.length)
        console.error(
            `\n[proof:tier-class-staleness] ${gaps.length} completeness gap(s) — a class glass-ui retired is absent from RETIRED_TIER_CLASSES. Add it (the single-source discipline).`,
        );
    if (!allBitesPass)
        console.error(
            `\n[proof:tier-class-staleness] a self-test bite failed — the diagnostic is no longer falsifiable.`,
        );
    if (warnFail)
        console.error(
            `\n[proof:tier-class-staleness] ${consumerHits.length} present-consumer site(s) write a RETIRED glass-ui tier-class — it renders zero glass silently. Migrate the site(s) to the current tier, or set PROOF_TIER_CLASS_WARN_ONLY=1 for a glass-ui-side green run while the consumer migration is open (never wired into CI). The consumer wires the lint recipe (docs/consumer-evidence/consumer-tier-class-lint.md).`,
        );
    process.exit(1);
}
console.log(
    "\n[proof:tier-class-staleness] no present consumer writes a retired glass-ui tier-class, the retired-class set is single-source-complete, and the self-test bite holds.",
);
