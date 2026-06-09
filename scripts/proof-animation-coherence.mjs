#!/usr/bin/env node
// AW.W31.a — the one-motion-source gate (proof:animation-coherence).
//
// The standing guard that the four animated surfaces (dock, aurora, blob, the
// `ui/` press primitives) speak ONE motion language. W1-W3/W4-W11/W25 retuned
// each band in isolation onto the single `scripts/regen-spring-tokens.mjs` →
// `--spring-*` source and the `--scale-press*` press cohort; this gate freezes
// that convergence so a future band cannot re-introduce a hand-rolled
// `cubic-bezier()`/`linear()` spring or a per-atom literal press-scale on an
// animated surface without failing closed.
//
// COMPOSES WITH — does not duplicate — proof:spring-tokens-synced. That gate
// proves the five `--spring-*` tokens in tokens.css are GENERATOR-EQUAL (the
// `linear()` strings match the keyframes.js solver). THIS gate proves there is
// NO FORK OUTSIDE the generator: no second spring/easing authority sits on a
// dock/aurora/blob/primitive animated property.
//
// SEVEN assertions over the animated-surface file set (AX.W05 widened it from
// three — the apple-spring survivor sweep + the --spring-* consumer-coverage
// census + the cross-repo constellation census; AY.W-MOTION widened the SURFACE
// scope to the FULL animated-surface file set + a *.vue `<style>` catch-all and
// added the SEVENTH assertion, REGISTER-ASSIGNMENT):
//
//   ONE-SPRING-SOURCE  — the ONLY `--spring-*` DEFINITIONS in the repo live in
//                        the regen-generated §2 EASING block in tokens.css. A
//                        `--spring-*:` definition anywhere else is a second
//                        authority → RED.
//
//   NO-HAND-ROLLED-EASING — no raw `cubic-bezier(` or `linear(`-with-stops spring
//                        literal sits on a transition/animation declaration in
//                        the animated-surface CSS (the full SURFACE_CSS set + the
//                        aurora/blob/component SFC `<style>` blocks + the *.vue
//                        `<style>` catch-all). The springs and core eases are
//                        TOKEN DEFINITIONS in tokens.css (the single definition
//                        home, exempt); a surface composes them only via
//                        `var(--spring-*)` / `var(--ease-*)`. The non-physical
//                        motion ALLOW-LIST (shimmer / marquee / sparkle-sweep
//                        keyframes that are intentionally NOT spring-driven) is
//                        authored below, not discovered ad-hoc (the W31
//                        triumvirate §3a clause).
//
//   PRESS-FROM-COHORT  — every canonical press surface (`.tap-squish`, the
//                        button / slider / dock-icon / dock-tab press recipes)
//                        resolves `scale:` from a `--scale-press*` var, never a
//                        literal `0.9x`. ONE press vocabulary — no per-atom
//                        literal scale.
//
//   REGISTER-ASSIGNMENT (AY.W-MOTION) — the §6 easing doctrine (tokens.css:162-190)
//                        is a MACHINE-CHECKED register assignment, not an
//                        unenforced prose table. Each `transition:` declaration is
//                        parsed into (property, duration, easing) legs; the easing
//                        var on each leg is classified against the property's kind:
//                        a SURFACE leg (bg/border/color/box-shadow/opacity/fill/
//                        stroke) must NOT name a `--spring-*` (a spring on a colour
//                        cross-fade reads as a wobble — §6 surface→bezier); a
//                        TRANSFORM leg (transform/translate/scale/rotate) that names
//                        a `--spring-*` must name `--spring-smooth`/`--spring-snappy`
//                        (the hover/press registers), NEVER `--spring-bouncy`/
//                        `--spring-dock`/`--spring-gentle` (the enter/dock-morph/
//                        ambient registers). Targets `transition:` declarations
//                        only — an `animation:` shorthand keeps the spring-enter
//                        register (enter→spring is correct). The authored
//                        REGISTER_ASSIGNMENT_ALLOW set carves the deliberate
//                        exemptions (the Toast surface — reka owns its data-state
//                        choreography, a documented keep; the `--dock-resize-spring`
//                        dock-morph token which legitimately rides `--spring-dock`
//                        because the dock box MORPH is an enter-class size animation,
//                        not a hover).
//
//   APPLE-SPRING-SURVIVOR (AX.W05) — the legacy `--ease-apple-spring` /
//                        `--motion-ease-apple-spring` cubic-bezier is EXCISED.
//                        Zero definitions + zero consumers anywhere in `src/`
//                        (comment-stripped, so the excision-rationale prose is
//                        never a false witness). A SECOND iOS-spring authority
//                        beside the governed `--spring-*` cohort is the no-legacy
//                        violation; this is the deletion-proof.
//
//   SPRING-CONSUMER-COVERAGE (AX.W05) — every emitted `--spring-X` definition has
//                        ≥1 live consumer, counting BOTH a direct `var(--spring-X)`
//                        read AND a `--ease-spring-X` @theme-alias reach (the alias
//                        is a documented public register — presets-in-consumers).
//                        A generated preset with ZERO reach FAILS CLOSED — the
//                        generator cannot mint a dead token.
//
//   APPLE-SPRING-CONSTELLATION (AX.W05, cross-repo forcing function) — the
//                        constellation consumers (at minimum `../speedtest`) carry
//                        NO `var(--ease-apple-spring)` read while inheriting the
//                        token with no local definition. STAYS RED until the W34
//                        speedtest re-point leg lands (the publish-gated census
//                        that prevents the silent clean-break). An ABSENT sibling
//                        is SKIPPED (recorded, not failed) — the census is only
//                        falsifiable where the sibling is checked out.
//
// House style mirrors proof-dock-motion-single-source.mjs: ESM .mjs, a CSS
// comment-strip first (false-witness discipline — a commented-out `cubic-bezier`
// or an explanatory token list is never a witness), a pure exported detector, a
// byte-stable JSON artefact via gate-output, a human summary, exit(1) on any
// violation.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

