<script setup lang="ts">
// Chip's stage: a row of filters you can select, each in its own colour.
import { ref } from "vue";
import { Chip } from "@glass/components/chip";

const FILTERS = [
    { label: "Fourier", tone: "var(--viz-fourier)" },
    { label: "Chebyshev", tone: "var(--viz-chebyshev)" },
    { label: "Legendre", tone: "var(--viz-legendre)" },
    { label: "Hermite", tone: "var(--section-color-5)" },
    { label: "Laguerre", tone: "var(--section-color-7)" },
];
const on = ref<Record<string, boolean>>({ Fourier: true, Legendre: true });
</script>

<template>
    <div class="chip-stage" role="group" aria-label="Filters">
        <Chip
            v-for="f in FILTERS"
            :key="f.label"
            v-model="on[f.label]"
            mode="selectable"
            size="lg"
            :tone="f.tone"
        >
            {{ f.label }}
        </Chip>
    </div>
</template>

<style scoped>
.chip-stage {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--sp-3);
    max-inline-size: min(100cqi, 40rem);
}
</style>
