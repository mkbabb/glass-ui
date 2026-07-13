#!/usr/bin/env node
// proof:fold-delete — the per-fold DEFINITION-ABSENT framework + the factor-band
// gate-soundness residue (BI.W-AXES-GATES · FAM-11).
//
// The Kronecker factorization folds N synonym surfaces onto ONE sealed primitive; a
// clean break means the RETIRED surface is DEFINITION-ABSENT (no alias, no dual path).
// This gate is the machine-lock every fold wave FLIPS: for EACH fold, the retired dir is
// dir-absent, the retired subpath barrel + its package.json `./x` export are absent, no
// src/ CONSUMER still imports the retired subpath, AND the survivor is present. Born-RED
// on HEAD (every fold's dir + subpath live) → GREEN as each fold wave lands.
//
// Three arms:
//   • FOLDS — the six per-fold clauses (overlay · menu · dialog-sheet · chip ·
//     glass-panel · multiselect). Each: retired-dir-absent + retired-subpath-absent +
//     no-consumer-import + survivor-present.
//   • OWNEDBY-RESOLVE — proof:no-masking-fallback Arm E's `owedBy` values must RESOLVE
//     to a real wave on disk (the waveSpecExists mirror, broadened to a wave FOOTPRINT
//     so a landed wave whose spec re-homed off waves/ still resolves via its audit
//     DELTA). Born-RED on the phantom `WS8.4 W-GLASS-SOTA-LADDER` → GREEN at the
//     re-point to a real BI wave (BI.W-DOCK-CONTROLS).
//   • FAM-11 RESIDUE — two gate-label soundness reconciles a gate's LABEL may not
//     exceed its TEETH: (R1) proof:warm-identity's "PRIMARY paint gate" label over a
//     DEVICE-FREE gate must be RELABELED/ARMED; (R2) proof:ba-gestalt's stale
//     "release-only, NOT ci" note must be RECONCILED with its actual `ci` tag. Born-RED
//     on the current manifest (the note edits are gates.manifest.mjs edits owed to the
//     integrator).
//
// Self-test bites: a re-added retired dir / surviving subpath / consumer import / absent
// survivor FLAGS its fold; a phantom owedBy FLAGS; a resolvable owedBy does NOT; a
// device-free "PRIMARY paint gate" FLAGS; a ci-tagged "NOT ci" note FLAGS; the clean
// counter-cases do NOT.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";
// PURE data imports (both modules are side-effect-free data tables — no top-level run).
import { WRITER_OWED, LADDER_OWED } from "./no-masking-manifest.mjs";
import { GATES } from "./gates.manifest.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const SRC = resolve(ROOT, "src");
const TRANCHES = resolve(ROOT, "docs/tranches");
const COMMAND = "npm run proof:fold-delete";
const SELF_TEST = process.argv.includes("--self-test");

function read(p) {
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");
}
function walkSrc(dir) {
    const out = [];
    if (!existsSync(dir)) return out;
    for (const name of readdirSync(dir)) {
        const p = resolve(dir, name);
        const st = statSync(p);
        if (st.isDirectory()) out.push(...walkSrc(p));
        else if (/\.(ts|vue)$/.test(name)) out.push(p);
    }
    return out;
}

// ── The six folds (BI B8 spine). Each retired member names its dir + (optional) subpath
//    barrel + package.json export + the @mkbabb import spec; the survivor is the sealed
//    primitive. `subpath: null` ⇒ a root-barrel-only member (MultiSelect) — no
//    subpath/export check. `survivorMultiple` ⇒ the survivor is a CAPABILITY on an
//    existing file (Combobox gains `multiple`) rather than a new component. ──
const FOLDS = [
    {
        clause: "overlay",
        retired: [
            {
                noun: "HoverPopover",
                dir: "components/custom/hover-popover",
                subpath: "hover-popover",
            },
            {
                noun: "HoverCard",
                dir: "components/ui/hover-card",
                subpath: "hover-card",
            },
        ],
        survivor: { file: "components/ui/popover/index.ts", name: "Popover" },
    },
    {
        clause: "menu",
        retired: [
            {
                noun: "ContextMenu",
                dir: "components/ui/context-menu",
                subpath: "context-menu",
            },
        ],
        survivor: {
            file: "components/ui/dropdown-menu/index.ts",
            name: "DropdownMenu",
        },
    },
    {
        clause: "dialog-sheet",
        retired: [
            { noun: "Sheet", dir: "components/ui/sheet", subpath: "sheet" },
            {
                noun: "ConfirmDialog",
                dir: "components/custom/confirm-dialog",
                subpath: "confirm-dialog",
            },
        ],
        survivor: { file: "components/ui/dialog/index.ts", name: "Dialog" },
    },
    {
        clause: "chip",
        retired: [
            {
                noun: "ToggleChip",
                dir: "components/custom/toggle-chip",
                subpath: "toggle-chip",
            },
            {
                noun: "SelectableChip",
                dir: "components/custom/selectable-chip",
                subpath: "selectable-chip",
            },
        ],
        survivor: { file: "components/custom/chip/Chip.vue", name: "Chip" },
    },
    {
        clause: "glass-panel",
        retired: [
            {
                noun: "GlassPanel",
                dir: "components/custom/glass-panel",
                subpath: "glass-panel",
            },
        ],
        survivor: { file: "components/ui/surface/Surface.vue", name: "Surface" },
    },
    {
        // BI-DAG-01 (Round-4) — MultiSelect is root-barrel-only (NO subpath at HEAD);
        // the survivor is Combobox's `multiple` CAPABILITY, not a new component.
        clause: "multiselect",
        retired: [
            {
                noun: "MultiSelect",
                dir: "components/ui/multi-select",
                subpath: null,
            },
        ],
        survivor: {
            file: "components/ui/combobox/Combobox.vue",
            survivorMultiple: true,
        },
    },
];

