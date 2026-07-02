// proof:meta — the BG F8 plan/process/ledger FAMILY gate (R3 close taxonomy).
//
// F8 uses the R3 taxonomy: `proof:build` (release machine) · `proof:meta`
// (plan/ledger/process/doc-freshness) · `proof:warm-identity` (paint). There is NO
// `proof:close`. `proof:meta` is ONE GROWING family gate — a small clause runner
// each F8 close wave appends its own clause to (fable-arm-present, constraint-
// manifest, close-sweep, gestalt-cursor-parity, edict-verdict-present, …). This
// wave (BG.W-FABLE-DESIGN-ARM, F8.3) SEEDS the runner + lands the FIRST clause.
//
// ── The clause: `fable-arm-present` (GA-3 / PE-FABLE) ─────────────────────────
// The 2026-07-01 Fable/DesignSync mandate: any/all frontend DESIGN work is done by
// FABLE instances (the frontend-design MCP); DesignSync syncs surfaces to a
// claude.ai/design project for card-based gestalt review; opus/sonnet fan-out is
// for MECHANICAL audit/build only. So EVERY VISUAL wave must NAME its Fable design
// arm (`fableArm`) + its DesignSync review surface (`designSyncSurface`), and a
// visual wave closes ONLY on a filed FABLE gestalt PASS — never a self-judged
// builder verdict (the direct cure for "opus-fanout-built visuals judged
// disastrous"). At the RESPEC-GESTALT fold this was UNENCODED (grep Fable|DesignSync
// across the plans = 0/0/0/0 — 0/61 compliant). This gate makes the schema
// MACHINE-CHECKED: it is a SCHEMA edit, not a checkbox.
//
// Two sub-checks (both under the ONE `fable-arm-present` arm):
//
//   S1 — SCHEMA completeness. The BG+BH joint cursor
//        `docs/tranches/BG/execution/EXECUTION-PROGRESS.md` §1 MASTER TABLE is the
//        single machine-readable per-wave source (`hydrateCursor` reads it,
//        `proof:live-verified-ledger` parses it). Parsed BY HEADER NAME (the
//        column-order-FREE discipline — BB.W-LEDGER-REPAIR precedent): the header
//        row is the first pipe-row whose cells include `wave` + `class` + a
//        `fable`-prefixed column. EVERY VISUAL row (its `class` cell carries a
//        standalone paint `P` token — `P` / `H/P` / `P (cond)`; a bare `H` / `H→ci`
//        is NOT visual) must name BOTH halves in its `fable / designSync` cell: a
//        non-`—`, non-empty value split by ` / ` (space-slash-space — an internal
//        `darken/lift` / `Card/Tab/Slider/Dialog` slash never false-splits) into a
//        non-empty fableArm AND a non-empty designSyncSurface. A VISUAL row with a
//        `—`, an empty, or a half-less cell REDs (the exact 0/61 gap).
//
//   S2 — PROVISIONING presence. The USER-GATED DesignSync provisioning + the CLOSE
//        PRECONDITION are recorded in the canon home
//        `docs/tranches/BG/canon/fable-design-arm.md` (OUT of the src submodule):
//        it carries the CLOSE-PRECONDITION sentence (a filed FABLE PASS — NOT the
//        building agent), the USER-GATED provisioning note + the enforceable-in-
//        both-states fallback (until provisioned, a FABLE instance records the
//        verdict against the committed dual-engine captures). And the
//        `DIRECTIVE-LEDGER` §7b PE-FABLE process-edict row is present + names
//        `W-FABLE-DESIGN-ARM` as its owner (the 07-01 re-stamp honored).
//
// The provisioning of the DesignSync project ITSELF is USER-GATED (R16) — this gate
// does NOT stand up a claude.ai/design project (no MCP side effect in a device-free
// gate); it locks the SCHEMA + the recorded routing so the mandate cannot silently
// un-encode, in BOTH the provisioned and the not-yet-provisioned state.
//
// SELF-TEST (born-RED→GREEN): `node scripts/proof-meta.mjs --self-test` feeds the
// PURE detector synthetic §1-shaped markdown — a VISUAL(`P`) row with a `—` fable
// cell (FLAG), a VISUAL row with a proper `X / Y` cell (no flag), a NON-visual(`H`)
// row with a `—` cell (no flag — the class-aware bite), a VISUAL row with a
// half-less `X / ` cell (FLAG), a VISUAL(`H/P`) row with `—` (FLAG). If the detector
// misses any planted gap OR false-flags a compliant/non-visual row, the gate reds
// loudly (acceptance is the RED-witness inverse).
//
// Device-free; self-contained (reads only committed BG docs under glass-ui — no
// sibling deps, runs siblings-absent). `["local","ci"]`.

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, writeGateArtifact } from "./gate-output.mjs";

