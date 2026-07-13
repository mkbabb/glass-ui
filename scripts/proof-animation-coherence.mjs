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
// SEVEN base assertions over the animated-surface file set (AX.W05 widened it from
// three — the apple-spring survivor sweep + the --spring-* consumer-coverage
// census + the cross-repo constellation census; AY.W-MOTION widened the SURFACE
// scope to the FULL animated-surface file set + a *.vue `<style>` catch-all and
// added the SEVENTH assertion, REGISTER-ASSIGNMENT), PLUS the three AY.W-ANIM1
// GATE-EXTENDED rubric arms (the first-principles audit's machine-checks):
//
//   EASING-TABLE-BOUND (AY.W-ANIM1, §P4) — every `--ease-*`/`--spring-*` token
//                        NAMED on a transition/animation leg MUST exist as a
//                        MOTION_CURVES row (the W-MOTION2 CSS↔JS table — read
//                        node-pure from curves.ts + springPresets.ts source). A
//                        surface composing a curve token with no JS twin REDs — the
//                        doctrine table is the source of truth, the two halves
//                        cannot drift. Rides the anchor + the wide catch-all.
//
//   DURATION-BAND (AY.W-ANIM1, §P5) — no orphan hand-set ms/s literal duration on a
//                        `transition:` leg (INTERACTIVE timing composes a
//                        --duration-*/--motion-duration-* token; the W-MOTION
//                        220ms→--duration-fast discipline). `transition:` ONLY (an
//                        `@keyframes`-driven `animation:` PERIOD is the continuous/
//                        load register's own cadence, out of fence); a `var(--token,
//                        FALLBACK)` fallback literal is NOT an orphan (the token is
//                        composed). Anchor-scoped (mirrors PRESS-FROM-COHORT) — the
//                        decorative catch-all SFCs' orphans route to their owning
//                        component waves (ANIM-MATRIX §2).
//
//   ANIMATION-ENTER-REGISTER (AY.W-ANIM1, §P4 — the blind-spot closure) — the
//                        `animation:`-shorthand exemption is CLOSED (RA-anim-suite
//                        §5 route #5): the gate now SEES an `animation:` shorthand
//                        and grades a TIME-DRIVEN ONE-SHOT MOUNT ENTER (the §6
//                        register) — a non-`infinite`, non-scroll-driven enter that
//                        hand-rolls a raw bezier/`ease` instead of a `--spring-*`/
//                        `--ease-*` token or a documented delegation (tw-animate
//                        animate-in). CONTINUOUS loops (spinner/shimmer/pulse/
//                        indeterminate sweep) + SCROLL-DRIVEN position-maps (`linear`
//                        is required) are out of fence. Anchor-scoped.
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
//                        motion ALLOW-LIST (shimmer / marquee keyframes that are
//                        intentionally NOT spring-driven) is authored below, not
//                        discovered ad-hoc (the W31 triumvirate §3a clause).
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
// AY.W-CSS1 — the central stylesheets are thin @import roots over carved
// partials; readMonolith concatenates root + partials in cascade order.
import { readMonolith } from "./read-css-monoliths.mjs";

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

// AY.W-ANIM1 — the curve-table source (W-MOTION2's MOTION_CURVES). The
// EASING-TABLE-BOUND arm grades every `--ease-*`/`--spring-*` token NAMED on an
// animated leg against this keyset: a surface composing a curve token with no JS
// twin in MOTION_CURVES REDs (the doctrine table is the source of truth, the
// two halves cannot drift). Read the SOURCE (every row's `token:` literal + the
// five programmatic `--spring-${name}` rows) rather than import — node-pure,
// mirroring proof-motion-suite.mjs's reader.
const CURVES_TS = "src/composables/motion/curves.ts";
const SPRING_PRESETS_TS = "src/composables/motion/springPresets.ts";

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
    // BI.W-OVERLAY-UNION — hover-popover.css DELETED (FAM-10 fold): <HoverPopover>
    // folded onto <Popover trigger="hover">; its .hover-popover-panel substrate is
    // dead (the union content rides glass-floating + glass-reveal). No coherence-scan
    // surface lost (its data-state animation already canonicalised onto .glass-reveal).
    // BI.W-GLASS-DEDUP — floating-panel.css DELETED (FAM-9); its live dropdown rules
    // moved to menu.css (no @keyframes/transition, so no coherence-scan surface lost).
    "src/styles/scroll-driven.css",
    "src/styles/view-transition.css",
    "src/styles/dock/shell.css",
    "src/styles/dock/morph.css",
    "src/styles/dock/density.css",
    "src/styles/dock/layers.css",
    "src/styles/dock/layer-group.css",
    "src/styles/dock/overflow.css",
    // AZ.W-CARVE — dock-controls.css drained into dock-controls/*.css partials;
    // the thin root above carries the shared `:where()` group, the five family
    // partials carry the transition/press witnesses.
    "src/styles/dock-controls/icon-button.css",
    "src/styles/dock-controls/dark-mode-toggle.css",
    "src/styles/dock-controls/tab-button.css",
    "src/styles/dock-controls/triggers.css",
    "src/styles/dock-controls/touch-floor.css",
];

