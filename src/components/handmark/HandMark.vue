<!--
  HandMark — one pen making four gestures.

  The word stays real, selectable text; the mark is an aria-hidden SVG laid over (or,
  for the highlight, behind) it. Geometry is emitted per `Range.getClientRects()`
  against the SVG's OWN measured rect, in 1:1 CSS pixels — no viewBox, no
  preserveAspectRatio, so a nib is the same nib at every host width. A phrase marks
  once; a wrap yields one mark per line rect and never bridges. Pre-measure renders no
  SVG at all: a mark that cannot be measured is absent, never a placeholder.
-->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from "vue";
import { FRAME_MS } from "../../composables/motion/core/constants";
import {
    BAND_HEIGHT,
    type Frame,
    type HandShape,
    type Point,
    fillPolygon,
    handBand,
    handLine,
    handRing,
    markDuration,
    markSeed,
    minJerk,
    nib,
    ringReserve,
    serialize,
    strokeRibbon,
} from "./stroke";

const props = withDefaults(
    defineProps<{
        shape?: HandShape;
        color?: string;
        weight?: number;
        seed?: number;
        draw?: boolean;
    }>(),
    { shape: "underline", color: "currentColor", weight: 1, draw: true },
);

interface Mark {
    ink: string;
    guide: string;
    stroke: number;
    delay: number;
    duration: number;
    /** The mask's own window, in the SAME user units the geometry is emitted in. */
    window: Frame;
}

const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
const root = ref<HTMLElement | null>(null);
const frames = ref<SVGSVGElement[]>([]);
const marks = ref<Mark[]>([]);
const reserve = ref(0);
const swell = ref(1);
const lag = ref(0);
const settling = ref(false);

/** The highlight takes a HUE; every other gesture takes a colour. */
const bandHue = computed(() => {
    const n = Number(props.color);
    return Number.isFinite(n) ? n : 78;
});
const inkFill = computed(() => (props.shape === "highlight" ? "var(--hm-band)" : props.color));
const hostStyle = computed(() => ({
    "--hm-h": `${bandHue.value}`,
    "--hm-reserve": reserve.value ? `${reserve.value}px` : "0px",
}));

function polylineLength(p: Point[]): number {
    let sum = 0;
    for (let i = 1; i < p.length; i++) sum += Math.hypot(p[i].x - p[i - 1].x, p[i].y - p[i - 1].y);
    return sum;
}

/** The nearest block ancestor: the scope a mark's identity and its stagger are read in. */
function blockScope(el: HTMLElement): HTMLElement {
    let p = el.parentElement;
    while (p && getComputedStyle(p).display.startsWith("inline")) p = p.parentElement;
    return p ?? document.body;
}

/**
 * Identity from the DOM, never from mount order and never from the viewport: the index
 * among same-shape marks in the nearest block ancestor, and the line index within it.
 * Both survive a scroll, a revisit, and a hydration; both change under reorder, which
 * is correct, because the mark moved.
 */
function place(el: HTMLElement, top: number): { index: number; line: number } {
    const scope = blockScope(el);
    const kin = Array.from(scope.querySelectorAll<HTMLElement>(`.hm[data-shape="${props.shape}"]`));
    const rows = new Set<number>();
    for (const peer of Array.from(scope.querySelectorAll<HTMLElement>(".hm"))) {
        const r = peer.getBoundingClientRect();
        if (r.height > 0 && r.top < top - 1) rows.add(Math.round(r.top));
    }
    return { index: Math.max(0, kin.indexOf(el)), line: rows.size };
}

/**
 * The slot's LINE boxes — one rect per line, whatever the markup.
 *
 * `Range.getClientRects()` returns the border box of every element fully contained in
 * the range IN ADDITION to the text rects, so a range taken over the host's child
 * nodes reports a `<del>` / `<mark>` wrapper twice per line and the component chisels
 * every line twice. Ranging over TEXT NODES admits no element box at any nesting
 * depth; the per-line merge then puts back the one thing a single range gave for
 * free — and does it for nested inline markup, which the single range never handled
 * either.
 */
function slotRects(el: HTMLElement): Frame[] {
    const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const range = document.createRange();
    const rows: Frame[] = [];
    for (let n = walk.nextNode(); n; n = walk.nextNode()) {
        if ((n.textContent ?? "").trim().length === 0) continue;
        if (n.parentElement?.closest("svg")) continue;
        range.selectNodeContents(n);
        for (const r of Array.from(range.getClientRects())) {
            if (r.width <= 0 || r.height <= 0) continue;
            // Same line box ⇔ the two rects share more than half a line vertically.
            const row = rows.find(
                (q) =>
                    Math.min(q.y + q.height, r.bottom) - Math.max(q.y, r.top) >
                    Math.min(q.height, r.height) / 2,
            );
            if (!row) {
                rows.push({ x: r.left, y: r.top, width: r.width, height: r.height });
                continue;
            }
            const right = Math.max(row.x + row.width, r.right);
            const bottom = Math.max(row.y + row.height, r.bottom);
            row.x = Math.min(row.x, r.left);
            row.y = Math.min(row.y, r.top);
            row.width = right - row.x;
            row.height = bottom - row.y;
        }
    }
    range.detach?.();
    return rows.sort((a, b) => a.y - b.y || a.x - b.x);
}

