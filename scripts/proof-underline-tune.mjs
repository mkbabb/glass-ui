#!/usr/bin/env node
// proof:underline-tune — BC.W-UNDERLINE-TUNE (Band 3).
//
// The underline tab indicator retuned: the abrupt front-loaded `snappy` glide
// EASED to fill its clock (the BC.W-SPRING-EASE re-derive, owned in lockstep here
// for the indicator-clock half), the squish synced to the eased arrival, and the
// underline (paper/editorial) labels lifted to the √φ display voice (USER-DEFECTS
// §B/§D — "tabs not to spec" + "all animations squishy/quick/coupled, eased not
// abrupt"). This is the device-free SOURCE arm: it proves the indicator spring +
// squish + label-type AT THE TOKENS/CSS (born-RED on the HEAD 55ms-snap-then-sit
// + default-sized labels → GREEN at the fix). The live π paint (the frame-series
// glide on /navigation/tabs) is the ORCHESTRATOR's capture (the spec's π readback
// tests-visual/underline-tune.spec.ts).
//
// FOUR clauses (each born-RED on HEAD, each with a self-test bite):
//   U1 — the snappy curve fills its clock. The committed `--spring-snappy`
//        `linear()` is MID-TRAVEL at the 50% stop (value < ~0.95, still climbing)
//        and is NOT a front-load (it must NOT peak in the first ~20% then run a
//        long dead-flat 1.00000 tail from ~49% on). Cross-checked analytically: the
//        (response, ζ) 90%-travel fraction lands in [0.55, 0.70] (the SAME measure
//        BC.W-SPRING-EASE S1 owns — the indicator-clock half). Born-RED on HEAD's
//        peak-at-16%-then-flat curve. Self-test bite: a planted front-loaded curve reds.
//   U2 — position + squish read ONE matched window. `--tab-indicator-duration`
//        reads `--spring-snappy-duration` (the regen, no fork) AND the
//        INDICATOR_RELEASE_AT_ARRIVAL × clock lands AT the eased curve's arrival
//        (release ≥ the ~99%-travel time AND past the 90%-travel point — the squish
//        peaks during travel, shrinks to fit AT arrival, never mid-glide). Born-RED
//        on a release that fires before arrival (the HEAD 55ms-vs-280ms desync was
//        position-at-16% / squish-at-82%; the eased curve closes it). Self-test bite:
//        a planted release at 0.2 (mid-glide) reds.
//   U2b — the settle clock is intact (NOT truncated) + the coupled channels ride
//        ONE clock. `--spring-snappy-duration` is the generator's ANALYTIC output
//        for (response, ζ) — never a hand-set shorter literal (truncating re-
//        introduces the W-GLASS-CAL tail-jank). The indicator transition legs
//        (the underline ::before slide + scale, the pill glide + scale) ride the
//        SAME `--tab-indicator-duration` + `--spring-snappy` — no per-property
//        timing fork off the shared clock (P3). Self-test bite: a truncated
//        --spring-snappy-duration literal reds; an opacity leg forked off a
//        different clock on the indicator reds.
//   U3 — the regen is single-sourced. The `snappy` curve + duration are GENERATED
//        from SPRING_PRESETS by regen-spring-tokens.mjs (the committed CSS matches
//        the generator output, byte-for-byte) — never hand-edited in scheme-motion.css
//        (proof:spring-tokens-synced stays GREEN; this clause cross-checks the snappy
//        rows). Self-test bite: a hand-edited --spring-snappy diverging from the
//        generated value reds.
//   U4 — the audacious underline labels (the two-voice fence). The
//        `.segmented-tabs--underline .segmented-tab` selector reads a display rung
//        (`--type-subheading` or larger off the √φ ladder) + `--type-tracking-display`
//        (the Apple −1.5% display tracking) — NOT the default 0.8125rem control size
//        with no display tracking. The PILL `.segmented-tab` base KEEPS the small
//        0.8125rem (the pill is a compact control). Born-RED: HEAD's `font-size:
//        inherit` underline label with no display tracking. Self-test bite: a planted
//        default 0.8125rem on the underline label reds; a planted display rung leaking
//        onto the pill base reds.
//
// Device-free SOURCE arm — node scripts/proof-underline-tune.mjs. Tags local/ci/release.

