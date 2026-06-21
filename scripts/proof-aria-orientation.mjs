#!/usr/bin/env node
// proof:aria-orientation — BE.W-ARIA-ORIENTATION-GUARD — make SegmentedTabs'
// `aria-orientation` role-CONDITIONAL (emit-iff-on-an-allow-listed-role; the PagerDots
// idiom). The defect (BC 4.1.0 cut shipped unfixed): SegmentedTabs.vue emitted
// `:aria-orientation="isVertical ? 'vertical' : 'horizontal'"` UNCONDITIONALLY on the
// strip container, so the DEFAULT `pill` strip (`role="group"`) carried a WAI-ARIA-§6.3-
// PROHIBITED attribute (`group` is in neither the Used-in nor the Inherits-into set).
//
// The fix is the EXACT PagerDots.vue:124 shape:
//   :aria-orientation="isUnderline ? (isVertical ? 'vertical' : 'horizontal') : undefined"
// → underline → role="tablist" → keeps the attr (allow-listed ✓); pill (DEFAULT) →
//   role="group" → Vue drops the `undefined`-bound attr (the prohibited attr GONE ✓).
//
// Device-free SOURCE detector (the proof-tabs-ios.mjs comment-strip + marker house
// pattern), tags ["local","ci","release"]. The RENDERED-DOM proof is the attribute-
// readback π (tests-visual/aria-orientation.spec.ts) — the BC anti-disease split (a
// stale binding that silently no-ops the undefined-drop passes the source gate but reds
// the readback).
//
// Clauses (each born-RED at HEAD's unconditional :aria-orientation):
//   A1 — the guard is role-conditional: the binding is gated on `isUnderline`.
//   A2 — the `undefined` drop on the group arm: the ELSE arm resolves to `undefined`.
//   A3 — the FENCE: the underline arm KEEPS the `isVertical ? 'vertical' : 'horizontal'`
//        derivation (an over-cut dropping it on the tablist strip too reds).
//   A4 — the role stays role-per-variant (`isUnderline ? 'tablist' : 'group'`) — the
//        no-role-laundering fence (the fix did not route the pill to a legal role).
//   + the self-test bites (the anti-de-fang floor).
//
// Run: node scripts/proof-aria-orientation.mjs

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:aria-orientation";

const SFC = "src/components/custom/tabs/SegmentedTabs.vue";

