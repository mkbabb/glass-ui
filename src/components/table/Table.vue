<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from '../_shared/class-names';

const props = defineProps<{
    class?: HTMLAttributes["class"];
    role?: HTMLAttributes["role"];
    ariaLabel?: string;
    ariaColCount?: number;
    ariaRowCount?: number;
}>();
</script>

<template>
    <div data-slot="table" class="relative w-full overflow-auto">
        <table
            :class="cn('w-full caption-bottom text-sm', props.class)"
            :role="props.role"
            :aria-label="props.ariaLabel"
            :aria-colcount="props.ariaColCount"
            :aria-rowcount="props.ariaRowCount"
        >
            <slot />
        </table>
    </div>
</template>
