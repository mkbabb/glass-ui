// proof:badge-align — BI.W-BADGE-ALIGN (GEO-8/UF-A6): the badge size rungs' line-
// height tracks the `--ui-scale`-scaled font, so the glyph + text share ONE optical
// center at rest AND at the coarse `--ui-scale: 1.5` register (born-RED → GREEN;
// device-free SOURCE arm).
//
// The defect (ss-12, "rose" badge glyph baseline sits low; "doesn't seem to be
// aligned properly"): the badge `size` rungs pinned a FIXED px line-height
// (`leading-4/5/6` = 16/20/24px) while the font-size tracks `--ui-scale`
// (`--control-text-sm`/`--control-text`/`--type-body×--ui-scale` = 12/14/16px at
// rest, ~18/21/24px at coarse). A fixed line-box cannot grow with the font — at
// coarse the font OVERFLOWS the box, and at rest the taller-than-font line-box
// drifts the glyph optical center low against the smaller `--ui-glyph-sm` glyph.
//
// The fix: a RELATIVE unitless line-height (`leading-[1.1]`) so the line-box = 1.1×
// the scaled font at every scale, and the base `items-center` centers the glyph
// (`--ui-glyph-sm`, also `--ui-scale`-scaled) against the re-based line-box.
//
// THIS DEVICE-FREE SOURCE ARM proves the STRUCTURE (no fixed leading px on the
// rungs; a relative line-height token present; the base centering contract intact);
// the π arm (tests-visual/badge-align.spec.ts) proves the RENDER — the binding bite
// this gate cannot give: the glyph-center vs text-cap-center delta ≤ ~1px per rung,
// at rest AND at emulated coarse `--ui-scale: 1.5`, both modes.
//
// It asserts (B1–B3 + self-test):
//   B1 — every badge size rung (sm/md/lg) carries NO fixed leading (neither the
//        rem-numbered `leading-3..12` rungs NOR an arbitrary length `leading-[Npx|
//        rem|em]`) AND DOES carry a relative/scaled line-height (a `leading-none/
//        tight/snug/normal/relaxed/loose` keyword, a unitless `leading-[1.1]`, or a
//        `leading-[var(--…)]` token). The line-box tracks the scaled font.
//   B2 — the base rule keeps `items-center` + the scaled-glyph sizing
//        `[&_svg:not([class*=size-])]:size-(--ui-glyph-sm)` (the glyph tracks the
//        font, not a fixed box — the re-based line-box centers against the scaled
//        glyph, §Work item 2).
//   B3 — the π readback spec (tests-visual/badge-align.spec.ts) is wired.
//
// Born-RED at HEAD: `leading-4/5/6` fixed px on the three rungs (B1).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:badge-align";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// Strip JS `//` + `/* */` comments so a prose mention of `leading-4/5/6` in a
// comment is NOT a false hit — the gate is comment-blind. Preserve newlines.
const strip = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

const BADGE_RAW = read("src/components/ui/badge/index.ts");
const BADGE = strip(BADGE_RAW);

// ── Detectors ──────────────────────────────────────────────────────────────────
// A FIXED leading: the rem-numbered Tailwind rungs `leading-3..12` (0.75rem..3rem)
// OR an arbitrary FIXED length `leading-[<n>px|rem|em]`. These do NOT track font.
const FIXED_LEADING = /\bleading-(?:3|4|5|6|7|8|9|10|11|12|\[[^\]]*(?:px|rem|em)[^\]]*\])/;
// A RELATIVE/scaled leading: a keyword (none/tight/snug/normal/relaxed/loose), a
// unitless arbitrary number `leading-[1.1]`, or a `leading-[var(--…)]` token. These
// scale with the font.
const RELATIVE_LEADING =
    /\bleading-(?:none|tight|snug|normal|relaxed|loose|\[\d*\.?\d+\]|\[var\([^)]*\)\])/;