// Strip HTML/Vue comments (<!-- ... -->) + JS block/line comments so a marker inside a
// comment can never satisfy a clause (the proof-tabs-ios comment-strip discipline).
const strip = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");
const readRel = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// The canonical role-conditional shape (whitespace-tolerant). One regex pins A1+A2+A3:
// the binding is gated on isUnderline, the TRUE arm carries the axis derivation, the
// FALSE arm resolves to the bare `undefined` keyword (the attr-drop). Quote-agnostic.
const GUARD_RE =
    /:aria-orientation\s*=\s*["']\s*isUnderline\s*\?\s*\(\s*isVertical\s*\?\s*['"]vertical['"]\s*:\s*['"]horizontal['"]\s*\)\s*:\s*undefined\s*["']/;
// A1 — the binding opens with the isUnderline gate.
const A1_RE = /:aria-orientation\s*=\s*["']\s*isUnderline\s*\?/;
// A2 — the ELSE arm's final token is the bare `undefined` keyword (NOT a string literal).
// The binding's outer quote is `"` and the inner axis literals are `'…'`, so the value
// body carries inner single-quotes — match the final `: undefined"` close of the
// double-quoted binding (the `[\s\S]` body is non-greedy up to the trailing undefined).
const A2_RE = /:aria-orientation\s*=\s*"[^"]*:\s*undefined\s*"/;
// A3 — the TRUE arm still carries the vertical/horizontal axis derivation.
const A3_RE =
    /:aria-orientation\s*=\s*["']\s*isUnderline\s*\?\s*\(\s*isVertical\s*\?\s*['"]vertical['"]\s*:\s*['"]horizontal['"]/;
// A3-overcut — the unconditional `isVertical ? … : …` with NO `undefined` arm (the
// wholesale-delete mis-fix would also fail A2, but we name the over-cut shape too).
const A4_RE = /:role\s*=\s*["']\s*isUnderline\s*\?\s*['"]tablist['"]\s*:\s*['"]group['"]\s*["']/;
// The HEAD defect shape (unconditional aria-orientation on the orientation axis, no
// isUnderline gate, no undefined arm) — its PRESENCE is itself a violation.
const DEFECT_RE =
    /:aria-orientation\s*=\s*["']\s*isVertical\s*\?\s*['"]vertical['"]\s*:\s*['"]horizontal['"]\s*["']/;

export function detect() {
    const violations = [];
    const facts = {};
    const sfc = strip(readRel(SFC));
    facts.sfcExists = sfc.length > 0;
    if (!facts.sfcExists) {
        violations.push(`A0: ${SFC} not found (the SegmentedTabs SFC is absent)`);
        return { violations, facts };
    }

    facts.a1RoleConditional = A1_RE.test(sfc);
    facts.a2UndefinedDrop = A2_RE.test(sfc);
    facts.a3UnderlineKeepsAxis = A3_RE.test(sfc);
    facts.a4RolePerVariant = A4_RE.test(sfc);
    facts.guardCanonical = GUARD_RE.test(sfc);
    facts.headDefectPresent = DEFECT_RE.test(sfc);

    if (!facts.a1RoleConditional)
        violations.push(
            "A1: the `:aria-orientation` binding is NOT gated on `isUnderline` — the prohibited attr is emitted on the role=group pill default (the PagerDots emit-iff-on-role idiom is the fix)",
        );
    if (!facts.a2UndefinedDrop)
        violations.push(
            "A2: the group arm does NOT resolve to bare `undefined` — Vue only DROPS an undefined-bound attr; a string-literal ELSE arm keeps the prohibited attr on role=group",
        );
    if (!facts.a3UnderlineKeepsAxis)
        violations.push(
            "A3: the underline (tablist) arm no longer carries the `isVertical ? 'vertical' : 'horizontal'` derivation — the allow-listed tablist strip IS owed aria-orientation; do NOT fix by deleting the attribute entirely (the over-cut)",
        );
    if (!facts.a4RolePerVariant)
        violations.push(
            "A4: the strip `:role` is no longer `isUnderline ? 'tablist' : 'group'` — the fix must NOT launder the pill to an allow-listed role to make orientation legal (the pill is deliberately role=group + aria-pressed; routing it to radiogroup/tablist is BB.W-CONTROL-TOKENS's scope)",
        );
    if (facts.headDefectPresent)
        violations.push(
            "A1/A2: the HEAD defect shape `:aria-orientation=\"isVertical ? 'vertical' : 'horizontal'\"` (unconditional, no isUnderline gate) survives — the prohibited attr still ships on every default render",
        );

    return { violations, facts };
}

// ── Self-test bites (the anti-de-fang floor) ──
// A FIXED good shape passes all four; the unconditional HEAD shape reds A1+A2; the
// over-cut (attr dropped on BOTH arms) reds A3.
function selfTest() {
    const GOOD = `
        :role="isUnderline ? 'tablist' : 'group'"
        :aria-orientation="isUnderline ? (isVertical ? 'vertical' : 'horizontal') : undefined"
    `;
    const HEAD = `
        :role="isUnderline ? 'tablist' : 'group'"
        :aria-orientation="isVertical ? 'vertical' : 'horizontal'"
    `;
    const OVERCUT = `
        :role="isUnderline ? 'tablist' : 'group'"
    `; // the attribute deleted entirely
    const LAUNDERED = `
        :role="'tablist'"
        :aria-orientation="isVertical ? 'vertical' : 'horizontal'"
    `;

    const a1 = (s) => A1_RE.test(s);
    const a2 = (s) => A2_RE.test(s);
    const a3 = (s) => A3_RE.test(s);
    const a4 = (s) => A4_RE.test(s);
    const defect = (s) => DEFECT_RE.test(s);

    const bites = {
        // the good shape passes all four + no defect
        goodPasses:
            a1(GOOD) && a2(GOOD) && a3(GOOD) && a4(GOOD) && !defect(GOOD),
        // the HEAD shape reds A1 + A2 (and trips the defect predicate)
        headRedsA1A2: !a1(HEAD) && !a2(HEAD) && defect(HEAD),
        // the over-cut reds A3 (the underline arm no longer carries the axis)
        overcutRedsA3: !a3(OVERCUT),
        // the laundered fix reds A4 (the role is no longer role-per-variant)
        launderedRedsA4: !a4(LAUNDERED),
    };
    return bites;
}

function run() {
    const { violations, facts } = detect();
    const bites = selfTest();
    const biteViolations = [];
    for (const [k, ok] of Object.entries(bites)) {
        if (!ok)
            biteViolations.push(
                `SELF-TEST: the \`${k}\` bite BROKE — the detector no longer distinguishes its planted fixture (the anti-de-fang floor)`,
            );
    }
    const allViolations = [...violations, ...biteViolations];
    const status = allViolations.length === 0 ? "pass" : "fail";

    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_ARIA_ORIENTATION_ARTIFACT",
        "BE-aria-orientation",
    );
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:aria-orientation",
        command: COMMAND,
        note: "BE.W-ARIA-ORIENTATION-GUARD device-free SOURCE arm — SegmentedTabs' aria-orientation is role-conditional (A1 isUnderline-gated · A2 undefined-drop on the group arm · A3 the underline arm KEEPS the axis derivation · A4 the role stays role-per-variant, no laundering). The PagerDots emit-iff-on-allow-listed-role idiom transplanted. The RENDERED-DOM proof is the attribute-readback π (tests-visual/aria-orientation.spec.ts).",
        facts: { ...facts, selfTests: bites },
        violations: allViolations,
    });

    console.log(`proof:aria-orientation — ${status.toUpperCase()}`);
    console.log(
        `  A1 role-conditional=${facts.a1RoleConditional} A2 undefined-drop=${facts.a2UndefinedDrop} A3 underline-keeps-axis=${facts.a3UnderlineKeepsAxis} A4 role-per-variant=${facts.a4RolePerVariant}`,
    );
    console.log(
        `  guard-canonical=${facts.guardCanonical} head-defect-present=${facts.headDefectPresent}`,
    );
    if (allViolations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of allViolations) console.log(`  ✗ ${v}`);
    } else {
        console.log(`  artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    }
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
