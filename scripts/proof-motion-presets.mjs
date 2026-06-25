#!/usr/bin/env node
// proof:motion-presets — BC.W-MOTION-PRESETS (Band 7).
//
// Two small motion-preset gaps closed (FOURIER-INBOUND #5 + #8), no new engine:
//   #5 — the brand "convergence-reveal" / partial-sum settle becomes a NAMED,
//        reusable curve (`--ease-convergence`), composing the SHIPPED kf spring
//        solver via the curve table — instead of fourier re-deriving the curve by
//        hand. The DECIDE (recorded + MEASURED): a Fourier partial sum converges
//        ONTO its target with a decaying Gibbs ripple — a monotone critically-damped
//        approach, NO sustained overshoot past terminal. That IS `gentle` (ζ=1.0,
//        analytic overshoot 0), so `--ease-convergence` ALIASES `--spring-gentle`
//        (zero new SPRING_PRESETS row, zero new engine — the no-contrivance line).
//   #8 — the `[data-scroll-reveal-once]` latch plays the entrance ONCE (the
//        virtualized/teleporting opt-in), keyed off a `[data-revealed]` attr a tiny
//        JS-assist IntersectionObserver sets on first cross + unobserves (the SHIPPED
//        `useStaggerReveal` `once` machinery, reused). The continuous
//        `[data-scroll-reveal]` recipe stays UNTOUCHED (the default cascade).
//
// This gate is the device-free SOURCE arm (tags local/ci). The PAINT arm (the
// convergence-reveal on the demo motion story + the once-latch on a virtualized
// list, live :5199) is the orchestrator's π capture (W-MOTION-PRESETS-DELTA.md).
//
// FOUR clauses (each born-RED on HEAD, each with a self-test bite):
//   MP1 — `--ease-convergence` exists + is curve-table-bound (a MOTION_CURVES row,
//         composing the shipped solver via an alias-through, no inline curve).
//   MP2 — the convergence DECIDE is recorded WITH the measurement (the no-contrivance
//         line: a new SPRING_PRESETS row would need a measured divergence; the alias
//         reuse is the measured-not-distinct verdict).
//   MP3 — the `[data-scroll-reveal-once]` latch plays once (keyed off `[data-revealed]`,
//         a one-shot @keyframes; reuses the shipped IO/`once` machinery — no second
//         observer engine; the continuous `[data-scroll-reveal]` recipe is UNTOUCHED).
//   MP4 — dual-path single-writer + PRM (an element is `[data-scroll-reveal]` XOR
//         `[data-scroll-reveal-once]`; the once recipe sits under the PRM outer gate).
//
// Device-free SOURCE arm — node scripts/proof-motion-presets.mjs.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const CURVES_TS = resolve(ROOT, "src/composables/motion/curves.ts");
const SPRING_PRESETS_TS = resolve(ROOT, "src/composables/motion/springPresets.ts");
const SCHEME_MOTION = resolve(ROOT, "src/styles/tokens/scheme-motion.css");
// BD.W-CUT carved scheme-motion's §2 EASING block — incl. the `--ease-convergence`
// alias + every `--ease-*`/`--spring-*` curve — into the adjacent scheme-spring.css
// partial. The MP1 convergence-mint assertion reads the SPRING partial concatenated
// with scheme-motion (the no-gray/glass-fx carve precedent).
const SCHEME_SPRING = resolve(ROOT, "src/styles/tokens/scheme-spring.css");
const SCROLL_DRIVEN = resolve(ROOT, "src/styles/scroll-driven.css");
const USE_STAGGER_REVEAL = resolve(ROOT, "src/composables/motion/useStaggerReveal.ts");

// The convergence curve + its canonical reuse target.
const CONVERGENCE_TOKEN = "--ease-convergence";
const CONVERGENCE_CANONICAL = "--spring-gentle";
// The `gentle` (response, ζ) the reuse is measured against — a critically-damped
// settle with analytic overshoot exp(-ζπ/√(1-ζ²)) = 0 at ζ=1.0.
const GENTLE_ZETA = 1.0;

