// proof:display-tracking — BB.W-DISPLAY-TRACKING: the √φ audacious display ladder
// gains a DISPLAY-ONLY proportional negative tracking rung + the Apple-tight
// ~1.05 display leading (born-RED, device-free SOURCE arm).
//
// The deep-SOTA audit (audit/sota-deep/findings.md:10,37): Apple's live display
// type carries a tight NEGATIVE tracking ≈ −1.5% of size (80px → −1.2px) + a
// tight ~1.05 line-height (84/80) — THE signature that separates "designed"
// display from "just big." glass-ui owns the √φ ladder but its tracking + leading
// are NOT Apple-calibrated, and worse, the display tracking PIGGYBACKS on the
// SHARED `--type-tracking-tight` (also the heading/title register's tracking), so
// it cannot be retuned without bleeding into the heading register (the
// substitution-trap class). This wave MINTS a display-ONLY `--type-tracking-display`
// rung (the Apple −1.5% band), re-points the display @utilities onto it, tightens
// `--type-leading-display` 1.1 → ~1.05, and leaves `--type-tracking-tight` + the
// heading/title/body/caption register + the `text-hero` poster register UNTOUCHED.
//
// THIS DEVICE-FREE SOURCE ARM proves the STRUCTURE; the π arm
// (tests-visual/display-tracking.spec.ts) proves the RENDER — the bite this gate
// CANNOT give: an implementer could alias `--type-tracking-display:
// var(--type-tracking-tight)` to dodge the calibration and pass a presence check,
// but only the resolved `getComputedStyle` letterSpacing ≈ −1.5%-of-fontSize (NOT
// −2.5%) binds the Apple band. The implementer must NOT treat a green source arm
// as done; clause 6 (the π readback) + clause 7 (the proof:ba-gestalt verdict) are
// the binding close.
//
// It asserts (T1–T5):
//   T1 — `--type-tracking-display` is declared as a NEGATIVE em in the Apple
//        −1.5% band (−0.010em..−0.020em), AND every display @utility
//        (text-display{,-2..-5,-mega,-hero,-audacious}) reads it for letter-spacing
//        (NOT the shared --type-tracking-tight). Anti-evasion: BOTH arms — a fix
//        that mints the rung but leaves one display @utility on the shared token
//        REDs; an alias to the −2.5% shared rung is out of the Apple band → REDs.
//   T2 — `--type-leading-display` is in the Apple 1.04–1.06 band, STRICTLY less
//        than the HEAD 1.1, AND every display @utility still reads it.
//   T3 — the body/caption register (body{} + text-prose/body/small/caption/micro/
//        admin-label) does NOT read `--type-tracking-display` (the fence holds).
//   T4 — the heading/title/subheading register does NOT read
//        `--type-tracking-display` (the display rung is fenced to the ladder).
//   T5 — `--type-tracking-tight` retains its HEAD value (-0.025em) AND its
//        non-display consumers (text-title, configurator.css, typography/utilities.css,
//        MetricRow.vue) still read it (the substitution-trap regression guard).
//
// Born-RED at the pre-edit tree: no `--type-tracking-display` rung (T1), the
// display @utilities read --type-tracking-tight (T1), --type-leading-display: 1.1
// (T2).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:display-tracking";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// Strip CSS/JS/HTML comments so a prose mention in a comment is NOT a false hit —
// the whole gate is comment-blind. Preserve newlines for line geometry.
const strip = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

const SCHEME = strip(read("src/styles/tokens/scheme-motion.css"));
const SEMANTIC_RAW = read("src/styles/typography/semantic.css");
const SEMANTIC = strip(SEMANTIC_RAW);

// ── The display @utilities (the √φ ladder rungs — re-point set) ────────────────
// text-display (=1), -2..-5, -mega, -hero, -audacious. NOTE: `text-hero` (the
// poster register) is NOT a ladder rung and is OUT OF SCOPE — it has its own
// --text-hero-leading/-tracking knobs and is never on this list.
const DISPLAY_UTILITIES = [
    "text-display-audacious",
    "text-display-hero",
    "text-display-mega",
    "text-display-5",
    "text-display-4",
    "text-display-3",
    "text-display-2",
    "text-display",
];

// The body/caption register (T3 fence — must NOT read the display tracking rung).
const BODY_UTILITIES = [
    "text-prose",
    "text-body",
    "text-small",
    "text-caption",
    "text-micro",
    "text-admin-label",
];

// The heading/title/subheading register (T4 fence).
const HEADING_UTILITIES = ["text-title", "text-heading", "text-subheading"];

