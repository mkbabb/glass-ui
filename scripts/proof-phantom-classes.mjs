#!/usr/bin/env node
// Q.W6 — Phantom-class corpus-grep gate (invariants 32 + 33).
//
// History:
//   - Q.W3 Lane E (rainbow) + Lane G (IconTooltip) surfaced the same audit
//     blind-spot twice: a shared substrate class retired under a corpus grep
//     that did not include the one consumer the retiral broke.
//   - Q.W4 Lane F ran the phantom-class sweep MANUALLY across the consumer
//     fleet (`.glass-{subtle,medium}` cluster C2 + the `.cartoon-card` C.W5
//     phantom) — 13 + 20 dangling sites across fourier + words.
//   - Q.md §2 invariant 32: every RETIRED class name lands with (a) a registry
//     entry in `.retired-classes.txt` and (b) a fleet-wide grep gate.
//   - Q.md §2 invariant 33 generalises: a "cleanup"/"remove unused" commit runs
//     a fleet-wide corpus grep BEFORE deleting a class — the --pre-deletion mode.
//   - This script (Q.W6) codifies the manual W4 Lane F sweep as a mechanical,
//     fail-closed gate. Same prose-edict-plus-gate pattern as invariant 29
//     (audit-stash-list.mjs) + invariant 30 (proof-resolution-contract.mjs).
//
// ---------------------------------------------------------------------------
// MODES
// ---------------------------------------------------------------------------
//
//   (default) — registry-grep gate. Invariant 32.
//     Reads `.retired-classes.txt`, greps every retired class name across
//     glass-ui's own src/ + demo/ AND every @mkbabb/* consumer repo. Exit 0
//     on zero matches; exit 1 naming every match (repo + file:line).
//       node scripts/proof-phantom-classes.mjs
//       npm run proof:phantom-classes
//
//   --pre-deletion <class-name> — invariant 33.
//     A "cleanup"/"remove unused"/"delete orphan" commit runs this BEFORE
//     deleting a CSS class/token/utility, to prove zero fleet consumers. Greps
//     the named class across the SAME corpus (glass-ui src/+demo/ + every
//     consumer). Exit 0 if the only matches are inside glass-ui's own
//     src/styles/ (the definition sites being deleted) — i.e. zero CONSUMER
//     sites; exit 1 if any consumer (or glass-ui src/+demo/ outside styles/)
//     still references it. A clean exit is the grep-evidence line invariant 33
//     mandates in the cleanup commit body. After the deletion lands, the class
//     name is appended to `.retired-classes.txt` so the default mode guards it.
//       node scripts/proof-phantom-classes.mjs --pre-deletion my-old-class
//
//   --pre-deletion (no class) is an error — the mode requires a class name.
//
// ---------------------------------------------------------------------------
// Exit codes
//   0 — clean (no phantom sites / zero consumers).
//   1 — violation(s) found; each named with repo + file:line.
//   2 — usage error (missing registry, bad --pre-deletion arg, etc.).
// ---------------------------------------------------------------------------

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { CONSUMERS, ROOT, resolveSibling, skipSibling } from "./constellation.mjs";

// ---------------------------------------------------------------------------
// CONSTELLATION — membership comes from constellation.mjs (AS.W2, inv-θ), the
// SINGLE source of constellation/sibling membership + the ONE absent-sibling
// policy. The prior hardcoded list lived here and had drifted from the other
// gates' partial views; it is now the canonical CONSUMERS union (glass-ui's own
// src/ + demo/ first — invariant 32 greps glass-ui's OWN corpus for a reference
// to a class it has retired — then every @mkbabb/* consumer repo).
//
// Each entry names the source roots to grep — the dirs a consumer's
// templates/stylesheets live in (className references appear in
// .vue / .ts / .tsx / .css / .html). We map CONSUMERS's `{ id, dir, roots }`
// onto the local `{ id, base, roots }` shape (`base` ← `dir`): `base` is the
// repo root grep hits are reported relative to. An absent root resolves to a
// logged sibling-skip via resolveSibling/skipSibling — absence is the
// clean-runner case (registry-default), never a silent cap.
//
// Format: { id: string, base: string, roots: string[] }
// ---------------------------------------------------------------------------

const REPOS = CONSUMERS.map(({ id, dir, roots, self }) => ({
    id,
    base: dir,
    roots,
    self: Boolean(self),
}));

// File extensions that can carry a CSS class reference (markup + stylesheets).
const SCAN_GLOBS = ["*.vue", "*.ts", "*.tsx", "*.js", "*.jsx", "*.css", "*.html"];

