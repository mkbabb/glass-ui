// proof:constraint-manifest — BG.W-CONSTRAINT-MANIFEST (WS7, R3 taxonomy: a
// proof:meta-FAMILY plan/process gate, landed standalone per the build-map FILES
// — the proof:close-sweep sibling precedent, NOT a proof:meta clause edit).
//
// The manifest home is `docs/tranches/BG/CONSTRAINTS.md`: the six binding
// constraints every BG wave honors + the Safari cross-engine reality (version
// matrix, ≤18 literal-bake trigger, bug 245510, var()-resolution scope,
// DROP-WITH-TRIGGER) + the GL↔flash coupling + the iOS-26 a11y ceilings + the
// §L.0 Mac-only-release decision. This gate does TWO things:
//
//   1. PRESENCE — the manifest RECORDS every required constraint + Safari/release
//      record (a doc that drops a constraint REDs — the mandate cannot silently
//      un-encode).
//
//   2. THE "over live tokens" TEETH — the manifest's most falsifiable claims are
//      cross-checked against the LIVE source on disk (the anti-lie fence): a doc
//      that says "the lens is @supports-gated" / "PRM carve is live" / "the touch
//      floor holds" while the live CSS contradicts it REDs. The doc and the tree
//      stay in lockstep; a manifest is not paper.
//
// Born-RED on HEAD (CONSTRAINTS.md is ABSENT — every presence clause fails) →
// GREEN once the manifest lands AND the three live-source facts hold (they do at
// HEAD: glass-refract.css's @supports lens gate, a11y-overrides.css's PRM carve +
// WCAG-2.5.5 coarse touch floor).
//
// SELF-TEST (`--self-test`): the PURE detectors are fed synthetic input — a doc
// missing a constraint FLAGS, the complete doc does NOT; a live-source string
// missing the @supports gate / the PRM carve / the touch floor FLAGS, the intact
// string does NOT. If the detector misses a planted gap OR false-flags a compliant
// fixture, the gate REDs loudly (acceptance is the RED-witness inverse).
//
// Device-free; self-contained (reads only committed glass-ui docs + src/styles —
// no sibling deps, runs siblings-absent). `["local","ci"]` (a proof:meta-family
// plan/process gate — device-free + ci-safe; in the close set via --run full).

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, writeGateArtifact } from "./gate-output.mjs";
// The shared comment-strip primitive (BG.W-GATE-FAMILY-CONSOLIDATE kit). The
// live-source facts must be REAL declarations, not prose in a comment — strip
// first so a comment-only mention can never false-GREEN a fact.
import { stripComments } from "./lib/detect/index.mjs";

const MANIFEST = join(ROOT, "docs/tranches/BG/CONSTRAINTS.md");
const REFRACT = join(ROOT, "src/styles/glass-refract.css");
const A11Y = join(ROOT, "src/styles/utilities/a11y-overrides.css");

// ── The required manifest content ─────────────────────────────────────────────
// Each row is [id, label, ...regexes]: ALL regexes must match the manifest text
// for the row to be present. Distinctive, load-bearing patterns (not a trivial
// token parrot) so a genuine omission is caught by the self-test.

/** The six binding constraints (audit §"THE CONSTRAINTS EVERY OTHER BG WAVE MUST HONOR"). */
const CONSTRAINT_ROSTER = Object.freeze([
    ["c1-prm", "PRM fade-keeps/transform-drops", /prefers-reduced-motion:\s*reduce/i],
    ["c2-gl-budget", "one live GL context per route", /one\s+(?:live\s+)?GL\s+context\s+per\s+route/i],
    ["c3-safari-245510", "Safari WebKit bug 245510", /\b245510\b/],
    ["c4-cls", "CLS ≈ 0", /CLS\s*[≈~=]\s*0\b/],
    ["c5-focus-keyboard", "FocusScope + roving-tabindex", /FocusScope/, /roving[-\s]?tabindex/i],
    ["c6-contrast-warm", "warm identity + forced-colors", /warm[-\s]?(?:chroma|ink|identity)/i, /forced-colors/i],
]);

