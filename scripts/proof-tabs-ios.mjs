#!/usr/bin/env node
// BC.W-TABS-IOS — the iOS-27 glass tab system (the segmented control STOPS being a
// squared low-contrast Tailwind strip and BECOMES the floating-capsule-with-a-distinct-
// stadium-pill). The SOURCE/MECHANISM arm of proof:tabs-ios (device-free; the PAINT arm
// is the bc-gestalt-roster pixel-read over a live :5199 capture the orchestrator owns +
// the π readback tests-visual/tabs-ios.spec.ts). Per-mechanism greens alone do NOT close
// the visual wave — the captured DELTA is the binding truth (BC anti-disease law).
//
// The comment-strip + pure-detector house pattern (mirroring proof-black-bar.mjs). Each
// witness is born-RED at HEAD pre-wave:
//   - HEAD --bouncy-slider-radius is the `0.3125rem` px literal squaring the pill (T1 reds);
//     the @media(min-width:640px) radius bumps (0.5rem/0.375rem) survive (T1 reds).
//   - HEAD .segmented-indicator fills with the RAW var(--glass-bg-floating) + the weak
//     `0 1px 3px rgba(0,0,0,0.08)` lift + a 30%---border dark ring (T2 reds).
//   - HEAD .segmented-tabs track + indicator carry the --border dark hairline (T3 reds).
//
// bite-check (each clause carries a planted self-test below): a planted 6px slider radius
// reds T1; a planted raw --glass-bg-floating fill reds T2; a planted dark top --border ring
// reds T3; a stripped ARIA marker / a drifted engine constant reds T4; a planted dark
// (low-α) pill fill that buries the --foreground label reds T5.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

function stripCss(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "");
}

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

