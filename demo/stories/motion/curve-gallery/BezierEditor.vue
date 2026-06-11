<script setup lang="ts">
// AZ.W-MOTION-SUITE — the live editable cubic-bezier editor, transposed
// TAILWIND-FIRST from the keyframes EasingEditor + EasingCurveCanvas chassis
// (keyframes.js/demo/@/components/custom/EasingEditor.vue + EasingCurveCanvas.vue).
//
// The standalone keyframes CSS is RE-EXPRESSED via Tailwind utilities + token
// custom-properties — never pasted raw. The curve is driven by the REAL value.js
// `CSSCubicBezier` twin (the shipped sampler, no hand-rolled cubic). The dropdown
// seeds from the value.js `bezierPresets`; the readout is the complete re-parseable
// `cubic-bezier(x1, y1, x2, y2)` literal with copy. The curve reads `--motion-accent`
// (the glass-ui violet twin of ppmycota), the motion family's single color event.
import { computed, ref, useTemplateRef } from "vue";
import { CSSCubicBezier } from "../../../../src/composables/motion/curves";
import { bezierPresets } from "@mkbabb/value.js";
import { Button } from "../../../../src/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../../src/components/ui/select";
import { Check, Copy } from "@lucide/vue";

// The named presets the dropdown offers (the value.js bezier catalogue).
const PRESET_NAMES = Object.keys(bezierPresets) as (keyof typeof bezierPresets)[];

const preset = ref<string>("ease-out-back");
// The live, draggable control points [x1, y1, x2, y2].
const points = ref<[number, number, number, number]>([
    ...bezierPresets["ease-out-back"],
] as [number, number, number, number]);

function selectPreset(name: string): void {
    preset.value = name;
    const p = bezierPresets[name as keyof typeof bezierPresets];
    if (p) points.value = [...p] as [number, number, number, number];
}

// The REAL value.js twin — re-sampled whenever a handle moves.
const easingFn = computed(() => {
    const [x1, y1, x2, y2] = points.value;
    return CSSCubicBezier(x1, y1, x2, y2);
});

// The complete re-parseable readout literal.
const readout = computed(() => {
    const [x1, y1, x2, y2] = points.value.map((n) => +n.toFixed(3));
    return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
});

// ── SVG geometry ────────────────────────────────────────────────────────────
// bezier-Y (0 bottom, 1 top) → SVG-Y (0 top, grows down).
const toSvgY = (y: number) => 1 - y;

const handlesSvg = computed(() => {
    const [x1, y1, x2, y2] = points.value;
    return [
        { x: x1, y: toSvgY(y1) },
        { x: x2, y: toSvgY(y2) },
    ];
});

const bezierPathD = computed(() => {
    const [c1, c2] = handlesSvg.value;
    return `M 0 1 C ${c1!.x} ${c1!.y}, ${c2!.x} ${c2!.y}, 1 0`;
});

// The travelling dot follows the curve.
const progress = ref(0);
let rafId = 0;
function playTravel(): void {
    cancelAnimationFrame(rafId);
    const start = performance.now();
    const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1200);
        progress.value = t;
        if (t < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
}

// viewBox clamps overshoot so a back-curve doesn't blow up the canvas.
const VIEW_PAD = 0.1;
const MAX_OVERSHOOT = 0.6;
const viewBox = computed(() => {
    const ys: number[] = [0, 1, handlesSvg.value[0]!.y, handlesSvg.value[1]!.y];
    for (let i = 0; i <= 16; i++) ys.push(1 - easingFn.value(i / 16));
    const minY = Math.max(Math.min(...ys), -MAX_OVERSHOOT) - VIEW_PAD;
    const maxY = Math.min(Math.max(...ys), 1 + MAX_OVERSHOOT) + VIEW_PAD;
    return { minY, height: maxY - minY };
});

// ── Drag (self-contained pointer-capture, no external seam) ─────────────────
const svgEl = useTemplateRef<SVGSVGElement>("svgEl");
const dragIndex = ref<number | null>(null);

function pointerToSvg(ev: PointerEvent): { x: number; y: number } {
    const svg = svgEl.value;
    if (!svg) return { x: 0, y: 0 };
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const inv = ctm.inverse();
    const sx = inv.a * ev.clientX + inv.c * ev.clientY + inv.e;
    const sy = inv.b * ev.clientX + inv.d * ev.clientY + inv.f;
    return { x: sx, y: 1 - sy };
}

function onDown(ev: PointerEvent): void {
    const { x, y } = pointerToSvg(ev);
    const r = ev.pointerType === "touch" ? 0.15 : 0.1;
    let idx: number | null = null;
    let best = Infinity;
    const hs = [
        { x: points.value[0], y: points.value[1] },
        { x: points.value[2], y: points.value[3] },
    ];
    for (let i = 0; i < 2; i++) {
        const d = Math.hypot(hs[i]!.x - x, hs[i]!.y - y);
        if (d < r && d < best) { best = d; idx = i; }
    }
    if (idx === null) return;
    ev.preventDefault();
    dragIndex.value = idx;
    (ev.currentTarget as Element).setPointerCapture(ev.pointerId);
}

