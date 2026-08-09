<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed, nextTick, ref, watch } from "vue";
import { cn } from "../_shared/class-names";
import { sequenceWindow, type SequenceWindowPolicy } from "../deck";
import { usePagerWorm } from "./worm";

/* PagerDots — the ONE position-dot rail, and the survivor of the fold.
   Both registers compose it: the carousel's dots and the deck's group pager are
   this component, over the substrate's ONE window oracle.

   THE WORM IS FILTERLESS. It was an SVG blur-and-threshold graph plus a Bézier
   clip-path floor, bought at a canon-forbidden `filter: url()` for one or two
   pixels of concavity on a thirteen-pixel body, with a hardcoded girth constant
   painting on a hundred percent of frames under a comment describing a well that
   never welled — and the `@supports not (filter: url())` floor beneath it was
   unreachable, because both shipping engines answer that probe true. With the
   neck at the bodies' own diameter the {circle, rect, circle} union IS a stadium,
   exactly, and the goo-morph edict is kept where it was always kept: `translate`
   and `scale`. Elongate, travel, reunite. Nobody proposed a cross-fade.

   THREE LAYERS, and the split survives the filter's deletion because it was never
   about the filter: a crisp BED of N pips, the WORM masses above it, and the
   transparent hit-targets above both, which own every scrap of interaction.

   THE WORM IS OPAQUE NOW, and one token closed two defects with it: at 0.65 the
   indicator carried the entire active/inactive distinction at 2.223:1 against a
   sole-carrier law demanding 3:1, AND composited over the undimmed bed pips into
   a frame-dependent multi-level slug. At 1 it occludes what it sits on, so the
   bed's active-pip dimming has nothing left to dim and is gone with its token.

   THE RAIL OWNS THE ONLY PAGING KEYS IN THE LIBRARY. No `window` listener, no
   `document` listener, anywhere in this component or the carousel: the contract
   is bound to this root, over a rail of buttons, which is the one register that
   was measured correct. */

export interface PagerDotsProps {
    /** Total dot count (the member count). */
    count: number;
    /** Rail layout axis. Default horizontal. */
    orientation?: "horizontal" | "vertical";
    /**
     * When set, window the rail to `fit` dots around the active dot. Off
     * (undefined) → show every dot.
     */
    windowFit?: number;
    /** Encapsulate the rail in the glass pager pill chassis. Default true. */
    ring?: boolean;
    /**
     * The ARIA register. `"group"` (default) is the presentation rail
     * (`role="group"` / `aria-current`); `"tabs"` is the panel-nav register
     * (`role="tablist"` / `role="tab"` / `aria-selected`) and is only correct when
     * the consumer owns real panels and passes `panelIds` — four tablists over
     * zero tabpanels is harm, not a default.
     */
    pattern?: "tabs" | "group";
    /**
     * The tab↔panel linkage — index-aligned panel element ids. `"tabs"` only.
     * A sparse or absent entry emits no `aria-controls`.
     */
    panelIds?: string[];
    /**
     * Resolve a member's accessible name for the step announcement. With it the
     * rail announces "Slide 3 of 8: Materials"; without it, "Slide 3 of 8".
     */
    slideLabel?: (index: number) => string;
    /** Announce the step in an owned polite region. Default true. */
    announce?: boolean;
    /** Accessible name for the rail group. */
    ariaLabel?: string;
    /** Additional classes for the rail root. */
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<PagerDotsProps>(), {
    orientation: "horizontal",
    ring: true,
    pattern: "group",
    announce: true,
    ariaLabel: "Pager",
});

const emit = defineEmits<{ (e: "select", index: number): void }>();

/** v-model:active — the active 0-based index. */
const active = defineModel<number>("active", { default: 0 });

const count = computed(() =>
    Number.isFinite(props.count) ? Math.max(0, Math.trunc(props.count)) : 0,
);
const activeIndex = computed(() =>
    count.value === 0
        ? 0
        : Math.min(count.value - 1, Math.max(0, Math.round(active.value || 0))),
);
watch(
    [count, active],
    ([, index]) => {
        if (index !== activeIndex.value) active.value = activeIndex.value;
    },
    { immediate: true },
);

const rootEl = ref<HTMLElement | null>(null);
// the WORM layer — the masses' positioning context (the coordinate origin).
const wormLayerEl = ref<HTMLElement | null>(null);
const bodyAEl = ref<HTMLElement | null>(null);
const bodyBEl = ref<HTMLElement | null>(null);
const neckEl = ref<HTMLElement | null>(null);

