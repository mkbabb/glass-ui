<script setup lang="ts">
// The ℱ-wordmark redraw egg (E1). A full-screen Canvas2D overlay that
// reconstructs the ℱ glyph as a Fourier epicycle curve — the dominant phasors
// first, the chain tracing the outline — then fades. The logo is literally named
// for the transform; the component literally does it.
//
// Built on the SHIPPED fourier-field math: `dftFromPoints` (the forward DFT,
// sibling of the shipped `positionsAt` inverse) turns the hand-traced ℱ outline
// into a spectrum; `positionsAt` walks the epicycle chain at each t.
//
// PRM-gated: under `prefers-reduced-motion: reduce` the overlay paints the
// COMPLETED ℱ curve once (no animated reconstruction) then fades — the static
// register.
import { onMounted, onBeforeUnmount, ref } from "vue";
import { dftFromPoints, positionsAt } from "../../src/components/custom/fourier-field";
import type { BasisComponent } from "../../src/components/custom/fourier-field";
import { fGlyphPoints } from "./fGlyphPoints";

const emit = defineEmits<{ done: [] }>();

const canvas = ref<HTMLCanvasElement | null>(null);
let raf = 0;
let start = 0;

const prefersReduced =
    typeof matchMedia !== "undefined" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;

// The ℱ spectrum (forward DFT of the glyph outline), DC subtracted so the chain
// draws centered. Frequencies are already in epicycle order (0, +1, -1, +2, …).
const spectrum: BasisComponent[] = (() => {
    const pts = fGlyphPoints(128);
    const comps = dftFromPoints(pts);
    // Drop the DC term (index 0) — center the chain on the origin.
    return comps.filter((c) => c.index !== 0);
})();

// Pixel scale + center for the drawn glyph (the unit-box spectrum × scale).
function layout(c: HTMLCanvasElement) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    c.width = Math.round(w * dpr);
    c.height = Math.round(h * dpr);
    c.style.width = `${w}px`;
    c.style.height = `${h}px`;
    const ctx = c.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const scale = Math.min(w, h) * 0.42;
    return { ctx, w, h, scale, cx: w / 2, cy: h / 2 };
}

// The accent ink (the same fourier viz token the wordmark wears).
function inkColor(): string {
    const probe = document.createElement("span");
    probe.style.color = "var(--viz-fourier, #d4344a)";
    document.body.appendChild(probe);
    const c = getComputedStyle(probe).color || "#d4344a";
    probe.remove();
    return c;
}

function draw(now: number) {
    const c = canvas.value;
    if (!c) return;
    const { ctx, w, h, scale, cx, cy } = layout(c);
    if (!ctx) return;

    const elapsed = now - start;
    const DRAW_MS = 2200; // the reconstruction sweep
    const FADE_MS = 700;
    const TOTAL = DRAW_MS + FADE_MS;
    const ink = inkColor();

    ctx.clearRect(0, 0, w, h);

    // Trace fraction: 1 under reduce (full curve at once), else swept 0→1.
    const traceT = prefersReduced ? 1 : Math.min(elapsed / DRAW_MS, 1);
    // Fade-out alpha once the trace completes.
    const fadeStart = prefersReduced ? 0 : DRAW_MS;
    const fadeAlpha =
        elapsed <= fadeStart
            ? 1
            : Math.max(0, 1 - (elapsed - fadeStart) / FADE_MS);

    // The reconstructed outline up to traceT.
    const STEPS = 220;
    ctx.globalAlpha = fadeAlpha;
    ctx.strokeStyle = ink;
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.beginPath();
    const upTo = Math.max(2, Math.floor(STEPS * traceT));
    for (let i = 0; i <= upTo; i++) {
        const t = i / STEPS;
        const chain = positionsAt(spectrum, t);
        const tip = chain[chain.length - 1];
        const x = cx + tip[0] * scale;
        const y = cy + tip[1] * scale;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // The live epicycle arms + tip (only while animating, not under reduce).
    if (!prefersReduced && traceT < 1) {
        const tCur = traceT;
        const chain = positionsAt(spectrum, tCur);
        ctx.globalAlpha = fadeAlpha * 0.45;
        ctx.lineWidth = 1;
        for (let i = 1; i < chain.length; i++) {
            const px = cx + chain[i - 1][0] * scale;
            const py = cy + chain[i - 1][1] * scale;
            const nx = cx + chain[i][0] * scale;
            const ny = cy + chain[i][1] * scale;
            const r = Math.hypot(nx - px, ny - py);
            ctx.strokeStyle = ink;
            ctx.beginPath();
            ctx.arc(px, py, r, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(nx, ny);
            ctx.stroke();
        }
        // The leading dot.
        const tip = chain[chain.length - 1];
        ctx.globalAlpha = fadeAlpha;
        ctx.fillStyle = ink;
        ctx.beginPath();
        ctx.arc(cx + tip[0] * scale, cy + tip[1] * scale, 4, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;

    if (elapsed >= TOTAL) {
        emit("done");
        return;
    }
    raf = requestAnimationFrame(draw);
}

onMounted(() => {
    start = performance.now();
    raf = requestAnimationFrame(draw);
});

onBeforeUnmount(() => {
    cancelAnimationFrame(raf);
});
</script>

<template>
    <canvas
        ref="canvas"
        class="pointer-events-none fixed inset-0 z-[200]"
        data-egg="f-redraw"
        aria-hidden="true"
    />
</template>
