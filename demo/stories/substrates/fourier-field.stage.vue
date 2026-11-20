<script setup lang="ts">
// One Fourier field filling its box: a chain of rotating circles drawing its curve.
// Where the browser cannot draw it, the box says so in one sentence instead.
import { computed, reactive, ref, watch } from "vue";
import {
    DEFAULT_FOURIER_CONFIG,
    FourierField,
    type FourierFieldConfig,
    type FourierSource,
} from "@glass/components/fourier-field";
import { cssToOklch, type OklchStop } from "@glass/composables/color";
import { useGlobalDark } from "@glass/composables/dark";
import type { RendererStatus } from "@glass/composables/glass/webgpu/rendererStatus";
import { FOURIER_PRESETS, mintFor, type FourierStudio } from "./fourier-field/studio";

const props = withDefaults(
    defineProps<{ studio?: FourierStudio; paused?: boolean }>(),
    { studio: () => FOURIER_PRESETS[0]!.config, paused: false },
);

/** True once the field reports that it cannot draw here. */
const unavailable = defineModel<boolean>("unavailable", { default: false });
const onStatus = (status: RendererStatus): void => {
    unavailable.value = status.phase === "error";
};

const minted = computed(() => mintFor(props.studio.source, props.studio.richness));

// The ink and the head are one ramp step either side of the chosen hue, re-read on a
// theme change.
const { isDark } = useGlobalDark();
const probe = ref<HTMLElement | null>(null);
const palette = computed<OklchStop[]>(() => {
    void isDark.value;
    const el = probe.value ?? document.body;
    const prev = el.style.color;
    el.style.color = props.studio.color;
    const css = getComputedStyle(el).color;
    el.style.color = prev;
    const base = cssToOklch(css || "rgb(214 108 76)");
    return [
        { L: Math.max(0.52, base.L), C: Math.max(0.14, base.C), h: base.h },
        { L: Math.min(0.9, base.L + 0.24), C: base.C * 0.4, h: base.h + 16 },
    ];
});
const getPalette = (): OklchStop[] => palette.value;

const s = () => props.studio;
const config = reactive<FourierFieldConfig>({
    ...DEFAULT_FOURIER_CONFIG,
    get source() {
        return s().source as FourierSource;
    },
    get harmonics() {
        return Math.min(s().harmonics, minted.value.terms.length);
    },
    get showMachine() {
        return s().showMachine;
    },
    get rainbowChain() {
        return s().rainbowChain;
    },
    get trailArc() {
        return s().trailArc;
    },
    get markStroke() {
        return s().markStroke;
    },
    get inkOffset() {
        return s().inkOffset;
    },
    get squash() {
        return s().squash;
    },
    get glow() {
        return s().glow;
    },
    get intensity() {
        return s().intensity;
    },
    get richness() {
        return s().richness;
    },
    get speed() {
        return s().speed;
    },
    respectReducedMotion: true,
}) as FourierFieldConfig;

const field = ref<InstanceType<typeof FourierField> | null>(null);
watch(
    () => props.paused,
    (p) => (p ? field.value?.pause() : field.value?.resume()),
);
</script>

<template>
    <div class="absolute inset-0">
        <span ref="probe" class="sr-only" aria-hidden="true" />
        <FourierField
            ref="field"
            :config="config"
            :spectrum="minted.terms"
            :get-palette="getPalette"
            :interactive="studio.interactive"
            @renderer-status="onStatus"
        />
        <Transition name="fourier-notice" appear>
            <p v-if="unavailable" role="status" class="fourier-notice">
                This browser cannot draw the Fourier field.
            </p>
        </Transition>
    </div>
</template>

<style scoped>
.fourier-notice {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    margin: 0;
    padding: var(--sp-5);
    text-align: center;
    color: var(--foreground);
    pointer-events: none;
}

.fourier-notice-enter-active,
.fourier-notice-leave-active {
    transition: opacity var(--duration-normal) var(--ease-out);
}

.fourier-notice-enter-from,
.fourier-notice-leave-to {
    opacity: 0;
}
</style>
