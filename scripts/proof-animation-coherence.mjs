#!/usr/bin/env node
// AX.W05 — ONE iOS-spring vocabulary (the animation-coherence gate).
//
// The library carried TWO competing iOS-spring authorities: the regen
// `--spring-*` linear() cohort (smooth/snappy/bouncy/gentle, sampled from the
// keyframes.js SpringProgress ODE via regen-spring-tokens.mjs) AND a predecessor
// cubic-bezier `--motion-ease-apple-spring: cubic-bezier(0.175, 0.885, 0.32,
// 1.275)` (the ~+27.5% overshoot curve) with its `--ease-apple-spring` alias.
// Two vocabularies for one motion class, with no governing rationale tying a
// surface to a register — the canonical no-legacy violation. The bezier is
// EXCISED; every consumer re-points onto the governed register set, and this
// gate proves no second authority survives.
//
// Three device-free SOURCE/RESOLUTION arms, all hard-RED on every runner:
//
//   (A) SURVIVOR SWEEP (deletion-proof). Zero `--ease-apple-spring` /
//       `--motion-ease-apple-spring` definitions OR consumers under src/. A
//       comment-stripped scan (a doc reference to the retired token is NOT a
//       survivor). Born-RED at HEAD (2 defs + the live consumers).
//
//   (B) CONSUMER-COVERAGE (no-overfitting, fail-closed). Every `--spring-X`
//       token defined in tokens.css has at least ONE consumer — a direct
//       `var(--spring-X)` read in src/, OR a `--ease-spring-X` theme alias that
//       itself reaches a consumer (the alias is a public @theme register). A
//       generated preset with zero reach is a dead token the generator can mint
//       silently.
//
//   (C) GOVERNED RATIONALE. Every `--spring-X` preset in regen-spring-tokens.mjs
//       carries a surface-class register name in its `comment` (the single
//       source the governing doc-table derives from). A preset with a bare
//       physics-only comment (no `register:` segment) fails — the vocabulary
//       stays governed, not just generated.
//
// Plus a cross-repo CONSTELLATION CENSUS (the publish-gated forcing function):
// grep the constellation consumers (speedtest et al.) for `var(--ease-apple-
// spring)` reads with no local definition. A consumer reading the deleted token
// resolves it empty (the transition degrades to instant/linear, NO error — the
// silent clean-break). The census fails CLOSED while such a read survives, and
// stays RED until the consumer-adoption leg lands (W34, gated on the AX
// publish). A sibling not checked out is a graceful skip (registry-default).
//
// House style mirrors scripts/proof-vt-names.mjs: ESM .mjs, comment-strip first,
// walk src/, emit a JSON artefact, print a human summary, process.exit(1) on
// violation (fail-closed). Pure detectors are exported for the spec.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { CONSUMERS, resolveSibling } from "./constellation.mjs";

// Lazy, memoized CLI paths — importing this module for its pure detectors
// (scripts/__tests__/proof-animation-coherence.test.ts) must not run
// fileURLToPath(import.meta.url), which throws under vitest's module runner.
let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        SRC: resolve(ROOT, "src"),
        TOKENS: resolve(ROOT, "src/styles/tokens.css"),
        THEME: resolve(ROOT, "src/styles/theme.css"),
        REGEN: resolve(ROOT, "scripts/regen-spring-tokens.mjs"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_ANIMATION_COHERENCE_ARTIFACT",
            "W05-animation-coherence",
        ),
    };
    return _cliPaths;
}

const EXCLUDE_DIRS = new Set(["node_modules", ".git", ".claude", "worktrees", "dist"]);

// The retired iOS-spring bezier names. Either name surviving in src/ (as a
// definition or a consumer) is a violation.
export const RETIRED_SPRING_TOKENS = ["--motion-ease-apple-spring", "--ease-apple-spring"];

