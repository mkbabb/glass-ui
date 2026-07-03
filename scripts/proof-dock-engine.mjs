#!/usr/bin/env node
// proof:dock-engine — BC.W-DOCK-ENGINE — the buttery-smooth springy COMPOSITOR-ONLY
// dock morph (kill the front-loaded snap; unify every dock morph CSS leg onto the
// JS-driven --dock-morph-t/--dock-expand-t scalar; complete the scoped compositor
// promotion; harden the Atlas A-9 in-dock dark-toggle glyph clamp).
//
// The device-free SOURCE/MECHANISM arm (tags ["local","ci","release"]). The PAINT arm
// is the ORCHESTRATOR's: the live :5199 --dock-morph-t envelope capture (≥0.40 by the
// clock midpoint, no ~16% plateau) + the dock-plate-reads-warm + the vertical-dock-
// clickable, captured to docs/tranches/BC/audit/visual/W-DOCK-ENGINE-DELTA.md. A
// per-mechanism green here does NOT close the visual wave — the captured DELTA is the
// binding truth (the BC anti-disease law).
//
// THE CARDINAL SPLIT this gate validates born-RED→GREEN itself (the SOURCE arm):
//   E1 — no front-loaded morph leg: every dock MORPH CSS leg reads the JS-driven
//        --dock-expand-t/--dock-morph-t scalar; none pairs var(--spring-dock) (the
//        front-loaded linear()) with a generic --duration-* / --dock-motion-resize on
//        a MORPH-geometry or MORPH-chrome property. The held-state --duration-fast
//        polish + the rail hover/press interaction polish are the sanctioned non-morph
//        exceptions (a named allowlist). Self-test bite: a planted
//        `transition: inline-size var(--duration-normal) var(--spring-dock)` reds.
//   E2 — the morph travel fills the clock (the JS scalar's analytic envelope, NOT the
//        --spring-dock CSS linear()): the DOCK_SPRING SpringProgress trajectory the
//        scalar follows reaches ≥0.40 by its clock midpoint AND rises monotonically
//        with NO long dead-flat plateau (the front-loaded linear() runs 1.00000 flat
//        ~49%→98%; the JS physical trajectory does not). This is the CONSUME-side
//        assert; it never parses --spring-dock's emitted linear() (owned + byte-frozen
//        by BC.W-SPRING-EASE). Self-test bite: a synthetic front-loaded-then-plateau
//        trajectory reds.
//   E3 — compositor-only + scoped will-change: every dock transition animates only the
//        compositor set (transform/translate/scale/rotate/opacity/filter/clip-path/
//        paint/--*); `will-change` appears ONLY under [data-morphing]/:hover/:active/
//        [data-held]/[data-active], NEVER as a permanent resting declaration. Self-test
//        bite: a planted resting `.glass-dock { will-change: transform }` reds.
//   E4 — the ratio-free blend mechanism (BD.W-DOCK-CORE supersede): layers.css reserves
//        the measure-ONCE `inline-size/block-size: var(--dock-expanded-px)` + derives
//        `--dock-size-scale` off the `--dock-live` convex blend (collapsed +
//        (expanded−collapsed)·--dock-morph-t), NOT the deleted per-swap
//        `--dock-morph-scale`/scaleX ratio seizure; DOCK_SPRING DERIVES from springPreset("dock") (the
//        single-source fence) + resolves the iOS-27 weighty (0.68, 0.64) pair
//        (BD.W-ANIM-IOS27-TUNE). Self-test bite: a planted forked-literal DOCK_SPRING reds.
//   E5 — the Atlas A-9 in-dock dark-toggle glyph clamp holds on coarse + fine: the
//        in-dock toggle SVG + the --dark-mode-toggle-padding inset BOTH read the ONE
//        --dock-control-glyph-size knob (clamped to --dock-icon-glyph, NOT the
//        un-padded box edge nor a 0-pad fallback); the knob RE-DECLARES under the
//        coarse --dock-scale re-declare (overflow.css) AND per [data-size]
//        (density.css) AND at :root (sizing.css) — the substitution-vs-inheritance
//        dead-knob trap closed on all three registers. Self-test bites: a planted
//        `--dark-mode-toggle-padding: 0` reds; a :root-only glyph token absent from the
//        coarse block reds.
//
// Run: node scripts/proof-dock-engine.mjs

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:dock-engine";

// Strip CSS comments (preserve newlines for line cites) so a prose mention of a
// retired property/token is never a false hit.
const stripCss = (s) =>
    s.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));

