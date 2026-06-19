#!/usr/bin/env node
// BC.W-FUZZY-HARDEN — glass-ui/search is ALREADY the canonical client fuzzy
// pipeline; this gate HARDENS the dock-composable-ready surface + machine-locks
// the `useAsyncSearch` BOOK decision + the one-directional fence (proof:fuzzy-harden).
//
// This is a HARDEN + DECIDE, NOT a re-author. The scorer/index/composable are
// BYTE-UNTOUCHED (they are SOTA-correct VSCode-subsequence matching —
// `words-subsume.md §3a` "no edit to the scorer"). The deliverable is the
// anti-regression LOCK over the matcher the dock depends on, plus the recorded
// async-race-guard verdict and the wrong-direction-leak fence.
//
// FH1 — the VSCode scorer arms intact (the 6 bonuses, content-hash frozen): a
//   silent re-tune of a bonus literal (+8/+7/+6/+5/+3/+1/-0.1) or a re-weight of
//   scoreEntry's label×12/type×10/text×3 fields reds.
// FH2 — the prefix-narrowing cache + multi-token AND-logic hold: searchIndex
//   carries the `q.slice(0,-1)` candidate re-use + the per-index WeakMap + the
//   200-cap clear; multiTokenFuzzy is AND (every token must match), not OR.
// FH3 — the dock-composable-ready surface is present + stable: useFuzzySearch
//   returns the full FuzzySearchState (query/results/selectedIndex/isOpen/
//   isExpanded/onKeydown/selectResult/close/open/toggleExpanded); SearchableItem
//   is the generic {id,label,text,type?}.
// FH4 — `useAsyncSearch` is BOOKED with the trigger recorded (the no-contrivance
//   decision): the decision artefact exists + records the BOOK verdict; NO
//   useAsyncSearch is minted in src/ (the no-single-consumer-abstraction fence).
// FH5 — the one-directional fence: glass-ui/search imports NO words-network type
//   (SearchParams/SearchResponse/useLookupSearch); no `@/api/search` words import.
//
// House style mirrors proof-accent-tone.mjs: ESM .mjs, comment-strip first (the
// false-witness discipline), a pure exported detector, a byte-stable JSON artefact
// via gate-output, a human summary, process.exit(1) on any violation + a self-test
// bite per clause.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const SEARCH = resolve(ROOT, "src/components/custom/search");
    _cliPaths = {
        ROOT,
        SEARCH_DIR: SEARCH,
        INDEX_TS: resolve(SEARCH, "composables/fuzzySearchIndex.ts"),
        USE_FUZZY_TS: resolve(SEARCH, "composables/useFuzzySearch.ts"),
        TYPES_TS: resolve(SEARCH, "composables/types.ts"),
        SRC_DIR: resolve(ROOT, "src"),
        DECISION_MD: resolve(ROOT, "docs/tranches/BC/audit/W-FUZZY-HARDEN-async-decision.md"),
        ARTIFACT: gateArtifactPath("GLASS_UI_FUZZY_HARDEN_ARTIFACT", "BC-fuzzy-harden"),
    };
    return _cliPaths;
}

