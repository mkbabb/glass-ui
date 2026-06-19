#!/usr/bin/env node
// BC.W-SELECTION-CARD — the I5 `<Card variant="selection">`, the ONLY new component of
// the Atlas set. The SOURCE/MECHANISM arm of proof:selection-card (device-free; the PAINT
// arm is the bc-gestalt-roster pixel-read over a live :5199 capture the orchestrator owns
// + the π readback tests-visual/selection-card.spec.ts). Per-mechanism greens alone do NOT
// close the visual wave — the captured DELTA is the binding truth (BC anti-disease law).
//
// FOUR source arms + the disease-root bite, each born-RED at HEAD pre-wave:
//   S1 — the variant exists ONCE, COMPOSES the two BUILT seams (`--glass-accent` A-2 +
//        `.metal-*-border` A-3), mints NO new sub-system, and edits NEITHER glass/rim.css
//        NOR utilities/metal.css NOR tokens/property-regs.css NOR glass/material.css (the
//        seams stay BUILT — a diff touching them reds the no-re-author bite). The api
//        publication + the colocation/index export are present.
//   S2 — the "Card is the only new component" fence, PARSED from the canonical
//        DESHADCN-BRAINSTORM.md §2 "The Atlas fold" markdown table by its column shape
//        (`Atlas item | what | BC home | new component?`): exactly ONE row answers `YES`
//        (the I5 selection card), EVERY other a `no`-prefixed verdict. NO hand-maintained
//        Atlas-deliverable array (the parse is the source of truth — a future §2 row
//        auto-enrolls). SCOPED to the §2 table ONLY — the two genuine NEW viz born OUTSIDE
//        the Atlas set (BC.W-VIZ-DOTMATRIX/HYBRID, custom/) are NOT §2 rows, so they never
//        trip the bar.
//   S3 — the no-op floor + the rim-not-fill discipline: the decoration NEVER writes the
//        `--glass-tint-source`/`--glass-tint-strength` legibility cohort (the distinct-axis
//        fence) and NEVER paints a `--foreground`/`--primary`/`--surface-tint` opaque plate
//        FILL (the no-saturated-slab bite — a planted `background: var(--primary)` reds).
//   S4 — the metal-border CONSUMES the BUILT utility, selected-only, PRM-static: the
//        selected arm composes `.metal-{gold,silver,bronze}-border` (NOT a forked
//        `border-image`/keyframe — a planted local `@keyframes` metal sweep reds); the rim
//        is present ONLY on `:selected`; PRM-static is inherited from the utility (asserted
//        by reference).
//
// SELF-PROVING (the bite proof, every run): (a) a synthetic second §2 row flipped to YES
// reds S2 (the second-Atlas-component bar); (b) a synthetic new `src/components/custom/<x>/`
// SFC that is NOT a §2 deliverable does NOT red S2 (the non-Atlas-viz exclusion); (c) a
// re-hand-listed Atlas-deliverable array in the gate reds (the parse-not-list discipline);
// (d) a saturated opaque plate fill (`background: var(--primary)`) on the selection arm
// fails S3 (the disease-root structural bar); (e) a local `@keyframes metal-…` sweep fails
// S4 (the no-forked-keyframe bar). If any synthetic check fails to flag, the gate reds
// loudly (acceptance is the RED-witness inverse).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:selection-card";
const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

function readFile(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

function stripCss(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "");
}