// per-index dot element map (keyed by member index, NOT render position).
const dotEls = new Map<number, HTMLButtonElement>();
function setDot(i: number, el: Element | null): void {
    if (el) dotEls.set(i, el as HTMLButtonElement);
    else dotEls.delete(i);
}
// the crisp bed pips — the worm's geometry memo measures this grid.
const bedDotEls = new Map<number, HTMLElement>();
function setBedDot(i: number, el: Element | null): void {
    if (el) bedDotEls.set(i, el as HTMLElement);
    else bedDotEls.delete(i);
}

const vertical = computed(() => props.orientation === "vertical");

// ── THE WINDOW, AND ITS TWO POLICIES ────────────────────────────────────────
// A recentring window and a pointer are incompatible: recentring on a pointer
// activation slid the touched dot ninety pixels out from under the finger that
// touched it. So a POINTER activation nudges — the minimum slide keeping the
// activated index one cell inside the edge — and a keyboard or programmatic step
// recentres, which is what a keyboard user wants and what a pointer user cannot
// tolerate.
const windowStart = ref(0);
const nextPolicy = ref<SequenceWindowPolicy>("recentre");

const win = computed(() =>
    props.windowFit && props.windowFit > 0
        ? sequenceWindow(count.value, activeIndex.value, props.windowFit, {
              from: windowStart.value,
              policy: nextPolicy.value,
          })
        : {
              shown: Array.from({ length: count.value }, (_, i) => i),
              start: 0,
              clippedStart: false,
              clippedEnd: false,
          },
);
const shown = computed(() => win.value.shown);

/** The rank a pip's FLIP stagger reads — distance from the active member. */
function pipRank(i: number): number {
    return Math.abs(i - activeIndex.value);
}

// THE BED FLIP. When the window slides, the members that survive it are drawn one
// or more cells from where they were, and an instant redraw is the defect that
// made five of eight interior hops paint zero indicator travel: the active pip
// stayed dead centre and the rail teleported around it. So the surviving pips are
// placed back where the eye last saw them and released to their new cells on the
// coordinated-travel spring, staggered outward from the active one. One hop reads
// as one hop, because one pitch of relative travel is painted either way.
function flipBed(delta: number): void {
    if (!delta) return;
    const first = bedDotEls.get(shown.value[0]!);
    const second = bedDotEls.get(shown.value[1]!);
    if (!first || !second) return;
    const pitch = vertical.value
        ? second.offsetTop - first.offsetTop
        : second.offsetLeft - first.offsetLeft;
    const offset = delta * pitch;
    for (const el of bedDotEls.values()) {
        el.dataset.flip = "";
        el.style.setProperty("--pip-flip", `${offset.toFixed(2)}px`);
    }
    requestAnimationFrame(() => {
        for (const el of bedDotEls.values()) {
            delete el.dataset.flip;
            el.style.setProperty("--pip-flip", "0px");
        }
    });
}

watch(
    () => win.value.start,
    (next, prev) => {
        windowStart.value = next;
        nextPolicy.value = "recentre";
        void nextTick(() => flipBed((prev ?? next) - next));
    },
);

// The worm's geometry memo, elongation band, projection and driver.
usePagerWorm({
    rootEl,
    wormLayerEl,
    bodyAEl,
    bodyBEl,
    neckEl,
    bedDotEls,
    shown,
    vertical,
    active: activeIndex,
});

// keyboard focus survives a window recompute: if the focused dot scrolled out of
// the window (so its button unmounts), move focus to the active dot, never <body>.
watch(shown, (next) => {
    const el = rootEl.value;
    if (!el || !el.contains(document.activeElement)) return;
    const focused = document.activeElement as HTMLElement;
    const stillShown = next.some((i) => dotEls.get(i) === focused);
    if (!stillShown) {
        void nextTick(() => dotEls.get(activeIndex.value)?.focus());
    }
});

function select(i: number, policy: SequenceWindowPolicy = "recentre"): void {
    nextPolicy.value = policy;
    active.value = i;
    emit("select", i);
}

/** A pointer activation. The touched dot must not move under the pointer. */
function press(i: number): void {
    select(i, "nudge");
}