// The package.json exports table (read-only; a self-test injects an override).
function readPkgExports(override) {
    if (override) return override;
    try {
        return JSON.parse(read(resolve(ROOT, "package.json"))).exports ?? {};
    } catch {
        return {};
    }
}

// Does any src/ CONSUMER (not the retired dir's own subtree, not the retired barrel)
// still import the retired @mkbabb subpath? Comment-stripped, .ts/.vue only.
function scanRetiredConsumers(retired, overrides = {}) {
    if (!retired.subpath) return [];
    const spec = `@mkbabb/glass-ui/${retired.subpath}`;
    const dirAbs = resolve(SRC, retired.dir);
    const barrelAbs = resolve(SRC, `subpaths/${retired.subpath}.ts`);
    const specRe = new RegExp(
        `from\\s*["']${spec.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`,
    );
    const hits = [];
    const files =
        overrides.consumerFiles ??
        walkSrc(SRC).map((f) => ({ abs: f, text: read(f) }));
    for (const { abs, text } of files) {
        if (abs.startsWith(dirAbs) || abs === barrelAbs) continue;
        if (specRe.test(stripComments(text)))
            hits.push(abs.slice(SRC.length + 1));
    }
    return hits;
}

// A file DEFINES/EXPORTS the survivor symbol (a live name mention outside comments).
function survivorPresent(survivor, overrides = {}) {
    const abs = resolve(SRC, survivor.file);
    const exists = overrides.survivorExists ?? existsSync(abs);
    if (!exists) return { exists: false, ok: false };
    const text = overrides.survivorText ?? read(abs);
    const clean = stripComments(text);
    if (survivor.survivorMultiple) {
        // The Combobox `multiple` capability (a prop / model-array wiring).
        const ok = /\bmultiple\b/.test(clean);
        return { exists: true, ok };
    }
    const ok = new RegExp(`\\b${survivor.name}\\b`).test(clean);
    return { exists: true, ok };
}

// ── ARM 1 — the per-fold DEFINITION-ABSENT detector. ──
// overrides (per self-test): { dirExists?:{dir->bool}, pkgExports?, subpathExists?:{sp->bool},
//   consumerFiles?, survivorExists?, survivorText? }.
function detectFolds(overrides = {}) {
    const violations = [];
    const facts = {};
    const pkgExports = readPkgExports(overrides.pkgExports);

    for (const fold of FOLDS) {
        const foldViolations = [];
        for (const r of fold.retired) {
            // (a) the retired dir is DIR-ABSENT.
            const dirAbs = resolve(SRC, r.dir);
            const dirExists =
                overrides.dirExists?.[r.dir] ?? existsSync(dirAbs);
            if (dirExists)
                foldViolations.push(
                    `[${fold.clause}] the retired ${r.noun} dir src/${r.dir} still exists (clean break — dir-absent)`,
                );
            // (b) the retired subpath barrel + its `./x` export are ABSENT.
            if (r.subpath) {
                const barrelAbs = resolve(SRC, `subpaths/${r.subpath}.ts`);
                const barrelExists =
                    overrides.subpathExists?.[r.subpath] ??
                    existsSync(barrelAbs);
                const exportPresent = `./${r.subpath}` in pkgExports;
                if (barrelExists)
                    foldViolations.push(
                        `[${fold.clause}] the retired subpath barrel src/subpaths/${r.subpath}.ts still exists`,
                    );
                if (exportPresent)
                    foldViolations.push(
                        `[${fold.clause}] the retired package.json export "./${r.subpath}" still ships (regen after deleting the barrel)`,
                    );
            }
            // (c) no src/ CONSUMER still imports the retired subpath.
            const consumers = scanRetiredConsumers(r, overrides);
            if (consumers.length)
                foldViolations.push(
                    `[${fold.clause}] ${consumers.join(", ")} still import ${`@mkbabb/glass-ui/${r.subpath}`} (re-point onto the survivor)`,
                );
        }
        // (d) the survivor is PRESENT.
        const s = survivorPresent(fold.survivor, overrides);
        if (!s.ok)
            foldViolations.push(
                `[${fold.clause}] the survivor (${fold.survivor.file}${fold.survivor.survivorMultiple ? " · multiple capability" : ` · ${fold.survivor.name}`}) is absent (exists=${s.exists}) — the fold has no home`,
            );

        facts[fold.clause] = { clean: foldViolations.length === 0 };
        violations.push(...foldViolations.map((v) => `FOLD ${v}`));
    }
    return { facts, violations };
}