// ---------------------------------------------------------------------------
// Known-pending exclusions.
//
// Q.W4 Lane F delivered the fourier-analysis phantom-class migration as an
// UN-APPLIED unified-diff patch (`docs/tranches/Q/audit/W4-Lane-F-fourier.patch`)
// — the fourier WIP tree was ~100 files mid-flight, so the lane could not write
// it. fourier therefore still carries the `.cartoon-card` + `.glass-{subtle,
// medium}` phantom sites until the fourier team applies the patch.
//
// This is an HONEST, documented pending handoff — NOT a gate weakening. The
// gate reports fourier's matches as PENDING (not silently dropped, not folded
// into the pass): the default mode still exits non-zero while they exist, and
// the report names the patch the fourier team must apply. Set
// PROOF_PHANTOM_ALLOW_PENDING=1 to downgrade the documented-pending repo to a
// warning (for a glass-ui-side green run while the fourier handoff is open);
// the variable is never wired into CI.
//
// Each entry: { repo, reason } — `repo` matches a REPOS[].id.
// ---------------------------------------------------------------------------

const KNOWN_PENDING = [
    {
        repo: "fourier-analysis/web",
        reason:
            "Q.W4 Lane F migration delivered as the un-applied patch " +
            "docs/tranches/Q/audit/W4-Lane-F-fourier.patch — the fourier team " +
            "applies it after committing their in-flight WIP. Pending handoff.",
    },
];

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