const CURSOR = join(ROOT, "docs/tranches/BG/execution/EXECUTION-PROGRESS.md");
const CANON = join(ROOT, "docs/tranches/BG/canon/fable-design-arm.md");
const LEDGER = join(ROOT, "docs/tranches/BG/DIRECTIVE-LEDGER.md");

// ── Markdown table parsing — BY HEADER NAME (column order is FREE) ─────────────
// Split a pipe-row into trimmed inner cells (drop the outer-pipe empties). An
// escaped `\|` is a LITERAL pipe inside a cell, not a delimiter.
function rowCells(ln) {
    const cells = ln.split(/(?<!\\)\|/).map((c) => c.replace(/\\\|/g, "|").trim());
    return cells.filter((_, idx) => idx > 0 && idx < cells.length - 1);
}

/** A markdown separator row (`|---|---|`) carries only dashes/colons. */
function isSeparatorRow(cells) {
    return cells.length > 0 && cells.every((c) => /^:?-+:?$/.test(c));
}

/** A cell is a real BG/BH wave id (skips legend/prose/§1b/§2 rows). */
function isWaveId(cell) {
    return /^B[GH]\.[WB]/.test(cell);
}

/** A class cell is VISUAL iff it carries a standalone paint `P` token. */
function isVisualClass(cls) {
    return /(^|[^A-Za-z])P([^A-Za-z]|$)/.test(cls);
}

/**
 * The `fable / designSync` cell names BOTH halves iff it is non-empty, not `—`,
 * and splits on ` / ` (space-slash-space) into a non-empty fableArm AND a
 * non-empty designSyncSurface. Internal `/` (no surrounding spaces) never splits.
 */
function declaresBothArms(cell) {
    const v = cell.trim();
    if (v === "" || v === "—") return false;
    if (!v.includes(" / ")) return false;
    const [arm, ...rest] = v.split(" / ");
    return arm.trim() !== "" && rest.join(" / ").trim() !== "";
}

/**
 * The PURE detector (self-testable on synthetic markdown). Parses the §1 MASTER
 * TABLE — the ONLY table whose header names `wave` + `class` + a `fable`-prefixed
 * column — and returns the VISUAL rows that fail to declare both arms.
 *
 * The column map re-anchors on EVERY header-shaped row (a pipe-row carrying a
 * `wave` cell): a §1-shaped header (wave+class+fable) sets the indices; ANY OTHER
 * header (§1b `wave|fam|disposition`, §2 `seq|wave|fam|status|…`) sets the map to
 * null so its rows are NEVER mis-read against §1's indices.
 *
 * @param {string} md
 * @returns {{ visualCount:number, gaps:{wave:string, cls:string, fable:string, reason:string}[], sawTable:boolean }}
 */
function findFableGaps(md) {
    const gaps = [];
    let cols = null;
    let sawTable = false;
    let visualCount = 0;
    for (const ln of md.split("\n")) {
        if (!ln.trimStart().startsWith("|")) continue;
        const cells = rowCells(ln);
        if (cells.length < 2) continue;
        if (isSeparatorRow(cells)) continue;
        const lower = cells.map((c) => c.toLowerCase());
        // Re-anchor on any header-shaped row (carries a `wave` header cell).
        if (lower.includes("wave")) {
            const waveIdx = lower.indexOf("wave");
            const classIdx = lower.indexOf("class");
            const fableIdx = lower.findIndex((c) => c.startsWith("fable"));
            cols = classIdx !== -1 && fableIdx !== -1 ? { waveIdx, classIdx, fableIdx } : null;
            if (cols) sawTable = true;
            continue; // the header itself is never a data row
        }
        if (!cols) continue; // outside the §1 MASTER TABLE
        const wave = cells[cols.waveIdx] ?? "";
        if (!isWaveId(wave)) continue;
        const cls = cells[cols.classIdx] ?? "";
        if (!isVisualClass(cls)) continue;
        visualCount += 1;
        const fable = cells[cols.fableIdx] ?? "";
        if (!declaresBothArms(fable)) {
            const reason =
                fable.trim() === "" || fable.trim() === "—"
                    ? "no fableArm/designSyncSurface declared (`—` or empty)"
                    : "cell does not split into a non-empty fableArm ` / ` designSyncSurface";
            gaps.push({ wave, cls, fable, reason });
        }
    }
    return { visualCount, gaps, sawTable };
}

