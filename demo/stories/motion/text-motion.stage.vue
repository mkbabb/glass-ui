<script setup lang="ts">
// Text Motion's stage: a line that types its phrases and three figures that count up,
// with one control that counts the figures again.
import { computed, onMounted, ref, watch } from "vue";
import { RotateCcw } from "@lucide/vue";
import { TypewriterText, type TypewriterWord } from "@glass/components/typewriter";
import { useAnimatedNumber } from "@glass/composables/motion";
import { Button } from "@glass/components/button";

const phrases: TypewriterWord[] = [
    { text: "warm cream" },
    { text: "paper grain" },
    { text: "audacious type" },
    { text: "spring physics" },
];

const FIGURES = [
    { target: 1280, unit: "requests" },
    { target: 98, unit: "% uptime" },
    { target: 4200, unit: "ms saved" },
] as const;

const targets = FIGURES.map(() => ref(0));
const counters = FIGURES.map((_, i) => useAnimatedNumber(targets[i]!, { initial: 0 }));
const shown = counters.map((c) => computed(() => Math.round(c.current.value).toLocaleString("en-US")));

function count(): void {
    FIGURES.forEach((f, i) => (targets[i]!.value = f.target));
}

// Replay counts the figures down to zero, then up again.
const rewinding = ref(false);
function replay(): void {
    rewinding.value = true;
    targets.forEach((t) => (t.value = 0));
}
watch(
    () => counters[0]!.current.value,
    (v) => {
        if (rewinding.value && v < 1) {
            rewinding.value = false;
            count();
        }
    },
);

onMounted(() => window.setTimeout(count, 300));
</script>

<template>
    <div class="text-motion-stage">
        <div class="text-motion-line">
            Built on
            <span class="text-motion-typed">
                <TypewriterText
                    :words="phrases"
                    :base-speed="110"
                    :pause-after-type="2200"
                    :pause-after-delete="600"
                />
            </span>
        </div>
        <div class="text-motion-figures">
            <div v-for="(f, i) in FIGURES" :key="f.unit" class="text-motion-figure">
                <span class="text-motion-value">{{ shown[i]!.value }}</span>
                <span class="text-motion-unit">{{ f.unit }}</span>
            </div>
        </div>
        <Button emphasis="quiet" size="sm" @click="replay">
            <RotateCcw aria-hidden="true" />
            Replay
        </Button>
    </div>
</template>

<style scoped>
.text-motion-stage {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    color: var(--foreground);
}

.text-motion-line {
    font-family: var(--font-display);
    font-size: calc(var(--type-body) * 2.618);
    line-height: 1.1;
    text-align: center;
}

.text-motion-typed {
    display: inline-block;
    text-align: start;
}

.text-motion-figures {
    display: grid;
    grid-template-columns: repeat(3, auto);
    justify-content: center;
    gap: 1rem 3rem;
}

.text-motion-figure {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
}

.text-motion-value {
    font-family: var(--font-mono);
    font-size: calc(var(--type-body) * 2);
    font-variant-numeric: tabular-nums;
    line-height: 1;
}

.text-motion-unit {
    font-size: var(--text-small, 0.875rem);
}

@container (inline-size < 34rem) {
    .text-motion-line {
        font-size: calc(var(--type-body) * 1.618);
    }
    .text-motion-figures {
        gap: 1rem 1.25rem;
    }
    .text-motion-value {
        font-size: calc(var(--type-body) * 1.272);
    }
}
</style>