// Extract the `size: { … }` variant block (brace-balanced; the rung strings carry
// no braces, so the match is clean), then each rung's class string literal.
const sizeBlock = (() => {
    const m = /size\s*:\s*\{/.exec(BADGE);
    if (!m) return null;
    let i = m.index + m[0].length;
    let depth = 1;
    const start = i;
    while (i < BADGE.length && depth > 0) {
        const ch = BADGE[i];
        if (ch === "{") depth++;
        else if (ch === "}") depth--;
        i++;
    }
    return BADGE.slice(start, i - 1);
})();

const rungString = (name) => {
    if (sizeBlock == null) return null;
    const re = new RegExp(`\\b${name}\\s*:\\s*(['"\`])([\\s\\S]*?)\\1`);
    const m = re.exec(sizeBlock);
    return m ? m[2] : null;
};

const RUNGS = ["sm", "md", "lg"];

const checks = []; // {id, pass, detail}
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

// ── B1 — no fixed leading px on the rungs; a relative line-height present ────────
const rungMisses = [];
for (const name of RUNGS) {
    const s = rungString(name);
    if (s == null) {
        rungMisses.push(`${name} [rung absent]`);
        continue;
    }
    const hasFixed = FIXED_LEADING.test(s);
    const hasRelative = RELATIVE_LEADING.test(s);
    if (hasFixed) rungMisses.push(`${name} [fixed leading: ${s.match(FIXED_LEADING)?.[0]}]`);
    else if (!hasRelative) rungMisses.push(`${name} [no relative line-height]`);
}
add(
    "B1-rungs-relative-leading",
    sizeBlock != null && rungMisses.length === 0,
    sizeBlock != null && rungMisses.length === 0
        ? `all ${RUNGS.length} badge size rungs (${RUNGS.join("/")}) carry a RELATIVE/scaled line-height and NO fixed leading px — the line-box tracks the --ui-scale-scaled font (GEO-8 closed)`
        : `B1 FAIL — ${sizeBlock == null ? "size variant block not found" : `rung(s): ${rungMisses.join("; ")}`}`,
);

// ── B2 — the base centering contract intact (items-center + scaled glyph) ────────
const baseHasItemsCenter = /\bitems-center\b/.test(BADGE);
const baseHasScaledGlyph =
    /\[&_svg:not\(\[class\*=size-\]\)\]:size-\(--ui-glyph-sm\)/.test(BADGE);
add(
    "B2-base-centering-contract",
    baseHasItemsCenter && baseHasScaledGlyph,
    baseHasItemsCenter && baseHasScaledGlyph
        ? "the base rule keeps `items-center` + the scaled-glyph `[&_svg:not([class*=size-])]:size-(--ui-glyph-sm)` — the glyph tracks the font (not a fixed box) and centers against the re-based line-box"
        : `B2 FAIL (items-center: ${baseHasItemsCenter}; scaled-glyph rule: ${baseHasScaledGlyph})`,
);

// ── B3 — the π readback spec is wired (the BINDING close) ────────────────────────
add(
    "B3-pi-readback-spec-exists",
    existsSync(resolve(ROOT, "tests-visual/badge-align.spec.ts")),
    "tests-visual/badge-align.spec.ts exists (the π: glyph-center vs text-cap-center delta ≤ ~1px per rung, at rest AND at coarse --ui-scale: 1.5; the font no longer overflows the line-box; both modes — the BINDING close)",
);

// ── Self-test bite (anti-evasion) — proves the distinguishing reds ───────────────
const selfTest = (() => {
    const bites = [];
    // A planted rem-numbered fixed leading (the HEAD form) flags.
    bites.push({
        id: "bite-leading-5",
        reds: FIXED_LEADING.test("text-[length:var(--control-text)] leading-5 px-2.5 py-1"),
    });
    // A planted arbitrary FIXED-length leading flags (the format-swap evasion).
    bites.push({
        id: "bite-leading-arb-px",
        reds: FIXED_LEADING.test("text-sm leading-[20px] px-2"),
    });
    // A rung with NO line-height at all flags (missing relative token).
    bites.push({
        id: "bite-no-leading",
        reds: !RELATIVE_LEADING.test("text-sm px-2 py-0.5"),
    });
    // The honest fix passes BOTH arms (no false-red on the relative form).
    bites.push({
        id: "bite-honest-relative-passes",
        reds:
            !FIXED_LEADING.test("text-[length:var(--control-text)] leading-[1.1] px-2.5 py-1") &&
            RELATIVE_LEADING.test("text-[length:var(--control-text)] leading-[1.1] px-2.5 py-1"),
    });
    return bites;
})();
const selfTestPasses = selfTest.every((b) => b.reds);
add(
    "self-test-bite",
    selfTestPasses,
    selfTestPasses
        ? `the distinguishing bites all hold: ${selfTest.map((b) => b.id).join(", ")} (fixed-rem flags, arbitrary-px flags, no-leading flags, honest relative passes)`
        : `self-test FAIL — a bite did not hold: ${selfTest.filter((b) => !b.reds).map((b) => b.id).join(", ")}`,
);

// ── Report ───────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);

console.log(
    "proof:badge-align — the badge size-rung line-height tracks the scaled font (BI.W-BADGE-ALIGN / GEO-8)",
);
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_BADGE_ALIGN_OUT", "BI-badge-align");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:badge-align",
    command: COMMAND,
    note: "DEVICE-FREE SOURCE arm (B1 no fixed leading px + a relative line-height on all three rungs; B2 the base items-center + scaled-glyph centering contract; B3 π-spec wired; + a 4-bite self-test). The RESOLVED optical-center render (glyph-center vs text-cap-center delta ≤ ~1px per rung, at rest AND at coarse --ui-scale: 1.5, both modes — the font no longer overflows the line-box) is proven by tests-visual/badge-align.spec.ts, never this gate alone.",
    rungs: RUNGS,
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:badge-align] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:badge-align] the badge size rungs read a relative line-height that tracks the --ui-scale-scaled font; the glyph + text share one optical center against the re-based line-box — the π arm binds the resolved render.",
);