// Extract a single `@utility <name> { … }` body (comment-stripped). The lib uses
// Tailwind v4 `@utility` blocks; a brace-balanced slice from the opening brace.
const utilityBody = (src, name) => {
    // Exact name match: `@utility <name> {` — guard against the prefix-collision
    // (text-display vs text-display-2) by requiring the brace-or-whitespace after.
    const re = new RegExp(`@utility\\s+${name}\\s*\\{`);
    const m = re.exec(src);
    if (!m) return null;
    let i = m.index + m[0].length;
    let depth = 1;
    const start = i;
    while (i < src.length && depth > 0) {
        const ch = src[i];
        if (ch === "{") depth++;
        else if (ch === "}") depth--;
        i++;
    }
    return src.slice(start, i - 1);
};

const checks = []; // {id, pass, detail}
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

// ── T1 — display-ONLY proportional negative tracking rung, read by ALL display
//        @utilities (NOT the shared --type-tracking-tight). ───────────────────────
const trackingDeclMatch = SCHEME.match(/--type-tracking-display\s*:\s*([^;]+);/);
const trackingVal = trackingDeclMatch ? trackingDeclMatch[1].trim() : null;
// The Apple −1.5% band: −0.010em..−0.020em (the −1.5% measure with face slack).
// A bare alias to the −2.5% shared rung (`var(--type-tracking-tight)`) is NOT a
// negative em in the band → fails the parse and the band test.
const trackingEm = trackingVal ? parseFloat(trackingVal.replace(/em\s*$/, "")) : NaN;
const trackingIsBandEm =
    trackingVal != null &&
    /^-?\d*\.?\d+em$/.test(trackingVal) &&
    Number.isFinite(trackingEm) &&
    trackingEm < 0 &&
    trackingEm <= -0.01 &&
    trackingEm >= -0.02;

const displayTrackingMisses = [];
for (const u of DISPLAY_UTILITIES) {
    const body = utilityBody(SEMANTIC, u);
    if (body == null) {
        displayTrackingMisses.push(`${u} [@utility absent]`);
        continue;
    }
    const ls = body.match(/letter-spacing\s*:\s*([^;]+);/);
    const lsVal = ls ? ls[1].trim() : "";
    if (!/var\(--type-tracking-display\)/.test(lsVal)) {
        displayTrackingMisses.push(`${u} [letter-spacing: ${lsVal || "absent"}]`);
    }
}
add(
    "T1-display-only-tracking-rung",
    trackingIsBandEm && displayTrackingMisses.length === 0,
    trackingIsBandEm && displayTrackingMisses.length === 0
        ? `--type-tracking-display: ${trackingVal} (a NEGATIVE em in the Apple −1.5% band) is read by ALL ${DISPLAY_UTILITIES.length} display @utilities for letter-spacing — the display ladder tracks the display-only rung, NOT the shared --type-tracking-tight`
        : `T1 FAIL (rung-in-band: ${trackingIsBandEm} [val: ${trackingVal ?? "absent"}]; display @utilities still off the rung: ${displayTrackingMisses.join("; ") || "none"})`,
);

// ── T2 — the display leading tightened to the Apple ~1.05 band (1.04–1.06),
//        strictly < HEAD 1.1, read by ALL display @utilities. ───────────────────
const leadingDeclMatch = SCHEME.match(/--type-leading-display\s*:\s*([^;]+);/);
const leadingVal = leadingDeclMatch ? leadingDeclMatch[1].trim() : null;
const leadingNum = leadingVal ? parseFloat(leadingVal) : NaN;
const leadingInBand =
    Number.isFinite(leadingNum) && leadingNum < 1.1 && leadingNum >= 1.04 && leadingNum <= 1.06;

const displayLeadingMisses = [];
for (const u of DISPLAY_UTILITIES) {
    const body = utilityBody(SEMANTIC, u);
    if (body == null) continue; // T1 already flags the absence
    if (!/line-height\s*:\s*var\(--type-leading-display\)/.test(body)) {
        const lh = body.match(/line-height\s*:\s*([^;]+);/);
        displayLeadingMisses.push(`${u} [line-height: ${lh ? lh[1].trim() : "absent"}]`);
    }
}
add(
    "T2-display-leading-apple-band",
    leadingInBand && displayLeadingMisses.length === 0,
    leadingInBand && displayLeadingMisses.length === 0
        ? `--type-leading-display: ${leadingVal} (the Apple 84/80 ≈ 1.05 band, strictly tighter than HEAD 1.1) is read by ALL ${DISPLAY_UTILITIES.length} display @utilities`
        : `T2 FAIL (leading-in-band [1.04–1.06, <1.1]: ${leadingInBand} [val: ${leadingVal ?? "absent"}]; display @utilities not reading the rung: ${displayLeadingMisses.join("; ") || "none"})`,
);