/** The Safari cross-engine + ship records (WS7 §§L.0/L.6). */
const RECORD_ROSTER = Object.freeze([
    ["r1-version-matrix", "Safari version matrix (26.4 point sample)", /Safari\s+version\s+matrix/i, /\b26\.4\b/],
    ["r2-le18-trigger", "≤18 WS3 literal-bake trigger", /(?:≤|<=)\s*18/, /(?:literal[-\s]?bake|WS3)/i],
    ["r3-mac-only-release", "§L.0 Mac-only-release decision", /Mac[-\s]?only[-\s]?release/i, /§?\s?L\.0\b/],
    ["r4-gl-flash-coupling", "GL↔flash coupling", /GL\s*↔\s*flash|GL[-\s]?flash\s+coupling|flash\s+coupling/i],
    ["r5-ios26-ceilings", "iOS-26 a11y ceilings", /iOS[-\s]?26/i, /(?:a11y|ceiling)/i],
    ["r6-drop-with-trigger", "Safari-PAINT DROP-WITH-TRIGGER", /DROP[-\s]?WITH[-\s]?TRIGGER/i],
    ["r7-regular-filter-goo", "goo via regular filter:url()", /regular\s+`?filter:\s*url/i],
    ["r8-var-resolution-scoped", "var()-resolution version-26.4-scoped", /var\(\)[-\s]*resolution/i],
]);

/**
 * PURE — parse the manifest text and return the rows (constraints + records) that
 * are NOT fully present. Every regex of a row must match for it to count present.
 * @param {string} md
 * @returns {{ missingConstraints:string[], missingRecords:string[] }}
 */
function findManifestGaps(md) {
    const missOf = (roster) =>
        roster
            .filter(([, , ...res]) => !res.every((re) => re.test(md)))
            .map(([id, label]) => `${id} (${label})`);
    return {
        missingConstraints: missOf(CONSTRAINT_ROSTER),
        missingRecords: missOf(RECORD_ROSTER),
    };
}

// ── The "over live tokens" live-source facts ──────────────────────────────────
// Each is a PURE predicate over a comment-stripped source string, so the self-test
// can feed a synthetic broken/intact fixture. The main run reads the real files.

/** The refraction lens's `backdrop-filter: url()` lives INSIDE the @supports gate. */
const lensSupportsGated = (refractStripped) =>
    /@supports\s*\(\s*backdrop-filter:\s*url\(/.test(refractStripped);

/** The PRM carve is live: `prefers-reduced-motion: reduce` + the `[data-allow-motion]` seam. */
const prmCarveLive = (a11yStripped) =>
    /prefers-reduced-motion:\s*reduce/.test(a11yStripped) && /\[data-allow-motion\]/.test(a11yStripped);

/** The WCAG-2.5.5 coarse touch floor is live: `@media (pointer: coarse)` + the token floor. */
const touchFloorLive = (a11yStripped) =>
    /@media\s*\(\s*pointer:\s*coarse\s*\)/.test(a11yStripped) &&
    /min-block-size:\s*var\(--touch-target/.test(a11yStripped);

/**
 * PURE — given the comment-stripped source strings, return the live-fact violations
 * (the doc claims each; the tree must back each).
 * @param {{ refract:string, a11y:string }} sources
 * @returns {string[]}
 */
function findLiveFactViolations({ refract, a11y }) {
    const v = [];
    if (!lensSupportsGated(refract)) {
        v.push("live-source: glass-refract.css has NO `@supports (backdrop-filter: url(…))` gate — the lens is un-gated (constraint 3 / bug 245510 contradicted).");
    }
    if (!prmCarveLive(a11y)) {
        v.push("live-source: a11y-overrides.css missing the PRM carve (`prefers-reduced-motion: reduce` + `[data-allow-motion]`) — constraint 1 contradicted.");
    }
    if (!touchFloorLive(a11y)) {
        v.push("live-source: a11y-overrides.css missing the WCAG-2.5.5 coarse touch floor (`@media (pointer: coarse)` + `min-block-size: var(--touch-target …)`) — constraint 5 contradicted.");
    }
    return v;
}

// ── The clause (proof:meta-family shape: { clause, visualCount, failures }) ─────
// Exported so the proof:meta family runner CAN compose it later without a re-fork
// (the DRY seam); consumed standalone by this gate's main.
export function constraintManifestClause() {
    const failures = [];
    if (!existsSync(MANIFEST)) {
        return {
            clause: "constraint-manifest",
            visualCount: 0,
            failures: [`manifest absent — ${MANIFEST.replace(ROOT + "/", "")} must record the six binding constraints + the Safari/release records`],
        };
    }
    const { missingConstraints, missingRecords } = findManifestGaps(readFileSync(MANIFEST, "utf8"));
    for (const m of missingConstraints) failures.push(`binding constraint NOT recorded — ${m}`);
    for (const m of missingRecords) failures.push(`Safari/release record NOT recorded — ${m}`);

    // The "over live tokens" teeth (only meaningful once the manifest exists —
    // absent-source is a live-fact contradiction the wave preconds guarantee live).
    const readStripped = (p) => (existsSync(p) ? stripComments(readFileSync(p, "utf8")) : "");
    for (const v of findLiveFactViolations({ refract: readStripped(REFRACT), a11y: readStripped(A11Y) })) {
        failures.push(v);
    }
    return { clause: "constraint-manifest", visualCount: 0, failures };
}

// ── SELF-TEST ─────────────────────────────────────────────────────────────────
const COMPLETE_DOC = [
    "PRM — every motion snaps under `prefers-reduced-motion: reduce`, transform drops, fade keeps.",
    "GL BUDGET — ONE live GL context per route; the shell owns the aurora.",
    "Safari — WebKit bug 245510: `backdrop-filter: url()` is Safari-IMPOSSIBLE; use regular `filter: url()` goo.",
    "CLS ≈ 0 — no layout-property animation.",
    "FocusScope + inert; roving-tabindex on the strips.",
    "warm identity holds; forced-colors restores the outline.",
    "Safari version matrix — the close machine is Safari 26.4.",
    "≤18 trigger — a WS3 literal-bake fix covers Safari ≤18.",
    "§L.0 Mac-only-release decision — the paint tag-block is Mac-only.",
    "GL↔flash coupling — one persistent context avoids the flash.",
    "iOS-26 a11y ceilings hold.",
    "Safari-PAINT DROP-WITH-TRIGGER — no paint claim rides a proxy.",
    "goo/fission paint via regular `filter: url(#…)`.",
    "the var()-resolution answer is version-26.4-scoped.",
].join("\n");

const CLEAN_REFRACT = ".x { }\n@supports (backdrop-filter: url(\"#glass-refract\")) { .glass-lens { backdrop-filter: var(--b); } }";
const CLEAN_A11Y =
    "@media (prefers-reduced-motion: reduce) { *:not([data-allow-motion]) { transition: none; } }\n" +
    "@media (pointer: coarse) { button { min-block-size: var(--touch-target, 2.75rem); } }";

function selfTest() {
    const bites = [];

    // bite 1 — the complete doc has NO gaps.
    {
        const { missingConstraints, missingRecords } = findManifestGaps(COMPLETE_DOC);
        bites.push(["complete-doc → NO-gap", missingConstraints.length === 0 && missingRecords.length === 0]);
    }
    // bite 2 — a doc missing a CONSTRAINT (drop the GL-budget line) FLAGS it.
    {
        const md = COMPLETE_DOC.split("\n").filter((l) => !/GL BUDGET/.test(l)).join("\n");
        const flagged = findManifestGaps(md).missingConstraints.some((m) => m.startsWith("c2-gl-budget"));
        bites.push(["missing-constraint → FLAG", flagged]);
    }
    // bite 3 — a doc missing a RECORD (drop the DROP-WITH-TRIGGER line) FLAGS it.
    {
        const md = COMPLETE_DOC.split("\n").filter((l) => !/DROP-WITH-TRIGGER/.test(l)).join("\n");
        const flagged = findManifestGaps(md).missingRecords.some((m) => m.startsWith("r6-drop-with-trigger"));
        bites.push(["missing-record → FLAG", flagged]);
    }
    // bite 4 — the intact live sources produce NO live-fact violation.
    {
        const v = findLiveFactViolations({ refract: CLEAN_REFRACT, a11y: CLEAN_A11Y });
        bites.push(["intact-live-source → NO-flag", v.length === 0]);
    }
    // bite 5 — an un-gated lens (no @supports) FLAGS the live-fact.
    {
        const broken = ".glass-lens { backdrop-filter: url(#glass-refract); }"; // un-gated
        const flagged = findLiveFactViolations({ refract: broken, a11y: CLEAN_A11Y }).some((s) => /@supports/.test(s));
        bites.push(["ungated-lens → FLAG", flagged]);
    }
    // bite 6 — a missing PRM carve FLAGS the live-fact.
    {
        const noPrm = "@media (pointer: coarse) { button { min-block-size: var(--touch-target, 2.75rem); } }";
        const flagged = findLiveFactViolations({ refract: CLEAN_REFRACT, a11y: noPrm }).some((s) => /PRM carve/.test(s));
        bites.push(["missing-prm-carve → FLAG", flagged]);
    }
    // bite 7 — a missing coarse touch floor FLAGS the live-fact.
    {
        const noFloor = "@media (prefers-reduced-motion: reduce) { *:not([data-allow-motion]) { transition: none; } }";
        const flagged = findLiveFactViolations({ refract: CLEAN_REFRACT, a11y: noFloor }).some((s) => /touch floor/.test(s));
        bites.push(["missing-touch-floor → FLAG", flagged]);
    }

    console.log("proof:constraint-manifest — SELF-TEST (manifest-gap + live-source detectors, 7 bites)");
    let allOk = true;
    for (const [name, ok] of bites) {
        console.log(`  ${ok ? "OK    " : "MISS  "}  ${name}`);
        if (!ok) allOk = false;
    }
    const real = constraintManifestClause().failures;
    console.log(`  real proof:constraint-manifest failures : ${real.length}`);
    for (const f of real.slice(0, 20)) console.error(`    ${f}`);
    if (!allOk) {
        console.error("\n[proof:constraint-manifest] SELF-TEST FAILED — a synthetic fixture behaved wrong; the detector is not load-bearing.");
        process.exit(1);
    }
    if (real.length > 0) {
        console.error("\n[proof:constraint-manifest] SELF-TEST FAILED — the REAL manifest is not clean (the GREEN-after state must pass every clause).");
        process.exit(1);
    }
    console.log("\n[proof:constraint-manifest] SELF-TEST GREEN — all 7 bites behave, the real manifest passes.");
    process.exit(0);
}

// ── main ──────────────────────────────────────────────────────────────────────
if (process.argv.includes("--self-test")) {
    selfTest();
} else {
    const { failures } = constraintManifestClause();

    console.log("proof:constraint-manifest — BG.W-CONSTRAINT-MANIFEST (the binding constraint manifest, over live tokens)");
    console.log(`  manifest               : ${MANIFEST.replace(ROOT + "/", "")}`);
    console.log(`  binding constraints    : ${CONSTRAINT_ROSTER.length}`);
    console.log(`  Safari/release records : ${RECORD_ROSTER.length}`);
    console.log(`  failures               : ${failures.length}`);
    for (const f of failures) console.error(`  [constraint-manifest] ${f}`);

    writeGateArtifact(gateArtifactPath("GLASS_UI_CONSTRAINT_MANIFEST_ARTIFACT", "constraint-manifest"), {
        clause: "constraint-manifest",
        constraints: CONSTRAINT_ROSTER.length,
        records: RECORD_ROSTER.length,
        failures,
        ok: failures.length === 0,
    });

    if (failures.length > 0) {
        console.error(
            `\n[proof:constraint-manifest] ${failures.length} violation(s) — the manifest drops a constraint/record OR the live source contradicts a recorded claim. The constraint manifest does not hold; the close cannot proceed.`,
        );
        process.exit(1);
    }
    console.log(
        "\n[proof:constraint-manifest] the manifest records the six binding constraints + the Safari/release records + the live source backs every cross-checked claim — the constraint manifest holds.",
    );
    process.exit(0);
}