// ── ARM 2 — OWNEDBY-RESOLVE (the waveSpecExists mirror, broadened to a footprint). ──
// A landed wave leaves a footprint under docs/tranches/<L>/: a waves/ spec OR an
// audit/visual DELTA/paint artifact naming the wave. The phantom `W-GLASS-SOTA-LADDER`
// has NONE; a re-homed-but-landed `W-GLASS-BASIS-CONSOLIDATE` resolves via its DELTA.
function waveFootprintExists(waveToken, overrides = {}) {
    if (overrides.footprints) return overrides.footprints.includes(waveToken);
    if (!existsSync(TRANCHES)) return false;
    for (const letter of readdirSync(TRANCHES)) {
        const base = join(TRANCHES, letter);
        if (!statSync(base).isDirectory()) continue;
        for (const sub of ["waves", "audit/visual", "audit/reflect"]) {
            const dir = join(base, sub);
            if (!existsSync(dir)) continue;
            for (const name of readdirSync(dir))
                if (name.includes(waveToken)) return true;
        }
    }
    return false;
}
// Extract the `W-<NAME>` wave token from an owedBy string (the last W- token); a bare
// sub-band tag (`NF.2`) with no W- token is NOT a wave reference and is skipped.
function waveTokenOf(owedBy) {
    const m = String(owedBy).match(/\bW-[A-Z0-9][A-Z0-9-]*\b/);
    return m ? m[0] : null;
}
function detectOwnedByResolve(overrides = {}) {
    const violations = [];
    const rows = overrides.rows ?? [...WRITER_OWED, ...LADDER_OWED];
    const resolved = [];
    for (const row of rows) {
        const label = row.name ?? row.site ?? "(unnamed)";
        const token = waveTokenOf(row.owedBy);
        if (!token) continue; // a bare sub-band tag (NF.2) — not a wave-spec claim.
        const ok = waveFootprintExists(token, overrides);
        resolved.push({ label, owedBy: row.owedBy, token, ok });
        if (!ok)
            violations.push(
                `OWNEDBY-RESOLVE — ${label}'s owedBy "${row.owedBy}" names a wave (${token}) with NO footprint on disk (no docs/tranches/*/waves spec, no audit DELTA) — a phantom owner; re-point to a real wave or cure the site`,
            );
    }
    return { facts: { resolved }, violations };
}

// ── ARM 3 — FAM-11 RESIDUE (a gate's LABEL may not exceed its TEETH). ──
function gateRow(id, overrides = {}) {
    const set = overrides.gates ?? GATES;
    return set.find((g) => g.id === id) ?? null;
}
function detectFam11Residue(overrides = {}) {
    const violations = [];
    const facts = {};

    // R1 — proof:warm-identity: a "PRIMARY paint gate" label over a DEVICE-FREE gate.
    const warm = gateRow("proof:warm-identity", overrides);
    const warmNote = warm?.note ?? "";
    const warmClaimsPaint = /PRIMARY paint gate/.test(warmNote);
    const warmDeviceFree = /Device-free/i.test(warmNote);
    facts.warmIdentity = {
        present: Boolean(warm),
        warmClaimsPaint,
        warmDeviceFree,
    };
    if (warm && warmClaimsPaint && warmDeviceFree)
        violations.push(
            `FAM11 R1 — proof:warm-identity labels itself "PRIMARY paint gate" while its note admits it is Device-free — the label exceeds its teeth; RELABEL (a device-free source/roster gate — the binding paint rides the LOCAL late-sweep) or ARM it (a real GPU/π binding)`,
        );

    // R2 — proof:ba-gestalt: a stale "NOT ci" note contradicting its actual `ci` tag.
    const ba = gateRow("proof:ba-gestalt", overrides);
    const baNote = ba?.note ?? "";
    const baClaimsNotCi = /NOT ci|release-only, NOT ci/.test(baNote);
    const baHasCiTag = Array.isArray(ba?.tags) && ba.tags.includes("ci");
    facts.baGestalt = {
        present: Boolean(ba),
        baClaimsNotCi,
        baHasCiTag,
        tags: ba?.tags ?? null,
    };
    if (ba && baClaimsNotCi && baHasCiTag)
        violations.push(
            `FAM11 R2 — proof:ba-gestalt's note claims "release-only, NOT ci" while its tags carry "ci" (${JSON.stringify(ba.tags)}) — RECONCILE: it is now a device-free source/docs detector, so strip the stale "release-only, NOT ci" prose (or drop the ci tag)`,
        );

    return { facts, violations };
}

