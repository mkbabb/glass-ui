#!/usr/bin/env node
// AY.W-AUR2 — the aurora-residue doc-reconciliation gate (proof:aur2-residue).
//
// W-AUR2 is the NO-OP STRIKE: the FULL OKLAB/OKLCH in-shader migration, the
// ≤7-atom door, and the `deriveAurora` composable all SHIPPED at AX W07-W14 and
// are GATE-LOCKED at HEAD (proof:aurora-oklch-interp / -space-gamma /
// -atoms-roundtrip). The corpus-named `mood` atom was DELIBERATELY folded into
// `colorEnergy`'s `temperatureShift` (atoms.ts:154) — there is no live `mood`
// atom. The lone OPEN question — a one-prop `<Aurora derive-color>` ergonomic —
// is RETIRED (zero named consumer at HEAD; the composable + atoms COLOR door
// already serve every route, so a prop is substrate-without-consumer, L inv 8).
//
// The wave authors NO net-new RUNTIME gate (there is no net-new runtime feature
// on the doc arm — that is the whole point of the strike). This gate is the
// explicit-document-reconciliation hard-gate made FALSIFIABLE so the AY plan can
// never silently re-claim the struck work or re-introduce the stale `mood` atom
// (AY.W-AUR2 §HARD GATE):
//
//   (G1a) THE LIVE `mood` ATOM ENUMERATION IS STRUCK — the scoped grep
//         `harmony[/, ]+mood | mood[/, ]+(medium|zones|motion)` over AY.md
//         returns ZERO live atom-list enumeration (the strike-instruction text
//         and the /substrates/blob-mood route are NOT atom enumerations and are
//         excluded by the scoped pattern). Reddens if a plan re-introduces a live
//         `(seed/harmony/mood/...)` aurora atom claim.
//   (G1b) THE THREE STRUCK ITEMS ARE ROUTED TO §0.1 SHIPPED-DO-NOT-REBUILD — the
//         AY.md aurora directive-fold row (the `SHIPPED-DO-NOT-REBUILD` cell) and
//         the W-AUR2 §2 row both name the migration/atoms/`deriveAurora` as
//         already-landed (NOT net-new W-AUR2 work), and cite the three existing
//         gates as the evidence. Reddens on a regression to a net-new claim.
//   (G3) THE PROP SLIVER IS RETIRED (deletion-proof) — `Aurora.vue` defineProps
//         carries NO `deriveColor` / `derive-color` prop, AND the RETIRE
//         rationale (composable + atoms door suffice; no 2nd consumer) is
//         recorded in the AUDIT-LEDGER aurora row. The ABSENCE is the artefact.
//   (G2) THE THREE EXISTING GATES STILL SHIP — the three proof:aurora-* scripts
//         this row cites as evidence still exist on disk (the "already met"
//         evidence is real, not a dangling cite). Their GREEN is verified out of
//         band (G2 in the wave runner); this clause guards the citation.
//
// inv ε / bite-check: a re-introduced live `(seed/harmony/mood/...)` enumeration
// in AY.md reddens (G1a); minting `deriveColor?` on Aurora.vue reddens (G3);
// deleting the §0.1 SHIPPED routing reddens (G1b); deleting a cited proof script
// reddens (G2). The gate is the proof.
//
// House style mirrors proof-ay-w0-reground.mjs: ESM .mjs, lazy resolved paths, a
// byte-stable JSON artefact via gate-output, a human summary, process.exit(1) on
// any violation (fail-closed).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");

function paths() {
    return {
        AY: resolve(ROOT, "docs/tranches/AY/AY.md"),
        LEDGER: resolve(ROOT, "docs/tranches/AY/audit/AUDIT-LEDGER.md"),
        AURORA_VUE: resolve(ROOT, "src/components/custom/aurora/Aurora.vue"),
        ARTIFACT: gateArtifactPath("AUR2_RESIDUE_ARTIFACT", "AY-aur2-residue"),
    };
}

// The scoped LIVE-`mood`-atom-enumeration pattern (G1a). Matches a live atom
// list that pairs `mood` with its sibling atoms — NOT the bare token `mood`
// (which legitimately appears in the strike-instruction and the
// /substrates/blob-mood route). This is the binding falsifiable grep from
// §HARD GATE G1.
const LIVE_MOOD_ENUM_RE = /harmony[/,\s]+mood|mood[/,\s]+(medium|zones|motion)/;

// The three existing gates the row cites as the "already met" evidence (G2).
const CITED_GATES = [
    "scripts/proof-aurora-oklch-interp.mjs",
    "scripts/proof-aurora-space-gamma.mjs",
    "scripts/proof-aurora-atoms-roundtrip.mjs",
];