// ---------------------------------------------------------------------------
// Walk + comment-strip. Block comments (/* … */) and HTML comments are stripped
// (a retired-token reference inside a doc block is NOT a survivor); JS `// …`
// line comments are stripped too (CSS has no `//`, so a CSS declaration is
// untouched).
// ---------------------------------------------------------------------------
function walk(dir) {
    const out = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (entry.isDirectory()) {
            if (EXCLUDE_DIRS.has(entry.name)) continue;
            out.push(...walk(join(dir, entry.name)));
        } else if (entry.isFile() && /\.(vue|ts|css)$/.test(entry.name)) {
            out.push(join(dir, entry.name));
        }
    }
    return out;
}

export function stripComments(text) {
    let out = "";
    let i = 0;
    while (i < text.length) {
        if (text[i] === "/" && text[i + 1] === "*") {
            const end = text.indexOf("*/", i + 2);
            const stop = end === -1 ? text.length : end + 2;
            for (let j = i; j < stop; j++) out += text[j] === "\n" ? "\n" : " ";
            i = stop;
        } else if (text.startsWith("<!--", i)) {
            const end = text.indexOf("-->", i + 4);
            const stop = end === -1 ? text.length : end + 3;
            for (let j = i; j < stop; j++) out += text[j] === "\n" ? "\n" : " ";
            i = stop;
        } else if (text[i] === "/" && text[i + 1] === "/") {
            const eol = text.indexOf("\n", i);
            const stop = eol === -1 ? text.length : eol;
            for (let j = i; j < stop; j++) out += " ";
            i = stop;
        } else {
            out += text[i];
            i++;
        }
    }
    return out;
}

function lineOf(text, index) {
    return text.slice(0, index).split("\n").length;
}

// ---------------------------------------------------------------------------
// (A) Survivor sweep — every comment-stripped occurrence of a retired token.
// The longer name is scanned first so a `--ease-apple-spring` hit that is the
// tail of `--motion-ease-apple-spring` is counted ONCE (as the longer name).
// ---------------------------------------------------------------------------
export function findRetiredSurvivors(rel, raw) {
    const stripped = stripComments(raw);
    const claimed = new Set(); // byte offsets already attributed to a longer token
    const hits = [];
    for (const token of RETIRED_SPRING_TOKENS) {
        let idx = 0;
        while ((idx = stripped.indexOf(token, idx)) !== -1) {
            // `--ease-apple-spring` inside `--motion-ease-apple-spring`: the
            // longer token (scanned first) claims its offset range; skip the
            // shorter substring hit that lands inside a claimed range.
            const tailOffset = idx;
            const inClaimed = [...claimed].some(
                (c) => tailOffset >= c && tailOffset < c + "--motion-ease-apple-spring".length,
            );
            if (token === "--ease-apple-spring" && inClaimed) {
                idx += token.length;
                continue;
            }
            if (token === "--motion-ease-apple-spring") claimed.add(idx);
            hits.push({ file: rel, line: lineOf(stripped, idx), token });
            idx += token.length;
        }
    }
    return hits;
}

// ---------------------------------------------------------------------------
// (B) Consumer-coverage. Resolve the defined --spring-* set from tokens.css, the
// --ease-spring-* alias map from theme.css, and count direct + alias-routed
// consumers across the src/ corpus.
// ---------------------------------------------------------------------------

// Defined --spring-X token names (the LHS of a `--spring-X: …;` declaration).
export function definedSpringTokens(tokensRaw) {
    const stripped = stripComments(tokensRaw);
    const names = new Set();
    const re = /(--spring-[a-z0-9-]+)\s*:/g;
    let m;
    while ((m = re.exec(stripped)) !== null) names.add(m[1]);
    return names;
}

// The --ease-spring-X → --spring-X alias map (the theme.css @theme register
// surface). Returns Map aliasName → springName.
export function springAliasMap(themeRaw) {
    const stripped = stripComments(themeRaw);
    const map = new Map();
    const re = /(--ease-spring-[a-z0-9-]+)\s*:\s*var\(\s*(--spring-[a-z0-9-]+)\s*\)/g;
    let m;
    while ((m = re.exec(stripped)) !== null) map.set(m[1], m[2]);
    return map;
}

function escapeName(name) {
    return name.replace(/[-]/g, "\\-");
}

