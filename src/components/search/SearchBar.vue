<template>
    <component
        :is="tag"
        :class="cn('input-bar', controlSizeClass(size), searchFieldVariants({ variant }), $attrs.class as string)"
        :data-surface="surface"
    >
        <component
            :is="icon ?? Search"
            class="size-(--search-icon-size) text-muted-foreground shrink-0"
            aria-hidden="true"
        />
        <input
            ref="inputRef"
            type="search"
            v-bind="inputAttrs"
            :value="modelValue"
            :placeholder="placeholder"
            class="input-bar-field"
            @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
        <slot />
    </component>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, type Component } from "vue";
import { Search } from "@lucide/vue";
import { cn } from "../_shared/class-names";
import type { Surface } from "../_shared/axes";
import {
    type ControlSize,
    type SearchVariant,
    controlSizeClass,
    searchFieldVariants,
} from "./searchVariants";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
    defineProps<{
        modelValue?: string;
        placeholder?: string;
        icon?: Component;
        tag?: string;
        // BC.W-SEARCH-CUSTOM — the SAME three-layer customization surface every
        // glass-ui control carries.
        //   size    — the shared control-size rung off the `--control-h-*`/`--control-text`
        //             cohort (sm quieter, default the golden pill, lg taller). The
        //             magnitudes stay the cohort tokens — a `:root` override retunes them.
        //   surface — the shared {glass·veil·opaque} decoration axis (`glass` default,
        //             the warm-cream floating plate). `:data-surface` reaches the
        //             `.input-bar` recipe via `glass/surface-axis.css`.
        //   variant — the field CHROME rung (`inline` boxed pill default; `bare`/
        //             `floating` chromeless). The real CVA rung that REPLACES the
        //             `!important`-fighting escape.
        size?: ControlSize;
        surface?: Surface;
        variant?: SearchVariant;
    }>(),
    {
        modelValue: "",
        placeholder: "Search…",
        tag: "div",
        size: "md",
        surface: "glass",
        variant: "inline",
    },
);

const emit = defineEmits<{
    "update:modelValue": [value: string];
}>();

const attrs = useAttrs();
const inputAttrs = computed(() => {
    const { class: _, ...input } = attrs;
    return input;
});

const inputRef = ref<HTMLInputElement | null>(null);

defineExpose({ inputRef });
</script>
