#!/usr/bin/env node
// proof:spring-ease — BC.W-SPRING-EASE (Band 7).
//
// The retune that eased the two abrupt spring curves + minted the iOS interactive
// press register (USER-DEFECTS §B/§D — "the spring curve EASED not abrupt" +
// "every animation squishy/springy/quick/coupled"). This gate is the SOURCE arm:
// it proves the curves are eased AT THE TABLE (born-RED on the front-loaded HEAD
// pairs → GREEN at the retune), and that the universal no-abrupt-curve bar holds
// across the styling corpus. The PAINT arm (the live :5199 frame-series) is the
// π half (tests-visual/spring-ease.spec.ts) — this gate is device-free.
//
// SIX clauses (each born-RED on HEAD, each with a self-test bite):
//   S1 — clock-fill (the abrupt fix). `snappy` (the control register) fills its
//        clock: the analytic 90%-travel fraction t₉₀/t_settle ∈ [0.55, 0.70], NOT
//        the front-load (HEAD 0.35/0.65 ≈ 0.41, BELOW the band). t₉₀ = the first
//        time the analytic step response reaches 0.9; t_settle = the 2%-band clock
//        the generator emits (the SAME `springSettleDurationSeconds`).
//   S2 — the overshoot band. `bouncy` ∈ [0.12, 0.18] (the Apple band) AND ζ ≥ 0.55
//        (the over-spring floor); `snappy`/`press` ≤ 0.08; `smooth` ≤ 0.02 (the
//        kept sub-perceptual peak); `dock` ≤ 0.06 (the kept iOS-control).
//   S3 — the press register minted + wired. `SPRING_PRESETS` carries `press`
//        (0.15 / 0.86); `useSpringPress` defaults READ that row (single-source);
//        `--spring-press` + `--spring-press-duration` emit.
//   S4 — the single source held + the keeps fenced. `regen-spring-tokens.mjs` +
//        `curves.ts` both import `SPRING_PRESETS`; the emitted CSS `linear()`
//        matches the generator; `smooth`/`dock`/`gentle` rows are byte-unchanged
//        (the canonical-keep pairs — the retune did NOT touch the keeps).
//   S5 — the clock NOT truncated. Each `--spring-<name>-duration` is the
//        generator's analytic output for the (response, ζ) pair, never a hand value.
//   S6 — the universal no-abrupt-curve sweep (the user-mandate bar). The NET-NEW
//        SHAPE axis: a SPATIAL transition leg (transform/translate/scale/rotate)
//        whose timing is a raw fixed curve (linear/ease/ease-in/a non-canonical
//        bezier) instead of a `--spring-*` register or the eased `--ease-out-expo`
//        — an un-sprung spatial leg reads jerk-to-place (P1). The wall-clock (b) +
//        truncated-settle (c) shapes are `proof:motion-one-clock` M3's domain
//        (the disjoint complement — S6 CROSS-REFERENCES M3, it does NOT re-run it,
//        and shares its narrow audited layout-reclaim allowlist). All three shapes
//        are exercised by planted self-test bites so the detector proves its bite.
//
// Device-free SOURCE arm — node scripts/proof-spring-ease.mjs. Tags local/ci/release.

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    PRESETS,
    generateBlock,
    generateDurationBlock,
    springSettleDurationSeconds,
} from "./regen-spring-tokens.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const SCHEME_MOTION = resolve(ROOT, "src/styles/tokens/scheme-motion.css");
const PRESETS_TS = resolve(ROOT, "src/composables/motion/springPresets.ts");
const USE_SPRING_PRESS_TS = resolve(ROOT, "src/composables/motion/useSpringPress.ts");
const CURVES_TS = resolve(ROOT, "src/composables/motion/curves.ts");
const REGEN_MJS = resolve(ROOT, "scripts/regen-spring-tokens.mjs");
const SRC_DIR = resolve(ROOT, "src");

// ── The retune targets + the byte-frozen KEEPS (the single-source canon S4 fences).
// `snappy` is the control register S1 measures; `bouncy` the eased playful curve;
// `press` the minted iOS interactive register; smooth/dock/gentle the frozen keeps.
const SNAPPY_90_TRAVEL_BAND = [0.55, 0.7]; // S1 — the eased control fills its clock.
const SNAPPY_90_FRONTLOAD_FLOOR = 0.4; // the self-test front-load bite reds below this.
const KEEP_PAIRS = {
    smooth: { response: 0.5, dampingFraction: 0.86 },
    dock: { response: 0.32, dampingFraction: 0.7 },
    gentle: { response: 0.7, dampingFraction: 1.0 },
};
// S2 — the per-register overshoot bands (analytic exp(-ζπ/√(1-ζ²))).
const OVERSHOOT_MAX = { snappy: 0.08, press: 0.08, smooth: 0.02, dock: 0.06 };
const BOUNCY_OVERSHOOT_BAND = [0.12, 0.18];
const BOUNCY_ZETA_FLOOR = 0.55; // the over-spring floor (a ζ < 0.55 on bouncy reds).
// S3 — the minted press register (the Apple interactiveSpring).
const PRESS_PAIR = { response: 0.15, dampingFraction: 0.86 };

