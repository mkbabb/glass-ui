<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed, nextTick, ref, watch } from "vue";
import { cn } from "../../../utils";

/* PagerDots — the ONE position-dot rail register (BA.W-PAGER, R10-1 + R10-3).
   The shared oracle the carousel ships and the slides deck adopts: the carousel
   dots and the slides `DeckPager` were ALREADY one recipe (CarouselDots was
   "re-authored from first principles against the slides DeckPager oracle"); this
   primitive HARVESTS that convergence — it is NOT a new substrate. ≥2 consumers
   by construction: the carousel (consumer #1, this batch) + the slides DeckPager
   (consumer #2, adopts at the BA cut via the W-CLOSE adopt-book).

   The pip anatomy is the oracle: a 24px hit-box (WCAG 2.5.8 target-size) with a
   ::before-painted pip centered by the grid; 6px base diameter; the active dot
   ELONGATES along the rail axis into a pill (a REAL emitted morph on the governed
   `--spring-dock` register, NOT a stuck progress fill); inactive 52% / hover 72%
   / active full `--foreground`. Every paint reads a `--pager-dot-*` token, so a
   consumer retints with zero fork — slides sets `--pager-dot-active:
   var(--ncsu-red)` (presets-in-consumers; the Wolfpack brand NEVER enters library
   tokens).

   WINDOWING (`windowFit`, off by default) — generalizes DeckPager's
   `--deck-pager-fit` dock-gutter overflow ladder: when set, the rail windows
   `fit` dots centered on the active index (the window slides as you navigate),
   with dimmed `is-edge` cues at a clipped boundary. The window math is PURE +
   DOM-free (no deck-engine import — the boundary verdict fences the router/deck
   coupling slides-local; we lift only the pure windowing function). Keyboard
   focus survives a window recompute (the focused dot scrolling out moves focus to
   the active dot, never to <body>).

   RING (`ring`, default true) — composes `.glass-pager-ring` (glass/surfaces.css),
   the glass-floating pill chassis (the DockRail-chip recipe: `--glass-bg-floating`
   + blur + edge-light/specular + radius-pill + the `.dark` arm). NEVER an opaque
   `bg-card` slab (the R9/R10-5 dark-slab offender class). A deck/dock that owns its
   own ambient glass host sets `ring="false"` so the dots sit FLUSH on it. */

export interface PagerDotsProps {
    /** Total dot count (the slide/snap count). */
    count: number;
    /** Rail layout axis. Default horizontal. */
    orientation?: "horizontal" | "vertical";
    /**
     * When set, window the rail to `fit` dots centered on the active dot
     * (the DeckPager dock-gutter overflow generalized). Off (undefined) →
     * show every dot.
     */
    windowFit?: number;
    /** Encapsulate the rail in the glass pager pill chassis. Default true. */
    ring?: boolean;
    /** Accessible name for the rail group. */
    ariaLabel?: string;
    /** Additional classes for the rail root. */
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<PagerDotsProps>(), {
    orientation: "horizontal",
    ring: true,
    ariaLabel: "Pager",
});

const emit = defineEmits<{ (e: "select", index: number): void }>();

/** v-model:active — the active 0-based index. */
const active = defineModel<number>("active", { default: 0 });

const rootEl = ref<HTMLElement | null>(null);

// per-slide-index dot element map (keyed by the slide index `i`, NOT the render
// position): the focus-recovery does an identity check against these refs.
const dotEls = new Map<number, HTMLButtonElement>();
function setDot(i: number, el: Element | null): void {
    if (el) dotEls.set(i, el as HTMLButtonElement);
    else dotEls.delete(i);
}

/** The dot-window the rail renders for a given allotment: every index while they
    all fit, else `fit` indices centered on the active and clamped to the ends,
    with edge flags cueing more beyond. Pure + DOM-free (lifted from the slides
    `pagerWindow` oracle — the boundary verdict rides the pure math with the dots,
    never the deck engine). */
function pagerWindow(
    total: number,
    activeIndex: number,
    fit: number,
): { shown: number[]; clippedStart: boolean; clippedEnd: boolean } {
    const m = Math.max(1, Math.min(fit, total));
    const start =
        total <= m ? 0 : Math.max(0, Math.min(activeIndex - Math.floor(m / 2), total - m));
    const length = Math.min(m, total);
    const shown = Array.from({ length }, (_, i) => start + i);
    return {
        shown,
        clippedStart: shown.length > 0 && shown[0]! > 0,
        clippedEnd: shown.length > 0 && shown[shown.length - 1]! < total - 1,
    };
}

const win = computed(() =>
    props.windowFit && props.windowFit > 0
        ? pagerWindow(props.count, active.value, props.windowFit)
        : {
              shown: Array.from({ length: Math.max(0, props.count) }, (_, i) => i),
              clippedStart: false,
              clippedEnd: false,
          },
);
const shown = computed(() => win.value.shown);

