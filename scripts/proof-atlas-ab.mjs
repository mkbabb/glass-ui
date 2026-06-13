#!/usr/bin/env node
// BA.W-ATLAS-RECONCILE — proof:atlas-ab, the d6-lineage A/B fold SOURCE gate
// (device-free; the comment-strip + pure-detector house pattern, mirroring
// proof-fading-scroll.mjs / proof-no-gray.mjs).
//
// THE NEED (the Connectivity Atlas letter, 2026-06-12 — glass-ui's largest external
// consumer moving from the d6 fork lineage to mainline). Six folds, all born-RED at
// master HEAD before this wave:
//   W1 — the post-flip SETTLE seam (`onFlipSettled` on /dark; the atlas's
//        palette-memo/chart-retint/aurora-rederivation batches into ONE post-paint
//        moment). 3.13.0 dropped it; it is NOT VT-subsumable (a flip is a class swap).
//   W2 — the forced-reflow deletion (the `void offsetHeight` read in `toggleDark`;
//        ~40ms/flip, the atlas E9b.1 profile). fee5e3cd removed it; HEAD still carried it.
//   W3 — the suppression carve (the `.no-transition` storm dies AND the
//        DarkModeToggle's icon morph runs). HEAD's blanket `html.no-transition *`
//        gagged the toggle; the `data-allow-motion` carve + the longhand split + the
//        PRM [data-allow-motion] absolute-snap re-land it (the ported 251-LOC test).
//   W4 — the named ground profile (`PAPER_WASH_GROUND`) + the route-transition need
//        (async update + JS-level PRM instant-path on the ONE `useViewTransition`
//        substrate, a thin `navigate` over it — NO parallel `useRouteTransition`).
//   W5 — the silver structure quad (cool near-achromatic; gold's mirror) — conditional
//        ship-or-BOOK: ships ONLY with the InstrumentChassis `variant="structure"`
//        consumer #2; else a DISPOSITION BOOK row with the atlas trigger named.
//   W6 — the cut-notes staging (the B-list fold-or-subsume BY-NAME table + the A-list
//        old→new-shape migration table — the W-CLOSE consume surface).
//
// SOURCE arm only — the BINDING painted truth is the π arm
// (tests-visual/atlas-flip.spec.ts: the icon morph RUNNING during a live flip while a
// sibling glass card shows NO storm + the cut-notes staging) + the ported unit gate
// (tests/components/custom/controls/DarkModeToggle.icon-morph.test.ts, 6 asserts) +
// the VT unit (tests/composables/useViewTransition.test.ts). NEVER this gate alone
// (the AZ P-1 source-green/visually-broken close-class failure this tranche fixes).

import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { readMonolith } from "./read-css-monoliths.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:atlas-ab";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};
// Strip CSS/JS comments so a witness never matches commented-out text.
const strip = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

// ── Sources ────────────────────────────────────────────────────────────────────────
const dark = strip(read("src/composables/dark/useGlobalDark.ts"));
const darkBarrel = strip(read("src/composables/dark/index.ts"));
const darkSubpath = strip(read("src/dark.ts"));
const toggle = strip(read("src/components/custom/controls/DarkModeToggle.vue"));
// a11y-overrides.css is a `utilities/` partial — read the concatenated monolith.
const utilities = strip(readMonolith(ROOT, "utilities"));
const presets = strip(read("src/components/custom/aurora/constants/presets.ts"));
const auroraBarrel = strip(read("src/components/custom/aurora/index.ts"));
const vt = strip(read("src/composables/motion/useViewTransition.ts"));
const scalePaper = strip(read("src/styles/tokens/scale-paper.css"));
const bridges = strip(read("src/styles/theme/bridges.css"));
const darkArm = strip(read("src/styles/tokens/dark-arm.css"));
const lightDark = strip(read("src/styles/tokens/light-dark.css"));
const chassisVue = strip(read("src/components/custom/instrument-chassis/InstrumentChassis.vue"));
const chassisCss = strip(read("src/styles/instrument-chassis.css"));
const cutNotes = read("docs/tranches/BA/audit/W-ATLAS-RECONCILE-cut-notes.md");
const delta = read("docs/tranches/BA/audit/visual/W-ATLAS-RECONCILE-DELTA.md");