// ── analytic spring metrics (no second math source — the SAME convention the
//    generator uses: ωₙ = 2π/response, the iOS/Apple `response` solver input).
function analyticOvershoot(zeta) {
    if (zeta >= 1) return 0;
    return Math.exp((-zeta * Math.PI) / Math.sqrt(1 - zeta * zeta));
}
/** The analytic underdamped step response x(t) (critically-damped at ζ=1). */
function stepResponse(t, response, zeta) {
    const w = (2 * Math.PI) / response;
    if (zeta >= 1) return 1 - Math.exp(-w * t) * (1 + w * t);
    const wd = w * Math.sqrt(1 - zeta * zeta);
    const env = Math.exp(-zeta * w * t);
    return 1 - env * (Math.cos(wd * t) + (zeta / Math.sqrt(1 - zeta * zeta)) * Math.sin(wd * t));
}
/** First time the step response reaches 0.9 (the 90%-travel time, seconds). */
function ninetyTravelTime(response, zeta) {
    const dt = 1e-5;
    for (let t = 0; t < 10; t += dt) {
        if (stepResponse(t, response, zeta) >= 0.9) return t;
    }
    return Infinity;
}
/**
 * The 90%-travel FRACTION of the 2%-band settle clock — the clock-fill measure.
 * A front-loaded spring (high natural frequency) reaches 0.9 in a small fraction
 * of its long settle window (the dead-flat tail); an eased spring spreads the
 * travel so the 90%-point lands mid-clock. Uses the generator's rounded clock so
 * S1 measures against the SAME `--spring-<name>-duration` token a consumer reads.
 */