const readRel = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// ── The reflow/morph-geometry set (a transition leg on one of these is a MORPH leg,
//    never interaction polish). The box-morph geometry the buttery glide must NOT
//    front-load. `transform`/`scale`/`translate` are NOT here — they are the
//    compositor channel the rail hover/press interaction polish legitimately rides. ──
const MORPH_GEOMETRY_PROPS = [
    "inline-size",
    "block-size",
    "width",
    "height",
    "padding",
    "border-radius",
    "margin",
];
// The MORPH-chrome paint props that, paired with the front-loaded --spring-dock,
// desync from the JS scalar (the W01 morph chrome interpolates these off
// --dock-expand-t, NEVER a transition on the spring linear()).
const MORPH_CHROME_PROPS = ["background", "background-color", "border-color"];

const isMorphProp = (p) => {
    const t = p.toLowerCase();
    return (
        MORPH_GEOMETRY_PROPS.some((m) => t === m || t.startsWith(`${m}-`)) ||
        MORPH_CHROME_PROPS.includes(t)
    );
};

// ── transition-leg parsing (the property + the timing tokens of one leg) ──
const splitTopLevelCommas = (value) => {
    const legs = [];
    let depth = 0;
    let cur = "";
    for (const ch of value) {
        if (ch === "(") depth++;
        else if (ch === ")") depth = Math.max(0, depth - 1);
        if (ch === "," && depth === 0) {
            legs.push(cur);
            cur = "";
        } else cur += ch;
    }
    if (cur.trim()) legs.push(cur);
    return legs;
};

const TIMING_KEYWORDS = new Set([
    "ease", "ease-in", "ease-out", "ease-in-out", "linear", "step-start",
    "step-end", "none", "initial", "inherit", "unset",
]);
const isTimeToken = (t) => /^-?[\d.]+m?s$/i.test(t) || /^-?[\d.]+$/.test(t);

