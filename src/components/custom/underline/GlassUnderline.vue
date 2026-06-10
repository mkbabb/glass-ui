<script setup lang="ts">
// GlassUnderline — the first-class animated draw-on underline (AY.W-UNDERLINE).
//
// A faithful transposition of sci-report's HandUnderline.vue (241 lines, mature,
// in production across 4 mastheads): an inline-SVG wavering cubic that DRAWS itself
// via `stroke-dashoffset: len → 0` — the pen laying ink under a word. The wobble
// lives in authored control points — FILTER-FREE (no `feTurbulence`; the
// compositor-only invariant).
//
// THE FILTER-FREE INVARIANT (gate FILTER-FREE): the "hand never lays one clean
// line" read is a SECOND faint PEN ghost overdraw (a second <path> at lower
// opacity, a hair offset), NOT a per-paint raster filter. A `feTurbulence`/`filter:`
// would break the compositor-only whitelist (a per-frame raster is not a composited
// property). The wobble is in the path CONTROL POINTS, authored once.
//
// THREE CLOCKS, ONE VOCABULARY:
//   • clock="load" (default) — a keyframes.js `NumericAnimation` over the single
//     `--gu-off` scalar, exposed via `play()` so a load Sequence chains the draw as
//     a causal link (fires ONCE, never reverses). The SAME engine useCountup rides
//     — one orchestration seam, no setTimeout.
//   • clock="scroll" — native CSS `@keyframes gu-draw` keyed to a `view()` timeline
//     (bidirectional, zero JS). The timeline name is a prop (`--gu-timeline`).
//   • clock="static" — set drawn, no clock.
//   • the `active?: boolean` prop is a thin declarative overlay ON the load clock
//     (DEC-2): rising edge → play() (under PRM → snap()), falling edge → reset to
//     undrawn so re-activation REPLAYS. Only meaningful with clock="load".
//
// PRM — ONE FENCE, BOTH CLOCKS COLLAPSE TO *set, not drawn* (DEC-9): the module-
// local one-shot `prefersReducedMotion()` read (the useCountup.ts idiom) seeds the
// initial state; the load clock's `NumericAnimation({ respectReducedMotion: true })`
// snaps in one paint, and the scroll clock's `@keyframes` sits under the OUTER
// `@media (prefers-reduced-motion: no-preference)` so it never binds under reduce.
// Information parity is total — the emphasis is the stroke colour, present regardless
// of the draw.
//
// DARK ARM DELETES (DEC-4): no `:where(.dark)` block — `var(--primary)` re-resolves
// under `.dark` via the token cascade. A `color` prop wins both grounds (v-bind).
//
// VARIANT HEADROOM (the source's seam): `pen` is the only PROVEN, filter-free
// render; pencil | crayon | boil are the API seam for future headroom, NOT shipped
// paths (selecting them today renders pen).
import { computed, onMounted, ref, useId, watch } from "vue";
import { NumericAnimation } from "@mkbabb/keyframes.js";
import type { TimingFunction } from "@mkbabb/keyframes.js";
import { easeOutCubic } from "@mkbabb/value.js";
import type { GlassUnderlinePaths } from "./types";

const props = withDefaults(
    defineProps<{
        /**
         * Which clock drives the draw. `load` (default) — the draw is a
         * `NumericAnimation` the parent's load `Sequence` fires once via `play()`.
         * `scroll` — native `view()` keyframes, bidirectional, no JS. `static` —
         * set drawn, no clock.
         */
        clock?: "load" | "scroll" | "static";
        /**
         * The render variant. `pen` is the only PROVEN, filter-free render.
         * pencil | crayon | boil are UNPROVEN headroom — the API seam for a future
         * wave, NOT shipped here (they render pen today).
         */
        variant?: "pen" | "pencil" | "crayon" | "boil";
        /** The stroke colour. Defaults to `var(--primary)` (re-resolves under .dark). */
        color?: string;
        /** The load-clock draw duration (ms). Default 700. */
        drawMs?: number;
        /**
         * The load-clock easing. Default `easeOutCubic` — doctrine-compliant (DEC-6):
         * ink is an irreversible additive reveal, so an overshooting spring would lay
         * ink past the end then retract it (the "never overshoot past gone" logic).
         * The value.js `TimingFunction` type (already a peer) serves a consumer's own
         * decelerating register (e.g. an expo).
         */
        easing?: TimingFunction;
        /**
         * The scroll-clock timeline name (DEC-5). Default the element's own `view()`.
         * Bound as `--gu-timeline`; the CSS reads `animation-timeline:
         * var(--gu-timeline, view())`. A consumer (`--beat-tl`, a named scroll
         * timeline) passes its own.
         */
        timeline?: string;
        /**
         * The declarative third clock (DEC-2). A thin overlay ON the load clock:
         * `undefined` (default) = source parity (seeds undrawn, parent fires
         * `play()`); bound: rising edge → play() (under PRM → snap()), falling edge
         * → reset to undrawn so re-activation REPLAYS, mount with `true` → plays.
         * Only meaningful with `clock="load"` (the other clocks rest drawn).
         */
        active?: boolean;
        /**
         * The geometry escape (DEC-7). The FULL geometry tuple
         * `{ stroke, ghost?, viewBox?, len? }` — a bare `d`-string escape silently
         * breaks the dash model when the consumer geometry's viewBox/length differ.
         * Defaults to the canonical pen + ghost.
         */
        paths?: GlassUnderlinePaths;
    }>(),
    {
        clock: "load",
        variant: "pen",
        color: undefined,
        drawMs: 700,
        easing: undefined,
        timeline: undefined,
        active: undefined,
        paths: undefined,
    },
);

