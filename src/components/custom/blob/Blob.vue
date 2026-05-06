/* @mkbabb/glass-ui — see docs/tranches/G/blob/SPEC.md */
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useMediaQuery } from "@vueuse/core";

import { useBlob } from "../../../composables/blob/useBlob";
import type {
    BlobColorHsl,
    BlobConfig,
    BlobMood,
} from "../../../composables/blob/types";
import { cn } from "../../../utils/cn";

export interface BlobProps {
    /** CSS color string sets `--blob-color` custom property; HSL component
     *  parsing is best-effort and feeds the shader uniform when supplied as
     *  `hsl(h s% l%)`. Defaults to a gold-amber fallback. */
    color?: string;
    /** Size in CSS units; numbers render as px. Default `"7rem"`. */
    size?: string | number;
    /** Mood character expression. Default `"idle"`. */
    mood?: BlobMood;
    /** Partial `BlobConfig` override merged onto `BLOB_CONFIG_DEFAULTS`. */
    config?: Partial<BlobConfig>;
    /** Pointer-attract toggle. Defaults to the live `(pointer: fine)` query. */
    pointerAttract?: boolean;
    /** Reduced-motion behavior. Default `"auto"` honors the media query. */
    reducedMotion?: "auto" | "static" | "animate";
    /** PRNG seed for deterministic first frames; default `1618`. */
    seed?: number;
    /** Tap-mood transition target. `null` disables tap behavior; default `null`. */
    tapMood?: BlobMood | null;
    /** Tap-mood duration in ms; default `800`. */
    tapDuration?: number;
    /** Lazy-mount the renderer until the host element enters the viewport.
     *  Default `true` — the WebGL2 context is acquired only when needed,
     *  preventing browser context-cap exhaustion on pages with many blobs.
     *  Pass `false` for hero specimens you want pre-warmed even off-screen. */
    lazy?: boolean;
    /** IntersectionObserver `rootMargin` for the lazy-mount probe. Default
     *  `"200px"` — the blob renderer warms up shortly before the host
     *  enters the viewport, hiding any first-frame pop. */
    lazyMargin?: string;
}

const props = withDefaults(defineProps<BlobProps>(), {
    color: undefined,
    size: "7rem",
    mood: "idle",
    config: () => ({}),
    pointerAttract: undefined,
    reducedMotion: "auto",
    seed: 1618,
    tapMood: null,
    tapDuration: 800,
    lazy: true,
    lazyMargin: "200px",
});

const slots = defineSlots<{
    label?: () => unknown;
}>();

// Pointer-fine default — auto-disable on coarse pointer devices unless the
// consumer overrides explicitly. SPEC.md §6 Pointer model.
const isPointerFine = useMediaQuery("(pointer: fine)");
const resolvedPointerAttract = computed(
    () => props.pointerAttract ?? isPointerFine.value,
);

// Tap-mood handling per SPEC.md §11.5 — single source of truth for tap state.
// `activeMood` mirrors `props.mood` until a tap inverts it for `tapDuration`.
const baseMood = computed(() => props.mood);
const activeMood = ref<BlobMood>(props.mood);
let tapTimer: number | null = null;

function clearTapTimer(): void {
    if (tapTimer !== null) {
        clearTimeout(tapTimer);
        tapTimer = null;
    }
}

watch(baseMood, (next) => {
    if (tapTimer === null) activeMood.value = next;
});

function onTap(): void {
    if (props.tapMood == null) return;
    activeMood.value = props.tapMood;
    clearTapTimer();
    tapTimer = window.setTimeout(() => {
        activeMood.value = baseMood.value;
        tapTimer = null;
    }, props.tapDuration) as unknown as number;
}

onBeforeUnmount(clearTapTimer);

// Best-effort HSL color parse. Consumers wanting strict color fidelity supply
// `hsl(h s% l%)` strings; everything else feeds the gold-amber fallback while
// the wrapper's `--blob-color` CSS variable still propagates the raw string to
// the cast-shadow `color-mix`.
const colorRef = computed<BlobColorHsl>(() => {
    if (!props.color) return { h: 0.13, s: 0.55, l: 0.62 };
    const match = props.color.match(
        /hsl\(\s*(-?\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%\s*\)/,
    );
    if (match) {
        return {
            h: ((parseFloat(match[1]) % 360) + 360) % 360 / 360,
            s: parseFloat(match[2]) / 100,
            l: parseFloat(match[3]) / 100,
        };
    }
    return { h: 0.13, s: 0.55, l: 0.62 };
});

const configRef = computed(() => props.config);
const seedValue = computed(() => props.seed);

const hostRef = ref<HTMLElement | null>(null);
const isMounted = ref<boolean>(!props.lazy);

const { canvasRef, dispose } = useBlob({
    color: colorRef,
    mood: activeMood,
    config: configRef,
    pointerAttract: resolvedPointerAttract.value,
    seed: seedValue.value,
});

let intersectionObserver: IntersectionObserver | null = null;

onMounted(() => {
    if (!props.lazy || isMounted.value) return;
    if (typeof IntersectionObserver !== "function" || !hostRef.value) {
        isMounted.value = true;
        return;
    }
    intersectionObserver = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    isMounted.value = true;
                    intersectionObserver?.disconnect();
                    intersectionObserver = null;
                    return;
                }
            }
        },
        { rootMargin: props.lazyMargin, threshold: 0 },
    );
    intersectionObserver.observe(hostRef.value);
});

onBeforeUnmount(() => {
    intersectionObserver?.disconnect();
    intersectionObserver = null;
    dispose();
});

const sizeStyle = computed(() => {
    const value = typeof props.size === "number" ? `${props.size}px` : props.size;
    return { width: value, height: value, "--blob-size": value };
});

const colorStyle = computed(() =>
    props.color ? { "--blob-color": props.color } : {},
);
</script>

<template>
    <div
        ref="hostRef"
        :class="cn('blob')"
        :style="{ ...sizeStyle, ...colorStyle }"
        :data-mood="activeMood"
        @pointerdown="onTap"
    >
        <canvas
            v-if="isMounted"
            ref="canvasRef"
            class="blob-canvas"
            role="presentation"
            aria-hidden="true"
        />
        <div v-if="slots.label" class="blob-label">
            <slot name="label" />
        </div>
    </div>
</template>

<style scoped>
/* Cast-shadow contract per SPEC.md §11.3 — three CSS knobs ship as W1 tokens
   so consumers override per-instance via plain CSS or :style. No JS-side
   cast-shadow code lives here. */
.blob {
    position: relative;
    display: inline-block;
    border-radius: 50%;
    box-shadow:
        0 var(--blob-cast-shadow-y, 0.5rem) var(--blob-cast-shadow-blur, 1.5rem)
        color-mix(
            in srgb,
            var(--blob-color, var(--accent-color))
                var(--blob-cast-shadow-mix, 18%),
            var(--foreground)
        );
}

.blob-canvas {
    width: 100%;
    height: 100%;
    display: block;
}

.blob-label {
    position: absolute;
    bottom: -1.6em;
    left: 50%;
    transform: translateX(-50%);
    font: italic var(--type-caption) / 1 var(--font-display);
    font-variation-settings:
        "WONK" 1,
        "SOFT" 100;
    color: var(--muted-foreground);
    white-space: nowrap;
}

@media (prefers-reduced-transparency: reduce) {
    .blob-canvas {
        opacity: 1;
    }
}
</style>
