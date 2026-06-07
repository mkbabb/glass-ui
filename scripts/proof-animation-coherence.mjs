#!/usr/bin/env node
// AW.W31.a — the one-motion-source gate (proof:animation-coherence).
//
// The standing guard that the four animated surfaces (dock, aurora, blob, the
// `ui/` press primitives) speak ONE motion language. W1-W3/W4-W11/W25 retuned
// each band in isolation onto the single `scripts/regen-spring-tokens.mjs` →
// `--spring-*` source and the `--scale-press*` press cohort; this gate freezes
// that convergence so a future band cannot re-introduce a hand-rolled
// `cubic-bezier()`/`linear()` spring or a per-atom literal press-scale on an
// animated surface without failing closed.
//
// COMPOSES WITH — does not duplicate — proof:spring-tokens-synced. That gate
// proves the five `--spring-*` tokens in tokens.css are GENERATOR-EQUAL (the
// `linear()` strings match the keyframes.js solver). THIS gate proves there is
// NO FORK OUTSIDE the generator: no second spring/easing authority sits on a
// dock/aurora/blob/primitive animated property.
//
// THREE assertions over the animated-surface file set:
//
//   ONE-SPRING-SOURCE  — the ONLY `--spring-*` DEFINITIONS in the repo live in
//                        the regen-generated §2 EASING block in tokens.css. A
//                        `--spring-*:` definition anywhere else is a second
//                        authority → RED.
//
//   NO-HAND-ROLLED-EASING — no raw `cubic-bezier(` or `linear(`-with-stops spring
//                        literal sits on a transition/animation declaration in
//                        the animated-surface CSS (dock.css, dock-controls.css,
//                        utilities.css, and the aurora/blob SFC `<style>` blocks).
//                        The springs and core eases are TOKEN DEFINITIONS in
//                        tokens.css (the single definition home, exempt); a
//                        surface composes them only via `var(--spring-*)` /
//                        `var(--ease-*)`. The non-physical motion ALLOW-LIST
//                        (shimmer / marquee / sparkle-sweep keyframes that are
//                        intentionally NOT spring-driven) is authored below, not
//                        discovered ad-hoc (the W31 triumvirate §3a clause).
//
//   PRESS-FROM-COHORT  — every canonical press surface (`.tap-squish`, the
//                        button / slider / dock-icon / dock-tab press recipes)
//                        resolves `scale:` from a `--scale-press*` var, never a
//                        literal `0.9x`. ONE press vocabulary — no per-atom
//                        literal scale.
//
// House style mirrors proof-dock-motion-single-source.mjs: ESM .mjs, a CSS
// comment-strip first (false-witness discipline — a commented-out `cubic-bezier`
// or an explanatory token list is never a witness), a pure exported detector, a
// byte-stable JSON artefact via gate-output, a human summary, exit(1) on any
// violation.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

// The animated-surface CSS file set the spec §2/§6 names. Each is scanned for a
// hand-rolled easing literal on a transition/animation property + a press-scale
// literal. tokens.css is the DEFINITION home (the §2 EASING block + the
// `--motion-ease-*` cubic-bezier seeds) — it is scanned ONLY for an out-of-block
// `--spring-*` definition, NOT for the literal-easing clause.
const SURFACE_CSS = [
    "src/styles/dock.css",
    "src/styles/dock-controls.css",
    "src/styles/utilities.css",
];

// The aurora/blob hosts ship no `<style>` transition today, but a future host
// retune is in scope — scan their SFCs too so the gate stands over the band.
const SURFACE_SFC = [
    "src/components/custom/aurora/Aurora.vue",
    "src/components/custom/goo-blob/GooBlob.vue",
];

const TOKENS_CSS = "src/styles/tokens.css";

// Strip CSS comments to blanks (preserve offsets/newlines) so a commented-out
// fork or an explanatory comment ("`--spring-snappy` linear()) is the source…")
// is never a false witness.
export function stripCssComments(src) {
    let out = "";
    let i = 0;
    const n = src.length;
    while (i < n) {
        if (src[i] === "/" && src[i + 1] === "*") {
            const end = src.indexOf("*/", i + 2);
            const stop = end === -1 ? n : end + 2;
            for (let j = i; j < stop; j++) out += src[j] === "\n" ? "\n" : " ";
            i = stop;
        } else {
            out += src[i];
            i++;
        }
    }
    return out;
}

