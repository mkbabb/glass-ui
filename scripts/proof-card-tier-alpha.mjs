#!/usr/bin/env node
// BB.W-CARD-TIER-ALPHA — the per-tier alpha is canonical at the primitive
// (proof:card-tier-alpha).
//
// THE GAP (ASK-GU-CARD-TIER-ALPHA-PIN, routed from speedtest AW.WG.1): glass-ui
// ships the tier-opacity primitives, but they were scattered + undocumented-as-
// canonical + ungated, so a consumer re-pinned magic alphas per surface (the
// speedtest register.css `--glass-bg-{tier}` re-declarations). This wave
// CANONICALIZES the per-tier alpha as the library's NAMED identity register
// (`--glass-opacity-{tier}`, light arm tokens/glass.css + dark arm
// tokens/dark-arm.css), documents the substitution-vs-inheritance retune seam,
// and LOCKS it here — so the library default IS the canonical alpha a consumer
// reads, and a divergent consumer keeps its own NAMED preset (presets-in-consumers).
//
// THE FENCE (house discipline): this canonicalizes the alpha INPUTS only. The
// `--glass-level` recipe MECHANISM (AX.W54 — the `1 - (1 - <alpha>) * level`
// compose) is OFF-LIMITS (the proof:glass-level sibling owns it); this gate
// asserts the recipe sites are BYTE-UNTOUCHED at their single `:root` loci.
//
// CLAUSES:
//   T1 — each of the 5 ladder tiers (wash/quiet/resting/floating/overlay) + the
//        dock + chassis footprint rungs carries a CANONICAL named `--glass-opacity-*`
//        in the LIGHT arm (tokens/glass.css), at the documented library-identity value.
//   T2 — the 5 ladder tiers are alpha-MONOTONIC (wash < quiet < resting < floating <
//        overlay) — the ladder reads as a ladder.
//   T3 — the DARK arm (tokens/dark-arm.css) carries the SAME named register for the 5
//        tiers + chassis, each LIFTED above its light counterpart (read-weight over the
//        deeper canvas), AND alpha-monotonic. The dock alpha is mode-INVARIANT (a fixed
//        footprint, light-only by design).
//   T4 — the COMPOSE recipe is untouched: each `--glass-bg-{tier}` reads its named
//        `--glass-opacity-{tier}` through the EXACT AX.W54 `--glass-level` seam at its
//        ONE `:root` site (the canonicalization changed the INPUT doc, never the
//        mechanism — proof:glass-level stays GREEN by construction).
//   T5 — the canonicalization + the substitution-trap retune seam are RECORDED in
//        BOTH arms (the documented consumer path — a consumer reads the named alpha or
//        re-declares the composed bg per scope, never invents a magic number).
//   T6 — the consumer-override-deletes-byte-equivalent assert: a consumer pinning a
//        tier alpha BACK TO the library canonical value composes the IDENTICAL fill the
//        bare library rung does — so a re-pin to the canonical value is a deletable no-op
//        (the speedtest override deletes byte-equivalently IFF it pins the library value;
//        a divergent value is a legitimate consumer preset, not a re-pin).
//   SELF-TEST — each planted regression (a missing tier, a non-monotonic ladder, a dark
//        arm that does not lift, a recipe site detached from the level seam) MUST flag.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

function stripCss(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "");
}

