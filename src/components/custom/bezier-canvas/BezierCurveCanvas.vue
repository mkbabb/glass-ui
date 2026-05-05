<script setup lang="ts">
import { computed, ref, type CSSProperties } from "vue";
import { cn } from "../../../utils/cn";

/**
 * <BezierCurveCanvas> — SVG-based cubic-bezier editor running from
 * (0, 0) to (1, 1) with two draggable control points. The viewBox
 * auto-clamps for overshoot so handles outside the unit square remain
 * visible. Optional traveling progress dot consumes `:progress` (0..1)
 * for synchronization with an external rAF source.
 *
 * Lifted (with generalization) from keyframes.js's EasingCurveCanvas;
 * see `docs/tranches/G/research/E-keyframes.md` §EasingCurveCanvas for
 * the inheritance contract.
 */
export type Point = [number, number];

export interface BezierCurveCanvasProps {
    /** First control point (v-model:p1). */
    p1: Point;
    /** Second control point (v-model:p2). */
    p2: Point;
    /** Pixel width of the rendered SVG. */
    width?: number;
    /** Pixel height of the rendered SVG. */
    height?: number;
    /** Render the gridlines + axis labels. */
    showGrid?: boolean;
    /** Render the traveling progress dot. */
    showProgress?: boolean;
    /** Progress in [0, 1]; consumed when `showProgress`. */
    progress?: number;
    /** Stroke color override; defaults to `--easing-accent`. */
    color?: string;
    /** Disable handle drag. */
    readonly?: boolean;
    /** Accessible label for the SVG. */
    ariaLabel?: string;
    class?: string;
}

const props = withDefaults(defineProps<BezierCurveCanvasProps>(), {
    width: 240,
    height: 240,
    showGrid: true,
    showProgress: false,
    progress: 0,
    readonly: false,
    ariaLabel: "Bezier curve editor",
});

const emit = defineEmits<{
    "update:p1": [value: Point];
    "update:p2": [value: Point];
}>();

defineOptions({ name: "BezierCurveCanvas" });

const MAX_OVERSHOOT = 0.6;

const svgRef = ref<SVGSVGElement | null>(null);
const dragging = ref<"p1" | "p2" | null>(null);

const overshoot = computed(() => {
    const minY = Math.min(props.p1[1], props.p2[1], 0);
    const maxY = Math.max(props.p1[1], props.p2[1], 1);
    const lower = Math.max(0, -minY);
    const upper = Math.max(0, maxY - 1);
    return Math.min(MAX_OVERSHOOT, Math.max(lower, upper));
});

const viewBox = computed(() => {
    const o = overshoot.value;
    const min = -o;
    const size = 1 + 2 * o;
    return `${min} ${min} ${size} ${size}`;
});

const stroke = computed(() => props.color ?? "var(--easing-accent)");

// Handle radii in viewBox units; scale modestly with overshoot
const handleRadius = computed(() => 0.04 + overshoot.value * 0.01);
const strokeWidth = computed(() => 0.04 + overshoot.value * 0.01);
const gridStroke = computed(() => 0.008);

const pathD = computed(() => {
    const [x1, y1] = props.p1;
    const [x2, y2] = props.p2;
    // SVG y-down; flip y so curve grows upward
    const fy = (y: number) => 1 - y;
    return `M 0 ${fy(0)} C ${x1} ${fy(y1)} ${x2} ${fy(y2)} 1 ${fy(1)}`;
});

const gridLines = computed(() => {
    const step = 0.25;
    const lines: { x1: number; y1: number; x2: number; y2: number; major: boolean }[] = [];
    const o = overshoot.value;
    const lo = -o;
    const hi = 1 + o;
    for (let i = 0; i * step <= 1 + 1e-9; i++) {
        const v = i * step;
        const major = i === 0 || i === 4;
        lines.push({ x1: v, y1: lo, x2: v, y2: hi, major });
        lines.push({ x1: lo, y1: v, x2: hi, y2: v, major });
    }
    return lines;
});

function bezierPoint(t: number): Point {
    const [x1, y1] = props.p1;
    const [x2, y2] = props.p2;
    const u = 1 - t;
    const x = 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t;
    const y = 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t;
    return [x, y];
}

const progressPoint = computed<Point>(() => {
    const t = Math.max(0, Math.min(1, props.progress ?? 0));
    return bezierPoint(t);
});

function svgPointFromEvent(e: PointerEvent): Point | null {
    const svg = svgRef.value;
    if (!svg) return null;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const local = pt.matrixTransform(ctm.inverse());
    return [local.x, 1 - local.y];
}

function clampHandle(p: Point): Point {
    const o = MAX_OVERSHOOT;
    const x = Math.max(0, Math.min(1, p[0]));
    const y = Math.max(-o, Math.min(1 + o, p[1]));
    return [x, y];
}

function onHandleDown(which: "p1" | "p2", e: PointerEvent) {
    if (props.readonly) return;
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
    dragging.value = which;
}

