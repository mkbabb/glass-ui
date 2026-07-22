<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from '../_shared/class-names';

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();
</script>

<template>
    <caption :class="cn('mt-4 text-small text-muted-foreground', props.class)">
        <slot />
    </caption>
</template>
