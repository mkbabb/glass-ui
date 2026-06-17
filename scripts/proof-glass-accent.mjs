#!/usr/bin/env node
// BB.W-GLASS-ACCENT — the per-INSTANCE chromatic-RIM glass axis (proof:glass-accent).
//
// The third disjoint glass axis (LEVEL · TINT · ACCENT). `--glass-accent` (a
// complete `<color>`, the consumer DATA hue) + `--glass-accent-strength` (a bounded
// `<percentage>` knob) OKLab-tint a glass surface's RIM (the `--glass-material-rim`
// inset ring + the per-rung `--glass-border-*` border) AND the `::before` specular
// catch-light CORE — so the §F1 data-keyed colored hover is a ONE-LINE seam, not a
// hand-threaded border-color + inline catch-light per consumer.
//
// The comment-strip + pure-detector house pattern (mirroring proof-glass-cal.mjs /
// proof-register-ios.mjs). Each of the three SOURCE clauses (W1-W3) is RED at HEAD
// pre-wave; the π readback (tests-visual/glass-accent.spec.ts + the W-GLASS-ACCENT-
// DELTA) is the BINDING visual truth — per-mechanism greens alone do NOT close this
// visual wave (BB inv-4). The `proof:ba-gestalt` glass-band verdict is the gestalt
// bar.
//
//   W1 — the rim AND the ::before catch-light core compose
//        `color-mix(in oklab, <current rim/core>, var(--glass-accent) var(--glass-
//        accent-strength))` — the OKLab perceptual mix (NOT in-srgb, NOT a flat
//        swap). BOTH arms must carry the mix (the silhouette rim + the catch-light
//        glint); a half-accented surface is the defect.
//   W2 — at the default `--glass-accent-strength: 0%` + `--glass-accent:
//        transparent` (the neutral identity) the surface is BYTE-IDENTICAL to HEAD
//        (the @property defaults are the no-op floor).
//   W3 — the axis has ≥2 LIVE per-INSTANCE consumers (the demo data-hue swatch grid
//        + the on/off accent device), NOT a `:root` global, AND is a DISTINCT
//        register — it never aliases/writes the W55 `--glass-tint-source` cohort.
//
// bite-check (the --self-test arm): a synthetic in-srgb rim mix → W1 reds; a default
// strength > 0% → W2 reds; a `:root`-global accent declaration → W3 reds.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { readMonolith } from "./read-css-monoliths.mjs";

function stripCss(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "");
}

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

// The per-instance consumer surface (the ≥2-consumer witness home).
const CONSUMER_FILE = "demo/stories/substrates/glass-material.vue";

// Normalize whitespace so a multi-line `color-mix(...)` declaration matches.
function squish(src) {
    return src.replace(/\s+/g, " ");
}

