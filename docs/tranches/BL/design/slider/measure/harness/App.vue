<script setup lang="ts">
import { Slider } from "@glass/components/slider";
const q = new URLSearchParams(location.search);
const value = Number(q.get("v") ?? 50);
const size = (q.get("size") ?? "md") as "sm" | "md" | "lg";
const variant = (q.get("variant") ?? "scrubber") as "scrubber" | "spectrum";
const orientation = (q.get("o") ?? "horizontal") as "horizontal" | "vertical";
const consumer = q.get("consumer"); // "daraksha": the Name transport's own setting
const model = [value];
</script>
<template>
    <main :class="consumer === 'daraksha' ? 'dk' : ''" style="padding: 40px; display: grid; place-items: center; min-height: 240px">
        <div id="stage" style="padding: 24px; display: flex; align-items: center; gap: 12px">
            <Slider
                id="s"
                :class="consumer === 'daraksha' ? 'scrub' : ''"
                :style="orientation === 'vertical' ? '' : consumer === 'daraksha' ? 'inline-size: 155px' : 'inline-size: 320px'"
                :model-value="model"
                :min="0" :max="100" :step="1"
                :size="size" :variant="variant" :orientation="orientation"
                aria-label="Measure"
                @update:model-value="(v) => v && (model[0] = v[0]!)"
            />
        </div>
    </main>
</template>
