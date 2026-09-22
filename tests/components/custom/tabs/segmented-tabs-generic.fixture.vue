<script setup lang="ts">
// O-32 §4.3—the vue-tsc witness for the generic model (type-only; vitest never
// mounts it, `npm run typecheck` checks it through tsconfig.test.json). The first
// callsite is fourier's EquationView shape with its `$event as …` assertion removed:
// inline options, no `as const`, a literal-union ref. The second keys an option the
// union does not hold: a rejection guard, not born-RED (it errors at HEAD too). The
// third is a plain string callsite, which types exactly as before.
import { ref } from "vue";

import { SegmentedTabs } from "@glass/components/tabs";

const mobileView = ref<"controls" | "canvas">("controls");
const plain = ref("one");
</script>

<template>
    <SegmentedTabs
        :model-value="mobileView"
        :options="[
            { label: 'Controls', value: 'controls' },
            { label: 'Canvas', value: 'canvas' },
        ]"
        @update:model-value="mobileView = $event"
    />
    <!-- @vue-expect-error an option value outside the model's union -->
    <SegmentedTabs
        :model-value="mobileView"
        :options="[
            { label: 'Controls', value: 'controls' },
            { label: 'Other', value: 'other' },
        ]"
        @update:model-value="mobileView = $event"
    />
    <SegmentedTabs
        v-model="plain"
        :options="[
            { label: 'One', value: 'one' },
            { label: 'Two', value: 'two' },
        ]"
    />
</template>