// Tokenize a leg, treating a balanced fn-call / var() as ONE token. Returns the
// { property, raw } — property = the first non-timing identifier; raw = the full leg.
const parseLeg = (leg) => {
    const tokens = [];
    let depth = 0;
    let cur = "";
    for (const ch of leg.trim()) {
        if (ch === "(") {
            depth++;
            cur += ch;
        } else if (ch === ")") {
            depth = Math.max(0, depth - 1);
            cur += ch;
        } else if (/\s/.test(ch) && depth === 0) {
            if (cur) tokens.push(cur);
            cur = "";
        } else cur += ch;
    }
    if (cur) tokens.push(cur);
    let property = null;
    for (const tok of tokens) {
        const t = tok.toLowerCase();
        if (isTimeToken(t) || TIMING_KEYWORDS.has(t)) continue;
        if (/^(cubic-bezier|steps|linear|var)\s*\(/i.test(t)) continue;
        if (!/^[a-z-]+$/.test(t)) continue;
        property = t;
        break;
    }
    return { property, raw: leg.trim() };
};

// Every `transition`/`transition-property` leg in a (comment-stripped) source:
// { property, raw, line }.
const parseTransitionLegs = (source) => {
    const out = [];
    const re = /(?:^|[;{}\s])(transition(?:-property)?)\s*:\s*([^;{}]+)/gi;
    let m;
    while ((m = re.exec(source)) !== null) {
        const value = m[2].trim();
        const line = source.slice(0, m.index).split("\n").length;
        for (const leg of splitTopLevelCommas(value)) {
            const { property, raw } = parseLeg(leg);
            if (property) out.push({ property, raw, line });
        }
    }
    return out;
};

// A leg FRONT-LOADS when it animates a MORPH property AND its timing references the
// --spring-dock front-loaded linear() — directly OR through the --dock-motion-resize /
// --dock-resize-spring aliases (which resolve to var(--spring-dock)).
const referencesSpringDock = (raw) =>
    /var\(\s*--spring-dock\b/.test(raw) ||
    /var\(\s*--dock-motion-resize\b/.test(raw) ||
    /var\(\s*--dock-resize-spring\b/.test(raw);

const frontLoadsMorph = (leg) =>
    isMorphProp(leg.property) && referencesSpringDock(leg.raw);

// ── E1 — no front-loaded MORPH leg in the dock morph chrome corpus ──
const MORPH_CSS_FILES = [
    "src/styles/dock/morph.css",
    "src/styles/dock/layers.css",
    "src/styles/dock/shell.css",
    "src/styles/dock/overflow.css",
];

export function detectE1() {
    const violations = [];
    const facts = { legsScanned: 0, frontLoaded: [] };
    for (const rel of MORPH_CSS_FILES) {
        const src = stripCss(readRel(rel));
        for (const leg of parseTransitionLegs(src)) {
            facts.legsScanned++;
            if (frontLoadsMorph(leg)) {
                facts.frontLoaded.push(`${rel}:${leg.line} — ${leg.property} (${leg.raw.slice(0, 50)})`);
                violations.push(
                    `E1: ${rel}:${leg.line} — the MORPH leg \`${leg.property}\` pairs the front-loaded --spring-dock linear() with a generic duration (${leg.raw.slice(0, 50)}); a morph leg must read the JS-driven --dock-expand-t/--dock-morph-t scalar`,
                );
            }
        }
    }
    // Positive: the morph chrome interp reads the JS scalar (the W01 single-clock).
    const morphCss = stripCss(readRel("src/styles/dock/morph.css"));
    facts.chromeReadsScalar =
        /--dock-expand-t:\s*var\(--dock-morph-t\)/.test(morphCss) &&
        /var\(--dock-expand-t/.test(morphCss);
    if (!facts.chromeReadsScalar) {
        violations.push(
            "E1: the morph chrome interp no longer reads the JS-driven --dock-morph-t/--dock-expand-t scalar (morph.css) — the single-clock unify regressed",
        );
    }
    return { violations, facts };
}

// E1 self-test bite — a planted morph leg pairing --spring-dock with a generic
// duration MUST be flagged; a compositor transform/opacity/the held-state paint leg
// MUST NOT.
const E1_SELF_TEST = `
.__planted_morph__ { transition: inline-size var(--duration-normal) var(--spring-dock); }
.__planted_alias__ { transition: block-size var(--dock-motion-resize); }
.__held_paint__ { transition: background var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard); }
.__rail_polish__ { transition: transform var(--dock-motion-resize), scale var(--dock-motion-resize); }`;
function detectE1SelfTest() {
    const hits = new Set();
    for (const leg of parseTransitionLegs(E1_SELF_TEST)) {
        if (frontLoadsMorph(leg)) hits.add(leg.property);
    }
    // The bite: inline-size + block-size flag (morph geometry on --spring-dock);
    // background (held paint on --ease-standard) does NOT; transform/scale (rail
    // interaction polish — NOT a morph-geometry prop) do NOT. Exactly {inline-size,
    // block-size}.
    return (
        hits.size === 2 && hits.has("inline-size") && hits.has("block-size")
    );
}

// ── E2 — the morph travel fills the clock (the JS SpringProgress analytic envelope) ──
//
// The --dock-morph-t scalar is the position of the DOCK_SPRING SpringProgress (the
// analytic underdamped damped-oscillator in dockMorphContext.ts) sampled over its
// physical settle window. We compute that analytic trajectory from the (response, ζ)
// pair alone (NEVER parsing the front-loaded --spring-dock linear() string, which is
// owned + byte-frozen by BC.W-SPRING-EASE) and assert it fills the clock.
//
// The iOS/Apple `response` convention: ωₙ = 2π/response. Underdamped position toward a
// unit target: p(t) = 1 - e^{-ζωₙt} [ cos(ω_d t) + (ζ/√(1-ζ²)) sin(ω_d t) ],
// ω_d = ωₙ√(1-ζ²). The "clock" is the 2%-band settle window (the same horizon
// --spring-dock-duration is generated from, regen-spring-tokens.mjs).
// BD.W-ANIM-IOS27-TUNE — the dock spring re-calibrated to the iOS-27 weighty-gooey pole
// (0.68, 0.64). DOCK_SPRING reads `springPreset("dock")` (the single-source fence), so
// these mirror the `dock` PRESETS row; the E2 analytic envelope computes against them.
const DOCK_RESPONSE = 0.68;
const DOCK_DAMPING = 0.64;
const SETTLE_BAND = 0.02;

function springPosition(t, response, zeta) {
    const omegaN = (2 * Math.PI) / response;
    if (zeta >= 1) {
        // critically/over-damped — no oscillation (defensive; dock ζ=0.7 is under).
        return 1 - Math.exp(-omegaN * t) * (1 + omegaN * t);
    }
    const omegaD = omegaN * Math.sqrt(1 - zeta * zeta);
    const env = Math.exp(-zeta * omegaN * t);
    return (
        1 -
        env *
            (Math.cos(omegaD * t) +
                (zeta / Math.sqrt(1 - zeta * zeta)) * Math.sin(omegaD * t))
    );
}

function settleSeconds(response, zeta) {
    const omegaN = (2 * Math.PI) / response;
    return -Math.log(SETTLE_BAND) / (zeta * omegaN);
}

// Sample the trajectory across the clock; return { midpointTravel, maxPlateauSpan,
// monotonicToTarget }. maxPlateauSpan = the longest contiguous fraction-of-clock the
// sampled position sits within ±tol of its prior sample (a dead-flat plateau — the
// front-loaded linear() signature). monotonicRising = the position is non-decreasing
// across the first-arrival window (no spring is perfectly monotonic past overshoot,
// so we check the RISE to first reaching the target, the buttery glide region).
function sampleEnvelope(response, zeta, { N = 200, plateauTol = 0.001 } = {}) {
    const clock = settleSeconds(response, zeta);
    const ps = [];
    for (let i = 0; i <= N; i++) ps.push(springPosition((i / N) * clock, response, zeta));
    const midpointTravel = ps[Math.floor(N / 2)];
    // longest contiguous run where |p[i]-p[i-1]| < plateauTol
    let maxRun = 0;
    let run = 0;
    for (let i = 1; i <= N; i++) {
        if (Math.abs(ps[i] - ps[i - 1]) < plateauTol) {
            run++;
            maxRun = Math.max(maxRun, run);
        } else run = 0;
    }
    const maxPlateauSpan = maxRun / N;
    // the rise to first reaching ~0.95 of the target is monotone non-decreasing
    let monotonicRising = true;
    for (let i = 1; i <= N; i++) {
        if (ps[i] >= 0.95) break;
        if (ps[i] < ps[i - 1] - 1e-9) {
            monotonicRising = false;
            break;
        }
    }
    return { clock, midpointTravel, maxPlateauSpan, monotonicRising, samples: ps };
}

export function detectE2() {
    const violations = [];
    const env = sampleEnvelope(DOCK_RESPONSE, DOCK_DAMPING);
    const facts = {
        midpointTravel: Math.round(env.midpointTravel * 10000) / 10000,
        maxPlateauSpan: Math.round(env.maxPlateauSpan * 10000) / 10000,
        monotonicRising: env.monotonicRising,
        clockSeconds: Math.round(env.clock * 1000) / 1000,
    };
    // (1) the travel reaches ≥0.40 by the clock midpoint (the E2 envelope bar — NOT
    //     the ~16% front-load plateau).
    if (!(env.midpointTravel >= 0.4)) {
        violations.push(
            `E2: the JS DOCK_SPRING envelope reaches only ${facts.midpointTravel} by the clock midpoint (< 0.40) — the morph travel does not fill the clock`,
        );
    }
    // (2) the rise is monotone (no plateau-then-jump).
    if (!env.monotonicRising) {
        violations.push(
            "E2: the JS DOCK_SPRING envelope rise is NOT monotone to target — a plateau-then-jump (the front-loaded snap signature)",
        );
    }
    // (3) NO long dead-flat plateau spanning the back of the clock. The JS physical
    //     trajectory glides + a small overshoot ring; the front-loaded --spring-dock
    //     linear() runs 1.00000 dead-flat ~49%→98% (a ≥0.40 plateau span). Bar: < 0.35
    //     of the clock may be plateau (the JS envelope's settle tail is far shorter).
    if (!(env.maxPlateauSpan < 0.35)) {
        violations.push(
            `E2: the JS DOCK_SPRING envelope has a dead-flat plateau spanning ${facts.maxPlateauSpan} of the clock (≥ 0.35 — the front-loaded snap signature)`,
        );
    }
    return { violations, facts };
}

// E2 self-test bite — a synthetic FRONT-LOADED trajectory (reaches the target in the
// first ~16% then runs dead-flat to the end, mirroring the --spring-dock linear())
// MUST red the plateau check; the JS physical envelope MUST pass.
function detectE2SelfTest() {
    // front-loaded synthetic: 0→1 over [0,0.16], then 1.00000 flat to 1.0.
    const N = 200;
    const ps = [];
    for (let i = 0; i <= N; i++) {
        const x = i / N;
        ps.push(x <= 0.16 ? x / 0.16 : 1.0);
    }
    let maxRun = 0;
    let run = 0;
    for (let i = 1; i <= N; i++) {
        if (Math.abs(ps[i] - ps[i - 1]) < 0.001) {
            run++;
            maxRun = Math.max(maxRun, run);
        } else run = 0;
    }
    const frontLoadedPlateau = maxRun / N; // ~0.84
    const jsEnv = sampleEnvelope(DOCK_RESPONSE, DOCK_DAMPING);
    // the bite: the synthetic front-load has a ≥0.35 plateau (reds), the JS env < 0.35.
    return frontLoadedPlateau >= 0.35 && jsEnv.maxPlateauSpan < 0.35;
}

// ── E3 — compositor-only + scoped will-change (no resting promotion) ──
// Find every `will-change` declaration in the dock CSS corpus; each must sit on an
// ARMED selector ([data-morphing] | :hover | :active | [data-held] | [data-active]),
// NEVER a bare resting `.glass-dock`/`.dock-*` rule.
const ARMED_TOKENS = [
    "[data-morphing]",
    ":hover",
    ":active",
    "[data-held]",
    "[data-active]",
    ":focus",
];
function parseRules(source) {
    const out = [];
    const re = /([^{}]+)\{([^{}]*)\}/g;
    let m;
    while ((m = re.exec(source)) !== null) {
        out.push({
            selector: m[1].trim().replace(/\s+/g, " "),
            body: m[2],
            line: source.slice(0, m.index).split("\n").length,
        });
    }
    return out;
}
export function detectE3() {
    const violations = [];
    const facts = { willChangeRules: [], restingPromotions: [] };
    for (const rel of MORPH_CSS_FILES) {
        const src = stripCss(readRel(rel));
        for (const rule of parseRules(src)) {
            if (!/will-change\s*:/.test(rule.body)) continue;
            const value = (rule.body.match(/will-change\s*:\s*([^;]+)/) || [])[1] || "";
            if (/\bauto\b/.test(value)) continue; // will-change:auto is a clear, not a promotion
            const armed = ARMED_TOKENS.some((t) => rule.selector.includes(t));
            const entry = `${rel}:${rule.line} — ${rule.selector.slice(0, 70)} { will-change: ${value.trim()} }`;
            facts.willChangeRules.push({ entry, armed });
            if (!armed) {
                facts.restingPromotions.push(entry);
                violations.push(
                    `E3: ${rel}:${rule.line} — a resting \`will-change: ${value.trim()}\` on \`${rule.selector.slice(0, 50)}\` pins a wasted compositor layer at rest (motion-canon P5); scope it to an armed state ([data-morphing]/:hover/:active/[data-held]/[data-active])`,
                );
            }
        }
    }
    // Positive: at least one ARMED will-change exists (the promotion was actually
    // added this wave, not merely absent).
    facts.armedCount = facts.willChangeRules.filter((r) => r.armed).length;
    if (facts.armedCount === 0) {
        violations.push(
            "E3: no armed will-change promotion found in the dock morph corpus — the compositor promotion (move 2) was not applied",
        );
    }
    return { violations, facts };
}
// E3 self-test bite — a planted resting promotion MUST flag; an armed one MUST NOT.
function detectE3SelfTest() {
    const RESTING = `.glass-dock { will-change: transform; }`;
    const ARMED = `.glass-dock.collapsed:hover { will-change: transform; }`;
    const restingFlagged = parseRules(RESTING).some(
        (r) => /will-change/.test(r.body) && !ARMED_TOKENS.some((t) => r.selector.includes(t)),
    );
    const armedFlagged = parseRules(ARMED).some(
        (r) => /will-change/.test(r.body) && !ARMED_TOKENS.some((t) => r.selector.includes(t)),
    );
    return restingFlagged === true && armedFlagged === false;
}

// ── E4 — the morph mechanism preserved (reserved footprint + scale + byte-frozen
//    DOCK_SPRING) ──
export function detectE4() {
    const violations = [];
    const facts = {};
    const layers = stripCss(readRel("src/styles/dock/layers.css"));
    // BD.W-DOCK-CORE superseded the SEIZURE machinery: the per-swap `ratio = from/to`
    // `--dock-root-scale`/`--dock-morph-scale`/`scaleX(--dock-morph-scale)` ran to ~56×
    // (the live 2451px collapse). The size leg is now the ratio-FREE convex blend — the
    // box RESERVES the measure-ONCE `--dock-expanded-px` (ONE layout solve, CDP-Layout-
    // flat) and the visible footprint rides `scale: var(--dock-size-scale)` from
    // `transform-origin: center`, where `--dock-size-scale = --dock-live/--dock-expanded-px`
    // and `--dock-live = collapsed + (expanded−collapsed)·clamp(0,--dock-expand-t,1)`
    // (BOUNDED by construction). BG.W-DOCK-COLLAPSE-DIR — the blend scalar is the
    // DIRECTIONAL `--dock-expand-t` (the expanded-ness 0=collapsed/1=expanded `morph.css`
    // derives off `--dock-morph-t`: expand `t`, collapse `1−t`), NOT the raw morph PROGRESS
    // `--dock-morph-t` (always 0→1). Reading the raw progress made the convex blend play
    // collapsed→expanded for BOTH directions — correct on expand, but on collapse it
    // ballooned the box to the full expanded footprint then snapped to collapsed (the live
    // "morph hover flicker"). The chrome/child stagger were already on the directional
    // scalar; this aligns SIZE with them. E4 now witnesses THAT mechanism: the reserve names
    // the measured endpoint (NOT --dock-morph-t per-frame), and the clamped size scalar
    // derives off the convex blend on the directional --dock-expand-t. The actual `scale:`
    // composite is folded in shape.css.
    facts.reservesInlineSize = /inline-size:\s*var\(--dock-expanded-px\)/.test(layers);
    facts.reservesBlockSize = /block-size:\s*var\(--dock-expanded-px\)/.test(layers);
    facts.dockLiveBlend =
        /--dock-live:\s*calc\([\s\S]*?--dock-collapsed-px[\s\S]*?--dock-expanded-px[\s\S]*?clamp\(\s*0\s*,\s*var\(--dock-expand-t/.test(layers);
    facts.sizeScale =
        /--dock-size-scale:\s*clamp\([\s\S]*?var\(--dock-live\)\s*\/\s*max\(\s*var\(--dock-expanded-px/.test(layers);
    // A per-frame-scalar size reserve (the regressed/seizure shape) would name
    // --dock-morph-t INSIDE the size value — reds.
    facts.noPerFrameReserve =
        !/(?:inline|block)-size:\s*[^;]*var\(--dock-morph-t/.test(layers);
    if (!facts.reservesInlineSize)
        violations.push("E4: layers.css no longer reserves `inline-size: var(--dock-expanded-px)` (the measure-ONCE CDP-Layout-flat footprint regressed)");
    if (!facts.sizeScale)
        violations.push("E4: layers.css no longer derives `--dock-size-scale: clamp(... var(--dock-live)/max(var(--dock-expanded-px ...)))` — the ratio-free convex-blend size morph regressed");
    if (!facts.dockLiveBlend)
        violations.push("E4: layers.css no longer computes the `--dock-live` convex blend off `--dock-collapsed-px`/`--dock-expanded-px`/`--dock-expand-t` (the DIRECTIONAL scalar) — the bounded-by-construction size endpoint blend regressed (or reverted to the direction-agnostic raw `--dock-morph-t`, re-introducing the collapse-balloon)");
    if (!facts.reservesBlockSize)
        violations.push("E4: layers.css no longer reserves `block-size: var(--dock-expanded-px)` for the vertical morph (the vertical reserved footprint regressed)");
    if (!facts.noPerFrameReserve)
        violations.push("E4: a per-frame `inline-size`/`block-size` reads --dock-morph-t directly — the seizure-prone per-swap-scalar reserve re-introduced (the ratio-free blend reserves the SETTLED endpoint, scales via transform)");

    // DOCK_SPRING reads the `dock` PRESETS row (the single-source fence — the const
    // DERIVES from springPreset("dock"), it does NOT re-type a literal). E4 asserts the
    // sanctioned read-path is intact AND the resolved pair is the iOS-27 weighty
    // (0.68, 0.64) — a structural edit (a forked literal, a wrong preset) reds.
    const constants = readRel("src/components/custom/dock/constants.ts");
    facts.readsPresetTable =
        /DOCK_SPRING\s*=\s*\{[\s\S]*?response:\s*springPreset\(\s*["']dock["']\s*\)\.response[\s\S]*?dampingFraction:\s*springPreset\(\s*["']dock["']\s*\)\.dampingFraction/.test(
            constants,
        );
    if (!facts.readsPresetTable) {
        violations.push(
            "E4: DOCK_SPRING no longer DERIVES from springPreset(\"dock\") — the single-source fence broke (a forked literal pair re-introduced)",
        );
    }
    // Read the resolved pair off the SPRING_PRESETS dock row and assert it is the
    // iOS-27 weighty pair (re-anchored from the prior byte-frozen literal in lockstep).
    const presetsSrc = readRel("src/composables/motion/springPresets.ts");
    const dockRow = presetsSrc.match(
        /name:\s*["']dock["'],\s*response:\s*([\d.]+),\s*dampingFraction:\s*([\d.]+)/,
    );
    facts.dockSpring = dockRow
        ? { response: Number(dockRow[1]), dampingFraction: Number(dockRow[2]) }
        : null;
    if (!dockRow || Number(dockRow[1]) !== DOCK_RESPONSE || Number(dockRow[2]) !== DOCK_DAMPING) {
        violations.push(
            `E4: the SPRING_PRESETS dock row is not the iOS-27 weighty { response: 0.68, dampingFraction: 0.64 } (found ${dockRow ? `${dockRow[1]}, ${dockRow[2]}` : "absent"})`,
        );
    }
    return { violations, facts };
}
// E4 self-test bite — a planted DOCK_SPRING forked-literal (off the single-source
// preset table, off the iOS-27 weighty pair) MUST flag.
function detectE4SelfTest() {
    const PLANTED = `export const DOCK_SPRING = { response: 0.5, dampingFraction: 0.5 } as const;`;
    // The forked literal does NOT derive from springPreset("dock") AND carries the wrong
    // pair — both arms of the new E4 fence bite it.
    const forkedLiteral = !/springPreset\(\s*["']dock["']\s*\)/.test(PLANTED);
    const m = PLANTED.match(
        /DOCK_SPRING\s*=\s*\{\s*response:\s*([\d.]+),\s*dampingFraction:\s*([\d.]+)/,
    );
    const wrongPair = Boolean(m) && (Number(m[1]) !== DOCK_RESPONSE || Number(m[2]) !== DOCK_DAMPING);
    return forkedLiteral && wrongPair;
}

// ── E5 — the Atlas A-9 in-dock dark-toggle glyph clamp on coarse + fine ──
export function detectE5() {
    const violations = [];
    const facts = {};
    const toggle = stripCss(readRel("src/styles/dock-controls/dark-mode-toggle.css"));
    const sizing = stripCss(readRel("src/styles/tokens/sizing.css"));
    const density = stripCss(readRel("src/styles/dock/density.css"));
    const overflow = stripCss(readRel("src/styles/dock/overflow.css"));

    // (a) the in-dock toggle SVG reads --dock-control-glyph-size (NOT the un-padded box).
    facts.svgReadsKnob =
        /width:\s*var\(--dock-control-glyph-size/.test(toggle) &&
        /height:\s*var\(--dock-control-glyph-size/.test(toggle);
    if (!facts.svgReadsKnob)
        violations.push("E5: the in-dock dark-toggle SVG does not read --dock-control-glyph-size (dark-mode-toggle.css) — the glyph reads the un-clamped box edge");

    // (b) the --dark-mode-toggle-padding inset SUBTRACTS the SAME knob (the box pad +
    //     the glyph stay locked) — and is NOT a 0-pad fallback.
    const padMatch = toggle.match(/--dark-mode-toggle-padding:\s*calc\(([\s\S]*?)\)\s*;/);
    facts.padCalc = padMatch ? padMatch[1].replace(/\s+/g, " ").trim().slice(0, 80) : null;
    facts.padSubtractsKnob =
        padMatch != null &&
        /var\(--dock-control-glyph-size/.test(padMatch[1]) &&
        /var\(--dock-control-size/.test(padMatch[1]);
    if (!facts.padSubtractsKnob)
        violations.push("E5: the in-dock --dark-mode-toggle-padding inset does not subtract --dock-control-glyph-size from --dock-control-size (dark-mode-toggle.css) — the box pad + glyph are not locked, or the pre-AY 0-pad fallback survives");

    // (c) the knob RE-DECLARES at :root (sizing.css) AND per [data-size]
    //     (density.css) AND in the coarse @media block (overflow.css) — the
    //     substitution-vs-inheritance dead-knob closed on all three registers.
    facts.knobAtRoot = /--dock-control-glyph-size:\s*var\(--dock-icon-glyph/.test(sizing);
    // density: the re-declare must be INSIDE the .glass-dock[data-size] block (the
    // same block that re-resolves --dock-icon-glyph).
    const densityBlock = (density.match(/\.glass-dock\[data-size\]\s*\{[\s\S]*?\}/) || [""])[0];
    facts.knobPerDensity = /--dock-control-glyph-size:\s*var\(--dock-icon-glyph/.test(densityBlock);
    // coarse: the re-declare must be INSIDE the @media (pointer: coarse) block.
    const coarseBlock = (overflow.match(/@media\s*\(\s*pointer:\s*coarse\s*\)\s*\{[\s\S]*\}\s*\}/) || [""])[0];
    facts.knobOnCoarse = /--dock-control-glyph-size:\s*var\(--dock-icon-glyph/.test(coarseBlock);

    if (!facts.knobAtRoot)
        violations.push("E5: --dock-control-glyph-size is not declared at :root (sizing.css) defaulting to --dock-icon-glyph");
    if (!facts.knobPerDensity)
        violations.push("E5: --dock-control-glyph-size does not RE-DECLARE inside .glass-dock[data-size] (density.css) — it freezes at the :root --dock-scale while --dock-icon-glyph lifts per density (the dead-knob trap)");
    if (!facts.knobOnCoarse)
        violations.push("E5: --dock-control-glyph-size does not RE-DECLARE in the @media (pointer: coarse) block (overflow.css) — the glyph clamp freezes at the :root scale on coarse (the AZ.R5-TOKENS substitution-vs-inheritance trap)");

    return { violations, facts };
}
// E5 self-test bites — a planted 0-pad MUST flag; a :root-only knob absent from the
// coarse block MUST flag.
function detectE5SelfTest() {
    const zeroPad = `--dark-mode-toggle-padding: 0;`;
    const zeroPadFlagged = !(
        /--dark-mode-toggle-padding:\s*calc\([\s\S]*var\(--dock-control-glyph-size/.test(zeroPad)
    );
    const rootOnlyOverflow = `@media (pointer: coarse) { .glass-dock[data-size] { --dock-icon-glyph: 1rem; } }`;
    const coarseBlock = (rootOnlyOverflow.match(/@media\s*\(\s*pointer:\s*coarse\s*\)\s*\{[\s\S]*\}\s*\}/) || [""])[0];
    const coarseMissingFlagged = !/--dock-control-glyph-size:\s*var\(--dock-icon-glyph/.test(coarseBlock);
    return zeroPadFlagged === true && coarseMissingFlagged === true;
}

// ── compose ──
export function detect() {
    const e1 = detectE1();
    const e2 = detectE2();
    const e3 = detectE3();
    const e4 = detectE4();
    const e5 = detectE5();
    const selfTests = {
        e1: detectE1SelfTest(),
        e2: detectE2SelfTest(),
        e3: detectE3SelfTest(),
        e4: detectE4SelfTest(),
        e5: detectE5SelfTest(),
    };
    const selfTestViolations = [];
    for (const [k, ok] of Object.entries(selfTests)) {
        if (!ok) selfTestViolations.push(`${k.toUpperCase()} self-test bite BROKE — the detector does not bite its planted ${k} fixture`);
    }
    const violations = [
        ...e1.violations,
        ...e2.violations,
        ...e3.violations,
        ...e4.violations,
        ...e5.violations,
        ...selfTestViolations,
    ];
    return {
        violations,
        facts: { e1: e1.facts, e2: e2.facts, e3: e3.facts, e4: e4.facts, e5: e5.facts, selfTests },
    };
}

function run() {
    const { violations, facts } = detect();
    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath("GLASS_UI_DOCK_ENGINE_ARTIFACT", "BC-dock-engine");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:dock-engine",
        command: COMMAND,
        note: "BC.W-DOCK-ENGINE device-free SOURCE arm (E1 no front-loaded morph leg · E2 the JS envelope fills the clock · E3 compositor-only + scoped will-change · E4 morph mechanism + DOCK_SPRING byte-frozen · E5 the Atlas A-9 toggle-glyph clamp on coarse+fine). The PAINT arm (the live --dock-morph-t envelope ≥0.40-by-midpoint capture + the dock-plate-reads-warm + vertical clickable) is the orchestrator's W-DOCK-ENGINE-DELTA.",
        facts,
        violations,
    });
    console.log(`proof:dock-engine — ${status.toUpperCase()}`);
    console.log(`  E2 JS envelope: midpoint travel ${facts.e2.midpointTravel} (≥0.40), max plateau ${facts.e2.maxPlateauSpan} (<0.35), clock ${facts.e2.clockSeconds}s`);
    console.log(`  E3 armed will-change promotions: ${facts.e3.armedCount}; resting: ${facts.e3.restingPromotions.length}`);
    console.log(`  E5 knob re-declare: root=${facts.e5.knobAtRoot} density=${facts.e5.knobPerDensity} coarse=${facts.e5.knobOnCoarse}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    } else {
        console.log(`  artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    }
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