function readFile(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

const TABS_CSS = "src/styles/segmented-tabs.css";
const RADIUS_CSS = "src/styles/theme/radius.css";
// BD.W-TAB-IOS-CAPSULE — the lifted-plate composite (fill + rim + lift shadow) was
// extracted VERBATIM from the inline `.segmented-indicator` into the shared
// `.glass-capsule` register; the active pill now COMPOSES the class (the SFC adds it).
// T2/T5 read the composite off the capsule register, and assert the SFC composes it.
const CAPSULE_CSS = "src/styles/glass/glass-capsule.css";
const SFC = "src/components/custom/tabs/SegmentedTabs.vue";
const ENGINE_FILES = [
    "src/components/custom/tabs/composables/useTabIndicator.ts",
    "src/components/custom/tabs/composables/useTabDragMorph.ts",
    "src/components/custom/tabs/constants.ts",
];
const SCALE_PAPER = "src/styles/tokens/scale-paper.css";

// ── T1 — stadium radius register.
//   --radius-tab exists in theme/radius.css resolving var(--radius-pill); the pill
//   --bouncy-slider-radius reads --radius-tab (NOT a px literal ≤6px); the
//   @media(min-width:640px) radius bumps are GONE.
export function detectStadiumRadius(radiusRaw, tabsRaw) {
    const violations = [];
    const facts = {};
    const radius = stripCss(radiusRaw ?? readFile(RADIUS_CSS));
    const tabs = stripCss(tabsRaw ?? readFile(TABS_CSS));

    // --radius-tab minted, resolving var(--radius-pill).
    const tabRegM = radius.match(/--radius-tab:\s*([^;]+);/);
    facts.radiusTab = tabRegM ? tabRegM[1].trim() : null;
    if (!facts.radiusTab) {
        violations.push("T1: --radius-tab not minted in theme/radius.css (the role-bearing stadium register)");
    } else if (!/var\(--radius-pill\)/.test(facts.radiusTab)) {
        violations.push(`T1: --radius-tab does not resolve var(--radius-pill) (the ONE pill source — no hand-rolled 9999px/rounded-full): '${facts.radiusTab}'`);
    }

    // --bouncy-slider-radius reads --radius-tab (the stadium), NOT a px/rem literal.
    const sliderM = tabs.match(/--bouncy-slider-radius:\s*([^;]+);/);
    facts.sliderRadius = sliderM ? sliderM[1].trim() : null;
    if (!facts.sliderRadius) {
        violations.push("T1: --bouncy-slider-radius not found in segmented-tabs.css");
    } else if (!/var\(--radius-tab\)/.test(facts.sliderRadius)) {
        violations.push(`T1: --bouncy-slider-radius does not read var(--radius-tab) — a px/rem literal reads as a rounded-RECTANGLE, not a stadium pill: '${facts.sliderRadius}'`);
    }

    // No surviving @media(min-width:640px) radius bump (the HEAD 0.375rem/0.5rem lines).
    // Scan EVERY --bouncy-slider-radius / --bouncy-track-radius write for a px/rem literal
    // (a stadium does not change radius across breakpoints; the bumps are DELETED).
    const literalRadiusRe = /--bouncy-(?:slider|track)-radius:\s*([\d.]+(?:rem|px))\s*;/g;
    facts.literalRadiusHits = [];
    let m;
    while ((m = literalRadiusRe.exec(tabs)) !== null) {
        facts.literalRadiusHits.push(m[1]);
        violations.push(`T1: a --bouncy-*-radius px/rem LITERAL '${m[1]}' survives — the breakpoint radius bump must be GONE (a stadium is viewport-invariant; clean break, no alias)`);
    }
    // The .segmented-indicator must not re-pin a px/rem border-radius literal (HEAD's
    // @media 640px `border-radius: 0.375rem` squared the pill).
    const indRadiusLiteralRe = /\.segmented-indicator\s*\{[^}]*border-radius:\s*([\d.]+(?:rem|px))\s*;/gs;
    while ((m = indRadiusLiteralRe.exec(tabs)) !== null) {
        facts.literalRadiusHits.push(`indicator:${m[1]}`);
        violations.push(`T1: .segmented-indicator re-pins a px/rem border-radius literal '${m[1]}' — it must read the stadium --bouncy-slider-radius`);
    }

    return { facts, violations };
}

// ── T2 — the selected pill is a distinct material step.
//   .segmented-indicator background reads the oklab-tinted floating seam
//   (--glass-bg-floating-tinted, NOT the raw --glass-bg-floating), AND its box-shadow
//   composes the directional rim (--glass-rim-top/--glass-rim-bottom) + a real under-shadow
//   (NOT the weak `0 1px 3px rgba(0,0,0,0.08)` alone).
export function detectDistinctPlate(capsuleRaw, sfcRaw) {
    const violations = [];
    const facts = {};
    // BD.W-TAB-IOS-CAPSULE — the composite moved VERBATIM onto `.glass-capsule`; the
    // pill COMPOSES the class. Read the composite off the capsule register; assert the
    // SFC threads `glass-capsule` onto the `.segmented-indicator` node.
    const capsule = stripCss(capsuleRaw ?? readFile(CAPSULE_CSS));
    const sfc = sfcRaw ?? readFile(SFC);

    const indM = capsule.match(/\.glass-capsule\s*\{([^}]*)\}/s);
    const indBlock = indM ? indM[1] : "";
    facts.hasCapsuleBlock = !!indM;
    if (!indM) {
        violations.push("T2: .glass-capsule block not found in glass/glass-capsule.css (the extracted lifted-plate register the pill composes)");
        return { facts, violations };
    }

    // The active pill (.segmented-indicator) COMPOSES the .glass-capsule class.
    facts.indicatorComposesCapsule = /'glass-capsule'/.test(sfc) || /"glass-capsule"/.test(sfc);
    if (!facts.indicatorComposesCapsule) {
        violations.push("T2: SegmentedTabs.vue no longer composes 'glass-capsule' onto the active pill — the lifted-plate register is not threaded onto the indicator");
    }

    // The capsule fill reads the W55-tinted floating pair (through the
    // `--glass-capsule-fill` indirection + the warm-floor compose), NOT the raw rung.
    const bgM = indBlock.match(/background:\s*([\s\S]*?);/);
    facts.indicatorBg = bgM ? bgM[1].replace(/\s+/g, " ").trim() : null;
    if (!facts.indicatorBg) {
        violations.push("T2: .glass-capsule has no background declaration");
    } else if (/var\(--glass-bg-floating\)(?!-)/.test(facts.indicatorBg)) {
        violations.push("T2: .glass-capsule fills with the RAW var(--glass-bg-floating) — the W55 adaptive darken DROPS; read the element-level oklab-tinted seam var(--glass-bg-floating-tinted)");
    } else if (!/var\(--glass-bg-floating-tinted\)/.test(facts.indicatorBg)) {
        violations.push(`T2: .glass-capsule background is not the tinted floating seam var(--glass-bg-floating-tinted): '${facts.indicatorBg}'`);
    }

    // The box-shadow composes the directional rim + a real under-shadow, NOT the weak
    // `0 1px 3px rgba(0,0,0,0.08)` lift alone.
    const bsM = indBlock.match(/box-shadow:\s*([^;]+);/s);
    facts.indicatorShadow = bsM ? bsM[1].replace(/\s+/g, " ").trim() : null;
    if (!facts.indicatorShadow) {
        violations.push("T2: .segmented-indicator has no box-shadow (the lifted-plate composite)");
    } else {
        const readsRimTop = /var\(--glass-rim-top\)/.test(facts.indicatorShadow);
        const readsRimBottom = /var\(--glass-rim-bottom\)/.test(facts.indicatorShadow);
        const readsLiftShadow = /var\(--glass-shadow-/.test(facts.indicatorShadow);
        const weakLiftOnly =
            /0\s+1px\s+3px\s+rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\.08\s*\)/.test(facts.indicatorShadow) &&
            !readsLiftShadow;
        if (!readsRimTop || !readsRimBottom) {
            violations.push(`T2: .segmented-indicator box-shadow does not compose the directional rim pair (var(--glass-rim-top), var(--glass-rim-bottom)): '${facts.indicatorShadow.slice(0, 90)}'`);
        }
        if (!readsLiftShadow) {
            violations.push(`T2: .segmented-indicator box-shadow has no real layered glass under-shadow (var(--glass-shadow-*)) lifting the plate off the track: '${facts.indicatorShadow.slice(0, 90)}'`);
        }
        if (weakLiftOnly) {
            violations.push("T2: .segmented-indicator still rides the WEAK `0 1px 3px rgba(0,0,0,0.08)` lift alone — the plate barely differentiates (the HEAD low-contrast defect)");
        }
    }

    return { facts, violations };
}