import { readFileSync } from "node:fs";
import { resolve, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import {
    PRESETS,
    generateBlock,
    springSettleDurationSeconds,
} from "./regen-spring-tokens.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const SCHEME_MOTION = resolve(ROOT, "src/styles/tokens/scheme-motion.css");
const SCALE_PAPER = resolve(ROOT, "src/styles/tokens/scale-paper.css");
const SEGMENTED_TABS = resolve(ROOT, "src/styles/segmented-tabs.css");
const TABS_CONSTANTS = resolve(ROOT, "src/components/custom/tabs/constants.ts");

// ── The clock-fill band (U1) — the SAME measure BC.W-SPRING-EASE S1 owns; this
//    gate cross-checks the indicator-clock half. A front-loaded control reaches
//    0.9 in a small fraction of its long settle window; an eased control spreads
//    the travel so the 90%-point lands mid-clock.
const SNAPPY_90_TRAVEL_BAND = [0.55, 0.7];
// U1 — the CSS-curve front-load discriminator. The `--spring-snappy` `linear()`
// is settle-normalized (its % axis IS the per-spring clock — `springLinearStops`),
// so a front-loaded curve has ALREADY ARRIVED (value ≈ 1.0) in the FIRST tenth of
// its axis (the abrupt snap), whereas the eased curve is still CLIMBING there. The
// value at the ~12% stop is the bite: EASED (0.42/0.78) ≈ 0.915 (mid-glide); HEAD
// (0.35/0.65) ≈ 0.9998 (already at peak — the snap); the (0.25/0.55) front-load
// bite ≈ 1.078 (already overshot). A ceiling of 0.96 separates the eased glide from
// the front-loaded snap.
const SNAPPY_EARLY_STOP_PCT = 12; // the early-clock probe position.
const SNAPPY_EARLY_STOP_CEIL = 0.96; // the eased curve is still climbing below this.

// ── analytic spring metrics — the SAME convention the generator + spring-ease use
//    (ωₙ = 2π/response, the iOS/Apple `response` solver input). No second math source.
function stepResponse(t, response, zeta) {
    const w = (2 * Math.PI) / response;
    if (zeta >= 1) return 1 - Math.exp(-w * t) * (1 + w * t);
    const wd = w * Math.sqrt(1 - zeta * zeta);
    const env = Math.exp(-zeta * w * t);
    return 1 - env * (Math.cos(wd * t) + (zeta / Math.sqrt(1 - zeta * zeta)) * Math.sin(wd * t));
}
function firstReachTime(target, response, zeta) {
    const dt = 1e-5;
    for (let t = 0; t < 10; t += dt) {
        if (stepResponse(t, response, zeta) >= target) return t;
    }
    return Infinity;
}
function ninetyTravelFraction(response, zeta) {
    const clock = springSettleDurationSeconds({ response, dampingFraction: zeta });
    return firstReachTime(0.9, response, zeta) / clock;
}
/** The fraction of the clock at which the curve first reaches `target` travel. */
function travelFraction(target, response, zeta) {
    const clock = springSettleDurationSeconds({ response, dampingFraction: zeta });
    return firstReachTime(target, response, zeta) / clock;
}

function read(path) {
    try {
        return readFileSync(path, "utf8");
    } catch {
        return null;
    }
}

function presetByName(presets, name) {
    return presets.find((p) => p.name === name);
}

/** Parse a `--spring-<name>: linear(…)` declaration into [{value, pct}] stops. */
function parseLinearStops(src, name) {
    const m = src.match(new RegExp(`--spring-${name}:\\s*linear\\(([^)]*)\\)`));
    if (!m) return null;
    const stops = [];
    for (const raw of m[1].split(",")) {
        const parts = raw.trim().split(/\s+/);
        const value = Number.parseFloat(parts[0]);
        // a stop is "value pct%" or a bare "value" (the 0 and 1 endpoints). The
        // endpoints get implicit 0% / 100% positions.
        let pct = null;
        if (parts[1] && parts[1].endsWith("%")) pct = Number.parseFloat(parts[1]);
        stops.push({ value, pct });
    }
    // assign implicit endpoint positions (first=0%, last=100%).
    if (stops.length && stops[0].pct == null) stops[0].pct = 0;
    if (stops.length && stops[stops.length - 1].pct == null) stops[stops.length - 1].pct = 100;
    return stops;
}

/** Linear-interpolate the curve value at a given percent position. */
function valueAtPct(stops, targetPct) {
    let prev = stops[0];
    for (const s of stops) {
        if (s.pct == null) continue;
        if (s.pct >= targetPct) {
            if (s.pct === prev.pct) return s.value;
            const f = (targetPct - prev.pct) / (s.pct - prev.pct);
            return prev.value + f * (s.value - prev.value);
        }
        prev = s;
    }
    return stops[stops.length - 1].value;
}

// ──────────────────────────────────────────────────────────────────────────────
// U1 — the snappy curve fills its clock (NOT a front-load).
export function detectClockFill(presets, schemeSrc) {
    const v = [];
    const facts = {};
    const snappy = presetByName(presets, "snappy");
    if (!snappy) {
        v.push("U1: no `snappy` SPRING_PRESETS row");
        return { facts, violations: v };
    }
    facts.snappyPair = [snappy.response, snappy.dampingFraction];

    // (a) analytic clock-fill: the 90%-travel fraction lands mid-clock (the
    // indicator-clock half of BC.W-SPRING-EASE S1).
    const frac = ninetyTravelFraction(snappy.response, snappy.dampingFraction);
    facts.snappy90TravelFraction = Math.round(frac * 1e4) / 1e4;
    const [lo, hi] = SNAPPY_90_TRAVEL_BAND;
    if (frac < lo || frac > hi) {
        v.push(
            `U1: snappy (${snappy.response}, ${snappy.dampingFraction}) 90%-travel fraction ${facts.snappy90TravelFraction} is OUTSIDE the clock-fill band [${lo}, ${hi}] — the curve ${frac < lo ? "FRONT-LOADS (the abrupt 55ms-snap-then-sit)" : "drags past the clock"}`,
        );
    }

    // (b) the committed CSS curve is still CLIMBING in the first tenth of its
    // settle-normalized axis (not already arrived ≈ 1.0 like the HEAD front-loaded
    // snap). The early-stop value is the abrupt-vs-glide bite (see the const note).
    if (schemeSrc == null) {
        v.push("U1: cannot read scheme-motion.css");
        return { facts, violations: v };
    }
    const stops = parseLinearStops(schemeSrc, "snappy");
    if (!stops) {
        v.push("U1: `--spring-snappy: linear(…)` was not found in scheme-motion.css");
        return { facts, violations: v };
    }
    const early = valueAtPct(stops, SNAPPY_EARLY_STOP_PCT);
    facts.snappyValueAtEarlyStop = Math.round(early * 1e5) / 1e5;
    facts.snappyEarlyStopPct = SNAPPY_EARLY_STOP_PCT;
    if (early >= SNAPPY_EARLY_STOP_CEIL) {
        v.push(
            `U1: the committed --spring-snappy is ${facts.snappyValueAtEarlyStop} at its ${SNAPPY_EARLY_STOP_PCT}% stop (≥ ${SNAPPY_EARLY_STOP_CEIL}) — it has ALREADY ARRIVED in the first tenth of its clock (the front-loaded 55ms-snap-then-sit), it does not glide across the window`,
        );
    }
    return { facts, violations: v };
}

// ──────────────────────────────────────────────────────────────────────────────
// U2 — position + squish read ONE matched window.
export function detectMatchedWindow(presets, scaleSrc, schemeSrc, constantsSrc) {
    const v = [];
    const facts = {};
    const snappy = presetByName(presets, "snappy");

    // (a) --tab-indicator-duration reads --spring-snappy-duration (no fork).
    if (scaleSrc == null) {
        v.push("U2: cannot read scale-paper.css");
    } else {
        const readsClock = /--tab-indicator-duration:\s*var\(\s*--spring-snappy-duration\s*\)/.test(scaleSrc);
        facts.tabIndicatorReadsSnappyClock = readsClock;
        if (!readsClock) {
            v.push(
                "U2: --tab-indicator-duration does NOT read var(--spring-snappy-duration) — the indicator clock forked off the calibrated snappy settle",
            );
        }
    }

    // (b) INDICATOR_RELEASE_AT_ARRIVAL × clock lands AT the eased curve's arrival:
    //     release ≥ the ~99%-travel time (the squish releases AT arrival, never
    //     before) AND release > the 90%-travel point (it does not fire mid-glide).
    if (constantsSrc == null) {
        v.push("U2: cannot read tabs/constants.ts");
    } else if (!snappy) {
        v.push("U2: no `snappy` row to derive the arrival fraction");
    } else {
        const m = constantsSrc.match(/INDICATOR_RELEASE_AT_ARRIVAL\s*=\s*([\d.]+)/);
        if (!m) {
            v.push("U2: INDICATOR_RELEASE_AT_ARRIVAL const not found in tabs/constants.ts");
        } else {
            const releaseFrac = Number.parseFloat(m[1]);
            const arrivalFrac = travelFraction(0.99, snappy.response, snappy.dampingFraction);
            const ninetyFrac = travelFraction(0.9, snappy.response, snappy.dampingFraction);
            facts.releaseFraction = releaseFrac;
            facts.arrivalFraction = Math.round(arrivalFrac * 1e4) / 1e4;
            facts.ninetyFraction = Math.round(ninetyFrac * 1e4) / 1e4;
            // the squish must release AT-or-after arrival (so the stretch shrinks to
            // fit AT arrival, never before — the constant's own docstring) …
            if (releaseFrac < arrivalFrac) {
                v.push(
                    `U2: INDICATOR_RELEASE_AT_ARRIVAL ${releaseFrac} releases the squish BEFORE the eased curve's ~99%-arrival (${facts.arrivalFraction} of clock) — the stretch would shrink mid-glide (the desync), not AT arrival`,
                );
            }
            // … and it must be past the 90%-travel point (not a mid-glide release).
            if (releaseFrac <= ninetyFrac) {
                v.push(
                    `U2: INDICATOR_RELEASE_AT_ARRIVAL ${releaseFrac} fires at/before the 90%-travel point (${facts.ninetyFraction} of clock) — that is a mid-glide release (the squish never reaches arrival)`,
                );
            }
        }
    }
    return { facts, violations: v };
}

// ──────────────────────────────────────────────────────────────────────────────
// U2b — the settle clock is intact (NOT truncated) + the coupled channels ride ONE
// clock (no per-property timing fork on the indicator transition legs).
export function detectClockIntact(presets, schemeSrc, segmentedSrc) {
    const v = [];
    const facts = {};
    const snappy = presetByName(presets, "snappy");

    // (a) --spring-snappy-duration is the analytic 2%-band settle — never a hand value.
    if (schemeSrc == null) {
        v.push("U2b: cannot read scheme-motion.css");
    } else if (snappy) {
        const analytic = springSettleDurationSeconds(snappy);
        facts.snappyAnalyticClock = analytic;
        const m = schemeSrc.match(/--spring-snappy-duration:\s*([\d.]+)s/);
        if (!m) {
            v.push("U2b: no --spring-snappy-duration token in scheme-motion.css");
        } else {
            const emitted = Number.parseFloat(m[1]);
            facts.snappyEmittedClock = emitted;
            if (Math.abs(emitted - analytic) > 1e-9) {
                v.push(
                    `U2b: --spring-snappy-duration ${emitted}s is NOT the analytic 2%-band settle ${analytic}s — a hand-truncated clock re-introduces the W-GLASS-CAL tail-jank ("quick" is the early arrival, not a shorter clock)`,
                );
            }
        }
    }

    // (b) the indicator transition legs ride the SAME --tab-indicator-duration +
    //     --spring-snappy (no per-property timing fork off the shared clock). We scan
    //     the indicator-family transition declarations: every SPATIAL leg
    //     (inset/scale/transform/width/height) must read --tab-indicator-duration +
    //     --spring-snappy. (An EFFECTS opacity leg may ride the fast generic clock —
    //     a colour/alpha cross-fade is a bezier, motion-canon P1; but it must NOT
    //     claim to BE the indicator spring on a different clock.)
    if (segmentedSrc == null) {
        v.push("U2b: cannot read segmented-tabs.css");
    } else {
        const SPATIAL = ["inset", "scale", "transform", "width", "height"];
        // every spatial-leg occurrence inside a `transition:` on an indicator selector
        // pairs --tab-indicator-duration + --spring-snappy.
        const stripped = segmentedSrc.replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, " "));
        const transRe = /transition\s*:\s*([^;}]+)[;}]/gi;
        let tm;
        let spatialLegs = 0;
        let forkedLegs = 0;
        while ((tm = transRe.exec(stripped)) !== null) {
            for (const leg of tm[1].split(",")) {
                const tokens = leg.trim().split(/\s+/).filter(Boolean);
                if (!tokens.length) continue;
                const prop = tokens[0].toLowerCase();
                if (!SPATIAL.includes(prop)) continue;
                spatialLegs++;
                const ridesClock = /var\(\s*--tab-indicator-duration\s*\)/.test(leg);
                const ridesSpring = /var\(\s*--spring-snappy\s*\)/.test(leg);
                if (!ridesClock || !ridesSpring) {
                    forkedLegs++;
                    v.push(
                        `U2b: an indicator SPATIAL transition leg '${prop}' does NOT ride --tab-indicator-duration + --spring-snappy ("${leg.trim().slice(0, 60)}") — a per-property timing fork off the shared clock (P3 desync)`,
                    );
                }
            }
        }
        facts.indicatorSpatialLegs = spatialLegs;
        facts.forkedLegs = forkedLegs;
    }
    return { facts, violations: v };
}