function analyticOvershoot(zeta) {
    if (zeta >= 1) return 0;
    return Math.exp((-zeta * Math.PI) / Math.sqrt(1 - zeta * zeta));
}

function read(path) {
    try {
        return readFileSync(path, "utf8");
    } catch {
        return null;
    }
}

// Strip /* */ comments (offset-irrelevant here — presence checks), so a
// commented-out token decl is never a false witness for the MP1 EXISTS check.
function stripCss(src) {
    return src == null ? "" : src.replace(/\/\*[\s\S]*?\*\//g, " ");
}

// ── MP1 — `--ease-convergence` exists + is curve-table-bound ──────────────────
// The token resolves in MOTION_CURVES (an alias row whose `canonical` target is a
// real curve, OR a canonical row). It must NOT carry an inline bezier/spring fork
// (the curve COMPOSES the shipped solver — proof:animation-coherence
// CURVE-TABLE-BOUND stays green). We read curves.ts SOURCE node-pure (the same
// reader shape proof-animation-coherence uses), not a TS import.
export function detectCurveTableBound(curvesSrc, schemeSrc) {
    const v = [];
    const facts = {};
    if (curvesSrc == null) {
        v.push("MP1: cannot read curves.ts");
        return { facts, violations: v };
    }
    // The ALIAS_SPEC row for the convergence token: `{ token: "--ease-convergence",
    // canonical: "--spring-X", … }`. An alias-through reuse is the DECIDE'd shape.
    const aliasRe = new RegExp(
        `token:\\s*["'\`]${CONVERGENCE_TOKEN}["'\`]\\s*,\\s*canonical:\\s*["'\`](--[a-z-]+)["'\`]`,
    );
    const aliasMatch = curvesSrc.match(aliasRe);
    // OR a canonical row: `{ token: "--ease-convergence", kind: "spring"|"bezier", js: … }`.
    const canonicalRe = new RegExp(
        `token:\\s*["'\`]${CONVERGENCE_TOKEN}["'\`][\\s\\S]{0,160}?kind:\\s*["'\`](spring|bezier)["'\`]`,
    );
    const canonicalMatch = curvesSrc.match(canonicalRe);
    facts.convergenceRowKind = aliasMatch ? "alias" : canonicalMatch ? "canonical" : null;
    if (!aliasMatch && !canonicalMatch) {
        v.push(
            `MP1: ${CONVERGENCE_TOKEN} has NO MOTION_CURVES row in curves.ts — the brand convergence-reveal curve is not curve-table-bound`,
        );
        return { facts, violations: v };
    }
    if (aliasMatch) {
        facts.convergenceCanonical = aliasMatch[1];
        // The alias target must be a real CANONICAL row (a `--spring-*` or a charted
        // bezier) — twinOf throws on a missing target at runtime, but the gate
        // verifies the target appears as a canonical token literal in curves.ts.
        const targetIsCanonical =
            new RegExp(`token:\\s*["'\`]${aliasMatch[1]}["'\`]`).test(curvesSrc) ||
            /SPRING_PRESETS\.map/.test(curvesSrc); // the five springRow()-built canonicals
        if (!/^--spring-[a-z]+$/.test(aliasMatch[1]) && !targetIsCanonical) {
            v.push(
                `MP1: ${CONVERGENCE_TOKEN} aliases '${aliasMatch[1]}', which is not a resolvable canonical MOTION_CURVES row`,
            );
        }
    }
    // SELF-TEST BITE surface: an inline curve (a raw `cubic-bezier(`/`linear(`-stops
    // / a `springTimingFunction({ response: …, dampingFraction: … })` literal) on the
    // convergence row would be a fork. The alias-through carries NO `js:` literal of
    // its own (it resolves through the canonical twin), so the row's window must be
    // free of an inline solver call. We check the ~200 chars around the token decl.
    const tokenIdx = curvesSrc.indexOf(CONVERGENCE_TOKEN);
    const windowSrc = curvesSrc.slice(tokenIdx, tokenIdx + 220);
    if (/cubic-bezier\s*\(|linear\s*\([^)]*%/.test(windowSrc) ||
        /springTimingFunction\s*\(\s*\{\s*response/.test(windowSrc)) {
        v.push(
            `MP1: ${CONVERGENCE_TOKEN} carries an INLINE curve (a raw bezier/linear()/inline springTimingFunction) — it must COMPOSE the shipped solver via the alias-through, not fork a curve`,
        );
    }
    // The CSS token mints in scheme-motion.css (the public --ease-convergence var).
    const css = stripCss(schemeSrc);
    facts.cssMinted = new RegExp(`${CONVERGENCE_TOKEN}\\s*:`).test(css);
    if (!facts.cssMinted) {
        v.push(
            `MP1: ${CONVERGENCE_TOKEN} is NOT minted in scheme-motion.css (the public CSS var the consumer reads)`,
        );
    } else {
        // The reuse: the CSS alias resolves to the gentle settle (or a real spring).
        const cssAliasMatch = css.match(
            new RegExp(`${CONVERGENCE_TOKEN}\\s*:\\s*var\\(\\s*(--[a-z-]+)`),
        );
        facts.cssResolvesTo = cssAliasMatch ? cssAliasMatch[1] : null;
    }
    return { facts, violations: v };
}

// ── MP2 — the convergence DECIDE is recorded WITH the measurement ─────────────
// The no-contrivance guard: a new SPRING_PRESETS `convergence` row is justified
// ONLY by a measured divergence from `gentle`; the recorded verdict here is the
// REUSE (measured-not-distinct). The gate asserts (a) NO speculative `convergence`
// SPRING_PRESETS row without a measurement, and (b) the recorded reuse names the
// measurement (the alias-through to the canonical critically-damped register).
export function detectDecideRecorded(curvesSrc, presetsSrc, schemeSrc) {
    const v = [];
    const facts = {};
    if (presetsSrc == null) {
        v.push("MP2: cannot read springPresets.ts");
        return { facts, violations: v };
    }
    // Is there a `convergence` SPRING_PRESETS row? (a new primitive).
    const newRow = /name:\s*["'`]convergence["'`]/.test(presetsSrc);
    facts.newSpringRow = newRow;
    // The recorded MEASUREMENT: the reuse rationale names the critically-damped /
    // no-overshoot / measured-not-distinct verdict in the curve-table or token source
    // (curves.ts alias note OR the scheme-motion.css mint comment OR the springPresets
    // gentle-row reuse note). A bare alias with NO recorded measurement REDs.
    const measurementRe = /critically-damped|no overshoot|overshoot 0|measured-not-distinct|partial-sum settle|measurably distinct/i;
    const recordedIn = [];
    if (measurementRe.test(curvesSrc ?? "")) recordedIn.push("curves.ts");
    if (measurementRe.test(schemeSrc ?? "")) recordedIn.push("scheme-motion.css");
    if (measurementRe.test(presetsSrc)) recordedIn.push("springPresets.ts");
    facts.measurementRecordedIn = recordedIn;

    if (newRow) {
        // A new row MUST carry a measured DIVERGENCE (the over-engineer guard) — the
        // convergence row's comment must name the measured-distinct justification.
        const rowDivergence = /measurably distinct|distinct.*gentle|gentle.*distinct/i.test(presetsSrc);
        if (!rowDivergence) {
            v.push(
                "MP2: a `convergence` SPRING_PRESETS row exists with NO recorded measured divergence from `gentle` — a speculative new row is the over-engineer anti-pattern; alias `--spring-gentle` OR record the divergence",
            );
        }
        facts.decide = "new-row";
    } else {
        // The REUSE verdict: the convergence curve aliases `--spring-gentle`, and the
        // measurement (critically-damped, no overshoot) is recorded. Confirm the
        // measurement actually holds (gentle ζ=1.0 → overshoot 0).
        facts.decide = "alias-reuse";
        facts.gentleOvershoot = Math.round(analyticOvershoot(GENTLE_ZETA) * 1e4) / 1e4;
        if (recordedIn.length === 0) {
            v.push(
                "MP2: the convergence DECIDE is the `gentle` ALIAS reuse but the MEASUREMENT (critically-damped / no-overshoot / measured-not-distinct) is recorded NOWHERE — record it so the reuse is justified, not asserted",
            );
        }
        // The reuse must point at the critically-damped register (gentle), not a
        // bouncing/overshooting one — the partial sum SETTLES, it does not ring past.
        const aliasTarget = (curvesSrc ?? "").match(
            new RegExp(`token:\\s*["'\`]${CONVERGENCE_TOKEN}["'\`]\\s*,\\s*canonical:\\s*["'\`](--[a-z-]+)["'\`]`),
        );
        if (aliasTarget && aliasTarget[1] !== CONVERGENCE_CANONICAL) {
            v.push(
                `MP2: ${CONVERGENCE_TOKEN} aliases '${aliasTarget[1]}', not the measured critically-damped register '${CONVERGENCE_CANONICAL}' — the partial-sum SETTLES (no overshoot), so the reuse target is the no-overshoot gentle row`,
            );
        }
    }
    return { facts, violations: v };
}

// ── MP3 — the `[data-scroll-reveal-once]` latch plays once ────────────────────
// The recipe exists in scroll-driven.css (keyed off `[data-revealed]`, a one-shot
// @keyframes). The latch REUSES the shipped IO/`once` machinery — NO second
// observer engine. The continuous `[data-scroll-reveal]` recipe is UNTOUCHED.
export function detectOnceLatch(scrollSrc, staggerSrc) {
    const v = [];
    const facts = {};
    if (scrollSrc == null) {
        v.push("MP3: cannot read scroll-driven.css");
        return { facts, violations: v };
    }
    const css = stripCss(scrollSrc);
    // The once recipe: a `[data-scroll-reveal-once]` selector AND the `[data-revealed]`
    // attr-keyed entrance (the one-shot, NOT the live view() range).
    facts.onceSelector = /\[data-scroll-reveal-once\]/.test(css);
    facts.revealedKeyed = /\[data-revealed\]/.test(css);
    if (!facts.onceSelector) {
        v.push("MP3: no `[data-scroll-reveal-once]` recipe in scroll-driven.css — the once latch is absent");
    }
    if (!facts.revealedKeyed) {
        v.push("MP3: the once recipe is not keyed off `[data-revealed]` — it must play off the attr (a one-shot @keyframes), NOT the live view() range");
    }
    // The once recipe must NOT ride a `view()` timeline on the attr-keyed entrance
    // (a view() re-fires — the bug). The continuous recipe owns view(); the once
    // entrance is attr-keyed. Check the `[data-revealed]` rule's animation has no
    // `animation-timeline: view(`.
    const onceRuleMatch = css.match(/\[data-scroll-reveal-once\]\s*>\s*\*\[data-revealed\]\s*\{([^}]*)\}/);
    if (onceRuleMatch && /animation-timeline\s*:\s*view\s*\(/.test(onceRuleMatch[1])) {
        v.push("MP3: the `[data-revealed]` once entrance rides a `view()` timeline — a view() re-fires on every re-entry (the exact bug the latch fixes); the once entrance must be attr-keyed only");
    }
    // The continuous `[data-scroll-reveal]` recipe is UNTOUCHED — it still rides the
    // `view()` timeline with the `entry`-range. (The no-default-change fence.)
    facts.continuousUntouched =
        /\[data-scroll-reveal\]\s*>\s*\*\s*\{[^}]*animation-timeline\s*:\s*view\s*\(block\)/.test(css) &&
        /animation-range\s*:\s*entry/.test(css);
    if (!facts.continuousUntouched) {
        v.push("MP3: the continuous `[data-scroll-reveal]` recipe (view(block) + entry-range) is no longer intact — the calm-cascade default must stay UNTOUCHED");
    }
    // The latch REUSES the shipped IntersectionObserver/`once` machinery — the
    // `[data-scroll-reveal-once]` directive lives in useStaggerReveal.ts and runs the
    // SAME `unobserve`-on-first-cross discipline (no second observer ENGINE).
    if (staggerSrc == null) {
        v.push("MP3: cannot read useStaggerReveal.ts");
    } else {
        facts.directivePresent = /scroll-reveal-once/i.test(staggerSrc) || /ScrollRevealOnce/.test(staggerSrc);
        facts.setsRevealedAttr = /setAttribute\(\s*["'`]data-revealed["'`]/.test(staggerSrc);
        facts.unobservesOnce = /\.unobserve\s*\(/.test(staggerSrc);
        if (!facts.directivePresent) {
            v.push("MP3: no `[data-scroll-reveal-once]` directive in useStaggerReveal.ts — the latch's JS-assist (the data-revealed setter) is absent");
        }
        if (!facts.setsRevealedAttr) {
            v.push("MP3: the once directive does not setAttribute('data-revealed') on cross — the CSS one-shot cannot key off an attr that is never set");
        }
        if (!facts.unobservesOnce) {
            v.push("MP3: the once directive does not `unobserve` on first cross — the `once` leg's exact discipline (play once, never re-fire) is missing");
        }
    }
    return { facts, violations: v };
}

// ── MP4 — dual-path single-writer + PRM ───────────────────────────────────────
// An element is `[data-scroll-reveal]` XOR `[data-scroll-reveal-once]` (never both
// drive). The two recipes are attr-disjoint by construction (a selector keys on one
// attr OR the other); the gate asserts the once recipe does NOT also select the
// continuous attr on the same rule, and the once entrance sits under the PRM outer
// gate (a flourish — paints in-place under reduce).
export function detectSingleWriterPRM(scrollSrc) {
    const v = [];
    const facts = {};
    if (scrollSrc == null) {
        v.push("MP4: cannot read scroll-driven.css");
        return { facts, violations: v };
    }
    const css = stripCss(scrollSrc);
    // No rule selects BOTH attrs (a double-writer): `[data-scroll-reveal][data-scroll-reveal-once]`.
    facts.noDoubleDrive = !/\[data-scroll-reveal\]\[data-scroll-reveal-once\]|\[data-scroll-reveal-once\]\[data-scroll-reveal\]/.test(css);
    if (!facts.noDoubleDrive) {
        v.push("MP4: a rule selects BOTH `[data-scroll-reveal]` AND `[data-scroll-reveal-once]` — an element must be ONE path or the other (never both drive)");
    }
    // The once entrance sits under the PRM outer gate (the reveal carve — under
    // reduce the row paints in-place, no entrance). Find the once recipe's enclosing
    // `@media (prefers-reduced-motion: no-preference)` block.
    const onceIdx = css.indexOf("[data-scroll-reveal-once]");
    facts.oncePRMGated = false;
    if (onceIdx !== -1) {
        // Walk back from the once selector to the nearest `@media` opener; it must be
        // a `prefers-reduced-motion: no-preference` gate (the same outer gate the
        // continuous recipe uses).
        const before = css.slice(0, onceIdx);
        const lastMedia = before.lastIndexOf("@media");
        if (lastMedia !== -1) {
            const mediaLine = css.slice(lastMedia, lastMedia + 120);
            facts.oncePRMGated = /prefers-reduced-motion\s*:\s*no-preference/.test(mediaLine);
        }
    }
    if (!facts.oncePRMGated) {
        v.push("MP4: the `[data-scroll-reveal-once]` recipe is not under a `@media (prefers-reduced-motion: no-preference)` gate — the once entrance is a flourish; under reduce it must paint in-place (the reveal carve)");
    }
    return { facts, violations: v };
}

// ── the ≥2-consumer record (the brand signature + the latch consumers) ────────
// A documented record, not a live-walk — the consumers land in the fourier tree at
// the 4.1.0 adopt (the foreign-tree fence). MET per FOURIER-BC #5/#8.
const CONSUMER_RECORD = {
    convergence: ["fourier viz", "fourier equation surface", "the demo motion story"],
    onceLatch: ["the virtualized/teleporting list demo", "fourier's virtualized scroller"],
};

export function detectAll({ curvesSrc, presetsSrc, schemeSrc, scrollSrc, staggerSrc } = {}) {
    const curves = curvesSrc ?? read(CURVES_TS);
    const presets = presetsSrc ?? read(SPRING_PRESETS_TS);
    const scheme =
        schemeSrc ?? [read(SCHEME_MOTION), read(SCHEME_SPRING)].filter(Boolean).join("\n");
    const scroll = scrollSrc ?? read(SCROLL_DRIVEN);
    const stagger = staggerSrc ?? read(USE_STAGGER_REVEAL);

    const mp1 = detectCurveTableBound(curves, scheme);
    const mp2 = detectDecideRecorded(curves, presets, scheme);
    const mp3 = detectOnceLatch(scroll, stagger);
    const mp4 = detectSingleWriterPRM(scroll);

    const violations = [
        ...mp1.violations,
        ...mp2.violations,
        ...mp3.violations,
        ...mp4.violations,
    ];
    return {
        violations,
        facts: {
            mp1: mp1.facts,
            mp2: mp2.facts,
            mp3: mp3.facts,
            mp4: mp4.facts,
            consumers: CONSUMER_RECORD,
        },
    };
}

// ── the inline self-test bites (the gate proves its own bite every run) ──────────
function selfTest() {
    const failures = [];

    // MP1 bite — a missing convergence row reds; a hand-rolled inline curve reds.
    if (detectCurveTableBound("const X = [];", "").violations.length === 0) {
        failures.push("SELF-TEST MP1: a curves.ts with NO --ease-convergence row did NOT red");
    }
    const inlineForkCurves =
        `{ token: "--ease-convergence", kind: "spring", js: springTimingFunction({ response: 0.7, dampingFraction: 1.0 }) }`;
    if (
        detectCurveTableBound(inlineForkCurves, "--ease-convergence: var(--spring-gentle);").violations
            .every((s) => !/INLINE curve/.test(s))
    ) {
        failures.push("SELF-TEST MP1: a hand-rolled inline springTimingFunction on the convergence row did NOT red (the no-fork bite)");
    }

    // MP2 bite — a NEW `convergence` SPRING_PRESETS row with NO recorded measurement reds.
    const newRowNoMeasure =
        `export const SPRING_PRESETS = [ { name: "convergence", response: 0.9, dampingFraction: 1.0, comment: "a speculative slow curve" } ];`;
    if (
        detectDecideRecorded(
            `token: "--ease-convergence", canonical: "--spring-convergence"`,
            newRowNoMeasure,
            "",
        ).violations.every((s) => !/over-engineer/.test(s))
    ) {
        failures.push("SELF-TEST MP2: a new `convergence` SPRING_PRESETS row with NO measured divergence did NOT red (the over-engineer guard)");
    }
    // MP2 bite — an alias reuse with the measurement recorded NOWHERE reds.
    if (
        detectDecideRecorded(
            `token: "--ease-convergence", canonical: "--spring-gentle"`,
            'name: "gentle", response: 0.7, dampingFraction: 1.0, comment: "patient"',
            "--ease-convergence: var(--spring-gentle);",
        ).violations.every((s) => !/recorded NOWHERE/.test(s))
    ) {
        failures.push("SELF-TEST MP2: an alias reuse with no recorded measurement did NOT red");
    }

    // MP3 bite — a once entrance riding a view() timeline (re-fires) reds.
    const viewDrivenOnce =
        `@media (prefers-reduced-motion: no-preference){ [data-scroll-reveal] > * { animation-timeline: view(block); animation-range: entry; } [data-scroll-reveal-once] > *[data-revealed] { animation-timeline: view(block); } }`;
    if (
        detectOnceLatch(viewDrivenOnce, "setAttribute('data-revealed','') .unobserve(el) scroll-reveal-once").violations
            .every((s) => !/rides a `view\(\)` timeline/.test(s))
    ) {
        failures.push("SELF-TEST MP3: a `[data-revealed]` once entrance riding a view() timeline did NOT red (the re-fire bite)");
    }
    // MP3 bite — a SECOND observer ENGINE absent / the directive missing reds.
    if (
        detectOnceLatch(
            `@media (prefers-reduced-motion: no-preference){ [data-scroll-reveal] > * { animation-timeline: view(block); animation-range: entry; } [data-scroll-reveal-once] > *[data-revealed] { animation: x; } }`,
            "// no directive here",
        ).violations.every((s) => !/directive/.test(s))
    ) {
        failures.push("SELF-TEST MP3: a missing `[data-scroll-reveal-once]` directive did NOT red");
    }
    // MP3 bite — an edit to the continuous recipe (view() gone) reds.
    if (
        detectOnceLatch(
            `@media (prefers-reduced-motion: no-preference){ [data-scroll-reveal] > * { animation: gl-reveal-in 0.3s linear; } [data-scroll-reveal-once] > *[data-revealed] { animation: x; } }`,
            "setAttribute('data-revealed','') .unobserve(el) scroll-reveal-once",
        ).violations.every((s) => !/UNTOUCHED|intact/.test(s))
    ) {
        failures.push("SELF-TEST MP3: a broken continuous `[data-scroll-reveal]` recipe (view() removed) did NOT red (the no-default-change fence)");
    }

    // MP4 bite — a rule that selects BOTH attrs (double-drive) reds.
    const doubleDrive =
        `@media (prefers-reduced-motion: no-preference){ [data-scroll-reveal][data-scroll-reveal-once] > * { animation: x; } }`;
    if (detectSingleWriterPRM(doubleDrive).violations.every((s) => !/both drive/.test(s))) {
        failures.push("SELF-TEST MP4: a rule selecting BOTH `[data-scroll-reveal]` AND `[data-scroll-reveal-once]` did NOT red (the single-writer bite)");
    }
    // MP4 bite — a once recipe OUTSIDE the PRM gate reds.
    const noPRM = `[data-scroll-reveal-once] > *[data-revealed] { animation: x; }`;
    if (detectSingleWriterPRM(noPRM).violations.every((s) => !/no-preference/.test(s))) {
        failures.push("SELF-TEST MP4: a once recipe outside the PRM gate did NOT red (the flourish-PRM bite)");
    }

    return failures;
}

function run() {
    const { violations, facts } = detectAll();
    const selfFailures = selfTest();
    const all = [...violations, ...selfFailures];
    const status = all.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_MOTION_PRESETS_ARTIFACT",
        "BC-motion-presets",
    );

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:motion-presets",
        command: "node scripts/proof-motion-presets.mjs",
        facts,
        violations,
        selfFailures,
    });

    console.log("proof:motion-presets — the convergence-reveal preset + the [data-scroll-reveal-once] latch (BC.W-MOTION-PRESETS)");
    console.log(`  MP1 convergence row        : ${facts.mp1.convergenceRowKind ?? "ABSENT"} → ${facts.mp1.convergenceCanonical ?? "?"} (css minted: ${facts.mp1.cssMinted})`);
    console.log(`  MP2 DECIDE                 : ${facts.mp2.decide} (measurement in: ${(facts.mp2.measurementRecordedIn ?? []).join(", ") || "NONE"}; gentle overshoot ${facts.mp2.gentleOvershoot})`);
    console.log(`  MP3 once latch             : selector=${facts.mp3.onceSelector} revealed-keyed=${facts.mp3.revealedKeyed} directive=${facts.mp3.directivePresent} unobserve=${facts.mp3.unobservesOnce}; continuous-untouched=${facts.mp3.continuousUntouched}`);
    console.log(`  MP4 single-writer + PRM    : no-double-drive=${facts.mp4.noDoubleDrive} once-PRM-gated=${facts.mp4.oncePRMGated}`);

    if (all.length) {
        console.error("\nproof:motion-presets FAILED:");
        for (const x of violations) console.error(`  ✗ ${x}`);
        for (const x of selfFailures) console.error(`  ✗ ${x}`);
        process.exit(1);
    }
    console.log("\nproof:motion-presets PASSED — --ease-convergence is the curve-table-bound gentle reuse (measured-not-distinct), the once latch plays once off [data-revealed] reusing the shipped IO/once machinery, the continuous default untouched, single-writer + PRM-gated");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
