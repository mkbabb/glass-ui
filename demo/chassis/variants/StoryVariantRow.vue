<script setup lang="ts" generic="V extends string">
// One variant row: a label of at most three words, then either a switch (pass
// `options` and bind `v-model`) or a row of instances in the default slot.
import { SegmentedTabs, type SegmentedTabOption } from "@glass/components/tabs";

defineProps<{
    label: string;
    options?: SegmentedTabOption<V>[];
}>();

const model = defineModel<V>();
</script>

<template>
    <div class="story-variant-row">
        <span class="story-variant-label">{{ label }}</span>
        <SegmentedTabs
            v-if="options && model !== undefined"
            v-model="model as V"
            :options="options"
            :aria-label="label"
        />
        <div v-else class="story-variant-items">
            <slot />
        </div>
    </div>
</template>
