// BE.W-DOCK-RAIL-REALIZE (wave 2) — useLiquidRail: the carousel-stack rail projection
// + the hover-expand spring scalar.
//
// THE ASK (rail-sketch.png decoded): a VERTICAL carousel-stack anchored ON a dock
// edge (the sketch's ink line is the dock edge). The CHOSEN item sits AT the line;
// configurable items fan ABOVE it (golden ~2x span) and BELOW it (a partial peek),
// and the list CAROUSEL-WRAPS (loops). NOT the macOS 3D rotateY picker-wheel — a
// STRAIGHT linear stack whose depth read comes from OPACITY + SCALE tiers, not
// perspective. Collapsed = just-chosen (the rail ~90% collapsed); on HOVER the rail
// EXPANDS to reveal N-before + N-after, the far ones fading toward 0 opacity (the
// ↑z fade in the sketch).
//
// THE x/y/z SKETCH TIERS are NOT 3D axes — they are layered TRANSLATE+OPACITY tiers
// keyed off distance-from-chosen:
//   x = the chosen item (offset 0, opacity 1, scale 1) — the rest state;
//   y = the near neighbours (~1 slot, ~0.6 opacity, ~0.94 scale);
//   z = the far neighbours (2+ slots, fading toward 0 opacity, ~0.86 scale).
//
// THE LOAD-BEARING REUSE (no second engine, the foreign-tree + box-inviolate fences).
// We CLONE the `dockMorphContext.ts` loop SHAPE the dock proved out — ONE
// `SpringProgress`, ONE `play()` rAF loop, ONE scalar to the host root, the
// `inheritedVelocity` interruptible re-base, the `prefersReducedMotion()`
// synchronous seat — and REUSE the named `dock` SPRING_PRESETS row (response 0.32 /
// ζ 0.7) via `springPreset("dock")`. NO new spring family, NO `@keyframes` (the
// W-GLASS-CAL spring fence holds). The expand scalar drives the CSS `--rail-expand-t`
// AND the JS projection in lockstep.
//
// THE PROJECTION is a PURE function (the `useLiquidFlex` factoring template — no DOM
// measure needed for the prototype: the caller renders the projected transforms). For
// each item `i` against `chosen` + a live `position` scroll scalar + the live `expand`
// 0..1 progress, it computes `{ translate, opacity, scale }` plus a virtualized WINDOW
// of ±ceil(fadeRange+1) items (carousel virtualization via negative-safe modulo).
//
// COMPOSITOR-ONLY + PRM-SAFE. Every per-item write is `transform`/`opacity` (NEVER a
// layout property — the `proof:no-layout-animation` floor). Under
// `prefers-reduced-motion: reduce` the spring SNAPS the expand scalar to its target
// (zero travel frames; the carousel hard-cuts to its state) — the dock's
// `seatTargetSync` precedent.
//
// HOST/SUBPATH. It reaches `@mkbabb/keyframes.js` (`SpringProgress`) statically, so it
// ships on the `/dock` subpath, OFF the vueuse-free root barrel (the `useDockCtaReceive`
// precedent — dock-family, keyframes-bearing).

import {
    computed,
    onScopeDispose,
    readonly,
    ref,
    watch,
    type ComputedRef,
    type MaybeRefOrGetter,
    type Ref,
} from "vue";
import { SpringProgress } from "@mkbabb/keyframes.js";
import { springPreset, type SpringPresetName } from "../../../../composables/motion/springPresets";

/** Which dock edge the rail anchors on. A vertical dock fans on the BLOCK axis
 *  (translateY, edge L/R); a horizontal dock on the INLINE axis (translateX, T/B). */
export type RailEdge = "left" | "right" | "top" | "bottom";

/** The geometry knobs — the φ-tier slot spacing + the iCarousel FadeRange model. Each
 *  knob accepts a plain number OR a getter/ref so a consumer's live sliders re-fan the
 *  carousel without reconstructing the composable. */