function onMove(ev: PointerEvent): void {
    if (dragIndex.value === null) return;
    const { x, y } = pointerToSvg(ev);
    const cx = Math.max(0, Math.min(1, x));
    const cy = Math.max(-MAX_OVERSHOOT, Math.min(1 + MAX_OVERSHOOT, y));
    const next: [number, number, number, number] = [...points.value];
    next[dragIndex.value * 2] = +cx.toFixed(3);
    next[dragIndex.value * 2 + 1] = +cy.toFixed(3);
    points.value = next;
    preset.value = "custom";
}

function onUp(): void {
    dragIndex.value = null;
}

// Copy state.
const copied = ref(false);
async function copy(): Promise<void> {
    try {
        await navigator.clipboard.writeText(readout.value);
        copied.value = true;
        setTimeout(() => (copied.value = false), 1400);
    } catch {
        /* clipboard unavailable */
    }
}
</script>

<template>
    <div class="grid gap-4 lg:grid-cols-[1fr_18rem]">
        <!-- the editable curve canvas -->
        <div class="glass-card relative overflow-hidden rounded-card p-3">
            <svg
                ref="svgEl"
                class="block w-full touch-none select-none"
                :viewBox="`0 ${viewBox.minY} 1 ${viewBox.height}`"
                preserveAspectRatio="xMidYMid meet"
                style="aspect-ratio: 1; block-size: clamp(200px, 38cqi, 320px); margin-inline: auto"
                @pointerdown="onDown"
                @pointermove="onMove"
                @pointerup="onUp"
                @pointercancel="onUp"
            >
                <!-- bounding box + diagonal reference -->
                <rect x="0" y="0" width="1" height="1" fill="none" class="stroke-border" stroke-width="0.012" />
                <line x1="0" y1="1" x2="1" y2="0" class="stroke-muted-foreground/30" stroke-width="0.006" stroke-dasharray="0.02 0.015" />
                <line v-for="v in [0.25, 0.5, 0.75]" :key="'gx' + v" :x1="v" y1="0" :x2="v" y2="1" class="stroke-border/40" stroke-width="0.006" />
                <line v-for="v in [0.25, 0.5, 0.75]" :key="'gy' + v" x1="0" :y1="v" x2="1" :y2="v" class="stroke-border/40" stroke-width="0.006" />

                <!-- axis labels -->
                <text x="0.05" y="0.95" class="fill-muted-foreground/60" style="font-size: 0.05px; font-family: var(--font-mono)" text-anchor="start">0</text>
                <text x="0.95" y="0.12" class="fill-muted-foreground/60" style="font-size: 0.05px; font-family: var(--font-mono)" text-anchor="end">1</text>

                <!-- handle lines -->
                <line :x1="0" :y1="1" :x2="handlesSvg[0]!.x" :y2="handlesSvg[0]!.y" class="stroke-muted-foreground/50" stroke-width="0.02" stroke-dasharray="0.03 0.02" />
                <line :x1="1" :y1="0" :x2="handlesSvg[1]!.x" :y2="handlesSvg[1]!.y" class="stroke-muted-foreground/50" stroke-width="0.02" stroke-dasharray="0.03 0.02" />

                <!-- the curve (the REAL value.js twin path) -->
                <path :d="bezierPathD" fill="none" class="stroke-[var(--motion-accent)]" stroke-width="0.035" stroke-linecap="round" />

                <!-- endpoints (fixed) -->
                <circle cx="0" cy="1" r="0.018" class="fill-muted-foreground/50" />
                <circle cx="1" cy="0" r="0.018" class="fill-muted-foreground/50" />
                <!-- draggable handles -->
                <circle :cx="handlesSvg[0]!.x" :cy="handlesSvg[0]!.y" r="0.04" class="fill-foreground stroke-background" stroke-width="0.02" style="cursor: move" />
                <circle :cx="handlesSvg[1]!.x" :cy="handlesSvg[1]!.y" r="0.04" class="fill-foreground stroke-background" stroke-width="0.02" style="cursor: move" />

                <!-- travelling dot -->
                <circle :cx="progress" :cy="1 - easingFn(progress)" r="0.03" class="fill-[var(--motion-accent)]" />
            </svg>
        </div>

        <!-- the controls column: preset dropdown + readout/copy -->
        <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
                <span class="text-mono-caption text-muted-foreground">Preset</span>
                <Select :model-value="preset" @update:model-value="(v) => selectPreset(String(v))">
                    <SelectTrigger>
                        <SelectValue placeholder="Pick a curve" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="name in PRESET_NAMES" :key="name" :value="name">
                            {{ name }}
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <!-- the complete re-parseable readout + copy -->
            <div class="glass-card flex items-center gap-2 rounded-card px-3 py-2">
                <code class="min-w-0 flex-1 truncate text-xs text-foreground" :title="readout">{{ readout }}</code>
                <button
                    type="button"
                    class="shrink-0 rounded-pill p-1.5 text-muted-foreground transition-colors hover:bg-[var(--surface-tint-8)] hover:text-foreground"
                    :aria-label="copied ? 'Copied' : 'Copy curve literal'"
                    @click="copy"
                >
                    <Check v-if="copied" class="size-4 text-[var(--motion-accent)]" />
                    <Copy v-else class="size-4" />
                </button>
            </div>

            <Button variant="default" @click="playTravel">▶ Trace the curve</Button>

            <p class="text-xs text-muted-foreground">
                Drag a handle to author the curve live. The path is the real
                <code class="text-foreground">CSSCubicBezier</code> twin from value.js — the same
                evaluator the library samples — not a hand-rolled approximation.
            </p>
        </div>
    </div>
</template>
