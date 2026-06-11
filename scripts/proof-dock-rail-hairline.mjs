#!/usr/bin/env node
// AZ.W-DOCK-RAIL — the hairline-rail register gate (proof:dock-rail-hairline).
//
// The born-RED→GREEN device-free SOURCE-STRUCTURE arm for the in-dock switcher
// rail rebuild. The CSS string / SFC template / token is the artefact (NOT a
// grep-for-runtime-behaviour); the PAINTED truth (the indicator paints the token
// register not the near-white plate, the rail reads as a hairline not a fused
// gutter, the glyph computes ≥14px wide not a 4px sliver) is the binding visual
// truth proven by the π live readback captured in
// docs/tranches/AZ/audit/visual/W-DOCK-RAIL-DELTA.md — this gate is the no-device
// CI half. A source-green/visually-broken gap is the exact AZ failure class (the
// A1-1 re-open of R3-1); both halves must hold for a clean close.
//
// Three falsifiable witnesses (each born-RED at HEAD pre-wave, driven GREEN by
// the wave):
//
//   W1 — INDICATOR PAINTS THE TOKEN, NOT THE PLATE. The dock rail's
//        `<TabsIndicator>` render does NOT inherit the unconditional
//        `bg-(--glass-bg-quiet) [backdrop-filter:…]` plate utilities (the
//        `surface` prop drops them), so the `.dock-layer-tab-indicator` token rule
//        is the sole paint AND that rule references the `--dock-layer-rail-active`
//        register. Bite (anti-evasion): the SOURCE half asserts the POSITIVE — the
//        rail-indicator render carries no `bg-(--glass-bg-*` / `[backdrop-filter:`
//        token-utility (it does NOT merely look for `:surface="false"` as a
//        literal — a renamed/re-defaulted prop must still drop the plate), AND the
//        `.dock-layer-tab-indicator` rule's resolved `background` references
//        `--dock-layer-rail-active` (or its glass-tier fallback), never
//        `--glass-bg-quiet` directly. RED at HEAD: the render is the bare
//        `<TabsIndicator class="dock-layer-tab-indicator"/>` inheriting the baked
//        plate. (The π luminance-floor + tint-source readback is the binding
//        positive truth — see the DELTA.)
//   W2 — THE RAIL IS A HAIRLINE, NOT A FUSED PLATE. `--dock-layer-rail-bg`
//        resolves to `transparent` (POSITIVELY no fill — not merely "any token
//        other than --surface-tint-8"; a re-point to -4/-6 is a LIGHTER blob, still
//        a plate), `.dock-layer-rail` carries NO rounded plate background (no
//        `--radius-md` / `--dock-layer-rail-radius` plate), the divider is a single
//        hairline `border-right` re-keyed to `--dock-layer-rail-divider`, AND no
//        `.dock-layer-rail::before`/`::after` paints a plate fill (the
//        pseudo-element evasion). RED at HEAD: `--surface-tint-8` fill +
//        `--radius-md` background.
//   W3 — THE GLYPH IS FLOORED, NOT A SLIVER. A `.dock-layer-rail .dock-layer-tab
//        svg` rule sets BOTH a concrete `width` ≥0.875rem/14px (NOT `auto`/`100%`,
//        which re-collapse inside the column inline-flex) AND `flex-shrink: 0` (a
//        width without the shrink guard re-squishes), on a selector matching the
//        rendered rail DOM. RED at HEAD: `grep svg layer-group.css` returns 0 — no
//        rule, the 4px collapse. Source-existence is NECESSARY; the π ≥14px live
//        readback (in the DELTA) is the binding floor.
//
// House style mirrors proof-dock-perfection.mjs / proof-dock-unify.mjs: ESM .mjs,
// comment-strip first (false-witness discipline), a pure exported detector, a
// byte-stable JSON artefact via gate-output, a human summary, process.exit(1) on
// any violation.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { readDockCss } from "./read-dock-css.mjs";
// AY.W-CSS1: tokens.css is a thin @import root over tokens/*.css partials; the
// DEFINITIONS live in the partials, so read the concatenated monolith.
import { readMonolith } from "./read-css-monoliths.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        TOKENS_CSS: resolve(ROOT, "src/styles/tokens.css"),
        DOCK_CSS: resolve(ROOT, "src/styles/dock.css"),
        DOCK_LAYER_GROUP_VUE: resolve(
            ROOT,
            "src/components/custom/dock/DockLayerGroup.vue",
        ),
        TABS_INDICATOR_VUE: resolve(ROOT, "src/components/ui/tabs/TabsIndicator.vue"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_DOCK_RAIL_HAIRLINE_ARTIFACT",
            "AZ-dock-rail-hairline",
        ),
    };
    return _cliPaths;
}

