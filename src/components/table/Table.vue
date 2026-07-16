<script setup lang="ts">
import { useAttrs, type HTMLAttributes } from "vue";
import { cn } from '../_shared/class-names';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
    class?: HTMLAttributes["class"];
    role?: HTMLAttributes["role"];
    ariaLabel?: string;
    ariaColCount?: number;
    ariaRowCount?: number;
}>();

const attrs = useAttrs();
</script>

<template>
    <div data-slot="table-container" class="relative w-full overflow-auto">
        <table
            v-bind="attrs"
            data-slot="table"
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