// ── S2 — provisioning presence ────────────────────────────────────────────────
function checkProvisioning() {
    const violations = [];
    if (!existsSync(CANON)) {
        violations.push(
            `provisioning canon absent — ${CANON.replace(ROOT + "/", "")} must record the close-precondition + the USER-GATED DesignSync provisioning`,
        );
    } else {
        const doc = readFileSync(CANON, "utf8");
        // Prose wraps — the marker regexes are whitespace-tolerant (a line break
        // between words must not defeat a presence check).
        const need = [
            [/CLOSE\s+PRECONDITION/i, "the CLOSE-PRECONDITION sentence"],
            [/not\s+the\s+building\s+agent/i, "the FABLE-not-the-builder rule (`not the building agent`)"],
            [/USER-GATED/i, "the USER-GATED provisioning note"],
            [/enforceable\s+in\s+both\s+states/i, "the enforceable-in-both-states fallback"],
        ];
        for (const [re, label] of need) {
            if (!re.test(doc)) violations.push(`provisioning canon missing ${label}`);
        }
    }
    if (!existsSync(LEDGER)) {
        violations.push(`DIRECTIVE-LEDGER absent — ${LEDGER.replace(ROOT + "/", "")}`);
    } else {
        const led = readFileSync(LEDGER, "utf8");
        if (!/PE-FABLE/.test(led)) {
            violations.push("DIRECTIVE-LEDGER §7b missing the PE-FABLE process-edict row");
        } else if (!/PE-FABLE[\s\S]{0,1400}?W-FABLE-DESIGN-ARM/.test(led)) {
            violations.push("DIRECTIVE-LEDGER PE-FABLE row does not name `W-FABLE-DESIGN-ARM` as owner");
        }
    }
    return violations;
}

// ── The `fable-arm-present` clause (S1 + S2) ──────────────────────────────────
function fableArmPresent() {
    const failures = [];
    if (!existsSync(CURSOR)) {
        return {
            clause: "fable-arm-present",
            visualCount: 0,
            failures: [`cursor absent — ${CURSOR.replace(ROOT + "/", "")}`],
        };
    }
    const { visualCount, gaps, sawTable } = findFableGaps(readFileSync(CURSOR, "utf8"));
    if (!sawTable) {
        failures.push(
            "could not locate the §1 MASTER TABLE — no pipe-row header names `wave` + `class` + a `fable`-prefixed column",
        );
    }
    for (const g of gaps) {
        failures.push(`VISUAL wave \`${g.wave}\` (class \`${g.cls}\`) — ${g.reason} [cell: \`${g.fable}\`]`);
    }
    for (const v of checkProvisioning()) failures.push(v);
    return { clause: "fable-arm-present", visualCount, failures };
}

// The family runner — each F8 close wave appends its clause here.
const CLAUSES = [fableArmPresent];

function runClauses() {
    return CLAUSES.map((fn) => fn());
}

// ── SELF-TEST ─────────────────────────────────────────────────────────────────
const SYNTH_HEADER =
    "| seq | wave | fam | class | status | gate arm | fable / designSync | preconds | source |\n" +
    "|----|------|:---:|:-----:|:------:|----------|--------------------|----------|--------|\n";
const synthTable = (rows) => SYNTH_HEADER + rows.join("\n") + "\n";
const row = (wave, cls, fable) => `| x | ${wave} | F2 | ${cls} | PENDING | g | ${fable} | — | k |`;