// The hand's state, held where the paint is. The pips live in the bed layer and
// the pointer is over a button in a different layer, so no CSS selector relates
// them; two integers do. Before this, rest, hover and press computed
// byte-identical on a rail whose own README promised a hover.
const hoverIndex = ref<number | null>(null);
const pressIndex = ref<number | null>(null);
function releasePress(): void {
    pressIndex.value = null;
}

// ── THE ROVING-TABINDEX CONTRACT — the library's ONE paging key table ────────
// Exactly one tab stop; axis-derived arrows; Home/End; PageUp/PageDown; digit
// jumps 1–9; wrapping; disabled dots skipped. Focus follows activation, because a
// keyboard step IS a selection.
const tabStopIndex = computed(() => {
    const s = shown.value;
    if (s.length === 0) return -1;
    return s.includes(activeIndex.value) ? activeIndex.value : s[0]!;
});
function rovingTabindex(i: number): number {
    return i === tabStopIndex.value ? 0 : -1;
}

function focusSlide(i: number): void {
    select(i);
    void nextTick(() => dotEls.get(i)?.focus());
}
function stepTo(from: number, dir: 1 | -1): void {
    const n = count.value;
    if (n === 0) return;
    for (let step = 1; step <= n; step++) {
        const i = (from + dir * step + n * step) % n; // wrap
        if (!dotEls.get(i)?.disabled) {
            focusSlide(i);
            return;
        }
    }
}
function edgeTo(edge: "first" | "last"): void {
    const n = count.value;
    if (n === 0) return;
    const order =
        edge === "first"
            ? Array.from({ length: n }, (_, i) => i)
            : Array.from({ length: n }, (_, i) => n - 1 - i);
    for (const i of order) {
        if (!dotEls.get(i)?.disabled) {
            focusSlide(i);
            return;
        }
    }
}
// The listener is bound to THIS ROOT, over a rail of buttons — so the guard is
// narrow by construction and only has to catch a consumer slotting an editable
// control into the rail. The library authors no `window`/`document` key listener.
function isEditable(target: EventTarget | null): boolean {
    const el = target as (Element & { closest?: Element["closest"] }) | null;
    return !!el?.closest?.("input, textarea, select, [contenteditable]");
}
function onKeydown(e: KeyboardEvent): void {
    if (isEditable(e.target)) return;
    const from = activeIndex.value;
    const nextKey = vertical.value ? "ArrowDown" : "ArrowRight";
    const prevKey = vertical.value ? "ArrowUp" : "ArrowLeft";
    let handled = true;
    switch (e.key) {
        case nextKey:
        case "PageDown":
            stepTo(from, 1);
            break;
        case prevKey:
        case "PageUp":
            stepTo(from, -1);
            break;
        case "Home":
            edgeTo("first");
            break;
        case "End":
            edgeTo("last");
            break;
        default:
            if (e.key >= "1" && e.key <= "9") {
                const i = parseInt(e.key, 10) - 1;
                if (i < count.value) focusSlide(i);
                else handled = false;
            } else {
                handled = false;
            }
            break;
    }
    if (handled) e.preventDefault(); // no page scroll on the navigation keys
}

// THE ANNOUNCER, rehomed. The deck's headless core computed this string and
// nothing rendered it, while the carousel route's one live region sat empty. The
// rail owns the count, the active index and the accessible name; it owns this.
const liveMessage = computed(() => {
    const base = `Slide ${activeIndex.value + 1} of ${count.value}`;
    const name = props.slideLabel?.(activeIndex.value);
    return name ? `${base}: ${name}` : base;
});
</script>

