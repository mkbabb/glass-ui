// proof:field-accent-reconcile — BG.W-FIELD-ACCENT-RECONCILE (M3): the duplicate
// warm-projection (warm-field.ts ≡ aurora-hero.ts) is FOLDED onto ONE source. This
// is a class-H wave (the device-free gate is the close). The witnesses:
//
//   W1 — hue-PARITY (ε 0.5°). The section ramp degree source (SECTION_COLOR_OKLCH's
//        H, what `cssToOklch` returns for an `oklch()` literal) matches the OLD
//        warm-field.ts `SECTION_HUE_DEG` literal table (the regression anchor — the
//        fold must not silently shift a hue; Prototype-6 measured 0.0000°). For an
//        `oklch(L C H)` literal, cssToOklch(...).h === H by definition, so the gate
//        parses the literal H (no value.js dep) and asserts it == the reference.
//   W2 — SINGLE-SOURCE-of-warm-hue. aurora-hero.ts EXPORTS `warmProjectHue` +
//        `SECTION_COLOR_OKLCH` + `sectionHueDeg`; warm-field.ts is a thin ADAPTER
//        that IMPORTS them and carries NO own `projectWarm` body / `SECTION_HUE_DEG`
//        literal table / `clampWarm` dup / dead `warmFieldHueMap` (the fold).
//   W3 — 2-CONSUMER presence. The two real `warmFieldHue` callers (AppShell.vue +
//        SectionLanding.vue) both import AND call it.
//   W4 — AA-over-the-aurora (the recessive precondition + the luminance rewire seam).
//        `shellAuroraConfig` is structurally recessive (vividness:0, every palette
//        stop C ≤ 0.10 + L ≥ 0.85) and the shell mounts at opacityCeiling 0.5, so the
//        field cannot darken the page below the AA-preserving recede; the shell
//        `<Aurora>` carries `data-glass-field-canvas` and `useGlassBackdropLuminance`
//        auto-discovers it (the rewire to sample the LIVE shell canvas). NAME the
//        insufficiency: the binding pixel-AA-both-modes is the live capture + the BG
//        gestalt verdict, never this structural arm alone.
//
// A `--self-test` planted bite proves the parity detector flags a synthetic shifted
// degree.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:field-accent-reconcile";
const SELF_TEST = process.argv.includes("--self-test");

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};
const stripTs = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

// The OLD warm-field.ts SECTION_HUE_DEG literal table — the regression ANCHOR (the
// fold deletes it from warm-field.ts; the gate keeps it as the parity reference).
const REFERENCE_SECTION_HUE_DEG = [
    359.8, 305.9, 265.5, 222.8, 171.1, 69.6, 30.4, 317.5, 8.4, 239.6, 128.8, 208.0,
    291.9,
];

/** Parse the 13 SECTION_COLOR_OKLCH hue degrees (the 3rd value of each oklch literal —
 *  what cssToOklch returns for an oklch() input) from aurora-hero.ts source. */
function parseSectionHueDeg(auroraHeroSrc) {
    const block = auroraHeroSrc.match(
        /SECTION_COLOR_OKLCH[^=]*=\s*\[([\s\S]*?)\]/,
    );
    if (!block) return [];
    return [...block[1].matchAll(/oklch\(\s*[\d.]+\s+[\d.]+\s+([\d.]+)\s*\)/g)].map(
        (m) => Number(m[1]),
    );
}

/** Compute the max |derived - reference| degree delta across the 13 indices. */
function maxHueDelta(derived, reference) {
    if (derived.length !== reference.length || derived.length === 0) return Infinity;
    let max = 0;
    for (let i = 0; i < derived.length; i++) {
        max = Math.max(max, Math.abs(derived[i] - reference[i]));
    }
    return max;
}