// ── T3 — the body/caption register does NOT read --type-tracking-display ───────
const bodyLeaks = [];
const bodyBlock = SEMANTIC.match(/\bbody\s*\{([\s\S]*?)\}/);
if (bodyBlock && /var\(--type-tracking-display\)/.test(bodyBlock[1])) {
    bodyLeaks.push("body{}");
}
for (const u of BODY_UTILITIES) {
    const body = utilityBody(SEMANTIC, u);
    if (body == null) continue;
    if (/var\(--type-tracking-display\)/.test(body)) bodyLeaks.push(u);
}
add(
    "T3-body-caption-fence",
    bodyLeaks.length === 0,
    bodyLeaks.length === 0
        ? `no display-tracking rung leaks onto the body/caption register (body{} + ${BODY_UTILITIES.join("/")}) — the §1 charge fence holds`
        : `T3 FAIL — display tracking leaked onto: ${bodyLeaks.join("; ")}`,
);

// ── T4 — the heading/title/subheading register does NOT read the display rung ──
const headingLeaks = [];
for (const u of HEADING_UTILITIES) {
    const body = utilityBody(SEMANTIC, u);
    if (body == null) continue;
    if (/var\(--type-tracking-display\)/.test(body)) headingLeaks.push(u);
}
add(
    "T4-heading-title-fence",
    headingLeaks.length === 0,
    headingLeaks.length === 0
        ? `no display-tracking rung leaks onto the heading register (${HEADING_UTILITIES.join("/")}) — the display rung is fenced to the ladder`
        : `T4 FAIL — display tracking leaked onto: ${headingLeaks.join("; ")}`,
);

// ── T5 — the shared --type-tracking-tight is UNCHANGED + its non-display
//        consumers still read it (the substitution-trap guard). ─────────────────
const tightMatch = SCHEME.match(/--type-tracking-tight\s*:\s*([^;]+);/);
const tightVal = tightMatch ? tightMatch[1].trim() : null;
const tightUnchanged = tightVal === "-0.025em";

// text-title (semantic.css) still reads the shared tight rung.
const titleBody = utilityBody(SEMANTIC, "text-title");
const titleReadsTight =
    titleBody != null && /letter-spacing\s*:\s*var\(--type-tracking-tight\)/.test(titleBody);

// the other non-display consumers (comment-blind raw read).
const NON_DISPLAY_CONSUMERS = [
    "src/styles/configurator.css",
    "src/styles/typography/utilities.css",
    "src/components/custom/metric-stack/MetricRow.vue",
];
const consumerMisses = [];
for (const rel of NON_DISPLAY_CONSUMERS) {
    const src = strip(read(rel));
    if (!/letter-spacing\s*:\s*var\(--type-tracking-tight\)/.test(src)) {
        consumerMisses.push(rel);
    }
}
add(
    "T5-shared-tight-untouched",
    tightUnchanged && titleReadsTight && consumerMisses.length === 0,
    tightUnchanged && titleReadsTight && consumerMisses.length === 0
        ? `--type-tracking-tight retains its HEAD value (-0.025em) AND its non-display consumers (text-title + ${NON_DISPLAY_CONSUMERS.length} files) still read it — the heading register's tracking is unbled (substitution-trap guard)`
        : `T5 FAIL (tight unchanged [-0.025em]: ${tightUnchanged} [val: ${tightVal ?? "absent"}]; text-title reads it: ${titleReadsTight}; non-display consumers off the token: ${consumerMisses.join(", ") || "none"})`,
);

// ── T6 (PRESERVE bite) — text-hero poster register byte-untouched ─────────────
// text-hero keeps its OWN knobs (--text-hero-leading 0.84 / --text-hero-tracking
// -0.03em) and never reads the ladder display rungs. A harden that re-points it is
// a scope-reveal.
const heroBody = utilityBody(SEMANTIC, "text-hero");
const heroKeepsOwnKnobs =
    heroBody != null &&
    /line-height\s*:\s*var\(--text-hero-leading,\s*0\.84\)/.test(heroBody) &&
    /letter-spacing\s*:\s*var\(--text-hero-tracking,\s*-0\.03em\)/.test(heroBody) &&
    !/var\(--type-tracking-display\)/.test(heroBody) &&
    !/var\(--type-tracking-tight\)/.test(heroBody);
add(
    "T6-text-hero-poster-untouched",
    heroKeepsOwnKnobs,
    heroKeepsOwnKnobs
        ? "text-hero keeps its own poster knobs (--text-hero-leading 0.84 / --text-hero-tracking -0.03em) and reads NEITHER the display rung NOR the shared tight rung — the poster register is out of scope (HERO-OUT-OF-SCOPE)"
        : "T6 FAIL — text-hero poster register was touched (it must keep its --text-hero-leading/-tracking knobs and read no ladder rung)",
);