// The whole-repo grep for the need-shaped fence (W4) — a REAL useRouteTransition
// declaration or a file by that name (prose mentions are exempt).
function grepRealRouteWrapper() {
    try {
        const out = execSync(
            "grep -rEl '(export (const|function|default)|^(const|function))[[:space:]]+useRouteTransition\\b' src/ 2>/dev/null || true",
            { cwd: ROOT, encoding: "utf8" },
        ).trim();
        const files = execSync(
            "find src -name 'useRouteTransition*' 2>/dev/null || true",
            { cwd: ROOT, encoding: "utf8" },
        ).trim();
        return { decl: out, file: files };
    } catch {
        return { decl: "", file: "" };
    }
}

const checks = [];
const facts = {};
const add = (id, pass, detail) => checks.push({ id, pass: !!pass, detail });

// ── W1 — the settle seam ─────────────────────────────────────────────────────────
const settleImpl =
    /onFlipSettled/.test(dark) &&
    /DarkFlipSettledCallback/.test(dark) &&
    /flipSettledCallbacks\s*=\s*new Set/.test(dark) &&
    /scheduleFlipSettle/.test(dark) &&
    /requestAnimationFrame\(drain\)/.test(dark);
const settleCoalesce =
    /pendingSettleValue/.test(dark) && /settleScheduled/.test(dark);
const settleNoVT = !/startViewTransition/.test(dark); // PRM-safe by construction
const settleExported =
    /onFlipSettled/.test(dark) &&
    /DarkFlipSettledCallback/.test(darkBarrel) &&
    /DarkFlipSettledCallback/.test(darkSubpath);
add(
    "W1-settle-seam-impl",
    settleImpl,
    `onFlipSettled + DarkFlipSettledCallback + one shared Set drained in ONE requestAnimationFrame [impl=${settleImpl}]`,
);
add(
    "W1-settle-coalesces-burst",
    settleCoalesce,
    `a flip burst coalesces to the LAST value (pendingSettleValue + settleScheduled guard) [coalesce=${settleCoalesce}]`,
);
add(
    "W1-settle-no-view-transition",
    settleNoVT,
    `NO View Transition in the settle path (a flip is a class swap, PRM-safe by construction) [noVT=${settleNoVT}]`,
);
add(
    "W1-settle-exported-on-dark",
    settleExported,
    `onFlipSettled + DarkFlipSettledCallback export on /dark (barrel + flat subpath) [exported=${settleExported}]`,
);

// ── W2 — the forced reflow is gone ─────────────────────────────────────────────────
const reflowGone = !/offsetHeight/.test(dark);
add(
    "W2-forced-reflow-deleted",
    reflowGone,
    `no void …offsetHeight forced-layout read in the flip path (fee5e3cd re-land; ~40ms/flip removed) [gone=${reflowGone}]`,
);

// ── W3 — the carve, both arms ─────────────────────────────────────────────────────
const carveOnSuppression = /html\.no-transition\s+\*:not\(\[data-allow-motion\]\)/.test(
    utilities,
);
const prmAbsoluteSnap =
    /\[data-allow-motion\]\s*\{[^}]*transition-duration:\s*0(?:\.\d+)?m?s\s*!important/s.test(
        utilities,
    );
const toggleCarveMarkup = /data-allow-motion/.test(toggle);
const toggleLonghands =
    /transition-property:\s*transform/.test(toggle) &&
    /transition-duration:\s*750ms/.test(toggle);
