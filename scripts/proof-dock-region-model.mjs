#!/usr/bin/env node
// AX.W45 — proof:dock-region-model, the dock three-region + density-scale + glyph
// + DockSeparator SOURCE-STRUCTURE gate (device-free; runs + hard-REDs on EVERY
// runner). The PAINTED render (persistent slot in both states on one spring; the
// 1.5×-in-lockstep mobile scale; the axis-aware separator) is the W00 π live audit —
// NEVER a text gate alone (the cardinal lesson). This gate is the cheap fast-guard
// that the STRUCTURE is correct; the perceptual truth rides the π arm.
//
// THE WITNESSES (each born-RED at HEAD c72d2ac, driven GREEN by the wave):
//
//  1. PERSISTENT REGION — GlassDock.vue emits a `#persistent` slot region in-flow
//     (a `.dock-persistent` div guarded by `$slots.persistent`), NOT inside the
//     `:inert` two-pane crossfade. The dock.css `.dock-persistent` layout rule
//     exists. (RED at HEAD: the template emits only `dock-layer--full` +
//     `dock-layer--summary`; no `#persistent`.)
//
//  2. H/V PROPORTION PARITY — `.glass-dock.vertical` reads `var(--dock-layer-gap)`
//     (NOT a hardcoded `gap: 0.25rem`) and `var(--dock-padding-block)` (NOT the
//     density-blind `--dock-vertical-padding` override). (RED at HEAD: `gap: 0.25rem`
//     hardcoded.)
//
//  3. ONE --dock-scale MULTIPLIER, not two floor blocks — the `@media (pointer:
//     coarse)` dock block sets `--dock-scale: var(--dock-mobile-scale, …)`; the
//     density geometry is `calc(* var(--dock-scale))`-threaded; NO standalone
//     `--dock-control-size: var(--dock-touch-target)` floor block survives; a
//     `max(…, …)` WCAG clamp is present in the scaled control-size. (RED at HEAD:
//     two floor blocks, no --dock-scale.)
//
//  4. LIBRARY GLYPH OWNERSHIP — `.dock-icon-button > svg` reads `var(--dock-icon-
//     glyph)`; tokens.css mints `--dock-icon-glyph: calc(1.25rem * var(--dock-
//     scale))`. (RED at HEAD: no `.dock-icon-button > svg` rule.)
//
//  5. DOCKSEPARATOR PRIMITIVE — DockSeparator.vue exists, imports
//     `useOptionalDockContext`, is exported from dock/index.ts; the dock.css
//     separator paints PERPENDICULAR to the axis (a `.glass-dock.vertical
//     .dock-separator` horizontal-rule rule + a `.layout-grid .dock-separator`
//     section-break rule); NO demo `<div class="dock-separator">` survives. (RED at
//     HEAD: no export; 7 raw-class demo sites.)
//
//  6. DK2 FOUR-STATE — tokens.css mints `--dock-control-hover-bg` +
//     `--dock-control-active-bg` (distinct); the pickers' hover/active read them
//     (NOT the opaque `--muted`). (RED at HEAD: select/dropdown hover==active both
//     `var(--muted)`.)
//
//  7. DK8 RAIL — tokens.css mints `--dock-layer-rail-bg`; the indicator default
//     travels Y (`translateY`) for the column rail with a `.vertical`-group X
//     override (axis-aware). (RED at HEAD: no rail-bg token; X-only indicator.)
//
// House style mirrors proof-dock-opacity-lockstep.mjs: ESM .mjs, comment-strip
// first (false-witness discipline), a pure exported detector per source, a
// byte-stable JSON artefact via gate-output, a human summary, exit(1) on violation.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { readDockCss } from "./read-dock-css.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        DOCK_CSS: resolve(ROOT, "src/styles/dock.css"),
        DOCK_CONTROLS_CSS: resolve(ROOT, "src/styles/dock-controls.css"),
        TOKENS_CSS: resolve(ROOT, "src/styles/tokens.css"),
        GLASSDOCK: resolve(ROOT, "src/components/custom/dock/GlassDock.vue"),
        SEPARATOR: resolve(ROOT, "src/components/custom/dock/DockSeparator.vue"),
        BARREL: resolve(ROOT, "src/components/custom/dock/index.ts"),
        DEMO_DIR: resolve(ROOT, "demo/stories"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_DOCK_REGION_MODEL_ARTIFACT",
            "AX-dock-region-model",
        ),
    };
    return _cliPaths;
}

