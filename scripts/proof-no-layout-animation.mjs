// proof:no-layout-animation — BB.W-CARD-COMPOSITE (mint) + BB.W-MOTION-CANON
// (extend): the compositor-only architectural lock, library-wide (the A'-3
// layout-animation CLS class made structurally impossible to re-ship — across the
// FULL `@keyframes` + `transition` + Vue `<Transition>` surface, the motion-canon
// P5 floor).
//
// THE RULE (motion-canon P5): a CSS @keyframes step — AND a `transition`/
// `transition-property` declaration, AND a Vue `<Transition>` recipe class
// (`*-enter-active`/`*-leave-active`/`*-enter-from`/`*-leave-to`) — may animate ONLY
// compositor-safe channels: `transform`/`translate`/`scale`/`rotate`/`perspective`,
// `opacity`, `filter`/`backdrop-filter`, `clip-path`, paint props (`color`/
// `background*`/`box-shadow`/`border-color`/`fill`/`stroke`/`outline-color`), and
// `--*` custom properties (which resolve onto the above; the W-FADING-SCROLL
// `--fade-start` length-custom-drives-a-mask precedent). It may NEVER animate a
// layout-TRIGGERING property — `padding*`, `margin*`, `font-size`, `width`/`height`/
// `inline-size`/`block-size` (+ `min-`/`max-` axes), `top`/`left`/`right`/`bottom`/
// `inset*`, `grid-template-*`/`grid-auto-*`, `flex-basis`, `line-height`,
// `border-*-width`, `gap`/`row-gap`/`column-gap` — because the browser must
// re-layout on EVERY frame (the per-frame reflow storm → CLS). The reflow-vs-paint-
// vs-composite partition is the SHARED reflow set below; the keyframe arm and the
// transition arm consume the same table (one source of truth).
//
// THE DEFECT IT LOCKS: `CardHeader.vue` (the A'-3 worst-cluster, CLS 1.03 at
// 4.0.0) migrated value.js's `PaneHeader.vue` choreography VERBATIM, animating
// `padding`/`font-size`/`grid-template-rows`/`margin` on the `--card-scroll`
// scroll-timeline — a per-frame relayout storm. W-CARD-COMPOSITE re-expressed each
// lane as a compositor transform; this gate makes the lineage error impossible to
// re-ship. W-MOTION-CANON widens the surface: the keyframe-only scan missed a
// `transition: width`/`padding`/`grid-template-rows` declaration or a `<Transition>`
// class animating a layout property (e.g. the dock morph's `inline-size` lerp before
// W-DOCK-MORPH-FAMILY's compositor repair). The transition + `<Transition>` arms
// close that hole.
//
// THE NARROW ALLOWLIST (a register-design reveal, not a license to keep a reflow
// storm): a GENUINE layout RECLAIM — a discrete open/close toggle where the body
// content below MUST reflow up into freed space (the reka-ui collapsible/accordion
// content-height reveal) — cannot be faked by a transform without leaving a visual
// gap. Such an animation is a DIFFERENT primitive than a compositor-safe shrink: a
// one-shot discrete user-initiated transition (not a continuous scroll-timeline)
// whose CLS is bounded + intentional. Each allowlisted entry is NAMED here with its
// reflow property + the load-bearing rationale (and, for a transition entry, the
// owning surface + any booked successor); a NEW layout-animation off the list reds
// (the anti-gameability floor — the allowlist is an explicit, audited, CLS-bounded
// exception, never a silent escape). A blanket `transition` exemption is forbidden.
//
// THE UNIVERSAL PRM CARVE (motion-canon P6): every transform-animating recipe keeps
// the opacity/color fade and DROPS the spatial transform under
// `prefers-reduced-motion: reduce` (WCAG 2.3.3 — opacity/color fades are not
// vestibular triggers, scale/translate/spin are). The discipline is single-sourced
// at the library seam: the universal `a11y-overrides.css` carve restricts
// `transition-property` to the non-spatial set library-wide, and the
// `transitions.css` recipe-local block keeps-fade/drops-transform for the Vue
// `<Transition>` classes. The gate's PRM assertion proves BOTH exist (the discipline
// cannot silently regress) — scope-bound to the library seam, not a per-recipe block
// (the global reset IS the carve for the interactive hover/press cohort).
//
// Device-free SOURCE arm (tagged `["ci"]`) — the architectural lock runs on every
// headless runner. The binding CLS measure (1.03 → ≤ 0.1 on the live scroll-shrink
// demo) is the π/DELTA arm (W-CARD-COMPOSITE-DELTA + tests-visual/card-composite),
// never this gate alone.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:no-layout-animation";

// ── The reflow set (layout-triggering — FORBIDDEN in a keyframe step). The
//    matcher is exact-or-prefix on the property NAME (longhand + shorthand). ──
const REFLOW_PROPS = [
    "padding",
    "margin",
    "font-size",
    "width",
    "min-width",
    "max-width",
    "inline-size",
    "min-inline-size",
    "max-inline-size",
    "height",
    "min-height",
    "max-height",
    "block-size",
    "min-block-size",
    "max-block-size",
    "top",
    "left",
    "right",
    "bottom",
    "inset",
    "grid-template",
    "grid-auto",
    "flex-basis",
    "line-height",
    "border-width",
    "border-top-width",
    "border-right-width",
    "border-bottom-width",
    "border-left-width",
    "border-block-width",
    "border-inline-width",
    "gap",
    "row-gap",
    "column-gap",
];

// A property name is a reflow trigger when it equals a reflow prop OR is a
// longhand under one (`padding-top` under `padding`, `margin-block-start` under
// `margin`, `grid-template-rows` under `grid-template`, `inset-block` under
// `inset`). The compositor-safe + paint props are NOT in this set (so a `color`/
// `background`/`box-shadow`/`transform`/`opacity`/`filter`/`clip-path`/`--*` step
// passes by construction — the partition is reflow-vs-everything-else).
const isReflowProp = (prop) => {
    const p = prop.toLowerCase();
    // `border-color` / `border-top-color` etc. are PAINT, never width — guard so
    // the `border-` prefix does not over-match the color/style longhands.
    if (/^border(-(top|right|bottom|left|block|inline))?-color$/.test(p)) return false;
    if (/^border(-(top|right|bottom|left|block|inline))?-style$/.test(p)) return false;
    return REFLOW_PROPS.some((r) => p === r || p.startsWith(`${r}-`));
};

