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
import { pathToFileURL } from "node:url";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, writeGateArtifact } from "./gate-output.mjs";
// The SHARED detector kit (BG.W-GATE-FAMILY-CONSOLIDATE, F8.1). proof:meta is the
// kit's FIRST live consumer — the inlined rowCells / isSeparatorRow / isWaveId /
// isVisualClass helpers this file used to carry are now imported from the ONE
// home (scripts/lib/detect/), the DRY the consolidation rests on.
import {
    rowCells,
    isSeparatorRow,
    isWaveId,
    isVisualClass,
    DETECT_KIT_ROSTER,
} from "./lib/detect/index.mjs";
import {
    DETECTOR_KIT,
    DIRECTION,
    PAINT_ORACLE,
    PROTECT_SET,
    validateConsolidation,
} from "./gate-family-manifest.mjs";
import { GATES, gatesFor } from "./gates.mjs";

const CURSOR = join(ROOT, "docs/tranches/BG/execution/EXECUTION-PROGRESS.md");
const CANON = join(ROOT, "docs/tranches/BG/canon/fable-design-arm.md");
const LEDGER = join(ROOT, "docs/tranches/BG/DIRECTIVE-LEDGER.md");
// F8.7 (BG.W-DEFERRAL-DISPOSITIONS) — the deferred-ledger-terminal clause reads the
// fold ledger (the disposition source of truth) + the build-map (the wave-spec authority).
const FOLD_LEDGER_JSON = join(ROOT, "docs/tranches/BG/FOLD-LEDGER.json");
const BUILD_MAP = join(ROOT, "docs/tranches/BG/execution/bg-build-map.md");

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

// ── The `gate-family-consolidate` clause (BG.W-GATE-FAMILY-CONSOLIDATE, F8.1) ──
// The gate-machine transposition: the detector kit is REAL + consumed, the
// consolidation census holds against the LIVE gate registry (protect set intact,
// proof:warm-identity wired PRIMARY), and the census doc records the direction.
const META = join(ROOT, "scripts/proof-meta.mjs");

/** A repo-relative path resolves on disk (the injected IO for the pure validator). */
function repoFileExists(rel) {
    return existsSync(join(ROOT, rel));
}