function onSvgMove(e: PointerEvent) {
    if (!dragging.value) return;
    const p = svgPointFromEvent(e);
    if (!p) return;
    const clamped = clampHandle(p);
    if (dragging.value === "p1") emit("update:p1", clamped);
    else emit("update:p2", clamped);
}

function onSvgUp(e: PointerEvent) {
    if (!dragging.value) return;
    (e.currentTarget as Element).releasePointerCapture?.(e.pointerId);
    dragging.value = null;
}

const sizeStyle = computed<CSSProperties>(() => ({
    width: `${props.width}px`,
    height: `${props.height}px`,
}));

// Visible-y converter for SVG draws
function vy(y: number): number {
    return 1 - y;
}
</script>

<template>
    <svg
        ref="svgRef"
        :class="cn('bezier-canvas', props.class)"
        :viewBox="viewBox"
        :style="sizeStyle"
        :aria-label="ariaLabel"
        role="application"
        preserveAspectRatio="xMidYMid meet"
        @pointermove="onSvgMove"
        @pointerup="onSvgUp"
        @pointercancel="onSvgUp"
    >
        <!-- Grid + axes -->
        <g v-if="showGrid" class="bezier-canvas__grid">
            <line
                v-for="(line, i) in gridLines"
                :key="i"
                :x1="line.x1"
                :y1="vy(line.y1)"
                :x2="line.x2"
                :y2="vy(line.y2)"
                :stroke-width="line.major ? gridStroke * 2 : gridStroke"
                :class="['bezier-canvas__grid-line', line.major && 'is-major']"
            />
        </g>

        <!-- Handle leader lines -->
        <line
            class="bezier-canvas__leader"
            x1="0"
            :y1="vy(0)"
            :x2="p1[0]"
            :y2="vy(p1[1])"
            :stroke-width="strokeWidth * 0.5"
        />
        <line
            class="bezier-canvas__leader"
            x1="1"
            :y1="vy(1)"
            :x2="p2[0]"
            :y2="vy(p2[1])"
            :stroke-width="strokeWidth * 0.5"
        />

        <!-- Curve path -->
        <path
            class="bezier-canvas__curve"
            :d="pathD"
            :stroke="stroke"
            :stroke-width="strokeWidth"
            fill="none"
            stroke-linecap="round"
        />

        <!-- Endpoints -->
        <circle
            class="bezier-canvas__endpoint"
            cx="0"
            :cy="vy(0)"
            :r="handleRadius * 0.6"
            :fill="stroke"
        />
        <circle
            class="bezier-canvas__endpoint"
            cx="1"
            :cy="vy(1)"
            :r="handleRadius * 0.6"
            :fill="stroke"
        />

        <!-- Draggable handles -->
        <circle
            class="bezier-canvas__handle"
            :class="{ 'is-active': dragging === 'p1' }"
            :cx="p1[0]"
            :cy="vy(p1[1])"
            :r="handleRadius"
            :stroke="stroke"
            :stroke-width="strokeWidth * 0.6"
            fill="var(--background)"
            @pointerdown="(e) => onHandleDown('p1', e)"
        />
        <circle
            class="bezier-canvas__handle"
            :class="{ 'is-active': dragging === 'p2' }"
            :cx="p2[0]"
            :cy="vy(p2[1])"
            :r="handleRadius"
            :stroke="stroke"
            :stroke-width="strokeWidth * 0.6"
            fill="var(--background)"
            @pointerdown="(e) => onHandleDown('p2', e)"
        />

        <!-- Traveling progress dot -->
        <circle
            v-if="showProgress"
            class="bezier-canvas__progress"
            :cx="progressPoint[0]"
            :cy="vy(progressPoint[1])"
            :r="handleRadius * 0.7"
            :fill="stroke"
        />
    </svg>
</template>

<style scoped>
.bezier-canvas {
    display: block;
    color: var(--foreground);
    touch-action: none;
}

.bezier-canvas__grid-line {
    stroke: color-mix(in srgb, currentColor 12%, transparent);
}

.bezier-canvas__grid-line.is-major {
    stroke: color-mix(in srgb, currentColor 25%, transparent);
}

.bezier-canvas__leader {
    stroke: color-mix(in srgb, currentColor 30%, transparent);
    stroke-dasharray: 0.02 0.02;
}

.bezier-canvas__curve {
    transition: stroke-width var(--duration-fast) var(--ease-standard);
}

.bezier-canvas__endpoint {
    pointer-events: none;
}

.bezier-canvas__handle {
    cursor: grab;
    transition:
        r var(--duration-fast) var(--ease-standard),
        stroke-width var(--duration-fast) var(--ease-standard);
}

.bezier-canvas__handle:hover,
.bezier-canvas__handle.is-active {
    cursor: grabbing;
}

.bezier-canvas__progress {
    pointer-events: none;
    filter: drop-shadow(
        0 0 2px color-mix(in srgb, currentColor 50%, transparent)
    );
}

@media (prefers-reduced-motion: reduce) {
    .bezier-canvas__curve,
    .bezier-canvas__handle {
        transition: none;
    }
}
</style>
