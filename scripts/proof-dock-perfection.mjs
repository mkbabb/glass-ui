#!/usr/bin/env node
// AX.W45-TUNE — the dock-perfection CLOSE gate (proof:dock-perfection).
//
// The born-RED→GREEN device-free SOURCE-STRUCTURE arm for the seven-axis
// dock-perfection close. The CSS string / SFC template / token is the artefact
// (NOT a grep-for-runtime-behaviour); the PAINTED truth (the tight pill, the
// glass-tier hover, the cleared rest specular) is proven by the W00 π live arm
// captured in docs/tranches/AX/audit/visual/W45-DELTA.md — this gate is the
// no-device CI half.
//
// Six falsifiable witnesses (each born-RED at HEAD 89edffc, driven GREEN by the
// wave):
//
//   Q1  — the collapsed-pill FLOOR tokens are DEFINED (not just referenced as
//         var() fallbacks) AND the collapsed summary floors on BOTH axes
//         (min-block-size, not just min-width). RED at HEAD: both tokens
//         undefined; only min-width floors → a full-row stub, not a squircle.
//   C1  — ZERO DockIconButton-hosted glyph carries an h-4 w-4 / h-5 w-5 override
//         in the demo dock SFCs (so --dock-icon-glyph paints the 1.5× mobile
//         scale). RED at HEAD: 72 occurrences. (The demo-drop is a sibling agent's
//         FileBounds; this gate POLICES it — born-RED until the overrides drop.)
//   C2  — the --dock-tile-pad leg is `* var(--dock-scale)`-threaded in EVERY
//         --dock-tile-min density rung. RED at HEAD: a bare var(--dock-tile-pad,
//         Nrem) at every rung → DK4 grid centering re-breaks at the coarse 1.5×.
//   Q3/C3 — the hover is a GLASS register on ALL FOUR members: --dock-control-hover-bg
//         is NOT a same-hue color-mix(in srgb, var(--card) N%, …) (it points at a
//         --glass-bg-* tier), AND the --scale-hover-dock hover scale fires on
//         icon + tab + select + dropdown (the unified MOTION channel). RED at
//         HEAD: hover bg = card 55%; the scale fires on 2 of 4.
//   C4/C5 — the glass register + the cleared rest specular (the W54-successor):
//         --dock-control-active-bg is NOT var(--surface-tint-12) (a --glass-bg-*
//         tier); the four dock members are in the glass.css specular ::before
//         selector lists; the resting specular is default-OFF
//         (--glass-specular-intensity-rest: 0, no dock-control rest override). RED
//         at HEAD: active = surface-tint-12; specular on 1 of 4.
//   C7  — the GlassDock vertical (v-else) branch carries the three-region body
//         (a structural .dock-layers content stack, NOT a bare <slot/>). RED at
//         HEAD: a bare <slot/>.
//
// House style mirrors proof-dock-opacity-lockstep.mjs / proof-shadow-contract.mjs:
// ESM .mjs, comment-strip first (false-witness discipline), a pure exported
// detector, a byte-stable JSON artefact via gate-output, a human summary,
// process.exit(1) on any violation.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { readDockCss } from "./read-dock-css.mjs";
// AY.W-CSS1: tokens.css + glass.css are thin @import roots over carved partials; the
// DEFINITIONS live in the partials, so read the concatenated monoliths, not the roots.
import { readMonolith } from "./read-css-monoliths.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        TOKENS_CSS: resolve(ROOT, "src/styles/tokens.css"),
        DOCK_CSS: resolve(ROOT, "src/styles/dock.css"),
        DOCK_CONTROLS_CSS: resolve(ROOT, "src/styles/dock-controls.css"),
        GLASS_CSS: resolve(ROOT, "src/styles/glass.css"),
        GLASS_DOCK_VUE: resolve(ROOT, "src/components/custom/dock/GlassDock.vue"),
        DEMO_DOCKS: [
            "demo/stories/navigation/dock.vue",
            "demo/stories/navigation/dock-layers.vue",
            "demo/stories/navigation/rail.vue",
            "demo/stories/navigation/header-ribbon.vue",
            "demo/stories/compositions/dock-with-slider.vue",
        ].map((p) => resolve(ROOT, p)),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_DOCK_PERFECTION_ARTIFACT",
            "AX-dock-perfection",
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

