<script setup lang="ts">
import { computed, onMounted, useTemplateRef, type HTMLAttributes } from "vue";
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
 * Palette reads `--constellation-node` / `--constellation-node-dim` /
 * `--constellation-line` off the canvas (neutral fallbacks), so a consumer
 * override or a dark-mode flip re-tints the lattice.
 */
const {
    count = 64,
    link = 132,
    speed = 0.16,
    seed,
    pointerReactive = true,
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
    class?: HTMLAttributes["class"];
    /**
     * The skin seam. Runs after the neutral passes with the live field, so a
     * consumer paints its own focal mark pinned to a real node. The branded
     * content (a domain accent, a callout label) lives HERE, in the consumer.
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

// Field + per-instance interaction state live in the setup closure.
const field: ConstellationField = { nodes: [], canvas: null, w: 0, h: 0, k: 1, dpr: 1 };
const pointer: ConstellationPointer = { x: -1, y: -1 };
const ripples: ConstellationRipple[] = [];
let palette: ConstellationPalette = { ...DEFAULT_PALETTE };

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
                        }
                        palette = readPalette(canvas);
                    }
                    field.k = k;

                    // Step the field unless the substrate is frozen (reduced-
                    // motion paints one static frame, no drift).
                    if (!handle.reducedMotion) {
                        const livePointer = pointerReactive ? pointer : null;
                        stepField(field, k, speed, livePointer);
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

    // Pointer reactivity — listen on the host (the canvas itself may be behind
    // type), map to canvas-local px. Disabled under reduced-motion.
    const host = hostRef.value;
    if (pointerReactive && host && !handle.reducedMotion) {
        const toLocal = (e: PointerEvent): ConstellationPointer | null => {
            const r = canvas.getBoundingClientRect();
            if (!r.width || !r.height) return null;
            const nx = (e.clientX - r.left) / r.width;
            const ny = (e.clientY - r.top) / r.height;
            if (nx < 0 || ny < 0 || nx > 1 || ny > 1) return null;
            return { x: nx * field.w, y: ny * field.h };
        };
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
});

defineExpose({ field });
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