// ── T3 — no dark D2 ring on the strip.
//   Neither the track nor the indicator writes a box-shadow/border hairline reading
//   --foreground or --border at a dark-on-top alpha (the BC.W-BLACK-BAR B3 anti-evasion
//   shape, scoped to the tab strip) — both read the directional rim register.
export function detectNoDarkRing(tabsRaw) {
    const violations = [];
    const facts = { darkRingHits: [] };
    const tabs = stripCss(tabsRaw ?? readFile(TABS_CSS));

    // Scan the track + indicator blocks for a load-bearing box-shadow/border reading
    // a --border ring or a --foreground top inset (the D2 dark hairline respelled).
    for (const sel of [".segmented-tabs", ".segmented-indicator"]) {
        const re = new RegExp(`\\${sel}\\s*\\{([^}]*)\\}`, "gs");
        let blockM;
        while ((blockM = re.exec(tabs)) !== null) {
            const block = blockM[1];
            // a box-shadow/border ring reading var(--border) (the HEAD 24%/30% dark hairline).
            const borderRingRe = /(?:box-shadow|border)[^;]*color-mix\(\s*in\s+srgb\s*,\s*var\(--border\)\s+([\d.]+)%/g;
            let rm;
            while ((rm = borderRingRe.exec(block)) !== null) {
                facts.darkRingHits.push({ sel, token: "--border", pct: Number(rm[1]) });
                violations.push(`T3: ${sel} writes a box-shadow/border ring reading var(--border) at ${rm[1]}% — the D2 dark hairline on the strip; re-point to the directional rim register (--glass-rim-top/--glass-rim-bottom)`);
            }
            // a TOP inset reading --foreground at a dark alpha (the catch-light must be LIGHT).
            const fgTopRe = /inset\s+0\s+1px\s+0[^,;]*color-mix\(\s*in\s+srgb\s*,\s*var\(--foreground\)\s+([\d.]+)%/g;
            while ((rm = fgTopRe.exec(block)) !== null) {
                if (Number(rm[1]) > 5) {
                    facts.darkRingHits.push({ sel, token: "--foreground-top", pct: Number(rm[1]) });
                    violations.push(`T3: ${sel} writes a TOP inset reading --foreground at ${rm[1]}% — a dark catch-light is the D2 bar respelled; the top edge MUST be light`);
                }
            }
        }
    }
    return { facts, violations };
}

// ── T4 — the engine + the ARIA contract are byte-untouched (this is a CSS-only wave).
//   The SFC carries the ARIA-role-per-variant (pill → aria-pressed, underline →
//   aria-selected) + the roving-tabindex keyboard contract; the engine files + the
//   --tab-indicator-* token values are intact. Born-GREEN; reds only if the wave drifts
//   into the SFC or engine.
export function detectEngineFence(sfcRaw, scalePaperRaw, engineRaws) {
    const violations = [];
    const facts = {};
    const sfc = sfcRaw ?? readFile(SFC);
    const scalePaper = stripCss(scalePaperRaw ?? readFile(SCALE_PAPER));

    // The ARIA-role-per-variant + roving-tabindex markers survive in the SFC.
    facts.hasAriaPressed = /aria-pressed/.test(sfc);
    facts.hasAriaSelected = /aria-selected/.test(sfc);
    facts.hasRovingTabindex = /rovingTabindex\s*\(/.test(sfc) && /:tabindex="rovingTabindex/.test(sfc);
    facts.hasStripKeydown = /onStripKeydown/.test(sfc) && /@keydown="onStripKeydown"/.test(sfc);
    if (!facts.hasAriaPressed) violations.push("T4: SegmentedTabs.vue dropped the `aria-pressed` per-variant marker (the pill group-role contract)");
    if (!facts.hasAriaSelected) violations.push("T4: SegmentedTabs.vue dropped the `aria-selected` per-variant marker (the underline tablist-role contract)");
    if (!facts.hasRovingTabindex) violations.push("T4: SegmentedTabs.vue dropped the roving-tabindex wiring (:tabindex=\"rovingTabindex(idx)\")");
    if (!facts.hasStripKeydown) violations.push("T4: SegmentedTabs.vue dropped the @keydown=\"onStripKeydown\" arrow-nav contract");

    // The engine constants are intact (the glide/clock is byte-fenced by the MATERIAL
    // wave). The squish CAP is the ONE engine value a documented downstream wave
    // (BC.W-LIQUID-TAB) re-authors — it lifts the cap 1.08 → 1.15 so the liquid-tab
    // pull visibly swells the pill — so T4 asserts the cap's LOCKSTEP INVARIANT
    // (constant == token, both in the visible-but-anti-taffy band [1.0, 1.2], the SOLE
    // cap source never forked) rather than freezing the literal. INDICATOR_RELEASE_AT_-
    // ARRIVAL + the --tab-indicator-duration clock stay byte-frozen (LIQUID-TAB touches
    // ONLY the cap + the draggable default, never the glide release / the clock).
    const constants = engineRaws?.constants ?? readFile(ENGINE_FILES[2]);
    const capConstM = constants.match(/DEFAULT_INDICATOR_MAX_STRETCH\s*=\s*([\d.]+)\b/);
    const capTokenM = scalePaper.match(/--tab-indicator-max-stretch:\s*([\d.]+)\s*;/);
    facts.capConst = capConstM ? Number(capConstM[1]) : null;
    facts.capToken = capTokenM ? Number(capTokenM[1]) : null;
    // Both present, in the visible-but-≤1.2 band, and in lockstep (constant == token).
    if (facts.capConst == null) {
        violations.push("T4: constants.ts DEFAULT_INDICATOR_MAX_STRETCH not found (the squish cap floor)");
    } else if (facts.capConst < 1.0 || facts.capConst > 1.2) {
        violations.push(`T4: DEFAULT_INDICATOR_MAX_STRETCH=${facts.capConst} is out of the visible-but-anti-taffy band [1.0, 1.2]`);
    }
    if (facts.capToken == null) {
        violations.push("T4: --tab-indicator-max-stretch not found (scale-paper.css — the squish cap token authority)");
    } else if (facts.capToken < 1.0 || facts.capToken > 1.2) {
        violations.push(`T4: --tab-indicator-max-stretch=${facts.capToken} is out of the visible-but-anti-taffy band [1.0, 1.2]`);
    }
    if (facts.capConst != null && facts.capToken != null && facts.capConst !== facts.capToken) {
        violations.push(`T4: the squish cap FORKED — DEFAULT_INDICATOR_MAX_STRETCH=${facts.capConst} ≠ --tab-indicator-max-stretch=${facts.capToken} (the constant + token are the SOLE cap source, never a fork)`);
    }
    facts.maxStretch = facts.capConst != null && facts.capConst >= 1.0 && facts.capConst <= 1.2;
    facts.releaseAtArrival = /INDICATOR_RELEASE_AT_ARRIVAL\s*=\s*0\.82\b/.test(constants);
    if (!facts.releaseAtArrival) violations.push("T4: constants.ts INDICATOR_RELEASE_AT_ARRIVAL drifted off 0.82 (the byte-frozen release fraction — the glide engine is fenced)");

    // The --tab-indicator-duration clock is intact (the calibrated snappy settle).
    facts.tokenDuration = /--tab-indicator-duration:\s*var\(--spring-snappy-duration\)\s*;/.test(scalePaper);
    if (!facts.tokenDuration) violations.push("T4: --tab-indicator-duration drifted off var(--spring-snappy-duration) (scale-paper.css — the calibrated clock; the material wave does NOT re-tune the spring)");

    // The engine source files still exist (the material upgrade did not delete them).
    for (const rel of ENGINE_FILES) {
        if (!readFile(rel)) violations.push(`T4: the byte-fenced engine file ${rel} is missing (the material upgrade must not touch the engine)`);
    }
    return { facts, violations };
}

// ── T5 — the active-label legibility a11y holds (source-side structural shape).
//   The active tab label is --foreground (the darkest ink) over the now-distinct pill,
//   and the pill fill is the W55-tinted FLOATING tier (which DARKENS over a bright field
//   → lifts label contrast, never buries it). The device-measured AA 4.5:1 is the π
//   readback; the SOURCE shape this gate asserts: the active label reads --foreground,
//   the pill fill is the tinted-floating seam (NOT a saturated/dark fill that would bury
//   --foreground), and the track keeps the quiet glass tier (the label reads over glass,
//   not an opaque slab).
export function detectActiveLabelLegibility(tabsRaw, capsuleRaw) {
    const violations = [];
    const facts = {};
    const tabs = stripCss(tabsRaw ?? readFile(TABS_CSS));
    // BD.W-TAB-IOS-CAPSULE — the pill fill now lives on `.glass-capsule` (the indicator
    // composes it); read the fill off the capsule register.
    const capsule = stripCss(capsuleRaw ?? readFile(CAPSULE_CSS));

    // The active tab label is --foreground (the darkest ink — the legibility anchor).
    // Scan EVERY `.segmented-tab[aria-pressed="true"]` rule block and pick the one that
    // sets `color:` (the anchor-name block at line 185 carries no color — skip it).
    facts.activeLabelColor = null;
    const activeRe = /\.segmented-tab\[aria-pressed="true"\][^{]*\{([^}]*)\}/gs;
    let am;
    while ((am = activeRe.exec(tabs)) !== null) {
        const colorM = am[1].match(/color:\s*([^;]+);/);
        if (colorM) {
            facts.activeLabelColor = colorM[1].trim();
            break;
        }
    }
    if (!facts.activeLabelColor) {
        violations.push("T5: the active-tab label color rule (.segmented-tab[aria-pressed=\"true\"] { color: … }) not found");
    } else if (!/var\(--foreground\)/.test(facts.activeLabelColor)) {
        violations.push(`T5: the active-tab label is not --foreground (the darkest ink anchor for AA legibility over the pill): '${facts.activeLabelColor}'`);
    }

    // The pill fill is the tinted-floating tier (the bright/near-white plate the W55
    // darken reaches), NOT a saturated --foreground / opaque bg-card / a low-α dark fill
    // that would bury the --foreground label (the material-over-legibility trap).
    const indM = capsule.match(/\.glass-capsule\s*\{([^}]*)\}/s);
    const indBg = indM ? (indM[1].match(/background:\s*([\s\S]*?);/)?.[1]?.replace(/\s+/g, " ").trim() ?? "") : "";
    facts.pillFill = indBg;
    if (/var\(--foreground\)/.test(indBg)) {
        violations.push("T5: the pill fill reads --foreground (a dark plate) — the active --foreground label would have ZERO contrast over it (the material-over-legibility trap)");
    }
    if (!/var\(--glass-bg-floating(?:-tinted)?\)/.test(indBg)) {
        violations.push(`T5: the pill fill is not the bright glass-floating tier (the near-white plate the W55 darken lifts to AA): '${indBg}'`);
    }

    return { facts, violations };
}

// ── Self-test bites — each planted defect MUST flag its clause (the anti-evasion floor).
export function selfTest() {
    const fails = [];
    const goodRadius = ":root { --radius-tab: var(--radius-pill); }";
    const goodTabs =
        ".segmented-tabs { --bouncy-slider-radius: var(--radius-tab); --bouncy-track-radius: calc(var(--bouncy-slider-radius) + var(--bouncy-track-trim)); }";

    // T1: a planted 6px slider radius reds.
    if (detectStadiumRadius(goodRadius, ".segmented-tabs { --bouncy-slider-radius: 6px; }").violations.length === 0) {
        fails.push("self-test T1: a planted `--bouncy-slider-radius: 6px` px literal did NOT red");
    }
    // T1: the good stadium shape passes.
    if (detectStadiumRadius(goodRadius, goodTabs).violations.length !== 0) {
        fails.push("self-test T1: the good stadium radius shape unexpectedly red");
    }
    // T2: a planted raw --glass-bg-floating fill reds (read off the capsule register).
    const goodSfc = "<template><div :class=\"['segmented-indicator', 'glass-capsule']\"></div></template>";
    if (detectDistinctPlate(".glass-capsule { background: var(--glass-bg-floating); box-shadow: var(--glass-rim-top), var(--glass-rim-bottom), var(--glass-shadow-floating); }", goodSfc).violations.length === 0) {
        fails.push("self-test T2: a planted raw var(--glass-bg-floating) fill did NOT red");
    }
    // T2: the weak-lift-only shadow reds.
    if (detectDistinctPlate(".glass-capsule { background: var(--glass-bg-floating-tinted); box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 0 0 1px color-mix(in srgb, var(--border) 30%, transparent); }", goodSfc).violations.length === 0) {
        fails.push("self-test T2: a planted weak `0 1px 3px rgba(0,0,0,0.08)` lift-only did NOT red");
    }
    // T2: a SFC that drops the glass-capsule compose reds.
    if (detectDistinctPlate(".glass-capsule { background: var(--glass-bg-floating-tinted); box-shadow: var(--glass-rim-top), var(--glass-rim-bottom), var(--glass-shadow-floating); }", "<template><div class=\"segmented-indicator\"></div></template>").violations.length === 0) {
        fails.push("self-test T2: a SFC that drops the 'glass-capsule' compose did NOT red");
    }
    // T3: a planted dark --border top ring reds.
    if (detectNoDarkRing(".segmented-indicator { box-shadow: 0 0 0 1px color-mix(in srgb, var(--border) 30%, transparent); }").violations.length === 0) {
        fails.push("self-test T3: a planted dark var(--border) 30% ring did NOT red");
    }
    // T3: the clean directional-rim strip passes.
    if (detectNoDarkRing(".segmented-tabs { box-shadow: var(--glass-rim-top), var(--glass-rim-bottom); } .segmented-indicator { box-shadow: var(--glass-rim-top), var(--glass-rim-bottom), var(--glass-shadow-floating); }").violations.length !== 0) {
        fails.push("self-test T3: a clean directional-rim strip unexpectedly red");
    }
    // T4: a stripped ARIA marker reds.
    if (detectEngineFence("<template><button :tabindex=\"rovingTabindex(idx)\"></button></template>", "--tab-indicator-max-stretch: 1.08;\n--tab-indicator-duration: var(--spring-snappy-duration);", { constants: "export const DEFAULT_INDICATOR_MAX_STRETCH = 1.08; export const INDICATOR_RELEASE_AT_ARRIVAL = 0.82;" }).violations.length === 0) {
        fails.push("self-test T4: a SFC missing aria-pressed/aria-selected did NOT red");
    }
    // T5: a planted dark pill fill reds (the fill now lives on the capsule register).
    if (detectActiveLabelLegibility(".segmented-tab[aria-pressed=\"true\"] { color: var(--foreground); }", ".glass-capsule { background: var(--foreground); }").violations.length === 0) {
        fails.push("self-test T5: a planted dark var(--foreground) pill fill did NOT red");
    }
    return fails;
}

export function detect() {
    const stadium = detectStadiumRadius();
    const plate = detectDistinctPlate();
    const noDarkRing = detectNoDarkRing();
    const engineFence = detectEngineFence();
    const legibility = detectActiveLabelLegibility();
    const selfTestFails = selfTest();
    const violations = [
        ...stadium.violations,
        ...plate.violations,
        ...noDarkRing.violations,
        ...engineFence.violations,
        ...legibility.violations,
        ...selfTestFails.map((f) => `SELF-TEST: ${f}`),
    ];
    return {
        violations,
        facts: {
            stadium: stadium.facts,
            plate: plate.facts,
            noDarkRing: noDarkRing.facts,
            engineFence: engineFence.facts,
            legibility: legibility.facts,
            selfTestFails,
        },
    };
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_TABS_IOS_ARTIFACT", "BC-tabs-ios");
    const { violations, facts } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:tabs-ios",
        facts,
        violations,
    });

    console.log("proof:tabs-ios — the iOS-27 glass tab system: small stadium PILLS, distinct lifted plate, no dark ring (BC.W-TABS-IOS, Band 3)");
    console.log(`  T1 stadium radius : --radius-tab=${facts.stadium.radiusTab ?? "MISSING"}   --bouncy-slider-radius=${facts.stadium.sliderRadius ?? "MISSING"}   literal hits=${facts.stadium.literalRadiusHits.length}`);
    console.log(`  T2 distinct plate : bg=${facts.plate.indicatorBg ?? "MISSING"}   rim+lift composed=${facts.plate.indicatorShadow && /rim-top/.test(facts.plate.indicatorShadow) && /glass-shadow-/.test(facts.plate.indicatorShadow) ? "yes ✓" : "NO ✗"}`);
    console.log(`  T3 no dark ring   : dark-ring hits=${facts.noDarkRing.darkRingHits.length}`);
    console.log(`  T4 engine fence   : aria(pressed=${facts.engineFence.hasAriaPressed},selected=${facts.engineFence.hasAriaSelected}) roving=${facts.engineFence.hasRovingTabindex} keydown=${facts.engineFence.hasStripKeydown} stretch=${facts.engineFence.maxStretch} clock=${facts.engineFence.tokenDuration}`);
    console.log(`  T5 label legible  : active=${facts.legibility.activeLabelColor ?? "MISSING"}   pill=glass-floating=${/glass-bg-floating/.test(facts.legibility.pillFill ?? "") ? "yes ✓" : "NO ✗"}`);
    console.log(`  self-tests        : ${facts.selfTestFails.length === 0 ? "all bites fire ✓" : `BROKEN ✗ (${facts.selfTestFails.length})`}`);

    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
