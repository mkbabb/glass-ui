<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from '../_shared/class-names';

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();
</script>

<template>
    <th
        :class="
            cn(
                'table-head text-left data-[align=center]:text-center data-[align=right]:text-right align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
                props.class,
            )
        "
    >
        <slot />
    </th>
</template>
