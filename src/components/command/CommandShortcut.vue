<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../_shared/class-names";

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();
</script>

<template>
    <span data-slot="command-shortcut" :class="cn('command__shortcut', props.class)">
        <slot />
    </span>
</template>