// (G1a) No LIVE `mood` atom enumeration survives in AY.md.
function checkNoLiveMoodEnum(P) {
    const violations = [];
    const lines = readFileSync(P.AY, "utf8").split("\n");
    lines.forEach((line, i) => {
        if (LIVE_MOOD_ENUM_RE.test(line)) {
            violations.push(
                `AY.md:${i + 1} carries a LIVE \`mood\` atom enumeration: ${line.trim().slice(0, 90)}`,
            );
        }
    });
    return violations;
}

// (G1b) The migration/atoms/deriveAurora are routed to SHIPPED-DO-NOT-REBUILD,
// the three gates are cited, and W-AUR2 points only at the prop decision.
function checkStruckRouting(P) {
    const violations = [];
    const ay = readFileSync(P.AY, "utf8");
    if (!/SHIPPED-DO-NOT-REBUILD/.test(ay)) {
        violations.push("AY.md does NOT route the aurora migration to §0.1 SHIPPED-DO-NOT-REBUILD");
    }
    for (const gate of ["proof:aurora-oklch-interp", "proof:aurora-space-gamma", "proof:aurora-atoms-roundtrip"]) {
        if (!ay.includes(gate)) {
            violations.push(`AY.md does NOT cite the existing gate '${gate}' as the already-met evidence`);
        }
    }
    if (!/W-AUR2.*derive-color.*(decision|RETIRED|prop)/s.test(ay)) {
        violations.push("AY.md W-AUR2 framing does NOT scope the live residue to the `<Aurora derive-color>` prop decision");
    }
    return violations;
}

// (G3) The prop sliver is RETIRED — no `deriveColor` prop on Aurora.vue, and the
// RETIRE rationale is recorded in the AUDIT-LEDGER aurora row.
function checkPropRetired(P) {
    const violations = [];
    const vue = readFileSync(P.AURORA_VUE, "utf8");
    if (/deriveColor|derive-color/.test(vue)) {
        violations.push("Aurora.vue MINTED a `deriveColor`/`derive-color` prop — the RETIRE deletion-proof FAILS");
    }
    const ledger = readFileSync(P.LEDGER, "utf8");
    if (!/derive-color.*RETIRED|RETIRED.*derive-color/s.test(ledger)) {
        violations.push("AUDIT-LEDGER aurora row does NOT record the `<Aurora derive-color>` prop RETIRED rationale");
    }
    if (!/substrate-without-consumer|L inv 8|overfitting/.test(ledger)) {
        violations.push("AUDIT-LEDGER aurora row does NOT record the ≥2-consumer-bar (substrate-without-consumer) rationale");
    }
    return violations;
}

// (G2) The three cited proof scripts still ship (the citation is not dangling).
function checkCitedGatesExist(P) {
    const violations = [];
    for (const rel of CITED_GATES) {
        if (!existsSync(resolve(ROOT, rel))) {
            violations.push(`cited evidence gate '${rel}' is MISSING — the 'already met' citation dangles`);
        }
    }
    return violations;
}

function main() {
    const P = paths();
    for (const [k, p] of [["AY.md", P.AY], ["AUDIT-LEDGER.md", P.LEDGER], ["Aurora.vue", P.AURORA_VUE]]) {
        if (!existsSync(p)) {
            console.error(`[proof:aur2-residue] FAIL — required file '${k}' is missing at ${p}`);
            process.exit(1);
        }
    }

    const g1a = checkNoLiveMoodEnum(P);
    const g1b = checkStruckRouting(P);
    const g3 = checkPropRetired(P);
    const g2 = checkCitedGatesExist(P);
    const violations = [...g1a, ...g1b, ...g3, ...g2];

    const report = {
        gate: "proof:aur2-residue",
        generatedAt: snapshotStamp(),
        clauses: {
            g1a_no_live_mood_enum: g1a.length === 0,
            g1b_struck_routing: g1b.length === 0,
            g3_prop_retired: g3.length === 0,
            g2_cited_gates_ship: g2.length === 0,
        },
        violations,
    };
    writeGateArtifact(P.ARTIFACT, report);

    if (violations.length) {
        console.error("[proof:aur2-residue] FAIL — AY.W-AUR2 residue-reconciliation violations:");
        for (const v of violations) console.error(`  ✗ ${v}`);
        process.exit(1);
    }
    console.log(
        "[proof:aur2-residue] PASS — no live `mood` atom enumeration in AY.md; migration/atoms/deriveAurora routed to SHIPPED-DO-NOT-REBUILD with the 3 gates cited; `<Aurora derive-color>` prop RETIRED (deletion-proof + recorded rationale); the 3 cited evidence gates ship.",
    );
}

main();
