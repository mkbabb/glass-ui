#!/usr/bin/env node
// proof-precept-current.mjs — BB.W-PRECEPT-SYNC.
//
// The design-idioms.md ↔ src/styles/ HOME-MAP consistency gate. `docs/precepts/
// design-idioms.md` is the BINDING idiom-home (L inv-16): a contributor adding a
// new @theme alias / @utility / scoped component style answers "where does it go?"
// from that doc alone. That contract drifts SILENTLY every tranche — a deleted
// recipe stays named as a live example, a newly-shipped shared register lands with
// no home-map row — and NOTHING gated it (proof:colocation only asserts the doc
// EXISTS). This gate closes the P-5 doc-drift class for the one most binding design
// doc, so the next BA-class idiom-add cannot land without a home-map row.
//
// House style mirrors proof-readme-meta-clean.mjs (read-LIVE-from-source so the gate
// cannot itself go stale) + proof-design-idiom-localization.mjs (the comment-strip
// + pure-detector + inline self-test bite). ESM .mjs, byte-stable JSON artefact via
// gate-output, a human summary, process.exit(1) on any violation.
//
// THE DERIVATION (the overfitting-trap resolution — Triumvirate Dispatch #2). The
// gate hardcodes NO file list. Three derived sources of truth:
//   - the home-map FILE CELLS + EXAMPLE CELLS, parsed from the §3 table LIVE;
//   - the live `src/styles/` RECIPE CENSUS (every @utility name + every top-level
//     `.recipe` class in @layer components, with its def-site file);
//   - the cascade-ledger SELF-TAGGING — a top-level index.css @import partial whose
//     cascade-ledger comment self-describes it as a shared `register`/`axis`/`recipe`
//     (the BA shared-idiom convention) is a "places-an-idiom" partial that MUST be
//     homed. Per-component partials (configurator/drawer/segmented-tabs — whose
//     ledger describes a COMPONENT family) are NOT flagged. This is the principled
//     places-an-idiom vs pure-token distinction the Dispatch demands over a literal.
//
// THE THREE WITNESSES (+ the harness-soundness W4, asserted by the sibling parity
// gates the registration runs alongside, not in this script):
//   W1 — no DELETED recipe survives as a live home-map example. Any §3 example token
//        matching the recipe-name shape with ZERO def site in src/styles/ REDS (the
//        btn-audacious + popover-animate dangling examples). LIVE-derived — never a
//        hardcoded `btn-audacious`.
//   W2 — every shipped shared-register idiom file (cascade-ledger self-tagged) is in
//        a §3 home-map file cell (feedback-tone/menu; surface-axis is glass/*-glob-
//        covered). A NEW shared register without a row REDS.
//   W3 — every §3 file cell resolves to a real file on disk (no dangling row).

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { resolve, join, relative } from "node:path";
import { pathToFileURL } from "node:url";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, writeGateArtifact, snapshotStamp } from "./gate-output.mjs";

const ARTIFACT = gateArtifactPath("GLASS_UI_PRECEPT_CURRENT_ARTIFACT", "BB-precept-current");

const DOC = "docs/design/design-idioms.md"; // BH.B5c re-home off docs/precepts submodule
const STYLES = "src/styles";
const INDEX = "src/styles/index.css";
const GLASSCSS = "src/styles/glass.css";

// ── leaves ────────────────────────────────────────────────────────────────────

const readRel = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : null;
};

// Strip /* … */ block comments (the false-witness discipline — a commented-out
// recipe is never a def site; a commented-out home-map row is never a live row).
// LINE comments do not exist in CSS; markdown has none either, so block-strip is
// the only strip needed.
function stripBlockComments(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, " ");
}

// Walk every *.css under src/styles/ (recursive).
function cssFiles(dir) {
    const out = [];
    for (const ent of readdirSync(resolve(ROOT, dir), { withFileTypes: true })) {
        const rel = join(dir, ent.name);
        if (ent.isDirectory()) out.push(...cssFiles(rel));
        else if (ent.name.endsWith(".css")) out.push(rel);
    }
    return out;
}

