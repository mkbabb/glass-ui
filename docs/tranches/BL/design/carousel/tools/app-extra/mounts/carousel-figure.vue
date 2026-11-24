<script setup lang="ts">
// A live figure for the carousel study's heavy test page (carousel-hero.vue): a stand-in
// for an atlas map or chart made interactive, redrawn on every animation frame.
//   kind=svg     360 circles whose radius and position change every frame (setAttribute)
//   kind=canvas  2400 arcs repainted every frame on a 2D canvas at device resolution
// live=always  runs on every frame, whatever its slide is doing (a naive mount)
// live=active  runs only while its slide is active and the strip is still (the rule
//              daraksha's portraits follow); carousel-hero.vue then sets contain: paint
//              on each slide's frame
// window.__figureStats counts frames drawn and the ms spent drawing, per figure.
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useSlideContext } from "@glass/components/deck";
import { useCarousel } from "@glass/components/carousel";

const props = defineProps<{ kind: "svg" | "canvas"; seed: number; live: "always" | "active" | "slot"; running?: boolean }>();

const slide = useSlideContext();
const { deck } = useCarousel();
const moving = computed(
    () =>
        Math.abs(deck.velocity.value) > 0.01 ||
        Math.abs(deck.position.value - Math.round(deck.position.value)) > 0.002,
);
const runs = () => props.live === "always" || (props.live === "slot" ? !!props.running : slide.active.value && !moving.value);

const svgEl = ref<SVGSVGElement | null>(null);
const canvasEl = ref<HTMLCanvasElement | null>(null);
const W = 800;
const H = 500;
const NS = 360;
const NC = 2400;

type Stats = { frames: number; ms: number; skipped: number };
const all = ((window as unknown as { __figureStats?: Record<number, Stats> }).__figureStats ??= {});
const stats: Stats = (all[props.seed] = { frames: 0, ms: 0, skipped: 0 });

let rnd = 1 + props.seed * 7919;
const r = () => ((rnd = (rnd * 16807) % 2147483647) / 2147483647);
const pts = Array.from({ length: Math.max(NS, NC) }, () => ({ x: r() * W, y: r() * H, p: r() * 6.28, s: 0.5 + r() * 2 }));

let circles: SVGCircleElement[] = [];
let raf = 0;

function drawSvg(t: number) {
    for (let k = 0; k < circles.length; k++) {
        const c = circles[k]!;
        const q = pts[k]!;
        const a = t * 0.0015 * q.s + q.p;
        c.setAttribute("cx", (q.x + Math.cos(a) * 6).toFixed(1));
        c.setAttribute("cy", (q.y + Math.sin(a) * 6).toFixed(1));
        c.setAttribute("r", (3 + 2.5 * Math.sin(a * 1.3)).toFixed(2));
    }
}

function drawCanvas(t: number) {
    const cv = canvasEl.value;
    if (!cv) return;
    const dpr = window.devicePixelRatio || 1;
    const w = Math.max(1, Math.round(cv.clientWidth * dpr));
    const h = Math.max(1, Math.round(cv.clientHeight * dpr));
    if (cv.width !== w || cv.height !== h) {
        cv.width = w;
        cv.height = h;
    }
    const g = cv.getContext("2d");
    if (!g) return;
    g.setTransform(w / W, 0, 0, h / H, 0, 0);
    g.clearRect(0, 0, W, H);
    g.fillStyle = `hsl(${(props.seed * 40 + 200) % 360} 55% 45% / 0.55)`;
    for (let k = 0; k < NC; k++) {
        const q = pts[k]!;
        const a = t * 0.0015 * q.s + q.p;
        g.beginPath();
        g.arc(q.x + Math.cos(a) * 6, q.y + Math.sin(a) * 6, 2 + 1.5 * Math.sin(a * 1.3) + 1.6, 0, 6.2832);
        g.fill();
    }
}

function tick(t: number) {
    raf = requestAnimationFrame(tick);
    if (!runs()) {
        stats.skipped++;
        return;
    }
    const s = performance.now();
    if (props.kind === "svg") drawSvg(t);
    else drawCanvas(t);
    stats.ms += performance.now() - s;
    stats.frames++;
}

onMounted(() => {
    if (props.kind === "svg" && svgEl.value) {
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("fill", `hsl(${(props.seed * 40 + 200) % 360} 55% 45%)`);
        g.setAttribute("fill-opacity", "0.55");
        for (let k = 0; k < NS; k++) {
            const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            g.append(c);
            circles.push(c);
        }
        svgEl.value.append(g);
        drawSvg(0);
    }
    raf = requestAnimationFrame(tick);
});
onBeforeUnmount(() => cancelAnimationFrame(raf));
</script>

<template>
    <svg
        v-if="kind === 'svg'"
        ref="svgEl"
        class="figure"
        :viewBox="`0 0 ${W} ${H}`"
        :data-live="live"
        aria-hidden="true"
    />
    <canvas
        v-else
        ref="canvasEl"
        class="figure"
        :data-live="live"
        aria-hidden="true"
    />
</template>

<style scoped>
.figure {
    display: block;
    inline-size: 100%;
    block-size: 100%;
}
</style>
