<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed, nextTick, ref, useId, watch } from "vue";
import { cn } from "../_shared/class-names";
import { pagerWindow } from "./pagerWindow";
import { usePagerWorm } from "./composables/usePagerWorm";

/* PagerDots — the ONE position-dot rail register.
   The shared oracle the carousel ships and the slides deck adopts. ≥2 consumers by
   construction: the carousel + the deck story composing `<PagerDots pattern="group"
   :ring="false">` directly.

   THE LIQUID DOT-MORPH WORM. The selected indicator STRETCHES,
   TRAVELS, and RE-FORMS on the next dot with liquid weight (the Google-worm edict) —
   a two-edge worm: a LEAD edge springs toward the target dot, a TRAIL edge lags then
   catches up (`useLeadTrail`, the ONE shared driver), and the gap between them is the
   live elongation. The paint is a THREE-LAYER split so the filter is DECOUPLED from
   the bed by construction (the σ8 whole-layer-filter annihilation that painted an
   EMPTY pill is structurally impossible now):

   • THE BED LAYER (`.pager-bed-layer`, aria-hidden) — N crisp CSS circles, NO filter,
     EVER (the rail bed). The active bed pip dims ~0.35 UNDER the worm (the brightness
     hierarchy: the opaque worm reads brighter than the translucent bed).

   • THE WORM LAYER (`.pager-worm-layer`, aria-hidden, pointer-events:none) — ONLY the
     indicator masses (bodyA + a welling concave neck + bodyB), the translucency ONCE
     at the layer, the goo filter ONCE at the layer. COMPOSITOR-ONLY: the bodies travel
     on the `translate` property, deform on the CSS `scale: var(--stretch)` reciprocal
     (the `useLiquidFlex` LOW-cap squish), the neck spans/wells on `scale` — NEVER an
     animated width (motion-canon P5).

   • THE INTERACTION LAYER (the transparent 24px `<button>` hit-targets, ABOVE the worm
     layer) — all a11y (role/aria/keyboard/focus-ring), windowFit, and click live here.
     The bed + worm layers are PRESENTATIONAL.

   THE PAINT ARM. Arm A (the shipped register) merges the barbell with the
   instance-scoped worm filter (a true smooth throat — single-body peak 0.72 >
   the 0.33 threshold). Arm B (the `@supports`-not degrade FLOOR) renders the un-merged
   instance-scoped neck clip-path — a VISIBLE honest partial, NEVER the empty
   pill. No dual path at 13px: the filter is the sole paint; the clip is reached ONLY on
   an engine that cannot ref an SVG filter.

   PRM (motion-canon P6): the worm coalesces to ONE body, seats on the target with zero
   in-between frames (`--stretch` stays 1, the filter dropped) — only the fade survives;
   the bed is static.

   Every paint reads a `--pager-*` token (the consumer retint seam — slides sets
   `--pager-dot-active: var(--ncsu-red)`; presets-in-consumers). */