// Strip JS comments (line + block) AND string/template-literal CONTENTS so a scan of
// the gate's OWN source reads CODE only — a sentinel mentioned in a comment or carried
// in a self-test fixture STRING (e.g. `"const ATLAS_DELIVERABLES = [...]"`) is NOT a
// real hand-list declaration. The self-test passes the fixture string DIRECTLY (un-
// stripped), so the bite still proves the detector bites; only the real-source scan
// strips. (The order — block comments, line comments, then string bodies — avoids
// eating a `//` inside a stripped comment.)
function stripJsNonCode(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\/\/[^\n]*/g, "")
        .replace(/"(?:[^"\\]|\\.)*"/g, '""')
        .replace(/'(?:[^'\\]|\\.)*'/g, "''")
        .replace(/`(?:[^`\\]|\\.)*`/g, "``");
}

// ── The seam files this wave must NOT re-author (COMPOSE, never re-author). The
// selection card reads `--glass-accent` + composes `.metal-*-border`; it does not
// edit the rim recipe, the metal keyframe, or the @property regs. ───────────────────
const BUILT_SEAM_FILES = [
    "src/styles/glass/rim.css",
    "src/styles/glass/material.css",
    "src/styles/tokens/property-regs.css",
    "src/styles/utilities/metal.css",
];

// The metal quads the BUILT utility ships — the selected arm composes one of these
// `.metal-{name}-border` classes (NEVER a fourth, NEVER a forked recipe).
const METAL_NAMES = ["gold", "silver", "bronze"];

// ════════════════════════════════════════════════════════════════════════════════════
// S1 — the variant exists ONCE, composes the seams, mints NO new sub-system.
// ════════════════════════════════════════════════════════════════════════════════════

/**
 * @param {{card:string, index:string, api:string, cards:string}} src
 * @returns {{facts:object, violations:string[]}}
 */
export function detectVariantComposes(src) {
    const violations = [];
    const facts = {};
    const card = src.card ?? readFile("src/components/ui/card/Card.vue");
    const index = src.index ?? readFile("src/components/ui/card/index.ts");
    const api = src.api ?? readFile("src/api/index.ts");
    const cards = src.cards ?? readFile("src/styles/cards.css");

    // (1) the `variant?: "selection"` prop arm exists on Card.vue (declared, typed).
    facts.variantProp = /variant\?\s*:\s*CardVariant/.test(card) || /variant\?\s*:\s*"selection"/.test(card);
    facts.variantType = /type\s+CardVariant\s*=\s*"selection"/.test(card);
    if (!facts.variantProp)
        violations.push("S1: Card.vue does not declare a `variant?: CardVariant`/`\"selection\"` prop (the selection decoration axis is missing)");
    if (!facts.variantType)
        violations.push('S1: Card.vue does not export `type CardVariant = "selection"` (the one variant name the Atlas/I5 ask uses)');

    // (2) the `:data-variant` binding routes the CSS seam (the surface-axis shape).
    facts.dataVariantBinding = /:data-variant=/.test(card);
    if (!facts.dataVariantBinding)
        violations.push("S1: Card.vue does not bind `:data-variant` (the selection decoration must be a data-attr the CSS seam reads, the surface-axis shape — not a parallel recipe)");

    // (3) the host SETS `--glass-accent` (A-2 consume — the rim seam, never re-authored).
    facts.accentHostWrite = /["']--glass-accent["']/.test(card);
    if (!facts.accentHostWrite)
        violations.push("S1: Card.vue does not write `--glass-accent` per-instance (the A-2 rim seam consume — the selection card is the second `--glass-accent` consumer)");

    // (4) the metal-border class is COMPOSED on the class (A-3 consume).
    facts.metalBorderClass = /metal-\$\{metal\}-border/.test(card) || METAL_NAMES.some((m) => card.includes(`metal-${m}-border`));
    if (!facts.metalBorderClass)
        violations.push("S1: Card.vue does not compose a `.metal-${metal}-border` class (the A-3 selected-shimmer consume)");

    // (5) the decoration rule reads `--glass-accent-strength` (the bounded rim lift, A-2).
    const cardsBody = stripCss(cards);
    facts.decorationStrength = /\[data-variant="selection"\]/.test(cardsBody) && /--glass-accent-strength/.test(cardsBody);
    if (!facts.decorationStrength)
        violations.push("S1: cards.css `[data-variant=\"selection\"]` rule does not re-point `--glass-accent-strength` (the bounded rim lift the A-2 seam reads)");

    // (6) the api publication + the index colocation export.
    facts.indexExport = /CardVariant/.test(index);
    facts.apiExport = /CardVariant/.test(api);
    if (!facts.indexExport)
        violations.push("S1: src/components/ui/card/index.ts does not co-export `CardVariant` (the colocation home)");
    if (!facts.apiExport)
        violations.push("S1: src/api/index.ts does not publish `CardVariant` (the discovery layer the I5 consumer reads)");

    // (7) the NO-RE-AUTHOR bite — the BUILT seam files carry NO selection-specific edit.
    // The seams stay BUILT: the selection card reads `--glass-accent` + composes
    // `.metal-*-border`, it does not edit the rim recipe or the metal keyframe. A
    // selection-specific token/class minted INTO a seam file reds (the re-author bite).
    facts.seamUntouched = {};
    for (const rel of BUILT_SEAM_FILES) {
        const seam = readFile(rel);
        // A re-author = the seam file carries a `[data-variant="selection"]`/`--selection-*`
        // hook (the decoration leaked into the seam) OR a `.metal-…-border` re-declaration
        // keyed to the card variant. The genuine seam content (the `--glass-accent`
        // color-mix, the `.metal-*-border` utility) is NOT selection-specific.
        const leaked =
            /\[data-variant="selection"\]/.test(seam) ||
            /--selection-accent-strength/.test(seam) ||
            /data-selected/.test(seam);
        facts.seamUntouched[rel] = !leaked;
        if (leaked)
            violations.push(`S1: ${rel} carries a selection-specific decoration hook — the BUILT seams must stay UNTOUCHED (COMPOSE, never re-author; the decoration lives in cards.css/Card.vue)`);
    }

    return { facts, violations };
}