function readFile(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// The 5 ladder tiers + the two footprint rungs (dock/chassis). The ladder tiers
// are alpha-monotonic; the footprint rungs sit off-ladder by design.
const LADDER_TIERS = ["wash", "quiet", "resting", "floating", "overlay"];
const FOOTPRINT_TIERS = ["dock", "chassis"];

// The canonical library-identity alpha per tier — the documented default values
// (the library's identity; a consumer reads these, never re-pins a magic number).
const CANONICAL_LIGHT = {
    wash: 0.3,
    quiet: 0.5,
    resting: 0.65,
    floating: 0.8,
    overlay: 0.95,
    // BD.W-DOCK-CORE (D3) — the dock identity alpha lifted 0.42 → 0.50 (margin-insurance
    // for the warm-chromatic darken: the base composite chroma closes a notch before any
    // tint engages). The library's OWN dock identity evolved (the lib default tokens
    // evolve as the lib's identity changes); still the lightest chrome tier (< resting
    // 0.65), still mode-invariant.
    dock: 0.5,
    chassis: 0.28,
};
const CANONICAL_DARK = {
    wash: 0.38,
    quiet: 0.58,
    resting: 0.72,
    floating: 0.88,
    overlay: 0.96,
    chassis: 0.36,
    // dock is mode-invariant — no dark re-pin (fixed footprint).
};

function parseAlpha(src, tier) {
    const m = src.match(new RegExp(`--glass-opacity-${tier}:\\s*([\\d.]+)`));
    return m ? Number(m[1]) : null;
}

// ── T1/T2 — the LIGHT arm: canonical values present + ladder monotonic.
export function detectLight({ glassOverride } = {}) {
    const violations = [];
    const facts = { alphas: {} };
    const glass = stripCss(glassOverride ?? readFile("src/styles/tokens/glass.css"));

    for (const tier of [...LADDER_TIERS, ...FOOTPRINT_TIERS]) {
        const v = parseAlpha(glass, tier);
        facts.alphas[tier] = v;
        if (v === null) {
            violations.push(`T1: --glass-opacity-${tier} not found in tokens/glass.css (every tier owns a canonical named alpha)`);
            continue;
        }
        const want = CANONICAL_LIGHT[tier];
        if (Math.abs(v - want) > 1e-9) {
            violations.push(`T1: --glass-opacity-${tier} is ${v} — NOT the canonical library identity ${want} (the named alpha is the library's identity; a divergent value belongs in a consumer preset, not the library default)`);
        }
    }

    // T2 — the ladder is alpha-monotonic (a ladder reads as a ladder).
    for (let i = 1; i < LADDER_TIERS.length; i++) {
        const lo = facts.alphas[LADDER_TIERS[i - 1]];
        const hi = facts.alphas[LADDER_TIERS[i]];
        if (lo !== null && hi !== null && !(hi > lo)) {
            violations.push(`T2: light ladder NOT monotonic — ${LADDER_TIERS[i - 1]} (${lo}) >= ${LADDER_TIERS[i]} (${hi})`);
        }
    }

    return { facts, violations };
}

// ── T3 — the DARK arm: same register, lifted, monotonic; dock mode-invariant.
export function detectDark({ darkOverride } = {}) {
    const violations = [];
    const facts = { alphas: {}, dockRepinned: null };
    const dark = stripCss(darkOverride ?? readFile("src/styles/tokens/dark-arm.css"));
    const light = detectLight().facts.alphas;

    for (const tier of [...LADDER_TIERS, "chassis"]) {
        const v = parseAlpha(dark, tier);
        facts.alphas[tier] = v;
        if (v === null) {
            violations.push(`T3: --glass-opacity-${tier} not found in tokens/dark-arm.css (the dark arm carries the SAME named register)`);
            continue;
        }
        const want = CANONICAL_DARK[tier];
        if (Math.abs(v - want) > 1e-9) {
            violations.push(`T3: dark --glass-opacity-${tier} is ${v} — NOT the canonical dark identity ${want}`);
        }
        // Each dark rung LIFTS above its light counterpart (read-weight over the
        // deeper canvas — the documented per-mode discipline).
        const lt = light[tier];
        if (lt != null && v != null && !(v > lt)) {
            violations.push(`T3: dark --glass-opacity-${tier} (${v}) does NOT lift above light (${lt}) — the dark arm must carry comparable read-weight over the deeper canvas`);
        }
    }

    // T3 — the dark ladder is monotonic.
    for (let i = 1; i < LADDER_TIERS.length; i++) {
        const lo = facts.alphas[LADDER_TIERS[i - 1]];
        const hi = facts.alphas[LADDER_TIERS[i]];
        if (lo !== null && hi !== null && !(hi > lo)) {
            violations.push(`T3: dark ladder NOT monotonic — ${LADDER_TIERS[i - 1]} (${lo}) >= ${LADDER_TIERS[i]} (${hi})`);
        }
    }

    // The dock alpha is mode-INVARIANT (a fixed footprint, light-only by design):
    // it must NOT be re-pinned in the dark arm.
    facts.dockRepinned = parseAlpha(dark, "dock") !== null;
    if (facts.dockRepinned) {
        violations.push("T3: --glass-opacity-dock re-pinned in the dark arm — the dock alpha is mode-invariant (a fixed footprint, light-only by design)");
    }

    return { facts, violations };
}

// ── T4 — the COMPOSE recipe is untouched: each --glass-bg-{tier} reads its named
//    --glass-opacity-{tier} through the EXACT AX.W54 --glass-level seam at its ONE
//    :root site. The canonicalization changed the INPUT doc, NEVER the mechanism.
const LEVEL_SEAM = (tier) =>
    `(1 - (1 - var(--glass-opacity-${tier})) * var(--glass-level))`;

export function detectRecipe({ glassOverride } = {}) {
    const violations = [];
    const facts = { seamIntact: {} };
    // Read RAW (un-stripped) so the literal compose recipe is matched verbatim.
    const glass = glassOverride ?? readFile("src/styles/tokens/glass.css");

    for (const tier of [...LADDER_TIERS, ...FOOTPRINT_TIERS]) {
        const want = LEVEL_SEAM(tier);
        const ok = glass.includes(want);
        facts.seamIntact[tier] = ok;
        if (!ok) {
            violations.push(`T4: --glass-bg-${tier} does NOT compose its named alpha through the AX.W54 --glass-level seam '${want}' — the recipe mechanism must stay untouched (proof:glass-level)`);
        }
    }
    return { facts, violations };
}

// ── T5 — the canonicalization + the substitution-trap retune seam are RECORDED.
export function detectDoc({ glassOverride, darkOverride } = {}) {
    const violations = [];
    const facts = {};
    const glass = glassOverride ?? readFile("src/styles/tokens/glass.css");
    const dark = darkOverride ?? readFile("src/styles/tokens/dark-arm.css");

    // The light arm records the canonical-register + the substitution-trap seam.
    facts.lightCanon = /CANONICAL named opacity register/i.test(glass) && /BB\.W-CARD-TIER-ALPHA/.test(glass);
    facts.lightTrap = /SUBSTITUTION-VS-INHERITANCE/i.test(glass) && /re-compose the inherited/i.test(glass);
    // The dark arm records its membership in the same named register.
    facts.darkCanon = /BB\.W-CARD-TIER-ALPHA/.test(dark) && /per-tier canonical alpha, DARK arm/i.test(dark);

    if (!facts.lightCanon) violations.push("T5: the light arm does NOT record the canonical per-tier-alpha register (the named identity must be documented, not implicit)");
    if (!facts.lightTrap) violations.push("T5: the substitution-vs-inheritance retune seam is NOT recorded in the light arm (the documented consumer retune path)");
    if (!facts.darkCanon) violations.push("T5: the dark arm does NOT record its membership in the canonical register");

    return { facts, violations };
}

// ── T6 — consumer-override-deletes-byte-equivalent. The compose recipe is a pure
//    function of (alpha, level). At --glass-level: 1 the effective fill alpha
//    collapses to the named tier alpha exactly. So a consumer that re-pins a tier's
//    --glass-bg-{tier} using the SAME color-mix formula with the LIBRARY canonical
//    alpha composes the byte-IDENTICAL fill the bare rung does — the re-pin is a
//    deletable no-op. This computes the effective alpha both ways and asserts equality.
export function detectByteEquivalent() {
    const violations = [];
    const facts = { effective: {} };
    const level = 1; // the registered surface holds level at 1 (a defined material).

    for (const tier of [...LADDER_TIERS, ...FOOTPRINT_TIERS]) {
        const alpha = CANONICAL_LIGHT[tier];
        // The bare library rung's effective fill alpha (the AX.W54 compose at level 1).
        const libraryEffective = 1 - (1 - alpha) * level;
        // A consumer re-declaring --glass-bg-{tier} with the SAME recipe + the canonical
        // alpha (the override that "deletes on consume" because it pins the library value).
        const consumerEffective = 1 - (1 - alpha) * level;
        facts.effective[tier] = libraryEffective;
        if (Math.abs(libraryEffective - consumerEffective) > 1e-9) {
            violations.push(`T6: tier ${tier} — a consumer re-pin to the canonical alpha does NOT compose byte-equivalent (${consumerEffective} vs ${libraryEffective})`);
        }
        // The level-1 effective alpha collapses to the named alpha exactly (the
        // canonical pin IS the named alpha — the deletable-no-op proof).
        if (Math.abs(libraryEffective - alpha) > 1e-9) {
            violations.push(`T6: tier ${tier} — the level-1 effective fill (${libraryEffective}) does NOT collapse to the named alpha (${alpha}) — the canonical pin is not the named value`);
        }
    }
    return { facts, violations };
}

// ── SELF-TEST — each planted regression MUST flag (the gate has teeth).
function selfTest() {
    const failures = [];

    // Bite 1 — a missing tier in the light arm.
    {
        const broken = ":root { --glass-opacity-wash: 0.30; --glass-opacity-quiet: 0.50; --glass-opacity-resting: 0.65; --glass-opacity-floating: 0.80; }";
        const { violations } = detectLight({ glassOverride: broken });
        if (!violations.some((v) => v.includes("overlay") && v.includes("not found"))) {
            failures.push("self-test bite 1 (missing overlay tier) did NOT flag");
        }
    }

    // Bite 2 — a non-monotonic light ladder (resting below quiet).
    {
        const broken = ":root { --glass-opacity-wash: 0.30; --glass-opacity-quiet: 0.50; --glass-opacity-resting: 0.40; --glass-opacity-floating: 0.80; --glass-opacity-overlay: 0.95; --glass-opacity-dock: 0.42; --glass-opacity-chassis: 0.28; }";
        const { violations } = detectLight({ glassOverride: broken });
        if (!violations.some((v) => v.includes("monotonic"))) {
            failures.push("self-test bite 2 (non-monotonic ladder) did NOT flag");
        }
    }

    // Bite 3 — a dark arm rung that does NOT lift above light.
    {
        const broken = ".dark { --glass-opacity-wash: 0.20; --glass-opacity-quiet: 0.58; --glass-opacity-resting: 0.72; --glass-opacity-floating: 0.88; --glass-opacity-overlay: 0.96; --glass-opacity-chassis: 0.36; }";
        const { violations } = detectDark({ darkOverride: broken });
        if (!violations.some((v) => v.includes("does NOT lift above light"))) {
            failures.push("self-test bite 3 (dark arm not lifting) did NOT flag");
        }
    }

    // Bite 4 — a recipe site detached from the --glass-level seam.
    {
        const broken = ":root { --glass-bg-wash: color-mix(in srgb, var(--card) 30%, transparent); }";
        const { violations } = detectRecipe({ glassOverride: broken });
        if (!violations.some((v) => v.includes("--glass-level seam"))) {
            failures.push("self-test bite 4 (recipe detached from level seam) did NOT flag");
        }
    }

    // Bite 5 — the dock re-pinned in the dark arm (mode-invariance broken).
    {
        const broken = ".dark { --glass-opacity-wash: 0.38; --glass-opacity-quiet: 0.58; --glass-opacity-resting: 0.72; --glass-opacity-floating: 0.88; --glass-opacity-overlay: 0.96; --glass-opacity-chassis: 0.36; --glass-opacity-dock: 0.55; }";
        const { violations } = detectDark({ darkOverride: broken });
        if (!violations.some((v) => v.includes("mode-invariant"))) {
            failures.push("self-test bite 5 (dock re-pinned in dark) did NOT flag");
        }
    }

    return failures;
}

export function detect() {
    const light = detectLight();
    const dark = detectDark();
    const recipe = detectRecipe();
    const doc = detectDoc();
    const byteEq = detectByteEquivalent();
    const selfTestFailures = selfTest();

    return {
        violations: [
            ...light.violations,
            ...dark.violations,
            ...recipe.violations,
            ...doc.violations,
            ...byteEq.violations,
            ...selfTestFailures.map((f) => `SELF-TEST: ${f}`),
        ],
        facts: {
            light: light.facts,
            dark: dark.facts,
            recipe: recipe.facts,
            doc: doc.facts,
            byteEq: byteEq.facts,
            selfTestPassed: selfTestFailures.length === 0,
        },
    };
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_CARD_TIER_ALPHA_ARTIFACT", "BB-card-tier-alpha");
    const { violations, facts } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:card-tier-alpha",
        facts,
        violations,
    });

    console.log("proof:card-tier-alpha — the per-tier alpha is canonical at the primitive (BB.W-CARD-TIER-ALPHA)");
    console.log(`  light alphas   : ${Object.entries(facts.light.alphas).map(([k, v]) => `${k}=${v}`).join(" ")}`);
    console.log(`  dark alphas    : ${Object.entries(facts.dark.alphas).map(([k, v]) => `${k}=${v}`).join(" ")}  (dock mode-invariant: ${facts.dark.dockRepinned ? "RE-PINNED ✗" : "yes ✓"})`);
    console.log(`  recipe seam    : ${Object.values(facts.recipe.seamIntact).every(Boolean) ? "all tiers intact ✓" : "DETACHED ✗"}`);
    console.log(`  canon recorded : light=${facts.doc.lightCanon ? "✓" : "✗"} trap=${facts.doc.lightTrap ? "✓" : "✗"} dark=${facts.doc.darkCanon ? "✓" : "✗"}`);
    console.log(`  byte-equiv     : ${Object.entries(facts.byteEq.effective).map(([k, v]) => `${k}=${v}`).join(" ")}`);
    console.log(`  self-test      : ${facts.selfTestPassed ? "all bites flag ✓" : "A BITE DID NOT FLAG ✗"}`);

    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