export interface LiquidRailGeometry {
    /** The chosen→y base slot gap, in px (the tier-0 spacing). Default 52. */
    slotSpacing?: MaybeRefOrGetter<number>;
    /** The φ tier ratio — each receding tier compresses by this (W-CARD-PAD φ-ladder,
     *  expressed in the math NEVER a flat rebake). Default 1.618. */
    tierRatio?: MaybeRefOrGetter<number>;
    /** The slot-distance at which the fade begins (chosen + immediate neighbour stay
     *  full). Default 0.5. */
    fadeStart?: MaybeRefOrGetter<number>;
    /** The slot-span the fade runs over (the y→z transition). Default 2.0. */
    fadeRange?: MaybeRefOrGetter<number>;
    /** The far-tier floor alpha (the wrap edge dissolves toward this). Default 0. */
    fadeMinAlpha?: MaybeRefOrGetter<number>;
    /** The per-slot scale recession (the depth read). Default 0.06. */
    scaleStep?: MaybeRefOrGetter<number>;
    /** The max slots the scale recession clamps at. Default 4. */
    scaleClampSlots?: MaybeRefOrGetter<number>;
    /** The golden asymmetry — the ABOVE side reserves this × the below span (the
     *  "golden 2x above / partial peek below"). Default φ² ≈ 2.618. */
    goldenAbove?: MaybeRefOrGetter<number>;
}

export interface UseLiquidRailOptions {
    /** The total item count (the carousel ring size). Reactive. */
    count: MaybeRefOrGetter<number>;
    /** The chosen index — the item at the dock line. One registry (the consumer owns
     *  the model); the rail keeps NO internal selection shadow. Reactive. */
    chosen: MaybeRefOrGetter<number>;
    /** Which dock edge the rail anchors on (default `"right"`). Reactive. */
    edge?: MaybeRefOrGetter<RailEdge>;
    /** The geometry knobs. */
    geometry?: LiquidRailGeometry;
    /** The spring register for the expand scalar (default `"dock"` — NO new family). */
    spring?: SpringPresetName;
    /** The optional host element the expand scalar is written onto as `--rail-expand-t`
     *  (so a CSS host arm can read it too). Headless without it. */
    rootEl?: Ref<HTMLElement | null>;
}

/** One projected item — the compositor-only transform tier for item `i`. */
export interface LiquidRailItem {
    /** The stable ring index `0..count-1` (the v-for key). */
    index: number;
    /** The signed shortest-arc slot offset from chosen (negative = above the line). */
    offset: number;
    /** The px translate along the rail's main axis (negative = toward the above side). */
    translate: number;
    /** The faded alpha (0..1). */
    opacity: number;
    /** The recession scale (≤1). */
    scale: number;
    /** Whether this is the chosen item (offset 0). */
    chosen: boolean;
    /** The ready-to-bind style object (compositor-only: transform + opacity). */
    style: Record<string, string>;
}

export interface UseLiquidRailReturn {
    /** The live virtualized projection — the WINDOW of items to render, each carrying
     *  its `{ translate, opacity, scale, style }`. Re-projects off `expand`/`position`/
     *  `chosen`/`count`/`edge`. */
    items: ComputedRef<LiquidRailItem[]>;
    /** The live expand progress (0 collapsed → 1 fully fanned), driven by the spring. */
    expand: Readonly<Ref<number>>;
    /** The live scroll position in slot-units (fractional during a fling). */
    position: Readonly<Ref<number>>;
    /** Whether the expand spring is mid-flight. */
    expanding: Readonly<Ref<boolean>>;
    /** Drive the expand scalar to a target (0 collapse / 1 expand) on the dock spring. */
    expandTo(open: boolean): void;
    /** Pointer-enter handler — expand. */
    onPointerEnter(): void;
    /** Pointer-leave handler — collapse. */
    onPointerLeave(): void;
    /** Scroll the carousel by `deltaSlots` (advances `chosen` on settle via `onAdvance`).
     *  For the prototype this nudges `position`; the caller steps `chosen` itself. */
    scrollBy(deltaSlots: number): void;
}

/** The default φ-stepped, golden-asymmetric carousel geometry (the sketch silhouette). */
const DEFAULT_GEOMETRY = {
    slotSpacing: 52,
    tierRatio: 1.618,
    fadeStart: 0.5,
    fadeRange: 2.0,
    fadeMinAlpha: 0,
    scaleStep: 0.06,
    scaleClampSlots: 4,
    goldenAbove: 2.618, // φ²
} as const;

/** The negative-safe signed shortest-arc offset on the wrap ring (the
 *  "negative-infinity modulus" the research names — a naive `raw % N` breaks the
 *  backward wrap). Wraps to `[-N/2, N/2)`. */
function ringOffset(raw: number, n: number): number {
    if (n <= 0) return 0;
    return (((raw + n / 2) % n) + n) % n - n / 2;
}

/** Resolve a `MaybeRefOrGetter<T>` to a value — a getter is called, a ref is
 *  unwrapped, a plain value passes through (the `toValue` shape, inlined to avoid the
 *  import edge). */
function read<T>(src: MaybeRefOrGetter<T>): T {
    if (typeof src === "function") return (src as () => T)();
    if (src !== null && typeof src === "object" && "value" in (src as object)) {
        return (src as { value: T }).value;
    }
    return src as T;
}