// ──────────────────────────────────────────────────────────────────────────────
// U3 — the regen is single-sourced (the committed snappy curve + duration match the
// generator output, byte-for-byte; never hand-edited).
export function detectSingleSource(schemeSrc) {
    const v = [];
    const facts = {};
    if (schemeSrc == null) {
        v.push("U3: cannot read scheme-motion.css");
        return { facts, violations: v };
    }
    const generated = generateBlock();
    const snappyLine = generated
        .split("\n")
        .find((l) => /--spring-snappy:\s*linear\(/.test(l));
    if (!snappyLine) {
        v.push("U3: the generator did not emit a --spring-snappy line");
    } else {
        const match = schemeSrc.includes(snappyLine.trim());
        facts.snappyCurveMatchesGenerator = match;
        if (!match) {
            v.push(
                "U3: the committed --spring-snappy curve is DRIFTED from the generator output (run `node scripts/regen-spring-tokens.mjs` + commit) — proof:spring-tokens-synced would red",
            );
        }
    }
    return { facts, violations: v };
}

// ──────────────────────────────────────────────────────────────────────────────
// U4 — the audacious underline labels (the two-voice fence).
export function detectAudaciousLabels(segmentedSrc) {
    const v = [];
    const facts = {};
    if (segmentedSrc == null) {
        v.push("U4: cannot read segmented-tabs.css");
        return { facts, violations: v };
    }

    // The display rungs that count as "audacious" — the √φ subheading rung OR any
    // larger display/title rung. (NOT the small control sizes.)
    const DISPLAY_RUNGS =
        /var\(\s*--type-(subheading|heading|title|display-[a-z0-9]+)\s*\)/;

    // (a) the underline label selector carries a display rung + display tracking.
    const underlineBlock = segmentedSrc.match(
        /\.segmented-tabs--underline\s+\.segmented-tab\s*\{([^}]*)\}/,
    );
    if (!underlineBlock) {
        v.push("U4: the `.segmented-tabs--underline .segmented-tab` rule was not found");
    } else {
        const body = underlineBlock[1];
        const fontSizeMatch = body.match(/font-size:\s*([^;]+);/);
        const hasDisplayRung = fontSizeMatch && DISPLAY_RUNGS.test(fontSizeMatch[1]);
        const hasDisplayTracking = /letter-spacing:\s*var\(\s*--type-tracking-display\s*\)/.test(body);
        facts.underlineFontSize = fontSizeMatch ? fontSizeMatch[1].trim() : null;
        facts.underlineHasDisplayTracking = hasDisplayTracking;
        if (!hasDisplayRung) {
            v.push(
                `U4: the underline label font-size (${facts.underlineFontSize ?? "unset/inherit"}) is NOT a √φ display rung (--type-subheading / heading / title / display-*) — the editorial nav reads default-sized, not audacious`,
            );
        }
        if (!hasDisplayTracking) {
            v.push(
                "U4: the underline label does NOT read --type-tracking-display (the Apple −1.5% display tracking) — the BB.W-DISPLAY-TRACKING ladder is not applied",
            );
        }
    }

    // (b) the two-voice fence: the PILL `.segmented-tab` base KEEPS the small control
    //     size (a display rung must NOT leak onto the pill base).
    const pillBlock = segmentedSrc.match(/(?:^|\n)\.segmented-tab\s*\{([^}]*)\}/);
    if (!pillBlock) {
        v.push("U4: the base `.segmented-tab` rule (the pill control) was not found");
    } else {
        const body = pillBlock[1];
        const fontSizeMatch = body.match(/font-size:\s*([^;]+);/);
        facts.pillFontSize = fontSizeMatch ? fontSizeMatch[1].trim() : null;
        const pillKeepsSmall = fontSizeMatch && /0\.8125rem/.test(fontSizeMatch[1]);
        const pillLeaksDisplay = fontSizeMatch && DISPLAY_RUNGS.test(fontSizeMatch[1]);
        if (!pillKeepsSmall) {
            v.push(
                `U4: the PILL base .segmented-tab font-size (${facts.pillFontSize ?? "unset"}) is NOT the small 0.8125rem control size — the two-voice fence broke (the pill must stay a compact control)`,
            );
        }
        if (pillLeaksDisplay) {
            v.push(
                "U4: a √φ display rung LEAKED onto the PILL base .segmented-tab — the audacious voice belongs to the UNDERLINE labels only (the two-voice fence)",
            );
        }
    }
    return { facts, violations: v };
}