<template>
    <div
        ref="rootEl"
        data-slot="pager-dots"
        :role="pattern === 'group' ? 'group' : 'tablist'"
        :aria-label="ariaLabel"
        :aria-orientation="pattern === 'group' ? undefined : orientation"
        :data-orientation="orientation"
        @keydown="onKeydown"
        :class="
            cn(
                'pager-dots inline-flex items-center justify-center',
                ring && 'glass-pager-ring',
                orientation === 'vertical' && 'flex-col',
                props.class,
            )
        "
    >
        <!-- THE BED LAYER — N crisp pips, never filtered. It mirrors the button
             grid off the SAME gap token, so a bed pip centre IS a dot centre. -->
        <div class="pager-bed-layer" aria-hidden="true">
            <span
                v-for="i in shown"
                :key="i"
                :ref="(el) => setBedDot(i, el as Element | null)"
                class="goo-dot"
                :style="{ '--pip-rank': pipRank(i) }"
                :data-active="i === activeIndex ? '' : undefined"
                :data-hover="i === hoverIndex ? '' : undefined"
                :data-press="i === pressIndex ? '' : undefined"
                :data-edge="
                    (i === shown[0] && win.clippedStart) ||
                    (i === shown[shown.length - 1] && win.clippedEnd)
                        ? ''
                        : undefined
                "
            />
        </div>

        <!-- THE WORM LAYER — the three masses, the ink once, no filter. -->
        <div ref="wormLayerEl" class="pager-worm-layer" aria-hidden="true">
            <span ref="bodyAEl" class="goo-body" />
            <span ref="neckEl" class="goo-neck" />
            <span ref="bodyBEl" class="goo-body" />
        </div>

        <!-- THE INTERACTION LAYER — the transparent hit-targets. -->
        <button
            v-for="(i, k) in shown"
            :key="i"
            :ref="(el) => setDot(i, el as Element | null)"
            type="button"
            :role="pattern === 'group' ? undefined : 'tab'"
            :aria-selected="pattern === 'group' ? undefined : i === activeIndex"
            :aria-controls="
                pattern === 'group' ? undefined : panelIds?.[i] || undefined
            "
            :aria-current="
                pattern === 'group' && i === activeIndex ? 'true' : undefined
            "
            :aria-label="`Go to slide ${i + 1}`"
            :tabindex="rovingTabindex(i)"
            :data-active="i === activeIndex ? '' : undefined"
            :data-edge="
                (k === 0 && win.clippedStart) ||
                (k === shown.length - 1 && win.clippedEnd)
                    ? ''
                    : undefined
            "
            data-slot="pager-dot"
            class="pager-dot focus-ring"
            @click="press(i)"
            @pointerenter="hoverIndex = i"
            @pointerleave="hoverIndex === i && (hoverIndex = null)"
            @pointerdown="pressIndex = i"
            @pointerup="releasePress"
            @pointercancel="releasePress"
        />

        <!-- The step announcement's owned region. -->
        <span
            v-if="announce"
            class="sr-only"
            role="status"
            aria-live="polite"
            aria-atomic="true"
            >{{ liveMessage }}</span
        >
    </div>
</template>

<style scoped>
/* ── PagerDots — the position rail + the liquid dot-MORPH worm ────────────────
   Three layers: a crisp bed, the worm masses, the transparent hit-targets. Every
   paint reads a `--pager-*` token (the consumer retint seam). */

.pager-dots {
    /* THE ONE RAIL GAP — the bed, the buttons and the ring chassis all read it.
       A second gap literal cannot exist, so the eight-pixel bed/button drift is
       structurally unreachable rather than fixed. */
    --pager-rail-gap: var(--space-residue);
    /* the hit cell: 24px, WCAG 2.5.8 AA, a NAMED law rather than a series rung.
       The transparent target IS the cell — a target larger than its cell needed a
       negative margin to pull it back, and two knobs to tune the pair. Zero knobs
       beat two. */
    --pager-hit-cell: 1.5rem;
    --pager-dot-size: var(--space-body); /* 12px — the worm body's D */
    --pager-dot-active: var(--foreground);
    --pager-dot-inactive: color-mix(in srgb, var(--foreground) 52%, transparent);
    --pager-dot-hover: color-mix(in srgb, var(--foreground) 72%, transparent);

    /* the worm layer's ink, ONCE at the layer. OPAQUE: it is the sole carrier of
       the active/inactive distinction, and it occludes the bed it sits on. */
    --pager-worm-layer-opacity: 1;
    /* the travel-squish scalar (1 at rest), written per frame by the driver. */
    --stretch: 1;
    /* the FLIP stagger step, off the motion canon's own stagger rung. */
    --pager-flip-stagger: calc(var(--motion-stagger-default) * 0.15);

    gap: var(--pager-rail-gap);
    position: relative;
}

/* THE BED LAYER — N crisp pips, NEVER filtered. */
.pager-bed-layer {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--pager-rail-gap);
    pointer-events: none;
    color: var(--pager-dot-active);
}
.pager-dots[data-orientation="vertical"] .pager-bed-layer {
    flex-direction: column;
}

