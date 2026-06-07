<script setup lang="ts">
// AW.W17 — the Constellation proximity-graph lattice.
//
// A drifting node field with distance-falloff edges, a pointer-web, and tap
// ripples, composed on the `useCanvas2D` substrate (park/freeze/dispose for
// free) and seeded by glass-ui `prng`. The NEUTRAL lattice ships here; the
// BRANDED anomaly skin (the slides NC-red ring + dashed Fira-Code callout) is a
// CONSUMER `drawOverlay` pass — it never lives in `src/`.
import { useTemplateRef, watch, onScopeDispose } from "vue";
import { createCanvas2D } from "../../../composables/glass/canvas2d";
import { mulberry32, hashString } from "../../../utils/prng";
import {
    BASE_W,
    seedField,
    stepField,
    drawEdges,
    drawNodes,
    drawPointerWeb,
    drawRipples,
    type ConstellationField,
    type ConstellationNode,
    type ConstellationPalette,
    type ConstellationPointer,
    type ConstellationRipple,
} from "./constellationField";

export interface ConstellationProps {
    /** Node count. Default 64. */
    count?: number;
    /** Link distance in px — two nodes within it are edged. Default 132. */
    link?: number;
    /** Drift speed. Default 0.16. */
    speed?: number;
    /**
     * Seed for a reproducible field. A string is hashed; a number seeds
     * `mulberry32` directly; `undefined` uses `Math.random` (a fresh field).
     */
    seed?: number | string;
    /** Pointer reactivity (steer-toward-cursor + tap ripples). Default true. */
    pointerReactive?: boolean;
    class?: string;
    /**
     * The consumer skin seam. Called AFTER the four neutral passes each frame,
     * with the field state + the frame clock — a consumer paints its own anomaly
     * / focal node / callout here. The library ships no branded content.
     */
    drawOverlay?: (
        ctx: CanvasRenderingContext2D,
        field: ConstellationField,
        now: number,
    ) => void;
}

const props = withDefaults(defineProps<ConstellationProps>(), {
    count: 64,
    link: 132,
    speed: 0.16,
    pointerReactive: true,
});

const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef");

// The live field + pointer + ripple state (owned by the component; the field
// engine is pure functions over them).
const field: ConstellationField = { nodes: [], w: 0, h: 0, k: 1, dpr: 1 };
const pointer: ConstellationPointer = { x: -1, y: -1 };
const ripples: ConstellationRipple[] = [];

function makeRng(): () => number {
    if (props.seed === undefined) return Math.random;
    const seed =
        typeof props.seed === "string" ? hashString(props.seed) : props.seed;
    return mulberry32(seed);
}

/** Resolve the neutral palette off the canvas's cascade (dark-flip re-tints). */
function readPalette(el: HTMLElement): ConstellationPalette {
    const cs = getComputedStyle(el);
    const read = (name: string, fallback: string) =>
        cs.getPropertyValue(name).trim() || fallback;
    return {
        node: read("--constellation-node", "#b4afa3"),
        nodeDim: read("--constellation-node-dim", "#cdc8bd"),
        line: read("--constellation-line", read("--foreground", "#1c1714")),
        alpha: parseFloat(read("--constellation-alpha", "1")) || 1,
        edgeAlpha: parseFloat(read("--constellation-edge-alpha", "0.17")) || 0.17,
    };
}

const handle = createCanvas2D({
    canvas: canvasRef,
    setup: (ctx) => {
        const canvas = ctx.canvas;
        const palette = readPalette(canvas);

        function syncFieldSize(): void {
            const w = canvas.clientWidth || BASE_W;
            const h = canvas.clientHeight || 720;
            field.w = w;
            field.h = h;
            field.k = w / BASE_W;
            field.dpr = Math.min(
                (typeof window !== "undefined" && window.devicePixelRatio) || 1,
                2,
            );
            // Seed the field once we know the canvas size.
            if (!field.nodes.length) {
                field.nodes = seedField(
                    makeRng(),
                    props.count,
                    field.w,
                    field.h,
                    props.speed,
                );
            }
        }

        return {
            render: (c, now) => {
                syncFieldSize();
                // The substrate freezes the loop under reduced-motion (one static
                // frame); step only advances when the loop is live.
                if (!handle.reducedMotion) {
                    stepField(field, props.pointerReactive ? pointer : null);
                }
                c.clearRect(0, 0, field.w, field.h);
                drawEdges(c, field, props.link, palette);
                drawNodes(c, field, palette);
                if (props.pointerReactive) {
                    drawPointerWeb(c, field, props.link, palette, pointer);
                    drawRipples(c, field, now, ripples, palette);
                }
                // The consumer skin — painted LAST, over the neutral lattice.
                props.drawOverlay?.(c, field as ConstellationField, now);
            },
        };
    },
});

// Re-seed when the seed/count/speed change (a fresh field).
watch(
    () => [props.seed, props.count, props.speed],
    () => {
        field.nodes = [];
    },
);

// ── pointer reactivity (host listeners; gated off under reduced-motion) ──────
function toLocal(e: PointerEvent): ConstellationPointer | null {
    const canvas = canvasRef.value;
    if (!canvas) return null;
    const r = canvas.getBoundingClientRect();
    if (!r.width || !r.height) return null;
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    if (nx < 0 || ny < 0 || nx > 1 || ny > 1) return null;
    return { x: nx * field.w, y: ny * field.h };
}

function onPointerMove(e: PointerEvent): void {
    if (handle.reducedMotion) return;
    const p = toLocal(e);
    if (p) {
        pointer.x = p.x;
        pointer.y = p.y;
    } else {
        pointer.x = -1;
        pointer.y = -1;
    }
}
function onPointerLeave(): void {
    pointer.x = -1;
    pointer.y = -1;
}
function onPointerDown(e: PointerEvent): void {
    if (handle.reducedMotion) return;
    const p = toLocal(e);
    if (p) ripples.push({ x: p.x, y: p.y, start: -1 });
}

let cleanup: (() => void) | null = null;
watch(
    canvasRef,
    (canvas) => {
        cleanup?.();
        cleanup = null;
        if (!canvas || !props.pointerReactive) return;
        const host = canvas.parentElement ?? canvas;
        host.addEventListener("pointermove", onPointerMove as EventListener);
        host.addEventListener("pointerleave", onPointerLeave);
        host.addEventListener("pointerdown", onPointerDown as EventListener);
        cleanup = () => {
            host.removeEventListener("pointermove", onPointerMove as EventListener);
            host.removeEventListener("pointerleave", onPointerLeave);
            host.removeEventListener("pointerdown", onPointerDown as EventListener);
        };
    },
    { immediate: true },
);

onScopeDispose(() => cleanup?.());

// Re-export the node type so a consumer's drawOverlay can type its field.
export type { ConstellationNode };
</script>

<template>
    <div class="constellation-host" :class="props.class">
        <canvas ref="canvasRef" class="constellation-canvas" aria-hidden="true" />
    </div>
</template>

<style scoped>
.constellation-host {
    position: relative;
    /* Isolate as a layout root — the lattice fills its host footprint. */
    contain: layout style;
}

.constellation-canvas {
    display: block;
    width: 100%;
    height: 100%;
}
</style>