// ── The self-test bites. ──
function selfTest() {
    let flagged = 0;
    const flag = (violations, prefix, name) => {
        if (violations.some((v) => v.startsWith(prefix))) flagged++;
        else
            throw new Error(
                `[proof:fold-delete self-test] the bite FAILED to flag: ${name}`,
            );
    };
    const noflag = (violations, prefix, name) => {
        if (!violations.some((v) => v.startsWith(prefix))) flagged++;
        else
            throw new Error(
                `[proof:fold-delete self-test] the fence bite WRONGLY flagged: ${name}`,
            );
    };

    // ── FOLD bites — a fully-folded overlay world (all clean) as the baseline, then
    //    sabotage one lever at a time. The synthetic world DELETES every retired dir +
    //    subpath, mints the survivor, and clears consumers. ──
    const cleanWorld = () => ({
        dirExists: Object.fromEntries(
            FOLDS.flatMap((f) => f.retired.map((r) => [r.dir, false])),
        ),
        subpathExists: Object.fromEntries(
            FOLDS.flatMap((f) =>
                f.retired.filter((r) => r.subpath).map((r) => [r.subpath, false]),
            ),
        ),
        pkgExports: {}, // no retired export keys
        consumerFiles: [], // no consumers
        survivorExists: true,
        survivorText:
            "export { Popover } from './x'; export const DropdownMenu = 1; export const Dialog = 1; export const Chip = 1; export const Surface = 1; const multiple = true;",
    });
    // FOLD fence — the fully-folded world carries ZERO fold violation.
    noflag(detectFolds(cleanWorld()).violations, "FOLD", "the fully-folded world");
    // FOLD: a re-added retired dir (hover-popover) flags the overlay clause.
    flag(
        detectFolds({
            ...cleanWorld(),
            dirExists: {
                ...cleanWorld().dirExists,
                "components/custom/hover-popover": true,
            },
        }).violations,
        "FOLD [overlay]",
        "a re-added hover-popover dir",
    );
    // FOLD: a surviving retired subpath export flags its clause.
    flag(
        detectFolds({
            ...cleanWorld(),
            pkgExports: { "./context-menu": {} },
        }).violations,
        "FOLD [menu]",
        "a surviving ./context-menu export",
    );
    // FOLD: a surviving subpath BARREL flags its clause.
    flag(
        detectFolds({
            ...cleanWorld(),
            subpathExists: { ...cleanWorld().subpathExists, sheet: true },
        }).violations,
        "FOLD [dialog-sheet]",
        "a surviving sheet subpath barrel",
    );
    // FOLD: a live consumer import flags its clause.
    flag(
        detectFolds({
            ...cleanWorld(),
            consumerFiles: [
                {
                    abs: resolve(SRC, "components/demo/X.vue"),
                    text: 'import { ToggleChip } from "@mkbabb/glass-ui/toggle-chip";',
                },
            ],
        }).violations,
        "FOLD [chip]",
        "a live @mkbabb/glass-ui/toggle-chip consumer import",
    );
    // FOLD: an absent survivor flags its clause.
    flag(
        detectFolds({
            ...cleanWorld(),
            survivorExists: false,
            survivorText: "",
        }).violations,
        "FOLD",
        "an absent survivor",
    );

    // ── OWNEDBY-RESOLVE bites. ──
    flag(
        detectOwnedByResolve({
            rows: [{ name: "--phantom", owedBy: "ZZ.W-DOES-NOT-EXIST-PHANTOM" }],
            footprints: [],
        }).violations,
        "OWNEDBY-RESOLVE",
        "a phantom owedBy wave",
    );
    noflag(
        detectOwnedByResolve({
            rows: [{ name: "--real", owedBy: "BI.W-DOCK-CONTROLS" }],
            footprints: ["W-DOCK-CONTROLS"],
        }).violations,
        "OWNEDBY-RESOLVE",
        "a resolvable owedBy wave",
    );
    noflag(
        detectOwnedByResolve({
            rows: [{ site: "ladder x", owedBy: "NF.2" }],
            footprints: [],
        }).violations,
        "OWNEDBY-RESOLVE",
        "a bare sub-band tag (no W- token) is skipped",
    );

    // ── FAM-11 RESIDUE bites. ──
    flag(
        detectFam11Residue({
            gates: [
                {
                    id: "proof:warm-identity",
                    tags: ["ci"],
                    note: "The PRIMARY paint gate. Device-free GREEN on-edit.",
                },
            ],
        }).violations,
        "FAM11 R1",
        "a device-free gate labeled PRIMARY paint gate",
    );
    noflag(
        detectFam11Residue({
            gates: [
                {
                    id: "proof:warm-identity",
                    tags: ["ci"],
                    note: "The primary warm-identity roster gate (device-free; the binding paint rides the LOCAL late-sweep).",
                },
            ],
        }).violations,
        "FAM11 R1",
        "a relabeled warm-identity gate",
    );
    flag(
        detectFam11Residue({
            gates: [
                {
                    id: "proof:ba-gestalt",
                    tags: ["local", "ci", "release"],
                    note: "PROMOTED release-only, NOT ci so it gates the close.",
                },
            ],
        }).violations,
        "FAM11 R2",
        "a ci-tagged ba-gestalt claiming NOT ci",
    );
    noflag(
        detectFam11Residue({
            gates: [
                {
                    id: "proof:ba-gestalt",
                    tags: ["local", "ci", "release"],
                    note: "Device-free source/docs detector reading the roster.",
                },
            ],
        }).violations,
        "FAM11 R2",
        "a reconciled ba-gestalt note (no stale NOT-ci)",
    );

    return flagged;
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_FOLD_DELETE_ARTIFACT",
        "BI-fold-delete",
    );
    const selfTestCount = selfTest();
    const { facts: foldFacts, violations: foldViolations } = detectFolds();
    const { facts: ownerFacts, violations: ownerViolations } =
        detectOwnedByResolve();
    const { facts: fam11Facts, violations: fam11Violations } =
        detectFam11Residue();
    const violations = [...foldViolations, ...ownerViolations, ...fam11Violations];
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:fold-delete",
        command: COMMAND,
        selfTestChecks: selfTestCount,
        facts: { folds: foldFacts, ownedBy: ownerFacts, fam11: fam11Facts },
        violations,
    });

    console.log(
        "proof:fold-delete — per-fold definition-absent + owner-resolve + FAM-11 residue (BI.W-AXES-GATES)",
    );
    console.log("  FOLDS (retired dir/subpath absent · no consumer · survivor present):");
    for (const fold of FOLDS)
        console.log(
            `    ${fold.clause.padEnd(14)}: ${foldFacts[fold.clause].clean ? "GREEN" : "RED"}`,
        );
    console.log(
        `  OWNEDBY-RESOLVE (Arm E owedBy → real wave) : ${ownerViolations.length === 0 ? "GREEN" : "RED"} (${ownerFacts.resolved.length} wave-ref(s); ${ownerFacts.resolved.filter((r) => !r.ok).length} phantom)`,
    );
    console.log(
        `  FAM-11 RESIDUE (label ≤ teeth)             : ${fam11Violations.length === 0 ? "GREEN" : "RED"} (warm-identity R1=${!fam11Facts.warmIdentity.warmClaimsPaint || !fam11Facts.warmIdentity.warmDeviceFree ? "ok" : "over-claim"}, ba-gestalt R2=${!fam11Facts.baGestalt.baClaimsNotCi || !fam11Facts.baGestalt.baHasCiTag ? "ok" : "stale-note"})`,
    );
    console.log(
        `  self-test (bite proof)                     : OK — ${selfTestCount} synthetic sabotages handled (FOLD fence + dir + export + barrel + consumer + survivor; owner phantom/resolve/skip; FAM11 R1×2 + R2×2)`,
    );
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    if (SELF_TEST)
        console.log(
            `\n[proof:fold-delete --self-test] ${selfTestCount} bite(s) handled; tree ${status === "pass" ? "GREEN" : "RED"}`,
        );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

export {
    detectFolds,
    detectOwnedByResolve,
    detectFam11Residue,
    waveFootprintExists,
    selfTest,
};