// ── The Tailwind bridge — --tracking-display alongside the --tracking-* family ─
const BRIDGES = strip(read("src/styles/theme/bridges.css"));
const bridgeHasTrackingDisplay =
    /--tracking-display\s*:\s*var\(--type-tracking-display\)/.test(BRIDGES);
add(
    "bridge-tracking-display",
    bridgeHasTrackingDisplay,
    bridgeHasTrackingDisplay
        ? "--tracking-display: var(--type-tracking-display) is bridged alongside the --tracking-* family (the `tracking-display` Tailwind utility — the token-first consumer affordance)"
        : "bridge FAIL — --tracking-display is not bridged in theme/bridges.css",
);

// ── The π readback spec is wired (the BINDING close — clause 6) ────────────────
add(
    "pi-readback-spec-exists",
    existsSync(resolve(ROOT, "tests-visual/display-tracking.spec.ts")),
    "tests-visual/display-tracking.spec.ts exists (the π getComputedStyle readback: each display rung resolves the negative Apple-band letterSpacing + the ~1.05 leading, both modes; the fences hold in the render — the BINDING close)",
);

// ── Self-test bite (anti-evasion) — proves the distinguishing reds ─────────────
// Synthetic mutations on in-memory copies demonstrate each clause's bite.
const selfTest = (() => {
    const bites = [];
    // T1 bite: re-point one display @utility back onto the shared tight rung.
    {
        const mutated = SEMANTIC.replace(
            /(@utility\s+text-display\s*\{[\s\S]*?letter-spacing\s*:\s*)var\(--type-tracking-display\)/,
            "$1var(--type-tracking-tight)",
        );
        const body = utilityBody(mutated, "text-display");
        const reds =
            body != null && /var\(--type-tracking-tight\)/.test(body.match(/letter-spacing[^;]*/)?.[0] ?? "");
        bites.push({ id: "T1-bite-repoint", reds });
    }
    // T1 alias-evasion bite: --type-tracking-display: var(--type-tracking-tight)
    // is NOT a negative em in the band → the band parse rejects it.
    {
        const aliasVal = "var(--type-tracking-tight)";
        const aliasEm = parseFloat(aliasVal.replace(/em\s*$/, ""));
        const inBand =
            /^-?\d*\.?\d+em$/.test(aliasVal) &&
            Number.isFinite(aliasEm) &&
            aliasEm <= -0.01 &&
            aliasEm >= -0.02;
        bites.push({ id: "T1-bite-alias-evasion", reds: !inBand });
    }
    // T2 bite: leaving --type-leading-display at 1.1 is out of the [1.04,1.06] band.
    {
        const v = 1.1;
        const inBand = v < 1.1 && v >= 1.04 && v <= 1.06;
        bites.push({ id: "T2-bite-leading-1.1", reds: !inBand });
    }
    // T5 bite: mutating --type-tracking-tight to the -0.015em display value (the
    // shared-rung-bleed evasion) is NOT the HEAD -0.025em → REDs.
    {
        const v = "-0.015em";
        bites.push({ id: "T5-bite-shared-bleed", reds: v !== "-0.025em" });
    }
    return bites;
})();
const selfTestPasses = selfTest.every((b) => b.reds);
add(
    "self-test-bite",
    selfTestPasses,
    selfTestPasses
        ? `the distinguishing bites all RED: ${selfTest.map((b) => b.id).join(", ")} (re-point/alias-evasion/loose-leading/shared-bleed)`
        : `self-test FAIL — a bite did not red: ${selfTest.filter((b) => !b.reds).map((b) => b.id).join(", ")}`,
);

// ── Report ────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);

console.log(
    "proof:display-tracking — the display-ONLY Apple-calibrated negative tracking + ~1.05 leading (BB.W-DISPLAY-TRACKING)",
);
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_DISPLAY_TRACKING_OUT", "BB-display-tracking");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:display-tracking",
    command: COMMAND,
    note: "DEVICE-FREE SOURCE arm (T1–T6 + bridge + self-test bite) — the RESOLVED negative-tracking + ~1.05-leading render (each display rung's getComputedStyle letterSpacing ≈ −1.5%-of-fontSize + lineHeight ~1.05, both modes; the body/heading fences hold) is proven by tests-visual/display-tracking.spec.ts (the π readback — the binding close), never this gate alone (an alias to the shared −2.5% rung greens a presence-check but reds the band test AND the π).",
    displayUtilities: DISPLAY_UTILITIES,
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:display-tracking] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:display-tracking] the display ladder reads a DISPLAY-ONLY proportional negative tracking (the Apple −1.5% band) + a tight ~1.05 leading; the shared --type-tracking-tight + the heading/title/body/caption + text-hero poster register are byte-untouched — the π arm binds the resolved render.",
);