// keyboard focus survives a window recompute: if the focused dot scrolled out of
// the window (so its button unmounts), move focus to the active dot, never <body>.
// Identity check against the per-index dot map — no aria-label string rebuild.
watch(shown, (next) => {
    const el = rootEl.value;
    if (!el || !el.contains(document.activeElement)) return;
    const focused = document.activeElement as HTMLElement;
    const stillShown = next.some((i) => dotEls.get(i) === focused);
    if (!stillShown) {
        void nextTick(() => dotEls.get(active.value)?.focus());
    }
});

function select(i: number): void {
    active.value = i;
    emit("select", i);
}
</script>

<template>
    <div
        ref="rootEl"
        data-slot="pager-dots"
        role="tablist"
        :aria-label="ariaLabel"
        :aria-orientation="orientation"
        :data-orientation="orientation"
        :class="
            cn(
                'pager-dots inline-flex items-center justify-center gap-1.5',
                ring && 'glass-pager-ring',
                orientation === 'vertical' && 'flex-col',
                props.class
            )
        "
    >
        <button
            v-for="(i, k) in shown"
            :key="i"
            :ref="(el) => setDot(i, el as Element | null)"
            type="button"
            role="tab"
            :aria-selected="i === active"
            :aria-label="`Go to slide ${i + 1}`"
            :data-active="i === active ? '' : undefined"
            :data-edge="
                (k === 0 && win.clippedStart) || (k === shown.length - 1 && win.clippedEnd)
                    ? ''
                    : undefined
            "
            data-slot="pager-dot"
            class="pager-dot focus-ring tap-squish"
            @click="select(i)"
        />
    </div>
</template>

<style scoped>
/* ── PagerDots — the ONE position-dot register (BA.W-PAGER) ──────────────────
   The shared oracle (carousel dots ≡ slides DeckPager): a 24px hit-box with a
   ::before pip, the active dot elongating into a pill on `--spring-dock`. Every
   paint reads a `--pager-dot-*` token so a consumer retints with zero fork.
   Inactive 52% / hover 72% / active full `--pager-dot-active` — the
   foreground-over-transparent house pattern, dark/light-safe BY CONSTRUCTION
   (`--foreground` flips under `.dark`). CONTRAST: 52% clears ≥3:1 (WCAG 1.4.11
   non-text) in BOTH schemes on the composited translucent surface (the DeckPager
   oracle value — the token ladder tops at 40%, below the floor in light). */

.pager-dot {
    /* the per-rail dot tokens — a consumer retints by overriding these:
         --pager-dot-active  : the active fill (default --foreground; slides → --ncsu-red)
         --pager-dot-inactive: the resting fill (default 52% foreground)
         --pager-dot-hover   : the hover fill (default 72% foreground) */
    --pager-dot-size: 0.375rem; /* 6px base pip diameter */
    --pager-dot-elongated: 1.5rem; /* 24px active elongation along the rail axis */
    --pager-dot-active: var(--foreground);
    --pager-dot-inactive: color-mix(in srgb, var(--foreground) 52%, transparent);
    --pager-dot-hover: color-mix(in srgb, var(--foreground) 72%, transparent);
    /* ≥24px hit target (WCAG 2.5.8) via a transparent box; the painted dot is
       centered by the grid. */
    width: 24px;
    height: 24px;
    padding: 0;
    border: 0;
    cursor: pointer;
    background: transparent;
    display: grid;
    place-items: center;
}

.pager-dot::before {
    content: "";
    width: var(--pager-dot-size);
    height: var(--pager-dot-size);
    border-radius: var(--radius-pill);
    background: var(--pager-dot-inactive);
    /* §6 EASING DOCTRINE — the elongation is a SIZE morph (the iOS-control
       register), so it rides the governed `--spring-dock` clock + its calibrated
       per-spring `--spring-dock-duration` (the W-GLASS-CAL Unit 3 vocabulary; NOT
       a raw `--duration-normal`). The background cross-fade rides the bezier
       `--ease-standard` (a colour cross-fade reads as a wobble on a spring). */
    transition:
        width var(--spring-dock-duration) var(--spring-dock),
        height var(--spring-dock-duration) var(--spring-dock),
        opacity var(--duration-fast) var(--ease-standard),
        background var(--duration-fast) var(--ease-standard);
}

.pager-dot:hover::before {
    background: var(--pager-dot-hover);
}

/* Active — the REAL emitted morph: the painted dot elongates along the rail axis
   (horizontal → width; vertical → height) and lifts to the active fill. The
   orientation is keyed off the rail's `aria-orientation`/`data-orientation`. */
.pager-dot[data-active]::before {
    width: var(--pager-dot-elongated);
    background: var(--pager-dot-active);
}
.pager-dots[aria-orientation="vertical"] .pager-dot[data-active]::before {
    width: var(--pager-dot-size);
    height: var(--pager-dot-elongated);
}

/* A clipped window edge (windowFit) — a smaller, dimmer dot cues more beyond. */
.pager-dot[data-edge]::before {
    width: calc(var(--pager-dot-size) * 0.5);
    height: calc(var(--pager-dot-size) * 0.5);
    opacity: 0.5;
}
.pager-dot[data-edge][data-active]::before {
    width: var(--pager-dot-elongated);
    height: var(--pager-dot-size);
    opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
    .pager-dot::before {
        transition: background var(--duration-fast) var(--ease-standard);
    }
}
</style>