function blankRange(text, start, end) {
    let out = "";
    for (let i = start; i < end; i++) out += text[i] === "\n" ? "\n" : " ";
    return out;
}

function stripBlockComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text[i] === "/" && text[i + 1] === "*") {
            const end = text.indexOf("*/", i + 2);
            const stop = end === -1 ? text.length : end + 2;
            result += blankRange(text, i, stop);
            i = stop;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

// Strip Vue SFC `<!-- … -->` HTML comments — a commented-out render must not
// satisfy or trip a witness.
function stripHtmlComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text.startsWith("<!--", i)) {
            const end = text.indexOf("-->", i + 4);
            const stop = end === -1 ? text.length : end + 3;
            result += blankRange(text, i, stop);
            i = stop;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

/**
 * Resolve a `--name:` token VALUE from a comment-stripped CSS string (the LAST
 * `:root`-level assignment wins, mirroring the cascade). Returns the trimmed
 * value or null. Skips `var(--name,` fallback consumers (a value, not a def).
 */
function tokenValue(css, name) {
    // Match `--name: <value>;` assignments that are NOT inside a var() fallback
    // (a `--name:` preceded by `var(` + comma is a consumer fallback, not a def).
    const re = new RegExp(`(^|[^,(\\w-])${name}\\s*:\\s*([^;{}]+);`, "g");
    let m;
    let last = null;
    while ((m = re.exec(css)) !== null) {
        // Guard against the `var(--name,` fallback form (the char before the token
        // run is part of a `var(` open). The negative class above already rejects
        // a `,`/`(` immediately before, but `var( --name` with a space slips it —
        // re-check the 8 chars before the match for a `var(` open with no close.
        const pre = css.slice(Math.max(0, m.index - 8), m.index);
        if (/var\(\s*$/.test(pre)) continue;
        last = m[2].trim();
    }
    return last;
}

/**
 * The W-DOCK-RAIL detector. Pure: takes the comment-stripped sources, returns
 * `{ facts, violations }`. Each witness pushes a falsifiable violation string.
 */
export function detectDockRailHairline(sources) {
    const tokensCss = stripBlockComments(sources.tokensCss ?? "");
    const dockCss = stripBlockComments(sources.dockCss ?? "");
    const layerGroupVue = stripHtmlComments(sources.layerGroupVue ?? "");
    const tabsIndicatorVue = stripHtmlComments(sources.tabsIndicatorVue ?? "");

    const violations = [];

    // ── W1 — indicator paints the token, not the baked plate ──────────────────
    // (a) The dock rail's <TabsIndicator class="dock-layer-tab-indicator" …>
    //     render must NOT inherit the unconditional plate utilities. We isolate
    //     the rail indicator render line (the one carrying `dock-layer-tab-indicator`)
    //     and assert it does not carry a `bg-(--glass-bg-` / `[backdrop-filter:`
    //     token-utility AND that the plate is gated (a `surface` axis drops it).
    const railIndicatorRender =
        layerGroupVue
            .split("\n")
            .find((ln) => ln.includes("dock-layer-tab-indicator")) ?? "";
    const railIndicatorPresent = railIndicatorRender.length > 0;
    if (!railIndicatorPresent) {
        violations.push(
            "W1: no `.dock-layer-tab-indicator` <TabsIndicator> render found in DockLayerGroup.vue.",
        );
    }
    // The render must carry NO inline plate utility AND must gate the base plate
    // (a `surface` attr present and falsy — `:surface="false"` or `surface={false}`
    // or `:surface` bound to a falsy expr). We assert the POSITIVE drop, not a
    // literal `:surface="false"` (a renamed/re-defaulted prop is acceptable so long
    // as the plate is provably suppressed at the render).
    const railIndicatorBakesPlate =
        /bg-\(--glass-bg-/.test(railIndicatorRender) ||
        /\[backdrop-filter:/.test(railIndicatorRender);
    if (railIndicatorBakesPlate) {
        violations.push(
            "W1: the rail `<TabsIndicator>` render bakes a `bg-(--glass-bg-*` / `[backdrop-filter:` plate utility inline (it must inherit none).",
        );
    }
    // The reka TabsIndicator.vue wrapper must make the plate CONDITIONAL (the
    // `surface` axis), and the rail render must opt out. We assert: (i) the base
    // wrapper gates the plate behind a `surface` prop (the utilities are no longer
    // unconditional), and (ii) the rail render binds that gate falsy.
    const wrapperGatesPlate =
        /surface\b/.test(tabsIndicatorVue) &&
        // the plate utilities appear under a `props.surface &&` (or similar) guard,
        // not as a bare unconditional class-literal segment.
        /surface\s*&&\s*['"][^'"]*bg-\(--glass-bg-/.test(tabsIndicatorVue);
    if (!wrapperGatesPlate) {
        violations.push(
            "W1: TabsIndicator.vue does not gate the `bg-(--glass-bg-quiet) [backdrop-filter:…]` plate behind a `surface` axis (the base register bakes it unconditionally → the @layer token rule always loses).",
        );
    }
    const railRenderOptsOut =
        /:surface=["']false["']/.test(railIndicatorRender) ||
        /\bsurface=\{?\s*false\s*\}?/.test(railIndicatorRender) ||
        // a bound falsy expression (`:surface="someFalsyRef"`) — accept any explicit
        // surface binding on the rail indicator (the wrapper default is `true`, so a
        // present binding is the opt-out signal).
        /:surface=/.test(railIndicatorRender);
    if (railIndicatorPresent && !railRenderOptsOut) {
        violations.push(
            "W1: the rail `<TabsIndicator class=\"dock-layer-tab-indicator\">` render does not opt out of the base plate (no `:surface=\"false\"` / surface gate) — it inherits the unconditional glass plate.",
        );
    }
    // (b) The `.dock-layer-tab-indicator` token rule's resolved `background`
    //     references `--dock-layer-rail-active` (the token register), never
    //     `--glass-bg-quiet` directly.
    const indicatorRuleMatch = dockCss.match(
        /\.dock-layer-tab-indicator\s*\{([^}]*)\}/,
    );
    const indicatorRuleBody = indicatorRuleMatch ? indicatorRuleMatch[1] : "";
    const indicatorBgMatch = indicatorRuleBody.match(/background\s*:\s*([^;]+);/);
    const indicatorBg = indicatorBgMatch ? indicatorBgMatch[1].trim() : "";
    const indicatorRefsRailActive = /--dock-layer-rail-active/.test(indicatorBg);
    const indicatorRefsGlassQuiet = /--glass-bg-quiet/.test(indicatorBg);
    if (!indicatorRuleMatch) {
        violations.push(
            "W1: no `.dock-layer-tab-indicator { … }` rule found in the dock CSS authority.",
        );
    } else if (!indicatorRefsRailActive) {
        violations.push(
            `W1: the .dock-layer-tab-indicator background does not reference --dock-layer-rail-active (got: "${indicatorBg}").`,
        );
    }
    if (indicatorRefsGlassQuiet) {
        violations.push(
            "W1: the .dock-layer-tab-indicator background still references --glass-bg-quiet (the near-white plate must be retired).",
        );
    }

    // ── W2 — the rail is a hairline, not a fused plate ────────────────────────
    // (a) --dock-layer-rail-bg resolves transparent (POSITIVELY no fill).
    const railBg = tokenValue(tokensCss, "--dock-layer-rail-bg");
    const railBgTransparent = railBg !== null && /^transparent$/i.test(railBg);
    if (railBg === null) {
        violations.push("W2: --dock-layer-rail-bg is not defined.");
    } else if (!railBgTransparent) {
        violations.push(
            `W2: --dock-layer-rail-bg is not transparent (got: "${railBg}") — ANY surface-tint/opaque fill is a plate, the rail must paint no fill.`,
        );
    }
    // The rail bg fallback in the rule must also be transparent (no
    // `var(--dock-layer-rail-bg, var(--surface-tint-8))` plate fallback).
    const railRuleMatch = dockCss.match(
        /\.dock-layer-rail\s*\{([^}]*background[^}]*)\}/,
    );
    const railRuleBody = railRuleMatch ? railRuleMatch[1] : "";
    const railRuleBgMatch = railRuleBody.match(/background\s*:\s*([^;]+);/);
    const railRuleBg = railRuleBgMatch ? railRuleBgMatch[1].trim() : "";
    const railRuleFallbackPlate = /--surface-tint-\d+/.test(railRuleBg);
    if (railRuleFallbackPlate) {
        violations.push(
            `W2: the .dock-layer-rail background fallback still names a --surface-tint plate (got: "${railRuleBg}").`,
        );
    }
    // (b) No rounded plate background: no `--radius-md` / `--dock-layer-rail-radius`
    //     border-radius painting a plate on the rail box.
    const railHasRadiusPlate =
        /\.dock-layer-rail\s*\{[^}]*border-radius\s*:[^;]*(--radius-md|--dock-layer-rail-radius)/.test(
            dockCss,
        );
    if (railHasRadiusPlate) {
        violations.push(
            "W2: .dock-layer-rail still carries a `border-radius: var(--radius-md / --dock-layer-rail-radius)` plate background (the rounded plate must drop — the rail is a hairline, not a rounded gutter).",
        );
    }
    // (c) The divider is the single hairline border re-keyed to the token.
    const dividerKeyed = /--dock-layer-rail-divider/.test(dockCss);
    if (!dividerKeyed) {
        violations.push(
            "W2: the rail divider is not re-keyed to --dock-layer-rail-divider (the single hairline edge must be the tunable token).",
        );
    }
    // (d) The pseudo-element evasion: no `.dock-layer-rail::before/::after` paints a
    //     plate fill (a `background:` that is not `none`/`transparent`).
    const railPseudoFill = /\.dock-layer-rail::(before|after)\s*\{[^}]*background\s*:\s*(?!none|transparent)[^;}]+/.test(
        dockCss,
    );
    if (railPseudoFill) {
        violations.push(
            "W2: a .dock-layer-rail::before/::after paints a plate fill (the pseudo-element evasion — the rail box must paint no surface fill on any element).",
        );
    }

    // ── W3 — the glyph is floored, not a sliver ───────────────────────────────
    const svgRuleMatch = dockCss.match(
        /\.dock-layer-rail\s+\.dock-layer-tab\s+svg\s*\{([^}]*)\}/,
    );
    const svgRuleBody = svgRuleMatch ? svgRuleMatch[1] : "";
    if (!svgRuleMatch) {
        violations.push(
            "W3: no `.dock-layer-rail .dock-layer-tab svg { … }` rule in the dock CSS authority — the size-4 icon collapses to a 4px sliver inside the column inline-flex.",
        );
    } else {
        // Concrete width ≥0.875rem/14px, NOT auto/100%.
        const widthMatch = svgRuleBody.match(/(?<!min-|max-)width\s*:\s*([^;]+);/);
        const widthVal = widthMatch ? widthMatch[1].trim() : "";
        const widthIsAutoOrPct = /^(auto|100%)$/i.test(widthVal);
        // Parse a rem/px value; require ≥14px (0.875rem).
        let widthPx = NaN;
        const remM = widthVal.match(/^([\d.]+)\s*rem$/i);
        const pxM = widthVal.match(/^([\d.]+)\s*px$/i);
        if (remM) widthPx = parseFloat(remM[1]) * 16;
        else if (pxM) widthPx = parseFloat(pxM[1]);
        const widthFloored = !widthIsAutoOrPct && !Number.isNaN(widthPx) && widthPx >= 14;
        if (!widthFloored) {
            violations.push(
                `W3: the .dock-layer-tab svg width is not a concrete ≥14px floor (got: "${widthVal}") — auto/100%/<14px re-collapses inside the column inline-flex.`,
            );
        }
        // flex-shrink: 0 (the shrink guard).
        const shrinkZero = /flex-shrink\s*:\s*0\b/.test(svgRuleBody);
        if (!shrinkZero) {
            violations.push(
                "W3: the .dock-layer-tab svg rule lacks `flex-shrink: 0` — a width without the shrink guard re-squishes inside the flex tab.",
            );
        }
    }

    const facts = {
        w1: {
            railIndicatorPresent,
            railIndicatorBakesPlate,
            wrapperGatesPlate,
            railRenderOptsOut,
            indicatorBg,
            indicatorRefsRailActive,
            indicatorRefsGlassQuiet,
        },
        w2: {
            railBg,
            railBgTransparent,
            railRuleBg,
            railRuleFallbackPlate,
            railHasRadiusPlate,
            dividerKeyed,
            railPseudoFill,
        },
        w3: {
            svgRulePresent: Boolean(svgRuleMatch),
            svgRuleBody: svgRuleBody.replace(/\s+/g, " ").trim(),
        },
    };

    return { facts, violations };
}

function safeRead(path) {
    try {
        return readFileSync(path, "utf8");
    } catch {
        return "";
    }
}

function run() {
    const {
        ROOT,
        DOCK_LAYER_GROUP_VUE,
        TABS_INDICATOR_VUE,
        ARTIFACT,
    } = cliPaths();

    const { facts, violations } = detectDockRailHairline({
        tokensCss: readMonolith(ROOT, "tokens"),
        dockCss: readDockCss(ROOT),
        layerGroupVue: safeRead(DOCK_LAYER_GROUP_VUE),
        tabsIndicatorVue: safeRead(TABS_INDICATOR_VUE),
    });

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:dock-rail-hairline",
        facts,
        violations,
    });

    console.log(
        "proof:dock-rail-hairline — the hairline-rail register (W1 token-not-plate · W2 hairline-not-gutter · W3 floored-not-sliver) (AZ.W-DOCK-RAIL)",
    );
    console.log(
        `  W1 indicator paints the token : ${
            !facts.w1.railIndicatorBakesPlate &&
            facts.w1.wrapperGatesPlate &&
            facts.w1.railRenderOptsOut &&
            facts.w1.indicatorRefsRailActive &&
            !facts.w1.indicatorRefsGlassQuiet
                ? "YES"
                : "NO"
        }  (bg: ${facts.w1.indicatorBg || "—"})`,
    );
    console.log(
        `  W2 rail is a hairline         : ${
            facts.w2.railBgTransparent &&
            !facts.w2.railRuleFallbackPlate &&
            !facts.w2.railHasRadiusPlate &&
            facts.w2.dividerKeyed &&
            !facts.w2.railPseudoFill
                ? "YES"
                : "NO"
        }  (rail-bg: ${facts.w2.railBg || "—"})`,
    );
    console.log(
        `  W3 glyph floored ≥14px        : ${
            facts.w3.svgRulePresent &&
            !violations.some((v) => v.startsWith("W3"))
                ? "YES"
                : "NO"
        }`,
    );

    if (violations.length > 0) {
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