add(
    "W3-carve-on-suppression",
    carveOnSuppression,
    `the .no-transition kill exempts :not([data-allow-motion]) (the storm-dead arm keeps a surgical carve) [carve=${carveOnSuppression}]`,
);
add(
    "W3-prm-absolute-snaps-carve",
    prmAbsoluteSnap,
    `the PRM block snaps [data-allow-motion] transition-duration to ~0s !important (reduced-motion OVERRIDES the flip carve — absolute) [snap=${prmAbsoluteSnap}]`,
);
add(
    "W3-toggle-declares-carve",
    toggleCarveMarkup,
    `the DarkModeToggle icon <g> declares data-allow-motion (the carve has a real consumer — no dead carve) [markup=${toggleCarveMarkup}]`,
);
add(
    "W3-toggle-longhands",
    toggleLonghands,
    `the toggle transitions are LONGHANDS (transition-property/-duration 750ms — the gate reads an explicit duration) [longhand=${toggleLonghands}]`,
);

// ── W4 — the ground + the route need ───────────────────────────────────────────────
const groundConst =
    /export const PAPER_WASH_GROUND\s*=/.test(presets) &&
    /satisfies Partial<AuroraConfig>/.test(presets) &&
    /medium:\s*"crayon"/.test(presets);
const groundExported = /PAPER_WASH_GROUND/.test(auroraBarrel);
const vtAsync =
    /update:\s*\(\)\s*=>\s*void\s*\|\s*Promise<void>/.test(vt) ||
    /\(\)\s*=>\s*void\s*\|\s*Promise<void>/.test(vt);
const vtPrmInstant =
    /instantUnderReducedMotion/.test(vt) && /prefersReducedMotion/.test(vt);