// ── the live recipe census (the source-of-truth for "this recipe EXISTS") ───────
// Every @utility NAME and every top-level `.recipe` class (the @layer components
// recipe-class register the §3 home-map also names) with the file it lives in. The
// census is comment-stripped so a deleted-but-documented recipe (its def in a
// header comment) is NOT counted as a live def site.

function buildRecipeCensus() {
    const census = new Map(); // recipeName -> Set<relFile>
    const add = (name, rel) => {
        if (!census.has(name)) census.set(name, new Set());
        census.get(name).add(rel);
    };
    for (const rel of cssFiles(STYLES)) {
        const src = stripBlockComments(readRel(rel) ?? "");
        // @utility recipes
        for (const m of src.matchAll(/@utility\s+([a-zA-Z][\w-]*)/g)) add(m[1], rel);
        // top-level recipe classes (`.foo {`) — the recipe-class register half. We
        // capture the leading class of a rule (a register name a home-map example
        // names: .feedback-tone, .glass-menu-row, cartoon-surface as a class, …).
        for (const m of src.matchAll(/(?:^|\})\s*\.([a-zA-Z][\w-]*)\s*[,{]/g)) add(m[1], rel);
    }
    return census;
}

// ── the home-map §3 table parse (file cells + example tokens) ───────────────────
// The §3 table is between "## §3" and the next "---". Each data row is
// `| domain | `file` | examples |`. We extract every `code-span` token from the
// FILE column (the home-map file cells) and the EXAMPLES column (the named recipes).