// A 1-based line index for a character offset (for the file:line witness).
function lineOf(src, offset) {
    let line = 1;
    for (let i = 0; i < offset && i < src.length; i++) if (src[i] === "\n") line++;
    return line;
}

// ── Non-physical motion allow-list (W31 triumvirate §3a) ─────────────────────
// These keyframes are INTENTIONALLY not spring-driven — a marquee/shimmer/
// sparkle is a continuous material sweep, not a settling physical morph. The
// `linear()` / `cubic-bezier()` on their CONSUMING rule (or a `linear` timing
// keyword, distinct from the `linear()` spring function) is legitimate. The
// list is authored here, not discovered ad-hoc, so the gate never over-reaches
// onto a legitimate non-physical surface. (None ship on the SURFACE_CSS set
// today — every shimmer/marquee/sparkle consumer lives in animations.css or a
// component SFC, OUTSIDE this scan; the list is the authored escape hatch a
// future surface-CSS shimmer would claim.)
export const NON_PHYSICAL_ALLOW = [
    "shimmer",
    "shimmer-sweep",
    "gold-shimmer-slide",
    "sparkle-sweep",
    "marquee",
    "scroll-marquee",
];

// Detect a raw `cubic-bezier(` or the `linear(`-with-stops spring function on a
// surface CSS. The bare `linear` timing KEYWORD (no paren) is a legitimate
// timing-function token and is NOT flagged — only the `linear(` STOP-LIST form
// (a hand-rolled spring serialization) is a fork.
const EASING_LITERAL_RE =
    /\b(cubic-bezier\s*\(|linear\s*\([^)]*%[^)]*\)|linear\s*\(\s*[\d.]+\s*,)/g;

