<!--
  HandMark.vue — the generalized hand-mark component (L5; SPEC §9).
  ───────────────────────────────────────────────────────────────────────────
  One mark primitive: an underline, a circle around a datum, a strike, a highlight
  band, a box, or an arbitrary path — in any medium (pen default · crayon · …),
  any CSS color, deterministic per `seed`, optionally animated. The PEN default is
  `grain:0` of the same engine: a clean wobbled <path>, no filter, no extra dep.

  Layering (the four-layer hybrid, SPEC §1):
    L1 GEOMETRY  @mkbabb/pencil-boil  (peer) — wobble + the ellipsePoints ring
    L2 BODY      ribbon:'stroke' (pen/crayon) | 'hull' (opt-in vendored pf)
    L3 GRAIN     texture.ts feTurbulence graph — STATIC + SEEDED (rasters once)
    L4 ANIMATION draw-on (dashoffset for clean ink · clip-path WIPE for grain) + boil
    L5 SURFACE   this SFC — anchor/measure, mount the namespaced filter, a11y

  The word stays REAL selectable text; the mark is an aria-hidden SVG overlay.
  `InkMark` is the prose alias (same impl, two names — index.ts).

  Two usage modes (SPEC §6.1):
    - text mode (default): wraps a slotted word, lays the mark under/over/behind it.
    - positioned mode (`:box`): laid over an explicit datum rect (circle an anomaly).
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
import { normalizeProps, useHandMark } from "./useHandMark";
import type { BlendMode } from "./brush";
import type { HandMarkProps } from "./types";
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

// Per-instance namespaced filter id — the WatercolorDot idiom, sanitised for url(#…).
const uid = `hm-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

const input = computed(() => normalizeProps(props, uid));
const core = useHandMark(input);

const { brush, fragment, grained, drawKind, draws, boils, boil, boilArmed } = core;

const behind = computed(() => props.shape === "highlight");

// Path-escape-hatch: when `path` is set, render that single `d` (it wins over shape).
const escapePath = computed(() => props.path ?? null);

// ── draw-on state (SPEC §8) ────────────────────────────────────────────────
const drawn = ref(false);
const root = ref<HTMLElement | null>(null);

const drawTransition = computed(() => {
    if (!draws.value) return "none";
    const ease = "cubic-bezier(.16,1,.3,1)";
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
    drawn.value = false;
    // reflow so the transition re-fires from the un-drawn state
    if (root.value) void root.value.offsetWidth;
    requestAnimationFrame(() => {
        drawn.value = true;
    });
}

function onDrawEnd(): void {
    if (props.animation === "draw-then-boil") armBoil();
}

defineExpose({ play });

let io: IntersectionObserver | null = null;

onMounted(() => {
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
            { threshold: 0.35 },
        );
        if (root.value) io.observe(root.value);
    } else if (props.appear === "visible") {
        // no IO (jsdom / SSR) — appear immediately drawn-static
        play();
    }
});

onBeforeUnmount(() => {
    io?.disconnect();
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

const VB_W = 100;
const VB_H = 40;

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
            :viewBox="`0 0 ${VB_W} ${VB_H}`"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
        >
            <defs v-if="fragment.filterId" v-html="fragment.defs[0]" />
            <!--
              ribbon:'hull' paths are FILLED; ribbon:'stroke' paths are STROKED.
              The draw-on rides clip-path (grained) or stroke-dashoffset (clean ink),
              picked by `drawKind` — never dashoffset under a filter.
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
    /* highlighter multiply must compose against the page, not sibling marks. */
    isolation: isolate;
}
.hm__svg {
    position: absolute;
    left: -6%;
    width: 112%;
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
    stroke-linecap: round;
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
