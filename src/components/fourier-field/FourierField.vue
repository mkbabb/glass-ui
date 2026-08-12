<script setup lang="ts">
import { computed, onMounted, shallowRef, useTemplateRef, watch } from "vue";
import type { OklchStop } from "../../composables/color";
import { cssToOklch } from "../../composables/color";
import { resolveTokenColor } from "../../composables/dom";
import { useGlobalDark } from "../../composables/dark";
import { mulberry32, hashString } from "../../composables/glass/procedural/prng";
import {
    makeEllipticSpectrum,
    makeHarmonicFigure,
    FOURIER_FIGURES,
    type BasisComponent,
} from "./math";
import { mintSpectrum, type MintedSpectrum } from "./renderer/mint";
import {
    DEFAULT_FOURIER_CONFIG,
    FOURIER_QUANTUM_COARSE,
    FOURIER_QUANTUM_FINE,
    type FourierFieldConfig,
} from "./constants";
import { useFourierField } from "./useFourierField";
import type { RendererStatus } from "../../composables/glass/webgpu/rendererStatus";

const emit = defineEmits<{ rendererStatus: [status: RendererStatus] }>();

/**
 * FourierField — the drawing machine.
 *
 * Aurora is weather and the blob is a creature; this one is the substrate whose motion is
 * a CHECKABLE CLAIM. Every frame is the truncated inverse transform of a fixed spectrum,
 * `Σ c_k·e^{2πikt}`, and a reader can verify it: the rings are the terms, the chain is the
 * sum, the head is where the parameter currently is. Nothing decorative moves.
 *
 * The two payoffs are CLOSURE — every index is an integer, so the figure completes exactly
 * at `t = 1` — and ASSEMBLY — the spectrum is amplitude-ordered, so every step of the N
 * axis adds the largest remaining correction rather than the next arbitrary frequency.
 *
 * WebGPU only. There is one renderer, because a second one would be a second paint law,
 * and where WebGPU is absent the field declares it and paints nothing.
 */
const props = withDefaults(
    defineProps<{
        /** The author config. Defaults to the shipped identity. */
        config?: FourierFieldConfig;
        /** An explicit spectrum. When absent, the config's `source` decides. */
        spectrum?: readonly BasisComponent[];
        /** Resolve the ramp as OKLCh (the studio themes it). Wins over `color`. */
        getPalette?: () => OklchStop[];
        /** Ambient-consumer colour seam — a token or a literal; derives a two-stop ramp. */
        color?: string;
        /** Seed for the generated spectrum. */
        seed?: string;
        /** Hold the clock. The figure stays live; only time stops. */
        freeze?: boolean;
        /**
         * The pointer scrubs and flicks the clock, and the host becomes a real slider.
         * `false` is the decor mount: no listeners, no role, no tab stop.
         */
        interactive?: boolean;
    }>(),
    {
        seed: "",
        freeze: false,
        interactive: true,
    },
);

const hostRef = useTemplateRef<HTMLElement>("hostRef");
const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef");

const { isDark } = useGlobalDark();

const cfg = computed<FourierFieldConfig>(() => props.config ?? DEFAULT_FOURIER_CONFIG);

// ── The spectrum. Minted ONCE per source/seed and never on an N edit. ──
const minted = computed<MintedSpectrum>(() => {
    if (props.spectrum && props.spectrum.length > 0) {
        return mintSpectrum(props.spectrum);
    }
    const source = cfg.value.source;
    if (source !== "elliptic" && !(source in FOURIER_FIGURES)) {
        throw new Error(
            `[FourierField] unknown source "${String(source)}". Pass "elliptic", a key of ` +
                `FOURIER_FIGURES, or an explicit \`spectrum\`.`,
        );
    }
    if (source !== "elliptic") {
        return mintSpectrum(makeHarmonicFigure(FOURIER_FIGURES[source]));
    }
    const rng = mulberry32(hashString(`fourier-field/${props.seed}`));
    return mintSpectrum(makeEllipticSpectrum(rng, cfg.value.richness));
});
const getSpectrum = (): MintedSpectrum => minted.value;

/** The summed truth: the term count the frame actually used, over what the mint emitted. */
const termCount = computed(() => minted.value.terms.length);
const summedN = computed(() =>
    Math.max(1, Math.min(Math.round(cfg.value.harmonics), termCount.value)),
);
const badge = computed(() => `N ${summedN.value}/${termCount.value}`);

// ── The ramp. A `var()`/`light-dark()` seam resolves through the cascade at mount. ──
function resolveColorString(css: string): string {
    if (!css.includes("var(") && !css.includes("light-dark(")) return css;
    const el = hostRef.value;
    if (typeof window === "undefined" || !el) return css;
    if (css.includes("var(")) return resolveTokenColor(css, el);
    const prev = el.style.color;
    el.style.color = css;
    const resolved = getComputedStyle(el).color;
    el.style.color = prev;
    return resolved || css;
}

