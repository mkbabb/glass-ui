<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef, type HTMLAttributes } from "vue";
import { createCanvas2D } from "../../../composables/glass/canvas2d";
import { mulberry32, hashString } from "../../../utils/prng";
import {
    seedField,
    stepField,
    readPalette,
    drawEdges,
    drawNodes,
    drawPointerWeb,
    drawRipples,
    warpTo as warpToField,
    BASE_WIDTH,
    DEFAULT_PALETTE,
    type ConstellationField,
    type ConstellationRipple,
    type ConstellationPointer,
    type ConstellationPalette,
} from "./constellationField";
import { cn } from "../../../utils/cn";

/**
 * Constellation — a slow, geometric proximity-graph lattice on a Canvas2D
 * surface. Nodes drift + bounce; near nodes link with distance-falloff
 * hairlines; the web leans toward the cursor and taps ripple. It composes the
 * `useCanvas2D` substrate, so it inherits the offscreen / tab-hidden /
 * reduced-motion freeze for free (no hand-rolled RAF-park).
 *
 * The lattice ships NEUTRAL. A branded skin (a focal ring, a callout label) is
 * the consumer's `drawOverlay(ctx, field, now)` pass — it runs AFTER the four
 * neutral passes and receives the live field so it can pin itself to a real
 * node. Zero deck-domain content lives in the component.
 *
 * Palette reads the FULL `--constellation-*` legibility set off the canvas (the
 * node/node-dim/line colors + the edge-alpha multipliers + the field-yields-to-
 * type `--constellation-alpha` knob; neutral fallbacks), so a consumer override
 * or a dark-mode flip re-tints AND re-weights the lattice (AX.W17).
 *
 * The focal node + click-to-warp (AX.W17) is a first-class engine concept: with
 * `warpOnClick`, a click warps the focal node to the nearest drifting node via a
 * critically-damped spring stepped INSIDE the substrate's single rAF (no
 * `useSpring`, no second rAF). The consumer paints the focal mark at
 * `field.warp.{x,y}` in its `drawOverlay`.
 */
const {
    count = 64,
    link = 132,
    speed = 0.16,
    seed,
    pointerReactive = true,
    warpOnClick = false,
    class: className,
    drawOverlay,
} = defineProps<{
    /** Node count. Default 64. */
    count?: number;
    /** Link distance in px (the falloff reach). Default 132. */
    link?: number;
    /** Drift speed. Default 0.16. */
    speed?: number;
    /**
     * Seed for a REPRODUCIBLE field. A `number` or `string` (hashed) seeds the
     * shared `mulberry32`; omit for a fresh `Math.random` field each mount.
     */
    seed?: number | string;
    /** Steer-toward-cursor + tap ripples. Default true; auto-off under reduced-motion. */
    pointerReactive?: boolean;
    /**
     * Click-to-warp (AX.W17). A click warps the focal node to the nearest
     * drifting node and SPRINGS it there (a critically-damped path, chasing a
     * LIVE drifting target). INDEPENDENT of `pointerReactive` — warp works on a
     * static (non-ripple) lattice, and ripples work without warp. Default false;
     * auto-off under reduced-motion (the click does NOT warp — the focal mark
     * stays put; the stated PRM policy). The low-level `warpTo(...)` imperative
     * method (via `defineExpose`) is the seam this prop sugars.
     */
    warpOnClick?: boolean;
    class?: HTMLAttributes["class"];
    /**
     * The skin seam. Runs after the neutral passes with the live field, so a
     * consumer paints its own focal mark pinned to a real node — read
     * `field.warp.{x,y}` for the spring-eased focal position when `warpOnClick`
     * is on. The branded content (a domain accent, a callout label) lives HERE,
     * in the consumer.
     */
    drawOverlay?: (
        ctx: CanvasRenderingContext2D,
        field: ConstellationField,
        now: number,
    ) => void;
}>();

const hostRef = useTemplateRef<HTMLElement>("hostRef");
const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef");