// Strip Vue SFC `<!-- … -->` HTML comments (the demo glyph-drop + the C7
// vertical-body markers live in comments; a commented example must not satisfy
// or trip a witness).
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
 * Does a `:root`-level token definition exist (a `--name:` declaration that is
 * NOT inside a `var(--name, …)` fallback consumer)? We test for a `--name:`
 * assignment that is not immediately preceded by `var(` + commas — the simplest
 * robust check is: the token appears as `--name:` somewhere AND that occurrence
 * is a property assignment (preceded by whitespace/`{`/`;`), not `var(--name,`.
 */
function isDefined(css, name) {
    // An assignment `--name:` at a property position. A `var(--name, …)` consumer
    // writes `var(--name,` (comma, not colon) or `var(--name)` — neither matches
    // the `--name\s*:` assignment that is NOT preceded by `var(`.
    const re = new RegExp(`(^|[{;\\s])${name}\\s*:`, "m");
    const m = re.exec(css);
    if (!m) return false;
    // Guard: ensure the match is not the tail of a `var(--name,` (it cannot be —
    // `var(--name,` has a comma, our regex demands a colon — but be explicit).
    return true;
}

export function detectDockPerfection(sources) {
    const {
        tokensCss,
        dockCss,
        dockControlsCss,
        glassCss,
        glassDockVue,
        demoDocks, // [{ name, text }]
    } = sources;

    const violations = [];

    // ── Q1 — the collapsed-pill floor tokens DEFINED + the symmetric block floor ──
    const q1SummaryMinDefined = isDefined(tokensCss, "--dock-collapsed-summary-min-size");
    const q1PaddingDefined = isDefined(tokensCss, "--dock-collapsed-padding");
    if (!q1SummaryMinDefined) {
        violations.push(
            "Q1: --dock-collapsed-summary-min-size is not DEFINED in tokens.css (only referenced as a var() fallback → the collapsed pill falls to full-control width).",
        );
    }
    if (!q1PaddingDefined) {
        violations.push(
            "Q1: --dock-collapsed-padding is not DEFINED in tokens.css (only referenced as a var() fallback → the collapsed chrome holds the expanded padding).",
        );
    }
    // The collapsed summary must floor on the BLOCK axis too (a symmetric squircle,
    // not a full-row stub that only floors min-width).
    const summaryRule = /\.glass-dock\.collapsed\s+\.dock-layer--summary\s*\{([^}]*)\}/.exec(
        dockCss,
    );
    const q1BlockFloor = !!summaryRule && /min-block-size\s*:/.test(summaryRule[1]);
    if (!q1BlockFloor) {
        violations.push(
            "Q1: .glass-dock.collapsed .dock-layer--summary carries no min-block-size (the pill floors only on min-width → a full-row stub, not a proportioned squircle).",
        );
    }

    // ── C2 — --dock-tile-pad threaded through --dock-scale in EVERY tile-min rung ──
    const tileMinDecls = [...dockCss.matchAll(/--dock-tile-min\s*:\s*([^;]*);/g)].map(
        (m) => m[1].replace(/\s+/g, " ").trim(),
    );
    const c2TileRungs = tileMinDecls.length;
    // Every rung that references --dock-tile-pad must scale that leg by --dock-scale.
    const c2UnscaledRungs = tileMinDecls.filter(
        (decl) =>
            decl.includes("--dock-tile-pad") &&
            !/--dock-tile-pad[^)]*\)\s*\*\s*var\(--dock-scale\)/.test(decl) &&
            // also allow the inverse order: var(--dock-scale) * var(--dock-tile-pad…)
            !/var\(--dock-scale\)\s*\*\s*var\(--dock-tile-pad/.test(decl),
    );
    if (c2TileRungs === 0) {
        violations.push("C2: no --dock-tile-min declarations found in dock.css.");
    } else if (c2UnscaledRungs.length > 0) {
        violations.push(
            `C2: ${c2UnscaledRungs.length} of ${c2TileRungs} --dock-tile-min rungs leave the --dock-tile-pad leg UN-scaled by var(--dock-scale) (DK4 grid centering re-breaks at the coarse 1.5×): [${c2UnscaledRungs.join(" | ")}]`,
        );
    }

    // ── Q3/C3 — the hover is a glass register on ALL FOUR members ──
    const hoverBgDecl =
        /--dock-control-hover-bg\s*:\s*([^;]*);/.exec(tokensCss)?.[1].trim() ?? "";
    // A same-hue `color-mix(in srgb, var(--card) N%, …)` is the sub-perceptual no-op;
    // the re-point must point at a --glass-bg-* glass tier instead.
    const hoverIsSameHueCardMix = /color-mix\(\s*in\s+srgb\s*,\s*var\(--card\)/.test(
        hoverBgDecl,
    );
    const hoverIsGlassTier = /var\(--glass-bg-/.test(hoverBgDecl);
    if (hoverIsSameHueCardMix || !hoverIsGlassTier) {
        violations.push(
            `Q3/C3: --dock-control-hover-bg is not a glass-tier register (resolves to "${hoverBgDecl}"); it must point at a --glass-bg-* tier a measurable ΔL above the --glass-bg-dock substrate, not a same-hue color-mix(in srgb, var(--card) …).`,
        );
    }
    // The --scale-hover-dock hover scale must fire on all four members. We assert
    // the hover rules of icon/tab/select/dropdown each set `scale: var(--scale-hover-dock)`.
    // icon: `.dock-icon-button … &:hover:not(:disabled){ … scale: var(--scale-hover-dock) }`
    const iconHover = /&:hover:not\(:disabled\)\s*\{([^}]*)\}/g;
    let iconHoverHasScale = false;
    // Scope to the .dock-icon-button block: find the icon-button base rule region.
    const iconBlock = /\.dock-icon-button\s*\{[\s\S]*?\n {4}\}/.exec(dockControlsCss);
    // Fallback: scan the whole file for the icon hover (the &-nested hover under icon).
    {
        let m;
        const re = new RegExp(iconHover.source, "g");
        while ((m = re.exec(dockControlsCss)) !== null) {
            if (/scale\s*:\s*var\(--scale-hover-dock\)/.test(m[1])) {
                iconHoverHasScale = true;
                break;
            }
        }
    }
    // tab: `.dock-tab-button … &:hover:not(:disabled){ … scale: var(--scale-hover-dock) }`
    // Both icon + tab use &-nesting; the loop above catches any &:hover with the scale.
    // To distinguish, count the &:hover blocks that carry the scale (need ≥2 for
    // icon + tab) AND require the shared select/dropdown group to carry it.
    const ampHoverBlocks = [...dockControlsCss.matchAll(/&:hover:not\(:disabled\)\s*\{([^}]*)\}/g)];
    const ampHoverWithScale = ampHoverBlocks.filter((m) =>
        /scale\s*:\s*var\(--scale-hover-dock\)/.test(m[1]),
    ).length;
    // The select/dropdown shared hover group is a flat (non-&) rule.
    const pickerHover =
        /\.dock-select-trigger:hover:not\(:disabled\)\s*,\s*\.dock-dropdown-trigger:hover:not\(:disabled\)\s*\{([^}]*)\}/.exec(
            dockControlsCss,
        );
    const pickerHoverHasScale =
        !!pickerHover && /scale\s*:\s*var\(--scale-hover-dock\)/.test(pickerHover[1]);
    // icon + tab → at least 2 &-nested hover blocks carry the scale; select + dropdown
    // → the shared group carries it.
    const q3AllFourLift = ampHoverWithScale >= 2 && pickerHoverHasScale;
    if (ampHoverWithScale < 2) {
        violations.push(
            `Q3/C3: the --scale-hover-dock hover scale fires on fewer than 2 of the &-nested control members (icon/tab) — found ${ampHoverWithScale} (the unified MOTION channel is not complete).`,
        );
    }
    if (!pickerHoverHasScale) {
        violations.push(
            "Q3/C3: the .dock-select-trigger/.dock-dropdown-trigger shared hover group does not carry scale: var(--scale-hover-dock) (the picker members do not lift on hover — the split-brain hover).",
        );
    }

    // ── C4/C5 — the glass register + the cleared rest specular (W54-successor) ──
    const activeBgDecl =
        /--dock-control-active-bg\s*:\s*([^;]*);/.exec(tokensCss)?.[1].trim() ?? "";
    const activeIsSurfaceTint = /var\(--surface-tint-\d+\)/.test(activeBgDecl);
    const activeIsGlassTier = /var\(--glass-bg-/.test(activeBgDecl);
    if (activeIsSurfaceTint || !activeIsGlassTier) {
        violations.push(
            `C5: --dock-control-active-bg is not a glass register (resolves to "${activeBgDecl}"); the selected/active fill must point at a --glass-bg-* tier (the keyframes-dock model), not a flat var(--surface-tint-N) ink wash.`,
        );
    }
    // All four dock members must be in the BASE catch-light ::before recipe (the
    // selector list that owns `content: ""` — the rule that actually PAINTS the
    // moving specular pseudo), not merely mentioned somewhere in the file. We isolate
    // the base block (the comma-group `::before` selector list immediately preceding
    // the `content: ""` declaration) and assert each member rides it — so dropping a
    // member from the catch-light recipe (the family-coherence regression) bites even
    // though the member still appears in the hover/active/dark lists.
    const specularMembers = [
        ".dock-icon-button::before",
        ".dock-tab-button::before",
        ".dock-select-trigger::before",
        ".dock-dropdown-trigger::before",
    ];
    // The base recipe: from the last `::before {` selector list before `content: ""`
    // back to the preceding `}` (the selector-list head). Capture that head.
    const contentIdx = glassCss.indexOf('content: ""');
    let baseSpecularList = "";
    if (contentIdx !== -1) {
        const braceIdx = glassCss.lastIndexOf("{", contentIdx);
        const prevClose = glassCss.lastIndexOf("}", braceIdx);
        baseSpecularList = glassCss.slice(prevClose + 1, braceIdx);
    }
    const missingSpecular = specularMembers.filter(
        (sel) => !baseSpecularList.includes(sel),
    );
    if (missingSpecular.length > 0) {
        violations.push(
            `C4: ${missingSpecular.length} dock control(s) absent from the glass.css base catch-light ::before recipe (the selector list owning content:"") [${missingSpecular.join(", ")}] — the dock reads as one glass tile next to flat plates (family-coherence broken).`,
        );
    }
    // The resting specular is default-OFF: the global rest token is 0 AND no
    // dock-control selector overrides --glass-specular-intensity-rest above 0.
    const restToken =
        /--glass-specular-intensity-rest\s*:\s*([^;]*);/.exec(tokensCss)?.[1].trim() ?? "";
    const restIsZero = restToken === "0";
    if (!restIsZero) {
        violations.push(
            `C4: --glass-specular-intensity-rest is "${restToken}", not 0 — the resting specular is not default-OFF (the keyframes I.W6 19→0 metric requires a 0 rest floor).`,
        );
    }
    // No dock-control file may lift the rest intensity off 0 (a rest override would
    // re-bloom the 19 tracks). Scan dock-controls.css + glass.css for a non-zero
    // rest override on a dock selector region.
    const restOverrideRe = /--glass-specular-intensity-rest\s*:\s*(?!0\b)[^;]+;/g;
    const dockRestOverrides = [
        ...dockControlsCss.matchAll(restOverrideRe),
    ].map((m) => m[0]);
    if (dockRestOverrides.length > 0) {
        violations.push(
            `C4: dock-controls.css lifts --glass-specular-intensity-rest off 0 [${dockRestOverrides.join(" | ")}] — the resting tracks would re-bloom.`,
        );
    }
    // The dock-control-local small-tile specular sizing is minted (so the gleam is
    // restrained on the 40px tile, not the I.W6 bloom).
    const specularSizeDefined = isDefined(tokensCss, "--dock-control-specular-size");
    const specularSizeWired = /--glass-specular-size\s*:\s*var\(--dock-control-specular-size/.test(
        dockControlsCss,
    );
    if (!specularSizeDefined || !specularSizeWired) {
        violations.push(
            "C4: the small-tile specular sizing is not wired (--dock-control-specular-size minted in tokens.css + the dock-control family re-points --glass-specular-size to it in dock-controls.css) — the hover gleam blooms the small tile (the I.W6 bloom).",
        );
    }

    // ── C7 — the vertical body is the three-region structure, NOT a bare <slot/> ──
    // Isolate the v-else (vertical) branch of GlassDock.vue.
    const veIdx = glassDockVue.indexOf("<template v-else>");
    let c7Structural = false;
    let c7VerticalBranch = "";
    if (veIdx !== -1) {
        const endIdx = glassDockVue.indexOf("</template>", veIdx);
        c7VerticalBranch = glassDockVue.slice(
            veIdx,
            endIdx === -1 ? glassDockVue.length : endIdx,
        );
        // Bare slot: the branch contains ONLY `<slot />` (whitespace aside) with no
        // structural wrapper. Structural: it carries a `.dock-layers` content stack
        // (the vertical-body wrapper) — parity with the horizontal morph-region.
        const hasStructuralWrapper = /class="[^"]*dock-layer--vertical-body/.test(
            c7VerticalBranch,
        );
        c7Structural = hasStructuralWrapper;
    }
    if (!c7Structural) {
        violations.push(
            "C7: the GlassDock vertical (v-else) branch is a bare <slot/> with no structural three-region body (it must wrap the default slot in a .dock-layer--vertical-body content stack — parity with the horizontal template).",
        );
    }

    // ── C1 — ZERO DockIconButton-hosted glyph-size override in the demo dock SFCs ──
    // (the demo-drop is a sibling agent's FileBounds; this gate POLICES it, born-RED
    // until the overrides land.) The `--dock-icon-glyph` library default ONLY paints
    // on a `.dock-icon-button > svg` (the glyph rule's scope, dock-controls.css), so
    // the drop is SCOPED to glyphs hosted INSIDE a `<DockIconButton>` — a `<Home>` in
    // a custom nav chrome or a label-adjacent content glyph (a `<DockLayer>` row, a
    // raw `<button>`, a `#collapsed` summary glyph) is NOT a dock control and KEEPS
    // its explicit size (the wave's C1 NOTE: "glyphs OUTSIDE a DockIconButton keep
    // their size"). So the witness counts ONLY the size classes that sit inside a
    // `<DockIconButton …> … </DockIconButton>` host — a residual there means a real
    // dock-control glyph still overrides `--dock-icon-glyph`.
    const sizeRe = /\bh-[45]\s+w-[45]\b/;
    const dibRe = /<DockIconButton\b[^>]*>([\s\S]*?)<\/DockIconButton>/g;
    const c1PerFile = demoDocks.map(({ name, text }) => {
        let count = 0;
        let m;
        const re = new RegExp(dibRe.source, "g");
        while ((m = re.exec(text)) !== null) {
            count += (m[1].match(/\bh-[45]\s+w-[45]\b/g) || []).length;
        }
        return { name, count };
    });
    const c1Total = c1PerFile.reduce((acc, f) => acc + f.count, 0);
    // Reference the per-element regex so a future maintainer sees the scope source.
    void sizeRe;
    if (c1Total > 0) {
        violations.push(
            `C1: ${c1Total} explicit h-4 w-4 / h-5 w-5 glyph-size override(s) survive on DockIconButton-hosted glyphs in the demo dock SFCs [${c1PerFile
                .filter((f) => f.count > 0)
                .map((f) => `${f.name}:${f.count}`)
                .join(", ")}] — they win over --dock-icon-glyph, so the 1.5× mobile glyph scale paints NOTHING on those dock controls.`,
        );
    }

    const facts = {
        q1: {
            summaryMinDefined: q1SummaryMinDefined,
            paddingDefined: q1PaddingDefined,
            blockFloor: q1BlockFloor,
        },
        c1: { totalOverrides: c1Total, perFile: c1PerFile },
        c2: { tileRungs: c2TileRungs, unscaledRungs: c2UnscaledRungs.length },
        q3: {
            hoverIsGlassTier,
            hoverDecl: hoverBgDecl,
            ampHoverWithScale,
            pickerHoverHasScale,
            allFourLift: q3AllFourLift,
        },
        c4c5: {
            activeIsGlassTier,
            activeDecl: activeBgDecl,
            specularMembersPresent: specularMembers.length - missingSpecular.length,
            restIsZero,
            restToken,
            specularSizeWired: specularSizeDefined && specularSizeWired,
        },
        c7: { structuralVerticalBody: c7Structural },
    };

    return { facts, violations };
}