/** Resolve one geometry knob (live) with its default fallback. */
function geom(
    g: LiquidRailGeometry,
    key: keyof LiquidRailGeometry,
): number {
    const v = g[key];
    return v === undefined ? (DEFAULT_GEOMETRY[key] as number) : read(v);
}

/** The φ-tiered slot SPAN to a given absolute slot-distance — the chosen→y gap is
 *  wider than the y→z gap (the recession compresses as items recede, the depth read).
 *  The tier ratio is EXPRESSED in the accumulation, never a flat resolved rebake
 *  (the W-CARD-PAD φ-ladder fence). `side` applies the golden asymmetry: the above
 *  side (negative offset) reserves `goldenAbove`× the below span. */
function tieredSpan(
    adist: number,
    base: number,
    ratio: number,
    goldenAbove: number,
    above: boolean,
): number {
    // accumulate per-tier gaps: tier0→1 = base, tier1→2 = base/ratio, … (φ-compressed)
    let span = 0;
    let gap = base;
    const whole = Math.floor(adist);
    for (let k = 0; k < whole; k++) {
        span += gap;
        gap /= ratio;
    }
    // the fractional remainder of the current (compressing) gap
    span += (adist - whole) * gap;
    // the golden asymmetry — the above side fans `goldenAbove`× further than the below
    // (the "golden ~2x above / partial peek below"); the below keeps the base span.
    return above ? span * goldenAbove : span;
}

/**
 * The carousel-stack rail projection + the hover-expand dock-spring scalar. See the
 * module header for the rail-sketch decode + the no-second-engine reuse rationale.
 */