// ── self-test: the parity detector has teeth ─────────────────────────────────
if (SELF_TEST) {
    const good = maxHueDelta([...REFERENCE_SECTION_HUE_DEG], REFERENCE_SECTION_HUE_DEG);
    const shifted = REFERENCE_SECTION_HUE_DEG.map((d, i) => (i === 3 ? d + 2 : d));
    const bad = maxHueDelta(shifted, REFERENCE_SECTION_HUE_DEG);
    const bites = [
        ["identity-parity-zero", good === 0, `identical degrees → maxDelta ${good} (== 0)`],
        ["shifted-degree-flagged", bad > 0.5, `a +2° shift on index 3 → maxDelta ${bad} (> 0.5° ε)`],
    ];
    console.log("proof:field-accent-reconcile --self-test");
    for (const [id, pass, detail] of bites)
        console.log(`  ${pass ? "✓" : "✗"} ${id} — ${detail}`);
    if (bites.some(([, p]) => !p)) {
        console.error("\n[self-test] the parity detector has no teeth");
        process.exit(1);
    }
    console.log("\n[self-test] the hue-parity detector has teeth");
    process.exit(0);
}

// ── Run against the real tree ─────────────────────────────────────────────────
const auroraHero = stripTs(read("demo/stories/aurora-hero.ts"));
const warmField = stripTs(read("demo/stories/warm-field.ts"));
const appShell = stripTs(read("demo/layout/AppShell.vue"));
const sectionLanding = stripTs(read("demo/stories/SectionLanding.vue"));
const luminance = stripTs(read("src/composables/glass/useGlassBackdropLuminance.ts"));

const checks = [];
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

// ── W1 — hue parity ───────────────────────────────────────────────────────────
const derivedDeg = parseSectionHueDeg(auroraHero);
const delta = maxHueDelta(derivedDeg, REFERENCE_SECTION_HUE_DEG);
const w1 = delta <= 0.5;
add(
    "w1-hue-parity-eps-0.5",
    w1,
    w1
        ? `the 13 SECTION_COLOR_OKLCH degrees match the reference SECTION_HUE_DEG table within ε0.5° (maxDelta=${delta.toFixed(4)}°) — the fold preserves every section hue (no silent repaint)`
        : `the section ramp degrees DRIFTED from the reference (maxDelta=${delta === Infinity ? "parse-fail" : delta.toFixed(4) + "°"}; parsed ${derivedDeg.length}/13) — the fold shifted a hue`,
);

// ── W2 — single source of warm hue ─────────────────────────────────────────────
const auroraExports =
    /export\s+function\s+warmProjectHue\b/.test(auroraHero) &&
    /export\s+const\s+SECTION_COLOR_OKLCH\b/.test(auroraHero) &&
    /export\s+function\s+sectionHueDeg\b/.test(auroraHero);