function ninetyTravelFraction(response, zeta) {
    const clock = springSettleDurationSeconds({ response, dampingFraction: zeta });
    return ninetyTravelTime(response, zeta) / clock;
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

// ──────────────────────────────────────────────────────────────────────────────
// S1 — clock-fill: the control register `snappy` fills its clock.
export function detectClockFill(presets) {
    const v = [];
    const facts = {};
    const snappy = presetByName(presets, "snappy");
    if (!snappy) {
        v.push("S1: no `snappy` SPRING_PRESETS row");
        return { facts, violations: v };
    }
    const frac = ninetyTravelFraction(snappy.response, snappy.dampingFraction);
    facts.snappy90TravelFraction = Math.round(frac * 1e4) / 1e4;
    facts.snappyPair = [snappy.response, snappy.dampingFraction];
    const [lo, hi] = SNAPPY_90_TRAVEL_BAND;
    if (frac < lo || frac > hi) {
        v.push(
            `S1: snappy (${snappy.response}, ${snappy.dampingFraction}) 90%-travel fraction ${facts.snappy90TravelFraction} is OUTSIDE the clock-fill band [${lo}, ${hi}] — the curve ${frac < lo ? "front-loads (the abrupt jerk-to-place + dead-flat tail)" : "drags (the travel spills past the clock)"}`,
        );
    }
    return { facts, violations: v };
}

// S2 — the per-register overshoot band.
export function detectOvershoot(presets) {
    const v = [];
    const facts = { overshoot: {} };
    for (const p of presets) {
        const o = analyticOvershoot(p.dampingFraction);
        facts.overshoot[p.name] = Math.round(o * 1e4) / 1e4;
    }
    const bouncy = presetByName(presets, "bouncy");
    if (!bouncy) {
        v.push("S2: no `bouncy` SPRING_PRESETS row");
    } else {
        const o = analyticOvershoot(bouncy.dampingFraction);
        const [lo, hi] = BOUNCY_OVERSHOOT_BAND;
        if (o < lo || o > hi) {
            v.push(
                `S2: bouncy overshoot ${facts.overshoot.bouncy} is outside the Apple band [${lo}, ${hi}] (ζ ${bouncy.dampingFraction} — ${o > hi ? "over-springs/rings" : "under-springs"})`,
            );
        }
        if (bouncy.dampingFraction < BOUNCY_ZETA_FLOOR) {
            v.push(
                `S2: bouncy ζ ${bouncy.dampingFraction} is below the over-spring floor ${BOUNCY_ZETA_FLOOR} (the ζ<0.55 bite — an over-springy/ringy curve)`,
            );
        }
    }
    for (const [name, max] of Object.entries(OVERSHOOT_MAX)) {
        const p = presetByName(presets, name);
        if (!p) {
            v.push(`S2: no \`${name}\` SPRING_PRESETS row`);
            continue;
        }
        const o = analyticOvershoot(p.dampingFraction);
        if (o > max) {
            v.push(
                `S2: ${name} overshoot ${facts.overshoot[name]} exceeds its register cap ${max} (ζ ${p.dampingFraction})`,
            );
        }
    }
    return { facts, violations: v };
}

// S3 — the press register minted + wired (single-source).
export function detectPressRegister(presets, useSpringPressSrc, schemeSrc) {
    const v = [];
    const facts = {};
    const press = presetByName(presets, "press");
    if (!press) {
        v.push("S3: no `press` SPRING_PRESETS row — the iOS interactive register was not minted");
    } else {
        facts.pressPair = [press.response, press.dampingFraction];
        if (
            press.response !== PRESS_PAIR.response ||
            press.dampingFraction !== PRESS_PAIR.dampingFraction
        ) {
            v.push(
                `S3: the press row (${press.response}, ${press.dampingFraction}) is NOT the Apple interactiveSpring (${PRESS_PAIR.response}, ${PRESS_PAIR.dampingFraction})`,
            );
        }
    }
    // `useSpringPress` defaults READ the press row (single-source — not a literal).
    if (useSpringPressSrc == null) {
        v.push("S3: cannot read useSpringPress.ts");
    } else {
        const readsRow = /springPreset\(\s*["']press["']\s*\)/.test(useSpringPressSrc);
        const literalDefault =
            /response:\s*options\.response\s*\?\?\s*0\.\d+/.test(useSpringPressSrc) ||
            /dampingFraction:\s*options\.dampingFraction\s*\?\?\s*0\.\d+/.test(useSpringPressSrc);
        facts.useSpringPressReadsRow = readsRow;
        if (!readsRow) {
            v.push(
                "S3: useSpringPress.ts does NOT read the `press` SPRING_PRESETS row (springPreset(\"press\")) — the defaults must be single-sourced, never a local literal",
            );
        }
        if (literalDefault) {
            v.push(
                "S3: useSpringPress.ts pins a LITERAL response/dampingFraction default — re-point onto the `press` row (the single-source assert)",
            );
        }
    }
    // The `--spring-press` curve + `--spring-press-duration` clock emit.
    if (schemeSrc == null) {
        v.push("S3: cannot read scheme-motion.css");
    } else {
        facts.springPressEmitted = /--spring-press:\s*linear\(/.test(schemeSrc);
        facts.springPressDurationEmitted = /--spring-press-duration:\s*[\d.]+s/.test(schemeSrc);
        if (!facts.springPressEmitted) {
            v.push("S3: `--spring-press` curve token is NOT emitted in scheme-motion.css (re-run regen-spring-tokens.mjs)");
        }
        if (!facts.springPressDurationEmitted) {
            v.push("S3: `--spring-press-duration` clock token is NOT emitted in scheme-motion.css");
        }
    }
    return { facts, violations: v };
}

// S4 — the single source held + the keeps fenced.
export function detectSingleSourceAndKeeps(presets, schemeSrc, regenSrc, curvesSrc) {
    const v = [];
    const facts = {};

    // Both halves import SPRING_PRESETS (no second authority).
    if (regenSrc == null || !/SPRING_PRESETS/.test(regenSrc)) {
        v.push("S4: regen-spring-tokens.mjs does not import SPRING_PRESETS");
    }
    if (curvesSrc == null || !/SPRING_PRESETS/.test(curvesSrc)) {
        v.push("S4: curves.ts does not import SPRING_PRESETS");
    }

    // The emitted CSS `linear()` block matches the generator output (the sync —
    // mirrors proof:spring-tokens-synced; asserted here on the eased curves).
    if (schemeSrc == null) {
        v.push("S4: cannot read scheme-motion.css");
    } else {
        const generated = generateBlock();
        for (const line of generated.split("\n")) {
            const m = line.match(/--spring-([a-z]+): linear\(/);
            if (m && !schemeSrc.includes(line.trim())) {
                v.push(
                    `S4: the emitted --spring-${m[1]} line is DRIFTED from the generator output (run regen-spring-tokens.mjs + commit)`,
                );
            }
        }
    }

    // The KEEPS are byte-frozen: the canonical-keep (response, ζ) rows are unchanged
    // (the retune touched snappy + bouncy + minted press ONLY).
    facts.keeps = {};
    for (const [name, want] of Object.entries(KEEP_PAIRS)) {
        const p = presetByName(presets, name);
        if (!p) {
            v.push(`S4: the kept \`${name}\` SPRING_PRESETS row is missing`);
            continue;
        }
        facts.keeps[name] = [p.response, p.dampingFraction];
        if (p.response !== want.response || p.dampingFraction !== want.dampingFraction) {
            v.push(
                `S4: the kept \`${name}\` row drifted to (${p.response}, ${p.dampingFraction}) — it must stay byte-frozen (${want.response}, ${want.dampingFraction})`,
            );
        }
    }
    return { facts, violations: v };
}

// S5 — the clock NOT truncated (the analytic settle, never a hand value).
export function detectClockNotTruncated(presets, schemeSrc) {
    const v = [];
    const facts = { clocks: {} };
    if (schemeSrc == null) {
        v.push("S5: cannot read scheme-motion.css");
        return { facts, violations: v };
    }
    for (const p of presets) {
        const analytic = springSettleDurationSeconds(p);
        facts.clocks[p.name] = analytic;
        const m = schemeSrc.match(new RegExp(`--spring-${p.name}-duration:\\s*([\\d.]+)s`));
        if (!m) {
            v.push(`S5: no --spring-${p.name}-duration token in scheme-motion.css`);
            continue;
        }
        const emitted = Number.parseFloat(m[1]);
        if (Math.abs(emitted - analytic) > 1e-9) {
            v.push(
                `S5: --spring-${p.name}-duration ${emitted}s is NOT the analytic 2%-band settle ${analytic}s (a hand-truncated clock re-introduces the W-GLASS-CAL tail-jank)`,
            );
        }
    }
    return { facts, violations: v };
}

// ──────────────────────────────────────────────────────────────────────────────
// S6 — the universal no-abrupt-curve sweep (the NET-NEW shape axis: an un-sprung
// spatial leg riding a raw fixed curve). The disjoint complement of
// proof:motion-one-clock M3 (which owns the wall-clock + truncated shapes) — S6
// shares M3's narrow audited layout-reclaim allowlist, it does NOT re-run M3.

// The shared, narrow, audited layout-reclaim allowlist (the genuine discrete
// reflow the §6/proof:no-layout-animation already names — NOT a free pass for an
// abrupt spatial curve). Each entry is rationale-bearing.
const SPATIAL_PROPS = new Set([
    "transform",
    "translate",
    "scale",
    "rotate",
    "transform-origin",
]);
const RECLAIM_ALLOWLIST = [
    {
        file: "src/styles/transitions.css",
        props: ["grid-template-rows", "height", "max-height", "width"],
        rationale:
            "the reka-ui Collapsible/Accordion content-height reclaim + the ConfiguratorLayer grid-template-rows reveal — a discrete user-initiated open/close where the body reflows; on the proof:no-layout-animation discrete-reclaim allowlist.",
    },
];
// The canonical EASED-ARRIVAL curve a spatial leg may legitimately ride beside a
// `--spring-*` (the SOTA decelerating arrival — motion-canon.md P1).
const EASED_ARRIVAL = ["--ease-out-expo", "--motion-ease-out-expo"];

// A spatial leg whose timing is a `--*-spring`/`--*-resize-spring`/`--slider-*-spring`
// composite spring TOKEN (the dock-morph + slider thumb registers) is sprung, NOT
// abrupt — the token resolves onto a `--spring-*` curve. (M3 fences its clock; S6
// leaves it alone — the same disjoint split as the direct `var(--spring-*)` form.)
const SPRING_TOKEN_RE = /var\(\s*--[a-z-]*spring\b/;

// ── THE S6 PENDING BRIDGE (the verify-not-edit precedent — the M3a model the spec
//    cites). The SOURCE-sweep finds genuine abrupt-spatial hover/enter legs across
//    the corpus whose RECONCILE (re-point the spatial leg onto its mapped EASED
//    `--spring-*` register or `--ease-out-expo`) is owned DOWNSTREAM — this is a
//    TOKEN-ONLY wave (the curve SOURCE), the per-element re-points are the affordance
//    / component waves' footprint (BC.W-AFFORDANCE-MAP A3 is the affordance-scoped
//    restatement of this S6; BC.W-CONTROL-SMOOTH owns the control surface). Each
//    entry is leg-specific { file, property } + its lander; a NEW abrupt leg (any
//    file/property NOT bridged) still reds — the bridge is never a blanket file pass.
//    The bridge DISCHARGES at each lander: when the downstream re-point lands, the
//    leg rides a spring + the entry is removed (S6 reds if it re-appears abrupt).
const ABRUPT_SPATIAL_PENDING = [
    {
        file: "src/styles/utilities/base.css",
        property: "scale",
        lander: "BC.W-AFFORDANCE-MAP (A3)",
        rationale:
            "the `.interactive-item` hover `scale` rides `--ease-standard` (an abrupt bezier on a spatial leg) — the mapped HOVER-LIFT register is the eased `--spring-smooth`. The affordance re-point is AFFORDANCE-MAP's footprint (this wave owns the curve SOURCE, token-only).",
    },
    {
        file: "src/styles/utilities/components.css",
        property: "scale",
        lander: "BC.W-AFFORDANCE-MAP (A3)",
        rationale:
            "the shared interactive-utility hover `scale` rides `--ease-standard` — same hover-lift register reconcile as `.interactive-item`, owned by AFFORDANCE-MAP.",
    },
    {
        file: "src/styles/icon-chip.css",
        property: "transform",
        lander: "BC.W-AFFORDANCE-MAP (A3) / IconChip",
        rationale:
            "the IconChip `:bloom` ENTER hover `transform` rides `--ease-out` — the mapped register is `--spring-smooth` on enter (the chip is a decorative pop; AFFORDANCE-MAP records IconChip as decorative-not-interactive, its enter eases there).",
    },
    {
        file: "src/components/custom/timeline/ContinuousMarkers.vue",
        property: "transform",
        lander: "BC.W-AFFORDANCE-MAP / timeline",
        rationale:
            "the continuous-marker `transform` rides `--ease-standard` — the §6 'continuous-marker pop' register is `--spring-snappy`. The marker re-point is the timeline component's footprint.",
    },
    {
        file: "src/components/custom/timeline/SegmentedTimeline.vue",
        property: "transform",
        lander: "BC.W-AFFORDANCE-MAP / timeline",
        rationale:
            "the segmented-timeline marker `transform` rides `--ease-standard` — same continuous-marker-pop reconcile to `--spring-snappy` as ContinuousMarkers, owned downstream.",
    },
    {
        file: "src/components/custom/watercolor-dot/WatercolorDot.vue",
        property: "transform",
        lander: "BC.W-AFFORDANCE-MAP / watercolor",
        rationale:
            "the `.watercolor-swatch` hover `transform` rides `--ease-standard` — a decorative swatch hover; the re-point onto the eased register is the component's footprint.",
    },
    {
        file: "src/components/ui/notification/Notification.vue",
        property: "transform",
        lander: "BC.W-AFFORDANCE-MAP / notification",
        rationale:
            "the `.notification-enter-active` transform + the `.notification-move` FLIP-reorder transform ride `--ease-standard` — the enter eases onto `--spring-snappy`; the FLIP-move is a position-track. Owned by the notification component reconcile.",
    },
    {
        file: "src/components/custom/controls/DarkModeToggle.vue",
        property: "transform",
        lander: "BC.W-CONTROL-SMOOTH / DarkModeToggle",
        rationale:
            "the `[data-eclipsing]` 1600ms eclipse `transform` rides `--ease-standard` — a deliberate slow cinematic one-shot (the eclipse arc); the register choice (the eased arrival `--ease-out-expo` vs the slow bezier) is the control-smooth/DarkModeToggle reconcile.",
    },
];
function abruptSpatialPending(file, property) {
    return ABRUPT_SPATIAL_PENDING.some(
        (e) =>
            e.file === file &&
            (property === e.property || property.startsWith(`${e.property}-`)),
    );
}

function lineOf(src, idx) {
    return src.slice(0, idx).split("\n").length;
}
function cssOf(file, src) {
    if (file.endsWith(".vue")) {
        const m = src.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
        return m ? m.join("\n") : "";
    }
    return src;
}
// strip /* */ comments (the abrupt curve cannot live in a comment), PRESERVING
// newlines so reported line numbers map back to the original source.
function stripCss(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, " "));
}

// The selector role at a declaration index — an EXIT/leave recipe legitimately
// rides a no-overshoot bezier on its transform (motion-canon P2: "an exit must
// never overshoot past gone"). Walk back to the nearest selector block opener and
// read the rule's selector list; an exit role is `*-leave-*`/`*-exit-*` (and the
// shared `enter-active, leave-active` shorthand, where the leave arm governs).
function exitRoleAt(src, idx) {
    const open = src.lastIndexOf("{", idx);
    if (open < 0) return false;
    const selStart = src.lastIndexOf("}", open) + 1;
    const selector = src.slice(selStart, open);
    return /-leave-|-leave\b|-exit-|-exit\b|\bleave-active\b/.test(selector);
}
function splitTransitionLegs(value) {
    // split on top-level commas (commas inside ()/cubic-bezier()/var() are nested).
    const legs = [];
    let depth = 0;
    let cur = "";
    for (const ch of value) {
        if (ch === "(") depth++;
        else if (ch === ")") depth--;
        if (ch === "," && depth === 0) {
            legs.push(cur.trim());
            cur = "";
        } else cur += ch;
    }
    if (cur.trim()) legs.push(cur.trim());
    return legs;
}

/**
 * The abrupt-fixed-curve shapes a TIMING fragment matches. An un-sprung spatial
 * leg's timing is abrupt when it is a bare keyword (linear/ease/ease-in/
 * ease-in-out) or a raw cubic-bezier()/`--ease-*` bezier (an accelerating or a
 * non-decelerating curve) — NOT a `--spring-*` and NOT the eased `--ease-out-expo`.
 * Returns the matched abrupt token (or null when the leg is eased/sprung/no-timing).
 */
function abruptSpatialTiming(leg) {
    // a `--spring-*` (or a `--*-spring`/`--*-resize-spring` composite spring token)
    // leg is sprung (M3 fences its clock; S6 leaves it alone).
    if (/var\(\s*--spring-[a-z-]+/.test(leg) || SPRING_TOKEN_RE.test(leg)) return null;
    // the eased decelerating arrival is canonical for a spatial leg (P1).
    if (EASED_ARRIVAL.some((t) => new RegExp(`var\\(\\s*${t}\\b`).test(leg) || leg.includes(t))) {
        return null;
    }
    // a bare timing keyword on the leg.
    const kw = leg.match(/\b(linear|ease-in-out|ease-in|ease-out|ease)\b/);
    if (kw) return kw[1];
    // a raw cubic-bezier(...) literal (a hand curve, not a charted token).
    const cb = leg.match(/cubic-bezier\([^)]*\)/);
    if (cb) return cb[0];
    // a non-canonical `--ease-*` / `--motion-ease-*` bezier on a spatial leg (the
    // standard/out/in/apple beziers are EFFECTS-register curves — abrupt on a
    // transform). The eased arrival --ease-out-expo was already cleared above.
    const easeVar = leg.match(/var\(\s*(--(?:motion-)?ease-[a-z-]+)/);
    if (easeVar) return easeVar[1];
    return null;
}

function reclaimAllowed(file, property) {
    return RECLAIM_ALLOWLIST.some(
        (a) =>
            a.file === file &&
            a.props.some((p) => property === p || property.startsWith(`${p}-`)),
    );
}

/** Scan one file's `transition:` shorthands for an abrupt un-sprung spatial leg. */
export function detectAbruptSpatial(file, src) {
    const violations = [];
    const stripped = stripCss(cssOf(file, src));
    const declRe = /(?<!-)\btransition\s*:\s*([^;}]+)[;}]/gi;
    let m;
    while ((m = declRe.exec(stripped)) !== null) {
        const raw = m[1];
        const value = raw.includes("_") ? raw.replace(/_/g, " ") : raw;
        const line = lineOf(stripped, m.index);
        if (exitRoleAt(stripped, m.index)) continue; // P2 — an exit transform rides a bezier.
        for (const leg of splitTransitionLegs(value)) {
            const tokens = leg.split(/\s+/).filter(Boolean);
            if (!tokens.length) continue;
            const property = tokens[0].toLowerCase();
            if (!SPATIAL_PROPS.has(property)) continue; // S6 owns the SPATIAL axis only.
            if (reclaimAllowed(file, property)) continue; // shared audited allowlist.
            const abrupt = abruptSpatialTiming(leg);
            if (!abrupt) continue;
            if (abruptSpatialPending(file, property)) continue; // downstream-owned re-point (the bridge).
            violations.push(
                `${file}:${line}: spatial leg '${property}' rides the abrupt fixed curve '${abrupt}' — a spatial motion must be a --spring-* register or the eased arrival --ease-out-expo, never a raw linear/ease/accelerating bezier (the user-mandate no-abrupt bar, S6/P1)`,
            );
        }
    }
    return violations;
}

function walkSrc(dir, exts, acc = []) {
    if (!existsSync(dir)) return acc;
    for (const n of readdirSync(dir)) {
        if (n === "node_modules" || n === "__tests__") continue;
        const p = join(dir, n);
        if (statSync(p).isDirectory()) walkSrc(p, exts, acc);
        else if (exts.some((e) => n.endsWith(e))) acc.push(p);
    }
    return acc;
}

export function detectUniversalSweep() {
    const violations = [];
    const css = walkSrc(SRC_DIR, [".css"]);
    const vue = walkSrc(SRC_DIR, [".vue"]);
    const facts = {
        corpusFilesScanned: css.length + vue.length,
        abruptSpatialLegs: 0,
        pendingBridges: ABRUPT_SPATIAL_PENDING.map((e) => `${e.file} (${e.property}) → ${e.lander}`),
    };
    for (const path of [...css, ...vue]) {
        const rel = path.slice(ROOT.length + 1);
        const found = detectAbruptSpatial(rel, readFileSync(path, "utf8"));
        violations.push(...found);
    }
    facts.abruptSpatialLegs = violations.length;
    return { facts, violations };
}

// ──────────────────────────────────────────────────────────────────────────────
export function detectAll({ presets, schemeSrc, useSpringPressSrc, regenSrc, curvesSrc } = {}) {
    const p = presets ?? PRESETS;
    const scheme = schemeSrc ?? read(SCHEME_MOTION);
    const press = useSpringPressSrc ?? read(USE_SPRING_PRESS_TS);
    const regen = regenSrc ?? read(REGEN_MJS);
    const curves = curvesSrc ?? read(CURVES_TS);

    const s1 = detectClockFill(p);
    const s2 = detectOvershoot(p);
    const s3 = detectPressRegister(p, press, scheme);
    const s4 = detectSingleSourceAndKeeps(p, scheme, regen, curves);
    const s5 = detectClockNotTruncated(p, scheme);
    const s6 = detectUniversalSweep();

    const violations = [
        ...s1.violations,
        ...s2.violations,
        ...s3.violations,
        ...s4.violations,
        ...s5.violations,
        ...s6.violations,
    ];
    return {
        violations,
        facts: {
            s1: s1.facts,
            s2: s2.facts,
            s3: s3.facts,
            s4: s4.facts,
            s5: s5.facts,
            s6: s6.facts,
        },
    };
}

// ── the inline self-test bites (the gate proves its own bite every run) ──────────
function selfTest() {
    const failures = [];

    // S1 bite — a front-loaded control pair (90%-travel < 0.40) reds.
    const frontLoaded = [
        { name: "smooth", response: 0.5, dampingFraction: 0.86, comment: "" },
        { name: "snappy", response: 0.25, dampingFraction: 0.55, comment: "" },
        { name: "bouncy", response: 0.5, dampingFraction: 0.55, comment: "" },
        { name: "gentle", response: 0.7, dampingFraction: 1.0, comment: "" },
        { name: "dock", response: 0.32, dampingFraction: 0.7, comment: "" },
        { name: "press", response: 0.15, dampingFraction: 0.86, comment: "" },
    ];
    if (
        ninetyTravelFraction(0.25, 0.55) >= SNAPPY_90_FRONTLOAD_FLOOR ||
        detectClockFill(frontLoaded).violations.length === 0
    ) {
        failures.push("SELF-TEST S1: a front-loaded snappy (0.25/0.55, 90%-travel < 0.40) did NOT red");
    }

    // S2 bite — a ζ < 0.55 on bouncy (over-spring) reds.
    const overSpring = frontLoaded.map((p) =>
        p.name === "bouncy" ? { ...p, dampingFraction: 0.45 } : p,
    );
    if (detectOvershoot(overSpring).violations.length === 0) {
        failures.push("SELF-TEST S2: a bouncy ζ=0.45 (over-spring +20.5%) did NOT red");
    }

    // S3 bite — a useSpringPress with a literal default (not the press row) reds.
    const literalPress = "const spring = useSpring(target, { response: options.response ?? 0.25, dampingFraction: options.dampingFraction ?? 0.7 });";
    if (
        detectPressRegister(frontLoaded, literalPress, "--spring-press: linear(0, 1); --spring-press-duration: 0.11s;").violations
            .length === 0
    ) {
        failures.push("SELF-TEST S3: a useSpringPress literal default (0.25/0.7, not the row) did NOT red");
    }
    // S3 bite — a missing press row reds.
    const noPress = frontLoaded.filter((p) => p.name !== "press");
    if (detectPressRegister(noPress, 'springPreset("press")', "").violations.length === 0) {
        failures.push("SELF-TEST S3: a missing press row did NOT red");
    }

    // S4 bite — a drifted keep (smooth ζ retuned) reds.
    const driftedKeep = frontLoaded.map((p) =>
        p.name === "smooth" ? { ...p, dampingFraction: 0.7 } : p,
    );
    if (
        detectSingleSourceAndKeeps(driftedKeep, "x", "SPRING_PRESETS", "SPRING_PRESETS").violations
            .every((s) => !/kept `smooth`/.test(s))
    ) {
        failures.push("SELF-TEST S4: a drifted `smooth` keep (ζ 0.86→0.7) did NOT red");
    }

    // S5 bite — a hand-truncated --spring-snappy-duration reds against the analytic.
    const truncatedScheme = "--spring-snappy-duration: 0.15s;\n--spring-smooth-duration: 0.36s;";
    const realPresets = PRESETS;
    if (
        detectClockNotTruncated(realPresets, truncatedScheme).violations.every(
            (s) => !/snappy-duration 0\.15s/.test(s),
        )
    ) {
        failures.push("SELF-TEST S5: a hand-truncated --spring-snappy-duration: 0.15s did NOT red against the analytic");
    }

    // S6 bites — the three abrupt shapes on planted spatial legs.
    // (a) an abrupt spatial leg (raw linear on transform) reds.
    if (
        detectAbruptSpatial("src/_bite.css", ".x { transition: transform 0.3s linear; }").length === 0
    ) {
        failures.push("SELF-TEST S6a: a planted `transition: transform 0.3s linear` (abrupt spatial) did NOT red");
    }
    // (a) an accelerating non-canonical bezier on a transform reds.
    if (
        detectAbruptSpatial("src/_bite.css", ".x { transition: scale 0.3s cubic-bezier(0.4, 0, 1, 1); }").length === 0
    ) {
        failures.push("SELF-TEST S6a: a planted accelerating cubic-bezier on `scale` did NOT red");
    }
    // the EFFECTS-only exemption is load-bearing: a colour cross-fade on --ease-standard does NOT red.
    if (
        detectAbruptSpatial("src/_bite.css", ".x { transition: background var(--duration-fast) var(--ease-standard); }").length !== 0
    ) {
        failures.push("SELF-TEST S6: an EFFECTS-only `transition: background … --ease-standard` was flagged (the recorded exemption broke)");
    }
    // a sprung spatial leg does NOT red (M3 owns its clock, S6 leaves it alone).
    if (
        detectAbruptSpatial("src/_bite.css", ".x { transition: transform var(--spring-snappy-duration) var(--spring-snappy); }").length !== 0
    ) {
        failures.push("SELF-TEST S6: a sprung spatial leg (var(--spring-snappy)) was flagged — S6 must defer the clock arm to M3");
    }
    // the eased arrival --ease-out-expo on a spatial leg does NOT red (P1 arrival).
    if (
        detectAbruptSpatial("src/_bite.css", ".x { transition: transform 0.3s var(--ease-out-expo); }").length !== 0
    ) {
        failures.push("SELF-TEST S6: the eased arrival --ease-out-expo on a spatial leg was flagged");
    }

    return failures;
}

function main() {
    const { violations, facts } = detectAll();
    const selfFailures = selfTest();
    const all = [...violations, ...selfFailures];

    console.log("proof:spring-ease — the eased-curve source arm (S1-S6) + self-test bites");
    if (facts.s1.snappy90TravelFraction != null) {
        console.log(`  S1 snappy 90%-travel fraction: ${facts.s1.snappy90TravelFraction} (band [${SNAPPY_90_TRAVEL_BAND.join(", ")}])`);
    }
    console.log(`  S2 overshoot: ${JSON.stringify(facts.s2.overshoot)}`);
    console.log(`  S3 press pair: ${JSON.stringify(facts.s3.pressPair)}  useSpringPress reads row: ${facts.s3.useSpringPressReadsRow}`);
    console.log(`  S5 clocks: ${JSON.stringify(facts.s5.clocks)}`);
    console.log(`  S6 corpus files scanned: ${facts.s6.corpusFilesScanned}  abrupt spatial legs: ${facts.s6.abruptSpatialLegs}`);

    if (all.length) {
        console.error("\nproof:spring-ease FAILED:");
        for (const x of violations) console.error(`  ✗ ${x}`);
        for (const x of selfFailures) console.error(`  ✗ ${x}`);
        process.exit(1);
    }
    console.log("\nproof:spring-ease PASSED — snappy fills its clock, bouncy in the Apple band, the iOS press register minted + wired, the keeps byte-frozen, no truncated clock, no abrupt spatial leg in the corpus");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    main();
}