// A `scale:` longhand or `scale(` function with a sub-1 literal numeric (a
// per-atom press literal). `scale: 1` / `scale: var(--…)` / `scale(var(--…))`
// pass; `scale: 0.96` / `scale(0.9)` fail.
const PRESS_LITERAL_RE = /\bscale\s*:\s*(0?\.\d+)\b|\bscale\s*\(\s*(0?\.\d+)\b/g;

// Any `--spring-NAME:` DEFINITION (the assignment form, not a `var()` read).
const SPRING_DEF_RE = /--spring-[a-z-]+\s*:/g;

// The §2 EASING generated block bounds in tokens.css — the regen marker header
// through the last `--spring-dock:` line. A `--spring-*` definition INSIDE these
// bounds is the canonical generated source; one OUTSIDE is a second authority.
const SPRING_BLOCK_HEADER = "§2  EASING — Spring curves via linear()";

function springBlockBounds(tokensSrc) {
    const headerIdx = tokensSrc.indexOf(SPRING_BLOCK_HEADER);
    if (headerIdx === -1) return null;
    // The block's spring lines run header → the LAST `--spring-` def line + its
    // semicolon. Anchor the end on the last `--spring-` occurrence's line end.
    const lastSpring = tokensSrc.lastIndexOf("--spring-");
    if (lastSpring === -1 || lastSpring < headerIdx) return null;
    const lineEnd = tokensSrc.indexOf("\n", lastSpring);
    return { start: headerIdx, end: lineEnd === -1 ? tokensSrc.length : lineEnd };
}

export function detectSpringSource(tokensSrc) {
    const violations = [];
    // The §2 EASING block header is a COMMENT marker (the regen script anchors
    // on it), so bounds are computed against the RAW source — a comment-strip
    // would blank the header and lose the anchor. The `--spring-*` DEFINITIONS
    // are real CSS declarations, scanned on the raw source too; a `--spring-*`
    // inside a comment cannot exist (a commented-out def is `/* --spring-… */`,
    // which is not an assignment the §2-block bounds would contain anyway).
    const bounds = springBlockBounds(tokensSrc);
    if (bounds === null) {
        violations.push(
            `${TOKENS_CSS}: the §2 EASING generated spring block header is missing — cannot anchor the single spring source`,
        );
        return { violations, springDefCount: 0 };
    }
    let m;
    let count = 0;
    SPRING_DEF_RE.lastIndex = 0;
    while ((m = SPRING_DEF_RE.exec(tokensSrc)) !== null) {
        count++;
        if (m.index < bounds.start || m.index > bounds.end) {
            violations.push(
                `${TOKENS_CSS}:${lineOf(tokensSrc, m.index)}: a --spring-* definition lives OUTSIDE the regen-generated §2 EASING block — a second spring authority`,
            );
        }
    }
    return { violations, springDefCount: count };
}

// A `transition`/`animation` declaration carrying a raw easing literal — the
// comment-stripped surface source. Returns file:line witnesses, exempting the
// non-physical allow-list (a rule whose animation-name is on NON_PHYSICAL_ALLOW).
export function detectEasingForks(file, src) {
    const violations = [];
    const stripped = stripCssComments(src);
    let m;
    EASING_LITERAL_RE.lastIndex = 0;
    while ((m = EASING_LITERAL_RE.exec(stripped)) !== null) {
        // Is this literal on a rule that uses an allow-listed non-physical
        // keyframe? Look back to the nearest `animation`/`animation-name` in the
        // same declaration window (the prior 240 chars) for an allow-listed name.
        const windowStart = Math.max(0, m.index - 240);
        const ctx = stripped.slice(windowStart, m.index + 80);
        const exempt = NON_PHYSICAL_ALLOW.some((name) =>
            new RegExp(`\\banimation[^;]*\\b${name}\\b`).test(ctx),
        );
        if (exempt) continue;
        violations.push(
            `${file}:${lineOf(stripped, m.index)}: a hand-rolled '${m[0].trim()}' easing literal on an animated surface — compose a --spring-*/--ease-* token, not an inline curve`,
        );
    }
    return violations;
}

// A `scale:` press literal on a surface CSS. Returns file:line witnesses.
export function detectPressForks(file, src) {
    const violations = [];
    const stripped = stripCssComments(src);
    let m;
    PRESS_LITERAL_RE.lastIndex = 0;
    while ((m = PRESS_LITERAL_RE.exec(stripped)) !== null) {
        const literal = m[1] ?? m[2];
        violations.push(
            `${file}:${lineOf(stripped, m.index)}: a literal press scale '${literal}' on an animated surface — resolve from the --scale-press* cohort, not a per-atom literal`,
        );
    }
    return violations;
}

export function detectAll(read) {
    const violations = [];
    const facts = {};

    // ONE-SPRING-SOURCE
    const springRes = detectSpringSource(read(TOKENS_CSS));
    facts.springDefCount = springRes.springDefCount;
    violations.push(...springRes.violations);

    // NO-HAND-ROLLED-EASING + PRESS-FROM-COHORT over the surface set.
    const easingForks = [];
    const pressForks = [];
    for (const file of SURFACE_CSS) {
        const src = read(file);
        easingForks.push(...detectEasingForks(file, src));
        pressForks.push(...detectPressForks(file, src));
    }
    for (const file of SURFACE_SFC) {
        const src = read(file, true);
        if (src === null) continue; // an absent SFC is not a violation
        easingForks.push(...detectEasingForks(file, src));
        pressForks.push(...detectPressForks(file, src));
    }
    facts.easingForks = easingForks.length;
    facts.pressForks = pressForks.length;
    violations.push(...easingForks, ...pressForks);

    facts.oneMotionSource = violations.length === 0;
    return { facts, violations };
}

function readFile(rel, optional = false) {
    try {
        return readFileSync(resolve(ROOT, rel), "utf8");
    } catch (err) {
        if (optional) return null;
        throw err;
    }
}

function run() {
    const { facts, violations } = detectAll(readFile);
    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_ANIMATION_COHERENCE_ARTIFACT",
        "AW-animation-coherence",
    );
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:animation-coherence",
        composesWith: "proof:spring-tokens-synced",
        nonPhysicalAllow: NON_PHYSICAL_ALLOW,
        facts,
        violations,
    });
    console.log("proof:animation-coherence — the one-motion-source gate (AW.W31.a)");
    console.log(`  --spring-* definitions     : ${facts.springDefCount}`);
    console.log(`  hand-rolled easing forks   : ${facts.easingForks}`);
    console.log(`  literal press-scale forks  : ${facts.pressForks}`);
    console.log(
        `  one motion source          : ${facts.oneMotionSource ? "YES" : "NO"}`,
    );
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