// Count `var(--name)` reads of a token across a corpus of {rel, stripped} files.
function countVarReads(name, files) {
    let count = 0;
    const refs = [];
    const re = new RegExp(`var\\(\\s*${escapeName(name)}\\b`, "g");
    for (const f of files) {
        let m;
        re.lastIndex = 0;
        while ((m = re.exec(f.stripped)) !== null) {
            count++;
            refs.push({ file: f.rel, line: lineOf(f.stripped, m.index) });
        }
    }
    return { count, refs };
}

// For a defined --spring-X: direct consumers are `var(--spring-X)` reads; alias
// consumers are `var(--ease-spring-X)` reads where the alias maps to it. A
// preset with zero of both is a dead token (violation).
export function coverageReport(tokensRaw, themeRaw, files) {
    const defined = definedSpringTokens(tokensRaw);
    const aliases = springAliasMap(themeRaw);
    const stripped = files.map((f) => ({ rel: f.rel, stripped: stripComments(f.raw) }));

    const aliasesFor = new Map(); // springName → [aliasNames]
    for (const [alias, spring] of aliases) {
        if (!aliasesFor.has(spring)) aliasesFor.set(spring, []);
        aliasesFor.get(spring).push(alias);
    }

    const rows = [];
    for (const spring of [...defined].sort()) {
        const direct = countVarReads(spring, stripped);
        let aliasTotal = 0;
        const aliasRefs = [];
        for (const alias of aliasesFor.get(spring) ?? []) {
            const r = countVarReads(alias, stripped);
            aliasTotal += r.count;
            aliasRefs.push(...r.refs.map((x) => ({ ...x, via: alias })));
        }
        const total = direct.count + aliasTotal;
        rows.push({
            spring,
            direct: direct.count,
            alias: aliasTotal,
            total,
            consumers: [...direct.refs, ...aliasRefs],
            dead: total === 0,
        });
    }
    return rows;
}

// ---------------------------------------------------------------------------
// (C) Governed rationale — every regen PRESETS row names a surface-class
// register. The comment must carry a `register: <class>` segment.
// ---------------------------------------------------------------------------
export function presetRationaleReport(regenRaw) {
    const rows = [];
    const presetRe = /name:\s*"([a-z0-9-]+)"[\s\S]*?comment:\s*"((?:[^"\\]|\\.)*)"/g;
    let m;
    while ((m = presetRe.exec(regenRaw)) !== null) {
        const name = m[1];
        const comment = m[2];
        const hasRegister = /register:/i.test(comment);
        rows.push({ name, comment, hasRegister, governed: hasRegister });
    }
    return rows;
}

// ---------------------------------------------------------------------------
// (D) Constellation census — a consumer reading var(--ease-apple-spring) with no
// local definition is a publish-gated forcing-function RED.
// ---------------------------------------------------------------------------
function censusConsumer(member) {
    const { present, dir, self } = resolveSibling(member);
    if (self) return null;
    if (!present) return { id: member.id, present: false, skipped: true };
    const roots = (member.roots ?? [resolve(dir, "src")]).filter(
        (r) => existsSync(r) && statSync(r).isDirectory(),
    );
    const hits = [];
    let hasLocalDef = false;
    for (const root of roots) {
        for (const path of walk(root)) {
            const raw = readFileSync(path, "utf8");
            const stripped = stripComments(raw);
            if (/--ease-apple-spring\s*:/.test(stripped)) hasLocalDef = true;
            const survivors = findRetiredSurvivors(path.slice(dir.length + 1), raw).filter(
                (h) => h.token === "--ease-apple-spring",
            );
            hits.push(...survivors);
        }
    }
    // A read is a forcing-function violation ONLY when no local def backstops it
    // (an empty resolve — the silent clean-break).
    const reads = hasLocalDef ? [] : hits;
    return { id: member.id, present: true, hasLocalDef, reads };
}