function parseHomeMap(docSrc) {
    const lines = docSrc.split("\n");
    let inS3 = false;
    const fileCells = []; // { file, line }
    const exampleTokens = []; // { token, line }
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (/^##\s+§3\b/.test(line)) { inS3 = true; continue; }
        if (inS3 && /^---\s*$/.test(line)) { inS3 = false; continue; }
        if (!inS3) continue;
        if (!line.startsWith("|")) continue;
        // a markdown table data row: split on unescaped pipes
        const cells = line.split("|").map((c) => c.trim());
        // header / separator rows skipped (the separator row is all dashes; the
        // header row's 2nd cell is the literal "file")
        if (/^[-:\s|]+$/.test(line)) continue;
        if (cells[2] === "file") continue; // the header row
        // cells: ["", domain, file, examples, ""] (leading/trailing empty)
        const fileCell = cells[2] ?? "";
        const exCell = cells[3] ?? "";
        // file cell: a single `code-span` path
        for (const m of fileCell.matchAll(/`([^`]+)`/g)) {
            fileCells.push({ file: m[1], line: i + 1 });
        }
        // A DESCRIPTIVE cell (prose naming a data-attr bus or a token cohort —
        // the instrument-chassis `[data-phase]` ink-bus row) carries `[data-…]` /
        // `--token` code-spans alongside bare state-value words (`complete`). In a
        // descriptive cell only a HYPHENATED recipe-name token is a real-recipe
        // candidate (a bare single word is a data/state value, never a @utility).
        // A pure recipe-LIST cell (btn/animate/glass rows) has no such marker, so
        // every code-span there is a candidate.
        const descriptive = /`\[data-[^`]*`|`--[^`]*`/.test(exCell);
        for (const m of exCell.matchAll(/`([^`]+)`/g)) {
            // split a slash-pair example into its members + the shared stem
            const raw = m[1];
            for (const tok of expandExample(raw)) {
                exampleTokens.push({ token: tok, line: i + 1, descriptive });
            }
        }
    }
    return { fileCells, exampleTokens };
}

// A home-map example cell names recipes compactly: `transition-control/collapse`
// (two recipes sharing a stem), `rainbow-vivid/pastel`, `table-cell/head`. Expand a
// `stem-a/b` token into [`stem-a`, `stem-b`]; a bare `foo` stays [`foo`].
function expandExample(raw) {
    const slash = raw.match(/^([\w-]+?)-?([\w]+)\/([\w]+)$/);
    if (slash) {
        // stem = everything up to the last `-` before the first member
        const m2 = raw.match(/^(.*?)([\w]+)\/([\w]+)$/);
        if (m2) {
            const prefix = m2[1]; // e.g. "transition-" / "rainbow-" / "table-"
            return [`${prefix}${m2[2]}`, `${prefix}${m2[3]}`];
        }
    }
    return [raw];
}

// A token is "recipe-name-shaped" (a candidate to be a real @utility/recipe-class)
// iff it is a kebab/word identifier with no spaces, no dot/path, no `var(`, and is
// NOT a prose phrase (those carry spaces, already excluded by the code-span split).
function isRecipeNameShaped(token) {
    return /^[a-zA-Z][\w-]*$/.test(token) && token.length >= 3;
}

// ── the cascade-ledger self-tagged shared-register set (W2 derivation) ──────────
// A top-level index.css @import partial is a "shared-register idiom file" (must be
// homed) iff its cascade-ledger comment self-describes it as a shared register/axis/
// recipe. We read the ledger from index.css's own comment block + each partial's own
// header — the BA shared-idiom convention ("the ONE shared … tone register", "the
// glass menu-row + menu-section register"). The glass/* glob row covers every glass/
// partial, so a glass/* partial never needs its own row.

const SHARED_REGISTER_RE =
    /\bthe\s+(?:ONE\s+)?shared\b|\b(?:tone|menu-row|menu-section|surface-decoration)\s+register\b|\bregister\b\s*\.?\s*$|\bsurface-decoration\s+axis\b/i;

function topLevelImports(indexSrc) {
    // ./foo.css imports at the top level (not ./glass/… which is glass.css's domain)
    const out = [];
    for (const m of indexSrc.matchAll(/@import\s+"\.\/([\w-]+\.css)"/g)) out.push(m[1]);
    return out;
}

// Is this top-level partial self-tagged as a shared register/axis/recipe? We look at
// BOTH the index.css cascade-ledger entry for it AND the partial's own header.
function isSharedRegisterPartial(partial, indexSrc) {
    const headerSrc = readRel(`${STYLES}/${partial}`);
    const headerFirst = headerSrc ? headerSrc.split("\n").slice(0, 16).join("\n") : "";
    // the index.css ledger entry: the comment lines mentioning this partial name
    const ledgerLines = indexSrc
        .split("\n")
        .filter((l) => l.includes(partial) && l.trimStart().startsWith("*"))
        .join("\n");
    const probe = `${ledgerLines}\n${headerFirst}`;
    // a SHARED register self-tag: "the ONE shared … register" / "… tone register" /
    // "… menu-row + menu-section register" / "shared … surface-decoration axis".
    const sharedHit =
        /the\s+ONE\s+shared/i.test(probe) ||
        /\bshared\b[^.]*\b(register|axis|recipe)\b/i.test(probe) ||
        /\b(tone|menu-row|menu-section)\b[^.]*\bregister\b/i.test(probe);
    return sharedHit;
}

// ── the pure detector ───────────────────────────────────────────────────────────

export function detectPreceptDrift({ docSrc, census, indexSrc }) {
    const violations = [];
    const facts = {};
    const { fileCells, exampleTokens } = parseHomeMap(docSrc);
    facts.homeMapFileCells = fileCells.length;
    facts.homeMapExampleTokens = exampleTokens.length;

    const fileSet = new Set(fileCells.map((c) => c.file));
    const recipeNames = census; // Map<name, Set<file>>

    // ── W1 — no DELETED recipe survives as a live home-map example ──────────────
    // An example token that is recipe-name-shaped but has ZERO def site in the live
    // census is a dangling example (a deleted recipe still named). LIVE-derived.
    const w1 = [];
    for (const { token, line, descriptive } of exampleTokens) {
        if (!isRecipeNameShaped(token)) continue;
        // a bare single-word token in a DESCRIPTIVE prose cell is a data/state value
        // (the `[data-phase]` … `complete` bus), never a @utility — skip it.
        if (descriptive && !token.includes("-")) continue;
        if (!recipeNames.has(token)) {
            w1.push(
                `${DOC}:${line}: §3 example \`${token}\` has ZERO def site in ${STYLES}/ (a deleted recipe still named as a live example)`,
            );
        }
    }
    facts.w1_danglingExamples = w1.length;
    violations.push(...w1);

    // ── W2 — every shared-register idiom file is in a §3 file cell ──────────────
    // Derived: a top-level index.css @import partial self-tagged as a shared
    // register/axis/recipe MUST appear in a §3 file cell (as `src/styles/<partial>`).
    // The glass/* glob covers every glass/ partial; glass/ partials are NOT top-level.
    const w2 = [];
    const glassGlob = fileSet.has("src/styles/glass/*.css");
    const sharedPartials = [];
    for (const partial of topLevelImports(indexSrc)) {
        if (!isSharedRegisterPartial(partial, indexSrc)) continue;
        sharedPartials.push(partial);
        const want = `${STYLES}/${partial}`;
        if (!fileSet.has(want)) {
            w2.push(
                `${DOC}: shared-register idiom file \`${want}\` (cascade-ledger self-tagged) has NO §3 home-map row`,
            );
        }
    }
    facts.w2_sharedRegisterPartials = sharedPartials;
    facts.w2_glassGlobPresent = glassGlob;
    facts.w2_unhomed = w2.length;
    violations.push(...w2);

    // ── W3 — every §3 file cell resolves to a real file on disk ─────────────────
    const w3 = [];
    for (const { file, line } of fileCells) {
        // a glob cell (`glass/*.css`) resolves iff its dir exists with ≥1 match
        if (file.includes("*")) {
            const dir = resolve(ROOT, file.replace(/\/[^/]*\*[^/]*$/, ""));
            const ok = existsSync(dir) && statSync(dir).isDirectory();
            if (!ok) w3.push(`${DOC}:${line}: §3 file glob \`${file}\` resolves to no directory`);
            continue;
        }
        if (!existsSync(resolve(ROOT, file))) {
            w3.push(`${DOC}:${line}: §3 file cell \`${file}\` does not exist on disk`);
        }
    }
    facts.w3_danglingFileCells = w3.length;
    violations.push(...w3);

    return { facts, violations };
}

// ── the inline self-test bite (the gate proves its own bite) ────────────────────
// The detector against a SYNTHETIC stale home-map FLAGS the planted drifts; against
// a REFRESHED minimal doc flags NEITHER. The distinguishing bite is demonstrated in
// the gate's own fixture, so a future weakening (the detector silently passing a
// stale doc) is caught by the self-test, not just the live doc.

function selfTest(census, indexSrc) {
    const failures = [];

    // a synthetic STALE §3 — a deleted recipe example + a missing shared-register row
    const STALE = [
        "## §3 — `@utility`",
        "",
        "| domain | file | examples |",
        "|---|---|---|",
        "| interactive | `src/styles/utilities/btn.css` | `btn-audacious`, `scale-on-hover` |",
        "| glass | `src/styles/glass/*.css` | `glass-progress-rail` |",
        "",
        "---",
    ].join("\n");
    const staleR = detectPreceptDrift({ docSrc: STALE, census, indexSrc });
    if (staleR.facts.w1_danglingExamples < 1) failures.push("self-test: STALE doc did not flag the `btn-audacious` dangling example (W1 mute)");
    if (staleR.facts.w2_unhomed < 1) failures.push("self-test: STALE doc did not flag the unhomed feedback-tone/menu shared-register (W2 mute)");

    // a synthetic REFRESHED §3 — the live recipes + the shared-register rows present
    const CLEAN = [
        "## §3 — `@utility`",
        "",
        "| domain | file | examples |",
        "|---|---|---|",
        "| interactive | `src/styles/utilities/btn.css` | `scale-on-hover`, `btn-interactive` |",
        "| glass | `src/styles/glass/*.css` | `glass-progress-rail` |",
        "| feedback tone | `src/styles/feedback-tone.css` | the tone register |",
        "| menu | `src/styles/menu.css` | the menu-row register |",
        "",
        "---",
    ].join("\n");
    const cleanR = detectPreceptDrift({ docSrc: CLEAN, census, indexSrc });
    if (cleanR.facts.w1_danglingExamples !== 0) failures.push(`self-test: CLEAN doc false-flagged a W1 dangling example (${cleanR.violations.join("; ")})`);
    if (cleanR.facts.w2_unhomed !== 0) failures.push(`self-test: CLEAN doc false-flagged a W2 unhomed register (${cleanR.violations.join("; ")})`);

    return failures;
}

// ── runner ──────────────────────────────────────────────────────────────────────

function run() {
    const docSrc = readRel(DOC) ?? "";
    const indexSrc = readRel(INDEX) ?? "";
    const census = buildRecipeCensus();

    // docs/precepts is a git SUBMODULE (a sibling private repo). On a CI runner
    // the checkout does not initialize it (and cannot — the default token has no
    // cross-repo grant), so the dir is empty. Absent-submodule → skip-by-policy
    // (the sibling-gate convention) — the LIVE-doc detector (W1/W2/W3 read
    // design-idioms.md) skips; the SYNTHETIC-doc self-test (which supplies its own
    // inline §3 fixtures, NOT the submodule) keeps biting. Locally the clause BITES.
    // BH.B5c: re-homed off the docs/precepts submodule onto the in-repo docs/design
    // extraction — present iff the extracted design-idioms home resolves.
    const submodulePresent = existsSync(resolve(ROOT, DOC));

    let facts, violations;
    if (!submodulePresent) {
        console.log(
            "  precept-current: SKIP-BY-POLICY — docs/precepts submodule not initialized on this runner (the design-idioms.md home-map clause bites locally)",
        );
        facts = {
            homeMapFileCells: 0,
            homeMapExampleTokens: 0,
            w2_sharedRegisterPartials: [],
            w1_danglingExamples: 0,
            w2_unhomed: 0,
            w3_danglingFileCells: 0,
            submoduleSkipped: true,
        };
        violations = [];
    } else {
        ({ facts, violations } = detectPreceptDrift({ docSrc, census, indexSrc }));
    }
    const selfFailures = selfTest(census, indexSrc);

    const allViolations = [...violations, ...selfFailures];
    const status = allViolations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:precept-current",
        facts: { ...facts, recipeCensusSize: census.size, selfTestFailures: selfFailures.length },
        violations: allViolations,
    });

    console.log(
        "proof:precept-current — design-idioms.md home-map ↔ src/styles/ consistency (BB.W-PRECEPT-SYNC)",
    );
    console.log(`  §3 file cells          : ${facts.homeMapFileCells}`);
    console.log(`  §3 example tokens      : ${facts.homeMapExampleTokens}`);
    console.log(`  live recipe census     : ${census.size} names`);
    console.log(`  shared-register files  : ${facts.w2_sharedRegisterPartials.join(", ") || "(none)"}`);
    console.log(`  W1 dangling examples   : ${facts.w1_danglingExamples}`);
    console.log(`  W2 unhomed registers   : ${facts.w2_unhomed}`);
    console.log(`  W3 dangling file cells : ${facts.w3_danglingFileCells}`);
    console.log(`  self-test failures     : ${selfFailures.length}`);
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