.goo-dot {
    flex: 0 0 var(--pager-hit-cell);
    width: var(--pager-hit-cell);
    height: var(--pager-hit-cell);
    display: grid;
    place-items: center;
    /* the window-slide FLIP: placed back where the eye last saw it, released on
       the coordinated-travel spring, staggered outward from the active pip. */
    translate: var(--pip-flip, 0px) 0;
    transition: translate var(--spring-dock-duration) var(--spring-dock);
    transition-delay: calc(var(--pip-rank, 0) * var(--pager-flip-stagger));
}
.pager-dots[data-orientation="vertical"] .goo-dot {
    translate: 0 var(--pip-flip, 0px);
}
.goo-dot[data-flip] {
    transition: none;
}
.goo-dot::before {
    content: "";
    width: var(--pager-dot-size);
    height: var(--pager-dot-size);
    border-radius: var(--radius-pill);
    background: var(--pager-dot-inactive);
    transition:
        background-color var(--duration-fast) var(--ease-standard),
        scale var(--spring-press-duration) var(--spring-press);
}
/* a clipped window edge cue — a smaller pip. */
.goo-dot[data-edge]::before {
    width: calc(var(--pager-dot-size) * 0.5);
    height: calc(var(--pager-dot-size) * 0.5);
    opacity: 0.6;
}

/* THE WORM LAYER — the three masses and the ink, once. No filter, ever: the
   {circle, rect, circle} union at full girth IS a stadium. */
.pager-worm-layer {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: var(--pager-worm-layer-opacity, 1);
    color: var(--pager-dot-active);
    contain: layout paint;
    isolation: isolate;
}

/* THE WORM MASSES. They reserve their resting footprint ONCE; the travel is all
   `translate`, the squash is the CSS `scale` reciprocal, the neck's span is
   `scale`. Never an animated width (motion-canon P5). */
.goo-body,
.goo-neck {
    position: absolute;
    top: 50%;
    left: 0;
    width: var(--pager-dot-size);
    height: var(--pager-dot-size);
    margin-top: calc(var(--pager-dot-size) / -2);
    margin-left: calc(var(--pager-dot-size) / -2);
    background: currentColor;
    transform-origin: center;
    /* ENGAGE-ONLY: the compositor hint is armed while the worm is in flight and
       released when it parks — a permanent `will-change` is a permanent layer. */
    will-change: auto;
}
.pager-dots[data-orientation="vertical"] .goo-body,
.pager-dots[data-orientation="vertical"] .goo-neck {
    top: 0;
    left: 50%;
}

.goo-body {
    border-radius: var(--radius-pill);
    scale: var(--stretch, 1) calc(1 / var(--stretch, 1));
}
.pager-dots[data-orientation="vertical"] .goo-body {
    scale: calc(1 / var(--stretch, 1)) var(--stretch, 1);
}

/* THE NECK — the stadium's body. A rect of the bodies' own diameter bridging two
   circles of that diameter IS a stadium; there is nothing left for a filter to
   merge, and the driver only spans it. */
.goo-neck {
    border-radius: 0;
    opacity: 0;
}

/* ── THE INTERACTION LAYER — the hit-targets ─────────────────────────────── */
.pager-dot {
    position: relative;
    z-index: 1;
    /* target ≡ cell, so the inset is identically zero and does not exist */
    width: var(--pager-hit-cell);
    height: var(--pager-hit-cell);
    padding: 0;
    border: 0;
    cursor: pointer;
    background: transparent;
}

/* THE RAIL IS ALIVE IN THE HAND. Rest, hover and press computed byte-identical
   before this: the hover token was declared and README-promised with zero rules
   to read it, and the press squish scaled a childless transparent box. The pip is
   what a reader sees, so the pip is what responds — one step brighter and one
   step larger under the pointer, and it gives under the press. */
@media (hover: hover) {
    .goo-dot[data-hover]::before {
        background: var(--pager-dot-hover);
        scale: 1.14;
    }
}
.goo-dot[data-press]::before {
    scale: 0.97;
}

/* COARSE POINTERS get the 44px floor (A6). The painted pip does not grow — the
   TARGET does, which is the whole distinction the rung exists to make. */
@media (pointer: coarse) {
    .pager-dots {
        --pager-hit-cell: var(--touch-target);
    }
}

@media (prefers-reduced-motion: reduce) {
    /* P6 — the worm seats on the target with zero in-between frames, the bed does
       not FLIP, and only the fade survives. */
    .goo-body,
    .goo-neck {
        scale: 1 1;
    }
    .goo-dot {
        transition: none;
    }
}
</style>