// ──────────────────────────────────────────────────────────────────────────────
export function detectAll({ presets, schemeSrc, scaleSrc, segmentedSrc, constantsSrc } = {}) {
    const p = presets ?? PRESETS;
    const scheme = schemeSrc ?? read(SCHEME_MOTION);
    const scale = scaleSrc ?? read(SCALE_PAPER);
    const segmented = segmentedSrc ?? read(SEGMENTED_TABS);
    const constants = constantsSrc ?? read(TABS_CONSTANTS);

    const u1 = detectClockFill(p, scheme);
    const u2 = detectMatchedWindow(p, scale, scheme, constants);
    const u2b = detectClockIntact(p, scheme, segmented);
    const u3 = detectSingleSource(scheme);
    const u4 = detectAudaciousLabels(segmented);

    const violations = [
        ...u1.violations,
        ...u2.violations,
        ...u2b.violations,
        ...u3.violations,
        ...u4.violations,
    ];
    return {
        violations,
        facts: { u1: u1.facts, u2: u2.facts, u2b: u2b.facts, u3: u3.facts, u4: u4.facts },
    };
}

// ── the inline self-test bites (the gate proves its own bite every run) ──────────
function selfTest() {
    const failures = [];
    const realScheme = read(SCHEME_MOTION);
    const realScale = read(SCALE_PAPER);
    const realSegmented = read(SEGMENTED_TABS);
    const realConstants = read(TABS_CONSTANTS);

    // U1 bite — a planted front-loaded snappy reds: BOTH the analytic 90%-travel
    // (0.25/0.55 front-loads, fraction < 0.55) AND the CSS-curve early-stop (already
    // arrived ≈ 1.0 by 12%). The HEAD-shape curve climbs to ≈1.0 in the first tenth.
    const frontLoadedCurve =
        "--spring-snappy: linear(0, 0.6 4%, 0.9 8%, 0.999 12%, 1.0068 16%, 1.0 50%, 1.00000 99%, 1);";
    const frontLoadedPresets = PRESETS.map((p) =>
        p.name === "snappy" ? { ...p, response: 0.25, dampingFraction: 0.55 } : p,
    );
    if (
        detectClockFill(frontLoadedPresets, frontLoadedCurve).violations.length === 0
    ) {
        failures.push("SELF-TEST U1: a planted front-loaded snappy (0.25/0.55, arrived ≈1.0 by 12%) did NOT red");
    }

    // U2 bite — a release at 0.2 (mid-glide) reds against the eased curve's arrival.
    const midGlideConstants = "export const INDICATOR_RELEASE_AT_ARRIVAL = 0.2;";
    if (
        detectMatchedWindow(PRESETS, realScale, realScheme, midGlideConstants).violations.length === 0
    ) {
        failures.push("SELF-TEST U2: a planted INDICATOR_RELEASE_AT_ARRIVAL = 0.2 (mid-glide) did NOT red");
    }
    // U2 bite — a forked --tab-indicator-duration (off a non-snappy clock) reds.
    const forkedScale = "--tab-indicator-duration: var(--duration-normal);";
    if (
        detectMatchedWindow(PRESETS, forkedScale, realScheme, realConstants).violations.length === 0
    ) {
        failures.push("SELF-TEST U2: a --tab-indicator-duration forked off --duration-normal did NOT red");
    }

    // U2b bite — a hand-truncated --spring-snappy-duration reds against the analytic.
    const truncatedScheme = (realScheme ?? "").replace(
        /--spring-snappy-duration:\s*[\d.]+s/,
        "--spring-snappy-duration: 0.15s",
    );
    if (
        detectClockIntact(PRESETS, truncatedScheme, realSegmented).violations.every(
            (s) => !/snappy-duration 0\.15s/.test(s),
        )
    ) {
        failures.push("SELF-TEST U2b: a hand-truncated --spring-snappy-duration: 0.15s did NOT red against the analytic");
    }
    // U2b bite — a per-property fork (an indicator inset leg on a non-snappy clock) reds.
    const forkedLegSegmented =
        ".segmented-indicator { transition: inset var(--duration-normal) ease, scale var(--tab-indicator-duration) var(--spring-snappy); }";
    if (
        detectClockIntact(PRESETS, realScheme, forkedLegSegmented).violations.length === 0
    ) {
        failures.push("SELF-TEST U2b: a planted indicator inset leg forked off --duration-normal/ease did NOT red");
    }

    // U3 bite — a hand-edited --spring-snappy diverging from the generator reds.
    const driftedScheme = (realScheme ?? "").replace(
        /--spring-snappy:\s*linear\([^)]*\)/,
        "--spring-snappy: linear(0, 0.5 50%, 1)",
    );
    if (detectSingleSource(driftedScheme).violations.length === 0) {
        failures.push("SELF-TEST U3: a hand-edited --spring-snappy diverging from the generator did NOT red");
    }

    // U4 bite — a default 0.8125rem on the underline label (no display rung) reds.
    const defaultUnderline = (realSegmented ?? "").replace(
        /(\.segmented-tabs--underline\s+\.segmented-tab\s*\{)([^}]*)(\})/,
        "$1 padding: 0.375rem 0.75rem; font-size: 0.8125rem; $3",
    );
    if (detectAudaciousLabels(defaultUnderline).violations.length === 0) {
        failures.push("SELF-TEST U4: a planted default 0.8125rem underline label (no display rung) did NOT red");
    }
    // U4 bite — a display rung leaking onto the PILL base reds the two-voice fence.
    const leakedPill = (realSegmented ?? "").replace(
        /(\n\.segmented-tab\s*\{)([^}]*?)(font-size:\s*0\.8125rem;)/,
        "$1$2font-size: var(--type-subheading);",
    );
    if (detectAudaciousLabels(leakedPill).violations.every((s) => !/LEAKED/.test(s))) {
        failures.push("SELF-TEST U4: a √φ display rung leaked onto the PILL base did NOT red the two-voice fence");
    }

    return failures;
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_UNDERLINE_TUNE_ARTIFACT", "BC-underline-tune");
    const { violations, facts } = detectAll();
    const selfFailures = selfTest();
    const all = [...violations, ...selfFailures];
    const status = all.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:underline-tune",
        facts,
        violations,
        selfTestFailures: selfFailures,
    });

    console.log("proof:underline-tune — the eased indicator glide + synced squish + audacious underline labels (U1-U4) + self-test bites");
    console.log(`  U1 snappy 90%-travel fraction: ${facts.u1.snappy90TravelFraction} (band [${SNAPPY_90_TRAVEL_BAND.join(", ")}]) · value@${facts.u1.snappyEarlyStopPct}%-stop: ${facts.u1.snappyValueAtEarlyStop}`);
    console.log(`  U2 release/arrival/90%: ${facts.u2.releaseFraction} / ${facts.u2.arrivalFraction} / ${facts.u2.ninetyFraction}  (release ≥ arrival > 90%)`);
    console.log(`  U2b snappy clock (emitted/analytic): ${facts.u2b.snappyEmittedClock}s / ${facts.u2b.snappyAnalyticClock}s · indicator spatial legs: ${facts.u2b.indicatorSpatialLegs} (forked: ${facts.u2b.forkedLegs})`);
    console.log(`  U3 snappy curve matches generator: ${facts.u3.snappyCurveMatchesGenerator}`);
    console.log(`  U4 underline font-size: ${facts.u4.underlineFontSize} · display tracking: ${facts.u4.underlineHasDisplayTracking} · pill keeps: ${facts.u4.pillFontSize}`);

    if (all.length) {
        console.error("\nproof:underline-tune FAILED:");
        for (const x of violations) console.error(`  ✗ ${x}`);
        for (const x of selfFailures) console.error(`  ✗ ${x}`);
        process.exit(1);
    }
    console.log(`\nproof:underline-tune PASSED — the snappy glide fills its clock, the squish releases AT arrival on ONE matched window, the clock is the un-truncated analytic settle single-sourced from SPRING_PRESETS, and the underline labels carry the √φ display voice (pill stays compact).`);
    console.log(`  artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
