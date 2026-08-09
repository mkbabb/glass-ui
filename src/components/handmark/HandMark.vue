<!--
  HandMark.vue — the generalized hand-mark component (L5; SPEC §9).
  ───────────────────────────────────────────────────────────────────────────
  One mark primitive: an underline, a circle around a datum, a strike, a highlight
  band, a box, or an arbitrary path — in any medium (pen default · crayon · …),
  any CSS color, deterministic per `seed`, optionally animated. The PEN default is
  `grain:0` of the same engine: a clean wobbled <path>, no filter, no extra dep.

  Layering (the four-layer hybrid, SPEC §1):
    L1 GEOMETRY  @mkbabb/pencil-boil  (peer) — wobble + the ellipsePoints ring
    L2 BODY      ribbon:'stroke' (pen/crayon) | 'hull' (vendored pf — highlighter)
    L3 GRAIN     texture.ts feTurbulence graph — STATIC + SEEDED (rasters once)
    L4 ANIMATION draw-on (dashoffset for clean ink · clip-path WIPE for grain) + boil
    L5 SURFACE   this SFC — anchor/measure, mount the namespaced filter, a11y

  The word stays REAL selectable text; the mark is an aria-hidden SVG overlay.

  Two usage modes (SPEC §6.1):
    - text mode (default): wraps a slotted word, lays the mark under/over/behind it.
    - positioned mode (`:box`): laid over an explicit datum rect (circle an anomaly).

  THE HIGHLIGHTER ENGAGED:
    (d) `cap:"square"` reaches the DOM — the per-path `stroke-linecap` binds the
        brush `cap` field (not a hardcoded `stroke-linecap: round`).
    (e) the multiply un-walled — `.hm` carries NO `isolation: isolate` (that walled
        the `mix-blend-mode: multiply` off the PAGE backdrop, defeating its purpose;
        one mark per word, so sibling-mark bleed is a non-issue). The behind-band
        composites against the page text behind it (the binding π).
-->
<script setup lang="ts">
import {
    computed,
    onBeforeUnmount,
    onMounted,
    ref,
    useId,
    watch,
} from "vue";
import { normalizeProps, useHandMark } from "./composables/useHandMark";
import type { BlendMode } from "./brush";
import type { HandMarkProps } from "./types";
import { VB_H, VB_W } from "./constants";
import type { CSSProperties } from "vue";

const props = withDefaults(defineProps<HandMarkProps>(), {
    brush: "pen",
    shape: "underline",
    color: "currentColor",
    seed: 1,
    animation: "none",
    drawMs: 800,
    drawDelayMs: 0,
    appear: "visible",
    boilFps: 8,
    boilFrames: 3,
    jagged: false,
});

