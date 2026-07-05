// scripts/gate-family-manifest.mjs — the gate-family consolidation manifest (BG.W-GATE-FAMILY-CONSOLIDATE, F8.1).
//
// GD-FOLD-1 + 12.3. The gate-machine transposition: the ~360 per-wave π-subject
// gates collapse into a small set of per-BAND FAMILY tables
// (proof:{glass,motion,dock,paper,feedback}-band), riding the shared detector
// kit (scripts/lib/detect/). This module is the MACHINE-READABLE census of that
// transposition — the direction, the family map, the PROTECT set (the gates that
// must NEVER fold), and the paint-oracle wiring (proof:warm-identity PRIMARY,
// proof:ba-gestalt demoted to ONE enrolled surface). proof:meta's
// `gate-family-consolidate` clause validates the LIVE gates.mjs registration
// against it every close.
//
// SCOPE FENCE — F8.1 lands the TRANSPOSITION MACHINERY (the detector kit + this
// census + the warm-identity-PRIMARY wiring), census-gated. The physical
// `--list` count DROP (the family-π member deletes + the 14 doc-presence clause
// deletes) is EXECUTED by BH.B5-gate-consolidate (B5e) — `--list` stays
// byte-identical through F8.1 (B5b) THEN drops (B5e). So the count is a recorded
// DIRECTION here, not a hard delete this wave (the no-unsafe-mass-delete floor).

/**
 * The five per-BAND family tables the per-wave π-subject gates collapse into.
 * Each band gate reads its surface through the shared detector kit; the member
 * list is the DIRECTION (the subsumption target BH.B5e executes), recorded so a
 * future agent cannot smuggle a fresh per-wave π-gate past the family.
 */
export const FAMILY_BANDS = Object.freeze([
    "proof:glass-band",
    "proof:motion-band",
    "proof:dock-band",
    "proof:paper-band",
    "proof:feedback-band",
]);

/**
 * The PROTECT set — gates that must NEVER fold into a family table (the
 * true-positive set the consolidation census enumerates). Two cohorts:
 *   - the LEDGER/BUDGET spine (live-verified-ledger · fold-ledger · profile:budget)
 *     — each carries irreplaceable per-row state a band-mean gate cannot subsume.
 *   - the DEAD-KNOB WITNESSES (R8) — ui-scale's dock-coarse re-declare arm,
 *     dock-plate-clearance's `0px` dead-knob assert, adaptive-reconcile — each is
 *     a precise substitution-vs-inheritance witness a band gate would blur away.
 * `proof:dead-knob` lands as an ENCAPSULATION-family ARM (booked; not a fold).
 */
export const PROTECT_SET = Object.freeze([
    "proof:live-verified-ledger",
    "proof:bg-deferred-ledger", // the BG-active no-silent-drop fold/deferral ledger spine
    "profile:budget",
    "proof:ui-scale",
    "proof:dock-plate-clearance",
    "proof:adaptive-reconcile",
]);

/**
 * The paint-oracle wiring. proof:warm-identity is the PRIMARY dominant-hue
 * kernel over the enrolled surface set (F8.2 / GA-2); proof:ba-gestalt's roster
 * becomes ONE enrolled surface set in that battery, NOT the sole oracle. The
 * primary MUST be release-tagged in the live GATES manifest (the close paint
 * oracle) — the validator enforces it.
 */
export const PAINT_ORACLE = Object.freeze({
    primary: "proof:warm-identity",
    enrolled: ["proof:ba-gestalt"],
});

/** The detector-kit roster this census rests on (module → path is scripts/lib/detect/<module>). */
export const DETECTOR_KIT = Object.freeze({
    dir: "scripts/lib/detect",
    barrel: "scripts/lib/detect/index.mjs",
    modules: ["comment-strip.mjs", "markdown-table.mjs", "wave-id.mjs"],
});

/**
 * The direction of the count drop. `from` is the pre-consolidation registry
 * size; `floor` the committed in-tranche floor; `target` the recorded family-
 * table direction; `listCountDropsAt` the wave that EXECUTES the physical delete.
 */
export const DIRECTION = Object.freeze({
    from: 360,
    floor: 250,
    target: [40, 60],
    listCountDropsAt: "BH.B5-gate-consolidate (B5e)",
    censusDoc: "docs/tranches/BG/audit/W-GATE-FAMILY-CONSOLIDATE-census.md",
});

/**
 * PURE validator (injected IO → self-testable). Checks the LIVE gate registry +
 * the on-disk detector kit against the census invariants.
 *
 * @param {object} inputs
 * @param {Set<string>} inputs.liveGateIds every registered gate id (from GATES)
 * @param {Set<string>} inputs.releaseGateIds gate ids in the `release` aggregate
 * @param {(relPath:string)=>boolean} inputs.fileExists probe for a repo-relative path
 * @returns {string[]} violations (empty ⇒ the consolidation census holds)
 */
export function validateConsolidation({ liveGateIds, releaseGateIds, fileExists }) {
    const violations = [];

    // 1 — every PROTECT_SET member is still LIVE (a folded protected gate REDs).
    for (const id of PROTECT_SET) {
        if (!liveGateIds.has(id)) {
            violations.push(
                `PROTECT_SET member \`${id}\` is ABSENT from the live GATES manifest — a protected gate was folded (forbidden; the true-positive/dead-knob witness set never collapses into a band table).`,
            );
        }
    }

    // 2 — proof:warm-identity is wired PRIMARY (present + release-tagged close oracle).
    if (!liveGateIds.has(PAINT_ORACLE.primary)) {
        violations.push(
            `paint-oracle PRIMARY \`${PAINT_ORACLE.primary}\` is ABSENT from the live GATES manifest — the composited-whole warm-identity kernel is unwired.`,
        );
    } else if (!releaseGateIds.has(PAINT_ORACLE.primary)) {
        violations.push(
            `paint-oracle PRIMARY \`${PAINT_ORACLE.primary}\` is not in the \`release\` aggregate — it must be the close paint oracle (release-tagged), not a local-only probe.`,
        );
    }

    // 3 — the enrolled surfaces (ba-gestalt) stay LIVE (demoted, not deleted).
    for (const id of PAINT_ORACLE.enrolled) {
        if (!liveGateIds.has(id)) {
            violations.push(
                `enrolled paint surface \`${id}\` is ABSENT — ba-gestalt is demoted to ONE enrolled surface, never deleted.`,
            );
        }
    }

    // 4 — the detector kit resolves on disk (barrel + every roster module).
    if (!fileExists(DETECTOR_KIT.barrel)) {
        violations.push(`detector-kit barrel absent — ${DETECTOR_KIT.barrel} must exist.`);
    }
    for (const mod of DETECTOR_KIT.modules) {
        const rel = `${DETECTOR_KIT.dir}/${mod}`;
        if (!fileExists(rel)) {
            violations.push(`detector-kit module absent — ${rel} must exist.`);
        }
    }

    // 5 — the census doc resolves (the human-readable subsumption record).
    if (!fileExists(DIRECTION.censusDoc)) {
        violations.push(`consolidation census doc absent — ${DIRECTION.censusDoc} must record the subsumption + protect set + direction.`);
    }

    return violations;
}