/**
 * The mask window that gates the ink, in the geometry's OWN user units.
 *
 * A percentage window resolves against the SVG's own box, and this SVG is
 * `width: 100%` inside a `display: inline` host — a box the engine resolves to `0px`
 * the moment the slot wraps or sits in a `<del>` / `<mark>`. A zero-area window masks
 * every pixel away, so perfect geometry paints nothing. Real units resolve against
 * nothing: the window is the mark's own bounds, opened by the guide's half-stroke
 * (which is the round cap's reach, and comfortably past the ribbon's half-nib) and one
 * pixel of antialias.
 */
function maskWindow(points: Point[], stroke: number): Frame {
    const pad = stroke / 2 + 1;
    // Serialized to the same 3 decimals the geometry is, rounded OUTWARD, so the
    // window can only ever be wider than the ink it gates, never a hair narrower.
    const lo = (v: number[]) => Math.floor((Math.min(...v) - pad) * 1000) / 1000;
    const hi = (v: number[]) => Math.ceil((Math.max(...v) + pad) * 1000) / 1000;
    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    const out = (a: number, b: number) => Math.ceil((b - a) * 1000) / 1000;
    const x = lo(xs);
    const y = lo(ys);
    return { x, y, width: out(x, hi(xs)), height: out(y, hi(ys)) };
}

function geometryFor(rect: Frame, fs: number, seed: number): Omit<Mark, "delay" | "duration"> & {
    length: number;
} {
    if (props.shape === "highlight") {
        const band = handBand(rect, { fs, seed });
        const half = band.length / 2;
        const guide: Point[] = [
            { x: band[0].x, y: (band[0].y + band[band.length - 1].y) / 2 },
            { x: band[half - 1].x, y: (band[half - 1].y + band[half].y) / 2 },
        ];
        const stroke = BAND_HEIGHT * fs * 1.6;
        return {
            ink: fillPolygon(band),
            guide: serialize(guide),
            length: polylineLength(guide),
            stroke,
            window: maskWindow(band.concat(guide), stroke),
        };
    }
    const w = nib(props.weight * swell.value, fs);
    const line =
        props.shape === "circle"
            ? handRing(rect, { fs, seed })
            : handLine(rect, { fs, seed, kind: props.shape === "strike" ? "strike" : "underline" });
    return {
        ink: strokeRibbon(line, w),
        guide: serialize(line),
        length: polylineLength(line),
        stroke: w * 1.6,
        window: maskWindow(line, w * 1.6),
    };
}

function measure(): void {
    const el = root.value;
    if (!el) return;
    const rects = slotRects(el);
    if (rects.length === 0) return;
    const fs = parseFloat(getComputedStyle(el).fontSize) || 16;
    const origin = (frames.value[0] ?? el).getBoundingClientRect();
    const { index, line } = place(el, rects[0].y);
    const seed = props.seed ?? markSeed((el.textContent ?? "").trim(), index);

    // THE FRAME-RANK LAW: a line's lead over the one above it is four frames of the
    // display's own beat, not a minted millisecond. `FRAME_MS` is the shared token and
    // 4 is this family's rank — the same grammar the timeline reads, so the library
    // owns one lead/lag idea rather than two coincidentally-similar numbers.
    let clock = line * 4 * FRAME_MS;
    const next: Mark[] = [];
    for (const r of rects) {
        const frame: Frame = {
            x: r.x - origin.left,
            y: r.y - origin.top,
            width: r.width,
            height: r.height,
        };
        const g = geometryFor(frame, fs, seed + next.length);
        const duration = markDuration(g.length);
        next.push({
            ink: g.ink,
            guide: g.guide,
            stroke: g.stroke,
            window: g.window,
            delay: clock,
            duration,
        });
        clock += duration;
    }
    marks.value = next;
    reserve.value =
        props.shape === "circle"
            ? Math.max(0, ringReserve({ x: 0, y: 0, width: rects[0].width, height: rects[0].height }, fs))
            : 0;
}

/**
 * The draw is a mask of the centreline, dashed open and pulled shut on a minimum-jerk
 * clock. A spring would be wrong here: a stroke cannot un-draw past its own end.
 */
function run(from = 0): void {
    if (typeof document === "undefined" || !root.value) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const press = getComputedStyle(root.value).getPropertyValue("--spring-press").trim();
    const easing = from > 0 && press ? press : minJerk();
    for (const el of Array.from(root.value.querySelectorAll<SVGPathElement>(".hm-guide"))) {
        const total = el.getTotalLength?.() ?? 0;
        if (!total) continue;
        const mark = marks.value[Number(el.dataset.i ?? 0)];
        el.style.strokeDasharray = `${total}`;
        el.style.strokeDashoffset = "0";
        if (!props.draw || reduce || typeof el.animate !== "function") continue;
        el.animate([{ strokeDashoffset: total * (1 - from) }, { strokeDashoffset: 0 }], {
            duration: from > 0 ? 220 : (mark?.duration ?? 400),
            delay: from > 0 ? 0 : (mark?.delay ?? 0),
            easing,
            fill: "both",
        });
    }
}