function blankRange(text, start, end) {
    let out = "";
    for (let i = start; i < end; i++) out += text[i] === "\n" ? "\n" : " ";
    return out;
}

// Strip CSS/JS block comments (false-witness discipline — never match a comment).
function stripBlockComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text[i] === "/" && text[i + 1] === "*") {
            const end = text.indexOf("*/", i + 2);
            const stop = end === -1 ? text.length : end + 2;
            result += blankRange(text, i, stop);
            i = stop;
        } else if (text[i] === "/" && text[i + 1] === "/") {
            const end = text.indexOf("\n", i + 2);
            const stop = end === -1 ? text.length : end;
            result += blankRange(text, i, stop);
            i = stop;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

// The pure detector — takes the comment-stripped sources, returns {facts,violations}.
export function detect(sources) {
    const { dockCss, dockControlsCss, tokensCss, glassDock, separator, barrel } =
        sources;
    const violations = [];
    const facts = {};

    // ── 1. PERSISTENT REGION ──────────────────────────────────────────────────
    const hasPersistentSlot =
        /\$slots\.persistent/.test(glassDock) &&
        /class="dock-persistent"/.test(glassDock) &&
        /name="persistent"/.test(glassDock);
    facts.persistentSlot = hasPersistentSlot;
    if (!hasPersistentSlot) {
        violations.push(
            "GlassDock.vue: the `#persistent` slot region (a `.dock-persistent` div guarded by `$slots.persistent` rendering `<slot name=\"persistent\">`) is missing",
        );
    }
    const hasPersistentRule = /\.dock-persistent\s*\{/.test(dockCss);
    facts.persistentLayoutRule = hasPersistentRule;
    if (!hasPersistentRule) {
        violations.push("dock.css: the `.dock-persistent` layout rule is missing");
    }

    // ── 2. H/V PROPORTION PARITY ──────────────────────────────────────────────
    // The vertical dock reads the density cascade (gap + padding), not a hardcoded
    // gap. The vertical rule that owns the LAYOUT (display: inline-flex + gap) is the
    // one we want — find the `.glass-dock.vertical {` rule whose body carries
    // `flex-direction: column` (the layout rule, not the earlier clip-only rule).
    const verticalBody = matchLayoutRuleBody(
        dockCss,
        /\.glass-dock\.vertical\s*\{/g,
        "flex-direction: column",
    );
    if (verticalBody === null) {
        violations.push(
            "dock.css: the `.glass-dock.vertical` layout rule (flex-direction: column) is missing",
        );
    } else {
        const hardcodedGap = /gap\s*:\s*0\.25rem\s*;/.test(verticalBody);
        const readsLayerGap = /gap\s*:\s*var\(--dock-layer-gap/.test(verticalBody);
        facts.verticalReadsLayerGap = readsLayerGap && !hardcodedGap;
        if (hardcodedGap || !readsLayerGap) {
            violations.push(
                "the vertical dock must read `gap: var(--dock-layer-gap)` (the density cascade), NOT a hardcoded `gap: 0.25rem`",
            );
        }
        if (/var\(--dock-vertical-padding/.test(verticalBody)) {
            violations.push(
                "the vertical dock must NOT read the density-blind `--dock-vertical-padding` override — route through `--dock-padding-block`",
            );
        }
    }

    // ── 3. ONE --dock-scale MULTIPLIER + clamp, no floor blocks ───────────────
    const coarseSetsScale =
        /@media\s*\(\s*pointer\s*:\s*coarse\s*\)[\s\S]*?--dock-scale\s*:\s*var\(--dock-mobile-scale/.test(
            dockCss,
        );
    facts.coarseSetsScale = coarseSetsScale;
    if (!coarseSetsScale) {
        violations.push(
            "the `@media (pointer: coarse)` dock block must set `--dock-scale: var(--dock-mobile-scale, …)` (the ONE multiplier), not a per-property floor",
        );
    }
    // The density geometry is calc(* --dock-scale)-threaded — the control-size is a
    // `max(calc(… * var(--dock-scale)), …)` (the `[\s\S]*?` spans the inner var()'s
    // own closing paren).
    const densityThreaded =
        /--dock-control-size\s*:\s*max\(\s*calc\([\s\S]*?\*\s*var\(--dock-scale\)/.test(
            dockCss,
        );
    facts.densityScaleThreaded = densityThreaded;
    if (!densityThreaded) {
        violations.push(
            "the density cascade `--dock-control-size` must be `max(calc(<base> * var(--dock-scale)), …)` (the scale-threaded clamp)",
        );
    }
    // The WCAG clamp is present (max(...) around the scaled control-size).
    const hasClamp = /--dock-control-size\s*:\s*max\(/.test(dockCss);
    facts.controlSizeClamp = hasClamp;
    if (!hasClamp) {
        violations.push(
            "the scaled `--dock-control-size` must carry a `max(…)` WCAG floor clamp (the 44px guarantee survives as a clamp, not a parallel rule)",
        );
    }
    // The two prior FLOOR blocks are subsumed — no `--dock-control-size: var(--dock-touch-target)` floor.
    const floorBlockSurvives =
        /--dock-control-size\s*:\s*var\(--dock-touch-target/.test(dockCss);
    facts.floorBlockSubsumed = !floorBlockSurvives;
    if (floorBlockSurvives) {
        violations.push(
            "the standalone `--dock-control-size: var(--dock-touch-target)` coarse FLOOR block must be subsumed into the --dock-scale clamp (no two-path)",
        );
    }
    const perButtonFloorSurvives =
        /\.dock-icon-button:not\(\.dock-icon-button--compact\)\s*\{\s*min-block-size\s*:\s*var\(--dock-touch-target/.test(
            dockControlsCss.replace(/\s+/g, " "),
        );
    facts.perButtonFloorScoped = !perButtonFloorSurvives;
    // (The standalone per-button floor is KEPT but must be scoped `:not(:where(.glass-dock *))`.)
    if (!/:not\(:where\(\.glass-dock \*\)\)/.test(dockControlsCss)) {
        violations.push(
            "the per-button coarse floor must be scoped `:not(:where(.glass-dock *))` (standalone-only — the in-dock floor is the --dock-scale clamp)",
        );
    }

    // ── 4. LIBRARY GLYPH OWNERSHIP ────────────────────────────────────────────
    const glyphRule =
        /\.dock-icon-button\s*>\s*svg\s*\{[^}]*var\(--dock-icon-glyph/.test(
            dockControlsCss,
        );
    facts.glyphOwnership = glyphRule;
    if (!glyphRule) {
        violations.push(
            "dock-controls.css: the `.dock-icon-button > svg { width/height: var(--dock-icon-glyph) }` glyph-ownership rule is missing",
        );
    }
    const glyphToken =
        /--dock-icon-glyph\s*:\s*calc\(\s*1\.25rem\s*\*\s*var\(--dock-scale/.test(
            tokensCss,
        );
    facts.glyphToken = glyphToken;
    if (!glyphToken) {
        violations.push(
            "tokens.css: `--dock-icon-glyph: calc(1.25rem * var(--dock-scale))` is missing",
        );
    }

    // ── 5. DOCKSEPARATOR PRIMITIVE ────────────────────────────────────────────
    const sepImportsCtx = /useOptionalDockContext/.test(separator);
    facts.separatorReadsContext = sepImportsCtx;
    if (!sepImportsCtx) {
        violations.push(
            "DockSeparator.vue must import `useOptionalDockContext` (the orientation/layout read)",
        );
    }
    const sepExported = /export\s*\{\s*default as DockSeparator\s*\}/.test(barrel);
    facts.separatorExported = sepExported;
    if (!sepExported) {
        violations.push(
            "dock/index.ts must export `DockSeparator` from the `/dock` barrel",
        );
    }
    const sepPerpVertical =
        /\.glass-dock\.vertical\s+\.dock-separator[\s\S]{0,200}?height\s*:\s*1px/.test(
            dockCss,
        );
    facts.separatorPerpendicular = sepPerpVertical;
    if (!sepPerpVertical) {
        violations.push(
            "dock.css: the vertical-dock separator must paint a HORIZONTAL rule (`.glass-dock.vertical .dock-separator { height: 1px }`) — perpendicular to the column axis",
        );
    }
    const sepGridBreak =
        /\.glass-dock\.layout-grid\s+\.dock-separator[\s\S]{0,200}?grid-column\s*:\s*1\s*\/\s*-1/.test(
            dockCss,
        );
    facts.separatorGridBreak = sepGridBreak;
    if (!sepGridBreak) {
        violations.push(
            "dock.css: the grid-dock separator must paint a full-row section break (`.glass-dock.layout-grid .dock-separator { grid-column: 1 / -1 }`)",
        );
    }

    // ── 6. DK2 FOUR-STATE ─────────────────────────────────────────────────────
    const familyTokens =
        /--dock-control-hover-bg\s*:/.test(tokensCss) &&
        /--dock-control-active-bg\s*:/.test(tokensCss);
    facts.familyStateTokens = familyTokens;
    if (!familyTokens) {
        violations.push(
            "tokens.css: the `--dock-control-{hover,active}-bg` four-state family pair is missing",
        );
    }
    // The pickers must NOT stamp the opaque --muted on hover/active any more.
    const pickerHoverOpaque =
        /\.dock-select-trigger:hover:not\(:disabled\),[\s\S]{0,120}?background\s*:\s*var\(--muted\)/.test(
            dockControlsCss,
        );
    facts.pickerHoverGlass = !pickerHoverOpaque;
    if (pickerHoverOpaque) {
        violations.push(
            "the select/dropdown picker hover must read `--dock-control-hover-bg` (glass-translucent), NOT the opaque `var(--muted)` plate",
        );
    }

    // ── 7. DK8 RAIL ───────────────────────────────────────────────────────────
    const railBgToken = /--dock-layer-rail-bg\s*:/.test(tokensCss);
    facts.railBgToken = railBgToken;
    if (!railBgToken) {
        violations.push(
            "tokens.css: the `--dock-layer-rail-bg` rail-surface token is missing (DK8 — the rail had no plate)",
        );
    }
    // The default indicator travels Y (column rail); the .vertical group overrides X.
    const indicatorAxisAware =
        /\.dock-layer-tab-indicator\s*\{[\s\S]{0,260}?transform\s*:\s*translateY\(var\(--reka-tabs-indicator-position/.test(
            dockCss,
        ) &&
        /\.dock-layer-group\.vertical\s+\.dock-layer-rail\s+\.dock-layer-tab-indicator[\s\S]{0,200}?transform\s*:\s*translateX/.test(
            dockCss,
        );
    facts.indicatorAxisAware = indicatorAxisAware;
    if (!indicatorAxisAware) {
        violations.push(
            "the rail indicator must be AXIS-AWARE: default `translateY` (column rail) with a `.vertical`-group `translateX` override (DK8 mis-alignment)",
        );
    }

    return { facts, violations };
}

// Find the `{ … }` body of the first rule whose selector matches `selectorRe`.
function matchRuleBody(css, selectorRe) {
    const m = css.match(selectorRe);
    if (!m) return null;
    const open = css.indexOf("{", m.index);
    if (open === -1) return null;
    const close = css.indexOf("}", open);
    if (close === -1) return null;
    return css.slice(open + 1, close);
}

// Find the `{ … }` body of the rule whose selector matches `selectorRe` (a GLOBAL
// regex) AND whose body CONTAINS `marker` — disambiguates same-selector rules (e.g.
// the `.glass-dock.vertical` clip rule vs the layout rule). Returns the first
// matching body or null. (CSS declaration bodies carry no `{`, so the next `}` is
// the rule close.)
function matchLayoutRuleBody(css, selectorRe, marker) {
    for (const m of css.matchAll(selectorRe)) {
        const open = css.indexOf("{", m.index);
        if (open === -1) continue;
        const close = css.indexOf("}", open);
        if (close === -1) continue;
        const body = css.slice(open + 1, close);
        if (body.includes(marker)) return body;
    }
    return null;
}

function demoSeparatorRawSites(ROOT) {
    // No `<div class="dock-separator">` may survive in the demo (the 7 migrated).
    const hits = [];
    const walk = (dir) => {
        for (const name of readdirSync(dir)) {
            const p = resolve(dir, name);
            if (statSync(p).isDirectory()) walk(p);
            else if (name.endsWith(".vue")) {
                const src = readFileSync(p, "utf8");
                if (/class="dock-separator"/.test(src)) hits.push(p);
            }
        }
    };
    walk(resolve(ROOT, "demo/stories"));
    return hits;
}

export function detectSources(sources) {
    return detect({
        dockCss: stripBlockComments(sources.dockCss ?? ""),
        dockControlsCss: stripBlockComments(sources.dockControlsCss ?? ""),
        tokensCss: stripBlockComments(sources.tokensCss ?? ""),
        glassDock: stripBlockComments(sources.glassDock ?? ""),
        separator: stripBlockComments(sources.separator ?? ""),
        barrel: stripBlockComments(sources.barrel ?? ""),
    });
}

function run() {
    const P = cliPaths();
    const sources = {
        dockCss: readDockCss(P.ROOT),
        dockControlsCss: readFileSync(P.DOCK_CONTROLS_CSS, "utf8"),
        tokensCss: readFileSync(P.TOKENS_CSS, "utf8"),
        glassDock: readFileSync(P.GLASSDOCK, "utf8"),
        separator: existsOr(P.SEPARATOR),
        barrel: readFileSync(P.BARREL, "utf8"),
    };
    const { facts, violations } = detectSources(sources);

    // The demo-migration witness (the 7 raw-class sites are gone).
    const rawSites = demoSeparatorRawSites(P.ROOT);
    facts.demoRawSeparatorSites = rawSites.map((p) => p.slice(P.ROOT.length + 1));
    if (rawSites.length > 0) {
        violations.push(
            `${rawSites.length} demo \`<div class="dock-separator">\` raw-class site(s) survive — migrate to <DockSeparator>: ${facts.demoRawSeparatorSites.join(", ")}`,
        );
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "structure",
        sourceOfTruth: "the W00 π live audit (W45-dock-region-model.json)",
        command: "npm run proof:dock-region-model",
        facts,
        violations,
    });

    console.log(
        "proof:dock-region-model — the dock three-region + --dock-scale + glyph + DockSeparator source gate (AX.W45)",
    );
    console.log(`  persistent slot region    : ${facts.persistentSlot ? "YES" : "NO"}`);
    console.log(
        `  H/V parity (vertical gap) : ${facts.verticalReadsLayerGap ? "YES" : "NO"}`,
    );
    console.log(
        `  --dock-scale multiplier   : ${facts.coarseSetsScale ? "YES" : "NO"}  clamp ${facts.controlSizeClamp ? "YES" : "NO"}  floors-subsumed ${facts.floorBlockSubsumed ? "YES" : "NO"}`,
    );
    console.log(`  glyph ownership           : ${facts.glyphOwnership ? "YES" : "NO"}`);
    console.log(
        `  DockSeparator (export/ctx/perp/grid) : ${facts.separatorExported ? "Y" : "N"}/${facts.separatorReadsContext ? "Y" : "N"}/${facts.separatorPerpendicular ? "Y" : "N"}/${facts.separatorGridBreak ? "Y" : "N"}`,
    );
    console.log(`  DK2 four-state tokens     : ${facts.familyStateTokens ? "YES" : "NO"}`);
    console.log(`  DK8 rail axis-aware       : ${facts.indicatorAxisAware ? "YES" : "NO"}`);
    console.log(`  demo raw-separator sites  : ${facts.demoRawSeparatorSites.length}`);
    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(P.ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

function existsOr(path) {
    try {
        return readFileSync(path, "utf8");
    } catch {
        return "";
    }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