const resolvedPalette = shallowRef<OklchStop[]>(cfg.value.palette);
function refreshPalette(): void {
    if (props.getPalette) {
        resolvedPalette.value = props.getPalette();
    } else if (props.color) {
        void isDark.value; // the dark-flip retint trigger
        const resolved = resolveColorString(props.color);
        // An unresolved wrapper cannot be parsed; keep the placeholder until mount.
        if (resolved.includes("var(") || resolved.includes("light-dark(")) return;
        const base = cssToOklch(resolved);
        resolvedPalette.value = [
            { L: Math.max(0.5, base.L), C: Math.max(0.12, base.C), h: base.h },
            { L: Math.min(0.9, base.L + 0.22), C: base.C * 0.4, h: base.h + 18 },
        ];
    } else {
        resolvedPalette.value = cfg.value.palette;
    }
    if (resolvedPalette.value.length === 0) {
        throw new Error("[FourierField] the palette is empty — there is nothing to paint with.");
    }
}
const getPalette = (): OklchStop[] => resolvedPalette.value;

// A live forward-through of the config: spreading would freeze the studio's getters, so
// the proxy forwards every reflection and per-frame reads track every edit with no wiring.
const renderConfig = new Proxy({} as FourierFieldConfig, {
    get: (_t, key) => Reflect.get(cfg.value, key),
    has: (_t, key) => Reflect.has(cfg.value, key),
    ownKeys: () => Reflect.ownKeys(cfg.value),
    getOwnPropertyDescriptor: (_t, key) =>
        Reflect.getOwnPropertyDescriptor(cfg.value, key),
});

const renderer = useFourierField(canvasRef, {
    config: renderConfig,
    getSpectrum,
    getPalette,
    interactive: () => props.interactive,
    freeze: () => props.freeze,
});

watch(renderer.rendererStatus, (status) => emit("rendererStatus", status), {
    immediate: true,
    flush: "sync",
});
watch(() => props.config, () => renderer.wake(), { deep: true });
watch([() => props.color, () => props.getPalette, isDark], refreshPalette, {
    immediate: true,
});
// The immediate watch runs before the host exists, so a token colour could not resolve the
// cascade yet. Re-resolve once there is a real element to read it through.
onMounted(refreshPalette);
watch(isDark, () => renderer.wake());
watch(() => props.freeze, () => renderer.wake());

// ── The a11y arm. Interactive, the host IS the transport: it commands the parameter, so
//    it is a slider, and the value it reports is the one the paint used. ──
const paused = shallowRef(false);
const valueNow = computed(() => Number(renderer.headTLive.value.toFixed(3)));
const valueText = computed(
    () => `${badge.value} · ${Math.round(renderer.headTLive.value * 100)}% through the period`,
);

function nudge(delta: number): void {
    renderer.setHeadT(renderer.headT + delta);
}
function onKeydown(e: KeyboardEvent): void {
    if (!props.interactive) return;
    switch (e.key) {
        case "ArrowRight":
            nudge(FOURIER_QUANTUM_FINE);
            break;
        case "ArrowLeft":
            nudge(-FOURIER_QUANTUM_FINE);
            break;
        case "ArrowUp":
            nudge(FOURIER_QUANTUM_COARSE);
            break;
        case "ArrowDown":
            nudge(-FOURIER_QUANTUM_COARSE);
            break;
        case "Home":
            renderer.setHeadT(0);
            break;
        case "End":
            // 0.999, not 1: the period is half-open, and 1 IS 0.
            renderer.setHeadT(0.999);
            break;
        case " ":
        case "Spacebar":
            paused.value = !paused.value;
            if (paused.value) renderer.pause();
            else renderer.resume();
            break;
        default:
            return;
    }
    e.preventDefault();
}

defineExpose({
    backend: () => renderer.backend,
    pause: renderer.pause,
    resume: renderer.resume,
    wake: renderer.wake,
    setHeadT: renderer.setHeadT,
    /** The live loop parameter. Unwrapped on the exposed proxy, so a transport binds it. */
    headT: renderer.headTLive,
    flick: renderer.flick,
    rendererStatus: renderer.rendererStatus,
});
</script>

<template>
    <div
        ref="hostRef"
        class="fourier-field"
        :class="{ 'fourier-field--interactive': props.interactive }"
        :role="props.interactive ? 'slider' : undefined"
        :tabindex="props.interactive ? 0 : undefined"
        :aria-label="props.interactive ? 'Fourier reconstruction parameter' : undefined"
        :aria-valuemin="props.interactive ? 0 : undefined"
        :aria-valuemax="props.interactive ? 1 : undefined"
        :aria-valuenow="props.interactive ? valueNow : undefined"
        :aria-valuetext="props.interactive ? valueText : undefined"
        @keydown="onKeydown"
    >
        <canvas ref="canvasRef" class="fourier-field-canvas" aria-hidden="true" />
    </div>
</template>

<style scoped>
/* `content-visibility` lets the substrate's offscreen park engage; `contain` keeps the
   host a layout and paint root. */
.fourier-field {
    position: absolute;
    inset: 0;
    z-index: 0;
    /* Ambient by default — a decor field never eats the page's hit-testing. */
    pointer-events: none;
    contain: layout style;
    content-visibility: auto;
    contain-intrinsic-size: auto none;
}

.fourier-field--interactive {
    pointer-events: auto;
}

.fourier-field-canvas {
    display: block;
    width: 100%;
    height: 100%;
    pointer-events: none;
}
</style>
