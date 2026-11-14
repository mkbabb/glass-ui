<script setup lang="ts">
import { ref } from "vue";
import { Slider } from "@glass/components/slider";
const q = new URLSearchParams(location.search);
const model = ref([Number(q.get("v") ?? 50)]);
const size = (q.get("size") ?? "md") as "sm" | "md" | "lg";
const variant = (q.get("variant") ?? "scrubber") as "scrubber" | "spectrum";
const orientation = (q.get("o") ?? "horizontal") as "horizontal" | "vertical";
const consumer = q.get("consumer"); // "daraksha": the Name transport's own setting (size sm, 155px run, in a dock plate)
const width = consumer === "daraksha" ? "155px" : "320px";
(window as unknown as { setV: (n: number) => void }).setV = (n: number) => (model.value = [n]);
</script>
<template>
    <main style="padding: 48px 40px 40px; display: grid; place-items: center; min-height: 260px">
        <div
            id="stage"
            :class="consumer === 'daraksha' ? 'glass-plate' : ''"
            style="padding: 20px 24px; display: flex; align-items: center; gap: 12px; border-radius: 999px"
        >
            <span v-if="consumer === 'daraksha'" style="inline-size: 28px; block-size: 28px; border-radius: 50%; background: var(--muted)"></span>
            <Slider
                id="s"
                :style="orientation === 'vertical' ? '' : `inline-size: ${width}`"
                v-model="model"
                :min="0" :max="100" :step="1"
                :size="size" :variant="variant" :orientation="orientation"
                aria-label="Measure"
            />
            <span v-if="consumer === 'daraksha'" style="inline-size: 28px; block-size: 28px; border-radius: 50%; background: var(--muted)"></span>
        </div>
    </main>
</template>
<style>
#s[data-variant="spectrum"] { --glass-slider-track-background: linear-gradient(90deg, oklch(0.7 0.2 20), oklch(0.8 0.2 120), oklch(0.7 0.2 260)); }
</style>