// ── The PRM one-shot read (DEC-9 — the useCountup.ts idiom, NOT a live listener) ──
// SSR-safe (returns false). Every animation channel is ALREADY structurally fenced:
// the scroll clock by the outer CSS @media, the load clock by the engine flag — so
// this read serves only the initial `off` seeding + the `data-gu-clock` honesty.
function prefersReducedMotion(): boolean {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
        return false;
    }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
const reduced = prefersReducedMotion();

// ── The canonical geometry (byte-matched to the source — gate CONSUMER-FIDELITY) ──
// The arbitrary 0..100 × 0..10 viewBox; `preserveAspectRatio="none"` stretches it to
// the word's width. `GU_LEN` is the fixed over-long dasharray (DEC-10 — KEPT, no
// getTotalLength: STROKE_D and GHOST_D have different true lengths, so per-path
// exactness forks the single shared scalar; the over-long dash fully hides → fully
// draws regardless).
const GU_LEN = 120;
const STROKE_D = "M1,6 C18,3 30,8 48,5 S78,3 99,6";
const GHOST_D = "M1,7.1 C20,5 32,9 50,6.2 S80,5 99,7";

// Resolve the geometry — the `paths` escape carries the FULL tuple so an escaped
// geometry stays dash-coherent (its own viewBox + length).
const strokeD = computed(() => props.paths?.stroke ?? STROKE_D);
const ghostD = computed(() => props.paths?.ghost ?? GHOST_D);
const viewBox = computed(() => props.paths?.viewBox ?? "0 0 100 10");
const len = computed(() => props.paths?.len ?? GU_LEN);

const uid = useId();

// clock="scroll" opts into the native view() keyframe via this data-attr; load /
// static do not. Under PRM scroll downgrades to static (the @media never binds
// anyway — belt and suspenders, keeps the attr honest for the render-matrix probe).
const clockAttr = computed<"load" | "scroll" | "static">(() => {
    if (props.clock === "scroll") return reduced ? "static" : "scroll";
    return props.clock === "static" ? "static" : "load";
});

// The masthead draw scalar. Seeds FULLY UNDRAWN (offset = len) for the load clock so
// `play()` sweeps it to 0; static and scroll seed DRAWN (0). When `active: true` is
// the mount state, the watcher below plays from undrawn.
const off = ref<number>(
    props.clock === "load" && !reduced && props.active !== true ? len.value : 0,
);
let anim: NumericAnimation<{ off: number }> | null = null;

/**
 * CLOCK A — draw the underline ONCE. The awaitable a parent's load `Sequence` fires
 * as a causal link. Resolves a Promise so the Sequence can `await` it; under PRM it
 * snaps to drawn in one paint and resolves immediately. A no-op for scroll/static.
 */
async function play(): Promise<void> {
    if (props.clock !== "load") return;
    if (reduced) {
        off.value = 0;
        return;
    }
    anim?.stop();
    off.value = len.value;
    anim = new NumericAnimation<{ off: number }>([{ off: len.value }, { off: 0 }], {
        duration: props.drawMs,
        timingFunction: props.easing ?? easeOutCubic,
        respectReducedMotion: true,
    });
    await anim.play((v) => {
        off.value = v.off;
    });
}

/** Snap to terminal (drawn) — the PRM / interrupt path. */
function snap(): void {
    anim?.stop();
    off.value = 0;
}

/** Reset to undrawn — the `active` falling-edge so a re-rise REPLAYS (DEC-2). */
function reset(): void {
    anim?.stop();
    off.value = props.clock === "load" && !reduced ? len.value : 0;
}

// ── The `active` declarative overlay (DEC-2) — a thin watch OVER play()/snap() ────
// Only meaningful with clock="load" (the other clocks rest drawn — binding there is
// a no-op). Rising edge → play() (under PRM → snap()); falling edge → reset to
// undrawn so re-activation REPLAYS (parity with the slides' CSS `[data-state]`
// semantics — removing the attr drops the rule + the dashoffset reverts). Mount with
// `active: true` → plays (the `off` seed above starts drawn-ready, this draws it).
watch(
    () => props.active,
    (now, prev) => {
        if (props.clock !== "load") return;
        if (now === true && prev !== true) {
            if (reduced) snap();
            else void play();
        } else if (now === false && prev === true) {
            reset();
        }
    },
);
onMounted(() => {
    if (props.clock === "load" && props.active === true) {
        if (reduced) snap();
        else void play();
    }
});