function play(): void {
    run(0);
}

/** Re-ink: one replay, every modality. The nib swells 4%; the centreline never moves. */
function reink(): void {
    if (swell.value !== 1) return;
    swell.value = 1.04;
    measure();
    run(0.35);
    window.setTimeout(() => {
        swell.value = 1;
        measure();
    }, 220);
}

let quiet: number | null = null;
let lastY = 0;

/**
 * Ink-lag: the mark trails its word by a fraction of a nib, then dries into place.
 *
 * The signal is the WORD'S OWN viewport motion, not any one scroller's offset. A mark
 * lives wherever it is put — the document, an app shell's pane, a dialog, a nested
 * pane inside that — and only its own rect knows which of those moved. Reading
 * `window.scrollY` answers for the document alone, so anywhere else the mark trails by
 * a measured, meaningless zero.
 */
function onScroll(): void {
    const el = root.value;
    if (!el) return;
    const y = el.getBoundingClientRect().top;
    const delta = y - lastY;
    lastY = y;
    settling.value = false;
    lag.value = Math.sign(delta) * Math.min(1.5, Math.abs(0.06 * delta));
    if (quiet !== null) window.clearTimeout(quiet);
    quiet = window.setTimeout(() => {
        settling.value = true;
        lag.value = 0;
    }, 90);
}

let ro: ResizeObserver | null = null;

onMounted(() => {
    measure();
    void nextTick(() => {
        measure();
        run(0);
    });
    void document.fonts?.ready?.then(() => {
        measure();
        run(0);
    });
    if (typeof ResizeObserver !== "undefined" && root.value) {
        ro = new ResizeObserver(() => measure());
        ro.observe(root.value);
    }
    lastY = root.value?.getBoundingClientRect().top ?? 0;
    // A scroll event DOES NOT BUBBLE — it is dispatched at the scroller and stops
    // there — but every scroller in the document lies on the capture path from the
    // document down. One capture listener therefore hears every pane on the page,
    // including the document's own, with no ancestor to guess at.
    document.addEventListener("scroll", onScroll, { capture: true, passive: true });
});

onBeforeUnmount(() => {
    ro?.disconnect();
    if (quiet !== null) window.clearTimeout(quiet);
    document.removeEventListener("scroll", onScroll, { capture: true });
});

watch(() => [props.shape, props.weight, props.seed], () => measure());

defineExpose({ play });
</script>

<template>
    <span
        class="hm"
        ref="root"
        :data-shape="shape"
        :style="hostStyle"
        @pointerenter="reink"
        @pointerdown="reink"
        @focusin="reink"
    >
        <del v-if="shape === 'strike'"><slot /></del>
        <mark v-else-if="shape === 'highlight'"><slot /></mark>
        <slot v-else />
        <svg
            v-for="(m, i) in marks"
            :key="i"
            ref="frames"
            class="hm-mark"
            :class="{ 'hm-mark--settling': settling }"
            :style="{ transform: `translateY(${-lag}px)` }"
            aria-hidden="true"
            focusable="false"
        >
            <defs>
                <mask
                    :id="`${uid}-${i}`"
                    maskUnits="userSpaceOnUse"
                    :x="m.window.x"
                    :y="m.window.y"
                    :width="m.window.width"
                    :height="m.window.height"
                >
                    <path
                        class="hm-guide"
                        :data-i="i"
                        :d="m.guide"
                        fill="none"
                        stroke="#fff"
                        :stroke-width="m.stroke"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </mask>
            </defs>
            <path class="hm-ink" :d="m.ink" :fill="inkFill" :mask="`url(#${uid}-${i})`" />
        </svg>
    </span>
</template>

<style scoped>
.hm {
    position: relative;
    display: inline;
    isolation: isolate;
    padding-inline: var(--hm-reserve, 0px);
    --hm-h: 78;
    --hm-band: light-dark(oklch(0.86 0.16 var(--hm-h)), oklch(0.44 0.16 var(--hm-h)));
}
.hm del {
    text-decoration: none;
}
.hm mark {
    background: none;
    color: inherit;
}
.hm-mark {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
    pointer-events: none;
}
.hm[data-shape="highlight"] .hm-mark {
    z-index: -1;
}
.hm-mark--settling {
    transition: transform var(--spring-world-duration) var(--spring-world);
}
.hm-ink {
    /* A spring owns its own clock — the settle rides `--spring-present` and the
       duration that curve was solved for, never a literal that drifts away from it
       the first time the preset is retuned. */
    animation: hm-settle var(--spring-present-duration) var(--spring-present) both;
}
@keyframes hm-settle {
    from {
        opacity: 0.85;
    }
    to {
        opacity: 1;
    }
}
@media (prefers-reduced-motion: reduce) {
    .hm-mark {
        transform: none !important;
    }
    .hm-mark--settling {
        transition: none;
    }
    .hm-ink {
        animation: none;
    }
}
</style>