function readRegistry() {
    const path = resolve(ROOT, ".retired-classes.txt");
    if (!existsSync(path)) {
        console.error(
            "[proof:phantom-classes] FATAL — .retired-classes.txt registry not found at repo root",
        );
        process.exit(2);
    }
    const classes = [];
    for (const raw of readFileSync(path, "utf8").split("\n")) {
        // Strip the trailing `# comment`, then trim.
        const line = raw.replace(/#.*$/, "").trim();
        if (line === "") continue;
        classes.push(line);
    }
    return classes;
}

// ---------------------------------------------------------------------------
// Grep
// ---------------------------------------------------------------------------

/**
 * A grep hit on a retired class name is a true phantom only when the name is
 * used AS A CSS CLASS — inside a `class`/`className` attribute, a class-list
 * string literal, or a bare CSS selector. The same string can appear in many
 * NON-class roles that are NOT phantom references, and the W6 first run
 * surfaced every one of them:
 *
 *   - prose in a comment (`cards.css` retirement note, a speedtest doc-comment),
 *   - a `<Slider variant=>` enum value — Q.W3 Lane B records the Slider-local
 *     `glass-cartoon` VARIANT as a separate artefact from the retired
 *     `.glass-cartoon` surface class: CVA map keys (`'glass-cartoon': ''`),
 *     `data-variant="glass-cartoon"`, TS variant-array elements (`"glass-cartoon",`),
 *   - plain text content (`<p>glass-cartoon variant</p>`) and `blurb=` prose.
 *
 * Rather than enumerate every false-positive shape (comment-negative), the
 * filter is class-context-POSITIVE: `isClassUsage` returns true only when the
 * matched token sits inside a recognised CSS-class position. Everything else —
 * comment prose, variant tokens, array elements, text — fails the test and is
 * dropped. A gate must not over-fire; a class-name in a comment renders no
 * surface.
 *
 * Recognised class positions (the match token must be whitespace/quote-fenced
 * within one of these):
 *   1. an HTML/JSX `class="…"` / `class='…'` / `:class="…"` / `className="…"`
 *      attribute value;
 *   2. a class-list string literal — a single/double/back-quoted string of
 *      space-separated CSS tokens (the `cn()` / Tailwind-string idiom). Heuristic:
 *      the enclosing quoted string contains ONLY class-token characters and
 *      spaces, AND contains ≥ 1 space OR is itself the whole attribute value;
 *   3. a CSS selector — `.<class>` with the leading dot.
 */
function isClassUsage(line, matchIndex, className) {
    const before = line.slice(0, matchIndex);

    // Block-comment continuation line (`   * …`) — documentation, not code.
    if (/^\s*\*/.test(line)) return false;
    // `//` line comment before the match.
    if (/(^|[^:])\/\/[^\n]*$/.test(before)) return false;

    // (3) CSS selector — leading `.` immediately before the token. EXCLUDE
    //     markdown inline-code: a `.name` wrapped in backticks (`` `.foo` ``)
    //     is documentation prose, not a live selector. Real CSS / SCSS
    //     selectors are never backtick-wrapped.
    if (before.endsWith(".")) {
        const backtickQuoted = enclosingQuotedStringOf(line, matchIndex, "`");
        if (!backtickQuoted) return true; // genuine `.selector`
        return false; // `` `.name` `` markdown inline-code in a comment
    }

    // Find the quoted string the match sits inside, if any.
    const quoted = enclosingQuotedString(line, matchIndex);
    if (quoted) {
        const { content, attrBefore } = quoted;
        // Markdown inline-code in a comment: a backtick string whose content
        // is a single `.`-prefixed selector token (`` `.glass-cartoon` ``).
        if (/^\s*\.[A-Za-z0-9_-]+\s*$/.test(content)) return false;
        // (1) explicit class attribute / prop immediately before the quote.
        if (/\b(:?class|className)\s*[:=]\s*$/.test(attrBefore)) return true;
        // A `variant`/`data-variant` attribute → NOT a class (Slider variant token).
        if (/\b(data-)?variant\s*[:=]\s*$/.test(attrBefore)) return false;
        // (2) class-list string literal: every token is a CSS-class-shaped
        //     token (letters/digits/`-`/`_`/`:`/`/`/`[`/`]`/`.`/`%`/`(`/`)` —
        //     Tailwind arbitrary values included) separated by spaces, and the
        //     string holds ≥ 2 tokens. Prose ("glass-cartoon variant") fails:
        //     "variant" is class-shaped but a 2-token "glass-cartoon variant"
        //     would pass — so additionally require a Tailwind-ish co-token
        //     (a `-`, `:`, `/`, or `[` somewhere) to distinguish a class list
        //     from a 2-word prose fragment.
        const tokens = content.trim().split(/\s+/);
        const allClassShaped = tokens.every((t) =>
            /^[A-Za-z0-9_:/%().[\]-]+$/.test(t),
        );
        const hasTailwindShape = /[-:/[]/.test(content);
        if (allClassShaped && tokens.length >= 2 && hasTailwindShape) {
            // Reject obvious prose: a quoted string that reads as a sentence
            // (slash-separated word ladders in `blurb=` etc.) — but those are
            // caught by the attr check below; a `blurb=` attr is not `class`.
            return true;
        }
        // single-token quoted string — only a class if the attr says so
        // (handled above); a lone `"glass-cartoon"` array element is NOT.
        return false;
    }

    // Not in a quoted string and not a `.selector` — not a class usage
    // (bare identifier, comment word, etc.).
    return false;
}

/**
 * Return the quoted string enclosing `matchIndex`, plus the text immediately
 * before its opening quote (to inspect the attribute/prop name). Returns null
 * if the match is not inside a quoted string.
 */
function enclosingQuotedString(line, matchIndex) {
    for (const q of ['"', "'", "`"]) {
        const found = enclosingQuotedStringOf(line, matchIndex, q);
        if (found) return found;
    }
    return null;
}

/** As `enclosingQuotedString`, restricted to one quote character. */
function enclosingQuotedStringOf(line, matchIndex, q) {
    let searchFrom = 0;
    while (true) {
        const open = line.indexOf(q, searchFrom);
        if (open === -1 || open >= matchIndex) break;
        const close = line.indexOf(q, open + 1);
        if (close === -1) break;
        if (open < matchIndex && matchIndex < close) {
            return {
                content: line.slice(open + 1, close),
                attrBefore: line.slice(0, open),
            };
        }
        searchFrom = close + 1;
    }
    return null;
}

/**
 * Grep one class name across one repo's source roots.
 *
 * The pattern matches the class name fenced by non-class characters so
 * `glass-medium` does not match `glass-medium-foo` and `cartoon-card` does not
 * match `cartoon-cards` (CSS class tokens are dash-joined — `-` is part of the
 * token, so the fence excludes it).
 *
 * Comment-line and variant-token matches are dropped per the false-positive
 * analysis above. Returns [{ repo, file, line, text }].
 */
function grepClassInRepo(className, repo) {
    const hits = [];
    // Explicit ERE with non-class-char fences (grep -w treats `-` inconsistently).
    const escaped = escapeForEre(className);
    const pattern = `(^|[^-A-Za-z0-9_])${escaped}([^-A-Za-z0-9_]|$)`;
    const localRe = new RegExp(`(^|[^-A-Za-z0-9_])${escaped}([^-A-Za-z0-9_]|$)`);

    for (const root of repo.roots) {
        // A present repo may still lack a given root (fourier carries a legacy
        // `src/` AND an active `web/src/` — only one need exist). Whole-repo
        // absence is logged once upstream via skipSibling; a missing sub-root
        // inside a present repo is the multi-root case, silently skipped here.
        if (!existsSync(root)) continue;
        let out = "";
        try {
            out = execFileSync(
                "grep",
                [
                    "-rnE",
                    ...SCAN_GLOBS.flatMap((g) => ["--include", g]),
                    pattern,
                    root,
                ],
                { encoding: "utf8" },
            );
        } catch (err) {
            // grep exits 1 on zero matches — that is the clean path, not an error.
            if (err.status === 1) continue;
            console.error(
                `[proof:phantom-classes] grep failed in ${repo.id} (${root}): ${err.message}`,
            );
            process.exit(2);
        }
        for (const rawLine of out.split("\n")) {
            if (rawLine === "") continue;
            // grep -n output: <file>:<line>:<text>
            const m = rawLine.match(/^([^:]+):(\d+):(.*)$/);
            if (!m) continue;
            const text = m[3];
            const matchIndex = (() => {
                const mm = text.match(localRe);
                if (!mm) return -1;
                // localRe captures a leading fence char; offset past it.
                return mm.index + (mm[1] ? mm[1].length : 0);
            })();
            if (matchIndex === -1) continue;
            // A hit counts only when the token is used as a CSS class — prose,
            // variant-enum tokens, array elements and text content are dropped.
            if (!isClassUsage(text, matchIndex, className)) continue;
            hits.push({
                repo: repo.id,
                // Report repo-relative (`src/styles/glass.css`) — strip the base.
                file: m[1].startsWith(repo.base)
                    ? m[1].slice(repo.base.length + 1)
                    : m[1],
                line: Number(m[2]),
                text: text.trim(),
            });
        }
    }
    return hits;
}

function escapeForEre(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Resolve REPOS to the present-on-disk subset, applying the ONE absent-sibling
 * policy (constellation.mjs). An absent self (glass-ui) is a hard error — the
 * gate cannot grep its own corpus; an absent sibling is a graceful LOGGED skip
 * (registry-default world: the local checkout is a dev convenience, ABSENT on a
 * clean CI runner). The skip is emitted via skipSibling so absence is never a
 * silent cap.
 */
function presentRepos() {
    const present = [];
    for (const repo of REPOS) {
        const { present: onDisk, self } = resolveSibling({
            id: repo.id,
            dir: repo.base,
            self: repo.self,
        });
        if (onDisk) {
            present.push(repo);
            continue;
        }
        if (self) {
            console.error(
                `[proof:phantom-classes] FATAL — self repo glass-ui absent at ${repo.base}`,
            );
            process.exit(2);
        }
        skipSibling("proof:phantom-classes", repo);
    }
    return present;
}

// ---------------------------------------------------------------------------
// Mode: default — registry sweep (invariant 32)
// ---------------------------------------------------------------------------

function runRegistrySweep() {
    const classes = readRegistry();
    const repos = presentRepos();
    console.log(
        `[proof:phantom-classes] registry sweep — ${classes.length} retired class(es) ` +
            `× ${repos.length} present repo(s)`,
    );

    const allHits = [];
    for (const className of classes) {
        for (const repo of repos) {
            allHits.push(...grepClassInRepo(className, repo));
        }
    }

    // Partition hits into hard violations vs documented-pending.
    const pendingRepos = new Set(KNOWN_PENDING.map((p) => p.repo));
    const hard = allHits.filter((h) => !pendingRepos.has(h.repo));
    const pending = allHits.filter((h) => pendingRepos.has(h.repo));

    if (pending.length > 0) {
        console.error(
            `\n[proof:phantom-classes] PENDING — ${pending.length} site(s) in documented-pending repo(s):\n`,
        );
        for (const h of pending) {
            console.error(`  [pending]  ${h.repo}/${h.file}:${h.line}`);
            console.error(`             ${h.text}`);
        }
        console.error("");
        for (const p of KNOWN_PENDING) {
            console.error(`  ${p.repo}: ${p.reason}`);
        }
    }

    if (hard.length === 0) {
        if (pending.length === 0) {
            console.log(
                "[proof:phantom-classes] PASS — zero phantom-class sites across the constellation",
            );
            process.exit(0);
        }
        // Only documented-pending sites remain.
        if (process.env.PROOF_PHANTOM_ALLOW_PENDING === "1") {
            console.error(
                "\n[proof:phantom-classes] PROOF_PHANTOM_ALLOW_PENDING=1 — " +
                    "downgrading documented-pending sites to a warning; glass-ui " +
                    "src/+demo/ and the other consumers are CLEAN.",
            );
            process.exit(0);
        }
        console.error(
            "\n[proof:phantom-classes] FAIL — only documented-pending sites remain.\n" +
                "glass-ui src/+demo/ and the non-pending consumers are CLEAN. The gate\n" +
                "stays RED until the pending patch lands — this is honest, not a gate bug.\n" +
                "Set PROOF_PHANTOM_ALLOW_PENDING=1 for a glass-ui-side green run while the\n" +
                "handoff is open (never wired into CI).",
        );
        process.exit(1);
    }

    // Hard violations.
    console.error(
        `\n[proof:phantom-classes] FAIL — ${hard.length} phantom-class site(s):\n`,
    );
    for (const h of hard) {
        console.error(`  [phantom]  ${h.repo}/${h.file}:${h.line}`);
        console.error(`             ${h.text}`);
    }
    console.error("");
    console.error(
        "Each site references a class glass-ui has RETIRED (see .retired-classes.txt).",
    );
    console.error(
        "The surface renders silently absent. Migrate the site to the canonical",
    );
    console.error(
        "replacement named in the registry comment, or — if glass-ui retired the",
    );
    console.error(
        "class in error — re-promote the class and remove its registry entry.",
    );
    process.exit(1);
}

// ---------------------------------------------------------------------------
// Mode: --pre-deletion <class> — invariant 33
// ---------------------------------------------------------------------------

function runPreDeletion(className) {
    if (!className || className.startsWith("-")) {
        console.error(
            "[proof:phantom-classes] usage: --pre-deletion <class-name>\n" +
                "  Greps the fleet for a class BEFORE you delete it, to prove zero\n" +
                "  consumers (invariant 33). The bare class name, no leading dot.",
        );
        process.exit(2);
    }

    const repos = presentRepos();
    console.log(
        `[proof:phantom-classes] pre-deletion grep — "${className}" × ${repos.length} present repo(s)`,
    );

    const allHits = [];
    for (const repo of repos) {
        allHits.push(...grepClassInRepo(className, repo));
    }

    // A pre-deletion grep tolerates DEFINITION sites inside glass-ui's own
    // src/styles/ (those are the rules being deleted). Any other site — a
    // glass-ui src/+demo/ consumer reference, or any consumer-repo site — is a
    // live consumer that blocks the deletion.
    // `h.file` is repo-relative (`src/styles/glass.css`).
    const isOwnStyleDef = (h) =>
        h.repo === "glass-ui" && h.file.startsWith("src/styles/");
    const consumers = allHits.filter((h) => !isOwnStyleDef(h));
    const defs = allHits.filter(isOwnStyleDef);

    if (defs.length > 0) {
        console.log(
            `\n  ${defs.length} definition site(s) in glass-ui src/styles/ (the rules to delete):`,
        );
        for (const h of defs) {
            console.log(`    ${h.repo}/${h.file}:${h.line}`);
        }
    }

    if (consumers.length === 0) {
        console.log(
            `\n[proof:phantom-classes] PASS — "${className}" has ZERO fleet consumers; ` +
                "safe to delete.",
        );
        console.log(
            "  Grep-evidence line for the cleanup commit body (invariant 33):",
        );
        console.log(
            `    proof:phantom-classes --pre-deletion ${className} → 0 consumer sites ` +
                `(${repos.length} present repos)`,
        );
        console.log(
            `  After deleting, append "${className}" to .retired-classes.txt so the ` +
                "default-mode gate guards it.",
        );
        process.exit(0);
    }

    console.error(
        `\n[proof:phantom-classes] FAIL — "${className}" still has ${consumers.length} ` +
            "consumer site(s); deletion would strand them:\n",
    );
    for (const h of consumers) {
        console.error(`  [consumer] ${h.repo}/${h.file}:${h.line}`);
        console.error(`             ${h.text}`);
    }
    console.error("");
    console.error(
        "Migrate every site above to the replacement FIRST, then re-run this mode.",
    );
    process.exit(1);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const argv = process.argv.slice(2);
const preIdx = argv.indexOf("--pre-deletion");

if (preIdx !== -1) {
    runPreDeletion(argv[preIdx + 1]);
} else {
    runRegistrySweep();
}