// Resolve the repo root from this module's URL when invoked as a CLI gate.
// Under a test runner (vitest) `import.meta.url` may not be a `file:` URL on
// import, so fall back to the cwd — the pure detectors a test imports never read
// ROOT, and the run()/census paths only fire from the CLI guard.
const ROOT = (() => {
    try {
        return resolve(fileURLToPath(new URL("../", import.meta.url)));
    } catch {
        return process.cwd();
    }
})();

// The repo `src/` tree — the survivor sweep + the consumer-coverage census walk
// it (CSS + SFC + TS). The constellation census walks the sibling consumers'
// `src/` (at minimum speedtest) — sibling paths are ROOT-relative `../<name>`.
const SRC_DIR = resolve(ROOT, "src");
const CONSTELLATION_SIBLINGS = ["../speedtest"];

// The legacy apple-spring authority AX.W05 excises. The survivor sweep reds on
// ANY definition or consumer of either name in `src/`; the constellation census
// reds on a consumer read in a sibling that has no local definition.
const APPLE_SPRING_RE = /--(?:motion-)?ease-apple-spring\b/g;

// The animated-surface CSS file set the spec §2/§6 names. Each is scanned for a
// hand-rolled easing literal on a transition/animation property + a press-scale
// literal. tokens.css is the DEFINITION home (the §2 EASING block + the
// `--motion-ease-*` cubic-bezier seeds) — it is scanned ONLY for an out-of-block
// `--spring-*` definition, NOT for the literal-easing clause.
// AY.W-MOTION widened this from the prior 3-file sample (dock.css /
// dock-controls.css / utilities.css) to the FULL animated-surface CSS set —
// every sheet that carries a `transition:`/`animation:` declaration, incl. the
// AX.W06 dock partials. tokens.css STAYS the definition home (scanned only for
// an out-of-block `--spring-*` def, below), NOT here.
const SURFACE_CSS = [
    "src/styles/dock.css",
    "src/styles/dock-controls.css",
    "src/styles/utilities.css",
    "src/styles/transitions.css",
    "src/styles/animations.css",
    "src/styles/cards.css",
    "src/styles/glass.css",
    "src/styles/instrument-chassis.css",
    "src/styles/drawer.css",
    "src/styles/hover-popover.css",
    "src/styles/floating-panel.css",
    "src/styles/scroll-driven.css",
    "src/styles/view-transition.css",
    "src/styles/dock/shell.css",
    "src/styles/dock/morph.css",
    "src/styles/dock/density.css",
    "src/styles/dock/layers.css",
    "src/styles/dock/layer-group.css",
    "src/styles/dock/overflow.css",
];

// The "always-scanned" SFC anchor: the aurora/blob hosts PLUS the component
// SFCs that carry a `<style>` `transition:` declaration today. The *.vue
// `<style>` catch-all in detectAll (walkSrc-based) is the drift-proof
// supplement — this list never has to grow as new SFC transitions land, but the
// named anchors document the surfaces the band explicitly stands over.
const SURFACE_SFC = [
    "src/components/custom/aurora/Aurora.vue",
    "src/components/custom/goo-blob/GooBlob.vue",
    "src/components/custom/metric-stack/MetricRow.vue",
    "src/components/custom/scrolling-text/ScrollingText.vue",
    "src/components/ui/slider/Slider.vue",
];

const TOKENS_CSS = "src/styles/tokens.css";

// Strip CSS comments to blanks (preserve offsets/newlines) so a commented-out
// fork or an explanatory comment ("`--spring-snappy` linear()) is the source…")
// is never a false witness.
export function stripCssComments(src) {
    let out = "";
    let i = 0;
    const n = src.length;
    while (i < n) {
        if (src[i] === "/" && src[i + 1] === "*") {
            const end = src.indexOf("*/", i + 2);
            const stop = end === -1 ? n : end + 2;
            for (let j = i; j < stop; j++) out += src[j] === "\n" ? "\n" : " ";
            i = stop;
        } else {
            out += src[i];
            i++;
        }
    }
    return out;
}

// A 1-based line index for a character offset (for the file:line witness).
function lineOf(src, offset) {
    let line = 1;
    for (let i = 0; i < offset && i < src.length; i++) if (src[i] === "\n") line++;
    return line;
}

// ── Non-physical motion allow-list (W31 triumvirate §3a) ─────────────────────
// These keyframes are INTENTIONALLY not spring-driven — a marquee/shimmer/
// sparkle is a continuous material sweep, not a settling physical morph. The
// `linear()` / `cubic-bezier()` on their CONSUMING rule (or a `linear` timing
// keyword, distinct from the `linear()` spring function) is legitimate. The
// list is authored here, not discovered ad-hoc, so the gate never over-reaches
// onto a legitimate non-physical surface. (None ship on the SURFACE_CSS set
// today — every shimmer/marquee/sparkle consumer lives in animations.css or a
// component SFC, OUTSIDE this scan; the list is the authored escape hatch a
// future surface-CSS shimmer would claim.)
export const NON_PHYSICAL_ALLOW = [
    "shimmer",
    "shimmer-sweep",
    "gold-shimmer-slide",
    "sparkle-sweep",
    "marquee",
    "scroll-marquee",
    // AY.W-MOTION — the ScrollingText overflow-marquee pan: a continuous material
    // sweep (pause-pan-pause-return), NOT a settling physical morph, so its
    // `cubic-bezier(0.45, 0, 0.55, 1)` ease-in-out is the correct non-physical
    // register (ScrollingText.vue, the lifted speedtest marquee).
    "scrolling-text-pan",
];

