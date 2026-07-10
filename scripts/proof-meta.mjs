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
    findHeaderColumns,
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
import { coherenceCensus, coherenceCensusSelfBites } from "./proof-coherence-census.mjs";
import { glassPaperCongruence, glassPaperCongruenceSelfBites } from "./proof-glass-paper-congruence.mjs";

const CURSOR = join(ROOT, "docs/tranches/BG/execution/EXECUTION-PROGRESS.md");
const CANON = join(ROOT, "docs/tranches/BG/canon/fable-design-arm.md");
const LEDGER = join(ROOT, "docs/tranches/BG/DIRECTIVE-LEDGER.md");
// F8.7 (BG.W-DEFERRAL-DISPOSITIONS) — the deferred-ledger-terminal clause reads the
// fold ledger (the disposition source of truth) + the build-map (the wave-spec authority).
const FOLD_LEDGER_JSON = join(ROOT, "docs/tranches/BG/FOLD-LEDGER.json");
const BUILD_MAP = join(ROOT, "docs/tranches/BG/execution/bg-build-map.md");
// F8.6 (BG.W-ARISTOTELIAN-PROPORTION) — the edict-verdict-present clause reads the
// gestalt roster (the enrolled surface set), the 3-axis edict-verdict ledger (the
// review-completeness artefact), the aristotelian canon home, and the √φ model anchor.
const GESTALT_ROSTER = join(ROOT, "docs/tranches/BG/audit/reflect/bg-gestalt-roster.md");
const EDICT_LEDGER = join(ROOT, "docs/tranches/BG/audit/reflect/bg-edict-verdict-ledger.md");
const ARIST_CANON = join(ROOT, "docs/canon/aristotelian-proportion.md");
const CARD_SFC = join(ROOT, "src/components/ui/card/Card.vue");

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

// ── The `edict-verdict-present` clause (BG.W-ARISTOTELIAN-PROPORTION, F8.6) ─────
// GA-9 / PE-GESTALT: the Band-0 aesthetic edicts (√φ-proportion · animation-laws ·
// technicolor-cartoon-punch) are transposed INTO the gestalt review as acceptance
// LANGUAGE the review FILES per enrolled surface — NOT a fan-out of N mechanical
// gates (the ceremony disease). This clause is a REVIEW-COMPLETENESS fence, the
// fable-arm-present S1/S2 shape applied to the design-language edicts:
//   A — the enrolled surface set (DERIVED from bg-gestalt-roster.md, the SAME set
//       proof:ba-gestalt/warm-identity read) each carries a COMPLETE 3-axis row in
//       the edict-verdict ledger (a verdict token PASS/FAIL/PENDING per axis). A
//       roster surface with no row, or a row with a blank/garbage axis cell, is a
//       review-INCOMPLETE HARD-RED. The clause locks COMPLETENESS, not PASS — the
//       FABLE review files the PASS/FAIL (the canon CLOSE-PRECONDITION).
//   B — the aristotelian canon home carries the edict vocabulary + the FABLE-not-
//       the-builder CLOSE-PRECONDITION + the acceptance-LANGUAGE-not-N-gates fence +
//       the light `--card-pad` proportion-census model reference.
//   C — the LIGHT proportion-census model EXISTS on disk (the √φ ladder constants
//       1.272/1.618/2.618 live in Card.vue) so the canon reference is not a phantom.
//       This is a ONE-anchor census, NOT an off-ledger-rem gate fan-out.
//   D — the DIRECTIVE-LEDGER §7b PE-GESTALT process-edict row names this wave owner.
// Born-RED on a HEAD without the ledger + canon (the pre-flip state); GREEN once the
// review roster is complete + the canon + model resolve. The PURE detector operates
// on injected sources so the self-test feeds synthetic fixtures (a dropped surface /
// a blank axis / a garbage token each MUST flag). ZERO pixels — the FABLE 3-axis
// verdict is the PASS oracle; this clause locks the review is COMPLETE, never green
// over a skipped surface or a missing axis.

