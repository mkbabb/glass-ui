<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../_shared/class-names";

const props = withDefaults(
    defineProps<{
        as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
        class?: HTMLAttributes["class"];
    }>(),
    { as: "h3" },
);
</script>

<template>
    <component :is="as" data-slot="card-title" :class="cn('card-title', props.class)">
        <slot />
    </component>
</template>