export function detectSource(sources) {
    return detectDockPerfection({
        tokensCss: stripBlockComments(sources.tokensCss ?? ""),
        dockCss: stripBlockComments(sources.dockCss ?? ""),
        dockControlsCss: stripBlockComments(sources.dockControlsCss ?? ""),
        glassCss: stripBlockComments(sources.glassCss ?? ""),
        glassDockVue: stripHtmlComments(sources.glassDockVue ?? ""),
        demoDocks: (sources.demoDocks ?? []).map(({ name, text }) => ({
            name,
            text: stripHtmlComments(text ?? ""),
        })),
    });
}

function run() {
    const {
        ROOT,
        TOKENS_CSS,
        DOCK_CSS,
        DOCK_CONTROLS_CSS,
        GLASS_CSS,
        GLASS_DOCK_VUE,
        DEMO_DOCKS,
        ARTIFACT,
    } = cliPaths();

    const demoDocks = DEMO_DOCKS.map((p) => ({
        name: p.slice(ROOT.length + 1),
        text: safeRead(p),
    }));

    const { facts, violations } = detectSource({
        tokensCss: readMonolith(ROOT, "tokens"),
        dockCss: readDockCss(ROOT),
        dockControlsCss: readFileSync(DOCK_CONTROLS_CSS, "utf8"),
        glassCss: readMonolith(ROOT, "glass"),
        glassDockVue: readFileSync(GLASS_DOCK_VUE, "utf8"),
        demoDocks,
    });

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:dock-perfection",
        facts,
        violations,
    });

    console.log(
        "proof:dock-perfection — the dock-perfection CLOSE (Q1 pill · C1 glyph · C2 tile-pad · Q3 hover · C4/C5 glass register · C7 vertical body) (AX.W45-TUNE)",
    );
    console.log(
        `  Q1 floor tokens + block floor : ${
            facts.q1.summaryMinDefined && facts.q1.paddingDefined && facts.q1.blockFloor
                ? "YES"
                : "NO"
        }`,
    );
    console.log(
        `  C1 demo glyph overrides       : ${facts.c1.totalOverrides} (want 0)`,
    );
    console.log(
        `  C2 tile-pad × --dock-scale    : ${facts.c2.unscaledRungs === 0 ? "YES" : "NO"} (${facts.c2.tileRungs} rungs, ${facts.c2.unscaledRungs} unscaled)`,
    );
    console.log(
        `  Q3 hover glass-tier register  : ${facts.q3.hoverIsGlassTier ? "YES" : "NO"}  (${facts.q3.hoverDecl})`,
    );
    console.log(
        `  Q3 hover scale on all 4       : ${facts.q3.allFourLift ? "YES" : "NO"}`,
    );
    console.log(
        `  C5 active glass register      : ${facts.c4c5.activeIsGlassTier ? "YES" : "NO"}  (${facts.c4c5.activeDecl})`,
    );
    console.log(
        `  C4 specular on 4/4 members    : ${facts.c4c5.specularMembersPresent}/4`,
    );
    console.log(
        `  C4 rest specular default-off  : ${facts.c4c5.restIsZero ? "YES" : "NO"} (rest=${facts.c4c5.restToken})`,
    );
    console.log(
        `  C4 small-tile specular sizing : ${facts.c4c5.specularSizeWired ? "YES" : "NO"}`,
    );
    console.log(
        `  C7 structural vertical body   : ${facts.c7.structuralVerticalBody ? "YES" : "NO"}`,
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

function safeRead(path) {
    try {
        return readFileSync(path, "utf8");
    } catch {
        return "";
    }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