/** The three design-language acceptance axes (GA-9 / PE-GESTALT). */
const EDICT_AXES = ["proportion", "animation", "technicolor"];
/** A recognized verdict token opens the axis cell (case-insensitive, prose may follow). */
const VERDICT_TOKEN = /^(PASS|FAIL|PENDING)\b/i;
/** The light proportion-census model anchors — the `--card-pad` √φ ladder constants. */
const CARD_PAD_LADDER = ["1.272", "1.618", "2.618"];

/**
 * Derive the enrolled gestalt surface set from the roster (column 0 of the data
 * rows). Strips the HTML doc-block first, then reads each pipe-row's first cell.
 * @param {string} src
 * @returns {string[]}
 */
function rosterSurfaces(src) {
    const noComments = src.replace(/<!--[\s\S]*?-->/g, "");
    const surfaces = [];
    let cols = null;
    for (const ln of noComments.split("\n")) {
        if (!ln.trimStart().startsWith("|")) continue;
        const cells = rowCells(ln);
        if (cells.length < 2 || isSeparatorRow(cells)) continue;
        if (cells.map((c) => c.toLowerCase()).includes("surface")) {
            cols = { surfIdx: cells.map((c) => c.toLowerCase()).indexOf("surface") };
            continue; // the header itself is never a data row
        }
        if (!cols) continue;
        const surface = (cells[cols.surfIdx] ?? "").trim();
        if (surface && surface !== "—") surfaces.push(surface);
    }
    return surfaces;
}

/**
 * Parse the edict-verdict ledger BY HEADER NAME (column-order-free). Returns a
 * `surface → { proportion, animation, technicolor }` map of the raw cell strings.
 * @param {string} src
 * @returns {Map<string,Record<string,string>>}
 */
function parseEdictLedger(src) {
    const noComments = src.replace(/<!--[\s\S]*?-->/g, "");
    const rows = new Map();
    let cols = null;
    for (const ln of noComments.split("\n")) {
        if (!ln.trimStart().startsWith("|")) continue;
        const cells = rowCells(ln);
        if (cells.length < 2 || isSeparatorRow(cells)) continue;
        const header = findHeaderColumns(cells, {
            surface: "surface",
            proportion: "proportion",
            animation: "animation",
            technicolor: "technicolor",
        });
        if (header) {
            cols = header;
            continue; // the header itself is never a data row
        }
        if (!cols) continue;
        const surface = (cells[cols.surface] ?? "").trim();
        if (!surface || surface === "—") continue;
        const axes = {};
        for (const ax of EDICT_AXES) axes[ax] = cells[cols[ax]] ?? "";
        rows.set(surface, axes);
    }
    return rows;
}

/**
 * The PURE detector — operates on injected sources so the self-test can feed
 * synthetic fixtures. Returns the review-completeness + canon + model failures.
 * @param {{ rosterSrc:string, ledgerSrc:string, canonSrc:string, cardSrc:string, directiveLedger:string }} io
 * @returns {string[]}
 */