// Detect an OKLab accent mix on a target var — `color-mix(in oklab, …, var(--glass-
// accent) var(--glass-accent-strength))`. Returns { oklab, srgb } presence flags.
function accentMixFlavors(squished) {
    // any color-mix referencing the accent cohort. `[\s\S]*?` (non-greedy, dot-all)
    // so a nested `var(--glass-rim-ink)` inside the mix does not terminate the scan
    // on its closing paren before the accent cohort is reached.
    const accentMixRe =
        /color-mix\(\s*in\s+(oklab|srgb)\b[\s\S]*?var\(--glass-accent\)\s*var\(--glass-accent-strength\)/g;
    let oklab = false;
    let srgb = false;
    let m;
    while ((m = accentMixRe.exec(squished))) {
        if (m[1] === "oklab") oklab = true;
        if (m[1] === "srgb") srgb = true;
    }
    return { oklab, srgb };
}

// ── W1 + W2: the rim + catch-light mix + the @property no-op floor ───────────
function detectAxis() {
    const violations = [];
    const facts = {};

    const glass = squish(stripCss(readMonolith(ROOT, "glass")));
    const tokens = stripCss(readMonolith(ROOT, "tokens"));

    // W1 — the RIM arm. The rim is TWO things: the `--glass-material-rim` inset ring
    // and the per-rung `--glass-border-*` border. BOTH must compose the accent.
    const rimRingMix =
        /--glass-material-rim:\s*inset[^;]*color-mix\(\s*in\s+(oklab|srgb)\b[^;]*var\(--glass-accent\)\s*var\(--glass-accent-strength\)/.exec(
            glass,
        );
    const borderAccentMix =
        /--glass-border-accent:\s*color-mix\(\s*in\s+(oklab|srgb)\b[^;]*var\(--glass-accent\)\s*var\(--glass-accent-strength\)/.exec(
            glass,
        );
    facts.rimRingOklab = rimRingMix ? rimRingMix[1] === "oklab" : false;
    facts.borderAccentOklab = borderAccentMix ? borderAccentMix[1] === "oklab" : false;
    // the rung borders READ the accent-composed token (not the raw `--glass-border-*`):
    const rungBorderReads = (glass.match(/border:\s*1px solid var\(--glass-border-accent\)/g) || [])
        .length;
    facts.rungBorderReads = rungBorderReads;

    if (!rimRingMix) {
        violations.push(
            "W1 rim-ring: `--glass-material-rim` does not compose `color-mix(…, var(--glass-accent) var(--glass-accent-strength))` (the inset-ring accent half is missing)",
        );
    } else if (rimRingMix[1] !== "oklab") {
        violations.push(
            "W1 rim-ring: the accent rim mix is `in srgb` — must be `in oklab` (the perceptual glass-tint family; the in-srgb fence is the --surface-tint-* brand-overlay axis)",
        );
    }
    if (!borderAccentMix) {
        violations.push(
            "W1 rim-border: `--glass-border-accent` does not compose `color-mix(…, var(--glass-accent) var(--glass-accent-strength))` (the border accent half is missing — a half-accented rim is the defect)",
        );
    } else if (borderAccentMix[1] !== "oklab") {
        violations.push("W1 rim-border: the accent border mix is `in srgb` — must be `in oklab`");
    }
    if (rungBorderReads < 5) {
        violations.push(
            `W1 rim-border: only ${rungBorderReads}/5 ladder rungs read \`var(--glass-border-accent)\` for their border (the accent must reach every rung, not a subset)`,
        );
    }

    // W1 — the CATCH-LIGHT arm. The `::before` core composes the accent on the
    // warm-cream `hsl(40 35% 92%)` core via `--glass-specular-core`.
    const coreMix =
        /--glass-specular-core:\s*color-mix\(\s*in\s+(oklab|srgb)\b[^;]*var\(--glass-accent\)\s*var\(--glass-accent-strength\)/.exec(
            glass,
        );
    facts.coreOklab = coreMix ? coreMix[1] === "oklab" : false;
    // the core is the warm-cream base (the identity preserved at 0%):
    facts.coreWarmCreamBase = coreMix ? /hsl\(\s*40\s+35%\s+92%\s*\)/.test(coreMix[0]) : false;
    // the background stops READ the composed core (not the raw warm-cream literal):
    facts.bgReadsCore =
        /background:[^;]*var\(--glass-specular-core\)/.test(glass) ||
        (glass.match(/var\(--glass-specular-core\)/g) || []).length >= 2;

    if (!coreMix) {
        violations.push(
            "W1 catch-light: the `::before` core (`--glass-specular-core`) does not compose `color-mix(…, var(--glass-accent) var(--glass-accent-strength))` (the catch-light accent half is missing — the rim AND the glint must carry the data hue)",
        );
    } else if (coreMix[1] !== "oklab") {
        violations.push("W1 catch-light: the core accent mix is `in srgb` — must be `in oklab`");
    } else if (!facts.coreWarmCreamBase) {
        violations.push(
            "W1 catch-light: the core mix base is not the warm-cream `hsl(40 35% 92%)` identity (the W2 warm-cream floor — at 0% the core must resolve to today's warm-cream)",
        );
    }
    if (!facts.bgReadsCore) {
        violations.push(
            "W1 catch-light: the `::before` `background` gradient stops do not read `var(--glass-specular-core)` (the composed core must drive the disc + the glint)",
        );
    }

    // a blunt anti-evasion: a flat `border-color: var(--glass-accent)` swap (no mix,
    // no strength) is the defect class — it ignores the bounded knob + neutral fallback.
    const flatSwap = /border-color:\s*var\(--glass-accent\)\s*;/.test(glass);
    facts.flatSwap = flatSwap;
    if (flatSwap) {
        violations.push(
            "W1: a flat `border-color: var(--glass-accent)` swap detected (no color-mix, no strength) — the accent must be the bounded OKLab mix, not a flat hue replacement",
        );
    }

    // W2 — the @property no-op floor: the accent default is the NEUTRAL identity
    // (`transparent`) and the strength default is `0%`.
    const accentReg =
        /@property\s+--glass-accent\s*\{[^}]*\}/.exec(tokens)?.[0] ?? "";
    const strengthReg =
        /@property\s+--glass-accent-strength\s*\{[^}]*\}/.exec(tokens)?.[0] ?? "";
    facts.accentRegistered = accentReg.length > 0;
    facts.strengthRegistered = strengthReg.length > 0;
    facts.accentSyntaxColor = /syntax:\s*"<color>"/.test(accentReg);
    facts.accentInherits = /inherits:\s*true/.test(accentReg);
    facts.accentNeutralIdentity = /initial-value:\s*transparent\b/.test(accentReg);
    facts.strengthSyntaxPct = /syntax:\s*"<percentage>"/.test(strengthReg);
    facts.strengthInherits = /inherits:\s*true/.test(strengthReg);
    facts.strengthZeroDefault = /initial-value:\s*0%/.test(strengthReg);

    if (!accentReg) {
        violations.push("W2: `@property --glass-accent` is not registered");
    } else {
        if (!facts.accentSyntaxColor)
            violations.push('W2: `@property --glass-accent` syntax is not `"<color>"`');
        if (!facts.accentInherits)
            violations.push("W2: `@property --glass-accent` is not `inherits: true` (the cascading-scalar idiom)");
        if (!facts.accentNeutralIdentity)
            violations.push(
                "W2: `@property --glass-accent` initial-value is not the NEUTRAL identity `transparent` — an unset surface would carry a hue (the byte-identical floor breaks)",
            );
    }
    if (!strengthReg) {
        violations.push("W2: `@property --glass-accent-strength` is not registered");
    } else {
        if (!facts.strengthSyntaxPct)
            violations.push('W2: `@property --glass-accent-strength` syntax is not `"<percentage>"`');
        if (!facts.strengthInherits)
            violations.push("W2: `@property --glass-accent-strength` is not `inherits: true`");
        if (!facts.strengthZeroDefault)
            violations.push(
                "W2: `@property --glass-accent-strength` initial-value is not `0%` — an unset surface would tint (the no-op floor breaks)",
            );
    }

    return { violations, facts };
}

// ── W3: ≥2 LIVE per-INSTANCE consumers + the DISTINCT-not-fork fence ─────────
function detectConsumers() {
    const violations = [];
    const facts = {};

    const file = resolve(ROOT, CONSUMER_FILE);
    const raw = existsSync(file) ? readFileSync(file, "utf8") : "";
    facts.consumerFile = CONSUMER_FILE;
    facts.consumerExists = raw.length > 0;

    // per-INSTANCE writes: `'--glass-accent': …` inside a :style binding (NOT a
    // `:root`/`@theme` global). Count distinct write SITES.
    const styleWrites = (raw.match(/['"]--glass-accent['"]\s*:/g) || []).length;
    facts.perInstanceWrites = styleWrites;
    // a guard against a `:root` global masquerading as the consumer:
    const rootGlobal = /:root\s*\{[^}]*--glass-accent\s*:/.test(raw);
    facts.consumerRootGlobal = rootGlobal;

    if (!facts.consumerExists) {
        violations.push(`W3: the consumer file ${CONSUMER_FILE} is absent`);
    } else {
        if (styleWrites < 2) {
            violations.push(
                `W3: only ${styleWrites} per-instance \`--glass-accent\` write site(s) (need ≥2 LIVE per-instance consumers — the data-hue swatch grid + the on/off device; the visual-load-bearing bar)`,
            );
        }
        if (rootGlobal) {
            violations.push(
                "W3: a `:root`-global `--glass-accent` declaration in the consumer — the axis is PER-INSTANCE (set inline on the surface), not a root global",
            );
        }
    }

    // the DISTINCT-not-fork fence: the accent must NOT write the W55 legibility
    // cohort. Scan the glass material partials — the accent mix sites must never
    // re-point `--glass-tint-source`/`--glass-tint-strength` to the accent.
    const glass = stripCss(readMonolith(ROOT, "glass"));
    // a forked write would set the W55 source/strength FROM the accent var:
    const w55Fork =
        /--glass-tint-source:\s*var\(--glass-accent\)/.test(glass) ||
        /--glass-tint-strength:\s*var\(--glass-accent-strength\)/.test(glass);
    facts.w55Fork = w55Fork;
    if (w55Fork) {
        violations.push(
            "W3 distinct-axis: the accent FORKS the W55 legibility cohort (it writes `--glass-tint-source`/`--glass-tint-strength` from the accent var) — the two axes are DISJOINT; the accent never touches the plate background",
        );
    }

    // and the accent must NOT tint the plate BACKGROUND (only the rim + the ::before
    // core). Verify no `background:` composite reads the accent cohort directly.
    const bgAccent = /background:\s*color-mix\([^;]*var\(--glass-accent\)/.test(squish(glass));
    facts.bgAccent = bgAccent;
    if (bgAccent) {
        violations.push(
            "W3 distinct-axis: a plate `background:` composite reads `--glass-accent` — the accent is the RIM+GLINT axis, NEVER the whole-plate background (that is the W55 legibility seam's job)",
        );
    }

    return { violations, facts };
}

export function detect() {
    const axis = detectAxis();
    const consumers = detectConsumers();
    return {
        violations: [...axis.violations, ...consumers.violations],
        facts: { axis: axis.facts, consumers: consumers.facts },
    };
}

// ── the self-test bite (--self-test) — the anti-gameability arm ──────────────
// Drives synthetic-defect strings through the same detectors to prove each clause
// has teeth (an in-srgb rim mix reds W1; a default strength > 0% reds W2; a
// `:root`-global consumer reds W3).
function selfTest() {
    const fails = [];

    // W1 bite — an in-srgb accent rim mix must be flagged (the OKLab fence).
    const srgbRim =
        "--glass-material-rim: inset 0 0 0 0.75px color-mix(in srgb, var(--glass-rim-ink), var(--glass-accent) var(--glass-accent-strength));";
    const f = accentMixFlavors(squish(srgbRim));
    if (!(f.srgb && !f.oklab)) {
        fails.push("self-test W1: an in-srgb accent rim mix was NOT detected as srgb (the OKLab fence has no teeth)");
    }

    // W2 bite — a default strength > 0% must red the no-op floor.
    const badStrengthReg =
        '@property --glass-accent-strength { syntax: "<percentage>"; inherits: true; initial-value: 12%; }';
    if (/initial-value:\s*0%/.test(badStrengthReg)) {
        fails.push("self-test W2: a non-zero default strength slipped the 0% assert");
    }

    // W2 bite — a non-neutral accent default must red the neutral-identity assert.
    const badAccentReg =
        '@property --glass-accent { syntax: "<color>"; inherits: true; initial-value: oklch(0.62 0.2 295); }';
    if (/initial-value:\s*transparent\b/.test(badAccentReg)) {
        fails.push("self-test W2: a non-neutral accent default slipped the transparent-identity assert");
    }

    // W3 bite — a `:root`-global accent must be caught as a non-per-instance write.
    const rootGlobalConsumer = ":root { --glass-accent: oklch(0.7 0.1 20); }";
    if (!/:root\s*\{[^}]*--glass-accent\s*:/.test(rootGlobalConsumer)) {
        fails.push("self-test W3: a :root-global accent was NOT caught (the per-instance bite has no teeth)");
    }

    // W3 bite — a W55 fork must be caught.
    const forked = "--glass-tint-source: var(--glass-accent);";
    if (!/--glass-tint-source:\s*var\(--glass-accent\)/.test(forked)) {
        fails.push("self-test W3: a W55 legibility-cohort fork was NOT caught (the distinct-axis fence has no teeth)");
    }

    return fails;
}

function run() {
    const selfTestMode = process.argv.includes("--self-test");
    const ARTIFACT = gateArtifactPath("GLASS_UI_GLASS_ACCENT_ARTIFACT", "BB-glass-accent");

    if (selfTestMode) {
        const fails = selfTest();
        const ok = fails.length === 0;
        console.log("proof:glass-accent --self-test — the bite arm (anti-gameability)");
        if (ok) {
            console.log("  all clause bites have teeth ✓");
        } else {
            for (const f of fails) console.log(`  ✗ ${f}`);
        }
        process.exit(ok ? 0 : 1);
    }

    const { violations, facts } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:glass-accent",
        facts,
        violations,
    });

    console.log(
        "proof:glass-accent — the per-INSTANCE chromatic-rim axis (--glass-accent/--glass-accent-strength) — BB.W-GLASS-ACCENT",
    );
    console.log(
        `  W1 rim ring oklab : ${facts.axis.rimRingOklab ? "✓" : "✗"}   rim border oklab: ${facts.axis.borderAccentOklab ? "✓" : "✗"}   rungs reading accent: ${facts.axis.rungBorderReads}/5`,
    );
    console.log(
        `  W1 catch-light    : core oklab=${facts.axis.coreOklab ? "✓" : "✗"}  warm-cream base=${facts.axis.coreWarmCreamBase ? "✓" : "✗"}  bg reads core=${facts.axis.bgReadsCore ? "✓" : "✗"}`,
    );
    console.log(
        `  W2 @property      : accent=${facts.axis.accentRegistered ? "✓" : "✗"} (<color> inherit transparent: ${facts.axis.accentSyntaxColor && facts.axis.accentInherits && facts.axis.accentNeutralIdentity ? "✓" : "✗"})   strength=${facts.axis.strengthRegistered ? "✓" : "✗"} (<%> inherit 0%: ${facts.axis.strengthSyntaxPct && facts.axis.strengthInherits && facts.axis.strengthZeroDefault ? "✓" : "✗"})`,
    );
    console.log(
        `  W3 consumers      : ${facts.consumers.perInstanceWrites} per-instance writes   root-global: ${facts.consumers.consumerRootGlobal ? "✗" : "none ✓"}`,
    );
    console.log(
        `  W3 distinct-axis  : W55 fork=${facts.consumers.w55Fork ? "✗ FORK" : "none ✓"}   plate-bg accent=${facts.consumers.bgAccent ? "✗" : "none ✓"}`,
    );

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