// The "always-scanned" SFC anchor: the aurora/blob hosts PLUS the component
// SFCs that carry a `<style>` `transition:` declaration today. The *.vue
// `<style>` catch-all in detectAll (walkSrc-based) is the drift-proof
// supplement — this list never has to grow as new SFC transitions land, but the
// named anchors document the surfaces the band explicitly stands over.
const SURFACE_SFC = [
    "src/components/custom/aurora/Aurora.vue",
    "src/components/custom/blob/Blob.vue",
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
// These keyframes are INTENTIONALLY not spring-driven — a marquee/shimmer is a
// continuous material sweep, not a settling physical morph. The `linear()` /
// `cubic-bezier()` on their CONSUMING rule (or a `linear` timing keyword,
// distinct from the `linear()` spring function) is legitimate. The list is
// authored here, not discovered ad-hoc, so the gate never over-reaches onto a
// legitimate non-physical surface. (None ship on the SURFACE_CSS set today —
// every shimmer/marquee consumer lives in animations.css or a component SFC,
// OUTSIDE this scan; the list is the authored escape hatch a future surface-CSS
// shimmer would claim.)
//
// BA.W-GLASS-CAL (H2a) — `sparkle-sweep` DROPPED from the allow-list: the
// keyframe is RETIRED with the disco recipe family (no surviving consumer). The
// entry is removed, not defeated.
export const NON_PHYSICAL_ALLOW = [
    "shimmer",
    "shimmer-sweep",
    "gold-shimmer-slide",
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

// Split a leg into whitespace tokens at PAREN-DEPTH 0, so a `var(--x, 12px)` /
// `cubic-bezier(0.4, 0, 0.2, 1)` stays ONE token (its internal spaces do not split).
function splitLegTokens(leg) {
    const tokens = [];
    let depth = 0;
    let cur = "";
    for (const ch of leg.trim()) {
        if (ch === "(") {
            depth++;
            cur += ch;
        } else if (ch === ")") {
            depth = Math.max(0, depth - 1);
            cur += ch;
        } else if (/\s/.test(ch) && depth === 0) {
            if (cur) {
                tokens.push(cur);
                cur = "";
            }
        } else {
            cur += ch;
        }
    }
    if (cur) tokens.push(cur);
    return tokens;
}

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

// ── AY.W-ANIM1: EASING-TABLE-BOUND (P4) ──────────────────────────────────────
// Build the MOTION_CURVES token keyset from curves.ts + springPresets.ts SOURCE
// (the same source-witness reader proof-motion-suite.mjs uses — node-pure, no TS
// import). The five spring rows are built programmatically (`--spring-${name}`),
// so the preset names are pulled from springPresets.ts.
export function loadMotionCurveTokens(read) {
    const tokens = new Set();
    const curvesSrc = read(CURVES_TS);
    // Canonical + alias rows: a literal `token: "--x"`.
    for (const m of curvesSrc.matchAll(/token:\s*["'`](--[a-z-]+)["'`]/g)) {
        tokens.add(m[1]);
    }
    // The five spring rows are built from the preset names — read them off the
    // SPRING_PRESETS table in springPresets.ts (`name: "smooth"` literals).
    const presetSrc = read(SPRING_PRESETS_TS);
    for (const m of presetSrc.matchAll(/name:\s*["'`]([a-z]+)["'`]/g)) {
        tokens.add(`--spring-${m[1]}`);
    }
    return tokens;
}

// Every `--ease-*`/`--spring-*` token NAMED on a transition/animation leg in a
// surface MUST exist in MOTION_CURVES. PURE — scans a comment-stripped source for
// `var(--ease-*)`/`var(--spring-*)` reads on an animated declaration and checks
// each against `curveTokens`. A read of a curve token with no MOTION_CURVES row
// is the doctrine-table drift RED. (The `--ease-*` / `--spring-*` namespaces are
// the curve vocabulary; a `--duration-*`/`--scale-*`/`--dock-*`/`--vt-*` var is
// NOT a curve token and is not graded here.)
export function detectEasingTableBound(file, src, curveTokens) {
    const violations = [];
    const stripped = stripCssComments(src);
    // Only grade vars on a `transition:`/`animation:` declaration window (an
    // unrelated `var(--ease-…)` in a comment/doc is stripped; one on a non-animated
    // property is not a motion leg). Walk each `transition`/`animation` declaration.
    const declRe = /\b(?:transition|animation)\s*:\s*([^;}]+)[;}]/gi;
    let m;
    while ((m = declRe.exec(stripped)) !== null) {
        const value = m[1];
        const declStart = m.index;
        for (const vm of value.matchAll(/var\(\s*(--(?:ease|spring)-[a-z-]+)\b/gi)) {
            const tok = vm[1];
            // BA.W-GLASS-CAL Unit 3 — `--spring-<name>-duration` is a DURATION token
            // (the spring's OWN generated settle clock), NOT an easing CURVE; it rides
            // the DURATION leg of a transition (graded by DURATION-BAND, not the curve
            // table). It is generated from the SAME SPRING_PRESETS table the
            // `--spring-<name>` curve is, so it is a charted member of the spring
            // vocabulary — skip the curve-row requirement for it.
            if (/^--spring-[a-z]+-duration$/.test(tok)) continue;
            if (!curveTokens.has(tok)) {
                violations.push(
                    `${file}:${lineOf(stripped, declStart)}: animated leg names '${tok}' which has NO MOTION_CURVES row — the curve table is the source of truth; add the row or compose a charted token (EASING-TABLE-BOUND, §P4)`,
                );
            }
        }
    }
    return violations;
}

// ── AY.W-ANIM1: DURATION-BAND (P5) ────────────────────────────────────────────
// No orphan hand-set ms/s literal duration on a `transition:` declaration —
// INTERACTIVE/surface timing composes a `--duration-*`/`--motion-duration-*`
// token (the §6 "durations within the token bands; no orphan hand-set ms" clause,
// the W-MOTION `220ms`→`--duration-fast` discipline). A raw `220ms`/`0.6s` on a
// transition leg REDs.
//
// SCOPE — `transition:` ONLY (NOT `animation:`): an `@keyframes`-driven
// `animation:` PERIOD is the loop/sweep cadence of a CONTINUOUS or load-indicating
// animation (a `6s` shimmer, a `4s` indeterminate sweep, a `1.6s` dark-toggle
// arc), which is inherently a literal period the keyframe author owns — it is NOT
// an interactive transition duration the token bands govern. The §6/P5 band rule
// is a TRANSITION-timing rule (the magic-ms on a hover/state cross-fade); the
// `animation:` period is the non-physical/continuous register's own cadence and is
// out of fence (the same recorded fence the NON_PHYSICAL_ALLOW carves). `0s`/`0ms`
// (a transition-off / PRM-collapse value) is not a hand-tuned duration.
const DURATION_LITERAL_RE = /\b(\d+(?:\.\d+)?)(ms|s)\b/g;
// A `var(--token, FALLBACK)` window — a literal duration INSIDE the fallback slot
// is the DEFENSIVE fallback of a properly-composed token (`var(--duration-fast,
// 150ms)`), NOT an orphan. We blank every `var(--…, …)` fallback region to spaces
// (offset-preserving) before the literal sweep so a fallback literal is not a
// false orphan. This catches the BARE literal (`transition: width 340ms ease`)
// while passing the composed-with-fallback form.
// Blank the ENTIRE `var(...)` call (token name + fallback) to spaces, offset-
// preserving — for the raw-timing check, a composed token is never a hand-roll and
// the token NAME may carry `ease`/`linear` substrings (`--motion-ease-standard`)
// that a `\bease\b` literal match would false-fire on.
function blankAllVars(value) {
    let out = "";
    let i = 0;
    const n = value.length;
    while (i < n) {
        if (value.startsWith("var(", i)) {
            let depth = 0;
            let j = i;
            for (; j < n; j++) {
                if (value[j] === "(") depth++;
                else if (value[j] === ")") {
                    depth--;
                    if (depth === 0) break;
                }
            }
            for (let k = i; k <= j && k < n; k++) out += value[k] === "\n" ? "\n" : " ";
            i = j + 1;
        } else {
            out += value[i];
            i++;
        }
    }
    return out;
}
function blankVarFallbacks(value) {
    let out = "";
    let i = 0;
    const n = value.length;
    while (i < n) {
        // Match a `var(` start.
        if (value.startsWith("var(", i)) {
            // Walk to the matching `)`, tracking nesting; blank everything AFTER
            // the first top-level comma (the fallback slot) to spaces.
            let depth = 0;
            let j = i;
            let commaAt = -1;
            for (; j < n; j++) {
                const ch = value[j];
                if (ch === "(") depth++;
                else if (ch === ")") {
                    depth--;
                    if (depth === 0) break;
                } else if (ch === "," && depth === 1 && commaAt === -1) {
                    commaAt = j;
                }
            }
            // Copy the `var(--token` head (up to the comma or the close), then
            // blank the fallback slot.
            const headEnd = commaAt === -1 ? j : commaAt;
            out += value.slice(i, headEnd + 1);
            for (let k = headEnd + 1; k <= j; k++) out += value[k] === "\n" ? "\n" : " ";
            i = j + 1;
        } else {
            out += value[i];
            i++;
        }
    }
    return out;
}
// BI.W-REGISTER-TABLE — the DELAY-slot precision + register-clock acceptance.
// §P5 governs the literal DURATION on a transition leg. Per leg, the FIRST <time>
// value is the DURATION, a SECOND is the DELAY (a stagger/overlap positional offset —
// NOT a clock the register governs). So a BARE literal is flagged ONLY when it is the
// leg's DURATION slot; a delay-slot literal (`… var(--clock) var(--ease) 60ms`) passes.
// A time-slot token is a bare `<time>` literal OR a `var(--…duration…)`/`var(--…clock…)`
// composed clock (the register clocks `--reveal-clock` / `--spring-*-duration` /
// `--exit-*-duration` / the register `--enter-*-clock` all read as the composed DURATION).
// A `var(--x, 150ms)` stays ONE paren-aware token (its fallback literal is never a bare
// orphan). `0s`/`0ms` (a transition-off / PRM collapse) is never a hand-tuned duration.
const TIME_LITERAL_TOKEN_RE = /^(\d+(?:\.\d+)?)(?:ms|s)$/;
// A TIMING-FUNCTION var — an ease/spring-CURVE/curve/timing/bezier register (NOT a
// `*-duration`/`*-clock` TIME token). A transition leg's non-property tokens are exactly
// {duration, timing-function, delay}, so a var is a <time> (duration/delay) iff it is NOT
// a timing-function var — classify by EXCLUSION (robust to opaque duration-var names).
const TIMING_VAR_TOKEN_RE =
    /^var\(\s*--[a-z0-9-]*(?:ease|spring|curve|timing|bezier)\b/i;
function isTimeToken(tok) {
    if (TIME_LITERAL_TOKEN_RE.test(tok)) return true; // a bare <time> literal
    if (!/^var\(/i.test(tok)) return false; // a keyword / cubic-bezier()/linear()/property
    // A var: a <time> unless it is a timing-function var (and a `*-duration`/`*-clock`
    // var is a TIME even though its name may contain `spring`, e.g. --spring-*-duration).
    if (/(?:duration|clock)\b/i.test(tok)) return true;
    return !TIMING_VAR_TOKEN_RE.test(tok);
}
export function detectDurationBand(file, src) {
    const violations = [];
    const stripped = stripCssComments(src);
    // `transition:` (NOT `transition-duration`/`-property`/`-timing`/`-delay`, and
    // NOT `animation:`) through its terminating `;`/block-end.
    const declRe = /(?<!-)\btransition\s*:\s*([^;}]+)[;}]/gi;
    let m;
    while ((m = declRe.exec(stripped)) !== null) {
        const rawValue = m[1];
        const declStart = m.index;
        for (const leg of splitTransitionLegs(rawValue)) {
            let timeCount = 0;
            for (const tok of splitLegTokens(leg)) {
                if (!isTimeToken(tok)) continue;
                timeCount++;
                const litM = tok.match(TIME_LITERAL_TOKEN_RE);
                // §P5 governs the literal DURATION slot (the FIRST <time> in a leg); a
                // literal in the DELAY slot (timeCount ≥ 2 — a stagger/overlap offset) is
                // not a clock the register governs.
                if (litM && timeCount === 1 && parseFloat(litM[1]) !== 0) {
                    violations.push(
                        `${file}:${lineOf(stripped, declStart)}: orphan literal duration '${tok}' on a transition leg — compose a --duration-*/--motion-duration-*/--spring-*-duration/register-clock token, not a hand-set value (DURATION-BAND, §P5)`,
                    );
                }
            }
        }
    }
    return violations;
}

// ── AY.W-ANIM1: ANIMATION-ENTER-REGISTER (P4 — the blind-spot closure) ─────────
// The `animation:`-shorthand exemption is CLOSED (RA-anim-suite §5 route #5): the
// prior gate parsed `transition:` only and explicitly waved `animation:`
// shorthands through, so it could not SEE whether an `animation:` ENTER rides the
// §6 spring-enter register or a raw bezier/`ease`. This arm SEES the `animation:`
// shorthand — but it grades ONLY a TIME-DRIVEN ONE-SHOT MOUNT-ENTER, the register
// the §6 doctrine governs (mount/popover/dialog-in → spring). Everything else is
// out of the doctrine's fence and is NOT graded:
//
//   · a CONTINUOUS loop (`infinite`) — a spinner/shimmer/pulse/indeterminate
//     sweep/gold-bg-sweep is a decorative or load-indicating register, never an
//     "enter"; its `linear`/`ease-in-out` cadence is correct (a loop must not
//     spring), and the non-physical sweeps are already on NON_PHYSICAL_ALLOW;
//   · a SCROLL-DRIVEN animation (`animation-timeline`/`scroll()`/`view()`, or the
//     scroll-range `auto` duration keyword) — `linear` is REQUIRED on a scroll-
//     linked timeline (the keyframe maps to scroll POSITION; any non-linear easing
//     distorts the position map — the §6 position-tracked register), so a scroll-
//     driven `linear` is doctrine-CORRECT, not an off-register enter;
//   · the tw-animate `animate-in`/`animate-out` utility enters (reka/vaul OWN the
//     data-state choreography — the documented D4/Toast keep, W-MOTION D4);
//   · a `var(--ease-*)`/`var(--spring-*)` curve token on the shorthand (the
//     doctrine-true register).
//
// So the arm flags ONLY: a NON-`infinite`, NON-scroll-driven `animation:` MOUNT
// ENTER that hand-rolls a raw bezier/`ease` instead of a `--spring-*`/`--ease-*`
// token or a documented delegation. The blind spot is now SEEN — the gate can
// classify an `animation:` enter the same way it classifies a `transition:` leg.
// At HEAD there are ZERO such surfaces (every `animation:` enter is a tw-animate
// delegation, a continuous loop, or a scroll-driven position-map) — the closure is
// a witness that the off-doctrine enter is now catchable, not a re-author.
//
// The tw-animate utility enter/exit names (the reka/vaul data-state delegation).
const TW_ANIMATE_DELEGATED = ["enter", "exit"];
// A RAW timing keyword (NOT a curve token) on an animation shorthand. The
// `cubic-bezier(...)` arm has NO trailing `\b` (its `)` close is not a word char,
// so a `\b` after `)` never matches); the keyword arms keep the leading + trailing
// boundary so `ease` does not match inside a longer word.
const RAW_TIMING_RE = /(?:\b(ease-in-out|ease-in|ease-out|ease)\b)|(cubic-bezier\s*\([^)]*\))/;
export function detectAnimationEnterRegister(file, src) {
    const violations = [];
    const stripped = stripCssComments(src);
    const declRe = /\banimation\s*:\s*([^;}]+)[;}]/gi;
    let m;
    while ((m = declRe.exec(stripped)) !== null) {
        const value = m[1];
        const declStart = m.index;
        // Blank the WHOLE `var(...)` (token name AND fallback) for the raw-timing
        // check — a composed token is never a hand-roll, and the token NAME can
        // itself contain `ease`/`linear` substrings (`--motion-ease-standard`) that
        // a `\bease\b` match would false-fire on. The doctrine-true / delegation
        // checks still read the ORIGINAL `value` (they need the var token text).
        const valueNoVars = blankAllVars(value);
        // CONTINUOUS loop — never an enter (the decorative/load register).
        if (/\binfinite\b/.test(value)) continue;
        // SCROLL-DRIVEN — `linear` is required on a position-mapped timeline.
        // Detected by a same-rule `animation-timeline`/`scroll()`/`view()` or the
        // scroll-range `auto` duration keyword (the scroll-driven `animation:
        // <name> auto linear` form), or the rule living in scroll-driven.css.
        if (
            file.endsWith("scroll-driven.css") ||
            /\bauto\b/.test(value) ||
            /scroll\s*\(|view\s*\(|animation-timeline/.test(stripped.slice(Math.max(0, declStart - 200), declStart + value.length + 200))
        ) {
            continue;
        }
        // The animation-name is the first token that is not a duration/timing
        // keyword / iteration / fill / direction / a var()/cubic-bezier().
        const names = value
            .split(/\s+/)
            .filter(
                (t) =>
                    t &&
                    !/^\d/.test(t) &&
                    !/^(ease|ease-in|ease-out|ease-in-out|linear|infinite|alternate|alternate-reverse|forwards|backwards|both|none|reverse|paused|running|normal)$/.test(t) &&
                    !t.startsWith("var(") &&
                    !t.startsWith("cubic-bezier"),
            );
        const animName = names[0] ?? "";
        // EXEMPT: tw-animate delegated enters, non-physical sweeps, `var(--…)` token.
        if (
            TW_ANIMATE_DELEGATED.includes(animName) ||
            NON_PHYSICAL_ALLOW.includes(animName) ||
            animName === "none"
        ) {
            continue;
        }
        // A `var(--ease-*)`/`var(--spring-*)` curve token on the shorthand is the
        // doctrine-true register — not flagged.
        if (/var\(\s*--(?:ease|spring)-/.test(value)) continue;
        // A `linear` keyword alone (no bezier/ease) on a non-scroll, non-infinite
        // animation is ambiguous; the doctrine's concern is the bezier/`ease`
        // hand-roll on an ENTER — flag a RAW bezier/`ease`, not a bare `linear`
        // (a `linear` here is almost always a one-shot position-map fragment caught
        // by the scroll-driven exemption above; if it slips through, it is a linear
        // ramp, not the off-register bezier the doctrine indicts). Match on the
        // var-blanked value so a token NAME's `ease`/`linear` substring is not a
        // false witness.
        const rt = RAW_TIMING_RE.exec(valueNoVars);
        if (rt) {
            const raw = (rt[1] ?? rt[2] ?? "").trim();
            violations.push(
                `${file}:${lineOf(stripped, declStart)}: animation '${animName || "?"}' names a RAW timing '${raw}' on a one-shot mount enter — ride the §6 spring register (var(--spring-*)) or be a documented delegation (tw-animate animate-in / a charted token). The animation:-shorthand blind spot is now SEEN (ANIMATION-ENTER-REGISTER, §P4)`,
            );
        }
    }
    return violations;
}

// ── BI.W-REGISTER-TABLE: the universal literal-ban EXEMPTIONS + the register roster ──
//
// (a) The DURATION-BAND arm is WIDENED from the anchor set to ALL src/styles/**/*.css +
// all src/**/*.vue `<style>` blocks. The TOKEN HOMES are exempt (they DEFINE the clocks,
// literals there are the source). The LEGACY-ORPHAN exemptions carry forward the
// AY.W-ANIM1 gate-header routing decision (these two decorative surfaces' duration
// orphans were ALREADY out of fence as anchor-scoped MATRIX-DEFECT rows routed to their
// owning component waves) into the widened net — the widen is strictly STRONGER than HEAD
// (it catches every OTHER src/styles + SFC orphan; only these two named, documented legacy
// sites stay routed). Each is a duration with NO existing `--duration-*` token home
// (1.6s eclipse / 0.6s border-radius) and is OUT of B7 register-table scope.
const DURATION_BAND_TOKEN_HOMES = new Set([
    "src/styles/tokens/scheme-motion.css",
    "src/styles/tokens/scheme-spring.css",
    "src/styles/tokens/motion-registers.css",
]);
const DURATION_BAND_EXEMPT = {
    "src/components/custom/controls/DarkModeToggle.vue":
        "the opt-in ~1.6s slow-ECLIPSE register (a routed MATRIX defect, AY.W-ANIM1 header) — 1.6s has no --duration-* token home; owed to the DarkModeToggle-owning wave, out of B7 register-table scope",
    "src/components/custom/watercolor-dot/WatercolorDot.vue":
        "the 0.6s border-radius MORPH leg (a routed MATRIX defect, AY.W-ANIM1 header) — 0.6s maps to no --duration-* token (slow=0.45s / panel=0.55s); owed to the WatercolorDot-owning wave, out of B7 register-table scope",
};

// (b) TEMPLATE-DURATION — a `.vue` `<template>` hand-rolled Tailwind timing utility
// (`duration-[Nms]` / `duration-N` / `ease-[…]` / `delay-[Nms]` / `delay-N`) — compose a
// register (the `.glass-reveal` `data-reveal` axis / a `--duration-*` token), not an
// inline class. The one legacy hit (`DialogScrollContent`'s clobbering `duration-200`)
// was routed here and is now LANDED: W-ENTER-EXIT-LANDING bound the scroll dialog onto the
// `enter-overlay` register (`.glass-reveal[data-reveal="overlay"]`) and RETIRED the local
// clock, so the exemption is discharged — the arm carries no standing exemption.
const TEMPLATE_DURATION_EXEMPT = {};
const TEMPLATE_DURATION_RE =
    /\b(?:duration|delay)-(?:\[[^\]]+\]|\d+)|\bease-\[[^\]]+\]/g;

// (c) REGISTER-BINDING — the positive arm MINTED in W-REGISTER-TABLE; the AUTHORITATIVE
// assignment-table ROSTER is written here in W-ENTER-EXIT-LANDING. Each enrolled overlay
// content SFC is mapped to its assigned register: it MUST compose `.glass-reveal` (the ONE
// recipe), MUST carry its `data-reveal="<register>"` binding, and MUST carry NO raw
// `data-[state=open]:animate-in` entrance — a clean-break onto the ONE register recipe.
//
// The roster is the .glass-reveal-composing surfaces ONLY. Three enter-transient/overlay
// surfaces are DELIBERATELY OFF this roster (they are NOT .glass-reveal surfaces):
//   · Notification — rides `enter-transient` via a Vue-<Transition> recipe reading the
//     register TOKENS directly (a <TransitionGroup> list is not a reka data-state surface).
//   · command/* — the palette is a Dialog (CommandDialog composes DialogContent), so it
//     INHERITS DialogContent's `enter-overlay` binding; no command SFC composes glass-reveal.
//   · SheetContent — rides the `sheet-animate` slide dialect (its own reka-awaitable keyframe);
//     converging it onto the overlay bloom is a Sheet-owning concern (it retires sheet-animate,
//     entangled with the concurrent squircle/radius geometry) — not this wave's file set.
const REGISTER_BINDING_ROSTER = {
    // transient — the ephemeral center-seed bloom.
    "src/components/ui/toast/Toast.vue": "transient",
    // overlay — the focal modal surfaces (the .glass-reveal DEFAULT).
    "src/components/ui/dialog/DialogContent.vue": "overlay",
    "src/components/ui/dialog/DialogScrollContent.vue": "overlay",
    // menu — the dropdown-shaped pickers/menus (UF-G2: the popover enters like the dropdown).
    "src/components/ui/select/SelectContent.vue": "menu",
    "src/components/ui/combobox/ComboboxList.vue": "menu",
    "src/components/ui/popover/PopoverContent.vue": "menu",
    "src/components/ui/dropdown-menu/DropdownMenuContent.vue": "menu",
    "src/components/ui/dropdown-menu/DropdownMenuSubContent.vue": "menu",
    // BI.W-MENU-TRIGGER — context-menu folded onto dropdown-menu (`trigger="context"`);
    // the reka ContextMenu Content/SubContent substrate is reached via the survivor's
    // dropdown Content/SubContent above (which carry the "menu" reveal register).
    // tooltip — the hover-anchored quick surfaces (fastest arrival, no overshoot).
    "src/components/ui/tooltip/TooltipContent.vue": "tooltip",
    "src/components/ui/hover-card/HoverCardContent.vue": "tooltip",
};

// Blank HTML comments `<!-- … -->` to spaces (offset-preserving) — a `<template>`
// carries HTML comments that could otherwise host a witness-shaped class token.
function stripHtmlComments(src) {
    return src.replace(/<!--[\s\S]*?-->/g, (mm) => mm.replace(/[^\n]/g, " "));
}

// Reduce a `.vue` to its `<template>` region (offset-preserving), blanking the rest to
// spaces/newlines so the line offsets stay true (the template-scan witness reads the
// original SFC line). A non-`.vue` source passes through unchanged.
function vueTemplateOnly(src) {
    const m = src.match(/<template[^>]*>([\s\S]*?)<\/template>/i);
    if (!m) return src.replace(/[^\n]/g, " ");
    const start = m.index + m[0].indexOf(">") + 1;
    const content = m[1];
    let out = src.slice(0, start).replace(/[^\n]/g, " ");
    out += content;
    out += src.slice(start + content.length).replace(/[^\n]/g, " ");
    return out;
}

// The template CSS the (c)/(b) template scanners read: a `.vue` reduced to its
// `<template>` region; a `.css` is not a template (returns blank).
function templateOf(file, src) {
    return file.endsWith(".vue") ? vueTemplateOnly(src) : src.replace(/[^\n]/g, " ");
}

// (b) TEMPLATE-DURATION — scan a `.vue` `<template>` (HTML + block + line comments
// stripped, so a `cn()`-binding JS comment's `duration-…` prose is never a witness) for
// a hand-rolled Tailwind timing utility. PURE — file is for the witness only.
export function detectTemplateDuration(file, templateSrc) {
    const violations = [];
    const stripped = stripAllComments(stripHtmlComments(templateSrc));
    let m;
    TEMPLATE_DURATION_RE.lastIndex = 0;
    while ((m = TEMPLATE_DURATION_RE.exec(stripped)) !== null) {
        violations.push(
            `${file}:${lineOf(stripped, m.index)}: a hand-rolled Tailwind timing utility '${m[0]}' in a <template> — compose a register (the .glass-reveal data-reveal axis / a --duration-* token), not an inline duration/ease/delay class (TEMPLATE-DURATION)`,
        );
    }
    return violations;
}

// (c) REGISTER-BINDING — an enrolled overlay content SFC must compose `.glass-reveal`
// (the ONE register recipe), carry its ASSIGNED `data-reveal="<register>"` binding, AND
// carry NO raw `data-[state=open]:animate-in` entrance. PURE — reads the FULL comment-
// stripped SFC source (not just the `<template>`): a surface may declare `.glass-reveal`
// in a `<script>` const it threads into the class (the DialogContent `defaultMotionClasses`
// shape), so scanning the whole comment-stripped source sees the class wherever it lives.
// A `//`/`/* */`/`<!-- -->` comment naming animate-in in a retirement note is never a
// witness (stripAllComments + stripHtmlComments run first).
export function detectRegisterBinding(file, src, register) {
    const violations = [];
    const stripped = stripAllComments(stripHtmlComments(src));
    if (!/\bglass-reveal\b/.test(stripped)) {
        violations.push(
            `${file}: an enrolled overlay content SFC does NOT compose '.glass-reveal' — bind the register (add glass-reveal + its data-reveal) instead of a raw entrance (REGISTER-BINDING)`,
        );
    }
    if (/data-\[state=open\]:animate-in/.test(stripped)) {
        violations.push(
            `${file}: an enrolled overlay carries a RAW entrance (data-[state=open]:animate-in) instead of the .glass-reveal register — clean-break onto the register (REGISTER-BINDING)`,
        );
    }
    // The ASSIGNED register — each roster surface carries `data-reveal="<register>"` (the
    // assignment-table binding). A surface bound to the WRONG register, or missing its
    // binding entirely, REDs (the per-register teeth the flat presence-check lacked).
    if (!new RegExp(`data-reveal=["']${register}["']`).test(stripped)) {
        violations.push(
            `${file}: the enrolled overlay is missing its assigned register binding data-reveal="${register}" — the assignment-table roster requires each surface to carry '.glass-reveal' + its data-reveal (REGISTER-BINDING)`,
        );
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

// ── BI.W-COMMAND-JITTER — the menu-row jitter clause (R5a + R5b, paired) ──────
// The command-palette jitter (UF-G8) has TWO paired source defects in menu.css; the
// clause proves BOTH, and — load-bearing — proves they cannot split (R5a alone
// LENGTHENS the lift 0.2 s → 0.35 s and worsens the per-keystroke restart, so a
// clock-only fix that leaves the keyboard-highlight lift live is a REGRESSION):
//
//   · R5b — the lift is POINTER-ONLY. A `translate:` LIFT (the `--menu-row-lift`
//     travel) must ride a `:hover`-scoped rule and MUST NOT sit on the bare
//     `[data-highlighted]` (which reka sets for KEYBOARD highlight too, so an
//     arrow/keystroke restarts the lift transition → the jitter) nor on `:focus`
//     (keyboard-reachable, same restart). The keyboard-highlight/focus rows keep
//     the bg tint + color; only `:hover` lifts.
//   · R5a — the clock. The menu-row TRANSLATE `transition:` must ride a
//     `--spring-*-duration` settle clock, NOT the generic `--duration-*` wall
//     clock (the re-timed dead-tail — the P4 per-spring-duration violation).
//
// PURE — reads menu.css. Uses the leaf-rule idiom (`[^{}]+{[^{}]*}` skips the
// `@layer components {` wrapper, matching only the leaf rules whose bodies carry no
// nested braces) so the `@layer` nesting never confuses the selector attribution.
const MENU_CSS = "src/styles/menu.css";
export function detectMenuJitter(file, src) {
    const violations = [];
    const stripped = stripCssComments(src);
    const leafRe = /([^{}]+)\{([^{}]*)\}/g;
    let sawLift = false;
    let sawTranslateTransition = false;
    let m;
    while ((m = leafRe.exec(stripped)) !== null) {
        const selector = m[1].trim();
        const body = m[2];
        const declStart = m.index;
        // ── R5b — a LIFT declaration (a `translate:` referencing --menu-row-lift). ──
        // (The base rest `translate: 0 0` is the identity — no --menu-row-lift, skipped.)
        if (/translate\s*:[^;]*--menu-row-lift/.test(body)) {
            sawLift = true;
            if (/\[data-highlighted\]/.test(selector)) {
                violations.push(
                    `${file}:${lineOf(stripped, declStart)}: the menu-row LIFT (translate: --menu-row-lift) sits on a '[data-highlighted]' selector — reka sets that for KEYBOARD highlight too, so every arrow/keystroke restarts the lift transition (the command-palette jitter, UF-G8). Scope the lift to ':hover' only (MENU-JITTER R5b)`,
                );
            }
            if (/:focus\b/.test(selector)) {
                violations.push(
                    `${file}:${lineOf(stripped, declStart)}: the menu-row LIFT sits on a ':focus' selector — a keyboard-focus restart, same jitter class. Scope the lift to ':hover' only (MENU-JITTER R5b)`,
                );
            }
            if (!/:hover\b/.test(selector)) {
                violations.push(
                    `${file}:${lineOf(stripped, declStart)}: the menu-row LIFT is not ':hover'-scoped — the pointer lift must ride a ':hover' rule the keyboard highlight never fires (MENU-JITTER R5b)`,
                );
            }
        }
        // ── R5a — the menu-row TRANSLATE transition clock. ──
        // A `transition:` whose value animates `translate` — its duration slot must be a
        // `--spring-*-duration` settle clock, never the generic `--duration-*` wall clock.
        const tm = body.match(/(?<!-)\btransition\s*:\s*([^;}]*translate[^;}]*)[;}]?/i);
        if (tm) {
            sawTranslateTransition = true;
            const value = tm[1];
            const declLine = lineOf(stripped, declStart + (tm.index ?? 0));
            if (/var\(\s*--duration-/.test(value)) {
                violations.push(
                    `${file}:${declLine}: the menu-row translate transition rides the generic '--duration-*' wall clock — pair the '--spring-*' curve with its OWN '--spring-*-duration' settle clock (the P4 per-spring-duration doctrine; MENU-JITTER R5a)`,
                );
            }
            if (!/var\(\s*--spring-[a-z-]+-duration\b/.test(value)) {
                violations.push(
                    `${file}:${declLine}: the menu-row translate transition clock is not a '--spring-*-duration' settle token — the re-timed dead-tail clock is the R5a defect (MENU-JITTER R5a)`,
                );
            }
        }
    }
    // Presence floor — the anti-evasion bite: if the lift or the translate transition
    // vanished entirely (a silent delete that would green the clauses vacuously), RED.
    if (!sawLift) {
        violations.push(
            `${file}: no menu-row LIFT (translate: --menu-row-lift) found — the register the MENU-JITTER clause governs is absent; a vacuous green is forbidden (MENU-JITTER)`,
        );
    }
    if (!sawTranslateTransition) {
        violations.push(
            `${file}: no menu-row translate 'transition:' found — the clock the MENU-JITTER R5a clause governs is absent; a vacuous green is forbidden (MENU-JITTER)`,
        );
    }
    return violations;
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
    // §2 EASING block DEFINITIONS in tokens.css. BA.W-GLASS-CAL Unit 3 — the
    // `--spring-<name>-duration` clock twins are EXCLUDED here (the `(?!-duration)`
    // negative-lookahead segment guard): they are DURATION tokens, not easing
    // presets, generated for vocabulary completeness from the SAME table — their
    // coverage is governed below, not by the easing-preset consumer bar (a `gentle`/
    // `dock` clock with no CSS consumer is a complete generated vocabulary, not a
    // dead easing mint).
    const names = [
        ...new Set(
            [...tokensSrc.matchAll(/--spring-([a-z]+)\s*:/g)].map((m) => m[1]),
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
    const springRes = detectSpringSource(readMonolith(ROOT, "tokens"));
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
    // AY.W-ANIM1 — the three GATE-EXTENDED arms (P4/P5/P4-blind-spot).
    const easingTableForks = [];
    const durationBandForks = [];
    const enterRegisterForks = [];
    const curveTokens = loadMotionCurveTokens((f) => read(f));
    const namedSet = new Set([...SURFACE_CSS, ...SURFACE_SFC]);
    // The named SURFACE_CSS + SURFACE_SFC are the canonical-press anchors — they
    // get the FULL trio (easing + press-cohort + register). The PRESS-FROM-COHORT
    // assertion is authored against the canonical press surfaces (the gate
    // header), so a decorative SFC's subtle `:active` scale in the catch-all does
    // not draw the cohort rule — the catch-all gets easing + register only (the
    // off-doctrine-spring + hand-rolled-curve sweep the spec names for the wide set).
    // AY.W-ANIM1 arm scoping:
    //   · EASING-TABLE-BOUND is a pure token-EXISTENCE check (a `--ease-*`/
    //     `--spring-*` read with no MOTION_CURVES row) — drift-proof and cheap, so
    //     it rides BOTH the anchor and the wide catch-all (a NEW SFC naming a
    //     fictional curve token is never gate-invisible).
    //   · DURATION-BAND + ANIMATION-ENTER-REGISTER ride the ANCHOR surfaces only —
    //     mirroring the PRESS-FROM-COHORT anchor-scoping (the gate header): the band
    //     authoritatively stands over the canonical animated surfaces. The
    //     decorative catch-all SFCs' literal-duration orphans (DarkModeToggle's
    //     eclipse arc, WatercolorDot's border-radius leg, the timeline region
    //     transitions) are ROUTED as MATRIX DEFECT rows to their owning component
    //     waves (ANIM-MATRIX §2 F/G) — the audit ships the routed list, the FIXES
    //     ship in their owning waves (§4 no-ad-hoc-edit fence). Pulling them into a
    //     hard gate-at-HEAD would force an ad-hoc cross-lane edit inside the audit.
    const scanTableBound = (file, css) => {
        easingTableForks.push(...detectEasingTableBound(file, css, curveTokens));
    };
    // BI.W-REGISTER-TABLE — DURATION-BAND is no longer anchor-scoped (it is the WIDE
    // pass below, over ALL src/styles css + all SFC style blocks). ANIMATION-ENTER-
    // REGISTER stays anchor-scoped (the spec (a) widens ONLY the literal-ban).
    const scanAnimAnchor = (file, css) => {
        enterRegisterForks.push(...detectAnimationEnterRegister(file, css));
    };
    const scanAnchor = (file, css) => {
        easingForks.push(...detectEasingForks(file, css));
        pressForks.push(...detectPressForks(file, css));
        registerForks.push(...detectRegisterAssignment(file, css));
        scanTableBound(file, css);
        scanAnimAnchor(file, css);
    };
    const scanWide = (file, css) => {
        easingForks.push(...detectEasingForks(file, css));
        registerForks.push(...detectRegisterAssignment(file, css));
        scanTableBound(file, css);
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

    // ── BI.W-REGISTER-TABLE (a) — the WIDE DURATION-BAND pass (universal literal-ban) ──
    // ALL src/styles/**/*.css + all src/**/*.vue `<style>` blocks (exempting the token
    // homes + the two routed legacy-orphan SFCs). No `animation:`-period is scanned (the
    // detector reads `transition:` only — the continuous-loop exemption is by construction).
    const templateDurationForks = [];
    const registerBindingForks = [];
    const allVue = srcFiles.filter((f) => f.endsWith(".vue"));
    const stylesCss = srcFiles.filter(
        (f) => f.startsWith("src/styles/") && f.endsWith(".css"),
    );
    for (const file of stylesCss) {
        if (DURATION_BAND_TOKEN_HOMES.has(file) || file in DURATION_BAND_EXEMPT) continue;
        durationBandForks.push(...detectDurationBand(file, read(file)));
    }
    for (const file of allVue) {
        if (file in DURATION_BAND_EXEMPT) continue;
        const src = read(file, true);
        if (src === null) continue;
        durationBandForks.push(...detectDurationBand(file, cssOf(file, src)));
    }

    // ── BI.W-REGISTER-TABLE (b) — TEMPLATE-DURATION (all `.vue` <template> blocks) ──
    for (const file of allVue) {
        if (file in TEMPLATE_DURATION_EXEMPT) continue;
        const src = read(file, true);
        if (src === null) continue;
        templateDurationForks.push(...detectTemplateDuration(file, templateOf(file, src)));
    }

    // ── BI.W-REGISTER-TABLE (c) — REGISTER-BINDING (roster completed in ENTER-EXIT-LANDING) ──
    for (const [file, register] of Object.entries(REGISTER_BINDING_ROSTER)) {
        const src = read(file, true);
        if (src === null) continue;
        registerBindingForks.push(...detectRegisterBinding(file, src, register));
    }

    // ── BI.W-COMMAND-JITTER — the menu-row jitter clause (R5a + R5b, paired) ──
    const menuJitterForks = detectMenuJitter(MENU_CSS, read(MENU_CSS));

    // REGISTER-ASSIGNMENT on the press-spring composite token DEFINITIONS (D1).
    registerForks.push(...detectPressSpringRegister(TOKENS_CSS, readMonolith(ROOT, "tokens")));
    facts.easingForks = easingForks.length;
    facts.pressForks = pressForks.length;
    facts.registerForks = registerForks.length;
    // AY.W-ANIM1 — the three GATE-EXTENDED arm tallies.
    facts.curveTokenCount = curveTokens.size;
    facts.easingTableForks = easingTableForks.length;
    facts.durationBandForks = durationBandForks.length;
    facts.enterRegisterForks = enterRegisterForks.length;
    // BI.W-REGISTER-TABLE — the (b)/(c) arm tallies.
    facts.templateDurationForks = templateDurationForks.length;
    facts.registerBindingForks = registerBindingForks.length;
    facts.menuJitterForks = menuJitterForks.length;
    facts.durationBandWideScanned = stylesCss.length + allVue.length;
    violations.push(
        ...easingForks,
        ...pressForks,
        ...registerForks,
        ...easingTableForks,
        ...durationBandForks,
        ...enterRegisterForks,
        ...templateDurationForks,
        ...registerBindingForks,
        ...menuJitterForks,
    );

    // APPLE-SPRING-SURVIVOR
    const survivors = detectAppleSpringSurvivors(srcFiles, (f) => read(f));
    facts.appleSpringSurvivors = survivors;
    for (const s of survivors) {
        violations.push(
            `legacy apple-spring survivor — ${s}: a second iOS-spring authority beside the governed --spring-* cohort. Excise it; re-point onto a --spring-* register.`,
        );
    }

    // SPRING-CONSUMER-COVERAGE
    const cov = detectSpringCoverage(readMonolith(ROOT, "tokens"), srcFiles, (f) => read(f));
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

// ── BI.W-REGISTER-TABLE — the per-arm planted-violation self-tests ─────────────
// Each of the three arms (a/b/c) proves its own bite every run: a planted violation
// MUST flag, and the honest/composed/bound form MUST NOT (the teeth-are-real + no-over-
// reach discipline). A future edit that de-fangs an arm re-reds the self-test.
function registerTableSelfTest() {
    const failures = [];
    // (a) DURATION-BAND — a bare DURATION-slot literal flags; a DELAY-slot literal +
    // a composed clock + a var() fallback do NOT.
    if (detectDurationBand("x.css", ".a { transition: width 340ms ease; }").length === 0)
        failures.push("self-test (a): a bare duration-slot literal '340ms' did NOT flag — the literal-ban teeth are gone");
    if (detectDurationBand("x.css", ".a { transition: opacity var(--duration-fast) var(--ease-out) 60ms; }").length !== 0)
        failures.push("self-test (a): a DELAY-slot literal '60ms' false-flagged (a stagger/overlap delay is not a duration)");
    if (detectDurationBand("x.css", ".a { transition: scale var(--reveal-clock) var(--reveal-spring); }").length !== 0)
        failures.push("self-test (a): a fully register-composed transition false-flagged");
    if (detectDurationBand("x.css", ".a { transition: width var(--duration-fast, 150ms) ease; }").length !== 0)
        failures.push("self-test (a): a var() fallback literal '150ms' false-flagged");
    // (b) TEMPLATE-DURATION — arbitrary + preset duration / arbitrary ease / preset
    // delay all flag; a clean template does NOT; a `//`-comment mention is not a witness.
    if (detectTemplateDuration("x.vue", '<div class="foo duration-[347ms] bar">').length === 0)
        failures.push("self-test (b): arbitrary 'duration-[347ms]' did NOT flag");
    if (detectTemplateDuration("x.vue", '<div class="foo duration-200 bar">').length === 0)
        failures.push("self-test (b): preset 'duration-200' did NOT flag");
    if (detectTemplateDuration("x.vue", '<div class="foo ease-[cubic-bezier(.1,.2,.3,.4)] bar">').length === 0)
        failures.push("self-test (b): arbitrary 'ease-[…]' did NOT flag");
    if (detectTemplateDuration("x.vue", '<div class="glass-reveal group flex" data-reveal="menu">').length !== 0)
        failures.push("self-test (b): a clean register-bound template false-flagged");
    if (detectTemplateDuration("x.vue", '<div :class="cn(/* the prior duration-200 recipe */ \'glass-reveal\')">').length !== 0)
        failures.push("self-test (b): a comment-only 'duration-200' mention false-flagged (comments are not witnesses)");
    // (c) REGISTER-BINDING — a raw-entrance overlay (no glass-reveal) reds; a register-
    // bound overlay carrying its ASSIGNED data-reveal passes; a WRONG or MISSING binding
    // reds (the per-register teeth); glass-reveal in a <script> const is still seen; a
    // `//`/block-comment naming animate-in is not a witness.
    if (detectRegisterBinding("x.vue", '<div :class="cn(\'group data-[state=open]:animate-in\')">', "overlay").length === 0)
        failures.push("self-test (c): a raw-entrance overlay (no glass-reveal, has animate-in) did NOT flag");
    if (detectRegisterBinding("x.vue", '<div :class="cn(\'glass-reveal group\')" data-reveal="transient">', "transient").length !== 0)
        failures.push("self-test (c): a register-bound overlay carrying its assigned data-reveal false-flagged");
    if (detectRegisterBinding("x.vue", '<div :class="cn(/* retired the data-[state=open]:animate-in chain */ \'glass-reveal\')" data-reveal="menu">', "menu").length !== 0)
        failures.push("self-test (c): a `//`/block-comment mention of animate-in false-flagged (comments are not witnesses)");
    if (detectRegisterBinding("x.vue", '<div class="glass-reveal" data-reveal="menu">', "tooltip").length === 0)
        failures.push("self-test (c): a surface bound to the WRONG register (menu vs assigned tooltip) did NOT flag");
    if (detectRegisterBinding("x.vue", '<div class="glass-reveal">', "menu").length === 0)
        failures.push("self-test (c): a glass-reveal surface MISSING its data-reveal binding did NOT flag");
    if (detectRegisterBinding("x.vue", "<script>const c = 'glass-reveal'</script><template><div data-reveal=\"overlay\"></div></template>", "overlay").length !== 0)
        failures.push("self-test (c): glass-reveal declared in a <script> const (DialogContent shape) false-flagged");
    // ── BI.W-COMMAND-JITTER — the menu-jitter paired-fix bites ────────────────
    // The load-bearing ORDERING bite (the pair cannot silently split): an R5a-ONLY
    // tree (clock swapped to a --spring-*-duration, but the LIFT still on the bare
    // [data-highlighted]) MUST still red — a clock-only fix without R5b LENGTHENS
    // the keyboard-highlight lift and worsens the jitter, so it may never green.
    const jHonest =
        ".glass-menu-row { transition: translate var(--spring-smooth-duration) var(--spring-smooth); translate: 0 0; } .glass-menu-row:hover:not([data-disabled]) { translate: 0 var(--menu-row-lift); }";
    const jHead =
        ".glass-menu-row { transition: translate var(--duration-fast) var(--spring-smooth); } .glass-menu-row[data-highlighted]:not([data-disabled]) { translate: 0 var(--menu-row-lift); }";
    const jR5aOnly =
        ".glass-menu-row { transition: translate var(--spring-smooth-duration) var(--spring-smooth); } .glass-menu-row[data-highlighted]:not([data-disabled]) { translate: 0 var(--menu-row-lift); }";
    const jR5bOnly =
        ".glass-menu-row { transition: translate var(--duration-fast) var(--spring-smooth); } .glass-menu-row:hover:not([data-disabled]) { translate: 0 var(--menu-row-lift); }";
    if (detectMenuJitter("menu.css", jHonest).length !== 0)
        failures.push("self-test (menu-jitter): the honest paired-fix tree (:hover lift + --spring-*-duration clock) false-flagged");
    if (detectMenuJitter("menu.css", jHead).length === 0)
        failures.push("self-test (menu-jitter): the HEAD-shape tree (--duration-fast clock + [data-highlighted] lift) did NOT flag");
    if (detectMenuJitter("menu.css", jR5aOnly).length === 0)
        failures.push("self-test (menu-jitter): the R5a-ONLY tree (clock swapped, lift still on [data-highlighted]) did NOT flag — the pair silently split (the ordering fence is gone)");
    if (detectMenuJitter("menu.css", jR5bOnly).length === 0)
        failures.push("self-test (menu-jitter): the R5b-ONLY tree (lift :hover-scoped, clock still --duration-fast) did NOT flag — the R5a clock clause is toothless");
    // The presence floor — a silent delete of the lift OR the translate transition reds
    // (a vacuous green is forbidden).
    if (detectMenuJitter("menu.css", ".glass-menu-row { color: red; }").length === 0)
        failures.push("self-test (menu-jitter): a tree with NO lift + NO translate transition did NOT flag the presence floor (vacuous-green guard is gone)");
    return failures;
}

function run() {
    const selfTestFailures = registerTableSelfTest();
    if (selfTestFailures.length) {
        for (const f of selfTestFailures) console.error(`proof:animation-coherence — ${f}`);
        console.error(
            "proof:animation-coherence — SELF-TEST FAILED: a BI.W-REGISTER-TABLE / W-COMMAND-JITTER arm's teeth are gone (duration-band / template-duration / register-binding / menu-jitter); do not trust a GREEN.",
        );
        process.exit(1);
    }
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
    console.log("proof:animation-coherence — the one-motion-source gate (AW.W31.a + AX.W05 + AY.W-MOTION + AY.W-ANIM1)");
    console.log(`  --spring-* definitions     : ${facts.springDefCount}`);
    console.log(`  animated surfaces scanned  : ${facts.surfaceFilesScanned}`);
    console.log(`  hand-rolled easing forks   : ${facts.easingForks}`);
    console.log(`  literal press-scale forks  : ${facts.pressForks}`);
    console.log(`  register-assignment forks  : ${facts.registerForks}`);
    console.log(`  MOTION_CURVES tokens       : ${facts.curveTokenCount}`);
    console.log(`  easing-table-bound forks   : ${facts.easingTableForks}`);
    console.log(`  duration-band forks (WIDE) : ${facts.durationBandForks} (over ${facts.durationBandWideScanned} css+vue)`);
    console.log(`  template-duration forks    : ${facts.templateDurationForks}`);
    console.log(`  register-binding forks     : ${facts.registerBindingForks}`);
    console.log(`  menu-jitter forks          : ${facts.menuJitterForks}`);
    console.log(`  enter-register forks       : ${facts.enterRegisterForks}`);
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