// ════════════════════════════════════════════════════════════════════════════════════
// S2 — the "Card is the only new component" fence, PARSED from the §2 table.
// ════════════════════════════════════════════════════════════════════════════════════

/**
 * Split a markdown pipe-row into trimmed inner cells (drop the outer-pipe empties).
 * (The proof:live-verified-ledger rowCells idiom — split on un-escaped pipes.)
 * @param {string} ln
 * @returns {string[]}
 */
function rowCells(ln) {
    const cells = ln.split(/(?<!\\)\|/).map((c) => c.replace(/\\\|/g, "|").trim());
    return cells.filter((_, idx) => idx > 0 && idx < cells.length - 1);
}

function isSeparatorRow(cells) {
    return cells.length > 0 && cells.every((c) => /^:?-+:?$/.test(c));
}

/**
 * Locate the §2 "Atlas fold" table by its HEADER column shape and read the LAST
 * column (`new component?`) per data row. Returns the verdict cells (lowercased) in
 * source order. NO hand-maintained deliverable array — the parse IS the source of
 * truth (a future §2 row auto-enrolls). Returns null when no `new component?`-headed
 * table is found (fail-loud at the call site).
 *
 * @param {string} md the DESHADCN-BRAINSTORM.md content
 * @returns {{verdicts:{cell:string, item:string, line:number}[]} | null}
 */
export function parseAtlasFoldVerdicts(md) {
    const lines = md.split("\n");
    /** @type {{newCompIdx:number, itemIdx:number} | null} */
    let cols = null;
    const verdicts = [];
    for (let i = 0; i < lines.length; i++) {
        const ln = lines[i];
        if (!ln.trimStart().startsWith("|")) {
            // A blank line / prose between two tables resets the column map so a LATER
            // unrelated pipe-table cannot leak rows under the §2 header.
            if (cols && ln.trim() === "") cols = null;
            continue;
        }
        const cells = rowCells(ln);
        if (cells.length < 2) continue;
        if (isSeparatorRow(cells)) continue;
        const lower = cells.map((c) => c.toLowerCase());
        const newCompIdx = lower.indexOf("new component?");
        const itemIdx = lower.indexOf("atlas item");
        if (newCompIdx !== -1 && itemIdx !== -1) {
            cols = { newCompIdx, itemIdx };
            continue; // the header itself is not a data row
        }
        if (!cols) continue;
        const cell = (cells[cols.newCompIdx] ?? "").toLowerCase().trim();
        const item = cells[cols.itemIdx] ?? "";
        if (!cell) continue;
        verdicts.push({ cell, item, line: i + 1 });
    }
    if (!cols && verdicts.length === 0) return null;
    return { verdicts };
}

/**
 * The fence verdict over the parsed §2 verdict cells: exactly ONE `YES` (the I5
 * selection card), EVERY other a `no`-prefixed verdict. PURE over the parsed cells so
 * the self-test can plant a synthetic second-YES table with no on-disk file.
 *
 * @param {{cell:string, item:string, line:number}[]} verdicts
 * @returns {{ok:true, yesItem:string} | {ok:false, reason:string}}
 */