function selfTest() {
    const bites = [];

    // bite 1 — a VISUAL(P) row with a `—` fable cell MUST flag.
    {
        const md = synthTable([row("BG.W-PLANTED-A", "P", "—")]);
        const flagged = findFableGaps(md).gaps.some((g) => g.wave === "BG.W-PLANTED-A");
        bites.push(["visual-P-dash → FLAG", flagged]);
    }
    // bite 2 — a VISUAL(P) row with a proper `X / Y` cell must NOT flag.
    {
        const md = synthTable([row("BG.W-PLANTED-B", "P", "some arm / some surface")]);
        const flagged = findFableGaps(md).gaps.some((g) => g.wave === "BG.W-PLANTED-B");
        bites.push(["visual-P-both-arms → NO-flag", !flagged]);
    }
    // bite 3 — a NON-visual(H) row with a `—` cell must NOT flag (class-aware).
    {
        const md = synthTable([row("BG.W-PLANTED-C", "H", "—")]);
        const flagged = findFableGaps(md).gaps.some((g) => g.wave === "BG.W-PLANTED-C");
        bites.push(["nonvisual-H-dash → NO-flag", !flagged]);
    }
    // bite 4 — a VISUAL(P) row with a half-less `X / ` cell MUST flag (both-halves).
    {
        const md = synthTable([row("BG.W-PLANTED-D", "P", "arm-only / ")]);
        const flagged = findFableGaps(md).gaps.some((g) => g.wave === "BG.W-PLANTED-D");
        bites.push(["visual-P-half-less → FLAG", flagged]);
    }
    // bite 5 — a VISUAL(H/P) row with a `—` cell MUST flag (H/P is visual).
    {
        const md = synthTable([row("BG.W-PLANTED-E", "H/P", "—")]);
        const flagged = findFableGaps(md).gaps.some((g) => g.wave === "BG.W-PLANTED-E");
        bites.push(["visual-HP-dash → FLAG", flagged]);
    }
    // bite 6 — an internal `/` (no spaces) never false-splits the arm halves.
    {
        const md = synthTable([row("BG.W-PLANTED-F", "P", "press/drag gestalt / gesture card set")]);
        const flagged = findFableGaps(md).gaps.some((g) => g.wave === "BG.W-PLANTED-F");
        bites.push(["internal-slash → NO-flag", !flagged]);
    }

    console.log("proof:meta — SELF-TEST (fable-arm-present detector, 6 bites)");
    let allFlag = true;
    for (const [name, ok] of bites) {
        console.log(`  ${ok ? "OK    " : "MISS  "}  ${name}`);
        if (!ok) allFlag = false;
    }
    const real = runClauses();
    const realFailures = real.flatMap((c) => c.failures);
    console.log(`  real proof:meta failures : ${realFailures.length}`);
    for (const f of realFailures.slice(0, 25)) console.error(`    ${f}`);
    if (!allFlag) {
        console.error(
            "\n[proof:meta] SELF-TEST FAILED — a synthetic fixture behaved wrong; the detector is not load-bearing.",
        );
        process.exit(1);
    }
    if (realFailures.length > 0) {
        console.error(
            "\n[proof:meta] SELF-TEST FAILED — the REAL cursor is not clean (the GREEN-after state must pass every clause).",
        );
        process.exit(1);
    }
    console.log("\n[proof:meta] SELF-TEST GREEN — all 6 bites behave, the real cursor passes fable-arm-present.");
    process.exit(0);
}

// ── main ──────────────────────────────────────────────────────────────────────
if (process.argv.includes("--self-test")) {
    selfTest();
} else {
    const clauses = runClauses();
    const failures = clauses.flatMap((c) => c.failures.map((f) => ({ clause: c.clause, msg: f })));
    const visualCount = clauses.find((c) => c.clause === "fable-arm-present")?.visualCount ?? 0;

    console.log("proof:meta — the BG F8 plan/process family gate (BG.W-FABLE-DESIGN-ARM · fable-arm-present)");
    console.log(`  §1 VISUAL waves        : ${visualCount}`);
    console.log(`  clauses                : ${clauses.map((c) => c.clause).join(", ")}`);
    console.log(`  failures               : ${failures.length}`);
    for (const f of failures) console.error(`  [${f.clause}] ${f.msg}`);

    writeGateArtifact(gateArtifactPath("GLASS_UI_META_ARTIFACT", "meta"), {
        clauses: clauses.map((c) => c.clause),
        visualWaves: visualCount,
        failures: failures.map((f) => `[${f.clause}] ${f.msg}`),
        ok: failures.length === 0,
    });

    if (failures.length > 0) {
        console.error(
            `\n[proof:meta] ${failures.length} violation(s) — a VISUAL wave does not name its fableArm + designSyncSurface, or the Fable/DesignSync provisioning is un-recorded. The mandate is un-encoded; the close cannot proceed.`,
        );
        process.exit(1);
    }
    console.log(
        "\n[proof:meta] every VISUAL wave names its fableArm + designSyncSurface + the Fable/DesignSync provisioning is recorded — the mandate is machine-encoded.",
    );
    process.exit(0);
}
