<script setup lang="ts">
// FourierStudioStage — the Canvas2D FOREGROUND stage of the Fourier studio
// (BA.W-FOURIER-STUDIO scope 3). Unlike the ambient <FourierField> (a recessive
// background), this is a teaching stage: it draws the epicycle CHAIN (positionsAt
// truncated to N) underneath the visibly-ASSEMBLING partial-sum CURVE
// (partialSumAt swept over t at the same N) so a user dragging the 1..K slider
// WATCHES the curve resolve term by term — the fourier-analysis reference's
// signature beauty (BA-FOUR-2).
//
// It composes the useCanvas2D substrate (the offscreen/tab-hidden/reduced-motion
// park for free — NO hand-rolled rAF here; the studio's controllable clock owns
// the loop), and reads its draw entirely off the live studio config + the
// injected clock getter — the epicycle visibility/count axis and the harmonic-sum
// N axis are ORTHOGONAL (BA-FOUR-3): N truncates the summed curve; the epicycle
// toggle/count governs the chain draw without touching the curve.
import { onMounted, useTemplateRef, watch } from "vue";
import { useCanvas2D, resolveCanvasColor } from "../../../src/composables/glass/canvas2d";
import { useGlobalDark } from "../../../src/composables/dark";
import {
    positionsAt,
    partialSumAt,
    type BasisComponent,
} from "../../../src/components/custom/fourier-field";

const props = defineProps<{
    /** The spectrum being reconstructed (a generated elliptic spectrum OR a curated shape's DFT). */
    spectrum: readonly BasisComponent[];
    /** Harmonic count N — truncates the drawn spectrum + the assembling partial-sum curve. */
    harmonics: number;
    /** Show the rotating epicycle chain (orthogonal to N). */
    showEpicycles: boolean;
    /** How many epicycle arms to draw (≤ N; orthogonal to the summed curve). */
    epicycleCount: number;
    /** The CSS color token for the curve (resolved via the canvas probe). */
    color: string;
    /** The injected controllable clock — returns t ∈ [0,1). The studio transport owns it. */
    clock: () => number;
}>();

const hostRef = useTemplateRef<HTMLElement>("hostRef");
const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef");
const { isDark } = useGlobalDark();

// Cached resolved colors (re-resolved on a color/dark change, not per frame).
let curveRgb = "rgb(0,0,0)";
let chainRgb = "rgba(0,0,0,0.5)";
let mutedRgb = "rgba(0,0,0,0.28)";

function refreshColors(): void {
    const el = hostRef.value;
    if (!el) return;
    curveRgb = resolveCanvasColor(props.color, el);
    // The chain is the muted foreground (structure, not the brand curve).
    chainRgb = resolveCanvasColor("--muted-foreground", el);
    mutedRgb = resolveCanvasColor("--border", el);
}

// A stable view-fit: the spectrum's curve bbox over a full period, sized once per
// spectrum so the curve never clips and the scale holds across N (the assembling
// curve grows INTO the full bbox, never re-fitting on every N tick).
function fitBox(spec: readonly BasisComponent[]): {
    cx: number;
    cy: number;
    spanX: number;
    spanY: number;
} {
    const SAMPLES = 360;
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (let i = 0; i < SAMPLES; i++) {
        const [x, y] = partialSumAt(spec as BasisComponent[], i / SAMPLES);
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
    }
    return {
        cx: (minX + maxX) / 2,
        cy: (minY + maxY) / 2,
        spanX: Math.max(1e-3, maxX - minX),
        spanY: Math.max(1e-3, maxY - minY),
    };
}

