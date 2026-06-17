#!/usr/bin/env node
// BB.W-DEAD-SWEEP.1 — proof:no-dead-token.
//
// The library ships ZERO dead CSS tokens. Every `--*` custom property DECLARED
// in the `src/styles` tree must be CONSUMED (a live reader exists in `src/`) OR
// recorded on the KEEP_ALLOWLIST with a non-empty rationale. A declared token
// that is neither is a violation — the dead-byte class the AW→BA accumulation
// (the motion-badge family, the glass aliases, the corner-k exploration leftover)
// went unswept because no gate forbade an unconsumed token. This is that floor.
//
// The comment-strip pure-detector house pattern (the proof-constellation-tokens.mjs
// / proof-liquid-glass-tokens.mjs model): a device-free source gate, no browser.
//
// ── The SIX consumer forms a token can be LIVE by ──────────────────────────────
//   1. `var(--token)` / `var(--token, fallback)` — the CSS reader (whitespace-
//      tolerant: a multi-line `var(\n  --token,` collapses).
//   2. the Tailwind v4 arbitrary-value shorthand `prefix-(--token)` — e.g.
//      `size-(--ui-glyph)`, `h-(--control-h-lg)`, `text-(--tone)`.
//   3. a `@container style(--token …)` STYLE QUERY value — `--glass-backdrop` is
//      LIVE this way (the §0 false-dead trap), never read by `var()`.
//   4. a typed `@property --token { … }` REGISTRATION — an observer-written
//      custom (`--glass-backdrop-luma` is written by `useGlassBackdropLuminance`
//      via `setProperty`, the §0 false-dead trap; its `@property` reg / the JS
//      writer is the consumer, not a `var()`).
//   5. a JS `el.style.setProperty("--token", …)` writer OR a quoted `"--token"`
//      string ref (a `useTokenColor("--token")` resolve, a keyframes target).
//   6. a Tailwind THEME-NAMESPACE membership — a token declared with a Tailwind
//      utility-generating namespace prefix (`--color-*`, `--text-*`, `--radius-*`,
//      `--shadow-*`, `--animate-*`, `--transition-duration-*`, …) is consumed by
//      Tailwind's utility GENERATOR (it emits `bg-primary`/`text-display-1`/
//      `duration-fast` &c.), not by `var()`. A `@theme`-authored token WITHOUT a
//      utility-generating prefix (`--corner-k-soft` inside `@theme`) is NOT
//      namespace-consumed — it needs a real reader, the corner-k dead-knob class.
//
// ── The KEEP_ALLOWLIST (a Map<token, rationale>) ───────────────────────────────
//   A documented presets-in-consumer extension point (the speedtest timeline
//   per-phase gradients), an external-JS-consumer canon (a `getComputedStyle`/
//   `useTokenColor` token the in-library scan can't see), a live-arm alias, or a
//   genuinely-dead token OUT of this arm's NAMED-RETIRE charge booked to a named
//   follow-up (the recorded-conditional discipline, never a silent park). Each
//   entry REQUIRES a non-empty rationale string — a future agent cannot silence
//   the gate by adding a bare token name (the W1 anti-evasion bite, self-tested).
//
// Born-RED at the pre-sweep HEAD: the named dead set (the motion-badge family,
// the glass-alias pair, the dead-spine pair, border-opacity, corner-k-soft/sharp)
// is declared with ZERO consumer and is NOT on the allowlist → W1 reds. GREEN once
// W-DEAD-SWEEP.1 deletes the named set at its declaration sites.
//
// Bite (the self-test, anti-evasion): re-add `--motion-duration-badge-disc: 420ms`
// with no consumer → W1 reds; add a BARE-NAME allowlist entry (empty rationale) →
// the rationale assert reds; a stale dist carrying a dead token → W2 reds.

import {
    existsSync,
    readFileSync,
    readdirSync,
    statSync,
} from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const ARTIFACT = gateArtifactPath(
    "GLASS_UI_NO_DEAD_TOKEN_ARTIFACT",
    "no-dead-token",
);

