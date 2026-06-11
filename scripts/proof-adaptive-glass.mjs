// proof:adaptive-glass — AX.W55: the adaptive glass legibility gate (G2).
//
// The device-free SOURCE arm: a source-parse + token-resolution gate that asserts
// the adaptive-tint plumbing the iOS-26/27 "locally darken the glass over light
// content" move rides — the `--glass-backdrop` probe + the bright-bucket tint lift
// toward warm-ink on EVERY glass family INCLUDING the dock (the literal G2 surface,
// off the seam at HEAD) + the `contrast-color()` foreground flip + the a11y-bracket
// tint reconcile — WITHOUT disturbing the zero-delta rest defaults or the deliberate
// in-srgb `--surface-tint-*` house axis.
//
// THE PAINTED 4.5:1 TRUTH IS PROVEN BY THE π ARM (tests-visual/adaptive-glass.spec.ts),
// NEVER this source gate alone (the cardinal AX lesson: a green CPU gate over a still-
// unreadable live render is exactly the G2 gap the user reported live). This arm
// proves the recipe STRUCTURE; the π arm proves the RENDER clears 4.5:1 over white.
//
// Born-RED at HEAD `6569b7a` on six witnesses (no --glass-backdrop probe; the dock
// off the seam; the --dock-fg-on-aurora push twin; the per-rung a11y clobber; the
// lightener-only blend; the absent gate). The asserts below invert each.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
// AY.W-CSS1 — tokens.css/glass.css became thin @import roots over carved
// partials; readMonolith concatenates root + partials in cascade order so the
// adaptive-tint seam scan resolves post-carve (read-dock-css.mjs precedent).
import { readMonolith } from "./read-css-monoliths.mjs";

const COMMAND = "npm run proof:adaptive-glass";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};
// strip CSS comments so a prose mention (a comment naming a token) is not a false hit
const strip = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

const tokens = strip(readMonolith(ROOT, "tokens"));
const glass = strip(readMonolith(ROOT, "glass"));
// The dock shell was carved into src/styles/dock/*.css partials (+ dock-controls.css)
// at the convergence; the adaptive-glass tint seam lives in dock/shell.css + dock/morph.css.
// Read the whole carved dock family so the seam checks resolve post-carve.
// AZ.W-CARVE — dock-controls.css drained into dock-controls/*.css partials;
// readMonolith concatenates the thin root + the five family partials in cascade
// order so the seam checks resolve post-carve.
const dock = [
    "src/styles/dock.css",
    "src/styles/dock/shell.css",
    "src/styles/dock/morph.css",
    "src/styles/dock/density.css",
    "src/styles/dock/layer-group.css",
    "src/styles/dock/layers.css",
    "src/styles/dock/overflow.css",
]
    .map((p) => strip(read(p)))
    .concat(strip(readMonolith(ROOT, "dock-controls")))
    .join("\n");

const checks = []; // {id, pass, detail}
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

// ── 1. The backdrop probe exists (witness 1 head) ──────────────────────────────
add(
    "backdrop-probe-minted",
    /--glass-backdrop:\s*dark\b/.test(tokens) && /--glass-backdrop-luma:/.test(tokens),
    "--glass-backdrop: dark (zero-delta default) + --glass-backdrop-luma minted in tokens.css",
);
add(
    "warm-ink-token-minted",
    /--glass-tint-ink:\s*var\(--foreground\)/.test(tokens),
    "--glass-tint-ink: var(--foreground) — the low-luminance warm-ink the bright bucket re-points to",
);
add(
    "aa-floor-token-minted",
    /--glass-tint-strength-aa:\s*\d+(\.\d+)?%/.test(tokens),
    "--glass-tint-strength-aa minted — the bounded AA-clearing strength ceiling",
);
// The AA floor is BOUNDED: > 0% (it must darken) and ≤ 24% (translucent floor — "let
// content through"; AA cleared by going opaque is a goal-MISS, not the glass identity).
const aaMatch = tokens.match(/--glass-tint-strength-aa:\s*(\d+(?:\.\d+)?)%/);
const aaVal = aaMatch ? Number(aaMatch[1]) : NaN;
add(
    "aa-floor-bounded",
    aaVal > 0 && aaVal <= 24,
    `--glass-tint-strength-aa = ${Number.isNaN(aaVal) ? "?" : aaVal}% (bounded: > 0%, ≤ 24% — the translucency floor)`,
);