const navigateHelper =
    /export function navigate\(/.test(vt) &&
    /instantUnderReducedMotion:\s*true/.test(vt);
const route = grepRealRouteWrapper();
const noParallelWrapper = route.decl === "" && route.file === "";
add(
    "W4-paper-wash-ground",
    groundConst && groundExported,
    `PAPER_WASH_GROUND const (crayon, satisfies Partial<AuroraConfig>) + exported on aurora barrel [const=${groundConst} exported=${groundExported}]`,
);
add(
    "W4-vt-async-update",
    vtAsync,
    `startViewTransition accepts an async () => void | Promise<void> update (the navigation case) [async=${vtAsync}]`,
);
add(
    "W4-vt-prm-instant-path",
    vtPrmInstant,
    `the JS-level reduced-motion instant-path (instantUnderReducedMotion + prefersReducedMotion probe) [prm=${vtPrmInstant}]`,
);
add(
    "W4-navigate-over-one-substrate",
    navigateHelper,
    `navigate() is a thin convenience over the ONE startViewTransition (pins instantUnderReducedMotion) [navigate=${navigateHelper}]`,
);
add(
    "W4-no-parallel-route-wrapper",
    noParallelWrapper,
    `NO parallel useRouteTransition wrapper exists (need-shaped fence — no real declaration, no file) [decl='${route.decl}' file='${route.file}']`,
);

// ── W5 — the silver conditional, honest ───────────────────────────────────────────
const silverQuadScalePaper =
    /--silver:\s*oklch/.test(scalePaper) &&
    /--silver-light:\s*oklch/.test(scalePaper) &&
    /--silver-dark:\s*oklch/.test(scalePaper) &&
    /--silver-deep:\s*oklch/.test(scalePaper);
const silverBridges = /--color-silver:\s*var\(--silver\)/.test(bridges);
const silverDarkArm =
    /--silver:\s*oklch/.test(darkArm) && /--silver-light:\s*oklch/.test(darkArm);
const silverLightDark = /--silver:\s*light-dark\(/.test(lightDark);
const silverCascadeMirrorsGold =
    silverQuadScalePaper && silverBridges && silverDarkArm && silverLightDark;
const chassisStructureVariant =
    /"glass"\s*\|\s*"spine"\s*\|\s*"structure"/.test(chassisVue) &&
    /data-variant="structure"/.test(chassisCss) &&
    /--color-silver/.test(chassisCss);
const bookRow = /DISPOSITION BOOK/.test(cutNotes) && /silver/i.test(cutNotes);
// HONEST: EITHER the quad ships WITH consumer #2, OR the BOOK row exists.
const silverShipArm = silverCascadeMirrorsGold && chassisStructureVariant;
const silverHonest = silverShipArm || (bookRow && !silverQuadScalePaper);
facts.silverArm = silverShipArm ? "SHIP" : bookRow ? "BOOK" : "INCOMPLETE";
add(
    "W5-silver-conditional-honest",
    silverHonest,
    `EITHER the silver quad mirrors gold's 4-place cascade + the chassis structure consumer #2 ships (arm=${facts.silverArm}), OR a DISPOSITION BOOK row exists; a quad WITHOUT consumer #2 reds [ship=${silverShipArm} book=${bookRow}]`,
);

// ── W6 — the cut-notes staging ─────────────────────────────────────────────────────
const bListTable =
    /749d45ad/.test(cutNotes) && /fee5e3cd/.test(cutNotes) && /2755ebbd/.test(cutNotes);
const aListTable =
    /amount.{0,4}value/i.test(cutNotes) &&
    /onFlipSettled/.test(cutNotes) &&
    /(old.{0,4}new|new.shape|migration)/i.test(cutNotes);
add(
    "W6-cut-notes-b-list-by-name",
    existsSync(resolve(ROOT, "docs/tranches/BA/audit/W-ATLAS-RECONCILE-cut-notes.md")) && bListTable,
    `the B-list fold-or-subsume table names 749d45ad + fee5e3cd + 2755ebbd BY NAME [b=${bListTable}]`,
);
add(
    "W6-cut-notes-a-list-migration",
    aListTable,
    `the A-list old→new-shape migration table exists (amount→value, onFlipSettled, the new shapes) [a=${aListTable}]`,
);

// ── The π readback spec is wired (the BINDING close) ───────────────────────────────
add(
    "pi-readback-spec-exists",
    existsSync(resolve(ROOT, "tests-visual/atlas-flip.spec.ts")),
    "tests-visual/atlas-flip.spec.ts exists (the π flip readback — the icon morph RUNS during a live flip while a sibling glass card shows NO storm; the BINDING truth)",
);
add(
    "ported-icon-morph-test-exists",
    existsSync(
        resolve(ROOT, "tests/components/custom/controls/DarkModeToggle.icon-morph.test.ts"),
    ),
    "the 251-LOC 6-assert ported icon-morph test exists (re-anchored to utilities/a11y-overrides.css)",
);
add(
    "delta-exists",
    existsSync(resolve(ROOT, "docs/tranches/BA/audit/visual/W-ATLAS-RECONCILE-DELTA.md")) &&
        /surface-hash/i.test(delta),
    "the W-ATLAS-RECONCILE-DELTA.md exists with the AZ-form freshness headers (surface-paths + surface-hash)",
);

// ── Report ─────────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);
const pass = failed.length === 0;

console.log("proof:atlas-ab — the d6-lineage A/B fold (BA.W-ATLAS-RECONCILE)");
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const ARTIFACT = gateArtifactPath("GATE_ATLAS_AB_OUT", "BA-atlas-ab");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:atlas-ab",
    command: COMMAND,
    note: "SOURCE arm only — the painted icon-morph-during-flip / storm-dead truth is proven by tests-visual/atlas-flip.spec.ts (the π arm) + the ported DarkModeToggle.icon-morph.test.ts (6 asserts) + the useViewTransition.test.ts async/PRM/navigate unit, never this gate alone (the BA P-1 close-class fix).",
    facts,
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:atlas-ab] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    `\n[proof:atlas-ab] the d6 A/B registers fold need-shaped — the post-flip settle seam batches on /dark, the forced reflow is gone, the suppression carve kills the storm WITHOUT gagging the toggle (PRM absolute), PAPER_WASH_GROUND + the async/PRM route need land on the ONE VT substrate (no parallel wrapper), the silver structure quad ${facts.silverArm === "SHIP" ? "SHIPS with the chassis consumer #2" : "is BOOKED"}, and the cut-notes stage the W-CLOSE folds. The π arm proves the painted flip truth.`,
);