function edictVerdictCheck({ rosterSrc, ledgerSrc, canonSrc, cardSrc, directiveLedger }) {
    const failures = [];

    // A — every enrolled gestalt surface carries a COMPLETE 3-axis verdict row.
    const surfaces = rosterSurfaces(rosterSrc);
    if (surfaces.length === 0)
        failures.push("the gestalt roster declares ZERO enrolled surfaces — the review-completeness set is empty (the roster parse broke).");
    const ledger = parseEdictLedger(ledgerSrc);
    if (ledger.size === 0)
        failures.push("the edict-verdict ledger declares ZERO rows — no header row names `surface` + `proportion` + `animation` + `technicolor`.");
    for (const s of surfaces) {
        const row = ledger.get(s);
        if (!row) {
            failures.push(`enrolled gestalt surface \`${s}\` has no edict-verdict row — the review is INCOMPLETE (GA-9: every enrolled surface owes a 3-axis verdict).`);
            continue;
        }
        for (const ax of EDICT_AXES) {
            const cell = String(row[ax] ?? "").trim();
            if (!cell || cell === "—" || !VERDICT_TOKEN.test(cell))
                failures.push(`enrolled gestalt surface \`${s}\` axis \`${ax}\` carries no verdict token (PASS/FAIL/PENDING) [cell: \`${cell}\`] — the 3-axis verdict is INCOMPLETE.`);
        }
    }

    // B — the canon carries the edict vocab + the CLOSE-PRECONDITION + the fence + the model.
    const need = [
        [/√φ|sqrt-?φ|proportion/i, "the √φ-proportion axis name"],
        [/animation[-\s]laws?/i, "the animation-laws axis name"],
        [/technicolor/i, "the technicolor-cartoon-punch axis name"],
        [/CLOSE\s+PRECONDITION/i, "the CLOSE-PRECONDITION sentence"],
        [/not\s+the\s+building\s+agent/i, "the FABLE-not-the-builder rule (`not the building agent`)"],
        [/not\s+(a\s+fan-?out\s+of\s+)?N\s+mechanical\s+gates|never\s+a\s+gate\s+fan-?out/i, "the acceptance-LANGUAGE-not-N-gates fence"],
        [/--card-pad/i, "the light proportion-census model reference (`--card-pad` √φ ladder)"],
    ];
    for (const [re, label] of need)
        if (!re.test(canonSrc)) failures.push(`the aristotelian-proportion canon is missing ${label}.`);

    // C — the LIGHT proportion-census model EXISTS on disk (a ONE-anchor census, NOT a
    //     fan-out): the √φ ladder constants live in Card.vue, so the canon is not a phantom.
    for (const k of CARD_PAD_LADDER)
        if (!cardSrc.includes(k))
            failures.push(`the √φ proportion model is broken — Card.vue does not carry the ladder constant \`${k}\` (the light-census exemplar the canon universalizes).`);

    // D — the DIRECTIVE-LEDGER §7b PE-GESTALT row names this wave as owner.
    if (!/PE-GESTALT/.test(directiveLedger))
        failures.push("DIRECTIVE-LEDGER §7b missing the PE-GESTALT process-edict row.");
    else if (!/PE-GESTALT[\s\S]{0,2200}?W-ARISTOTELIAN-PROPORTION/.test(directiveLedger))
        failures.push("DIRECTIVE-LEDGER PE-GESTALT row does not name `W-ARISTOTELIAN-PROPORTION` as owner.");

    return failures;
}

function edictVerdictPresent() {
    for (const [label, p] of [
        ["gestalt roster", GESTALT_ROSTER],
        ["edict-verdict ledger", EDICT_LEDGER],
        ["aristotelian canon", ARIST_CANON],
        ["Card.vue", CARD_SFC],
        ["DIRECTIVE-LEDGER", LEDGER],
    ]) {
        if (!existsSync(p))
            return { clause: "edict-verdict-present", visualCount: 0, failures: [`${label} absent — ${p.replace(ROOT + "/", "")}`] };
    }
    return {
        clause: "edict-verdict-present",
        visualCount: 0,
        failures: edictVerdictCheck({
            rosterSrc: readFileSync(GESTALT_ROSTER, "utf8"),
            ledgerSrc: readFileSync(EDICT_LEDGER, "utf8"),
            canonSrc: readFileSync(ARIST_CANON, "utf8"),
            cardSrc: readFileSync(CARD_SFC, "utf8"),
            directiveLedger: readFileSync(LEDGER, "utf8"),
        }),
    };
}

// ── The `gestalt-cursor-parity` clause (BG.W-GESTALT-CURSOR-PARITY, 12.4a joinery) ──
// The keystone JOINERY: the gestalt close oracle (proof:ba-gestalt) is JOINED to the
// shipped `surface-closure.mjs` paint-closure so a surface's watched paint BREADTH is
// DERIVED (the transitive closure its routes reach), not a single-file hand-list. This
// clause EXERCISES that joinery LOAD-BEARING (the apca-parallel-witness precedent — a
// stubbed/severed joinery reds here, not a source grep alone). Three readings:
//   • the SCOPED per-surface closure (SHELL_SEED-inclusive, reaching dock/morph.css
//     transitively — the exact single-file blind spot the joinery closes; the freshness
//     teeth), • the FULL closure (PARITY-C completeness NET — an orphan paint file
//     outside it is watched by no surface), • the DERIVED-closure freshness verdict
//     (a wrong recorded hash reads stale, the live scoped hash reads fresh).
// PARITY-A (cursor-DONE ⇒ roster-PASS) is the WEAK BB-lie catcher already carried by
// proof:ba-gestalt's per-surface FAIL/PASS verdicts (the honest re-price: PARITY-A is
// toothless for the 82/105 waves whose paint maps to NONE); PARITY-B is DELETED
// (redundant with the G5 pixel-band + G7 freshness). The LOAD-BEARING value is
// PARITY-C + the freshness teeth, both exercised here. DYNAMIC import (the born-RED-safe
// path — on a HEAD without the joinery exports a missing named export resolves to
// undefined, a clean per-export failure, never a module-link crash).
const BA_GESTALT = join(ROOT, "scripts/proof-ba-gestalt.mjs");