// ── The narrow, named, CLS-bounded allowlist (the register-design reveal). A
//    genuine layout RECLAIM (a discrete toggle whose body MUST reflow) is a
//    different primitive than a compositor-safe shrink. Each entry is the exact
//    `@keyframes` name + the reflow property it animates + the rationale. ──
const ALLOWLIST = [
    {
        keyframe: "collapsible-open",
        props: ["height"],
        reason:
            "reka-ui Collapsible/Accordion content-height reveal — a DISCRETE one-shot open toggle (not a continuous scroll-timeline) whose body content below genuinely reflows up into the freed space; the height:0 → var(--reka-collapsible-content-height) reveal cannot be a transform without leaving a visual gap. CLS is bounded + intentional (a user-initiated open, not a per-scroll-frame storm).",
    },
    {
        keyframe: "collapsible-close",
        props: ["height"],
        reason:
            "the close twin of collapsible-open — content-height collapse on a discrete user-initiated close. Same layout-reclaim register; same bounded/intentional CLS.",
    },
];
const allowed = (keyframe, prop) =>
    ALLOWLIST.some(
        (a) =>
            a.keyframe === keyframe &&
            a.props.some((ap) => prop.toLowerCase() === ap || prop.toLowerCase().startsWith(`${ap}-`)),
    );

// ── The TRANSITION-arm allowlist (BB.W-MOTION-CANON). A `transition` leg naming a
//    reflow property is allowed ONLY for an audited, named entry: a discrete
//    layout RECLAIM (the reka-ui collapse register — the transition twin of the
//    collapsible-open/close keyframe allowlist) OR a known pre-existing fill-width
//    grow booked to its owning successor wave (the gate RECORDS it as a rationale-
//    bearing exception so a NEW `transition: width` reds; it does not silently
//    smuggle one in). Each entry carries the { file, property, register, reason }.
//    The match is file-scoped (the exact relative path) so the allowance cannot
//    leak to a different surface. A NEW layout `transition` anywhere off this list
//    reds — the anti-gameability floor; a blanket `transition` exemption is
//    forbidden. ──
const TRANSITION_ALLOWLIST = [
    // ── Register: DISCRETE-RECLAIM — a user-initiated open/close/drag where the
    //    body genuinely reflows; the transition twin of the collapsible-open/close
    //    keyframe allowlist. Bounded, intentional CLS (not a per-frame storm). ──
    {
        file: "src/styles/utilities/btn.css",
        props: ["height"],
        register: "discrete-reclaim",
        reason:
            "@utility transition-collapse — the reka-ui Accordion/Collapsible content-height transition (≥2 sites). A DISCRETE user-initiated open/close where the body below genuinely reflows up into freed space; the height:0 ↔ content-height reveal cannot be a transform without a visual gap. The transition twin of the allowlisted collapsible-open/close keyframes; the timing rides the data-state animate-collapsible-*/animate-accordion-* keyframes.",
    },
    {
        file: "src/components/custom/configurator/ConfiguratorLayer.vue",
        props: ["grid-template-rows"],
        register: "discrete-reclaim",
        reason:
            "the ConfiguratorLayer section-reveal — the grid-template-rows: 0fr ↔ 1fr discrete user-initiated open/close (the M.W2 recursion-free CSS-only reveal). Same layout-reclaim register as Collapsible; carries its own prefers-reduced-motion: reduce carve (transition:none).",
    },
    {
        file: "src/components/custom/header-ribbon/HeaderRibbon.vue",
        props: ["max-width", "margin"],
        register: "discrete-reclaim",
        reason:
            "the HeaderRibbon collapse/expand — a discrete state toggle of the banner's max-width + margin (not a continuous per-frame storm). A one-shot collapse the body reflows around; bounded CLS on a user-/route-driven banner state change.",
    },
    {
        file: "src/styles/drawer.css",
        props: ["width"],
        register: "discrete-reclaim",
        reason:
            "the .glass-drawer-grip peek-handle width — the handle widens on the [data-dragging]/:active drag-affordance state (a discrete pointer-held intensification, not a per-frame layout loop). A tiny grip element; bounded CLS.",
    },
    // ── Register: SIZE/MORPH-INDICATOR — a travelling/grow indicator or marker
    //    moved by inline JS width/height/inset writes, the transition smoothing the
    //    discrete write. By the strict P5 these are the SIZE/MORPH spatial channel
    //    and SHOULD be a transform; each is a pre-existing recipe OWNED by its
    //    family and BOOKED to that family's compositor-rewrite successor (the
    //    W-MOTION-CANON gate surfaces it; the repair is the owning wave's, per
    //    §Named-successors). A NEW indicator animating a box dimension off-list reds. ──
    {
        file: "src/styles/segmented-tabs.css",
        props: ["width", "height", "inset"],
        register: "size-morph-indicator-booked",
        reason:
            "the SegmentedTabs active indicator — the JS-measured fallback path moves the indicator by inline width/transform writes (the --js anchor) and the native --anchor path animates inset; the transition smooths those discrete writes on the calibrated --tab-indicator-duration clock. The SegmentedTabs family is ratchet-baselined (W-TABS); the width/height/inset → transform compositor rewrite is BOOKED to a SegmentedTabs-indicator successor. The scale/transform legs are already compositor-safe.",
    },
    {
        file: "src/styles/dock/layer-group.css",
        props: ["width", "height"],
        register: "size-morph-indicator-booked",
        reason:
            "the DockLayerGroup rail-active indicator (the in-pane switcher tab indicator) — the rail-active plate animates width/height/transform as the active tab moves. Dock-family-owned (the dock-rail hairline register, AZ.W-DOCK-RAIL); the width/height → transform rewrite is BOOKED to a dock-indicator successor. The transform leg is already compositor-safe.",
    },
    {
        file: "src/components/custom/pager-dots/PagerDots.vue",
        props: ["width", "height"],
        register: "size-morph-indicator-booked",
        reason:
            "the PagerDots active-dot elongate — the active pip grows its width/height on the --spring-dock clock (the elongate-on-active register, BA.W-PAGER). Pager-family-owned; the width/height → transform (scale) rewrite is BOOKED to a PagerDots successor. The opacity/background legs ride the bezier already.",
    },
    {
        file: "src/components/custom/timeline/ScrubberTimeline.vue",
        props: ["width", "height"],
        register: "size-morph-indicator-booked",
        reason:
            "the ScrubberTimeline playhead/marker — a hover/scrub marker animating width/height alongside opacity. Timeline-family-owned; the width/height → transform rewrite is BOOKED to a timeline-marker successor. The opacity/background legs are compositor-safe.",
    },
    // ── Register: FILL-GROW — a progress/timeline FILL element growing its width
    //    (or left) on value update. A discrete value-update grow (not a continuous
    //    scroll storm); by the strict P5 it SHOULD be a transform: scaleX() over a
    //    reserved track (the W-CARD-COMPOSITE grid-track → scaleY precedent). Each is
    //    OWNED by its family and BOOKED to that family's compositor-rewrite
    //    successor. A NEW fill animating width off-list reds. ──
    {
        file: "src/components/ui/progress/ProgressSectioned.vue",
        props: ["width"],
        register: "fill-grow-booked",
        reason:
            "the sectioned-progress fill-width grow on --spring-snappy (will-change: width). A discrete value-update grow OWNED by the Progress family; the width → transform: scaleX() rewrite is BOOKED to a Progress-family compositor-rewrite successor.",
    },
    {
        file: "src/components/custom/timeline/ContinuousRail.vue",
        props: ["width", "left"],
        register: "fill-grow-booked",
        reason:
            "the continuous-timeline region-fill width/left grow on --ease-out (will-change: width). The timeline twin of the ProgressSectioned fill-grow; left+width come from inline regionLeft/Width writes. Timeline-family-owned; BOOKED to a timeline compositor-rewrite successor.",
    },
    {
        file: "src/components/custom/timeline/SegmentedTimeline.vue",
        props: ["width"],
        register: "fill-grow-booked",
        reason:
            "the segmented-timeline band width grow on --ease-out (will-change: width). Same fill-grow register as ContinuousRail/ProgressSectioned; timeline-family-owned; BOOKED to a timeline compositor-rewrite successor.",
    },
];
const transitionAllowed = (relFile, prop) =>
    TRANSITION_ALLOWLIST.some(
        (a) =>
            a.file === relFile &&
            a.props.some((ap) => prop.toLowerCase() === ap || prop.toLowerCase().startsWith(`${ap}-`)),
    );