// ── 2. The bright bucket lifts the tint toward ink — ON ALL glass families ──────
// glass.css: ONE @container style(--glass-backdrop: light) block re-points the tint
// tokens on the material group (the rungs' background composite re-resolves toward ink).
const glassBucket = glass.match(
    /@container\s+style\(\s*--glass-backdrop:\s*light\s*\)\s*\{[\s\S]*?--glass-tint-source:\s*var\(--glass-tint-ink\)[\s\S]*?--glass-tint-strength:\s*var\(--glass-tint-strength-aa\)/,
);
add(
    "rungs-bright-bucket-lift",
    Boolean(glassBucket),
    "glass.css @container style(--glass-backdrop: light) re-points --glass-tint-source → ink + --glass-tint-strength → AA floor",
);
// The bucket block reaches every rung family (the comma group names them all).
const glassBucketBlock = glass.match(
    /@container\s+style\(\s*--glass-backdrop:\s*light\s*\)\s*\{([\s\S]*?)\}\s*\}/,
);
const glassBucketSel = glassBucketBlock ? glassBucketBlock[1] : "";
const rungsCovered = [
    ".glass-material",
    ".glass-wash",
    ".glass-quiet",
    ".glass-resting",
    ".glass-floating",
    ".glass-overlay",
    ".glass-card",
].every((sel) => glassBucketSel.includes(sel));
add(
    "rungs-bucket-covers-all-families",
    rungsCovered,
    "the bright-bucket block names all five rungs + .glass-material + .glass-card",
);
// AZ.W-ADAPTIVE-AUTO Arm 1 — the content tiers UNCONDITIONALLY self-engage (no
// ancestor bucket). The `:where(.glass-floating, .glass-overlay, .glass-card,
// .glass-resting, .glass-quiet, .glass-wash)` rule re-points the tint tokens DIRECTLY
// on the surfaces, closing the C5-7 content-tier asymmetry (they painted near-
// invisible over light). The over-light-common content tiers are NAMED in the rule.
const ladderSelfEngage = glass.match(
    /:where\(\s*\.glass-floating,\s*\.glass-overlay,\s*\.glass-card,\s*\.glass-resting,\s*\.glass-quiet,\s*\.glass-wash\s*\)\s*\{([\s\S]*?--glass-tint-source:\s*var\(--glass-tint-ink\)[\s\S]*?--glass-tint-strength:\s*var\(--glass-tint-strength-aa\)[\s\S]*?)\}/,
);
add(
    "content-tiers-self-engage",
    Boolean(ladderSelfEngage),
    ":where(.glass-card, .glass-resting, .glass-quiet, .glass-wash, …) self-engages the bright-bucket darken unconditionally (the C5-7 content-tier asymmetry fix)",
);
// The muted body register lifts to the full warm-ink on the self-engaged surfaces
// (the muted L40 tier cannot clear 4.5:1 on a translucent darkened plate).
add(
    "content-tiers-muted-lift",
    ladderSelfEngage
        ? /--muted-foreground:\s*var\(--foreground\)/.test(ladderSelfEngage[1])
        : false,
    "the content-tier self-engage lifts --muted-foreground → --foreground (the muted register cannot clear 4.5:1 on a translucent darkened plate)",
);