// The shared single-source PRNG (AV.W14). A seeded field is reproducible across
// mounts; an undefined seed is a fresh field. NO private mulberry32 re-roll.
const rng = computed<() => number>(() => {
    if (seed === undefined) return Math.random;
    const s = typeof seed === "string" ? hashString(seed) : seed;
    return mulberry32(s);
});

// Field + per-instance interaction state live in the setup closure. The focal
// node (AX.W17) is engine-owned: `focalIndex` names the pinned node, `warp` is
// the per-axis critically-damped spring the engine steps inside `stepField`.
const field: ConstellationField = {
    nodes: [],
    canvas: null,
    w: 0,
    h: 0,
    k: 1,
    dpr: 1,
    focalIndex: -1,
    warp: { x: 0, y: 0, vx: 0, vy: 0, targetIdx: -1 },
};
const pointer: ConstellationPointer = { x: -1, y: -1 };
const ripples: ConstellationRipple[] = [];
let palette: ConstellationPalette = { ...DEFAULT_PALETTE };
// The previous frame's `now` (ms) for the warp-spring `dt` (AX.W17). -1 until
// the first frame stamps it.
let prevNow = -1;
// The hoisted client→canvas-local-px mapper, assigned on mount. The exposed
// `warpTo(clientX, clientY)` reads it (the deck-scale invariant); null pre-mount.
const toLocalRef = ref<
    ((e: { clientX: number; clientY: number }) => ConstellationPointer | null) | null
>(null);

onMounted(() => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    const handle = createCanvas2D({
        canvas: canvasRef,
        setup: (ctx) => {
            // Resolve the palette + lay out the field on the first frame, once
            // the canvas has been sized by the substrate's resize.
            return {
                render(c, now) {
                    const w = canvas.clientWidth || canvas.offsetWidth || BASE_WIDTH;
                    const h = canvas.clientHeight || canvas.offsetHeight || 720;
                    const k = w / BASE_WIDTH;
                    field.canvas = canvas;
                    field.dpr = Math.min(
                        (typeof window !== "undefined" && window.devicePixelRatio) || 1,
                        2,
                    );
                    if (field.w !== w || field.h !== h) {
                        field.w = w;
                        field.h = h;
                        field.k = k;
                        if (!field.nodes.length) {
                            field.nodes = seedField(rng.value, count, w, h, speed);
                            // Seed the warp spring at field-center so the FIRST
                            // warp springs from a real start point, not (0,0)
                            // (AX.W17 — a continuous spring-eased path).
                            field.warp.x = w / 2;
                            field.warp.y = h / 2;
                        }
                        palette = readPalette(canvas);
                    }
                    field.k = k;

                    // dt (s) since the previous frame — drives the warp spring.
                    // Clamped inside warpStep for tab-throttle resilience.
                    const dt = prevNow < 0 ? 0 : (now - prevNow) / 1000;
                    prevNow = now;

                    // Step the field unless the substrate is frozen (reduced-
                    // motion paints one static frame, no drift, no warp advance).
                    if (!handle.reducedMotion) {
                        const livePointer = pointerReactive ? pointer : null;
                        stepField(field, k, speed, livePointer, dt);
                    }

                    c.clearRect(0, 0, w, h);
                    drawEdges(c, field, link, palette);
                    drawNodes(c, field, palette);
                    if (pointerReactive && !handle.reducedMotion) {
                        drawPointerWeb(c, field, link, palette, pointer);
                        drawRipples(c, field, now, ripples, palette);
                    }
                    // The consumer skin runs LAST with the live field.
                    drawOverlay?.(c, field, now);
                },
            };
        },
    });

    // `toLocal` is HOISTED out of the pointerReactive block (AX.W17) — it is a
    // pure `getBoundingClientRect` → canvas-local-px mapper with NO
    // pointerReactive/PRM dependency. BOTH the ripple path AND the warp path read
    // this ONE mapper, so a click lands in canvas-local px under any CSS
    // scale/zoom (the deck-scale invariant). Accepts client coords (a
    // PointerEvent or a bare {clientX, clientY}); returns canvas-local px or null
    // when the point falls outside the canvas / the canvas has no extent.
    const host = hostRef.value;
    const toLocal = (
        e: { clientX: number; clientY: number },
    ): ConstellationPointer | null => {
        const r = canvas.getBoundingClientRect();
        if (!r.width || !r.height) return null;
        const nx = (e.clientX - r.left) / r.width;
        const ny = (e.clientY - r.top) / r.height;
        if (nx < 0 || ny < 0 || nx > 1 || ny > 1) return null;
        return { x: nx * field.w, y: ny * field.h };
    };
    toLocalRef.value = toLocal;

    // Pointer reactivity — listen on the host (the canvas itself may be behind
    // type), map to canvas-local px via the hoisted mapper. Disabled under
    // reduced-motion. NO behavior change vs HEAD — same gate, same handlers.
    if (pointerReactive && host && !handle.reducedMotion) {
        const onMove = (e: PointerEvent) => {
            const p = toLocal(e);
            if (p) {
                pointer.x = p.x;
                pointer.y = p.y;
            } else {
                pointer.x = -1;
                pointer.y = -1;
            }
            handle.wake();
        };
        const onLeave = () => {
            pointer.x = -1;
            pointer.y = -1;
        };
        const onDown = (e: PointerEvent) => {
            const p = toLocal(e);
            if (p) ripples.push({ x: p.x, y: p.y, start: -1 });
            handle.wake();
        };
        host.addEventListener("pointermove", onMove);
        host.addEventListener("pointerleave", onLeave);
        host.addEventListener("pointerdown", onDown);
    }

    // Click-to-warp (AX.W17) — its OWN guard, SEPARATE from the ripple block, so
    // `warpOnClick` and `pointerReactive` are INDEPENDENT axes (warp works on a
    // non-ripple lattice; ripples work without warp). PRM-gated HERE (the click
    // does not warp under reduced-motion — the listener is simply not
    // registered). Resolves toLocal → nearestNode (excluding the focal) → warpTo;
    // the spring is stepped inside stepField (no second rAF, no useSpring).
    if (warpOnClick && host && !handle.reducedMotion) {
        const onWarp = (e: PointerEvent) => {
            const p = toLocal(e);
            if (!p) return;
            warpToField(field, p.x, p.y);
            handle.wake();
        };
        host.addEventListener("pointerdown", onWarp);
    }
});