// Detect a raw `cubic-bezier(` or the `linear(`-with-stops spring function on a
// surface CSS. The bare `linear` timing KEYWORD (no paren) is a legitimate
// timing-function token and is NOT flagged — only the `linear(` STOP-LIST form
// (a hand-rolled spring serialization) is a fork.
const EASING_LITERAL_RE =
    /\b(cubic-bezier\s*\(|linear\s*\([^)]*%[^)]*\)|linear\s*\(\s*[\d.]+\s*,)/g;

// A `scale:` longhand or `scale(` function with a sub-1 literal numeric (a
// per-atom press literal). `scale: 1` / `scale: var(--…)` / `scale(var(--…))`
// pass; `scale: 0.96` / `scale(0.9)` fail.
const PRESS_LITERAL_RE = /\bscale\s*:\s*(0?\.\d+)\b|\bscale\s*\(\s*(0?\.\d+)\b/g;

// Any `--spring-NAME:` DEFINITION (the assignment form, not a `var()` read).
const SPRING_DEF_RE = /--spring-[a-z-]+\s*:/g;

// The §2 EASING generated block bounds in tokens.css — the regen marker header
// through the last `--spring-dock:` line. A `--spring-*` definition INSIDE these
// bounds is the canonical generated source; one OUTSIDE is a second authority.
const SPRING_BLOCK_HEADER = "§2  EASING — Spring curves via linear()";

function springBlockBounds(tokensSrc) {
    const headerIdx = tokensSrc.indexOf(SPRING_BLOCK_HEADER);
    if (headerIdx === -1) return null;
    // The block's spring lines run header → the LAST `--spring-` def line + its
    // semicolon. Anchor the end on the last `--spring-` occurrence's line end.
    const lastSpring = tokensSrc.lastIndexOf("--spring-");
    if (lastSpring === -1 || lastSpring < headerIdx) return null;
    const lineEnd = tokensSrc.indexOf("\n", lastSpring);
    return { start: headerIdx, end: lineEnd === -1 ? tokensSrc.length : lineEnd };
}

export function detectSpringSource(tokensSrc) {
    const violations = [];
    // The §2 EASING block header is a COMMENT marker (the regen script anchors
    // on it), so bounds are computed against the RAW source — a comment-strip
    // would blank the header and lose the anchor. The `--spring-*` DEFINITIONS
    // are real CSS declarations, scanned on the raw source too; a `--spring-*`
    // inside a comment cannot exist (a commented-out def is `/* --spring-… */`,
    // which is not an assignment the §2-block bounds would contain anyway).
    const bounds = springBlockBounds(tokensSrc);
    if (bounds === null) {
        violations.push(
            `${TOKENS_CSS}: the §2 EASING generated spring block header is missing — cannot anchor the single spring source`,
        );
        return { violations, springDefCount: 0 };
    }
    let m;
    let count = 0;
    SPRING_DEF_RE.lastIndex = 0;
    while ((m = SPRING_DEF_RE.exec(tokensSrc)) !== null) {
        count++;
        if (m.index < bounds.start || m.index > bounds.end) {
            violations.push(
                `${TOKENS_CSS}:${lineOf(tokensSrc, m.index)}: a --spring-* definition lives OUTSIDE the regen-generated §2 EASING block — a second spring authority`,
            );
        }
    }
    return { violations, springDefCount: count };
}

// A `transition`/`animation` declaration carrying a raw easing literal — the
// comment-stripped surface source. Returns file:line witnesses, exempting the
// non-physical allow-list (a rule whose animation-name is on NON_PHYSICAL_ALLOW).
export function detectEasingForks(file, src) {
    const violations = [];
    const stripped = stripCssComments(src);
    let m;
    EASING_LITERAL_RE.lastIndex = 0;
    while ((m = EASING_LITERAL_RE.exec(stripped)) !== null) {
        // Is this literal on a rule that uses an allow-listed non-physical
        // keyframe? Look back to the nearest `animation`/`animation-name` in the
        // same declaration window (the prior 240 chars) for an allow-listed name.
        const windowStart = Math.max(0, m.index - 240);
        const ctx = stripped.slice(windowStart, m.index + 80);
        const exempt = NON_PHYSICAL_ALLOW.some((name) =>
            new RegExp(`\\banimation[^;]*\\b${name}\\b`).test(ctx),
        );
        if (exempt) continue;
        violations.push(
            `${file}:${lineOf(stripped, m.index)}: a hand-rolled '${m[0].trim()}' easing literal on an animated surface — compose a --spring-*/--ease-* token, not an inline curve`,
        );
    }
    return violations;
}

// Whether an offset sits inside an `@keyframes …{ … }` block — a keyframe
// waypoint (`scale: 0.96` at `from`/`0%`) is the START/END position of an
// entrance, NOT a press recipe, so the press-cohort rule exempts it (a generic
// enter keyframe cannot name a `--scale-press*` token). Scans the `@keyframes`
// block extents in the comment-stripped source.
function keyframesRanges(stripped) {
    const ranges = [];
    const re = /@keyframes\b[^{]*\{/gi;
    let m;
    while ((m = re.exec(stripped)) !== null) {
        // Walk from the opening `{` to its matching `}` (keyframes blocks nest
        // one level — the `from`/`to`/`%` sub-blocks).
        let depth = 0;
        let i = m.index + m[0].length - 1; // at the opening `{`
        for (; i < stripped.length; i++) {
            if (stripped[i] === "{") depth++;
            else if (stripped[i] === "}") {
                depth--;
                if (depth === 0) break;
            }
        }
        ranges.push([m.index, i]);
    }
    return ranges;
}

// A `scale:` press literal on a surface CSS. Returns file:line witnesses. EXEMPTS
// a literal inside an `@keyframes` block (an enter/exit waypoint) and inside a
// Vue-transition keyframe-state selector (`*-enter-from`/`*-leave-to`/…) — those
// are entrance/exit START/END positions, not press recipes. The assertion targets
// a press recipe's literal `scale` (`:active { scale: 0.9 }`) on a canonical
// press surface, the per-atom literal the --scale-press* cohort replaces.
export function detectPressForks(file, src) {
    const violations = [];
    const stripped = stripCssComments(src);
    const kfRanges = keyframesRanges(stripped);
    const inKeyframes = (off) => kfRanges.some(([a, b]) => off >= a && off <= b);
    let m;
    PRESS_LITERAL_RE.lastIndex = 0;
    while ((m = PRESS_LITERAL_RE.exec(stripped)) !== null) {
        if (inKeyframes(m.index)) continue; // a keyframe waypoint, not a press
        const role = selectorRoleAt(stripped, m.index);
        if (role === "enter" || role === "exit") continue; // a transition waypoint
        const literal = m[1] ?? m[2];
        violations.push(
            `${file}:${lineOf(stripped, m.index)}: a literal press scale '${literal}' on an animated surface — resolve from the --scale-press* cohort, not a per-atom literal`,
        );
    }
    return violations;
}

// ── REGISTER-ASSIGNMENT (AY.W-MOTION) ─────────────────────────────────────────
// The authored exemption set the §6 register assertion EXEMPTS — mirrors the
// NON_PHYSICAL_ALLOW discipline (authored, never discovered ad-hoc). Each entry
// is an easing-var name that a leg MAY name without tripping the register rule,
// WITH the recorded rationale:
//   --spring-dock   — the dock-box MORPH register: the dock shell `width`/`height`
//                     and a DockLayer size FLIP are an ENTER-class size animation
//                     (the box grows/shrinks like a panel opening), not a
//                     hover/press. `--dock-resize-spring` (= --spring-dock) and the
//                     dock-morph transitions ride it by design. A TRANSFORM-on-
//                     --spring-dock that is a PRESS is still flagged unless its
//                     property is a size/morph property (width/height/grid-*).
// The Toast surface keeps the reka `tw-animate-css` data-state choreography (a
// documented keep, transitions.css §Toast-contract) — but the Toast emits NO
// `transition:` declaration with a `--spring-*` easing (it uses
// `transition-[opacity,transform]` for the swipe-drag with the reka-supplied
// timing), so it never reaches this detector; the keep is recorded in the contract
// doc + this note, no allow-list entry is needed to silence a phantom.
export const REGISTER_ASSIGNMENT_ALLOW = {
    // The dock-morph size register — legitimate on a width/height/morph leg.
    "--spring-dock": "dock-box MORPH (enter-class size animation, not a hover/press)",
    "--dock-resize-spring": "the dock-morph FLIP-fallback timing (= --spring-dock)",
    "--dock-motion-resize": "the dock-box resize transition timing (rides --dock-resize-spring)",
};

// The SURFACE property kinds (a spring on any of these reads as a wobble — §6).
const SURFACE_PROPS = new Set([
    "background",
    "background-color",
    "border",
    "border-color",
    "border-width",
    "color",
    "box-shadow",
    "opacity",
    "fill",
    "stroke",
    "backdrop-filter",
    "filter",
]);

// The TRANSFORM/size property kinds. A `transform`/`translate`/`scale`/`rotate`
// is a hover/press leg (→ smooth/snappy); a `width`/`height`/`grid-*`/`inset` is a
// MORPH/size leg (→ --spring-dock is legitimate, the enter-class size register).
const TRANSFORM_PROPS = new Set(["transform", "translate", "scale", "rotate"]);
const MORPH_PROPS = new Set([
    "width",
    "height",
    "min-width",
    "max-width",
    "min-height",
    "max-height",
    "inset",
    "top",
    "left",
    "right",
    "bottom",
    "grid-template-columns",
    "grid-template-rows",
]);

// The off-doctrine TRANSFORM-leg springs (the enter/morph/ambient registers a
// hover/press must NOT name).
const OFF_DOCTRINE_TRANSFORM_SPRING = new Set([
    "--spring-bouncy",
    "--spring-dock",
    "--spring-gentle",
]);

// Split a `transition:` value into its comma legs, respecting parentheses so a
// `cubic-bezier(a, b, c, d)` / `linear(…)` / `color-mix(…)` comma is not a leg
// boundary.
function splitTransitionLegs(value) {
    const legs = [];
    let depth = 0;
    let cur = "";
    for (const ch of value) {
        if (ch === "(") depth++;
        else if (ch === ")") depth = Math.max(0, depth - 1);
        if (ch === "," && depth === 0) {
            legs.push(cur.trim());
            cur = "";
        } else {
            cur += ch;
        }
    }
    if (cur.trim()) legs.push(cur.trim());
    return legs;
}

// Parse one transition LEG into { property, vars } — `property` is the leg's
// FIRST token (the transitioned property), `vars` is every `var(--…)` reference
// in the leg (duration/delay tokens are unit-bearing, e.g. `var(--duration-fast)`;
// the easing token names a `--spring-*`/`--ease-*`). The caller classifies the
// easing off `vars`; a leg with no `var(--…)` easing yields an empty `vars` (a
// bare-keyword leg is the detectEasingForks/HG4 concern, not this one). Returns
// null only for an empty leg (no tokens).
function parseTransitionLeg(leg) {
    const tokens = leg.split(/\s+/).filter(Boolean);
    if (!tokens.length) return null;
    const property = tokens[0].toLowerCase();
    const vars = [...leg.matchAll(/var\(\s*(--[a-z0-9-]+)/gi)].map((mm) => mm[1]);
    return { property, vars };
}

// Classify the ROLE of the selector enclosing a declaration offset, so the
// register rule fires on the RIGHT register-kind. §6 governs by transition KIND:
// ENTER (mount/popover/dialog-in) legitimately rides a `--spring-*` enter spring;
// a HOVER/PRESS transform must be smooth/snappy; an EXIT must be a bezier. The
// Vue-`<Transition>` class convention (`*-enter-active`/`*-leave-active`) names
// the role; an interactive pseudo (`:hover`/`:active`/`:focus`) names a press;
// anything else is a plain state class (state-morph — enter-class). We scan the
// enclosing rule's selector text (the run from the prior `}` or `{`-opener back
// to the selector head) for the role marker.
function selectorRoleAt(stripped, offset) {
    // Walk back to the `{` that opens this declaration's block, then to the
    // selector text preceding it (the run after the previous `}`/`{`/`;`).
    const braceOpen = stripped.lastIndexOf("{", offset);
    if (braceOpen === -1) return "unknown";
    let selStart = braceOpen - 1;
    while (selStart > 0 && !"{};".includes(stripped[selStart])) selStart--;
    const selector = stripped.slice(selStart + 1, braceOpen).toLowerCase();
    if (/-enter-active|-enter-from|-enter-to|-appear-active/.test(selector)) return "enter";
    if (/-leave-active|-leave-from|-leave-to/.test(selector)) return "exit";
    if (/:hover|:active|:focus|\[data-pressed|\[data-state=/.test(selector)) return "press";
    return "state"; // a plain class (state-morph) — enter-class, spring legitimate
}

// Detect a §6 register-assignment violation across every `transition:`
// declaration in a comment-stripped source. PURE — file is for the witness only.
export function detectRegisterAssignment(file, src) {
    const violations = [];
    const stripped = stripCssComments(src);
    // Match a `transition:` (NOT `transition-property`/`-duration`/`-timing`/
    // `transition-delay`) declaration through its terminating `;` or block end.
    const declRe = /\btransition\s*:\s*([^;}]+)[;}]/gi;
    let m;
    while ((m = declRe.exec(stripped)) !== null) {
        const value = m[1];
        const line = lineOf(stripped, m.index);
        const role = selectorRoleAt(stripped, m.index);
        // `transition: none` / a `transition: all …` global — skip the property
        // classification (no per-property leg to assign a register to).
        for (const leg of splitTransitionLegs(value)) {
            const parsed = parseTransitionLeg(leg);
            if (!parsed) continue;
            const { property, vars } = parsed;
            // The easing var is a `--spring-*` or an allow-listed easing alias.
            const springVar = vars.find((v) => /^--spring-[a-z-]+$/.test(v));
            const allowVar = vars.find((v) => v in REGISTER_ASSIGNMENT_ALLOW);
            if (!springVar && !allowVar) continue; // a `--ease-*` leg is fine.
            const easing = springVar ?? allowVar;
            const isSurface = SURFACE_PROPS.has(property);
            const isTransform = TRANSFORM_PROPS.has(property);
            const isMorph = MORPH_PROPS.has(property);
            // SURFACE leg → must NOT name a --spring-* (or a spring-backed alias),
            // in ANY role (a colour/opacity cross-fade reads as a wobble whether
            // it enters, leaves, or hovers — §6 surface→bezier is role-agnostic).
            if (isSurface) {
                // An allow-listed dock-morph alias on a SURFACE leg is still a
                // wobble — the allow-list exempts MORPH legs, not surface legs.
                violations.push(
                    `${file}:${line}: surface prop '${property}' transitions on '${easing}' — a --spring-* on a surface leg reads as a wobble; use --ease-standard (§6)`,
                );
                continue;
            }
            // TRANSFORM leg → the register depends on the role. An ENTER/STATE
            // transform legitimately rides the ENTER spring (`--spring-bouncy`/
            // `-snappy` — §6 enter row, the dialog-scale/pop precedent). Only a
            // HOVER/PRESS transform must be smooth/snappy, never bouncy/dock/gentle.
            // An EXIT transform must be a bezier (no spring) — flag ANY spring.
            if (isTransform && springVar) {
                if (role === "press" && OFF_DOCTRINE_TRANSFORM_SPRING.has(springVar)) {
                    violations.push(
                        `${file}:${line}: transform prop '${property}' presses on '${springVar}' — use --spring-smooth/--spring-snappy for hover/press, never --spring-bouncy/-dock/-gentle (§6)`,
                    );
                    continue;
                }
                if (role === "exit") {
                    violations.push(
                        `${file}:${line}: transform prop '${property}' EXITS on '${springVar}' — an exit must ride a bezier (--ease-out/--ease-standard), never a spring (§6, no overshoot past gone)`,
                    );
                    continue;
                }
            }
            // MORPH/size leg on --spring-dock (or a dock-morph alias) is the
            // legitimate enter-class size register — exempt. An ENTER/STATE
            // transform spring is the enter register — exempt. Any other property
            // (a non-surface, non-transform, non-morph leg) naming a --spring-* is
            // unclassified and not flagged (no register assigned).
            void isMorph;
        }
    }
    return violations;
}

// A composite PRESS-spring token DEFINITION (`--*-press-spring: <dur> <easing>`)
// is consumed as a TRANSFORM/press leg (`scale var(--dock-press-spring)`), so its
// easing must be a hover/press register (`--spring-smooth`/`--spring-snappy`),
// NEVER `--spring-bouncy`/`--spring-dock`/`--spring-gentle` (§6 D1). The
// register-assertion sees the composite at its DEFINITION (tokens.css) — the
// consumption site only names the opaque composite. EXEMPT: an authored
// PRESS_SPRING_PENDING entry naming the lander wave (the verify-not-edit bridge
// per spec §5 — `--dock-press-spring`'s --spring-smooth re-point is owned by
// W-DOCK2; until it lands, the gate stays GREEN via this noted bridge, and once
// it lands the value is clean regardless of the exemption).
const PRESS_SPRING_PENDING = {
    "--dock-press-spring":
        "AY.W-DOCK2 is the lander (re-points tokens.css:1771 --spring-bouncy → --spring-smooth, deleting the dock-controls.css shadow re-point). Verify-not-edit bridge (spec §5): GREEN now via this noted exemption, naturally clean once W-DOCK2 lands.",
};

export function detectPressSpringRegister(file, src) {
    const violations = [];
    const stripped = stripCssComments(src);
    // `--<name>-press-spring: … var(--spring-X) …;` — the composite press token.
    const defRe = /(--[a-z0-9-]*press-spring)\s*:\s*([^;}]+)[;}]/gi;
    let m;
    while ((m = defRe.exec(stripped)) !== null) {
        const name = m[1];
        const value = m[2];
        const springs = [...value.matchAll(/var\(\s*(--spring-[a-z-]+)/gi)].map(
            (mm) => mm[1],
        );
        for (const sp of springs) {
            if (!OFF_DOCTRINE_TRANSFORM_SPRING.has(sp)) continue;
            if (name in PRESS_SPRING_PENDING) continue; // the noted verify-not-edit bridge.
            violations.push(
                `${file}:${lineOf(stripped, m.index)}: the press-spring token '${name}' resolves '${sp}' — a press composite must name --spring-smooth/--spring-snappy, never --spring-bouncy/-dock/-gentle (§6)`,
            );
        }
    }
    return violations;
}

// ── AX.W05 src-tree walk + a CSS+line-comment strip ──────────────────────────
// The survivor sweep + the consumer-coverage census walk the whole `src/` tree
// (CSS tokens + SFC `<style>`/`<script>` + TS), so a witness in any consumer file
// (not just the 3 SURFACE_CSS) is caught. Comments are stripped first so the
// excision-rationale prose ("apple-spring was excised → maps to --spring-…") is
// never a false witness — the false-witness discipline the gate header names.
function walkSrc(dir, acc = []) {
    if (!existsSync(dir)) return acc;
    for (const n of readdirSync(dir)) {
        if (n === "node_modules" || n === "__tests__") continue;
        const p = join(dir, n);
        if (statSync(p).isDirectory()) walkSrc(p, acc);
        else if (/\.(css|vue|ts|tsx)$/.test(n)) acc.push(p);
    }
    return acc;
}

// Strip both CSS block comments AND JS/TS line comments (a `.vue`/`.ts` file
// carries `//` rationale). Block comments reuse the offset-preserving CSS strip;
// the line-comment pass blanks `// …` to end-of-line. `https://` is not a CSS
// token home here, but guard the `//` strip to a non-`:` predecessor so a stray
// URL is not mangled (a token-name witness never sits inside a URL anyway).
function stripAllComments(src) {
    const noBlocks = stripCssComments(src);
    return noBlocks
        .split("\n")
        .map((line) => {
            const i = line.indexOf("//");
            if (i === -1) return line;
            if (i > 0 && line[i - 1] === ":") return line; // not a comment (URL)
            return line.slice(0, i);
        })
        .join("\n");
}

// Extract the `<style>` block content from a `.vue` SFC, blanking everything
// OUTSIDE the `<style>` blocks to spaces/newlines so the line offsets stay true
// (the easing/register witness reads the original SFC line). A non-`.vue` source
// is returned unchanged (a bare `.css` is all-style). This is what the CSS-shaped
// detectors (detectEasingForks/detectPressForks/detectRegisterAssignment) scan on
// an SFC — the `<template>`/`<script>` carry no CSS transition.
function vueStyleOnly(src) {
    const blockRe = /<style[^>]*>([\s\S]*?)<\/style>/gi;
    let out = "";
    let last = 0;
    let m;
    while ((m = blockRe.exec(src)) !== null) {
        const blockStart = m.index + m[0].indexOf(">") + 1;
        // Blank the gap before the style content (incl. the opening tag).
        out += src.slice(last, blockStart).replace(/[^\n]/g, " ");
        out += m[1]; // the raw style content (offsets preserved)
        last = blockStart + m[1].length;
    }
    out += src.slice(last).replace(/[^\n]/g, " ");
    return out;
}

// The CSS the CSS-shaped detectors scan for a file: a `.vue` is reduced to its
// `<style>` blocks (offset-preserving), a `.css` passes through whole.
function cssOf(file, src) {
    return file.endsWith(".vue") ? vueStyleOnly(src) : src;
}

// APPLE-SPRING-SURVIVOR — zero `--ease-apple-spring`/`--motion-ease-apple-spring`
// references (definition OR consumer) anywhere in `src/`, comment-stripped.
export function detectAppleSpringSurvivors(files, read) {
    const survivors = [];
    for (const file of files) {
        const stripped = stripAllComments(read(file));
        let m;
        APPLE_SPRING_RE.lastIndex = 0;
        while ((m = APPLE_SPRING_RE.exec(stripped)) !== null) {
            survivors.push(`${file}:${lineOf(stripped, m.index)}: '${m[0]}'`);
        }
    }
    return survivors;
}

// SPRING-CONSUMER-COVERAGE — every `--spring-X` defined in tokens.css has ≥1
// live consumer across `src/`, counting a direct `var(--spring-X)` read OR a
// `--ease-spring-X` alias reach (the alias is a documented public register). The
// alias DEFINITION line in theme.css (`--ease-spring-gentle: var(--spring-gentle)`)
// counts as the alias reach that proves the public register exists. A preset with
// ZERO reach is a dead generator mint → fail-closed.
export function detectSpringCoverage(tokensSrc, files, read) {
    const violations = [];
    const facts = {};

    // The defined preset names (smooth/snappy/bouncy/gentle/dock), from the
    // §2 EASING block DEFINITIONS in tokens.css.
    const names = [
        ...new Set(
            [...tokensSrc.matchAll(/--spring-([a-z-]+)\s*:/g)].map((m) => m[1]),
        ),
    ];
    facts.presets = names;

    const blob = files.map((f) => stripAllComments(read(f))).join("\n");
    const coverage = {};
    for (const name of names) {
        const direct = new RegExp(`var\\(\\s*--spring-${name}\\b`).test(blob);
        // The `--ease-spring-X` alias reach: either a `var(--ease-spring-X)`
        // consumer OR the alias DEFINITION (`--ease-spring-X: var(--spring-X)`),
        // which publishes the register a consumer can reach. `--ease-spring`
        // (no suffix) aliases snappy and counts toward snappy.
        const aliasName = name === "snappy" ? "(?:spring-snappy|spring)" : `spring-${name}`;
        const aliasReach = new RegExp(
            `--ease-${aliasName}\\s*:\\s*var\\(\\s*--spring-${name}\\b|var\\(\\s*--ease-${aliasName}\\b`,
        ).test(blob);
        const reached = direct || aliasReach;
        coverage[name] = { direct, aliasReach, reached };
        if (!reached) {
            violations.push(
                `--spring-${name} has ZERO consumers (no var(--spring-${name}) read + no --ease-spring-${name} alias reach) — a dead generator mint; retire it or wire a consumer`,
            );
        }
    }
    facts.coverage = coverage;
    facts.coveredPresets = Object.values(coverage).filter((c) => c.reached).length;
    return { facts, violations };
}

// APPLE-SPRING-CONSTELLATION — the cross-repo forcing function. A sibling
// consumer that READS `var(--ease-apple-spring)` while carrying NO local
// definition inherits the now-excised glass-ui token → its transition degrades
// silently. Reds until the W34 re-point lands. An absent sibling is SKIPPED.
export function detectConstellationCensus() {
    const violations = [];
    const facts = { siblings: [] };
    for (const rel of CONSTELLATION_SIBLINGS) {
        const root = resolve(ROOT, rel);
        const srcDir = resolve(root, "src");
        if (!existsSync(srcDir)) {
            facts.siblings.push({ sibling: rel, status: "skipped (absent)" });
            continue;
        }
        const files = walkSrc(srcDir);
        const localDef = files.some((f) =>
            /--(?:motion-)?ease-apple-spring\s*:/.test(
                stripAllComments(readFileSync(f, "utf8")),
            ),
        );
        const consumers = [];
        for (const f of files) {
            const stripped = stripAllComments(readFileSync(f, "utf8"));
            let m;
            const re = /var\(\s*--(?:motion-)?ease-apple-spring\b/g;
            while ((m = re.exec(stripped)) !== null) {
                consumers.push(`${f.slice(root.length + 1)}:${lineOf(stripped, m.index)}`);
            }
        }
        facts.siblings.push({
            sibling: rel,
            status: "checked",
            localDef,
            consumerReads: consumers.length,
            consumers,
        });
        if (consumers.length > 0 && !localDef) {
            violations.push(
                `constellation consumer ${rel} reads var(--ease-apple-spring) at ${consumers.length} site(s) with NO local definition — it inherits the EXCISED glass-ui token and degrades to instant/linear. Re-point onto the governed --spring-* register (W34, publish-gated).`,
            );
        }
    }
    return { facts, violations };
}

export function detectAll(read) {
    const violations = [];
    const facts = {};

    // ONE-SPRING-SOURCE
    const springRes = detectSpringSource(read(TOKENS_CSS));
    facts.springDefCount = springRes.springDefCount;
    violations.push(...springRes.violations);

    // AX.W05 — walk the whole src tree for the survivor sweep + coverage census.
    const srcFiles = walkSrc(SRC_DIR).map((p) => p.slice(ROOT.length + 1));

    // NO-HAND-ROLLED-EASING + PRESS-FROM-COHORT + REGISTER-ASSIGNMENT.
    // The named SURFACE_CSS + SURFACE_SFC are the always-scanned anchors; the
    // *.vue `<style>` catch-all (every SFC in src/ not already a named anchor) is
    // the drift-proof supplement so a new SFC transition is never gate-invisible.
    const easingForks = [];
    const pressForks = [];
    const registerForks = [];
    const namedSet = new Set([...SURFACE_CSS, ...SURFACE_SFC]);
    // The named SURFACE_CSS + SURFACE_SFC are the canonical-press anchors — they
    // get the FULL trio (easing + press-cohort + register). The PRESS-FROM-COHORT
    // assertion is authored against the canonical press surfaces (the gate
    // header), so a decorative SFC's subtle `:active` scale in the catch-all does
    // not draw the cohort rule — the catch-all gets easing + register only (the
    // off-doctrine-spring + hand-rolled-curve sweep the spec names for the wide set).
    const scanAnchor = (file, css) => {
        easingForks.push(...detectEasingForks(file, css));
        pressForks.push(...detectPressForks(file, css));
        registerForks.push(...detectRegisterAssignment(file, css));
    };
    const scanWide = (file, css) => {
        easingForks.push(...detectEasingForks(file, css));
        registerForks.push(...detectRegisterAssignment(file, css));
    };
    for (const file of SURFACE_CSS) scanAnchor(file, read(file));
    for (const file of SURFACE_SFC) {
        const src = read(file, true);
        if (src === null) continue; // an absent SFC is not a violation
        scanAnchor(file, cssOf(file, src));
    }
    // The *.vue `<style>` catch-all — every SFC under src/ NOT a named anchor.
    const catchAllVue = srcFiles.filter(
        (f) => f.endsWith(".vue") && !namedSet.has(f),
    );
    facts.surfaceFilesScanned = SURFACE_CSS.length + SURFACE_SFC.length + catchAllVue.length;
    for (const file of catchAllVue) {
        scanWide(file, cssOf(file, read(file)));
    }
    // REGISTER-ASSIGNMENT on the press-spring composite token DEFINITIONS (D1).
    registerForks.push(...detectPressSpringRegister(TOKENS_CSS, read(TOKENS_CSS)));
    facts.easingForks = easingForks.length;
    facts.pressForks = pressForks.length;
    facts.registerForks = registerForks.length;
    violations.push(...easingForks, ...pressForks, ...registerForks);

    // APPLE-SPRING-SURVIVOR
    const survivors = detectAppleSpringSurvivors(srcFiles, (f) => read(f));
    facts.appleSpringSurvivors = survivors;
    for (const s of survivors) {
        violations.push(
            `legacy apple-spring survivor — ${s}: a second iOS-spring authority beside the governed --spring-* cohort. Excise it; re-point onto a --spring-* register.`,
        );
    }

    // SPRING-CONSUMER-COVERAGE
    const cov = detectSpringCoverage(read(TOKENS_CSS), srcFiles, (f) => read(f));
    facts.springCoverage = cov.facts;
    violations.push(...cov.violations);

    // APPLE-SPRING-CONSTELLATION (cross-repo)
    const census = detectConstellationCensus();
    facts.constellationCensus = census.facts;
    violations.push(...census.violations);

    facts.oneMotionSource = violations.length === 0;
    return { facts, violations };
}

function readFile(rel, optional = false) {
    try {
        return readFileSync(resolve(ROOT, rel), "utf8");
    } catch (err) {
        if (optional) return null;
        throw err;
    }
}

function run() {
    const { facts, violations } = detectAll(readFile);
    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_ANIMATION_COHERENCE_ARTIFACT",
        "AW-animation-coherence",
    );
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:animation-coherence",
        composesWith: "proof:spring-tokens-synced",
        nonPhysicalAllow: NON_PHYSICAL_ALLOW,
        registerAssignmentAllow: REGISTER_ASSIGNMENT_ALLOW,
        facts,
        violations,
    });
    console.log("proof:animation-coherence — the one-motion-source gate (AW.W31.a + AX.W05 + AY.W-MOTION)");
    console.log(`  --spring-* definitions     : ${facts.springDefCount}`);
    console.log(`  animated surfaces scanned  : ${facts.surfaceFilesScanned}`);
    console.log(`  hand-rolled easing forks   : ${facts.easingForks}`);
    console.log(`  literal press-scale forks  : ${facts.pressForks}`);
    console.log(`  register-assignment forks  : ${facts.registerForks}`);
    console.log(`  apple-spring survivors     : ${facts.appleSpringSurvivors.length}`);
    console.log(
        `  --spring-* coverage        : ${facts.springCoverage.coveredPresets}/${facts.springCoverage.presets.length} presets reached`,
    );
    const censusLines = facts.constellationCensus.siblings.map((s) =>
        s.status === "checked"
            ? `${s.sibling} (${s.consumerReads} read${s.consumerReads === 1 ? "" : "s"}, ${s.localDef ? "local-def" : "inherits"})`
            : `${s.sibling} ${s.status}`,
    );
    console.log(`  constellation census       : ${censusLines.join("; ")}`);
    console.log(
        `  one motion source          : ${facts.oneMotionSource ? "YES" : "NO"}`,
    );
    if (violations.length) {
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