onMounted(() => {
    const canvas = canvasRef.value;
    if (!canvas) return;
    refreshColors();

    let box = fitBox(props.spectrum);

    // Re-fit when the spectrum identity changes (a shape-source swap), NOT on
    // every N tick (the assembling curve must grow inside a stable bbox).
    watch(
        () => props.spectrum,
        () => {
            box = fitBox(props.spectrum);
        },
    );
    watch([() => props.color, isDark], () => refreshColors());

    const handle = useCanvas2D({
        canvas: canvasRef,
        setup: () => ({
            render(c) {
                const w = canvas.clientWidth || canvas.offsetWidth || 0;
                const h = canvas.clientHeight || canvas.offsetHeight || 0;
                if (!w || !h) return;

                const spec = props.spectrum;
                const n = Math.max(1, Math.min(props.harmonics, spec.length));
                const t = props.clock();

                const margin = 0.8;
                const scale = Math.min((w / box.spanX) * margin, (h / box.spanY) * margin);
                const px = w / 2;
                const py = h / 2;
                const toScreen = (mx: number, my: number): [number, number] => [
                    px + (mx - box.cx) * scale,
                    py + (my - box.cy) * scale,
                ];

                c.clearRect(0, 0, w, h);

                // ── Pass A — the assembling partial-sum CURVE at N harmonics.
                // Sweep t' over a full period and join partialSumAt(spec, t', n)
                // points: at n=1 a single ellipse, filling toward the full shape
                // as N grows (BA-FOUR-2, the "watch it sum" reference idiom).
                const CURVE_SAMPLES = 480;
                c.beginPath();
                for (let i = 0; i <= CURVE_SAMPLES; i++) {
                    const tt = i / CURVE_SAMPLES;
                    const [mx, my] = partialSumAt(spec as BasisComponent[], tt, n);
                    const [sx, sy] = toScreen(mx, my);
                    if (i === 0) c.moveTo(sx, sy);
                    else c.lineTo(sx, sy);
                }
                c.strokeStyle = curveRgb;
                c.lineWidth = 2.6;
                c.lineCap = "round";
                c.lineJoin = "round";
                c.globalAlpha = 0.95;
                c.stroke();

                // ── Pass B — the rotating epicycle CHAIN at the current t
                // (orthogonal to N: the showEpicycles toggle + epicycleCount drive
                // it WITHOUT changing the summed curve). The chain's final tip is
                // the partial-sum point partialSumAt returns at the same N — the
                // curve and chain share the truncation axis.
                if (props.showEpicycles) {
                    const armN = Math.max(1, Math.min(props.epicycleCount, n, spec.length));
                    const chain = positionsAt(spec as BasisComponent[], t, armN);
                    c.lineCap = "round";
                    c.lineJoin = "round";
                    for (let i = 1; i < chain.length; i++) {
                        const [ax, ay] = toScreen(chain[i - 1][0], chain[i - 1][1]);
                        const [bx, by] = toScreen(chain[i][0], chain[i][1]);
                        const radius = Math.hypot(bx - ax, by - ay);
                        // The orbit circle around the prior tip.
                        c.strokeStyle = mutedRgb;
                        c.lineWidth = 1;
                        c.globalAlpha = 0.5;
                        c.beginPath();
                        c.arc(ax, ay, radius, 0, Math.PI * 2);
                        c.stroke();
                        // The arm to the next tip.
                        c.strokeStyle = chainRgb;
                        c.lineWidth = 1.5;
                        c.globalAlpha = 0.85;
                        c.beginPath();
                        c.moveTo(ax, ay);
                        c.lineTo(bx, by);
                        c.stroke();
                        // The filled joint dot.
                        c.fillStyle = chainRgb;
                        c.globalAlpha = 0.9;
                        c.beginPath();
                        c.arc(ax, ay, 2, 0, Math.PI * 2);
                        c.fill();
                    }
                    // The traveling tip dot (the brand-hue head the eye locks onto).
                    const tip = chain[chain.length - 1];
                    const [tx, ty] = toScreen(tip[0], tip[1]);
                    c.fillStyle = curveRgb;
                    c.globalAlpha = 1;
                    c.beginPath();
                    c.arc(tx, ty, 4, 0, Math.PI * 2);
                    c.fill();
                } else {
                    // No epicycles → still mark the head so the curve has a leading
                    // point (the partial-sum tip at the current t + N).
                    const [hx, hy] = toScreen(
                        ...partialSumAt(spec as BasisComponent[], t, n),
                    );
                    c.fillStyle = curveRgb;
                    c.globalAlpha = 1;
                    c.beginPath();
                    c.arc(hx, hy, 4, 0, Math.PI * 2);
                    c.fill();
                }

                c.globalAlpha = 1;
            },
        }),
    });

    // Re-arm + repaint when the studio config changes even while parked (a config
    // edit under pause must re-paint a fresh frozen frame). The clock advance
    // itself is driven by the parent studio's useRAFLoop, which keeps this loop
    // live while playing; a scrub under pause writes the clock the next frame the
    // parent wakes — so a config-change wake covers the parked-config-edit case.
    watch(
        () =>
            [
                props.harmonics,
                props.showEpicycles,
                props.epicycleCount,
                props.color,
            ] as const,
        () => handle.wake(),
    );
});
</script>

<template>
    <div ref="hostRef" class="fourier-studio-stage">
        <canvas ref="canvasRef" class="fourier-studio-stage-canvas" aria-hidden="true" />
    </div>
</template>

<style scoped>
.fourier-studio-stage {
    position: relative;
    width: 100%;
    height: 100%;
    contain: layout style;
}
.fourier-studio-stage-canvas {
    display: block;
    width: 100%;
    height: 100%;
}
</style>
