// proof:category-card-warm — BG.W-CATEGORY-CARD-WARM (USER-REPORTED 2026-06-29):
// every category page's (`SectionLanding`) sub-category cards (`SectionPreviewCard`,
// the translucent `glass-resting` bento plates) must read as WARM LIQUID GLASS,
// NEVER the "awful metallic wash" the user reports.
//
// ROOT: a category route is NON-focal (no live recessive shell aurora), so a
// `glass-resting` card + its specular catch-light otherwise sits over a FLAT
// grid/paper page wash → a silver/metallic sheen. The fix is a recessive WARM
// AMBIENT FIELD behind the bento (a static warm CSS radial — NO live GL, the
// one-GL-per-route budget held) so the glass cards composite WARM in BOTH modes.
//
// The witnesses (device-free, comment-blind SOURCE arms over the two demo SFCs):
//   W1 — the bento WARM FIELD is PRESENT: `.section-bento::before` paints a warm
//        `oklch()` `radial-gradient(` field keyed off the `--bento-field-h` hue var.
//   W2 — the DARK warm-EMBER arm is PRESENT: `.dark .section-bento::before` carries a
//        LOW-L (some stop L < 0.5) warm-ember field with chroma KEPT on every stop
//        (the W-DARK-MATERIAL luminous-dark model — a warm glow, never a charcoal slab).
//   W3 — NO FLAT/GRAY bento backdrop: the field hue is clamped into the WARM band
//        `clamp(25, …, 95)` AND every light + dark `oklch()` field stop carries chroma
//        (C > 0 — warm material, never a `oklch(L 0 h)` gray fill).
//   W4 — the card reads WARM by CONSTRUCTION: SectionLanding binds `--bento-field-h-raw`
//        off the ONE `warmFieldHue` source, and the `SectionPreviewCard` plate is
//        `glass-resting` (so it TRANSMITS the warm field behind it).
//
// A `--self-test` bite proves each detector flags a synthetic regression (a flat-gray
// field, a missing dark arm, a missing field).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:category-card-warm";
const SELF_TEST = process.argv.includes("--self-test");

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// SFC strip: HTML comments + CSS/TS block comments (comment-blind). NO `//` line
// strip (the CSS has none; a blind `//` strip would corrupt a stray `url(http://…)`).
const stripSfc = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));

// ── pure detectors (reused by the self-test) ──────────────────────────────────

/** The body of the FIRST `<selector> { … }` rule (no nested braces in these rules). */
function ruleBody(css, selector) {
    const esc = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const m = css.match(new RegExp(esc + "\\s*\\{([^}]*)\\}"));
    return m ? m[1] : null;
}

/** Parse `oklch(L C h …)` stops → {L,C} (alpha-suffixed stops parse the same). */
function oklchStops(body) {
    return [...body.matchAll(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+/g)].map((m) => ({
        L: Number(m[1]),
        C: Number(m[2]),
    }));
}

