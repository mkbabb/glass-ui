<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { cn } from "@glass/components/_shared/class-names";

const props = withDefaults(
    defineProps<{
        size?: "sm" | "md";
        showHex?: boolean;
        class?: HTMLAttributes["class"];
    }>(),
    { size: "md", showHex: false },
);

const model = defineModel<string>({ default: "#000000" });
const sizeClass = computed(() => (props.size === "sm" ? "h-7 w-7" : "h-8 w-8"));

function onInput(event: Event): void {
    model.value = (event.target as HTMLInputElement).value;
}
</script>

<template>
    <span :class="cn('inline-flex items-center gap-2 align-middle', props.class)">
        <span
            class="relative inline-flex shrink-0 cursor-pointer overflow-hidden rounded-control border border-(--configurator-divider-section)"
            :class="sizeClass"
            :style="{ backgroundColor: model }"
        >
            <input
                type="color"
                aria-label="Choose color"
                :value="model"
                v-bind="$attrs"
                class="absolute inset-0 h-full w-full cursor-pointer appearance-none border-0 bg-transparent p-0 opacity-0"
                @input="onInput"
            />
        </span>
        <code v-if="showHex" class="text-mono-small tabular-nums uppercase text-muted-foreground">
            {{ model.toUpperCase() }}
        </code>
    </span>
</template>