// ── Strip CSS / JS-line / HTML-Vue comments (preserve newlines for line nums)
//    so a prose mention of a retired property is never a false hit. ──
const strip = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

// ── The keyframe corpus: every src/styles/*.css sheet + every SFC <style> block
//    under src/components/. Inventory-complete (W3) — a SECOND layout-animation
//    anywhere reds, not only CardHeader. ──
const walk = (dir, exts) => {
    const out = [];
    if (!existsSync(dir)) return out;
    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        const st = statSync(full);
        if (st.isDirectory()) out.push(...walk(full, exts));
        else if (exts.some((e) => entry.endsWith(e))) out.push(full);
    }
    return out;
};

const corpusFiles = [
    ...walk(resolve(ROOT, "src/styles"), [".css"]),
    ...walk(resolve(ROOT, "src/components"), [".vue", ".css"]),
];

// Mask everything OUTSIDE the <style> region(s) of a .vue (preserving newlines so
// the line numbers stay ABSOLUTE to the SFC) so a template/script string carrying
// the literal `@keyframes` (none today, but a future component might) cannot trip
// the scan. A .css file is its own body, untouched.
const styleBodyOf = (file, raw) => {
    if (!file.endsWith(".vue")) return raw;
    const styleRanges = [];
    const re = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
    let m;
    while ((m = re.exec(raw)) !== null) {
        // the inner-body range (between the > and the </style>)
        const innerStart = m.index + m[0].indexOf(">") + 1;
        styleRanges.push([innerStart, innerStart + m[1].length]);
    }
    let out = "";
    for (let i = 0; i < raw.length; i++) {
        const inStyle = styleRanges.some(([a, b]) => i >= a && i < b);
        const ch = raw[i];
        out += inStyle || ch === "\n" ? ch : " ";
    }
    return out;
};

