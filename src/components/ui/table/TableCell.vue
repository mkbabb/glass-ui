<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from '../../_shared/class-names';

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();
</script>

<template>
    <td :class="cn('table-cell align-middle [&:has([role=checkbox])]:pr-0', props.class)">
        <slot />
    </td>
</template>