// ── comment-strip (the false-witness discipline) ─────────────────────────────
function blankRange(text, start, end) {
    let out = "";
    for (let i = start; i < end; i++) out += text[i] === "\n" ? "\n" : " ";
    return out;
}
function stripBlockComments(text) {
    let result = "";
    let i = 0;
    while (i < (text?.length ?? 0)) {
        if (text[i] === "/" && text[i + 1] === "*") {
            const end = text.indexOf("*/", i + 2);
            const stop = end === -1 ? text.length : end + 2;
            result += blankRange(text, i, stop);
            i = stop;
        } else if (text[i] === "/" && text[i + 1] === "/") {
            let end = text.indexOf("\n", i + 2);
            if (end === -1) end = text.length;
            result += blankRange(text, i, end);
            i = end;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

function safeRead(path) {
    try {
        return readFileSync(path, "utf8");
    } catch {
        return "";
    }
}

// ── the content-hash freeze (FH1/FH2 anti-regression lock) ───────────────────
// Extracts the comment-STRIPPED, whitespace-normalized body of a named top-level
// function from the index source, then hashes it. A silent re-tune of any bonus
// literal or field weight changes the body → changes the hash → reds. The frozen
// baselines below are pinned over the SOTA-correct scorer at wave-open; they MUST
// only ever change by a deliberate re-author wave (which would re-pin them).
function extractFnBody(src, startRe) {
    const m = src.match(startRe);
    if (!m) return null;
    const i = m.index;
    let depth = 0;
    let started = false;
    let end = -1;
    for (let k = i; k < src.length; k++) {
        const c = src[k];
        if (c === "{") {
            depth++;
            started = true;
        } else if (c === "}") {
            depth--;
            if (started && depth === 0) {
                end = k + 1;
                break;
            }
        }
    }
    if (end === -1) return null;
    return src.slice(i, end);
}
function normHash(body) {
    if (body == null) return null;
    const norm = body.replace(/\s+/g, " ").trim();
    return createHash("sha256").update(norm).digest("hex").slice(0, 16);
}

// The frozen baselines (the BYTE-UNTOUCHED scorer at wave-open — `words-subsume.md
// §3a` "no edit to the scorer"). A drift here is a silent matcher re-tune.
const FROZEN = {
    fuzzyMatch: "8c7603233cb453af",
    multiTokenFuzzy: "2afe3a20db481d6e",
    scoreEntry: "212d94133494d17d",
    searchIndex: "504d29bd7453bcd6",
};

// The 6+1 scorer bonus literals that MUST appear at their sites (a coarse
// human-readable second lock alongside the content-hash — if the hash were ever
// re-pinned in error, this still flags a vanished bonus).
const BONUS_LITERALS = [
    { name: "+8 start-of-string", re: /cs\s*\+=\s*8/ },
    { name: "+7 word-separator", re: /cs\s*\+=\s*7/ },
    { name: "+6 camelCase", re: /cs\s*\+=\s*6/ },
    { name: "+5 consecutive-run", re: /cs\s*\+=\s*5/ },
    { name: "+3 prefix-align", re: /cs\s*\+=\s*3/ },
    { name: "+1 base per-char", re: /let\s+cs\s*=\s*1/ },
    { name: "-0.1 excess", re: /\*\s*0\.1/ },
];
const SCORE_WEIGHTS = [
    { name: "label×12", re: /entry\._lc\.label\s*,\s*12/ },
    { name: "type×10", re: /entry\._lc\.type\s*,\s*10/ },
    { name: "text×3", re: /entry\._lc\.text\s*,\s*3/ },
];

// The full dock-composable surface FuzzySearchState must return (FH3). A removed
// member (e.g. onKeydown) reds — the dock composes EXACTLY these.
const SURFACE_MEMBERS = [
    "query",
    "results",
    "selectedIndex",
    "isOpen",
    "isExpanded",
    "onKeydown",
    "selectResult",
    "close",
    "open",
    "toggleExpanded",
];
// The generic SearchableItem contract — NEVER narrowed to a consumer type.
const ITEM_FIELDS = ["id", "label", "text", "type"];
// The words-network types that must NEVER leak into glass-ui/search (FH5 — the
// wrong-direction-leak fence; the gate scans glass-ui's tree only).
const FOREIGN_NETWORK_TYPES = ["SearchParams", "SearchResponse", "useLookupSearch"];

// ── the pure detector ────────────────────────────────────────────────────────
/**
 * Pure over the read sources. Each witness pushes a falsifiable violation string.
 * `sources` carries the comment-STRIPPED file bodies + the disk facts.
 */
export function detectFuzzyHarden(sources) {
    const violations = [];
    const facts = {};

    const index = sources.index ?? "";
    const useFuzzy = sources.useFuzzy ?? "";
    const types = sources.types ?? "";
    const decisionExists = !!sources.decisionExists;
    const decisionMd = sources.decisionMd ?? "";
    const searchTreeFiles = sources.searchTreeFiles ?? []; // [{path, body}]
    const srcAsyncMints = sources.srcAsyncMints ?? []; // files minting useAsyncSearch in src/

    // ── FH1 — the VSCode scorer arms intact (6 bonuses, content-hash frozen) ──
    const hashes = {
        fuzzyMatch: normHash(extractFnBody(index, /export function fuzzyMatch/)),
        multiTokenFuzzy: normHash(extractFnBody(index, /function multiTokenFuzzy/)),
        scoreEntry: normHash(extractFnBody(index, /function scoreEntry/)),
        searchIndex: normHash(extractFnBody(index, /export function searchIndex/)),
    };
    const hashDrift = Object.keys(FROZEN).filter((k) => hashes[k] !== FROZEN[k]);
    const missingBonuses = BONUS_LITERALS.filter((b) => !b.re.test(index)).map((b) => b.name);
    const missingWeights = SCORE_WEIGHTS.filter((w) => !w.re.test(index)).map((w) => w.name);
    facts.fh1 = { hashes, frozen: FROZEN, hashDrift, missingBonuses, missingWeights };
    // scoreEntry + fuzzyMatch hashes lock the scorer; a drift means a silent re-tune.
    for (const k of ["fuzzyMatch", "scoreEntry"]) {
        if (hashDrift.includes(k))
            violations.push(
                `FH1: the ${k} content-hash drifted (${hashes[k]} ≠ frozen ${FROZEN[k]}) — the scorer was silently re-tuned (it is BYTE-UNTOUCHED this wave)`,
            );
    }
    if (missingBonuses.length)
        violations.push(`FH1: scorer bonus literal(s) vanished: ${missingBonuses.join(", ")}`);
    if (missingWeights.length)
        violations.push(`FH1: scoreEntry field weight(s) vanished: ${missingWeights.join(", ")}`);

    // ── FH2 — the prefix-narrowing cache + multi-token AND-logic hold ──
    const hasPrefixNarrow = /q\.slice\(0,\s*-1\)/.test(index) && /cache\.get\(prefix\)/.test(index);
    const hasWeakMapCache = /new WeakMap/.test(index) && /_cacheByIndex/.test(index);
    const has200Cap = /cache\.size\s*>\s*200/.test(index) && /cache\.clear\(\)/.test(index);
    // The AND-logic tell: every token must match — multiTokenFuzzy returns null the
    // FIRST time a token fails (`if (!m) return null;` INSIDE the token loop). An
    // OR-roll would return on the first token SUCCESS, or never early-return null.
    const multiBody = extractFnBody(index, /function multiTokenFuzzy/) ?? "";
    const andLogic = /for\s*\([^)]*token[^)]*\)\s*\{[\s\S]*?if\s*\(\s*!m\s*\)\s*return\s+null/.test(multiBody);
    // the OR bite: a `return m` / `return { score` INSIDE the token loop (before all
    // tokens are seen) is the first-match-wins OR-roll.
    const orRoll = /for\s*\([^)]*token[^)]*\)\s*\{[\s\S]*?if\s*\(\s*m\s*\)\s*return\b/.test(multiBody);
    const searchHashOk = !hashDrift.includes("searchIndex");
    const multiHashOk = !hashDrift.includes("multiTokenFuzzy");
    facts.fh2 = {
        hasPrefixNarrow,
        hasWeakMapCache,
        has200Cap,
        andLogic,
        orRoll,
        searchHashOk,
        multiHashOk,
    };
    if (!hasPrefixNarrow)
        violations.push("FH2: searchIndex lost the prefix-narrowing path (q.slice(0,-1) candidate re-use)");
    if (!hasWeakMapCache)
        violations.push("FH2: searchIndex lost the per-index WeakMap cache");
    if (!has200Cap) violations.push("FH2: searchIndex lost the 200-cap cache clear");
    if (!andLogic || orRoll)
        violations.push("FH2: multiTokenFuzzy is not AND-logic (every token must match; first-failing token returns null)");
    if (!searchHashOk)
        violations.push(`FH2: the searchIndex content-hash drifted — the cache path was silently changed`);
    if (!multiHashOk)
        violations.push(`FH2: the multiTokenFuzzy content-hash drifted — the AND-logic was silently changed`);

    // ── FH3 — the dock-composable-ready surface is present + stable ──
    const missingMembers = SURFACE_MEMBERS.filter(
        (m) => !new RegExp(`\\b${m}\\b`).test(useFuzzy),
    );
    // the surface must be the RETURNED object (a member referenced only in a comment
    // doesn't count) — assert each surface member appears in the return block.
    const returnBlock = (useFuzzy.match(/return\s*\{[\s\S]*?\}\s*as\s+FuzzySearchState/) || [])[0] ?? "";
    const missingInReturn = SURFACE_MEMBERS.filter(
        (m) => !new RegExp(`\\b${m}\\b`).test(returnBlock),
    );
    // SearchableItem stays generic {id,label,text,type?} — never narrowed.
    const itemBlock = (types.match(/interface SearchableItem\s*\{[\s\S]*?\}/) || [])[0] ?? "";
    const missingItemFields = ITEM_FIELDS.filter(
        (f) => !new RegExp(`\\b${f}\\b`).test(itemBlock),
    );
    // a consumer-type narrowing tell: an `extends` clause or a non-string field that
    // pins SearchableItem to a concrete consumer shape (status/owner/tags etc.).
    const itemNarrowed =
        /interface SearchableItem\s+extends\b/.test(types) ||
        /\b(status|owner|tags|tone|href|action)\s*[?:]?\s*:/.test(itemBlock);
    facts.fh3 = {
        missingMembers,
        missingInReturn,
        missingItemFields,
        itemNarrowed,
    };
    if (missingInReturn.length)
        violations.push(`FH3: useFuzzySearch return surface is missing member(s): ${missingInReturn.join(", ")}`);
    if (missingItemFields.length)
        violations.push(`FH3: SearchableItem is missing field(s): ${missingItemFields.join(", ")}`);
    if (itemNarrowed)
        violations.push("FH3: SearchableItem was narrowed to a consumer type (it must stay generic {id,label,text,type?})");

    // ── FH4 — `useAsyncSearch` is BOOKED with the trigger recorded ──
    const decisionRecordsBook = /verdict.*book|book.*verdict/i.test(decisionMd) ||
        /\*\*\s*verdict\s*:\s*book/i.test(decisionMd);
    const decisionRecordsTrigger = /mint trigger/i.test(decisionMd) && /consumer/i.test(decisionMd);
    facts.fh4 = {
        decisionExists,
        decisionRecordsBook,
        decisionRecordsTrigger,
        srcAsyncMints,
    };
    if (!decisionExists)
        violations.push("FH4: the async-decision artefact (W-FUZZY-HARDEN-async-decision.md) is absent");
    else {
        if (!decisionRecordsBook)
            violations.push("FH4: the async-decision artefact does not record the BOOK verdict");
        if (!decisionRecordsTrigger)
            violations.push("FH4: the async-decision artefact does not record the mint trigger + consumer count");
    }
    if (srcAsyncMints.length)
        violations.push(
            `FH4: a useAsyncSearch is minted in src/ (${srcAsyncMints.join(", ")}) — the no-single-consumer-abstraction fence (it is BOOKED, not minted)`,
        );

    // ── FH5 — the one-directional fence (no words-network leak into glass-ui/search) ──
    const leaks = [];
    for (const f of searchTreeFiles) {
        for (const t of FOREIGN_NETWORK_TYPES) {
            if (new RegExp(`\\b${t}\\b`).test(f.body)) leaks.push(`${f.path}: ${t}`);
        }
        if (/from\s*["']@\/api\/search["']/.test(f.body) || /from\s*["'].*\/stores\/search\//.test(f.body))
            leaks.push(`${f.path}: words-network import`);
    }
    facts.fh5 = { scanned: searchTreeFiles.length, leaks };
    if (leaks.length)
        violations.push(
            `FH5: words-network type/import leaked INTO glass-ui/search: ${leaks.join("; ")} (the matcher stays the glass-ui-owned client pipeline)`,
        );

    return { facts, violations };
}

// ── the self-test (a planted bite per clause MUST flag) ──────────────────────
function selfTest() {
    const fails = [];
    // The BASE is the LIVE source (so the self-test rides the real frozen hashes);
    // planted edits mutate copies. We read the live index/useFuzzy/types here.
    const p = cliPaths();
    const liveIndex = stripBlockComments(safeRead(p.INDEX_TS));
    const liveUseFuzzy = stripBlockComments(safeRead(p.USE_FUZZY_TS));
    const liveTypes = stripBlockComments(safeRead(p.TYPES_TS));
    const base = {
        index: liveIndex,
        useFuzzy: liveUseFuzzy,
        types: liveTypes,
        decisionExists: true,
        decisionMd: "**Verdict: BOOK**\n## The mint trigger\nconsumer #1 ...",
        searchTreeFiles: [{ path: "fuzzySearchIndex.ts", body: liveIndex }],
        srcAsyncMints: [],
    };
    const clean = detectFuzzyHarden(base);
    if (clean.violations.length) fails.push(`BASE should be clean, got: ${clean.violations.join(" | ")}`);

    // FH1 bite — re-tune the +8 start bonus to +9 (hash drift + the literal still
    // present as +9 so the bonus-literal check must also notice +8 vanished).
    const fh1 = detectFuzzyHarden({ ...base, index: liveIndex.replace("cs += 8", "cs += 9") });
    if (!fh1.violations.some((v) => v.startsWith("FH1")))
        fails.push("FH1 bite (+8→+9 re-tune) did not flag");

    // FH2 bite — flip multiTokenFuzzy to OR (return on the first token match).
    const orIndex = liveIndex.replace(
        "if (!m) return null;\n        total += m.score;",
        "if (m) return m;\n        total += m.score;",
    );
    const fh2 = detectFuzzyHarden({ ...base, index: orIndex });
    if (!fh2.violations.some((v) => v.startsWith("FH2")))
        fails.push("FH2 bite (OR-logic multiTokenFuzzy) did not flag");

    // FH2 bite — strip the prefix-narrow path.
    const noNarrow = liveIndex.replace(/const prefix = q\.slice\(0, -1\);/, "const prefix = q;");
    const fh2b = detectFuzzyHarden({ ...base, index: noNarrow });
    if (!fh2b.violations.some((v) => v.startsWith("FH2")))
        fails.push("FH2 bite (no prefix-narrow) did not flag");

    // FH3 bite — drop onKeydown from the return surface.
    const noKeydown = liveUseFuzzy.replace(/\n\s*onKeydown,/, "\n");
    const fh3 = detectFuzzyHarden({ ...base, useFuzzy: noKeydown });
    if (!fh3.violations.some((v) => v.startsWith("FH3")))
        fails.push("FH3 bite (dropped onKeydown) did not flag");

    // FH3 bite — narrow SearchableItem to a consumer type.
    const narrowed = liveTypes.replace(
        "export interface SearchableItem {",
        "export interface SearchableItem {\n    status: string;",
    );
    const fh3b = detectFuzzyHarden({ ...base, types: narrowed });
    if (!fh3b.violations.some((v) => v.startsWith("FH3")))
        fails.push("FH3 bite (narrowed SearchableItem) did not flag");

    // FH4 bite — a synthetic single-consumer useAsyncSearch minted in src/.
    const fh4 = detectFuzzyHarden({ ...base, srcAsyncMints: ["src/composables/useAsyncSearch.ts"] });
    if (!fh4.violations.some((v) => v.startsWith("FH4")))
        fails.push("FH4 bite (minted useAsyncSearch) did not flag");

    // FH4 bite — the decision artefact missing.
    const fh4b = detectFuzzyHarden({ ...base, decisionExists: false, decisionMd: "" });
    if (!fh4b.violations.some((v) => v.startsWith("FH4")))
        fails.push("FH4 bite (missing decision artefact) did not flag");

    // FH5 bite — a planted words-network import in glass-ui/search.
    const leakedBody = liveIndex + '\nimport type { SearchResponse } from "@/api/search";';
    const fh5 = detectFuzzyHarden({
        ...base,
        searchTreeFiles: [{ path: "fuzzySearchIndex.ts", body: leakedBody }],
    });
    if (!fh5.violations.some((v) => v.startsWith("FH5")))
        fails.push("FH5 bite (words-network leak) did not flag");

    return fails;
}

// ── disk scan helpers ────────────────────────────────────────────────────────
function walkFiles(dir, acc = []) {
    if (!existsSync(dir)) return acc;
    for (const name of readdirSync(dir)) {
        const full = join(dir, name);
        const st = statSync(full);
        if (st.isDirectory()) walkFiles(full, acc);
        else if (/\.(ts|tsx|vue)$/.test(name)) acc.push(full);
    }
    return acc;
}

function run() {
    const p = cliPaths();

    // The glass-ui/search tree (FH5 scans these for a wrong-direction leak).
    const searchTreeFiles = walkFiles(p.SEARCH_DIR).map((path) => ({
        path: path.slice(ROOT.length + 1),
        body: stripBlockComments(safeRead(path)),
    }));

    // FH4 — any useAsyncSearch minted anywhere in src/ (the fence). A file is a mint
    // if it DEFINES `useAsyncSearch` (export function / const = ); a mere reference
    // in a comment is already stripped.
    const srcAsyncMints = walkFiles(p.SRC_DIR)
        .filter((path) => {
            const body = stripBlockComments(safeRead(path));
            return /export\s+(async\s+)?function\s+useAsyncSearch\b/.test(body) ||
                /export\s+const\s+useAsyncSearch\b/.test(body);
        })
        .map((path) => path.slice(ROOT.length + 1));

    const sources = {
        index: stripBlockComments(safeRead(p.INDEX_TS)),
        useFuzzy: stripBlockComments(safeRead(p.USE_FUZZY_TS)),
        types: stripBlockComments(safeRead(p.TYPES_TS)),
        decisionExists: existsSync(p.DECISION_MD),
        decisionMd: safeRead(p.DECISION_MD),
        searchTreeFiles,
        srcAsyncMints,
    };

    const { facts, violations } = detectFuzzyHarden(sources);
    const selfTestFails = selfTest();
    for (const f of selfTestFails) violations.push(`SELF-TEST: ${f}`);

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(p.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:fuzzy-harden",
        facts,
        violations,
    });

    console.log("proof:fuzzy-harden — the canonical client fuzzy pipeline, hardened (BC.W-FUZZY-HARDEN)");
    console.log(
        `  FH1 scorer frozen (drift=[${facts.fh1.hashDrift.join(",")}], bonuses-missing=${facts.fh1.missingBonuses.length}, weights-missing=${facts.fh1.missingWeights.length}): ${facts.fh1.hashDrift.filter((k) => k === "fuzzyMatch" || k === "scoreEntry").length === 0 && facts.fh1.missingBonuses.length === 0 && facts.fh1.missingWeights.length === 0 ? "✓" : "✗"}`,
    );
    console.log(
        `  FH2 cache+AND (prefix=${facts.fh2.hasPrefixNarrow}, weakmap=${facts.fh2.hasWeakMapCache}, 200cap=${facts.fh2.has200Cap}, and=${facts.fh2.andLogic && !facts.fh2.orRoll}): ${facts.fh2.hasPrefixNarrow && facts.fh2.hasWeakMapCache && facts.fh2.has200Cap && facts.fh2.andLogic && !facts.fh2.orRoll && facts.fh2.searchHashOk && facts.fh2.multiHashOk ? "✓" : "✗"}`,
    );
    console.log(
        `  FH3 dock surface (missing-return=[${facts.fh3.missingInReturn.join(",")}], item-narrowed=${facts.fh3.itemNarrowed}): ${facts.fh3.missingInReturn.length === 0 && facts.fh3.missingItemFields.length === 0 && !facts.fh3.itemNarrowed ? "✓" : "✗"}`,
    );
    console.log(
        `  FH4 useAsyncSearch BOOKED (decision=${facts.fh4.decisionExists}, verdict-book=${facts.fh4.decisionRecordsBook}, src-mints=${facts.fh4.srcAsyncMints.length}): ${facts.fh4.decisionExists && facts.fh4.decisionRecordsBook && facts.fh4.decisionRecordsTrigger && facts.fh4.srcAsyncMints.length === 0 ? "✓" : "✗"}`,
    );
    console.log(
        `  FH5 one-directional fence (scanned=${facts.fh5.scanned}, leaks=${facts.fh5.leaks.length}): ${facts.fh5.leaks.length === 0 ? "✓" : "✗"}`,
    );
    console.log(`  self-test bites: ${selfTestFails.length === 0 ? "all flag ✓" : "BROKEN — " + selfTestFails.join("; ")}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${p.ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