function gateFamilyConsolidate() {
    const failures = [];

    // A — the detector kit is REAL on disk (barrel + every roster module), and its
    //     named exports are CALLABLE (a stub file would resolve but not export).
    if (!repoFileExists(DETECTOR_KIT.barrel)) {
        failures.push(`detector-kit barrel absent — ${DETECTOR_KIT.barrel}`);
    }
    for (const [mod, exports] of Object.entries(DETECT_KIT_ROSTER)) {
        const rel = `${DETECTOR_KIT.dir}/${mod}`;
        if (!repoFileExists(rel)) failures.push(`detector-kit module absent — ${rel}`);
        void exports; // the export set is asserted callable below
    }
    // The barrel's primitives are load-bearing here (proof:meta calls them) — a
    // severed/empty export reds this file's own fable scan, so the callable proof
    // is that these imports resolved to functions.
    for (const [name, fn] of [
        ["rowCells", rowCells],
        ["isSeparatorRow", isSeparatorRow],
        ["isWaveId", isWaveId],
        ["isVisualClass", isVisualClass],
    ]) {
        if (typeof fn !== "function") {
            failures.push(`detector-kit export \`${name}\` is not callable (a stub/severed barrel).`);
        }
    }

    // B — proof:meta is a REAL consumer of the kit (the ≥1-consumer bar): its own
    //     source imports from scripts/lib/detect/ (not a re-inlined fork).
    if (repoFileExists("scripts/proof-meta.mjs")) {
        const self = readFileSync(META, "utf8");
        if (!/from\s+["']\.\/lib\/detect\/index\.mjs["']/.test(self)) {
            failures.push(
                "proof:meta does not import from ./lib/detect/index.mjs — the kit must be CONSUMED (the shelf-ware fence), not re-inlined.",
            );
        }
    }

    // C — the consolidation census holds against the LIVE gate registry.
    const liveGateIds = new Set(GATES.map((g) => g.id));
    const releaseGateIds = new Set(gatesFor("release").map((g) => g.id));
    for (const v of validateConsolidation({ liveGateIds, releaseGateIds, fileExists: repoFileExists })) {
        failures.push(v);
    }

    return { clause: "gate-family-consolidate", visualCount: 0, failures };
}

// ── The `apca-parallel-witness` clause (BG.W-APCA-CONTRAST, F8.8) ──────────────
// The APCA Lc PARALLEL-WITNESS arm added to scripts/lib/paint-arm.mjs — Lc as the
// SOTA glass-legibility metric ALONGSIDE the WCAG-2 AA arm on composited translucent
// plates (AA's ratio-contrast mis-ranks translucent surfaces; F2.R1 is the first
// binding consumer). This clause is LOAD-BEARING, not a source grep: it dynamically
// imports the arm and EXERCISES it against the APCA-W3 0.1.9 reference vectors + the
// verdict thresholds, so a stub / wrong-constant impl reds here. DYNAMIC import (not
// static) is the born-RED-safe path — on a HEAD without the arm a missing named export
// resolves to `undefined` (a clean per-export failure), never a module-link crash.
const PAINT_ARM = join(ROOT, "scripts/lib/paint-arm.mjs");

async function apcaParallelWitness() {
    const failures = [];
    if (!existsSync(PAINT_ARM)) {
        return {
            clause: "apca-parallel-witness",
            visualCount: 0,
            failures: ["paint-arm leaf absent — scripts/lib/paint-arm.mjs"],
        };
    }
    let mod;
    try {
        mod = await import(pathToFileURL(PAINT_ARM).href);
    } catch (e) {
        return {
            clause: "apca-parallel-witness",
            visualCount: 0,
            failures: [`paint-arm import threw — ${e instanceof Error ? e.message : String(e)}`],
        };
    }
    for (const name of [
        "apcaLuminance",
        "apcaContrastLc",
        "compositeOver",
        "apcaLcFromResolved",
        "apcaVerdict",
        "apcaProbe",
    ]) {
        if (typeof mod[name] !== "function")
            failures.push(
                `paint-arm does not export a callable \`${name}\` — the APCA parallel-witness arm is absent (F8.8 un-landed).`,
            );
    }
    for (const name of ["APCA_LC_BODY", "APCA_LC_SMALL"]) {
        if (typeof mod[name] !== "number")
            failures.push(`paint-arm does not export the numeric \`${name}\` Lc floor.`);
    }
    // Arm present → EXERCISE it (load-bearing; a stub / wrong-constant reds here).
    if (failures.length === 0) {
        const { apcaContrastLc, compositeOver, apcaLcFromResolved, apcaVerdict, APCA_LC_BODY, APCA_LC_SMALL } = mod;
        const near = (a, b, tol) => Number.isFinite(a) && Math.abs(a - b) <= tol;
        // The APCA-W3 0.1.9 reference vectors (the locked spec output).
        if (!near(apcaContrastLc({ r: 0x88, g: 0x88, b: 0x88 }, { r: 255, g: 255, b: 255 }), 63.06, 0.5))
            failures.push("APCA #888-on-#fff Lc ≠ 63.06 (±0.5) — the SAPC constants drifted from APCA-W3 0.1.9.");
        if (!near(apcaContrastLc({ r: 255, g: 255, b: 255 }, { r: 0x88, g: 0x88, b: 0x88 }), -68.54, 0.5))
            failures.push("APCA #fff-on-#888 Lc ≠ -68.54 (±0.5) — the reverse-polarity (WoB) path drifted.");
        if (apcaContrastLc({ r: 128, g: 128, b: 128 }, { r: 128, g: 128, b: 128 }) !== 0)
            failures.push("APCA identical-colour Lc ≠ 0 — the low-∆Y early-return broke.");
        // compositeOver: 50%-alpha white over black → ~128 grey (the composited-plate seam).
        const mid = compositeOver({ r: 255, g: 255, b: 255, alpha: 0.5 }, { r: 0, g: 0, b: 0 });
        if (!(near(mid.r, 128, 1) && near(mid.g, 128, 1) && near(mid.b, 128, 1)))
            failures.push("compositeOver 50%-white-over-black ≠ ~128 grey — the alpha-over arithmetic broke.");
        // apcaLcFromResolved: warm ink over a translucent cream plate over white → legible.
        const lc = apcaLcFromResolved("rgb(28 25 23)", "color(srgb 0.98 0.97 0.96 / 0.65)", "rgb(255 255 255)");
        if (lc == null || Math.abs(lc) < APCA_LC_BODY)
            failures.push(`apcaLcFromResolved warm-ink/cream-plate composite Lc = ${lc} — the composited-plate readback is degenerate.`);
        // apcaVerdict thresholds: body floor 60, small floor 75; |signed| compare.
        if (!apcaVerdict(63, { size: "body" }).pass)
            failures.push("apcaVerdict |63| body should PASS the 60 floor.");
        if (apcaVerdict(63, { size: "small" }).pass)
            failures.push("apcaVerdict |63| small should FAIL the 75 floor.");
        if (!apcaVerdict(-80, { size: "small" }).pass)
            failures.push("apcaVerdict |-80| small should PASS the 75 floor (signed Lc, abs compare).");
        if (apcaVerdict(null).pass) failures.push("apcaVerdict(null) should FAIL (degenerate read).");
        if (APCA_LC_BODY !== 60 || APCA_LC_SMALL !== 75)
            failures.push(`APCA floors ≠ 60/75 (the RECOVERED-LIQUID-ANIM-FINDINGS [10] spec target) — got ${APCA_LC_BODY}/${APCA_LC_SMALL}.`);
    }
    return { clause: "apca-parallel-witness", visualCount: 0, failures };
}

// ── The `deferred-ledger-terminal` clause (BG.W-DEFERRAL-DISPOSITIONS, F8.7) ────
// GA-6 + GA-5, the two halves of the deferral surface DECIDED:
//   (a) GA-6 RETIRE-in-place — the 7 speculative "wants-it-someday" registers (aurora
//       satin/prism/reactive + tab-ios-capsule + alive-idle + anticipate-follow +
//       concentric-radius; 11 FOLD-LEDGER.json rows across the BE/BF convergence) are
//       DECIDED-TERMINAL: NONE is DEFER-with-trigger, each is a terminal RETIRE carrying
//       a non-empty rationale + successor (the BB.W-NDA-DECIDE no-re-book discipline —
//       "the hope is not a trigger", the J-inv-10 ≥2-consumer bar failing INWARD).
//   (b) GA-5 no-carrier registers — the 5 BD registers that fell through with a ledger
//       row but ZERO buildable wave now each NAME a real wave-spec carrier resolving in
//       the BG build-map (metal ×2 → BG.W-AUR-METAL-FINISH / BG.W-AUR-IMAGE-SOURCE (F9),
//       advection → BG.W-DOTFLOW-REBUILD (6.6 AMEND), sub-types → BG.W-STORY-PAGE-API
//       (16.3 AMEND), aristotelian → BG.W-ARISTOTELIAN-PROPORTION (F8.6)).
// Born-RED on a HEAD where the 11 register rows are DEFER-with-trigger (the pre-flip
// state); GREEN once every one is a terminal RETIRE with rationale + successor AND every
// carrier resolves. The PURE detector operates on injected {ledger, buildMapText} so the
// self-test feeds synthetic fixtures (a re-flipped-to-DEFER row MUST flag). This clause
// carries ZERO pixels — the visual metal/image/dotflow sub-waves carry their own π/proof:viz.

// The 11 ledger rows across the 7 speculative registers (the anti-evasion set — a future
// edit that flips ANY back to DEFER-with-trigger, or drops its rationale/successor, reds).
const RETIRE_REGISTER_IDS = [
    "BE.W-AUR-SATIN",
    "BF.W-AUR-SATIN",
    "BE.W-AUR-PRISM",
    "BF.W-AUR-PRISM",
    "BE.W-AUR-REACTIVE",
    "BF.W-AUR-REACTIVE",
    "BE.W-TAB-IOS-CAPSULE",
    "BF.W-TAB-IOS-CAPSULE",
    "BE.W-ALIVE-IDLE",
    "BE.W-ANTICIPATE-FOLLOW",
    "BE.W-CONCENTRIC-RADIUS",
];

// The 5 GA-5 no-carrier BD registers → their real carrier wave-specs (each must resolve
// in the build-map — the wave-spec authority proof:bg-deferred-ledger also reads).
const CARRIER_WAVES = [
    "BG.W-AUR-METAL-FINISH", // metallic ×2 → F9 (6.10)
    "BG.W-AUR-IMAGE-SOURCE", // blurred-image-bg → F9 (6.11)
    "BG.W-DOTFLOW-REBUILD", // advection flow register → 6.6 (AMEND)
    "BG.W-STORY-PAGE-API", // Demo{Stage,Specimen,…} sub-types → 16.3 (AMEND)
    "BG.W-ARISTOTELIAN-PROPORTION", // aristotelian edict → F8.6
];

/**
 * The PURE detector — operates on already-loaded objects so the self-test can feed
 * synthetic fixtures. Returns the row-specific failures.
 * @param {{ ledger: any, buildMapText: string }} io
 * @returns {string[]}
 */
function deferredLedgerTerminalCheck({ ledger, buildMapText }) {
    const failures = [];
    const rows = Array.isArray(ledger?.items) ? ledger.items : [];
    const byId = new Map(rows.map((r) => [r.id, r]));
    // (a) GA-6 — every register row is a TERMINAL RETIRE with rationale + successor.
    for (const id of RETIRE_REGISTER_IDS) {
        const row = byId.get(id);
        if (!row) {
            failures.push(`RETIRE register "${id}" has no FOLD-LEDGER.json row (the GA-6 disposition set must carry it).`);
            continue;
        }
        if (row.disposition === "DEFER-with-trigger") {
            failures.push(`RETIRE register "${id}" is still DEFER-with-trigger — the speculative "wants-it-someday" registers must be DECIDED-TERMINAL RETIRE (GA-6; the hope is not a ≥2-consumer trigger).`);
            continue;
        }
        if (row.disposition !== "RETIRE") {
            failures.push(`RETIRE register "${id}" disposition is "${row.disposition}", expected terminal RETIRE (GA-6).`);
        }
        if (!row.rationale || !String(row.rationale).trim())
            failures.push(`RETIRE register "${id}" carries no rationale — a terminal RETIRE must record WHY (the BB.W-NDA-DECIDE discipline).`);
        if (!row.successor || !String(row.successor).trim())
            failures.push(`RETIRE register "${id}" carries no successor — a terminal RETIRE must name the re-entry path (a fresh ≥2-consumer trigger).`);
    }
    // (b) GA-5 — the 5 no-carrier registers each name a REAL wave-spec carrier. The
    //     build-map lists the wave-id without the `BG.` prefix (e.g. `6.10 W-AUR-METAL-
    //     FINISH`), so match the `W-<NAME>` stem (the same authority proof:bg-deferred-
    //     ledger derives its bold roster from).
    for (const wave of CARRIER_WAVES) {
        const stem = wave.replace(/^BG\./, "");
        if (!buildMapText.includes(stem))
            failures.push(`the GA-5 carrier wave "${wave}" is absent from the BG build-map — a no-carrier register still has no buildable wave-spec.`);
    }
    return failures;
}

function deferredLedgerTerminal() {
    for (const [label, p] of [
        ["FOLD-LEDGER.json", FOLD_LEDGER_JSON],
        ["bg-build-map.md", BUILD_MAP],
    ]) {
        if (!existsSync(p))
            return { clause: "deferred-ledger-terminal", visualCount: 0, failures: [`${label} absent — ${p.replace(ROOT + "/", "")}`] };
    }
    let ledger;
    try {
        ledger = JSON.parse(readFileSync(FOLD_LEDGER_JSON, "utf8"));
    } catch (e) {
        return { clause: "deferred-ledger-terminal", visualCount: 0, failures: [`FOLD-LEDGER.json parse error — ${e instanceof Error ? e.message : String(e)}`] };
    }
    const buildMapText = readFileSync(BUILD_MAP, "utf8");
    return {
        clause: "deferred-ledger-terminal",
        visualCount: 0,
        failures: deferredLedgerTerminalCheck({ ledger, buildMapText }),
    };
}

// The family runner — each F8 close wave appends its clause here. The clauses are a
// mix of sync + async (the APCA arm dynamically imports its leaf), so the runner
// awaits the resolved set (a plain-object clause passes through Promise.all unchanged).
const CLAUSES = [fableArmPresent, gateFamilyConsolidate, apcaParallelWitness, deferredLedgerTerminal];

async function runClauses() {
    return Promise.all(CLAUSES.map((fn) => fn()));
}

// ── SELF-TEST ─────────────────────────────────────────────────────────────────
const SYNTH_HEADER =
    "| seq | wave | fam | class | status | gate arm | fable / designSync | preconds | source |\n" +
    "|----|------|:---:|:-----:|:------:|----------|--------------------|----------|--------|\n";
const synthTable = (rows) => SYNTH_HEADER + rows.join("\n") + "\n";
const row = (wave, cls, fable) => `| x | ${wave} | F2 | ${cls} | PENDING | g | ${fable} | — | k |`;

async function selfTest() {
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

    // ── gate-family-consolidate detector bites (the validateConsolidation kernel) ──
    const CLEAN = {
        liveGateIds: new Set([...PROTECT_SET, PAINT_ORACLE.primary, ...PAINT_ORACLE.enrolled]),
        releaseGateIds: new Set([PAINT_ORACLE.primary]),
        fileExists: () => true,
    };
    // bite 7 — the clean synthetic state passes (no false-red).
    {
        const clean = validateConsolidation(CLEAN).length === 0;
        bites.push(["consolidate-clean → NO-flag", clean]);
    }
    // bite 8 — a FOLDED protect member MUST flag (the true-positive/dead-knob fence).
    {
        const folded = new Set(CLEAN.liveGateIds);
        folded.delete("proof:dock-plate-clearance");
        const flagged = validateConsolidation({ ...CLEAN, liveGateIds: folded }).some((v) =>
            v.includes("proof:dock-plate-clearance"),
        );
        bites.push(["folded-protect-member → FLAG", flagged]);
    }
    // bite 9 — proof:warm-identity NOT release-tagged MUST flag (the PRIMARY-oracle fence).
    {
        const flagged = validateConsolidation({ ...CLEAN, releaseGateIds: new Set() }).some((v) =>
            v.includes(PAINT_ORACLE.primary),
        );
        bites.push(["warm-identity-not-release → FLAG", flagged]);
    }
    // bite 10 — a missing detector-kit module MUST flag (the shelf-ware fence).
    {
        const flagged = validateConsolidation({ ...CLEAN, fileExists: () => false }).some((v) =>
            v.includes("detector-kit"),
        );
        bites.push(["missing-detect-kit → FLAG", flagged]);
    }

    // ── apca-parallel-witness detector bites (the APCA math + verdict, BG.W-APCA-CONTRAST) ──
    // Dynamically import the arm (the same born-RED-safe path the clause uses) and exercise
    // the pure functions — proving the detector is load-bearing (a stub impl MISSES a bite).
    {
        const arm = await import(pathToFileURL(PAINT_ARM).href);
        const near = (a, b, tol) => Number.isFinite(a) && Math.abs(a - b) <= tol;
        // bite 11 — the APCA-W3 0.1.9 reference vector #888-on-#fff resolves ≈ 63.06 (math real).
        bites.push([
            "apca-ref-#888-on-#fff → ≈63.06",
            typeof arm.apcaContrastLc === "function" &&
                near(arm.apcaContrastLc({ r: 0x88, g: 0x88, b: 0x88 }, { r: 255, g: 255, b: 255 }), 63.06, 0.5),
        ]);
        // bite 12 — the reverse-polarity WoB vector resolves negative (light-on-dark).
        bites.push([
            "apca-ref-#fff-on-#888 → ≈-68.54 (WoB negative)",
            typeof arm.apcaContrastLc === "function" &&
                near(arm.apcaContrastLc({ r: 255, g: 255, b: 255 }, { r: 0x88, g: 0x88, b: 0x88 }), -68.54, 0.5),
        ]);
        // bite 13 — the body-vs-small threshold split: |63| PASSES body(60), FAILS small(75).
        bites.push([
            "apca-verdict body|63|PASS + small|63|FAIL (threshold split)",
            typeof arm.apcaVerdict === "function" &&
                arm.apcaVerdict(63, { size: "body" }).pass === true &&
                arm.apcaVerdict(63, { size: "small" }).pass === false,
        ]);
        // bite 14 — a degenerate (null) Lc FAILS the verdict (the anti-false-pass floor).
        bites.push([
            "apca-verdict(null) → FAIL (degenerate)",
            typeof arm.apcaVerdict === "function" && arm.apcaVerdict(null).pass === false,
        ]);
        // bite 15 — compositeOver 50%-white-over-black → ~128 grey (the composited-plate seam).
        bites.push([
            "compositeOver 50%-white/black → ~128",
            typeof arm.compositeOver === "function" &&
                (() => {
                    const m = arm.compositeOver({ r: 255, g: 255, b: 255, alpha: 0.5 }, { r: 0, g: 0, b: 0 });
                    return near(m.r, 128, 1) && near(m.g, 128, 1) && near(m.b, 128, 1);
                })(),
        ]);
    }

    // ── deferred-ledger-terminal detector bites (BG.W-DEFERRAL-DISPOSITIONS, F8.7) ──
    // The PURE detector is fed synthetic fixtures cloned off the REAL ledger + build-map,
    // proving it is load-bearing (a re-flipped-to-DEFER row / a stripped rationale /
    // successor / an absent carrier each MISS a bite if the detector is hollow).
    {
        const realLedger = JSON.parse(readFileSync(FOLD_LEDGER_JSON, "utf8"));
        const realBuildMap = readFileSync(BUILD_MAP, "utf8");
        const cloneL = (o) => JSON.parse(JSON.stringify(o));
        // bite 16 — a register RE-FLIPPED to DEFER-with-trigger (the born-RED HEAD state) MUST flag.
        {
            const led = cloneL(realLedger);
            const r = led.items.find((x) => x.id === "BE.W-AUR-SATIN");
            r.disposition = "DEFER-with-trigger";
            r.trigger = "an aurora-medium breadth consumer wants the satin register";
            const flagged = deferredLedgerTerminalCheck({ ledger: led, buildMapText: realBuildMap }).some(
                (f) => f.includes("BE.W-AUR-SATIN") && f.includes("DEFER-with-trigger"),
            );
            bites.push(["retire-register-re-flipped-to-DEFER → FLAG (born-RED HEAD state)", flagged]);
        }
        // bite 17 — a terminal RETIRE stripped of its rationale MUST flag.
        {
            const led = cloneL(realLedger);
            led.items.find((x) => x.id === "BE.W-ALIVE-IDLE").rationale = "";
            const flagged = deferredLedgerTerminalCheck({ ledger: led, buildMapText: realBuildMap }).some(
                (f) => f.includes("BE.W-ALIVE-IDLE") && f.includes("rationale"),
            );
            bites.push(["retire-missing-rationale → FLAG", flagged]);
        }
        // bite 18 — a terminal RETIRE stripped of its successor MUST flag.
        {
            const led = cloneL(realLedger);
            led.items.find((x) => x.id === "BE.W-CONCENTRIC-RADIUS").successor = "";
            const flagged = deferredLedgerTerminalCheck({ ledger: led, buildMapText: realBuildMap }).some(
                (f) => f.includes("BE.W-CONCENTRIC-RADIUS") && f.includes("successor"),
            );
            bites.push(["retire-missing-successor → FLAG", flagged]);
        }
        // bite 19 — a GA-5 carrier absent from the build-map MUST flag.
        {
            const stripped = realBuildMap.split("W-AUR-METAL-FINISH").join("W-XXX-ABSENT");
            const flagged = deferredLedgerTerminalCheck({ ledger: realLedger, buildMapText: stripped }).some((f) =>
                f.includes("BG.W-AUR-METAL-FINISH"),
            );
            bites.push(["ga5-carrier-absent → FLAG", flagged]);
        }
        // bite 20 — the REAL ledger + build-map is CLEAN (the GREEN-after proof, clause-scoped).
        {
            const clean = deferredLedgerTerminalCheck({ ledger: realLedger, buildMapText: realBuildMap }).length === 0;
            bites.push(["real-deferred-ledger-terminal → clean (GREEN-after)", clean]);
        }
    }

    console.log("proof:meta — SELF-TEST (fable-arm-present + gate-family-consolidate + apca-parallel-witness + deferred-ledger-terminal, 20 bites)");
    let allFlag = true;
    for (const [name, ok] of bites) {
        console.log(`  ${ok ? "OK    " : "MISS  "}  ${name}`);
        if (!ok) allFlag = false;
    }
    const real = await runClauses();
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
    console.log(
        "\n[proof:meta] SELF-TEST GREEN — all 15 bites behave, the real cursor passes fable-arm-present + gate-family-consolidate + apca-parallel-witness.",
    );
    process.exit(0);
}

// ── main ──────────────────────────────────────────────────────────────────────
if (process.argv.includes("--self-test")) {
    await selfTest();
} else {
    const clauses = await runClauses();
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