/**
 * The PURE joinery-export detector — given a module-like object, the joinery exports
 * that are absent/uncallable. Fed synthetic stubs by the self-test (a joinery-absent
 * stub → the HEAD born-RED state; the real module → clean).
 * @param {any} mod
 * @returns {string[]}
 */
function checkJoineryExports(mod) {
    const failures = [];
    for (const name of [
        "surfaceScopedClosure",
        "surfaceScopedHash",
        "fullPaintClosure",
        "closureFreshnessVerdict",
    ]) {
        if (typeof mod?.[name] !== "function")
            failures.push(
                `proof-ba-gestalt does not export a callable \`${name}\` — the surface-closure JOINERY is absent (BG.W-GESTALT-CURSOR-PARITY 12.4a un-landed).`,
            );
    }
    return failures;
}

async function gestaltCursorParity() {
    const failures = [];
    if (!existsSync(BA_GESTALT)) {
        return {
            clause: "gestalt-cursor-parity",
            visualCount: 0,
            failures: ["proof-ba-gestalt gate absent — scripts/proof-ba-gestalt.mjs"],
        };
    }
    let mod;
    try {
        // Import-safe: proof-ba-gestalt guards its top-level run() behind import.meta.url,
        // so importing it for the joinery primitives never runs the sibling gate.
        mod = await import(pathToFileURL(BA_GESTALT).href);
    } catch (e) {
        return {
            clause: "gestalt-cursor-parity",
            visualCount: 0,
            failures: [`proof-ba-gestalt import threw — ${e instanceof Error ? e.message : String(e)}`],
        };
    }
    const exportFails = checkJoineryExports(mod);
    failures.push(...exportFails);
    // Joinery present → EXERCISE it (load-bearing; a stub / severed closure reds here).
    if (exportFails.length === 0) {
        const { surfaceScopedClosure, surfaceScopedHash, fullPaintClosure, closureFreshnessVerdict } = mod;
        const ORPHAN = "src/components/custom/__NOT_A_REAL_SURFACE__.vue";

        // PARITY-C — the FULL completeness net has reach AND a boundary.
        const net = fullPaintClosure();
        if (!(Array.isArray(net) && net.length > 1)) {
            failures.push("PARITY-C: fullPaintClosure() is empty/degenerate — the completeness net has no reach.");
        } else {
            if (!net.includes("src/styles/index.css"))
                failures.push("PARITY-C: the full closure does not reach src/styles/index.css — the SHELL_SEED-inclusive net is broken.");
            if (net.includes(ORPHAN))
                failures.push("PARITY-C: a synthetic orphan path is INSIDE the full closure — the net has no boundary (every path is reachable, the orphan-catch is vacuous).");
        }

        // SCOPED per-surface breadth — SHELL_SEED-inclusive + reaches the transitive
        // cascade (dock/morph.css, the single-file hand-list blind spot).
        const scoped = surfaceScopedClosure("/dock/overview");
        if (!(Array.isArray(scoped) && scoped.length > 1)) {
            failures.push("SCOPED: surfaceScopedClosure('/dock/overview') is empty/degenerate — the per-surface breadth is not derived.");
        } else {
            if (!scoped.includes("src/styles/index.css"))
                failures.push("SCOPED: the /dock/overview closure is not SHELL_SEED-inclusive (no src/styles/index.css) — the global-cascade breadth is missing.");
            if (!scoped.some((p) => p.includes("dock/morph.css")))
                failures.push("SCOPED: the /dock/overview closure does not reach dock/morph.css — the freshness teeth (a transitive dock paint edit re-stales the PASS) are toothless.");
        }

        // The freshness TEETH — a wrong recorded hash reads stale, the live hash fresh.
        const live = surfaceScopedHash("/dock/overview");
        if (!/^[0-9a-f]{64}$/.test(String(live))) {
            failures.push("TEETH: surfaceScopedHash('/dock/overview') is not a 64-hex digest — the re-stamp helper is degenerate.");
        } else {
            if (closureFreshnessVerdict("0".repeat(64), "/dock/overview").state !== "stale")
                failures.push("TEETH: a wrong recorded hash does not read STALE against the derived closure — the freshness auto-revoke is toothless.");
            if (closureFreshnessVerdict(live, "/dock/overview").state !== "fresh")
                failures.push("TEETH: the live scoped hash does not read FRESH — the freshness comparison is broken.");
        }

        // WIRED — proof-ba-gestalt's OWN source imports the closure machinery AND its
        // per-surface freshness DERIVES from it (not a shelf-ware export sitting beside a
        // hand-list freshness the gate still reads).
        const src = readFileSync(BA_GESTALT, "utf8");
        if (!/collectPaintClosure/.test(src) || !/\bSHELL_SEED\b/.test(src))
            failures.push("WIRED: proof-ba-gestalt does not import the surface-closure machinery — the joinery export is shelf-ware.");
        if (!/function\s+surfaceFreshness\(\s*surface\s*,\s*routesCell\s*\)/.test(src) || !/closureFreshnessVerdict\(/.test(src))
            failures.push("WIRED: proof-ba-gestalt's per-surface freshness does not derive from the closure (surfaceFreshness/closureFreshnessVerdict un-wired) — the joinery is not load-bearing in the gate.");
    }
    return { clause: "gestalt-cursor-parity", visualCount: 0, failures };
}

// The family runner — each F8 close wave appends its clause here. The clauses are a
// mix of sync + async (the APCA arm dynamically imports its leaf), so the runner
// awaits the resolved set (a plain-object clause passes through Promise.all unchanged).
const CLAUSES = [
    fableArmPresent,
    gateFamilyConsolidate,
    apcaParallelWitness,
    deferredLedgerTerminal,
    edictVerdictPresent,
    gestaltCursorParity,
    coherenceCensus,
    glassPaperCongruence,
];

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

    // ── edict-verdict-present detector bites (BG.W-ARISTOTELIAN-PROPORTION, F8.6) ──
    // The PURE edictVerdictCheck detector is fed synthetic roster/ledger fixtures (the
    // born-RED witnesses) with the REAL canon/card/directive for the non-tested legs,
    // proving the review-completeness fence is load-bearing (a dropped surface / a blank
    // axis / a garbage token / a stripped canon-fence each MISS a bite if it is hollow).
    {
        const realRoster = readFileSync(GESTALT_ROSTER, "utf8");
        const realLedger = readFileSync(EDICT_LEDGER, "utf8");
        const realCanon = readFileSync(ARIST_CANON, "utf8");
        const realCard = readFileSync(CARD_SFC, "utf8");
        const realDir = readFileSync(LEDGER, "utf8");
        // A 2-surface synthetic roster + a matching COMPLETE ledger (the controlled pair).
        const synRoster = "| surface | routes |\n|---|---|\n| dock | /dock/overview |\n| aurora | /substrates/aurora |\n";
        const synLedgerOk =
            "| surface | proportion | animation | technicolor |\n|---|---|---|---|\n" +
            "| dock | PENDING | PENDING | PENDING |\n| aurora | PASS | PENDING | FAIL |\n";
        const chkSyn = (roster, ledger) =>
            edictVerdictCheck({ rosterSrc: roster, ledgerSrc: ledger, canonSrc: realCanon, cardSrc: realCard, directiveLedger: realDir });

        // bite 26 — a COMPLETE synthetic roster+ledger raises NO completeness failure.
        {
            const fs = chkSyn(synRoster, synLedgerOk);
            const ok = !fs.some((f) => f.includes("edict-verdict row") || f.includes("verdict token"));
            bites.push(["edict-complete-synthetic → NO completeness flag", ok]);
        }
        // bite 27 — a surface DROPPED from the ledger MUST flag (review-completeness).
        {
            const synLedgerMissing =
                "| surface | proportion | animation | technicolor |\n|---|---|---|---|\n| dock | PENDING | PENDING | PENDING |\n";
            const flagged = chkSyn(synRoster, synLedgerMissing).some(
                (f) => f.includes("aurora") && f.includes("no edict-verdict row"),
            );
            bites.push(["edict-ledger-drops-surface → FLAG (review-completeness)", flagged]);
        }
        // bite 28 — a BLANK axis cell MUST flag (the 3-axis completeness).
        {
            const synLedgerBlank =
                "| surface | proportion | animation | technicolor |\n|---|---|---|---|\n| dock | PENDING | PENDING |  |\n| aurora | PASS | PASS | PASS |\n";
            const flagged = chkSyn(synRoster, synLedgerBlank).some(
                (f) => f.includes("`dock`") && f.includes("technicolor") && f.includes("verdict token"),
            );
            bites.push(["edict-axis-blank → FLAG (3-axis completeness)", flagged]);
        }
        // bite 29 — a GARBAGE (non-verdict) axis token MUST flag (the verdict vocabulary).
        {
            const synLedgerGarbage =
                "| surface | proportion | animation | technicolor |\n|---|---|---|---|\n| dock | PENDING | maybe-later | PENDING |\n| aurora | PASS | PASS | PASS |\n";
            const flagged = chkSyn(synRoster, synLedgerGarbage).some(
                (f) => f.includes("`dock`") && f.includes("animation") && f.includes("verdict token"),
            );
            bites.push(["edict-axis-garbage-token → FLAG (verdict vocabulary)", flagged]);
        }
        // bite 30 — the canon stripped of the FABLE-not-the-builder rule MUST flag.
        {
            const strippedCanon = realCanon.replace(/not\s+the\s+building\s+agent/gi, "the building agent");
            const flagged = edictVerdictCheck({
                rosterSrc: realRoster, ledgerSrc: realLedger, canonSrc: strippedCanon, cardSrc: realCard, directiveLedger: realDir,
            }).some((f) => f.includes("not the building agent"));
            bites.push(["canon-strips-not-the-building-agent → FLAG", flagged]);
        }
        // bite 31 — the canon stripped of the not-N-gates fence MUST flag.
        {
            const strippedCanon = realCanon
                .replace(/not\s+(a\s+fan-?out\s+of\s+)?N\s+mechanical\s+gates/gi, "N mechanical gates")
                .replace(/never\s+a\s+gate\s+fan-?out/gi, "a gate fan-out");
            const flagged = edictVerdictCheck({
                rosterSrc: realRoster, ledgerSrc: realLedger, canonSrc: strippedCanon, cardSrc: realCard, directiveLedger: realDir,
            }).some((f) => f.includes("acceptance-LANGUAGE-not-N-gates"));
            bites.push(["canon-strips-not-N-gates-fence → FLAG", flagged]);
        }
        // bite 32 — a Card.vue missing a √φ ladder constant MUST flag (the model is a phantom).
        {
            const brokenCard = realCard.split("1.618").join("1.5");
            const flagged = edictVerdictCheck({
                rosterSrc: realRoster, ledgerSrc: realLedger, canonSrc: realCanon, cardSrc: brokenCard, directiveLedger: realDir,
            }).some((f) => f.includes("1.618") && f.includes("proportion model"));
            bites.push(["card-drops-phi-ladder-constant → FLAG (model not a phantom)", flagged]);
        }
        // bite 33 — the DIRECTIVE-LEDGER PE-GESTALT row not naming the owner MUST flag.
        {
            const strippedDir = realDir.split("W-ARISTOTELIAN-PROPORTION").join("W-XXX-ABSENT");
            const flagged = edictVerdictCheck({
                rosterSrc: realRoster, ledgerSrc: realLedger, canonSrc: realCanon, cardSrc: realCard, directiveLedger: strippedDir,
            }).some((f) => f.includes("PE-GESTALT") && f.includes("W-ARISTOTELIAN-PROPORTION"));
            bites.push(["directive-PE-GESTALT-no-owner → FLAG", flagged]);
        }
        // bite 34 — the REAL roster + ledger + canon + model + directive is CLEAN (GREEN-after).
        {
            const clean = edictVerdictCheck({
                rosterSrc: realRoster, ledgerSrc: realLedger, canonSrc: realCanon, cardSrc: realCard, directiveLedger: realDir,
            }).length === 0;
            bites.push(["real-edict-verdict-present → clean (GREEN-after)", clean]);
        }
    }

    // ── gestalt-cursor-parity detector bites (BG.W-GESTALT-CURSOR-PARITY, 12.4a joinery) ──
    // The PURE checkJoineryExports detector is fed synthetic stubs (born-RED witness), and
    // the REAL proof-ba-gestalt joinery is EXERCISED (the load-bearing GREEN-after) — a
    // stub / severed closure MISSES a bite if the clause is hollow.
    {
        // bite 21 — a joinery-ABSENT module stub flags ≥4 missing exports (the HEAD born-
        // RED state: proof-ba-gestalt exported only COLUMNS/parseRoster/parseProbe).
        bites.push([
            "joinery-absent-stub → FLAG (born-RED HEAD state, ≥4 missing exports)",
            checkJoineryExports({ COLUMNS: [], parseRoster: () => {}, parseProbe: () => {} }).length >= 4,
        ]);
        // bite 22 — the REAL proof-ba-gestalt module carries the joinery exports (GREEN-after).
        const baMod = await import(pathToFileURL(BA_GESTALT).href);
        bites.push([
            "joinery-present-real-module → NO-flag (all 4 exports callable)",
            checkJoineryExports(baMod).length === 0,
        ]);
        // bite 23 — PARITY-C net has reach + boundary: a real cascade file INSIDE, a
        // synthetic orphan OUTSIDE.
        {
            const net = typeof baMod.fullPaintClosure === "function" ? baMod.fullPaintClosure() : [];
            const ok =
                Array.isArray(net) &&
                net.length > 1 &&
                net.includes("src/styles/index.css") &&
                !net.includes("src/components/custom/__NOT_A_REAL_SURFACE__.vue");
            bites.push(["parity-C-net → reach(index.css) + boundary(orphan-outside)", ok]);
        }
        // bite 24 — the SCOPED closure reaches dock/morph.css (the transitive freshness-
        // teeth breadth the single-file hand-list could never watch).
        {
            const scoped =
                typeof baMod.surfaceScopedClosure === "function"
                    ? baMod.surfaceScopedClosure("/dock/overview")
                    : [];
            const ok =
                Array.isArray(scoped) &&
                scoped.includes("src/styles/index.css") &&
                scoped.some((p) => p.includes("dock/morph.css"));
            bites.push(["scoped-closure → SHELL_SEED-inclusive + reaches dock/morph.css (teeth breadth)", ok]);
        }
        // bite 25 — the freshness TEETH: a wrong hash reads stale, the live hash fresh.
        {
            let ok = false;
            if (typeof baMod.surfaceScopedHash === "function" && typeof baMod.closureFreshnessVerdict === "function") {
                const live = baMod.surfaceScopedHash("/dock/overview");
                ok =
                    /^[0-9a-f]{64}$/.test(String(live)) &&
                    baMod.closureFreshnessVerdict("0".repeat(64), "/dock/overview").state === "stale" &&
                    baMod.closureFreshnessVerdict(live, "/dock/overview").state === "fresh";
            }
            bites.push(["freshness-teeth → wrong-hash=stale, live-hash=fresh", ok]);
        }
    }

    // BG.W-COHERENCE-CENSUS-GATE (F8 capstone 17.1) — fold the coherence-census bites.
    for (const b of coherenceCensusSelfBites()) bites.push(b);

    // BG.W-GLASS-PAPER-CONGRUENCE (F8 capstone 17.5) — fold the spine machine-lock bites.
    for (const b of glassPaperCongruenceSelfBites()) bites.push(b);

    console.log(
        `proof:meta — SELF-TEST (fable-arm-present + gate-family-consolidate + apca-parallel-witness + deferred-ledger-terminal + edict-verdict-present + gestalt-cursor-parity + coherence-census + glass-paper-congruence, ${bites.length} bites)`,
    );
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
        "\n[proof:meta] SELF-TEST GREEN — all bites behave, the real cursor passes fable-arm-present + gate-family-consolidate + apca-parallel-witness + deferred-ledger-terminal + edict-verdict-present + gestalt-cursor-parity + coherence-census + glass-paper-congruence.",
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