// ── 3. The dock is ON the seam (witness 2 — the literal G2 surface) ─────────────
// The dock shell rides --glass-bg-dock which carries the oklab tint at tokens.css
// (W54 amendment); the chassis-strip + held/open tiers thread the oklab wrapper here.
add(
    "dock-bg-token-on-oklab-seam",
    /--glass-bg-dock:[^;]*color-mix\(in oklab[^;]*--glass-tint-source[^;]*--glass-tint-strength/.test(
        tokens,
    ),
    "--glass-bg-dock rides color-mix(in oklab, …, --glass-tint-source --glass-tint-strength)",
);
const dockFlat = dock.replace(/\s+/g, " ");
// AZ.W-DOCK-TAXONOMY — the `instrument-strip` chassis-strip surface RETIRED (the
// ≥2-consumer bar; no live consumer). The VERTICAL dock surface (the prior
// `.variant-rail` plate, now `.glass-dock.vertical`) threads the SAME element-level
// oklab tint wrapper so the self-engage darken reaches its plate. The bg token
// carries a nested var() fallback (`var(--glass-bg-dock, var(--glass-bg-wash))`),
// so the source-arg match allows the nested parens up to the tint tail.
add(
    "dock-vertical-on-oklab-seam",
    /\.glass-dock\.vertical\s*\{[^}]*color-mix\(\s*in oklab,\s*var\(--glass-bg-dock[^;]*?,\s*var\(--glass-tint-source\)\s*var\(--glass-tint-strength\)/.test(
        dockFlat,
    ),
    "the vertical dock plate threads color-mix(in oklab, var(--glass-bg-dock), --glass-tint-source --glass-tint-strength)",
);
// The held + open floating tiers thread the wrapper too (two oklab wraps over --glass-bg-floating).
const dockFloatingWraps = (
    dockFlat.match(
        /color-mix\(\s*in oklab,\s*var\(--glass-bg-floating[^;]*?,\s*var\(--glass-tint-source\)\s*var\(--glass-tint-strength\)/g,
    ) ?? []
).length;
add(
    "dock-floating-tiers-on-oklab-seam",
    dockFloatingWraps >= 2,
    `the [data-held] + :has([open]) floating tiers thread the oklab wrapper (${dockFloatingWraps} found, need ≥2)`,
);
// The dock carries its own @container bright-bucket block re-pointing the tint tokens.
add(
    "dock-bright-bucket-block",
    /@container\s+style\(\s*--glass-backdrop:\s*light\s*\)\s*\{[\s\S]*?\.glass-dock\s*\{[\s\S]*?--glass-tint-source:\s*var\(--glass-tint-ink\)[\s\S]*?--glass-tint-strength:\s*var\(--glass-tint-strength-aa\)/.test(
        dock,
    ),
    "dock.css @container style(--glass-backdrop: light) .glass-dock re-points the tint toward ink",
);
// AZ.W-ADAPTIVE-AUTO Arm 1 — the dock UNCONDITIONAL self-engage rule (the C5-2/C5-3
// no-op fix: the @container block above queries an ancestor and NEVER self-matches;
// the `:where(.glass-dock)` rule is the genuine self-darken, mirroring ladder.css).
add(
    "dock-self-engage-rule",
    /:where\(\.glass-dock\)\s*\{[\s\S]*?--glass-tint-source:\s*var\(--glass-tint-ink\)[\s\S]*?--glass-tint-strength:\s*var\(--glass-tint-strength-aa\)[\s\S]*?--dock-fg-on-aurora:\s*var\(--glass-tint-ink\)/.test(
        dock,
    ),
    ":where(.glass-dock) unconditionally self-engages the bright-bucket darken (the C5-2 self-engage no-op fix)",
);
// The morph-root interp STAYS in srgb (resting-endpoint-only ratified default — the
// adaptive darken rides --glass-bg-dock at the rest endpoint, the morph interp untouched).
add(
    "morph-interp-stays-srgb",
    /\.glass-dock:not\(\.vertical\)\s*\{\s*background:\s*color-mix\(\s*in srgb/.test(
        dock,
    ),
    "the morph-root interp stays color-mix(in srgb …) (resting-endpoint-only — the morph frames untouched)",
);

// ── 4. The foreground flip + the a11y reconcile (witnesses 3, 4) ───────────────
add(
    "contrast-color-flip-glass",
    /@supports\s*\(\s*color:\s*contrast-color\([^)]*\)\s*\)\s*\{[\s\S]*?@container\s+style\(\s*--glass-backdrop:\s*light\s*\)[\s\S]*?color:\s*contrast-color/.test(
        glass,
    ),
    "glass.css @supports (color: contrast-color(…)) foreground-ink flip exists, scoped to the bright bucket",
);
add(
    "dock-fg-reconciled-into-probe",
    /@container\s+style\(\s*--glass-backdrop:\s*light\s*\)\s*\{[\s\S]*?--dock-fg-on-aurora:\s*var\(--glass-tint-ink\)/.test(
        dock,
    ),
    "--dock-fg-on-aurora re-points to the warm-ink under the bright bucket (folded INTO the probe, not a 3rd fork)",
);
add(
    "dock-fg-contrast-color-flip",
    /@supports\s*\(\s*color:\s*contrast-color\([^)]*\)\s*\)\s*\{[\s\S]*?--dock-fg-on-aurora:\s*contrast-color/.test(
        dock,
    ),
    "dock.css @supports contrast-color() flips --dock-fg-on-aurora on supporting engines",
);
// The a11y brackets ride W54's --glass-level (NOT a per-rung --glass-opacity-* clobber)
// AND coordinate the tint axis toward ink under prefers-contrast: more (W55 fold 5).
add(
    "a11y-reduce-rides-level",
    /prefers-reduced-transparency:\s*reduce\)\s*\{[^}]*--glass-level:\s*0/s.test(glass),
    "prefers-reduced-transparency: reduce → :root{ --glass-level: 0 } (rides the ONE scalar)",
);
add(
    "a11y-contrast-rides-level-and-tint",
    /prefers-contrast:\s*more\)\s*\{[^}]*--glass-level:\s*0?\.\d[^}]*--glass-tint-source:\s*var\(--glass-tint-ink\)[^}]*--glass-tint-strength:\s*var\(--glass-tint-strength-aa\)/s.test(
        glass,
    ),
    "prefers-contrast: more rides --glass-level (opacity) AND biases the tint toward ink (the coordinated Clear↔Tinted escape)",
);
// No per-rung --glass-opacity-* clobber survives in the a11y brackets (the collapse held).
add(
    "no-per-rung-opacity-clobber",
    !/prefers-(?:reduced-transparency|contrast)[^{]*\{[^}]*--glass-opacity-(?:wash|quiet|resting|floating|overlay)/s.test(
        glass,
    ),
    "neither a11y bracket re-declares a per-rung --glass-opacity-* (the W54+W55 collapse onto one scalar held)",
);

// ── 5. The seam-discipline guards (regression-locks) ───────────────────────────
// The :root tint DEFAULTS are UNCHANGED — the zero-delta rest state (the bucket
// blocks override them, the :root defaults stay var(--card)/0%).
add(
    "tint-defaults-unchanged",
    /--glass-tint-source:\s*var\(--card\)\s*;/.test(tokens) &&
        /--glass-tint-strength:\s*0%\s*;/.test(tokens),
    ":root --glass-tint-source: var(--card) + --glass-tint-strength: 0% UNCHANGED (the zero-delta rest)",
);
// The in-srgb --surface-tint-* family is UNTOUCHED (the deliberate house axis — the
// oklab tint is the ONLY axis W55 edits; a --surface-tint-* in oklab is the breach).
const surfaceTintInOklab =
    /--surface-tint-[a-z-]+:[^;]*color-mix\(\s*in oklab/.test(tokens);
add(
    "surface-tint-family-stays-srgb",
    !surfaceTintInOklab,
    "the --surface-tint-* family is UNTOUCHED in-srgb (the deliberate house axis — never edited to oklab)",
);
// The W52 plus-lighter specular blend is INTACT (W55 composes on it, never edits it).
add(
    "w52-plus-lighter-intact",
    /mix-blend-mode:\s*plus-lighter/.test(glass),
    "the W52 plus-lighter specular blend is INTACT (W55 composes on it, the darkening is the orthogonal oklab axis)",
);

// ── 5b. The A5-1 modal-scrim double-wrap bite (readability-sweep token discipline) ──
// `dialog.glass-top-layer::backdrop` (+ its [open] + @starting-style arms) must read
// the house `color-mix(in srgb, var(--background) …)` alpha-derivative, NOT the invalid
// `hsl(var(--background) / α)` double-wrap (`--background` is a complete hsl() color, so
// the double-wrap evaluates to nothing — the modal dim silently does not paint). The bite
// is EVASION-RESISTANT: a revert to the hsl() channel form re-introduces the banned
// substring and REDs.
const animations = strip(read("src/styles/animations.css"));
// Isolate the dialog.glass-top-layer::backdrop region (the scrim arms).
const scrimRegion =
    animations.match(
        /dialog\.glass-top-layer::backdrop[\s\S]*?dialog\.glass-top-layer\[open\]::backdrop[\s\S]*?@starting-style[\s\S]*?\}\s*\}/,
    )?.[0] ?? "";
add(
    "modal-scrim-no-double-wrap",
    scrimRegion.length > 0 && !/hsl\(\s*var\(--background\)/.test(scrimRegion),
    "dialog.glass-top-layer::backdrop carries NO hsl(var(--background) / α) double-wrap (the invalid pattern that never painted)",
);
// The three arms (rest 0%, [open] dim, @starting-style 0%) read color-mix(in srgb).
const scrimColorMixCount = (
    scrimRegion.match(/color-mix\(\s*in srgb,\s*var\(--background\)/g) ?? []
).length;
add(
    "modal-scrim-color-mix-arms",
    scrimColorMixCount >= 3,
    `the three ::backdrop arms read color-mix(in srgb, var(--background) …) (${scrimColorMixCount} found, need ≥3 — the dim PAINTS)`,
);

// ── 6. The π readback spec is wired (witness 6) ────────────────────────────────
add(
    "pi-readback-spec-exists",
    existsSync(resolve(ROOT, "tests-visual/adaptive-glass.spec.ts")),
    "tests-visual/adaptive-glass.spec.ts exists (the π 4.5:1-over-white contrast readback — the BINDING close)",
);

// ── Report ──────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);

console.log("proof:adaptive-glass — the adaptive glass legibility gate (AX.W55 G2)");
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_ADAPTIVE_GLASS_OUT", "AX-adaptive-glass");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:adaptive-glass",
    command: COMMAND,
    note: "SOURCE arm only — the painted 4.5:1-over-white truth is proven by tests-visual/adaptive-glass.spec.ts (the W00 π arm), never this gate alone.",
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:adaptive-glass] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:adaptive-glass] adaptive darken locked — the bucket lifts the oklab tint toward ink on every glass family INCLUDING the dock; the π arm proves 4.5:1 over white.",
);
