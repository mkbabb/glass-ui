#!/usr/bin/env node
// BA.W-ICON-CHIP — the <IconChip> section-color POP primitive gate
// (proof:icon-chip).
//
// The born-RED→GREEN device-free SOURCE arm for the library's single section-color
// pop primitive. The chip recipe was a hand-rolled inline `:style` paste
// copy-pasted across icons.vue / empty-states.vue / auth-shell.vue (+ the
// MetricCell glyph-tint seam), with NO owning primitive (POP-1). This gate locks
// the consolidation: the primitive OWNS the `color-mix(… 25%, transparent)`
// backplate + full-chroma glyph recipe (W1), enforces the chip≤glyph ratio IN the
// component (W2), exposes the three opt-in axes prop-gated + disco-FREE (W3), the
// four pastes are GONE (W4), the surface is published (W5), and the primitive is
// born with ≥2 live consumers (W6).
//
// The BINDING painted truth is the π readback (tests-visual/icon-chip.spec.ts +
// the W-ICON-CHIP-DELTA capture — the rendered chip byte-faithful to the reference
// register in BOTH modes + the duotone fill painting + the chip≥glyph diameter at
// render + the proof:ba-gestalt verdict). This gate is the no-device CI half; a
// source-green/visually-broken gap is the exact AZ P-1 close-class the BA gestalt
// bar (inv-4) exists to kill — both halves must hold for a clean close.
//
// House style mirrors proof-menu-glass.mjs / proof-surface-axis.mjs: ESM .mjs,
// comment-strip first (false-witness discipline), a pure exported detector, a
// byte-stable JSON artefact via gate-output, a human summary, process.exit(1) on
// any violation.

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const c = (p) => resolve(ROOT, "src/components/custom/icon-chip", p);
    _cliPaths = {
        ROOT,
        ICON_CHIP_VUE: c("IconChip.vue"),
        ICON_CHIP_TYPES: c("types.ts"),
        ICON_CHIP_CSS: resolve(ROOT, "src/styles/icon-chip.css"),
        SUBPATH: resolve(ROOT, "src/subpaths/icon-chip.ts"),
        API_INDEX: resolve(ROOT, "src/api/index.ts"),
        ROOT_BARREL: resolve(ROOT, "src/index.ts"),
        PKG: resolve(ROOT, "package.json"),
        METRIC_CELL: resolve(
            ROOT,
            "src/components/custom/metric-cell/MetricCell.vue",
        ),
        // The consumer-collapse surfaces (the ≥2-consumer census + the W4
        // complete-consolidation floor).
        DEMO_ICONS: resolve(ROOT, "demo/stories/foundations/icons.vue"),
        DEMO_EMPTY: resolve(ROOT, "demo/stories/compositions/empty-states.vue"),
        DEMO_AUTH: resolve(ROOT, "demo/stories/compositions/auth-shell.vue"),
        ARTIFACT: gateArtifactPath("GLASS_UI_ICON_CHIP_ARTIFACT", "BA-icon-chip"),
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
        } else if (text[i] === "/" && text[i + 1] === "/") {
            let end = text.indexOf("\n", i + 2);
            if (end === -1) end = text.length;
            result += blankRange(text, i, end);
            i = end;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

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

const stripAll = (t) => stripHtmlComments(stripBlockComments(t ?? ""));

function safeRead(path) {
    try {
        return readFileSync(path, "utf8");
    } catch {
        return "";
    }
}

// Recursively list .vue/.ts/.css files under a dir as repo-relative paths.
function listFiles(absDir, exts) {
    const out = [];
    const walk = (dir) => {
        if (!existsSync(dir)) return;
        for (const name of readdirSync(dir)) {
            const p = resolve(dir, name);
            if (statSync(p).isDirectory()) walk(p);
            else if (exts.some((e) => name.endsWith(e)))
                out.push(p.slice(ROOT.length + 1));
        }
    };
    walk(absDir);
    return out;
}

/**
 * The W-ICON-CHIP detector. Pure over the read sources. Each witness pushes a
 * falsifiable violation string.
 */
export function detectIconChip(sources) {
    const sfc = stripAll(sources.iconChipVue ?? "");
    const types = stripBlockComments(sources.iconChipTypes ?? "");
    const css = stripBlockComments(sources.iconChipCss ?? "");
    const subpath = stripBlockComments(sources.subpath ?? "");
    const api = stripBlockComments(sources.apiIndex ?? "");
    const rootBarrel = stripBlockComments(sources.rootBarrel ?? "");
    const pkg = sources.pkgJson ?? {};
    const metricCell = stripAll(sources.metricCell ?? "");

    const violations = [];

    // ── W1 — the primitive OWNS the recipe (positive token + 25% stop) ────────
    const componentExists = (sources.iconChipVue ?? "").length > 0;
    if (!componentExists) {
        violations.push(
            "W1: src/components/custom/icon-chip/IconChip.vue does not exist (the primitive did not land).",
        );
    }
    // The recipe references the --section-color (or the tone) token AND the 25%
    // mix stop — split across the SFC (the plate/event tokens) + the CSS (the
    // color-mix recipe), so we union the two sources.
    const recipeSrc = sfc + "\n" + css;
    const referencesSectionToken = /--section-color-/.test(recipeSrc);
    const referencesToneArm =
        /\btone\b/.test(sfc) && /--icon-chip-plate-color/.test(recipeSrc);
    // The backplate is a `color-mix(in srgb|oklab, …)` carrying the 25% reference
    // stop. The recipe nests `var(…)` (with inner `)`), so we check the
    // color-mix presence + the 25% stop independently rather than [^)]* (which
    // stops at the first nested paren).
    const hasMixStop = /\b25%/.test(css);
    const ownsBackplate = /color-mix\(\s*in\s+(?:srgb|oklab)/.test(css);
    if (componentExists && !(referencesSectionToken && referencesToneArm)) {
        violations.push(
            "W1: the IconChip recipe does not reference BOTH the --section-color ramp token AND the tone arm (--icon-chip-plate-color) — the recipe must own both arms, not a name-only stub.",
        );
    }
    if (componentExists && !(ownsBackplate && hasMixStop)) {
        violations.push(
            "W1: the icon-chip.css backplate is not a `color-mix(in srgb|oklab, …)` at the 25% reference stop (the reference register recipe did not land in the component).",
        );
    }
    // The glyph reads the full-chroma event colour (not a muted default only).
    const glyphReadsEvent = /--icon-chip-event-color/.test(recipeSrc);
    if (componentExists && !glyphReadsEvent) {
        violations.push(
            "W1: the chip glyph does not read the full-chroma `--icon-chip-event-color` (the glyph must paint the event hue, not a flat ink).",
        );
    }

    // ── W2 — the chip≤glyph ratio is enforced IN the component ────────────────
    // The diameter recipe is `max(<size>, <glyph> × --icon-chip-glyph-ratio)`
    // (or floor-equivalent) so a tiny `size` cannot collapse the plate under the
    // glyph. The ratio MUST be a token (token-first), not a bare px literal.
    const ratioTokenDeclared = /--icon-chip-glyph-ratio\s*:/.test(css);
    const ratioInFloor =
        /max\([^)]*--icon-chip-glyph-ratio/.test(css) ||
        /max\([^)]*var\(--icon-chip-glyph-ratio/.test(css) ||
        // the floor may be computed into a helper var then maxed
        (/--icon-chip-glyph-ratio/.test(css) &&
            /(?:inline-size|block-size|width|height)\s*:\s*max\(/.test(css));
    if (!ratioTokenDeclared) {
        violations.push(
            "W2: no `--icon-chip-glyph-ratio` token is declared (the chip≤glyph proportion must be a token-first knob a consumer retunes without a component edit).",
        );
    }
    if (!ratioInFloor) {
        violations.push(
            "W2: the chip diameter is not a `max(<size>, <glyph> × --icon-chip-glyph-ratio)` floor (a bare px size that happens to be ≥ the glyph fails — the ratio must be the MECHANISM so a consumer's tiny size cannot collapse the plate).",
        );
    }

    // ── W3 — the three axes prop-gated + disco-FREE ───────────────────────────
    const propsDuotone = /\bduotone\s*\?\s*:/.test(types);
    const propsBloom = /\bbloom\s*\?\s*:/.test(types);
    const propsReveal = /\breveal\s*\?\s*:/.test(types);
    if (!(propsDuotone && propsBloom && propsReveal)) {
        const missing = [
            !propsDuotone && "duotone",
            !propsBloom && "bloom",
            !propsReveal && "reveal",
        ].filter(Boolean);
        violations.push(
            `W3: IconChipProps does not declare all three axis props (missing: ${missing.join(", ")}).`,
        );
    }
    // Duotone adds a `fill` under the stroke.
    const duotoneAddsFill =
        /\[data-duotone\][^{]*\{[^}]*fill\s*:/.test(css) ||
        /icon-chip--duotone[^{]*\{[^}]*fill\s*:/.test(css);
    if (!duotoneAddsFill) {
        violations.push(
            "W3: the duotone axis adds no `fill` under the stroke (the filled-tonal move did not land — see the [data-duotone] svg rule).",
        );
    }
    // Bloom is the smooth-glass hover register, NOT a disco utility (negative
    // predicate — the W-GLASS-CAL disco fence).
    const bloomHoverExists = /icon-chip--bloom:hover/.test(css);
    if (!bloomHoverExists) {
        violations.push(
            "W3: the bloom axis has no `.icon-chip--bloom:hover` register (the chip's own hover-bloom did not land).",
        );
    }
    const DISCO_RE =
        /sparkle-sweep|btn-audacious|disco-grain/;
    const bloomDiscoBreach = DISCO_RE.test(css) || DISCO_RE.test(sfc);
    if (bloomDiscoBreach) {
        violations.push(
            "W3: the icon-chip references a RETIRED disco utility (sparkle-sweep/btn-audacious/disco-grain) — the bloom must be the W-GLASS-CAL calm-replacement register, never the retired family (disco fence).",
        );
    }
    // Reveal composes the shipped vReveal directive (not a hand-rolled keyframe
    // as the entrance hook) — the SFC imports/uses vReveal + the CSS reacts to
    // [data-reveal].
    const revealComposesVReveal =
        /vReveal/.test(sfc) && /v-reveal/.test(sfc);
    const revealReactsToHook = /\[data-reveal\]/.test(css);
    if (!(revealComposesVReveal && revealReactsToHook)) {
        violations.push(
            "W3: the reveal axis does not compose the shipped `vReveal` directive ([data-reveal]/--d) — it must consume the directive, not a hand-rolled keyframe trigger.",
        );
    }
    // A prefers-reduced-motion guard exists on the deform axes.
    const prmGuard = /prefers-reduced-motion/.test(css);
    if (!prmGuard) {
        violations.push(
            "W3: no `prefers-reduced-motion` guard on the deform axes (the bloom/reveal motion must collapse under reduce).",
        );
    }

    // ── W4 — the four ICON-CHIP pastes are GONE (complete-consolidation floor) ──
    // The inline template-literal paste form `color-mix(in srgb, var(--section-
    // color-${…})` must NOT survive as an ICON-CHIP backplate (a 48px plate + glyph,
    // the chip≤glyph proportion) anywhere under src/ or demo/ OUTSIDE the icon-chip/
    // dir. Walk the trees, exempting the recipe-OWNING primitives.
    const PASTE_RE = /color-mix\(in srgb, var\(--section-color-\$\{/;
    // The recipe-owning primitives are exempt by the same logic the icon-chip/ dir
    // is: a primitive that OWNS its own tint-chip recipe is not one of "the four
    // inline icon-chip pastes." BC.W-CODE-BLOCKS minted `demo/stories/Code.vue` —
    // the inline-CODE-literal tint chip (a `<code>` backplate, NO glyph, NO
    // plate-vs-glyph proportion) — a DISTINCT consolidating primitive that owns the
    // code-chip recipe, not an icon-chip paste (the same `--section-color-${tone}`
    // family, a different chip). It is exempt like the icon-chip/ dir.
    const W4_OWNER_FILES = new Set(["demo/stories/Code.vue"]);
    const scanFiles = [
        ...listFiles(resolve(ROOT, "src"), [".vue", ".ts", ".css"]),
        ...listFiles(resolve(ROOT, "demo"), [".vue", ".ts", ".css"]),
    ];
    const pasteHits = [];
    for (const rel of scanFiles) {
        if (rel.includes("components/custom/icon-chip/")) continue;
        if (W4_OWNER_FILES.has(rel)) continue;
        const body = stripAll(safeRead(resolve(ROOT, rel)));
        if (PASTE_RE.test(body)) pasteHits.push(rel);
    }
    if (pasteHits.length > 0) {
        violations.push(
            `W4: ${pasteHits.length} inline chip paste(s) survive outside icon-chip/ (the COMPLETE-consolidation floor — a partial collapse fails): ${pasteHits.join(", ")}`,
        );
    }
    // The MetricCell `iconColor` glyph-tint is RECONCILED — it no longer carries a
    // raw `:style` color paste that bypasses the primitive's bare register. The
    // reconcile path is either an <IconChip variant/bare> compose OR the
    // documented tone-arm-no-plate alias; either way the value/unit ink stays ink.
    const metricCellHasRawColorStyle =
        /:style="iconColor \? \{ color: iconColor \} : undefined"/.test(metricCell);
    const metricCellReconciled =
        /IconChip/.test(metricCell) ||
        /icon-chip|bare/.test(metricCell) ||
        // documented alias: the iconColor decl references the IconChip tone arm
        /tone arm|no-plate|IconChip/.test(metricCell);
    if (metricCellHasRawColorStyle && !metricCellReconciled) {
        violations.push(
            "W4: MetricCell still carries the raw `:style=\"iconColor ? { color } : undefined\"` glyph-tint paste with no reconcile onto the IconChip bare register (the 4th consumer did not reconcile).",
        );
    }

    // ── W5 — the surface is published ─────────────────────────────────────────
    const exportsEntry = pkg?.exports?.["./icon-chip"];
    const exportShape =
        exportsEntry &&
        typeof exportsEntry.types === "string" &&
        typeof exportsEntry.import === "string";
    if (!exportShape) {
        violations.push(
            "W5: package.json exports['./icon-chip'] missing or not the contract-v2 { types, import } shape.",
        );
    }
    const typesVersionsEntry =
        pkg?.typesVersions?.["*"]?.["icon-chip"]?.length > 0;
    if (!typesVersionsEntry) {
        violations.push(
            "W5: package.json typesVersions['*']['icon-chip'] does not resolve (the subpath dts probe will fail).",
        );
    }
    const subpathExists = subpath.includes("../components/custom/icon-chip");
    if (!subpathExists) {
        violations.push(
            "W5: src/subpaths/icon-chip.ts does not mirror `export * from \"../components/custom/icon-chip\"`.",
        );
    }
    const apiHasTypes =
        /IconChipProps/.test(api) &&
        /from "\.\.\/components\/custom\/icon-chip"/.test(api);
    if (!apiHasTypes) {
        violations.push(
            "W5: IconChip/IconChipProps not added to the src/api/index.ts discovery layer.",
        );
    }
    const rootBarrelHasIt = /components\/custom\/icon-chip/.test(rootBarrel);
    if (!rootBarrelHasIt) {
        violations.push(
            "W5: the IconChip primitive is not re-exported from the curated root barrel src/index.ts.",
        );
    }

    // ── W7 — BB.W-SUFFUSE3: the pop-MOTION on the per-spring clock + :saturated ─
    // c1 — the reveal ENTRANCE rides the per-spring CLOCK, NOT the fixed bezier.
    // The animation references --spring-snappy (the linear() timing-function
    // string) AND --spring-snappy-duration (the W-GLASS-CAL per-spring clock), and
    // is NOT the prior `var(--duration-medium) var(--ease-standard)` fixed bezier.
    const revealRule =
        css.match(/\.icon-chip--reveal\[data-reveal\][^}]*animation[^;]*;/) || [];
    const revealRideSpringClock =
        /icon-chip-reveal\s+var\(--spring-snappy-duration\)\s+var\(--spring-snappy\)/.test(
            css,
        );
    const revealNotFixedBezier =
        !/icon-chip-reveal\s+var\(--duration-medium[^)]*\)\s+var\(--ease-standard\)/.test(
            css,
        );
    if (!revealRideSpringClock) {
        violations.push(
            "W7-c1: the icon-chip-reveal entrance does not ride the per-spring clock (`animation: icon-chip-reveal var(--spring-snappy-duration) var(--spring-snappy)`) — the pop must bloom on the snappy spring's overshoot, not the fixed --duration-medium var(--ease-standard) bezier (BB.W-SUFFUSE3 c1).",
        );
    }
    if (!revealNotFixedBezier) {
        violations.push(
            "W7-c1: the icon-chip-reveal entrance STILL carries the fixed `var(--duration-medium) var(--ease-standard)` bezier — the spring re-time did not replace it (BB.W-SUFFUSE3 c1).",
        );
    }
    // The keyframe stays COMPOSITOR-ONLY (transform/opacity only — the
    // proof:motion-compositor floor). No width/height/font-size/padding/margin
    // /inline-size/block-size/top/left key inside the @keyframes icon-chip-reveal.
    const keyframeBlock =
        css.match(/@keyframes\s+icon-chip-reveal\s*\{[\s\S]*?\n\}/) || [""];
    const LAYOUT_KEY_RE =
        /\b(width|height|inline-size|block-size|font-size|padding|margin|top|left|right|bottom|inset|gap|grid-template|flex-basis|line-height)\b\s*:/;
    const keyframeCompositorOnly = !LAYOUT_KEY_RE.test(keyframeBlock[0]);
    if (!keyframeCompositorOnly) {
        violations.push(
            "W7-c1: the @keyframes icon-chip-reveal animates a LAYOUT-triggering property (the compositor-only floor — only transform/opacity/filter allowed; proof:motion-compositor).",
        );
    }
    // The opacity is COUPLED on the SAME clock (the P3 coupled-fade — the keyframe
    // carries BOTH opacity AND transform from→to on the one animation).
    const opacityCoupled =
        /@keyframes\s+icon-chip-reveal[\s\S]*?opacity\s*:/.test(css) &&
        /@keyframes\s+icon-chip-reveal[\s\S]*?(transform|scale)\s*:/.test(css);
    if (!opacityCoupled) {
        violations.push(
            "W7-c1: the icon-chip-reveal keyframe does not couple opacity + transform on the one clock (the P3 coupled-fade — plate + glyph bloom as ONE layer).",
        );
    }
    // The PRM carve survives — the reveal snaps to its endpoint under reduce.
    const prmRevealCarve =
        /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.icon-chip--reveal\[data-reveal\][^}]*animation\s*:\s*none/.test(
            css,
        );
    if (!prmRevealCarve) {
        violations.push(
            "W7-c1: the PRM carve (the `.icon-chip--reveal[data-reveal] { animation: none }` snap-to-endpoint under prefers-reduced-motion: reduce) is GONE — the pop must snap to its endpoint, zero in-between frames (BB.W-SUFFUSE3 c1 / P6).",
        );
    }

    // c2 — the hover-bloom GROW (transform) rides --spring-smooth (enter smooth),
    // the color legs stay the bezier, the leave is no-overshoot.
    // BD.W-CHIP-CONGRUENT-GLASS added a `.icon-chip--glass.icon-chip--bloom:hover`
    // variant rule (the glass-chip's hover-bloom routing) EARLIER in the file — its
    // selector CONTAINS the `.icon-chip--bloom:hover` substring, so a first-match
    // regex anchored on that substring is shadowed by the prefixed variant (body
    // `background-color: transparent` only). Scan EVERY `.icon-chip--bloom:hover` rule
    // body and require AT LEAST ONE to carry the GROW + spring (the canonical bloom
    // rule lives at the unprefixed selector). A nested `color-mix()` carries no `}`,
    // so the `[^}]*` body-scope is safe.
    const bloomRuleBodies = [
        ...css.matchAll(/\.icon-chip--bloom:hover\s*\{([^}]*)\}/g),
    ].map((m) => m[1]);
    const bloomTransformOnSpring = bloomRuleBodies.some((body) =>
        /transition[\s\S]*?transform\s+var\(--spring-smooth-duration\)\s+var\(--spring-smooth\)/.test(
            body,
        ),
    );
    const bloomHasGrow = bloomRuleBodies.some((body) => /transform\s*:\s*scale\(/.test(body));
    if (!(bloomTransformOnSpring && bloomHasGrow)) {
        violations.push(
            `W7-c2: the hover-bloom GROW does not ride --spring-smooth (the §6 transform-hover register, enter smooth) — grow:${bloomHasGrow} springTransition:${bloomTransformOnSpring} (BB.W-SUFFUSE3 c2).`,
        );
    }
    // The base transform leg is the no-overshoot bezier (the LEAVE direction — a
    // bloom must never overshoot past gone). The base .icon-chip transition
    // carries `transform … var(--ease-out)` (or --ease-standard), NOT a spring.
    const bloomLeaveNoOvershoot =
        /\.icon-chip\s*\{[\s\S]*?transition[\s\S]*?transform\s+var\(--duration-fast[^)]*\)\s+var\(--ease-(out|standard)\)/.test(
            css,
        );
    if (!bloomLeaveNoOvershoot) {
        violations.push(
            "W7-c2: the base .icon-chip transform leg (the LEAVE direction) is not the no-overshoot bezier (var(--ease-out)/var(--ease-standard)) — the bloom must settle cleanly on hover-out, never overshoot past gone (BB.W-SUFFUSE3 c2 / §6 exit law).",
        );
    }

    // c3 — the --icon-chip-plate-strength token + the :saturated axis.
    const plateStrengthDeclared = /--icon-chip-plate-strength\s*:/.test(css);
    const plateStrengthDefault25 =
        /--icon-chip-plate-strength\s*:\s*25%/.test(css);
    // The plate color-mix reads the token (byte-identical at default).
    const plateReadsToken =
        /background-color:\s*color-mix\([\s\S]*?var\(--icon-chip-plate-strength\)/.test(
            css,
        );
    const saturatedRule =
        /\.icon-chip--saturated\s*\{[^}]*--icon-chip-plate-strength\s*:\s*40%/.test(
            css,
        );
    const saturatedProp = /\bsaturated\s*\?\s*:/.test(types);
    const saturatedThreaded =
        /icon-chip--saturated/.test(sfc) && /\bsaturated\b/.test(sfc);
    if (!plateStrengthDeclared) {
        violations.push(
            "W7-c3: no `--icon-chip-plate-strength` token declared (the vibrancy stop must be a token-first knob — BB.W-SUFFUSE3 c3).",
        );
    }
    if (!plateStrengthDefault25) {
        violations.push(
            "W7-c3: `--icon-chip-plate-strength` default is NOT 25% — the additive thread must be BYTE-IDENTICAL to the reference register at default (a default render shift REDs — BB.W-SUFFUSE3 c3).",
        );
    }
    if (!plateReadsToken) {
        violations.push(
            "W7-c3: the plate `background-color: color-mix(…)` does not read `var(--icon-chip-plate-strength)` (the hardcoded 25% must lift onto the token — BB.W-SUFFUSE3 c3).",
        );
    }
    if (!saturatedRule) {
        violations.push(
            "W7-c3: the `.icon-chip--saturated` rule does not re-point --icon-chip-plate-strength to 40% (the louder focal pop axis — BB.W-SUFFUSE3 c3).",
        );
    }
    if (!saturatedProp) {
        violations.push(
            "W7-c3: IconChipProps does not declare the `saturated?: boolean` prop (the axis must be prop-gated — BB.W-SUFFUSE3 c3).",
        );
    }
    if (!saturatedThreaded) {
        violations.push(
            "W7-c3: the SFC does not thread the `saturated` prop → the `.icon-chip--saturated` class (BB.W-SUFFUSE3 c3).",
        );
    }
    // The interpolation STAYS `in srgb` (the recorded keep — the saturated axis
    // changes the STRENGTH, not the space). The plate color-mix must remain
    // `color-mix(in srgb, …)`, never flip to `in oklab`.
    const plateStaysInSrgb =
        /background-color:\s*color-mix\(\s*in\s+srgb/.test(css);
    if (!plateStaysInSrgb) {
        violations.push(
            "W7-c3: the plate color-mix is no longer `in srgb` — the saturated axis must change the STRENGTH, not the interpolation space (the recorded reference-register keep — BB.W-SUFFUSE3 c3 / icon-chip.css header).",
        );
    }

    // ── W6 — born ≥2 live consumers ───────────────────────────────────────────
    // Count the live `<IconChip` render sites across the consumer surfaces + the
    // MetricCell reconcile (if it composes the component).
    const consumerSurfaces = {
        icons: stripAll(sources.demoIcons ?? ""),
        empty: stripAll(sources.demoEmpty ?? ""),
        auth: stripAll(sources.demoAuth ?? ""),
        metricCell,
    };
    const liveConsumers = Object.entries(consumerSurfaces)
        .filter(([, body]) => /<IconChip\b/.test(body))
        .map(([name]) => name);
    if (liveConsumers.length < 2) {
        violations.push(
            `W6: only ${liveConsumers.length} live <IconChip> consumer(s) [${liveConsumers.join(", ")}] — the L inv-8 substrate-with-consumer bar is ≥2.`,
        );
    }

    const facts = {
        w1: {
            componentExists,
            referencesSectionToken,
            referencesToneArm,
            ownsBackplate,
            hasMixStop,
            glyphReadsEvent,
        },
        w2: { ratioTokenDeclared, ratioInFloor },
        w3: {
            propsDuotone,
            propsBloom,
            propsReveal,
            duotoneAddsFill,
            bloomHoverExists,
            bloomDiscoBreach,
            revealComposesVReveal,
            revealReactsToHook,
            prmGuard,
        },
        w4: { pasteHits, metricCellHasRawColorStyle, metricCellReconciled },
        w5: {
            exportShape: Boolean(exportShape),
            typesVersionsEntry,
            subpathExists,
            apiHasTypes,
            rootBarrelHasIt,
        },
        w6: { liveConsumers, count: liveConsumers.length },
        w7: {
            revealRideSpringClock,
            revealNotFixedBezier,
            keyframeCompositorOnly,
            opacityCoupled,
            prmRevealCarve,
            bloomTransformOnSpring,
            bloomHasGrow,
            bloomLeaveNoOvershoot,
            plateStrengthDeclared,
            plateStrengthDefault25,
            plateReadsToken,
            saturatedRule,
            saturatedProp,
            saturatedThreaded,
            plateStaysInSrgb,
        },
    };

    return { facts, violations };
}

function run() {
    const P = cliPaths();
    let pkgJson = {};
    try {
        pkgJson = JSON.parse(safeRead(P.PKG));
    } catch {
        pkgJson = {};
    }

    const { facts, violations } = detectIconChip({
        iconChipVue: safeRead(P.ICON_CHIP_VUE),
        iconChipTypes: safeRead(P.ICON_CHIP_TYPES),
        iconChipCss: safeRead(P.ICON_CHIP_CSS),
        subpath: safeRead(P.SUBPATH),
        apiIndex: safeRead(P.API_INDEX),
        rootBarrel: safeRead(P.ROOT_BARREL),
        pkgJson,
        metricCell: safeRead(P.METRIC_CELL),
        demoIcons: safeRead(P.DEMO_ICONS),
        demoEmpty: safeRead(P.DEMO_EMPTY),
        demoAuth: safeRead(P.DEMO_AUTH),
    });

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:icon-chip",
        facts,
        violations,
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log(
        "proof:icon-chip — the <IconChip> section-color POP primitive (BA.W-ICON-CHIP)",
    );
    console.log(
        `  W1 primitive owns the recipe   : ${yn(
            facts.w1.componentExists &&
                facts.w1.referencesSectionToken &&
                facts.w1.referencesToneArm &&
                facts.w1.ownsBackplate &&
                facts.w1.hasMixStop &&
                facts.w1.glyphReadsEvent,
        )}`,
    );
    console.log(
        `  W2 chip≤glyph ratio in-component: ${yn(
            facts.w2.ratioTokenDeclared && facts.w2.ratioInFloor,
        )}`,
    );
    console.log(
        `  W3 three axes prop-gated+disco-FREE: ${yn(
            facts.w3.propsDuotone &&
                facts.w3.propsBloom &&
                facts.w3.propsReveal &&
                facts.w3.duotoneAddsFill &&
                facts.w3.bloomHoverExists &&
                !facts.w3.bloomDiscoBreach &&
                facts.w3.revealComposesVReveal &&
                facts.w3.revealReactsToHook &&
                facts.w3.prmGuard,
        )}  (disco-breach:${yn(facts.w3.bloomDiscoBreach)})`,
    );
    console.log(
        `  W4 the four pastes GONE        : ${yn(
            facts.w4.pasteHits.length === 0 &&
                !(
                    facts.w4.metricCellHasRawColorStyle &&
                    !facts.w4.metricCellReconciled
                ),
        )}  (surviving inline pastes:${facts.w4.pasteHits.length})`,
    );
    console.log(
        `  W5 surface published           : ${yn(
            facts.w5.exportShape &&
                facts.w5.typesVersionsEntry &&
                facts.w5.subpathExists &&
                facts.w5.apiHasTypes &&
                facts.w5.rootBarrelHasIt,
        )}`,
    );
    console.log(
        `  W6 born ≥2 consumers           : ${yn(facts.w6.count >= 2)}  (${facts.w6.count}: ${facts.w6.liveConsumers.join(", ")})`,
    );
    console.log(
        `  W7 pop-motion + :saturated      : ${yn(
            facts.w7.revealRideSpringClock &&
                facts.w7.revealNotFixedBezier &&
                facts.w7.keyframeCompositorOnly &&
                facts.w7.opacityCoupled &&
                facts.w7.prmRevealCarve &&
                facts.w7.bloomTransformOnSpring &&
                facts.w7.bloomHasGrow &&
                facts.w7.bloomLeaveNoOvershoot &&
                facts.w7.plateStrengthDeclared &&
                facts.w7.plateStrengthDefault25 &&
                facts.w7.plateReadsToken &&
                facts.w7.saturatedRule &&
                facts.w7.saturatedProp &&
                facts.w7.saturatedThreaded &&
                facts.w7.plateStaysInSrgb,
        )}  (spring-clock:${yn(facts.w7.revealRideSpringClock)} bloom-smooth:${yn(facts.w7.bloomTransformOnSpring)} :saturated:${yn(facts.w7.saturatedRule && facts.w7.saturatedProp)})`,
    );

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(
            P.ROOT.length + 1,
        )}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