defineExpose({ play, snap });
</script>

<template>
    <!-- The picked-out content + the inline pen underline drawn beneath it.
         `white-space: nowrap` keeps the content (and its ink) on one line; the SVG is
         `pointer-events: none` so the mark never intercepts the content's interaction. -->
    <span
        class="glass-underline"
        :data-gu-clock="clockAttr"
        :data-gu-variant="variant"
        :style="timeline ? { '--gu-timeline': timeline } : undefined"
    >
        <slot />
        <svg
            class="glass-underline__ink"
            :viewBox="viewBox"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
            :style="{ '--gu-off': String(off), '--gu-len': String(len) }"
        >
            <!-- The primary pen stroke + the faint PEN ghost overdraw (a SECOND pen
                 pass, NOT a feTurbulence filter). Both draw on the SAME `--gu-off`
                 scalar (load) or the SAME `view()` keyframe (scroll). -->
            <path
                :id="`gu-stroke-${uid}`"
                class="glass-underline__stroke"
                :d="strokeD"
            />
            <path
                class="glass-underline__stroke glass-underline__stroke--ghost"
                :d="ghostD"
            />
        </svg>
    </span>
</template>

<style scoped>
/* The wrapping span — the content stays nowrap so the ink spans exactly its width. */
.glass-underline {
    position: relative;
    white-space: nowrap;
}

/* The ink SVG sits just under the baseline, a hair wider than the content so the
   round caps and the wobble overshoot spill past the box (the mark never clips to
   the glyph edge). Every geometric axis reads a `--gu-*` custom property (DEC-3) so
   a bolder register is a token override, not a geometry fork; the defaults byte-match
   the source. */
.glass-underline__ink {
    position: absolute;
    inset-inline: -0.06em;
    inset-block-end: var(--gu-ink-offset, -0.18em);
    width: calc(100% + 0.12em);
    height: var(--gu-ink-height, 0.5em);
    overflow: visible;
    pointer-events: none;
}

/* The pen stroke — a non-uniform-feeling round-cap line. The DRAW is the dash: the
   whole path is one dash (`stroke-dasharray: --gu-len`), offset fully out by default
   (`stroke-dashoffset: --gu-off`), and a clock drives `--gu-off` → 0 (drawn).
   FILTER-FREE — no `filter:` ever (the PEN invariant). The default stroke is
   `var(--primary)` (re-resolves under `.dark` by cascade — DEC-4, no `.dark` block);
   an explicit `color` prop wins via v-bind. */
.glass-underline__stroke {
    fill: none;
    stroke: v-bind('props.color ?? "var(--primary)"');
    stroke-width: var(--gu-stroke-width, 2.4);
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: var(--gu-len, 120);
    stroke-dashoffset: var(--gu-off, 0);
}
/* The faint PEN ghost overdraw — a second, fatter, low-opacity pen pass (NOT crayon
   grain, NOT a filter): the "a hand never lays one clean line" read, one extra
   <path>. The ghost width DERIVES from the one knob (`+1` user-unit, the source
   pair) so the bolder register is a single-token override (DEC-3). */
.glass-underline__stroke--ghost {
    stroke-width: calc(var(--gu-stroke-width, 2.4) + 1);
    opacity: 0.16;
}

/* ── CLOCK B — the native scroll draw (bidirectional, free) ──────────────────────
   A scroll-clock underline keys to a `view()` timeline so it draws as the content
   enters and UN-DRAWS on scroll-up. The OUTER `@media (PRM: no-preference)` is the
   structural fence — under reduced motion the block never binds and the stroke rests
   drawn (its base `--gu-off: 0`). The INNER `@supports` gates on the native timeline;
   where it is absent (jsdom, SSR, older engines) the stroke simply rests drawn — no
   JS fallback needed for a delight-only mark (the emphasis is the colour, present
   regardless). The timeline name is `var(--gu-timeline, view())` (DEC-5) so a
   consumer binds its own named timeline via the `timeline` prop. */
@media (prefers-reduced-motion: no-preference) {
    @supports ((animation-timeline: view()) and (animation-range: entry)) {
        @keyframes gu-draw {
            from {
                stroke-dashoffset: var(--gu-len, 120);
            }
            to {
                stroke-dashoffset: 0;
            }
        }
        .glass-underline[data-gu-clock="scroll"] .glass-underline__stroke {
            /* `auto` duration = timeline-owned; `linear` because the timeline IS the
               easing axis; `both` holds the terminal frame past the range. */
            animation: gu-draw auto linear both;
            animation-timeline: var(--gu-timeline, view());
            /* Draws as the content enters — a slim window so the ink lands while the
               element is still climbing into view, not after it has settled. */
            animation-range: entry 12% cover 36%;
        }
    }
}
</style>
