<script setup lang="ts">
// The Configurator's specimen: a painted field whose medium, spread, bloom and grain
// are the configurator's four values.
import { computed } from "vue";

const props = withDefaults(
    defineProps<{
        medium?: string;
        spread?: number;
        bloom?: number;
        grain?: boolean;
    }>(),
    { medium: "aurora", spread: 60, bloom: 50, grain: true },
);

const MEDIUM_HUES: Record<string, readonly [string, string, string]> = {
    aurora: ["var(--bloom-blue)", "var(--bloom-indigo)", "var(--bloom-violet)"],
    ink: ["var(--bloom-indigo)", "var(--bloom-blue)", "var(--bloom-green)"],
    gouache: ["var(--bloom-orange)", "var(--bloom-red)", "var(--bloom-yellow)"],
};

const fieldStyle = computed(() => {
    const spread = props.spread / 100;
    const bloom = props.bloom / 100;
    const offset = 14 + spread * 30;
    const radius = 34 + bloom * 30;
    const stop = 46 + bloom * 22;
    const [a, b, c] = MEDIUM_HUES[props.medium] ?? MEDIUM_HUES.aurora!;
    return {
        background: [
            `radial-gradient(ellipse ${radius}% ${radius * 0.86}% at ${50 - offset}% ${42 - spread * 8}%, color-mix(in srgb, ${a} 88%, transparent), transparent ${stop}%)`,
            `radial-gradient(ellipse ${radius * 0.94}% ${radius * 0.8}% at ${50 + offset}% ${40 + spread * 6}%, color-mix(in srgb, ${b} 84%, transparent), transparent ${stop}%)`,
            `radial-gradient(ellipse ${radius * 1.04}% ${radius * 0.9}% at 50% ${74 + spread * 10}%, color-mix(in srgb, ${c} 80%, transparent), transparent ${stop + 4}%)`,
        ].join(", "),
        filter: `blur(${(4 + bloom * 22).toFixed(1)}px)`,
    };
});
</script>

<template>
    <div class="configurator-specimen" aria-hidden="true">
        <div class="configurator-specimen-field" :style="fieldStyle" />
        <div v-if="grain" class="configurator-specimen-grain paper-grain-overlay" />
    </div>
</template>

<style scoped>
/* Pastels over the light ground, the full-chroma ramp over the dark one. */
.configurator-specimen {
    position: absolute;
    inset: 0;
    overflow: hidden;
    --bloom-blue: var(--rainbow-pastel-blue);
    --bloom-indigo: var(--rainbow-pastel-indigo);
    --bloom-violet: var(--rainbow-pastel-violet);
    --bloom-green: var(--rainbow-pastel-green);
    --bloom-orange: var(--rainbow-pastel-orange);
    --bloom-red: var(--rainbow-pastel-red);
    --bloom-yellow: var(--rainbow-pastel-yellow);
}

.dark .configurator-specimen {
    --bloom-blue: var(--rainbow-blue);
    --bloom-indigo: var(--rainbow-indigo);
    --bloom-violet: var(--rainbow-violet);
    --bloom-green: var(--rainbow-green);
    --bloom-orange: var(--rainbow-orange);
    --bloom-red: var(--rainbow-red);
    --bloom-yellow: var(--rainbow-yellow);
    background-color: color-mix(in oklab, var(--card) 88%, black);
}

.configurator-specimen-field,
.configurator-specimen-grain {
    position: absolute;
    inset: 0;
}

.configurator-specimen-field {
    transition: filter var(--duration-slow, 300ms) var(--ease-out);
}

.configurator-specimen-grain {
    opacity: 0.7;
}
</style>