defineExpose({
    /** The live field (the low-level imperative seam — for a custom overlay). */
    field,
    /**
     * Imperative warp (AX.W17). Two call shapes:
     *   `warpTo(localPoint)`              — `{x, y}` already in canvas-local px
     *                                        (the lower primitive).
     *   `warpTo(clientX, clientY)`        — client coords, mapped via the
     *                                        deck-scale `toLocal` (the sugar
     *                                        `warpOnClick` calls internally).
     * The focal node re-points to the nearest drifting node + springs there.
     * Returns the chosen node index, or -1 on a degenerate no-op. No-op under
     * reduced-motion (the spring does not advance while the substrate is frozen).
     */
    warpTo(a: { x: number; y: number } | number, b?: number): number {
        if (typeof a === "number" && typeof b === "number") {
            const local = toLocalRef.value?.({ clientX: a, clientY: b });
            if (!local) return -1;
            return warpToField(field, local.x, local.y);
        }
        const pt = a as { x: number; y: number };
        return warpToField(field, pt.x, pt.y);
    },
});
</script>

<template>
    <div ref="hostRef" :class="cn('constellation', className)">
        <canvas ref="canvasRef" class="constellation-canvas" aria-hidden="true" />
    </div>
</template>

<style scoped>
/* The lattice is decorative chrome — `content-visibility:auto` lets the
   substrate's offscreen-park kick in (the contentvisibilityautostatechange
   listener fires on this host), `contain` keeps it a layout/paint root. */
.constellation {
    position: relative;
    inline-size: 100%;
    block-size: 100%;
    contain: layout style;
    content-visibility: auto;
    contain-intrinsic-size: auto none;
}

.constellation-canvas {
    position: absolute;
    inset: 0;
    inline-size: 100%;
    block-size: 100%;
    display: block;
}
</style>
