#!/usr/bin/env node
// BB.W-ON-GLASS-FG — the surface-aware FOREGROUND register gate (proof:on-glass-fg).
//
// The N13 "dark-theme whisper collapse" close: --muted-foreground is calibrated
// against the CANVAS (--neutral-5, "AA vs page"), but the glass-first MAXIMAL default
// (AX.W54) makes the common case a caption rendering on a TRANSLUCENT content-tier
// glass plate that composites the backdrop UP — so the muted ink's contrast COLLAPSES
// on its own surface (the speedtest ask measured 1.15-3.29:1 on glass in dark theme).
//
// This wave mints a THREE-RUNG on-glass foreground family whose contrast TARGET is the
// COMPOSITED glass fill, not the page — `--on-glass-muted` (+ `-strong`), `--input-on-
// glass`, `--progress-track-on-glass` — and engages the muted re-point on the calm-light
// content tiers BESIDE the BA adaptive-glass seam (the THIRD state it never expressed:
// (a) bright/darkened plate → full ink, shipped; (b) opaque canvas → page-muted, kept;
// (c) calm translucent glass plate → a register whose target is the composited fill).
// It NEVER edits the frozen BA bound (--glass-tint-ink / --glass-tint-strength-* / the
// @container bright-bucket block / the overlay-band unconditional lift).
//
// THE PAINTED AA TRUTH IS PROVEN BY THE π ARM (tests-visual/on-glass-fg.spec.ts),
// NEVER this source gate alone (the cardinal AZ lesson — a green CPU gate over a still-
// unreadable live render is the close-class lie). This arm proves the recipe STRUCTURE;
// the π arm proves the RENDER clears 4.5:1 over the COMPOSITED plate, both modes.
//
// Four falsifiable SOURCE witnesses, each born-RED at HEAD pre-wave + a self-test bite:
//   W1 — the three rungs exist ONCE (the seam block), no second {muted/well/track}-over-
//        glass fork. RED at HEAD: no rung token exists.
//   W2 — the rungs are DERIVED against the library composite, warm-hue (no gray, no demo
//        hue), and are NOT a verbatim copy of the slides deck.css reference literal. The
//        KEEP fence: --muted-foreground/-strong stay var(--neutral-5)/var(--neutral-6).
//   W3 — the rungs engage on the calm-light content tiers BESIDE the BA seam (the third
//        state), AND the BA bright-bucket + overlay-band blocks are byte-UNTOUCHED.
//   W4 — the consumers read the rungs (Input/Textarea wells; Progress default/gradient
//        track) + CLAUDE.md/MIGRATION.md carry the canon + the consumer-interim note.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
// AY.W-CSS1 — tokens.css/glass.css became thin @import roots over carved partials;
// readMonolith concatenates root + partials in cascade order so the seam scan resolves.
import { readMonolith } from "./read-css-monoliths.mjs";

const COMMAND = "npm run proof:on-glass-fg";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};
// strip CSS/JS comments so a prose mention (a comment naming a token) is not a false hit
const strip = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

// The deck.css REFERENCE literals — the rungs must NOT be a verbatim copy (the library
// re-derives against its own warm-amber --card composite; the deck is NC-State-red-
// accented warm-cream, a CONSUMER divergence — presets-in-consumers).
const DECK_REF_LITERALS = [
    "hsl(24 6% 44%)",
    "hsl(45 12% 64%)",
    "hsl(24 8% 34%)",
    "hsl(45 14% 78%)",
];

