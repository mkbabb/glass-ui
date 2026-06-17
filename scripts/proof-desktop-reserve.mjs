#!/usr/bin/env node
// BB.W-DESKTOP-RESERVE (B3) — the wide-axis (desktop) chassis dial reserve gate
// (proof:desktop-reserve).
//
// The born-RED→GREEN device-free SOURCE arm for the speedtest AW v3 relay intake
// item B3 (docs/tranches/BB/coordination/cross-repo-inbound.md §5 :108): a wide-axis
// chassis RESERVE — a `min-block-size` reservation on the InstrumentChassis dial cell
// so the desktop layout reserves its block extent up-front → CLS≈0 (no cumulative
// layout shift as the meter <canvas> + readout hydrate). This SUPERSEDES the speedtest
// App.vue interim (`.instrument-dial { min-block-size: var(--chassis-max-block-size) }`
// the consumer authored at AW.W4.1 / DDR-AW-DESKTOP-RESERVE; the consumer deletes its
// local reserve once it consumes this rung, on the ^4.1.0 bump).
//
// At HEAD glass-ui reserved the dial box ONLY on the mobile reflow (the R0G-2 reserve
// inside `@container chassis (max-width: 44.9375rem)` — a `min-height` + meter-row
// minmax). The WIDE box axis had NO library reserve, so a `1fr` meter row collapsed to
// its pre-hydration `<canvas>` intrinsic and grew on hydration, pushing the results
// card + dock down (the measured desktop-1440 CLS the speedtest interim cured locally).
//
// The fix is token-first + structural, mirroring the mobile rung as its EXACT DISJOINT
// COMPLEMENT: mint `--instrument-dial-min-block-size-desktop` (default
// `var(--chassis-max-block-size)`, the library's dock-adjusted dynamic-viewport
// guardrail — a pure CSS calc, resolves at first paint, no JS) and apply it as a STATIC
// `min-block-size` on `.instrument-dial` inside `@container chassis (min-width: 45rem)`
// (45rem ≈ 720px = the mobile ceiling 44.9375rem ≈ 719px + 1px — disjoint ranges, no
// overlap, no gap, no competing reserve). The reserve is a min-block-size (a frame-0
// box reservation), NEVER an animated height — compositor-safe, proof:no-layout-animation
// holds (a min-block-size reserve is never a @keyframes/transition target).
//
// Five falsifiable clauses (each born-RED at HEAD pre-wave; GREEN after the edits):
//
//   D1 — THE DESKTOP DIAL TOKEN. `--instrument-dial-min-block-size-desktop` is minted
//        ONCE in tokens/offsets.css and its default resolves the library's own
//        `--chassis-max-block-size` guardrail (NOT a speedtest-specific literal —
//        presets-in-consumers; a flat-rem/px default REDS). The dial is a CSS custom
//        property a consumer overrides — the token-first axis.
//   D2 — THE WIDE-AXIS RESERVE RULE. `.instrument-dial` reads
//        `min-block-size: var(--instrument-dial-min-block-size-desktop, …)` inside a
//        `@container chassis (min-width: 45rem)` block (wide-axis-gated). A bare
//        (un-gated) `min-block-size` on the base `.instrument-dial`, or a viewport
//        `@media`-gated one (not the chassis container), REDS.
//   D3 — THE EXACT DISJOINT COMPLEMENT. The desktop floor (45rem) is the mobile
//        ceiling (44.9375rem) + 1px — the two container-query ranges share no width,
//        so a dial cell is reserved by exactly ONE branch at every box width. A
//        desktop floor that overlaps the mobile ceiling (e.g. min-width: 44rem) REDS.
//   D4 — CLS-SAFE: NOT ANIMATED. The reserve is a STATIC declaration — the
//        `min-block-size` axis (and the desktop token) appear in NO `@keyframes` step
//        and in NO `transition`/`transition-property` value across the chassis CSS. An
//        animated min-block-size (a `transition: min-block-size …` or a keyframed
//        `min-block-size`) REDS (the proof:no-layout-animation discipline, asserted
//        locally for this token's surface).
//   D5 — ≥2 CONSUMERS (visual-load-bearing). The desktop token is referenced at ≥2
//        DISTINCT sites — the mint (offsets.css) + the read rule (instrument-chassis.css)
//        — the same shape the mobile rung carries.
//
// + the self-test bite: each planted violation (a flat-rem default, an un-gated reserve,
//   an overlapping mobile range, a transitioned min-block-size, a single-site token) RED
//   its clause through the PURE detector (the false-witness discipline).
//
// House style mirrors proof-card-padding.mjs / proof-eyebrow-union.mjs: ESM .mjs,
// comment-strip first (false-witness discipline), a pure exported detector, a byte-stable
// JSON artefact via gate-output, a human summary, process.exit(1) on any violation.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