const warmFieldImportsSource =
    /import\s*\{[^}]*\bsectionHueDeg\b[^}]*\bwarmProjectHue\b[^}]*\}\s*from\s*["']\.\/aurora-hero["']/.test(
        warmField,
    ) ||
    (/\bsectionHueDeg\b/.test(warmField) &&
        /\bwarmProjectHue\b/.test(warmField) &&
        /from\s*["']\.\/aurora-hero["']/.test(warmField));
// warm-field.ts carries NO own duplicate projection/table/map.
const warmFieldNoDup =
    !/function\s+projectWarm\b/.test(warmField) &&
    !/SECTION_HUE_DEG\s*:/.test(warmField) &&
    !/const\s+SECTION_HUE_DEG\b/.test(warmField) &&
    !/warmFieldHueMap\b/.test(warmField) &&
    !/const\s+clampWarm\b/.test(warmField);
const w2 = auroraExports && warmFieldImportsSource && warmFieldNoDup;
add(
    "w2-single-source-of-warm-hue",
    w2,
    w2
        ? "aurora-hero.ts EXPORTS warmProjectHue + SECTION_COLOR_OKLCH + sectionHueDeg; warm-field.ts is a thin adapter importing them, with NO own projectWarm/SECTION_HUE_DEG/clampWarm/warmFieldHueMap dup — ONE warm-projection source"
        : `the fold is incomplete (aurora-exports=${auroraExports} warm-field-imports=${warmFieldImportsSource} no-dup=${warmFieldNoDup}) — a parallel warm projection survives`,
);

// ── W3 — 2-consumer presence ───────────────────────────────────────────────────
const appShellConsumes =
    /import\s*\{[^}]*\bwarmFieldHue\b[^}]*\}\s*from\s*["'][^"']*warm-field["']/.test(
        appShell,
    ) && /\bwarmFieldHue\s*\(/.test(appShell);
const landingConsumes =
    /import\s*\{[^}]*\bwarmFieldHue\b[^}]*\}\s*from\s*["'][^"']*warm-field["']/.test(
        sectionLanding,
    ) && /\bwarmFieldHue\s*\(/.test(sectionLanding);
const w3 = appShellConsumes && landingConsumes;
add(
    "w3-two-consumer-presence",
    w3,
    w3
        ? "the two real warmFieldHue callers (AppShell.vue + SectionLanding.vue) both import AND call it — the ≥2-consumer bar"
        : `a real warmFieldHue consumer is missing (AppShell=${appShellConsumes} SectionLanding=${landingConsumes})`,
);

// ── W4 — AA-over-the-aurora (recessive precondition + luminance rewire seam) ────
const shellCfg = (() => {
    const m = auroraHero.match(/function\s+shellAuroraConfig[\s\S]*?\n\}/);
    return m ? m[0] : "";
})();
const vividnessZero = /vividness:\s*0\b/.test(shellCfg);
const paletteCs = [...shellCfg.matchAll(/C:\s*([\d.]+)/g)].map((m) => Number(m[1]));
const paletteLs = [...shellCfg.matchAll(/L:\s*([\d.]+)/g)].map((m) => Number(m[1]));
const recessiveChroma =
    paletteCs.length >= 3 && paletteCs.every((c) => c <= 0.1);
const lightBand = paletteLs.length >= 3 && paletteLs.every((l) => l >= 0.85);
const mountedRecede = /:opacity-ceiling=["']0\.5["']/.test(appShell);
// the luminance rewire seam: the shell aurora carries the field-canvas marker AND
// useGlassBackdropLuminance auto-discovers it.
const markerOnShell = /data-glass-field-canvas\b/.test(appShell);
const luminanceAutoDiscovers = /data-glass-field-canvas/.test(luminance);
const w4 =
    vividnessZero &&
    recessiveChroma &&
    lightBand &&
    mountedRecede &&
    markerOnShell &&
    luminanceAutoDiscovers;
add(
    "w4-aa-recessive-precondition-and-rewire",
    w4,
    w4
        ? `the shell field is structurally recessive (vividness:0, palette C≤0.10 [${paletteCs.join(",")}] + L≥0.85 [${paletteLs.join(",")}], opacityCeiling 0.5) so it cannot darken the page below the AA recede; the shell <Aurora> carries data-glass-field-canvas and useGlassBackdropLuminance auto-discovers it (the live-shell rewire) — the binding pixel-AA-both-modes is the live capture + the BG gestalt verdict`
        : `the AA recede / luminance rewire is incomplete (vividness0=${vividnessZero} C≤0.10=${recessiveChroma} L≥0.85=${lightBand} ceiling0.5=${mountedRecede} marker=${markerOnShell} auto-discover=${luminanceAutoDiscovers})`,
);

// ── Report ────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);
console.log(
    "proof:field-accent-reconcile — the duplicate warm-projection folded onto ONE source (hue-parity + single-source + 2-consumer + AA recede) (BG.W-FIELD-ACCENT-RECONCILE)",
);
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_BG_FIELD_ACCENT_RECONCILE_OUT", "BG-field-accent-reconcile");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:field-accent-reconcile",
    command: COMMAND,
    note: "DEVICE-FREE fold arm (class H) — hue-parity + single-source + 2-consumer + the AA recessive precondition. The binding pixel-AA-over-the-aurora-both-modes is the live capture + the BG gestalt verdict, never the structural W4 alone.",
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:field-accent-reconcile] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:field-accent-reconcile] the warm projection is single-source (aurora-hero.ts), the 13 hues parity-match the reference, the 2 real consumers read the fold, and the shell field is structurally recessive with the live-canvas rewire seam.",
);