// ── The PURE detector (a synthetic-corpus-friendly fact extractor; the self-test
//    bite drives mutated corpora through the SAME detector). ─────────────────────
function detectOnGlassFg({
    tokens, // the tokens monolith (light :root + the .dark arm)
    darkArm, // the dark-arm.css slice (the dark per-mode rungs)
    ladder, // glass/ladder.css (the engagement seam)
    inputCss, // surfaces.css + the Input/Textarea SFCs (the well consumers)
    progressDefault, // ProgressDefault.vue
    progressGradient, // ProgressGradient.vue
    claudeMd,
    migrationMd,
}) {
    const facts = {};

    // W1 — the three rungs exist ONCE in the token home -----------------------------
    const rungNames = [
        "--on-glass-muted",
        "--on-glass-muted-strong",
        "--input-on-glass",
        "--progress-track-on-glass",
    ];
    // A "declaration" is `<name>:` at a value-assignment (not a var() read). Count
    // declarations across BOTH mode arms (light :root + the .dark arm) — each rung is
    // declared once per arm (the plain per-mode pair idiom) OR once via light-dark().
    const declCount = (name, body) =>
        (body.match(new RegExp(`(^|[^-\\w])${name.replace(/[-]/g, "\\-")}\\s*:`, "g")) ?? [])
            .length;
    // Across the WHOLE library: each rung is declared in tokens (light) + dark-arm (dark)
    // — the plain per-mode pair. A 3rd+ declaration anywhere = a fork.
    const wholeTokenBody = tokens; // tokens monolith already concatenates dark-arm.css
    facts.w1 = {
        present: rungNames.every((n) => declCount(n, wholeTokenBody) >= 1),
        // ≤ 2 declarations per rung (light :root + .dark arm) — a 3rd is a 2nd recipe fork.
        noFork: rungNames.every((n) => declCount(n, wholeTokenBody) <= 2),
        perRung: rungNames.map((n) => ({ name: n, count: declCount(n, wholeTokenBody) })),
    };
    facts.w1.ok = facts.w1.present && facts.w1.noFork;

    // W2 — derived, warm-hue, NOT a deck-literal copy; KEEP fence intact -------------
    // Each rung resolves to an hsl() warm-hued ink (NOT a copied deck literal, NOT a
    // demo/ppmycota hue). We assert the warm-hue band on the literal hsl() values.
    const hslVals = [];
    for (const n of rungNames) {
        const re = new RegExp(
            `${n.replace(/[-]/g, "\\-")}\\s*:\\s*(hsl\\([^)]*\\))`,
            "g",
        );
        let m;
        while ((m = re.exec(wholeTokenBody)) !== null) hslVals.push(m[1].trim());
    }
    // warm-hue band: hsl hue 18-48 (the warm-amber --foreground family; NOT a neutral
    // gray hue and NOT a demo violet/red — every literal value must land in the band).
    const warmHue = (hsl) => {
        const m = hsl.match(/hsl\(\s*(\d+(?:\.\d+)?)/);
        if (!m) return false;
        const h = Number(m[1]);
        return h >= 18 && h <= 48;
    };
    facts.w2 = {
        hasHslLiterals: hslVals.length >= 4, // ≥4 mode-arm literals (4 rungs over ≥1 arm)
        allWarm: hslVals.length > 0 && hslVals.every(warmHue),
        noDeckCopy: !hslVals.some((v) =>
            DECK_REF_LITERALS.some((d) => v.replace(/\s+/g, " ") === d),
        ),
        // KEEP fence — the page-muted register is UNTOUCHED.
        keepPageMuted:
            /--muted-foreground:\s*var\(--neutral-5\)/.test(wholeTokenBody) &&
            /--muted-foreground-strong:\s*var\(--neutral-6\)/.test(wholeTokenBody),
        vals: hslVals,
    };
    facts.w2.ok =
        facts.w2.hasHslLiterals &&
        facts.w2.allWarm &&
        facts.w2.noDeckCopy &&
        facts.w2.keepPageMuted;

    // W3 — engage BESIDE the BA seam (the third state), BA blocks byte-untouched ------
    // The calm-light content-tier re-point: a :where(...content tiers...) rule that
    // re-points --muted-foreground → --on-glass-muted (+ the -strong twin). It must
    // target the SAME content-tier set the BA floor uses (card/resting/quiet/wash).
    const calmRepoint =
        /:where\(\s*\.glass-card\s*,\s*\.glass-resting\s*,\s*\.glass-quiet\s*,\s*\.glass-wash\s*\)\s*\{[\s\S]*?--muted-foreground:\s*var\(--on-glass-muted\)[\s\S]*?--muted-foreground-strong:\s*var\(--on-glass-muted-strong\)[\s\S]*?\}/.test(
            ladder,
        );
    // The BA bright-bucket block STILL lifts muted → full ink (byte-untouched). Scope
    // the match to the bright-bucket region ONLY (the slice from the @container opener
    // to the FIRST top-level rule that follows it — an overlay-band :where() or the
    // @supports block) so a bright-bucket edit cannot be masked by the overlay-band's
    // own var(--foreground) lift further down the file.
    // Brace-match the @container block precisely (count {…} depth from the opener) so
    // the region never spills into a sibling rule below.
    const braceBlockFrom = (body, openerRe) => {
        const m = openerRe.exec(body);
        if (!m) return "";
        let i = body.indexOf("{", m.index);
        if (i < 0) return "";
        let depth = 0;
        const start = i;
        for (; i < body.length; i++) {
            if (body[i] === "{") depth++;
            else if (body[i] === "}") {
                depth--;
                if (depth === 0) return body.slice(start, i + 1);
            }
        }
        return body.slice(start);
    };
    const brightBucketRegion = braceBlockFrom(
        ladder,
        /@container\s+style\(\s*--glass-backdrop:\s*light\s*\)/g,
    );
    const brightBucketLiftIntact =
        /--muted-foreground:\s*var\(--foreground\)\s*;/.test(brightBucketRegion);
    // BC.W-DIALOG-GLASS — the overlay band's UNCONDITIONAL :where() rule expresses the
    // on-glass MUTED register (`--on-glass-muted`), the SAME calm-modal register the
    // content tiers read on their calm path (a cream modal over a light page no longer
    // BLACKENS its caption with an unconditional full-ink lift). The full-ink lift moves
    // into the bright-bucket @container block (in LOCKSTEP with --foreground) where the
    // plate ACTUALLY darkens — the overlay band is enrolled there (`.glass-floating,
    // .glass-overlay` listed alongside the content tiers). So W3 asserts BOTH: the
    // overlay band reads --on-glass-muted unconditionally AND the bright-bucket lift
    // covers the overlay band — the reconciled third-state shape, not the retired
    // unconditional :where() full-ink lift.
    const overlayCalmRegister =
        /:where\(\s*\.glass-floating\s*,\s*\.glass-overlay\s*\)\s*\{[\s\S]*?--muted-foreground:\s*var\(--on-glass-muted\)\s*;[\s\S]*?\}/.test(
            ladder,
        );
    const overlayBrightLiftEnrolled =
        /@container\s+style\(\s*--glass-backdrop:\s*light\s*\)\s*\{[\s\S]*?\.glass-floating\s*,[\s\S]*?\.glass-overlay\s*,[\s\S]*?--muted-foreground:\s*var\(--foreground\)\s*;/.test(
            ladder,
        );
    const overlayLiftIntact = overlayCalmRegister && overlayBrightLiftEnrolled;
    // The calm re-point must NOT clobber the bright bucket: it does NOT touch
    // --glass-tint-ink / --glass-tint-strength-aa / --glass-tint-strength-floor (the
    // frozen BA bound — the register READS the seam, never re-declares it).
    const noSeamReDeclare =
        !/:where\(\s*\.glass-card[^{]*\{[^}]*--glass-tint-(?:ink|strength-aa|strength-floor)\s*:/s.test(
            // scope: only the on-glass muted re-point rule region (the calm-tier where rule
            // that ALSO carries --on-glass-muted) must not re-declare the seam tokens.
            (ladder.match(
                /:where\([^{]*\)\s*\{[^}]*--muted-foreground:\s*var\(--on-glass-muted\)[^}]*\}/g,
            ) ?? []
            ).join("\n"),
        );
    facts.w3 = {
        calmRepoint,
        brightBucketLiftIntact,
        overlayLiftIntact,
        noSeamReDeclare,
    };
    facts.w3.ok =
        calmRepoint && brightBucketLiftIntact && overlayLiftIntact && noSeamReDeclare;

    // W4 — the consumers read the rungs + the canon is recorded -----------------------
    // The well: the input rest fill READS --input-on-glass via a var() (the SFC re-points
    // --control-surface-bg onto it, OR reads it directly — one well register, no fork).
    // A `var(--input-on-glass…)` READ (not the bare declaration) is the consumer truth.
    const wellReads = /var\(\s*--input-on-glass/.test(inputCss);
    const trackDefaultReads = /var\(--progress-track,\s*var\(--progress-track-on-glass\)/.test(
        progressDefault,
    );
    const trackGradientReads = /var\(--progress-track,\s*var\(--progress-track-on-glass\)/.test(
        progressGradient,
    );
    const claudeRecorded =
        /on-glass-muted/.test(claudeMd) &&
        /--input-on-glass/.test(claudeMd) &&
        /--progress-track-on-glass/.test(claudeMd);
    const migrationRecorded =
        /on-glass/.test(migrationMd) && /--muted-foreground/.test(migrationMd);
    facts.w4 = {
        wellReads,
        trackDefaultReads,
        trackGradientReads,
        claudeRecorded,
        migrationRecorded,
    };
    facts.w4.ok =
        wellReads &&
        trackDefaultReads &&
        trackGradientReads &&
        claudeRecorded &&
        migrationRecorded;

    return facts;
}

// ── The self-test bite — a re-fork / a deck-copy / a seam-re-declare / a track-revert
//    each RED their clause through the PURE detector. ──────────────────────────────
function selfTest() {
    const goodTokens = `
        :root {
            --muted-foreground: var(--neutral-5);
            --muted-foreground-strong: var(--neutral-6);
            --on-glass-muted: hsl(30 26% 35%);
            --on-glass-muted-strong: hsl(28 28% 28%);
            --input-on-glass: hsl(36 40% 92%);
            --progress-track-on-glass: hsl(34 24% 84%);
        }
        .dark {
            --on-glass-muted: hsl(34 16% 72%);
            --on-glass-muted-strong: hsl(36 14% 78%);
            --input-on-glass: hsl(26 12% 22%);
            --progress-track-on-glass: hsl(28 14% 26%);
        }`;
    const goodLadder = `
        @container style(--glass-backdrop: light) {
            .glass-wash,
            .glass-quiet,
            .glass-resting,
            .glass-floating,
            .glass-overlay,
            .glass-card { --muted-foreground: var(--foreground); }
        }
        :where(.glass-floating, .glass-overlay) {
            --muted-foreground: var(--on-glass-muted);
            --muted-foreground-strong: var(--on-glass-muted-strong);
        }
        :where(.glass-card, .glass-resting, .glass-quiet, .glass-wash) {
            --glass-tint-source: var(--glass-tint-ink);
            --glass-tint-strength: var(--glass-tint-strength-floor);
            --muted-foreground: var(--on-glass-muted);
            --muted-foreground-strong: var(--on-glass-muted-strong);
        }`;
    const goodInput = `background: var(--input-on-glass, var(--control-surface-bg));`;
    const goodPDefault = `bg-[var(--progress-track,var(--progress-track-on-glass))]`;
    const goodPGradient = `bg-[var(--progress-track,var(--progress-track-on-glass))]`;
    const goodClaude =
        "the surface-aware foreground register: --on-glass-muted / --input-on-glass / --progress-track-on-glass";
    const goodMigration =
        "a consumer that hand-re-declared --muted-foreground over glass deletes its override (the on-glass register)";

    const base = {
        tokens: goodTokens,
        darkArm: goodTokens,
        ladder: goodLadder,
        inputCss: goodInput,
        progressDefault: goodPDefault,
        progressGradient: goodPGradient,
        claudeMd: goodClaude,
        migrationMd: goodMigration,
    };

    const bites = [];
    // sanity — the good corpus passes all four.
    {
        const f = detectOnGlassFg(base);
        bites.push({
            name: "good corpus all-green",
            reds: !(f.w1.ok && f.w2.ok && f.w3.ok && f.w4.ok),
            wantReds: false,
        });
    }
    // Bite A — a SECOND well-over-glass fork (a 3rd --input-on-glass declaration) reds W1.
    {
        const forked = base.tokens + "\n.some-fork { --input-on-glass: hsl(36 40% 90%); }";
        const f = detectOnGlassFg({ ...base, tokens: forked, darkArm: forked });
        bites.push({ name: "W1 anti-fork (3rd decl) reds", reds: !f.w1.ok });
    }
    // Bite B — a verbatim deck-literal copy reds W2.
    {
        const copied = base.tokens.replace("hsl(30 26% 35%)", "hsl(24 6% 44%)");
        const f = detectOnGlassFg({ ...base, tokens: copied, darkArm: copied });
        bites.push({ name: "W2 deck-copy reds", reds: !f.w2.ok });
    }
    // Bite C — a demo/gray hue (out of the warm band) reds W2.
    {
        const grayed = base.tokens.replace("hsl(30 26% 35%)", "hsl(220 6% 35%)");
        const f = detectOnGlassFg({ ...base, tokens: grayed, darkArm: grayed });
        bites.push({ name: "W2 non-warm-hue reds", reds: !f.w2.ok });
    }
    // Bite D — dropping the CONTENT-TIER calm re-point reds W3. The overlay band now
    // ALSO reads --on-glass-muted (BC.W-DIALOG-GLASS), so this bite targets the
    // content-tier :where() rule specifically (the one `calmRepoint` checks).
    {
        const noRepoint = base.ladder.replace(
            /:where\(\s*\.glass-card\s*,\s*\.glass-resting\s*,\s*\.glass-quiet\s*,\s*\.glass-wash\s*\)\s*\{[\s\S]*?--muted-foreground:\s*var\(--on-glass-muted\)[\s\S]*?--muted-foreground-strong:\s*var\(--on-glass-muted-strong\);/,
            ":where(.glass-card, .glass-resting, .glass-quiet, .glass-wash) {",
        );
        const f = detectOnGlassFg({ ...base, ladder: noRepoint });
        bites.push({ name: "W3 dropped-repoint reds", reds: !f.w3.ok });
    }
    // Bite E — re-declaring the frozen seam tokens INSIDE the CONTENT-TIER calm re-point
    // reds W3 (the noSeamReDeclare scope is the content-tier :where() rule).
    {
        const clobber = base.ladder.replace(
            ":where(.glass-card, .glass-resting, .glass-quiet, .glass-wash) {\n            --glass-tint-source: var(--glass-tint-ink);",
            ":where(.glass-card, .glass-resting, .glass-quiet, .glass-wash) {\n            --glass-tint-strength-aa: 9%;\n            --glass-tint-source: var(--glass-tint-ink);",
        );
        const f = detectOnGlassFg({ ...base, ladder: clobber });
        bites.push({ name: "W3 seam-re-declare reds", reds: !f.w3.ok });
    }
    // Bite F — editing the BA bright-bucket lift (the byte-untouched fence) reds W3.
    {
        const editedSeam = base.ladder.replace(
            ".glass-card { --muted-foreground: var(--foreground); }",
            ".glass-card { --muted-foreground: var(--on-glass-muted); }",
        );
        const f = detectOnGlassFg({ ...base, ladder: editedSeam });
        bites.push({ name: "W3 bright-bucket-edited reds", reds: !f.w3.ok });
    }
    // Bite G — reverting the track to var(--secondary) reds W4.
    {
        const reverted = "bg-[var(--progress-track,var(--secondary))]";
        const f = detectOnGlassFg({
            ...base,
            progressDefault: reverted,
            progressGradient: reverted,
        });
        bites.push({ name: "W4 track-revert reds", reds: !f.w4.ok });
    }
    return bites;
}

// ── Run against the LIVE tree ───────────────────────────────────────────────────
const tokensMonolith = strip(readMonolith(ROOT, "tokens"));
const darkArm = strip(read("src/styles/tokens/dark-arm.css"));
const ladder = strip(read("src/styles/glass/ladder.css"));
// The well consumers: surfaces.css owns .input-pill's fill; the Input/Textarea SFCs
// may re-point it. Concatenate the well-bearing sources so the re-point resolves
// regardless of whether it lands in the SFC or via a token the SFC carries.
const inputCss = [
    strip(readMonolith(ROOT, "glass")),
    strip(read("src/components/ui/input/Input.vue")),
    strip(read("src/components/ui/textarea/Textarea.vue")),
    tokensMonolith,
].join("\n");
const progressDefault = strip(read("src/components/ui/progress/ProgressDefault.vue"));
const progressGradient = strip(read("src/components/ui/progress/ProgressGradient.vue"));
// CLAUDE.md is MARKDOWN prose (with embedded CSS/JS code examples), NOT a code
// file — `strip()`'s `/* */` regex pairs comment fragments ACROSS the embedded
// examples and blanks whole prose regions (incl. this canon), so the canon read
// is RAW. The false-witness concern strip guards (a token in a real code comment)
// does not apply: the W4 canon is recorded AS prose.
const claudeMd = read("CLAUDE.md");
const migrationMd = strip(read("MIGRATION.md"));

const facts = detectOnGlassFg({
    tokens: tokensMonolith,
    darkArm,
    ladder,
    inputCss,
    progressDefault,
    progressGradient,
    claudeMd,
    migrationMd,
});

// the π readback spec must exist (the BINDING visual truth — never this gate alone)
const piSpecExists = existsSync(resolve(ROOT, "tests-visual/on-glass-fg.spec.ts"));

// self-test bites
const bites = selfTest();
const biteFailures = bites.filter((b) =>
    b.wantReds === false ? b.reds : !b.reds,
);

const checks = [
    { id: "W1 three-rungs-once + no-fork", pass: facts.w1.ok, detail: JSON.stringify(facts.w1.perRung) },
    { id: "W2 derived + warm-hue + no-deck-copy + keep-page-muted", pass: facts.w2.ok, detail: `warm=${facts.w2.allWarm} noDeckCopy=${facts.w2.noDeckCopy} keep=${facts.w2.keepPageMuted} vals=${facts.w2.vals.join("|")}` },
    { id: "W3 calm-tier re-point BESIDE the BA seam (byte-untouched)", pass: facts.w3.ok, detail: `repoint=${facts.w3.calmRepoint} brightIntact=${facts.w3.brightBucketLiftIntact} overlayIntact=${facts.w3.overlayLiftIntact} noSeamReDecl=${facts.w3.noSeamReDeclare}` },
    { id: "W4 consumers read rungs + canon recorded", pass: facts.w4.ok, detail: `well=${facts.w4.wellReads} trackDef=${facts.w4.trackDefaultReads} trackGrad=${facts.w4.trackGradientReads} claude=${facts.w4.claudeRecorded} migration=${facts.w4.migrationRecorded}` },
    { id: "π readback spec exists", pass: piSpecExists, detail: "tests-visual/on-glass-fg.spec.ts (the BINDING AA-over-composited-plate truth)" },
    { id: "self-test bites all RED their clause", pass: biteFailures.length === 0, detail: bites.map((b) => `${b.name}:${b.reds ? "red" : "green"}`).join(", ") },
];

const failed = checks.filter((c) => !c.pass);

console.log("proof:on-glass-fg — the surface-aware foreground register (BB.W-ON-GLASS-FG / N13)");
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_ON_GLASS_FG_OUT", "BB-on-glass-fg");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:on-glass-fg",
    command: COMMAND,
    note: "SOURCE arm only — the painted AA-over-the-composited-plate truth (both modes, real backdrop) is proven by tests-visual/on-glass-fg.spec.ts, never this gate alone.",
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:on-glass-fg] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:on-glass-fg] the surface-aware foreground register locked — the three rungs target the composited glass fill, engaged BESIDE the BA seam (the third state); the π arm proves AA over the composited plate.",
);