export interface PagerDotsProps {
    /** Total dot count (the slide/snap count). */
    count: number;
    /** Rail layout axis. Default horizontal. */
    orientation?: "horizontal" | "vertical";
    /**
     * When set, window the rail to `fit` dots centered on the active dot
     * (the deck dock-gutter overflow generalized). Off (undefined) →
     * show every dot.
     */
    windowFit?: number;
    /** Encapsulate the rail in the glass pager pill chassis. Default true. */
    ring?: boolean;
    /**
     * The ARIA register. `"tabs"` (default, byte-identical) is the carousel
     * panel-nav register (`role="tablist"`/`role="tab"` + `aria-selected`);
     * `"group"` is the full-viewport deck PRESENTATION register
     * (`role="group"`/`aria-current`) the deck group composition selects. ONE windowing
     * oracle, two aria registers — the `pagerWindow` math is NEVER re-forked.
     */
    pattern?: "tabs" | "group";
    /** Accessible name for the rail group. */
    ariaLabel?: string;
    /** Additional classes for the rail root. */
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<PagerDotsProps>(), {
    orientation: "horizontal",
    ring: true,
    pattern: "tabs",
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

// SVG resource references resolve document-wide. Namespace both definitions and
// their consumers per component instance so co-mounted pagers cannot alias.
const resourceId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
const wormFilterId = `pager-worm-filter-${resourceId}`;
const neckClipId = `pager-neck-clip-${resourceId}`;

const rootEl = ref<HTMLElement | null>(null);
// the WORM layer — the bodies/neck's positioning context (the coordinate origin the
// worm reads its centers against, so the ring padding never skews the projection).
const wormLayerEl = ref<HTMLElement | null>(null);
// the three worm masses — two round pip-bodies + a welling concave neck.
const bodyAEl = ref<HTMLElement | null>(null);
const bodyBEl = ref<HTMLElement | null>(null);
const neckEl = ref<HTMLElement | null>(null);

// per-slide-index dot element map (keyed by the slide index `i`, NOT the render
// position): the focus-recovery does an identity check against these refs.
const dotEls = new Map<number, HTMLButtonElement>();
function setDot(i: number, el: Element | null): void {
    if (el) dotEls.set(i, el as HTMLButtonElement);
    else dotEls.delete(i);
}

// the crisp bed pips — the worm travel centers measure off these (they share the
// button grid, so their centers ARE the painted dot centers).
const bedDotEls = new Map<number, HTMLElement>();
function setBedDot(i: number, el: Element | null): void {
    if (el) bedDotEls.set(i, el as HTMLElement);
    else bedDotEls.delete(i);
}

const vertical = computed(() => props.orientation === "vertical");

const win = computed(() =>
    props.windowFit && props.windowFit > 0
        ? pagerWindow(count.value, activeIndex.value, props.windowFit)
        : {
              shown: Array.from({ length: count.value }, (_, i) => i),
              clippedStart: false,
              clippedEnd: false,
          },
);
const shown = computed(() => win.value.shown);

// The worm geometry (`centerOf`) + the `useLeadTrail` driver + the active/shown/resize
// watchers live in the colocated composables/ leaf. The SFC keeps the
// interaction layer (the dot maps + the keyboard focus recovery below).
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
// Identity check against the per-index dot map — no aria-label string rebuild.
watch(shown, (next) => {
    const el = rootEl.value;
    if (!el || !el.contains(document.activeElement)) return;
    const focused = document.activeElement as HTMLElement;
    const stillShown = next.some((i) => dotEls.get(i) === focused);
    if (!stillShown) {
        void nextTick(() => dotEls.get(activeIndex.value)?.focus());
    }
});

function select(i: number): void {
    active.value = i;
    emit("select", i);
}

// ── The roving-tabindex keyboard contract ──────────────────────────
// The WAI-ARIA tabs/toolbar roving-tabindex mirrored onto the windowed dot rail (the
// SegmentedTabs contract — the model): EXACTLY ONE tab stop (the active
// dot `tabindex="0"`, the rest `-1`); a root `@keydown` handles the AXIS-DERIVED arrows
// (ArrowRight/Left horizontal ⇄ ArrowDown/Up vertical, off the orientation), Home/End jump,
// wrapping at the ends, skipping any disabled dot. The keyboard step IS a selection →
// focus-follows the activated dot (the SAME `select(...)` path a click takes), re-focused
// on the next tick since a hop off the current window remounts its button.

// The ONE tab stop — the active dot when it is in the window (a windowed rail always
// centers on the active, so this resolves to the active dot), else the first rendered dot.
const tabStopIndex = computed(() => {
    const s = shown.value;
    if (s.length === 0) return -1;
    return s.includes(activeIndex.value) ? activeIndex.value : s[0]!;
});
function rovingTabindex(i: number): number {
    return i === tabStopIndex.value ? 0 : -1;
}

// Focus-follows-activation: select the slide (recomputes the window), then re-focus its
// dot on the next tick (the button may have just mounted into the window).
function focusSlide(i: number): void {
    select(i);
    void nextTick(() => dotEls.get(i)?.focus());
}
// Step to the next NON-disabled dot in `dir` (+1/-1), wrapping. `dotEls` reads the live
// native `disabled` (no dot is disabled today — the skip is honest, not a fabricated prop;
// an off-window index is `undefined` → treated enabled → select+recompute+focus).
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
function onKeydown(e: KeyboardEvent): void {
    const from = activeIndex.value;
    const nextKey = vertical.value ? "ArrowDown" : "ArrowRight";
    const prevKey = vertical.value ? "ArrowUp" : "ArrowLeft";
    let handled = true;
    switch (e.key) {
        case nextKey:
            stepTo(from, 1);
            break;
        case prevKey:
            stepTo(from, -1);
            break;
        case "Home":
            edgeTo("first");
            break;
        case "End":
            edgeTo("last");
            break;
        default:
            handled = false;
            break;
    }
    if (handled) {
        e.preventDefault(); // no page scroll on the arrow keys
        // the pager OWNS its navigation keys (the WAI-ARIA tablist contract) — stop the
        // bubble so an ancestor keyboard-scroller (the embla <Carousel>) does not
        // double-advance off the SAME key.
        e.stopPropagation();
    }
}
</script>

<template>
    <div
        ref="rootEl"
        data-slot="pager-dots"
        :role="pattern === 'group' ? 'group' : 'tablist'"
        :aria-label="ariaLabel"
        :aria-orientation="pattern === 'group' ? undefined : orientation"
        :data-orientation="orientation"
        :style="{
            '--pager-goo-filter': `url(#${wormFilterId})`,
            '--pager-neck-clip': `url(#${neckClipId})`,
        }"
        @keydown="onKeydown"
        :class="
            cn(
                'pager-dots inline-flex items-center justify-center gap-1.5',
                ring && 'glass-pager-ring',
                orientation === 'vertical' && 'flex-col',
                props.class
            )
        "
    >
        <!-- One non-zero Safari-safe SVG definition host per pager. Both resources
             and every url() consumer share this instance's stable namespace. -->
        <svg
            class="pager-worm-defs"
            width="1"
            height="1"
            aria-hidden="true"
            focusable="false"
        >
            <defs>
                <filter
                    :id="wormFilterId"
                    color-interpolation-filters="sRGB"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                >
                    <feGaussianBlur
                        in="SourceGraphic"
                        stdDeviation="4"
                        result="blur"
                    />
                    <feColorMatrix
                        in="blur"
                        mode="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -6"
                        result="goo"
                    />
                    <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                </filter>
                <!-- the concave NECK-THROAT — objectBoundingBox cubic-Bézier sides
                     pulling IN to the 0.34 waist (a SMOOTH concave throat, NOT a faceted
                     polygon, NOT `inset()`). Safari-safe (objectBoundingBox clipPath
                     universally supported). Arm B (the `@supports`-not floor) only. -->
                <clipPath :id="neckClipId" clipPathUnits="objectBoundingBox">
                    <path
                        d="M0,0 C0.25,0 0.36,0.34 0.5,0.34 C0.64,0.34 0.75,0 1,0 L1,1 C0.75,1 0.64,0.66 0.5,0.66 C0.36,0.66 0.25,1 0,1 Z"
                    />
                </clipPath>
            </defs>
        </svg>