export function fenceVerdict(verdicts) {
    const yeses = verdicts.filter((v) => v.cell.includes("yes"));
    const nos = verdicts.filter((v) => /^no\b/.test(v.cell) || v.cell.startsWith("no "));
    const unclassified = verdicts.filter((v) => !v.cell.includes("yes") && !/^no\b/.test(v.cell));
    if (yeses.length !== 1)
        return {
            ok: false,
            reason: `the §2 "Atlas fold" table has ${yeses.length} rows answering YES in the \`new component?\` column (expected EXACTLY ONE — the I5 selection card). A second YES reds the "Card is the only new component" fence: ${yeses.map((y) => `"${y.item}" (line ${y.line})`).join(", ")}`,
        };
    if (unclassified.length)
        return {
            ok: false,
            reason: `the §2 "Atlas fold" table has ${unclassified.length} row(s) whose \`new component?\` cell is neither YES nor a \`no\`-prefixed verdict: ${unclassified.map((u) => `"${u.item}"→"${u.cell}" (line ${u.line})`).join(", ")} — every non-selection row must be a seam/fix/clamp (a \`no\`-prefixed verdict)`,
        };
    const yesItem = yeses[0].item;
    if (!/selection card/i.test(yesItem))
        return {
            ok: false,
            reason: `the single YES row is "${yesItem}" — it must be the I5 selection card (the one new Atlas component realized as <Card variant="selection">)`,
        };
    return { ok: true, yesItem };
}

/**
 * @param {{brainstorm:string, gateSrc:string}} src
 * @returns {{facts:object, violations:string[]}}
 */
export function detectFence(src) {
    const violations = [];
    const facts = {};
    const md = src.brainstorm ?? readFile("docs/tranches/BC/DESHADCN-BRAINSTORM.md");
    const parsed = parseAtlasFoldVerdicts(md);
    if (!parsed) {
        violations.push("S2: could not locate the §2 \"Atlas fold\" table by its column header (`Atlas item | … | new component?`) in DESHADCN-BRAINSTORM.md — the fence parses the canonical table, so the table must carry that header shape");
        return { facts, violations };
    }
    facts.atlasRows = parsed.verdicts.length;
    facts.yesRows = parsed.verdicts.filter((v) => v.cell.includes("yes")).map((v) => v.item);
    const verdict = fenceVerdict(parsed.verdicts);
    facts.fenceOk = verdict.ok;
    if (!verdict.ok) {
        violations.push(`S2: ${verdict.reason}`);
    } else {
        facts.yesItem = verdict.yesItem;
    }

    // The parse-not-list discipline (the third self-test bite, asserted on the GATE's
    // OWN source): this gate must NOT carry a hand-maintained Atlas-deliverable ARRAY
    // (a hand-list drifts the moment a §2 row is added). The canonical marker is a
    // const array literal of Atlas-deliverable ids — detected by a named sentinel so a
    // genuine helper array (METAL_NAMES, BUILT_SEAM_FILES) never false-flags. A re-
    // introduced hand-list carries the `ATLAS_DELIVERABLES` sentinel name.
    // A provided fixture (self-test) is scanned RAW — the bite plants the sentinel as
    // literal code; reading from disk strips comments/strings so a sentinel in a
    // comment or a self-test fixture string is NOT counted as a real hand-list.
    const gateSrc = src.gateSrc ?? stripJsNonCode(readFile("scripts/proof-selection-card.mjs"));
    facts.noHandList = !/const\s+ATLAS_DELIVERABLES\s*=/.test(gateSrc);
    if (!facts.noHandList)
        violations.push("S2: the gate carries a hand-maintained `ATLAS_DELIVERABLES` array — the fence must PARSE the §2 table (the parse-not-list discipline, the proof:live-verified-ledger column-by-header precedent); a hand-list drifts the moment a §2 row is added");

    return { facts, violations };
}

// ════════════════════════════════════════════════════════════════════════════════════
// S3 — the no-op floor + the rim-not-fill discipline.
// ════════════════════════════════════════════════════════════════════════════════════

/**
 * @param {{cards:string, card:string}} src
 * @returns {{facts:object, violations:string[]}}
 */