// ── The named dead set RETIRED (the W-DEAD-SWEEP.1 charge, post-re-ground) ───────
// These 11 are CONFIRMED zero-consumer in ALL forms AND carry NO gate/test
// asserter — DELETED clean-break. They MUST be GONE from source (W1: not declared)
// AND from the built dist (W2: not shipped). Listed here so W2 can assert their
// absence in the producer artefact directly (the W-EMISSION producer-side mirror)
// — and so the self-test can prove a re-added member reds W1.
//
// THE §0 SCOPE-REVEAL (the trap class the wave warned about): the spine pair
// (`--glass-spine-opacity`/`--glass-spine-blur`) and the corner-k pair
// (`--corner-k-soft`/`--corner-k-sharp`) — named in the wave's RETIRE set as
// "ZERO consumer" — were found at HEAD to be PINNED by a LIVE gate/test asserter:
// `InstrumentChassis.spine-variant.test.ts` asserts the 4-token spine publish, and
// `proof:squircle-language` (TOKEN-AXIS-EXISTS) asserts both k-rungs are minted.
// A gate/test asserter is a live consumer in the gate-fleet sense — deleting the
// token reds the asserter (both of which are OUT of this arm's file bounds). Per
// the wave's Triumvirate Dispatch ("do NOT delete a token with a live reader"),
// the 4 are KEPT on the allowlist with the asserter cited; their clean-break delete
// is a coordination follow-up once the asserter waves re-anchor in lockstep.
const NAMED_DEAD_SET = [
    "--motion-duration-badge-disc",
    "--motion-duration-badge-ring",
    "--motion-duration-badge-check",
    "--motion-delay-badge-disc",
    "--motion-delay-badge-ring",
    "--motion-delay-badge-check",
    "--glass-border-strong",
    "--glass-shadow-lg",
    "--border-opacity-light",
    "--border-opacity-medium",
    "--border-opacity-strong",
];

// ── The Tailwind v4 utility-generating theme namespaces ─────────────────────────
// A token declared with one of these prefixes is consumed by Tailwind's utility
// GENERATOR (consumer form 6) — it emits `bg-*`/`text-*`/`rounded-*`/`shadow-*`/
// `duration-*`/`size-*` &c. classes, NOT a `var()`. Membership is consumption.
// (The list is the Tailwind v4 core theme keys glass-ui's `@theme` blocks use; a
// `@theme`-authored token WITHOUT one of these prefixes — e.g. `--corner-k-soft` —
// is a plain `:root` custom emitted by `@theme` and needs a real reader.)
const TAILWIND_NAMESPACES = [
    "--color-",
    "--font-",
    "--font-weight-",
    "--text-", // font-size + text-shadow share the text- key family
    "--text-shadow-",
    "--tracking-",
    "--leading-",
    "--breakpoint-",
    "--container-",
    "--spacing-",
    "--radius-",
    "--shadow-",
    "--inset-shadow-",
    "--drop-shadow-",
    "--blur-",
    "--perspective-",
    "--aspect-",
    "--ease-",
    "--animate-",
    "--transition-duration-", // → the `duration-*` utility family
    "--width-",
    "--height-",
    "--min-width-",
    "--max-width-",
    "--min-height-",
    "--max-height-",
    "--z-index-",
];
const isTailwindNamespace = (t) =>
    TAILWIND_NAMESPACES.some((ns) => t.startsWith(ns));