// Per-instance namespaced filter id — the house SVG-namespace idiom, sanitised for url(#…).
const uid = `hm-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

// ── the MEASURED text baseline (the E1 underline anchor; SPEC §6.2) ───────────
// The text-mode underline anchors to the slotted word's REAL baseline, not a
// constant 80% of the line-box (which strikethroughs tight-leading display type).
// `baselineFrac` is the alphabetic baseline as a fraction of the `.hm` box height,
// measured once after layout + `document.fonts.ready`, and re-measured on resize.
// `null` until measured (the pre-measure / jsdom / SSR frame falls back in geometry).
const baselineFrac = ref<number | null>(null);

// ── the aspect-correct viewBox (SPEC §3 residual a) ────
// A text-mode underline's `.hm` box renders far WIDER than the 2.5 viewBox aspect
// (a short word → px-aspect 11-17), and `preserveAspectRatio="none"` then x-stretches
// the wobble into a flat bar (the headless-green trap — a gate reading the path `d`
// PASSES while the render is a ruler). Deriving the marking-space HEIGHT from the
// MEASURED box px-aspect (`vbH = VB_W / boxAspect`) makes the x and y scales EQUAL, so
// the humps scale in PROPORTION at every word length. `null` until measured; the
// positioned/box/circle/bracket path keeps `VB_H` (it DEPENDS on the none-stretch to
// fill the datum rect — the text-mode fix must not touch it).
const boxAspect = ref<number | null>(null);
const vbH = computed(() => {
    const textMode =
        props.box == null &&
        (props.shape === "underline" ||
            props.shape === "strikethrough" ||
            props.shape === "highlight");
    const a = boxAspect.value;
    if (!textMode || a == null || a <= 0) return VB_H;
    return VB_W / a;
});

const input = computed(() => normalizeProps(props, uid, baselineFrac.value, vbH.value));
const core = useHandMark(input);

const { brush, fragment, grained, drawKind, draws, boils, boil, boilArmed } = core;

const behind = computed(() => props.shape === "highlight");

// Path-escape-hatch: when `path` is set, render that single `d` (it wins over shape).
const escapePath = computed(() => props.path ?? null);

// ── draw-on state (SPEC §8) ────────────────────────────────────────────────
const drawn = ref(false);
const root = ref<HTMLElement | null>(null);
let drawFrame: number | null = null;

const drawTransition = computed(() => {
    if (!draws.value) return "none";
    // (d) the draw-on easing is the token, not a hardcoded literal — the
    // bold-decelerating ARRIVAL ease is the liquid-weight register, tuned
    // library-wide from ONE token.
    const ease = "var(--ease-out-expo)";
    const prop = drawKind.value === "clip" ? "clip-path" : "stroke-dashoffset";
    return `${prop} ${props.drawMs}ms ${ease} ${props.drawDelayMs}ms`;
});

function armBoil(): void {
    if (!boils.value) return;
    boilArmed.value = true;
    boil.start();
}

function play(): void {
    if (!draws.value) {
        armBoil();
        return;
    }
    if (drawFrame !== null) cancelAnimationFrame(drawFrame);
    drawn.value = false;
    // reflow so the transition re-fires from the un-drawn state
    if (root.value) void root.value.offsetWidth;
    drawFrame = requestAnimationFrame(() => {
        drawFrame = null;
        drawn.value = true;
    });
}

function onDrawEnd(): void {
    if (props.animation === "draw-then-boil") armBoil();
}

defineExpose({ play });

// ── baseline measurement (the E1 underline anchor; SPEC §6.2) ─────────────────
// Text mode only (the underline/strikethrough/highlight band): positioned (`box`)
// marks carry their own datum geometry. We range the slotted text (the non-svg
// children) to find the alphabetic baseline ≈ the glyph BOTTOM, and express it as a
// fraction of the `.hm` box so it survives the viewBox x-stretch (width-invariant by
// construction). The highlight band re-uses the SAME measured baseline to seat LOW
// (C-1(a)).
const measured = computed(
    () =>
        props.box == null &&
        (props.shape === "underline" ||
            props.shape === "strikethrough" ||
            props.shape === "highlight"),
);

/** The slotted text's bottom (alphabetic baseline proxy), in client px, or null. */
function textRangeRect(el: HTMLElement): DOMRect | null {
    if (typeof document === "undefined" || typeof Range === "undefined") return null;
    // The slotted CONTENT nodes only: skip the overlay <svg> AND the empty text anchors
    // Vue's compiled slot leaves around the word — `selectNode` REPLACES the selection,
    // so a loop that selects every non-svg child ends on a trailing empty anchor and
    // measures a zero rect (baselineFrac stayed null forever; the legacy constant
    // rendered — the 3.11.0 gate-flip lesson). Anchor the range on the first content
    // node and extend it over the last: the union is the word.
    const content = Array.from(el.childNodes).filter((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) return (node as Element).tagName !== "svg";
        return node.nodeType === Node.TEXT_NODE && (node.textContent ?? "").trim().length > 0;
    });
    if (content.length === 0) return null;
    const range = document.createRange();
    range.selectNode(content[0]);
    if (content.length > 1) range.setEndAfter(content[content.length - 1]);
    const r = range.getBoundingClientRect();
    range.detach?.();
    return r.height > 0 ? r : null;
}

function measure(): void {
    if (!measured.value) return;
    const el = root.value;
    if (!el) return;
    const tr = textRangeRect(el);
    if (!tr) return;
    const host = el.getBoundingClientRect();
    if (host.height <= 0) return;
    // (a) the box px-aspect drives the aspect-correct marking-space height (vbH).
    if (host.width > 0) boxAspect.value = host.width / host.height;
    // the glyph bottom as a fraction of the `.hm` box (the measured baseline).
    const frac = (tr.bottom - host.top) / host.height;
    // clamp to the box so a degenerate measure never throws the line off-canvas.
    baselineFrac.value = Math.min(1, Math.max(0, frac));
}

let ro: ResizeObserver | null = null;

function startMeasuring(): void {
    if (!measured.value || !root.value) return;
    measure();
    // re-measure after the font swap (the alphabetic baseline shifts with the face).
    if (typeof document !== "undefined" && document.fonts?.ready) {
        void document.fonts.ready.then(() => measure());
    }
    if (typeof ResizeObserver !== "undefined") {
        ro = new ResizeObserver(() => measure());
        ro.observe(root.value);
    }
}

let io: IntersectionObserver | null = null;

onMounted(() => {
    startMeasuring(); // measure the baseline before/independent of the draw clock
    if (props.animation === "boil") armBoil(); // pure boil: no draw gate
    if (props.appear === "mount") play();
    else if (props.appear === "visible" && typeof IntersectionObserver !== "undefined") {
        io = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    play();
                    io?.disconnect();
                }
            },
            // (d) near-0 any-intersect: a thin 1px underline on a tall viewport may never
            // cross a 35% threshold → the draw-on would never fire → an invisible mark.
            { threshold: 0.01 },
        );
        if (root.value) io.observe(root.value);
    } else if (props.appear === "visible") {
        // no IO (jsdom / SSR) — appear immediately drawn-static
        play();
    }
});

onBeforeUnmount(() => {
    if (drawFrame !== null) cancelAnimationFrame(drawFrame);
    io?.disconnect();
    ro?.disconnect();
    boil.stop();
});

// Re-run draw-on if the animation prop flips at runtime.
watch(
    () => props.animation,
    () => {
        drawn.value = false;
        boilArmed.value = false;
    },
);

// Map the brush `blend` field (a globalCompositeOperation vocabulary) to a CSS
// `mix-blend-mode` value — 'source-over' is the no-op ('normal').
const CSS_BLEND: Record<BlendMode, CSSProperties["mixBlendMode"]> = {
    "source-over": "normal",
    multiply: "multiply",
    darken: "darken",
    screen: "screen",
};

function pathStyle(blend: BlendMode): CSSProperties {
    return { mixBlendMode: CSS_BLEND[blend], transition: drawTransition.value };
}
</script>

<template>
    <span class="hm" ref="root" :data-shape="shape" :data-behind="behind" :data-grained="grained">
        <slot />
        <svg
            class="hm__svg"
            :viewBox="`0 0 ${VB_W} ${vbH}`"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
        >
            <defs v-if="fragment.filterId" v-html="fragment.defs[0]" />
            <!--
              ribbon:'hull' paths are FILLED; ribbon:'stroke' paths are STROKED.
              The draw-on rides clip-path (grained) or stroke-dashoffset (clean ink),
              picked by `drawKind` — never dashoffset under a filter. The per-path
              `stroke-linecap` binds the brush `cap` field (C-1(d) — the square cap
              reaches the DOM; no hardcoded round in the CSS).
            -->
            <path
                v-for="(p, i) in fragment.paths"
                :key="i"
                class="hm__path"
                :class="{ drawn, [`hm__path--${drawKind}`]: draws }"
                :d="escapePath ?? p.d"
                pathLength="1"
                vector-effect="non-scaling-stroke"
                :stroke="p.stroke ?? 'none'"
                :fill="p.fill ?? 'none'"
                :stroke-width="p.stroke ? brush.weight : 0"
                :stroke-opacity="p.stroke ? p.opacity : undefined"
                :fill-opacity="p.fill ? p.opacity : undefined"
                :stroke-linecap="p.cap ?? 'round'"
                stroke-linejoin="round"
                :filter="fragment.filterId ? `url(#${fragment.filterId})` : undefined"
                :style="pathStyle(p.blend)"
                @transitionend="onDrawEnd"
            />
        </svg>
    </span>
</template>

<style scoped>
.hm {
    position: relative;
    display: inline-block;
    cursor: inherit;
    /* C-1(e): NO `isolation: isolate`. The highlighter's `mix-blend-mode: multiply`
       must compose against the PAGE backdrop behind the word — an isolated stacking
       context here would wall the blend off the page (the fork's defect: the comment
       said "compose against the page" while `isolate` did the opposite). One mark per
       word, so sibling-mark bleed is a non-issue. */
}
.hm__svg {
    position: absolute;
    /* The word-hugging underline overshoots ~2% each side — a hand mark hugs the
       word, it does not bleed 6% into the neighbour (the E1 collision root). The
       box-mode circle/box/bracket keep their wider hand character below. */
    left: -2%;
    width: 104%;
    top: 0;
    height: 100%;
    overflow: visible; /* round caps + wobble overshoot spill past the box */
    pointer-events: none;
}
/* circle / box wrap the whole word; highlight sits behind it. */
.hm[data-shape="circle"] .hm__svg,
.hm[data-shape="box"] .hm__svg,
.hm[data-shape="bracket"] .hm__svg {
    left: -12%;
    width: 124%;
    top: -22%;
    height: 144%;
    z-index: -1;
}
.hm[data-behind="true"] .hm__svg {
    z-index: -1;
    mix-blend-mode: multiply;
}
.hm__path {
    /* stroke-linecap is the per-path attr (C-1(d)); only the join is set here. */
    stroke-linejoin: round;
}

/* draw-on, mechanism A — clean ink: dashoffset on pathLength="1" (no filter). */
.hm__path--dashoffset {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
}
.hm__path--dashoffset.drawn {
    stroke-dashoffset: 0;
}

/* draw-on, mechanism B — grained ink: a clip-path WIPE. The filter rasters ONCE;
   only the clip interpolates (compositor-eligible) — never re-rastered per frame. */
.hm__path--clip {
    clip-path: inset(-60% 104% -60% -2%);
}
.hm__path--clip.drawn {
    clip-path: inset(-60% -2% -60% -2%);
}

/* PRM — every mode collapses to the finished static state, no motion. */
@media (prefers-reduced-motion: reduce) {
    .hm__path {
        transition: none !important;
    }
    .hm__path--dashoffset {
        stroke-dashoffset: 0 !important;
    }
    .hm__path--clip {
        clip-path: none !important;
    }
}
</style>