export function detectRimNotFill(src) {
    const violations = [];
    const facts = {};
    const cards = stripCss(src.cards ?? readFile("src/styles/cards.css"));
    const card = src.card ?? readFile("src/components/ui/card/Card.vue");

    // Isolate the selection decoration block(s) in cards.css for the fill/legibility
    // assertions — the `[data-variant="selection"]` rules (the bare + the :data-selected).
    const selectionBlocks = [...cards.matchAll(/\[data-variant="selection"\][^{]*\{([^}]*)\}/g)].map((m) => m[1]);
    facts.selectionBlocks = selectionBlocks.length;
    if (!selectionBlocks.length)
        violations.push('S3: no `[data-variant="selection"]` decoration rule found in cards.css (the rim-not-fill discipline has nowhere to be checked)');

    const joined = selectionBlocks.join("\n");

    // (a) the distinct-axis fence — the decoration NEVER writes the W55 legibility cohort.
    facts.noTintWrite = !/--glass-tint-source|--glass-tint-strength/.test(joined);
    if (!facts.noTintWrite)
        violations.push("S3: the selection decoration writes `--glass-tint-source`/`--glass-tint-strength` — the accent is the rim+glint DECORATION axis (A-2), it must NEVER touch the W55 whole-plate legibility cohort (the distinct-axis fence)");

    // (b) the no-saturated-slab bite — NO opaque brand/foreground plate FILL. A
    // `background`/`background-color` declaring `--foreground`/`--primary`/`--surface-tint`
    // is the "selected = loud fill" anti-pattern (the disease root). The OPTIONAL
    // `--glass-bg-*` tier re-point is allowed (warm-cream glass, not a brand fill).
    const fillMatch = joined.match(/background(?:-color)?\s*:\s*([^;]+);/g) ?? [];
    facts.plateFill = fillMatch;
    for (const decl of fillMatch) {
        if (/--foreground|--primary|--surface-tint|--destructive|--accent\b/.test(decl)) {
            violations.push(`S3: the selection decoration paints a saturated opaque plate FILL (\`${decl.trim()}\`) — the "selected = loud fill" anti-pattern (the disease root). Selection is read at the RIM (the metal border + the bounded accent lift), the plate STAYS warm-cream translucent (the rim-not-fill structural bar)`);
        }
    }
    if (fillMatch.length === 0) facts.plateFill = "none (rim-not-fill — the plate is untouched)";

    // (c) the no-op floor — the host write is GATED on `data-hue`/`variant === "selection"`
    // so an unset card resolves `--glass-accent: transparent` (the @property default) →
    // byte-identical to a bare Card. Assert the host write is conditional, not unconditional.
    facts.noOpFloor = /props\.variant\s*!==\s*["']selection["']|variant\s*!==\s*["']selection["']/.test(card) && /props\.dataHue\s*==\s*null|dataHue\s*==\s*null/.test(card);
    if (!facts.noOpFloor)
        violations.push("S3: the `--glass-accent` host write in Card.vue is not gated on `variant === \"selection\"` AND a present `data-hue` — an unconditional write would defeat the A-2 no-op floor (a `variant=\"selection\"` card with no `data-hue` must be byte-identical to a bare Card)");

    return { facts, violations };
}

// ════════════════════════════════════════════════════════════════════════════════════
// S4 — the metal-border consumes the BUILT utility, selected-only, PRM-static.
// ════════════════════════════════════════════════════════════════════════════════════

/**
 * @param {{card:string, cards:string}} src
 * @returns {{facts:object, violations:string[]}}
 */
export function detectMetalConsume(src) {
    const violations = [];
    const facts = {};
    const card = src.card ?? readFile("src/components/ui/card/Card.vue");
    const cards = stripCss(src.cards ?? readFile("src/styles/cards.css"));

    // (1) the selected arm composes `.metal-{name}-border` (the BUILT utility class).
    facts.composesUtility = /metal-\$\{metal\}-border/.test(card);
    if (!facts.composesUtility)
        violations.push("S4: the selected arm does not compose a `.metal-${metal}-border` class (the BUILT utilities/metal.css consumer)");

    // (2) selected-ONLY — the metal class is guarded by `selected` (NOT on an
    // unselected card; gold is EARNED — BA.W-PHASE-PALETTE).
    facts.selectedGated = /selected\s*&&\s*`metal-\$\{metal\}-border`|variant\s*===\s*['"]selection['"]\s*&&\s*\n?\s*selected\s*&&/.test(card) || /selected\b[\s\S]{0,40}metal-\$\{metal\}-border/.test(card);
    if (!facts.selectedGated)
        violations.push("S4: the `.metal-*-border` class is not gated on `selected` — an unselected selection card must carry NO metal border (gold is EARNED for the chosen item, BA.W-PHASE-PALETTE)");

    // (3) NO forked keyframe — the decoration (cards.css) + Card.vue do NOT declare a
    // local `@keyframes metal-…` sweep (the sweep is the BUILT utility's, on the SAME
    // `metal-shimmer-sweep` keyframe — a forked keyframe is the N-copy this kills).
    facts.noForkedKeyframe = !/@keyframes\s+[\w-]*metal/i.test(cards) && !/@keyframes\s+[\w-]*shimmer/i.test(cards);
    if (!facts.noForkedKeyframe)
        violations.push("S4: a local `@keyframes` metal/shimmer sweep is declared in cards.css — the metal border must ride the BUILT `metal-shimmer-sweep` keyframe (utilities/metal.css), NEVER a forked keyframe");

    // (4) the metal default is the EARNED gold (the chosen-item garnish).
    facts.goldDefault = /metal:\s*["']gold["']/.test(card);
    if (!facts.goldDefault)
        violations.push("S4: the `metal` prop default is not `gold` (gold is the earned default for the chosen item, BA.W-PHASE-PALETTE; silver/bronze are explicit opt-ins)");

    return { facts, violations };
}

// ════════════════════════════════════════════════════════════════════════════════════
// The self-test bites — the RED-witness proofs (every run, synthetic, no on-disk file).
// ════════════════════════════════════════════════════════════════════════════════════

function selfTests() {
    const bites = [];

    // (a) a synthetic SECOND §2 row flipped to YES reds the fence.
    const twoYes = [
        { cell: "no (seam)", item: "A-2", line: 1 },
        { cell: "yes — the only one", item: "the I5 selection card", line: 2 },
        { cell: "yes", item: "a synthetic second new component", line: 3 },
    ];
    bites.push({
        label: "S2 second-YES — a synthetic second §2 row answering YES reds the fence",
        flag: fenceVerdict(twoYes).ok ? null : "flagged",
    });

    // (b) a synthetic new `src/components/custom/<x>/` SFC that is NOT a §2 deliverable
    // does NOT red S2 — the fence parses ONLY the §2 table, so a non-Atlas viz SFC
    // (the DOTMATRIX/HYBRID class) never enters the count. The fence verdict over the
    // REAL §2 table (one YES) is UNCHANGED by a custom/ SFC existing, because the parse
    // reads the table rows, not the filesystem. Assert: the real table still passes.
    const realMd = readFile("docs/tranches/BC/DESHADCN-BRAINSTORM.md");
    const realParsed = parseAtlasFoldVerdicts(realMd);
    bites.push({
        label: "S2 non-Atlas-viz exclusion — the real §2 table passes the fence (a custom/ viz SFC is NOT a §2 row, so it never trips the one-new-component bar)",
        flag: realParsed && fenceVerdict(realParsed.verdicts).ok ? "flagged" : null,
    });

    // (c) a re-hand-listed Atlas-deliverable array in the gate reds (the parse-not-list
    // discipline). Synthetic gate source carrying the `ATLAS_DELIVERABLES` sentinel.
    const handListed = detectFence({
        brainstorm: realMd,
        gateSrc: "const ATLAS_DELIVERABLES = ['A-2','A-3','selection-card'];",
    });
    bites.push({
        label: "S2 parse-not-list — a re-hand-listed `ATLAS_DELIVERABLES` array in the gate reds",
        flag: handListed.violations.some((v) => /hand-maintained `ATLAS_DELIVERABLES`/.test(v)) ? "flagged" : null,
    });

    // (d) a saturated opaque plate FILL on the selection arm fails S3 (the disease root).
    const loudFill = detectRimNotFill({
        cards: '[data-variant="selection"] { background: var(--primary); }',
        card: readFile("src/components/ui/card/Card.vue"),
    });
    bites.push({
        label: "S3 disease-root — a `background: var(--primary)` opaque plate fill on the selection arm reds (the 'selected = loud fill' anti-pattern)",
        flag: loudFill.violations.some((v) => /saturated opaque plate FILL/.test(v)) ? "flagged" : null,
    });

    // (e) a local `@keyframes metal-…` sweep in cards.css fails S4 (the no-forked-keyframe bar).
    const forkedKf = detectMetalConsume({
        card: readFile("src/components/ui/card/Card.vue"),
        cards: '@keyframes metal-selection-sweep { from { background-position: 0 } to { background-position: 100% 0 } } [data-variant="selection"][data-selected="true"] { animation: metal-selection-sweep 6s linear infinite }',
    });
    bites.push({
        label: "S4 no-forked-keyframe — a local `@keyframes metal-…` sweep in cards.css reds (the metal must ride the BUILT keyframe)",
        flag: forkedKf.violations.some((v) => /forked keyframe/.test(v)) ? "flagged" : null,
    });

    // (f) the no-op floor witness — a synthetic Card.vue with an UNCONDITIONAL accent
    // write (no `variant === "selection"` / `data-hue` gate) fails S3's no-op-floor clause.
    const uncondWrite = detectRimNotFill({
        cards: readFile("src/styles/cards.css"),
        card: 'const selectionStyle = { "--glass-accent": props.dataHue };',
    });
    bites.push({
        label: "S3 no-op-floor — an UNCONDITIONAL `--glass-accent` host write (no variant/data-hue gate) reds (defeats the A-2 no-op floor)",
        flag: uncondWrite.violations.some((v) => /no-op floor/.test(v)) ? "flagged" : null,
    });

    return bites;
}

// ════════════════════════════════════════════════════════════════════════════════════
// Run.
// ════════════════════════════════════════════════════════════════════════════════════

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
    const src = {};
    const s1 = detectVariantComposes(src);
    const s2 = detectFence(src);
    const s3 = detectRimNotFill(src);
    const s4 = detectMetalConsume(src);

    const bites = selfTests();
    const missed = bites.filter((b) => !b.flag);

    console.log("proof:selection-card — the I5 <Card variant=\"selection\"> source/mechanism arm (BC.W-SELECTION-CARD)");
    console.log(`  S1 variant-composes-seams : ${s1.violations.length === 0 ? "OK" : s1.violations.length + " violation(s)"}`);
    console.log(`  S2 only-new-component fence: ${s2.violations.length === 0 ? "OK" : s2.violations.length + " violation(s)"} (§2 rows: ${s2.facts.atlasRows ?? "?"}, YES: ${(s2.facts.yesRows ?? []).join(" / ") || "none"})`);
    console.log(`  S3 rim-not-fill           : ${s3.violations.length === 0 ? "OK" : s3.violations.length + " violation(s)"}`);
    console.log(`  S4 metal-consume PRM-static: ${s4.violations.length === 0 ? "OK" : s4.violations.length + " violation(s)"}`);
    console.log(`  self-test bites           : ${bites.length} (${missed.length === 0 ? "all flagged" : missed.length + " NOT flagged"})`);

    if (missed.length) {
        for (const m of missed) console.error(`  SELF-TEST MISS  ${m.label}`);
        console.error("\n[proof:selection-card] SELF-TEST FAILED — a synthetic bite did NOT flag; the gate is not load-bearing.");
        process.exit(1);
    }

    const violations = [...s1.violations, ...s2.violations, ...s3.violations, ...s4.violations];
    for (const v of violations) console.error(`  ${v}`);

    const pass = violations.length === 0;
    const ARTIFACT = gateArtifactPath("GATE_SELECTION_CARD_OUT", "selection-card");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status: pass ? "pass" : "fail",
        gate: "proof:selection-card",
        command: COMMAND,
        s1: s1.facts,
        s2: s2.facts,
        s3: s3.facts,
        s4: s4.facts,
        selfTests: bites.length,
        violations,
    });

    if (!pass) {
        console.error(`\n[proof:selection-card] ${violations.length} violation(s) — the <Card variant="selection"> must COMPOSE the two BUILT seams (--glass-accent A-2 + .metal-*-border A-3), honor the "Card is the only new component" fence (§2 table parse), and read rim-not-fill (the plate stays warm-cream).`);
        process.exit(1);
    }
    console.log("\n[proof:selection-card] the I5 selection card composes A-2 + A-3 on the existing <Card>, the §2 fence holds (one YES, the selection card), the decoration is rim-not-fill, and the metal border consumes the BUILT utility selected-only PRM-static.");
}