// ── The KEEP_ALLOWLIST: Map<token, rationale> (rationale REQUIRED) ──────────────
// Two rationale classes, both honest:
//   • EXTENSION-POINT — a documented presets-in-consumer override surface OR an
//     external-JS consumer (`getComputedStyle`/`useTokenColor`) the in-library
//     scan cannot see. Keeping it is correct (deleting would silently strand the
//     consumer — the d6 lesson).
//   • DEFERRED-DEAD — genuinely dead, but OUT of W-DEAD-SWEEP.1's NAMED-RETIRE
//     charge (a different declaration file/region than the four bounded token
//     files, or an obvious orphan the named census did not cover). Booked to a
//     named follow-up sweep (BB.W-DEAD-SWEEP successor / Batch-6 residuals), NOT
//     a silent park — the recorded-conditional discipline.
const KEEP_ALLOWLIST = new Map([
    // ── EXTENSION-POINT (documented presets-in-consumer / external-JS) ──────────
    [
        "--timeline-segment-gradient-ping",
        "EXTENSION-POINT — the speedtest timeline phase-taxonomy override surface (the consumer wires `gradient: \"var(--timeline-segment-gradient-ping)\"` per segment); the in-library fallback is the LIVE --timeline-segment-default-gradient. Retiring it re-breaks the speedtest timeline (the d6 silent-prune lesson).",
    ],
    [
        "--timeline-segment-gradient-download",
        "EXTENSION-POINT — speedtest timeline phase-taxonomy override (download phase); twin of --timeline-segment-gradient-ping.",
    ],
    [
        "--timeline-segment-gradient-upload",
        "EXTENSION-POINT — speedtest timeline phase-taxonomy override (upload phase); twin of --timeline-segment-gradient-ping.",
    ],
    [
        "--timeline-segment-gradient-jitter",
        "EXTENSION-POINT — speedtest timeline phase-taxonomy override (jitter phase); twin of --timeline-segment-gradient-ping.",
    ],
    [
        "--glass-border",
        "EXTENSION-POINT — the bare-name glass-border register alias (= var(--glass-border-quiet)), the default-rung override pointer a consumer re-points to retune the rim library-wide; the per-rung --glass-border-* values carry the live paint.",
    ],
    [
        "--glass-shadow",
        "EXTENSION-POINT — the bare-name glass-shadow register alias (= var(--glass-shadow-quiet)), the default-rung override pointer; the per-rung --glass-shadow-* values carry the live paint.",
    ],
    [
        "--blob-shadow",
        "EXTENSION-POINT — the GooBlob ambient-shadow override surface (= var(--blob-shadow-ambient)); the shadow.css header documents 'a consumer retunes the bead's lighting by overriding --blob-shadow'.",
    ],
    [
        "--meter-track-stroke",
        "EXTENSION-POINT — the speedtest meter phantom-track stroke (= var(--foreground)), resolved at runtime by the consumer's `useTokenColor(\"--meter-track-stroke\")` (rings.ts); an external-JS consumer the in-library scan cannot see.",
    ],
    [
        "--veil-feather-radial",
        "EXTENSION-POINT — the ready-made veil-feather mask-image a consumer opts into by pointing --veil-feather at it (the slides deck text-plate bleed); a documented opt-in override surface.",
    ],
    [
        "--phase-color-label",
        "EXTENSION-POINT — the instrument-chassis WCAG label-color companion, re-declared per phase + read by label/text consumers downstream; the per-phase cascade is the consumer surface (AC.W6c F1.V-04).",
    ],
    [
        "--progress-sectioned-track",
        "EXTENSION-POINT — the sectioned-progress track-color override (= var(--secondary)); the frosted-track register reads --glass-bg-quiet, this is the consumer recolor knob.",
    ],
    [
        "--corner-shape-card",
        "EXTENSION-POINT — the `round`-default member of the --corner-shape-* override family; a consumer dials a surface to a squircle (or back) by re-pointing its --corner-shape-<surface> alias (radius.css documents it); the squircle members ARE consumed.",
    ],
    [
        "--corner-shape-pill",
        "EXTENSION-POINT — the `round`-default member of the --corner-shape-* override family (the pill surface); twin of --corner-shape-card.",
    ],
    [
        "--motion-stagger-tight",
        "EXTENSION-POINT — a stagger-cadence canon consumers read via inline-style calc()/getComputedStyle at runtime (scheme-motion.css documents it); an external-JS consumer surface.",
    ],
    [
        "--motion-stagger-default",
        "EXTENSION-POINT — a stagger-cadence canon read via inline-style calc()/getComputedStyle (the 80ms LCM rung); twin of --motion-stagger-tight.",
    ],
    [
        "--motion-stagger-relaxed",
        "EXTENSION-POINT — a stagger-cadence canon read via inline-style calc()/getComputedStyle (the 120ms wide-cascade rung); twin of --motion-stagger-tight.",
    ],
    [
        "--motion-duration-staged",
        "EXTENSION-POINT — the staged-entrance Vue <Transition> duration canon partnered with --motion-ease-staged-entrance, consumed by the celebratory headline/result-row reveals in the speedtest consumer.",
    ],
    [
        "--motion-duration-complete-shimmer",
        "EXTENSION-POINT — the one-shot gold-headline shimmer duration; shared canon so the speedtest results + thank-you headlines stay in lockstep (an external-consumer reveal).",
    ],
    [
        "--motion-delay-complete-shimmer",
        "EXTENSION-POINT — the gold-headline shimmer staging delay; twin of --motion-duration-complete-shimmer.",
    ],
    [
        "--dock-margin",
        "EXTENSION-POINT — dock geometry a consumer overrides locally (offsets-sizing.css documents 'consumers may override locally').",
    ],
    [
        "--dock-menubar-reserve",
        "EXTENSION-POINT — dock geometry a consumer overrides locally (the menubar reserve); twin of --dock-margin.",
    ],
    [
        "--select-font",
        "EXTENSION-POINT — the Select component font override a consumer overrides locally (offsets-sizing.css documents it).",
    ],
    // ── ASSERTER-PINNED (the §0 scope-reveal — a gate/test asserter is a live ───
    // consumer; deleting reds it; the asserter is out of this arm's bounds, so the
    // clean-break delete is a coordination follow-up once the asserter re-anchors).
    [
        "--glass-spine-opacity",
        "ASSERTER-PINNED — the no-op spine opacity (0) has no runtime var() consumer but IS pinned by `tests/components/custom/instrument-chassis/InstrumentChassis.spine-variant.test.ts` (it asserts the 4-token spine publish incl. --glass-spine-opacity:0). Deleting reds the unit (out of this arm's bounds); the clean-break delete is a coordination follow-up once the test re-anchors.",
    ],
    [
        "--glass-spine-blur",
        "ASSERTER-PINNED — the no-op spine blur (0px) twin; pinned by the same InstrumentChassis.spine-variant.test.ts 4-token-publish assert. Coordination follow-up to delete.",
    ],
    [
        "--corner-k-soft",
        "ASSERTER-PINNED — the soft k-rung (1.7) has no runtime consumer (every --corner-shape-* rides --corner-k-squircle) but IS pinned by `proof:squircle-language` (the TOKEN-AXIS-EXISTS clause asserts --corner-k-soft is minted). Deleting reds the gate (out of this arm's bounds); coordination follow-up to delete.",
    ],
    [
        "--corner-k-sharp",
        "ASSERTER-PINNED — the sharp k-rung (2.4) twin; pinned by the same proof:squircle-language TOKEN-AXIS-EXISTS assert. Coordination follow-up to delete.",
    ],
    // ── DEFERRED-DEAD (genuinely dead; OUT of this arm's NAMED-RETIRE charge) ────
    // These have NO consumer + NO documented override comment. They are NOT in the
    // four-file NAMED dead set this arm deletes (they live in scale-paper.css /
    // offsets-sizing.css non-border regions / a redundant alias), so they are
    // BOOKED to a named follow-up sweep rather than swept here (the bounded-file
    // discipline + the no-bulk-delete rule). Recorded conditional, not a silent park.
    [
        "--focus-ring",
        "DEFERRED-DEAD — a redundant alias of the LIVE --focus-ring-shadow (15 var() consumers); the .focus-ring utility reads --focus-ring-shadow directly. Genuinely dead, booked to a follow-up alias-cull (out of this arm's named-retire set).",
    ],
    [
        "--spring-gentle-duration",
        "DEFERRED-DEAD — the gentle spring's settle clock with no consumer at HEAD; the other --spring-*-duration rungs are consumed. Booked to a follow-up sweep (out of the named-retire set).",
    ],
    [
        "--z-debug",
        "DEFERRED-DEAD — a debug z-index ceiling with no consumer. Booked to a follow-up sweep (out of the named-retire set).",
    ],
    [
        "--chassis-max-block-size",
        "DEFERRED-DEAD — an instrument-chassis bound with no consumer at HEAD. Booked to a follow-up sweep (out of the named-retire set).",
    ],
    [
        "--panel-padding-roomy",
        "DEFERRED-DEAD — a panel-padding rung with no consumer at HEAD. Booked to a follow-up sweep (out of the named-retire set).",
    ],
    [
        "--celebration-row-rhythm",
        "DEFERRED-DEAD — a celebration result-row rhythm with no consumer at HEAD. Booked to a follow-up sweep (out of the named-retire set).",
    ],
    [
        "--complete-headline-size",
        "DEFERRED-DEAD — a completion-headline clamp with no consumer at HEAD. Booked to a follow-up sweep (out of the named-retire set).",
    ],
    [
        "--progress-stack-gap",
        "DEFERRED-DEAD — a progress-stack gap with no consumer at HEAD. Booked to a follow-up sweep (out of the named-retire set).",
    ],
    [
        "--timeline-scrubber-height",
        "DEFERRED-DEAD — a single-track scrubber height with no consumer at HEAD. Booked to a follow-up sweep (out of the named-retire set).",
    ],
    [
        "--meter-progress-inset",
        "DEFERRED-DEAD — a meter progress inset with no consumer at HEAD. Booked to a follow-up sweep (out of the named-retire set).",
    ],
]);