export function useLiquidRail(opts: UseLiquidRailOptions): UseLiquidRailReturn {
    const g: LiquidRailGeometry = opts.geometry ?? {};
    const springName = opts.spring ?? "dock";
    const edge = (): RailEdge => (opts.edge ? read(opts.edge) : "right");

    // ── the live scalars the projection reads ──────────────────────────────────
    const expand = ref(0); // 0 collapsed → 1 fully fanned (the dock spring writes it)
    const position = ref(0); // the scroll offset in slot-units (fractional during a fling)
    const expanding = ref(false);

    // ── the ONE expand spring (the dockMorphContext loop SHAPE, cloned not edited) ──
    const preset = springPreset(springName);
    let spring: SpringProgress | null = null;

    function disposeSpring(): void {
        if (spring) {
            spring.stop();
            spring.dispose();
            spring = null;
        }
    }

    function writeRoot(v: number): void {
        opts.rootEl?.value?.style.setProperty("--rail-expand-t", `${v}`);
    }

    /** Drive the expand scalar to `to` (0 or 1) on a FRESH spring carrying the prior
     *  velocity (the iOS interruptible re-base — the dockMorphContext :255-256 idiom).
     *  `respectReducedMotion` snaps the scalar in one frame under PRM. */
    function driveExpand(to: number): void {
        // PRM — snap the scalar SYNCHRONOUSLY (the spring's play loop does not write
        // `--rail-expand-t` under `prefers-reduced-motion: reduce`, which left the rail
        // stuck COLLAPSED — non-functional. The useLiquidMorph explicit-snap precedent;
        // the rail's expand is a state change that MUST still happen, just instantly.)
        if (
            typeof window !== "undefined" &&
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
        ) {
            disposeSpring();
            expand.value = to;
            writeRoot(to);
            expanding.value = false;
            return;
        }
        const inheritedVelocity = spring && !spring.settled ? spring.velocity : 0;
        const from = spring ? spring.value : expand.value;
        disposeSpring();
        spring = new SpringProgress({
            response: preset.response,
            dampingFraction: preset.dampingFraction,
            initial: from,
            respectReducedMotion: true,
        });
        const active = spring;
        active.reset(from, inheritedVelocity);
        active.target = to;
        expanding.value = true;
        active.play((v: number) => {
            expand.value = v;
            writeRoot(v);
            if (active.settled) {
                expand.value = active.target;
                writeRoot(active.target);
                expanding.value = false;
            }
        });
    }

    function expandTo(open: boolean): void {
        driveExpand(open ? 1 : 0);
    }
    function onPointerEnter(): void {
        expandTo(true);
    }
    function onPointerLeave(): void {
        expandTo(false);
    }

    /** Nudge the carousel scroll position (the caller steps `chosen` on settle). For
     *  the prototype this is a direct position write; a fling would settle it to the
     *  nearest integer slot via a second spring (the useDragMorph decay-rest shape). */
    function scrollBy(deltaSlots: number): void {
        position.value += deltaSlots;
    }

    // ── the PURE projection — the carousel-wrap-with-opacity-fade geometry ──────
    const items = computed<LiquidRailItem[]>(() => {
        const n = Math.max(0, Math.floor(read(opts.count)));
        if (n === 0) return [];
        const chosen = read(opts.chosen);
        const pos = position.value;
        const exp = expand.value;
        const e = edge();
        // the rail's MAIN axis sign: a vertical dock (L/R edge) fans on Y, a horizontal
        // dock (T/B edge) on X. negative offset = the ABOVE side (toward the top/start).
        const horizontal = e === "top" || e === "bottom";

        // the geometry knobs — resolved LIVE so a consumer's sliders re-fan the carousel.
        const slotSpacing = geom(g, "slotSpacing");
        const tierRatio = geom(g, "tierRatio");
        const fadeStart = geom(g, "fadeStart");
        const fadeRange = geom(g, "fadeRange");
        const fadeMinAlpha = geom(g, "fadeMinAlpha");
        const scaleStep = geom(g, "scaleStep");
        const scaleClampSlots = geom(g, "scaleClampSlots");
        const goldenAbove = geom(g, "goldenAbove");

        // the carousel WINDOW — render only ±ceil(fadeRange+1) slots around chosen so
        // the strip loops without N DOM nodes (the pagerWindow / virtual-window
        // precedent, NOT a third windowing fork).
        const half = Math.ceil(fadeRange + 1);
        const seen = new Set<number>();
        const out: LiquidRailItem[] = [];

        for (let d = -half; d <= half; d++) {
            // the ring index at this slot offset from chosen+position
            const ringIdx = ((Math.round(chosen + pos) + d) % n + n) % n;
            if (seen.has(ringIdx)) continue;
            seen.add(ringIdx);

            // negative-safe signed shortest-arc offset from chosen (fractional during fling)
            const raw = ringIdx - chosen - pos;
            const off = ringOffset(raw, n);
            const adist = Math.abs(off);
            const above = off < 0;

            // the φ-tiered translate × the expand progress (collapsed ⇒ all items
            // collapse onto the chosen at the line; expanded ⇒ they fan). The spacing is
            // UNIFORM (goldenAbove drives the FADE asymmetry below, NOT the per-slot
            // spacing — the sketch's stack is a TIGHT fanned deck, not a sparse spray).
            const span = tieredSpan(adist, slotSpacing, tierRatio, 1, above);
            const translate = Math.sign(off) * span * exp;

            // the iCarousel FadeRange/FadeMinAlpha model — fade by |offset|, capped at a
            // min alpha; MULTIPLY by expand so off-chosen items are invisible collapsed.
            // GOLDEN ASYMMETRY: the BELOW side (a "partial peek") fades faster than the
            // ABOVE by `goldenAbove`, so ~goldenAbove× more items show above than below
            // (the sketch's "golden ~2x above / partial peek below").
            const sideRange = above ? fadeRange : fadeRange / Math.max(1, goldenAbove);
            const faded = 1 - (adist - fadeStart) / sideRange;
            const baseAlpha = Math.min(1, Math.max(fadeMinAlpha, faded));
            const opacity = adist === 0 ? 1 : baseAlpha * exp;

            // the recession scale (the z depth read — far items smaller).
            const scale = 1 - Math.min(adist, scaleClampSlots) * scaleStep;

            const axisTranslate = horizontal
                ? `translateX(${translate}px)`
                : `translateY(${translate}px)`;

            out.push({
                index: ringIdx,
                offset: off,
                translate,
                opacity,
                scale,
                chosen: adist === 0,
                style: {
                    transform: `${axisTranslate} scale(${scale})`,
                    opacity: `${opacity}`,
                    // the stacking order: the chosen on top, nearer items above farther
                    zIndex: `${100 - Math.round(adist * 10)}`,
                },
            });
        }

        // chosen last in paint order is fine (zIndex carries depth); keep ring order
        // stable so Vue's keyed v-for never re-mounts a wrapping item.
        out.sort((a, b) => a.index - b.index);
        return out;
    });

    // a chosen/count change re-seats the projection automatically (computed deps);
    // collapse if the count drops below the current window so nothing strands.
    watch(
        () => read(opts.count),
        () => {
            /* projection re-derives; no spring re-seat needed */
        },
    );

    onScopeDispose(disposeSpring);

    return {
        items,
        expand: readonly(expand),
        position: readonly(position),
        expanding: readonly(expanding),
        expandTo,
        onPointerEnter,
        onPointerLeave,
        scrollBy,
    };
}