export function constellationCensus() {
    const rows = [];
    for (const member of CONSUMERS) {
        if (member.self) continue;
        const row = censusConsumer(member);
        if (row) rows.push(row);
    }
    return rows;
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------
function run() {
    const { ROOT, SRC, TOKENS, THEME, REGEN, ARTIFACT } = cliPaths();
    const files = walk(SRC).map((path) => ({
        path,
        rel: path.slice(ROOT.length + 1),
        raw: readFileSync(path, "utf8"),
    }));

    // (A) survivor sweep
    const survivors = [];
    for (const f of files) survivors.push(...findRetiredSurvivors(f.rel, f.raw));

    // (B) consumer-coverage
    const tokensRaw = readFileSync(TOKENS, "utf8");
    const themeRaw = readFileSync(THEME, "utf8");
    const coverage = coverageReport(tokensRaw, themeRaw, files);
    const deadTokens = coverage.filter((r) => r.dead);

    // (C) governed rationale
    const regenRaw = readFileSync(REGEN, "utf8");
    const rationale = presetRationaleReport(regenRaw);
    const ungoverned = rationale.filter((r) => !r.governed);

    // (D) constellation census (the cross-repo forcing function)
    const census = constellationCensus();
    const censusReds = census.filter((c) => c.present && c.reads && c.reads.length > 0);

    const violations = [];
    for (const s of survivors) {
        violations.push({
            arm: "survivor",
            file: s.file,
            line: s.line,
            reason: `retired spring token ${s.token} survives — the apple-spring bezier is EXCISED; re-point onto a governed --spring-* register`,
        });
    }
    for (const d of deadTokens) {
        violations.push({
            arm: "coverage",
            token: d.spring,
            reason: `${d.spring} has ZERO consumers (no var(${d.spring}) read, no --ease-spring-* alias reach) — the generator must not mint a dead token; wire a consumer or retire the preset`,
        });
    }
    for (const u of ungoverned) {
        violations.push({
            arm: "rationale",
            preset: u.name,
            reason: `--spring-${u.name} comment names no surface-class register (expected a "register: <class>" segment) — the vocabulary stays governed, not just generated`,
        });
    }
    for (const c of censusReds) {
        for (const r of c.reads) {
            violations.push({
                arm: "constellation",
                consumer: c.id,
                file: r.file,
                line: r.line,
                reason: `${c.id} reads var(--ease-apple-spring) with no local definition — deleting the token resolves it empty (the silent clean-break). Re-point the consumer onto a governed --spring-* register (routes to W34, gated on the AX publish).`,
            });
        }
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:animation-coherence",
        survivors,
        coverage,
        rationale,
        census,
        violations,
    });

    // ---- human summary ----
    console.log("proof:animation-coherence — ONE iOS-spring vocabulary (AX.W05)");
    console.log(`  scanned: ${files.length} files under src/`);
    console.log("");
    console.log(`  (A) survivor sweep:    ${survivors.length} retired-token survivor(s)`);
    for (const s of survivors) console.log(`        x ${s.file}:${s.line}  ${s.token}`);
    console.log("");
    console.log("  (B) consumer-coverage:");
    for (const r of coverage) {
        const tag = r.dead ? "DEAD" : "ok";
        console.log(`        [${tag}] ${r.spring}  direct=${r.direct} alias=${r.alias} total=${r.total}`);
    }
    console.log("");
    console.log("  (C) governed rationale:");
    for (const r of rationale) {
        console.log(`        [${r.governed ? "ok" : "UNGOVERNED"}] --spring-${r.name}`);
    }
    console.log("");
    console.log("  (D) constellation census (cross-repo forcing function):");
    for (const c of census) {
        if (c.skipped) {
            console.log(`        - ${c.id}: not checked out — sibling skip (registry-default; W34 publish-gated)`);
        } else if (c.reads && c.reads.length) {
            console.log(`        x ${c.id}: ${c.reads.length} var(--ease-apple-spring) read(s) with no local def — RED-pending-W34`);
        } else {
            console.log(`        ok ${c.id}: no un-backed apple-spring read`);
        }
    }

    if (violations.length) {
        console.log("");
        console.log("VIOLATIONS:");
        for (const v of violations) {
            const loc = v.file ? `${v.file}${v.line ? ":" + v.line : ""}` : (v.token ?? v.preset ?? v.consumer);
            console.log(`  x [${v.arm}] ${loc} — ${v.reason}`);
        }
    }
    console.log("");
    console.log(`  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

// CLI entry — runs ONLY when invoked directly, not when imported by the spec.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