// ── helpers ─────────────────────────────────────────────────────────────────────

/** Strip CSS block comments so a clause cannot be satisfied/tripped by a comment. */
function stripCssComments(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "");
}
/** Strip JS/TS comments (block + line; the `(^|[^:])//` URL-safe line strip). */
function stripJsComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

/** Recursive file walk (the gate's own — no dep on a repo helper). */
function walk(dir, exts, out = []) {
    if (!existsSync(dir)) return out;
    for (const entry of readdirSync(dir)) {
        const p = join(dir, entry);
        const st = statSync(p);
        if (st.isDirectory()) walk(p, exts, out);
        else if (exts.some((x) => p.endsWith(x))) out.push(p);
    }
    return out;
}

/**
 * Enumerate every `--token` DECLARED in the `src/styles` tree (a declaration is a
 * statement-start `--x:`, after `{`/`;`/line-start — not a `var(--x)` read or a
 * substring of a longer token). Comment-stripped.
 */
function enumerateDeclaredTokens(stylesDir) {
    const declared = new Set();
    for (const f of walk(stylesDir, [".css"])) {
        const css = stripCssComments(readFileSync(f, "utf8"));
        const re = /(?:^|[{;])\s*(--[a-zA-Z0-9-]+)\s*:/gm;
        let m;
        while ((m = re.exec(css))) declared.add(m[1]);
    }
    return declared;
}

/**
 * Build the set of tokens with a live READER across `src/` — the five non-namespace
 * consumer forms (form 6, the Tailwind namespace, is membership-checked separately).
 */
function buildReaderSet(srcDir) {
    let blob = "";
    for (const f of walk(srcDir, [".css", ".ts", ".vue", ".tsx"])) {
        const raw = readFileSync(f, "utf8");
        blob += "\n" + (f.endsWith(".css") ? stripCssComments(raw) : stripJsComments(raw));
    }
    const readers = new Set();
    const forms = [
        /var\(\s*(--[a-zA-Z0-9-]+)/g, // 1. var(--x) (whitespace-tolerant)
        /-\(\s*(--[a-zA-Z0-9-]+)\s*[),]/g, // 2. Tailwind shorthand prefix-(--x)
        /style\(\s*(--[a-zA-Z0-9-]+)/g, // 3. @container style(--x …)
        /@property\s+(--[a-zA-Z0-9-]+)/g, // 4. @property --x { … }
        /setProperty\(\s*["'`](--[a-zA-Z0-9-]+)/g, // 5a. JS setProperty writer
        /["'`](--[a-zA-Z0-9-]+)["'`]/g, // 5b. quoted JS string ref
    ];
    for (const re of forms) {
        let m;
        while ((m = re.exec(blob))) readers.add(m[1]);
    }
    return readers;
}

// ── the scan ────────────────────────────────────────────────────────────────────
const STYLES_DIR = resolve(ROOT, "src/styles");
const SRC_DIR = resolve(ROOT, "src");

const declared = enumerateDeclaredTokens(STYLES_DIR);
const readers = buildReaderSet(SRC_DIR);

/** A token is LIVE iff it has a reader OR is a Tailwind namespace member. */
function isConsumed(token) {
    return readers.has(token) || isTailwindNamespace(token);
}

const deadTokens = [];
for (const token of declared) {
    if (isConsumed(token)) continue;
    if (KEEP_ALLOWLIST.has(token)) continue;
    deadTokens.push(token);
}
deadTokens.sort();

// ── W2: the producer-side dist mirror (the W-EMISSION bar) ──────────────────────
// The shipped `/styles` surface is the dist partial tree (dist/styles/**) PLUS the
// folded SFC bundle dist/glass-ui.css. The named dead set must be ABSENT from it.
// Producer-gated: `skipped` when dist absent (the source W1 carries the close).
function readShippedDist() {
    const parts = [];
    const sfc = resolve(ROOT, "dist/glass-ui.css");
    if (existsSync(sfc)) parts.push(readFileSync(sfc, "utf8"));
    const stylesDist = resolve(ROOT, "dist/styles");
    if (existsSync(stylesDist)) {
        for (const f of walk(stylesDist, [".css"]))
            parts.push(readFileSync(f, "utf8"));
    }
    return parts.join("\n");
}
const distCss = readShippedDist();
const distPresent =
    existsSync(resolve(ROOT, "dist/glass-ui.css")) &&
    existsSync(resolve(ROOT, "dist/styles"));
let distDeadTokensShipped = false;
const distDeadHits = [];
if (distPresent) {
    const distStripped = stripCssComments(distCss);
    for (const t of NAMED_DEAD_SET) {
        // a DECLARATION of the dead token in the shipped dist (not a comment/substr)
        const declRe = new RegExp(`(?:^|[{;])\\s*${t}\\s*:`, "m");
        if (declRe.test(distStripped)) distDeadHits.push(t);
    }
    distDeadTokensShipped = distDeadHits.length > 0;
}

// ── the allowlist rationale bite (W1 anti-evasion) ──────────────────────────────
// Every KEEP_ALLOWLIST entry must carry a NON-EMPTY rationale string — a bare-name
// entry (an empty/whitespace rationale) cannot silence the gate.
const bareAllowlistEntries = [];
for (const [token, rationale] of KEEP_ALLOWLIST) {
    if (typeof rationale !== "string" || rationale.trim().length === 0)
        bareAllowlistEntries.push(token);
}

const violations = [];
const facts = {
    declaredCount: declared.size,
    readerCount: readers.size,
    deadTokens,
    deadTokenCount: deadTokens.length,
    keepAllowlistCount: KEEP_ALLOWLIST.size,
    bareAllowlistEntries,
    namedDeadSetCount: NAMED_DEAD_SET.length,
    // every named-dead token must be GONE from source (W1) — declared === absent
    namedDeadStillDeclared: NAMED_DEAD_SET.filter((t) => declared.has(t)),
    distPresent,
    distDeadTokensShipped,
    distDeadHits,
};

// W1 — no dead token in source.
if (deadTokens.length !== 0)
    violations.push(
        `W1 dead tokens (declared, no consumer, not allowlisted): ${deadTokens.join(", ")}`,
    );
// W1 bite — every allowlist entry carries a rationale.
if (bareAllowlistEntries.length !== 0)
    violations.push(
        `W1 bite — bare-name allowlist entries (empty rationale): ${bareAllowlistEntries.join(", ")}`,
    );
// W1 — the named dead set is GONE from source.
if (facts.namedDeadStillDeclared.length !== 0)
    violations.push(
        `W1 named dead set still declared in source: ${facts.namedDeadStillDeclared.join(", ")}`,
    );
// W2 — the named dead set is GONE from dist (producer-gated).
if (distPresent && distDeadTokensShipped)
    violations.push(
        `W2 named dead set still shipped in dist: ${distDeadHits.join(", ")}`,
    );

const status = violations.length === 0 ? "pass" : "fail";
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status,
    gate: "proof:no-dead-token",
    facts,
    violations,
});

console.log("proof:no-dead-token — the dead-CSS-token floor (BB.W-DEAD-SWEEP)");
console.log(`  declared tokens      : ${facts.declaredCount}`);
console.log(`  live readers         : ${facts.readerCount}`);
console.log(`  keep-allowlist       : ${facts.keepAllowlistCount}`);
console.log(`  dead tokens          : ${facts.deadTokenCount} (must be 0)`);
console.log(
    `  named dead in source : ${facts.namedDeadStillDeclared.length} (must be 0)`,
);
console.log(
    `  dist mirror          : ${distPresent ? (distDeadTokensShipped ? `SHIPS ${distDeadHits.length} dead` : "clean") : "skipped (dist absent)"}`,
);
if (violations.length) {
    console.log("\nVIOLATIONS:");
    for (const v of violations) console.log(`  ✗ ${v}`);
}
console.log(
    `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
);

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    process.exit(status === "pass" ? 0 : 1);
}