/** W1 — the light bento warm field is present (oklch radial keyed off the hue var). */
function bentoWarmFieldPresent(css) {
    const body = ruleBody(css, ".section-bento::before");
    return Boolean(
        body &&
            /radial-gradient\(/.test(body) &&
            /oklch\(/.test(body) &&
            /var\(--bento-field-h\b/.test(body),
    );
}

/** W2 — the dark warm-ember arm: a LOW-L warm field, chroma kept on every stop. */
function darkEmberArmPresent(css) {
    const body = ruleBody(css, ".dark .section-bento::before");
    if (!body) return false;
    const stops = oklchStops(body);
    return (
        stops.length > 0 &&
        stops.some((s) => s.L < 0.5) && // a low-L warm-EMBER stop (not a light wash)
        stops.every((s) => s.C >= 0.03) // chroma KEPT — never a gray slab
    );
}

/** W3 — no flat/gray backdrop: warm-clamped hue + every field stop carries chroma. */
function noFlatGrayBackdrop(css) {
    const warmClamp =
        /--bento-field-h\s*:\s*clamp\(\s*25\s*,[^;]*,\s*95\s*\)/.test(css);
    const lightBody = ruleBody(css, ".section-bento::before");
    const darkBody = ruleBody(css, ".dark .section-bento::before");
    const lightStops = lightBody ? oklchStops(lightBody) : [];
    const darkStops = darkBody ? oklchStops(darkBody) : [];
    const noGray =
        lightStops.length > 0 &&
        darkStops.length > 0 &&
        lightStops.every((s) => s.C > 0) &&
        darkStops.every((s) => s.C > 0);
    return warmClamp && noGray;
}

/** W4 — the warm hue is CONSUMED from the ONE source + the card is glass-resting. */
function cardTransmitsWarm(landingSfc, previewCardSfc) {
    const bindsField = /--bento-field-h-raw\b/.test(landingSfc);
    const consumesWarmHue = /\bwarmFieldHue\s*\(/.test(landingSfc);
    const cardGlassResting = /\bglass-resting\b/.test(previewCardSfc);
    return bindsField && consumesWarmHue && cardGlassResting;
}

// ── self-test: each detector flags a synthetic regression ─────────────────────
if (SELF_TEST) {
    const bites = [];
    const bite = (id, pass, detail) => bites.push({ id, pass, detail });

    const goodLight =
        ".section-bento { --bento-field-h: clamp(25, var(--bento-field-h-raw, 62), 95); }\n" +
        ".section-bento::before { background: radial-gradient(120% 95% at 12% 0%, oklch(0.93 0.06 var(--bento-field-h) / 0.5), transparent), oklch(0.95 0.035 var(--bento-field-h)); }\n";
    const goodDark =
        ".dark .section-bento::before { background: radial-gradient(120% 95% at 12% 0%, oklch(0.4 0.06 var(--bento-field-h) / 0.55), transparent), oklch(0.25 0.045 var(--bento-field-h)); }\n";

    bite("w1-detector-greens-on-real", bentoWarmFieldPresent(goodLight), "the real light field greens W1");
    bite(
        "w1-detector-has-teeth",
        !bentoWarmFieldPresent(".section-bento { color: red; }"),
        "a bento with NO ::before field is flagged (W1 would RED)",
    );
    bite("w2-detector-greens-on-real", darkEmberArmPresent(goodDark), "the real dark-ember arm greens W2");
    bite(
        "w2-detector-has-teeth-missing",
        !darkEmberArmPresent(goodLight),
        "a tree with NO `.dark .section-bento::before` arm is flagged (W2 would RED)",
    );
    bite(
        "w2-detector-has-teeth-gray",
        !darkEmberArmPresent(
            ".dark .section-bento::before { background: oklch(0.25 0 60); }",
        ),
        "a flat-GRAY dark field (C:0) is flagged as not-warm-ember (W2 would RED)",
    );
    bite("w3-detector-greens-on-real", noFlatGrayBackdrop(goodLight + goodDark), "the real warm field greens W3");
    bite(
        "w3-detector-has-teeth",
        !noFlatGrayBackdrop(
            ".section-bento { --bento-field-h: clamp(25, var(--bento-field-h-raw, 62), 95); }\n" +
                ".section-bento::before { background: oklch(0.95 0 62); }\n" +
                ".dark .section-bento::before { background: oklch(0.25 0 62); }\n",
        ),
        "a flat-GRAY (C:0) light+dark field is flagged (W3 would RED)",
    );
    bite(
        "w4-detector-has-teeth",
        !cardTransmitsWarm("const x = 1;", "<div class='glass-resting'>"),
        "a SectionLanding that neither binds the field nor calls warmFieldHue is flagged (W4 would RED)",
    );

    const failed = bites.filter((b) => !b.pass);
    console.log("proof:category-card-warm --self-test");
    for (const b of bites) console.log(`  ${b.pass ? "✓" : "✗"} ${b.id} — ${b.detail}`);
    if (failed.length) {
        console.error(`\n[self-test] ${failed.length} bite(s) without teeth`);
        process.exit(1);
    }
    console.log("\n[self-test] all warm-field detectors have teeth");
    process.exit(0);
}

// ── run against the real tree ─────────────────────────────────────────────────
const landing = stripSfc(read("demo/chassis/landing/SectionLanding.vue"));
const previewCard = stripSfc(read("demo/chassis/landing/SectionPreviewCard.vue"));

const checks = [];
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

const w1 = bentoWarmFieldPresent(landing);
add(
    "w1-bento-warm-field-present",
    w1,
    w1
        ? "the SectionLanding bento carries a recessive WARM field — `.section-bento::before` paints an `oklch()` `radial-gradient(` keyed off the `--bento-field-h` warm hue (the glass-resting cards composite warm, not metallic)"
        : "no warm `.section-bento::before` `oklch()`-radial field behind the bento cards — the glass-resting plates sit over a flat wash → the metallic sheen",
);

const w2 = darkEmberArmPresent(landing);
add(
    "w2-dark-warm-ember-arm",
    w2,
    w2
        ? "the DARK warm-ember arm is present — `.dark .section-bento::before` is a LOW-L (a stop L<0.5) warm field with chroma KEPT on every stop (the luminous-dark glow, never a charcoal slab)"
        : "the `.dark .section-bento::before` warm-ember arm is missing/low-chroma — the dark category bento reads charcoal/metallic, not warm",
);

const w3 = noFlatGrayBackdrop(landing);
add(
    "w3-no-flat-gray-backdrop",
    w3,
    w3
        ? "no flat/gray bento backdrop — the field hue is warm-clamped `clamp(25,…,95)` and every light + dark `oklch()` field stop carries chroma (warm material, never an `oklch(L 0 h)` gray)"
        : "the bento field is flat/gray (a zero-chroma `oklch()` fill or an un-warm-clamped hue) — the no-gray warm identity is broken",
);

const w4 = cardTransmitsWarm(landing, previewCard);
add(
    "w4-card-transmits-warm",
    w4,
    w4
        ? "the warm hue is CONSUMED from the ONE `warmFieldHue` source (SectionLanding binds `--bento-field-h-raw`) and the `SectionPreviewCard` plate is `glass-resting` (it TRANSMITS the warm field behind it)"
        : "the warm field is not consumed from `warmFieldHue` / not bound on the bento / the card is not `glass-resting` — the warm transmission is not wired",
);

// ── report ────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);
console.log(
    "proof:category-card-warm — the SectionLanding bento carries a recessive WARM field behind the glass-resting cards, both modes (BG.W-CATEGORY-CARD-WARM)",
);
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_BG_CATEGORY_CARD_WARM_OUT", "BG-category-card-warm");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:category-card-warm",
    command: COMMAND,
    note: "DEVICE-FREE SOURCE arm — the bento warm-field present + dark-ember + no-gray + glass-resting transmission. The binding paint (the category cards read WARM liquid glass, ZERO metallic, both engines/both modes) rides the dual-engine π on /forms + /display + /data + the BG gestalt roster.",
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:category-card-warm] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:category-card-warm] the category bento carries a recessive warm field behind the glass-resting cards (light + dark warm-ember), so the cards transmit WARM liquid glass — never the metallic wash.",
);
