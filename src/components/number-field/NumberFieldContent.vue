<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../_shared/class-names";

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();
</script>

<template>
    <div :class="cn('number-field__content', props.class)">
        <slot />
    </div>
</template>