        <!-- THE BED LAYER — N crisp CSS circles, NEVER filtered (the rail bed). The
             active pip dims ~0.35 under the worm. Mirrors the button grid (same gap,
             24px cells) so a bed pip center IS the painted dot center. -->
        <div class="pager-bed-layer" aria-hidden="true">
            <span
                v-for="i in shown"
                :key="i"
                :ref="(el) => setBedDot(i, el as Element | null)"
                class="goo-dot"
                :data-active="i === activeIndex ? '' : undefined"
                :data-edge="
                    (i === shown[0] && win.clippedStart) ||
                    (i === shown[shown.length - 1] && win.clippedEnd)
                        ? ''
                        : undefined
                "
            />
        </div>

        <!-- THE WORM LAYER — ONLY the barbell masses (bodyA / neck / bodyB), the
             translucency ONCE, the goo filter ONCE. aria-hidden, pointer-events:none
             (the buttons own interaction). -->
        <div
            ref="wormLayerEl"
            class="pager-worm-layer"
            aria-hidden="true"
        >
            <span ref="bodyAEl" class="goo-body" />
            <span ref="neckEl" class="goo-neck" />
            <span ref="bodyBEl" class="goo-body" />
        </div>

        <!-- THE INTERACTION LAYER — the transparent 24px hit-targets (BYTE-KEPT). -->
        <button
            v-for="(i, k) in shown"
            :key="i"
            :ref="(el) => setDot(i, el as Element | null)"
            type="button"
            :role="pattern === 'group' ? undefined : 'tab'"
            :aria-selected="pattern === 'group' ? undefined : i === activeIndex"
            :aria-current="pattern === 'group' && i === activeIndex ? 'true' : undefined"
            :aria-label="`Go to slide ${i + 1}`"
            :tabindex="rovingTabindex(i)"
            :data-active="i === activeIndex ? '' : undefined"
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
/* ── PagerDots — the ONE position-dot register + the liquid dot-MORPH worm
   ─────────────────────────────────────────────────────────────
   The shared oracle (carousel dots ≡ the deck group pager). The active indicator is a
   LIQUID worm (a two-edge lead/trail barbell) that STRETCHES → TRAVELS → RE-FORMS
   between dots. Three layers: a crisp bed (no filter), the worm masses (filter once),
   the transparent hit-targets. Every paint reads a `--pager-*` token. */

.pager-dots {
    /* the per-rail dot tokens — a consumer retints by overriding these. KEPT. */
    --pager-dot-size: 0.8125rem; /* 13px base pip diameter (the worm body D). A real
       dot, not a speck: bigger dot → fatter worm body → wider bridging fringe → the goo
       has mass to merge (ONE arm at 13px). */
    --pager-dot-elongated: 2.25rem; /* 36px — the worm's max elongation (the LEAD↔TRAIL
       gap clamp; a multi-hop worm travels bounded, never taffy). */
    --pager-dot-active: var(--foreground); /* the solid ink the worm masses paint */
    --pager-dot-inactive: color-mix(in srgb, var(--foreground) 52%, transparent);
    --pager-dot-active-dim: color-mix(in srgb, var(--foreground) 35%, transparent);
    --pager-dot-hover: color-mix(in srgb, var(--foreground) 72%, transparent);

    /* the worm layer translucency, ONCE at the layer — a solid WET worm (still
       translucent glass, not opaque). */
    --pager-worm-layer-opacity: 0.65;
    /* the travel-squish scalar (1 at rest; the worm bodies read it via the CSS `scale`
       reciprocal). Written per-frame off `useLiquidFlex` by the worm driver. */
    --stretch: 1;

    /* the roving hit target. The transparent `<button>` grows to a ≥28px
       comfort target while the painted pip (the BED layer, 13px in a 24px cell) is UNMOVED;
       the symmetric negative margin pulls the 28px box back into a 24px flow cell so the
       button centers stay aligned with the bed pips (24px meets WCAG 2.5.8 AA; the
       below-44px target is a deliberate exemption). */
    --pager-hit-target: 28px;
    --pager-hit-inset: -2px; /* = (24px cell − 28px target) / 2 — the flow-cell pull-back */

    position: relative; /* the bed + worm layers anchor to the rail box */
}

.pager-worm-defs {
    position: absolute;
    inset: -9999px auto auto -9999px;
    overflow: hidden;
    pointer-events: none;
}

/* THE BED LAYER — N crisp CSS circles, NEVER filtered. Mirrors the button grid so a
   bed pip center IS the painted dot center. */
.pager-bed-layer {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.375rem; /* gap-1.5 — match the button rail */
    pointer-events: none;
    color: var(--pager-dot-active);
}
.pager-dots[data-orientation="vertical"] .pager-bed-layer {
    flex-direction: column;
}

/* the crisp bed pip — a real dot, centered in a 24px cell to mirror the button grid. */
.goo-dot {
    flex: 0 0 24px;
    width: 24px;
    height: 24px;
    display: grid;
    place-items: center;
}
.goo-dot::before {
    content: "";
    width: var(--pager-dot-size);
    height: var(--pager-dot-size);
    border-radius: var(--radius-pill);
    background: var(--pager-dot-inactive); /* the 52% rail bed */
}
/* the active bed pip dims UNDER the worm (the worm reads brighter — the hierarchy). */
.goo-dot[data-active]::before {
    background: var(--pager-dot-active-dim); /* ~0.35 */
}
/* a clipped window edge cue — smaller pip. */
.goo-dot[data-edge]::before {
    width: calc(var(--pager-dot-size) * 0.5);
    height: calc(var(--pager-dot-size) * 0.5);
    opacity: 0.6;
}

/* THE WORM LAYER — the opaque merge medium (bodyA + neck + bodyB), the goo filter +
   the translucency ONCE here (the opaque-layer technique — translucent masses would
   break the alpha threshold). DECOUPLED from the bed by construction. */
.pager-worm-layer {
    position: absolute;
    inset: 0;
    pointer-events: none; /* the buttons ABOVE own the hit-targets */
    filter: var(--pager-goo-filter); /* the instance-local metaball MERGE (Arm A) */
    opacity: var(--pager-worm-layer-opacity, 0.65); /* the translucency, ONCE */
    color: var(--pager-dot-active); /* the solid ink the masses use */
    will-change: transform; /* force a compositor layer — Safari re-raster */
    contain: layout paint; /* tight-boxed filter region — the morph-bridge perf rule */
    isolation: isolate; /* scope the filter, not the page */
}

/* THE WORM MASSES — two round opaque pips + a welling concave neck. They reserve a
   resting footprint ONCE (`--pager-dot-size`, the one-time layout reserve, motion-canon
   P5); the travel is ALL `translate`, the body squash is the CSS `scale: var(--stretch)`
   reciprocal, the neck span/well is `scale`. NEVER an animated width. The base geometry
   centers each mass on the layer's on-axis ORIGIN so a `translate:center` positions it. */
.goo-body,
.goo-neck {
    position: absolute;
    top: 50%;
    left: 0;
    width: var(--pager-dot-size);
    height: var(--pager-dot-size);
    margin-top: calc(var(--pager-dot-size) / -2);
    margin-left: calc(var(--pager-dot-size) / -2); /* center on the layer's x-origin */
    background: currentColor; /* FULL alpha — the goo medium */
    transform-origin: center;
    will-change: transform;
}
.pager-dots[data-orientation="vertical"] .goo-body,
.pager-dots[data-orientation="vertical"] .goo-neck {
    top: 0;
    left: 50%; /* center on the layer's y-origin (top:0 + margin-top:-D/2) */
}

.goo-body {
    border-radius: 50%; /* a round pip — the metaball body */
    /* the volume-preserving squish — paired reciprocally, axis-derived (the
       SegmentedTabs indicator law). The driver writes `--stretch` off `useLiquidFlex`
       (LOW cap 1.2); the individual `scale` composes with the JS `translate` in-place. */
    scale: var(--stretch, 1) calc(1 / var(--stretch, 1));
}
.pager-dots[data-orientation="vertical"] .goo-body {
    scale: calc(1 / var(--stretch, 1)) var(--stretch, 1);
}

/* THE CONCAVE NECK — the welling bridge between the two bodies. A rect that the driver
   spans (`scaleX(gap/D)`) + wells (`scaleY(neckGirth)`); the girth-following opacity
   (wells in → pinches out). Under Arm A the goo filter fuses it; under Arm B (the
   `@supports`-not floor) the local neck clip carves the structural waist. */
.goo-neck {
    border-radius: 0;
    opacity: 0; /* the driver writes the girth-following opacity */
}

/* Arm B — the `@supports not (filter: url())` degrade FLOOR: DROP the goo filter (a
   non-supporting engine cannot ref it) and render the un-merged clip-path barbell — a
   VISIBLE honest partial (the structural hourglass waist), NEVER the empty pill. The
   filter is the SOLE 13px paint on every supporting engine; the clip is reached ONLY
   here (no dual path at 13px). */
@supports not (filter: url("#pager-filter-support-probe")) {
    .pager-worm-layer {
        filter: none;
    }
    .goo-neck {
        clip-path: var(--pager-neck-clip);
    }
}

/* ── THE INTERACTION LAYER — the 24px hit-targets (BYTE-KEPT). No painted pip: the bed
   paints; the button is a transparent target with a focus-ring. ── */
.pager-dot {
    position: relative;
    z-index: 1; /* above the bed + worm layers (interaction) */
    /* the ≥28px hit box; the negative margin pulls it back into a 24px flow cell so the
       button center stays aligned with the bed pip (the pip is UNMOVED — it lives in the
       bed layer). */
    width: var(--pager-hit-target);
    height: var(--pager-hit-target);
    margin: var(--pager-hit-inset);
    padding: 0;
    border: 0;
    cursor: pointer;
    background: transparent;
    display: grid;
    place-items: center;
}

@media (prefers-reduced-motion: reduce) {
    /* P6 — the worm coalesces to ONE body on the target (the driver SEATS instantly,
       zero in-between frames), `--stretch` stays 1, the goo filter is DROPPED (a static
       blur+threshold is pure cost with no travel to merge). Only the fade survives; the
       bed is static. */
    .pager-worm-layer {
        filter: none;
    }
    .goo-body,
    .goo-neck {
        scale: 1 1;
    }
}
</style>