/** Strip block + line comments so a witness never matches commented prose. */
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

function safeRead(p) {
    try {
        return readFileSync(p, "utf8");
    } catch {
        return "";
    }
}

const DESKTOP_TOKEN = "--instrument-dial-min-block-size-desktop";

/**
 * Parse a `@container chassis (min-width: <n>rem)` / `(max-width: <n>rem)` threshold
 * from a comment-stripped CSS body — returns the numeric rem or null.
 */
function containerThreshold(css, edge) {
    const re = new RegExp(
        `@container\\s+chassis\\s*\\(\\s*${edge}-width:\\s*([\\d.]+)rem\\s*\\)`,
    );
    const m = css.match(re);
    return m ? parseFloat(m[1]) : null;
}

/**
 * Extract the body of the FIRST `@container chassis (min-width: <n>rem)` block — a
 * brace-balanced slice so D2/D4 read the desktop block, not the whole file.
 */
function minWidthBlockBody(css) {
    const open = css.search(/@container\s+chassis\s*\(\s*min-width:/);
    if (open < 0) return "";
    // find the opening brace of the @container block
    let i = css.indexOf("{", open);
    if (i < 0) return "";
    let depth = 0;
    const start = i + 1;
    for (; i < css.length; i++) {
        if (css[i] === "{") depth++;
        else if (css[i] === "}") {
            depth--;
            if (depth === 0) return css.slice(start, i);
        }
    }
    return css.slice(start);
}

/**
 * Pure detector — given the source strings, return { facts, violations }.
 *
 * `sources` shape:
 *   offsetsCss : src/styles/tokens/offsets.css (the token mint home — D1, D5)
 *   chassisCss : src/styles/instrument-chassis.css (the reserve rule — D2, D3, D4, D5)
 */
export function detectDesktopReserve(sources) {
    const { offsetsCss, chassisCss } = sources;
    const facts = {};
    const violations = [];

    const offsets = stripComments(offsetsCss);
    const chassis = stripComments(chassisCss);

    // ── D1 — the desktop dial token minted once, default = the library guardrail ──
    facts.d1 = {};
    const mintRe = new RegExp(`${DESKTOP_TOKEN}\\s*:\\s*([^;]+);`);
    const mintMatch = offsets.match(mintRe);
    facts.d1.minted = !!mintMatch;
    const defaultVal = mintMatch ? mintMatch[1].trim() : "";
    facts.d1.default = defaultVal;
    // the default must resolve the LIBRARY guardrail token (presets-in-consumers),
    // NOT a baked literal (a `24rem`/`960px`/etc. default REDS).
    facts.d1.defaultIsGuardrail = /var\(\s*--chassis-max-block-size\s*\)/.test(
        defaultVal,
    );
    facts.d1.defaultIsLiteral = /^\s*[\d.]+(rem|px|dvh|vh|em|%)\b/.test(
        defaultVal,
    );
    facts.d1.ok =
        facts.d1.minted &&
        facts.d1.defaultIsGuardrail &&
        !facts.d1.defaultIsLiteral;
    if (!facts.d1.ok) {
        violations.push(
            `D1: ${DESKTOP_TOKEN} must be minted ONCE in offsets.css with its default resolving var(--chassis-max-block-size) — the library guardrail, NOT a baked literal (minted=${facts.d1.minted}, guardrail=${facts.d1.defaultIsGuardrail}, literal=${facts.d1.defaultIsLiteral}, default="${defaultVal}")`,
        );
    }

    // ── D2 — the wide-axis reserve rule, gated on the chassis container min-width ──
    facts.d2 = {};
    const minWidthThreshold = containerThreshold(chassis, "min");
    facts.d2.minWidthThreshold = minWidthThreshold;
    const desktopBlock = minWidthBlockBody(chassis);
    // the desktop @container block must set min-block-size reading the desktop token.
    const readsToken = new RegExp(
        `min-block-size\\s*:\\s*var\\(\\s*${DESKTOP_TOKEN}`,
    ).test(desktopBlock);
    facts.d2.readsTokenInWideBlock = readsToken;
    facts.d2.gatedOnChassisContainer = minWidthThreshold !== null;
    // an UN-gated base reserve (a top-level `.instrument-dial { min-block-size … }`
    // reading the desktop token OUTSIDE any container block) is forbidden — the
    // reserve is wide-axis-ONLY. Detect a desktop-token min-block-size that is NOT
    // inside the min-width block.
    const tokenReserveCount = (
        chassis.match(
            new RegExp(`min-block-size\\s*:\\s*var\\(\\s*${DESKTOP_TOKEN}`, "g"),
        ) || []
    ).length;
    const inWideBlock = readsToken ? 1 : 0;
    facts.d2.tokenReserveCount = tokenReserveCount;
    facts.d2.noUngatedReserve = tokenReserveCount === inWideBlock;
    facts.d2.ok =
        facts.d2.readsTokenInWideBlock &&
        facts.d2.gatedOnChassisContainer &&
        facts.d2.noUngatedReserve;
    if (!facts.d2.ok) {
        violations.push(
            `D2: .instrument-dial must read min-block-size: var(${DESKTOP_TOKEN}) INSIDE @container chassis (min-width: …) and NOWHERE un-gated (readsInWide=${facts.d2.readsTokenInWideBlock}, gated=${facts.d2.gatedOnChassisContainer}, ungatedReserve=${!facts.d2.noUngatedReserve})`,
        );
    }

    // ── D3 — the exact disjoint complement of the mobile ceiling ──────────────────
    facts.d3 = {};
    const maxWidthThreshold = containerThreshold(chassis, "max");
    facts.d3.mobileCeiling = maxWidthThreshold;
    facts.d3.desktopFloor = minWidthThreshold;
    // disjoint + no-gap: the desktop floor (px) must be the mobile ceiling (px) + 1px.
    // 44.9375rem * 16 = 719px; 45rem * 16 = 720px → 720 == 719 + 1. The threshold is
    // a box-width in rem; convert at the 16px root the comment names.
    const remToPx = (r) => (r === null ? null : Math.round(r * 16));
    const ceilPx = remToPx(maxWidthThreshold);
    const floorPx = remToPx(minWidthThreshold);
    facts.d3.mobileCeilingPx = ceilPx;
    facts.d3.desktopFloorPx = floorPx;
    facts.d3.disjointNoGap =
        ceilPx !== null && floorPx !== null && floorPx === ceilPx + 1;
    facts.d3.ok = facts.d3.disjointNoGap;
    if (!facts.d3.ok) {
        violations.push(
            `D3: the desktop floor must be the EXACT disjoint complement of the mobile ceiling (floor == ceiling + 1px) — mobile ceiling ${ceilPx}px, desktop floor ${floorPx}px (overlap or gap)`,
        );
    }

    // ── D4 — CLS-safe: the reserve is STATIC, never animated ──────────────────────
    facts.d4 = {};
    // no `min-block-size` keyword inside any @keyframes block, and the desktop token
    // / min-block-size axis is in NO transition/transition-property value.
    const keyframeBodies = [];
    {
        const kfRe = /@keyframes[^{]+\{/g;
        let m;
        while ((m = kfRe.exec(chassis))) {
            const open = m.index + m[0].length - 1;
            let depth = 0;
            for (let i = open; i < chassis.length; i++) {
                if (chassis[i] === "{") depth++;
                else if (chassis[i] === "}") {
                    depth--;
                    if (depth === 0) {
                        keyframeBodies.push(chassis.slice(open + 1, i));
                        break;
                    }
                }
            }
        }
    }
    const keyframesAnimateMinBlock = keyframeBodies.some((b) =>
        /\bmin-block-size\s*:/.test(b),
    );
    // a `transition`/`transition-property` whose value names min-block-size or the
    // desktop token (the animated-reserve anti-pattern).
    const transitionAnimatesReserve = new RegExp(
        `transition(?:-property)?\\s*:[^;]*(?:min-block-size|${DESKTOP_TOKEN})`,
    ).test(chassis);
    facts.d4.keyframesAnimateMinBlock = keyframesAnimateMinBlock;
    facts.d4.transitionAnimatesReserve = transitionAnimatesReserve;
    facts.d4.ok = !keyframesAnimateMinBlock && !transitionAnimatesReserve;
    if (!facts.d4.ok) {
        violations.push(
            `D4: the reserve must be a STATIC min-block-size, NOT animated — keyframed=${keyframesAnimateMinBlock}, transitioned=${transitionAnimatesReserve} (proof:no-layout-animation discipline)`,
        );
    }

    // ── D5 — ≥2 consumers (visual-load-bearing) ───────────────────────────────────
    facts.d5 = {};
    const esc = DESKTOP_TOKEN.replace(/[-]/g, "\\-");
    // a reference is the bare `--token:` declaration (the mint) OR the token name
    // inside a `var(` reference (the read) — the read may carry a fallback comma, so
    // do NOT require the closing paren after the name.
    const refRe = new RegExp(`${esc}\\s*:|var\\(\\s*${esc}\\b`);
    const sites = [];
    if (refRe.test(offsets)) sites.push("tokens/offsets.css");
    if (refRe.test(chassis)) sites.push("instrument-chassis.css");
    facts.d5.sites = sites;
    facts.d5.ok = sites.length >= 2;
    if (!facts.d5.ok) {
        violations.push(
            `D5: the desktop token needs ≥2 consumers (mint + read) — found ${sites.length}: ${sites.join(", ") || "none"}`,
        );
    }

    return { facts, violations };
}

// ── self-test: the false-witness bites (each planted violation RED its clause). ──
function selfTest() {
    const goodOffsets = `
:root {
    --chassis-max-block-size: calc(100dvh - 5.75rem - 1rem);
    --instrument-dial-min-height-mobile: 24rem;
    --instrument-dial-min-block-size-desktop: var(--chassis-max-block-size);
}`;
    const goodChassis = `
@layer components {
    .instrument-dial { display: grid; }
    @container chassis (max-width: 44.9375rem) {
        .instrument-chassis .instrument-dial { min-height: var(--instrument-dial-min-height-mobile, 24rem); }
    }
    @container chassis (min-width: 45rem) {
        .instrument-chassis .instrument-dial {
            min-block-size: var(--instrument-dial-min-block-size-desktop, var(--chassis-max-block-size));
        }
    }
}`;

    const base = { offsetsCss: goodOffsets, chassisCss: goodChassis };
    const bites = [];

    // Bite A — a flat-rem default (a baked literal) reds D1.
    {
        const { facts } = detectDesktopReserve({
            ...base,
            offsetsCss: goodOffsets.replace(
                "--instrument-dial-min-block-size-desktop: var(--chassis-max-block-size);",
                "--instrument-dial-min-block-size-desktop: 60rem;",
            ),
        });
        bites.push({ name: "D1 flat-rem default reds", reds: !facts.d1.ok });
    }

    // Bite B — an UN-gated base reserve (token min-block-size outside any container) reds D2.
    {
        const ungated = goodChassis.replace(
            ".instrument-dial { display: grid; }",
            ".instrument-dial { display: grid; min-block-size: var(--instrument-dial-min-block-size-desktop, var(--chassis-max-block-size)); }",
        );
        const { facts } = detectDesktopReserve({ ...base, chassisCss: ungated });
        bites.push({ name: "D2 un-gated reserve reds", reds: !facts.d2.ok });
    }

    // Bite C — an OVERLAPPING desktop floor (44rem < 44.9375rem ceiling) reds D3.
    {
        const overlap = goodChassis.replace(
            "min-width: 45rem",
            "min-width: 44rem",
        );
        const { facts } = detectDesktopReserve({ ...base, chassisCss: overlap });
        bites.push({ name: "D3 overlapping range reds", reds: !facts.d3.ok });
    }

    // Bite D — a TRANSITIONED min-block-size (an animated reserve) reds D4.
    {
        const animated = goodChassis.replace(
            "min-block-size: var(--instrument-dial-min-block-size-desktop, var(--chassis-max-block-size));",
            "min-block-size: var(--instrument-dial-min-block-size-desktop, var(--chassis-max-block-size)); transition: min-block-size 300ms ease;",
        );
        const { facts } = detectDesktopReserve({ ...base, chassisCss: animated });
        bites.push({ name: "D4 transitioned reserve reds", reds: !facts.d4.ok });
    }

    // Bite E — a SINGLE-site token (mint only, never read) reds D5.
    {
        const { facts } = detectDesktopReserve({
            ...base,
            chassisCss: goodChassis.replace(
                "min-block-size: var(--instrument-dial-min-block-size-desktop, var(--chassis-max-block-size));",
                "min-block-size: var(--chassis-max-block-size);",
            ),
        });
        bites.push({ name: "D5 single-site token reds", reds: !facts.d5.ok });
    }

    // Bite F — the GOOD shape passes ALL clauses (the no-false-positive floor).
    {
        const { violations } = detectDesktopReserve(base);
        bites.push({ name: "good shape passes", reds: violations.length === 0 });
    }

    return bites;
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_DESKTOP_RESERVE_ARTIFACT",
        "BB-desktop-reserve",
    );

    const offsetsCss = safeRead(
        resolve(ROOT, "src/styles/tokens/offsets.css"),
    );
    const chassisCss = safeRead(
        resolve(ROOT, "src/styles/instrument-chassis.css"),
    );

    const { facts, violations } = detectDesktopReserve({
        offsetsCss,
        chassisCss,
    });

    // the self-test bites.
    const bites = selfTest();
    const biteFailures = bites.filter((b) => !b.reds);
    facts.selfTest = { bites, allBite: biteFailures.length === 0 };
    if (!facts.selfTest.allBite) {
        violations.push(
            `self-test: bite(s) did not RED/pass: ${biteFailures
                .map((b) => b.name)
                .join(", ")}`,
        );
    }

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:desktop-reserve",
        facts,
        violations,
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log(
        "proof:desktop-reserve — the wide-axis (desktop) chassis dial reserve (BB.W-DESKTOP-RESERVE / B3)",
    );
    console.log(`  D1 desktop dial token, guardrail default   : ${yn(facts.d1.ok)}  (default: ${facts.d1.default || "—"})`);
    console.log(`  D2 wide-axis reserve rule, container-gated  : ${yn(facts.d2.ok)}`);
    console.log(
        `  D3 exact disjoint complement (floor=ceil+1) : ${yn(facts.d3.ok)}  (mobile ≤${facts.d3.mobileCeilingPx}px | desktop ≥${facts.d3.desktopFloorPx}px)`,
    );
    console.log(`  D4 CLS-safe: static reserve, not animated   : ${yn(facts.d4.ok)}`);
    console.log(`  D5 ≥2 consumers (mint + read)               : ${yn(facts.d5.ok)}  (${facts.d5.sites.join(", ")})`);
    console.log(`  self-test bites RED/pass                    : ${yn(facts.selfTest.allBite)}`);

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(
            ROOT.length + 1,
        )}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