// Parse every @keyframes block, returning { keyframe, props:[{prop,line}] }.
// We track the absolute line within the (stripped) source for the file:line cite.
const parseKeyframes = (file, source) => {
    const found = [];
    const re = /@keyframes\s+([\w-]+)\s*\{/g;
    let m;
    while ((m = re.exec(source)) !== null) {
        const name = m[1];
        let i = re.lastIndex;
        let depth = 1;
        const start = i;
        while (depth > 0 && i < source.length) {
            const ch = source[i];
            if (ch === "{") depth++;
            else if (ch === "}") depth--;
            i++;
        }
        const body = source.slice(start, i - 1);
        const bodyStartLine = source.slice(0, start).split("\n").length;
        const propRe = /(^|[;{])\s*([a-zA-Z-]+)\s*:/g;
        let pm;
        const props = [];
        while ((pm = propRe.exec(body)) !== null) {
            const prop = pm[2];
            const lineInBody = body.slice(0, pm.index).split("\n").length - 1;
            props.push({ prop, line: bodyStartLine + lineInBody });
        }
        found.push({ keyframe: name, props });
        re.lastIndex = i;
    }
    return found;
};

// ── BB.W-MOTION-CANON: the transition-arm parser. Extract the animated PROPERTY
//    name(s) from a `transition`/`transition-property` declaration so the reflow
//    set can grade them. A `transition` shorthand value is a comma list of legs
//    (`opacity 0.3s ease, transform 0.34s var(--spring-snappy)`); within a leg the
//    property is the token that is NOT a <time> (Ns/Nms), NOT a <timing-function>
//    (ease*/linear/step-*/cubic-bezier(…)/steps(…)/var(--…)), and NOT a bare
//    number/delay. `transition-property: a, b` lists the properties directly.
//    `transition: all` resolves to whatever the element animates — graded as the
//    literal `all` (which is NOT a reflow-set name, but the W-MOTION-CANON bite
//    flags `all` explicitly because it can resolve a layout property; see below). ──
const TIMING_KEYWORDS = new Set([
    "ease",
    "ease-in",
    "ease-out",
    "ease-in-out",
    "linear",
    "step-start",
    "step-end",
    "none",
    "initial",
    "inherit",
    "unset",
    "revert",
    "revert-layer",
    "normal",
    "infinite",
    "alternate",
    "forwards",
    "backwards",
    "both",
    "running",
    "paused",
]);
const isTimeToken = (t) => /^-?[\d.]+m?s$/i.test(t) || /^-?[\d.]+$/.test(t);
const isFnToken = (t) => /^(cubic-bezier|steps|linear|var)\s*\(/i.test(t);

// Split a value on commas that are NOT inside parens (so cubic-bezier(.4, 0, .2, 1)
// and var(--x, fallback) stay one leg).
const splitTopLevelCommas = (value) => {
    const legs = [];
    let depth = 0;
    let cur = "";
    for (const ch of value) {
        if (ch === "(") depth++;
        else if (ch === ")") depth = Math.max(0, depth - 1);
        if (ch === "," && depth === 0) {
            legs.push(cur);
            cur = "";
        } else cur += ch;
    }
    if (cur.trim()) legs.push(cur);
    return legs;
};

// The animated property name of ONE transition leg (or null if none — a leg that
// is purely a time + timing function, which a bare `transition: 0.3s ease` is).
const legProperty = (leg) => {
    // Tokenize the leg, treating a balanced fn-call as ONE token.
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
            if (cur) tokens.push(cur);
            cur = "";
        } else cur += ch;
    }
    if (cur) tokens.push(cur);
    for (const tok of tokens) {
        const t = tok.toLowerCase();
        if (isTimeToken(t) || isFnToken(t) || TIMING_KEYWORDS.has(t)) continue;
        if (!/^[a-z-]+$/.test(t)) continue; // a property name is identifier-shaped
        return t; // the first non-timing identifier IS the property
    }
    return null;
};

// Parse every `transition`/`transition-property` declaration in a (style-masked,
// comment-stripped) source, returning { property, line, isAll }. Skips
// `transition-duration`/`-delay`/`-timing-function` (those name no property).
const parseTransitions = (source) => {
    const out = [];
    const re = /(?:^|[;{}\s])(transition(?:-property)?)\s*:\s*([^;{}]+)/gi;
    let m;
    while ((m = re.exec(source)) !== null) {
        const value = m[2].trim();
        const declLine = source.slice(0, m.index).split("\n").length;
        const isProp = /transition-property/i.test(m[1]);
        for (const leg of splitTopLevelCommas(value)) {
            if (isProp) {
                // transition-property: each comma token is a property directly
                for (const tok of leg.trim().split(/\s+/)) {
                    const t = tok.toLowerCase();
                    if (!t || TIMING_KEYWORDS.has(t)) continue;
                    if (!/^[a-z-]+$/.test(t) && t !== "all") continue;
                    out.push({ property: t, line: declLine, isAll: t === "all" });
                }
            } else {
                const p = legProperty(leg);
                if (p) out.push({ property: p, line: declLine, isAll: p === "all" });
            }
        }
    }
    return out;
};

// ── BB.W-MOTION-CANON: the Vue <Transition> recipe-class parser. A transition
//    recipe class (`*-enter-active`/`*-leave-active`/`*-enter-from`/`*-leave-to`)
//    that animates a layout property on enter/leave reds. We grade the
//    `transition`/`transition-property` declarations INSIDE such a class body (the
//    `-from`/`-to` classes set a target state, not a transition — only the
//    `-active` class carries the transition leg, but we scan all four class shapes
//    so a misplaced transition on a `-from`/`-to` is caught too). ──
const TRANSITION_CLASS_RE = /\.[\w-]+-(?:enter|leave)-(?:active|from|to)\b/;
const parseTransitionClasses = (source) => {
    const out = [];
    // Walk top-level rule blocks; a selector list containing a transition recipe
    // class makes the whole block in-scope (the recipe lives on the -active class).
    const re = /([^{}]+)\{([^{}]*)\}/g;
    let m;
    while ((m = re.exec(source)) !== null) {
        const selector = m[1];
        if (!TRANSITION_CLASS_RE.test(selector)) continue;
        const body = m[2];
        const blockLine = source.slice(0, m.index).split("\n").length;
        for (const t of parseTransitions(body)) {
            out.push({
                selector: selector.trim().replace(/\s+/g, " ").slice(0, 80),
                property: t.property,
                isAll: t.isAll,
                line: blockLine,
            });
        }
    }
    return out;
};

const violations = [];
const transitionViolations = [];
const transitionClassViolations = [];
const transitionAllowedHits = [];
const allowedHits = [];
let keyframesScanned = 0;
let transitionsScanned = 0;
let transitionClassesScanned = 0;

// ── W4 (BB.W-SCROLL-CARD) — the scoped-slot source-companion clause. The
//    CardHeader shrink choreography reaches the consumer-SLOTTED <CardTitle>/
//    <CardDescription> via `:slotted()` (the precise Vue scoped-CSS slotted-
//    content selector, the MetricRow.vue idiom) — NOT the bare
//    `.card-header--shrink > [data-slot="card-title"]` direct-child form (which
//    rewrites to require CardHeader's `data-v-…` scope hash on a child it never
//    carries — the 2-of-3-lanes-dead defect) and NOT the `:deep()` sledgehammer
//    (which leaks the choreography into UNRELATED nested cards). The COMMENT-
//    STRIPPED CardHeader <style> must (a) use `:slotted(` on the title/desc
//    lanes AND (b) carry ZERO bare-direct-child `> [data-slot]` selector AND
//    (c) carry ZERO `:deep([data-slot]` selector. ──
const cardHeaderFile = resolve(ROOT, "src/components/ui/card/CardHeader.vue");
let slottedSourceOk = false;
let slottedFacts = { usesSlotted: false, noBareDirectChild: false, noDeepDataSlot: false };
if (existsSync(cardHeaderFile)) {
    const chRaw = readFileSync(cardHeaderFile, "utf8");
    const chStyle = strip(styleBodyOf(cardHeaderFile, chRaw));
    const usesSlotted = /:slotted\(\s*\[data-slot="card-(title|description)"\]\s*\)/.test(chStyle);
    // the bare direct-child form on a data-slot child (the dead-lane defect)
    const noBareDirectChild = !/--shrink\s*>\s*\[data-slot=/.test(chStyle);
    // the :deep() sledgehammer on a data-slot child (the W-CARD-COMPOSITE stopgap, now retired)
    const noDeepDataSlot = !/:deep\(\s*\[data-slot=/.test(chStyle);
    slottedFacts = { usesSlotted, noBareDirectChild, noDeepDataSlot };
    slottedSourceOk = usesSlotted && noBareDirectChild && noDeepDataSlot;
}

for (const file of corpusFiles) {
    const raw = readFileSync(file, "utf8");
    const source = strip(styleBodyOf(file, raw));
    const rel = relative(ROOT, file);

    // ── The keyframe arm (BB.W-CARD-COMPOSITE) ──
    if (source.includes("@keyframes")) {
        for (const kf of parseKeyframes(file, source)) {
            keyframesScanned++;
            for (const { prop, line } of kf.props) {
                if (!isReflowProp(prop)) continue;
                if (allowed(kf.keyframe, prop)) {
                    allowedHits.push({ keyframe: kf.keyframe, property: prop, file: `${rel}:${line}` });
                    continue;
                }
                violations.push({ keyframe: kf.keyframe, property: prop, file: `${rel}:${line}` });
            }
        }
    }

    // ── The transition arm (BB.W-MOTION-CANON) — a `transition`/`transition-
    //    property` leg naming a reflow property reds (unless file-scoped-allowed).
    //    A `transition: all` that COULD resolve a layout property reds (the bite:
    //    `all` is un-scopable, an evasion vector — name the channels explicitly). ──
    if (/transition(?:-property)?\s*:/.test(source)) {
        for (const { property, line, isAll } of parseTransitions(source)) {
            transitionsScanned++;
            if (isAll) {
                transitionViolations.push({
                    property: "all",
                    file: `${rel}:${line}`,
                    reason: "`transition: all`/`transition-property: all` can resolve a layout property — name the compositor channels explicitly (the un-scopable-all bite)",
                });
                continue;
            }
            if (!isReflowProp(property)) continue;
            if (transitionAllowed(rel, property)) {
                transitionAllowedHits.push({ property, file: `${rel}:${line}` });
                continue;
            }
            transitionViolations.push({ property, file: `${rel}:${line}` });
        }
    }

    // ── The Vue <Transition> recipe-class arm (BB.W-MOTION-CANON) — a recipe
    //    class (`*-enter-active`/`*-leave-active`/`*-enter-from`/`*-leave-to`)
    //    animating a layout property on enter/leave reds. ──
    if (TRANSITION_CLASS_RE.test(source)) {
        for (const { selector, property, isAll, line } of parseTransitionClasses(source)) {
            transitionClassesScanned++;
            if (isAll) {
                transitionClassViolations.push({
                    selector,
                    property: "all",
                    file: `${rel}:${line}`,
                });
                continue;
            }
            if (!isReflowProp(property)) continue;
            // A <Transition>-class layout animation has no legitimate discrete-
            // reclaim register (a reka collapse is NOT a Vue <Transition> class) —
            // the transition-arm file allowlist does NOT extend here.
            transitionClassViolations.push({ selector, property, file: `${rel}:${line}` });
        }
    }
}

// ── Self-proving synthetic bite (W2 anti-evasion): a fabricated @keyframes
//    animating `padding` MUST be flagged by the very same detector — proving the
//    reflow-set partition bites every run, independent of the live corpus. ──
const SELF_TEST_SOURCE = `
@keyframes __self_test_padding_anim__ {
  from { padding-top: 1rem; transform: scale(1); }
  to   { padding-top: 0;    transform: scale(0.9); }
}
@keyframes __self_test_safe_anim__ {
  from { transform: scale(1); opacity: 1; background: red; box-shadow: 0 0 0 red; }
  to   { transform: scale(0.5); opacity: 0; background: blue; box-shadow: 0 1px 2px blue; }
}`;
const selfHits = new Set();
for (const kf of parseKeyframes("self-test", SELF_TEST_SOURCE)) {
    for (const { prop } of kf.props) {
        if (isReflowProp(prop) && !allowed(kf.keyframe, prop))
            selfHits.add(`${kf.keyframe}/${prop.toLowerCase()}`);
    }
}
// The bite: the synthetic padding keyframe IS flagged (regardless of how many
// steps repeat the property) AND the paint/transform/opacity keyframe is NOT —
// the reflow-vs-compositor partition is exact (no transform/opacity/background/
// box-shadow false hit, no padding miss).
const selfTestBites =
    selfHits.size === 1 && selfHits.has("__self_test_padding_anim__/padding-top");

// ── W4 self-test bite (anti-evasion): the scoped-slot detector MUST flag a
//    bare-direct-child selector AND a :deep([data-slot]) selector, and PASS a
//    `:slotted([data-slot])` one — the reflow-vs-precise-idiom partition for the
//    scoped-slot fix is exact (a re-introduced > [data-slot] / :deep([data-slot])
//    reds; the :slotted() form greens). ──
const slottedReGood = `.card-header--shrink > :slotted([data-slot="card-title"]) { animation: x; }`;
const slottedReBareBad = `.card-header--shrink > [data-slot="card-title"] { animation: x; }`;
const slottedReDeepBad = `.card-header--shrink > :deep([data-slot="card-title"]) { animation: x; }`;
const slottedBiteOk =
    /:slotted\(\s*\[data-slot="card-(title|description)"\]\s*\)/.test(slottedReGood) &&
    !/--shrink\s*>\s*\[data-slot=/.test(slottedReGood) &&
    !/:deep\(\s*\[data-slot=/.test(slottedReGood) &&
    /--shrink\s*>\s*\[data-slot=/.test(slottedReBareBad) &&
    /:deep\(\s*\[data-slot=/.test(slottedReDeepBad);

// ── BB.W-MOTION-CANON self-test bites: the transition arm + the <Transition>-class
//    arm have NO precedent assertion at HEAD (born-RED here, proven every run). The
//    synthetic source carries a layout `transition: width` + a layout-property
//    transition-property leg (MUST flag) AND a compositor `transition: opacity,
//    transform` + a paint `transition: background-color` (MUST NOT flag) — the
//    reflow-vs-paint-vs-composite partition for the transition arm is exact. ──
const TRANSITION_SELF_TEST = `
.__t_layout__ { transition: width 0.3s ease, opacity 0.2s linear; }
.__t_propname__ { transition-property: padding, color; }
.__t_safe__ { transition: opacity 0.3s var(--ease-standard), transform 0.34s var(--spring-snappy); }
.__t_paint__ { transition: background-color 0.2s ease, box-shadow 0.2s ease; }
.__t_all__ { transition: all 0.3s ease; }`;
const tSelfHits = new Set();
for (const { property, isAll } of parseTransitions(TRANSITION_SELF_TEST)) {
    if (isAll) tSelfHits.add("all");
    else if (isReflowProp(property)) tSelfHits.add(property.toLowerCase());
}
// The bite: width + padding + all flag; opacity/transform/background-color/box-
// shadow do NOT. Exactly {width, padding, all}.
const transitionSelfTestBites =
    tSelfHits.size === 3 &&
    tSelfHits.has("width") &&
    tSelfHits.has("padding") &&
    tSelfHits.has("all");

const TRANSITION_CLASS_SELF_TEST = `
.x-enter-active { transition: height 0.3s ease, opacity 0.2s ease; }
.y-leave-active { transition: opacity 0.2s ease, transform 0.3s var(--spring-smooth); }`;
const tcSelfHits = new Set();
for (const { property } of parseTransitionClasses(TRANSITION_CLASS_SELF_TEST)) {
    if (isReflowProp(property)) tcSelfHits.add(property.toLowerCase());
}
// The bite: the .x-enter-active height leg flags; the .y-leave-active opacity +
// transform legs do NOT. Exactly {height}.
const transitionClassSelfTestBites = tcSelfHits.size === 1 && tcSelfHits.has("height");

// ── BB.W-MOTION-CANON: the universal-PRM-carve assertion (motion-canon P6). The
//    keep-fade/drop-transform discipline is single-sourced at the library seam,
//    NOT re-declared per recipe (the global a11y-overrides reset IS the carve for
//    the interactive hover/press cohort — re-asserting it per-recipe would be the
//    over-broad trap). The POSITIVE check: (a) the universal carve exists and, under
//    `prefers-reduced-motion: reduce`, restricts `transition-property` to the
//    NON-SPATIAL set (no transform/scale/translate slips through) AND (b) the
//    recipe-local keep-fade/drop-transform reference exists (the transitions.css
//    Vue <Transition> carve — transform:none + opacity-only under PRM). A library
//    that ships transform-animating recipes with NEITHER carve seam reds. ──
const a11yFile = resolve(ROOT, "src/styles/utilities/a11y-overrides.css");
const transitionsCssFile = resolve(ROOT, "src/styles/transitions.css");
let prmFacts = {
    universalCarveExists: false,
    universalRestrictsTransitionProperty: false,
    universalNonSpatial: false,
    recipeCarveExists: false,
    recipeDropsTransform: false,
};
if (existsSync(a11yFile)) {
    const a11y = strip(readFileSync(a11yFile, "utf8"));
    // the PRM block restricting transition-property for *:not([data-allow-motion])
    const prmBlock = /@media\s*\([^)]*prefers-reduced-motion:\s*reduce[^)]*\)\s*\{[\s\S]*\}/.exec(a11y);
    if (prmBlock) {
        prmFacts.universalCarveExists = true;
        const blockText = prmBlock[0];
        const tpRule = /transition-property\s*:\s*([^;!]+)/i.exec(blockText);
        if (tpRule) {
            prmFacts.universalRestrictsTransitionProperty = true;
            const restricted = tpRule[1].toLowerCase();
            // the universal carve restricts to NON-SPATIAL channels: it must NOT
            // list transform/scale/translate/rotate (so spatial motion is stripped
            // by the property-reset, never kept).
            prmFacts.universalNonSpatial =
                !/\b(transform|scale|translate|rotate)\b/.test(restricted);
        }
    }
}
if (existsSync(transitionsCssFile)) {
    const tcss = strip(readFileSync(transitionsCssFile, "utf8"));
    const prmBlock = /@media\s*\([^)]*prefers-reduced-motion:\s*reduce[^)]*\)\s*\{[\s\S]*\}/.exec(tcss);
    if (prmBlock) {
        prmFacts.recipeCarveExists = true;
        // the recipe-local carve drops the transform (transform: none) under PRM
        prmFacts.recipeDropsTransform = /transform\s*:\s*none/i.test(prmBlock[0]);
    }
}
const prmCarveOk =
    prmFacts.universalCarveExists &&
    prmFacts.universalRestrictsTransitionProperty &&
    prmFacts.universalNonSpatial &&
    prmFacts.recipeCarveExists &&
    prmFacts.recipeDropsTransform;

// The PRM self-test bite (anti-evasion): a synthetic PRM block that KEEPS transform
// in its transition-property list MUST fail the non-spatial check; one restricting
// to opacity/color MUST pass — the keep-fade/drop-transform partition bites. ──
const prmBadCarve = `@media (prefers-reduced-motion: reduce) { * { transition-property: opacity, transform !important; } }`;
const prmGoodCarve = `@media (prefers-reduced-motion: reduce) { * { transition-property: opacity, color !important; } }`;
const nonSpatialOf = (carve) => {
    const m = /transition-property\s*:\s*([^;!]+)/i.exec(carve);
    return m ? !/\b(transform|scale|translate|rotate)\b/.test(m[1].toLowerCase()) : false;
};
const prmSelfTestBites = nonSpatialOf(prmGoodCarve) === true && nonSpatialOf(prmBadCarve) === false;

// ── BB.W-MOTION-CANON MC1 — the canon precept doc presence (submodule-aware,
//    skip-by-policy on a runner with the docs/precepts submodule uninitialized,
//    mirroring proof:colocation's idiom-home clause). Bites LOCALLY: the doc exists
//    and declares the six principle headings P1-P6. ──
const preceptsDir = resolve(ROOT, "docs/precepts");
const preceptsSubmodulePresent =
    existsSync(preceptsDir) && readdirSync(preceptsDir).length > 0;
const canonDocFile = resolve(ROOT, "docs/precepts/motion-canon.md");
let canonDocFacts = { submodulePresent: preceptsSubmodulePresent, exists: false, hasP1toP6: false };
let canonDocOk = true; // skip-by-policy default
if (preceptsSubmodulePresent) {
    canonDocFacts.exists = existsSync(canonDocFile);
    if (canonDocFacts.exists) {
        const doc = readFileSync(canonDocFile, "utf8");
        canonDocFacts.hasP1toP6 = ["## P1", "## P2", "## P3", "## P4", "## P5", "## P6"].every(
            (h) => doc.includes(h),
        );
    }
    canonDocOk = canonDocFacts.exists && canonDocFacts.hasP1toP6;
}

// ── BB.W-MOTION-CANON MC2 — the §6 easing table carries the SIZE/MORPH row + the
//    spatial/effects label (source-asserted on scheme-motion.css). ──
const schemeMotionFile = resolve(ROOT, "src/styles/tokens/scheme-motion.css");
// BD.W-CUT carved scheme-motion's §2 EASING block — which carries the §6 easing-
// table prose (the Size/morph row + the [SPATIAL]/[EFFECTS] labels) — into the
// adjacent scheme-spring.css partial. Read BOTH so the table is in scope.
const schemeSpringFile = resolve(ROOT, "src/styles/tokens/scheme-spring.css");
let tableFacts = { exists: false, hasSizeMorph: false, hasSpatialEffectsLabel: false };
if (existsSync(schemeMotionFile)) {
    const sm =
        readFileSync(schemeMotionFile, "utf8") +
        "\n" +
        (existsSync(schemeSpringFile) ? readFileSync(schemeSpringFile, "utf8") : "");
    tableFacts.exists = true;
    tableFacts.hasSizeMorph = /Size\s*\/\s*morph/i.test(sm);
    tableFacts.hasSpatialEffectsLabel = /\[SPATIAL\]/.test(sm) && /\[EFFECTS\]/.test(sm);
}
const tableOk = tableFacts.exists && tableFacts.hasSizeMorph && tableFacts.hasSpatialEffectsLabel;

// ── BB.W-MOTION-CANON MC6 — the useLiquidFlex.sizeStyle doctrine record (the
//    settled-footprint-not-per-frame contract in the JSDoc). ──
const liquidFlexFile = resolve(ROOT, "src/composables/motion/useLiquidFlex.ts");
let sizeStyleFacts = { exists: false, hasRecord: false };
if (existsSync(liquidFlexFile)) {
    const lf = readFileSync(liquidFlexFile, "utf8");
    sizeStyleFacts.exists = true;
    // the record names the settled-footprint contract + the per-frame=transform rule
    sizeStyleFacts.hasRecord =
        /SETTLED-FOOTPRINT/i.test(lf) && /per-frame channel is `transform`/i.test(lf);
}
const sizeStyleOk = sizeStyleFacts.exists && sizeStyleFacts.hasRecord;

const checks = [];
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

add(
    "W1-no-layout-animation",
    violations.length === 0,
    violations.length === 0
        ? `no keyframe animates a reflow property (${keyframesScanned} keyframes scanned across ${corpusFiles.length} files)`
        : `${violations.length} reflow-set violation(s): ${violations
              .map((v) => `${v.keyframe} animates ${v.property} (${v.file})`)
              .join("; ")}`,
);
add(
    "W2-self-test-bite",
    selfTestBites,
    selfTestBites
        ? "the synthetic padding-animating keyframe is flagged AND the paint/transform/opacity keyframe is NOT — the reflow-vs-compositor partition bites"
        : `self-test partition broke: ${JSON.stringify([...selfHits])}`,
);
add(
    "W3-inventory-complete",
    keyframesScanned > 0 && corpusFiles.length > 0,
    `inventory-complete: ${keyframesScanned} keyframes across the full corpus (src/styles/*.css + every SFC <style>); allowlisted reclaims: ${allowedHits
        .map((a) => `${a.keyframe}/${a.property}`)
        .join(", ") || "none"}`,
);
add(
    "W4-slotted-source-assert",
    slottedSourceOk,
    slottedSourceOk
        ? "CardHeader shrink lanes re-target the slotted title/description via :slotted() — the bare > [data-slot] direct-child form AND the :deep([data-slot]) sledgehammer are GONE (the scoped-slot defect fixed, the precise Vue idiom)"
        : `CardHeader scoped-slot assert FAILED: ${JSON.stringify(slottedFacts)} (need usesSlotted=true, noBareDirectChild=true, noDeepDataSlot=true)`,
);
add(
    "W4-slotted-self-test-bite",
    slottedBiteOk,
    slottedBiteOk
        ? "the scoped-slot detector flags a bare > [data-slot] AND a :deep([data-slot]) selector, and passes a :slotted([data-slot]) one — the precise-idiom partition bites"
        : "scoped-slot self-test partition broke (the :slotted/bare/deep detector mis-classified the synthetic selectors)",
);

// ── BB.W-MOTION-CANON — the codification + the transition/PRM enforcement arms ──
add(
    "MC1-canon-doc",
    canonDocOk,
    !canonDocFacts.submodulePresent
        ? "MC1: SKIP-BY-POLICY — docs/precepts submodule not initialized on this runner (the canon-doc clause bites locally)"
        : canonDocOk
          ? "motion-canon.md exists and declares P1-P6 (the codified principle-set — the binding doctrine every liquid-glass wave cites)"
          : `MC1 FAILED: ${JSON.stringify(canonDocFacts)} (need exists=true, hasP1toP6=true)`,
);
add(
    "MC2-size-morph-row",
    tableOk,
    tableOk
        ? "the §6 easing table carries the SIZE/MORPH spatial row + the [SPATIAL]/[EFFECTS] labels (the Material-3 split made legible)"
        : `MC2 FAILED: ${JSON.stringify(tableFacts)} (need hasSizeMorph=true, hasSpatialEffectsLabel=true)`,
);
add(
    "MC3-transition-arm",
    transitionViolations.length === 0,
    transitionViolations.length === 0
        ? `no transition leg animates a reflow property (${transitionsScanned} transition legs scanned; ${transitionAllowedHits.length} named discrete-reclaim/booked exception(s) allowlisted)`
        : `${transitionViolations.length} transition reflow violation(s): ${transitionViolations
              .map((v) => `${v.property}${v.reason ? ` [${v.reason.slice(0, 60)}…]` : ""} (${v.file})`)
              .join("; ")}`,
);
add(
    "MC3-transition-self-test-bite",
    transitionSelfTestBites,
    transitionSelfTestBites
        ? "the transition self-test flags `width`/`padding`/`all` AND passes `opacity`/`transform`/`background-color`/`box-shadow` — the reflow-vs-paint-vs-composite partition bites on the transition surface"
        : `transition self-test partition broke: ${JSON.stringify([...tSelfHits])} (need exactly {width, padding, all})`,
);
add(
    "MC4-transition-class-arm",
    transitionClassViolations.length === 0,
    transitionClassViolations.length === 0
        ? `no Vue <Transition> recipe class animates a reflow property on enter/leave (${transitionClassesScanned} class-block transition legs scanned)`
        : `${transitionClassViolations.length} <Transition>-class reflow violation(s): ${transitionClassViolations
              .map((v) => `${v.selector} animates ${v.property} (${v.file})`)
              .join("; ")}`,
);
add(
    "MC4-transition-class-self-test-bite",
    transitionClassSelfTestBites,
    transitionClassSelfTestBites
        ? "the <Transition>-class self-test flags a `.x-enter-active { transition: height }` AND passes the opacity+transform `.y-leave-active` — the reflow-vs-compositor partition bites on the <Transition> surface"
        : `<Transition>-class self-test partition broke: ${JSON.stringify([...tcSelfHits])} (need exactly {height})`,
);
add(
    "MC5-prm-carve",
    prmCarveOk,
    prmCarveOk
        ? "the universal PRM carve (a11y-overrides.css) restricts transition-property to non-spatial channels library-wide AND the transitions.css recipe-local carve drops transform under reduce — the keep-fade/drop-transform discipline (P6) cannot silently regress"
        : `MC5 FAILED: ${JSON.stringify(prmFacts)} (need universalCarve restricts transition-property to non-spatial + recipe carve drops transform)`,
);
add(
    "MC5-prm-self-test-bite",
    prmSelfTestBites,
    prmSelfTestBites
        ? "the PRM self-test flags a transition-property carve that KEEPS transform AND passes one restricted to opacity/color — the non-spatial-restriction partition bites"
        : "PRM self-test partition broke (the non-spatial detector mis-classified the synthetic carves)",
);
add(
    "MC6-sizestyle-record",
    sizeStyleOk,
    sizeStyleOk
        ? "useLiquidFlex.sizeStyle JSDoc records the settled-footprint-not-per-frame contract (the per-frame channel is transform — the SIZESTYLE-LATENT path the doctrine closes)"
        : `MC6 FAILED: ${JSON.stringify(sizeStyleFacts)} (need the settled-footprint doctrine note in the sizeStyle JSDoc)`,
);

const failed = checks.filter((c) => !c.pass);
const pass = failed.length === 0;

const ARTIFACT = gateArtifactPath("GATE_NO_LAYOUT_ANIMATION_OUT", "BB-no-layout-animation");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:no-layout-animation",
    command: COMMAND,
    note: "Device-free SOURCE arm — the compositor-only architectural lock (BB.W-CARD-COMPOSITE mint + BB.W-MOTION-CANON transition/<Transition>/PRM extension). The binding CLS measure (1.03 → ≤ 0.1 on the live scroll-shrink demo) is the π/DELTA arm, never this gate alone.",
    keyframesScanned,
    filesScanned: corpusFiles.length,
    violations,
    allowlisted: allowedHits,
    slottedSource: slottedFacts,
    facts: {
        transitionsScanned,
        transitionClassesScanned,
        transitionViolations,
        transitionClassViolations,
        transitionAllowlisted: transitionAllowedHits,
        prmCarveChecked: true,
        prm: prmFacts,
        canonDoc: canonDocFacts,
        sizeMorphTable: tableFacts,
        sizeStyleRecord: sizeStyleFacts,
    },
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:no-layout-animation] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    `\n[proof:no-layout-animation] LOCKED — ${keyframesScanned} keyframes + ${transitionsScanned} transition legs + ${transitionClassesScanned} <Transition>-class legs scanned, 0 layout-property animations off the allowlist (${allowedHits.length} keyframe + ${transitionAllowedHits.length} transition named CLS-bounded reclaim(s)). The compositor-only architecture (motion-canon P5) + the universal PRM carve (P6) cannot regress library-wide.`,
);
